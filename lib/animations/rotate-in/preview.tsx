"use client";

import { PreviewContainer, ReplayButton, useReplay } from "../previews/_shared";

export function RotateInPreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="light">
      <ReplayButton onReplay={replay} />
      <style>{`
        @keyframes rotate-in {
          from { opacity: 0; transform: rotate(-180deg) scale(0.6); }
          to { opacity: 1; transform: rotate(0) scale(1); }
        }
      `}</style>
      <div className="flex gap-6 items-center">
        {[0, 0.15, 0.3].map((d) => (
          <div
            key={`${key}-${d}`}
            className="w-12 h-12 bg-gradient-to-br from-amber-300 to-orange-400 shadow-md"
            style={{
              animation: `rotate-in 500ms cubic-bezier(0.16, 1, 0.3, 1) ${d}s both`,
              borderRadius: d === 0.15 ? "50%" : "4px",
            }}
          />
        ))}
      </div>
    </PreviewContainer>
  );
}
