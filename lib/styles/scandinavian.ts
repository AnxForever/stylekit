import { DesignStyle } from "./index";

export const scandinavian: DesignStyle = {
  slug: "scandinavian",
  name: "北欧极简风",
  nameEn: "Scandinavian Minimalism",
  description:
    "源自北欧的温暖极简设计，强调自然材质、舒适留白、木质色调和Hygge生活美学，营造宁静温馨的视觉体验。",
  cover: "/styles/scandinavian.svg",
  styleType: "visual",
  tags: ["minimal", "modern"],
  category: "minimal",
  colors: {
    primary: "#3d3d3d",
    secondary: "#f5f0eb",
    accent: ["#5a7a6b", "#7ba0b8", "#c9a88c"],
  },
  keywords: ["北欧", "斯堪的纳维亚", "Hygge", "木质", "自然", "温暖", "留白", "舒适"],

  philosophy: `北欧极简风（Scandinavian Minimalism）源自丹麦、瑞典、挪威、芬兰等北欧国家的设计传统。

核心理念：
- 少即是多：每个元素都有存在的理由
- 自然连接：使用木材、亚麻等自然材质的色调
- Hygge 精神：营造温馨、舒适、幸福的氛围
- 功能之美：实用性与美感的完美平衡
- 光的崇拜：大量留白模拟北欧的自然光线`,

  doList: [
    "使用温暖的灰白色背景 bg-[#f5f0eb]",
    "选择自然木质色系 text-[#a89279]",
    "大量留白创造呼吸感 py-28 px-6",
    "使用细腻的字重 font-extralight font-light",
    "极简的边框和分隔 border-[#d4cdc5]/40",
    "平滑缓慢的过渡动画 transition-colors duration-500",
    "交互以亮度和色温微调为主，模拟羊毛和木材的温润触感",
    "悬停提示优先使用边框或背景的细微变化，避免强阴影和明显位移",
    "次级文本在 hover 时缓慢提亮，强化排版呼吸感",
  ],

  dontList: [
    "禁止使用高饱和度的鲜艳色彩",
    "禁止使用粗重的边框和阴影",
    "禁止密集排列元素，保持充分留白",
    "禁止使用装饰性字体或过大字号",
    "禁止弹跳、回弹或快速 scale 动效",
    "禁止使用强烈按压反馈（active 仅允许细微明暗变化）",
  ],

  components: {
    button: {
      name: "按钮",
      description: "北欧极简风按钮，含蓄优雅",
      code: `<button className="
  px-10 py-3.5
  bg-[#3d3d3d] text-[#f5f0eb]
  font-light text-sm tracking-wide
  rounded-sm
  hover:bg-[#5a7a6b]
  hover:brightness-95
  active:bg-[#4a6358]
  transition-all duration-700 ease-in-out
">
  explore
</button>`,
    },
    card: {
      name: "卡片",
      description: "北欧极简风卡片，自然简约",
      code: `<div className="
  group p-10
  bg-white/60
  rounded-sm
  border border-[#d4cdc5]/30
  hover:border-[#d4cdc5]/80
  hover:bg-[#fcfaf8]
  transition-all duration-700 ease-in-out
">
  <h3 className="text-xl font-light text-[#3d3d3d] mb-4 tracking-wide group-hover:text-[#5a7a6b] transition-colors duration-700">
    Hygge Moment
  </h3>
  <p className="text-sm font-light text-[#a89279] leading-relaxed group-hover:text-[#8a7660] transition-colors duration-700">
    Embracing the quiet comfort of simple things with balanced light, texture, and breath.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "北欧极简风输入框，底部边框",
      code: `<input
  type="text"
  placeholder="Your name"
  className="
    w-full px-4 py-2.5
    bg-transparent
    border-b border-[#d4cdc5]
    text-[#3d3d3d]
    placeholder-[#d4cdc5]
    focus:outline-none focus:border-[#5a7a6b]
    transition-colors
  "
/>`,
    },
  },

  globalCss: `/* Scandinavian Minimalism */
:root {
  --scandinavian-bg: #f5f0eb;
  --scandinavian-text: #3d3d3d;
  --scandinavian-muted: #a89279;
  --scandinavian-accent: #5a7a6b;
  --scandinavian-border: #d4cdc5;
}`,

  aiRules: `You are designing in Scandinavian Minimalism style.
- Use warm neutral tones: birch white #f5f0eb, charcoal #3d3d3d, wool gray #d4cdc5
- Accent with natural colors: pine green #5a7a6b, fjord blue #7ba0b8
- Font weights: extralight and light only
- Generous whitespace and breathing room
- Subtle borders and transitions
- No bright colors, no heavy shadows
- Lowercase text for a calm, approachable feel

## Animation & Interaction Rules

- Warm Texture: 动效应传达天然材质触感，优先亮度/色温微调，避免弹跳与缩放。
- Morning Fog: 过渡建议使用 duration-700 + ease-in-out，像晨雾散去般缓慢显现。
- Silent Elevation: hover 提示优先边框和底色细微变化，阴影保持极轻或省略。
- No Impact: active 状态仅做轻微明暗反馈，不做明显形变。`,
};
