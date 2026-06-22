"use client";

import { PreviewContainer } from "../previews/_shared";

export function ParallaxLayersPreview() {
  return (
    <PreviewContainer bg="gradient">
      <div className="relative h-36 w-64 overflow-hidden border border-white/20 bg-zinc-950">
        <div className="absolute left-8 top-8 h-20 w-20 translate-x-[-8px] rounded-full bg-cyan-300/40 blur-sm" />
        <div className="absolute left-24 top-5 h-24 w-28 translate-x-[6px] border border-white/20 bg-white/10" />
        <div className="absolute bottom-6 right-8 h-14 w-24 translate-x-[14px] bg-orange-300/80" />
      </div>
    </PreviewContainer>
  );
}
