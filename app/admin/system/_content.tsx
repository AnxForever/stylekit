"use client";

import { useCallback, useDeferredValue, useMemo, useState } from "react";
import {
  RefreshCw,
  CheckCircle,
  XCircle,
  Database,
  Server,
  Shield,
  Gauge,
  Download,
} from "lucide-react";
import Link from "next/link";
import {
  AdminButton,
  AdminCountPill,
  AdminErrorState,
  AdminInput,
  AdminLoadingState,
  AdminPagination,
  AdminPanel,
  AdminSelect,
  AdminTableShell,
  AdminToolbar,
} from "@/components/admin/admin-ui";
import {
  useAdminGeneratorTelemetry,
  useAdminSystem,
  type AdminGeneratorEndpoint,
  type AdminGeneratorFallbackReason,
  type AdminGeneratorOutcome,
} from "@/lib/swr";

const TELEMETRY_PAGE_SIZE = 8;

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const parts: string[] = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  parts.push(`${m}m`);
  return parts.join(" ");
}

function formatBytes(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function AdminSystemContent() {
  const [telemetryOffset, setTelemetryOffset] = useState(0);
  const [telemetryWindow, setTelemetryWindow] = useState<"60" | "1440" | "10080" | "all">("1440");
  const [telemetryEndpointFilter, setTelemetryEndpointFilter] = useState<"all" | AdminGeneratorEndpoint>("all");
  const [telemetryOutcomeFilter, setTelemetryOutcomeFilter] = useState<"all" | AdminGeneratorOutcome>("all");
  const [telemetryFallbackReasonFilter, setTelemetryFallbackReasonFilter] = useState<"all" | AdminGeneratorFallbackReason>("all");
  const [telemetryCodeFilter, setTelemetryCodeFilter] = useState("");
  const [telemetryExporting, setTelemetryExporting] = useState(false);
  const [telemetryExportNotice, setTelemetryExportNotice] = useState<string | null>(null);
  const [telemetryExportError, setTelemetryExportError] = useState<string | null>(null);
  const deferredTelemetryCodeFilter = useDeferredValue(telemetryCodeFilter);

  const telemetryQuery = useMemo(() => {
    const minutes = telemetryWindow === "all"
      ? undefined
      : Number.parseInt(telemetryWindow, 10);

    return {
      limit: TELEMETRY_PAGE_SIZE,
      offset: telemetryOffset,
      minutes,
      trendDays: 14,
      endpoint: telemetryEndpointFilter === "all" ? undefined : telemetryEndpointFilter,
      outcome: telemetryOutcomeFilter === "all" ? undefined : telemetryOutcomeFilter,
      fallbackReason:
        telemetryFallbackReasonFilter === "all"
          ? undefined
          : telemetryFallbackReasonFilter,
      code: deferredTelemetryCodeFilter.trim() || undefined,
      groupBy: "fallback-reason" as const,
    };
  }, [
    telemetryWindow,
    telemetryOffset,
    telemetryEndpointFilter,
    telemetryOutcomeFilter,
    telemetryFallbackReasonFilter,
    deferredTelemetryCodeFilter,
  ]);

  const { data, error, isLoading, mutate } = useAdminSystem();
  const {
    data: telemetry,
    error: telemetryError,
    isLoading: telemetryLoading,
    mutate: mutateTelemetry,
  } = useAdminGeneratorTelemetry(telemetryQuery);

  const telemetryExportHref = useMemo(() => {
    const params = new URLSearchParams();
    params.set("format", "csv");
    if (telemetryWindow !== "all") {
      params.set("minutes", telemetryWindow);
    }
    if (telemetryEndpointFilter !== "all") {
      params.set("endpoint", telemetryEndpointFilter);
    }
    if (telemetryOutcomeFilter !== "all") {
      params.set("outcome", telemetryOutcomeFilter);
    }
    if (telemetryFallbackReasonFilter !== "all") {
      params.set("fallbackReason", telemetryFallbackReasonFilter);
    }
    const trimmedCode = telemetryCodeFilter.trim();
    if (trimmedCode) {
      params.set("code", trimmedCode);
    }
    return `/api/admin/generator?${params.toString()}`;
  }, [
    telemetryWindow,
    telemetryEndpointFilter,
    telemetryOutcomeFilter,
    telemetryFallbackReasonFilter,
    telemetryCodeFilter,
  ]);

  const uptimeDisplay = useMemo(() => {
    if (!data) return "";
    return formatUptime(data.runtime.uptime);
  }, [data]);

  const rssDisplay = useMemo(() => {
    if (!data) return "";
    return formatBytes(data.runtime.memoryUsage.rss);
  }, [data]);

  const maxTelemetryDailyCount = useMemo(() => {
    if (!telemetry || telemetry.summary.daily.length === 0) return 0;
    return Math.max(...telemetry.summary.daily.map((point) => point.total));
  }, [telemetry]);
  const maxFallbackDailyCount = useMemo(() => {
    if (!telemetry || telemetry.summary.daily.length === 0) return 0;
    return Math.max(...telemetry.summary.daily.map((point) => point.fallback.total));
  }, [telemetry]);
  const maxFallbackGroupCount = useMemo(() => {
    if (!telemetry?.groups?.fallbackReason || telemetry.groups.fallbackReason.length === 0) {
      return 0;
    }
    return Math.max(...telemetry.groups.fallbackReason.map((item) => item.count));
  }, [telemetry?.groups]);

  const telemetryCurrentPage = useMemo(() => {
    const limit = telemetry?.limit ?? TELEMETRY_PAGE_SIZE;
    const offset = telemetry?.offset ?? telemetryOffset;
    return Math.floor(offset / limit) + 1;
  }, [telemetry?.limit, telemetry?.offset, telemetryOffset]);

  const telemetryTotalPages = useMemo(() => {
    if (!telemetry) return 1;
    return Math.max(1, Math.ceil(telemetry.total / telemetry.limit));
  }, [telemetry]);

  const telemetryWindowLabel = useMemo(() => {
    if (telemetryWindow === "60") return "1h";
    if (telemetryWindow === "10080") return "7d";
    if (telemetryWindow === "all") return "All";
    return "24h";
  }, [telemetryWindow]);

  const handleExportTelemetryCsv = useCallback(async () => {
    setTelemetryExporting(true);
    setTelemetryExportNotice(null);
    setTelemetryExportError(null);

    try {
      const response = await fetch(telemetryExportHref, { method: "GET" });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error ?? "Failed to export telemetry CSV.");
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const fileName = getDownloadFilename(
        response.headers.get("content-disposition"),
        "generator-telemetry.csv"
      );

      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(downloadUrl);

      if (response.headers.get("x-export-truncated") === "true") {
        const limit = response.headers.get("x-export-limit");
        setTelemetryExportNotice(
          limit
            ? `Export reached ${limit} rows. Refine filters for a complete export.`
            : "Export was truncated by server limit. Refine filters for a complete export."
        );
      }
    } catch (exportErr) {
      setTelemetryExportError(
        exportErr instanceof Error
          ? exportErr.message
          : "Failed to export telemetry CSV."
      );
    } finally {
      setTelemetryExporting(false);
    }
  }, [telemetryExportHref]);

  if (isLoading) {
    return <AdminLoadingState label="Loading system information..." />;
  }

  if (error) {
    return (
      <AdminErrorState message={error.message} onRetry={() => mutate()} />
    );
  }

  if (!data) return null;

  const envCards = [
    {
      label: "Node Env",
      value: data.environment.nodeEnv,
      configured: true,
    },
    {
      label: "Supabase",
      value: data.environment.supabaseConfigured ? "Configured" : "Not configured",
      configured: data.environment.supabaseConfigured,
    },
    {
      label: "Admin Token",
      value: data.environment.adminTokenConfigured ? "Configured" : "Not configured",
      configured: data.environment.adminTokenConfigured,
    },
    {
      label: "Admin Users",
      value: data.environment.adminUserIdsConfigured ? "Configured" : "Not configured",
      configured: data.environment.adminUserIdsConfigured,
    },
  ];

  return (
    <div className="space-y-6">
      <AdminToolbar
        title="System controls"
        description="Refresh environment status, database state, runtime metrics, and generator telemetry."
        meta={<AdminCountPill>{data.environment.nodeEnv}</AdminCountPill>}
        actions={
          <AdminButton
            onClick={() => {
              mutate();
              mutateTelemetry();
            }}
            aria-label="Refresh data"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </AdminButton>
        }
      />

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Shield className="w-5 h-5 text-muted" />
          Environment
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {envCards.map((card) => (
            <AdminPanel key={card.label} className="flex items-start gap-3 p-5">
              {card.configured ? (
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
              )}
              <div>
                <p className="text-sm text-muted">{card.label}</p>
                <p className="text-base font-medium mt-1">{card.value}</p>
              </div>
            </AdminPanel>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Database className="w-5 h-5 text-muted" />
            Database
          </h2>
        </div>
        {!data.database.connected ? (
          <AdminPanel className="p-6">
            <p className="text-muted text-sm">
              Not connected. Supabase is not configured.
            </p>
          </AdminPanel>
        ) : (
          <AdminTableShell>
              <thead>
                <tr className="border-b border-border bg-muted/10">
                  <th className="text-left px-4 py-3 font-medium text-muted">
                    Table Name
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-muted">
                    Row Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.database.tables.map((table) => (
                  <tr
                    key={table.name}
                    className="border-b border-border/60 last:border-b-0"
                  >
                    <td className="px-4 py-3 font-mono text-sm">
                      {table.name}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {table.rowCount >= 0
                        ? table.rowCount.toLocaleString()
                        : "Error"}
                    </td>
                  </tr>
                ))}
              </tbody>
          </AdminTableShell>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Server className="w-5 h-5 text-muted" />
          Runtime
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <AdminPanel className="p-5">
            <p className="text-sm text-muted">Node Version</p>
            <p className="text-xl font-bold mt-1">{data.runtime.nodeVersion}</p>
          </AdminPanel>
          <AdminPanel className="p-5">
            <p className="text-sm text-muted">Uptime</p>
            <p className="text-xl font-bold mt-1">{uptimeDisplay}</p>
          </AdminPanel>
          <AdminPanel className="p-5">
            <p className="text-sm text-muted">Memory (RSS)</p>
            <p className="text-xl font-bold mt-1">{rssDisplay}</p>
          </AdminPanel>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Gauge className="w-5 h-5 text-muted" />
            Generator API Telemetry ({telemetryWindowLabel})
          </h2>
          <AdminButton
            onClick={() => {
              void handleExportTelemetryCsv();
            }}
            disabled={telemetryExporting}
            size="sm"
          >
            <Download className="w-3.5 h-3.5" />
            {telemetryExporting ? "Exporting..." : "Export CSV"}
          </AdminButton>
        </div>

        {telemetryLoading && !telemetry ? (
          <AdminLoadingState label="Loading generator telemetry..." />
        ) : telemetryError ? (
          <AdminErrorState
            message={`Failed to load generator telemetry: ${telemetryError.message}`}
            onRetry={() => mutateTelemetry()}
          />
        ) : telemetry ? (
          <div className="space-y-4">
            {telemetryExportNotice && (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                {telemetryExportNotice}
              </p>
            )}
            {telemetryExportError && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {telemetryExportError}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              <label className="space-y-1">
                <span className="text-[11px] tracking-wide uppercase text-muted">
                  Window
                </span>
                <AdminSelect
                  value={telemetryWindow}
                  onChange={(event) => {
                    setTelemetryWindow(event.target.value as "60" | "1440" | "10080" | "all");
                    setTelemetryOffset(0);
                  }}
                  className="w-full text-xs"
                >
                  <option value="60">Last 1 hour</option>
                  <option value="1440">Last 24 hours</option>
                  <option value="10080">Last 7 days</option>
                  <option value="all">All time</option>
                </AdminSelect>
              </label>

              <label className="space-y-1">
                <span className="text-[11px] tracking-wide uppercase text-muted">
                  Endpoint
                </span>
                <AdminSelect
                  value={telemetryEndpointFilter}
                  onChange={(event) => {
                    setTelemetryEndpointFilter(
                      event.target.value as "all" | AdminGeneratorEndpoint
                    );
                    setTelemetryOffset(0);
                  }}
                  className="w-full text-xs"
                >
                  <option value="all">All endpoints</option>
                  <option value="generate-style">generate-style</option>
                  <option value="generate-design-system">generate-design-system</option>
                </AdminSelect>
              </label>

              <label className="space-y-1">
                <span className="text-[11px] tracking-wide uppercase text-muted">
                  Outcome
                </span>
                <AdminSelect
                  value={telemetryOutcomeFilter}
                  onChange={(event) => {
                    setTelemetryOutcomeFilter(
                      event.target.value as "all" | AdminGeneratorOutcome
                    );
                    setTelemetryOffset(0);
                  }}
                  className="w-full text-xs"
                >
                  <option value="all">All outcomes</option>
                  <option value="success">Success</option>
                  <option value="error">Error</option>
                </AdminSelect>
              </label>

              <label className="space-y-1">
                <span className="text-[11px] tracking-wide uppercase text-muted">
                  Fallback reason
                </span>
                <AdminSelect
                  value={telemetryFallbackReasonFilter}
                  onChange={(event) => {
                    setTelemetryFallbackReasonFilter(
                      event.target.value as "all" | AdminGeneratorFallbackReason
                    );
                    setTelemetryOffset(0);
                  }}
                  className="w-full text-xs"
                >
                  <option value="all">All reasons</option>
                  <option value="network-error">network-error</option>
                  <option value="invalid-payload">invalid-payload</option>
                  <option value="unexpected-status">unexpected-status</option>
                  <option value="not-modified-without-cache">not-modified-without-cache</option>
                </AdminSelect>
              </label>

              <label className="space-y-1">
                <span className="text-[11px] tracking-wide uppercase text-muted">
                  Error code
                </span>
                <AdminInput
                  value={telemetryCodeFilter}
                  onChange={(event) => {
                    setTelemetryCodeFilter(event.target.value);
                    setTelemetryOffset(0);
                  }}
                  placeholder="e.g. RATE_LIMITED"
                  className="w-full text-xs"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 border border-border rounded-lg">
                <p className="text-xs text-muted">Total Requests</p>
                <p className="text-xl font-bold mt-1 tabular-nums">
                  {telemetry.summary.totalRequests.toLocaleString()}
                </p>
              </div>
              <div className="p-5 border border-border rounded-lg">
                <p className="text-xs text-muted">Success Rate</p>
                <p className="text-xl font-bold mt-1 tabular-nums">
                  {telemetry.summary.successRate.toFixed(2)}%
                </p>
              </div>
              <div className="p-5 border border-border rounded-lg">
                <p className="text-xs text-muted">Avg Duration</p>
                <p className="text-xl font-bold mt-1 tabular-nums">
                  {telemetry.summary.avgDurationMs.toFixed(2)} ms
                </p>
              </div>
              <div className="p-5 border border-border rounded-lg">
                <p className="text-xs text-muted">P95 Duration</p>
                <p className="text-xl font-bold mt-1 tabular-nums">
                  {telemetry.summary.p95DurationMs.toFixed(2)} ms
                </p>
              </div>
            </div>

            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Client Fallback Reports</h3>
                <span className="text-xs text-muted tabular-nums">
                  Total {telemetry.summary.fallbackReports.total.toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[11px] text-muted uppercase tracking-wide">Network</p>
                  <p className="mt-1 text-lg font-semibold tabular-nums">
                    {telemetry.summary.fallbackReports.network.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[11px] text-muted uppercase tracking-wide">Invalid Payload</p>
                  <p className="mt-1 text-lg font-semibold tabular-nums">
                    {telemetry.summary.fallbackReports.invalidPayload.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[11px] text-muted uppercase tracking-wide">Unexpected Status</p>
                  <p className="mt-1 text-lg font-semibold tabular-nums">
                    {telemetry.summary.fallbackReports.unexpectedStatus.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[11px] text-muted uppercase tracking-wide">304 w/o Cache</p>
                  <p className="mt-1 text-lg font-semibold tabular-nums">
                    {telemetry.summary.fallbackReports.notModifiedWithoutCache.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Fallback Daily Trend (UTC)</h3>
                <span className="text-xs text-muted">
                  Last {telemetry.summary.daily.length} days
                </span>
              </div>
              <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px] text-muted">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                  network
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-rose-500/80" />
                  invalid
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-cyan-500/80" />
                  unexpected
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                  304 w/o cache
                </span>
              </div>
              {telemetry.summary.daily.length === 0 ? (
                <p className="text-xs text-muted">No fallback trend data available.</p>
              ) : (
                <div className="space-y-2">
                  {telemetry.summary.daily.map((point) => {
                    const totalFallbacks = point.fallback.total;
                    const width = maxFallbackDailyCount === 0
                      ? 0
                      : (totalFallbacks / maxFallbackDailyCount) * 100;
                    const networkWidth = totalFallbacks === 0
                      ? 0
                      : (point.fallback.network / totalFallbacks) * 100;
                    const invalidPayloadWidth = totalFallbacks === 0
                      ? 0
                      : (point.fallback.invalidPayload / totalFallbacks) * 100;
                    const unexpectedStatusWidth = totalFallbacks === 0
                      ? 0
                      : (point.fallback.unexpectedStatus / totalFallbacks) * 100;
                    const notModifiedWithoutCacheWidth = totalFallbacks === 0
                      ? 0
                      : (point.fallback.notModifiedWithoutCache / totalFallbacks) * 100;
                    return (
                      <div key={`fallback-${point.date}`} className="flex items-center gap-3">
                        <span className="w-24 text-xs text-muted font-mono">
                          {point.date}
                        </span>
                        <div className="flex-1 h-2 bg-muted/20 rounded-full overflow-hidden">
                          <div
                            className="h-full flex overflow-hidden rounded-full transition-all"
                            style={{ width: `${width}%` }}
                          >
                            <div
                              className="h-full bg-amber-500/80"
                              style={{ width: `${networkWidth}%` }}
                            />
                            <div
                              className="h-full bg-rose-500/80"
                              style={{ width: `${invalidPayloadWidth}%` }}
                            />
                            <div
                              className="h-full bg-cyan-500/80"
                              style={{ width: `${unexpectedStatusWidth}%` }}
                            />
                            <div
                              className="h-full bg-emerald-500/80"
                              style={{ width: `${notModifiedWithoutCacheWidth}%` }}
                            />
                          </div>
                        </div>
                        <span className="w-24 text-right text-xs tabular-nums">
                          {totalFallbacks} reports
                        </span>
                        <span className="w-56 text-right text-[11px] text-muted tabular-nums">
                          n:{point.fallback.network} i:{point.fallback.invalidPayload} u:{point.fallback.unexpectedStatus} 304:{point.fallback.notModifiedWithoutCache}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {telemetry.groups?.fallbackReason && telemetry.groups.fallbackReason.length > 0 && (
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Fallback Reason Ranking</h3>
                  <span className="text-xs text-muted">Grouped view</span>
                </div>
                <div className="space-y-2">
                  {telemetry.groups.fallbackReason.map((item) => {
                    const width = maxFallbackGroupCount === 0
                      ? 0
                      : (item.count / maxFallbackGroupCount) * 100;
                    return (
                      <div key={item.reason} className="flex items-center gap-3">
                        <span className="w-48 text-xs font-mono text-muted">
                          {item.reason}
                        </span>
                        <div className="flex-1 h-2 bg-muted/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan-500/70 rounded-full transition-all"
                            style={{ width: `${width}%` }}
                          />
                        </div>
                        <span className="w-16 text-right text-xs tabular-nums">
                          {item.count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Daily Trend (UTC)</h3>
                <span className="text-xs text-muted">
                  Last {telemetry.summary.daily.length} days
                </span>
              </div>
              {telemetry.summary.daily.length === 0 ? (
                <p className="text-xs text-muted">No trend data available.</p>
              ) : (
                <div className="space-y-2">
                  {telemetry.summary.daily.map((point) => {
                    const width = maxTelemetryDailyCount === 0
                      ? 0
                      : (point.total / maxTelemetryDailyCount) * 100;
                    return (
                      <div key={point.date} className="flex items-center gap-3">
                        <span className="w-24 text-xs text-muted font-mono">
                          {point.date}
                        </span>
                        <div className="flex-1 h-2 bg-muted/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-foreground/60 rounded-full transition-all"
                            style={{ width: `${width}%` }}
                          />
                        </div>
                        <span className="w-28 text-right text-xs tabular-nums">
                          {point.total} req
                        </span>
                        <span className="w-28 text-right text-xs text-muted tabular-nums">
                          {point.p95DurationMs.toFixed(2)} ms p95
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/10">
                      <th className="text-left px-4 py-3 font-medium text-muted">
                        Time
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-muted">
                        Endpoint
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-muted">
                        Outcome
                      </th>
                      <th className="text-right px-4 py-3 font-medium text-muted">
                        Duration
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-muted">
                        Code
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {telemetry.events.length === 0 ? (
                      <tr>
                        <td className="px-4 py-6 text-sm text-muted" colSpan={5}>
                          No generator requests in the selected window.
                        </td>
                      </tr>
                    ) : (
                      telemetry.events.map((event) => (
                        <tr
                          key={`${event.timestamp}-${event.endpoint}-${event.clientHash}`}
                          className="border-b border-border/60 last:border-b-0"
                        >
                          <td className="px-4 py-3 text-xs text-muted">
                            {new Date(event.timestamp).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 font-mono text-xs">
                            {event.endpoint}
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <span
                              className={event.outcome === "success"
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"}
                            >
                              {event.outcome}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums text-xs">
                            {event.durationMs.toFixed(2)} ms
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-muted">
                            {event.code ?? "-"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <AdminPagination
              page={telemetryCurrentPage}
              totalPages={telemetryTotalPages}
              hasPrev={(telemetry?.offset ?? 0) > 0}
              hasNext={Boolean(telemetry?.hasMore)}
              onPrev={() => {
                const previous = Math.max(
                  0,
                  (telemetry?.offset ?? 0) - (telemetry?.limit ?? TELEMETRY_PAGE_SIZE)
                );
                setTelemetryOffset(previous);
              }}
              onNext={() => {
                if (telemetry?.nextOffset != null) {
                  setTelemetryOffset(telemetry.nextOffset);
                }
              }}
            />
          </div>
        ) : null}
      </section>

      <section>
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-muted" />
          Audit Log
        </h2>
        <AdminPanel className="p-6">
          <p className="text-sm text-muted mb-1">File Event Count</p>
          <p className="text-2xl font-bold">
            {data.audit.fileEventCount.toLocaleString()}
          </p>
          <Link
            href="/admin/analytics"
            className="inline-block mt-3 text-sm text-muted hover:text-foreground underline underline-offset-2 transition-colors"
          >
            View analytics dashboard
          </Link>
        </AdminPanel>
      </section>
    </div>
  );
}

function getDownloadFilename(
  contentDisposition: string | null,
  fallback: string
): string {
  if (!contentDisposition) return fallback;
  const match = /filename\*?=(?:UTF-8''|"?)([^";]+)/i.exec(contentDisposition);
  if (!match?.[1]) return fallback;
  const cleaned = decodeURIComponent(match[1].replace(/^"|"$/g, "").trim());
  return cleaned || fallback;
}
