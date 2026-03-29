import { DesignStyle } from "./index";

export const glassmorphism: DesignStyle = {
  slug: "glassmorphism",
  name: "Liquid Glass",
  nameEn: "Liquid Glass",
  description:
    "Apple Liquid Glass 风格的高级毛玻璃效果。通过高斯模糊、饱和度增强、多层内发光和色散边缘，创造出光在玻璃中流动的真实质感。",
  descriptionEn:
    "Premium frosted glass inspired by Apple Liquid Glass. High gaussian blur, saturation boost, multi-layer inner glow and chromatic edges create the sensation of light flowing through real glass.",
  cover: "/styles/glassmorphism.svg",
  styleType: "visual",
  tags: ["modern"],
  category: "modern",
  colors: {
    primary: "rgba(255, 255, 255, 0.15)",
    secondary: "rgba(255, 255, 255, 0.10)",
    accent: ["#667eea", "#764ba2", "#f093fb", "#f5576c"],
  },
  keywords: ["liquid glass", "frosted", "blur", "refraction", "translucent", "modern", "contemporary", "sleek", "现代", "简洁"],

  philosophy: `Liquid Glass 是 Apple 在 WWDC25 推出的设计语言的精髓提炼。它不是简单的半透明加模糊，而是模拟真实玻璃的光学特性：折射、色散、内发光、高光边缘。

核心理念：
- 光学真实感：高模糊 + 饱和度增强，让背景色彩在玻璃中"活"起来
- 内发光：顶部白色渐变模拟光线从上方照射玻璃的效果
- 色散边缘：边框在交互时呈现微妙的彩虹色散
- 深度层级：多层玻璃叠加，每层透明度和模糊度不同
- 流体动效：所有过渡使用 spring easing，模拟玻璃的物理惯性

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Liquid Glass distills the design language Apple introduced at WWDC25. It goes beyond simple translucency plus blur to simulate real glass optics: refraction, chromatic dispersion, inner luminance, and specular edges.

Core principles:
- Optical realism: High blur + saturation boost makes background colors "live" inside the glass
- Inner luminance: Top-down white gradient simulates light hitting the glass surface from above
- Chromatic edges: Borders reveal subtle rainbow dispersion on interaction
- Depth layering: Multiple glass layers with varying opacity and blur
- Fluid motion: All transitions use spring easing to simulate glass physical inertia`,

  doList: [
    "使用高模糊值 backdrop-blur-[40px] 或 backdrop-blur-[60px]",
    "添加饱和度增强 backdrop-saturate-[180%]",
    "使用多层阴影：外层深度 + inset 顶部高光 + 边缘光晕",
    "添加内发光渐变 background-image: linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)",
    "边框使用 border-white/20，hover 时提升到 border-white/40",
    "圆角使用 rounded-2xl 或 rounded-3xl",
    "过渡使用 duration-500 + cubic-bezier(0.16,1,0.3,1) spring easing",
    "hover 时轻微上浮 -translate-y-0.5 并增强阴影",
    "使用丰富的渐变背景作为底层",
  ],

  doListEn: [
    "Use high blur values backdrop-blur-[40px] or backdrop-blur-[60px]",
    "Add saturation boost backdrop-saturate-[180%]",
    "Use multi-layer shadows: outer depth + inset top highlight + edge glow",
    "Add inner luminance gradient background-image: linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)",
    "Borders use border-white/20, increase to border-white/40 on hover",
    "Rounded corners use rounded-2xl or rounded-3xl",
    "Transitions use duration-500 + cubic-bezier(0.16,1,0.3,1) spring easing",
    "Slight lift on hover -translate-y-0.5 with enhanced shadows",
    "Use rich gradient backgrounds as the base layer",
  ],

  dontList: [
    "禁止在纯色背景上使用（必须有渐变或图片背景）",
    "禁止使用低模糊值 backdrop-blur-sm 或 backdrop-blur",
    "禁止省略 backdrop-saturate（饱和度增强是 Liquid Glass 的关键）",
    "禁止使用不透明背景 bg-white, bg-black",
    "禁止使用直角或小圆角 rounded-none, rounded-sm",
    "禁止使用快速过渡 duration-100, duration-150",
    "禁止使用单层扁平阴影（必须多层）",
    "禁止使用频闪或高频循环发光动画",
  ],

  dontListEn: [
    "Do not use on solid color backgrounds (requires gradient or image background)",
    "Do not use low blur values backdrop-blur-sm or backdrop-blur",
    "Do not omit backdrop-saturate (saturation boost is key to Liquid Glass)",
    "Do not use opaque backgrounds bg-white, bg-black",
    "Do not use sharp or small corners rounded-none, rounded-sm",
    "Do not use fast transitions duration-100, duration-150",
    "Do not use single-layer flat shadows (must be multi-layer)",
    "Do not use strobing or high-frequency looping glow animations",
  ],

  components: {
    button: {
      name: "Button",
      description: "Liquid Glass button with inner luminance, specular sweep, and chromatic hover",
      code: `<button className="group relative
  px-6 py-3
  bg-white/20 backdrop-blur-[40px] backdrop-saturate-[180%]
  border border-white/25
  rounded-2xl
  text-white font-medium
  shadow-[0_4px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)]
  hover:bg-white/28 hover:border-white/40
  hover:shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.4)]
  hover:-translate-y-0.5
  active:scale-[0.97]
  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
  overflow-hidden
">
  <span className="absolute inset-0 bg-gradient-to-b from-white/18 to-transparent pointer-events-none" />
  <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-out pointer-events-none" />
  <span className="relative z-10">Liquid Glass</span>
</button>`,
    },
    card: {
      name: "Card",
      description: "Liquid Glass card with refraction gradient, multi-layer shadows, and depth hover",
      code: `<div className="group relative
  p-6 md:p-8
  bg-white/15 backdrop-blur-[60px] backdrop-saturate-[180%]
  border border-white/20
  rounded-3xl
  shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.35)]
  hover:border-white/35
  hover:shadow-[0_16px_56px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.45)]
  hover:-translate-y-1
  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
  overflow-hidden
">
  <span className="absolute inset-0 bg-gradient-to-b from-white/18 to-transparent pointer-events-none" />
  <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-out pointer-events-none" />
  <div className="relative z-10">
    <h3 className="text-xl font-semibold text-white mb-2">
      Liquid Glass Card
    </h3>
    <p className="text-white/75">
      Light flows through layered glass surfaces
    </p>
  </div>
</div>`,
    },
    input: {
      name: "Input",
      description: "Liquid Glass input with inner shadow and focus luminance",
      code: `<input
  type="text"
  placeholder="Type here..."
  className="
    w-full px-5 py-3.5
    bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%]
    border border-white/20
    rounded-2xl
    text-white placeholder-white/40
    shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]
    focus:outline-none focus:border-white/40 focus:bg-white/18
    focus:shadow-[0_0_0_3px_rgba(255,255,255,0.15),inset_0_1px_0_rgba(255,255,255,0.3)]
    transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
  "
/>`,
    },
    nav: {
      name: "Navigation",
      description: "Fixed Liquid Glass navigation bar with subtle depth",
      code: `<nav className="
  fixed top-0 left-0 right-0 z-50
  px-6 py-3
  bg-white/10 backdrop-blur-[60px] backdrop-saturate-[180%]
  border-b border-white/10
  shadow-[0_1px_0_rgba(255,255,255,0.1)]
">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <a href="/" className="text-white font-bold text-lg tracking-tight">
      Logo
    </a>
    <div className="flex items-center gap-1">
      <a href="#" className="px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
        Home
      </a>
      <a href="#" className="px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
        About
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero",
      description: "Liquid Glass hero section with layered depth and ambient orbs",
      code: `<section className="
  relative min-h-screen
  flex items-center justify-center
  bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500
  px-6 overflow-hidden
">
  <div className="absolute top-20 right-[-60px] w-[400px] h-[400px] rounded-full bg-pink-400/30 blur-3xl" />
  <div className="absolute bottom-20 left-[-80px] w-[500px] h-[500px] rounded-full bg-blue-400/25 blur-3xl" />
  <div className="
    relative max-w-2xl mx-auto text-center
    p-10 md:p-14
    bg-white/12 backdrop-blur-[60px] backdrop-saturate-[180%]
    border border-white/20
    rounded-3xl
    shadow-[0_16px_64px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.35)]
    overflow-hidden
  ">
    <span className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
    <h1 className="relative text-4xl md:text-6xl font-bold text-white mb-6">
      Liquid Glass
    </h1>
    <p className="relative text-lg text-white/75 mb-8">
      Light flows through layered translucent surfaces
    </p>
    <button className="
      relative px-8 py-4
      bg-white/20 backdrop-blur-[40px] backdrop-saturate-[180%]
      border border-white/25
      rounded-2xl
      text-white font-semibold
      shadow-[0_4px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)]
      hover:bg-white/28 hover:border-white/40
      transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
    ">
      Explore
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Liquid Glass Global Styles */

:root {
  --glass-blur: 40px;
  --glass-blur-heavy: 60px;
  --glass-saturate: 180%;
  --glass-bg: rgba(255, 255, 255, 0.12);
  --glass-bg-hover: rgba(255, 255, 255, 0.22);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-border-hover: rgba(255, 255, 255, 0.4);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.35);
  --glass-shadow-hover: 0 16px 56px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.45);
  --glass-spring: cubic-bezier(0.16, 1, 0.3, 1);
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
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.18), transparent 50%);
  border-radius: inherit;
  pointer-events: none;
}

