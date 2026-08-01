"use client";

import { PreviewContainer, ReplayButton, useReplay } from "../previews/_shared";

export function HandDrawnAnnotationPreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="light">
      <ReplayButton onReplay={replay} />
      <style>{`
        .sk-annotate {
          position: relative;
          display: inline-block;
          border-radius: 3px;
          background: linear-gradient(rgba(255, 176, 0, 0.28) 0 0) left center / 0% 78% no-repeat;
          animation: sk-ann-sweep 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .sk-annotate-label {
          position: absolute;
          left: 58%;
          top: calc(100% + 30px);
          width: max-content;
          transform: rotate(-5deg) translateY(6px);
          font-family: var(--font-caveat, "Shantell Sans", cursive);
          font-size: 1rem;
          color: #b8751a;
          opacity: 0;
          animation: sk-ann-label 0.5s 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          pointer-events: none;
        }
        .sk-annotate-arrow {
          position: absolute;
          left: 42%;
          top: calc(100% - 2px);
          width: 44px;
          height: 36px;
          pointer-events: none;
        }
        .sk-annotate-arrow path {
          fill: none;
          stroke: #b8751a;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: sk-ann-arrow 0.45s 0.5s ease-out forwards;
        }
        @keyframes sk-ann-sweep { to { background-size: 100% 78%; } }
        @keyframes sk-ann-arrow { to { stroke-dashoffset: 0; } }
        @keyframes sk-ann-label { to { opacity: 0.9; transform: rotate(-5deg) translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          .sk-annotate, .sk-annotate-label, .sk-annotate-arrow path {
            animation-duration: 0.01ms;
            animation-delay: 0ms;
          }
        }
      `}</style>
      <p key={key} className="max-w-xs pb-16 text-base leading-relaxed text-zinc-800 dark:text-zinc-100">
        Ship the{" "}
        <span className="sk-annotate">
          hand-drawn annotation
          <svg className="sk-annotate-arrow" viewBox="0 0 46 38" aria-hidden="true">
            <path
              pathLength="1"
              d="M40 4 C30 16 20 22 8 26 M15 20 C12 23 9 25 8 26 C11 27 15 27 18 28"
            />
          </svg>
          <span className="sk-annotate-label">this one!</span>
        </span>{" "}
        in your changelog.
      </p>
    </PreviewContainer>
  );
}
