"use client";

import { PreviewContainer, ReplayButton, useReplay } from "./_shared";

export function SlideInLeftPreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="light">
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-left {
          animation: slideInLeft 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <ReplayButton onReplay={replay} />
      <div
        key={key}
        className="animate-slide-in-left w-48 rounded-lg border border-border bg-background p-4 shadow-lg"
      >
        <div className="space-y-3">
          <div className="h-2 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-2 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-2 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="mt-4 h-8 w-full rounded bg-zinc-900 dark:bg-zinc-100" />
        </div>
      </div>
    </PreviewContainer>
  );
}
