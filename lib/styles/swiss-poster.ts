import type { DesignStyle } from "./types";

export const swissPoster: DesignStyle = {
  slug: "swiss-poster",
  name: "瑞士海报风",
  nameEn: "Swiss Poster",
  description:
    "大胆排版、网格对齐、原色色块和实验性布局。源于瑞士国际主义海报设计传统，以超大字体和强烈的视觉层次构建信息传达。与 swiss-style 的区别在于更注重海报级别的实验性大排版。",
  descriptionEn:
    "Bold typography, grid alignment, primary color blocks, and experimental layouts. Rooted in the Swiss International Style poster design tradition, building information delivery through oversized type and strong visual hierarchy. Differs from swiss-style by focusing more on poster-level experimental large-scale typography.",
  cover: "/styles/swiss-poster.svg",
  styleType: "visual",
  tags: ["high-contrast"],
  category: "modern",
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: ["#ff0000", "#0057b8", "#ffcc00", "#6c3b00"],
  },
  keywords: ["海报", "大字体", "网格", "实验排版", "国际主义", "12列网格", "色块", "modern", "contemporary", "sleek"],
  keywordsEn: ["Swiss poster", "Swiss poster design", "oversized typography", "big type", "experimental typography", "typographic poster", "International Typographic Style", "grid layout", "color blocks", "bold typography", "poster layout"],

  philosophy: `Swiss Poster 风格源于瑞士国际主义设计运动的海报传统，追求极致的排版表现力。

核心理念：
- 超大排版：使用极端大小的字体创造视觉冲击（160px 标题 vs 10px 标签）
- 12列网格系统：所有内容严格对齐到 grid-cols-12，使用非对称分栏
- 原色色块：黑白为主，红蓝黄作为大面积色块强调
- 边框分隔：使用 border-2 border-[#000000] 分隔区域，不使用阴影或间距
- 零间距：gap-0 让元素边缘紧贴，以边框线作为视觉分隔
- 无装饰：没有圆角、阴影、渐变、模糊，只有纯色和线条

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Swiss Poster style originates from the poster tradition of the Swiss International Style design movement, pursuing the ultimate in typographic expressiveness.

Core principles:
- Oversized typography: Using extreme font sizes to create visual impact (160px headings vs 10px labels)
- 12-column grid system: All content strictly aligned to grid-cols-12, using asymmetric column splits
- Primary color blocks: Black and white as primary, with red, blue, and yellow as large-area color block accents
- Border separation: Using border-2 border-[#000000] to divide regions, not shadows or spacing
- Zero spacing: gap-0 keeps element edges flush, using border lines as visual separators
- No decoration: No rounded corners, shadows, gradients, or blur -- only solid colors and lines`,

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
    "Absolute Objectivity: zero translate, scale, or shadow on any element — Swiss Poster communicates through color and typography alone, motion is noise",
    "Snap Transitions: all interactions use `transition-none` — color changes are instantaneous hard cuts, like ink stamped onto paper",
    "Color Block Invasion: hover replaces background with solid black `hover:bg-[#000000]` and text inverts to white `hover:text-[#ffffff]` — the color block takes over the entire element",
    "Typographic Highlighting: year/label element switches to `group-hover:text-[#ff0000] transition-none` on hover — the red typographic accent activates like a stamp",
  ],

  doListEn: [
    "Use oversized bold sans-serif type (font-sans font-black)",
    "Strictly follow 12-column grid alignment (grid-cols-12)",
    "Use black and white as primary colors",
    "Use primary colors (red #ff0000, blue #0057b8, yellow #ffcc00) as color block accents",
    "Keep sharp edges (rounded-none)",
    "All text uppercase (uppercase tracking-widest)",
    "Use border-2 border-[#000000] to divide regions",
    "Use gap-0 to keep elements flush",
    "Use asymmetric layouts (e.g., 3/9, 8/4 column splits)",
    "Absolute Objectivity: zero translate, scale, or shadow on any element -- Swiss Poster communicates through color and typography alone, motion is noise",
    "Snap Transitions: all interactions use `transition-none` -- color changes are instantaneous hard cuts, like ink stamped onto paper",
    "Color Block Invasion: hover replaces background with solid black `hover:bg-[#000000]` and text inverts to white `hover:text-[#ffffff]` -- the color block takes over the entire element",
    "Typographic Highlighting: year/label element switches to `group-hover:text-[#ff0000] transition-none` on hover -- the red typographic accent activates like a stamp",
  ],

  dontList: [
    "禁止使用装饰性字体或等宽字体",
    "禁止使用超过 rounded-sm 的圆角",
    "禁止使用任何阴影（shadow-sm 及以上）",
    "禁止使用渐变",
    "禁止使用虚线边框（border-dashed）",
    "禁止使用元素间距（gap-4 等），用 gap-0 + 边框",
    "禁止使用任何 `translate`、`scale` 或 `rotate` 动画（Absolute Objectivity — Swiss Poster 用色彩和排版传达，不用运动）",
    "禁止使用 `active:scale-[0.98]` 或任何 scale（海报不会因为被触碰而缩放）",
    "禁止使用 `transition-all duration-*` 中任何非零延迟（必须 `transition-none` — 印刷颜色切换是瞬时的）",
    "禁止 hover 只改变文字颜色而不改变背景（Color Block Invasion 要求整块颜色翻转，不只是文字变色）",
  ],

  dontListEn: [
    "Do not use decorative, script, or monospace fonts",
    "Do not use rounded corners larger than rounded-sm",
    "Do not use any shadows (shadow-sm and above)",
    "Do not use gradients",
    "Do not use dashed borders (border-dashed)",
    "Do not use element spacing (gap-4, etc.) -- use gap-0 + borders",
    "Do not use any `translate`, `scale`, or `rotate` animations (Absolute Objectivity -- Swiss Poster communicates through color and typography, not motion)",
    "Do not use `active:scale-[0.98]` or any scale (posters do not shrink when touched)",
    "Do not use any non-zero delay in `transition-all duration-*` (must use `transition-none` -- print color switching is instantaneous)",
    "Do not change only text color on hover without changing background (Color Block Invasion requires full color block inversion, not just text color change)",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Swiss Poster 风格按钮，Color Block Invasion 整块颜色翻转 + Snap Transitions `transition-none` + active 反转为白底黑字",
      code: `<button className="
  px-8 py-3
  bg-[#000000] text-[#ffffff]
  font-sans font-black uppercase tracking-widest
  rounded-none
  border-2 border-[#000000]
  hover:bg-[#ff0000] hover:border-[#ff0000]
  active:bg-[#ffffff] active:text-[#000000] active:border-[#000000]
  transition-none
">
  ENTER
</button>`,
    },
    card: {
      name: "卡片",
      description: "Swiss Poster 风格卡片，Color Block Invasion 整块黑色 + Typographic Highlighting 年份标签变红 + `transition-none` 瞬切",
      code: `<div className="group p-8 bg-[#ffffff] border-2 border-[#000000] rounded-none hover:bg-[#000000] transition-none cursor-pointer">
  <span className="text-xs font-sans font-black text-[#000000]/40 group-hover:text-[#ff0000] uppercase tracking-[0.3em] transition-none">
    2024
  </span>
  <h3 className="text-3xl font-sans font-black text-[#000000] group-hover:text-[#ffffff] uppercase tracking-tight mb-3 mt-2 transition-none">
    HELVETICA
  </h3>
  <div className="h-[2px] bg-[#000000] group-hover:bg-[#ff0000] transition-none mb-4" />
  <p className="text-[#000000]/60 group-hover:text-[#ffffff]/70 font-sans transition-none">
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
}
@keyframes swiss-poster-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes swiss-poster-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.swiss-poster-card {
  position: relative;
  overflow: hidden;
}

.swiss-poster-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.05), transparent);
  pointer-events: none;
}

.swiss-poster-card:hover::before {
  opacity: 1;
}

.swiss-poster-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(0, 0, 0, 0.08);
}

.swiss-poster-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.swiss-poster-animate-in {
  animation: swiss-poster-fade-in 0.5s ease-out both;
}`,

  aiRules: `你是一位专精于瑞士海报风格（Swiss Poster）的前端开发专家。生成的所有代码都必须严格遵循以下规范：

## 绝对禁止

- 装饰性字体、手写体或等宽字体（monospace fonts）
- 大于 rounded-sm 的圆角（请使用 rounded-none）
- 任何阴影（shadow-sm、shadow-md、shadow-lg 等）——Swiss Poster 完全没有阴影
- 任何形式的渐变
- 虚线边框（border-dashed）——只使用实线边框 border-solid
- 元素间距（gap-4、gap-6）——请使用 gap-0 配合边框分隔
- 背景模糊（backdrop blur）或玻璃拟态效果
- 装饰性元素或点缀

## 必须遵守

- 以黑白为主色调：#000000、#ffffff
- 强调色块：红 #ff0000、蓝 #0057b8、黄 #ffcc00
- 超粗无衬线字体：font-sans font-black
- 全部大写：uppercase tracking-widest
- 直角边缘：全站使用 rounded-none
- 12 列网格（grid）对齐：grid-cols-12 配合非对称分栏
- 用边框作分隔线：border-2 border-[#000000]
- 零间距：gap-0，元素边缘紧贴
- 极端的字号对比（160px 标题 vs 10px 标签）
- 非对称布局（3/9、8/4 分栏）

## 配色方案

主色：
- 黑色：#000000（文字、边框、背景）
- 白色：#ffffff（背景）
- 红色：#ff0000（色块、hover 状态）
- 蓝色：#0057b8（色块）
- 黄色：#ffcc00（色块）

## 特色元素

- 带可见结构线的 12 列网格系统
- 非对称分栏（不用 6/6，改用 3/9、8/4 等）
- 整块色块背景（整个区块使用红/蓝/黄）
- 可见的网格列标记
- 极端的字号对比（160px vs 10px）
- 边对边的按钮组（gap-0、border-l-0）
- 使用 writing-mode: vertical-lr 的竖排文字
- 用区块边框代替间距作视觉分隔

## 动效与交互规则

- 绝对客观（Absolute Objectivity）：任何可交互元素上都不允许出现 \`translate\`、\`scale\` 或 \`shadow\` 的变化。Swiss Poster 只靠色彩和排版传达信息——运动效果是干扰噪声，会削弱网格本身的权威感。
- 瞬切过渡（Snap Transitions）：所有状态变化都使用 \`transition-none\`——颜色翻转是瞬间完成的，就像油墨一次性盖印到纸上。禁止使用 \`duration-100\` 或任何带时长的过渡。
- 色块入侵（Color Block Invasion）：hover 时整个背景替换为纯黑 \`hover:bg-[#000000]\`，文字反转为 \`hover:text-[#ffffff] transition-none\`。色块必须完全接管元素——不允许局部填充，也不允许渐变。
- 字体高亮（Typographic Highlighting）：年份/分类标签在 hover 时切换为 \`group-hover:text-[#ff0000] transition-none\`——红色的排印强调像盖章一样瞬间激活，是黑白构图中唯一的色彩音符。`,

  aiRulesEn: `You are a Swiss Poster design style frontend development expert. All generated code must strictly follow these constraints:

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
- Section borders as visual separators instead of spacing

## Animation & Interaction Rules

- Absolute Objectivity: Zero \`translate\`, \`scale\`, or \`shadow\` changes on any interactive element. Swiss Poster communicates through color and typography alone -- motion is visual noise that undermines the grid's authority.
- Snap Transitions: All state changes use \`transition-none\` -- color flips are instantaneous, like ink stamped onto paper in a single press. Never use \`duration-100\` or any timed transition.
- Color Block Invasion: Hover replaces the entire background with solid black \`hover:bg-[#000000]\` and text inverts to \`hover:text-[#ffffff] transition-none\`. The color block takes over completely -- no partial fills, no gradients.
- Typographic Highlighting: The year/category label activates to \`group-hover:text-[#ff0000] transition-none\` on hover -- the red typographic accent fires like a stamp imprint, the only color note in a black-and-white composition.`,

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
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 瑞士海报风风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Swiss Poster style",
      prompt: `Create a SaaS landing page using Swiss Poster style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 瑞士海报风风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Swiss Poster style",
      prompt: `Create a portfolio showcase page using Swiss Poster style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "swiss-poster-warm",
      name: "瑞士海报风暖色版",
      nameEn: "Swiss Poster Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        accent: ["#c91a00", "#4042cf", "#94ec00"],
      },
    },
    {
      id: "swiss-poster-cool",
      name: "瑞士海报风冷色版",
      nameEn: "Swiss Poster Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#000000",
        secondary: "#e6e6e6",
        accent: ["#ff006c", "#006984", "#ffab36"],
      },
    },
  ],
};
