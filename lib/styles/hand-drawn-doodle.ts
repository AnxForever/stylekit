import { DesignStyle } from "./index";

export const handDrawnDoodle: DesignStyle = {
  slug: "hand-drawn-doodle",
  name: "手绘涂鸦风",
  nameEn: "Hand-Drawn Doodle",
  description:
    "手绘线条、涂鸦插画、不规则形状和手写字体。像在笔记本上随手画出的设计，充满创意和趣味性，传达温暖亲切的手工感。",
  cover: "/styles/hand-drawn-doodle.svg",
  styleType: "visual",
  tags: ["expressive", "minimal"],
  category: "expressive",
  colors: {
    primary: "#2c2c2c",
    secondary: "#fffef5",
    accent: ["#ff6b6b", "#4ecdc4", "#ffd93d"],
  },
  keywords: ["手绘", "涂鸦", "笔记本", "虚线", "标记笔", "胶带", "图钉"],

  philosophy: `Hand-Drawn Doodle 风格模拟手工绘制的质感，营造温暖、亲切、创意十足的视觉体验。

核心理念：
- 笔记本纸张：奶白色背景模拟真实笔记本，带有蓝色横线和红色页边线
- 手绘线条：使用虚线边框模拟手绘笔触，避免精确几何
- 不规则形态：微妙的旋转和偏移营造手工感
- 标记笔配色：红、蓝绿、黄三色标记笔点缀
- 装饰元素：胶带、图钉、回形针、咖啡渍等纸张装饰
- 涂鸦点缀：随手画的星星、波浪线、箭头等装饰`,

  doList: [
    "使用虚线边框（border-dashed）模拟手绘线条",
    "使用奶白纸张色 #fffef5 背景",
    "使用墨黑 #2c2c2c 作为主色",
    "添加微妙旋转（rotate）模拟手绘不规则感",
    "使用标记笔配色：红 #ff6b6b、蓝绿 #4ecdc4、黄 #ffd93d",
    "使用无衬线字体，保持随意感",
    "添加笔记本横线背景",
    "使用胶带/图钉/回形针等装饰元素",
  ],

  dontList: [
    "禁止使用精确的几何形状和直角（rounded-none）",
    "禁止使用渐变效果",
    "禁止使用精确阴影（shadow-md 等）",
    "禁止使用等宽字体",
    "禁止使用实线边框（border-solid）",
    "禁止使用大圆角（rounded-lg 及以上）",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Hand-Drawn Doodle 风格按钮 - 虚线边框标记笔阴影",
      code: `<button className="
  px-6 py-3
  bg-[#2c2c2c] text-[#fffef5]
  font-sans font-semibold tracking-wide
  rounded-sm
  border-2 border-dashed border-[#2c2c2c]
  shadow-[3px_3px_0px_#ff6b6b]
  hover:translate-x-[1px] hover:translate-y-[1px]
  hover:shadow-[2px_2px_0px_#ff6b6b]
  hover:rotate-[-0.5deg]
  active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
  transition-all duration-200
">
  Doodle!
</button>`,
    },
    card: {
      name: "卡片",
      description: "Hand-Drawn Doodle 风格卡片 - 笔记本纸张虚线边框",
      code: `<div className="
  p-8
  bg-[#fffef5]
  border-2 border-dashed border-[#2c2c2c]
  rounded-sm
  shadow-[4px_4px_0px_#4ecdc4]
  hover:shadow-[6px_6px_0px_#4ecdc4]
  hover:rotate-[0.5deg]
  transition-all duration-200
">
  <h3 className="text-2xl font-sans font-bold text-[#2c2c2c] mb-3">
    Sketch Note
  </h3>
  <p className="text-[#2c2c2c]/55 font-sans">
    Scribbled with love and creativity
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Hand-Drawn Doodle 风格输入框 - 虚线边框纸张背景",
      code: `<input
  type="text"
  placeholder="Scribble here..."
  className="
    w-full px-4 py-3
    bg-[#fffef5]
    border-2 border-dashed border-[#2c2c2c]
    rounded-sm
    text-[#2c2c2c] placeholder-[#2c2c2c]/30
    font-sans
    focus:border-[#ff6b6b]
    focus:shadow-[2px_2px_0px_#ffd93d]
    focus:outline-none
    transition-all duration-200
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Hand-Drawn Doodle 风格 Hero - 笔记本背景涂鸦装饰",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#fffef5]
  relative overflow-hidden
" style={{
  backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(168,200,232,0.35) 31px, rgba(168,200,232,0.35) 32px)'
}}>
  {/* Red margin line */}
  <div className="absolute left-[120px] top-0 bottom-0 w-px bg-[#ff6b6b]/20" />
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-sans font-black text-[#2c2c2c] mb-2 rotate-[-1.5deg]">
      Doodle
    </h1>
    <h2 className="text-4xl md:text-6xl font-sans font-bold text-[#ff6b6b] -mt-2 mb-6 rotate-[1deg]">
      & Sketch
    </h2>
    <p className="text-lg text-[#2c2c2c]/50 font-sans mb-8">
      Hand-crafted interfaces with creative charm
    </p>
    <button className="
      px-10 py-4
      bg-[#2c2c2c] text-[#fffef5]
      font-sans font-semibold tracking-wide
      rounded-sm
      border-2 border-dashed border-[#2c2c2c]
      shadow-[4px_4px_0px_#4ecdc4]
      hover:translate-x-[1px] hover:translate-y-[1px]
      hover:shadow-[2px_2px_0px_#4ecdc4]
      hover:rotate-[-0.5deg]
      transition-all duration-200
    ">
      Start Drawing
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Hand-Drawn Doodle Global Styles */

:root {
  --doodle-ink: #2c2c2c;
  --doodle-paper: #fffef5;
  --doodle-red: #ff6b6b;
  --doodle-teal: #4ecdc4;
  --doodle-yellow: #ffd93d;
}

/* Notebook lines background */
.doodle-lines {
  background-image: repeating-linear-gradient(
    transparent,
    transparent 31px,
    rgba(168, 200, 232, 0.35) 31px,
    rgba(168, 200, 232, 0.35) 32px
  );
}

/* Red margin line */
.doodle-margin::before {
  content: "";
  position: absolute;
  left: 120px;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: rgba(255, 107, 107, 0.2);
}

/* Squiggly underline */
.doodle-underline {
  text-decoration: underline;
  text-decoration-style: wavy;
  text-decoration-color: var(--doodle-red);
  text-underline-offset: 4px;
}

/* Marker highlight */
.doodle-highlight {
  background: linear-gradient(
    104deg,
    transparent 0.9%,
    rgba(255, 217, 61, 0.3) 2.4%,
    rgba(255, 217, 61, 0.2) 97.1%,
    transparent 98.2%
  );
  padding: 0 4px;
}

/* Tape decoration */
.doodle-tape {
  position: relative;
}
.doodle-tape::before {
  content: "";
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%) rotate(-3deg);
  width: 60px;
  height: 20px;
  background-color: rgba(255, 217, 61, 0.4);
  border-radius: 1px;
}

/* Sketchy rotation */
.doodle-tilt-left { transform: rotate(-1.5deg); }
.doodle-tilt-right { transform: rotate(1.5deg); }

/* Spiral binding holes */
.doodle-binding-holes::before {
  content: "";
  position: absolute;
  left: 50px;
  top: 0;
  bottom: 0;
  width: 16px;
  background-image: radial-gradient(circle, transparent 5px, transparent 5px),
    repeating-linear-gradient(
      transparent,
      transparent 60px,
      rgba(44, 44, 44, 0.08) 60px,
      rgba(44, 44, 44, 0.08) 76px,
      transparent 76px
    );
}`,

  aiRules: `You are a Hand-Drawn Doodle design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Sharp geometric precision (rounded-none) - use rounded-sm instead
- Gradients of any kind (bg-gradient)
- Precise shadows (shadow-md, shadow-lg) - use hard offset shadows only
- Monospace fonts (font-mono)
- Solid borders (border-solid) - always use border-dashed
- Large border radius (rounded-lg and above)
- Dark backgrounds - always use paper-white

## Must Follow

- Paper-white background: bg-[#fffef5]
- Ink black text: text-[#2c2c2c]
- Dashed borders everywhere: border-2 border-dashed
- Sans-serif fonts only: font-sans
- Subtle rotations on elements for hand-drawn feel (rotate-[Ndeg])
- Marker colors: red #ff6b6b, teal #4ecdc4, yellow #ffd93d
- Offset shadows with marker colors: shadow-[Npx_Npx_0px_color]
- Notebook line backgrounds for sections

## Color Palette

Primary:
- Ink Black: #2c2c2c (text, borders)
- Paper White: #fffef5 (backgrounds)
- Red Marker: #ff6b6b (accents, highlights)
- Teal Marker: #4ecdc4 (shadows, accents)
- Yellow Marker: #ffd93d (highlights, tape)

## Special Elements

- Notebook line backgrounds (repeating-linear-gradient)
- Red margin line decorations
- Wavy underlines (text-decoration-style: wavy)
- Marker highlight effects
- Tape, pushpin, and paperclip decorations on cards
- Subtle element rotations for sketchy feel
- Spiral binding holes on left edge
- Coffee stain ring decorations
- Hand-drawn stars and squiggles via SVG`,

  examplePrompts: [
    {
      title: "手绘涂鸦着陆页",
      titleEn: "Hand-Drawn Doodle Landing Page",
      description: "笔记本风格的创意着陆页，带涂鸦装饰",
      descriptionEn: "Notebook-style creative landing page with doodle decorations",
      prompt: `Use Hand-Drawn Doodle style to create a landing page:
1. Background: paper-white with notebook lines and red margin
2. Title: bold sans-serif with subtle rotation like handwriting
3. Cards: dashed borders with marker-color shadows, tape/pin decorations
4. Use only marker colors (red, teal, yellow) for accents
5. Add notebook elements: spiral holes, coffee stains, tape strips
6. Overall hand-crafted, sketchy, creative notebook feel`,
    },
  ],
};
