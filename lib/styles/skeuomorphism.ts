import type { DesignStyle } from "./types";

export const skeuomorphism: DesignStyle = {
  slug: "skeuomorphism",
  name: "拟物设计",
  nameEn: "Skeuomorphism",
  description:
    "模拟真实世界物体的数字设计风格，通过纹理、光影、材质模仿现实物品，带来熟悉感和直觉性体验。",
  descriptionEn:
    "A digital design style that simulates real-world objects through textures, lighting, and materials to mimic physical items, bringing familiarity and intuitive experiences.",
  cover: "/styles/skeuomorphism.svg",
  styleType: "visual",
  tags: ["retro"],
  category: "retro",
  colors: {
    primary: "#8b7355",
    secondary: "#d4c4a8",
    accent: ["#c9a227", "#5c4033", "#2e5a3c", "#4bc542"],
  },
  keywords: ["拟物", "写实", "纹理", "质感", "真实", "3D", "阴影", "retro", "vintage", "nostalgic"],

  philosophy: `Skeuomorphism（拟物设计）是一种模拟真实世界物体外观和行为的设计方法，曾在早期 iOS 和数字产品中广泛使用。

核心理念：
- 真实模拟：界面元素模仿现实物品的外观和触感
- 材质纹理：皮革、木材、金属等真实材质纹理
- 光影深度：通过高光、阴影创造立体感
- 熟悉直觉：利用用户对现实世界的认知减少学习成本

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Skeuomorphism is a design approach that simulates the appearance and behavior of real-world objects, widely used in early iOS and digital products.

Core principles:
- Realistic simulation: Interface elements mimic the appearance and feel of real objects
- Material textures: Real material textures like leather, wood, and metal
- Light and shadow depth: Creating dimensionality through highlights and shadows
- Familiar intuition: Leveraging users' real-world knowledge to reduce learning costs`,

  doList: [
    "使用真实材质纹理（皮革、木材、金属）",
    "添加逼真的光影效果",
    "模拟物理按钮的按压反馈",
    "使用渐变创造立体感",
    "添加细腻的边缘高光",
    "模拟真实物品的形态和比例",
  ],

  doListEn: [
    "Use real material textures (leather, wood, metal)",
    "Add realistic light and shadow effects",
    "Simulate physical button press feedback",
    "Use gradients to create dimensionality",
    "Add delicate edge highlights",
    "Simulate the form and proportions of real objects",
  ],

  dontList: [
    "禁止使用纯扁平的色块",
    "禁止省略阴影和高光",
    "禁止使用过于简化的图标",
    "禁止忽视材质细节",
  ],

  dontListEn: [
    "Do NOT use flat solid color blocks",
    "Do NOT omit shadows and highlights",
    "Do NOT use overly simplified icons",
    "Do NOT ignore material and texture details",
  ],

  components: {
    button: {
      name: "按钮",
      description: "拟物风格按钮",
      code: `<button className="
  px-8 py-4
  bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300
  bg-[length:100%_180%] bg-[position:0_0]
  border border-gray-400
  rounded-lg
  text-gray-700 font-semibold
  shadow-[0_4px_6px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(0,0,0,0.14)]
  hover:bg-[position:0_20%]
  hover:shadow-[0_5px_8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(0,0,0,0.14)]
  active:translate-y-[2px]
  active:shadow-[0_1px_2px_rgba(0,0,0,0.45),inset_0_2px_5px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.8)]
  transition-all duration-75 ease-linear
">
  Mechanical Switch
</button>`,
    },
    card: {
      name: "卡片",
      description: "拟物风格卡片",
      code: `<div className="
  group
  p-6
  bg-gradient-to-b from-amber-50 to-amber-100
  border border-amber-300
  rounded-xl
  shadow-[0_8px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(0,0,0,0.12)]
  hover:shadow-[0_10px_20px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.75),inset_0_-1px_0_rgba(0,0,0,0.12)]
  relative overflow-hidden
  transition-shadow duration-200
">
  {/* Leather texture overlay */}
  <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#3f2f1f_0.7px,transparent_0.7px)] bg-[size:5px_5px] bg-[position:0_0] group-hover:bg-[position:2px_2px] group-hover:opacity-[0.05] transition-all duration-200" />
  <h3 className="text-xl font-bold text-amber-900 mb-2 [text-shadow:0_1px_0_rgba(255,255,255,0.8)]">
    Stitched Leather
  </h3>
  <p className="text-amber-800 [text-shadow:0_1px_0_rgba(255,255,255,0.75)]">
    Rich material depth with stable highlight and tactile resistance.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "拟物风格输入框",
      code: `<input
  type="text"
  placeholder="Type here..."
  className="
    w-full px-4 py-3
    bg-gradient-to-b from-white to-gray-100
    border border-gray-300
    rounded-lg
    text-gray-700
    shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.8)]
    focus:outline-none focus:ring-2 focus:ring-blue-400
    focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15),0_0_8px_rgba(59,130,246,0.3)]
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "拟物风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-stone-200 via-stone-300 to-stone-400
  relative
