interface RateLimitBucket {
  count: number;
  resetAt: number;
}

export interface RateLimitOptions {
  namespace: string;
  key: string;
  limit: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSec: number;
}

const buckets = new Map<string, RateLimitBucket>();
const CLEANUP_EVERY_HITS = 200;
let hitCounter = 0;

export function checkRateLimit(options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  hitCounter += 1;
  if (hitCounter % CLEANUP_EVERY_HITS === 0) {
    cleanupExpiredBuckets(now);
  }

  const bucketKey = `${options.namespace}:${options.key}`;
  const existing = buckets.get(bucketKey);
  const bucket =
    !existing || existing.resetAt <= now
      ? { count: 0, resetAt: now + options.windowMs }
      : existing;

  bucket.count += 1;
  buckets.set(bucketKey, bucket);

  const remaining = Math.max(options.limit - bucket.count, 0);
  const retryAfterSec = Math.max(
    1,
    Math.ceil((bucket.resetAt - now) / 1000)
  );

  return {
    allowed: bucket.count <= options.limit,
    limit: options.limit,
    remaining,
    resetAt: bucket.resetAt,
    retryAfterSec,
  };
}

export function createRateLimitHeaders(
  result: RateLimitResult
): Record<string, string> {
  return {
    "x-ratelimit-limit": String(result.limit),
    "x-ratelimit-remaining": String(result.remaining),
    "x-ratelimit-reset": String(Math.ceil(result.resetAt / 1000)),
    "retry-after": String(result.retryAfterSec),
  };
}

/**
 * Identify the caller for rate-limiting.
 *
 * Only a proxy-appended value may be trusted. We read the *rightmost* entry of
 * the chosen header because nginx's `$proxy_add_x_forwarded_for` appends the
 * real peer to the end — the leftmost entries are client-supplied and forgeable,
 * so keying on them would let an attacker mint a fresh bucket per request.
 *
 * When `TRUSTED_CLIENT_IP_HEADER` is unset we fall back to `x-forwarded-for`,
 * which the default nginx deployment always appends. Returning a constant here
 * instead would collapse every visitor into ONE global bucket per namespace,
 * letting a single actor exhaust it and lock the whole site out of OTP login,
 * feedback, etc. Only when no forwarding header exists at all (e.g. a direct,
 * un-proxied hit) do we degrade to a shared "unknown" key.
 */
export function getRequestClientKey(request: Request): string {
  const configuredHeader = process.env.TRUSTED_CLIENT_IP_HEADER?.trim();
  const headerName = configuredHeader || "x-forwarded-for";

  const raw = request.headers.get(headerName);
  if (!raw) return "ip:unknown";

  const entries = raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  const ip = entries.at(-1) || "unknown";
  return `ip:${ip}`;
}

function cleanupExpiredBuckets(now: number): void {
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}
