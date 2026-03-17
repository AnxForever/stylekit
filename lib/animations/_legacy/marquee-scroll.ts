import type { Animation } from "../types";

export const marqueeScroll: Animation = {
  slug: "marquee-scroll",
  name: "跑马灯滚动",
  nameEn: "Marquee Scroll",
  description: "文字或内容水平无限循环滚动，常用于公告栏、品牌展示和合作伙伴列表。",
  descriptionEn: "Content scrolls horizontally in an infinite loop. Common for announcements, brand logos, and partner lists.",
  category: "text",
  tags: ["marquee", "scroll", "infinite", "loop", "horizontal"],
  trigger: "continuous",
  difficulty: "intermediate",
  duration: "20s",
  easing: "linear",
  cssProperties: ["transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["marquee", "scroll", "ticker", "infinite loop", "horizontal scroll", "brand logo"],
  useCases: [
    "Partner/client logo strip",
    "News ticker",
    "Feature announcement bar",
    "Social proof scroll",
  ],
  relatedAnimations: ["text-gradient-flow", "stagger-children"],
  recommendedStyles: ["corporate-clean", "minimalist-flat", "dark-mode"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* Wrapper hides overflow, inner track holds duplicated content */
.marquee {
  overflow: hidden;
  white-space: nowrap;
}

.marquee-track {
  display: inline-flex;
  will-change: transform;
  animation: marquee-scroll 20s linear infinite;
}

/* Duplicate content inside .marquee-track for seamless loop:
   <div class="marquee">
     <div class="marquee-track">
       <span>Item 1 - Item 2 - Item 3 -&nbsp;</span>
       <span>Item 1 - Item 2 - Item 3 -&nbsp;</span>
     </div>
   </div>
*/

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Add to your global CSS or Tailwind v4 theme */
@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@utility animate-marquee-scroll {
  will-change: transform;
  animation: marquee-scroll 20s linear infinite;
}

/* Usage:
   <div class="overflow-hidden whitespace-nowrap">
     <div class="inline-flex animate-marquee-scroll hover:[animation-play-state:paused]">
       <span class="px-4">Item 1</span>
       <span class="px-4">Item 2</span>
       <!-- Duplicate items for seamless loop -->
       <span class="px-4">Item 1</span>
       <span class="px-4">Item 2</span>
     </div>
   </div>
*/

@media (prefers-reduced-motion: reduce) {
  .marquee-scroll {
    animation: none;
  }
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

// Tip: respect user's motion preferences
// import { useReducedMotion } from "framer-motion";
// const reduced = useReducedMotion();
// if (reduced) return <div className="static-fallback">{children}</div>;

function Marquee({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <motion.div
        style={{ display: "inline-flex" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          },
        }}
      >
        {/* Render children twice for seamless loop */}
        {children}
        {children}
      </motion.div>
    </div>
  );
}`,
    },
  ],
};
