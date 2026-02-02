import { DesignStyle } from "./index";

export const geometricBold: DesignStyle = {
  slug: "geometric-bold",
  name: "几何大胆风",
  nameEn: "Geometric Bold",
  description:
    "大胆的几何图形设计，强烈的形状对比、鲜明的色块、动态的构图。适合艺术展览、设计机构、创意品牌。",
  cover: "/styles/geometric-bold.png",
  styleType: "visual",
  tags: ["expressive", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: ["#ff0000", "#0000ff", "#ffff00"],
  },
  keywords: ["几何", "大胆", "色块", "艺术", "创意", "设计", "先锋"],

  philosophy: `Geometric Bold 风格受包豪斯和构成主义艺术的影响，通过简单但强烈的几何形状创造视觉冲击。

核心理念：
- 形状优先：几何形状是设计的核心语言
- 大胆对比：强烈的颜色和形状对比
- 动态平衡：通过不对称创造视觉张力
- 艺术表达：每个页面都是一件艺术品`,

  doList: [
    "使用纯色色块 bg-black, bg-white, bg-red-500, bg-blue-600",
    "使用规则几何形状 circle, square, triangle",
    "大胆使用超大字体 text-6xl, text-8xl, text-[10rem]",
    "使用 absolute 定位创造重叠效果",
    "边角使用 rounded-none 或 rounded-full",
    "使用 rotate-* 旋转元素增加动态感",
    "黑白为主，一到两种强调色",
  ],

  dontList: [
    "禁止使用渐变色",
    "禁止使用柔和/低对比度的颜色",
    "禁止使用 rounded-lg 等中间值圆角",
    "禁止使用阴影效果",
    "禁止过多颜色（最多3-4种）",
    "禁止对称/常规的布局",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Geometric Bold 风格的按钮",
      code: `// Primary Button - Square
<button className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-red-500 transition-colors duration-200">
  Explore
</button>

// Circle Button
<button className="w-24 h-24 bg-blue-600 text-white rounded-full font-bold uppercase text-xs tracking-widest hover:bg-black transition-colors duration-200">
  Click
</button>

// Outlined Button
<button className="px-8 py-4 bg-white text-black border-4 border-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-200">
  View Work
</button>`,
    },
    card: {
      name: "卡片",
      description: "Geometric Bold 风格的卡片",
      code: `<div className="relative bg-white border-4 border-black p-8 group">
  {/* Decorative shape */}
  <div className="absolute -top-6 -right-6 w-12 h-12 bg-red-500 rotate-45 group-hover:rotate-90 transition-transform duration-300" />

  <span className="text-xs font-bold uppercase tracking-[0.3em]">01</span>
  <h3 className="text-3xl font-black uppercase mt-2 mb-4">Project Name</h3>
  <p className="text-gray-600 leading-relaxed">
    Bold geometric design with strong visual impact.
  </p>

  {/* Bottom accent */}
  <div className="absolute bottom-0 left-0 w-full h-2 bg-black" />
</div>`,
    },
    input: {
      name: "输入框",
      description: "Geometric Bold 风格的输入框",
      code: `<div className="space-y-2">
  <label className="block text-xs font-bold uppercase tracking-[0.3em]">Email</label>
  <input
    type="email"
    className="w-full px-4 py-4 bg-white border-4 border-black text-black font-medium placeholder:text-gray-400 focus:outline-none focus:bg-yellow-300 transition-colors duration-200"
    placeholder="YOUR@EMAIL.COM"
  />
</div>`,
    },
  },

  globalCss: `/* Geometric Bold Global Styles */
@layer base {
  body {
    @apply bg-white text-black antialiased;
  }

  h1, h2, h3 {
    @apply font-black uppercase tracking-tight;
  }

  ::selection {
    @apply bg-black text-white;
  }
}

/* Geometric shape utilities */
.shape-circle {
  @apply rounded-full;
}

.shape-square {
  @apply rounded-none aspect-square;
}`,

  aiRules: `STYLE: Geometric Bold
TYPE: Bold artistic design with strong shapes

MUST USE:
- Solid color blocks: bg-black, bg-white, bg-red-500, bg-blue-600
- Regular geometric shapes: circles, squares, triangles
- Large typography: text-6xl, text-8xl, text-[10rem]
- Absolute positioning for overlapping elements
- Corners: rounded-none OR rounded-full only
- Rotation for dynamics: rotate-12, rotate-45
- Limited palette: black, white + 1-2 accent colors

MUST AVOID:
- Gradients
- Soft/low contrast colors
- Medium border-radius (rounded-lg)
- Shadows
- Too many colors (max 3-4)
- Symmetrical/conventional layouts

COLOR RULES:
- Base: Black and White
- Accents: Primary colors (red, blue, yellow)
- Maximum 3-4 colors per design

TYPOGRAPHY:
- Headings: font-black uppercase
- Labels: text-xs tracking-[0.3em]
- Numbers: Often used as design elements`,

  examplePrompts: [
    {
      title: "设计作品集",
      titleEn: "Design Agency Portfolio",
      description: "生成几何风设计机构作品集",
      descriptionEn: "Generate geometric design agency portfolio",
      prompt: `Create a design agency portfolio using Geometric Bold style:
- Full-bleed hero with oversized typography
- Project grid with overlapping shapes
- About section with bold number accents
- Contact with geometric form fields
- Black/white base with red/blue accents
- Rotating/offset decorative shapes
- No shadows, no gradients`,
    },
  ],
};
