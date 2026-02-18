"use client";

import { useCallback, useMemo, useState, useDeferredValue } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Trash2,
  Search,
} from "lucide-react";
import { useAdminComments } from "@/lib/swr";

const PAGE_SIZE = 20;

export function AdminCommentsContent() {
  const [slug, setSlug] = useState("");
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [offset, setOffset] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  const deferredSearch = useDeferredValue(search);

  const { data, error, isLoading, mutate } = useAdminComments({
    limit: PAGE_SIZE,
    offset,
    slug: slug || undefined,
    search: deferredSearch || undefined,
    from: from || undefined,
    to: to || undefined,
  });

  const currentPage = useMemo(() => {
    const l = data?.limit ?? PAGE_SIZE;
    const o = data?.offset ?? offset;
    return Math.floor(o / l) + 1;
  }, [data?.limit, data?.offset, offset]);

  const totalPages = useMemo(() => {
    if (!data) return 1;
    return Math.max(1, Math.ceil(data.total / data.limit));
  }, [data]);

  const allVisibleIds = useMemo(
    () => (data?.comments ?? []).map((c) => c.id),
    [data?.comments]
  );

  const allSelected = useMemo(
    () => allVisibleIds.length > 0 && allVisibleIds.every((id) => selectedIds.has(id)),
    [allVisibleIds, selectedIds]
  );

  const toggleSelectAll = useCallback(() => {
    setSelectedIds((prev) => {
      if (allVisibleIds.every((id) => prev.has(id))) {
        const next = new Set(prev);
        for (const id of allVisibleIds) {
          next.delete(id);
        }
        return next;
      }
      return new Set([...prev, ...allVisibleIds]);
    });
  }, [allVisibleIds]);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleDelete = useCallback(async () => {
    if (selectedIds.size === 0) return;
    const confirmed = window.confirm(
      `Delete ${selectedIds.size} comment${selectedIds.size > 1 ? "s" : ""}? This action cannot be undone.`
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      const res = await fetch("/api/admin/comments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [...selectedIds] }),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        throw new Error(payload?.error ?? "Failed to delete comments.");
      }
      setSelectedIds(new Set());
      await mutate();
    } finally {
      setDeleting(false);
    }
  }, [selectedIds, mutate]);

  const resetFilters = useCallback(() => {
    setSlug("");
    setSearch("");
    setFrom("");
    setTo("");
    setOffset(0);
    setSelectedIds(new Set());
  }, []);

  if (isLoading) {
    return <p className="text-muted">Loading comments...</p>;
  }

  if (error) {
    return (
      <div className="p-6 border border-red-300 bg-red-50 dark:bg-red-900/10 rounded-lg">
        <p className="text-red-600 dark:text-red-400">{error.message}</p>
        <button
          onClick={() => mutate()}
          className="mt-3 px-4 py-2 text-sm bg-foreground text-background rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="border border-border rounded-lg p-6">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">Style slug</label>
            <input
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setOffset(0);
              }}
              placeholder="e.g. neo-brutalism"
              className="h-8 w-44 rounded-md border border-border bg-background px-2.5 text-xs text-foreground placeholder:text-muted"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">Search content</label>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setOffset(0);
                }}
                placeholder="Search..."
                className="h-8 w-56 rounded-md border border-border bg-background pl-7 pr-2.5 text-xs text-foreground placeholder:text-muted"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">From</label>
            <input
              type="date"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                setOffset(0);
              }}
              className="h-8 rounded-md border border-border bg-background px-2.5 text-xs text-foreground"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">To</label>
            <input
              type="date"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                setOffset(0);
              }}
              className="h-8 rounded-md border border-border bg-background px-2.5 text-xs text-foreground"
            />
          </div>
          <button
            onClick={resetFilters}
            className="px-3 py-1.5 text-xs rounded-md border border-border text-muted hover:text-foreground transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => {
              void mutate();
            }}
            className="p-2 text-muted hover:text-foreground transition-colors"
            aria-label="Refresh comments"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted">
          {data?.comments.length ?? 0} / {data?.total ?? 0} comments
        </span>
        <button
          onClick={() => {
            void handleDelete();
          }}
          disabled={selectedIds.size === 0 || deleting}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-3.5 h-3.5" />
          {deleting
            ? "Deleting..."
            : `Delete${selectedIds.size > 0 ? ` (${selectedIds.size})` : ""}`}
        </button>
      </div>

      {/* Comments Table */}
      {(data?.comments.length ?? 0) === 0 ? (
        <p className="text-sm text-muted">No comments found.</p>
      ) : (
        <div className="border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/5">
                <th className="px-4 py-3 text-left w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    aria-label="Select all comments"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted">
                  Style
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted">
                  Author
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted">
                  Content
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {(data?.comments ?? []).map((comment) => (
                <tr
                  key={comment.id}
                  className="border-b border-border/60 hover:bg-muted/5"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(comment.id)}
                      onChange={() => toggleSelect(comment.id)}
                      aria-label={`Select comment by ${comment.author_name}`}
                    />
                  </td>
                  <td className="px-4 py-3 text-xs font-medium whitespace-nowrap">
                    {comment.style_slug}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted whitespace-nowrap">
                    {comment.author_name}
                  </td>
                  <td className="px-4 py-3 text-xs text-foreground max-w-md truncate">
                    {comment.content.length > 100
                      ? `${comment.content.slice(0, 100)}...`
                      : comment.content}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted whitespace-nowrap">
                    {new Date(comment.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {(data?.total ?? 0) > 0 && (
        <div className="flex items-center justify-between text-xs text-muted">
          <span>
            Page {currentPage} / {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const prev = Math.max(0, (data?.offset ?? 0) - (data?.limit ?? PAGE_SIZE));
                setOffset(prev);
              }}
              disabled={(data?.offset ?? 0) === 0}
              className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Prev
            </button>
            <button
              onClick={() => {
                const nextOffset = (data?.offset ?? 0) + (data?.limit ?? PAGE_SIZE);
                if (nextOffset < (data?.total ?? 0)) {
                  setOffset(nextOffset);
                }
              }}
              disabled={
                (data?.offset ?? 0) + (data?.limit ?? PAGE_SIZE) >= (data?.total ?? 0)
              }
              className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
