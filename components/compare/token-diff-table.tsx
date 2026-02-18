"use client";

import { useState, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { TokenDiffEntry, DiffCategory } from "@/lib/styles/token-diff";

interface TokenDiffTableProps {
  entries: TokenDiffEntry[];
  nameA: string;
  nameB: string;
}

const categoryLabels: Record<DiffCategory, { en: string; zh: string }> = {
  colors: { en: "Colors", zh: "颜色" },
  typography: { en: "Typography", zh: "字体" },
  spacing: { en: "Spacing", zh: "间距" },
  shadows: { en: "Shadows", zh: "阴影" },
  borders: { en: "Borders", zh: "边框" },
  interaction: { en: "Interaction", zh: "交互" },
};

const categoryOrder: DiffCategory[] = [
  "colors",
  "typography",
  "spacing",
  "shadows",
  "borders",
  "interaction",
];

function isColorValue(value: string): boolean {
  return /#[0-9a-fA-F]{3,8}/.test(value) || /rgba?\(/.test(value);
}

function extractColor(value: string): string | null {
  const hex = value.match(/#[0-9a-fA-F]{3,8}/);
  if (hex) return hex[0];
  const rgba = value.match(/rgba?\([^)]+\)/);
  if (rgba) return rgba[0];
  return null;
}

function DiffBar({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const color =
    pct < 20
      ? "bg-green-500"
      : pct < 50
        ? "bg-yellow-500"
        : pct < 80
          ? "bg-orange-500"
          : "bg-red-500";

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-muted/20 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-muted tabular-nums">{pct}%</span>
    </div>
  );
}

function TokenValue({ value }: { value: string }) {
  if (!value) return <span className="text-muted italic text-xs">--</span>;

  const color = isColorValue(value) ? extractColor(value) : null;

  return (
    <div className="flex items-center gap-1.5">
      {color && (
        <span
          className="w-4 h-4 rounded border border-border shrink-0"
          style={{ backgroundColor: color }}
        />
      )}
      <code className="text-xs break-all leading-relaxed">{value}</code>
    </div>
  );
}

export function TokenDiffTable({ entries, nameA, nameB }: TokenDiffTableProps) {
  const { locale, t } = useI18n();
  const [collapsed, setCollapsed] = useState<Set<DiffCategory>>(new Set());

  const grouped = useMemo(() => {
    const map = new Map<DiffCategory, TokenDiffEntry[]>();
    for (const cat of categoryOrder) {
      map.set(cat, []);
    }
    for (const entry of entries) {
      const arr = map.get(entry.category);
      if (arr) arr.push(entry);
    }
    // Sort each group by diffScore descending
    for (const arr of map.values()) {
      arr.sort((a, b) => b.diffScore - a.diffScore);
    }
    return map;
  }, [entries]);

  const toggleCategory = (cat: DiffCategory) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  return (
    <div className="border border-border overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[1fr_1.5fr_1.5fr_100px] gap-2 px-4 py-3 bg-muted/5 border-b border-border text-xs font-medium text-muted">
        <span>{t("compare.property")}</span>
        <span>{nameA}</span>
        <span>{nameB}</span>
        <span>{t("compare.difference")}</span>
      </div>

      {categoryOrder.map((cat) => {
        const items = grouped.get(cat) ?? [];
        if (items.length === 0) return null;

        const isCollapsed = collapsed.has(cat);
        const label =
          locale === "zh"
            ? categoryLabels[cat].zh
            : categoryLabels[cat].en;
        const diffCount = items.filter((i) => i.diffScore > 0).length;

        return (
          <div key={cat}>
            {/* Category header */}
            <button
              type="button"
              onClick={() => toggleCategory(cat)}
              className="w-full flex items-center gap-2 px-4 py-2.5 bg-muted/5 border-b border-border text-sm font-medium hover:bg-muted/10 transition-colors text-left"
            >
              <ChevronRight
                className={`w-4 h-4 text-muted transition-transform ${isCollapsed ? "" : "rotate-90"}`}
              />
              <span>{label}</span>
              <span className="text-xs text-muted font-normal">
                ({items.length} {locale === "zh" ? "项" : "props"})
              </span>
              {diffCount > 0 && (
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200">
                  {diffCount} {locale === "zh" ? "差异" : "diff"}
                </span>
              )}
            </button>

            {/* Category rows */}
            {!isCollapsed &&
              items.map((entry) => (
                <div
                  key={`${cat}-${entry.property}`}
                  className={`grid grid-cols-[1fr_1.5fr_1.5fr_100px] gap-2 px-4 py-2 border-b border-border/50 text-sm ${
                    entry.diffScore > 0.5
                      ? "bg-red-50/30 dark:bg-red-950/10"
                      : entry.diffScore > 0
                        ? "bg-yellow-50/30 dark:bg-yellow-950/10"
                        : ""
                  }`}
                >
                  <span className="text-xs font-mono text-muted truncate">
                    {entry.property}
                  </span>
                  <TokenValue value={entry.valueA} />
                  <TokenValue value={entry.valueB} />
                  <DiffBar score={entry.diffScore} />
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
}
