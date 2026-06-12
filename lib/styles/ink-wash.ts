import type { DesignStyle } from "./types";

export const inkWash: DesignStyle = {
  slug: "ink-wash",
  name: "水墨画风",
  nameEn: "Ink Wash",
  description:
    "源自中国传统水墨画的设计风格，以墨色浓淡干湿变化营造空灵意境，大量留白表达'气韵生动'，适合文化品牌、茶道、书法和东方美学项目。",
  descriptionEn:
    "A design style rooted in traditional Chinese ink wash painting, creating ethereal moods through variations in ink density and moisture, with generous whitespace expressing 'vivid spirit resonance'. Ideal for cultural brands, tea ceremony, calligraphy, and Eastern aesthetics projects.",
  cover: "/styles/ink-wash.svg",
  styleType: "visual",
  tags: ["minimal", "expressive"],
  category: "minimal",
  colors: {
    primary: "#2c2c2c",
    secondary: "#f8f5f0",
    accent: ["#6b7b6e", "#a89279", "#c4b9a8", "#697a7c"],
  },
  keywords: ["水墨", "国画", "留白", "意境", "东方", "书法", "文化", "气韵", "minimal", "clean"],

  philosophy: `水墨画风（Ink Wash）源自中国传统绘画的千年美学体系，以"墨分五色"诠释万象。

核心理念：
- 气韵生动：谢赫六法之首，追求画面的生命力与精神气质
- 墨分五色：焦、浓、重、淡、清，仅凭墨色浓淡即表现丰富层次
- 计白当黑：留白不是空缺，而是意境的延伸与想象的空间
- 以形写神：不求形似，但求神韵，超越表象触及本质
- 气韵贯通：笔断意连，形散神聚，整体气韵一脉相承

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Ink Wash originates from the millennia-old aesthetic system of traditional Chinese painting, interpreting all things through "ink divided into five tones."

Core principles:
- Vivid spirit resonance: the foremost of Xie He's Six Principles, pursuing the vitality and spiritual quality of the composition
- Five tones of ink: scorched, dense, heavy, light, and clear -- expressing rich layers through ink density alone
- Counting white as black: whitespace is not absence, but an extension of mood and space for imagination
- Capturing spirit through form: not seeking likeness of form, but pursuing spiritual essence, transcending appearance to touch the core
- Continuous qi flow: where the brush breaks, the intent continues; form scatters but spirit gathers, the overall qi flows as one`,

  doList: [
    "使用宣纸色温暖背景 bg-[#f8f5f0]",
    "墨色为主要文字色 text-[#2c2c2c]",
    "慷慨的留白营造意境 py-32 px-8",
    "使用衬线字体呼应书法质感 font-serif",
    "水墨感的细边框分隔 border-[#2c2c2c]/20",
    "缓慢过渡动画模拟墨色晕染 transition-all duration-700",
    "交互反馈以墨色渐深和边界渗透为主，避免明显位移动画",
  ],

  doListEn: [
    "Use xuan-paper warm backgrounds bg-[#f8f5f0]",
    "Ink color as primary text color text-[#2c2c2c]",
    "Generous whitespace to create mood py-32 px-8",
    "Use serif fonts for calligraphic texture font-serif",
    "Ink-wash thin border dividers border-[#2c2c2c]/20",
    "Slow transition animations mimicking ink diffusion transition-all duration-700",
    "Interaction feedback focuses on ink color deepening and border bleeding, avoiding obvious displacement animations",
  ],

  dontList: [
    "禁止使用鲜艳饱和色彩，水墨以灰调为主",
    "禁止使用厚重阴影，破坏空灵意境",
    "禁止使用粗边框，水墨线条应如毛笔般纤细",
    "禁止使用装饰性动画和弹跳效果，保持静谧",
    "禁止 spring 或 bounce 交互曲线，避免机械弹性",
  ],

  dontListEn: [
    "Do not use vivid saturated colors -- ink wash is primarily gray-toned",
    "Do not use heavy shadows -- they break the ethereal mood",
    "Do not use thick borders -- ink wash lines should be as delicate as brush strokes",
    "Do not use decorative animations or bounce effects -- maintain tranquility",
    "Do not use spring or bounce interaction curves -- avoid mechanical elasticity",
  ],

  components: {
    button: {
      name: "按钮",
      description: "水墨画风按钮，透明底色配以底部墨线",
      code: `<button className="
  px-10 py-3
  bg-transparent
  text-[#2c2c2c] font-serif text-sm tracking-[0.2em]
  border-b border-[#2c2c2c]/30
  hover:border-[#2c2c2c]
  hover:bg-[#2c2c2c]/5
  hover:shadow-[0_4px_20px_rgba(44,44,44,0.05)]
  active:bg-[#2c2c2c]/10
  active:shadow-[inset_0_2px_4px_rgba(44,44,44,0.1)]
  transition-all duration-1000 ease-in-out
">
  Continue
</button>`,
    },
    card: {
      name: "卡片",
      description: "水墨画风卡片，左侧墨色竖线",
      code: `<div className="
  group p-10
  bg-[#f8f5f0]
  border-l border-[#2c2c2c]/10
  hover:border-[#2c2c2c]/60
  hover:bg-[#f3efe8]
  transition-all duration-1000 ease-in-out
">
  <h3 className="text-xl font-serif font-light text-[#2c2c2c]/80 mb-6 tracking-widest group-hover:text-[#2c2c2c] transition-colors duration-700">
    山水之间
  </h3>
  <p className="text-sm text-[#a89279] font-serif leading-loose group-hover:text-[#6b7b6e] transition-colors duration-1000 ease-in-out">
    Ink flows where the mind wanders. In the vast white space, the invisible landscape emerges.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "水墨画风输入框，底部笔触墨线",
      code: `<input
  type="text"
  placeholder="..."
  className="
    w-full px-0 py-2
    bg-transparent
    border-b border-[#c4b9a8]/50
    text-[#2c2c2c] font-serif
    placeholder-[#c4b9a8]
    focus:outline-none focus:border-[#6b7b6e]
    transition-colors duration-700
  "
/>`,
    },
  },

  examplePrompts: [
    {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 水墨画风风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Ink Wash style",
      prompt: `Create a SaaS landing page using Ink Wash style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 水墨画风风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Ink Wash style",
      prompt: `Create a portfolio showcase page using Ink Wash style with project grid, about section, contact form, and consistent visual language.`,
    },
  ],

  globalCss: `/* Ink Wash */
:root {
  --ink-bg: #f8f5f0;
  --ink-surface: #f3efe8;
  --ink-text: #2c2c2c;
  --ink-muted: #a89279;
  --ink-moss: #6b7b6e;
  --ink-sand: #c4b9a8;
  --ink-border: #2c2c2c;
}
@keyframes ink-wash-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes ink-wash-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.ink-wash-card {
  position: relative;
  overflow: hidden;
}

.ink-wash-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(44, 44, 44, 0.05), transparent);
  pointer-events: none;
}

.ink-wash-card:hover::before {
  opacity: 1;
}

.ink-wash-gradient {
  background: linear-gradient(135deg, #2c2c2c, #6b7b6e);
}

.ink-wash-gradient-text {
  background: linear-gradient(135deg, #2c2c2c, #6b7b6e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.ink-wash-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(44, 44, 44, 0.08);
}

.ink-wash-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.ink-wash-animate-in {
  animation: ink-wash-fade-in 0.5s ease-out both;
}`,

  aiRules: `You are designing in Ink Wash (Chinese ink painting) style.
- Warm xuan-paper backgrounds: #f8f5f0, #f3efe8
- Ink-black text color: #2c2c2c
- Muted natural accents: moss green #6b7b6e, tea brown #a89279, sand #c4b9a8
- Always use serif fonts (font-serif) for calligraphic feel
- Extreme whitespace: py-32, large gaps between sections for "qi" flow
- Ultra-thin ink borders: border-[#2c2c2c]/20
- Slow transitions: duration-700 to mimic ink diffusion
- No bright saturated colors, no heavy shadows, no decorative elements
- Embrace generous emptiness -- whitespace IS the design
- Think "ink on xuan paper" and "mountain mist landscape"

## Animation & Interaction Rules

- Ink Bleed: 悬停时使用颜色渐深和微弱扩散阴影，模拟墨迹晕染，不做明显位移。
- Calligraphic Press: active 状态优先使用深色内阴影，模拟落笔压纸，不使用机械缩放。
- Flow of Qi: 交互节奏使用 duration-700 到 1000，配合 ease-in-out 保持空灵呼吸感。
- Whispering Text: 文本可从低对比缓慢过渡到清晰墨色，避免跳变式强化。`,

  aiRulesEn: `You are designing in Ink Wash (Chinese ink painting) style.
- Warm xuan-paper backgrounds: #f8f5f0, #f3efe8
- Ink-black text color: #2c2c2c
- Muted natural accents: moss green #6b7b6e, tea brown #a89279, sand #c4b9a8
- Always use serif fonts (font-serif) for calligraphic feel
- Extreme whitespace: py-32, large gaps between sections for "qi" flow
- Ultra-thin ink borders: border-[#2c2c2c]/20
- Slow transitions: duration-700 to mimic ink diffusion
- No bright saturated colors, no heavy shadows, no decorative elements
- Embrace generous emptiness -- whitespace IS the design
- Think "ink on xuan paper" and "mountain mist landscape"

Animation & Interaction Rules:
- Ink Bleed: On hover, use color deepening and faint diffusion shadows to simulate ink bleeding, without obvious displacement.
- Calligraphic Press: Active state prioritizes dark inner shadows, simulating brush pressing on paper, without mechanical scaling.
- Flow of Qi: Interaction rhythm uses duration-700 to 1000 with ease-in-out, maintaining ethereal breathing feel.
- Whispering Text: Text can slowly transition from low contrast to clear ink color, avoiding abrupt intensification.`,

  variants: [
    {
      id: "ink-wash-warm",
      name: "水墨画风暖色版",
      nameEn: "Ink Wash Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#2c2c2c",
        secondary: "#f9f6f2",
        accent: ["#687b75", "#979773", "#babca5"],
      },
    },
    {
      id: "ink-wash-cool",
      name: "水墨画风冷色版",
      nameEn: "Ink Wash Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#2c2c2c",
        secondary: "#dfddd8",
        accent: ["#717a69", "#b38d86", "#ccb6af"],
      },
    },
  ],
};
