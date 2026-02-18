import { NextResponse } from "next/server";
import { getPipelineRun } from "@/lib/pipeline/store";
import { executePipeline } from "@/lib/pipeline/orchestrator";
import {
  PIPELINE_STAGES,
  STAGE_ORDER,
  type PipelineStageName,
} from "@/lib/pipeline/types";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 24;
const MAX_BODY_BYTES = 4 * 1024;

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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
    namespace: "api:pipeline-retry",
    key: getRequestClientKey(req),
    limit: RATE_LIMIT_MAX_REQUESTS,
    windowMs: RATE_LIMIT_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return respond(
      429,
      { error: "Too many retry requests. Please try again later." },
      "RATE_LIMITED",
      createRateLimitHeaders(rateLimit),
    );
  }

  try {
    const { id } = await params;
    const bodyResult = await parseJsonBodyWithLimit<{ fromStage?: string }>(req, {
      maxBytes: MAX_BODY_BYTES,
      tooLargeMessage: "Retry payload is too large.",
      invalidJsonMessage: "Invalid retry request payload.",
    });
    if (!bodyResult.ok) {
      const code =
        bodyResult.status === 413 ? "PAYLOAD_TOO_LARGE" : "INVALID_JSON";
      return respond(bodyResult.status, { error: bodyResult.error }, code);
    }
    const body = bodyResult.data;

    // -- Validate fromStage --------------------------------------------------
    const fromStage = body?.fromStage as string;

    if (
      !fromStage ||
      !PIPELINE_STAGES.includes(fromStage as PipelineStageName)
    ) {
      return respond(
        400,
        {
          error: `Invalid fromStage. Must be one of: ${PIPELINE_STAGES.join(", ")}`,
        },
        "INVALID_STAGE",
      );
    }

    // -- Get existing run ----------------------------------------------------
    const run = getPipelineRun(id);

    if (!run) {
      return respond(404, { error: "Pipeline run not found" }, "RUN_NOT_FOUND");
    }

    // -- Can only retry failed runs ------------------------------------------
    if (run.status !== "failed") {
      return respond(
        400,
        { error: "Can only retry failed pipeline runs" },
        "RUN_NOT_FAILED",
      );
    }

    // -- Validate stage order ------------------------------------------------
    const failedStage = run.stages.find((s) => s.status === "failed");

    if (
      failedStage &&
      STAGE_ORDER[fromStage as PipelineStageName] >
        STAGE_ORDER[failedStage.name]
    ) {
      return respond(
        400,
        {
          error: `Cannot retry from "${fromStage}" - it comes after the failed stage "${failedStage.name}"`,
        },
        "INVALID_STAGE_ORDER",
      );
    }

    // -- Execute from stage --------------------------------------------------
    const finalRun = await executePipeline(
      run,
      fromStage as PipelineStageName,
    );

    return respond(200, { run: finalRun });
  } catch (error) {
    return respond(
      500,
      { error: `Pipeline retry failed: ${(error as Error).message}` },
      "PIPELINE_RETRY_FAILED",
    );
  }
}
