import type { DesignStyle } from "./types";

export const materialDesign: DesignStyle = {
  slug: "material-design",
  name: "材料设计",
  nameEn: "Material Design",
  description:
    "Google 推出的设计系统，基于纸张和墨水的隐喻，强调层次、动效、大胆色彩和响应式交互，是现代移动端设计的标准。",
  descriptionEn:
    "Google's design system based on the metaphor of paper and ink, emphasizing hierarchy, motion, bold colors, and responsive interactions -- the standard for modern mobile design.",
  cover: "/styles/material-design.svg",
  styleType: "visual",
  tags: ["modern", "brand-inspired"],
  category: "modern",
  colors: {
    primary: "#6200ee",
    secondary: "#03dac6",
    accent: ["#ff0266", "#ffde03", "#00c853", "#c12700"],
  },
  keywords: ["Material", "Google", "层次", "动效", "海拔", "涟漪", "卡片", "modern", "contemporary", "sleek"],

  philosophy: `Material Design（材料设计）是 Google 在 2014 年推出的设计语言，将数字界面比作有物理属性的纸张和墨水。

核心理念：
- 材料隐喻：界面如同有厚度的纸张，可堆叠、移动
- 海拔系统：通过阴影表达层次关系
- 大胆色彩：鲜明的主色和强调色
- 有意义的动效：动画传达空间关系和反馈

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Material Design is a design language launched by Google in 2014, comparing digital interfaces to paper and ink with physical properties.

Core principles:
- Material metaphor: Interfaces are like paper with thickness, stackable and movable
- Elevation system: Expressing hierarchy through shadows
- Bold colors: Vivid primary and accent colors
- Meaningful motion: Animations convey spatial relationships and feedback`,

  doList: [
    "使用海拔阴影系统表达层次",
    "应用涟漪效果作为点击反馈",
    "使用大胆鲜明的色彩",
    "保持 8dp 的间距网格",
    "使用 Roboto 字体",
    "添加有意义的微动效",
    "精确双层海拔阴影：hover 时从 dp2 升至 dp8，shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] → shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)]（Elevation Physics）",
    "使用 Material 标准缓动曲线 ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms]（Deceleration Curve）",
    "按钮 active:scale-[0.98]（Pseudo-Ripple，手指下压的涟漪前奏）",
    "卡片 hover:-translate-y-1 配合海拔阴影升级（Z 轴物理抬升感）",
  ],

  doListEn: [
    "Use elevation shadow system to express hierarchy",
    "Apply ripple effects as click feedback",
    "Use bold vivid colors",
    "Maintain 8dp spacing grid",
    "Use Roboto font",
    "Add meaningful micro-animations",
    "Precise dual-layer elevation shadows: hover from dp2 to dp8, shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] to shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] (Elevation Physics)",
    "Use Material standard easing curve ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] (Deceleration Curve)",
    "Button active:scale-[0.98] (Pseudo-Ripple, finger press ripple prelude)",
    "Card hover:-translate-y-1 paired with elevation shadow upgrade (Z-axis physical lift feel)",
  ],

  dontList: [
    "禁止使用不一致的阴影深度",
    "禁止使用过于柔和的配色",
    "禁止省略交互反馈",
    "禁止打破 8dp 网格系统",
    "禁止按钮缺少 active:scale-[0.98]（Material Pseudo-Ripple 是触感真实性的核心）",
    "禁止使用非 Material 标准缓动曲线（必须使用 cubic-bezier(0.4,0,0.2,1)）",
    "禁止卡片 hover 时阴影不变深（海拔变化是 Material 物理规则，不可省略）",
  ],

  dontListEn: [
    "Do NOT use inconsistent shadow depths",
    "Do NOT use overly soft color schemes",
    "Do NOT omit interaction feedback",
    "Do NOT break the 8dp grid system",
    "Do NOT omit active:scale-[0.98] on buttons (Material Pseudo-Ripple is core to tactile authenticity)",
    "Do NOT use non-Material standard easing curves (must use cubic-bezier(0.4,0,0.2,1))",
    "Do NOT keep card shadows unchanged on hover (elevation change is a Material physics rule, cannot be omitted)",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Material 风格按钮，强调海拔反馈与下压触感",
      code: `<button className="
  relative px-6 py-2.5
  bg-[#6200ee] text-white font-medium uppercase tracking-[0.08em] text-sm
  rounded
  shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),0_2px_2px_0_rgba(0,0,0,0.14),0_1px_5px_0_rgba(0,0,0,0.12)]
  hover:shadow-[0_2px_4px_-1px_rgba(0,0,0,0.2),0_4px_5px_0_rgba(0,0,0,0.14),0_1px_10px_0_rgba(0,0,0,0.12)]
  hover:bg-[#7528e5]
  active:shadow-[0_5px_5px_-3px_rgba(0,0,0,0.2),0_8px_10px_1px_rgba(0,0,0,0.14),0_3px_14px_2px_rgba(0,0,0,0.12)]
  active:scale-[0.98]
  transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]
  overflow-hidden
">
  <span className="relative z-10">Submit</span>
</button>`,
    },
    card: {
      name: "卡片",
      description: "Material 风格卡片，遵循 Elevation Physics 抬升规则",
      code: `<div className="
  bg-white rounded-xl
  shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]
  hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)]
  hover:-translate-y-1
  transition-all duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)]
  overflow-hidden cursor-pointer
">
  <div className="h-48 bg-gradient-to-br from-[#6200ee] to-[#b388ff]" />
  <div className="p-4">
    <h3 className="text-xl font-medium text-black/85 mb-2 leading-tight">
      Material Surface
    </h3>
    <p className="text-black/60 text-sm leading-relaxed">
      Elements express their material nature through elevation and shadow.
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Material 风格输入框，带浮动标签与标准曲线聚焦反馈",
      code: `<div className="relative pt-5">
  <input
    type="text"
    placeholder=" "
    className="
      peer w-full px-4 py-3
      bg-gray-50
      border-b-2 border-gray-400
      rounded-t-md
      text-black/85
      focus:outline-none
      focus:border-[#6200ee]
      focus:bg-gray-100
      transition-colors duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]
    "
  />
  <label className="
    absolute left-4 top-8
    text-black/60 text-base
    transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]
    pointer-events-none
    peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#6200ee]
    peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs
  ">
    Email Address
  </label>
</div>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Material 风格 Hero",
      code: `<section className="
  min-h-screen
  bg-[#fafafa]
  relative
">
  {/* App Bar */}
  <nav className="fixed top-0 left-0 right-0 h-16 bg-[#6200ee] shadow-[0_2px_4px_-1px_rgba(0,0,0,0.2),0_4px_5px_0_rgba(0,0,0,0.14),0_1px_10px_0_rgba(0,0,0,0.12)] flex items-center px-6 z-50">
    <h1 className="text-white font-medium text-xl">Material Design</h1>
  </nav>

  <div className="pt-24 px-6 max-w-4xl mx-auto">
    <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] overflow-hidden">
      <div className="h-64 bg-gradient-to-br from-[#6200ee] via-[#7c4dff] to-[#b388ff] flex items-center justify-center">
        <h2 className="text-5xl font-bold text-white">Welcome</h2>
      </div>
      <div className="p-8">
        <p className="text-xl text-gray-700 mb-6">
          Build beautiful, usable products faster with Material Design.
        </p>
        <button className="px-6 py-3 bg-[#03dac6] text-black font-medium rounded-full shadow-md hover:shadow-lg transition-all">
          Get Started
        </button>
      </div>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Material Design 全局样式 */

:root {
  --md-primary: #6200ee;
  --md-primary-variant: #3700b3;
  --md-secondary: #03dac6;
  --md-secondary-variant: #018786;
  --md-background: #fafafa;
  --md-surface: #ffffff;
  --md-error: #b00020;
}

/* 海拔阴影系统 */
.md-elevation-1 {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.md-elevation-2 {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.md-elevation-3 {
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

.md-elevation-4 {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

/* 涟漪效果基础 */
.md-ripple {
  position: relative;
  overflow: hidden;
}

/* 浮动标签输入框 */
.md-text-field {
  background: #f5f5f5;
  border-radius: 4px 4px 0 0;
  border-bottom: 2px solid #9e9e9e;
}

.md-text-field:focus {
  border-bottom-color: var(--md-primary);
}
@keyframes material-design-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes material-design-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.material-design-card {
  position: relative;
  overflow: hidden;
}

.material-design-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(98, 0, 238, 0.05), transparent);
  pointer-events: none;
}

.material-design-card:hover::before {
  opacity: 1;
}

.material-design-gradient {
  background: linear-gradient(135deg, #6200ee, #ff0266);
}

.material-design-gradient-text {
  background: linear-gradient(135deg, #6200ee, #ff0266);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.material-design-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(98, 0, 238, 0.08);
}

.material-design-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.material-design-animate-in {
  animation: material-design-fade-in 0.5s ease-out both;
}`,

  aiRules: `你是一个 Material Design 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用不一致的阴影深度
- 使用过于柔和暗淡的配色
- 省略交互反馈效果
- 打破 8dp 网格系统

## 必须遵守

- 海拔阴影 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]
- 主色调 bg-[#6200ee] text-white
- 强调色 bg-[#03dac6]
- 圆角卡片 rounded-xl
- 大写按钮文字 uppercase tracking-wider

## 配色

- 主色: #6200ee (紫色)
- 主色变体: #3700b3
- 次要色: #03dac6 (青色)
- 背景: #fafafa
- 表面: #ffffff
- 错误: #b00020

## 间距

- 基于 8dp 网格
- p-2 (8px), p-4 (16px), p-6 (24px), p-8 (32px)

## Animation & Interaction Rules

- Elevation Physics: hover 时从低海拔阴影抬升到高海拔阴影，可配合轻微 -translate-y-1 强化 Z 轴感。
- Pseudo-Ripple: active 状态至少包含 active:scale-[0.98] 或明暗下压反馈，模拟触控涟漪前奏。
- Deceleration Curve: 交互过渡优先使用 ease-[cubic-bezier(0.4,0,0.2,1)]，时长 200-300ms。
- Input Float: 输入框聚焦时标签必须平滑上浮并缩小，边框高亮同步过渡。`,

  aiRulesEn: `You are a Material Design frontend development expert. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Using inconsistent shadow depths
- Using overly soft muted color schemes
- Omitting interaction feedback effects
- Breaking the 8dp grid system

## Must Follow

- Elevation shadows shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]
- Primary color bg-[#6200ee] text-white
- Accent color bg-[#03dac6]
- Rounded cards rounded-xl
- Uppercase button text uppercase tracking-wider

## Color Palette

- Primary: #6200ee (purple)
- Primary variant: #3700b3
- Secondary: #03dac6 (cyan)
- Background: #fafafa
- Surface: #ffffff
- Error: #b00020

## Spacing

- Based on 8dp grid
- p-2 (8px), p-4 (16px), p-6 (24px), p-8 (32px)

## Animation & Interaction Rules

- Elevation Physics: Hover lifts from low to high elevation shadow, optionally paired with slight -translate-y-1 to enhance Z-axis feel.
- Pseudo-Ripple: Active state must include at least active:scale-[0.98] or brightness press feedback, simulating touch ripple prelude.
- Deceleration Curve: Interaction transitions prefer ease-[cubic-bezier(0.4,0,0.2,1)], duration 200-300ms.
- Input Float: On input focus, label must smoothly float up and shrink, with border highlight transitioning in sync.`,

  examplePrompts: [
    {
      title: "任务管理应用",
      titleEn: "Task Management App",
      description: "Material 风格的任务管理界面",
      descriptionEn: "Material style task management interface",
      prompt: `用 Material Design 创建一个任务管理应用界面，要求：
1. 顶部应用栏带阴影
2. 浮动操作按钮 (FAB)
3. 卡片列表展示任务
4. 使用海拔阴影系统
5. 紫色主色调，青色强调`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 材料设计风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Material Design style",
      prompt: `Create a SaaS landing page using Material Design style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 材料设计风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Material Design style",
      prompt: `Create a portfolio showcase page using Material Design style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "material-design-warm",
      name: "材料设计暖色版",
      nameEn: "Material Design Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#be00b5",
        secondary: "#1cdecc",
        accent: ["#f90e01", "#90fe0a", "#00c3a6"],
      },
    },
    {
      id: "material-design-cool",
      name: "材料设计冷色版",
      nameEn: "Material Design Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#0020f1",
        secondary: "#03c4b2",
        accent: ["#d206c1", "#ffbb34", "#35bf11"],
      },
    },
  ],
};
