import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const sql = readFileSync(
  path.join(
    process.cwd(),
    "lib/supabase/migrations/033_analytics_retention_cron.sql",
  ),
  "utf8",
);

describe("analytics retention migration", () => {
  it("keeps cleanup private and bounded", () => {
    expect(sql).toMatch(/create schema if not exists private/i);
    expect(sql).toMatch(/create or replace function private\.cleanup_analytics_events/i);
    expect(sql).toMatch(/security invoker/i);
    expect(sql).toMatch(/limit p_batch_size/i);
    expect(sql).toMatch(/for update skip locked/i);
    expect(sql).toMatch(/p_batch_size > 50000/i);
    expect(sql).toMatch(/revoke all on function private\.cleanup_analytics_events/i);
  });

  it("schedules analytics and cron-history retention jobs", () => {
    expect(sql).toMatch(/'stylekit-analytics-retention'/i);
    expect(sql).toMatch(/'\*\/15 \* \* \* \*'/i);
    expect(sql).toMatch(/'stylekit-analytics-cron-history-retention'/i);
    expect(sql).toMatch(/end_time < now\(\) - interval '30 days'/i);
  });
});
