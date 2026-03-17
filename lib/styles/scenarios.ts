import type { Locale } from "@/lib/i18n/translations";
import type { StyleMeta } from "./meta";

export type StyleScenario =
  | "saas"
  | "dashboard"
  | "admin"
  | "portfolio"
  | "blog"
  | "editorial"
  | "docs"
  | "ecommerce"
  | "marketing"
  | "creative";

export const STYLE_SCENARIOS: StyleScenario[] = [
  "saas",
  "dashboard",
  "admin",
  "portfolio",
  "blog",
  "editorial",
  "docs",
  "ecommerce",
  "marketing",
  "creative",
];

const SCENARIO_LABELS: Record<StyleScenario, { zh: string; en: string }> = {
  saas: { zh: "SaaS / B2B", en: "SaaS / B2B" },
  dashboard: { zh: "Dashboard", en: "Dashboard" },
  admin: { zh: "后台管理", en: "Admin" },
  portfolio: { zh: "作品集", en: "Portfolio" },
  blog: { zh: "博客内容", en: "Blog" },
  editorial: { zh: "编辑杂志", en: "Editorial" },
  docs: { zh: "文档知识库", en: "Docs" },
  ecommerce: { zh: "电商零售", en: "E-Commerce" },
  marketing: { zh: "品牌营销", en: "Marketing" },
  creative: { zh: "创意表达", en: "Creative" },
};

const SCENARIO_OVERRIDES: Partial<Record<string, StyleScenario[]>> = {
  // --- Creative / Marketing ---
  "neo-brutalist": ["marketing", "creative", "portfolio"],
  "neo-brutalist-soft": ["marketing", "creative", "saas"],
  "neo-brutalist-playful": ["creative", "marketing", "portfolio"],
  "retro-vintage": ["creative", "marketing", "editorial"],
  "modern-gradient": ["marketing", "ecommerce", "saas"],
  "full-page-scroll": ["marketing", "portfolio", "creative"],
  "split-screen": ["marketing", "portfolio", "creative"],
  "hero-fullscreen": ["marketing", "portfolio", "creative"],

  // --- Editorial / Blog ---
  editorial: ["editorial", "blog", "creative"],
  "magazine-grid": ["editorial", "blog", "marketing"],
  "f-pattern-layout": ["blog", "editorial", "marketing"],
  "swiss-style": ["editorial", "blog", "docs"],
  "dark-academia": ["blog", "editorial", "creative"],
  "linear-style": ["saas", "blog", "docs"],
  "scandinavian": ["portfolio", "blog", "docs"],
  "wabi-sabi": ["blog", "portfolio", "creative"],

  // --- SaaS / B2B ---
  glassmorphism: ["saas", "marketing", "ecommerce"],
  neumorphism: ["saas", "marketing", "ecommerce"],
  "z-pattern-layout": ["marketing", "portfolio", "saas"],
  "bento-grid": ["portfolio", "marketing", "dashboard"],

  // --- E-Commerce ---
  "apple-style": ["ecommerce", "saas", "marketing"],
  "natural-organic": ["ecommerce", "marketing", "creative"],
  "stripe-style": ["saas", "ecommerce", "docs"],
  "minimalist-flat": ["ecommerce", "portfolio", "blog"],
  "marble-luxury": ["ecommerce", "marketing", "portfolio"],
  "tropical-paradise": ["ecommerce", "marketing", "creative"],

  // --- Dashboard / Admin ---
  "corporate-clean": ["saas", "admin", "dashboard"],
  "dashboard-layout": ["dashboard", "admin", "saas"],
  "warm-dashboard": ["dashboard", "admin", "saas"],
  "fluent-design": ["dashboard", "admin", "saas"],
  "material-design": ["dashboard", "admin", "saas"],
  "sidebar-fixed": ["admin", "docs", "dashboard"],
  "github-style": ["admin", "saas", "docs"],
  "notion-style": ["docs", "admin", "blog"],

  // --- Docs ---
  "holy-grail-layout": ["docs", "blog", "admin"],

  // --- New styles (Batch 15) ---
  "shopify-clean": ["ecommerce", "marketing", "saas"],
  "luxury-retail": ["ecommerce", "marketing", "portfolio"],
  "fresh-market": ["ecommerce", "marketing", "creative"],
  "data-dense": ["admin", "dashboard", "saas"],
};

const SCENARIO_MATCHERS: Record<StyleScenario, RegExp[]> = {
  saas: [
    /saas|b2b|developer|enterprise|workspace|productivity|开发者|企业|专业|协作/i,
  ],
  dashboard: [
    /dashboard|analytics|data table|report|control center|仪表盘|数据面板|分析|报表/i,
  ],
  admin: [
    /admin|backoffice|control panel|management|后台|管理系统|管理面板|侧栏导航/i,
  ],
  portfolio: [
    /portfolio|gallery|showcase|case study|作品集|画廊|案例|项目展示/i,
  ],
  blog: [
    /blog|article|newsletter|阅读|博客|文章|内容/i,
  ],
  editorial: [
    /editorial|magazine|newspaper|杂志|编辑|报纸|排版/i,
  ],
  docs: [
    /docs|documentation|knowledge|manual|notion|文档|知识库|手册|指南/i,
  ],
  ecommerce: [
    /e-?commerce|shop|store|retail|product page|checkout|电商|零售|商品|商店/i,
  ],
  marketing: [
    /landing|launch|campaign|brand|branding|startup|hero|官网|品牌|活动|营销|着陆页|发布|宣传/i,
  ],
  creative: [
    /creative|art|artist|fashion|studio|experimental|艺术|创意|实验|时尚|展览|机构/i,
  ],
};

function buildSearchText(style: StyleMeta): string {
  return [
    style.slug,
    style.name,
    style.nameEn,
    style.description,
    style.category,
    style.styleType,
    ...style.tags,
    ...style.keywords,
  ]
    .join(" ")
    .toLowerCase();
}

function scoreStyleScenarios(style: StyleMeta): Map<StyleScenario, number> {
  const scores = new Map<StyleScenario, number>();
  const searchText = buildSearchText(style);
  const overrides = SCENARIO_OVERRIDES[style.slug] ?? [];

  overrides.forEach((scenario, index) => {
    scores.set(scenario, 100 - index * 5);
  });

  for (const scenario of STYLE_SCENARIOS) {
    const matched = SCENARIO_MATCHERS[scenario].some((matcher) =>
      matcher.test(searchText)
    );
    if (matched) {
      scores.set(scenario, (scores.get(scenario) ?? 0) + 10);
    }
  }

  if (style.styleType === "layout") {
    scores.set("dashboard", (scores.get("dashboard") ?? 0) + 2);
    scores.set("docs", (scores.get("docs") ?? 0) + 2);
    scores.set("admin", (scores.get("admin") ?? 0) + 1);
  }

  if (scores.size === 0) {
    if (style.category === "minimal") {
      scores.set("portfolio", 3);
      scores.set("docs", 2);
    } else if (style.category === "modern") {
      scores.set("saas", 3);
      scores.set("marketing", 2);
    } else if (style.category === "retro") {
      scores.set("creative", 3);
      scores.set("editorial", 2);
    } else {
      scores.set("creative", 3);
      scores.set("marketing", 2);
    }
  }

  return scores;
}

export function getStyleScenarios(style: StyleMeta, limit = 3): StyleScenario[] {
  return [...scoreStyleScenarios(style).entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, limit)
    .map(([scenario]) => scenario);
}

export function getScenarioLabel(
  scenario: StyleScenario,
  locale: Locale
): string {
  return SCENARIO_LABELS[scenario][locale];
}
