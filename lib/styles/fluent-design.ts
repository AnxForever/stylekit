import { DesignStyle } from "./index";

export const fluentDesign: DesignStyle = {
  slug: "fluent-design",
  name: "流利设计",
  nameEn: "Fluent Design",
  description:
    "微软推出的设计系统，融合了光效、深度、动效、材质和缩放五大元素，打造自然直观的跨平台体验。",
  cover: "/styles/fluent-design.svg",
  styleType: "visual",
  tags: ["modern", "brand-inspired"],
  category: "modern",
  colors: {
    primary: "#0078d4",
    secondary: "#106ebe",
    accent: ["#ffb900", "#e81123", "#00cc6a"],
  },
  keywords: ["Fluent", "微软", "亚克力", "Reveal", "光效", "深度", "动效"],

  philosophy: `Fluent Design System（流利设计系统）是微软于 2017 年推出的设计语言，旨在创造跨设备的一致体验。

核心五元素：
- Light（光）：通过光效指示焦点和交互
- Depth（深度）：创造层次感和空间感
- Motion（动效）：自然流畅的过渡动画
- Material（材质）：亚克力等半透明材质
- Scale（缩放）：适应不同尺寸的设备`,

  doList: [
    "使用亚克力（Acrylic）半透明效果",
    "添加 Reveal 高亮边框效果",
    "使用微软标志性蓝色",
    "保持简洁现代的布局",
    "添加微妙的深度和阴影",
    "使用 Segoe UI 字体",
  ],

  dontList: [
    "禁止过度使用亚克力效果",
    "禁止使用不协调的配色",
    "禁止忽略焦点状态",
    "禁止使用过重的阴影",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Fluent 风格按钮",
      code: `<button className="
  px-6 py-2.5
  bg-[#0078d4]
  text-white font-medium
  rounded-sm
  border border-[#0078d4]
  hover:bg-[#106ebe]
  active:bg-[#005a9e]
  focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2
  transition-colors duration-100
">
  Primary Button
</button>`,
    },
    card: {
      name: "卡片",
      description: "Fluent 风格卡片",
      code: `<div className="
  p-6
  bg-white/70
  backdrop-blur-xl
  rounded-lg
  border border-white/20
  shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]
  hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.12)]
  transition-shadow duration-300
">
  <div className="flex items-center gap-4 mb-4">
    <div className="w-12 h-12 bg-[#0078d4] rounded-lg flex items-center justify-center">
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900">Fluent Card</h3>
      <p className="text-sm text-gray-500">Acrylic material</p>
    </div>
  </div>
  <p className="text-gray-700">
    Light, depth, motion, material, and scale working together.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Fluent 风格输入框",
      code: `<input
  type="text"
  placeholder="Enter text..."
  className="
    w-full px-3 py-2
    bg-white
    border border-gray-300
    rounded-sm
    text-gray-900 placeholder-gray-400
    focus:outline-none focus:border-[#0078d4] focus:border-2
    hover:border-gray-400
    transition-colors duration-100
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Fluent 风格 Hero",
      code: `<section className="
  min-h-screen
  bg-gradient-to-br from-[#0078d4] via-[#106ebe] to-[#005a9e]
  relative overflow-hidden
">
  {/* Acrylic overlay shapes */}
  <div className="absolute top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
  <div className="absolute bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

  <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
    <div className="text-center max-w-3xl">
      <h1 className="text-5xl md:text-7xl font-semibold text-white mb-6">
        Fluent Design
      </h1>
      <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
        Create intuitive, harmonious experiences across platforms with light, depth, motion, material, and scale.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button className="px-8 py-3 bg-white text-[#0078d4] font-semibold rounded-sm hover:bg-white/90 transition-colors">
          Get Started
        </button>
        <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-sm border border-white/30 backdrop-blur-sm hover:bg-white/20 transition-colors">
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
}`,

  aiRules: `你是一个 Fluent Design 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 过度使用亚克力效果
- 使用不协调的配色
- 忽略焦点和悬停状态
- 使用过重的阴影

## 必须遵守

- 微软蓝 bg-[#0078d4] text-white
- 亚克力效果 bg-white/70 backdrop-blur-xl
- 小圆角 rounded-sm, rounded-lg
- 柔和阴影 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]
- 清晰的焦点环 focus:ring-2 focus:ring-[#0078d4]

## 配色

- 主蓝色: #0078d4
- 深蓝色: #106ebe
- 更深蓝: #005a9e
- 黄色: #ffb900
- 红色: #e81123
- 绿色: #00cc6a

## 交互

- 悬停状态变深
- 激活状态更深
- 清晰的焦点指示
- 平滑的过渡动画`,

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
  ],
};
