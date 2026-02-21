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
    const summaryMaybeSingle = vi.fn().mockResolvedValue({
      data: { average_rating: 4.8, total_ratings: 12 },
      error: null,
    });
    const summarySelect = {
      eq: vi.fn().mockReturnValue({
        maybeSingle: summaryMaybeSingle,
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
      userRating: 5,
    });
  });

  it("POST returns DB_SCHEMA_MISMATCH when legacy session_id not-null constraint blocks writes", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-3" } as never);
    mockedGetRequestClientKey.mockReturnValue("ip:3");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 80,
      remaining: 79,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 0,
    });
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { rating: 4 },
    });
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const maybeSingle = vi.fn().mockResolvedValue({ data: null, error: null });
    const existingSelect = {
      eq: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          maybeSingle,
        }),
      }),
    };
    const insert = vi.fn().mockResolvedValue({
      error: {
        code: "23502",
        message: 'null value in column "session_id" violates not-null constraint',
      },
    });

    const from = vi
      .fn()
      .mockReturnValueOnce({ select: vi.fn().mockReturnValue(existingSelect) })
      .mockReturnValueOnce({ insert });
    mockedCreateClient.mockReturnValue({ from } as never);

    const response = await POST(
      new Request("https://stylekit.top/api/styles/neo-brutalist/rate", { method: "POST" }),
      { params: params("neo-brutalist") },
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      success: false,
      code: "DB_SCHEMA_MISMATCH",
      error: "Ratings schema is outdated. Apply Supabase migration 005 (session_id nullable).",
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
      userRating: null,
    });
  });

  it("GET returns DB_NOT_READY when rating summary view is missing", async () => {
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const maybeSingle = vi.fn().mockResolvedValue({
      data: null,
      error: { code: "42P01", message: 'relation "style_rating_summary" does not exist' },
    });
    const select = vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({ maybeSingle }),
    });
    mockedCreateClient.mockReturnValue({
      from: vi.fn().mockReturnValue({ select }),
    } as never);

    const response = await GET(
      new Request("https://stylekit.top/api/styles/neo-brutalist/rate"),
      { params: params("neo-brutalist") },
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      averageRating: 0,
      totalRatings: 0,
      userRating: null,
      code: "DB_NOT_READY",
      error: "Ratings database schema is not ready. Run Supabase migrations 002-005.",
    });
  });

  it("GET returns userRating when authenticated user has legacy session rating", async () => {
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedGetServerUser.mockResolvedValue({ id: "user-9" } as never);

    const summaryMaybeSingle = vi.fn().mockResolvedValue({
      data: { average_rating: 4.2, total_ratings: 5 },
      error: null,
    });
    const summarySelect = {
      eq: vi.fn().mockReturnValue({
        maybeSingle: summaryMaybeSingle,
      }),
    };

    const modernLimit = vi.fn().mockResolvedValue({
      data: [],
      error: null,
    });
    const modernOrder = vi.fn().mockReturnValue({ limit: modernLimit });
    const modernEqUser = vi.fn().mockReturnValue({ order: modernOrder });
    const modernEqSlug = vi.fn().mockReturnValue({ eq: modernEqUser });
    const modernSelect = vi.fn().mockReturnValue({ eq: modernEqSlug });

    const legacyLimit = vi.fn().mockResolvedValue({
      data: [{ rating: 5, created_at: "2026-02-21T10:00:00.000Z" }],
      error: null,
    });
    const legacyOrder = vi.fn().mockReturnValue({ limit: legacyLimit });
    const legacyIn = vi.fn().mockReturnValue({ order: legacyOrder });
    const legacyEq = vi.fn().mockReturnValue({ in: legacyIn });
    const legacySelect = vi.fn().mockReturnValue({ eq: legacyEq });

    mockedCreateClient.mockReturnValue({
      from: vi
        .fn()
        .mockReturnValueOnce({ select: vi.fn().mockReturnValue(summarySelect) })
        .mockReturnValueOnce({ select: modernSelect })
        .mockReturnValueOnce({ select: legacySelect }),
    } as never);

    const response = await GET(
      new Request("https://stylekit.top/api/styles/neo-brutalist/rate"),
      { params: params("neo-brutalist") },
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      averageRating: 4.2,
      totalRatings: 5,
      userRating: 5,
    });
  });
});
