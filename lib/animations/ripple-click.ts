import type { Animation } from "./types";

export const rippleClick: Animation = {
  slug: "ripple-click",
  name: "涟漪点击",
  nameEn: "Ripple Click",
  description: "点击时从触发点产生向外扩散的圆形涟漪效果，Material Design 风格的经典交互反馈。",
  descriptionEn: "A circular ripple expands outward from the click point and fades out. Classic Material Design interaction feedback.",
  category: "micro-interaction",
  tags: ["ripple", "click", "material", "feedback", "interactive"],
  trigger: "on-click",
  difficulty: "intermediate",
  duration: "600ms",
  easing: "ease-out",
  cssProperties: ["transform", "opacity"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["ripple", "click", "material design", "wave", "touch feedback", "button click"],
  useCases: [
    "Button click feedback",
    "List item tap effect",
    "Material Design interactions",
    "Touch-friendly UI elements",
  ],
  relatedAnimations: ["shake", "magnetic-hover"],
  recommendedStyles: ["material-design", "minimalist-flat", "soft-ui"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes ripple-click {
  from {
    opacity: 0.6;
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(4);
  }
}

.ripple-container {
  position: relative;
  overflow: hidden;
}

.ripple-effect {
  position: absolute;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-top: -20px;
  margin-left: -20px;
  background: var(--ripple-color, hsl(0 0% 0% / 0.15));
  will-change: transform, opacity;
  animation: ripple-click 600ms ease-out forwards;
  pointer-events: none;
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Add to your global CSS or Tailwind v4 theme */
@keyframes ripple-click {
  from {
    opacity: 0.6;
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(4);
  }
}

@utility ripple-container {
  position: relative;
  overflow: hidden;
}

@utility animate-ripple-click {
  position: absolute;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-top: -20px;
  margin-left: -20px;
  background: var(--ripple-color, hsl(0 0% 0% / 0.15));
  will-change: transform, opacity;
  animation: ripple-click 600ms ease-out forwards;
  pointer-events: none;
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion, AnimatePresence } from "framer-motion";
import { useState, type MouseEvent } from "react";

// Tip: respect user's motion preferences
// import { useReducedMotion } from "framer-motion";
// const reduced = useReducedMotion();
// If reduced, skip ripple and rely on :active state change

function RippleButton({ children }: { children: React.ReactNode }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipples((prev) => [
      ...prev,
      { x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() },
    ]);
  }

  return (
    <button onClick={handleClick} style={{ position: "relative", overflow: "hidden" }}>
      {children}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={() =>
              setRipples((prev) => prev.filter((p) => p.id !== r.id))
            }
            style={{
              position: "absolute",
              left: r.x - 20,
              top: r.y - 20,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "currentColor",
              opacity: 0.15,
              pointerEvents: "none",
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
}`,
    },
  ],
};
