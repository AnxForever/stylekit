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

vi.mock("@/lib/auth/nodeloc", () => ({
  exchangeCodeForToken: vi.fn(),
  getNodeLocUser: vi.fn(),
}));

vi.mock("@/lib/auth/seq-id", () => ({
  getOrAssignSeqId: vi.fn(),
}));

import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { exchangeCodeForToken, getNodeLocUser } from "@/lib/auth/nodeloc";
import { getOrAssignSeqId } from "@/lib/auth/seq-id";
import {
  GET,
} from "@/app/api/auth/nodeloc/callback/route";
import {
  NODELOC_CALLBACK_PATH,
  NODELOC_NEXT_COOKIE,
  NODELOC_STATE_COOKIE,
} from "@/lib/auth/nodeloc-cookies";

const mockedCookies = vi.mocked(cookies);
const mockedCreateServerClient = vi.mocked(createServerClient);
const mockedCreateClient = vi.mocked(createClient);
const mockedExchangeCodeForToken = vi.mocked(exchangeCodeForToken);
const mockedGetNodeLocUser = vi.mocked(getNodeLocUser);
const mockedGetOrAssignSeqId = vi.mocked(getOrAssignSeqId);

function requestWithCookies(url: string, state = "state-123") {
  return new NextRequest(url, {
    headers: {
      cookie: `${NODELOC_STATE_COOKIE}=${state}; ${NODELOC_NEXT_COOKIE}=${encodeURIComponent("/profile")}`,
    },
  });
}

describe("GET /api/auth/nodeloc/callback", () => {
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
    mockedGetOrAssignSeqId.mockRejectedValue(new Error("not configured"));
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it("rejects a missing or mismatched OAuth state", async () => {
    const response = await GET(
      requestWithCookies(
        `https://stylekit.top${NODELOC_CALLBACK_PATH}?code=code&state=wrong`,
        "expected",
      ),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "https://www.stylekit.top/login?auth_error=nodeloc&next=%2Fprofile",
    );
    expect(mockedExchangeCodeForToken).not.toHaveBeenCalled();
  });

  it("creates a Supabase session for a NodeLoc user", async () => {
    mockedExchangeCodeForToken.mockResolvedValue({
      access_token: "nodeloc-access-token",
      token_type: "Bearer",
      expires_in: 7200,
    });
    mockedGetNodeLocUser.mockResolvedValue({
      id: 42,
      username: "nodeloc-user",
      name: "NodeLoc User",
      avatar_url: "/avatars/user.png",
      trust_level: 2,
      email: null,
    });

    const createUser = vi.fn().mockResolvedValue({
      data: { user: { id: "user_nodeloc_1" } },
      error: null,
    });
    const generateLink = vi.fn().mockResolvedValue({
      data: { properties: { hashed_token: "hashed-token" } },
      error: null,
    });
    mockedCreateClient.mockReturnValue({
      auth: { admin: { createUser, generateLink } },
    } as unknown as ReturnType<typeof createClient>);

    const verifyOtp = vi.fn().mockResolvedValue({ error: null });
    mockedCreateServerClient.mockReturnValue({
      auth: { verifyOtp },
    } as unknown as ReturnType<typeof createServerClient>);

    const response = await GET(
      requestWithCookies(
        `https://stylekit.top${NODELOC_CALLBACK_PATH}?code=code&state=state-123`,
      ),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://www.stylekit.top/profile");
    expect(mockedExchangeCodeForToken).toHaveBeenCalledWith(
      "code",
      `https://www.stylekit.top${NODELOC_CALLBACK_PATH}`,
    );
    expect(createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "nodeloc_42@oauth.nodeloc.com",
        user_metadata: expect.objectContaining({
          provider: "nodeloc",
          nodeloc_id: 42,
        }),
      }),
    );
    expect(verifyOtp).toHaveBeenCalledWith({
      type: "magiclink",
      token_hash: "hashed-token",
    });
  });
});
