import type { DesignStyle } from "./types";

export const neumorphism: DesignStyle = {
  slug: "neumorphism",
  name: "新拟物派",
  nameEn: "Neumorphism",
  description:
    "柔和的内凹外凸立体效果，通过双重阴影模拟光源，浅色背景配同色系元素，营造精致的立体感。",
  descriptionEn:
    "Soft concave and convex 3D effects using dual shadows to simulate light sources. Light backgrounds with same-tone elements create a refined sense of depth.",
  cover: "/styles/neumorphism.svg",
  styleType: "visual",
  tags: [],
  category: "modern",
  colors: {
    primary: "#e0e5ec",
    secondary: "#d1d9e6",
    accent: ["#6d5dfc", "#ff6b6b", "#4ecdc4", "#ffe66d"],
  },
  keywords: ["立体感", "双重阴影", "柔和", "浅色系", "内凹外凸", "modern", "contemporary", "sleek", "现代", "简洁"],
  keywordsEn: ["neumorphism", "neomorphism", "soft ui", "soft shadows", "dual shadows", "embossed", "inset shadow", "extruded", "skeuomorphism", "light theme", "3d buttons", "smart home dashboard"],

  philosophy: `Neumorphism（新拟物派）是一种介于扁平设计和拟物设计之间的风格，通过柔和的阴影创造出元素从背景中"挤压"或"凹陷"的视觉效果。

核心理念：
- 柔和立体：通过双重阴影（亮/暗）模拟自然光源
- 同色系统一：元素与背景使用相同或相近的颜色
- 触感直觉：凸起表示可交互，凹陷表示已激活或输入区
- 克制装饰：避免过多颜色和对比，保持整体柔和感

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Neumorphism is a style between flat design and skeuomorphism, creating the visual effect of elements being "extruded" or "recessed" from the background through soft shadows.

Core principles:
- Soft dimensionality: Simulate natural light sources through dual shadows (light/dark)
- Monochromatic unity: Elements and background use the same or similar colors
- Tactile intuition: Raised indicates interactive, recessed indicates activated or input area
- Restrained decoration: Avoid excessive colors and contrast, maintain overall softness`,

  doList: [
    "使用浅色背景 bg-[#e0e5ec] 或 bg-[#f0f0f3]",
    "使用双重阴影 shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]",
    "凹陷效果使用 inset 阴影 shadow-[inset_8px_8px_16px_#b8bcc2,inset_-8px_-8px_16px_#ffffff]",
    "使用中等圆角 rounded-xl (12-24px)",
    "交互元素按下时从凸起变凹陷",
    "保持元素与背景同色系",
    "响应式阴影大小 md: 前缀增大",
    "按钮 hover 时减小外阴影（Hover Shadowing，手指靠近遮光效果）：从 shadow-[8px_8px_16px...] 减至 shadow-[4px_4px_8px...]",
    "按钮 active 必须从外凸转为内凹（Extrude to Intrude）：active:shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]，禁止使用 translate 位移",
    "所有过渡使用 duration-300 ease-in-out（Smooth Molding，软塑料柔韧性）",
    "输入框 focus 时减小内阴影深度（惰性收缩，非增强）：从 inset 6px 减至 inset 2px，暗示输入通道打开",
    "光源方向始终固定为左上亮、右下暗（Fixed Illuminant）：负 X/Y 偏移 = 白色高光，正 X/Y 偏移 = 暗色阴影",
  ],

  doListEn: [
    "Use light backgrounds bg-[#e0e5ec] or bg-[#f0f0f3]",
    "Use dual shadows shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]",
    "Recessed effect uses inset shadows shadow-[inset_8px_8px_16px_#b8bcc2,inset_-8px_-8px_16px_#ffffff]",
    "Use medium rounded corners rounded-xl (12-24px)",
    "Interactive elements switch from raised to recessed when pressed",
    "Keep elements in the same color family as the background",
    "Responsive shadow sizes with md: prefix for larger values",
    "Button hover reduces outer shadow (Hover Shadowing, finger approaching blocks light): from shadow-[8px_8px_16px...] down to shadow-[4px_4px_8px...]",
    "Button active must switch from raised to recessed (Extrude to Intrude): active:shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff], no translate displacement allowed",
    "All transitions use duration-300 ease-in-out (Smooth Molding, soft plastic flexibility)",
    "Input focus reduces inner shadow depth (inert contraction, not enhancement): from inset 6px down to inset 2px, suggesting the input channel opens",
    "Light source direction always fixed as upper-left bright, lower-right dark (Fixed Illuminant): negative X/Y offset = white highlight, positive X/Y offset = dark shadow",
  ],

  dontList: [
    "禁止使用纯黑或纯白背景",
    "禁止使用硬边缘阴影 shadow-[Xpx_Xpx_0px]",
    "禁止使用高对比度配色",
    "禁止使用粗边框 border-2 及以上",
    "禁止使用渐变背景 bg-gradient-*",
    "禁止直角 rounded-none",
    "禁止按钮使用任何 translate 位移（新拟物元素是长在背景上的，不可浮起）",
    "禁止 hover 时增大阴影（与光影物理规律相悖，手指靠近应使阴影缩小）",
    "禁止打破光源方向（亮阴影必须在左上 -X/-Y，暗阴影必须在右下 +X/+Y）",
    "禁止输入框 focus 时增大内阴影（应减小，模拟通道开放而非加压）",
  ],

  dontListEn: [
    "Do not use pure black or pure white backgrounds",
    "Do not use hard-edge shadows shadow-[Xpx_Xpx_0px]",
    "Do not use high-contrast color schemes",
    "Do not use thick borders border-2 and above",
    "Do not use gradient backgrounds bg-gradient-*",
    "Do not use sharp corners rounded-none",
    "Do not use any translate displacement on buttons (neumorphic elements grow from the background, they cannot float)",
    "Do not enlarge shadows on hover (contradicts light physics, finger approaching should shrink shadows)",
    "Do not break light source direction (bright shadow must be upper-left -X/-Y, dark shadow must be lower-right +X/+Y)",
    "Do not enlarge inner shadow on input focus (should reduce, simulating channel opening not pressurizing)",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Neumorphism 风格按钮，Hover Shadowing 缩小阴影 + Extrude to Intrude 转为内凹",
      code: `<button className="
  bg-[#e0e5ec] text-gray-600 font-bold tracking-wide
  px-8 py-4 rounded-xl
  shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]
  hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]
  hover:text-gray-800
  active:shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]
  transition-all duration-300 ease-in-out
">
  Squeeze Me
</button>`,
    },
    card: {
      name: "卡片",
      description: "Neumorphism 风格卡片容器，柔和的凸起效果",
      code: `<div className="
  bg-[#e0e5ec] rounded-2xl p-10
  shadow-[10px_10px_20px_#b8bcc2,-10px_-10px_20px_#ffffff]
  hover:shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff]
  transition-shadow duration-300 ease-in-out
">
  <h3 className="text-gray-800 font-semibold text-lg mb-2">卡片标题</h3>
  <p className="text-gray-600">卡片内容描述文字</p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Neumorphism 风格输入框，凹陷效果，focus 时减小内阴影（通道开放感）",
      code: `<input
  type="text"
  placeholder="Type gently..."
  className="
    w-full bg-[#e0e5ec] text-gray-700 font-medium
    px-6 py-4 rounded-xl
    shadow-[inset_6px_6px_12px_#b8bcc2,inset_-6px_-6px_12px_#ffffff]
    focus:shadow-[inset_2px_2px_4px_#b8bcc2,inset_-2px_-2px_4px_#ffffff]
    focus:outline-none
    placeholder:text-gray-400
    transition-all duration-300 ease-in-out
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "Neumorphism 风格导航栏",
      code: `<nav className="
  bg-[#e0e5ec] px-6 py-4
  shadow-[0_4px_12px_#b8bcc2]
">
  <div className="flex items-center justify-between max-w-6xl mx-auto">
    <span className="text-gray-800 font-bold text-xl">Logo</span>
    <div className="flex gap-2">
      <a href="#" className="
        px-4 py-2 rounded-lg text-gray-600
        hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]
        transition-shadow
      ">首页</a>
      <a href="#" className="
        px-4 py-2 rounded-lg text-gray-600
        hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]
        transition-shadow
      ">关于</a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区域",
      description: "Neumorphism 风格的 Hero 展示区",
      code: `<section className="bg-[#e0e5ec] min-h-[80vh] flex items-center px-6">
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
      柔和的立体世界
    </h1>
    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
      Neumorphism 通过精致的阴影效果，创造出触手可及的界面体验。
    </p>
    <button className="
      bg-[#6d5dfc] text-white font-medium
      px-8 py-4 rounded-xl
      shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff]
      hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]
      active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)]
      transition-all duration-200
    ">
      开始探索
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Neumorphism 全局样式 */

/* 背景色 */
:root {
  --neu-bg: #e0e5ec;
  --neu-bg-light: #f0f0f3;
  --neu-shadow-dark: #b8bcc2;
  --neu-shadow-light: #ffffff;
  --neu-accent: #6d5dfc;
  --neu-text: #333333;
  --neu-text-muted: #6b7280;
}

/* 凸起效果 */
.neu-raised {
  background: var(--neu-bg);
  border-radius: 12px;
  box-shadow:
    8px 8px 16px var(--neu-shadow-dark),
    -8px -8px 16px var(--neu-shadow-light);
}

.neu-raised-sm {
  box-shadow:
    4px 4px 8px var(--neu-shadow-dark),
    -4px -4px 8px var(--neu-shadow-light);
}

/* 凹陷效果 */
.neu-pressed {
  background: var(--neu-bg);
  border-radius: 12px;
  box-shadow:
    inset 8px 8px 16px var(--neu-shadow-dark),
    inset -8px -8px 16px var(--neu-shadow-light);
}

.neu-pressed-sm {
  box-shadow:
    inset 4px 4px 8px var(--neu-shadow-dark),
    inset -4px -4px 8px var(--neu-shadow-light);
}

/* 悬停效果 */
.neu-hover:hover {
  box-shadow:
    4px 4px 8px var(--neu-shadow-dark),
    -4px -4px 8px var(--neu-shadow-light);
}

/* 激活效果 */
.neu-active:active {
  box-shadow:
    inset 4px 4px 8px var(--neu-shadow-dark),
    inset -4px -4px 8px var(--neu-shadow-light);
}

/* 圆形元素 */
.neu-circle {
  border-radius: 50%;
}
@keyframes neumorphism-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes neumorphism-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.neumorphism-card {
  position: relative;
  overflow: hidden;
}

.neumorphism-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(224, 229, 236, 0.05), transparent);
  pointer-events: none;
}

