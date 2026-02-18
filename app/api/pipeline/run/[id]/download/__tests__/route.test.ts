import { afterEach, describe, expect, it, vi } from "vitest";
import type { PipelineRun } from "@/lib/pipeline/types";

const getPipelineRunMock = vi.fn();

vi.mock("@/lib/pipeline/store", () => ({
  getPipelineRun: getPipelineRunMock,
}));

afterEach(() => {
  getPipelineRunMock.mockReset();
});

describe("GET /api/pipeline/run/[id]/download", () => {
  it("returns 404 when pipeline run does not exist", async () => {
    getPipelineRunMock.mockReturnValue(null);

    const { GET } = await import("@/app/api/pipeline/run/[id]/download/route");
    const response = await GET(
      new Request("https://www.stylekit.top/api/pipeline/run/pl_1/download"),
      { params: Promise.resolve({ id: "pl_1" }) },
    );

    expect(response.status).toBe(404);
    expect(response.headers.get("x-stylekit-status")).toBe("404");
    expect(response.headers.get("x-stylekit-error-code")).toBe("RUN_NOT_FOUND");
    expect(Number(response.headers.get("x-stylekit-duration-ms"))).toBeGreaterThanOrEqual(0);
    await expect(response.json()).resolves.toEqual({
      error: "Pipeline run not found",
    });
  });

  it("returns 404 when run has no exported files", async () => {
    getPipelineRunMock.mockReturnValue(createRun({ artifacts: {} }));

    const { GET } = await import("@/app/api/pipeline/run/[id]/download/route");
    const response = await GET(
      new Request("https://www.stylekit.top/api/pipeline/run/pl_1/download"),
      { params: Promise.resolve({ id: "pl_1" }) },
    );

    expect(response.status).toBe(404);
    expect(response.headers.get("x-stylekit-status")).toBe("404");
    expect(response.headers.get("x-stylekit-error-code")).toBe("EXPORT_NOT_FOUND");
    await expect(response.json()).resolves.toEqual({
      error: "No export artifacts available for this pipeline run",
    });
  });

  it("returns zip archive when exported files exist", async () => {
    getPipelineRunMock.mockReturnValue(
      createRun({
        artifacts: {
          files: [
            {
              name: "Metadata",
              filename: "meta.json",
              description: "meta",
              descriptionEn: "meta",
              content: "{\"ok\":true}",
              mimeType: "application/json",
              icon: "info",
            },
          ],
        },
      }),
    );

    const { GET } = await import("@/app/api/pipeline/run/[id]/download/route");
    const response = await GET(
      new Request("https://www.stylekit.top/api/pipeline/run/pl_1/download"),
      { params: Promise.resolve({ id: "pl_1" }) },
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("application/zip");
    expect(response.headers.get("x-stylekit-status")).toBe("200");
    expect(response.headers.get("x-stylekit-error-code")).toBeNull();
    expect(response.headers.get("content-disposition")).toContain(
      "filename=\"pipeline-pl_1.zip\"",
    );

    const body = await response.arrayBuffer();
    expect(body.byteLength).toBeGreaterThan(0);
  });

  it("returns 500 when params resolution throws", async () => {
    getPipelineRunMock.mockReset();

    const { GET } = await import("@/app/api/pipeline/run/[id]/download/route");
    const response = await GET(
      new Request("https://www.stylekit.top/api/pipeline/run/pl_1/download"),
      { params: Promise.reject(new Error("boom")) },
    );

    expect(response.status).toBe(500);
    expect(response.headers.get("x-stylekit-status")).toBe("500");
    expect(response.headers.get("x-stylekit-error-code")).toBe(
      "PIPELINE_DOWNLOAD_FAILED",
    );
    await expect(response.json()).resolves.toEqual({
      error: "Failed to build pipeline download: boom",
    });
  });
});

function createRun(
  overrides: Partial<PipelineRun> = {},
): PipelineRun {
  return {
    id: "pl_1",
    status: "completed",
    sourceUrl: "https://example.com",
    target: { framework: "react" },
    output: { format: "zip" },
    options: {},
    stages: [
      { name: "extract", status: "completed", durationMs: 1 },
      { name: "analyze", status: "completed", durationMs: 1 },
      { name: "match", status: "completed", durationMs: 1 },
      { name: "migrate", status: "completed", durationMs: 1 },
      { name: "generate", status: "completed", durationMs: 1 },
      { name: "export", status: "completed", durationMs: 1 },
    ],
    artifacts: {},
    createdAt: "2026-02-17T00:00:00.000Z",
    updatedAt: "2026-02-17T00:00:01.000Z",
    ...overrides,
  };
}
