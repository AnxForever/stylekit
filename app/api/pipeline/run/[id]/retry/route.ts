import { NextResponse } from "next/server";
import { getPipelineRun } from "@/lib/pipeline/store";
import { executePipeline } from "@/lib/pipeline/orchestrator";
import {
  PIPELINE_STAGES,
  STAGE_ORDER,
  type PipelineStageName,
} from "@/lib/pipeline/types";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();

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
