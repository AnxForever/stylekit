import { afterEach, describe, expect, it, vi } from "vitest";
import type { PipelineRun } from "@/lib/pipeline/types";

const checkRateLimitMock = vi.fn();
const createRateLimitHeadersMock = vi.fn(() => ({ "retry-after": "60" }));
const getRequestClientKeyMock = vi.fn(() => "client-key");
const createPipelineRunMock = vi.fn();
const executePipelineMock = vi.fn();

vi.mock("@/lib/security/rate-limit", () => ({
  checkRateLimit: checkRateLimitMock,
  createRateLimitHeaders: createRateLimitHeadersMock,
  getRequestClientKey: getRequestClientKeyMock,
}));

vi.mock("@/lib/pipeline/store", () => ({
  createPipelineRun: createPipelineRunMock,
}));

vi.mock("@/lib/pipeline/orchestrator", () => ({
  executePipeline: executePipelineMock,
}));

afterEach(() => {
  checkRateLimitMock.mockReset();
  createRateLimitHeadersMock.mockClear();
  getRequestClientKeyMock.mockClear();
  createPipelineRunMock.mockReset();
  executePipelineMock.mockReset();
});

describe("POST /api/pipeline/run", () => {
  it("rejects cross-origin requests before rate limit check", async () => {
    const { POST } = await import("@/app/api/pipeline/run/route");

    const response = await POST(
      new Request("https://www.stylekit.top/api/pipeline/run", {
        method: "POST",
        headers: {
          origin: "https://evil.example",
          "content-type": "application/json",
        },
        body: JSON.stringify({}),
      })
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({
      error: "Cross-origin request denied.",
    });
    expect(checkRateLimitMock).not.toHaveBeenCalled();
  });

  it("returns 429 when request is rate limited", async () => {
    checkRateLimitMock.mockReturnValue({
      allowed: false,
      limit: 12,
      remaining: 0,
      resetAt: Date.now() + 60_000,
      retryAfterSec: 60,
    });

    const { POST } = await import("@/app/api/pipeline/run/route");
    const response = await POST(
      new Request("https://www.stylekit.top/api/pipeline/run", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sourceUrl: "https://example.com",
          target: { framework: "react" },
          output: { format: "zip" },
        }),
      })
    );

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({
      error: "Too many pipeline runs. Please try again later.",
    });
    expect(createRateLimitHeadersMock).toHaveBeenCalledTimes(1);
    expect(createPipelineRunMock).not.toHaveBeenCalled();
  });

  it("returns 413 when payload exceeds body size limit", async () => {
    checkRateLimitMock.mockReturnValue({
      allowed: true,
      limit: 12,
      remaining: 11,
      resetAt: Date.now() + 60_000,
      retryAfterSec: 60,
    });

    const { POST } = await import("@/app/api/pipeline/run/route");
    const response = await POST(
      new Request("https://www.stylekit.top/api/pipeline/run", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sourceUrl: "https://example.com",
          target: { framework: "react" },
          output: { format: "zip" },
          padding: "x".repeat(20_000),
        }),
      })
    );

    expect(response.status).toBe(413);
    await expect(response.json()).resolves.toEqual({
      error: "Pipeline payload is too large.",
    });
    expect(createPipelineRunMock).not.toHaveBeenCalled();
  });

  it("creates and executes pipeline run when request is valid", async () => {
    checkRateLimitMock.mockReturnValue({
      allowed: true,
      limit: 12,
      remaining: 11,
      resetAt: Date.now() + 60_000,
      retryAfterSec: 60,
    });

    const run = createPipelineRunFixture();
    createPipelineRunMock.mockReturnValue(run);
    executePipelineMock.mockResolvedValue({
      ...run,
      status: "completed",
      updatedAt: "2026-02-17T00:00:01.000Z",
    } satisfies PipelineRun);

    const { POST } = await import("@/app/api/pipeline/run/route");
    const response = await POST(
      new Request("https://www.stylekit.top/api/pipeline/run", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sourceUrl: "https://example.com",
          target: { framework: "react", styleSlug: "neo-brutalist" },
          output: { format: "zip" },
          options: { autoMapTokens: true },
        }),
      })
    );

    expect(response.status).toBe(200);
    const body = (await response.json()) as { run: PipelineRun };
    expect(body.run.status).toBe("completed");
    expect(createPipelineRunMock).toHaveBeenCalledTimes(1);
    expect(executePipelineMock).toHaveBeenCalledTimes(1);
  });
});

function createPipelineRunFixture(): PipelineRun {
  return {
    id: "pl_test_1",
    status: "pending",
    sourceUrl: "https://example.com",
    target: { framework: "react", styleSlug: "neo-brutalist" },
    output: { format: "zip" },
    options: { autoMapTokens: true },
    stages: [
      { name: "extract", status: "pending", durationMs: 0 },
      { name: "analyze", status: "pending", durationMs: 0 },
      { name: "match", status: "pending", durationMs: 0 },
      { name: "migrate", status: "pending", durationMs: 0 },
      { name: "generate", status: "pending", durationMs: 0 },
      { name: "export", status: "pending", durationMs: 0 },
    ],
    artifacts: {},
    createdAt: "2026-02-17T00:00:00.000Z",
    updatedAt: "2026-02-17T00:00:00.000Z",
  };
}
