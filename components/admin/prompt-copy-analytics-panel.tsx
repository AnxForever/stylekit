"use client";

import { Download, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import {
  AdminButton,
  AdminEmptyState,
  AdminErrorState,
  AdminInput,
  AdminLoadingState,
  AdminPanel,
  AdminSection,
} from "@/components/admin/admin-ui";
import type { AnalyticsRange } from "@/lib/admin/analytics-api-contract";
import type { PromptCopyAnalytics } from "@/lib/admin/prompt-copy-analytics";
import {
  buildPromptCopyReportRows,
  createPromptCopyCsv,
} from "@/lib/admin/prompt-copy-report";
import type { PromptCopyStyleLabel } from "@/lib/admin/prompt-copy-report";

export function PromptCopyAnalyticsPanel({
  range,
  styles,
  initialData,
}: {
  range: AnalyticsRange;
  styles: PromptCopyStyleLabel[];
  initialData?: PromptCopyAnalytics;
}) {
  const [search, setSearch] = useState("");
  const { cache } = useSWRConfig();
  const key = `/api/admin/analytics/prompt-copies?range=${range}`;
  const { data, error, isLoading, mutate } = useSWR<PromptCopyAnalytics>(
    key,
    {
      fallbackData: initialData,
      revalidateOnMount: initialData === undefined || cache.get(key)?.data !== undefined,
      keepPreviousData: false,
      revalidateOnFocus: false,
      dedupingInterval: 300_000,
    },
  );

  const rows = buildPromptCopyReportRows(styles, data);
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const visibleRows = normalizedSearch
    ? rows.filter((row) =>
        `${row.slug} ${row.name} ${row.nameEn}`
          .toLocaleLowerCase()
          .includes(normalizedSearch),
      )
    : rows;

  const handleExport = () => {
    if (!data) return;
    const csv = `\ufeff${createPromptCopyCsv(rows)}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `style-prompt-copies-${range}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminSection
      title="各风格提示词复制"
      description="只统计复制成功的操作。每次成功复制计 1 次；会话是匿名标签页会话，不代表去重用户。"
      actions={
        <AdminButton
          type="button"
          size="sm"
          tone="neutral"
          onClick={handleExport}
          disabled={!data}
        >
          <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
          导出当前范围 CSV
        </AdminButton>
      }
    >
      <p className="mb-4 text-xs leading-5 text-muted">
        新的独立统计从提示词复制追踪上线后开始累计；此前的代码复制事件不并入此报表，下载操作也不计为复制。
      </p>

      {isLoading && !data ? <AdminLoadingState label="正在加载提示词复制统计..." /> : null}
      {!data && error ? (
        <AdminErrorState
          message={
            error.message || "提示词复制统计暂不可用，请确认分析数据库迁移已安装后重试。"
          }
          onRetry={() => void mutate()}
        />
      ) : null}

      {data ? (
        <>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs text-muted">当前范围成功复制</p>
              <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-foreground">
                {data.totalCopies.toLocaleString("zh-CN")}
              </p>
            </div>
            <label className="relative block w-full sm:max-w-xs">
              <span className="sr-only">按风格名称或标识搜索</span>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <AdminInput
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="搜索风格名称或 slug"
                className="pl-9"
              />
            </label>
          </div>

          {rows.length === 0 ? (
            <AdminEmptyState
              title="没有可显示的风格"
              description="风格列表暂时为空。"
            />
          ) : visibleRows.length === 0 ? (
            <AdminEmptyState title="没有匹配的风格" description="试试其他风格名称或 slug。" />
          ) : (
            <AdminPanel className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1120px] text-xs">
                <caption className="sr-only">按风格统计的提示词复制次数和匿名标签页会话数</caption>
                <thead className="border-b border-[var(--admin-border-soft)] text-left text-[var(--admin-text-secondary)]">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">风格</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">成功复制</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">标签页会话</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">硬性提示词</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">柔性提示词</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">设计规范</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">创意简报</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">示例</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">配方提示词</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">项目简报</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--admin-border-soft)]">
                  {visibleRows.map((row) => (
                    <tr key={row.slug} className="hover:bg-[var(--admin-input)]/60">
                      <th scope="row" className="px-4 py-3 text-left font-normal">
                        <Link
                          href={`/styles/${row.slug}`}
                          className="font-medium text-foreground hover:underline"
                        >
                          {row.name}
                        </Link>
                        <span className="mt-1 block font-mono text-[10px] text-muted">
                          {row.slug} · {row.nameEn}
                        </span>
                      </th>
                      <td className="px-3 py-3 text-right font-mono font-semibold tabular-nums text-foreground">{row.copies.toLocaleString("zh-CN")}</td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums text-muted">{row.sessions.toLocaleString("zh-CN")}</td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums text-muted">{row.hard.toLocaleString("zh-CN")}</td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums text-muted">{row.soft.toLocaleString("zh-CN")}</td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums text-muted">{row.designSpec.toLocaleString("zh-CN")}</td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums text-muted">{row.creativeBrief.toLocaleString("zh-CN")}</td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums text-muted">{row.examples.toLocaleString("zh-CN")}</td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums text-muted">{row.recipes.toLocaleString("zh-CN")}</td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums text-muted">{row.projectBrief.toLocaleString("zh-CN")}</td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
            </AdminPanel>
          )}
        </>
      ) : null}
    </AdminSection>
  );
}
