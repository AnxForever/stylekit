"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  gradients,
  getGradientCategories,
  type Gradient,
  type GradientCategory,
} from "@/lib/gradients";
import { AddToKitButton } from "@/components/kit/add-to-kit-button";

type ColorFormat = "hex" | "rgb" | "hsl";

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
          g.mood.some((m) => m.toLowerCase().includes(query)),
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
}

function GradientCard({ gradient, copiedId, onCopy, locale }: GradientCardProps) {
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

  return (
    <div className="group border border-border rounded-xl overflow-hidden bg-background hover:border-foreground/40 hover:shadow-lg transition-all">
      {/* Application preview: gradient on a real surface */}
      <div className="relative h-40 overflow-hidden" style={{ background: liveCss }}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
          <span className="text-[0.6rem] uppercase tracking-[0.18em] opacity-80 mb-1">
            {gradient.category}
          </span>
          <h3 className="text-xl font-bold leading-tight drop-shadow-sm">
            {locale === "zh" ? gradient.nameZh : gradient.name}
          </h3>
          <p className="text-[0.7rem] opacity-85 mt-0.5">Gradient on a real surface</p>
        </div>
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[0.6rem] font-medium bg-white/25 text-white backdrop-blur-sm uppercase tracking-wide">
            {isLinear ? `${angle}°` : gradient.type}
          </span>
        </div>
      </div>

      {/* Angle slider — linear gradients only */}
      {isLinear && (
        <div className="px-4 py-2.5 border-b border-border flex items-center gap-2 bg-muted/10">
          <span className="text-xs text-muted">∠</span>
          <input
            type="range"
            min={0}
            max={360}
            step={5}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="flex-1 accent-foreground"
            aria-label="Gradient angle"
          />
          <button
            onClick={() => setAngle(gradient.angle)}
            className="text-[0.65rem] text-muted hover:text-foreground underline underline-offset-2 whitespace-nowrap"
          >
            reset
          </button>
        </div>
      )}

      {/* Color swatches with format switcher */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="inline-flex rounded-md border border-border overflow-hidden text-[0.65rem]">
            {(["hex", "rgb", "hsl"] as ColorFormat[]).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormat(fmt)}
                className={`px-2 py-1 uppercase tracking-wide transition-colors ${
                  format === fmt
                    ? "bg-foreground text-background"
                    : "bg-background text-muted hover:text-foreground"
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
          <span className="text-[0.65rem] text-muted">click swatch to copy</span>
        </div>

        <div className="flex gap-1.5">
          {gradient.colors.map((c, i) => (
            <button
              key={i}
              onClick={() => copyColor(c)}
              className="flex-1 group/sw relative h-9 rounded-md border border-border overflow-hidden"
              style={{ background: c }}
              title={`${formatColor(c, format)} — click to copy`}
            >
              <span className="absolute inset-x-0 bottom-0 bg-black/55 text-white text-[0.6rem] py-0.5 font-mono tabular-nums">
                {copiedColor === c ? "copied!" : formatColor(c, format)}
              </span>
            </button>
          ))}
        </div>

        {/* Mood */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {gradient.mood.map((m) => (
            <span key={m} className="px-1.5 py-0.5 text-[0.65rem] rounded bg-muted/40 text-muted">
              {m}
            </span>
          ))}
        </div>

        {/* Copy buttons */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => onCopy(liveCss, gradient.id)}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
              cssCopied
                ? "bg-green-500 text-white border-green-500"
                : "bg-background text-muted border-border hover:border-foreground hover:text-foreground"
            }`}
          >
            {cssCopied ? "Copied!" : "Copy CSS"}
          </button>
          <button
            onClick={() => onCopy(liveTailwind, gradient.id + "-tw")}
            className="flex-1 px-3 py-2 text-xs font-medium rounded-md border bg-background text-muted border-border hover:border-foreground hover:text-foreground transition-colors"
          >
            Tailwind
          </button>
          <AddToKitButton type="gradient" slug={gradient.id} size="md" />
        </div>
      </div>
    </div>
  );
}
