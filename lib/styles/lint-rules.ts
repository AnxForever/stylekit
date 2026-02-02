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
        "border-2 border-black",
        "shadow-[4px_4px_0_#000]",
        "hover:shadow-none",
        "hover:translate-x-[2px] hover:translate-y-[2px]",
        "transition-all duration-200",
        "cursor-pointer",
      ],
      card: [
        "border-2 border-black",
        "shadow-[4px_4px_0_#000]",
      ],
      input: [
        "border-2 border-black",
        "bg-white",
        "focus:ring-0",
        "focus:border-black",
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

  "neubrutalism": {
    slug: "neubrutalism",
    name: "Neubrutalism",
    forbidden: {
      classes: [
        "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full",
        "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl",
        "blur", "backdrop-blur",
        "bg-gradient-to-r", "bg-gradient-to-l",
      ],
      patterns: [
        /rounded-[2-9]xl/,
        /rounded-full/,
        /shadow-(?!(\[|none))/,
        /blur-/,
      ],
      reasons: {
        "rounded-2xl": "Neubrutalism uses sharp or slightly rounded corners only",
        "shadow-lg": "Use hard offset shadows: shadow-[5px_5px_0_#000]",
        "blur": "Neubrutalism avoids blur effects",
      },
    },
    required: {
      button: [
        "border-[3px] border-black",
        "shadow-[5px_5px_0_#000]",
        "font-bold",
      ],
      card: [
        "border-[3px] border-black",
        "shadow-[5px_5px_0_#000]",
      ],
    },
    recommended: {
      borderRadius: "rounded-none or rounded-sm",
      shadow: "shadow-[5px_5px_0_#000]",
      transition: "transition-all duration-150",
      spacing: "p-4 md:p-6",
    },
    colors: {
      allowedPalettes: ["yellow", "red", "blue", "black", "white", "cyan", "magenta"],
      forbiddenColors: ["gray-200", "gray-300", "slate-200"],
      contrastMinimum: "AAA",
    },
    typography: {
      headingFont: "font-bold",
      bodyFont: "font-sans",
      allowedWeights: [400, 600, 700, 800],
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
        "shadow-[-6px_-6px_14px_rgba(255,255,255,0.7),6px_6px_14px_rgba(0,0,0,0.15)]",
      ],
      card: [
        "bg-[#e0e5ec]",
        "rounded-2xl",
        "shadow-[-8px_-8px_16px_rgba(255,255,255,0.7),8px_8px_16px_rgba(0,0,0,0.15)]",
      ],
      input: [
        "bg-[#e0e5ec]",
        "rounded-xl",
        "border-0",
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
        "shadow-lg",
        "hover:-translate-y-0.5",
        "hover:shadow-xl",
        "transition-all duration-200",
      ],
      card: [
        "bg-white",
        "rounded-3xl",
        "shadow-xl shadow-gray-200/50",
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
        "backdrop-blur-lg",
        "bg-white/10",
        "border border-white/20",
        "rounded-xl",
      ],
      card: [
        "backdrop-blur-xl",
        "bg-white/10",
        "border border-white/20",
        "rounded-2xl",
      ],
      container: [
        // Must have vibrant background behind glass elements
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
        "bg-gradient-to-r from-violet-600 to-fuchsia-600",
        "text-white",
        "rounded-2xl",
        "shadow-lg shadow-violet-500/25",
      ],
      card: [
        "backdrop-blur-xl",
        "bg-white/10",
        "border border-white/20",
        "rounded-3xl",
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

  "minimalism": {
    slug: "minimalism",
    name: "Minimalism / Swiss Style",
    forbidden: {
      classes: [
        "shadow-lg", "shadow-xl", "shadow-2xl",
        "bg-gradient-to-r", "bg-gradient-to-l",
        "blur", "backdrop-blur",
        "rounded-2xl", "rounded-3xl", "rounded-full",
        "border-4",
      ],
      patterns: [
        /shadow-[lx2]/,
        /bg-gradient/,
        /blur-/,
        /rounded-[2-9]xl/,
        /rounded-full/,
      ],
      reasons: {
        "shadow-lg": "Minimalism avoids heavy shadows",
        "bg-gradient-to-r": "Use solid colors only",
        "blur": "No blur effects in pure minimalism",
        "rounded-2xl": "Use subtle corners (rounded-lg max)",
      },
    },
    required: {
      button: [
        "font-medium",
        "transition-colors duration-200",
      ],
      card: [
        "border border-gray-200",
      ],
    },
    recommended: {
      borderRadius: "rounded-none or rounded-lg",
      shadow: "shadow-sm or shadow-none",
      transition: "transition-colors duration-200",
      spacing: "p-6 md:p-8 lg:p-12",
    },
    colors: {
      allowedPalettes: ["black", "white", "gray", "slate"],
      forbiddenColors: [],
      contrastMinimum: "AAA",
    },
    typography: {
      headingFont: "font-medium or font-semibold",
      bodyFont: "font-sans",
      allowedWeights: [400, 500, 600, 700],
    },
  },

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
        "border-2 border-black",
        "hover:bg-black hover:text-white",
        "transition-colors duration-200",
      ],
      card: [
        "border-2 border-black",
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
        "transition-colors duration-200",
      ],
      card: [
        "bg-white",
        "rounded-lg",
        "shadow-sm",
        "border border-gray-200",
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
        "transition-colors duration-300",
      ],
      card: [
        "bg-[#faf6f1]",
        "rounded-[2rem]",
        "border border-stone-200",
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
        "text-white", // Too bright on OLED
        "shadow-gray-200", "shadow-gray-300",
      ],
      patterns: [
        /bg-white$/,
        /bg-gray-[1-3]00$/,
        /bg-slate-[1-3]00$/,
        /text-white$/,  // Use text-slate-100 instead
      ],
      reasons: {
        "bg-white": "Dark mode uses dark backgrounds",
        "text-white": "Use slightly dimmed white (text-slate-100) for eye comfort",
        "shadow-gray-200": "Shadows don't work well on dark backgrounds",
      },
    },
    required: {
      button: [
        "bg-blue-600",
        "text-white",
        "rounded-lg",
      ],
      card: [
        "bg-slate-800",
        "border border-slate-700",
        "rounded-xl",
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
        "bg-cyan-400",
        "text-black",
        "font-mono",
        "shadow-[0_0_20px_rgba(34,211,238,0.5)]",
      ],
      card: [
        "bg-slate-900",
        "border border-cyan-500/30",
        "rounded-lg",
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
        "border-2",
        "rounded-sm",
      ],
      card: [
        "bg-amber-50",
        "border border-amber-200",
        "rounded-sm",
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
        "shadow-sm",
      ],
      container: [
        "grid",
        "gap-4",
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
        "font-serif",
        "tracking-wide",
      ],
      card: [
        "border-b border-gray-200",
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
