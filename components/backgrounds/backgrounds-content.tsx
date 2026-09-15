"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
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

      {/* WebGL lab entry */}
      <Link
        href="/experiments/webgl-lab"
        className="group mb-12 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-[#0a0a0a] px-6 py-5 text-[#e9e7dc] transition-colors hover:border-[#ccff00]"
      >
        <div className="min-w-0">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#ccff00]">
            {t("backgrounds.webglBadge")}
          </p>
          <p className="font-medium">{t("backgrounds.webglTitle")}</p>
          <p className="mt-1 text-sm text-[#98a0a0]">{t("backgrounds.webglDesc")}</p>
        </div>
        <span className="shrink-0 font-mono text-xs uppercase tracking-[0.12em] text-[#98a0a0] transition-colors group-hover:text-[#ccff00]">
          {t("backgrounds.webglCta")} →
        </span>
      </Link>

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
  const name = locale === "zh" ? background.nameZh : background.name;

  // Same language as the type specimens: the texture is the whole card, the
  // caption sits at the foot, and the copy actions stay hidden until hover or
  // keyboard focus so the wall of textures reads calmly at rest.
  return (
    <div className="group relative overflow-hidden border border-border bg-background transition-colors hover:border-foreground/40">
      <div
        className="h-56"
        style={{ background: background.css, backgroundSize: "20px 20px" }}
      />

      {/* Caption bar — resting state: name + tags. */}
      <div className="border-t border-border p-4">
        <div className="transition-opacity duration-200 group-hover:opacity-0 group-focus-within:opacity-0">
          <h3 className="text-sm font-semibold truncate">{name}</h3>
          <p className="text-xs text-muted mt-0.5 truncate">
            {background.tags.join(" · ")}
          </p>
        </div>

        {/* Actions overlay the caption on hover/focus, matching its height. */}
        <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
          <button
            onClick={() => onCopy(background.css, background.id)}
            className="flex-1 border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-foreground hover:text-foreground"
          >
            {copied ? (locale === "zh" ? "已复制" : "Copied") : "Copy CSS"}
          </button>
          <button
            onClick={() => onCopy(background.tailwind, background.id)}
            className="flex-1 border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-foreground hover:text-foreground"
          >
            Tailwind
          </button>
          <AddToKitButton
            type="background"
            slug={background.id}
            size="sm"
            className="grid h-7 w-7 shrink-0 place-items-center border border-border rounded-none text-muted hover:border-foreground hover:text-foreground"
          />
        </div>
      </div>

      {/* Attribution stays visible but quiet, top-left, only when present. */}
      {background.attribution && (
        <a
          href={background.attribution.url}
          target="_blank"
          rel="noreferrer"
          className="absolute left-3 top-3 bg-background/80 px-2 py-0.5 text-[10px] text-muted backdrop-blur-sm transition-colors hover:text-foreground"
        >
          {background.attribution.license}
        </a>
      )}
    </div>
  );
}

