import { z } from "zod";

export const analyticsRangeSchema = z.enum(["24h", "7d", "30d", "90d"]);
export type AnalyticsRange = z.infer<typeof analyticsRangeSchema>;

/** Version emitted by migration 031 when brief actions are in the intent aggregate. */
export const PROJECT_BRIEF_ANALYTICS_SIGNAL_VERSION = 2;

const nullableNumber = z.number().nullable();

export const analyticsOverviewSchema = z.object({
  range: z.object({
    start: z.string(),
    end: z.string(),
    timezone: z.string(),
  }),
  current: z.object({
    pageViews: z.number(),
    visitors: z.number(),
    visits: z.number(),
    engagedVisits: z.number(),
    bouncedVisits: z.number(),
    bounceRate: nullableNumber,
    viewsPerVisit: nullableNumber,
  }),
  previous: z.object({
    pageViews: z.number(),
    visitors: z.number(),
    visits: z.number(),
    bounceRate: nullableNumber,
    viewsPerVisit: nullableNumber,
  }),
  series: z.array(
    z.object({
      bucket: z.string(),
      pageViews: z.number(),
      visitors: z.number(),
      previousPageViews: z.number(),
    })
  ),
  quality: z.object({
    status: z.enum(["complete", "partial", "truncated", "stale", "unavailable"]),
    anonymousPageViews: z.number(),
    countryCoveragePct: nullableNumber,
    generatedAt: z.string(),
  }),
});

export type AnalyticsOverview = z.infer<typeof analyticsOverviewSchema>;

export const analyticsBreakdownDimensionSchema = z.enum([
  "path",
  "referrer",
  "country",
  "browser",
  "os",
  "device",
  "hostname",
  "utm_source",
  "utm_medium",
  "utm_campaign",
]);
export type AnalyticsBreakdownDimension = z.infer<
  typeof analyticsBreakdownDimensionSchema
>;

export const analyticsBreakdownSchema = z.array(
  z.object({
    value: z.string(),
    page_views: z.number(),
    visitors: z.number(),
    share: z.number(),
  })
);

export type AnalyticsBreakdown = z.infer<typeof analyticsBreakdownSchema>;

export const analyticsEventsSchema = z.array(z.object({
  event: z.string(),
  count: z.number(),
  visitors: z.number(),
  share: z.number(),
}));
export type AnalyticsEvents = z.infer<typeof analyticsEventsSchema>;

export const analyticsRegistrationsSchema = z.object({
  total: z.number(),
  inRange: z.number(),
  series: z.array(
    z.object({
      bucket: z.string(),
      registrations: z.number(),
    })
  ),
  attributionAvailable: z.boolean(),
  generatedAt: z.string(),
});

export type AnalyticsRegistrations = z.infer<
  typeof analyticsRegistrationsSchema
>;

export const analyticsContentSchema = z.object({
  implementationIntentVersion: z
    .literal(PROJECT_BRIEF_ANALYTICS_SIGNAL_VERSION)
    .optional(),
  summary: z.object({
    comments: z.number(),
    ratings: z.number(),
    favorites: z.number(),
    submissionsTotal: z.number(),
    submissionsPending: z.number(),
    submissionsApproved: z.number(),
    submissionsRejected: z.number(),
  }),
  behavior: z.object({
    exposure: z.number(),
    exploration: z.number(),
    implementation_intent: z.number(),
    commercial_intent: z.number(),
    verified_outcomes: z.number(),
  }),
  topStyles: z.array(
    z.object({
      slug: z.string(),
      total: z.number(),
      views: z.number(),
      copies: z.number(),
      exports: z.number(),
    })
  ),
  series: z.array(
    z.object({
      bucket: z.string(),
      comments: z.number(),
      ratings: z.number(),
      favorites: z.number(),
    })
  ),
  generatedAt: z.string(),
});

export type AnalyticsContent = z.infer<typeof analyticsContentSchema>;

export function getAnalyticsWindow(
  range: AnalyticsRange,
  now: Date = new Date()
): { start: string; end: string } {
  const durationMs =
    range === "24h"
      ? 24 * 60 * 60 * 1000
      : range === "7d"
        ? 7 * 24 * 60 * 60 * 1000
        : range === "30d"
          ? 30 * 24 * 60 * 60 * 1000
          : 90 * 24 * 60 * 60 * 1000;

  return {
    start: new Date(now.getTime() - durationMs).toISOString(),
    end: now.toISOString(),
  };
}

export function isMissingAnalyticsRpc(error: {
  code?: string | null;
  message?: string | null;
}): boolean {
  const message = error.message?.toLowerCase() ?? "";
  return (
    error.code === "PGRST202" ||
    error.code === "42883" ||
    message.includes("could not find the function") ||
    message.includes("does not exist")
  );
}
