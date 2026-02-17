import { NextResponse } from "next/server";
import { getPipelineRun } from "@/lib/pipeline/store";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const run = getPipelineRun(id);

    if (!run) {
      return NextResponse.json(
        { error: "Pipeline run not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ run });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to retrieve pipeline run: ${(error as Error).message}` },
      { status: 500 },
    );
  }
}
