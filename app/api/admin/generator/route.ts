import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import {
  getGeneratorApiEvents,
  type GeneratorApiEndpoint,
  type GeneratorApiEvent,
  type GeneratorApiOutcome,
} from "@/lib/generator/api-events";

const MAX_LIMIT = 200;
const MAX_WINDOW_MINUTES = 7 * 24 * 60;
const DEFAULT_TREND_DAYS = 7;
const MAX_TREND_DAYS = 90;
const MAX_EXPORT_ROWS = 1000;

type GeneratorTelemetryFormat = "json" | "csv";
type GeneratorFallbackReason =
  | "network-error"
  | "invalid-payload"
  | "unexpected-status"
  | "not-modified-without-cache";
type GeneratorTelemetryGroupBy = "none" | "fallback-reason";

interface DailyFallbackBreakdown {
  total: number;
  network: number;
  invalidPayload: number;
  unexpectedStatus: number;
  notModifiedWithoutCache: number;
}

interface DailyTelemetryPoint {
  date: string;
  total: number;
  success: number;
  error: number;
  avgDurationMs: number;
  p95DurationMs: number;
  fallback: DailyFallbackBreakdown;
}

interface EndpointMetrics {
  total: number;
  success: number;
  error: number;
  avgDurationMs: number;
  p95DurationMs: number;
}

interface GeneratorTelemetrySummary {
  totalRequests: number;
  successCount: number;
  errorCount: number;
  successRate: number;
  avgDurationMs: number;
  p95DurationMs: number;
  byEndpoint: Record<GeneratorApiEndpoint, EndpointMetrics>;
  topErrorCodes: Array<{ code: string; count: number }>;
  fallbackReports: {
    total: number;
    network: number;
    invalidPayload: number;
    unexpectedStatus: number;
    notModifiedWithoutCache: number;
  };
  daily: DailyTelemetryPoint[];
}

