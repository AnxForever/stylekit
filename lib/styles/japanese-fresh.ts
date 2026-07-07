import type { DesignStyle } from "./types";

export const japaneseFresh: DesignStyle = {
  slug: "japanese-fresh",
  name: "日系清新风",
  nameEn: "Japanese Fresh",
  description:
    "以Ma (间) 留白哲学、侘寂美学和极致呼吸感为核心，通过发丝级边框、植物线描装饰和极简温暖中性色，营造沉静治愈的设计体验。",
  descriptionEn:
    "Centered on Ma (space) philosophy, wabi-sabi aesthetics, and extreme breathing room, using hairline borders, botanical line-drawing accents, and minimal warm neutral colors to create a serene, healing design experience.",
  cover: "/styles/japanese-fresh.svg",
  styleType: "visual",
  tags: [],
  category: "minimal",
  colors: {
    primary: "#64b5f6",
    secondary: "#fafaf8",
    accent: ["#98d8c8", "#ffb7c5", "#b8d4e3", "#b0cdf3"],
  },
  keywords: ["Ma", "侘寂", "留白", "发丝边框", "植物线描", "呼吸感", "minimal", "clean", "simple", "极简"],

  philosophy: `Japanese Fresh embodies Ma (space between) and wabi-sabi (beauty in imperfection). Design is not about what you add, but what you allow to breathe.

Core principles:
- Ma (間): Intentional, generous whitespace is the primary design element. Sections use py-32+ to create profound breathing room between content
- Wabi-sabi: Embrace subtle imperfection -- asymmetric layouts, slightly off-center elements, and organic rather than rigid alignment
- Hairline Borders: All borders are 0.5-1px maximum, using warm neutral colors like #d4d4cf at 30-40% opacity
- Natural Textures: Subtle linen/paper grain texture backgrounds reference natural materials (washi paper, unbleached cotton)
- Botanical Accents: Single delicate line-drawn botanical SVG elements per section -- one branch, one leaf, never crowded
- Bottom-line Inputs: Inputs use only a bottom border line, floating labels, no surrounding frame
- No Shadows: Forms exist without shadow; they float in whitespace by their own presence`,

  philosophyEn: `Japanese Fresh embodies Ma (space between) and wabi-sabi (beauty in imperfection). Design is not about what you add, but what you allow to breathe.

Core principles:
- Ma: Intentional, generous whitespace is the primary design element. Sections use py-32+ to create profound breathing room between content
- Wabi-sabi: Embrace subtle imperfection -- asymmetric layouts, slightly off-center elements, and organic rather than rigid alignment
- Hairline Borders: All borders are 0.5-1px maximum, using warm neutral colors like #d4d4cf at 30-40% opacity
- Natural Textures: Subtle linen/paper grain texture backgrounds reference natural materials (washi paper, unbleached cotton)
- Botanical Accents: Single delicate line-drawn botanical SVG elements per section -- one branch, one leaf, never crowded
- Bottom-line Inputs: Inputs use only a bottom border line, floating labels, no surrounding frame
- No Shadows: Forms exist without shadow; they float in whitespace by their own presence`,

  doList: [
    "Use extreme whitespace (py-32, py-40) between sections -- Ma is the primary design tool",
    "Use only hairline borders (border with opacity-30, never border-2)",
    "Include one delicate botanical SVG line drawing per major section",
    "Use font-extralight/font-light exclusively for all text",
    "Keep inputs as bottom-line only with floating labels",
    "Use warm neutral border color #d4d4cf instead of harsh gray",
    "Apply asymmetric element placement for wabi-sabi character",
    "Use transition duration-500 for slow, meditative interactions",
    "Use weightless hover feedback (subtle lift + transparent tint) instead of heavy depth",
  ],

  doListEn: [
    "Use extreme whitespace (py-32, py-40) between sections -- Ma is the primary design tool",
    "Use only hairline borders (border with opacity-30, never border-2)",
    "Include one delicate botanical SVG line drawing per major section",
    "Use font-extralight/font-light exclusively for all text",
    "Keep inputs as bottom-line only with floating labels",
    "Use warm neutral border color #d4d4cf instead of harsh gray",
    "Apply asymmetric element placement for wabi-sabi character",
    "Use transition duration-500 for slow, meditative interactions",
    "Use weightless hover feedback (subtle lift + transparent tint) instead of heavy depth",
  ],

  dontList: [
    "Never use bold or heavy font weights (font-bold, font-semibold)",
    "Never use uppercase text -- it is too aggressive for this aesthetic",
    "Never use border-2 or thicker -- only hairline borders",
    "Never use visible shadows (shadow-lg/xl) -- elements float without weight",
    "Never use dark or black backgrounds",
    "Never use sharp corners (rounded-none) -- always gentle rounded-lg/xl",
    "Never crowd sections together -- maintain extreme breathing room",
    "Never use fast, abrupt interaction transitions under 200ms",
  ],

  dontListEn: [
    "Never use bold or heavy font weights (font-bold, font-semibold)",
    "Never use uppercase text -- it is too aggressive for this aesthetic",
    "Never use border-2 or thicker -- only hairline borders",
    "Never use visible shadows (shadow-lg/xl) -- elements float without weight",
    "Never use dark or black backgrounds",
    "Never use sharp corners (rounded-none) -- always gentle rounded-lg/xl",
    "Never crowd sections together -- maintain extreme breathing room",
    "Never use fast, abrupt interaction transitions under 200ms",
  ],

  components: {
    button: {
      name: "Whisper Button",
      description: "Button with hairline border, huge padding, and barely-visible hover state",
      code: `<button className="
  px-10 py-3
  bg-transparent text-[#7a8a9e]
  font-sans font-light tracking-widest text-sm
  rounded-lg
  border border-[#d4d4cf]/40
  hover:-translate-y-0.5
  hover:bg-[#64b5f6]/5
  hover:border-[#64b5f6]/40 hover:text-[#64b5f6]
  active:bg-[#64b5f6]/10
  transition-all duration-500 ease-in-out
">
  Explore
</button>`,
    },
    card: {
      name: "Breath Card",
      description: "Card with 0.5px warm gray border, massive inner whitespace, and botanical accent",
      code: `<div className="
  group p-10 md:p-12
  bg-white
  rounded-lg
  border border-[#d4d4cf]/30
  hover:-translate-y-0.5
  hover:bg-[#64b5f6]/[0.02]
  hover:border-[#d4d4cf]/50
  transition-all duration-500 ease-in-out
">
  <h3 className="text-lg font-sans font-extralight text-[#4a5568] mb-4 tracking-widest group-hover:text-[#64b5f6] transition-colors duration-500">
    Morning Light
  </h3>
  <p className="text-[#b0b8c4] text-sm font-light leading-relaxed group-hover:text-[#7a8a9e] transition-colors duration-500">
    Gentle and simple, like morning light filtering through paper screens.
  </p>
</div>`,
    },
    input: {
      name: "Bottom-line Input",
      description: "Input with bottom border only, floating label style, and ultra-subtle focus",
      code: `<div className="relative pt-4">
  <input
    type="text"
    placeholder=" "
    className="
      w-full pb-2 pt-0
      bg-transparent
      border-b border-[#d4d4cf]
      text-[#4a5568]
      font-sans font-light
      focus:border-[#64b5f6]
      focus:outline-none
      transition-all duration-500
      peer
    "
  />
  <label className="absolute top-0 left-0 text-xs font-light text-[#b0b8c4] tracking-wide peer-focus:text-[#64b5f6] transition-all duration-500">
    Your name
  </label>
</div>`,
    },
    hero: {
      name: "Ma Hero",
      description: "Hero section with extreme whitespace, single botanical SVG, and light typography",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#fafaf8]
  relative overflow-hidden
">
  <svg className="absolute left-12 bottom-24 w-32 h-64 opacity-[0.12]" viewBox="0 0 100 200" fill="none" stroke="#a0aec0" strokeWidth="0.8">
    <path d="M50 200 C50 160, 55 120, 58 80 C60 60, 55 40, 58 20"/>
    <path d="M58 80 C70 75, 80 65, 85 58 C78 68, 68 76, 58 80"/>
    <path d="M56 50 C44 42, 36 32, 30 24 C38 34, 46 44, 56 50"/>
  </svg>
  <div className="relative z-10 text-center px-8 max-w-xl">
    <h1 className="text-4xl md:text-6xl font-sans font-extralight text-[#4a5568] mb-6 tracking-wide">
      Japanese Fresh
    </h1>
    <p className="text-base text-[#b0b8c4] font-light leading-loose mb-16">
      the beauty of empty space
    </p>
    <button className="px-12 py-3 bg-transparent text-[#7a8a9e] font-light tracking-wide rounded-lg border border-[#d4d4cf]/40 hover:border-[#64b5f6]/40 hover:text-[#64b5f6] transition-all duration-500">
      Begin
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Japanese Fresh Global Styles */

:root {
  --jf-sky: #64b5f6;
  --jf-rice: #fafaf8;
  --jf-mint: #98d8c8;
  --jf-pink: #ffb7c5;
  --jf-powder: #b8d4e3;
  --jf-text: #4a5568;
  --jf-muted: #b0b8c4;
  --jf-border: #d4d4cf;
}

/* Linen paper texture */
.jf-linen {
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='6' height='6' fill='%23fafaf8'/%3E%3Crect x='0' y='0' width='1' height='1' fill='%23e8e8e4' opacity='0.12'/%3E%3Crect x='3' y='3' width='1' height='1' fill='%23e8e8e4' opacity='0.08'/%3E%3C/svg%3E");
}

/* Hairline divider */
.jf-divider {
  height: 0.5px;
  background: var(--jf-border);
  opacity: 0.4;
}

/* Bottom-line input focus */
.jf-input-underline {
  border: none;
  border-bottom: 1px solid var(--jf-border);
  border-radius: 0;
  background: transparent;
}
.jf-input-underline:focus {
  border-bottom-color: var(--jf-sky);
  box-shadow: none;
  outline: none;
}

/* Ma-based section spacing */
.jf-ma-section {
  padding-top: 8rem;
  padding-bottom: 8rem;
}

/* Botanical SVG accent */
.jf-botanical {
  opacity: 0.12;
  stroke: var(--jf-muted);
  fill: none;
  stroke-width: 0.7;
}
@keyframes japanese-fresh-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes japanese-fresh-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.japanese-fresh-card {
  position: relative;
  overflow: hidden;
}

.japanese-fresh-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(100, 181, 246, 0.05), transparent);
  pointer-events: none;
}

.japanese-fresh-card:hover::before {
  opacity: 1;
}

.japanese-fresh-gradient {
  background: linear-gradient(135deg, #64b5f6, #98d8c8);
}

.japanese-fresh-gradient-text {
  background: linear-gradient(135deg, #64b5f6, #98d8c8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.japanese-fresh-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(100, 181, 246, 0.08);
}

.japanese-fresh-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.japanese-fresh-animate-in {
  animation: japanese-fresh-fade-in 0.5s ease-out both;
}`,

  aiRules: `You are a Japanese Fresh design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Heavy borders (border-2 or thicker)
- Neon or high-saturation colors
- Dark or black backgrounds
- Bold/heavy font weights (font-bold, font-semibold, font-black)
- Sharp corners (rounded-none, rounded-sm)
- Uppercase text
- Visible shadows (shadow-lg, shadow-xl)
- Crowded layouts without extreme whitespace

## Must Follow

- Rice-white background: bg-[#fafaf8] with optional linen texture
- Ma-based extreme whitespace: py-32+ between sections (this is THE core principle)
- Hairline borders only: border with opacity-30/40, warm neutral #d4d4cf
- Font weight: font-extralight or font-light exclusively
- Single botanical SVG line drawing accent per section
- Bottom-line only inputs with floating labels
- No shadows anywhere -- forms float in whitespace
- Slow transitions: duration-500 for meditative feel
- Warm neutral colors: #d4d4cf borders, #b0b8c4 muted text

## Color Palette

Primary:
- Sky Blue: #64b5f6
- Rice White: #fafaf8
- Mint Green: #98d8c8
- Gentle Pink: #ffb7c5
- Powder Blue: #b8d4e3
- Text: #4a5568
- Secondary text: #7a8a9e
- Muted: #b0b8c4
- Border: #d4d4cf

## Unique Elements

- Ma-based extreme whitespace (py-32+ sections)
- Hairline 0.5px borders at 30% opacity
- Botanical line-drawing SVG accents (one per section)
- Bottom-line only input fields with floating labels
- Linen/paper texture background pattern

## Animation & Interaction Rules

- Weightless Float: hover 仅允许极轻上浮（约 0.5px），避免重阴影和大位移。
- Airy Transitions: 颜色变化采用 duration-500 + ease-in-out，像晨雾中缓慢显现。
- Subtle Focus: 表单 focus 只调整发丝级边框颜色，不使用粗 ring 或强 glow。
- Tactile Click: active 态优先微调透明度和背景层，不使用明显缩放。`,

  aiRulesEn: `You are a Japanese Fresh design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Heavy borders (border-2 or thicker)
- Neon or high-saturation colors
- Dark or black backgrounds
- Bold/heavy font weights (font-bold, font-semibold, font-black)
- Sharp corners (rounded-none, rounded-sm)
- Uppercase text
- Visible shadows (shadow-lg, shadow-xl)
- Crowded layouts without extreme whitespace

## Must Follow

- Rice-white background: bg-[#fafaf8] with optional linen texture
- Ma-based extreme whitespace: py-32+ between sections (this is THE core principle)
- Hairline borders only: border with opacity-30/40, warm neutral #d4d4cf
- Font weight: font-extralight or font-light exclusively
- Single botanical SVG line drawing accent per section
- Bottom-line only inputs with floating labels
- No shadows anywhere -- forms float in whitespace
- Slow transitions: duration-500 for meditative feel
- Warm neutral colors: #d4d4cf borders, #b0b8c4 muted text

## Color Palette

Primary:
- Sky Blue: #64b5f6
- Rice White: #fafaf8
- Mint Green: #98d8c8
- Gentle Pink: #ffb7c5
- Powder Blue: #b8d4e3
- Text: #4a5568
- Secondary text: #7a8a9e
- Muted: #b0b8c4
- Border: #d4d4cf

## Unique Elements

- Ma-based extreme whitespace (py-32+ sections)
- Hairline 0.5px borders at 30% opacity
- Botanical line-drawing SVG accents (one per section)
- Bottom-line only input fields with floating labels
- Linen/paper texture background pattern

## Animation & Interaction Rules

- Weightless Float: Hover allows only extremely light upward float (about 0.5px), avoiding heavy shadows and large displacement.
- Airy Transitions: Color changes use duration-500 + ease-in-out, appearing slowly like morning mist.
- Subtle Focus: Form focus only adjusts hairline border color, no thick rings or strong glow.
- Tactile Click: Active state prioritizes subtle opacity and background layer adjustments, no obvious scaling.`,

  examplePrompts: [
    {
      title: "静谧日记",
      titleEn: "Quiet Journal",
      description: "极致留白的个人日记页面",
      descriptionEn: "Journal page with extreme whitespace and botanical accents",
      prompt: `Use Japanese Fresh style to create a personal journal page:
1. Background: rice-white (#fafaf8) with subtle linen texture
2. Extreme whitespace between all sections (py-32+)
3. Hairline borders only (0.5px warm gray)
4. One delicate botanical line drawing SVG accent
5. Bottom-line inputs, no shadows, font-extralight throughout`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 日系清新风风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Japanese Fresh style",
      prompt: `Create a SaaS landing page using Japanese Fresh style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 日系清新风风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Japanese Fresh style",
      prompt: `Create a portfolio showcase page using Japanese Fresh style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "japanese-fresh-warm",
      name: "日系清新风暖色版",
      nameEn: "Japanese Fresh Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#94a4ff",
        secondary: "#fbfbf9",
        accent: ["#9ed4e1", "#f6bca9", "#c5cfec"],
      },
    },
    {
      id: "japanese-fresh-cool",
      name: "日系清新风冷色版",
      nameEn: "Japanese Fresh Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#46c2c9",
        secondary: "#e1e1df",
        accent: ["#9fd8b0", "#f9b6e1", "#b1d7d5"],
      },
    },
  ],
};
