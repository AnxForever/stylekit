import { createHmac, randomBytes, randomInt, timingSafeEqual } from "node:crypto";

export const EMAIL_OTP_COOKIE = "stylekit-email-otp";
export const EMAIL_OTP_TTL_SECONDS = 10 * 60;
export const EMAIL_OTP_MAX_ATTEMPTS = 5;

interface OtpChallenge {
  /** Per-challenge nonce; the attempt budget is tracked server-side under it. */
  jti: string;
  email: string;
  digest: string;
  expiresAt: number;
  /**
   * Kept only so previously issued cookies stay decodable. The value is not
   * trusted — a client can always replay an older cookie to reset it, so the
   * authoritative counter lives in `challengeState` below.
   */
  attempts: number;
}

interface ChallengeState {
  attempts: number;
  consumed: boolean;
  expiresAt: number;
}

/**
 * Server-side attempt ledger, keyed by the challenge nonce.
 *
 * The signed cookie alone cannot bound guesses: it is held by the client, so
 * replaying the pristine copy resets any counter baked into it and turns the
 * 6-digit code into an unlimited brute force. Anchoring the counter here means
 * every replay of the same cookie lands on the same budget.
 */
const challengeState = new Map<string, ChallengeState>();
const CLEANUP_EVERY_HITS = 100;
let hitCounter = 0;

function readChallengeState(jti: string, expiresAt: number): ChallengeState {
  hitCounter += 1;
  if (hitCounter % CLEANUP_EVERY_HITS === 0) {
    const now = Date.now();
    for (const [key, state] of challengeState.entries()) {
      if (state.expiresAt <= now) {
        challengeState.delete(key);
      }
    }
  }

  const existing = challengeState.get(jti);
  if (existing) {
    return existing;
  }

  const created: ChallengeState = { attempts: 0, consumed: false, expiresAt };
  challengeState.set(jti, created);
  return created;
}

/** Test seam: drops all tracked challenges. */
export function resetEmailOtpState(): void {
  challengeState.clear();
}

function getSecret(): string {
  const secret =
    process.env.EMAIL_OTP_SECRET?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!secret) {
    throw new Error("EMAIL_OTP_SECRET or SUPABASE_SERVICE_ROLE_KEY must be set");
  }
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

function digestCode(email: string, code: string): string {
  return createHmac("sha256", getSecret())
    .update(`${email}:${code}`)
    .digest("hex");
}

function encodeChallenge(challenge: OtpChallenge): string {
  const payload = Buffer.from(JSON.stringify(challenge)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function decodeChallenge(value: string | undefined): OtpChallenge | null {
  if (!value) return null;

  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;

  const expectedSignature = sign(payload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString(),
    ) as Partial<OtpChallenge>;
    if (
      typeof parsed.jti !== "string" ||
      parsed.jti.length === 0 ||
      typeof parsed.email !== "string" ||
      typeof parsed.digest !== "string" ||
      typeof parsed.expiresAt !== "number" ||
      typeof parsed.attempts !== "number"
    ) {
      return null;
    }
    return parsed as OtpChallenge;
  } catch {
    return null;
  }
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function createOtpChallenge(email: string): {
  code: string;
  cookieValue: string;
} {
  const normalizedEmail = normalizeEmail(email);
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const expiresAt = Date.now() + EMAIL_OTP_TTL_SECONDS * 1000;
  const challenge: OtpChallenge = {
    jti: randomBytes(16).toString("hex"),
    email: normalizedEmail,
    digest: digestCode(normalizedEmail, code),
    expiresAt,
    attempts: 0,
  };

  challengeState.set(challenge.jti, {
    attempts: 0,
    consumed: false,
    expiresAt,
  });

  return { code, cookieValue: encodeChallenge(challenge) };
}

export function verifyOtpChallenge(
  cookieValue: string | undefined,
  email: string,
  code: string,
):
  | { valid: true }
  | {
      valid: false;
      reason: "missing" | "expired" | "attempts" | "invalid";
      retryCookieValue?: string;
    } {
  const challenge = decodeChallenge(cookieValue);
  if (!challenge) return { valid: false, reason: "missing" };
  if (challenge.expiresAt <= Date.now()) {
    return { valid: false, reason: "expired" };
  }

  const state = readChallengeState(challenge.jti, challenge.expiresAt);
  // A code that already signed someone in must not be replayable for the rest
  // of its TTL.
  if (state.consumed) {
    return { valid: false, reason: "expired" };
  }
  if (state.attempts >= EMAIL_OTP_MAX_ATTEMPTS) {
    return { valid: false, reason: "attempts" };
  }

  const expectedDigest = digestCode(normalizeEmail(email), code);
  const actualBuffer = Buffer.from(challenge.digest);
  const expectedBuffer = Buffer.from(expectedDigest);
  const valid =
    challenge.email === normalizeEmail(email) &&
    actualBuffer.length === expectedBuffer.length &&
    timingSafeEqual(actualBuffer, expectedBuffer);

  if (valid) {
    state.consumed = true;
    return { valid: true };
  }

  state.attempts += 1;
  const nextChallenge = {
    ...challenge,
    attempts: state.attempts,
  };
  return {
    valid: false,
    reason: "invalid",
    retryCookieValue: encodeChallenge(nextChallenge),
  };
}

export function setOtpCookie(response: Response, cookieValue: string): void {
  const cookie = [
    `${EMAIL_OTP_COOKIE}=${encodeURIComponent(cookieValue)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${EMAIL_OTP_TTL_SECONDS}`,
    process.env.NODE_ENV === "production" ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
  response.headers.append("Set-Cookie", cookie);
}

export function clearOtpCookie(response: Response): void {
  response.headers.append(
    "Set-Cookie",
    `${EMAIL_OTP_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`,
  );
}
