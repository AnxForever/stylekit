"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { PreviewContainer } from "@/lib/animations/previews/_shared";

function PreviewLoadingFallback() {
  return (
    <PreviewContainer bg="light">
      <div className="w-full max-w-[220px] animate-pulse space-y-3">
        <div className="h-20 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-2 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800 mx-auto" />
      </div>
    </PreviewContainer>
  );
}

/**
 * Convention-based preview discovery.
 *
 * All previews live at lib/animations/{slug}/preview.tsx
 * and export a named component matching the PascalCase slug + "Preview".
 *
 * Webpack requires static import paths for code splitting, so we still
 * enumerate them here — but the pattern is mechanical: one line per slug,
 * all pointing to `@/lib/animations/{slug}/preview`.
 *
 * TODO (Phase 4): Generate this map at build time from directory scan.
 */
function dp(loader: () => Promise<ComponentType>) {
  return dynamic(loader, { ssr: false, loading: () => <PreviewLoadingFallback /> });
}

const previewMap: Record<string, ComponentType> = {
  "background-gradient-shift": dp(() => import("@/lib/animations/background-gradient-shift/preview").then((m) => m.BackgroundGradientShiftPreview)),
  "blur-in": dp(() => import("@/lib/animations/blur-in/preview").then((m) => m.BlurInPreview)),
  "border-trace": dp(() => import("@/lib/animations/border-trace/preview").then((m) => m.BorderTracePreview)),
  "bounce-in": dp(() => import("@/lib/animations/bounce-in/preview").then((m) => m.BounceInPreview)),
  "collapse": dp(() => import("@/lib/animations/collapse/preview").then((m) => m.CollapsePreview)),
  "confetti-burst": dp(() => import("@/lib/animations/confetti-burst/preview").then((m) => m.ConfettiBurstPreview)),
  "counter-roll": dp(() => import("@/lib/animations/counter-roll/preview").then((m) => m.CounterRollPreview)),
  "crossfade": dp(() => import("@/lib/animations/crossfade/preview").then((m) => m.CrossfadePreview)),
  "elastic-scale": dp(() => import("@/lib/animations/elastic-scale/preview").then((m) => m.ElasticScalePreview)),
  "elastic-snap": dp(() => import("@/lib/animations/elastic-snap/preview").then((m) => m.ElasticSnapPreview)),
  "fade-in-down": dp(() => import("@/lib/animations/fade-in-down/preview").then((m) => m.FadeInDownPreview)),
  "fade-in-up": dp(() => import("@/lib/animations/fade-in-up/preview").then((m) => m.FadeInUpPreview)),
  "fade-out-down": dp(() => import("@/lib/animations/fade-out-down/preview").then((m) => m.FadeOutDownPreview)),
  "flip-card": dp(() => import("@/lib/animations/flip-card/preview").then((m) => m.FlipCardPreview)),
  "glitch-text": dp(() => import("@/lib/animations/glitch-text/preview").then((m) => m.GlitchTextPreview)),
  "hover-glow": dp(() => import("@/lib/animations/hover-glow/preview").then((m) => m.HoverGlowPreview)),
  "hover-lift": dp(() => import("@/lib/animations/hover-lift/preview").then((m) => m.HoverLiftPreview)),
  "magnetic-hover": dp(() => import("@/lib/animations/magnetic-hover/preview").then((m) => m.MagneticHoverPreview)),
  "marquee-scroll": dp(() => import("@/lib/animations/marquee-scroll/preview").then((m) => m.MarqueeScrollPreview)),
  "morph-shape": dp(() => import("@/lib/animations/morph-shape/preview").then((m) => m.MorphShapePreview)),
  "morph-transition": dp(() => import("@/lib/animations/morph-transition/preview").then((m) => m.MorphTransitionPreview)),
  "parallax-float": dp(() => import("@/lib/animations/parallax-float/preview").then((m) => m.ParallaxFloatPreview)),
  "progress-bar": dp(() => import("@/lib/animations/progress-bar/preview").then((m) => m.ProgressBarPreview)),
  "pulse": dp(() => import("@/lib/animations/pulse/preview").then((m) => m.PulsePreview)),
  "pulse-ring": dp(() => import("@/lib/animations/pulse-ring/preview").then((m) => m.PulseRingPreview)),
  "ripple-click": dp(() => import("@/lib/animations/ripple-click/preview").then((m) => m.RippleClickPreview)),
  "rotate-in": dp(() => import("@/lib/animations/rotate-in/preview").then((m) => m.RotateInPreview)),
  "scale-in": dp(() => import("@/lib/animations/scale-in/preview").then((m) => m.ScaleInPreview)),
  "scale-out": dp(() => import("@/lib/animations/scale-out/preview").then((m) => m.ScaleOutPreview)),
  "scroll-page-turn": dp(() => import("@/lib/animations/scroll-page-turn/preview").then((m) => m.ScrollPageTurnPreview)),
  "scroll-peel-away": dp(() => import("@/lib/animations/scroll-peel-away/preview").then((m) => m.ScrollPeelAwayPreview)),
  "scroll-reveal": dp(() => import("@/lib/animations/scroll-reveal/preview").then((m) => m.ScrollRevealPreview)),
  "shake": dp(() => import("@/lib/animations/shake/preview").then((m) => m.ShakePreview)),
  "shimmer": dp(() => import("@/lib/animations/shimmer/preview").then((m) => m.ShimmerPreview)),
  "skeleton-pulse": dp(() => import("@/lib/animations/skeleton-pulse/preview").then((m) => m.SkeletonPulsePreview)),
  "slide-in-left": dp(() => import("@/lib/animations/slide-in-left/preview").then((m) => m.SlideInLeftPreview)),
  "slide-in-right": dp(() => import("@/lib/animations/slide-in-right/preview").then((m) => m.SlideInRightPreview)),
  "slide-out-right": dp(() => import("@/lib/animations/slide-out-right/preview").then((m) => m.SlideOutRightPreview)),
  "slide-swap": dp(() => import("@/lib/animations/slide-swap/preview").then((m) => m.SlideSwapPreview)),
  "spinner-dots": dp(() => import("@/lib/animations/spinner-dots/preview").then((m) => m.SpinnerDotsPreview)),
  "spotlight-card": dp(() => import("@/lib/animations/spotlight-card/preview").then((m) => m.SpotlightCardPreview)),
  "stagger-children": dp(() => import("@/lib/animations/stagger-children/preview").then((m) => m.StaggerChildrenPreview)),
  "text-gradient-flow": dp(() => import("@/lib/animations/text-gradient-flow/preview").then((m) => m.TextGradientFlowPreview)),
  "text-reveal": dp(() => import("@/lib/animations/text-reveal/preview").then((m) => m.TextRevealPreview)),
  "text-scramble": dp(() => import("@/lib/animations/text-scramble/preview").then((m) => m.TextScramblePreview)),
  "tilt-3d": dp(() => import("@/lib/animations/tilt-3d/preview").then((m) => m.Tilt3dPreview)),
  "typewriter": dp(() => import("@/lib/animations/typewriter/preview").then((m) => m.TypewriterPreview)),
  "underline-draw": dp(() => import("@/lib/animations/underline-draw/preview").then((m) => m.UnderlineDrawPreview)),
  "zoom-in": dp(() => import("@/lib/animations/zoom-in/preview").then((m) => m.ZoomInPreview)),
};

interface AnimationPreviewProps {
  slug: string;
  bg?: "dark" | "light" | "gradient";
}

export function AnimationPreview({ slug, bg = "light" }: AnimationPreviewProps) {
  const Preview = previewMap[slug];

  if (!Preview) {
    return (
      <PreviewContainer bg={bg}>
        <p className="text-sm text-zinc-500">Preview not available</p>
      </PreviewContainer>
    );
  }

  return <Preview />;
}
