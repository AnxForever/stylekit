import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(),
}));

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/auth/seq-id", () => ({
  getOrAssignSeqId: vi.fn(),
}));

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { getOrAssignSeqId } from "@/lib/auth/seq-id";
import { GET } from "@/app/api/auth/callback/route";

const mockedCookies = vi.mocked(cookies);
const mockedCreateServerClient = vi.mocked(createServerClient);
const mockedCreateClient = vi.mocked(createClient);
const mockedGetOrAssignSeqId = vi.mocked(getOrAssignSeqId);

describe("GET /api/auth/callback", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "https://www.stylekit.top");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "anon");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service");

    mockedCookies.mockResolvedValue({
      getAll: () => [],
      set: vi.fn(),
    } as unknown as Awaited<ReturnType<typeof cookies>>);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it("keeps login successful when seq-id assignment fails", async () => {
    const exchangeCodeForSession = vi.fn().mockResolvedValue({ error: null });
    const getUser = vi.fn().mockResolvedValue({
      data: { user: { id: "user_1", user_metadata: {} } },
    });
    mockedCreateServerClient.mockReturnValue({
      auth: { exchangeCodeForSession, getUser },
    } as unknown as ReturnType<typeof createServerClient>);

    const updateUserById = vi.fn().mockResolvedValue({ error: null });
    mockedCreateClient.mockReturnValue({
      auth: { admin: { updateUserById } },
    } as unknown as ReturnType<typeof createClient>);

    mockedGetOrAssignSeqId.mockRejectedValue(new Error("EROFS"));

    const response = await GET(
      new Request(
        "https://stylekit.top/api/auth/callback?code=test-code&next=%2Fprofile"
      ) as never
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://www.stylekit.top/profile");
    expect(updateUserById).not.toHaveBeenCalled();
  });

  it("merges existing metadata when writing seq_id", async () => {
    const exchangeCodeForSession = vi.fn().mockResolvedValue({ error: null });
    const getUser = vi.fn().mockResolvedValue({
      data: {
        user: {
          id: "user_2",
          user_metadata: { provider: "github", full_name: "Ada Lovelace" },
        },
      },
    });
    mockedCreateServerClient.mockReturnValue({
      auth: { exchangeCodeForSession, getUser },
    } as unknown as ReturnType<typeof createServerClient>);

    const updateUserById = vi.fn().mockResolvedValue({ error: null });
    mockedCreateClient.mockReturnValue({
      auth: { admin: { updateUserById } },
    } as unknown as ReturnType<typeof createClient>);

    mockedGetOrAssignSeqId.mockResolvedValue(12);

    const response = await GET(
      new Request(
        "https://stylekit.top/api/auth/callback?code=test-code&next=profile"
      ) as never
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://www.stylekit.top/");
    expect(updateUserById).toHaveBeenCalledWith("user_2", {
      user_metadata: {
        provider: "github",
        full_name: "Ada Lovelace",
        seq_id: 12,
      },
    });
  });

  it("uses the request origin for localhost callbacks in development", async () => {
    vi.stubEnv("NODE_ENV", "development");

    const exchangeCodeForSession = vi.fn().mockResolvedValue({ error: null });
    const getUser = vi.fn().mockResolvedValue({
      data: { user: null },
    });
    mockedCreateServerClient.mockReturnValue({
      auth: { exchangeCodeForSession, getUser },
    } as unknown as ReturnType<typeof createServerClient>);

    const response = await GET(
      new Request(
        "http://127.0.0.1:3001/api/auth/callback?code=test-code&next=%2Fprofile"
      ) as never
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://127.0.0.1:3001/profile");
  });
});
