"use client";

import { PreviewContainer, ReplayButton, useReplay } from "./_shared";

export function TextRevealPreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="dark">
      <style>{`
        @keyframes textReveal {
          from {
            clip-path: inset(100% 0 0 0);
            transform: translateY(12px);
            opacity: 0;
          }
          to {
            clip-path: inset(0 0 0 0);
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-text-reveal {
          animation: textReveal 800ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
      <ReplayButton onReplay={replay} />
      <div key={key} className="space-y-1 text-center">
        <div
          className="animate-text-reveal text-2xl font-bold tracking-tight text-white"
          style={{ animationDelay: "0ms" }}
        >
          Beautiful
        </div>
        <div
          className="animate-text-reveal text-2xl font-bold tracking-tight text-white"
          style={{ animationDelay: "120ms" }}
        >
          Text Reveal
        </div>
        <div
          className="animate-text-reveal text-sm text-zinc-400"
          style={{ animationDelay: "240ms" }}
        >
          Line by line entrance
        </div>
      </div>
    </PreviewContainer>
  );
}
