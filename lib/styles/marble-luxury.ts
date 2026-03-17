import { DesignStyle } from "./index";

export const marbleLuxury: DesignStyle = {
  slug: "marble-luxury",
  name: "大理石奢华",
  nameEn: "Marble Luxury",
  description:
    "大理石纹理与金色装饰的高端设计风格，白色大理石质感背景、金色线条分隔、黑色文字。适合奢侈品牌、酒店、高端地产。",
  descriptionEn:
    "High-end design style with marble textures and gold accents, featuring white marble-textured backgrounds, gold line separators, and black text. Ideal for luxury brands, hotels, and premium real estate.",
  cover: "/styles/marble-luxury.svg",
  styleType: "visual",
  tags: ["modern", "minimal"],
  category: "modern",
  colors: {
    primary: "#1a1a1a",
    secondary: "#f8f6f3",
    accent: ["#c9a96e", "#8a7968", "#e8e0d6", "#85bd73"],
  },
  keywords: ["大理石", "奢华", "金色", "高端", "纹理", "精致", "品牌", "modern", "contemporary", "sleek"],

  philosophy: `大理石奢华（Marble Luxury）设计风格源自高端建筑和室内设计的材质美学。大理石自古罗马时代起便是权力、财富和永恒之美的象征，其天然纹理中的灰色脉络与温暖白色基底形成了独一无二的视觉韵律。

在数字设计中，大理石奢华风格追求"克制的奢华"——不是金碧辉煌的铺张，而是通过精致的材质暗示和恰到好处的金色点缀传达高端品质感。白色大理石 #f8f6f3 作为背景基底，比纯白更温暖、更有质感；纯黑 #1a1a1a 用于文字，形成极致的可读性对比。

核心理念：
- 材质暗示：通过微妙的 radial-gradient 和 linear-gradient 叠加模拟大理石纹理的色差和脉络
- 金色克制：古金色 #c9a96e 仅用于分隔线、边框和关键装饰，绝不大面积使用
- 极致留白：大量 padding 和 margin 营造呼吸感，信息密度低但每个元素都精心放置
- 字体优雅：纤细或常规字重的衬线字体传达奢华品牌的从容与自信

大理石奢华风格适合高端酒店官网、奢侈品牌展示、精品地产、高级珠宝和高端美容品牌等需要传达品质感和exclusivity的场景。

设计关键：克制是奢华的最高表达。金色越少，越显珍贵。空间越多，越显从容。`,

  philosophyEn: `Marble Luxury design style originates from the material aesthetics of high-end architecture and interior design. Since ancient Rome, marble has symbolized power, wealth, and timeless beauty, with its natural gray veining against a warm white base creating a uniquely rhythmic visual pattern.

In digital design, Marble Luxury pursues "restrained luxury" -- not ostentatious gilded splendor, but conveying premium quality through refined material suggestions and perfectly placed gold accents. White marble #f8f6f3 as the background base is warmer and more textured than pure white; pure black #1a1a1a for text creates ultimate readability contrast.

Core concepts:
- Material suggestion: Subtle radial-gradient and linear-gradient overlays simulate the color variation and veining of marble texture
- Gold restraint: Antique gold #c9a96e used only for dividers, borders, and key decorations -- never in large areas
- Extreme whitespace: Generous padding and margin create breathing room; low information density but every element is meticulously placed
- Elegant typography: Thin or regular-weight serif fonts convey the composure and confidence of luxury brands

Marble Luxury style suits high-end hotel websites, luxury brand showcases, premium real estate, fine jewelry, and high-end beauty brands -- any scenario needing to convey quality and exclusivity.

Design key: Restraint is the highest expression of luxury. The less gold, the more precious it appears. The more space, the more composed it feels.`,

  doList: [
    "使用大理石白 bg-[#f8f6f3] 作为主背景底色",
    "使用纯黑 text-[#1a1a1a] 作为主要文字颜色",
    "使用古金色 border-[#c9a96e] 作为分隔线和细边框装饰",
    "大量留白：py-20 以上的 section 间距，px-12 以上的容器内边距",
    "使用衬线字体 font-serif 并保持较细字重（font-normal 或 font-light 视觉感）",
    "使用 tracking-[0.2em] 以上的字母间距营造奢华排版感",
    "使用 1px 细线分隔：border-t border-[#c9a96e]/30 作为优雅分隔",
    "微妙的 hover 过渡效果 duration-500 以上，缓慢而从容",
  ],

  doListEn: [
    "Use marble white bg-[#f8f6f3] as the main background base",
    "Use pure black text-[#1a1a1a] as the primary text color",
    "Use antique gold border-[#c9a96e] for dividers and fine border decorations",
    "Generous whitespace: py-20 or more for section spacing, px-12 or more for container padding",
    "Use serif fonts font-serif and maintain thin font weights (font-normal or font-light visual feel)",
    "Use tracking-[0.2em] or wider letter spacing for a luxurious typographic feel",
    "Use 1px fine line separators: border-t border-[#c9a96e]/30 as elegant dividers",
    "Subtle hover transitions duration-500 or more, slow and composed",
  ],

  dontList: [
    "禁止使用饱和度高的霓虹色或荧光色",
    "禁止使用粗边框（border-4 以上）",
    "禁止使用硬偏移阴影（shadow-[Npx_Npx_0px]）",
    "禁止使用全大写粗体（font-black uppercase）的激进排版",
    "禁止使用密集的信息布局或小间距",
    "禁止使用卡通、手绘或粗犷的视觉元素",
    "禁止使用纯白 bg-white（应使用更温暖的 #f8f6f3）",
  ],

  dontListEn: [
    "Do not use high-saturation neon or fluorescent colors",
    "Do not use thick borders (border-4 and above)",
    "Do not use hard offset shadows (shadow-[Npx_Npx_0px])",
    "Do not use bold aggressive typography (font-black uppercase)",
    "Do not use dense information layouts or small spacing",
    "Do not use cartoon, hand-drawn, or rough visual elements",
    "Do not use pure white bg-white (use the warmer #f8f6f3)",
  ],

  components: {
    button: {
      name: "按钮",
      description:
        "大理石奢华按钮，细边框金色描边、衬线字体和优雅 hover 过渡",
      code: `<button
  className="
    group
    px-12 py-4
    bg-[#1a1a1a]
    text-[#f8f6f3] font-serif tracking-[0.16em]
    border border-[#c9a96e]/40
    shadow-[0_10px_28px_rgba(0,0,0,0.28)]
    hover:border-[#c9a96e]/70
    hover:shadow-[0_18px_40px_rgba(0,0,0,0.42)]
    active:shadow-[inset_0_6px_12px_rgba(0,0,0,0.55),0_10px_28px_rgba(0,0,0,0.28)]
    transition-all duration-700 ease-out
  "
>
  <span className="bg-gradient-to-r from-[#c9a96e] via-[#f1dbc1] to-[#c9a96e] bg-[length:200%_auto] bg-clip-text text-transparent transition-[background-position,color] duration-700 ease-out group-hover:bg-right">
    Exclusive
  </span>
</button>`,
    },
    card: {
      name: "卡片",
      description:
        "大理石奢华卡片，温暖白底、金色细边框和大量内边距留白",
      code: `<div className="
  group
  relative overflow-hidden
  p-12
  bg-[#f8f6f3]
  border border-[#c9a96e]/20
  shadow-[0_10px_28px_rgba(0,0,0,0.08)]
  hover:border-[#c9a96e]/45
  hover:shadow-[0_16px_40px_rgba(0,0,0,0.14)]
  transition-all duration-700
">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,169,110,0.08),transparent_55%)] opacity-40 transition-opacity duration-700 group-hover:opacity-60" />

  <div className="relative z-10">
  <span className="text-xs font-serif text-[#c9a96e] tracking-[0.3em] uppercase mb-6 block">
    Collection
  </span>
  <h3 className="text-2xl font-serif text-[#1a1a1a] mb-4 tracking-wide bg-gradient-to-r from-[#8a7968] via-[#c9a96e] to-[#8a7968] bg-[length:200%_auto] bg-clip-text text-transparent transition-[background-position] duration-1000 group-hover:bg-right">
    Carrara White
  </h3>
  <p className="text-[#8a7968] font-serif text-sm leading-relaxed mb-6">
    Timeless elegance carved from Italian marble, where every vein tells a story of geological artistry.
  </p>
  <div className="pt-6 border-t border-[#c9a96e]/20">
    <span className="text-xs font-serif text-[#8a7968] tracking-[0.2em] uppercase">
      View Details &rarr;
    </span>
  </div>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description:
        "大理石奢华输入框，细边框底线、衬线字体和金色聚焦效果",
      code: `<div>
  <label className="block text-xs font-serif text-[#c9a96e] tracking-[0.3em] uppercase mb-3">
    Full Name
  </label>
  <input
    type="text"
    placeholder="Enter your name"
    className="
      w-full px-0 py-4
      bg-transparent
      border-0 border-b border-[#1a1a1a]/20
      text-[#1a1a1a] placeholder-[#8a7968]/40
      font-serif tracking-wide
      focus:border-b-[#c9a96e]
      focus:outline-none
      transition-all duration-500
    "
  />
</div>`,
    },
    hero: {
      name: "Hero 区块",
      description:
        "大理石奢华 Hero 区域，大理石纹理背景、金色细线装饰和极致留白排版",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#f8f6f3]
  relative overflow-hidden
">
  {/* Marble texture overlay */}
  <div className="absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage: "radial-gradient(ellipse at 20% 50%, #8a7968 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, #c9a96e 0%, transparent 40%), radial-gradient(ellipse at 50% 80%, #8a7968 0%, transparent 45%)"
    }}
  />

  {/* Gold line frame */}
  <div className="absolute inset-12 md:inset-20 border border-[#c9a96e]/15 pointer-events-none" />

  <div className="relative z-10 text-center px-6 max-w-3xl">
    <div className="mb-8">
      <div className="w-12 h-[1px] bg-[#c9a96e] mx-auto mb-4" />
      <span className="text-xs font-serif text-[#c9a96e] tracking-[0.4em] uppercase">
        Established 2024
      </span>
      <div className="w-12 h-[1px] bg-[#c9a96e] mx-auto mt-4" />
    </div>
    <h1 className="text-5xl md:text-7xl font-serif text-[#1a1a1a] mb-6 tracking-wide leading-tight">
      Marble &amp; Gold
    </h1>
    <p className="text-lg text-[#8a7968] font-serif mb-12 max-w-lg mx-auto leading-relaxed">
      Where timeless craftsmanship meets modern luxury. Every detail considered, every surface refined.
    </p>
    <button className="
      px-12 py-4
      bg-[#1a1a1a]
      text-[#f8f6f3] font-serif tracking-[0.2em] uppercase
      border border-[#c9a96e]/40
      hover:bg-[#c9a96e] hover:text-[#1a1a1a]
      hover:border-[#c9a96e]
      transition-all duration-500 ease-in-out
    ">
      Explore Collection
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Marble Luxury Global Styles */

:root {
  --ml-onyx: #1a1a1a;
  --ml-marble: #f8f6f3;
  --ml-gold: #c9a96e;
  --ml-taupe: #8a7968;
  --ml-light: #e8e0d6;
}

/* Marble texture background */
.ml-marble-bg {
  background-color: var(--ml-marble);
  background-image:
    radial-gradient(ellipse at 20% 50%, rgba(138, 121, 104, 0.03) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(201, 169, 110, 0.02) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 80%, rgba(138, 121, 104, 0.03) 0%, transparent 45%);
}

/* Gold line separator */
.ml-gold-line {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--ml-gold) 20%,
    var(--ml-gold) 80%,
    transparent 100%
  );
  opacity: 0.3;
}

/* Luxury text spacing */
.ml-luxury-text {
  font-family: Georgia, 'Times New Roman', serif;
  letter-spacing: 0.1em;
  line-height: 1.8;
}

/* Elegant hover underline */
.ml-underline-hover {
  position: relative;
}
.ml-underline-hover::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 1px;
  background: var(--ml-gold);
  transition: all 0.5s ease-in-out;
  transform: translateX(-50%);
}
.ml-underline-hover:hover::after {
  width: 100%;
}

/* Subtle marble card shadow */
.ml-card-shadow {
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.5s ease-in-out;
}
.ml-card-shadow:hover {
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.06);
}`,

  aiRules: `You are a Marble Luxury design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- High-saturation neon or fluorescent colors
- Thick borders (border-4 and above)
- Hard offset shadows (shadow-[Npx_Npx_0px])
- Bold aggressive typography (font-black uppercase)
- Dense information layouts with small spacing
- Cartoon, hand-drawn, or rough visual elements
- Pure white bg-white (use warmer #f8f6f3)
- Playful or casual design elements

## Must Follow

- Warm marble white bg-[#f8f6f3] as primary background
- Onyx black text-[#1a1a1a] for text
- Antique gold #c9a96e only for borders, separators, and subtle accents
- Serif fonts font-serif throughout
- Wide letter spacing tracking-[0.2em] or more on labels
- Generous whitespace: py-20+ for sections, p-12 for cards
- Fine 1px borders: border border-[#c9a96e]/20
- Slow transitions: duration-500 ease-in-out
- Very subtle shadows: shadow-[0_2px_20px_rgba(0,0,0,0.04)]

## Color Palette

Primary:
- Onyx: #1a1a1a
- Marble White: #f8f6f3
- Antique Gold: #c9a96e
- Warm Taupe: #8a7968
- Light Marble: #e8e0d6

## Unique Elements (Marble Luxury-Only)

1. Marble texture: radial-gradient overlays simulating stone veining
2. Gold line separators: 1px border-t border-[#c9a96e]/20 or custom gradient lines
3. Extreme whitespace: p-12, py-20, generous margins for breathing room
4. Underline-on-hover: animated gold underlines expanding from center
5. Frame borders: fine gold border inset from page edges as decorative framing

## Animation & Interaction Rules

- Monumental Weight: 元素位置保持稳定，避免 hover 位移和缩放，重量感通过光影层次变化体现。
- Foil Stamping Shift: 金色/玫瑰金文字在 hover 时可做缓慢流光位移（bg-position），模拟金属抛光反射。
- Cold & Rigid: active 状态不做弹性形变，使用轻微 inset 阴影表达冷硬材质被按压的触感。
- Polish Gleam: 卡片仅做低频、低幅度亮度与阴影变化（duration-700），维持大理石抛光质地。`,

  aiRulesEn: `You are a Marble Luxury design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- High-saturation neon or fluorescent colors
- Thick borders (border-4 and above)
- Hard offset shadows (shadow-[Npx_Npx_0px])
- Bold aggressive typography (font-black uppercase)
- Dense information layouts with small spacing
- Cartoon, hand-drawn, or rough visual elements
- Pure white bg-white (use warmer #f8f6f3)
- Playful or casual design elements

## Must Follow

- Warm marble white bg-[#f8f6f3] as primary background
- Onyx black text-[#1a1a1a] for text
- Antique gold #c9a96e only for borders, separators, and subtle accents
- Serif fonts font-serif throughout
- Wide letter spacing tracking-[0.2em] or more on labels
- Generous whitespace: py-20+ for sections, p-12 for cards
- Fine 1px borders: border border-[#c9a96e]/20
- Slow transitions: duration-500 ease-in-out
- Very subtle shadows: shadow-[0_2px_20px_rgba(0,0,0,0.04)]

## Color Palette

Primary:
- Onyx: #1a1a1a
- Marble White: #f8f6f3
- Antique Gold: #c9a96e
- Warm Taupe: #8a7968
- Light Marble: #e8e0d6

## Unique Elements (Marble Luxury-Only)

1. Marble texture: radial-gradient overlays simulating stone veining
2. Gold line separators: 1px border-t border-[#c9a96e]/20 or custom gradient lines
3. Extreme whitespace: p-12, py-20, generous margins for breathing room
4. Underline-on-hover: animated gold underlines expanding from center
5. Frame borders: fine gold border inset from page edges as decorative framing

## Animation & Interaction Rules

- Monumental Weight: Elements maintain stable positions, avoiding hover displacement and scaling. Weight is conveyed through light-shadow layer changes.
- Foil Stamping Shift: Gold/rose-gold text on hover can do slow flowing highlight shift (bg-position), simulating polished metal reflection.
- Cold & Rigid: Active state does not use elastic deformation. Use slight inset shadow to express the tactile feel of cold, hard material being pressed.
- Polish Gleam: Cards only do low-frequency, low-amplitude brightness and shadow changes (duration-700), maintaining the polished marble texture.`,

  examplePrompts: [
    {
      title: "大理石奢华品牌展示页",
      titleEn: "Marble Luxury Brand Showcase",
      description:
        "大理石纹理与金色装饰的高端品牌展示页面，极致留白和优雅排版",
      descriptionEn:
        "High-end brand showcase with marble textures, gold accents, extreme whitespace, and elegant serif typography",
      prompt: `Use Marble Luxury style to create a luxury brand showcase page:
1. Background: warm marble #f8f6f3 with subtle radial-gradient texture overlays
2. Gold frame: fine 1px gold border inset from page edges
3. Hero: elegant serif title, gold separator lines above and below subtitle
4. Cards: generous padding p-12, fine gold borders, ultra-subtle shadows
5. Buttons: black bg with gold border, hover transitions to gold bg (duration-500)
6. Inputs: underline-only style, gold focus border
7. Typography: font-serif throughout, tracking-[0.2em]+ on labels, relaxed leading`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 大理石奢华风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Marble Luxury style",
      prompt: `Create a SaaS landing page using Marble Luxury style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 大理石奢华风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Marble Luxury style",
      prompt: `Create a portfolio showcase page using Marble Luxury style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "marble-luxury-warm",
      name: "大理石奢华暖色版",
      nameEn: "Marble Luxury Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#1a1a1a",
        secondary: "#f9f7f4",
        accent: ["#a6b468", "#7e7d63", "#e2e2d4"],
      },
    },
    {
      id: "marble-luxury-cool",
      name: "大理石奢华冷色版",
      nameEn: "Marble Luxury Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#1a1a1a",
        secondary: "#dfdddb",
        accent: ["#e49f85", "#927672", "#eddedb"],
      },
    },
  ],
};
