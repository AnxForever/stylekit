// Islamic Geometric Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const islamicGeometricTokens = createStyleTokens({
  border: {
    width: "border-2",
    color: "border-[#c9a74e]",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_4px_rgba(201,167,78,0.1)]",
    md: "shadow-[0_4px_12px_rgba(201,167,78,0.15)]",
    lg: "shadow-[0_8px_24px_rgba(201,167,78,0.2)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_6px_20px_rgba(201,167,78,0.25)]",
    focus: "focus:shadow-[0_0_0_3px_rgba(201,167,78,0.15)]",
    colored: {
      gold: "shadow-[0_4px_16px_rgba(201,167,78,0.2)]",
      blue: "shadow-[0_4px_16px_rgba(26,58,92,0.2)]",
    },
  },

  interaction: {
    hoverOpacity: "hover:opacity-90",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:opacity-80",
  },

  typography: {
    heading: "font-sans font-semibold tracking-wide",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-8xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-16 md:py-28 lg:py-36",
    container: "px-6 md:px-12 lg:px-20",
    card: "p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-5 md:gap-8",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#1a3a5c]",
      secondary: "bg-[#f5ecd7]",
      accent: ["bg-[#c9a74e]", "bg-[#2d7d46]", "bg-[#8b2332]"],
    },
    text: {
      primary: "text-[#f5ecd7]",
      secondary: "text-[#1a3a5c]",
      muted: "text-[#c9a74e]/60",
    },
    button: {
      primary: "bg-[#c9a74e] text-[#1a3a5c]",
      secondary: "bg-transparent text-[#c9a74e] border-2 border-[#c9a74e]",
      danger: "bg-[#8b2332] text-[#f5ecd7]",
    },
  },

  forbidden: {
    classes: [
      "font-mono",
      "rounded-none", "rounded-full",
      "shadow-2xl",
      "bg-black",
      "bg-[#ff71ce]", "bg-[#01cdfe]", "bg-[#00ff00]",
      "text-[#ff71ce]", "text-[#01cdfe]", "text-[#00ff00]",
    ],
    patterns: [
      "^rounded-(?:none|full)$",
      "^shadow-2xl$",
      "^bg-(?:pink|cyan|lime|green)-",
      "^text-(?:pink|cyan|lime|green)-",
    ],
    reasons: {
      "rounded-none": "Islamic Geometric uses elegant rounding for arched forms (rounded-lg, rounded-xl)",
      "rounded-full": "Islamic Geometric uses moderate rounding, not pill shapes",
      "bg-black": "Islamic Geometric uses deep blue (#1a3a5c) instead of pure black",
      "shadow-2xl": "Islamic Geometric uses subtle golden shadows, not heavy ones",
      "bg-pink-500": "Islamic Geometric uses traditional deep blue, gold, and ivory palette",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "border-2 border-[#c9a74e]",
      "font-sans font-semibold tracking-wider",
      "transition-all duration-300",
    ],
    card: [
      "rounded-xl",
      "border-2 border-[#c9a74e]",
      "shadow-[0_4px_12px_rgba(201,167,78,0.15)]",
    ],
    input: [
      "rounded-lg",
      "border-2 border-[#1a3a5c]/30",
      "bg-[#f5ecd7]",
      "text-[#1a3a5c]",
      "font-sans tracking-wide",
      "focus:border-[#c9a74e]",
      "focus:outline-none",
    ],
  },
});
