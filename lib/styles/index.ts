// 设计风格数据类型定义

// 保留旧分类用于兼容
export type StyleCategory = "modern" | "retro" | "minimal" | "expressive";

// 新增：主类型分类
export type StyleType = "visual" | "layout" | "animation";

// 新增：标签系统
export type StyleTag =
  | "modern"
  | "retro"
  | "minimal"
  | "expressive"
  | "high-contrast"
  | "responsive";

export interface DesignStyle {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  cover: string;

  // 新分类系统
  styleType: StyleType;
  tags: StyleTag[];
  compatibleWith?: string[]; // 仅用于 layout 类型，列出可搭配的视觉风格

  // 旧分类（保留兼容）
  category: StyleCategory;

  colors: {
    primary: string;
    secondary: string;
    accent: string[];
  };
  keywords: string[];

  // 文档内容
  philosophy: string;
  doList: string[];
  dontList: string[];

  // 组件模板
  components: {
    button: ComponentTemplate;
    card: ComponentTemplate;
    input: ComponentTemplate;
    nav?: ComponentTemplate;
    hero?: ComponentTemplate;
    footer?: ComponentTemplate;
  };

  // 导出内容
  tailwindConfig?: string;
  globalCss: string;
  aiRules: string;

  // 示例 Prompts（帮助用户快速上手）
  examplePrompts?: ExamplePrompt[];
}

export interface ExamplePrompt {
  title: string;        // 如 "生成 SaaS 着陆页"
  titleEn: string;      // 如 "Generate SaaS Landing Page"
  description: string;  // 如 "包含 Hero、Features、Pricing"
  descriptionEn: string;
  prompt: string;       // 完整的 prompt 文本
}

export interface ComponentTemplate {
  name: string;
  description: string;
  code: string;
  preview?: string; // 预览用的简化代码
}

// 导入所有风格
import { neoBrutalist } from "./neo-brutalist";
import { neoBrutalistSoft } from "./neo-brutalist-soft";
import { neoBrutalistPlayful } from "./neo-brutalist-playful";
import { editorial } from "./editorial";
import { neumorphism } from "./neumorphism";
import { glassmorphism } from "./glassmorphism";
import { bentoGrid } from "./bento-grid";

// 风格列表
export const styles: DesignStyle[] = [
  neoBrutalist,
  neoBrutalistSoft,
  neoBrutalistPlayful,
  editorial,
  neumorphism,
  glassmorphism,
  bentoGrid,
];

// 根据 slug 获取风格
export function getStyleBySlug(slug: string): DesignStyle | undefined {
  return styles.find((style) => style.slug === slug);
}

// 获取所有风格的简要信息（用于目录页）
export interface StyleMeta {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  cover: string;
  category: StyleCategory;
  styleType: StyleType;
  tags: StyleTag[];
  compatibleWith?: string[];
  keywords: string[];
  colors: DesignStyle["colors"];
}

export function getAllStylesMeta(): StyleMeta[] {
  return styles.map((style) => ({
    slug: style.slug,
    name: style.name,
    nameEn: style.nameEn,
    description: style.description,
    cover: style.cover,
    category: style.category,
    styleType: style.styleType,
    tags: style.tags,
    compatibleWith: style.compatibleWith,
    keywords: style.keywords,
    colors: style.colors,
  }));
}
