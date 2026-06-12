import type { DesignStyle } from "./types";

export const memphis: DesignStyle = {
  slug: "memphis",
  name: "孟菲斯风格",
  nameEn: "Memphis",
  description:
    "80年代意大利设计运动，大胆的几何图形、鲜艳的撞色、不规则形状和有趣的图案，打破传统设计规则。",
  descriptionEn:
    "An 80s Italian design movement featuring bold geometric shapes, vivid contrasting colors, irregular forms, and playful patterns that break traditional design rules.",
  cover: "/styles/memphis.svg",
  styleType: "visual",
  tags: ["retro", "expressive", "high-contrast"],
  category: "retro",
  colors: {
    primary: "#ff6b6b",
    secondary: "#feca57",
    accent: ["#48dbfb", "#ff9ff3", "#1dd1a1", "#5f27cd"],
  },
  keywords: ["孟菲斯", "几何", "撞色", "80年代", "波普", "图案", "大胆", "retro", "vintage", "nostalgic"],

  philosophy: `Memphis（孟菲斯）是1980年代由意大利设计师 Ettore Sottsass 创立的设计运动，以打破传统、拥抱混乱和趣味性著称。

核心理念：
- 反叛传统：打破功能主义的严肃设计
- 大胆撞色：鲜艳、对比强烈的色彩组合
- 几何图形：圆形、三角形、波浪线的自由组合
- 趣味性：设计应该有趣、令人愉悦

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Memphis is a design movement founded in the 1980s by Italian designer Ettore Sottsass, known for breaking traditions and embracing chaos and playfulness.

Core principles:
- Rebellion against tradition: Breaking the seriousness of functionalist design
- Bold contrasting colors: Vivid, high-contrast color combinations
- Geometric shapes: Free combinations of circles, triangles, and wavy lines
- Playfulness: Design should be fun and delightful`,

  doList: [
    "使用鲜艳的撞色组合",
    "添加几何图形装饰（圆、三角、波浪）",
    "使用粗边框 border-4",
    "不规则的布局和形状",
    "添加点状、条纹、波浪图案",
    "使用粗体无衬线字体",
    "卡片使用 group 类，内部几何装饰在 hover 时各自向不同方向位移或旋转（Playful Chaos，游乐场活泼感）",
    "按钮 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none（Toy Button Physics，玩具按键触感）",
    "标题和文字在 group-hover 时可瞬间切换高饱和撞色（Pop Swap，波普色彩反转），使用 transition-colors duration-150",
    "所有动画使用 duration-150 ease-out，保持波普玩具的干脆感",
    "按钮 hover 时换色并增大阴影：hover:bg-pink-400 hover:shadow-[8px_8px_0px_#000]（撞色波普强化）",
  ],

  doListEn: [
    "Use vivid contrasting color combinations",
    "Add geometric shape decorations (circles, triangles, waves)",
    "Use thick borders border-4",
    "Irregular layouts and shapes",
    "Add dot, stripe, and wave patterns",
    "Use bold sans-serif fonts",
    "Cards use group class, inner geometric decorations move in different directions on hover (Playful Chaos, playground liveliness)",
    "Button active:translate-x-[6px] active:translate-y-[6px] active:shadow-none (Toy Button Physics, toy key tactile feel)",
    "Titles and text instantly switch to high-saturation contrasting colors on group-hover (Pop Swap, pop color inversion), using transition-colors duration-150",
    "All animations use duration-150 ease-out, maintaining pop toy crispness",
    "Button hover changes color and increases shadow: hover:bg-pink-400 hover:shadow-[8px_8px_0px_#000] (contrasting pop reinforcement)",
  ],

  dontList: [
    "禁止使用单调的配色",
    "禁止过于对称规整的布局",
    "禁止使用细边框",
    "禁止省略几何装饰元素",
    "禁止几何装饰在 hover 时保持静止（失去孟菲斯游乐场的灵魂）",
    "禁止按钮 active 状态保留阴影（压下去就应该完全贴地，active:shadow-none 是必须的）",
    "禁止按钮 hover 使用位移减小阴影（应是增大阴影 + 换色，而非向阴影方向移动）",
  ],

  dontListEn: [
    "Do NOT use monotone, low-saturation color schemes",
    "Do NOT use overly symmetrical and orderly layouts",
    "Do NOT use thin borders",
    "Do NOT omit geometric decorative elements",
    "Do NOT keep geometric decorations static on hover (loses the soul of Memphis playground)",
    "Do NOT keep shadow on button active state (pressing down should fully flatten, active:shadow-none is mandatory)",
    "Do NOT use displacement to reduce shadow on button hover (should increase shadow + change color, not move toward shadow direction)",
  ],

  components: {
    button: {
      name: "按钮",
      description: "孟菲斯风格按钮，波普换色 + 玩具按键触感",
      code: `<button className="
  group relative px-8 py-4
  bg-yellow-400
  border-4 border-black
  text-black font-black uppercase
  shadow-[6px_6px_0px_#000]
  hover:bg-pink-400
  hover:shadow-[8px_8px_0px_#000]
  hover:-translate-y-1 hover:-rotate-2
  active:translate-x-[6px] active:translate-y-[6px]
  active:shadow-none
  transition-all duration-150 ease-out
">
  <span className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full border-2 border-black group-hover:scale-125 transition-transform duration-150" />
  <span className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-400 border-2 border-black group-hover:-translate-x-2 group-hover:rotate-45 transition-all duration-150" />
  Click Me!
</button>`,
    },
    card: {
      name: "卡片",
      description: "孟菲斯风格卡片，Playful Chaos 几何各自独立运动 + Pop Swap 撞色反转",
      code: `<div className="
  group relative p-8
  bg-pink-300
  border-4 border-black
  shadow-[8px_8px_0px_#000]
  hover:shadow-[12px_12px_0px_#000]
  hover:-translate-y-2 hover:-rotate-1
  transition-all duration-200 ease-out
  cursor-pointer
">
  {/* Decorative shapes — each moves in a different direction (Playful Chaos) */}
  <div className="absolute -top-4 -left-4 w-10 h-10 bg-yellow-400 rounded-full border-2 border-black group-hover:translate-x-4 group-hover:-translate-y-2 transition-transform duration-200 ease-out" />
  <div className="absolute -bottom-3 -right-3 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-cyan-400 border-r-[20px] border-r-transparent group-hover:-translate-x-2 group-hover:translate-y-2 group-hover:rotate-12 transition-all duration-200 ease-out" />

  <h3 className="text-2xl font-black text-black mb-3 group-hover:text-white transition-colors duration-150">
    MEMPHIS
  </h3>
  <p className="text-black/80 font-medium group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-150 px-1">
    Bold, colorful, and fun!
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "孟菲斯风格输入框",
      code: `<input
  type="text"
  placeholder="Type here..."
  className="
    w-full px-6 py-4
    bg-white
    border-4 border-black
    text-black font-bold placeholder-gray-400
    shadow-[4px_4px_0px_#48dbfb]
    focus:shadow-[4px_4px_0px_#ff6b6b]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "孟菲斯风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-br from-yellow-300 via-pink-300 to-cyan-300
  relative overflow-hidden
  px-6 py-20
">
  {/* Decorative elements */}
  <div className="absolute top-20 left-20 w-20 h-20 bg-red-500 rounded-full border-4 border-black" />
  <div className="absolute bottom-32 right-20 w-16 h-16 bg-blue-500 border-4 border-black rotate-45" />
  <div className="absolute top-40 right-40 w-0 h-0 border-l-[30px] border-l-transparent border-b-[50px] border-b-green-400 border-r-[30px] border-r-transparent" />

  <div className="relative z-10 text-center">
    <h1 className="text-6xl md:text-8xl font-black text-black mb-6" style="text-shadow: 4px 4px 0 #ff6b6b, 8px 8px 0 #48dbfb">
      MEMPHIS
    </h1>
    <p className="text-xl font-bold text-black/80 mb-8">
      Design should be fun!
    </p>
    <button className="
      px-10 py-5
      bg-yellow-400
      border-4 border-black
      text-black font-black text-lg uppercase
      shadow-[8px_8px_0px_#000]
      hover:shadow-[4px_4px_0px_#000]
      hover:translate-x-1 hover:translate-y-1
      transition-all
    ">
      Let's Go!
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Memphis 全局样式 */

:root {
  --memphis-red: #ff6b6b;
  --memphis-yellow: #feca57;
  --memphis-cyan: #48dbfb;
  --memphis-pink: #ff9ff3;
  --memphis-green: #1dd1a1;
  --memphis-purple: #5f27cd;
}

/* 孟菲斯阴影 */
.memphis-shadow {
  box-shadow: 6px 6px 0px #000;
}

/* 波浪线背景 */
.memphis-waves {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q25 0 50 10 T100 10' stroke='%23000' stroke-width='2' fill='none'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
}

/* 点状图案 */
.memphis-dots {
  background-image: radial-gradient(#000 2px, transparent 2px);
  background-size: 20px 20px;
}

/* 条纹图案 */
.memphis-stripes {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    #000 10px,
    #000 12px
  );
}
@keyframes memphis-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes memphis-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.memphis-card {
  position: relative;
  overflow: hidden;
}

.memphis-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.05), transparent);
  pointer-events: none;
}

.memphis-card:hover::before {
  opacity: 1;
}

.memphis-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(255, 107, 107, 0.08);
}

.memphis-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.memphis-animate-in {
  animation: memphis-fade-in 0.5s ease-out both;
}`,

  aiRules: `你是一个 Memphis 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用单调、低饱和度的配色
- 使用过于对称规整的布局
- 使用细边框 border
- 省略几何装饰元素

## 必须遵守

- 鲜艳撞色 bg-yellow-400, bg-pink-300, bg-cyan-400
- 粗边框 border-4 border-black
- 硬边阴影 shadow-[6px_6px_0px_#000]
- 几何装饰（圆形、三角形、方形）
- 粗体字 font-black, font-bold

## 配色

主色调：
- 红色: #ff6b6b, bg-red-500
- 黄色: #feca57, bg-yellow-400
- 青色: #48dbfb, bg-cyan-400
- 粉色: #ff9ff3, bg-pink-300
- 绿色: #1dd1a1, bg-green-400

## 装饰元素

- 圆形 rounded-full
- 三角形（用 border 实现）
- 方形 rotate-45
- 波浪线、点状、条纹图案

## Animation & Interaction Rules

- Playful Chaos: 卡片内装饰几何使用 group 类各自向不同方向独立运动（circle: group-hover:translate-x-4 group-hover:-translate-y-2；triangle: group-hover:-translate-x-2 group-hover:rotate-12），禁止统一方向。
- Toy Button Physics: 按钮 active 状态 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none，模拟玩具按键完全贴地。
- Pop Swap: hover 时即刻切换高饱和撞色（hover:bg-pink-400），transition-colors duration-150，禁止使用渐变过渡。
- Snappy Motion: 所有动画 duration-150 ease-out，保持波普玩具的干脆感。`,

  aiRulesEn: `You are a Memphis design style frontend development expert. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Using monotone, low-saturation color schemes
- Using overly symmetrical and orderly layouts
- Using thin borders border
- Omitting geometric decorative elements

## Must Follow

- Vivid contrasting colors bg-yellow-400, bg-pink-300, bg-cyan-400
- Thick borders border-4 border-black
- Hard-edge shadows shadow-[6px_6px_0px_#000]
- Geometric decorations (circles, triangles, squares)
- Bold fonts font-black, font-bold

## Color Palette

Primary:
- Red: #ff6b6b, bg-red-500
- Yellow: #feca57, bg-yellow-400
- Cyan: #48dbfb, bg-cyan-400
- Pink: #ff9ff3, bg-pink-300
- Green: #1dd1a1, bg-green-400

## Decorative Elements

- Circles rounded-full
- Triangles (using border)
- Squares rotate-45
- Wave, dot, and stripe patterns

## Animation & Interaction Rules

- Playful Chaos: Card inner decorative geometries use group class, each moving independently in different directions (circle: group-hover:translate-x-4 group-hover:-translate-y-2; triangle: group-hover:-translate-x-2 group-hover:rotate-12), uniform direction is forbidden.
- Toy Button Physics: Button active state active:translate-x-[6px] active:translate-y-[6px] active:shadow-none, simulating toy key fully flattening.
- Pop Swap: Hover instantly switches to high-saturation contrasting color (hover:bg-pink-400), transition-colors duration-150, gradient transitions are forbidden.
- Snappy Motion: All animations duration-150 ease-out, maintaining pop toy crispness.`,

  examplePrompts: [
    {
      title: "创意工作室官网",
      titleEn: "Creative Studio Website",
      description: "大胆有趣的创意网站",
      descriptionEn: "Bold and fun creative website",
      prompt: `用 Memphis 风格创建一个创意工作室官网，要求：
1. 背景：多彩渐变 + 几何装饰
2. 标题：粗体 + 多层阴影
3. 卡片：粗边框 + 硬阴影
4. 按钮：鲜艳撞色
5. 添加圆形、三角形装饰`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 孟菲斯风格风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Memphis style",
      prompt: `Create a SaaS landing page using Memphis style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 孟菲斯风格风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Memphis style",
      prompt: `Create a portfolio showcase page using Memphis style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "memphis-warm",
      name: "孟菲斯风格暖色版",
      nameEn: "Memphis Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#e07a35",
        secondary: "#fecf68",
        accent: ["#76c8ff", "#ff9ec9", "#2cc5e7", "#a217aa"],
      },
    },
    {
      id: "memphis-cool",
      name: "孟菲斯风格冷色版",
      nameEn: "Memphis Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#ff65a9",
        secondary: "#e5b64e",
        accent: ["#39e6b8", "#d9a8ff", "#33d15d", "#143eca"],
      },
    },
  ],
};
