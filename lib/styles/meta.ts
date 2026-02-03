/**
 * Lightweight style metadata module
 *
 * This module contains ONLY metadata - no component templates, CSS, or AI rules.
 * Import this in client components to avoid bundling the full style definitions.
 *
 * For full style data (including components, globalCss, aiRules), use:
 * import { getStyleBySlug } from "@/lib/styles"
 */

// Type definitions (duplicated to avoid importing from index.ts)
export type StyleCategory = "modern" | "retro" | "minimal" | "expressive";
export type StyleType = "visual" | "layout" | "animation";
export type StyleTag =
  | "modern"
  | "retro"
  | "minimal"
  | "expressive"
  | "high-contrast"
  | "responsive"
  | "brand-inspired";

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
  colors: {
    primary: string;
    secondary: string;
    accent: string[];
  };
}

/**
 * Static metadata for all styles
 * Extracted from individual style files to avoid bundling full definitions
 */
export const stylesMeta: StyleMeta[] = [
  {
    slug: "neo-brutalist",
    name: "新野兽派",
    nameEn: "Neo-Brutalist",
    description: "大胆的黑色粗边框、硬边缘阴影、无圆角、高对比度配色。源于建筑野兽派，强调功能与原始美学。",
    cover: "/styles/neo-brutalist.png",
    styleType: "visual",
    tags: ["expressive", "high-contrast"],
    category: "expressive",
    colors: {
      primary: "#000000",
      secondary: "#ffffff",
      accent: ["#ff006e", "#ccff00", "#00d9ff", "#ff9500"],
    },
    keywords: ["粗边框", "硬阴影", "无圆角", "高对比", "功能主义"],
  },
  {
    slug: "neo-brutalist-soft",
    name: "柔和野兽派",
    nameEn: "Neo-Brutalist Soft",
    description: "Neo-Brutalist 的温和版本。保留硬边缘阴影和无圆角特性，但使用更柔和的配色、较细的边框和更温和的对比度。",
    cover: "/styles/neo-brutalist-soft.png",
    styleType: "visual",
    tags: ["modern", "expressive"],
    category: "expressive",
    colors: {
      primary: "#1a1a1a",
      secondary: "#f5f5f5",
      accent: ["#f472b6", "#a3e635", "#38bdf8", "#fbbf24"],
    },
    keywords: ["柔和野兽派", "温和对比", "浅色阴影", "细边框", "淡彩"],
  },
  {
    slug: "neo-brutalist-playful",
    name: "俏皮野兽派",
    nameEn: "Neo-Brutalist Playful",
    description: "Neo-Brutalist 的活泼版本。保留核心特征，加入更多色彩、旋转倾斜元素、emoji 和有趣的微交互，适合年轻化品牌。",
    cover: "/styles/neo-brutalist-playful.png",
    styleType: "visual",
    tags: ["expressive"],
    category: "expressive",
    colors: {
      primary: "#000000",
      secondary: "#ffffff",
      accent: ["#ff6b6b", "#4ecdc4", "#ffe66d", "#95e1d3", "#f38181"],
    },
    keywords: ["俏皮野兽派", "多彩", "倾斜元素", "emoji", "年轻化"],
  },
  {
    slug: "editorial",
    name: "编辑杂志风",
    nameEn: "Editorial",
    description: "优雅的杂志排版风格，衬线标题、无衬线正文、精致的留白和网格系统。灵感来自高端时尚杂志和报纸排版。",
    cover: "/styles/editorial.png",
    styleType: "visual",
    tags: ["minimal"],
    category: "minimal",
    colors: {
      primary: "#0a0a0a",
      secondary: "#fafafa",
      accent: ["#e63946", "#6b7280", "#e5e5e5"],
    },
    keywords: ["杂志排版", "衬线字体", "优雅留白", "网格系统", "极简主义"],
  },
  {
    slug: "neumorphism",
    name: "新拟物派",
    nameEn: "Neumorphism",
    description: "柔和的内凹外凸立体效果，通过双重阴影模拟光源，浅色背景配同色系元素，营造精致的立体感。",
    cover: "/styles/neumorphism.png",
    styleType: "visual",
    tags: ["modern", "minimal"],
    category: "modern",
    colors: {
      primary: "#e0e5ec",
      secondary: "#d1d9e6",
      accent: ["#6d5dfc", "#ff6b6b", "#4ecdc4", "#ffe66d"],
    },
    keywords: ["立体感", "双重阴影", "柔和", "浅色系", "内凹外凸"],
  },
  {
    slug: "glassmorphism",
    name: "玻璃拟态",
    nameEn: "Glassmorphism",
    description: "半透明毛玻璃效果，通过 backdrop-blur 模糊背景、柔和边框和微妙阴影，创造现代感十足的层叠界面。",
    cover: "/styles/glassmorphism.png",
    styleType: "visual",
    tags: ["modern"],
    category: "modern",
    colors: {
      primary: "rgba(255, 255, 255, 0.25)",
      secondary: "rgba(255, 255, 255, 0.18)",
      accent: ["#667eea", "#764ba2", "#f093fb", "#f5576c"],
    },
    keywords: ["毛玻璃", "透明", "模糊", "现代", "层叠"],
  },
  {
    slug: "bento-grid",
    name: "便当盒布局",
    nameEn: "Bento Grid",
    description: "灵感源于日式便当盒的不规则网格布局，通过大小不一的卡片组合创造视觉层次，常用于作品集和产品展示。",
    cover: "/styles/bento-grid.png",
    styleType: "layout",
    tags: ["modern", "responsive"],
    category: "modern",
    colors: {
      primary: "#18181b",
      secondary: "#fafafa",
      accent: ["#3b82f6", "#8b5cf6", "#ec4899", "#f97316"],
    },
    keywords: ["网格", "卡片", "不规则", "作品集", "现代"],
    compatibleWith: ["glassmorphism", "neo-brutalist", "editorial", "neumorphism"],
  },
  {
    slug: "corporate-clean",
    name: "企业简洁风",
    nameEn: "Corporate Clean",
    description: "专业简洁的企业风格，强调可读性、一致性和信任感。适合B2B SaaS、企业官网、后台管理系统。",
    cover: "/styles/corporate-clean.png",
    styleType: "visual",
    tags: ["minimal", "modern"],
    category: "minimal",
    colors: {
      primary: "#1e40af",
      secondary: "#f8fafc",
      accent: ["#3b82f6", "#64748b", "#10b981"],
    },
    keywords: ["企业", "专业", "简洁", "B2B", "SaaS", "后台", "Dashboard"],
  },
  {
    slug: "minimalist-flat",
    name: "极简扁平风",
    nameEn: "Minimalist Flat",
    description: "极致简约的扁平设计，无阴影无渐变，通过颜色和留白创造层次。适合作品集、创意机构、艺术网站。",
    cover: "/styles/minimalist-flat.png",
    styleType: "visual",
    tags: ["minimal", "modern"],
    category: "minimal",
    colors: {
      primary: "#000000",
      secondary: "#ffffff",
      accent: ["#ff3366", "#00d4aa", "#ffcc00"],
    },
    keywords: ["极简", "扁平", "无阴影", "作品集", "创意", "艺术"],
  },
  {
    slug: "soft-ui",
    name: "柔和界面风",
    nameEn: "Soft UI",
    description: "温和友好的界面风格，柔和的阴影、圆润的边角、低饱和度的配色。适合消费类应用、社交产品、生活服务类 App。",
    cover: "/styles/soft-ui.png",
    styleType: "visual",
    tags: ["modern", "minimal"],
    category: "modern",
    colors: {
      primary: "#6366f1",
      secondary: "#f1f5f9",
      accent: ["#ec4899", "#10b981", "#f59e0b"],
    },
    keywords: ["柔和", "圆润", "友好", "消费类", "App", "社交", "生活服务"],
  },
  {
    slug: "cyberpunk-neon",
    name: "赛博朋克霓虹",
    nameEn: "Cyberpunk Neon",
    description: "未来感十足的赛博朋克风格，霓虹发光效果、深色背景、高科技感的 UI 元素。适合游戏、科技产品、创意工作室。",
    cover: "/styles/cyberpunk-neon.png",
    styleType: "visual",
    tags: ["expressive", "modern", "high-contrast"],
    category: "expressive",
    colors: {
      primary: "#00ffff",
      secondary: "#0a0a0f",
      accent: ["#ff00ff", "#ffff00", "#00ff00"],
    },
    keywords: ["赛博朋克", "霓虹", "未来", "发光", "游戏", "科技"],
  },
  {
    slug: "natural-organic",
    name: "自然有机风",
    nameEn: "Natural Organic",
    description: "温暖自然的有机风格，大地色系、自然纹理、手工感元素。适合健康品牌、有机食品、环保产品、手工艺品。",
    cover: "/styles/natural-organic.png",
    styleType: "visual",
    tags: ["minimal", "modern"],
    category: "minimal",
    colors: {
      primary: "#5c4033",
      secondary: "#faf6f1",
      accent: ["#8b9d77", "#d4a373", "#e9e0d4"],
    },
    keywords: ["自然", "有机", "大地色", "手工", "健康", "环保", "可持续"],
  },
  {
    slug: "modern-gradient",
    name: "现代渐变风",
    nameEn: "Modern Gradient",
    description: "充满活力的现代渐变风格，多彩渐变背景、玻璃质感卡片、动态光影效果。适合创业公司、数字产品、活动页面。",
    cover: "/styles/modern-gradient.png",
    styleType: "visual",
    tags: ["expressive", "modern"],
    category: "expressive",
    colors: {
      primary: "#8b5cf6",
      secondary: "#1e1b4b",
      accent: ["#06b6d4", "#ec4899", "#f59e0b"],
    },
    keywords: ["渐变", "现代", "活力", "创业", "数字", "动态", "科技感"],
  },
  {
    slug: "retro-vintage",
    name: "复古怀旧风",
    nameEn: "Retro Vintage",
    description: "怀旧复古的设计风格，老式排版、复古色调、手工质感元素。适合咖啡馆、复古品牌、独立杂志、音乐厂牌。",
    cover: "/styles/retro-vintage.png",
    styleType: "visual",
    tags: ["retro", "expressive"],
    category: "retro",
    colors: {
      primary: "#8b4513",
      secondary: "#f5e6d3",
      accent: ["#c94c4c", "#2e4a3f", "#d4a373"],
    },
    keywords: ["复古", "怀旧", "老式", "手工", "咖啡馆", "独立", "文艺"],
  },
  {
    slug: "dark-mode",
    name: "暗黑模式",
    nameEn: "Dark Mode",
    description: "优雅的深色界面设计，低对比度层次、微妙的边框和高亮。适合开发工具、专业应用、深夜阅读模式。",
    cover: "/styles/dark-mode.png",
    styleType: "visual",
    tags: ["modern", "minimal"],
    category: "modern",
    colors: {
      primary: "#3b82f6",
      secondary: "#0f172a",
      accent: ["#22c55e", "#f59e0b", "#ef4444"],
    },
    keywords: ["暗黑", "深色", "夜间", "开发", "专业", "护眼"],
  },
  {
    slug: "geometric-bold",
    name: "几何大胆风",
    nameEn: "Geometric Bold",
    description: "大胆的几何图形设计，强烈的形状对比、鲜明的色块、动态的构图。适合艺术展览、设计机构、创意品牌。",
    cover: "/styles/geometric-bold.png",
    styleType: "visual",
    tags: ["expressive", "high-contrast"],
    category: "expressive",
    colors: {
      primary: "#000000",
      secondary: "#ffffff",
      accent: ["#ff0000", "#0000ff", "#ffff00"],
    },
    keywords: ["几何", "大胆", "色块", "艺术", "创意", "设计", "先锋"],
  },
  // 新增布局风格
  {
    slug: "masonry-flow",
    name: "瀑布流布局",
    nameEn: "Masonry Flow",
    description: "Pinterest 风格的不等高卡片瀑布流布局，通过 CSS columns 或 masonry grid 实现自然流动的视觉效果，适合图片展示、作品集、社交媒体。",
    cover: "/styles/masonry-flow.png",
    styleType: "layout",
    tags: ["modern", "responsive"],
    category: "modern",
    colors: {
      primary: "#1a1a2e",
      secondary: "#f5f5f5",
      accent: ["#e94560", "#16c79a", "#ffd460", "#7579e7"],
    },
    keywords: ["瀑布流", "Pinterest", "不等高", "图片墙", "作品集", "gallery"],
    compatibleWith: ["glassmorphism", "minimalist-flat", "soft-ui", "natural-organic", "editorial"],
  },
  {
    slug: "split-screen",
    name: "分屏布局",
    nameEn: "Split Screen",
    description: "左右对称或不对称的分屏布局，通过对比和平衡创造视觉张力，常用于产品展示、品牌故事、比较页面。",
    cover: "/styles/split-screen.png",
    styleType: "layout",
    tags: ["modern", "responsive"],
    category: "modern",
    colors: {
      primary: "#0f0f0f",
      secondary: "#ffffff",
      accent: ["#ff4757", "#2ed573", "#1e90ff", "#ffa502"],
    },
    keywords: ["分屏", "对比", "左右布局", "对称", "品牌", "展示"],
    compatibleWith: ["neo-brutalist", "minimalist-flat", "editorial", "modern-gradient", "geometric-bold"],
  },
  {
    slug: "full-page-scroll",
    name: "全屏滚动布局",
    nameEn: "Full Page Scroll",
    description: "每一屏占满整个视口的沉浸式滚动体验，通过滚动切换完整场景，适合品牌故事、产品介绍、作品集展示。",
    cover: "/styles/full-page-scroll.png",
    styleType: "layout",
    tags: ["modern", "expressive"],
    category: "expressive",
    colors: {
      primary: "#000000",
      secondary: "#ffffff",
      accent: ["#6366f1", "#ec4899", "#14b8a6", "#f59e0b"],
    },
    keywords: ["全屏", "滚动", "沉浸式", "场景", "品牌", "故事"],
    compatibleWith: ["glassmorphism", "modern-gradient", "cyberpunk-neon", "minimalist-flat", "geometric-bold"],
  },
  {
    slug: "timeline-vertical",
    name: "垂直时间线布局",
    nameEn: "Vertical Timeline",
    description: "垂直时间轴布局，通过连接线串联时间节点，适合展示历史进程、项目里程碑、工作经历、流程步骤。",
    cover: "/styles/timeline-vertical.png",
    styleType: "layout",
    tags: ["modern", "minimal"],
    category: "minimal",
    colors: {
      primary: "#1e293b",
      secondary: "#f8fafc",
      accent: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
    },
    keywords: ["时间线", "历程", "里程碑", "流程", "步骤", "进度"],
    compatibleWith: ["editorial", "corporate-clean", "minimalist-flat", "soft-ui", "natural-organic"],
  },
  {
    slug: "card-stack",
    name: "卡片堆叠布局",
    nameEn: "Card Stack",
    description: "卡片前后重叠的立体布局，通过 Z 轴层叠和偏移创造深度感，适合轮播、步骤展示、卡组选择。",
    cover: "/styles/card-stack.png",
    styleType: "layout",
    tags: ["modern", "expressive"],
    category: "expressive",
    colors: {
      primary: "#1a1a2e",
      secondary: "#f0f0f5",
      accent: ["#6c5ce7", "#00cec9", "#fd79a8", "#ffeaa7"],
    },
    keywords: ["卡片", "堆叠", "立体", "层叠", "轮播", "3D"],
    compatibleWith: ["glassmorphism", "neumorphism", "soft-ui", "modern-gradient", "neo-brutalist"],
  },
  {
    slug: "sidebar-fixed",
    name: "固定侧边栏布局",
    nameEn: "Fixed Sidebar",
    description: "固定位置的侧边导航栏与可滚动主内容区的应用布局，适合后台管理、文档站点、仪表盘、SaaS 应用。",
    cover: "/styles/sidebar-fixed.png",
    styleType: "layout",
    tags: ["modern", "responsive"],
    category: "modern",
    colors: {
      primary: "#1e293b",
      secondary: "#f8fafc",
      accent: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
    },
    keywords: ["侧边栏", "后台", "管理", "导航", "仪表盘", "应用"],
    compatibleWith: ["corporate-clean", "soft-ui", "dark-mode", "minimalist-flat", "neumorphism"],
  },
  {
    slug: "magazine-grid",
    name: "杂志网格布局",
    nameEn: "Magazine Grid",
    description: "灵感来自印刷杂志的多栏网格布局，通过不同大小的内容块创造丰富的视觉层次，适合新闻、博客、内容聚合。",
    cover: "/styles/magazine-grid.png",
    styleType: "layout",
    tags: ["modern", "responsive"],
    category: "modern",
    colors: {
      primary: "#1a1a1a",
      secondary: "#fafafa",
      accent: ["#e63946", "#2a9d8f", "#e9c46a", "#264653"],
    },
    keywords: ["杂志", "多栏", "新闻", "博客", "内容", "网格"],
    compatibleWith: ["editorial", "minimalist-flat", "corporate-clean", "retro-vintage", "dark-mode"],
  },
  {
    slug: "hero-fullscreen",
    name: "全屏英雄区布局",
    nameEn: "Fullscreen Hero",
    description: "以全屏大图或视频为背景的英雄区布局，通过震撼的视觉效果抓住注意力，适合品牌展示、产品发布、活动宣传。",
    cover: "/styles/hero-fullscreen.png",
    styleType: "layout",
    tags: ["expressive", "modern"],
    category: "expressive",
    colors: {
      primary: "#ffffff",
      secondary: "#000000",
      accent: ["#ff6b6b", "#4ecdc4", "#ffe66d", "#6c5ce7"],
    },
    keywords: ["全屏", "英雄区", "大图", "视频", "品牌", "震撼"],
    compatibleWith: ["glassmorphism", "modern-gradient", "cyberpunk-neon", "minimalist-flat", "dark-mode"],
  },
  // 新增视觉风格
  {
    slug: "claymorphism",
    name: "粘土拟态",
    nameEn: "Claymorphism",
    description: "柔软的粘土质感设计，通过超大圆角、内外阴影组合和柔和渐变，创造出可爱的 3D 立体效果，适合儿童应用和趣味产品。",
    cover: "/styles/claymorphism.svg",
    styleType: "visual",
    tags: ["modern", "expressive"],
    category: "modern",
    colors: {
      primary: "#f8b4d9",
      secondary: "#fef3c7",
      accent: ["#a7f3d0", "#c4b5fd", "#fcd34d"],
    },
    keywords: ["粘土", "3D", "可爱", "柔软", "圆润", "儿童", "趣味"],
  },
  {
    slug: "notion-style",
    name: "Notion 风格",
    nameEn: "Notion Style",
    description: "极简清爽的文档工具风格，强调内容可读性和功能性，使用微妙的边框、柔和的悬停效果和清晰的文字层级。",
    cover: "/styles/notion-style.svg",
    styleType: "visual",
    tags: ["minimal", "brand-inspired"],
    category: "minimal",
    colors: {
      primary: "#37352f",
      secondary: "#ffffff",
      accent: ["#2eaadc", "#eb5757", "#0f7b6c"],
    },
    keywords: ["Notion", "文档", "极简", "清爽", "工具", "协作", "笔记"],
  },
  {
    slug: "stripe-style",
    name: "Stripe 风格",
    nameEn: "Stripe Style",
    description: "精致专业的金融科技风格，以 Stripe 紫为主色调，配合渐变网格背景、精致卡片阴影和流畅动画，适合支付产品和开发者工具。",
    cover: "/styles/stripe-style.svg",
    styleType: "visual",
    tags: ["modern", "brand-inspired"],
    category: "modern",
    colors: {
      primary: "#635bff",
      secondary: "#0a2540",
      accent: ["#00d4ff", "#7a73ff", "#80e9ff"],
    },
    keywords: ["Stripe", "金融", "支付", "SaaS", "开发者", "专业", "科技"],
  },
  {
    slug: "apple-style",
    name: "Apple 风格",
    nameEn: "Apple Style",
    description: "极致简约的高端设计风格，大量留白、精致圆角、微妙阴影和 SF Pro 风格字体，传达高端科技产品的品质感。",
    cover: "/styles/apple-style.svg",
    styleType: "visual",
    tags: ["minimal", "brand-inspired"],
    category: "minimal",
    colors: {
      primary: "#000000",
      secondary: "#f5f5f7",
      accent: ["#0071e3", "#34c759", "#ff3b30"],
    },
    keywords: ["Apple", "极简", "高端", "科技", "产品", "留白", "精致"],
  },
  {
    slug: "pixel-art",
    name: "像素艺术风",
    nameEn: "Pixel Art",
    description: "复古 8-bit 像素游戏风格，无圆角、像素化边框、硬边阴影和鲜明的 8-bit 配色，适合游戏、复古应用和独立开发者项目。",
    cover: "/styles/pixel-art.svg",
    styleType: "visual",
    tags: ["retro", "expressive"],
    category: "retro",
    colors: {
      primary: "#1a1c2c",
      secondary: "#f4f4f4",
      accent: ["#ff004d", "#00e436", "#29adff", "#ffec27"],
    },
    keywords: ["像素", "8-bit", "复古", "游戏", "怀旧", "独立", "retro"],
  },
];

/**
 * Get all styles metadata (lightweight, for client components)
 */
export function getAllStylesMeta(): StyleMeta[] {
  return stylesMeta;
}

/**
 * Get a single style's metadata by slug
 */
export function getStyleMetaBySlug(slug: string): StyleMeta | undefined {
  return stylesMeta.find((style) => style.slug === slug);
}
