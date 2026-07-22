// Immersive Photo Style Tokens - photography is the interface, full-bleed with scrims
import { createStyleTokens } from "./token-defaults";

export const immersivePhotoTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-white/25",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_8px_rgba(0,0,0,0.3)]",
    md: "shadow-[0_8px_28px_rgba(0,0,0,0.4)]",
    lg: "shadow-[0_24px_60px_rgba(0,0,0,0.5)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_16px_44px_rgba(0,0,0,0.5)]",
    focus: "focus-visible:ring-2 focus-visible:ring-white/60",
  },

  interaction: {
    hoverOpacity: "hover:bg-white/20",
    transition: "transition-all duration-300 ease-out",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-semibold text-white tracking-tight",
    body: "text-white/80 leading-relaxed",
    mono: "font-mono text-[#E8B04B] uppercase tracking-widest",
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
      primary: "bg-[#0C0D10]",
      secondary: "bg-[#1A1C22]",
      accent: ["bg-[#E8B04B]"],
    },
    text: {
      primary: "text-white",
      secondary: "text-white/80",
      muted: "text-white/60",
    },
    button: {
      primary: "bg-white/12 backdrop-blur-md text-white border border-white/30",
      secondary: "bg-[#E8B04B] text-[#0C0D10]",
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
      "bg-gradient-to-r": "Depth and color come from the photograph, not decorative gradients",
      "from-indigo-600": "No AI-cliche gradients; the accent is sampled from the image's light",
      "rounded-none": "Full-bleed imagery reads better with soft rounded framing (rounded-2xl)",
      "duration-100": "Photo transitions and Ken Burns are slow and cinematic, never snappy",
    },
  },

  required: {
    button: [
      "bg-white/12 backdrop-blur-md",
      "border border-white/30",
      "rounded-full",
      "text-white",
      "hover:bg-white/20 hover:border-white/50",
      "transition-all duration-300",
    ],
    card: [
      "relative overflow-hidden",
      "rounded-2xl",
    ],
    input: [
      "bg-white/10 backdrop-blur-md",
      "border border-white/25",
      "rounded-full",
      "text-white placeholder-white/50",
      "focus:outline-none focus:border-white/60 focus:bg-white/15",
      "transition-all duration-300",
    ],
  },
});
