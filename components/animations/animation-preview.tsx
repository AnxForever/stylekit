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

function dynamicPreview(loader: () => Promise<ComponentType>) {
  return dynamic(loader, {
    ssr: false,
    loading: () => <PreviewLoadingFallback />,
  });
}

const previewMap: Record<string, ComponentType> = {
  "fade-in-up": dynamicPreview(
    () => import("@/lib/animations/previews/fade-in-up-preview").then((m) => m.FadeInUpPreview)
  ),
  "fade-in-down": dynamicPreview(
    () => import("@/lib/animations/previews/fade-in-down-preview").then((m) => m.FadeInDownPreview)
  ),
  "scale-in": dynamicPreview(
    () => import("@/lib/animations/previews/scale-in-preview").then((m) => m.ScaleInPreview)
  ),
  "slide-in-left": dynamicPreview(
    () => import("@/lib/animations/previews/slide-in-left-preview").then((m) => m.SlideInLeftPreview)
  ),
  "hover-lift": dynamicPreview(
    () => import("@/lib/animations/previews/hover-lift-preview").then((m) => m.HoverLiftPreview)
  ),
  "hover-glow": dynamicPreview(
    () => import("@/lib/animations/previews/hover-glow-preview").then((m) => m.HoverGlowPreview)
  ),
  "scroll-reveal": dynamicPreview(
    () => import("@/lib/animations/previews/scroll-reveal-preview").then((m) => m.ScrollRevealPreview)
  ),
  "parallax-float": dynamicPreview(
    () => import("@/lib/animations/previews/parallax-float-preview").then((m) => m.ParallaxFloatPreview)
  ),
  typewriter: dynamicPreview(
    () => import("@/lib/animations/previews/typewriter-preview").then((m) => m.TypewriterPreview)
  ),
  "text-gradient-flow": dynamicPreview(
    () => import("@/lib/animations/previews/text-gradient-flow-preview").then((m) => m.TextGradientFlowPreview)
  ),
  "skeleton-pulse": dynamicPreview(
    () => import("@/lib/animations/previews/skeleton-pulse-preview").then((m) => m.SkeletonPulsePreview)
  ),
  "spinner-dots": dynamicPreview(
    () => import("@/lib/animations/previews/spinner-dots-preview").then((m) => m.SpinnerDotsPreview)
  ),
  "background-gradient-shift": dynamicPreview(
    () => import("@/lib/animations/previews/background-gradient-shift-preview").then((m) => m.BackgroundGradientShiftPreview)
  ),
  "stagger-children": dynamicPreview(
    () => import("@/lib/animations/previews/stagger-children-preview").then((m) => m.StaggerChildrenPreview)
  ),
  "blur-in": dynamicPreview(
    () => import("@/lib/animations/previews/blur-in-preview").then((m) => m.BlurInPreview)
  ),
  "spotlight-card": dynamicPreview(
    () => import("@/lib/animations/previews/spotlight-card-preview").then((m) => m.SpotlightCardPreview)
  ),
  "magnetic-hover": dynamicPreview(
    () => import("@/lib/animations/previews/magnetic-hover-preview").then((m) => m.MagneticHoverPreview)
  ),
  "bounce-in": dynamicPreview(
    () => import("@/lib/animations/previews/bounce-in-preview").then((m) => m.BounceInPreview)
  ),
  "slide-in-right": dynamicPreview(
    () => import("@/lib/animations/previews/slide-in-right-preview").then((m) => m.SlideInRightPreview)
  ),
  "rotate-in": dynamicPreview(
    () => import("@/lib/animations/previews/rotate-in-preview").then((m) => m.RotateInPreview)
  ),
  shake: dynamicPreview(
    () => import("@/lib/animations/previews/shake-preview").then((m) => m.ShakePreview)
  ),
  "flip-card": dynamicPreview(
    () => import("@/lib/animations/previews/flip-card-preview").then((m) => m.FlipCardPreview)
  ),
  "ripple-click": dynamicPreview(
    () => import("@/lib/animations/previews/ripple-click-preview").then((m) => m.RippleClickPreview)
  ),
  "counter-roll": dynamicPreview(
    () => import("@/lib/animations/previews/counter-roll-preview").then((m) => m.CounterRollPreview)
  ),
  "morph-shape": dynamicPreview(
    () => import("@/lib/animations/previews/morph-shape-preview").then((m) => m.MorphShapePreview)
  ),
  "fade-out-down": dynamicPreview(
    () => import("@/lib/animations/previews/fade-out-down-preview").then((m) => m.FadeOutDownPreview)
  ),
  "scale-out": dynamicPreview(
    () => import("@/lib/animations/previews/scale-out-preview").then((m) => m.ScaleOutPreview)
  ),
  "slide-out-right": dynamicPreview(
    () => import("@/lib/animations/previews/slide-out-right-preview").then((m) => m.SlideOutRightPreview)
  ),
  collapse: dynamicPreview(
    () => import("@/lib/animations/previews/collapse-preview").then((m) => m.CollapsePreview)
  ),
  crossfade: dynamicPreview(
    () => import("@/lib/animations/previews/crossfade-preview").then((m) => m.CrossfadePreview)
  ),
  "slide-swap": dynamicPreview(
    () => import("@/lib/animations/previews/slide-swap-preview").then((m) => m.SlideSwapPreview)
  ),
  "morph-transition": dynamicPreview(
    () => import("@/lib/animations/previews/morph-transition-preview").then((m) => m.MorphTransitionPreview)
  ),
  "text-reveal": dynamicPreview(
    () => import("@/lib/animations/previews/text-reveal-preview").then((m) => m.TextRevealPreview)
  ),
  "underline-draw": dynamicPreview(
    () => import("@/lib/animations/previews/underline-draw-preview").then((m) => m.UnderlineDrawPreview)
  ),
  "progress-bar": dynamicPreview(
    () => import("@/lib/animations/previews/progress-bar-preview").then((m) => m.ProgressBarPreview)
  ),
  "elastic-scale": dynamicPreview(
    () => import("@/lib/animations/previews/elastic-scale-preview").then((m) => m.ElasticScalePreview)
  ),
  "pulse-ring": dynamicPreview(
    () => import("@/lib/animations/previews/pulse-ring-preview").then((m) => m.PulseRingPreview)
  ),
  "zoom-in": dynamicPreview(
    () => import("@/lib/animations/previews/zoom-in-preview").then((m) => m.ZoomInPreview)
  ),
  "marquee-scroll": dynamicPreview(
    () => import("@/lib/animations/previews/marquee-scroll-preview").then((m) => m.MarqueeScrollPreview)
  ),
  shimmer: dynamicPreview(
    () => import("@/lib/animations/previews/shimmer-preview").then((m) => m.ShimmerPreview)
  ),
  pulse: dynamicPreview(
    () => import("@/lib/animations/previews/pulse-preview").then((m) => m.PulsePreview)
  ),
  "elastic-snap": dynamicPreview(
    () => import("@/lib/animations/previews/elastic-snap-preview").then((m) => m.ElasticSnapPreview)
  ),
  "border-trace": dynamicPreview(
    () => import("@/lib/animations/previews/border-trace-preview").then((m) => m.BorderTracePreview)
  ),
  "glitch-text": dynamicPreview(
    () => import("@/lib/animations/previews/glitch-text-preview").then((m) => m.GlitchTextPreview)
  ),
  "text-scramble": dynamicPreview(
    () => import("@/lib/animations/previews/text-scramble-preview").then((m) => m.TextScramblePreview)
  ),
  "tilt-3d": dynamicPreview(
    () => import("@/lib/animations/previews/tilt-3d-preview").then((m) => m.Tilt3dPreview)
  ),
  "confetti-burst": dynamicPreview(
    () => import("@/lib/animations/previews/confetti-burst-preview").then((m) => m.ConfettiBurstPreview)
  ),
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
