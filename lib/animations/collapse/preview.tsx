"use client";

import { useEffect, useRef, useState } from "react";
import { loadAnime, prefersReducedMotion, type AnimeAnimation } from "../anime-utils";
import { PreviewContainer } from "../previews/_shared";

function setPanelState(panel: HTMLDivElement, isOpen: boolean) {
  panel.style.height = isOpen ? "auto" : "0px";
  panel.style.opacity = isOpen ? "1" : "0";
}

export function CollapsePreview() {
  const [isOpen, setIsOpen] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const panelAnimationRef = useRef<AnimeAnimation | null>(null);
  const iconAnimationRef = useRef<AnimeAnimation | null>(null);

  useEffect(() => {
    return () => {
      panelAnimationRef.current?.cancel();
      iconAnimationRef.current?.cancel();
    };
  }, []);

  const toggle = async () => {
    const panel = panelRef.current;
    const icon = iconRef.current;
    if (!panel || !icon) return;

    const nextOpen = !isOpen;
    setIsOpen(nextOpen);

    if (prefersReducedMotion()) {
      setPanelState(panel, nextOpen);
      icon.style.transform = nextOpen ? "rotate(180deg)" : "rotate(0deg)";
      return;
    }

    const { animate } = await loadAnime();
    if (panelRef.current !== panel || iconRef.current !== icon) return;

    panelAnimationRef.current?.cancel();
    iconAnimationRef.current?.cancel();

    const startHeight = panel.getBoundingClientRect().height;
    panel.style.height = `${startHeight}px`;
    panel.style.opacity = getComputedStyle(panel).opacity;

    const targetHeight = nextOpen ? panel.scrollHeight : 0;
    const panelAnimation = animate(panel, {
      height: [`${startHeight}px`, `${targetHeight}px`],
      opacity: [Number(getComputedStyle(panel).opacity), nextOpen ? 1 : 0],
      duration: 350,
      ease: "inOut(3)",
      onComplete: () => {
        if (panelAnimationRef.current === panelAnimation) {
          setPanelState(panel, nextOpen);
          panelAnimationRef.current = null;
        }
      },
    });

    const iconAnimation = animate(icon, {
      rotate: nextOpen ? ["0deg", "180deg"] : ["180deg", "0deg"],
      duration: 260,
      ease: "out(3)",
      onComplete: () => {
        if (iconAnimationRef.current === iconAnimation) {
          iconAnimationRef.current = null;
        }
      },
    });

    panelAnimationRef.current = panelAnimation;
    iconAnimationRef.current = iconAnimation;
  };

  return (
    <PreviewContainer bg="light">
      <div className="w-full max-w-sm">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="collapse-preview-panel"
          onClick={() => void toggle()}
          className="flex w-full items-center justify-between rounded-t-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
        >
          <span>Accordion Item</span>
          <span ref={iconRef} className="inline-block will-change-transform">
            v
          </span>
        </button>
        <div
          id="collapse-preview-panel"
          ref={panelRef}
          className="overflow-hidden rounded-b-lg border-x border-b border-border bg-background will-change-[height,opacity]"
        >
          <div className="px-4 py-3">
            <p className="text-sm text-muted-foreground">
              This content collapses and expands. Click the header to toggle.
            </p>
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
}
