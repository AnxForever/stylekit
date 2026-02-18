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

function mockAllowedRateLimit() {
  checkRateLimitMock.mockReturnValue({
    allowed: true,
    limit: 12,
    remaining: 11,
    resetAt: Date.now() + 60_000,
    retryAfterSec: 60,
  });
}

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
    expect(response.headers.get("x-stylekit-status")).toBe("429");
    expect(response.headers.get("x-stylekit-error-code")).toBe("RATE_LIMITED");
    await expect(response.json()).resolves.toEqual({
      error: "Too many pipeline runs. Please try again later.",
    });
    expect(createRateLimitHeadersMock).toHaveBeenCalledTimes(1);
    expect(createPipelineRunMock).not.toHaveBeenCalled();
  });

  it("returns 413 when payload exceeds body size limit", async () => {
    mockAllowedRateLimit();

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
    expect(response.headers.get("x-stylekit-status")).toBe("413");
    expect(response.headers.get("x-stylekit-error-code")).toBe(
      "PAYLOAD_TOO_LARGE"
    );
    await expect(response.json()).resolves.toEqual({
      error: "Pipeline payload is too large.",
    });
    expect(createPipelineRunMock).not.toHaveBeenCalled();
  });

  it("returns 400 for invalid json payload", async () => {
    mockAllowedRateLimit();

    const { POST } = await import("@/app/api/pipeline/run/route");
    const response = await POST(
      new Request("https://www.stylekit.top/api/pipeline/run", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: "{bad-json}",
      })
    );

    expect(response.status).toBe(400);
    expect(response.headers.get("x-stylekit-status")).toBe("400");
    expect(response.headers.get("x-stylekit-error-code")).toBe("INVALID_JSON");
    await expect(response.json()).resolves.toEqual({
      error: "Invalid pipeline request payload.",
    });
    expect(createPipelineRunMock).not.toHaveBeenCalled();
  });

  it("returns 400 for schema validation errors", async () => {
    mockAllowedRateLimit();

    const { POST } = await import("@/app/api/pipeline/run/route");
    const response = await POST(
      new Request("https://www.stylekit.top/api/pipeline/run", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sourceUrl: "ftp://example.com",
          target: { framework: "react" },
          output: { format: "zip" },
        }),
      })
    );

    expect(response.status).toBe(400);
    expect(response.headers.get("x-stylekit-status")).toBe("400");
    expect(response.headers.get("x-stylekit-error-code")).toBe(
      "INVALID_REQUEST"
    );
    await expect(response.json()).resolves.toEqual({
      error: "sourceUrl must start with http:// or https://",
    });
    expect(createPipelineRunMock).not.toHaveBeenCalled();
  });

  it("creates and executes pipeline run when request is valid", async () => {
    mockAllowedRateLimit();

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
    expect(response.headers.get("x-stylekit-status")).toBe("200");
    expect(response.headers.get("x-stylekit-error-code")).toBeNull();
    const body = (await response.json()) as { run: PipelineRun };
    expect(body.run.status).toBe("completed");
    expect(createPipelineRunMock).toHaveBeenCalledTimes(1);
    expect(executePipelineMock).toHaveBeenCalledTimes(1);
  });

  it("returns 500 when pipeline execution throws", async () => {
    mockAllowedRateLimit();
    const run = createPipelineRunFixture();
    createPipelineRunMock.mockReturnValue(run);
    executePipelineMock.mockRejectedValue(new Error("boom"));

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

    expect(response.status).toBe(500);
    expect(response.headers.get("x-stylekit-status")).toBe("500");
    expect(response.headers.get("x-stylekit-error-code")).toBe(
      "PIPELINE_EXECUTION_FAILED"
    );
    await expect(response.json()).resolves.toEqual({
      error: "Pipeline execution failed: boom",
    });
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
