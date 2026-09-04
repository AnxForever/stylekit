import { afterEach, describe, expect, it, vi } from "vitest";

// Hoisted by vitest regardless of where it appears, so it lives at the top to
// match its actual execution order: these tests exercise the real client and
// must not inherit a module mock from elsewhere in the suite.
vi.unmock("@supabase/supabase-js");

const ENV_SNAPSHOT = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

afterEach(() => {
  vi.resetModules();
  vi.clearAllMocks();

  if (ENV_SNAPSHOT.NEXT_PUBLIC_SUPABASE_URL === undefined) {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  } else {
    process.env.NEXT_PUBLIC_SUPABASE_URL = ENV_SNAPSHOT.NEXT_PUBLIC_SUPABASE_URL;
  }

  if (ENV_SNAPSHOT.SUPABASE_SERVICE_ROLE_KEY === undefined) {
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  } else {
    process.env.SUPABASE_SERVICE_ROLE_KEY = ENV_SNAPSHOT.SUPABASE_SERVICE_ROLE_KEY;
  }
});

describe("getOrAssignSeqId", () => {
  it("returns seq_id from RPC when function exists", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role";

    const rpc = vi.fn().mockResolvedValue({ data: 7, error: null });
    const createClient = vi.fn().mockReturnValue({
      rpc,
      from: vi.fn(),
    });
    vi.doMock("@supabase/supabase-js", () => ({ createClient }));

    const { getOrAssignSeqId } = await import("@/lib/auth/seq-id");
    const seqId = await getOrAssignSeqId("user-1");

    expect(seqId).toBe(7);
    expect(rpc).toHaveBeenCalledWith("assign_user_seq_id", {
      p_user_id: "user-1",
    });
  });

  it("falls back to upsert when RPC function is unavailable", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role";

    const rpc = vi.fn().mockResolvedValue({
      data: null,
      error: { message: "Could not find the function public.assign_user_seq_id" },
    });
    const single = vi.fn().mockResolvedValue({
      data: { seq_id: "11" },
      error: null,
    });
    const select = vi.fn().mockReturnValue({ single });
    const upsert = vi.fn().mockReturnValue({ select });
    const from = vi.fn().mockReturnValue({ upsert });
    const createClient = vi.fn().mockReturnValue({ rpc, from });
    vi.doMock("@supabase/supabase-js", () => ({ createClient }));

    const { getOrAssignSeqId } = await import("@/lib/auth/seq-id");
    const seqId = await getOrAssignSeqId("user-2");

    expect(seqId).toBe(11);
    expect(from).toHaveBeenCalledWith("user_seq_ids");
    expect(upsert).toHaveBeenCalledWith(
      { user_id: "user-2" },
      { onConflict: "user_id" }
    );
  });

  it("throws when service role credentials are missing", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    const createClient = vi.fn();
    vi.doMock("@supabase/supabase-js", () => ({ createClient }));

    const { getOrAssignSeqId } = await import("@/lib/auth/seq-id");

    await expect(getOrAssignSeqId("user-3")).rejects.toThrow(
      "Supabase service role credentials are required"
    );
    expect(createClient).not.toHaveBeenCalled();
  });
});
