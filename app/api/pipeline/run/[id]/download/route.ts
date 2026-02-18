import { NextResponse } from "next/server";
import JSZip from "jszip";
import { getPipelineRun } from "@/lib/pipeline/store";

function safeFilenamePart(value: string): string {
  const normalized = value
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return normalized || "stylekit-pipeline";
}

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

  const respondJson = (status: number, payload: unknown, code?: string) =>
    NextResponse.json(payload, {
      status,
      headers: telemetryHeaders(status, code),
    });

  try {
    const { id } = await params;
    const run = getPipelineRun(id);

    if (!run) {
      return respondJson(
        404,
        { error: "Pipeline run not found" },
        "RUN_NOT_FOUND",
      );
    }

    const files = run.artifacts.files;
    if (!files || files.length === 0) {
      return respondJson(
        404,
        { error: "No export artifacts available for this pipeline run" },
        "EXPORT_NOT_FOUND",
      );
    }

    const zip = new JSZip();
    for (const file of files) {
      zip.file(file.filename, file.content);
    }

    const archive = await zip.generateAsync({ type: "blob" });
    const label = safeFilenamePart(run.artifacts.generated?.name || `pipeline-${id}`);

    return new NextResponse(archive, {
      status: 200,
      headers: telemetryHeaders(200, undefined, {
        "content-type": "application/zip",
        "content-disposition": `attachment; filename="${label}.zip"`,
        "cache-control": "no-store",
      }),
    });
  } catch (error) {
    return respondJson(
      500,
      { error: `Failed to build pipeline download: ${(error as Error).message}` },
      "PIPELINE_DOWNLOAD_FAILED",
    );
  }
}
