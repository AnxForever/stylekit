import type { DesignStyle } from "./types";

export const scandinavian: DesignStyle = {
  slug: "scandinavian",
  name: "北欧极简风",
  nameEn: "Scandinavian Minimalism",
  description:
    "源自北欧的温暖极简设计，强调自然材质、舒适留白、木质色调和Hygge生活美学，营造宁静温馨的视觉体验。",
  descriptionEn:
    "Warm minimalist design rooted in Scandinavian tradition, emphasizing natural materials, generous whitespace, wood tones, and Hygge living aesthetics for a serene, cozy visual experience.",
  cover: "/styles/scandinavian.svg",
  styleType: "visual",
  tags: [],
  category: "minimal",
  colors: {
    primary: "#3d3d3d",
    secondary: "#f5f0eb",
    accent: ["#5a7a6b", "#7ba0b8", "#c9a88c", "#607683"],
  },
  keywords: ["北欧", "斯堪的纳维亚", "Hygge", "木质", "自然", "温暖", "留白", "舒适", "minimal", "clean"],

  philosophy: `北欧极简风（Scandinavian Minimalism）源自丹麦、瑞典、挪威、芬兰等北欧国家的设计传统。

核心理念：
- 少即是多：每个元素都有存在的理由
- 自然连接：使用木材、亚麻等自然材质的色调
- Hygge 精神：营造温馨、舒适、幸福的氛围
- 功能之美：实用性与美感的完美平衡
- 光的崇拜：大量留白模拟北欧的自然光线

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Scandinavian Minimalism originates from the design traditions of Nordic countries such as Denmark, Sweden, Norway, and Finland.

Core principles:
- Less is more: every element has a reason to exist
- Connection to nature: using tones of natural materials like wood and linen
- Hygge spirit: creating a warm, comfortable, and happy atmosphere
- Beauty in function: a perfect balance of utility and aesthetics
- Worship of light: generous whitespace simulates Nordic natural light`,

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

  doListEn: [
    "Use warm gray-white backgrounds bg-[#f5f0eb]",
    "Choose natural wood tone colors text-[#a89279]",
    "Create breathing room with generous whitespace py-28 px-6",
    "Use delicate font weights font-extralight font-light",
    "Minimal borders and dividers border-[#d4cdc5]/40",
    "Smooth, slow transition animations transition-colors duration-500",
    "Interactions should focus on brightness and color temperature adjustments, simulating the warm touch of wool and wood",
    "Hover hints should use subtle border or background changes, avoiding strong shadows and obvious displacement",
    "Secondary text should slowly brighten on hover, enhancing typographic breathing rhythm",
  ],

  dontList: [
    "禁止使用高饱和度的鲜艳色彩",
    "禁止使用粗重的边框和阴影",
    "禁止密集排列元素，保持充分留白",
    "禁止使用装饰性字体或过大字号",
    "禁止弹跳、回弹或快速 scale 动效",
    "禁止使用强烈按压反馈（active 仅允许细微明暗变化）",
  ],

  dontListEn: [
    "Do not use highly saturated vivid colors",
    "Do not use heavy borders and shadows",
    "Do not densely arrange elements -- maintain ample whitespace",
    "Do not use decorative fonts or oversized type",
    "Do not use bounce, spring, or fast scale animations",
    "Do not use strong press feedback (active state allows only subtle brightness changes)",
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

  examplePrompts: [
    {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 北欧极简风风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Scandinavian Minimalism style",
      prompt: `Create a SaaS landing page using Scandinavian Minimalism style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 北欧极简风风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Scandinavian Minimalism style",
      prompt: `Create a portfolio showcase page using Scandinavian Minimalism style with project grid, about section, contact form, and consistent visual language.`,
    },
  ],

  globalCss: `/* Scandinavian Minimalism */
:root {
  --scandinavian-bg: #f5f0eb;
  --scandinavian-text: #3d3d3d;
  --scandinavian-muted: #a89279;
  --scandinavian-accent: #5a7a6b;
  --scandinavian-border: #d4cdc5;
}
@keyframes scandinavian-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scandinavian-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.scandinavian-card {
  position: relative;
  overflow: hidden;
}

.scandinavian-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(61, 61, 61, 0.05), transparent);
  pointer-events: none;
}

.scandinavian-card:hover::before {
  opacity: 1;
}

.scandinavian-gradient {
  background: linear-gradient(135deg, #3d3d3d, #5a7a6b);
}

.scandinavian-gradient-text {
  background: linear-gradient(135deg, #3d3d3d, #5a7a6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.scandinavian-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(61, 61, 61, 0.08);
}

.scandinavian-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.scandinavian-animate-in {
  animation: scandinavian-fade-in 0.5s ease-out both;
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

  aiRulesEn: `You are designing in Scandinavian Minimalism style.
- Use warm neutral tones: birch white #f5f0eb, charcoal #3d3d3d, wool gray #d4cdc5
- Accent with natural colors: pine green #5a7a6b, fjord blue #7ba0b8
- Font weights: extralight and light only
- Generous whitespace and breathing room
- Subtle borders and transitions
- No bright colors, no heavy shadows
- Lowercase text for a calm, approachable feel

Animation & Interaction Rules:
- Warm Texture: Animations should convey natural material touch, prioritizing brightness/color temperature adjustments over bouncing and scaling.
- Morning Fog: Transitions should use duration-700 + ease-in-out, revealing slowly like morning mist dissipating.
- Silent Elevation: Hover hints should prioritize subtle border and background changes, keeping shadows extremely light or omitted.
- No Impact: Active state should only provide slight brightness feedback, with no noticeable deformation.`,

  variants: [
    {
      id: "scandinavian-warm",
      name: "北欧极简风暖色版",
      nameEn: "Scandinavian Minimalism Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#3d3d3d",
        secondary: "#f6f2ed",
        accent: ["#5a7978", "#8e99c3", "#b5af82"],
      },
    },
    {
      id: "scandinavian-cool",
      name: "北欧极简风冷色版",
      nameEn: "Scandinavian Minimalism Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#3d3d3d",
        secondary: "#ddd8d4",
        accent: ["#617960", "#70a5a5", "#d6a29e"],
      },
    },
  ],
};
