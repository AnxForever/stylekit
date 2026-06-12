"use client";

import { useEffect, useRef } from "react";
import { loadAnime, prefersReducedMotion, type AnimeAnimation } from "../anime-utils";
import { PreviewContainer } from "../previews/_shared";

export function ElasticSnapPreview() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<AnimeAnimation | null>(null);

  useEffect(() => {
    return () => {
      animationRef.current?.cancel();
    };
  }, []);

  const trigger = async () => {
    const button = buttonRef.current;
    if (!button || prefersReducedMotion()) return;

    const { animate } = await loadAnime();
    if (buttonRef.current !== button) return;

    animationRef.current?.cancel();
    button.style.transform = "";

    const animation = animate(button, {
      scaleX: [1, 1.25, 0.9, 1.08, 0.97, 1],
      scaleY: [1, 0.9, 1.08, 0.96, 1.02, 1],
      duration: 800,
      ease: "outElastic(1, .55)",
      onComplete: () => {
        if (animationRef.current === animation) {
          animationRef.current = null;
        }
      },
    });

    animationRef.current = animation;
  };

  return (
    <PreviewContainer bg="gradient">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => void trigger()}
        className="rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background shadow-lg transition-colors hover:opacity-90 will-change-transform"
      >
        Click to snap
      </button>
    </PreviewContainer>
  );
}
