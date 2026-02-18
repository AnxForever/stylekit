import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/submit/validator", () => ({
  wizardFormSchema: { safeParse: vi.fn() },
}));

vi.mock("@/lib/submit/converter", () => ({
  convertToStyleTokens: vi.fn(),
  convertToDesignStyle: vi.fn(),
}));

vi.mock("@/lib/submit/reviewer-supabase", () => ({
  isSupabaseConfigured: vi.fn(),
  createSubmissionSupabase: vi.fn(),
}));

vi.mock("@/lib/auth/supabase-server", () => ({
  getServerUser: vi.fn(),
}));

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

import { POST } from "@/app/api/submit/route";
import { wizardFormSchema } from "@/lib/submit/validator";
import { convertToStyleTokens, convertToDesignStyle } from "@/lib/submit/converter";
import {
  isSupabaseConfigured,
  createSubmissionSupabase,
} from "@/lib/submit/reviewer-supabase";
import { getServerUser } from "@/lib/auth/supabase-server";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";

const mockedWizardSchema = vi.mocked(wizardFormSchema);
const mockedConvertToStyleTokens = vi.mocked(convertToStyleTokens);
const mockedConvertToDesignStyle = vi.mocked(convertToDesignStyle);
const mockedIsSupabaseConfigured = vi.mocked(isSupabaseConfigured);
const mockedCreateSubmissionSupabase = vi.mocked(createSubmissionSupabase);
const mockedGetServerUser = vi.mocked(getServerUser);
const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedCreateRateLimitHeaders = vi.mocked(createRateLimitHeaders);
const mockedGetRequestClientKey = vi.mocked(getRequestClientKey);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedParseJsonBodyWithLimit = vi.mocked(parseJsonBodyWithLimit);

afterEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/submit", () => {
  it("rejects untrusted origins", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({
      ok: false,
      error: "Cross-origin request denied",
      status: 403,
    });

    const response = await POST(new Request("https://stylekit.top/api/submit", { method: "POST" }));

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Cross-origin request denied",
    });
  });

  it("returns 429 when rate limit is exceeded", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:1");
    mockedCheckRateLimit.mockReturnValue({
      allowed: false,
      limit: 15,
      remaining: 0,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 60,
    });
    mockedCreateRateLimitHeaders.mockReturnValue({ "x-ratelimit-remaining": "0" });

    const response = await POST(new Request("https://stylekit.top/api/submit", { method: "POST" }));

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Too many submissions from this client. Please try again later.",
    });
  });

  it("requires authentication before accepting submission payload", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:auth");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 15,
      remaining: 14,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 0,
    });
    mockedGetServerUser.mockResolvedValue(null);

    const response = await POST(new Request("https://stylekit.top/api/submit", { method: "POST" }));

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Sign in to submit styles",
    });
  });

  it("returns validation details for invalid payload", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:2");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 15,
      remaining: 14,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 0,
    });
    mockedGetServerUser.mockResolvedValue({
      id: "user-1",
      user_metadata: { user_name: "anx" },
    } as never);
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { slug: "" },
    });
    mockedWizardSchema.safeParse.mockReturnValue({
      success: false,
      error: {
        flatten: () => ({ fieldErrors: { slug: ["Required"] } }),
      },
    } as never);

    const response = await POST(new Request("https://stylekit.top/api/submit", { method: "POST" }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Validation failed",
      details: { slug: ["Required"] },
    });
  });

  it("creates submission through Supabase when payload is valid", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:3");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 15,
      remaining: 14,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 0,
    });
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { slug: "neo-brutalist" },
    });
    mockedWizardSchema.safeParse.mockReturnValue({
      success: true,
      data: { slug: "neo-brutalist" },
    } as never);
    mockedConvertToStyleTokens.mockReturnValue({ tokens: true } as never);
    mockedConvertToDesignStyle.mockReturnValue({ design: true } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedGetServerUser.mockResolvedValue({
      id: "user-1",
      user_metadata: { user_name: "anx" },
    } as never);
    mockedCreateSubmissionSupabase.mockResolvedValue({
      id: "sub_1",
      slug: "neo-brutalist",
    } as never);

    const response = await POST(new Request("https://stylekit.top/api/submit", { method: "POST" }));

    expect(response.status).toBe(200);
    expect(mockedCreateSubmissionSupabase).toHaveBeenCalledWith(
      "neo-brutalist",
      {
        slug: "neo-brutalist",
        __author: {
          handle: "anx",
          avatarUrl: null,
          provider: "github",
        },
      },
      { tokens: true },
      { design: true },
      null,
      "user-1",
      "anx",
      null,
      "github",
    );
    await expect(response.json()).resolves.toEqual({
      success: true,
      id: "sub_1",
      slug: "neo-brutalist",
    });
  });
});
