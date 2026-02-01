// 设计风格数据类型定义

export type StyleCategory = "modern" | "retro" | "minimal" | "expressive";

export interface DesignStyle {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  cover: string;
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
    keywords: style.keywords,
    colors: style.colors,
  }));
}
