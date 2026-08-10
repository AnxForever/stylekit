import { afterEach, describe, expect, it } from "vitest";
import { DELETE, POST } from "@/app/api/admin/auth/route";
import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/auth/admin-session";

const ORIGINAL_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ORIGINAL_ADMIN_PASSWORD_SHA256 = process.env.ADMIN_PASSWORD_SHA256;
const ORIGINAL_ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;
const TEST_ADMIN_PASSWORD = ["correct", "password"].join("-");
const WRONG_ADMIN_PASSWORD = ["wrong", "password"].join("-");
const TEST_SESSION_KEY = ["test", "session", "key"].join("-");

afterEach(() => {
  if (ORIGINAL_ADMIN_PASSWORD === undefined) {
    delete process.env.ADMIN_PASSWORD;
  } else {
    process.env.ADMIN_PASSWORD = ORIGINAL_ADMIN_PASSWORD;
  }

  if (ORIGINAL_ADMIN_PASSWORD_SHA256 === undefined) {
    delete process.env.ADMIN_PASSWORD_SHA256;
  } else {
    process.env.ADMIN_PASSWORD_SHA256 = ORIGINAL_ADMIN_PASSWORD_SHA256;
  }

  if (ORIGINAL_ADMIN_SESSION_SECRET === undefined) {
    delete process.env.ADMIN_SESSION_SECRET;
  } else {
    process.env.ADMIN_SESSION_SECRET = ORIGINAL_ADMIN_SESSION_SECRET;
  }
});

describe("POST /api/admin/auth", () => {
  it("sets an admin session cookie for a valid password", async () => {
    process.env.ADMIN_PASSWORD = TEST_ADMIN_PASSWORD;
    process.env.ADMIN_SESSION_SECRET = TEST_SESSION_KEY;

    const response = await POST(
      new Request("https://stylekit.top/api/admin/auth", {
        method: "POST",
        body: JSON.stringify({ password: TEST_ADMIN_PASSWORD }),
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    const setCookie = response.headers.get("set-cookie") ?? "";
    expect(setCookie).toContain(ADMIN_SESSION_COOKIE_NAME);
    expect(setCookie).toContain("HttpOnly");
    expect(setCookie.toLowerCase()).toContain("samesite=lax");
  });

  it("rejects invalid passwords", async () => {
    process.env.ADMIN_PASSWORD = TEST_ADMIN_PASSWORD;
    process.env.ADMIN_SESSION_SECRET = TEST_SESSION_KEY;

    const response = await POST(
      new Request("https://stylekit.top/api/admin/auth", {
        method: "POST",
        body: JSON.stringify({ password: WRONG_ADMIN_PASSWORD }),
      })
    );

    expect(response.status).toBe(401);
    expect(response.headers.get("set-cookie")).toBeNull();
  });

  it("accepts the SHA-256 password configuration without plaintext storage", async () => {
    delete process.env.ADMIN_PASSWORD;
    process.env.ADMIN_PASSWORD_SHA256 =
      "9246aa9be8de7b40d64eb664986430793b6cc13a19d2a456981e44f28303f9cf";
    process.env.ADMIN_SESSION_SECRET = TEST_SESSION_KEY;

    const invalidResponse = await POST(
      new Request("https://stylekit.top/api/admin/auth", {
        method: "POST",
        body: JSON.stringify({ password: WRONG_ADMIN_PASSWORD }),
      })
    );

    expect(invalidResponse.status).toBe(401);

    const validResponse = await POST(
      new Request("https://stylekit.top/api/admin/auth", {
        method: "POST",
        body: JSON.stringify({ password: TEST_ADMIN_PASSWORD }),
      })
    );

    expect(validResponse.status).toBe(200);
    expect(validResponse.headers.get("set-cookie")).toContain(
      ADMIN_SESSION_COOKIE_NAME
    );
  });

  it("rate limits repeated password attempts by client", async () => {
    process.env.ADMIN_PASSWORD = TEST_ADMIN_PASSWORD;
    process.env.ADMIN_SESSION_SECRET = TEST_SESSION_KEY;

    let response: Response | null = null;
    for (let attempt = 0; attempt < 11; attempt++) {
      response = await POST(
        new Request("https://stylekit.top/api/admin/auth", {
          method: "POST",
          headers: {
            "user-agent": "admin-auth-rate-limit-test",
            "x-forwarded-for": "203.0.113.77",
          },
          body: JSON.stringify({ password: WRONG_ADMIN_PASSWORD }),
        })
      );
    }

    expect(response?.status).toBe(429);
    expect(response?.headers.get("retry-after")).toBeTruthy();
    expect(response?.headers.get("set-cookie")).toBeNull();
  });

  it("returns service unavailable when password login is not configured", async () => {
    delete process.env.ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD_SHA256;
    process.env.ADMIN_SESSION_SECRET = TEST_SESSION_KEY;

    const response = await POST(
      new Request("https://stylekit.top/api/admin/auth", {
        method: "POST",
        body: JSON.stringify({ password: TEST_ADMIN_PASSWORD }),
      })
    );

    expect(response.status).toBe(503);
  });
});

describe("DELETE /api/admin/auth", () => {
  it("clears the admin session cookie", async () => {
    const response = await DELETE();

    expect(response.status).toBe(200);
    const setCookie = response.headers.get("set-cookie") ?? "";
    expect(setCookie).toContain(`${ADMIN_SESSION_COOKIE_NAME}=`);
    expect(setCookie).toContain("Max-Age=0");
  });
});
