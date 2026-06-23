/**
 * Re-export hub for the mouse-interaction primitives. The actual
 * implementations live in this directory's sub-files, organized
 * by what kind of effect they implement:
 *
 *   _stage.tsx              — MouseStage + PointerContext + useStage + lerp
 *   primitives/_cursor-effects.tsx   — FollowAura, Trail, Spotlight,
 *                                      GlitchRGB, Scanline
 *   primitives/_physics-effects.tsx  — PressDent, Mirror, Grid3D,
 *                                      Tilt3D, MagneticTarget,
 *                                      Warp, Squish
 *   primitives/_particles.tsx        — Ripple, Confetti, EmblemSpin,
 *                                      GeometricFragments,
 *                                      SpeedLine, PaperLayer
 *
 * This file exists so callers can keep using the historical
 * `import { ... } from "../primitives"` import path. The 19
 * components that generic-room.tsx (and any future caller) needs
 * are all re-exported here.
 */

export { MouseStage } from "./_stage";
export { useStage } from "./_stage";

export {
  FollowAura,
  Trail,
  Spotlight,
  GlitchRGB,
  Scanline,
} from "./primitives/_cursor-effects";

export {
  PressDent,
  Mirror,
  Grid3D,
  Tilt3D,
  MagneticTarget,
  Warp,
  Squish,
} from "./primitives/_physics-effects";

export {
  Ripple,
  Confetti,
  EmblemSpin,
  GeometricFragments,
  SpeedLine,
  PaperLayer,
} from "./primitives/_particles";
export type { PaperLayerItem } from "./primitives/_particles";