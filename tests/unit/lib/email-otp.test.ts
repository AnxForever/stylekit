import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockCreateOtpChallengeState = vi.hoisted(() => vi.fn());
const mockConsumeOtpChallengeState = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/email-otp-store", () => ({
  createOtpChallengeState: mockCreateOtpChallengeState,
  consumeOtpChallengeState: mockConsumeOtpChallengeState,
}));
import {
  createOtpChallenge,
  normalizeEmail,
  verifyOtpChallenge,
} from "@/lib/auth/email-otp";

describe("email OTP challenge", () => {
  beforeEach(() => {
    mockCreateOtpChallengeState.mockClear();
    mockConsumeOtpChallengeState.mockClear();
    mockCreateOtpChallengeState.mockResolvedValue(undefined);
    mockConsumeOtpChallengeState.mockResolvedValue("invalid");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("creates a signed challenge that verifies with the generated code", async () => {
    vi.stubEnv("EMAIL_OTP_SECRET", "test-secret");

    const challenge = await createOtpChallenge(" User@Example.COM ");

    expect(challenge.code).toMatch(/^\d{6}$/);
    mockConsumeOtpChallengeState.mockResolvedValue("valid");
    await expect(
      verifyOtpChallenge(challenge.cookieValue, "user@example.com", challenge.code),
    ).resolves.toEqual({ valid: true });
    expect(mockConsumeOtpChallengeState).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        email: "user@example.com",
        maxAttempts: 5,
      }),
    );
  });

  it("rejects tampered challenges and keeps failed attempts server-side", async () => {
    vi.stubEnv("EMAIL_OTP_SECRET", "test-secret");

    const challenge = await createOtpChallenge("user@example.com");
    const result = await verifyOtpChallenge(challenge.cookieValue, "user@example.com", "000000");

    expect(result.valid).toBe(false);
    expect(result).toEqual({ valid: false, reason: "invalid" });
    expect(mockConsumeOtpChallengeState).toHaveBeenCalledTimes(1);
    await expect(
      verifyOtpChallenge(`${challenge.cookieValue}tampered`, "user@example.com", challenge.code),
    ).resolves.toEqual({ valid: false, reason: "missing" });
  });

  it("normalizes email addresses for challenge identity", () => {
    expect(normalizeEmail("  User@Example.COM ")).toBe("user@example.com");
  });
});
