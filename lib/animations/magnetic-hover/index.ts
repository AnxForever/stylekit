import { magneticHover as _anim } from "../_legacy/magnetic-hover";
import type { Animation } from "../types";
export const magneticHover = {
  ..._anim,
  category: "pointer",
  intensity: "medium",
  input: "pointer-fine",
  performanceNotes: "Use requestAnimationFrame and transform only; avoid React state updates inside pointermove.",
  accessibilityNotes: "Disable for reduced motion and keep the native pointer/focus behavior intact.",
  recommendedUseCases: ["Primary CTA", "Toolbar action", "Hero button"],
} satisfies Animation;
