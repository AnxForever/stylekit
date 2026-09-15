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
  const displayName = locale === "zh" ? shadow.nameZh : shadow.name;

  // Specimen language: the shadow floats on a large neutral stage that is the
  // whole card. Name and value sit at the foot at rest; copy actions reveal on
  // hover/focus. No stacked black-on-white panel.
  return (
    <div className="group relative flex h-72 flex-col overflow-hidden border border-border bg-background transition-colors hover:border-foreground/40">
      {/* Stage — the shadow is the subject, given room to breathe. */}
      <div
        className={`flex flex-1 items-center justify-center ${
          darkBg ? "bg-zinc-900" : "bg-zinc-50 dark:bg-zinc-900"
        }`}
      >
        <div
          className={`h-28 w-28 rounded-xl ${
            darkBg ? "bg-zinc-800" : "bg-white dark:bg-zinc-800"
          }`}
          style={{ boxShadow: shadow.value }}
        />
      </div>

      {/* Caption bar — name + value at rest, actions on hover/focus. */}
      <div className="relative border-t border-border p-4">
        <div className="transition-opacity duration-200 group-hover:opacity-0 group-focus-within:opacity-0">
          <h3 className="truncate text-sm font-semibold">{displayName}</h3>
          <p className="mt-0.5 truncate font-mono text-[11px] text-muted">
            {shadow.value}
          </p>
        </div>

        <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
          <button
            onClick={() => onCopy(shadow.css, shadow.id)}
            aria-label={`Copy ${displayName} CSS`}
            className="flex-1 border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-foreground hover:text-foreground"
          >
            {copied ? (locale === "zh" ? "已复制" : "Copied") : "Copy CSS"}
          </button>
          <button
            onClick={() => onCopy(shadow.tailwind, shadow.id)}
            className="flex-1 border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-foreground hover:text-foreground"
          >
            Tailwind
          </button>
          <AddToKitButton
            type="shadow"
            slug={shadow.id}
            size="sm"
            className="grid h-7 w-7 shrink-0 place-items-center border border-border rounded-none text-muted hover:border-foreground hover:text-foreground"
          />
        </div>
      </div>
    </div>
  );
}
