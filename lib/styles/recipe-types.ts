export interface StyleRecipe {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  useCase: UseCase;
  tags: RecipeTag[];
  visualStyle: string;
  layout: string;
  animations?: string[];
  reasoning: string;
  reasoningZh: string;
  previewGradient?: string;
  featured?: boolean;
  popularity?: number;
}

export type UseCase =
  | "saas-landing"
  | "saas-dashboard"
  | "ecommerce"
  | "portfolio"
  | "blog"
  | "agency"
  | "startup"
  | "enterprise"
  | "creative"
  | "personal"
  | "documentation"
  | "mobile-app";

export type RecipeTag =
  | "modern"
  | "retro"
  | "minimal"
  | "bold"
  | "elegant"
  | "playful"
  | "professional"
  | "dark"
  | "light"
  | "animated"
  | "high-conversion"
  | "developer-friendly"
  | "creative";
