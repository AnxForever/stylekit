import "server-only";

import type {
  AnalyticsBreakdown,
  AnalyticsBreakdownDimension,
  AnalyticsContent,
  AnalyticsEvents,
  AnalyticsRange,
  AnalyticsRegistrations,
} from "./analytics-api-contract";
import {
  analyticsBreakdownSchema,
  analyticsContentSchema,
  analyticsEventsSchema,
  analyticsRegistrationsSchema,
  getAnalyticsWindow,
} from "./analytics-api-contract";
import { readAnalyticsCache, writeAnalyticsCache } from "./analytics-response-cache";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { readPersistentAnalyticsSnapshot, writePersistentAnalyticsSnapshot } from "./analytics-persistent-snapshot";
import { isUmamiMetricDimension, mapUmamiBreakdown } from "./analytics-umami-map";
import { fetchUmamiMetrics, getUmamiConfig } from "@/lib/analytics/umami-api";

const TIMEZONE = "Asia/Shanghai";

async function rpcSnapshot<T>(
  cacheKey: string,
  rpc: string,
  params: Record<string, unknown>,
  parse: (value: unknown) => T | null,
  readPrimary?: () => Promise<T | null>
): Promise<T | null> {
  const cached = readAnalyticsCache<T>(cacheKey);
  if (cached) return cached;

  // Primary source (Umami Cloud) runs before the snapshot fallback: a persisted
  // snapshot must not shadow fresher numbers while Cloud is reachable.
  if (readPrimary) {
    const primary = await readPrimary();
    if (primary) {
      writeAnalyticsCache(cacheKey, primary);
      await writePersistentAnalyticsSnapshot(cacheKey, primary);
      return primary;
    }
  }

  const persisted = await readPersistentAnalyticsSnapshot<T>(cacheKey);
  if (persisted) {
    writeAnalyticsCache(cacheKey, persisted);
    return persisted;
  }
  const client = getSupabaseAdmin();
  if (!client) return null;
  const { data, error } = await client.rpc(rpc, params);
  if (error) return null;
  const parsed = parse(data);
  if (parsed) {
    writeAnalyticsCache(cacheKey, parsed);
    await writePersistentAnalyticsSnapshot(cacheKey, parsed);
  }
  return parsed;
}

export function getBreakdownSnapshot(
  range: AnalyticsRange,
  dimension: AnalyticsBreakdownDimension,
  limit: number
) {
  const window = getAnalyticsWindow(range);
  return rpcSnapshot<AnalyticsBreakdown>(
    `breakdown:${range}:${dimension}:${limit}`,
    "admin_analytics_breakdown",
    { p_start: window.start, p_end: window.end, p_dimension: dimension, p_limit: limit },
    (value) => {
      const result = analyticsBreakdownSchema.safeParse(value);
      return result.success ? result.data : null;
    },
    // Umami Cloud ranks the same dimensions the traffic view requests, so it
    // replaces the RPC for those; the RPC stays as the degraded fallback.
    async () => {
      const config = getUmamiConfig();
      if (!config || !isUmamiMetricDimension(dimension)) return null;
      try {
        const rows = await fetchUmamiMetrics(config, dimension, range, limit);
        return mapUmamiBreakdown(rows, dimension);
      } catch {
        return null;
      }
    }
  );
}

export function getContentSnapshot(range: AnalyticsRange) {
  const window = getAnalyticsWindow(range);
  return rpcSnapshot<AnalyticsContent>(
    `content:${range}`,
    "admin_analytics_content",
    { p_start: window.start, p_end: window.end, p_timezone: TIMEZONE },
    (value) => {
      const result = analyticsContentSchema.safeParse(value);
      return result.success ? result.data : null;
    }
  );
}

export function getRegistrationsSnapshot(range: AnalyticsRange) {
  const window = getAnalyticsWindow(range);
  return rpcSnapshot<AnalyticsRegistrations>(
    `registrations:${range}`,
    "admin_analytics_registrations",
    { p_start: window.start, p_end: window.end, p_timezone: TIMEZONE },
    (value) => {
      const result = analyticsRegistrationsSchema.safeParse(value);
      return result.success ? result.data : null;
    }
  );
}

export function getEventsSnapshot(range: AnalyticsRange) {
  const window = getAnalyticsWindow(range);
  return rpcSnapshot<AnalyticsEvents>(
    `events:${range}:20`,
    "admin_analytics_events",
    { p_start: window.start, p_end: window.end, p_limit: 20 },
    (value) => {
      const result = analyticsEventsSchema.safeParse(value);
      return result.success ? result.data : null;
    }
  );
}
