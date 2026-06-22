"use client";

import { PreviewContainer } from "../previews/_shared";

export function ContextCursorPreview() {
  return (
    <PreviewContainer bg="dark">
      <div className="relative grid h-36 w-64 grid-cols-2 gap-2 border border-white/10 bg-zinc-950 p-3">
        <div className="border border-white/10 bg-white/5 p-3 text-xs text-zinc-300">Copy</div>
        <div className="border border-white/10 bg-white/5 p-3 text-xs text-zinc-300">Open</div>
        <div className="absolute left-32 top-16 rounded-full border border-cyan-300/40 bg-cyan-300 px-2 py-1 text-[10px] font-medium text-zinc-950 shadow-[0_0_24px_rgba(103,232,249,0.22)]">
          View
        </div>
      </div>
    </PreviewContainer>
  );
}
