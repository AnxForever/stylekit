"use client";

import { useState, useCallback } from "react";
import { Clock, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { getAllStylesMeta } from "@/lib/styles/meta";

const STORAGE_KEY = "stylekit-recent-comparisons";
const MAX_RECENT = 5;

export interface RecentComparison {
  slugs: string[];
  timestamp: number;
}

function loadRecent(): RecentComparison[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, MAX_RECENT);
  } catch {
    return [];
  }
}

function saveRecent(items: RecentComparison[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_RECENT)));
  } catch {
    // localStorage may be unavailable
  }
}

export function useRecentComparisons() {
  const [recent, setRecent] = useState<RecentComparison[]>(() => loadRecent());

  const addRecent = useCallback((slugs: string[]) => {
    const filtered = slugs.filter(Boolean);
    if (filtered.length < 2) return;

    setRecent((prev) => {
      // Remove duplicates (same set of slugs)
      const key = [...filtered].sort().join(",");
      const next = prev.filter(
        (r) => [...r.slugs].sort().join(",") !== key
      );
      next.unshift({ slugs: filtered, timestamp: Date.now() });
      const trimmed = next.slice(0, MAX_RECENT);
      saveRecent(trimmed);
      return trimmed;
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecent([]);
    saveRecent([]);
  }, []);

  return { recent, addRecent, clearRecent };
}

interface RecentComparisonsProps {
  recent: RecentComparison[];
  onSelect: (slugs: string[]) => void;
  onClear: () => void;
}

export function RecentComparisons({
  recent,
  onSelect,
  onClear,
}: RecentComparisonsProps) {
  const { locale, t } = useI18n();
  const allStyles = getAllStylesMeta();

  if (recent.length === 0) return null;

  const getStyleName = (slug: string) => {
    const meta = allStyles.find((s) => s.slug === slug);
    if (!meta) return slug;
    return locale === "zh" ? meta.name : meta.nameEn;
  };

  const getStyleColor = (slug: string) => {
    const meta = allStyles.find((s) => s.slug === slug);
    return meta?.colors.primary ?? "#888";
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <Clock className="w-3.5 h-3.5" />
          <span>{t("compare.recentTitle")}</span>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="text-[10px] text-muted hover:text-foreground transition-colors"
        >
          {t("compare.clearRecent")}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {recent.map((r) => (
          <button
            key={r.slugs.join(",")}
            type="button"
            onClick={() => onSelect(r.slugs)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-border hover:bg-muted/10 transition-colors"
          >
            {r.slugs.map((slug, si) => (
              <span key={slug} className="flex items-center gap-1">
                {si > 0 && (
                  <X className="w-2.5 h-2.5 text-muted/50 rotate-45" />
                )}
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: getStyleColor(slug) }}
                />
                <span className="truncate max-w-[80px]">
                  {getStyleName(slug)}
                </span>
              </span>
            ))}
          </button>
        ))}
      </div>
    </div>
  );
}
