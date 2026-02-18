import { DesignStyle } from "./index";

export const witchcore: DesignStyle = {
  slug: "witchcore",
  name: "巫术核心",
  nameEn: "Witchcore",
  description:
    "神秘学美学风格，塔罗牌、月相符号、水晶与草药元素。深紫色调搭配金色神秘符文，暗色背景上闪烁的星尘效果。",
  cover: "/styles/witchcore.svg",
  styleType: "visual",
  tags: ["expressive", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#4a1942",
    secondary: "#0d0b14",
    accent: ["#c9a74e", "#7b68ae", "#3d8b6e"],
  },
  keywords: ["巫术", "神秘", "塔罗", "月相", "水晶", "符文", "暗黑"],

  philosophy: `Witchcore（巫术核心）设计灵感源自神秘学、塔罗牌与自然魔法传统，通过深邃的暗紫色调与闪烁的金色符文，构建一个充满仪式感与神秘力量的视觉世界。

核心理念：
- 神秘氛围：以深紫与午夜黑为基底，营造幽暗而深邃的空间感
- 符文装饰：金色符文与月相符号作为核心装饰元素，赋予界面仪式感
- 星尘质感：背景中散布微光粒子效果，如同星空中的尘埃闪烁
- 自然魔法：草药绿与紫水晶色作为辅助色，连接自然与超自然的桥梁

设计语言融合了中世纪炼金术手稿、维多利亚时期占卜美学与现代暗色界面设计。每一个交互元素都应如同施展咒语般具有仪式感——按钮如同激活符文，卡片如同翻开塔罗牌，输入框如同铭刻预言。

适合场景：神秘学应用、塔罗占卜平台、水晶疗愈商店、暗黑美学博客、独立游戏界面。`,

  doList: [
    "背景使用深紫至午夜黑渐变 bg-gradient-to-b from-[#4a1942] to-[#0d0b14]",
    "金色符文文字 text-[#c9a74e] 搭配微光效果 [text-shadow:0_0_8px_rgba(201,167,78,0.4)]",
    "边框使用金色半透明 border border-[#c9a74e]/30 hover:border-[#c9a74e]/60",
    "卡片背景使用 bg-[#0d0b14]/80 backdrop-blur-sm 营造朦胧感",
    "星尘背景效果使用 radial-gradient 微光点缀",
    "使用衬线字体 font-serif 搭配 tracking-wider 增加仪式感",
    "交互元素悬停时增强金色光芒 hover:shadow-[0_0_20px_rgba(201,167,78,0.3)]",
    "使用紫水晶色 text-[#7b68ae] 作为次要信息色",
  ],

  dontList: [
    "禁止使用明亮白色或浅灰色背景",
    "禁止使用高饱和度的霓虹色（如 cyan、lime）",
    "禁止使用圆润可爱的设计元素（如 rounded-full 按钮）",
    "禁止使用现代无衬线字体作为主标题",
    "禁止使用普通阴影 shadow-md（必须是发光阴影或深色阴影）",
    "禁止使用欢快明亮的渐变（如粉蓝、粉紫渐变）",
    "禁止使用扁平化设计语言，所有元素需有层次与深度",
  ],

  components: {
    button: {
      name: "按钮",
      description: "巫术核心风格的符文按钮",
      code: `// Rune Primary
<button className="px-8 py-3 bg-[#4a1942] border border-[#c9a74e]/50 text-[#c9a74e] font-serif uppercase tracking-widest shadow-[0_0_15px_rgba(201,167,78,0.2)] hover:shadow-[0_0_25px_rgba(201,167,78,0.4)] hover:border-[#c9a74e] transition-all duration-500">
  Invoke
</button>

// Rune Filled
<button className="px-8 py-3 bg-[#c9a74e] text-[#0d0b14] font-serif font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(201,167,78,0.4)] hover:shadow-[0_0_30px_rgba(201,167,78,0.6)] transition-all duration-500">
  Activate
</button>

// Amethyst Variant
<button className="px-8 py-3 bg-transparent border border-[#7b68ae]/50 text-[#7b68ae] font-serif uppercase tracking-widest shadow-[0_0_15px_rgba(123,104,174,0.2)] hover:shadow-[0_0_25px_rgba(123,104,174,0.4)] hover:border-[#7b68ae] transition-all duration-500">
  Divine
</button>`,
    },
    card: {
      name: "卡片",
      description: "巫术核心风格的塔罗卡片",
      code: `<div className="bg-[#0d0b14]/90 border border-[#c9a74e]/30 p-8 shadow-[0_4px_20px_rgba(13,11,20,0.8)] hover:shadow-[0_0_25px_rgba(201,167,78,0.15)] hover:border-[#c9a74e]/50 transition-all duration-500 relative overflow-hidden">
  {/* Stardust overlay */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(201,167,78,0.05)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(123,104,174,0.05)_0%,transparent_50%)] pointer-events-none" />

  <div className="relative">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1.5 h-1.5 bg-[#c9a74e] shadow-[0_0_8px_rgba(201,167,78,0.6)]" />
      <span className="text-[#c9a74e]/60 font-serif text-xs uppercase tracking-[0.2em]">The Moon</span>
    </div>
    <h3 className="text-[#c9a74e] font-serif text-xl tracking-wider mb-3" style={{textShadow: "0 0 10px rgba(201,167,78,0.3)"}}>
      Lunar Divination
    </h3>
    <p className="text-[#7b68ae]/70 font-serif leading-relaxed">
      The veils between worlds grow thin under the waning crescent.
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "巫术核心风格的铭文输入框",
      code: `<div className="space-y-2">
  <label className="block text-[#c9a74e]/70 font-serif text-xs uppercase tracking-[0.2em]">Inscription</label>
  <div className="relative">
    <input
      type="text"
      className="w-full px-6 py-4 bg-[#0d0b14]/80 border border-[#c9a74e]/20 text-[#c9a74e] font-serif placeholder-[#c9a74e]/20 focus:outline-none focus:border-[#c9a74e]/60 focus:shadow-[0_0_15px_rgba(201,167,78,0.15)] transition-all duration-500"
      placeholder="Speak your truth..."
    />
    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c9a74e]/30 font-serif text-sm">&#9790;</div>
  </div>
</div>`,
    },
  },

  globalCss: `/* Witchcore Global Styles */
@layer base {
  body {
    @apply bg-[#0d0b14] text-[#c9a74e]/80 antialiased;
    font-family: Georgia, 'Times New Roman', serif;
  }

  h1, h2, h3 {
    text-shadow: 0 0 12px rgba(201, 167, 78, 0.3);
  }

  ::selection {
    @apply bg-[#4a1942] text-[#c9a74e];
  }
}

/* Stardust background */
.witchcore-stardust {
  background-image:
    radial-gradient(1px 1px at 10% 20%, rgba(201, 167, 78, 0.3), transparent),
    radial-gradient(1px 1px at 30% 60%, rgba(123, 104, 174, 0.2), transparent),
    radial-gradient(1px 1px at 70% 40%, rgba(201, 167, 78, 0.2), transparent),
    radial-gradient(1px 1px at 90% 80%, rgba(61, 139, 110, 0.2), transparent);
}

@keyframes rune-pulse {
  0%, 100% { opacity: 1; text-shadow: 0 0 8px rgba(201, 167, 78, 0.4); }
  50% { opacity: 0.8; text-shadow: 0 0 16px rgba(201, 167, 78, 0.6); }
}`,

  aiRules: `STYLE: Witchcore
TYPE: Occult mystical interface

MUST USE:
- Dark backgrounds: bg-[#0d0b14] or bg-[#4a1942]
- Gold rune text: text-[#c9a74e]
- Text glow: style={{textShadow: '0 0 10px rgba(201,167,78,0.3)'}}
- Glowing gold borders: border border-[#c9a74e]/30
- Serif fonts: font-serif for all text
- uppercase tracking-wider for labels
- Amethyst secondary: text-[#7b68ae]
- Herb green accent: text-[#3d8b6e]

MUST AVOID:
- Light/white backgrounds
- Neon/high-saturation modern colors
- Sans-serif fonts for headings
- Regular shadows (shadow-md)
- Rounded/cute elements (rounded-full)
- Bright cheerful gradients

COLOR RULES:
- Primary: Mystic purple (#4a1942)
- Secondary: Midnight (#0d0b14)
- Gold rune: #c9a74e
- Amethyst: #7b68ae
- Herb green: #3d8b6e

SPECIAL EFFECTS:
- Stardust particle overlays
- Rune glow pulsing animation
- Moon phase symbols as decorative elements
- Radial gradient for mystical light sources`,

  examplePrompts: [
    {
      title: "塔罗占卜界面",
      titleEn: "Tarot Reading Interface",
      description: "巫术核心风格的塔罗占卜应用",
      descriptionEn: "Witchcore tarot divination app",
      prompt: `Create a tarot reading interface using Witchcore style:
- Dark midnight background with stardust particles
- Gold rune decorative borders
- Tarot card layout with flip animation
- Moon phase indicator at the top
- Serif typography with mystical glow
- Amethyst accent for secondary information`,
    },
  ],
};
