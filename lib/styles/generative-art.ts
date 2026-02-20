import { DesignStyle } from "./index";

export const generativeArt: DesignStyle = {
  slug: "generative-art",
  name: "生成艺术",
  nameEn: "Generative Art",
  description:
    "算法驱动的程序化视觉美学，以数学函数、噪声纹理和参数化图形创造独特动态界面。适合创意编程、数据可视化、艺术项目。",
  cover: "/styles/generative-art.svg",
  styleType: "visual",
  tags: ["expressive", "modern", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#7c3aed",
    secondary: "#0a0a0a",
    accent: ["#3b82f6", "#14b8a6", "#f43f5e", "#f59e0b"],
  },
  keywords: [
    "generative",
    "algorithmic",
    "procedural",
    "noise",
    "particles",
    "fractal",
    "code art",
    "creative coding",
    "生成艺术",
    "算法",
    "程序化",
  ],

  philosophy: `Generative Art 风格源自创意编码与算法美学，每一个视觉元素都由数学函数和程序化规则生成。

核心理念：
- 算法驱动：颜色、形状、纹理都通过数学函数生成而非手工绘制
- 参数化设计：通过 seed 值、迭代次数等参数控制输出
- 有序中的混沌：Perlin noise、分形、粒子系统创造自然与数学的交汇
- 代码即艺术：等宽字体、参数标签暗示底层的代码本质
- 暗色画布：近黑背景让算法生成的色彩更加醒目`,

  doList: [
    "背景使用近黑色 bg-[#0a0a0a] 或 bg-neutral-950",
    "使用 HSL 旋转生成算法色板，以紫色 #7c3aed 为基准",
    "所有文字使用 font-mono 等宽字体",
    "用 SVG 几何图案（圆、线、曲线网格）作为装饰背景",
    "展示参数元素：seed 值、坐标、迭代次数等",
    "使用数学缓动函数驱动动画",
    "卡片使用 bg-neutral-900/80 backdrop-blur 的暗色玻璃效果",
    "交互元素使用紫色发光 shadow-[0_0_20px_rgba(124,58,237,0.4)]",
    "交互反馈保持线性精确（ease-linear + duration-200）",
  ],

  dontList: [
    "禁止使用图片或光栅位图",
    "禁止使用传统 UI 模式（除非加入算法化改造）",
    "禁止使用静态、毫无生气的布局",
    "禁止使用超过 5 种颜色而没有算法依据",
    "禁止使用非程序化派生的装饰元素",
    "禁止使用浅色/白色背景",
    "禁止使用 serif 或 sans 字体（必须用 monospace）",
    "禁止使用 spring、bounce 等拟物弹性动效",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Generative Art 风格算法主题按钮",
      code: `<button className="group relative px-6 py-3 rounded-lg overflow-hidden font-mono text-sm uppercase tracking-[0.18em] bg-violet-900/35 text-violet-300 border border-violet-500/50 hover:border-violet-400 hover:text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] active:opacity-90 transition-all duration-200 ease-linear">
  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(124,58,237,0.3)_50%,transparent_75%)] bg-[length:200%_200%] bg-[0%_0%] group-hover:bg-[100%_100%] transition-all duration-500 ease-linear" />
  <span className="relative z-10 group-hover:tracking-[0.24em] transition-all duration-200 ease-linear">Generate</span>
</button>

<button className="group px-6 py-3 rounded-lg font-mono text-sm uppercase tracking-[0.18em] bg-transparent text-violet-400 border border-violet-500/40 hover:border-violet-400 hover:bg-violet-500/10 hover:shadow-[0_0_14px_rgba(124,58,237,0.25)] transition-all duration-200 ease-linear">
  <span className="group-hover:tracking-[0.24em] transition-all duration-200 ease-linear">Parameters</span>
</button>`,
    },
    card: {
      name: "卡片",
      description: "Generative Art 风格暗色玻璃卡片",
      code: `<div className="group bg-neutral-900/80 backdrop-blur rounded-xl p-6 border border-neutral-800 relative overflow-hidden hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(124,58,237,0.14)] transition-all duration-200 ease-linear cursor-crosshair">
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(124,58,237,0.05)_2px,rgba(124,58,237,0.05)_4px)] transition-opacity duration-200 ease-linear" />
  <div className="relative z-10">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-2 h-2 rounded-none bg-violet-500 shadow-[0_0_8px_rgba(124,58,237,0.6)] group-hover:rotate-45 transition-transform duration-200 ease-linear" />
      <h3 className="text-violet-400 font-mono text-xs uppercase tracking-[0.2em]">Algorithm // 0x42</h3>
    </div>
    <h4 className="text-white text-lg font-mono font-bold mb-2 group-hover:text-violet-200 transition-colors duration-200 ease-linear">Perlin Noise</h4>
    <p className="text-neutral-400 font-mono text-sm leading-relaxed group-hover:text-neutral-300 transition-colors duration-200 ease-linear">
      Gradient noise function for organic procedural textures. Seed dynamically injected.
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Generative Art 风格参数输入框",
      code: `<div className="space-y-2">
  <label className="block text-violet-400 font-mono text-xs uppercase tracking-wider">Seed Value</label>
  <input
    type="text"
    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 font-mono text-sm placeholder:text-neutral-600 focus:outline-none focus:border-violet-500 focus:shadow-[0_0_10px_rgba(124,58,237,0.2)] transition-all duration-300"
    placeholder="Enter seed..."
  />
</div>`,
    },
    nav: {
      name: "导航栏",
      description: "Generative Art 风格暗色导航",
      code: `<nav className="bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-neutral-800 px-6 py-4 flex justify-between items-center">
  <span className="font-mono text-white font-bold tracking-wider">GenArt</span>
  <div className="flex items-center gap-6 font-mono text-sm text-neutral-400">
    <span className="hover:text-white transition-colors cursor-pointer">Algorithms</span>
    <span className="hover:text-white transition-colors cursor-pointer">Gallery</span>
    <span className="text-violet-400 text-xs">seed: 42</span>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区域",
      description: "Generative Art 风格 Hero，带几何装饰",
      code: `<section className="relative bg-[#0a0a0a] overflow-hidden pt-32 pb-20 px-6">
  <h1 className="text-white font-mono font-bold text-4xl md:text-6xl mb-4">Generative Art</h1>
  <p className="text-neutral-400 font-mono text-sm md:text-base max-w-xl">
    Algorithm-driven visual aesthetics through mathematical functions and procedural generation.
  </p>
</section>`,
    },
    footer: {
      name: "页脚",
      description: "Generative Art 风格暗色页脚",
      code: `<footer className="bg-[#0a0a0a] border-t border-neutral-800 py-8 px-6">
  <div className="max-w-6xl mx-auto flex justify-between items-center font-mono text-xs text-neutral-600">
    <span>Generative Art Style</span>
    <span>seed: 42 | iterations: 1000</span>
  </div>
</footer>`,
    },
  },

  globalCss: `/* Generative Art Global Styles */
@layer base {
  body {
    @apply bg-[#0a0a0a] text-white antialiased;
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  }

  ::selection {
    @apply bg-violet-600 text-white;
  }
}

@keyframes gen-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes gen-pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}
@keyframes gen-drift {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(10px, -10px); }
  50% { transform: translate(-5px, 15px); }
  75% { transform: translate(-15px, -5px); }
}
@keyframes gen-hue-cycle {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}`,

  aiRules: `STYLE: Generative Art
TYPE: Algorithm-driven visual aesthetics

MUST USE:
- Dark background: bg-[#0a0a0a] or bg-neutral-950
- Primary accent: Violet/purple (#7c3aed) as base generative color
- Color palette: Algorithmically derived via HSL rotation from violet base
- Secondary colors: Blue (#3b82f6), Teal (#14b8a6), Rose (#f43f5e), Amber (#f59e0b)
- Monospace fonts: font-mono for all text (code-art aesthetic)
- SVG geometric shapes (circles, lines, curves) as decorative backgrounds
- Dark glass cards: bg-neutral-900/80 backdrop-blur with subtle borders
- Violet glow: shadow-[0_0_20px_rgba(124,58,237,0.4)] for interactive elements
- Parameter display: Show seed values, coordinates, algorithm names as UI elements
- Dot grid or line grid as subtle background texture

MUST AVOID:
- Stock photos or raster images
- Light/white backgrounds
- Serif or sans-serif fonts
- Conventional shadows (shadow-md)
- Static lifeless layouts
- More than 5 colors without algorithmic justification
- Decorative elements that are not procedurally derived

COLOR RULES:
- Primary: Violet (#7c3aed)
- Secondary: Blue (#3b82f6), Teal (#14b8a6)
- Highlight: Rose (#f43f5e), Amber (#f59e0b)
- Background: Near-black (#0a0a0a)
- Text: White (primary), Neutral-400 (secondary), Neutral-600 (muted)
- Borders: Neutral-800 (default), Violet-500/30 (hover)

SPECIAL EFFECTS:
- Subtle animations with mathematical easing
- Color cycling via HSL rotation
- SVG pattern overlays (dot grids, concentric circles)
- Backdrop blur for glass-panel cards

Animation & Interaction Rules:
- Algorithmic Flow: 交互应体现参数计算过程，可通过网格或渐变层的线性位移模拟噪点流动。
- Parameter Shifting: 悬停时可轻微调整字距与标记形态（如方点旋转），暗示 seed/参数变化，但避免过度花哨。
- Exact Precision: 优先使用 \`ease-linear\` 与 \`duration-200\`，保持程序化、可预测的反馈节奏。
- Mathematical Glow: 发光应以清晰几何边缘为主，避免过度雾化导致信息层级变糊。`,

  examplePrompts: [
    {
      title: "生成艺术画廊",
      titleEn: "Generative Art Gallery",
      description: "带程序化图案背景和参数控件的生成艺术展示",
      descriptionEn: "Gallery with procedural pattern backgrounds and parameter controls",
      prompt: `Create a generative art gallery using Generative Art style:
- Dark background with dot-grid pattern overlay
- Cards for each artwork with SVG geometric illustrations
- Parameter badges showing seed, iterations, scale
- Algorithmic color palette display
- Monospace typography throughout`,
    },
    {
      title: "创意编码工作台",
      titleEn: "Creative Coding Playground",
      description: "带算法色板生成器的创意编程平台",
      descriptionEn: "Creative coding platform with algorithmic palette generator",
      prompt: `Build a creative coding playground using Generative Art style:
- Code editor panel with dark theme
- Live preview area with generative patterns
- Color palette generator using HSL rotation
- Parameter sliders for noise scale, seed, iterations
- Algorithm selector (Perlin, Voronoi, Flow Field, Fractal)`,
    },
  ],
};
