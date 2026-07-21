"use client";

import Link from "next/link";
import { ArrowRight, Eye, Heart, MessageSquare, PackageCheck, Star } from "lucide-react";
import {
  AdminErrorState,
  AdminPanel,
  AdminSegmentedControl,
} from "@/components/admin/admin-ui";
import type { AnalyticsContent, AnalyticsEvents, AnalyticsRange } from "@/lib/admin/analytics-api-contract";
import { useAnalyticsContent, useAnalyticsEvents } from "@/lib/swr";
import { AnalyticsSectionNav, AnalyticsSyncStatus } from "./_content";
import { useAnalyticsRangeState } from "./_range-state";

export function AnalyticsContentPage({ initialRange = "7d", initialData, initialEvents }: { initialRange?: AnalyticsRange; initialData?: AnalyticsContent; initialEvents?: AnalyticsEvents }) {
  const { range, setRange } = useAnalyticsRangeState(initialRange);
  const content = useAnalyticsContent(range, range === initialRange ? initialData : undefined);
  const events = useAnalyticsEvents(range, range === initialRange ? initialEvents : undefined);

  return (
    <div className="space-y-6">
      <AnalyticsSectionNav view="content" range={range} />
      <AnalyticsSyncStatus syncing={content.isValidating || events.isValidating} />
      <AdminPanel className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">内容表现</p>
            <p className="mt-1 text-sm text-muted">
              区分曝光、探索、实现意向、商业意向和已验证结果。
            </p>
          </div>
          <AdminSegmentedControl<AnalyticsRange>
            value={range}
            onChange={setRange}
            ariaLabel="内容分析时间范围"
            options={[
              { value: "24h", label: "24时" },
              { value: "7d", label: "7天" },
              { value: "30d", label: "30天" },
              { value: "90d", label: "90天" },
            ]}
          />
        </div>
      </AdminPanel>

      {content.isLoading && !content.data ? <PageSkeleton /> : null}
      {!content.data && content.error ? (
        <AdminErrorState
          message={content.error.message || "加载内容分析失败。"}
          onRetry={() => content.mutate()}
        />
      ) : null}
      {content.data ? (
        <>
          <AdminPanel className="p-5 sm:p-6">
            <SectionTitle title="价值信号" description="从被看到到产生可验证结果，不把不同强度的事件混为同一指标。" />
            <ValueSignalTrack
              items={[
                { label: "曝光", value: content.data.behavior.exposure },
                { label: "探索", value: content.data.behavior.exploration },
                { label: "实现意向", value: content.data.behavior.implementation_intent },
                { label: "商业意向", value: content.data.behavior.commercial_intent },
                { label: "验证结果", value: content.data.behavior.verified_outcomes, strong: true },
              ]}
            />
          </AdminPanel>

          <AdminPanel className="p-5 sm:p-6">
            <SectionTitle title="自定义事件" description="像 Vercel Custom Events 一样，直接查看产品行为的事件次数与参与访客。" />
            {events.isLoading && !events.data ? <PageSkeleton /> : null}
            {events.data ? <EventRows rows={events.data} /> : null}
          </AdminPanel>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <AdminPanel className="p-5 sm:p-6">
              <SectionTitle title="热门风格" description="按全部有效产品行为排序，并拆出浏览、复制和导出。" />
              <div className="mt-5 space-y-1">
                {content.data.topStyles.length === 0 ? (
                  <p className="text-sm text-muted">当前时间范围内暂无风格行为。</p>
                ) : (
                  content.data.topStyles.map((style, index) => (
                    <Link
                      key={style.slug}
                      href={`/styles/${style.slug}`}
                      className="group grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-3 rounded-md px-2 py-3 hover:bg-[var(--admin-input)]"
                    >
                      <span className="font-mono text-[10px] text-[var(--admin-text-muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm text-foreground">{style.slug}</p>
                        <p className="mt-1 font-mono text-[10px] text-muted">
                          {style.views} 浏览 · {style.copies} 复制 · {style.exports} 导出
                        </p>
                      </div>
                      <span className="flex items-center gap-2 font-mono text-xs text-muted">
                        {style.total.toLocaleString("zh-CN")}
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </AdminPanel>

            <AdminPanel className="p-5 sm:p-6">
              <SectionTitle title="内容资产" description="业务表中的累计状态，不从分析事件推断。" />
              <div className="mt-6 grid grid-cols-2 gap-5">
                <AssetMetric icon={MessageSquare} label="评论" value={content.data.summary.comments} />
                <AssetMetric icon={Star} label="评分" value={content.data.summary.ratings} />
                <AssetMetric icon={Heart} label="收藏" value={content.data.summary.favorites} />
                <AssetMetric icon={PackageCheck} label="投稿" value={content.data.summary.submissionsTotal} />
              </div>
              <div className="mt-6 rounded-md bg-[var(--admin-input)] p-4 text-xs leading-6 text-muted shadow-[var(--admin-shadow-border)]">
                待审 {content.data.summary.submissionsPending} · 已通过 {content.data.summary.submissionsApproved} · 已拒绝 {content.data.summary.submissionsRejected}
              </div>
            </AdminPanel>
          </div>

          <AdminPanel className="p-5 sm:p-6">
            <SectionTitle title="社区参与趋势" description="评论、评分和收藏使用同一时间桶并独立于产品行为事件。" />
            <CommunityTrend series={content.data.series} />
          </AdminPanel>
        </>
      ) : null}
    </div>
  );
}

function EventRows({ rows }: { rows: AnalyticsEvents }) {
  if (rows.length === 0) return <p className="mt-5 text-sm text-muted">当前时间范围内暂无自定义事件。</p>;
  return <div className="mt-5 divide-y divide-[var(--admin-border-soft)]">{rows.map((row) => <div key={row.event} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 py-3"><div className="min-w-0"><p className="truncate font-mono text-xs text-foreground">{row.event}</p><p className="mt-1 text-[11px] text-muted">{row.visitors.toLocaleString("zh-CN")} 位访客 · {row.share.toFixed(1)}%</p></div><p className="font-mono text-sm tabular-nums text-foreground">{row.count.toLocaleString("zh-CN")}</p></div>)}</div>;
}

function SectionTitle({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-sm font-medium text-foreground">{title}</h2>
      <p className="mt-1 text-xs leading-5 text-muted">{description}</p>
    </div>
  );
}

function ValueSignalTrack({
  items,
}: {
  items: Array<{ label: string; value: number; strong?: boolean }>;
}) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return (
    <div className="relative mt-7 grid gap-5 md:grid-cols-5">
      <div className="absolute left-[10%] right-[10%] top-3 hidden h-px bg-[var(--admin-border-emphasis)] md:block" aria-hidden="true" />
      {items.map((item, index) => (
        <div key={item.label} className="relative min-w-0">
          <div className="flex items-center gap-3 md:block">
            <span
              className={`relative z-10 block h-6 w-6 shrink-0 rounded-full border-4 border-[var(--admin-panel)] shadow-[var(--admin-shadow-border)] ${
                item.strong ? "bg-[var(--admin-status-green)]" : "bg-[var(--admin-status-blue)]"
              }`}
              aria-hidden="true"
            />
            <div className="min-w-0 md:mt-4">
              <p className="text-xs text-muted">{String(index + 1).padStart(2, "0")} · {item.label}</p>
              <p className={`mt-1 font-mono text-2xl font-semibold tabular-nums ${item.strong ? "text-[var(--admin-status-green)]" : "text-foreground"}`}>
                {item.value.toLocaleString("zh-CN")}
              </p>
            </div>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-[var(--admin-input)]">
            <div
              className={`h-full rounded-full ${item.strong ? "bg-[var(--admin-status-green)]" : "bg-[var(--admin-status-blue)]"}`}
              style={{ width: `${Math.max((item.value / max) * 100, item.value > 0 ? 3 : 0)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function AssetMetric({ icon: Icon, label, value }: { icon: typeof Eye; label: string; value: number }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-xs text-muted">
        <Icon className="h-4 w-4" strokeWidth={1.5} /> {label}
      </p>
      <p className="mt-2 font-mono text-xl font-semibold tabular-nums text-foreground">
        {value.toLocaleString("zh-CN")}
      </p>
    </div>
  );
}

function CommunityTrend({ series }: { series: Array<{ bucket: string; comments: number; ratings: number; favorites: number }> }) {
  const values = series.map((point) => point.comments + point.ratings + point.favorites);
  const total = values.reduce((sum, value) => sum + value, 0);
  const max = Math.max(...values, 1);
  if (total === 0) {
    return (
      <div className="mt-6 flex min-h-32 items-center justify-center rounded-md bg-[var(--admin-input)] px-6 text-center shadow-[var(--admin-shadow-border)]">
        <p className="max-w-md text-sm leading-6 text-muted">
          当前时间范围内没有新的评论、评分或收藏。切换到更长时间范围可查看历史参与趋势。
        </p>
      </div>
    );
  }
  return (
    <div className="mt-6">
      <div className="flex h-52 items-end gap-1" role="img" aria-label="社区参与趋势柱状图">
        {series.map((point, index) => (
          <div
            key={point.bucket}
            className="group relative flex h-full min-w-0 flex-1 items-end outline-none"
            tabIndex={0}
            aria-label={`${new Date(point.bucket).toLocaleString("zh-CN")}，评论 ${point.comments}，评分 ${point.ratings}，收藏 ${point.favorites}`}
          >
            <div
              className="w-full rounded-t-[3px] bg-[var(--admin-status-blue)] opacity-75 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ height: `${Math.max(((values[index] ?? 0) / max) * 100, (values[index] ?? 0) > 0 ? 3 : 0)}%` }}
            />
            <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden min-w-40 -translate-x-1/2 rounded-md bg-[var(--admin-panel)] px-3 py-2 text-xs shadow-[var(--admin-shadow-menu)] group-hover:block group-focus-visible:block">
              <p className="whitespace-nowrap font-medium text-foreground">{new Date(point.bucket).toLocaleString("zh-CN")}</p>
              <p className="mt-1 flex justify-between gap-4 text-muted"><span>评论</span><span className="font-mono text-foreground">{point.comments}</span></p>
              <p className="mt-1 flex justify-between gap-4 text-muted"><span>评分</span><span className="font-mono text-foreground">{point.ratings}</span></p>
              <p className="mt-1 flex justify-between gap-4 text-muted"><span>收藏</span><span className="font-mono text-foreground">{point.favorites}</span></p>
            </div>
          </div>
        ))}
      </div>
      <details className="mt-4 text-xs text-muted">
        <summary className="cursor-pointer">查看图表数据</summary>
        <div className="mt-2 max-h-48 overflow-auto rounded-md bg-[var(--admin-input)] p-3">
          {series.map((point) => (
            <div key={point.bucket} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 py-1 font-mono">
              <span>{new Date(point.bucket).toLocaleString("zh-CN")}</span>
              <span>{point.comments} 评论</span>
              <span>{point.ratings} 评分</span>
              <span>{point.favorites} 收藏</span>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="space-y-6" aria-label="正在加载内容分析">
      <div className="h-40 animate-pulse rounded-xl bg-[var(--admin-input)]" />
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="h-72 animate-pulse rounded-xl bg-[var(--admin-input)]" />
        <div className="h-72 animate-pulse rounded-xl bg-[var(--admin-input)]" />
      </div>
    </div>
  );
}
