"use client";

import { PreviewContainer, ReplayButton, useReplay } from "./_shared";

export function FadeOutDownPreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="light">
      <ReplayButton onReplay={replay} />
      <style>{`
        @keyframes sk-fade-out-down {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(20px); }
        }
      `}</style>
      <div className="flex flex-col items-center gap-4">
        <div
          key={key}
          className="px-6 py-3 border border-border bg-background text-sm shadow-sm"
          style={{
            animation: "sk-fade-out-down 400ms cubic-bezier(0.4, 0, 1, 1) 1.5s both",
          }}
        >
          This element will fade out
        </div>
        <span className="text-[10px] text-muted uppercase tracking-wider">Plays after 1.5s delay</span>
      </div>
    </PreviewContainer>
  );
}
