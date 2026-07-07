import type { DesignStyle } from "./types";

export const filmNoir: DesignStyle = {
  slug: "film-noir",
  name: "黑色电影",
  nameEn: "Film Noir",
  description:
    "源自 1940-50 年代经典黑色电影的戏剧性视觉风格。极致的明暗对比、深沉的灰阶层次、斜线光影和神秘氛围，适合故事驱动的产品、摄影作品集和高端品牌。",
  descriptionEn:
    "A dramatic visual style drawn from classic 1940-50s film noir. Extreme light-dark contrast, deep grayscale layers, diagonal shadows, and a mysterious atmosphere, suited for story-driven products, photography portfolios, and premium brands.",
  cover: "/styles/film-noir.svg",
  styleType: "visual",
  tags: ["high-contrast"],
  category: "retro",
  colors: {
    primary: "#1a1a1a",
    secondary: "#f5f5f0",
    accent: ["#c41e3a", "#8b7355", "#d4af37", "#7c3e00"],
  },
  keywords: ["黑色电影", "明暗对比", "光影", "戏剧", "复古", "神秘", "高对比", "retro", "vintage", "nostalgic"],

  philosophy: `Film Noir 风格取自 1940-50 年代好莱坞黑色电影的视觉语言。

核心理念：
- 极致对比：深黑与亮白之间几乎没有中间地带，制造戏剧张力
- 光影叙事：斜线阴影、窗棂光影、聚光灯效果讲述故事
- 灰阶主导：以黑白灰为主色调，仅用极少量点缀色（猩红、金色）
- 排版古典：使用衬线标题 + 无衬线正文，呼应老式报刊美学
- 神秘氛围：信息隐约可见，吸引用户深入探索

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Film Noir style draws from the visual language of 1940-50s Hollywood film noir.

Core principles:
- Extreme contrast: almost no middle ground between deep black and bright white, creating dramatic tension
- Light and shadow narrative: diagonal shadows, window-blind light patterns, and spotlight effects tell stories
- Grayscale dominance: black, white, and gray as primary tones, with only minimal accent colors (crimson, gold)
- Classical typography: serif headings + sans-serif body text, echoing vintage newspaper aesthetics
- Mysterious atmosphere: information is barely visible, drawing users to explore deeper`,

  doList: [
    "背景使用深黑 bg-[#0a0a0a] 或 bg-neutral-950",
    "文字使用灰白色 text-neutral-100 text-neutral-300",
    "使用衬线字体作标题 font-serif italic",
    "卡片使用极微妙的灰色区分层次 bg-neutral-900 bg-neutral-800",
    "强调元素使用猩红色 text-[#c41e3a]（极少量）",
    "使用线性渐变模拟光影效果",
    "边框极细或无边框 border-neutral-800",
    "hover 效果使用亮度变化而非颜色变化",
    "按钮使用 group 包裹，内置光束扫射层 (-translate-x-[200%] → group-hover:translate-x-[200%])",
    "active:scale-[0.98] 触觉按压确认",
    "focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950",
    "猩红色血线：w-12 h-[2px] bg-[#c41e3a]，group-hover:w-full 扩展（duration-700）",
  ],

  doListEn: [
    "Use deep black backgrounds bg-[#0a0a0a] or bg-neutral-950",
    "Text uses gray-white colors text-neutral-100 text-neutral-300",
    "Use serif fonts for headings font-serif italic",
    "Cards use extremely subtle gray to distinguish layers bg-neutral-900 bg-neutral-800",
    "Emphasis elements use crimson text-[#c41e3a] (very sparingly)",
    "Use linear gradients to simulate light and shadow effects",
    "Borders are ultra-thin or absent border-neutral-800",
    "Hover effects use brightness changes rather than color changes",
    "Buttons use group wrapper with inner light beam sweep layer (-translate-x-[200%] to group-hover:translate-x-[200%])",
    "active:scale-[0.98] for tactile press confirmation",
    "focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950",
    "Crimson bleed line: w-12 h-[2px] bg-[#c41e3a], expanding to group-hover:w-full (duration-700)",
  ],

  dontList: [
    "禁止使用彩色背景",
    "禁止使用高饱和度颜色（猩红仅作点缀）",
    "禁止使用圆角过大 rounded-2xl+",
    "禁止使用卡通/可爱元素",
    "禁止使用阴影发光效果",
    "禁止使用渐变按钮",
    "禁止按钮缺少 active:scale-[0.98]（无触觉确认=按钮如同装饰）",
    "禁止 focus:ring 缺少 focus:ring-offset-neutral-950（深色背景上焦点环必须与元素分离才可见）",
    "禁止动画 duration 低于 300ms（Noir 节奏是慢戏剧性的，不是利落的）",
  ],

  dontListEn: [
    "Do not use colorful backgrounds",
    "Do not use high-saturation colors (crimson only as accent)",
    "Do not use overly large rounded corners rounded-2xl+",
    "Do not use cartoon/cute elements",
    "Do not use glow effects",
    "Do not use gradient buttons",
    "Do not omit active:scale-[0.98] from buttons (no tactile confirmation = button is decorative)",
    "Do not use focus:ring without focus:ring-offset-neutral-950 (focus ring must separate from element on dark backgrounds)",
    "Do not use animation duration below 300ms (Noir rhythm is slow and dramatic, not snappy)",
  ],

  components: {
    button: {
      name: "Noir 按钮",
      description: "光束扫射按钮：group 包裹，白色对角光束从左扫到右（duration-700），hover 时极端明暗翻转（dark→light），active:scale-[0.98] 触觉确认",
      code: `{/* Primary Noir — light shaft sweep + harsh monochrome swap */}
<button className="
  group relative
  px-6 py-3
  bg-neutral-950 text-neutral-100
  border border-neutral-700
  font-serif italic tracking-widest
  hover:bg-neutral-100 hover:text-neutral-950 hover:border-neutral-100
  focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950
  active:scale-[0.98]
  transition-colors duration-500
  overflow-hidden
">
  {/* Light shaft — sweeps left to right on group-hover */}
  <div className="
    absolute inset-0
    bg-gradient-to-r from-transparent via-white/30 to-transparent
    -translate-x-[200%] skew-x-[-20deg]
    group-hover:translate-x-[200%]
    transition-transform duration-700 ease-in-out
    pointer-events-none
  " />
  <span className="relative z-10">Investigate</span>
</button>

{/* Ghost Noir */}
<button className="
  group relative
  px-6 py-3
  bg-transparent text-neutral-300
  border border-neutral-600
  font-serif italic tracking-widest
  hover:border-neutral-200 hover:text-neutral-100
  focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-950
  active:scale-[0.98]
  transition-colors duration-500
  overflow-hidden
">
  <div className="
    absolute inset-0
    bg-gradient-to-r from-transparent via-white/15 to-transparent
    -translate-x-[200%] skew-x-[-20deg]
    group-hover:translate-x-[200%]
    transition-transform duration-700 ease-in-out
    pointer-events-none
  " />
  <span className="relative z-10">Read More</span>
</button>

{/* Crimson Accent */}
<button className="
  group relative
  px-6 py-3
  bg-[#c41e3a] text-white
  font-serif italic tracking-widest
  hover:bg-[#a01830]
  focus:outline-none focus:ring-2 focus:ring-[#c41e3a] focus:ring-offset-2 focus:ring-offset-neutral-950
  active:scale-[0.98]
  transition-colors duration-500
  overflow-hidden
">
  <div className="
    absolute inset-0
    bg-gradient-to-r from-transparent via-white/20 to-transparent
    -translate-x-[200%] skew-x-[-20deg]
    group-hover:translate-x-[200%]
    transition-transform duration-700 ease-in-out
    pointer-events-none
  " />
  <span className="relative z-10">Confess</span>
</button>`,
    },
    card: {
      name: "Noir 卡片",
      description: "深色层次卡片：群组 hover 时威尼斯百叶窗光纹浮现（opacity-0 → opacity-[0.06]），猩红血线从 w-12 扩展至 full（duration-700），边框照亮",
      code: `<div className="
  group relative
  bg-neutral-900 border border-neutral-800
  p-8
  overflow-hidden
  hover:border-neutral-600
  transition-colors duration-700
  cursor-crosshair
">
  {/* Venetian blinds light pattern — barely visible on hover */}
  <div className="
    absolute inset-0
    opacity-0 group-hover:opacity-[0.06]
    transition-opacity duration-700
    bg-[repeating-linear-gradient(180deg,transparent,transparent_4px,#fff_4px,#fff_6px)]
    pointer-events-none
  " />

  {/* Diagonal light shaft — shifts on hover */}
  <div className="
    absolute -top-20 -right-20 w-40 h-80
    bg-gradient-to-b from-white/5 to-transparent
    rotate-45
    group-hover:from-white/10
    transition-all duration-700
    pointer-events-none
  " />

  <div className="relative">
    <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-3">Case File #47</p>
    <h3 className="text-neutral-100 text-xl font-serif italic mb-3 group-hover:text-white transition-colors duration-500">
      The Last Witness
    </h3>
    <p className="text-neutral-400 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors duration-500">
      The rain hammered against the window as the detective studied the photograph.
      Something didn't add up.
    </p>
    {/* Crimson bleed line — expands from 48px to full width on hover */}
    <div className="mt-6 h-[2px] bg-[#c41e3a] w-12 group-hover:w-full transition-all duration-700 ease-out" />
  </div>
</div>`,
    },
    input: {
      name: "Noir 输入框",
      description: "暗色背景输入框，聚焦时底边照亮，焦点环在黑底上可见",
      code: `<div className="space-y-2">
  <label className="block text-neutral-400 text-xs uppercase tracking-[0.2em] font-serif">Subject Name</label>
  <input
    type="text"
    className="
      w-full px-4 py-3
      bg-neutral-950
      border-b border-neutral-700
      text-neutral-100 font-serif
      placeholder:text-neutral-600
      focus:outline-none focus:border-neutral-300
      focus:ring-0
      transition-colors duration-500
    "
    placeholder="Enter name..."
  />
</div>`,
    },
    nav: {
      name: "Noir 导航",
      description: "近黑色导航栏，衬线链接 hover 时亮度提升",
      code: `<nav className="bg-[#0a0a0a] border-b border-neutral-800 px-8 py-4">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <span className="text-neutral-100 font-serif italic text-lg tracking-widest">THE AGENCY</span>
    <div className="flex items-center gap-8">
      <a href="#" className="text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-200 transition-colors duration-500 font-sans">Cases</a>
      <a href="#" className="text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-200 transition-colors duration-500 font-sans">Archive</a>
      <a href="#" className="text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-200 transition-colors duration-500 font-sans">Contact</a>
    </div>
    <button className="
      group relative
      px-5 py-2
      bg-neutral-950 text-neutral-200 text-xs
      border border-neutral-700
      font-sans uppercase tracking-[0.15em]
      hover:bg-neutral-100 hover:text-neutral-950 hover:border-neutral-100
      focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950
      active:scale-[0.98]
      transition-colors duration-500
      overflow-hidden
    ">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out pointer-events-none" />
      <span className="relative z-10">Inquire</span>
    </button>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Film Noir Hero：聚光灯效果 + 对角光柱 + 极端明暗对比 + 衬线斜体大标题",
      code: `<section className="
  relative min-h-screen
  flex items-center justify-center
  bg-[#0a0a0a]
  overflow-hidden
">
  {/* Spotlight radial from top-left */}
  <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.07)_0%,transparent_70%)] pointer-events-none" />
  {/* Diagonal venetian blind shadow strips */}
  <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent,transparent_80px,rgba(0,0,0,0.3)_80px,rgba(0,0,0,0.3)_82px)] pointer-events-none" />

  <div className="relative z-10 text-center max-w-4xl px-8">
    <p className="text-neutral-500 text-xs uppercase tracking-[0.4em] mb-8 font-sans">A Story of Shadows</p>
    <h1 className="text-6xl md:text-8xl font-serif italic text-neutral-100 leading-tight mb-6 tracking-tight">
      When the City<br />
      <span className="text-[#c41e3a]">Never Sleeps</span>
    </h1>
    <div className="w-24 h-px bg-neutral-600 mx-auto mb-8" />
    <p className="text-neutral-400 text-lg font-serif italic max-w-lg mx-auto mb-12 leading-relaxed">
      Every shadow tells a story. Every light reveals a secret.
    </p>
    <button className="
      group relative
      px-10 py-4
      bg-neutral-100 text-neutral-950
      font-serif italic tracking-widest text-sm
      hover:bg-white
      focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950
      active:scale-[0.98]
      transition-colors duration-500
      overflow-hidden
    ">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out pointer-events-none" />
      <span className="relative z-10">Begin Investigation</span>
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Film Noir Global Styles */
@layer base {
  body {
    @apply bg-[#0a0a0a] text-neutral-300 antialiased;
  }

  h1, h2, h3 {
    @apply font-serif italic;
  }

  ::selection {
    @apply bg-neutral-300 text-neutral-950;
  }
}

@keyframes noir-spotlight {
  0%, 100% { opacity: 0.05; }
  50% { opacity: 0.1; }
}

@keyframes noir-fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
/* Film Noir Design Tokens */
:root {
  --film-noir-primary: #1a1a1a;
  --film-noir-secondary: #f5f5f0;
  --film-noir-accent: #c41e3a;
  --film-noir-glow: rgba(26, 26, 26, 0.3);
}

.film-noir-card {
  position: relative;
  overflow: hidden;
}

.film-noir-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.05), transparent);
  pointer-events: none;
}

