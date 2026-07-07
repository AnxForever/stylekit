import type { DesignStyle } from "./types";

export const freshMarket: DesignStyle = {
  slug: "fresh-market",
  name: "鲜活市集",
  nameEn: "Fresh Market",
  description:
    "面向食品生鲜与有机品牌的电商风格，暖色调圆润卡片搭配自然纹理，传递新鲜与信任。",
  descriptionEn:
    "E-commerce style for food, grocery, and organic brands. Warm tones with rounded cards and natural textures convey freshness and trust.",
  cover: "/styles/fresh-market.svg",
  styleType: "visual",
  tags: [],
  category: "modern",
  colors: {
    primary: "#fef9f0",
    secondary: "#2d5016",
    accent: ["#e8722a", "#f5c542", "#8b4513", "#d4e4bc"],
  },
  keywords: ["生鲜", "食品", "有机", "电商", "暖色", "自然", "modern", "contemporary", "sleek", "现代"],

  philosophy: `Fresh Market 的灵感来源于农贸集市和有机食品店。

核心理念：
- 自然温暖：暖色调底色让人联想到阳光和丰收
- 圆润友好：大圆角和柔和阴影传递亲和力
- 新鲜感知：绿色代表新鲜，橙色代表活力，棕色代表大地
- 手工质感：微妙的纹理暗示天然与手工制作的品质

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Fresh Market draws inspiration from farmers' markets and organic food stores.

Core principles:
- Natural warmth: Warm base tones evoke sunshine and harvest
- Rounded friendliness: Large border-radius and soft shadows convey approachability
- Freshness perception: Green means fresh, orange means vibrant, brown means earthy
- Artisan texture: Subtle textures suggest natural, handmade quality`,

  doList: [
    "使用暖奶油底色 bg-[#fef9f0]",
    "主按钮使用南瓜橙 bg-[#e8722a] text-white rounded-full",
    "产品卡片使用大圆角 rounded-2xl shadow-sm",
    "类目标签使用圆药丸形 rounded-full bg-[#d4e4bc] text-[#2d5016]",
    "标题适度圆润：font-bold text-[#2d5016]",
    "使用绿色 text-[#2d5016] 传达新鲜和有机",
    "价格标签使用背景色块 bg-[#f5c542] text-[#8b4513] rounded-lg px-2",
    "图片使用 rounded-xl overflow-hidden 柔化边缘",
  ],

  doListEn: [
    "Use warm cream base bg-[#fef9f0]",
    "Primary button uses pumpkin orange bg-[#e8722a] text-white rounded-full",
    "Product cards use large rounded-2xl shadow-sm",
    "Category tags use pill shape rounded-full bg-[#d4e4bc] text-[#2d5016]",
    "Headings use font-bold text-[#2d5016]",
    "Use green text-[#2d5016] to convey freshness and organic",
    "Price tags use color block bg-[#f5c542] text-[#8b4513] rounded-lg px-2",
    "Images use rounded-xl overflow-hidden to soften edges",
  ],

  dontList: [
    "禁止使用冷色调背景（蓝灰等破坏暖色基调）",
    "禁止使用直角 rounded-none（与友好感冲突）",
    "禁止使用纯黑文字（用深棕 #8b4513 或深绿 #2d5016 替代）",
    "禁止使用工业感字体（无衬线几何体等）",
    "禁止使用霓虹色或荧光色",
  ],

  dontListEn: [
    "Never use cool-tone backgrounds (blue-gray breaks warm base)",
    "Never use sharp corners rounded-none (conflicts with friendly feel)",
    "Never use pure black text (use deep brown #8b4513 or deep green #2d5016)",
    "Never use industrial fonts (geometric sans, etc.)",
    "Never use neon or fluorescent colors",
  ],

  components: {
    button: {
      name: "购买按钮",
      description: "圆润活力按钮",
      code: `<button className="px-8 py-3 bg-[#e8722a] text-white font-medium rounded-full hover:bg-[#d4641f] active:scale-95 transition-all duration-200 shadow-sm">Add to Basket</button>`,
    },
    card: {
      name: "产品卡片",
      description: "圆润暖色产品卡",
      code: `<div className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
  <div className="aspect-square bg-[#f5f0e8] overflow-hidden">
    <div className="w-full h-full bg-gradient-to-br from-[#d4e4bc] to-[#c5d4a8] group-hover:scale-105 transition-transform duration-300" />
  </div>
  <div className="p-4">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d4e4bc] text-[#2d5016] uppercase tracking-wide">Organic</span>
    </div>
    <h3 className="font-bold text-[#2d5016] mb-1">Farm Fresh Avocados</h3>
    <p className="text-xs text-[#8b7355] mb-2">500g, locally sourced</p>
    <div className="flex items-center justify-between">
      <span className="text-lg font-bold text-[#e8722a]">$4.99</span>
      <button className="w-8 h-8 rounded-full bg-[#2d5016] text-white text-lg flex items-center justify-center hover:bg-[#1e3a0e] transition-colors">+</button>
    </div>
  </div>
</div>`,
    },
    input: {
      name: "搜索框",
      description: "圆润搜索输入",
      code: `<input type="text" placeholder="Search for fresh produce..." className="w-full px-5 py-3 rounded-full border border-[#d4e4bc] bg-white text-sm text-[#2d5016] placeholder:text-[#8b7355] focus:outline-none focus:ring-2 focus:ring-[#2d5016]/20 focus:border-[#2d5016] transition-colors" />`,
    },
    nav: {
      name: "市集导航",
      description: "暖色顶部导航",
      code: `<nav className="flex items-center justify-between px-6 py-4 bg-[#fef9f0]">
  <span className="text-xl font-bold text-[#2d5016]">FreshMarket</span>
  <div className="flex items-center gap-5 text-sm text-[#8b4513]">
    <span className="hover:text-[#2d5016] transition-colors cursor-pointer">Produce</span>
    <span className="hover:text-[#2d5016] transition-colors cursor-pointer">Dairy</span>
    <span className="hover:text-[#2d5016] transition-colors cursor-pointer">Bakery</span>
    <span className="hover:text-[#2d5016] transition-colors cursor-pointer">Recipes</span>
  </div>
</nav>`,
    },
    hero: {
      name: "季节横幅",
      description: "当季推荐展示",
      code: `<section className="bg-[#2d5016] text-white px-6 py-16 rounded-3xl mx-4 my-4">
  <div className="max-w-2xl mx-auto text-center">
    <p className="text-[#d4e4bc] text-xs tracking-[0.2em] uppercase mb-3">This Week</p>
    <h1 className="text-4xl font-bold mb-4">Farm-Fresh Picks</h1>
    <p className="text-[#d4e4bc] mb-6">Hand-selected seasonal produce, delivered to your door.</p>
    <button className="px-8 py-3 bg-[#e8722a] text-white rounded-full font-medium hover:bg-[#d4641f] transition-colors">Shop This Week</button>
  </div>
</section>`,
    },
    footer: {
      name: "市集页脚",
      description: "暖色页脚",
      code: `<footer className="bg-[#2d5016] text-[#d4e4bc] px-6 py-10 rounded-t-3xl">
  <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8 text-sm">
    <div>
      <p className="font-bold text-white mb-3">Fresh</p>
      <div className="space-y-2"><p>Produce</p><p>Dairy</p><p>Bakery</p></div>
    </div>
    <div>
      <p className="font-bold text-white mb-3">Help</p>
      <div className="space-y-2"><p>Delivery</p><p>Returns</p><p>FAQ</p></div>
    </div>
    <div>
      <p className="font-bold text-white mb-3">About</p>
      <div className="space-y-2"><p>Our Farm</p><p>Sustainability</p><p>Blog</p></div>
    </div>
  </div>
</footer>`,
    },
  },

  globalCss: `.fresh-market-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
/* Fresh Market Design Tokens */
:root {
  --fresh-market-primary: #fef9f0;
  --fresh-market-secondary: #2d5016;
  --fresh-market-accent: #e8722a;
  --fresh-market-glow: rgba(254, 249, 240, 0.3);
}

@keyframes fresh-market-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fresh-market-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.fresh-market-card {
  position: relative;
  overflow: hidden;
}

.fresh-market-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(254, 249, 240, 0.05), transparent);
  pointer-events: none;
}

.fresh-market-card:hover::before {
  opacity: 1;
}

.fresh-market-gradient {
  background: linear-gradient(135deg, #fef9f0, #e8722a);
}

.fresh-market-gradient-text {
  background: linear-gradient(135deg, #fef9f0, #e8722a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.fresh-market-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(254, 249, 240, 0.08);
}

.fresh-market-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.fresh-market-animate-in {
  animation: fresh-market-fade-in 0.5s ease-out both;
}`,

  aiRules: `You are a Fresh Market food e-commerce design expert.

## Absolute Rules
- Background must be warm cream #fef9f0, never cold white or gray
- All corners must be rounded (minimum rounded-lg, prefer rounded-2xl)
- Green #2d5016 for headings and freshness signals
- Orange #e8722a for CTAs and energy
- No pure black — use deep brown #8b4513 or deep green
- Product images must be large and appetizing

## Forbidden
- Cool blue/gray backgrounds
- Sharp corners (rounded-none)
- Pure black text
- Neon or fluorescent colors
- Industrial or geometric fonts

## Responsive
- Mobile: single-column with large product images
- Desktop: 3-4 column product grid

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

  examplePrompts: [
    {
      title: "生鲜电商首页",
      titleEn: "Grocery Store Homepage",
      description: "有机生鲜电商首页，含当季推荐和产品分类",
      descriptionEn: "Organic grocery homepage with seasonal picks and category browsing",
      prompt: "Create a warm, organic grocery store homepage with seasonal hero banner, product category pills, featured products grid with add-to-cart buttons, and delivery info section.",
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 鲜活市集风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Fresh Market style",
      prompt: `Create a SaaS landing page using Fresh Market style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 鲜活市集风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Fresh Market style",
      prompt: `Create a portfolio showcase page using Fresh Market style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "fresh-market-warm",
      name: "鲜活市集暖色版",
      nameEn: "Fresh Market Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#f9fbef",
        secondary: "#42622d",
        accent: ["#ad8705", "#addb3c", "#645300", "#c4e8c5"],
      },
    },
    {
      id: "fresh-market-cool",
      name: "鲜活市集冷色版",
      nameEn: "Fresh Market Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#fff7f4",
        secondary: "#294814",
        accent: ["#ff6267", "#ffaf6b", "#a23a39", "#e6dfbc"],
      },
    },
  ],
};
