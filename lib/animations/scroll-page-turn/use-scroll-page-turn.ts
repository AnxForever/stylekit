"use client";

import { useEffect, useRef, useState } from "react";

export interface UseScrollPageTurnOptions {
  /** Number of pages */
  pageCount: number;
  /** Perspective distance in px (default: 1200) */
  perspective?: number;
}

export interface PageTurnState {
  /** Overall scroll progress 0-1 */
  progress: number;
  /** Per-page computed styles */
  getPageStyle: (index: number) => React.CSSProperties;
}

/**
 * useScrollPageTurn — scroll-driven 3D page turn hook.
 *
 * Attach `containerRef` to a tall wrapper. As the user scrolls,
 * pages rotate along the Y-axis from left edge like book pages.
 *
 * @example
 * const { containerRef, stickyRef, getPageStyle } = useScrollPageTurn({ pageCount: 3 });
 * <div ref={containerRef} style={{ height: "300vh" }}>
 *   <div ref={stickyRef} className="sticky top-0 h-screen" style={{ perspective: 1200 }}>
 *     {pages.map((page, i) => (
 *       <div key={i} className="absolute inset-0" style={getPageStyle(i)}>{page}</div>
 *     ))}
 *   </div>
 * </div>
 */
export function useScrollPageTurn({ pageCount, perspective = 1200 }: UseScrollPageTurnOptions) {
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
    const angle = local * -90;
    const opacity = 1 - local;
    const shadowIntensity = local * 0.5;

    return {
      transformOrigin: "left center",
      transform: `rotateY(${angle}deg)`,
      opacity: Math.max(0, opacity),
      zIndex: pageCount - index,
      backfaceVisibility: "hidden",
      boxShadow:
        shadowIntensity > 0
          ? `inset -30px 0 60px rgba(0,0,0,${shadowIntensity})`
          : "none",
    };
  }

  const containerHeight = `${pageCount * 100}vh`;

  const containerStyle: React.CSSProperties = {
    height: containerHeight,
    position: "relative",
  };

  const stickyStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    height: "100vh",
    width: "100%",
    perspective: `${perspective}px`,
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
