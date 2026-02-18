// Monochrome Style Tokens
import { createStyleTokens } from "./token-defaults";

export const monochromeTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#e5e5e5]",
    radius: "rounded-sm",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-sm",
    lg: "shadow-md",
    none: "shadow-none",
    hover: "shadow-sm",
    focus: "ring-1 ring-[#cccccc]",
    colored: {},
  },

  interaction: {
    hoverOpacity: "hover:opacity-80",
    transition: "transition-colors duration-200",
    active: "active:opacity-70",
  },

  typography: {
    heading: "font-bold tracking-tight",
    body: "font-light",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-8xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-4xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-6 md:px-8",
    card: "p-6",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#fafafa]",
      secondary: "bg-[#f5f5f5]",
      accent: ["bg-[#e5e5e5]", "bg-[#cccccc]", "bg-[#111111]"],
    },
    text: {
      primary: "text-[#111111]",
      secondary: "text-[#666666]",
      muted: "text-[#999999]",
    },
    button: {
      primary: "bg-[#111111] text-[#fafafa]",
      secondary: "bg-[#f5f5f5] border border-[#e5e5e5] text-[#111111]",
    },
  },

  forbidden: {
    classes: [
      "bg-blue-500", "bg-red-500", "bg-green-500", "bg-pink-500",
      "bg-purple-500", "bg-yellow-500", "bg-orange-500", "bg-cyan-500",
      "bg-indigo-500", "bg-teal-500", "bg-emerald-500", "bg-rose-500",
      "text-blue-500", "text-red-500", "text-green-500", "text-pink-500",
      "rounded-full",
      "shadow-lg", "shadow-xl", "shadow-2xl",
      "bg-gradient-to-r", "bg-gradient-to-l", "bg-gradient-to-t", "bg-gradient-to-b",
    ],
    patterns: [
      "^bg-(?:blue|red|green|pink|purple|yellow|orange|cyan|indigo|teal|emerald|rose|violet|amber|lime|sky|fuchsia)-",
      "^text-(?:blue|red|green|pink|purple|yellow|orange|cyan|indigo|teal|emerald|rose|violet|amber|lime|sky|fuchsia)-",
      "^border-(?:blue|red|green|pink|purple|yellow|orange|cyan|indigo|teal|emerald|rose|violet|amber|lime|sky|fuchsia)-",
      "^rounded-full$",
      "^shadow-(?:xl|2xl)$",
      "^bg-gradient-",
    ],
    reasons: {
      "bg-blue-500": "Monochrome style forbids any color with hue; use grayscale only",
      "text-red-500": "Monochrome style forbids any color with hue; use grayscale only",
      "rounded-full": "Monochrome style uses sharp corners only (rounded-sm or rounded-none)",
      "shadow-xl": "Monochrome style uses minimal shadows only (shadow-sm max)",
      "bg-gradient-to-r": "Monochrome style forbids gradients entirely",
    },
  },

  required: {
    button: ["rounded-sm", "transition-colors", "font-medium"],
    card: ["rounded-sm", "border"],
    input: ["border-b", "focus:outline-none", "bg-transparent"],
  },
});
