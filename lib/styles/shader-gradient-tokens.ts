// Shader Gradient Style Tokens - a living WebGL mesh gradient behind frosted glass
import { createStyleTokens } from "./token-defaults";

export const shaderGradientTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-white/10",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_10px_rgba(0,0,0,0.4)]",
    md: "shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
    lg: "shadow-[0_30px_90px_rgba(0,0,0,0.55)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_24px_70px_rgba(124,92,255,0.25)]",
    focus: "focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/40",
  },

  interaction: {
    hoverOpacity: "hover:bg-white/12",
    transition: "transition-all duration-300 ease-out",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-semibold text-white tracking-tight",
    body: "text-white/70 leading-relaxed",
    mono: "font-mono text-[#7C5CFF] uppercase tracking-[0.25em]",
    sizes: {
      hero: "text-5xl md:text-7xl",
      h1: "text-4xl md:text-6xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-base md:text-lg",
      small: "text-sm",
    },
  },

  spacing: {
    section: "py-24 md:py-32",
    container: "px-6 md:px-8",
    card: "p-6",
    gap: {
      sm: "gap-4",
      md: "gap-8",
      lg: "gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#08090D]",
      secondary: "bg-[#12131A]",
      accent: ["bg-[#7C5CFF]"],
    },
    text: {
      primary: "text-white",
      secondary: "text-white/70",
      muted: "text-white/50",
    },
    button: {
      primary: "bg-[#7C5CFF] text-white",
      secondary: "bg-white/8 backdrop-blur-xl text-white border border-white/12",
    },
  },

  forbidden: {
    classes: [
      "bg-gradient-to-r",
      "from-indigo-600",
      "via-purple-600",
      "to-pink-500",
      "animate-pulse",
      "duration-100",
    ],
    patterns: [
      "^bg-gradient-to-r$",
      "^animate-(pulse|bounce)$",
      "^duration-100$",
    ],
    reasons: {
      "bg-gradient-to-r": "Motion and color come from the WebGL shader, not decorative CSS gradients",
      "from-indigo-600": "No AI-cliche gradient stops; the field is a real fbm shader over near-black",
      "animate-pulse": "Do not fake life with CSS keyframes; the living quality is the real shader",
      "duration-100": "The living gradient is calm and slow; snappy transitions break the premium feel",
    },
  },

  required: {
    button: [
      "rounded-xl",
      "transition-all duration-300",
      "active:scale-[0.98]",
    ],
    card: [
      "bg-white/[0.06] backdrop-blur-2xl",
      "border border-white/10",
      "rounded-2xl",
    ],
    input: [
      "bg-white/[0.06] backdrop-blur-xl",
      "border border-white/12",
      "rounded-xl",
      "text-white placeholder-white/40",
      "focus:outline-none focus:border-[#7C5CFF]/70 focus:ring-2 focus:ring-[#7C5CFF]/25",
      "transition-all duration-300",
    ],
  },
});
