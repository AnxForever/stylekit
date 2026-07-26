import type { DesignStyle } from "./types";

export const koreanMinimal: DesignStyle = {
  slug: "korean-minimal",
  name: "韩式极简",
  nameEn: "Korean Minimal",
  description:
    "韩国极简设计美学，受K-beauty和韩国建筑影响。柔和的粉彩色调、大量留白、精致的圆角和克制的装饰。",
  descriptionEn:
    "Korean minimalist design aesthetic influenced by K-beauty and Korean architecture. Soft pastel tones, generous whitespace, refined rounded corners, and restrained ornamentation.",
  cover: "/styles/korean-minimal.svg",
  styleType: "visual",
  tags: [],
  category: "minimal",
  colors: {
    primary: "#3d4a5c",
    secondary: "#faf9f7",
    accent: ["#d4a5a5", "#a8c5b8", "#e8d4b8", "#b9b08a"],
  },
  keywords: ["韩式", "极简", "K-beauty", "留白", "粉彩", "克制", "精致", "minimal", "clean", "simple"],
  keywordsEn: ["Korean minimalism", "K-beauty", "minimal web design", "pastel colors", "soft ui", "generous whitespace", "rounded corners", "clean aesthetic", "Korean web design", "beauty brand", "skincare website"],

  philosophy: `Korean Minimal（韩式极简）源自韩国当代设计美学中对"留白"与"克制"的深度追求，融合了K-beauty的柔和质感和韩国现代建筑的简洁线条。

核心理念：
- 留白即美：大面积的空白不是空虚，而是一种呼吸感。韩式极简将留白视为最重要的设计元素，让内容在宁静中自然浮现
- 粉彩温度：不同于北欧极简的冷灰色调，韩式极简选择带有微暖底色的粉彩——腮红粉、鼠尾草绿、沙色——赋予界面柔和而不冰冷的个性
- 克制装饰：装饰性元素被压缩到极致，一条细线、一个微妙的圆角、一抹淡淡的阴影就是全部。多一分则过，少一分则失
- 精致触感：受K-beauty产品设计影响，每一个交互都追求丝滑、精致和高品质感

韩式极简在全球设计界的影响力日益增长，特别是在美妆、生活方式和高端消费品领域。它证明了极简主义不必是冰冷的——它可以温暖、柔和，同时保持优雅的克制。

适用场景包括美妆品牌、生活方式电商、个人博客、摄影作品集以及任何追求精致宁静氛围的数字产品。`,

  philosophyEn: `Korean Minimal originates from the deep pursuit of "whitespace" and "restraint" in Korean contemporary design aesthetics, blending the soft textures of K-beauty with the clean lines of modern Korean architecture.

Core concepts:
- Whitespace as beauty: Large areas of blank space are not emptiness but a sense of breathing. Korean Minimal treats whitespace as the most important design element, allowing content to emerge naturally in tranquility
- Pastel warmth: Unlike the cold gray tones of Nordic minimalism, Korean Minimal chooses pastels with a slightly warm undertone -- blush pink, sage green, sand -- giving the interface a soft yet not cold personality
- Restrained decoration: Decorative elements are compressed to the extreme -- a thin line, a subtle rounded corner, a faint shadow is all there is. One more is too much, one less is too little
- Refined touch: Influenced by K-beauty product design, every interaction pursues a silky, refined, and premium feel

Korean Minimal's influence in the global design world is growing, especially in beauty, lifestyle, and premium consumer goods. It proves that minimalism need not be cold -- it can be warm and soft while maintaining elegant restraint.

Suitable for beauty brands, lifestyle e-commerce, personal blogs, photography portfolios, and any digital product pursuing a refined and serene atmosphere.`,

  doList: [
    "使用大量留白 p-8 md:p-12 lg:p-16 营造呼吸感",
    "使用温暖白 bg-[#faf9f7] 作为主背景色",
    "使用石板蓝 text-[#3d4a5c] 作为主要文本色",
    "使用粉彩色做微妙的点缀 text-[#d4a5a5], bg-[#a8c5b8]/10",
    "使用精致的大圆角 rounded-2xl 或 rounded-3xl",
    "采用极细边框 border border-[#3d4a5c]/10",
    "使用柔和的阴影 shadow-sm 或自定义浅阴影",
    "字体轻盈干净 font-light 或 font-normal, tracking-wide",
  ],

  doListEn: [
    "Use generous whitespace p-8 md:p-12 lg:p-16 to create a breathing feel",
    "Use warm white bg-[#faf9f7] as the main background color",
    "Use slate blue text-[#3d4a5c] as the primary text color",
    "Use pastel colors for subtle accents text-[#d4a5a5], bg-[#a8c5b8]/10",
    "Use refined large rounded corners rounded-2xl or rounded-3xl",
    "Use ultra-thin borders border border-[#3d4a5c]/10",
    "Use soft shadows shadow-sm or custom light shadows",
    "Fonts should be light and clean font-light or font-normal, tracking-wide",
  ],

  dontList: [
    "禁止使用高饱和度的纯色 bg-red-500, bg-blue-600",
    "禁止使用粗重边框 border-2, border-4",
    "禁止使用强烈的阴影 shadow-xl, shadow-2xl",
    "禁止使用 uppercase 和 tracking-widest（过于强势）",
    "禁止使用深色/黑色背景 bg-black, bg-[#0a0a0a]",
    "禁止过度装饰和元素堆叠",
    "禁止使用霓虹色或荧光色",
  ],

  dontListEn: [
    "Do not use high-saturation pure colors bg-red-500, bg-blue-600",
    "Do not use thick borders border-2, border-4",
    "Do not use strong shadows shadow-xl, shadow-2xl",
    "Do not use uppercase and tracking-widest (too aggressive)",
    "Do not use dark/black backgrounds bg-black, bg-[#0a0a0a]",
    "Do not over-decorate or stack elements excessively",
    "Do not use neon or fluorescent colors",
  ],

  components: {
    button: {
      name: "按钮",
      description: "韩式极简风格按钮，强调慢节奏呼吸感与低对比反馈",
      code: `<button className="
  px-10 py-3.5
  bg-[#faf9f7] text-[#3d4a5c]
  font-light tracking-wide
  rounded-2xl
  border border-[#3d4a5c]/10
  shadow-[0_4px_15px_rgba(232,212,184,0.18)]
  hover:-translate-y-0.5
  hover:text-[#2f3946]
  hover:shadow-[0_16px_36px_rgba(168,197,184,0.18)]
  active:bg-[#f3f0ea]
  transition-all duration-700 ease-in-out
">
  Discover
</button>`,
    },
    card: {
      name: "卡片",
      description: "韩式极简风格卡片，微距上浮与奶油化暖阴影过渡",
      code: `<div className="
  group
  p-10
  bg-[#faf9f7]
  rounded-2xl
  border border-[#3d4a5c]/10
  shadow-[0_8px_24px_rgba(232,212,184,0.14)]
  hover:-translate-y-0.5
  hover:shadow-[0_24px_50px_rgba(212,165,165,0.16)]
  transition-all duration-1000 ease-in-out
">
  <div className="w-8 h-px bg-[#d4a5a5]/80 mb-6" />
  <h3 className="text-xl font-light text-[#3d4a5c] mb-4 tracking-wide group-hover:text-[#2f3946] transition-colors duration-700">
    Gentle Touch
  </h3>
  <p className="text-sm text-[#3d4a5c]/55 leading-relaxed group-hover:text-[#3d4a5c]/70 transition-colors duration-700">
    A slow and delicate interface rhythm, where warmth appears in quiet gradients.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "韩式极简风格输入框，极细边框与柔和聚焦",
      code: `<input
  type="text"
  placeholder="Type here..."
  className="
    w-full px-6 py-3.5
    bg-[#faf9f7]
    border border-[#3d4a5c]/10
    rounded-2xl
    text-[#3d4a5c] placeholder-[#3d4a5c]/25
    font-light tracking-wide
    focus:border-[#d4a5a5]/50
    focus:shadow-[0_0_0_3px_rgba(212,165,165,0.1)]
    focus:outline-none
    transition-all duration-300
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "韩式极简风格 Hero，极致留白与粉彩点缀",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#faf9f7]
  relative
">
  {/* Subtle accent dot */}
  <div className="absolute top-20 right-20 w-3 h-3 rounded-full bg-[#d4a5a5]/30" />

  <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
    <div className="w-12 h-[1px] bg-[#3d4a5c]/20 mx-auto mb-12" />
    <h1 className="text-4xl md:text-6xl font-light text-[#3d4a5c] mb-8 tracking-wide leading-tight">
      Korean Minimal
    </h1>
    <p className="text-base text-[#3d4a5c]/40 mb-12 leading-relaxed">
      The beauty of restraint, the warmth of simplicity
    </p>
    <button className="
      px-10 py-3.5
      bg-[#3d4a5c] text-[#faf9f7]
      font-normal tracking-wide
      rounded-2xl
      shadow-sm
      hover:shadow-md hover:bg-[#3d4a5c]/90
      transition-all duration-300
    ">
      Discover
    </button>
    <div className="w-12 h-[1px] bg-[#3d4a5c]/20 mx-auto mt-12" />
  </div>
</section>`,
    },
  },

  globalCss: `/* Korean Minimal Global Styles */

:root {
  --km-slate-blue: #3d4a5c;
  --km-warm-white: #faf9f7;
  --km-blush: #d4a5a5;
  --km-sage: #a8c5b8;
  --km-sand: #e8d4b8;
}

/* Subtle card hover */
.km-card-hover {
  transition: all 0.3s ease;
}
.km-card-hover:hover {
  box-shadow: 0 4px 12px rgba(61, 74, 92, 0.06);
  transform: translateY(-1px);
}

/* Thin divider */
.km-divider {
  height: 1px;
  background-color: rgba(61, 74, 92, 0.1);
}

/* Blush accent */
.km-blush-accent {
  color: var(--km-blush);
}

/* Breathing spacing */
.km-breathe {
  padding: 3rem 2rem;
}

@media (min-width: 768px) {
  .km-breathe {
    padding: 5rem 3rem;
  }
}

/* Gentle focus ring */
.km-focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(212, 165, 165, 0.15);
}
@keyframes korean-minimal-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes korean-minimal-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.korean-minimal-card {
  position: relative;
  overflow: hidden;
}

.korean-minimal-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(61, 74, 92, 0.05), transparent);
  pointer-events: none;
}

.korean-minimal-card:hover::before {
  opacity: 1;
}

.korean-minimal-gradient {
  background: linear-gradient(135deg, #3d4a5c, #d4a5a5);
}

.korean-minimal-gradient-text {
  background: linear-gradient(135deg, #3d4a5c, #d4a5a5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.korean-minimal-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(61, 74, 92, 0.08);
}

.korean-minimal-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.korean-minimal-animate-in {
  animation: korean-minimal-fade-in 0.5s ease-out both;
}`,

  aiRules: `You are a Korean Minimal design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- High saturation pure colors (bg-red-500, bg-blue-600, bg-green-500)
- Thick borders (border-2, border-4)
- Heavy shadows (shadow-xl, shadow-2xl)
- Uppercase text and ultra-wide tracking (uppercase tracking-widest)
- Dark/black backgrounds (bg-black, bg-[#0a0a0a])
- Neon or fluorescent colors
- Excessive decorations or visual clutter

## Must Follow

- Warm white background bg-[#faf9f7]
- Slate blue text text-[#3d4a5c]
- Generous whitespace and padding (p-8, p-10, p-12)
- Delicate rounded corners rounded-2xl
- Ultra-thin borders border border-[#3d4a5c]/8 or /10
- Soft subtle shadows shadow-sm
- Light font weights font-light or font-normal
- Wide but gentle tracking tracking-wide

## Color Palette

Primary:
- Slate Blue: #3d4a5c
- Warm White: #faf9f7
- Blush Pink: #d4a5a5
- Sage Green: #a8c5b8
- Sand: #e8d4b8

## Design Principles

- Whitespace is the primary design element
- Less is always more
- Subtle is always better than obvious
- Every element must have room to breathe
- Decorations should be minimal (thin lines, small dots)

## Animation & Interaction Rules

- Lazy Breathing: 过渡建议使用 duration-700 以上与 ease-in-out，保持慵懒平稳，不做短促反馈。
- Micro Lift: hover 位移保持在 -translate-y-0.5 量级，通过超浅暖色阴影扩散表达层次。
- Muted Whisper: 文字与边框只做同色系微差过渡，避免高对比跳色破坏安静氛围。
- Soft Press: active 反馈优先使用背景轻微加深，不依赖明显缩放与弹跳。`,

  aiRulesEn: `You are a Korean Minimal design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- High saturation pure colors (bg-red-500, bg-blue-600, bg-green-500)
- Thick borders (border-2, border-4)
- Heavy shadows (shadow-xl, shadow-2xl)
- Uppercase text and ultra-wide tracking (uppercase tracking-widest)
- Dark/black backgrounds (bg-black, bg-[#0a0a0a])
- Neon or fluorescent colors
- Excessive decorations or visual clutter

## Must Follow

- Warm white background bg-[#faf9f7]
- Slate blue text text-[#3d4a5c]
- Generous whitespace and padding (p-8, p-10, p-12)
- Delicate rounded corners rounded-2xl
- Ultra-thin borders border border-[#3d4a5c]/8 or /10
- Soft subtle shadows shadow-sm
- Light font weights font-light or font-normal
- Wide but gentle tracking tracking-wide

## Color Palette

Primary:
- Slate Blue: #3d4a5c
- Warm White: #faf9f7
- Blush Pink: #d4a5a5
- Sage Green: #a8c5b8
- Sand: #e8d4b8

## Design Principles

- Whitespace is the primary design element
- Less is always more
- Subtle is always better than obvious
- Every element must have room to breathe
- Decorations should be minimal (thin lines, small dots)

## Animation & Interaction Rules

- Lazy Breathing: Transitions should use duration-700 or above with ease-in-out, maintaining a languid, steady pace without short, snappy feedback.
- Micro Lift: Hover displacement stays at the -translate-y-0.5 level, expressing layers through ultra-shallow warm-toned shadow spread.
- Muted Whisper: Text and borders only do same-hue micro-difference transitions, avoiding high-contrast color jumps that break the quiet atmosphere.
- Soft Press: Active feedback primarily uses slight background darkening, not relying on obvious scaling or bouncing.`,

  examplePrompts: [
    {
      title: "韩式极简品牌页",
      titleEn: "Korean Minimal Brand Page",
      description: "K-beauty风格的品牌展示页",
      descriptionEn: "K-beauty inspired brand showcase page",
      prompt: `Use Korean Minimal style to create a beauty brand page:
1. Background: warm white with generous whitespace
2. Title: light weight font in slate blue
3. Cards: thin borders, large padding, subtle shadows
4. Buttons: rounded-2xl with soft hover effects
5. Decorations: thin lines and tiny pastel dots only`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 韩式极简风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Korean Minimal style",
      prompt: `Create a SaaS landing page using Korean Minimal style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 韩式极简风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Korean Minimal style",
      prompt: `Create a portfolio showcase page using Korean Minimal style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "korean-minimal-warm",
      name: "韩式极简暖色版",
      nameEn: "Korean Minimal Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#48465f",
        secondary: "#fbfaf8",
        accent: ["#caaa94", "#a8c4c4", "#d6dab3"],
      },
    },
    {
      id: "korean-minimal-cool",
      name: "韩式极简冷色版",
      nameEn: "Korean Minimal Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#354d54",
        secondary: "#e1e0de",
        accent: ["#d4a3b9", "#aec4ae", "#f5cfc5"],
      },
    },
  ],
};
