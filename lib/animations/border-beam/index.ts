import type { Animation } from "../types";

// Adapted from border-beam by Jakub Antalík (MIT)
// https://github.com/Jakubantalik/border-beam
export const borderBeam: Animation = {
  slug: "border-beam",
  name: "边框光束",
  nameEn: "Border Beam",
  description:
    "一束高光沿元素边框持续环绕巡游，为卡片、按钮或输入框增加科技感的呼吸边界。改编自 Jakub Antalík 的 border-beam（MIT）。",
  descriptionEn:
    "A glowing beam travels continuously around the element's border, giving cards, buttons, and inputs a living, techy edge. Adapted from border-beam by Jakub Antalík (MIT).",
  category: "background",
  tags: ["border", "glow", "beam", "conic-gradient", "continuous"],
  trigger: "continuous",
  difficulty: "intermediate",
  duration: "4s",
  easing: "linear",
  cssProperties: ["background", "mask", "custom-property"],
  isGPUAccelerated: false,
  previewBg: "dark",
  keywords: ["边框光束", "border beam", "glow border", "旋转光", "conic gradient", "animated border"],
  useCases: ["高亮当前激活的卡片或方案", "AI 输入框 / 搜索框的待命状态", "营销页的重点内容强调"],
  relatedAnimations: ["border-trace", "hover-glow", "background-gradient-shift"],
  recommendedStyles: ["dark-mode", "cyberpunk-neon", "linear-style"],
  performanceNotes:
    "动画驱动的是注册过 @property 的自定义角度变量，逐帧重绘 conic-gradient；面积很大的元素建议降低刷新频率或改用 hover 触发。",
  accessibilityNotes: "纯装饰效果，建议在 prefers-reduced-motion 下暂停动画。",
  codeSnippets: [
    {
      label: "CSS",
      language: "css",
      code: `/* Adapted from border-beam by Jakub Antalík (MIT)
   https://github.com/Jakubantalik/border-beam */
@property --beam-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.border-beam {
  position: relative;
  border-radius: 16px;
}

.border-beam::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px; /* beam thickness */
  background: conic-gradient(
    from var(--beam-angle),
    transparent 0deg 300deg,
    rgba(124, 58, 237, 0.9) 330deg,
    rgba(56, 189, 248, 1) 355deg,
    transparent 360deg
  );
  /* keep only the ring: punch out the padding-box */
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  animation: beam-rotate 4s linear infinite;
  pointer-events: none;
}

@keyframes beam-rotate {
  to { --beam-angle: 360deg; }
}

@media (prefers-reduced-motion: reduce) {
  .border-beam::before { animation: none; }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* globals.css - Tailwind v4. The ring mask + @property still live in CSS. */
@property --beam-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

@utility border-beam {
  position: relative;
  border-radius: 1rem;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background: conic-gradient(
      from var(--beam-angle),
      transparent 0deg 300deg,
      theme(colors.violet.600 / 90%) 330deg,
      theme(colors.sky.400) 355deg,
      transparent 360deg
    );
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask-composite: exclude;
    animation: beam-rotate 4s linear infinite;
    pointer-events: none;
  }
}

@keyframes beam-rotate {
  to { --beam-angle: 360deg; }
}`,
    },
    {
      label: "React",
      language: "tsx",
      code: `// Adapted from border-beam by Jakub Antalík (MIT)
// Full component with presets: npm install border-beam
export function BorderBeam({ children }: { children: React.ReactNode }) {
  return <div className="border-beam">{children}</div>;
}

// Usage
<BorderBeam>
  <div className="rounded-2xl bg-zinc-900 p-8 text-white">
    Ask me anything…
  </div>
</BorderBeam>`,
    },
  ],
};
