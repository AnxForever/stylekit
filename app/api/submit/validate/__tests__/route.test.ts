import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/security/rate-limit", () => ({
  checkRateLimit: vi.fn(),
  createRateLimitHeaders: vi.fn(),
  getRequestClientKey: vi.fn(),
}));

vi.mock("@/lib/security/request-origin", () => ({
  verifyTrustedOrigin: vi.fn(),
}));

vi.mock("@/lib/security/json-body", () => ({
  parseJsonBodyWithLimit: vi.fn(),
}));

vi.mock("@/lib/submit/manifest-validator", () => ({
  validateStyleSubmissionManifest: vi.fn(),
  getManifestSummary: vi.fn(),
}));

import { POST } from "@/app/api/submit/validate/route";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import {
  getManifestSummary,
  validateStyleSubmissionManifest,
} from "@/lib/submit/manifest-validator";

const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedCreateRateLimitHeaders = vi.mocked(createRateLimitHeaders);
const mockedGetRequestClientKey = vi.mocked(getRequestClientKey);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedParseJsonBodyWithLimit = vi.mocked(parseJsonBodyWithLimit);
const mockedValidateStyleSubmissionManifest = vi.mocked(
  validateStyleSubmissionManifest
);
const mockedGetManifestSummary = vi.mocked(getManifestSummary);

afterEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/submit/validate", () => {
  it("rejects untrusted origins", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({
      ok: false,
      status: 403,
      error: "Cross-origin request denied.",
    });

    const response = await POST(
      new Request("https://stylekit.top/api/submit/validate", { method: "POST" })
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Cross-origin request denied.",
    });
  });

  it("enforces rate limits", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:limit");
    mockedCheckRateLimit.mockReturnValue({
      allowed: false,
      limit: 60,
      remaining: 0,
      resetAt: Date.now() + 10_000,
      retryAfterSec: 10,
    });
    mockedCreateRateLimitHeaders.mockReturnValue({ "retry-after": "10" });

    const response = await POST(
      new Request("https://stylekit.top/api/submit/validate", { method: "POST" })
    );

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Too many validation requests. Please try again later.",
    });
  });

  it("returns body parse errors", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:body");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 60,
      remaining: 59,
      resetAt: Date.now() + 10_000,
      retryAfterSec: 0,
    });
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: false,
      status: 413,
      error: "Manifest payload is too large.",
    });

    const response = await POST(
      new Request("https://stylekit.top/api/submit/validate", { method: "POST" })
    );

    expect(response.status).toBe(413);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Manifest payload is too large.",
    });
  });

  it("returns validation issues for invalid manifests", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:manifest-bad");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 60,
      remaining: 59,
      resetAt: Date.now() + 10_000,
      retryAfterSec: 0,
    });
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { manifest: { schemaVersion: "bad" } },
    });
    mockedValidateStyleSubmissionManifest.mockReturnValue({
      ok: false,
      issues: [{ path: "schemaVersion", message: "Invalid", code: "invalid" }],
    });

    const response = await POST(
      new Request("https://stylekit.top/api/submit/validate", { method: "POST" })
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Manifest validation failed.",
      issues: [{ path: "schemaVersion", message: "Invalid", code: "invalid" }],
    });
  });

  it("returns summary and warnings for valid manifests", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:manifest-ok");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 60,
      remaining: 59,
      resetAt: Date.now() + 10_000,
      retryAfterSec: 0,
    });
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { manifest: { schemaVersion: "1.0.0" } },
    });
    mockedValidateStyleSubmissionManifest.mockReturnValue({
      ok: true,
      data: {
        assets: { coverSvg: "raw text" },
        formData: { aiRules: [] },
      },
      issues: [],
    } as never);
    mockedGetManifestSummary.mockReturnValue({
      slug: "neo-brutalist",
      name: "Neo Brutalist CN",
      nameEn: "Neo Brutalist",
      category: "modern",
      styleType: "visual",
    });

    const response = await POST(
      new Request("https://stylekit.top/api/submit/validate", { method: "POST" })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      ok: true,
      summary: {
        slug: "neo-brutalist",
        name: "Neo Brutalist CN",
        nameEn: "Neo Brutalist",
        category: "modern",
        styleType: "visual",
      },
      warnings: [
        "coverSvg does not appear to contain an <svg> root element.",
        "aiRules is empty. Add style guidance for better generation quality.",
      ],
    });
  });
});
