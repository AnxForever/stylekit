"use client";

import { useRef, useState } from "react";
import { PreviewContainer } from "../previews/_shared";

export function SpotlightCardPreview() {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <PreviewContainer bg="dark">
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        className="relative overflow-hidden border border-white/10 bg-white/5 p-6 w-full max-w-sm cursor-default"
      >
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.12), transparent 40%)`,
          }}
        />
        <div className="relative z-10">
          <h3 className="text-sm font-semibold text-white mb-1">Pro Plan</h3>
          <p className="text-xs text-zinc-400 mb-3">Move your mouse over this card</p>
          <div className="h-px bg-white/10 mb-3" />
          <ul className="space-y-1.5 text-xs text-zinc-400">
            <li>Unlimited projects</li>
            <li>Priority support</li>
            <li>Custom domains</li>
          </ul>
        </div>
      </div>
    </PreviewContainer>
  );
}
