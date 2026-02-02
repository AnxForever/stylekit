// 设计风格数据类型定义

// Re-export lightweight metadata types and functions from meta.ts
// Client components should import from "@/lib/styles/meta" directly
export {
  type StyleCategory,
  type StyleType,
  type StyleTag,
  type StyleMeta,
  stylesMeta,
  getAllStylesMeta,
  getStyleMetaBySlug,
} from "./meta";

export interface DesignStyle {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  cover: string;

  // 新分类系统
  styleType: "visual" | "layout" | "animation";
  tags: ("modern" | "retro" | "minimal" | "expressive" | "high-contrast" | "responsive")[];
  compatibleWith?: string[]; // 仅用于 layout 类型，列出可搭配的视觉风格

  // 旧分类（保留兼容）
  category: "modern" | "retro" | "minimal" | "expressive";

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
// 新增风格
import { corporateClean } from "./corporate-clean";
import { minimalistFlat } from "./minimalist-flat";
import { softUI } from "./soft-ui";
import { cyberpunkNeon } from "./cyberpunk-neon";
import { naturalOrganic } from "./natural-organic";
import { modernGradient } from "./modern-gradient";
import { retroVintage } from "./retro-vintage";
import { darkMode } from "./dark-mode";
import { geometricBold } from "./geometric-bold";

// 风格列表
export const styles: DesignStyle[] = [
  neoBrutalist,
  neoBrutalistSoft,
  neoBrutalistPlayful,
  editorial,
  neumorphism,
  glassmorphism,
  bentoGrid,
  // 新增风格
  corporateClean,
  minimalistFlat,
  softUI,
  cyberpunkNeon,
  naturalOrganic,
  modernGradient,
  retroVintage,
  darkMode,
  geometricBold,
];

// 根据 slug 获取风格
export function getStyleBySlug(slug: string): DesignStyle | undefined {
  return styles.find((style) => style.slug === slug);
}

