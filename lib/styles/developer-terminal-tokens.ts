// Developer Terminal Style Tokens
import { createStyleTokens } from "./token-defaults";

export const developerTerminalTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#1F2937]",
    radius: "rounded-sm",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-none",
    none: "shadow-none",
    hover: "hover:shadow-none",
    focus: "ring-1 ring-[#4AF626]/60",
  },

  interaction: {
    hoverScale: "hover:bg-[#4AF626]/10",
    transition: "transition-colors duration-150",
    active: "active:bg-[#4AF626]/20",
  },

  typography: {
    heading: "font-mono font-bold tracking-tight",
    body: "font-mono",
    mono: "font-mono",
    sizes: {
      hero: "text-2xl md:text-4xl",
      h1: "text-xl md:text-2xl",
      h2: "text-lg md:text-xl",
      h3: "text-base md:text-lg",
      body: "text-sm",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-8 md:py-12",
    container: "px-4 md:px-6",
    card: "p-4",
    gap: {
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-5",
    },
  },

  colors: {
    background: {
      primary: "bg-[#0A0E12]",
      secondary: "bg-[#0D141B]",
      accent: ["bg-[#4AF626]", "bg-[#8BE9FD]", "bg-[#FF79C6]", "bg-[#FFB86C]"],
    },
    text: {
      primary: "text-[#4AF626]",
      secondary: "text-[#8BE9FD]",
      muted: "text-[#6272A4]",
    },
    button: {
      primary: "bg-[#4AF626] text-[#0A0E12] hover:bg-[#3FD41F]",
      secondary: "bg-transparent text-[#4AF626] border border-[#1F2937] hover:border-[#4AF626]/60",
      danger: "bg-transparent text-[#FF79C6] border border-[#FF79C6]/40 hover:bg-[#FF79C6]/10",
    },
  },

  forbidden: {
    classes: [
      "font-sans",
      "font-serif",
      "bg-white",
      "bg-gray-50",
      "rounded-lg",
      "rounded-xl",
      "rounded-2xl",
      "rounded-full",
      "shadow-md",
      "shadow-lg",
      "shadow-xl",
      "backdrop-blur",
    ],
    patterns: [
      "^font-(sans|serif)",
      "^bg-(white|gray-50|gray-100|slate-50)",
      "^rounded-(lg|xl|2xl|3xl|full)",
      "^shadow-(md|lg|xl|2xl)",
      "^bg-gradient-",
      "^backdrop-blur",
    ],
    reasons: {
      "font-sans": "Developer Terminal is monospace-only; every glyph must be font-mono",
      "bg-white": "Terminals are near-black; use bg-[#0A0E12] or bg-[#0D141B]",
      "rounded-lg": "Terminal chrome stays flat and sharp; rounded-sm is the maximum radius",
      "shadow-md": "Terminals are flat surfaces; no elevation shadows",
      "backdrop-blur": "No glassmorphism; a terminal renders opaque character cells",
    },
  },

  required: {
    button: [
      "font-mono",
      "text-sm",
      "rounded-sm",
      "transition-colors duration-150",
    ],
    card: [
      "font-mono",
      "bg-[#0D141B]",
      "border border-[#1F2937]",
      "rounded-sm",
    ],
    input: [
      "font-mono",
      "bg-[#0A0E12]",
      "border border-[#1F2937]",
      "rounded-sm",
      "text-[#4AF626]",
      "caret-[#4AF626]",
      "placeholder:text-[#6272A4]",
      "focus:outline-none focus:border-[#4AF626]/60",
    ],
  },
});
