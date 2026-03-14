"use client";

import { PreviewContainer, ReplayButton, useReplay } from "./_shared";

export function SlideInRightPreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="light">
      <ReplayButton onReplay={replay} />
      <style>{`
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      <div className="space-y-3 w-full max-w-xs">
        {[0, 0.1, 0.2].map((d) => (
          <div
            key={`${key}-${d}`}
            className="h-8 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-500/20 dark:to-blue-500/15 border border-border"
            style={{
              animation: `slide-in-right 500ms cubic-bezier(0.16, 1, 0.3, 1) ${d}s both`,
            }}
          />
        ))}
      </div>
    </PreviewContainer>
  );
}
