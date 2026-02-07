import { DesignStyle } from "./index";

export const steampunk: DesignStyle = {
  slug: "steampunk",
  name: "蒸汽朋克",
  nameEn: "Steampunk",
  description:
    "维多利亚时代工业机械美学，黄铜与铜质金属元素、齿轮机关装饰、蒸汽管道铆钉细节。适合复古科幻、工业风格、创意展示项目。",
  cover: "/styles/steampunk.svg",
  styleType: "visual",
  tags: ["expressive", "retro", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#b5a642",
    secondary: "#3d2b1f",
    accent: ["#b87333", "#f5f0e1", "#4a4a4a"],
  },
  keywords: ["蒸汽朋克", "齿轮", "黄铜", "铜质", "工业", "发条", "维多利亚", "铆钉"],

  philosophy: `Steampunk 风格源自维多利亚时代工业革命的美学想象，通过黄铜/铜质金属质感、齿轮机关元素和精密的机械细节创造复古未来感。

核心理念：
- 金属质感：黄铜与铜质为核心色调，呈现温暖的金属光泽
- 机械装饰：齿轮、管道、铆钉等工业元素融入界面设计
- 维多利亚优雅：使用衬线字体和装饰性边框保持古典优雅
- 做旧纹理：深棕色背景与泛黄纸张色营造年代感`,

  doList: [
    "背景使用深棕色 bg-[#3d2b1f] 或 bg-[#2a1f15]",
    "使用 shadow-[0_0_15px_rgba(181,166,66,0.3)] 创造黄铜光泽效果",
    "边框使用铜色调 border border-[#b87333]/50",
    "文字使用奶油色 text-[#f5f0e1] 或黄铜色 text-[#b5a642]",
    "使用装饰性边框和铆钉样式圆点元素",
    "按钮使用黄铜色渐变 bg-gradient-to-b from-[#b5a642] to-[#8a7d32]",
    "使用 font-serif 衬线字体体现维多利亚风格",
  ],

  dontList: [
    "禁止使用纯白色背景或现代极简风格",
    "禁止使用霓虹色或高饱和度荧光色",
    "禁止使用扁平无质感的设计",
    "禁止使用现代无衬线字体作为标题",
    "禁止使用过大圆角 rounded-2xl, rounded-3xl",
    "禁止使用冷色调蓝色/紫色作为主色",
  ],

  components: {
    button: {
      name: "按钮",
      description: "蒸汽朋克风格的黄铜机械按钮",
      code: `// Brass Primary
<button className="px-6 py-3 bg-gradient-to-b from-[#b5a642] to-[#8a7d32] text-[#2a1f15] rounded border border-[#d4c85c] shadow-[0_0_12px_rgba(181,166,66,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(181,166,66,0.5)] transition-all duration-300 font-serif font-bold uppercase tracking-wider">
  Engage
</button>

// Copper Outline
<button className="px-6 py-3 bg-transparent border-2 border-[#b87333] text-[#b87333] rounded shadow-[0_0_10px_rgba(184,115,51,0.2)] hover:shadow-[0_0_20px_rgba(184,115,51,0.4)] hover:bg-[#b87333]/10 transition-all duration-300 font-serif font-bold uppercase tracking-wider">
  Activate
</button>

// Iron Variant
<button className="px-6 py-3 bg-gradient-to-b from-[#5a5a5a] to-[#3a3a3a] text-[#f5f0e1] rounded border border-[#6a6a6a] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.3)] hover:from-[#6a6a6a] hover:to-[#4a4a4a] transition-all duration-300 font-serif font-bold uppercase tracking-wider">
  Deploy
</button>`,
    },
    card: {
      name: "卡片",
      description: "蒸汽朋克风格的机械面板卡片",
      code: `<div className="bg-[#2a1f15] border-2 border-[#b87333]/40 rounded p-6 shadow-[0_0_15px_rgba(184,115,51,0.15)] hover:shadow-[0_0_25px_rgba(184,115,51,0.25)] hover:border-[#b87333]/60 transition-all duration-300 relative overflow-hidden">
  {/* Corner rivets */}
  <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#d4c85c] to-[#8a7d32] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.3)]" />
  <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#d4c85c] to-[#8a7d32] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.3)]" />
  <div className="absolute bottom-2 left-2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#d4c85c] to-[#8a7d32] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.3)]" />
  <div className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#d4c85c] to-[#8a7d32] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.3)]" />

  <div className="relative">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-5 h-5 rounded-full border-2 border-[#b5a642] flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-[#b5a642]" />
      </div>
      <h3 className="text-[#b5a642] font-serif uppercase tracking-wider text-sm">Mechanism Module</h3>
    </div>
    <h4 className="text-[#f5f0e1] text-xl font-serif font-bold mb-3">
      Clockwork Engine
    </h4>
    <p className="text-[#b87333]/80 leading-relaxed font-serif">
      Precision-engineered brass mechanism with steam-driven power core.
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "蒸汽朋克风格的输入框",
      code: `<div className="space-y-2">
  <label className="block text-[#b5a642] font-serif text-xs uppercase tracking-wider">Access Cipher</label>
  <div className="relative">
    <input
      type="text"
      className="w-full px-4 py-3 bg-[#2a1f15] border-2 border-[#b87333]/30 rounded text-[#f5f0e1] font-serif placeholder:text-[#b87333]/30 focus:outline-none focus:border-[#b5a642] focus:shadow-[0_0_12px_rgba(181,166,66,0.25)] transition-all duration-300"
      placeholder="Enter cipher key..."
    />
    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#d4c85c] to-[#8a7d32] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.3)]" />
  </div>
</div>`,
    },
  },

  globalCss: `/* Steampunk Global Styles */
@layer base {
  body {
    @apply bg-[#2a1f15] text-[#f5f0e1] antialiased;
  }

  h1, h2, h3 {
    font-family: Georgia, 'Times New Roman', serif;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }

  ::selection {
    @apply bg-[#b5a642] text-[#2a1f15];
  }
}

@keyframes gear-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`,

  aiRules: `STYLE: Steampunk
TYPE: Victorian industrial machinery aesthetic

MUST USE:
- Dark brown background: bg-[#2a1f15] or bg-[#3d2b1f]
- Brass color: text-[#b5a642], bg-[#b5a642]
- Copper color: text-[#b87333], border-[#b87333]
- Cream text: text-[#f5f0e1]
- Metallic gradients: bg-gradient-to-b from-[#b5a642] to-[#8a7d32]
- Brass glow shadows: shadow-[0_0_15px_rgba(181,166,66,0.3)]
- font-serif for Victorian feel
- uppercase tracking-wider for labels
- Rivet decorations: small gradient circles at corners
- Ornate borders: border-2 with copper/brass colors

MUST AVOID:
- White/light backgrounds
- Neon or fluorescent colors
- Flat design without texture
- Modern sans-serif fonts for headings
- Large rounded corners (rounded-2xl+)
- Cold blue/purple color schemes

COLOR RULES:
- Primary: Brass (#b5a642)
- Secondary: Copper (#b87333)
- Background: Dark Brown (#2a1f15, #3d2b1f)
- Text: Cream (#f5f0e1)
- Iron accent: (#4a4a4a)

SPECIAL EFFECTS:
- Corner rivet decorations (small brass circles)
- Metallic inset shadows for depth
- Warm glow on hover interactions
- Gradient overlays for metal texture`,

  examplePrompts: [
    {
      title: "机械仪表盘",
      titleEn: "Mechanical Dashboard",
      description: "生成蒸汽朋克风格仪表盘界面",
      descriptionEn: "Generate steampunk dashboard interface",
      prompt: `Create a dashboard interface using Steampunk style:
- Dark brown background with brass accents
- Gauge and dial-style data displays
- Cards with corner rivet decorations
- Brass gradient buttons with metallic sheen
- Victorian serif typography
- Copper border accents and warm glow effects`,
    },
  ],
};
