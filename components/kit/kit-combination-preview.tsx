"use client";

import { useEffect, useMemo, useRef } from "react";
import { useI18n } from "@/lib/i18n/context";
import type { KitHint } from "@/lib/kit/hints";
import type { StyleMeta } from "@/lib/styles/meta";
import type { AnimationMeta } from "@/lib/animations/types";
import {
  generateGoogleFontsLink,
  fontStack,
  type FontPairing,
} from "@/lib/typography";
import { MiniPreview, MiniPreviewStyles } from "@/components/animations/mini-preview";

interface KitCombinationPreviewProps {
  styles: StyleMeta[];
  animations: AnimationMeta[];
  fontPairing: FontPairing | null;
  hints: KitHint[];
  /** Omit for read-only contexts (e.g. shared kit page): chips stop swapping. */
  onMakePrimary?: (slug: string) => void;
}

/** Pick black/white text for a given hex background (YIQ luminance). */
function contrastText(hex: string): string {
  const value = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(value)) return "#ffffff";
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 >= 128 ? "#0a0a0a" : "#ffffff";
}

/** Loads the pairing's Google Fonts stylesheet while the preview is mounted. */
function usePreviewFonts(pairing: FontPairing | null) {
  const linkRef = useRef<HTMLLinkElement | null>(null);

  useEffect(() => {
    if (!pairing) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = generateGoogleFontsLink(pairing);
    document.head.appendChild(link);
    linkRef.current = link;
    return () => {
      link.remove();
      linkRef.current = null;
    };
  }, [pairing]);
}

const HINT_TONE_STYLES: Record<KitHint["tone"], { label: string; className: string }> = {
  good: { label: "OK", className: "text-green-700 dark:text-green-400 border-green-600/40" },
  info: { label: "TIP", className: "text-muted border-border" },
  warn: { label: "CHECK", className: "text-amber-700 dark:text-amber-400 border-amber-600/40" },
};

export function KitCombinationPreview({
  styles,
  animations,
  fontPairing,
  hints,
  onMakePrimary,
}: KitCombinationPreviewProps) {
  const { locale } = useI18n();
  const zh = locale === "zh";
  usePreviewFonts(fontPairing);
  const primary = styles[0] ?? null;

  const demoFonts = useMemo(
    () => ({
      heading: fontPairing
        ? `${fontStack(fontPairing.heading)}`
        : "var(--font-display-active)",
      headingWeight: fontPairing ? fontPairing.heading.weight : 600,
      body: fontPairing ? `${fontStack(fontPairing.body)}` : "var(--font-body-active)",
      bodyWeight: fontPairing ? fontPairing.body.weight : 400,
    }),
    [fontPairing]
  );

  if (!primary) return null;

  const palette = [
    primary.colors.primary,
    primary.colors.secondary,
    ...(primary.colors.accent ?? []),
  ].filter(Boolean);
  const accent = primary.colors.accent?.[0] ?? primary.colors.primary;
  const primaryName = zh ? primary.name : primary.nameEn || primary.name;

  return (
    <section className="mb-10">
      <MiniPreviewStyles />
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {zh ? "搭配预览" : "Combination Preview"}
        </h2>
        {styles.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {styles.map((style, index) => (
              <button
                key={style.slug}
                type="button"
                disabled={!onMakePrimary}
                onClick={() => index !== 0 && onMakePrimary?.(style.slug)}
                title={
                  index === 0
                    ? zh
                      ? "当前主风格"
                      : "Current base style"
                    : onMakePrimary
                      ? zh
                        ? "设为主风格"
                        : "Set as base style"
                      : undefined
                }
                className={
                  index === 0
                    ? "border border-foreground bg-foreground text-background px-2.5 py-1 text-[10px] uppercase tracking-[0.14em]"
                    : `border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-muted ${onMakePrimary ? "hover:border-foreground hover:text-foreground transition-colors" : ""}`
                }
              >
                {zh ? style.name : style.nameEn || style.name}
                {index === 0 && <span className="ml-1.5 opacity-70">{zh ? "主" : "base"}</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border border-border">
        {/* Palette bar from the primary style */}
        <div className="h-2 flex">
          {palette.map((color, index) => (
            <div key={`${color}-${index}`} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>

        {/* Demo canvas: colors + typography rendered inline, no utility deps.
            Keyed by the combination so switching base style / pairing remounts. */}
        <div
          key={`${primary.slug}:${fontPairing?.id ?? "none"}`}
          className="px-6 py-8 md:px-10 md:py-10 bg-background"
        >
          <p
            className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4"
            style={{ color: accent }}
          >
            {primaryName} · {zh ? "组合演示" : "Combination Demo"}
          </p>
          <h3
            className="mb-3 break-words"
            style={{
              fontFamily: demoFonts.heading,
              fontWeight: demoFonts.headingWeight,
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {zh ? "以此风格开始构建" : "Build in this direction"}
          </h3>
          <p
            className="max-w-xl text-muted"
            style={{
              fontFamily: demoFonts.body,
              fontWeight: demoFonts.bodyWeight,
              fontSize: "0.95rem",
              lineHeight: 1.7,
            }}
          >
            {zh
              ? "标题与正文使用你选择的字体配对，按钮与色带取自主风格的调色板。导出的提示词会把这一切写给 AI。"
              : "Headings and body render in your chosen pairing; buttons and the color bar come from the base style palette. The exported prompt spells all of this out for AI tools."}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center px-5 py-2.5 text-sm"
              style={{
                backgroundColor: primary.colors.primary,
                color: contrastText(primary.colors.primary),
                fontFamily: demoFonts.body,
                fontWeight: 500,
              }}
            >
              {zh ? "主按钮" : "Primary action"}
            </span>
            <span
              className="inline-flex items-center px-5 py-2.5 text-sm"
              style={{
                border: `1.5px solid ${accent}`,
                color: accent,
                fontFamily: demoFonts.body,
                fontWeight: 500,
              }}
            >
              {zh ? "次按钮" : "Secondary"}
            </span>
            {fontPairing && (
              <span className="font-mono text-[10px] uppercase tracking-wide text-muted">
                {fontPairing.heading.family} + {fontPairing.body.family}
              </span>
            )}
          </div>
        </div>

        {/* Selected animations as self-contained vignettes */}
        {animations.length > 0 && (
          <div className="border-t border-border px-6 py-4 md:px-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-3">
              {zh ? "已选动效" : "Selected Motion"}
            </p>
            <div className="flex flex-wrap gap-4">
              {animations.map((animation) => (
                <div key={animation.slug} className="flex items-center gap-3">
                  <div className="sk-preview-canvas w-[104px] h-[72px] border border-border flex items-center justify-center overflow-hidden">
                    <MiniPreview slug={animation.slug} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs leading-snug">
                      {zh ? animation.name : animation.nameEn}
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-wide text-muted mt-0.5">
                      {animation.trigger} · {animation.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pairing hints */}
      {hints.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {hints.map((hint, index) => {
            const tone = HINT_TONE_STYLES[hint.tone];
            return (
              <li key={index} className="flex items-start gap-2.5 text-xs leading-relaxed">
                <span
                  className={`mt-px shrink-0 border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide ${tone.className}`}
                >
                  {tone.label}
                </span>
                <span className="text-muted">{zh ? hint.zh : hint.en}</span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
