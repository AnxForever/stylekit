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
- 硬偏移阴影：shadow-[Npx_Npx_0px] 纯色偏移阴影创造纸片层叠的物理深度
- 纸张物理感：hover 时纸片被掀起（scale-105 + 旋转微调），active 时被按压在桌面（阴影骤减）`,

  doList: [
    "使用混合字体（衬线 font-serif + 无衬线 font-sans + 等宽 font-mono 交替）",
    "元素使用 Tailwind 任意值旋转 rotate-[Ndeg] 而非内联 style transform（避免与 hover 冲突）",
    "使用硬偏移阴影 shadow-[Npx_Npx_0px_color] 营造层叠深度",
    "添加 washi tape 装饰：repeating-linear-gradient 条纹色块",
    "使用 polygon clip-path 创造撕纸边缘效果",
    "保持陈旧纸张色 bg-[#f5f0e8] 作为底色",
    "大胆使用对比色块（红/蓝/黄/紫）",
    "使用实线和虚线边框模拟剪切痕迹",
    "hover 时纸片上浮 -translate-y-2 + 旋转变化 + 阴影扩张，active 时阴影骤减模拟按压",
    "使用 group + group-hover:* 让胶带装饰响应卡片悬停，产生视差效果",
  ],

  dontList: [
    "禁止使用平滑渐变（bg-gradient-to-*）",
    "禁止使用柔和圆角（rounded-lg 以上）",
    "禁止使用毛玻璃效果（backdrop-blur）",
    "禁止使用柔和阴影（shadow-[0_Npx_Npx]）",
    "禁止使用统一整齐的对齐方式",
    "禁止对有 hover/group-hover Tailwind 变换的元素使用 style={{ transform }} 内联属性（会导致 transform 冲突）",
  ],

  components: {
    button: {
      name: "按钮",
      description:
        "纸片剪切按钮：hover 时纸片掀起（scale-105 + 旋转变化 + 阴影扩张），active 时被按压桌面（缩小 + 阴影骤减）",
      code: `<button className="
  px-7 py-3
  bg-[#e74c3c] text-white
  font-bold uppercase tracking-wider
  rounded-sm
  border-2 border-[#2d2d2d]
  shadow-[4px_4px_0px_#2d2d2d]
  rotate-[-0.7deg]
  hover:scale-105 hover:-rotate-[2deg] hover:-translate-y-1
  hover:shadow-[8px_8px_0px_#2d2d2d]
  active:scale-95 active:rotate-[1deg] active:translate-y-1
  active:shadow-[2px_2px_0px_#2d2d2d]
  transition-all duration-200 ease-out
">
  Cut & Paste
</button>`,
    },
    card: {
      name: "卡片",
      description:
        "多层纸片卡片：group-hover 时胶带产生视差偏移，卡片整体掀起（translate-y + 旋转变化 + 阴影扩张），active 时被按下",
      code: `<div className="group relative z-0">
  {/* Washi tape — group-hover 产生视差，旋转更大，稍微上移 */}
  <div
    className="
      absolute -top-3 left-8 w-20 h-5 z-20
      rotate-[3deg]
      group-hover:-translate-y-1 group-hover:rotate-[6deg]
      transition-all duration-300
    "
    style={{
      background: "repeating-linear-gradient(90deg, #f39c12 0px, #f39c12 3px, rgba(255,255,255,0.3) 3px, rgba(255,255,255,0.3) 6px)",
      opacity: 0.9
    }}
  />

  {/* 纸片卡片主体 — hover 时被掀起，active 时被按下 */}
  <div className="
    p-8
    bg-[#f5f0e8]
    border-2 border-[#2d2d2d]
    rounded-none
    shadow-[5px_5px_0px_#e74c3c]
    rotate-[1.5deg]
    group-hover:-translate-y-2 group-hover:rotate-[-1deg]
    group-hover:shadow-[12px_12px_0px_#e74c3c]
    group-hover:scale-[1.02]
    active:translate-y-1 active:shadow-[2px_2px_0px_#e74c3c]
    transition-all duration-300 ease-out
    relative z-10
  ">
    <h3 className="text-2xl font-serif font-bold text-[#2d2d2d] uppercase mb-3">
      COLLAGE
    </h3>
    <p className="text-[#2d2d2d]/70 font-sans text-sm font-bold">
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
      focus:shadow-[3px_3px_0px_#e74c3c]
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
    <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#2d2d2d] mb-2 -rotate-[1.5deg]">
      COLLAGE
    </h1>
    <h2 className="text-4xl md:text-6xl font-sans font-black text-[#e74c3c] uppercase mb-6 rotate-[0.5deg]">
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
      rotate-[-0.5deg]
      hover:scale-105 hover:-rotate-[2deg] hover:-translate-y-1
      hover:shadow-[8px_8px_0px_#2d2d2d]
      active:scale-95 active:rotate-[1deg] active:translate-y-1
      active:shadow-[2px_2px_0px_#2d2d2d]
      transition-all duration-200 ease-out
    ">
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

/* Paper lift — hover 时上浮，active 时按压 */
.col-paper-lift {
  transition: all 0.2s ease-out;
}

.col-paper-lift:hover {
  transform: translateY(-8px) scale(1.02) rotate(-1deg);
  box-shadow: 12px 12px 0 var(--col-red);
}

.col-paper-lift:active {
  transform: translateY(2px) scale(0.98) rotate(1deg);
  box-shadow: 2px 2px 0 var(--col-red);
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
}`,

  aiRules: `You are a Collage Art design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Smooth gradients (bg-gradient-to-*)
- Soft rounded corners (rounded-lg, rounded-xl, rounded-2xl, rounded-full)
- Backdrop blur effects (backdrop-blur)
- Soft blur shadows (shadow-[0_Npx_Npx])
- Uniform, perfectly aligned layouts
- Single font family throughout
- NEVER mix style={{ transform: "rotate(Ndeg)" }} with Tailwind hover/group-hover transform classes — this causes transform conflicts where the inline style overrides Tailwind's CSS variables. Always use rotate-[Ndeg] Tailwind arbitrary class instead.

## Must Follow

- Aged paper background bg-[#f5f0e8]
- Dark charcoal #2d2d2d for borders and text
- Hard offset shadows shadow-[Npx_Npx_0px_#color]
- Sharp corners rounded-sm or rounded-none
- Random rotation via Tailwind arbitrary class rotate-[0.5deg] to rotate-[2deg] (NOT inline style when hover transforms are also applied)
- Mix font families: font-serif, font-sans, font-mono across sections
- Thick borders border-2 border-[#2d2d2d]
- Wrap interactive cards in group div so washi tape can respond via group-hover

## Color Palette

Primary:
- Dark Charcoal: #2d2d2d
- Aged Paper: #f5f0e8
- Cut Red: #e74c3c
- Magazine Blue: #3498db
- Paste Yellow: #f39c12
- Scrap Purple: #9b59b6

## Animation & Interaction Rules

- Paper Lift: On hover, elements should feel physically raised. Use hover:scale-[1.02] combined with a rotation change (e.g., from rotate-[1.5deg] to group-hover:-rotate-[1deg]) and shadow expansion (shadow-[5px_5px] → shadow-[12px_12px]). This simulates a piece of paper being pinched up off a surface.
- Tape Parallax: The washi tape decoration on a card should react slightly differently from the card itself. Wrap the whole component in a group div. The tape div has group-hover:-translate-y-1 group-hover:rotate-[6deg], while the card has group-hover:-translate-y-2 group-hover:-rotate-[1deg]. The tape appears to shift independently, reinforcing the multi-layer physical illusion.
- Desk Press: On :active, the shadow must sharply collapse (shadow-[12px_12px] → shadow-[2px_2px]) and the element shifts slightly down (active:translate-y-1), simulating pressing a paper scrap firmly onto a corkboard.
- Snappy Easing: Use duration-200 ease-out or duration-300 ease-out for all paper interactions. Paper is light and snaps quickly.
- Transform Rules: ALWAYS use Tailwind rotate-[Xdeg] arbitrary class for initial rotation. NEVER use style={{ transform: "rotate(Xdeg)" }} on elements that also use Tailwind hover/group-hover transforms — they will conflict.

## Unique Elements (Collage-Only)

1. Random rotation: rotate-[0.7deg], -rotate-[1.5deg], rotate-[2deg] etc. (Tailwind arbitrary, not inline style)
2. Washi tape: repeating-linear-gradient(90deg, color 0px, color 3px, rgba(255,255,255,0.3) 3px, rgba(255,255,255,0.3) 6px) strips in a group-hover reactive div
3. Mixed typography: alternate font-serif, font-sans, font-mono across headings, labels, body text
4. Torn paper edges: polygon clip-path with irregular jagged points
5. Dashed borders: border-dashed for stamp/cut-line effects

## Self-Check

After generating code:
1. All initial rotations use rotate-[Xdeg] Tailwind class, not inline style (when hover transforms present)
2. Interactive cards wrapped in group div for tape parallax
3. hover state: scale-105 + rotation change + shadow expansion
4. active state: shadow collapses + slight downward shift
5. Duration 200-300ms ease-out`,

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
2. Hero: mixed fonts (serif title + sans subtitle + mono caption), random rotations on each line using rotate-[Xdeg] Tailwind class
3. Cards: hard offset shadows in different colors, each card rotated differently with rotate-[Xdeg]
4. Washi tape: repeating-linear-gradient stripe decorations, wrapped in group div for parallax effect
5. Buttons: rotated via rotate-[Xdeg], hover paper-lift effect (scale-105 + rotation change + shadow expand)
6. Form: mixed font labels (serif/sans/mono), dashed border textarea
7. Typography mixes serif, sans-serif, and monospace throughout`,
    },
  ],
};
