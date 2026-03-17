import { DesignStyle } from "./index";

export const bentoGrid: DesignStyle = {
  slug: "bento-grid",
  name: "便当盒布局",
  nameEn: "Bento Grid",
  description:
    "灵感源于日式便当盒的不规则网格布局，通过大小不一的卡片组合创造视觉层次，常用于作品集和产品展示。",
  descriptionEn:
    "Irregular grid layout inspired by Japanese bento boxes, creating visual hierarchy through varied card sizes. Commonly used for portfolios and product showcases.",
  cover: "/styles/bento-grid.svg",
  styleType: "layout",
  tags: ["modern", "responsive"],
  compatibleWith: ["glassmorphism", "neo-brutalist", "editorial", "neumorphism"],
  category: "modern",
  colors: {
    primary: "#18181b",
    secondary: "#fafafa",
    accent: ["#3b82f6", "#8b5cf6", "#ec4899", "#f97316"],
  },
  keywords: ["网格", "卡片", "不规则", "作品集", "现代", "modern", "contemporary", "sleek", "简洁", "bento"],

  philosophy: `Bento Grid（便当盒布局）是一种源于日式便当盒分隔设计的现代布局风格。通过不同尺寸的卡片在网格中的组合排列，创造出既有秩序又富有变化的视觉效果。

核心理念：
- 模块化：每个区块独立但相互关联
- 层次感：通过尺寸差异突出重点内容
- 留白：适当间隙让布局呼吸
- 响应式：在不同屏幕上优雅适配
- Widget 把玩感：每张卡片如独立的 iOS 小组件

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Bento Grid is a modern layout style inspired by the compartmentalized design of Japanese bento boxes. Through combining cards of different sizes within a grid, it creates visual effects that are both orderly and varied.

Core principles:
- Modularity: Each block is independent yet interconnected
- Hierarchy: Emphasize key content through size differences
- Whitespace: Appropriate gaps let the layout breathe
- Responsive: Gracefully adapt across different screen sizes
- Widget playfulness: Each card feels like an independent iOS widget`,

  doList: [
    "使用 CSS Grid 布局 grid grid-cols-4",
    "卡片跨越多行或多列 col-span-2, row-span-2",
    "保持一致的间隙 gap-4 或 gap-6",
    "使用圆角 rounded-xl 或 rounded-2xl",
    "大卡片放置主要内容，小卡片放置次要信息",
    "使用 aspect-ratio 保持卡片比例",
    "悬停时平滑上浮 + 微放大 hover:-translate-y-1 hover:scale-[1.01]",
    "悬停时阴影从紧凑变宽广（shadow-sm -> shadow-xl）",
    "卡片内图标在 group-hover 时独立变色或 scale-110",
    "使用类弹簧缓动 ease-out，duration-200 到 300",
  ],

  doListEn: [
    "Use CSS Grid layout grid grid-cols-4",
    "Cards span multiple rows or columns col-span-2, row-span-2",
    "Maintain consistent gaps gap-4 or gap-6",
    "Use rounded corners rounded-xl or rounded-2xl",
    "Place primary content in large cards, secondary info in small cards",
    "Use aspect-ratio to maintain card proportions",
    "Smooth hover lift + micro-scale hover:-translate-y-1 hover:scale-[1.01]",
    "Shadow expands from compact to wide on hover (shadow-sm -> shadow-xl)",
    "Card inner icons independently change color or scale-110 on group-hover",
    "Use spring-like easing ease-out, duration-200 to 300",
  ],

  dontList: [
    "禁止所有卡片大小相同（失去 Bento 特色）",
    "禁止间隙不一致",
    "禁止卡片过于拥挤无留白",
    "禁止忽略响应式适配",
    "禁止在卡片内堆砌过多内容",
    "禁止使用硬边阴影（shadow-[Xpx_Ypx_0px]）",
    "禁止使用直角（需要圆角）",
  ],

  dontListEn: [
    "Do not make all cards the same size (loses Bento character)",
    "Do not use inconsistent gaps",
    "Do not overcrowd cards without whitespace",
    "Do not ignore responsive adaptation",
    "Do not cram too much content inside cards",
    "Do not use hard-edge shadows (shadow-[Xpx_Ypx_0px])",
    "Do not use sharp corners (rounded corners required)",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Bento 风格按钮，微上浮 + 阴影扩散",
      code: `<button className="
  px-6 py-3
  bg-zinc-900 text-white
  rounded-xl
  font-medium
  shadow-sm
  hover:bg-zinc-800
  hover:shadow-md
  hover:-translate-y-0.5
  active:scale-95 active:translate-y-0
  transition-all duration-200
">
  Click me
</button>`,
    },
    card: {
      name: "卡片",
      description: "Bento Grid 卡片，widget 把玩感，图标联动",
      code: `<div className="
  group p-6
  bg-white
  rounded-3xl
  border border-zinc-100
  shadow-[0_2px_10px_rgba(0,0,0,0.02)]
  hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
  hover:-translate-y-1 hover:scale-[1.01]
  transition-all duration-300 ease-out
  cursor-pointer
">
  <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl mb-4 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 ease-out">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
  </div>
  <h3 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
    Lightning Fast
  </h3>
  <p className="text-zinc-500 text-sm leading-relaxed">
    Modern bento grids require snappy, widget-like micro-interactions to feel alive.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "简洁输入框，聚焦时光圈平滑过渡",
      code: `<input
  type="text"
  placeholder="Search..."
  className="
    w-full px-4 py-3
    bg-zinc-50
    border border-zinc-200
    rounded-xl
    text-zinc-900 placeholder-zinc-400
    focus:outline-none focus:ring-2 focus:ring-blue-500/20
    focus:border-blue-500
    transition-all duration-200
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "简约顶部导航",
      code: `<nav className="
  px-6 py-4
  border-b border-zinc-100
">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <a href="/" className="text-xl font-bold text-zinc-900">
      Logo
    </a>
    <div className="flex items-center gap-8">
      <a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200">
        Products
      </a>
      <a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200">
        About
      </a>
      <button className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm hover:bg-zinc-800 hover:-translate-y-0.5 transition-all duration-200">
        Get Started
      </button>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Bento Grid 布局",
      description: "完整的 Bento Grid 展示区域，含 widget 交互",
      code: `<section className="py-16 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-zinc-900 mb-8">
      Features
    </h2>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 大卡片 - 跨2列2行 */}
      <div className="group col-span-2 row-span-2 p-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl text-white hover:shadow-[0_12px_40px_rgba(59,130,246,0.3)] hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out cursor-pointer">
        <h3 className="text-2xl font-bold mb-4">Core Feature</h3>
        <p className="text-white/80">The primary showcase area for your most important content</p>
      </div>

      {/* 中卡片 */}
      <div className="group col-span-2 p-6 bg-zinc-100 rounded-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer">
        <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-200">Feature Two</h3>
        <p className="text-zinc-600 text-sm">Secondary content area</p>
      </div>

      {/* 小卡片 */}
      <div className="group p-6 bg-orange-50 rounded-2xl hover:bg-orange-100 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer flex items-center justify-center">
        <div className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform duration-300">
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 12l1.5 1.5L12 7l6.5 6.5L20 12L12 2z"/></svg>
        </div>
      </div>

      <div className="group p-6 bg-green-50 rounded-2xl hover:bg-green-100 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer flex items-center justify-center">
        <div className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform duration-300">
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z"/></svg>
        </div>
      </div>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Bento Grid 全局样式 */

/* 基础 Grid 容器 */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
}

