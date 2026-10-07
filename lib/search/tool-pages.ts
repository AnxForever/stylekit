import type { Locale } from "@/lib/i18n/translations";

// Only live tools belong here. The former foundation simulators now redirect
// to articles; indexing their old component files would promise a broken flow.
const TOOL_PAGES = [
  {
    id: "resources", href: "/resources",
    zh: "资源库", en: "Resource Library",
    descriptionZh: "浏览可直接用于项目的字体、渐变、阴影与背景",
    descriptionEn: "Browse ready-to-use fonts, gradients, shadows and backgrounds",
    keywords: ["resources", "assets", "资源", "素材", "css"],
  },
  {
    id: "typography", href: "/resources?tab=typography",
    zh: "字体配对", en: "Font Pairings",
    descriptionZh: "预览标题与正文字体，复制导入代码",
    descriptionEn: "Preview heading and body pairings and copy font imports",
    keywords: ["typography", "font", "fonts", "google fonts", "字体", "排版"],
  },
  {
    id: "gradients", href: "/resources?tab=gradients",
    zh: "渐变生成器", en: "Gradient Generator",
    descriptionZh: "挑选和调整渐变，复制 CSS 或 Tailwind",
    descriptionEn: "Choose and tune gradients, then copy CSS or Tailwind",
    keywords: ["gradient", "gradients", "渐变", "linear", "radial"],
  },
  {
    id: "shadows", href: "/resources?tab=shadows",
    zh: "阴影预设", en: "Shadow Presets",
    descriptionZh: "预览 box-shadow，复制 CSS 或 Tailwind",
    descriptionEn: "Preview box-shadow presets and copy CSS or Tailwind",
    keywords: ["shadow", "shadows", "box-shadow", "阴影", "投影"],
  },
  {
    id: "backgrounds", href: "/resources?tab=backgrounds",
    zh: "背景纹理", en: "Background Patterns",
    descriptionZh: "挑选网格、圆点与纹理，复制背景代码",
    descriptionEn: "Choose grids, dots and textures and copy background code",
    keywords: ["background", "backgrounds", "textures", "背景", "纹理", "网格", "圆点"],
  },
  {
    id: "shaders", href: "/resources?tab=shaders",
    zh: "动态着色器", en: "Animated Shaders",
    descriptionZh: "实时调参，导出动态背景的 React 代码",
    descriptionEn: "Tune animated backgrounds live and export React code",
    keywords: ["shader", "shaders", "webgl", "着色器", "动态背景"],
  },
  {
    id: "colors", href: "/colors",
    zh: "配色探索", en: "Color Explorer",
    descriptionZh: "浏览风格配色，复制颜色并查看色值详情",
    descriptionEn: "Browse style palettes, copy colors and inspect color values",
    keywords: ["color", "colors", "palette", "hex", "rgb", "颜色", "色彩", "配色"],
  },
  {
    id: "kit", href: "/kit",
    zh: "我的设计套件", en: "My Design Kit",
    descriptionZh: "收集风格与资源，导出 AI 提示词、规范和代码",
    descriptionEn: "Collect styles and assets, then export prompts, specs and code",
    keywords: ["kit", "export", "prompt", "套件", "导出", "提示词", "收藏"],
  },
  {
    id: "developers", href: "/developers",
    zh: "开发工具与包", en: "Developer Tools & Packages",
    descriptionZh: "配置 CLI、MCP 与 Agent Skill，在开发工具中使用 StyleKit",
    descriptionEn: "Set up the CLI, MCP and Agent Skill in your development tools",
    keywords: ["developer", "developers", "cli", "mcp", "skill", "npm", "安装", "开发工具", "工具"],
  },
] as const;

export function getToolSearchItems(locale: Locale) {
  return TOOL_PAGES.map((page) => ({
    id: `tool-${page.id}`,
    type: "tool" as const,
    href: page.href,
    title: locale === "zh" ? page.zh : page.en,
    description: locale === "zh" ? page.descriptionZh : page.descriptionEn,
    keywords: [...page.keywords, page.zh, page.en],
  }));
}
