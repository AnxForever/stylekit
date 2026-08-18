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
  keywordsEn: ["vaporwave", "synthwave", "retrowave", "neon retro", "80s aesthetic", "cyberpunk", "neon gradient", "glitch art", "retro futurism", "outrun", "neon grid", "vaporwave website"],

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

  aiRules: `# Vaporwave / 霓虹复古 设计系统

你是一个专精 Vaporwave（蒸汽波）美学的前端开发专家。生成的所有代码必须严格遵循以下规范。

## 风格身份
- **名称**：Vaporwave / 霓虹复古 / Synthwave（合成波）
- **类别**：复古、表现力强、高对比度
- **本质**：80-90 年代复古未来主义、消费主义怀旧、数字腐朽感、审美反讽
- **情绪基调**：梦幻、怀旧、超现实，忧郁中带着张扬的活力
- **灵感来源**：80 年代商场、VHS 录像带、早期互联网、希腊雕塑、日本 City Pop

---

## 核心视觉原则

### 1. 背景基础
\`\`\`
REQUIRED: Deep purple/pink gradient or solid dark colors
- bg-purple-900, bg-pink-900, bg-indigo-900
- bg-gradient-to-b from-purple-900 via-pink-900 to-indigo-900

Add grid overlay for depth:
bg-[linear-gradient(rgba(255,113,206,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,113,206,0.1)_1px,transparent_1px)]
bg-[size:50px_50px]
\`\`\`

### 2. 霓虹发光系统（双色）
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

### 3. 渐变文字
\`\`\`jsx
<h1 className="text-transparent bg-clip-text 
  bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
  VAPORWAVE
</h1>
\`\`\`

### 4. 边框系统
\`\`\`
Asymmetric neon borders:
border-t-2 border-l-2 border-[#ff71ce]/50 
border-b-4 border-r-4 border-[#01cdfe]/50
\`\`\`

---

## 交互规范

### Hover 效果（Aesthetic Warp）
| 元素 | 效果 | 实现 |
|---------|--------|----------------|
| 按钮 | 渐变流动 + 上浮 | bg-[length:200%_auto] hover:bg-right hover:-translate-y-1 |
| 卡片 | 旋转 + 阴影偏移 | hover:-translate-y-2 hover:rotate-1 hover:shadow-[0_0_50px_...] |
| 文字 | 字距扩展 | group-hover:tracking-[0.4em] |

### Active 状态（Glitch/Error Snap）
\`\`\`
active:rotate-0 
active:translate-x-[6px] active:translate-y-[6px] 
active:shadow-none
\`\`\`
模拟旧系统错误弹窗式反馈：突兀的错位位移。

### 高光扫光（Specular Sweep）
\`\`\`jsx
<span className="absolute inset-0 
  bg-gradient-to-r from-transparent via-white/30 to-transparent 
  -translate-x-full 
  group-hover:translate-x-full 
  transition-transform duration-700" />
\`\`\`

---

## 动画规则

### 交互物理特性
- **Aesthetic Warp**: Hover 引入轻微旋转、位移与渐变流动。使用 \`bg-[length:200%_auto] hover:bg-right\`。
- **Glitch/Error Snap**: Active 使用突兀的偏移（translate-x + translate-y），模拟错误弹窗式反馈。
- **Dual-Color Irradiation**: 发光必须同时呈现粉色 #ff71ce 与青色 #01cdfe 的双重重影。
- **Floating Slowness**: 非点击动画使用 \`duration-500\` 到 \`duration-700\`，营造数字废墟中缓慢漂浮的感觉。

### 时序指南
| 交互 | 时长 | 缓动 |
|-------------|----------|--------|
| Hover 上浮 | 300-500ms | ease-out |
| 渐变流动 | 500ms | ease-out |
| Active 按下 | instant | — |
| 网格缩放 | 700ms | ease-in-out |

---

## 配色

### 主霓虹色
| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| 霓虹粉 | #ff71ce | pink-400 | 主色、标题 |
| 霓虹青 | #01cdfe | cyan-400 | 链接、强调色 |
| 霓虹紫 | #b967ff | purple-400 | 次要色 |
| 霓虹绿 | #05ffa1 | — | 高亮 |
| 霓虹黄 | #fffb96 | — | 特殊元素 |

### 背景与表面
| Token | Value | Usage |
|-------|-------|-------|
| 深背景 | bg-purple-900 | 主背景 |
| 面板背景 | bg-[#2b0057]/60 | 卡片背景 |
| 主文字 | text-pink-100 | 正文文字 |
| 发光文字 | text-[#ff71ce] | 强调文字 |

---

## 排版

| 元素 | 类名 |
|---------|---------|
| 标题 | font-black uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-... |
| 正文 | font-medium leading-relaxed drop-shadow-[0_0_5px_rgba(255,113,206,0.5)] |
| 标签 | font-mono font-bold text-xs uppercase |

---

## 特殊元素

### 装饰元素
- 日文文字：アエステティック、新しい、仮想現実
- 希腊雕像/半身像意象
- 棕榈树、日落地平线
- VHS 扫描线与故障效果
- Windows 95/98 界面元素
- 透视网格地面

### 网格背景
\`\`\`jsx
<div className="absolute inset-0 
  bg-[linear-gradient(rgba(255,113,206,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(1,205,254,0.2)_1px,transparent_1px)] 
  bg-[size:15px_15px] 
  opacity-20 group-hover:opacity-50 group-hover:scale-110 
  transition-all duration-700" 
  style={{ transform: "perspective(200px) rotateX(45deg)" }} />
\`\`\`

---

## 禁止事项

| 模式 | 原因 |
|---------|--------|
| 单调灰色/黑白配色 | 破坏复古的鲜活感 |
| 现代极简设计 | 与极繁美学相悖 |
| 省略霓虹发光 | 丧失蒸汽波辨识度 |
| 正式衬线字体 | 年代错位、氛围不对 |
| 单色发光 | 必须呈现粉青双色重影 |
| 过快的交互 | 应使用缓慢梦幻的节奏 |

---

## 响应式指南

### 发光缩放
\`\`\`
Mobile: shadow-[0_0_10px_...]
Desktop (md:): shadow-[0_0_20px_...]
\`\`\`

### 网格尺寸
\`\`\`
Mobile: bg-[size:30px_30px]
Desktop: bg-[size:50px_50px]
\`\`\`

---

## 自检清单

输出代码前，请确认：
- [ ] 背景是紫粉渐变或纯深紫色
- [ ] 霓虹发光同时使用粉色与青色（双色重影）
- [ ] 主要区块上叠加了网格线
- [ ] 主标题使用渐变文字
- [ ] Hover 包含旋转/位移/渐变流动
- [ ] Active 使用突兀偏移（glitch snap）
- [ ] 过渡时长在 duration-500 以上，营造漂浮感
- [ ] 合适位置有日文装饰文字
- [ ] 边框是非对称的（右下更粗）`,

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
