"use client";

import { useCallback, useDeferredValue, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Copy,
  Download,
  Eye,
  Globe2,
  Link2,
  MessageSquare,
  Minus,
  Monitor,
  MousePointerClick,
  MapPinned,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Star,
  Users,
} from "lucide-react";
import { useAdminAuditEvents, useAnalyticsDashboard } from "@/lib/swr";

type TimeRange = "24h" | "7d" | "30d" | "90d";
type AuditActionFilter = "all" | "submission.approve" | "submission.reject";
type AuditTimeFilter = "24h" | "7d" | "30d" | "all";

const AUDIT_PAGE_SIZE = 10;

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  const [auditActionFilter, setAuditActionFilter] = useState<AuditActionFilter>("all");
  const [auditTimeFilter, setAuditTimeFilter] = useState<AuditTimeFilter>("7d");
  const [auditOffset, setAuditOffset] = useState(0);
  const [auditSearch, setAuditSearch] = useState("");
  const [auditExporting, setAuditExporting] = useState(false);
  const [auditExportNotice, setAuditExportNotice] = useState<string | null>(null);
  const [auditExportError, setAuditExportError] = useState<string | null>(null);
  const deferredAuditSearch = useDeferredValue(auditSearch);
  const { data, error, isLoading, mutate } = useAnalyticsDashboard(timeRange);

  const auditDays = useMemo<number | "all">(() => {
    if (auditTimeFilter === "24h") return 1;
    if (auditTimeFilter === "7d") return 7;
    if (auditTimeFilter === "30d") return 30;
    return "all";
  }, [auditTimeFilter]);

  const auditQuery = useMemo(
    () => ({
      limit: AUDIT_PAGE_SIZE,
      offset: auditOffset,
      action: auditActionFilter,
      days: auditDays,
      search: deferredAuditSearch,
    }),
    [auditActionFilter, auditDays, auditOffset, deferredAuditSearch]
  );

  const {
    data: auditData,
    error: auditError,
    isLoading: auditLoading,
    mutate: mutateAudit,
  } = useAdminAuditEvents(auditQuery);

  const maxDailyCount = useMemo(() => {
    if (!data || data.recentActivity.length === 0) return 0;
    return Math.max(...data.recentActivity.map((day) => day.count), 0);
  }, [data]);

  const topStyleMax = useMemo(() => {
    if (!data || data.topStyles.length === 0) return 0;
    return Math.max(...data.topStyles.map((style) => style.count), 0);
  }, [data]);

  const topCategoryMax = useMemo(() => {
    if (!data || data.topCategories.length === 0) return 0;
    return Math.max(...data.topCategories.map((category) => category.count), 0);
  }, [data]);

  const trafficMax = useMemo(() => {
    if (!data || data.trafficSeries.length === 0) return 0;
    return Math.max(...data.trafficSeries.map((point) => point.pageViews), 0);
  }, [data]);

  const topPageMax = useMemo(() => {
    if (!data || data.topPages.length === 0) return 0;
    return Math.max(...data.topPages.map((page) => page.count), 0);
  }, [data]);

  const topReferrerMax = useMemo(() => {
    if (!data || data.topReferrers.length === 0) return 0;
    return Math.max(...data.topReferrers.map((source) => source.count), 0);
  }, [data]);

  const platformMax = useMemo(() => {
    if (!data) return 0;
    return Math.max(
      ...[
        ...data.topBrowsers.map((item) => item.count),
        ...data.topDevices.map((item) => item.count),
        ...data.topOperatingSystems.map((item) => item.count),
      ],
      0
    );
  }, [data]);

  const contentTrendMax = useMemo(() => {
    if (!data || data.contentTrends.length === 0) return 0;
    return Math.max(
      ...data.contentTrends.flatMap((point) => [point.comments, point.ratings, point.favorites]),
      0
    );
  }, [data]);

  const contentTrendTotals = useMemo(() => {
    if (!data) {
      return { comments: 0, ratings: 0, favorites: 0 };
    }

    return data.contentTrends.reduce(
      (totals, point) => ({
        comments: totals.comments + point.comments,
        ratings: totals.ratings + point.ratings,
        favorites: totals.favorites + point.favorites,
      }),
      { comments: 0, ratings: 0, favorites: 0 }
    );
  }, [data]);

  const totalTypeEvents = useMemo(() => {
    if (!data) return 0;
    return data.eventsByType.reduce((sum, event) => sum + event.count, 0);
  }, [data]);

  const auditCurrentPage = useMemo(() => {
    const limit = auditData?.limit ?? AUDIT_PAGE_SIZE;
    const offset = auditData?.offset ?? auditOffset;
    return Math.floor(offset / limit) + 1;
  }, [auditData?.limit, auditData?.offset, auditOffset]);

  const auditTotalPages = useMemo(() => {
    if (!auditData) return 1;
    return Math.max(1, Math.ceil(auditData.total / auditData.limit));
  }, [auditData]);

  const auditSummary = useMemo(() => {
    const base = {
      approvals: 0,
      rejections: 0,
      uniqueActors: new Set<string>(),
    };

    for (const event of auditData?.events ?? []) {
      if (event.action === "submission.approve") base.approvals += 1;
      if (event.action === "submission.reject") base.rejections += 1;
      base.uniqueActors.add(`${event.actor.type}:${event.actor.id}`);
    }

    return {
      approvals: base.approvals,
      rejections: base.rejections,
      uniqueActors: base.uniqueActors.size,
    };
  }, [auditData?.events]);

  const auditExportHref = useMemo(() => {
    const params = new URLSearchParams();
    params.set("format", "csv");
    if (auditActionFilter !== "all") {
      params.set("action", auditActionFilter);
    }
    if (auditDays !== "all") {
      params.set("days", String(auditDays));
    }
    if (auditSearch.trim().length > 0) {
      params.set("search", auditSearch.trim());
    }
    return `/api/admin/audit?${params.toString()}`;
  }, [auditActionFilter, auditDays, auditSearch]);

  const handleExportAuditCsv = useCallback(async () => {
    setAuditExporting(true);
    setAuditExportError(null);
    setAuditExportNotice(null);

    try {
      const response = await fetch(auditExportHref, { method: "GET" });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error ?? "Failed to export CSV.");
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const fileName = getDownloadFilename(
        response.headers.get("content-disposition"),
        "admin-audit.csv"
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
        setAuditExportNotice(
          limit
            ? `Export reached ${limit} rows. Refine filters to download full history.`
            : "Export was truncated by server limit. Refine filters to download full history."
        );
      }
    } catch (exportErr) {
      setAuditExportError(
        exportErr instanceof Error ? exportErr.message : "Failed to export CSV."
      );
    } finally {
      setAuditExporting(false);
    }
  }, [auditExportHref]);

  if (isLoading) {
    return <p className="text-muted">Loading analytics...</p>;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-300 bg-red-50 p-6 dark:bg-red-900/10">
        <p className="text-red-600 dark:text-red-400">{error.message}</p>
        <button
          onClick={() => mutate()}
          className="mt-3 rounded-md bg-foreground px-4 py-2 text-sm text-background"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  const contentCards = [
    {
      icon: MessageSquare,
      label: "Comments",
      value: data.contentSummary.comments.toLocaleString(),
      tone: "text-sky-500",
    },
    {
      icon: Star,
      label: "Ratings",
      value: data.contentSummary.ratings.toLocaleString(),
      tone: "text-amber-500",
    },
    {
      icon: Bookmark,
      label: "Favorites",
      value: data.contentSummary.favorites.toLocaleString(),
      tone: "text-emerald-500",
    },
    {
      icon: ShieldCheck,
      label: "Admin Actions",
      value: data.contentSummary.adminActions.toLocaleString(),
      tone: "text-fuchsia-500",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-border bg-gradient-to-br from-background via-background to-muted/20 p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/10 px-3 py-1 text-xs text-muted">
              <Activity className="h-3.5 w-3.5" />
              Admin telemetry cockpit
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Usage, content health, and moderation pressure</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                This view combines visitor activity, content signals, and recent admin operations so you can spot drift before it becomes cleanup work.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(["24h", "7d", "30d", "90d"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  timeRange === range
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-muted hover:text-foreground"
                }`}
              >
                {range === "24h"
                  ? "24 Hours"
                  : range === "7d"
                    ? "7 Days"
                    : range === "30d"
                      ? "30 Days"
                      : "90 Days"}
              </button>
            ))}
            <button
              onClick={() => {
                void Promise.all([mutate(), mutateAudit()]);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
              aria-label="Refresh data"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={BarChart3}
            label="Page views"
            value={data.pageViews.toLocaleString()}
            detail={`${data.trafficSeries.at(-1)?.pageViews ?? 0} in the latest bucket`}
            accent="from-sky-500/10 to-transparent"
            badge={renderTrendBadge(data.trend.deltaPct)}
          />
          <MetricCard
            icon={Users}
            label="Visitors"
            value={data.visitors.toLocaleString()}
            detail={`${data.trafficSeries.at(-1)?.visitors ?? 0} in the latest bucket`}
            accent="from-emerald-500/10 to-transparent"
          />
          <MetricCard
            icon={MousePointerClick}
            label="Tracked events"
            value={data.totalEvents.toLocaleString()}
            detail={`${data.avgEventsPerDay.toLocaleString()} avg events / day`}
            accent="from-violet-500/10 to-transparent"
          />
          <MetricCard
            icon={ShieldCheck}
            label="Bounce rate"
            value={data.bounceRate == null ? "N/A" : `${data.bounceRate.toFixed(1)}%`}
            detail={`${data.uniqueSessions.toLocaleString()} active sessions`}
            accent="from-amber-500/10 to-transparent"
          />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
        <div className="rounded-3xl border border-border bg-background p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">Traffic overview</p>
              <p className="mt-1 text-sm text-muted">
                Page views and visitors for the selected window.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-muted/10 px-4 py-3 text-right">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Window delta</p>
              <div className="mt-1 flex items-center justify-end gap-2">
                {renderTrendIcon(data.trend.deltaPct)}
                <span className="text-lg font-semibold">{formatDelta(data.trend.deltaPct)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-muted/5 p-4">
            <LineChart
              points={data.trafficSeries.map((point) => point.pageViews)}
              secondaryPoints={data.trafficSeries.map((point) => point.visitors)}
              labels={data.trafficSeries.map((point) => point.label)}
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <MicroStat
              label="Peak bucket"
              value={trafficMax.toLocaleString()}
              detail="page views"
            />
            <MicroStat
              label="Visitors"
              value={data.visitors.toLocaleString()}
              detail="unique sessions"
            />
            <MicroStat
              label="Paths tracked"
              value={data.topPages.length.toLocaleString()}
              detail="top pages table"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-background p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Traffic sources</p>
              <p className="mt-1 text-sm text-muted">
                Referrers grouped by direct, search, social, and external traffic.
              </p>
            </div>
            <div className="rounded-full border border-border bg-muted/10 px-3 py-1 text-xs text-muted">
              {data.topReferrers.length} sources
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {data.topReferrers.length === 0 ? (
              <p className="text-sm text-muted">Traffic source data will appear after new page views are recorded.</p>
            ) : (
              data.topReferrers.map((source) => (
                <ReferrerRow
                  key={`${source.type}:${source.source}`}
                  source={source.source}
                  type={source.type}
                  count={source.count}
                  max={topReferrerMax}
                />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr_1fr]">
        <div className="rounded-3xl border border-border bg-background p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Top pages</p>
              <p className="mt-1 text-sm text-muted">
                Highest traffic paths in the selected time range.
              </p>
            </div>
            <div className="rounded-full border border-border bg-muted/10 px-3 py-1 text-xs text-muted">
              routes
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {data.topPages.length === 0 ? (
              <p className="text-sm text-muted">No page view data yet.</p>
            ) : (
              data.topPages.map((page, index) => (
                <div key={page.path} className="rounded-2xl border border-border bg-muted/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-[11px] text-muted">
                          {index + 1}
                        </span>
                        <span className="truncate text-sm font-medium">{page.path}</span>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">{page.count.toLocaleString()}</p>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted/20">
                    <div
                      className="h-full rounded-full bg-sky-500"
                      style={{ width: `${topPageMax > 0 ? (page.count / topPageMax) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-background p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Platforms</p>
              <p className="mt-1 text-sm text-muted">
                Browser, device type, and operating system.
              </p>
            </div>
            <div className="rounded-full border border-border bg-muted/10 px-3 py-1 text-xs text-muted">
              client mix
            </div>
          </div>

          <div className="mt-5 space-y-5">
            <PlatformList
              title="Browsers"
              icon={Monitor}
              items={data.topBrowsers}
              max={platformMax}
            />
            <PlatformList
              title="Devices"
              icon={Smartphone}
              items={data.topDevices}
              max={platformMax}
            />
            <PlatformList
              title="OS"
              icon={Globe2}
              items={data.topOperatingSystems}
              max={platformMax}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-background p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Geo and routes</p>
              <p className="mt-1 text-sm text-muted">
                Country data appears when upstream geo headers are available.
              </p>
            </div>
            <div className="rounded-full border border-border bg-muted/10 px-3 py-1 text-xs text-muted">
              beta
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-muted/5 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <MapPinned className="h-4 w-4 text-muted" />
              Countries
            </div>
            <div className="mt-3 space-y-3">
              {data.topCountries.length === 0 ? (
                <p className="text-sm text-muted">
                  No country header data yet. This will fill when the proxy sends geo headers.
                </p>
              ) : (
                data.topCountries.map((country) => (
                  <LeaderboardRow
                    key={country.name}
                    label={country.name}
                    value={country.count}
                    maxValue={data.topCountries[0]?.count ?? 0}
                  />
                ))
              )}
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-muted/5 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Link2 className="h-4 w-4 text-muted" />
              Route health
            </div>
            <div className="mt-3 space-y-2 text-sm text-muted">
              <p>{data.topPages.length.toLocaleString()} active routes in range</p>
              <p>{data.pageViews.toLocaleString()} page views collected</p>
              <p>{data.visitors.toLocaleString()} visitors identified</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border border-border bg-background p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">Activity trend</p>
              <p className="mt-1 text-sm text-muted">
                {data.trend.windowLabel}. Peak day: {formatPeakDay(data.peakDay)}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-muted/10 px-4 py-3 text-right">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Window delta</p>
              <div className="mt-1 flex items-center justify-end gap-2">
                {renderTrendIcon(data.trend.deltaPct)}
                <span className="text-lg font-semibold">{formatDelta(data.trend.deltaPct)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex h-52 items-end gap-2">
            {data.recentActivity.map((day) => {
              const height = maxDailyCount > 0 ? (day.count / maxDailyCount) * 100 : 0;
              const isPeak = day.date === data.peakDay.date && day.count > 0;

              return (
                <div key={day.date} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-[10px] text-muted">{day.count > 0 ? day.count : ""}</span>
                  <div className="relative flex h-40 w-full items-end overflow-hidden rounded-2xl bg-muted/10">
                    <div
                      className={`w-full rounded-2xl transition-all ${
                        isPeak
                          ? "bg-gradient-to-t from-amber-400 via-amber-300 to-amber-200"
                          : "bg-gradient-to-t from-foreground/80 via-foreground/55 to-foreground/20"
                      }`}
                      style={{ height: `${Math.max(height, 5)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted">
                    {formatDayLabel(day.date)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <MicroStat
              label="Current window"
              value={data.trend.currentTotal.toLocaleString()}
              detail="events"
            />
            <MicroStat
              label="Previous window"
              value={data.trend.previousTotal.toLocaleString()}
              detail="events"
            />
            <MicroStat
              label="Avg/day"
              value={data.avgEventsPerDay.toLocaleString()}
              detail="rolling"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-background p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Interaction mix</p>
              <p className="mt-1 text-sm text-muted">
                How visitors move beyond raw browsing.
              </p>
            </div>
            <div className="rounded-full border border-border bg-muted/10 px-3 py-1 text-xs text-muted">
              {data.totalEvents.toLocaleString()} total
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <ShareRow
              label="Style views"
              value={data.activityBreakdown.views}
              total={data.totalEvents}
              icon={Eye}
              tone="bg-sky-500"
            />
            <ShareRow
              label="Exports"
              value={data.activityBreakdown.exports}
              total={data.totalEvents}
              icon={Download}
              tone="bg-violet-500"
            />
            <ShareRow
              label="Code copies"
              value={data.activityBreakdown.copies}
              total={data.totalEvents}
              icon={Copy}
              tone="bg-emerald-500"
            />
            <ShareRow
              label="Other interactions"
              value={data.activityBreakdown.interactions}
              total={data.totalEvents}
              icon={Activity}
              tone="bg-amber-500"
            />
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-muted/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Category pull</p>
            <div className="mt-3 space-y-3">
              {data.topCategories.length === 0 ? (
                <p className="text-sm text-muted">No category activity yet.</p>
              ) : (
                data.topCategories.slice(0, 4).map((category) => (
                  <LeaderboardRow
                    key={category.category}
                    label={formatCategoryLabel(category.category)}
                    value={category.count}
                    maxValue={topCategoryMax}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr_1fr]">
        <div className="rounded-3xl border border-border bg-background p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Content health</p>
              <p className="mt-1 text-sm text-muted">
                Signals that tell you whether usage is converting into community depth.
              </p>
            </div>
            <div className="rounded-full border border-border bg-muted/10 px-3 py-1 text-xs text-muted">
              moderation + engagement
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {contentCards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-border bg-muted/5 p-4">
                <card.icon className={`h-4 w-4 ${card.tone}`} />
                <p className="mt-3 text-xl font-semibold">{card.value}</p>
                <p className="mt-1 text-xs text-muted">{card.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-muted/5 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Submission flow</p>
              <p className="text-xs text-muted">
                {data.contentSummary.submissionsTotal.toLocaleString()} total
              </p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <PipelineCard
                label="Pending"
                value={data.contentSummary.submissionsPending}
                tone="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-300"
              />
              <PipelineCard
                label="Approved"
                value={data.contentSummary.submissionsApproved}
                tone="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
              />
              <PipelineCard
                label="Rejected"
                value={data.contentSummary.submissionsRejected}
                tone="border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-300"
              />
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-muted/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Engagement trends</p>
                <p className="mt-1 text-xs text-muted">
                  Comments, ratings, and favorites over the selected window.
                </p>
              </div>
              <div className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted">
                {timeRange}
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <TrendRow
                label="Comments"
                total={contentTrendTotals.comments}
                colorClass="bg-sky-500"
                points={data.contentTrends.map((point) => point.comments)}
                max={contentTrendMax}
              />
              <TrendRow
                label="Ratings"
                total={contentTrendTotals.ratings}
                colorClass="bg-amber-500"
                points={data.contentTrends.map((point) => point.ratings)}
                max={contentTrendMax}
              />
              <TrendRow
                label="Favorites"
                total={contentTrendTotals.favorites}
                colorClass="bg-emerald-500"
                points={data.contentTrends.map((point) => point.favorites)}
                max={contentTrendMax}
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-background p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Event surface</p>
              <p className="mt-1 text-sm text-muted">
                Which behaviors dominate the current range.
              </p>
            </div>
            <div className="rounded-full border border-border bg-muted/10 px-3 py-1 text-xs text-muted">
              {data.eventsByType.length} types
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {data.eventsByType.length === 0 ? (
              <p className="text-sm text-muted">No events recorded yet.</p>
            ) : (
              data.eventsByType.map((event) => (
                <div key={event.type} className="rounded-2xl border border-border bg-muted/5 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-foreground">
                      {formatEventType(event.type)}
                    </p>
                    <p className="text-sm font-semibold">{event.count.toLocaleString()}</p>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted/20">
                    <div
                      className="h-full rounded-full bg-foreground/70"
                      style={{
                        width: `${totalTypeEvents > 0 ? (event.count / totalTypeEvents) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-background p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Top styles</p>
              <p className="mt-1 text-sm text-muted">
                Most viewed or touched styles in the selected range.
              </p>
            </div>
            <div className="rounded-full border border-border bg-muted/10 px-3 py-1 text-xs text-muted">
              Top {Math.min(data.topStyles.length, 8)}
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {data.topStyles.length === 0 ? (
              <p className="text-sm text-muted">No style data yet.</p>
            ) : (
              data.topStyles.slice(0, 8).map((style, index) => (
                <div key={style.slug} className="rounded-2xl border border-border bg-muted/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-[11px] text-muted">
                          {index + 1}
                        </span>
                        <span className="truncate text-sm font-medium">{style.slug}</span>
                      </div>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-muted">
                        {formatCategoryLabel(style.category ?? "uncategorized")}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">{style.count.toLocaleString()}</p>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted/20">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-foreground to-foreground/35"
                      style={{
                        width: `${topStyleMax > 0 ? (style.count / topStyleMax) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-background p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Recent Admin Actions</h2>
            <p className="mt-1 text-sm text-muted">
              Moderation trace with filters, actor visibility, and CSV export.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <SummaryPill label="Shown" value={`${auditData?.events.length ?? 0}/${auditData?.total ?? 0}`} />
            <SummaryPill label="Approvals" value={auditSummary.approvals.toString()} />
            <SummaryPill label="Rejections" value={auditSummary.rejections.toString()} />
            <SummaryPill label="Actors" value={auditSummary.uniqueActors.toString()} />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {(["all", "submission.approve", "submission.reject"] as const).map((action) => (
              <button
                key={action}
                onClick={() => {
                  setAuditActionFilter(action);
                  setAuditOffset(0);
                }}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  auditActionFilter === action
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                {formatAuditActionFilter(action)}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              {(["24h", "7d", "30d", "all"] as const).map((window) => (
                <button
                  key={window}
                  onClick={() => {
                    setAuditTimeFilter(window);
                    setAuditOffset(0);
                  }}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    auditTimeFilter === window
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted hover:text-foreground"
                  }`}
                >
                  {window === "24h"
                    ? "24h"
                    : window === "7d"
                      ? "7d"
                      : window === "30d"
                        ? "30d"
                        : "All"}
                </button>
              ))}
            </div>
            <input
              value={auditSearch}
              onChange={(event) => {
                setAuditSearch(event.target.value);
                setAuditOffset(0);
              }}
              placeholder="Search by slug, actor, ID..."
              className="h-9 w-56 rounded-full border border-border bg-background px-3 text-xs text-foreground placeholder:text-muted"
            />
            <button
              type="button"
              onClick={() => {
                void handleExportAuditCsv();
              }}
              disabled={auditExporting}
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs text-muted transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-3.5 w-3.5" />
              {auditExporting ? "Exporting..." : "Export CSV"}
            </button>
          </div>
        </div>

        {auditExportNotice && !auditExportError && (
          <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">{auditExportNotice}</p>
        )}

        {auditExportError && (
          <p className="mt-3 text-xs text-red-600 dark:text-red-400">{auditExportError}</p>
        )}

        {auditLoading && <p className="mt-4 text-sm text-muted">Loading audit logs...</p>}

        {!auditLoading && auditError && (
          <p className="mt-4 text-sm text-red-600 dark:text-red-400">{auditError.message}</p>
        )}

        {!auditLoading && !auditError && (auditData?.events.length ?? 0) === 0 && (
          <p className="mt-4 text-sm text-muted">No admin audit events yet.</p>
        )}

        {!auditLoading && !auditError && (auditData?.events.length ?? 0) > 0 && (
          <>
            <div className="mt-5 space-y-3">
              {(auditData?.events ?? []).map((event) => {
                const meta =
                  event.metadata && typeof event.metadata === "object"
                    ? (event.metadata as Record<string, unknown>)
                    : null;
                const slug = typeof meta?.slug === "string" ? meta.slug : null;
                const noteProvided =
                  typeof meta?.noteProvided === "boolean"
                    ? (meta.noteProvided ? "with note" : "without note")
                    : null;

                return (
                  <div
                    key={event.id}
                    className="rounded-2xl border border-border/70 bg-muted/5 px-4 py-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <ShieldCheck className="h-4 w-4 text-muted" />
                        {formatAuditAction(event.action)}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-muted">
                        <Clock3 className="h-3.5 w-3.5" />
                        {new Date(event.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
                      <span>Actor: {formatAuditActor(event.actor.type, event.actor.id)}</span>
                      <span>
                        Target: {event.targetType}
                        {event.targetId ? ` (${event.targetId})` : ""}
                      </span>
                      {slug && <span>Slug: {slug}</span>}
                      {noteProvided && <span>Review note: {noteProvided}</span>}
                      {event.ipAddress && <span>IP: {event.ipAddress}</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between text-xs text-muted">
              <span>
                Page {auditCurrentPage} / {auditTotalPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const prev = Math.max(
                      0,
                      (auditData?.offset ?? 0) - (auditData?.limit ?? AUDIT_PAGE_SIZE)
                    );
                    setAuditOffset(prev);
                  }}
                  disabled={(auditData?.offset ?? 0) === 0}
                  className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Prev
                </button>
                <button
                  onClick={() => {
                    if (auditData?.nextOffset != null) {
                      setAuditOffset(auditData.nextOffset);
                    }
                  }}
                  disabled={!auditData?.hasMore}
                  className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  accent,
  badge,
}: {
  icon: typeof BarChart3;
  label: string;
  value: string;
  detail: string;
  accent: string;
  badge?: ReactNode;
}) {
  return (
    <div className={`rounded-2xl border border-border bg-gradient-to-br ${accent} p-5`}>
      <div className="flex items-start justify-between gap-3">
        <div className="rounded-2xl border border-border bg-background/80 p-2.5">
          <Icon className="h-4 w-4 text-foreground" />
        </div>
        {badge}
      </div>
      <p className="mt-4 text-sm text-muted">{label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 text-xs text-muted">{detail}</p>
    </div>
  );
}

function MicroStat({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-muted/5 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">{label}</p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-muted">{detail}</p>
    </div>
  );
}

function ShareRow({
  label,
  value,
  total,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  total: number;
  icon: typeof Eye;
  tone: string;
}) {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Icon className="h-4 w-4 text-muted" />
          <span>{label}</span>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold">{value.toLocaleString()}</p>
          <p className="text-[11px] text-muted">{percentage.toFixed(1)}%</p>
        </div>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted/20">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

function LeaderboardRow({
  label,
  value,
  maxValue,
}: {
  label: string;
  value: number;
  maxValue: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm">
        <span>{label}</span>
        <span className="font-semibold">{value.toLocaleString()}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted/20">
        <div
          className="h-full rounded-full bg-foreground/65"
          style={{ width: `${maxValue > 0 ? (value / maxValue) * 100 : 0}%` }}
        />
      </div>
    </div>
  );
}

function PipelineCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className={`rounded-2xl border p-4 ${tone}`}>
      <p className="text-xs uppercase tracking-[0.18em]">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value.toLocaleString()}</p>
    </div>
  );
}

function TrendRow({
  label,
  total,
  colorClass,
  points,
  max,
}: {
  label: string;
  total: number;
  colorClass: string;
  points: number[];
  max: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-foreground">{label}</p>
        <p className="text-xs text-muted">{total.toLocaleString()} in window</p>
      </div>
      <div className="mt-2 flex h-12 items-end gap-1">
        {points.map((value, index) => {
          const height = max > 0 ? (value / max) * 100 : 0;
          return (
            <div key={`${label}-${index}`} className="flex h-full flex-1 items-end rounded-full bg-muted/15">
              <div
                className={`w-full rounded-full ${colorClass}`}
                style={{ height: `${Math.max(value > 0 ? height : 0, value > 0 ? 10 : 4)}%` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LineChart({
  points,
  secondaryPoints,
  labels,
}: {
  points: number[];
  secondaryPoints: number[];
  labels: string[];
}) {
  const width = 640;
  const height = 220;
  const padding = 18;
  const max = Math.max(...points, ...secondaryPoints, 1);

  const buildPath = (values: number[]) =>
    values
      .map((value, index) => {
        const x =
          values.length === 1
            ? width / 2
            : padding + (index * (width - padding * 2)) / (values.length - 1);
        const y = height - padding - ((value / max) * (height - padding * 2));
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");

  const primaryPath = buildPath(points);
  const secondaryPath = buildPath(secondaryPoints);

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-52 w-full overflow-visible">
        {[0, 1, 2, 3].map((line) => {
          const y = padding + (line * (height - padding * 2)) / 3;
          return (
            <line
              key={line}
              x1={padding}
              x2={width - padding}
              y1={y}
              y2={y}
              className="stroke-border/60"
              strokeWidth="1"
            />
          );
        })}
        <path d={secondaryPath} fill="none" className="stroke-emerald-500/60" strokeWidth="2.5" />
        <path d={primaryPath} fill="none" className="stroke-sky-500" strokeWidth="3" />
      </svg>
      <div className="mt-3 flex items-center justify-between gap-2 overflow-hidden text-[10px] text-muted">
        {labels.map((label, index) => (
          <span key={`${label}-${index}`} className="min-w-0 flex-1 truncate text-center">
            {label}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
          Page Views
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          Visitors
        </span>
      </div>
    </div>
  );
}

function ReferrerRow({
  source,
  type,
  count,
  max,
}: {
  source: string;
  type: "direct" | "search" | "social" | "external" | "internal";
  count: number;
  max: number;
}) {
  return (
    <div className="rounded-2xl border border-border bg-muted/5 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{source}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted">
            {formatReferrerType(type)}
          </p>
        </div>
        <p className="text-sm font-semibold">{count.toLocaleString()}</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted/20">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500"
          style={{ width: `${max > 0 ? (count / max) * 100 : 0}%` }}
        />
      </div>
    </div>
  );
}

function PlatformList({
  title,
  icon: Icon,
  items,
  max,
}: {
  title: string;
  icon: typeof Monitor;
  items: Array<{ name: string; count: number }>;
  max: number;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Icon className="h-4 w-4 text-muted" />
        {title}
      </div>
      <div className="mt-3 space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted">No data yet.</p>
        ) : (
          items.map((item) => (
            <LeaderboardRow
              key={`${title}-${item.name}`}
              label={item.name}
              value={item.count}
              maxValue={max}
            />
          ))
        )}
      </div>
    </div>
  );
}

function SummaryPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="rounded-full border border-border bg-muted/10 px-3 py-1">
      {label}: {value}
    </span>
  );
}

function renderTrendIcon(deltaPct: number | null) {
  if (deltaPct == null) return <Minus className="h-4 w-4 text-muted" />;
  if (deltaPct > 0) return <ArrowUpRight className="h-4 w-4 text-emerald-500" />;
  if (deltaPct < 0) return <ArrowDownRight className="h-4 w-4 text-rose-500" />;
  return <Minus className="h-4 w-4 text-muted" />;
}

function renderTrendBadge(deltaPct: number | null) {
  const className =
    deltaPct == null
      ? "border-border bg-muted/10 text-muted"
      : deltaPct > 0
        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
        : deltaPct < 0
          ? "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-300"
          : "border-border bg-muted/10 text-muted";

  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs ${className}`}>
      {formatDelta(deltaPct)}
    </span>
  );
}

function formatDelta(deltaPct: number | null): string {
  if (deltaPct == null) return "No baseline";
  if (deltaPct === 0) return "Flat";
  return `${deltaPct > 0 ? "+" : ""}${deltaPct.toFixed(1)}%`;
}

function formatDayLabel(date: string): string {
  return new Date(date).toLocaleDateString(undefined, {
    month: "numeric",
    day: "numeric",
  });
}

function formatPeakDay(peakDay: { date: string | null; count: number }): string {
  if (!peakDay.date) return "No activity yet";
  return `${formatDayLabel(peakDay.date)} (${peakDay.count.toLocaleString()})`;
}

function formatAuditAction(action: string): string {
  if (action === "submission.approve") return "Submission Approved";
  if (action === "submission.reject") return "Submission Rejected";
  return action;
}

function formatAuditActionFilter(action: AuditActionFilter): string {
  if (action === "submission.approve") return "Approve";
  if (action === "submission.reject") return "Reject";
  return "All Actions";
}

function formatAuditActor(type: string, id: string): string {
  if (type === "user") return `user:${id.slice(0, 8)}`;
  if (type === "token") return id;
  if (type === "dev-bypass") return "dev-bypass";
  return `${type}:${id}`;
}

function formatCategoryLabel(category: string): string {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatEventType(type: string): string {
  return type
    .replace(/^admin_/, "admin ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function formatReferrerType(type: "direct" | "search" | "social" | "external" | "internal") {
  if (type === "direct") return "Direct";
  if (type === "search") return "Search";
  if (type === "social") return "Social";
  if (type === "internal") return "Internal";
  return "External";
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
