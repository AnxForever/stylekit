// Knowledge Base - Shared Type Definitions
// Converted from ui-ux-pro-max skill CSV data

// ============ COMMON TYPES ============

export type Severity = "Critical" | "High" | "Medium" | "Low";
export type Platform = "Web" | "Mobile" | "All";

// ============ PRODUCT & STYLE RECOMMENDATIONS ============

export interface ProductRecommendation {
  type: string;
  keywords: string[];
  primaryStyle: string;
  secondaryStyles: string[];
  landingPattern: string;
  dashboardStyle: string;
  colorFocus: string;
  considerations: string;
}

export interface ReasoningRule {
  category: string;
  recommendedPattern: string;
  stylePriority: string[];
  colorMood: string;
  typographyMood: string;
  keyEffects: string;
  decisionRules: Record<string, string>;
  antiPatterns: string[];
  severity: Severity;
}

// ============ COLOR PALETTES ============

export interface ColorPalette {
  productType: string;
  primary: string;
  secondary: string;
  cta: string;
  background: string;
  text: string;
  border: string;
  notes: string;
}

// ============ TYPOGRAPHY ============

export interface FontPairing {
  name: string;
  category: string;
  headingFont: string;
  bodyFont: string;
  mood: string[];
  bestFor: string[];
  googleFontsUrl: string;
  cssImport: string;
  tailwindConfig: string;
  notes: string;
}

// ============ LANDING PAGE PATTERNS ============

export interface LandingPattern {
  name: string;
  keywords: string[];
  sectionOrder: string[];
  primaryCtaPlacement: string;
  colorStrategy: string;
  recommendedEffects: string;
  conversionOptimization: string;
}

// ============ CHARTS ============

export interface ChartRecommendation {
  dataType: string;
  keywords: string[];
  bestChartType: string;
  secondaryOptions: string[];
  colorGuidance: string;
  performanceImpact: string;
  accessibilityNotes: string;
  libraryRecommendation: string[];
  interactiveLevel: string;
}

// ============ ICONS ============

export interface IconEntry {
  category: string;
  name: string;
  keywords: string[];
  library: string;
  importCode: string;
  usage: string;
  bestFor: string;
  style: string;
}

// ============ UX / WEB / REACT GUIDELINES ============

export interface Guideline {
  category: string;
  issue: string;
  keywords: string[];
  platform: Platform;
  description: string;
  do: string;
  dont: string;
  codeGood: string;
  codeBad: string;
  severity: Severity;
}

export interface UXGuideline extends Guideline {}
export interface WebGuideline extends Guideline {}
export interface ReactGuideline extends Guideline {}

// ============ STACK GUIDELINES ============

export interface StackGuideline {
  category: string;
  guideline: string;
  description: string;
  do: string;
  dont: string;
  codeGood: string;
  codeBad: string;
  severity: Severity;
  docsUrl?: string;
}

export type StackId =
  | "nextjs"
  | "react"
  | "vue"
  | "nuxtjs"
  | "nuxt-ui"
  | "svelte"
  | "astro"
  | "shadcn"
  | "flutter"
  | "react-native"
  | "swiftui"
  | "jetpack-compose"
  | "html-tailwind";

// ============ SEARCH TYPES ============

export type SearchDomain =
  | "product"
  | "color"
  | "typography"
  | "landing"
  | "chart"
  | "icon"
  | "ux"
  | "web"
  | "react"
  | "reasoning"
  | "stack";

export interface SearchResult<T = unknown> {
  domain: SearchDomain;
  query: string;
  count: number;
  results: T[];
}

// ============ DESIGN RECOMMENDATION ============

export interface DesignRecommendation {
  productType: string;
  reasoning: ReasoningRule | null;
  style: {
    primary: string;
    secondary: string[];
  };
  colors: ColorPalette | null;
  typography: FontPairing | null;
  landingPattern: LandingPattern | null;
  charts: ChartRecommendation[];
  icons: IconEntry[];
  uxGuidelines: UXGuideline[];
  stackGuidelines: StackGuideline[];
}
