import type { Animation } from "./types";

export const parallaxFloat: Animation = {
  slug: "parallax-float",
  name: "视差浮动",
  nameEn: "Parallax Float",
  description: "元素随滚动以不同速率移动，产生深度视差效果，增强页面层次感。",
  descriptionEn: "Elements move at different speeds during scroll, creating a depth parallax effect that enhances visual layers.",
  category: "scroll",
  tags: ["scroll", "parallax", "depth", "float"],
  trigger: "on-scroll",
  difficulty: "intermediate",
  duration: "continuous",
  easing: "linear",
  cssProperties: ["transform"],
  isGPUAccelerated: true,
  previewBg: "gradient",
  keywords: ["parallax", "float", "depth", "scroll speed", "layers", "3D"],
  useCases: [
    "Hero section background layers",
    "Landing page depth effect",
    "Decorative floating elements",
    "Image gallery parallax",
  ],
  relatedAnimations: ["scroll-reveal"],
  recommendedStyles: ["hero-fullscreen", "magazine-grid", "glassmorphism"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `.parallax-container {
  will-change: transform;
  perspective: 1px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.parallax-layer-back {
  transform: translateZ(-2px) scale(3);
}

.parallax-layer-mid {
  transform: translateZ(-1px) scale(2);
}

.parallax-layer-front {
  transform: translateZ(0);
}

/* Each layer shares these base styles */
.parallax-layer-back,
.parallax-layer-mid,
.parallax-layer-front {
  position: absolute;
  inset: 0;
}

@media (prefers-reduced-motion: reduce) {
  .parallax-container {
    animation: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "tsx",
      code: `// JS-driven parallax with scroll listener
import { useEffect, useRef } from "react";

function useParallax(speed = 0.5) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onScroll() {
      const rect = el!.getBoundingClientRect();
      const offset = rect.top * speed;
      el!.style.transform = \`translateY(\${offset}px)\`;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return ref;
}

// Usage:
// const ref = useParallax(0.3);
// <div ref={ref} className="will-change-transform">
//   Floating content
// </div>`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Tip: disable parallax for reduced motion users
// import { useReducedMotion } from "framer-motion";
// const reduced = useReducedMotion();
// const y = reduced ? 0 : useTransform(...);

function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <div ref={ref}>
      <motion.div style={{ y }}>
        Parallax content
      </motion.div>
    </div>
  );
}`,
    },
  ],
};
