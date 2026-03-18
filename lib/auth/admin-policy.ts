const ADMIN_USER_IDS_ENV = "ADMIN_USER_IDS";
const ADMIN_API_TOKEN_ENV = "ADMIN_API_TOKEN";

export function getAdminUserIds(): string[] {
  const raw = process.env[ADMIN_USER_IDS_ENV] ?? "";
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

export function isAdminAllowlistConfigured(): boolean {
  return getAdminUserIds().length > 0;
}

export function isAdminUserId(
  userId: string,
  nodeEnv: string = process.env.NODE_ENV ?? "development"
): boolean {
  const adminIds = getAdminUserIds();
  if (adminIds.length === 0) {
    return nodeEnv !== "production" && process.env.ADMIN_DEV_BYPASS === "true";
  }

  return adminIds.includes(userId);
}

export function getAdminApiToken(): string | null {
  const raw = process.env[ADMIN_API_TOKEN_ENV];
  if (!raw) return null;

  const token = raw.trim();
  return token.length > 0 ? token : null;
}
