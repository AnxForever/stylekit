// Launch Keynote Style Tokens - a pitch-black keynote stage with one electric-blue accent
import { createStyleTokens } from "./token-defaults";

export const launchKeynoteTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-white/10",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_12px_rgba(0,0,0,0.6)]",
    md: "shadow-[0_12px_40px_rgba(0,0,0,0.7)]",
    lg: "shadow-[0_30px_80px_rgba(0,0,0,0.8)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_18px_50px_rgba(41,151,255,0.25)]",
    focus: "focus-visible:ring-2 focus-visible:ring-[#2997FF]/60",
  },

  interaction: {
    hoverOpacity: "hover:bg-[#0071E3]",
    transition: "transition-all duration-300 ease-out",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-semibold text-[#F5F5F7] tracking-tight",
    body: "text-[#86868B] leading-relaxed",
    mono: "font-mono text-[#2997FF] uppercase tracking-[0.2em]",
    sizes: {
      hero: "text-6xl md:text-8xl",
      h1: "text-5xl md:text-7xl",
      h2: "text-3xl md:text-5xl",
      h3: "text-xl md:text-2xl",
      body: "text-base md:text-lg",
      small: "text-sm",
    },
  },

  spacing: {
    section: "py-24 md:py-32",
    container: "px-6 md:px-8",
    card: "p-8",
    gap: {
      sm: "gap-4",
      md: "gap-8",
      lg: "gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-black",
      secondary: "bg-[#1D1D1F]",
      accent: ["bg-[#2997FF]"],
    },
    text: {
      primary: "text-[#F5F5F7]",
      secondary: "text-[#86868B]",
      muted: "text-white/40",
    },
    button: {
      primary: "bg-[#2997FF] text-white",
      secondary: "bg-[#1D1D1F] text-[#F5F5F7] border border-white/10",
    },
  },

  forbidden: {
    classes: [
      "bg-gradient-to-r", "from-indigo-600", "via-purple-600", "to-pink-500",
      "bg-white",
      "duration-100",
    ],
    patterns: [
      "^bg-gradient-to-r$",
      "^from-(indigo|purple|pink|fuchsia|emerald|amber)-",
      "^text-(red|green|amber|purple)-",
    ],
    reasons: {
      "bg-gradient-to-r": "The stage is pure black; drama comes from light on the product, not decorative gradients",
      "from-indigo-600": "No AI-cliche gradients; the only accent is one electric blue on a black stage",
      "bg-white": "The stage stays black; use near-white text #F5F5F7, never a white surface that breaks the depth",
      "duration-100": "Keynote motion is smooth and deliberate; snappy transitions cheapen the reveal",
    },
  },

  required: {
    button: [
      "rounded-full",
      "transition-all duration-300",
      "active:scale-[0.98]",
    ],
    card: [
      "bg-[#1D1D1F]",
      "rounded-2xl",
    ],
    input: [
      "bg-[#1D1D1F]",
      "border border-white/10",
      "rounded-xl",
      "text-[#F5F5F7] placeholder-[#86868B]",
      "focus:outline-none focus:border-[#2997FF]",
      "transition-colors duration-300",
    ],
  },
});
