import type { Animation } from "../types";

export const scrollPeelAway: Animation = {
  slug: "scroll-peel-away",
  name: "滚动剥离",
  nameEn: "Scroll Peel Away",
  description:
    "滚动驱动的页面剥离效果，当前页面像贴纸一样从右上角卷起剥离，露出下一层内容。配合阴影和 3D 旋转营造真实的纸张卷曲质感。",
  descriptionEn:
    "Scroll-driven peel-away effect where the current section curls up from the corner like a sticker being peeled off, revealing the next layer beneath. Combined with shadow and 3D rotation for realistic paper-curl texture.",
  category: "scroll",
  tags: ["scroll", "3d", "peel", "curl", "paper", "sticky", "apple"],
  trigger: "on-scroll",
  difficulty: "advanced",
  duration: "continuous",
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  cssProperties: ["transform", "clip-path", "box-shadow", "opacity"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: [
    "peel",
    "curl",
    "paper",
    "sticker",
    "scroll animation",
    "3D",
    "apple",
    "page transition",
  ],
  useCases: [
    "Creative portfolio page transitions",
    "Magazine-style article navigation",
    "Product reveal sequences",
    "Interactive storytelling experiences",
  ],
  relatedAnimations: ["scroll-page-turn", "scroll-reveal", "flip-card"],
  recommendedStyles: [
    "apple-style",
    "editorial",
    "full-page-scroll",
    "magazine-grid",
  ],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `/* === Scroll Peel Away ===
 * The current section peels from the top-right corner,
 * curling diagonally to reveal the section beneath.
 * Driven by scroll progress via JS or scroll-timeline.
 */

.peel-container {
  position: relative;
  overflow: hidden;
}

.peel-section {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  will-change: transform, clip-path;
  transform-origin: bottom left;
}

/* The curling corner overlay — a pseudo-element that
   simulates the underside of the peeled paper */
.peel-section::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 50%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(0, 0, 0, 0.15) 100%
  );
  transform-origin: top right;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s linear;
  border-radius: 0 0 0 40%;
}

/* Fold shadow along the diagonal crease */
.peel-section::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    135deg,
    transparent 40%,
    rgba(0, 0, 0, 0.25) 50%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.15s linear;
}

.peel-section[data-peeling="true"]::before,
.peel-section[data-peeling="true"]::after {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .peel-section {
    transform: none !important;
    clip-path: none !important;
    transition: none;
  }
  .peel-section::before,
  .peel-section::after {
    display: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "tsx",
      code: `"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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

interface PeelAwayProps {
  pages: ReactNode[];
  className?: string;
}

export function PeelAway({ pages, className }: PeelAwayProps) {
  const { containerRef, progress } = useScrollProgress();
  const total = pages.length;
  const containerHeight = \`\${total * 100}vh\`;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ height: containerHeight, position: "relative" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {pages.map((page, i) => {
          const start = i / total;
          const end = (i + 1) / total;
          const local = Math.max(
            0,
            Math.min(1, (progress - start) / (end - start))
          );

          // Peel from top-right: rotate around bottom-left origin
          const rotateX = local * -15;
          const rotateZ = local * 8;
          const translateY = local * -20;
          const scale = 1 - local * 0.05;
          const clipInset = local * 100; // percentage from top-right

          // Diagonal clip-path: shrinks from top-right corner
          const clipPath =
            local > 0
              ? \`polygon(0% 0%, \${100 - clipInset}% 0%, 0% \${100 - clipInset}%)\`
              : "none";

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                transformOrigin: "bottom left",
                transform: \`perspective(1200px) rotateX(\${rotateX}deg) rotateZ(\${rotateZ}deg) translateY(\${translateY}%) scale(\${scale})\`,
                clipPath: local > 0.01 ? clipPath : "none",
                zIndex: total - i,
                boxShadow:
                  local > 0.01
                    ? \`-8px 8px \${30 * local}px rgba(0,0,0,\${0.3 * local})\`
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
// <PeelAway pages={[
//   <div className="h-screen bg-white flex items-center justify-center">
//     <h1 className="text-6xl font-bold text-slate-900">First</h1>
//   </div>,
//   <div className="h-screen bg-amber-50 flex items-center justify-center">
//     <h1 className="text-6xl font-bold text-amber-900">Second</h1>
//   </div>,
//   <div className="h-screen bg-sky-50 flex items-center justify-center">
//     <h1 className="text-6xl font-bold text-sky-900">Third</h1>
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

interface PeelPageProps {
  children: ReactNode;
  index: number;
  total: number;
}

function PeelPage({ children, index, total }: PeelPageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.8, 0]);
  const shadow = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "-0px 0px 0px rgba(0,0,0,0)",
      "-12px 12px 40px rgba(0,0,0,0.35)",
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
          transformOrigin: "bottom left",
          rotateX,
          rotateZ,
          y,
          scale,
          opacity,
          boxShadow: shadow,
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
//   <PeelPage index={0} total={3}>
//     <div className="h-screen bg-white grid place-items-center">
//       <h1 className="text-6xl font-bold text-slate-900">First</h1>
//     </div>
//   </PeelPage>
//   <PeelPage index={1} total={3}>
//     <div className="h-screen bg-amber-50 grid place-items-center">
//       <h1 className="text-6xl font-bold text-amber-900">Second</h1>
//     </div>
//   </PeelPage>
//   <PeelPage index={2} total={3}>
//     <div className="h-screen bg-sky-50 grid place-items-center">
//       <h1 className="text-6xl font-bold text-sky-900">Third</h1>
//     </div>
//   </PeelPage>
// </div>`,
    },
  ],
};
