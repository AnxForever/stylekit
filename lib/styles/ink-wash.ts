import { DesignStyle } from "./index";

export const inkWash: DesignStyle = {
  slug: "ink-wash",
  name: "水墨画风",
  nameEn: "Ink Wash",
  description:
    "源自中国传统水墨画的设计风格，以墨色浓淡干湿变化营造空灵意境，大量留白表达'气韵生动'，适合文化品牌、茶道、书法和东方美学项目。",
  cover: "/styles/ink-wash.svg",
  styleType: "visual",
  tags: ["minimal", "expressive"],
  category: "minimal",
  colors: {
    primary: "#2c2c2c",
    secondary: "#f8f5f0",
    accent: ["#6b7b6e", "#a89279", "#c4b9a8"],
  },
  keywords: ["水墨", "国画", "留白", "意境", "东方", "书法", "文化", "气韵"],

  philosophy: `水墨画风（Ink Wash）源自中国传统绘画的千年美学体系，以"墨分五色"诠释万象。

核心理念：
- 气韵生动：谢赫六法之首，追求画面的生命力与精神气质
- 墨分五色：焦、浓、重、淡、清，仅凭墨色浓淡即表现丰富层次
- 计白当黑：留白不是空缺，而是意境的延伸与想象的空间
- 以形写神：不求形似，但求神韵，超越表象触及本质
- 气韵贯通：笔断意连，形散神聚，整体气韵一脉相承`,

  doList: [
    "使用宣纸色温暖背景 bg-[#f8f5f0]",
    "墨色为主要文字色 text-[#2c2c2c]",
    "慷慨的留白营造意境 py-32 px-8",
    "使用衬线字体呼应书法质感 font-serif",
    "水墨感的细边框分隔 border-[#2c2c2c]/20",
    "缓慢过渡动画模拟墨色晕染 transition-all duration-700",
  ],

  dontList: [
    "禁止使用鲜艳饱和色彩，水墨以灰调为主",
    "禁止使用厚重阴影，破坏空灵意境",
    "禁止使用粗边框，水墨线条应如毛笔般纤细",
    "禁止使用装饰性动画和弹跳效果，保持静谧",
  ],

  components: {
    button: {
      name: "按钮",
      description: "水墨画风按钮，透明底色配以底部墨线",
      code: `<button className="
  px-6 py-2.5
  bg-transparent
  text-[#2c2c2c] font-serif text-sm tracking-wider
  border-b border-[#2c2c2c]/30
  hover:border-[#2c2c2c]/80
  transition-all duration-700
">
  Continue
</button>`,
    },
    card: {
      name: "卡片",
      description: "水墨画风卡片，左侧墨色竖线",
      code: `<div className="
  p-8
  bg-[#f8f5f0]
  border-l-2 border-[#2c2c2c]/20
  hover:border-[#2c2c2c]/40
  transition-colors duration-700
">
  <h3 className="text-lg font-serif font-light text-[#2c2c2c] mb-4">Title</h3>
  <p className="text-sm text-[#a89279] leading-relaxed">Content</p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "水墨画风输入框，底部笔触墨线",
      code: `<input
  type="text"
  placeholder="..."
  className="
    w-full px-0 py-2
    bg-transparent
    border-b border-[#c4b9a8]/50
    text-[#2c2c2c] font-serif
    placeholder-[#c4b9a8]
    focus:outline-none focus:border-[#6b7b6e]
    transition-colors duration-700
  "
/>`,
    },
  },

  globalCss: `/* Ink Wash */
:root {
  --ink-bg: #f8f5f0;
  --ink-surface: #f3efe8;
  --ink-text: #2c2c2c;
  --ink-muted: #a89279;
  --ink-moss: #6b7b6e;
  --ink-sand: #c4b9a8;
  --ink-border: #2c2c2c;
}`,

  aiRules: `You are designing in Ink Wash (Chinese ink painting) style.
- Warm xuan-paper backgrounds: #f8f5f0, #f3efe8
- Ink-black text color: #2c2c2c
- Muted natural accents: moss green #6b7b6e, tea brown #a89279, sand #c4b9a8
- Always use serif fonts (font-serif) for calligraphic feel
- Extreme whitespace: py-32, large gaps between sections for "qi" flow
- Ultra-thin ink borders: border-[#2c2c2c]/20
- Slow transitions: duration-700 to mimic ink diffusion
- No bright saturated colors, no heavy shadows, no decorative elements
- Embrace generous emptiness -- whitespace IS the design
- Think "ink on xuan paper" and "mountain mist landscape"`,
};
