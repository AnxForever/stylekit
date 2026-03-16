// Linear Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const linearStyleTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-white/10",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-none",
    none: "shadow-none",
    hover: "shadow-none",
    focus: "shadow-none",
    colored: {},
  },

  interaction: {
    hoverTranslate: "",
    transition: "transition-all duration-150",
    active: "active:opacity-80",
  },

  typography: {
    heading: "font-sans font-semibold tracking-tight",
    body: "font-sans text-sm",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl font-semibold tracking-tight",
      h1: "text-2xl font-semibold tracking-tight",
      h2: "text-xl font-semibold tracking-tight",
      h3: "text-base font-medium tracking-tight",
      body: "text-sm",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-12 md:py-20",
    container: "px-4 md:px-8",
    card: "p-5",
    gap: {
      sm: "gap-1.5",
      md: "gap-3",
      lg: "gap-5",
    },
  },

  colors: {
    background: {
      primary: "bg-[#0a0a0b]",
      secondary: "bg-white/[0.03]",
      accent: ["bg-[#5e6ad2]"],
    },
    text: {
      primary: "text-white",
      secondary: "text-zinc-400",
      muted: "text-zinc-500",
    },
    button: {
      primary: "bg-gradient-to-r from-[#5e6ad2] to-[#8b5cf6] text-white",
      secondary: "bg-white/[0.03] text-white border border-white/10",
      danger: "bg-[#eb5757] text-white",
    },
  },

  forbidden: {
    classes: [
      "bg-white", "bg-gray-50", "bg-gray-100", "bg-slate-50",
      "rounded-2xl", "rounded-3xl", "rounded-full",
      "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl",
      "shadow-purple-500/20", "shadow-indigo-500/20",
      "font-serif", "font-mono",
      "text-pink-400", "text-green-400", "text-orange-400",
    ],
    patterns: [
      "^bg-(?:white|gray-(?:50|100)|slate-50)$",
      "^rounded-(?:2xl|3xl|full)$",
      "^shadow-(?:sm|md|lg|xl|2xl)$",
      "^shadow-.*\\/\\d+$",
      "^font-(?:serif|mono)$",
    ],
    reasons: {
      "bg-white": "Linear Style uses dark backgrounds only (#0a0a0b)",
      "rounded-2xl": "Linear Style uses rounded-lg max for restrained aesthetics",
      "shadow-sm": "Linear Style avoids shadows entirely; uses borders for hierarchy",
      "font-serif": "Linear Style uses Inter (sans-serif) exclusively",
      "font-mono": "Linear Style uses Inter (sans-serif) exclusively for UI text",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "font-medium",
      "text-sm",
      "transition-opacity duration-150",
    ],
    card: [
      "rounded-lg",
      "border border-white/10",
      "bg-white/[0.03]",
    ],
    input: [
      "rounded-lg",
      "border border-white/10",
      "bg-white/[0.03]",
      "text-white text-sm",
      "focus:outline-none",
    ],
  },
});
