import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/submit/reviewer-supabase", () => ({
  isSupabaseConfigured: vi.fn(),
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

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(),
}));

import { GET, POST } from "@/app/api/styles/[slug]/rate/route";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { getServerUser } from "@/lib/auth/supabase-server";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { createClient } from "@supabase/supabase-js";

const mockedIsSupabaseConfigured = vi.mocked(isSupabaseConfigured);
const mockedGetServerUser = vi.mocked(getServerUser);
const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedCreateRateLimitHeaders = vi.mocked(createRateLimitHeaders);
const mockedGetRequestClientKey = vi.mocked(getRequestClientKey);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedParseJsonBodyWithLimit = vi.mocked(parseJsonBodyWithLimit);
const mockedCreateClient = vi.mocked(createClient);

const params = (slug: string) => Promise.resolve({ slug });

afterEach(() => {
  vi.clearAllMocks();
});

describe("styles rating route", () => {
  it("POST requires authenticated user", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue(null);

    const response = await POST(
      new Request("https://stylekit.top/api/styles/neo-brutalist/rate", { method: "POST" }),
      { params: params("neo-brutalist") },
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Sign in to rate styles",
    });
  });

  it("POST enforces rate limit", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-1" } as never);
    mockedGetRequestClientKey.mockReturnValue("ip:1");
    mockedCheckRateLimit.mockReturnValue({
      allowed: false,
      limit: 80,
      remaining: 0,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 60,
    });
    mockedCreateRateLimitHeaders.mockReturnValue({ "x-ratelimit-remaining": "0" });

    const response = await POST(
      new Request("https://stylekit.top/api/styles/neo-brutalist/rate", { method: "POST" }),
      { params: params("neo-brutalist") },
    );

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Too many rating requests. Please try again later.",
    });
  });

  it("POST inserts new rating and returns summary", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-2" } as never);
    mockedGetRequestClientKey.mockReturnValue("ip:2");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 80,
      remaining: 79,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 0,
    });
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { rating: 5 },
    });
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const maybeSingle = vi.fn().mockResolvedValue({ data: null });
    const existingSelect = {
      eq: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          maybeSingle,
        }),
      }),
    };
    const insert = vi.fn().mockResolvedValue({ error: null });
    const summarySingle = vi.fn().mockResolvedValue({
      data: { average_rating: 4.8, total_ratings: 12 },
    });
    const summarySelect = {
      eq: vi.fn().mockReturnValue({
        single: summarySingle,
      }),
    };

    const from = vi
      .fn()
      .mockReturnValueOnce({ select: vi.fn().mockReturnValue(existingSelect) })
      .mockReturnValueOnce({ insert })
      .mockReturnValueOnce({ select: vi.fn().mockReturnValue(summarySelect) });
    mockedCreateClient.mockReturnValue({ from } as never);

    const response = await POST(
      new Request("https://stylekit.top/api/styles/neo-brutalist/rate", { method: "POST" }),
      { params: params("neo-brutalist") },
    );

    expect(response.status).toBe(200);
    expect(insert).toHaveBeenCalledWith({
      style_slug: "neo-brutalist",
      rating: 5,
      session_id: null,
      user_id: "user-2",
      ip_address: null,
    });
    await expect(response.json()).resolves.toEqual({
      success: true,
      averageRating: 4.8,
      totalRatings: 12,
    });
  });

  it("GET returns defaults when Supabase is disabled", async () => {
    mockedIsSupabaseConfigured.mockReturnValue(false);

    const response = await GET(
      new Request("https://stylekit.top/api/styles/neo-brutalist/rate"),
      { params: params("neo-brutalist") },
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      averageRating: 0,
      totalRatings: 0,
    });
  });
});
