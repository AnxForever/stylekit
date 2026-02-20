import { DesignStyle } from "./index";

export const retroVintage: DesignStyle = {
  slug: "retro-vintage",
  name: "复古怀旧风",
  nameEn: "Retro Vintage",
  description:
    "怀旧复古的设计风格，老式排版、复古色调、手工质感元素。适合咖啡馆、复古品牌、独立杂志、音乐厂牌。",
  cover: "/styles/retro-vintage.svg",
  styleType: "visual",
  tags: ["retro", "expressive"],
  category: "retro",
  colors: {
    primary: "#8b4513",
    secondary: "#f5e6d3",
    accent: ["#c94c4c", "#2e4a3f", "#d4a373"],
  },
  keywords: ["复古", "怀旧", "老式", "手工", "咖啡馆", "独立", "文艺"],

  philosophy: `Retro Vintage 风格从20世纪中期的设计美学中汲取灵感，通过复古排版、做旧纹理和怀旧色调创造温暖的时光感。

核心理念：
- 时光沉淀：设计带有岁月的温度和故事
- 手工温度：避免过于数字化的冷感
- 经典永恒：使用经过时间检验的设计元素
- 文化底蕴：传达历史感和文化认同`,

  doList: [
    "使用复古色调 sepia, amber, brown 系列",
    "背景添加纸张纹理或做旧效果",
    "使用 serif 字体或复古无衬线字体",
    "边框使用 border-2 或 border-4 的粗边框",
    "添加装饰性边框元素（角花、分隔线）",
    "使用老式排版风格（大写标题、字间距）",
    "图片添加做旧滤镜 sepia brightness-90",
    "Antique Stillness: zero `scale` or `translate-y` — old paper lies flat, it does not float or bounce",
    "Ink & Oxidation: hover slightly darkens background (`hover:bg-[#eedbc2]`) and deepens text (`group-hover:text-[#5c2e0a]`) — simulating paper yellowing and ink settling over decades",
    "Slow Passage of Time: all transitions use `duration-700 ease-in-out` — historical materials change slowly, never use `duration-150` or faster",
    "Corner Reveal: decorative corner ornaments use `opacity-30 group-hover:opacity-100 transition-opacity duration-700` — historical details emerge slowly as readers lean in",
  ],

  dontList: [
    "禁止使用现代渐变效果",
    "禁止使用霓虹/高饱和度颜色",
    "禁止使用极简/扁平的现代设计语言",
    "禁止使用过于圆润的圆角",
    "禁止使用玻璃态效果",
    "禁止使用动效过多的交互",
    "禁止使用任何 `scale` 或 `translate-y` 动画（Antique Stillness — 旧纸张不会浮起或弹跳）",
    "禁止使用 `duration-150` 或更快的过渡（Slow Passage — 氧化是地质过程，不是点击事件）",
    "禁止 hover 时引入新的饱和颜色（只能加深现有的复古色调，不能替换为现代色）",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Retro Vintage 风格按钮，Antique Stillness 零位移 + Slow Passage `duration-700` + Ink & Oxidation 颜色加深",
      code: `<button className="
  px-10 py-4
  bg-[#f5e6d3] text-[#8b4513]
  border-4 border-double border-[#8b4513]
  font-serif uppercase tracking-[0.2em] text-sm
  hover:bg-[#8b4513] hover:text-[#f5e6d3]
  hover:tracking-[0.25em]
  active:bg-[#5c2e0a] active:border-[#5c2e0a]
  transition-all duration-700 ease-in-out
">
  Discover History
</button>`,
    },
    card: {
      name: "卡片",
      description: "Retro Vintage 风格卡片，Corner Reveal 角落装饰缓慢显现 + Ink & Oxidation 背景氧化加深",
      code: `<div className="group bg-[#f5e6d3] border-2 border-[#8b4513]/40 p-10 relative hover:bg-[#eedbc2] hover:border-[#8b4513] transition-colors duration-700 ease-in-out cursor-default">
  {/* Corner decorations — emerge slowly on hover (Corner Reveal) */}
  <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#8b4513] opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
  <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#8b4513] opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
  <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#8b4513] opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
  <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#8b4513] opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
  <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#8b4513]/60">Chapter One</span>
  <h3 className="text-3xl font-serif text-[#8b4513] mt-4 mb-6">The Grand Archives</h3>
  <p className="text-[#8b4513]/80 leading-loose font-serif group-hover:text-[#5c2e0a] transition-colors duration-700">
    A story that spans generations, told through craftsmanship and the slow passage of time.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Retro Vintage 风格的输入框",
      code: `<div className="space-y-2">
  <label className="block text-xs font-serif uppercase tracking-[0.2em] text-[#8b4513]">Your Name</label>
  <input
    type="text"
    className="w-full px-4 py-3 bg-transparent border-2 border-[#8b4513] text-[#8b4513] font-serif placeholder:text-[#8b4513]/40 focus:outline-none focus:bg-[#8b4513]/5 transition-colors duration-200"
    placeholder="Enter your name..."
  />
</div>`,
    },
  },

  globalCss: `/* Retro Vintage Global Styles */
@layer base {
  body {
    @apply bg-[#f5e6d3] text-[#8b4513] antialiased;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
  }

  h1, h2, h3, h4 {
    @apply font-serif;
  }
}

/* Decorative divider */
.retro-divider {
  @apply flex items-center gap-4;
}
.retro-divider::before,
.retro-divider::after {
  content: '';
  @apply flex-1 h-px bg-[#8b4513]/30;
}`,

  aiRules: `STYLE: Retro Vintage
TYPE: Nostalgic, classic design aesthetic

MUST USE:
- Vintage color palette: sepia, amber, brown tones
- Paper texture or aged effects on backgrounds
- Serif fonts or vintage sans-serif
- Thick borders: border-2 or border-4
- Decorative elements (corner ornaments, dividers)
- Old-style typography: uppercase, tracking-widest
- Image filters: sepia, brightness-90

MUST AVOID:
- Modern gradients
- Neon/high saturation colors
- Minimalist/flat modern design
- Very rounded corners
- Glass morphism effects
- Heavy animations

COLOR PALETTE:
- Primary: Saddle brown (#8b4513)
- Background: Cream/Parchment (#f5e6d3)
- Accent: Rust red (#c94c4c), Forest green (#2e4a3f)

TYPOGRAPHY:
- Headings: font-serif, uppercase option
- Labels: text-xs uppercase tracking-[0.2em]
- Body: font-serif, relaxed leading

## Animation & Interaction Rules

- Antique Stillness: Absolutely zero \`scale\` or \`translate-y\` motion. Old parchment lies flat on the table — it does not float, lift, or bounce. Forbidden: \`hover:-translate-y-*\`, \`hover:scale-*\`.
- Ink & Oxidation: Hover subtly darkens the background (\`hover:bg-[#eedbc2]\`) and deepens text color (\`group-hover:text-[#5c2e0a]\`). This simulates paper yellowing and ink darkening over time — not a modern color swap.
- Slow Passage of Time: All transitions must use \`duration-700 ease-in-out\` or longer. Historical materials change slowly. Never use \`duration-150\` or faster.
- Corner Reveal: Decorative corner ornaments use \`opacity-30 group-hover:opacity-100 transition-opacity duration-700\` — as if readers discover hidden details by leaning in closely.`,

  examplePrompts: [
    {
      title: "咖啡馆网站",
      titleEn: "Coffee Shop Website",
      description: "生成复古咖啡馆网站",
      descriptionEn: "Generate vintage coffee shop website",
      prompt: `Create a coffee shop website using Retro Vintage style:
- Hero with sepia-toned coffee imagery
- Menu section with decorative borders
- About us with vintage typography
- Contact with old-style form styling
- Paper texture backgrounds
- Ornamental corner decorations
- Serif fonts throughout`,
    },
  ],
};
