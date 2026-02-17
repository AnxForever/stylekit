// Sci-Fi HUD Style Tokens
import { createStyleTokens } from "./token-defaults";

export const sciFiHudTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-cyan-500/30",
    radius: "rounded",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_10px_rgba(6,182,212,0.2)]",
    md: "shadow-[0_0_15px_rgba(6,182,212,0.3)]",
    lg: "shadow-[0_0_25px_rgba(6,182,212,0.5)]",
    none: "shadow-none",
    hover: "shadow-[0_0_25px_rgba(6,182,212,0.5)]",
    focus: "shadow-[0_0_20px_rgba(6,182,212,0.4)]",
    colored: {
      cyan: "shadow-[0_0_20px_rgba(6,182,212,0.5)]",
      green: "shadow-[0_0_20px_rgba(34,197,94,0.5)]",
      red: "shadow-[0_0_20px_rgba(239,68,68,0.5)]",
    },
  },

  interaction: {
    hoverScale: "hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:-translate-y-0.5",
    transition: "transition-all duration-300",
  },

  typography: {
    heading: "font-bold font-mono",
    body: "font-mono",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-7xl",
      h1: "text-3xl md:text-4xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-lg md:text-xl",
      body: "text-sm",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-12 md:py-20",
    container: "px-6 md:px-8",
    card: "p-6",
    gap: {
      sm: "gap-3",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#020617]",
      secondary: "bg-slate-900/85",
      accent: ["bg-cyan-500/20", "bg-sky-500/20", "bg-green-500/20"],
    },
    text: {
      primary: "text-[#E5F2FF]",
      secondary: "text-slate-400",
      muted: "text-slate-500",
    },
    button: {
      primary: "bg-slate-900/80 border-cyan-500/40 text-cyan-400",
      secondary: "bg-transparent border-slate-600 text-slate-300",
      danger: "bg-red-500/20 border-red-500/40 text-red-400",
    },
  },

  forbidden: {
    classes: [
      "bg-white", "bg-gray-50", "bg-gray-100",
      "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl",
      "rounded-2xl", "rounded-3xl", "rounded-full",
      "font-serif",
      "text-pink-", "text-rose-", "bg-pink-", "bg-rose-",
    ],
    patterns: [
      "^bg-white",
      "^shadow-(?!\\[|none)",
      "^rounded-(?:2xl|3xl|full)",
      "^font-serif",
    ],
    reasons: {
      "bg-white": "HUD interfaces require deep dark backgrounds",
      "shadow-md": "Must use glow shadows (shadow-[0_0_Xpx_rgba(...)]) not standard shadows",
      "rounded-2xl": "HUD panels use sharp or slightly rounded corners only",
      "font-serif": "HUD interfaces use monospace fonts exclusively",
    },
  },

  required: {
    button: ["font-mono", "uppercase", "tracking-widest", "border", "transition-all"],
    card: ["backdrop-blur", "border", "relative"],
    input: ["bg-slate-950", "border", "font-mono", "focus:outline-none"],
  },
});
