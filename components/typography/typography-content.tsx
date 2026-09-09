"use client";

import { useState, useMemo, useEffect, useRef, type CSSProperties } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  fontPairings,
  getTypographyCategories,
  fontStack,
  generateFontCSS,
  generateTailwindTheme,
  pairingContrast,
  type FontPairing,
  type TypographyCategory,
} from "@/lib/typography";
import { loadFontFaces, warmFonts } from "@/lib/typography/font-loader";
import { specimenPalette } from "@/lib/typography/specimen";
import { AddToKitButton } from "@/components/kit/add-to-kit-button";

type CSSVars = CSSProperties & Record<`--${string}`, string>;

// One control for the whole wall instead of a slider on all 41 cards: comparing
// pairings means seeing them at the same size, and 41 range inputs were both
// noise and DOM weight.
// `sheetPx` is a fixed height, not a minimum: a specimen sheet that grows when
// its webfont swaps in shoves the rest of the wall down, which is most of what
// made the page feel unsettled while loading. Each value clears the tallest
// specimen at that scale.
const PREVIEW_SIZES = [
  { id: "s", label: "S", scale: 0.85, sheetPx: 372 },
  { id: "m", label: "M", scale: 1, sheetPx: 406 },
  { id: "l", label: "L", scale: 1.2, sheetPx: 452 },
] as const;

type PreviewSizeId = (typeof PREVIEW_SIZES)[number]["id"];

