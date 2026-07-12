"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { ArrowDownAZ, ArrowUpAZ, LayoutGrid, List, RefreshCw } from "lucide-react";
import {
  AdminBadge,
  AdminButton,
  AdminCountPill,
  AdminEmptyState,
  AdminErrorState,
  AdminField,
  AdminInput,
  AdminLoadingState,
  AdminPanel,
  AdminSegmentedControl,
  AdminSelect,
  AdminTableShell,
  AdminToolbar,
} from "@/components/admin/admin-ui";
import { useAdminStyles } from "@/lib/swr";

type ViewMode = "grid" | "table";
type SortField = "name" | "views" | "rating" | "comments" | "favorites";
type SortOrder = "asc" | "desc";

const CATEGORIES = [
  { value: "", label: "全部" },
  { value: "modern", label: "现代" },
  { value: "retro", label: "复古" },
  { value: "minimal", label: "极简" },
  { value: "expressive", label: "表现力" },
] as const;

const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORIES.filter((category) => category.value).map((category) => [
    category.value,
    category.label,
  ])
);

const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: "name", label: "名称" },
  { value: "views", label: "浏览量" },
  { value: "rating", label: "平均评分" },
  { value: "comments", label: "评论数" },
  { value: "favorites", label: "收藏数" },
];

const TABLE_COLUMNS = [
  { field: "name" as SortField, label: "名称" },
  { field: null, label: "分类" },
  { field: "views" as SortField, label: "浏览量" },
  { field: "rating" as SortField, label: "平均评分" },
  { field: "comments" as SortField, label: "评论数" },
  { field: "favorites" as SortField, label: "收藏数" },
] as const;

