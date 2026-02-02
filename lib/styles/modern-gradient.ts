import { DesignStyle } from "./index";

export const modernGradient: DesignStyle = {
  slug: "modern-gradient",
  name: "现代渐变风",
  nameEn: "Modern Gradient",
  description:
    "充满活力的现代渐变风格，多彩渐变背景、玻璃质感卡片、动态光影效果。适合创业公司、数字产品、活动页面。",
  cover: "/styles/modern-gradient.png",
  styleType: "visual",
  tags: ["expressive", "modern"],
  category: "expressive",
  colors: {
    primary: "#8b5cf6",
    secondary: "#1e1b4b",
    accent: ["#06b6d4", "#ec4899", "#f59e0b"],
  },
  keywords: ["渐变", "现代", "活力", "创业", "数字", "动态", "科技感"],

  philosophy: `Modern Gradient 风格通过丰富的渐变色彩和光影效果创造视觉冲击力和活力感。

核心理念：
- 视觉活力：渐变色彩带来动感和能量
- 深度层次：通过渐变和透明度创造深度
- 现代科技：传达创新和前沿的品牌形象
- 情感共鸣：色彩激发积极的情感反应`,

  doList: [
    "使用 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 等渐变",
    "卡片使用 backdrop-blur-xl bg-white/10 的玻璃效果",
    "按钮使用渐变 + hover 时渐变位移效果",
    "深色背景 bg-slate-950 或 bg-[#1e1b4b]",
    "文字使用 bg-gradient-to-r bg-clip-text text-transparent 渐变效果",
    "使用 rounded-2xl 或 rounded-3xl 圆角",
    "添加光晕效果 blur-3xl opacity-30 作为装饰",
  ],

  dontList: [
    "禁止使用纯色背景（主要区域）",
    "禁止使用单调的灰色调",
    "禁止使用尖锐边角 rounded-none",
    "禁止使用老式渐变（如垂直渐变的按钮）",
    "禁止过度使用渐变导致视觉混乱",
    "禁止在深色渐变上使用深色文字",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Modern Gradient 风格的渐变按钮",
      code: `// Primary Gradient Button
<button className="px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-2xl font-medium hover:from-violet-600 hover:to-fuchsia-600 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300">
  Get Started
</button>

// Outline Gradient Button
<button className="px-6 py-3 rounded-2xl font-medium relative group">
  <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl" />
  <span className="absolute inset-[2px] bg-slate-950 rounded-[14px] group-hover:bg-slate-900 transition-colors" />
  <span className="relative bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
    Learn More
  </span>
</button>

// Glass Button
<button className="px-6 py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-2xl font-medium hover:bg-white/20 transition-all duration-300">
  Explore
</button>`,
    },
    card: {
      name: "卡片",
      description: "Modern Gradient 风格的玻璃卡片",
      code: `<div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300">
  <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mb-6">
    <Icon className="w-7 h-7 text-white" />
  </div>
  <h3 className="text-xl font-semibold text-white mb-3">Feature Title</h3>
  <p className="text-white/70 leading-relaxed">
    Stunning visual effects with modern gradient aesthetics.
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
- Font weight: font-medium to font-semibold`,

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
  ],
};
