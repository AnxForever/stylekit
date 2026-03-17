import { DesignStyle } from "./index";

export const monochrome: DesignStyle = {
  slug: "monochrome",
  name: "单色极简",
  nameEn: "Monochrome",
  description:
    "纯黑白灰的极致单色设计，通过精确的灰阶层次、字重对比和负空间构建视觉层次，不依赖任何色彩即达到高级感。适合摄影、建筑和高端品牌。",
  descriptionEn:
    "An ultimate monochrome design in pure black, white, and gray, building visual hierarchy through precise grayscale levels, font-weight contrast, and negative space without relying on any color. Ideal for photography, architecture, and premium brands.",
  cover: "/styles/monochrome.svg",
  styleType: "visual",
  tags: ["minimal", "high-contrast"],
  category: "minimal",
  colors: {
    primary: "#111111",
    secondary: "#fafafa",
    accent: ["#666666", "#999999", "#cccccc", "#666666"],
  },
  keywords: ["单色", "黑白", "灰阶", "极简", "无色彩", "高级感", "摄影", "建筑", "minimal", "clean"],

  philosophy: `单色极简（Monochrome）是对色彩的彻底放弃，仅凭黑、白、灰三者的精确调度构建完整的视觉层次。

核心理念：
- 零色相依赖：不使用任何带有色相（hue）的颜色，所有视觉信息由灰阶传达
- 灰阶层次：通过 #111111 到 #fafafa 之间的精确灰度梯度建立信息优先级
- 字重对比：以 font-light 与 font-bold 的差异替代色彩区分
- 负空间构图：大量留白不是空白，是设计的一部分
- 网格秩序：严格的网格系统确保每一个元素都有精确的位置

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Monochrome is the complete abandonment of color, building a full visual hierarchy solely through the precise orchestration of black, white, and gray.

Core principles:
- Zero hue dependency: no colors with any hue are used; all visual information is conveyed through grayscale
- Grayscale hierarchy: precise gray gradients from #111111 to #fafafa establish information priority
- Font-weight contrast: differences between font-light and font-bold replace color differentiation
- Negative space composition: generous whitespace is not empty -- it is part of the design
- Grid order: strict grid systems ensure every element has a precise position`,

  doList: [
    "使用纯灰色调背景 bg-[#fafafa] 或 bg-white",
    "主要文字使用深灰 text-[#111111]，次要文字 text-[#666666]",
    "通过 font-light 和 font-bold 的字重对比建立层次",
    "大量负空间留白 py-24 px-8",
    "极细边框分隔 border-[#e5e5e5]",
    "网格布局对齐 grid-based layout",
  ],

  doListEn: [
    "Use pure grayscale backgrounds bg-[#fafafa] or bg-white",
    "Primary text uses dark gray text-[#111111], secondary text text-[#666666]",
    "Build hierarchy through font-light and font-bold weight contrast",
    "Generous negative space whitespace py-24 px-8",
    "Ultra-thin border dividers border-[#e5e5e5]",
    "Grid-based layout alignment",
  ],

  dontList: [
    "禁止使用任何带色相的颜色（无 blue/red/green/pink 等）",
    "禁止使用 rounded-full 圆形圆角",
    "禁止使用重阴影 shadow-lg shadow-xl shadow-2xl",
    "禁止使用渐变 bg-gradient-to-*",
  ],

  dontListEn: [
    "Do not use any color with hue (no blue/red/green/pink, etc.)",
    "Do not use rounded-full circular corners",
    "Do not use heavy shadows shadow-lg shadow-xl shadow-2xl",
    "Do not use gradients bg-gradient-to-*",
  ],

  components: {
    button: {
      name: "按钮",
      description: "单色极简按钮，黑底白字，无圆角装饰",
      code: `<button className="
  px-8 py-4
  bg-[#111111] text-[#fafafa]
  text-xs font-medium tracking-[0.2em] uppercase
  rounded-sm
  hover:bg-[#2a2a2a]
  transition-colors duration-700 ease-in-out
">
  Discover
</button>`,
    },
    card: {
      name: "卡片",
      description: "单色极简卡片，细边框，灰色背景",
      code: `<div className="
  group p-10
  bg-[#f5f5f5]
  rounded-sm
  border border-[#e5e5e5]
  hover:bg-[#ebebeb]
  hover:border-[#cccccc]
  transition-colors duration-700 ease-in-out
">
  <h3 className="text-2xl font-light text-[#111111] mb-6 tracking-wide">The Silent Void</h3>
  <p className="text-sm font-light text-[#666666] leading-relaxed group-hover:text-[#444444] transition-colors duration-700">
    In the absence of color, form and space reveal their true essence.
  </p>
  <div className="mt-8 flex items-center">
    <span className="text-xs uppercase tracking-widest text-[#111111]">Read More</span>
    <div className="ml-4 h-px w-0 bg-[#111111] transition-all duration-700 ease-in-out group-hover:w-12" />
  </div>
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

  examplePrompts: [
    {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 单色极简风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Monochrome style",
      prompt: `Create a SaaS landing page using Monochrome style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 单色极简风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Monochrome style",
      prompt: `Create a portfolio showcase page using Monochrome style with project grid, about section, contact form, and consistent visual language.`,
    },
  ],

  globalCss: `/* Monochrome */
:root {
  --monochrome-bg: #fafafa;
  --monochrome-text: #111111;
  --monochrome-muted: #666666;
  --monochrome-subtle: #999999;
  --monochrome-border: #e5e5e5;
  --monochrome-surface: #f5f5f5;
}
@keyframes monochrome-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes monochrome-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.monochrome-card {
  position: relative;
  overflow: hidden;
}

.monochrome-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(17, 17, 17, 0.05), transparent);
  pointer-events: none;
}

.monochrome-card:hover::before {
  opacity: 1;
}

.monochrome-gradient {
  background: linear-gradient(135deg, #111111, #666666);
}

.monochrome-gradient-text {
  background: linear-gradient(135deg, #111111, #666666);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.monochrome-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(17, 17, 17, 0.08);
}

.monochrome-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.monochrome-animate-in {
  animation: monochrome-fade-in 0.5s ease-out both;
}`,

  aiRules: `You are designing in Monochrome style.
- Use ONLY grayscale colors: #111111, #333333, #666666, #999999, #cccccc, #e5e5e5, #f5f5f5, #fafafa, #ffffff
- NEVER use any color with hue (no blue, red, green, pink, orange, etc.)
- Build hierarchy with font-weight contrast: font-light for body, font-bold for headings
- Use generous negative space (py-24, px-8) for breathing room
- Borders must be subtle: grayscale borders in the #e5e5e5 to #cccccc range
- No rounded-full, no heavy shadows, no gradients
- Keep corners sharp: rounded-sm or rounded-none
- Uppercase tracking-wider for labels and small text
- Grid-based alignment for all layouts

## Animation & Interaction Rules

- Deliberate Slowness: 交互应使用 duration-500 到 700 的缓慢节奏，避免快速跳变。
- Grayscale Breathing: 仅允许相邻灰阶过渡（如 #111111 到 #2a2a2a），保持克制。
- Line Growth: 优先使用细线延展作为交互提示，减少大面积反差切换。
- Static Elevation: 避免 translate 和重阴影，维持安静二维平面感。`,

  aiRulesEn: `You are designing in Monochrome style.
- Use ONLY grayscale colors: #111111, #333333, #666666, #999999, #cccccc, #e5e5e5, #f5f5f5, #fafafa, #ffffff
- NEVER use any color with hue (no blue, red, green, pink, orange, etc.)
- Build hierarchy with font-weight contrast: font-light for body, font-bold for headings
- Use generous negative space (py-24, px-8) for breathing room
- Borders must be subtle: grayscale borders in the #e5e5e5 to #cccccc range
- No rounded-full, no heavy shadows, no gradients
- Keep corners sharp: rounded-sm or rounded-none
- Uppercase tracking-wider for labels and small text
- Grid-based alignment for all layouts

Animation & Interaction Rules:
- Deliberate Slowness: Interactions should use duration-500 to 700 slow rhythm, avoiding fast jumps.
- Grayscale Breathing: Only allow adjacent grayscale transitions (e.g., #111111 to #2a2a2a), maintaining restraint.
- Line Growth: Prefer thin line extension as interaction hints, reducing large-area contrast switching.
- Static Elevation: Avoid translate and heavy shadows, maintaining a quiet two-dimensional plane feel.`,

  variants: [
    {
      id: "monochrome-warm",
      name: "单色极简暖色版",
      nameEn: "Monochrome Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#111111",
        secondary: "#fbfbfb",
        accent: ["#666666", "#999999", "#cccccc"],
      },
    },
    {
      id: "monochrome-cool",
      name: "单色极简冷色版",
      nameEn: "Monochrome Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#111111",
        secondary: "#e1e1e1",
        accent: ["#666666", "#999999", "#cccccc"],
      },
    },
  ],
};
