"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Clock3,
  Download,
  FileText,
  Globe2,
  Heart,
  MessageSquare,
  Monitor,
  Minus,
  MousePointerClick,
  RefreshCw,
  Smartphone,
  Star,
  UserPlus,
  Users,
} from "lucide-react";
import {
  AdminButton,
  AdminErrorState,
  AdminField,
  AdminInput,
  AdminLoadingState,
  AdminPagination,
  AdminPanel,
  AdminSegmentedControl,
} from "@/components/admin/admin-ui";
import type {
  DashboardContentSummary,
  DashboardContentTrendPoint,
} from "@/lib/admin/analytics-dashboard";
import { useAdminAuditEvents, useAnalyticsDashboard } from "@/lib/swr";

type TimeRange = "24h" | "7d" | "30d" | "90d";
type AuditActionFilter = "all" | "submission.approve" | "submission.reject";
type AuditTimeFilter = "24h" | "7d" | "30d" | "all";
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const AUDIT_PAGE_SIZE = 8;
const ZH_REGION_NAMES = new Intl.DisplayNames(["zh-CN"], { type: "region" });

export function AnalyticsDashboard() {
  const searchParams = useSearchParams();
  const [timeRange, setTimeRange] = useState<TimeRange>(() =>
    parseTimeRange(searchParams.get("range"))
  );
  const [auditActionFilter, setAuditActionFilter] =
    useState<AuditActionFilter>("all");
  const [auditTimeFilter, setAuditTimeFilter] =
    useState<AuditTimeFilter>("7d");
  const [auditOffset, setAuditOffset] = useState(0);
  const [auditSearch, setAuditSearch] = useState("");
  const [auditExporting, setAuditExporting] = useState(false);
  const [auditExportNotice, setAuditExportNotice] = useState<string | null>(null);
  const [auditExportError, setAuditExportError] = useState<string | null>(null);
  const debouncedAuditSearch = useDebouncedValue(auditSearch, 300);
  const { data, error, isLoading, isValidating, mutate } =
    useAnalyticsDashboard(timeRange);

  const handleRangeChange = useCallback((value: TimeRange) => {
    setTimeRange(value);
    const url = new URL(window.location.href);
    url.searchParams.set("range", value);
    window.history.replaceState(null, "", url);
  }, []);

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
      search: debouncedAuditSearch,
    }),
    [auditActionFilter, auditDays, auditOffset, debouncedAuditSearch]
  );

  const {
    data: auditData,
    error: auditError,
    isLoading: auditLoading,
    mutate: mutateAudit,
  } = useAdminAuditEvents(auditQuery);

  const auditExportHref = useMemo(() => {
    const params = new URLSearchParams({ format: "csv" });
    if (auditActionFilter !== "all") params.set("action", auditActionFilter);
    if (auditDays !== "all") params.set("days", String(auditDays));
    if (auditSearch.trim()) params.set("search", auditSearch.trim());
    return `/api/admin/audit?${params.toString()}`;
  }, [auditActionFilter, auditDays, auditSearch]);

  const handleExportAuditCsv = useCallback(async () => {
    setAuditExporting(true);
    setAuditExportError(null);
    setAuditExportNotice(null);

    try {
      const response = await fetch(auditExportHref);
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error ?? "导出 CSV 失败。");
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = getDownloadFilename(
        response.headers.get("content-disposition"),
        "admin-audit.csv"
      );
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(downloadUrl);

      if (response.headers.get("x-export-truncated") === "true") {
        setAuditExportNotice(
          "导出结果已达到服务器行数上限，请缩小筛选范围后重新导出。"
        );
      }
    } catch (exportError) {
      setAuditExportError(
        exportError instanceof Error ? exportError.message : "导出 CSV 失败。"
      );
    } finally {
      setAuditExporting(false);
    }
  }, [auditExportHref]);

  if (!data && isLoading) return <DashboardSkeleton />;
  if (!data && error) {
    return (
      <AdminErrorState
        message="加载分析数据失败，请重试。"
        onRetry={() => mutate()}
      />
    );
  }
  if (!data) return <DashboardSkeleton />;

  const rangeDays =
    timeRange === "24h" ? 1 : timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;

  const registrationAvailable = data.dataQuality.registrationsAvailable;
  const topPageMax = data.topPages[0]?.count ?? 0;
  const topReferrerMax = data.topReferrers[0]?.count ?? 0;
  const topStyleMax = data.topStyles[0]?.count ?? 0;
  const registrationMax = Math.max(
    ...data.registrations.series.map((point) => point.registrations),
    0
  );
  const auditCurrentPage = Math.floor(
    (auditData?.offset ?? auditOffset) / (auditData?.limit ?? AUDIT_PAGE_SIZE)
  ) + 1;
  const auditTotalPages = auditData
    ? Math.max(1, Math.ceil(auditData.total / auditData.limit))
    : 1;

  return (
    <div className="space-y-6">
      <AdminPanel className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">网站概览</p>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
              查看访问、浏览、注册以及需要你关注的产品信号。
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <AdminSegmentedControl<TimeRange>
              value={timeRange}
              onChange={handleRangeChange}
              ariaLabel="分析时间范围"
              options={[
                { value: "24h", label: "24时" },
                { value: "7d", label: "7天" },
                { value: "30d", label: "30天" },
                { value: "90d", label: "90天" },
              ]}
            />
            <AdminButton
              onClick={() => void Promise.all([mutate(), mutateAudit()])}
              aria-label="刷新后台数据"
              disabled={isValidating}
            >
              <RefreshCw
                className={`h-4 w-4 ${isValidating ? "animate-spin" : ""}`}
                strokeWidth={1.5}
              />
              {isValidating ? "更新中…" : "刷新"}
            </AdminButton>
          </div>
        </div>
      </AdminPanel>

      {error ? (
        <AdminPanel className="p-4" role="alert">
          <p className="flex items-center gap-3 text-sm text-foreground">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[var(--admin-status-red)]"
              aria-hidden="true"
            />
            数据更新失败，当前展示的是上次成功加载的结果。
          </p>
        </AdminPanel>
      ) : null}

      {(data.dataQuality.eventsTruncated ||
        data.dataQuality.registrationsTruncated) && (
        <DataQualityNotice
          eventsTruncated={data.dataQuality.eventsTruncated}
          registrationsTruncated={data.dataQuality.registrationsTruncated}
        />
      )}

      <AdminPanel className="p-5 sm:p-6">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <Metric
            icon={BarChart3}
            label="页面浏览量"
            value={data.pageViews.toLocaleString("zh-CN")}
            detail={
              timeRange === "24h"
                ? `每小时约 ${Math.round(data.pageViews / 24).toLocaleString("zh-CN")} 次浏览`
                : `日均 ${Math.round(data.pageViews / rangeDays).toLocaleString("zh-CN")} 次浏览`
            }
            trend={data.trend.deltaPct}
          />
          <Metric
            icon={Users}
            label="独立访客"
            value={data.visitors.toLocaleString("zh-CN")}
            detail={`${data.engagedVisitors.toLocaleString("zh-CN")} 位访客浏览了多个页面`}
          />
          <Metric
            icon={UserPlus}
            label="新增注册"
            value={registrationAvailable ? data.registrations.inRange.toLocaleString("zh-CN") : "暂无"}
            detail={
              registrationAvailable
                ? `累计 ${data.registrations.totalUsers.toLocaleString("zh-CN")} 位注册用户`
                : "暂时无法读取 Supabase Auth 用户数据"
            }
          />
          <Metric
            icon={MousePointerClick}
            label="跳出率"
            value={data.bounceRate == null ? "暂无" : `${data.bounceRate.toFixed(1)}%`}
            detail={`${data.uniqueSessions.toLocaleString("zh-CN")} 个活跃会话`}
          />
        </div>
      </AdminPanel>

      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <AdminPanel className="p-5 sm:p-6">
          <SectionHeading
            title="访问趋势"
            description="所选时间范围内的页面浏览量与独立访客会话。"
            meta={formatDelta(data.trend.deltaPct)}
          />
          <div className="mt-6">
            <TrafficChart
              labels={data.trafficSeries.map((point) => point.label)}
              pageViews={data.trafficSeries.map((point) => point.pageViews)}
              visitors={data.trafficSeries.map((point) => point.visitors)}
            />
          </div>
        </AdminPanel>

        <AdminPanel className="p-5 sm:p-6">
          <SectionHeading
            title="访问到注册"
            description="按同一时间窗对比；注册数据不归因到具体访客会话。"
          />
          <div className="mt-6 space-y-5">
            <FunnelStep
              label="独立访客"
              value={data.visitors}
              total={data.visitors}
              dot="bg-[var(--admin-text-primary)]"
            />
            <FunnelStep
              label="深度浏览访客"
              value={data.engagedVisitors}
              total={data.visitors}
              dot="bg-[var(--admin-text-muted)]"
            />
            <FunnelStep
              label="新增注册"
              value={registrationAvailable ? data.registrations.inRange : 0}
              total={data.visitors}
              dot="bg-[var(--admin-status-green)]"
              unavailable={!registrationAvailable}
            />
          </div>
          <div className="mt-6 rounded-md bg-[var(--admin-input)] px-4 py-3 shadow-[var(--admin-shadow-border)]">
            <p className="text-xs text-muted">本时间窗注册数 / 访客数</p>
            <p className="mt-1 text-2xl font-semibold tracking-[-0.8px] text-foreground">
              {registrationAvailable && data.registrations.visitorRatio != null
                ? `${data.registrations.visitorRatio.toFixed(1)}%`
                : "暂无"}
            </p>
          </div>
        </AdminPanel>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminPanel className="p-5 sm:p-6">
          <SectionHeading
            title="热门页面"
            description="页面浏览量最高的站内路径。"
            meta={`${data.topPages.length} 条路径`}
          />
          <RankedList
            className="mt-5"
            empty="记录到页面访问后，这里会显示热门页面。"
            items={data.topPages.map((page) => ({
              label: page.path,
              value: page.count,
              max: topPageMax,
              href: page.path,
            }))}
          />
        </AdminPanel>

        <AdminPanel className="p-5 sm:p-6">
          <SectionHeading
            title="访问来源"
            description="直接访问、搜索引擎、社交平台和外部引荐。"
            meta={`${data.topReferrers.length} 个来源`}
          />
          <div className="mt-5 space-y-1">
            {data.topReferrers.length === 0 ? (
              <EmptyText>记录到页面访问后，这里会显示访问来源。</EmptyText>
            ) : (
              data.topReferrers.map((source) => (
                <SourceRow
                  key={`${source.type}:${source.source}`}
                  source={source.source}
                  type={source.type}
                  value={source.count}
                  max={topReferrerMax}
                />
              ))
            )}
          </div>
        </AdminPanel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <AdminPanel className="p-5 sm:p-6">
          <SectionHeading
            title="常见浏览路径"
            description="访客在同一会话中最常见的连续页面跳转。"
          />
          <div className="mt-5 space-y-1">
            {data.topTransitions.length === 0 ? (
              <EmptyText>同一会话至少产生两次页面浏览后才能计算路径。</EmptyText>
            ) : (
              data.topTransitions.map((transition, index) => (
                <div
                  key={`${transition.from}:${transition.to}`}
                  className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-3 rounded-md px-2 py-3"
                >
                  <span className="font-mono text-xs text-[var(--admin-text-muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex min-w-0 items-center gap-2 text-sm">
                    <span className="truncate text-[var(--admin-text-secondary)]">
                      {transition.from}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[var(--admin-text-muted)]" strokeWidth={1.5} />
                    <span className="truncate font-medium text-foreground">
                      {transition.to}
                    </span>
                  </div>
                  <span className="font-mono text-xs tabular-nums text-muted">
                    {transition.count.toLocaleString("zh-CN")}
                  </span>
                </div>
              ))
            )}
          </div>
        </AdminPanel>

        <AdminPanel className="p-5 sm:p-6">
          <SectionHeading
            title="注册趋势"
            description="通过 Supabase Auth 创建的新账户。"
            meta={registrationAvailable ? `累计 ${data.registrations.totalUsers}` : "暂不可用"}
          />
          {registrationAvailable ? (
            <RegistrationChart
              className="mt-6"
              series={data.registrations.series}
              max={registrationMax}
            />
          ) : (
            <EmptyText className="mt-5">
              配置 Supabase Service Role 后，后台才能读取 Auth 用户数据。
            </EmptyText>
          )}
        </AdminPanel>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <PlatformPanel
          title="浏览器"
          icon={Monitor}
          items={data.topBrowsers}
          formatLabel={formatBrowserName}
        />
        <PlatformPanel
          title="设备"
          icon={Smartphone}
          items={data.topDevices}
          formatLabel={formatDeviceName}
        />
        <PlatformPanel
          title="国家和地区"
          icon={Globe2}
          items={data.topCountries}
          empty="国家和地区数据需要上游 Geo 请求头。"
          formatLabel={formatCountryName}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <AdminPanel className="p-5 sm:p-6">
          <SectionHeading
            title="热门风格"
            description="产生最多追踪行为的前端风格。"
          />
          <RankedList
            className="mt-5"
            empty="当前时间范围内暂无风格行为。"
            items={data.topStyles.slice(0, 8).map((style) => ({
              label: style.slug,
              detail: style.category ? formatStyleCategory(style.category) : undefined,
              value: style.count,
              max: topStyleMax,
              href: `/styles/${style.slug}`,
            }))}
          />
        </AdminPanel>

        <AdminPanel className="p-5 sm:p-6">
          <SectionHeading
            title="产品行为"
            description="所选时间范围内的浏览与实现意向信号。"
            meta={`日均 ${data.avgEventsPerDay.toLocaleString("zh-CN")} 事件`}
          />
          <div className="mt-5 grid grid-cols-2 gap-5">
            <SmallStat label="风格浏览" value={data.activityBreakdown.views} />
            <SmallStat label="代码复制" value={data.activityBreakdown.copies} />
            <SmallStat label="导出" value={data.activityBreakdown.exports} />
            <SmallStat label="全部事件" value={data.totalEvents} />
          </div>
        </AdminPanel>
      </div>

      <ContentOpsPanel
        summary={data.contentSummary}
        trends={data.contentTrends}
      />

      <AdminPanel className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <SectionHeading
            title="最近管理操作"
            description="查看审核、驳回和操作者，并导出筛选后的审计记录。"
          />
          <div className="flex flex-wrap items-center gap-2">
            <AdminSegmentedControl<AuditActionFilter>
              value={auditActionFilter}
              onChange={(value) => {
                setAuditActionFilter(value);
                setAuditOffset(0);
              }}
              ariaLabel="审计操作筛选"
              options={[
                { value: "all", label: "全部" },
                { value: "submission.approve", label: "已通过" },
                { value: "submission.reject", label: "已驳回" },
              ]}
            />
            <AdminSegmentedControl<AuditTimeFilter>
              value={auditTimeFilter}
              onChange={(value) => {
                setAuditTimeFilter(value);
                setAuditOffset(0);
              }}
              ariaLabel="审计时间筛选"
              options={[
                { value: "24h", label: "24时" },
                { value: "7d", label: "7天" },
                { value: "30d", label: "30天" },
                { value: "all", label: "全部" },
              ]}
            />
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <AdminField label="搜索审计记录">
            <AdminInput
              value={auditSearch}
              onChange={(event) => {
                setAuditSearch(event.target.value);
                setAuditOffset(0);
              }}
              placeholder="风格标识、操作者、目标或 ID"
            />
          </AdminField>
          <AdminButton
            onClick={() => void handleExportAuditCsv()}
            disabled={auditExporting}
          >
            <Download className="h-4 w-4" strokeWidth={1.5} />
            {auditExporting ? "正在导出…" : "导出 CSV"}
          </AdminButton>
        </div>

        {auditExportNotice ? (
          <p
            className="mt-3 text-xs text-[var(--admin-status-amber)]"
            role="status"
            aria-live="polite"
          >
            {auditExportNotice}
          </p>
        ) : null}
        {auditExportError ? (
          <p className="mt-3 text-xs text-[var(--admin-status-red)]" role="alert">
            {auditExportError}
          </p>
        ) : null}

        <div className="mt-5">
          {auditLoading ? <AdminLoadingState label="正在加载审计记录…" /> : null}
          {!auditLoading && auditError ? (
            <AdminErrorState message="加载审计记录失败，请重试。" onRetry={() => mutateAudit()} />
          ) : null}
          {!auditLoading && !auditError && (auditData?.events.length ?? 0) === 0 ? (
            <EmptyText>没有符合当前筛选条件的管理操作。</EmptyText>
          ) : null}
          {!auditLoading && !auditError && (auditData?.events.length ?? 0) > 0 ? (
            <div className="space-y-1">
              {(auditData?.events ?? []).map((event) => {
                const meta =
                  event.metadata && typeof event.metadata === "object"
                    ? (event.metadata as Record<string, unknown>)
                    : null;
                const slug = typeof meta?.slug === "string" ? meta.slug : null;

                return (
                  <div
                    key={event.id}
                    className="grid gap-2 rounded-md px-2 py-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
                  >
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            event.action === "submission.reject"
                              ? "bg-[var(--admin-status-red)]"
                              : "bg-[var(--admin-status-green)]"
                          }`}
                        />
                        {formatAuditAction(event.action)}
                      </p>
                      <p className="mt-1 truncate text-xs text-muted">
                        {formatAuditActor(event.actor.type, event.actor.id)} · {event.targetType}
                        {event.targetId ? `:${event.targetId}` : ""}
                        {slug ? ` · ${slug}` : ""}
                      </p>
                    </div>
                    <p className="flex items-center gap-1.5 text-xs text-muted">
                      <Clock3 className="h-3.5 w-3.5" strokeWidth={1.5} />
                      {new Date(event.createdAt).toLocaleString("zh-CN")}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        {auditData && auditData.total > 0 ? (
          <div className="mt-5">
            <AdminPagination
              page={auditCurrentPage}
              totalPages={auditTotalPages}
              summary={`共 ${auditData.total.toLocaleString("zh-CN")} 条匹配操作`}
              hasPrev={auditData.offset > 0}
              hasNext={Boolean(auditData.hasMore)}
              onPrev={() =>
                setAuditOffset(
                  Math.max(0, auditData.offset - (auditData.limit ?? AUDIT_PAGE_SIZE))
                )
              }
              onNext={() => {
                if (auditData.nextOffset != null) setAuditOffset(auditData.nextOffset);
              }}
            />
          </div>
        ) : null}
      </AdminPanel>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  detail,
  trend,
}: {
  icon: IconComponent;
  label: string;
  value: string;
  detail: string;
  trend?: number | null;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm text-[var(--admin-text-secondary)]">
          <Icon className="h-4 w-4" strokeWidth={1.5} />
          {label}
        </p>
        {trend !== undefined ? <TrendIndicator value={trend} /> : null}
      </div>
      <p className="mt-4 text-[32px] font-semibold leading-9 tracking-[-1.28px] tabular-nums text-foreground">
        {value}
      </p>
      <p className="mt-2 text-xs leading-5 text-muted">{detail}</p>
    </div>
  );
}

function TrendIndicator({ value }: { value: number | null }) {
  const positive = value != null && value > 0;
  const negative = value != null && value < 0;
  const Icon = positive ? ArrowUpRight : negative ? ArrowDownRight : Minus;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
      <span
        className={`h-2 w-2 rounded-full ${
          positive
            ? "bg-[var(--admin-status-green)]"
            : negative
              ? "bg-[var(--admin-status-red)]"
              : "bg-[var(--admin-text-muted)]"
        }`}
      />
      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
      {formatDelta(value)}
    </span>
  );
}

function SectionHeading({
  title,
  description,
  meta,
}: {
  title: string;
  description: string;
  meta?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-sm font-medium tracking-[-0.28px] text-foreground">{title}</h2>
        <p className="mt-1 max-w-2xl text-sm leading-5 text-muted">{description}</p>
      </div>
      {meta ? (
        <span className="shrink-0 font-mono text-xs tabular-nums text-muted">{meta}</span>
      ) : null}
    </div>
  );
}

function TrafficChart({
  labels,
  pageViews,
  visitors,
}: {
  labels: string[];
  pageViews: number[];
  visitors: number[];
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const rowCount = Math.min(labels.length, pageViews.length, visitors.length);
  const rows = labels.slice(0, rowCount).map((label, index) => ({
    label,
    pageViews: pageViews[index] ?? 0,
    visitors: visitors[index] ?? 0,
  }));
  if (rows.length === 0) {
    return <EmptyText>当前时间范围内暂无访问趋势数据。</EmptyText>;
  }

  const maxValue = Math.max(
    ...rows.map((row) => row.pageViews),
    ...rows.map((row) => row.visitors),
    1
  );
  const max = getNiceChartMax(maxValue);
  const tickCount = Math.min(6, max + 1);
  const path = (points: Array<{ x: number; y: number }>) =>
    points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const visibleLabels = [
    rows[0]?.label,
    rows[Math.floor((rows.length - 1) / 2)]?.label,
    rows.at(-1)?.label,
  ].filter((label, index, values): label is string => Boolean(label) && values.indexOf(label) === index);

  const renderChart = (width: number, height: number, className: string) => {
    const paddingX = width <= 400 ? 38 : 42;
    const paddingY = 22;
    const usableWidth = width - paddingX * 2;
    const buildPoints = (values: number[]) =>
      values.map((value, index) => ({
        x:
          values.length <= 1
            ? width / 2
            : paddingX + (index * usableWidth) / (values.length - 1),
        y: height - paddingY - (value / max) * (height - paddingY * 2),
      }));
    const pageViewPoints = buildPoints(rows.map((row) => row.pageViews));
    const visitorPoints = buildPoints(rows.map((row) => row.visitors));
    const hoveredRow = hovered != null ? rows[hovered] : null;
    const hoveredX = hovered != null ? pageViewPoints[hovered]?.x ?? null : null;

    const locateIndex = (event: React.PointerEvent<SVGSVGElement>) => {
      if (rows.length <= 1) return 0;
      const rect = event.currentTarget.getBoundingClientRect();
      if (rect.width === 0) return 0;
      const x = ((event.clientX - rect.left) / rect.width) * width;
      const index = Math.round(((x - paddingX) / usableWidth) * (rows.length - 1));
      return Math.min(rows.length - 1, Math.max(0, index));
    };

    return (
      <div className="relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className={`${className} [touch-action:pan-y]`}
          aria-hidden="true"
          focusable="false"
          onPointerDown={(event) => setHovered(locateIndex(event))}
          onPointerMove={(event) => setHovered(locateIndex(event))}
          onPointerLeave={() => setHovered(null)}
        >
          {Array.from({ length: tickCount }, (_, line) => {
            const y =
              paddingY + (line * (height - paddingY * 2)) / Math.max(tickCount - 1, 1);
            const value = max - (line * max) / Math.max(tickCount - 1, 1);
            return (
              <g key={line}>
                <line
                  x1={paddingX}
                  x2={width - paddingX}
                  y1={y}
                  y2={y}
                  stroke="var(--admin-border-soft)"
                  strokeWidth="1"
                />
                <text
                  x="0"
                  y={y + 4}
                  fill="var(--admin-text-secondary)"
                  fontSize="12"
                >
                  {formatChartTick(value)}
                </text>
              </g>
            );
          })}
          {hoveredX != null ? (
            <line
              x1={hoveredX}
              x2={hoveredX}
              y1={paddingY}
              y2={height - paddingY}
              stroke="var(--admin-border-emphasis)"
              strokeWidth="1"
            />
          ) : null}
          <path
            d={path(visitorPoints)}
            fill="none"
            stroke="var(--admin-text-muted)"
            strokeDasharray="5 6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d={path(pageViewPoints)}
            fill="none"
            stroke="var(--admin-text-primary)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          {hovered != null && visitorPoints[hovered] ? (
            <circle
              cx={visitorPoints[hovered].x}
              cy={visitorPoints[hovered].y}
              r="3"
              fill="var(--admin-panel)"
              stroke="var(--admin-text-muted)"
              strokeWidth="2"
            />
          ) : null}
          {hovered != null && pageViewPoints[hovered] ? (
            <circle
              cx={pageViewPoints[hovered].x}
              cy={pageViewPoints[hovered].y}
              r="3.5"
              fill="var(--admin-panel)"
              stroke="var(--admin-text-primary)"
              strokeWidth="2"
            />
          ) : null}
        </svg>
        {hoveredRow && hoveredX != null ? (
          <div
            className="pointer-events-none absolute top-2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--admin-panel)] px-3 py-2 text-xs shadow-[var(--admin-shadow-menu)]"
            style={{
              left: `${Math.min(86, Math.max(14, (hoveredX / width) * 100))}%`,
            }}
          >
            <p className="font-medium text-foreground">{hoveredRow.label}</p>
            <p className="mt-1 flex items-center gap-1.5 tabular-nums text-muted">
              <span className="h-0.5 w-3 bg-[var(--admin-text-primary)]" aria-hidden="true" />
              浏览 {hoveredRow.pageViews.toLocaleString("zh-CN")}
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 tabular-nums text-muted">
              <span
                className="w-3 border-t border-dashed border-[var(--admin-text-muted)]"
                aria-hidden="true"
              />
              访客 {hoveredRow.visitors.toLocaleString("zh-CN")}
            </p>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <div className="sm:hidden">
        {renderChart(360, 220, "h-[220px] w-full overflow-visible")}
      </div>
      <div className="hidden sm:block">
        {renderChart(760, 250, "h-64 w-full overflow-visible")}
      </div>
      <div className="flex items-center justify-between gap-4 text-[11px] text-muted">
        {visibleLabels.map((label, index) => (
          <span key={`${label}-${index}`} className="truncate">
            {label}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-5 text-xs text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-5 bg-[var(--admin-text-primary)]" /> 页面浏览量
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-5 border-t border-dashed border-[var(--admin-text-muted)]" /> 独立访客
        </span>
      </div>
      <ChartDataDisclosure
        label="查看访问趋势明细"
        headers={["日期", "页面浏览量", "独立访客"]}
        rows={rows.map((row) => [
          row.label,
          row.pageViews.toLocaleString("zh-CN"),
          row.visitors.toLocaleString("zh-CN"),
        ])}
      />
    </div>
  );
}

function RegistrationChart({
  series,
  max,
  className = "",
}: {
  series: Array<{ key: string; label: string; registrations: number }>;
  max: number;
  className?: string;
}) {
  if (series.length === 0) {
    return <EmptyText className={className}>当前时间范围内暂无注册趋势数据。</EmptyText>;
  }

  return (
    <div className={className}>
      <div className="flex h-40 items-end gap-1.5" aria-hidden="true">
        {series.map((point) => {
          const height = max > 0 ? (point.registrations / max) * 100 : 0;
          return (
            <div
              key={point.key}
              className="flex h-full flex-1 items-end"
              title={`${point.label}: ${point.registrations.toLocaleString("zh-CN")}`}
            >
              <div
                className="w-full rounded-[2px] bg-[var(--admin-text-primary)]"
                style={{
                  height:
                    point.registrations > 0 ? `${Math.max(height, 1)}%` : "0",
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-muted">
        <span>{series[0]?.label ?? ""}</span>
        <span>{series.at(-1)?.label ?? ""}</span>
      </div>
      <ChartDataDisclosure
        label="查看注册趋势明细"
        headers={["日期", "新增注册"]}
        rows={series.map((point) => [
          point.label,
          point.registrations.toLocaleString("zh-CN"),
        ])}
      />
    </div>
  );
}

function ChartDataDisclosure({
  label,
  headers,
  rows,
}: {
  label: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <details className="mt-4 text-xs">
      <summary className="w-fit cursor-pointer rounded-sm text-muted hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--admin-focus-ring)]">
        {label}
      </summary>
      <div className="mt-3 max-h-64 overflow-auto rounded-md shadow-[var(--admin-shadow-border)]">
        <table className="w-full min-w-[320px] border-collapse text-left">
          <thead className="sticky top-0 bg-[var(--admin-panel)] text-muted">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={header}
                  scope="col"
                  className={`px-3 py-2 font-medium ${index > 0 ? "text-right" : ""}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${row[0]}-${rowIndex}`} className="shadow-[0_-1px_0_0_var(--admin-border-soft)]">
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${cell}-${cellIndex}`}
                    className={`px-3 py-2 ${
                      cellIndex > 0
                        ? "text-right font-mono tabular-nums text-foreground"
                        : "text-muted"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

function getNiceChartMax(value: number): number {
  if (value <= 2) return Math.max(1, Math.ceil(value));
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const normalized = value / magnitude;
  const niceNormalized =
    normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return niceNormalized * magnitude;
}

function formatChartTick(value: number): string {
  return new Intl.NumberFormat("zh-CN", {
    notation: value >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function FunnelStep({
  label,
  value,
  total,
  dot,
  unavailable = false,
}: {
  label: string;
  value: number;
  total: number;
  dot: string;
  unavailable?: boolean;
}) {
  const ratio = total > 0 ? (value / total) * 100 : 0;
  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="flex items-center gap-2 text-[var(--admin-text-secondary)]">
          <span className={`h-2 w-2 rounded-full ${dot}`} />
          {label}
        </span>
        <span className="font-mono text-xs tabular-nums text-foreground">
          {unavailable ? "N/A" : value.toLocaleString("zh-CN")}
        </span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-[var(--admin-input)]">
        <div
          className="h-full rounded-full bg-[var(--admin-text-primary)]"
          style={{ width: `${unavailable ? 0 : Math.min(ratio, 100)}%` }}
        />
      </div>
    </div>
  );
}

function RankedList({
  items,
  empty,
  className = "",
}: {
  items: Array<{
    label: string;
    detail?: string;
    value: number;
    max: number;
    href?: string;
  }>;
  empty: string;
  className?: string;
}) {
  if (items.length === 0) return <EmptyText className={className}>{empty}</EmptyText>;

  return (
    <div className={`space-y-1 ${className}`}>
      {items.map((item, index) => {
        const content = (
          <>
            <div className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-3">
              <span className="font-mono text-xs text-[var(--admin-text-muted)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {item.label}
                  {item.href ? (
                    <ArrowUpRight
                      className="ml-1 inline h-3 w-3 text-[var(--admin-text-muted)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                      aria-hidden="true"
                    />
                  ) : null}
                </p>
                {item.detail ? (
                  <p className="mt-0.5 text-xs capitalize text-muted">{item.detail}</p>
                ) : null}
              </div>
              <span className="font-mono text-xs tabular-nums text-muted">
                {item.value.toLocaleString("zh-CN")}
              </span>
            </div>
            <div className="ml-10 mt-2 h-0.5 bg-[var(--admin-input)]">
              <div
                className="h-full bg-[var(--admin-text-primary)]"
                style={{ width: `${item.max > 0 ? (item.value / item.max) * 100 : 0}%` }}
              />
            </div>
          </>
        );

        return item.href ? (
          <a
            key={`${item.label}-${index}`}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="group block rounded-md px-2 py-3 transition-colors hover:bg-[var(--admin-input)]"
          >
            {content}
          </a>
        ) : (
          <div key={`${item.label}-${index}`} className="rounded-md px-2 py-3">
            {content}
          </div>
        );
      })}
    </div>
  );
}

function SourceRow({
  source,
  type,
  value,
  max,
}: {
  source: string;
  type: "direct" | "search" | "social" | "external" | "internal";
  value: number;
  max: number;
}) {
  const dot =
    type === "search"
      ? "bg-[var(--admin-status-blue)]"
      : type === "social"
        ? "bg-[var(--admin-status-green)]"
        : type === "external"
          ? "bg-[var(--admin-status-amber)]"
          : "bg-[var(--admin-text-muted)]";
  return (
    <div className="rounded-md px-2 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">
            {formatReferrerSource(source, type)}
          </p>
          <p className="mt-1 flex items-center gap-2 text-xs text-muted">
            <span className={`h-2 w-2 rounded-full ${dot}`} />
            {formatReferrerType(type)}
          </p>
        </div>
        <span className="font-mono text-xs tabular-nums text-muted">
          {value.toLocaleString("zh-CN")}
        </span>
      </div>
      <div className="mt-2 h-0.5 bg-[var(--admin-input)]">
        <div
          className="h-full bg-[var(--admin-text-primary)]"
          style={{ width: `${max > 0 ? (value / max) * 100 : 0}%` }}
        />
      </div>
    </div>
  );
}

function PlatformPanel({
  title,
  icon: Icon,
  items,
  empty = "当前时间范围内暂无数据。",
  formatLabel = (value) => value,
}: {
  title: string;
  icon: IconComponent;
  items: Array<{ name: string; count: number }>;
  empty?: string;
  formatLabel?: (value: string) => string;
}) {
  const max = items[0]?.count ?? 0;
  return (
    <AdminPanel className="p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted" strokeWidth={1.5} />
        <h2 className="text-sm font-medium tracking-[-0.28px] text-foreground">{title}</h2>
      </div>
      <RankedList
        className="mt-4"
        empty={empty}
        items={items.slice(0, 6).map((item) => ({
          label: formatLabel(item.name),
          value: item.count,
          max,
        }))}
      />
    </AdminPanel>
  );
}

function SmallStat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-2 font-mono text-xl font-medium tabular-nums text-foreground">
        {value.toLocaleString("zh-CN")}
      </p>
    </div>
  );
}

function DataQualityNotice({
  eventsTruncated,
  registrationsTruncated,
}: {
  eventsTruncated: boolean;
  registrationsTruncated: boolean;
}) {
  const messages = [
    eventsTruncated
      ? "分析结果已达到 100,000 条事件的安全上限。"
      : null,
    registrationsTruncated
      ? "Auth 用户结果已达到 20,000 条的安全上限。"
      : null,
  ].filter((message): message is string => Boolean(message));

  return (
    <AdminPanel className="p-4">
      <div className="flex gap-3">
        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--admin-status-amber)]" />
        <div>
          <p className="text-sm font-medium text-foreground">数据完整性提示</p>
          {messages.map((message) => (
            <p key={message} className="mt-1 text-xs leading-5 text-muted">
              {message}
            </p>
          ))}
        </div>
      </div>
    </AdminPanel>
  );
}

function EmptyText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return <p className={`text-sm leading-6 text-muted ${className}`}>{children}</p>;
}

function formatDelta(deltaPct: number | null): string {
  if (deltaPct == null) return "暂无对比";
  if (deltaPct === 0) return "持平";
  return `${deltaPct > 0 ? "+" : ""}${deltaPct.toFixed(1)}%`;
}

function formatAuditAction(action: string): string {
  if (action === "submission.approve") return "投稿已通过";
  if (action === "submission.reject") return "投稿已驳回";
  return action.replace(/_/g, " ");
}

function formatAuditActor(type: string, id: string): string {
  if (type === "user") return `user:${id.slice(0, 8)}`;
  if (type === "dev-bypass") return "dev-bypass";
  return `${type}:${id}`;
}

function formatReferrerType(
  type: "direct" | "search" | "social" | "external" | "internal"
): string {
  if (type === "direct") return "直接访问";
  if (type === "search") return "搜索引擎";
  if (type === "social") return "社交平台";
  if (type === "internal") return "站内跳转";
  return "外部引荐";
}

function formatReferrerSource(
  source: string,
  type: "direct" | "search" | "social" | "external" | "internal"
): string {
  if (type === "direct" || source.toLowerCase() === "direct") {
    return "直接访问";
  }
  return source;
}

function formatStyleCategory(category: string): string {
  if (category === "minimal") return "极简";
  if (category === "modern") return "现代";
  if (category === "retro") return "复古";
  if (category === "expressive") return "表现力";
  return category;
}

function formatBrowserName(name: string): string {
  return name.toLowerCase() === "unknown" ? "未知" : name;
}

function formatDeviceName(name: string): string {
  const normalized = name.toLowerCase();
  if (normalized === "desktop") return "桌面端";
  if (normalized === "mobile") return "移动端";
  if (normalized === "tablet") return "平板设备";
  if (normalized === "bot") return "机器人";
  if (normalized === "unknown") return "未知";
  return name;
}

function formatCountryName(name: string): string {
  if (!/^[A-Z]{2}$/i.test(name)) return name;
  try {
    return ZH_REGION_NAMES.of(name.toUpperCase()) ?? name;
  } catch {
    return name;
  }
}

function getDownloadFilename(contentDisposition: string | null, fallback: string): string {
  if (!contentDisposition) return fallback;
  const match = /filename\*?=(?:UTF-8''|"?)([^";]+)/i.exec(contentDisposition);
  if (!match?.[1]) return fallback;
  const cleaned = decodeURIComponent(match[1].replace(/^"|"$/g, "").trim());
  return cleaned || fallback;
}

function parseTimeRange(value: string | null): TimeRange {
  return value === "24h" || value === "7d" || value === "30d" || value === "90d"
    ? value
    : "7d";
}

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

function ContentOpsPanel({
  summary,
  trends,
}: {
  summary: DashboardContentSummary;
  trends: DashboardContentTrendPoint[];
}) {
  const rows = [
    {
      key: "comments",
      icon: MessageSquare,
      label: "评论",
      total: summary.comments,
      inWindow: trends.reduce((sum, point) => sum + point.comments, 0),
      series: trends.map((point) => point.comments),
      href: "/admin/comments",
    },
    {
      key: "ratings",
      icon: Star,
      label: "评分",
      total: summary.ratings,
      inWindow: trends.reduce((sum, point) => sum + point.ratings, 0),
      series: trends.map((point) => point.ratings),
      href: "/admin/ratings",
    },
    {
      key: "favorites",
      icon: Heart,
      label: "收藏",
      total: summary.favorites,
      inWindow: trends.reduce((sum, point) => sum + point.favorites, 0),
      series: trends.map((point) => point.favorites),
      href: null,
    },
  ];

  return (
    <AdminPanel className="p-5 sm:p-6">
      <SectionHeading
        title="内容运营"
        description="社区内容的累计规模、所选时间范围内的新增，以及等待处理的投稿。"
      />
      <div className="mt-5 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-1">
          {rows.map((row) => {
            const content = (
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto_88px]">
                <span className="flex min-w-0 items-center gap-2 text-sm text-[var(--admin-text-secondary)]">
                  <row.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  {row.label}
                </span>
                <span className="text-right">
                  <span className="font-mono text-sm tabular-nums text-foreground">
                    {row.total.toLocaleString("zh-CN")}
                  </span>
                  <span className="ml-2 text-xs tabular-nums text-muted">
                    本窗口 +{row.inWindow.toLocaleString("zh-CN")}
                  </span>
                </span>
                <Sparkline className="hidden sm:block" values={row.series} />
              </div>
            );
            return row.href ? (
              <Link
                key={row.key}
                href={row.href}
                className="block rounded-md px-2 py-3 transition-colors hover:bg-[var(--admin-input)]"
              >
                {content}
              </Link>
            ) : (
              <div key={row.key} className="rounded-md px-2 py-3">
                {content}
              </div>
            );
          })}
        </div>
        <Link
          href="/admin/submissions"
          className="block rounded-md bg-[var(--admin-input)] px-4 py-4 shadow-[var(--admin-shadow-border)] transition-colors hover:bg-[var(--admin-hover)]"
        >
          <span className="flex items-center justify-between text-sm text-[var(--admin-text-secondary)]">
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4" strokeWidth={1.5} />
              投稿审核
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-[var(--admin-text-muted)]" strokeWidth={1.5} />
          </span>
          <span className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-[-0.8px] tabular-nums text-foreground">
              {summary.submissionsPending.toLocaleString("zh-CN")}
            </span>
            {summary.submissionsPending > 0 ? (
              <span
                className="h-2 w-2 rounded-full bg-[var(--admin-status-amber)]"
                aria-hidden="true"
              />
            ) : null}
          </span>
          <span className="mt-1 block text-xs text-muted">
            待审核 · 累计 {summary.submissionsTotal.toLocaleString("zh-CN")} 份投稿
          </span>
          <span className="mt-3 flex items-center gap-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full bg-[var(--admin-status-green)]"
                aria-hidden="true"
              />
              已通过 {summary.submissionsApproved.toLocaleString("zh-CN")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full bg-[var(--admin-status-red)]"
                aria-hidden="true"
              />
              已驳回 {summary.submissionsRejected.toLocaleString("zh-CN")}
            </span>
          </span>
        </Link>
      </div>
    </AdminPanel>
  );
}

function Sparkline({
  values,
  className = "",
}: {
  values: number[];
  className?: string;
}) {
  if (values.length < 2) return <span className={className} />;

  const width = 88;
  const height = 28;
  const max = Math.max(...values, 1);
  const step = width / (values.length - 1);
  const points = values
    .map((value, index) => {
      const x = index * step;
      const y = height - 2 - (value / max) * (height - 4);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`h-7 w-[88px] text-[var(--admin-text-muted)] ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">正在加载分析数据…</span>
      <AdminPanel className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded-full bg-[var(--admin-input)]" />
            <div className="h-3 w-64 animate-pulse rounded-full bg-[var(--admin-input)]" />
          </div>
          <div className="h-10 w-56 animate-pulse rounded-md bg-[var(--admin-input)]" />
        </div>
      </AdminPanel>
      <AdminPanel className="p-5 sm:p-6">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="space-y-3">
              <div className="h-4 w-24 animate-pulse rounded-full bg-[var(--admin-input)]" />
              <div className="h-9 w-32 animate-pulse rounded-md bg-[var(--admin-input)]" />
              <div className="h-3 w-40 animate-pulse rounded-full bg-[var(--admin-input)]" />
            </div>
          ))}
        </div>
      </AdminPanel>
      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <AdminPanel className="p-5 sm:p-6">
          <div className="h-64 animate-pulse rounded-md bg-[var(--admin-input)]" />
        </AdminPanel>
        <AdminPanel className="p-5 sm:p-6">
          <div className="h-64 animate-pulse rounded-md bg-[var(--admin-input)]" />
        </AdminPanel>
      </div>
    </div>
  );
}
