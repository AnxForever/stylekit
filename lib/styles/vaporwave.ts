import type { DesignStyle } from "./types";

export const vaporwave: DesignStyle = {
  slug: "vaporwave",
  name: "霓虹复古",
  nameEn: "Neon Retro",
  description:
    "80-90年代复古未来主义美学，粉紫渐变、霓虹色彩、故障艺术效果。包含蒸汽波、合成波、赛博朋克三种变体。",
  descriptionEn:
    "80s-90s retro-futuristic aesthetics with pink-purple gradients, neon colors, and glitch art effects. Includes Vaporwave, Synthwave, and Cyberpunk variants.",
  cover: "/styles/vaporwave.svg",
  styleType: "visual",
  tags: ["retro", "high-contrast"],
  category: "retro",
  colors: {
    primary: "#ff71ce",
    secondary: "#01cdfe",
    accent: ["#05ffa1", "#b967ff", "#fffb96", "#47d9ff"],
  },
  keywords: ["蒸汽波", "复古未来", "霓虹", "80年代", "故障艺术", "赛博", "合成波", "赛博朋克", "vaporwave", "synthwave", "cyberpunk"],

  // 风格变体
  variants: [
    {
      id: "vaporwave",
      name: "蒸汽波",
      nameEn: "Vaporwave",
      description: "80-90年代消费主义、日文元素、希腊雕塑、故障艺术",
      colors: {
        primary: "#ff71ce",
        secondary: "#01cdfe",
        accent: ["#05ffa1", "#b967ff", "#fffb96"],
      },
    },
    {
      id: "synthwave",
      name: "合成波",
      nameEn: "Synthwave",
      description: "80年代合成器音乐、网格地平线、日落渐变、科幻电影感",
      colors: {
        primary: "#ff00ff",
        secondary: "#00ffff",
        accent: ["#ff6ec7", "#7b68ee", "#ff1493"],
      },
      cssOverrides: `
/* Synthwave variant - more saturated, grid horizon */
.synth-grid {
  background: linear-gradient(to bottom, transparent 0%, #ff00ff33 100%),
    repeating-linear-gradient(90deg, #ff00ff22 0px, transparent 1px, transparent 80px),
    repeating-linear-gradient(0deg, #ff00ff22 0px, transparent 1px, transparent 80px);
}
.synth-sun {
  background: linear-gradient(to bottom, #ff6ec7, #ff1493, #7b68ee);
  border-radius: 50% 50% 0 0;
}
`,
    },
    {
      id: "cyberpunk",
      name: "赛博朋克",
      nameEn: "Cyberpunk",
      description: "深色背景、霓虹发光、未来都市、科技感",
      colors: {
        primary: "#00ffff",
        secondary: "#0a0a0f",
        accent: ["#ff00ff", "#ffff00", "#00ff00"],
      },
      cssOverrides: `
/* Cyberpunk variant - dark background, strong neon */
body { background: #0a0a0f; }
.cyber-neon {
  text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor;
}
.cyber-border {
  border: 1px solid #00ffff;
  box-shadow: 0 0 10px #00ffff, inset 0 0 10px #00ffff33;
}
`,
    },
  ],

  philosophy: `Vaporwave（蒸汽波）是一种源于2010年代初的网络亚文化美学，融合了80-90年代的消费主义符号、日本文化元素和早期互联网美学。

核心理念：
- 怀旧感：对80-90年代商业美学的戏仿和致敬
- 超现实：希腊雕塑、棕榈树、日落等超现实元素组合
- 霓虹色彩：粉色、青色、紫色的渐变组合
- 故障美学：VHS 故障、扫描线、色差效果

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Vaporwave is an internet subculture aesthetic originating from the early 2010s, blending 80s-90s consumerism symbols, Japanese cultural elements, and early internet aesthetics.

Core principles:
- Nostalgia: Parody and homage to 80s-90s commercial aesthetics
- Surrealism: Surreal combinations of Greek sculptures, palm trees, sunsets
- Neon colors: Pink, cyan, and purple gradient combinations
- Glitch aesthetics: VHS glitches, scan lines, chromatic aberration effects`,

  doList: [
    "使用粉紫青渐变 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500",
    "添加霓虹发光效果 shadow-[0_0_20px_rgba(255,113,206,0.5)]",
    "使用故障/扫描线效果作为装饰",
    "融入日文文字或希腊雕塑元素",
    "使用网格线背景营造复古感",
    "字体使用粗体或像素风格",
    "hover 引入迷幻扭曲：轻微旋转、位移与渐变流动",
    "点击使用错误弹窗式错位位移，营造旧系统 glitch 反馈",
    "霓虹光晕强调粉+青双色散射，形成 Aesthetic 重影效果",
  ],

  doListEn: [
    "Use pink-purple-cyan gradients bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500",
    "Add neon glow effects shadow-[0_0_20px_rgba(255,113,206,0.5)]",
    "Use glitch/scan line effects as decoration",
    "Incorporate Japanese text or Greek sculpture elements",
    "Use grid line backgrounds for retro feel",
    "Use bold or pixel-style fonts",
    "Hover introduces psychedelic warp: slight rotation, displacement, and gradient flow",
    "Click uses error-popup-style offset displacement, creating old system glitch feedback",
    "Neon glow emphasizes pink + cyan dual-color scattering, forming Aesthetic ghosting effect",
  ],

  dontList: [
    "禁止使用单调的灰色配色",
    "禁止使用过于现代简约的设计",
    "禁止省略霓虹发光效果",
    "禁止使用过于正式的字体",
    "禁止仅用单色 glow，必须体现粉青双色发光重影",
    "禁止所有交互都过快，hover 需保留漂浮式慢节奏",
  ],

  dontListEn: [
    "Do NOT use monotone gray color schemes",
    "Do NOT use overly modern minimalist designs",
    "Do NOT omit neon glow effects",
    "Do NOT use overly formal fonts",
    "Do NOT use only single-color glow, must reflect pink-cyan dual-color glowing ghosting",
    "Do NOT make all interactions too fast, hover should retain a floating slow pace",
  ],

  components: {
    button: {
      name: "按钮",
      description: "蒸汽波风格按钮，霓虹发光效果",
      code: `<button className="
  relative px-10 py-3
  bg-gradient-to-r from-[#ff71ce] via-[#b967ff] to-[#01cdfe] bg-[length:200%_auto]
  text-white font-black uppercase tracking-[0.3em]
  border-2 border-white/50
  shadow-[4px_4px_0_rgba(1,205,254,0.6)]
  hover:bg-right
  hover:shadow-[8px_8px_0_rgba(255,113,206,0.8),0_0_30px_rgba(185,103,255,0.5)]
  hover:-translate-y-1 hover:-rotate-2
  active:rotate-0 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none
  transition-all duration-300 ease-out
">
  A E S T H E T I C S
</button>`,
    },
    card: {
      name: "卡片",
      description: "蒸汽波风格卡片",
      code: `<div className="
  group p-8
  bg-[#2b0057]/60 backdrop-blur-xl
  border-t-2 border-l-2 border-[#ff71ce]/50 border-b-4 border-r-4 border-[#01cdfe]/50
  shadow-[0_10px_30px_rgba(255,113,206,0.2)]
  hover:shadow-[0_0_50px_rgba(1,205,254,0.4)]
  hover:-translate-y-2 hover:rotate-1
  transition-all duration-500
  relative overflow-hidden cursor-pointer
">
  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,113,206,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(1,205,254,0.2)_1px,transparent_1px)] bg-[size:15px_15px] opacity-20 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700" style={{ transform: "perspective(200px) rotateX(45deg)" }} />

  <div className="relative z-10">
    <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ff71ce] to-[#01cdfe] mb-3 tracking-[0.2em] group-hover:tracking-[0.4em] transition-all duration-500" style={{ textShadow: "2px 2px 0px rgba(185,103,255,0.5)" }}>
      V I R T U A L
    </h3>
    <div className="inline-block bg-[#01cdfe] text-[#2b0057] px-2 py-1 font-mono font-bold text-xs uppercase mb-4">
      Windows 95.exe
    </div>
    <p className="text-[#ff71ce] font-medium leading-relaxed drop-shadow-[0_0_5px_rgba(255,113,206,0.5)]">
      Welcome to the aesthetic dimension. Where marble statues cry digital tears and the mall music never stops playing.
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "蒸汽波风格输入框",
      code: `<input
  type="text"
  placeholder="输入..."
  className="
    w-full px-6 py-4
    bg-purple-900/50
    border-2 border-pink-500/50
    text-pink-100 placeholder-pink-300/50
    shadow-[0_0_15px_rgba(255,113,206,0.2)]
    focus:border-cyan-400
    focus:shadow-[0_0_25px_rgba(1,205,254,0.4)]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "蒸汽波风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-purple-900 via-pink-900 to-indigo-900
  relative overflow-hidden
">
  {/* Grid background */}
  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,113,206,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,113,206,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />

  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-6">
      VAPORWAVE
    </h1>
    <p className="text-xl text-pink-200/80 mb-8">
      アエステティック・ドリーム
    </p>
    <button className="
      px-10 py-4
      bg-gradient-to-r from-pink-500 to-cyan-500
      text-white font-bold uppercase
      shadow-[0_0_30px_rgba(255,113,206,0.5)]
      hover:shadow-[0_0_50px_rgba(255,113,206,0.7)]
      transition-all
    ">
      Enter the Dream
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Vaporwave 全局样式 */

:root {
  --vapor-pink: #ff71ce;
  --vapor-cyan: #01cdfe;
  --vapor-purple: #b967ff;
  --vapor-green: #05ffa1;
  --vapor-yellow: #fffb96;
}

/* 霓虹发光效果 */
.vapor-glow {
  text-shadow:
    0 0 10px var(--vapor-pink),
    0 0 20px var(--vapor-pink),
    0 0 40px var(--vapor-cyan);
}

/* 网格背景 */
.vapor-grid {
  background-image:
    linear-gradient(rgba(255, 113, 206, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 113, 206, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* 扫描线效果 */
.vapor-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1) 0px,
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}
@keyframes vaporwave-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes vaporwave-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.vaporwave-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(255, 113, 206, 0.08);
}

.vaporwave-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.vaporwave-animate-in {
  animation: vaporwave-fade-in 0.5s ease-out both;
}

.vaporwave-focus { outline: 2px solid var(--vaporwave-primary, currentColor); outline-offset: 2px; }

/* Responsive utilities */
@media (prefers-reduced-motion: reduce) {
  .vaporwave-animate-in {
    animation: none;
  }
}

@media (min-width: 768px) {
  .vaporwave-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
}

/* Print styles */
@media print {
  .vaporwave-gradient,
  .vaporwave-frosted {
    background: none;
    backdrop-filter: none;
  }
}`,

  aiRules: `你是一个 Vaporwave 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用单调的灰色或黑白配色
- 使用过于现代简约的设计
- 省略霓虹发光效果
- 使用正式的衬线字体

## 必须遵守

- 粉紫青渐变 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500
- 霓虹发光 shadow-[0_0_20px_rgba(255,113,206,0.5)]
- 深色背景 bg-purple-900, bg-pink-900
- 网格线背景装饰
- 大写字母和宽字距 uppercase tracking-wider

## 配色

主色调：
- 粉色: #ff71ce, from-pink-500
- 青色: #01cdfe, from-cyan-500
- 紫色: #b967ff, from-purple-500
- 绿色: #05ffa1
- 黄色: #fffb96

## 特殊元素

- 日文文字装饰
- 希腊雕塑图片
- 棕榈树、日落元素
- VHS 故障效果

## Animation & Interaction Rules

- Aesthetic Warp: hover 引入轻微旋转与位移，并驱动渐变流动（如 bg-[length:200%_auto] + hover:bg-right）。
- Glitch/Error Snap: active 使用突兀错位（如 translate-x / -translate-y），模拟旧系统故障弹窗反馈。
- Dual-Color Irradiation: 发光必须呈现粉色 #ff71ce 与青色 #01cdfe 双重散射重影。
- Floating Slowness: 非点击动画使用 duration-500 左右，营造互联网废墟中的缓慢漂浮感。

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

  aiRulesEn: `# Vaporwave / Neon Retro Design System

You are an expert frontend developer specializing in Vaporwave (蒸汽波) aesthetics. Generate all code strictly following these specifications.

## Style Identity
- **Name**: Vaporwave / Neon Retro / Synthwave
- **Category**: Retro, Expressive, High-Contrast
- **Essence**: 80s-90s retro-futurism, consumer nostalgia, digital decay, aesthetic irony
- **Mood**: Dreamy, nostalgic, surreal, melancholic yet vibrant
- **Inspiration**: 80s malls, VHS tapes, early internet, Greek statues, Japanese city pop

---

## Core Visual Principles

### 1. Background Foundation
\`\`\`
REQUIRED: Deep purple/pink gradient or solid dark colors
- bg-purple-900, bg-pink-900, bg-indigo-900
- bg-gradient-to-b from-purple-900 via-pink-900 to-indigo-900

Add grid overlay for depth:
bg-[linear-gradient(rgba(255,113,206,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,113,206,0.1)_1px,transparent_1px)]
bg-[size:50px_50px]
\`\`\`

### 2. Neon Glow System (Dual-Color)
\`\`\`
REQUIRED: Pink + Cyan dual glow (NOT single color)

TEXT GLOW:
style={{ textShadow: '2px 2px 0px rgba(185,103,255,0.5)' }}

ELEMENT GLOW:
shadow-[0_0_20px_rgba(255,113,206,0.5)]  // Pink
shadow-[0_0_20px_rgba(1,205,254,0.5)]    // Cyan
shadow-[4px_4px_0_rgba(1,205,254,0.6)]   // Hard offset shadow

DUAL IRRADIATION (ghosting effect):
shadow-[0_10px_30px_rgba(255,113,206,0.2)]
hover:shadow-[0_0_50px_rgba(1,205,254,0.4)]
\`\`\`

### 3. Gradient Text
\`\`\`jsx
<h1 className="text-transparent bg-clip-text 
  bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
  VAPORWAVE
</h1>
\`\`\`

### 4. Border System
\`\`\`
Asymmetric neon borders:
border-t-2 border-l-2 border-[#ff71ce]/50 
border-b-4 border-r-4 border-[#01cdfe]/50
\`\`\`

---

## Interaction Specifications

### Hover Effects (Aesthetic Warp)
| Element | Effect | Implementation |
|---------|--------|----------------|
| Buttons | Gradient flow + lift | bg-[length:200%_auto] hover:bg-right hover:-translate-y-1 |
| Cards | Rotate + shadow shift | hover:-translate-y-2 hover:rotate-1 hover:shadow-[0_0_50px_...] |
| Text | Letter spacing expand | group-hover:tracking-[0.4em] |

### Active State (Glitch/Error Snap)
\`\`\`
active:rotate-0 
active:translate-x-[6px] active:translate-y-[6px] 
active:shadow-none
\`\`\`
Simulates old system error popup — abrupt, offset displacement.

### Specular Sweep
\`\`\`jsx
<span className="absolute inset-0 
  bg-gradient-to-r from-transparent via-white/30 to-transparent 
  -translate-x-full 
  group-hover:translate-x-full 
  transition-transform duration-700" />
\`\`\`

---

## Animation Rules

### Interaction Physics
- **Aesthetic Warp**: Hover introduces slight rotation + displacement + gradient flow. Use \`bg-[length:200%_auto] hover:bg-right\`.
- **Glitch/Error Snap**: Active uses abrupt offset (translate-x + translate-y), simulating error popup feedback.
- **Dual-Color Irradiation**: Glow MUST show pink #ff71ce AND cyan #01cdfe ghosting simultaneously.
- **Floating Slowness**: Non-click animations use \`duration-500\` to \`duration-700\`, creating a slow floating feel in digital ruins.

### Timing Guidelines
| Interaction | Duration | Easing |
|-------------|----------|--------|
| Hover lift | 300-500ms | ease-out |
| Gradient flow | 500ms | ease-out |
| Active press | instant | — |
| Grid scale | 700ms | ease-in-out |

---

## Color Palette

### Primary Neon Colors
| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Neon Pink | #ff71ce | pink-400 | Primary, headlines |
| Neon Cyan | #01cdfe | cyan-400 | Links, accents |
| Neon Purple | #b967ff | purple-400 | Secondary |
| Neon Green | #05ffa1 | — | Highlights |
| Neon Yellow | #fffb96 | — | Special elements |

### Background & Surface
| Token | Value | Usage |
|-------|-------|-------|
| BG Deep | bg-purple-900 | Main background |
| BG Panel | bg-[#2b0057]/60 | Card backgrounds |
| Text Primary | text-pink-100 | Body text |
| Text Glow | text-[#ff71ce] | Emphasized text |

---

## Typography

| Element | Classes |
|---------|---------|
| Headlines | font-black uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-... |
| Body | font-medium leading-relaxed drop-shadow-[0_0_5px_rgba(255,113,206,0.5)] |
| Labels | font-mono font-bold text-xs uppercase |

---

## Special Elements

### Decorative Motifs
- Japanese text: アエステティック, 新しい, 仮想現実
- Greek statues/busts imagery
- Palm trees, sunset horizons
- VHS scanlines and glitch effects
- Windows 95/98 UI elements
- Perspective grid floors

### Grid Background
\`\`\`jsx
<div className="absolute inset-0 
  bg-[linear-gradient(rgba(255,113,206,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(1,205,254,0.2)_1px,transparent_1px)] 
  bg-[size:15px_15px] 
  opacity-20 group-hover:opacity-50 group-hover:scale-110 
  transition-all duration-700" 
  style={{ transform: "perspective(200px) rotateX(45deg)" }} />
\`\`\`

---

## Forbidden Patterns

| Pattern | Reason |
|---------|--------|
| Monotone gray/black-white | Destroys retro vibrancy |
| Modern minimalist design | Contradicts maximalist aesthetic |
| Omit neon glow | Loses vaporwave identity |
| Formal serif fonts | Wrong era, wrong mood |
| Single-color glow | Must have pink+cyan dual irradiation |
| Fast interactions | Use slow, dreamy timing |

---

## Responsive Guidelines

### Glow Scaling
\`\`\`
Mobile: shadow-[0_0_10px_...]
Desktop (md:): shadow-[0_0_20px_...]
\`\`\`

### Grid Size
\`\`\`
Mobile: bg-[size:30px_30px]
Desktop: bg-[size:50px_50px]
\`\`\`

---

## Self-Verification Checklist

Before outputting code, verify:
- [ ] Background is purple/pink gradient or deep purple solid
- [ ] Neon glows use BOTH pink AND cyan (dual irradiation)
- [ ] Grid line overlay present on major sections
- [ ] Gradient text for major headlines
- [ ] Hover includes rotation/displacement/gradient flow
- [ ] Active uses abrupt offset (glitch snap)
- [ ] Transitions use duration-500+ for floating feel
- [ ] Japanese decorative text where appropriate
- [ ] Asymmetric borders (thicker on bottom-right)`,

  examplePrompts: [
    {
      title: "复古音乐播放器",
      titleEn: "Retro Music Player",
      description: "80年代风格音乐界面",
      descriptionEn: "80s style music interface",
      prompt: `用 Vaporwave 风格创建一个音乐播放器界面，要求：
1. 背景：紫粉渐变 + 网格线
2. 专辑封面：带霓虹边框发光
3. 播放控制：霓虹按钮
4. 进度条：渐变色
5. 添加日文装饰文字`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 霓虹复古风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Neon Retro style",
      prompt: `Create a SaaS landing page using Neon Retro style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 霓虹复古风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Neon Retro style",
      prompt: `Create a portfolio showcase page using Neon Retro style with project grid, about section, contact form, and consistent visual language.`,
    }],
};
