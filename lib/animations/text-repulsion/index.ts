import type { Animation } from "../types";

export const textRepulsion: Animation = {
  slug: "text-repulsion",
  name: "文字排斥",
  nameEn: "Text Repulsion",
  description: "文字字符在鼠标靠近时轻微避让，适合标题和品牌字标的演示效果。",
  descriptionEn: "Characters move away slightly as the pointer approaches, useful for headings and wordmark demos.",
  category: "pointer",
  tags: ["text", "repulsion", "pointer", "playful"],
  trigger: "continuous",
  difficulty: "advanced",
  duration: "continuous",
  easing: "spring",
  cssProperties: ["transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["text repulsion", "interactive typography", "cursor typography"],
  useCases: ["Hero headlines", "Logo demos", "Creative typography"],
  relatedAnimations: ["text-scramble", "text-reveal"],
  recommendedStyles: ["editorial", "brutalist-web", "op-art"],
  playgroundMode: "js-driven",
  intensity: "high",
  input: "pointer-fine",
  performanceNotes: "Split text once, cache character bounds, and batch transform writes in requestAnimationFrame.",
  accessibilityNotes: "Keep the original text available to screen readers and disable for reduced motion.",
  recommendedUseCases: ["Hero titles", "Brand moments", "Typography studies"],
  codeSnippets: [
    {
      label: "Implementation Notes",
      language: "tsx",
      code: `// Render each character in a span with aria-hidden="true".
// Keep a visually hidden copy of the full text for screen readers.
// On pointermove, calculate distance to each span center and write:
// span.style.transform = \`translate3d(\${dx}px, \${dy}px, 0)\`;`,
    },
  ],
};
