import { DesignStyle } from "./index";

export const zenGarden: DesignStyle = {
  slug: "zen-garden",
  name: "枯山水",
  nameEn: "Zen Garden",
  description:
    "日本枯山水庭园的数字化诠释，以砂纹、石组、苔藓为灵感，追求极致静谧与冥想感。沙白与苔绿的搭配传递出自然之道的宁静力量。",
  cover: "/styles/zen-garden.svg",
  styleType: "visual",
  tags: ["minimal", "expressive"],
  category: "minimal",
  colors: {
    primary: "#4a5548",
    secondary: "#f5f3ee",
    accent: ["#8a9a7b", "#c4bba8", "#7a7062"],
  },
  keywords: ["枯山水", "日式", "禅", "砂纹", "石组", "苔藓", "冥想", "庭园", "karesansui"],

  philosophy: `枯山水（Karesansui）是日本禅宗庭园的最高表现形式。

核心理念：
- 以砂代水：白砂上的纹路象征水面的涟漪与波纹，无水却见水
- 石组之美：精心放置的石组代表山岳与岛屿，以少胜多
- 苔藓之生：苔绿是时间沉淀的痕迹，是静中有动的生命力
- 冥想之境：整座庭园是一个供人静观、内省的空间
- 借景与留白：将周围自然纳入构图，空间本身即是表达`,

  doList: [
    "使用沙白色背景 bg-[#f5f3ee]",
    "苔藓绿作为重点色 text-[#8a9a7b]",
    "极致留白，慷慨的垂直间距 py-32",
    "纤细自然的边框 border-[#c4bba8]/30",
    "衬线字体搭配轻字重 font-serif font-light",
    "非常缓慢的过渡动画 transition duration-700",
  ],

  dontList: [
    "禁止使用明亮鲜艳的色彩",
    "禁止使用厚重边框和粗线条",
    "禁止使用快速动画和弹跳效果",
    "禁止密集排列元素，留白是核心",
  ],

  components: {
    button: {
      name: "按钮",
      description: "枯山水按钮，透明底色搭配细底线",
      code: `<button className="
  px-8 py-3
  bg-transparent
  text-[#4a5548]/70 font-serif text-sm tracking-widest
  border border-transparent
  hover:border-[#8a9a7b]/30
  hover:text-[#4a5548]
  hover:bg-[#8a9a7b]/5
  hover:shadow-[0_0_20px_rgba(138,154,123,0.05)]
  focus-visible:outline-none focus-visible:border-[#8a9a7b]/40
  transition-all duration-1000 ease-in-out
">
  Enter Quietude
</button>`,
    },
    card: {
      name: "卡片",
      description: "枯山水卡片，沙白背景搭配苔绿左边框",
      code: `<div className="
  group p-12
  bg-[#f5f3ee]
  border-l border-[#8a9a7b]/30
  hover:border-[#8a9a7b]/50
  transition-colors duration-1000 ease-in-out
">
  <h3 className="text-xl font-serif font-light text-[#4a5548]/60 group-hover:text-[#4a5548] tracking-widest mb-6 transition-colors duration-1000 ease-in-out">
    静 寂
  </h3>
  <p className="text-[#4a5548]/50 font-serif font-light leading-loose group-hover:text-[#4a5548]/80 transition-colors duration-1000 ease-in-out delay-100">
    Listen to the sound of snow falling on moss. The mind becomes clear when the water is still.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "枯山水输入框，极简底线风格",
      code: `<input
  type="text"
  placeholder="..."
  className="
    w-full px-0 py-2
    bg-transparent
    border-b border-[#c4bba8]/40
    text-[#4a5548] font-serif
    placeholder-[#c4bba8]
    focus:outline-none focus:border-[#8a9a7b]
    transition-colors duration-700
  "
/>`,
    },
  },

  globalCss: `/* Zen Garden (Karesansui) */
:root {
  --zen-bg: #f5f3ee;
  --zen-surface: #ede9e1;
  --zen-text: #4a5548;
  --zen-muted: #7a7062;
  --zen-moss: #8a9a7b;
  --zen-sand: #c4bba8;
  --zen-stone: #7a7062;
  --zen-border: #c4bba8;
}`,

  aiRules: `You are designing in Zen Garden (Karesansui) style.
- Sand-white backgrounds: #f5f3ee, #ede9e1
- Moss-green primary text: #4a5548
- Muted natural accents: moss #8a9a7b, sand #c4bba8, stone #7a7062
- Always use serif fonts with light weight (font-serif font-light)
- Extreme whitespace: py-32, generous gaps between all sections
- Ultra-thin borders: border-[#c4bba8]/30
- Very slow transitions: duration-700 or longer
- No bright colors, no heavy borders, no fast animations
- Think raked sand patterns, carefully placed stones, quiet moss
- Every element should feel like it was placed with meditative intention

Animation & Interaction Rules:
- Meditative Slowness: 交互必须缓慢克制，使用 \`duration-700\` 到 \`duration-1000\` 与 \`ease-in-out\`。
- Zero Displacement: 禁止使用 \`translate\`、\`rotate\`，避免任何物理位移动效；焦点应通过显隐与色阶变化表达。
- Ephemeral Fades: 仅使用低对比度的颜色加深、透明度浮现、或极淡阴影淡入淡出，不做弹跳与高对比闪烁。
- Quiet Focus: 文本可默认半透明（如 \`text-[#4a5548]/70\`），hover/focus 时缓慢趋于清晰，保持冥想式节奏。`,
};
