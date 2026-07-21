// Nocturne Glassmorphism Style Tokens - colorless glass over deep night scenes with directional edge light
import { createStyleTokens } from "./token-defaults";

export const glassmorphismTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-white/15",
    radius: "rounded-3xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_8px_rgba(3,7,18,0.35),inset_0_1px_0_rgba(255,255,255,0.18)]",
    md: "shadow-[0_8px_24px_rgba(3,7,18,0.45),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(2,6,16,0.3)]",
    lg: "shadow-[0_16px_48px_rgba(3,7,18,0.55),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(2,6,16,0.35)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_20px_60px_rgba(3,7,18,0.65),0_0_0_1px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.32)]",
    focus: "focus:shadow-[0_0_0_3px_rgba(228,184,99,0.18),0_8px_24px_rgba(3,7,18,0.45)]",
    colored: {
      inner: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(2,6,16,0.35)]",
      glow: "shadow-[0_0_40px_rgba(124,156,196,0.15),0_0_80px_rgba(124,156,196,0.05)]",
      blue: "shadow-[0_0_24px_rgba(124,156,196,0.3),inset_0_1px_0_rgba(124,156,196,0.2)]",
      green: "shadow-[0_0_16px_rgba(228,184,99,0.3),inset_0_1px_0_rgba(228,184,99,0.2)]",
    },
  },

  interaction: {
    hoverOpacity: "hover:bg-white/15",
    transition: "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
    active: "active:scale-[0.97]",
  },

  typography: {
    heading: "font-semibold text-white",
    body: "text-white/80",
    mono: "font-mono text-white/85",
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
      primary: "bg-white/8 backdrop-blur-[40px] backdrop-saturate-[180%]",
      secondary: "bg-white/12 backdrop-blur-[60px] backdrop-saturate-[180%]",
      accent: [
        "bg-[radial-gradient(640px_circle_at_85%_10%,rgba(124,156,196,0.25),transparent_60%),radial-gradient(560px_circle_at_10%_90%,rgba(51,81,122,0.3),transparent_60%)] bg-[#0B1322]",
        "bg-[radial-gradient(640px_circle_at_80%_15%,rgba(201,143,78,0.22),transparent_60%),radial-gradient(560px_circle_at_12%_88%,rgba(92,58,30,0.35),transparent_60%)] bg-[#120D0A]",
        "bg-[radial-gradient(640px_circle_at_85%_12%,rgba(127,182,158,0.2),transparent_60%),radial-gradient(560px_circle_at_10%_88%,rgba(31,77,58,0.35),transparent_60%)] bg-[#081210]",
      ],
    },
    text: {
      primary: "text-white",
      secondary: "text-white/80",
      muted: "text-white/50",
    },
    button: {
      primary: "bg-white/12 text-white backdrop-blur-[40px] backdrop-saturate-[180%]",
      secondary: "bg-white/6 text-white/85 backdrop-blur-[30px] backdrop-saturate-[160%]",
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
      "from-indigo-600", "via-purple-600", "to-pink-500",
    ],
    patterns: [
      "^rounded-none",
      "^rounded-sm$",
      "^rounded$",
      "^bg-(?!white\\/|gradient|\\[|transparent)",
      "^border-(?!white\\/|\\[)",
      "^backdrop-blur$",
      "^backdrop-blur-sm$",
      "^duration-(100|150)$",
    ],
    reasons: {
      "rounded-none": "Glassmorphism requires large rounded corners (rounded-2xl or rounded-3xl)",
      "rounded-sm": "Glassmorphism requires large rounded corners (rounded-2xl or rounded-3xl)",
      "rounded": "Glassmorphism requires large rounded corners (rounded-2xl or rounded-3xl)",
      "bg-white": "Glassmorphism uses semi-transparent surfaces (bg-white/5 to bg-white/12)",
      "bg-black": "Glassmorphism requires semi-transparent surfaces, not opaque colors",
      "backdrop-blur-sm": "Glassmorphism requires high blur (backdrop-blur-[40px] or higher)",
      "backdrop-blur": "Glassmorphism requires high blur (backdrop-blur-[40px] or higher)",
      "duration-100": "Glassmorphism uses fluid animations (duration-500 with spring easing)",
      "duration-150": "Glassmorphism uses fluid animations (duration-500 with spring easing)",
      "border-black": "Glassmorphism uses luminous white borders (border-white/15 to border-white/35)",
      "from-indigo-600": "The purple-pink AI gradient is the exact cliche this style rejects; use deep night scenes with light wells",
      "via-purple-600": "The purple-pink AI gradient is the exact cliche this style rejects; use deep night scenes with light wells",
      "to-pink-500": "The purple-pink AI gradient is the exact cliche this style rejects; use deep night scenes with light wells",
    },
  },

  required: {
    button: [
      "bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%]",
      "border border-white/20",
      "rounded-2xl",
      "text-white",
      "shadow-[0_4px_16px_rgba(3,7,18,0.45),inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(2,6,16,0.3)]",
      "hover:bg-white/15 hover:border-white/35 hover:shadow-[0_10px_32px_rgba(3,7,18,0.55),inset_0_1px_0_rgba(255,255,255,0.35)]",
      "hover:-translate-y-0.5",
      "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
    ],
    card: [
      "bg-white/8 backdrop-blur-[60px] backdrop-saturate-[180%]",
      "border border-white/15",
      "rounded-3xl",
      "shadow-[0_16px_40px_rgba(3,7,18,0.5),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(2,6,16,0.35)]",
      "[background-image:linear-gradient(to_bottom,rgba(255,255,255,0.12),transparent_50%)]",
    ],
    input: [
      "bg-white/6 backdrop-blur-[40px] backdrop-saturate-[180%]",
      "border border-white/15",
      "rounded-2xl",
      "text-white placeholder-white/35",
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(2,6,16,0.3)]",
      "focus:outline-none focus:border-white/35 focus:bg-white/10",
      "focus:shadow-[0_0_0_3px_rgba(228,184,99,0.15),inset_0_1px_0_rgba(255,255,255,0.25)]",
      "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
    ],
  },
});
