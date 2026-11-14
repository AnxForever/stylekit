"use client";

import { Activity, Eye, Gauge, MousePointerClick, Users } from "lucide-react";
import { useState } from "react";
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
import { FirstPartyTrafficPanel } from "@/components/admin/style-insights-panel";

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

      <FirstPartyTrafficPanel range={range} />

      {isLoading && !data ? <OverviewSkeleton /> : null}
      {!data && error ? (
        <AdminErrorState
          message={error.message || "加载概览指标失败。"}
          onRetry={() => mutate()}
        />
      ) : null}
      {data ? (
        <>
          <AdminPanel className="p-4 text-xs leading-5 text-muted">
            <p className="font-medium text-foreground">历史兼容流量概览 · {collectorLabel(data)}</p>
            <p className="mt-1">下方保留原统计来源及历史趋势，与上方浏览器 UV 的识别方式不同，不能合并计算或直接比较。{data.measurement?.fallback ? "当前显示最近保留的快照，实时读取未成功。" : ""}</p>
            {data.quality.status === "stale" ? <p className="mt-1">该来源的数据已过期，请以标注的更新时间为准。</p> : null}
          </AdminPanel>
          <OverviewTrendPanel data={data} />

          <div className="grid gap-px overflow-hidden rounded-xl bg-[var(--admin-border-soft)] shadow-[var(--admin-shadow-border)] sm:grid-cols-2 xl:grid-cols-5">
            <OverviewMetric
              icon={Users}
              label={visitorLabel(data)}
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
                {data.quality.anonymousPageViews.toLocaleString("zh-CN")} 次浏览缺少会话标识；
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
  const visitorMetric = visitorLabel(data);
  return <AdminPanel className="p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-sm font-medium text-foreground">{isVisitors ? `${visitorMetric}趋势` : "页面浏览趋势"}</h2><p className="mt-1 text-xs text-muted">{isVisitors ? "每个时间桶内按原来源标识去重；时间桶不能直接相加作为区间 UV，也不代表自然人数。" : "原来源记录的页面浏览次数。"}</p></div><MetricSwitch value={metric} onChange={setMetric} visitorMetric={visitorMetric} /></div><InteractiveLineChart ariaLabel={isVisitors ? `${visitorMetric}趋势图` : "页面浏览趋势图"} primaryLabel={isVisitors ? visitorMetric : "页面浏览"} secondaryLabel={isVisitors ? undefined : "上一周期"} secondaryIsComparison={!isVisitors} points={data.series.map((point) => ({ key: point.bucket, label: new Date(point.bucket).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }), primary: isVisitors ? point.visitors : point.pageViews, secondary: isVisitors ? undefined : point.previousPageViews }))} /></AdminPanel>;
}

function MetricSwitch({ value, onChange, visitorMetric }: { value: "visitors" | "pageViews"; onChange: (value: "visitors" | "pageViews") => void; visitorMetric: string }) {
  return <div className="inline-flex rounded-md bg-[var(--admin-input)] p-1 shadow-[var(--admin-shadow-border)]" role="group" aria-label="趋势指标">{([["visitors",visitorMetric],["pageViews","页面浏览"]] as const).map(([metric,label]) => <button key={metric} type="button" aria-pressed={value === metric} onClick={() => onChange(metric)} className={`rounded px-3 py-1.5 text-xs transition-colors ${value === metric ? "bg-[var(--admin-panel)] text-foreground shadow-[var(--admin-shadow-small)]" : "text-muted hover:text-foreground"}`}>{label}</button>)}</div>;
}

function visitorLabel(data: AnalyticsOverview): string {
  if (data.measurement?.visitorMetric === "umami_identifier") return "Umami 访客标识";
  if (data.measurement?.visitorMetric === "tab_session") return "内部会话标识";
  return "原来源去重标识";
}

function collectorLabel(data: AnalyticsOverview): string {
  if (data.measurement?.collector === "umami") return "Umami";
  if (data.measurement?.collector === "internal_legacy") return "内部事件";
  return "来源未确认";
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
