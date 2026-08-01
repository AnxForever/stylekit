"use client";

import { PreviewContainer } from "../previews/_shared";

export function BorderBeamPreview() {
  return (
    <PreviewContainer bg="dark">
      <style>{`
        @property --sk-beam-angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
        .sk-border-beam {
          position: relative;
          border-radius: 16px;
        }
        .sk-border-beam::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: conic-gradient(
            from var(--sk-beam-angle),
            transparent 0deg 300deg,
            rgba(124, 58, 237, 0.9) 330deg,
            rgba(56, 189, 248, 1) 355deg,
            transparent 360deg
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          animation: sk-beam-rotate 4s linear infinite;
          pointer-events: none;
        }
        @keyframes sk-beam-rotate {
          to { --sk-beam-angle: 360deg; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sk-border-beam::before { animation: none; }
        }
      `}</style>
      <div className="sk-border-beam">
        <div className="rounded-2xl border border-white/10 bg-zinc-900 px-10 py-8 text-center">
          <p className="text-sm font-medium text-white">Ask me anything…</p>
          <p className="mt-1 text-xs text-zinc-500">The beam keeps orbiting the border</p>
        </div>
      </div>
    </PreviewContainer>
  );
}
