import type { DesignStyle } from "./types";
import { neoBrutalistAtoms } from "./atoms";

export const neoBrutalist: DesignStyle = {
  atoms: neoBrutalistAtoms,
  slug: "neo-brutalist",
  name: "新野兽派",
  nameEn: "Neo-Brutalist",
  description:
    "大胆的黑色粗边框、硬边缘阴影、无圆角、高对比度配色。源于建筑野兽派，强调功能与原始美学。",
  descriptionEn:
    "Bold black thick borders, hard-edge shadows, no rounded corners, high-contrast color schemes. Inspired by architectural Brutalism, emphasizing function and raw aesthetics.",
  cover: "/styles/neo-brutalist.svg",
  styleType: "visual",
  tags: ["high-contrast"],
  category: "expressive",
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: ["#ff006e", "#ccff00", "#00d9ff", "#ff9500"],
  },
  keywords: ["粗边框", "硬阴影", "无圆角", "高对比", "功能主义", "expressive", "bold", "vibrant", "表现力", "张力"],
  keywordsEn: ["neo-brutalism", "neubrutalism", "brutalist web design", "bold borders", "hard shadows", "no rounded corners", "high contrast", "raw aesthetics", "brutalist ui", "black outlines", "landing page"],

  // 风格变体
  variants: [
    {
      id: "classic",
      name: "经典",
      nameEn: "Classic",
      description: "原始野兽派风格，纯黑边框，高对比度",
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        accent: ["#ff006e", "#ccff00", "#00d9ff", "#ff9500"],
      },
    },
    {
      id: "soft",
      name: "柔和",
      nameEn: "Soft",
      description: "较细边框，灰色阴影，马卡龙色调，温和对比",
      colors: {
        primary: "#1a1a1a",
        secondary: "#f5f5f5",
        accent: ["#f472b6", "#a3e635", "#38bdf8", "#fbbf24"],
      },
      cssOverrides: `
/* Soft variant overrides */
.brutal-border { border-width: 2px; border-color: #374151; }
.brutal-shadow { box-shadow: 4px 4px 0 rgba(0,0,0,0.2); }
`,
    },
    {
      id: "playful",
      name: "俏皮",
      nameEn: "Playful",
      description: "多彩配色，元素倾斜，活泼动效，年轻化",
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        accent: ["#ff6b6b", "#4ecdc4", "#ffe66d", "#95e1d3", "#f38181"],
      },
      cssOverrides: `
/* Playful variant overrides */
.brutal-card { transform: rotate(-1deg); }
.brutal-card:nth-child(even) { transform: rotate(1deg); }
.brutal-button:hover { transform: scale(1.05); }
`,
    },
  ],

  philosophy: `Neo-Brutalist（新野兽派）设计风格源于建筑领域的野兽派运动，强调原始、未经修饰的功能美学。在 Web 设计中，这种风格通过大胆的黑色边框、硬边缘阴影、锐利的直角和高对比度的配色方案来表达。

核心理念：
- 功能优先：每个元素都有明确的目的
- 诚实表达：不掩饰结构，不伪装功能
- 大胆直接：用视觉冲击力传达信息
- 反对圆滑：拒绝过度精致，拥抱粗犷

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Neo-Brutalist design style originates from the Brutalist movement in architecture, emphasizing raw, unadorned functional aesthetics. In web design, this style is expressed through bold black borders, hard-edge shadows, sharp right angles, and high-contrast color schemes.

Core principles:
- Function first: Every element has a clear purpose
- Honest expression: No hiding structure, no disguising function
- Bold and direct: Communicate through visual impact
- Anti-polish: Reject over-refinement, embrace rawness`,

  doList: [
    "使用纯黑边框 border-black border-2 md:border-4",
    "使用硬边缘阴影 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    "保持直角 rounded-none",
    "使用高对比度配色（黑白为主 + 鲜艳强调色）",
    "标题使用 font-black，正文使用 font-mono",
    "所有样式包含移动端和桌面端响应式值",
    "按钮 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none，位移量必须等于原始阴影像素值（Physical Crushing，实体完全压平）",
    "Hover 时瞬间切换高对比背景色（如 hover:bg-[#ffff00]）并增大阴影（Brutal Snap，禁止使用渐变或 opacity 过渡）",
    "卡片 hover 使用 ease-out duration-150，保持生猛的碰撞感",
    "按钮 hover 时增大阴影并向左上角偏移：hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]",
  ],

  doListEn: [
    "Use pure black borders border-black border-2 md:border-4",
    "Use hard-edge shadows shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    "Keep sharp corners rounded-none",
    "Use high-contrast color schemes (black and white primary + vivid accent colors)",
    "Headings use font-black, body text uses font-mono",
    "All styles include mobile and desktop responsive values",
    "Button active:translate-x-[6px] active:translate-y-[6px] active:shadow-none, displacement must equal original shadow pixel value (Physical Crushing, fully flattened)",
    "Hover instantly switches to high-contrast background color (e.g. hover:bg-[#ffff00]) and enlarges shadow (Brutal Snap, no gradients or opacity transitions allowed)",
    "Card hover uses ease-out duration-150, maintaining raw collision feel",
    "Button hover enlarges shadow and offsets toward upper-left: hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]",
  ],

  dontList: [
    "禁止使用圆角 rounded-lg, rounded-md, rounded-xl",
    "禁止使用模糊阴影 shadow-lg, shadow-xl, shadow-2xl",
    "禁止使用渐变 bg-gradient-*",
    "禁止使用灰色边框 border-gray-*, border-slate-*",
    "禁止使用淡入淡出的半透明效果",
    "禁止使用 rounded-full（装饰圆除外）",
    "禁止按钮 active 状态位移量小于原始阴影像素值（未完全压平，失去碾压感）",
    "禁止 hover 背景色切换使用渐变或 opacity 过渡（必须是硬切，duration-150 ease-out）",
    "禁止按钮 hover 时仅用位移替代阴影消失（hover 应增大阴影强调力量，active 才是完全压平）",
  ],

  dontListEn: [
    "Do not use rounded corners rounded-lg, rounded-md, rounded-xl",
    "Do not use blurred shadows shadow-lg, shadow-xl, shadow-2xl",
    "Do not use gradients bg-gradient-*",
    "Do not use gray borders border-gray-*, border-slate-*",
    "Do not use fade-in/fade-out semi-transparent effects",
    "Do not use rounded-full (except for decorative circles)",
    "Do not let button active state displacement be less than original shadow pixel value (not fully flattened, loses crushing feel)",
    "Do not use gradients or opacity transitions for hover background color switch (must be hard-cut, duration-150 ease-out)",
    "Do not use only displacement to replace shadow disappearance on button hover (hover should enlarge shadow to emphasize power, active is for full flattening)",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Neo-Brutalist 风格的按钮，Physical Crushing 完全压平 + Brutal Snap 生猛反馈",
      code: `<button className="
  bg-[#ff006e] text-white font-black uppercase text-lg
  px-8 py-4
  border-4 border-black
  shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
  hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]
  hover:-translate-y-1 hover:-translate-x-1
  active:translate-x-[6px] active:translate-y-[6px]
  active:shadow-none
  transition-all duration-150 ease-out
">
  Click Hard
</button>`,
      preview: `<button class="bg-[#ff006e] text-white font-black px-6 py-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">点击我</button>`,
    },
    card: {
      name: "卡片",
      description: "带有黑色边框和硬阴影的卡片组件，Brutal Snap 亮黄背景闪击 + Physical Crushing 左上偏移",
      code: `<div className="
  group bg-white
  border-4 border-black
  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
  hover:shadow-[12px_12px_0px_0px_rgba(255,0,110,1)]
  hover:-translate-y-1 hover:-translate-x-1
  hover:bg-[#ffff00]
  transition-all duration-150 ease-out
  p-8 cursor-pointer
">
  <h3 className="font-black text-xl mb-2 group-hover:tracking-wider transition-all duration-150">Neo-Brutalism</h3>
  <p className="font-mono text-base text-gray-700">
    Raw, bold, unapologetic design.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Neo-Brutalist 风格的表单输入框",
      code: `<input
  type="text"
  placeholder="请输入..."
  className="
    w-full
    px-3 py-2 md:px-4 md:py-3
    border-2 md:border-4 border-black
    bg-white
    font-mono text-sm md:text-base
    focus:outline-none
    focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
    md:focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
    transition-shadow
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "带有底部边框的导航栏",
      code: `<nav className="
  bg-white
  border-b-2 md:border-b-4 border-black
  px-4 md:px-8
  py-3 md:py-4
">
  <div className="flex items-center justify-between max-w-6xl mx-auto">
    <a href="/" className="font-black text-xl md:text-2xl tracking-wider">
      LOGO
    </a>
    <div className="flex gap-4 md:gap-8">
      <a href="#" className="font-mono text-sm md:text-base hover:text-[#ff006e] transition-colors">
        首页
      </a>
      <a href="#" className="font-mono text-sm md:text-base hover:text-[#ff006e] transition-colors">
        关于
      </a>
      <a href="#" className="font-mono text-sm md:text-base hover:text-[#ff006e] transition-colors">
        联系
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "大标题的 Hero 展示区域",
      code: `<section className="
  min-h-[60vh] md:min-h-[80vh]
  flex items-center
  px-4 md:px-8
  py-12 md:py-0
  bg-[#ccff00]
  border-b-2 md:border-b-4 border-black
">
  <div className="max-w-4xl mx-auto">
    <h1 className="
      font-black
      text-4xl md:text-6xl lg:text-8xl
      leading-tight
      tracking-tight
      mb-4 md:mb-6
    ">
      大胆的<br />
      设计宣言
    </h1>
    <p className="
      font-mono
      text-base md:text-xl
      max-w-xl
      mb-6 md:mb-8
    ">
      Neo-Brutalist 风格，原始而有力
    </p>
    <button className="
      bg-black text-white font-black
      px-6 py-3 md:px-8 md:py-4
      border-2 md:border-4 border-black
      shadow-[4px_4px_0px_0px_rgba(255,0,110,1)]
      md:shadow-[8px_8px_0px_0px_rgba(255,0,110,1)]
      hover:shadow-none
      hover:translate-x-[2px] hover:translate-y-[2px]
      md:hover:translate-x-[4px] md:hover:translate-y-[4px]
      transition-all
      text-sm md:text-base
    ">
      开始探索
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Neo-Brutalist 全局样式 */
:root {
  --accent-pink: #ff006e;
  --accent-green: #ccff00;
  --accent-blue: #00d9ff;
  --accent-yellow: #ff9500;
}

/* 标题字体 */
h1, h2, h3, h4, h5, h6 {
  font-weight: 900;
  letter-spacing: -0.02em;
}

/* 正文字体 */
body {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

/* 选中文字样式 */
::selection {
  background: var(--accent-pink);
  color: white;
}
@keyframes neo-brutalist-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes neo-brutalist-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.neo-brutalist-card {
  position: relative;
  overflow: hidden;
}

.neo-brutalist-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.05), transparent);
  pointer-events: none;
}

