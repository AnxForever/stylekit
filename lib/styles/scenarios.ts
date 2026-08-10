import type { Locale } from "@/lib/i18n/translations";
import type { StyleMeta } from "./meta-types";

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

// Scenario membership is fully curated: every registered style has an explicit
// entry (1-3 scenarios, ordered by fit). Keyword-regex auto-classification was
// retired after it repeatedly produced vocabulary matches instead of design
// suitability (e.g. steampunk landed in "dashboard" because its description
// mentions brass instrument gauges — 精密仪表盘).
//
// Curation rubric per scenario:
// - saas/dashboard/admin: product chrome the style could realistically ship in
// - portfolio: per 2024-2026 portfolio trend research (docs/PORTFOLIO_STYLE_RESEARCH.md)
// - blog/editorial/docs: long-form reading / publication / knowledge-base typography
// - ecommerce: product display and retail branding
// - marketing: strong fit for real landing / brand / campaign pages, not merely
//   "could theme a poster"
// - creative: artistic and experimental expression (the library's largest bucket
//   by nature — it holds the art-movement and pop-culture styles)
//
// A unit test (tests/unit/lib/scenarios.test.ts) fails the build if a
// registered style is missing here, so new styles must be classified on entry.
const SCENARIO_ASSIGNMENTS: Record<string, StyleScenario[]> = {
  // --- Core visual systems ---
  "neo-brutalist": ["marketing", "creative", "portfolio"],
  editorial: ["editorial", "portfolio", "blog"],
  neumorphism: ["saas", "marketing", "ecommerce"],
  glassmorphism: ["saas", "marketing", "ecommerce"],
  "bento-grid": ["portfolio", "marketing", "dashboard"],
  "corporate-clean": ["saas", "admin", "dashboard"],
  "minimalist-flat": ["portfolio", "ecommerce", "blog"],
  "soft-ui": ["saas", "marketing", "ecommerce"],
  "natural-organic": ["ecommerce", "marketing", "creative"],
  "modern-gradient": ["marketing", "ecommerce", "saas"],
  "retro-vintage": ["creative", "marketing", "editorial"],
  "dark-mode": ["portfolio", "saas", "blog"],
  "macos-vibrancy": ["saas", "dashboard", "marketing"],
  "geometric-bold": ["creative", "marketing", "editorial"],
  claymorphism: ["marketing", "saas", "creative"],
  "notion-style": ["docs", "admin", "blog"],
  "stripe-style": ["saas", "ecommerce", "docs"],
  "apple-style": ["ecommerce", "saas", "marketing"],
  bauhaus: ["creative", "editorial", "marketing"],
  skeuomorphism: ["creative", "saas"],
  "swiss-style": ["portfolio", "editorial", "docs"],
  "material-design": ["dashboard", "admin", "saas"],
  "fluent-design": ["dashboard", "admin", "saas"],
  "liquid-glass": ["marketing", "saas", "ecommerce"],
  "linear-style": ["saas", "blog", "docs"],
  "github-style": ["saas", "portfolio", "docs"],
  "sci-fi-hud": ["dashboard", "creative", "marketing"],
  "scrollytelling": ["editorial", "marketing", "creative"],
  particle: ["creative", "marketing", "saas"],
  "parallax-editorial": ["editorial", "portfolio", "marketing"],
  "neon-gradient": ["marketing", "saas", "creative"],
  solarpunk: ["marketing", "creative", "saas"],
  "neon-tokyo": ["creative", "marketing"],
  "dopamine-design": ["marketing", "creative"],

  // --- Layouts ---
  "masonry-flow": ["portfolio", "creative", "ecommerce"],
  "split-screen": ["marketing", "portfolio", "creative"],
  "full-page-scroll": ["marketing", "portfolio", "creative"],
  "timeline-vertical": ["portfolio", "docs", "dashboard"],
  "card-stack": ["marketing", "saas", "docs"],
  "sidebar-fixed": ["admin", "docs", "dashboard"],
  "magazine-grid": ["editorial", "portfolio", "blog"],
  "hero-fullscreen": ["marketing", "portfolio", "creative"],
  "f-pattern-layout": ["blog", "editorial", "marketing"],
  "z-pattern-layout": ["marketing", "saas"],
  "holy-grail-layout": ["docs", "blog", "admin"],
  "dashboard-layout": ["dashboard", "admin", "saas"],
  "asymmetric-grid": ["portfolio", "creative", "editorial"],
  "parallax-sections": ["marketing", "portfolio", "creative"],
  "horizontal-gallery": ["portfolio", "creative", "marketing"],

  // --- Portfolio-first (per portfolio trend research) ---
  monochrome: ["portfolio", "editorial", "marketing"],
  "brutalist-web": ["portfolio", "creative", "blog"],
  scandinavian: ["portfolio", "blog", "docs"],
  "korean-minimal": ["portfolio", "blog", "docs"],
  "wabi-sabi": ["blog", "portfolio", "creative"],
  "oversized-typography": ["portfolio", "marketing", "creative"],
  "developer-terminal": ["portfolio", "blog", "docs"],
  "latex-paper": ["portfolio", "docs", "blog"],
  "distill-style": ["portfolio", "blog", "docs"],
  "generative-art": ["creative", "portfolio"],
  "glitch-art": ["creative", "portfolio"],
  "neo-brutalist-playful": ["creative", "marketing", "portfolio"],

  // --- Dashboards / admin ---
  "warm-dashboard": ["dashboard", "admin", "saas"],
  "data-dense": ["admin", "dashboard", "saas"],

  // --- E-commerce / retail ---
  "marble-luxury": ["ecommerce", "marketing"],
  "tropical-paradise": ["ecommerce", "marketing", "creative"],
  "shopify-clean": ["ecommerce", "marketing", "saas"],
  "luxury-retail": ["ecommerce", "marketing"],
  "fresh-market": ["ecommerce", "marketing", "creative"],
  terracotta: ["marketing", "ecommerce", "creative"],

  // --- Reading / publication ---
  "dark-academia": ["blog", "editorial", "creative"],
  "japanese-fresh": ["blog", "creative", "ecommerce"],
  blueprint: ["docs", "saas"],
  "swiss-poster": ["editorial", "creative", "marketing"],
  constructivism: ["editorial", "creative", "marketing"],
  "collage-art": ["editorial", "creative"],
  "anti-design": ["creative", "editorial"],

  // --- Art movements & illustration (creative/editorial, not marketing) ---
  "art-deco": ["creative", "marketing", "ecommerce"],
  "art-nouveau": ["creative", "editorial"],
  surrealism: ["creative", "editorial"],
  "ukiyo-e-digital": ["creative", "editorial"],
  gothic: ["creative", "editorial"],
  "watercolor-art": ["creative", "editorial"],
  "impressionist-oil": ["creative", "editorial"],
  "immersive-photo": ["creative", "marketing", "portfolio"],
  "mid-century-modern": ["creative", "editorial"],
  "op-art": ["creative", "editorial"],
  "islamic-geometric": ["creative", "editorial"],
  "medieval-manuscript": ["creative", "editorial"],
  "victorian-botanical": ["creative", "editorial"],
  cubism: ["creative", "editorial"],
  "vhs-aesthetic": ["creative", "editorial"],
  "frutiger-aero": ["creative", "editorial"],
  steampunk: ["creative", "editorial"],
  "pop-art": ["creative", "marketing"],

  // --- Pop-culture & aesthetic subcultures ---
  vaporwave: ["creative", "marketing"],
  y2k: ["creative", "marketing", "editorial"],
  memphis: ["creative", "marketing", "editorial"],
  synthwave: ["creative", "marketing"],
  outrun: ["creative", "marketing"],
  "cyberpunk-neon": ["creative", "marketing"],
  "acid-graphics": ["creative", "marketing"],
  holographic: ["creative", "marketing"],
  "arcade-crt": ["creative"],
  "pixel-art": ["creative"],
  "pastel-goth": ["creative"],
  maximalism: ["creative", "marketing", "editorial"],
  "graffiti-street": ["creative", "marketing"],
  witchcore: ["creative", "ecommerce"],
  cottagecore: ["creative", "ecommerce", "blog"],
  "gothic-lolita": ["creative", "ecommerce", "marketing"],
  risograph: ["creative", "editorial", "marketing"],
  "film-noir": ["creative", "marketing", "editorial"],
  "neo-brutalist-soft": ["marketing", "creative", "saas"],

  // --- Anime / game aesthetics ---
  mecha: ["creative"],
  "cyber-chinese": ["creative"],
  "visual-novel": ["creative"],
  "shoujo-manga": ["creative"],
  "cyber-anime": ["creative"],
  "pixel-anime": ["creative"],
  "neon-samurai": ["creative"],
  "magic-circle": ["creative"],
  "cyber-wafuu": ["creative"],
  jrpg: ["creative"],
  "cel-shading": ["creative"],
  "cinematic-video-hero": ["marketing", "creative", "portfolio"],
  "comic-style": ["creative", "marketing", "editorial"],

  // --- Hand-made & organic warmth ---
  "ghibli-style": ["creative", "marketing"],
  "sketch-style": ["creative", "marketing", "blog"],
  "watercolor-style": ["creative", "marketing"],
  "hand-drawn-doodle": ["creative", "marketing", "blog"],
  "kawaii-minimal": ["creative", "saas", "ecommerce"],
  "kinetic-typography": ["creative", "marketing", "portfolio"],
  "paper-craft": ["creative", "marketing"],
  "zen-garden": ["creative", "marketing"],
  "ink-wash": ["creative", "marketing", "blog"],

  // --- Cultural pattern systems ---
  "indian-festive": ["marketing", "creative", "ecommerce"],
  "african-textile": ["creative", "marketing", "ecommerce"],

  // --- Portfolio Batch 2 (2026-07-07) ---
  "gallery-dark": ["portfolio", "blog", "creative"],
  "studio-bold": ["portfolio", "marketing", "creative"],
  "warm-organic": ["portfolio", "creative", "ecommerce"],
  "launch-keynote": ["marketing", "saas", "creative"],
  "luxe-lookbook": ["ecommerce", "marketing", "portfolio"],
  "shader-gradient": ["saas", "marketing", "creative"],
  "pastel-ui": ["ecommerce", "saas", "creative"],
  "mobile-editorial": ["editorial", "blog", "creative"],
  "soft-utility": ["admin", "dashboard", "saas"],
};

// Safety net for styles created outside the registry (e.g. runtime-generated
// previews). Registered styles never reach this — the unit test guarantees it.
const FALLBACK_SCENARIOS: StyleScenario[] = ["creative", "marketing"];

export function getScenarioAssignments(): Readonly<
  Record<string, StyleScenario[]>
> {
  return SCENARIO_ASSIGNMENTS;
}

export function getStyleScenarios(style: StyleMeta, limit = 3): StyleScenario[] {
  const assigned = SCENARIO_ASSIGNMENTS[style.slug] ?? FALLBACK_SCENARIOS;
  return assigned.slice(0, limit);
}

export function getScenarioLabel(
  scenario: StyleScenario,
  locale: Locale
): string {
  return SCENARIO_LABELS[scenario][locale];
}
