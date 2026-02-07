import { DesignStyle } from "./index";

export const solarpunk: DesignStyle = {
  slug: "solarpunk",
  name: "太阳朋克",
  nameEn: "Solarpunk",
  description:
    "乐观的生态未来主义风格，融合自然与科技的和谐美学。有机曲线、植物元素、温暖渐变、柔和圆角。适合环保、可持续发展、绿色科技产品。",
  cover: "/styles/solarpunk.svg",
  styleType: "visual",
  tags: ["modern", "expressive"],
  category: "expressive",
  colors: {
    primary: "#4ade80",
    secondary: "#fbbf24",
    accent: ["#38bdf8", "#a16207", "#fef3c7"],
  },
  keywords: ["生态未来", "可持续", "绿色科技", "植物", "太阳能", "有机", "自然", "乐观"],

  philosophy: `Solarpunk 风格源自对未来的乐观想象，描绘人与自然和谐共存的世界。通过有机曲线、植物元素和温暖色调传递希望与生机。

核心理念：
- 自然融合：将植物与科技元素有机结合
- 温暖色调：叶绿、金黄、天蓝构成温暖调色板
- 有机曲线：使用柔和圆角和流动线条
- 乐观情感：明亮、清新、充满生命力的视觉语言`,

  doList: [
    "背景使用温暖浅色 bg-[#fef3c7] 或 bg-green-50",
    "主色调使用叶绿 text-green-400 或 bg-green-400",
    "强调色使用金黄 text-amber-400 或 bg-amber-400",
    "使用大圆角 rounded-2xl 或 rounded-3xl 体现有机感",
    "使用温暖渐变 bg-gradient-to-br from-green-400 to-amber-400",
    "卡片添加植物主题装饰元素",
    "使用柔和阴影 shadow-lg shadow-green-200/50",
  ],

  dontList: [
    "禁止使用纯黑背景或暗色主题",
    "禁止使用尖锐直角 rounded-none",
    "禁止使用冷酷工业风元素",
    "禁止使用高对比度霓虹发光效果",
    "禁止使用反乌托邦、废土元素",
    "禁止使用灰暗压抑的配色方案",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Solarpunk 风格的有机自然按钮",
      code: `// Leaf Primary
<button className="px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl shadow-lg shadow-green-300/40 hover:shadow-xl hover:shadow-green-300/50 hover:scale-105 transition-all duration-300 font-medium">
  Grow Together
</button>

// Solar Gold
<button className="px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900 rounded-2xl shadow-lg shadow-amber-300/40 hover:shadow-xl hover:shadow-amber-300/50 hover:scale-105 transition-all duration-300 font-medium">
  Harvest Energy
</button>

// Outline Organic
<button className="px-6 py-3 bg-transparent border-2 border-green-400 text-green-600 rounded-2xl hover:bg-green-50 hover:shadow-lg hover:shadow-green-200/40 transition-all duration-300 font-medium">
  Explore Nature
</button>`,
    },
    card: {
      name: "卡片",
      description: "Solarpunk 风格的自然生态卡片",
      code: `<div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-3xl p-6 shadow-lg shadow-green-100/50 hover:shadow-xl hover:shadow-green-200/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
  {/* Organic decoration */}
  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-100 to-transparent rounded-bl-full" />

  <div className="relative">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
        <Leaf className="w-4 h-4 text-white" />
      </div>
      <h3 className="text-green-700 font-semibold text-sm uppercase tracking-wide">Eco Module</h3>
    </div>
    <h4 className="text-gray-800 text-xl font-bold mb-3">
      Solar Garden
    </h4>
    <p className="text-gray-600 leading-relaxed">
      A harmonious blend of sustainable technology and living greenery.
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Solarpunk 风格的输入框",
      code: `<div className="space-y-2">
  <label className="block text-green-700 font-medium text-sm">Seed Name</label>
  <div className="relative">
    <input
      type="text"
      className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl text-gray-800 placeholder:text-green-300 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-200/40 transition-all duration-300"
      placeholder="Enter your seed name..."
    />
    <div className="absolute right-3 top-1/2 -translate-y-1/2">
      <Sprout className="w-5 h-5 text-green-400" />
    </div>
  </div>
</div>`,
    },
  },

  globalCss: `/* Solarpunk Global Styles */
@layer base {
  body {
    @apply bg-[#f0fdf4] text-gray-800 antialiased;
    background-image:
      radial-gradient(circle at 20% 80%, rgba(74, 222, 128, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.06) 0%, transparent 50%);
  }

  h1, h2, h3 {
    @apply text-green-800;
  }

  ::selection {
    @apply bg-green-200 text-green-900;
  }
}

@keyframes sway {
  0%, 100% { transform: rotate(-1deg); }
  50% { transform: rotate(1deg); }
}`,

  aiRules: `STYLE: Solarpunk
TYPE: Eco-futurism organic interface

MUST USE:
- Light warm background: bg-[#f0fdf4] or bg-green-50 or bg-[#fef3c7]
- Organic gradients: bg-gradient-to-r from-green-400 to-emerald-500
- Soft shadows: shadow-lg shadow-green-200/50
- Large rounded corners: rounded-2xl or rounded-3xl
- Plant-themed icons: Leaf, Sun, Sprout, TreePine from Lucide
- Warm color palette: green-400, amber-400, sky-400
- Semi-transparent backgrounds: bg-white/80 backdrop-blur-sm

MUST AVOID:
- Dark/black backgrounds
- Sharp corners (rounded-none, rounded-sm)
- Industrial cold design
- Neon glow effects
- Dystopian or harsh aesthetics
- Gray/muted color schemes

COLOR RULES:
- Primary: Leaf Green (#4ade80)
- Secondary: Solar Gold (#fbbf24)
- Accent: Sky Blue (#38bdf8)
- Background: Warm cream (#fef3c7) or green-50
- Text: Dark green or gray-800
- Borders: Green-200 with subtle tint

SPECIAL EFFECTS:
- Organic gradient decorations
- Subtle backdrop blur for depth
- Hover lift with shadow enhancement
- Smooth transitions duration-300`,

  examplePrompts: [
    {
      title: "生态仪表盘",
      titleEn: "Eco Dashboard",
      description: "生成太阳朋克风格的绿色能源仪表盘",
      descriptionEn: "Generate a solarpunk green energy dashboard",
      prompt: `Create an eco dashboard using Solarpunk style:
- Light warm background with organic gradient accents
- Cards with rounded-3xl corners and green borders
- Energy stats with leaf green and solar gold colors
- Plant-themed icons (Leaf, Sun, Sprout) from Lucide
- Progress bars with green-to-amber gradients
- Hover effects with shadow enhancement`,
    },
  ],
};
