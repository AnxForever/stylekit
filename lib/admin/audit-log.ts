import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { AdminActor } from "@/lib/auth/admin-api";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const DATA_DIR = path.join(process.cwd(), ".data");
const AUDIT_LOG_FILE = path.join(DATA_DIR, "admin-audit.json");
const MAX_STORED_EVENTS = 2000;
const MAX_QUERY_LIMIT = 100;
const DEFAULT_RETENTION_DAYS = 90;
const MIN_RETENTION_DAYS = 7;
const MAX_RETENTION_DAYS = 3650;

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

export interface AdminAuditQueryOptions {
  limit?: number;
  offset?: number;
  action?: string | null;
  days?: number | null;
  search?: string | null;
  nowMs?: number;
}

export interface AdminAuditQueryResult {
  events: AdminAuditEvent[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  nextOffset: number | null;
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

export async function getAdminAuditEvents(
  options: AdminAuditQueryOptions = {}
): Promise<AdminAuditQueryResult> {
  const events = await readAuditEventsFromFile();
  return queryAdminAuditEvents(events, options);
}

export function queryAdminAuditEvents(
  events: AdminAuditEvent[],
  options: AdminAuditQueryOptions = {}
): AdminAuditQueryResult {
  const limit = Math.min(Math.max(options.limit ?? 20, 1), MAX_QUERY_LIMIT);
  const offset = Math.max(options.offset ?? 0, 0);
  const action = normalizeActionFilter(options.action);
  const days = normalizeDaysFilter(options.days);
  const search = normalizeSearchFilter(options.search);
  const nowMs = options.nowMs ?? Date.now();

  const filteredByAction = action
    ? events.filter((event) => event.action === action)
    : events;

  const filtered = days
    ? filteredByAction.filter((event) => {
        const createdMs = new Date(event.createdAt).getTime();
        if (!Number.isFinite(createdMs)) return false;
        return createdMs >= nowMs - days * 24 * 60 * 60 * 1000;
      })
    : filteredByAction;

  const searched = search
    ? filtered.filter((event) => eventMatchesSearch(event, search))
    : filtered;

  const total = searched.length;
  const paged = searched.slice(offset, offset + limit);
  const hasMore = offset + paged.length < total;

  return {
    events: paged,
    total,
    limit,
    offset,
    hasMore,
    nextOffset: hasMore ? offset + paged.length : null,
  };
}

async function persistToFile(event: AdminAuditEvent): Promise<void> {
  const existing = await readAuditEventsFromFile();
  const cutoffMs = getRetentionCutoffMs();
  const prunedExisting = pruneEventsByRetention(existing, cutoffMs);
  const next = [event, ...prunedExisting].slice(0, MAX_STORED_EVENTS);

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

    return pruneEventsByRetention(parsed, getRetentionCutoffMs());
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

function normalizeActionFilter(action?: string | null): string | null {
  if (!action) return null;
  const value = action.trim();
  if (!value || value === "all") return null;
  return value;
}

function normalizeDaysFilter(days?: number | null): number | null {
  if (typeof days !== "number" || !Number.isFinite(days)) return null;
  if (days <= 0) return null;
  if (days > 365) return 365;
  return Math.floor(days);
}

function normalizeSearchFilter(search?: string | null): string | null {
  if (!search) return null;
  const value = search.trim().toLowerCase();
  if (!value) return null;
  if (value.length > 100) return value.slice(0, 100);
  return value;
}

function eventMatchesSearch(event: AdminAuditEvent, search: string): boolean {
  const baseFields = [
    event.id,
    event.action,
    event.targetType,
    event.targetId ?? "",
    event.actor.type,
    event.actor.id,
    event.ipAddress ?? "",
    event.userAgent ?? "",
  ];

  if (baseFields.some((field) => field.toLowerCase().includes(search))) {
    return true;
  }

  if (event.metadata && typeof event.metadata === "object") {
    for (const value of Object.values(event.metadata)) {
      if (value == null) continue;
      if (
        (typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean") &&
        String(value).toLowerCase().includes(search)
      ) {
        return true;
      }
    }
  }

  return false;
}

function getRetentionCutoffMs(nowMs: number = Date.now()): number {
  return nowMs - getRetentionDays() * 24 * 60 * 60 * 1000;
}

function getRetentionDays(): number {
  const raw = process.env.ADMIN_AUDIT_RETENTION_DAYS;
  if (!raw) return DEFAULT_RETENTION_DAYS;

  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed)) return DEFAULT_RETENTION_DAYS;
  if (parsed < MIN_RETENTION_DAYS) return MIN_RETENTION_DAYS;
  if (parsed > MAX_RETENTION_DAYS) return MAX_RETENTION_DAYS;
  return parsed;
}

function pruneEventsByRetention(
  events: AdminAuditEvent[],
  cutoffMs: number
): AdminAuditEvent[] {
  return events.filter((event) => {
    const createdAtMs = new Date(event.createdAt).getTime();
    if (!Number.isFinite(createdAtMs)) return false;
    return createdAtMs >= cutoffMs;
  });
}
