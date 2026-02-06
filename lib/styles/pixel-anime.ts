import { DesignStyle } from "./index";

export const pixelAnime: DesignStyle = {
  slug: "pixel-anime",
  name: "像素动漫风",
  nameEn: "Pixel Anime",
  description:
    "将像素艺术的8-bit复古质感与动漫角色美学相融合，呈现出Q版像素角色、游戏UI元素和怀旧色彩的独特风格。",
  cover: "/styles/pixel-anime.svg",
  styleType: "visual",
  tags: ["retro", "expressive"],
  category: "retro",
  colors: {
    primary: "#4a90d9",
    secondary: "#2d1b69",
    accent: ["#ff6b6b", "#ffd93d", "#50c878"],
  },
  keywords: ["像素动漫", "8-bit", "复古游戏", "Q版", "像素", "怀旧"],

  philosophy: `Pixel Anime 是像素艺术与动漫角色美学的融合，以8-bit渲染方式呈现可爱的动漫风格。

核心理念：
- 像素渲染：所有视觉元素保持像素化的阶梯感
- 复古色彩：使用经典游戏机的有限色彩调色板
- Q版可爱：融入动漫中的可爱和夸张表现力
- 游戏UI：借鉴经典RPG游戏的界面元素
- 怀旧氛围：唤起8-bit/16-bit时代的游戏记忆`,

  doList: [
    "使用深紫色背景 (#2d1b69) 作为基底",
    "采用硬边阴影 (offset shadow) 模拟像素感",
    "使用等宽字体，保持像素文字风格",
    "保持扁平色块，不使用渐变",
    "使用鲜明的有限色彩调色板",
    "使用直角边框和粗边线",
  ],

  dontList: [
    "禁止使用平滑渐变效果",
    "禁止使用圆角 (rounded-lg/xl/full)",
    "禁止使用模糊效果 (blur/backdrop-blur)",
    "禁止使用衬线字体",
    "禁止使用柔和的阴影 (shadow-md/lg)",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Pixel Anime 风格按钮",
      code: `<button className="
  px-6 py-3
  bg-[#4a90d9] text-white
  font-mono font-bold uppercase tracking-wider
  border-2 border-[#1a1040]
  shadow-[4px_4px_0px_#1a1040]
  hover:translate-x-[2px] hover:translate-y-[2px]
  hover:shadow-[2px_2px_0px_#1a1040]
  transition-all duration-150 ease-linear
">
  START
</button>`,
    },
    card: {
      name: "卡片",
      description: "Pixel Anime 风格卡片",
      code: `<div className="
  p-6
  bg-[#2d1b69]
  border-2 border-[#1a1040]
  shadow-[4px_4px_0px_#1a1040]
">
  <h3 className="text-xl font-mono font-bold text-[#ffd93d] uppercase mb-2">
    QUEST LOG
  </h3>
  <p className="text-[#e0e0ff]/70 font-mono text-sm">
    Adventure awaits!
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Pixel Anime 风格输入框",
      code: `<input
  type="text"
  placeholder="Enter name..."
  className="
    w-full px-4 py-3
    bg-[#1a1040]
    border-2 border-[#4a90d9]
    text-[#e0e0ff] placeholder-[#e0e0ff]/40
    font-mono
    focus:border-[#ffd93d]
    focus:shadow-[2px_2px_0px_#4a90d9]
    focus:outline-none
    transition-all duration-150 ease-linear
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Pixel Anime 风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#2d1b69]
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <h1 className="text-5xl md:text-7xl font-mono font-bold text-[#4a90d9] uppercase tracking-wider mb-2">
      PIXEL
    </h1>
    <h2 className="text-4xl md:text-6xl font-mono font-bold text-[#ffd93d] uppercase tracking-wider mb-6">
      ANIME
    </h2>
    <p className="text-lg text-[#e0e0ff]/60 font-mono mb-8">
      8-bit dreams, anime soul
    </p>
    <button className="
      px-10 py-4
      bg-[#ff6b6b] text-white
      font-mono font-bold uppercase tracking-wider
      border-2 border-[#1a1040]
      shadow-[4px_4px_0px_#1a1040]
      hover:translate-x-[2px] hover:translate-y-[2px]
      hover:shadow-[2px_2px_0px_#1a1040]
      transition-all duration-150 ease-linear
    ">
      PLAY
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Pixel Anime Global Styles */

:root {
  --pixel-blue: #4a90d9;
  --pixel-dark: #2d1b69;
  --pixel-deep: #1a1040;
  --pixel-red: #ff6b6b;
  --pixel-gold: #ffd93d;
  --pixel-green: #50c878;
  --pixel-text: #e0e0ff;
}

/* Pixel border pattern */
.pixel-border {
  box-shadow:
    4px 0 0 0 #1a1040,
    -4px 0 0 0 #1a1040,
    0 4px 0 0 #1a1040,
    0 -4px 0 0 #1a1040;
}

/* Pixel grid overlay */
.pixel-grid::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(26, 16, 64, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 16, 64, 0.1) 1px, transparent 1px);
  background-size: 4px 4px;
  pointer-events: none;
}

/* HP/MP bar style */
.pixel-bar {
  height: 8px;
  border: 2px solid #1a1040;
  background: #1a1040;
}
.pixel-bar-fill {
  height: 100%;
  image-rendering: pixelated;
}

/* Stepped shadow */
.pixel-shadow {
  box-shadow: 4px 4px 0px #1a1040;
}`,

  aiRules: `You are a Pixel Anime design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Smooth gradients (linear-gradient, radial-gradient)
- Rounded corners (rounded-lg, rounded-xl, rounded-full)
- Blur effects (blur, backdrop-blur)
- Serif fonts
- Soft shadows (shadow-sm, shadow-md, shadow-lg, shadow-xl)

## Must Follow

- Dark purple background: bg-[#2d1b69] as primary surface
- Pixel blue: #4a90d9 for primary actions
- Gold: #ffd93d for highlights and headings
- Hard offset shadows: shadow-[4px_4px_0px_#1a1040]
- Monospace font: font-mono for all text
- Bold 2px borders: border-2 border-[#1a1040]
- Flat colors only, no gradients
- Linear easing for transitions (ease-linear)

## Color Palette

Primary:
- Pixel Blue: #4a90d9
- Dark Purple: #2d1b69
- Deep Dark: #1a1040
- Pixel Red: #ff6b6b
- Pixel Gold: #ffd93d
- Pixel Green: #50c878
- Light Text: #e0e0ff

## Special Elements

- HP/MP bar indicators
- Stepped pixel borders
- Grid pattern overlays
- 8-bit styled icons
- Hard offset shadow depth`,

  examplePrompts: [
    {
      title: "像素动漫角色页",
      titleEn: "Pixel Anime Character Page",
      description: "游戏风格的角色展示页面",
      descriptionEn: "Game-style character showcase page",
      prompt: `Use Pixel Anime style to create a character showcase page:
1. Background: dark purple with pixel grid overlay
2. Cards: game-panel style with hard borders and offset shadows
3. Colors: limited palette of blue, gold, red, green
4. Typography: monospace, uppercase, bold
5. Overall 8-bit retro anime game aesthetic`,
    },
  ],
};