/* 卡片尺寸变体 */
.bento-lg {
  grid-column: span 2;
  grid-row: span 2;
}

.bento-wide {
  grid-column: span 2;
}

.bento-tall {
  grid-row: span 2;
}

/* Widget 卡片悬停 */
.bento-card {
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
  cursor: pointer;
}

.bento-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.bento-card:active {
  transform: scale(0.98);
}

/* 卡片内图标联动 */
.bento-card:hover .bento-icon {
  transform: scale(1.1);
}

.bento-icon {
  transition: transform 0.3s ease-out, background-color 0.3s ease-out, color 0.3s ease-out;
}
/* Bento Grid Design Tokens */
:root {
  --bento-grid-primary: #18181b;
  --bento-grid-secondary: #fafafa;
  --bento-grid-accent: #3b82f6;
  --bento-grid-glow: rgba(24, 24, 27, 0.3);
}

@keyframes bento-grid-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bento-grid-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.bento-grid-card {
  position: relative;
  overflow: hidden;
}

.bento-grid-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(24, 24, 27, 0.05), transparent);
  pointer-events: none;
}

.bento-grid-card:hover::before {
  opacity: 1;
}

.bento-grid-gradient {
  background: linear-gradient(135deg, #18181b, #3b82f6);
}

.bento-grid-gradient-text {
  background: linear-gradient(135deg, #18181b, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.bento-grid-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(24, 24, 27, 0.08);
}

.bento-grid-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.bento-grid-animate-in {
  animation: bento-grid-fade-in 0.5s ease-out both;
}`,

  aiRules: `你是一个 Bento Grid 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 所有卡片大小相同（必须有尺寸变化）
- 忽略响应式适配
- 卡片之间间隙不一致
- 卡片内容过于拥挤
- 使用直角（需要圆角）
- 使用硬边阴影（shadow-[Xpx_Ypx_0px]）

## 必须遵守

- 使用 CSS Grid: grid grid-cols-4
- 卡片跨越: col-span-2, row-span-2
- 一致间隙: gap-4 或 gap-6
- 圆角: rounded-xl, rounded-2xl, rounded-3xl
- 响应式: md:grid-cols-2, lg:grid-cols-4

## Animation & Interaction Rules

- Widget Feel: 每个卡片如独立 iOS 小组件。悬停时平滑上浮 + 微放大（hover:-translate-y-1 hover:scale-[1.01]），配合柔和宽广阴影（hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]）。
- Micro-interactions: 卡片内图标在 group-hover 时独立响应：变色（bg swap）、放大（scale-110）。
- Snappy Easing: 使用 ease-out 配合 duration-200 到 duration-300，让交互灵敏且现代。
- Active Feedback: 按下时 active:scale-95 或 active:scale-98，模拟物理按压。
- Smooth Focus: 输入框聚焦时 ring 过渡极度平滑（transition-all duration-200）。

## 布局规则

大卡片 (col-span-2 row-span-2):
- 放置主要内容或特色功能
- 可使用渐变背景
- 建议 1-2 个

中卡片 (col-span-2 或 row-span-2):
- 次要重要内容
- 建议 2-3 个

小卡片 (1x1):
- 图标、数字、标签等简短内容
- 填充剩余空间

## 配色建议

背景:
- 渐变: bg-gradient-to-br from-blue-500 to-purple-600
- 浅色: bg-zinc-50, bg-zinc-100
- 彩色: bg-orange-50, bg-green-50, bg-blue-50

文字:
- 主要: text-zinc-900
- 次要: text-zinc-500, text-zinc-600
- 白色: text-white (在深色背景上)

## 自检

每次生成代码后检查：
1. 有大小不一的卡片
2. 使用了 CSS Grid
3. 间隙一致
4. 有响应式处理
5. 圆角统一
6. 卡片有 hover 上浮 + 微放大效果
7. 内部图标有 group-hover 联动`,

  aiRulesEn: `You are a Bento Grid design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- All cards being the same size (must have size variation)
- Ignoring responsive adaptation
- Inconsistent gaps between cards
- Overcrowded card content
- Using sharp corners (rounded corners required)
- Using hard-edge shadows (shadow-[Xpx_Ypx_0px])

## Must Follow

- Use CSS Grid: grid grid-cols-4
- Card spanning: col-span-2, row-span-2
- Consistent gaps: gap-4 or gap-6
- Rounded corners: rounded-xl, rounded-2xl, rounded-3xl
- Responsive: md:grid-cols-2, lg:grid-cols-4

## Animation & Interaction Rules

- Widget Feel: Each card feels like an independent iOS widget. Smooth hover lift + micro-scale (hover:-translate-y-1 hover:scale-[1.01]), with soft wide shadow (hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]).
- Micro-interactions: Card inner icons respond independently on group-hover: color swap (bg swap), scale up (scale-110).
- Snappy Easing: Use ease-out with duration-200 to duration-300, making interactions responsive and modern.
- Active Feedback: Press with active:scale-95 or active:scale-98, simulating physical press.
- Smooth Focus: Input focus ring transition is ultra-smooth (transition-all duration-200).

