import { NextResponse } from "next/server";
import { createPipelineRun } from "@/lib/pipeline/store";
import { executePipeline } from "@/lib/pipeline/orchestrator";
import type { PipelineRunRequest } from "@/lib/pipeline/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // -- Validate sourceUrl --------------------------------------------------
    const sourceUrl =
      typeof body?.sourceUrl === "string" ? body.sourceUrl.trim() : "";

    if (!sourceUrl) {
      return NextResponse.json(
        { error: "Missing required field: sourceUrl" },
        { status: 400 },
      );
    }

    if (
      !sourceUrl.startsWith("http://") &&
      !sourceUrl.startsWith("https://")
    ) {
      return NextResponse.json(
        { error: "sourceUrl must start with http:// or https://" },
        { status: 400 },
      );
    }

    // -- Validate target -----------------------------------------------------
    const target = body?.target;

    if (!target || typeof target !== "object" || !target.framework) {
      return NextResponse.json(
        { error: "Missing required field: target.framework" },
        { status: 400 },
      );
    }

    // -- Validate output -----------------------------------------------------
    const output = body?.output;

    if (!output || typeof output !== "object" || !output.format) {
      return NextResponse.json(
        { error: "Missing required field: output.format" },
        { status: 400 },
      );
    }

    // -- Create & execute ----------------------------------------------------
    const request: PipelineRunRequest = {
      sourceUrl,
      target,
      output,
      options: body.options,
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
