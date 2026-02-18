import { afterEach, describe, expect, it, vi } from "vitest";
import type { PipelineRun } from "@/lib/pipeline/types";

const checkRateLimitMock = vi.fn();
const createRateLimitHeadersMock = vi.fn(() => ({ "retry-after": "60" }));
const getRequestClientKeyMock = vi.fn(() => "client-key");
const getPipelineRunMock = vi.fn();
const executePipelineMock = vi.fn();

vi.mock("@/lib/security/rate-limit", () => ({
  checkRateLimit: checkRateLimitMock,
  createRateLimitHeaders: createRateLimitHeadersMock,
  getRequestClientKey: getRequestClientKeyMock,
}));

vi.mock("@/lib/pipeline/store", () => ({
  getPipelineRun: getPipelineRunMock,
}));

vi.mock("@/lib/pipeline/orchestrator", () => ({
  executePipeline: executePipelineMock,
}));

afterEach(() => {
  checkRateLimitMock.mockReset();
  createRateLimitHeadersMock.mockClear();
  getRequestClientKeyMock.mockClear();
  getPipelineRunMock.mockReset();
  executePipelineMock.mockReset();
});

function mockAllowedRateLimit() {
  checkRateLimitMock.mockReturnValue({
    allowed: true,
    limit: 24,
    remaining: 23,
    resetAt: Date.now() + 60_000,
    retryAfterSec: 60,
  });
}

