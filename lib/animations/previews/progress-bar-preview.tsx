"use client";

import { PreviewContainer, ReplayButton, useReplay } from "./_shared";

export function ProgressBarPreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="light">
      <style>{`
        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes progressShimmer {
          from { background-position: -200% 0; }
          to { background-position: 200% 0; }
        }
        .animate-progress-fill {
          animation:
            progressFill 2s ease-in-out both,
            progressShimmer 1.5s linear infinite;
          background: linear-gradient(90deg, #6366f1, #818cf8, #6366f1);
          background-size: 200% 100%;
        }
      `}</style>
      <ReplayButton onReplay={replay} />
      <div className="w-full max-w-sm space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Uploading...</span>
          <span>100%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div key={key} className="animate-progress-fill h-full rounded-full" />
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            key={`${key}-2`}
            className="animate-progress-fill h-full rounded-full"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </PreviewContainer>
  );
}
