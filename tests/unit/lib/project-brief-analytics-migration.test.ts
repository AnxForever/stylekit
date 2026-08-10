import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const sql = readFileSync(
  path.join(
    process.cwd(),
    "lib/supabase/migrations/031_project_brief_analytics_signal.sql",
  ),
  "utf8",
);

describe("project brief analytics signal migration", () => {
  it("counts brief actions as implementation intent without promoting them to purchase evidence", () => {
    expect(sql).toMatch(/create or replace function public\.admin_analytics_capabilities\(\)/i);
    expect(sql).toMatch(/create or replace function public\.admin_analytics_content/i);
    for (const event of [
      "project_brief_generated",
      "project_brief_copy",
      "project_brief_download",
    ]) {
      expect(sql).toContain(`'${event}'`);
    }
    expect(sql).toMatch(/implementation_intent/i);
    expect(sql).toContain("'implementationIntentVersion', 2");
    expect(sql).not.toMatch(/pack_purchase_intent.*project_brief/i);
    expect(sql).not.toMatch(/pack_checkout_start.*project_brief/i);
  });

  it("keeps the aggregate private to service_role", () => {
    expect(sql).toMatch(
      /revoke all on function public\.admin_analytics_capabilities\(\)[\s\S]*from public, anon, authenticated/i,
    );
    expect(sql).toMatch(
      /grant execute on function public\.admin_analytics_capabilities\(\)[\s\S]*to service_role/i,
    );
    expect(sql).toMatch(
      /revoke all on function public\.admin_analytics_content[\s\S]*from public, anon, authenticated/i,
    );
    expect(sql).toMatch(
      /grant execute on function public\.admin_analytics_content[\s\S]*to service_role/i,
    );
    expect(sql).not.toMatch(/create table|grant .*anon|grant .*authenticated/i);
  });
});
