import { DesignStyle } from "./index";

export const maximalism: DesignStyle = {
  slug: "maximalism",
  name: "极繁主义",
  nameEn: "Maximalism",
  description:
    "极繁主义设计——更多就是更多。层叠图案、混搭字体、饱和色彩、装饰性边框。与极简主义形成鲜明对比，拥抱丰富、华丽和视觉冲击。",
  cover: "/styles/maximalism.svg",
  styleType: "visual",
  tags: ["expressive", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#d4145a",
    secondary: "#1a0a2e",
    accent: ["#ffbe0b", "#3a86ff", "#8338ec", "#06d6a0"],
  },
  keywords: ["极繁", "华丽", "层叠", "混搭", "饱和", "装饰", "丰富"],

  philosophy: `极繁主义（Maximalism）是对极简主义的直接反叛。它相信"更多就是更多"，拒绝留白的克制，拥抱层叠、装饰和视觉丰富性。从巴洛克宫殿到波西米亚室内设计，极繁主义一直是人类表达欲望的自然产物。

在数字设计中，极繁主义表现为大胆的撞色组合、多种字体的混搭使用、层叠的装饰性边框和图案背景。每一寸屏幕空间都被赋予视觉意义，每个元素都争夺注意力，却又在整体构图中达到一种混乱的和谐。

核心理念：
- 层叠丰富：多层视觉元素堆叠，背景图案、装饰性边框、阴影、渐变叠加使用
- 饱和撞色：热粉、明黄、电蓝、亮紫、翠绿大胆组合，拒绝灰度中性色
- 混搭字体：同一页面中混用衬线、无衬线、手写体，每个区域有独立的字体个性
- 装饰至上：边框使用双线、虚线、波浪线等多种样式，按钮和卡片添加额外装饰层

极繁主义适合时尚品牌、艺术展览、音乐节官网和创意作品集等需要强烈视觉表达的场景。它不适合追求效率和简洁的工具类产品。

设计极繁主义作品的关键在于——虽然一切都很"满"，但并非毫无逻辑。颜色之间需要有对比关系，字体之间需要有层级关系，装饰元素需要有节奏韵律。极繁，但不混乱。`,

  doList: [
    "使用饱和撞色组合：bg-[#d4145a], bg-[#ffbe0b], bg-[#3a86ff], bg-[#8338ec], bg-[#06d6a0]",
    "混搭字体：标题 font-serif font-black，正文 font-sans，标签 font-mono",
    "使用双边框或装饰性边框：border-4 border-double, border-[3px] border-dashed",
    "添加多层阴影：shadow-[4px_4px_0px_#ffbe0b,8px_8px_0px_#3a86ff]",
    "使用渐变背景叠加：bg-gradient-to-br from-[#d4145a] via-[#8338ec] to-[#3a86ff]",
    "大胆使用 uppercase tracking-widest 和超大字号 text-6xl 以上",
    "卡片和容器添加装饰性伪元素和图案背景",
    "使用 rotate 和 skew 变换增加动态感",
  ],

  dontList: [
    "禁止使用灰度中性色（gray-300, gray-400, gray-500）作为主色",
    "禁止使用过多留白（gap-16 以上的间距）",
    "禁止使用单一字体贯穿全页",
    "禁止使用 1px 细边框（border 或 border-[1px]）",
    "禁止使用低饱和度配色（opacity-30 以下的主色）",
    "禁止使用极简的无装饰设计",
    "禁止使用纯白 bg-white 作为大面积背景",
  ],

  components: {
    button: {
      name: "按钮",
      description:
        "极繁主义按钮，多层阴影、渐变背景、粗边框和装饰性 hover 效果",
      code: `<button
  className="
    relative z-10 px-8 py-4
    bg-[#ff00ff]
    text-[#ffff00] font-black uppercase tracking-widest text-2xl
    border-4 border-[#ffbe0b]
    shadow-[8px_8px_0px_#00ffff]
    hover:z-50 hover:scale-110 hover:-rotate-3
    hover:bg-[#00ffff] hover:text-[#ff00ff] hover:border-[#ffff00]
    hover:shadow-[16px_16px_0px_#000]
    active:scale-90 active:rotate-6 active:shadow-none
    transition-all duration-150
  "
>
  OVERLOAD
</button>`,
    },
    card: {
      name: "卡片",
      description:
        "极繁主义卡片，渐变边框、多层装饰阴影和混搭字体排版",
      code: `<div className="group relative z-10 transition-all duration-200 hover:z-50 hover:scale-105 hover:rotate-2">
  {/* Decorative background layer */}
  <div className="absolute -top-2 -left-2 w-full h-full bg-[#ffbe0b] rounded-sm" />
  <div className="absolute -top-1 -left-1 w-full h-full bg-[#3a86ff] rounded-sm group-hover:bg-[#00ffff]" />
  <div
    className="
      relative
      p-8
      bg-[#ffff00]
      border-4 border-[#d4145a]
      rounded-sm
      shadow-[12px_12px_0px_#ff00ff]
      group-hover:bg-[#ff00ff] group-hover:shadow-[24px_24px_0px_#00ffff]
      transition-all duration-200
    "
  >
    <div className="absolute -top-8 -right-8 flex h-24 w-24 rotate-12 items-center justify-center rounded-full border-4 border-black bg-[#00ffff] text-3xl font-black text-black transition-all duration-200 group-hover:-rotate-45 group-hover:scale-150 group-hover:bg-[#ffff00]">
      !!!
    </div>

    <div className="flex items-center gap-3 mb-4">
      <span className="px-3 py-1 bg-[#ffbe0b] text-[#1a0a2e] text-xs font-mono font-bold uppercase tracking-wider">
        Featured
      </span>
      <span className="px-3 py-1 bg-[#06d6a0] text-[#1a0a2e] text-xs font-mono font-bold uppercase tracking-wider">
        New
      </span>
    </div>
    <h3 className="text-5xl font-serif font-black text-black mb-3 uppercase leading-none group-hover:text-[#ffff00] transition-colors">
      More is More
    </h3>
    <p className="text-xl font-bold text-black border-l-8 border-[#00ffff] pl-4 group-hover:text-white group-hover:border-[#ffff00] transition-colors">
      Why whisper when you can scream? Overlap, clash, and dominate the viewport.
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description:
        "极繁主义输入框，渐变聚焦边框、粗装饰线和混搭标签字体",
      code: `<div>
  <label className="block text-sm font-serif font-bold text-[#ffbe0b] uppercase tracking-widest mb-2">
    Your Name
  </label>
  <input
    type="text"
    placeholder="Type something bold..."
    className="
      w-full px-6 py-4
      bg-[#1a0a2e]
      border-4 border-[#8338ec]
      rounded-sm
      text-white placeholder-[#8338ec]/40
      font-sans text-lg
      focus:border-[#d4145a]
      focus:shadow-[0_0_0_4px_rgba(212,20,90,0.3)]
      focus:outline-none
      transition-all duration-200
    "
  />
  <p className="mt-2 text-xs font-mono text-[#06d6a0] tracking-wider">
    Express yourself freely
  </p>
</div>`,
    },
    hero: {
      name: "Hero 区块",
      description:
        "极繁主义 Hero 区域，渐变背景、多层装饰元素和超大标题排版",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-br from-[#1a0a2e] via-[#d4145a]/20 to-[#1a0a2e]
  relative overflow-hidden
">
  {/* Decorative circles */}
  <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-[#ffbe0b]/10 blur-sm" />
  <div className="absolute bottom-20 left-16 w-48 h-48 rounded-full bg-[#3a86ff]/10 blur-sm" />
  <div className="absolute top-1/3 left-1/4 w-32 h-32 border-4 border-[#8338ec]/20 rotate-45" />

  <div className="relative z-10 text-center px-6 max-w-4xl">
    <div className="inline-block px-4 py-1 mb-6 bg-[#ffbe0b] text-[#1a0a2e] font-mono font-bold text-xs uppercase tracking-[0.3em]">
      More is More
    </div>
    <h1 className="text-7xl md:text-9xl font-serif font-black text-white mb-4 uppercase leading-none">
      MAXI<span className="text-[#d4145a]">MAL</span>ISM
    </h1>
    <p className="text-xl md:text-2xl text-[#8338ec] font-sans mb-10">
      Embrace the excess. Reject the blank.
    </p>
    <div className="flex gap-4 justify-center flex-wrap">
      <button className="
        px-10 py-4
        bg-gradient-to-r from-[#d4145a] to-[#8338ec]
        text-white font-black uppercase tracking-widest
        border-4 border-[#ffbe0b]
        shadow-[4px_4px_0px_#ffbe0b,8px_8px_0px_#3a86ff]
        hover:shadow-[2px_2px_0px_#ffbe0b,4px_4px_0px_#3a86ff]
        hover:translate-x-[2px] hover:translate-y-[2px]
        transition-all duration-200
      ">
        Explore
      </button>
      <button className="
        px-10 py-4
        bg-transparent
        text-[#06d6a0] font-bold uppercase tracking-widest
        border-4 border-[#06d6a0]
        shadow-[4px_4px_0px_#06d6a0]
        hover:bg-[#06d6a0] hover:text-[#1a0a2e]
        hover:shadow-[2px_2px_0px_#ffbe0b]
        hover:translate-x-[2px] hover:translate-y-[2px]
        transition-all duration-200
      ">
        Learn More
      </button>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Maximalism Global Styles */

:root {
  --max-pink: #d4145a;
  --max-navy: #1a0a2e;
  --max-yellow: #ffbe0b;
  --max-blue: #3a86ff;
  --max-purple: #8338ec;
  --max-emerald: #06d6a0;
}

/* Multi-layer decorative border */
.max-border-layered {
  border: 4px solid var(--max-pink);
  box-shadow:
    4px 4px 0px var(--max-yellow),
    8px 8px 0px var(--max-blue);
}

/* Gradient text effect */
.max-gradient-text {
  background: linear-gradient(135deg, var(--max-pink), var(--max-purple), var(--max-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Pattern background - diagonal stripes */
.max-pattern-stripes {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255, 190, 11, 0.05) 10px,
    rgba(255, 190, 11, 0.05) 20px
  );
}

/* Decorative dotted background */
.max-pattern-dots {
  background-image: radial-gradient(
    circle,
    var(--max-purple) 1px,
    transparent 1px
  );
  background-size: 20px 20px;
}

/* Excessive glow effect */
.max-glow {
  text-shadow:
    0 0 10px var(--max-pink),
    0 0 30px rgba(212, 20, 90, 0.3),
    0 0 60px rgba(131, 56, 236, 0.2);
}`,

  aiRules: `You are a Maximalism design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Grayscale neutral backgrounds (gray-100 through gray-500)
- Single font family throughout (must mix at least 2)
- Thin 1px borders (border or border-[1px])
- Excessive whitespace and minimal layouts
- Low-saturation or muted color palettes
- Pure white bg-white as primary background
- Subtle, understated design choices

## Must Follow

- Deep navy background bg-[#1a0a2e] as base
- Saturated accent colors: #d4145a, #ffbe0b, #3a86ff, #8338ec, #06d6a0
- Thick borders border-4 with bold accent colors
- Multi-layer offset shadows shadow-[4px_4px_0px_color,8px_8px_0px_color]
- Mixed fonts: font-serif for headings, font-sans for body, font-mono for labels
- Gradient backgrounds bg-gradient-to-br/to-r with multiple accent stops
- uppercase tracking-widest on buttons and labels
- Decorative elements: dashed borders, color badges, pattern backgrounds

## Color Palette

Primary:
- Hot Pink: #d4145a
- Deep Navy: #1a0a2e
- Vivid Yellow: #ffbe0b
- Electric Blue: #3a86ff
- Vivid Purple: #8338ec
- Emerald: #06d6a0

## Unique Elements (Maximalism-Only)

1. Multi-layer shadows: shadow-[4px_4px_0px_#ffbe0b,8px_8px_0px_#3a86ff] for stacked depth
2. Gradient borders & backgrounds: from-[#d4145a] via-[#8338ec] to-[#3a86ff]
3. Mixed typography: font-serif headings, font-sans body, font-mono labels on same page
4. Decorative badges: colored tag spans with font-mono uppercase tracking
5. Double/dashed border accents: border-dashed border-[#8338ec]/50 as section dividers

## Animation & Interaction Rules

- Z-Index Popping: 悬停元素必须快速前置（hover:z-50）并放大旋转，主动从拥挤布局中“挤出”。
- Sensory Overload: hover 可同时触发颜色反转、阴影暴增和角度变化，维持高压视觉刺激。
- Snappy & Aggressive: 使用短时长（duration-100~200）快速切换，避免柔和优雅缓动。
- Active Chaos: active 允许强烈压缩与角度突变，制造失控但可读的“爆裂反馈”。`,

  examplePrompts: [
    {
      title: "极繁主义创意作品集",
      titleEn: "Maximalist Creative Portfolio",
      description:
        "极繁主义风格的创意作品集页面，多层装饰、渐变背景和混搭字体",
      descriptionEn:
        "Creative portfolio with layered decorations, gradient backgrounds, multi-layer shadows, and mixed typography",
      prompt: `Use Maximalism style to create a creative portfolio page:
1. Background: deep navy #1a0a2e with diagonal stripe pattern overlay
2. Hero: massive serif title with gradient text, multi-layer offset shadows
3. Cards: stacked colored background layers, thick pink borders, yellow and blue shadows
4. Navigation: gradient badges with mono uppercase labels
5. Buttons: gradient bg, thick yellow border, double-layer shadows
6. Typography: mix serif (headings), sans (body), mono (labels)
7. Color palette: hot pink, vivid yellow, electric blue, vivid purple, emerald`,
    },
  ],
};
