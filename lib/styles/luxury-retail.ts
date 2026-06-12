import type { DesignStyle } from "./types";

export const luxuryRetail: DesignStyle = {
  slug: "luxury-retail",
  name: "奢品零售",
  nameEn: "Luxury Retail",
  description:
    "高端零售与奢侈品牌风格，大面积留白搭配衬线字体，金色与大理石质感传递尊贵感。",
  descriptionEn:
    "Premium retail aesthetic with generous whitespace, serif typography, and gold-marble accents that communicate exclusivity and refinement.",
  cover: "/styles/luxury-retail.svg",
  styleType: "visual",
  tags: ["modern", "minimal"],
  category: "modern",
  colors: {
    primary: "#faf9f6",
    secondary: "#1a1a1a",
    accent: ["#c9a96e", "#8b7355", "#e8e0d4", "#2c2c2c"],
  },
  keywords: ["奢侈品", "高端", "品牌", "零售", "大留白", "衬线", "modern", "contemporary", "sleek", "现代"],

  philosophy: `Luxury Retail 的设计哲学源自高端时装与珠宝零售。

核心理念：
- 克制即尊贵：越少的元素越能传递高端感，留白是最昂贵的设计语言
- 衬线权威感：使用衬线字体建立品牌的历史感和工艺传承
- 金色点缀：金色仅作为点缀色出现在关键交互和分隔线上
- 触感质地：通过微妙的纹理和渐变暗示材质的精致

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Luxury Retail design philosophy comes from high-end fashion and jewelry retail.

Core principles:
- Restraint is prestige: Fewer elements communicate luxury; whitespace is the most expensive design language
- Serif authority: Serif fonts establish heritage and craftsmanship
- Gold accents: Gold appears only as accent on key interactions and dividers
- Tactile quality: Subtle textures and gradients suggest material refinement`,

  doList: [
    "使用暖白背景 bg-[#faf9f6] 而非纯白",
    "标题使用衬线字体 font-serif text-[#1a1a1a]",
    "金色点缀仅限边框、分隔线和图标：border-[#c9a96e] 或 text-[#c9a96e]",
    "产品图片使用大面积展示，至少 aspect-[3/4]",
    "按钮使用细边框样式 border border-[#1a1a1a] bg-transparent hover:bg-[#1a1a1a] hover:text-white",
    "正文使用 tracking-wide 和 leading-relaxed 增加优雅感",
    "使用 1px 分隔线 border-[#e8e0d4] 代替粗分割",
  ],

  doListEn: [
    "Use warm white bg-[#faf9f6] instead of pure white",
    "Headings use serif font-serif text-[#1a1a1a]",
    "Gold accents limited to borders, dividers, icons: border-[#c9a96e] or text-[#c9a96e]",
    "Product images use large display, at least aspect-[3/4]",
    "Buttons use thin border style: border border-[#1a1a1a] bg-transparent hover:bg-[#1a1a1a] hover:text-white",
    "Body text uses tracking-wide and leading-relaxed for elegance",
    "Use 1px dividers border-[#e8e0d4] instead of thick separators",
  ],

  dontList: [
    "禁止使用饱和度高的彩色（破坏高端感）",
    "禁止使用无衬线粗体作为主标题",
    "禁止使用圆角超过 rounded-sm（奢品倾向直角或微圆角）",
    "禁止大面积使用金色（金色只能是点缀）",
    "禁止使用表情符号或卡通图形",
    "禁止使用小尺寸产品图（奢品图片必须大而清晰）",
  ],

  dontListEn: [
    "Never use saturated bright colors (breaks premium feel)",
    "Never use sans-serif bold as main heading",
    "Never exceed rounded-sm (luxury prefers sharp or micro-rounded corners)",
    "Never use gold as a large fill color (gold is accent only)",
    "Never use emojis or cartoon graphics",
    "Never use small product images (luxury images must be large and clear)",
  ],

  components: {
    button: {
      name: "奢品按钮",
      description: "细边框反转按钮，传递克制与精致",
      code: `<button className="px-8 py-3 border border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.2em] uppercase font-light hover:bg-[#1a1a1a] hover:text-[#faf9f6] transition-all duration-300">Discover</button>`,
    },
    card: {
      name: "产品展示",
      description: "大图产品卡，极简信息层级",
      code: `<div className="group">
  <div className="aspect-[3/4] bg-[#f0ece4] overflow-hidden mb-4">
    <div className="w-full h-full bg-gradient-to-b from-[#e8e0d4] to-[#d8cfc0] group-hover:scale-[1.02] transition-transform duration-500" />
  </div>
  <p className="text-xs tracking-[0.15em] uppercase text-[#8b7355] mb-1">Collection</p>
  <h3 className="font-serif text-lg text-[#1a1a1a] mb-1">Signature Piece</h3>
  <p className="text-sm text-[#8b7355]">$1,280</p>
</div>`,
    },
    input: {
      name: "咨询输入",
      description: "底部细线输入框",
      code: `<input type="text" placeholder="Your email" className="w-full py-3 bg-transparent border-b border-[#c9a96e] text-sm text-[#1a1a1a] placeholder:text-[#8b7355] focus:outline-none focus:border-[#1a1a1a] transition-colors tracking-wide" />`,
    },
    nav: {
      name: "品牌导航",
      description: "居中 logo 高端导航",
      code: `<nav className="flex items-center justify-between px-8 py-6 bg-[#faf9f6] border-b border-[#e8e0d4]">
  <div className="flex gap-8 text-xs tracking-[0.2em] uppercase text-[#8b7355]">
    <span className="hover:text-[#1a1a1a] transition-colors cursor-pointer">Women</span>
    <span className="hover:text-[#1a1a1a] transition-colors cursor-pointer">Men</span>
  </div>
  <span className="font-serif text-xl tracking-[0.15em] text-[#1a1a1a]">MAISON</span>
  <div className="flex gap-8 text-xs tracking-[0.2em] uppercase text-[#8b7355]">
    <span className="hover:text-[#1a1a1a] transition-colors cursor-pointer">Stories</span>
    <span className="hover:text-[#1a1a1a] transition-colors cursor-pointer">Stores</span>
  </div>
</nav>`,
    },
    hero: {
      name: "品牌 Hero",
      description: "全屏品牌展示区",
      code: `<section className="min-h-[80vh] bg-[#faf9f6] flex items-center justify-center px-8">
  <div className="text-center max-w-2xl">
    <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">Autumn / Winter 2026</p>
    <h1 className="font-serif text-5xl text-[#1a1a1a] leading-tight mb-6">The Art of<br />Timeless Elegance</h1>
    <p className="text-[#8b7355] leading-relaxed mb-8">A curated collection where heritage meets modern refinement.</p>
    <button className="px-10 py-3 border border-[#1a1a1a] text-xs tracking-[0.2em] uppercase text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#faf9f6] transition-all duration-300">Explore Collection</button>
  </div>
</section>`,
    },
    footer: {
      name: "品牌页脚",
      description: "极简品牌页脚",
      code: `<footer className="bg-[#1a1a1a] text-[#e8e0d4] px-8 py-16 text-center">
  <p className="font-serif text-2xl tracking-[0.1em] mb-4">MAISON</p>
  <div className="flex justify-center gap-8 text-xs tracking-[0.2em] uppercase text-[#8b7355] mb-8">
    <span>Stores</span><span>Contact</span><span>Careers</span><span>Legal</span>
  </div>
  <p className="text-xs text-[#8b7355]">&copy; 2026 Maison. All rights reserved.</p>
</footer>`,
    },
  },

  globalCss: `.luxury-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #c9a96e, transparent);
  margin: 2rem 0;
}
/* Luxury Retail Design Tokens */
:root {
  --luxury-retail-primary: #faf9f6;
  --luxury-retail-secondary: #1a1a1a;
  --luxury-retail-accent: #c9a96e;
  --luxury-retail-glow: rgba(250, 249, 246, 0.3);
}

@keyframes luxury-retail-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes luxury-retail-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.luxury-retail-card {
  position: relative;
  overflow: hidden;
}

.luxury-retail-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(250, 249, 246, 0.05), transparent);
  pointer-events: none;
}

.luxury-retail-card:hover::before {
  opacity: 1;
}

.luxury-retail-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(250, 249, 246, 0.08);
}

.luxury-retail-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.luxury-retail-animate-in {
  animation: luxury-retail-fade-in 0.5s ease-out both;
}`,

  aiRules: `You are a Luxury Retail design expert.

## Absolute Rules
- Headings MUST use serif fonts
- Background must be warm white #faf9f6, never pure white
- Gold #c9a96e is accent ONLY — borders, dividers, small text
- Product images must be large (aspect-[3/4] minimum)
- Buttons must be outlined, not filled (hover inverts)
- All text must use generous tracking and leading

## Forbidden
- Bright saturated colors
- Rounded corners beyond rounded-sm
- Sans-serif bold headings
- Large gold fills
- Emojis or cartoon graphics
- Small product thumbnails

## Responsive
- Mobile: full-width hero, stacked product cards
- Desktop: 2-3 column editorial grid

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
      title: "奢侈品首页",
      titleEn: "Luxury Brand Homepage",
      description: "高端品牌首页，含全屏 Hero、产品陈列、品牌故事",
      descriptionEn: "Premium brand homepage with fullscreen hero, product showcase, brand story",
      prompt: "Create a luxury brand homepage with a full-height hero showing seasonal collection, 4-product editorial grid, gold divider accents, and serif typography throughout.",
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 奢品零售风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Luxury Retail style",
      prompt: `Create a SaaS landing page using Luxury Retail style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 奢品零售风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Luxury Retail style",
      prompt: `Create a portfolio showcase page using Luxury Retail style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "luxury-retail-warm",
      name: "奢品零售暖色版",
      nameEn: "Luxury Retail Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#f8f9f6",
        secondary: "#313131",
        accent: ["#a6b468", "#78794f", "#e1e2d2", "#2c2c2c"],
      },
    },
    {
      id: "luxury-retail-cool",
      name: "奢品零售冷色版",
      nameEn: "Luxury Retail Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#fbf9f7",
        secondary: "#171717",
        accent: ["#e49f85", "#996d64", "#edded9", "#2c2c2c"],
      },
    },
  ],
};
