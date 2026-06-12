"use client";

import { useEffect, useRef } from "react";
import { loadAnime, prefersReducedMotion, type AnimeAnimation } from "../anime-utils";
import { PreviewContainer } from "../previews/_shared";

export function ShakePreview() {
  const targetRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimeAnimation | null>(null);

  useEffect(() => {
    return () => {
      animationRef.current?.cancel();
    };
  }, []);

  const triggerShake = async () => {
    const target = targetRef.current;
    if (!target || prefersReducedMotion()) return;

    const { animate } = await loadAnime();
    if (targetRef.current !== target) return;

    animationRef.current?.cancel();
    target.style.transform = "";

    const animation = animate(target, {
      x: [0, -10, 10, -8, 8, -6, 4, -2, 0],
      duration: 500,
      ease: "inOut(2)",
      onComplete: () => {
        if (animationRef.current === animation) {
          animationRef.current = null;
        }
      },
    });

    animationRef.current = animation;
  };

  return (
    <PreviewContainer bg="light">
      <div className="flex flex-col items-center gap-4">
        <div
          ref={targetRef}
          className="border-2 border-red-400 bg-red-50 dark:bg-red-900/20 px-6 py-3 text-sm text-red-600 dark:text-red-400 will-change-transform"
        >
          Invalid input
        </div>
        <button
          type="button"
          onClick={() => void triggerShake()}
          className="px-4 py-2 text-xs border border-border text-muted hover:text-foreground hover:border-foreground transition-colors"
        >
          Trigger shake
        </button>
      </div>
    </PreviewContainer>
  );
}