export function TypographyContent() {
  const { t, locale } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<TypographyCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewSize, setPreviewSize] = useState<PreviewSizeId>("m");

  const categories = useMemo(() => getTypographyCategories(), []);

  const size = PREVIEW_SIZES.find((s) => s.id === previewSize) ?? PREVIEW_SIZES[1];

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

  // One pass for the whole catalogue, in the order the wall renders it. Doing
  // this per card as it scrolled into view meant ~40 <head> mutations, each one
  // a full-document style recalculation.
  useEffect(() => {
    loadFontFaces(fontPairings.flatMap((p) => [p.heading, p.body]));
  }, []);

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-20" data-cursor-aura="off">
      {/* Header */}
      <div className="mb-12 border-b border-border pb-10 md:pb-12">
        <p className="text-xs uppercase tracking-[0.16em] text-muted mb-3">
          {t("typography.subtitle")}
        </p>
        <h1 className="text-4xl md:text-6xl leading-[0.98] tracking-[-0.03em] mb-5 max-w-[12ch]">
          {t("typography.title")}
        </h1>
        <p className="text-muted text-base md:text-lg leading-relaxed max-w-[65ch]">
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
            className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
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

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 text-sm border transition-colors ${
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
                className={`px-4 py-2 text-sm border transition-colors ${
                  selectedCategory === cat.category
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted border-border hover:border-foreground hover:text-foreground"
                }`}
              >
                {locale === "zh" ? cat.labelZh : cat.labelEn} ({cat.count})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ms-auto">
            <span className="text-xs text-muted whitespace-nowrap">
              {t("typography.previewSize")}
            </span>
            <div className="flex border border-border" role="group">
              {PREVIEW_SIZES.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setPreviewSize(size.id)}
                  aria-pressed={previewSize === size.id}
                  className={`w-9 py-2 text-xs transition-colors ${
                    previewSize === size.id
                      ? "bg-foreground text-background"
                      : "bg-background text-muted hover:text-foreground"
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-px border border-border bg-border">
          {/* Two columns only from xl: with the resources sidebar taking 224px,
              a two-up grid at lg leaves each specimen about 300px wide, which
              wraps the family names and forces every sheet taller. */}
          {filteredPairings.map((pairing) => (
            <TypographyCard
              key={pairing.id}
              pairing={pairing}
              copied={copiedId === pairing.id}
              onCopy={copyToClipboard}
              locale={locale}
              scale={size.scale}
              sheetPx={size.sheetPx}
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
  scale: number;
  sheetPx: number;
}

const CATEGORY_LABEL: Record<TypographyCategory, string> = {
  classic: "Classic",
  modern: "Modern",
  playful: "Playful",
  editorial: "Editorial",
  technical: "Technical",
  elegant: "Elegant",
  display: "Display",
  handwritten: "Handwritten",
};

// Character set shown in the heading face — reveals the letterform details
// (x-height, terminals, how 0/O and g/a are drawn) that make a typeface itself.
const CHARSET = "Aa Gg Qq Rg 0123 &?";

// Personality-matched preview copy per category, so each specimen reads like the
// kind of product the pairing is for — not the same "quick brown fox" everywhere.
const PREVIEW_BY_CATEGORY: Record<string, { heading: string; body: string }> = {
  classic: {
    heading: "Timeless by Design",
    body: "Considered typography that endures. Every letterform carries tradition while remaining comfortable for long-form reading.",
  },
  modern: {
    heading: "Built for Tomorrow",
    body: "Clean lines and confident spacing shape interfaces that feel effortless, fast, and unmistakably current.",
  },
  playful: {
    heading: "Hello, Sunshine!",
    body: "Bright, friendly type for products that keep the experience light without becoming childish.",
  },
  editorial: {
    heading: "The Morning Edition",
    body: "Long-form reading deserves rhythm and contrast. A serif headline sets the tone; the body face carries the story.",
  },
  technical: {
    heading: "System Architecture",
    body: "Monospace precision meets readable prose for documentation, dashboards, and dependable technical interfaces.",
  },
  elegant: {
    heading: "Maison & Atelier",
    body: "Refined contrast and graceful proportion lend a quiet luxury to fashion, beauty, and premium editorial work.",
  },
  display: {
    heading: "Make a Statement",
    body: "Oversized type commands the page. Reserve it for the short phrase you want remembered.",
  },
  handwritten: {
    heading: "With Love",
    body: "A personal, human touch for invitations, quotes, and brands that want to feel handmade.",
  },
};

// Pulls a specimen's font files down while it is still a screen away. This only
// fetches — it never touches the DOM — so a fast scroll costs no style
// recalculation, and the sheet paints in its real faces rather than swapping.
function usePairingFont(pairing: FontPairing) {
  const specimenRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = specimenRef.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      warmFonts([pairing.heading, pairing.body]);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        warmFonts([pairing.heading, pairing.body]);
        observer.disconnect();
      },
      { rootMargin: "900px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [pairing]);

  return specimenRef;
}

// Visualizes the weight gap between heading and body — the contrast that makes a
// hierarchy hold up. If the two bars are nearly equal, the pairing reads flat.
function WeightContrastBar({
  headingWeight,
  bodyWeight,
  bodyFamily,
}: {
  headingWeight: number;
  bodyWeight: number;
  bodyFamily: string;
}) {
  const pct = (weight: number) => `${((weight - 100) / 800) * 100}%`;
  return (
    <div className="flex items-center gap-4 text-[0.68em] specimen-ink-muted" style={{ fontFamily: bodyFamily }}>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <span className="uppercase tracking-wide">Heading</span>
          <span className="tabular-nums">{headingWeight}</span>
        </div>
        <div className="h-px specimen-ink-track">
          <div className="h-full specimen-ink-fill" style={{ width: pct(headingWeight) }} />
        </div>
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <span className="uppercase tracking-wide">Body</span>
          <span className="tabular-nums">{bodyWeight}</span>
        </div>
        <div className="h-px specimen-ink-track">
          <div className="h-full specimen-ink-fill opacity-50" style={{ width: pct(bodyWeight) }} />
        </div>
      </div>
    </div>
  );
}

function TypographyCard({ pairing, copied, onCopy, locale, scale, sheetPx }: TypographyCardProps) {
  const specimenRef = usePairingFont(pairing);

  const headingFamily = fontStack(pairing.heading);
  const bodyFamily = fontStack(pairing.body);
  const isDisplay = pairing.category === "display" || pairing.category === "handwritten";
  const preview = PREVIEW_BY_CATEGORY[pairing.category] ?? PREVIEW_BY_CATEGORY.modern;
  const contrast = pairingContrast(pairing);
  const palette = specimenPalette(pairing);

  // The sheet colours travel as custom properties so the dark-theme pair can be
  // swapped by a `.dark` rule in CSS — an inline style cannot carry a variant.
  const sheetVars: CSSVars = {
    "--specimen-paper": palette.paper,
    "--specimen-ink": palette.ink,
    "--specimen-paper-dark": palette.paperDark,
    "--specimen-ink-dark": palette.inkDark,
  };

  return (
    <article ref={specimenRef} className="specimen-card group overflow-hidden bg-background">
      {/* Specimen sheet — each pairing is printed on its own paper-and-ink stock,
          so the wall reads as a specimen book rather than one flat field. */}
      <div
        className="specimen-sheet flex flex-col overflow-hidden px-6 py-7 md:px-8 md:py-8"
        style={{ ...sheetVars, fontSize: `${16 * scale}px`, height: `${sheetPx}px` }}
      >
        <div className="flex items-center justify-between gap-4 mb-8 border-b specimen-ink-rule pb-3">
          <span
            className="text-[0.7rem] uppercase tracking-[0.14em] specimen-ink-muted"
            style={{ fontFamily: bodyFamily }}
          >
            {CATEGORY_LABEL[pairing.category]}
          </span>
          <span className="text-[0.7rem] specimen-ink-muted tracking-wide">{contrast}</span>
        </div>

        <div className="flex-1 min-h-0 flex flex-col justify-center">
          {isDisplay ? (
            <>
              {/* The typeface itself is the subject */}
              <div
                className="mb-5 break-words"
                style={{
                  fontFamily: headingFamily,
                  fontWeight: pairing.heading.weight,
                  fontSize: "clamp(2rem, 19cqw, 5.1em)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.035em",
                }}
              >
                {pairing.previewWord ?? preview.heading}
              </div>
              <div
                className="mb-5 specimen-ink-soft break-words"
                style={{
                  fontFamily: headingFamily,
                  fontWeight: pairing.heading.weight,
                  fontSize: "min(1.2em, 6cqw)",
                  lineHeight: 1.2,
                }}
              >
                {CHARSET}
              </div>
              <p
                className="leading-relaxed specimen-ink-muted"
                style={{ fontFamily: bodyFamily, fontWeight: pairing.body.weight, fontSize: "0.9em" }}
              >
                {preview.body}
              </p>
            </>
          ) : (
            <>
              {/* Character set in the heading face — letterforms up close */}
              <div
                className="mb-4 pb-4 border-b specimen-ink-rule specimen-ink-soft break-words"
                style={{
                  fontFamily: headingFamily,
                  fontWeight: pairing.heading.weight,
                  fontSize: "min(1.45em, 7cqw)",
                  lineHeight: 1.15,
                }}
              >
                {CHARSET}
              </div>
              <h3
                className="mb-3 break-words"
                style={{
                  fontFamily: headingFamily,
                  fontWeight: pairing.heading.weight,
                  fontSize: "min(2.1em, 10cqw)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.025em",
                }}
              >
                {preview.heading}
              </h3>
              <p
                className="leading-relaxed mb-6 specimen-ink-muted"
                style={{ fontFamily: bodyFamily, fontWeight: pairing.body.weight, fontSize: "0.9em" }}
              >
                {preview.body}
              </p>
              <WeightContrastBar
                headingWeight={pairing.heading.weight}
                bodyWeight={pairing.body.weight}
                bodyFamily={bodyFamily}
              />
            </>
          )}
        </div>
      </div>

      {/* Catalogue entry — kept on the site's own surface so the colour stays
          on the specimen and the data stays readable. */}
      <div className="p-5 md:p-6 space-y-3 border-t border-border">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="font-sans font-semibold text-base truncate">
              {locale === "zh" ? pairing.nameZh : pairing.name}
            </h4>
            <p className="text-xs text-muted mt-0.5 truncate">
              {pairing.heading.family} <span className="opacity-50">·</span> {pairing.body.family}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-end shrink-0">
            {pairing.mood.slice(0, 2).map((m) => (
              <span key={m} className="px-2 py-1 text-[0.65rem] border border-border text-muted">
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 text-sm leading-relaxed">
          <p className="text-foreground">
            {locale === "zh" ? pairing.bestForZh : pairing.bestFor}
          </p>
          <p className="text-muted">
            {locale === "zh" ? pairing.descriptionZh : pairing.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={() => onCopy(generateFontCSS(pairing), pairing.id)}
            className={`px-3 py-2 text-xs font-medium border transition-colors ${
              copied
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-muted border-border hover:border-foreground hover:text-foreground"
            }`}
          >
            {copied ? "Copied!" : "Copy CSS"}
          </button>
          <button
            onClick={() => onCopy(generateTailwindTheme(pairing), pairing.id)}
            className="px-3 py-2 text-xs font-medium border bg-background text-muted border-border hover:border-foreground hover:text-foreground transition-colors"
          >
            Tailwind
          </button>
          <AddToKitButton
            type="font-pairing"
            slug={pairing.id}
            variant="labeled"
            className="px-3 py-2 text-xs tracking-normal normal-case"
          />
          <span className="ms-auto text-xs text-muted whitespace-nowrap">
            {pairing.license}
            <span className="opacity-50 mx-1.5">·</span>
            <a
              href={pairing.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-4 hover:text-accent"
            >
              Google Fonts
            </a>
          </span>
        </div>
      </div>
    </article>
  );
}
