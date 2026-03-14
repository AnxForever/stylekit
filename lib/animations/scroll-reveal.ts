import type { Animation } from "./types";

export const scrollReveal: Animation = {
  slug: "scroll-reveal",
  name: "滚动显现",
  nameEn: "Scroll Reveal",
  description: "元素进入视口时淡入显现，利用 IntersectionObserver 实现滚动触发。",
  descriptionEn: "Element fades in when entering the viewport, powered by IntersectionObserver for scroll-triggered reveals.",
  category: "scroll",
  tags: ["scroll", "reveal", "intersection", "viewport"],
  trigger: "on-scroll",
  difficulty: "intermediate",
  duration: "600ms",
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  cssProperties: ["opacity", "transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["scroll", "reveal", "viewport", "intersection observer", "lazy", "on-scroll"],
  useCases: [
    "Landing page sections",
    "Content-heavy pages",
    "Portfolio project reveals",
    "Feature list staggered entrance",
  ],
  relatedAnimations: ["fade-in-up", "parallax-float", "stagger-children"],
  recommendedStyles: ["full-page-scroll", "hero-fullscreen", "editorial"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes scroll-reveal {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-reveal {
  opacity: 0;
}

.scroll-reveal.is-visible {
  animation: scroll-reveal 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
}`,
    },
    {
      label: "Tailwind CSS",
      language: "tsx",
      code: `// Hook + Tailwind approach
import { useEffect, useRef, useState } from "react";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Usage:
// const { ref, isVisible } = useScrollReveal();
// <div ref={ref}
//   className={\`transition-all duration-600 ease-out
//     \${isVisible
//       ? "opacity-100 translate-y-0"
//       : "opacity-0 translate-y-8"}\`}
// />`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-10%" }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
>
  Scroll to reveal
</motion.div>`,
    },
  ],
};
