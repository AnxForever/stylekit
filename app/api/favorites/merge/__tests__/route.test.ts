import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/supabase-server", () => ({
  getServerUser: vi.fn(),
}));

vi.mock("@/lib/submit/reviewer-supabase", () => ({
  isSupabaseConfigured: vi.fn(),
}));

vi.mock("@/lib/security/request-origin", () => ({
  verifyTrustedOrigin: vi.fn(),
}));

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(),
}));

import { POST } from "@/app/api/favorites/merge/route";
import { getServerUser } from "@/lib/auth/supabase-server";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { createClient } from "@supabase/supabase-js";

const mockedGetServerUser = vi.mocked(getServerUser);
const mockedIsSupabaseConfigured = vi.mocked(isSupabaseConfigured);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedCreateClient = vi.mocked(createClient);
const originalSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const originalSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

afterEach(() => {
  vi.clearAllMocks();
  if (originalSupabaseUrl === undefined) {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  } else {
    process.env.NEXT_PUBLIC_SUPABASE_URL = originalSupabaseUrl;
  }
  if (originalSupabaseAnonKey === undefined) {
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  } else {
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = originalSupabaseAnonKey;
  }
});

describe("POST /api/favorites/merge", () => {
  it("rejects untrusted origin", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({
      ok: false,
      error: "Cross-origin request denied",
      status: 403,
    });

    const response = await POST(
      new Request("https://stylekit.top/api/favorites/merge", {
        method: "POST",
        body: JSON.stringify({ slugs: ["neo-brutalist"] }),
      }),
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Cross-origin request denied",
    });
  });

  it("validates slugs payload", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-1" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const response = await POST(
      new Request("https://stylekit.top/api/favorites/merge", {
        method: "POST",
        body: JSON.stringify({ slugs: ["Invalid Slug"] }),
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Invalid slugs array",
    });
  });

  it("returns merged count for valid payload", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-2" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const upsert = vi.fn().mockResolvedValue({ error: null });
    const from = vi.fn().mockReturnValue({ upsert });
    mockedCreateClient.mockReturnValue({ from } as never);

    const response = await POST(
      new Request("https://stylekit.top/api/favorites/merge", {
        method: "POST",
        body: JSON.stringify({ slugs: ["neo-brutalist", "glassmorphism"] }),
      }),
    );

    expect(response.status).toBe(200);
    expect(upsert).toHaveBeenCalledWith(
      [
        { user_id: "user-2", style_slug: "neo-brutalist" },
        { user_id: "user-2", style_slug: "glassmorphism" },
      ],
      { onConflict: "user_id,style_slug", ignoreDuplicates: true },
    );
    expect(upsert).toHaveBeenCalledTimes(2);
    await expect(response.json()).resolves.toEqual({
      success: true,
      merged: 2,
    });
  });

  it("falls back to style_favorites when user_favorites schema is missing", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-3" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const from = vi.fn((table: string) => {
      if (table === "user_favorites") {
        return {
          upsert: vi.fn().mockResolvedValue({
            error: { code: "42P01", message: "relation does not exist" },
          }),
        };
      }
      if (table === "style_favorites") {
        return {
          upsert: vi.fn().mockResolvedValue({ error: null }),
        };
      }
      throw new Error(`Unexpected table: ${table}`);
    });

    mockedCreateClient.mockReturnValue({ from } as never);

    const response = await POST(
      new Request("https://stylekit.top/api/favorites/merge", {
        method: "POST",
        body: JSON.stringify({ slugs: ["neo-brutalist"] }),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      merged: 1,
    });
  });

  it("falls back to legacy session_id upsert when user_id column is missing", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-legacy" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const userFavoritesUpsert = vi.fn((rows: Array<Record<string, unknown>>, options: Record<string, unknown>) => {
      if (options.onConflict === "user_id,style_slug") {
        return Promise.resolve({
          error: { code: "42703", message: "column user_id does not exist" },
        });
      }
      if (options.onConflict === "session_id,style_slug") {
        const first = rows[0] ?? {};
        if (first.session_id === "user:user-legacy") {
          return Promise.resolve({ error: null });
        }
      }
      return Promise.resolve({ error: { message: "unexpected payload" } });
    });

    const styleFavoritesUpsert = vi.fn().mockResolvedValue({
      error: { code: "42P01", message: "relation does not exist" },
    });

    const from = vi.fn((table: string) => {
      if (table === "user_favorites") {
        return { upsert: userFavoritesUpsert };
      }
      if (table === "style_favorites") {
        return { upsert: styleFavoritesUpsert };
      }
      throw new Error(`Unexpected table: ${table}`);
    });

    mockedCreateClient.mockReturnValue({ from } as never);

    const response = await POST(
      new Request("https://stylekit.top/api/favorites/merge", {
        method: "POST",
        body: JSON.stringify({ slugs: ["neo-brutalist", "glassmorphism"] }),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      merged: 2,
    });
  });

  it("authenticates with bearer token when cookie auth is missing", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue(null);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";

    const upsert = vi.fn().mockResolvedValue({ error: null });
    const from = vi.fn().mockReturnValue({ upsert });

    mockedCreateClient.mockImplementation((_url: string, key: string) => {
      if (key === "anon-key") {
        return {
          auth: {
            getUser: vi.fn().mockResolvedValue({
              data: { user: { id: "user-bearer" } },
            }),
          },
        } as never;
      }
      return { from } as never;
    });

    const response = await POST(
      new Request("https://stylekit.top/api/favorites/merge", {
        method: "POST",
        headers: { Authorization: "Bearer token-123" },
        body: JSON.stringify({ slugs: ["neo-brutalist", "glassmorphism"] }),
      }),
    );

    expect(response.status).toBe(200);
    expect(upsert).toHaveBeenCalledWith(
      [
        { user_id: "user-bearer", style_slug: "neo-brutalist" },
        { user_id: "user-bearer", style_slug: "glassmorphism" },
      ],
      { onConflict: "user_id,style_slug", ignoreDuplicates: true },
    );
    await expect(response.json()).resolves.toEqual({
      success: true,
      merged: 2,
    });
  });
});
