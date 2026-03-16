"use client";

import { useState, useMemo, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  fontPairings,
  getTypographyCategories,
  generateGoogleFontsLink,
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
          p.mood.some((m) => m.toLowerCase().includes(query))
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
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
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
        {/* Search */}
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

        {/* Category Filter */}
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

      {/* Results Count */}
      <p className="text-sm text-muted mb-6">
        {t("typography.showing")} {filteredPairings.length} {t("typography.pairings")}
      </p>

      {/* Typography Grid */}
      {filteredPairings.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted">{t("typography.noResults")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

function TypographyCard({ pairing, copied, onCopy, locale }: TypographyCardProps) {
  const [copyMode, setCopyMode] = useState<"css" | "tailwind">("css");

  return (
    <div className="group border border-border rounded-lg overflow-hidden bg-background hover:border-foreground/50 transition-colors">
      {/* Font Preview */}
      <div className="p-6 space-y-4 bg-gradient-to-br from-background to-muted/10">
        {/* Heading Sample */}
        <div>
          <p className="text-xs text-muted mb-2">{pairing.heading.family}</p>
          <h3
            className="text-3xl tracking-tight"
            style={{
              fontFamily: `'${pairing.heading.family}', serif`,
              fontWeight: pairing.heading.weight,
            }}
          >
            The Quick Brown Fox
          </h3>
        </div>

        {/* Body Sample */}
        <div>
          <p className="text-xs text-muted mb-2">{pairing.body.family}</p>
          <p
            className="text-base leading-relaxed"
            style={{
              fontFamily: `'${pairing.body.family}', sans-serif`,
              fontWeight: pairing.body.weight,
            }}
          >
            The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
          </p>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Name */}
        <div>
          <h4 className="font-semibold text-sm">
            {locale === "zh" ? pairing.nameZh : pairing.name}
          </h4>
          <p className="text-xs text-muted mt-0.5">
            {pairing.mood.join(", ")}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {pairing.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-xs rounded bg-muted/30 text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Copy Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setCopyMode("css");
              onCopy(pairing.css, pairing.id);
            }}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded border transition-colors ${
              copyMode === "css" && copied
                ? "bg-green-500 text-white border-green-500"
                : "bg-background text-muted border-border hover:border-foreground hover:text-foreground"
            }`}
          >
            {copyMode === "css" && copied ? "Copied!" : "Copy CSS"}
          </button>
          <button
            onClick={() => {
              setCopyMode("tailwind");
              onCopy(pairing.tailwind, pairing.id);
            }}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded border transition-colors ${
              copyMode === "tailwind" && copied
                ? "bg-green-500 text-white border-green-500"
                : "bg-background text-muted border-border hover:border-foreground hover:text-foreground"
            }`}
          >
            {copyMode === "tailwind" && copied ? "Copied!" : "Tailwind"}
          </button>
        </div>
      </div>
    </div>
  );
}

