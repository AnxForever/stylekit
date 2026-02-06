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
  ],

  dontList: [
    "禁止使用现代渐变效果",
    "禁止使用霓虹/高饱和度颜色",
    "禁止使用极简/扁平的现代设计语言",
    "禁止使用过于圆润的圆角",
    "禁止使用玻璃态效果",
    "禁止使用动效过多的交互",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Retro Vintage 风格的按钮",
      code: `// Primary Button
<button className="px-6 py-3 bg-[#8b4513] text-[#f5e6d3] border-2 border-[#5c2e0a] font-serif uppercase tracking-widest text-sm hover:bg-[#5c2e0a] transition-colors duration-200">
  Discover More
</button>

// Outlined Button
<button className="px-6 py-3 bg-transparent text-[#8b4513] border-2 border-[#8b4513] font-serif uppercase tracking-widest text-sm hover:bg-[#8b4513] hover:text-[#f5e6d3] transition-colors duration-200">
  Read Story
</button>

// Badge Style
<button className="px-8 py-4 bg-[#f5e6d3] text-[#8b4513] border-4 border-double border-[#8b4513] font-serif uppercase tracking-[0.3em] text-xs hover:bg-[#8b4513] hover:text-[#f5e6d3] transition-colors duration-300">
  Est. 1965
</button>`,
    },
    card: {
      name: "卡片",
      description: "Retro Vintage 风格的卡片",
      code: `<div className="bg-[#f5e6d3] border-2 border-[#8b4513] p-8 relative">
  {/* Decorative corners */}
  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#8b4513]" />
  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#8b4513]" />
  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#8b4513]" />
  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#8b4513]" />

  <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#8b4513]/60">Chapter One</span>
  <h3 className="text-2xl font-serif text-[#8b4513] mt-2 mb-4">The Beginning</h3>
  <p className="text-[#8b4513]/80 leading-relaxed font-serif">
    A story that spans generations, told through craftsmanship and tradition.
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
- Body: font-serif, relaxed leading`,

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
