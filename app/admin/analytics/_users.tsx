"use client";

import { Activity, UserCheck, UserPlus, Users } from "lucide-react";
import {
  AdminErrorState,
  AdminPanel,
  AdminSegmentedControl,
} from "@/components/admin/admin-ui";
import type { AnalyticsOverview, AnalyticsRange, AnalyticsRegistrations } from "@/lib/admin/analytics-api-contract";
import { useAnalyticsOverview, useAnalyticsRegistrations } from "@/lib/swr";
import { AnalyticsSectionNav, AnalyticsSyncStatus } from "./_content";
import { useAnalyticsRangeState } from "./_range-state";

export function AnalyticsUsersPage({ initialRange = "7d", initialOverview, initialRegistrations }: { initialRange?: AnalyticsRange; initialOverview?: AnalyticsOverview; initialRegistrations?: AnalyticsRegistrations }) {
  const { range, setRange } = useAnalyticsRangeState(initialRange);
  const overview = useAnalyticsOverview(range, range === initialRange ? initialOverview : undefined);
  const registrations = useAnalyticsRegistrations(range, range === initialRange ? initialRegistrations : undefined);

  return (
    <div className="space-y-6">
      <AnalyticsSectionNav view="users" range={range} />
      <AnalyticsSyncStatus syncing={overview.isValidating || registrations.isValidating} generatedAt={registrations.data?.generatedAt} />
      <AdminPanel className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">用户与转化</p>
            <p className="mt-1 text-sm text-muted">
              访问行为与注册数据独立加载；同期比例不等同于归因转化。
            </p>
          </div>
          <AdminSegmentedControl<AnalyticsRange>
            value={range}
            onChange={setRange}
            ariaLabel="用户分析时间范围"
            options={[
              { value: "24h", label: "24时" },
              { value: "7d", label: "7天" },
              { value: "30d", label: "30天" },
              { value: "90d", label: "90天" },
            ]}
          />
        </div>
      </AdminPanel>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminPanel className="p-5 sm:p-6">
          <SectionTitle
            title="访问参与度"
            description="访问按同一匿名标识连续 30 分钟内的行为分组。"
          />
          {overview.isLoading && !overview.data ? <Skeleton /> : null}
          {!overview.data && overview.error ? (
            <PanelError message={overview.error.message} retry={() => overview.mutate()} />
          ) : null}
          {overview.data ? (
            <div className="mt-6 space-y-5">
              <FunnelRow
                icon={Users}
                label="匿名访客"
                value={overview.data.current.visitors}
                total={overview.data.current.visitors}
              />
              <FunnelRow
                icon={Activity}
                label="访问次数"
                value={overview.data.current.visits}
                total={overview.data.current.visits}
              />
              <FunnelRow
                icon={UserCheck}
                label="有效参与访问"
                value={overview.data.current.engagedVisits}
                total={overview.data.current.visits}
              />
            </div>
          ) : null}
        </AdminPanel>

        <AdminPanel className="p-5 sm:p-6">
          <SectionTitle
            title="注册概况"
            description="直接来自 Supabase Auth，不从行为事件推断。"
          />
          {registrations.isLoading && !registrations.data ? <Skeleton /> : null}
          {!registrations.data && registrations.error ? (
            <PanelError
              message={registrations.error.message}
              retry={() => registrations.mutate()}
            />
          ) : null}
          {registrations.data ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
              <Metric label="本期新增" value={registrations.data.inRange} icon={UserPlus} />
              <Metric label="累计注册" value={registrations.data.total} icon={Users} />
            </div>
          ) : null}
        </AdminPanel>
      </div>

      <AdminPanel className="p-5 sm:p-6">
        <SectionTitle
          title="注册趋势"
          description="时间桶与访问趋势使用相同的 Asia/Shanghai 展示时区。"
        />
        {registrations.isLoading && !registrations.data ? <Skeleton tall /> : null}
        {!registrations.data && registrations.error ? (
          <PanelError
            message={registrations.error.message}
            retry={() => registrations.mutate()}
          />
        ) : null}
        {registrations.data ? (
          <RegistrationBars series={registrations.data.series} />
        ) : null}
      </AdminPanel>

      {overview.data && registrations.data ? (
        <AdminPanel className="p-5 sm:p-6">
          <SectionTitle
            title="同期注册 / 访客"
            description="用于观察两个总体规模，不代表这些注册由本期访客完成。"
          />
          <p className="mt-4 font-mono text-3xl font-semibold tabular-nums text-foreground">
            {overview.data.current.visitors > 0
              ? `${((registrations.data.inRange / overview.data.current.visitors) * 100).toFixed(1)}%`
              : "—"}
          </p>
          <p className="mt-2 text-xs leading-5 text-muted">
            真实归因需要匿名标识与登录用户的受控绑定；当前尚未采集，因此不会把此比例标记为转化率。
          </p>
        </AdminPanel>
      ) : null}
    </div>
  );
}

