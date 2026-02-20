import { DesignStyle } from "./index";

export const antiDesign: DesignStyle = {
  slug: "anti-design",
  name: "反设计",
  nameEn: "Anti-Design",
  description:
    "故意打破传统UI规范的粗野主义实验风格，极粗边框、高饱和色彩与不规则排版",
  cover: "/styles/anti-design.svg",
  styleType: "visual",
  tags: ["expressive", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#000000",
    secondary: "#FFFFFF",
    accent: ["#FF0000", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#00FF00"],
  },
  keywords: [
    "brutalism",
    "anti-design",
    "raw",
    "experimental",
    "bold",
    "punk",
    "rebellious",
  ],

  philosophy: `Anti-Design deliberately breaks every UI convention. Where traditional design seeks harmony, Anti-Design seeks visual conflict.

Core principles:
- Ultra-thick black borders (4-8px) on every element
- Sharp corners only (border-radius: 0) - nothing is ever rounded
- High-saturation primary colors: red, blue, yellow, magenta, cyan, green
- Rotated text and elements at odd angles (-3deg to 5deg)
- Dramatically mixed font sizes within the same section
- Asymmetric, uneven borders (thicker on right/bottom)
- Intentional visual conflict between adjacent elements
- Hard offset shadows only - no soft shadows ever`,

  doList: [
    "Use ultra-thick black borders (4-8px) on everything",
    "Use sharp corners only (border-radius: 0)",
    "Apply high-saturation primary colors (red, blue, yellow, magenta)",
    "Rotate text and elements at odd angles (-3deg to 5deg)",
    "Mix font sizes dramatically within the same section",
    "Use asymmetric, uneven borders (thicker on right/bottom)",
    "Create intentional visual conflict between adjacent elements",
    "Use hard offset shadows only (e.g., shadow-[8px_8px_0_#000])",
    "Use font-black weight and uppercase for emphasis",
    "Use aggressive hover states with abrupt color flips and border jumps",
    "Break alignment on interaction using translate/rotate/size shifts",
    "Prefer transition-none or linear timing for raw feedback",
  ],

  dontList: [
    "Don't use rounded corners of any kind",
    "Don't use subtle or muted colors",
    "Don't use consistent spacing or alignment",
    "Don't use drop shadows or soft shadows",
    "Don't use gradients (flat colors only)",
    "Don't make things pretty or harmonious",
    "Don't use backdrop-blur or translucency",
    "Don't use smooth polished easing (ease-in-out, spring, bounce)",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Anti-Design 风格按钮 - 极粗黑边、硬偏移阴影、高饱和色",
      code: `<button className="
  px-6 py-3
  bg-[#FF0000] text-white
  font-black text-xl uppercase
  border-4 border-black
  rounded-none
  shadow-[8px_8px_0_#000]
  hover:bg-[#0000FF] hover:text-[#FFFF00]
  hover:border-8 hover:shadow-[12px_12px_0_#000]
  hover:-translate-x-2 hover:rotate-3
  active:bg-[#FFFF00] active:text-black
  active:shadow-none active:translate-x-[8px] active:translate-y-[8px]
  transition-none
  cursor-help
">
  CLICK ME
</button>`,
    },
    card: {
      name: "卡片",
      description: "Anti-Design 风格卡片 - 白底粗黑框硬偏移阴影",
      code: `<div className="
  bg-white
  border-4 border-black
  p-6
  rounded-none
  shadow-[8px_8px_0_#000]
  hover:bg-[#FFFF00]
  hover:border-8
  hover:shadow-[12px_12px_0_#000]
  hover:-translate-x-2 hover:-translate-y-2
  hover:rotate-1
  transition-none
">
  <h3 className="text-2xl font-black uppercase mb-2">CARD TITLE</h3>
  <p className="text-sm font-bold text-black/70">Raw brutalist content block</p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Anti-Design 风格输入框 - 极粗黑边、蓝色聚焦态",
      code: `<input
  type="text"
  placeholder="TYPE HERE..."
  className="
    w-full px-4 py-3
    bg-white
    border-4 border-black
    rounded-none
    text-black font-black
    placeholder:text-gray-400
    focus:outline-none
    focus:bg-[#FFFF00]
    focus:border-8 focus:border-[#FF0000]
    focus:shadow-[16px_16px_0_#0000FF]
    focus:-translate-y-2 focus:rotate-1
    transition-none
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "Anti-Design 风格导航 - 白底粗黑下边框",
      code: `<nav className="
  bg-white
  border-b-4 border-black
  px-6 py-4
  flex items-center justify-between
">
  <span className="font-black text-xl uppercase">ANTI-DESIGN</span>
  <div className="flex gap-4">
    <a className="font-black text-sm uppercase hover:text-[#FF0000]">LINK</a>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description:
        "Anti-Design 风格 Hero - 黄色底、巨大倾斜黑色标题、粗边框",
      code: `<section className="
  bg-[#FFFF00]
  border-b-4 border-black
  py-20 px-6
">
  <h1 className="
    text-6xl md:text-9xl
    font-black uppercase
    text-black
    -rotate-2
  ">
    ANTI-DESIGN
  </h1>
  <p className="text-xl font-bold text-black/70 mt-4 max-w-xl">
    BREAK EVERY RULE. REJECT EVERY CONVENTION.
  </p>
</section>`,
    },
    footer: {
      name: "页脚",
      description: "Anti-Design 风格页脚 - 黑底白字粗上边框",
      code: `<footer className="
  bg-black text-white
  border-t-4 border-white
  px-6 py-8
">
  <p className="font-black text-sm uppercase">ANTI-DESIGN STUDIO</p>
</footer>`,
    },
  },

  globalCss: `/* Anti-Design Global Styles */

:root {
  --anti-black: #000000;
  --anti-white: #FFFFFF;
  --anti-red: #FF0000;
  --anti-blue: #0000FF;
  --anti-yellow: #FFFF00;
  --anti-magenta: #FF00FF;
  --anti-cyan: #00FFFF;
  --anti-green: #00FF00;
}

@keyframes anti-shake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-1deg); }
  75% { transform: rotate(1deg); }
}

@keyframes anti-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

@keyframes anti-marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

/* Thick asymmetric borders */
.anti-border-asymmetric {
  border-right-width: 6px;
  border-bottom-width: 6px;
  border-left-width: 4px;
  border-top-width: 4px;
}`,

  aiRules: `You are an Anti-Design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Rounded corners of any kind (rounded-sm, rounded-md, rounded-lg, rounded-xl, rounded-full)
- Subtle or muted colors (grays, pastels, earth tones)
- Soft shadows (shadow-sm, shadow-md, shadow-lg, shadow-xl)
- Gradients of any kind (all colors must be flat high-saturation)
- Backdrop blur or translucency effects
- Consistent spacing or alignment that looks "designed"
- Harmonious color combinations

## Must Follow

- Borders: Always 4-8px solid black. Thicker on right and bottom for depth
- Border-radius: ALWAYS 0. Never round anything
- Colors: Only high-saturation primaries - #FF0000, #0000FF, #FFFF00, #FF00FF, #00FF00, #00FFFF
- Backgrounds: Alternate between white, yellow, and other bright colors per section
- Shadows: Hard offset only (e.g., shadow-[8px_8px_0_#000]). No soft shadows
- Text: Mix sizes dramatically. Use font-black weight. Uppercase for emphasis
- Layout: Intentionally break grid alignment. Rotate elements (-3deg to 5deg)
- Fonts: Bold sans-serif. Mix sizes within sections for visual tension
- White space: Can be either very tight or exaggerated - never "just right"

## Animation & Interaction Rules

- Aggressive hover only: abrupt color collisions, border-thickness jumps, and harsh offsets
- Broken layout on interaction is encouraged: alignment can intentionally fail on hover/focus
- Zero polish: use transition-none or linear with near-zero duration; no smooth easing curves
- Focus states should be louder than default states (thicker borders, stronger shadows, rotation/shift)

## Color Palette

Primary:
- Pure Black: #000000 (borders, text, shadows)
- Pure White: #FFFFFF (backgrounds)
- Red: #FF0000 (primary accent, buttons)
- Blue: #0000FF (secondary accent, focus states)
- Yellow: #FFFF00 (section backgrounds, highlights)
- Magenta: #FF00FF (accent)
- Cyan: #00FFFF (accent)
- Green: #00FF00 (accent)

## Special Elements

- Ultra-thick borders on every element
- Hard offset shadows with no blur
- Rotated/tilted elements for visual disruption
- Dramatically mixed font sizes
- Asymmetric border widths
- Alternating high-saturation section backgrounds`,

  examplePrompts: [
    {
      title: "反设计作品集页",
      titleEn: "Anti-Design Portfolio Page",
      description: "极粗边框、冲突色彩的粗野主义作品集",
      descriptionEn:
        "Brutalist portfolio page with thick borders and clashing colors",
      prompt: `Use Anti-Design style to create a portfolio page:
1. Yellow hero section with giant rotated black uppercase title
2. White cards with border-4 border-black and hard offset shadows
3. Each card has a different primary color accent strip
4. Mix font sizes dramatically - some text huge, some tiny
5. Rotate some elements slightly for visual chaos
6. No rounded corners anywhere - everything sharp
7. Footer: black background with white text and thick border`,
    },
    {
      title: "反设计活动海报",
      titleEn: "Anti-Design Event Poster",
      description: "旋转文字和粗野排版的实验性活动页面",
      descriptionEn:
        "Experimental event page with rotated text and raw typography",
      prompt: `Use Anti-Design style to create an event poster page:
1. Alternating section backgrounds: yellow, red, blue, white
2. Giant uppercase titles with -rotate-2 to rotate-3
3. Deliberately misaligned text blocks
4. All borders 4-8px solid black
5. Hard offset shadows shadow-[8px_8px_0_#000]
6. Button row with each button a different primary color
7. Intentional visual conflict between adjacent sections`,
    },
    {
      title: "反设计产品页",
      titleEn: "Anti-Design Product Page",
      description: "打破一切UI规范的叛逆产品展示页",
      descriptionEn:
        "Rebellious product page that breaks every UI convention",
      prompt: `Use Anti-Design style to create a product page:
1. Hero: yellow background, massive tilted product name
2. Feature cards with different accent color tops (red, blue, magenta, green)
3. Rules section on blue #0000FF background with white text
4. Component showcase with buttons, inputs, all thick black borders
5. Color palette section showing flat color blocks
6. No subtle anything - maximum visual impact`,
    },
  ],
};
