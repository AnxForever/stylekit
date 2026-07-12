"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Archive,
  CheckCircle,
  ChevronRight,
  Clock3,
  Pencil,
  RefreshCw,
  Trash2,
  XCircle,
} from "lucide-react";
import {
  AdminBadge,
  AdminButton,
  AdminEmptyState,
  AdminErrorState,
  AdminInput,
  AdminLoadingState,
  AdminPanel,
  AdminSegmentedControl,
  AdminTextarea,
  AdminToolbar,
} from "@/components/admin/admin-ui";

interface Submission {
  id: string;
  slug: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  reviewedAt?: string;
  reviewNote?: string;
  authorName?: string;
  formData: {
    name?: string;
    nameEn?: string;
    description?: string;
    category?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
}

interface RegisterResult {
  success: boolean;
  filesWritten: string[];
  registriesPatched: string[];
  errors: string[];
}

interface FullSubmissionData {
  formData: Record<string, unknown>;
}

type FilterStatus = "all" | "pending" | "approved" | "rejected";
const DETAIL_CACHE_LIMIT = 20;
const FILTER_OPTIONS: Array<{ value: FilterStatus; label: string }> = [
  { value: "pending", label: "待审核" },
  { value: "approved", label: "已通过" },
  { value: "rejected", label: "已拒绝" },
  { value: "all", label: "全部" },
];

const STATUS_LABEL: Record<FilterStatus, string> = {
  all: "全部",
  pending: "待审核",
  approved: "已通过",
  rejected: "已拒绝",
};

const STATUS_TONE = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
} as const;

