import { describe, expect, it } from "vitest";
import {
  analyticsOverviewSchema,
  getAnalyticsWindow,
  isMissingAnalyticsRpc,
} from "@/lib/admin/analytics-api-contract";

describe("admin analytics API contract", () => {
  it("builds exact rolling windows", () => {
    const now = new Date("2026-07-12T06:00:00.000Z");
    expect(getAnalyticsWindow("24h", now)).toEqual({
      start: "2026-07-11T06:00:00.000Z",
      end: "2026-07-12T06:00:00.000Z",
    });
    expect(getAnalyticsWindow("7d", now)).toEqual({
      start: "2026-07-05T06:00:00.000Z",
      end: "2026-07-12T06:00:00.000Z",
    });
  });

  it("recognizes missing RPC errors without hiding other query failures", () => {
    expect(isMissingAnalyticsRpc({ code: "PGRST202" })).toBe(true);
    expect(isMissingAnalyticsRpc({ message: "function does not exist" })).toBe(true);
    expect(isMissingAnalyticsRpc({ code: "57014", message: "statement timeout" })).toBe(false);
  });

  it("rejects payloads that silently omit quality metadata", () => {
    const result = analyticsOverviewSchema.safeParse({
      range: {
        start: "2026-07-05T00:00:00.000Z",
        end: "2026-07-12T00:00:00.000Z",
        timezone: "Asia/Shanghai",
      },
      current: {
        pageViews: 1,
        visitors: 1,
        visits: 1,
        engagedVisits: 0,
        bouncedVisits: 1,
        bounceRate: 100,
        viewsPerVisit: 1,
      },
      previous: { pageViews: 0, visitors: 0, visits: 0 },
      series: [],
    });
    expect(result.success).toBe(false);
  });
});
