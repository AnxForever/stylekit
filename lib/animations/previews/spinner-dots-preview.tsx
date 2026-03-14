"use client";

import { PreviewContainer } from "./_shared";

export function SpinnerDotsPreview() {
  return (
    <PreviewContainer bg="light">
      <style>{`
        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div className="flex flex-col items-center gap-6">
        {/* Dark variant */}
        <div className="flex items-center gap-4">
          <div className="inline-flex gap-1">
            {["-0.32s", "-0.16s", "0s"].map((delay) => (
              <span
                key={delay}
                className="w-2.5 h-2.5 rounded-full bg-zinc-800 dark:bg-zinc-200"
                style={{ animation: `dotBounce 1.4s ease-in-out ${delay} infinite both` }}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">Loading...</span>
        </div>

        {/* Colored variant */}
        <div className="inline-flex gap-1">
          {[
            { delay: "-0.32s", color: "bg-blue-500" },
            { delay: "-0.16s", color: "bg-purple-500" },
            { delay: "0s", color: "bg-pink-500" },
          ].map(({ delay, color }) => (
            <span
              key={delay}
              className={`w-2.5 h-2.5 rounded-full ${color}`}
              style={{ animation: `dotBounce 1.4s ease-in-out ${delay} infinite both` }}
            />
          ))}
        </div>
      </div>
    </PreviewContainer>
  );
}
