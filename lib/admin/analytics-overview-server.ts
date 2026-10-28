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
import { describeAnalyticsOverview } from "./analytics-measurement";
import { hasUmamiSnapshotConfiguration, readUmamiSnapshotOverview } from "./analytics-umami-snapshot";
import {
  fetchUmamiPageviews,
  fetchUmamiStats,
  getUmamiConfig,
} from "@/lib/analytics/umami-api";

const TIMEZONE = "Asia/Shanghai";

/**
 * Direct Umami API data is an explicitly labelled fallback when the curated
 * snapshot is unavailable. It does not inherit the snapshot's report filters.
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
    const now = new Date();
    const [stats, pageviews] = await Promise.all([
      fetchUmamiStats(config, range, now),
      fetchUmamiPageviews(config, range, { compare: true, now }),
    ]);
    return mapUmamiOverview(stats, pageviews, getAnalyticsWindow(range, now), now);
  } catch {
    // Network failure, expired credentials, or a schema drift: fall through to
    // the snapshot/RPC path rather than showing an empty dashboard.
    return null;
  }
}

export async function getAnalyticsOverviewSnapshot(
  range: AnalyticsRange
): Promise<AnalyticsOverview | null> {
  const cacheKey = `overview:measurement-v1:${range}`;
  const cached = readAnalyticsCache<AnalyticsOverview>(cacheKey);
  if (cached) return describeAnalyticsOverview(cached, "legacy_snapshot", { cached: true });

  const snapshot = await readUmamiSnapshotOverview(range);
  if (snapshot) {
    writeAnalyticsCache(cacheKey, snapshot);
    await writePersistentAnalyticsSnapshot(cacheKey, snapshot);
    return snapshot;
  }

  const persisted = await readPersistentAnalyticsSnapshot<AnalyticsOverview>(cacheKey);
  // Preserve the curated population during its primary source outage. This is
  // explicitly labelled cached/stale rather than silently replacing it with
  // unfiltered API or tab-session totals.
  if (hasUmamiSnapshotConfiguration() && persisted?.measurement?.source === "umami_snapshot"
    && persisted.measurement.filtering === "applied") {
    const parsed = analyticsOverviewSchema.safeParse(persisted);
    if (parsed.success) {
      const value = describeAnalyticsOverview(parsed.data, "legacy_snapshot", { cached: true, fallback: true });
      writeAnalyticsCache(cacheKey, value);
      return value;
    }
  }

  const umami = await readUmamiOverview(range);
  if (umami) {
    const value = describeAnalyticsOverview(umami, "umami_api", { fallback: true });
    writeAnalyticsCache(cacheKey, value);
    await writePersistentAnalyticsSnapshot(cacheKey, value);
    return value;
  }

  const client = getSupabaseAdmin();
  if (client) {
    const window = getAnalyticsWindow(range);
    const { data, error } = await client.rpc("admin_analytics_overview", {
      p_start: window.start,
      p_end: window.end,
      p_timezone: TIMEZONE,
    });
    const parsed = analyticsOverviewSchema.safeParse(data);
    if (!error && parsed.success) {
      // Never accept metadata from a different collector on the RPC path.
      const value = describeAnalyticsOverview({ ...parsed.data, measurement: undefined }, "internal_events", { fallback: true });
      writeAnalyticsCache(cacheKey, value);
      await writePersistentAnalyticsSnapshot(cacheKey, value);
      return value;
    }
  }
  const parsed = analyticsOverviewSchema.safeParse(persisted);
  if (!parsed.success) return null;
  const value = describeAnalyticsOverview(parsed.data, "legacy_snapshot", { cached: true, fallback: true });
  writeAnalyticsCache(cacheKey, value);
  return value;
}
