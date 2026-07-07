import type { DesignStyle } from "./types";

export const modernGradient: DesignStyle = {
  slug: "modern-gradient",
  name: "现代渐变风",
  nameEn: "Modern Gradient",
  description:
    "充满活力的现代渐变风格，多彩渐变背景、玻璃质感卡片、动态光影效果。适合创业公司、数字产品、活动页面。",
  descriptionEn:
    "Vibrant modern gradient style with colorful gradient backgrounds, glass-textured cards, and dynamic lighting effects. Ideal for startups, digital products, and event pages.",
  cover: "/styles/modern-gradient.svg",
  styleType: "visual",
  tags: [],
  category: "expressive",
  colors: {
    primary: "#8b5cf6",
    secondary: "#1e1b4b",
    accent: ["#06b6d4", "#ec4899", "#f59e0b", "#8587ff"],
  },
  keywords: ["渐变", "现代", "活力", "创业", "数字", "动态", "科技感", "expressive", "bold", "vibrant"],

  philosophy: `Modern Gradient 风格通过丰富的渐变色彩和光影效果创造视觉冲击力和活力感。

核心理念：
- 视觉活力：渐变色彩带来动感和能量
- 深度层次：通过渐变和透明度创造深度
- 现代科技：传达创新和前沿的品牌形象
- 情感共鸣：色彩激发积极的情感反应

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Modern Gradient style creates visual impact and vitality through rich gradient colors and lighting effects.

Core principles:
- Visual vitality: Gradient colors bring dynamism and energy
- Depth and layers: Create depth through gradients and transparency
- Modern tech: Convey an innovative and cutting-edge brand image
- Emotional resonance: Colors evoke positive emotional responses`,

  doList: [
    "使用 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 等渐变",
    "卡片使用 backdrop-blur-xl bg-white/10 的玻璃效果",
    "按钮使用渐变 + hover 时渐变位移效果",
    "深色背景 bg-slate-950 或 bg-[#1e1b4b]",
    "文字使用 bg-gradient-to-r bg-clip-text text-transparent 渐变效果",
    "使用 rounded-2xl 或 rounded-3xl 圆角",
    "添加光晕效果 blur-3xl opacity-30 作为装饰",
  ],

  doListEn: [
    "Use bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 and similar gradients",
    "Cards use backdrop-blur-xl bg-white/10 glass effect",
    "Buttons use gradient + hover gradient shift effect",
    "Dark backgrounds bg-slate-950 or bg-[#1e1b4b]",
    "Text uses bg-gradient-to-r bg-clip-text text-transparent gradient effect",
    "Use rounded-2xl or rounded-3xl corners",
    "Add glow orb effects blur-3xl opacity-30 as decoration",
  ],

  dontList: [
    "禁止使用纯色背景（主要区域）",
    "禁止使用单调的灰色调",
    "禁止使用尖锐边角 rounded-none",
    "禁止使用老式渐变（如垂直渐变的按钮）",
    "禁止过度使用渐变导致视觉混乱",
    "禁止在深色渐变上使用深色文字",
  ],

  dontListEn: [
    "Do not use solid color backgrounds (main areas)",
    "Do not use monotone gray schemes",
    "Do not use sharp corners rounded-none",
    "Do not use old-style gradients (e.g. vertical button gradients)",
    "Do not overuse gradients causing visual clutter",
    "Do not use dark text on dark gradients",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Modern Gradient 风格的渐变按钮",
      code: `// Primary Gradient Button
<button className="px-8 py-4 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 bg-[length:200%_auto] text-white rounded-2xl font-bold tracking-wide shadow-[0_8px_20px_rgba(167,139,250,0.3)] hover:bg-right hover:shadow-[0_15px_30px_rgba(217,70,239,0.4)] hover:-translate-y-1 hover:scale-[1.02] active:scale-95 transition-all duration-500 ease-out">
  Get Started
</button>

// Outline Gradient Button
<button className="px-6 py-3 rounded-2xl font-medium relative group hover:-translate-y-1 hover:scale-[1.02] transition-all duration-500 ease-out">
  <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl" />
  <span className="absolute inset-[2px] bg-slate-950 rounded-[14px] group-hover:bg-slate-900 transition-colors duration-500" />
  <span className="relative bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
    Learn More
  </span>
</button>

// Glass Button
<button className="px-6 py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-2xl font-medium hover:bg-white/20 hover:border-violet-400/50 hover:shadow-[0_12px_30px_rgba(139,92,246,0.28)] hover:-translate-y-1 transition-all duration-500 ease-out">
  Explore
</button>`,
    },
    card: {
      name: "卡片",
      description: "Modern Gradient 风格的玻璃卡片",
      code: `<div className="group backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 hover:border-violet-400/50 hover:shadow-[0_20px_50px_rgba(167,139,250,0.18)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 ease-out cursor-pointer">
  <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 ease-out">
    <Icon className="w-7 h-7 text-white" />
  </div>
  <h3 className="text-xl font-semibold text-white mb-3">Feature Title</h3>
  <p className="text-white/70 leading-relaxed group-hover:text-white/85 transition-colors duration-500">
    Stunning visual effects with modern gradient aesthetics and fluid color flow.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Modern Gradient 风格的输入框",
      code: `<div className="space-y-2">
  <label className="block text-sm font-medium text-white/70">Email Address</label>
  <input
    type="email"
    className="w-full px-5 py-3.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300"
    placeholder="you@example.com"
  />
</div>`,
    },
  },

  globalCss: `/* Modern Gradient Global Styles */
@layer base {
  body {
    @apply bg-slate-950 text-white antialiased;
  }
}

/* Gradient text utility */
.gradient-text {
  @apply bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent;
}

/* Glow orb decoration */
.glow-orb {
  @apply absolute blur-3xl opacity-30 pointer-events-none;
}

/* Animated gradient background */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animated-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
}
/* Modern Gradient Design Tokens */
:root {
  --modern-gradient-primary: #8b5cf6;
  --modern-gradient-secondary: #1e1b4b;
  --modern-gradient-accent: #06b6d4;
  --modern-gradient-glow: rgba(139, 92, 246, 0.3);
}

.modern-gradient-card {
  position: relative;
  overflow: hidden;
}

.modern-gradient-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), transparent);
  pointer-events: none;
}

