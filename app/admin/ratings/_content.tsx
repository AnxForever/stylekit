"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { useAdminRatings } from "@/lib/swr";

const PAGE_SIZE = 20;

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={i < rating ? "text-foreground" : "text-muted/30"}
    >
      *
    </span>
  ));
}

export function AdminRatingsContent() {
  const [slug, setSlug] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [anomaliesOnly, setAnomaliesOnly] = useState(false);
  const [offset, setOffset] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  const { data, error, isLoading, mutate } = useAdminRatings({
    limit: PAGE_SIZE,
    offset,
    slug: slug || undefined,
    rating: ratingFilter,
    anomalies: anomaliesOnly,
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
    () => (data?.ratings ?? []).map((r) => r.id),
    [data?.ratings]
  );

  const allSelected = useMemo(
    () =>
      allVisibleIds.length > 0 &&
      allVisibleIds.every((id) => selectedIds.has(id)),
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
      `Delete ${selectedIds.size} rating${selectedIds.size > 1 ? "s" : ""}? This action cannot be undone.`
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      const res = await fetch("/api/admin/ratings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [...selectedIds] }),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        throw new Error(payload?.error ?? "Failed to delete ratings.");
      }
      setSelectedIds(new Set());
      await mutate();
    } finally {
      setDeleting(false);
    }
  }, [selectedIds, mutate]);

  const resetFilters = useCallback(() => {
    setSlug("");
    setRatingFilter(null);
    setAnomaliesOnly(false);
    setOffset(0);
    setSelectedIds(new Set());
  }, []);

  const maxDistCount = useMemo(() => {
    if (!data?.distribution) return 0;
    return Math.max(...data.distribution.map((d) => d.count), 1);
  }, [data?.distribution]);

  if (isLoading) {
    return <p className="text-muted">Loading ratings...</p>;
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
            <label className="text-xs text-muted">Rating</label>
            <select
              value={ratingFilter ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                setRatingFilter(val ? Number(val) : null);
                setOffset(0);
              }}
              className="h-8 w-28 rounded-md border border-border bg-background px-2.5 text-xs text-foreground"
            >
              <option value="">All</option>
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </select>
          </div>
          <button
            onClick={() => {
              setAnomaliesOnly((prev) => !prev);
              setOffset(0);
            }}
            className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-md border text-xs font-medium transition-colors ${
              anomaliesOnly
                ? "border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-600"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Anomalies
          </button>
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
            aria-label="Refresh ratings"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Distribution Chart */}
      {data?.distribution && data.distribution.length > 0 && (
        <div className="border border-border rounded-lg p-6">
          <h2 className="text-sm font-medium mb-4">Rating Distribution</h2>
          <div className="space-y-2">
            {data.distribution.map((d) => (
              <div key={d.rating} className="flex items-center gap-3">
                <span className="text-xs text-muted w-14 text-right">
                  {d.rating} star{d.rating !== 1 ? "s" : ""}
                </span>
                <div className="flex-1 h-5 bg-muted/10 rounded overflow-hidden">
                  <div
                    className="h-full bg-foreground/20 rounded"
                    style={{
                      width: `${(d.count / maxDistCount) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-muted w-10">{d.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted">
          {data?.ratings.length ?? 0} / {data?.total ?? 0} ratings
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

      {/* Ratings Table */}
      {(data?.ratings.length ?? 0) === 0 ? (
        <p className="text-sm text-muted">No ratings found.</p>
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
                    aria-label="Select all ratings"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted">
                  Style
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted">
                  Rating
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted">
                  User / Session
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted">
                  IP
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {(data?.ratings ?? []).map((rating) => (
                <tr
                  key={rating.id}
                  className="border-b border-border/60 hover:bg-muted/5"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(rating.id)}
                      onChange={() => toggleSelect(rating.id)}
                      aria-label={`Select rating for ${rating.style_slug}`}
                    />
                  </td>
                  <td className="px-4 py-3 text-xs font-medium whitespace-nowrap">
                    {rating.style_slug}
                  </td>
                  <td className="px-4 py-3 text-xs whitespace-nowrap font-mono">
                    {renderStars(rating.rating)}{" "}
                    <span className="text-muted">{rating.rating}/5</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">
                      {anomaliesOnly && (
                        <AlertTriangle className="w-3 h-3 text-yellow-500" />
                      )}
                      {rating.session_id
                        ? rating.session_id.slice(0, 8) + "..."
                        : rating.user_id ?? "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted whitespace-nowrap">
                    {rating.ip_address ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted whitespace-nowrap">
                    {new Date(rating.created_at).toLocaleString()}
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
                const prev = Math.max(
                  0,
                  (data?.offset ?? 0) - (data?.limit ?? PAGE_SIZE)
                );
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
                const nextOffset =
                  (data?.offset ?? 0) + (data?.limit ?? PAGE_SIZE);
                if (nextOffset < (data?.total ?? 0)) {
                  setOffset(nextOffset);
                }
              }}
              disabled={
                (data?.offset ?? 0) + (data?.limit ?? PAGE_SIZE) >=
                (data?.total ?? 0)
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
