import type { Animation } from "../types";

export const parallaxLayers: Animation = {
  slug: "parallax-layers",
  name: "鼠标视差层",
  nameEn: "Parallax Layers",
  description: "多层元素按不同强度响应鼠标位置，形成轻量空间深度。",
  descriptionEn: "Layered elements respond to pointer position at different strengths to create lightweight depth.",
  category: "pointer",
  tags: ["parallax", "layers", "depth", "pointer"],
  trigger: "continuous",
  difficulty: "intermediate",
  duration: "continuous",
  easing: "ease-out",
  cssProperties: ["transform"],
  isGPUAccelerated: true,
  previewBg: "gradient",
  keywords: ["mouse parallax", "parallax layers", "pointer depth", "hero parallax"],
  useCases: ["Hero compositions", "Product panels", "Demo canvases"],
  relatedAnimations: ["tilt-3d", "parallax-float"],
  recommendedStyles: ["hero-fullscreen", "apple-style", "macos-vibrancy"],
  playgroundMode: "js-driven",
  intensity: "medium",
  input: "pointer-fine",
  performanceNotes: "Use CSS variables for normalized x/y and let each layer multiply locally.",
  accessibilityNotes: "Disable for reduced motion and avoid moving readable text more than a few pixels.",
  recommendedUseCases: ["Hero art", "Product scenes", "Showcase panels"],
  codeSnippets: [
    {
      label: "CSS Variables",
      language: "css",
      code: `.parallax-stage { --mx: 0; --my: 0; }
.parallax-layer {
  transform: translate3d(
    calc(var(--mx) * var(--depth, 1) * 1px),
    calc(var(--my) * var(--depth, 1) * 1px),
    0
  );
  will-change: transform;
}`,
    },
  ],
};
