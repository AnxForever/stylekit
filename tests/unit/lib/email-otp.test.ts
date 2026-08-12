import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  EMAIL_OTP_MAX_ATTEMPTS,
  createOtpChallenge,
  normalizeEmail,
  resetEmailOtpState,
  verifyOtpChallenge,
} from "@/lib/auth/email-otp";

/** A six-digit code guaranteed to differ from the issued one. */
function wrongCode(actual: string): string {
  return actual === "000000" ? "111111" : "000000";
}

describe("email OTP challenge", () => {
  beforeEach(() => {
    resetEmailOtpState();
  });

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
    const result = verifyOtpChallenge(
      challenge.cookieValue,
      "user@example.com",
      wrongCode(challenge.code),
    );

    expect(result.valid).toBe(false);
    expect(result).toHaveProperty("retryCookieValue");
    expect(
      verifyOtpChallenge(`${challenge.cookieValue}tampered`, "user@example.com", challenge.code),
    ).toEqual({ valid: false, reason: "missing" });
  });

  it("normalizes email addresses for challenge identity", () => {
    expect(normalizeEmail("  User@Example.COM ")).toBe("user@example.com");
  });

  it("cannot have its attempt budget reset by replaying the original cookie", () => {
    vi.stubEnv("EMAIL_OTP_SECRET", "test-secret");

    const challenge = createOtpChallenge("user@example.com");
    const bad = wrongCode(challenge.code);

    // An attacker holds the pristine cookie and simply resends it every time.
    // If the counter lived in the cookie this loop would never exhaust, turning
    // the 6-digit code into an unlimited brute force.
    for (let attempt = 0; attempt < EMAIL_OTP_MAX_ATTEMPTS; attempt += 1) {
      expect(
        verifyOtpChallenge(challenge.cookieValue, "user@example.com", bad),
      ).toMatchObject({ valid: false, reason: "invalid" });
    }

    expect(
      verifyOtpChallenge(challenge.cookieValue, "user@example.com", bad),
    ).toEqual({ valid: false, reason: "attempts" });

    // Even the correct code is refused once the budget is spent.
    expect(
      verifyOtpChallenge(challenge.cookieValue, "user@example.com", challenge.code),
    ).toEqual({ valid: false, reason: "attempts" });
  });

  it("burns the code after a successful verification", () => {
    vi.stubEnv("EMAIL_OTP_SECRET", "test-secret");

    const challenge = createOtpChallenge("user@example.com");

    expect(
      verifyOtpChallenge(challenge.cookieValue, "user@example.com", challenge.code),
    ).toEqual({ valid: true });

    expect(
      verifyOtpChallenge(challenge.cookieValue, "user@example.com", challenge.code),
    ).toEqual({ valid: false, reason: "expired" });
  });

  it("tracks each issued challenge independently", () => {
    vi.stubEnv("EMAIL_OTP_SECRET", "test-secret");

    const first = createOtpChallenge("user@example.com");
    const second = createOtpChallenge("user@example.com");

    for (let attempt = 0; attempt < EMAIL_OTP_MAX_ATTEMPTS; attempt += 1) {
      verifyOtpChallenge(first.cookieValue, "user@example.com", wrongCode(first.code));
    }

    expect(
      verifyOtpChallenge(first.cookieValue, "user@example.com", first.code),
    ).toEqual({ valid: false, reason: "attempts" });
    expect(
      verifyOtpChallenge(second.cookieValue, "user@example.com", second.code),
    ).toEqual({ valid: true });
  });
});
