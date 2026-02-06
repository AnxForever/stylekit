import { DesignStyle } from "./index";

export const wabiSabi: DesignStyle = {
  slug: "wabi-sabi",
  name: "侘寂风",
  nameEn: "Wabi-Sabi",
  description:
    "日本侘寂美学的数字化呈现，崇尚不完美之美、自然衰老之雅和极致留白之禅，以墨色、茶色和纸张质感传递东方诗意。",
  cover: "/styles/wabi-sabi.svg",
  styleType: "visual",
  tags: ["minimal", "expressive"],
  category: "minimal",
  colors: {
    primary: "#3a3a3a",
    secondary: "#f2ede4",
    accent: ["#8a9a7b", "#b5a78c", "#8b6f4e"],
  },
  keywords: ["侘寂", "日式", "禅", "不完美", "留白", "Ma", "纸张", "自然", "东方"],

  philosophy: `侘寂（Wabi-Sabi）是日本传统美学中最深层的哲学概念。

核心理念：
- 不完美之美：裂纹、磨损、不规则都是岁月赋予的美
- 间（Ma）：留白不是空无，是有意义的空间
- 自然衰变：万物生长、衰老、消逝的过程本身就是美
- 朴素之深：在极致的简约中发现深邃
- 一期一会：此刻即是唯一，不可再现`,

  doList: [
    "使用温暖的纸张色背景 bg-[#f7f3ec] bg-[#f2ede4]",
    "墨色为主要文字色 text-[#3a3a3a]",
    "极大的留白和间距 py-32 px-8",
    "使用衬线字体 font-serif",
    "极细的分隔线 border-[#d4cdc5]/30",
    "缓慢的渐入动画 transition-opacity duration-1000",
  ],

  dontList: [
    "禁止使用鲜艳色彩和高饱和度",
    "禁止使用厚重阴影和粗边框",
    "禁止密集排列元素",
    "禁止使用装饰性动画和弹跳效果",
  ],

  components: {
    button: {
      name: "按钮",
      description: "侘寂风按钮，极简素雅",
      code: `<button className="
  px-6 py-2.5
  bg-transparent
  text-[#3a3a3a] font-serif text-sm
  border-b border-[#3a3a3a]/30
  hover:border-[#3a3a3a]
  transition-colors duration-500
">
  Continue
</button>`,
    },
    card: {
      name: "卡片",
      description: "侘寂风卡片，纸张质感",
      code: `<div className="
  p-8
  bg-[#f2ede4]
  border-l border-[#d4cdc5]/40
">
  <h3 className="text-lg font-serif font-light text-[#3a3a3a] mb-4">Title</h3>
  <p className="text-sm text-[#8a8278] leading-relaxed">Content</p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "侘寂风输入框，底线",
      code: `<input
  type="text"
  placeholder="..."
  className="
    w-full px-0 py-2
    bg-transparent
    border-b border-[#d4cdc5]/50
    text-[#3a3a3a] font-serif
    placeholder-[#d4cdc5]
    focus:outline-none focus:border-[#8a9a7b]
    transition-colors duration-500
  "
/>`,
    },
  },

  globalCss: `/* Wabi-Sabi */
:root {
  --wabi-bg: #f7f3ec;
  --wabi-surface: #f2ede4;
  --wabi-text: #3a3a3a;
  --wabi-muted: #8a8278;
  --wabi-moss: #8a9a7b;
  --wabi-tea: #b5a78c;
  --wabi-clay: #8b6f4e;
  --wabi-border: #d4cdc5;
}`,

  aiRules: `You are designing in Wabi-Sabi style.
- Warm paper-toned backgrounds: #f7f3ec, #f2ede4
- Ink-like text color: #3a3a3a
- Muted natural accents: moss green #8a9a7b, tea brown #b5a78c
- Always use serif fonts (font-serif)
- Extreme whitespace: py-32, large gaps between sections
- Ultra-thin borders: border-[#d4cdc5]/30
- Slow transitions: duration-500 or longer
- No bold colors, no heavy shadows, no decorative elements
- Embrace asymmetry and imperfection
- Think "zen garden" and "ceramic pottery"`,
};
