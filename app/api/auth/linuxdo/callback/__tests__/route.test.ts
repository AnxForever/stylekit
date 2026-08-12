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

import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { exchangeCodeForToken, getLinuxDoUser } from "@/lib/auth/linuxdo";
import { getOrAssignSeqId } from "@/lib/auth/seq-id";
import { GET } from "@/app/api/auth/linuxdo/callback/route";

const mockedCookies = vi.mocked(cookies);
const mockedCreateServerClient = vi.mocked(createServerClient);
const mockedCreateClient = vi.mocked(createClient);
const mockedExchangeCodeForToken = vi.mocked(exchangeCodeForToken);
const mockedGetLinuxDoUser = vi.mocked(getLinuxDoUser);
const mockedGetOrAssignSeqId = vi.mocked(getOrAssignSeqId);

const STATE = "a".repeat(64);

/**
 * Build a callback request carrying the state/next cookies that
 * /api/auth/linuxdo sets when it starts the flow.
 */
function callbackRequest(
  url: string,
  options: { state?: string | null; next?: string } = {}
): NextRequest {
  const { state = STATE, next } = options;
  const cookiePairs: string[] = [];
  if (state !== null) {
    cookiePairs.push(`stylekit-linuxdo-oauth-state=${state}`);
  }
  if (next !== undefined) {
    cookiePairs.push(`stylekit-linuxdo-oauth-next=${encodeURIComponent(next)}`);
  }

  return new NextRequest(url, {
    headers: cookiePairs.length ? { cookie: cookiePairs.join("; ") } : {},
  });
}

describe("GET /api/auth/linuxdo/callback", () => {
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
      callbackRequest(
        `https://stylekit.top/api/auth/linuxdo/callback?code=test-code&state=${STATE}`,
        { next: "/profile" }
      ) as never
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://www.stylekit.top/profile");
    expect(mockedExchangeCodeForToken).toHaveBeenCalledWith(
      "test-code",
      "https://www.stylekit.top/api/auth/linuxdo/callback"
    );
    expect(verifyOtp).toHaveBeenCalledWith({
      type: "magiclink",
      token_hash: "hashed-token",
    });
  });

  it("rejects a callback whose state does not match the cookie", async () => {
    const response = await GET(
      callbackRequest(
        "https://stylekit.top/api/auth/linuxdo/callback?code=attacker-code&state=" +
          "b".repeat(64),
        { next: "/profile" }
      ) as never
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "https://www.stylekit.top/login?auth_error=linuxdo&next=%2Fprofile"
    );
    // The attacker's authorization code must never be redeemed.
    expect(mockedExchangeCodeForToken).not.toHaveBeenCalled();
  });

  it("rejects a callback with no state cookie at all", async () => {
    const response = await GET(
      callbackRequest(
        `https://stylekit.top/api/auth/linuxdo/callback?code=attacker-code&state=${STATE}`,
        { state: null }
      ) as never
    );

    expect(response.status).toBe(307);
    expect(mockedExchangeCodeForToken).not.toHaveBeenCalled();
  });

  it("uses the stored next cookie for the post-login path", async () => {
    mockedExchangeCodeForToken.mockResolvedValue({
      access_token: "example_linuxdo_access_token",
      token_type: "bearer",
      expires_in: 3600,
    });
    mockedGetLinuxDoUser.mockResolvedValue({
      id: 77,
      username: "state-user",
      name: "State User",
      avatar_url: "/avatar/{size}/img.png",
      email: null,
      active: true,
      trust_level: 3,
      silenced: false,
      api_key: "api-key",
    });

    const createUser = vi.fn().mockResolvedValue({
      data: { user: { id: "user_linuxdo_state" } },
      error: null,
    });
    const updateUserById = vi.fn().mockResolvedValue({ error: null });
    const generateLink = vi.fn().mockResolvedValue({
      data: { properties: { hashed_token: "hashed-token" } },
      error: null,
    });

    mockedCreateClient.mockReturnValue({
      auth: { admin: { createUser, listUsers: vi.fn(), updateUserById, generateLink } },
    } as unknown as ReturnType<typeof createClient>);

    const verifyOtp = vi.fn().mockResolvedValue({ error: null });
    mockedCreateServerClient.mockReturnValue({
      auth: { verifyOtp },
    } as unknown as ReturnType<typeof createServerClient>);

    const response = await GET(
      callbackRequest(
        `https://stylekit.top/api/auth/linuxdo/callback?code=test-code&state=${STATE}`,
        { next: "/profile" }
      ) as never
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://www.stylekit.top/profile");
    expect(mockedExchangeCodeForToken).toHaveBeenCalledWith(
      "test-code",
      "https://www.stylekit.top/api/auth/linuxdo/callback"
    );
  });

  it("returns to login when the provider denies authorization", async () => {
    const response = await GET(
      callbackRequest(
        "https://stylekit.top/api/auth/linuxdo/callback?error=access_denied",
        { next: "/workspace" }
      ) as never
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "https://www.stylekit.top/login?auth_error=linuxdo&next=%2Fworkspace"
    );
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
      callbackRequest(
        `https://stylekit.top/api/auth/linuxdo/callback?code=test-code&state=${STATE}`,
        { next: "dashboard" }
      ) as never
    );

    expect(response.status).toBe(307);
    // "dashboard" has no leading slash, so the stored path falls back to "/".
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

  // NextRequest normalizes 127.0.0.1 to localhost, so this asserts the
  // localhost branch of getPublicOrigin; both share the same code path.
  it("uses the request origin for local LinuxDO callbacks in development", async () => {
    vi.stubEnv("NODE_ENV", "development");
    mockedExchangeCodeForToken.mockResolvedValue({
      access_token: "example_linuxdo_access_token",
      token_type: "bearer",
      expires_in: 3600,
    });
    mockedGetLinuxDoUser.mockResolvedValue({
      id: 7,
      username: "tester",
      name: "Tester",
      avatar_url: "/avatar/{size}/img.png",
      email: null,
      active: true,
      trust_level: 2,
      silenced: false,
      api_key: "api-key",
    });

    const createUser = vi.fn().mockResolvedValue({
      data: { user: { id: "dev-user" } },
      error: null,
    });
    const updateUserById = vi.fn().mockResolvedValue({ error: null });
    const generateLink = vi.fn().mockResolvedValue({
      data: { properties: { hashed_token: "hashed-token" } },
      error: null,
    });

    mockedCreateClient.mockReturnValue({
      auth: { admin: { createUser, listUsers: vi.fn(), updateUserById, generateLink } },
    } as unknown as ReturnType<typeof createClient>);

    const verifyOtp = vi.fn().mockResolvedValue({ error: null });
    mockedCreateServerClient.mockReturnValue({
      auth: { verifyOtp },
    } as unknown as ReturnType<typeof createServerClient>);

    const response = await GET(
      callbackRequest(
        `http://localhost:3001/api/auth/linuxdo/callback?code=test-code&state=${STATE}`,
        { next: "/profile" }
      ) as never
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3001/profile");
  });
});
