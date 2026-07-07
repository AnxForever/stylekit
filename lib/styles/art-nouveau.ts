import type { DesignStyle } from "./types";

export const artNouveau: DesignStyle = {
  slug: "art-nouveau",
  name: "新艺术运动风",
  nameEn: "Art Nouveau",
  description:
    "源自19世纪末的有机曲线美学，以流动的藤蔓纹样、自然花卉元素、Mucha风格海报装饰和优雅的衬线字体为特征，传递自然与艺术的和谐统一。",
  descriptionEn:
    "Organic curve aesthetics from the late 19th century, characterized by flowing vine patterns, natural floral elements, Mucha-style poster decorations, and elegant serif typography -- conveying the harmony of nature and art.",
  cover: "/styles/art-nouveau.svg",
  styleType: "visual",
  tags: ["retro"],
  category: "retro",
  colors: {
    primary: "#2d5016",
    secondary: "#f5f0e1",
    accent: ["#c9a227", "#8b6db5", "#4a7c3f", "#4bc542"],
  },
  keywords: ["新艺术", "有机曲线", "藤蔓", "花卉", "Mucha", "装饰", "自然", "retro", "vintage", "nostalgic"],

  philosophy: `Art Nouveau（新艺术运动）是19世纪末至20世纪初的国际性艺术运动，以自然界的有机形态为灵感，将装饰艺术推向极致。

核心理念：
- 有机曲线：受植物和花卉启发的流动线条
- 自然统一：艺术与自然的和谐融合
- 整体设计：从建筑到家具到海报的统一美学
- 装饰之美：精致的装饰纹样赋予功能性物品以艺术价值
- 生长律动：交互应如植物生长般缓慢、柔和、有机

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Art Nouveau is an international art movement from the late 19th to early 20th century, drawing inspiration from organic forms in nature and pushing decorative art to its zenith.

Core principles:
- Organic curves: Flowing lines inspired by plants and flowers
- Unity with nature: Harmonious fusion of art and nature
- Holistic design: A unified aesthetic from architecture to furniture to posters
- Beauty of ornamentation: Exquisite decorative patterns endow functional objects with artistic value
- Growth rhythm: Interactions should be slow, soft, and organic like plant growth`,

  doList: [
    "使用有机曲线和流动线条",
    "采用深绿、金色、象牙白为主色调",
    "添加藤蔓、花卉等自然装饰元素",
    "使用衬线或装饰性字体",
    "保持优雅精致的整体质感",
    "圆润的边角和柔和的过渡",
    "使用 duration-500 或 duration-700 配合 ease-in-out 表现自然律动",
    "悬停时光晕柔和扩散（shadow 变大变柔和）",
    "装饰元素在悬停时轻微放大或旋转，像花朵绽放",
  ],

  doListEn: [
    "Use organic curves and flowing lines",
    "Use deep green, gold, and ivory white as primary colors",
    "Add vine, floral, and other natural decorative elements",
    "Use serif or decorative fonts",
    "Maintain an elegant and refined overall quality",
    "Rounded corners and soft transitions",
    "Use duration-500 or duration-700 with ease-in-out for natural rhythm",
    "Soft glow expansion on hover (shadow grows larger and softer)",
    "Decorative elements slightly scale up or rotate on hover, like flowers blooming",
  ],

  dontList: [
    "禁止使用生硬的直角和几何形状",
    "禁止使用霓虹或高饱和度的现代色彩",
    "禁止使用粗犷的无装饰设计",
    "禁止使用现代无衬线字体作为标题",
    "禁止使用短促生硬的 duration-150 或 duration-200",
    "禁止使用硬边阴影（shadow-[Xpx_Ypx_0]）",
  ],

  dontListEn: [
    "Do not use rigid right angles and geometric shapes",
    "Do not use neon or high-saturation modern colors",
    "Do not use rough undecorated design",
    "Do not use modern sans-serif fonts for headings",
    "Do not use short abrupt duration-150 or duration-200",
    "Do not use hard-edge shadows (shadow-[Xpx_Ypx_0])",
  ],

  components: {
    button: {
      name: "按钮",
      description: "新艺术风格按钮，悬停时有光晕膨胀和色彩切换",
      code: `<button className="
  group px-8 py-4
  bg-[#2d5016] text-[#f5f0e1]
  border border-[#c9a227]
  rounded-full font-serif tracking-wide
  shadow-[0_4px_15px_rgba(45,80,22,0.2)]
  hover:bg-[#c9a227] hover:text-[#2d5016]
  hover:shadow-[0_8px_25px_rgba(201,162,39,0.4)]
  active:scale-[0.98]
  transition-all duration-500 ease-in-out
">
  <span className="flex items-center gap-2">
    Explore <span className="inline-block group-hover:translate-x-1 transition-transform duration-500">&rarr;</span>
  </span>
</button>`,
    },
    card: {
      name: "卡片",
      description: "新艺术风格卡片，悬停时有光晕扩散和微浮动",
      code: `<div className="
  group p-8
  bg-[#f5f0e1]
  border border-[#c9a227]/40
  rounded-3xl
  shadow-[0_4px_20px_rgba(139,109,181,0.05)]
  hover:border-[#c9a227]
  hover:shadow-[0_12px_30px_rgba(139,109,181,0.15)]
  hover:-translate-y-1
  transition-all duration-700 ease-in-out
  relative overflow-hidden
">
  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.15),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
  <h3 className="text-2xl font-serif text-[#2d5016] mb-3 group-hover:text-[#c9a227] transition-colors duration-500">
    Nature's Beauty
  </h3>
  <p className="text-[#2d5016]/70 font-serif group-hover:text-[#2d5016]/90 transition-colors duration-500">
    Where art meets organic form in elegant harmony.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "新艺术风格输入框，聚焦时金色光晕",
      code: `<input
  type="text"
  placeholder="Enter text..."
  className="
    w-full px-6 py-4
    bg-[#f5f0e1]
    border border-[#c9a227]/40
    rounded-full
    text-[#2d5016] placeholder-[#8b6db5]/50
    focus:border-[#c9a227]
    focus:shadow-[0_0_20px_rgba(201,162,39,0.25)]
    focus:outline-none
    transition-all duration-500 ease-in-out
    font-serif
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "新艺术风格 Hero，有机曲线背景装饰",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-[#f5f0e1] to-[#e8dcc8]
  relative overflow-hidden
">
  <div className="absolute inset-0 opacity-10">
    <svg viewBox="0 0 1200 800" className="w-full h-full">
      <path d="M0,400 Q300,100 600,400 T1200,400" fill="none" stroke="#2d5016" strokeWidth="2"/>
      <path d="M0,500 Q300,200 600,500 T1200,500" fill="none" stroke="#c9a227" strokeWidth="1.5"/>
    </svg>
  </div>

  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-serif text-[#2d5016] mb-6">
      Art Nouveau
    </h1>
    <p className="text-xl text-[#2d5016]/70 font-serif italic mb-8">
      The harmony of nature and art
    </p>
    <button className="
      px-10 py-4
      bg-[#2d5016] text-[#f5f0e1]
      border border-[#c9a227]
      rounded-full font-serif tracking-wide
      shadow-[0_4px_15px_rgba(45,80,22,0.2)]
      hover:bg-[#c9a227] hover:text-[#2d5016]
      hover:shadow-[0_8px_25px_rgba(201,162,39,0.4)]
      transition-all duration-500 ease-in-out
    ">
      Discover
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Art Nouveau 全局样式 */

:root {
  --an-green: #2d5016;
  --an-gold: #c9a227;
  --an-ivory: #f5f0e1;
  --an-wisteria: #8b6db5;
}

/* 有机曲线装饰 */
.an-vine-border {
  border-image: linear-gradient(
    135deg,
    var(--an-gold) 0%,
    var(--an-green) 50%,
    var(--an-gold) 100%
  ) 1;
}

/* 金色发光效果 */
.an-gold-glow {
  box-shadow: 0 0 20px rgba(201, 162, 39, 0.3);
  transition: box-shadow 0.7s ease-in-out;
}

.an-gold-glow:hover {
  box-shadow: 0 0 35px rgba(201, 162, 39, 0.5);
}

/* 花卉背景纹理 */
.an-floral-bg {
  background-image: radial-gradient(
    circle at 20% 80%,
    rgba(139, 109, 181, 0.1) 0%,
    transparent 50%
  ),
  radial-gradient(
    circle at 80% 20%,
    rgba(201, 162, 39, 0.1) 0%,
    transparent 50%
  );
}

/* 装饰元素绽放动画 */
.an-bloom {
  transition: transform 0.7s ease-in-out, opacity 0.7s ease-in-out;
}

.an-bloom:hover {
  transform: scale(1.1) rotate(5deg);
}

/* 衬线标题 */
.an-heading {
  font-family: Georgia, "Times New Roman", serif;
  letter-spacing: 0.05em;
}
@keyframes art-nouveau-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes art-nouveau-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.art-nouveau-card {
  position: relative;
  overflow: hidden;
}

.art-nouveau-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(45, 80, 22, 0.05), transparent);
  pointer-events: none;
}

.art-nouveau-card:hover::before {
  opacity: 1;
}

.art-nouveau-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(45, 80, 22, 0.08);
}

.art-nouveau-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.art-nouveau-animate-in {
  animation: art-nouveau-fade-in 0.5s ease-out both;
}`,

  aiRules: `你是一个 Art Nouveau 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用生硬的直角和尖锐几何形状
- 使用霓虹色或高饱和度现代色彩
- 使用 sans-serif 作为标题字体
- 使用深色/黑色背景
- 使用短促的 duration-150 或 duration-200
- 使用硬边阴影（shadow-[Xpx_Ypx_0px_color]）

## 必须遵守

- 使用有机曲线和圆润边角 rounded-full, rounded-3xl
- 深绿 #2d5016 为主色，金色 #c9a227 为强调色
- 象牙白 #f5f0e1 为背景色
- 使用 font-serif 衬线字体
- 添加柔和的阴影和光晕效果

## Animation & Interaction Rules

- Organic Flow: 动画必须像植物生长一样自然流动。使用 duration-500 或 duration-700 配合平滑的 ease-in-out。
- Soft Glow: 悬停时光晕应该柔和地向外扩散（shadow 从小变大、从浅变深），不要使用生硬的位移。
- Decorative Flourishes: 装饰元素在悬停时产生轻微的放大或旋转（scale(1.1) rotate(5deg)），像花朵绽放。
- Radial Highlight: 卡片悬停时用 radial-gradient 伪元素产生角落光晕（opacity 0 -> 100）。
- Gentle Float: 卡片悬停时微微上浮 -translate-y-1，配合阴影扩散。

## 配色

主色调：
- 深绿: #2d5016
- 金色: #c9a227
- 象牙白: #f5f0e1
- 紫藤: #8b6db5

## 特殊元素

- 有机曲线 SVG 装饰
- 藤蔓和花卉图案
- 金色边框和光晕
- 优雅的渐变过渡

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

  aiRulesEn: `You are an Art Nouveau design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Rigid right angles and sharp geometric shapes
- Neon or high-saturation modern colors
- Sans-serif fonts for headings
- Dark/black backgrounds
- Short duration-150 or duration-200
- Hard-edge shadows (shadow-[Xpx_Ypx_0px_color])

## Must Follow

- Use organic curves and rounded corners rounded-full, rounded-3xl
- Deep green #2d5016 as primary, gold #c9a227 as accent
- Ivory white #f5f0e1 as background
- Use font-serif serif fonts
- Add soft shadows and glow effects

## Animation & Interaction Rules

- Organic Flow: Animations must flow naturally like plant growth. Use duration-500 or duration-700 with smooth ease-in-out.
- Soft Glow: Hover glow should expand softly outward (shadow grows from small to large, shallow to deep), avoiding rigid displacement.
- Decorative Flourishes: Decorative elements produce slight scaling or rotation on hover (scale(1.1) rotate(5deg)), like flowers blooming.
- Radial Highlight: Cards produce corner glow via radial-gradient pseudo-element on hover (opacity 0 -> 100).
- Gentle Float: Cards float slightly upward on hover -translate-y-1, paired with shadow expansion.

## Color Palette

Primary:
- Deep Green: #2d5016
- Gold: #c9a227
- Ivory White: #f5f0e1
- Wisteria: #8b6db5

## Special Elements

- Organic curve SVG decorations
- Vine and floral patterns
- Gold borders and glow
- Elegant gradient transitions`,

  examplePrompts: [
    {
      title: "花卉展览页面",
      titleEn: "Floral Exhibition Page",
      description: "Art Nouveau风格的花卉展览展示",
      descriptionEn: "Floral exhibition showcase in Art Nouveau style",
      prompt: `用 Art Nouveau 风格创建一个花卉展览页面，要求：
1. 背景：象牙白渐变 + 有机曲线装饰
2. 标题：衬线字体，深绿色
3. 卡片：金色边框，圆润边角，hover 时光晕扩散 + 微浮动
4. 添加藤蔓和花卉 SVG 装饰元素
5. 所有交互 duration-500 以上，ease-in-out
6. 整体优雅精致的自然美学`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 新艺术运动风风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Art Nouveau style",
      prompt: `Create a SaaS landing page using Art Nouveau style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 新艺术运动风风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Art Nouveau style",
      prompt: `Create a portfolio showcase page using Art Nouveau style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "art-nouveau-warm",
      name: "新艺术运动风暖色版",
      nameEn: "Art Nouveau Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#195428",
        secondary: "#f6f2e4",
        accent: ["#86b624", "#a767a4", "#387f57"],
      },
    },
    {
      id: "art-nouveau-cool",
      name: "新艺术运动风冷色版",
      nameEn: "Art Nouveau Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#474911",
        secondary: "#ddd8cb",
        accent: ["#ff8e4b", "#6a77b6", "#667534"],
      },
    },
  ],
};
