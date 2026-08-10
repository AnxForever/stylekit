import { createHmac, randomInt, timingSafeEqual } from "node:crypto";

export const EMAIL_OTP_COOKIE = "stylekit-email-otp";
export const EMAIL_OTP_TTL_SECONDS = 10 * 60;
export const EMAIL_OTP_MAX_ATTEMPTS = 5;

interface OtpChallenge {
  email: string;
  digest: string;
  expiresAt: number;
  attempts: number;
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
  const challenge: OtpChallenge = {
    email: normalizedEmail,
    digest: digestCode(normalizedEmail, code),
    expiresAt: Date.now() + EMAIL_OTP_TTL_SECONDS * 1000,
    attempts: 0,
  };

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
  if (challenge.attempts >= EMAIL_OTP_MAX_ATTEMPTS) {
    return { valid: false, reason: "attempts" };
  }

  const expectedDigest = digestCode(normalizeEmail(email), code);
  const actualBuffer = Buffer.from(challenge.digest);
  const expectedBuffer = Buffer.from(expectedDigest);
  const valid =
    challenge.email === normalizeEmail(email) &&
    actualBuffer.length === expectedBuffer.length &&
    timingSafeEqual(actualBuffer, expectedBuffer);

  if (valid) return { valid: true };

  const nextChallenge = {
    ...challenge,
    attempts: challenge.attempts + 1,
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
