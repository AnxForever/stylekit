"use client";

import { PreviewContainer } from "./_shared";

export function MorphShapePreview() {
  return (
    <PreviewContainer bg="light">
      <style>{`
        @keyframes morph-shape {
          0%, 100% { border-radius: 40% 60% 70% 30% / 40% 30% 60% 70%; }
          25% { border-radius: 60% 40% 30% 70% / 60% 70% 40% 30%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          75% { border-radius: 50% 40% 60% 50% / 30% 50% 70% 50%; }
        }
      `}</style>
      <div
        className="w-28 h-28 bg-gradient-to-br from-teal-300 via-cyan-400 to-blue-500 shadow-lg"
        style={{
          animation: "morph-shape 8s ease-in-out infinite",
          borderRadius: "40% 60% 70% 30% / 40% 30% 60% 70%",
        }}
      />
    </PreviewContainer>
  );
}