## Layout Rules

Large cards (col-span-2 row-span-2):
- Place primary content or featured functions
- Can use gradient backgrounds
- Recommend 1-2 cards

Medium cards (col-span-2 or row-span-2):
- Secondary important content
- Recommend 2-3 cards

Small cards (1x1):
- Icons, numbers, tags and other brief content
- Fill remaining space

## Color Suggestions

Backgrounds:
- Gradient: bg-gradient-to-br from-blue-500 to-purple-600
- Light: bg-zinc-50, bg-zinc-100
- Colored: bg-orange-50, bg-green-50, bg-blue-50

Text:
- Primary: text-zinc-900
- Secondary: text-zinc-500, text-zinc-600
- White: text-white (on dark backgrounds)

## Self-Check

After generating code, verify:
1. Cards have varying sizes
2. Uses CSS Grid
3. Consistent gaps
4. Has responsive handling
5. Unified rounded corners
6. Cards have hover lift + micro-scale effect
7. Inner icons have group-hover linkage`,

  examplePrompts: [
    {
      title: "功能特性展示",
      titleEn: "Feature Showcase",
      description: "产品功能的 Bento 网格布局",
      descriptionEn: "Bento grid layout for product features",
      prompt: `用 Bento Grid 风格展示产品的 6 个核心功能，要求：
