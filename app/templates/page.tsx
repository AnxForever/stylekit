"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { TemplatesFilter } from "@/components/templates/templates-filter";
import { TemplateCoverPreview } from "@/components/templates/template-cover-preview";
import { useI18n } from "@/lib/i18n/context";
import { pickLocale, type LocaleCopy } from "@/lib/i18n/locale-copy";

type TemplateType = "landing" | "dashboard" | "blog" | "portfolio" | "saas" | "ecommerce" | "admin" | "auth" | "docs" | "social" | "messaging" | "media" | "lifestyle" | "education";
type TemplateTypeFilter = "all" | TemplateType;
type TemplateSort = "recommended" | "name-asc" | "name-desc";

interface Template {
  id: string;
  name: LocaleCopy<string>;
  description: LocaleCopy<string>;
  styleSlug: string;
  type: TemplateType;
  href: string;
}

const templates: Template[] = [
  {
    id: "brutal-landing",
    name: { zh: "野兽派落地页", en: "Brutal Landing Page" },
    description: {
      zh: "高冲击力的 Neo-Brutalist 落地页，适合新品发布与品牌主导型活动。",
      en: "High-impact Neo-Brutalist landing page for launches and brand-first campaigns.",
    },
    styleSlug: "neo-brutalist",
    type: "landing",
    href: "/templates/brutal-landing",
  },
  {
    id: "glass-landing",
    name: { zh: "玻璃拟态落地页", en: "Glass Landing Page" },
    description: {
      zh: "现代玻璃拟态落地页，适合 SaaS 产品与科技类展示场景。",
      en: "Modern glassmorphism landing page ideal for SaaS products and technology showcases.",
    },
    styleSlug: "glassmorphism",
    type: "landing",
    href: "/templates/glass-landing",
  },
  {
    id: "editorial-blog",
    name: { zh: "编辑风博客", en: "Editorial Blog" },
    description: {
      zh: "杂志感阅读布局，突出排版节奏和长内容阅读体验。",
      en: "Magazine-inspired reading layout focused on typography, rhythm, and long-form content.",
    },
    styleSlug: "editorial",
    type: "blog",
    href: "/templates/editorial-blog",
  },
  {
    id: "anx-blog",
    name: { zh: "Anx 实验博客", en: "Anx Avant Blog" },
    description: {
      zh: "实验型作品集博客混合布局，强调大胆字体、粗边框与动感分区。",
      en: "Experimental portfolio-blog mix with loud typography, brutal borders, and kinetic sections.",
    },
    styleSlug: "neo-brutalist",
    type: "blog",
    href: "/templates/anx-blog",
  },
  {
    id: "warm-dashboard",
    name: { zh: "暖色仪表盘", en: "Warm Dashboard" },
    description: {
      zh: "暖色调数据面板，包含侧栏导航、统计卡片、图表和表格模块。",
      en: "Warm-toned analytics dashboard with sidebar navigation, stat cards, charts, and data tables.",
    },
    styleSlug: "warm-dashboard",
    type: "dashboard",
    href: "/templates/warm-dashboard",
  },
  {
    id: "minimalist-portfolio",
    name: { zh: "极简作品集", en: "Minimalist Portfolio" },
    description: {
      zh: "干净扁平的作品集模板，包含项目列表、技能区和联系表单。",
      en: "Clean, flat portfolio with bold typography, project list, skills section, and contact form.",
    },
    styleSlug: "minimalist-flat",
    type: "portfolio",
    href: "/templates/minimalist-portfolio",
  },
  {
    id: "magazine-landing",
    name: { zh: "杂志风落地页", en: "Magazine Landing" },
    description: {
      zh: "编辑式杂志布局，含精选文章、分类导航与订阅模块。",
      en: "Editorial magazine layout with featured articles, category navigation, and newsletter signup.",
    },
    styleSlug: "magazine-grid",
    type: "landing",
    href: "/templates/magazine-landing",
  },
  {
    id: "neumorphism-landing",
    name: { zh: "新拟态落地页", en: "Neumorphism Landing" },
    description: {
      zh: "柔和新拟态 SaaS 页面，包含价格卡、推荐区与用户评价模块。",
      en: "Soft neumorphic SaaS landing page with raised elements, pricing cards, and testimonials.",
    },
    styleSlug: "neumorphism",
    type: "landing",
    href: "/templates/neumorphism-landing",
  },
  {
    id: "brutalist-playful-blog",
    name: { zh: "玩味野兽派博客", en: "Brutalist Playful Blog" },
    description: {
      zh: "彩色 Neo-Brutalist 博客，使用粗边框、硬阴影与有趣布局。",
      en: "Colorful neo-brutalist blog with thick borders, hard shadows, category filters, and playful layouts.",
    },
    styleSlug: "neo-brutalist-playful",
    type: "blog",
    href: "/templates/brutalist-playful-blog",
  },
  {
    id: "saas-landing",
    name: { zh: "SaaS 产品落地页", en: "SaaS Landing Page" },
    description: {
      zh: "现代 SaaS 产品落地页，包含功能展示、定价方案、客户评价和 CTA 模块。",
      en: "Modern SaaS landing page with feature grid, pricing plans, testimonials, and call-to-action sections.",
    },
    styleSlug: "stripe-style",
    type: "saas",
    href: "/templates/saas-landing",
  },
  {
    id: "ecommerce-product",
    name: { zh: "电商产品页", en: "E-Commerce Product Page" },
    description: {
      zh: "完整的电商单品展示页，包含图片画廊、颜色选择器、评价区和相关推荐。",
      en: "Full e-commerce product page with image gallery, color picker, reviews, and related products.",
    },
    styleSlug: "apple-style",
    type: "ecommerce",
    href: "/templates/ecommerce-product",
  },
  {
    id: "blog-sidebar",
    name: { zh: "侧栏博客", en: "Blog with Sidebar" },
    description: {
      zh: "经典双栏博客布局，含文章列表、分类导航、标签云和订阅模块。",
      en: "Classic two-column blog layout with article list, category navigation, tag cloud, and newsletter signup.",
    },
    styleSlug: "notion-style",
    type: "blog",
    href: "/templates/blog-sidebar",
  },
  {
    id: "admin-panel",
    name: { zh: "管理面板", en: "Admin Panel" },
    description: {
      zh: "后台管理面板，包含侧栏导航、用户管理表格、角色权限和搜索过滤。",
      en: "Admin panel with sidebar navigation, user management table, role permissions, and search filters.",
    },
    styleSlug: "corporate-clean",
    type: "admin",
    href: "/templates/admin-panel",
  },
  {
    id: "portfolio-gallery",
    name: { zh: "作品集画廊", en: "Portfolio Gallery" },
    description: {
      zh: "暗色主题作品集画廊，支持网格/列表视图切换、分类过滤和灯箱预览。",
      en: "Dark-themed portfolio gallery with grid/list toggle, category filtering, and lightbox preview.",
    },
    styleSlug: "dark-mode",
    type: "portfolio",
    href: "/templates/portfolio-gallery",
  },
  {
    id: "auth-pages",
    name: { zh: "认证页面集", en: "Auth Pages" },
    description: {
      zh: "完整认证流程页面，包含登录、注册、忘记密码，支持社交登录。",
      en: "Complete auth flow with login, register, and forgot-password views, plus social login support.",
    },
    styleSlug: "soft-ui",
    type: "auth",
    href: "/templates/auth-pages",
  },
  {
    id: "pricing-page",
    name: { zh: "定价页", en: "Pricing Page" },
    description: {
      zh: "清晰的三档定价页，包含功能对比表、FAQ 和详细的套餐说明。",
      en: "Clean three-tier pricing page with feature comparison table, FAQ section, and detailed plan breakdowns.",
    },
    styleSlug: "minimalist-flat",
    type: "saas",
    href: "/templates/pricing-page",
  },
  {
    id: "dashboard-charts",
    name: { zh: "图表仪表盘", en: "Dashboard with Charts" },
    description: {
      zh: "数据驱动的分析仪表盘，含收入趋势图、流量来源、订单表格和实时统计。",
      en: "Data-driven analytics dashboard with revenue charts, traffic sources, order tables, and live stats.",
    },
    styleSlug: "material-design",
    type: "dashboard",
    href: "/templates/dashboard-charts",
  },
  {
    id: "docs-site",
    name: { zh: "文档站点", en: "Documentation Site" },
    description: {
      zh: "三栏文档站点，包含侧栏导航、内容区域、目录导航和代码块。",
      en: "Three-column docs site with sidebar navigation, main content area, table of contents, and code blocks.",
    },
    styleSlug: "notion-style",
    type: "docs",
    href: "/templates/docs-site",
  },
  {
    id: "settings-page",
    name: { zh: "设置页面", en: "Settings Page" },
    description: {
      zh: "完整的账户设置页面，包含个人资料、通知偏好、主题切换、安全和账单模块。",
      en: "Full account settings with profile, notifications, appearance, security, and billing tabs.",
    },
    styleSlug: "fluent-design",
    type: "admin",
    href: "/templates/settings-page",
  },
  {
    id: "startup-landing",
    name: { zh: "创业公司落地页", en: "Startup Landing Page" },
    description: {
      zh: "暗色系创业公司落地页，渐变装饰、功能网格、三步引导和邮件注册。",
      en: "Dark startup landing page with gradient orbs, feature grid, three-step flow, and email waitlist.",
    },
    styleSlug: "modern-gradient",
    type: "landing",
    href: "/templates/startup-landing",
  },
  {
    id: "social-feed",
    name: { zh: "社交媒体信息流", en: "Social Media Feed" },
    description: {
      zh: "社交媒体信息流页面，包含发帖、点赞、转发和侧栏推荐等模块。",
      en: "Social media feed with post composition, likes, reposts, trending topics, and suggested follows.",
    },
    styleSlug: "bento-grid",
    type: "social",
    href: "/templates/social-feed",
  },
  {
    id: "file-manager",
    name: { zh: "文件管理器", en: "File Manager" },
    description: {
      zh: "云存储文件管理界面，支持网格/列表视图、文件搜索和存储空间展示。",
      en: "Cloud storage file manager with grid/list views, file search, storage usage, and quick actions.",
    },
    styleSlug: "fluent-design",
    type: "admin",
    href: "/templates/file-manager",
  },
  {
    id: "chat-messaging",
    name: { zh: "即时通讯界面", en: "Chat Messaging" },
    description: {
      zh: "即时通讯聊天界面，包含会话列表、消息气泡、在线状态和实时输入。",
      en: "Chat messaging interface with conversation list, message bubbles, online status, and real-time input.",
    },
    styleSlug: "soft-ui",
    type: "messaging",
    href: "/templates/chat-messaging",
  },
  {
    id: "calendar-schedule",
    name: { zh: "日历排程", en: "Calendar Schedule" },
    description: {
      zh: "日历排程页面，包含迷你日历、日视图事件列表、颜色分类和快速创建。",
      en: "Calendar scheduling page with mini calendar, day view events, color-coded categories, and quick create.",
    },
    styleSlug: "material-design",
    type: "dashboard",
    href: "/templates/calendar-schedule",
  },
  {
    id: "email-inbox",
    name: { zh: "邮件收件箱", en: "Email Inbox" },
    description: {
      zh: "三栏式邮件客户端，包含文件夹导航、邮件列表、详情阅读和标签分类。",
      en: "Three-pane email client with folder navigation, email list, detail view, labels, and search.",
    },
    styleSlug: "corporate-clean",
    type: "admin",
    href: "/templates/email-inbox",
  },
  {
    id: "music-player",
    name: { zh: "音乐播放器", en: "Music Player" },
    description: {
      zh: "暗色主题音乐播放器，包含播放队列、播放控制栏、音量调节和播放列表。",
      en: "Dark-themed music player with queue, playback controls, volume slider, and playlist sidebar.",
    },
    styleSlug: "dark-mode",
    type: "media",
    href: "/templates/music-player",
  },
  {
    id: "recipe-cooking",
    name: { zh: "食谱烹饪", en: "Recipe Cooking" },
    description: {
      zh: "食谱页面，包含步骤勾选、食材份量调整、分类浏览和营养信息。",
      en: "Recipe page with step tracking, ingredient scaling, category browsing, and nutritional info.",
    },
    styleSlug: "natural-organic",
    type: "lifestyle",
    href: "/templates/recipe-cooking",
  },
  {
    id: "travel-booking",
    name: { zh: "旅行预订", en: "Travel Booking" },
    description: {
      zh: "旅行预订页面，包含目的地搜索、标签筛选、价格展示和收藏功能。",
      en: "Travel booking page with destination search, tag filters, pricing display, and favorites.",
    },
    styleSlug: "modern-gradient",
    type: "lifestyle",
    href: "/templates/travel-booking",
  },
  {
    id: "fitness-health",
    name: { zh: "健身仪表盘", en: "Fitness Dashboard" },
    description: {
      zh: "暗色健身数据面板，包含步数、卡路里、运动记录、营养追踪和成就徽章。",
      en: "Dark fitness dashboard with steps, calories, workout log, nutrition tracking, and achievement badges.",
    },
    styleSlug: "neon-gradient",
    type: "dashboard",
    href: "/templates/fitness-health",
  },
  {
    id: "learning-course",
    name: { zh: "在线学习平台", en: "Learning Platform" },
    description: {
      zh: "在线课程学习平台，包含课程进度、课程列表、成就统计和视频课程导航。",
      en: "Online learning platform with course progress, lesson list, achievement stats, and course catalog.",
    },
    styleSlug: "notion-style",
    type: "education",
    href: "/templates/learning-course",
  },
  {
    id: "real-estate",
    name: { zh: "房产列表", en: "Real Estate Listing" },
    description: {
      zh: "房产展示页面，支持网格/列表视图、价格筛选、户型参数和地图标注。",
      en: "Real estate listing page with grid/list views, price filters, property details, and agent info.",
    },
    styleSlug: "apple-style",
    type: "ecommerce",
    href: "/templates/real-estate",
  },
];

