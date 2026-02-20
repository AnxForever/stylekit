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
    "交互加入暖色光晕和稳重过渡，模拟日晒陶土的温热触感",
    "点击反馈使用下沉压印（active:translate-y）而非弹性缩放",
    "表单焦点边框使用赤陶或橄榄绿，避免冷色高亮外圈",
  ],

  dontList: [
    "禁止使用冷色调如蓝色、紫色 bg-blue-* bg-purple-*",
    "禁止使用尖锐的直角 rounded-none rounded-sm",
    "禁止使用霓虹色或高饱和度荧光色",
    "禁止使用厚重的纯黑色 text-black bg-black",
    "禁止使用 bounce/spring 等轻飘弹性动画",
    "禁止使用刺眼的冷色 focus ring",
  ],

  components: {
    button: {
      name: "按钮",
      description: "赤陶暖调按钮，温暖圆润",
      code: `<button className="
  px-8 py-3.5
  bg-[#b5654a] text-[#faf5ef]
  text-sm font-medium tracking-wide
  rounded-lg
  shadow-[0_4px_12px_rgba(181,101,74,0.2)]
  hover:bg-[#a05a42]
  hover:shadow-[0_8px_20px_rgba(181,101,74,0.3)]
  hover:-translate-y-0.5
  active:translate-y-[2px]
  active:shadow-[0_0_0_rgba(181,101,74,0.2),inset_0_2px_4px_rgba(0,0,0,0.1)]
  transition-all duration-300 ease-out
">
  Explore
</button>`,
    },
    card: {
      name: "卡片",
      description: "赤陶暖调卡片，奶油底色配温暖阴影",
      code: `<div className="
  group p-8
  bg-[#faf5ef]
  rounded-xl
  border border-[#d4a373]/30
  shadow-[0_6px_16px_rgba(122,99,80,0.06)]
  hover:shadow-[0_12px_30px_rgba(181,101,74,0.12)]
  hover:border-[#b5654a]/40
  hover:-translate-y-1
  transition-all duration-300 ease-out
  cursor-pointer
">
  <div className="w-12 h-1 bg-[#8b9d77] mb-5 group-hover:w-16 transition-all duration-300 ease-out" />
  <h3 className="text-xl font-semibold text-[#7a6350] mb-3 group-hover:text-[#b5654a] transition-colors duration-300">
    Earthen Craft
  </h3>
  <p className="text-sm text-[#7a6350]/80 leading-relaxed font-medium">
    Molded by hand, baked by the sun. Interactions feel grounded, warm, and distinctly human.
  </p>
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
    focus:outline-none
    focus:border-[#8b9d77]
    focus:shadow-[0_0_0_2px_rgba(139,157,119,0.2)]
    transition-all duration-300 ease-out
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
- Think sun-baked clay, olive groves, and warm Mediterranean light

## Animation & Interaction Rules

- Sun-Baked Glow: 悬停时使用暖色光晕与背景加深，模拟陶土被阳光加热后的温润光感。
- Clay Press: active 禁止弹性缩放，使用 translate-y 与 inset shadow 呈现坚硬材质下压阻力。
- Handcrafted Slowness: 交互使用 duration-300 ease-out，避免现代感过强的弹跳反馈。
- Earthy Focus: 表单 focus 以赤陶或橄榄绿边框强化状态，避免刺眼蓝色外圈。`,
};
