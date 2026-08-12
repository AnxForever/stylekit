import { createHmac, randomBytes, randomInt, timingSafeEqual } from "node:crypto";
import {
  consumeOtpChallengeState,
  createOtpChallengeState,
} from "@/lib/auth/email-otp-store";

export const EMAIL_OTP_COOKIE = "stylekit-email-otp";
export const EMAIL_OTP_TTL_SECONDS = 10 * 60;
export const EMAIL_OTP_MAX_ATTEMPTS = 5;

interface OtpChallenge {
  id: string;
  email: string;
  digest: string;
  expiresAt: number;
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
      typeof parsed.id !== "string" ||
      parsed.id.length === 0 ||
      typeof parsed.email !== "string" ||
      typeof parsed.digest !== "string" ||
      typeof parsed.expiresAt !== "number"
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

export async function createOtpChallenge(email: string): Promise<{
  code: string;
  cookieValue: string;
}> {
  const normalizedEmail = normalizeEmail(email);
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const challenge: OtpChallenge = {
    id: randomBytes(16).toString("hex"),
    email: normalizedEmail,
    digest: digestCode(normalizedEmail, code),
    expiresAt: Date.now() + EMAIL_OTP_TTL_SECONDS * 1000,
  };

  await createOtpChallengeState({
    id: challenge.id,
    email: challenge.email,
    digest: challenge.digest,
    expiresAt: challenge.expiresAt,
  });

  return { code, cookieValue: encodeChallenge(challenge) };
}

export async function verifyOtpChallenge(
  cookieValue: string | undefined,
  email: string,
  code: string,
): Promise<
  | { valid: true }
  | {
      valid: false;
      reason: "missing" | "expired" | "attempts" | "invalid";
    }
> {
  const challenge = decodeChallenge(cookieValue);
  if (!challenge) return { valid: false, reason: "missing" };
  if (challenge.expiresAt <= Date.now()) {
    return { valid: false, reason: "expired" };
  }
  const expectedDigest = digestCode(normalizeEmail(email), code);
  const result = await consumeOtpChallengeState({
    id: challenge.id,
    email: normalizeEmail(email),
    digest: expectedDigest,
    maxAttempts: EMAIL_OTP_MAX_ATTEMPTS,
  });

  if (result === "valid") return { valid: true };
  if (result === "attempts") return { valid: false, reason: "attempts" };
  if (result === "expired") return { valid: false, reason: "expired" };
  if (result === "missing") return { valid: false, reason: "missing" };

  return { valid: false, reason: "invalid" };
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
