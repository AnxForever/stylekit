"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckCircle, EyeOff, RefreshCw, RotateCcw, XCircle } from "lucide-react";
import {
  AdminBadge,
  AdminButton,
  AdminCountPill,
  AdminEmptyState,
  AdminErrorState,
  AdminLoadingState,
  AdminPanel,
  AdminTextarea,
  AdminToolbar,
} from "@/components/admin/admin-ui";
import type { CommunityReport, ReportStatus } from "@/lib/community/moderation";

const REASON_LABEL: Record<string, string> = {
  plagiarism: "抄袭",
  broken: "无法使用",
  inappropriate: "内容不当",
  mislabeled: "分类错误",
  other: "其他",
};

const STATUS_LABEL: Record<ReportStatus, string> = {
  open: "待处理",
  reviewed: "已处理",
  dismissed: "已驳回",
};

const FILTERS: { value: ReportStatus | "all"; label: string }[] = [
  { value: "open", label: "待处理" },
  { value: "reviewed", label: "已处理" },
  { value: "dismissed", label: "已驳回" },
  { value: "all", label: "全部" },
];

export function AdminCommunityReportsContent() {
  const [reports, setReports] = useState<CommunityReport[]>([]);
  const [filter, setFilter] = useState<ReportStatus | "all">("open");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actingId, setActingId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const load = useCallback(
    async (showLoading = true) => {
      if (showLoading) setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/admin/community-reports?status=${filter}`);
        if (!res.ok) throw new Error("加载举报队列失败。");
        const data = (await res.json()) as { reports?: CommunityReport[] };
        setReports(data.reports ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "加载举报队列失败。");
      } finally {
        setLoading(false);
      }
    },
    [filter],
  );

  // Scheduling the fetch on a microtask keeps the effect itself free of a
  // synchronous setState, which would otherwise cascade a second render pass
  // on every filter change.
  useEffect(() => {
    let cancelled = false;
    void Promise.resolve().then(() => {
      if (!cancelled) void load();
    });
    return () => {
      cancelled = true;
    };
  }, [load]);

  async function act(report: CommunityReport, action: "uphold" | "dismiss" | "restore") {
    setActingId(report.id);
    setError(null);
    try {
      const res = await fetch("/api/admin/community-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportId: report.id,
          action,
          note: notes[report.id] || undefined,
        }),
      });
      const payload = (await res.json().catch(() => null)) as
        | { success?: boolean; error?: string }
        | null;
      if (!res.ok || !payload?.success) {
        throw new Error(payload?.error ?? "处理举报失败。");
      }
      await load(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "处理举报失败。");
    } finally {
      setActingId(null);
    }
  }

  const openCount = reports.filter((item) => item.status === "open").length;

  return (
    <div className="space-y-4">
      <AdminToolbar
        title="举报队列"
        description="读者举报驱动的复审队列。受理会立即把风格从社区目录下架，驳回则只关闭举报。"
        meta={<AdminCountPill>{`${openCount} 条待处理`}</AdminCountPill>}
        actions={
          <>
            {FILTERS.map((option) => (
              <AdminButton
                key={option.value}
                onClick={() => setFilter(option.value)}
                tone={filter === option.value ? "primary" : "ghost"}
                size="sm"
              >
                {option.label}
              </AdminButton>
            ))}
            <AdminButton onClick={() => void load()} tone="ghost" size="sm">
              <RefreshCw className="h-4 w-4" />
            </AdminButton>
          </>
        }
      />

      {error ? <AdminErrorState message={error} onRetry={() => void load()} /> : null}

      {loading ? (
        <AdminLoadingState />
      ) : reports.length === 0 ? (
        <AdminEmptyState
          title="没有举报"
          description="当前筛选条件下没有举报记录。社区内容目前是干净的。"
        />
      ) : (
        <div className="space-y-3">
          {reports.map((report) => (
            <AdminPanel key={report.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <code className="text-sm font-medium">
                      {report.submissionSlug ?? report.submissionId}
                    </code>
                    <AdminBadge tone={report.status === "open" ? "warning" : "neutral"}>
                      {STATUS_LABEL[report.status]}
                    </AdminBadge>
                    <AdminBadge tone="danger">
                      {REASON_LABEL[report.reason] ?? report.reason}
                    </AdminBadge>
                  </div>

                  {report.detail ? (
                    <p className="max-w-2xl text-sm text-muted">{report.detail}</p>
                  ) : null}

                  <p className="text-xs text-muted">
                    {new Date(report.createdAt).toLocaleString("zh-CN")}
                    {report.reporterId ? " · 实名举报" : " · 匿名举报"}
                    {report.reviewNote ? ` · 处理备注：${report.reviewNote}` : ""}
                  </p>
                </div>

                {report.status === "open" ? (
                  <div className="w-full max-w-xs space-y-2">
                    <AdminTextarea
                      value={notes[report.id] ?? ""}
                      onChange={(event) =>
                        setNotes((current) => ({
                          ...current,
                          [report.id]: event.target.value,
                        }))
                      }
                      placeholder="处理备注（可选）..."
                      rows={2}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <AdminButton
                        disabled={actingId === report.id}
                        onClick={() => void act(report, "uphold")}
                        tone="danger"
                      >
                        <EyeOff className="h-4 w-4" />
                        受理并下架
                      </AdminButton>
                      <AdminButton
                        disabled={actingId === report.id}
                        onClick={() => void act(report, "dismiss")}
                        tone="ghost"
                      >
                        <XCircle className="h-4 w-4" />
                        驳回举报
                      </AdminButton>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted" />
                    <AdminButton
                      disabled={actingId === report.id}
                      onClick={() => void act(report, "restore")}
                      tone="ghost"
                      size="sm"
                    >
                      <RotateCcw className="h-4 w-4" />
                      恢复上架
                    </AdminButton>
                  </div>
                )}
              </div>
            </AdminPanel>
          ))}
        </div>
      )}
    </div>
  );
}
