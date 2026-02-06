import { DesignStyle } from "./index";

export const naturalOrganic: DesignStyle = {
  slug: "natural-organic",
  name: "自然有机风",
  nameEn: "Natural Organic",
  description:
    "温暖自然的有机风格，大地色系、自然纹理、手工感元素。适合健康品牌、有机食品、环保产品、手工艺品。",
  cover: "/styles/natural-organic.svg",
  styleType: "visual",
  tags: ["minimal", "modern"],
  category: "minimal",
  colors: {
    primary: "#5c4033",
    secondary: "#faf6f1",
    accent: ["#8b9d77", "#d4a373", "#e9e0d4"],
  },
  keywords: ["自然", "有机", "大地色", "手工", "健康", "环保", "可持续"],

  philosophy: `Natural Organic 风格从自然界汲取灵感，通过大地色系、有机形状和自然纹理创造温暖亲切的体验。

核心理念：
- 自然和谐：色彩和形状来自自然界
- 温暖亲切：让用户感到舒适和信任
- 手工质感：避免过于工业化的冷感
- 可持续美学：简约但不冷淡`,

  doList: [
    "使用大地色系 amber, stone, olive, sage",
    "背景使用温暖的米色 bg-[#faf6f1], bg-amber-50",
    "使用不规则圆角 rounded-[2rem] 或 blob 形状",
    "添加纸张/织物纹理 (可通过 CSS 或 SVG)",
    "使用手写风格或衬线字体",
    "按钮使用柔和的过渡 hover:bg-stone-200",
    "图片使用自然/有机/手工内容",
  ],

  dontList: [
    "禁止使用冷色调（蓝、紫除非作为辅助）",
    "禁止使用纯黑 #000000",
    "禁止使用尖锐的几何形状",
    "禁止使用高科技感的设计元素",
    "禁止使用霓虹/高饱和度颜色",
    "禁止使用完美的圆形/矩形",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Natural Organic 风格的按钮",
      code: `// Primary Button
<button className="px-6 py-3 bg-stone-800 text-stone-50 rounded-full hover:bg-stone-700 transition-colors duration-300 font-medium">
  Shop Now
</button>

// Secondary Button
<button className="px-6 py-3 bg-transparent text-stone-800 border border-stone-300 rounded-full hover:bg-stone-100 hover:border-stone-400 transition-all duration-300 font-medium">
  Learn More
</button>

// Earthy Accent
<button className="px-6 py-3 bg-[#8b9d77] text-white rounded-full hover:bg-[#7a8c66] transition-colors duration-300 font-medium">
  Subscribe
</button>`,
    },
    card: {
      name: "卡片",
      description: "Natural Organic 风格的卡片",
      code: `<div className="bg-[#faf6f1] rounded-[2rem] p-8 border border-stone-200 hover:border-stone-300 transition-colors duration-300">
  <div className="w-16 h-16 bg-[#8b9d77]/20 rounded-full flex items-center justify-center mb-6">
    <Leaf className="w-8 h-8 text-[#8b9d77]" />
  </div>
  <h3 className="text-xl font-serif text-stone-800 mb-3">Organic Ingredients</h3>
  <p className="text-stone-600 leading-relaxed">
    Sourced from sustainable farms that care for the earth.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Natural Organic 风格的输入框",
      code: `<div className="space-y-2">
  <label className="block text-sm font-medium text-stone-700">Your Email</label>
  <input
    type="email"
    className="w-full px-5 py-3 bg-white border border-stone-200 rounded-full text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200 transition-all duration-300"
    placeholder="hello@example.com"
  />
</div>`,
    },
  },

  globalCss: `/* Natural Organic Global Styles */
@layer base {
  body {
    @apply bg-[#faf6f1] text-stone-800 antialiased;
  }

  h1, h2, h3, h4 {
    @apply font-serif;
  }
}

/* Optional paper texture overlay */
.organic-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
}`,

  aiRules: `STYLE: Natural Organic
TYPE: Warm, earthy, nature-inspired design

MUST USE:
- Earth tones: stone, amber, olive, sage colors
- Warm background: bg-[#faf6f1], bg-amber-50
- Organic shapes: rounded-full, rounded-[2rem], blob shapes
- Serif fonts for headings: font-serif
- Soft transitions: transition-colors duration-300
- Natural imagery and icons (leaves, plants, earth)

MUST AVOID:
- Cold colors (blue, purple as primary)
- Pure black (#000000)
- Sharp geometric shapes
- High-tech design elements
- Neon/high saturation colors
- Perfect circles/rectangles

COLOR PALETTE:
- Primary: Stone/Brown (#5c4033)
- Background: Warm cream (#faf6f1)
- Accent: Sage green (#8b9d77)
- Secondary: Warm tan (#d4a373)

TYPOGRAPHY:
- Headings: font-serif, tracking-tight
- Body: font-sans, stone-600
- Comfortable line-height`,

  examplePrompts: [
    {
      title: "有机品牌",
      titleEn: "Organic Brand Site",
      description: "生成有机食品品牌网站",
      descriptionEn: "Generate organic food brand website",
      prompt: `Create an organic brand website using Natural Organic style:
- Hero with large product image on cream background
- Feature cards with organic shapes and sage green accents
- Testimonials with hand-drawn style elements
- Newsletter signup with rounded-full input
- Footer with earth-tone color blocks
- Font-serif for headings, warm color palette`,
    },
  ],
};
