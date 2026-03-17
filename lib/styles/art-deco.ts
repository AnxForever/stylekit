import { DesignStyle } from "./index";

export const artDeco: DesignStyle = {
  slug: "art-deco",
  name: "装饰艺术风格",
  nameEn: "Art Deco",
  description:
    "1920-30年代的奢华设计风格，几何对称图案、金色装饰、优雅线条和高端质感，传达精致与繁荣。",
  descriptionEn:
    "A luxurious design style from the 1920s-30s featuring geometric symmetrical patterns, gold decorations, elegant lines, and premium textures, conveying sophistication and prosperity.",
  cover: "/styles/art-deco.svg",
  styleType: "visual",
  tags: ["retro", "expressive"],
  category: "retro",
  colors: {
    primary: "#d4af37",
    secondary: "#1a1a2e",
    accent: ["#c9a227", "#2d2d44", "#f5f5dc", "#4bc542"],
  },
  keywords: ["装饰艺术", "奢华", "金色", "几何", "1920年代", "优雅", "高端", "retro", "vintage", "nostalgic"],

  philosophy: `Art Deco（装饰艺术）是1920-30年代流行的设计风格，融合了现代主义的几何形式与传统工艺的奢华感。

核心理念：
- 几何对称：放射状线条、重复几何图案
- 奢华感：金色、黑色、深蓝的高端配色
- 精致工艺：细腻的线条和装饰细节
- 现代与传统：机械时代美学与古典优雅的结合

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Art Deco is a design style popular in the 1920s-30s, blending modernist geometric forms with the luxury of traditional craftsmanship.

Core principles:
- Geometric symmetry: Radial lines, repeating geometric patterns
- Luxury: High-end color schemes of gold, black, and deep blue
- Refined craftsmanship: Delicate lines and decorative details
- Modern meets traditional: Machine age aesthetics combined with classical elegance`,

  doList: [
    "使用金色和深色的高对比配色",
    "添加几何对称图案和放射状线条",
    "使用优雅的衬线字体",
    "添加金色边框和装饰线",
    "保持对称和平衡的布局",
    "使用细腻的线条装饰",
  ],

  doListEn: [
    "Use high-contrast gold and dark color schemes",
    "Add geometric symmetrical patterns and radial lines",
    "Use elegant serif fonts",
    "Add gold borders and decorative lines",
    "Maintain symmetrical and balanced layouts",
    "Use delicate line decorations",
  ],

  dontList: [
    "禁止使用过于鲜艳的配色",
    "禁止使用不对称的混乱布局",
    "禁止使用过于现代的无衬线字体",
    "禁止省略装饰性元素",
  ],

  dontListEn: [
    "Do NOT use overly vibrant modern color schemes",
    "Do NOT use asymmetrical chaotic layouts",
    "Do NOT use overly modern sans-serif fonts",
    "Do NOT omit decorative elements",
  ],

  components: {
    button: {
      name: "按钮",
      description: "装饰艺术风格按钮",
      code: `<button className="
  px-10 py-4
  bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700
  bg-[length:200%_auto]
  text-slate-900 font-serif font-bold uppercase tracking-[0.3em]
  border border-yellow-300
  shadow-[0_0_20px_rgba(212,175,55,0.2)]
  hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]
  hover:bg-right
  hover:-translate-y-0.5
  active:translate-y-0
  active:shadow-[0_0_10px_rgba(212,175,55,0.4)]
  transition-all duration-700 ease-out
">
  Discover
</button>`,
    },
    card: {
      name: "卡片",
      description: "装饰艺术风格卡片",
      code: `<div className="
  group relative p-10
  bg-gradient-to-b from-slate-900 to-slate-800
  border border-yellow-600/30
  hover:border-yellow-500/80
  transition-colors duration-700
  overflow-hidden
">
  {/* Corner decorations */}
  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-600/50 group-hover:border-yellow-400 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-yellow-600/50 group-hover:border-yellow-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-yellow-600/50 group-hover:border-yellow-400 group-hover:-translate-x-1 group-hover:translate-y-1 transition-all duration-500" />
  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-600/50 group-hover:border-yellow-400 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-500" />

  <div className="relative z-10 flex flex-col items-center">
    <h3 className="text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 bg-[length:200%_auto] group-hover:bg-right transition-all duration-1000 mb-6 tracking-[0.2em] text-center">
      ELEGANCE
    </h3>
    <div className="w-12 h-[1px] bg-yellow-500/50 group-hover:w-24 transition-all duration-700 mb-6" />
    <p className="text-slate-400 text-center font-serif group-hover:text-slate-300 transition-colors duration-500">
      Timeless sophistication and golden era luxury.
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "装饰艺术风格输入框",
      code: `<input
  type="text"
  placeholder="Enter your name..."
  className="
    w-full px-6 py-4
    bg-slate-900
    border border-yellow-600/50
    text-yellow-100 placeholder-yellow-600/50
    font-serif tracking-wider
    focus:border-yellow-500
    focus:shadow-[0_0_15px_rgba(212,175,55,0.2)]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "装饰艺术风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
  relative overflow-hidden
">
  {/* Radial lines decoration */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent origin-left"
          style={{ transform: \`rotate(\${i * 30}deg)\` }}
        />
      ))}
    </div>
  </div>

  <div className="relative z-10 text-center px-6">
    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
    <h1 className="text-5xl md:text-7xl font-serif text-yellow-500 mb-6 tracking-[0.2em]">
      ART DECO
    </h1>
    <p className="text-xl text-gray-400 mb-8 tracking-wider">
      The Golden Age of Design
    </p>
    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
    <button className="
      px-12 py-4
      bg-transparent
      border-2 border-yellow-500
      text-yellow-500 font-serif uppercase tracking-[0.3em]
      hover:bg-yellow-500 hover:text-slate-900
      transition-all duration-300
    ">
      Enter
    </button>
  </div>
</section>`,
      preview: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
  relative overflow-hidden
">
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
      <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent origin-left rotate-0" />
      <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent origin-left rotate-[30deg]" />
      <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent origin-left rotate-[60deg]" />
      <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent origin-left rotate-[90deg]" />
      <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent origin-left rotate-[120deg]" />
      <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent origin-left rotate-[150deg]" />
    </div>
  </div>

  <div className="relative z-10 text-center px-6">
    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
    <h1 className="text-5xl md:text-7xl font-serif text-yellow-500 mb-6 tracking-[0.2em]">
      ART DECO
    </h1>
    <p className="text-xl text-gray-400 mb-8 tracking-wider">
      The Golden Age of Design
    </p>
    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
    <button className="
      px-12 py-4
      bg-transparent
      border-2 border-yellow-500
      text-yellow-500 font-serif uppercase tracking-[0.3em]
      hover:bg-yellow-500 hover:text-slate-900
      transition-all duration-300
    ">
      Enter
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Art Deco 全局样式 */

:root {
  --deco-gold: #d4af37;
  --deco-dark: #1a1a2e;
  --deco-navy: #2d2d44;
  --deco-cream: #f5f5dc;
}

/* 金色渐变 */
.deco-gold {
  background: linear-gradient(135deg, #d4af37 0%, #f5d67a 50%, #d4af37 100%);
}

/* 放射状线条 */
.deco-sunburst {
  background-image: repeating-conic-gradient(
    from 0deg,
    transparent 0deg 15deg,
    rgba(212, 175, 55, 0.1) 15deg 30deg
  );
}

/* 几何边框 */
.deco-border {
  border: 1px solid var(--deco-gold);
  position: relative;
}

.deco-border::before,
.deco-border::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid var(--deco-gold);
}

.deco-border::before {
  top: -5px;
  left: -5px;
  border-right: none;
  border-bottom: none;
}

.deco-border::after {
  bottom: -5px;
  right: -5px;
  border-left: none;
  border-top: none;
}

/* 装饰分隔线 */
.deco-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--deco-gold), transparent);
}
@keyframes art-deco-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes art-deco-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.art-deco-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(212, 175, 55, 0.08);
}

.art-deco-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.art-deco-animate-in {
  animation: art-deco-fade-in 0.5s ease-out both;
}`,

  aiRules: `你是一个 Art Deco 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用过于鲜艳的现代配色
- 使用不对称的混乱布局
- 使用圆润的现代字体
- 省略装饰性边框和线条

## 必须遵守

- 金色配色 text-yellow-500, border-yellow-500
- 深色背景 bg-slate-900, bg-slate-800
- 衬线字体 font-serif
- 宽字距 tracking-wider, tracking-[0.3em]
- 对称布局和居中对齐
- 几何装饰元素

## 配色

主色调：
- 金色: #d4af37, text-yellow-500, border-yellow-500
- 深蓝: #1a1a2e, bg-slate-900
- 海军蓝: #2d2d44, bg-slate-800
- 奶油色: #f5f5dc

## 装饰元素

- 角落装饰边框
- 放射状线条
- 渐变分隔线
- 几何图案

## Animation & Interaction Rules

- Elegant & Slow: 动画必须显得高贵从容。使用较长持续时间，如 \`duration-500\` 或 \`duration-700\`，绝不能有急促弹跳感。
- Golden Shimmer: 悬停时，通过背景渐变位置移动（如 \`bg-[length:200%_auto] hover:bg-right\`）模拟黄金材质反光与流泽。
- Symmetrical Expansion: 交互时，尽量保持对称性。例如悬停卡片时，四角装饰线框可以产生向外轻微扩张（通过 \`group-hover:translate\` 实现）。
- Subtle Lift: 采用极轻微上浮和金色光晕放大效果。

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

  aiRulesEn: `You are an Art Deco design style frontend development expert. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Using overly vibrant modern color schemes
- Using asymmetrical chaotic layouts
- Using rounded modern fonts
- Omitting decorative borders and lines

## Must Follow

- Gold color scheme text-yellow-500, border-yellow-500
- Dark backgrounds bg-slate-900, bg-slate-800
- Serif fonts font-serif
- Wide letter spacing tracking-wider, tracking-[0.3em]
- Symmetrical layouts and center alignment
- Geometric decorative elements

## Color Palette

Primary:
- Gold: #d4af37, text-yellow-500, border-yellow-500
- Deep blue: #1a1a2e, bg-slate-900
- Navy: #2d2d44, bg-slate-800
- Cream: #f5f5dc

## Decorative Elements

- Corner decorative borders
- Radial lines
- Gradient dividers
- Geometric patterns

## Animation & Interaction Rules

- Elegant & Slow: Animations must appear noble and unhurried. Use longer durations like \`duration-500\` or \`duration-700\`, never with a hasty bouncy feel.
- Golden Shimmer: On hover, simulate gold material reflection and luster through background gradient position movement (e.g., \`bg-[length:200%_auto] hover:bg-right\`).
- Symmetrical Expansion: During interaction, maintain symmetry. For example, on card hover, corner decorative frames can slightly expand outward (via \`group-hover:translate\`).
- Subtle Lift: Use very slight float and gold halo expansion effects.`,

  examplePrompts: [
    {
      title: "奢侈品牌官网",
      titleEn: "Luxury Brand Website",
      description: "高端奢华的品牌网站",
      descriptionEn: "High-end luxury brand website",
      prompt: `用 Art Deco 风格创建一个奢侈品牌官网，要求：
1. 背景：深色渐变
2. 标题：金色衬线字体 + 宽字距
3. 装饰：放射状线条 + 角落边框
4. 按钮：金色边框 + 悬停填充
5. 整体对称优雅`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 装饰艺术风格风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Art Deco style",
      prompt: `Create a SaaS landing page using Art Deco style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 装饰艺术风格风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Art Deco style",
      prompt: `Create a portfolio showcase page using Art Deco style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "art-deco-warm",
      name: "装饰艺术风格暖色版",
      nameEn: "Art Deco Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#93c334",
        secondary: "#313143",
        accent: ["#86b624", "#382a42", "#e9f8de"],
      },
    },
    {
      id: "art-deco-cool",
      name: "装饰艺术风格冷色版",
      nameEn: "Art Deco Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#ff9b5a",
        secondary: "#171729",
        accent: ["#ff8e4b", "#233040", "#fff1e0"],
      },
    },
  ],
};
