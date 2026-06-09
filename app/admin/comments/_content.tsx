"use client";

import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { RefreshCw, Search, Trash2 } from "lucide-react";
import {
  AdminButton,
  AdminCountPill,
  AdminEmptyState,
  AdminErrorState,
  AdminField,
  AdminInput,
  AdminLoadingState,
  AdminPagination,
  AdminTableShell,
  AdminToolbar,
} from "@/components/admin/admin-ui";
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

  const comments = useMemo(() => data?.comments ?? [], [data?.comments]);

  const currentPage = useMemo(() => {
    const limit = data?.limit ?? PAGE_SIZE;
    const currentOffset = data?.offset ?? offset;
    return Math.floor(currentOffset / limit) + 1;
  }, [data?.limit, data?.offset, offset]);

  const totalPages = useMemo(() => {
    if (!data) return 1;
    return Math.max(1, Math.ceil(data.total / data.limit));
  }, [data]);

  const allVisibleIds = useMemo(() => comments.map((comment) => comment.id), [comments]);

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
    return <AdminLoadingState label="Loading comments..." />;
  }

  if (error) {
    return <AdminErrorState message={error.message} onRetry={() => mutate()} />;
  }

  return (
    <div className="space-y-5">
      <AdminToolbar
        title="Comment queue"
        description="Filter by style, content, and date before selecting rows for removal."
        meta={
          <AdminCountPill>
            {comments.length} / {data?.total ?? 0}
          </AdminCountPill>
        }
        actions={
          <>
            <AdminButton
              onClick={() => {
                void handleDelete();
              }}
              disabled={selectedIds.size === 0 || deleting}
              tone="danger"
            >
              <Trash2 className="h-4 w-4" />
              {deleting
                ? "Deleting..."
                : `Delete${selectedIds.size > 0 ? ` (${selectedIds.size})` : ""}`}
            </AdminButton>
            <AdminButton
              onClick={() => {
                void mutate();
              }}
              size="icon"
              aria-label="Refresh comments"
            >
              <RefreshCw className="h-4 w-4" />
            </AdminButton>
          </>
        }
      >
        <AdminField label="Style slug" className="lg:w-56">
          <AdminInput
            value={slug}
            onChange={(event) => {
              setSlug(event.target.value);
              setOffset(0);
            }}
            placeholder="e.g. neo-brutalism"
          />
        </AdminField>
        <AdminField label="Search content" className="lg:w-72">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <AdminInput
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setOffset(0);
              }}
              placeholder="Comment text..."
              className="pl-9"
            />
          </div>
        </AdminField>
        <AdminField label="From" className="lg:w-40">
          <AdminInput
            type="date"
            value={from}
            onChange={(event) => {
              setFrom(event.target.value);
              setOffset(0);
            }}
          />
        </AdminField>
        <AdminField label="To" className="lg:w-40">
          <AdminInput
            type="date"
            value={to}
            onChange={(event) => {
              setTo(event.target.value);
              setOffset(0);
            }}
          />
        </AdminField>
        <AdminButton onClick={resetFilters} className="mt-[18px]">
          Reset
        </AdminButton>
      </AdminToolbar>

      {comments.length === 0 ? (
        <AdminEmptyState
          title="No comments found"
          description="Adjust filters or wait for new comments to arrive."
        />
      ) : (
        <AdminTableShell>
          <thead>
            <tr className="border-b border-[var(--admin-border-soft)]">
              <th className="w-10 px-4 py-3 text-left">
                <label className="flex h-11 w-11 items-center justify-center rounded-md hover:bg-muted/10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    aria-label="Select all comments"
                  />
                </label>
              </th>
              <th className="px-4 py-3 text-left">Style</th>
              <th className="px-4 py-3 text-left">Author</th>
              <th className="px-4 py-3 text-left">Content</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr
                key={comment.id}
                className="border-b border-[var(--admin-border-soft)] transition-colors last:border-0 hover:bg-muted/5"
              >
                <td className="px-4 py-3">
                  <label className="flex h-11 w-11 items-center justify-center rounded-md hover:bg-muted/10">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(comment.id)}
                      onChange={() => toggleSelect(comment.id)}
                      aria-label={`Select comment by ${comment.author_name}`}
                    />
                  </label>
                </td>
                <td className="px-4 py-3 text-xs font-medium whitespace-nowrap">
                  <code>{comment.style_slug}</code>
                </td>
                <td className="px-4 py-3 text-xs text-muted whitespace-nowrap">
                  {comment.author_name}
                </td>
                <td className="max-w-lg px-4 py-3 text-xs text-foreground">
                  <p className="line-clamp-2">{comment.content}</p>
                </td>
                <td className="px-4 py-3 text-xs text-muted whitespace-nowrap">
                  {new Date(comment.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </AdminTableShell>
      )}

      {(data?.total ?? 0) > 0 ? (
        <AdminPagination
          page={currentPage}
          totalPages={totalPages}
          summary={`Showing ${(data?.offset ?? 0) + 1}-${Math.min(
            (data?.offset ?? 0) + (data?.limit ?? PAGE_SIZE),
            data?.total ?? 0
          )} of ${data?.total ?? 0}`}
          hasPrev={(data?.offset ?? 0) > 0}
          hasNext={(data?.offset ?? 0) + (data?.limit ?? PAGE_SIZE) < (data?.total ?? 0)}
          onPrev={() => {
            const prev = Math.max(0, (data?.offset ?? 0) - (data?.limit ?? PAGE_SIZE));
            setOffset(prev);
          }}
          onNext={() => {
            const nextOffset = (data?.offset ?? 0) + (data?.limit ?? PAGE_SIZE);
            if (nextOffset < (data?.total ?? 0)) {
              setOffset(nextOffset);
            }
          }}
        />
      ) : null}
    </div>
  );
}
