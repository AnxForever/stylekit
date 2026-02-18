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

afterEach(() => {
  vi.clearAllMocks();
});

describe("favorites route", () => {
  it("GET returns 401 when user is not authenticated", async () => {
    mockedGetServerUser.mockResolvedValue(null);

    const response = await GET();
    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Authentication required",
    });
  });

  it("GET returns favorite slugs for authenticated user", async () => {
    mockedGetServerUser.mockResolvedValue({ id: "user-1" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const order = vi.fn().mockResolvedValue({
      data: [{ style_slug: "neo-brutalist" }, { style_slug: "glassmorphism" }],
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ order });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });
    mockedCreateClient.mockReturnValue({ from } as never);

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      favorites: ["neo-brutalist", "glassmorphism"],
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
    await expect(response.json()).resolves.toEqual({ success: true });
  });
});
