import type { DesignStyle } from "./types";

export const witchcore: DesignStyle = {
  slug: "witchcore",
  name: "巫术核心",
  nameEn: "Witchcore",
  description:
    "神秘学美学风格，塔罗牌、月相符号、水晶与草药元素。深紫色调搭配金色神秘符文，暗色背景上闪烁的星尘效果。",
  descriptionEn:
    "Occult aesthetic style with tarot cards, moon phase symbols, crystals, and herbal elements. Deep purple tones paired with golden mystical runes and shimmering stardust effects on dark backgrounds.",
  cover: "/styles/witchcore.svg",
  styleType: "visual",
  tags: ["high-contrast"],
  category: "expressive",
  colors: {
    primary: "#4a1942",
    secondary: "#0d0b14",
    accent: ["#c9a74e", "#7b68ae", "#3d8b6e", "#6bc15e"],
  },
  keywords: ["巫术", "神秘", "塔罗", "月相", "水晶", "符文", "暗黑", "expressive", "bold", "vibrant"],

  philosophy: `Witchcore（巫术核心）设计灵感源自神秘学、塔罗牌与自然魔法传统，通过深邃的暗紫色调与闪烁的金色符文，构建一个充满仪式感与神秘力量的视觉世界。

核心理念：
- 神秘氛围：以深紫与午夜黑为基底，营造幽暗而深邃的空间感
- 符文装饰：金色符文与月相符号作为核心装饰元素，赋予界面仪式感
- 星尘质感：背景中散布微光粒子效果，如同星空中的尘埃闪烁
- 自然魔法：草药绿与紫水晶色作为辅助色，连接自然与超自然的桥梁

设计语言融合了中世纪炼金术手稿、维多利亚时期占卜美学与现代暗色界面设计。每一个交互元素都应如同施展咒语般具有仪式感——按钮如同激活符文，卡片如同翻开塔罗牌，输入框如同铭刻预言。

适合场景：神秘学应用、塔罗占卜平台、水晶疗愈商店、暗黑美学博客、独立游戏界面。`,

  philosophyEn: `Witchcore design draws inspiration from the occult, tarot, and natural magic traditions, constructing a visual world filled with ritual and mystical power through deep, dark purple tones and shimmering golden runes.

Core concepts:
- Mystical atmosphere: Deep purple and midnight black as the foundation, creating a dark and profound sense of space
- Rune decoration: Golden runes and moon phase symbols as core decorative elements, imbuing the interface with a sense of ritual
- Stardust texture: Faint glowing particles scattered across backgrounds, like dust shimmering in a starlit sky
- Natural magic: Herb green and amethyst purple as supporting colors, bridging the natural and the supernatural

The design language blends medieval alchemical manuscripts, Victorian-era divination aesthetics, and modern dark interface design. Every interactive element should feel like casting a spell -- buttons like activating runes, cards like turning tarot cards, input fields like inscribing prophecies.

Suitable for: occult apps, tarot reading platforms, crystal healing shops, dark aesthetic blogs, indie game interfaces.`,

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

  doListEn: [
    "Use deep purple to midnight black gradient backgrounds bg-gradient-to-b from-[#4a1942] to-[#0d0b14]",
    "Gold rune text text-[#c9a74e] with subtle glow [text-shadow:0_0_8px_rgba(201,167,78,0.4)]",
    "Use semi-transparent gold borders border border-[#c9a74e]/30 hover:border-[#c9a74e]/60",
    "Card backgrounds use bg-[#0d0b14]/80 backdrop-blur-sm for a hazy feel",
    "Stardust background effects using radial-gradient with subtle light accents",
    "Use serif fonts font-serif paired with tracking-wider for a ritualistic feel",
    "Interactive elements enhance gold glow on hover hover:shadow-[0_0_20px_rgba(201,167,78,0.3)]",
    "Use amethyst color text-[#7b68ae] as secondary information color",
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

  dontListEn: [
    "Do not use bright white or light gray backgrounds",
    "Do not use high-saturation neon colors (such as cyan, lime)",
    "Do not use rounded cute design elements (such as rounded-full buttons)",
    "Do not use modern sans-serif fonts as main headings",
    "Do not use regular shadows shadow-md (must be glow shadows or deep shadows)",
    "Do not use bright cheerful gradients (such as pink-blue, pink-purple gradients)",
    "Do not use flat design language; all elements need layers and depth",
  ],

  components: {
    button: {
      name: "按钮",
      description: "巫术核心风格的符文按钮",
      code: `// Rune Primary
<button className="px-10 py-3 bg-[#4a1942] border border-[#c9a74e]/50 text-[#c9a74e] font-serif uppercase tracking-[0.3em] shadow-[0_0_15px_rgba(201,167,78,0.2)] hover:shadow-[0_0_30px_rgba(201,167,78,0.6),inset_0_0_10px_rgba(201,167,78,0.2)] hover:border-[#c9a74e] hover:bg-[#5a1e50] active:shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] active:translate-y-1 transition-all duration-700 ease-in-out">
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
      code: `<div className="group p-10 bg-[#0d0b14]/95 border border-[#c9a74e]/30 shadow-[0_4px_20px_rgba(13,11,20,0.9)] hover:shadow-[0_0_40px_rgba(123,104,174,0.3)] hover:-translate-y-2 hover:border-[#c9a74e]/60 transition-all duration-1000 ease-in-out cursor-default relative overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(123,104,174,0.1),transparent_50%)] opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
  <div className="relative z-10 flex flex-col items-center text-center">
    <div className="w-2 h-2 bg-[#c9a74e] rounded-full shadow-[0_0_10px_rgba(201,167,78,0.8)] mb-6 group-hover:scale-150 group-hover:shadow-[0_0_20px_rgba(201,167,78,1)] transition-all duration-700" />
    <h3 className="text-[#c9a74e] font-serif text-2xl tracking-[0.2em] mb-4 uppercase group-hover:drop-shadow-[0_0_8px_rgba(201,167,78,0.5)] transition-all duration-700" style={{textShadow: "0 0 10px rgba(201,167,78,0.3)"}}>
      Lunar Divination
    </h3>
    <p className="text-[#7b68ae]/80 font-serif leading-relaxed group-hover:text-[#7b68ae] transition-colors duration-700">
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
}
/* Witchcore Design Tokens */
:root {
  --witchcore-primary: #4a1942;
  --witchcore-secondary: #0d0b14;
  --witchcore-accent: #c9a74e;
  --witchcore-glow: rgba(74, 25, 66, 0.3);
}

.witchcore-card {
  position: relative;
  overflow: hidden;
}

.witchcore-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(74, 25, 66, 0.05), transparent);
  pointer-events: none;
}

.witchcore-card:hover::before {
  opacity: 1;
}

.witchcore-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(74, 25, 66, 0.08);
}

