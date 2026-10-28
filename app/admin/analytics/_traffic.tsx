"use client";

import { Globe2, Laptop, Megaphone, MonitorSmartphone, Network, Route, Search, Server } from "lucide-react";
import { useState } from "react";
import {
  AdminErrorState,
  AdminPanel,
  AdminSegmentedControl,
} from "@/components/admin/admin-ui";
import type {
  AnalyticsBreakdown,
  AnalyticsBreakdownDimension,
  AnalyticsOverview,
  AnalyticsRange,
} from "@/lib/admin/analytics-api-contract";
import { countsAreVisitors, getBreakdownCount } from "@/lib/admin/analytics-breakdown";
import {
  AnalyticsMeasurementNote,
  getVisitorMetricLabel,
} from "@/components/admin/analytics-measurement-note";
import { useAnalyticsBreakdown, useAnalyticsOverview } from "@/lib/swr";
import { AnalyticsSectionNav, AnalyticsSyncStatus } from "./_content";
import { useAnalyticsRangeState } from "./_range-state";
import { InteractiveLineChart } from "./_interactive-line-chart";

export interface TrafficSnapshots {
  overview?: AnalyticsOverview;
  path?: AnalyticsBreakdown;
  referrer?: AnalyticsBreakdown;
  country?: AnalyticsBreakdown;
  browser?: AnalyticsBreakdown;
  device?: AnalyticsBreakdown;
  os?: AnalyticsBreakdown;
  hostname?: AnalyticsBreakdown;
  utm_source?: AnalyticsBreakdown;
  utm_medium?: AnalyticsBreakdown;
  utm_campaign?: AnalyticsBreakdown;
}

export function AnalyticsTrafficPage({ initialRange = "7d", initialData = {} }: { initialRange?: AnalyticsRange; initialData?: TrafficSnapshots }) {  const { range, setRange } = useAnalyticsRangeState(initialRange);
  const initial = range === initialRange ? initialData : {};
  const overview = useAnalyticsOverview(range, initial.overview);
  const breakdownVisitorLabel = getBreakdownVisitorLabel(overview.data?.measurement);
  const pages = useAnalyticsBreakdown(range, "path", 10, initial.path);
  const referrers = useAnalyticsBreakdown(range, "referrer", 10, initial.referrer);
  const countries = useAnalyticsBreakdown(range, "country", 8, initial.country);
  const browsers = useAnalyticsBreakdown(range, "browser", 6, initial.browser);
  const devices = useAnalyticsBreakdown(range, "device", 6, initial.device);
  const operatingSystems = useAnalyticsBreakdown(range, "os", 6, initial.os);
  const hostnames = useAnalyticsBreakdown(range, "hostname", 6, initial.hostname);
  const utmSources = useAnalyticsBreakdown(range, "utm_source", 8, initial.utm_source);
  const utmMediums = useAnalyticsBreakdown(range, "utm_medium", 8, initial.utm_medium);
  const utmCampaigns = useAnalyticsBreakdown(range, "utm_campaign", 8, initial.utm_campaign);

  return (
    <div className="space-y-6">
      <AnalyticsSectionNav view="traffic" range={range} />
      <AnalyticsSyncStatus syncing={overview.isValidating} generatedAt={overview.data?.quality.generatedAt} />
      <AdminPanel className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">流量调查</p>
            <p className="mt-1 text-sm text-muted">
              点击一个维度继续调查；各面板独立加载，来源与返回范围见面板说明。
            </p>
          </div>
          <AdminSegmentedControl<AnalyticsRange>
            value={range}
            onChange={setRange}
            ariaLabel="流量分析时间范围"
            options={[
              { value: "24h", label: "24时" },
              { value: "7d", label: "7天" },
              { value: "30d", label: "30天" },
              { value: "90d", label: "90天" },
            ]}
          />
        </div>
      </AdminPanel>

      <AnalyticsMeasurementNote
        measurement={overview.data?.measurement}
        qualityStatus={overview.data?.quality.status}
        showBreakdownSource
      />

      <AdminPanel className="p-5 sm:p-6">
        <PanelHeading
          title="访问趋势"
          description="切换查看访客标识或页面浏览；两种指标使用各自刻度。访客标识不是真人数量，时区为 Asia/Shanghai。"
        />
        {overview.isLoading && !overview.data ? <PanelSkeleton tall /> : null}
        {!overview.data && overview.error ? (
          <PanelError message={overview.error.message} retry={() => overview.mutate()} />
        ) : null}
        {overview.data ? (
          <TrafficTrend
            data={overview.data.series}
            visitorLabel={getVisitorMetricLabel(overview.data.measurement)}
          />
        ) : null}
      </AdminPanel>

      <div className="grid gap-6 xl:grid-cols-2">
        <BreakdownPanel
          icon={Route}
          title="热门页面"
          description="浏览量最高的规范化页面路径。"
          dimension="path"
          visitorLabel={breakdownVisitorLabel}
          state={pages}
        />
        <BreakdownPanel
          icon={Search}
          title="访问来源"
          description="访客首次进入网站时记录的外部来源。"
          dimension="referrer"
          visitorLabel={breakdownVisitorLabel}
          state={referrers}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2 2xl:grid-cols-4">
        <BreakdownPanel
          icon={Globe2}
          title="国家和地区"
          description="仅统计可信入口能够解析的地域。"
          dimension="country"
          visitorLabel={breakdownVisitorLabel}
          state={countries}
        />
        <BreakdownPanel
          icon={Laptop}
          title="浏览器"
          description="根据访问来源报告的 User-Agent 解析浏览器类别。"
          dimension="browser"
          visitorLabel={breakdownVisitorLabel}
          state={browsers}
        />
        <BreakdownPanel
          icon={MonitorSmartphone}
          title="设备"
          description="桌面、移动端和平板；设备类别不能证实访问来自真人。"
          dimension="device"
          visitorLabel={breakdownVisitorLabel}
          state={devices}
        />
        <BreakdownPanel
          icon={Laptop}
          title="操作系统"
          description="根据访问来源报告的 User-Agent 归类操作系统。"
          dimension="os"
          visitorLabel={breakdownVisitorLabel}
          state={operatingSystems}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <BreakdownPanel
          icon={Server}
          title="主机名"
          description="区分主域名、预览域名和其他有效入口。"
          dimension="hostname"
          visitorLabel={breakdownVisitorLabel}
          state={hostnames}
        />
        <AdminPanel className="p-5 sm:p-6">
          <PanelHeading title="活动归因" description="UTM 仅从本次上线后的页面访问开始完整采集。" icon={Megaphone} />
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <CompactBreakdown title="来源" dimension="utm_source" visitorLabel={breakdownVisitorLabel} state={utmSources} icon={Network} />
            <CompactBreakdown title="媒介" dimension="utm_medium" visitorLabel={breakdownVisitorLabel} state={utmMediums} icon={Search} />
            <CompactBreakdown title="活动" dimension="utm_campaign" visitorLabel={breakdownVisitorLabel} state={utmCampaigns} icon={Megaphone} />
          </div>
        </AdminPanel>
      </div>
    </div>
  );
}

