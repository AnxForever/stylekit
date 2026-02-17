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

export function getRequestClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const cfIp = request.headers.get("cf-connecting-ip")?.trim();
  const userAgent = request.headers.get("user-agent")?.trim() ?? "unknown";

  const ip = cfIp || realIp || forwarded || "unknown";
  return `${ip}:${userAgent.slice(0, 120)}`;
}

function cleanupExpiredBuckets(now: number): void {
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}
