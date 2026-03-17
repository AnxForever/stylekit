"use client";

import { PreviewContainer } from "../previews/_shared";

export function ParallaxFloatPreview() {
  return (
    <PreviewContainer bg="gradient">
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-mid {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
      `}</style>
      <div className="relative w-full max-w-xs h-[160px]">
        <div
          className="absolute top-2 left-6 w-16 h-16 rounded-full bg-purple-300/40 dark:bg-purple-600/30 backdrop-blur-sm"
          style={{ animation: "float-slow 4s ease-in-out infinite" }}
        />
        <div
          className="absolute top-10 right-8 w-10 h-10 rounded-lg bg-blue-300/50 dark:bg-blue-600/30 backdrop-blur-sm"
          style={{ animation: "float-mid 3s ease-in-out infinite 0.5s" }}
        />
        <div
          className="absolute bottom-4 left-1/3 w-12 h-12 rounded-full bg-pink-300/40 dark:bg-pink-600/30 backdrop-blur-sm"
          style={{ animation: "float-fast 3.5s ease-in-out infinite 1s" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-foreground/70">Parallax Layers</span>
        </div>
      </div>
    </PreviewContainer>
  );
}
