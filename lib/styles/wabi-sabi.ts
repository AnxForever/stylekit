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
      code: `<button className="px-8 py-3 bg-transparent text-[#3a3a3a] font-serif text-sm tracking-[0.2em] border-b border-[#d4cdc5]/50 hover:border-[#3a3a3a] hover:bg-[#3a3a3a]/5 active:bg-[#3a3a3a]/10 transition-all duration-1000 ease-in-out">
  Enter Silence
</button>`,
    },
    card: {
      name: "卡片",
      description: "侘寂风卡片，纸张质感",
      code: `<div className="group p-12 bg-[#f2ede4] border-l border-[#d4cdc5]/30 hover:border-[#8a9a7b]/40 hover:bg-[#efebe1] transition-all duration-[1500ms] ease-in-out cursor-default">
  <h3 className="text-xl font-serif font-light text-[#3a3a3a]/70 mb-6 tracking-widest group-hover:text-[#3a3a3a] transition-colors duration-1000">
    Imperfect Beauty
  </h3>
  <p className="text-sm text-[#8a8278] font-serif leading-loose group-hover:text-[#5c564f] transition-colors duration-1000">
    Nothing lasts, nothing is finished, and nothing is perfect. The aesthetic of the unfinished leaves space for the mind to wander.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "侘寂风输入框，底线",
      code: `<div className="w-full max-w-sm">
  <input type="text" placeholder="..." className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#d4cdc5]/60 text-[#3a3a3a] font-serif placeholder-[#d4cdc5] focus:outline-none focus:border-[#8a9a7b]/60 transition-colors duration-1000 ease-in-out" />
</div>`,
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
- Think "zen garden" and "ceramic pottery"

## Animation & Interaction Rules
- Absolute Stillness: 侘寂的核心是静谧。绝对禁止使用任何 \`translate\`（位移）、\`scale\`（缩放）或弹簧动画。元素必须像石头一样静静待在原处。
- Shadowless Void: 放弃所有营造现代立体感的 \`box-shadow\`。界面的层次仅通过大量留白和非常微弱的边框线来表达。
- Dust Breathing: 所有交互必须极其极其缓慢。强制使用 \`duration-1000\` 甚至更长的过渡时间（如 \`duration-[1500ms]\`），配合 \`ease-in-out\`。让背景颜色的加深看起来像自然光线缓慢变暗。
- Ink Fading: 悬停（Hover）时，文本的颜色不要发生突变，而是通过改变透明度（如从 \`opacity-60\` 缓慢过渡到 \`opacity-100\`），模拟墨迹在时间中的显现。`,
};
