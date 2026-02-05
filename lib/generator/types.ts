/**
 * Template Generator Type Definitions
 */

import type { DesignStyle } from "@/lib/styles";

// Template types
export type TemplateType = "landing" | "portfolio" | "blog" | "dashboard";

// Output formats
export type OutputFormat = "html" | "react";

// Section configuration
export interface SectionConfig {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  enabled: boolean;
  content: Record<string, string>;
}

// Template definition
export interface TemplateDefinition {
  type: TemplateType;
  name: string;
  nameEn: string;
  description: string;
  sections: SectionDefinition[];
}

// Section definition (template's default sections)
export interface SectionDefinition {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  defaultEnabled: boolean;
  fields: FieldDefinition[];
}

// Field definition
export interface FieldDefinition {
  id: string;
  label: string;
  labelEn: string;
  type: "text" | "textarea" | "number" | "color" | "image";
  defaultValue: string;
  placeholder?: string;
}

// Generator configuration (user input)
export interface GeneratorConfig {
  styleSlug: string;
  templateType: TemplateType;
  outputFormat: OutputFormat;
  sections: SectionConfig[];
  globalContent: {
    siteName: string;
    siteDescription: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
}

// Generated file
export interface GeneratedFile {
  name: string;
  content: string;
  type: "html" | "css" | "js" | "md" | "json";
}

// Generation result
export interface GenerationResult {
  success: boolean;
  files: GeneratedFile[];
  previewHtml: string;
  error?: string;
}

// Custom style definition (for style creator)
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

// Stored custom style
export interface StoredCustomStyle {
  id: string;
  name: string;
  nameEn: string;
  createdAt: string;
  updatedAt: string;
  definition: CustomStyleDefinition;
}

// Style for generator (union of built-in and custom)
export type GeneratorStyle =
  | { type: "builtin"; slug: string; style: DesignStyle }
  | { type: "custom"; id: string; style: StoredCustomStyle };

// Style input for renderer functions
export type StyleInput =
  | { type: "builtin"; style: DesignStyle }
  | { type: "custom"; style: StoredCustomStyle };

// Preview state
export interface PreviewState {
  html: string;
  css: string;
  loading: boolean;
  error?: string;
}
