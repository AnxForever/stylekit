// Liquid Glass Style Tokens - Apple-inspired glassmorphism with refraction, chromatic edges, and inner luminance
import { createStyleTokens } from "./token-defaults";

export const glassmorphismTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-white/20",
    radius: "rounded-3xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.25)]",
    md: "shadow-[0_8px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.3)]",
    lg: "shadow-[0_16px_48px_rgba(0,0,0,0.16),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.35)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_20px_60px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.15),inset_0_1px_0_rgba(255,255,255,0.4)]",
    focus: "focus:shadow-[0_0_0_3px_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.12)]",
    colored: {
      inner: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(255,255,255,0.1)]",
      glow: "shadow-[0_0_40px_rgba(255,255,255,0.15),0_0_80px_rgba(255,255,255,0.05)]",
      blue: "shadow-[0_0_24px_rgba(0,122,255,0.35),inset_0_1px_0_rgba(0,122,255,0.2)]",
      green: "shadow-[0_0_16px_rgba(52,199,89,0.4),inset_0_1px_0_rgba(52,199,89,0.2)]",
    },
  },

  interaction: {
    hoverOpacity: "hover:bg-white/25",
    transition: "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
    active: "active:scale-[0.97]",
  },

  typography: {
    heading: "font-semibold text-white",
    body: "text-white/85",
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
      primary: "bg-white/12 backdrop-blur-[40px] backdrop-saturate-[180%]",
      secondary: "bg-white/18 backdrop-blur-[60px] backdrop-saturate-[180%]",
      accent: [
        "bg-gradient-to-br from-blue-500/80 via-purple-500/80 to-pink-500/80",
        "bg-gradient-to-br from-violet-500/80 via-fuchsia-500/80 to-rose-400/80",
        "bg-gradient-to-br from-cyan-400/80 via-blue-500/80 to-indigo-600/80",
      ],
    },
    text: {
      primary: "text-white",
      secondary: "text-white/85",
      muted: "text-white/50",
    },
    button: {
      primary: "bg-white/20 text-white backdrop-blur-[40px] backdrop-saturate-[180%]",
      secondary: "bg-white/10 text-white/90 backdrop-blur-[30px] backdrop-saturate-[160%]",
    },
  },

  forbidden: {
    classes: [
      "rounded-none", "rounded-sm", "rounded",
      "bg-white", "bg-black", "bg-gray-100", "bg-gray-900",
      "shadow-none",
      "backdrop-blur-sm", "backdrop-blur",
      "duration-100", "duration-150",
      "border-black", "border-gray-500",
    ],
    patterns: [
      "^rounded-none",
      "^rounded-sm$",
      "^rounded$",
      "^bg-(?!white\\/|gradient|transparent)",
      "^border-(?!white\\/)",
      "^backdrop-blur$",
      "^backdrop-blur-sm$",
      "^duration-(100|150)$",
    ],
    reasons: {
      "rounded-none": "Liquid Glass requires large rounded corners (rounded-2xl or rounded-3xl)",
      "rounded-sm": "Liquid Glass requires large rounded corners (rounded-2xl or rounded-3xl)",
      "rounded": "Liquid Glass requires large rounded corners (rounded-2xl or rounded-3xl)",
      "bg-white": "Liquid Glass uses semi-transparent backgrounds (bg-white/10 to bg-white/25)",
      "bg-black": "Liquid Glass requires semi-transparent backgrounds, not opaque colors",
      "backdrop-blur-sm": "Liquid Glass requires high blur (backdrop-blur-[40px] or higher)",
      "backdrop-blur": "Liquid Glass requires high blur (backdrop-blur-[40px] or higher)",
      "duration-100": "Liquid Glass uses fluid animations (duration-500 with spring easing)",
      "duration-150": "Liquid Glass uses fluid animations (duration-500 with spring easing)",
      "border-black": "Liquid Glass uses luminous white borders (border-white/20 to border-white/40)",
    },
  },

  required: {
    button: [
      "bg-white/20 backdrop-blur-[40px] backdrop-saturate-[180%]",
      "border border-white/25",
      "rounded-2xl",
      "text-white",
      "shadow-[0_4px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)]",
      "hover:bg-white/28 hover:border-white/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.4)]",
      "hover:-translate-y-0.5",
      "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
    ],
    card: [
      "bg-white/15 backdrop-blur-[60px] backdrop-saturate-[180%]",
      "border border-white/20",
      "rounded-3xl",
      "shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.35)]",
      "[background-image:linear-gradient(to_bottom,rgba(255,255,255,0.18),transparent_50%)]",
    ],
    input: [
      "bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%]",
      "border border-white/20",
      "rounded-2xl",
      "text-white placeholder-white/40",
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
      "focus:outline-none focus:border-white/40 focus:bg-white/18",
      "focus:shadow-[0_0_0_3px_rgba(255,255,255,0.15),inset_0_1px_0_rgba(255,255,255,0.3)]",
      "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
    ],
  },
});