export function SubmissionsReview() {
  const canRegisterToCodebase = process.env.NODE_ENV !== "production";
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>("pending");
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [note, setNote] = useState("");
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [registerResult, setRegisterResult] = useState<RegisterResult | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editNameEn, setEditNameEn] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [savingEditId, setSavingEditId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [detailLoadingId, setDetailLoadingId] = useState<string | null>(null);
  const detailCache = useRef<Map<string, FullSubmissionData>>(new Map());

  const fetchSubmissions = useCallback(async (
    signal?: AbortSignal,
    options?: { showLoading?: boolean }
  ) => {
    const showLoading = options?.showLoading ?? true;
    if (showLoading) {
      setLoading(true);
    }
    setError(null);
    const params = filter !== "all" ? `?status=${filter}` : "";

    try {
      const res = await fetch(`/api/admin/submissions${params}`, {
        cache: "no-store",
        signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "加载投稿失败。");
      }

      const data = await res.json();
      if (signal?.aborted) return;
      setSubmissions(data.submissions ?? []);
    } catch (err) {
      if (signal?.aborted) return;
      setError(err instanceof Error ? err.message : "加载投稿失败。");
      setSubmissions([]);
    } finally {
      if (!signal?.aborted && showLoading) {
        setLoading(false);
      }
    }
  }, [filter]);

  useEffect(() => {
    const controller = new AbortController();
    void fetchSubmissions(controller.signal);
    return () => controller.abort();
  }, [fetchSubmissions]);

  useEffect(() => {
    detailCache.current.clear();
    setExpandedId(null);
    setDetailLoadingId(null);
  }, [filter]);

  function upsertDetailCache(id: string, data: FullSubmissionData) {
    const cache = detailCache.current;
    if (cache.has(id)) {
      cache.delete(id);
    }
    cache.set(id, data);
    while (cache.size > DETAIL_CACHE_LIMIT) {
      const oldestKey = cache.keys().next().value;
      if (!oldestKey) {
        break;
      }
      cache.delete(oldestKey);
    }
  }

  function patchSubmissionInList(
    id: string,
    patch: Partial<Submission> & { formData?: Partial<Submission["formData"]> }
  ) {
    setSubmissions((current) =>
      current.map((item) => {
        if (item.id !== id) {
          return item;
        }
        return {
          ...item,
          ...patch,
          formData: patch.formData ? { ...item.formData, ...patch.formData } : item.formData,
        };
      })
    );
  }

  async function handleReview(id: string, action: "approve" | "reject") {
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/submissions/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, note: note || undefined }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "提交审核失败。");
      }

      const payload = (await res.json().catch(() => null)) as
        | { submission?: { reviewedAt?: string; reviewNote?: string } }
        | null;
      const nextStatus: Submission["status"] =
        action === "approve" ? "approved" : "rejected";
      const nextReviewedAt =
        typeof payload?.submission?.reviewedAt === "string"
          ? payload.submission.reviewedAt
          : new Date().toISOString();
      const nextReviewNote =
        typeof payload?.submission?.reviewNote === "string"
          ? payload.submission.reviewNote
          : note.trim() || undefined;

      setSubmissions((current) =>
        current
          .map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: nextStatus,
                  reviewedAt: nextReviewedAt,
                  reviewNote: nextReviewNote,
                }
              : item
          )
          .filter((item) => filter === "all" || item.status === filter)
      );

      setReviewingId(null);
      setNote("");
      void fetchSubmissions(undefined, { showLoading: false });
    } catch (err) {
      setError(err instanceof Error ? err.message : "提交审核失败。");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRegister(id: string) {
    setRegisteringId(id);
    setRegisterResult(null);
    setError(null);

    try {
      const res = await fetch(`/api/admin/submissions/${id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json().catch(() => null);
      const payload = data as
        | { result?: RegisterResult; details?: RegisterResult; error?: string }
        | null;

      if (!res.ok) {
        if (payload?.details) {
          setRegisterResult(payload.details);
          setError(payload.error ?? "自动注册完成，但存在错误。");
          return;
        }
        throw new Error(payload?.error ?? "注册风格失败。");
      }

      setRegisterResult(payload?.result ?? (data as RegisterResult));
    } catch (err) {
      setError(err instanceof Error ? err.message : "注册风格失败。");
      setRegisteringId(null);
    }
  }

  function beginEdit(submission: Submission) {
    setEditingId(submission.id);
    setEditName(submission.formData.name ?? "");
    setEditNameEn(submission.formData.nameEn ?? "");
    setEditDescription(submission.formData.description ?? "");
    setError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
    setEditNameEn("");
    setEditDescription("");
  }

  async function handleSaveEdit(submission: Submission) {
    if (submission.status === "approved") {
      const confirmed = window.confirm(
        "这条投稿已通过审核，可能已经上线。仍要保存管理端修改吗？"
      );
      if (!confirmed) {
        return;
      }
    }

    const updates: Record<string, string> = {};
    const trimmedName = editName.trim();
    const trimmedNameEn = editNameEn.trim();
    const trimmedDescription = editDescription.trim();

    if (trimmedName) {
      updates.name = trimmedName;
    }
    if (trimmedNameEn) {
      updates.nameEn = trimmedNameEn;
    }
    if (trimmedDescription) {
      updates.description = trimmedDescription;
    }

    if (Object.keys(updates).length === 0) {
      setError("请至少填写一个非空字段。");
      return;
    }

    setSavingEditId(submission.id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/submissions/${submission.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "更新投稿失败。");
      }

      const updatesForList: Partial<Submission["formData"]> = {};
      if (updates.name) {
        updatesForList.name = updates.name;
      }
      if (updates.nameEn) {
        updatesForList.nameEn = updates.nameEn;
      }
      if (updates.description) {
        updatesForList.description = updates.description;
      }
      patchSubmissionInList(submission.id, { formData: updatesForList });

      const cachedDetails = detailCache.current.get(submission.id);
      if (cachedDetails) {
        upsertDetailCache(submission.id, {
          formData: {
            ...cachedDetails.formData,
            ...updatesForList,
          },
        });
      }

      cancelEdit();
      void fetchSubmissions(undefined, { showLoading: false });
    } catch (err) {
      setError(err instanceof Error ? err.message : "更新投稿失败。");
    } finally {
      setSavingEditId(null);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    setError(null);

    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "删除投稿失败。");
      }

      setSubmissions((current) => current.filter((item) => item.id !== id));
      detailCache.current.delete(id);
      if (expandedId === id) {
        setExpandedId(null);
      }
      if (editingId === id) {
        cancelEdit();
      }
      setConfirmDeleteId(null);
      void fetchSubmissions(undefined, { showLoading: false });
    } catch (err) {
      setError(err instanceof Error ? err.message : "删除投稿失败。");
    } finally {
      setDeletingId(null);
    }
  }

  async function toggleDetails(id: string) {
    if (expandedId === id) {
      setExpandedId(null);
      setDetailLoadingId((current) => (current === id ? null : current));
      return;
    }

    setExpandedId(id);
    setError(null);

    if (detailCache.current.has(id)) {
      setDetailLoadingId(null);
      return;
    }

    setDetailLoadingId(id);
    try {
      const res = await fetch(`/api/admin/submissions/${id}`);
      if (!res.ok) {
        throw new Error("加载投稿详情失败。");
      }
      const data = (await res.json()) as FullSubmissionData;
      upsertDetailCache(id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "加载详情失败。");
      setExpandedId((current) => (current === id ? null : current));
    } finally {
      setDetailLoadingId((current) => (current === id ? null : current));
    }
  }

  const queueSummary = useMemo(
    () =>
      submissions.reduce(
        (summary, submission) => {
          summary[submission.status] += 1;
          return summary;
        },
        { pending: 0, approved: 0, rejected: 0 }
      ),
    [submissions]
  );

  return (
    <div className="space-y-5">
      <AdminToolbar
        title="审核队列"
        description={`当前显示 ${submissions.length} 条${filter === "all" ? "" : STATUS_LABEL[filter]}投稿。待审核 ${queueSummary.pending} 条，已通过 ${queueSummary.approved} 条，已拒绝 ${queueSummary.rejected} 条。`}
        meta={<AdminBadge tone={filter === "pending" ? "warning" : "neutral"}>{STATUS_LABEL[filter]}</AdminBadge>}
        actions={
          <>
            <AdminSegmentedControl<FilterStatus>
              value={filter}
              onChange={setFilter}
              ariaLabel="投稿状态筛选"
              options={FILTER_OPTIONS}
            />
            <AdminButton
              onClick={() => {
                void fetchSubmissions();
              }}
              size="icon"
              aria-label="刷新投稿"
            >
              <RefreshCw className="h-4 w-4" />
            </AdminButton>
          </>
        }
      />

      {error && (
        <AdminErrorState message={error} onRetry={() => void fetchSubmissions()} />
      )}

      {loading && <AdminLoadingState label="正在加载投稿..." />}

      {!loading && submissions.length === 0 && (
        <AdminEmptyState
          title={`暂无${filter !== "all" ? STATUS_LABEL[filter] : ""}投稿`}
          description="可以切换审核队列，或等待新的风格投稿。"
        />
      )}

      <div className="space-y-4">
        {submissions.map((sub) => (
          <AdminPanel
            key={sub.id}
            className="overflow-hidden"
          >
            <div className="grid gap-0 lg:grid-cols-[1fr_300px]">
              <div className="min-w-0 p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold">
                        {sub.formData.name || sub.slug}
                      </h3>
                      <AdminBadge tone={STATUS_TONE[sub.status]}>{STATUS_LABEL[sub.status]}</AdminBadge>
                    </div>
                    {sub.formData.nameEn ? (
                      <p className="mt-1 text-xs text-muted">{sub.formData.nameEn}</p>
                    ) : null}
                    {sub.formData.description ? (
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
                        {sub.formData.description}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-4 grid gap-2 text-xs text-muted sm:grid-cols-2 xl:grid-cols-4">
                  <span>
                    标识 <code className="ml-1 text-foreground">{sub.slug}</code>
                  </span>
                  <span>分类 {sub.formData.category ?? "-"}</span>
                  <span>
                    提交于 {new Date(sub.submittedAt).toLocaleDateString()}
                  </span>
                  <span>{sub.authorName ? `来自 @${sub.authorName}` : "匿名投稿"}</span>
                </div>

                {(sub.formData.primaryColor || sub.formData.secondaryColor) && (
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
                    {sub.formData.primaryColor ? (
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="h-4 w-4 rounded border border-[var(--admin-border-soft)]"
                          style={{ backgroundColor: sub.formData.primaryColor }}
                        />
                        {sub.formData.primaryColor}
                      </span>
                    ) : null}
                    {sub.formData.secondaryColor ? (
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="h-4 w-4 rounded border border-[var(--admin-border-soft)]"
                          style={{ backgroundColor: sub.formData.secondaryColor }}
                        />
                        {sub.formData.secondaryColor}
                      </span>
                    ) : null}
                  </div>
                )}

                {sub.reviewNote ? (
                  <p className="mt-4 rounded-md bg-[var(--admin-input)] p-3 text-sm shadow-[var(--admin-shadow-border)]">
                    审核备注：{sub.reviewNote}
                  </p>
                ) : null}

                <div className="mt-4">
                  <AdminButton
                    onClick={() => {
                      void toggleDetails(sub.id);
                    }}
                    size="sm"
                    tone="ghost"
                  >
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${
                        expandedId === sub.id ? "rotate-90" : ""
                      }`}
                    />
                    {expandedId === sub.id ? "收起详情" : "查看详情"}
                  </AdminButton>
                </div>

                {expandedId === sub.id && (
                  <div className="mt-4 rounded-md bg-[var(--admin-input)] p-4 text-sm shadow-[var(--admin-shadow-border)]">
                    {detailLoadingId === sub.id && !detailCache.current.has(sub.id) ? (
                      <div className="flex items-center gap-2 text-muted">
                        <Clock3 className="h-4 w-4" />
                        正在加载详情...
                      </div>
                    ) : detailCache.current.has(sub.id) ? (
                      <SubmissionDetail data={detailCache.current.get(sub.id)!} />
                    ) : null}
                  </div>
                )}

                {editingId === sub.id ? (
                  <div className="mt-4 space-y-2 rounded-md bg-[var(--admin-input)] p-3 shadow-[var(--admin-shadow-border)]">
                    <AdminInput
                      value={editName}
                      onChange={(event) => setEditName(event.target.value)}
                      placeholder="风格名称"
                    />
                    <AdminInput
                      value={editNameEn}
                      onChange={(event) => setEditNameEn(event.target.value)}
                      placeholder="风格英文名称"
                    />
                    <AdminTextarea
                      value={editDescription}
                      onChange={(event) => setEditDescription(event.target.value)}
                      placeholder="风格描述"
                      rows={3}
                      className="resize-none"
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <AdminButton
                        disabled={savingEditId === sub.id}
                        onClick={() => handleSaveEdit(sub)}
                        tone="primary"
                      >
                        {savingEditId === sub.id ? "正在保存..." : "保存修改"}
                      </AdminButton>
                      <AdminButton
                        disabled={savingEditId === sub.id}
                        onClick={cancelEdit}
                        tone="ghost"
                      >
                        取消
                      </AdminButton>
                    </div>
                  </div>
                ) : null}
              </div>

              <aside className="bg-[var(--admin-input)] p-4 shadow-[0_-1px_0_0_var(--admin-border-soft)] lg:shadow-[-1px_0_0_0_var(--admin-border-soft)]">
                <div className="space-y-3">
                  {sub.status === "pending" ? (
                    reviewingId === sub.id ? (
                      <div className="space-y-3">
                        <AdminTextarea
                          value={note}
                          onChange={(event) => setNote(event.target.value)}
                          placeholder="审核备注（可选）..."
                          rows={3}
                          className="resize-none"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <AdminButton
                            disabled={submitting}
                            onClick={() => handleReview(sub.id, "approve")}
                            tone="success"
                          >
                            <CheckCircle className="h-4 w-4" />
                            通过
                          </AdminButton>
                          <AdminButton
                            disabled={submitting}
                            onClick={() => handleReview(sub.id, "reject")}
                            tone="danger"
                          >
                            <XCircle className="h-4 w-4" />
                            拒绝
                          </AdminButton>
                        </div>
                        <AdminButton
                          disabled={submitting}
                          onClick={() => {
                            setReviewingId(null);
                            setNote("");
                          }}
                          tone="ghost"
                          className="w-full"
                        >
                          取消审核
                        </AdminButton>
                      </div>
                    ) : (
                      <AdminButton
                        onClick={() => setReviewingId(sub.id)}
                        tone="primary"
                        className="w-full"
                      >
                        审核投稿
                      </AdminButton>
                    )
                  ) : null}

                  {sub.status === "approved" ? (
                    <div className="space-y-3">
                      {!canRegisterToCodebase ? (
                        <AdminBadge>注册功能已禁用</AdminBadge>
                      ) : registeringId === sub.id && registerResult ? (
                        <AdminPanel className="space-y-3 bg-muted/5 p-3">
                          <p
                            className={`text-sm font-medium ${
                              registerResult.success
                                ? "text-emerald-700 dark:text-emerald-300"
                                : "text-rose-700 dark:text-rose-300"
                            }`}
                          >
                            {registerResult.success
                              ? "已归档到代码库"
                              : "注册完成，但存在错误"}
                          </p>
                          {registerResult.filesWritten.length > 0 ? (
                            <ResultList title="已写入文件" items={registerResult.filesWritten} />
                          ) : null}
                          {registerResult.registriesPatched.length > 0 ? (
                            <ResultList
                              title="已更新注册表"
                              items={registerResult.registriesPatched}
                            />
                          ) : null}
                          {registerResult.errors.length > 0 ? (
                            <ResultList title="错误" items={registerResult.errors} danger />
                          ) : null}
                          <AdminButton
                            onClick={() => {
                              setRegisteringId(null);
                              setRegisterResult(null);
                            }}
                            tone="ghost"
                            size="sm"
                          >
                            关闭
                          </AdminButton>
                        </AdminPanel>
                      ) : (
                        <>
                          <p className="text-xs leading-5 text-muted">
                            已上线风格。代码库注册会在本地开发环境中归档生成的文件。
                          </p>
                          <AdminButton
                            disabled={registeringId === sub.id}
                            onClick={() => handleRegister(sub.id)}
                            tone="primary"
                            className="w-full"
                          >
                            <Archive className="h-4 w-4" />
                            {registeringId === sub.id ? "正在注册..." : "注册到代码库"}
                          </AdminButton>
                        </>
                      )}
                    </div>
                  ) : null}

                  <AdminButton
                    onClick={() => beginEdit(sub)}
                    className="w-full"
                    disabled={editingId === sub.id}
                  >
                    <Pencil className="h-4 w-4" />
                    编辑投稿
                  </AdminButton>

                  <div className="pt-3 shadow-[0_-1px_0_0_var(--admin-border-soft)]">
                    {confirmDeleteId === sub.id ? (
                      <div className="space-y-2">
                        <p className="text-xs leading-5 text-rose-700 dark:text-rose-300">
                          {sub.status === "approved"
                            ? "已通过的风格可能已经上线，仍要删除吗？"
                            : "要永久删除这条投稿吗？"}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <AdminButton
                            disabled={deletingId === sub.id}
                            onClick={() => handleDelete(sub.id)}
                            tone="danger"
                          >
                            {deletingId === sub.id ? "正在删除..." : "确认"}
                          </AdminButton>
                          <AdminButton
                            disabled={deletingId === sub.id}
                            onClick={() => setConfirmDeleteId(null)}
                            tone="ghost"
                          >
                            取消
                          </AdminButton>
                        </div>
                      </div>
                    ) : (
                      <AdminButton
                        onClick={() => setConfirmDeleteId(sub.id)}
                        tone="danger"
                        className="w-full"
                      >
                        <Trash2 className="h-4 w-4" />
                        删除
                      </AdminButton>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </AdminPanel>
        ))}
      </div>
    </div>
  );
}

