import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createOtpChallenge,
  normalizeEmail,
  verifyOtpChallenge,
} from "@/lib/auth/email-otp";

describe("email OTP challenge", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("creates a signed challenge that verifies with the generated code", () => {
    vi.stubEnv("EMAIL_OTP_SECRET", "test-secret");

    const challenge = createOtpChallenge(" User@Example.COM ");

    expect(challenge.code).toMatch(/^\d{6}$/);
    expect(
      verifyOtpChallenge(challenge.cookieValue, "user@example.com", challenge.code),
    ).toEqual({ valid: true });
  });

  it("rejects tampered challenges and increments failed attempts", () => {
    vi.stubEnv("EMAIL_OTP_SECRET", "test-secret");

    const challenge = createOtpChallenge("user@example.com");
    const result = verifyOtpChallenge(challenge.cookieValue, "user@example.com", "000000");

    expect(result.valid).toBe(false);
    expect(result).toHaveProperty("retryCookieValue");
    expect(
      verifyOtpChallenge(`${challenge.cookieValue}tampered`, "user@example.com", challenge.code),
    ).toEqual({ valid: false, reason: "missing" });
  });

  it("normalizes email addresses for challenge identity", () => {
    expect(normalizeEmail("  User@Example.COM ")).toBe("user@example.com");
  });
});
