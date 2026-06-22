"use client";

import { PreviewContainer } from "../previews/_shared";

export function CursorAuraPreview() {
  return (
    <PreviewContainer bg="dark">
      <div className="relative h-32 w-64 overflow-hidden border border-white/10 bg-white/5">
        <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-cyan-300/15 shadow-[0_0_32px_rgba(103,232,249,0.22)]" />
        <div className="absolute left-[46%] top-[44%] h-1.5 w-1.5 rounded-full bg-white" />
        <p className="absolute bottom-4 left-4 text-xs text-zinc-400">Soft aura, native cursor preserved</p>
      </div>
    </PreviewContainer>
  );
}
