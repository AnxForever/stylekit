import { DesignStyle } from "./index";

export const cardFlip: DesignStyle = {
  slug: "card-flip",
  name: "卡片翻转",
  nameEn: "Card Flip",
  description:
    "3D卡片翻转动画风格，融合数字滚动计数器、深邃海军蓝与奢华金色配色。适合金融科技、会员卡、数据展示等场景。",
  descriptionEn:
    "3D card flip animation style combining number ticker counters, deep navy backgrounds, and luxurious gold accents. Ideal for fintech, membership cards, and data display scenarios.",
  cover: "/styles/card-flip.svg",
  styleType: "animation",
  tags: ["expressive", "modern", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#0a0e27",
    secondary: "#1a1f3a",
    accent: ["#d4a574", "#f0d9b5", "#8b7355"],
  },
  keywords: [
    "card flip",
    "3D",
    "animation",
    "number ticker",
    "counter",
    "gold",
    "luxury",
    "perspective",
    "transform",
    "interactive",
  ],

  philosophy: `Card Flip 风格将3D翻转动画与奢华金色调相结合，创造出沉浸式的交互体验。

核心理念：
- 3D透视：使用 perspective 和 transform-style: preserve-3d 实现真实的翻转效果
- 数字滚动：计数器使用垂直滚动动画模拟机械翻牌效果
- 深邃背景：深海军蓝背景衬托金色元素的高级感
- 金色点缀：所有交互元素使用金色作为主要强调色
- 微光效果：金色元素带有柔和的发光和闪烁动画
- 层次分明：通过阴影和边框营造卡片的立体感

设计原则：
- 视觉一致性：所有组件遵循统一的深色+金色视觉语言
- 交互反馈：翻转、闪烁、脉冲等动画提供丰富的交互反馈
- 响应式适配：3D效果在各设备上保持一致体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准`,

  philosophyEn: `Card Flip style combines 3D flip animations with luxurious gold tones to create immersive interactive experiences.

Core principles:
- 3D perspective: use perspective and transform-style: preserve-3d for realistic flip effects
- Number ticker: counters use vertical scroll animations to simulate mechanical flip displays
- Deep backgrounds: deep navy backgrounds highlight the premium feel of gold elements
- Gold accents: all interactive elements use gold as the primary accent color
- Shimmer effects: gold elements feature soft glow and shimmer animations
- Depth layering: shadows and borders create a sense of card dimensionality`,

  doList: [
    "Use perspective and preserve-3d for all 3D flip effects",
    "Apply gold (#d4a574) accents on interactive elements",
    "Keep backgrounds deep navy (#0a0e27 or #1a1f3a)",
    "Add shimmer animations to gold elements on hover",
    "Use monospace fonts for number displays and counters",
    "Include smooth transitions for all state changes",
  ],
  doListEn: [
    "Use perspective and preserve-3d for all 3D flip effects",
    "Apply gold (#d4a574) accents on interactive elements",
    "Keep backgrounds deep navy (#0a0e27 or #1a1f3a)",
    "Add shimmer animations to gold elements on hover",
    "Use monospace fonts for number displays and counters",
    "Include smooth transitions for all state changes",
  ],

  dontList: [
    "Don't use light or white backgrounds",
    "Don't use flat 2D transforms when 3D is expected",
    "Don't use colors outside the navy/gold palette",
    "Don't skip transition durations on animated elements",
    "Don't use sharp corners on cards (use rounded-xl)",
  ],

  dontListEn: [
    "Don't use light or white backgrounds",
    "Don't use flat 2D transforms when 3D is expected",
    "Don't use colors outside the navy/gold palette",
    "Don't skip transition durations on animated elements",
    "Don't use sharp corners on cards (use rounded-xl)",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Card Flip 金色按钮，带闪光悬停效果",
      code: `<button className="group relative px-8 py-4 bg-[#d4a574] text-[#0a0e27] font-sans font-semibold text-sm tracking-wide rounded-xl border border-[#d4a574] shadow-[0_4px_16px_rgba(212,165,116,0.2)] hover:shadow-[0_8px_32px_rgba(212,165,116,0.4)] active:scale-[0.97] transition-all duration-300 overflow-hidden">
  <span className="relative z-10">Confirm</span>
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
</button>`,
    },
    card: {
      name: "卡片",
      description: "Card Flip 3D翻转卡片，正反两面",
      code: `<div className="group" style={{perspective: '1000px'}}>
  <div className="relative w-80 h-48 transition-transform duration-700 group-hover:[transform:rotateY(180deg)]" style={{transformStyle: 'preserve-3d'}}>
    {/* Front */}
    <div className="absolute inset-0 bg-[#1a1f3a] border border-[#d4a574]/30 rounded-xl p-6 flex flex-col justify-between" style={{backfaceVisibility: 'hidden'}}>
      <div className="flex justify-between items-start">
        <span className="text-[#d4a574] text-xs tracking-widest uppercase">Premium Card</span>
        <div className="w-10 h-7 rounded bg-[#d4a574]/20 border border-[#d4a574]/40" />
      </div>
      <div>
        <p className="text-white/80 font-mono text-lg tracking-[0.15em]">4532 **** **** 7890</p>
        <p className="text-white/50 text-xs mt-2">CARD HOLDER</p>
      </div>
    </div>
    {/* Back */}
    <div className="absolute inset-0 bg-[#1a1f3a] border border-[#d4a574]/30 rounded-xl p-6 flex items-center justify-center [transform:rotateY(180deg)]" style={{backfaceVisibility: 'hidden'}}>
      <div className="w-full h-10 bg-[#0a0e27] rounded flex items-center justify-end px-4">
        <span className="text-[#d4a574] font-mono text-sm">CVV: 123</span>
      </div>
    </div>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Card Flip 深色输入框，金色聚焦边框",
      code: `<div className="space-y-2">
  <label className="block text-[#d4a574] text-xs uppercase tracking-widest">Card Number</label>
  <input
    type="text"
    className="w-full px-4 py-3 bg-[#0a0e27] border border-[#d4a574]/30 text-white font-mono text-sm placeholder:text-white/30 rounded-xl focus:outline-none focus:border-[#d4a574] focus:shadow-[0_0_0_3px_rgba(212,165,116,0.2)] transition-all duration-300"
    placeholder="0000 0000 0000 0000"
  />
</div>`,
    },
    nav: {
      name: "导航栏",
      description: "Card Flip 导航栏，深色背景金色点缀",
      code: `<nav className="bg-[#0a0e27]/95 border-b border-[#d4a574]/20 backdrop-blur-sm px-6 py-4 flex justify-between items-center">
  <span className="text-[#d4a574] font-sans font-semibold text-sm tracking-wide">Card Flip</span>
  <div className="flex gap-6">
    <a className="text-white/80 text-sm hover:text-[#d4a574] transition-colors duration-300">Dashboard</a>
    <a className="text-white/50 text-sm hover:text-[#d4a574] transition-colors duration-300">Cards</a>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区域",
      description: "Card Flip Hero 区域，3D透视标题",
      code: `<section className="relative bg-[#0a0e27] overflow-hidden px-6 py-20">
  <div className="absolute inset-0 bg-gradient-to-b from-[#d4a574]/5 to-transparent pointer-events-none" />
  <div className="relative max-w-4xl mx-auto text-center" style={{perspective: '800px'}}>
    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight" style={{textShadow: '0 0 40px rgba(212,165,116,0.3)'}}>
      Card Flip
    </h1>
    <p className="mt-4 text-[#d4a574]/70 text-sm">
      3D animations meet luxury design
    </p>
  </div>
</section>`,
    },
    footer: {
      name: "页脚",
      description: "Card Flip 页脚",
      code: `<footer className="bg-[#0a0e27] border-t border-[#d4a574]/20 px-6 py-6">
  <p className="text-white/30 text-xs text-center tracking-widest">
    Card Flip Style // Premium Design System
  </p>
</footer>`,
    },
  },

  globalCss: `/* Card Flip Global Styles */
@layer base {
  body {
    @apply bg-[#0a0e27] text-white antialiased;
  }

  ::selection {
    @apply bg-[#d4a574] text-[#0a0e27];
  }
}

@keyframes card-flip-rotate {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(180deg); }
}
@keyframes card-flip-counter-roll {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
}
@keyframes card-flip-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
@keyframes card-flip-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
/* Card Flip Design Tokens */
:root {
  --card-flip-primary: #0a0e27;
  --card-flip-secondary: #1a1f3a;
  --card-flip-accent: #d4a574;
  --card-flip-glow: rgba(212, 165, 116, 0.3);
}

.card-flip-card {
  position: relative;
  overflow: hidden;
}

.card-flip-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(212, 165, 116, 0.05), transparent);
  pointer-events: none;
}

.card-flip-card:hover::before {
  opacity: 1;
}

.card-flip-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(26, 31, 58, 0.8);
}

.card-flip-animate-in {
  animation: card-flip-fade-in 0.5s ease-out both;
}

@keyframes card-flip-fade-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.card-flip-focus { outline: 2px solid var(--card-flip-accent, currentColor); outline-offset: 2px; }`,

  aiRules: `STYLE: Card Flip
TYPE: 3D animation with luxury dark+gold aesthetic

MUST USE:
- Background: Deep navy (#0a0e27) or dark blue (#1a1f3a)
- Accent: Gold (#d4a574) for all interactive and highlight elements
- 3D transforms: perspective, transform-style: preserve-3d, backface-visibility: hidden
- Smooth transitions: duration-300 to duration-700 for flip animations
- Monospace fonts for number displays and counters
- Sans-serif fonts for body text and headings
- Rounded corners (rounded-xl) on cards and buttons
- Gold glow shadows on hover states

MUST AVOID:
- Light or white backgrounds
- Flat 2D transforms when 3D flip is expected
- Colors outside the navy/gold palette
- Sharp corners on cards
- Abrupt transitions without easing

COLOR RULES:
- Primary BG: Deep Navy (#0a0e27)
- Secondary BG: Dark Blue (#1a1f3a)
- Accent: Gold (#d4a574)
- Text: White (#ffffff)
- Muted: White/50 or Gold/50

SPECIAL EFFECTS:
- 3D card flip via rotateY with perspective
- Number ticker via translateY counter-roll animation
- Gold shimmer sweep on hover
- Pulse animation for active states

Animation & Interaction Rules:
- Flip Duration: Card flips should use duration-500 to duration-700 for smooth 3D rotation.
- Shimmer Sweep: On hover, a translucent white gradient sweeps across the element from left to right.
- Counter Roll: Number tickers use vertical translateY animation to simulate mechanical digit changes.
- Gold Pulse: Active/selected elements use a subtle opacity pulse animation.`,

  aiRulesEn: `STYLE: Card Flip
TYPE: 3D animation with luxury dark+gold aesthetic

MUST USE:
- Background: Deep navy (#0a0e27) or dark blue (#1a1f3a)
- Accent: Gold (#d4a574) for all interactive and highlight elements
- 3D transforms: perspective, transform-style: preserve-3d, backface-visibility: hidden
- Smooth transitions: duration-300 to duration-700 for flip animations
- Monospace fonts for number displays and counters
- Rounded corners (rounded-xl) on cards and buttons
- Gold glow shadows on hover states

MUST AVOID:
- Light or white backgrounds
- Flat 2D transforms when 3D flip is expected
- Colors outside the navy/gold palette
- Sharp corners on cards

Animation & Interaction Rules:
- Flip Duration: Card flips should use duration-500 to duration-700 for smooth 3D rotation.
- Shimmer Sweep: On hover, a translucent white gradient sweeps across the element.
- Counter Roll: Number tickers use vertical translateY animation to simulate mechanical digit changes.
- Gold Pulse: Active/selected elements use a subtle opacity pulse animation.`,

  examplePrompts: [
    {
      title: "银行卡翻转展示",
      titleEn: "Bank Card Flip Display",
      description: "带3D翻转效果的银行卡正反面展示",
      descriptionEn: "Bank card front/back display with 3D flip effect",
      prompt: `Create a bank card display using Card Flip style:
- Dark navy background
- Gold-accented card with 3D flip on hover
- Front: card number, holder name, expiry
- Back: magnetic stripe and CVV
- Smooth rotateY transition`,
    },
    {
      title: "数字计数器面板",
      titleEn: "Number Counter Dashboard",
      description: "带滚动数字动画的数据面板",
      descriptionEn: "Data dashboard with rolling number ticker animations",
      prompt: `Build a number counter dashboard using Card Flip style:
- Deep navy background with gold accents
- Multiple stat cards with rolling number tickers
- Monospace font for all numbers
- Gold shimmer on hover
- Counter-roll animation for digit changes`,
    },
    {
      title: "会员卡展示",
      titleEn: "Membership Card Showcase",
      description: "奢华风格的会员卡3D展示页面",
      descriptionEn: "Luxury membership card 3D showcase page",
      prompt: `Create a membership card showcase using Card Flip style with tier cards (Gold, Platinum, Diamond), 3D perspective effects, and consistent dark+gold visual language.`,
    },
  ],

  variants: [
    {
      id: "card-flip-rose-gold",
      name: "卡片翻转玫瑰金版",
      nameEn: "Card Flip Rose Gold",
      description: "Rose gold variant with warmer pink-gold tones",
      colors: {
        primary: "#0a0e27",
        secondary: "#1a1f3a",
        accent: ["#e8a87c", "#d4a574", "#c49b6a"],
      },
    },
    {
      id: "card-flip-silver",
      name: "卡片翻转银色版",
      nameEn: "Card Flip Silver",
      description: "Silver variant with cool metallic tones",
      colors: {
        primary: "#0a0e27",
        secondary: "#1a1f3a",
        accent: ["#c0c0c0", "#a8a8a8", "#d4d4d4"],
      },
    },
  ],
};
