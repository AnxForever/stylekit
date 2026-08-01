"use client";

import { PreviewContainer, ReplayButton, useReplay } from "../previews/_shared";

export function HandwritingRevealPreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="light">
      <ReplayButton onReplay={replay} />
      <style>{`
        .sk-handwriting path {
          fill: none;
          stroke: currentColor;
          stroke-width: 3.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: sk-write 1.2s cubic-bezier(0.45, 0, 0.3, 1) forwards;
        }
        .sk-handwriting path:nth-child(2) { animation-delay: 0.9s; }
        .sk-handwriting path:nth-child(3) { animation-delay: 1.5s; }
        @keyframes sk-write {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sk-handwriting path { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>
      <svg
        key={key}
        className="sk-handwriting w-56 text-zinc-800 dark:text-zinc-100"
        viewBox="0 0 220 90"
        aria-label="hi!"
      >
        <path
          pathLength="1"
          d="M52 18 C50 34 48 52 48 68 M48 48 C56 38 68 38 71 47 C74 56 72 64 70 68"
        />
        <path pathLength="1" d="M100 44 C100 52 100 60 100 66 M100 28 C100 29 100 30 100 31" />
        <path pathLength="1" d="M132 20 C136 34 137 46 136 54 M137 66 C137 67 137 68 137 67" />
      </svg>
    </PreviewContainer>
  );
}
