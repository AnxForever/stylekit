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
 * Identify the caller for rate-limiting purposes.
 *
 * Only headers a trusted reverse proxy appends may be used. `cf-connecting-ip`,
 * `x-real-ip` and the *leftmost* `x-forwarded-for` entry are all written by the
 * client, so keying on them lets an attacker mint a fresh bucket per request
 * and defeat the limit entirely. nginx's `$proxy_add_x_forwarded_for` appends
 * the real peer to the end of `x-forwarded-for`, so the rightmost entry is the
 * one the proxy vouches for.
 *
 * Set `TRUSTED_CLIENT_IP_HEADER` when fronted by a CDN that publishes the
 * client IP in its own header (e.g. `cf-connecting-ip` behind Cloudflare).
 * Without a proxy there is no trustworthy source, and callers share one bucket
 * rather than each getting an unlimited one.
 *
 * The User-Agent is deliberately excluded: it is client-controlled, so folding
 * it into the key multiplies every quota by the number of strings an attacker
 * cares to send.
 */
export function getRequestClientKey(request: Request): string {
  return `ip:${readTrustedClientIp(request) ?? "unknown"}`;
}

function readTrustedClientIp(request: Request): string | null {
  const configuredHeader = process.env.TRUSTED_CLIENT_IP_HEADER?.trim();
  if (configuredHeader) {
    return lastHeaderEntry(request, configuredHeader);
  }

  return lastHeaderEntry(request, "x-forwarded-for");
}

function lastHeaderEntry(request: Request, headerName: string): string | null {
  const raw = request.headers.get(headerName);
  if (!raw) return null;

  const entries = raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

  return entries.length > 0 ? entries[entries.length - 1] : null;
}

function cleanupExpiredBuckets(now: number): void {
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}
