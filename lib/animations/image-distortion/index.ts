import type { Animation } from "../types";

export const imageDistortion: Animation = {
  slug: "image-distortion",
  name: "图像扭曲",
  nameEn: "Image Distortion",
  description: "鼠标经过图像时产生局部液态位移，适合高表现力作品集和专题页。",
  descriptionEn: "A local liquid-like displacement follows the pointer across an image for expressive portfolios and editorial pages.",
  category: "pointer",
  tags: ["image", "distortion", "pointer", "webgl"],
  trigger: "continuous",
  difficulty: "advanced",
  duration: "continuous",
  easing: "lerp",
  cssProperties: ["transform", "filter"],
  isGPUAccelerated: true,
  previewBg: "dark",
  keywords: ["image distortion", "liquid hover", "displacement", "webgl hover"],
  useCases: ["Portfolio galleries", "Campaign pages", "Immersive editorials"],
  relatedAnimations: ["parallax-layers", "tilt-3d"],
  recommendedStyles: ["surrealism", "liquid-glass", "holographic"],
  playgroundMode: "js-driven",
  intensity: "high",
  input: "pointer-fine",
  performanceNotes: "Use CSS clip/filter for lightweight demos; graduate to WebGL only when imagery demands it.",
  accessibilityNotes: "Never rely on distortion to reveal content; provide a static reduced-motion state.",
  recommendedUseCases: ["Artwork previews", "Campaign imagery", "Portfolio covers"],
  codeSnippets: [
    {
      label: "CSS Fallback",
      language: "css",
      code: `.distort-image {
  transition: transform 220ms ease, filter 220ms ease;
  will-change: transform, filter;
}

.distort-image:hover {
  transform: scale(1.035) skewX(0.6deg);
  filter: saturate(1.12) contrast(1.05);
}`,
    },
  ],
};
