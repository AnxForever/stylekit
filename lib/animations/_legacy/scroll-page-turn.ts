import type { Animation } from "../types";

export const scrollPageTurn: Animation = {
  slug: "scroll-page-turn",
  name: "滚动翻页",
  nameEn: "Scroll Page Turn",
  description:
    "滚动驱动的 3D 翻页效果，页面像书页一样沿 Y 轴翻转剥离，露出下一页内容。使用 sticky 定位锁定视口，配合 perspective 和 rotateY 实现电影级翻页体验。",
  descriptionEn:
    "Scroll-driven 3D page turn effect where sections flip along the Y-axis like book pages, revealing the next section beneath. Uses sticky positioning to lock the viewport, combined with perspective and rotateY for a cinematic page-turning experience.",
  category: "scroll",
  tags: ["scroll", "3d", "page-turn", "perspective", "sticky", "apple"],
  trigger: "on-scroll",
  difficulty: "advanced",
  duration: "continuous",
  easing: "cubic-bezier(0.32, 0.72, 0, 1)",
  cssProperties: ["transform", "opacity", "box-shadow"],
  isGPUAccelerated: true,
  previewBg: "dark",
  keywords: [
    "page turn",
    "book flip",
    "scroll animation",
    "3D",
    "perspective",
    "apple",
    "sticky scroll",
    "cinematic",
  ],
  useCases: [
    "Product launch storytelling pages",
    "Portfolio case study transitions",
    "Immersive brand narrative sites",
    "Full-page scroll experiences",
  ],
  relatedAnimations: ["scroll-reveal", "parallax-float", "flip-card"],
  recommendedStyles: [
    "apple-style",
    "full-page-scroll",
    "parallax-sections",
    "hero-fullscreen",
  ],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `/* === Scroll Page Turn ===
 * Each .page-turn-section is a sticky full-screen panel.
 * Wrap them inside a tall scroll container so the user's
 * scroll progress drives the 3D rotation via JS or
 * scroll-timeline (where supported).
 */

.page-turn-container {
  perspective: 1200px;
  perspective-origin: center center;
}

.page-turn-section {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  transform-origin: left center;
  will-change: transform, opacity;
  backface-visibility: hidden;
  transition: transform 0.1s linear, opacity 0.1s linear;
}

/* Shadow on the folding edge — driven by the same scroll progress */
.page-turn-section::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.1s linear;
}

/* When the page is mid-turn, show the fold shadow */
.page-turn-section[data-turning="true"]::after {
  opacity: 1;
}

/* Reduced motion: instant cut, no 3D */
@media (prefers-reduced-motion: reduce) {
  .page-turn-section {
    transform: none !important;
    transition: none;
  }
  .page-turn-section::after {
    display: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "tsx",
      code: `"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Hook: maps scroll progress of a tall wrapper to 0-1.
 * Each "page" occupies 100vh of scroll distance.
 */
function useScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
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

  return { containerRef, progress };
}

interface PageTurnProps {
  pages: ReactNode[];
  className?: string;
}

export function PageTurn({ pages, className }: PageTurnProps) {
  const { containerRef, progress } = useScrollProgress();
  const total = pages.length;

  // Height: each page gets 100vh of scroll room
  const containerHeight = \`\${total * 100}vh\`;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ height: containerHeight, position: "relative" }}
    >
      <div
        className="sticky top-0 h-screen w-full"
        style={{ perspective: "1200px" }}
      >
        {pages.map((page, i) => {
          // Each page turns between progress i/(total-1) and (i+1)/(total-1)
          const start = i / total;
          const end = (i + 1) / total;
          const local = Math.max(
            0,
            Math.min(1, (progress - start) / (end - start))
          );
          const angle = local * -90;
          const opacity = 1 - local;
          const shadow = local * 0.5;

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                transformOrigin: "left center",
                transform: \`rotateY(\${angle}deg)\`,
                opacity: Math.max(0, opacity),
                zIndex: total - i,
                backfaceVisibility: "hidden",
                boxShadow:
                  shadow > 0
                    ? \`inset -30px 0 60px rgba(0,0,0,\${shadow})\`
                    : "none",
              }}
            >
              {page}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Usage:
// <PageTurn pages={[
//   <div className="h-screen bg-slate-900 flex items-center justify-center">
//     <h1 className="text-6xl text-white">Page 1</h1>
//   </div>,
//   <div className="h-screen bg-indigo-900 flex items-center justify-center">
//     <h1 className="text-6xl text-white">Page 2</h1>
//   </div>,
//   <div className="h-screen bg-emerald-900 flex items-center justify-center">
//     <h1 className="text-6xl text-white">Page 3</h1>
//   </div>,
// ]} />`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

// Tip: disable 3D transforms for reduced motion users
// import { useReducedMotion } from "framer-motion";

interface PageProps {
  children: ReactNode;
  index: number;
  total: number;
}

function TurnPage({ children, index, total }: PageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.6, 0]);
  const shadow = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "inset 0px 0 0px rgba(0,0,0,0)",
      "inset -40px 0 80px rgba(0,0,0,0.5)",
    ]
  );

  return (
    <div ref={ref} style={{ height: "100vh" }}>
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          transformOrigin: "left center",
          rotateY,
          opacity,
          boxShadow: shadow,
          backfaceVisibility: "hidden",
          zIndex: total - index,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Usage:
// <div style={{ perspective: "1200px" }}>
//   <TurnPage index={0} total={3}>
//     <div className="h-screen bg-slate-900 grid place-items-center">
//       <h1 className="text-6xl text-white">Page One</h1>
//     </div>
//   </TurnPage>
//   <TurnPage index={1} total={3}>
//     <div className="h-screen bg-indigo-900 grid place-items-center">
//       <h1 className="text-6xl text-white">Page Two</h1>
//     </div>
//   </TurnPage>
//   <TurnPage index={2} total={3}>
//     <div className="h-screen bg-emerald-900 grid place-items-center">
//       <h1 className="text-6xl text-white">Page Three</h1>
//     </div>
//   </TurnPage>
// </div>`,
    },
  ],
};
