"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  gradients,
  getGradientCategories,
  toTailwindBackgroundImage,
  type Gradient,
  type GradientCategory,
  type GradientType,
} from "@/lib/gradients";
import { AddToKitButton } from "@/components/kit/add-to-kit-button";
import { ClipboardFeedback } from "@/components/ui/clipboard-feedback";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import type { ClipboardResult } from "@/lib/hooks/use-clipboard";
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
  const clipboard = useClipboard();

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
  const clipboardResultVisible = filteredGradients.some((gradient) =>
    clipboard.result?.id.startsWith(`${gradient.id}:`),
  );

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

      {!clipboardResultVisible && clipboard.result && (
        <ClipboardFeedback result={clipboard.result} locale={locale} />
      )}

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
              result={clipboard.result}
              isCopied={clipboard.isCopied}
              onCopy={clipboard.copy}
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
  result: ClipboardResult | null;
  isCopied: (id: string, text?: string) => boolean;
  onCopy: (text: string, id: string) => Promise<boolean>;
  locale: "zh" | "en";
  typeLabel: string;
}

function GradientCard({ gradient, result, isCopied, onCopy, locale, typeLabel }: GradientCardProps) {
  const { t } = useI18n();
  const [angle, setAngle] = useState(gradient.angle);
  const [format, setFormat] = useState<ColorFormat>("hex");

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

  // Keep the Tailwind arbitrary background identical to the live preview,
  // including angles between the named gradient utility directions.
  const liveTailwind = useMemo(() => {
    if (gradient.type && gradient.type !== "linear") {
      return gradient.tailwind;
    }
    return toTailwindBackgroundImage(liveCss);
  }, [gradient.tailwind, gradient.type, liveCss]);

  const feedbackResult = result?.id.startsWith(`${gradient.id}:`) ? result : null;
  const copiedColor = gradient.colors.find((color) =>
    feedbackResult?.id === `${gradient.id}:color-${color}`,
  );
  const currentFeedbackText = feedbackResult?.id === `${gradient.id}:css`
    ? liveCss
    : feedbackResult?.id === `${gradient.id}:tailwind`
      ? liveTailwind
      : copiedColor
        ? formatColor(copiedColor, format)
        : undefined;
  const cssCopied = isCopied(`${gradient.id}:css`, liveCss);
  const tailwindCopied = isCopied(`${gradient.id}:tailwind`, liveTailwind);
  const copyLabel = t("gradients.copyCss");
  const tailwindLabel = t("gradients.copyTailwind");
  const copiedLabel = t("gradients.copied");
  const swatchLabel = t("gradients.copySwatch");
  const resetLabel = t("gradients.resetAngle");

  const name = locale === "zh" ? gradient.nameZh : gradient.name;

  const colorFormatLabel = t("gradients.colorFormat");

  return (
    <article
      aria-labelledby={`gradient-${gradient.id}-title`}
      className="min-w-0 overflow-hidden border border-border bg-background"
    >
      <div className="relative h-40 sm:h-44" style={{ background: liveCss }} aria-hidden="true">
        <span className="absolute left-3 top-3 inline-flex items-center bg-black/40 px-2 py-1 text-[0.65rem] font-medium text-white shadow-sm backdrop-blur-sm">
          {isLinear ? `${angle}° · ${typeLabel}` : typeLabel}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <h3 id={`gradient-${gradient.id}-title`} className="text-base font-semibold leading-tight">
          {name}
        </h3>

        <div className="flex items-stretch gap-2">
          <button
            type="button"
            onClick={() => void onCopy(liveCss, `${gradient.id}:css`)}
            className="min-h-11 flex-1 border border-foreground bg-foreground px-3 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {cssCopied ? copiedLabel : copyLabel}
          </button>
          <AddToKitButton
            type="gradient"
            slug={gradient.id}
            variant="labeled"
            className="min-h-11 shrink-0 px-3 text-xs normal-case tracking-normal text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </div>

        <details className="group border-t border-border">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
            <span>{t("gradients.adjust")}</span>
            <svg
              aria-hidden="true"
              className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="m5 7.5 5 5 5-5" />
            </svg>
          </summary>

          <div className="space-y-3 pb-1">
            <button
              type="button"
              onClick={() => void onCopy(liveTailwind, `${gradient.id}:tailwind`)}
              className="min-h-11 w-full border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/60 hover:bg-foreground/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {tailwindCopied ? copiedLabel : tailwindLabel}
            </button>

            {isLinear && (
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={360}
                  step={5}
                  value={angle}
                  onChange={(event) => setAngle(Number(event.target.value))}
                  className="min-h-11 flex-1 accent-foreground"
                  aria-label={t("gradients.angle")}
                />
                <span className="min-w-10 text-right text-sm tabular-nums text-muted" aria-live="polite">
                  {angle}°
                </span>
                <button
                  type="button"
                  onClick={() => setAngle(gradient.angle)}
                  className="min-h-11 px-2 text-xs text-muted underline underline-offset-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {resetLabel}
                </button>
              </div>
            )}

            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-muted">{colorFormatLabel}</span>
              <div role="group" aria-label={colorFormatLabel} className="inline-flex border border-border text-xs">
                {(["hex", "rgb", "hsl"] as ColorFormat[]).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setFormat(fmt)}
                    aria-pressed={format === fmt}
                    className={`min-h-9 min-w-11 px-2 uppercase tracking-wide transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      format === fmt ? "bg-foreground text-background" : "text-muted hover:bg-foreground/[0.04] hover:text-foreground"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-1.5">
              {gradient.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => void onCopy(formatColor(color, format), `${gradient.id}:color-${color}`)}
                  className="relative min-h-9 min-w-0 flex-1 overflow-hidden border border-border/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  style={{ background: color }}
                  title={`${formatColor(color, format)} — ${swatchLabel}`}
                  aria-label={`${formatColor(color, format)} — ${swatchLabel}`}
                >
                  {isCopied(`${gradient.id}:color-${color}`, formatColor(color, format)) && (
                    <span className="absolute inset-0 grid place-items-center bg-black/65 text-[0.6rem] font-mono text-white">
                      {copiedLabel}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </details>

        <ClipboardFeedback
          result={feedbackResult}
          locale={locale}
          currentText={currentFeedbackText}
          className="mb-0"
        />
      </div>
    </article>
  );
}
