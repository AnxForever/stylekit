import type { ReactNode } from "react";

export type StylePreviewKind = "button" | "card" | "input" | "coverPreview";

export type StylePreviewLocale = "zh" | "en";

export interface StylePreviewRenderContext {
  /**
   * Locale the preview is mounted in. Optional so pre-existing renderers that
   * ignore copy entirely stay valid; sample copy falls back to English when it
   * is missing, which matches the default locale.
   */
  locale?: StylePreviewLocale;
}

export type StylePreviewRenderer = (
  context?: StylePreviewRenderContext,
) => ReactNode;

export type StylePreviewComponents = Partial<
  Record<StylePreviewKind, StylePreviewRenderer>
>;
