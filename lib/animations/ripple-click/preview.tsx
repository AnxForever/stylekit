"use client";

import { useCallback, useEffect, useRef, type MouseEvent } from "react";
import { loadAnime, prefersReducedMotion, type AnimeAnimation } from "../anime-utils";
import { PreviewContainer } from "../previews/_shared";

interface ActiveRipple {
  animation: AnimeAnimation;
  element: HTMLSpanElement;
}

function createRipple(button: HTMLButtonElement, x: number, y: number) {
  const ripple = document.createElement("span");

  ripple.dataset.rippleEffect = "true";
  ripple.className =
    "pointer-events-none absolute block rounded-full bg-white/40 will-change-transform";
  Object.assign(ripple.style, {
    height: "24px",
    left: `${x - 12}px`,
    opacity: "0.6",
    top: `${y - 12}px`,
    transformOrigin: "center",
    width: "24px",
  });

  button.appendChild(ripple);
  return ripple;
}

export function RippleClickPreview() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const activeRipplesRef = useRef<ActiveRipple[]>([]);

  useEffect(() => {
    return () => {
      activeRipplesRef.current.forEach(({ animation, element }) => {
        animation.cancel();
        element.remove();
      });
      activeRipplesRef.current = [];
    };
  }, []);

  const removeRipple = useCallback((ripple: HTMLSpanElement) => {
    activeRipplesRef.current = activeRipplesRef.current.filter(
      (entry) => entry.element !== ripple
    );
    ripple.remove();
  }, []);

  const spawnRipple = useCallback(
    async (x: number, y: number) => {
      const button = buttonRef.current;
      if (!button || prefersReducedMotion()) return;

      const { animate } = await loadAnime();
      if (buttonRef.current !== button) return;

      const ripple = createRipple(button, x, y);
      const animation = animate(ripple, {
        scale: [0, 16],
        opacity: [0.6, 0],
        duration: 650,
        ease: "out(2)",
        onComplete: () => removeRipple(ripple),
      });

      activeRipplesRef.current.push({ animation, element: ripple });
    },
    [removeRipple]
  );

  // Auto-play ripple loop for demo
  useEffect(() => {
    const runDemoRipple = () => {
      const button = buttonRef.current;
      if (!button) return;

      void spawnRipple(
        button.clientWidth * (0.3 + Math.random() * 0.4),
        button.clientHeight * (0.35 + Math.random() * 0.3)
      );
    };

    const timer = setInterval(runDemoRipple, 1800);
    const initial = setTimeout(runDemoRipple, 300);

    return () => {
      clearInterval(timer);
      clearTimeout(initial);
    };
  }, [spawnRipple]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    void spawnRipple(event.clientX - rect.left, event.clientY - rect.top);
  };

  return (
    <PreviewContainer bg="light">
      <div className="flex flex-col items-center gap-4">
        <button
          ref={buttonRef}
          type="button"
          onClick={handleClick}
          className="relative overflow-hidden px-10 py-4 bg-indigo-500 text-white text-sm cursor-pointer select-none"
        >
          <span className="relative z-10 pointer-events-none">Click me</span>
        </button>
        <span className="text-[10px] text-muted uppercase tracking-wider">Auto-playing / click to trigger</span>
      </div>
    </PreviewContainer>
  );
}