describe("POST /api/pipeline/run/[id]/retry", () => {
  it("rejects cross-origin requests before rate limit check", async () => {
    const { POST } = await import("@/app/api/pipeline/run/[id]/retry/route");

    const response = await POST(
      new Request("https://www.stylekit.top/api/pipeline/run/pl_1/retry", {
        method: "POST",
        headers: {
          origin: "https://evil.example",
          "content-type": "application/json",
        },
        body: JSON.stringify({ fromStage: "extract" }),
      }),
      { params: Promise.resolve({ id: "pl_1" }) }
    );

    expect(response.status).toBe(403);
    expect(response.headers.get("x-stylekit-status")).toBe("403");
    expect(response.headers.get("x-stylekit-error-code")).toBe(
      "ORIGIN_NOT_ALLOWED"
    );
    expect(Number(response.headers.get("x-stylekit-duration-ms"))).toBeGreaterThanOrEqual(
      0
    );
    await expect(response.json()).resolves.toEqual({
      error: "Cross-origin request denied.",
    });
    expect(checkRateLimitMock).not.toHaveBeenCalled();
  });

  it("returns 429 when retry request is rate limited", async () => {
    checkRateLimitMock.mockReturnValue({
      allowed: false,
      limit: 24,
      remaining: 0,
      resetAt: Date.now() + 60_000,
      retryAfterSec: 60,
    });

    const { POST } = await import("@/app/api/pipeline/run/[id]/retry/route");
    const response = await POST(
      new Request("https://www.stylekit.top/api/pipeline/run/pl_1/retry", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ fromStage: "extract" }),
      }),
      { params: Promise.resolve({ id: "pl_1" }) }
    );

    expect(response.status).toBe(429);
    expect(response.headers.get("x-stylekit-status")).toBe("429");
    expect(response.headers.get("x-stylekit-error-code")).toBe("RATE_LIMITED");
    await expect(response.json()).resolves.toEqual({
      error: "Too many retry requests. Please try again later.",
    });
    expect(createRateLimitHeadersMock).toHaveBeenCalledTimes(1);
    expect(getPipelineRunMock).not.toHaveBeenCalled();
  });

  it("returns 413 when retry payload exceeds limit", async () => {
    mockAllowedRateLimit();

    const { POST } = await import("@/app/api/pipeline/run/[id]/retry/route");
    const response = await POST(
      new Request("https://www.stylekit.top/api/pipeline/run/pl_1/retry", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          fromStage: "extract",
          padding: "x".repeat(10_000),
        }),
      }),
      { params: Promise.resolve({ id: "pl_1" }) }
    );

    expect(response.status).toBe(413);
    expect(response.headers.get("x-stylekit-status")).toBe("413");
    expect(response.headers.get("x-stylekit-error-code")).toBe(
      "PAYLOAD_TOO_LARGE"
    );
    await expect(response.json()).resolves.toEqual({
      error: "Retry payload is too large.",
    });
    expect(getPipelineRunMock).not.toHaveBeenCalled();
  });

  it("returns 400 when retry payload is invalid json", async () => {
    mockAllowedRateLimit();

    const { POST } = await import("@/app/api/pipeline/run/[id]/retry/route");
    const response = await POST(
      new Request("https://www.stylekit.top/api/pipeline/run/pl_1/retry", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: "{invalid-json}",
      }),
      { params: Promise.resolve({ id: "pl_1" }) }
    );

    expect(response.status).toBe(400);
    expect(response.headers.get("x-stylekit-status")).toBe("400");
    expect(response.headers.get("x-stylekit-error-code")).toBe("INVALID_JSON");
    await expect(response.json()).resolves.toEqual({
      error: "Invalid retry request payload.",
    });
  });

  it("returns 400 for invalid fromStage values", async () => {
    mockAllowedRateLimit();

    const { POST } = await import("@/app/api/pipeline/run/[id]/retry/route");
    const response = await POST(
      new Request("https://www.stylekit.top/api/pipeline/run/pl_1/retry", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ fromStage: "unknown" }),
      }),
      { params: Promise.resolve({ id: "pl_1" }) }
    );

    expect(response.status).toBe(400);
    expect(response.headers.get("x-stylekit-status")).toBe("400");
    expect(response.headers.get("x-stylekit-error-code")).toBe("INVALID_STAGE");
    const payload = await response.json();
    expect(payload.error).toContain("Invalid fromStage.");
  });

  it("returns 404 when pipeline run does not exist", async () => {
    mockAllowedRateLimit();
    getPipelineRunMock.mockReturnValue(undefined);

    const { POST } = await import("@/app/api/pipeline/run/[id]/retry/route");
    const response = await POST(
      new Request("https://www.stylekit.top/api/pipeline/run/missing/retry", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ fromStage: "extract" }),
      }),
      { params: Promise.resolve({ id: "missing" }) }
    );

    expect(response.status).toBe(404);
    expect(response.headers.get("x-stylekit-status")).toBe("404");
    expect(response.headers.get("x-stylekit-error-code")).toBe("RUN_NOT_FOUND");
    await expect(response.json()).resolves.toEqual({
      error: "Pipeline run not found",
    });
  });

  it("returns 400 when retrying a non-failed run", async () => {
    mockAllowedRateLimit();
    const runningRun = { ...createFailedRunFixture(), status: "running" as const };
    getPipelineRunMock.mockReturnValue(runningRun);

    const { POST } = await import("@/app/api/pipeline/run/[id]/retry/route");
    const response = await POST(
      new Request("https://www.stylekit.top/api/pipeline/run/pl_1/retry", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ fromStage: "extract" }),
      }),
      { params: Promise.resolve({ id: "pl_1" }) }
    );

    expect(response.status).toBe(400);
    expect(response.headers.get("x-stylekit-status")).toBe("400");
    expect(response.headers.get("x-stylekit-error-code")).toBe("RUN_NOT_FAILED");
    await expect(response.json()).resolves.toEqual({
      error: "Can only retry failed pipeline runs",
    });
  });

  it("returns 400 when retry stage is after failed stage", async () => {
    mockAllowedRateLimit();
    const failedRun = createFailedRunFixture();
    getPipelineRunMock.mockReturnValue(failedRun);

    const { POST } = await import("@/app/api/pipeline/run/[id]/retry/route");
    const response = await POST(
      new Request("https://www.stylekit.top/api/pipeline/run/pl_1/retry", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ fromStage: "generate" }),
      }),
      { params: Promise.resolve({ id: "pl_1" }) }
    );

    expect(response.status).toBe(400);
    expect(response.headers.get("x-stylekit-status")).toBe("400");
    expect(response.headers.get("x-stylekit-error-code")).toBe(
      "INVALID_STAGE_ORDER"
    );
    const payload = await response.json();
    expect(payload.error).toContain('Cannot retry from "generate"');
  });

  it("retries failed run from requested stage", async () => {
    mockAllowedRateLimit();

    const failedRun = createFailedRunFixture();
    getPipelineRunMock.mockReturnValue(failedRun);
    executePipelineMock.mockResolvedValue({
      ...failedRun,
      status: "completed",
      updatedAt: "2026-02-17T00:00:05.000Z",
    } satisfies PipelineRun);

    const { POST } = await import("@/app/api/pipeline/run/[id]/retry/route");
    const response = await POST(
      new Request("https://www.stylekit.top/api/pipeline/run/pl_1/retry", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ fromStage: "extract" }),
      }),
      { params: Promise.resolve({ id: "pl_1" }) }
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("x-stylekit-status")).toBe("200");
    expect(response.headers.get("x-stylekit-error-code")).toBeNull();
    const body = (await response.json()) as { run: PipelineRun };
    expect(body.run.status).toBe("completed");
    expect(getPipelineRunMock).toHaveBeenCalledWith("pl_1");
    expect(executePipelineMock).toHaveBeenCalledWith(failedRun, "extract");
  });

  it("returns 500 when retry execution fails", async () => {
    mockAllowedRateLimit();

    const failedRun = createFailedRunFixture();
    getPipelineRunMock.mockReturnValue(failedRun);
    executePipelineMock.mockRejectedValue(new Error("retry boom"));

    const { POST } = await import("@/app/api/pipeline/run/[id]/retry/route");
    const response = await POST(
      new Request("https://www.stylekit.top/api/pipeline/run/pl_1/retry", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ fromStage: "extract" }),
      }),
      { params: Promise.resolve({ id: "pl_1" }) }
    );

    expect(response.status).toBe(500);
    expect(response.headers.get("x-stylekit-status")).toBe("500");
    expect(response.headers.get("x-stylekit-error-code")).toBe(
      "PIPELINE_RETRY_FAILED"
    );
    await expect(response.json()).resolves.toEqual({
      error: "Pipeline retry failed: retry boom",
    });
  });
});

function createFailedRunFixture(): PipelineRun {
  return {
    id: "pl_1",
    status: "failed",
    sourceUrl: "https://example.com",
    target: { framework: "react", styleSlug: "neo-brutalist" },
    output: { format: "zip" },
    options: { autoMapTokens: true },
    stages: [
      { name: "extract", status: "failed", durationMs: 10, error: "extract failed" },
      { name: "analyze", status: "pending", durationMs: 0 },
      { name: "match", status: "pending", durationMs: 0 },
      { name: "migrate", status: "pending", durationMs: 0 },
      { name: "generate", status: "pending", durationMs: 0 },
      { name: "export", status: "pending", durationMs: 0 },
    ],
    artifacts: {},
    createdAt: "2026-02-17T00:00:00.000Z",
    updatedAt: "2026-02-17T00:00:01.000Z",
    error: "extract failed",
  };
}
