// Liquid Glass Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const glassmorphismTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-white/30",
    radius: "rounded-3xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-lg shadow-black/5",
    md: "shadow-xl shadow-black/10",
    lg: "shadow-2xl shadow-black/15",
    none: "shadow-none",
    hover: "hover:shadow-xl hover:shadow-black/15",
    focus: "focus:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
    // Liquid Glass specific shadows stored in colored
    colored: {
      inner: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]",
      glow: "shadow-[0_0_30px_rgba(255,255,255,0.2)]",
      blue: "shadow-[0_0_20px_rgba(0,122,255,0.3)]",
      green: "shadow-[0_0_12px_rgba(52,199,89,0.4)]",
    },
  },

  interaction: {
    hoverOpacity: "hover:bg-white/35",
    transition: "transition-all duration-300 ease-out",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-semibold text-white",
    body: "text-white/80",
    mono: "font-mono text-white/90",
    sizes: {
      hero: "text-4xl md:text-6xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-6 md:px-8",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      // Liquid Glass backgrounds with saturation boost
      primary: "bg-white/15 backdrop-blur-3xl backdrop-saturate-150",
      secondary: "bg-white/20 backdrop-blur-2xl backdrop-saturate-150",
      accent: [
        "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500",
        "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400",
        "bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600",
      ],
    },
    text: {
      primary: "text-white",
      secondary: "text-white/80",
      muted: "text-white/50",
    },
    button: {
      primary: "bg-white/25 text-white backdrop-blur-2xl backdrop-saturate-150",
      secondary: "bg-white/15 text-white backdrop-blur-xl backdrop-saturate-150",
    },
  },

  forbidden: {
    classes: [
      // No sharp or small corners
      "rounded-none", "rounded-sm", "rounded",
      // No opaque backgrounds on glass elements
      "bg-white", "bg-black", "bg-gray-100", "bg-gray-900",
      // No hard shadows
      "shadow-[0px_0px_0px", "shadow-none",
      // No low blur
      "backdrop-blur-sm",
      // No fast transitions
      "duration-100", "duration-150",
      // No direct color borders
      "border-black", "border-gray-500",
    ],
    patterns: [
      "^rounded-none",               // No sharp corners
      "^rounded-sm$",                // No small corners
      "^bg-(?!white\\/|gradient|transparent)", // Only transparent or gradient backgrounds
      "^border-(?!white\\/)",        // Only white/ borders allowed
      "^backdrop-blur-sm$",          // Low blur not allowed
      "^duration-(100|150)$",        // Fast transitions not allowed
    ],
    reasons: {
      "rounded-none": "Liquid Glass requires large rounded corners (rounded-2xl or rounded-3xl)",
      "rounded-sm": "Liquid Glass requires large rounded corners (rounded-2xl or rounded-3xl)",
      "bg-white": "Liquid Glass uses semi-transparent backgrounds (bg-white/15 to bg-white/30)",
      "bg-black": "Liquid Glass requires semi-transparent backgrounds, not opaque colors",
      "backdrop-blur-sm": "Liquid Glass requires high blur (backdrop-blur-2xl or backdrop-blur-3xl)",
      "duration-100": "Liquid Glass uses fluid animations (duration-300 or higher)",
      "duration-150": "Liquid Glass uses fluid animations (duration-300 or higher)",
      "border-black": "Liquid Glass uses subtle white borders (border-white/30)",
    },
  },

  required: {
    button: [
      "bg-white/25 backdrop-blur-2xl backdrop-saturate-150",
      "border border-white/40",
      "rounded-2xl",
      "text-white",
      "ring-1 ring-inset ring-white/20",
      "shadow-lg shadow-black/5",
      "hover:bg-white/35 hover:ring-white/30",
      "transition-all duration-300 ease-out",
    ],
    card: [
      "bg-white/20 backdrop-blur-3xl backdrop-saturate-150",
      "border border-white/30",
      "rounded-3xl",
      "ring-1 ring-inset ring-white/25",
      "shadow-xl shadow-black/10",
      "[background-image:linear-gradient(to_bottom,rgba(255,255,255,0.15),transparent)]",
    ],
    input: [
      "bg-white/15 backdrop-blur-2xl backdrop-saturate-150",
      "border border-white/30",
      "rounded-2xl",
      "text-white placeholder-white/50",
      "ring-1 ring-inset ring-white/20",
      "focus:outline-none focus:border-white/50 focus:ring-white/40",
      "focus:bg-white/25",
      "transition-all duration-300 ease-out",
    ],
  },
};
