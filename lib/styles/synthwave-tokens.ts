// Synthwave Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const synthwaveTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#ff00ff]/50",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_8px_rgba(255,0,255,0.4)] md:shadow-[0_0_12px_rgba(255,0,255,0.4)]",
    md: "shadow-[0_0_16px_rgba(255,0,255,0.5)] md:shadow-[0_0_24px_rgba(255,0,255,0.5)]",
    lg: "shadow-[0_0_24px_rgba(255,0,255,0.6)] md:shadow-[0_0_40px_rgba(255,0,255,0.6)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_0_32px_rgba(0,255,255,0.7)]",
    focus: "focus:shadow-[0_0_20px_rgba(0,255,255,0.6)]",
    colored: {
      magenta: "shadow-[0_0_20px_rgba(255,0,255,0.6)]",
      cyan: "shadow-[0_0_20px_rgba(0,255,255,0.6)]",
      purple: "shadow-[0_0_20px_rgba(160,32,240,0.6)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-105",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-bold tracking-widest uppercase",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-8xl",
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
    card: "p-5 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#0a0a1a]",
      secondary: "bg-[#1a0a2e]",
      accent: ["bg-[#ff00ff]", "bg-[#00ffff]", "bg-[#a020f0]", "bg-[#ff1493]"],
    },
    text: {
      primary: "text-[#ff00ff]",
      secondary: "text-[#00ffff]",
      muted: "text-[#a020f0]/70",
    },
    button: {
      primary: "bg-gradient-to-r from-[#ff00ff] to-[#a020f0] text-white",
      secondary: "bg-[#00ffff]/10 text-[#00ffff] border border-[#00ffff]/50",
      danger: "bg-[#ff1493] text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "bg-white", "bg-gray-50", "bg-gray-100", "bg-[#f5f0e8]",
      "text-black", "text-gray-900", "text-[#3a3226]",
      "border-black",
      "shadow-[2px_2px_0px", "shadow-[4px_4px_0px",
      "bg-amber-", "bg-stone-", "bg-yellow-",
      "text-amber-", "text-stone-",
    ],
    patterns: [
      "^rounded-none$",
      "^shadow-\\[\\d+px_\\d+px_0px",
      "^bg-(?:white|gray-|stone-|amber-|yellow-)",
      "^text-(?:black|gray-(?:[7-9])|stone-|amber-)",
    ],
    reasons: {
      "rounded-none": "Synthwave uses rounded shapes (rounded-lg) for a retro-futuristic feel",
      "bg-white": "Synthwave uses dark backgrounds with neon accents, not light colors",
      "shadow-[4px_4px_0px": "Synthwave uses neon glow shadows (0_0_Xpx_rgba), not hard-edge",
      "text-black": "Synthwave uses neon-colored text on dark backgrounds",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "shadow-[0_0_16px_rgba(255,0,255,0.5)]",
      "hover:shadow-[0_0_32px_rgba(0,255,255,0.7)]",
      "transition-all duration-300 ease-in-out",
      "font-bold uppercase",
    ],
    card: [
      "rounded-lg",
      "bg-[#0a0a1a]/80",
      "border border-[#ff00ff]/50",
      "shadow-[0_0_16px_rgba(255,0,255,0.5)]",
    ],
    input: [
      "rounded-lg",
      "border border-[#a020f0]/50",
      "bg-[#0a0a1a]/60",
      "text-[#00ffff]",
      "focus:shadow-[0_0_20px_rgba(0,255,255,0.6)]",
      "focus:outline-none",
    ],
  },
};
