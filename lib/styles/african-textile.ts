import { DesignStyle } from "./index";

export const africanTextile: DesignStyle = {
  slug: "african-textile",
  name: "非洲纺织",
  nameEn: "African Textile",
  description:
    "西非Kente布和Adire扎染为灵感的设计风格，大胆的几何编织图案、大地色与鲜明色彩的碰撞、手工质感。",
  cover: "/styles/african-textile.svg",
  styleType: "visual",
  tags: ["expressive", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#c4501f",
    secondary: "#2c1810",
    accent: ["#f0c75e", "#1a5632", "#e8d5b5"],
  },
  keywords: ["非洲", "Kente", "编织", "扎染", "纺织", "大地", "手工"],

  philosophy: `African Textile（非洲纺织）以西非的Kente编织布和Adire靛蓝扎染为灵感源泉，将数百年的纺织工艺传统转化为充满生命力的数字设计语言。

核心理念：
- 大胆几何：Kente布的经纬编织产生强烈的几何条纹与色块，每种图案都承载着特定的文化含义和社会地位象征
- 大地色调：深木色、赤陶橙、沙金色构成温暖而厚重的色彩基底，呼应非洲大陆的红土与草原
- 手工质感：粗糙的织物纹理、不完美的手工边缘，赋予界面独特的人文温度
- 色彩碰撞：大地暖调与森林绿的鲜明对比，模拟Kente布中亮色条纹穿插于深色背景的视觉冲击

Kente布在阿坎族文化中被称为"国王之布"（nwentoma），其编织技法已被联合国教科文组织列为非物质文化遗产。每一种颜色和图案组合都代表不同的格言、历史事件或哲学理念。

适用场景包括文化品牌、手工艺品电商、教育平台以及任何希望传达力量、传统与大地联结感的项目。`,

  doList: [
    "使用Kente橙 bg-[#c4501f] 和金色 bg-[#f0c75e] 做强调元素",
    "使用深木色 bg-[#2c1810] 做主背景传达厚重感",
    "使用沙色 bg-[#e8d5b5] 做辅助背景和卡片底色",
    "使用森林绿 text-[#1a5632] 做文本和装饰色",
    "采用几何条纹、色块等装饰模拟编织图案",
    "使用粗边框 border-2 或 border-4 传达织物的结构感",
    "组件使用小圆角 rounded-lg 保持手工但不粗糙",
    "标题使用 font-bold uppercase tracking-widest 传达庄重感",
    "交互节奏保持沉稳，优先使用 duration-300",
    "点击态加入按压阻尼（active:scale-[0.98] + active:brightness-90）",
    "悬停时允许局部织纹块轻微错位，模拟织物拉扯",
  ],

  dontList: [
    "禁止使用霓虹色或高饱和荧光色 text-[#00ffff]",
    "禁止使用柔和粉彩色调 bg-pink-100, bg-purple-100",
    "禁止使用极大圆角 rounded-full 或 rounded-3xl",
    "禁止使用纯白背景 bg-white",
    "禁止使用玻璃拟态或模糊效果 backdrop-blur",
    "禁止省略几何装饰元素",
    "禁止使用轻飘快速交互（duration-75 + 大幅位移）",
  ],

  components: {
    button: {
      name: "按钮",
      description: "非洲纺织风格按钮，粗边框与大地色",
      code: `<button className="
  group relative px-8 py-4
  bg-[#c4501f] text-[#e8d5b5]
  font-bold uppercase tracking-widest
  rounded-lg
  border-4 border-[#2c1810]
  shadow-[4px_4px_0px_#2c1810]
  hover:shadow-[6px_6px_0px_#2c1810]
  hover:-translate-y-1
  active:shadow-none active:translate-y-[4px] active:translate-x-[4px]
  active:scale-[0.98] active:brightness-90
  transition-all duration-300
">
  <span className="inline-flex items-center gap-2">
    Explore
    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M5 12h14M12 5l7 7-7 7"></path>
    </svg>
  </span>
</button>`,
    },
    card: {
      name: "卡片",
      description: "非洲纺织风格卡片，几何装饰与手工质感",
      code: `<div className="
  group p-8
  bg-[#e8d5b5]
  rounded-lg
  border-4 border-[#2c1810]
  shadow-[6px_6px_0px_#2c1810]
  hover:shadow-[8px_8px_0px_#2c1810]
  hover:-translate-y-1
  transition-all duration-300
">
  <div className="flex gap-1 mb-4 group-hover:gap-2 transition-all duration-300">
    <div className="w-4 h-4 bg-[#c4501f]" />
    <div className="w-4 h-4 bg-[#f0c75e] group-hover:-translate-y-1 transition-transform duration-300" />
    <div className="w-4 h-4 bg-[#1a5632]" />
    <div className="w-4 h-4 bg-[#c4501f] group-hover:translate-y-1 transition-transform duration-300" />
    <div className="w-4 h-4 bg-[#f0c75e]" />
  </div>
  <h3 className="text-2xl font-bold text-[#2c1810] uppercase tracking-wider mb-3 group-hover:text-[#c4501f] transition-colors duration-300">
    Kente Weave
  </h3>
  <p className="text-[#2c1810]/80 font-medium">
    Woven threads carry the stories of generations
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "非洲纺织风格输入框，厚实边框与大地色",
      code: `<input
  type="text"
  placeholder="Search patterns..."
  className="
    w-full px-6 py-4
    bg-[#e8d5b5]
    border-2 border-[#2c1810]/40
    rounded-lg
    text-[#2c1810] placeholder-[#2c1810]/40
    font-medium tracking-wide
    focus:border-[#c4501f]
    focus:shadow-[0_0_0_3px_rgba(196,80,31,0.2)]
    focus:outline-none
    transition-all duration-200
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "非洲纺织风格 Hero，几何条纹与大地色调",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#2c1810]
  relative overflow-hidden
">
  {/* Kente stripe decoration */}
  <div className="absolute top-0 left-0 w-full h-4 flex">
    <div className="flex-1 bg-[#c4501f]" />
    <div className="flex-1 bg-[#f0c75e]" />
    <div className="flex-1 bg-[#1a5632]" />
    <div className="flex-1 bg-[#c4501f]" />
    <div className="flex-1 bg-[#f0c75e]" />
    <div className="flex-1 bg-[#1a5632]" />
  </div>

  {/* Geometric pattern sidebar */}
  <div className="absolute left-0 top-0 w-16 h-full flex flex-col gap-0">
    <div className="flex-1 bg-[#f0c75e]/10 border-r-2 border-[#f0c75e]/30" />
  </div>

  <div className="relative z-10 text-center px-6">
    <div className="flex gap-2 justify-center mb-8">
      <div className="w-8 h-2 bg-[#c4501f] rounded-sm" />
      <div className="w-8 h-2 bg-[#f0c75e] rounded-sm" />
      <div className="w-8 h-2 bg-[#1a5632] rounded-sm" />
    </div>
    <h1 className="text-5xl md:text-7xl font-bold text-[#e8d5b5] uppercase tracking-widest mb-6">
      African Textile
    </h1>
    <p className="text-xl text-[#f0c75e]/80 mb-8">
      Patterns woven from the heart of the continent
    </p>
    <button className="
      px-10 py-4
      bg-[#c4501f] text-[#e8d5b5]
      font-bold uppercase tracking-widest
      rounded-lg
      border-2 border-[#f0c75e]
      shadow-[4px_4px_0px_#f0c75e]
      hover:shadow-[6px_6px_0px_#f0c75e]
      hover:translate-x-[-2px] hover:translate-y-[-2px]
      transition-all duration-200
    ">
      Discover
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* African Textile Global Styles */

:root {
  --at-kente-orange: #c4501f;
  --at-dark-wood: #2c1810;
  --at-gold: #f0c75e;
  --at-forest-green: #1a5632;
  --at-sand: #e8d5b5;
}

/* Kente stripe pattern */
.at-kente-stripe {
  background: repeating-linear-gradient(
    90deg,
    var(--at-kente-orange) 0px,
    var(--at-kente-orange) 20px,
    var(--at-gold) 20px,
    var(--at-gold) 40px,
    var(--at-forest-green) 40px,
    var(--at-forest-green) 60px
  );
}

/* Woven texture overlay */
.at-woven-texture {
  background-image:
    linear-gradient(0deg, rgba(44, 24, 16, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(44, 24, 16, 0.03) 1px, transparent 1px);
  background-size: 8px 8px;
}

/* Geometric block accent */
.at-geo-block {
  border: 2px solid var(--at-dark-wood);
  box-shadow: 4px 4px 0px var(--at-dark-wood);
}

/* Earth tone card */
.at-earth-card {
  background-color: var(--at-sand);
  border: 2px solid var(--at-dark-wood);
  border-radius: 0.5rem;
}

/* Gold accent line */
.at-gold-line {
  height: 3px;
  background: linear-gradient(90deg, var(--at-kente-orange), var(--at-gold), var(--at-forest-green));
}`,

  aiRules: `You are an African Textile design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Neon or fluorescent colors (text-[#00ffff], text-[#ff00ff])
- Pastel or soft pink/purple tones (bg-pink-100, bg-purple-100)
- Very round shapes (rounded-full, rounded-3xl)
- Pure white backgrounds (bg-white)
- Glass morphism or blur effects (backdrop-blur)
- Thin hairline borders (border, border-[0.5px])

## Must Follow

- Kente orange #c4501f and gold #f0c75e as primary accents
- Dark wood #2c1810 for backgrounds and text
- Sand #e8d5b5 for card backgrounds
- Forest green #1a5632 for secondary accents
- Bold geometric decorations (stripes, blocks, squares)
- Thick borders border-2 or border-4
- Hard offset shadows shadow-[4px_4px_0px_#2c1810]
- Uppercase bold headings with wide tracking

## Animation & Interaction Rules

- Heavy tactility: interactions should feel weighted and handcrafted, not floating
- Use deliberate timing around duration-300 for primary hover/active feedback
- Deep press on click: use active:scale-[0.98], active:brightness-90, and shadow collapse
- Woven shifts: geometric accent blocks can move 1-2px on hover to mimic textile tension
- Avoid glitch or jitter motion; movement must stay grounded and physical

## Color Palette

Primary:
- Kente Orange: #c4501f
- Dark Wood: #2c1810
- Gold: #f0c75e
- Forest Green: #1a5632
- Sand: #e8d5b5

## Special Elements

- Kente stripe patterns (repeating color blocks)
- Geometric square and rectangular decorations
- Woven texture overlays
- Bold color block dividers
- Earth-tone gradients`,

  examplePrompts: [
    {
      title: "非洲手工艺品展示页",
      titleEn: "African Craft Showcase",
      description: "Kente风格的手工艺品展示页面",
      descriptionEn: "Kente-inspired artisan showcase page",
      prompt: `Use African Textile style to create a craft showcase page:
1. Background: dark wood with woven texture
2. Cards: sand-colored with thick borders and offset shadows
3. Decorations: Kente stripe headers and geometric blocks
4. Buttons: orange with gold borders
5. Overall bold, earthy, handcrafted aesthetic`,
    },
  ],
};
