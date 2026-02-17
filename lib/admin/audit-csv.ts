import type { AdminAuditEvent } from "@/lib/admin/audit-log";

const DEFAULT_EXPORT_MAX_ROWS = 5000;
const MIN_EXPORT_MAX_ROWS = 100;
const MAX_EXPORT_MAX_ROWS = 20000;
const DANGEROUS_CSV_PREFIX = /^[=+\-@]/;

export function getAdminAuditExportMaxRows(): number {
  const raw = process.env.ADMIN_AUDIT_EXPORT_MAX_ROWS;
  if (!raw) return DEFAULT_EXPORT_MAX_ROWS;

  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed)) return DEFAULT_EXPORT_MAX_ROWS;
  if (parsed < MIN_EXPORT_MAX_ROWS) return MIN_EXPORT_MAX_ROWS;
  if (parsed > MAX_EXPORT_MAX_ROWS) return MAX_EXPORT_MAX_ROWS;
  return parsed;
}

export function toAdminAuditCsv(events: AdminAuditEvent[]): string {
  const headers = [
    "id",
    "createdAt",
    "action",
    "targetType",
    "targetId",
    "actorType",
    "actorId",
    "ipAddress",
    "userAgent",
    "metadata",
  ];

  const rows = events.map((event) => [
    event.id,
    event.createdAt,
    event.action,
    event.targetType,
    event.targetId ?? "",
    event.actor.type,
    event.actor.id,
    event.ipAddress ?? "",
    event.userAgent ?? "",
    event.metadata ? JSON.stringify(event.metadata) : "",
  ]);

  return [headers, ...rows]
    .map((row) => row.map((cell) => escapeCsvCell(String(cell))).join(","))
    .join("\n");
}

export function escapeCsvCell(value: string): string {
  const normalized = value.replace(/\r?\n/g, " ").trim();
  if (!normalized) return "";

  const safeValue = DANGEROUS_CSV_PREFIX.test(normalized)
    ? `'${normalized}`
    : normalized;

  if (/[",]/.test(safeValue)) {
    return `"${safeValue.replace(/"/g, "\"\"")}"`;
  }

  return safeValue;
}