function SectionTitle({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-sm font-medium text-foreground">{title}</h2>
      <p className="mt-1 text-xs leading-5 text-muted">{description}</p>
    </div>
  );
}

function FunnelRow({
  icon: Icon,
  label,
  value,
  total,
}: {
  icon: typeof Users;
  label: string;
  value: number;
  total: number;
}) {
  const share = total > 0 ? (value / total) * 100 : 0;
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-sm text-[var(--admin-text-secondary)]">
          <Icon className="h-4 w-4" strokeWidth={1.5} />
          {label}
        </p>
        <p className="font-mono text-sm tabular-nums text-foreground">
          {value.toLocaleString("zh-CN")}
        </p>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-[var(--admin-input)]">
        <div
          className="h-full rounded-full bg-[var(--admin-text-primary)]"
          style={{ width: `${Math.min(share, 100)}%` }}
        />
      </div>
      <p className="mt-1 text-right font-mono text-[10px] text-[var(--admin-text-muted)]">
        {share.toFixed(1)}%
      </p>
    </div>
  );
}

function Metric({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Users }) {
  return (
    <div className="rounded-md bg-[var(--admin-input)] p-4 shadow-[var(--admin-shadow-border)]">
      <p className="flex items-center gap-2 text-xs text-muted">
        <Icon className="h-4 w-4" strokeWidth={1.5} />
        {label}
      </p>
      <p className="mt-3 font-mono text-2xl font-semibold tabular-nums text-foreground">
        {value.toLocaleString("zh-CN")}
      </p>
    </div>
  );
}

function RegistrationBars({
  series,
}: {
  series: Array<{ bucket: string; registrations: number }>;
}) {
  const max = Math.max(...series.map((point) => point.registrations), 1);
  return (
    <div className="mt-6">
      <div className="flex h-56 items-end gap-1" role="img" aria-label="注册趋势柱状图">
        {series.map((point) => (
          <div
            key={point.bucket}
            className="group relative flex h-full min-w-0 flex-1 items-end outline-none"
            tabIndex={0}
            aria-label={`${new Date(point.bucket).toLocaleString("zh-CN")}，新增注册 ${point.registrations}`}
          >
            <div
              className="w-full rounded-t-[3px] bg-[var(--admin-status-blue)] opacity-80 transition-[opacity,transform] duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ height: `${Math.max((point.registrations / max) * 100, point.registrations > 0 ? 3 : 0)}%` }}
            />
            <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden min-w-36 -translate-x-1/2 rounded-md bg-[var(--admin-panel)] px-3 py-2 text-xs shadow-[var(--admin-shadow-menu)] group-hover:block group-focus-visible:block">
              <p className="whitespace-nowrap font-medium text-foreground">{new Date(point.bucket).toLocaleString("zh-CN")}</p>
              <p className="mt-1 flex justify-between gap-4 text-muted">
                <span>新增注册</span>
                <span className="font-mono tabular-nums text-foreground">{point.registrations}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <details className="mt-4 text-xs text-muted">
        <summary className="cursor-pointer">查看图表数据</summary>
        <div className="mt-2 max-h-48 overflow-auto rounded-md bg-[var(--admin-input)] p-3">
          {series.map((point) => (
            <div key={point.bucket} className="flex justify-between gap-4 py-1 font-mono">
              <span>{new Date(point.bucket).toLocaleString("zh-CN")}</span>
              <span>{point.registrations.toLocaleString("zh-CN")}</span>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

function Skeleton({ tall = false }: { tall?: boolean }) {
  return <div className={`mt-5 animate-pulse rounded-md bg-[var(--admin-input)] ${tall ? "h-56" : "h-40"}`} />;
}

function PanelError({ message, retry }: { message: string; retry: () => void }) {
  return (
    <div className="mt-5">
      <AdminErrorState message={message || "加载该面板失败。"} onRetry={retry} />
    </div>
  );
}
