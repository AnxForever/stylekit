import type { DesignStyle } from "./types";
import { swissStyleAtoms } from "./atoms/swiss-style";

export const swissStyle: DesignStyle = {
  atoms: swissStyleAtoms,
  slug: "swiss-style",
  name: "瑞士国际风格",
  nameEn: "Swiss International",
  description:
    "源于瑞士的理性主义设计风格，强调网格系统、无衬线字体、清晰层次和客观信息传达，是现代平面设计的基石。",
  descriptionEn:
    "A rationalist design style originating from Switzerland, emphasizing grid systems, sans-serif typography, clear hierarchy, and objective information delivery -- a cornerstone of modern graphic design.",
  cover: "/styles/swiss-style.svg",
  styleType: "visual",
  tags: ["modern", "minimal"],
  category: "modern",
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: ["#ff0000", "#0057b8", "#ffcc00", "#6c3b00"],
  },
  keywords: ["瑞士", "国际主义", "网格", "Helvetica", "理性", "排版", "极简", "modern", "contemporary", "sleek"],

  philosophy: `Swiss International Style（瑞士国际风格）是20世纪50年代在瑞士发展起来的设计运动，强调清晰、客观、理性的视觉传达。

核心理念：
- 网格系统：严格的数学网格控制布局
- 无衬线字体：Helvetica 等清晰易读的字体
- 负空间：大量留白增强可读性
- 客观传达：设计服务于信息，而非装饰

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Swiss International Style is a design movement developed in Switzerland in the 1950s, emphasizing clear, objective, and rational visual communication.

Core principles:
- Grid system: Strict mathematical grids controlling layout
- Sans-serif typography: Clear and readable fonts like Helvetica
- Negative space: Generous whitespace enhancing readability
- Objective communication: Design serves information, not decoration`,

  doList: [
    "使用严格的网格系统",
    "选用 Helvetica 或类似的无衬线字体",
    "保持大量负空间",
    "使用黑白为主的配色",
    "文字左对齐，避免居中",
    "使用简洁的几何图形",
    "Rational Restraint: only color and border-color change on interaction — zero translate, scale, or shadow added. The grid must not be disturbed",
    "Guide Line Extension: left border changes from gray to red `hover:border-[#ff0000]` and background shifts to `hover:bg-[#f0f0f0]` — the structure becomes activated, not decorated",
    "Hierarchy Focus: category label turns red `group-hover:text-[#ff0000]` on hover — the taxonomic label is highlighted, reinforcing information hierarchy",
    "Clean Cut Transitions: use `duration-150 ease-out` — Swiss style is precise and efficient, not slow nor instantaneous",
  ],

  doListEn: [
    "Use strict grid systems",
    "Choose Helvetica or similar sans-serif fonts",
    "Maintain generous negative space",
    "Use black and white as primary colors",
    "Left-align text, avoid centering",
    "Use clean geometric shapes",
    "Rational Restraint: only color and border-color change on interaction -- zero translate, scale, or shadow added. The grid must not be disturbed",
    "Guide Line Extension: left border changes from gray to red `hover:border-[#ff0000]` and background shifts to `hover:bg-[#f0f0f0]` -- the structure becomes activated, not decorated",
    "Hierarchy Focus: category label turns red `group-hover:text-[#ff0000]` on hover -- the taxonomic label is highlighted, reinforcing information hierarchy",
    "Clean Cut Transitions: use `duration-150 ease-out` -- Swiss style is precise and efficient, not slow nor instantaneous",
  ],

  dontList: [
    "禁止使用装饰性元素",
    "禁止使用衬线字体作为正文",
    "禁止过度装饰或渐变",
    "禁止打破网格系统",
    "禁止使用任何 `translate`、`scale` 或 `shadow` 变化（Rational Restraint — 网格不可被扰动）",
    "禁止 hover 时引入新颜色以外的装饰（只允许颜色和边框色变化，不添加阴影或变形）",
    "禁止使用 `duration-300` 或更长（Swiss Style 精准高效，`duration-150 ease-out` 是上限）",
    "禁止按钮不带箭头图标（Swiss Style 按钮必须包含方向性，`→` 是排版的一部分）",
  ],

  dontListEn: [
    "Do NOT use decorative elements",
    "Do NOT use serif fonts for body text",
    "Do NOT over-decorate or use gradients",
    "Do NOT break the grid system",
    "Do NOT use any `translate`, `scale`, or `shadow` changes (Rational Restraint -- the grid must not be disturbed)",
    "Do NOT introduce decorations beyond color changes on hover (only color and border-color changes allowed, no shadows or transforms)",
    "Do NOT use `duration-300` or longer (Swiss Style is precise and efficient, `duration-150 ease-out` is the upper limit)",
    "Do NOT omit arrow icons on buttons (Swiss Style buttons must include directionality, `->` is part of the typography)",
  ],

  components: {
    button: {
      name: "按钮",
      description: "瑞士风格按钮，Guide Line 文字变红 + 箭头图标 `group-hover:translate-x-2 duration-150` + Rational Restraint 零 scale/shadow",
      code: `<button className="
  group
  flex items-center gap-3
  px-6 py-3
  bg-black
  text-white text-sm font-medium uppercase tracking-[0.2em]
  hover:bg-[#ff0000]
  transition-colors duration-150 ease-out
">
  Action
  <svg className="w-4 h-4 transition-transform duration-150 ease-out group-hover:translate-x-2" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 8h10M9 4l4 4-4 4"/>
  </svg>
</button>`,
    },
    card: {
      name: "卡片",
      description: "瑞士风格卡片，Guide Line Extension 左边框灰→红 + Hierarchy Focus 类别标签变红 + `duration-150 ease-out` + 零 translate/scale",
      code: `<div className="group p-8 bg-white border-l-[4px] border-[#cccccc] hover:border-[#ff0000] hover:bg-[#f0f0f0] transition-all duration-150 ease-out cursor-pointer">
  <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 group-hover:text-[#ff0000] transition-colors duration-150 ease-out mb-2">
    Category
  </p>
  <h3 className="text-2xl font-bold text-black mb-4">
    Helvetica Neue
  </h3>
  <p className="text-gray-700 leading-relaxed">
    Clean, objective, rational design principles.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "瑞士风格输入框",
      code: `<div>
  <label className="block text-xs font-medium uppercase tracking-[0.2em] text-gray-500 mb-2">
    Email
  </label>
  <input
    type="text"
    placeholder="your@email.com"
    className="
      w-full px-0 py-2
      bg-transparent
      border-0 border-b-2 border-black
      text-black
      focus:outline-none focus:border-red-600
      transition-colors
    "
  />
</div>`,
    },
    hero: {
      name: "Hero 区块",
      description: "瑞士风格 Hero",
      code: `<section className="
  min-h-screen
  bg-white
  px-8 py-20
  grid grid-cols-12 gap-8
">
  <div className="col-span-8">
    <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4">
      International Style
    </p>
    <h1 className="text-7xl md:text-9xl font-bold text-black leading-none mb-8">
      Swiss
      <br />
      Design
    </h1>
    <p className="text-xl text-gray-700 max-w-md leading-relaxed mb-8">
      The grid is the foundation. Typography is the voice. Clarity is the goal.
    </p>
    <button className="px-8 py-4 bg-black text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-red-600 transition-colors">
      Explore
    </button>
  </div>
  <div className="col-span-4 flex items-center justify-center">
    <div className="w-32 h-32 bg-red-600" />
  </div>
</section>`,
    },
  },

  globalCss: `/* Swiss International Style 全局样式 */

:root {
  --swiss-black: #000000;
  --swiss-white: #ffffff;
  --swiss-red: #ff0000;
  --swiss-blue: #0057b8;
}

/* 网格系统 */
.swiss-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

/* 标题样式 */
.swiss-heading {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 0.9;
}

/* 标签样式 */
.swiss-label {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #6b7280;
}

/* 左边框强调 */
.swiss-accent {
  border-left: 4px solid var(--swiss-black);
  padding-left: 1.5rem;
}
@keyframes swiss-style-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes swiss-style-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.swiss-style-card {
  position: relative;
  overflow: hidden;
}

.swiss-style-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.05), transparent);
  pointer-events: none;
}

