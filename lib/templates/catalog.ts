import type { LocaleCopy } from "@/lib/i18n/locale-copy";

export type TemplateCatalogType =
  | "landing"
  | "dashboard"
  | "blog"
  | "portfolio"
  | "saas"
  | "ecommerce"
  | "admin"
  | "auth"
  | "docs"
  | "social"
  | "messaging"
  | "media"
  | "lifestyle"
  | "education";

export interface TemplateCatalogEntry {
  id: string;
  name: LocaleCopy<string>;
  description: LocaleCopy<string>;
  styleSlug: string;
  coverColors?: {
    primary: string;
    secondary: string;
    accent: string[];
  };
  type: TemplateCatalogType;
  href: string;
  codePath: string;
  /**
   * Community/partner projects hosted outside StyleKit. External entries link
   * out instead of opening an in-site showcase, so they have no codePath and
   * are excluded from source/download APIs and the sitemap.
   */
  external?: {
    repoUrl: string;
    siteUrl: string;
  };
}

function defineTemplate(
  input: Omit<TemplateCatalogEntry, "codePath">
): TemplateCatalogEntry {
  return {
    ...input,
    codePath: `app${input.href}/page.tsx`,
  };
}

export const templateCatalog: TemplateCatalogEntry[] = [
  defineTemplate({
    id: "brutal-landing",
    name: { zh: "野兽派落地页", en: "Brutal Landing Page" },
    description: {
      zh: "高冲击力的 Neo-Brutalist 落地页，适合新品发布与品牌主导型活动。",
      en: "High-impact Neo-Brutalist landing page for launches and brand-first campaigns.",
    },
    styleSlug: "neo-brutalist",
    type: "landing",
    href: "/templates/brutal-landing",
  }),
  defineTemplate({
    id: "glass-landing",
    name: { zh: "玻璃拟态落地页", en: "Glass Landing Page" },
    description: {
      zh: "现代玻璃拟态落地页，适合 SaaS 产品与科技类展示场景。",
      en: "Modern glassmorphism landing page ideal for SaaS products and technology showcases.",
    },
    styleSlug: "glassmorphism",
    type: "landing",
    href: "/templates/glass-landing",
  }),
  defineTemplate({
    id: "editorial-blog",
    name: { zh: "编辑风博客", en: "Editorial Blog" },
    description: {
      zh: "杂志感阅读布局，突出排版节奏和长内容阅读体验。",
      en: "Magazine-inspired reading layout focused on typography, rhythm, and long-form content.",
    },
    styleSlug: "editorial",
    type: "blog",
    href: "/templates/editorial-blog",
  }),
  defineTemplate({
    id: "anx-blog",
    name: { zh: "Anx 实验博客", en: "Anx Avant Blog" },
    description: {
      zh: "实验型作品集博客混合布局，强调大胆字体、粗边框与动感分区。",
      en: "Experimental portfolio-blog mix with loud typography, brutal borders, and kinetic sections.",
    },
    styleSlug: "neo-brutalist",
    type: "blog",
    href: "/templates/anx-blog",
  }),
  defineTemplate({
    id: "yohaku-blog",
    name: { zh: "余白博客", en: "Yohaku Blog" },
    description: {
      zh: "极简纸质美学博客，灵感源自日式余白哲学。单列阅读布局、时间线文章列表与微弹性动画。",
      en: "Minimalist paper-textured blog inspired by Japanese Yohaku (white space) philosophy. Single-column reading layout with timeline posts and spring animations.",
    },
    styleSlug: "minimalist-flat",
    type: "blog",
    href: "/templates/yohaku-blog",
  }),
  defineTemplate({
    id: "warm-dashboard",
    name: { zh: "暖色仪表盘", en: "Warm Dashboard" },
    description: {
      zh: "暖色调数据面板，包含侧栏导航、统计卡片、图表和表格模块。",
      en: "Warm-toned analytics dashboard with sidebar navigation, stat cards, charts, and data tables.",
    },
    styleSlug: "warm-dashboard",
    type: "dashboard",
    href: "/templates/warm-dashboard",
  }),
  defineTemplate({
    id: "minimalist-portfolio",
    name: { zh: "极简作品集", en: "Minimalist Portfolio" },
    description: {
      zh: "干净扁平的作品集模板，包含项目列表、技能区和联系表单。",
      en: "Clean, flat portfolio with bold typography, project list, skills section, and contact form.",
    },
    styleSlug: "minimalist-flat",
    type: "portfolio",
    href: "/templates/minimalist-portfolio",
  }),
  defineTemplate({
    id: "magazine-landing",
    name: { zh: "杂志风落地页", en: "Magazine Landing" },
    description: {
      zh: "编辑式杂志布局，含精选文章、分类导航与订阅模块。",
      en: "Editorial magazine layout with featured articles, category navigation, and newsletter signup.",
    },
    styleSlug: "magazine-grid",
    type: "landing",
    href: "/templates/magazine-landing",
  }),
  defineTemplate({
    id: "neumorphism-landing",
    name: { zh: "新拟态落地页", en: "Neumorphism Landing" },
    description: {
      zh: "柔和新拟态 SaaS 页面，包含价格卡、推荐区与用户评价模块。",
      en: "Soft neumorphic SaaS landing page with raised elements, pricing cards, and testimonials.",
    },
    styleSlug: "neumorphism",
    type: "landing",
    href: "/templates/neumorphism-landing",
  }),
  defineTemplate({
    id: "brutalist-playful-blog",
    name: { zh: "玩味野兽派博客", en: "Brutalist Playful Blog" },
    description: {
      zh: "彩色 Neo-Brutalist 博客，使用粗边框、硬阴影与有趣布局。",
      en: "Colorful neo-brutalist blog with thick borders, hard shadows, category filters, and playful layouts.",
    },
    styleSlug: "neo-brutalist-playful",
    type: "blog",
    href: "/templates/brutalist-playful-blog",
  }),
  defineTemplate({
    id: "saas-landing",
    name: { zh: "SaaS 产品落地页", en: "SaaS Landing Page" },
    description: {
      zh: "现代 SaaS 产品落地页，包含功能展示、定价方案、客户评价和 CTA 模块。",
      en: "Modern SaaS landing page with feature grid, pricing plans, testimonials, and call-to-action sections.",
    },
    styleSlug: "stripe-style",
    type: "saas",
    href: "/templates/saas-landing",
  }),
  {
    id: "nextdevtpl",
    name: { zh: "NextDevTpl · SaaS 全栈模板", en: "NextDevTpl · SaaS Starter" },
    description: {
      zh: "开源 Next.js 16 SaaS 启动模板：认证、支付、积分、邮件、存储、工单与多部署目标，按需组合生成独立项目。",
      en: "Open-source Next.js 16 SaaS starter with auth, payments, credits, mail, storage, support tickets, and multiple deploy targets, composed per project.",
    },
    styleSlug: "",
    type: "saas",
    href: "https://nextdevtpl.chaosyn.com",
    codePath: "",
    external: {
      repoUrl: "https://github.com/evepupil/NextDevTpl",
      siteUrl: "https://nextdevtpl.chaosyn.com",
    },
  },
  defineTemplate({
    id: "ecommerce-product",
    name: { zh: "电商产品页", en: "E-Commerce Product Page" },
    description: {
      zh: "完整的电商单品展示页，包含图片画廊、颜色选择器、评价区和相关推荐。",
      en: "Full e-commerce product page with image gallery, color picker, reviews, and related products.",
    },
    styleSlug: "apple-style",
    type: "ecommerce",
    href: "/templates/ecommerce-product",
  }),
  defineTemplate({
    id: "blog-sidebar",
    name: { zh: "侧栏博客", en: "Blog with Sidebar" },
    description: {
      zh: "经典双栏博客布局，含文章列表、分类导航、标签云和订阅模块。",
      en: "Classic two-column blog layout with article list, category navigation, tag cloud, and newsletter signup.",
    },
    styleSlug: "notion-style",
    type: "blog",
    href: "/templates/blog-sidebar",
  }),
  defineTemplate({
    id: "admin-panel",
    name: { zh: "管理面板", en: "Admin Panel" },
    description: {
      zh: "后台管理面板，包含侧栏导航、用户管理表格、角色权限和搜索过滤。",
      en: "Admin panel with sidebar navigation, user management table, role permissions, and search filters.",
    },
    styleSlug: "corporate-clean",
    type: "admin",
    href: "/templates/admin-panel",
  }),
  defineTemplate({
    id: "portfolio-gallery",
    name: { zh: "作品集画廊", en: "Portfolio Gallery" },
    description: {
      zh: "暗色主题作品集画廊，支持网格/列表视图切换、分类过滤和灯箱预览。",
      en: "Dark-themed portfolio gallery with grid/list toggle, category filtering, and lightbox preview.",
    },
    styleSlug: "dark-mode",
    type: "portfolio",
    href: "/templates/portfolio-gallery",
  }),
  defineTemplate({
    id: "auth-pages",
    name: { zh: "认证页面集", en: "Auth Pages" },
    description: {
      zh: "完整认证流程页面，包含登录、注册、忘记密码，支持社交登录。",
      en: "Complete auth flow with login, register, and forgot-password views, plus social login support.",
    },
    styleSlug: "soft-ui",
    type: "auth",
    href: "/templates/auth-pages",
  }),
  defineTemplate({
    id: "pricing-page",
    name: { zh: "定价页", en: "Pricing Page" },
    description: {
      zh: "清晰的三档定价页，包含功能对比表、FAQ 和详细的套餐说明。",
      en: "Clean three-tier pricing page with feature comparison table, FAQ section, and detailed plan breakdowns.",
    },
    styleSlug: "minimalist-flat",
    type: "saas",
    href: "/templates/pricing-page",
  }),
  defineTemplate({
    id: "dashboard-charts",
    name: { zh: "图表仪表盘", en: "Dashboard with Charts" },
    description: {
      zh: "数据驱动的分析仪表盘，含收入趋势图、流量来源、订单表格和实时统计。",
      en: "Data-driven analytics dashboard with revenue charts, traffic sources, order tables, and live stats.",
    },
    styleSlug: "material-design",
    type: "dashboard",
    href: "/templates/dashboard-charts",
  }),
  defineTemplate({
    id: "docs-site",
    name: { zh: "文档站点", en: "Documentation Site" },
    description: {
      zh: "三栏文档站点，包含侧栏导航、内容区域、目录导航和代码块。",
      en: "Three-column docs site with sidebar navigation, main content area, table of contents, and code blocks.",
    },
    styleSlug: "notion-style",
    type: "docs",
    href: "/templates/docs-site",
  }),
  defineTemplate({
    id: "settings-page",
    name: { zh: "设置页面", en: "Settings Page" },
    description: {
      zh: "完整的账户设置页面，包含个人资料、通知偏好、主题切换、安全和账单模块。",
      en: "Full account settings with profile, notifications, appearance, security, and billing tabs.",
    },
    styleSlug: "fluent-design",
    type: "admin",
    href: "/templates/settings-page",
  }),
  defineTemplate({
    id: "startup-landing",
    name: { zh: "创业公司落地页", en: "Startup Landing Page" },
    description: {
      zh: "暗色系创业公司落地页，渐变装饰、功能网格、三步引导和邮件注册。",
      en: "Dark startup landing page with gradient orbs, feature grid, three-step flow, and email waitlist.",
    },
    styleSlug: "modern-gradient",
    type: "landing",
    href: "/templates/startup-landing",
  }),
  defineTemplate({
    id: "social-feed",
    name: { zh: "社交媒体信息流", en: "Social Media Feed" },
    description: {
      zh: "社交媒体信息流页面，包含发帖、点赞、转发和侧栏推荐等模块。",
      en: "Social media feed with post composition, likes, reposts, trending topics, and suggested follows.",
    },
    styleSlug: "bento-grid",
    type: "social",
    href: "/templates/social-feed",
  }),
  defineTemplate({
    id: "file-manager",
    name: { zh: "文件管理器", en: "File Manager" },
    description: {
      zh: "云存储文件管理界面，支持网格/列表视图、文件搜索和存储空间展示。",
      en: "Cloud storage file manager with grid/list views, file search, storage usage, and quick actions.",
    },
    styleSlug: "fluent-design",
    type: "admin",
    href: "/templates/file-manager",
  }),
  defineTemplate({
    id: "chat-messaging",
    name: { zh: "即时通讯界面", en: "Chat Messaging" },
    description: {
      zh: "即时通讯聊天界面，包含会话列表、消息气泡、在线状态和实时输入。",
      en: "Chat messaging interface with conversation list, message bubbles, online status, and real-time input.",
    },
    styleSlug: "soft-ui",
    type: "messaging",
    href: "/templates/chat-messaging",
  }),
  defineTemplate({
    id: "calendar-schedule",
    name: { zh: "日历排程", en: "Calendar Schedule" },
    description: {
      zh: "日历排程页面，包含迷你日历、日视图事件列表、颜色分类和快速创建。",
      en: "Calendar scheduling page with mini calendar, day view events, color-coded categories, and quick create.",
    },
    styleSlug: "material-design",
    type: "dashboard",
    href: "/templates/calendar-schedule",
  }),
  defineTemplate({
    id: "email-inbox",
    name: { zh: "邮件收件箱", en: "Email Inbox" },
    description: {
      zh: "三栏式邮件客户端，包含文件夹导航、邮件列表、详情阅读和标签分类。",
      en: "Three-pane email client with folder navigation, email list, detail view, labels, and search.",
    },
    styleSlug: "corporate-clean",
    type: "admin",
    href: "/templates/email-inbox",
  }),
  defineTemplate({
    id: "music-player",
    name: { zh: "音乐播放器", en: "Music Player" },
    description: {
      zh: "暗色主题音乐播放器，包含播放队列、播放控制栏、音量调节和播放列表。",
      en: "Dark-themed music player with queue, playback controls, volume slider, and playlist sidebar.",
    },
    styleSlug: "dark-mode",
    type: "media",
    href: "/templates/music-player",
  }),
  defineTemplate({
    id: "recipe-cooking",
    name: { zh: "食谱烹饪", en: "Recipe Cooking" },
    description: {
      zh: "食谱页面，包含步骤勾选、食材份量调整、分类浏览和营养信息。",
      en: "Recipe page with step tracking, ingredient scaling, category browsing, and nutritional info.",
    },
    styleSlug: "natural-organic",
    type: "lifestyle",
    href: "/templates/recipe-cooking",
  }),
  defineTemplate({
    id: "travel-booking",
    name: { zh: "旅行预订", en: "Travel Booking" },
    description: {
      zh: "旅行预订页面，包含目的地搜索、标签筛选、价格展示和收藏功能。",
      en: "Travel booking page with destination search, tag filters, pricing display, and favorites.",
    },
    styleSlug: "modern-gradient",
    type: "lifestyle",
    href: "/templates/travel-booking",
  }),
  defineTemplate({
    id: "fitness-health",
    name: { zh: "健身仪表盘", en: "Fitness Dashboard" },
    description: {
      zh: "暗色健身数据面板，包含步数、卡路里、运动记录、营养追踪和成就徽章。",
      en: "Dark fitness dashboard with steps, calories, workout log, nutrition tracking, and achievement badges.",
    },
    styleSlug: "neon-gradient",
    type: "dashboard",
    href: "/templates/fitness-health",
  }),
  defineTemplate({
    id: "learning-course",
    name: { zh: "在线学习平台", en: "Learning Platform" },
    description: {
      zh: "在线课程学习平台，包含课程进度、课程列表、成就统计和视频课程导航。",
      en: "Online learning platform with course progress, lesson list, achievement stats, and course catalog.",
    },
    styleSlug: "notion-style",
    type: "education",
    href: "/templates/learning-course",
  }),
  defineTemplate({
    id: "real-estate",
    name: { zh: "房产列表", en: "Real Estate Listing" },
    description: {
      zh: "房产展示页面，支持网格/列表视图、价格筛选、户型参数和地图标注。",
      en: "Real estate listing page with grid/list views, price filters, property details, and agent info.",
    },
    styleSlug: "apple-style",
    type: "ecommerce",
    href: "/templates/real-estate",
  }),
  defineTemplate({
    id: "kokonutui-dashboard",
    name: { zh: "KokonutUI 财务面板", en: "KokonutUI Finance Dashboard" },
    description: {
      zh: "现代财务管理仪表盘，包含账户概览、交易记录和事件追踪。",
      en: "Modern finance dashboard with account overview, transactions, and event tracking.",
    },
    styleSlug: "kokonutui-dashboard",
    coverColors: {
      primary: "#18181b",
      secondary: "#71717a",
      accent: ["#27272a", "#52525b", "#a1a1aa"],
    },
    type: "dashboard",
    href: "/templates/kokonutui-dashboard",
  }),
  defineTemplate({
    id: "crm-frosted-glass",
    name: { zh: "KONTUR 纸感 CRM", en: "KONTUR Ledger CRM" },
    description: {
      zh: "瑞士账本气质的纸感 CRM 工作台：销售管线看板、联系人台账、纯 CSS 营收图表与活动时间线。",
      en: "Swiss-ledger CRM workspace on warm paper: pipeline kanban, contact ledger, pure-CSS revenue chart, and an activity timeline.",
    },
    styleSlug: "crm-frosted-glass",
    coverColors: {
      primary: "#1E5C42",
      secondary: "#F4F2EC",
      accent: ["#B7791F", "#16150F", "#DAD5C8"],
    },
    type: "dashboard",
    href: "/templates/crm-frosted-glass",
  }),
  defineTemplate({
    id: "shadcn-analytics",
    name: { zh: "shadcn 数据分析面板", en: "shadcn Analytics Dashboard" },
    description: {
      zh: "基于 shadcn 风格的数据分析仪表盘，包含统计卡片、交互式图表和数据表格。",
      en: "shadcn-style analytics dashboard with stat cards, interactive charts, and data tables.",
    },
    styleSlug: "shadcn-analytics",
    coverColors: {
      primary: "#111827",
      secondary: "#6b7280",
      accent: ["#3b82f6", "#10b981", "#f59e0b"],
    },
    type: "dashboard",
    href: "/templates/shadcn-analytics",
  }),
];