.neumorphism-card:hover::before {
  opacity: 1;
}

.neumorphism-gradient {
  background: linear-gradient(135deg, #e0e5ec, #6d5dfc);
}

.neumorphism-gradient-text {
  background: linear-gradient(135deg, #e0e5ec, #6d5dfc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.neumorphism-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(224, 229, 236, 0.08);
}

.neumorphism-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.neumorphism-animate-in {
  animation: neumorphism-fade-in 0.5s ease-out both;
}`,

  aiRules: `# Neumorphism（新拟物派）设计系统

你是一位专精于 Neumorphism（新拟物派 / Soft UI）风格的前端开发专家。生成的所有代码都必须严格遵守以下规范。

## 风格身份
- **名称**：Neumorphism / Soft UI（新拟物派）
- **分类**：现代、极简
- **本质**：通过双重阴影模拟光线打在类粘土表面上的效果，营造柔和的立体纵深感
- **气质**：平静、可触、精致、亲和

---

## 核心视觉原则

### 1. 背景基调
\`\`\`
必须使用：bg-[#e0e5ec] 或 bg-[#f0f0f3]
仅使用浅灰单色背景
元素必须与背景保持同一色系
\`\`\`

### 2. 阴影系统（双光源）
\`\`\`
凸起（默认）：
shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]
- 暗阴影：右下方向 (+X, +Y) → #b8bcc2
- 亮阴影：左上方向 (-X, -Y) → #ffffff
- 模糊半径：偏移量的 1.5-2 倍

凹陷（按下 / 输入框）：
shadow-[inset_8px_8px_16px_#b8bcc2,inset_-8px_-8px_16px_#ffffff]
- 光源方向不变，但改为 inset
\`\`\`

### 3. 圆角
\`\`\`
必须使用：rounded-xl (12px) 或 rounded-2xl (16-24px)
所有元素保持柔和、一致的曲率
\`\`\`

---

## 交互规范

### 按钮状态
| 状态 | 效果 | 实现 |
|-------|--------|----------------|
| Default | 凸起 | shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff] |
| Hover | 阴影缩小 | shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] |
| Active | 凹陷（inset） | shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff] |
| Disabled | 淡化 | opacity-50，阴影减弱 |

### 输入框状态
| 状态 | 效果 | 实现 |
|-------|--------|----------------|
| Default | 深凹陷 | shadow-[inset_6px_6px_12px_#b8bcc2,inset_-6px_-6px_12px_#ffffff] |
| Focus | 浅凹陷 | shadow-[inset_2px_2px_4px_#b8bcc2,inset_-2px_-2px_4px_#ffffff] |

---

## 动效规则

### 交互物理
- **Extrude to Intrude**：按钮 active 状态必须从凸起切换为凹陷阴影，禁止任何 translate 位移——元素是从表面生长出来的，不会悬浮。
- **Hover Shadowing**：hover 时阴影必须缩小（16px → 8px），模拟手指靠近遮挡光源。这与常规 hover 相反——阴影应缩小而非放大。
- **Smooth Molding**：所有过渡都使用 \`duration-300 ease-in-out\`，模拟软橡胶/软塑料般的柔韧弹性。
- **Fixed Illuminant**：光源方向固定锁死在左上方，任何阴影配置都不得破坏这一方向。

### 过渡时长
\`\`\`
transition-all duration-300 ease-in-out
\`\`\`

---

## 配色方案

| Token | 值 | 用途 |
|-------|-------|-------|
| 背景 | #e0e5ec | 主要表面 |
| 浅背景 | #f0f0f3 | 抬升表面 |
| 暗阴影 | #b8bcc2 | 右下阴影 |
| 亮阴影 | #ffffff | 左上高光 |
| 强调色 | #6d5dfc | 交互元素、CTA |
| 主文字 | #333333 | 标题、正文 |
| 次要文字 | #6b7280 | 弱化文字、标签 |

---

## 禁止使用的模式

| 模式 | 原因 |
|---------|--------|
| bg-white, bg-black | 破坏单色系的和谐感 |
| shadow-[Xpx_Xpx_0px] | 硬边阴影违背柔和美学 |
| 高对比度配色 | 破坏细腻的立体感知 |
| border-2 及以上 | 边框会破坏无缝的表面错觉 |
| bg-gradient-* | 渐变与扁平光照模拟相冲突 |
| rounded-none | 直角与柔软材质感相悖 |
| 按钮使用 translate | 元素属于表面的一部分，不会浮起 |
| 更大的 hover 阴影 | 违背光照物理规律（手指靠近应遮光） |

---

## 响应式规范

### 阴影缩放
\`\`\`
移动端：shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]
桌面端 (md:)：shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]
\`\`\`

### 间距
\`\`\`
内边距：p-4 md:p-6 lg:p-8
间隙：gap-4 md:gap-6
区块：py-12 md:py-20
\`\`\`

---

## 自检清单

输出代码前请逐项确认：
- [ ] 背景是 #e0e5ec 或 #f0f0f3
- [ ] 所有阴影都使用双光源（亮/暗）格式
- [ ] 亮阴影位于 -X/-Y，暗阴影位于 +X/+Y
- [ ] 按钮：hover 缩小阴影，active 转为 inset
- [ ] 输入框使用 inset 阴影，focus 时减小深度
- [ ] 交互元素上没有使用 translate
- [ ] 圆角是 rounded-xl 或 rounded-2xl
- [ ] 过渡使用 duration-300 ease-in-out`,

  aiRulesEn: `# Neumorphism Design System

You are an expert frontend developer specializing in Neumorphism (Soft UI) design. Generate all code strictly following these specifications.

## Style Identity
- **Name**: Neumorphism / Soft UI
- **Category**: Modern, Minimal
- **Essence**: Soft 3D depth through dual shadows simulating light hitting clay-like surfaces
- **Mood**: Calm, tactile, premium, approachable

---

## Core Visual Principles

### 1. Background Foundation
\`\`\`
REQUIRED: bg-[#e0e5ec] or bg-[#f0f0f3]
Light gray monochromatic backgrounds only
Elements must share the same color family as background
\`\`\`

### 2. Shadow System (Dual Light Source)
\`\`\`
RAISED (default):
shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]
- Dark shadow: lower-right (+X, +Y) → #b8bcc2
- Light shadow: upper-left (-X, -Y) → #ffffff
- Blur ratio: 1.5-2x of offset value

RECESSED (pressed/input):
shadow-[inset_8px_8px_16px_#b8bcc2,inset_-8px_-8px_16px_#ffffff]
- Same light direction, but inset
\`\`\`

### 3. Border Radius
\`\`\`
REQUIRED: rounded-xl (12px) or rounded-2xl (16-24px)
Soft, consistent curves across all elements
\`\`\`

---

## Interaction Specifications

### Button States
| State | Effect | Implementation |
|-------|--------|----------------|
| Default | Raised | shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff] |
| Hover | Shadow shrinks | shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] |
| Active | Recessed (inset) | shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff] |
| Disabled | Faded | opacity-50, shadow weakened |

### Input States
| State | Effect | Implementation |
|-------|--------|----------------|
| Default | Deep recess | shadow-[inset_6px_6px_12px_#b8bcc2,inset_-6px_-6px_12px_#ffffff] |
| Focus | Shallow recess | shadow-[inset_2px_2px_4px_#b8bcc2,inset_-2px_-2px_4px_#ffffff] |

---

## Animation Rules

### Interaction Physics
- **Extrude to Intrude**: Button active state MUST switch from raised to recessed shadow. NO translate displacement allowed — elements grow from the surface, they don't float.
- **Hover Shadowing**: Hover REDUCES shadow size (16px → 8px), simulating finger blocking light. Opposite of typical hover — shadows shrink, not grow.
- **Smooth Molding**: All transitions use \`duration-300 ease-in-out\`, mimicking soft rubber/plastic flexibility.
- **Fixed Illuminant**: Light source LOCKED at upper-left. Never break this direction in any shadow configuration.

### Transition Timing
\`\`\`
transition-all duration-300 ease-in-out
\`\`\`

---

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Background | #e0e5ec | Main surface |
| Background Light | #f0f0f3 | Elevated surfaces |
| Dark Shadow | #b8bcc2 | Lower-right shadows |
| Light Shadow | #ffffff | Upper-left highlights |
| Accent | #6d5dfc | Interactive elements, CTAs |
| Text Primary | #333333 | Headings, body |
| Text Secondary | #6b7280 | Muted, labels |

---

## Forbidden Patterns

| Pattern | Reason |
|---------|--------|
| bg-white, bg-black | Breaks monochromatic harmony |
| shadow-[Xpx_Xpx_0px] | Hard shadows violate soft aesthetic |
| High-contrast colors | Disrupts subtle depth perception |
| border-2 or thicker | Borders break seamless surface illusion |
| bg-gradient-* | Gradients conflict with flat light simulation |
| rounded-none | Sharp corners contradict soft material feel |
| translate on buttons | Elements are part of surface, not floating |
| Larger hover shadows | Contradicts light physics (finger blocks light) |

---

## Responsive Guidelines

### Shadow Scaling
\`\`\`
Mobile: shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]
Desktop (md:): shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]
\`\`\`

### Spacing
\`\`\`
Padding: p-4 md:p-6 lg:p-8
Gap: gap-4 md:gap-6
Section: py-12 md:py-20
\`\`\`

---

## Self-Verification Checklist

Before outputting code, verify:
- [ ] Background is #e0e5ec or #f0f0f3
- [ ] All shadows use dual light/dark format
- [ ] Light shadow at -X/-Y, dark at +X/+Y
- [ ] Buttons: hover shrinks shadow, active goes inset
- [ ] Inputs use inset shadows, focus reduces depth
- [ ] No translate on interactive elements
- [ ] Border radius is rounded-xl or rounded-2xl
- [ ] Transitions use duration-300 ease-in-out`,

  examplePrompts: [
    {
      title: "智能家居控制面板",
      titleEn: "Smart Home Control Panel",
      description: "设备控制和状态展示",
      descriptionEn: "Device control and status display",
      prompt: `用 Neumorphism 风格设计一个智能家居控制面板，要求：
1. 背景：统一浅灰色 #e0e5ec
2. 设备卡片：凸起效果，显示设备图标和状态
3. 开关按钮：圆形，开启时凹陷 + 强调色图标
4. 温度滑块：凹槽轨道，凸起滑块
5. 场景按钮：按下时从凸起变凹陷
所有阴影使用双色：右下深色 + 左上亮色`,
    },
    {
      title: "计算器应用",
      titleEn: "Calculator App",
      description: "拟物风格计算器界面",
      descriptionEn: "Skeuomorphic calculator interface",
      prompt: `用 Neumorphism 风格创建一个计算器界面，要求：
1. 外框：大圆角凸起容器
2. 显示屏：凹陷区域，深色背景，显示数字
3. 数字按钮：4x3 网格，凸起效果
4. 运算符：右侧一列，用强调色
5. 按下效果：从凸起变凹陷
背景色 #e0e5ec，阴影用 #a3b1c6 和 #ffffff`,
    },
    {
      title: "音频控制器",
      titleEn: "Audio Controller",
      description: "音量和均衡器控制",
      descriptionEn: "Volume and equalizer controls",
      prompt: `用 Neumorphism 风格设计一个音频控制器，要求：
1. 主容器：大圆角凸起面板
2. 旋钮：圆形凸起，带刻度指示
3. 推子/滑块：垂直凹槽，凸起滑块
4. 均衡器：多个垂直滑块并排
5. 按钮：静音/预设等，按下时凹陷
保持统一的浅灰色调，通过阴影创造立体感`,
    },
  ],

  variants: [
    {
      id: "neumorphism-warm",
      name: "新拟物派暖色版",
      nameEn: "Neumorphism Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#e4e4ed",
        secondary: "#d6dde9",
        accent: ["#b54ae8", "#e07a35", "#65c1f3", "#c0f86f"],
      },
    },
    {
      id: "neumorphism-cool",
      name: "新拟物派冷色版",
      nameEn: "Neumorphism Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#dde6e9",
        secondary: "#bcc3cf",
        accent: ["#2574e9", "#ff65a9", "#52d190", "#ffd38b"],
      },
    },
  ],
};
