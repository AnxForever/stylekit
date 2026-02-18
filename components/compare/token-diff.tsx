"use client";

import { useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { StyleTokens } from "@/lib/styles/tokens";
import { diffTokens, type TokenDiffEntry, type DiffCategory } from "@/lib/styles/token-diff";
import { StylePreviewPanel } from "./style-preview-panel";

interface TokenDiffProps {
  styleA: { slug: string; name: string; tokens: StyleTokens };
  styleB: { slug: string; name: string; tokens: StyleTokens };
}

const categoryLabels: Record<DiffCategory, { en: string; zh: string }> = {
  colors: { en: "Colors", zh: "颜色" },
  typography: { en: "Typography", zh: "字体" },
  spacing: { en: "Spacing", zh: "间距" },
  shadows: { en: "Shadows", zh: "阴影" },
  borders: { en: "Borders", zh: "边框" },
  interaction: { en: "Interaction", zh: "交互" },
};

/**
 * Diff mode: shows two style previews side-by-side with a toggle to
 * highlight token-level differences between them.
 */
export function TokenDiff({ styleA, styleB }: TokenDiffProps) {
  const { locale, t } = useI18n();
  const [showDiff, setShowDiff] = useState(false);

  const diff = useMemo(
    () => diffTokens(styleA.tokens, styleB.tokens),
    [styleA.tokens, styleB.tokens]
  );

  // Group entries by category and find which component types differ
  const componentHighlights = useMemo(() => {
    const highlights = new Set<string>();
    for (const entry of diff.entries) {
      if (entry.diffScore === 0) continue;
      // Map token categories to component types
      if (
        entry.category === "colors" &&
        (entry.property.includes("button") || entry.property.includes("primary"))
      ) {
        highlights.add("button");
      }
      if (
        entry.category === "borders" ||
        entry.category === "shadows" ||
        entry.property.includes("card")
      ) {
        highlights.add("card");
      }
      if (entry.property.includes("input") || entry.category === "borders") {
        highlights.add("input");
      }
    }
    return highlights;
  }, [diff.entries]);

  // Group diffs by category for the summary
  const categoryDiffs = useMemo(() => {
    const map = new Map<DiffCategory, TokenDiffEntry[]>();
    for (const entry of diff.entries) {
      if (entry.diffScore === 0) continue;
      const arr = map.get(entry.category) ?? [];
      arr.push(entry);
      map.set(entry.category, arr);
    }
    return map;
  }, [diff.entries]);

  return (
    <div className="space-y-4">
      {/* Header with toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {t("compare.diffMode")}
        </h3>
        <button
          type="button"
          onClick={() => setShowDiff(!showDiff)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs border transition-colors ${
            showDiff
              ? "bg-yellow-50 border-yellow-300 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-200"
              : "border-border text-muted hover:text-foreground"
          }`}
        >
          {showDiff ? (
            <EyeOff className="w-3.5 h-3.5" />
          ) : (
            <Eye className="w-3.5 h-3.5" />
          )}
          {showDiff ? t("compare.hideDiff") : t("compare.showDiff")}
        </button>
      </div>

      {/* Side-by-side previews with optional diff highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StylePreviewPanel
          name={styleA.name}
          tokens={styleA.tokens}
          highlight={showDiff ? componentHighlights : undefined}
        />
        <StylePreviewPanel
          name={styleB.name}
          tokens={styleB.tokens}
          highlight={showDiff ? componentHighlights : undefined}
        />
      </div>

      {/* Diff details panel */}
      {showDiff && categoryDiffs.size > 0 && (
        <div className="border border-border overflow-hidden">
          <div className="px-4 py-2.5 bg-muted/5 border-b border-border text-sm font-medium">
            {t("compare.diffDetails")}
          </div>
          <div className="divide-y divide-border/50">
            {Array.from(categoryDiffs.entries()).map(([category, entries]) => {
              const label =
                locale === "zh"
                  ? categoryLabels[category].zh
                  : categoryLabels[category].en;
              return (
                <div key={category} className="px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">{label}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200">
                      {entries.length} {locale === "zh" ? "差异" : "diff"}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {entries.slice(0, 5).map((entry) => (
                      <div
                        key={entry.property}
                        className="grid grid-cols-[1fr_1fr_1fr] gap-2 text-xs"
                      >
                        <code className="text-muted truncate font-mono">
                          {entry.property}
                        </code>
                        <span className="truncate bg-red-50 dark:bg-red-950/20 px-1 rounded">
                          {entry.valueA || "--"}
                        </span>
                        <span className="truncate bg-green-50 dark:bg-green-950/20 px-1 rounded">
                          {entry.valueB || "--"}
                        </span>
                      </div>
                    ))}
                    {entries.length > 5 && (
                      <div className="text-xs text-muted">
                        +{entries.length - 5} {locale === "zh" ? "更多" : "more"}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
