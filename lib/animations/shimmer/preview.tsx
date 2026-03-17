"use client";

import { PreviewContainer } from "../previews/_shared";

export function ShimmerPreview() {
  return (
    <PreviewContainer bg="light">
      <style>{`
        @keyframes sk-shimmer {
          from { background-position: -200% 0; }
          to { background-position: 200% 0; }
        }
      `}</style>
      <div className="w-full max-w-xs space-y-3">
        {[1, 0.75, 0.5].map((w, i) => (
          <div
            key={i}
            className="h-4 rounded"
            style={{
              width: `${w * 100}%`,
              background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
              backgroundSize: "200% 100%",
              animation: "sk-shimmer 2s linear infinite",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </PreviewContainer>
  );
}
