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

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 12;
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
  const rateLimit = checkRateLimit({
    namespace: "api:pipeline-run",
    key: getRequestClientKey(req),
    limit: RATE_LIMIT_MAX_REQUESTS,
    windowMs: RATE_LIMIT_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many pipeline runs. Please try again later." },
      { status: 429, headers: createRateLimitHeaders(rateLimit) }
    );
  }

  try {
    const parsed = pipelineRunSchema.safeParse(await req.json());
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return NextResponse.json(
        { error: issue?.message ?? "Invalid pipeline request payload" },
        { status: 400 }
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

    return NextResponse.json({ run: finalRun });
  } catch (error) {
    return NextResponse.json(
      { error: `Pipeline execution failed: ${(error as Error).message}` },
      { status: 500 },
    );
  }
}
