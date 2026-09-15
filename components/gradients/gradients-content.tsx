"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  gradients,
  getGradientCategories,
  type Gradient,
  type GradientCategory,
  type GradientType,
} from "@/lib/gradients";
import { AddToKitButton } from "@/components/kit/add-to-kit-button";
import type { TranslationKey } from "@/lib/i18n/translations";

type ColorFormat = "hex" | "rgb" | "hsl";

const GRADIENT_TYPES: Array<{
  value: GradientType;
  labelKey: TranslationKey;
  hintKey: TranslationKey;
}> = [
  { value: "linear", labelKey: "gradients.type.linear", hintKey: "gradients.type.linearHint" },
  { value: "radial", labelKey: "gradients.type.radial", hintKey: "gradients.type.radialHint" },
  { value: "conic", labelKey: "gradients.type.conic", hintKey: "gradients.type.conicHint" },
  { value: "mesh", labelKey: "gradients.type.mesh", hintKey: "gradients.type.meshHint" },
];

const ALL_GRADIENT_TYPE_HINT: TranslationKey = "gradients.type.allHint";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [
    parseInt(full.substring(0, 2), 16),
    parseInt(full.substring(2, 4), 16),
    parseInt(full.substring(4, 6), 16),
  ];
}

function formatColor(hex: string, fmt: ColorFormat): string {
  const [r, g, b] = hexToRgb(hex);
  if (fmt === "hex") return hex.toUpperCase();
  if (fmt === "rgb") return `rgb(${r}, ${g}, ${b})`;
  // hsl
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let hdeg = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        hdeg = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        hdeg = (bn - rn) / d + 2;
        break;
      default:
        hdeg = (rn - gn) / d + 4;
    }
    hdeg *= 60;
  }
  return `hsl(${Math.round(hdeg)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

export function GradientsContent() {
  const { t, locale } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<GradientCategory | "all">("all");
  const [selectedType, setSelectedType] = useState<GradientType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => getGradientCategories(), []);

  const filteredGradients = useMemo(() => {
    let result = gradients;

    if (selectedCategory !== "all") {
      result = result.filter((g) => g.category === selectedCategory);
    }

    if (selectedType !== "all") {
      result = result.filter((g) => (g.type ?? "linear") === selectedType);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(query) ||
          g.nameZh.includes(query) ||
          g.mood.some((m) => m.toLowerCase().includes(query)),
      );
    }

    return result;
  }, [selectedCategory, selectedType, searchQuery]);

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
          {t("gradients.subtitle")}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {t("gradients.title")}
        </h1>
        <p className="text-muted leading-relaxed max-w-2xl">
          {t("gradients.description")}
        </p>

        <div className="mt-7 border-y border-border py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[0.65rem] uppercase tracking-[0.16em] text-muted">
              {t("gradients.type")}
            </span>
            <button
              type="button"
              onClick={() => setSelectedType("all")}
              aria-pressed={selectedType === "all"}
              className={`px-2.5 py-1 text-xs border transition-colors ${
                selectedType === "all"
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-foreground hover:text-foreground"
              }`}
            >
              {t("gradients.filterAll")} ({gradients.length})
            </button>
            {GRADIENT_TYPES.map((type) => {
              const count = gradients.filter((gradient) => (gradient.type ?? "linear") === type.value).length;
              const active = selectedType === type.value;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setSelectedType(type.value)}
                  aria-pressed={active}
                  className={`px-2.5 py-1 text-xs border transition-colors ${
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {t(type.labelKey)} <span className="tabular-nums opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 max-w-2xl text-xs leading-relaxed text-muted">
            {t(selectedType === "all"
              ? ALL_GRADIENT_TYPE_HINT
              : GRADIENT_TYPES.find((type) => type.value === selectedType)?.hintKey ?? ALL_GRADIENT_TYPE_HINT)}
            {selectedType !== "linear" && (
              <span className="ml-2 text-muted/70">{t("gradients.tailwindNote")}</span>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
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

      <p className="text-sm text-muted mb-6">
        {t("gradients.showing")} {filteredGradients.length} {t("gradients.gradients")}
      </p>

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
              copiedId={copiedId}
              onCopy={copyToClipboard}
              locale={locale}
              typeLabel={t(
                GRADIENT_TYPES.find((type) => type.value === (gradient.type ?? "linear"))?.labelKey ??
                  "gradients.type.linear",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface GradientCardProps {
  gradient: Gradient;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
  locale: "zh" | "en";
  typeLabel: string;
}

function GradientCard({ gradient, copiedId, onCopy, locale, typeLabel }: GradientCardProps) {
  const { t } = useI18n();
  const [angle, setAngle] = useState(gradient.angle);
  const [format, setFormat] = useState<ColorFormat>("hex");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const isLinear = !gradient.type || gradient.type === "linear";

  // Live CSS: linear is angle-driven; radial/conic/mesh use the predefined css.
  const liveCss = useMemo(() => {
    if (gradient.type && gradient.type !== "linear") {
      return gradient.css;
    }
    const stops = gradient.colors
      .map((c, i) => {
        const pct = Math.round((i / (gradient.colors.length - 1)) * 100);
        return `${c} ${pct}%`;
      })
      .join(", ");
    return `linear-gradient(${angle}deg, ${stops})`;
  }, [angle, gradient.colors, gradient.type, gradient.css]);

  // Tailwind string reflecting current angle (keeps original from/via/to stops, only direction changes)
  const liveTailwind = useMemo(() => {
    if (gradient.type && gradient.type !== "linear") {
      return gradient.tailwind;
    }
    const a = ((angle % 360) + 360) % 360;
    const dirs: Array<[number, string]> = [
      [0, "t"], [45, "tr"], [90, "r"], [135, "br"],
      [180, "b"], [225, "bl"], [270, "l"], [315, "tl"],
    ];
    let best = "tr";
    let bestDiff = 360;
    for (const d of dirs) {
      const diff = Math.min(Math.abs(a - d[0]), 360 - Math.abs(a - d[0]));
      if (diff < bestDiff) {
        bestDiff = diff;
        best = d[1];
      }
    }
    const stops = gradient.tailwind.replace(/^bg-gradient-to-\S+\s*/, "");
    return `bg-gradient-to-${best} ${stops}`;
  }, [angle, gradient.tailwind, gradient.type]);

  function copyColor(hex: string) {
    navigator.clipboard.writeText(formatColor(hex, format)).then(() => {
      setCopiedColor(hex);
      setTimeout(() => setCopiedColor(null), 1500);
    });
  }

  const cssCopied = copiedId === gradient.id;
  const tailwindCopied = copiedId === `${gradient.id}-tw`;
  const copyLabel = t("gradients.copyCss");
  const tailwindLabel = t("gradients.copyTailwind");
  const copiedLabel = t("gradients.copied");
  const swatchLabel = t("gradients.copySwatch");
  const resetLabel = t("gradients.resetAngle");

  const name = locale === "zh" ? gradient.nameZh : gradient.name;

  // Specimen language: the gradient is the whole tile. The name sits on it at
  // rest; the angle control, swatches and copy actions are held back and
  // revealed on hover/focus so the gallery reads as colour first, controls
  // second. Everything overlays the gradient, so there is no black-on-white
  // panel stacked beneath every card.
  return (
    <div
      className="group relative flex h-72 flex-col justify-between overflow-hidden border border-border p-4 text-white transition-colors hover:border-foreground/40"
      style={{ background: liveCss }}
    >
      {/* Legibility scrim, only while interacting. */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/25 group-focus-within:bg-black/25" />

      {/* Top row: type/angle badge, always readable. */}
      <div className="relative flex items-start justify-between gap-2">
        <span className="inline-flex items-center bg-black/30 px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-wide backdrop-blur-sm">
          {isLinear ? `${angle}° · ${typeLabel}` : typeLabel}
        </span>
        <AddToKitButton
          type="gradient"
          slug={gradient.id}
          size="sm"
          className="grid h-7 w-7 shrink-0 place-items-center bg-black/30 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-black/50 group-hover:opacity-100 group-focus-within:opacity-100"
        />
      </div>

      {/* Foot: name at rest; controls slide in on hover/focus. */}
      <div className="relative">
        <h3 className="text-lg font-bold leading-tight drop-shadow-sm transition-opacity duration-200 group-hover:opacity-0 group-focus-within:opacity-0">
          {name}
        </h3>

        <div className="absolute inset-x-0 bottom-0 space-y-2.5 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
          {isLinear && (
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={360}
                step={5}
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="flex-1 accent-white"
                aria-label={t("gradients.angle")}
              />
              <button
                type="button"
                onClick={() => setAngle(gradient.angle)}
                className="whitespace-nowrap text-[0.65rem] text-white/80 underline underline-offset-2 hover:text-white"
              >
                {resetLabel}
              </button>
            </div>
          )}

          {/* Swatches double as click-to-copy colour chips. */}
          <div className="flex gap-1.5">
            {gradient.colors.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => copyColor(c)}
                className="relative h-7 flex-1 overflow-hidden border border-white/30"
                style={{ background: c }}
                title={`${formatColor(c, format)} — ${swatchLabel}`}
                aria-label={`${formatColor(c, format)} — ${swatchLabel}`}
              >
                {copiedColor === c && (
                  <span className="absolute inset-0 grid place-items-center bg-black/60 text-[0.55rem] font-mono">
                    {copiedLabel}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onCopy(liveCss, gradient.id)}
              className="flex-1 border border-white/40 bg-black/20 px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors hover:bg-black/40"
            >
              {cssCopied ? copiedLabel : copyLabel}
            </button>
            <button
              type="button"
              onClick={() => onCopy(liveTailwind, gradient.id + "-tw")}
              className="flex-1 border border-white/40 bg-black/20 px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors hover:bg-black/40"
            >
              {tailwindLabel}
            </button>
            <div className="inline-flex border border-white/40 text-[0.6rem]">
              {(["hex", "rgb", "hsl"] as ColorFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormat(fmt)}
                  aria-pressed={format === fmt}
                  className={`px-1.5 py-1.5 uppercase tracking-wide transition-colors ${
                    format === fmt ? "bg-white text-black" : "bg-black/20 hover:bg-black/40"
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
