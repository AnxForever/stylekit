"use client";

import { useMemo } from "react";
import { useI18n } from "@/lib/i18n/context";
import type { StyleTokens } from "@/lib/styles/tokens";

interface StylePreviewPanelProps {
  name: string;
  tokens: StyleTokens;
  highlight?: Set<string>;
}

/**
 * Renders Button, Card, and Input previews using a style's token classes.
 * Optionally highlights token-based differences via the `highlight` set.
 */
export function StylePreviewPanel({
  name,
  tokens,
  highlight,
}: StylePreviewPanelProps) {
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
    [btnSecondary, radius, borderW, borderC, transition, heading, hSizes.small]
  );

  const inputClasses = useMemo(
    () =>
      [
        "w-full px-3 py-2",
        bgClass,
        textClass,
        borderW,
        borderC,
        radius,
        body,
        hSizes.body,
        "outline-none",
      ]
        .filter(Boolean)
        .join(" "),
    [bgClass, textClass, borderW, borderC, radius, body, hSizes.body]
  );

  const isHighlighted = (key: string) => highlight?.has(key);

  return (
    <div className="border border-border overflow-hidden">
      {/* Panel header */}
      <div className="px-4 py-2 bg-muted/5 border-b border-border text-sm font-medium">
        {name}
      </div>

      {/* Preview area */}
      <div className={`p-4 space-y-4 ${bgClass}`}>
        {/* Button preview */}
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted mb-2 font-medium">
            {t("compare.previewButton")}
          </div>
          <div
            className={`flex gap-2 flex-wrap ${isHighlighted("button") ? "ring-2 ring-yellow-400 p-1" : ""}`}
          >
            <button type="button" className={btnPrimaryClasses}>
              {t("compare.previewPrimary")}
            </button>
            <button type="button" className={btnSecondaryClasses}>
              {t("compare.previewSecondary")}
            </button>
          </div>
        </div>

        {/* Card preview */}
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted mb-2 font-medium">
            {t("compare.previewCard")}
          </div>
          <div
            className={`${cardClasses} ${isHighlighted("card") ? "ring-2 ring-yellow-400" : ""}`}
          >
            <h4 className={`${heading} ${hSizes.h3} ${textClass} mb-2`}>
              {t("compare.previewCardTitle")}
            </h4>
            <p className={`${body} ${hSizes.body} ${mutedClass}`}>
              {t("compare.previewCardDesc")}
            </p>
          </div>
        </div>

        {/* Input preview */}
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted mb-2 font-medium">
            {t("compare.previewInput")}
          </div>
          <div
            className={isHighlighted("input") ? "ring-2 ring-yellow-400" : ""}
          >
            <input
              type="text"
              readOnly
              placeholder={t("compare.sampleInput")}
              className={inputClasses}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
