/**
 * flip-card — directory-based animation (Phase 1 pilot)
 *
 * New format: real hook + preview that imports it.
 */

export { useFlipCard } from "./use-flip-card";
export type { UseFlipCardOptions, FlipCardState } from "./use-flip-card";
export { flipCardMeta } from "./meta";
export { FlipCardPreview } from "./preview";

import type { Animation } from "../types";
import { flipCardMeta } from "./meta";
import { flipCard as _legacy } from "../_legacy/flip-card";

export const flipCard: Animation = {
  ...flipCardMeta,
  descriptionEn:
    "Card flips along the Y-axis in 3D space to reveal back content. Requires a perspective container and backface-visibility control.",
  easing: "ease-in-out",
  cssProperties: ["transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  useCases: [
    "Team member profile cards",
    "Product feature reveal",
    "FAQ toggle cards",
    "Interactive info cards",
  ],
  relatedAnimations: ["hover-lift", "hover-glow"],
  recommendedStyles: ["glassmorphism", "modern-gradient", "dark-mode"],
  codeSnippets: _legacy.codeSnippets,
};
