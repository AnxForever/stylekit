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

  it("POST requires sessionId for anonymous comments", async () => {
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
      data: { content: "Great style", authorName: "anon" },
    });
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedGetServerUser.mockResolvedValue(null);

    const response = await POST(
      new Request("https://stylekit.top/api/styles/neo-brutalist/comments", {
        method: "POST",
      }),
      { params: params("neo-brutalist") },
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "sessionId is required for anonymous comments",
    });
  });

  it("POST inserts comment when payload is valid", async () => {
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
      data: { content: "Great style", authorName: "anon", sessionId: "session-1" },
    });
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedGetServerUser.mockResolvedValue(null);

    const countQuery = {
      eq: vi.fn().mockResolvedValue({ count: 0 }),
    };
    const countSelect = {
      eq: vi.fn().mockReturnValue({
        gte: vi.fn().mockReturnValue(countQuery),
      }),
    };
    const insertSingle = vi.fn().mockResolvedValue({
      data: {
        id: "c1",
        content: "Great style",
        author_name: "anon",
        avatar_url: null,
        user_id: null,
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
        author_name: "anon",
        avatar_url: null,
        user_id: null,
        created_at: "2026-01-01",
      },
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
});
