// Creative Studio Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const studioBoldTokens = createStyleTokens({
  border: {
    width: "border-2",
    color: "border-white/20",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-2xl",
    none: "shadow-none",
    hover: "hover:shadow-2xl",
    focus: "focus:shadow-md",
  },

  interaction: {
    hoverScale: "hover:scale-[1.02]",
    hoverTranslate: "hover:-translate-y-0.5",
    hoverOpacity: "hover:opacity-90",
    transition: "transition-all duration-300",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-bold tracking-tight text-[#1A1A1A]",
    body: "font-sans font-light leading-relaxed",
    mono: "font-mono text-sm text-white/50",
    sizes: {
      hero: "text-6xl md:text-7xl lg:text-8xl",
      h1: "text-4xl md:text-5xl lg:text-6xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-2xl md:text-3xl",
      body: "text-base md:text-lg",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-20 md:py-28 lg:py-32",
    container: "px-6 md:px-12 lg:px-16",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-4 md:gap-6",
      md: "gap-6 md:gap-8",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#1A1A1A]",
      secondary: "bg-[#F5F5F0]",
      accent: ["bg-[#FF6B6B]", "bg-[#333333]", "bg-[#0D0D0D]", "bg-[#E55A5A]"],
    },
    text: {
      primary: "text-[#1A1A1A]",
      secondary: "text-[#333333]",
      muted: "text-white/40",
    },
    button: {
      primary: "bg-[#FF6B6B] text-white",
      secondary: "bg-transparent text-white border-2 border-white/30",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg",
      "rounded-xl",
      "rounded-2xl",
      "rounded-3xl",
      "rounded-full",
      "bg-white",
      "font-serif",
      "shadow-sm",
      "shadow-md",
      "shadow-lg",
      "shadow-xl",
    ],
    patterns: [
      "^rounded-(?:lg|xl|2xl|3xl)$",
      "^shadow-(?:sm|md|lg|xl|inner)$",
      "^font-serif$",
      "^bg-gradient",
    ],
    reasons: {
      "rounded-lg": "Studio Bold uses rounded-none for containers; rounded-full is reserved for avatars only",
      "rounded-full": "Studio Bold reserves full rounding for avatars; containers must be square",
      "bg-white": "Pure white background is forbidden; dark zones use #1A1A1A, light zones use #F5F5F0",
      "font-serif": "All text must be sans-serif; serif has no place in this bold modern aesthetic",
      "shadow-sm": "Studio Bold hovers use shadow-2xl; default shadows must be shadow-none",
      "bg-gradient-to-r": "Studio Bold uses solid color blocks for section transitions, not gradients",
    },
  },

  required: {
    button: [
      "font-bold",
      "rounded-none",
      "transition-all duration-300",
    ],
    card: [
      "bg-[#F5F5F0]",
      "rounded-none",
      "overflow-hidden",
      "group",
    ],
    input: [
      "bg-[#333333]",
      "border-0 border-b-2 border-white/20",
      "text-white",
      "focus:outline-none focus:border-[#FF6B6B] focus:ring-0",
    ],
  },
});