const allStyles = getAllStylesMeta();
const styleMap = new Map(allStyles.map((style) => [style.slug, style]));

function getTemplateGridColumns() {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

function templateTypeToTranslationKey(type: TemplateType) {
  switch (type) {
    case "landing":
      return "templates.typeLanding";
    case "dashboard":
      return "templates.typeDashboard";
    case "blog":
      return "templates.typeBlog";
    case "portfolio":
      return "templates.typePortfolio";
    case "saas":
      return "templates.typeSaas";
    case "ecommerce":
      return "templates.typeEcommerce";
    case "admin":
      return "templates.typeAdmin";
    case "auth":
      return "templates.typeAuth";
    case "docs":
      return "templates.typeDocs";
    case "social":
      return "templates.typeSocial";
    case "messaging":
      return "templates.typeMessaging";
    case "media":
      return "templates.typeMedia";
    case "lifestyle":
      return "templates.typeLifestyle";
    case "education":
      return "templates.typeEducation";
    default:
      return "templates.typeAll";
  }
}

export default function TemplatesPage() {
  const { locale, t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const templateCardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const queryParam = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const trimmedSearchQuery = searchQuery.trim();
  const activeType = (searchParams.get("type") as TemplateTypeFilter | null) || "all";
  const sortParam = searchParams.get("sort");
  const validSorts: TemplateSort[] = ["recommended", "name-asc", "name-desc"];
  const activeSort: TemplateSort = validSorts.includes(sortParam as TemplateSort)
    ? (sortParam as TemplateSort)
    : "recommended";
  const hasActiveControls =
    activeType !== "all" ||
    activeSort !== "recommended" ||
    queryParam.trim().length > 0;
  const activeFilterSummary = useMemo(() => {
    const parts: string[] = [];
    if (activeType !== "all") {
      parts.push(`${t("templates.type")}: ${t(templateTypeToTranslationKey(activeType))}`);
    }
    if (activeSort !== "recommended") {
      const sortLabel = activeSort === "name-asc"
        ? t("templates.sortNameAsc")
        : t("templates.sortNameDesc");
      parts.push(`${t("templates.sort")}: ${sortLabel}`);
    }
    if (queryParam.trim().length > 0) {
      parts.push(`${t("nav.search")}: ${queryParam}`);
    }
    return parts.join(" · ");
  }, [activeType, activeSort, queryParam, t]);

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  useEffect(() => {
    const handleGlobalSearchShortcut = (event: KeyboardEvent) => {
      if (event.key !== "/") return;

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      event.preventDefault();
      searchInputRef.current?.focus();
    };

    window.addEventListener("keydown", handleGlobalSearchShortcut);
    return () => window.removeEventListener("keydown", handleGlobalSearchShortcut);
  }, []);

  useEffect(() => {
    if (searchQuery === queryParam) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const normalizedQuery = trimmedSearchQuery;
      if (normalizedQuery) {
        params.set("q", normalizedQuery);
      } else {
        params.delete("q");
      }

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery, trimmedSearchQuery, queryParam, searchParams, router, pathname]);

  const handleSortChange = (sort: TemplateSort) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort === "recommended") {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("type");
    params.delete("sort");
    params.delete("q");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const filteredTemplates = useMemo(() => {
    const normalizedQuery = trimmedSearchQuery.toLowerCase();

    const matchedTemplates = templates
      .filter((template) => activeType === "all" || template.type === activeType)
      .filter((template) => {
        if (!normalizedQuery) return true;

        const style = styleMap.get(template.styleSlug);
        const searchableText = [
          template.id,
          template.href,
          template.name.zh,
          template.name.en,
          template.description.zh,
          template.description.en,
          style?.name,
          style?.nameEn,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      });

    if (activeSort === "recommended") return matchedTemplates;

    const sortedTemplates = [...matchedTemplates].sort((left, right) => {
      const leftName = pickLocale(locale, left.name).toLowerCase();
      const rightName = pickLocale(locale, right.name).toLowerCase();
      return leftName.localeCompare(rightName);
    });

    if (activeSort === "name-desc") {
      sortedTemplates.reverse();
    }

    return sortedTemplates;
  }, [activeType, trimmedSearchQuery, activeSort, locale]);

  useEffect(() => {
    templateCardRefs.current = templateCardRefs.current.slice(0, filteredTemplates.length);
  }, [filteredTemplates.length]);

  const handleTemplateCardKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
    index: number
  ) => {
    const total = filteredTemplates.length;
    if (total <= 1) return;

    const columns = getTemplateGridColumns();
    const maxIndex = total - 1;
    const column = index % columns;
    let nextIndex = index;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % total;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + total) % total;
        break;
      case "ArrowDown": {
        const downIndex = index + columns;
        nextIndex = downIndex <= maxIndex ? downIndex : Math.min(column, maxIndex);
        break;
      }
      case "ArrowUp": {
        if (index - columns >= 0) {
          nextIndex = index - columns;
        } else {
          nextIndex = maxIndex - ((maxIndex - column) % columns);
        }
        break;
      }
      case "PageDown": {
        const lastRowStart = maxIndex - (maxIndex % columns);
        const candidate = lastRowStart + column;
        nextIndex = candidate <= maxIndex ? candidate : maxIndex;
        break;
      }
      case "PageUp":
        nextIndex = Math.min(column, maxIndex);
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = maxIndex;
        break;
      default:
        return;
    }

    event.preventDefault();
    if (nextIndex !== index) {
      templateCardRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
            <p className="text-xs tracking-widest uppercase text-muted mb-3">
              {t("templates.subtitle")}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-3">
              {t("templates.title")}
            </h1>
            <p className="text-base md:text-lg text-muted max-w-3xl">
              {t("templates.description")}
            </p>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <TemplatesFilter />

            <div className="mb-5 md:mb-7 space-y-3">
              <label htmlFor="templates-search" className="sr-only">
                {t("nav.search")}
              </label>
              <input
                ref={searchInputRef}
                id="templates-search"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setSearchQuery("");
                  }
                }}
                aria-keyshortcuts="/"
                aria-describedby="templates-results-count"
                placeholder={t("templates.searchPlaceholder")}
                className="w-full md:max-w-md h-10 px-3 text-sm border border-border bg-background focus:outline-none focus:border-foreground transition-colors"
              />
              <p className="text-xs text-muted">
                {t("templates.searchHint")}
              </p>
              {trimmedSearchQuery.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label={t("templates.clearSearch")}
                  className="text-xs text-muted hover:text-foreground transition-colors"
                >
                  {t("templates.clearSearch")}
                </button>
              )}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p
                  id="templates-results-count"
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className="text-sm text-muted"
                >
                  {filteredTemplates.length} {t("templates.results")}
                </p>
                <div className="flex items-center gap-2">
                  <label htmlFor="templates-sort" className="text-sm text-muted">
                    {t("templates.sort")}:
                  </label>
                  <select
                    id="templates-sort"
                    value={activeSort}
                    onChange={(event) => handleSortChange(event.target.value as TemplateSort)}
                    aria-label={t("templates.sortAriaLabel")}
                    className="h-9 px-3 text-sm border border-border bg-background focus:outline-none focus:border-foreground transition-colors"
                  >
                    <option value="recommended">{t("templates.sortRecommended")}</option>
                    <option value="name-asc">{t("templates.sortNameAsc")}</option>
                    <option value="name-desc">{t("templates.sortNameDesc")}</option>
                  </select>
                  {hasActiveControls && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors"
                    >
                      {t("templates.resetFilters")}
                    </button>
                  )}
                </div>
              </div>
              {hasActiveControls && (
                <p className="text-xs text-muted" role="status" aria-live="polite">
                  {t("templates.activeFiltersLabel")}: {activeFilterSummary}
                </p>
              )}
              <p className="text-xs text-muted">
                {t("templates.keyboardHint")}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filteredTemplates.map((template, index) => {
                const style = styleMap.get(template.styleSlug);
                const templateName = pickLocale(locale, template.name);
                const templateDescription = pickLocale(locale, template.description);
                const styleLabel = locale === "zh"
                  ? style?.name || style?.nameEn || "风格"
                  : style?.nameEn || style?.name || "Style";

                return (
                  <Link
                    key={template.id}
                    href={template.href}
                    ref={(element) => {
                      templateCardRefs.current[index] = element;
                    }}
                    onKeyDown={(event) => handleTemplateCardKeyDown(event, index)}
                    aria-label={`${templateName} - ${t("templates.openTemplate")}`}
                    className="group block border border-border hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
                  >
                    <div className="aspect-[16/10] relative overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                      {style && (
                        <TemplateCoverPreview
                          templateId={template.id}
                          colors={{
                            primary: style.colors.primary,
                            secondary: style.colors.secondary,
                            accent: style.colors.accent,
                          }}
                        />
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                        <span className="text-white text-sm font-medium">{templateName}</span>
                      </div>
                    </div>

                    <div className="p-4 md:p-5">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-muted">
                          {t(templateTypeToTranslationKey(template.type))}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-muted">
                          {styleLabel}
                        </span>
                      </div>

                      <h3 className="text-lg mb-2 group-hover:text-accent transition-colors">
                        {templateName}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed line-clamp-2">
                        {templateDescription}
                      </p>

                      <p className="text-xs tracking-wide mt-4 group-hover:text-accent transition-colors">
                        {t("templates.openTemplate")} &rarr;
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="py-16">
                <div className="max-w-xl mx-auto border border-dashed border-border px-6 py-10 text-center space-y-4">
                  <p className="text-sm text-muted">
                    {trimmedSearchQuery.length > 0
                      ? t("templates.emptySearch")
                      : t("templates.empty")}
                  </p>
                  {hasActiveControls && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="px-4 py-2 text-xs border border-border hover:border-foreground transition-colors"
                    >
                      {t("templates.resetFilters")}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
