import { afterEach, describe, expect, it, vi } from "vitest";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import {
  ADMIN_SESSION_COOKIE_NAME,
  createAdminSessionCookieValue,
} from "@/lib/auth/admin-session";
import { getServerUser } from "@/lib/auth/supabase-server";

vi.mock("@/lib/auth/supabase-server", () => ({
  getServerUser: vi.fn(),
}));

const mockedGetServerUser = vi.mocked(getServerUser);
type ServerUser = Awaited<ReturnType<typeof getServerUser>>;

const ORIGINAL_ADMIN_USER_IDS = process.env.ADMIN_USER_IDS;
const ORIGINAL_ADMIN_API_TOKEN = process.env.ADMIN_API_TOKEN;
const ORIGINAL_ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;
const ORIGINAL_DEV_BYPASS = process.env.ADMIN_DEV_BYPASS;
const TEST_SESSION_KEY = ["test", "session", "key"].join("-");

afterEach(() => {
  mockedGetServerUser.mockReset();

  if (ORIGINAL_ADMIN_USER_IDS === undefined) {
    delete process.env.ADMIN_USER_IDS;
  } else {
    process.env.ADMIN_USER_IDS = ORIGINAL_ADMIN_USER_IDS;
  }

  if (ORIGINAL_ADMIN_API_TOKEN === undefined) {
    delete process.env.ADMIN_API_TOKEN;
  } else {
    process.env.ADMIN_API_TOKEN = ORIGINAL_ADMIN_API_TOKEN;
  }

  if (ORIGINAL_ADMIN_SESSION_SECRET === undefined) {
    delete process.env.ADMIN_SESSION_SECRET;
  } else {
    process.env.ADMIN_SESSION_SECRET = ORIGINAL_ADMIN_SESSION_SECRET;
  }

  if (ORIGINAL_DEV_BYPASS === undefined) {
    delete process.env.ADMIN_DEV_BYPASS;
  } else {
    process.env.ADMIN_DEV_BYPASS = ORIGINAL_DEV_BYPASS;
  }
});

describe("admin api access", () => {
  it("allows valid admin token without user session lookup", async () => {
    process.env.ADMIN_API_TOKEN = "super-secret-token";

    const request = new Request("https://stylekit.top/api/admin/submissions", {
      headers: {
        "x-admin-token": "super-secret-token",
      },
    });

    const result = await checkAdminApiAccess(request);
    expect(result.allowed).toBe(true);
    expect(result.actor?.type).toBe("token");
    expect(result.actor?.id.startsWith("token:")).toBe(true);
    expect(mockedGetServerUser).not.toHaveBeenCalled();
  });

  it("allows valid admin password session without user session lookup", async () => {
    process.env.ADMIN_SESSION_SECRET = TEST_SESSION_KEY;
    const session = await createAdminSessionCookieValue({
      secret: TEST_SESSION_KEY,
      maxAgeSeconds: 60,
    });

    const request = new Request("https://stylekit.top/api/admin/submissions", {
      headers: {
        cookie: `${ADMIN_SESSION_COOKIE_NAME}=${encodeURIComponent(session)}`,
      },
    });

    const result = await checkAdminApiAccess(request, {
      nodeEnv: "production",
    });
    expect(result.allowed).toBe(true);
    expect(result.actor).toEqual({
      type: "password-session",
      id: "admin-password-session",
    });
    expect(mockedGetServerUser).not.toHaveBeenCalled();
  });

  it("treats malformed admin session cookies as missing", async () => {
    process.env.ADMIN_API_TOKEN = "super-secret-token";
    process.env.ADMIN_SESSION_SECRET = TEST_SESSION_KEY;

    const request = new Request("https://stylekit.top/api/admin/submissions", {
      headers: {
        cookie: `${ADMIN_SESSION_COOKIE_NAME}=%E0%A4%A`,
      },
    });

    const result = await checkAdminApiAccess(request, {
      nodeEnv: "production",
    });
    expect(result.allowed).toBe(false);
    expect(result.status).toBe(401);
    expect(mockedGetServerUser).not.toHaveBeenCalled();
  });

  it("rejects missing token when token auth is configured and no auth cookie", async () => {
    process.env.ADMIN_API_TOKEN = "super-secret-token";

    const request = new Request("https://stylekit.top/api/admin/submissions");
    const result = await checkAdminApiAccess(request, { nodeEnv: "production" });

    expect(result.allowed).toBe(false);
    expect(result.status).toBe(401);
    expect(mockedGetServerUser).not.toHaveBeenCalled();
  });

  it("allows admin user when auth cookie exists", async () => {
    process.env.ADMIN_USER_IDS = "user-1";
    mockedGetServerUser.mockResolvedValue({ id: "user-1" } as ServerUser);

    const request = new Request("https://stylekit.top/api/admin/submissions", {
      headers: {
        cookie: "sb-project-auth-token=abc",
      },
    });

    const result = await checkAdminApiAccess(request, { nodeEnv: "production" });
    expect(result.allowed).toBe(true);
    expect(result.actor).toEqual({ type: "user", id: "user-1" });
    expect(mockedGetServerUser).toHaveBeenCalledTimes(1);
  });

  it("rejects non-admin user when auth cookie exists", async () => {
    process.env.ADMIN_USER_IDS = "user-1";
    mockedGetServerUser.mockResolvedValue({ id: "user-2" } as ServerUser);

    const request = new Request("https://stylekit.top/api/admin/submissions", {
      headers: {
        cookie: "sb-project-auth-token=abc",
      },
    });

    const result = await checkAdminApiAccess(request, { nodeEnv: "production" });
    expect(result.allowed).toBe(false);
    expect(result.status).toBe(403);
  });

  it("allows local development fallback when admin config is missing and bypass is set", async () => {
    delete process.env.ADMIN_USER_IDS;
    delete process.env.ADMIN_API_TOKEN;
    process.env.ADMIN_DEV_BYPASS = "true";

    const request = new Request("https://stylekit.top/api/admin/submissions");
    const result = await checkAdminApiAccess(request, { nodeEnv: "development" });

    expect(result.allowed).toBe(true);
    expect(result.actor).toEqual({ type: "dev-bypass", id: "dev-bypass" });
    expect(mockedGetServerUser).not.toHaveBeenCalled();
  });

  it("denies local development when bypass is not set", async () => {
    delete process.env.ADMIN_USER_IDS;
    delete process.env.ADMIN_API_TOKEN;
    delete process.env.ADMIN_DEV_BYPASS;

    const request = new Request("https://stylekit.top/api/admin/submissions");
    const result = await checkAdminApiAccess(request, { nodeEnv: "development" });

    expect(result.allowed).toBe(false);
  });
});
