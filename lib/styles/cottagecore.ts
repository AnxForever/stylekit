import { DesignStyle } from "./index";

export const cottagecore: DesignStyle = {
  slug: "cottagecore",
  name: "田园核风",
  nameEn: "Cottagecore",
  description:
    "田园乡村美学，花卉图案、刺绣质感、蘑菇元素和温馨家庭感。柔和的衬线字体、圆润边角、温暖自然的配色，唤起对简单田园生活的向往。",
  cover: "/styles/cottagecore.svg",
  styleType: "visual",
  tags: ["retro", "minimal"],
  category: "retro",
  colors: {
    primary: "#5a8f5a",
    secondary: "#faf6f0",
    accent: ["#f5d75f", "#8b7355", "#d4a0a0"],
  },
  keywords: ["田园", "乡村", "花卉", "刺绣", "蘑菇", "温馨", "手工"],

  philosophy: `Cottagecore（田园核）是一种浪漫化田园乡村生活的美学运动，起源于2010年代末的互联网文化。

核心理念：
- 田园诗意：对简单乡村生活的浪漫化想象
- 手工温暖：刺绣、编织、手写字体的手工质感
- 自然亲密：花卉、蘑菇、蜜蜂、莓果等自然元素
- 家庭舒适：温暖的色调和柔软的材质感`,

  doList: [
    "使用温暖的大地色和花卉色调",
    "采用圆润的边角和柔和的阴影",
    "使用衬线字体传达古典感",
    "添加花朵、叶子等自然装饰元素",
    "使用亚麻/纸张质感的背景",
    "保持温馨舒适的整体氛围",
  ],

  dontList: [
    "禁止使用冰冷的蓝灰色调",
    "禁止使用尖锐的直角和硬边框",
    "禁止使用霓虹色或高饱和荧光色",
    "禁止使用科技感或工业风元素",
  ],

  components: {
    button: {
      name: "按钮",
      description: "田园核风格按钮",
      code: `<button className="
  px-8 py-3
  bg-[#5a8f5a] text-[#faf6f0]
  font-serif rounded-full
  shadow-[0_4px_10px_rgba(90,143,90,0.2)]
  hover:shadow-[0_8px_20px_rgba(90,143,90,0.3)]
  hover:-translate-y-0.5 hover:rotate-[0.8deg]
  active:rotate-0 active:scale-[0.97]
  active:shadow-[0_2px_6px_rgba(90,143,90,0.2)]
  transition-all duration-500 ease-in-out
  motion-reduce:transform-none
">
  Gather
</button>`,
    },
    card: {
      name: "卡片",
      description: "田园核风格卡片",
      code: `<div className="
  group p-8
  bg-[#faf6f0]
  rounded-3xl
  border border-[#d4a0a0]/40
  shadow-[0_4px_20px_rgba(139,115,85,0.05)]
  hover:shadow-[0_12px_30px_rgba(139,115,85,0.1)]
  hover:-translate-y-1 hover:-rotate-[0.8deg]
  transition-all duration-700 ease-in-out
">
  <div className="w-12 h-12 mb-4 text-[#d4a0a0] group-hover:scale-105 group-hover:rotate-6 transition-all duration-500 ease-in-out">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 2 4 5 4 9c0 4.4 7 11.3 7.6 11.9.2.2.6.2.8 0C13 20.3 20 13.4 20 9c0-4-4-7-8-7z"/></svg>
  </div>
  <h3 className="text-2xl font-serif text-[#8b7355] mb-3 group-hover:text-[#5a8f5a] transition-colors duration-500">
    Wildflower Meadow
  </h3>
  <p className="text-[#8b7355]/70 font-serif leading-relaxed">
    Where every stitch tells a story of spring.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "田园核风格输入框",
      code: `<input
  type="text"
  placeholder="Write your thoughts..."
  className="
    w-full px-4 py-3
    bg-[#faf6f0]
    border border-[#8b7355]/30
    rounded-xl
    text-[#8b7355] placeholder-[#8b7355]/40
    font-serif
    focus:border-[#5a8f5a]/60
    focus:shadow-[0_0_12px_rgba(90,143,90,0.2)]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "田园核风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-[#faf6f0] via-[#f5d75f]/10 to-[#d4a0a0]/20
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <h1 className="text-5xl md:text-7xl font-serif text-[#8b7355] mb-6">
      Cottagecore
    </h1>
    <p className="text-xl text-[#8b7355]/70 font-serif mb-8">
      A simpler life among wildflowers
    </p>
    <button className="
      px-10 py-4
      bg-[#5a8f5a] text-white
      font-serif rounded-full
      shadow-lg
      hover:shadow-xl hover:scale-105
      transition-all
    ">
      Explore
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Cottagecore Global Styles */

:root {
  --cottage-green: #5a8f5a;
  --cottage-yellow: #f5d75f;
  --cottage-brown: #8b7355;
  --cottage-pink: #d4a0a0;
  --cottage-cream: #faf6f0;
}

/* Linen texture background */
.cottage-linen {
  background-color: var(--cottage-cream);
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238b7355' fill-opacity='0.03'%3E%3Cpath d='M0 0h20v20H0zM20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E");
}

/* Floral border accent */
.cottage-border {
  border: 1px solid rgba(212, 160, 160, 0.4);
  border-radius: 1rem;
}

/* Warm serif heading */
.cottage-heading {
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--cottage-brown);
}`,

  aiRules: `You are a Cottagecore design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Cold blue-gray tones
- Sharp corners or hard angular borders
- Neon or high-saturation fluorescent colors
- Tech or industrial style elements

## Must Follow

- Warm earth tones: green #5a8f5a, yellow #f5d75f, brown #8b7355, pink #d4a0a0
- Cream/linen backgrounds bg-[#faf6f0]
- Serif fonts for headings font-serif
- Rounded corners rounded-full, rounded-2xl, rounded-xl
- Soft shadows shadow-md, shadow-lg

## Color Palette

Primary:
- Grass Green: #5a8f5a
- Daisy Yellow: #f5d75f
- Earth Brown: #8b7355
- Flower Pink: #d4a0a0
- Cream: #faf6f0

## Special Elements

- Floral and botanical decorations
- Linen/paper texture backgrounds
- Hand-drawn or embroidery style accents
- Mushroom and berry motifs

## Animation & Interaction Rules

- Gentle & Breezy: 动画节奏应轻柔舒缓，优先 \`duration-500\` 到 \`duration-700\` 搭配 \`ease-in-out\`。
- Handmade Imperfection: 悬停可加入非常轻微的旋转（建议不超过 1deg）和小幅放大，避免机械式直上直下。
- Soft Cushion Press: 点击反馈以柔和按压为主，推荐 \`active:scale-[0.97]\`；\`0.95\` 仅用于大面积元素，避免显得卡通化。
- Botanical Sway: 装饰性花叶图标可在 hover 时微幅摆动，幅度需克制，不能变成明显抖动动画。`,

  examplePrompts: [
    {
      title: "田园风小屋页面",
      titleEn: "Cottage Home Page",
      description: "温馨的田园乡村风格首页",
      descriptionEn: "Warm countryside cottage-style homepage",
      prompt: `Use Cottagecore style to create a cozy homepage:
1. Background: cream linen texture
2. Title: serif font in earth brown
3. Cards: rounded with floral borders
4. Buttons: green rounded-full with soft shadows
5. Overall warm, homey countryside feel`,
    },
  ],
};