interface GeneratorTelemetryGroups {
  fallbackReason: Array<{
    reason: GeneratorFallbackReason;
    count: number;
  }>;
}

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const limit = normalizeLimit(searchParams.get("limit"));
  const offset = normalizeOffset(searchParams.get("offset"));
  const minutes = normalizeMinutes(searchParams.get("minutes"));
  const endpoint = normalizeEndpoint(searchParams.get("endpoint"));
  const outcome = normalizeOutcome(searchParams.get("outcome"));
  const code = normalizeCode(searchParams.get("code"));
  const fallbackReason = normalizeFallbackReason(searchParams.get("fallbackReason"));
  const groupBy = normalizeGroupBy(searchParams.get("groupBy"));
  const format = normalizeFormat(searchParams.get("format"));
  const trendDays = normalizeTrendDays(searchParams.get("trendDays"));

  const records = getGeneratorApiEvents(1000)
    .slice()
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  const now = Date.now();
  const filtered = records.filter((event) => {
    if (minutes && now - Date.parse(event.timestamp) > minutes * 60 * 1000) {
      return false;
    }
    if (endpoint && event.endpoint !== endpoint) {
      return false;
    }
    if (outcome && event.outcome !== outcome) {
      return false;
    }
    if (code && event.code !== code) {
      return false;
    }
    if (fallbackReason && !matchesFallbackReason(event.code, fallbackReason)) {
      return false;
    }
    return true;
  });

  const total = filtered.length;
  const pageEvents = filtered.slice(offset, offset + limit);
  const hasMore = offset + limit < total;
  const summary = summarizeEvents(filtered, trendDays, now);
  const groups = buildGroups(filtered, groupBy);

  if (format === "csv") {
    const exportEvents = filtered.slice(0, MAX_EXPORT_ROWS);
    const truncated = filtered.length > MAX_EXPORT_ROWS;
    const csv = toTelemetryCsv(exportEvents);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="generator-telemetry-${new Date().toISOString().slice(0, 10)}.csv"`,
        "x-export-limit": String(MAX_EXPORT_ROWS),
        "x-export-truncated": truncated ? "true" : "false",
      },
    });
  }

  return NextResponse.json({
    events: pageEvents,
    total,
    limit,
    offset,
    hasMore,
    nextOffset: hasMore ? offset + limit : null,
    groupBy,
    groups,
    summary,
  });
}

function summarizeEvents(
  events: GeneratorApiEvent[],
  trendDays: number,
  nowMs: number
): GeneratorTelemetrySummary {
  const totalRequests = events.length;
  const successCount = events.filter((event) => event.outcome === "success").length;
  const errorCount = totalRequests - successCount;
  const durations = events.map((event) => event.durationMs);
  const byEndpoint = {
    "generate-style": summarizeEndpoint(
      events.filter((event) => event.endpoint === "generate-style")
    ),
    "generate-design-system": summarizeEndpoint(
      events.filter((event) => event.endpoint === "generate-design-system")
    ),
  };

  return {
    totalRequests,
    successCount,
    errorCount,
    successRate: totalRequests === 0 ? 0 : round2((successCount / totalRequests) * 100),
    avgDurationMs: average(durations),
    p95DurationMs: percentile(durations, 95),
    byEndpoint,
    topErrorCodes: topErrorCodes(events),
    fallbackReports: summarizeFallbackReports(events),
    daily: buildDailyTrend(events, trendDays, nowMs),
  };
}

function summarizeEndpoint(events: GeneratorApiEvent[]): EndpointMetrics {
  const total = events.length;
  const success = events.filter((event) => event.outcome === "success").length;
  const error = total - success;
  const durations = events.map((event) => event.durationMs);
  return {
    total,
    success,
    error,
    avgDurationMs: average(durations),
    p95DurationMs: percentile(durations, 95),
  };
}

function topErrorCodes(events: GeneratorApiEvent[]) {
  const counter = new Map<string, number>();

  for (const event of events) {
    if (event.outcome !== "error" || !event.code) continue;
    counter.set(event.code, (counter.get(event.code) ?? 0) + 1);
  }

  return Array.from(counter.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([code, count]) => ({ code, count }));
}

function summarizeFallbackReports(events: GeneratorApiEvent[]) {
  const breakdown = emptyFallbackBreakdown();
  for (const event of events) {
    const reason = getFallbackReasonFromCode(event.code);
    if (!reason) continue;
    breakdown.total += 1;
    if (reason === "network-error") breakdown.network += 1;
    else if (reason === "invalid-payload") breakdown.invalidPayload += 1;
    else if (reason === "unexpected-status") breakdown.unexpectedStatus += 1;
    else breakdown.notModifiedWithoutCache += 1;
  }
  return breakdown;
}

function buildDailyTrend(
  events: GeneratorApiEvent[],
  trendDays: number,
  nowMs: number
): DailyTelemetryPoint[] {
  const bucket = new Map<string, GeneratorApiEvent[]>();
  for (const event of events) {
    const day = event.timestamp.slice(0, 10);
    const current = bucket.get(day);
    if (current) {
      current.push(event);
    } else {
      bucket.set(day, [event]);
    }
  }

  const end = new Date(nowMs);
  end.setUTCHours(0, 0, 0, 0);
  const points: DailyTelemetryPoint[] = [];

  for (let i = trendDays - 1; i >= 0; i -= 1) {
    const day = new Date(end);
    day.setUTCDate(end.getUTCDate() - i);
    const key = day.toISOString().slice(0, 10);
    const eventsForDay = bucket.get(key) ?? [];
    const success = eventsForDay.filter((event) => event.outcome === "success").length;
    const total = eventsForDay.length;
    const durations = eventsForDay.map((event) => event.durationMs);
    const fallback = summarizeFallbackReports(eventsForDay);

    points.push({
      date: key,
      total,
      success,
      error: total - success,
      avgDurationMs: average(durations),
      p95DurationMs: percentile(durations, 95),
      fallback,
    });
  }

  return points;
}

function emptyFallbackBreakdown(): DailyFallbackBreakdown {
  return {
    total: 0,
    network: 0,
    invalidPayload: 0,
    unexpectedStatus: 0,
    notModifiedWithoutCache: 0,
  };
}

function getFallbackReasonFromCode(code: string | undefined): GeneratorFallbackReason | null {
  if (!code) return null;
  if (code === "DISCOVERY_CLIENT_FALLBACK_NETWORK") return "network-error";
  if (code === "DISCOVERY_CLIENT_FALLBACK_INVALID_PAYLOAD") return "invalid-payload";
  if (code.startsWith("DISCOVERY_CLIENT_FALLBACK_UNEXPECTED_STATUS")) return "unexpected-status";
  if (code === "DISCOVERY_CLIENT_FALLBACK_NOT_MODIFIED_WITHOUT_CACHE") {
    return "not-modified-without-cache";
  }
  return null;
}

function toTelemetryCsv(events: GeneratorApiEvent[]): string {
  const header = [
    "timestamp",
    "endpoint",
    "outcome",
    "status",
    "code",
    "duration_ms",
    "client_hash",
  ];

  const lines = [header.join(",")];
  for (const event of events) {
    lines.push([
      escapeCsv(event.timestamp),
      escapeCsv(event.endpoint),
      escapeCsv(event.outcome),
      String(event.status),
      escapeCsv(event.code ?? ""),
      String(round2(event.durationMs)),
      escapeCsv(event.clientHash),
    ].join(","));
  }

  return lines.join("\n");
}

function escapeCsv(value: string): string {
  if (!value.includes(",") && !value.includes("\"") && !value.includes("\n")) {
    return value;
  }
  return `"${value.replaceAll("\"", "\"\"")}"`;
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  const sum = values.reduce((total, value) => total + value, 0);
  return round2(sum / values.length);
}

