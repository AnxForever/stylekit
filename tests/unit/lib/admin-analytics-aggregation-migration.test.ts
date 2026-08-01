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

const floodIsolationSql = readFileSync(
  path.join(
    process.cwd(),
    "lib/supabase/migrations/022_admin_analytics_overview_flood_isolation.sql"
  ),
  "utf8"
);

describe("admin analytics flood isolation migration (022)", () => {
  it("restricts the overview working set to visit-relevant event types", () => {
    expect(floodIsolationSql).toMatch(
      /create or replace function public\.admin_analytics_overview/i
    );
    expect(floodIsolationSql).toMatch(
      /and event_type in \(\s*'page_view',\s*'code_copy',\s*'shadcn_command_copy',\s*'style_export',\s*'pack_purchase_intent',\s*'pack_checkout_start',\s*'pack_purchase',\s*'pack_install_success'\s*\)/i
    );
  });

  it("bakes the environment and bot filters into the index predicate", () => {
    expect(floodIsolationSql).toMatch(
      /create index idx_analytics_visit_scan[\s\S]*where event_type in[\s\S]*coalesce\(event_data->>'environment', 'production'\) = 'production'[\s\S]*coalesce\(event_data->>'deviceType', 'unknown'\) <> 'bot'/i
    );
    expect(floodIsolationSql).toMatch(/create index idx_analytics_country_coverage/i);
  });

  it("preserves the overview response contract and service-role grants", () => {
    for (const key of [
      "'pageViews'",
      "'visitors'",
      "'visits'",
      "'engagedVisits'",
      "'bouncedVisits'",
      "'bounceRate'",
      "'viewsPerVisit'",
      "'series'",
      "'quality'",
      "'anonymousPageViews'",
      "'countryCoveragePct'",
      "'generatedAt'",
    ]) {
      expect(floodIsolationSql).toContain(key);
    }
    expect(floodIsolationSql).toMatch(
      /revoke all on function public\.admin_analytics_overview[\s\S]*from public, anon, authenticated/i
    );
    expect(floodIsolationSql).toMatch(
      /grant execute on function public\.admin_analytics_overview[\s\S]*to service_role/i
    );
  });
});

const scanIndexesSql = readFileSync(
  path.join(
    process.cwd(),
    "lib/supabase/migrations/023_admin_analytics_scan_indexes.sql"
  ),
  "utf8"
);

describe("admin analytics scan indexes migration (023)", () => {
  it("gives the custom-events and content RPCs predicate-baked indexes", () => {
    expect(scanIndexesSql).toMatch(
      /create index if not exists idx_analytics_custom_events_scan[\s\S]*where event_type <> 'page_view'[\s\S]*not like 'admin_%'[\s\S]*= 'production'[\s\S]*<> 'bot'/i
    );
    expect(scanIndexesSql).toMatch(
      /create index if not exists idx_analytics_content_scan[\s\S]*where event_type not like 'admin_%'[\s\S]*= 'production'[\s\S]*<> 'bot'/i
    );
    expect(scanIndexesSql).toMatch(
      /drop index if exists idx_analytics_custom_events_created_type_session/i
    );
  });
});

const dimensionColumnsSql = readFileSync(
  path.join(
    process.cwd(),
    "lib/supabase/migrations/024_admin_analytics_dimension_columns.sql"
  ),
  "utf8"
);

describe("admin analytics dimension columns migration (024)", () => {
  const dimensions = [
    ["dim_path", "path"],
    ["dim_referrer_domain", "referrerDomain"],
    ["dim_country", "country"],
    ["dim_browser", "browser"],
    ["dim_os", "os"],
    ["dim_device_type", "deviceType"],
    ["dim_hostname", "hostname"],
    ["dim_utm_source", "utm_source"],
    ["dim_utm_medium", "utm_medium"],
    ["dim_utm_campaign", "utm_campaign"],
  ] as const;

  it("materializes every breakdown dimension as a stored generated column", () => {
    for (const [column, key] of dimensions) {
      expect(dimensionColumnsSql).toMatch(
        new RegExp(
          `add column if not exists ${column} text\\s*generated always as \\(event_data->>'${key}'\\) stored`,
          "i"
        )
      );
    }
  });

  it("indexes every dimension column for index-only breakdown scans", () => {
    for (const [column] of dimensions) {
      expect(dimensionColumnsSql).toMatch(
        new RegExp(
          `create index if not exists idx_analytics_${column}\\s*on public\\.analytics_events \\(created_at, ${column}, session_id\\)`,
          "i"
        )
      );
    }
  });

  it("switches the breakdown function onto the generated columns", () => {
    expect(dimensionColumnsSql).toMatch(
      /create or replace function public\.admin_analytics_breakdown/i
    );
    expect(dimensionColumnsSql).toMatch(/coalesce\(dim_path, ''\/''\)/);
    expect(dimensionColumnsSql).toMatch(/coalesce\(dim_referrer_domain, ''Direct''\)/);
    expect(dimensionColumnsSql).toMatch(
      /coalesce\(nullif\(dim_utm_source, ''''\), ''Unattributed''\)/
    );
    expect(dimensionColumnsSql).not.toMatch(/event_data->>''path''/);
    expect(dimensionColumnsSql).toMatch(
      /grant execute on function public\.admin_analytics_breakdown[\s\S]*to service_role/i
    );
  });
});
