import { DesignStyle } from "./index";

export const dopamineDesign: DesignStyle = {
  slug: "dopamine-design",
  name: "多巴胺设计",
  nameEn: "Dopamine Design",
  description:
    "高饱和度霓虹配色、大胆排版、充满能量感的视觉冲击力。2025-2026 年度设计趋势，用色彩直接刺激多巴胺分泌，让界面充满快乐和兴奋。",
  cover: "/styles/dopamine-design.svg",
  styleType: "visual",
  tags: ["expressive", "modern", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#ff006e",
    secondary: "#8338ec",
    accent: ["#ffbe0b", "#3a86ff", "#06d6a0", "#fb5607"],
  },
  keywords: ["多巴胺", "高饱和", "霓虹", "快乐", "大胆", "能量"],

  philosophy: `Dopamine Design 是 2025-2026 年最火热的设计趋势，核心理念是通过高饱和度色彩、大胆排版和充满能量的视觉元素直接刺激用户的愉悦感。

核心理念：
- 色彩爆炸：使用 5-6 种高饱和度颜色，拒绝灰暗和低调
- 大胆排版：超大字号、加粗字重、紧凑行距
- 圆润友好：大圆角、pill 形状、bubble 元素
- 动效活泼：弹性动画、过冲回弹、愉快的 micro-interactions
- 反灰色：最小化灰色使用，用彩色替代中性色`,

  philosophyEn: `Dopamine Design is the hottest design trend of 2025-2026. The core idea is to use highly saturated colors, bold typography, and energetic visual elements to directly stimulate feelings of joy and excitement.

Core principles:
- Color explosion: 5-6 high-saturation colors, no dull or muted tones
- Bold typography: oversized fonts, heavy weights, tight leading
- Rounded & friendly: large border-radius, pill shapes, bubble elements
- Playful motion: elastic animations, overshoot, joyful micro-interactions
- Anti-gray: minimize gray usage, replace neutrals with color`,

  doList: [
    "使用高饱和度配色 bg-[#ff006e] bg-[#8338ec] bg-[#ffbe0b] bg-[#3a86ff]",
    "圆角设为最大 rounded-full rounded-3xl rounded-2xl",
    "标题使用超大字号 text-5xl md:text-7xl font-black",
    "按钮使用 pill 形状 rounded-full px-8",
    "使用彩色阴影 shadow-[0_8px_30px_rgba(255,0,110,0.4)]",
    "渐变背景 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500",
    "hover 效果加弹性 hover:scale-105 transition-transform",
    "使用 emoji 和趣味图标点缀",
  ],

  doListEn: [
    "Use high-saturation colors: bg-[#ff006e] bg-[#8338ec] bg-[#ffbe0b] bg-[#3a86ff]",
    "Maximum border-radius: rounded-full rounded-3xl rounded-2xl",
    "Oversized headings: text-5xl md:text-7xl font-black",
    "Pill-shaped buttons: rounded-full px-8",
    "Colored shadows: shadow-[0_8px_30px_rgba(255,0,110,0.4)]",
    "Gradient backgrounds: bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500",
    "Bouncy hover effects: hover:scale-105 transition-transform",
    "Sprinkle emojis and playful icons",
  ],

  dontList: [
    "禁止大面积使用灰色 text-gray-500 bg-gray-100",
    "禁止低饱和度/马卡龙色",
    "禁止过小的圆角 rounded-sm rounded-md",
    "禁止严肃/商务风格排版",
    "禁止使用 serif 字体",
    "禁止阴影使用黑色/灰色 shadow-lg",
  ],

  dontListEn: [
    "No large gray areas: text-gray-500 bg-gray-100",
    "No desaturated/pastel colors",
    "No small border-radius: rounded-sm rounded-md",
    "No serious/corporate typography",
    "No serif fonts",
    "No black/gray shadows: shadow-lg",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Dopamine Design 风格的 pill 形状高饱和按钮",
      code: `<button className="px-8 py-4 bg-[#ff006e] text-white text-lg font-bold rounded-full shadow-[0_8px_30px_rgba(255,0,110,0.4)] hover:shadow-[0_12px_40px_rgba(255,0,110,0.6)] hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
  Let's Go!
</button>`,
    },
    card: {
      name: "卡片",
      description: "Dopamine Design 风格的渐变彩色卡片",
      code: `<div className="rounded-3xl bg-gradient-to-br from-[#8338ec] to-[#3a86ff] p-8 text-white shadow-[0_16px_50px_rgba(131,56,236,0.35)] hover:shadow-[0_20px_60px_rgba(131,56,236,0.5)] hover:scale-[1.02] transition-all duration-200">
  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full text-sm font-semibold backdrop-blur-sm mb-4">
    <span>New</span>
  </div>
  <h3 className="text-2xl font-black mb-2">Dopamine Boost</h3>
  <p className="text-white/80 leading-relaxed">Colors that make you feel alive. Bold, bright, and unapologetically joyful.</p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Dopamine Design 风格的圆角彩色输入框",
      code: `<div className="space-y-2">
  <label className="block text-[#8338ec] font-bold text-sm">Your Name</label>
  <input
    type="text"
    className="w-full px-5 py-3.5 bg-white rounded-2xl border-2 border-[#8338ec]/20 text-zinc-900 font-medium placeholder:text-zinc-400 focus:outline-none focus:border-[#ff006e] focus:shadow-[0_0_0_4px_rgba(255,0,110,0.15)] transition-all duration-200"
    placeholder="Type something fun..."
  />
</div>`,
    },
  },

  globalCss: `/* Dopamine Design Global Styles */
@layer base {
  body {
    @apply bg-white text-zinc-900 antialiased;
    font-family: 'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif;
  }
}

@layer utilities {
  .dopamine-gradient-text {
    background: linear-gradient(135deg, #ff006e, #8338ec, #3a86ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .dopamine-glow-pink {
    box-shadow: 0 8px 30px rgba(255, 0, 110, 0.4);
  }

  .dopamine-glow-purple {
    box-shadow: 0 8px 30px rgba(131, 56, 236, 0.4);
  }

  .dopamine-glow-blue {
    box-shadow: 0 8px 30px rgba(58, 134, 255, 0.4);
  }
}`,

  aiRules: `You are a Dopamine Design expert. This is the 2025-2026 design mega-trend centered on high-saturation colors, bold typography, and joyful energy.

## Absolute Rules
- ALL colors must be high-saturation: #ff006e (pink), #8338ec (purple), #ffbe0b (yellow), #3a86ff (blue), #06d6a0 (green), #fb5607 (orange)
- Border-radius must be large: rounded-2xl minimum, rounded-full for buttons
- Shadows MUST be colored, never gray: shadow-[0_8px_30px_rgba(255,0,110,0.4)]
- Typography is bold: font-black for headings, text-5xl+ for hero text
- Buttons are pill-shaped: rounded-full with px-8 py-4 minimum

## Forbidden
- Gray backgrounds or text (bg-gray-*, text-gray-500)
- Small border-radius (rounded-sm, rounded-md, rounded)
- Black/gray shadows (shadow-md, shadow-lg)
- Serif fonts
- Desaturated or pastel colors
- Thin/light font weights for headings

## Motion
- All interactive elements need hover:scale-105 with transition-all duration-200
- Buttons: active:scale-95 for press feedback
- Cards: hover:shadow increase + subtle scale

## Responsive
- Mobile: text-3xl for hero, px-6 py-3 for buttons, rounded-2xl for cards
- Desktop: text-7xl for hero, px-8 py-4 for buttons, rounded-3xl for cards`,

  aiRulesEn: `You are a Dopamine Design expert. This is the 2025-2026 design mega-trend centered on high-saturation colors, bold typography, and joyful energy.

## Absolute Rules
- ALL colors must be high-saturation: #ff006e (pink), #8338ec (purple), #ffbe0b (yellow), #3a86ff (blue), #06d6a0 (green), #fb5607 (orange)
- Border-radius must be large: rounded-2xl minimum, rounded-full for buttons
- Shadows MUST be colored, never gray
- Typography is bold: font-black for headings, text-5xl+ for hero text
- Buttons are pill-shaped

## Forbidden
- Gray backgrounds or text
- Small border-radius
- Black/gray shadows
- Serif fonts, pastel colors, thin font weights`,

  examplePrompts: [
    {
      title: "App 着陆页",
      titleEn: "App Landing Page",
      description: "高能量的移动应用着陆页，渐变英雄区 + 特性展示",
      descriptionEn: "High-energy mobile app landing page with gradient hero + feature showcase",
      prompt: "Use Dopamine Design style to create a mobile app landing page. Include a full-width gradient hero (pink to purple to blue), oversized pill-shaped CTA buttons, feature cards with colored shadows, and a bold pricing section. Everything should feel joyful and energetic.",
    },
  ],
};
