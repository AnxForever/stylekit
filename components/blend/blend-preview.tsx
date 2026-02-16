"use client";

import { useMemo } from "react";
import { useI18n } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/translations";
import type { StyleTokens } from "@/lib/styles/tokens";

interface BlendPreviewProps {
  tokens: StyleTokens;
}

/**
 * Live preview of blended tokens, rendering sample card/button/input.
 * Uses an iframe with srcdoc for style isolation.
 */
export function BlendPreview({ tokens }: BlendPreviewProps) {
  const { t } = useI18n();

  const srcdoc = useMemo(() => buildPreviewHtml(tokens, t), [tokens, t]);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-muted/5 border-b border-border text-sm font-medium">
        {t("blend.preview")}
      </div>
      <iframe
        srcDoc={srcdoc}
        className="w-full border-0"
        style={{ height: 420 }}
        title="Blend Preview"
        sandbox="allow-scripts"
      />
    </div>
  );
}

function buildPreviewHtml(
  tokens: StyleTokens,
  t: (key: TranslationKey) => string
): string {
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
  const sizes = tokens.typography.sizes;
  const btnPrimary = tokens.colors.button.primary;
  const btnSecondary = tokens.colors.button.secondary;
  const transition = tokens.interaction.transition;
  const hoverShadow = tokens.shadow.hover;
  const borderStyle = tokens.border.style ?? "";

  const cardClasses = [bgClass, borderW, borderC, borderStyle, radius, shadow, cardPad]
    .filter(Boolean)
    .join(" ");

  const btnBase = ["px-4 py-2", radius, borderW, borderC, transition, heading, sizes.small]
    .filter(Boolean)
    .join(" ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body class="${bgClass} p-6">
  <!-- Card -->
  <div class="${cardClasses} mb-4">
    <h3 class="${heading} ${sizes.h3} ${textClass} mb-2">${t("blend.previewCard")}</h3>
    <p class="${body} ${sizes.body} ${mutedClass} mb-4">${t("blend.previewText")}</p>
    <div class="flex gap-2 flex-wrap">
      <button class="${btnBase} ${btnPrimary} ${hoverShadow}">${t("blend.previewPrimary")}</button>
      <button class="${btnBase} ${btnSecondary} ${hoverShadow}">${t("blend.previewSecondary")}</button>
    </div>
  </div>

  <!-- Input -->
  <div class="mb-4">
    <input
      type="text"
      readonly
      placeholder="${t("blend.previewInput")}"
      class="w-full px-3 py-2 ${bgClass} ${textClass} ${borderW} ${borderC} ${radius} ${body} ${sizes.body} outline-none"
    />
  </div>

  <!-- Badge row -->
  <div class="flex gap-2 flex-wrap">
    ${tokens.colors.background.accent
      .slice(0, 4)
      .map(
        (accent, i) =>
          `<span class="px-3 py-1 ${accent} ${radius} ${sizes.small} ${heading} text-white">${t("blend.previewAccent")} ${i + 1}</span>`
      )
      .join("\n    ")}
  </div>
</body>
</html>`;
}
