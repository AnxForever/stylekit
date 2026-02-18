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

vi.mock("@/lib/auth/linuxdo", () => ({
  exchangeCodeForToken: vi.fn(),
  getLinuxDoUser: vi.fn(),
}));

vi.mock("@/lib/auth/seq-id", () => ({
  getOrAssignSeqId: vi.fn(),
}));

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { exchangeCodeForToken, getLinuxDoUser } from "@/lib/auth/linuxdo";
import { getOrAssignSeqId } from "@/lib/auth/seq-id";
import { GET } from "@/app/api/auth/linuxdo/callback/route";

const ENV_SNAPSHOT = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

const mockedCookies = vi.mocked(cookies);
const mockedCreateServerClient = vi.mocked(createServerClient);
const mockedCreateClient = vi.mocked(createClient);
const mockedExchangeCodeForToken = vi.mocked(exchangeCodeForToken);
const mockedGetLinuxDoUser = vi.mocked(getLinuxDoUser);
const mockedGetOrAssignSeqId = vi.mocked(getOrAssignSeqId);

describe("GET /api/auth/linuxdo/callback", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service";

    mockedCookies.mockResolvedValue({
      getAll: () => [],
      set: vi.fn(),
    } as unknown as Awaited<ReturnType<typeof cookies>>);
  });

  afterEach(() => {
    vi.clearAllMocks();

    if (ENV_SNAPSHOT.NEXT_PUBLIC_SUPABASE_URL === undefined) {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    } else {
      process.env.NEXT_PUBLIC_SUPABASE_URL = ENV_SNAPSHOT.NEXT_PUBLIC_SUPABASE_URL;
    }

    if (ENV_SNAPSHOT.NEXT_PUBLIC_SUPABASE_ANON_KEY === undefined) {
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    } else {
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = ENV_SNAPSHOT.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    }

    if (ENV_SNAPSHOT.SUPABASE_SERVICE_ROLE_KEY === undefined) {
      delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    } else {
      process.env.SUPABASE_SERVICE_ROLE_KEY = ENV_SNAPSHOT.SUPABASE_SERVICE_ROLE_KEY;
    }
  });

  it("continues login when seq-id assignment fails", async () => {
    mockedExchangeCodeForToken.mockResolvedValue({
      access_token: "example_linuxdo_access_token",
      token_type: "bearer",
      expires_in: 3600,
    });
    mockedGetLinuxDoUser.mockResolvedValue({
      id: 99,
      username: "anx",
      name: "AnxForever",
      avatar_url: "/avatar/{size}/img.png",
      email: null,
      active: true,
      trust_level: 4,
      silenced: false,
      api_key: "api-key",
    });
    mockedGetOrAssignSeqId.mockRejectedValue(new Error("EROFS"));

    const createUser = vi.fn().mockResolvedValue({
      data: { user: { id: "user_linuxdo_1" } },
      error: null,
    });
    const listUsers = vi.fn();
    const updateUserById = vi.fn().mockResolvedValue({ error: null });
    const generateLink = vi.fn().mockResolvedValue({
      data: { properties: { hashed_token: "hashed-token" } },
      error: null,
    });

    mockedCreateClient.mockReturnValue({
      auth: { admin: { createUser, listUsers, updateUserById, generateLink } },
    } as unknown as ReturnType<typeof createClient>);

    const verifyOtp = vi.fn().mockResolvedValue({ error: null });
    mockedCreateServerClient.mockReturnValue({
      auth: { verifyOtp },
    } as unknown as ReturnType<typeof createServerClient>);

    const response = await GET(
      new Request(
        "https://www.stylekit.top/api/auth/linuxdo/callback?code=test-code&next=%2Fprofile"
      ) as never
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://www.stylekit.top/profile");
    expect(verifyOtp).toHaveBeenCalledWith({
      type: "magiclink",
      token_hash: "hashed-token",
    });
  });

  it("merges existing metadata when LinuxDO account already exists", async () => {
    mockedExchangeCodeForToken.mockResolvedValue({
      access_token: "example_linuxdo_access_token",
      token_type: "bearer",
      expires_in: 3600,
    });
    mockedGetLinuxDoUser.mockResolvedValue({
      id: 88,
      username: "anx",
      name: "AnxForever",
      avatar_url: "/avatar/{size}/img.png",
      email: null,
      active: true,
      trust_level: 5,
      silenced: false,
      api_key: "api-key",
    });

    const createUser = vi.fn().mockResolvedValue({
      data: null,
      error: { message: "already exists" },
    });
    const listUsers = vi.fn().mockResolvedValue({
      data: {
        users: [
          {
            id: "existing-user",
            email: "linuxdo_88@connect.linux.do",
            user_metadata: {
              seq_id: 9,
              custom_flag: true,
            },
          },
        ],
      },
    });
    const updateUserById = vi.fn().mockResolvedValue({ error: null });
    const generateLink = vi.fn().mockResolvedValue({
      data: { properties: { hashed_token: "hashed-token" } },
      error: null,
    });

    mockedCreateClient.mockReturnValue({
      auth: { admin: { createUser, listUsers, updateUserById, generateLink } },
    } as unknown as ReturnType<typeof createClient>);

    const verifyOtp = vi.fn().mockResolvedValue({ error: null });
    mockedCreateServerClient.mockReturnValue({
      auth: { verifyOtp },
    } as unknown as ReturnType<typeof createServerClient>);

    const response = await GET(
      new Request(
        "https://www.stylekit.top/api/auth/linuxdo/callback?code=test-code&next=dashboard"
      ) as never
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://www.stylekit.top/");
    expect(mockedGetOrAssignSeqId).not.toHaveBeenCalled();
    expect(updateUserById).toHaveBeenCalledWith("existing-user", {
      user_metadata: {
        seq_id: 9,
        custom_flag: true,
        user_name: "anx",
        full_name: "AnxForever",
        avatar_url: "https://linux.do/avatar/288/img.png",
        provider: "linuxdo",
        linuxdo_id: 88,
        linuxdo_trust_level: 5,
      },
    });
  });
});
