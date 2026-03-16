"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  gradients,
  getGradientCategories,
  type Gradient,
  type GradientCategory,
} from "@/lib/gradients";

export function GradientsContent() {
  const { t, locale } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<GradientCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => getGradientCategories(), []);

  const filteredGradients = useMemo(() => {
    let result = gradients;

    if (selectedCategory !== "all") {
      result = result.filter((g) => g.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(query) ||
          g.nameZh.includes(query) ||
          g.mood.some((m) => m.toLowerCase().includes(query))
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
          {t("gradients.subtitle")}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {t("gradients.title")}
        </h1>
        <p className="text-muted leading-relaxed max-w-2xl">
          {t("gradients.description")}
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
            placeholder={t("gradients.searchPlaceholder")}
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
            {t("gradients.filterAll")} ({gradients.length})
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
        {t("gradients.showing")} {filteredGradients.length} {t("gradients.gradients")}
      </p>

      {/* Gradient Grid */}
      {filteredGradients.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted">{t("gradients.noResults")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGradients.map((gradient) => (
            <GradientCard
              key={gradient.id}
              gradient={gradient}
              copied={copiedId === gradient.id}
              onCopy={copyToClipboard}
              locale={locale}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface GradientCardProps {
  gradient: Gradient;
  copied: boolean;
  onCopy: (text: string, id: string) => void;
  locale: "zh" | "en";
}

function GradientCard({ gradient, copied, onCopy, locale }: GradientCardProps) {
  const [copyMode, setCopyMode] = useState<"css" | "tailwind">("css");

  return (
    <div className="group border border-border rounded-lg overflow-hidden bg-background hover:border-foreground/50 transition-colors">
      {/* Gradient Preview */}
      <div
        className="h-40 relative"
        style={{ background: gradient.css }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Name */}
        <div>
          <h3 className="font-semibold text-sm">
            {locale === "zh" ? gradient.nameZh : gradient.name}
          </h3>
          <p className="text-xs text-muted mt-0.5">
            {gradient.mood.join(", ")}
          </p>
        </div>

        {/* Color Swatches */}
        <div className="flex gap-1.5">
          {gradient.colors.map((color, i) => (
            <div
              key={i}
              className="h-6 flex-1 rounded border border-border"
              style={{ background: color }}
              title={color}
            />
          ))}
        </div>

        {/* Copy Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setCopyMode("css");
              onCopy(gradient.css, gradient.id);
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
              onCopy(gradient.tailwind, gradient.id);
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
