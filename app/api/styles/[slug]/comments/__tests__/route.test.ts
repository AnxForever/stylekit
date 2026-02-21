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

import { GET, POST } from "@/app/api/styles/[slug]/comments/route";
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

describe("styles comments route", () => {
  it("POST rejects untrusted origins", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({
      ok: false,
      error: "Cross-origin request denied",
      status: 403,
    });

    const response = await POST(
      new Request("https://stylekit.top/api/styles/neo-brutalist/comments", {
        method: "POST",
      }),
      { params: params("neo-brutalist") },
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Cross-origin request denied",
    });
  });

  it("POST requires authentication", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:1");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 40,
      remaining: 39,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 0,
    });
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { content: "Great style" },
    });
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedGetServerUser.mockResolvedValue(null);

    const response = await POST(
      new Request("https://stylekit.top/api/styles/neo-brutalist/comments", {
        method: "POST",
      }),
      { params: params("neo-brutalist") },
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Sign in to comment",
    });
  });

  it("POST inserts comment for authenticated users", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:2");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 40,
      remaining: 39,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 0,
    });
    mockedCreateRateLimitHeaders.mockReturnValue({ "x-ratelimit-remaining": "39" });
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { content: "Great style" },
    });
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedGetServerUser.mockResolvedValue({
      id: "user-1",
      user_metadata: { user_name: "anx", avatar_url: "https://img.example/avatar.png" },
    } as never);

    const countQuery = {
      gte: vi.fn().mockResolvedValue({ count: 0 }),
    };
    const countSelect = {
      eq: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue(countQuery),
      }),
    };
    const insertSingle = vi.fn().mockResolvedValue({
      data: {
        id: "c1",
        content: "Great style",
        author_name: "anx",
        avatar_url: "https://img.example/avatar.png",
        user_id: "user-1",
        created_at: "2026-01-01",
      },
      error: null,
    });
    const insertSelect = vi.fn().mockReturnValue({ single: insertSingle });
    const insert = vi.fn().mockReturnValue({ select: insertSelect });

    const from = vi
      .fn()
      .mockReturnValueOnce({ select: vi.fn().mockReturnValue(countSelect) })
      .mockReturnValueOnce({ insert });
    mockedCreateClient.mockReturnValue({ from } as never);

    const response = await POST(
      new Request("https://stylekit.top/api/styles/neo-brutalist/comments", {
        method: "POST",
      }),
      { params: params("neo-brutalist") },
    );

    expect(response.status).toBe(200);
    expect(insert).toHaveBeenCalled();
    await expect(response.json()).resolves.toEqual({
      success: true,
      comment: {
        id: "c1",
        content: "Great style",
        author_name: "anx",
        avatar_url: "https://img.example/avatar.png",
        user_id: "user-1",
        created_at: "2026-01-01",
      },
    });
  });

  it("POST returns DB_SCHEMA_MISMATCH when legacy session_id not-null constraint blocks writes", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:3");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 40,
      remaining: 39,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 0,
    });
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { content: "Great style" },
    });
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedGetServerUser.mockResolvedValue({
      id: "user-2",
      user_metadata: { user_name: "demo" },
    } as never);

    const countQuery = {
      gte: vi.fn().mockResolvedValue({ count: 0, error: null }),
    };
    const countSelect = {
      eq: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue(countQuery),
      }),
    };

    const insertSingle = vi.fn().mockResolvedValue({
      data: null,
      error: {
        code: "23502",
        message: 'null value in column "session_id" violates not-null constraint',
      },
    });
    const insertSelect = vi.fn().mockReturnValue({ single: insertSingle });
    const insert = vi.fn().mockReturnValue({ select: insertSelect });

    const from = vi
      .fn()
      .mockReturnValueOnce({ select: vi.fn().mockReturnValue(countSelect) })
      .mockReturnValueOnce({ insert });
    mockedCreateClient.mockReturnValue({ from } as never);

    const response = await POST(
      new Request("https://stylekit.top/api/styles/neo-brutalist/comments", {
        method: "POST",
      }),
      { params: params("neo-brutalist") },
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      success: false,
      code: "DB_SCHEMA_MISMATCH",
      error: "Comments schema is outdated. Apply Supabase migration 005 (session_id nullable).",
    });
  });

  it("GET returns empty payload when Supabase is disabled", async () => {
    mockedIsSupabaseConfigured.mockReturnValue(false);

    const response = await GET(
      new Request("https://stylekit.top/api/styles/neo-brutalist/comments"),
      { params: params("neo-brutalist") },
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      comments: [],
      total: 0,
    });
  });

  it("GET returns DB_NOT_READY when comments table is missing", async () => {
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const range = vi.fn().mockResolvedValue({
      data: null,
      count: null,
      error: { code: "42P01", message: 'relation "style_comments" does not exist' },
    });
    const order = vi.fn().mockReturnValue({ range });
    const eq = vi.fn().mockReturnValue({ order });
    const select = vi.fn().mockReturnValue({ eq });

    mockedCreateClient.mockReturnValue({
      from: vi.fn().mockReturnValue({ select }),
    } as never);

    const response = await GET(
      new Request("https://stylekit.top/api/styles/neo-brutalist/comments"),
      { params: params("neo-brutalist") },
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      comments: [],
      total: 0,
      code: "DB_NOT_READY",
      error: "Comments database schema is not ready. Run Supabase migrations 002-005.",
    });
  });
});
