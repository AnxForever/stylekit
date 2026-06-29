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
    version: "0.17.0",
    date: "2026-06-29",
    title: "Developer Tools — npm packages, shadcn registry, MCP & CLI",
    titleZh: "开发者工具 — npm 包、shadcn registry、MCP 与 CLI",
    changes: [
      { type: "added", description: "shadcn registry: install any style's theme with one command — npx shadcn add https://www.stylekit.top/r/<style>.json", descriptionZh: "shadcn registry：一行命令安装任意风格的主题 — npx shadcn add https://www.stylekit.top/r/<style>.json" },
      { type: "added", description: "stylekit-mcp: an MCP server so Claude, Cursor and Windsurf can search styles and pull tokens, recipes, and install commands", descriptionZh: "stylekit-mcp：MCP 服务器，让 Claude、Cursor、Windsurf 直接搜索风格并获取 tokens、recipes 和安装命令" },
      { type: "added", description: "stylekit-cli: browse and install styles from your terminal", descriptionZh: "stylekit-cli：在终端浏览和安装风格" },
      { type: "added", description: "stylekit-core: an npm SDK for programmatic access to 130+ styles, tokens, and recipes", descriptionZh: "stylekit-core：npm SDK，程序化访问 130+ 风格、tokens 和 recipes" },
      { type: "added", description: "New /developers page with install entry points for all three tools", descriptionZh: "新增 /developers 页面，汇总三个工具的安装入口" },
      { type: "changed", description: "Each style now derives a distinct, contrast-safe shadcn theme (light + dark) covering the full token set including charts and sidebar", descriptionZh: "每个风格现在派生独特、对比安全的 shadcn 主题（明暗双模式），覆盖完整 token 集（含 charts 和 sidebar）" },
    ],
  },
  {
    version: "0.16.0",
    date: "2026-06-22",
    title: "Cursor Lab — 17 Interactive Rooms, GSAP Migration",
    titleZh: "Cursor Lab — 17 间交互房间，GSAP 迁移",
    changes: [
      { type: "added", description: "Cursor Lab with 17 distinct pointer-interaction rooms, each matching a design style", descriptionZh: "Cursor Lab 上线，17 间各不相同的指针交互房间，每间对应一种设计风格" },
      { type: "added", description: "12 custom mouse-interaction primitives: Warp, Mirror, Grid3D, EmblemSpin, SpeedLine, PaperLayer, GeometricFragments, and more", descriptionZh: "12 种自定义鼠标交互动效原语：Warp、Mirror、Grid3D、EmblemSpin、SpeedLine、PaperLayer、GeometricFragments 等" },
      { type: "changed", description: "Migrated 8 core primitives from hand-rolled rAF loops to GSAP quickTo with expo.out easing", descriptionZh: "将 8 个核心原语从手写 rAF 循环迁移到 GSAP quickTo + expo.out 缓动" },
      { type: "changed", description: "Deduplicated rooms: removed 3 near-identical rooms (macOS, Apple, African Textile), 20 → 17 unique combinations", descriptionZh: "去重房间：移除 3 间近似克隆房（macOS、Apple、African Textile），20→17 间各不相同的组合" },
      { type: "added", description: "Announcement banner for version updates across all pages", descriptionZh: "全站版本更新公告横幅" },
    ],
  },
  {
    version: "0.15.0",
    date: "2026-04-15",
    title: "Playground Revamp",
    titleZh: "Playground 重构",
    changes: [
      { type: "added", description: "Full i18n coverage for animations, recipes, and playground pages", descriptionZh: "动画、配方和 Playground 页面全面 i18n 覆盖" },
      { type: "added", description: "Site filing information in footer for regulatory compliance", descriptionZh: "页脚添加站点备案信息" },
      { type: "changed", description: "Rewritten tokensToCSS engine and cleaned up playground imports", descriptionZh: "重写 tokensToCSS 引擎并清理 Playground 导入" },
      { type: "fixed", description: "Validate codePrompt shape when reading from plan_card_json", descriptionZh: "修复从 plan_card_json 读取 codePrompt 时的类型校验" },
      { type: "fixed", description: "Localized nameEn for PromptPairExporter and tightened language switcher button width", descriptionZh: "修复 PromptPairExporter 的 nameEn 本地化和语言切换按钮宽度" },
    ],
  },
  {
    version: "0.14.0",
    date: "2026-04-01",
    title: "Internationalization and Discovery",
    titleZh: "国际化与风格发现",
    changes: [
      { type: "added", description: "Component patterns gallery with nav entry for browsing reusable UI patterns", descriptionZh: "组件模式库，支持通过导航浏览可复用 UI 模式" },
      { type: "added", description: "Style combination recommendation system for mixing compatible styles", descriptionZh: "风格组合推荐系统，帮助混搭兼容风格" },
      { type: "added", description: "Multi-language prompt system with unified and optimized style rule templates", descriptionZh: "多语言提示词系统，统一优化风格规则模板" },
      { type: "added", description: "Enriched analytics dashboard with deeper traffic insights", descriptionZh: "增强分析面板，提供更深入的流量洞察" },
      { type: "changed", description: "Staticized 150+ pages to reduce Vercel free tier usage", descriptionZh: "将 150+ 页面静态化，降低 Vercel 免费额度占用" },
      { type: "changed", description: "Comprehensive internationalization and UX optimization pass", descriptionZh: "全面的国际化和用户体验优化" },
      { type: "fixed", description: "OAuth redirects now use public base URL correctly", descriptionZh: "OAuth 重定向现在正确使用公共 base URL" },
      { type: "fixed", description: "Canonical base URL normalized to www", descriptionZh: "规范 base URL 统一到 www 域名" },
    ],
  },
  {
    version: "0.13.0",
    date: "2026-03-22",
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
