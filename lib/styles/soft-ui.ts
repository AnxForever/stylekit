import { DesignStyle } from "./index";

export const softUI: DesignStyle = {
  slug: "soft-ui",
  name: "柔和界面风",
  nameEn: "Soft UI",
  description:
    "温和友好的界面风格，柔和的阴影、圆润的边角、低饱和度的配色。适合消费类应用、社交产品、生活服务类 App。",
  cover: "/styles/soft-ui.svg",
  styleType: "visual",
  tags: ["modern", "minimal"],
  category: "modern",
  colors: {
    primary: "#6366f1",
    secondary: "#f1f5f9",
    accent: ["#ec4899", "#10b981", "#f59e0b"],
  },
  keywords: ["柔和", "圆润", "友好", "消费类", "App", "社交", "生活服务"],

  philosophy: `Soft UI 设计风格强调友好、亲和、舒适的视觉体验，让用户感到放松和愉悦。

核心理念：
- 温和友好：通过柔和的阴影和圆角传达亲和力
- 低对比度：避免强烈对比，使用柔和的色彩过渡
- 触感设计：让界面元素看起来可以触摸
- 情感连接：通过设计传达温暖和关怀`,

  doList: [
    "使用 rounded-2xl 或 rounded-3xl 作为主要圆角",
    "使用 shadow-lg 或 shadow-xl 配合透明度 shadow-[accent]/20",
    "背景使用浅色调 bg-slate-50, bg-gray-50",
    "使用低饱和度的主色调",
    "按钮使用 hover:shadow-xl hover:-translate-y-0.5 的悬浮效果",
    "卡片间使用 gap-6 或 gap-8 的宽松间距",
    "图标使用圆形背景 rounded-full bg-[color]/10",
  ],

  dontList: [
    "禁止使用尖锐边角 rounded-none",
    "禁止使用纯黑色 #000000",
    "禁止使用高饱和度的纯色",
    "禁止使用硬边框 border-black",
    "禁止使用硬阴影（无模糊的阴影）",
    "禁止元素间距过于紧凑",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Soft UI 风格的按钮",
      code: `// Primary Button
<button className="px-6 py-3 bg-indigo-500 text-white rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200 font-medium">
  Get Started
</button>

// Secondary Button
<button className="px-6 py-3 bg-white text-gray-700 rounded-2xl shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 font-medium">
  Learn More
</button>

// Soft Ghost
<button className="px-6 py-3 text-indigo-500 bg-indigo-50 rounded-2xl hover:bg-indigo-100 transition-colors duration-200 font-medium">
  Cancel
</button>`,
    },
    card: {
      name: "卡片",
      description: "Soft UI 风格的卡片",
      code: `<div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
  <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
    <Icon className="w-7 h-7 text-indigo-500" />
  </div>
  <h3 className="text-xl font-semibold text-gray-800 mb-3">Feature Title</h3>
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
    className="w-full px-5 py-3.5 bg-gray-50 border-0 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white transition-all duration-200"
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
- Gap: gap-6 md:gap-8`,

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
  ],
};
