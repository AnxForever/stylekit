// Mid-Century Modern Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const midCenturyModernTokens = createStyleTokens({
  border: {
    width: "border-2",
    color: "border-[#3d3d3d]",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[2px_2px_0_#3d3d3d]",
    md: "shadow-[4px_4px_0_#3d3d3d]",
    lg: "shadow-[6px_6px_0_#3d3d3d]",
    none: "shadow-none",
    hover: "hover:shadow-[6px_6px_0_#3d3d3d]",
    focus: "focus:shadow-[0_0_0_3px_rgba(232,87,42,0.15)]",
    colored: {
      orange: "shadow-[4px_4px_0_#e8572a]",
      teal: "shadow-[4px_4px_0_#2a6e5e]",
    },
  },

  interaction: {
    hoverOpacity: "hover:opacity-90",
    transition: "transition-all duration-200 ease-in-out",
    active: "active:translate-y-[2px]",
  },

  typography: {
    heading: "font-sans font-bold tracking-wide uppercase",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-8xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-16 md:py-24 lg:py-32",
    container: "px-6 md:px-12 lg:px-20",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-5 md:gap-8",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f5f0e1]",
      secondary: "bg-white",
      accent: ["bg-[#e8572a]", "bg-[#2a6e5e]", "bg-[#c4a35a]"],
    },
    text: {
      primary: "text-[#3d3d3d]",
      secondary: "text-[#3d3d3d]/70",
      muted: "text-[#3d3d3d]/40",
    },
    button: {
      primary: "bg-[#e8572a] text-[#f5f0e1]",
      secondary: "bg-transparent text-[#3d3d3d] border-2 border-[#3d3d3d]",
      danger: "bg-[#cc3300] text-[#f5f0e1]",
    },
  },

  forbidden: {
    classes: [
      "font-serif",
      "rounded-none", "rounded-full",
      "shadow-2xl",
      "bg-gradient-to-r", "bg-gradient-to-l", "bg-gradient-to-b", "bg-gradient-to-t",
      "bg-black",
      "bg-[#ff71ce]", "bg-[#01cdfe]", "bg-[#00ff00]",
      "text-[#ff71ce]", "text-[#01cdfe]",
    ],
    patterns: [
      "^font-serif$",
      "^rounded-(?:none|full)$",
      "^shadow-2xl$",
      "^bg-gradient-",
      "^bg-(?:pink|cyan|lime)-",
      "^text-(?:pink|cyan|lime)-",
    ],
    reasons: {
      "font-serif": "Mid-Century Modern uses clean sans-serif typography (font-sans)",
      "rounded-none": "MCM uses organic curves with medium rounding (rounded-lg, rounded-xl)",
      "rounded-full": "MCM uses moderate rounding, not pill shapes",
      "bg-gradient-to-r": "MCM uses flat solid color blocks, not gradients",
      "bg-black": "MCM uses warm cream and charcoal, never pure black",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "font-sans font-semibold uppercase tracking-wider",
      "transition-all duration-200",
    ],
    card: [
      "rounded-xl",
      "border-2 border-[#3d3d3d]",
      "bg-[#f5f0e1]",
    ],
    input: [
      "rounded-lg",
      "border-2 border-[#3d3d3d]/30",
      "bg-white",
      "text-[#3d3d3d]",
      "font-sans tracking-wide",
      "focus:border-[#e8572a]",
      "focus:outline-none",
    ],
  },
});
