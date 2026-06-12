const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const ADMIN_SESSION_COOKIE_NAME = "stylekit-admin-session";
export const DEFAULT_ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

interface AdminSessionPayload {
  v: 1;
  iat: number;
  exp: number;
}

interface AdminSessionOptions {
  now?: Date;
  maxAgeSeconds?: number;
  secret?: string | null;
}

interface AdminPasswordOptions {
  password?: string | null;
  passwordSha256?: string | null;
}

export function getAdminSessionSecret(): string | null {
  return (
    readEnvString("ADMIN_SESSION_SECRET") ??
    readEnvString("ADMIN_API_TOKEN")
  );
}

export function getAdminPassword(): string | null {
  return readEnvString("ADMIN_PASSWORD");
}

export function getAdminSessionMaxAgeSeconds(): number {
  const raw = readEnvString("ADMIN_SESSION_MAX_AGE_SECONDS");
  if (!raw) {
    return DEFAULT_ADMIN_SESSION_MAX_AGE_SECONDS;
  }

  const parsed = Number.parseInt(raw, 10);
  if (!Number.isInteger(parsed) || parsed < 300) {
    return DEFAULT_ADMIN_SESSION_MAX_AGE_SECONDS;
  }

  return Math.min(parsed, 60 * 60 * 24 * 30);
}

export function isAdminPasswordConfigured(): boolean {
  return !!getAdminPassword() || !!readEnvString("ADMIN_PASSWORD_SHA256");
}

export async function verifyAdminPassword(
  candidate: string,
  options: AdminPasswordOptions = {}
): Promise<boolean> {
  const password =
    options.password === undefined ? getAdminPassword() : options.password;
  if (password) {
    return timingSafeEqualString(candidate, password);
  }

  const passwordSha256 =
    options.passwordSha256 === undefined
      ? readEnvString("ADMIN_PASSWORD_SHA256")
      : options.passwordSha256;
  if (!passwordSha256) {
    return false;
  }

  const candidateHash = await sha256Hex(candidate);
  return timingSafeEqualString(candidateHash, passwordSha256.toLowerCase());
}

export async function createAdminSessionCookieValue(
  options: AdminSessionOptions = {}
): Promise<string> {
  const secret = options.secret ?? getAdminSessionSecret();
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.");
  }

  const nowSeconds = toSeconds(options.now ?? new Date());
  const maxAgeSeconds =
    options.maxAgeSeconds ?? getAdminSessionMaxAgeSeconds();
  const payload: AdminSessionPayload = {
    v: 1,
    iat: nowSeconds,
    exp: nowSeconds + maxAgeSeconds,
  };
  const encodedPayload = base64UrlEncode(
    encoder.encode(JSON.stringify(payload))
  );
  const signature = await signPayload(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export async function verifyAdminSessionCookieValue(
  value: string | null | undefined,
  options: AdminSessionOptions = {}
): Promise<boolean> {
  if (!value) {
    return false;
  }

  const secret = options.secret ?? getAdminSessionSecret();
  if (!secret) {
    return false;
  }

  const parts = value.split(".");
  if (parts.length !== 2) {
    return false;
  }

  const [encodedPayload, signature] = parts;
  if (!encodedPayload || !signature) {
    return false;
  }

  const expectedSignature = await signPayload(encodedPayload, secret);
  if (!timingSafeEqualString(signature, expectedSignature)) {
    return false;
  }

  let payload: AdminSessionPayload | null = null;
  try {
    payload = JSON.parse(decoder.decode(base64UrlDecode(encodedPayload)));
  } catch {
    return false;
  }

  if (!payload || payload.v !== 1) {
    return false;
  }

  const nowSeconds = toSeconds(options.now ?? new Date());
  return Number.isInteger(payload.exp) && payload.exp > nowSeconds;
}

export function getAdminSessionCookieMaxAge(): number {
  return getAdminSessionMaxAgeSeconds();
}

function readEnvString(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

function toSeconds(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

async function signPayload(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );
  return base64UrlEncode(new Uint8Array(signature));
}

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualString(left: string, right: string): boolean {
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  const length = Math.max(leftBytes.length, rightBytes.length);
  let diff = leftBytes.length ^ rightBytes.length;

  for (let index = 0; index < length; index++) {
    diff |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }

  return diff === 0;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(value: string): Uint8Array {
  const padded = value
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index++) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}
