import type { Animation } from "../types";

// Annotation visual language adapted from neat-annotations by Maxim Syabro
// (MIT); this entry adds the draw-in choreography for the mark, arrow, and
// handwritten label. https://github.com/syabro/neat-annotations
export const handDrawnAnnotation: Animation = {
  slug: "hand-drawn-annotation",
  name: "手绘批注划入",
  nameEn: "Hand-Drawn Annotation",
  description:
    "荧光笔高亮扫过文字，手绘箭头描出，倾斜的手写标签浮现——三段式批注入场。批注视觉语言改编自 syabro 的 neat-annotations（MIT），本条目为其加入了划入动画编排。",
  descriptionEn:
    "A highlighter sweeps across the text, a hand-drawn arrow sketches in, then a tilted handwritten label fades up - a three-beat annotation entrance. Annotation visual language adapted from neat-annotations by Maxim Syabro (MIT); this entry adds the draw-in choreography.",
  category: "text",
  tags: ["annotation", "highlight", "hand-drawn", "arrow", "marker"],
  trigger: "on-scroll",
  difficulty: "intermediate",
  duration: "1.6s",
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  cssProperties: ["background-size", "stroke-dashoffset", "opacity", "transform"],
  isGPUAccelerated: false,
  previewBg: "light",
  keywords: ["批注", "annotation", "highlight", "手绘箭头", "marker", "标注"],
  useCases: ["教程 / 文档中强调关键术语", "落地页给卖点补充旁白式注释", "changelog 里圈出新特性"],
  relatedAnimations: ["underline-draw", "handwriting-reveal", "text-reveal"],
  recommendedStyles: ["hand-drawn", "sketch-style", "notion-style"],
  performanceNotes:
    "高亮扫过用 background-size 动画（触发绘制），箭头用 SVG stroke；两者面积都很小，成本可忽略。",
  accessibilityNotes:
    "标签文本用 data-note 承载时对读屏不可见，重要信息请同时提供正文文本；reduced-motion 下直接显示完成态。",
  codeSnippets: [
    {
      label: "CSS",
      language: "css",
      code: `/* Annotation look adapted from neat-annotations (MIT)
   https://github.com/syabro/neat-annotations
   - static version there; draw-in choreography added here. */
.annotate {
  position: relative;
  display: inline-block;
  /* highlighter mark sweeps in */
  background: linear-gradient(color-mix(in oklch, #ffb000 24%, transparent) 0 0)
    left center / 0% 78% no-repeat;
  border-radius: 3px;
  animation: ann-sweep 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* tilted handwritten label */
.annotate::after {
  content: attr(data-note);
  position: absolute;
  left: 60%;
  top: calc(100% + 26px);
  width: max-content;
  max-width: 150px;
  transform: rotate(-4deg) translateY(6px);
  font-family: "Shantell Sans", cursive;
  font-size: 0.95rem;
  color: #b8751a;
  opacity: 0;
  animation: ann-label 0.5s 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  pointer-events: none;
}

/* hand-drawn connector arrow (inline SVG sibling) */
.annotate-arrow path {
  fill: none;
  stroke: #b8751a;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: ann-arrow 0.45s 0.5s ease-out forwards;
}

@keyframes ann-sweep { to { background-size: 100% 78%; } }
@keyframes ann-arrow { to { stroke-dashoffset: 0; } }
@keyframes ann-label { to { opacity: 0.9; transform: rotate(-4deg) translateY(0); } }

@media (prefers-reduced-motion: reduce) {
  .annotate, .annotate::after, .annotate-arrow path {
    animation-duration: 0.01ms;
    animation-delay: 0ms;
  }
}`,
    },
    {
      label: "HTML",
      language: "tsx",
      code: `{/* the label rides ::after via data-note; arrow is a tiny SVG overlay */}
<p>
  Ship the{" "}
  <span className="annotate" data-note="this one!">
    hand-drawn annotation
    <svg className="annotate-arrow" viewBox="0 0 46 38" aria-hidden="true"
         style={{ position: "absolute", left: "45%", top: "100%", width: 46, height: 38 }}>
      <path pathLength="1" d="M40 4 C30 14 20 20 8 24 M14 18 C11 21 9 24 8 24 C11 25 14 25 17 26" />
    </svg>
  </span>{" "}
  in your next changelog.
</p>`,
    },
    {
      label: "Scroll Trigger",
      language: "tsx",
      code: `// Play the annotation only when it scrolls into view
import { useEffect, useRef, useState } from "react";

export function AnnotateOnScroll(props: { note: string; children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setSeen(true),
      { threshold: 0.6 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} data-note={props.note} className={seen ? "annotate" : undefined}>
      {props.children}
    </span>
  );
}`,
    },
  ],
};
