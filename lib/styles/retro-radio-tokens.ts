// Retro Radio Style Tokens
import { createStyleTokens } from "./token-defaults";

export const retroRadioTokens = createStyleTokens({
  border: {
    width: "border-2",
    color: "border-[#d4a017]/40",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_8px_rgba(61,43,31,0.3)]",
    md: "shadow-[0_4px_16px_rgba(61,43,31,0.4)]",
    lg: "shadow-[0_8px_32px_rgba(61,43,31,0.5)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_6px_24px_rgba(212,160,23,0.3)]",
    focus: "focus:shadow-[0_0_0_3px_rgba(212,160,23,0.3)]",
    colored: {
      brass: "shadow-[0_0_20px_rgba(212,160,23,0.3)]",
      wood: "shadow-[0_4px_16px_rgba(61,43,31,0.5)]",
      cream: "shadow-[0_2px_12px_rgba(245,230,211,0.2)]",
    },
  },

  interaction: {
    hoverScale: "hover:shadow-[0_6px_24px_rgba(212,160,23,0.3)] hover:border-[#d4a017]",
    transition: "transition-all duration-300",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-serif font-bold tracking-wide",
    body: "font-sans text-sm",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-7xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-4 md:px-8",
    card: "p-6",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#3d2b1f]",
      secondary: "bg-[#2a1f15]",
      accent: ["bg-[#d4a017]/10", "bg-[#f5e6d3]/10", "bg-[#8b6914]/10"],
    },
    text: {
      primary: "text-[#f5e6d3]",
      secondary: "text-[#d4a017]",
      muted: "text-[#f5e6d3]/50",
    },
    button: {
      primary: "bg-[#d4a017] text-[#3d2b1f]",
      secondary: "bg-[#3d2b1f] text-[#f5e6d3] border-2 border-[#d4a017]/40",
      danger: "bg-[#8b2500] text-[#f5e6d3] shadow-[0_2px_12px_rgba(139,37,0,0.4)]",
    },
  },

  forbidden: {
    classes: [
      "bg-black",
      "bg-[#050505]",
      "text-[#39ff14]",
      "font-mono",
      "rounded-none",
      "shadow-[0_0_",
      "tracking-[0.2em]",
      "uppercase",
    ],
    patterns: [
      "^bg-black",
      "^text-\\[#39ff14\\]",
      "^shadow-\\[0_0_.*neon",
      "^rounded-none",
    ],
    reasons: {
      "bg-black": "Retro Radio uses warm wood tones, not black backgrounds",
      "font-mono": "Use serif for headings and sans-serif for body, not monospace",
      "rounded-none": "Retro Radio uses rounded-lg for warm, approachable corners",
      "uppercase": "Retro Radio prefers natural case for a warm, readable feel",
    },
  },

  required: {
    button: [
      "font-serif",
      "tracking-wide",
      "border-2",
      "rounded-lg",
      "transition-all duration-300",
    ],
    card: [
      "bg-[#3d2b1f]",
      "border-2",
      "rounded-lg",
    ],
    input: [
      "bg-[#2a1f15]",
      "border-2",
      "text-[#f5e6d3]",
      "font-sans",
      "focus:border-[#d4a017]",
      "focus:shadow-[0_0_12px_rgba(212,160,23,0.3)]",
    ],
  },
});
