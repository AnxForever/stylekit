import { DesignStyle } from "./index";

export const geometricBold: DesignStyle = {
  slug: "geometric-bold",
  name: "几何大胆风",
  nameEn: "Geometric Bold",
  description:
    "大胆的几何图形设计，强烈的形状对比、鲜明的色块、动态的构图。适合艺术展览、设计机构、创意品牌。",
  descriptionEn:
    "Bold geometric design with strong shape contrasts, vivid color blocks, and dynamic compositions. Ideal for art exhibitions, design agencies, and creative brands.",
  cover: "/styles/geometric-bold.svg",
  styleType: "visual",
  tags: ["expressive", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: ["#ff0000", "#0000ff", "#ffff00", "#6c3b00"],
  },
  keywords: ["几何", "大胆", "色块", "艺术", "创意", "设计", "先锋", "expressive", "bold", "vibrant"],

  philosophy: `Geometric Bold 风格受包豪斯和构成主义艺术的影响，通过简单但强烈的几何形状创造视觉冲击。

核心理念：
- 形状优先：几何形状是设计的核心语言
- 大胆对比：强烈的颜色和形状对比
- 动态平衡：通过不对称创造视觉张力
- 艺术表达：每个页面都是一件艺术品

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Geometric Bold style is influenced by Bauhaus and Constructivist art, creating visual impact through simple yet powerful geometric shapes.

Core principles:
- Shape first: Geometric shapes are the core design language
- Bold contrast: Strong color and shape contrasts
- Dynamic balance: Create visual tension through asymmetry
- Artistic expression: Every page is a work of art`,

  doList: [
    "使用纯色色块 bg-black, bg-white, bg-red-500, bg-blue-600",
    "使用规则几何形状 circle, square, triangle",
    "大胆使用超大字体 text-6xl, text-8xl, text-[10rem]",
    "使用 absolute 定位创造重叠效果",
    "边角使用 rounded-none 或 rounded-full",
    "使用 rotate-* 旋转元素增加动态感",
    "黑白为主，一到两种强调色",
  ],

  doListEn: [
    "Use solid color blocks bg-black, bg-white, bg-red-500, bg-blue-600",
    "Use regular geometric shapes circle, square, triangle",
    "Boldly use oversized typography text-6xl, text-8xl, text-[10rem]",
    "Use absolute positioning to create overlapping effects",
    "Corners use rounded-none or rounded-full",
    "Use rotate-* to rotate elements for dynamic feel",
    "Black and white primary, one to two accent colors",
  ],

  dontList: [
    "禁止使用渐变色",
    "禁止使用柔和/低对比度的颜色",
    "禁止使用 rounded-lg 等中间值圆角",
    "禁止使用阴影效果",
    "禁止过多颜色（最多3-4种）",
    "禁止对称/常规的布局",
  ],

  dontListEn: [
    "Do not use gradient colors",
    "Do not use soft/low-contrast colors",
    "Do not use medium border-radius values like rounded-lg",
    "Do not use shadow effects",
    "Do not use too many colors (max 3-4)",
    "Do not use symmetrical/conventional layouts",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Geometric Bold 风格按钮，强调硬切换色块与几何碰撞反馈",
      code: `// Primary Button - Square
<button className="group relative px-8 py-4 bg-black text-white border-4 border-black font-bold uppercase tracking-widest transition-transform duration-100 ease-linear hover:bg-red-500 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1">
  <span className="absolute inset-0 -z-10 translate-x-2 translate-y-2 bg-blue-600 transition-transform duration-100 ease-linear group-hover:translate-x-3 group-hover:translate-y-3 group-active:translate-x-1 group-active:translate-y-1" />
  <span className="relative">Explore</span>
</button>

// Circle Button
<button className="w-24 h-24 bg-blue-600 text-white rounded-full border-4 border-black font-bold uppercase text-xs tracking-widest transition-all duration-100 ease-linear hover:bg-black hover:text-white hover:scale-[1.08] active:scale-95">
  Click
</button>

// Outlined Button
<button className="px-8 py-4 bg-white text-black border-4 border-black font-bold uppercase tracking-widest transition-all duration-100 ease-linear hover:bg-black hover:text-white hover:translate-x-1 hover:-translate-y-1 active:translate-y-1 active:translate-x-1">
  View Work
</button>`,
    },
    card: {
      name: "卡片",
      description: "Geometric Bold 风格卡片，强调形状突变与结构位移",
      code: `<div className="group relative bg-white border-4 border-black p-8 transition-all duration-100 ease-linear hover:bg-yellow-300 hover:-translate-x-2 hover:-translate-y-2">
  {/* Decorative shape */}
  <div className="absolute -top-6 -right-6 w-12 h-12 bg-red-500 rotate-45 border-4 border-black transition-all duration-100 ease-linear group-hover:scale-150 group-hover:rotate-90 group-hover:bg-blue-600" />

  <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] bg-black text-white px-2 py-1 transition-colors duration-100 ease-linear group-hover:bg-red-500">01</span>
  <h3 className="text-4xl font-black uppercase mt-3 mb-4 leading-none">Project Name</h3>
  <p className="text-black/70 leading-relaxed">
    Bold geometric design with hard color cuts and shape-driven motion.
  </p>

  {/* Bottom accent bar */}
  <div className="absolute bottom-0 left-0 h-2 w-1/4 bg-black transition-all duration-100 ease-linear group-hover:w-full group-hover:bg-blue-600" />
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
}
/* Geometric Bold Design Tokens */
:root {
  --geometric-bold-primary: #000000;
  --geometric-bold-secondary: #ffffff;
  --geometric-bold-accent: #ff0000;
  --geometric-bold-glow: rgba(0, 0, 0, 0.3);
}

@keyframes geometric-bold-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes geometric-bold-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.geometric-bold-card {
  position: relative;
  overflow: hidden;
}

.geometric-bold-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.05), transparent);
  pointer-events: none;
}

.geometric-bold-card:hover::before {
  opacity: 1;
}

.geometric-bold-gradient {
  background: linear-gradient(135deg, #000000, #ff0000);
}

.geometric-bold-gradient-text {
  background: linear-gradient(135deg, #000000, #ff0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.geometric-bold-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(0, 0, 0, 0.08);
}

.geometric-bold-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.geometric-bold-animate-in {
  animation: geometric-bold-fade-in 0.5s ease-out both;
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
- Numbers: Often used as design elements

## Animation & Interaction Rules

- Blocky Impact: 交互使用纯色硬切与短位移反馈，避免柔和透明度过渡。
- Shape Snapping: 几何装饰在 hover 时可瞬时旋转/放大，形成结构突变感。
- Heavy Press: active 状态优先用位移与层级回弹表达按压，不依赖柔和缩放。
- Linear & Fast: 统一使用 duration-100 + ease-linear，拒绝弹簧感和慢速拖尾。

## Layout & Spacing
- Section padding: py-16 md:py-24
- Card padding: p-6 md:p-8
- Gap between cards: gap-6 md:gap-8
- Max content width: max-w-6xl mx-auto

## Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Stack elements vertically on mobile (flex-col), row on desktop (md:flex-row)
- Reduce font sizes on mobile: text-3xl md:text-5xl for headings
- Touch-friendly targets: min 44px for interactive elements

## Self-Check Verification
After generating code, verify:
1. All interactive elements have hover/focus/active states
2. Color contrast meets WCAG 2.1 AA (4.5:1 for text)
3. Layout is responsive across breakpoints
4. Typography hierarchy is clear (h1 > h2 > h3 > body)
5. Spacing is consistent using the defined scale
6. All animations respect prefers-reduced-motion`,

  aiRulesEn: `STYLE: Geometric Bold
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
- Numbers: Often used as design elements

## Animation & Interaction Rules

- Blocky Impact: Interactions use solid color hard-cuts and short displacement feedback, avoiding soft opacity transitions.
- Shape Snapping: Geometric decorations can instantly rotate/scale on hover, creating a structural mutation feel.
- Heavy Press: Active state prefers displacement and layer rebound to express pressing, not relying on soft scaling.
- Linear & Fast: Uniformly use duration-100 + ease-linear, rejecting spring feel and slow trailing.`,

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
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 几何大胆风风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Geometric Bold style",
      prompt: `Create a SaaS landing page using Geometric Bold style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 几何大胆风风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Geometric Bold style",
      prompt: `Create a portfolio showcase page using Geometric Bold style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "geometric-bold-warm",
      name: "几何大胆风暖色版",
      nameEn: "Geometric Bold Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        accent: ["#c91a00", "#7900e8", "#86ff17"],
      },
    },
    {
      id: "geometric-bold-cool",
      name: "几何大胆风冷色版",
      nameEn: "Geometric Bold Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#000000",
        secondary: "#e6e6e6",
        accent: ["#ff006c", "#0027d6", "#ffd829"],
      },
    },
  ],
};
