import type { ReactNode } from "react";

export type StylePreviewKind = "button" | "card" | "input" | "coverPreview";

export type StylePreviewRenderer = () => ReactNode;

export type StylePreviewComponents = Partial<
  Record<StylePreviewKind, StylePreviewRenderer>
>;
