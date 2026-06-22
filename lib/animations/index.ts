/**
 * Animation registry
 *
 * Full animation data including code snippets.
 * Server components and detail pages import from here.
 * For client-side listing, use meta.ts instead.
 */

import type { Animation } from "./types";
export type {
  Animation,
  AnimationMeta,
  AnimationCategory,
  AnimationTrigger,
  AnimationCodeSnippet,
} from "./types";

import { fadeInUp } from "./fade-in-up";
import { fadeInDown } from "./fade-in-down";
import { scaleIn } from "./scale-in";
import { slideInLeft } from "./slide-in-left";
import { hoverLift } from "./hover-lift";
import { hoverGlow } from "./hover-glow";
import { scrollReveal } from "./scroll-reveal";
import { parallaxFloat } from "./parallax-float";
import { typewriter } from "./typewriter";
import { textGradientFlow } from "./text-gradient-flow";
import { skeletonPulse } from "./skeleton-pulse";
import { spinnerDots } from "./spinner-dots";
import { backgroundGradientShift } from "./background-gradient-shift";
import { staggerChildren } from "./stagger-children";
import { blurIn } from "./blur-in";
import { spotlightCard } from "./spotlight-card";
import { magneticHover } from "./magnetic-hover";
import { bounceIn } from "./bounce-in";
import { slideInRight } from "./slide-in-right";
import { rotateIn } from "./rotate-in";
import { shake } from "./shake";
import { flipCard } from "./flip-card";
import { rippleClick } from "./ripple-click";
import { cursorAura } from "./cursor-aura";
import { cursorTrail } from "./cursor-trail";
import { proximityReveal } from "./proximity-reveal";
import { textRepulsion } from "./text-repulsion";
import { imageDistortion } from "./image-distortion";
import { parallaxLayers } from "./parallax-layers";
import { dragPhysics } from "./drag-physics";
import { contextCursor } from "./context-cursor";
import { counterRoll } from "./counter-roll";
import { morphShape } from "./morph-shape";
import { fadeOutDown } from "./fade-out-down";
import { zoomIn } from "./zoom-in";
import { marqueeScroll } from "./marquee-scroll";
import { shimmer } from "./shimmer";
import { pulse } from "./pulse";
import { elasticSnap } from "./elastic-snap";
import { borderTrace } from "./border-trace";
import { glitchText } from "./glitch-text";
import { scaleOut } from "./scale-out";
import { slideOutRight } from "./slide-out-right";
import { collapse } from "./collapse";
import { crossfade } from "./crossfade";
import { slideSwap } from "./slide-swap";
import { morphTransition } from "./morph-transition";
import { textReveal } from "./text-reveal";
import { underlineDraw } from "./underline-draw";
import { progressBar } from "./progress-bar";
import { elasticScale } from "./elastic-scale";
import { pulseRing } from "./pulse-ring";
import { textScramble } from "./text-scramble";
import { tilt3d } from "./tilt-3d";
import { confettiBurst } from "./confetti-burst";
import { scrollPageTurn } from "./scroll-page-turn";
import { scrollPeelAway } from "./scroll-peel-away";

export const animations: Animation[] = [
  fadeInUp,
  fadeInDown,
  scaleIn,
  slideInLeft,
  hoverLift,
  hoverGlow,
  scrollReveal,
  parallaxFloat,
  typewriter,
  textGradientFlow,
  skeletonPulse,
  spinnerDots,
  backgroundGradientShift,
  staggerChildren,
  blurIn,
  spotlightCard,
  magneticHover,
  bounceIn,
  slideInRight,
  rotateIn,
  shake,
  flipCard,
  rippleClick,
  cursorAura,
  cursorTrail,
  proximityReveal,
  textRepulsion,
  imageDistortion,
  parallaxLayers,
  dragPhysics,
  contextCursor,
  counterRoll,
  morphShape,
  fadeOutDown,
  zoomIn,
  marqueeScroll,
  shimmer,
  pulse,
  elasticSnap,
  borderTrace,
  glitchText,
  scaleOut,
  slideOutRight,
  collapse,
  crossfade,
  slideSwap,
  morphTransition,
  textReveal,
  underlineDraw,
  progressBar,
  elasticScale,
  pulseRing,
  textScramble,
  tilt3d,
  confettiBurst,
  scrollPageTurn,
  scrollPeelAway,
];

export function getAllAnimations(): Animation[] {
  return animations;
}

export function getAnimationBySlug(slug: string): Animation | undefined {
  return animations.find((a) => a.slug === slug);
}
