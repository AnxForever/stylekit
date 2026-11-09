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

import { GET, POST, DELETE } from "@/app/api/favorites/route";
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

describe("favorites route", () => {
  it("GET returns 401 when user is not authenticated", async () => {
    mockedGetServerUser.mockResolvedValue(null);

    const response = await GET(new Request("https://stylekit.top/api/favorites"));
    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Authentication required",
    });
  });

  it("rejects a request whose expected user does not match the authenticated cookie", async () => {
    mockedGetServerUser.mockResolvedValue({ id: "account-b" } as never);

    const response = await GET(
      new Request("https://stylekit.top/api/favorites", {
        headers: { "X-StyleKit-Expected-User": "account-a" },
      }),
    );

    expect(response.status).toBe(401);
    expect(mockedCreateClient).not.toHaveBeenCalled();
  });

  it("GET returns favorite slugs for authenticated user", async () => {
    mockedGetServerUser.mockResolvedValue({ id: "user-1" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const from = vi.fn((table: string) => {
      if (table === "user_favorites") {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({
                data: [{ style_slug: "neo-brutalist" }, { style_slug: "glassmorphism" }],
                error: null,
              }),
            })),
          })),
        };
      }
      if (table === "style_favorites") {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({
                data: [{ style_slug: "glassmorphism" }, { style_slug: "neo-brutalist" }],
                error: null,
              }),
            })),
          })),
        };
      }
      throw new Error(`Unexpected table: ${table}`);
    });
    mockedCreateClient.mockReturnValue({ from } as never);

    const response = await GET(new Request("https://stylekit.top/api/favorites"));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      favorites: ["neo-brutalist", "glassmorphism"],
    });
  });

  it("GET falls back to style_favorites when user_favorites is missing", async () => {
    mockedGetServerUser.mockResolvedValue({ id: "user-1" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const from = vi.fn((table: string) => {
      if (table === "user_favorites") {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({
                data: null,
                error: { code: "42P01", message: "relation does not exist" },
              }),
            })),
          })),
        };
      }
      if (table === "style_favorites") {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({
                data: [{ style_slug: "neo-brutalist" }],
                error: null,
              }),
            })),
          })),
        };
      }
      throw new Error(`Unexpected table: ${table}`);
    });
    mockedCreateClient.mockReturnValue({ from } as never);

    const response = await GET(new Request("https://stylekit.top/api/favorites"));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      favorites: ["neo-brutalist"],
    });
  });

  it("GET falls back to legacy session_id rows when user_id column is missing", async () => {
    mockedGetServerUser.mockResolvedValue({ id: "user-legacy" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const from = vi.fn((table: string) => {
      if (table === "user_favorites") {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({
                data: null,
                error: { code: "42703", message: "column user_id does not exist" },
              }),
            })),
            in: vi.fn((column: string, values: string[]) => ({
              order: vi.fn().mockResolvedValue({
                data:
                  column === "session_id" &&
                  values.includes("user:user-legacy")
                    ? [{ style_slug: "neo-brutalist" }, { style_slug: "glassmorphism" }]
                    : [],
                error: null,
              }),
            })),
          })),
        };
      }
      if (table === "style_favorites") {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({
                data: null,
                error: { code: "42P01", message: "relation does not exist" },
              }),
            })),
            in: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({
                data: null,
                error: { code: "42P01", message: "relation does not exist" },
              }),
            })),
          })),
        };
      }
      throw new Error(`Unexpected table: ${table}`);
    });

    mockedCreateClient.mockReturnValue({ from } as never);

    const response = await GET(new Request("https://stylekit.top/api/favorites"));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      favorites: ["neo-brutalist", "glassmorphism"],
    });
  });

  it("GET authenticates with bearer token when cookie auth is missing", async () => {
    mockedGetServerUser.mockResolvedValue(null);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";

    const from = vi.fn((table: string) => {
      if (table === "user_favorites") {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({
                data: [{ style_slug: "neo-brutalist" }],
                error: null,
              }),
            })),
          })),
        };
      }
      if (table === "style_favorites") {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({
                data: null,
                error: { code: "42P01", message: "relation does not exist" },
              }),
            })),
          })),
        };
      }
      throw new Error(`Unexpected table: ${table}`);
    });

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

    const response = await GET(
      new Request("https://stylekit.top/api/favorites", {
        headers: { Authorization: "Bearer token-123" },
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      favorites: ["neo-brutalist"],
    });
  });

  it("POST rejects untrusted origin", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({
      ok: false,
      error: "Cross-origin request denied",
      status: 403,
    });

    const response = await POST(
      new Request("https://stylekit.top/api/favorites", {
        method: "POST",
        body: JSON.stringify({ slug: "neo-brutalist" }),
      }),
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Cross-origin request denied",
    });
  });

  it("POST inserts valid favorite for authenticated user", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-2" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const insert = vi.fn().mockResolvedValue({ error: null });
    const from = vi.fn().mockReturnValue({ insert });
    mockedCreateClient.mockReturnValue({ from } as never);

    const response = await POST(
      new Request("https://stylekit.top/api/favorites", {
        method: "POST",
        body: JSON.stringify({ slug: "neo-brutalist" }),
      }),
    );

    expect(response.status).toBe(200);
    expect(insert).toHaveBeenCalledWith({
      user_id: "user-2",
      style_slug: "neo-brutalist",
    });
    expect(insert).toHaveBeenCalledTimes(2);
    await expect(response.json()).resolves.toEqual({ success: true });
  });

  it("POST falls back to legacy session_id insert when user_id column is missing", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-legacy" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const insertUserFavorites = vi.fn((payload: Record<string, unknown>) => {
      if ("user_id" in payload) {
        return Promise.resolve({
          error: { code: "42703", message: "column user_id does not exist" },
        });
      }
      if ("session_id" in payload) {
        return Promise.resolve({ error: null });
      }
      return Promise.resolve({ error: { message: "unexpected payload" } });
    });

    const insertStyleFavorites = vi.fn().mockResolvedValue({
      error: { code: "42P01", message: "relation does not exist" },
    });

    const from = vi.fn((table: string) => {
      if (table === "user_favorites") {
        return { insert: insertUserFavorites };
      }
      if (table === "style_favorites") {
        return { insert: insertStyleFavorites };
      }
      throw new Error(`Unexpected table: ${table}`);
    });

    mockedCreateClient.mockReturnValue({ from } as never);

    const response = await POST(
      new Request("https://stylekit.top/api/favorites", {
        method: "POST",
        body: JSON.stringify({ slug: "neo-brutalist" }),
      }),
    );

    expect(response.status).toBe(200);
    expect(insertUserFavorites).toHaveBeenCalledWith({
      user_id: "user-legacy",
      style_slug: "neo-brutalist",
    });
    expect(insertUserFavorites).toHaveBeenCalledWith({
      session_id: "user:user-legacy",
      style_slug: "neo-brutalist",
    });
    await expect(response.json()).resolves.toEqual({ success: true });
  });

  it("POST authenticates with bearer token when cookie auth is missing", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue(null);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";

    const insert = vi.fn().mockResolvedValue({ error: null });
    const from = vi.fn().mockReturnValue({ insert });

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
      new Request("https://stylekit.top/api/favorites", {
        method: "POST",
        headers: { Authorization: "Bearer token-123" },
        body: JSON.stringify({ slug: "neo-brutalist" }),
      }),
    );

    expect(response.status).toBe(200);
    expect(insert).toHaveBeenCalledWith({
      user_id: "user-bearer",
      style_slug: "neo-brutalist",
    });
    await expect(response.json()).resolves.toEqual({ success: true });
  });

  it("DELETE removes favorite by slug", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-3" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const eqSecond = vi.fn().mockResolvedValue({ error: null });
    const eqFirst = vi.fn().mockReturnValue({ eq: eqSecond });
    const del = vi.fn().mockReturnValue({ eq: eqFirst });
    const from = vi.fn().mockReturnValue({ delete: del });
    mockedCreateClient.mockReturnValue({ from } as never);

    const response = await DELETE(
      new Request("https://stylekit.top/api/favorites?slug=neo-brutalist", {
        method: "DELETE",
      }),
    );

    expect(response.status).toBe(200);
    expect(eqFirst).toHaveBeenCalledWith("user_id", "user-3");
    expect(eqSecond).toHaveBeenCalledWith("style_slug", "neo-brutalist");
    expect(del).toHaveBeenCalledTimes(2);
    await expect(response.json()).resolves.toEqual({ success: true });
  });

  it("DELETE falls back to legacy session_id delete when user_id column is missing", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-legacy" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const legacyAliases = vi.fn((column: string, values: string[]) => ({
      eq: vi.fn((styleColumn: string, slug: string) => {
        if (
          column === "session_id" &&
          styleColumn === "style_slug" &&
          slug === "neo-brutalist" &&
          values.includes("user:user-legacy") &&
          values.includes("user-legacy")
        ) {
          return Promise.resolve({ error: null });
        }
        return Promise.resolve({ error: { message: "unexpected legacy delete call" } });
      }),
    }));

    const userTableDelete = vi.fn().mockReturnValue({
      eq: vi.fn((firstColumn: string, firstValue: string) => ({
        eq: vi.fn().mockResolvedValue({
          error:
            firstColumn === "user_id" && firstValue === "user-legacy"
              ? { code: "42703", message: "column user_id does not exist" }
              : { message: "unexpected direct delete call" },
        }),
      })),
      in: legacyAliases,
    });

    const styleTableDelete = vi.fn().mockReturnValue({
      eq: vi.fn(() => ({
        eq: vi.fn().mockResolvedValue({
          error: { code: "42P01", message: "relation does not exist" },
        }),
      })),
    });

    const from = vi.fn((table: string) => {
      if (table === "user_favorites") {
        return { delete: userTableDelete };
      }
      if (table === "style_favorites") {
        return { delete: styleTableDelete };
      }
      throw new Error(`Unexpected table: ${table}`);
    });

    mockedCreateClient.mockReturnValue({ from } as never);

    const response = await DELETE(
      new Request("https://stylekit.top/api/favorites?slug=neo-brutalist", {
        method: "DELETE",
      }),
    );

    expect(response.status).toBe(200);
    expect(legacyAliases).toHaveBeenCalledWith("session_id", ["user:user-legacy", "user-legacy"]);
    await expect(response.json()).resolves.toEqual({ success: true });
  });

  it("DELETE reports failure when every compatible favorites store rejects the write", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-delete-error" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const from = vi.fn(() => ({
      delete: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({
            error: { code: "42501", message: "permission denied" },
          }),
        })),
      })),
    }));
    mockedCreateClient.mockReturnValue({ from } as never);

    const response = await DELETE(
      new Request("https://stylekit.top/api/favorites?slug=neo-brutalist", {
        method: "DELETE",
      }),
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Failed to remove favorite",
    });
  });

  it("DELETE does not report success while another readable store still rejects", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-partial-delete" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const from = vi.fn((table: string) => {
      const deleteChain = {
        eq: vi.fn((column: string) => ({
          eq: vi.fn(() =>
            Promise.resolve(
              table === "user_favorites" && column === "user_id"
                ? { error: null }
                : { error: { code: "42501", message: "permission denied" } },
            ),
          ),
        })),
      };
      return { delete: vi.fn(() => deleteChain) };
    });
    mockedCreateClient.mockReturnValue({ from } as never);

    const response = await DELETE(
      new Request("https://stylekit.top/api/favorites?slug=glassmorphism", {
        method: "DELETE",
      }),
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Failed to remove favorite",
    });
  });
});
