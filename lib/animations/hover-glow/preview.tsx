"use client";

import { PreviewContainer } from "../previews/_shared";

export function HoverGlowPreview() {
  return (
    <PreviewContainer bg="dark">
      <div className="flex gap-4">
        <button className="rounded-lg border border-indigo-500/30 bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(99,102,241,0.4),0_0_30px_rgba(99,102,241,0.2),0_0_45px_rgba(99,102,241,0.1)]">
          Hover me
        </button>
        <button className="rounded-lg border border-pink-500/30 bg-pink-600 px-6 py-3 text-sm font-medium text-white transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(236,72,153,0.4),0_0_30px_rgba(236,72,153,0.2),0_0_45px_rgba(236,72,153,0.1)]">
          Or me
        </button>
      </div>
    </PreviewContainer>
  );
}
