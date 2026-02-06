import { DesignStyle } from "./index";

export const celShading: DesignStyle = {
  slug: "cel-shading",
  name: "赛璐璐动画风",
  nameEn: "Cel Shading",
  description:
    "模拟传统动画赛璐璐片的渲染风格，粗黑轮廓线、平面色块填充、无渐变阴影和鲜艳饱和色彩，充满卡通游戏的活力感。",
  cover: "/styles/cel-shading.svg",
  styleType: "visual",
  tags: ["expressive", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#1a1a2e",
    secondary: "#fafaf5",
    accent: ["#e63946", "#4ea8de", "#2ecc71", "#f1c40f"],
  },
  keywords: ["赛璐璐", "卡通", "轮廓线", "平面阴影", "动画", "游戏", "toon", "bold"],

  philosophy: `赛璐璐动画风（Cel Shading / Toon Shading）模拟传统手绘动画的视觉效果。

核心理念：
- 粗黑轮廓：所有元素都有明确的3px黑色边框
- 平面色块：使用纯色填充，无渐变
- 硬阴影：阴影是实体位移，不是模糊
- 高饱和度：色彩鲜艳、对比强烈
- 游戏化 UI：按钮、卡片像游戏菜单一样生动有趣`,

  doList: [
    "所有元素使用3px粗黑边框 border-[3px] border-[#1a1a2e]",
    "硬阴影效果 shadow-[3px_3px_0_#1a1a2e]",
    "使用纯色填充，不使用渐变 bg-[#e63946]",
    "字体加粗 font-black uppercase",
    "点击交互：阴影缩小+位移 hover:translate-x-0.5",
    "高饱和度配色：红、蓝、绿、黄",
  ],

  dontList: [
    "禁止使用渐变色（保持平面色块）",
    "禁止使用模糊阴影 shadow-lg",
    "禁止使用细边框 border",
    "禁止使用低饱和度或灰色调",
  ],

  components: {
    button: {
      name: "按钮",
      description: "赛璐璐风按钮，粗边框+硬阴影",
      code: `<button className="
  px-6 py-3
  bg-[#e63946] text-white
  font-black uppercase text-sm
  border-[3px] border-[#1a1a2e]
  shadow-[3px_3px_0_#1a1a2e]
  hover:shadow-[1px_1px_0_#1a1a2e]
  hover:translate-x-0.5 hover:translate-y-0.5
  active:shadow-none active:translate-x-1 active:translate-y-1
  transition-all
">
  Attack!
</button>`,
    },
    card: {
      name: "卡片",
      description: "赛璐璐风卡片，漫画面板",
      code: `<div className="
  p-6 bg-white
  border-[3px] border-[#1a1a2e]
  shadow-[4px_4px_0_#1a1a2e]
  hover:shadow-[6px_6px_0_#1a1a2e]
  hover:-translate-x-0.5 hover:-translate-y-0.5
  transition-all
">
  <h3 className="text-xl font-black text-[#1a1a2e] uppercase mb-2">Title</h3>
  <p className="font-bold text-[#1a1a2e]/60">Content</p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "赛璐璐风输入框，粗边框",
      code: `<input
  type="text"
  placeholder="Enter..."
  className="
    w-full px-4 py-2.5
    bg-[#fafaf5]
    border-[3px] border-[#1a1a2e]
    text-[#1a1a2e] font-bold
    placeholder-[#1a1a2e]/30
    focus:outline-none focus:border-[#e63946]
    transition-colors
  "
/>`,
    },
  },

  globalCss: `/* Cel Shading */
:root {
  --cel-bg: #fafaf5;
  --cel-ink: #1a1a2e;
  --cel-red: #e63946;
  --cel-blue: #4ea8de;
  --cel-green: #2ecc71;
  --cel-yellow: #f1c40f;
  --cel-purple: #9b59b6;
}`,

  aiRules: `You are designing in Cel Shading (Toon Shading) style.
- All elements MUST have 3px solid black borders: border-[3px] border-[#1a1a2e]
- Use hard offset shadows ONLY: shadow-[3px_3px_0_#1a1a2e]
- NO gradients, NO blur shadows, NO soft edges
- Flat saturated colors: #e63946, #4ea8de, #2ecc71, #f1c40f
- Text is always bold/black weight and uppercase
- Interactive elements shift on hover (shadow shrinks, element translates)
- Light background #fafaf5 with dark ink outlines
- Think "video game menu" or "cartoon UI"`,
};
