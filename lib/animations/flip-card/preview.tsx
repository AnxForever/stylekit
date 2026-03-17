"use client";

import { PreviewContainer } from "../previews/_shared";
import { useFlipCard } from "./use-flip-card";

export function FlipCardPreview() {
  const { toggle, containerStyle, innerStyle, frontStyle, backStyle } =
    useFlipCard({ duration: 600, perspective: 600 });

  return (
    <PreviewContainer bg="light">
      <div className="flex flex-col items-center gap-3">
        <div
          style={{ ...containerStyle, width: 120, height: 80 }}
          onMouseEnter={toggle}
          onMouseLeave={toggle}
          className="cursor-pointer"
        >
          <div style={innerStyle}>
            <div
              style={frontStyle}
              className="flex items-center justify-center border border-border bg-gradient-to-br from-violet-100 to-purple-200 dark:from-violet-500/20 dark:to-purple-500/15 rounded-xl"
            >
              <span className="text-xs text-violet-700 dark:text-violet-300 uppercase tracking-wider">
                Front
              </span>
            </div>
            <div
              style={backStyle}
              className="flex items-center justify-center border border-border bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl"
            >
              <span className="text-xs text-white uppercase tracking-wider">
                Back
              </span>
            </div>
          </div>
        </div>
        <span className="text-[10px] text-muted uppercase tracking-wider">
          Hover to flip
        </span>
      </div>
    </PreviewContainer>
  );
}

export { useFlipCard } from "./use-flip-card";
