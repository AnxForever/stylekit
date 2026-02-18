import { DesignStyle } from "./index";

export const paperCraft: DesignStyle = {
  slug: "paper-craft",
  name: "纸艺手作",
  nameEn: "Paper Craft",
  description:
    "纸艺与剪纸风格，层叠纸张效果、柔和阴影暗示深度、手作质感边缘。适合儿童品牌、教育产品、创意工作室。",
  cover: "/styles/paper-craft.svg",
  styleType: "visual",
  tags: ["expressive", "modern"],
  category: "expressive",
  colors: {
    primary: "#e85d75",
    secondary: "#fdf6ee",
    accent: ["#5cb8a5", "#f5c040", "#6b7fb5"],
  },
  keywords: ["纸艺", "剪纸", "手作", "层叠", "阴影", "创意", "质感"],

  philosophy: `Paper Craft（纸艺手作）的设计灵感来自剪纸艺术、折纸和手工拼贴。通过层叠的纸张效果、柔和的投影和不规则的手作边缘，创造出温暖、有触感的视觉体验。

核心理念：
- 纸张层叠：通过多层阴影和微妙的偏移创造出真实的纸张堆叠感
- 手作质感：边缘略带不规则感，避免过于数字化的精确
- 柔和色彩：使用纸张般温暖的底色搭配明快但不刺眼的彩色纸片
- 深度暗示：通过阴影方向和强度传达前后层次关系

这个风格刻意回避数字世界的冷硬精确感，转而拥抱手工制作的温度。每一个 UI 元素都应该看起来像是用彩色纸张裁剪、折叠和粘贴而成的——按钮是一张凸起的纸片，卡片是堆叠的纸层，输入框是在纸上裁切出的凹槽。

适合场景：儿童教育应用、手工创意商店、幼儿园网站、创意工作室作品集、DIY 教程平台。`,

  doList: [
    "背景使用纸白色 bg-[#fdf6ee] 或柔和暖白",
    "卡片使用纸张阴影 shadow-[4px_4px_0px_rgba(0,0,0,0.08)] 模拟凸起效果",
    "按钮使用偏移阴影 shadow-[3px_3px_0px_rgba(0,0,0,0.1)] 模拟纸片凸起",
    "使用圆润但不完美的圆角 rounded-xl 搭配微旋转 rotate-[1deg]",
    "色块使用明快的纸艺色 bg-[#e85d75]、bg-[#5cb8a5]、bg-[#f5c040]",
    "文字使用深色 text-[#2d2d2d] 搭配手写感字体或圆润无衬线字体",
    "层叠效果使用多个 div 带 absolute 定位和不同阴影深度",
    "悬停时微微抬起 hover:-translate-y-1 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.12)]",
  ],

  dontList: [
    "禁止使用深色/黑色背景",
    "禁止使用发光效果或霓虹阴影",
    "禁止使用金属质感或玻璃拟态",
    "禁止使用过于精确的直角边缘（看起来太数字化）",
    "禁止使用高饱和度的荧光色",
    "禁止使用渐变发光效果",
    "禁止使用 drop-shadow 滤镜（使用 box-shadow 模拟纸张阴影）",
  ],

  components: {
    button: {
      name: "按钮",
      description: "纸艺风格的纸片按钮",
      code: `// Paper Primary
<button className="px-6 py-3 bg-[#e85d75] text-white font-bold rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.12)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,0.08)] transition-all duration-200 rotate-[-0.5deg]">
  Create
</button>

// Paper Teal
<button className="px-6 py-3 bg-[#5cb8a5] text-white font-bold rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.12)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,0.08)] transition-all duration-200 rotate-[0.5deg]">
  Explore
</button>

// Paper Outline
<button className="px-6 py-3 bg-white border-2 border-[#2d2d2d] text-[#2d2d2d] font-bold rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,0.06)] transition-all duration-200">
  Learn More
</button>`,
    },
    card: {
      name: "卡片",
      description: "纸艺风格的层叠卡片",
      code: `<div className="relative">
  {/* Back paper layer */}
  <div className="absolute inset-0 bg-[#f5c040] rounded-2xl rotate-[2deg] shadow-[4px_4px_0px_rgba(0,0,0,0.06)]" />
  {/* Middle paper layer */}
  <div className="absolute inset-0 bg-[#5cb8a5] rounded-2xl rotate-[1deg] shadow-[3px_3px_0px_rgba(0,0,0,0.06)]" />
  {/* Front card */}
  <div className="relative bg-white rounded-2xl p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.08)]">
    <div className="inline-block px-3 py-1 bg-[#e85d75] text-white text-xs font-bold rounded-lg mb-3 rotate-[-1deg]">
      Craft
    </div>
    <h3 className="text-[#2d2d2d] text-xl font-bold mb-2">
      Paper Origami
    </h3>
    <p className="text-[#666666] leading-relaxed text-sm">
      Fold, cut, and create beautiful paper sculptures with layered depth.
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "纸艺风格的裁切输入框",
      code: `<div className="space-y-2">
  <label className="block text-[#2d2d2d] text-sm font-bold">Your Name</label>
  <div className="relative">
    <input
      type="text"
      className="w-full px-4 py-3 bg-white border-2 border-[#e0d8cc] rounded-xl text-[#2d2d2d] placeholder-[#b0a898] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04)] focus:outline-none focus:border-[#e85d75] focus:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04),0_0_0_3px_rgba(232,93,117,0.15)] transition-all duration-200"
      placeholder="Write here..."
    />
  </div>
</div>`,
    },
  },

  globalCss: `/* Paper Craft Global Styles */
@layer base {
  body {
    @apply bg-[#fdf6ee] text-[#2d2d2d] antialiased;
  }

  ::selection {
    @apply bg-[#f5c040] text-[#2d2d2d];
  }
}

/* Paper texture overlay */
.paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E");
}

/* Paper fold line */
.paper-fold {
  background-image: linear-gradient(
    to right,
    transparent 49.5%,
    rgba(0, 0, 0, 0.05) 49.5%,
    rgba(0, 0, 0, 0.05) 50.5%,
    transparent 50.5%
  );
}`,

  aiRules: `STYLE: Paper Craft
TYPE: Handmade paper art interface

MUST USE:
- Warm paper background: bg-[#fdf6ee]
- Paper offset shadows: shadow-[4px_4px_0px_rgba(0,0,0,0.08)]
- Bright craft colors: #e85d75, #5cb8a5, #f5c040, #6b7fb5
- Rounded corners: rounded-xl or rounded-2xl
- Slight rotations: rotate-[1deg] for playful paper feel
- Layered paper effect: multiple stacked divs with rotation
- Dark text on light: text-[#2d2d2d]
- Lift on hover: hover:-translate-y-1

MUST AVOID:
- Dark/black backgrounds
- Neon or glow effects
- Metallic or glass effects
- Sharp precise corners
- Fluorescent colors
- Drop-shadow filters (use box-shadow)
- Gradient glows

COLOR RULES:
- Craft Red: #e85d75 (primary)
- Paper White: #fdf6ee (background)
- Paper Teal: #5cb8a5
- Paper Yellow: #f5c040
- Paper Blue: #6b7fb5
- Text: #2d2d2d

SPECIAL EFFECTS:
- Multi-layer paper stacking with rotation offsets
- Inset shadows for cut-out/embossed feel
- Active press-down: active:translate-y-0.5
- Paper texture overlay for authenticity`,

  examplePrompts: [
    {
      title: "儿童教育平台",
      titleEn: "Kids Education Platform",
      description: "纸艺风格的儿童学习界面",
      descriptionEn: "Paper craft style kids learning interface",
      prompt: `Create a kids education landing page using Paper Craft style:
- Warm paper-white background
- Colorful paper-layered cards for subjects
- Playful buttons with paper-shadow and slight rotation
- Badge/label elements as paper cutouts
- Layered paper decorative borders
- Bright but soft craft colors`,
    },
  ],
};
