import type { DesignStyle } from "./types";

export const softUI: DesignStyle = {
  slug: "soft-ui",
  name: "柔和界面风",
  nameEn: "Soft UI",
  description:
    "温和友好的界面风格，柔和的阴影、圆润的边角、低饱和度的配色。适合消费类应用、社交产品、生活服务类 App。",
  descriptionEn:
    "Gentle and friendly interface style with soft shadows, rounded corners, and low-saturation colors. Ideal for consumer apps, social products, and lifestyle service apps.",
  cover: "/styles/soft-ui.svg",
  styleType: "visual",
  tags: [],
  category: "modern",
  colors: {
    primary: "#6366f1",
    secondary: "#f1f5f9",
    accent: ["#ec4899", "#10b981", "#f59e0b", "#d15d1a"],
  },
  keywords: ["柔和", "圆润", "友好", "消费类", "App", "社交", "生活服务", "modern", "contemporary", "sleek"],

  philosophy: `Soft UI 设计风格强调友好、亲和、舒适的视觉体验，让用户感到放松和愉悦。

核心理念：
- 温和友好：通过柔和的阴影和圆角传达亲和力
- 低对比度：避免强烈对比，使用柔和的色彩过渡
- 触感设计：让界面元素看起来可以触摸
- 情感连接：通过设计传达温暖和关怀

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Soft UI design style emphasizes a friendly, approachable, and comfortable visual experience that makes users feel relaxed and delighted.

Core principles:
- Warm and friendly: Convey approachability through soft shadows and rounded corners
- Low contrast: Avoid strong contrasts, use gentle color transitions
- Tactile design: Make interface elements look touchable
- Emotional connection: Convey warmth and care through design`,

  doList: [
    "使用 rounded-2xl 或 rounded-3xl 作为主要圆角",
    "使用 shadow-lg 或 shadow-xl 配合透明度 shadow-[accent]/20",
    "背景使用浅色调 bg-slate-50, bg-gray-50",
    "使用低饱和度的主色调",
    "按钮使用 hover:shadow-xl hover:-translate-y-0.5 的悬浮效果",
    "卡片间使用 gap-6 或 gap-8 的宽松间距",
    "图标使用圆形背景 rounded-full bg-[color]/10",
  ],

  doListEn: [
    "Use rounded-2xl or rounded-3xl as primary border radius",
    "Use shadow-lg or shadow-xl with transparency shadow-[accent]/20",
    "Backgrounds use light tones bg-slate-50, bg-gray-50",
    "Use low-saturation primary colors",
    "Buttons use hover:shadow-xl hover:-translate-y-0.5 floating effect",
    "Generous spacing between cards gap-6 or gap-8",
    "Icons use circular backgrounds rounded-full bg-[color]/10",
  ],

  dontList: [
    "禁止使用尖锐边角 rounded-none",
    "禁止使用纯黑色 #000000",
    "禁止使用高饱和度的纯色",
    "禁止使用硬边框 border-black",
    "禁止使用硬阴影（无模糊的阴影）",
    "禁止元素间距过于紧凑",
  ],

  dontListEn: [
    "Do not use sharp corners rounded-none",
    "Do not use pure black #000000",
    "Do not use high-saturation pure colors",
    "Do not use hard borders border-black",
    "Do not use hard shadows (shadows without blur)",
    "Do not use tight element spacing",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Soft UI 风格的按钮",
      code: `// Primary Button
<button className="px-6 py-3 bg-indigo-500 text-white rounded-2xl shadow-[0_10px_24px_rgba(99,102,241,0.25)] hover:shadow-[0_18px_32px_rgba(99,102,241,0.35)] hover:-translate-y-1 active:translate-y-[2px] active:scale-[0.96] active:shadow-[inset_0_4px_10px_rgba(67,56,202,0.28)] transition-all duration-300 ease-in-out font-medium">
  Get Started
</button>

// Secondary Button
<button className="px-6 py-3 bg-white text-gray-700 rounded-2xl shadow-[0_10px_24px_rgba(148,163,184,0.25)] hover:shadow-[0_16px_30px_rgba(148,163,184,0.35)] hover:-translate-y-1 active:translate-y-[2px] active:scale-[0.97] active:shadow-[inset_0_4px_10px_rgba(148,163,184,0.2)] transition-all duration-300 ease-in-out font-medium">
  Learn More
</button>

// Soft Ghost
<button className="px-6 py-3 text-indigo-500 bg-indigo-50 rounded-2xl hover:bg-indigo-100 active:shadow-[inset_0_3px_8px_rgba(99,102,241,0.15)] transition-all duration-300 ease-in-out font-medium">
  Cancel
</button>`,
    },
    card: {
      name: "卡片",
      description: "Soft UI 风格的卡片",
      code: `<div className="group bg-white rounded-3xl shadow-[0_12px_32px_rgba(148,163,184,0.25)] p-8 hover:shadow-[0_24px_48px_rgba(99,102,241,0.2)] hover:-translate-y-2 transition-all duration-500 ease-in-out">
  <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-50 transition-all duration-300 ease-in-out">
    <Icon className="w-7 h-7 text-indigo-500" />
  </div>
  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors duration-300">Feature Title</h3>
  <p className="text-gray-500 leading-relaxed">
    Soft, friendly description that puts users at ease.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Soft UI 风格的输入框",
      code: `<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-600">Email</label>
  <input
    type="email"
    className="w-full px-5 py-3.5 bg-gray-50 border-0 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/20 focus:shadow-[0_10px_26px_rgba(99,102,241,0.14)] transition-all duration-300 ease-in-out"
    placeholder="you@example.com"
  />
</div>`,
    },
  },

  globalCss: `/* Soft UI Global Styles */
@layer base {
  :root {
    --soft-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  }

  body {
    @apply bg-slate-50 text-gray-800 antialiased;
  }

  h1, h2, h3, h4 {
    @apply font-semibold text-gray-800;
  }
}
@keyframes soft-ui-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes soft-ui-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.soft-ui-card {
  position: relative;
  overflow: hidden;
}

.soft-ui-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), transparent);
  pointer-events: none;
}

