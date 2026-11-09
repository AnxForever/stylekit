export interface OpenSourceDesignSite {
  slug: string;
  name: string;
  type: { zh: string; en: string };
  description: { zh: string; en: string };
  bestFor: { zh: string; en: string };
  reuseBoundary: { zh: string; en: string };
  stack: readonly string[];
  license: string;
  demoUrl: string;
  demoLabel: { zh: string; en: string };
  repositoryUrl: string;
  licenseUrl: string;
  checkedAt: string;
  /** Populate only with a screenshot captured from and reviewed against the linked demo. */
  previewImage?: string;
}

/**
 * Full public sites and design systems chosen for visual inspection and reuse.
 * These records link to upstream projects; they do not mirror upstream assets.
 */
export const openSourceDesignSites = [
  {
    slug: "trmnl-framework",
    name: "TRMNL Framework",
    type: {
      zh: "电子纸界面框架",
      en: "E-paper device interface",
    },
    description: {
      zh: "为 TRMNL 电子墨水设备设计的完整界面框架，可参考它在受限屏幕上的信息排版、字体层级与低刷新率视觉语言。",
      en: "A complete interface framework for TRMNL e-paper devices, useful for studying compact-screen information hierarchy, type and low-refresh-rate visuals.",
    },
    bestFor: {
      zh: "设备仪表盘、状态面板、低干扰的信息展示。",
      en: "Device dashboards, status panels and calm information displays.",
    },
    reuseBoundary: {
      zh: "框架 CSS/JS 可单独集成，文档站使用 Rails；设备渲染需要按目标屏幕验证。核心代码为 MIT，字体与图标各自遵循对应许可。",
      en: "The CSS/JS framework can be integrated separately; its documentation site uses Rails. Validate rendering on the target display. Core code is MIT, while fonts and icons have separate licenses.",
    },
    stack: ["HTML/CSS", "JavaScript", "Sass", "Rails docs"],
    license: "MIT core",
    demoUrl: "https://trmnl.com/framework/examples/github_commit_graph",
    demoLabel: { zh: "查看官方界面示例", en: "View official layout example" },
    repositoryUrl: "https://github.com/usetrmnl/trmnl-framework",
    licenseUrl: "https://trmnl.com/framework/docs/3.4/open_source",
    checkedAt: "2026-11-09",
    previewImage: "/open-source/trmnl.png",
  },
  {
    slug: "your-next-store",
    name: "Your Next Store",
    type: {
      zh: "电商店铺前台",
      en: "E-commerce storefront",
    },
    description: {
      zh: "覆盖商品列表、分类与购物车等页面的 Next.js 店铺前台，可作为电商视觉与页面组织的参考。",
      en: "A Next.js storefront with product, category and cart surfaces, useful for visual and page-structure references.",
    },
    bestFor: {
      zh: "商品目录、商品页、电商首页与购物流程参考。",
      en: "Catalogs, product pages, storefronts and commerce flows.",
    },
    reuseBoundary: {
      zh: "公开演示可直接浏览。真实商品数据、自建商店与交易需要 Commerce Kit 的 YNS API Key 和相应后端服务。",
      en: "The public storefront is browsable. Live catalog data, a self-hosted shop and transactions require a Commerce Kit YNS API key and the corresponding backend.",
    },
    stack: ["Next.js 16", "React", "Tailwind CSS 4", "TypeScript"],
    license: "MIT",
    demoUrl: "https://demo.yournextstore.com",
    demoLabel: { zh: "浏览在线店铺", en: "Browse the live storefront" },
    repositoryUrl: "https://github.com/yournextstore/yournextstore",
    licenseUrl: "https://github.com/yournextstore/yournextstore/blob/main/LICENSE.md",
    checkedAt: "2026-11-09",
    previewImage: "/open-source/yournextstore.png",
  },
  {
    slug: "twilight",
    name: "Twilight",
    type: {
      zh: "多语言博客与个人主页",
      en: "Multilingual blog and personal site",
    },
    description: {
      zh: "Astro 静态博客模板，演示文章、目录、项目与个人时间线如何构成完整的内容型网站。",
      en: "A complete Astro blog template showing how articles, tables of contents, projects and a personal timeline fit together.",
    },
    bestFor: {
      zh: "博客、作品集、个人主页和内容归档。",
      en: "Blogs, portfolios, personal sites and content archives.",
    },
    reuseBoundary: {
      zh: "可使用 Markdown 维护静态内容；只有启用在线 CMS 编辑时才需配置相应的 CMS/OAuth。复用演示插图和文章前，应另行核对它们的授权。",
      en: "Static content can be maintained as Markdown. CMS/OAuth setup is needed only for the optional online editing workflow. Check demo illustrations and articles separately before reusing them.",
    },
    stack: ["Astro", "TypeScript", "Markdown", "CMS integration"],
    license: "MIT",
    demoUrl: "https://twilight.spr-aachen.com",
    demoLabel: { zh: "浏览博客演示", en: "Browse the live blog" },
    repositoryUrl: "https://github.com/Spr-Aachen/Twilight",
    licenseUrl: "https://github.com/Spr-Aachen/Twilight/blob/main/LICENSE",
    checkedAt: "2026-11-09",
    previewImage: "/open-source/twilight.png",
  },
  {
    slug: "morethan-log",
    name: "morethan-log",
    type: {
      zh: "Notion 驱动的博客与简历",
      en: "Notion-backed blog and resume",
    },
    description: {
      zh: "一套 Next.js 博客和简历网站，将文章与个人页面连接到 Notion 内容库。",
      en: "A complete Next.js blog and resume site that connects articles and personal pages to a Notion workspace.",
    },
    bestFor: {
      zh: "个人博客、简历和通过 Notion 维护的页面。",
      en: "Personal blogs, resumes and pages maintained through Notion.",
    },
    reuseBoundary: {
      zh: "公开演示可浏览。本地运行或发布自己的内容需准备 Notion 页面 ID，并按 README 配置环境变量。",
      en: "The public demo can be browsed. Running your own content requires a Notion page ID and the environment settings described in the README.",
    },
    stack: ["Next.js", "React", "Notion API", "Vercel"],
    license: "MIT",
    demoUrl: "https://morethan-log.vercel.app",
    demoLabel: { zh: "浏览博客与简历", en: "Browse the blog and resume" },
    repositoryUrl: "https://github.com/morethanmin/morethan-log",
    licenseUrl: "https://github.com/morethanmin/morethan-log/blob/main/LICENSE",
    checkedAt: "2026-11-09",
    previewImage: "/open-source/morethan-log.png",
  },
] as const satisfies readonly OpenSourceDesignSite[];
