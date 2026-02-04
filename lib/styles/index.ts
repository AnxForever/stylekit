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

// 风格变体定义
export interface StyleVariant {
  id: string;           // 变体标识，如 "vaporwave"
  name: string;         // 中文名，如 "蒸汽波"
  nameEn: string;       // 英文名，如 "Vaporwave"
  description: string;  // 变体特点描述
  colors: {
    primary: string;
    secondary: string;
    accent: string[];
  };
  // 变体特有的样式覆盖
  cssOverrides?: string;
}

export interface DesignStyle {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  cover: string;

  // 新分类系统
  styleType: "visual" | "layout" | "animation";
  tags: ("modern" | "retro" | "minimal" | "expressive" | "high-contrast" | "responsive" | "brand-inspired")[];
  compatibleWith?: string[]; // 仅用于 layout 类型，列出可搭配的视觉风格

  // 旧分类（保留兼容）
  category: "modern" | "retro" | "minimal" | "expressive";

  colors: {
    primary: string;
    secondary: string;
    accent: string[];
  };
  keywords: string[];

  // 风格变体（配色方案）
  variants?: StyleVariant[];

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
import { editorial } from "./editorial";
import { neumorphism } from "./neumorphism";
import { glassmorphism } from "./glassmorphism";
import { bentoGrid } from "./bento-grid";
// 新增风格
import { corporateClean } from "./corporate-clean";
import { minimalistFlat } from "./minimalist-flat";
import { softUI } from "./soft-ui";
import { naturalOrganic } from "./natural-organic";
import { modernGradient } from "./modern-gradient";
import { retroVintage } from "./retro-vintage";
import { darkMode } from "./dark-mode";
import { geometricBold } from "./geometric-bold";
// 新增布局风格
import { masonryFlow } from "./masonry-flow";
import { splitScreen } from "./split-screen";
import { fullPageScroll } from "./full-page-scroll";
import { timelineVertical } from "./timeline-vertical";
import { cardStack } from "./card-stack";
import { sidebarFixed } from "./sidebar-fixed";
import { magazineGrid } from "./magazine-grid";
import { heroFullscreen } from "./hero-fullscreen";
// 新增视觉风格
import { claymorphism } from "./claymorphism";
import { notionStyle } from "./notion-style";
import { stripeStyle } from "./stripe-style";
import { appleStyle } from "./apple-style";
import { pixelArt } from "./pixel-art";
// 新增风格 - 批次1
import { vaporwave } from "./vaporwave";
import { y2k } from "./y2k";
import { memphis } from "./memphis";
import { artDeco } from "./art-deco";
import { bauhaus } from "./bauhaus";
// 新增风格 - 批次2
import { skeuomorphism } from "./skeuomorphism";
import { swissStyle } from "./swiss-style";
import { ghibliStyle } from "./ghibli-style";
import { materialDesign } from "./material-design";
import { fluentDesign } from "./fluent-design";
// 新增风格 - 批次3（视觉风格）
import { comicStyle } from "./comic-style";
import { sketchStyle } from "./sketch-style";
import { watercolorStyle } from "./watercolor-style";
// 新增布局风格 - 批次3
import { fPatternLayout } from "./f-pattern-layout";
import { zPatternLayout } from "./z-pattern-layout";
import { holyGrailLayout } from "./holy-grail-layout";
import { dashboardLayout } from "./dashboard-layout";

// 风格列表
export const styles: DesignStyle[] = [
  neoBrutalist,
  editorial,
  neumorphism,
  glassmorphism,
  bentoGrid,
  // 新增风格
  corporateClean,
  minimalistFlat,
  softUI,
  naturalOrganic,
  modernGradient,
  retroVintage,
  darkMode,
  geometricBold,
  // 新增布局风格
  masonryFlow,
  splitScreen,
  fullPageScroll,
  timelineVertical,
  cardStack,
  sidebarFixed,
  magazineGrid,
  heroFullscreen,
  // 新增视觉风格
  claymorphism,
  notionStyle,
  stripeStyle,
  appleStyle,
  pixelArt,
  // 新增风格 - 批次1
  vaporwave,
  y2k,
  memphis,
  artDeco,
  bauhaus,
  // 新增风格 - 批次2
  skeuomorphism,
  swissStyle,
  ghibliStyle,
  materialDesign,
  fluentDesign,
  // 新增风格 - 批次3（视觉风格）
  comicStyle,
  sketchStyle,
  watercolorStyle,
  // 新增布局风格 - 批次3
  fPatternLayout,
  zPatternLayout,
  holyGrailLayout,
  dashboardLayout,
];

// 根据 slug 获取风格
export function getStyleBySlug(slug: string): DesignStyle | undefined {
  return styles.find((style) => style.slug === slug);
}

