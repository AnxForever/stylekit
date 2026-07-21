"use client";

import { Activity, Eye, Gauge, MousePointerClick, Users } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AdminErrorState,
  AdminPanel,
  AdminSegmentedControl,
} from "@/components/admin/admin-ui";
import type { AnalyticsOverview, AnalyticsRange } from "@/lib/admin/analytics-api-contract";
import { useAnalyticsOverview } from "@/lib/swr";
import { AnalyticsSectionNav, AnalyticsSyncStatus } from "./_content";
import { useAnalyticsRangeState } from "./_range-state";
import { InteractiveLineChart } from "./_interactive-line-chart";
import { prefetchCommonAnalytics } from "@/lib/swr/analytics-prefetch";

export function AnalyticsOverviewPage({
  initialRange = "7d",
  initialData,
}: {
  initialRange?: AnalyticsRange;
  initialData?: AnalyticsOverview;
}) {
  const { range, setRange } = useAnalyticsRangeState(initialRange);
  const { data, error, isLoading, isValidating, mutate } = useAnalyticsOverview(
    range,
    range === initialRange ? initialData : undefined
  );

  useEffect(() => {
    if (!data) return;
    const id = window.setTimeout(() => void prefetchCommonAnalytics(range), 3500);
    return () => window.clearTimeout(id);
  }, [data, range]);

  return (
    <div className="space-y-6">
      <AnalyticsSectionNav view="overview" range={range} />
      <AnalyticsSyncStatus syncing={isValidating} generatedAt={data?.quality.generatedAt} />
      <AdminPanel className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">经营概览</p>
            <p className="mt-1 text-sm text-muted">
              核心指标独立加载；点击其他分区查看具体原因。
            </p>
          </div>
          <AdminSegmentedControl<AnalyticsRange>
            value={range}
            onChange={setRange}
            ariaLabel="分析时间范围"
            options={[
              { value: "24h", label: "24时" },
              { value: "7d", label: "7天" },
              { value: "30d", label: "30天" },
              { value: "90d", label: "90天" },
            ]}
          />
        </div>
      </AdminPanel>

      {isLoading && !data ? <OverviewSkeleton /> : null}
      {!data && error ? (
        <AdminErrorState
          message={error.message || "加载概览指标失败。"}
          onRetry={() => mutate()}
        />
      ) : null}
      {data ? (
        <>
          <OverviewTrendPanel data={data} />

          <div className="grid gap-px overflow-hidden rounded-xl bg-[var(--admin-border-soft)] shadow-[var(--admin-shadow-border)] sm:grid-cols-2 xl:grid-cols-5">
            <OverviewMetric
              icon={Users}
              label="独立访客"
              value={data.current.visitors}
              previous={data.previous.visitors}
            />
            <OverviewMetric
              icon={Eye}
              label="页面浏览"
              value={data.current.pageViews}
              previous={data.previous.pageViews}
            />
            <OverviewMetric
              icon={Activity}
              label="访问次数"
              value={data.current.visits}
              previous={data.previous.visits}
            />
            <OverviewMetric
              icon={Gauge}
              label="每次访问浏览"
              value={data.current.viewsPerVisit}
              previous={data.previous.viewsPerVisit ?? undefined}
              decimals={2}
            />
            <OverviewMetric
              icon={MousePointerClick}
              label="跳出率"
              value={data.current.bounceRate}
              previous={data.previous.bounceRate ?? undefined}
              suffix="%"
              inverse
            />
          </div>

          {data.quality.status !== "complete" ? (
            <AdminPanel className="p-4" role="status">
              <p className="text-sm text-foreground">数据质量提示</p>
              <p className="mt-1 text-xs leading-5 text-muted">
                {data.quality.anonymousPageViews.toLocaleString("zh-CN")} 次浏览缺少访客标识；
                地域覆盖率为 {data.quality.countryCoveragePct == null ? "暂无" : `${data.quality.countryCoveragePct}%`}。
              </p>
            </AdminPanel>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

function OverviewMetric({
  icon: Icon,
  label,
  value,
  previous,
  suffix = "",
  decimals = 0,
  inverse = false,
}: {
  icon: typeof Eye;
  label: string;
  value: number | null;
  previous?: number;
  suffix?: string;
  decimals?: number;
  inverse?: boolean;
}) {
  const delta =
    value != null && previous != null && previous > 0
      ? ((value - previous) / previous) * 100
      : null;
  const positive = delta != null && (inverse ? delta < 0 : delta > 0);

  return (
    <div className="bg-[var(--admin-panel)] p-5">
      <p className="flex items-center gap-2 text-xs text-muted">
        <Icon className="h-4 w-4" strokeWidth={1.5} />
        {label}
      </p>
      <p className="mt-4 font-mono text-2xl font-semibold tabular-nums tracking-[-0.04em] text-foreground">
        {value == null ? "—" : `${value.toLocaleString("zh-CN", { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}${suffix}`}
      </p>
      <p className={`mt-2 text-xs ${delta == null ? "text-muted" : positive ? "text-[var(--admin-status-green)]" : "text-[var(--admin-status-red)]"}`}>
        {delta == null ? "暂无可比周期" : `较上期 ${delta > 0 ? "+" : ""}${delta.toFixed(1)}%`}
      </p>
    </div>
  );
}

function OverviewTrendPanel({ data }: { data: AnalyticsOverview }) {
  const [metric, setMetric] = useState<"visitors" | "pageViews">("visitors");
  const isVisitors = metric === "visitors";
  return <AdminPanel className="p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-sm font-medium text-foreground">{isVisitors ? "独立访客趋势" : "页面浏览趋势"}</h2><p className="mt-1 text-xs text-muted">{isVisitors ? "每个时间桶内去重后的匿名访客。" : "页面加载与站内路由切换产生的浏览次数。"}</p></div><MetricSwitch value={metric} onChange={setMetric} /></div><InteractiveLineChart ariaLabel={isVisitors ? "独立访客趋势图" : "页面浏览趋势图"} primaryLabel={isVisitors ? "独立访客" : "页面浏览"} secondaryLabel={isVisitors ? undefined : "上一周期"} secondaryIsComparison={!isVisitors} points={data.series.map((point) => ({ key: point.bucket, label: new Date(point.bucket).toLocaleString("zh-CN"), primary: isVisitors ? point.visitors : point.pageViews, secondary: isVisitors ? undefined : point.previousPageViews }))} /></AdminPanel>;
}

function MetricSwitch({ value, onChange }: { value: "visitors" | "pageViews"; onChange: (value: "visitors" | "pageViews") => void }) {
  return <div className="inline-flex rounded-md bg-[var(--admin-input)] p-1 shadow-[var(--admin-shadow-border)]" role="group" aria-label="趋势指标">{([['visitors','独立访客'],['pageViews','页面浏览']] as const).map(([metric,label]) => <button key={metric} type="button" aria-pressed={value === metric} onClick={() => onChange(metric)} className={`rounded px-3 py-1.5 text-xs transition-colors ${value === metric ? "bg-[var(--admin-panel)] text-foreground shadow-[var(--admin-shadow-small)]" : "text-muted hover:text-foreground"}`}>{label}</button>)}</div>;
}

function OverviewSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5" aria-label="正在加载概览指标">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="h-32 animate-pulse rounded-xl bg-[var(--admin-input)]" />
      ))}
    </div>
  );
}