.glass-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  min-height: 100vh;
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

  aiRules: `你是一个 Liquid Glass 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 在纯色背景上使用玻璃效果（必须有渐变或图片背景）
- 省略 backdrop-blur 或使用低模糊值（最低 backdrop-blur-[40px]）
- 省略 backdrop-saturate（必须 backdrop-saturate-[180%]）
- 使用不透明背景 bg-white, bg-black
- 使用直角或小圆角 rounded-none, rounded-sm
- 使用单层扁平阴影
- 使用快速过渡 duration-100, duration-150

## 必须遵守

### 玻璃面板三层结构
1. 半透明背景 bg-white/10 到 bg-white/20 + backdrop-blur-[40px] + backdrop-saturate-[180%]
2. 内发光渐变 background-image: linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)
3. 多层阴影 shadow-[外层深度, inset_顶部高光]

### 边框
- 默认 border-white/20
- hover 提升到 border-white/35 ~ border-white/40

### 过渡
- duration-500 + ease-[cubic-bezier(0.16,1,0.3,1)] spring easing
- hover 上浮 -translate-y-0.5 到 -translate-y-1

### 交互
- 扫光高光层：skew-x-[-20deg] 渐变从 -translate-x-[150%] 到 translate-x-[150%]
- 阴影在 hover 时同步增强
- active 缩放 scale-[0.97]

## 配色

渐变背景推荐：
- 靛紫粉: from-indigo-600 via-purple-600 to-pink-500
- 蓝紫: from-blue-500 via-purple-500 to-pink-500
- 青蓝: from-cyan-400 via-blue-500 to-indigo-600

玻璃元素：
- 背景: bg-white/10 到 bg-white/20
- 边框: border-white/20 到 border-white/40
- 文字: text-white, text-white/85, text-white/50

## 自检

每次生成代码后检查：
1. 有渐变或图片背景
2. 有 backdrop-blur-[40px] 或更高
3. 有 backdrop-saturate-[180%]
4. 有多层阴影（外层 + inset）
5. 有内发光渐变叠加层
6. 过渡使用 spring easing
7. 文字可读性良好`,

  aiRulesEn: `You are a Liquid Glass design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Using glass effects on solid color backgrounds (must have gradient or image background)
- Omitting backdrop-blur or using low blur values (minimum backdrop-blur-[40px])
- Omitting backdrop-saturate (must use backdrop-saturate-[180%])
- Using opaque backgrounds bg-white, bg-black
- Using sharp or small corners rounded-none, rounded-sm
- Using single-layer flat shadows
- Using fast transitions duration-100, duration-150

## Must Follow

### Glass Panel Three-Layer Structure
1. Semi-transparent background bg-white/10 to bg-white/20 + backdrop-blur-[40px] + backdrop-saturate-[180%]
2. Inner luminance gradient background-image: linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)
3. Multi-layer shadows shadow-[outer depth, inset_top highlight]

### Borders
- Default border-white/20
- Hover increase to border-white/35 ~ border-white/40

### Transitions
- duration-500 + ease-[cubic-bezier(0.16,1,0.3,1)] spring easing
- Hover lift -translate-y-0.5 to -translate-y-1

### Interactions
- Specular sweep layer: skew-x-[-20deg] gradient from -translate-x-[150%] to translate-x-[150%]
- Shadows enhance synchronously on hover
- Active scale scale-[0.97]

## Color Palette

Recommended gradient backgrounds:
- Indigo-purple-pink: from-indigo-600 via-purple-600 to-pink-500
- Blue-purple: from-blue-500 via-purple-500 to-pink-500
- Cyan-blue: from-cyan-400 via-blue-500 to-indigo-600

Glass elements:
- Background: bg-white/10 to bg-white/20
- Border: border-white/20 to border-white/40
- Text: text-white, text-white/85, text-white/50

## Self-Check

After generating code, verify:
1. Has gradient or image background
2. Has backdrop-blur-[40px] or higher
3. Has backdrop-saturate-[180%]
4. Has multi-layer shadows (outer + inset)
5. Has inner luminance gradient overlay
6. Transitions use spring easing
7. Text readability is good`,

  examplePrompts: [
    {
      title: "Liquid Glass Dashboard",
      titleEn: "Liquid Glass Dashboard",
      description: "Apple 风格的毛玻璃数据面板",
      descriptionEn: "Apple-style frosted glass data dashboard",
      prompt: `Create a Liquid Glass dashboard with:
1. Background: full-screen gradient from-indigo-600 via-purple-600 to-pink-500 with floating ambient orbs
2. Top nav: fixed, bg-white/10 backdrop-blur-[60px] backdrop-saturate-[180%], border-b border-white/10
3. Stat cards: bg-white/15 backdrop-blur-[60px], multi-layer shadows, inner luminance gradient overlay, hover lift with enhanced glow
4. Chart area: large glass panel with inset shadow, gradient overlay from top
5. All transitions: duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
6. Specular sweep on card hover`,
      promptEn: `Create a Liquid Glass dashboard with:
1. Background: full-screen gradient from-indigo-600 via-purple-600 to-pink-500 with floating ambient orbs
2. Top nav: fixed, bg-white/10 backdrop-blur-[60px] backdrop-saturate-[180%], border-b border-white/10
3. Stat cards: bg-white/15 backdrop-blur-[60px], multi-layer shadows, inner luminance gradient overlay, hover lift with enhanced glow
4. Chart area: large glass panel with inset shadow, gradient overlay from top
5. All transitions: duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
6. Specular sweep on card hover`,
    },
    {
      title: "Liquid Glass Login",
      titleEn: "Liquid Glass Login",
      description: "高级毛玻璃登录页",
      descriptionEn: "Premium frosted glass login page",
      prompt: `Create a Liquid Glass login page with:
1. Background: gradient from-violet-600 via-purple-600 to-fuchsia-500 with blurred ambient orbs
2. Login card: centered, bg-white/12 backdrop-blur-[60px] backdrop-saturate-[180%], rounded-3xl, multi-layer shadow with inset top highlight
3. Inner luminance: gradient overlay from-white/18 to transparent at top
4. Inputs: bg-white/10, inset shadow, focus glow ring
5. Submit button: bg-white/20 with specular sweep on hover
6. All corners rounded-2xl or rounded-3xl, spring easing transitions`,
      promptEn: `Create a Liquid Glass login page with:
1. Background: gradient from-violet-600 via-purple-600 to-fuchsia-500 with blurred ambient orbs
2. Login card: centered, bg-white/12 backdrop-blur-[60px] backdrop-saturate-[180%], rounded-3xl, multi-layer shadow with inset top highlight
3. Inner luminance: gradient overlay from-white/18 to transparent at top
4. Inputs: bg-white/10, inset shadow, focus glow ring
5. Submit button: bg-white/20 with specular sweep on hover
6. All corners rounded-2xl or rounded-3xl, spring easing transitions`,
    },
    {
      title: "Liquid Glass Music Player",
      titleEn: "Liquid Glass Music Player",
      description: "沉浸式毛玻璃音乐播放器",
      descriptionEn: "Immersive frosted glass music player",
      prompt: `Create a Liquid Glass music player with:
1. Background: blurred album art with gradient overlay
2. Player card: bg-white/15 backdrop-blur-[60px] backdrop-saturate-[180%], rounded-3xl
3. Album art: rounded-2xl with glass frame border and shadow
4. Controls: glass buttons with inner luminance, specular sweep on hover
5. Progress bar: glass track with gradient fill, glass thumb
6. Playlist: glass sidebar with hover-highlighted rows
7. All transitions spring easing, multi-layer shadows throughout`,
      promptEn: `Create a Liquid Glass music player with:
1. Background: blurred album art with gradient overlay
2. Player card: bg-white/15 backdrop-blur-[60px] backdrop-saturate-[180%], rounded-3xl
3. Album art: rounded-2xl with glass frame border and shadow
4. Controls: glass buttons with inner luminance, specular sweep on hover
5. Progress bar: glass track with gradient fill, glass thumb
6. Playlist: glass sidebar with hover-highlighted rows
7. All transitions spring easing, multi-layer shadows throughout`,
    },
  ],

  variants: [
    {
      id: "glassmorphism-warm",
      name: "Liquid Glass暖色版",
      nameEn: "Liquid Glass Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "rgba(255, 255, 255, 0.15)",
        secondary: "rgba(255, 255, 255, 0.10)",
        accent: ["#9e6de9", "#96448b", "#ff8fd0", "#dd6430"],
      },
    },
    {
      id: "glassmorphism-cool",
      name: "Liquid Glass冷色版",
      nameEn: "Liquid Glass Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "rgba(255, 255, 255, 0.15)",
        secondary: "rgba(255, 255, 255, 0.10)",
        accent: ["#358fcf", "#4f56a6", "#c19fff", "#ec53ab"],
      },
    },
  ],
};

