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

import { GET, PUT } from "@/app/api/kits/route";
import { getServerUser } from "@/lib/auth/supabase-server";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { createClient } from "@supabase/supabase-js";

const mockedGetServerUser = vi.mocked(getServerUser);
const mockedIsSupabaseConfigured = vi.mocked(isSupabaseConfigured);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedCreateClient = vi.mocked(createClient);

const at = "2026-08-02T00:00:00.000Z";
const user = { id: "user-123" };

afterEach(() => {
  vi.clearAllMocks();
});

function putRequest(body: unknown) {
  return new Request("https://stylekit.top/api/kits", {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

describe("kits route", () => {
  it("GET returns 401 when unauthenticated", async () => {
    mockedGetServerUser.mockResolvedValue(null);
    const res = await GET(new Request("https://stylekit.top/api/kits"));
    expect(res.status).toBe(401);
  });

  it("GET returns empty when Supabase is not configured", async () => {
    // @ts-expect-error partial user
    mockedGetServerUser.mockResolvedValue(user);
    mockedIsSupabaseConfigured.mockReturnValue(false);
    const res = await GET(new Request("https://stylekit.top/api/kits"));
    const json = await res.json();
    expect(json).toEqual({ success: true, kits: [], activeKitId: "" });
  });

  it("PUT blocks untrusted origins", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: false, error: "bad origin", status: 403 });
    const res = await PUT(putRequest({ kits: [] }));
    expect(res.status).toBe(403);
  });

  it("PUT merges incoming kits with stored kits and persists the union", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    // @ts-expect-error partial user
    mockedGetServerUser.mockResolvedValue(user);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://x.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-key";

    const stored = {
      kits: [
        { id: "remotekit", name: "Remote", updatedAt: at, items: [] },
      ],
      active_kit_id: "remotekit",
    };
    const upsertSpy = vi.fn().mockResolvedValue({ error: null });
    const fromSpy = vi.fn(() => ({
      select: () => ({
        eq: () => ({ maybeSingle: () => Promise.resolve({ data: stored, error: null }) }),
      }),
      upsert: upsertSpy,
    }));
    // @ts-expect-error minimal client
    mockedCreateClient.mockReturnValue({ from: fromSpy });

    const res = await PUT(
      putRequest({
        kits: [{ id: "localkit", name: "Local", updatedAt: at, items: [] }],
        activeKitId: "localkit",
      })
    );
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.persisted).toBe(true);
    expect(json.kits.map((k: { id: string }) => k.id).sort()).toEqual(["localkit", "remotekit"]);
    expect(upsertSpy).toHaveBeenCalledOnce();
  });

  it("PUT rejects an invalid payload", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    // @ts-expect-error partial user
    mockedGetServerUser.mockResolvedValue(user);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    const res = await PUT(putRequest({ kits: "not-an-array" }));
    expect(res.status).toBe(400);
  });

  it("PUT degrades gracefully when the table is missing", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    // @ts-expect-error partial user
    mockedGetServerUser.mockResolvedValue(user);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://x.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-key";

    const missingTable = { code: "42P01", message: 'relation "user_kits" does not exist' };
    const fromSpy = vi.fn(() => ({
      select: () => ({
        eq: () => ({ maybeSingle: () => Promise.resolve({ data: null, error: missingTable }) }),
      }),
      upsert: () => Promise.resolve({ error: missingTable }),
    }));
    // @ts-expect-error minimal client
    mockedCreateClient.mockReturnValue({ from: fromSpy });

    const res = await PUT(
      putRequest({ kits: [{ id: "localkit", name: "Local", updatedAt: at, items: [] }] })
    );
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.persisted).toBe(false);
    expect(json.kits.map((k: { id: string }) => k.id)).toEqual(["localkit"]);
  });
});
