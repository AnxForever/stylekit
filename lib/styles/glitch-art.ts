import type { DesignStyle } from "./types";

export const glitchArt: DesignStyle = {
  slug: "glitch-art",
  name: "故障艺术风",
  nameEn: "Glitch Art",
  description:
    "数字故障美学风格，通过RGB色彩通道分离、水平位移带、扫描线纹理、VHS追踪错误和数据损坏块，呈现赛博朋克式的视觉冲击和信号腐蚀质感。",
  descriptionEn:
    "An avant-garde cyberpunk aesthetic that embraces digital errors, severe chromatic aberration, and jarring screen-tearing effects.",
  cover: "/styles/glitch-art.svg",
  styleType: "visual",
  tags: ["high-contrast"],
  category: "expressive",
  colors: {
    primary: "#00ffff",
    secondary: "#0a0a0a",
    accent: ["#ff00ff", "#ffff00", "#ffffff", "#ff0506"],
  },
  keywords: ["故障", "像素", "RGB分离", "扫描线", "数字损坏", "位移", "VHS", "通道分离", "expressive", "bold"],
  keywordsEn: ["glitch art", "glitch effect", "RGB split", "chromatic aberration", "scanlines", "VHS aesthetic", "datamosh", "screen tear", "cyberpunk", "digital distortion", "glitch text animation"],

  philosophy: `Glitch Art 是一种拥抱数字错误与技术故障的艺术形式，将系统崩溃和数据损坏转化为视觉表达。完美是数字世界的幻觉——我们在断裂的代码、丢失的帧和剧烈失同步的像素中发现美。

核心理念：
- RGB通道分离：将CMY三通道故意错位，产生色彩偏移阴影效果
- 水平位移带：通过clip-path随机裁切区域产生水平错位
- 扫描线纹理：CRT显示器的水平扫描线覆盖层
- VHS追踪错误：模拟老式录像带的追踪错误横线
- 数据损坏块：随机分布的半透明色彩块模拟数据丢失

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Perfection is a digital illusion. We find beauty in the broken code, the dropped frames, and the violently unsynchronized pixels.

Core principles:
- RGB channel split: intentionally offset CMY channels to produce chromatic aberration shadows
- Horizontal displacement bands: clip-path random slicing to create horizontal misalignment
- Scanline texture: CRT-style horizontal scanline overlay
- VHS tracking errors: simulated tape-tracking error lines
- Data corruption blocks: scattered semi-transparent color blocks simulating data loss`,

  doList: [
    "全局使用等宽字体 font-mono，标题加粗 font-black + 全大写 uppercase + 宽字距 tracking-widest",
    "用 Tailwind 任意值 text-shadow 模拟 RGB 色彩分离，如 [text-shadow:3px_0_#ff00ff,-3px_0_#00ffff]",
    "所有状态切换使用 transition-none，营造帧丢失的断裂感",
    "卡片使用粗左边框（border-l-4 ~ border-l-8）标记，hover 时切换边框颜色",
    "按钮 :active 状态使用 skew-x + scale-y 组合制造屏幕撕裂效果",
    "背景叠加扫描线纹理覆盖层（repeating-linear-gradient 间隔 2-4px）",
    "hover 时执行前景/背景色快速反转 + RGB 偏移放大至 6px 级别",
  ],

  doListEn: [
    "Use monospace fonts exclusively for a terminal/code feel.",
    "Apply arbitrary Tailwind text-shadows (e.g., [text-shadow:3px_0_#ff00ff,-3px_0_#00ffff]) to simulate RGB color splitting.",
    "Use transition-none for all state changes to create jarring, broken effects.",
    "Mark cards with thick left borders (border-l-4 to border-l-8), swap border color on hover.",
    "Use skew-x + scale-y on button :active state to simulate screen tearing.",
    "Overlay scanline textures on backgrounds (repeating-linear-gradient at 2-4px intervals).",
    "On hover, perform rapid foreground/background inversion and amplify RGB offset to 6px.",
  ],

  dontList: [
    "禁止任何圆角——所有元素必须 rounded-none，棱角分明",
    "禁止平滑过渡动画（duration-300、ease-in-out 等），动画应像丢帧一样突变",
    "禁止使用柔和阴影（shadow-sm/md/lg）——阴影只能是纯色块偏移",
    "禁止使用毛玻璃效果（backdrop-blur）或柔和渐变背景",
    "禁止使用 CMY 三色以外的装饰色（粉色、自然色系、暖色调等）",
    "禁止使用衬线或无衬线字体——只允许 monospace 等宽字体",
  ],

  dontListEn: [
    "Never use border-radius; all corners must be perfectly sharp.",
    "Avoid smooth transitions (duration-*, ease-in-out); animation should feel like dropped frames.",
    "Do not use soft, blurred shadows (shadow-sm/md/lg); all shadows must be solid blocks of color.",
    "Do not use frosted glass (backdrop-blur) or soft gradient backgrounds.",
    "Do not use decorative colors outside CMY (no pastels, earth tones, or warm hues).",
    "Do not use serif or sans-serif fonts; only monospace is allowed.",
  ],

  components: {
    button: {
      name: "按钮",
      description: "故障风格按钮，带RGB通道分离阴影和撕裂 active 效果",
      code: `<button className="group relative px-8 py-3 bg-[#0a0a0a] text-white font-mono font-black uppercase tracking-[0.2em] border-2 border-[#00ffff] shadow-[4px_4px_0_#ff00ff] hover:bg-[#00ffff] hover:text-[#0a0a0a] hover:shadow-[-4px_-4px_0_#ffff00] active:skew-x-[-15deg] active:scale-y-90 active:shadow-none transition-none overflow-hidden">
  <span className="absolute inset-0 w-full h-[2px] bg-white opacity-0 group-hover:opacity-100 group-hover:animate-pulse top-1/2 -translate-y-1/2" />
  <span className="relative z-10 group-hover:[text-shadow:2px_0_#ff00ff,-2px_0_#000000] transition-none">
    EXECUTE.EXE
  </span>
</button>`,
    },
    card: {
      name: "卡片",
      description: "数据损坏面板，带扫描线纹理和信号监控状态",
      code: `<div className="group p-8 bg-[#0a0a0a] border-l-8 border-[#ff00ff] hover:border-[#00ffff] transition-none relative overflow-hidden flex flex-col">
  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.08)_2px,rgba(0,255,255,0.08)_4px)] opacity-0 group-hover:opacity-100 pointer-events-none transition-none" />
  <h3 className="text-2xl font-mono font-black text-white uppercase mb-3 transition-none group-hover:[text-shadow:3px_0_#ff00ff,-3px_0_#00ffff] group-hover:translate-x-1">
    SYS_FAILURE
  </h3>
  <p className="text-[#a0a0a0] font-mono text-sm leading-relaxed transition-none group-hover:text-white group-hover:-translate-x-1">
    ERR: MEMORY_CORRUPTION at 0x00A4. Visual matrices desynchronized. Proceed with extreme caution.
  </p>
  <div className="mt-6 pt-4 border-t-2 border-[#333333] group-hover:border-[#ff00ff] transition-none flex items-center justify-between z-10">
    <span className="text-[#ff00ff] text-xs font-black uppercase group-hover:text-[#ffff00] transition-none">
      Status: Offline
    </span>
    <span className="w-3 h-3 bg-[#00ffff] group-hover:bg-[#ff0000] group-hover:animate-ping transition-none" />
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "终端风格输入框，带RGB分离焦点偏移阴影",
      code: `<div className="w-full flex flex-col gap-2">
  <label className="text-[#ff00ff] font-mono font-bold uppercase tracking-widest text-xs">
    Inject_Payload
  </label>
  <input type="text" placeholder="ENTER OVERRIDE CODE..." className="w-full px-4 py-3 bg-[#0a0a0a] border-2 border-[#333333] text-[#ffffff] font-mono focus:border-[#00ffff] focus:shadow-[4px_4px_0_#ff00ff,-4px_-4px_0_#00ffff] focus:-translate-x-1 focus:translate-y-1 focus:outline-none transition-none placeholder:text-[#333333]" />
</div>`,
    },
    nav: {
      name: "导航栏",
      description: "故障风格顶部导航，带RGB分离 hover 和 skew 扭曲",
      code: `<nav className="w-full px-6 py-4 bg-[#0a0a0a] border-b-4 border-[#ff00ff] flex flex-col md:flex-row items-center justify-between gap-4">
  <div className="text-[#ffffff] font-mono font-black text-xl tracking-widest uppercase hover:[text-shadow:3px_0_#ff00ff,-3px_0_#00ffff] cursor-crosshair transition-none">
    <span className="text-[#00ffff]">SYS</span>.FAIL
  </div>
  <div className="flex gap-6">
    <a href="#" className="text-[#ffffff] font-mono font-bold hover:text-[#ffff00] hover:bg-[#ff00ff] px-2 transition-none uppercase hover:skew-x-[-10deg]">
      Diagnostics
    </a>
    <a href="#" className="text-[#ffffff] font-mono font-bold hover:text-[#0a0a0a] hover:bg-[#00ffff] px-2 transition-none uppercase hover:skew-x-[10deg]">
      Reboot
    </a>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "故障风格 Hero，带扫描线背景、RGB分离标题和撕裂按钮",
      code: `<div className="w-full min-h-[60vh] bg-[#0a0a0a] flex flex-col items-center justify-center p-8 relative overflow-hidden group">
  <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(0,255,255,0.05)_10px,rgba(0,255,255,0.05)_20px)] pointer-events-none group-hover:bg-[repeating-linear-gradient(90deg,transparent,transparent_15px,rgba(255,0,255,0.08)_15px,rgba(255,0,255,0.08)_30px)] transition-none" />
  <div className="absolute top-1/4 left-0 w-full h-[4px] bg-[#ffffff] opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-none z-0" />
  <h1 className="text-5xl md:text-7xl lg:text-8xl font-mono font-black text-[#ffffff] uppercase text-center mb-6 relative z-10 group-hover:[text-shadow:6px_0_#ff00ff,-6px_0_#00ffff] transition-none">
    System_Offline
  </h1>
  <p className="text-[#ffff00] font-mono text-lg mb-10 max-w-2xl text-center border-l-4 border-[#ff00ff] pl-4 relative z-10 group-hover:text-[#ffffff] group-hover:border-[#00ffff] transition-none">
    Critical error encountered in sector 7. Reality matrix is undergoing severe chromatic fragmentation.
  </p>
  <button className="px-12 py-4 bg-[#ff0000] text-white font-mono font-black uppercase tracking-[0.3em] border-[4px] border-[#0a0a0a] shadow-[8px_8px_0_#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] hover:shadow-[-8px_-8px_0_#ff00ff] active:skew-x-[25deg] active:scale-y-75 active:shadow-none transition-none relative z-10">
    Force_Restart
  </button>
</div>`,
    },
    footer: {
      name: "页脚",
      description: "故障风格页脚，带RGB hover 和 skew 色块图标",
      code: `<footer className="w-full px-8 py-12 bg-[#0a0a0a] border-t-2 border-[#333333] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-hidden">
  <div className="flex flex-col gap-2 relative">
    <span className="text-[#ff00ff] font-mono font-black text-2xl uppercase tracking-widest hover:[text-shadow:4px_0_#00ffff,-4px_0_#ffff00] transition-none cursor-default">
      End_Of_Line
    </span>
    <span className="text-[#333333] font-mono text-sm uppercase">
      2099 GLITCH CORP. ALL RIGHTS CORRUPTED.
    </span>
  </div>
  <div className="flex gap-4">
    <div className="w-8 h-8 bg-[#00ffff] hover:bg-[#ff00ff] hover:translate-y-2 hover:-skew-x-12 transition-none border-2 border-[#0a0a0a]" />
    <div className="w-8 h-8 bg-[#ffff00] hover:bg-[#00ffff] hover:-translate-y-2 hover:skew-x-12 transition-none border-2 border-[#0a0a0a]" />
    <div className="w-8 h-8 bg-[#ff0000] hover:bg-[#ffff00] hover:translate-x-2 transition-none border-2 border-[#0a0a0a]" />
  </div>
</footer>`,
    },
  },

  globalCss: `/* Glitch Art Global Styles */

:root {
  --glitch-cyan: #00ffff;
  --glitch-magenta: #ff00ff;
  --glitch-yellow: #ffff00;
  --glitch-black: #0a0a0a;
  --glitch-white: #ffffff;
}

/* Scan line overlay */
.glitch-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 255, 0.03) 2px,
    rgba(0, 255, 255, 0.03) 4px
  );
  pointer-events: none;
}

/* RGB split text effect using data-text attribute */
.glitch-rgb {
  position: relative;
}
.glitch-rgb::before {
  content: attr(data-text);
  position: absolute;
  top: 3px;
  left: 5px;
  color: var(--glitch-magenta);
  opacity: 0.5;
  clip-path: inset(0 0 50% 0);
}
.glitch-rgb::after {
  content: attr(data-text);
  position: absolute;
  top: -3px;
  left: -5px;
  color: var(--glitch-yellow);
  opacity: 0.3;
  clip-path: inset(50% 0 0 0);
}

/* Horizontal displacement band */
.glitch-displace {
  position: relative;
}
.glitch-displace::after {
  content: "";
  position: absolute;
  left: -10px;
  right: -10px;
  top: 50%;
  height: 3px;
  background: var(--glitch-magenta);
  opacity: 0.2;
  transform: translateY(-50%);
  pointer-events: none;
}

/* VHS tracking error */
.glitch-vhs::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 20%, rgba(0, 255, 255, 0.08) 40%, rgba(255, 0, 255, 0.06) 60%, transparent 80%);
  pointer-events: none;
}

/* Noise texture */
.glitch-noise::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  pointer-events: none;
}`,

  aiRules: `你是故障艺术（Glitch Art）风格的前端开发专家。生成的所有代码必须严格遵循以下规范。

## 语言要求

- 所有 UI 文案、按钮文字、标签、占位符、aria-label 使用中文
- 代码注释使用中文
- 变量名和 className 保持英文

## 色彩体系

主色板仅限 CMY + 黑白，不允许任何其他装饰色：
- 青色 #00ffff：主强调色、文字、链接、焦点边框
- 品红 #ff00ff：次强调色、标签、错误状态、左边框标记
- 黄色 #ffff00：第三强调色、警告、高亮、hover 跳变色
- 红色 #ff0000：仅用于危险/紧急状态指示
- 纯黑 #0a0a0a：所有背景，禁止使用其他深色
- 白色 #ffffff：正文文字（低透明度 text-white/40 ~ text-white/70）
- 灰色 #333333：分隔线、禁用态、placeholder

## 排版规则

- 全局使用等宽字体 font-mono，禁止 font-sans / font-serif
- 标题：font-black uppercase tracking-widest 或 tracking-[0.2em]，尺寸 text-2xl ~ text-8xl
- 正文：text-sm leading-relaxed，颜色 text-white/40 或 text-[#a0a0a0]
- 标签/状态文字：text-xs font-bold uppercase tracking-wider
- 行高：标题 leading-tight (1.1)，正文 leading-relaxed (1.5)

## 布局与间距

- 容器：max-w-7xl mx-auto px-6 md:px-12
- 区块纵向间距：py-12 md:py-16，区块间用 border-b border-[#333333] 分隔
- 卡片内间距：p-6 ~ p-8
- 元素间距：space-y-3 ~ space-y-4（列表），gap-4 ~ gap-8（网格）
- 网格布局：grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

## 核心视觉技法

1. RGB 通道分离（必须）：
   - 默认：[text-shadow:3px_0_#ff00ff,-3px_0_#00ffff]
   - hover 放大：[text-shadow:6px_0_#ff00ff,-6px_0_#00ffff]
   - 应用于所有标题和交互元素

2. 扫描线纹理覆盖：
   - bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.03)_2px,rgba(0,255,255,0.03)_4px)]
   - 作为 absolute inset-0 伪层叠加，pointer-events-none

3. 纯色块偏移阴影（替代所有标准阴影）：
   - 按钮：shadow-[4px_4px_0_#ff00ff]，hover 反转 shadow-[-4px_-4px_0_#ffff00]
   - 焦点：shadow-[4px_4px_0_#ff00ff,-4px_-4px_0_#00ffff]
   - 禁止 shadow-sm / shadow-md / shadow-lg

4. 左边框标记（卡片专用）：
   - border-l-4 ~ border-l-8 border-[#ff00ff]
   - hover 切换：hover:border-[#00ffff]

5. 水平位移带：全宽色条穿越元素，模拟信号错位
6. 数据损坏块：散布半透明色彩矩形，模拟数据丢失

## 交互规则

- 所有状态切换使用 transition-none，模拟帧丢失，禁止平滑过渡
- hover 三件套：
  1. 前景/背景色快速反转（如 hover:bg-[#00ffff] hover:text-[#0a0a0a]）
  2. RGB 偏移放大至 6px
  3. 微位移 hover:translate-x-1 或 hover:-translate-x-1
- active 撕裂效果：active:skew-x-[-15deg] active:scale-y-90 active:shadow-none
- focus 焦点：focus:border-[#00ffff] + 纯色块偏移阴影，focus:outline-none

## 响应式设计

- 标题尺寸递进：text-2xl md:text-4xl lg:text-6xl
- 布局断点切换：flex-col md:flex-row
- 间距递进：px-6 md:px-12，py-8 md:py-16
- Hero 最小高度：min-h-[60vh]

## 组件模式速查

- 按钮：bg-[#0a0a0a] border-2 border-[#00ffff] + 纯色块阴影 + transition-none + active 撕裂
- 卡片：bg-[#0a0a0a] border-l-8 + 扫描线伪层 + group hover 联动
- 输入框：bg-[#0a0a0a] border-2 border-[#333333] + focus 青色边框 + 偏移阴影
- 导航：border-b-4 border-[#ff00ff] + hover skew 扭曲链接
- 状态指示器：w-3 h-3 纯色块 + hover 变色 + animate-ping

## 绝对禁止

- 任何圆角（rounded-lg/xl/full）——只允许 rounded-none
- 标准柔和阴影（shadow-sm/md/lg）——只允许纯色块偏移阴影
- 衬线或无衬线字体——只允许 font-mono
- 毛玻璃效果（backdrop-blur）
- 平滑过渡曲线（ease-in-out、spring、duration-300+）
- CMY + 红 + 黑白灰以外的任何颜色
- 渐变背景（linear-gradient 仅用于扫描线纹理）`,

  aiRulesEn: `You are a Glitch Art design style frontend development expert. All generated code must strictly follow these constraints.

## Language

- All UI copy, button text, labels, placeholders, and aria-labels in Chinese
- Code comments in Chinese
- Variable names and classNames remain in English

## Color System

Palette is strictly CMY + black/white -- no other decorative colors allowed:
- Cyan #00ffff: primary accent, text, links, focus borders
- Magenta #ff00ff: secondary accent, labels, error states, left-border markers
- Yellow #ffff00: tertiary accent, warnings, highlights, hover jump color
- Red #ff0000: danger/urgent status indicators only
- Black #0a0a0a: all backgrounds, no other dark shades
- White #ffffff: body text at low opacity (text-white/40 ~ text-white/70)
- Gray #333333: dividers, disabled state, placeholders

## Typography

- Monospace only: font-mono everywhere, never font-sans / font-serif
- Headings: font-black uppercase tracking-widest or tracking-[0.2em], text-2xl ~ text-8xl
- Body: text-sm leading-relaxed, color text-white/40 or text-[#a0a0a0]
- Labels/status: text-xs font-bold uppercase tracking-wider
- Line height: headings leading-tight (1.1), body leading-relaxed (1.5)

## Layout & Spacing

- Container: max-w-7xl mx-auto px-6 md:px-12
- Section vertical spacing: py-12 md:py-16, separated by border-b border-[#333333]
- Card padding: p-6 ~ p-8
- Element spacing: space-y-3 ~ space-y-4 (lists), gap-4 ~ gap-8 (grids)
- Grid layout: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

## Core Visual Techniques

1. RGB channel split (mandatory):
   - Default: [text-shadow:3px_0_#ff00ff,-3px_0_#00ffff]
   - Hover amplified: [text-shadow:6px_0_#ff00ff,-6px_0_#00ffff]
   - Apply to all headings and interactive elements

2. Scanline texture overlay:
   - bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.03)_2px,rgba(0,255,255,0.03)_4px)]
   - As absolute inset-0 pseudo-layer, pointer-events-none

3. Solid-block offset shadows (replace all standard shadows):
   - Buttons: shadow-[4px_4px_0_#ff00ff], hover invert shadow-[-4px_-4px_0_#ffff00]
   - Focus: shadow-[4px_4px_0_#ff00ff,-4px_-4px_0_#00ffff]
   - Never use shadow-sm / shadow-md / shadow-lg

4. Left-border markers (cards):
   - border-l-4 ~ border-l-8 border-[#ff00ff]
   - Hover swap: hover:border-[#00ffff]

5. Horizontal displacement bands: full-width color bars crossing elements
6. Data corruption blocks: scattered semi-transparent color rectangles

## Interaction Rules

- All state changes use transition-none to simulate frame drops, no smooth transitions
- Hover trio:
  1. Rapid foreground/background inversion (e.g., hover:bg-[#00ffff] hover:text-[#0a0a0a])
  2. RGB offset amplified to 6px
  3. Micro-shift hover:translate-x-1 or hover:-translate-x-1
- Active tear: active:skew-x-[-15deg] active:scale-y-90 active:shadow-none
- Focus: focus:border-[#00ffff] + solid-block offset shadow, focus:outline-none

## Responsive Design

- Heading size progression: text-2xl md:text-4xl lg:text-6xl
- Layout breakpoint switch: flex-col md:flex-row
- Spacing progression: px-6 md:px-12, py-8 md:py-16
- Hero minimum height: min-h-[60vh]

## Component Pattern Quick Reference

- Button: bg-[#0a0a0a] border-2 border-[#00ffff] + solid-block shadow + transition-none + active tear
- Card: bg-[#0a0a0a] border-l-8 + scanline pseudo-layer + group hover linkage
- Input: bg-[#0a0a0a] border-2 border-[#333333] + focus cyan border + offset shadow
- Nav: border-b-4 border-[#ff00ff] + hover skew-distorted links
- Status indicator: w-3 h-3 solid color block + hover color swap + animate-ping

## Absolutely Forbidden

- Any rounded corners (rounded-lg/xl/full) -- rounded-none only
- Standard soft shadows (shadow-sm/md/lg) -- solid-block offset shadows only
- Serif or sans-serif fonts -- font-mono exclusively
- Frosted glass (backdrop-blur)
- Smooth transition curves (ease-in-out, spring, duration-300+)
- Any color outside CMY + red + black/white/gray
- Gradient backgrounds (linear-gradient only for scanline textures)`,

  examplePrompts: [
    {
      title: "故障艺术着陆页",
      titleEn: "Glitch Art Landing Page",
      description: "数字故障风格的着陆页，带RGB分离标题和数据损坏面板",
      descriptionEn: "Digital glitch landing page with RGB split title and data corruption panels",
      prompt: `Use Glitch Art style to create a cyberpunk terminal landing page:
1. Background: pure black with scan line overlay and VHS tracking error lines
2. Title: large mono font with 3-layer RGB channel split (cyan/magenta/yellow offsets)
3. Cards: dark panels with left border accent and displacement band top borders
4. Only use cyan, magenta, yellow on black -- no other colors
5. Include signal monitor panel with hex readouts and progress bars
6. All elements use sharp corners (rounded-none) and RGB split shadows`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 故障艺术风风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Glitch Art style",
      prompt: `Create a SaaS landing page using Glitch Art style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 故障艺术风风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Glitch Art style",
      prompt: `Create a portfolio showcase page using Glitch Art style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "glitch-art-warm",
      name: "故障艺术风暖色版",
      nameEn: "Glitch Art Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#36e5ff",
        secondary: "#232323",
        accent: ["#ff008b", "#86ff17", "#ffffff"],
      },
    },
    {
      id: "glitch-art-cool",
      name: "故障艺术风冷色版",
      nameEn: "Glitch Art Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#00ff93",
        secondary: "#090909",
        accent: ["#8b1cff", "#ffd829", "#ffffff"],
      },
    },
  ],
};
