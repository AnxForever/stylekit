import "server-only";

import { fetchUmamiActive, getUmamiConfig } from "@/lib/analytics/umami-api";
import {
  analyticsRealtimeSchema,
  type AnalyticsRealtime,
} from "./analytics-api-contract";

/**
 * The realtime number is a single cheap request, but the dashboard polls it
 * every 30s. A short process-local cache keeps several open admin tabs from
 * multiplying that request without making the number feel stale.
 */
const CACHE_TTL_MS = 15_000;

let cached: { value: AnalyticsRealtime; expiresAt: number } | null = null;

export async function getAnalyticsRealtime(): Promise<AnalyticsRealtime> {
  const now = Date.now();
  if (cached && cached.expiresAt > now) return cached.value;

  const config = getUmamiConfig();
  if (!config) {
    return { visitors: null, generatedAt: new Date(now).toISOString() };
  }

  try {
    const visitors = await fetchUmamiActive(config);
    const value = analyticsRealtimeSchema.parse({
      visitors,
      generatedAt: new Date().toISOString(),
    });
    cached = { value, expiresAt: now + CACHE_TTL_MS };
    return value;
  } catch {
    // Do not cache failures: a transient Umami outage should recover on the
    // next poll instead of pinning null for the rest of the process lifetime.
    return { visitors: null, generatedAt: new Date().toISOString() };
  }
}
