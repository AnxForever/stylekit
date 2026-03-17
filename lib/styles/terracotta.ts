import { DesignStyle } from "./index";

export const terracotta: DesignStyle = {
  slug: "terracotta",
  name: "赤陶暖调",
  nameEn: "Terracotta",
  description:
    "地中海赤陶与暖色大地的设计风格，温暖的陶土色调、粗糙手工质感和自然纹理。适合生活方式品牌、餐饮、旅行和手工艺品展示。",
  descriptionEn:
    "A Mediterranean terracotta and warm earth design style with warm clay tones, rough handcrafted textures, and natural patterns. Ideal for lifestyle brands, dining, travel, and artisan product showcases.",
  cover: "/styles/terracotta.svg",
  styleType: "visual",
  tags: ["minimal", "modern"],
  category: "minimal",
  colors: {
    primary: "#b5654a",
    secondary: "#faf5ef",
    accent: ["#d4a373", "#7a6350", "#8b9d77", "#8fb86a"],
  },
  keywords: ["赤陶", "地中海", "暖调", "大地色", "手工", "陶土", "自然", "温暖", "minimal", "clean"],

  philosophy: `赤陶暖调（Terracotta）源自地中海沿岸数千年的陶艺传统，将烧制泥土的温暖色泽融入数字设计。

核心理念：
- 大地之温：以赤陶色（#b5654a）为主色调，传递泥土经火焰淬炼后的温暖
- 手工质感：圆润的边角与柔和的阴影模拟手工制品的触感
- 自然调和：奶油白底色搭配大地色系点缀，如同阳光洒落在陶器上
- 生命气息：橄榄绿（#8b9d77）作为植物色彩点缀，赋予设计生机
- 朴素之美：拒绝过度装饰，让材质与色彩本身说话

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Terracotta originates from the millennia-old pottery traditions of the Mediterranean coast, infusing the warm hues of fired earth into digital design.

Core principles:
- Warmth of earth: terracotta (#b5654a) as the primary color, conveying the warmth of clay tempered by flame
- Handcrafted texture: rounded corners and soft shadows simulate the tactile feel of handmade goods
- Natural harmony: cream white base with earth-tone accents, like sunlight falling on pottery
- Breath of life: olive green (#8b9d77) as a botanical accent, giving the design vitality
- Beauty of simplicity: rejecting over-decoration, letting materials and colors speak for themselves`,

  doList: [
    "使用温暖的奶油色背景 bg-[#faf5ef]",
    "用赤陶色作为主要强调色 text-[#b5654a]",
    "圆润的边角营造手工质感 rounded-lg rounded-xl",
    "温暖柔和的阴影 shadow-md shadow-[#b5654a]/10",
    "自然舒适的间距 py-20 px-6",
    "使用大地色系的渐变层次 #d4a373 #7a6350",
    "交互加入暖色光晕和稳重过渡，模拟日晒陶土的温热触感",
    "点击反馈使用下沉压印（active:translate-y）而非弹性缩放",
    "表单焦点边框使用赤陶或橄榄绿，避免冷色高亮外圈",
  ],

  doListEn: [
    "Use warm cream backgrounds bg-[#faf5ef]",
    "Use terracotta as the primary accent color text-[#b5654a]",
    "Rounded corners for handcrafted texture rounded-lg rounded-xl",
    "Warm soft shadows shadow-md shadow-[#b5654a]/10",
    "Natural comfortable spacing py-20 px-6",
    "Use earth-tone gradient layers #d4a373 #7a6350",
    "Add warm glow and steady transitions on interaction, simulating sun-baked clay warmth",
    "Click feedback uses press-down displacement (active:translate-y) rather than elastic scaling",
    "Form focus borders use terracotta or olive green, avoiding cold-color highlight rings",
  ],

  dontList: [
    "禁止使用冷色调如蓝色、紫色 bg-blue-* bg-purple-*",
    "禁止使用尖锐的直角 rounded-none rounded-sm",
    "禁止使用霓虹色或高饱和度荧光色",
    "禁止使用厚重的纯黑色 text-black bg-black",
    "禁止使用 bounce/spring 等轻飘弹性动画",
    "禁止使用刺眼的冷色 focus ring",
  ],

  dontListEn: [
    "Do not use cool tones like blue or purple bg-blue-* bg-purple-*",
    "Do not use sharp right angles rounded-none rounded-sm",
    "Do not use neon or high-saturation fluorescent colors",
    "Do not use heavy pure black text-black bg-black",
    "Do not use bounce/spring elastic animations",
    "Do not use harsh cold-color focus rings",
  ],

  components: {
    button: {
      name: "按钮",
      description: "赤陶暖调按钮，温暖圆润",
      code: `<button className="
  px-8 py-3.5
  bg-[#b5654a] text-[#faf5ef]
  text-sm font-medium tracking-wide
  rounded-lg
  shadow-[0_4px_12px_rgba(181,101,74,0.2)]
  hover:bg-[#a05a42]
  hover:shadow-[0_8px_20px_rgba(181,101,74,0.3)]
  hover:-translate-y-0.5
  active:translate-y-[2px]
  active:shadow-[0_0_0_rgba(181,101,74,0.2),inset_0_2px_4px_rgba(0,0,0,0.1)]
  transition-all duration-300 ease-out
">
  Explore
</button>`,
    },
    card: {
      name: "卡片",
      description: "赤陶暖调卡片，奶油底色配温暖阴影",
      code: `<div className="
  group p-8
  bg-[#faf5ef]
  rounded-xl
  border border-[#d4a373]/30
  shadow-[0_6px_16px_rgba(122,99,80,0.06)]
  hover:shadow-[0_12px_30px_rgba(181,101,74,0.12)]
  hover:border-[#b5654a]/40
  hover:-translate-y-1
  transition-all duration-300 ease-out
  cursor-pointer
">
  <div className="w-12 h-1 bg-[#8b9d77] mb-5 group-hover:w-16 transition-all duration-300 ease-out" />
  <h3 className="text-xl font-semibold text-[#7a6350] mb-3 group-hover:text-[#b5654a] transition-colors duration-300">
    Earthen Craft
  </h3>
  <p className="text-sm text-[#7a6350]/80 leading-relaxed font-medium">
    Molded by hand, baked by the sun. Interactions feel grounded, warm, and distinctly human.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "赤陶暖调输入框，温暖边框与圆角",
      code: `<input
  type="text"
  placeholder="Your name"
  className="
    w-full px-4 py-3
    bg-white
    border border-[#d4a373]/40
    rounded-lg
    text-[#7a6350]
    placeholder-[#d4a373]/50
    focus:outline-none
    focus:border-[#8b9d77]
    focus:shadow-[0_0_0_2px_rgba(139,157,119,0.2)]
    transition-all duration-300 ease-out
  "
/>`,
    },
  },

  examplePrompts: [
    {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 赤陶暖调风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Terracotta style",
      prompt: `Create a SaaS landing page using Terracotta style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 赤陶暖调风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Terracotta style",
      prompt: `Create a portfolio showcase page using Terracotta style with project grid, about section, contact form, and consistent visual language.`,
    },
  ],

  globalCss: `/* Terracotta Warmth */
:root {
  --terracotta-bg: #faf5ef;
  --terracotta-primary: #b5654a;
  --terracotta-sand: #d4a373;
  --terracotta-earth: #7a6350;
  --terracotta-olive: #8b9d77;
  --terracotta-border: #d4a373;
}
@keyframes terracotta-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes terracotta-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.terracotta-card {
  position: relative;
  overflow: hidden;
}

.terracotta-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(181, 101, 74, 0.05), transparent);
  pointer-events: none;
}

.terracotta-card:hover::before {
  opacity: 1;
}

.terracotta-gradient {
  background: linear-gradient(135deg, #b5654a, #d4a373);
}

.terracotta-gradient-text {
  background: linear-gradient(135deg, #b5654a, #d4a373);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.terracotta-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(181, 101, 74, 0.08);
}

.terracotta-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.terracotta-animate-in {
  animation: terracotta-fade-in 0.5s ease-out both;
}`,

  aiRules: `You are designing in Terracotta style inspired by Mediterranean clay craftsmanship.
- Use warm earth tones: cream #faf5ef, terracotta #b5654a, sand #d4a373, earth #7a6350
- Accent with olive green #8b9d77 for natural vitality
- Rounded corners (rounded-lg, rounded-xl) to evoke handcrafted ceramics
- Warm, soft shadows using terracotta-tinted shadow colors
- Generous spacing for a relaxed, inviting feel
- No cool blues, purples, or neon colors
- No sharp corners or heavy black elements
- Font weights: medium and semibold for headings, regular for body
- Think sun-baked clay, olive groves, and warm Mediterranean light

## Animation & Interaction Rules

- Sun-Baked Glow: 悬停时使用暖色光晕与背景加深，模拟陶土被阳光加热后的温润光感。
- Clay Press: active 禁止弹性缩放，使用 translate-y 与 inset shadow 呈现坚硬材质下压阻力。
- Handcrafted Slowness: 交互使用 duration-300 ease-out，避免现代感过强的弹跳反馈。
- Earthy Focus: 表单 focus 以赤陶或橄榄绿边框强化状态，避免刺眼蓝色外圈。`,

  aiRulesEn: `You are designing in Terracotta style inspired by Mediterranean clay craftsmanship.
- Use warm earth tones: cream #faf5ef, terracotta #b5654a, sand #d4a373, earth #7a6350
- Accent with olive green #8b9d77 for natural vitality
- Rounded corners (rounded-lg, rounded-xl) to evoke handcrafted ceramics
- Warm, soft shadows using terracotta-tinted shadow colors
- Generous spacing for a relaxed, inviting feel
- No cool blues, purples, or neon colors
- No sharp corners or heavy black elements

Animation & Interaction Rules:
- Sun-Baked Glow: On hover, use warm glow and background deepening to simulate the warm radiance of sun-heated clay.
- Clay Press: Active state forbids elastic scaling; use translate-y with inset shadow to convey hard material press-down resistance.
- Handcrafted Slowness: Interactions use duration-300 ease-out, avoiding overly modern bouncy feedback.
- Earthy Focus: Form focus uses terracotta or olive green borders to reinforce state, avoiding harsh blue rings.`,

  variants: [
    {
      id: "terracotta-warm",
      name: "赤陶暖调暖色版",
      nameEn: "Terracotta Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#97712f",
        secondary: "#fbf6f1",
        accent: ["#b3ae65", "#6c6849", "#7da081"],
      },
    },
    {
      id: "terracotta-cool",
      name: "赤陶暖调冷色版",
      nameEn: "Terracotta Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#c15d70",
        secondary: "#e1ddd7",
        accent: ["#ea9a8f", "#835f5d", "#9c9875"],
      },
    },
  ],
};
