"use client";

import { PreviewContainer, ReplayButton, useReplay } from "../previews/_shared";

const TEXT = "Hello, World!";

export function TypewriterPreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="dark">
      <style>{`
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: ${TEXT.length}ch;
          }
        }
        @keyframes blink {
          0%, 100% {
            border-color: transparent;
          }
          50% {
            border-color: currentColor;
          }
        }
        .animate-typewriter {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid currentColor;
          width: 0;
          animation:
            typing 1.5s steps(${TEXT.length}) 0.3s forwards,
            blink 0.75s step-end infinite;
        }
      `}</style>
      <ReplayButton onReplay={replay} />
      <div className="w-full max-w-sm rounded-lg border border-zinc-700 bg-zinc-950 p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block h-3 w-3 rounded-full bg-red-500" />
          <span className="inline-block h-3 w-3 rounded-full bg-yellow-500" />
          <span className="inline-block h-3 w-3 rounded-full bg-green-500" />
        </div>
        <pre className="font-mono text-sm text-green-400">
          <span className="text-zinc-500">{"$ "}</span>
          <span key={key} className="animate-typewriter">
            {TEXT}
          </span>
        </pre>
      </div>
    </PreviewContainer>
  );
}
