// Prompt Builder - Type definitions

export type PageType = "landing" | "dashboard" | "blog" | "form" | "list";
export type TechStack = "nextjs" | "react" | "vue" | "vanilla";
export type CompLib = "shadcn" | "radix" | "headless" | "none";
export type InteractionLevel = "minimal" | "standard" | "rich";

export interface PromptConfig {
  style: string;
  pageType: PageType;
  techStack: TechStack;
  componentLib: CompLib;
  interactionLevel: InteractionLevel;
  includeTokens: boolean;
  includeExamples: boolean;
  includeUIPlan: boolean;
  archetypeId?: string;
}

export const PAGE_TYPE_OPTIONS: { value: PageType; labelZh: string; labelEn: string }[] = [
  { value: "landing", labelZh: "着陆页", labelEn: "Landing Page" },
  { value: "dashboard", labelZh: "仪表盘", labelEn: "Dashboard" },
  { value: "blog", labelZh: "博客", labelEn: "Blog" },
  { value: "form", labelZh: "表单页", labelEn: "Form Page" },
  { value: "list", labelZh: "列表页", labelEn: "List Page" },
];

export const TECH_STACK_OPTIONS: { value: TechStack; labelZh: string; labelEn: string }[] = [
  { value: "nextjs", labelZh: "Next.js + App Router", labelEn: "Next.js + App Router" },
  { value: "react", labelZh: "React + Vite", labelEn: "React + Vite" },
  { value: "vue", labelZh: "Vue 3 + Vite", labelEn: "Vue 3 + Vite" },
  { value: "vanilla", labelZh: "原生 HTML/CSS", labelEn: "Vanilla HTML/CSS" },
];

export const COMP_LIB_OPTIONS: { value: CompLib; labelZh: string; labelEn: string }[] = [
  { value: "shadcn", labelZh: "shadcn/ui", labelEn: "shadcn/ui" },
  { value: "radix", labelZh: "Radix UI", labelEn: "Radix UI" },
  { value: "headless", labelZh: "Headless UI", labelEn: "Headless UI" },
  { value: "none", labelZh: "无组件库", labelEn: "No Library" },
];

export const INTERACTION_OPTIONS: { value: InteractionLevel; labelZh: string; labelEn: string }[] = [
  { value: "minimal", labelZh: "极简", labelEn: "Minimal" },
  { value: "standard", labelZh: "标准", labelEn: "Standard" },
  { value: "rich", labelZh: "丰富", labelEn: "Rich" },
];
