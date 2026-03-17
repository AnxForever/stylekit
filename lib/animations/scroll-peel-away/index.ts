/**
 * scroll-peel-away — directory-based animation (Phase 1 pilot)
 */

export { useScrollPeelAway } from "./use-scroll-peel-away";
export type { UseScrollPeelAwayOptions } from "./use-scroll-peel-away";
export { scrollPeelAwayMeta } from "./meta";
export { ScrollPeelAwayPreview } from "./preview";

import type { Animation } from "../types";
import { scrollPeelAwayMeta } from "./meta";
import { scrollPeelAway as _legacy } from "../_legacy/scroll-peel-away";

export const scrollPeelAway: Animation = {
  ...scrollPeelAwayMeta,
  descriptionEn:
    "Scroll-driven peel-away effect where the current section curls up from the corner like a sticker being peeled off, revealing the next layer beneath. Combined with shadow and 3D rotation for realistic paper-curl texture.",
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  cssProperties: ["transform", "clip-path", "box-shadow", "opacity"],
  isGPUAccelerated: true,
  previewBg: "light",
  useCases: [
    "Creative portfolio page transitions",
    "Magazine-style article navigation",
    "Product reveal sequences",
    "Interactive storytelling experiences",
  ],
  relatedAnimations: ["scroll-page-turn", "scroll-reveal", "flip-card"],
  recommendedStyles: [
    "apple-style",
    "editorial",
    "full-page-scroll",
    "magazine-grid",
  ],
  codeSnippets: _legacy.codeSnippets,
};
