"use client";

import { useMemo, useState } from "react";
import { Clock3, Download } from "lucide-react";
import {
  AdminButton,
  AdminErrorState,
  AdminField,
  AdminInput,
  AdminPagination,
  AdminPanel,
  AdminSegmentedControl,
} from "@/components/admin/admin-ui";
import { useAdminAuditEvents } from "@/lib/swr";
import type { AdminAuditData } from "@/lib/swr";
import { AnalyticsSectionNav, AnalyticsSyncStatus } from "./_content";

type ActionFilter = "all" | "submission.approve" | "submission.reject";
type TimeFilter = "24h" | "7d" | "30d" | "all";
const PAGE_SIZE = 12;

export function AnalyticsAuditPage({ initialData }: { initialData?: AdminAuditData }) {
  const [action, setAction] = useState<ActionFilter>("all");
  const [time, setTime] = useState<TimeFilter>("7d");
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const days: number | "all" =
    time === "24h" ? 1 : time === "7d" ? 7 : time === "30d" ? 30 : "all";
  const query = useMemo(
    () => ({ limit: PAGE_SIZE, offset, action, days, search }),
    [action, days, offset, search]
  );
  const audit = useAdminAuditEvents(query, offset === 0 && action === "all" && time === "7d" && !search ? initialData : undefined);
  const totalPages = audit.data
    ? Math.max(1, Math.ceil(audit.data.total / audit.data.limit))
    : 1;
  const page = audit.data
    ? Math.floor(audit.data.offset / audit.data.limit) + 1
    : 1;

  const exportHref = useMemo(() => {
    const params = new URLSearchParams({ format: "csv" });
    if (action !== "all") params.set("action", action);
    if (days !== "all") params.set("days", String(days));
    if (search.trim()) params.set("search", search.trim());
    return `/api/admin/audit?${params.toString()}`;
  }, [action, days, search]);

  return (
    <div className="space-y-6">
      <AnalyticsSectionNav view="audit" />
      <AnalyticsSyncStatus syncing={audit.isValidating} />
      <AdminPanel className="p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">操作审计</p>
            <p className="mt-1 text-sm text-muted">
              审计日志独立于访问分析，不读取 analytics_events。
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <AdminSegmentedControl<ActionFilter>
              value={action}
              onChange={(value) => { setAction(value); setOffset(0); }}
              ariaLabel="审计操作筛选"
              options={[
                { value: "all", label: "全部" },
                { value: "submission.approve", label: "已通过" },
                { value: "submission.reject", label: "已驳回" },
              ]}
            />
            <AdminSegmentedControl<TimeFilter>
              value={time}
              onChange={(value) => { setTime(value); setOffset(0); }}
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
      </AdminPanel>

      <AdminPanel className="p-5 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <AdminField label="搜索审计记录">
            <AdminInput
              value={search}
              onChange={(event) => { setSearch(event.target.value); setOffset(0); }}
              placeholder="风格、操作者、目标或 ID"
            />
          </AdminField>
          <AdminButton onClick={() => window.location.assign(exportHref)}>
            <Download className="h-4 w-4" strokeWidth={1.5} />
            导出 CSV
          </AdminButton>
        </div>

        {audit.isLoading && !audit.data ? (
          <div className="mt-6 h-64 animate-pulse rounded-md bg-[var(--admin-input)]" />
        ) : null}
        {!audit.data && audit.error ? (
          <div className="mt-6">
            <AdminErrorState
              message={audit.error.message || "加载审计记录失败。"}
              onRetry={() => audit.mutate()}
            />
          </div>
        ) : null}
        {audit.data ? (
          <>
            <div className="mt-6 space-y-1">
              {audit.data.events.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted">没有符合当前条件的操作。</p>
              ) : (
                audit.data.events.map((event) => (
                  <div
                    key={event.id}
                    className="grid gap-2 rounded-md px-2 py-3 hover:bg-[var(--admin-input)] md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
                  >
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <span
                          className={`h-2 w-2 rounded-full ${event.action === "submission.reject" ? "bg-[var(--admin-status-red)]" : "bg-[var(--admin-status-green)]"}`}
                        />
                        {formatAction(event.action)}
                      </p>
                      <p className="mt-1 truncate font-mono text-xs text-muted">
                        {event.actor.type}:{event.actor.id} · {event.targetType}
                        {event.targetId ? `:${event.targetId}` : ""}
                      </p>
                    </div>
                    <p className="flex items-center gap-1.5 text-xs text-muted">
                      <Clock3 className="h-3.5 w-3.5" strokeWidth={1.5} />
                      {new Date(event.createdAt).toLocaleString("zh-CN")}
                    </p>
                  </div>
                ))
              )}
            </div>
            {audit.data.total > 0 ? (
              <div className="mt-6">
                <AdminPagination
                  page={page}
                  totalPages={totalPages}
                  summary={`共 ${audit.data.total.toLocaleString("zh-CN")} 条操作`}
                  hasPrev={audit.data.offset > 0}
                  hasNext={audit.data.hasMore}
                  onPrev={() => setOffset(Math.max(0, audit.data!.offset - PAGE_SIZE))}
                  onNext={() => {
                    if (audit.data?.nextOffset != null) setOffset(audit.data.nextOffset);
                  }}
                />
              </div>
            ) : null}
          </>
        ) : null}
      </AdminPanel>
    </div>
  );
}

function formatAction(action: string): string {
  if (action === "submission.approve") return "通过投稿";
  if (action === "submission.reject") return "拒绝投稿";
  return action;
}
