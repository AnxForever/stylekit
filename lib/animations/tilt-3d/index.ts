import { tilt3d as _anim } from "../_legacy/tilt-3d";
import type { Animation } from "../types";
export const tilt3d = {
  ..._anim,
  category: "pointer",
  intensity: "medium",
  input: "pointer-fine",
  performanceNotes: "Keep tilt between 5-15 degrees, animate transform only, and reset on pointer leave.",
  accessibilityNotes: "Disable for reduced motion; do not apply by default to dense lists or cover previews.",
  recommendedUseCases: ["Product mockups", "Demo panels", "Feature previews"],
} satisfies Animation;