function ColorSwatch({
  colors,
}: {
  colors: { primary: string; secondary: string; accent: string[] };
}) {
  const allColors = [colors.primary, colors.secondary, ...colors.accent].filter(Boolean);

  return (
    <div className="flex overflow-hidden rounded-md shadow-[var(--admin-shadow-border)]">
      {allColors.slice(0, 4).map((color, index) => (
        <span
          key={`${color}-${index}`}
          className="h-7 w-8 border-r border-black/10 last:border-r-0"
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
    </div>
  );
}

function formatRating(value: number) {
  return value > 0 ? value.toFixed(1) : "-";
}

export function AdminStylesContent() {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<SortField>("name");
  const [order, setOrder] = useState<SortOrder>("desc");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const deferredSearch = useDeferredValue(search);

  const query = useMemo(
    () => ({
      category: category || undefined,
      sort,
      order,
      search: deferredSearch || undefined,
    }),
    [category, sort, order, deferredSearch]
  );

  const { data, error, isLoading, mutate } = useAdminStyles(query);

  const styles = useMemo(() => data?.styles ?? [], [data?.styles]);
  const totals = useMemo(
    () =>
      styles.reduce(
        (acc, style) => {
          acc.views += style.stats.views;
          acc.comments += style.stats.totalComments;
          acc.favorites += style.stats.totalFavorites;
          return acc;
        },
        { views: 0, comments: 0, favorites: 0 }
      ),
    [styles]
  );

  const handleColumnSort = (field: SortField) => {
    if (sort === field) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSort(field);
      setOrder("desc");
    }
  };

  if (isLoading) {
    return <AdminLoadingState label="正在加载风格目录..." />;
  }

  if (error) {
    return <AdminErrorState message="加载风格目录失败，请重试。" onRetry={() => mutate()} />;
  }

  return (
    <div className="space-y-5">
      <AdminToolbar
        title="目录表现"
        description="比较风格互动数据、查看配色，并在网格预览与紧凑排名之间切换。"
        meta={<AdminCountPill>{styles.length} 种风格</AdminCountPill>}
        actions={
          <>
            <AdminSegmentedControl<ViewMode>
              value={viewMode}
              onChange={setViewMode}
              ariaLabel="风格查看模式"
              options={[
                {
                  value: "grid",
                  label: <LayoutGrid className="h-4 w-4" />,
                  ariaLabel: "网格视图",
                },
                {
                  value: "table",
                  label: <List className="h-4 w-4" />,
                  ariaLabel: "表格视图",
                },
              ]}
            />
            <AdminButton
              onClick={() => mutate()}
              size="icon"
              aria-label="刷新数据"
            >
              <RefreshCw className="h-4 w-4" />
            </AdminButton>
          </>
        }
      >
        <AdminField label="搜索" className="lg:w-72">
          <AdminInput
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="输入名称或标识..."
          />
        </AdminField>
        <AdminField label="分类" className="lg:w-44">
          <AdminSelect
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </AdminSelect>
        </AdminField>
        <AdminField label="排序方式" className="lg:w-44">
          <AdminSelect
            value={sort}
            onChange={(event) => setSort(event.target.value as SortField)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </AdminSelect>
        </AdminField>
        <AdminButton
          onClick={() => setOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
          className="mt-[18px]"
        >
          {order === "asc" ? (
            <ArrowUpAZ className="h-4 w-4" />
          ) : (
            <ArrowDownAZ className="h-4 w-4" />
          )}
          {order === "asc" ? "升序" : "降序"}
        </AdminButton>
      </AdminToolbar>

      {styles.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-3">
          <AdminPanel className="p-4">
            <p className="text-xs text-muted">总浏览量</p>
            <p className="mt-1 text-xl font-semibold tabular-nums">
              {totals.views.toLocaleString()}
            </p>
          </AdminPanel>
          <AdminPanel className="p-4">
            <p className="text-xs text-muted">评论数</p>
            <p className="mt-1 text-xl font-semibold tabular-nums">
              {totals.comments.toLocaleString()}
            </p>
          </AdminPanel>
          <AdminPanel className="p-4">
            <p className="text-xs text-muted">收藏数</p>
            <p className="mt-1 text-xl font-semibold tabular-nums">
              {totals.favorites.toLocaleString()}
            </p>
          </AdminPanel>
        </div>
      ) : null}

      {styles.length === 0 ? (
        <AdminEmptyState
          title="没有符合当前筛选条件的风格"
          description="请尝试其他搜索词、分类或排序方式。"
        />
      ) : null}

      {viewMode === "grid" && styles.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {styles.map((style) => (
            <AdminPanel
              key={style.slug}
              className="overflow-hidden transition-colors hover:border-foreground/25"
            >
              <div className="h-2 w-full" style={{ backgroundColor: style.colors.primary }} />
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{style.name}</p>
                    <p className="mt-1 truncate text-xs text-muted">{style.nameEn}</p>
                  </div>
                  <AdminBadge className="capitalize">
                    {CATEGORY_LABELS[style.category] ?? style.category}
                  </AdminBadge>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <ColorSwatch colors={style.colors} />
                  <code className="truncate text-[11px] text-muted">{style.slug}</code>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
                  <div>
                    <p className="text-muted">浏览</p>
                    <p className="mt-1 font-semibold tabular-nums">
                      {style.stats.views.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted">评分</p>
                    <p className="mt-1 font-semibold tabular-nums">
                      {formatRating(style.stats.avgRating)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted">评论</p>
                    <p className="mt-1 font-semibold tabular-nums">
                      {style.stats.totalComments}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted">收藏</p>
                    <p className="mt-1 font-semibold tabular-nums">
                      {style.stats.totalFavorites}
                    </p>
                  </div>
                </div>
              </div>
            </AdminPanel>
          ))}
        </div>
      ) : null}

      {viewMode === "table" && styles.length > 0 ? (
        <AdminTableShell>
          <thead>
            <tr>
              {TABLE_COLUMNS.map((col) => (
                <th
                  key={col.label}
                  className="px-4 py-3 text-left"
                  aria-sort={
                    col.field && sort === col.field
                      ? order === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                >
                  {col.field ? (
                    <button
                      type="button"
                      onClick={() => handleColumnSort(col.field)}
                      className="inline-flex min-h-11 items-center gap-1 rounded-md px-1 text-left transition-colors hover:text-foreground"
                    >
                      {col.label}
                      {sort === col.field ? (
                        <span aria-hidden="true">{order === "asc" ? "^" : "v"}</span>
                      ) : null}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {styles.map((style) => (
              <tr
                key={style.slug}
                className="transition-colors hover:bg-[var(--admin-input)]"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <ColorSwatch colors={style.colors} />
                    <div className="min-w-0">
                      <p className="truncate font-medium">{style.name}</p>
                      <p className="truncate text-xs text-muted">{style.nameEn}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <AdminBadge className="capitalize">
                    {CATEGORY_LABELS[style.category] ?? style.category}
                  </AdminBadge>
                </td>
                <td className="px-4 py-3 text-muted tabular-nums">
                  {style.stats.views.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-muted tabular-nums">
                  {formatRating(style.stats.avgRating)}
                </td>
                <td className="px-4 py-3 text-muted tabular-nums">
                  {style.stats.totalComments}
                </td>
                <td className="px-4 py-3 text-muted tabular-nums">
                  {style.stats.totalFavorites}
                </td>
              </tr>
            ))}
          </tbody>
        </AdminTableShell>
      ) : null}
    </div>
  );
}
