import type { DesignStyle } from "./types";

export const outrun: DesignStyle = {
  slug: "outrun",
  name: "Outrun 复古未来",
  nameEn: "Outrun",
  description:
    "80年代日落、棕榈树剪影、跑车、网格地平线和复古浪潮美学。洋红与紫色霓虹、青色天空，充满速度感和怀旧未来主义。",
  descriptionEn:
    "80s sunsets, palm tree silhouettes, sports cars, grid horizons, and retro wave aesthetics. Magenta and purple neon with cyan skies -- brimming with speed and nostalgic futurism.",
  cover: "/styles/outrun.svg",
  styleType: "visual",
  tags: ["retro", "high-contrast"],
  category: "retro",
  colors: {
    primary: "#ff006e",
    secondary: "#a020f0",
    accent: ["#00d4ff", "#0a0a0a", "#ff6b35", "#9f9aff"],
  },
  keywords: ["Outrun", "复古未来", "80年代", "日落", "跑车", "棕榈树", "霓虹", "retro", "vintage", "nostalgic"],

  philosophy: `Outrun 是一种根植于80年代流行文化的视觉美学，命名自同名电子游戏。它将夕阳、跑车、棕榈树和霓虹灯光融为一体，创造出一种永恒的复古未来主义视觉语言。

核心理念：
- 日落驾驶：橙粉紫的日落天空下永恒的公路之旅
- 霓虹速度：洋红与紫色的霓虹灯光表达速度与激情
- 网格地平线：透视网格地板延伸向无限的地平线
- 棕榈剪影：黑色棕榈树映衬渐变天空

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Outrun is a visual aesthetic rooted in 80s pop culture, named after the eponymous video game. It fuses sunsets, sports cars, palm trees, and neon lights into an eternal retro-futuristic visual language.

Core principles:
- Sunset drive: An eternal road trip under the orange-pink-purple sunset sky
- Neon speed: Magenta and purple neon lights expressing speed and passion
- Grid horizon: Perspective grid floor extending toward an infinite horizon
- Palm silhouettes: Black palm trees set against gradient skies`,

  doList: [
    "使用洋红、紫色、青色霓虹配色",
    "添加日落渐变天空背景",
    "使用透视网格地面效果",
    "添加霓虹发光效果",
    "使用粗体无衬线字体",
    "添加棕榈树或跑车剪影元素",
    "交互叠加双霓虹光晕：hover:shadow-[0_0_20px_#ff006e,0_0_40px_#00d4ff]（Dual Neon Glow）",
    "网格或扫描线在 hover 时可用 bg-position 产生位移，制造向地平线冲刺感（Perspective Drive）",
    "active 状态加入轻微屏幕闪烁（active:bg-[#ff006e]/20）与短促下压反馈",
  ],

  doListEn: [
    "Use magenta, purple, and cyan neon palette",
    "Add sunset gradient sky background",
    "Use perspective grid floor effect",
    "Add neon glow effects",
    "Use bold sans-serif fonts",
    "Add palm tree or sports car silhouette elements",
    "Interactions layer dual neon glow: hover:shadow-[0_0_20px_#ff006e,0_0_40px_#00d4ff] (Dual Neon Glow)",
    "Grid or scanlines use bg-position shift on hover to create a rushing-toward-horizon feel (Perspective Drive)",
    "Active state includes slight screen flash (active:bg-[#ff006e]/20) with short press feedback",
  ],

  dontList: [
    "禁止使用明亮的白色背景",
    "禁止使用现代简约风格",
    "禁止省略霓虹发光效果",
    "禁止使用柔和低饱和配色",
    "禁止只使用单色发光（Outrun 必须有洋红+青色的色散层次）",
    "禁止完全静止的网格背景（缺少速度幻觉会丢失风格核心）",
  ],

  dontListEn: [
    "Do not use bright white backgrounds",
    "Do not use modern minimalist style",
    "Do not omit neon glow effects",
    "Do not use soft low-saturation palette",
    "Do not use single-color glow only (Outrun must have magenta+cyan chromatic dispersion layers)",
    "Do not use completely static grid backgrounds (lacking speed illusion loses the style's core)",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Outrun 风格按钮，双霓虹色散与扫描线位移反馈",
      code: `<button className="
  group relative px-10 py-4
  bg-gradient-to-b from-[#110022] to-[#0a0a0a]
  text-[#00d4ff] font-black uppercase tracking-[0.2em]
  rounded-sm
  border border-[#ff006e]
  shadow-[0_0_15px_rgba(255,0,110,0.5)]
  hover:text-white hover:border-[#00d4ff]
  hover:shadow-[0_0_25px_rgba(0,212,255,0.8),inset_0_0_15px_rgba(255,0,110,0.4)]
  active:scale-95 active:bg-[#ff006e]/20
  transition-all duration-300
  overflow-hidden
">
  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#ff006e_2px,#ff006e_4px)] opacity-10 group-hover:[background-position:0_8px] transition-all duration-300" />
  <span className="relative z-10 drop-shadow-[0_0_5px_currentColor]">Drive</span>
</button>`,
    },
    card: {
      name: "卡片",
      description: "Outrun 风格卡片，地平线网格与日落霓虹响应",
      code: `<div className="
  group relative p-8
  bg-[#0a0a0a]/90
  rounded-sm
  border-t border-[#ff006e]/50
  border-b-4 border-b-[#00d4ff]/80
  shadow-[0_0_30px_rgba(255,0,110,0.2)]
  hover:shadow-[0_10px_40px_rgba(0,212,255,0.4)]
  hover:-translate-y-1
  transition-all duration-300
  backdrop-blur-md overflow-hidden cursor-crosshair
">
  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[linear-gradient(transparent_50%,rgba(0,212,255,0.2)_50%)] bg-[length:100%_4px] opacity-30 group-hover:opacity-60 group-hover:[background-position:0_12px] transition-all duration-500 [transform:perspective(100px)_rotateX(60deg)]" />
  <div className="relative z-10">
    <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#ff6b35] via-[#ff006e] to-[#a020f0] mb-4 shadow-[0_0_15px_rgba(255,107,53,0.6)] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(255,107,53,0.8)] transition-all duration-300" />
    <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00d4ff] mb-2 tracking-wider">
      NIGHT CITY
    </h3>
    <p className="text-[#ff006e] font-mono text-sm uppercase tracking-widest group-hover:text-[#ff6b35] transition-colors">
      &gt; Grid simulation active
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Outrun 风格输入框",
      code: `<input
  type="text"
  placeholder="Enter destination..."
  className="
    w-full px-6 py-4
    bg-[#0a0a0a]/60
    rounded-lg
    border border-[#a020f0]/50
    text-[#00d4ff] placeholder-[#a020f0]/50
    shadow-[0_0_10px_rgba(160,32,240,0.2)]
    focus:border-[#00d4ff]
    focus:shadow-[0_0_20px_rgba(0,212,255,0.4)]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Outrun 风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-[#0a0a0a] via-[#2d0a4e] to-[#ff006e]/30
  relative overflow-hidden
">
  {/* Sun */}
  <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-80 h-40 bg-gradient-to-t from-[#ff6b35] via-[#ff006e] to-[#a020f0] rounded-t-full opacity-80" />

  {/* Grid floor */}
  <div className="absolute bottom-0 left-0 right-0 h-1/2">
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,110,0.3)_1px,transparent_1px),linear-gradient(rgba(255,0,110,0.3)_1px,transparent_1px)] bg-[size:60px_30px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom" />
  </div>

  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#ff006e] to-[#a020f0] mb-6">
      OUTRUN
    </h1>
    <p className="text-xl text-[#00d4ff]/80 mb-8">
      Chase the sunset
    </p>
    <button className="
      px-10 py-4
      bg-gradient-to-r from-[#ff006e] to-[#a020f0]
      text-white font-bold uppercase tracking-wider
      rounded-lg
      shadow-[0_0_30px_rgba(255,0,110,0.5)]
      hover:shadow-[0_0_50px_rgba(255,0,110,0.8)]
      transition-all
    ">
      Ride
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Outrun 全局样式 */

:root {
  --outrun-magenta: #ff006e;
  --outrun-purple: #a020f0;
  --outrun-cyan: #00d4ff;
  --outrun-black: #0a0a0a;
  --outrun-orange: #ff6b35;
}

/* 霓虹发光 */
.outrun-glow {
  text-shadow:
    0 0 10px var(--outrun-magenta),
    0 0 20px var(--outrun-magenta),
    0 0 40px var(--outrun-magenta);
}

/* 网格地板 */
.outrun-grid {
  background-image:
    linear-gradient(90deg, rgba(255, 0, 110, 0.3) 1px, transparent 1px),
    linear-gradient(rgba(255, 0, 110, 0.3) 1px, transparent 1px);
  background-size: 60px 30px;
  transform: perspective(500px) rotateX(60deg);
  transform-origin: bottom;
}

/* 日落渐变 */
.outrun-sunset {
  background: linear-gradient(
    to bottom,
    #0a0a0a 0%,
    #2d0a4e 30%,
    #ff006e 60%,
    #ff6b35 100%
  );
}

/* 扫描线 */
.outrun-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15) 0px,
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}
@keyframes outrun-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes outrun-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.outrun-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(255, 0, 110, 0.08);
}

.outrun-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.outrun-animate-in {
  animation: outrun-fade-in 0.5s ease-out both;
}`,

  aiRules: `你是一个 Outrun 复古未来设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用明亮的白色背景
- 使用现代简约的设计
- 省略霓虹发光效果
- 使用正式的字体

## 必须遵守

- 洋红紫青配色 from-[#ff006e], from-[#a020f0], text-[#00d4ff]
- 深色背景 bg-[#0a0a0a]
- 霓虹发光 shadow-[0_0_20px_rgba(255,0,110,0.5)]
- 网格背景装饰
- 日落渐变 from-[#ff6b35] via-[#ff006e] to-[#a020f0]

## 配色

主色调：
- 洋红: #ff006e
- 紫色: #a020f0
- 青色: #00d4ff
- 黑色: #0a0a0a
- 橙色: #ff6b35

## 特殊元素

- 透视网格地板
- 日落太阳
- 棕榈树剪影
- 扫描线效果

## Animation & Interaction Rules

- Perspective Drive: 网格或扫描线在 hover 时通过 bg-position 位移制造高速前冲幻觉。
- Dual Neon Glow: 悬停发光至少叠加洋红与青色两层阴影，形成复古霓虹色散。
- CRT Jitter: active 状态允许短促闪烁和轻微下压，模拟老式屏幕反馈。
- Horizon Tilt: 卡片交互可配合极轻微抬升和底部光带增强地平线动势。

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

  aiRulesEn: `You are an Outrun retro-futuristic design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Bright white backgrounds
- Modern minimalist design
- Omitting neon glow effects
- Formal fonts

## Must Follow

- Magenta-purple-cyan palette from-[#ff006e], from-[#a020f0], text-[#00d4ff]
- Dark backgrounds bg-[#0a0a0a]
- Neon glow shadow-[0_0_20px_rgba(255,0,110,0.5)]
- Grid background decorations
- Sunset gradient from-[#ff6b35] via-[#ff006e] to-[#a020f0]

## Color Palette

Primary:
- Magenta: #ff006e
- Purple: #a020f0
- Cyan: #00d4ff
- Black: #0a0a0a
- Orange: #ff6b35

## Special Elements

- Perspective grid floor
- Sunset sun
- Palm tree silhouettes
- Scanline effects

## Animation & Interaction Rules

- Perspective Drive: Grid or scanlines create a high-speed forward-rush illusion through bg-position shift on hover.
- Dual Neon Glow: Hover glow layers at least magenta and cyan dual shadows for retro neon chromatic dispersion.
- CRT Jitter: Active state allows brief flashing and slight press-down, simulating vintage screen feedback.
- Horizon Tilt: Card interactions can pair with very slight lift and bottom light band enhancement for horizon momentum.`,

  examplePrompts: [
    {
      title: "复古赛车界面",
      titleEn: "Retro Racing Interface",
      description: "80年代风格赛车游戏UI",
      descriptionEn: "80s style racing game UI",
      prompt: `用 Outrun 风格创建一个复古赛车界面，要求：
1. 背景：日落渐变 + 网格地板
2. 标题：霓虹发光效果
3. 按钮：洋红霓虹边框
4. 添加太阳和棕榈树剪影
5. 整体复古未来速度感`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 Outrun 复古未来风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Outrun style",
      prompt: `Create a SaaS landing page using Outrun style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 Outrun 复古未来风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Outrun style",
      prompt: `Create a portfolio showcase page using Outrun style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "outrun-warm",
      name: "Outrun 复古未来暖色版",
      nameEn: "Outrun Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#fd0b07",
        secondary: "#aa36f2",
        accent: ["#41b9ff", "#0a0a0a", "#c68104"],
      },
    },
    {
      id: "outrun-cool",
      name: "Outrun 复古未来冷色版",
      nameEn: "Outrun Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#cd06c8",
        secondary: "#901dd8",
        accent: ["#00e49f", "#0a0a0a", "#ff5c7c"],
      },
    },
  ],
};
