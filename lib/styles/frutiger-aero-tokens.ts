import { createStyleTokens } from "./token-defaults";

export const frutigerAeroTokens = createStyleTokens({
  border: {
    radius: "rounded-3xl",
    width: "border",
    color: "border-white/40",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-md",
    md: "shadow-lg",
    lg: "shadow-2xl",
    none: "shadow-none",
    hover: "hover:shadow-xl",
    focus: "focus:shadow-lg",
    colored: {
      glow: "shadow-[0_0_30px_rgba(135,206,235,0.3)]",
      inner: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]",
      sky: "shadow-[0_0_20px_rgba(95,179,204,0.3)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-[1.01]",
    hoverOpacity: "hover:bg-white/50",
    transition: "transition-all duration-300 ease-out",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-sans font-bold text-white drop-shadow-lg",
    body: "font-sans text-white/80",
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
      primary: "bg-gradient-to-b from-sky-300 via-sky-400 to-sky-500",
      secondary: "bg-white/30 backdrop-blur-xl",
      accent: [
        "bg-sky-200/30",
        "bg-emerald-200/30",
        "bg-blue-200/30",
      ],
    },
    text: {
      primary: "text-white",
      secondary: "text-sky-900",
      muted: "text-white/60",
    },
    button: {
      primary: "bg-gradient-to-b from-white/90 to-white/60 text-sky-700",
      secondary: "bg-sky-500/20 text-white border border-white/30",
      danger: "bg-red-400/80 text-white",
    },
  },

  forbidden: {
    classes: [
      "bg-black", "bg-gray-900", "bg-gray-950", "bg-slate-900",
      "rounded-none", "rounded-sm",
      "font-mono",
      "border-black", "border-gray-900",
      "backdrop-blur-sm",
    ],
    patterns: [
      "^bg-(black|gray-9|slate-9)",
      "^rounded-(none|sm)$",
      "^font-mono$",
      "^border-(black|gray-9)",
    ],
    reasons: {
      "bg-black": "Frutiger Aero uses light sky-blue backgrounds, not dark themes",
      "bg-gray-900": "Frutiger Aero uses light sky-blue backgrounds, not dark themes",
      "bg-gray-950": "Frutiger Aero uses light sky-blue backgrounds, not dark themes",
      "bg-slate-900": "Frutiger Aero uses light sky-blue backgrounds, not dark themes",
      "rounded-none": "Frutiger Aero requires large rounded corners (rounded-2xl or rounded-3xl)",
      "rounded-sm": "Frutiger Aero requires large rounded corners (rounded-2xl or rounded-3xl)",
      "font-mono": "Frutiger Aero uses clean sans-serif typography only",
      "border-black": "Frutiger Aero uses subtle white borders (border-white/30 to border-white/50)",
      "border-gray-900": "Frutiger Aero uses subtle white borders (border-white/30 to border-white/50)",
      "backdrop-blur-sm": "Frutiger Aero requires strong blur (backdrop-blur-xl or higher)",
    },
  },

  required: {
    button: [
      "bg-gradient-to-b from-white/90 to-white/60",
      "backdrop-blur-md",
      "border border-white/50",
      "rounded-full",
      "text-sky-700",
      "shadow-lg",
      "hover:shadow-xl",
      "transition-all duration-300",
    ],
    card: [
      "bg-white/40 backdrop-blur-xl",
      "border border-white/50",
      "rounded-3xl",
      "shadow-xl",
    ],
    input: [
      "bg-white/30 backdrop-blur-md",
      "border border-white/40",
      "rounded-2xl",
      "text-sky-900 placeholder:text-sky-400/50",
      "focus:outline-none focus:border-white/70 focus:bg-white/40",
      "transition-all",
    ],
  },
});
