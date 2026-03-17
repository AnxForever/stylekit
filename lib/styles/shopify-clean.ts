import type { DesignStyle } from "./index";

export const shopifyClean: DesignStyle = {
  slug: "shopify-clean",
  name: "清爽电商",
  nameEn: "Shopify Clean",
  description:
    "面向独立电商站的干净现代风格，以产品为核心，清晰的价格层级和流畅的购物转化路径。",
  descriptionEn:
    "A clean, modern aesthetic built for independent storefronts. Product-first layouts with clear pricing hierarchy and smooth conversion paths.",
  cover: "/styles/shopify-clean.svg",
  styleType: "visual",
  tags: ["modern", "minimal"],
  category: "modern",
  colors: {
    primary: "#ffffff",
    secondary: "#f7f7f8",
    accent: ["#008060", "#1a1a1a", "#e3e3e3", "#ffd700"],
  },
  keywords: ["电商", "独立站", "产品展示", "购物车", "DTC", "Shopify", "modern", "contemporary", "sleek", "现代"],

  philosophy: `Shopify Clean 是一种以转化为导向的电商设计语言。

核心理念：
- 产品优先：所有设计决策围绕产品展示和购买转化
- 信任感建设：通过一致的间距、清晰的层级和专业排版建立可信度
- 摩擦最小化：按钮明确、流程简短、信息层次清晰
- 留白即呼吸：给产品图片足够空间，不拥挤不杂乱

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Shopify Clean is a conversion-oriented e-commerce design language.

Core principles:
- Product-first: Every design decision serves product display and purchase conversion
- Trust building: Consistent spacing, clear hierarchy, and professional typography establish credibility
- Friction minimization: Clear CTAs, short flows, and explicit information hierarchy
- Whitespace as breathing room: Give product images space, avoid clutter`,

  doList: [
    "使用纯白背景 bg-white 或极浅灰 bg-[#f7f7f8] 作为底色",
    "主按钮使用品牌绿 bg-[#008060] text-white rounded-lg",
    "产品卡片使用 border border-[#e3e3e3] hover:shadow-md 过渡",
    "价格使用 text-lg font-semibold text-[#1a1a1a] 加粗突出",
    "划线价使用 line-through text-muted text-sm",
    "图片容器统一 aspect-square 或 aspect-[3/4] 保持网格整齐",
    "信任标识（免运费、退换保障）使用小图标 + text-xs 组合",
    "CTA 按钮始终 full-width 在移动端",
  ],

  doListEn: [
    "Use pure white bg-white or light gray bg-[#f7f7f8] as base",
    "Primary button uses brand green bg-[#008060] text-white rounded-lg",
    "Product cards use border border-[#e3e3e3] hover:shadow-md transition",
    "Price uses text-lg font-semibold text-[#1a1a1a] for emphasis",
    "Strikethrough price uses line-through text-muted text-sm",
    "Image containers use aspect-square or aspect-[3/4] for grid consistency",
    "Trust badges use small icon + text-xs combos",
    "CTA buttons are always full-width on mobile",
  ],

  dontList: [
    "禁止使用深色背景作为主色调（影响产品图真实色彩还原）",
    "禁止产品卡片使用圆角超过 rounded-xl",
    "禁止在产品列表页使用大面积装饰性元素",
    "禁止价格信息使用低对比度颜色",
    "禁止 CTA 按钮使用低饱和度颜色",
    "禁止产品图片使用滤镜或色彩叠加",
  ],

  dontListEn: [
    "Never use dark backgrounds as primary (affects product color accuracy)",
    "Never exceed rounded-xl on product cards",
    "Never use large decorative elements on product listing pages",
    "Never use low-contrast colors for pricing",
    "Never use desaturated colors on CTA buttons",
    "Never apply filters or color overlays on product images",
  ],

  components: {
    button: {
      name: "购买按钮",
      description: "电商主操作按钮，突出品牌色与可点击性",
      code: `<button className="w-full px-6 py-3 bg-[#008060] text-white text-sm font-medium rounded-lg hover:bg-[#006e52] active:bg-[#005c45] transition-colors duration-200">Add to Cart</button>`,
    },
    card: {
      name: "产品卡片",
      description: "产品展示卡片，包含图片、标题、价格",
      code: `<div className="group border border-[#e3e3e3] rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow duration-200">
  <div className="aspect-square bg-[#f7f7f8] overflow-hidden">
    <div className="w-full h-full bg-gradient-to-br from-[#f0f0f0] to-[#e8e8e8] group-hover:scale-105 transition-transform duration-300" />
  </div>
  <div className="p-4">
    <p className="text-sm text-[#6b7280] mb-1">Brand Name</p>
    <h3 className="text-base font-medium text-[#1a1a1a] mb-2">Product Title</h3>
    <div className="flex items-baseline gap-2">
      <span className="text-lg font-semibold text-[#1a1a1a]">$49.00</span>
      <span className="text-sm text-[#9ca3af] line-through">$65.00</span>
    </div>
  </div>
</div>`,
    },
    input: {
      name: "搜索框",
      description: "产品搜索输入框",
      code: `<input type="text" placeholder="Search products..." className="w-full px-4 py-3 border border-[#e3e3e3] rounded-lg text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#008060]/20 focus:border-[#008060] transition-colors bg-white" />`,
    },
    nav: {
      name: "商店导航",
      description: "电商顶部导航栏",
      code: `<nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#e3e3e3]">
  <span className="text-lg font-semibold tracking-tight text-[#1a1a1a]">STORE</span>
  <div className="flex items-center gap-6 text-sm text-[#6b7280]">
    <span className="hover:text-[#1a1a1a] transition-colors cursor-pointer">Shop</span>
    <span className="hover:text-[#1a1a1a] transition-colors cursor-pointer">Collections</span>
    <span className="hover:text-[#1a1a1a] transition-colors cursor-pointer">About</span>
  </div>
</nav>`,
    },
    hero: {
      name: "促销横幅",
      description: "首页促销区域",
      code: `<section className="bg-[#f7f7f8] px-6 py-16 text-center">
  <p className="text-xs tracking-[0.2em] uppercase text-[#008060] mb-3">New Arrival</p>
  <h1 className="text-4xl font-semibold text-[#1a1a1a] mb-4">Spring Collection</h1>
  <p className="text-[#6b7280] mb-6 max-w-md mx-auto">Discover our latest curated pieces for the season.</p>
  <button className="px-8 py-3 bg-[#1a1a1a] text-white text-sm rounded-lg hover:bg-[#333] transition-colors">Shop Now</button>
</section>`,
    },
    footer: {
      name: "商店页脚",
      description: "电商页脚，包含链接和支付图标占位",
      code: `<footer className="bg-[#1a1a1a] text-white px-6 py-12">
  <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8 text-sm">
    <div>
      <p className="font-medium mb-3">Shop</p>
      <div className="space-y-2 text-[#9ca3af]">
        <p>All Products</p><p>New Arrivals</p><p>Sale</p>
      </div>
    </div>
    <div>
      <p className="font-medium mb-3">Support</p>
      <div className="space-y-2 text-[#9ca3af]">
        <p>Contact</p><p>Shipping</p><p>Returns</p>
      </div>
    </div>
    <div>
      <p className="font-medium mb-3">Company</p>
      <div className="space-y-2 text-[#9ca3af]">
        <p>About</p><p>Blog</p><p>Careers</p>
      </div>
    </div>
  </div>
</footer>`,
    },
  },

  globalCss: `.shopify-clean-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 9999px;
}
.shopify-clean-badge--sale {
  background: #fef3c7;
  color: #92400e;
}
.shopify-clean-badge--new {
  background: #d1fae5;
  color: #065f46;
}
@keyframes shopify-clean-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shopify-clean-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.shopify-clean-card {
  position: relative;
  overflow: hidden;
}

.shopify-clean-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent);
  pointer-events: none;
}

.shopify-clean-card:hover::before {
  opacity: 1;
}

.shopify-clean-gradient {
  background: linear-gradient(135deg, #ffffff, #008060);
}

.shopify-clean-gradient-text {
  background: linear-gradient(135deg, #ffffff, #008060);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.shopify-clean-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(255, 255, 255, 0.08);
}

.shopify-clean-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.shopify-clean-animate-in {
  animation: shopify-clean-fade-in 0.5s ease-out both;
}`,

  aiRules: `You are a Shopify Clean e-commerce design expert.

## Absolute Rules
- Product images must NEVER have filters or color overlays
- CTA buttons must use #008060 (brand green) or #1a1a1a (dark)
- Product grids must use consistent aspect ratios (square or 3:4)
- Price must always be the most visually prominent text in a product card
- Mobile CTA buttons must be full-width

## Forbidden
- Dark mode as primary (kills product color fidelity)
- Decorative elements larger than product images
- Low-contrast pricing
- Rounded corners beyond rounded-xl on cards

## Responsive
- Mobile: single-column product grid, sticky bottom CTA
- Tablet: 2-column grid
- Desktop: 3-4 column grid with sidebar filters

## Layout & Spacing
- Section padding: py-16 md:py-24
- Card padding: p-6 md:p-8
- Gap between cards: gap-6 md:gap-8
- Max content width: max-w-6xl mx-auto

## Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Stack elements vertically on mobile (flex-col), row on desktop (md:flex-row)
- Reduce font sizes on mobile: text-3xl md:text-5xl for headings
- Touch-friendly targets: min 44px for interactive elements

## Self-Check Verification
After generating code, verify:
1. All interactive elements have hover/focus/active states
2. Color contrast meets WCAG 2.1 AA (4.5:1 for text)
3. Layout is responsive across breakpoints
4. Typography hierarchy is clear (h1 > h2 > h3 > body)
5. Spacing is consistent using the defined scale
6. All animations respect prefers-reduced-motion`,

  aiRulesEn: `You are a Shopify Clean e-commerce design expert.

## Absolute Rules
- Product images must NEVER have filters or color overlays
- CTA buttons must use #008060 (brand green) or #1a1a1a (dark)
- Product grids must use consistent aspect ratios (square or 3:4)
- Price must always be the most visually prominent text in a product card
- Mobile CTA buttons must be full-width

## Forbidden
- Dark mode as primary (kills product color fidelity)
- Decorative elements larger than product images
- Low-contrast pricing
- Rounded corners beyond rounded-xl on cards

## Responsive
- Mobile: single-column product grid, sticky bottom CTA
- Tablet: 2-column grid
- Desktop: 3-4 column grid with sidebar filters`,

  examplePrompts: [
    {
      title: "独立电商首页",
      titleEn: "DTC Store Homepage",
      description: "包含促销横幅、产品网格、信任标识的电商首页",
      descriptionEn: "Store homepage with hero banner, product grid, and trust badges",
      prompt: "Build a Shopify-style e-commerce homepage with hero banner promoting a new collection, 8-product grid with hover effects, trust badges (free shipping, 30-day returns), and newsletter signup.",
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 清爽电商风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Shopify Clean style",
      prompt: `Create a SaaS landing page using Shopify Clean style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 清爽电商风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Shopify Clean style",
      prompt: `Create a portfolio showcase page using Shopify Clean style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "shopify-clean-warm",
      name: "清爽电商暖色版",
      nameEn: "Shopify Clean Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#ffffff",
        secondary: "#f8f8f9",
        accent: ["#0c7792", "#1a1a1a", "#e3e3e3", "#91f704"],
      },
    },
    {
      id: "shopify-clean-cool",
      name: "清爽电商冷色版",
      nameEn: "Shopify Clean Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#ffffff",
        secondary: "#dededf",
        accent: ["#0e812f", "#1a1a1a", "#e3e3e3", "#ffb533"],
      },
    },
  ],
};
