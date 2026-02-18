import { NextResponse } from "next/server";
import { z } from "zod";
import { createPipelineRun } from "@/lib/pipeline/store";
import { executePipeline } from "@/lib/pipeline/orchestrator";
import type { PipelineRunRequest } from "@/lib/pipeline/types";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const MAX_BODY_BYTES = 16 * 1024;
const STYLE_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const pipelineRunSchema = z.object({
  sourceUrl: z
    .string()
    .trim()
    .url("sourceUrl must be a valid URL")
    .max(2048, "sourceUrl is too long")
    .refine(
      (value) => value.startsWith("http://") || value.startsWith("https://"),
      "sourceUrl must start with http:// or https://"
    ),
  target: z.object({
    framework: z.enum(["html", "react"]),
    styleSlug: z
      .string()
      .trim()
      .regex(STYLE_SLUG_RE, "target.styleSlug must be a valid slug")
      .optional(),
  }),
  output: z.object({
    format: z.literal("zip"),
  }),
  options: z
    .object({
      autoMapTokens: z.boolean().optional(),
    })
    .optional(),
});

export async function POST(req: Request) {
  const startedAt = Date.now();

  const telemetryHeaders = (
    status: number,
    code?: string,
    headers?: HeadersInit,
  ): Headers => {
    const merged = new Headers(headers);
    merged.set("x-stylekit-duration-ms", String(Date.now() - startedAt));
    merged.set("x-stylekit-status", String(status));
    if (code) {
      merged.set("x-stylekit-error-code", code);
    }
    return merged;
  };

  const respond = (
    status: number,
    payload: unknown,
    code?: string,
    headers?: HeadersInit,
  ) =>
    NextResponse.json(payload, {
      status,
      headers: telemetryHeaders(status, code, headers),
    });

  const originCheck = verifyTrustedOrigin(req);
  if (!originCheck.ok) {
    return respond(
      originCheck.status ?? 403,
      { error: originCheck.error },
      "ORIGIN_NOT_ALLOWED",
    );
  }

  const rateLimit = checkRateLimit({
    namespace: "api:pipeline-run",
    key: getRequestClientKey(req),
    limit: RATE_LIMIT_MAX_REQUESTS,
    windowMs: RATE_LIMIT_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return respond(
      429,
      { error: "Too many pipeline runs. Please try again later." },
      "RATE_LIMITED",
      createRateLimitHeaders(rateLimit),
    );
  }

  try {
    const bodyResult = await parseJsonBodyWithLimit(req, {
      maxBytes: MAX_BODY_BYTES,
      tooLargeMessage: "Pipeline payload is too large.",
      invalidJsonMessage: "Invalid pipeline request payload.",
    });
    if (!bodyResult.ok) {
      const code =
        bodyResult.status === 413 ? "PAYLOAD_TOO_LARGE" : "INVALID_JSON";
      return respond(bodyResult.status, { error: bodyResult.error }, code);
    }

    const parsed = pipelineRunSchema.safeParse(bodyResult.data);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return respond(
        400,
        { error: issue?.message ?? "Invalid pipeline request payload" },
        "INVALID_REQUEST",
      );
    }

    // -- Create & execute ----------------------------------------------------
    const request: PipelineRunRequest = {
      sourceUrl: parsed.data.sourceUrl,
      target: parsed.data.target,
      output: parsed.data.output,
      options: parsed.data.options,
    };

    const run = createPipelineRun(request);
    const finalRun = await executePipeline(run);

    return respond(200, { run: finalRun });
  } catch (error) {
    return respond(
      500,
      { error: `Pipeline execution failed: ${(error as Error).message}` },
      "PIPELINE_EXECUTION_FAILED",
    );
  }
}
