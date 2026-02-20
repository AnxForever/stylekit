import { DesignStyle } from "./index";

export const medievalManuscript: DesignStyle = {
  slug: "medieval-manuscript",
  name: "中世纪手抄本",
  nameEn: "Medieval Manuscript",
  description:
    "中世纪泥金手抄本风格，花体首字母、羊皮纸质感、金色与深红装饰性边框。哥特式黑体字与插画元素相结合。",
  cover: "/styles/medieval-manuscript.svg",
  styleType: "visual",
  tags: ["retro", "expressive"],
  category: "retro",
  colors: {
    primary: "#8b1a1a",
    secondary: "#f0e6d0",
    accent: ["#c9a74e", "#2d4a2d", "#3d2b1f"],
  },
  keywords: ["中世纪", "手抄本", "泥金", "花体", "羊皮纸", "哥特字体", "装饰"],

  philosophy: `中世纪泥金手抄本（Illuminated Manuscript）是西方书籍艺术的巅峰形态，诞生于修道院的缮写室中。每一页都是信仰与美学的结合——金箔装饰的首字母、精细的藤蔓纹样、深红与深绿的矿物颜料，以及羊皮纸特有的温暖质感。

在数字设计中，手抄本风格通过以下方式重现那个时代的庄重与精致：羊皮纸色 #f0e6d0 作为基底，模拟动物皮革的温暖色调；深红 #8b1a1a 用于标题和装饰，象征矿物颜料中的朱砂；金色 #c9a74e 用于边框、分隔线和重要装饰，呼应泥金工艺。

核心理念：
- 泥金装饰：金色 border 和 divider 模拟金箔贴附效果，关键元素使用金色高亮
- 花体首字母：标题首字放大（text-6xl 以上），使用衬线字体模拟哥特黑体字效果
- 羊皮纸质感：bg-[#f0e6d0] 底色配合微妙的 radial-gradient 模拟羊皮纸的色差
- 装饰性边框：双线边框 border-double、角落装饰和藤蔓纹样暗示

手抄本风格适合历史博物馆网站、古典文学项目、中世纪主题游戏界面、红酒和手工艺品品牌等需要营造古典庄重氛围的场景。

字体选择至关重要：衬线字体（font-serif）贯穿始终，标题使用粗体大写以模拟哥特式黑体字的视觉重量，正文使用常规字重保证可读性。`,

  doList: [
    "使用羊皮纸色 bg-[#f0e6d0] 作为主背景底色",
    "使用金色 border-[#c9a74e] 和 text-[#c9a74e] 作为装饰和高亮",
    "使用深红 text-[#8b1a1a] 作为标题和重要文字颜色",
    "使用 border-double border-4 或 border-[3px] 模拟手抄本双线边框",
    "标题首字使用 text-5xl 以上的放大效果（Drop Cap）",
    "全页使用衬线字体 font-serif 保持古典一致性",
    "使用深棕 #3d2b1f 作为正文文字色和辅助边框色",
    "添加角落装饰暗示：伪元素或小图标模拟藤蔓纹样",
    "按钮 :active 向右下偏移：active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_#3d2b1f]（Wax Seal Impact，火漆印章按压感）",
    "金色边框 hover 时缓慢提亮：hover:border-[#dfbf66] transition-all duration-700 ease-in-out（Gold Leaf Shimmer，烛光映照金箔）",
    "卡片使用 group 类，角落装饰 group-hover:opacity-100，首字母 group-hover:drop-shadow-[0_0_8px_rgba(201,167,78,0.6)] 金箔浮现",
    "按钮悬停：hover:shadow-[5px_5px_0px_#3d2b1f]（阴影加重，压印加深预告）",
  ],

  dontList: [
    "禁止使用无衬线字体 font-sans 作为主字体",
    "禁止使用现代渐变（bg-gradient-to-r 等现代配色渐变）",
    "禁止使用霓虹色、荧光色或高饱和度现代色彩",
    "禁止使用毛玻璃效果（backdrop-blur）",
    "禁止使用纯黑 bg-black 或纯白 bg-white 背景",
    "禁止使用圆角 rounded-xl 以上的现代圆角",
    "禁止使用科技感或未来感的设计元素",
    "禁止按钮使用 hover:-translate-y-*（羊皮纸是平铺的，无悬浮感）",
    "禁止按钮缺少 active:translate-x-[3px] active:translate-y-[3px]（Wax Seal Impact 是核心交互特征）",
    "禁止动画 duration < 300ms（手抄本的庄重感需要缓慢、从容的过渡）",
  ],

  components: {
    button: {
      name: "按钮",
      description: "手抄本风格按钮，火漆压印式点击与金箔提亮反馈",
      code: `<button className="
  px-10 py-4
  bg-[#8b1a1a]
  text-[#f0e6d0] font-serif uppercase tracking-[0.2em] font-bold
  border-4 border-double border-[#c9a74e]
  shadow-[4px_4px_0px_#3d2b1f]
  hover:bg-[#721515]
  hover:shadow-[5px_5px_0px_#3d2b1f]
  hover:border-[#dfbf66]
  active:translate-x-[3px] active:translate-y-[3px]
  active:shadow-[1px_1px_0px_#3d2b1f]
  transition-all duration-300
">
  Proceed
</button>`,
    },
    card: {
      name: "卡片",
      description: "手抄本风格卡片，强调金箔浮现与羊皮纸平面庄重感",
      code: `<div className="
  group p-10
  bg-[#f0e6d0]
  border-4 border-double border-[#3d2b1f]
  shadow-[6px_6px_0px_rgba(61,43,31,0.8)]
  hover:border-[#8b1a1a]
  transition-all duration-700 ease-in-out
  relative overflow-hidden
">
  <div className="absolute top-2 left-2 text-[#8b1a1a] opacity-60 group-hover:opacity-100 transition-opacity duration-500 font-serif">+</div>
  <div className="absolute top-2 right-2 text-[#8b1a1a] opacity-60 group-hover:opacity-100 transition-opacity duration-500 font-serif">+</div>
  <div className="absolute bottom-2 left-2 text-[#8b1a1a] opacity-60 group-hover:opacity-100 transition-opacity duration-500 font-serif">+</div>
  <div className="absolute bottom-2 right-2 text-[#8b1a1a] opacity-60 group-hover:opacity-100 transition-opacity duration-500 font-serif">+</div>

  <h3 className="text-3xl font-serif font-bold text-[#3d2b1f] mb-4 tracking-wide uppercase leading-none group-hover:text-[#8b1a1a] transition-colors duration-700">
    <span className="text-6xl text-[#c9a74e] mr-2 float-left leading-[0.8] drop-shadow-sm group-hover:drop-shadow-[0_0_8px_rgba(201,167,78,0.6)] transition-all duration-700">
      I
    </span>
    lluminated
  </h3>
  <p className="text-[#3d2b1f] font-serif text-lg leading-relaxed pt-2">
    Written by the hand of the faithful scribe, where every stroke carries weight.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description:
        "手抄本风格输入框，羊皮纸底色、金色聚焦边框和衬线字体占位",
      code: `<div>
  <label className="block text-sm font-serif font-bold text-[#8b1a1a] uppercase tracking-wider mb-2">
    Inscription
  </label>
  <input
    type="text"
    placeholder="Scribe thy words..."
    className="
      w-full px-6 py-4
      bg-[#f0e6d0]/80
      border-2 border-[#3d2b1f]/30
      rounded-sm
      text-[#3d2b1f] placeholder-[#3d2b1f]/30
      font-serif
      focus:border-[#c9a74e]
      focus:shadow-[0_0_8px_rgba(201,167,78,0.2)]
      focus:outline-none
      transition-all duration-300
    "
  />
</div>`,
    },
    hero: {
      name: "Hero 区块",
      description:
        "手抄本风格 Hero 区域，羊皮纸质感背景、泥金装饰边框和花体大标题",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#f0e6d0]
  relative overflow-hidden
">
  {/* Parchment texture overlay */}
  <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_40%,#3d2b1f_0%,transparent_50%)]" />
  <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_70%_60%,#8b1a1a_0%,transparent_40%)]" />

  {/* Gold border frame */}
  <div className="absolute inset-8 border-4 border-double border-[#c9a74e]/40 pointer-events-none" />

  <div className="relative z-10 text-center px-6 max-w-3xl">
    <div className="inline-block mb-6 px-6 py-1 border-t-2 border-b-2 border-[#c9a74e]">
      <span className="text-xs font-serif text-[#c9a74e] uppercase tracking-[0.4em]">
        Anno Domini MXXVI
      </span>
    </div>
    <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#8b1a1a] mb-6 tracking-wider uppercase">
      <span className="text-8xl md:text-[10rem] text-[#c9a74e] leading-none block">M</span>anuscript
    </h1>
    <p className="text-lg text-[#3d2b1f]/60 font-serif italic mb-10 max-w-md mx-auto leading-relaxed">
      In the beginning was the Word, and the Word was illuminated.
    </p>
    <button className="
      px-10 py-4
      bg-[#8b1a1a]
      border-4 border-double border-[#c9a74e]
      text-[#f0e6d0] font-serif uppercase tracking-widest
      shadow-[2px_2px_0px_#3d2b1f]
      hover:bg-[#8b1a1a]/90
      hover:translate-x-[1px] hover:translate-y-[1px]
      hover:shadow-[1px_1px_0px_#3d2b1f]
      transition-all duration-300
    ">
      Begin Reading
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Medieval Manuscript Global Styles */

:root {
  --ms-red: #8b1a1a;
  --ms-parchment: #f0e6d0;
  --ms-gold: #c9a74e;
  --ms-green: #2d4a2d;
  --ms-brown: #3d2b1f;
}

/* Drop cap - illuminated first letter */
.ms-drop-cap::first-letter {
  float: left;
  font-size: 4em;
  line-height: 0.8;
  padding-right: 8px;
  color: var(--ms-gold);
  font-weight: bold;
}

/* Gold leaf shimmer */
.ms-gold-leaf {
  color: var(--ms-gold);
  text-shadow: 1px 1px 2px rgba(201, 167, 78, 0.4);
}

/* Decorative double-line border */
.ms-ornate-border {
  border: 4px double var(--ms-gold);
  position: relative;
}
.ms-ornate-border::before {
  content: "";
  position: absolute;
  inset: 4px;
  border: 1px solid rgba(201, 167, 78, 0.3);
  pointer-events: none;
}

/* Corner flourish */
.ms-corner-flourish {
  position: relative;
}
.ms-corner-flourish::before,
.ms-corner-flourish::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border-color: var(--ms-gold);
  opacity: 0.6;
}
.ms-corner-flourish::before {
  top: 4px;
  left: 4px;
  border-top: 2px solid;
  border-left: 2px solid;
}
.ms-corner-flourish::after {
  bottom: 4px;
  right: 4px;
  border-bottom: 2px solid;
  border-right: 2px solid;
}

/* Parchment texture */
.ms-parchment {
  background-color: var(--ms-parchment);
  background-image:
    radial-gradient(circle at 30% 40%, rgba(61, 43, 31, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 70% 60%, rgba(139, 26, 26, 0.02) 0%, transparent 40%);
}

/* Manuscript column text */
.ms-column-text {
  font-family: Georgia, 'Times New Roman', serif;
  line-height: 1.8;
  text-align: justify;
  hyphens: auto;
}`,

  aiRules: `You are a Medieval Manuscript design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Sans-serif fonts (font-sans) as primary font
- Modern gradients (bg-gradient-to-r with modern neon/tech colors)
- Neon, fluorescent, or high-saturation modern colors
- Backdrop blur effects (backdrop-blur)
- Pure black bg-black or pure white bg-white backgrounds
- Large rounded corners (rounded-xl, rounded-2xl, rounded-full)
- Futuristic or tech-style design elements

## Must Follow

- Parchment background bg-[#f0e6d0] as base
- Deep red #8b1a1a for headings and important text
- Gold #c9a74e for borders, decorations, and highlights
- Dark brown #3d2b1f for body text and secondary borders
- Serif fonts font-serif throughout
- Double-line borders border-double border-4 for ornate frames
- Corner decorations on cards and containers
- Drop cap effect on hero titles (first letter enlarged)

## Color Palette

Primary:
- Deep Red: #8b1a1a
- Parchment: #f0e6d0
- Gold Leaf: #c9a74e
- Monastery Green: #2d4a2d
- Dark Brown: #3d2b1f

## Unique Elements (Medieval Manuscript-Only)

1. Drop cap: first letter of headings enlarged (text-5xl+) in gold #c9a74e
2. Double-line borders: border-double border-4 border-[#c9a74e] for ornate framing
3. Corner flourishes: small border-t/l/r/b decorations at card corners
4. Parchment texture: radial-gradient overlays simulating skin variation
5. Gold dividers: border-t-2 border-[#c9a74e] horizontal separators

## Animation & Interaction Rules

- Parchment Stillness: 禁止轻浮上浮和弹性缩放，保持羊皮纸平面上的庄重静止。
- Wax Seal Impact: active 反馈用硬阴影+右下位移，模拟火漆印章下压。
- Gold Leaf Shimmer: 金色边框与首字母在 hover 时缓慢提亮，建议 duration-700 ease-in-out。
- Ink Saturation: 红褐文字与装饰线条应渐进加深，避免突兀跳变。`,

  examplePrompts: [
    {
      title: "中世纪手抄本阅读页面",
      titleEn: "Medieval Manuscript Reading Page",
      description:
        "手抄本风格的古典阅读页面，花体首字母、金色装饰边框和羊皮纸质感",
      descriptionEn:
        "Classical reading page with illuminated drop caps, gold ornate borders, corner flourishes, and parchment texture",
      prompt: `Use Medieval Manuscript style to create a reading page:
1. Background: parchment #f0e6d0 with subtle radial-gradient texture overlay
2. Gold double-line border frame around the content area
3. Hero: drop cap first letter (text-8xl gold), deep red title, italic subtitle
4. Cards: parchment bg, gold double borders, corner flourish decorations
5. Buttons: deep red bg, gold double border, serif uppercase text
6. Typography: font-serif throughout, justified text, relaxed line-height
7. Dividers: gold border-t-2 separators between sections`,
    },
  ],
};
