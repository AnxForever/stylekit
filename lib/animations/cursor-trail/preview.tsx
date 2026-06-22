"use client";

import { PreviewContainer } from "../previews/_shared";

export function CursorTrailPreview() {
  return (
    <PreviewContainer bg="dark">
      <div className="relative h-32 w-64 overflow-hidden border border-white/10 bg-zinc-950">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <span
            key={index}
            className="absolute rounded-full bg-cyan-300"
            style={{
              left: `${72 + index * 20}px`,
              top: `${68 - Math.sin(index) * 16}px`,
              width: `${12 - index}px`,
              height: `${12 - index}px`,
              opacity: 1 - index * 0.13,
            }}
          />
        ))}
      </div>
    </PreviewContainer>
  );
}
