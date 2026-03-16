"use client";

import { useState, useCallback, type MouseEvent } from "react";
import { PreviewContainer } from "./_shared";

const COLORS = ["#ff006e", "#fb5607", "#ffbe0b", "#8338ec", "#3a86ff", "#06d6a0"];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  dx: number;
  dy: number;
  spin: number;
  shape: "circle" | "rect";
}

export function ConfettiBurstPreview() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ox = e.clientX - rect.left;
    const oy = e.clientY - rect.top;

    const newParticles: Particle[] = Array.from({ length: 24 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 24 + (Math.random() - 0.5) * 0.6;
      const velocity = 50 + Math.random() * 80;
      return {
        id: Date.now() + i,
        x: ox,
        y: oy,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        dx: Math.cos(angle) * velocity,
        dy: Math.sin(angle) * velocity + 100,
        spin: Math.random() * 720 - 360,
        shape: Math.random() > 0.5 ? "circle" : "rect",
      };
    });

    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 1300);
  }, []);

  return (
    <PreviewContainer bg="light">
      <style>{`
        @keyframes confetti-demo {
          0% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
          100% { opacity: 0; transform: translate(var(--dx), var(--dy)) rotate(var(--spin)) scale(0.3); }
        }
      `}</style>
      <button
        onClick={handleClick}
        className="relative overflow-visible px-6 py-3 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 active:scale-95 transition-all duration-100"
      >
        Click me!
        {particles.map((p) => (
          <span
            key={p.id}
            className="pointer-events-none absolute"
            style={{
              left: p.x,
              top: p.y,
              width: 8,
              height: 8,
              borderRadius: p.shape === "circle" ? "50%" : "1px",
              background: p.color,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ["--dx" as any]: `${p.dx}px`,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ["--dy" as any]: `${p.dy}px`,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ["--spin" as any]: `${p.spin}deg`,
              animation: "confetti-demo 1.2s cubic-bezier(0, 0.9, 0.57, 1) forwards",
            }}
          />
        ))}
      </button>
    </PreviewContainer>
  );
}
