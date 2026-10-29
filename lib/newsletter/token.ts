import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed tokens for newsletter unsubscribe links.
 *
 * The subscribers table has no token column and adding one would mean a
 * migration the deploy cannot run on its own, so the email address rides
 * inside the link and is authenticated with an HMAC. Rotating the secret
 * invalidates outstanding links, which is why it falls back to secrets that
 * already exist in production.
 */

const TOKEN_VERSION = "v1";
const TOKEN_CONTEXT = "stylekit-newsletter-unsubscribe";
const MAX_EMAIL_LENGTH = 320;

export type NewsletterLocale = "en" | "zh";

export interface UnsubscribeTokenPayload {
  email: string;
  locale: NewsletterLocale;
}

export function getNewsletterSecret(): string | null {
  return (
    process.env.NEWSLETTER_SECRET ||
    process.env.ADMIN_SESSION_SECRET ||
    process.env.EMAIL_OTP_SECRET ||
    null
  );
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret)
    .update(`${TOKEN_CONTEXT}:${payload}`)
    .digest("base64url");
}

export function createUnsubscribeToken(
  email: string,
  locale: NewsletterLocale = "zh",
  secret: string | null = getNewsletterSecret(),
): string | null {
  if (!secret) return null;
  const normalized = email.trim().toLowerCase();
  if (!normalized || normalized.length > MAX_EMAIL_LENGTH) return null;
  const payload = Buffer.from(JSON.stringify({ e: normalized, l: locale }), "utf8").toString(
    "base64url",
  );
  return `${TOKEN_VERSION}.${payload}.${sign(payload, secret)}`;
}

export function readUnsubscribeToken(
  token: string | null,
  secret: string | null = getNewsletterSecret(),
): UnsubscribeTokenPayload | null {
  if (!token || !secret) return null;
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== TOKEN_VERSION) return null;
  const [, payload, signature] = parts;

  const expected = sign(payload, secret);
  const provided = Buffer.from(signature, "utf8");
  const reference = Buffer.from(expected, "utf8");
  if (provided.length !== reference.length || !timingSafeEqual(provided, reference)) {
    return null;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      e?: unknown;
      l?: unknown;
    };
    if (typeof decoded.e !== "string") return null;
    const email = decoded.e.trim().toLowerCase();
    if (!email || email.length > MAX_EMAIL_LENGTH || !email.includes("@")) return null;
    return { email, locale: decoded.l === "en" ? "en" : "zh" };
  } catch {
    return null;
  }
}

export function buildUnsubscribeUrl(email: string, locale: NewsletterLocale, baseUrl: string): string | null {
  const token = createUnsubscribeToken(email, locale);
  if (!token) return null;
  return `${baseUrl.replace(/\/$/, "")}/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`;
}
