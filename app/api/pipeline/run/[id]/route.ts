import { NextResponse } from "next/server";
import { getPipelineRun } from "@/lib/pipeline/store";

export async function GET(
  _req: Request,
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

  try {
    const { id } = await params;

    const run = getPipelineRun(id);

    if (!run) {
      return respond(
        404,
        { error: "Pipeline run not found" },
        "RUN_NOT_FOUND",
      );
    }

    return respond(200, { run });
  } catch (error) {
    return respond(
      500,
      { error: `Failed to retrieve pipeline run: ${(error as Error).message}` },
      "PIPELINE_RUN_FETCH_FAILED",
    );
  }
}
