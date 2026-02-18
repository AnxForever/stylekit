// African Textile Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const africanTextileTokens = createStyleTokens({
  border: {
    width: "border-2",
    color: "border-[#2c1810]",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[2px_2px_0px_#2c1810]",
    md: "shadow-[4px_4px_0px_#2c1810]",
    lg: "shadow-[6px_6px_0px_#2c1810]",
    none: "shadow-none",
    hover: "hover:shadow-[6px_6px_0px_#2c1810]",
    focus: "focus:shadow-[0_0_0_3px_rgba(196,80,31,0.2)]",
    colored: {
      gold: "shadow-[4px_4px_0px_#f0c75e]",
      orange: "shadow-[4px_4px_0px_#c4501f]",
      green: "shadow-[4px_4px_0px_#1a5632]",
    },
  },

  interaction: {
    hoverScale: "hover:translate-x-[-2px] hover:translate-y-[-2px]",
    transition: "transition-all duration-200 ease-in-out",
    active: "active:translate-x-0 active:translate-y-0",
  },

  typography: {
    heading: "font-bold uppercase tracking-widest text-[#2c1810]",
    body: "font-sans tracking-wide",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-7xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-20 lg:py-28",
    container: "px-4 md:px-8 lg:px-12",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#2c1810]",
      secondary: "bg-[#e8d5b5]",
      accent: [
        "bg-[#c4501f]",
        "bg-[#f0c75e]",
        "bg-[#1a5632]",
      ],
    },
    text: {
      primary: "text-[#2c1810]",
      secondary: "text-[#e8d5b5]",
      muted: "text-[#2c1810]/60",
    },
    button: {
      primary: "bg-[#c4501f] text-[#e8d5b5] border-2 border-[#f0c75e]",
      secondary:
        "bg-[#e8d5b5] text-[#2c1810] border-2 border-[#2c1810]",
      danger: "bg-[#1a5632] text-[#e8d5b5]",
    },
  },

  forbidden: {
    classes: [
      "rounded-full",
      "rounded-3xl",
      "bg-white",
      "bg-pink-100",
      "bg-purple-100",
      "text-[#00ffff]",
      "text-[#ff00ff]",
      "backdrop-blur",
      "backdrop-blur-md",
      "backdrop-blur-lg",
      "bg-white/50",
      "bg-white/80",
    ],
    patterns: [
      "^rounded-(?:full|3xl)$",
      "^bg-(?:white|pink-[1-3]|purple-[1-3])",
      "^text-\\[#(?:00ffff|ff00ff)\\]",
      "^backdrop-blur",
    ],
    reasons: {
      "rounded-full":
        "African Textile uses angular geometric shapes (rounded-lg), not soft circles",
      "bg-white":
        "African Textile uses earth tones (sand, dark wood), not pure white",
      "backdrop-blur":
        "African Textile emphasizes solid, handcrafted textures over glass effects",
      "text-[#00ffff]":
        "African Textile uses earth and jewel tones, not neon colors",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "border-2 border-[#f0c75e]",
      "shadow-[4px_4px_0px_#2c1810]",
      "font-bold uppercase tracking-widest",
      "transition-all duration-200 ease-in-out",
    ],
    card: [
      "rounded-lg",
      "bg-[#e8d5b5]",
      "border-2 border-[#2c1810]",
      "shadow-[4px_4px_0px_#2c1810]",
    ],
    input: [
      "rounded-lg",
      "border-2 border-[#2c1810]/40",
      "bg-[#e8d5b5]",
      "text-[#2c1810]",
      "focus:border-[#c4501f]",
      "focus:outline-none",
    ],
  },
});