function CompactBreakdown({
  title,
  dimension,
  visitorLabel,
  state,
  icon: Icon,
}: {
  title: string;
  dimension: AnalyticsBreakdownDimension;
  visitorLabel: string;
  state: BreakdownState;
  icon: typeof Route;
}) {
  const countLabel = countsAreVisitors(dimension) ? visitorLabel : "页面浏览";
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-2 text-xs font-medium text-muted">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </p>
      <p className="mt-1 text-[10px] leading-4 text-[var(--admin-text-muted)]">
        数值按{countLabel}计；占比仅基于返回项。
      </p>
      {state.isLoading && !state.data ? (
        <PanelSkeleton />
      ) : state.data ? (
        <BreakdownRows rows={state.data.slice(0, 5)} dimension={dimension} />
      ) : (
        <p className="mt-4 text-xs text-muted">暂无数据</p>
      )}
    </div>
  );
}

type BreakdownState = ReturnType<typeof useAnalyticsBreakdown>;

function getBreakdownVisitorLabel(
  measurement?: AnalyticsOverview["measurement"]
): string {
  if (
    !measurement ||
    (measurement.source !== "umami_snapshot" &&
      measurement.source !== "internal_events")
  ) {
    return "访客口径待核验";
  }
  return getVisitorMetricLabel(measurement);
}

