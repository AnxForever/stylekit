import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/security/rate-limit", () => ({
  checkRateLimit: vi.fn(),
  createRateLimitHeaders: vi.fn(),
  getRequestClientKey: vi.fn(),
}));

vi.mock("@/lib/security/request-origin", () => ({
  verifyTrustedOrigin: vi.fn(),
}));

vi.mock("@/lib/generator/api-events", () => ({
  hashGeneratorClientKey: vi.fn(() => "client-hash"),
  recordGeneratorApiEvent: vi.fn(),
}));

import { POST } from "@/app/api/generate-style/report-fallback/route";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { recordGeneratorApiEvent } from "@/lib/generator/api-events";

const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedCreateRateLimitHeaders = vi.mocked(createRateLimitHeaders);
const mockedGetRequestClientKey = vi.mocked(getRequestClientKey);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedRecordGeneratorApiEvent = vi.mocked(recordGeneratorApiEvent);

afterEach(() => {
  vi.clearAllMocks();
});

function mockAllowedReportRequest() {
  mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
  mockedGetRequestClientKey.mockReturnValue("ip:style-generator-report");
  mockedCheckRateLimit.mockReturnValue({
    allowed: true,
    limit: 60,
    remaining: 59,
    resetAt: Date.now() + 1_000,
    retryAfterSec: 1,
  });
}

describe("POST /api/generate-style/report-fallback", () => {
  it("rejects untrusted origins", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({
      ok: false,
      status: 403,
      error: "Cross-origin request denied",
    });

    const response = await POST(
      new Request("https://stylekit.top/api/generate-style/report-fallback", {
        method: "POST",
      })
    );

    expect(response.status).toBe(403);
    expect(response.headers.get("x-stylekit-error-code")).toBe("ORIGIN_NOT_ALLOWED");
    await expect(response.json()).resolves.toEqual({
      code: "ORIGIN_NOT_ALLOWED",
      error: "Cross-origin request denied",
    });
  });

  it("returns 429 when fallback-report rate limit is exceeded", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:style-generator-report");
    mockedCheckRateLimit.mockReturnValue({
      allowed: false,
      limit: 60,
      remaining: 0,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 60,
    });
    mockedCreateRateLimitHeaders.mockReturnValue({ "x-ratelimit-remaining": "0" });

    const response = await POST(
      new Request("https://stylekit.top/api/generate-style/report-fallback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ reason: "network-error" }),
      })
    );

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({
      code: "RATE_LIMITED",
      error: "Too many fallback reports. Please try again later.",
    });
  });

  it("returns INVALID_REQUEST for malformed payload", async () => {
    mockAllowedReportRequest();

    const response = await POST(
      new Request("https://stylekit.top/api/generate-style/report-fallback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ reason: "unknown" }),
      })
    );

    expect(response.status).toBe(400);
    const payload = await response.json();
    expect(payload.code).toBe("INVALID_REQUEST");
    expect(payload.error).toContain("Invalid option");
  });

  it("records network fallback telemetry", async () => {
    mockAllowedReportRequest();

    const response = await POST(
      new Request("https://stylekit.top/api/generate-style/report-fallback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ reason: "network-error" }),
      })
    );

    expect(response.status).toBe(202);
    expect(response.headers.get("x-stylekit-status")).toBe("202");
    expect(response.headers.get("x-stylekit-error-code")).toBe(
      "DISCOVERY_CLIENT_FALLBACK_NETWORK"
    );
    await expect(response.json()).resolves.toEqual({
      ok: true,
      code: "DISCOVERY_CLIENT_FALLBACK_NETWORK",
    });
    expect(mockedRecordGeneratorApiEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "generate-style",
        outcome: "error",
        status: 202,
        code: "DISCOVERY_CLIENT_FALLBACK_NETWORK",
      })
    );
  });

  it("records unexpected-status fallback with appended status code", async () => {
    mockAllowedReportRequest();

    const response = await POST(
      new Request("https://stylekit.top/api/generate-style/report-fallback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          reason: "unexpected-status",
          httpStatus: 503,
        }),
      })
    );

    expect(response.status).toBe(202);
    expect(response.headers.get("x-stylekit-status")).toBe("202");
    expect(response.headers.get("x-stylekit-error-code")).toBe(
      "DISCOVERY_CLIENT_FALLBACK_UNEXPECTED_STATUS_503"
    );
    await expect(response.json()).resolves.toEqual({
      ok: true,
      code: "DISCOVERY_CLIENT_FALLBACK_UNEXPECTED_STATUS_503",
    });
    expect(mockedRecordGeneratorApiEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "generate-style",
        outcome: "error",
        status: 503,
        code: "DISCOVERY_CLIENT_FALLBACK_UNEXPECTED_STATUS_503",
      })
    );
  });
});
