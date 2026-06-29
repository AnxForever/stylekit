"use client";

import { useState, useMemo, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  fontPairings,
  getTypographyCategories,
  generateGoogleFontsLink,
  fontStack,
  generateFontCSS,
  generateTailwindTheme,
  type FontPairing,
  type TypographyCategory,
} from "@/lib/typography";

export function TypographyContent() {
  const { t, locale } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<TypographyCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());

  const categories = useMemo(() => getTypographyCategories(), []);

  const filteredPairings = useMemo(() => {
    let result = fontPairings;

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.nameZh.includes(query) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          p.mood.some((m) => m.toLowerCase().includes(query)),
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  // Load Google Fonts dynamically for visible pairings
  useEffect(() => {
    filteredPairings.forEach((pairing) => {
      const fontKey = `${pairing.heading.family}-${pairing.body.family}`;
      if (!loadedFonts.has(fontKey)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = generateGoogleFontsLink(pairing);
        document.head.appendChild(link);
        setLoadedFonts((prev) => new Set(prev).add(fontKey));
      }
    });
  }, [filteredPairings, loadedFonts]);

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16" data-cursor-aura="off">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.16em] text-muted mb-3">
          {t("typography.subtitle")}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {t("typography.title")}
        </h1>
        <p className="text-muted leading-relaxed max-w-2xl">
          {t("typography.description")}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("typography.searchPlaceholder")}
            className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
              aria-label="Clear search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
              selectedCategory === "all"
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-muted border-border hover:border-foreground hover:text-foreground"
            }`}
          >
            {t("typography.filterAll")} ({fontPairings.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                selectedCategory === cat.category
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-muted border-border hover:border-foreground hover:text-foreground"
              }`}
            >
              {locale === "zh" ? cat.labelZh : cat.labelEn} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted mb-6">
        {t("typography.showing")} {filteredPairings.length} {t("typography.pairings")}
      </p>

      {filteredPairings.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted">{t("typography.noResults")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPairings.map((pairing) => (
            <TypographyCard
              key={pairing.id}
              pairing={pairing}
              copied={copiedId === pairing.id}
              onCopy={copyToClipboard}
              locale={locale}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface TypographyCardProps {
  pairing: FontPairing;
  copied: boolean;
  onCopy: (text: string, id: string) => void;
  locale: "zh" | "en";
}

const CATEGORY_LABEL: Record<string, string> = {
  classic: "Classic",
  modern: "Modern",
  playful: "Playful",
  editorial: "Editorial",
  technical: "Technical",
  elegant: "Elegant",
};

function TypographyCard({ pairing, copied, onCopy, locale }: TypographyCardProps) {
  const [scale, setScale] = useState(1);

  const headingFamily = fontStack(pairing.heading);
  const bodyFamily = fontStack(pairing.body);

  return (
    <div className="group border border-border rounded-xl overflow-hidden bg-background hover:border-foreground/40 hover:shadow-lg transition-all">
      {/* Full type-ramp preview (scales with slider) */}
      <div
        className="px-6 pt-6 pb-5 bg-gradient-to-br from-background to-muted/20"
        style={{ fontSize: `${16 * scale}px` }}
      >
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-[0.7rem] uppercase tracking-[0.14em] text-muted"
            style={{ fontFamily: bodyFamily }}
          >
            Heading · {pairing.heading.weight}
          </span>
          <span className="text-[0.7rem] text-muted/70">{CATEGORY_LABEL[pairing.category]}</span>
        </div>

        <h3
          className="tracking-tight mb-2"
          style={{ fontFamily: headingFamily, fontWeight: pairing.heading.weight, fontSize: "2em", lineHeight: 1.1 }}
        >
          Design Systems
        </h3>
        <h4
          className="mb-4 text-muted"
          style={{ fontFamily: headingFamily, fontWeight: pairing.heading.weight, fontSize: "1.2em", lineHeight: 1.2 }}
        >
          Subheading &amp; section title
        </h4>

        <p
          className="leading-relaxed mb-4 text-muted"
          style={{ fontFamily: bodyFamily, fontWeight: pairing.body.weight, fontSize: "0.92em", color: "hsl(var(--muted))" }}
        >
          The quick brown fox jumps over the lazy dog. A realistic paragraph shows how the
          body face reads in long-form copy at a comfortable measure.
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="tabular-nums"
            style={{ fontFamily: bodyFamily, fontWeight: 600, fontSize: "1.5em" }}
          >
            1,234.56
          </span>
          <span
            className="inline-flex items-center rounded-md px-2 py-0.5 text-[0.8em] bg-foreground text-background"
            style={{ fontFamily: bodyFamily }}
          >
            Action
          </span>
          <span
            className="text-[0.75em] text-muted border border-border rounded px-1.5 py-0.5"
            style={{ fontFamily: bodyFamily }}
          >
            Label
          </span>
        </div>
      </div>

      {/* Size slider (interactive) */}
      <div className="px-6 py-3 border-y border-border flex items-center gap-3 bg-muted/10">
        <span className="text-xs text-muted whitespace-nowrap">Aa</span>
        <input
          type="range"
          min={0.8}
          max={1.4}
          step={0.05}
          value={scale}
          onChange={(e) => setScale(Number(e.target.value))}
          className="flex-1 accent-foreground"
          aria-label="Preview font scale"
        />
        <span className="text-xs tabular-nums text-muted whitespace-nowrap w-10 text-right">
          {Math.round(scale * 100)}%
        </span>
      </div>

      {/* Info + copy */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="font-semibold text-sm truncate">
              {locale === "zh" ? pairing.nameZh : pairing.name}
            </h4>
            <p className="text-xs text-muted mt-0.5 truncate">
              {pairing.heading.family} <span className="opacity-50">·</span> {pairing.body.family}
            </p>
          </div>
          <div className="flex flex-wrap gap-1 justify-end shrink-0">
            {pairing.mood.slice(0, 2).map((m) => (
              <span key={m} className="px-1.5 py-0.5 text-[0.65rem] rounded bg-muted/40 text-muted">
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onCopy(generateFontCSS(pairing), pairing.id)}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
              copied
                ? "bg-green-500 text-white border-green-500"
                : "bg-background text-muted border-border hover:border-foreground hover:text-foreground"
            }`}
          >
            {copied ? "Copied!" : "Copy CSS"}
          </button>
          <button
            onClick={() => onCopy(generateTailwindTheme(pairing), pairing.id)}
            className="flex-1 px-3 py-2 text-xs font-medium rounded-md border bg-background text-muted border-border hover:border-foreground hover:text-foreground transition-colors"
          >
            Tailwind
          </button>
        </div>
      </div>
    </div>
  );
}
