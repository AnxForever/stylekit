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
import { counterRoll } from "./counter-roll";
import { morphShape } from "./morph-shape";

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
  counterRoll,
  morphShape,
];

export function getAllAnimations(): Animation[] {
  return animations;
}

export function getAnimationBySlug(slug: string): Animation | undefined {
  return animations.find((a) => a.slug === slug);
}
