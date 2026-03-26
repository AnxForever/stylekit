import { describe, expect, it } from "vitest";
import {
  buildAnalyticsDashboard,
  type DashboardContentSummary,
  type DashboardEventRow,
} from "@/lib/admin/analytics-dashboard";

const CONTENT_SUMMARY: DashboardContentSummary = {
  comments: 14,
  ratings: 9,
  favorites: 4,
  submissionsTotal: 6,
  submissionsPending: 2,
  submissionsApproved: 3,
  submissionsRejected: 1,
  adminActions: 5,
};

describe("buildAnalyticsDashboard", () => {
  it("aggregates usage metrics, categories, and trends while excluding admin events", () => {
    const now = new Date("2026-03-26T00:00:00.000Z");
    const rows: DashboardEventRow[] = [
      {
        style_slug: "neo-brutalist",
        event_type: "style_view",
        created_at: "2026-03-25T10:00:00.000Z",
        session_id: "sess-1",
      },
      {
        style_slug: "neo-brutalist",
        event_type: "style_export",
        created_at: "2026-03-24T10:00:00.000Z",
        session_id: "sess-1",
      },
      {
        style_slug: "editorial",
        event_type: "code_copy",
        created_at: "2026-03-23T10:00:00.000Z",
        session_id: "sess-2",
      },
      {
        style_slug: "editorial",
        event_type: "cta_click",
        created_at: "2026-03-21T10:00:00.000Z",
        session_id: "sess-3",
      },
      {
        style_slug: null,
        event_type: "admin_submission_approve",
        created_at: "2026-03-24T12:00:00.000Z",
        session_id: null,
      },
      {
        style_slug: "neo-brutalist",
        event_type: "style_view",
        created_at: "2026-03-18T10:00:00.000Z",
        session_id: "sess-4",
      },
      {
        style_slug: "neo-brutalist",
        event_type: "style_view",
        created_at: "2026-03-15T10:00:00.000Z",
        session_id: "sess-5",
      },
    ];

    const payload = buildAnalyticsDashboard(rows, "7d", CONTENT_SUMMARY, [], now);

    expect(payload.totalEvents).toBe(6);
    expect(payload.totalStyles).toBe(2);
    expect(payload.uniqueSessions).toBe(5);
    expect(payload.activityBreakdown).toEqual({
      views: 3,
      exports: 1,
      copies: 1,
      interactions: 3,
    });
    expect(payload.contentSummary).toEqual(CONTENT_SUMMARY);
    expect(payload.topStyles[0]).toEqual({
      slug: "neo-brutalist",
      count: 4,
      category: "expressive",
    });
    expect(payload.topCategories[0]).toEqual({
      category: "expressive",
      count: 4,
    });
    expect(payload.trend).toEqual({
      currentTotal: 4,
      previousTotal: 2,
      deltaPct: 100,
      windowLabel: "vs previous 7 days",
    });
    expect(payload.peakDay).toEqual({
      date: "2026-03-25",
      count: 1,
    });
    expect(payload.recentActivity).toHaveLength(7);
    expect(payload.contentTrends).toHaveLength(7);
    expect(payload.contentTrends.at(-1)).toEqual({
      date: "2026-03-25",
      comments: 0,
      ratings: 0,
      favorites: 0,
    });
  });

  it("returns safe defaults when there is no activity", () => {
    const payload = buildAnalyticsDashboard(
      [],
      "90d",
      CONTENT_SUMMARY,
      [],
      new Date("2026-03-26T00:00:00.000Z")
    );

    expect(payload.totalEvents).toBe(0);
    expect(payload.totalStyles).toBe(0);
    expect(payload.uniqueSessions).toBe(0);
    expect(payload.topStyles).toEqual([]);
    expect(payload.topCategories).toEqual([]);
    expect(payload.eventsByType).toEqual([]);
    expect(payload.avgEventsPerDay).toBe(0);
    expect(payload.peakDay.count).toBe(0);
    expect(payload.trend.windowLabel).toBe("vs previous 90 days");
    expect(payload.trend.deltaPct).toBeNull();
  });
});
