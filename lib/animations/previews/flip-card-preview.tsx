"use client";

import { PreviewContainer } from "./_shared";

export function FlipCardPreview() {
  return (
    <PreviewContainer bg="light">
      <style>{`
        .flip-container { perspective: 600px; }
        .flip-inner {
          position: relative;
          width: 120px;
          height: 80px;
          transition: transform 0.6s ease-in-out;
          transform-style: preserve-3d;
        }
        .flip-container:hover .flip-inner { transform: rotateY(180deg); }
        .flip-front, .flip-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .flip-back { transform: rotateY(180deg); }
      `}</style>
      <div className="flex flex-col items-center gap-3">
        <div className="flip-container cursor-pointer">
          <div className="flip-inner">
            <div className="flip-front border border-border bg-gradient-to-br from-violet-100 to-purple-200 dark:from-violet-500/20 dark:to-purple-500/15">
              <span className="text-xs text-violet-700 dark:text-violet-300 uppercase tracking-wider">Front</span>
            </div>
            <div className="flip-back border border-border bg-gradient-to-br from-indigo-500 to-purple-600">
              <span className="text-xs text-white uppercase tracking-wider">Back</span>
            </div>
          </div>
        </div>
        <span className="text-[10px] text-muted uppercase tracking-wider">Hover to flip</span>
      </div>
    </PreviewContainer>
  );
}
