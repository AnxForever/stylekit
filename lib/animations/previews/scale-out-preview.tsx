"use client";

import { useState } from "react";
import { PreviewContainer } from "./_shared";

export function ScaleOutPreview() {
  const [key, setKey] = useState(0);
  const [phase, setPhase] = useState<"visible" | "exiting">("visible");

  function trigger() {
    setPhase("exiting");
    setTimeout(() => {
      setPhase("visible");
      setKey((k) => k + 1);
    }, 400);
  }

  return (
    <PreviewContainer bg="light">
      <style>{`
        @keyframes scaleOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.85); }
        }
        .animate-scale-out {
          animation: scaleOut 300ms cubic-bezier(0.4, 0, 1, 1) forwards;
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
        className={`rounded-xl border border-border bg-background p-5 shadow-lg ${phase === "exiting" ? "animate-scale-out" : ""}`}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-500/20" />
          <div>
            <p className="text-sm font-medium text-foreground">Popup</p>
            <p className="text-xs text-muted-foreground">Will scale out</p>
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
}
