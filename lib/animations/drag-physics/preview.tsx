"use client";

import { PreviewContainer } from "../previews/_shared";

export function DragPhysicsPreview() {
  return (
    <PreviewContainer bg="light">
      <div className="relative h-36 w-64 border border-zinc-200 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute left-24 top-12 h-14 w-14 rotate-6 border border-zinc-950 bg-white shadow-[8px_8px_0_rgba(15,23,42,0.14)]" />
        <div className="absolute left-[7.2rem] top-[3.9rem] h-2 w-2 rounded-full bg-zinc-950" />
      </div>
    </PreviewContainer>
  );
}
