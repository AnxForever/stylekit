import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), ".data");
const AUDIT_LOG_FILE = path.join(DATA_DIR, "admin-audit.json");

const TRACKED_TABLES = [
  "analytics_events",
  "style_comments",
  "style_ratings",
  "style_favorites",
  "style_submissions",
] as const;

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const [environment, database, runtime, audit] = await Promise.all([
    getEnvironmentInfo(),
    getDatabaseInfo(),
    getRuntimeInfo(),
    getAuditInfo(),
  ]);

  return NextResponse.json({ environment, database, runtime, audit });
}

function getEnvironmentInfo() {
  return {
    nodeEnv: process.env.NODE_ENV ?? "development",
    supabaseConfigured: !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ),
    adminTokenConfigured: !!process.env.ADMIN_API_TOKEN,
    adminUserIdsConfigured: !!process.env.ADMIN_USER_IDS,
  };
}

async function getDatabaseInfo() {
  const sb = getSupabaseAdmin();
  if (!sb) {
    return { connected: false, tables: [] };
  }

  const tableResults = await Promise.all(
    TRACKED_TABLES.map(async (tableName) => {
      const { count, error } = await sb
        .from(tableName)
        .select("*", { count: "exact", head: true });
      return {
        name: tableName,
        rowCount: error ? -1 : (count ?? 0),
      };
    })
  );

  return { connected: true, tables: tableResults };
}

function getRuntimeInfo() {
  return {
    nodeVersion: process.version,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
  };
}

async function getAuditInfo() {
  if (!existsSync(AUDIT_LOG_FILE)) {
    return { fileEventCount: 0 };
  }

  try {
    const raw = await readFile(AUDIT_LOG_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    const events = Array.isArray(parsed) ? parsed : [];
    return { fileEventCount: events.length };
  } catch {
    return { fileEventCount: 0 };
  }
}
