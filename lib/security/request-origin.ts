const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

interface OriginCheckResult {
  ok: boolean;
  status?: number;
  error?: string;
}

export function verifyTrustedOrigin(request: Request): OriginCheckResult {
  const method = request.method.toUpperCase();
  if (SAFE_METHODS.has(method)) {
    return { ok: true };
  }

  const originHeader = request.headers.get("origin");
  if (!originHeader) {
    return { ok: true };
  }

  const requestOrigin = normalizeOrigin(originHeader);
  if (!requestOrigin) {
    return { ok: false, status: 403, error: "Invalid request origin." };
  }

  const trustedOrigins = getTrustedOrigins(request);
  if (trustedOrigins.has(requestOrigin)) {
    return { ok: true };
  }

  return { ok: false, status: 403, error: "Cross-origin request denied." };
}

function getTrustedOrigins(request: Request): Set<string> {
  const trusted = new Set<string>();

  const configuredOrigins = parseTrustedOriginsEnv();
  for (const origin of configuredOrigins) {
    trusted.add(origin);
  }

  const baseUrlOrigin = normalizeOrigin(process.env.NEXT_PUBLIC_BASE_URL);
  if (baseUrlOrigin) {
    trusted.add(baseUrlOrigin);
  }

  const requestDerivedOrigin = deriveRequestOrigin(request);
  if (requestDerivedOrigin) {
    trusted.add(requestDerivedOrigin);
  }

  return trusted;
}

function parseTrustedOriginsEnv(): string[] {
  const raw = process.env.CSRF_TRUSTED_ORIGINS;
  if (!raw) return [];

  const origins: string[] = [];
  for (const value of raw.split(",")) {
    const normalized = normalizeOrigin(value);
    if (normalized) {
      origins.push(normalized);
    }
  }
  return origins;
}

function deriveRequestOrigin(request: Request): string | null {
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || request.headers.get("host")?.trim() || new URL(request.url).host;
  if (!host) return null;

  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProto || new URL(request.url).protocol.replace(":", "");
  const origin = `${protocol}://${host}`;
  return normalizeOrigin(origin);
}

function normalizeOrigin(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    return new URL(value).origin.toLowerCase();
  } catch {
    return null;
  }
}
