import { DesignStyle } from "./index";

export const indianFestive: DesignStyle = {
  slug: "indian-festive",
  name: "印度节庆",
  nameEn: "Indian Festive",
  description:
    "印度排灯节与色彩节的绚丽美学，丰富的金色装饰、宝石色调、曼荼罗纹饰。适合庆典、活动、生活方式品牌。",
  cover: "/styles/indian-festive.svg",
  styleType: "visual",
  tags: ["expressive", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#e63946",
    secondary: "#fff8e7",
    accent: ["#ff9f1c", "#7b2d8e", "#2a9d8f", "#d4af37"],
  },
  keywords: ["印度", "排灯节", "色彩节", "曼荼罗", "金色", "宝石色", "节庆"],

  philosophy: `Indian Festive（印度节庆）汲取排灯节（Diwali）和色彩节（Holi）的绚烂视觉语言，将南亚次大陆数千年的色彩传统转化为现代数字界面。

核心理念：
- 绚丽奔放：大胆使用高饱和的宝石色调——朱红、藏红花橙、皇家紫、孔雀绿——表达节日的热烈与生命力
- 金色装饰：金色线条、边框和光晕是印度工艺美术的灵魂，代表神圣与繁荣
- 曼荼罗纹饰：对称的几何花纹既是冥想的载体，也是视觉层次的构建方式
- 光明与希望：排灯节是"灯的节日"，温暖的光芒渗透在每一处交互细节中

设计表现上，印度节庆风格不吝于色彩的叠加与碰撞。与西方极简主义的克制不同，它拥抱丰富、层叠和装饰性，将每一个界面元素都视为一次视觉庆典。

适用场景包括庆典活动页面、生活方式品牌、文化教育平台以及任何需要传达热情、多元与丰饶感的数字产品。`,

  doList: [
    "使用朱红 bg-[#e63946] 和藏红花橙 bg-[#ff9f1c] 作为主要强调色",
    "大量使用金色 text-[#d4af37] 和 border-[#d4af37] 做装饰线和光晕",
    "采用温暖的象牙白 bg-[#fff8e7] 为基底背景",
    "使用皇家紫 text-[#7b2d8e] 和孔雀绿 text-[#2a9d8f] 做辅助色",
    "组件使用中等圆角 rounded-xl 传达柔和的节庆氛围",
    "添加金色 box-shadow 光晕效果 shadow-[0_0_20px_rgba(212,175,55,0.3)]",
    "使用渐变背景 bg-gradient-to-r 增强色彩表现力",
    "标题使用粗体和较宽字距 font-bold tracking-wide",
    "按钮 hover 时金色光晕爆破：hover:shadow-[0_0_35px_rgba(212,175,55,0.8)]",
    "按钮 hover:-translate-y-1 hover:scale-[1.03]（节日活跃的向上欢腾感）",
    "按钮 active:scale-95 active:translate-y-0 active:shadow-[0_0_16px_rgba(212,175,55,0.4)]",
    "卡片使用 group 类，颜色横线从 w-12 扩展至 group-hover:w-full（duration-500，礼带展开）",
    "focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-[#fff8e7]",
  ],

  dontList: [
    "禁止使用冰冷的蓝灰色调 bg-gray-100, bg-slate-50",
    "禁止使用纯黑背景 bg-black, bg-[#000]",
    "禁止使用直角无圆角造型 rounded-none",
    "禁止使用低饱和度或灰暗色彩",
    "禁止使用过于科技感的霓虹蓝绿 text-[#00ffff]",
    "禁止省略金色装饰元素",
    "禁止使用单色方案，应当多色叠加",
    "禁止按钮缺少 active:scale-95（节日按钮必须有欢腾的弹跳感）",
    "禁止 focus:ring 缺少 focus:ring-offset-[#fff8e7]（象牙白背景上焦点环需与元素分离）",
  ],

  components: {
    button: {
      name: "按钮",
      description: "印度节庆按钮：hover 时金色光晕爆破（shadow 35px）+ hover:-translate-y-1 hover:scale-[1.03] 向上欢腾，active:scale-95 弹跳，focus:ring-[#d4af37] focus:ring-offset-[#fff8e7]",
      code: `<button className="
  px-8 py-4
  bg-[#e63946] text-white
  font-bold tracking-wide
  rounded-xl
  border-2 border-[#d4af37]
  shadow-[0_0_16px_rgba(212,175,55,0.4)]
  hover:shadow-[0_0_35px_rgba(212,175,55,0.8)]
  hover:-translate-y-1 hover:scale-[1.03]
  focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-[#fff8e7]
  active:scale-95 active:translate-y-0
  active:shadow-[0_0_16px_rgba(212,175,55,0.4)]
  transition-all duration-300 ease-out
">
  Celebrate
</button>`,
    },
    card: {
      name: "卡片",
      description: "印度节庆卡片：group 类触发礼带颜色横线从 w-12 展开至 group-hover:w-full（duration-500，Ceremonial Unfurling），标题 group-hover 朱红切换，悬浮时金色光晕爆破",
      code: `<div className="
  group
  p-8
  bg-[#fff8e7]
  rounded-xl
  border-2 border-[#d4af37]/50
  shadow-[0_4px_20px_rgba(212,175,55,0.2)]
  hover:-translate-y-2 hover:scale-[1.02]
  hover:shadow-[0_15px_40px_rgba(230,57,70,0.2),0_0_30px_rgba(212,175,55,0.3)]
  transition-all duration-300 ease-out
  cursor-pointer
">
  {/* Ceremonial Unfurling color strip */}
  <div className="w-12 h-1 bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] rounded-full mb-4 group-hover:w-full transition-all duration-500 ease-out" />
  <h3 className="text-2xl font-bold text-[#7b2d8e] mb-3 group-hover:text-[#e63946] transition-colors duration-300">
    Festival of Lights
  </h3>
  <p className="text-[#7b2d8e]/70">
    Illuminating every corner with warmth and joy
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "印度节庆风格输入框，金色聚焦光晕",
      code: `<input
  type="text"
  placeholder="Enter your name..."
  className="
    w-full px-6 py-4
    bg-[#fff8e7]
    border-2 border-[#d4af37]/30
    rounded-xl
    text-[#7b2d8e] placeholder-[#d4af37]/40
    font-medium
    focus:border-[#d4af37]
    focus:shadow-[0_0_16px_rgba(212,175,55,0.4)]
    focus:outline-none
    transition-all duration-300
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "印度节庆风格 Hero，多彩渐变与金色光效",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-br from-[#fff8e7] via-[#ff9f1c]/10 to-[#e63946]/10
  relative overflow-hidden
">
  {/* Decorative mandala circle */}
  <div className="absolute top-10 right-10 w-32 h-32 rounded-full border-4 border-[#d4af37]/20 flex items-center justify-center">
    <div className="w-20 h-20 rounded-full border-2 border-[#d4af37]/30 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full bg-[#d4af37]/20" />
    </div>
  </div>

  <div className="relative z-10 text-center px-6">
    <div className="w-24 h-1 bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] rounded-full mx-auto mb-8" />
    <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] mb-6">
      Indian Festive
    </h1>
    <p className="text-xl text-[#7b2d8e]/80 mb-8">
      Where colors dance and light prevails
    </p>
    <button className="
      px-10 py-4
      bg-gradient-to-r from-[#e63946] to-[#ff9f1c]
      text-white font-bold tracking-wide
      rounded-xl
      border-2 border-[#d4af37]
      shadow-[0_0_24px_rgba(212,175,55,0.5)]
      hover:shadow-[0_0_40px_rgba(212,175,55,0.7)]
      hover:scale-105
      transition-all duration-300
    ">
      Explore
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Indian Festive Global Styles */

:root {
  --if-vermillion: #e63946;
  --if-warm-white: #fff8e7;
  --if-saffron: #ff9f1c;
  --if-royal-purple: #7b2d8e;
  --if-teal: #2a9d8f;
  --if-gold: #d4af37;
}

/* Gold glow effect */
.if-gold-glow {
  box-shadow:
    0 0 12px rgba(212, 175, 55, 0.3),
    0 0 24px rgba(212, 175, 55, 0.15);
}

/* Mandala border decoration */
.if-mandala-border {
  border: 2px solid var(--if-gold);
  border-radius: 1rem;
  position: relative;
}

/* Festive gradient text */
.if-gradient-text {
  background: linear-gradient(135deg, var(--if-vermillion), var(--if-saffron), var(--if-gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Warm backdrop */
.if-warm-bg {
  background: linear-gradient(135deg, var(--if-warm-white), rgba(255, 159, 28, 0.05), rgba(230, 57, 70, 0.05));
}

/* Diya lamp glow */
.if-diya-glow {
  box-shadow:
    0 0 20px rgba(255, 159, 28, 0.4),
    0 0 40px rgba(212, 175, 55, 0.2);
}`,

  aiRules: `You are an Indian Festive design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Cold blue-gray tones (bg-gray-100, bg-slate-50)
- Pure black backgrounds (bg-black)
- Sharp corners (rounded-none)
- Low-saturation or muted colors
- Neon cyber colors (text-[#00ffff], text-[#ff00ff])
- Monochromatic schemes

## Must Follow

- Vermillion red #e63946 and saffron orange #ff9f1c as primary accents
- Warm ivory background bg-[#fff8e7]
- Gold decorations using border-[#d4af37] and shadow with gold rgba
- Royal purple #7b2d8e for text and headings
- Rounded corners rounded-xl
- Multi-color gradients for emphasis
- Bold typography with tracking-wide

## Color Palette

Primary:
- Vermillion: #e63946
- Warm White: #fff8e7
- Saffron: #ff9f1c
- Royal Purple: #7b2d8e
- Teal: #2a9d8f
- Gold: #d4af37

## Special Elements

- Mandala-inspired circular decorations
- Gold border and glow effects
- Multi-color gradient strips
- Warm layered backgrounds
- Festive light/lamp motifs

## Animation & Interaction Rules

### Grand Illumination (Button Glow)
- Resting: shadow-[0_0_16px_rgba(212,175,55,0.4)] — always-on gold aura
- Hover: hover:shadow-[0_0_35px_rgba(212,175,55,0.8)] — glow explodes to 35px (diya lamp igniting)
- NEVER use flat shadow on interactive elements

### Joyful Flourish (Button Motion)
- hover:-translate-y-1 hover:scale-[1.03] — lift AND grow simultaneously (lamp rising + fireworks ascending)
- active:scale-95 active:translate-y-0 — joyful bounce-back
- active:shadow-[0_0_16px_rgba(212,175,55,0.4)] — glow settles back to resting

### Golden Touch (Focus)
- focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-[#fff8e7]
- ring-offset-[#fff8e7] mandatory — gold ring must separate from ivory background

### Ceremonial Unfurling (Card Color Strip)
- Resting: w-12 h-1 bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37]
- On group-hover: group-hover:w-full — ribbon unfurls across full card width (gift unwrapping)
- Transition: duration-500 ease-out
- Always use group class on card container

### Card Hover
- hover:-translate-y-2 hover:scale-[1.02] — festive ascension
- hover:shadow-[0_15px_40px_rgba(230,57,70,0.2),0_0_30px_rgba(212,175,55,0.3)] — dual jewel-tone glow
- Heading: group-hover:text-[#e63946] transition-colors duration-300 — purple to vermillion shift`,

  examplePrompts: [
    {
      title: "印度节庆活动页",
      titleEn: "Indian Festival Event Page",
      description: "排灯节风格的活动落地页",
      descriptionEn: "Diwali-themed event landing page",
      prompt: `Use Indian Festive style to create a celebration landing page:
1. Background: warm ivory with subtle gradient
2. Title: multi-color gradient text (vermillion to gold)
3. Cards: gold-bordered with jewel-tone accents
4. Buttons: red-orange gradient with gold glow
5. Decorations: mandala circles and gold divider lines`,
    },
  ],
};
