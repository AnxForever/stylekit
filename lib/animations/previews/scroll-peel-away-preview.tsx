"use client";

import { useRef, useState, useEffect } from "react";
import { PreviewContainer } from "./_shared";

const pages = [
  { bg: "from-white to-zinc-100", text: "text-zinc-900", label: "Page 1", sub: "Scroll to peel" },
  { bg: "from-amber-50 to-orange-50", text: "text-amber-900", label: "Page 2", sub: "Keep going" },
  { bg: "from-sky-50 to-blue-50", text: "text-sky-900", label: "Page 3", sub: "Last page" },
];

export function ScrollPeelAwayPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
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
    <PreviewContainer bg="light">
      <div className="flex flex-col items-center gap-2 w-full max-w-xs">
        <div
          ref={containerRef}
          className="relative w-full h-[200px] overflow-y-auto rounded-lg border border-border bg-zinc-100 dark:bg-zinc-900"
          style={{ scrollBehavior: "smooth" }}
        >
          <div style={{ height: `${total * 200}px`, position: "relative" }}>
            <div className="sticky top-0 h-[200px] w-full overflow-hidden">
              {pages.map((page, i) => {
                const start = i / total;
                const end = (i + 1) / total;
                const local = Math.max(0, Math.min(1, (progress - start) / (end - start)));

                const rotateX = local * -12;
                const rotateZ = local * 6;
                const translateY = local * -15;
                const scale = 1 - local * 0.04;
                const clipPct = local * 100;

                const clipPath = local > 0.01
                  ? `polygon(0% 0%, ${100 - clipPct}% 0%, 0% ${100 - clipPct}%)`
                  : "none";

                return (
                  <div
                    key={i}
                    className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${page.bg}`}
                    style={{
                      transformOrigin: "bottom left",
                      transform: `perspective(800px) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) translateY(${translateY}%) scale(${scale})`,
                      clipPath: local > 0.01 ? clipPath : "none",
                      zIndex: total - i,
                      boxShadow: local > 0.01
                        ? `-6px 6px ${24 * local}px rgba(0,0,0,${0.25 * local})`
                        : "none",
                    }}
                  >
                    <span className={`text-lg font-bold ${page.text}`}>{page.label}</span>
                    <span className={`text-xs ${page.text} opacity-50 mt-1`}>{page.sub}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <span className="text-[10px] text-muted uppercase tracking-wider">
          Scroll inside to preview
        </span>
      </div>
    </PreviewContainer>
  );
}
