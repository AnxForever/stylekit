import { DesignStyle } from "./index";

export const wabiSabi: DesignStyle = {
  slug: "wabi-sabi",
  name: "侘寂风",
  nameEn: "Wabi-Sabi",
  description:
    "日本侘寂美学的数字化呈现，崇尚不完美之美、自然衰老之雅和极致留白之禅，以墨色、茶色和纸张质感传递东方诗意。",
  descriptionEn:
    "A digital expression of Japanese Wabi-Sabi aesthetics, celebrating the beauty of imperfection, the elegance of natural aging, and the zen of extreme whitespace, conveyed through ink tones, tea hues, and paper textures.",
  cover: "/styles/wabi-sabi.svg",
  styleType: "visual",
  tags: ["minimal", "expressive"],
  category: "minimal",
  colors: {
    primary: "#3a3a3a",
    secondary: "#f2ede4",
    accent: ["#8a9a7b", "#b5a78c", "#8b6f4e", "#799d91"],
  },
  keywords: ["侘寂", "日式", "禅", "不完美", "留白", "Ma", "纸张", "自然", "东方"],

  philosophy: `侘寂（Wabi-Sabi）是日本传统美学中最深层的哲学概念。

核心理念：
- 不完美之美：裂纹、磨损、不规则都是岁月赋予的美
- 间（Ma）：留白不是空无，是有意义的空间
- 自然衰变：万物生长、衰老、消逝的过程本身就是美
- 朴素之深：在极致的简约中发现深邃
- 一期一会：此刻即是唯一，不可再现

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Wabi-Sabi is the deepest philosophical concept in Japanese traditional aesthetics.

Core principles:
- Beauty of imperfection: cracks, wear, and irregularity are gifts bestowed by time
- Ma (space): whitespace is not emptiness, but meaningful space
- Natural decay: the process of growth, aging, and fading is itself beautiful
- Depth in simplicity: discovering profundity in ultimate simplicity
- Ichigo ichie: this moment is the only one, never to be repeated`,

  doList: [
    "使用温暖的纸张色背景 bg-[#f7f3ec] bg-[#f2ede4]",
    "墨色为主要文字色 text-[#3a3a3a]",
    "极大的留白和间距 py-32 px-8",
    "使用衬线字体 font-serif",
    "极细的分隔线 border-[#d4cdc5]/30",
    "缓慢的渐入动画 transition-opacity duration-1000",
  ],

  doListEn: [
    "Use warm paper-toned backgrounds bg-[#f7f3ec] bg-[#f2ede4]",
    "Ink color as primary text color text-[#3a3a3a]",
    "Extreme whitespace and spacing py-32 px-8",
    "Use serif fonts font-serif",
    "Ultra-thin divider lines border-[#d4cdc5]/30",
    "Slow fade-in animations transition-opacity duration-1000",
  ],

  dontList: [
    "禁止使用鲜艳色彩和高饱和度",
    "禁止使用厚重阴影和粗边框",
    "禁止密集排列元素",
    "禁止使用装饰性动画和弹跳效果",
  ],

  dontListEn: [
    "Do not use vivid colors or high saturation",
    "Do not use heavy shadows or thick borders",
    "Do not densely arrange elements",
    "Do not use decorative animations or bounce effects",
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

  examplePrompts: [
    {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 侘寂风风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Wabi-Sabi style",
      prompt: `Create a SaaS landing page using Wabi-Sabi style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 侘寂风风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Wabi-Sabi style",
      prompt: `Create a portfolio showcase page using Wabi-Sabi style with project grid, about section, contact form, and consistent visual language.`,
    },
  ],

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
}
@keyframes wabi-sabi-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes wabi-sabi-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.wabi-sabi-card {
  position: relative;
  overflow: hidden;
}

.wabi-sabi-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(58, 58, 58, 0.05), transparent);
  pointer-events: none;
}

.wabi-sabi-card:hover::before {
  opacity: 1;
}

.wabi-sabi-gradient {
  background: linear-gradient(135deg, #3a3a3a, #8a9a7b);
}

.wabi-sabi-gradient-text {
  background: linear-gradient(135deg, #3a3a3a, #8a9a7b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.wabi-sabi-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(58, 58, 58, 0.08);
}

.wabi-sabi-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.wabi-sabi-animate-in {
  animation: wabi-sabi-fade-in 0.5s ease-out both;
}

.wabi-sabi-focus { outline: 2px solid var(--wabi-sabi-primary, currentColor); outline-offset: 2px; }

/* Responsive utilities */
@media (prefers-reduced-motion: reduce) {
  .wabi-sabi-animate-in {
    animation: none;
  }
}

@media (min-width: 768px) {
  .wabi-sabi-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
}

/* Print styles */
@media print {
  .wabi-sabi-gradient,
  .wabi-sabi-frosted {
    background: none;
    backdrop-filter: none;
  }
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

  aiRulesEn: `You are designing in Wabi-Sabi style.
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

Animation & Interaction Rules:
- Absolute Stillness: The core of Wabi-Sabi is tranquility. Absolutely no translate (displacement), scale (scaling), or spring animations. Elements must remain still like stones.
- Shadowless Void: Abandon all box-shadow for modern depth. Layer hierarchy is expressed only through generous whitespace and very faint border lines.
- Dust Breathing: All interactions must be extremely slow. Use duration-1000 or longer transitions (e.g., duration-[1500ms]) with ease-in-out. Let background color deepening look like natural light slowly dimming.
- Ink Fading: On hover, text color should not change abruptly but transition through opacity changes (e.g., from opacity-60 slowly to opacity-100), simulating ink appearing through time.`,

  variants: [
    {
      id: "wabi-sabi-warm",
      name: "侘寂风暖色版",
      nameEn: "Wabi-Sabi Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#3a3a3a",
        secondary: "#f3efe7",
        accent: ["#7f9c84", "#a5ac89", "#757647"],
      },
    },
    {
      id: "wabi-sabi-cool",
      name: "侘寂风冷色版",
      nameEn: "Wabi-Sabi Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#3a3a3a",
        secondary: "#dad5cd",
        accent: ["#989679", "#c1a296", "#9a695f"],
      },
    },
  ],
};
