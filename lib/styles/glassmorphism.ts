import type { DesignStyle } from "./types";
import { glassmorphismAtoms } from "./atoms";

export const glassmorphism: DesignStyle = {
  atoms: glassmorphismAtoms,
  slug: "glassmorphism",
  name: "玻璃拟态",
  nameEn: "Glassmorphism",
  description:
    "夜航质感的高级毛玻璃。深墨夜景配克制光源，玻璃只借光、不带色：高斯模糊、饱和度增强、受光顶边与噪点颗粒，营造真实玻璃的安静高级感。",
  descriptionEn:
    "Premium frosted glass with a nocturne temperament. Deep ink scenes and restrained light wells; the glass borrows light instead of carrying color — gaussian blur, saturation boost, lit top edges and film grain make glass that feels believable, not decorative.",
  cover: "/styles/glassmorphism.svg",
  styleType: "visual",
  tags: [],
  category: "modern",
  colors: {
    primary: "rgba(255, 255, 255, 0.08)",
    secondary: "rgba(255, 255, 255, 0.05)",
    accent: ["#0B1322", "#33517A", "#7C9CC4", "#E4B863"],
  },
  keywords: ["glassmorphism", "frosted", "blur", "refraction", "translucent", "nocturne", "modern", "premium", "玻璃拟态", "夜景", "毛玻璃"],
  keywordsEn: ["glassmorphism", "frosted glass", "backdrop blur", "backdrop-filter css", "translucent ui", "glass card", "liquid glass", "dark glass theme", "film grain", "glassmorphic dashboard"],

  philosophy: `玻璃拟态的本质是光学，不是配色。真实的玻璃没有颜色——它只是借用、弯曲、柔化背后的光。这也是 Apple 在 Liquid Glass 材质规范里坚持的原则：玻璃从内容层取色，自己保持中性。

核心理念：
- 玻璃无色：面板只用白色低透明度（5%-12%），所有颜色来自背景场景
- 深色夜景：背景是接近黑的深墨蓝场景，配少量柔和光源（light wells），玻璃才有东西可折射
- 光有方向：顶边受光（inset 高光）、底边背光（inset 暗缘），这是真玻璃与"半透明色块"的分界线
- 唯一强调色：香槟金 #E4B863 只出现在主要动作和高亮文字，绝不大面积铺色
- 颗粒质感：2%-3% 噪点叠加消除塑料感
- 流体动效：所有过渡使用 spring easing，模拟玻璃的物理惯性

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Glassmorphism is optics, not a color scheme. Real glass has no color of its own — it borrows, bends and softens the light behind it. Apple's Liquid Glass material follows the same principle: glass takes color from the content layer and stays neutral itself.

Core principles:
- Colorless glass: Panels use only low-opacity white (5%-12%); every color comes from the scene behind
- Deep night scenes: Near-black ink backgrounds with a few soft light wells give the glass something to refract
- Light has direction: A lit top edge (inset highlight) and shaded bottom edge (inset shadow) separate real glass from "translucent rectangles"
- One accent: Champagne gold #E4B863 appears only on primary actions and highlights, never as a surface color
- Film grain: A 2%-3% noise overlay removes the plastic feel
- Fluid motion: All transitions use spring easing to simulate glass physical inertia`,

  doList: [
    "背景使用深墨夜景底色（#0B1322 一类）+ 2-3 个大半径柔和光源光斑（radial-gradient light wells）",
    "玻璃面板使用 bg-white/5 到 bg-white/12，配 backdrop-blur-[40px] 或 backdrop-blur-[60px]",
    "添加饱和度增强 backdrop-saturate-[180%]",
    "光有方向：inset 0 1px 0 白色高光（顶边受光）+ inset 0 -1px 0 深色暗缘（底边背光）+ 外层深阴影",
    "叠加 2%-3% 噪点纹理（SVG feTurbulence）保留玻璃颗粒感",
    "唯一强调色香槟金 #E4B863，只用于主 CTA、关键数字和高亮文字",
    "边框使用 border-white/15，hover 时提升到 border-white/30",
    "圆角使用 rounded-2xl 或 rounded-3xl",
    "过渡使用 duration-500 + cubic-bezier(0.16,1,0.3,1) spring easing，hover 轻微上浮",
  ],

  doListEn: [
    "Use a deep ink night base (like #0B1322) with 2-3 soft large-radius light wells (radial gradients)",
    "Glass panels use bg-white/5 to bg-white/12 with backdrop-blur-[40px] or backdrop-blur-[60px]",
    "Add saturation boost backdrop-saturate-[180%]",
    "Give light a direction: inset 0 1px 0 white highlight (lit top edge) + inset 0 -1px 0 dark shade (bottom edge) + outer depth shadow",
    "Overlay 2%-3% film grain (SVG feTurbulence) to remove the plastic feel",
    "One accent only: champagne gold #E4B863 for primary CTAs, key numbers and highlighted text",
    "Borders use border-white/15, increase to border-white/30 on hover",
    "Rounded corners use rounded-2xl or rounded-3xl",
    "Transitions use duration-500 + cubic-bezier(0.16,1,0.3,1) spring easing with slight hover lift",
  ],

  dontList: [
    "禁止紫粉 AI 渐变背景（#667eea、#764ba2、#f093fb 一类的 indigo-purple-pink 组合）",
    "禁止在纯色平面背景上使用（必须有光源或图片，玻璃才有东西可模糊）",
    "禁止玻璃透明度超过 15%（会变成实心色块，失去玻璃感）",
    "禁止使用低模糊值 backdrop-blur-sm 或 backdrop-blur",
    "禁止省略 backdrop-saturate（饱和度增强让暗景光源透过玻璃发亮）",
    "禁止给玻璃面板本身上色（玻璃无色，颜色属于背景）",
    "禁止使用不透明背景 bg-white, bg-black",
    "禁止使用直角或小圆角 rounded-none, rounded-sm",
    "禁止使用快速过渡 duration-100, duration-150",
    "禁止使用单层扁平阴影（必须外层深度 + 顶边高光 + 底边暗缘）",
  ],

  dontListEn: [
    "Do not use purple-pink AI gradients (#667eea, #764ba2, #f093fb style indigo-purple-pink combos)",
    "Do not use glass on flat solid backgrounds (needs light wells or imagery to blur)",
    "Do not exceed 15% glass opacity (it becomes a solid tinted block, not glass)",
    "Do not use low blur values backdrop-blur-sm or backdrop-blur",
    "Do not omit backdrop-saturate (the boost makes dark-scene lights glow through the glass)",
    "Do not tint the glass panel itself (glass is colorless; color belongs to the scene)",
    "Do not use opaque backgrounds bg-white, bg-black",
    "Do not use sharp or small corners rounded-none, rounded-sm",
    "Do not use fast transitions duration-100, duration-150",
    "Do not use single-layer flat shadows (needs outer depth + lit top edge + shaded bottom edge)",
  ],

  components: {
    button: {
      name: "Button",
      description: "Nocturne glass button with directional edge light, specular sweep, and champagne primary variant",
      code: `<button className="group relative
  px-6 py-3
  bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%]
  border border-white/20
  rounded-2xl
  text-white font-medium
  shadow-[0_4px_16px_rgba(3,7,18,0.45),inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(2,6,16,0.3)]
  hover:bg-white/15 hover:border-white/35
  hover:shadow-[0_10px_32px_rgba(3,7,18,0.55),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(2,6,16,0.3)]
  hover:-translate-y-0.5
  active:scale-[0.97]
  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
  overflow-hidden
">
  <span className="absolute inset-0 bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />
  <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-out pointer-events-none" />
  <span className="relative z-10">Frosted Glass</span>
</button>

{/* Primary action: the ONLY place the champagne accent appears */}
<button className="group relative
  px-6 py-3
  bg-[#E4B863]/15 backdrop-blur-[40px] backdrop-saturate-[180%]
  border border-[#E4B863]/40
  rounded-2xl
  text-[#F3DCA8] font-medium
  shadow-[0_4px_20px_rgba(228,184,99,0.15),inset_0_1px_0_rgba(243,220,168,0.35),inset_0_-1px_0_rgba(2,6,16,0.3)]
  hover:bg-[#E4B863]/22 hover:border-[#E4B863]/55
  hover:-translate-y-0.5
  active:scale-[0.97]
  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
  overflow-hidden
">
  <span className="absolute inset-0 bg-gradient-to-b from-[#F3DCA8]/15 to-transparent pointer-events-none" />
  <span className="relative z-10">Primary Action</span>
</button>`,
    },
    card: {
      name: "Card",
      description: "Nocturne glass card with directional edge light, grain-friendly surface, and depth hover",
      code: `<div className="group relative
  p-6 md:p-8
  bg-white/8 backdrop-blur-[60px] backdrop-saturate-[180%]
  border border-white/15
  rounded-3xl
  shadow-[0_16px_40px_rgba(3,7,18,0.5),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(2,6,16,0.35)]
  hover:border-white/30
  hover:shadow-[0_24px_64px_rgba(3,7,18,0.6),inset_0_1px_0_rgba(255,255,255,0.32),inset_0_-1px_0_rgba(2,6,16,0.35)]
  hover:-translate-y-1
  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
  overflow-hidden
">
  <span className="absolute inset-0 bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />
  <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/12 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-out pointer-events-none" />
  <div className="relative z-10">
    <h3 className="text-xl font-semibold text-white mb-2">
      Nocturne Glass Card
    </h3>
    <p className="text-white/60">
      The scene carries the color; the glass stays neutral
    </p>
  </div>
</div>`,
    },
    input: {
      name: "Input",
      description: "Nocturne glass input with inner shade and quiet focus luminance",
      code: `<input
  type="text"
  placeholder="Type here..."
  className="
    w-full px-5 py-3.5
    bg-white/6 backdrop-blur-[40px] backdrop-saturate-[180%]
    border border-white/15
    rounded-2xl
    text-white placeholder-white/35
    shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(2,6,16,0.3)]
    focus:outline-none focus:border-white/35 focus:bg-white/10
    focus:shadow-[0_0_0_3px_rgba(228,184,99,0.15),inset_0_1px_0_rgba(255,255,255,0.25)]
    transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
  "
/>`,
    },
    nav: {
      name: "Navigation",
      description: "Fixed nocturne glass navigation bar with subtle depth",
      code: `<nav className="
  fixed top-0 left-0 right-0 z-50
  px-6 py-3
  bg-white/6 backdrop-blur-[60px] backdrop-saturate-[180%]
  border-b border-white/10
  shadow-[0_1px_0_rgba(255,255,255,0.08)]
">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <a href="/" className="text-white font-bold text-lg tracking-tight">
      Logo
    </a>
    <div className="flex items-center gap-1">
      <a href="#" className="px-4 py-2 rounded-xl text-white/65 hover:text-white hover:bg-white/8 transition-all duration-300">
        Home
      </a>
      <a href="#" className="px-4 py-2 rounded-xl text-white/65 hover:text-white hover:bg-white/8 transition-all duration-300">
        About
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero",
      description: "Nocturne glass hero with deep ink scene, soft light wells, and film grain",
      code: `<section className="
  relative min-h-screen
  flex items-center justify-center
  bg-[#0B1322]
  px-6 overflow-hidden
">
  {/* Light wells: the scene provides the color, not the glass */}
  <div className="absolute top-[-120px] right-[-80px] w-[560px] h-[560px] rounded-full pointer-events-none"
    style={{ background: "radial-gradient(circle, rgba(124,156,196,0.28) 0%, transparent 65%)" }} />
  <div className="absolute bottom-[-140px] left-[-100px] w-[520px] h-[520px] rounded-full pointer-events-none"
    style={{ background: "radial-gradient(circle, rgba(51,81,122,0.35) 0%, transparent 65%)" }} />
  <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
    style={{ background: "radial-gradient(circle, rgba(228,184,99,0.12) 0%, transparent 60%)" }} />

  <div className="
    relative max-w-2xl mx-auto text-center
    p-10 md:p-14
    bg-white/8 backdrop-blur-[60px] backdrop-saturate-[180%]
    border border-white/15
    rounded-3xl
    shadow-[0_24px_64px_rgba(3,7,18,0.55),inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(2,6,16,0.35)]
    overflow-hidden
  ">
    <span className="absolute inset-0 bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />
    <h1 className="relative text-4xl md:text-6xl font-bold text-white mb-6">
      Glass Borrows Light
    </h1>
    <p className="relative text-lg text-white/65 mb-8">
      Deep scenes, soft light wells, one champagne accent
    </p>
    <button className="
      relative px-8 py-4
      bg-[#E4B863]/15 backdrop-blur-[40px] backdrop-saturate-[180%]
      border border-[#E4B863]/40
      rounded-2xl
      text-[#F3DCA8] font-semibold
      shadow-[0_4px_20px_rgba(228,184,99,0.15),inset_0_1px_0_rgba(243,220,168,0.35)]
      hover:bg-[#E4B863]/22 hover:border-[#E4B863]/55
      transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
    ">
      Explore
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Nocturne Glassmorphism Global Styles */

:root {
  --glass-blur: 40px;
  --glass-blur-heavy: 60px;
  --glass-saturate: 180%;
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-bg-hover: rgba(255, 255, 255, 0.14);
  --glass-border: rgba(255, 255, 255, 0.15);
  --glass-border-hover: rgba(255, 255, 255, 0.3);
  --glass-shadow: 0 16px 40px rgba(3, 7, 18, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 0 rgba(2, 6, 16, 0.35);
  --glass-shadow-hover: 0 24px 64px rgba(3, 7, 18, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.32), inset 0 -1px 0 rgba(2, 6, 16, 0.35);
  --glass-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --night-deep: #060A13;
  --night: #0B1322;
  --night-steel: #16233A;
  --moon-steel: #33517A;
  --moonlight: #7C9CC4;
  --champagne: #E4B863;
}

.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}

.glass::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.12), transparent 50%);
  border-radius: inherit;
  pointer-events: none;
}

.glass-container {
  position: relative;
  background:
    radial-gradient(640px circle at 85% 12%, rgba(124, 156, 196, 0.22), transparent 60%),
    radial-gradient(560px circle at 8% 85%, rgba(51, 81, 122, 0.3), transparent 60%),
    radial-gradient(420px circle at 30% 40%, rgba(228, 184, 99, 0.08), transparent 55%),
    linear-gradient(165deg, var(--night-deep) 0%, var(--night) 55%, var(--night-steel) 100%);
  min-height: 100vh;
}

/* 2.5% film grain removes the plastic feel */
.glass-grain::after {
  content: "";
  position: fixed;
  inset: 0;
  opacity: 0.025;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

@keyframes glassmorphism-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes glassmorphism-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.glassmorphism-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.glassmorphism-animate-in {
  animation: glassmorphism-fade-in 0.5s ease-out both;
}`,

  aiRules: `你是一个玻璃拟态（Nocturne Glassmorphism）设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 紫粉 AI 渐变背景（#667eea、#764ba2、#f093fb 一类 indigo-purple-pink 组合）
- 在纯色平面背景上使用玻璃（必须有光源光斑或图片）
- 玻璃透明度超过 15%（变成实心色块）
- 给玻璃面板本身上色（玻璃无色，颜色属于背景场景）
- 省略 backdrop-blur 或使用低模糊值（最低 backdrop-blur-[40px]）
- 省略 backdrop-saturate（必须 backdrop-saturate-[180%]）
- 使用不透明背景 bg-white, bg-black
- 使用直角或小圆角 rounded-none, rounded-sm
- 使用单层扁平阴影
- 使用快速过渡 duration-100, duration-150

## 必须遵守

### 场景先于玻璃
背景 = 深墨夜景底色 + 2-3 个柔和光源光斑：
- 底色: #0B1322（深墨蓝）或 #060A13（近黑）
- 光源: radial-gradient 大半径光斑，如 rgba(124,156,196,0.28)（月光钢蓝）、rgba(51,81,122,0.35)（深钢蓝）
- 点缀: rgba(228,184,99,0.12)（香槟金微光，最多一处）

### 玻璃面板三层结构
1. 半透明表面 bg-white/5 到 bg-white/12 + backdrop-blur-[40px] + backdrop-saturate-[180%]
2. 内发光渐变 linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)
3. 方向性阴影 shadow-[外层深度, inset_顶边高光, inset_0_-1px_底边暗缘]

### 光有方向
- 顶边受光: inset 0 1px 0 rgba(255,255,255,0.22)
- 底边背光: inset 0 -1px 0 rgba(2,6,16,0.35)
- 外层深度: 0 16px 40px rgba(3,7,18,0.5)

### 噪点颗粒
全屏叠加 2%-3% SVG feTurbulence 噪点，消除塑料感

### 边框
- 默认 border-white/15
- hover 提升到 border-white/30 ~ border-white/35

### 过渡
- duration-500 + ease-[cubic-bezier(0.16,1,0.3,1)] spring easing
- hover 上浮 -translate-y-0.5 到 -translate-y-1
- 扫光高光层：skew-x-[-20deg] 渐变从 -translate-x-[150%] 到 translate-x-[150%]
- active 缩放 scale-[0.97]

## 配色

夜景场景：
- 近黑: #060A13 / 深墨蓝: #0B1322 / 钢蓝抬升: #16233A
- 月光钢蓝: #33517A / 月光: #7C9CC4

玻璃元素（永远无色）：
- 背景: bg-white/5 到 bg-white/12
- 边框: border-white/15 到 border-white/35
- 文字: text-white, text-white/60, text-white/40

唯一强调色（克制使用）：
- 香槟金 #E4B863：主 CTA、关键数字、高亮文字
- 亮香槟 #F3DCA8：香槟按钮上的文字
- 用法示例: bg-[#E4B863]/15 border-[#E4B863]/40 text-[#F3DCA8]

## 自检

每次生成代码后检查：
1. 背景是深墨夜景 + 光源光斑（不是平渐变，更不是紫粉渐变）
2. 玻璃面板是无色白玻璃（5%-12%），没有被上色
3. 有 backdrop-blur-[40px] 或更高 + backdrop-saturate-[180%]
4. 阴影有方向（顶边高光 + 底边暗缘 + 外层深度）
5. 有噪点颗粒叠加
6. 香槟金只出现在少数强调位置
7. 过渡使用 spring easing
8. 文字对比度良好（white/60 以上做正文）`,

  aiRulesEn: `# Nocturne Glassmorphism Design System

You are an expert frontend developer specializing in premium nocturne glassmorphism. Generate all code strictly following these specifications.

## Style Identity
- **Name**: Nocturne Glassmorphism
- **Category**: Modern, Premium
- **Essence**: Colorless glass over deep night scenes — the scene carries the color, the glass borrows the light
- **Mood**: Quiet luxury, cinematic, composed, believable
- **Inspiration**: Apple Liquid Glass material rules (glass takes color from content, never itself), architectural glazing, city lights through a rain-washed window

---

## Core Visual Principles

### 1. Scene Before Glass (CRITICAL)
\`\`\`
MANDATORY: Deep ink night base + 2-3 soft light wells. NEVER a flat or purple-pink gradient.

Base: #0B1322 (deep ink blue) or #060A13 (near black)
Light wells (radial gradients, large radius, soft):
<div class="absolute -top-32 -right-20 w-[560px] h-[560px] rounded-full"
  style="background: radial-gradient(circle, rgba(124,156,196,0.28) 0%, transparent 65%)" />
<div class="absolute -bottom-36 -left-24 w-[520px] h-[520px] rounded-full"
  style="background: radial-gradient(circle, rgba(51,81,122,0.35) 0%, transparent 65%)" />
Optional single warm counterpoint:
  radial-gradient(circle, rgba(228,184,99,0.12) 0%, transparent 60%)
\`\`\`

### 2. Glass Panel Three-Layer Structure
\`\`\`
LAYER 1 — Colorless Glass Surface:
bg-white/5 to bg-white/12  (NEVER tinted, NEVER above 15%)
backdrop-blur-[40px] or backdrop-blur-[60px]
backdrop-saturate-[180%]

LAYER 2 — Inner Luminance:
<span class="absolute inset-0 bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />

LAYER 3 — Directional Shadows (light comes from above):
shadow-[0_16px_40px_rgba(3,7,18,0.5),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(2,6,16,0.35)]
\`\`\`

### 3. Film Grain
\`\`\`
Full-viewport 2%-3% SVG feTurbulence noise overlay removes the plastic feel:
opacity: 0.025; background-image: url("data:image/svg+xml,...feTurbulence type='fractalNoise' baseFrequency='0.8'...")
\`\`\`

### 4. Border System
\`\`\`
Default: border border-white/15
Hover: border-white/30 to border-white/35
\`\`\`

### 5. Border Radius
\`\`\`
REQUIRED: rounded-2xl (16px) or rounded-3xl (24px)
\`\`\`

---

## Interaction Specifications

### Hover Effects
| Element | Effect | Implementation |
|---------|--------|----------------|
| Cards | Lift + deeper shadow | hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(3,7,18,0.6),inset_0_1px_0_rgba(255,255,255,0.32),inset_0_-1px_0_rgba(2,6,16,0.35)] |
| Buttons | Subtle lift + border brighten | hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/15 |
| Links | Background reveal | hover:bg-white/8 |

### Specular Sweep (Light Reflection)
\`\`\`jsx
<span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg]
  bg-gradient-to-r from-transparent via-white/25 to-transparent
  group-hover:translate-x-[150%] transition-transform duration-700 ease-out
  pointer-events-none" />
\`\`\`

### Active State
\`\`\`
active:scale-[0.97]
\`\`\`

---

## Animation Rules

### Spring Physics
\`\`\`
transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
\`\`\`

### Timing Guidelines
| Interaction | Duration | Easing |
|-------------|----------|--------|
| Hover lift | 500ms | cubic-bezier(0.16,1,0.3,1) |
| Specular sweep | 700ms | ease-out |
| Focus glow | 500ms | cubic-bezier(0.16,1,0.3,1) |
| Active press | 150ms | ease-out |

---

## Color Palette

### Night Scene (the background owns ALL color)
| Token | Hex | Usage |
|-------|-----|-------|
| Night Deep | #060A13 | Darkest base, page edges |
| Night | #0B1322 | Primary background |
| Night Steel | #16233A | Elevated fields, section bands |
| Moon Steel | #33517A | Light well color (deep) |
| Moonlight | #7C9CC4 | Light well color (bright) |

### Glass Surface (ALWAYS colorless)
| Token | Value | Usage |
|-------|-------|-------|
| Glass BG | bg-white/5 to bg-white/12 | Panel backgrounds |
| Glass BG Hover | bg-white/10 to bg-white/16 | Hover states |
| Border | border-white/15 | Default borders |
| Border Hover | border-white/30 | Hover borders |
| Text Primary | text-white | Headlines |
| Text Secondary | text-white/60 | Body copy |
| Text Muted | text-white/40 | Captions |

### The One Accent (use sparingly)
| Token | Hex | Usage |
|-------|-----|-------|
| Champagne | #E4B863 | Primary CTA fills (at /15-/22 alpha), key numbers, borders (at /40) |
| Champagne Bright | #F3DCA8 | Text on champagne buttons, highlighted words |

Champagne button recipe:
\`\`\`
bg-[#E4B863]/15 border border-[#E4B863]/40 text-[#F3DCA8]
shadow-[0_4px_20px_rgba(228,184,99,0.15),inset_0_1px_0_rgba(243,220,168,0.35)]
hover:bg-[#E4B863]/22 hover:border-[#E4B863]/55
\`\`\`

---

## Forbidden Patterns

| Pattern | Reason |
|---------|--------|
| #667eea / #764ba2 / #f093fb gradients | The generic AI purple-pink look this style explicitly rejects |
| Tinted glass panels (bg-purple-500/20 etc.) | Glass is colorless; color belongs to the scene |
| Glass opacity above 15% | Becomes a solid block, kills the glass illusion |
| Flat solid backgrounds | Nothing to refract |
| bg-white, bg-black on panels | Glass requires translucency |
| backdrop-blur-sm, backdrop-blur | Insufficient blur |
| Omitting backdrop-saturate | Scene lights stop glowing through |
| Single-layer shadow | No light direction, reads as flat translucency |
| rounded-none, rounded-sm | Sharp corners break glass |
| duration-100, duration-150 | Too fast, loses fluidity |
| Multiple accent colors | One champagne accent only |

---

## Responsive Guidelines

### Blur Scaling
\`\`\`
Mobile: backdrop-blur-[30px]
Desktop (md:): backdrop-blur-[40px] to backdrop-blur-[60px]
\`\`\`

### Shadow Scaling
\`\`\`
Mobile: shadow-[0_8px_24px_rgba(3,7,18,0.45),inset_0_1px_0_rgba(255,255,255,0.18)]
Desktop: shadow-[0_16px_40px_rgba(3,7,18,0.5),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(2,6,16,0.35)]
\`\`\`

### Padding
\`\`\`
Cards: p-6 md:p-8 lg:p-10
Buttons: px-5 py-3 md:px-6 md:py-3.5
\`\`\`

---

## Component Templates

### Glass Card
\`\`\`jsx
<div className="group relative p-6 md:p-8
  bg-white/8 backdrop-blur-[60px] backdrop-saturate-[180%]
  border border-white/15 rounded-3xl
  shadow-[0_16px_40px_rgba(3,7,18,0.5),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(2,6,16,0.35)]
  hover:border-white/30
  hover:shadow-[0_24px_64px_rgba(3,7,18,0.6),inset_0_1px_0_rgba(255,255,255,0.32),inset_0_-1px_0_rgba(2,6,16,0.35)]
  hover:-translate-y-1
  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
  overflow-hidden">
  {/* Inner luminance */}
  <span className="absolute inset-0 bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />
  {/* Content */}
  <div className="relative z-10">...</div>
</div>
\`\`\`

---

## Self-Verification Checklist

Before outputting code, verify:
- [ ] Background is a deep ink night scene with soft light wells (NOT flat, NOT purple-pink)
- [ ] Glass panels are colorless white at 5%-12% opacity
- [ ] backdrop-blur-[40px] or higher present
- [ ] backdrop-saturate-[180%] present
- [ ] Shadows are directional (outer depth + lit top edge + shaded bottom edge)
- [ ] Film grain overlay added
- [ ] Champagne #E4B863 appears ONLY on primary actions/highlights
- [ ] Borders use border-white/15
- [ ] Corners are rounded-2xl or rounded-3xl
- [ ] Transitions use spring easing cubic-bezier(0.16,1,0.3,1)
- [ ] Body text is white/60 or brighter`,

  examplePrompts: [
    {
      title: "夜航玻璃仪表盘",
      titleEn: "Nocturne Glass Dashboard",
      description: "深夜景毛玻璃数据面板",
      descriptionEn: "Deep night scene frosted glass data dashboard",
      prompt: `Create a nocturne glassmorphism dashboard with:
1. Background: deep ink #0B1322 with three soft radial light wells — rgba(124,156,196,0.28) top right, rgba(51,81,122,0.35) bottom left, rgba(228,184,99,0.12) center accent
2. Film grain: full-viewport 2.5% SVG feTurbulence noise overlay
3. Top nav: fixed, bg-white/6 backdrop-blur-[60px] backdrop-saturate-[180%], border-b border-white/10
4. Stat cards: bg-white/8 backdrop-blur-[60px], directional shadows (outer depth + inset top highlight + inset bottom shade), key numbers in champagne #E4B863, hover lift
5. Chart area: large colorless glass panel; chart line in moonlight #7C9CC4 with champagne highlight point
6. All transitions: duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
7. Specular sweep on card hover; NO purple-pink gradients anywhere`,
      promptEn: `Create a nocturne glassmorphism dashboard with:
1. Background: deep ink #0B1322 with three soft radial light wells — rgba(124,156,196,0.28) top right, rgba(51,81,122,0.35) bottom left, rgba(228,184,99,0.12) center accent
2. Film grain: full-viewport 2.5% SVG feTurbulence noise overlay
3. Top nav: fixed, bg-white/6 backdrop-blur-[60px] backdrop-saturate-[180%], border-b border-white/10
4. Stat cards: bg-white/8 backdrop-blur-[60px], directional shadows (outer depth + inset top highlight + inset bottom shade), key numbers in champagne #E4B863, hover lift
5. Chart area: large colorless glass panel; chart line in moonlight #7C9CC4 with champagne highlight point
6. All transitions: duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
7. Specular sweep on card hover; NO purple-pink gradients anywhere`,
    },
    {
      title: "夜航玻璃登录页",
      titleEn: "Nocturne Glass Login",
      description: "安静高级的深夜毛玻璃登录页",
      descriptionEn: "Quiet, premium night-scene frosted glass login page",
      prompt: `Create a nocturne glassmorphism login page with:
1. Background: near-black #060A13 to #0B1322, one moonlight well rgba(124,156,196,0.25) upper right, one faint champagne well rgba(228,184,99,0.1) lower left, 2.5% film grain
2. Login card: centered, bg-white/8 backdrop-blur-[60px] backdrop-saturate-[180%], rounded-3xl, shadow with inset top highlight and inset bottom shade
3. Inner luminance: gradient overlay from-white/12 to transparent at top
4. Inputs: bg-white/6, inset shade, focus ring rgba(228,184,99,0.15)
5. Submit button: the ONLY champagne element — bg-[#E4B863]/15 border-[#E4B863]/40 text-[#F3DCA8]
6. Serif display headline (e.g. Playfair Display) over the glass for editorial luxury
7. All corners rounded-2xl or rounded-3xl, spring easing transitions`,
      promptEn: `Create a nocturne glassmorphism login page with:
1. Background: near-black #060A13 to #0B1322, one moonlight well rgba(124,156,196,0.25) upper right, one faint champagne well rgba(228,184,99,0.1) lower left, 2.5% film grain
2. Login card: centered, bg-white/8 backdrop-blur-[60px] backdrop-saturate-[180%], rounded-3xl, shadow with inset top highlight and inset bottom shade
3. Inner luminance: gradient overlay from-white/12 to transparent at top
4. Inputs: bg-white/6, inset shade, focus ring rgba(228,184,99,0.15)
5. Submit button: the ONLY champagne element — bg-[#E4B863]/15 border-[#E4B863]/40 text-[#F3DCA8]
6. Serif display headline (e.g. Playfair Display) over the glass for editorial luxury
7. All corners rounded-2xl or rounded-3xl, spring easing transitions`,
    },
    {
      title: "夜航玻璃音乐播放器",
      titleEn: "Nocturne Glass Music Player",
      description: "沉浸式深夜毛玻璃音乐播放器",
      descriptionEn: "Immersive night-scene frosted glass music player",
      prompt: `Create a nocturne glassmorphism music player with:
1. Background: blurred album art darkened with a rgba(6,10,19,0.6) scrim so the glass stays readable, plus 2.5% film grain
2. Player card: bg-white/8 backdrop-blur-[60px] backdrop-saturate-[180%], rounded-3xl, directional shadows
3. Album art: rounded-2xl with border-white/15 frame and inset top highlight
4. Controls: colorless glass buttons; the play button is the single champagne accent (#E4B863/15 fill, #F3DCA8 icon)
5. Progress bar: glass track bg-white/8; fill in moonlight #7C9CC4; thumb with champagne ring on drag
6. Playlist: glass sidebar with hover-highlighted rows (hover:bg-white/8)
7. All transitions spring easing; NO purple-pink gradients`,
      promptEn: `Create a nocturne glassmorphism music player with:
1. Background: blurred album art darkened with a rgba(6,10,19,0.6) scrim so the glass stays readable, plus 2.5% film grain
2. Player card: bg-white/8 backdrop-blur-[60px] backdrop-saturate-[180%], rounded-3xl, directional shadows
3. Album art: rounded-2xl with border-white/15 frame and inset top highlight
4. Controls: colorless glass buttons; the play button is the single champagne accent (#E4B863/15 fill, #F3DCA8 icon)
5. Progress bar: glass track bg-white/8; fill in moonlight #7C9CC4; thumb with champagne ring on drag
6. Playlist: glass sidebar with hover-highlighted rows (hover:bg-white/8)
7. All transitions spring easing; NO purple-pink gradients`,
    },
  ],

  variants: [
    {
      id: "glassmorphism-warm",
      name: "玻璃拟态·暖夜",
      nameEn: "Glassmorphism Ember",
      description: "Warm ember-night variant: near-black coffee base with amber light wells",
      colors: {
        primary: "rgba(255, 255, 255, 0.08)",
        secondary: "rgba(255, 255, 255, 0.05)",
        accent: ["#120D0A", "#5C3A1E", "#C98F4E", "#F0C987"],
      },
    },
    {
      id: "glassmorphism-cool",
      name: "玻璃拟态·松夜",
      nameEn: "Glassmorphism Pine",
      description: "Cool pine-night variant: deep forest base with sage light wells",
      colors: {
        primary: "rgba(255, 255, 255, 0.08)",
        secondary: "rgba(255, 255, 255, 0.05)",
        accent: ["#081210", "#1F4D3A", "#7FB69E", "#DCE8DF"],
      },
    },
  ],
};