.soft-ui-card:hover::before {
  opacity: 1;
}

.soft-ui-gradient {
  background: linear-gradient(135deg, #6366f1, #ec4899);
}

.soft-ui-gradient-text {
  background: linear-gradient(135deg, #6366f1, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.soft-ui-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(99, 102, 241, 0.08);
}

.soft-ui-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.soft-ui-animate-in {
  animation: soft-ui-fade-in 0.5s ease-out both;
}`,

  aiRules: `STYLE: Soft UI
TYPE: Friendly, approachable interface design

MUST USE:
- rounded-2xl or rounded-3xl for all components
- shadow-lg with color tint: shadow-[color]/20
- Soft backgrounds: bg-slate-50, bg-gray-50
- Hover lift effect: hover:-translate-y-0.5 hover:shadow-xl
- Low saturation primary colors
- Circular icon backgrounds: rounded-full bg-[color]/10

MUST AVOID:
- Sharp corners (rounded-none, rounded-sm)
- Pure black (#000000)
- High saturation pure colors
- Hard borders (border-black, border-2)
- Hard shadows (no blur)
- Tight spacing

COLOR RULES:
- Primary: Indigo/Purple tones (indigo-500)
- Background: Slate/Gray soft (slate-50, gray-50)
- Text: Gray-800 for headings, gray-500 for body
- Shadows: Always with color tint and opacity

SPACING:
- Card padding: p-6 md:p-8
- Section padding: py-16 md:py-24
- Gap: gap-6 md:gap-8

## Animation & Interaction Rules

- Cloud Float: hover 以上浮加阴影扩散为主，阴影保持彩色且柔和，避免脏灰硬影。
- Pillow Press: active 状态用轻微缩放和内阴影，呈现按入枕面的柔软反馈。
- Friendly Viscosity: 交互节奏推荐 duration-300 和 ease-in-out，避免突兀速度变化。
- Halo Focus: 表单 focus 使用大半径低不透明度 ring 与柔光阴影，不依赖硬边框。

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

  aiRulesEn: `STYLE: Soft UI
TYPE: Friendly, approachable interface design

MUST USE:
- rounded-2xl or rounded-3xl for all components
- shadow-lg with color tint: shadow-[color]/20
- Soft backgrounds: bg-slate-50, bg-gray-50
- Hover lift effect: hover:-translate-y-0.5 hover:shadow-xl
- Low saturation primary colors
- Circular icon backgrounds: rounded-full bg-[color]/10

MUST AVOID:
- Sharp corners (rounded-none, rounded-sm)
- Pure black (#000000)
- High saturation pure colors
- Hard borders (border-black, border-2)
- Hard shadows (no blur)
- Tight spacing

COLOR RULES:
- Primary: Indigo/Purple tones (indigo-500)
- Background: Slate/Gray soft (slate-50, gray-50)
- Text: Gray-800 for headings, gray-500 for body
- Shadows: Always with color tint and opacity

SPACING:
- Card padding: p-6 md:p-8
- Section padding: py-16 md:py-24
- Gap: gap-6 md:gap-8

## Animation & Interaction Rules

- Cloud Float: Hover primarily uses lift with shadow spread, shadows stay colored and soft, avoid dirty gray hard shadows.
- Pillow Press: Active state uses slight scale and inner shadow, presenting a soft pillow-press feedback.
- Friendly Viscosity: Interaction rhythm recommends duration-300 and ease-in-out, avoiding abrupt speed changes.
- Halo Focus: Form focus uses large-radius low-opacity ring with soft glow shadow, not relying on hard borders.`,

  examplePrompts: [
    {
      title: "消费App",
      titleEn: "Consumer App Landing",
      description: "生成消费类 App 着陆页",
      descriptionEn: "Generate consumer app landing page",
      prompt: `Create a consumer app landing using Soft UI style:
- Hero with app mockup and soft floating cards
- Feature section with rounded cards and colored shadows
- Testimonial cards with avatar and soft shadows
- CTA with gradient button (soft gradient)
- All rounded-2xl or rounded-3xl
- Hover effects with lift and shadow expansion`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 柔和界面风风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Soft UI style",
      prompt: `Create a SaaS landing page using Soft UI style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 柔和界面风风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Soft UI style",
      prompt: `Create a portfolio showcase page using Soft UI style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "soft-ui-warm",
      name: "柔和界面风暖色版",
      nameEn: "Soft UI Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#a553e6",
        secondary: "#f2f6fa",
        accent: ["#f04e56", "#19afc4", "#9dba00"],
      },
    },
    {
      id: "soft-ui-cool",
      name: "柔和界面风冷色版",
      nameEn: "Soft UI Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#247bd9",
        secondary: "#d9dde0",
        accent: ["#c74dd1", "#29b843", "#ff8447"],
      },
    },
  ],
};
