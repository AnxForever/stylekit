"use client";

import { PreviewContainer, ReplayButton, useReplay } from "./_shared";

export function BounceInPreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="light">
      <ReplayButton onReplay={replay} />
      <style>{`
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div className="flex gap-4 items-end">
        {[0, 0.1, 0.2].map((d) => (
          <div
            key={`${key}-${d}`}
            className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 shadow-lg"
            style={{
              animation: `bounce-in 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${d}s both`,
            }}
          />
        ))}
      </div>
    </PreviewContainer>
  );
}
