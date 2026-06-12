"use client";

import { useEffect, useRef } from "react";
import { loadAnime, prefersReducedMotion, type AnimeAnimation } from "../anime-utils";
import { PreviewContainer } from "../previews/_shared";

function resetElement(element: HTMLElement) {
  element.style.opacity = "";
  element.style.transform = "";
}

export function SlideOutRightPreview() {
  const panelRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimeAnimation | null>(null);

  useEffect(() => {
    return () => {
      animationRef.current?.cancel();
    };
  }, []);

  const trigger = async () => {
    const panel = panelRef.current;
    if (!panel || prefersReducedMotion()) return;

    const { animate } = await loadAnime();
    if (panelRef.current !== panel) return;

    animationRef.current?.cancel();
    resetElement(panel);

    const animation = animate(panel, {
      opacity: [1, 0],
      x: ["0%", "100%"],
      duration: 400,
      ease: "in(2)",
      onComplete: () => {
        if (animationRef.current === animation) {
          resetElement(panel);
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
        ref={panelRef}
        className="w-full max-w-xs rounded-lg border border-border bg-background p-4 shadow-lg will-change-transform"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Side Panel</span>
          <span className="text-xs text-muted-foreground">Swipe right</span>
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-2 w-full rounded-full bg-muted" />
          <div className="h-2 w-3/4 rounded-full bg-muted" />
        </div>
      </div>
    </PreviewContainer>
  );
}
