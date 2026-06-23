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
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "all", label: "All" },
];

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
        throw new Error(data?.error ?? "Failed to load submissions.");
      }

      const data = await res.json();
      if (signal?.aborted) return;
      setSubmissions(data.submissions ?? []);
    } catch (err) {
      if (signal?.aborted) return;
      setError(err instanceof Error ? err.message : "Failed to load submissions.");
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
        throw new Error(data?.error ?? "Failed to submit review.");
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
      setError(err instanceof Error ? err.message : "Failed to submit review.");
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
          setError(payload.error ?? "Auto-registration completed with errors.");
          return;
        }
        throw new Error(payload?.error ?? "Failed to register style.");
      }

      setRegisterResult(payload?.result ?? (data as RegisterResult));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register style.");
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
        "This submission is approved and may already be live. Save admin edits anyway?"
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
      setError("Please provide at least one non-empty field.");
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
        throw new Error(data?.error ?? "Failed to update submission.");
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
      setError(err instanceof Error ? err.message : "Failed to update submission.");
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
        throw new Error(data?.error ?? "Failed to delete submission.");
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
      setError(err instanceof Error ? err.message : "Failed to delete submission.");
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
        throw new Error("Failed to load submission details.");
      }
      const data = (await res.json()) as FullSubmissionData;
      upsertDetailCache(id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load details.");
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
        title="Review queue"
        description={`Showing ${submissions.length} ${filter === "all" ? "total" : filter} submissions. Pending ${queueSummary.pending}, approved ${queueSummary.approved}, rejected ${queueSummary.rejected}.`}
        meta={<AdminBadge tone={filter === "pending" ? "warning" : "neutral"}>{filter}</AdminBadge>}
        actions={
          <>
            <AdminSegmentedControl<FilterStatus>
              value={filter}
              onChange={setFilter}
              ariaLabel="Submission status filter"
              options={FILTER_OPTIONS}
            />
            <AdminButton
              onClick={() => {
                void fetchSubmissions();
              }}
              size="icon"
              aria-label="Refresh submissions"
            >
              <RefreshCw className="h-4 w-4" />
            </AdminButton>
          </>
        }
      />

      {error && (
        <AdminErrorState message={error} onRetry={() => void fetchSubmissions()} />
      )}

      {loading && <AdminLoadingState label="Loading submissions..." />}

      {!loading && submissions.length === 0 && (
        <AdminEmptyState
          title={`No ${filter !== "all" ? filter : ""} submissions found`}
          description="Switch queues or wait for new style submissions."
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
                      <AdminBadge tone={STATUS_TONE[sub.status]}>{sub.status}</AdminBadge>
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
                    Slug <code className="ml-1 text-foreground">{sub.slug}</code>
                  </span>
                  <span>Category {sub.formData.category ?? "-"}</span>
                  <span>
                    Submitted {new Date(sub.submittedAt).toLocaleDateString()}
                  </span>
                  <span>{sub.authorName ? `by @${sub.authorName}` : "anonymous"}</span>
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
                  <p className="mt-4 rounded-md border border-[var(--admin-border-soft)] bg-muted/8 p-3 text-sm">
                    Review note: {sub.reviewNote}
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
                    {expandedId === sub.id ? "Hide details" : "View details"}
                  </AdminButton>
                </div>

                {expandedId === sub.id && (
                  <div className="mt-4 rounded-md border border-[var(--admin-border-soft)] bg-muted/5 p-4 text-sm">
                    {detailLoadingId === sub.id && !detailCache.current.has(sub.id) ? (
                      <div className="flex items-center gap-2 text-muted">
                        <Clock3 className="h-4 w-4" />
                        Loading details...
                      </div>
                    ) : detailCache.current.has(sub.id) ? (
                      <SubmissionDetail data={detailCache.current.get(sub.id)!} />
                    ) : null}
                  </div>
                )}

                {editingId === sub.id ? (
                  <div className="mt-4 space-y-2 rounded-md border border-[var(--admin-border-soft)] bg-muted/5 p-3">
                    <AdminInput
                      value={editName}
                      onChange={(event) => setEditName(event.target.value)}
                      placeholder="Style name"
                    />
                    <AdminInput
                      value={editNameEn}
                      onChange={(event) => setEditNameEn(event.target.value)}
                      placeholder="Style name (English)"
                    />
                    <AdminTextarea
                      value={editDescription}
                      onChange={(event) => setEditDescription(event.target.value)}
                      placeholder="Style description"
                      rows={3}
                      className="resize-none"
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <AdminButton
                        disabled={savingEditId === sub.id}
                        onClick={() => handleSaveEdit(sub)}
                        tone="primary"
                      >
                        {savingEditId === sub.id ? "Saving..." : "Save edit"}
                      </AdminButton>
                      <AdminButton
                        disabled={savingEditId === sub.id}
                        onClick={cancelEdit}
                        tone="ghost"
                      >
                        Cancel
                      </AdminButton>
                    </div>
                  </div>
                ) : null}
              </div>

              <aside className="border-t border-[var(--admin-border-soft)] bg-muted/5 p-4 lg:border-l lg:border-t-0">
                <div className="space-y-3">
                  {sub.status === "pending" ? (
                    reviewingId === sub.id ? (
                      <div className="space-y-3">
                        <AdminTextarea
                          value={note}
                          onChange={(event) => setNote(event.target.value)}
                          placeholder="Optional review note..."
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
                            Approve
                          </AdminButton>
                          <AdminButton
                            disabled={submitting}
                            onClick={() => handleReview(sub.id, "reject")}
                            tone="danger"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
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
                          Cancel review
                        </AdminButton>
                      </div>
                    ) : (
                      <AdminButton
                        onClick={() => setReviewingId(sub.id)}
                        tone="primary"
                        className="w-full"
                      >
                        Review submission
                      </AdminButton>
                    )
                  ) : null}

                  {sub.status === "approved" ? (
                    <div className="space-y-3">
                      {!canRegisterToCodebase ? (
                        <AdminBadge>Registration disabled</AdminBadge>
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
                              ? "Archived to codebase"
                              : "Registration completed with errors"}
                          </p>
                          {registerResult.filesWritten.length > 0 ? (
                            <ResultList title="Files written" items={registerResult.filesWritten} />
                          ) : null}
                          {registerResult.registriesPatched.length > 0 ? (
                            <ResultList
                              title="Registries patched"
                              items={registerResult.registriesPatched}
                            />
                          ) : null}
                          {registerResult.errors.length > 0 ? (
                            <ResultList title="Errors" items={registerResult.errors} danger />
                          ) : null}
                          <AdminButton
                            onClick={() => {
                              setRegisteringId(null);
                              setRegisterResult(null);
                            }}
                            tone="ghost"
                            size="sm"
                          >
                            Dismiss
                          </AdminButton>
                        </AdminPanel>
                      ) : (
                        <>
                          <p className="text-xs leading-5 text-muted">
                            Live style. Codebase registration archives generated files in local development.
                          </p>
                          <AdminButton
                            disabled={registeringId === sub.id}
                            onClick={() => handleRegister(sub.id)}
                            tone="primary"
                            className="w-full"
                          >
                            <Archive className="h-4 w-4" />
                            {registeringId === sub.id ? "Registering..." : "Register to codebase"}
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
                    Edit submission
                  </AdminButton>

                  <div className="border-t border-[var(--admin-border-soft)] pt-3">
                    {confirmDeleteId === sub.id ? (
                      <div className="space-y-2">
                        <p className="text-xs leading-5 text-rose-700 dark:text-rose-300">
                          {sub.status === "approved"
                            ? "Approved style may already be live. Delete anyway?"
                            : "Delete this submission permanently?"}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <AdminButton
                            disabled={deletingId === sub.id}
                            onClick={() => handleDelete(sub.id)}
                            tone="danger"
                          >
                            {deletingId === sub.id ? "Deleting..." : "Confirm"}
                          </AdminButton>
                          <AdminButton
                            disabled={deletingId === sub.id}
                            onClick={() => setConfirmDeleteId(null)}
                            tone="ghost"
                          >
                            Cancel
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
                        Delete
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
      <DetailSection title="Colors">
        <div className="flex flex-wrap">
          {primaryColor && <ColorSwatch color={primaryColor} label="primary" />}
          {secondaryColor && <ColorSwatch color={secondaryColor} label="secondary" />}
          {background && <ColorSwatch color={background} label="bg" />}
          {foreground && <ColorSwatch color={foreground} label="fg" />}
          {muted && <ColorSwatch color={muted} label="muted" />}
          {accentColors.map((c, i) => (
            <ColorSwatch key={i} color={c} label={`accent ${i + 1}`} />
          ))}
        </div>
      </DetailSection>

      {/* Typography */}
      {(headingFont || bodyFont) && (
        <DetailSection title="Typography">
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
            {headingFont && <div><span className="text-muted">Heading:</span> {headingFont}</div>}
            {bodyFont && <div><span className="text-muted">Body:</span> {bodyFont}</div>}
            {fontSizeBase && <div><span className="text-muted">Size base:</span> {fontSizeBase}</div>}
            {fontSizeHeading && <div><span className="text-muted">Size heading:</span> {fontSizeHeading}</div>}
            {fontSizeSmall && <div><span className="text-muted">Size small:</span> {fontSizeSmall}</div>}
            {fontWeightNormal && <div><span className="text-muted">Weight normal:</span> {fontWeightNormal}</div>}
            {fontWeightBold && <div><span className="text-muted">Weight bold:</span> {fontWeightBold}</div>}
            {lineHeightNormal && <div><span className="text-muted">LH normal:</span> {lineHeightNormal}</div>}
            {lineHeightTight && <div><span className="text-muted">LH tight:</span> {lineHeightTight}</div>}
          </div>
        </DetailSection>
      )}

      {/* Spacing & Border */}
      {(borderRadius || spacingSm) && (
        <DetailSection title="Spacing / Border">
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
            {borderRadius && <div><span className="text-muted">Border radius:</span> {borderRadius}</div>}
            {spacingSm && <div><span className="text-muted">Spacing sm:</span> {spacingSm}</div>}
            {spacingMd && <div><span className="text-muted">Spacing md:</span> {spacingMd}</div>}
            {spacingLg && <div><span className="text-muted">Spacing lg:</span> {spacingLg}</div>}
          </div>
        </DetailSection>
      )}

      {/* Design */}
      {(philosophy || keywords.length > 0 || tags.length > 0 || styleType) && (
        <DetailSection title="Design">
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
          {styleType && <p className="text-xs text-muted">Style type: {styleType}</p>}
        </DetailSection>
      )}

      {/* Rules */}
      {(doList.length > 0 || dontList.length > 0 || aiRules.length > 0) && (
        <DetailSection title="Rules">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {doList.length > 0 && (
              <div>
                <p className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">Do</p>
                <ul className="text-xs space-y-0.5 list-disc list-inside">
                  {doList.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}
            {dontList.length > 0 && (
              <div>
                <p className="text-xs font-medium text-red-700 dark:text-red-400 mb-1">Don&apos;t</p>
                <ul className="text-xs space-y-0.5 list-disc list-inside">
                  {dontList.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}
            {aiRules.length > 0 && (
              <div>
                <p className="text-xs font-medium mb-1">AI Rules</p>
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
        <DetailSection title="Components">
          {buttonCode && (
            <div className="mb-3">
              <p className="text-xs font-medium text-muted mb-1">Button</p>
              <pre className="text-xs bg-muted/10 border border-border rounded p-3 overflow-x-auto whitespace-pre-wrap">{buttonCode}</pre>
            </div>
          )}
          {cardCode && (
            <div className="mb-3">
              <p className="text-xs font-medium text-muted mb-1">Card</p>
              <pre className="text-xs bg-muted/10 border border-border rounded p-3 overflow-x-auto whitespace-pre-wrap">{cardCode}</pre>
            </div>
          )}
          {inputCode && (
            <div>
              <p className="text-xs font-medium text-muted mb-1">Input</p>
              <pre className="text-xs bg-muted/10 border border-border rounded p-3 overflow-x-auto whitespace-pre-wrap">{inputCode}</pre>
            </div>
          )}
        </DetailSection>
      )}
    </div>
  );
}
