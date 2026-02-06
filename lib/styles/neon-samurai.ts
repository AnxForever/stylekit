import { DesignStyle } from "./index";

export const neonSamurai: DesignStyle = {
  slug: "neon-samurai",
  name: "霓虹武士风",
  nameEn: "Neon Samurai",
  description:
    "日本传统武士美学与霓虹赛博朋克的碰撞融合，刀锋般锐利的线条、汉字书法与霓虹光效交织，浮世绘遇见霓虹灯的未来都市武道。",
  cover: "/styles/neon-samurai.svg",
  styleType: "visual",
  tags: ["expressive", "modern", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#dc2626",
    secondary: "#0a0a0a",
    accent: ["#a020f0", "#38bdf8", "#fbbf24"],
  },
  keywords: ["霓虹武士", "赛博武士", "日本", "霓虹", "传统融合", "动作"],

  philosophy: `Neon Samurai 将日本传统武士道美学与赛博朋克霓虹灯光相融合，创造出一种充满张力的视觉风格。

核心理念：
- 锐利几何：刀锋般的直线条与锐角，拒绝柔和曲线
- 霓虹光效：暗色底面上的发光轮廓与阴影
- 传统融合：将�的汉字、�的浮世绘元素以数字化方式呈现
- 高对比度：深邃黑暗背景与鲜艳霓虹色彩的强烈反差
- 动态张力：每个元素都蕴含着蓄势待发的力量感`,

  doList: [
    "使用深色/纯黑背景",
    "添加霓虹发光效果（box-shadow glow）",
    "使用锐利的几何线条和尖角",
    "保持高对比度配色",
    "使用粗体无衬线字体",
    "加入红、紫、蓝霓虹色作为强调色",
  ],

  dontList: [
    "禁止使用柔和粉彩色调",
    "禁止使用 rounded-full 圆角",
    "禁止使用有机/不规则形状",
    "禁止使用衬线字体",
    "禁止使用浅色背景",
  ],

  components: {
    button: {
      name: "按钮",
      description: "霓虹武士风格按钮",
      code: `<button className="
  px-6 py-3
  bg-[#dc2626] text-white
  font-sans font-bold uppercase tracking-widest
  border border-[#dc2626]/60
  shadow-[0_0_15px_rgba(220,38,38,0.5)]
  hover:shadow-[0_0_25px_rgba(220,38,38,0.7)]
  hover:border-[#dc2626]
  transition-all duration-300
">
  Strike
</button>`,
    },
    card: {
      name: "卡片",
      description: "霓虹武士风格卡片",
      code: `<div className="
  p-8
  bg-[#0a0a0a]
  border border-[#dc2626]/30
  shadow-[0_0_15px_rgba(220,38,38,0.3)]
  hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]
  hover:border-[#dc2626]/60
  transition-all duration-300
">
  <h3 className="text-2xl font-sans font-bold text-[#dc2626] uppercase tracking-wider mb-3">
    BUSHIDO
  </h3>
  <p className="text-white/60 font-sans">
    The way of the warrior, illuminated by neon
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "霓虹武士风格输入框",
      code: `<input
  type="text"
  placeholder="Enter command..."
  className="
    w-full px-4 py-3
    bg-[#0a0a0a]
    border border-[#dc2626]/20
    text-white placeholder-white/30
    font-sans
    focus:border-[#dc2626]
    focus:shadow-[0_0_15px_rgba(220,38,38,0.4)]
    focus:outline-none
    transition-all duration-300
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "霓虹武士风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#0a0a0a]
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-sans font-bold text-[#dc2626] uppercase tracking-widest mb-2
      [text-shadow:0_0_30px_rgba(220,38,38,0.6)]">
      NEON
    </h1>
    <h2 className="text-4xl md:text-6xl font-sans font-bold text-[#a020f0] uppercase tracking-widest mb-6
      [text-shadow:0_0_20px_rgba(160,32,240,0.5)]">
      SAMURAI
    </h2>
    <p className="text-xl text-white/50 font-sans mb-8">
      Where tradition meets the electric frontier
    </p>
    <button className="
      px-10 py-4
      bg-[#dc2626] text-white
      font-sans font-bold uppercase tracking-widest
      border border-[#dc2626]
      shadow-[0_0_20px_rgba(220,38,38,0.5)]
      hover:shadow-[0_0_35px_rgba(220,38,38,0.7)]
      transition-all duration-300
    ">
      Enter the Dojo
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Neon Samurai Global Styles */

:root {
  --ns-red: #dc2626;
  --ns-black: #0a0a0a;
  --ns-purple: #a020f0;
  --ns-blue: #38bdf8;
  --ns-gold: #fbbf24;
}

/* Neon text glow */
.ns-text-glow {
  text-shadow: 0 0 20px var(--ns-red), 0 0 40px rgba(220, 38, 38, 0.3);
}

.ns-text-glow-purple {
  text-shadow: 0 0 20px var(--ns-purple), 0 0 40px rgba(160, 32, 240, 0.3);
}

/* Katana slash line */
.ns-slash {
  position: relative;
}
.ns-slash::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--ns-red), transparent);
  box-shadow: 0 0 10px var(--ns-red);
}

/* Scan line overlay */
.ns-scanlines::before {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.1) 2px,
    rgba(0, 0, 0, 0.1) 4px
  );
  pointer-events: none;
}`,

  aiRules: `You are a Neon Samurai design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Soft pastel colors or light backgrounds
- rounded-full or large border radius
- Organic/irregular shapes
- Serif fonts
- Light mode backgrounds (bg-white, bg-gray-50, etc.)

## Must Follow

- Dark backgrounds: bg-[#0a0a0a] or bg-black
- Neon red primary: #dc2626 with glow effects
- Neon glow shadows: shadow-[0_0_15px_rgba(220,38,38,0.5)]
- Bold geometric sans-serif fonts
- Sharp edges, no rounded corners beyond rounded-sm
- High contrast between dark bg and neon elements

## Color Palette

Primary:
- Neon Red: #dc2626
- Black: #0a0a0a
- Electric Purple: #a020f0
- Neon Blue: #38bdf8
- Gold: #fbbf24

## Special Elements

- Neon glow borders and shadows
- Katana slash decorative lines
- Scan line overlays
- Sharp angular geometry`,

  examplePrompts: [
    {
      title: "霓虹武士着陆页",
      titleEn: "Neon Samurai Landing Page",
      description: "武士道与赛博朋克融合的页面",
      descriptionEn: "Bushido meets cyberpunk landing page",
      prompt: `Use Neon Samurai style to create a dark, high-contrast landing page:
1. Background: pure black with neon glow accents
2. Title: bold sans-serif with neon red text-shadow glow
3. Cards: dark cards with neon border glow on hover
4. Use red, purple, blue neon colors as accents
5. Sharp geometric lines, no soft curves`,
    },
  ],
};