.witchcore-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.witchcore-animate-in {
  animation: witchcore-fade-in 0.5s ease-out both;
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
- Radial gradient for mystical light sources

ANIMATION & INTERACTION RULES:
- Ritual Levitation: Cards and primary elements must NOT bounce quickly. Use extremely slow upfloat (hover:-translate-y-2) with duration-1000 ease-in-out. Simulate the feeling of ritual levitation, not a spring.
- Occult Glow: On hover, the gold rune glow (text-shadow or box-shadow using #c9a74e) must expand and pulse as if imbued with magic. Use drop-shadow CSS filter on headings for text glow enhancement.
- Shadow Engulf: On dark backgrounds (#0d0b14), hover should expand a deep purple/amethyst outer glow outward, simulating dark matter or mystical fog spreading.
- Talisman Press: On :active, cancel the glow and add a deep inset shadow (active:shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]) plus slight downward translate (active:translate-y-1), simulating pressing a heavy talisman or ritual object.`,

  aiRulesEn: `STYLE: Witchcore
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
- Radial gradient for mystical light sources

ANIMATION & INTERACTION RULES:
- Ritual Levitation: Cards and primary elements must NOT bounce quickly. Use extremely slow upfloat (hover:-translate-y-2) with duration-1000 ease-in-out. Simulate the feeling of ritual levitation, not a spring.
- Occult Glow: On hover, the gold rune glow (text-shadow or box-shadow using #c9a74e) must expand and pulse as if imbued with magic. Use drop-shadow CSS filter on headings for text glow enhancement.
- Shadow Engulf: On dark backgrounds (#0d0b14), hover should expand a deep purple/amethyst outer glow outward, simulating dark matter or mystical fog spreading.
- Talisman Press: On :active, cancel the glow and add a deep inset shadow (active:shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]) plus slight downward translate (active:translate-y-1), simulating pressing a heavy talisman or ritual object.`,

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
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 巫术核心风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Witchcore style",
      prompt: `Create a SaaS landing page using Witchcore style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 巫术核心风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Witchcore style",
      prompt: `Create a portfolio showcase page using Witchcore style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "witchcore-warm",
      name: "巫术核心暖色版",
      nameEn: "Witchcore Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#53182c",
        secondary: "#25232c",
        accent: ["#98b649", "#9861a1", "#40878d"],
      },
    },
    {
      id: "witchcore-cool",
      name: "巫术核心冷色版",
      nameEn: "Witchcore Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#371d50",
        secondary: "#0c0a12",
        accent: ["#f1986b", "#5b72ab", "#4a8a52"],
      },
    },
  ],
};