.neo-brutalist-card:hover::before {
  opacity: 1;
}

.neo-brutalist-gradient {
  background: linear-gradient(135deg, #000000, #ff006e);
}

.neo-brutalist-gradient-text {
  background: linear-gradient(135deg, #000000, #ff006e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.neo-brutalist-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(0, 0, 0, 0.08);
}

.neo-brutalist-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.neo-brutalist-animate-in {
  animation: neo-brutalist-fade-in 0.5s ease-out both;
}`,

  aiRules: `你是一个 Neo-Brutalist 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 圆角：rounded-lg, rounded-md, rounded-xl, rounded-full（用于装饰圆除外）
- 模糊阴影：shadow-lg, shadow-xl, shadow-2xl, shadow-md
- 渐变：bg-gradient-*
- 灰色边框：border-gray-*, border-slate-*
- 淡入淡出的半透明效果

## 必须遵守

- 无圆角或 rounded-none
- 硬边缘阴影 shadow-[Xpx_Xpx_0px_0px_rgba(0,0,0,1)]
- 纯黑边框 border-black
- hover 时阴影消失 + translate 位移
- 标题 font-black，正文 font-mono

## 配色

主色：黑 #000000、白 #ffffff
强调色：
- accent-pink: #ff006e（CTA、hover）
- accent-green: #ccff00（成功、装饰）
- accent-blue: #00d9ff（链接、信息）
- accent-yellow: #ff9500（标签、警示）

## 响应式规则

所有样式必须包含移动端和桌面端两套值：
- 间距：p-4 md:p-8, py-12 md:py-32
- 边框：border-2 md:border-4
- 阴影：shadow-[4px] md:shadow-[8px]
- 字号：text-sm md:text-base, text-xl md:text-3xl
- 移动端约为桌面端的 50%

## Animation & Interaction Rules

- Physical Crushing: 按钮 active:translate-x-[Npx] active:translate-y-[Npx] active:shadow-none，N 必须等于原始阴影像素值，实现实体完全压平的碾压感。
- Brutal Snap: hover 时瞬间切换高对比背景色（如 hover:bg-[#ffff00]），duration-150 ease-out，禁止渐变或 opacity 过渡——必须是硬切。
- Zero Rounding Easing: 所有过渡 ease-out duration-150，保持生猛的碰撞感，拒绝柔化。
- Heavy Focus: 卡片 hover 时增大阴影并换为彩色（rgba(255,0,110,1)），同时背景变色，强调物理冲击。

## 自检

每次生成代码后检查：
1. 没有圆角
2. 没有模糊阴影
3. 边框是纯黑
4. active 位移量等于阴影像素值
5. 有 md: 响应式前缀`,

  aiRulesEn: `# Neo-Brutalist Design System

You are an expert frontend developer specializing in Neo-Brutalist web design. Generate all code strictly following these specifications.

## Style Identity
- **Name**: Neo-Brutalist / Web Brutalism
- **Category**: Expressive, High-Contrast
- **Essence**: Raw, honest, unapologetic — function over form, rejection of polish
- **Mood**: Bold, confrontational, playful-aggressive, anti-corporate
- **Inspiration**: Architectural Brutalism, punk zines, early web, Swiss posters

---

## Core Visual Principles

### 1. Border System (CRITICAL)
\`\`\`
REQUIRED: Pure black borders
border-black border-2 md:border-4

NEVER use: border-gray-*, border-slate-*, border-neutral-*
\`\`\`

### 2. Shadow System (Hard-Edge Only)
\`\`\`
REQUIRED FORMAT:
shadow-[Xpx_Xpx_0px_0px_rgba(0,0,0,1)]

Examples:
Mobile: shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
Desktop: shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]

FORBIDDEN: shadow-sm, shadow-md, shadow-lg, shadow-xl, shadow-2xl
(No blur allowed — hard edges only)
\`\`\`

### 3. Corner Radius
\`\`\`
REQUIRED: rounded-none
Sharp corners everywhere

FORBIDDEN: rounded-lg, rounded-md, rounded-xl, rounded-2xl
(Exception: rounded-full for intentional decorative circles only)
\`\`\`

### 4. Typography
\`\`\`
HEADINGS: font-black (900 weight)
BODY: font-mono
LABELS: font-mono uppercase tracking-wider
\`\`\`

---

## Interaction Specifications

### Button States (Physical Crushing)
| State | Effect | Implementation |
|-------|--------|----------------|
| Default | Raised with shadow | shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] |
| Hover | Shadow enlarges + offset | hover:shadow-[10px_10px_0px_0px...] hover:-translate-y-1 hover:-translate-x-1 |
| Active | FULLY FLATTENED | active:translate-x-[6px] active:translate-y-[6px] active:shadow-none |

**CRITICAL**: Active displacement MUST equal original shadow pixel value. This creates the "physical crushing" — button is fully pressed into the surface.

### Card Hover (Brutal Snap)
\`\`\`jsx
<div className="group bg-white border-4 border-black
  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
  hover:shadow-[12px_12px_0px_0px_rgba(255,0,110,1)]
  hover:-translate-y-1 hover:-translate-x-1
  hover:bg-[#ffff00]
  transition-all duration-150 ease-out">
  ...
</div>
\`\`\`

**CRITICAL**: Hover background color switch must be INSTANT (hard cut). NO gradients, NO opacity fade. Use duration-150 ease-out for position/shadow only.

---

## Animation Rules

### Interaction Physics
- **Physical Crushing**: Button active displacement EQUALS shadow offset. \`active:translate-x-[6px] active:translate-y-[6px] active:shadow-none\` for a 6px shadow.
- **Brutal Snap**: Hover switches to high-contrast background INSTANTLY. Hard cut, no fade. \`hover:bg-[#ffff00]\`
- **Zero Rounding Easing**: All transitions use \`ease-out duration-150\`. Raw collision feel. No soft spring physics.
- **Heavy Focus**: Card hover enlarges shadow AND changes shadow color to accent (pink/magenta).

### Timing Guidelines
| Interaction | Duration | Easing |
|-------------|----------|--------|
| Hover transform | 150ms | ease-out |
| Active press | instant | — |
| Shadow change | 150ms | ease-out |
| Color snap | 0ms | instant |

---

## Color Palette

### Primary
| Token | Value | Usage |
|-------|-------|-------|
| Black | #000000 | Borders, text, shadows |
| White | #ffffff | Backgrounds |

### Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Pink | #ff006e | CTAs, hover effects |
| Green | #ccff00 | Success, hero backgrounds |
| Blue | #00d9ff | Links, info |
| Yellow | #ff9500 | Tags, warnings |
| Bright Yellow | #ffff00 | Hover backgrounds |

### Shadow Colors
\`\`\`
Default: rgba(0,0,0,1)
Hover accent: rgba(255,0,110,1)
\`\`\`

---

## Typography

| Element | Classes |
|---------|---------|
| H1 | font-black text-4xl md:text-6xl lg:text-8xl tracking-tight leading-tight |
| H2 | font-black text-2xl md:text-4xl |
| H3 | font-black text-xl md:text-2xl |
| Body | font-mono text-sm md:text-base leading-relaxed |
| Labels | font-mono text-xs uppercase tracking-wider |
| CTA | font-black uppercase text-lg |

---

## Responsive Guidelines

### Scale Ratio
Mobile values are approximately 50% of desktop values.

### Borders
\`\`\`
border-2 md:border-4
\`\`\`

### Shadows
\`\`\`
shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
\`\`\`

### Spacing
\`\`\`
p-4 md:p-8
py-12 md:py-24
gap-4 md:gap-8
\`\`\`

### Typography
\`\`\`
text-sm md:text-base
text-xl md:text-3xl
text-4xl md:text-6xl lg:text-8xl
\`\`\`

---

## Component Templates

### Button
\`\`\`jsx
<button className="
  bg-[#ff006e] text-white font-black uppercase text-lg
  px-8 py-4 border-4 border-black
  shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
  hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]
  hover:-translate-y-1 hover:-translate-x-1
  active:translate-x-[6px] active:translate-y-[6px]
  active:shadow-none
  transition-all duration-150 ease-out">
  Click Hard
</button>
\`\`\`

### Card
\`\`\`jsx
<div className="group bg-white border-4 border-black
  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
  hover:shadow-[12px_12px_0px_0px_rgba(255,0,110,1)]
  hover:-translate-y-1 hover:-translate-x-1
  hover:bg-[#ffff00]
  transition-all duration-150 ease-out
  p-8 cursor-pointer">
  <h3 className="font-black text-xl mb-2 
    group-hover:tracking-wider transition-all duration-150">
    Neo-Brutalism
  </h3>
  <p className="font-mono text-base text-gray-700">
    Raw, bold, unapologetic design.
  </p>
</div>
\`\`\`

---

## Forbidden Patterns

| Pattern | Reason |
|---------|--------|
| rounded-lg, rounded-md, rounded-xl | Softens brutalist edges |
| shadow-lg, shadow-xl, shadow-2xl | Blur violates hard-edge principle |
| bg-gradient-* | Gradients are too polished |
| border-gray-*, border-slate-* | Must use pure black borders |
| Fade/opacity transitions | Must use hard cuts |
| rounded-full (general use) | Only for decorative circles |
| Active displacement < shadow value | Fails to achieve full crushing |
| Hover opacity fade | Must snap to new color |

---

## Self-Verification Checklist

Before outputting code, verify:
- [ ] NO rounded corners (except intentional decorative circles)
- [ ] Shadows are hard-edge format: shadow-[Xpx_Xpx_0px_0px_rgba...]
- [ ] Borders are pure black: border-black
- [ ] Button active displacement = original shadow pixel value
- [ ] Hover background changes are instant (hard cut, no fade)
- [ ] Transitions use duration-150 ease-out
- [ ] Font-black for headings, font-mono for body
- [ ] Has responsive md: prefixes for borders, shadows, spacing
- [ ] Mobile values ≈ 50% of desktop values`,

  examplePrompts: [
    {
      title: "SaaS 产品着陆页",
      titleEn: "SaaS Product Landing Page",
      description: "包含 Hero、特性卡片、定价表、CTA",
      descriptionEn: "Includes Hero, feature cards, pricing table, CTA",
      prompt: `用 Neo-Brutalist 风格生成一个 SaaS 产品着陆页，要求：
1. Hero 区域：大标题使用 font-black，鲜艳背景色（如 #ccff00），黑色粗边框按钮
2. 特性区域：3 个卡片，每个有硬边缘阴影，hover 时阴影变为粉色
3. 定价表：3 列，中间推荐列用强调色背景
4. CTA：全宽黑色背景，白色大标题，粉色按钮
所有元素必须：无圆角、黑色粗边框、硬边缘阴影、hover 位移效果`,
      promptEn: `Generate a SaaS product landing page using Neo-Brutalist style with the following requirements:
1. Hero section: large title using font-black, vivid background color (e.g. #ccff00), black thick-bordered buttons
2. Features section: 3 cards, each with hard-edge shadow, shadow turns pink on hover
3. Pricing table: 3 columns, recommended column uses accent color background
4. CTA: full-width black background, large white title, pink button
All elements must have: no rounded corners, black thick borders, hard-edge shadows, hover translate effects`,
    },
    {
      title: "博客文章页",
      titleEn: "Blog Article Page",
      description: "包含标题、作者信息、正文、相关文章",
      descriptionEn: "Includes title, author info, content, related posts",
      prompt: `用 Neo-Brutalist 风格创建一个博客文章页面，要求：
1. 顶部：超大标题 font-black，作者信息带头像
2. 正文：使用 font-mono，段落间距适中
3. 侧边栏：相关文章卡片，有硬边缘阴影
4. 分享按钮：图标按钮带黑色边框，hover 位移
所有元素遵循 Neo-Brutalist 规范：无圆角、纯黑边框、高对比配色`,
      promptEn: `Create a blog article page using Neo-Brutalist style with the following requirements:
1. Top: extra-large title with font-black, author info with avatar
2. Body text: use font-mono, moderate paragraph spacing
3. Sidebar: related article cards with hard-edge shadows
4. Share buttons: icon buttons with black borders, translate on hover
All elements must follow Neo-Brutalist rules: no rounded corners, pure black borders, high-contrast colors`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "网格布局展示项目作品",
      descriptionEn: "Grid layout to showcase projects",
      prompt: `用 Neo-Brutalist 风格设计一个作品集页面，要求：
1. 导航栏：左侧 Logo 用 font-black，右侧链接 font-mono
2. Hero：个人介绍，使用鲜艳背景色块
3. 作品网格：2-3 列布局，每个卡片有缩略图和标题
4. 卡片效果：黑色粗边框，hover 时阴影变色 + 轻微上移
5. 联系区：简洁表单，输入框 focus 时出现硬阴影`,
      promptEn: `Design a portfolio page using Neo-Brutalist style with the following requirements:
1. Navbar: left-side Logo with font-black, right-side links with font-mono
2. Hero: personal introduction with vivid background color blocks
3. Project grid: 2-3 column layout, each card with thumbnail and title
4. Card effects: black thick borders, shadow color change + slight upward shift on hover
5. Contact section: clean form, hard shadow appears on input focus`,
    },
  ],
};
