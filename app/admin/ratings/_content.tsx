"use client";

import { useCallback, useMemo, useState } from "react";
import { AlertTriangle, RefreshCw, Star, Trash2 } from "lucide-react";
import {
  AdminBadge,
  AdminButton,
  AdminCountPill,
  AdminEmptyState,
  AdminErrorState,
  AdminField,
  AdminInput,
  AdminLoadingState,
  AdminPagination,
  AdminPanel,
  AdminSelect,
  AdminTableShell,
  AdminToolbar,
} from "@/components/admin/admin-ui";
import { useAdminRatings } from "@/lib/swr";

const PAGE_SIZE = 20;

function RatingStars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`h-3.5 w-3.5 ${
            index < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted/15 text-muted/25"
          }`}
        />
      ))}
      <span className="ml-1 text-muted">{rating}/5</span>
    </span>
  );
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

  const ratings = useMemo(() => data?.ratings ?? [], [data?.ratings]);

  const currentPage = useMemo(() => {
    const limit = data?.limit ?? PAGE_SIZE;
    const currentOffset = data?.offset ?? offset;
    return Math.floor(currentOffset / limit) + 1;
  }, [data?.limit, data?.offset, offset]);

  const totalPages = useMemo(() => {
    if (!data) return 1;
    return Math.max(1, Math.ceil(data.total / data.limit));
  }, [data]);

  const allVisibleIds = useMemo(() => ratings.map((rating) => rating.id), [ratings]);

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
      `确定删除选中的 ${selectedIds.size} 条评分吗？此操作不可撤销。`
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
        throw new Error(payload?.error ?? "删除评分失败。");
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
    return Math.max(...data.distribution.map((item) => item.count), 1);
  }, [data?.distribution]);

  if (isLoading) {
    return <AdminLoadingState label="正在加载评分..." />;
  }

  if (error) {
    return <AdminErrorState message="加载评分失败，请重试。" onRetry={() => mutate()} />;
  }

  return (
    <div className="space-y-5">
      <AdminToolbar
        title="评分队列"
        description="可按风格、分数和异常状态筛选，再批量删除评分。"
        meta={
          <AdminCountPill tone={anomaliesOnly ? "warning" : "neutral"}>
            {ratings.length} / {data?.total ?? 0}
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
                ? "正在删除..."
                : `删除${selectedIds.size > 0 ? `（${selectedIds.size}）` : ""}`}
            </AdminButton>
            <AdminButton
              onClick={() => {
                void mutate();
              }}
              size="icon"
              aria-label="刷新评分"
            >
              <RefreshCw className="h-4 w-4" />
            </AdminButton>
          </>
        }
      >
        <AdminField label="风格标识" className="lg:w-56">
          <AdminInput
            value={slug}
            onChange={(event) => {
              setSlug(event.target.value);
              setOffset(0);
            }}
            placeholder="例如 neo-brutalism"
          />
        </AdminField>
        <AdminField label="评分" className="lg:w-40">
          <AdminSelect
            value={ratingFilter ?? ""}
            onChange={(event) => {
              const nextValue = event.target.value;
              setRatingFilter(nextValue ? Number(nextValue) : null);
              setOffset(0);
            }}
          >
            <option value="">全部</option>
            <option value="1">1 星</option>
            <option value="2">2 星</option>
            <option value="3">3 星</option>
            <option value="4">4 星</option>
            <option value="5">5 星</option>
          </AdminSelect>
        </AdminField>
        <AdminButton
          onClick={() => {
            setAnomaliesOnly((prev) => !prev);
            setOffset(0);
          }}
          tone={anomaliesOnly ? "primary" : "neutral"}
          className="mt-[18px]"
        >
          <AlertTriangle className="h-4 w-4" />
          异常评分
        </AdminButton>
        <AdminButton onClick={resetFilters} className="mt-[18px]">
          重置
        </AdminButton>
      </AdminToolbar>

      {data?.distribution && data.distribution.length > 0 ? (
        <AdminPanel className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">评分分布</h2>
            <AdminBadge>共 {data.distribution.reduce((sum, item) => sum + item.count, 0)} 条</AdminBadge>
          </div>
          <div className="grid gap-3 md:grid-cols-5">
            {data.distribution.map((item) => (
              <div key={item.rating} className="rounded-md p-3 shadow-[var(--admin-shadow-border)]">
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>{item.rating} 星</span>
                  <span className="tabular-nums">{item.count}</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted/15">
                  <div
                    className="h-full rounded-full bg-[var(--admin-text-primary)]"
                    style={{ width: `${(item.count / maxDistCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </AdminPanel>
      ) : null}

      {ratings.length === 0 ? (
        <AdminEmptyState
          title="暂无评分"
          description="请调整筛选条件，或等待新的评分。"
        />
      ) : (
        <AdminTableShell>
          <thead>
            <tr>
              <th className="w-10 px-4 py-3 text-left">
                <label className="flex h-11 w-11 items-center justify-center rounded-md hover:bg-muted/10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    aria-label="选择全部评分"
                  />
                </label>
              </th>
              <th className="px-4 py-3 text-left">风格</th>
              <th className="px-4 py-3 text-left">评分</th>
              <th className="px-4 py-3 text-left">用户 / 会话</th>
              <th className="px-4 py-3 text-left">IP</th>
              <th className="px-4 py-3 text-left">日期</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((rating) => (
              <tr
                key={rating.id}
                className="transition-colors hover:bg-[var(--admin-input)]"
              >
                <td className="px-4 py-3">
                  <label className="flex h-11 w-11 items-center justify-center rounded-md hover:bg-muted/10">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(rating.id)}
                      onChange={() => toggleSelect(rating.id)}
                      aria-label={`选择 ${rating.style_slug} 的评分`}
                    />
                  </label>
                </td>
                <td className="px-4 py-3 text-xs font-medium whitespace-nowrap">
                  <code>{rating.style_slug}</code>
                </td>
                <td className="px-4 py-3 text-xs whitespace-nowrap">
                  <RatingStars rating={rating.rating} />
                </td>
                <td className="px-4 py-3 text-xs text-muted whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5">
                    {anomaliesOnly ? (
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                    ) : null}
                    {rating.session_id
                      ? `${rating.session_id.slice(0, 8)}...`
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
        </AdminTableShell>
      )}

      {(data?.total ?? 0) > 0 ? (
        <AdminPagination
          page={currentPage}
          totalPages={totalPages}
          summary={`显示 ${(data?.offset ?? 0) + 1}-${Math.min(
            (data?.offset ?? 0) + (data?.limit ?? PAGE_SIZE),
            data?.total ?? 0
          )}，共 ${data?.total ?? 0} 条`}
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
