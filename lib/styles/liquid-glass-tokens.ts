// Liquid Glass Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const liquidGlassTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-white/20",
    radius: "rounded-[24px]",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-lg shadow-black/5",
    md: "shadow-xl shadow-black/10",
    lg: "shadow-2xl shadow-black/15",
    none: "shadow-none",
    hover: "hover:shadow-xl hover:shadow-black/15",
    focus: "focus:shadow-[0_0_0_2px_rgba(168,85,247,0.5),0_0_20px_rgba(168,85,247,0.2)]",
    colored: {
      inner: "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.4)]",
      glow: "shadow-[0_0_30px_rgba(168,85,247,0.4)]",
      rainbow: "shadow-[0_0_20px_rgba(255,107,107,0.3),0_0_40px_rgba(78,205,196,0.2),0_0_60px_rgba(168,85,247,0.1)]",
      blue: "shadow-[0_0_20px_rgba(0,122,255,0.3)]",
      pink: "shadow-[0_0_20px_rgba(255,45,85,0.3)]",
    },
  },

  interaction: {
    hoverOpacity: "hover:bg-white/15",
    transition: "transition-all duration-500 ease-out",
    active: "active:scale-[0.98]",
  },

  typography: {
    // Neon stroke hero text (purple gradient + cyan stroke + 3D shadow)
    heading: "font-black bg-gradient-to-r from-[#a855f7] via-[#ff2d92] to-[#a855f7] bg-clip-text text-transparent",
    // Cyan glow subtitle text
    subtitle: "font-bold text-white",
    body: "text-white/80",
    mono: "font-mono text-white/90",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-8xl",
      h1: "text-4xl md:text-5xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
    // Core neon stroke styles (apply via inline style)
    neonStroke: {
      // Purple gradient hero text with thick cyan stroke
      hero: {
        WebkitTextStroke: "3px #4ecdc4",
        textShadow: "4px 4px 0 rgba(0,0,0,0.5), 0 0 20px rgba(78,205,196,0.5), 0 0 40px rgba(168,85,247,0.3)",
        filter: "drop-shadow(0 0 15px rgba(78,205,196,0.4))",
      },
      // Cyan glow subtitle (no stroke, just glow)
      subtitle: {
        textShadow: "0 0 20px rgba(78,205,196,0.8), 0 0 40px rgba(78,205,196,0.4), 2px 2px 0 rgba(0,0,0,0.3)",
      },
      // Smaller headlines with thinner stroke
      heading: {
        WebkitTextStroke: "2px #4ecdc4",
        textShadow: "3px 3px 0 rgba(0,0,0,0.4), 0 0 15px rgba(78,205,196,0.4)",
        filter: "drop-shadow(0 0 10px rgba(78,205,196,0.3))",
      },
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
      // Liquid Glass backgrounds with high saturation boost
      primary: "bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8]",
      secondary: "bg-white/15 backdrop-blur-[40px] backdrop-saturate-[1.8]",
      accent: [
        "bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]",
        "bg-gradient-to-r from-[#ff2d92] to-[#a855f7]",
        "bg-gradient-to-r from-[#4ecdc4] to-[#6bcb77]",
      ],
    },
    text: {
      primary: "text-white",
      secondary: "text-white/80",
      muted: "text-white/50",
    },
    button: {
      primary: "bg-gradient-to-r from-[#ff2d92] to-[#a855f7] text-white font-bold",
      secondary: "bg-white/10 text-white backdrop-blur-[40px] backdrop-saturate-[1.8]",
    },
  },

  // Rainbow gradient patterns are implemented via ::before/::after pseudo-elements
  // See required.button and required.card for usage examples

  forbidden: {
    classes: [
      // No sharp or small corners
      "rounded-none", "rounded-sm", "rounded",
      // No opaque backgrounds on glass elements
      "bg-white", "bg-black", "bg-gray-100", "bg-gray-900",
      // No hard shadows
      "shadow-[0px_0px_0px",
      // No low blur
      "backdrop-blur-sm", "backdrop-blur",
      // No fast transitions
      "duration-100", "duration-150", "duration-200",
      // No single color borders
      "border-black", "border-gray-500", "border-white",
      // No light backgrounds as containers
      "bg-gray-50", "bg-slate-100",
    ],
    patterns: [
      "^rounded-none",
      "^rounded-sm$",
      "^rounded$",
      "^bg-(?!white\\/|gradient|transparent)",
      "^border-(?!white\\/|transparent)",
      "^backdrop-blur$",
      "^backdrop-blur-sm$",
      "^duration-(100|150|200)$",
    ],
    reasons: {
      "rounded-none": "Liquid Glass requires large rounded corners (rounded-[24px] or rounded-3xl)",
      "rounded-sm": "Liquid Glass requires large rounded corners (rounded-[24px] or rounded-3xl)",
      "bg-white": "Liquid Glass uses semi-transparent backgrounds (bg-white/10 to bg-white/15)",
      "bg-black": "Liquid Glass requires semi-transparent backgrounds, not opaque colors",
      "backdrop-blur-sm": "Liquid Glass requires high blur (backdrop-blur-[40px] or backdrop-blur-3xl)",
      "backdrop-blur": "Liquid Glass requires high blur (backdrop-blur-[40px] or backdrop-blur-3xl)",
      "duration-100": "Liquid Glass uses fluid animations (duration-500 or higher)",
      "duration-150": "Liquid Glass uses fluid animations (duration-500 or higher)",
      "duration-200": "Liquid Glass uses fluid animations (duration-500 or higher)",
      "border-white": "Liquid Glass uses gradient borders for rainbow refraction effect",
    },
  },

  required: {
    button: [
      "bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8]",
      "rounded-[20px]",
      "text-white",
      "before:absolute before:inset-0 before:rounded-[20px] before:p-[1px] before:-z-10",
      "before:bg-gradient-to-r before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]",
      "after:absolute after:inset-[1px] after:rounded-[19px] after:-z-10",
      "after:bg-gradient-to-b after:from-white/20 after:to-transparent",
      "hover:bg-white/15 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]",
      "transition-all duration-500 ease-out",
    ],
    card: [
      "bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8]",
      "rounded-[24px]",
      "shadow-xl shadow-black/10",
      "before:absolute before:inset-0 before:rounded-[24px] before:p-[1px] before:-z-10",
      "before:bg-gradient-to-br before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]",
      "after:absolute after:inset-[1px] after:rounded-[23px] after:-z-10",
      "after:bg-gradient-to-b after:from-white/15 after:to-transparent",
      "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.4)]",
    ],
    input: [
      "bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8]",
      "border border-white/20",
      "rounded-[16px]",
      "text-white placeholder-white/50",
      "focus:outline-none focus:bg-white/15",
      "focus:border-transparent",
      "focus:shadow-[0_0_0_2px_rgba(168,85,247,0.5),0_0_20px_rgba(168,85,247,0.2)]",
      "transition-all duration-500 ease-out",
    ],
  },
};
