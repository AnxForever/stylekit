import { DesignStyle } from "./index";

export const neonTokyo: DesignStyle = {
  slug: "neon-tokyo",
  name: "霓虹东京",
  nameEn: "Neon Tokyo",
  description:
    "东京歌舞伎町霓虹夜景风格，湿润的街道倒影、叠层霓虹招牌、赛博朋克城市夜色。不同于cyberpunk-neon的科幻感，更偏向真实都市夜景。",
  cover: "/styles/neon-tokyo.svg",
  styleType: "visual",
  tags: ["modern", "high-contrast"],
  category: "modern",
  colors: {
    primary: "#ff1493",
    secondary: "#0a0a1a",
    accent: ["#00f0ff", "#ff6b00", "#bc13fe"],
  },
  keywords: ["霓虹", "东京", "夜景", "歌舞伎町", "都市", "招牌", "倒影"],

  philosophy: `Neon Tokyo（霓虹东京）灵感源自东京歌舞伎町、新宿和涩谷的霓虹夜景。不同于 Cyberpunk Neon 的科幻未来感，这个风格更贴近真实的都市夜色——雨后的街道倒映着层叠的霓虹招牌，暖色与冷色交织在潮湿的沥青上。

核心理念：
- 都市夜色：以近黑的深蓝灰为基底，模拟东京深夜的城市天际线
- 霓虹招牌：多色霓虹灯光叠加，粉色、青色、橙色和紫色交错闪烁
- 湿润反射：元素带有微妙的反射感，如同雨后街道上的霓虹倒影
- 层次纵深：前景明亮、背景幽暗，模拟城市街巷的视觉纵深

与 Cyberpunk Neon 的关键区别在于：Neon Tokyo 更温暖、更有机、更接近真实摄影质感。它不追求冰冷的科技感，而是捕捉深夜独行者在霓虹丛林中的那种孤独浪漫。

适合场景：夜生活应用、音乐流媒体、潮流品牌、城市摄影作品集、日式居酒屋菜单。`,

  doList: [
    "背景使用深夜蓝黑 bg-[#0a0a1a] 或 bg-gradient-to-b from-[#0a0a1a] to-[#12041e]",
    "霓虹粉色文字 text-[#ff1493] 搭配发光 [text-shadow:0_0_10px_rgba(255,20,147,0.6)]",
    "多色霓虹边框交替使用 border-[#ff1493]、border-[#00f0ff]、border-[#ff6b00]",
    "悬停时增强霓虹光晕 hover:shadow-[0_0_30px_rgba(255,20,147,0.5)]",
    "使用 sans-serif 粗体字搭配日文假名装饰元素",
    "卡片背景添加微透明 bg-[#0a0a1a]/80 backdrop-blur-md 模拟玻璃反射",
    "渐变文字效果 bg-gradient-to-r from-[#ff1493] to-[#00f0ff] bg-clip-text text-transparent",
    "使用 box-shadow 多层叠加模拟霓虹灯管的光晕扩散",
  ],

  dontList: [
    "禁止使用白色或浅色背景",
    "禁止使用低饱和度、灰暗的颜色",
    "禁止使用常规阴影 shadow-md（必须是彩色发光阴影）",
    "禁止使用柔和的渐变（如柔粉、淡蓝）",
    "禁止使用衬线字体（除非作为日式装饰元素）",
    "禁止使用过于规整、企业化的布局",
    "禁止使用单一颜色的霓虹（必须多色交织）",
  ],

  components: {
    button: {
      name: "按钮",
      description: "霓虹东京风格的发光按钮",
      code: `<button className="
  group relative
  px-6 py-3
  bg-[#0a0a1a]/80 backdrop-blur-md
  border-2 border-[#ff1493]
  text-[#ff1493] font-bold uppercase tracking-wider
  shadow-[0_0_15px_rgba(255,20,147,0.4),0_0_20px_rgba(0,240,255,0.15),inset_0_0_12px_rgba(255,20,147,0.08)]
  hover:text-white hover:border-[#00f0ff] hover:bg-[#ff1493]/10
  hover:shadow-[0_0_28px_rgba(255,20,147,0.7),0_0_36px_rgba(0,240,255,0.45),0_0_44px_rgba(255,107,0,0.3)]
  active:bg-[#ff1493]/20
  transition-all duration-500
  rounded-sm
">
  Enter
</button>`,
    },
    card: {
      name: "卡片",
      description: "霓虹东京风格的街景卡片",
      code: `<div className="group relative overflow-hidden bg-[#0a0a1a]/80 backdrop-blur-md border border-[#ff1493]/30 rounded-sm p-6 shadow-[0_0_15px_rgba(255,20,147,0.15)] hover:border-[#ff1493]/60 hover:shadow-[0_0_28px_rgba(255,20,147,0.35),0_0_44px_rgba(0,240,255,0.18)] transition-all duration-500">
  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#ff1493]/10 via-[#00f0ff]/0 to-transparent pointer-events-none transition-all duration-500 group-hover:from-[#ff1493]/30 group-hover:via-[#00f0ff]/15" />
  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#ff6b00]/10 to-transparent pointer-events-none opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

  <div className="relative">
    <div className="flex items-center justify-between mb-4">
      <span className="text-[#00f0ff] text-xs font-bold uppercase tracking-widest transition-colors duration-300 group-hover:text-white">Kabukicho</span>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-[#ff1493] shadow-[0_0_6px_rgba(255,20,147,0.8)] transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_14px_rgba(255,20,147,1)]" />
        <div className="w-1.5 h-1.5 bg-[#00f0ff] shadow-[0_0_6px_rgba(0,240,255,0.8)] transition-all duration-300 delay-75 group-hover:scale-150 group-hover:shadow-[0_0_14px_rgba(0,240,255,1)]" />
        <div className="w-1.5 h-1.5 bg-[#ff6b00] shadow-[0_0_6px_rgba(255,107,0,0.8)] transition-all duration-300 delay-150 group-hover:scale-150 group-hover:shadow-[0_0_14px_rgba(255,107,0,1)]" />
      </div>
    </div>
    <h3 className="text-white text-xl font-bold mb-3 animate-[neon-flicker_3s_linear_infinite] transition-all duration-300 group-hover:[text-shadow:0_0_16px_rgba(255,20,147,0.8),0_0_28px_rgba(0,240,255,0.35)]">
      Midnight Alley
    </h3>
    <p className="text-gray-400 leading-relaxed text-sm transition-colors duration-300 group-hover:text-gray-200">
      Neon signs flicker above rain-slicked streets, casting liquid color across the pavement.
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "霓虹东京风格的输入框",
      code: `<div className="space-y-2">
  <label className="block text-[#00f0ff] text-xs font-bold uppercase tracking-widest">Location</label>
  <div className="relative">
    <input
      type="text"
      className="w-full px-4 py-3 bg-[#0a0a1a]/80 backdrop-blur-sm border border-[#ff1493]/30 rounded-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#ff1493] focus:shadow-[0_0_15px_rgba(255,20,147,0.3)] transition-all duration-300"
      placeholder="Search the neon streets..."
    />
    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff1493] shadow-[0_0_8px_rgba(255,20,147,0.8)] animate-pulse" />
  </div>
</div>`,
    },
  },

  globalCss: `/* Neon Tokyo Global Styles */
@layer base {
  body {
    @apply bg-[#0a0a1a] text-white antialiased;
  }

  h1, h2, h3 {
    text-shadow: 0 0 15px rgba(255, 20, 147, 0.4);
  }

  ::selection {
    @apply bg-[#ff1493] text-white;
  }
}

/* Wet street reflection */
.neon-tokyo-reflect {
  position: relative;
}
.neon-tokyo-reflect::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 60%,
    rgba(255, 20, 147, 0.03) 80%,
    rgba(0, 240, 255, 0.03) 100%
  );
  pointer-events: none;
}

@keyframes neon-flicker {
  0%, 95%, 100% { opacity: 1; }
  96% { opacity: 0.6; }
  97% { opacity: 1; }
  98% { opacity: 0.8; }
}`,

  aiRules: `STYLE: Neon Tokyo
TYPE: Urban nightscape interface

MUST USE:
- Dark night sky background: bg-[#0a0a1a]
- Multi-color neon glows (not single-color)
- Primary pink: text-[#ff1493], border-[#ff1493]
- Cyan accent: text-[#00f0ff]
- Warm neon: text-[#ff6b00]
- Purple neon: text-[#bc13fe]
- Glow shadows with color: shadow-[0_0_20px_rgba(255,20,147,0.5)]
- backdrop-blur for glass/reflection effect
- font-bold uppercase tracking-wider for labels
- rounded-sm for subtle edge softness

MUST AVOID:
- Light/white backgrounds
- Low saturation or muted colors
- Regular shadows (shadow-md)
- Serif fonts (except for Japanese decorative text)
- Single-color neon palettes
- Corporate or overly clean layouts

COLOR RULES:
- Neon Pink: #ff1493 (primary)
- Night Sky: #0a0a1a (background)
- Cyan Neon: #00f0ff
- Warm Neon: #ff6b00
- Purple Neon: #bc13fe

DIFFERENCE FROM CYBERPUNK-NEON:
- Warmer, more organic feel
- Multi-color neon mixing (not cyan-dominant)
- Street photography aesthetic, not sci-fi
- Wet reflections, not scan lines

## Animation & Interaction Rules

- Rain-Slicked Reflections: bottom reflection gradients should intensify on hover with higher opacity and mixed-color refraction.
- Signboard Flicker: primary neon headings can use subtle irregular flicker to mimic aging street signage.
- Bleeding Glows: hover state should expand pink/cyan/orange glow layers simultaneously so light bleeds at the edges.
- Damp Atmosphere: transitions stay smooth (duration-300 to 500) to preserve wet-night ambience rather than sharp arcade motion.`,

  examplePrompts: [
    {
      title: "夜间餐厅菜单",
      titleEn: "Night Restaurant Menu",
      description: "霓虹东京风格的深夜食堂界面",
      descriptionEn: "Neon Tokyo late-night dining interface",
      prompt: `Create a late-night restaurant menu using Neon Tokyo style:
- Dark background with neon sign decorations
- Menu items with warm orange and pink neon accents
- Category tabs with multi-color neon borders
- Hero section with flickering neon sign effect
- Wet street reflection aesthetic at the bottom
- Japanese text decorations for atmosphere`,
    },
  ],
};
