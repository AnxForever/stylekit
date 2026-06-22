import { spotlightCard as _anim } from "../_legacy/spotlight-card";
import type { Animation } from "../types";
export const spotlightCard = {
  ..._anim,
  category: "pointer",
  intensity: "low",
  input: "pointer-fine",
  performanceNotes: "Write CSS custom properties in requestAnimationFrame and keep the radial layer pointer-events none.",
  accessibilityNotes: "Disable on coarse pointers and reduced motion; keep content contrast readable without the light.",
  recommendedUseCases: ["Feature cards", "Pricing cards", "Gallery items"],
} satisfies Animation;
