// Luxe Lookbook Style Tokens - a fashion maison digital flagship
import { createStyleTokens } from "./token-defaults";

export const luxeLookbookTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#141210]/20",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-[0_30px_80px_-40px_rgba(20,18,16,0.35)]",
    none: "shadow-none",
    hover: "hover:shadow-none",
    focus: "focus-visible:ring-1 focus-visible:ring-[#9A7B4F]/60",
  },

  interaction: {
    hoverOpacity: "hover:opacity-70",
    transition: "transition-all duration-500 ease-out",
    active: "active:opacity-80",
  },

  typography: {
    heading: "font-serif text-[#141210] tracking-tight",
    body: "text-[#6B6259] leading-relaxed",
    mono: "uppercase tracking-[0.3em] text-[#9A7B4F] text-xs",
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
    section: "py-24 md:py-40",
    container: "px-6 md:px-10",
    card: "p-8",
    gap: {
      sm: "gap-6",
      md: "gap-10",
      lg: "gap-16",
    },
  },

  colors: {
    background: {
      primary: "bg-[#F7F5F1]",
      secondary: "bg-[#E8E3DB]",
      accent: ["bg-[#9A7B4F]"],
    },
    text: {
      primary: "text-[#141210]",
      secondary: "text-[#6B6259]",
      muted: "text-[#141210]/50",
    },
    button: {
      primary: "bg-[#141210] text-[#F7F5F1]",
      secondary: "bg-transparent text-[#141210] border border-[#141210]",
    },
  },

  forbidden: {
    classes: [
      "bg-gradient-to-r",
      "from-indigo-600",
      "via-purple-600",
      "to-pink-500",
      "rounded-full",
      "rounded-lg",
      "rounded-xl",
      "shadow-lg",
      "shadow-xl",
      "font-bold",
    ],
    patterns: [
      "^rounded-(lg|xl|2xl|full)$",
      "^from-(indigo|purple|pink|fuchsia)-",
      "^shadow-(md|lg|xl|2xl)$",
      "^drop-shadow-",
    ],
    reasons: {
      "bg-gradient-to-r": "The maison never decorates with gradients; restraint and negative space carry the luxury",
      "rounded-full": "Couture reads in crisp square corners and hairline rules, not pill shapes",
      "rounded-lg": "Any corner radius softens the editorial precision; keep edges square",
      "shadow-lg": "Heavy shadows feel commercial; luxury sits flat on the porcelain ground",
      "font-bold": "Weight comes from the high-contrast Didone serif, not from bold utility classes",
    },
  },

  required: {
    button: [
      "rounded-none",
      "uppercase tracking-[0.2em]",
      "transition-all duration-500",
    ],
    card: [
      "rounded-none",
      "bg-[#F7F5F1]",
    ],
    input: [
      "rounded-none",
      "bg-transparent",
      "border-b border-[#141210]/25",
      "text-[#141210] placeholder-[#141210]/40",
      "focus:outline-none focus:border-[#9A7B4F]",
      "transition-all duration-500",
    ],
  },
});
