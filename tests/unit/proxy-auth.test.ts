import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({
  getClaims: vi.fn(),
  getUser: vi.fn(),
  isAdminUserId: vi.fn(),
  verifyAdminSessionCookieValue: vi.fn(),
}));

vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(() => ({
    auth: {
      getClaims: mocks.getClaims,
      getUser: mocks.getUser,
    },
  })),
}));

vi.mock("@/lib/auth/admin-policy", () => ({
  isAdminUserId: mocks.isAdminUserId,
}));

vi.mock("@/lib/auth/admin-session", () => ({
  ADMIN_SESSION_COOKIE_NAME: "stylekit-admin-session",
  verifyAdminSessionCookieValue: mocks.verifyAdminSessionCookieValue,
}));

import { proxy } from "@/proxy";

function request(pathname: string, cookie?: string) {
  return new NextRequest(`https://www.stylekit.top${pathname}`, {
    headers: cookie ? { cookie } : undefined,
  });
}

describe("proxy Supabase session refresh", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");
    mocks.verifyAdminSessionCookieValue.mockResolvedValue(false);
    mocks.getClaims.mockResolvedValue({
      data: {
        claims: { sub: "user-123" },
        header: {},
        signature: new Uint8Array(),
      },
      error: null,
    });
  });

  it("validates an auth cookie with getClaims instead of getUser", async () => {
    const response = await proxy(
      request("/en/styles", "sb-project-auth-token=session"),
    );

    expect(response.status).toBe(200);
    expect(mocks.getClaims).toHaveBeenCalledTimes(1);
    expect(mocks.getUser).not.toHaveBeenCalled();
  });

  it("recognizes chunked Supabase session cookies", async () => {
    await proxy(
      request("/en/styles", "sb-project-auth-token.0=session-part"),
    );

    expect(mocks.getClaims).toHaveBeenCalledTimes(1);
  });

  it("does not refresh sessions for anonymous analytics ingestion", async () => {
    const response = await proxy(
      request("/api/analytics", "sb-project-auth-token=stale-session"),
    );

    expect(response.status).toBe(200);
    expect(mocks.getClaims).not.toHaveBeenCalled();
    expect(mocks.getUser).not.toHaveBeenCalled();
  });

  it("uses verified JWT claims to authorize admin routes", async () => {
    mocks.isAdminUserId.mockReturnValue(true);

    const response = await proxy(
      request("/admin/operations", "sb-project-auth-token=session"),
    );

    expect(mocks.isAdminUserId).toHaveBeenCalledWith("user-123");
    expect(response.status).toBe(200);
  });

  it("redirects admin requests when claim validation is rate limited", async () => {
    mocks.getClaims.mockResolvedValue({
      data: null,
      error: {
        status: 429,
        code: "over_request_rate_limit",
      },
    });

    const response = await proxy(
      request("/admin/operations", "sb-project-auth-token=expired-session"),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toContain("/admin-login");
  });
});
