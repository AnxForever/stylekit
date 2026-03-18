import { afterEach, describe, expect, it } from "vitest";
import {
  getAdminApiToken,
  getAdminUserIds,
  isAdminAllowlistConfigured,
  isAdminUserId,
} from "@/lib/auth/admin-policy";

const ORIGINAL_ADMIN_IDS = process.env.ADMIN_USER_IDS;
const ORIGINAL_ADMIN_TOKEN = process.env.ADMIN_API_TOKEN;
const ORIGINAL_DEV_BYPASS = process.env.ADMIN_DEV_BYPASS;

afterEach(() => {
  if (ORIGINAL_ADMIN_IDS === undefined) {
    delete process.env.ADMIN_USER_IDS;
  } else {
    process.env.ADMIN_USER_IDS = ORIGINAL_ADMIN_IDS;
  }

  if (ORIGINAL_ADMIN_TOKEN === undefined) {
    delete process.env.ADMIN_API_TOKEN;
  } else {
    process.env.ADMIN_API_TOKEN = ORIGINAL_ADMIN_TOKEN;
  }

  if (ORIGINAL_DEV_BYPASS === undefined) {
    delete process.env.ADMIN_DEV_BYPASS;
  } else {
    process.env.ADMIN_DEV_BYPASS = ORIGINAL_DEV_BYPASS;
  }
});

describe("admin policy", () => {
  it("parses admin ids from env", () => {
    process.env.ADMIN_USER_IDS = "u1, u2 , ,u3";

    expect(getAdminUserIds()).toEqual(["u1", "u2", "u3"]);
    expect(isAdminAllowlistConfigured()).toBe(true);
  });

  it("uses allowlist when configured", () => {
    process.env.ADMIN_USER_IDS = "admin-1,admin-2";

    expect(isAdminUserId("admin-1", "production")).toBe(true);
    expect(isAdminUserId("other", "production")).toBe(false);
  });

  it("defaults to deny in production when allowlist is missing", () => {
    delete process.env.ADMIN_USER_IDS;
    expect(isAdminUserId("any-user", "production")).toBe(false);
  });

  it("allows in non-production when allowlist is missing and ADMIN_DEV_BYPASS is set", () => {
    delete process.env.ADMIN_USER_IDS;
    process.env.ADMIN_DEV_BYPASS = "true";
    expect(isAdminUserId("any-user", "development")).toBe(true);
  });

  it("denies in non-production when allowlist is missing and no bypass", () => {
    delete process.env.ADMIN_USER_IDS;
    delete process.env.ADMIN_DEV_BYPASS;
    expect(isAdminUserId("any-user", "development")).toBe(false);
  });

  it("normalizes admin api token", () => {
    process.env.ADMIN_API_TOKEN = "  secret-token  ";
    expect(getAdminApiToken()).toBe("secret-token");

    process.env.ADMIN_API_TOKEN = "   ";
    expect(getAdminApiToken()).toBeNull();
  });
});