">
  {/* Wood texture background */}
  <div className="absolute inset-0 opacity-20 bg-repeat" style="background-image: url('wood-texture.png')" />

  <div className="relative z-10 text-center p-8 bg-gradient-to-b from-white/90 to-gray-100/90 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.8)] border border-white/50">
    <h1 className="text-5xl font-bold text-gray-800 mb-4" style="text-shadow: 0 1px 0 rgba(255,255,255,0.8)">
      Skeuomorphism
    </h1>
    <p className="text-xl text-gray-600 mb-6">
      Digital meets physical
    </p>
    <button className="px-8 py-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg text-white font-bold shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)]">
      Explore
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Skeuomorphism 全局样式 */

:root {
  --skeu-leather: #8b7355;
  --skeu-wood: #d4c4a8;
  --skeu-metal: #c0c0c0;
  --skeu-paper: #f5f5dc;
}

/* 金属质感按钮 */
.skeu-metal-button {
  background: linear-gradient(180deg, #e8e8e8 0%, #c0c0c0 50%, #a8a8a8 100%);
  border: 1px solid #888;
  box-shadow:
    0 4px 8px rgba(0,0,0,0.3),
    inset 0 1px 0 rgba(255,255,255,0.8),
    inset 0 -1px 0 rgba(0,0,0,0.2);
}

/* 凹陷效果 */
.skeu-inset {
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.2), inset 0 -1px 0 rgba(255,255,255,0.5);
}

/* 凸起效果 */
.skeu-raised {
  box-shadow: 0 4px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5);
}
@keyframes skeuomorphism-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes skeuomorphism-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.skeuomorphism-card {
  position: relative;
  overflow: hidden;
}

.skeuomorphism-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(139, 115, 85, 0.05), transparent);
  pointer-events: none;
}

.skeuomorphism-card:hover::before {
  opacity: 1;
}

.skeuomorphism-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(139, 115, 85, 0.08);
}

.skeuomorphism-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.skeuomorphism-animate-in {
  animation: skeuomorphism-fade-in 0.5s ease-out both;
}

.skeuomorphism-focus { outline: 2px solid var(--skeuomorphism-primary, currentColor); outline-offset: 2px; }`,

  aiRules: `你是一个 Skeuomorphism 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用纯扁平的色块
- 省略阴影和高光效果
- 使用过于简化的图标
- 忽视材质和纹理细节

## 必须遵守

- 渐变背景 bg-gradient-to-b from-gray-100 to-gray-300
- 复杂阴影 shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.8)]
- 边框层次 border border-gray-400
- 圆角适中 rounded-lg
- 按压反馈 active:translate-y-[1px]

## 配色

- 使用自然材质色调
- 皮革棕: #8b7355
- 木材米: #d4c4a8
- 金属银: #c0c0c0
- 纸张白: #f5f5dc

## 光影原则

- 顶部高光 (inset 0 1px 0 rgba(255,255,255,0.8))
- 底部暗边 (inset 0 -1px 0 rgba(0,0,0,0.1))
- 外部投影 (0 4px 8px rgba(0,0,0,0.3))

