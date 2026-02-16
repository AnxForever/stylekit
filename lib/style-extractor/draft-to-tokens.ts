// Convert ExtractedStyleDraft → StyleTokens
// Maps raw extracted values (hex colors, CSS values) to Tailwind utility classes

import type { StyleTokens } from "@/lib/styles/tokens";
import type { ExtractedStyleDraft } from "./adapter";

// Common hex → Tailwind bg class mapping
const HEX_TO_BG: Record<string, string> = {
  "#ffffff": "bg-white",
  "#000000": "bg-black",
  "#f8fafc": "bg-slate-50",
  "#f1f5f9": "bg-slate-100",
  "#e2e8f0": "bg-slate-200",
  "#0f172a": "bg-slate-900",
  "#020617": "bg-slate-950",
  "#f9fafb": "bg-gray-50",
  "#f3f4f6": "bg-gray-100",
  "#111827": "bg-gray-900",
  "#030712": "bg-gray-950",
  "#fafafa": "bg-zinc-50",
  "#f4f4f5": "bg-zinc-100",
  "#18181b": "bg-zinc-900",
  "#09090b": "bg-zinc-950",
  "#fef2f2": "bg-red-50",
  "#ef4444": "bg-red-500",
  "#dc2626": "bg-red-600",
  "#eff6ff": "bg-blue-50",
  "#3b82f6": "bg-blue-500",
  "#2563eb": "bg-blue-600",
  "#1d4ed8": "bg-blue-700",
  "#f0fdf4": "bg-green-50",
  "#22c55e": "bg-green-500",
  "#16a34a": "bg-green-600",
  "#fefce8": "bg-yellow-50",
  "#eab308": "bg-yellow-500",
  "#faf5ff": "bg-purple-50",
  "#a855f7": "bg-purple-500",
  "#7c3aed": "bg-violet-600",
  "#ec4899": "bg-pink-500",
  "#f97316": "bg-orange-500",
  "#06b6d4": "bg-cyan-500",
  "#14b8a6": "bg-teal-500",
};

const HEX_TO_TEXT: Record<string, string> = {
  "#ffffff": "text-white",
  "#000000": "text-black",
  "#0f172a": "text-slate-900",
  "#1e293b": "text-slate-800",
  "#334155": "text-slate-700",
  "#475569": "text-slate-600",
  "#64748b": "text-slate-500",
  "#94a3b8": "text-slate-400",
  "#f8fafc": "text-slate-50",
  "#111827": "text-gray-900",
  "#374151": "text-gray-700",
  "#6b7280": "text-gray-500",
  "#9ca3af": "text-gray-400",
  "#f9fafb": "text-gray-50",
  "#18181b": "text-zinc-900",
  "#3f3f46": "text-zinc-700",
  "#71717a": "text-zinc-500",
  "#a1a1aa": "text-zinc-400",
  "#fafafa": "text-zinc-50",
  "#ef4444": "text-red-500",
  "#3b82f6": "text-blue-500",
  "#22c55e": "text-green-500",
};

function hexToBgClass(hex: string | undefined): string {
  if (!hex) return "bg-white";
  const normalized = hex.toLowerCase().trim();
  return HEX_TO_BG[normalized] ?? `bg-[${normalized}]`;
}

function hexToTextClass(hex: string | undefined): string {
  if (!hex) return "text-gray-900";
  const normalized = hex.toLowerCase().trim();
  return HEX_TO_TEXT[normalized] ?? `text-[${normalized}]`;
}

function hexToBtnClass(hex: string | undefined): string {
  if (!hex) return "bg-blue-600 text-white";
  const bg = hexToBgClass(hex);
  // Dark backgrounds get white text, light get dark text
  const isDark = isHexDark(hex);
  return `${bg} ${isDark ? "text-white" : "text-gray-900"}`;
}

function isHexDark(hex: string): boolean {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.5;
}

