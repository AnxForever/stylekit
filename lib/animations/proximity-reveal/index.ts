import type { Animation } from "../types";

export const proximityReveal: Animation = {
  slug: "proximity-reveal",
  name: "靠近显现",
  nameEn: "Proximity Reveal",
  description: "鼠标靠近时才显示辅助操作或信息，让密集界面保持安静。",
  descriptionEn: "Secondary actions or details appear only when the pointer approaches, keeping dense UI quiet.",
  category: "pointer",
  tags: ["proximity", "reveal", "hover", "utility"],
  trigger: "on-hover",
  difficulty: "intermediate",
  duration: "180ms",
  easing: "ease-out",
  cssProperties: ["opacity", "transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["proximity reveal", "hover actions", "near cursor", "progressive disclosure"],
  useCases: ["Table row actions", "Image tools", "Card utilities"],
  relatedAnimations: ["spotlight-card", "hover-lift"],
  recommendedStyles: ["linear-style", "corporate-clean", "data-dense"],
  playgroundMode: "js-driven",
  intensity: "low",
  input: "pointer-fine",
  performanceNotes: "Measure the target once per frame and use distance thresholds; avoid layout writes.",
  accessibilityNotes: "Do not hide required actions from keyboard users; reveal on focus-within too.",
  recommendedUseCases: ["Dense cards", "Admin tables", "Image lists"],
  codeSnippets: [
    {
      label: "CSS",
      language: "css",
      code: `.proximity-item .actions {
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 180ms ease, transform 180ms ease;
}

.proximity-item:is(:hover, :focus-within) .actions,
.proximity-item[data-near="true"] .actions {
  opacity: 1;
  transform: translateY(0);
}`,
    },
  ],
};
