import { DesignStyle } from "./index";

export const monochrome: DesignStyle = {
  slug: "monochrome",
  name: "单色极简",
  nameEn: "Monochrome",
  description:
    "纯黑白灰的极致单色设计，通过精确的灰阶层次、字重对比和负空间构建视觉层次，不依赖任何色彩即达到高级感。适合摄影、建筑和高端品牌。",
  cover: "/styles/monochrome.svg",
  styleType: "visual",
  tags: ["minimal", "high-contrast"],
  category: "minimal",
  colors: {
    primary: "#111111",
    secondary: "#fafafa",
    accent: ["#666666", "#999999", "#cccccc"],
  },
  keywords: ["单色", "黑白", "灰阶", "极简", "无色彩", "高级感", "摄影", "建筑"],

  philosophy: `单色极简（Monochrome）是对色彩的彻底放弃，仅凭黑、白、灰三者的精确调度构建完整的视觉层次。

核心理念：
- 零色相依赖：不使用任何带有色相（hue）的颜色，所有视觉信息由灰阶传达
- 灰阶层次：通过 #111111 到 #fafafa 之间的精确灰度梯度建立信息优先级
- 字重对比：以 font-light 与 font-bold 的差异替代色彩区分
- 负空间构图：大量留白不是空白，是设计的一部分
- 网格秩序：严格的网格系统确保每一个元素都有精确的位置`,

  doList: [
    "使用纯灰色调背景 bg-[#fafafa] 或 bg-white",
    "主要文字使用深灰 text-[#111111]，次要文字 text-[#666666]",
    "通过 font-light 和 font-bold 的字重对比建立层次",
    "大量负空间留白 py-24 px-8",
    "极细边框分隔 border-[#e5e5e5]",
    "网格布局对齐 grid-based layout",
  ],

  dontList: [
    "禁止使用任何带色相的颜色（无 blue/red/green/pink 等）",
    "禁止使用 rounded-full 圆形圆角",
    "禁止使用重阴影 shadow-lg shadow-xl shadow-2xl",
    "禁止使用渐变 bg-gradient-to-*",
  ],

  components: {
    button: {
      name: "按钮",
      description: "单色极简按钮，黑底白字，无圆角装饰",
      code: `<button className="
  px-6 py-3
  bg-[#111111] text-[#fafafa]
  text-sm font-medium tracking-wider uppercase
  rounded-sm
  hover:bg-[#333333]
  transition-colors duration-200
">
  Continue
</button>`,
    },
    card: {
      name: "卡片",
      description: "单色极简卡片，细边框，灰色背景",
      code: `<div className="
  p-6
  bg-[#f5f5f5]
  rounded-sm
  border border-[#e5e5e5]
  hover:border-[#999999]
  transition-colors duration-200
">
  <h3 className="text-lg font-bold text-[#111111] mb-3">Title</h3>
  <p className="text-sm font-light text-[#666666] leading-relaxed">Content</p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "单色极简输入框，仅底部边框",
      code: `<input
  type="text"
  placeholder="Your name"
  className="
    w-full px-4 py-2.5
    bg-transparent
    border-b border-[#cccccc]
    text-[#111111]
    placeholder-[#cccccc]
    focus:outline-none focus:border-[#111111]
    transition-colors duration-200
  "
/>`,
    },
  },

  globalCss: `/* Monochrome */
:root {
  --monochrome-bg: #fafafa;
  --monochrome-text: #111111;
  --monochrome-muted: #666666;
  --monochrome-subtle: #999999;
  --monochrome-border: #e5e5e5;
  --monochrome-surface: #f5f5f5;
}`,

  aiRules: `You are designing in Monochrome style.
- Use ONLY grayscale colors: #111111, #333333, #666666, #999999, #cccccc, #e5e5e5, #f5f5f5, #fafafa, #ffffff
- NEVER use any color with hue (no blue, red, green, pink, orange, etc.)
- Build hierarchy with font-weight contrast: font-light for body, font-bold for headings
- Use generous negative space (py-24, px-8) for breathing room
- Borders must be subtle: border-[#e5e5e5] only
- No rounded-full, no heavy shadows, no gradients
- Keep corners sharp: rounded-sm or rounded-none
- Uppercase tracking-wider for labels and small text
- Grid-based alignment for all layouts`,
};