function fontToHeadingClass(font: string | undefined): string {
  if (!font) return "font-sans font-bold";
  const lower = font.toLowerCase();
  if (lower.includes("serif") && !lower.includes("sans")) return "font-serif font-bold";
  if (lower.includes("mono") || lower.includes("jetbrains") || lower.includes("fira")) return "font-mono font-bold";
  return "font-sans font-bold";
}

function fontToBodyClass(font: string | undefined): string {
  if (!font) return "font-sans";
  const lower = font.toLowerCase();
  if (lower.includes("serif") && !lower.includes("sans")) return "font-serif";
  if (lower.includes("mono") || lower.includes("jetbrains") || lower.includes("fira")) return "font-mono";
  return "font-sans";
}

function radiusToClass(radius: string | undefined): string {
  if (!radius) return "rounded-lg";
  const lower = radius.toLowerCase().trim();
  if (lower === "0" || lower === "0px" || lower === "none") return "rounded-none";
  if (lower.includes("9999") || lower === "full") return "rounded-full";
  const px = parseFloat(lower);
  if (!isNaN(px)) {
    if (px <= 2) return "rounded-sm";
    if (px <= 4) return "rounded";
    if (px <= 6) return "rounded-md";
    if (px <= 8) return "rounded-lg";
    if (px <= 12) return "rounded-xl";
    if (px <= 16) return "rounded-2xl";
    return "rounded-3xl";
  }
  // rem-based
  if (lower.includes("rem")) {
    const rem = parseFloat(lower);
    if (rem <= 0.25) return "rounded";
    if (rem <= 0.375) return "rounded-md";
    if (rem <= 0.5) return "rounded-lg";
    if (rem <= 0.75) return "rounded-xl";
    return "rounded-2xl";
  }
  return "rounded-lg";
}

function borderWidthToClass(width: string | undefined): string {
  if (!width) return "border";
  const lower = width.toLowerCase().trim();
  if (lower === "0" || lower === "0px" || lower === "none") return "border-0";
  const px = parseFloat(lower);
  if (!isNaN(px)) {
    if (px <= 1) return "border";
    if (px <= 2) return "border-2";
    if (px <= 4) return "border-4";
    return "border-8";
  }
  return "border";
}

function shadowToClass(shadow: string | undefined, size: "sm" | "md" | "lg"): string {
  if (!shadow) {
    return size === "sm" ? "shadow-sm" : size === "lg" ? "shadow-lg" : "shadow-md";
  }
  const lower = shadow.toLowerCase();
  if (lower === "none" || lower === "0") return "shadow-none";
  // If it's a raw CSS shadow value, use arbitrary
  if (lower.includes("px") || lower.includes("rgb")) {
    return `shadow-[${shadow.replace(/\s+/g, "_")}]`;
  }
  return size === "sm" ? "shadow-sm" : size === "lg" ? "shadow-lg" : "shadow-md";
}

/**
 * Convert an ExtractedStyleDraft into a full StyleTokens object.
 * Missing fields get sensible defaults.
 */
