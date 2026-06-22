import type { Animation } from "../types";

export const cursorTrail: Animation = {
  slug: "cursor-trail",
  name: "指针轨迹",
  nameEn: "Cursor Trail",
  description: "多个小点延迟追随鼠标，形成短暂轨迹，适合演示页和创意页面。",
  descriptionEn: "Small dots follow the pointer with staggered delay to form a short motion trail.",
  category: "pointer",
  tags: ["cursor", "trail", "motion", "follow"],
  trigger: "continuous",
  difficulty: "advanced",
  duration: "continuous",
  easing: "lerp",
  cssProperties: ["transform", "opacity"],
  isGPUAccelerated: true,
  previewBg: "dark",
  keywords: ["cursor trail", "motion trail", "pointer dots", "lerp cursor"],
  useCases: ["Creative demos", "Portfolio hero sections", "Interactive experiments"],
  relatedAnimations: ["cursor-aura"],
  recommendedStyles: ["cyberpunk-neon", "generative-art", "neon-tokyo"],
  playgroundMode: "js-driven",
  intensity: "high",
  input: "pointer-fine",
  performanceNotes: "Use a fixed number of pooled dots and lerp positions in one animation loop.",
  accessibilityNotes: "Disable on regular app screens, reduced motion, and any text-heavy workflow.",
  recommendedUseCases: ["Creative labs", "Campaign microsites", "Game-like demos"],
  codeSnippets: [
    {
      label: "CSS",
      language: "css",
      code: `.trail-dot {
  position: fixed;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  pointer-events: none;
  background: currentColor;
  translate: -50% -50%;
  will-change: transform;
}`,
    },
    {
      label: "React",
      language: "tsx",
      code: `// Keep dot positions in refs, not React state.
// In requestAnimationFrame:
// dot.x += (pointer.x - dot.x) * dot.speed;
// dot.y += (pointer.y - dot.y) * dot.speed;
// node.style.transform = \`translate3d(\${dot.x}px,\${dot.y}px,0)\`;`,
    },
  ],
};
