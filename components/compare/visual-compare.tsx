"use client";

import { useMemo } from "react";
import { useI18n } from "@/lib/i18n/context";
import type { StyleTokens } from "@/lib/styles/tokens";

interface VisualCompareProps {
  styles: Array<{
    slug: string;
    name: string;
    nameEn: string;
    tokens: StyleTokens;
  }>;
}

/**
 * Renders a sample card + button using each style's tokens side-by-side.
 * Uses CSS variables injected per panel for isolation.
 */
export function VisualCompare({ styles }: VisualCompareProps) {
  const { locale, t } = useI18n();

  if (styles.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t("compare.visualPreview")}</h3>
      <div
        className={`grid gap-4 ${
          styles.length === 3
            ? "grid-cols-1 md:grid-cols-3"
            : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {styles.map((s) => (
          <StylePanel
            key={s.slug}
            name={locale === "zh" ? s.name : s.nameEn}
            tokens={s.tokens}
          />
        ))}
      </div>
    </div>
  );
}

function StylePanel({
  name,
  tokens,
}: {
  name: string;
  tokens: StyleTokens;
}) {
  const { t } = useI18n();

  const bgClass = tokens.colors.background.primary;
  const textClass = tokens.colors.text.primary;
  const mutedClass = tokens.colors.text.muted;
  const borderW = tokens.border.width;
  const borderC = tokens.border.color;
  const radius = tokens.border.radius;
  const shadow = tokens.shadow.md;
  const cardPad = tokens.spacing.card;
  const heading = tokens.typography.heading;
  const body = tokens.typography.body;
  const hSizes = tokens.typography.sizes;
  const btnPrimary = tokens.colors.button.primary;
  const btnSecondary = tokens.colors.button.secondary;
  const transition = tokens.interaction.transition;

  const cardClasses = useMemo(
    () =>
      [bgClass, borderW, borderC, radius, shadow, cardPad]
        .filter(Boolean)
        .join(" "),
    [bgClass, borderW, borderC, radius, shadow, cardPad]
  );

  const btnPrimaryClasses = useMemo(
    () =>
      [
        "px-4 py-2",
        btnPrimary,
        radius,
        borderW,
        borderC,
        transition,
        heading,
        hSizes.small,
      ]
        .filter(Boolean)
        .join(" "),
    [btnPrimary, radius, borderW, borderC, transition, heading, hSizes.small]
  );

  const btnSecondaryClasses = useMemo(
    () =>
      [
        "px-4 py-2",
        btnSecondary,
        radius,
        borderW,
        borderC,
        transition,
        heading,
        hSizes.small,
      ]
        .filter(Boolean)
        .join(" "),
    [
      btnSecondary,
      radius,
      borderW,
      borderC,
      transition,
      heading,
      hSizes.small,
    ]
  );

  return (
    <div className="border border-border overflow-hidden">
      {/* Panel label */}
      <div className="px-4 py-2 bg-muted/5 border-b border-border text-sm font-medium">
        {name}
      </div>

      {/* Preview area */}
      <div className={`p-4 ${bgClass}`}>
        {/* Sample card */}
        <div className={cardClasses}>
          <h4 className={`${heading} ${hSizes.h3} ${textClass} mb-2`}>
            {t("compare.sampleCard")}
          </h4>
          <p className={`${body} ${hSizes.body} ${mutedClass} mb-4`}>
            {t("compare.sampleText")}
          </p>
          <div className="flex gap-2 flex-wrap">
            <button type="button" className={btnPrimaryClasses}>
              {t("compare.primaryBtn")}
            </button>
            <button type="button" className={btnSecondaryClasses}>
              {t("compare.secondaryBtn")}
            </button>
          </div>
        </div>

        {/* Sample input */}
        <div className="mt-4">
          <input
            type="text"
            readOnly
            placeholder={t("compare.sampleInput")}
            className={`w-full px-3 py-2 ${bgClass} ${textClass} ${borderW} ${borderC} ${radius} ${body} ${hSizes.body} outline-none`}
          />
        </div>
      </div>
    </div>
  );
}
