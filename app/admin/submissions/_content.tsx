"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [detailLoadingId, setDetailLoadingId] = useState<string | null>(null);
  const detailCache = useRef<Map<string, FullSubmissionData>>(new Map());

  const fetchSubmissions = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
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
      const res = await fetch(`/api/admin/submissions/${id}/review`, {
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
      const res = await fetch(`/api/admin/submissions/${id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error ?? "Failed to register style.");
      }

      const payload = data as { result?: RegisterResult } | null;
      setRegisterResult(payload?.result ?? (data as RegisterResult));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register style.");
      setRegisteringId(null);
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

      setConfirmDeleteId(null);
      await fetchSubmissions();
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
      detailCache.current.set(id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load details.");
      setExpandedId((current) => (current === id ? null : current));
    } finally {
      setDetailLoadingId((current) => (current === id ? null : current));
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

            {/* Detail toggle */}
            <div className="mb-4">
              <button
                onClick={() => toggleDetails(sub.id)}
                className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1"
              >
                <span className="inline-block transition-transform" style={{
                  transform: expandedId === sub.id ? "rotate(90deg)" : "rotate(0deg)",
                }}>
                  &#9656;
                </span>
                {expandedId === sub.id ? "Hide Details" : "View Details"}
              </button>
            </div>

            {/* Expanded detail panel */}
            {expandedId === sub.id && (
              <div className="mb-4 border border-border rounded-md p-4 space-y-4 text-sm">
                {detailLoadingId === sub.id && !detailCache.current.has(sub.id) ? (
                  <p className="text-muted">Loading details...</p>
                ) : detailCache.current.has(sub.id) ? (
                  <SubmissionDetail data={detailCache.current.get(sub.id)!} />
                ) : null}
              </div>
            )}

            {/* Register button for approved submissions */}
            {sub.status === "approved" && (
              <div className="mb-4">
                <p className="text-xs text-muted mb-2">
                  Approved submissions are already live in <code>/styles/{sub.slug}</code>. Registration is optional codebase archiving.
                </p>
                {registeringId === sub.id && registerResult ? (
                  <div className="border border-border rounded-md p-4 space-y-3">
                    <p className={`text-sm font-medium ${registerResult.success ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                      {registerResult.success ? "Style archived to codebase successfully" : "Registration completed with errors"}
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
                    {registeringId === sub.id ? "Registering..." : "Register to Codebase"}
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

            {/* Delete button for pending and rejected submissions */}
            {(sub.status === "pending" || sub.status === "rejected") && (
              <div className="mt-4 pt-4 border-t border-border">
                {confirmDeleteId === sub.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-red-600 dark:text-red-400">Are you sure?</span>
                    <button
                      disabled={deletingId === sub.id}
                      onClick={() => handleDelete(sub.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                    >
                      {deletingId === sub.id ? "Deleting..." : "Confirm Delete"}
                    </button>
                    <button
                      disabled={deletingId === sub.id}
                      onClick={() => setConfirmDeleteId(null)}
                      className="px-3 py-1 text-sm text-muted hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteId(sub.id)}
                    className="text-red-600 hover:text-red-700 text-sm transition-colors"
                  >
                    Delete
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
