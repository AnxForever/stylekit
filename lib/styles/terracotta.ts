import { DesignStyle } from "./index";

export const terracotta: DesignStyle = {
  slug: "terracotta",
  name: "赤陶暖调",
  nameEn: "Terracotta",
  description:
    "地中海赤陶与暖色大地的设计风格，温暖的陶土色调、粗糙手工质感和自然纹理。适合生活方式品牌、餐饮、旅行和手工艺品展示。",
  cover: "/styles/terracotta.svg",
  styleType: "visual",
  tags: ["minimal", "modern"],
  category: "minimal",
  colors: {
    primary: "#b5654a",
    secondary: "#faf5ef",
    accent: ["#d4a373", "#7a6350", "#8b9d77"],
  },
  keywords: ["赤陶", "地中海", "暖调", "大地色", "手工", "陶土", "自然", "温暖"],

  philosophy: `赤陶暖调（Terracotta）源自地中海沿岸数千年的陶艺传统，将烧制泥土的温暖色泽融入数字设计。

核心理念：
- 大地之温：以赤陶色（#b5654a）为主色调，传递泥土经火焰淬炼后的温暖
- 手工质感：圆润的边角与柔和的阴影模拟手工制品的触感
- 自然调和：奶油白底色搭配大地色系点缀，如同阳光洒落在陶器上
- 生命气息：橄榄绿（#8b9d77）作为植物色彩点缀，赋予设计生机
- 朴素之美：拒绝过度装饰，让材质与色彩本身说话`,

  doList: [
    "使用温暖的奶油色背景 bg-[#faf5ef]",
    "用赤陶色作为主要强调色 text-[#b5654a]",
    "圆润的边角营造手工质感 rounded-lg rounded-xl",
    "温暖柔和的阴影 shadow-md shadow-[#b5654a]/10",
    "自然舒适的间距 py-20 px-6",
    "使用大地色系的渐变层次 #d4a373 #7a6350",
  ],

  dontList: [
    "禁止使用冷色调如蓝色、紫色 bg-blue-* bg-purple-*",
    "禁止使用尖锐的直角 rounded-none rounded-sm",
    "禁止使用霓虹色或高饱和度荧光色",
    "禁止使用厚重的纯黑色 text-black bg-black",
  ],

  components: {
    button: {
      name: "按钮",
      description: "赤陶暖调按钮，温暖圆润",
      code: `<button className="
  px-6 py-3
  bg-[#b5654a] text-[#faf5ef]
  text-sm font-medium tracking-wide
  rounded-lg
  hover:bg-[#a05a42]
  shadow-md shadow-[#b5654a]/15
  transition-colors duration-300
">
  Explore
</button>`,
    },
    card: {
      name: "卡片",
      description: "赤陶暖调卡片，奶油底色配温暖阴影",
      code: `<div className="
  p-6
  bg-[#faf5ef]
  rounded-xl
  border border-[#d4a373]/25
  shadow-md shadow-[#b5654a]/8
  hover:shadow-lg hover:shadow-[#b5654a]/12
  transition-shadow duration-300
">
  <h3 className="text-lg font-semibold text-[#7a6350] mb-3">Title</h3>
  <p className="text-sm text-[#7a6350]/75 leading-relaxed">Content</p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "赤陶暖调输入框，温暖边框与圆角",
      code: `<input
  type="text"
  placeholder="Your name"
  className="
    w-full px-4 py-3
    bg-white
    border border-[#d4a373]/40
    rounded-lg
    text-[#7a6350]
    placeholder-[#d4a373]/50
    focus:outline-none focus:border-[#b5654a] focus:ring-2 focus:ring-[#b5654a]/20
    transition-all duration-300
  "
/>`,
    },
  },

  globalCss: `/* Terracotta Warmth */
:root {
  --terracotta-bg: #faf5ef;
  --terracotta-primary: #b5654a;
  --terracotta-sand: #d4a373;
  --terracotta-earth: #7a6350;
  --terracotta-olive: #8b9d77;
  --terracotta-border: #d4a373;
}`,

  aiRules: `You are designing in Terracotta style inspired by Mediterranean clay craftsmanship.
- Use warm earth tones: cream #faf5ef, terracotta #b5654a, sand #d4a373, earth #7a6350
- Accent with olive green #8b9d77 for natural vitality
- Rounded corners (rounded-lg, rounded-xl) to evoke handcrafted ceramics
- Warm, soft shadows using terracotta-tinted shadow colors
- Generous spacing for a relaxed, inviting feel
- No cool blues, purples, or neon colors
- No sharp corners or heavy black elements
- Font weights: medium and semibold for headings, regular for body
- Think sun-baked clay, olive groves, and warm Mediterranean light`,
};
