import { DesignStyle } from "./index";

export const glitchArt: DesignStyle = {
  slug: "glitch-art",
  name: "故障艺术风",
  nameEn: "Glitch Art",
  description:
    "数字故障美学风格，通过像素错位、RGB色彩分离、扫描线和数字损坏效果，呈现赛博朋克式的视觉冲击和数据腐蚀质感。",
  cover: "/styles/glitch-art.svg",
  styleType: "visual",
  tags: ["expressive", "modern", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#00ffff",
    secondary: "#0a0a0a",
    accent: ["#ff00ff", "#ffff00", "#ffffff"],
  },
  keywords: ["故障", "像素", "RGB分离", "扫描线", "数字损坏", "错位", "glitch"],

  philosophy: `Glitch Art 是一种拥抱数字错误与技术故障的艺术形式，将系统崩溃和数据损坏转化为视觉表达。

核心理念：
- RGB分离：将红绿蓝通道故意错位，产生色彩偏移
- 像素错位：文字和元素的位移与碎片化
- 扫描线：模拟CRT显示器的扫描线纹理
- 数字损坏：拥抱错误美学，打破完美的数字界面`,

  doList: [
    "使用RGB三原色（青、品红、黄）作为核心色彩",
    "添加文字和元素的RGB分离/偏移效果",
    "使用等宽字体（font-mono）",
    "保持深色/黑色背景",
    "添加扫描线纹理和噪点效果",
    "使用锐利的边角（rounded-sm或无圆角）",
  ],

  dontList: [
    "禁止使用柔和的粉色调",
    "禁止使用大圆角（rounded-lg以上）",
    "禁止使用衬线字体",
    "禁止使用自然色彩（绿色、棕色等大地色系）",
  ],

  components: {
    button: {
      name: "按钮",
      description: "故障风格按钮",
      code: `<button className="
  px-6 py-3
  bg-[#00ffff] text-[#0a0a0a]
  font-mono font-bold uppercase tracking-widest
  rounded-sm
  border border-[#00ffff]/30
  shadow-[2px_0_#ff00ff,-2px_0_#ffff00]
  hover:shadow-[4px_0_#ff00ff,-4px_0_#ffff00]
  transition-all duration-150
">
  EXECUTE
</button>`,
    },
    card: {
      name: "卡片",
      description: "故障风格卡片",
      code: `<div className="
  p-8
  bg-[#0a0a0a]
  border border-[#00ffff]/20
  rounded-sm
  relative overflow-hidden
">
  <h3 className="text-2xl font-mono font-bold text-[#00ffff] uppercase mb-3">
    DATA_BLOCK
  </h3>
  <p className="text-[#ffffff]/50 font-mono">
    Signal corrupted. Reconstructing...
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "故障风格输入框",
      code: `<input
  type="text"
  placeholder="INPUT_DATA..."
  className="
    w-full px-4 py-3
    bg-[#0a0a0a]
    border border-[#00ffff]/30
    rounded-sm
    text-[#00ffff] placeholder-[#00ffff]/30
    font-mono
    focus:border-[#00ffff]
    focus:shadow-[0_0_10px_#00ffff40]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "故障风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#0a0a0a]
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <div className="relative inline-block mb-6">
      <h1 className="text-6xl md:text-8xl font-mono font-bold text-[#00ffff] uppercase">
        GLITCH
      </h1>
      <h1 className="text-6xl md:text-8xl font-mono font-bold text-[#ff00ff] uppercase absolute top-[2px] left-[4px] opacity-60">
        GLITCH
      </h1>
      <h1 className="text-6xl md:text-8xl font-mono font-bold text-[#ffff00] uppercase absolute top-[-2px] left-[-4px] opacity-40">
        GLITCH
      </h1>
    </div>
    <p className="text-lg text-[#ffffff]/40 font-mono mb-8">
      ERROR_404: Reality not found
    </p>
  </div>
</section>`,
    },
  },

  globalCss: `/* Glitch Art Global Styles */

:root {
  --glitch-cyan: #00ffff;
  --glitch-magenta: #ff00ff;
  --glitch-yellow: #ffff00;
  --glitch-black: #0a0a0a;
  --glitch-white: #ffffff;
}

/* Scan line overlay */
.glitch-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 255, 0.03) 2px,
    rgba(0, 255, 255, 0.03) 4px
  );
  pointer-events: none;
}

/* RGB split text effect */
.glitch-rgb {
  position: relative;
}
.glitch-rgb::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 2px;
  color: #ff00ff;
  opacity: 0.6;
  clip-path: inset(0 0 50% 0);
}
.glitch-rgb::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: -2px;
  color: #ffff00;
  opacity: 0.4;
  clip-path: inset(50% 0 0 0);
}

/* Noise texture */
.glitch-noise::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  pointer-events: none;
}`,

  aiRules: `You are a Glitch Art design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Soft pastel colors or warm tones
- Rounded corners larger than rounded-sm
- Serif fonts
- Natural or earthy color palettes
- Smooth gradients

## Must Follow

- Primary palette: cyan #00ffff, magenta #ff00ff, yellow #ffff00
- Black background bg-[#0a0a0a]
- Monospace fonts font-mono
- RGB separation/offset shadows shadow-[2px_0_#ff00ff,-2px_0_#ffff00]
- Scan line overlays
- Sharp edges rounded-sm or rounded-none

## Color Palette

Primary:
- Cyan: #00ffff
- Magenta: #ff00ff
- Yellow: #ffff00
- Black: #0a0a0a
- White: #ffffff

## Special Elements

- RGB channel separation on text and borders
- Scan line overlays using repeating-linear-gradient
- Pixel displacement effects
- Noise/static texture overlays
- Glitch text animation with clip-path`,

  examplePrompts: [
    {
      title: "故障艺术着陆页",
      titleEn: "Glitch Art Landing Page",
      description: "数字故障风格的着陆页",
      descriptionEn: "Digital glitch aesthetic landing page",
      prompt: `Use Glitch Art style to create a cyberpunk landing page:
1. Background: pure black with scan line overlay
2. Title: large mono font with RGB split effect
3. Cards: dark panels with cyan neon border glow
4. Only use cyan, magenta, yellow on black
5. Overall digital corruption, CRT monitor aesthetic`,
    },
  ],
};