.swiss-style-card:hover::before {
  opacity: 1;
}

.swiss-style-gradient {
  background: linear-gradient(135deg, #000000, #ff0000);
}

.swiss-style-gradient-text {
  background: linear-gradient(135deg, #000000, #ff0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.swiss-style-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(0, 0, 0, 0.08);
}

.swiss-style-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.swiss-style-animate-in {
  animation: swiss-style-fade-in 0.5s ease-out both;
}`,

  aiRules: `你是一个 Swiss International Style 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用装饰性元素
- 使用衬线字体
- 过度装饰或渐变效果
- 打破网格系统

## 必须遵守

- 12列网格系统 grid-cols-12
- 无衬线字体 font-sans
- 大量留白 p-8, gap-8
- 黑白为主 bg-black, text-white, bg-white, text-black
- 红色强调 bg-red-600, text-red-600
- 大写标签 uppercase tracking-[0.2em]
- 左对齐文本

## 配色

仅使用：
- 黑色: #000000
- 白色: #ffffff
- 红色: #ff0000 (强调色)
- 蓝色: #0057b8 (可选强调)

## 排版

- 标题：超大字号、粗体、紧凑行高
- 标签：小号、大写、宽字距
- 正文：适中字号、充足行高

## Animation & Interaction Rules

- Rational Restraint: Only color and border-color change on hover — zero \`translate\`, \`scale\`, or new \`shadow\`. The grid is a rational system; its geometry must not be disturbed by interaction. Forbidden: \`hover:-translate-y-*\`, \`hover:scale-*\`, \`hover:shadow-*\`.
- Guide Line Extension: The left border activates from \`border-[#cccccc]\` to \`hover:border-[#ff0000]\` and background shifts to \`hover:bg-[#f0f0f0]\` — the structural grid line becomes a red typographic accent, making the module feel "selected" on the layout.
- Hierarchy Focus: The category/label element turns \`group-hover:text-[#ff0000] transition-colors duration-150 ease-out\` — the taxonomic hierarchy is highlighted, reinforcing Swiss style's belief that information structure is the highest design value.
- Clean Cut Transitions: Use \`duration-150 ease-out\` for color changes. Button arrow icon uses \`group-hover:translate-x-2 transition-transform duration-150 ease-out\` — the arrow is the only permitted movement, indicating directionality as a typographic element.`,

  aiRulesEn: `You are a Swiss International Style design frontend development expert. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Using decorative elements
- Using serif fonts
- Over-decorating or gradient effects
- Breaking the grid system

## Must Follow

- 12-column grid system grid-cols-12
- Sans-serif fonts font-sans
- Generous whitespace p-8, gap-8
- Black and white primary bg-black, text-white, bg-white, text-black
- Red accent bg-red-600, text-red-600
- Uppercase labels uppercase tracking-[0.2em]
- Left-aligned text

## Color Palette

Only use:
- Black: #000000
- White: #ffffff
- Red: #ff0000 (accent)
- Blue: #0057b8 (optional accent)

## Typography

- Headings: Extra-large size, bold, tight line height
- Labels: Small, uppercase, wide letter spacing
- Body: Moderate size, generous line height

## Animation & Interaction Rules

- Rational Restraint: Only color and border-color change on hover -- zero \`translate\`, \`scale\`, or new \`shadow\`. The grid is a rational system; its geometry must not be disturbed by interaction. Forbidden: \`hover:-translate-y-*\`, \`hover:scale-*\`, \`hover:shadow-*\`.
- Guide Line Extension: The left border activates from \`border-[#cccccc]\` to \`hover:border-[#ff0000]\` and background shifts to \`hover:bg-[#f0f0f0]\` -- the structural grid line becomes a red typographic accent, making the module feel "selected" on the layout.
- Hierarchy Focus: The category/label element turns \`group-hover:text-[#ff0000] transition-colors duration-150 ease-out\` -- the taxonomic hierarchy is highlighted, reinforcing Swiss style's belief that information structure is the highest design value.
- Clean Cut Transitions: Use \`duration-150 ease-out\` for color changes. Button arrow icon uses \`group-hover:translate-x-2 transition-transform duration-150 ease-out\` -- the arrow is the only permitted movement, indicating directionality as a typographic element.`,

  examplePrompts: [
    {
      title: "设计工作室官网",
      titleEn: "Design Studio Website",
      description: "极简理性的设计工作室网站",
      descriptionEn: "Minimal rational design studio website",
      prompt: `用 Swiss International Style 创建一个设计工作室官网，要求：
1. 布局：严格的12列网格
2. 字体：无衬线字体，大标题
3. 配色：黑白为主，红色点缀
4. 大量留白
5. 简洁的几何装饰`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 瑞士国际风格风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Swiss International style",
      prompt: `Create a SaaS landing page using Swiss International style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 瑞士国际风格风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Swiss International style",
      prompt: `Create a portfolio showcase page using Swiss International style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "swiss-style-warm",
      name: "瑞士国际风格暖色版",
      nameEn: "Swiss International Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        accent: ["#c91a00", "#4042cf", "#94ec00"],
      },
    },
    {
      id: "swiss-style-cool",
      name: "瑞士国际风格冷色版",
      nameEn: "Swiss International Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#000000",
        secondary: "#e6e6e6",
        accent: ["#ff006c", "#006984", "#ffab36"],
      },
    },
  ],
};
