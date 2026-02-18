"use client";

import { useMemo, useState, useDeferredValue } from "react";
import { RefreshCw, LayoutGrid, List } from "lucide-react";
import { useAdminStyles } from "@/lib/swr";

type ViewMode = "grid" | "table";
type SortField = "name" | "views" | "rating" | "comments" | "favorites";
type SortOrder = "asc" | "desc";

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "modern", label: "Modern" },
  { value: "retro", label: "Retro" },
  { value: "minimal", label: "Minimal" },
  { value: "expressive", label: "Expressive" },
] as const;

const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "views", label: "Views" },
  { value: "rating", label: "Avg Rating" },
  { value: "comments", label: "Comments" },
  { value: "favorites", label: "Favorites" },
];

function ColorSwatch({
  colors,
}: {
  colors: { primary: string; secondary: string; accent: string[] };
}) {
  return (
    <div className="flex gap-1">
      <span
        className="w-3 h-3 rounded-full border border-border"
        style={{ backgroundColor: colors.primary }}
      />
      <span
        className="w-3 h-3 rounded-full border border-border"
        style={{ backgroundColor: colors.secondary }}
      />
      {colors.accent[0] && (
        <span
          className="w-3 h-3 rounded-full border border-border"
          style={{ backgroundColor: colors.accent[0] }}
        />
      )}
    </div>
  );
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

  const handleColumnSort = (field: SortField) => {
    if (sort === field) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSort(field);
      setOrder("desc");
    }
  };

  if (isLoading) {
    return <p className="text-muted">Loading styles...</p>;
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

  const styles = data?.styles ?? [];

  return (
    <div className="space-y-6">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or slug..."
          className="h-9 w-64 rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortField)}
          className="h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => setOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
          className="h-9 px-3 rounded-md border border-border text-sm text-muted hover:text-foreground transition-colors"
        >
          {order === "asc" ? "Asc" : "Desc"}
        </button>

        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "grid"
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground"
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "table"
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground"
            }`}
            aria-label="Table view"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => mutate()}
            className="p-2 text-muted hover:text-foreground transition-colors"
            aria-label="Refresh data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Empty state */}
      {styles.length === 0 && (
        <p className="text-muted text-sm">No styles match the current filters.</p>
      )}

      {/* Grid view */}
      {viewMode === "grid" && styles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {styles.map((style) => (
            <div
              key={style.slug}
              className="border border-border rounded-lg p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <ColorSwatch colors={style.colors} />
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted/20 text-muted capitalize">
                  {style.category}
                </span>
              </div>
              <p className="text-sm font-semibold">{style.name}</p>
              <p className="text-xs text-muted">{style.nameEn}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted">
                <span>Views: {style.stats.views.toLocaleString()}</span>
                <span>
                  Avg Rating:{" "}
                  {style.stats.avgRating > 0
                    ? style.stats.avgRating.toFixed(1)
                    : "-"}
                </span>
                <span>Comments: {style.stats.totalComments}</span>
                <span>Favorites: {style.stats.totalFavorites}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table view */}
      {viewMode === "table" && styles.length > 0 && (
        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/10">
                {(
                  [
                    { field: "name" as SortField, label: "Name" },
                    { field: null, label: "Category" },
                    { field: "views" as SortField, label: "Views" },
                    { field: "rating" as SortField, label: "Avg Rating" },
                    { field: "comments" as SortField, label: "Comments" },
                    { field: "favorites" as SortField, label: "Favorites" },
                  ] as const
                ).map((col) => (
                  <th
                    key={col.label}
                    className={`px-4 py-3 text-left text-xs font-medium text-muted ${
                      col.field ? "cursor-pointer hover:text-foreground" : ""
                    }`}
                    onClick={col.field ? () => handleColumnSort(col.field!) : undefined}
                  >
                    {col.label}
                    {col.field && sort === col.field && (
                      <span className="ml-1">{order === "asc" ? "^" : "v"}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {styles.map((style) => (
                <tr
                  key={style.slug}
                  className="border-b border-border/50 last:border-0"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <ColorSwatch colors={style.colors} />
                      <div>
                        <p className="font-medium">{style.name}</p>
                        <p className="text-xs text-muted">{style.nameEn}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted/20 text-muted capitalize">
                      {style.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {style.stats.views.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {style.stats.avgRating > 0
                      ? style.stats.avgRating.toFixed(1)
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {style.stats.totalComments}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {style.stats.totalFavorites}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
