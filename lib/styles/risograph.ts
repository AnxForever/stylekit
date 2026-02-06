import { DesignStyle } from "./index";

export const risograph: DesignStyle = {
  slug: "risograph",
  name: "Risograph 印刷风",
  nameEn: "Risograph",
  description:
    "Risograph 印刷机的独特美学，2-3色套印效果、半调网点、套印错位和有限色彩，呈现独特的印刷质感和手工批量感。",
  cover: "/styles/risograph.svg",
  styleType: "visual",
  tags: ["expressive", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#ff6b9d",
    secondary: "#2563eb",
    accent: ["#ff8a00", "#22c55e"],
  },
  keywords: ["Risograph", "印刷", "套印", "半调", "网点", "错位", "手工"],

  philosophy: `Risograph 是一种源于日本的快速印刷技术，因其独特的视觉效果而被艺术家和设计师广泛采用。

核心理念：
- 有限色彩：通常只使用2-3种墨色叠加
- 套印错位：颜色层之间故意的微妙偏移
- 半调网点：可见的网点纹理和颗粒感
- 印刷美学：拥抱印刷的不完美和独特性`,

  doList: [
    "限制使用2-3种主色调",
    "添加套印错位效果（offset shadow）",
    "使用粗体等宽或无衬线字体",
    "保持扁平色块无渐变",
    "添加颗粒/网点纹理感",
    "使用米白/奶白色纸张背景",
  ],

  dontList: [
    "禁止使用复杂的渐变效果",
    "禁止使用太多颜色（最多3-4种）",
    "禁止使用写实阴影或光照效果",
    "禁止使用圆滑的圆角设计",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Risograph 风格按钮",
      code: `<button className="
  px-6 py-3
  bg-[#ff6b9d] text-white
  font-mono font-bold uppercase tracking-wider
  rounded-sm
  shadow-[3px_3px_0px_#2563eb]
  hover:translate-x-[2px] hover:translate-y-[2px]
  hover:shadow-[1px_1px_0px_#2563eb]
  transition-all duration-200
">
  Print
</button>`,
    },
    card: {
      name: "卡片",
      description: "Risograph 风格卡片",
      code: `<div className="
  p-8
  bg-[#fffbf0]
  border-2 border-[#1a1a1a]
  rounded-sm
  shadow-[4px_4px_0px_#ff6b9d]
">
  <h3 className="text-2xl font-mono font-bold text-[#2563eb] uppercase mb-3">
    OVERPRINT
  </h3>
  <p className="text-[#1a1a1a]/70 font-mono">
    Limited palette, unlimited expression
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Risograph 风格输入框",
      code: `<input
  type="text"
  placeholder="Type here..."
  className="
    w-full px-4 py-3
    bg-[#fffbf0]
    border-2 border-[#1a1a1a]
    rounded-sm
    text-[#1a1a1a] placeholder-[#1a1a1a]/40
    font-mono
    focus:border-[#2563eb]
    focus:shadow-[2px_2px_0px_#ff6b9d]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Risograph 风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#fffbf0]
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-mono font-bold text-[#ff6b9d] uppercase mb-2">
      RISO
    </h1>
    <h2 className="text-4xl md:text-6xl font-mono font-bold text-[#2563eb] uppercase -mt-4 ml-4 mb-6">
      GRAPH
    </h2>
    <p className="text-xl text-[#1a1a1a]/70 font-mono mb-8">
      Print aesthetics for the digital age
    </p>
    <button className="
      px-10 py-4
      bg-[#2563eb] text-white
      font-mono font-bold uppercase tracking-wider
      rounded-sm
      shadow-[4px_4px_0px_#ff6b9d]
      hover:translate-x-[2px] hover:translate-y-[2px]
      hover:shadow-[2px_2px_0px_#ff6b9d]
      transition-all
    ">
      Explore
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Risograph Global Styles */

:root {
  --riso-pink: #ff6b9d;
  --riso-blue: #2563eb;
  --riso-orange: #ff8a00;
  --riso-green: #22c55e;
  --riso-paper: #fffbf0;
}

/* Grain texture overlay */
.riso-grain::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
  pointer-events: none;
  mix-blend-mode: multiply;
}

/* Overprint offset */
.riso-offset {
  position: relative;
}
.riso-offset::after {
  content: attr(data-text);
  position: absolute;
  top: 2px;
  left: 3px;
  color: var(--riso-blue);
  opacity: 0.6;
  mix-blend-mode: multiply;
}

/* Halftone pattern */
.riso-halftone {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 4px 4px;
}`,

  aiRules: `You are a Risograph design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Complex gradients or realistic shadows
- More than 3-4 colors in total
- Rounded corners (use rounded-sm only)
- Realistic lighting or 3D effects

## Must Follow

- Limited palette: pink #ff6b9d, blue #2563eb, orange #ff8a00, green #22c55e
- Paper-white background bg-[#fffbf0]
- Monospace fonts font-mono
- Offset shadows shadow-[3px_3px_0px_color]
- Bold borders border-2 border-[#1a1a1a]
- Flat colors only, no gradients

## Color Palette

Primary:
- Fluorescent Pink: #ff6b9d
- Blue: #2563eb
- Fluorescent Orange: #ff8a00
- Green: #22c55e
- Paper: #fffbf0

## Special Elements

- Overprint offset effects
- Grain/noise texture overlays
- Halftone dot patterns
- Registration marks as decoration`,

  examplePrompts: [
    {
      title: "Risograph 海报页面",
      titleEn: "Risograph Poster Page",
      description: "印刷风格的宣传页面",
      descriptionEn: "Print-aesthetic promotional page",
      prompt: `Use Risograph style to create a poster-like landing page:
1. Background: paper-white with grain texture
2. Title: bold mono font with overprint offset
3. Cards: bold borders with color offset shadows
4. Only use 2-3 colors maximum
5. Overall hand-printed, limited palette aesthetic`,
    },
  ],
};
