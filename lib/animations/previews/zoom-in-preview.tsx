"use client";

import { PreviewContainer, ReplayButton, useReplay } from "./_shared";

export function ZoomInPreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="light">
      <ReplayButton onReplay={replay} />
      <style>{`
        @keyframes sk-zoom-in {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div
        key={key}
        className="w-32 h-20 bg-gradient-to-br from-sky-400 to-indigo-500 shadow-lg flex items-center justify-center"
        style={{ animation: "sk-zoom-in 500ms cubic-bezier(0.16, 1, 0.3, 1) both" }}
      >
        <span className="text-white text-xs uppercase tracking-wider">Zoom</span>
      </div>
    </PreviewContainer>
  );
}
