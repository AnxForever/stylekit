"use client";

import { useState, useCallback } from "react";
import { PreviewContainer } from "./_shared";

export function ShakePreview() {
  const [shaking, setShaking] = useState(false);

  const triggerShake = useCallback(() => {
    setShaking(false);
    requestAnimationFrame(() => setShaking(true));
  }, []);

  return (
    <PreviewContainer bg="light">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(-10px); }
          20% { transform: translateX(10px); }
          30% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          50% { transform: translateX(-6px); }
          60% { transform: translateX(4px); }
          70% { transform: translateX(-2px); }
        }
      `}</style>
      <div className="flex flex-col items-center gap-4">
        <div
          className="border-2 border-red-400 bg-red-50 dark:bg-red-900/20 px-6 py-3 text-sm text-red-600 dark:text-red-400"
          style={shaking ? { animation: "shake 500ms ease-in-out" } : undefined}
          onAnimationEnd={() => setShaking(false)}
        >
          Invalid input
        </div>
        <button
          type="button"
          onClick={triggerShake}
          className="px-4 py-2 text-xs border border-border text-muted hover:text-foreground hover:border-foreground transition-colors"
        >
          Trigger shake
        </button>
      </div>
    </PreviewContainer>
  );
}