function percentile(values: number[], target: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((target / 100) * sorted.length) - 1;
  return round2(sorted[Math.max(0, Math.min(sorted.length - 1, index))]);
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function normalizeLimit(raw: string | null): number {
  const parsed = Number.parseInt(raw ?? "20", 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 20;
  }
  return Math.min(parsed, MAX_LIMIT);
}

function normalizeOffset(raw: string | null): number {
  const parsed = Number.parseInt(raw ?? "0", 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }
  return parsed;
}

function normalizeMinutes(raw: string | null): number | null {
  if (!raw) return null;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }
  return Math.min(parsed, MAX_WINDOW_MINUTES);
}

function normalizeCode(raw: string | null): string | null {
  const value = raw?.trim();
  if (!value) return null;
  return value;
}

function normalizeFallbackReason(raw: string | null): GeneratorFallbackReason | null {
  if (
    raw === "network-error" ||
    raw === "invalid-payload" ||
    raw === "unexpected-status" ||
    raw === "not-modified-without-cache"
  ) {
    return raw;
  }
  return null;
}

function normalizeGroupBy(raw: string | null): GeneratorTelemetryGroupBy {
  return raw === "fallback-reason" ? "fallback-reason" : "none";
}

function matchesFallbackReason(
  code: string | undefined,
  fallbackReason: GeneratorFallbackReason
): boolean {
  return getFallbackReasonFromCode(code) === fallbackReason;
}

function buildGroups(
  events: GeneratorApiEvent[],
  groupBy: GeneratorTelemetryGroupBy
): GeneratorTelemetryGroups | null {
  if (groupBy !== "fallback-reason") return null;

  const counter = new Map<GeneratorFallbackReason, number>([
    ["network-error", 0],
    ["invalid-payload", 0],
    ["unexpected-status", 0],
    ["not-modified-without-cache", 0],
  ]);

  for (const event of events) {
    const reason = getFallbackReasonFromCode(event.code);
    if (!reason) continue;
    counter.set(reason, (counter.get(reason) ?? 0) + 1);
  }

  return {
    fallbackReason: Array.from(counter.entries())
      .map(([reason, count]) => ({ reason, count }))
      .filter((entry) => entry.count > 0)
      .sort((a, b) => b.count - a.count),
  };
}

function normalizeFormat(raw: string | null): GeneratorTelemetryFormat {
  return raw === "csv" ? "csv" : "json";
}

function normalizeTrendDays(raw: string | null): number {
  const parsed = Number.parseInt(raw ?? String(DEFAULT_TREND_DAYS), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_TREND_DAYS;
  }
  return Math.min(parsed, MAX_TREND_DAYS);
}

function normalizeEndpoint(raw: string | null): GeneratorApiEndpoint | null {
  if (raw === "generate-style" || raw === "generate-design-system") {
    return raw;
  }
  return null;
}

function normalizeOutcome(raw: string | null): GeneratorApiOutcome | null {
  if (raw === "success" || raw === "error") {
    return raw;
  }
  return null;
}
