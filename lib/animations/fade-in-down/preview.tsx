"use client";

import { PreviewContainer, ReplayButton, useReplay } from "../previews/_shared";

export function FadeInDownPreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="light">
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <ReplayButton onReplay={replay} />
      <div
        key={key}
        className="animate-fade-in-down w-full max-w-sm rounded-lg border border-border bg-background p-4 shadow-md"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Notification</span>
          <span className="text-xs text-muted-foreground">just now</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Your deployment is live and ready to share.
        </p>
      </div>
    </PreviewContainer>
  );
}
