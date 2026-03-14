/**
 * Animation module type definitions
 *
 * Separate from DesignStyle: styles target visual appearance,
 * animations target motion effects. Completely different data models.
 */

export type AnimationCategory =
  | "entrance"
  | "exit"
  | "hover"
  | "scroll"
  | "text"
  | "loading"
  | "background"
  | "transition"
  | "micro-interaction";

export type AnimationTrigger =
  | "on-mount"
  | "on-scroll"
  | "on-hover"
  | "on-click"
  | "continuous"
  | "manual";

export interface AnimationCodeSnippet {
  label: string;
  language: "css" | "tsx";
  code: string;
}

export interface Animation {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  category: AnimationCategory;
  tags: string[];
  trigger: AnimationTrigger;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  easing: string;
  cssProperties: string[];
  isGPUAccelerated: boolean;
  codeSnippets: AnimationCodeSnippet[];
  previewBg?: "dark" | "light" | "gradient";
  keywords: string[];
  useCases: string[];
  relatedAnimations?: string[];
  recommendedStyles?: string[];
}

export interface AnimationMeta {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  category: AnimationCategory;
  tags: string[];
  trigger: AnimationTrigger;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  keywords: string[];
}
