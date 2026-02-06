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
  keywords: ["海报", "大字体", "网格", "实验排版", "国际主义", "平面设计"],

  philosophy: `Swiss Poster 风格源于瑞士国际主义设计运动的海报传统，追求极致的排版表现力。

核心理念：
- 超大排版：使用极端大小的字体创造视觉冲击
- 网格系统：严格的网格对齐确保秩序感
- 原色色块：黑白为主，红蓝黄作为强调色块
- 实验布局：打破常规的文字排列和裁切`,

  doList: [
    "使用超大号无衬线粗体字",
    "严格遵循网格对齐",
    "使用黑白为主色调",
    "使用原色（红 #ff0000、蓝 #0057b8、黄 #ffcc00）作为色块强调",
    "保持直角边缘（rounded-none 或 rounded-sm）",
    "文字全部大写",
  ],

  dontList: [
    "禁止使用装饰性字体",
    "禁止使用超过 rounded-sm 的圆角",
    "禁止使用柔和阴影",
    "禁止使用渐变",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Swiss Poster 风格按钮",
      code: `<button className="
  px-8 py-3
  bg-[#000000] text-[#ffffff]
  font-sans font-black uppercase tracking-widest
  rounded-none
  border-2 border-[#000000]
  hover:bg-[#ff0000] hover:border-[#ff0000]
  transition-all duration-100
">
  ENTER
</button>`,
    },
    card: {
      name: "卡片",
      description: "Swiss Poster 风格卡片",
      code: `<div className="
  p-8
  bg-[#ffffff]
  border-2 border-[#000000]
  rounded-none
">
  <h3 className="text-3xl font-sans font-black text-[#000000] uppercase tracking-tight mb-3">
    HELVETICA
  </h3>
  <p className="text-[#000000]/60 font-sans">
    Grid-aligned typographic content
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Swiss Poster 风格输入框",
      code: `<input
  type="text"
  placeholder="TYPE HERE"
  className="
    w-full px-1 py-3
    bg-transparent
    border-0 border-b-2 border-[#000000]
    rounded-none
    text-[#000000] placeholder-[#000000]/30
    font-sans font-bold
    focus:border-[#ff0000]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Swiss Poster 风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center
  bg-[#ffffff]
  relative overflow-hidden
">
  <div className="relative z-10 px-8 md:px-16 w-full">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ff0000]" />
    <h1 className="text-7xl md:text-[10rem] font-sans font-black text-[#000000] uppercase leading-none tracking-tighter relative z-10">
      SWISS
    </h1>
    <h2 className="text-5xl md:text-8xl font-sans font-black text-[#000000] uppercase leading-none tracking-tighter relative z-10">
      POSTER
    </h2>
    <div className="mt-8 flex gap-4 relative z-10">
      <button className="
        px-10 py-4
        bg-[#000000] text-[#ffffff]
        font-sans font-black uppercase tracking-widest
        rounded-none
        hover:bg-[#ff0000]
        transition-all duration-100
      ">
        EXPLORE
      </button>
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

/* Grid overlay for development */
.sp-grid-overlay {
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 8px 8px;
}

/* Color block accent */
.sp-block-red { background-color: var(--sp-red); }
.sp-block-blue { background-color: var(--sp-blue); }
.sp-block-yellow { background-color: var(--sp-yellow); }

/* Tight tracking for headings */
.sp-tight { letter-spacing: -0.05em; }

/* Divider line */
.sp-divider {
  border-top: 2px solid var(--sp-black);
}`,

  aiRules: `You are a Swiss Poster design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Decorative or script fonts
- Rounded corners larger than rounded-sm
- Soft shadows (shadow-md, shadow-lg)
- Gradients of any kind
- Decorative elements or embellishments

## Must Follow

- Black and white as primary palette
- Accent color blocks: red #ff0000, blue #0057b8, yellow #ffcc00
- Extra bold sans-serif: font-sans font-black
- All uppercase: uppercase
- Sharp edges: rounded-none
- Grid alignment
- Large to extra-large font sizes for headings
- Strong typographic hierarchy

## Color Palette

Primary:
- Black: #000000
- White: #ffffff
- Red: #ff0000
- Blue: #0057b8
- Yellow: #ffcc00

## Special Elements

- Color block backgrounds
- Grid overlay guides
- Extreme font size contrasts
- Asymmetric layouts with strong alignment`,

  examplePrompts: [
    {
      title: "瑞士海报着陆页",
      titleEn: "Swiss Poster Landing Page",
      description: "大排版实验性海报风格着陆页",
      descriptionEn: "Bold experimental typographic poster landing page",
      prompt: `Use Swiss Poster style to create a landing page:
1. Background: white with color block accents
2. Title: extremely large black sans-serif, uppercase
3. Cards: clean borders, no shadows, strong type hierarchy
4. Use red/blue/yellow color blocks for emphasis
5. Overall bold, grid-based, typographic poster aesthetic`,
    },
  ],
};
