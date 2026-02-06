import { DesignStyle } from "./index";

export const collageArt: DesignStyle = {
  slug: "collage-art",
  name: "拼贴艺术风",
  nameEn: "Collage Art",
  description:
    "杂志拼贴和混合材料美学，纸片剪切、多层叠加、撕纸边缘和混搭字体，营造充满创意和手工感的视觉冲击。",
  cover: "/styles/collage-art.svg",
  styleType: "visual",
  tags: ["expressive", "retro"],
  category: "expressive",
  colors: {
    primary: "#2d2d2d",
    secondary: "#f5f0e8",
    accent: ["#e74c3c", "#3498db", "#f39c12", "#9b59b6"],
  },
  keywords: [
    "拼贴",
    "剪贴",
    "混合材质",
    "多层",
    "杂志",
    "撕纸",
    "混搭",
    "washi",
  ],

  philosophy: `拼贴艺术风格源于达达主义和波普艺术的混合媒材传统，强调不同材料、字体和图像的碰撞与融合。

核心理念：
- 随机旋转：每个元素都有细微的 rotate transform（0.5-2deg），模拟手工粘贴的不精确感
- 和纸胶带装饰：使用 repeating-linear-gradient 条纹伪元素模拟半透明和纸胶带
- 混搭字体：同一页面交替使用 font-serif、font-sans、font-mono 营造杂志剪报感
- 撕纸边缘：polygon clip-path 创造不规则的锯齿状撕纸边缘
- 硬偏移阴影：shadow-[Npx_Npx_0px] 纯色偏移阴影创造纸片层叠的物理深度`,

  doList: [
    "使用混合字体（衬线 font-serif + 无衬线 font-sans + 等宽 font-mono 交替）",
    "元素添加随机旋转 rotate-[N deg] 变换（0.5-2 度范围）",
    "使用硬偏移阴影 shadow-[Npx_Npx_0px_color] 营造层叠深度",
    "添加 washi tape 装饰：repeating-linear-gradient 条纹色块",
    "使用 polygon clip-path 创造撕纸边缘效果",
    "保持陈旧纸张色 bg-[#f5f0e8] 作为底色",
    "大胆使用对比色块（红/蓝/黄/紫）",
    "使用实线和虚线边框模拟剪切痕迹",
  ],

  dontList: [
    "禁止使用平滑渐变（bg-gradient-to-*）",
    "禁止使用柔和圆角（rounded-lg 以上）",
    "禁止使用毛玻璃效果（backdrop-blur）",
    "禁止使用柔和阴影（shadow-[0_Npx_Npx]）",
    "禁止使用统一整齐的对齐方式",
  ],

  components: {
    button: {
      name: "按钮",
      description:
        "纸片剪切按钮，随机旋转变换和硬偏移阴影层叠效果",
      code: `<button
  className="
    px-7 py-3
    bg-[#e74c3c] text-white
    font-bold uppercase tracking-wider
    rounded-sm
    border-2 border-[#2d2d2d]
    shadow-[4px_4px_0px_#2d2d2d]
    hover:rotate-0
    hover:translate-x-[1px] hover:translate-y-[1px]
    hover:shadow-[2px_2px_0px_#2d2d2d]
    transition-all duration-200
  "
  style={{ transform: "rotate(-0.7deg)" }}
>
  Cut & Paste
</button>`,
    },
    card: {
      name: "卡片",
      description:
        "多层纸片卡片，带旋转变换、彩色硬偏移阴影和 washi tape 装饰",
      code: `<div className="relative">
  {/* Washi tape decoration */}
  <div
    className="absolute -top-3 left-8 w-20 h-5 z-10"
    style={{
      background: "repeating-linear-gradient(90deg, #f39c12 0px, #f39c12 3px, rgba(255,255,255,0.3) 3px, rgba(255,255,255,0.3) 6px)",
      opacity: 0.7,
      transform: "rotate(3deg)"
    }}
  />
  <div
    className="
      p-8
      bg-[#f5f0e8]
      border-2 border-[#2d2d2d]
      rounded-none
      shadow-[5px_5px_0px_#e74c3c]
      hover:-translate-y-1
      hover:shadow-[7px_7px_0px_#e74c3c]
      transition-all duration-200
    "
    style={{ transform: "rotate(0.8deg)" }}
  >
    <h3 className="text-2xl font-serif font-bold text-[#2d2d2d] uppercase mb-3">
      COLLAGE
    </h3>
    <p className="text-[#2d2d2d]/55 font-sans text-sm">
      Cut, tear, paste, and layer
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description:
        "杂志剪报输入框，混合字体标签和硬阴影聚焦效果",
      code: `<div>
  <label className="block text-xs font-mono font-bold text-[#e74c3c] uppercase tracking-wider mb-2">
    FIELD NAME
  </label>
  <input
    type="text"
    placeholder="TYPE HERE..."
    className="
      w-full px-5 py-3
      bg-[#f5f0e8]
      border-2 border-[#2d2d2d]
      rounded-none
      text-[#2d2d2d] placeholder-[#2d2d2d]/30
      font-serif
      focus:border-[#e74c3c]
      focus:shadow-[3px_3px_0px_#2d2d2d]
      focus:outline-none
      transition-all duration-200
    "
  />
</div>`,
    },
    hero: {
      name: "Hero 区块",
      description:
        "拼贴布告板英雄区域，撕纸背景、图钉装饰和混搭字体",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#f5f0e8]
  relative overflow-hidden
">
  {/* Scattered paper scraps */}
  <div className="absolute top-8 right-16 w-44 h-32 bg-[#e74c3c]/8 pointer-events-none"
    style={{ transform: "rotate(5deg)", clipPath: "polygon(0% 3%, 8% 0%, 20% 4%, 35% 1%, 50% 3%, 65% 0%, 80% 4%, 92% 0%, 100% 2%, 100% 97%, 92% 100%, 80% 96%, 65% 100%, 50% 98%, 35% 100%, 20% 96%, 8% 100%, 0% 97%)" }}
  />
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#2d2d2d] mb-2"
      style={{ transform: "rotate(-1.5deg)" }}
    >
      COLLAGE
    </h1>
    <h2 className="text-4xl md:text-6xl font-sans font-black text-[#e74c3c] uppercase mb-6"
      style={{ transform: "rotate(0.5deg)" }}
    >
      ART
    </h2>
    <p className="text-sm text-[#2d2d2d]/50 font-mono tracking-wider mb-10 max-w-md mx-auto">
      CUT / TEAR / PASTE / LAYER
    </p>
    <button className="
      px-10 py-4
      bg-[#e74c3c] text-white
      font-bold uppercase tracking-wider
      rounded-sm
      border-2 border-[#2d2d2d]
      shadow-[4px_4px_0px_#2d2d2d]
      hover:rotate-0
      hover:translate-x-[1px] hover:translate-y-[1px]
      hover:shadow-[2px_2px_0px_#2d2d2d]
      transition-all duration-200
    "
      style={{ transform: "rotate(-0.5deg)" }}
    >
      Explore
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Collage Art Global Styles */

:root {
  --col-dark: #2d2d2d;
  --col-paper: #f5f0e8;
  --col-red: #e74c3c;
  --col-blue: #3498db;
  --col-yellow: #f39c12;
  --col-purple: #9b59b6;
}

/* Torn paper edge clip-path */
.col-torn {
  clip-path: polygon(
    0% 3%, 5% 0%, 12% 4%, 20% 1%, 28% 3%, 35% 0%, 42% 2%, 50% 0%,
    58% 3%, 65% 1%, 72% 4%, 80% 0%, 88% 2%, 95% 0%, 100% 3%,
    100% 97%, 95% 100%, 88% 98%, 80% 100%, 72% 97%, 65% 100%,
    58% 98%, 50% 100%, 42% 97%, 35% 100%, 28% 98%, 20% 100%,
    12% 97%, 5% 100%, 0% 98%
  );
}

/* Washi tape decoration - striped repeating-linear-gradient */
.col-tape {
  position: relative;
}
.col-tape::before {
  content: "";
  position: absolute;
  top: -10px;
  left: 20%;
  width: 80px;
  height: 20px;
  background: repeating-linear-gradient(
    90deg,
    var(--col-yellow) 0px,
    var(--col-yellow) 3px,
    rgba(255,255,255,0.3) 3px,
    rgba(255,255,255,0.3) 6px
  );
  opacity: 0.7;
  transform: rotate(2deg);
}

/* Stamp/postal mark decoration */
.col-stamp {
  border: 3px dashed var(--col-dark);
  padding: 8px;
  position: relative;
}
.col-stamp::after {
  content: "APPROVED";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(12deg);
  font-family: 'Courier New', monospace;
  font-size: 12px;
  font-weight: 700;
  color: var(--col-red);
  opacity: 0.3;
}

/* Newspaper column text */
.col-newspaper {
  font-family: 'Times New Roman', serif;
  line-height: 1.2;
  columns: 2;
  column-gap: 20px;
  column-rule: 1px solid var(--col-dark);
}

/* Pushpin decoration */
.col-pin::before {
  content: "";
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--col-red);
  box-shadow: inset 0 0 0 3px rgba(255,255,255,0.4);
}`,

  aiRules: `You are a Collage Art design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Smooth gradients (bg-gradient-to-*)
- Soft rounded corners (rounded-lg, rounded-xl, rounded-2xl, rounded-full)
- Backdrop blur effects (backdrop-blur)
- Soft blur shadows (shadow-[0_Npx_Npx])
- Uniform, perfectly aligned layouts
- Single font family throughout

## Must Follow

- Aged paper background bg-[#f5f0e8]
- Dark charcoal #2d2d2d for borders and text
- Hard offset shadows shadow-[Npx_Npx_0px_#color]
- Sharp corners rounded-sm or rounded-none
- Random rotation transforms on elements (rotate-[0.5deg] to rotate-[2deg])
- Mix font families: font-serif, font-sans, font-mono across sections
- Thick borders border-2 border-[#2d2d2d]

## Color Palette

Primary:
- Dark Charcoal: #2d2d2d
- Aged Paper: #f5f0e8
- Cut Red: #e74c3c
- Magazine Blue: #3498db
- Paste Yellow: #f39c12
- Scrap Purple: #9b59b6

## Unique Elements (Collage-Only)

1. Random rotation: style={{ transform: "rotate(Ndeg)" }} on cards, buttons, headings (0.5-2 degrees)
2. Washi tape: repeating-linear-gradient(90deg, color 0px, color 3px, rgba(255,255,255,0.3) 3px, rgba(255,255,255,0.3) 6px) strips
3. Mixed typography: alternate font-serif, font-sans, font-mono across headings, labels, body text
4. Torn paper edges: polygon clip-path with irregular jagged points
5. Dashed borders: border-dashed for stamp/cut-line effects`,

  examplePrompts: [
    {
      title: "拼贴艺术杂志页面",
      titleEn: "Collage Art Magazine Page",
      description:
        "杂志拼贴风格的创意页面，带有旋转卡片、和纸胶带装饰和混搭字体",
      descriptionEn:
        "Creative zine page with rotated cards, washi tape strips, torn-edge dividers, and mixed serif/sans/mono typography",
      prompt: `Use Collage Art style to create a zine-style page:
1. Background: aged paper #f5f0e8 with torn paper scrap decorations (clip-path polygon)
2. Hero: mixed fonts (serif title + sans subtitle + mono caption), random rotations on each line
3. Cards: hard offset shadows in different colors, each card rotated differently
4. Washi tape: repeating-linear-gradient stripe decorations on card tops
5. Buttons: rotated with hard shadows, hover resets rotation
6. Form: mixed font labels (serif/sans/mono), dashed border textarea
7. Typography mixes serif, sans-serif, and monospace throughout`,
    },
  ],
};
