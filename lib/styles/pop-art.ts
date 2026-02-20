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
    "Comic Pow!: `hover:scale-110 hover:-rotate-3` — exaggerated tilt + scale like a comic SFX panel bursting out of the frame",
    "Ben-Day Dynamics: use dual dot layers — base black dots deepen `opacity-10 → opacity-30`, and a second red dot layer `opacity-0 → opacity-20` appears offset by half a grid on hover",
    "Punchy Motion: `duration-100 ease-out` — rubber-stamp speed, snappy but not instantaneous",
    "Active Snap: `active:scale-95 active:rotate-2 active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0_#000]` — inward press pushes shadow back toward zero",
  ],

  dontList: [
    "禁止使用渐变色（必须是纯色平涂）",
    "禁止使用低饱和度/灰色系颜色",
    "禁止使用细线条 border（必须 border-2 以上）",
    "禁止使用柔和阴影 shadow-md（必须是硬阴影）",
    "禁止使用圆角过大 rounded-full（保持 rounded-none 或 rounded-lg）",
    "禁止使用极简/无装饰的设计语言",
    "禁止使用 `duration-200` 或更长的 hover/active 过渡（波普艺术要求 `duration-100 ease-out` 的冲击速度）",
    "禁止 Ben-Day 纹理只用单层（必须双层叠加才有颜色变换的网点效果）",
    "禁止 hover 只使用 `translate-y` 而不配合 `scale` 和 `rotate`（Comic Pow! 三者缺一不可）",
  ],

  components: {
    button: {
      name: "按钮",
      description: "波普艺术风格按钮，Comic Pow! 夸张倾斜放大 + Punchy Motion 冲击速度 + Active Snap 回压感",
      code: `<button className="
  px-8 py-3
  bg-[#ffdd00] text-black
  border-[4px] border-black
  rounded-lg
  shadow-[6px_6px_0_#000]
  hover:bg-[#ff69b4]
  hover:shadow-[10px_10px_0_#000]
  hover:-translate-y-1
  hover:scale-110 hover:-rotate-3
  active:scale-95 active:rotate-2
  active:translate-x-[4px] active:translate-y-[4px]
  active:shadow-[2px_2px_0_#000]
  transition-all duration-100 ease-out
  font-black uppercase text-xl tracking-wider
">
  POW!
</button>`,
    },
    card: {
      name: "卡片",
      description: "波普艺术风格卡片，Ben-Day Dynamics 双层网点变色 + Comic Pow! 卡片整体飞出感",
      code: `<div className="group bg-white border-[4px] border-black rounded-lg p-8 shadow-[8px_8px_0_#000] hover:shadow-[16px_16px_0_#000] hover:-translate-y-2 hover:-translate-x-2 transition-all duration-150 ease-out relative overflow-hidden cursor-pointer">
  {/* Ben-Day dots — base layer deepens on hover */}
  <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-150" style={{backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)', backgroundSize: '10px 10px'}} />
  {/* Ben-Day dots — red accent layer appears on hover (Ben-Day Dynamics) */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-150" style={{backgroundImage: 'radial-gradient(circle, #ff0000 2px, transparent 2px)', backgroundSize: '10px 10px', backgroundPosition: '5px 5px'}} />
  <div className="relative z-10">
    <div className="inline-block bg-[#00bfff] border-[3px] border-black px-4 py-1 mb-4 font-black text-sm uppercase tracking-wider transform rotate-2 group-hover:-rotate-3 group-hover:scale-110 group-hover:bg-[#ffdd00] transition-all duration-150">
      NEW!
    </div>
    <h4 className="text-black text-4xl font-black uppercase mb-3 transform group-hover:skew-x-[-5deg] transition-transform duration-150">
      Comic Card
    </h4>
    <p className="text-gray-700 font-medium leading-relaxed">
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
- Active state presses shadow inward

## Animation & Interaction Rules

- Comic Pow!: Hover applies exaggerated scale + tilt: \`hover:scale-110 hover:-rotate-3\` — like a comic SFX panel bursting out of the frame. Never use \`hover:translate-y\` alone without \`scale\` and \`rotate\`.
- Ben-Day Dynamics: Use dual dot layers. Base black dots: \`opacity-10 group-hover:opacity-30\`. Secondary red dots offset by half a grid: \`opacity-0 group-hover:opacity-20\`. Together they simulate the Ben-Day color shift characteristic of Lichtenstein prints.
- Punchy Motion: All transitions \`duration-100 ease-out\` — rubber-stamp speed, not smooth. Never use \`duration-200\` or slower for hover/active states.
- Active Snap: \`active:scale-95 active:rotate-2 active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0_#000]\` — the inward press pushes shadow back toward zero, creating a punchy click feel.`,

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
