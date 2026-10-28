import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/security/request-origin", () => ({
  verifyTrustedOrigin: vi.fn(),
}));

import {
  DELETE,
  GET,
  POST,
} from "@/app/api/admin/analytics/exclusion/route";
import { ANALYTICS_EXCLUSION_COOKIE_NAME } from "@/lib/analytics/collection-policy";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);

beforeEach(() => {
  vi.clearAllMocks();
  mockedCheckAdminApiAccess.mockResolvedValue({
    allowed: true,
    actor: { type: "password-session", id: "admin-password-session" },
  });
  mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("/api/admin/analytics/exclusion", () => {
  it("requires admin access before exposing the exclusion state", async () => {
    mockedCheckAdminApiAccess.mockResolvedValueOnce({
      allowed: false,
      status: 403,
      error: "Forbidden",
    });

    const response = await GET(
      new Request("https://stylekit.top/api/admin/analytics/exclusion", {
        headers: { cookie: `${ANALYTICS_EXCLUSION_COOKIE_NAME}=1` },
      }),
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({ error: "Forbidden" });
    expect(response.headers.get("cache-control")).toBe("private, no-store");
  });

  it.each([
    ["without cookie", "", false],
    ["with cookie", `${ANALYTICS_EXCLUSION_COOKIE_NAME}=1`, true],
  ])("reports exclusion state %s", async (_label, cookie, excluded) => {
    const response = await GET(
      new Request("https://stylekit.top/api/admin/analytics/exclusion", {
        headers: cookie ? { cookie } : {},
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ excluded });
    expect(response.headers.get("cache-control")).toBe("private, no-store");
  });

  it("sets a readable, secure, same-site opt-out cookie for an admin", async () => {
    vi.stubEnv("NODE_ENV", "production");

    const response = await POST(
      new Request("https://stylekit.top/api/admin/analytics/exclusion", {
        method: "POST",
        headers: { origin: "https://stylekit.top" },
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ excluded: true });
    const cookie = response.headers.get("set-cookie") ?? "";
    expect(cookie).toContain(`${ANALYTICS_EXCLUSION_COOKIE_NAME}=1`);
    expect(cookie.toLowerCase()).toContain("secure");
    expect(cookie.toLowerCase()).toContain("samesite=lax");
    expect(cookie).toContain("Path=/");
    expect(cookie.toLowerCase()).not.toContain("httponly");
    expect(mockedVerifyTrustedOrigin).toHaveBeenCalledTimes(1);
  });

  it("expires the opt-out cookie when the admin re-enables collection", async () => {
    const response = await DELETE(
      new Request("https://stylekit.top/api/admin/analytics/exclusion", {
        method: "DELETE",
        headers: { origin: "https://stylekit.top" },
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ excluded: false });
    const cookie = response.headers.get("set-cookie") ?? "";
    expect(cookie).toContain(`${ANALYTICS_EXCLUSION_COOKIE_NAME}=`);
    expect(cookie).toContain("Max-Age=0");
    expect(cookie).toContain("Path=/");
    expect(cookie.toLowerCase()).not.toContain("httponly");
  });

  it("rejects cross-origin cookie changes", async () => {
    mockedVerifyTrustedOrigin.mockReturnValueOnce({
      ok: false,
      status: 403,
      error: "Cross-origin request denied.",
    });

    const response = await POST(
      new Request("https://stylekit.top/api/admin/analytics/exclusion", {
        method: "POST",
        headers: { origin: "https://attacker.example" },
      }),
    );

    expect(response.status).toBe(403);
    expect(response.headers.get("set-cookie")).toBeNull();
  });
});
