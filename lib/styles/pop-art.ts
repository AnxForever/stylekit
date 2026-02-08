import { DesignStyle } from "./index";

export const popArt: DesignStyle = {
  slug: "pop-art",
  name: "波普艺术",
  nameEn: "Pop Art",
  description:
    "大胆鲜明的波普艺术风格，灵感来自 Andy Warhol 和 Roy Lichtenstein。粗黑轮廓、半色调网点、漫画式对话泡泡、高饱和度色块。适合创意品牌、潮流文化、艺术展示。",
  cover: "/styles/pop-art.svg",
  styleType: "visual",
  tags: ["expressive", "retro", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#ffdd00",
    secondary: "#ff69b4",
    accent: ["#00bfff", "#000000", "#ffffff"],
  },
  keywords: ["波普", "Warhol", "Lichtenstein", "半色调", "漫画", "粗体", "网点", "对话泡泡"],

  philosophy: `Pop Art 风格来源于 20 世纪 60 年代的波普艺术运动，以 Andy Warhol 和 Roy Lichtenstein 为代表，通过大胆色块、粗黑轮廓和半色调网点创造视觉冲击。

核心理念：
- 粗黑轮廓：所有元素使用粗黑边框强调形状
- 高饱和色块：使用黄、粉、蓝等纯色平涂填充
- 半色调网点：Ben-Day dots 是波普艺术的标志性纹理
- 漫画风格：对话泡泡、动作线条等漫画元素融入界面`,

  doList: [
    "背景使用高饱和纯色 bg-[#ffdd00] 或 bg-white",
    "所有元素使用粗黑边框 border-4 border-black",
    "使用 Ben-Day 半色调网点作为背景纹理",
    "文字使用粗体 font-black uppercase",
    "按钮和卡片使用硬阴影 shadow-[4px_4px_0_#000]",
    "使用高对比度配色：黄 #ffdd00、粉 #ff69b4、蓝 #00bfff",
    "hover 状态增大阴影偏移 hover:shadow-[6px_6px_0_#000]",
  ],

  dontList: [
    "禁止使用渐变色（必须是纯色平涂）",
    "禁止使用低饱和度/灰色系颜色",
    "禁止使用细线条 border（必须 border-2 以上）",
    "禁止使用柔和阴影 shadow-md（必须是硬阴影）",
    "禁止使用圆角过大 rounded-full（保持 rounded-none 或 rounded-lg）",
    "禁止使用极简/无装饰的设计语言",
  ],

  components: {
    button: {
      name: "按钮",
      description: "波普艺术风格的漫画按钮",
      code: `// Pop Art Primary
<button className="px-6 py-3 bg-[#ffdd00] text-black border-4 border-black rounded-lg shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150 font-black uppercase tracking-wider">
  POW!
</button>

// Pop Art Secondary
<button className="px-6 py-3 bg-[#ff69b4] text-white border-4 border-black rounded-lg shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 font-black uppercase tracking-wider">
  BANG!
</button>

// Pop Art Outline
<button className="px-6 py-3 bg-white text-black border-4 border-black rounded-lg shadow-[4px_4px_0_#000] hover:bg-[#00bfff] hover:text-white hover:shadow-[6px_6px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 font-black uppercase tracking-wider">
  CLICK!
</button>`,
    },
    card: {
      name: "卡片",
      description: "波普艺术风格的漫画卡片",
      code: `<div className="bg-white border-4 border-black rounded-lg p-6 shadow-[6px_6px_0_#000] relative overflow-hidden">
  {/* Ben-Day dots background */}
  <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '8px 8px'}} />

  <div className="relative">
    <div className="inline-block bg-[#ffdd00] border-2 border-black px-3 py-1 mb-4 font-black text-xs uppercase tracking-wider">
      NEW
    </div>
    <h4 className="text-black text-2xl font-black uppercase mb-3">
      Pop Art Card
    </h4>
    <p className="text-gray-800 leading-relaxed font-medium">
      Bold, colorful pop culture aesthetic with comic book styling.
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "波普艺术风格的输入框",
      code: `<div className="space-y-2">
  <label className="block text-black font-black text-sm uppercase tracking-wider">Your Name</label>
  <div className="relative">
    <input
      type="text"
      className="w-full px-4 py-3 bg-white border-4 border-black rounded-lg text-black font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#ff69b4] focus:shadow-[4px_4px_0_#ff69b4] transition-all duration-150"
      placeholder="Type here..."
    />
  </div>
</div>`,
    },
  },

  globalCss: `/* Pop Art Global Styles */
@layer base {
  body {
    @apply bg-white text-black antialiased;
  }

  h1, h2, h3 {
    @apply font-black uppercase tracking-wider;
  }

  ::selection {
    @apply bg-[#ffdd00] text-black;
  }
}

/* Ben-Day dots pattern utility */
.pop-art-dots {
  background-image: radial-gradient(circle, #000 1px, transparent 1px);
  background-size: 8px 8px;
}`,

  aiRules: `STYLE: Pop Art
TYPE: Bold comic-book inspired interface

MUST USE:
- Thick black borders: border-4 border-black
- Hard offset shadows: shadow-[4px_4px_0_#000]
- Bold flat colors: bg-[#ffdd00], bg-[#ff69b4], bg-[#00bfff]
- Heavy typography: font-black uppercase tracking-wider
- Ben-Day dot patterns as background texture
- White or bright color backgrounds
- Comic-style elements (speech bubbles, action words)

MUST AVOID:
- Gradients (use flat color fills only)
- Low saturation / muted colors
- Thin borders (border must be border-2+)
- Soft shadows (shadow-md, shadow-lg)
- Rounded-full shapes
- Minimal / clean design language

COLOR RULES:
- Primary: Yellow (#ffdd00)
- Secondary: Hot Pink (#ff69b4)
- Accent: Electric Blue (#00bfff)
- Borders: Black (#000000)
- Background: White (#ffffff) or bright colors
- Text: Black on light, White on dark colors

SPECIAL EFFECTS:
- Hard shadow offset increases on hover
- Translate shift on hover for depth effect
- Ben-Day dots overlay for pop art texture
- Active state presses shadow inward`,

  examplePrompts: [
    {
      title: "波普艺术作品展示",
      titleEn: "Pop Art Gallery",
      description: "生成波普艺术风格的作品展示页面",
      descriptionEn: "Generate a pop art style gallery page",
      prompt: `Create a gallery page using Pop Art style:
- White background with Ben-Day dot pattern overlay
- Bold cards with thick black borders and hard shadows
- Bright yellow, pink, and blue color blocks
- Comic-style headings with font-black uppercase
- Action word labels (POW, BANG, WOW)
- Hover effects that shift shadow offset`,
    },
  ],
};
