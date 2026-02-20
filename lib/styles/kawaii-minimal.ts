import { DesignStyle } from "./index";

export const kawaiiMinimal: DesignStyle = {
  slug: "kawaii-minimal",
  name: "可爱极简",
  nameEn: "Kawaii Minimal",
  description:
    "融合日系可爱文化与极简设计的温柔风格。柔和的粉彩色系、圆润形状、轻盈留白和细腻的微交互，适合生活方式应用、儿童产品和创意工具。",
  cover: "/styles/kawaii-minimal.svg",
  styleType: "visual",
  tags: ["minimal", "expressive"],
  category: "minimal",
  colors: {
    primary: "#F9A8D4",
    secondary: "#FFF7ED",
    accent: ["#A78BFA", "#67E8F9", "#FDE68A"],
  },
  keywords: ["可爱", "极简", "粉彩", "圆润", "温柔", "日系", "卡哇伊"],

  philosophy: `Kawaii Minimal 风格融合日本可爱文化的温暖感与北欧极简主义的克制感。

核心理念：
- 柔和粉彩：使用低饱和度的粉、紫、蓝、黄色系，营造温柔氛围
- 圆润形状：大圆角、圆形元素、避免尖锐边角
- 轻盈留白：充足的呼吸空间让界面感觉轻松舒适
- 微交互：细腻的弹跳、摇摆动效增加趣味性
- 功能优先：可爱但不杂乱，保持信息清晰`,

  doList: [
    "背景使用暖白 bg-[#FFF7ED] 或 bg-orange-50",
    "使用大圆角 rounded-2xl rounded-3xl rounded-full",
    "使用柔和阴影 shadow-sm shadow-md（避免深色强阴影）",
    "文字使用圆润无衬线字体 font-sans font-medium",
    "按钮使用粉彩渐变或柔和纯色",
    "卡片使用浅色边框 border-pink-200 或无边框",
    "交互使用弹跳缩放 hover:scale-105 active:scale-95",
    "间距宽松 p-6 p-8 gap-6 gap-8",
    "交互加入果冻式挤压回弹（squash and stretch）增强软糯触感",
  ],

  dontList: [
    "禁止使用深色/黑色背景",
    "禁止使用尖锐边角 rounded-none rounded-sm",
    "禁止使用发光/霓虹效果",
    "禁止使用高饱和度荧光色",
    "禁止使用粗体黑色边框",
    "禁止信息过密，保持留白",
    "禁止生硬线性过渡，优先使用带回弹感的缓动曲线",
  ],

  components: {
    button: {
      name: "可爱按钮",
      description: "圆润柔和的粉彩按钮，带弹跳交互",
      code: `// Primary Kawaii
<button className="px-8 py-4 bg-pink-300 text-white rounded-full shadow-[0_8px_0_#f472b6,0_15px_20px_rgba(244,114,182,0.35)] hover:bg-pink-400 hover:shadow-[0_6px_0_#f472b6,0_10px_15px_rgba(244,114,182,0.35)] hover:translate-y-[2px] hover:scale-x-[1.05] hover:scale-y-[0.97] active:translate-y-[8px] active:shadow-[0_0_0_#f472b6,0_0_0_rgba(244,114,182,0)] active:scale-[0.95] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] font-medium">
  Click Me
</button>

// Pastel Outline
<button className="px-6 py-3 bg-white border-2 border-pink-200 text-pink-400 rounded-full hover:bg-pink-50 hover:border-pink-300 hover:scale-x-[1.04] hover:scale-y-[0.98] active:scale-[0.94] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] font-medium">
  Explore
</button>

// Gradient Kawaii
<button className="px-6 py-3 bg-gradient-to-r from-pink-300 to-purple-300 text-white rounded-full shadow-md hover:shadow-[0_12px_24px_rgba(244,114,182,0.28)] hover:-translate-y-1 hover:rotate-[1deg] active:scale-[0.93] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] font-medium">
  Let's Go
</button>`,
    },
    card: {
      name: "可爱卡片",
      description: "圆润柔和的卡片，轻盈阴影和粉彩装饰",
      code: `<div className="group bg-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(251,207,232,0.4)] border-2 border-pink-100 hover:shadow-[0_20px_40px_rgba(244,114,182,0.3)] hover:-translate-y-3 hover:rotate-[1deg] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer">
  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:-rotate-[12deg] transition-transform duration-300 ease-out">
    <span className="text-white text-lg">*</span>
  </div>
  <h3 className="text-gray-800 text-xl font-bold mb-3 group-hover:text-pink-400 transition-colors duration-300">
    Sweet Feature
  </h3>
  <p className="text-gray-500 text-sm leading-relaxed font-medium">
    A delightful, marshmallow-soft experience designed with care and gentle playful energy.
  </p>
</div>`,
    },
    input: {
      name: "可爱输入框",
      description: "圆润边框输入框，柔和聚焦效果",
      code: `<div className="space-y-2">
  <label className="block text-gray-600 text-sm font-medium">Your Name</label>
  <input
    type="text"
    className="w-full px-4 py-3 bg-white border-2 border-pink-200 rounded-2xl text-gray-700 placeholder:text-pink-300 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-200"
    placeholder="Type here..."
  />
</div>`,
    },
  },

  globalCss: `/* Kawaii Minimal Global Styles */
@layer base {
  body {
    @apply bg-[#FFF7ED] text-gray-700 antialiased;
  }

  ::selection {
    @apply bg-pink-200 text-pink-800;
  }
}

@keyframes kawaii-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

@keyframes kawaii-wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  75% { transform: rotate(3deg); }
}

@keyframes kawaii-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}`,

  aiRules: `STYLE: Kawaii Minimal
TYPE: Cute minimalist pastel interface

MUST USE:
- Warm light background: bg-[#FFF7ED] or bg-orange-50
- Large rounded corners: rounded-2xl, rounded-3xl, rounded-full
- Soft shadows: shadow-sm, shadow-md (not dark/strong)
- Pastel colors: pink-300, purple-300, cyan-200, yellow-200
- Bounce interactions: hover:scale-105 active:scale-95
- Generous spacing: p-6, p-8, gap-6
- font-sans font-medium for text
- White cards with light borders

MUST AVOID:
- Dark/black backgrounds
- Sharp corners (rounded-none, rounded-sm)
- Glow/neon effects
- High saturation neon colors
- Bold black borders
- Dense information layout

COLOR SYSTEM:
- Background: #FFF7ED (warm white)
- Card: white
- Primary: #F9A8D4 (soft pink)
- Secondary: #A78BFA (soft purple)
- Tertiary: #67E8F9 (soft cyan)
- Accent: #FDE68A (soft yellow)
- Text primary: gray-800
- Text secondary: gray-500

SPECIAL EFFECTS:
- Bounce animation on hover (scale + shadow increase)
- Wiggle animation for attention elements
- Float animation for decorative elements
- Smooth transitions (200-300ms)

Animation & Interaction Rules:
- Jelly Bounce: hover 使用 squash-and-stretch（scale-x 与 scale-y 非等比变化）制造软糖弹性。
- Cloud Lift: 卡片可轻微上浮并增强粉彩阴影，保持轻盈愉悦的漂浮感。
- Squishy Press: active 使用更明显按压（0.90-0.95）并收紧阴影，模拟软糯触感。
- Spring Easing: 优先使用 cubic-bezier(0.34,1.56,0.64,1) 的回弹节奏，避免僵硬线性过渡。`,

  examplePrompts: [
    {
      title: "生活方式应用",
      titleEn: "Lifestyle App",
      description: "粉彩配色的日记或习惯追踪应用",
      descriptionEn: "Pastel-themed diary or habit tracker app",
      prompt: `Create a lifestyle app interface using Kawaii Minimal style:
- Warm white background with pastel accents
- Rounded cards with soft shadows
- Pink/purple gradient buttons
- Bouncy hover interactions
- Clean typography with generous spacing
- Decorative rounded icons
- Habit tracker with pastel progress indicators`,
    },
  ],
};
