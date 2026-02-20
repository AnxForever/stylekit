import { DesignStyle } from "./index";

export const koreanMinimal: DesignStyle = {
  slug: "korean-minimal",
  name: "韩式极简",
  nameEn: "Korean Minimal",
  description:
    "韩国极简设计美学，受K-beauty和韩国建筑影响。柔和的粉彩色调、大量留白、精致的圆角和克制的装饰。",
  cover: "/styles/korean-minimal.svg",
  styleType: "visual",
  tags: ["minimal", "modern"],
  category: "minimal",
  colors: {
    primary: "#3d4a5c",
    secondary: "#faf9f7",
    accent: ["#d4a5a5", "#a8c5b8", "#e8d4b8"],
  },
  keywords: ["韩式", "极简", "K-beauty", "留白", "粉彩", "克制", "精致"],

  philosophy: `Korean Minimal（韩式极简）源自韩国当代设计美学中对"留白"与"克制"的深度追求，融合了K-beauty的柔和质感和韩国现代建筑的简洁线条。

核心理念：
- 留白即美：大面积的空白不是空虚，而是一种呼吸感。韩式极简将留白视为最重要的设计元素，让内容在宁静中自然浮现
- 粉彩温度：不同于北欧极简的冷灰色调，韩式极简选择带有微暖底色的粉彩——腮红粉、鼠尾草绿、沙色——赋予界面柔和而不冰冷的个性
- 克制装饰：装饰性元素被压缩到极致，一条细线、一个微妙的圆角、一抹淡淡的阴影就是全部。多一分则过，少一分则失
- 精致触感：受K-beauty产品设计影响，每一个交互都追求丝滑、精致和高品质感

韩式极简在全球设计界的影响力日益增长，特别是在美妆、生活方式和高端消费品领域。它证明了极简主义不必是冰冷的——它可以温暖、柔和，同时保持优雅的克制。

适用场景包括美妆品牌、生活方式电商、个人博客、摄影作品集以及任何追求精致宁静氛围的数字产品。`,

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

  dontList: [
    "禁止使用高饱和度的纯色 bg-red-500, bg-blue-600",
    "禁止使用粗重边框 border-2, border-4",
    "禁止使用强烈的阴影 shadow-xl, shadow-2xl",
    "禁止使用 uppercase 和 tracking-widest（过于强势）",
    "禁止使用深色/黑色背景 bg-black, bg-[#0a0a0a]",
    "禁止过度装饰和元素堆叠",
    "禁止使用霓虹色或荧光色",
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
  ],
};
