"use client";

import { useRef, useState, useEffect } from "react";
import { PreviewContainer } from "../previews/_shared";

const pages = [
  { bg: "from-slate-800 to-slate-900", label: "Page 1", sub: "Scroll to turn" },
  { bg: "from-indigo-800 to-indigo-900", label: "Page 2", sub: "Keep scrolling" },
  { bg: "from-emerald-800 to-emerald-900", label: "Page 3", sub: "Last page" },
];

/**
 * Contained preview — uses a local scroll container instead of window scroll
 * so it works inside the detail page without hijacking the page scroll.
 */
export function ScrollPageTurnPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function onScroll() {
      const scrollTop = el!.scrollTop;
      const scrollable = el!.scrollHeight - el!.clientHeight;
      setProgress(scrollable > 0 ? scrollTop / scrollable : 0);
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const total = pages.length;

  return (
    <PreviewContainer bg="dark">
      <div className="flex flex-col items-center gap-2 w-full max-w-xs">
        <div
          ref={scrollRef}
          className="relative w-full h-[200px] overflow-y-auto rounded-lg border border-zinc-700 bg-zinc-950"
        >
          <div style={{ height: `${total * 200}px`, position: "relative" }}>
            <div
              className="sticky top-0 h-[200px] w-full overflow-hidden"
              style={{ perspective: "800px" }}
            >
              {pages.map((page, i) => {
                const start = i / total;
                const end = (i + 1) / total;
                const local = Math.max(0, Math.min(1, (progress - start) / (end - start)));
                const angle = local * -90;
                const opacity = 1 - local;
                const shadowIntensity = local * 0.6;

                return (
                  <div
                    key={i}
                    className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${page.bg}`}
                    style={{
                      transformOrigin: "left center",
                      transform: `rotateY(${angle}deg)`,
                      opacity: Math.max(0, opacity),
                      zIndex: total - i,
                      backfaceVisibility: "hidden",
                      boxShadow:
                        shadowIntensity > 0.01
                          ? `inset -20px 0 40px rgba(0,0,0,${shadowIntensity})`
                          : "none",
                    }}
                  >
                    <span className="text-lg font-bold text-white">{page.label}</span>
                    <span className="text-xs text-white/50 mt-1">{page.sub}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
          Scroll inside to preview
        </span>
      </div>
    </PreviewContainer>
  );
}

/**
 * Full-page usage example — uses the real hook with window scroll.
 * Not used in the preview card, but demonstrates the hook API.
 */
export { useScrollPageTurn } from "./use-scroll-page-turn";
