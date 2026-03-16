"use client";

import { useRef, type MouseEvent } from "react";
import { PreviewContainer } from "./_shared";

export function Tilt3dPreview() {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${-y * 15}deg) rotateY(${x * 15}deg) scale3d(1.03, 1.03, 1.03)`;
    const shine = card.querySelector<HTMLDivElement>("[data-shine]");
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.2), transparent 60%)`;
      shine.style.opacity = "1";
    }
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    const shine = card.querySelector<HTMLDivElement>("[data-shine]");
    if (shine) shine.style.opacity = "0";
  }

  return (
    <PreviewContainer bg="dark">
      <div style={{ perspective: 1000 }}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-56 rounded-xl border border-zinc-700 bg-zinc-800 p-6 transition-transform duration-150 ease-out"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            data-shine=""
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-150"
          />
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Hover me</p>
          <p className="text-lg font-semibold text-white mb-1">3D Tilt Card</p>
          <p className="text-sm text-zinc-400">Move your cursor over this card to see the depth effect.</p>
        </div>
      </div>
    </PreviewContainer>
  );
}
