"use client";

import { useState } from "react";
import { PreviewContainer } from "../previews/_shared";

export function SlideOutRightPreview() {
  const [key, setKey] = useState(0);
  const [phase, setPhase] = useState<"visible" | "exiting">("visible");

  function trigger() {
    setPhase("exiting");
    setTimeout(() => {
      setPhase("visible");
      setKey((k) => k + 1);
    }, 500);
  }

  return (
    <PreviewContainer bg="light">
      <style>{`
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(100%); }
        }
        .animate-slide-out-right {
          animation: slideOutRight 400ms cubic-bezier(0.4, 0, 1, 1) forwards;
        }
      `}</style>
      <button
        onClick={trigger}
        className="absolute top-3 right-3 px-2 py-1 text-xs border border-border bg-background/80 backdrop-blur-sm hover:bg-foreground hover:text-background transition-colors"
      >
        Trigger
      </button>
      <div
        key={key}
        className={`w-full max-w-xs rounded-lg border border-border bg-background p-4 shadow-lg ${phase === "exiting" ? "animate-slide-out-right" : ""}`}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Side Panel</span>
          <span className="text-xs text-muted-foreground">Swipe right</span>
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-2 w-full rounded-full bg-muted" />
          <div className="h-2 w-3/4 rounded-full bg-muted" />
        </div>
      </div>
    </PreviewContainer>
  );
}
