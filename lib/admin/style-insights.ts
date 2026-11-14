import { z } from "zod";

const count = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);
const timestamp = z.string().datetime({ offset: true });
const slug = z.string().trim().min(1).max(96).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const styleInsightSchema = z.object({
  slug,
  impressions: count,
  exposedVisitors: count,
  clicks: count,
  clickVisitors: count,
  detailViews: count,
  detailVisitors: count,
  showcaseViews: count,
  showcaseVisitors: count,
  viewVisitors: count,
  copies: count,
  copyVisitors: count,
  exports: count,
  exportVisitors: count,
  favoriteAdds: count.default(0),
  favoriteRemoves: count.default(0),
  favoriteVisitors: count.default(0),
  accountFavoriteAdds: count.default(0),
  localFavoriteAdds: count.default(0),
  activeMs: count,
  engagedVisitors: count,
  maxScrollPercent: z.number().int().min(0).max(100),
  matchedClickVisitors: count,
  matchedUseVisitors: count,
  unidentifiedEvents: count,
});

export const styleInsightSourceSchema = z.object({
  slug,
  surface: z.string().min(1).max(80),
  impressions: count,
  exposedVisitors: count,
  clicks: count,
  clickVisitors: count,
  averageRank: z.number().nonnegative().nullable(),
});

export const styleInsightsSchema = z.object({
  version: z.literal(2),
  source: z.literal("first_party"),
  retentionDays: z.literal(90).default(90),
  range: z.object({ start: timestamp, end: timestamp, timezone: z.literal("Asia/Shanghai") }),
  generatedAt: timestamp,
  /** Oldest retained v2 event, not a claim about collector installation time. */
  firstCollectedAt: timestamp.nullable(),
  traffic: z.object({
    pageViews: count,
    visitors: count,
    visits: count,
    unidentifiedPageViews: count,
  }),
  styles: z.array(styleInsightSchema),
  sources: z.array(styleInsightSourceSchema),
});

export type StyleInsight = z.infer<typeof styleInsightSchema>;
export type StyleInsightSource = z.infer<typeof styleInsightSourceSchema>;
export type StyleInsights = z.infer<typeof styleInsightsSchema>;
