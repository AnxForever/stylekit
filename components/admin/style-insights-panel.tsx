"use client";

import { Download, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import {
  AdminButton,
  AdminEmptyState,
  AdminErrorState,
  AdminInput,
  AdminLoadingState,
  AdminSection,
  AdminSegmentedControl,
} from "@/components/admin/admin-ui";
import type { AnalyticsRange } from "@/lib/admin/analytics-api-contract";
import type { StyleInsights } from "@/lib/admin/style-insights";
import {
  buildStyleInsightRows,
  createStyleInsightsCsv,
  type StyleInsightLabel,
  type StyleInsightSort,
} from "@/lib/admin/style-insights-report";
import type { ApiFetcherError } from "@/lib/swr/fetcher";

function useStyleInsights(range: AnalyticsRange) {
  return useSWR<StyleInsights, ApiFetcherError>(
    `/api/admin/analytics/style-insights?range=${range}`,
    {
      keepPreviousData: false,
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
    },
  );
}

function reportError(error: ApiFetcherError): string {
  return error.code === "ANALYTICS_MIGRATION_REQUIRED"
    ? "新版统计尚未启用，请先安装 044 分析数据库迁移，再刷新此页。"
    : error.message || "新版统计暂不可用，请稍后重试。";
}

function ReportCoverage({ data }: { data: StyleInsights }) {
  return (
    <div className="mt-4 space-y-1 text-xs leading-5 text-muted">
      <p>
        仅包含新口径上线后的站内采集数据，最多保留 {data.retentionDays} 天；历史标签页记录不回填为 UV。
        {data.firstCollectedAt
          ? ` 当前保留的首条记录：${formatDate(data.firstCollectedAt)}。`
          : " 尚无新口径记录。"}
      </p>
      <p>
        范围：{formatDate(data.range.start)} 至 {formatDate(data.range.end)}（上海时间）；
        更新：{formatDate(data.generatedAt)}。
      </p>
    </div>
  );
}

/** The primary UV metric comes only from the versioned first-party dataset. */
export function FirstPartyTrafficPanel({ range }: { range: AnalyticsRange }) {
  const { data, error, isLoading, mutate } = useStyleInsights(range);
  const coverage = data && data.traffic.pageViews > 0
    ? (1 - data.traffic.unidentifiedPageViews / data.traffic.pageViews) * 100
    : null;

  return (
    <AdminSection
      title="浏览器访客 UV"
      description="所选范围内有页面浏览的匿名浏览器标识去重；同一浏览器跨标签页、跨日只计一次。UV 不等同自然人数。"
    >
      {isLoading && !data ? <AdminLoadingState label="正在加载浏览器访客统计..." /> : null}
      {error ? <AdminErrorState message={`${data ? "刷新失败，以下保留上次结果。" : ""}${reportError(error)}`} onRetry={() => void mutate()} /> : null}
      {data ? (
        <>
          <CollectionHealthNotice health={data.collectionHealth} />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <TrafficMetric label="浏览器 UV" value={formatCount(data.traffic.visitors)} />
            <TrafficMetric label="页面浏览 PV" value={formatCount(data.traffic.pageViews)} />
            <TrafficMetric label="访问会话" value={formatCount(data.traffic.visits)} hint="30 分钟无活动后重新计次" />
            <TrafficMetric label="浏览器标识覆盖率" value={coverage === null ? "—" : `${coverage.toFixed(1)}%`} hint={`${formatCount(data.traffic.unidentifiedPageViews)} 次浏览缺少标识，不推算 UV`} />
          </div>
          <ReportCoverage data={data} />
          <p className="mt-1 text-xs leading-5 text-muted">
            更换设备、清理浏览器数据会产生新标识；拒绝统计、广告拦截或网络失败可能漏记。覆盖率仅针对已收到的浏览记录。
          </p>
        </>
      ) : null}
    </AdminSection>
  );
}

function CollectionHealthNotice({ health }: { health: StyleInsights["collectionHealth"] }) {
  if (!health || health.status === "ok") return null;
  const blocked = health.status === "blocked";
  const unavailable = health.reason === "health_unavailable";
  const capacity = (bytes: number | null) => bytes === null ? "未知" : `${(bytes / 1024 ** 3).toFixed(2)} GiB`;

  return (
    <div role={blocked ? "alert" : "status"} className="mb-5 rounded-lg border border-[var(--admin-border-emphasis)] bg-[var(--admin-input)] p-4 text-xs leading-5 text-muted">
      <p className="font-medium text-foreground">{blocked ? "新事件采集已暂停" : "统计存储容量预警"}</p>
      <p className="mt-1">
        {unavailable
          ? "容量检查暂不可用，采集服务已暂停接收新事件；请检查统计服务状态。"
          : blocked
            ? "统计存储已达到容量保护阈值，暂停接收新事件；请检查磁盘空间或扩容。"
            : "统计存储接近容量上限，目前仍在接收新事件；请检查空间并安排扩容。"}
        {blocked ? " 下方保留已保存的统计结果，暂停期间不代表网站没有访问。" : " 下方只显示已成功接收的记录，容量状态不能证明采集完整。"}
      </p>
      <p className="mt-1">数据库占用：{capacity(health.databaseBytes)}；磁盘可用：{capacity(health.freeDiskBytes)}；检查于 {formatDate(health.checkedAt)}。</p>
    </div>
  );
}

function TrafficMetric({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="min-w-0 rounded-lg bg-[var(--admin-input)] p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-foreground">{value}</p>
      {hint ? <p className="mt-2 text-[11px] leading-5 text-muted">{hint}</p> : null}
    </div>
  );
}

export function StyleInsightsPanel({ range, styles }: { range: AnalyticsRange; styles: StyleInsightLabel[] }) {
  const { data, error, isLoading, mutate } = useStyleInsights(range);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<StyleInsightSort>("uses");
  const rows = buildStyleInsightRows(styles, data, sort);
  const query = search.trim().toLocaleLowerCase();
  const visibleRows = rows.filter((row) => `${row.slug} ${row.name} ${row.nameEn}`.toLocaleLowerCase().includes(query));
  const visibleSlugs = new Set(visibleRows.map((row) => row.slug));
  const sourceRows = data?.sources.filter((row) => visibleSlugs.has(row.slug)) ?? [];

  const handleExport = () => {
    if (!data) return;
    const blob = new Blob([`\ufeff${createStyleInsightsCsv(rows, data)}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `style-insights-${range}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminSection
      title="各风格表现"
      description="按同一套浏览器标识观察曝光、点击、浏览和使用。包含尚无流量的风格，便于对比内容覆盖。"
      actions={
        <AdminButton type="button" tone="neutral" size="sm" onClick={handleExport} disabled={!data}>
          <Download className="h-3.5 w-3.5" strokeWidth={1.5} />导出风格分析 CSV
        </AdminButton>
      }
    >
      {isLoading && !data ? <AdminLoadingState label="正在加载风格表现..." /> : null}
      {error ? <AdminErrorState message={`${data ? "刷新失败，以下保留上次结果。" : ""}${reportError(error)}`} onRetry={() => void mutate()} /> : null}
      {data ? (
        <>
          <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <label className="relative block w-full xl:max-w-xs">
              <span className="sr-only">搜索风格表现</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <AdminInput type="search" placeholder="搜索名称或 slug" value={search} onChange={(event) => setSearch(event.target.value)} className="pl-9" />
            </label>
            <div className="max-w-full overflow-x-auto pb-1">
              <AdminSegmentedControl<StyleInsightSort>
                value={sort}
                onChange={setSort}
                ariaLabel="风格表现排序"
                className="whitespace-nowrap"
                options={[
                  { value: "uses", label: "使用次数" },
                  { value: "views", label: "浏览 UV" },
                  { value: "exposure", label: "曝光" },
                  { value: "ctr", label: "点击率" },
                  { value: "useRate", label: "使用率" },
                ]}
              />
            </div>
          </div>
          <p className="mb-3 text-xs leading-5 text-muted">
            显示 {visibleRows.length} / {rows.length} 个风格。每阶段显示次数与去重浏览器 UV；各风格 UV 不可相加作为全站 UV。
          </p>
          {visibleRows.length === 0 ? <AdminEmptyState title="没有匹配的风格" description="试试其他名称或 slug。" /> : (
            <div className="overflow-x-auto rounded-lg border border-[var(--admin-border-soft)]" tabIndex={0} role="region" aria-label="风格表现数据，可横向滚动">
              <table className="w-full min-w-[1520px] text-xs">
                <caption className="sr-only">各风格曝光、点击、浏览、使用和同访客转化</caption>
                <thead className="border-b border-[var(--admin-border-soft)] bg-[var(--admin-input)] text-muted">
                  <tr>
                    {["风格", "卡片曝光", "卡片点击", "详情浏览", "示例浏览", "成功复制", "导出发起", "收藏操作", "曝光后点击率", "浏览后使用率", "可见停留合计", "最大滚动深度", "缺少标识事件"].map((label, index) => <th scope="col" className={`px-3 py-3 font-medium ${index === 0 ? "text-left" : "text-right"}`} key={label}>{label}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--admin-border-soft)]">
                  {visibleRows.map((row) => (
                    <tr key={row.slug} className="hover:bg-[var(--admin-input)]/60">
                      <th scope="row" className="min-w-44 px-3 py-3 text-left font-normal">
                        <Link href={`/styles/${row.slug}`} className="font-medium text-foreground hover:underline">{row.name}</Link>
                        <span className="mt-1 block font-mono text-[10px] text-muted">{row.slug}</span>
                      </th>
                      <StageCell count={row.impressions} visitors={row.exposedVisitors} />
                      <StageCell count={row.clicks} visitors={row.clickVisitors} />
                      <StageCell count={row.detailViews} visitors={row.detailVisitors} />
                      <StageCell count={row.showcaseViews} visitors={row.showcaseVisitors} />
                      <StageCell count={row.copies} visitors={row.copyVisitors} />
                      <StageCell count={row.exports} visitors={row.exportVisitors} />
                      <td className="px-3 py-3 text-right tabular-nums"><span className="font-mono text-foreground">+{formatCount(row.favoriteAdds)} / −{formatCount(row.favoriteRemoves)}</span><span className="mt-1 block text-[10px] text-muted">{formatCount(row.favoriteVisitors)} 收藏 UV</span><span className="mt-1 block whitespace-nowrap text-[10px] text-muted">账号 {row.accountFavoriteAdds} · 本地 {row.localFavoriteAdds}</span></td>
                      <RateCell rate={row.ctr} matched={row.matchedClickVisitors} denominator={row.exposedVisitors} />
                      <RateCell rate={row.useRate} matched={row.matchedUseVisitors} denominator={row.viewVisitors} />
                      <td className="px-3 py-3 text-right tabular-nums"><span className="font-mono text-foreground">{formatDuration(row.activeMs)}</span><span className="mt-1 block text-[10px] text-muted">{formatCount(row.engagedVisitors)} UV</span></td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums text-muted">{row.activeMs > 0 ? `${row.maxScrollPercent}%` : "—"}</td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums text-muted">{formatCount(row.unidentifiedEvents)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-3 space-y-1 text-xs leading-5 text-muted">
            <p>点击率 = 同一浏览器先曝光后点击的 UV ÷ 曝光 UV；使用率 = 先浏览详情或示例、后复制或导出的 UV ÷ 浏览 UV。步骤均须发生在当前范围，分母为 0 显示「—」。</p>
            <p>曝光要求卡片至少一半可见并持续 1 秒；示例浏览统计实际到达。导出发起表示内容已交给浏览器，不代表下载保存完成或实际安装。收藏显示新增／移除操作及新增收藏 UV，账号与本地收藏分开；不是当前收藏存量。可见停留不等同阅读时长。</p>
          </div>
          <ReportCoverage data={data} />
          {sourceRows.length > 0 ? (
            <details className="mt-4 border-t border-[var(--admin-border-soft)] pt-4 text-xs">
              <summary className="cursor-pointer font-medium text-foreground">查看入口与位置（{sourceRows.length} 项）</summary>
              <div className="mt-3 max-h-96 overflow-auto" tabIndex={0} role="region" aria-label="风格入口与位置数据">
                <table className="w-full min-w-[700px] text-right">
                  <caption className="sr-only">风格在不同入口的曝光、点击和平均展示位置</caption>
                  <thead><tr>{["风格", "入口", "曝光 / UV", "点击 / UV", "平均位置"].map((label) => <th scope="col" className="px-3 py-2 font-medium text-muted" key={label}>{label}</th>)}</tr></thead>
                  <tbody className="divide-y divide-[var(--admin-border-soft)]">{sourceRows.map((row) => <tr key={`${row.slug}:${row.surface}`}><th scope="row" className="px-3 py-2 font-normal">{row.slug}</th><td className="px-3 py-2">{sourceLabel(row.surface)}</td><td className="px-3 py-2 font-mono">{row.impressions} / {row.exposedVisitors}</td><td className="px-3 py-2 font-mono">{row.clicks} / {row.clickVisitors}</td><td className="px-3 py-2 font-mono">{row.averageRank === null ? "—" : row.averageRank.toFixed(1)}</td></tr>)}</tbody>
                </table>
              </div>
              <p className="mt-2 leading-5 text-muted">平均位置来自曝光时的卡片排名。不同入口 UV 可能重叠；这里的次数不能直接相除当作匹配转化率。</p>
            </details>
          ) : null}
        </>
      ) : null}
    </AdminSection>
  );
}

function StageCell({ count, visitors }: { count: number; visitors: number }) {
  return <td className="px-3 py-3 text-right tabular-nums"><span className="font-mono text-foreground">{formatCount(count)}</span><span className="mt-1 block text-[10px] text-muted">{formatCount(visitors)} UV</span></td>;
}

function RateCell({ rate, matched, denominator }: { rate: number | null; matched: number; denominator: number }) {
  return <td className="px-3 py-3 text-right tabular-nums"><span className="font-mono text-foreground">{rate === null ? "—" : `${rate.toFixed(1)}%`}</span><span className="mt-1 block text-[10px] text-muted">{formatCount(matched)} / {formatCount(denominator)} UV</span></td>;
}

function formatCount(value: number) {
  return value.toLocaleString("zh-CN");
}

function formatDuration(ms: number) {
  const seconds = Math.floor(ms / 1000);
  return seconds >= 3600 ? `${Math.floor(seconds / 3600)} 时 ${Math.floor((seconds % 3600) / 60)} 分` : seconds >= 60 ? `${Math.floor(seconds / 60)} 分 ${seconds % 60} 秒` : `${seconds} 秒`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", hour12: false });
}

function sourceLabel(surface: string) {
  return ({ styles_catalog: "风格库", home: "首页", collection: "合集", search: "搜索", related_styles: "相关风格" } as Record<string, string>)[surface] ?? surface;
}
