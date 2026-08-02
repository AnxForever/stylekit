"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  backgrounds,
  getBackgroundCategories,
  type BackgroundPattern,
  type BackgroundCategory,
} from "@/lib/backgrounds";
import { AddToKitButton } from "@/components/kit/add-to-kit-button";

export function BackgroundsContent() {
  const { t, locale } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<BackgroundCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => getBackgroundCategories(), []);

  const filteredBackgrounds = useMemo(() => {
    let result = backgrounds;

    if (selectedCategory !== "all") {
      result = result.filter((b) => b.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.nameZh.includes(query) ||
          b.mood.some((m) => m.toLowerCase().includes(query)) ||
          b.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

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
          {t("backgrounds.subtitle")}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {t("backgrounds.title")}
        </h1>
        <p className="text-muted leading-relaxed max-w-2xl">
          {t("backgrounds.description")}
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
            placeholder={t("backgrounds.searchPlaceholder")}
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
            {t("backgrounds.filterAll")} ({backgrounds.length})
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
        {t("backgrounds.showing")} {filteredBackgrounds.length} {t("backgrounds.patterns")}
      </p>

      {/* Background Grid */}
      {filteredBackgrounds.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted">{t("backgrounds.noResults")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBackgrounds.map((background) => (
            <BackgroundCard
              key={background.id}
              background={background}
              copied={copiedId === background.id}
              onCopy={copyToClipboard}
              locale={locale}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface BackgroundCardProps {
  background: BackgroundPattern;
  copied: boolean;
  onCopy: (text: string, id: string) => void;
  locale: "zh" | "en";
}

function BackgroundCard({ background, copied, onCopy, locale }: BackgroundCardProps) {
  const [copyMode, setCopyMode] = useState<"css" | "tailwind">("css");

  return (
    <div className="group border border-border rounded-lg overflow-hidden bg-background hover:border-foreground/50 transition-colors">
      {/* Background Preview */}
      <div
        className="h-40 relative"
        style={{ background: background.css, backgroundSize: "20px 20px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Name */}
        <div>
          <h3 className="font-semibold text-sm">
            {locale === "zh" ? background.nameZh : background.name}
          </h3>
          <p className="text-xs text-muted mt-0.5">
            {background.tags.join(", ")}
          </p>
          {background.attribution && (
            <p className="text-[10px] text-muted/70 mt-1">
              {background.attribution.source} ·{" "}
              <a
                href={background.attribution.url}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                {background.attribution.license}
              </a>
            </p>
          )}
        </div>

        {/* Copy Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setCopyMode("css");
              onCopy(background.css, background.id);
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
              onCopy(background.tailwind, background.id);
            }}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded border transition-colors ${
              copyMode === "tailwind" && copied
                ? "bg-green-500 text-white border-green-500"
                : "bg-background text-muted border-border hover:border-foreground hover:text-foreground"
            }`}
          >
            {copyMode === "tailwind" && copied ? "Copied!" : "Tailwind"}
          </button>
          <AddToKitButton type="background" slug={background.id} size="md" />
        </div>
      </div>
    </div>
  );
}

