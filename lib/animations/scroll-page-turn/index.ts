/**
 * scroll-page-turn — directory-based animation (Phase 1 pilot)
 *
 * New format: real hook + preview that imports it.
 * The Animation object still carries codeSnippets for backward compat
 * with the detail page's code tabs.
 */

export { useScrollPageTurn } from "./use-scroll-page-turn";
export type { UseScrollPageTurnOptions, PageTurnState } from "./use-scroll-page-turn";
export { scrollPageTurnMeta } from "./meta";
export { ScrollPageTurnPreview } from "./preview";

// Re-export the full Animation object for registry compatibility
import type { Animation } from "../types";
import { scrollPageTurnMeta } from "./meta";

// Read hook source at build time is a future goal.
// For now, keep codeSnippets as strings for the code tabs UI.
import { scrollPageTurn as _legacy } from "../_legacy/scroll-page-turn";

export const scrollPageTurn: Animation = {
  ...scrollPageTurnMeta,
  descriptionEn:
    "Scroll-driven 3D page turn effect where sections flip along the Y-axis like book pages, revealing the next section beneath. Uses sticky positioning to lock the viewport, combined with perspective and rotateY for a cinematic page-turning experience.",
  easing: "cubic-bezier(0.32, 0.72, 0, 1)",
  cssProperties: ["transform", "opacity", "box-shadow"],
  isGPUAccelerated: true,
  previewBg: "dark",
  useCases: [
    "Product launch storytelling pages",
    "Portfolio case study transitions",
    "Immersive brand narrative sites",
    "Full-page scroll experiences",
  ],
  relatedAnimations: ["scroll-reveal", "parallax-float", "flip-card"],
  recommendedStyles: [
    "apple-style",
    "full-page-scroll",
    "parallax-sections",
    "hero-fullscreen",
  ],
  // Delegate to legacy for codeSnippets until build-time source extraction
  codeSnippets: _legacy.codeSnippets,
};
