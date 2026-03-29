export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  titleZh?: string;
  changes: {
    type: "added" | "changed" | "fixed" | "removed";
    description: string;
    descriptionZh?: string;
  }[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "0.13.0",
    date: "2025-07-10",
    title: "Localized Prompt Exports",
    titleZh: "提示词本地化导出",
    changes: [
      { type: "added", description: "aiRulesEn support: English hard prompts now use localized style rules", descriptionZh: "新增 aiRulesEn 支持：英文硬性提示词现在使用本地化风格规则" },
      { type: "fixed", description: "English hard prompt was shorter than Chinese due to missing enhancedRules fallback", descriptionZh: "修复英文硬性提示词因缺少 enhancedRules 回退导致内容比中文短的问题" },
      { type: "added", description: "Example prompts copy correctly localized rules (aiRulesEn) in English locale", descriptionZh: "示例提示词复制时在英文语言下正确使用 aiRulesEn" },
      { type: "changed", description: "doListEn, dontListEn, keywordsEn passed through PromptPairExporter for full EN localization", descriptionZh: "PromptPairExporter 现传递 doListEn、dontListEn、keywordsEn 实现完整英文本地化" },
    ],
  },
  {
    version: "0.12.0",
    date: "2026-03-18",
    title: "Promotion Readiness and Polish",
    titleZh: "推广准备与打磨",
    changes: [
      { type: "added", description: "Comprehensive promotion readiness: SEO, analytics, blog, social proof, and monitoring", descriptionZh: "全面推广准备：SEO、分析、博客、社会证明和监控" },
      { type: "fixed", description: "Export dialog rendering off-screen due to DOM nesting", descriptionZh: "修复导出对话框因 DOM 嵌套导致的屏幕外渲染" },
      { type: "fixed", description: "Collapsible sections invisible on Chrome 120+ desktop", descriptionZh: "修复折叠区域在 Chrome 120+ 桌面端不可见的问题" },
      { type: "changed", description: "Reordered style detail page sections by user priority", descriptionZh: "按用户优先级重新排列风格详情页各区域" },
    ],
  },
  {
    version: "0.11.0",
    date: "2026-03-17",
    title: "Animation Catalog Redesign",
    titleZh: "动画目录重新设计",
    changes: [
      { type: "added", description: "Sandbox panel with universal playground for animations", descriptionZh: "沙盒面板，提供动画通用演练场" },
      { type: "added", description: "Compact filter bar with category, trigger, and difficulty filters", descriptionZh: "紧凑筛选栏，支持分类、触发方式和难度筛选" },
      { type: "added", description: "Scroll-page-turn and scroll-peel-away animations", descriptionZh: "新增滚动翻页和滚动剥离动画" },
      { type: "changed", description: "Migrated all 49 animations to directory-based structure", descriptionZh: "将全部 49 个动画迁移至目录结构" },
      { type: "removed", description: "Removed animation StyleType and 4 legacy animation styles", descriptionZh: "移除动画 StyleType 及 4 个旧版动画风格" },
    ],
  },
  {
    version: "0.10.0",
    date: "2026-03-17",
    title: "Styles Expansion and Scenario Discovery",
    titleZh: "风格扩展与场景发现",
    changes: [
      { type: "added", description: "4 new styles to fill scenario gaps, plus card-flip, voice-recorder, retro-radio, weather-card animations", descriptionZh: "新增 4 种风格填补场景空白，以及卡片翻转、录音机、复古收音机、天气卡片动画" },
      { type: "added", description: "Scenario-based style discovery and homepage entry points", descriptionZh: "基于场景的风格发现和首页入口" },
      { type: "added", description: "Live iframe embed for showcase previews", descriptionZh: "展示预览的实时 iframe 嵌入" },
      { type: "added", description: "Publishable stylekit-contributor skill for external PRs", descriptionZh: "可发布的 stylekit-contributor 技能，支持外部 PR" },
      { type: "changed", description: "Upgraded quality scorer v2 and enhanced all 127 styles to B grade", descriptionZh: "升级质量评分器 v2，将全部 127 种风格提升至 B 级" },
      { type: "changed", description: "Comprehensive mobile layout optimization", descriptionZh: "全面移动端布局优化" },
      { type: "fixed", description: "Canonical URLs aligned with Vercel primary domain", descriptionZh: "规范 URL 与 Vercel 主域名对齐" },
    ],
  },
  {
    version: "0.9.0",
    date: "2026-03-16",
    title: "Resource Libraries and SEO",
    titleZh: "资源库与 SEO",
    changes: [
      { type: "added", description: "Gradients library with 40+ presets", descriptionZh: "渐变库，包含 40+ 预设" },
      { type: "added", description: "Shadows library with 30+ box-shadow presets", descriptionZh: "阴影库，包含 30+ box-shadow 预设" },
      { type: "added", description: "Typography and backgrounds resource pages", descriptionZh: "字体排版和背景资源页面" },
      { type: "added", description: "Comprehensive SEO optimization", descriptionZh: "全面 SEO 优化" },
      { type: "added", description: "English translations for all 118 style definitions", descriptionZh: "全部 118 种风格定义的英文翻译" },
      { type: "added", description: "GitHub Star button with live star count", descriptionZh: "GitHub Star 按钮，实时显示 star 数" },
      { type: "changed", description: "Reorganized nav with Resources dropdown menu", descriptionZh: "重组导航栏，新增资源下拉菜单" },
    ],
  },
  {
    version: "0.8.0",
    date: "2026-03-15",
    title: "Animation Platform and Performance",
    titleZh: "动画平台与性能",
    changes: [
      { type: "added", description: "Expanded to 25 animations with polished card covers", descriptionZh: "扩展至 25 个动画，配有精美卡片封面" },
      { type: "added", description: "12 new animations covering exit, transition, and more", descriptionZh: "新增 12 个动画，涵盖退出、过渡等效果" },
      { type: "changed", description: "Smooth animation browsing and list filtering performance", descriptionZh: "优化动画浏览和列表筛选性能" },
      { type: "fixed", description: "Hydration mismatch on animation detail pages", descriptionZh: "修复动画详情页的 hydration 不匹配" },
      { type: "fixed", description: "Live style cover previews restored", descriptionZh: "恢复实时风格封面预览" },
    ],
  },
];