## Animation & Interaction Rules

- Tactile Resistance: active 状态使用短时下压和更紧凑外阴影，模拟按键阻尼，不使用弹跳放大。
- Fixed Illuminant: 顶部高光和底部暗边在 hover 与 active 中保持稳定，确保光源始终来自上方。
- Texture Shimmer: 材质层允许轻微 background-position 位移，表达金属拉丝或皮革纹理的受光变化。
- Embossed Focus: 输入焦点优先加深 inset 阴影，而不是强烈外发光轮廓。

## Layout & Spacing
- Section padding: py-16 md:py-24
- Card padding: p-6 md:p-8
- Gap between cards: gap-6 md:gap-8
- Max content width: max-w-6xl mx-auto

## Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Stack elements vertically on mobile (flex-col), row on desktop (md:flex-row)
- Reduce font sizes on mobile: text-3xl md:text-5xl for headings
- Touch-friendly targets: min 44px for interactive elements

## Self-Check Verification
After generating code, verify:
1. All interactive elements have hover/focus/active states
2. Color contrast meets WCAG 2.1 AA (4.5:1 for text)
3. Layout is responsive across breakpoints
4. Typography hierarchy is clear (h1 > h2 > h3 > body)
5. Spacing is consistent using the defined scale
6. All animations respect prefers-reduced-motion`,

  aiRulesEn: `You are a Skeuomorphism design style frontend development expert. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Using flat solid color blocks
- Omitting shadow and highlight effects
- Using overly simplified icons
- Ignoring material and texture details

## Must Follow

- Gradient backgrounds bg-gradient-to-b from-gray-100 to-gray-300
- Complex shadows shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.8)]
- Border layers border border-gray-400
- Moderate radii rounded-lg
- Press feedback active:translate-y-[1px]

## Color Palette

- Use natural material tones
- Leather brown: #8b7355
- Wood beige: #d4c4a8
- Metal silver: #c0c0c0
- Paper white: #f5f5dc

## Light & Shadow Principles

- Top highlight (inset 0 1px 0 rgba(255,255,255,0.8))
- Bottom dark edge (inset 0 -1px 0 rgba(0,0,0,0.1))
- Outer drop shadow (0 4px 8px rgba(0,0,0,0.3))

## Animation & Interaction Rules

- Tactile Resistance: Active state uses short press and tighter outer shadow, simulating key damping, no bouncy scaling.
- Fixed Illuminant: Top highlight and bottom dark edge remain stable in hover and active, ensuring light source always comes from above.
- Texture Shimmer: Material layer allows slight background-position shift, expressing light changes on brushed metal or leather texture.
- Embossed Focus: Input focus prioritizes deepening inset shadow rather than strong outer glow outline.`,

  examplePrompts: [
    {
      title: "复古音乐播放器",
      titleEn: "Retro Music Player",
      description: "仿真实收音机的音乐播放界面",
      descriptionEn: "Music player mimicking real radio",
      prompt: `用 Skeuomorphism 风格创建一个复古音乐播放器界面，要求：
1. 背景：模拟木质或金属材质
2. 按钮：带有真实按压感的 3D 效果
3. 旋钮：模拟真实旋钮的外观
4. 显示屏：模拟 LCD 或复古显示器
5. 整体有复古电子设备的质感`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 拟物设计风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Skeuomorphism style",
      prompt: `Create a SaaS landing page using Skeuomorphism style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 拟物设计风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Skeuomorphism style",
      prompt: `Create a portfolio showcase page using Skeuomorphism style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "skeuomorphism-warm",
      name: "拟物设计暖色版",
      nameEn: "Skeuomorphism Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#78794f",
        secondary: "#d8cab1",
        accent: ["#86b624", "#50452a", "#295a4f"],
      },
    },
    {
      id: "skeuomorphism-cool",
      name: "拟物设计冷色版",
      nameEn: "Skeuomorphism Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#996d64",
        secondary: "#bfb097",
        accent: ["#ff8e4b", "#623d41", "#3c572e"],
      },
    },
  ],
};
