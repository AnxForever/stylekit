import type { DesignStyle } from "./types";

export const zenGarden: DesignStyle = {
  slug: "zen-garden",
  name: "枯山水",
  nameEn: "Zen Garden",
  description:
    "日本枯山水庭园的数字化诠释，以砂纹、石组、苔藓为灵感，追求极致静谧与冥想感。沙白与苔绿的搭配传递出自然之道的宁静力量。",
  descriptionEn:
    "A digital interpretation of Japanese Karesansui dry landscape gardens, inspired by raked sand patterns, stone arrangements, and moss, pursuing ultimate tranquility and meditative calm. The pairing of sand white and moss green conveys the serene power of nature.",
  cover: "/styles/zen-garden.svg",
  styleType: "visual",
  tags: [],
  category: "minimal",
  colors: {
    primary: "#4a5548",
    secondary: "#f5f3ee",
    accent: ["#8a9a7b", "#c4bba8", "#7a7062", "#799d91"],
  },
  keywords: ["枯山水", "日式", "禅", "砂纹", "石组", "苔藓", "冥想", "庭园", "karesansui"],
  keywordsEn: ["zen garden", "karesansui", "Japanese zen design", "dry landscape garden", "raked sand pattern", "Japanese minimalism", "wabi-sabi", "meditation app design", "tranquil ui", "moss green palette", "zen aesthetic"],

  philosophy: `枯山水（Karesansui）是日本禅宗庭园的最高表现形式。

核心理念：
- 以砂代水：白砂上的纹路象征水面的涟漪与波纹，无水却见水
- 石组之美：精心放置的石组代表山岳与岛屿，以少胜多
- 苔藓之生：苔绿是时间沉淀的痕迹，是静中有动的生命力
- 冥想之境：整座庭园是一个供人静观、内省的空间
- 借景与留白：将周围自然纳入构图，空间本身即是表达

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Karesansui (Zen Garden) is the highest expression of Japanese Zen Buddhist garden art.

Core principles:
- Sand as water: patterns raked in white sand symbolize ripples and waves on water -- waterless yet water is seen
- Beauty of stone arrangements: carefully placed stone groups represent mountains and islands, achieving more with less
- Life of moss: moss green is the trace of time's passage, a vitality of stillness in motion
- Realm of meditation: the entire garden is a space for quiet contemplation and introspection
- Borrowed scenery and whitespace: incorporating surrounding nature into the composition, where space itself is expression`,

  doList: [
    "使用沙白色背景 bg-[#f5f3ee]",
    "苔藓绿作为重点色 text-[#8a9a7b]",
    "极致留白，慷慨的垂直间距 py-32",
    "纤细自然的边框 border-[#c4bba8]/30",
    "衬线字体搭配轻字重 font-serif font-light",
    "非常缓慢的过渡动画 transition duration-700",
  ],

  doListEn: [
    "Use sand-white backgrounds bg-[#f5f3ee]",
    "Moss green as accent color text-[#8a9a7b]",
    "Extreme whitespace with generous vertical spacing py-32",
    "Delicate natural borders border-[#c4bba8]/30",
    "Serif fonts with light weight font-serif font-light",
    "Very slow transition animations transition duration-700",
  ],

  dontList: [
    "禁止使用明亮鲜艳的色彩",
    "禁止使用厚重边框和粗线条",
    "禁止使用快速动画和弹跳效果",
    "禁止密集排列元素，留白是核心",
  ],

  dontListEn: [
    "Do not use bright vivid colors",
    "Do not use heavy borders or thick lines",
    "Do not use fast animations or bounce effects",
    "Do not densely arrange elements -- whitespace is the core",
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

  examplePrompts: [
    {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 枯山水风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Zen Garden style",
      prompt: `Create a SaaS landing page using Zen Garden style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 枯山水风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Zen Garden style",
      prompt: `Create a portfolio showcase page using Zen Garden style with project grid, about section, contact form, and consistent visual language.`,
    },
  ],

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
}
@keyframes zen-garden-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes zen-garden-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.zen-garden-card {
  position: relative;
  overflow: hidden;
}

.zen-garden-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(74, 85, 72, 0.05), transparent);
  pointer-events: none;
}

.zen-garden-card:hover::before {
  opacity: 1;
}

.zen-garden-gradient {
  background: linear-gradient(135deg, #4a5548, #8a9a7b);
}

.zen-garden-gradient-text {
  background: linear-gradient(135deg, #4a5548, #8a9a7b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.zen-garden-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(74, 85, 72, 0.08);
}

.zen-garden-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.zen-garden-animate-in {
  animation: zen-garden-fade-in 0.5s ease-out both;
}

.zen-garden-focus { outline: 2px solid var(--zen-garden-primary, currentColor); outline-offset: 2px; }

/* Responsive utilities */
@media (prefers-reduced-motion: reduce) {
  .zen-garden-animate-in {
    animation: none;
  }
}

@media (min-width: 768px) {
  .zen-garden-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
}

/* Print styles */
@media print {
  .zen-garden-gradient,
  .zen-garden-frosted {
    background: none;
    backdrop-filter: none;
  }
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

  aiRulesEn: `You are designing in Zen Garden (Karesansui) style.
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
- Meditative Slowness: Interactions must be slow and restrained, using duration-700 to duration-1000 with ease-in-out.
- Zero Displacement: No translate or rotate allowed; avoid any physical displacement animations. Focus should be expressed through show/hide and tonal changes.
- Ephemeral Fades: Use only low-contrast color deepening, opacity emergence, or very faint shadow fade-ins. No bouncing or high-contrast flashing.
- Quiet Focus: Text can default to semi-transparent (e.g., text-[#4a5548]/70), slowly becoming clear on hover/focus, maintaining a meditative rhythm.`,

  variants: [
    {
      id: "zen-garden-warm",
      name: "枯山水暖色版",
      nameEn: "Zen Garden Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#46564d",
        secondary: "#f6f4f0",
        accent: ["#7f9c84", "#b9bea6", "#717360"],
      },
    },
    {
      id: "zen-garden-cool",
      name: "枯山水冷色版",
      nameEn: "Zen Garden Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#505445",
        secondary: "#dddbd6",
        accent: ["#989679", "#cdb8af", "#806d68"],
      },
    },
  ],
};
