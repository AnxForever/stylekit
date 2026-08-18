import type { DesignStyle } from "./types";
import { appleStyleAtoms } from "./atoms";

export const appleStyle: DesignStyle = {
  atoms: appleStyleAtoms,
  slug: "apple-style",
  name: "Apple 风格",
  nameEn: "Apple Style",
  description:
    "极致简约的高端设计风格，大量留白、精致圆角、微妙阴影和 SF Pro 风格字体，传达高端科技产品的品质感。",
  descriptionEn:
    "An ultra-minimalist premium design style with generous whitespace, refined border radii, subtle shadows, and SF Pro-style typography, conveying the quality feel of high-end tech products.",
  cover: "/styles/apple-style.svg",
  styleType: "visual",
  tags: [],
  category: "minimal",
  colors: {
    primary: "#000000",
    secondary: "#f5f5f7",
    accent: ["#0071e3", "#34c759", "#ff3b30", "#a13ff6"],
  },
  keywords: ["Apple", "极简", "高端", "科技", "产品", "留白", "精致", "minimal", "clean", "simple"],
  keywordsEn: ["Apple style", "Apple design", "minimalist website", "premium minimal", "SF Pro font", "generous whitespace", "clean ui", "product landing page", "subtle shadows", "rounded corners", "Cupertino design"],

  philosophy: `Apple Style 是一种源于 Apple 设计语言的极致简约风格，通过大量留白、精致的细节和克制的配色，传达高端科技产品的品质感和信任感。

核心理念：
- 极致简约：去除一切不必要的元素
- 大量留白：让内容呼吸，突出重点
- 精致细节：每个像素都经过精心设计
- 克制配色：黑白灰为主，蓝色点缀

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Apple Style is an ultra-minimalist style derived from Apple's design language, conveying the quality and trust of premium tech products through generous whitespace, refined details, and restrained color usage.

Core principles:
- Ultimate simplicity: Remove all unnecessary elements
- Generous whitespace: Let content breathe, highlight key points
- Refined details: Every pixel is carefully designed
- Restrained colors: Black, white, and gray as primary, blue as accent`,

  doList: [
    "使用大量留白，让内容呼吸",
    "使用 Apple 灰 #f5f5f7 作为背景",
    "使用 Apple 蓝 #0071e3 作为强调色",
    "使用精致的圆角 rounded-xl 或 rounded-2xl",
    "使用微妙的阴影",
    "使用 SF Pro 风格字体（-apple-system）",
  ],

  doListEn: [
    "Use generous whitespace to let content breathe",
    "Use Apple gray #f5f5f7 as background",
    "Use Apple blue #0071e3 as accent color",
    "Use refined border radii rounded-xl or rounded-2xl",
    "Use subtle shadows",
    "Use SF Pro-style fonts (-apple-system)",
  ],

  dontList: [
    "禁止使用过多颜色",
    "禁止使用渐变背景",
    "禁止使用重阴影",
    "禁止元素过于拥挤",
    "禁止使用花哨的装饰",
  ],

  dontListEn: [
    "Do NOT use too many colors",
    "Do NOT use gradient backgrounds",
    "Do NOT use heavy shadows",
    "Do NOT overcrowd elements",
    "Do NOT use flashy decorations",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Apple 风格按钮，简洁精致",
      code: `<button className="
  px-6 py-3
  bg-[#0071e3]
  rounded-full
  text-white font-medium
  shadow-[0_4px_14px_rgba(0,113,227,0.3)]
  hover:shadow-[0_6px_20px_rgba(0,113,227,0.4)]
  hover:-translate-y-0.5
  hover:bg-[#0077ed]
  active:scale-[0.96]
  transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
">
  Buy
</button>`,
    },
    card: {
      name: "卡片",
      description: "Apple 风格产品卡片",
      code: `<div className="
  group p-8
  bg-white
  rounded-3xl
  shadow-[0_4px_12px_rgba(0,0,0,0.04)]
  hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
  hover:-translate-y-1
  active:scale-[0.98]
  transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
  text-center
  cursor-pointer
  overflow-hidden
">
  <div className="w-48 h-48 mx-auto mb-6 bg-[#f5f5f7] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
    <span className="text-6xl text-gray-300 group-hover:text-gray-400 transition-colors duration-500"></span>
  </div>
  <h3 className="text-2xl font-semibold text-black mb-2 tracking-tight">
    iPhone 15 Pro
  </h3>
  <p className="text-gray-500 mb-4 group-hover:text-gray-700 transition-colors duration-500">
    Titanium. So strong. So light. So Pro.
  </p>
  <p className="text-lg font-medium text-black">
    From $999
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Apple 风格输入框",
      code: `<input
  type="text"
  placeholder="Search"
  className="
    w-full px-4 py-3
    bg-[#f5f5f7]
    rounded-xl
    text-black placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-[#0071e3]
    transition-all
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "Apple 风格导航栏",
      code: `<nav className="
  px-6 py-3
  bg-white/80
  backdrop-blur-xl
  border-b border-gray-200/50
">
  <div className="max-w-5xl mx-auto flex items-center justify-between">
    <a href="/" className="text-black">
      <svg className="w-5 h-5" viewBox="0 0 17 21" fill="currentColor">
        <path d="M8.5 0C5.5 0 3.5 2 3.5 5c0 2 1 3.5 2.5 4.5-1.5 1-2.5 3-2.5 5.5 0 3.5 2.5 6 6 6s6-2.5 6-6c0-2.5-1-4.5-2.5-5.5 1.5-1 2.5-2.5 2.5-4.5 0-3-2-5-5-5z"/>
      </svg>
    </a>
    <div className="flex items-center gap-8">
      <a href="#" className="text-xs text-black hover:text-gray-500 transition-colors">
        Store
      </a>
      <a href="#" className="text-xs text-black hover:text-gray-500 transition-colors">
        Mac
      </a>
      <a href="#" className="text-xs text-black hover:text-gray-500 transition-colors">
        iPhone
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Apple 风格产品展示区域",
      code: `<section className="
  min-h-screen
  flex flex-col items-center justify-center
  bg-black
  text-white
  px-6 py-20
">
  <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-center mb-4">
    iPhone 15 Pro
  </h1>
  <h2 className="text-2xl md:text-3xl text-gray-400 font-medium text-center mb-8">
    Titanium. So strong. So light. So Pro.
  </h2>
  <div className="flex gap-6 mb-12">
    <a href="#" className="text-[#2997ff] hover:underline">
      Learn more &gt;
    </a>
    <a href="#" className="text-[#2997ff] hover:underline">
      Buy &gt;
    </a>
  </div>
  <div className="w-full max-w-4xl aspect-video bg-gray-900 rounded-3xl flex items-center justify-center">
    <span className="text-gray-600 text-2xl">Product Image</span>
  </div>
</section>`,
    },
  },

  globalCss: `/* Apple Style 全局样式 */

:root {
  --apple-black: #000000;
  --apple-white: #ffffff;
  --apple-gray: #f5f5f7;
  --apple-blue: #0071e3;
  --apple-blue-hover: #0077ed;
  --apple-green: #34c759;
  --apple-red: #ff3b30;
}

/* Apple 风格字体 */
body {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Apple 风格标题 */
.apple-headline {
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

/* Apple 风格链接 */
.apple-link {
  color: var(--apple-blue);
  text-decoration: none;
}

.apple-link:hover {
  text-decoration: underline;
}

/* Apple 风格按钮 */
.apple-button {
  background: var(--apple-blue);
  color: white;
  border-radius: 9999px;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.apple-button:hover {
  background: var(--apple-blue-hover);
}

/* Apple 风格卡片 */
.apple-card {
  background: white;
  border-radius: 18px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
@keyframes apple-style-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes apple-style-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.apple-style-card {
  position: relative;
  overflow: hidden;
}

.apple-style-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.05), transparent);
  pointer-events: none;
}

.apple-style-card:hover::before {
  opacity: 1;
}

.apple-style-gradient {
  background: linear-gradient(135deg, #000000, #0071e3);
}

.apple-style-gradient-text {
  background: linear-gradient(135deg, #000000, #0071e3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.apple-style-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(0, 0, 0, 0.08);
}

.apple-style-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.apple-style-animate-in {
  animation: apple-style-fade-in 0.5s ease-out both;
}`,

  aiRules: `你是一名专精 Apple Style 设计风格的前端开发专家。生成的所有代码都必须严格遵守以下约束：

## 绝对禁止

- 使用渐变背景
- 使用过多颜色（超过 3 种）
- 使用重阴影 shadow-xl, shadow-2xl
- 元素过于拥挤
- 使用花哨的装饰和动画

## 必须遵守

- 大量留白
- Apple 灰背景 bg-[#f5f5f7]
- Apple 蓝强调色 text-[#0071e3], bg-[#0071e3]
- 精致圆角 rounded-xl, rounded-2xl, rounded-full
- 微妙阴影 shadow-[0_4px_12px_rgba(0,0,0,0.08)]
- SF Pro 风格字体

## 配色方案

主色：
- 黑色：text-black, bg-black
- 白色：text-white, bg-white
- Apple 灰：bg-[#f5f5f7]

强调色：
- Apple 蓝：#0071e3
- Apple 绿：#34c759
- Apple 红：#ff3b30

## 字体排印

- 标题：font-semibold tracking-tight
- 正文：font-normal
- 链接：text-[#0071e3] hover:underline

## 布局

- 最大宽度：max-w-5xl 或 max-w-[980px]
- 大量留白：py-20, py-24
- 居中对齐：text-center, mx-auto

## 动效与交互规则

- Spring Physics（弹簧物理）：严禁使用默认的 linear 或基础 ease。必须使用丝滑的减速曲线，如 \`transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]\`。
- Haptic Touch（触感反馈）：所有可交互元素（按钮、卡片）都必须具备物理按压的阻尼感，强制添加 \`active:scale-[0.98]\` 或 \`active:scale-[0.96]\`。
- Contextual Depth（情境纵深）：卡片悬停时，利用 \`group-hover\` 让内部图片或图标产生微妙放大（\`scale-105\`），营造视差纵深感。
- Subtle Blurs（微妙模糊）：交互过程可以伴随背景模糊度或不透明度的平滑过渡。

## 自检清单

每次生成代码后请检查：
1. 留白是否足够充分
2. 配色是否克制（黑白灰 + 蓝色点缀）
3. 是否没有使用渐变
4. 整体是否呈现高端简约的观感`,

  aiRulesEn: `You are an Apple Style design frontend development expert. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Using gradient backgrounds
- Using too many colors (more than 3)
- Using heavy shadows shadow-xl, shadow-2xl
- Overcrowding elements
- Using flashy decorations and animations

## Must Follow

- Generous whitespace
- Apple gray background bg-[#f5f5f7]
- Apple blue accent text-[#0071e3], bg-[#0071e3]
- Refined radii rounded-xl, rounded-2xl, rounded-full
- Subtle shadows shadow-[0_4px_12px_rgba(0,0,0,0.08)]
- SF Pro-style fonts

## Color Palette

Primary:
- Black: text-black, bg-black
- White: text-white, bg-white
- Apple gray: bg-[#f5f5f7]

Accent colors:
- Apple blue: #0071e3
- Apple green: #34c759
- Apple red: #ff3b30

## Typography

- Headings: font-semibold tracking-tight
- Body: font-normal
- Links: text-[#0071e3] hover:underline

## Layout

- Max width: max-w-5xl or max-w-[980px]
- Generous whitespace: py-20, py-24
- Center alignment: text-center, mx-auto

## Animation & Interaction Rules

- Spring Physics: Never use default linear or basic ease. Must use silky deceleration curves like \`transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]\`.
- Haptic Touch: All interactive elements (buttons, cards) must have physical press damping, mandatory \`active:scale-[0.98]\` or \`active:scale-[0.96]\`.
- Contextual Depth: On card hover, use \`group-hover\` to create subtle zoom on inner images or icons (\`scale-105\`), creating parallax depth.
- Subtle Blurs: Interactions can include smooth transitions of background blur or opacity.

## Self-Check

After generating code, verify:
1. Whitespace is generous enough
2. Colors are restrained (black/white/gray + blue accent)
3. No gradients
4. Overall feel is premium and minimalist`,

  examplePrompts: [
    {
      title: "产品展示页",
      titleEn: "Product Page",
      description: "Apple 风格产品介绍",
      descriptionEn: "Apple-style product showcase",
      prompt: `用 Apple Style 创建一个产品展示页面，要求：
1. Hero：全屏黑色背景，大标题居中，产品图片
2. 特性区：白色背景，大量留白，图文交替
3. 规格区：Apple 灰背景，简洁的参数列表
4. 购买区：价格、颜色选择、购买按钮
5. 整体：极简、高端、大量留白`,
    },
    {
      title: "服务页面",
      titleEn: "Services Page",
      description: "Apple 风格服务介绍",
      descriptionEn: "Apple-style services page",
      prompt: `用 Apple Style 设计一个服务介绍页面，要求：
1. 标题区：简洁有力的标题和副标题
2. 服务卡片：白色背景，圆角，微妙阴影
3. 定价区：清晰的价格对比
4. CTA：Apple 蓝按钮，圆角胶囊形状
5. 整体：专业、可信、简约`,
    },
  {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 Apple 风格风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Apple Style style",
      prompt: `Create a portfolio showcase page using Apple Style style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "apple-style-warm",
      name: "Apple 风格暖色版",
      nameEn: "Apple Style Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#000000",
        secondary: "#f6f6f8",
        accent: ["#4e57ff", "#1fc798", "#d05000"],
      },
    },
    {
      id: "apple-style-cool",
      name: "Apple 风格冷色版",
      nameEn: "Apple Style Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#000000",
        secondary: "#ddddde",
        accent: ["#0087a1", "#66bd2d", "#ff3184"],
      },
    },
  ],
};
