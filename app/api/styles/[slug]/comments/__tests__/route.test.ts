import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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

vi.mock("@/lib/auth/admin-policy", () => ({
  getAdminUserIds: vi.fn(),
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
import { getAdminUserIds } from "@/lib/auth/admin-policy";
import { EARLY_USER_TITLE_TOKEN } from "@/lib/auth/user-title-policy";
import { createClient } from "@supabase/supabase-js";

const mockedIsSupabaseConfigured = vi.mocked(isSupabaseConfigured);
const mockedGetServerUser = vi.mocked(getServerUser);
const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedCreateRateLimitHeaders = vi.mocked(createRateLimitHeaders);
const mockedGetRequestClientKey = vi.mocked(getRequestClientKey);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedParseJsonBodyWithLimit = vi.mocked(parseJsonBodyWithLimit);
const mockedGetAdminUserIds = vi.mocked(getAdminUserIds);
const mockedCreateClient = vi.mocked(createClient);

const params = (slug: string) => Promise.resolve({ slug });

afterEach(() => {
  vi.clearAllMocks();
});

beforeEach(() => {
  mockedGetAdminUserIds.mockReturnValue([]);
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
      { params: params("neo-brutalist") }
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
      { params: params("neo-brutalist") }
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
      { params: params("neo-brutalist") }
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
        author_provider: "unknown",
        author_seq_id: null,
        author_title: null,
        author_title_color: null,
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
      { params: params("neo-brutalist") }
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
      { params: params("neo-brutalist") }
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
      { params: params("neo-brutalist") }
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      comments: [],
      total: 0,
      code: "DB_NOT_READY",
      error: "Comments database schema is not ready. Run Supabase migrations 002-005.",
    });
  });

  it("GET enriches legacy comments with author provider, seq id, and title", async () => {
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const legacyUserId = "11111111-1111-4111-8111-111111111111";

    const modernRange = vi.fn().mockResolvedValue({
      data: null,
      count: null,
      error: {
        code: "42703",
        message: "column style_comments.user_id does not exist",
      },
    });
    const modernOrder = vi.fn().mockReturnValue({ range: modernRange });
    const modernEq = vi.fn().mockReturnValue({ order: modernOrder });
    const modernSelect = vi.fn().mockReturnValue({ eq: modernEq });

    const legacyRange = vi.fn().mockResolvedValue({
      data: [
        {
          id: "c-legacy",
          content: "legacy comment",
          author_name: "legacy-user",
          session_id: `user:${legacyUserId}`,
          created_at: "2026-02-21T00:00:00.000Z",
        },
      ],
      count: 1,
      error: null,
    });
    const legacyOrder = vi.fn().mockReturnValue({ range: legacyRange });
    const legacyEq = vi.fn().mockReturnValue({ order: legacyOrder });
    const legacySelect = vi.fn().mockReturnValue({ eq: legacyEq });

    const getUserById = vi.fn().mockResolvedValue({
      data: {
        user: {
          user_metadata: {
            user_name: "legacy-user",
            avatar_url: "https://img.example/legacy.png",
            provider: "linuxdo",
            seq_id: 12,
            user_title: "站主",
          },
        },
      },
      error: null,
    });

    const seqInFn = vi.fn().mockResolvedValue({
      data: [{ user_id: legacyUserId, seq_id: 12 }],
      error: null,
    });
    const seqSelect = vi.fn().mockReturnValue({ in: seqInFn });

    const titleInFn = vi.fn().mockResolvedValue({
      data: [],
      error: null,
    });
    const titleSelect = vi.fn().mockReturnValue({ in: titleInFn });

    mockedCreateClient.mockReturnValue({
      from: vi
        .fn()
        .mockReturnValueOnce({ select: modernSelect })
        .mockReturnValueOnce({ select: legacySelect })
        .mockReturnValueOnce({ select: seqSelect })
        .mockReturnValueOnce({ select: titleSelect }),
      auth: {
        admin: {
          getUserById,
        },
      },
    } as never);

    const response = await GET(
      new Request("https://stylekit.top/api/styles/neo-brutalist/comments?limit=10"),
      { params: params("neo-brutalist") }
    );

    expect(response.status).toBe(200);
    expect(getUserById).toHaveBeenCalledWith(legacyUserId);
    await expect(response.json()).resolves.toEqual({
      comments: [
        {
          id: "c-legacy",
          content: "legacy comment",
          author_name: "legacy-user",
          avatar_url: "https://img.example/legacy.png",
          user_id: legacyUserId,
          created_at: "2026-02-21T00:00:00.000Z",
          author_provider: "linuxdo",
          author_seq_id: 12,
          author_title: "站主",
          author_title_color: null,
        },
      ],
      total: 1,
    });
  });

  it("GET applies configured title rules from user_titles table", async () => {
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const userId = "11111111-1111-4111-8111-111111111111";
    const range = vi.fn().mockResolvedValue({
      data: [
        {
          id: "c-1",
          content: "hello",
          author_name: "someone",
          user_id: userId,
          created_at: "2026-02-21T00:00:00.000Z",
        },
      ],
      count: 1,
      error: null,
    });
    const order = vi.fn().mockReturnValue({ range });
    const eq = vi.fn().mockReturnValue({ order });
    const styleSelect = vi.fn().mockReturnValue({ eq });

    const titleIn = vi.fn().mockResolvedValue({
      data: [
        {
          user_id: userId,
          custom_title: "VIP",
          title_color: "#ff5500",
          is_owner: false,
          title_enabled: true,
        },
      ],
      error: null,
    });
    const titleSelect = vi.fn().mockReturnValue({ in: titleIn });
    const seqIn = vi.fn().mockResolvedValue({
      data: [
        {
          user_id: userId,
          seq_id: 11,
        },
      ],
      error: null,
    });
    const seqSelect = vi.fn().mockReturnValue({ in: seqIn });

    const getUserById = vi.fn().mockResolvedValue({
      data: {
        user: {
          user_metadata: {
            user_name: "someone",
            avatar_url: "https://img.example/u.png",
            provider: "github",
            seq_id: 50,
          },
        },
      },
      error: null,
    });

    mockedCreateClient.mockReturnValue({
      from: vi.fn((tableName: string) => {
        if (tableName === "style_comments") {
          return { select: styleSelect };
        }
        if (tableName === "user_titles") {
          return { select: titleSelect };
        }
        if (tableName === "user_seq_ids") {
          return { select: seqSelect };
        }
        return { select: vi.fn().mockReturnValue({ in: vi.fn() }) };
      }),
      auth: {
        admin: {
          getUserById,
        },
      },
    } as never);

    const response = await GET(
      new Request("https://stylekit.top/api/styles/neo-brutalist/comments?limit=10"),
      { params: params("neo-brutalist") }
    );

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.comments[0].author_title).toBe("VIP");
    expect(payload.comments[0].author_seq_id).toBe(11);
    expect(payload.comments[0].author_title_color).toBe("#ff5500");

    const titleDisabledIn = vi.fn().mockResolvedValue({
      data: [
        {
          user_id: userId,
          custom_title: null,
          is_owner: false,
          title_enabled: true,
        },
      ],
      error: null,
    });
    const styleSelectSecond = vi.fn().mockReturnValue({ eq });
    const titleSelectSecond = vi.fn().mockReturnValue({ in: titleDisabledIn });
    const seqInSecond = vi.fn().mockResolvedValue({
      data: [
        {
          user_id: userId,
          seq_id: 11,
        },
      ],
      error: null,
    });
    const seqSelectSecond = vi.fn().mockReturnValue({ in: seqInSecond });
    mockedCreateClient.mockReturnValueOnce({
      from: vi.fn((tableName: string) => {
        if (tableName === "style_comments") {
          return { select: styleSelectSecond };
        }
        if (tableName === "user_titles") {
          return { select: titleSelectSecond };
        }
        if (tableName === "user_seq_ids") {
          return { select: seqSelectSecond };
        }
        return { select: vi.fn().mockReturnValue({ in: vi.fn() }) };
      }),
      auth: {
        admin: {
          getUserById,
        },
      },
    } as never);

    const fallbackResponse = await GET(
      new Request("https://stylekit.top/api/styles/neo-brutalist/comments?limit=10"),
      { params: params("neo-brutalist") }
    );
    const fallbackPayload = await fallbackResponse.json();
    expect(fallbackPayload.comments[0].author_title).toBe(EARLY_USER_TITLE_TOKEN);
    expect(fallbackPayload.comments[0].author_title_color).toBeNull();
  });
});