.film-noir-card:hover::before {
  opacity: 1;
}

.film-noir-gradient {
  background: linear-gradient(135deg, #1a1a1a, #c41e3a);
}

.film-noir-gradient-text {
  background: linear-gradient(135deg, #1a1a1a, #c41e3a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.film-noir-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(26, 26, 26, 0.08);
}

.film-noir-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.film-noir-animate-in {
  animation: film-noir-fade-in 0.5s ease-out both;
}`,

  aiRules: `STYLE: Film Noir
TYPE: Dramatic high-contrast monochrome interface

MUST USE:
- Deep black background: bg-[#0a0a0a] or bg-neutral-950
- Grayscale palette: neutral-100 through neutral-950
- Serif italic headings: font-serif italic
- Extremely subtle layer separation: bg-neutral-900 vs bg-neutral-800
- Minimal crimson accent: text-[#c41e3a] / bg-[#c41e3a] (sparingly)
- Diagonal gradient light effects for drama
- Thin or no borders: border-neutral-800
- Uppercase small tracking labels: text-xs uppercase tracking-[0.2em]

MUST AVOID:
- Colorful backgrounds
- High saturation colors (crimson only as rare accent)
- Large rounded corners (rounded-2xl+)
- Cartoon/cute elements
- Glow effects (forbidden — breaks the noir darkness)
- Gradient buttons
- Emoji or playful iconography
- Buttons without active:scale-[0.98]
- focus:ring without focus:ring-offset-neutral-950
- Animation duration below 300ms (Noir is slow and dramatic, not snappy)

COLOR SYSTEM:
- Background: #0a0a0a (near black)
- Card: neutral-900
- Card border hover: neutral-600 (from neutral-800)
- Text primary: neutral-100 → white on group-hover
- Text secondary: neutral-400 → neutral-300 on group-hover
- Text muted: neutral-500
- Crimson accent: #c41e3a (very sparingly)
- Gold accent: #d4af37 (very sparingly)
- Borders: neutral-700 to neutral-800

## Animation & Interaction Rules

- Light Shaft Sweep: ALL buttons use group class. Inside, an absolute div with bg-gradient-to-r from-transparent via-white/30 to-transparent starts at -translate-x-[200%] skew-x-[-20deg] and sweeps to translate-x-[200%] on group-hover. Use transition-transform duration-700 ease-in-out. The skew creates a diagonal "flashlight beam" effect. The sweep is slow and deliberate — this is noir, not a sprint.
- Harsh Monochrome Swap: Primary button hover does hover:bg-neutral-100 hover:text-neutral-950 hover:border-neutral-100. This is a complete binary inversion (dark→light), not a gradual shade change. The abruptness reflects 40s film drama where scenes cut hard between shadow and light.
- Venetian Blinds Pattern: Cards have an absolute overlay with bg-[repeating-linear-gradient(180deg,transparent,transparent_4px,#fff_4px,#fff_6px)] at opacity-0, transitioning to group-hover:opacity-[0.06]. This is barely perceptible — like light filtering through half-closed window blinds in a detective's office.
- Crimson Bleed: Cards include a horizontal line w-12 h-[2px] bg-[#c41e3a] that expands to group-hover:w-full over duration-700 ease-out. Simulates blood spreading, or a film title card's crimson underline unfurling.
- Text Reveal: Card headings and body text brighten on group-hover (neutral-100→white, neutral-400→neutral-300) using transition-colors duration-500. Combined with venetian blinds pattern, creates the effect of light falling on text.
- Tactile Confirmation: ALL buttons must use active:scale-[0.98].
- Focus Ring Dark: Always use focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950.
- Slow Easing: Buttons use duration-500. Cards use duration-700. The sweeping light shaft uses duration-700 ease-in-out. NEVER use duration below 300ms — slowness is inherent to noir's dramatic weight.

## Self-Check

After generating code, verify:
1. All buttons are wrapped in group, have the light shaft sweep div inside
2. All buttons have active:scale-[0.98]
3. All focusable elements have focus:ring-offset-neutral-950
4. Cards have venetian blinds overlay (opacity-0 → group-hover:opacity-[0.06])
5. Cards have crimson bleed line (w-12 → group-hover:w-full)
6. No animation duration below 300ms
7. No rounded-2xl or larger`,

  aiRulesEn: `STYLE: Film Noir
TYPE: Dramatic high-contrast monochrome interface

MUST USE:
- Deep black background: bg-[#0a0a0a] or bg-neutral-950
- Grayscale palette: neutral-100 through neutral-950
- Serif italic headings: font-serif italic
- Extremely subtle layer separation: bg-neutral-900 vs bg-neutral-800
- Minimal crimson accent: text-[#c41e3a] / bg-[#c41e3a] (sparingly)
- Diagonal gradient light effects for drama
- Thin or no borders: border-neutral-800
- Uppercase small tracking labels: text-xs uppercase tracking-[0.2em]

MUST AVOID:
- Colorful backgrounds
- High saturation colors (crimson only as rare accent)
- Large rounded corners (rounded-2xl+)
- Cartoon/cute elements
- Glow effects (forbidden -- breaks the noir darkness)
- Gradient buttons
- Buttons without active:scale-[0.98]
- focus:ring without focus:ring-offset-neutral-950
- Animation duration below 300ms (Noir is slow and dramatic, not snappy)

Animation & Interaction Rules:
- Light Shaft Sweep: ALL buttons use group class. Inside, an absolute div with bg-gradient-to-r from-transparent via-white/30 to-transparent starts at -translate-x-[200%] skew-x-[-20deg] and sweeps to translate-x-[200%] on group-hover. Use transition-transform duration-700 ease-in-out.
- Harsh Monochrome Swap: Primary button hover does hover:bg-neutral-100 hover:text-neutral-950 hover:border-neutral-100. Complete binary inversion (dark to light).
- Venetian Blinds Pattern: Cards have an absolute overlay with repeating-linear-gradient at opacity-0, transitioning to group-hover:opacity-[0.06]. Barely perceptible -- like light filtering through half-closed window blinds.
- Crimson Bleed: Cards include a horizontal line w-12 h-[2px] bg-[#c41e3a] that expands to group-hover:w-full over duration-700 ease-out.
- Tactile Confirmation: ALL buttons must use active:scale-[0.98].
- Focus Ring Dark: Always use focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950.
- Slow Easing: Buttons use duration-500. Cards use duration-700. NEVER use duration below 300ms.`,

  examplePrompts: [
    {
      title: "侦探故事集",
      titleEn: "Detective Story Portfolio",
      description: "黑白灰调的故事驱动作品展示",
      descriptionEn: "Monochrome story-driven portfolio showcase",
      prompt: `Create a detective story portfolio using Film Noir style:
- Near-black background with subtle grey card layers
- Serif italic headings for dramatic titles
- Diagonal light shaft effects across cards
- Minimal crimson accent lines for emphasis
- Uppercase tracking labels for metadata
- Vintage newspaper-inspired typography
- Mysterious atmospheric hover effects`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 黑色电影风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Film Noir style",
      prompt: `Create a SaaS landing page using Film Noir style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 黑色电影风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Film Noir style",
      prompt: `Create a portfolio showcase page using Film Noir style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "film-noir-warm",
      name: "黑色电影暖色版",
      nameEn: "Film Noir Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#1a1a1a",
        secondary: "#f6f6f2",
        accent: ["#ae2b00", "#78794f", "#93c334"],
      },
    },
    {
      id: "film-noir-cool",
      name: "黑色电影冷色版",
      nameEn: "Film Noir Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#1a1a1a",
        secondary: "#ddddd8",
        accent: ["#b71b7c", "#996d64", "#ff9b5a"],
      },
    },
  ],
};
