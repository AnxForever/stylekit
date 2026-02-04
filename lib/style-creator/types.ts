/**
 * Style Creator Type Definitions
 */

// Custom style definition
export interface CustomStyleDefinition {
  colors: {
    primary: string;
    secondary: string;
    accent: string[];
    background: string;
    foreground: string;
    muted: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      "2xl": string;
      "3xl": string;
      "4xl": string;
    };
  };
  spacing: {
    unit: number;
    containerMaxWidth: string;
  };
  borders: {
    radius: string;
    width: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

// Stored custom style (with metadata)
export interface StoredCustomStyle {
  id: string;
  name: string;
  nameEn: string;
  createdAt: string;
  updatedAt: string;
  definition: CustomStyleDefinition;
}

// Default style definition
export const defaultStyleDefinition: CustomStyleDefinition = {
  colors: {
    primary: "#3b82f6",
    secondary: "#f1f5f9",
    accent: ["#8b5cf6", "#ec4899", "#f59e0b"],
    background: "#ffffff",
    foreground: "#0f172a",
    muted: "#64748b",
  },
  typography: {
    headingFont: "system-ui, -apple-system, sans-serif",
    bodyFont: "system-ui, -apple-system, sans-serif",
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
  },
  spacing: {
    unit: 4,
    containerMaxWidth: "1200px",
  },
  borders: {
    radius: "0.5rem",
    width: "1px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
  },
};

// Preset color schemes
export interface ColorPreset {
  id: string;
  name: string;
  nameEn: string;
  colors: CustomStyleDefinition["colors"];
}

export const colorPresets: ColorPreset[] = [
  {
    id: "blue-slate",
    name: "蓝灰商务",
    nameEn: "Blue Slate",
    colors: {
      primary: "#3b82f6",
      secondary: "#f1f5f9",
      accent: ["#8b5cf6", "#ec4899", "#f59e0b"],
      background: "#ffffff",
      foreground: "#0f172a",
      muted: "#64748b",
    },
  },
  {
    id: "emerald-fresh",
    name: "清新绿意",
    nameEn: "Emerald Fresh",
    colors: {
      primary: "#10b981",
      secondary: "#f0fdf4",
      accent: ["#06b6d4", "#84cc16", "#fbbf24"],
      background: "#ffffff",
      foreground: "#064e3b",
      muted: "#6b7280",
    },
  },
  {
    id: "purple-dream",
    name: "梦幻紫境",
    nameEn: "Purple Dream",
    colors: {
      primary: "#8b5cf6",
      secondary: "#faf5ff",
      accent: ["#ec4899", "#6366f1", "#f472b6"],
      background: "#ffffff",
      foreground: "#1e1b4b",
      muted: "#6b7280",
    },
  },
  {
    id: "warm-orange",
    name: "暖橙活力",
    nameEn: "Warm Orange",
    colors: {
      primary: "#f97316",
      secondary: "#fff7ed",
      accent: ["#ef4444", "#fbbf24", "#84cc16"],
      background: "#ffffff",
      foreground: "#431407",
      muted: "#78716c",
    },
  },
  {
    id: "dark-mode",
    name: "深邃暗夜",
    nameEn: "Dark Mode",
    colors: {
      primary: "#60a5fa",
      secondary: "#1e293b",
      accent: ["#a78bfa", "#f472b6", "#fbbf24"],
      background: "#0f172a",
      foreground: "#f8fafc",
      muted: "#94a3b8",
    },
  },
  {
    id: "monochrome",
    name: "黑白极简",
    nameEn: "Monochrome",
    colors: {
      primary: "#18181b",
      secondary: "#f4f4f5",
      accent: ["#71717a", "#a1a1aa", "#d4d4d8"],
      background: "#ffffff",
      foreground: "#09090b",
      muted: "#71717a",
    },
  },
];

// Font options
export interface FontOption {
  value: string;
  label: string;
  category: "sans" | "serif" | "mono";
}

export const fontOptions: FontOption[] = [
  { value: "system-ui, -apple-system, sans-serif", label: "System UI", category: "sans" },
  { value: "'Inter', sans-serif", label: "Inter", category: "sans" },
  { value: "'Helvetica Neue', Helvetica, sans-serif", label: "Helvetica", category: "sans" },
  { value: "Georgia, 'Times New Roman', serif", label: "Georgia", category: "serif" },
  { value: "'Playfair Display', serif", label: "Playfair Display", category: "serif" },
  { value: "'Merriweather', serif", label: "Merriweather", category: "serif" },
  { value: "'SF Mono', 'Fira Code', monospace", label: "Mono", category: "mono" },
];

// Border radius presets
export const radiusPresets = [
  { value: "0", label: "None" },
  { value: "0.25rem", label: "Small" },
  { value: "0.5rem", label: "Medium" },
  { value: "0.75rem", label: "Large" },
  { value: "1rem", label: "XL" },
  { value: "9999px", label: "Full" },
];
