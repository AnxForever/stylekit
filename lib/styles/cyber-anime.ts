import { DesignStyle } from "./index";

export const cyberAnime: DesignStyle = {
  slug: "cyber-anime",
  name: "赛博动漫风",
  nameEn: "Cyber Anime",
  description:
    "融合赛博朋克科幻UI与动漫美学，以深色背景上的霓虹光效、全息投影感和锐利几何线条，打造未来感十足的动漫界面风格。",
  cover: "/styles/cyber-anime.svg",
  styleType: "visual",
  tags: ["expressive", "modern", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#7c3aed",
    secondary: "#0f0f1a",
    accent: ["#06d6a0", "#ff006e", "#38bdf8"],
  },
  keywords: ["赛博动漫", "科幻UI", "全息", "霓虹", "动漫", "未来"],

  philosophy: `Cyber Anime 将赛博朋克的冰冷科技感与动漫的表现力完美融合。

核心理念：
- 暗色基底：深邃的暗紫/暗蓝背景，营造科幻氛围
- 霓虹光效：紫色、青绿、粉红的霓虹发光效果
- 锐利线条：直角边框、科技感几何形状
- 全息投影：半透明叠加效果模拟全息界面
- 动漫表现力：大胆色彩对比，充满张力`,

  doList: [
    "使用深色背景 (#0f0f1a) 作为基底",
    "运用霓虹发光效果 (box-shadow glow)",
    "使用等宽或几何无衬线字体",
    "添加半透明边框和光效",
    "保持高对比度配色方案",
    "使用锐利的直角或小圆角",
  ],

  dontList: [
    "禁止使用柔和粉彩色",
    "禁止使用衬线字体",
    "禁止使用自然有机色彩（棕色、米色等）",
    "禁止使用 rounded-full 圆形元素",
    "禁止使用浅色/白色背景",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Cyber Anime 风格按钮",
      code: `<button className="
  px-6 py-3
  bg-[#7c3aed] text-white
  font-sans font-bold uppercase tracking-widest
  border border-[#06d6a0]/50
  shadow-[0_0_15px_rgba(124,58,237,0.5)]
  hover:shadow-[0_0_25px_rgba(124,58,237,0.7)]
  hover:border-[#06d6a0]
  transition-all duration-300
">
  EXECUTE
</button>`,
    },
    card: {
      name: "卡片",
      description: "Cyber Anime 风格卡片",
      code: `<div className="
  p-6
  bg-[#0f0f1a]/90
  border border-[#7c3aed]/30
  backdrop-blur-sm
  shadow-[0_0_20px_rgba(124,58,237,0.2)]
  hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]
  hover:border-[#7c3aed]/60
  transition-all duration-300
">
  <h3 className="text-xl font-bold text-[#06d6a0] uppercase tracking-wider mb-2">
    DATA PANEL
  </h3>
  <p className="text-[#e0e0ff]/60 text-sm">
    System status nominal
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Cyber Anime 风格输入框",
      code: `<input
  type="text"
  placeholder="Enter command..."
  className="
    w-full px-4 py-3
    bg-[#0f0f1a]/80
    border border-[#7c3aed]/30
    text-[#e0e0ff] placeholder-[#e0e0ff]/30
    font-mono
    focus:border-[#06d6a0]
    focus:shadow-[0_0_15px_rgba(6,214,160,0.3)]
    focus:outline-none
    transition-all duration-300
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Cyber Anime 风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#0f0f1a]
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-bold text-[#7c3aed] uppercase tracking-wider mb-4">
      CYBER
    </h1>
    <h2 className="text-4xl md:text-6xl font-bold text-[#06d6a0] uppercase tracking-wider mb-6">
      ANIME
    </h2>
    <p className="text-lg text-[#e0e0ff]/60 max-w-xl mx-auto mb-8">
      Where sci-fi meets anime aesthetics
    </p>
    <button className="
      px-10 py-4
      bg-[#7c3aed] text-white
      font-bold uppercase tracking-widest
      border border-[#06d6a0]/50
      shadow-[0_0_20px_rgba(124,58,237,0.5)]
      hover:shadow-[0_0_30px_rgba(124,58,237,0.7)]
      transition-all duration-300
    ">
      INITIALIZE
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Cyber Anime Global Styles */

:root {
  --cyber-purple: #7c3aed;
  --cyber-dark: #0f0f1a;
  --cyber-cyan: #06d6a0;
  --cyber-pink: #ff006e;
  --cyber-blue: #38bdf8;
  --cyber-text: #e0e0ff;
}

/* Neon glow effect */
.cyber-glow {
  box-shadow: 0 0 15px rgba(124, 58, 237, 0.4),
              0 0 30px rgba(124, 58, 237, 0.1);
}

/* Scan line overlay */
.cyber-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.05) 2px,
    rgba(0, 0, 0, 0.05) 4px
  );
  pointer-events: none;
}

/* Holographic shimmer */
.cyber-holo {
  background: linear-gradient(
    135deg,
    rgba(124, 58, 237, 0.1),
    rgba(6, 214, 160, 0.1),
    rgba(56, 189, 248, 0.1)
  );
}

/* Grid pattern overlay */
.cyber-grid {
  background-image:
    linear-gradient(rgba(124, 58, 237, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124, 58, 237, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}`,

  aiRules: `You are a Cyber Anime design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Soft pastel colors (no light pink, baby blue, etc.)
- Serif fonts of any kind
- Natural organic colors (brown, beige, olive, etc.)
- rounded-full on buttons or containers
- White or light backgrounds as primary surfaces

## Must Follow

- Dark background: bg-[#0f0f1a] as primary surface
- Primary purple: #7c3aed for key elements
- Cyan-green accent: #06d6a0 for highlights and borders
- Hot pink accent: #ff006e for emphasis and alerts
- Neon glow effects: shadow-[0_0_Xpx_rgba(...)]
- Geometric sans-serif or monospace fonts
- Semi-transparent borders: border-[color]/30
- High contrast text on dark backgrounds

## Color Palette

Primary:
- Deep Purple: #7c3aed
- Dark Background: #0f0f1a
- Cyan-Green: #06d6a0
- Hot Pink: #ff006e
- Sky Blue: #38bdf8
- Light Text: #e0e0ff

## Special Elements

- Neon glow box-shadows
- Scan line overlays
- Semi-transparent panel backgrounds
- Grid pattern backgrounds
- Sharp geometric shapes`,

  examplePrompts: [
    {
      title: "赛博动漫仪表盘",
      titleEn: "Cyber Anime Dashboard",
      description: "科幻风格的数据仪表盘",
      descriptionEn: "Sci-fi styled data dashboard",
      prompt: `Use Cyber Anime style to create a sci-fi dashboard page:
1. Background: dark (#0f0f1a) with subtle grid pattern
2. Cards: semi-transparent panels with neon borders
3. Accent colors: cyan-green highlights, purple glow effects
4. Typography: bold geometric sans-serif, uppercase tracking
5. Overall holographic, anime-sci-fi aesthetic`,
    },
  ],
};
