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
    await expect(response.json()).resolves.toEqual({
      error: "Too many retry requests. Please try again later.",
    });
    expect(createRateLimitHeadersMock).toHaveBeenCalledTimes(1);
    expect(getPipelineRunMock).not.toHaveBeenCalled();
  });

  it("returns 413 when retry payload exceeds limit", async () => {
    checkRateLimitMock.mockReturnValue({
      allowed: true,
      limit: 24,
      remaining: 23,
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
        body: JSON.stringify({
          fromStage: "extract",
          padding: "x".repeat(10_000),
        }),
      }),
      { params: Promise.resolve({ id: "pl_1" }) }
    );

    expect(response.status).toBe(413);
    await expect(response.json()).resolves.toEqual({
      error: "Retry payload is too large.",
    });
    expect(getPipelineRunMock).not.toHaveBeenCalled();
  });

  it("retries failed run from requested stage", async () => {
    checkRateLimitMock.mockReturnValue({
      allowed: true,
      limit: 24,
      remaining: 23,
      resetAt: Date.now() + 60_000,
      retryAfterSec: 60,
    });

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
    const body = (await response.json()) as { run: PipelineRun };
    expect(body.run.status).toBe("completed");
    expect(getPipelineRunMock).toHaveBeenCalledWith("pl_1");
    expect(executePipelineMock).toHaveBeenCalledWith(failedRun, "extract");
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
