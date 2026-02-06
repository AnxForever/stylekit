import { DesignStyle } from "./index";

export const collageArt: DesignStyle = {
  slug: "collage-art",
  name: "拼贴艺术风",
  nameEn: "Collage Art",
  description:
    "杂志拼贴和混合材料美学，纸片剪切、多层叠加、撕纸边缘和混搭字体，营造充满创意和手工感的视觉冲击。",
  cover: "/styles/collage-art.svg",
  styleType: "visual",
  tags: ["expressive", "retro"],
  category: "expressive",
  colors: {
    primary: "#2d2d2d",
    secondary: "#f5f0e8",
    accent: ["#e74c3c", "#3498db", "#f39c12", "#9b59b6"],
  },
  keywords: ["拼贴", "剪贴", "混合材质", "多层", "杂志", "撕纸", "混搭"],

  philosophy: `拼贴艺术风格源于达达主义和波普艺术的混合媒材传统，强调不同材料、字体和图像的碰撞与融合。

核心理念：
- 混合材质：不同纸张、字体和色彩的碰撞组合
- 多层叠加：元素像纸片一样层叠，带有微妙的旋转
- 撕纸边缘：不规则的边缘模拟手工撕纸效果
- 杂志剪报：如同从杂志上剪下的字体和图像`,

  doList: [
    "使用混合字体（衬线和无衬线交替使用）",
    "元素添加微妙的旋转角度",
    "使用实线和虚线边框模拟剪切痕迹",
    "使用偏移阴影营造层叠效果",
    "保持陈旧纸张色作为底色",
    "大胆使用对比色块",
  ],

  dontList: [
    "禁止使用平滑渐变",
    "禁止统一整齐的样式",
    "禁止使用毛玻璃效果 (backdrop-blur)",
    "禁止使用完全圆形 (rounded-full)",
  ],

  components: {
    button: {
      name: "按钮",
      description: "拼贴艺术风格按钮",
      code: `<button className="
  px-7 py-3
  bg-[#e74c3c] text-white
  font-bold uppercase tracking-wider
  rounded-sm rotate-[-0.5deg]
  border-2 border-[#2d2d2d]
  shadow-[4px_4px_0px_#2d2d2d]
  hover:rotate-0
  hover:translate-x-[1px] hover:translate-y-[1px]
  hover:shadow-[2px_2px_0px_#2d2d2d]
  transition-all duration-200
">
  Cut & Paste
</button>`,
    },
    card: {
      name: "卡片",
      description: "拼贴艺术风格卡片",
      code: `<div className="
  p-8
  bg-[#f5f0e8]
  border-2 border-[#2d2d2d]
  rounded-none rotate-[0.5deg]
  shadow-[5px_5px_0px_#2d2d2d]
">
  <h3 className="text-2xl font-serif font-bold text-[#e74c3c] mb-3">
    COLLAGE
  </h3>
  <p className="text-[#2d2d2d]/70 font-sans">
    Cut, tear, paste, and layer
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "拼贴艺术风格输入框",
      code: `<input
  type="text"
  placeholder="Type here..."
  className="
    w-full px-5 py-3
    bg-[#f5f0e8]
    border-2 border-[#2d2d2d]
    rounded-none
    text-[#2d2d2d] placeholder-[#2d2d2d]/40
    focus:border-[#e74c3c]
    focus:shadow-[3px_3px_0px_#2d2d2d]
    focus:outline-none
    transition-all duration-200
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "拼贴艺术风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#f5f0e8]
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#2d2d2d] mb-2 rotate-[-1deg]">
      COLLAGE
    </h1>
    <h2 className="text-3xl md:text-5xl font-sans font-black text-[#e74c3c] mb-6 rotate-[0.5deg]">
      ART
    </h2>
    <p className="text-lg text-[#2d2d2d]/60 font-sans mb-8 max-w-xl mx-auto">
      Cut, tear, and reassemble reality
    </p>
    <button className="
      px-10 py-4
      bg-[#3498db] text-white
      font-bold uppercase tracking-wider
      rounded-sm rotate-[-0.5deg]
      border-2 border-[#2d2d2d]
      shadow-[4px_4px_0px_#2d2d2d]
      hover:rotate-0
      hover:translate-x-[1px] hover:translate-y-[1px]
      hover:shadow-[2px_2px_0px_#2d2d2d]
      transition-all duration-200
    ">
      Explore
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Collage Art Global Styles */

:root {
  --col-dark: #2d2d2d;
  --col-paper: #f5f0e8;
  --col-red: #e74c3c;
  --col-blue: #3498db;
  --col-yellow: #f39c12;
  --col-purple: #9b59b6;
}

/* Torn edge effect */
.col-torn {
  clip-path: polygon(
    0% 2%, 5% 0%, 12% 3%, 20% 1%, 28% 4%, 35% 0%, 42% 2%, 50% 0%,
    58% 3%, 65% 1%, 72% 4%, 80% 0%, 88% 2%, 95% 0%, 100% 3%,
    100% 97%, 95% 100%, 88% 98%, 80% 100%, 72% 97%, 65% 100%,
    58% 98%, 50% 100%, 42% 97%, 35% 100%, 28% 98%, 20% 100%,
    12% 97%, 5% 100%, 0% 98%
  );
}

/* Paper tape effect */
.col-tape::before {
  content: "";
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%) rotate(2deg);
  width: 60px;
  height: 20px;
  background: var(--col-yellow);
  opacity: 0.7;
  border: 1px solid var(--col-dark);
}

/* Newspaper text */
.col-newspaper {
  font-family: 'Times New Roman', serif;
  line-height: 1.2;
  columns: 2;
  column-gap: 20px;
  column-rule: 1px solid var(--col-dark);
}

/* Stamp effect */
.col-stamp {
  border: 3px dashed var(--col-dark);
  padding: 8px;
  position: relative;
}`,

  aiRules: `You are a Collage Art design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Clean gradients (bg-gradient-to-*)
- Uniform, neat styling
- Backdrop blur effects (backdrop-blur)
- Fully rounded shapes (rounded-full)
- Consistent font usage (mix serif and sans)

## Must Follow

- Aged paper background bg-[#f5f0e8]
- Dark charcoal for borders and text #2d2d2d
- Mix serif and sans-serif fonts
- Add slight rotation to elements rotate-[Ndeg]
- Hard offset shadows shadow-[Npx_Npx_0px_#2d2d2d]
- Sharp corners rounded-sm or rounded-none
- Dashed borders for torn-edge feel

## Color Palette

Primary:
- Dark Charcoal: #2d2d2d
- Aged Paper: #f5f0e8
- Cut Red: #e74c3c
- Magazine Blue: #3498db
- Paste Yellow: #f39c12
- Purple: #9b59b6

## Special Elements

- Slight element rotation (0.5-2 degrees)
- Torn paper edge clip-paths
- Paper tape decorations
- Dashed border stamps
- Mixed font families per section`,

  examplePrompts: [
    {
      title: "拼贴艺术杂志页面",
      titleEn: "Collage Art Magazine Page",
      description: "杂志拼贴风格的创意页面",
      descriptionEn: "Creative magazine-style collage page",
      prompt: `Use Collage Art style to create a magazine-style page:
1. Background: aged paper with layered paper cutouts
2. Title: mixed fonts with slight rotations
3. Cards: hard shadows with different rotation angles
4. Use torn edge effects and dashed borders
5. Bold color blocks of red, blue, yellow contrast`,
    },
  ],
};
