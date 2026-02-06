import { DesignStyle } from "./index";

export const acidGraphics: DesignStyle = {
  slug: "acid-graphics",
  name: "酸性平面设计",
  nameEn: "Acid Graphics",
  description:
    "高饱和度荧光色彩、扭曲字体、液态流动形态和迷幻视觉。源于锐舞文化和地下俱乐部美学，以强烈的视觉冲击力呈现反叛与实验精神。",
  cover: "/styles/acid-graphics.svg",
  styleType: "visual",
  tags: ["expressive", "high-contrast", "modern"],
  category: "expressive",
  colors: {
    primary: "#39ff14",
    secondary: "#0a0a0a",
    accent: ["#e6ff00", "#a020f0", "#ff6ec7"],
  },
  keywords: ["酸性", "迷幻", "荧光", "扭曲", "液态", "锐舞"],

  philosophy: `Acid Graphics 源于90年代锐舞文化和地下俱乐部场景，融合了赛博朋克、迷幻艺术和实验排版。

核心理念：
- 荧光色彩：使用高饱和度的荧光绿、酸性黄、电紫和赛博粉
- 暗色基底：深黑背景让荧光色彩更加刺眼和突出
- 扭曲变形：字体和形态的液态扭曲感
- 视觉冲击：追求强烈的、不舒适的、实验性的视觉体验`,

  doList: [
    "使用纯黑 #0a0a0a 作为主背景",
    "使用荧光色系（绿 #39ff14、黄 #e6ff00、紫 #a020f0、粉 #ff6ec7）",
    "使用等宽或无衬线粗体字",
    "保持直角边缘（rounded-none）",
    "使用硬边偏移阴影",
    "文字全部大写",
  ],

  dontList: [
    "禁止使用柔和的粉彩色",
    "禁止使用圆角（rounded-full 等）",
    "禁止使用衬线字体",
    "禁止使用微妙柔和阴影",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Acid Graphics 风格按钮",
      code: `<button className="
  px-6 py-3
  bg-[#39ff14] text-[#0a0a0a]
  font-mono font-bold uppercase tracking-widest
  rounded-none
  border-2 border-[#39ff14]
  shadow-[4px_4px_0px_#a020f0]
  hover:translate-x-[2px] hover:translate-y-[2px]
  hover:shadow-[2px_2px_0px_#a020f0]
  transition-all duration-150
">
  ACTIVATE
</button>`,
    },
    card: {
      name: "卡片",
      description: "Acid Graphics 风格卡片",
      code: `<div className="
  p-8
  bg-[#0a0a0a]
  border-2 border-[#39ff14]
  rounded-none
  shadow-[5px_5px_0px_#a020f0]
">
  <h3 className="text-2xl font-mono font-bold text-[#39ff14] uppercase mb-3">
    ACID_ZONE
  </h3>
  <p className="text-[#39ff14]/60 font-mono">
    Distorted reality interface
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Acid Graphics 风格输入框",
      code: `<input
  type="text"
  placeholder="ENTER_DATA..."
  className="
    w-full px-4 py-3
    bg-[#0a0a0a]
    border-2 border-[#39ff14]/60
    rounded-none
    text-[#39ff14] placeholder-[#39ff14]/30
    font-mono
    focus:border-[#39ff14]
    focus:shadow-[3px_3px_0px_#a020f0]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Acid Graphics 风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#0a0a0a]
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-mono font-black text-[#39ff14] uppercase mb-2 tracking-tighter">
      ACID
    </h1>
    <h2 className="text-4xl md:text-6xl font-mono font-black text-[#a020f0] uppercase -mt-2 mb-6 tracking-widest">
      GRAPHICS
    </h2>
    <p className="text-lg text-[#39ff14]/50 font-mono uppercase mb-8 tracking-wider">
      Distort // Warp // Dissolve
    </p>
    <button className="
      px-10 py-4
      bg-[#39ff14] text-[#0a0a0a]
      font-mono font-bold uppercase tracking-widest
      rounded-none
      border-2 border-[#39ff14]
      shadow-[5px_5px_0px_#ff6ec7]
      hover:translate-x-[2px] hover:translate-y-[2px]
      hover:shadow-[3px_3px_0px_#ff6ec7]
      transition-all
    ">
      ENTER
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Acid Graphics Global Styles */

:root {
  --acid-green: #39ff14;
  --acid-black: #0a0a0a;
  --acid-yellow: #e6ff00;
  --acid-purple: #a020f0;
  --acid-pink: #ff6ec7;
}

/* Scanline overlay */
.acid-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(57, 255, 20, 0.03) 2px,
    rgba(57, 255, 20, 0.03) 4px
  );
  pointer-events: none;
}

/* Glitch text effect */
.acid-glitch {
  position: relative;
}
.acid-glitch::before {
  content: attr(data-text);
  position: absolute;
  top: -2px;
  left: 2px;
  color: var(--acid-pink);
  opacity: 0.7;
  clip-path: inset(0 0 50% 0);
}
.acid-glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 2px;
  left: -2px;
  color: var(--acid-purple);
  opacity: 0.7;
  clip-path: inset(50% 0 0 0);
}

/* Fluorescent glow */
.acid-glow {
  text-shadow: 0 0 10px var(--acid-green), 0 0 20px var(--acid-green), 0 0 40px var(--acid-green);
}`,

  aiRules: `You are an Acid Graphics design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Soft pastel colors or muted tones
- Rounded corners (rounded-full, rounded-lg, etc.)
- Serif fonts of any kind
- Subtle or soft shadows (shadow-md, shadow-lg)
- Gradients (use flat fluorescent colors)

## Must Follow

- Dark background: bg-[#0a0a0a]
- Fluorescent colors: green #39ff14, yellow #e6ff00, purple #a020f0, pink #ff6ec7
- Monospace fonts: font-mono
- All uppercase: uppercase tracking-widest
- Sharp edges: rounded-none
- Hard offset shadows: shadow-[4px_4px_0px_color]
- Bold borders: border-2

## Color Palette

Primary:
- Fluorescent Green: #39ff14
- Black: #0a0a0a
- Acid Yellow: #e6ff00
- Electric Purple: #a020f0
- Cyber Pink: #ff6ec7

## Special Elements

- Scanline overlay effects
- Glitch text displacement
- Fluorescent glow (text-shadow)
- Hard geometric shapes on dark backgrounds`,

  examplePrompts: [
    {
      title: "酸性平面着陆页",
      titleEn: "Acid Graphics Landing Page",
      description: "荧光色迷幻风格的着陆页",
      descriptionEn: "Fluorescent psychedelic landing page",
      prompt: `Use Acid Graphics style to create a landing page:
1. Background: pure black #0a0a0a
2. Title: huge fluorescent green mono font, uppercase
3. Cards: dark with fluorescent borders and offset shadows
4. Only fluorescent colors on black
5. Overall psychedelic, distorted, rave culture aesthetic`,
    },
  ],
};
