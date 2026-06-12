import type { DesignStyle } from "./types";

export const minimalistFlat: DesignStyle = {
  slug: "minimalist-flat",
  name: "极简扁平风",
  nameEn: "Minimalist Flat",
  description:
    "极致简约的扁平设计，无阴影无渐变，通过颜色和留白创造层次。适合作品集、创意机构、艺术网站。",
  descriptionEn:
    "Ultra-minimal flat design with no shadows or gradients, creating hierarchy through color and whitespace. Ideal for portfolios, creative agencies, and art websites.",
  cover: "/styles/minimalist-flat.svg",
  styleType: "visual",
  tags: ["minimal", "modern"],
  category: "minimal",
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: ["#ff3366", "#00d4aa", "#ffcc00", "#b45700"],
  },
  keywords: ["极简", "扁平", "无阴影", "作品集", "创意", "艺术", "minimal", "clean", "simple", "留白"],

  philosophy: `Minimalist Flat 风格追求设计的本质，去除一切不必要的装饰，让内容成为主角。

核心理念：
- 少即是多：每个元素都必须有存在的理由
- 扁平纯粹：拒绝阴影、渐变等仿真效果
- 颜色说话：用色彩区分层次而非光影
- 大量留白：让设计呼吸，突出核心内容

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Minimalist Flat style pursues the essence of design, removing all unnecessary decoration and letting content take center stage.

Core principles:
- Less is more: Every element must have a reason to exist
- Flat purity: Reject shadows, gradients, and other skeuomorphic effects
- Color speaks: Use color to distinguish layers rather than light and shadow
- Generous whitespace: Let the design breathe and highlight core content`,

  doList: [
    "使用纯色背景 bg-white, bg-black, bg-[accent]",
    "边框使用 border-2 border-black 或无边框",
    "圆角保持一致：全部 rounded-none 或全部 rounded-full",
    "使用高对比度配色",
    "大量使用留白 space-y-12 md:space-y-24",
    "文字使用纯黑或纯白 text-black, text-white",
    "悬停使用颜色变化而非阴影",
  ],

  doListEn: [
    "Use solid color backgrounds bg-white, bg-black, bg-[accent]",
    "Borders use border-2 border-black or no border",
    "Keep border radius consistent: all rounded-none or all rounded-full",
    "Use high-contrast color schemes",
    "Generous whitespace space-y-12 md:space-y-24",
    "Text uses pure black or pure white text-black, text-white",
    "Hover uses color changes rather than shadows",
  ],

  dontList: [
    "禁止使用任何阴影 shadow-*",
    "禁止使用渐变 bg-gradient-*",
    "禁止使用透明度低于 0.5 的颜色",
    "禁止混用不同的圆角值",
    "禁止使用灰色文字（除非是有意为之）",
    "禁止使用图案背景",
  ],

  dontListEn: [
    "Do not use any shadows shadow-*",
    "Do not use gradients bg-gradient-*",
    "Do not use colors with opacity below 0.5",
    "Do not mix different border-radius values",
    "Do not use gray text (unless intentional)",
    "Do not use pattern backgrounds",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Minimalist Flat 风格的按钮",
      code: `// Primary Button - Filled
<button className="px-8 py-4 bg-black text-white font-bold border-2 border-black hover:bg-white hover:text-black active:bg-gray-200 transition-none">
  Get Started
</button>

// Secondary Button - Outlined
<button className="px-8 py-4 bg-white text-black font-bold border-2 border-black hover:bg-black hover:text-white active:bg-gray-100 transition-none">
  Learn More
</button>

// Accent Button
<button className="px-8 py-4 bg-[#ff3366] text-white font-bold border-2 border-[#ff3366] hover:bg-white hover:text-[#ff3366] active:bg-[#ffd6e2] transition-none">
  Accent Action
</button>`,
    },
    card: {
      name: "卡片",
      description: "Minimalist Flat 风格的卡片",
      code: `// Bordered Card
<div className="group border-2 border-black p-8 hover:bg-black hover:text-white transition-none cursor-pointer">
  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-300">Category</span>
  <h3 className="text-3xl font-black mt-2 mb-4 leading-tight">Flat Dynamics</h3>
  <p className="leading-relaxed">
    Brief description with minimal styling, maximum contrast, and instant interaction feedback.
  </p>
</div>

// Color Block Card
<div className="bg-[#ff3366] text-white border-2 border-[#ff3366] p-8 hover:bg-white hover:text-[#ff3366] transition-none">
  <h3 className="text-2xl font-black mb-4">Featured</h3>
  <p className="leading-relaxed">
    High contrast color block for emphasis.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Minimalist Flat 风格的输入框",
      code: `// Underline Input
<div className="space-y-2">
  <label className="block text-xs font-bold uppercase tracking-widest">Email</label>
  <input
    type="email"
    className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:border-[#ff3366] transition-colors duration-200"
    placeholder="your@email.com"
  />
</div>

// Boxed Input
<input
  type="text"
  className="w-full px-4 py-3 bg-white border-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:bg-black focus:text-white focus:placeholder:text-gray-400 transition-colors duration-200"
  placeholder="Search..."
/>`,
    },
  },

  globalCss: `/* Minimalist Flat Global Styles */
@layer base {
  body {
    @apply bg-white text-black antialiased;
  }

  h1, h2, h3, h4 {
    @apply font-bold tracking-tight;
  }

  ::selection {
    @apply bg-black text-white;
  }
}
/* Minimalist Flat Design Tokens */
:root {
  --minimalist-flat-primary: #000000;
  --minimalist-flat-secondary: #ffffff;
  --minimalist-flat-accent: #ff3366;
  --minimalist-flat-glow: rgba(0, 0, 0, 0.3);
}

@keyframes minimalist-flat-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes minimalist-flat-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.minimalist-flat-card {
  position: relative;
  overflow: hidden;
}

.minimalist-flat-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.05), transparent);
  pointer-events: none;
}

