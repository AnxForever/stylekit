"use client";

import Link from "next/link";
import { AdminPanel } from "@/components/admin/admin-ui";
import { prefetchAnalyticsView } from "@/lib/swr/analytics-prefetch";
import type { AnalyticsRange } from "@/lib/admin/analytics-api-contract";

type TimeRange = "24h" | "7d" | "30d" | "90d";
export type AnalyticsView = "overview" | "traffic" | "content" | "users" | "audit";

const ANALYTICS_VIEWS: Array<{ href: string; label: string; view: AnalyticsView }> = [
  { href: "/admin/analytics", label: "概览", view: "overview" },
  { href: "/admin/analytics/traffic", label: "流量", view: "traffic" },
  { href: "/admin/analytics/content", label: "内容", view: "content" },
  { href: "/admin/analytics/users", label: "用户", view: "users" },
  { href: "/admin/analytics/audit", label: "审计", view: "audit" },
];

export function AnalyticsSectionNav({
  view,
  range,
}: {
  view: AnalyticsView;
  range?: TimeRange;
}) {
  return (
    <nav aria-label="数据分析分区" className="overflow-x-auto">
      <div className="flex min-w-max gap-1 rounded-lg bg-[var(--admin-input)] p-1 shadow-[var(--admin-shadow-border)]">
        {ANALYTICS_VIEWS.map((item) => (
          <Link
            key={item.view}
            href={range ? `${item.href}?range=${range}` : item.href}
            aria-current={view === item.view ? "page" : undefined}
            onMouseEnter={() => void prefetchAnalyticsView(item.view, (range ?? "7d") as AnalyticsRange)}
            onFocus={() => void prefetchAnalyticsView(item.view, (range ?? "7d") as AnalyticsRange)}
            className={`rounded-md px-3 py-2 text-sm transition-colors ${
              view === item.view
                ? "bg-[var(--admin-panel)] font-medium text-foreground shadow-[var(--admin-shadow-small)]"
                : "text-muted hover:bg-[var(--admin-hover)] hover:text-foreground"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function AnalyticsSyncStatus({ syncing, generatedAt }: { syncing: boolean; generatedAt?: string }) {
  return <p className="text-right text-[11px] text-[var(--admin-text-muted)]" role="status" aria-live="polite">{syncing ? "正在后台同步最新数据…" : generatedAt ? `数据更新于 ${new Date(generatedAt).toLocaleString("zh-CN")}` : "数据已同步"}</p>;
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
