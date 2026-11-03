interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export interface AnalyticsRpcResult {
  data: unknown;
  error: { code?: string | null; message?: string | null } | null;
}

const CACHE_TTL_MS = 60_000;
const cache = new Map<string, CacheEntry<unknown>>();
const inFlightRequests = new Map<string, Promise<unknown>>();

export function readAnalyticsCache<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (entry.expiresAt <= Date.now()) {
    cache.delete(key);
    return null;
  }
  return entry.value as T;
}

export function writeAnalyticsCache<T>(key: string, value: T): void {
  cache.set(key, {
    value,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

/**
 * Share one underlying analytics read across SSR and API handlers in the same
 * server process. Rejected and null results are removed immediately so later
 * requests can retry; only validated results belong in the response cache.
 */
export function coalesceAnalyticsRequest<T>(
  key: string,
  load: () => Promise<T>,
): Promise<T> {
  const current = inFlightRequests.get(key);
  if (current) return current as Promise<T>;

  const request = Promise.resolve().then(load);
  inFlightRequests.set(key, request);

  const removeRequest = () => {
    if (inFlightRequests.get(key) === request) {
      inFlightRequests.delete(key);
    }
  };
  void request.then(removeRequest, removeRequest);
  return request;
}
