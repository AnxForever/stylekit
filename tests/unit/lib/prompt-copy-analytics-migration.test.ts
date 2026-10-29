import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const migration = readFileSync(
  path.join(process.cwd(), "lib/supabase/migrations/043_style_prompt_copy_analytics.sql"),
  "utf8",
);

describe("style prompt copy analytics migration", () => {
  it("aggregates only attributable prompt copies in a half-open production window", () => {
    const aggregate = migration.slice(
      migration.indexOf("create or replace function public.admin_analytics_prompt_copies"),
      migration.indexOf("create or replace function public.admin_analytics_content"),
    );
    expect(aggregate).toMatch(/event_type = 'prompt_copy'/i);
    expect(aggregate).toMatch(/created_at >= p_start[\s\S]*created_at < p_end/i);
    expect(aggregate).toMatch(/environment'.*= 'production'/i);
    expect(aggregate).toMatch(/deviceType'.*<> 'bot'/i);
    expect(aggregate).toMatch(/count\(distinct session_id\)/i);
    expect(aggregate).toMatch(/group by style_slug/i);
    expect(aggregate).toContain("'designSpec'");
    expect(aggregate).toContain("'creativeBrief'");
    expect(aggregate).toContain("'recipes'");
    expect(aggregate).toContain("'projectBrief'");
    expect(aggregate).not.toContain("'code_copy'");
    expect(migration).toContain("not backfilled");
  });

  it("counts prompt copies in content intent while avoiding duplicate brief intent", () => {
    expect(migration).toMatch(
      /from public\.analytics_events prompt_events[\s\S]*event_type = 'prompt_copy'[\s\S]*prompt_type' <> 'project-brief'/i,
    );
    expect(migration).toContain("select event_type, style_slug, created_at");
    expect(migration).toMatch(/'prompt_copy', 'shadcn_command_copy'/i);
    expect(migration).toContain("'project_brief_copy'");
  });

  it("includes prompt copies in engaged visits without broadening the scan to passive events", () => {
    const overview = migration.slice(migration.indexOf("create or replace function public.admin_analytics_overview"));
    expect(overview).toContain("'prompt_copy'");
    expect(overview).toMatch(/meaningful_event[\s\S]*event_type in \([\s\S]*'prompt_copy'/i);
    expect(migration).toMatch(/idx_analytics_prompt_copy_visit_scan[\s\S]*where event_type = 'prompt_copy'/i);
    expect(migration).not.toContain("'catalog_impression',\n        'prompt_copy'");
  });

  it("restricts prompt aggregation execution to service_role", () => {
    expect(migration).toMatch(
      /revoke all on function public\.admin_analytics_prompt_copies\(timestamptz, timestamptz\)[\s\S]*from public, anon, authenticated/i,
    );
    expect(migration).toMatch(
      /grant execute on function public\.admin_analytics_prompt_copies\(timestamptz, timestamptz\)[\s\S]*to service_role/i,
    );
  });
});
