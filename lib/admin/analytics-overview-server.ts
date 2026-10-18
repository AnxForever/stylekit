import "server-only";

import type { AnalyticsOverview, AnalyticsRange } from "./analytics-api-contract";
import {
  analyticsOverviewSchema,
  getAnalyticsWindow,
} from "./analytics-api-contract";
import { readAnalyticsCache, writeAnalyticsCache } from "./analytics-response-cache";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { readPersistentAnalyticsSnapshot, writePersistentAnalyticsSnapshot } from "./analytics-persistent-snapshot";
import { mapUmamiOverview } from "./analytics-umami-map";
import {
  fetchUmamiPageviews,
  fetchUmamiStats,
  getUmamiConfig,
} from "@/lib/analytics/umami-api";

const TIMEZONE = "Asia/Shanghai";

/**
 * Read the range overview from the self-hosted Umami instance — the source of
 * truth for traffic.
 *
 * The self-built `analytics_events` table undercounts badly because ad blockers
 * strip requests to `/api/analytics`. Umami is the primary read path; the
 * self-built RPCs remain only as a degraded fallback so missing credentials or
 * an Umami outage still renders something labelled.
 *
 * Returns null when credentials are absent or the request fails, which is the
 * signal for the caller to fall back.
 */
async function readUmamiOverview(
  range: AnalyticsRange
): Promise<AnalyticsOverview | null> {
  const config = getUmamiConfig();
  if (!config) return null;

  try {
    const [stats, pageviews] = await Promise.all([
      fetchUmamiStats(config, range),
      fetchUmamiPageviews(config, range, { compare: true }),
    ]);
    return mapUmamiOverview(stats, pageviews, getAnalyticsWindow(range));
  } catch {
    // Network failure, expired credentials, or a schema drift: fall through to
    // the snapshot/RPC path rather than showing an empty dashboard.
    return null;
  }
}

export async function getAnalyticsOverviewSnapshot(
  range: AnalyticsRange
): Promise<AnalyticsOverview | null> {
  const cacheKey = `overview:${range}`;
  const cached = readAnalyticsCache<AnalyticsOverview>(cacheKey);
  if (cached) return cached;

  // Umami Cloud first — real visitors.
  const umami = await readUmamiOverview(range);
  if (umami) {
    writeAnalyticsCache(cacheKey, umami);
    await writePersistentAnalyticsSnapshot(cacheKey, umami);
    return umami;
  }

  const persisted = await readPersistentAnalyticsSnapshot<AnalyticsOverview>(cacheKey);
  if (persisted) {
    writeAnalyticsCache(cacheKey, persisted);
    return persisted;
  }

  const client = getSupabaseAdmin();
  if (!client) return null;

  const window = getAnalyticsWindow(range);
  const { data, error } = await client.rpc("admin_analytics_overview", {
    p_start: window.start,
    p_end: window.end,
    p_timezone: TIMEZONE,
  });
  if (error) return null;

  const parsed = analyticsOverviewSchema.safeParse(data);
  if (!parsed.success) return null;
  writeAnalyticsCache(cacheKey, parsed.data);
  await writePersistentAnalyticsSnapshot(cacheKey, parsed.data);
  return parsed.data;
}
