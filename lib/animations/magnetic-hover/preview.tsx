"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { loadAnime, prefersReducedMotion, type AnimeAnimation } from "../anime-utils";
import { PreviewContainer } from "../previews/_shared";

export function MagneticHoverPreview() {
  const ref = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<AnimeAnimation | null>(null);

  useEffect(() => {
    return () => {
      animationRef.current?.revert?.();
    };
  }, []);

  const moveTo = async (x: number, y: number, duration = 180) => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    const { animate } = await loadAnime();
    if (ref.current !== element) return;

    animationRef.current?.cancel();
    animationRef.current = animate(element, {
      x,
      y,
      duration,
      ease: "out(3)",
    });
  };

  const handleMouse = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    void moveTo(x, y);
  };

  const reset = () => {
    void moveTo(0, 0, 420);
  };

  return (
    <PreviewContainer bg="light">
      <div className="flex gap-6 items-center">
        <button
          ref={ref}
          onMouseMove={handleMouse}
          onMouseLeave={reset}
          className="px-6 py-3 bg-foreground text-background text-sm font-medium will-change-transform"
        >
          Hover me
        </button>
        <span className="text-xs text-muted">Move cursor slowly</span>
      </div>
    </PreviewContainer>
  );
}