.minimalist-flat-card:hover::before {
  opacity: 1;
}

.minimalist-flat-gradient {
  background: linear-gradient(135deg, #000000, #ff3366);
}

.minimalist-flat-gradient-text {
  background: linear-gradient(135deg, #000000, #ff3366);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.minimalist-flat-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(0, 0, 0, 0.08);
}

.minimalist-flat-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.minimalist-flat-animate-in {
  animation: minimalist-flat-fade-in 0.5s ease-out both;
}`,

  aiRules: `STYLE: Minimalist Flat
TYPE: Ultra-minimal flat design

MUST USE:
- Pure colors only: bg-white, bg-black, bg-[accent]
- border-2 border-black for defined edges
- Consistent corners: all rounded-none OR all rounded-full
- High contrast: black/white with one accent
- Generous whitespace: space-y-12 md:space-y-24
- Color hover states: hover:bg-black hover:text-white

MUST AVOID:
- ANY shadows (shadow-sm, shadow-md, etc.)
- ANY gradients (bg-gradient-*)
- Low opacity colors
- Gray text (unless intentional muted text)
- Mixed border-radius values
- Pattern backgrounds

COLOR RULES:
- Primary: Black (#000000)
- Background: White (#ffffff)
- Accent: One vibrant color (e.g., #ff3366)
- No grays except for intentional muted elements

TYPOGRAPHY:
- Headers: font-bold tracking-tight
- Body: Regular weight, good line-height
- Labels: text-xs uppercase tracking-widest

## Animation & Interaction Rules

- Strict 2D Flatness: 禁止使用 translate、scale、shadow 等 Z 轴反馈，所有交互仅在二维平面内完成。
- High-Contrast Inversion: hover 以前景/背景反色为主，保证视觉反馈干脆明确。
- Instant Sharpness: 交互优先 transition-none 或 duration-75 的短反馈，不做柔和过渡。
- Border Dynamics: 聚焦或 hover 通过边框粗细/底线变化建立层次，替代阴影与位移。

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

  aiRulesEn: `# Minimalist Flat Design System

You are an expert frontend developer specializing in ultra-minimal flat design. Generate all code strictly following these specifications.

## Style Identity
- **Name**: Minimalist Flat / Pure Flat Design
- **Category**: Minimal, Modern
- **Essence**: Content is king — zero decoration, maximum clarity, pure function
- **Mood**: Clean, confident, artistic, editorial
- **Inspiration**: Dieter Rams, Swiss design, art galleries, high-fashion editorials

---

## Core Visual Principles

### 1. Color Purity (CRITICAL)
\`\`\`
ONLY PURE COLORS ALLOWED:
- bg-white, bg-black
- bg-[#ff3366] (or one chosen accent)
- text-black, text-white

NO transparency, NO grays (except intentional muted text)
\`\`\`

### 2. Shadow Policy
\`\`\`
ABSOLUTELY FORBIDDEN:
- shadow-sm, shadow-md, shadow-lg, shadow-xl, shadow-2xl
- ANY box-shadow whatsoever

This is a zero-shadow design system.
\`\`\`

### 3. Gradient Policy
\`\`\`
ABSOLUTELY FORBIDDEN:
- bg-gradient-*, from-*, via-*, to-*

Pure flat colors only.
\`\`\`

### 4. Border Radius Consistency
\`\`\`
CHOOSE ONE and apply consistently:
OPTION A: rounded-none (sharp, editorial)
OPTION B: rounded-full (for circular elements only)

NEVER mix rounded values in the same design.
\`\`\`

### 5. Border System
\`\`\`
DEFAULT: border-2 border-black
Establishes structure without shadows
\`\`\`

---

## Interaction Specifications

### Hover (High-Contrast Inversion)
| Element | Default | Hover |
|---------|---------|-------|
| Button (filled) | bg-black text-white | hover:bg-white hover:text-black |
| Button (outlined) | bg-white text-black | hover:bg-black hover:text-white |
| Card | bg-white border-black | hover:bg-black hover:text-white |
| Link | text-black | hover:text-[accent] |

### Active State
\`\`\`
active:bg-gray-200 (light variant)
active:bg-gray-100 (dark variant)
Brief flash feedback only
\`\`\`

### Focus State
\`\`\`
focus:outline-none focus:border-[accent]
OR
focus:bg-black focus:text-white
\`\`\`

---

## Animation Rules

### Interaction Physics
- **Strict 2D Flatness**: NO translate, NO scale, NO shadow Z-axis feedback. All interactions stay within the 2D plane.
- **High-Contrast Inversion**: Hover uses foreground/background color swap. Clean, binary feedback.
- **Instant Sharpness**: Use \`transition-none\` or \`duration-75\`. NO soft fades, NO ease-in-out.
- **Border Dynamics**: Focus/hover establishes hierarchy through border thickness or underline changes, NOT shadows.

### Timing Guidelines
| Interaction | Duration | Easing |
|-------------|----------|--------|
| Color inversion | 0ms (instant) | transition-none |
| Border change | 75ms | ease-out |
| Focus ring | 150-200ms | ease-out |

---

## Color Palette

### Core Colors
| Token | Value | Usage |
|-------|-------|-------|
| Primary | #000000 (black) | Text, borders, filled buttons |
| Background | #ffffff (white) | Page background, cards |
| Accent | #ff3366 (or chosen) | CTAs, highlights, hover states |

### Text Hierarchy
| Level | Classes |
|-------|---------|
| H1 | text-black text-5xl md:text-7xl font-bold tracking-tight |
| H2 | text-black text-3xl md:text-5xl font-bold |
| H3 | text-black text-xl md:text-2xl font-black |
| Body | text-black text-base leading-relaxed |
| Muted | text-gray-500 text-sm |
| Label | text-xs uppercase tracking-widest |

---

## Typography

| Element | Classes |
|---------|---------|
| Headlines | font-bold tracking-tight leading-tight |
| Body | Regular weight, leading-relaxed |
| Labels | text-xs font-bold uppercase tracking-widest |
| Links | underline-offset-4 hover:text-[accent] |

---

## Whitespace Philosophy

\`\`\`
GENEROUS SPACING IS MANDATORY:
- Section gaps: space-y-12 md:space-y-24
- Card padding: p-8 md:p-12
- Between elements: gap-6 md:gap-8
- Page margins: px-6 md:px-12

"When in doubt, add more whitespace."
\`\`\`

---

## Component Templates

### Button (Filled)
\`\`\`jsx
<button className="px-8 py-4 bg-black text-white font-bold 
  border-2 border-black 
  hover:bg-white hover:text-black 
  active:bg-gray-200 
  transition-none">
  Get Started
</button>
\`\`\`

### Button (Outlined)
\`\`\`jsx
<button className="px-8 py-4 bg-white text-black font-bold 
  border-2 border-black 
  hover:bg-black hover:text-white 
  active:bg-gray-100 
  transition-none">
  Learn More
</button>
\`\`\`

### Card (Bordered)
\`\`\`jsx
<div className="group border-2 border-black p-8 
  hover:bg-black hover:text-white 
  transition-none cursor-pointer">
  <span className="text-xs font-bold uppercase tracking-widest 
    text-gray-500 group-hover:text-gray-300">Category</span>
  <h3 className="text-3xl font-black mt-2 mb-4">Title</h3>
  <p className="leading-relaxed">Description text.</p>
</div>
\`\`\`

---

## Forbidden Patterns

| Pattern | Reason |
|---------|--------|
| ANY shadow-* | Shadows create depth, violates flat principle |
| ANY gradient | Gradients add dimension, violates flat principle |
| opacity < 0.5 | Low opacity weakens contrast |
| Mixed border-radius | Breaks visual consistency |
| Gray text (unintentional) | Reduces clarity |
| Pattern backgrounds | Adds unnecessary visual noise |
| translate on hover | Creates Z-axis illusion |
| scale on hover | Creates Z-axis illusion |
| Soft transitions (300ms+) | Delays instant feedback |

---

## Responsive Guidelines

### Spacing Scale
\`\`\`
Mobile: space-y-8, p-6, gap-4
Desktop (md:): space-y-16, p-12, gap-8
Large (lg:): space-y-24, p-16, gap-12
\`\`\`

### Typography Scale
\`\`\`
Mobile: text-3xl, text-base
Desktop (md:): text-5xl, text-lg
\`\`\`

---

## Self-Verification Checklist

Before outputting code, verify:
- [ ] NO shadows anywhere (zero shadow-* classes)
- [ ] NO gradients anywhere (zero bg-gradient-* classes)
- [ ] Colors are pure (no transparency except intentional text muting)
- [ ] Border-radius is consistent (all sharp OR all circular)
- [ ] Whitespace is generous (space-y-12+ between sections)
- [ ] Hover uses color inversion (bg swap, not translate/scale)
- [ ] Transitions are instant or very short (transition-none or duration-75)
- [ ] High contrast maintained (black/white + one accent)`,

  examplePrompts: [
    {
      title: "Portfolio",
      titleEn: "Designer Portfolio",
      description: "生成极简设计师作品集",
      descriptionEn: "Generate minimalist designer portfolio",
      prompt: `Create a designer portfolio using Minimalist Flat style:
- Full-screen hero with name and title
- Grid of project cards with hover color inversion
- No shadows, no gradients
- Black and white with one accent color
- Large typography for headings
- Generous whitespace between sections`,
      promptEn: `Create a designer portfolio using Minimalist Flat style:
- Full-screen hero with name and title
- Grid of project cards with hover color inversion
- No shadows, no gradients
- Black and white with one accent color
- Large typography for headings
- Generous whitespace between sections`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 极简扁平风风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Minimalist Flat style",
      prompt: `Create a SaaS landing page using Minimalist Flat style with hero section, feature grid, testimonials, pricing table, and footer.`,
      promptEn: `Create a SaaS landing page using Minimalist Flat style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 极简扁平风风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Minimalist Flat style",
      prompt: `Create a portfolio showcase page using Minimalist Flat style with project grid, about section, contact form, and consistent visual language.`,
      promptEn: `Create a portfolio showcase page using Minimalist Flat style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "minimalist-flat-warm",
      name: "极简扁平风暖色版",
      nameEn: "Minimalist Flat Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        accent: ["#ec4117", "#19c4fb", "#94ec00"],
      },
    },
    {
      id: "minimalist-flat-cool",
      name: "极简扁平风冷色版",
      nameEn: "Minimalist Flat Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#000000",
        secondary: "#e6e6e6",
        accent: ["#e832b4", "#13d757", "#ffab36"],
      },
    },
  ],
};
