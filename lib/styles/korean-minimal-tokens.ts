// Korean Minimal Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const koreanMinimalTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#3d4a5c]/8",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-[0_4px_12px_rgba(61,74,92,0.06)]",
    lg: "shadow-[0_8px_24px_rgba(61,74,92,0.08)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_4px_12px_rgba(61,74,92,0.06)]",
    focus: "focus:shadow-[0_0_0_3px_rgba(212,165,165,0.1)]",
    colored: {
      blush: "shadow-[0_4px_12px_rgba(212,165,165,0.12)]",
      sage: "shadow-[0_4px_12px_rgba(168,197,184,0.12)]",
    },
  },

  interaction: {
    hoverScale: "hover:translate-y-[-1px]",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-light tracking-wide text-[#3d4a5c]",
    body: "font-sans font-light",
    mono: "font-mono",
    sizes: {
      hero: "text-3xl md:text-5xl lg:text-6xl",
      h1: "text-2xl md:text-4xl",
      h2: "text-xl md:text-3xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-16 md:py-24 lg:py-32",
    container: "px-6 md:px-10 lg:px-16",
    card: "p-8 md:p-10",
    gap: {
      sm: "gap-4 md:gap-6",
      md: "gap-6 md:gap-8",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#faf9f7]",
      secondary: "bg-[#faf9f7]/80",
      accent: [
        "bg-[#d4a5a5]/10",
        "bg-[#a8c5b8]/10",
        "bg-[#e8d4b8]/10",
      ],
    },
    text: {
      primary: "text-[#3d4a5c]",
      secondary: "text-[#3d4a5c]/60",
      muted: "text-[#3d4a5c]/30",
    },
    button: {
      primary: "bg-[#3d4a5c] text-[#faf9f7]",
      secondary:
        "bg-transparent text-[#3d4a5c] border border-[#3d4a5c]/15",
      danger: "bg-[#d4a5a5] text-white",
    },
  },

  forbidden: {
    classes: [
      "border-2",
      "border-4",
      "shadow-xl",
      "shadow-2xl",
      "bg-black",
      "bg-[#0a0a0a]",
      "bg-red-500",
      "bg-blue-600",
      "bg-green-500",
      "uppercase",
      "tracking-widest",
      "font-black",
      "font-extrabold",
      "text-[#00ffff]",
      "text-[#ff00ff]",
      "rounded-none",
    ],
    patterns: [
      "^border-[2-4]$",
      "^shadow-(?:xl|2xl)$",
      "^bg-(?:black|\\[#0[0-9a-f]{5}\\])",
      "^bg-(?:red|blue|green|orange|purple)-[4-9]",
      "^font-(?:black|extrabold)$",
    ],
    reasons: {
      "border-2":
        "Korean Minimal uses only thin single-pixel borders for delicacy",
      "shadow-xl":
        "Korean Minimal uses subtle shadows (shadow-sm) to maintain lightness",
      "bg-black":
        "Korean Minimal uses warm white backgrounds for a gentle atmosphere",
      "uppercase":
        "Korean Minimal avoids aggressive typography in favor of natural case",
      "rounded-none":
        "Korean Minimal uses soft rounded corners (rounded-2xl)",
      "font-extrabold":
        "Korean Minimal prefers light font weights (font-light, font-normal)",
    },
  },

  required: {
    button: [
      "rounded-2xl",
      "shadow-sm",
      "font-normal tracking-wide",
      "transition-all duration-300 ease-in-out",
    ],
    card: [
      "rounded-2xl",
      "bg-[#faf9f7]",
      "border border-[#3d4a5c]/8",
      "shadow-sm",
    ],
    input: [
      "rounded-2xl",
      "border border-[#3d4a5c]/10",
      "bg-[#faf9f7]",
      "text-[#3d4a5c]",
      "font-light tracking-wide",
      "focus:border-[#d4a5a5]/50",
      "focus:outline-none",
    ],
  },
});
