// Fresh Market Style Tokens
import { createStyleTokens } from "./token-defaults";

export const freshMarketTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#d4e4bc]",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    none: "shadow-none",
    hover: "shadow-md",
    focus: "ring-2 ring-[#2d5016]/20",
  },

  interaction: {
    hoverOpacity: "hover:bg-[#fef5e6]",
    transition: "transition-all duration-200",
  },

  typography: {
    heading: "font-bold",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-5xl lg:text-6xl",
      h1: "text-3xl md:text-4xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-12 md:py-20",
    container: "px-4 md:px-8",
    card: "p-4 md:p-6",
    gap: {
      sm: "gap-3",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#fef9f0]",
      secondary: "bg-white",
      accent: ["bg-[#e8722a]", "bg-[#f5c542]", "bg-[#2d5016]"],
    },
    text: {
      primary: "text-[#2d5016]",
      secondary: "text-[#8b4513]",
      muted: "text-[#8b7355]",
    },
    button: {
      primary: "bg-[#e8722a] text-white",
      secondary: "bg-[#d4e4bc] text-[#2d5016]",
      danger: "bg-red-600 text-white",
    },
  },

  forbidden: {
    classes: [
      "bg-blue-500",
      "bg-gray-100",
      "bg-gray-50",
      "text-black",
      "rounded-none",
      "shadow-xl",
      "shadow-2xl",
    ],
    patterns: [
      "^bg-blue-",
      "^bg-gray-",
      "^bg-slate-",
      "^text-black",
      "^rounded-none",
    ],
    reasons: {
      "bg-blue-500": "Fresh Market uses warm tones, not cool colors",
      "bg-gray-100": "Use warm cream #fef9f0 instead of cold gray",
      "rounded-none": "Fresh Market requires rounded corners (minimum rounded-lg)",
      "text-black": "Use deep green #2d5016 or deep brown #8b4513 instead of pure black",
    },
  },

  required: {
    button: [
      "px-6 py-3",
      "rounded-full",
      "font-medium",
      "transition-all duration-200",
    ],
    card: [
      "bg-white",
      "rounded-2xl",
      "shadow-sm",
    ],
    input: [
      "px-5 py-3",
      "bg-white",
      "border border-[#d4e4bc]",
      "rounded-full",
      "text-[#2d5016]",
      "placeholder:text-[#8b7355]",
      "focus:outline-none",
      "focus:ring-2 focus:ring-[#2d5016]/20",
      "transition-colors",
    ],
  },
});