export function draftToTokens(draft: ExtractedStyleDraft): StyleTokens {
  const primary = draft.primaryColor;
  const secondary = draft.secondaryColor;
  const accents = draft.accentColors ?? [];

  const bgPrimary = hexToBgClass(secondary ?? "#ffffff");
  const bgSecondary = hexToBgClass(
    accents[0] ?? (secondary && primary ? secondary : "#f4f4f5")
  );
  const bgAccents = accents.slice(0, 3).map(hexToBgClass);
  if (bgAccents.length === 0) bgAccents.push(hexToBgClass(primary));

  const textPrimary = hexToTextClass(
    secondary && isHexDark(secondary) ? "#fafafa" : "#18181b"
  );
  const textSecondary = hexToTextClass(
    secondary && isHexDark(secondary) ? "#a1a1aa" : "#3f3f46"
  );
  const textMuted = hexToTextClass(
    secondary && isHexDark(secondary) ? "#71717a" : "#71717a"
  );

  return {
    border: {
      width: borderWidthToClass(draft.borderWidth),
      color: primary ? `border-[${primary}]` : "border-gray-200",
      radius: radiusToClass(draft.borderRadius),
    },
    shadow: {
      sm: shadowToClass(draft.shadowSm, "sm"),
      md: shadowToClass(draft.shadowMd, "md"),
      lg: shadowToClass(draft.shadowLg, "lg"),
      none: "shadow-none",
      hover: "hover:shadow-lg",
      focus: "focus:shadow-md focus:ring-2",
    },
    interaction: {
      hoverScale: "hover:scale-[1.02]",
      transition: "transition-all duration-200 ease-in-out",
      active: "active:scale-[0.98]",
    },
    typography: {
      heading: fontToHeadingClass(draft.headingFont),
      body: fontToBodyClass(draft.bodyFont),
      sizes: {
        hero: "text-4xl md:text-6xl lg:text-7xl",
        h1: "text-3xl md:text-5xl",
        h2: "text-2xl md:text-3xl",
        h3: "text-xl md:text-2xl",
        body: "text-base",
        small: "text-sm",
      },
    },
    spacing: {
      section: "py-12 md:py-20",
      container: "px-4 md:px-8",
      card: "p-4 md:p-6",
      gap: { sm: "gap-2", md: "gap-4", lg: "gap-8" },
    },
    colors: {
      background: {
        primary: bgPrimary,
        secondary: bgSecondary,
        accent: bgAccents,
      },
      text: {
        primary: textPrimary,
        secondary: textSecondary,
        muted: textMuted,
      },
      button: {
        primary: hexToBtnClass(primary),
        secondary: "bg-gray-100 text-gray-900 border border-gray-300",
        danger: "bg-red-600 text-white",
      },
    },
    forbidden: {
      classes: [],
      patterns: [],
      reasons: {},
    },
    required: {
      button: extractRequiredClasses(draft.buttonCode, "button"),
      card: extractRequiredClasses(draft.cardCode, "card"),
      input: extractRequiredClasses(draft.inputCode, "input"),
    },
  };
}

/** Extract Tailwind classes from component code snippets */
function extractRequiredClasses(
  code: string | undefined,
  component: "button" | "card" | "input"
): string[] {
  if (!code) {
    // Sensible defaults per component
    switch (component) {
      case "button":
        return ["px-4", "py-2", "font-medium", "rounded-lg", "transition-colors"];
      case "card":
        return ["rounded-lg", "border", "p-4"];
      case "input":
        return ["px-3", "py-2", "border", "rounded-lg", "text-sm"];
    }
  }

  // Extract class="..." or className="..." values
  const classRegex = /(?:class|className)=["']([^"']+)["']/g;
  const allClasses = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = classRegex.exec(code)) !== null) {
    for (const cls of match[1].split(/\s+/)) {
      if (cls.trim()) allClasses.add(cls.trim());
    }
  }

  return allClasses.size > 0 ? Array.from(allClasses).slice(0, 20) : [];
}

/**
 * Generate recipe skeletons from draft component code.
 * Returns a map of component name → Tailwind class arrays.
 */
export function draftToRecipeSkeleton(
  draft: ExtractedStyleDraft
): Record<string, { base: string[]; variants: Record<string, string[]> }> {
  const recipes: Record<string, { base: string[]; variants: Record<string, string[]> }> = {};

  if (draft.buttonCode) {
    recipes.button = {
      base: extractRequiredClasses(draft.buttonCode, "button"),
      variants: {
        primary: extractRequiredClasses(draft.buttonCode, "button"),
        secondary: ["px-4", "py-2", "border", "font-medium", "rounded-lg"],
      },
    };
  }

  if (draft.cardCode) {
    recipes.card = {
      base: extractRequiredClasses(draft.cardCode, "card"),
      variants: {
        default: extractRequiredClasses(draft.cardCode, "card"),
        elevated: [...extractRequiredClasses(draft.cardCode, "card"), "shadow-lg"],
      },
    };
  }

  if (draft.inputCode) {
    recipes.input = {
      base: extractRequiredClasses(draft.inputCode, "input"),
      variants: {
        default: extractRequiredClasses(draft.inputCode, "input"),
      },
    };
  }

  return recipes;
}
