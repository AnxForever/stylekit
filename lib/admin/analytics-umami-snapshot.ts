import "server-only";

import { z } from "zod";
import {
  analyticsBreakdownSchema,
  analyticsOverviewSchema,
  type AnalyticsBreakdown,
  type AnalyticsBreakdownDimension,
  type AnalyticsOverview,
  type AnalyticsRange,
} from "./analytics-api-contract";
import { describeAnalyticsOverview } from "./analytics-measurement";
import { countsAreVisitors } from "./analytics-breakdown";

const documentSchema = z.object({
  overview: z.record(z.string(), z.unknown()),
  breakdowns: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
});

type SnapshotDocument = z.infer<typeof documentSchema>;
const CACHE_TTL_MS = 60_000;
let cached: { url: string; expiresAt: number; value: SnapshotDocument } | null = null;
let pending: { url: string; promise: Promise<SnapshotDocument | null> } | null = null;

export function hasUmamiSnapshotConfiguration(): boolean {
  return Boolean(process.env.UMAMI_INSIGHTS_URL?.trim() || process.env.NEXT_PUBLIC_UMAMI_INSIGHTS_URL?.trim());
}

async function readDocument(): Promise<SnapshotDocument | null> {
  const url = process.env.UMAMI_INSIGHTS_URL?.trim() || process.env.NEXT_PUBLIC_UMAMI_INSIGHTS_URL?.trim();
  if (!url) return null;
  if (cached?.url === url && cached.expiresAt > Date.now()) return cached.value;
  if (pending?.url === url) return pending.promise;

  const promise = (async () => {
    try {
      const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(8_000) });
      if (!response.ok) return null;
      const parsed = documentSchema.safeParse(await response.json());
      if (!parsed.success) return null;
      cached = { url, expiresAt: Date.now() + CACHE_TTL_MS, value: parsed.data };
      return parsed.data;
    } catch {
      return null;
    }
  })();
  pending = { url, promise };
  try {
    return await promise;
  } finally {
    if (pending?.promise === promise) pending = null;
  }
}

export async function readUmamiSnapshotOverview(range: AnalyticsRange): Promise<AnalyticsOverview | null> {
  const document = await readDocument();
  const parsed = analyticsOverviewSchema.safeParse(document?.overview[range]);
  if (!parsed.success) return null;
  return describeAnalyticsOverview(parsed.data, "legacy_snapshot");
}

export async function readUmamiSnapshotBreakdown(
  range: AnalyticsRange,
  dimension: AnalyticsBreakdownDimension,
  limit: number,
): Promise<AnalyticsBreakdown | null> {
  const document = await readDocument();
  const overview = analyticsOverviewSchema.safeParse(document?.overview[range]);
  // An old snapshot has no filtered breakdowns. Do not silently mix it with
  // unfiltered RPC/API rankings while the overview claims a filtered source.
  if (!overview.success || overview.data.measurement?.filtering !== "applied") return null;
  const parsed = analyticsBreakdownSchema.safeParse(document?.breakdowns?.[range]?.[dimension]);
  if (!parsed.success) return null;
  const rows = parsed.data.slice(0, Math.max(1, Math.min(limit, 50)));
  const metric = countsAreVisitors(dimension) ? "visitors" : "page_views";
  const total = rows.reduce((sum, row) => sum + row[metric], 0);
  return rows.map((row) => ({ ...row, share: total > 0 ? row[metric] / total * 100 : 0 }));
}
