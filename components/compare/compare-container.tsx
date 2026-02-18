"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus, ArrowLeftRight, BarChart3, Link2, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { diffTokens, type TokenDiffResult } from "@/lib/styles/token-diff";
import { StyleSelector } from "./style-selector";
import { TokenDiffTable } from "./token-diff-table";
import { VisualCompare } from "./visual-compare";
import { ComponentCompare } from "./component-compare";
import { TokenDiff } from "./token-diff";
import {
  RecentComparisons,
  useRecentComparisons,
} from "./recent-comparisons";

export function CompareContainer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { locale, t } = useI18n();
  const allStyles = getAllStylesMeta();
  const { recent, addRecent, clearRecent } = useRecentComparisons();

  // Read initial slugs from URL
  const [slugs, setSlugs] = useState<(string | null)[]>(() => {
    const a = searchParams.get("a");
    const b = searchParams.get("b");
    const c = searchParams.get("c");
    return [a, b, c ?? null];
  });

  // Sync state to URL
  const syncUrl = useCallback(
    (newSlugs: (string | null)[]) => {
      const params = new URLSearchParams();
      if (newSlugs[0]) params.set("a", newSlugs[0]);
      if (newSlugs[1]) params.set("b", newSlugs[1]);
      if (newSlugs[2]) params.set("c", newSlugs[2]);
      const qs = params.toString();
      router.replace(qs ? `/compare?${qs}` : "/compare", { scroll: false });
    },
    [router]
  );

  const updateSlug = useCallback(
    (index: number, value: string | null) => {
      setSlugs((prev) => {
        const next = [...prev];
        next[index] = value;
        syncUrl(next);
        return next;
      });
    },
    [syncUrl]
  );

  // Save to recent when both slugs are selected
  const selectedSlugs = slugs.filter((s): s is string => !!s);
  useEffect(() => {
    if (selectedSlugs.length >= 2) {
      addRecent(selectedSlugs);
    }
  }, [selectedSlugs.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps

  // How many selectors to show (2 or 3)
  const [showThird, setShowThird] = useState(() => !!searchParams.get("c"));

  const addThird = () => {
    setShowThird(true);
  };

  const removeThird = () => {
    setShowThird(false);
    updateSlug(2, null);
  };

  const swapAB = useCallback(() => {
    setSlugs((prev) => {
      const next = [prev[1], prev[0], prev[2]];
      syncUrl(next);
      return next;
    });
  }, [syncUrl]);

  const [urlCopied, setUrlCopied] = useState(false);
  const copyUrl = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2000);
    }).catch(() => {
      // clipboard write failed silently
    });
  }, []);

  const excludeFor = (index: number) =>
    slugs.filter((s, i): s is string => !!s && i !== index);

  // Handle selecting a recent comparison
  const handleSelectRecent = useCallback(
    (recentSlugs: string[]) => {
      const newSlugs: (string | null)[] = [
        recentSlugs[0] ?? null,
        recentSlugs[1] ?? null,
        recentSlugs[2] ?? null,
      ];
      setSlugs(newSlugs);
      syncUrl(newSlugs);
      if (recentSlugs.length >= 3) {
        setShowThird(true);
      }
    },
    [syncUrl]
  );

  // Get tokens for selected styles
  const stylesWithTokens = useMemo(
    () =>
      selectedSlugs
        .map((slug) => {
          const meta = allStyles.find((s) => s.slug === slug);
          const tokens = getStyleTokens(slug);
          if (!meta || !tokens) return null;
          return { slug, name: meta.name, nameEn: meta.nameEn, tokens };
        })
        .filter(
          (s): s is NonNullable<typeof s> => s !== null
        ),
    [selectedSlugs, allStyles]
  );

  // Compute diff between first two selected styles
  const diffResult: TokenDiffResult | null = useMemo(() => {
    if (stylesWithTokens.length < 2) return null;
    return diffTokens(stylesWithTokens[0].tokens, stylesWithTokens[1].tokens);
  }, [stylesWithTokens]);

  const nameA =
    stylesWithTokens[0]
      ? locale === "zh"
        ? stylesWithTokens[0].name
        : stylesWithTokens[0].nameEn
      : "";
  const nameB =
    stylesWithTokens[1]
      ? locale === "zh"
        ? stylesWithTokens[1].name
        : stylesWithTokens[1].nameEn
      : "";

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12 space-y-8">
      {/* Recent comparisons */}
      <RecentComparisons
        recent={recent}
        onSelect={handleSelectRecent}
        onClear={clearRecent}
      />

      {/* Selectors row */}
      <div className="space-y-4">
        <div
          className={`grid gap-4 ${showThird ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}
        >
          <StyleSelector
            value={slugs[0]}
            onChange={(v) => updateSlug(0, v)}
            label={t("compare.styleA")}
            excludeSlugs={excludeFor(0)}
          />

          <StyleSelector
            value={slugs[1]}
            onChange={(v) => updateSlug(1, v)}
            label={t("compare.styleB")}
            excludeSlugs={excludeFor(1)}
          />

          {showThird && (
            <StyleSelector
              value={slugs[2]}
              onChange={(v) => updateSlug(2, v)}
              label={t("compare.styleC")}
              excludeSlugs={excludeFor(2)}
            />
          )}
        </div>

        <div className="flex items-center gap-3">
          {!showThird && (
            <button
              type="button"
              onClick={addThird}
              className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              {t("compare.addThird")}
            </button>
          )}
          {showThird && (
            <button
              type="button"
              onClick={removeThird}
              className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
            >
              {t("compare.removeThird")}
            </button>
          )}
          {slugs[0] && slugs[1] && (
            <button
              type="button"
              onClick={swapAB}
              className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              {t("compare.swapStyles")}
            </button>
          )}
          {selectedSlugs.length >= 2 && (
            <button
              type="button"
              onClick={copyUrl}
              className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors ml-auto"
            >
              {urlCopied ? (
                <Check className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <Link2 className="w-3.5 h-3.5" />
              )}
              {urlCopied ? t("compare.urlCopied") : t("compare.copyUrl")}
            </button>
          )}
        </div>
      </div>

      {/* Empty state */}
      {stylesWithTokens.length < 2 && (
        <div className="text-center py-16 space-y-4">
          <ArrowLeftRight className="w-12 h-12 text-muted/30 mx-auto" />
          <p className="text-muted text-sm">{t("compare.selectTwo")}</p>
        </div>
      )}

      {/* Summary scores */}
      {diffResult && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-muted" />
            <h3 className="text-lg font-semibold">
              {t("compare.diffSummary")}
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SummaryCard
              label={t("compare.totalProps")}
              value={String(diffResult.summary.totalProperties)}
            />
            <SummaryCard
              label={t("compare.differentProps")}
              value={String(diffResult.summary.differentProperties)}
            />
            <SummaryCard
              label={t("compare.overallDiff")}
              value={`${Math.round(diffResult.summary.overallScore * 100)}%`}
            />
            <SummaryCard
              label={t("compare.colorDiff")}
              value={`${Math.round(diffResult.summary.categoryScores.colors * 100)}%`}
            />
          </div>
        </div>
      )}

      {/* Diff mode - side-by-side with highlight toggle */}
      {stylesWithTokens.length >= 2 && (
        <TokenDiff
          styleA={{
            slug: stylesWithTokens[0].slug,
            name: locale === "zh" ? stylesWithTokens[0].name : stylesWithTokens[0].nameEn,
            tokens: stylesWithTokens[0].tokens,
          }}
          styleB={{
            slug: stylesWithTokens[1].slug,
            name: locale === "zh" ? stylesWithTokens[1].name : stylesWithTokens[1].nameEn,
            tokens: stylesWithTokens[1].tokens,
          }}
        />
      )}

      {/* Component compare */}
      {stylesWithTokens.length >= 2 && (
        <ComponentCompare
          styleA={stylesWithTokens[0].slug}
          styleB={stylesWithTokens[1].slug}
          styleC={stylesWithTokens[2]?.slug}
          styleAName={locale === "zh" ? stylesWithTokens[0].name : stylesWithTokens[0].nameEn}
          styleBName={locale === "zh" ? stylesWithTokens[1].name : stylesWithTokens[1].nameEn}
          styleCName={stylesWithTokens[2] ? (locale === "zh" ? stylesWithTokens[2].name : stylesWithTokens[2].nameEn) : undefined}
        />
      )}

      {/* Visual compare */}
      {stylesWithTokens.length >= 2 && (
        <VisualCompare styles={stylesWithTokens} />
      )}

      {/* Diff table */}
      {diffResult && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {t("compare.tokenDiff")}
          </h3>
          <TokenDiffTable
            entries={diffResult.entries}
            nameA={nameA}
            nameB={nameB}
          />
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-4 text-center">
      <div className="text-2xl font-bold tabular-nums">{value}</div>
      <div className="text-xs text-muted mt-1">{label}</div>
    </div>
  );
}