.modern-gradient-card:hover::before {
  opacity: 1;
}

.modern-gradient-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(139, 92, 246, 0.08);
}

.modern-gradient-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.modern-gradient-animate-in {
  animation: modern-gradient-fade-in 0.5s ease-out both;
}`,

  aiRules: `STYLE: Modern Gradient
TYPE: Vibrant, energetic gradient design

MUST USE:
- Gradient backgrounds: bg-gradient-to-r from-violet-500 to-fuchsia-500
- Glass morphism cards: backdrop-blur-xl bg-white/10 border-white/20
- Dark base background: bg-slate-950 or bg-[#1e1b4b]
- Gradient text: bg-gradient-to-r bg-clip-text text-transparent
- Colored shadows: shadow-violet-500/25
- Large rounded corners: rounded-2xl, rounded-3xl
- Glow orbs for decoration: blur-3xl opacity-30

MUST AVOID:
- Solid color backgrounds (main areas)
- Monotone gray schemes
- Sharp corners (rounded-none)
- Old-style gradients (vertical button gradients)
- Visual clutter from too many gradients
- Dark text on dark gradients

COLOR COMBOS:
- Violet to Fuchsia: from-violet-500 to-fuchsia-500
- Cyan to Blue: from-cyan-500 to-blue-500
- Pink to Orange: from-pink-500 to-orange-500
- Multi-color: from-violet-500 via-fuchsia-500 to-cyan-500

TYPOGRAPHY:
- Headings: White or gradient text
- Body: text-white/70 or text-white/80
- Font weight: font-medium to font-semibold

## Animation & Interaction Rules

- Gradient Flow: 渐变交互应包含色带位移（如 bg-[length:200%_auto] + hover:bg-right），避免静态变亮/变暗。
- Neon Dispersion: hover 时彩色阴影扩散半径显著增加，强化未来感光晕。
- Zero-Gravity Float: 卡片与按钮可轻微上浮并微缩放，建议 duration-500 + ease-out。
- Luminous Borders: 半透明边框在 hover 时提亮到品牌色透明度，形成被内部光线点亮的边缘。`,

  aiRulesEn: `STYLE: Modern Gradient
TYPE: Vibrant, energetic gradient design

MUST USE:
- Gradient backgrounds: bg-gradient-to-r from-violet-500 to-fuchsia-500
- Glass morphism cards: backdrop-blur-xl bg-white/10 border-white/20
- Dark base background: bg-slate-950 or bg-[#1e1b4b]
- Gradient text: bg-gradient-to-r bg-clip-text text-transparent
- Colored shadows: shadow-violet-500/25
- Large rounded corners: rounded-2xl, rounded-3xl
- Glow orbs for decoration: blur-3xl opacity-30

MUST AVOID:
- Solid color backgrounds (main areas)
- Monotone gray schemes
- Sharp corners (rounded-none)
- Old-style gradients (vertical button gradients)
- Visual clutter from too many gradients
- Dark text on dark gradients

COLOR COMBOS:
- Violet to Fuchsia: from-violet-500 to-fuchsia-500
- Cyan to Blue: from-cyan-500 to-blue-500
- Pink to Orange: from-pink-500 to-orange-500
- Multi-color: from-violet-500 via-fuchsia-500 to-cyan-500

TYPOGRAPHY:
- Headings: White or gradient text
- Body: text-white/70 or text-white/80
- Font weight: font-medium to font-semibold

## Animation & Interaction Rules

- Gradient Flow: Gradient interactions should include color band shifting (e.g. bg-[length:200%_auto] + hover:bg-right), avoid static brightening/darkening.
- Neon Dispersion: On hover, colored shadow spread radius increases significantly, reinforcing futuristic glow halo.
- Zero-Gravity Float: Cards and buttons can slightly lift and micro-scale, recommend duration-500 + ease-out.
- Luminous Borders: Semi-transparent borders brighten to brand color opacity on hover, creating edges lit by internal light.`,

  examplePrompts: [
    {
      title: "创业着陆页",
      titleEn: "Startup Landing",
      description: "生成现代创业公司着陆页",
      descriptionEn: "Generate modern startup landing page",
      prompt: `Create a startup landing using Modern Gradient style:
- Full-width hero with animated gradient background
- Floating glass cards with features
- Gradient CTAs with shadow glow
- Stats section with gradient numbers
- Testimonials in glass cards
- Dark footer with gradient accents
- Add decorative glow orbs`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 现代渐变风风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Modern Gradient style",
      prompt: `Create a SaaS landing page using Modern Gradient style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 现代渐变风风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Modern Gradient style",
      prompt: `Create a portfolio showcase page using Modern Gradient style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "modern-gradient-warm",
      name: "现代渐变风暖色版",
      nameEn: "Modern Gradient Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#ca4cd7",
        secondary: "#35325d",
        accent: ["#3aa0ff", "#f04e56", "#9dba00"],
      },
    },
    {
      id: "modern-gradient-cool",
      name: "现代渐变风冷色版",
      nameEn: "Modern Gradient Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#4571f1",
        secondary: "#1b1844",
        accent: ["#00c285", "#c74dd1", "#ff8447"],
      },
    },
  ],
};
