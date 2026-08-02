"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  shadows,
  getShadowCategories,
  type Shadow,
  type ShadowCategory,
} from "@/lib/shadows";
import { AddToKitButton } from "@/components/kit/add-to-kit-button";

export function ShadowsContent() {
  const { t, locale } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<ShadowCategory | "all">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => getShadowCategories(), []);

  const filtered = useMemo(() => {
    if (selectedCategory === "all") return shadows;
    return shadows.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  function copy(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  const needsDarkBg = (s: Shadow) =>
    s.category === "glow" || s.tags.includes("dark-mode") || s.tags.includes("cyberpunk");

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.16em] text-muted mb-3">
          {t("shadows.subtitle")}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {t("shadows.title")}
        </h1>
        <p className="text-muted leading-relaxed max-w-2xl">
          {t("shadows.description")}
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
            selectedCategory === "all"
              ? "bg-foreground text-background border-foreground"
              : "bg-background text-muted border-border hover:border-foreground hover:text-foreground"
          }`}
        >
          {t("shadows.filterAll")} ({shadows.length})
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

      {/* Shadow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((shadow) => (
          <ShadowCard
            key={shadow.id}
            shadow={shadow}
            darkBg={needsDarkBg(shadow)}
            copied={copiedId === shadow.id}
            onCopy={copy}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}

interface ShadowCardProps {
  shadow: Shadow;
  darkBg: boolean;
  copied: boolean;
  onCopy: (text: string, id: string) => void;
  locale: "zh" | "en";
}

function ShadowCard({ shadow, darkBg, copied, onCopy, locale }: ShadowCardProps) {
  const [copyMode, setCopyMode] = useState<"css" | "tailwind">("css");

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background">
      {/* Preview */}
      <div
        className={`h-40 flex items-center justify-center ${
          darkBg
            ? "bg-zinc-900"
            : "bg-zinc-50 dark:bg-zinc-900"
        }`}
      >
        <div
          className={`w-24 h-24 rounded-xl ${
            darkBg
              ? "bg-zinc-800"
              : "bg-white dark:bg-zinc-800"
          }`}
          style={{ boxShadow: shadow.value }}
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-sm">
            {locale === "zh" ? shadow.nameZh : shadow.name}
          </h3>
          <p className="text-xs text-muted mt-0.5">
            {shadow.tags.join(", ")}
          </p>
        </div>

        {/* CSS Value Preview */}
        <div className="px-3 py-2 bg-muted/10 rounded text-[11px] font-mono text-muted leading-relaxed break-all">
          {shadow.value}
        </div>

        {/* Copy Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setCopyMode("css");
              onCopy(shadow.css, shadow.id);
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
              onCopy(shadow.tailwind, shadow.id);
            }}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded border transition-colors ${
              copyMode === "tailwind" && copied
                ? "bg-green-500 text-white border-green-500"
                : "bg-background text-muted border-border hover:border-foreground hover:text-foreground"
            }`}
          >
            {copyMode === "tailwind" && copied ? "Copied!" : "Tailwind"}
          </button>
          <AddToKitButton type="shadow" slug={shadow.id} size="md" />
        </div>
      </div>
    </div>
  );
}
