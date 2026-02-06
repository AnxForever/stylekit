// Cyber Wafuu Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const cyberWafuuTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#1e3a5f]/30",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_8px_rgba(56,189,248,0.2)]",
    md: "shadow-[0_0_15px_rgba(56,189,248,0.3)]",
    lg: "shadow-[0_0_20px_rgba(56,189,248,0.4)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]",
    focus: "focus:shadow-[0_0_12px_rgba(56,189,248,0.3)]",
    colored: {
      blue: "shadow-[0_0_15px_rgba(56,189,248,0.3)]",
      vermillion: "shadow-[0_0_15px_rgba(196,30,58,0.3)]",
      gold: "shadow-[0_0_15px_rgba(201,162,39,0.3)]",
    },
  },

  interaction: {
    hoverTranslate: "hover:-translate-y-1",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-sans font-bold tracking-wider",
    body: "font-sans",
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
    section: "py-14 md:py-24 lg:py-32",
    container: "px-6 md:px-10 lg:px-16",
    card: "p-5 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-5 md:gap-8",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#080814]",
      secondary: "bg-[#1e3a5f]",
      accent: ["bg-[#c41e3a]", "bg-[#c9a227]", "bg-[#38bdf8]"],
    },
    text: {
      primary: "text-[#e2e8f0]",
      secondary: "text-[#38bdf8]",
      muted: "text-[#e2e8f0]/35",
    },
    button: {
      primary: "bg-[#1e3a5f] text-[#e2e8f0] shadow-[0_0_12px_rgba(30,58,95,0.4)]",
      secondary: "bg-[#080814] text-[#38bdf8] border-[#38bdf8]/40 shadow-[0_0_10px_rgba(56,189,248,0.2)]",
      danger: "bg-[#c41e3a] text-white shadow-[0_0_12px_rgba(196,30,58,0.4)]",
    },
  },

  forbidden: {
    classes: [
      "rounded-full", "rounded-2xl", "rounded-xl", "rounded-lg",
      "bg-white", "bg-gray-50", "bg-gray-100",
      "font-serif",
      "shadow-md", "shadow-lg", "shadow-xl",
      "bg-pink-100", "bg-pink-50", "bg-rose-50",
    ],
    patterns: [
      "^rounded-(?:full|2xl|xl|lg)$",
      "^bg-(?:white|gray-(?:50|100))$",
      "^bg-(?:pink|rose)-(?:50|100|200)$",
      "^font-serif$",
      "^shadow-(?:md|lg|xl)$",
    ],
    reasons: {
      "rounded-full": "Cyber Wafuu uses sharp shoji-grid geometry, no rounded shapes",
      "bg-white": "Cyber Wafuu requires dark indigo backgrounds",
      "font-serif": "Cyber Wafuu uses clean geometric sans-serif fonts",
      "shadow-md": "Use seigaiha-pattern glow shadows instead of soft shadows",
    },
  },

  required: {
    button: [
      "font-sans font-semibold tracking-wider",
      "border border-[#1e3a5f]/60",
      "transition-all duration-300 ease-in-out",
    ],
    card: [
      "bg-[#080814]",
      "border border-[#1e3a5f]/30",
      "transition-all duration-300 ease-in-out",
    ],
    input: [
      "bg-[#080814]",
      "border border-[#1e3a5f]/30",
      "text-[#e2e8f0]",
      "font-sans",
      "focus:outline-none",
    ],
  },
};
