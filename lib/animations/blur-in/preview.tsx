"use client";

import { PreviewContainer, ReplayButton, useReplay } from "../previews/_shared";

export function BlurInPreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="gradient">
      <style>{`
        @keyframes blurIn {
          from { opacity: 0; filter: blur(10px); }
          to { opacity: 1; filter: blur(0px); }
        }
        .animate-blur-in {
          animation: blurIn 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <ReplayButton onReplay={replay} />
      <div
        key={key}
        className="animate-blur-in w-full max-w-sm rounded-xl border border-border bg-background/80 backdrop-blur-sm p-6 shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">Focus Effect</h3>
            <p className="text-xs text-muted-foreground">From blur to sharp</p>
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
}