function BreakdownPanel({
  icon: Icon,
  title,
  description,
  dimension,
  visitorLabel,
  state,
}: {
  icon: typeof Route;
  title: string;
  description: string;
  dimension: AnalyticsBreakdownDimension;
  visitorLabel: string;
  state: BreakdownState;
}) {
  const countLabel = countsAreVisitors(dimension) ? visitorLabel : "页面浏览";
  return (
    <AdminPanel className="p-5 sm:p-6">
      <PanelHeading
        title={title}
        description={`${description} 数值按${countLabel}计；占比基于接口返回结果，可能不含全部项目。`}
        icon={Icon}
      />
      {state.isLoading && !state.data ? <PanelSkeleton /> : null}
      {!state.data && state.error ? (
        <PanelError message={state.error.message} retry={() => state.mutate()} />
      ) : null}
      {state.data ? <BreakdownRows rows={state.data} dimension={dimension} /> : null}
    </AdminPanel>
  );
}

function PanelHeading({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon?: typeof Route;
}) {
  return (
    <div>
      <h2 className="flex items-center gap-2 text-sm font-medium text-foreground">
        {Icon ? <Icon className="h-4 w-4 text-muted" strokeWidth={1.5} /> : null}
        {title}
      </h2>
      <p className="mt-1 text-xs leading-5 text-muted">{description}</p>
    </div>
  );
}

function BreakdownRows({
  rows,
  dimension,
}: {
  rows: AnalyticsBreakdown;
  dimension: AnalyticsBreakdownDimension;
}) {
  if (rows.length === 0) {
    return <p className="mt-5 text-sm text-muted">当前时间范围内暂无数据。</p>;
  }

  return (
    <div className="mt-5 space-y-1">
      {rows.map((row, index) => (
        <div key={row.value} className="rounded-md px-2 py-3 hover:bg-[var(--admin-input)]">
          <div className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-3">
            <span className="font-mono text-[10px] text-[var(--admin-text-muted)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="truncate text-sm text-foreground">{row.value}</span>
            <span className="font-mono text-xs tabular-nums text-muted">
              {getBreakdownCount(row, dimension).toLocaleString("zh-CN")}
            </span>
          </div>
          <div className="ml-10 mt-2 h-0.5 overflow-hidden bg-[var(--admin-input)]">
            <div
              className="h-full bg-[var(--admin-text-primary)]"
              style={{ width: `${Math.min(row.share, 100)}%` }}
            />
          </div>
          <p className="ml-10 mt-1 font-mono text-[10px] text-[var(--admin-text-muted)]">
            占返回项 {row.share.toFixed(1)}%
          </p>
        </div>
      ))}
    </div>
  );
}

function TrafficTrend({
  data,
  visitorLabel,
}: {
  data: Array<{ bucket: string; pageViews: number; visitors: number }>;
  visitorLabel: string;
}) {
  const [metric, setMetric] = useState<"visitors" | "pageViews">("visitors");
  const points = (metric: "pageViews" | "visitors") => data.map((point) => ({
        key: point.bucket,
        label: new Date(point.bucket).toLocaleString("zh-CN"),
        primary: point[metric],
      }));
  return (
    <div>
      <div className="mt-4 flex justify-end">
        <div className="inline-flex rounded-md bg-[var(--admin-input)] p-1 shadow-[var(--admin-shadow-border)]" role="group" aria-label="流量趋势指标">
          <button
            type="button"
            aria-pressed={metric === "visitors"}
            onClick={() => setMetric("visitors")}
            className={`min-h-11 rounded px-3 py-1.5 text-xs sm:min-h-9 ${metric === "visitors" ? "bg-[var(--admin-panel)] text-foreground shadow-[var(--admin-shadow-small)]" : "text-muted"}`}
          >
            {visitorLabel}
          </button>
          <button
            type="button"
            aria-pressed={metric === "pageViews"}
            onClick={() => setMetric("pageViews")}
            className={`min-h-11 rounded px-3 py-1.5 text-xs sm:min-h-9 ${metric === "pageViews" ? "bg-[var(--admin-panel)] text-foreground shadow-[var(--admin-shadow-small)]" : "text-muted"}`}
          >
            页面浏览
          </button>
        </div>
      </div>
      <InteractiveLineChart
        ariaLabel={metric === "visitors" ? `${visitorLabel}趋势` : "页面浏览趋势"}
        primaryLabel={metric === "visitors" ? visitorLabel : "页面浏览"}
        points={points(metric)}
      />
    </div>
  );
}

function PanelSkeleton({ tall = false }: { tall?: boolean }) {
  return <div className={`mt-5 animate-pulse rounded-md bg-[var(--admin-input)] ${tall ? "h-64" : "h-48"}`} />;
}

function PanelError({ message, retry }: { message: string; retry: () => void }) {
  return (
    <div className="mt-5">
      <AdminErrorState message={message || "加载该面板失败。"} onRetry={retry} />
    </div>
  );
}
