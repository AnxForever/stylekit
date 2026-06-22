import { rippleClick as _anim } from "../_legacy/ripple-click";
import type { Animation } from "../types";
export const rippleClick = {
  ..._anim,
  category: "pointer",
  intensity: "low",
  input: "pointer-any",
  performanceNotes: "Create short-lived ripple nodes and remove them after animation completion.",
  accessibilityNotes: "Pair with :active and focus-visible states so feedback remains available without motion.",
  recommendedUseCases: ["Buttons", "Icon buttons", "List item taps"],
} satisfies Animation;
