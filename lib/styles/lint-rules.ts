/**
 * Style Lint Rules
 *
 * Structured rules for each design style, used by:
 * - Linter: Check if code follows style guidelines
 * - AI: Know what's allowed/forbidden for each style
 * - Generator: Ensure generated code is compliant
 */

export interface StyleLintRule {
  /** Style identifier */
  slug: string;

  /** Human-readable name */
  name: string;

  /** Forbidden Tailwind classes - will trigger error */
  forbidden: {
    classes: string[];
    patterns: RegExp[];
    reasons: Record<string, string>;
  };

  /** Required classes for specific components */
  required: {
    button?: string[];
    card?: string[];
    input?: string[];
    container?: string[];
  };

  /** Recommended patterns */
  recommended: {
    borderRadius: string;
    shadow: string;
    transition: string;
    spacing: string;
  };

  /** Color constraints */
  colors: {
    allowedPalettes: string[];
    forbiddenColors: string[];
    contrastMinimum: "AA" | "AAA";
  };

  /** Typography constraints */
  typography: {
    headingFont: string;
    bodyFont: string;
    allowedWeights: number[];
  };
}

export const styleLintRules: Record<string, StyleLintRule> = {
  // ==================== BRUTALISM FAMILY ====================

  "neo-brutalist": {
    slug: "neo-brutalist",
    name: "Neo-Brutalist",
    forbidden: {
      classes: [
        "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full",
        "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl",
        "blur", "backdrop-blur",
        "bg-gradient-to-r", "bg-gradient-to-l", "bg-gradient-to-t", "bg-gradient-to-b",
        "transition-all", "duration-500", "duration-700", "duration-1000",
        "opacity-50", "opacity-75",
      ],
      patterns: [
        /rounded-[^n]/,           // Any rounded except rounded-none
        /shadow-(?!(\[|none))/,   // Any shadow except custom [...] or none
        /blur-/,                  // Any blur
        /bg-gradient/,            // Any gradient
        /duration-[5-9]\d{2}/,    // Slow transitions (500ms+)
      ],
      reasons: {
        "rounded-lg": "Neo-Brutalist uses sharp corners only (rounded-none)",
        "shadow-lg": "Use hard offset shadows: shadow-[4px_4px_0_#000]",
        "blur": "Neo-Brutalist avoids blur effects",
        "bg-gradient-to-r": "Use solid colors, no gradients",
        "transition-all": "Use fast, snappy transitions (duration-200 max)",
      },
    },
    required: {
      button: [
        "rounded-none",
        "border-2",
        "md:border-4",
        "border-black",
        "hover:shadow-none",
        "hover:translate-x-[2px]",
        "hover:translate-y-[2px]",
        "transition-all",
        "duration-200",
        "font-black",
      ],
      card: [
        "rounded-none",
        "border-2",
        "md:border-4",
        "border-black",
        "bg-white",
      ],
      input: [
        "rounded-none",
        "border-2",
        "md:border-4",
        "border-black",
        "font-mono",
        "focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        "focus:outline-none",
        "bg-white",
      ],
    },
    recommended: {
      borderRadius: "rounded-none",
      shadow: "shadow-[4px_4px_0_#000] md:shadow-[8px_8px_0_#000]",
      transition: "transition-all duration-200",
      spacing: "p-4 md:p-6",
    },
    colors: {
      allowedPalettes: ["black", "white", "yellow", "cyan", "magenta", "red", "blue"],
      forbiddenColors: ["gray-300", "gray-400", "slate-300", "neutral-300"],
      contrastMinimum: "AAA",
    },
    typography: {
      headingFont: "font-black",
      bodyFont: "font-mono",
      allowedWeights: [400, 700, 800, 900],
    },
  },

  // ==================== SOFT/MODERN FAMILY ====================

  "neumorphism": {
    slug: "neumorphism",
    name: "Neumorphism",
    forbidden: {
      classes: [
        "rounded-none", "rounded-sm",
        "border-2", "border-4", "border-black",
        "shadow-[", // Hard shadows
        "bg-gradient-to-r",
        "text-black",
      ],
      patterns: [
        /rounded-none/,
        /rounded-sm$/,
        /border-[2-9]/,
        /border-black/,
        /shadow-\[\d+px_\d+px_0/,  // Hard offset shadows
      ],
      reasons: {
        "rounded-none": "Neumorphism requires soft corners (rounded-xl+)",
        "border-black": "Neumorphism uses no visible borders",
        "shadow-[4px_4px_0": "Use soft dual shadows, not hard offsets",
        "text-black": "Use soft grays like text-gray-700",
      },
    },
    required: {
      button: [
        "bg-[#e0e5ec]",
        "rounded-xl",
        "hover:shadow-[3px_3px_6px_#b8bec7,-3px_-3px_6px_#ffffff]",
        "active:shadow-[inset_5px_5px_10px_#b8bec7,inset_-5px_-5px_10px_#ffffff]",
        "transition-all",
        "duration-200",
      ],
      card: [
        "bg-[#e0e5ec]",
        "rounded-2xl",
      ],
      input: [
        "bg-[#e0e5ec]",
        "rounded-xl",
        "focus:shadow-[inset_3px_3px_6px_#b8bec7,inset_-3px_-3px_6px_#ffffff]",
        "focus:outline-none",
        "transition-all",
        "duration-200",
      ],
    },
    recommended: {
      borderRadius: "rounded-xl or rounded-2xl",
      shadow: "shadow-[-6px_-6px_14px_#fff,6px_6px_14px_rgba(0,0,0,0.15)]",
      transition: "transition-all duration-200",
      spacing: "p-6 md:p-8",
    },
    colors: {
      allowedPalettes: ["gray", "slate", "stone", "neutral"],
      forbiddenColors: ["black", "white"], // Pure black/white breaks the effect
      contrastMinimum: "AA",
    },
    typography: {
      headingFont: "font-semibold",
      bodyFont: "font-sans",
      allowedWeights: [400, 500, 600],
    },
  },

  "soft-ui": {
    slug: "soft-ui",
    name: "Soft UI",
    forbidden: {
      classes: [
        "rounded-none", "rounded-sm",
        "border-2", "border-4", "border-black",
        "shadow-[0_0_0", // Hard shadows with 0 blur
        "bg-black", "text-black",
      ],
      patterns: [
        /rounded-none/,
        /rounded-sm$/,
        /border-black/,
        /shadow-\[\d+px_\d+px_0_/,
      ],
      reasons: {
        "rounded-none": "Soft UI requires large rounded corners (rounded-2xl+)",
        "border-black": "Soft UI avoids harsh borders",
        "bg-black": "Soft UI uses soft colors, not pure black",
      },
    },
    required: {
      button: [
        "rounded-2xl",
        "font-medium",
        "hover:-translate-y-0.5",
        "hover:shadow-xl",
        "transition-all",
        "duration-200",
      ],
      card: [
        "bg-white",
        "rounded-3xl",
        "shadow-xl",
        "shadow-gray-200/50",
        "transition-all",
        "duration-300",
      ],
      input: [
        "bg-gray-50",
        "border-0",
        "rounded-2xl",
        "focus:ring-2",
        "focus:ring-indigo-500/50",
        "focus:bg-white",
        "transition-all",
        "duration-200",
      ],
    },
    recommended: {
      borderRadius: "rounded-2xl or rounded-3xl",
      shadow: "shadow-lg shadow-[color]/30",
      transition: "transition-all duration-200",
      spacing: "p-6 md:p-8",
    },
    colors: {
      allowedPalettes: ["indigo", "pink", "emerald", "slate", "gray"],
      forbiddenColors: ["black", "gray-900"],
      contrastMinimum: "AA",
    },
    typography: {
      headingFont: "font-semibold",
      bodyFont: "font-normal",
      allowedWeights: [400, 500, 600],
    },
  },

  // ==================== GLASS FAMILY ====================

  "glassmorphism": {
    slug: "glassmorphism",
    name: "Glassmorphism",
    forbidden: {
      classes: [
        "rounded-none", "rounded-sm",
        "bg-white", "bg-gray-50", "bg-slate-50", // Opaque backgrounds
        "shadow-[4px_4px_0", // Hard shadows
        "border-2", "border-4", "border-black",
      ],
      patterns: [
        /bg-white$/,
        /bg-gray-[1-3]00$/,
        /bg-slate-[1-3]00$/,
        /rounded-none/,
        /shadow-\[\d+px_\d+px_0/,
      ],
      reasons: {
        "bg-white": "Glassmorphism requires translucent backgrounds (bg-white/10)",
        "rounded-none": "Use rounded corners (rounded-xl+)",
        "shadow-[4px_4px_0": "Use soft shadows, not hard offsets",
        "border-black": "Use subtle white borders (border-white/20)",
      },
    },
    required: {
      button: [
        "backdrop-blur-2xl",
        "backdrop-saturate-150",
        "border",
        "border-white/40",
        "rounded-2xl",
        "text-white",
        "hover:bg-white/35",
        "hover:shadow-xl",
        "transition-all",
        "duration-300",
        "ease-out",
      ],
      card: [
        "bg-white/20",
        "backdrop-blur-3xl",
        "backdrop-saturate-150",
        "border",
        "border-white/30",
        "rounded-3xl",
        "shadow-xl",
        "[background-image:linear-gradient(to_bottom,rgba(255,255,255,0.15),transparent)]",
      ],
      container: [
        // Must have vibrant background behind glass elements
      ],
      input: [
        "bg-white/15",
        "backdrop-blur-2xl",
        "backdrop-saturate-150",
        "border",
        "border-white/30",
        "rounded-2xl",
        "text-white",
        "focus:outline-none",
        "focus:border-white/50",
        "focus:bg-white/25",
        "focus:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
        "transition-all",
        "duration-300",
        "ease-out",
      ],
    },
    recommended: {
      borderRadius: "rounded-xl or rounded-2xl",
      shadow: "shadow-xl shadow-black/10",
      transition: "transition-all duration-300",
      spacing: "p-6 md:p-8",
    },
    colors: {
      allowedPalettes: ["white", "violet", "fuchsia", "cyan", "blue"],
      forbiddenColors: [],
      contrastMinimum: "AA",
    },
    typography: {
      headingFont: "font-semibold",
      bodyFont: "font-normal",
      allowedWeights: [400, 500, 600, 700],
    },
  },

  "modern-gradient": {
    slug: "modern-gradient",
    name: "Modern Gradient",
    forbidden: {
      classes: [
        "bg-white", "bg-gray-50", "bg-slate-50",
        "rounded-none", "rounded-sm",
        "text-gray-900", "text-black",
        "shadow-sm", "shadow-md",
      ],
      patterns: [
        /bg-white$/,
        /bg-gray-[1-4]00$/,
        /text-gray-[89]00$/,
        /text-black$/,
        /rounded-none/,
      ],
      reasons: {
        "bg-white": "Modern Gradient uses dark backgrounds",
        "text-black": "Use text-white on dark backgrounds",
        "shadow-sm": "Use colored shadows (shadow-violet-500/30)",
      },
    },
    required: {
      button: [
        "rounded-2xl",
        "font-medium",
        "transition-all",
        "duration-300",
        "text-white",
      ],
      card: [
        "backdrop-blur-xl",
        "bg-white/10",
        "border",
        "border-white/20",
        "rounded-3xl",
      ],
      input: [
        "backdrop-blur-xl",
        "bg-white/10",
        "border",
        "border-white/20",
        "rounded-2xl",
        "text-white",
        "placeholder:text-white/40",
        "focus:border-violet-500/50",
        "focus:ring-2",
        "focus:ring-violet-500/20",
      ],
    },
    recommended: {
      borderRadius: "rounded-2xl or rounded-3xl",
      shadow: "shadow-xl shadow-violet-500/30",
      transition: "transition-all duration-300",
      spacing: "p-6 md:p-8",
    },
    colors: {
      allowedPalettes: ["violet", "fuchsia", "cyan", "blue", "slate"],
      forbiddenColors: ["white", "gray-100", "gray-200"],
      contrastMinimum: "AA",
    },
    typography: {
      headingFont: "font-bold",
      bodyFont: "font-normal",
      allowedWeights: [400, 500, 600, 700],
    },
  },

  // ==================== MINIMAL FAMILY ====================

  "minimalist-flat": {
    slug: "minimalist-flat",
    name: "Minimalist Flat",
    forbidden: {
      classes: [
        "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl",
        "bg-gradient-to-r", "bg-gradient-to-l", "bg-gradient-to-t", "bg-gradient-to-b",
        "blur", "backdrop-blur",
        "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl",
      ],
      patterns: [
        /shadow-(?!none)/,
        /bg-gradient/,
        /blur-/,
        /rounded-[lx2-9]/,
      ],
      reasons: {
        "shadow-md": "Flat design has NO shadows",
        "bg-gradient-to-r": "Flat design uses solid colors only",
        "rounded-xl": "Use sharp corners (rounded-none) or full rounds (rounded-full)",
      },
    },
    required: {
      button: [
        "border-2",
        "border-black",
        "font-medium",
        "hover:bg-white",
        "hover:text-black",
        "transition-colors",
        "duration-200",
      ],
      card: [
        "border-2",
        "border-black",
        "transition-colors",
        "duration-200",
      ],
      input: [
        "border-0",
        "border-b-2",
        "border-black",
        "bg-transparent",
        "focus:outline-none",
        "focus:border-[#ff3366]",
        "transition-colors",
        "duration-200",
      ],
    },
    recommended: {
      borderRadius: "rounded-none or rounded-full (consistent)",
      shadow: "shadow-none",
      transition: "transition-colors duration-200",
      spacing: "p-4 md:p-6",
    },
    colors: {
      allowedPalettes: ["black", "white", "red", "blue", "yellow", "green"],
      forbiddenColors: ["gray-300", "gray-400", "gray-500"],
      contrastMinimum: "AAA",
    },
    typography: {
      headingFont: "font-bold",
      bodyFont: "font-sans",
      allowedWeights: [400, 700],
    },
  },

  // ==================== CORPORATE FAMILY ====================

  "corporate-clean": {
    slug: "corporate-clean",
    name: "Corporate Clean",
    forbidden: {
      classes: [
        "rounded-2xl", "rounded-3xl", "rounded-full",
        "shadow-[4px_4px_0", // Hard shadows
        "bg-gradient-to-r from-pink", "bg-gradient-to-r from-purple",
        "text-pink", "text-purple", "text-cyan",
        "font-black",
      ],
      patterns: [
        /rounded-[2-9]xl/,
        /rounded-full/,
        /shadow-\[\d+px_\d+px_0/,
        /text-pink/,
        /text-purple/,
        /font-black/,
      ],
      reasons: {
        "rounded-2xl": "Corporate uses subtle corners (rounded-lg max)",
        "text-pink": "Use professional colors (blue, gray, slate)",
        "font-black": "Use professional weights (font-semibold max)",
      },
    },
    required: {
      button: [
        "rounded-lg",
        "font-medium",
        "transition-all",
        "duration-200",
      ],
      card: [
        "bg-white",
        "rounded-xl",
        "shadow-sm",
        "border",
        "border-gray-200",
      ],
      input: [
        "border",
        "border-gray-300",
        "rounded-lg",
        "focus:ring-2",
        "focus:ring-blue-500",
        "focus:border-blue-500",
      ],
    },
    recommended: {
      borderRadius: "rounded-md or rounded-lg",
      shadow: "shadow-sm or shadow-md",
      transition: "transition-colors duration-200",
      spacing: "p-4 md:p-6",
    },
    colors: {
      allowedPalettes: ["blue", "gray", "slate", "white", "green", "red"],
      forbiddenColors: ["pink-500", "purple-500", "cyan-400"],
      contrastMinimum: "AA",
    },
    typography: {
      headingFont: "font-semibold",
      bodyFont: "font-normal",
      allowedWeights: [400, 500, 600],
    },
  },

  // ==================== ORGANIC FAMILY ====================

  "natural-organic": {
    slug: "natural-organic",
    name: "Natural Organic",
    forbidden: {
      classes: [
        "bg-blue-500", "bg-purple-500", "bg-cyan-500",
        "text-black",
        "rounded-none", "rounded-sm",
        "shadow-lg", "shadow-xl", "shadow-2xl",
        "bg-gradient-to-r",
      ],
      patterns: [
        /bg-blue-/,
        /bg-purple-/,
        /bg-cyan-/,
        /text-black$/,
        /rounded-none/,
        /shadow-[lx2]/,
        /bg-gradient/,
      ],
      reasons: {
        "bg-blue-500": "Natural Organic uses warm earth tones, not cool colors",
        "text-black": "Use warm dark colors like text-stone-800",
        "rounded-none": "Use organic shapes (rounded-full, rounded-[2rem])",
        "shadow-xl": "Keep shadows subtle",
      },
    },
    required: {
      button: [
        "rounded-full",
        "font-medium",
        "transition-colors",
        "duration-300",
      ],
      card: [
        "bg-[#faf6f1]",
        "rounded-[2rem]",
        "border",
        "border-stone-200",
      ],
      input: [
        "bg-white",
        "border",
        "border-stone-200",
        "rounded-full",
        "text-stone-800",
        "placeholder:text-stone-400",
        "focus:border-stone-400",
        "focus:ring-2",
        "focus:ring-stone-200",
        "transition-all",
        "duration-300",
      ],
    },
    recommended: {
      borderRadius: "rounded-full or rounded-[2rem]",
      shadow: "shadow-sm or shadow-none",
      transition: "transition-colors duration-300",
      spacing: "p-6 md:p-8",
    },
    colors: {
      allowedPalettes: ["stone", "amber", "orange", "green", "olive"],
      forbiddenColors: ["blue-500", "purple-500", "cyan-500", "black"],
      contrastMinimum: "AA",
    },
    typography: {
      headingFont: "font-serif",
      bodyFont: "font-sans",
      allowedWeights: [400, 500, 600],
    },
  },

  // ==================== DARK MODE FAMILY ====================

  "dark-mode": {
    slug: "dark-mode",
    name: "Dark Mode (OLED)",
    forbidden: {
      classes: [
        "bg-white", "bg-gray-50", "bg-slate-50",
        "shadow-gray-200", "shadow-gray-300",
      ],
      patterns: [
        /bg-white$/,
        /bg-gray-[1-3]00$/,
        /bg-slate-[1-3]00$/,
      ],
      reasons: {
        "bg-white": "Dark mode uses dark backgrounds",
        "shadow-gray-200": "Shadows don't work well on dark backgrounds",
      },
    },
    required: {
      button: [
        "rounded-lg",
        "font-medium",
        "transition-all",
        "duration-200",
      ],
      card: [
        "bg-gray-800",
        "border",
        "border-gray-700",
        "rounded-lg",
      ],
      input: [
        "bg-gray-800",
        "border",
        "border-gray-700",
        "rounded-lg",
        "text-gray-100",
        "placeholder:text-gray-500",
        "focus:border-blue-500",
        "focus:ring-2",
        "focus:ring-blue-500/30",
      ],
    },
    recommended: {
      borderRadius: "rounded-lg or rounded-xl",
      shadow: "shadow-none or shadow-lg shadow-black/20",
      transition: "transition-colors duration-200",
      spacing: "p-4 md:p-6",
    },
    colors: {
      allowedPalettes: ["slate", "gray", "blue", "green", "red", "amber"],
      forbiddenColors: ["white", "gray-50", "gray-100"],
      contrastMinimum: "AA",
    },
    typography: {
      headingFont: "font-semibold",
      bodyFont: "font-normal",
      allowedWeights: [400, 500, 600],
    },
  },

  // ==================== RETRO FAMILY ====================

  "cyberpunk-neon": {
    slug: "cyberpunk-neon",
    name: "Cyberpunk Neon",
    forbidden: {
      classes: [
        "bg-white", "bg-gray-50", "bg-slate-50",
        "shadow-sm", "shadow-md", // Use neon glows
        "font-serif",
        "rounded-2xl", "rounded-3xl", "rounded-full",
      ],
      patterns: [
        /bg-white$/,
        /bg-gray-[1-5]00$/,
        /shadow-(?!(\[|none|cyan|pink|green))/,
        /font-serif/,
        /rounded-[2-9]xl/,
      ],
      reasons: {
        "bg-white": "Cyberpunk uses dark backgrounds only",
        "shadow-md": "Use neon glow shadows (shadow-cyan-500/50)",
        "font-serif": "Use monospace fonts for terminal aesthetic",
        "rounded-2xl": "Use sharp or slightly rounded corners",
      },
    },
    required: {
      button: [
        "rounded-lg",
        "font-mono",
        "uppercase",
        "tracking-wider",
        "transition-all",
        "duration-300",
      ],
      card: [
        "bg-gray-950",
        "border",
        "border-cyan-400/30",
        "rounded-lg",
      ],
      input: [
        "bg-gray-950",
        "border",
        "border-cyan-400/30",
        "rounded-lg",
        "text-cyan-400",
        "font-mono",
        "focus:border-cyan-400",
        "focus:shadow-[0_0_15px_rgba(0,255,255,0.3)]",
      ],
    },
    recommended: {
      borderRadius: "rounded-none or rounded-lg",
      shadow: "shadow-[0_0_20px_rgba(34,211,238,0.5)]",
      transition: "transition-all duration-200",
      spacing: "p-4 md:p-6",
    },
    colors: {
      allowedPalettes: ["cyan", "pink", "green", "purple", "slate"],
      forbiddenColors: ["white", "gray-100", "gray-200", "brown", "orange"],
      contrastMinimum: "AA",
    },
    typography: {
      headingFont: "font-mono font-bold",
      bodyFont: "font-mono",
      allowedWeights: [400, 700],
    },
  },

  "retro-vintage": {
    slug: "retro-vintage",
    name: "Retro Vintage",
    forbidden: {
      classes: [
        "bg-gradient-to-r from-violet", "bg-gradient-to-r from-cyan",
        "shadow-[0_0_20px", // Neon glows
        "font-mono",
        "text-cyan", "text-pink", "text-purple",
      ],
      patterns: [
        /bg-gradient.*violet/,
        /bg-gradient.*cyan/,
        /shadow-\[0_0_\d+px/,  // Neon glows
        /text-cyan/,
        /text-pink/,
      ],
      reasons: {
        "bg-gradient-to-r from-violet": "Use warm, vintage colors",
        "shadow-[0_0_20px": "No neon glows in vintage style",
        "font-mono": "Use serif fonts for vintage aesthetic",
        "text-cyan": "Use warm colors (amber, orange, brown)",
      },
    },
    required: {
      button: [
        "font-serif",
        "uppercase",
        "tracking-widest",
        "transition-colors",
        "duration-200",
        "border-2",
      ],
      card: [
        "border-2",
        "border-[#8b4513]",
        "bg-[#f5e6d3]",
      ],
      input: [
        "border-2",
        "border-[#8b4513]",
        "bg-transparent",
        "text-[#8b4513]",
        "font-serif",
        "focus:outline-none",
        "focus:bg-[#8b4513]/5",
        "transition-colors",
        "duration-200",
        "focus:border-[#5c2e0a]",
      ],
    },
    recommended: {
      borderRadius: "rounded-sm or rounded-none",
      shadow: "shadow-md",
      transition: "transition-colors duration-200",
      spacing: "p-4 md:p-6",
    },
    colors: {
      allowedPalettes: ["amber", "orange", "brown", "cream", "sepia"],
      forbiddenColors: ["cyan-500", "pink-500", "violet-500", "blue-500"],
      contrastMinimum: "AA",
    },
    typography: {
      headingFont: "font-serif",
      bodyFont: "font-serif",
      allowedWeights: [400, 600, 700],
    },
  },

  // ==================== LAYOUT STYLES ====================

  "bento-grid": {
    slug: "bento-grid",
    name: "Bento Box Grid",
    forbidden: {
      classes: [
        "rounded-none", "rounded-sm",
        "shadow-[4px_4px_0", // Hard shadows
        "gap-1", "gap-2", // Too tight spacing
      ],
      patterns: [
        /rounded-none/,
        /rounded-sm$/,
        /shadow-\[\d+px_\d+px_0/,
        /gap-[12]$/,
      ],
      reasons: {
        "rounded-none": "Bento uses rounded corners (rounded-2xl+)",
        "shadow-[4px_4px_0": "Use soft shadows",
        "gap-2": "Bento needs generous spacing (gap-4+)",
      },
    },
    required: {
      card: [
        "rounded-2xl",
        "border",
        "border-zinc-100",
        "shadow-sm",
        "transition-all",
        "duration-300",
      ],
      container: [
        "grid",
        "gap-4",
      ],
          button: [
        "rounded-xl",
        "font-medium",
        "transition-all",
      ],
      input: [
        "bg-zinc-50",
        "border",
        "border-zinc-200",
        "rounded-xl",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-blue-500/20",
        "focus:border-blue-500",
        "transition-all",
      ],
    },
    recommended: {
      borderRadius: "rounded-2xl or rounded-3xl",
      shadow: "shadow-sm or shadow-md",
      transition: "transition-all duration-200",
      spacing: "gap-4 md:gap-6",
    },
    colors: {
      allowedPalettes: ["white", "gray", "slate", "zinc"],
      forbiddenColors: [],
      contrastMinimum: "AA",
    },
    typography: {
      headingFont: "font-semibold",
      bodyFont: "font-normal",
      allowedWeights: [400, 500, 600],
    },
  },

  "editorial": {
    slug: "editorial",
    name: "Editorial",
    forbidden: {
      classes: [
        "font-mono", "font-black",
        "rounded-2xl", "rounded-3xl", "rounded-full",
        "shadow-lg", "shadow-xl", "shadow-2xl",
        "bg-gradient-to-r",
      ],
      patterns: [
        /font-mono/,
        /font-black/,
        /rounded-[2-9]xl/,
        /rounded-full/,
        /shadow-[lx2]/,
        /bg-gradient/,
      ],
      reasons: {
        "font-mono": "Editorial uses serif fonts",
        "rounded-2xl": "Editorial uses subtle or no corners",
        "shadow-xl": "Editorial relies on typography, not shadows",
        "bg-gradient-to-r": "Editorial uses solid colors",
      },
    },
    required: {
      button: [
        "text-xs",
        "tracking-[0.2em]",
        "transition-colors",
        "font-sans",
      ],
      card: [
        "border-[#1C1C1C]/10",
        "transition-colors",
        "border-b",
      ],
      input: [
        "border-[#1C1C1C]/20",
        "text-xl",
        "focus:outline-none",
        "focus:border-[#1C1C1C]",
        "transition-colors",
        "border-b",
      ],
    },
    recommended: {
      borderRadius: "rounded-none or rounded-sm",
      shadow: "shadow-none",
      transition: "transition-colors duration-200",
      spacing: "py-8 md:py-12",
    },
    colors: {
      allowedPalettes: ["gray", "slate", "stone", "gold", "black", "white"],
      forbiddenColors: ["cyan-500", "pink-500", "green-400"],
      contrastMinimum: "AAA",
    },
    typography: {
      headingFont: "font-serif",
      bodyFont: "font-sans",
      allowedWeights: [400, 500, 600, 700],
    },
  },
};

/**
 * Get lint rules for a style
 */
export function getStyleLintRules(slug: string): StyleLintRule | undefined {
  return styleLintRules[slug];
}

/**
 * Get all style slugs that have lint rules
 */
export function getStylesWithLintRules(): string[] {
  return Object.keys(styleLintRules);
}

/**
 * Check if a class is forbidden for a style
 */
export function isForbiddenClass(slug: string, className: string): { forbidden: boolean; reason?: string } {
  const rules = styleLintRules[slug];
  if (!rules) return { forbidden: false };

  // Check exact match
  if (rules.forbidden.classes.includes(className)) {
    return {
      forbidden: true,
      reason: rules.forbidden.reasons[className] || `"${className}" is forbidden in ${rules.name}`,
    };
  }

  // Check pattern match
  for (const pattern of rules.forbidden.patterns) {
    if (pattern.test(className)) {
      return {
        forbidden: true,
        reason: rules.forbidden.reasons[className] || `"${className}" matches forbidden pattern in ${rules.name}`,
      };
    }
  }

  return { forbidden: false };
}

/**
 * Get required classes for a component in a style
 */
export function getRequiredClasses(slug: string, component: "button" | "card" | "input" | "container"): string[] {
  const rules = styleLintRules[slug];
  if (!rules) return [];
  return rules.required[component] || [];
}
