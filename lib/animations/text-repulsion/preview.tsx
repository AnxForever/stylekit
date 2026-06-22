"use client";

import { PreviewContainer } from "../previews/_shared";

export function TextRepulsionPreview() {
  return (
    <PreviewContainer bg="light">
      <div className="flex items-center gap-1 text-4xl font-semibold tracking-normal text-zinc-950" aria-label="TYPE">
        {"TYPE".split("").map((char, index) => (
          <span
            key={char}
            className="inline-block transition-transform duration-200 group-hover:translate-y-0"
            style={{
              transform: `translate(${index % 2 === 0 ? -4 : 4}px, ${index === 1 ? -6 : 4}px)`,
            }}
            aria-hidden="true"
          >
            {char}
          </span>
        ))}
      </div>
    </PreviewContainer>
  );
}
