import { afterEach, describe, expect, it, vi } from "vitest";
import JSZip from "jszip";

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
}));

vi.mock("@/lib/submit/submission-bundle", () => ({
  buildSubmissionBundleFiles: vi.fn(),
  createSubmissionBundleFilename: vi.fn(),
}));

import { POST } from "@/app/api/submit/bundle/route";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { validateStyleSubmissionManifest } from "@/lib/submit/manifest-validator";
import {
  buildSubmissionBundleFiles,
  createSubmissionBundleFilename,
} from "@/lib/submit/submission-bundle";

const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedCreateRateLimitHeaders = vi.mocked(createRateLimitHeaders);
const mockedGetRequestClientKey = vi.mocked(getRequestClientKey);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedParseJsonBodyWithLimit = vi.mocked(parseJsonBodyWithLimit);
const mockedValidateStyleSubmissionManifest = vi.mocked(
  validateStyleSubmissionManifest
);
const mockedBuildSubmissionBundleFiles = vi.mocked(buildSubmissionBundleFiles);
const mockedCreateSubmissionBundleFilename = vi.mocked(
  createSubmissionBundleFilename
);

afterEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/submit/bundle", () => {
  it("rejects untrusted origins", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({
      ok: false,
      status: 403,
      error: "Cross-origin request denied.",
    });

    const response = await POST(
      new Request("https://stylekit.top/api/submit/bundle", { method: "POST" })
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Cross-origin request denied.",
    });
  });

  it("enforces rate limits", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:bundle-limit");
    mockedCheckRateLimit.mockReturnValue({
      allowed: false,
      limit: 30,
      remaining: 0,
      resetAt: Date.now() + 10_000,
      retryAfterSec: 10,
    });
    mockedCreateRateLimitHeaders.mockReturnValue({ "retry-after": "10" });

    const response = await POST(
      new Request("https://stylekit.top/api/submit/bundle", { method: "POST" })
    );

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Too many bundle requests. Please try again later.",
    });
  });

  it("returns validation issues for invalid manifests", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:bundle-invalid");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 30,
      remaining: 29,
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
      new Request("https://stylekit.top/api/submit/bundle", { method: "POST" })
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Manifest validation failed.",
      issues: [{ path: "schemaVersion", message: "Invalid", code: "invalid" }],
    });
  });

  it("returns a zip archive for valid manifests", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:bundle-valid");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 30,
      remaining: 29,
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
        formData: { slug: "neo-brutalist" },
      },
      issues: [],
    } as never);
    mockedBuildSubmissionBundleFiles.mockReturnValue([
      { name: "manifest.json", content: "{\n  \"schemaVersion\": \"1.0.0\"\n}\n" },
      { name: "self-check.md", content: "# Self Check\n" },
    ]);
    mockedCreateSubmissionBundleFilename.mockReturnValue(
      "neo-brutalist-submission-bundle.zip"
    );

    const response = await POST(
      new Request("https://stylekit.top/api/submit/bundle", { method: "POST" })
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("application/zip");
    expect(response.headers.get("content-disposition")).toContain(
      'filename="neo-brutalist-submission-bundle.zip"'
    );

    const blob = await response.blob();
    const zip = await JSZip.loadAsync(await blob.arrayBuffer());
    expect(Object.keys(zip.files)).toEqual(
      expect.arrayContaining(["manifest.json", "self-check.md"])
    );

    const selfCheck = await zip.file("self-check.md")?.async("string");
    expect(selfCheck).toContain("Self Check");
  });
});
