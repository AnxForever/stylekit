import { afterEach, describe, expect, it, vi } from "vitest";
import type { PipelineRun } from "@/lib/pipeline/types";

const getPipelineRunMock = vi.fn();

vi.mock("@/lib/pipeline/store", () => ({
  getPipelineRun: getPipelineRunMock,
}));

afterEach(() => {
  getPipelineRunMock.mockReset();
});

describe("GET /api/pipeline/run/[id]", () => {
  it("returns 404 when run is missing", async () => {
    getPipelineRunMock.mockReturnValue(undefined);

    const { GET } = await import("@/app/api/pipeline/run/[id]/route");
    const response = await GET(
      new Request("https://www.stylekit.top/api/pipeline/run/pl_missing"),
      { params: Promise.resolve({ id: "pl_missing" }) }
    );

    expect(response.status).toBe(404);
    expect(response.headers.get("x-stylekit-status")).toBe("404");
    expect(response.headers.get("x-stylekit-error-code")).toBe("RUN_NOT_FOUND");
    expect(Number(response.headers.get("x-stylekit-duration-ms"))).toBeGreaterThanOrEqual(0);
    await expect(response.json()).resolves.toEqual({
      error: "Pipeline run not found",
    });
  });

  it("returns run payload when found", async () => {
    const run = createRunFixture();
    getPipelineRunMock.mockReturnValue(run);

    const { GET } = await import("@/app/api/pipeline/run/[id]/route");
    const response = await GET(
      new Request("https://www.stylekit.top/api/pipeline/run/pl_1"),
      { params: Promise.resolve({ id: "pl_1" }) }
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("x-stylekit-status")).toBe("200");
    expect(response.headers.get("x-stylekit-error-code")).toBeNull();
    await expect(response.json()).resolves.toEqual({ run });
  });

  it("returns 500 when request processing throws", async () => {
    const { GET } = await import("@/app/api/pipeline/run/[id]/route");
    const response = await GET(
      new Request("https://www.stylekit.top/api/pipeline/run/pl_1"),
      { params: Promise.reject(new Error("boom")) }
    );

    expect(response.status).toBe(500);
    expect(response.headers.get("x-stylekit-status")).toBe("500");
    expect(response.headers.get("x-stylekit-error-code")).toBe(
      "PIPELINE_RUN_FETCH_FAILED"
    );
    await expect(response.json()).resolves.toEqual({
      error: "Failed to retrieve pipeline run: boom",
    });
  });
});

function createRunFixture(): PipelineRun {
  return {
    id: "pl_1",
    status: "running",
    sourceUrl: "https://example.com",
    target: { framework: "react" },
    output: { format: "zip" },
    options: {},
    stages: [
      { name: "extract", status: "completed", durationMs: 1 },
      { name: "analyze", status: "running", durationMs: 0 },
      { name: "match", status: "pending", durationMs: 0 },
      { name: "migrate", status: "pending", durationMs: 0 },
      { name: "generate", status: "pending", durationMs: 0 },
      { name: "export", status: "pending", durationMs: 0 },
    ],
    artifacts: {},
    createdAt: "2026-02-18T00:00:00.000Z",
    updatedAt: "2026-02-18T00:00:01.000Z",
  };
}
