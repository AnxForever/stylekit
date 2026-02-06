// Split Screen Style Tokens - High contrast dual-panel layout
import type { StyleTokens } from "./tokens";

export const splitScreenTokens: StyleTokens = {
  border: {
    width: "border-0",
    color: "border-zinc-300",
    radius: "rounded-none",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-none",
    none: "shadow-none",
    hover: "shadow-none",
    focus: "shadow-none",
  },

  interaction: {
    hoverOpacity: "hover:opacity-90",
    transition: "transition-all duration-500",
  },

  typography: {
    heading: "font-bold tracking-tight",
    body: "font-sans",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-7xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-base md:text-lg",
      small: "text-sm",
    },
  },

  spacing: {
    section: "py-0",
    container: "px-8 md:px-12 lg:px-16",
    card: "p-8 lg:p-16",
    gap: {
      sm: "gap-2 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-black",
      secondary: "bg-white",
      accent: ["bg-[#ff4757]", "bg-[#2ed573]", "bg-[#1e90ff]", "bg-[#ffa502]"],
    },
    text: {
      primary: "text-white",
      secondary: "text-zinc-900",
      muted: "text-zinc-500",
    },
    button: {
      primary: "bg-black text-white",
      secondary: "bg-white text-black border-2 border-black",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full",
      "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl",
    ],
    patterns: [
      "^rounded-(?!none)",
      "^shadow-(?!none)",
    ],
    reasons: {
      "rounded-lg": "Split Screen uses sharp edges for strong visual dividers",
      "shadow-lg": "Split Screen relies on contrast between panels, not shadows",
    },
  },

  required: {
    button: [
      "px-8 py-4",
      "font-semibold",
      "transition-colors",
    ],
    card: [
      "min-h-[50vh] lg:min-h-screen",
      "flex flex-col justify-center",
    ],
    input: [
      "bg-transparent",
      "border-b-2 border-zinc-300",
      "text-lg",
      "focus:outline-none focus:border-black",
      "transition-colors",
    ],
  },
};
