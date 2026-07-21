import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const sql = readFileSync(
  path.join(
    process.cwd(),
    "lib/supabase/migrations/019_admin_analytics_aggregates.sql"
  ),
  "utf8"
);

describe("admin analytics aggregation migration", () => {
  it("defines indexed aggregate RPCs instead of a raw-event dashboard contract", () => {
    expect(sql).toMatch(/create index if not exists idx_analytics_page_view_session_created_at/i);
    expect(sql).toMatch(/create or replace function public\.admin_analytics_overview/i);
    expect(sql).toMatch(/create or replace function public\.admin_analytics_breakdown/i);
    expect(sql).toMatch(/create or replace function public\.admin_analytics_registrations/i);
    expect(sql).toMatch(/create or replace function public\.admin_analytics_content/i);
    expect(sql).toMatch(/interval '30 minutes'/i);
    expect(sql).toMatch(/meaningful_event/i);
    expect(sql).toMatch(/deviceType'.*<> 'bot'/is);
    expect(sql).toMatch(/environment'.*= 'production'/is);
  });

  it("keeps aggregate RPCs restricted to the service role", () => {
    expect(sql).toMatch(
      /revoke all on function public\.admin_analytics_overview[\s\S]*from public, anon, authenticated/i
    );
    expect(sql).toMatch(
      /revoke all on function public\.admin_analytics_breakdown[\s\S]*from public, anon, authenticated/i
    );
    expect(sql).toMatch(
      /grant execute on function public\.admin_analytics_overview[\s\S]*to service_role/i
    );
    expect(sql).toMatch(
      /grant execute on function public\.admin_analytics_breakdown[\s\S]*to service_role/i
    );
    expect(sql).toMatch(
      /revoke all on function public\.admin_analytics_registrations[\s\S]*from public, anon, authenticated/i
    );
    expect(sql).toMatch(
      /grant execute on function public\.admin_analytics_registrations[\s\S]*to service_role/i
    );
    expect(sql).toMatch(
      /revoke all on function public\.admin_analytics_content[\s\S]*from public, anon, authenticated/i
    );
    expect(sql).toMatch(
      /grant execute on function public\.admin_analytics_content[\s\S]*to service_role/i
    );
  });

  it("returns explicit quality and comparison metadata", () => {
    expect(sql).toContain("'quality'");
    expect(sql).toContain("'previous'");
    expect(sql).toContain("'anonymousPageViews'");
    expect(sql).toContain("'countryCoveragePct'");
    expect(sql).toContain("'generatedAt'");
  });
});
