import { DesignStyle } from "./index";

export const cyberWafuu: DesignStyle = {
  slug: "cyber-wafuu",
  name: "赛博和风",
  nameEn: "Cyber Wafuu",
  description:
    "传统和风纹样与未来科技的数字化融合，折纸几何、青海波数字化重构、电路纹路与金箔光泽交织的日式赛博美学。",
  cover: "/styles/cyber-wafuu.svg",
  styleType: "visual",
  tags: ["expressive", "modern", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#1e3a5f",
    secondary: "#0a0a14",
    accent: ["#c41e3a", "#c9a227", "#38bdf8"],
  },
  keywords: ["赛博和风", "数字和风", "折纸", "日式科技", "传统纹样", "未来"],

  philosophy: `Cyber Wafuu 将日本传统和风美学通过数字化手法重新诠释，创造出一种优雅而未来感的视觉语言。

核心理念：
- 纹样数字化：青海波、麻叶、七宝等传统纹样以电路化方式重构
- 折纸几何：折纸的精确折叠线条转化为界面的结构分割
- 金箔科技：传统金箔工艺以数字光效方式呈现
- 朱与靛：传统朱红与现代靛蓝的配色对话
- 留白与密度：和风的留白美学与数字信息密度的平衡`,

  doList: [
    "使用深色背景（靛蓝或近黑）",
    "添加电蓝色作为科技感强调",
    "使用清晰的几何线条分割",
    "保持日式留白美学的间距",
    "使用几何无衬线字体",
    "加入朱红、金箔色作为传统元素点缀",
  ],

  dontList: [
    "禁止使用柔和粉彩色调",
    "禁止使用有机不规则形状",
    "禁止使用西方衬线字体",
    "禁止使用 rounded-full 圆角",
  ],

  components: {
    button: {
      name: "按钮",
      description: "赛博和风风格按钮",
      code: `<button className="
  px-6 py-3
  bg-[#1e3a5f] text-[#e2e8f0]
  font-sans font-semibold tracking-wider
  border border-[#1e3a5f]/60
  shadow-[0_0_12px_rgba(30,58,95,0.4)]
  hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]
  hover:border-[#38bdf8]/60
  transition-all duration-300
">
  Execute
</button>`,
    },
    card: {
      name: "卡片",
      description: "赛博和风风格卡片",
      code: `<div className="
  p-8
  bg-[#0a0a14]
  border border-[#1e3a5f]/30
  shadow-[0_0_15px_rgba(30,58,95,0.3)]
  hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]
  hover:border-[#38bdf8]/40
  transition-all duration-300
">
  <h3 className="text-2xl font-sans font-bold text-[#38bdf8] tracking-wider mb-3">
    SEIGAIHA
  </h3>
  <p className="text-[#e2e8f0]/50 font-sans">
    Traditional waves, digitally reborn
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "赛博和风风格输入框",
      code: `<input
  type="text"
  placeholder="Input..."
  className="
    w-full px-4 py-3
    bg-[#0a0a14]
    border border-[#1e3a5f]/30
    text-[#e2e8f0] placeholder-[#e2e8f0]/25
    font-sans
    focus:border-[#38bdf8]/60
    focus:shadow-[0_0_12px_rgba(56,189,248,0.3)]
    focus:outline-none
    transition-all duration-300
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "赛博和风风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#0a0a14]
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-sans font-bold text-[#38bdf8] uppercase tracking-widest mb-2
      [text-shadow:0_0_25px_rgba(56,189,248,0.4)]">
      CYBER
    </h1>
    <h2 className="text-4xl md:text-6xl font-sans font-bold text-[#c41e3a] uppercase tracking-wider mb-6
      [text-shadow:0_0_20px_rgba(196,30,58,0.4)]">
      WAFUU
    </h2>
    <p className="text-xl text-[#e2e8f0]/40 font-sans mb-8">
      Where tradition folds into the digital frontier
    </p>
    <button className="
      px-10 py-4
      bg-[#1e3a5f] text-[#e2e8f0]
      font-sans font-semibold tracking-wider
      border border-[#38bdf8]/40
      shadow-[0_0_15px_rgba(56,189,248,0.3)]
      hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]
      transition-all duration-300
    ">
      Unfold
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Cyber Wafuu Global Styles */

:root {
  --cw-indigo: #1e3a5f;
  --cw-dark: #0a0a14;
  --cw-vermillion: #c41e3a;
  --cw-gold: #c9a227;
  --cw-blue: #38bdf8;
}

/* Digital seigaiha wave pattern */
.cw-seigaiha {
  background-image:
    radial-gradient(circle at 50% 0%, transparent 70%, rgba(56, 189, 248, 0.04) 70%, rgba(56, 189, 248, 0.04) 72%, transparent 72%),
    radial-gradient(circle at 0% 50%, transparent 70%, rgba(56, 189, 248, 0.04) 70%, rgba(56, 189, 248, 0.04) 72%, transparent 72%);
  background-size: 40px 40px;
}

/* Circuit line decoration */
.cw-circuit::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    var(--cw-blue) 20%,
    transparent 40%,
    var(--cw-blue) 60%,
    transparent 80%,
    var(--cw-blue) 90%,
    transparent 100%
  );
  opacity: 0.3;
}

/* Gold foil shimmer */
.cw-gold-foil {
  background: linear-gradient(
    135deg,
    rgba(201, 162, 39, 0.1) 0%,
    rgba(201, 162, 39, 0.05) 50%,
    rgba(201, 162, 39, 0.15) 100%
  );
}

/* Origami fold line */
.cw-fold-line {
  position: relative;
}
.cw-fold-line::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  background: linear-gradient(180deg, transparent, var(--cw-blue), transparent);
  opacity: 0.15;
}`,

  aiRules: `You are a Cyber Wafuu design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Soft pastel colors
- Organic irregular shapes
- Western serif fonts
- rounded-full borders
- Light backgrounds (bg-white, bg-gray-50, etc.)

## Must Follow

- Dark backgrounds: bg-[#0a0a14] or bg-[#1e3a5f]
- Electric blue accent: #38bdf8 with glow effects
- Clean geometric sans-serif fonts (font-sans)
- Sharp edges with minimal border radius
- Japanese-inspired spacing and breathing room
- Vermillion #c41e3a and gold #c9a227 for traditional accents

## Color Palette

Primary:
- Indigo: #1e3a5f
- Dark Background: #0a0a14
- Vermillion: #c41e3a
- Gold Foil: #c9a227
- Electric Blue: #38bdf8

## Special Elements

- Digital seigaiha wave patterns
- Circuit line decorations
- Gold foil shimmer effects
- Origami fold line dividers`,

  examplePrompts: [
    {
      title: "赛博和风着陆页",
      titleEn: "Cyber Wafuu Landing Page",
      description: "传统和风纹样与数字科技融合的页面",
      descriptionEn: "Traditional Japanese patterns fused with digital tech",
      prompt: `Use Cyber Wafuu style to create a dark Japanese-tech landing page:
1. Background: dark with subtle seigaiha wave pattern
2. Title: clean sans-serif with electric blue glow
3. Cards: dark cards with indigo borders and blue hover glow
4. Use vermillion and gold as traditional accent colors
5. Clean geometric layout with generous Japanese-style spacing`,
    },
  ],
};
