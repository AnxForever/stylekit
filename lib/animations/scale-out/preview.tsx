"use client";

import { useEffect, useRef } from "react";
import { loadAnime, prefersReducedMotion, type AnimeAnimation } from "../anime-utils";
import { PreviewContainer } from "../previews/_shared";

function resetElement(element: HTMLElement) {
  element.style.opacity = "";
  element.style.transform = "";
}

export function ScaleOutPreview() {
  const cardRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimeAnimation | null>(null);

  useEffect(() => {
    return () => {
      animationRef.current?.cancel();
    };
  }, []);

  const trigger = async () => {
    const card = cardRef.current;
    if (!card || prefersReducedMotion()) return;

    const { animate } = await loadAnime();
    if (cardRef.current !== card) return;

    animationRef.current?.cancel();
    resetElement(card);

    const animation = animate(card, {
      opacity: [1, 0],
      scale: [1, 0.85],
      duration: 300,
      ease: "in(2)",
      onComplete: () => {
        if (animationRef.current === animation) {
          resetElement(card);
          animationRef.current = null;
        }
      },
    });

    animationRef.current = animation;
  };

  return (
    <PreviewContainer bg="light">
      <button
        type="button"
        onClick={() => void trigger()}
        className="absolute top-3 right-3 px-2 py-1 text-xs border border-border bg-background/80 backdrop-blur-sm hover:bg-foreground hover:text-background transition-colors"
      >
        Trigger
      </button>
      <div
        ref={cardRef}
        className="rounded-xl border border-border bg-background p-5 shadow-lg will-change-transform"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-500/20" />
          <div>
            <p className="text-sm font-medium text-foreground">Popup</p>
            <p className="text-xs text-muted-foreground">Will scale out</p>
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
}
