"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { PreviewContainer } from "@/lib/animations/previews/_shared";

const previewMap: Record<string, ComponentType> = {
  "fade-in-up": dynamic(
    () => import("@/lib/animations/previews/fade-in-up-preview").then((m) => m.FadeInUpPreview),
    { ssr: false }
  ),
  "fade-in-down": dynamic(
    () => import("@/lib/animations/previews/fade-in-down-preview").then((m) => m.FadeInDownPreview),
    { ssr: false }
  ),
  "scale-in": dynamic(
    () => import("@/lib/animations/previews/scale-in-preview").then((m) => m.ScaleInPreview),
    { ssr: false }
  ),
  "slide-in-left": dynamic(
    () => import("@/lib/animations/previews/slide-in-left-preview").then((m) => m.SlideInLeftPreview),
    { ssr: false }
  ),
  "hover-lift": dynamic(
    () => import("@/lib/animations/previews/hover-lift-preview").then((m) => m.HoverLiftPreview),
    { ssr: false }
  ),
  "hover-glow": dynamic(
    () => import("@/lib/animations/previews/hover-glow-preview").then((m) => m.HoverGlowPreview),
    { ssr: false }
  ),
  "scroll-reveal": dynamic(
    () => import("@/lib/animations/previews/scroll-reveal-preview").then((m) => m.ScrollRevealPreview),
    { ssr: false }
  ),
  "parallax-float": dynamic(
    () => import("@/lib/animations/previews/parallax-float-preview").then((m) => m.ParallaxFloatPreview),
    { ssr: false }
  ),
  typewriter: dynamic(
    () => import("@/lib/animations/previews/typewriter-preview").then((m) => m.TypewriterPreview),
    { ssr: false }
  ),
  "text-gradient-flow": dynamic(
    () => import("@/lib/animations/previews/text-gradient-flow-preview").then((m) => m.TextGradientFlowPreview),
    { ssr: false }
  ),
  "skeleton-pulse": dynamic(
    () => import("@/lib/animations/previews/skeleton-pulse-preview").then((m) => m.SkeletonPulsePreview),
    { ssr: false }
  ),
  "spinner-dots": dynamic(
    () => import("@/lib/animations/previews/spinner-dots-preview").then((m) => m.SpinnerDotsPreview),
    { ssr: false }
  ),
  "background-gradient-shift": dynamic(
    () => import("@/lib/animations/previews/background-gradient-shift-preview").then((m) => m.BackgroundGradientShiftPreview),
    { ssr: false }
  ),
  "stagger-children": dynamic(
    () => import("@/lib/animations/previews/stagger-children-preview").then((m) => m.StaggerChildrenPreview),
    { ssr: false }
  ),
  "blur-in": dynamic(
    () => import("@/lib/animations/previews/blur-in-preview").then((m) => m.BlurInPreview),
    { ssr: false }
  ),
  "spotlight-card": dynamic(
    () => import("@/lib/animations/previews/spotlight-card-preview").then((m) => m.SpotlightCardPreview),
    { ssr: false }
  ),
  "magnetic-hover": dynamic(
    () => import("@/lib/animations/previews/magnetic-hover-preview").then((m) => m.MagneticHoverPreview),
    { ssr: false }
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
