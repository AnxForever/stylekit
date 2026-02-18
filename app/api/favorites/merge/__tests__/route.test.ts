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

afterEach(() => {
  vi.clearAllMocks();
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
    await expect(response.json()).resolves.toEqual({
      success: true,
      merged: 2,
    });
  });
});