1. 使用 CSS Grid 创建不规则网格布局
2. 突出功能占据 col-span-2 或 row-span-2
3. 每个卡片包含：图标、标题、简短描述
4. 卡片 hover 时 -translate-y-1 + scale-[1.01] + shadow 扩散
5. 内部图标 group-hover 时变色或 scale-110
6. 响应式：移动端单列，桌面端多列
所有卡片 rounded-2xl，统一 gap-4`,
    },
    {
      title: "个人主页",
      titleEn: "Personal Homepage",
      description: "个人信息和链接的 Bento 布局",
      descriptionEn: "Bento layout for personal info and links",
      prompt: `用 Bento Grid 风格创建一个个人主页，要求：
1. 大卡片：个人照片 + 简介
2. 社交链接：小方块卡片，各一个图标，hover 时图标 scale-110 变色
3. 技能展示：横向长条卡片
4. 最新项目：中等大小卡片，带缩略图
5. 联系方式：底部全宽卡片
网格布局参考 Apple 风格，卡片 hover 上浮 + 微放大`,
    },
    {
      title: "数据仪表盘",
      titleEn: "Data Dashboard",
      description: "数据统计卡片的网格布局",
      descriptionEn: "Grid layout for data statistics cards",
      prompt: `用 Bento Grid 风格设计一个数据仪表盘，要求：
1. 大卡片：主要图表（占 2x2），hover 时 shadow 扩散
2. 数据卡片：关键指标数字 + 趋势，数字 group-hover 时变色
3. 列表卡片：最近活动或待办事项
4. 小卡片：快捷操作按钮，active:scale-95
5. 全宽卡片：时间线或进度条
使用 CSS Grid，所有卡片 rounded-2xl + hover 微动效`,
    },
  ],

  variants: [
    {
      id: "bento-grid-warm",
      name: "便当盒布局暖色版",
      nameEn: "Bento Grid Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#19181b",
        secondary: "#fbfbfb",
        accent: ["#816cff", "#ca4cd7", "#f04e56", "#b18d00"],
      },
    },
    {
      id: "bento-grid-cool",
      name: "便当盒布局冷色版",
      nameEn: "Bento Grid Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#17181b",
        secondary: "#e1e1e1",
        accent: ["#0697c5", "#4571f1", "#c74dd1", "#ff5f5d"],
      },
    },
  ],
};
