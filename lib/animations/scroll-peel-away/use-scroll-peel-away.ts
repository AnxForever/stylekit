"use client";

import { useEffect, useRef, useState } from "react";

export interface UseScrollPeelAwayOptions {
  /** Number of pages */
  pageCount: number;
  /** Perspective distance in px (default: 1200) */
  perspective?: number;
}

/**
 * useScrollPeelAway — scroll-driven diagonal peel effect.
 *
 * Pages peel from the top-right corner with 3D rotation,
 * clip-path diagonal cut, and drop shadow.
 *
 * @example
 * const { containerRef, stickyRef, getPageStyle } = useScrollPeelAway({ pageCount: 3 });
 */
export function useScrollPeelAway({ pageCount, perspective = 1200 }: UseScrollPeelAwayOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onScroll() {
      const rect = el!.getBoundingClientRect();
      const scrollable = el!.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(Math.max(0, Math.min(1, scrolled / scrollable)));
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function getPageStyle(index: number): React.CSSProperties {
    const start = index / pageCount;
    const end = (index + 1) / pageCount;
    const local = Math.max(0, Math.min(1, (progress - start) / (end - start)));

    const rotateX = local * -15;
    const rotateZ = local * 8;
    const translateY = local * -20;
    const scale = 1 - local * 0.05;
    const clipInset = local * 100;

    const clipPath =
      local > 0.01
        ? `polygon(0% 0%, ${100 - clipInset}% 0%, 0% ${100 - clipInset}%)`
        : "none";

    return {
      transformOrigin: "bottom left",
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) translateY(${translateY}%) scale(${scale})`,
      clipPath,
      zIndex: pageCount - index,
      boxShadow:
        local > 0.01
          ? `-8px 8px ${30 * local}px rgba(0,0,0,${0.3 * local})`
          : "none",
    };
  }

  const containerStyle: React.CSSProperties = {
    height: `${pageCount * 100}vh`,
    position: "relative",
  };

  const stickyStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    height: "100vh",
    width: "100%",
    overflow: "hidden",
  };

  return {
    containerRef,
    stickyRef,
    progress,
    getPageStyle,
    containerStyle,
    stickyStyle,
  };
}
