"use client";

import { PreviewContainer } from "../previews/_shared";

export function SkeletonPulsePreview() {
  return (
    <PreviewContainer bg="light">
      <style>{`
        @keyframes skeletonPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
        .animate-skeleton-pulse {
          animation: skeletonPulse 1.5s ease-in-out infinite;
        }
      `}</style>
      <div className="w-full max-w-sm rounded-lg border border-border bg-background p-6">
        <div className="flex items-start gap-4">
          <div className="animate-skeleton-pulse h-12 w-12 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="flex-1 space-y-3 pt-1">
            <div className="animate-skeleton-pulse h-3 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="animate-skeleton-pulse h-3 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="animate-skeleton-pulse h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
}
