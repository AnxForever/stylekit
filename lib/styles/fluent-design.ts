import type { DesignStyle } from "./types";

export const fluentDesign: DesignStyle = {
  slug: "fluent-design",
  name: "流利设计",
  nameEn: "Fluent Design",
  description:
    "微软推出的设计系统，融合了光效、深度、动效、材质和缩放五大元素，打造自然直观的跨平台体验。",
  descriptionEn:
    "Microsoft's design system integrating five key elements -- light, depth, motion, material, and scale -- to create natural and intuitive cross-platform experiences.",
  cover: "/styles/fluent-design.svg",
  styleType: "visual",
  tags: ["brand-inspired"],
  category: "modern",
  colors: {
    primary: "#0078d4",
    secondary: "#106ebe",
    accent: ["#ffb900", "#e81123", "#00cc6a", "#3bf022"],
  },
  keywords: ["Fluent", "微软", "亚克力", "Reveal", "光效", "深度", "动效", "modern", "contemporary", "sleek"],
  keywordsEn: ["Fluent Design", "Microsoft Fluent", "acrylic material", "reveal highlight", "Windows 11 ui", "backdrop blur", "depth and light", "fluent ui", "motion design", "desktop app ui"],

  philosophy: `Fluent Design System（流利设计系统）是微软于 2017 年推出的设计语言，旨在创造跨设备的一致体验。

核心五元素：
- Light（光）：通过光效指示焦点和交互
- Depth（深度）：创造层次感和空间感
- Motion（动效）：自然流畅的过渡动画
- Material（材质）：亚克力等半透明材质
- Scale（缩放）：适应不同尺寸的设备

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Fluent Design System is a design language launched by Microsoft in 2017, aimed at creating consistent experiences across devices.

Core five elements:
- Light: Using light effects to indicate focus and interaction
- Depth: Creating hierarchy and spatial awareness
- Motion: Natural and fluid transition animations
- Material: Semi-transparent materials like acrylic
- Scale: Adapting to devices of different sizes`,

  doList: [
    "使用亚克力（Acrylic）半透明效果 bg-white/70 backdrop-blur-xl",
    "添加 Reveal 高亮边框效果（hover 时 border-white/60）",
    "使用微软标志性蓝色 bg-[#0078d4]",
    "保持简洁现代的布局",
    "使用 Z 轴深度：hover:-translate-y-0.5 搭配阴影层级提升",
    "使用 Segoe UI 字体风格",
    "按钮 active:scale-[0.97] 触觉按压确认",
    "所有可交互元素 focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2",
    "卡片 hover:-translate-y-1 + 阴影扩张（亚克力材质浮起）",
    "图标容器 hover 时蓝色填充 + group-hover:scale-105 微交互",
  ],

  doListEn: [
    "Use acrylic (Acrylic) semi-transparent effect bg-white/70 backdrop-blur-xl",
    "Add Reveal highlight border effect (hover border-white/60)",
    "Use Microsoft's signature blue bg-[#0078d4]",
    "Maintain clean modern layouts",
    "Use Z-axis depth: hover:-translate-y-0.5 paired with shadow level elevation",
    "Use Segoe UI font style",
    "Button active:scale-[0.97] tactile press confirmation",
    "All interactive elements focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2",
    "Card hover:-translate-y-1 + shadow expansion (acrylic material floating)",
    "Icon container hover with blue fill + group-hover:scale-105 micro-interaction",
  ],

  dontList: [
    "禁止过度使用亚克力效果",
    "禁止使用不协调的配色",
    "禁止忽略焦点状态",
    "禁止使用过重的阴影（Fluent 阴影是柔和分层的）",
    "禁止按钮缺少 active:scale-[0.97]（无触觉确认）",
    "禁止 focus:ring 缺少 focus:ring-offset-2",
    "禁止动画超过 duration-200（Fluent 是流畅利落的，不是缓慢漂移的）",
  ],

  dontListEn: [
    "Do NOT overuse acrylic effects",
    "Do NOT use clashing color schemes",
    "Do NOT ignore focus states",
    "Do NOT use heavy shadows (Fluent shadows are soft and layered)",
    "Do NOT omit active:scale-[0.97] on buttons (no tactile confirmation)",
    "Do NOT omit focus:ring-offset-2 from focus:ring",
    "Do NOT exceed duration-200 for animations (Fluent is fluid and crisp, not slow and drifting)",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Fluent 三态按钮：hover:-translate-y-0.5 Z 轴浮起，active:scale-[0.97] Windows 式按压，focus:ring-offset-2 WCAG 焦点环",
      code: `{/* Primary Button */}
<button className="
  px-6 py-2.5
  bg-[#0078d4] text-white font-medium
  rounded-sm
  border border-[#0078d4]
  shadow-[0_2px_4px_rgba(0,120,212,0.3)]
  hover:bg-[#106ebe] hover:-translate-y-0.5
  hover:shadow-[0_4px_8px_rgba(0,120,212,0.4)]
  focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2
  active:scale-[0.97] active:bg-[#005a9e] active:translate-y-0 active:shadow-none
  transition-all duration-150 ease-out
">
  Primary Button
</button>

{/* Secondary Button */}
<button className="
  px-6 py-2.5
  bg-white/70 backdrop-blur-sm text-gray-800 font-medium
  rounded-sm
  border border-gray-200
  shadow-[0_1px_3px_rgba(0,0,0,0.06)]
  hover:bg-white/90 hover:border-gray-300 hover:-translate-y-0.5
  hover:shadow-[0_3px_6px_rgba(0,0,0,0.1)]
  focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2
  active:scale-[0.97] active:bg-white/60 active:translate-y-0 active:shadow-none
  transition-all duration-150 ease-out
">
  Secondary
</button>

{/* Ghost Button */}
<button className="
  px-6 py-2.5
  text-[#0078d4] font-medium
  rounded-sm
  hover:bg-[#0078d4]/10 hover:-translate-y-0.5
  focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2
  active:scale-[0.97] active:bg-[#0078d4]/20 active:translate-y-0
  transition-all duration-150 ease-out
">
  Cancel
</button>`,
    },
    card: {
      name: "卡片",
      description: "Fluent 亚克力卡片：hover 时 Z 轴浮起（-translate-y-1）+ 双层阴影扩张，图标容器 group-hover:scale-105 微交互",
      code: `<div className="
  group
  p-6
  bg-white/70 backdrop-blur-xl
  rounded-lg
  border border-white/30
  shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]
  hover:bg-white/85 hover:border-white/50 hover:-translate-y-1
  hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.14)]
  transition-all duration-200 ease-out
">
  <div className="flex items-center gap-4 mb-4">
    {/* Icon container — scale on group-hover */}
    <div className="
      w-12 h-12
      bg-[#0078d4] rounded-lg
      flex items-center justify-center
      group-hover:scale-105
      transition-transform duration-200 ease-out
    ">
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900">Fluent Card</h3>
      <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-200">Acrylic material</p>
    </div>
  </div>
  <p className="text-gray-700 leading-relaxed">
    Light, depth, motion, material, and scale working together seamlessly.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Fluent 风格输入框：聚焦时蓝色边框 + ring-offset-2",
      code: `<input
  type="text"
  placeholder="Enter text..."
  className="
    w-full px-3 py-2
    bg-white
    border border-gray-300
    rounded-sm
    text-gray-900 placeholder-gray-400
    hover:border-gray-400
    focus:outline-none focus:border-[#0078d4] focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2
    transition-all duration-150
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Fluent 风格 Hero：蓝色渐变背景 + 亚克力面板 + 完整三态按钮",
      code: `<section className="
  min-h-screen
  bg-gradient-to-br from-[#0078d4] via-[#106ebe] to-[#005a9e]
  relative overflow-hidden
">
  {/* Acrylic overlay shapes */}
  <div className="absolute top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

  <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
    <div className="text-center max-w-3xl">
      <h1 className="text-5xl md:text-7xl font-semibold text-white mb-6">
        Fluent Design
      </h1>
      <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
        Create intuitive, harmonious experiences with light, depth, motion, material, and scale.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button className="
          px-8 py-3
          bg-white text-[#0078d4] font-semibold
          rounded-sm
          shadow-[0_2px_6px_rgba(0,0,0,0.2)]
          hover:bg-white/95 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)]
          focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0078d4]
          active:scale-[0.97] active:translate-y-0
          transition-all duration-150 ease-out
        ">
          Get Started
        </button>
        <button className="
          px-8 py-3
          bg-white/10 text-white font-semibold
          rounded-sm border border-white/30 backdrop-blur-sm
          hover:bg-white/20 hover:-translate-y-0.5
          focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0078d4]
          active:scale-[0.97] active:bg-white/15 active:translate-y-0
          transition-all duration-150 ease-out
        ">
          Learn More
        </button>
      </div>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Fluent Design 全局样式 */

:root {
  --fluent-blue: #0078d4;
  --fluent-blue-dark: #106ebe;
  --fluent-blue-darker: #005a9e;
  --fluent-yellow: #ffb900;
  --fluent-red: #e81123;
  --fluent-green: #00cc6a;
}

/* 亚克力效果 */
.fluent-acrylic {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.fluent-acrylic-dark {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Reveal 边框效果（简化版） */
.fluent-reveal {
  position: relative;
  overflow: hidden;
}

.fluent-reveal::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

/* 柔和阴影 */
.fluent-shadow {
  box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.08);
}

.fluent-shadow-hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.06), 0 16px 32px rgba(0,0,0,0.12);
}

.fluent-design-hover-lift { transition: transform 0.3s ease; }

.fluent-design-hover-lift:hover { transform: translateY(-2px); }

.fluent-design-focus { outline: 2px solid var(--fluent-design-primary, currentColor); outline-offset: 2px; }

/* Additional techniques */
@keyframes fluent-design-shimmer { from { background-position: -200% 0; } to { background-position: 200% 0; } }

.fluent-design-slant { clip-path: polygon(0 0, 100% 0, 100% calc(100% - 3rem), 0 100%); }`,

  aiRules: `你是一位精通 Fluent Design System（流利设计系统）的前端开发专家。生成的所有代码都必须严格遵守微软的 Fluent Design 设计原则。

## 绝对禁止

- 按钮缺少 active:scale-[0.97]（没有触觉按压确认）
- focus:ring 缺少 focus:ring-offset-2（光环会与背景融合，不符合 WCAG）
- 动画时长超过 200ms（Fluent 追求流畅利落，而非缓慢）
- 使用无分层的扁平阴影（Fluent 的阴影必须是多层的）
- 卡片缺少 hover 时的 Z 轴上浮（hover:-translate-y-1）
- 亚克力效果堆砌过度（应有选择地使用）
- 使用生硬的实色边框（玻璃材质上的边框应为 white/20 到 white/50）

## 必须遵守

- 微软蓝：所有主要操作使用 bg-[#0078d4]
- 亚克力：卡片与面板使用 bg-white/70 backdrop-blur-xl
- 圆角：按钮用 rounded-sm，卡片用 rounded-lg
- 阴影分层：静止态使用 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]
- 焦点环：所有可聚焦元素都使用 focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2
- 所有按钮：hover:-translate-y-0.5、active:scale-[0.97]、active:translate-y-0

## 动效与交互规则

- 亚克力深度上浮：卡片 hover 时使用 hover:-translate-y-1，并伴随阴影扩张（阴影加倍）。过渡为 transition-all duration-200 ease-out。这模拟了卡片在 Z 轴上升起的效果——正是 Fluent「深度」原则的核心体现。
- Reveal 高光：hover 时卡片背景变亮（从 bg-white/70 到 bg-white/85），边框也随之变亮（从 border-white/30 到 border-white/50）。这模拟了 Fluent 的 Reveal 光效——仿佛有光源在追踪光标。
- 图标缩放：图标容器使用 group 类。group-hover 时以 group-hover:scale-105 放大，过渡为 transition-transform duration-200 ease-out。
- 按钮浮起与按压：按钮 hover 时以 hover:-translate-y-0.5 上浮，阴影随之增强；active:scale-[0.97] active:translate-y-0 active:shadow-none 时则被压回表面。两者结合营造出真实的实体按钮手感。
- 按压比例的精确取值：Fluent 使用 active:scale-[0.97]（而非 0.98）——比 corporate-clean 的按压幅度更明显一些，以贴合 Windows 按钮的物理手感。
- 干脆利落的缓动：按钮与控件使用 duration-150 ease-out，卡片使用 duration-200 ease-out，任何情况下都不超过 200ms。

## 配色方案

- 主蓝色：#0078d4（按钮、链接、焦点环）
- 深蓝色：#106ebe（hover 状态）
- 更深蓝色：#005a9e（active 状态）
- 强调黄：#ffb900
- 强调红：#e81123
- 强调绿：#00cc6a
- 文字：标题用 gray-900，正文用 gray-700，次要文字用 gray-500

## 自检清单

生成代码后请核实：
1. 所有按钮是否都有 active:scale-[0.97] active:translate-y-0
2. 所有可聚焦元素是否都有 focus:ring-2 focus:ring-offset-2
3. 卡片是否具备 hover:-translate-y-1 加阴影扩张
4. 卡片是否使用了 group 类；图标容器是否具备 group-hover:scale-105
5. 是否没有超过 200ms 的动画时长
6. 亚克力效果是否有选择地使用，而非滥用于所有元素`,

  aiRulesEn: `You are a Fluent Design System frontend development expert. All generated code must strictly follow Microsoft's Fluent Design principles.

## Absolutely Forbidden

- Buttons without active:scale-[0.97] (no tactile press confirmation)
- focus:ring without focus:ring-offset-2 (ring merges with background, fails WCAG)
- Animation duration above 200ms (Fluent is fluid, not slow)
- Flat shadows without layering (Fluent shadows are always multi-layer)
- Cards without hover Z-axis lift (hover:-translate-y-1)
- Overcrowded acrylic effects (use selectively)
- Harsh solid borders (borders should be white/20 to white/50 on glass)

## Must Follow

- Microsoft Blue: bg-[#0078d4] for all primary actions
- Acrylic: bg-white/70 backdrop-blur-xl for cards and panels
- Rounded: rounded-sm for buttons, rounded-lg for cards
- Shadow layering: shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] at rest
- Focus ring: focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 on ALL focusable elements
- All buttons: hover:-translate-y-0.5, active:scale-[0.97], active:translate-y-0

## Animation & Interaction Rules

- Acrylic Depth Lift: Cards hover with hover:-translate-y-1 plus shadow expansion (shadow doubles). The transition is transition-all duration-200 ease-out. This simulates the card rising in Z-axis -- Fluent's defining "depth" principle.
- Reveal Brightening: On hover, card background brightens (bg-white/70 to bg-white/85) and border brightens (border-white/30 to border-white/50). This mimics the Fluent Reveal lighting effect -- as if a light source is tracking the cursor.
- Icon Scale: Icon containers use group class. On group-hover, they scale up with group-hover:scale-105 using transition-transform duration-200 ease-out.
- Button Float + Press: Buttons rise hover:-translate-y-0.5 and shadow intensifies. On active:scale-[0.97] active:translate-y-0 active:shadow-none -- compressed back to surface. The combination creates a physical button feel.
- Press Scale Precision: Fluent uses active:scale-[0.97] (not 0.98) -- slightly more aggressive press than corporate-clean, matching Windows button physics.
- Snappy Easing: duration-150 ease-out for buttons and controls. duration-200 ease-out for cards. Never exceed 200ms.

## Color Palette

- Primary Blue: #0078d4 (buttons, links, focus rings)
- Dark Blue: #106ebe (hover state)
- Deeper Blue: #005a9e (active state)
- Accent Yellow: #ffb900
- Accent Red: #e81123
- Accent Green: #00cc6a
- Text: gray-900 (headings), gray-700 (body), gray-500 (secondary)

## Self-Check

After generating code, verify:
1. All buttons have active:scale-[0.97] active:translate-y-0
2. All focusable elements have focus:ring-2 focus:ring-offset-2
3. Cards have hover:-translate-y-1 + shadow expansion
4. Cards use group class; icon containers have group-hover:scale-105
5. No duration above 200ms
6. Acrylic used selectively, not on everything`,

  examplePrompts: [
    {
      title: "Windows 风格设置面板",
      titleEn: "Windows Settings Panel",
      description: "Fluent 风格的系统设置界面",
      descriptionEn: "Fluent style system settings interface",
      prompt: `用 Fluent Design 创建一个系统设置面板，要求：
1. 侧边导航栏
2. 亚克力背景效果
3. 卡片式设置项
4. 微软蓝色主题
5. 清晰的交互反馈`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 流利设计风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Fluent Design style",
      prompt: `Create a SaaS landing page using Fluent Design style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 流利设计风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Fluent Design style",
      prompt: `Create a portfolio showcase page using Fluent Design style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "fluent-design-warm",
      name: "流利设计暖色版",
      nameEn: "Fluent Design Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#4560f8",
        secondary: "#287dc5",
        accent: ["#99d800", "#c32400", "#00c5bd"],
      },
    },
    {
      id: "fluent-design-cool",
      name: "流利设计冷色版",
      nameEn: "Fluent Design Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#008b93",
        secondary: "#0e63ab",
        accent: ["#ff9a3b", "#e00a7b", "#2cc624"],
      },
    },
  ],
};
