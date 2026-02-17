import { DesignStyle } from "./index";

export const filmNoir: DesignStyle = {
  slug: "film-noir",
  name: "黑色电影",
  nameEn: "Film Noir",
  description:
    "源自 1940-50 年代经典黑色电影的戏剧性视觉风格。极致的明暗对比、深沉的灰阶层次、斜线光影和神秘氛围，适合故事驱动的产品、摄影作品集和高端品牌。",
  cover: "/styles/film-noir.svg",
  styleType: "visual",
  tags: ["expressive", "high-contrast"],
  category: "retro",
  colors: {
    primary: "#1a1a1a",
    secondary: "#f5f5f0",
    accent: ["#c41e3a", "#8b7355", "#d4af37"],
  },
  keywords: ["黑色电影", "明暗对比", "光影", "戏剧", "复古", "神秘", "高对比"],

  philosophy: `Film Noir 风格取自 1940-50 年代好莱坞黑色电影的视觉语言。

核心理念：
- 极致对比：深黑与亮白之间几乎没有中间地带，制造戏剧张力
- 光影叙事：斜线阴影、窗棂光影、聚光灯效果讲述故事
- 灰阶主导：以黑白灰为主色调，仅用极少量点缀色（猩红、金色）
- 排版古典：使用衬线标题 + 无衬线正文，呼应老式报刊美学
- 神秘氛围：信息隐约可见，吸引用户深入探索`,

  doList: [
    "背景使用深黑 bg-[#0a0a0a] 或 bg-neutral-950",
    "文字使用灰白色 text-neutral-100 text-neutral-300",
    "使用衬线字体作标题 font-serif italic",
    "卡片使用极微妙的灰色区分层次 bg-neutral-900 bg-neutral-800",
    "强调元素使用猩红色 text-[#c41e3a]（极少量）",
    "使用线性渐变模拟光影效果",
    "边框极细或无边框 border-neutral-800",
    "hover 效果使用亮度变化而非颜色变化",
  ],

  dontList: [
    "禁止使用彩色背景",
    "禁止使用高饱和度颜色（猩红仅作点缀）",
    "禁止使用圆角过大 rounded-2xl+",
    "禁止使用卡通/可爱元素",
    "禁止使用阴影发光效果",
    "禁止使用渐变按钮",
  ],

  components: {
    button: {
      name: "Noir 按钮",
      description: "低调的高对比度按钮，简洁有力",
      code: `// Primary Noir
<button className="px-6 py-3 bg-neutral-100 text-neutral-950 font-serif italic tracking-wide hover:bg-white transition-colors duration-300">
  Investigate
</button>

// Ghost Noir
<button className="px-6 py-3 bg-transparent border border-neutral-500 text-neutral-300 font-serif italic tracking-wide hover:border-neutral-100 hover:text-neutral-100 transition-colors duration-300">
  Read More
</button>

// Crimson Accent
<button className="px-6 py-3 bg-[#c41e3a] text-white font-serif italic tracking-wide hover:bg-[#a01830] transition-colors duration-300">
  Confess
</button>`,
    },
    card: {
      name: "Noir 卡片",
      description: "深色层次卡片，带斜线光影装饰",
      code: `<div className="relative bg-neutral-900 p-8 overflow-hidden group hover:bg-neutral-800/80 transition-colors duration-500">
  {/* Diagonal light shaft */}
  <div className="absolute -top-20 -right-20 w-40 h-80 bg-gradient-to-b from-white/5 to-transparent rotate-45 group-hover:from-white/10 transition-all duration-700" />

  <div className="relative">
    <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-3">Case File #47</p>
    <h3 className="text-neutral-100 text-xl font-serif italic mb-3">
      The Last Witness
    </h3>
    <p className="text-neutral-400 text-sm leading-relaxed">
      The rain hammered against the window as the detective studied the photograph.
      Something didn't add up.
    </p>
    <div className="mt-4 w-12 h-px bg-[#c41e3a]" />
  </div>
</div>`,
    },
    input: {
      name: "Noir 输入框",
      description: "暗色背景输入框，最小化装饰",
      code: `<div className="space-y-2">
  <label className="block text-neutral-400 text-xs uppercase tracking-[0.2em] font-serif">Subject Name</label>
  <input
    type="text"
    className="w-full px-4 py-3 bg-neutral-950 border-b border-neutral-700 text-neutral-100 font-serif placeholder:text-neutral-600 focus:outline-none focus:border-neutral-400 transition-colors duration-300"
    placeholder="Enter name..."
  />
</div>`,
    },
  },

  globalCss: `/* Film Noir Global Styles */
@layer base {
  body {
    @apply bg-[#0a0a0a] text-neutral-300 antialiased;
  }

  h1, h2, h3 {
    @apply font-serif italic;
  }

  ::selection {
    @apply bg-neutral-300 text-neutral-950;
  }
}

@keyframes noir-spotlight {
  0%, 100% { opacity: 0.05; }
  50% { opacity: 0.1; }
}

@keyframes noir-fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}`,

  aiRules: `STYLE: Film Noir
TYPE: Dramatic high-contrast monochrome interface

MUST USE:
- Deep black background: bg-[#0a0a0a] or bg-neutral-950
- Grayscale palette: neutral-100 through neutral-950
- Serif italic headings: font-serif italic
- Extremely subtle layer separation: bg-neutral-900 vs bg-neutral-800
- Minimal crimson accent: text-[#c41e3a] (sparingly)
- Diagonal gradient light effects for drama
- Thin or no borders: border-neutral-800
- Uppercase small tracking labels: text-xs uppercase tracking-[0.2em]

MUST AVOID:
- Colorful backgrounds
- High saturation colors (crimson only as rare accent)
- Large rounded corners (rounded-2xl+)
- Cartoon/cute elements
- Glow effects
- Gradient buttons
- Emoji or playful iconography

COLOR SYSTEM:
- Background: #0a0a0a (near black)
- Card: neutral-900
- Card hover: neutral-800
- Text primary: neutral-100
- Text secondary: neutral-400
- Text muted: neutral-500
- Crimson accent: #c41e3a (very sparingly)
- Gold accent: #d4af37 (very sparingly)
- Borders: neutral-700 to neutral-800

SPECIAL EFFECTS:
- Diagonal light shaft overlays (rotate-45 gradient)
- Spotlight breathing animation
- Fade-in with subtle upward motion
- Brightness-based hover (not color-based)`,

  examplePrompts: [
    {
      title: "侦探故事集",
      titleEn: "Detective Story Portfolio",
      description: "黑白灰调的故事驱动作品展示",
      descriptionEn: "Monochrome story-driven portfolio showcase",
      prompt: `Create a detective story portfolio using Film Noir style:
- Near-black background with subtle grey card layers
- Serif italic headings for dramatic titles
- Diagonal light shaft effects across cards
- Minimal crimson accent lines for emphasis
- Uppercase tracking labels for metadata
- Vintage newspaper-inspired typography
- Mysterious atmospheric hover effects`,
    },
  ],
};