function ColorSwatch({ color, label }: { color: string; label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 mr-3 mb-1">
      <span
        className="inline-block w-4 h-4 rounded border border-border"
        style={{ backgroundColor: color }}
      />
      <code className="text-xs">{color}</code>
      {label && <span className="text-xs text-muted">({label})</span>}
    </span>
  );
}

function ResultList({
  title,
  items,
  danger = false,
}: {
  title: string;
  items: string[];
  danger?: boolean;
}) {
  return (
    <div>
      <p
        className={`mb-1 text-xs font-medium ${
          danger ? "text-rose-700 dark:text-rose-300" : "text-muted"
        }`}
      >
        {title}
      </p>
      <ul
        className={`space-y-0.5 text-xs ${
          danger ? "text-rose-700 dark:text-rose-300" : "text-muted"
        }`}
      >
        {items.map((item) => (
          <li key={item}>
            <code>{item}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">{title}</h4>
      {children}
    </div>
  );
}

function SubmissionDetail({ data }: { data: FullSubmissionData }) {
  const fd = data.formData;

  const str = (key: string): string => {
    const v = fd[key];
    return typeof v === "string" ? v : "";
  };

  const arr = (key: string): string[] => {
    const v = fd[key];
    return Array.isArray(v) ? v.filter((s): s is string => typeof s === "string") : [];
  };

  const primaryColor = str("primaryColor");
  const secondaryColor = str("secondaryColor");
  const accentColors = arr("accentColors");
  const background = str("background");
  const foreground = str("foreground");
  const muted = str("muted");

  const headingFont = str("headingFont");
  const bodyFont = str("bodyFont");
  const fontSizeBase = str("fontSizeBase");
  const fontSizeHeading = str("fontSizeHeading");
  const fontSizeSmall = str("fontSizeSmall");
  const fontWeightNormal = str("fontWeightNormal");
  const fontWeightBold = str("fontWeightBold");
  const lineHeightNormal = str("lineHeightNormal");
  const lineHeightTight = str("lineHeightTight");

  const borderRadius = str("borderRadius");
  const spacingSm = str("spacingSm");
  const spacingMd = str("spacingMd");
  const spacingLg = str("spacingLg");

  const doList = arr("doList").filter((s) => s.trim());
  const dontList = arr("dontList").filter((s) => s.trim());
  const aiRules = arr("aiRules").filter((s) => s.trim());

  const buttonCode = str("buttonCode");
  const cardCode = str("cardCode");
  const inputCode = str("inputCode");

  const philosophy = str("philosophy");
  const keywords = arr("keywords").filter((s) => s.trim());
  const tags = arr("tags");
  const styleType = str("styleType");

  return (
    <div className="space-y-4">
      {/* Colors */}
      <DetailSection title="颜色">
        <div className="flex flex-wrap">
          {primaryColor && <ColorSwatch color={primaryColor} label="主色" />}
          {secondaryColor && <ColorSwatch color={secondaryColor} label="辅助色" />}
          {background && <ColorSwatch color={background} label="背景色" />}
          {foreground && <ColorSwatch color={foreground} label="前景色" />}
          {muted && <ColorSwatch color={muted} label="弱化色" />}
          {accentColors.map((c, i) => (
            <ColorSwatch key={i} color={c} label={`强调色 ${i + 1}`} />
          ))}
        </div>
      </DetailSection>

      {/* Typography */}
      {(headingFont || bodyFont) && (
        <DetailSection title="排版">
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
            {headingFont && <div><span className="text-muted">标题字体：</span> {headingFont}</div>}
            {bodyFont && <div><span className="text-muted">正文字体：</span> {bodyFont}</div>}
            {fontSizeBase && <div><span className="text-muted">基础字号：</span> {fontSizeBase}</div>}
            {fontSizeHeading && <div><span className="text-muted">标题字号：</span> {fontSizeHeading}</div>}
            {fontSizeSmall && <div><span className="text-muted">小号字号：</span> {fontSizeSmall}</div>}
            {fontWeightNormal && <div><span className="text-muted">常规字重：</span> {fontWeightNormal}</div>}
            {fontWeightBold && <div><span className="text-muted">粗体字重：</span> {fontWeightBold}</div>}
            {lineHeightNormal && <div><span className="text-muted">常规行高：</span> {lineHeightNormal}</div>}
            {lineHeightTight && <div><span className="text-muted">紧凑行高：</span> {lineHeightTight}</div>}
          </div>
        </DetailSection>
      )}

      {/* Spacing & Border */}
      {(borderRadius || spacingSm) && (
        <DetailSection title="间距与边框">
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
            {borderRadius && <div><span className="text-muted">圆角：</span> {borderRadius}</div>}
            {spacingSm && <div><span className="text-muted">小间距：</span> {spacingSm}</div>}
            {spacingMd && <div><span className="text-muted">中间距：</span> {spacingMd}</div>}
            {spacingLg && <div><span className="text-muted">大间距：</span> {spacingLg}</div>}
          </div>
        </DetailSection>
      )}

      {/* Design */}
      {(philosophy || keywords.length > 0 || tags.length > 0 || styleType) && (
        <DetailSection title="设计">
          {philosophy && <p className="text-xs mb-2">{philosophy}</p>}
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {keywords.map((k, i) => (
                <span key={i} className="px-2 py-0.5 bg-muted/20 rounded text-xs">{k}</span>
              ))}
            </div>
          )}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.map((t, i) => (
                <span key={i} className="px-2 py-0.5 bg-muted/10 border border-border rounded text-xs">{t}</span>
              ))}
            </div>
          )}
          {styleType && <p className="text-xs text-muted">风格类型：{styleType}</p>}
        </DetailSection>
      )}

      {/* Rules */}
      {(doList.length > 0 || dontList.length > 0 || aiRules.length > 0) && (
        <DetailSection title="规则">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {doList.length > 0 && (
              <div>
                <p className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">推荐</p>
                <ul className="text-xs space-y-0.5 list-disc list-inside">
                  {doList.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}
            {dontList.length > 0 && (
              <div>
                <p className="text-xs font-medium text-red-700 dark:text-red-400 mb-1">禁止</p>
                <ul className="text-xs space-y-0.5 list-disc list-inside">
                  {dontList.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}
            {aiRules.length > 0 && (
              <div>
                <p className="text-xs font-medium mb-1">AI 规则</p>
                <ul className="text-xs space-y-0.5 list-disc list-inside">
                  {aiRules.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}
          </div>
        </DetailSection>
      )}

      {/* Components */}
      {(buttonCode || cardCode || inputCode) && (
        <DetailSection title="组件">
          {buttonCode && (
            <div className="mb-3">
              <p className="text-xs font-medium text-muted mb-1">按钮</p>
              <pre className="text-xs bg-muted/10 border border-border rounded p-3 overflow-x-auto whitespace-pre-wrap">{buttonCode}</pre>
            </div>
          )}
          {cardCode && (
            <div className="mb-3">
              <p className="text-xs font-medium text-muted mb-1">卡片</p>
              <pre className="text-xs bg-muted/10 border border-border rounded p-3 overflow-x-auto whitespace-pre-wrap">{cardCode}</pre>
            </div>
          )}
          {inputCode && (
            <div>
              <p className="text-xs font-medium text-muted mb-1">输入框</p>
              <pre className="text-xs bg-muted/10 border border-border rounded p-3 overflow-x-auto whitespace-pre-wrap">{inputCode}</pre>
            </div>
          )}
        </DetailSection>
      )}
    </div>
  );
}
