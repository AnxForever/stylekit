import { DesignStyle } from "./index";

export const minimalistFlat: DesignStyle = {
  slug: "minimalist-flat",
  name: "极简扁平风",
  nameEn: "Minimalist Flat",
  description:
    "极致简约的扁平设计，无阴影无渐变，通过颜色和留白创造层次。适合作品集、创意机构、艺术网站。",
  cover: "/styles/minimalist-flat.png",
  styleType: "visual",
  tags: ["minimal", "modern"],
  category: "minimal",
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: ["#ff3366", "#00d4aa", "#ffcc00"],
  },
  keywords: ["极简", "扁平", "无阴影", "作品集", "创意", "艺术"],

  philosophy: `Minimalist Flat 风格追求设计的本质，去除一切不必要的装饰，让内容成为主角。

核心理念：
- 少即是多：每个元素都必须有存在的理由
- 扁平纯粹：拒绝阴影、渐变等仿真效果
- 颜色说话：用色彩区分层次而非光影
- 大量留白：让设计呼吸，突出核心内容`,

  doList: [
    "使用纯色背景 bg-white, bg-black, bg-[accent]",
    "边框使用 border-2 border-black 或无边框",
    "圆角保持一致：全部 rounded-none 或全部 rounded-full",
    "使用高对比度配色",
    "大量使用留白 space-y-12 md:space-y-24",
    "文字使用纯黑或纯白 text-black, text-white",
    "悬停使用颜色变化而非阴影",
  ],

  dontList: [
    "禁止使用任何阴影 shadow-*",
    "禁止使用渐变 bg-gradient-*",
    "禁止使用透明度低于 0.5 的颜色",
    "禁止混用不同的圆角值",
    "禁止使用灰色文字（除非是有意为之）",
    "禁止使用图案背景",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Minimalist Flat 风格的按钮",
      code: `// Primary Button - Filled
<button className="px-6 py-3 bg-black text-white font-medium hover:bg-white hover:text-black border-2 border-black transition-colors duration-200">
  Get Started
</button>

// Secondary Button - Outlined
<button className="px-6 py-3 bg-white text-black font-medium border-2 border-black hover:bg-black hover:text-white transition-colors duration-200">
  Learn More
</button>

// Accent Button
<button className="px-6 py-3 bg-[#ff3366] text-white font-medium border-2 border-[#ff3366] hover:bg-white hover:text-[#ff3366] transition-colors duration-200">
  Accent Action
</button>`,
    },
    card: {
      name: "卡片",
      description: "Minimalist Flat 风格的卡片",
      code: `// Bordered Card
<div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-colors duration-200 group">
  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-300">Category</span>
  <h3 className="text-2xl font-bold mt-2 mb-4">Card Title</h3>
  <p className="leading-relaxed">
    Brief description with minimal styling and maximum impact.
  </p>
</div>

// Color Block Card
<div className="bg-[#ff3366] text-white p-8">
  <h3 className="text-2xl font-bold mb-4">Featured</h3>
  <p className="leading-relaxed opacity-90">
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
- Labels: text-xs uppercase tracking-widest`,

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
    },
  ],
};
