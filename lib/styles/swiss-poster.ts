import { DesignStyle } from "./index";

export const swissPoster: DesignStyle = {
  slug: "swiss-poster",
  name: "瑞士海报风",
  nameEn: "Swiss Poster",
  description:
    "大胆排版、网格对齐、原色色块和实验性布局。源于瑞士国际主义海报设计传统，以超大字体和强烈的视觉层次构建信息传达。与 swiss-style 的区别在于更注重海报级别的实验性大排版。",
  cover: "/styles/swiss-poster.svg",
  styleType: "visual",
  tags: ["modern", "minimal", "high-contrast"],
  category: "modern",
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: ["#ff0000", "#0057b8", "#ffcc00"],
  },
  keywords: ["海报", "大字体", "网格", "实验排版", "国际主义", "12列网格", "色块"],

  philosophy: `Swiss Poster 风格源于瑞士国际主义设计运动的海报传统，追求极致的排版表现力。

核心理念：
- 超大排版：使用极端大小的字体创造视觉冲击（160px 标题 vs 10px 标签）
- 12列网格系统：所有内容严格对齐到 grid-cols-12，使用非对称分栏
- 原色色块：黑白为主，红蓝黄作为大面积色块强调
- 边框分隔：使用 border-2 border-[#000000] 分隔区域，不使用阴影或间距
- 零间距：gap-0 让元素边缘紧贴，以边框线作为视觉分隔
- 无装饰：没有圆角、阴影、渐变、模糊，只有纯色和线条`,

  doList: [
    "使用超大号无衬线粗体字（font-sans font-black）",
    "严格遵循 12 列网格对齐（grid-cols-12）",
    "使用黑白为主色调",
    "使用原色（红 #ff0000、蓝 #0057b8、黄 #ffcc00）作为色块强调",
    "保持直角边缘（rounded-none）",
    "文字全部大写（uppercase tracking-widest）",
    "使用 border-2 border-[#000000] 分隔区域",
    "使用 gap-0 让元素紧贴",
    "使用非对称布局（如 3/9、8/4 分栏）",
  ],

  dontList: [
    "禁止使用装饰性字体或等宽字体",
    "禁止使用超过 rounded-sm 的圆角",
    "禁止使用任何阴影（shadow-sm 及以上）",
    "禁止使用渐变",
    "禁止使用虚线边框（border-dashed）",
    "禁止使用元素间距（gap-4 等），用 gap-0 + 边框",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Swiss Poster 风格按钮 - 黑色粗体大写无圆角",
      code: `<button className="
  px-8 py-3
  bg-[#000000] text-[#ffffff]
  font-sans font-black uppercase tracking-widest
  rounded-none
  border-2 border-[#000000]
  hover:bg-[#ff0000] hover:border-[#ff0000]
  active:scale-[0.98]
  transition-all duration-100
">
  ENTER
</button>`,
    },
    card: {
      name: "卡片",
      description: "Swiss Poster 风格卡片 - 边框分隔色块悬停",
      code: `<div className="
  p-8
  bg-[#ffffff]
  border-2 border-[#000000]
  rounded-none
  hover:bg-[#ff0000] hover:text-[#ffffff]
  group
  transition-all duration-100
">
  <h3 className="text-3xl font-sans font-black text-[#000000] group-hover:text-[#ffffff] uppercase tracking-tight mb-3 transition-colors duration-100">
    HELVETICA
  </h3>
  <p className="text-[#000000]/60 group-hover:text-[#ffffff]/70 font-sans transition-colors duration-100">
    Grid-aligned typographic content
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Swiss Poster 风格输入框 - 仅底部边框透明背景",
      code: `<input
  type="text"
  placeholder="TYPE HERE"
  className="
    w-full px-0 py-3
    bg-transparent
    border-0 border-b-2 border-[#000000]
    rounded-none
    text-[#000000] placeholder-[#000000]/20
    font-sans font-bold text-lg
    focus:border-[#ff0000]
    focus:outline-none
    transition-all duration-100
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Swiss Poster 风格 Hero - 非对称分栏超大排版",
      code: `<section className="border-b-2 border-[#000000]">
  <div className="grid grid-cols-12">
    <div className="col-span-12 md:col-span-8 px-6 md:px-12 pt-8 pb-12 md:border-r-2 border-[#000000]">
      <h1 className="text-[80px] md:text-[120px] lg:text-[160px] font-sans font-black text-[#000000] uppercase leading-[0.85] tracking-tighter">
        SWISS
      </h1>
      <h2 className="text-[50px] md:text-[80px] lg:text-[100px] font-sans font-black text-[#000000] uppercase leading-[0.85] tracking-tighter -mt-2">
        POSTER
      </h2>
      <p className="text-xs font-sans text-[#000000]/50 leading-relaxed uppercase tracking-wider mt-8 max-w-md">
        Bold typography. Mathematical grid system. Asymmetric composition.
      </p>
      <div className="flex gap-0 mt-10">
        <button className="px-8 py-4 bg-[#000000] text-[#ffffff] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] hover:bg-[#ff0000] hover:border-[#ff0000] transition-all duration-100 text-sm">
          EXPLORE
        </button>
        <button className="px-8 py-4 bg-transparent text-[#000000] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] border-l-0 hover:bg-[#000000] hover:text-[#ffffff] transition-all duration-100 text-sm">
          LEARN
        </button>
      </div>
    </div>
    <div className="hidden md:flex col-span-4 bg-[#ff0000] items-center justify-center min-h-[400px] relative">
      <span className="font-sans font-black text-[#ffffff] text-sm uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180">
        INTERNATIONAL STYLE
      </span>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Swiss Poster Global Styles */

:root {
  --sp-black: #000000;
  --sp-white: #ffffff;
  --sp-red: #ff0000;
  --sp-blue: #0057b8;
  --sp-yellow: #ffcc00;
}

/* Structural grid overlay for development */
.sp-grid-overlay {
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: calc(100% / 12) 100px;
}

/* Color block accents */
.sp-block-red { background-color: var(--sp-red); }
.sp-block-blue { background-color: var(--sp-blue); }
.sp-block-yellow { background-color: var(--sp-yellow); }

/* Tight tracking for poster headings */
.sp-tight { letter-spacing: -0.05em; }

/* Structural divider line */
.sp-divider {
  border-top: 2px solid var(--sp-black);
}

/* Vertical text for sidebar labels */
.sp-vertical-text {
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  letter-spacing: 0.5em;
}

/* Asymmetric grid helper - 3/9 split */
.sp-grid-3-9 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
.sp-grid-3-9 > :first-child { grid-column: span 3; }
.sp-grid-3-9 > :last-child { grid-column: span 9; }

/* Edge-to-edge buttons */
.sp-button-group {
  display: flex;
  gap: 0;
}
.sp-button-group > * + * {
  border-left: 0;
}`,

  aiRules: `You are a Swiss Poster design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Decorative, script, or monospace fonts
- Rounded corners larger than rounded-sm (use rounded-none)
- Any shadows (shadow-sm, shadow-md, shadow-lg, etc.) - Swiss Poster has NO shadows
- Gradients of any kind
- Dashed borders (border-dashed) - use border-solid only
- Element spacing/gaps (gap-4, gap-6) - use gap-0 with border dividers
- Backdrop blur or glass effects
- Decorative elements or embellishments

## Must Follow

- Black and white as primary palette: #000000, #ffffff
- Accent color blocks: red #ff0000, blue #0057b8, yellow #ffcc00
- Extra bold sans-serif: font-sans font-black
- All uppercase: uppercase tracking-widest
- Sharp edges: rounded-none everywhere
- 12-column grid alignment: grid-cols-12 with asymmetric splits
- Borders as dividers: border-2 border-[#000000]
- Zero gaps: gap-0, elements butt against each other
- Extreme type scale contrast (160px heading vs 10px label)
- Non-symmetric layouts (3/9, 8/4 column splits)

## Color Palette

Primary:
- Black: #000000 (text, borders, backgrounds)
- White: #ffffff (backgrounds)
- Red: #ff0000 (color blocks, hover states)
- Blue: #0057b8 (color blocks)
- Yellow: #ffcc00 (color blocks)

## Special Elements

- 12-column grid system with visible structural lines
- Asymmetric column splits (not 6/6 - use 3/9, 8/4, etc.)
- Color block backgrounds (full sections in red/blue/yellow)
- Visible grid column markers
- Extreme font size contrasts (160px vs 10px)
- Edge-to-edge button groups (gap-0, border-l-0)
- Vertical text using writing-mode: vertical-lr
- Section borders as visual separators instead of spacing`,

  examplePrompts: [
    {
      title: "瑞士海报着陆页",
      titleEn: "Swiss Poster Landing Page",
      description: "12列网格非对称布局的海报风格着陆页",
      descriptionEn: "12-column grid asymmetric poster landing page",
      prompt: `Use Swiss Poster style to create a landing page:
1. Background: white with visible 12-column structural grid
2. Title: extremely large (160px) black sans-serif, uppercase, tight tracking
3. Layout: asymmetric grid-cols-12 splits (8/4, 3/9), never symmetric
4. Cards: border-only, no shadows, color block hover states
5. Buttons: edge-to-edge gap-0, joined with border-l-0
6. Color blocks: large red/blue/yellow sections as accents
7. Section dividers: border-2 border-[#000000], no spacing
8. Overall bold, grid-based, mathematical typographic poster aesthetic`,
    },
  ],
};
