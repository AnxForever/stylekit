import { describe, expect, it } from "vitest";
import {
  createAdminSessionCookieValue,
  verifyAdminPassword,
  verifyAdminSessionCookieValue,
} from "@/lib/auth/admin-session";

const TEST_SESSION_KEY = ["test", "session", "key"].join("-");
const WRONG_SESSION_KEY = ["wrong", "session", "key"].join("-");
const TEST_PASSWORD = ["correct", "password"].join("-");
const WRONG_PASSWORD = ["wrong", "password"].join("-");

describe("admin password sessions", () => {
  it("creates and verifies signed session cookies", async () => {
    const now = new Date("2026-06-10T00:00:00.000Z");
    const cookieValue = await createAdminSessionCookieValue({
      now,
      maxAgeSeconds: 60,
      secret: TEST_SESSION_KEY,
    });

    await expect(
      verifyAdminSessionCookieValue(cookieValue, {
        now: new Date("2026-06-10T00:00:30.000Z"),
        secret: TEST_SESSION_KEY,
      })
    ).resolves.toBe(true);
  });

  it("rejects expired or incorrectly signed session cookies", async () => {
    const now = new Date("2026-06-10T00:00:00.000Z");
    const cookieValue = await createAdminSessionCookieValue({
      now,
      maxAgeSeconds: 60,
      secret: TEST_SESSION_KEY,
    });

    await expect(
      verifyAdminSessionCookieValue(cookieValue, {
        now: new Date("2026-06-10T00:02:00.000Z"),
        secret: TEST_SESSION_KEY,
      })
    ).resolves.toBe(false);

    await expect(
      verifyAdminSessionCookieValue(cookieValue, {
        now: new Date("2026-06-10T00:00:30.000Z"),
        secret: WRONG_SESSION_KEY,
      })
    ).resolves.toBe(false);
  });

  it("verifies plain or sha256 admin passwords", async () => {
    await expect(
      verifyAdminPassword(TEST_PASSWORD, {
        password: TEST_PASSWORD,
      })
    ).resolves.toBe(true);

    await expect(
      verifyAdminPassword(WRONG_PASSWORD, {
        password: TEST_PASSWORD,
      })
    ).resolves.toBe(false);

    await expect(
      verifyAdminPassword(TEST_PASSWORD, {
        password: null,
        passwordSha256:
          "9246aa9be8de7b40d64eb664986430793b6cc13a19d2a456981e44f28303f9cf",
      })
    ).resolves.toBe(true);
  });
});
