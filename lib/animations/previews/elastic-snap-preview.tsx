"use client";

import { useState } from "react";
import { PreviewContainer } from "./_shared";

export function ElasticSnapPreview() {
  const [snapping, setSnapping] = useState(false);

  function trigger() {
    setSnapping(true);
    setTimeout(() => setSnapping(false), 800);
  }

  return (
    <PreviewContainer bg="gradient">
      <style>{`
        @keyframes elasticSnap {
          0% { transform: scaleX(1); }
          30% { transform: scaleX(1.25); }
          50% { transform: scaleX(0.9); }
          70% { transform: scaleX(1.08); }
          85% { transform: scaleX(0.97); }
          100% { transform: scaleX(1); }
        }
        .animate-elastic-snap {
          animation: elasticSnap 800ms cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
        }
      `}</style>
      <button
        onClick={trigger}
        className={`rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background shadow-lg transition-colors hover:opacity-90 ${snapping ? "animate-elastic-snap" : ""}`}
      >
        Click to snap
      </button>
    </PreviewContainer>
  );
}
