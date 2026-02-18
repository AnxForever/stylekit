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
  const originCheck = verifyTrustedOrigin(req);
  if (!originCheck.ok) {
    return NextResponse.json(
      { error: originCheck.error },
      { status: originCheck.status ?? 403 },
    );
  }

  const rateLimit = checkRateLimit({
    namespace: "api:pipeline-retry",
    key: getRequestClientKey(req),
    limit: RATE_LIMIT_MAX_REQUESTS,
    windowMs: RATE_LIMIT_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many retry requests. Please try again later." },
      { status: 429, headers: createRateLimitHeaders(rateLimit) },
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
      return NextResponse.json(
        { error: bodyResult.error },
        { status: bodyResult.status },
      );
    }
    const body = bodyResult.data;

    // -- Validate fromStage --------------------------------------------------
    const fromStage = body?.fromStage as string;

    if (
      !fromStage ||
      !PIPELINE_STAGES.includes(fromStage as PipelineStageName)
    ) {
      return NextResponse.json(
        {
          error: `Invalid fromStage. Must be one of: ${PIPELINE_STAGES.join(", ")}`,
        },
        { status: 400 },
      );
    }

    // -- Get existing run ----------------------------------------------------
    const run = getPipelineRun(id);

    if (!run) {
      return NextResponse.json(
        { error: "Pipeline run not found" },
        { status: 404 },
      );
    }

    // -- Can only retry failed runs ------------------------------------------
    if (run.status !== "failed") {
      return NextResponse.json(
        { error: "Can only retry failed pipeline runs" },
        { status: 400 },
      );
    }

    // -- Validate stage order ------------------------------------------------
    const failedStage = run.stages.find((s) => s.status === "failed");

    if (
      failedStage &&
      STAGE_ORDER[fromStage as PipelineStageName] >
        STAGE_ORDER[failedStage.name]
    ) {
      return NextResponse.json(
        {
          error: `Cannot retry from "${fromStage}" — it comes after the failed stage "${failedStage.name}"`,
        },
        { status: 400 },
      );
    }

    // -- Execute from stage --------------------------------------------------
    const finalRun = await executePipeline(
      run,
      fromStage as PipelineStageName,
    );

    return NextResponse.json({ run: finalRun });
  } catch (error) {
    return NextResponse.json(
      { error: `Pipeline retry failed: ${(error as Error).message}` },
      { status: 500 },
    );
  }
}
