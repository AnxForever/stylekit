import type { Animation } from "../types";

// Technique demo inspired by tegaki by Gürkan Kurt (MIT), which converts any
// font into stroke-by-stroke handwriting animation.
// https://github.com/gkurt/tegaki
export const handwritingReveal: Animation = {
  slug: "handwriting-reveal",
  name: "手写描字",
  nameEn: "Handwriting Reveal",
  description:
    "文字像被钢笔一笔一划写出来：SVG 路径配合 stroke-dashoffset 从起笔描到收笔。灵感与生产级方案来自 gkurt 的 tegaki（MIT，可把任意字体转成手写动画）。",
  descriptionEn:
    "Text writes itself stroke by stroke, like a pen on paper: SVG paths animated with stroke-dashoffset from the first stroke to the last. Inspired by tegaki by Gürkan Kurt (MIT), which turns any font into handwriting animation.",
  category: "text",
  tags: ["handwriting", "svg", "stroke", "draw", "signature"],
  trigger: "on-mount",
  difficulty: "intermediate",
  duration: "2.4s",
  easing: "cubic-bezier(0.45, 0, 0.3, 1)",
  cssProperties: ["stroke-dashoffset", "opacity"],
  isGPUAccelerated: false,
  previewBg: "light",
  keywords: ["手写动画", "handwriting", "signature", "stroke draw", "写字", "tegaki"],
  useCases: ["品牌签名 / Logo 落款入场", "贺卡、邀请函的标题书写", "教学演示中的手写板效果"],
  relatedAnimations: ["typewriter", "underline-draw", "text-reveal"],
  recommendedStyles: ["hand-drawn", "ink-wash", "cottagecore"],
  performanceNotes:
    "stroke-dashoffset 动画只触发绘制，不触发布局；路径很多时可给每条路径设置 will-change: stroke-dashoffset 以外的属性并分批延迟。",
  accessibilityNotes:
    "为 SVG 提供 aria-label 或相邻的可读文本；prefers-reduced-motion 下直接显示完整文字。",
  codeSnippets: [
    {
      label: "CSS",
      language: "css",
      code: `/* Handwriting via SVG stroke drawing.
   For production any-font handwriting, see tegaki (MIT):
   https://github.com/gkurt/tegaki */
.handwriting path {
  fill: none;
  stroke: currentColor;
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  /* pathLength="1" on each <path> normalizes the dash math */
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: write 1.4s cubic-bezier(0.45, 0, 0.3, 1) forwards;
}

/* stagger the strokes so they draw in writing order */
.handwriting path:nth-child(2) { animation-delay: 1s; }

@keyframes write {
  to { stroke-dashoffset: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .handwriting path { animation: none; stroke-dashoffset: 0; }
}`,
    },
    {
      label: "SVG Markup",
      language: "tsx",
      code: `{/* pathLength="1" makes dasharray/dashoffset font-size independent */}
<svg className="handwriting" viewBox="0 0 220 80" aria-label="hi!">
  <path
    pathLength="1"
    d="M28 18 C26 34 24 50 24 62 M24 44 C34 36 44 38 46 46 C48 54 46 60 44 62 M70 40 C70 48 70 56 70 62 M70 26 C70 27 70 28 70 29"
  />
  <path pathLength="1" d="M96 22 C98 36 98 46 96 52 M96 62 C96 63 96 64 96 63" />
</svg>`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

// Draw each stroke in sequence
export function Handwriting({ paths }: { paths: string[] }) {
  return (
    <svg viewBox="0 0 220 80" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round">
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: i * 0.9, ease: [0.45, 0, 0.3, 1] }}
        />
      ))}
    </svg>
  );
}`,
    },
  ],
};
