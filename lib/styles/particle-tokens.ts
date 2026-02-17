// Particle System Style Tokens
import { createStyleTokens } from "./token-defaults";

export const particleTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-white/5",
    radius: "rounded-xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_10px_rgba(59,130,246,0.1)]",
    md: "shadow-[0_0_20px_rgba(59,130,246,0.2)]",
    lg: "shadow-[0_0_40px_rgba(59,130,246,0.3)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    focus: "focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]",
    colored: {
      blue: "shadow-[0_0_20px_rgba(59,130,246,0.3)]",
      teal: "shadow-[0_0_20px_rgba(20,184,166,0.3)]",
      violet: "shadow-[0_0_20px_rgba(167,139,250,0.3)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-[1.02]",
    hoverOpacity: "hover:border-blue-500/20",
    transition: "transition-all duration-300",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-sans font-semibold",
    body: "font-sans text-sm",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-7xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-16 md:py-24 lg:py-32",
    container: "px-6 md:px-8 lg:px-12",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#0a0e1a]",
      secondary: "bg-[#0f1419]",
      accent: ["bg-blue-500/5", "bg-teal-500/5", "bg-violet-500/5"],
    },
    text: {
      primary: "text-[#e0e8ff]",
      secondary: "text-white/50",
      muted: "text-white/25",
    },
    button: {
      primary: "bg-blue-600 text-white hover:bg-blue-500",
      secondary: "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10",
      danger: "bg-red-600/20 text-red-400 border border-red-500/30",
    },
  },

  forbidden: {
    classes: [
      "bg-white",
      "bg-gray-50",
      "bg-gray-100",
      "border-black",
      "border-gray-900",
      "shadow-sm",
      "shadow-md",
      "shadow-lg",
      "text-gray-900",
      "text-black",
    ],
    patterns: [
      "^bg-white",
      "^bg-gray-[1-3]00",
      "^shadow-(sm|md|lg|xl)$",
      "^text-gray-[8-9]00",
      "^text-black",
    ],
    reasons: {
      "bg-white": "Particle system uses deep dark backgrounds only",
      "bg-gray-50": "Light backgrounds break the particle aesthetic",
      "shadow-sm": "Use glow effects (shadow-[...]) instead of conventional shadows",
      "text-gray-900": "Use light text (#e0e8ff or white/50) on dark backgrounds",
      "text-black": "Dark text is unreadable on dark particle backgrounds",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "font-medium",
      "transition-all duration-300",
    ],
    card: [
      "backdrop-blur",
      "rounded-xl",
      "border border-white/5",
    ],
    input: [
      "bg-[#0a0e1a]",
      "border border-white/10",
      "rounded-lg",
      "text-[#e0e8ff]",
      "focus:border-blue-500/50",
    ],
  },
});
