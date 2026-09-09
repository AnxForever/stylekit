import { existsSync } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import {
  buildAdminSystemPreflight,
  type SystemPreflightInput,
} from "@/lib/admin/system-preflight";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const REQUIRED_TABLES = [
  "site_announcements",
  "support_acknowledgments",
  "knowledge_resources",
  "knowledge_ingest_runs",
  "knowledge_reviews",
  "knowledge_publications",
  "knowledge_search_documents",
  "knowledge_audit_events",
  "product_validation_participants",
  "product_validation_events",
  "product_validation_interviews",
] as const;

// Keep every filesystem lookup under a statically known directory. Passing a
// path assembled from an arbitrary `process.cwd()`-relative string makes
// Turbopack conservatively trace the whole repository into the server output.
const OPS_FILES = [
  ["health-check", path.join(process.cwd(), "ops/stylekit-healthcheck.sh")],
  ["cleanup", path.join(process.cwd(), "ops/cleanup-stylekit-server.sh")],
  ["verify", path.join(process.cwd(), "ops/verify-stylekit-production.sh")],
  [
    "systemd-service",
    path.join(process.cwd(), "ops/systemd/stylekit-healthcheck.service"),
  ],
  [
    "systemd-timer",
    path.join(process.cwd(), "ops/systemd/stylekit-healthcheck.timer"),
  ],
] as const;

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 },
    );
  }

  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
  const [tables, analyticsSignalVersion] = await Promise.all([
    inspectTables(supabaseConfigured),
    inspectAnalyticsSignal(supabaseConfigured),
  ]);
  const input: SystemPreflightInput = {
    auth: {
      sessionSecretConfigured: Boolean(process.env.ADMIN_SESSION_SECRET),
      passwordConfigured: Boolean(
        process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD_SHA256,
      ),
      passwordPlaintextConfigured: Boolean(process.env.ADMIN_PASSWORD),
      passwordSha256Configured: Boolean(process.env.ADMIN_PASSWORD_SHA256),
      adminTokenConfigured: Boolean(process.env.ADMIN_API_TOKEN),
      adminUserIdsConfigured: Boolean(process.env.ADMIN_USER_IDS),
    },
    supabaseConfigured,
    analyticsSignalVersion,
    tables,
    localFiles: Object.fromEntries(
      OPS_FILES.map(([key, filePath]) => [
        key,
        // These are operator-managed files in the deployment checkout, not
        // runtime module dependencies. Do not make Turbopack copy the whole
        // repository just to preserve this diagnostic lookup.
        existsSync(/*turbopackIgnore: true*/ filePath),
      ]),
    ),
  };

  return NextResponse.json(buildAdminSystemPreflight(input));
}

async function inspectAnalyticsSignal(configured: boolean): Promise<number | null> {
  if (!configured) return null;

  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase.rpc("admin_analytics_capabilities");
  if (error || !data || typeof data !== "object") return null;

  const version = (data as { implementationIntentVersion?: unknown }).implementationIntentVersion;
  return typeof version === "number" && Number.isInteger(version) ? version : null;
}

async function inspectTables(configured: boolean): Promise<Record<string, boolean>> {
  if (!configured) {
    return Object.fromEntries(REQUIRED_TABLES.map((table) => [table, false]));
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return Object.fromEntries(REQUIRED_TABLES.map((table) => [table, false]));
  }

  const results = await Promise.all(
    REQUIRED_TABLES.map(async (table) => {
      const { error } = await supabase
        .from(table)
        .select("*", { count: "exact", head: true });
      return [table, !error] as const;
    }),
  );
  return Object.fromEntries(results);
}
