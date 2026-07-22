// Cinematic Video Hero Style Tokens - trailer-like opener led by a looping video
import { createStyleTokens } from "./token-defaults";

export const cinematicVideoHeroTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-white/20",
    radius: "rounded-xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_8px_rgba(0,0,0,0.4)]",
    md: "shadow-[0_10px_30px_rgba(0,0,0,0.5)]",
    lg: "shadow-[0_28px_70px_rgba(0,0,0,0.6)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_16px_44px_rgba(0,0,0,0.55)]",
    focus: "focus-visible:ring-2 focus-visible:ring-[#E4C063]/60",
  },

  interaction: {
    hoverOpacity: "hover:bg-white/18",
    transition: "transition-all duration-300 ease-out",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-semibold text-white tracking-tight",
    body: "text-white/80 leading-relaxed",
    mono: "font-mono text-[#E4C063] uppercase tracking-widest",
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
    card: "p-5",
    gap: {
      sm: "gap-4",
      md: "gap-8",
      lg: "gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#05060A]",
      secondary: "bg-[#141821]",
      accent: ["bg-[#E4C063]"],
    },
    text: {
      primary: "text-white",
      secondary: "text-white/80",
      muted: "text-white/60",
    },
    button: {
      primary: "bg-[#E4C063] text-[#05060A]",
      secondary: "bg-white/10 backdrop-blur-md text-white border border-white/25",
    },
  },

  forbidden: {
    classes: [
      "bg-gradient-to-r", "from-indigo-600", "via-purple-600", "to-pink-500",
      "rounded-none",
      "duration-100",
    ],
    patterns: [
      "^bg-gradient-to-r$",
      "^from-(indigo|purple|pink|fuchsia)-",
      "^rounded-none$",
    ],
    reasons: {
      "bg-gradient-to-r": "Motion and color come from the footage, not decorative gradients",
      "from-indigo-600": "No AI-cliche gradients; the grade is near-black with one warm-gold accent",
      "rounded-none": "Cinematic framing reads softer with rounded-xl / rounded-full",
      "duration-100": "Cinematic motion is slow; snappy transitions break the mood",
    },
  },

  required: {
    button: [
      "rounded-full",
      "transition-all duration-300",
      "active:scale-[0.98]",
    ],
    card: [
      "relative overflow-hidden",
      "rounded-xl",
    ],
    input: [
      "bg-white/10 backdrop-blur-md",
      "border border-white/25",
      "rounded-full",
      "text-white placeholder-white/50",
      "focus:outline-none focus:border-[#E4C063]/70 focus:bg-white/15",
      "transition-all duration-300",
    ],
  },
});
