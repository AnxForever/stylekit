"use client";

import { useCallback, useEffect, useState } from "react";

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

type FilterStatus = "all" | "pending" | "approved" | "rejected";

export function SubmissionsReview() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>("pending");
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [note, setNote] = useState("");
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [registerResult, setRegisterResult] = useState<RegisterResult | null>(null);

  const fetchSubmissions = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    const params = filter !== "all" ? `?status=${filter}` : "";

    try {
      const res = await fetch(`/api/submit/list${params}`, {
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
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, [filter]);

  useEffect(() => {
    const controller = new AbortController();
    void fetchSubmissions(controller.signal);
    return () => controller.abort();
  }, [fetchSubmissions]);

  async function handleReview(id: string, action: "approve" | "reject") {
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/submit/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, note: note || undefined }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to submit review.");
      }

      setReviewingId(null);
      setNote("");
      await fetchSubmissions();
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
      const res = await fetch(`/api/submit/${id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error ?? "Failed to register style.");
      }

      setRegisterResult(data as RegisterResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register style.");
      setRegisteringId(null);
    }
  }

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    approved: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {(["pending", "approved", "rejected", "all"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === s
                ? "bg-foreground text-background"
                : "bg-muted/20 text-muted hover:text-foreground"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {error && (
        <p className="mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      {loading && <p className="text-muted">Loading submissions...</p>}

      {!loading && submissions.length === 0 && (
        <p className="text-muted">No {filter !== "all" ? filter : ""} submissions found.</p>
      )}

      {/* Submission list */}
      <div className="space-y-4">
        {submissions.map((sub) => (
          <div
            key={sub.id}
            className="border border-border rounded-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {sub.formData.name || sub.slug}
                  {sub.formData.nameEn && (
                    <span className="text-muted font-normal ml-2">
                      ({sub.formData.nameEn})
                    </span>
                  )}
                </h3>
                <p className="text-sm text-muted mt-1">
                  {sub.formData.description}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  statusColors[sub.status] || ""
                }`}
              >
                {sub.status}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted mb-4">
              <span>Slug: <code className="text-foreground">{sub.slug}</code></span>
              <span>Category: {sub.formData.category}</span>
              <span>
                Submitted: {new Date(sub.submittedAt).toLocaleDateString()}
              </span>
              {sub.authorName && (
                <span>by <strong>@{sub.authorName}</strong></span>
              )}
              {sub.formData.primaryColor && (
                <span className="flex items-center gap-1">
                  <span
                    className="inline-block w-3 h-3 rounded-full border border-border"
                    style={{ backgroundColor: sub.formData.primaryColor }}
                  />
                  {sub.formData.primaryColor}
                </span>
              )}
            </div>

            {sub.reviewNote && (
              <p className="text-sm bg-muted/10 p-3 rounded mb-4">
                Review note: {sub.reviewNote}
              </p>
            )}

            {/* Register button for approved submissions */}
            {sub.status === "approved" && (
              <div className="mb-4">
                {registeringId === sub.id && registerResult ? (
                  <div className="border border-border rounded-md p-4 space-y-3">
                    <p className={`text-sm font-medium ${registerResult.success ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                      {registerResult.success ? "Style registered successfully" : "Registration completed with errors"}
                    </p>
                    {registerResult.filesWritten.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted mb-1">Files written:</p>
                        <ul className="text-xs text-muted space-y-0.5">
                          {registerResult.filesWritten.map((f) => (
                            <li key={f}><code>{f}</code></li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {registerResult.registriesPatched.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted mb-1">Registries patched:</p>
                        <ul className="text-xs text-muted space-y-0.5">
                          {registerResult.registriesPatched.map((f) => (
                            <li key={f}><code>{f}</code></li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {registerResult.errors.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">Errors:</p>
                        <ul className="text-xs text-red-600 dark:text-red-400 space-y-0.5">
                          {registerResult.errors.map((e, i) => (
                            <li key={i}>{e}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <button
                      onClick={() => { setRegisteringId(null); setRegisterResult(null); }}
                      className="text-xs text-muted hover:text-foreground transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                ) : (
                  <button
                    disabled={registeringId === sub.id}
                    onClick={() => handleRegister(sub.id)}
                    className="px-4 py-2 border-2 border-foreground rounded-md text-sm font-medium hover:bg-foreground hover:text-background disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  >
                    {registeringId === sub.id ? "Registering..." : "Register Style"}
                  </button>
                )}
              </div>
            )}

            {sub.status === "pending" && (
              <div>
                {reviewingId === sub.id ? (
                  <div className="space-y-3">
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Optional review note..."
                      className="w-full p-3 border border-border rounded-md bg-background text-sm resize-none"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <button
                        disabled={submitting}
                        onClick={() => handleReview(sub.id, "approve")}
                        className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        disabled={submitting}
                        onClick={() => handleReview(sub.id, "reject")}
                        className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        disabled={submitting}
                        onClick={() => {
                          setReviewingId(null);
                          setNote("");
                        }}
                        className="px-4 py-2 bg-muted/20 text-foreground rounded-md text-sm font-medium hover:bg-muted/30 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setReviewingId(sub.id)}
                    className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted/10 transition-colors"
                  >
                    Review
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
