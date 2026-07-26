import type { DesignStyle } from "./types";

export const solarpunk: DesignStyle = {
  slug: "solarpunk",
  name: "太阳朋克",
  nameEn: "Solarpunk",
  description:
    "乐观的生态未来主义风格，融合自然与科技的和谐美学。有机曲线、植物元素、温暖渐变、柔和圆角。适合环保、可持续发展、绿色科技产品。",
  descriptionEn:
    "An optimistic eco-futurism style blending nature and technology in harmonious aesthetics. Organic curves, plant elements, warm gradients, and soft rounded corners. Ideal for eco-friendly, sustainable development, and green tech products.",
  cover: "/styles/solarpunk.svg",
  styleType: "visual",
  tags: [],
  category: "expressive",
  colors: {
    primary: "#4ade80",
    secondary: "#fbbf24",
    accent: ["#38bdf8", "#a16207", "#fef3c7", "#b692ff"],
  },
  keywords: ["生态未来", "可持续", "绿色科技", "植物", "太阳能", "有机", "自然", "乐观", "expressive", "bold"],
  keywordsEn: ["solarpunk", "solarpunk aesthetic", "eco futurism", "sustainable design", "green tech", "organic shapes", "botanical elements", "solar energy", "nature-inspired ui", "optimistic future", "green energy dashboard", "eco friendly website"],

  philosophy: `Solarpunk 风格源自对未来的乐观想象，描绘人与自然和谐共存的世界。通过有机曲线、植物元素和温暖色调传递希望与生机。

核心理念：
- 自然融合：将植物与科技元素有机结合
- 温暖色调：叶绿、金黄、天蓝构成温暖调色板
- 有机曲线：使用柔和圆角和流动线条
- 乐观情感：明亮、清新、充满生命力的视觉语言

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Solarpunk style originates from an optimistic imagination of the future, depicting a world where humans and nature coexist harmoniously. It conveys hope and vitality through organic curves, plant elements, and warm color tones.

Core principles:
- Nature fusion: Organically combining plant and technology elements
- Warm tones: Leaf green, golden yellow, and sky blue form a warm color palette
- Organic curves: Soft rounded corners and flowing lines
- Optimistic emotion: Bright, fresh, and vibrant visual language`,

  doList: [
    "背景使用温暖浅色 bg-[#fef3c7] 或 bg-green-50",
    "主色调使用叶绿 text-green-400 或 bg-green-400",
    "强调色使用金黄 text-amber-400 或 bg-amber-400",
    "使用大圆角 rounded-2xl 或 rounded-3xl 体现有机感",
    "使用温暖渐变 bg-gradient-to-br from-green-400 to-amber-400",
    "卡片添加植物主题装饰元素",
    "使用柔和阴影 shadow-lg shadow-green-200/50",
  ],

  doListEn: [
    "Use warm light backgrounds bg-[#fef3c7] or bg-green-50",
    "Use leaf green as primary color text-green-400 or bg-green-400",
    "Use golden yellow as accent text-amber-400 or bg-amber-400",
    "Use large rounded corners rounded-2xl or rounded-3xl for organic feel",
    "Use warm gradients bg-gradient-to-br from-green-400 to-amber-400",
    "Add plant-themed decorative elements to cards",
    "Use soft shadows shadow-lg shadow-green-200/50",
  ],

  dontList: [
    "禁止使用纯黑背景或暗色主题",
    "禁止使用尖锐直角 rounded-none",
    "禁止使用冷酷工业风元素",
    "禁止使用高对比度霓虹发光效果",
    "禁止使用反乌托邦、废土元素",
    "禁止使用灰暗压抑的配色方案",
  ],

  dontListEn: [
    "No pure black backgrounds or dark themes",
    "No sharp right angles rounded-none",
    "No cold industrial elements",
    "No high-contrast neon glow effects",
    "No dystopian or wasteland elements",
    "No gloomy, oppressive color schemes",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Solarpunk 风格的有机自然按钮",
      code: `// Leaf Primary
<button className="px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl shadow-[0_8px_20px_rgba(52,211,153,0.3)] hover:from-amber-400 hover:to-yellow-500 hover:shadow-[0_12px_32px_rgba(251,191,36,0.4)] hover:-translate-y-1 hover:rotate-1 active:scale-95 active:opacity-95 transition-all duration-500 ease-out font-medium">
  Grow Together
</button>

// Solar Gold
<button className="px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900 rounded-2xl shadow-[0_8px_20px_rgba(251,191,36,0.3)] hover:from-yellow-300 hover:to-amber-400 hover:shadow-[0_14px_34px_rgba(251,191,36,0.45)] hover:-translate-y-1 hover:-rotate-1 active:scale-95 active:opacity-95 transition-all duration-500 ease-out font-medium">
  Harvest Energy
</button>

// Outline Organic
<button className="px-6 py-3 bg-white/50 backdrop-blur-sm border-2 border-green-400 text-green-600 rounded-2xl hover:bg-green-50/80 hover:shadow-[0_10px_24px_rgba(74,222,128,0.28)] hover:-translate-y-0.5 active:opacity-90 transition-all duration-500 ease-out font-medium">
  Explore Nature
</button>`,
    },
    card: {
      name: "卡片",
      description: "Solarpunk 风格的自然生态卡片",
      code: `<div className="group bg-white/80 backdrop-blur-sm border border-green-200 rounded-3xl p-6 shadow-lg shadow-green-100/50 hover:shadow-[0_20px_48px_rgba(52,211,153,0.24)] hover:-translate-y-2 hover:rotate-1 hover:scale-[1.01] transition-all duration-700 ease-in-out relative overflow-hidden">
  {/* Organic decoration */}
  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-100 to-transparent rounded-bl-full scale-100 group-hover:scale-150 group-hover:from-amber-200/70 transition-all duration-700 ease-in-out" />

  <div className="relative">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center group-hover:from-amber-400 group-hover:to-yellow-500 transition-colors duration-500">
        <Leaf className="w-4 h-4 text-white" />
      </div>
      <h3 className="text-green-700 font-semibold text-sm uppercase tracking-wide group-hover:text-amber-700 transition-colors duration-500">Eco Module</h3>
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
}
/* Solarpunk Design Tokens */
:root {
  --solarpunk-primary: #4ade80;
  --solarpunk-secondary: #fbbf24;
  --solarpunk-accent: #38bdf8;
  --solarpunk-glow: rgba(74, 222, 128, 0.3);
}

.solarpunk-card {
  position: relative;
  overflow: hidden;
}

.solarpunk-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.05), transparent);
  pointer-events: none;
}

.solarpunk-card:hover::before {
  opacity: 1;
}

.solarpunk-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(74, 222, 128, 0.08);
}

.solarpunk-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.solarpunk-animate-in {
  animation: solarpunk-fade-in 0.5s ease-out both;
}

.solarpunk-focus { outline: 2px solid var(--solarpunk-primary, currentColor); outline-offset: 2px; }`,

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
- Smooth transitions duration-300

## Animation & Interaction Rules

- Phototropic Lift: 元素悬停时以上浮加微倾斜模拟向光生长，幅度保持轻微避免失稳。
- Solar Flare: 主按钮 hover 时从绿色向暖金提亮，并释放更大暖色光晕。
- Organic Unfolding: 装饰斑块和叶形元素用较长时长展开，推荐 duration-700 与 ease-in-out。
- Soft Glass Resonance: active 状态优先通过透明度和阴影密度变化反馈，不使用机械硬压感。`,

  aiRulesEn: `STYLE: Solarpunk
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
- Smooth transitions duration-300

## Animation & Interaction Rules

- Phototropic Lift: Elements float upward with slight tilt on hover, simulating growth toward light, keeping amplitude gentle to avoid instability.
- Solar Flare: Primary button brightens from green toward warm gold on hover, releasing a larger warm-toned halo.
- Organic Unfolding: Decorative patches and leaf elements unfold with longer duration, recommended duration-700 with ease-in-out.
- Soft Glass Resonance: Active state prioritizes feedback through opacity and shadow density changes, no mechanical hard-press feel.`,

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
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 太阳朋克风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Solarpunk style",
      prompt: `Create a SaaS landing page using Solarpunk style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 太阳朋克风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Solarpunk style",
      prompt: `Create a portfolio showcase page using Solarpunk style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "solarpunk-warm",
      name: "太阳朋克暖色版",
      nameEn: "Solarpunk Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#3ddcbe",
        secondary: "#fbc53a",
        accent: ["#70a8ff", "#697400", "#e7fac7"],
      },
    },
    {
      id: "solarpunk-cool",
      name: "太阳朋克冷色版",
      nameEn: "Solarpunk Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#75d651",
        secondary: "#e2ac20",
        accent: ["#1dccb6", "#ca5230", "#ffecd3"],
      },
    },
  ],
};
