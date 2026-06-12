import type { StyleAtoms } from "./atoms";

export interface StyleVariant {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string[];
  };
  cssOverrides?: string;
}

export interface DesignStyle {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  cover: string;

  styleType: "visual" | "layout";
  tags: ("modern" | "retro" | "minimal" | "expressive" | "high-contrast" | "responsive" | "brand-inspired")[];
  compatibleWith?: string[];

  category: "modern" | "retro" | "minimal" | "expressive";

  colors: {
    primary: string;
    secondary: string;
    accent: string[];
  };
  keywords: string[];
  keywordsEn?: string[];

  variants?: StyleVariant[];

  philosophy: string;
  philosophyEn?: string;
  doList: string[];
  doListEn?: string[];
  dontList: string[];
  dontListEn?: string[];

  components: {
    button: ComponentTemplate;
    card: ComponentTemplate;
    input: ComponentTemplate;
    nav?: ComponentTemplate;
    hero?: ComponentTemplate;
    footer?: ComponentTemplate;
  };

  descriptionEn?: string;
  tailwindConfig?: string;
  globalCss: string;
  aiRules: string;
  aiRulesEn?: string;

  examplePrompts?: ExamplePrompt[];

  atoms?: StyleAtoms;
}

export interface ExamplePrompt {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  prompt: string;
  promptEn?: string;
}

export interface ComponentTemplate {
  name: string;
  description: string;
  code: string;
  preview?: string;
}
