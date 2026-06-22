"use client";

import { PreviewContainer } from "../previews/_shared";

export function ImageDistortionPreview() {
  return (
    <PreviewContainer bg="dark">
      <div className="relative h-36 w-56 overflow-hidden border border-white/10 bg-[linear-gradient(135deg,#0f172a,#0891b2_42%,#f97316)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_42%,rgba(255,255,255,0.45),transparent_18%),linear-gradient(120deg,transparent_0_42%,rgba(255,255,255,0.22)_43%_48%,transparent_49%)] blur-[0.3px]" />
        <div className="absolute left-20 top-8 h-16 w-20 rounded-[45%] border border-white/40 bg-white/10 backdrop-blur-[2px]" />
      </div>
    </PreviewContainer>
  );
}
