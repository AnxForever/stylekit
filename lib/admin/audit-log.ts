import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { AdminActor } from "@/lib/auth/admin-api";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const DATA_DIR = path.join(process.cwd(), ".data");
const AUDIT_LOG_FILE = path.join(DATA_DIR, "admin-audit.json");
const MAX_STORED_EVENTS = 2000;

export interface AdminAuditEvent {
  id: string;
  action: string;
  targetType: string;
  targetId?: string;
  actor: AdminActor;
  ipAddress: string | null;
  userAgent: string | null;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface RecordAdminAuditInput {
  action: string;
  targetType: string;
  targetId?: string;
  actor?: AdminActor;
  metadata?: Record<string, unknown>;
}

let writeQueue: Promise<void> = Promise.resolve();

export function recordAdminAuditEvent(
  request: Request,
  input: RecordAdminAuditInput
): Promise<void> {
  const event: AdminAuditEvent = {
    id: randomUUID(),
    action: input.action,
    targetType: input.targetType,
    targetId: input.targetId,
    actor: input.actor ?? { type: "dev-bypass", id: "unknown" },
    ipAddress: getClientIp(request),
    userAgent: request.headers.get("user-agent"),
    metadata: input.metadata,
    createdAt: new Date().toISOString(),
  };

  writeQueue = writeQueue
    .then(async () => {
      await persistToFile(event);
      await persistToSupabase(event);
    })
    .catch(() => {
      // Non-fatal: audit logging must not break the main request.
    });

  return writeQueue;
}

export async function getAdminAuditEvents(limit = 100): Promise<AdminAuditEvent[]> {
  const normalizedLimit = Math.min(Math.max(limit, 1), 500);
  const events = await readAuditEventsFromFile();
  return events.slice(0, normalizedLimit);
}

async function persistToFile(event: AdminAuditEvent): Promise<void> {
  const existing = await readAuditEventsFromFile();
  const next = [event, ...existing].slice(0, MAX_STORED_EVENTS);

  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }

  await writeFile(AUDIT_LOG_FILE, JSON.stringify(next, null, 2), "utf-8");
}

async function readAuditEventsFromFile(): Promise<AdminAuditEvent[]> {
  if (!existsSync(AUDIT_LOG_FILE)) {
    return [];
  }

  try {
    const raw = await readFile(AUDIT_LOG_FILE, "utf-8");
    const parsed = JSON.parse(raw) as AdminAuditEvent[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

async function persistToSupabase(event: AdminAuditEvent): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  const eventType = `admin_${event.action.replace(/[^a-z0-9]+/gi, "_").toLowerCase()}`;

  await supabase.from("analytics_events").insert({
    event_type: eventType,
    event_data: {
      action: event.action,
      targetType: event.targetType,
      targetId: event.targetId ?? null,
      actorType: event.actor.type,
      actorId: event.actor.id,
      metadata: event.metadata ?? null,
      source: "admin-audit",
    },
    style_slug: null,
    session_id: null,
    ip_address: event.ipAddress,
    user_agent: event.userAgent,
  });
}

function getClientIp(request: Request): string | null {
  return (
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    null
  );
}
