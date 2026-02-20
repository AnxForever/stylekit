import { DesignStyle } from "./index";

export const pastelGoth: DesignStyle = {
  slug: "pastel-goth",
  name: "粉彩哥特",
  nameEn: "Pastel Goth",
  description:
    "柔暗美学与糖果色的独特融合，粉紫粉蓝等柔和色彩搭配骷髅、十字架等暗系元素。暗色背景+粉彩高亮。",
  cover: "/styles/pastel-goth.svg",
  styleType: "visual",
  tags: ["expressive", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#2d1b3d",
    secondary: "#1a1225",
    accent: ["#d4a5e3", "#7ec8c8", "#f5a5b8", "#b8a5f5"],
  },
  keywords: ["粉彩哥特", "柔暗", "糖果色", "骷髅", "十字架", "暗色", "粉紫"],

  philosophy: `Pastel Goth（粉彩哥特）是2010年代从Tumblr亚文化中诞生的独特美学流派，将传统哥特的暗黑元素与甜美的糖果色彩进行了颠覆性的融合。

核心理念：
- 暗甜碰撞：深紫黑色的暗沉底色与薰衣草紫、粉蓝、粉粉等柔和糖果色形成鲜明而和谐的对比。这种矛盾感正是粉彩哥特的灵魂
- 暗系符号：骷髅、十字架、蝙蝠、月亮等传统哥特符号被"可爱化"处理，用粉彩色重新上色，消解了恐惧而保留了神秘
- 柔光效果：粉彩色在暗色背景上呈现出类似荧光的柔和发光效果，营造出梦幻而略带诡异的氛围
- 亚文化态度：拒绝主流审美的二元对立——既不完全可爱也不完全黑暗，而是在两者之间创造出属于自己的第三空间

粉彩哥特美学反映了一种对传统审美边界的挑战：谁说暗黑不能甜美？谁说可爱不能深沉？这种风格适合追求独特个性的品牌、独立音乐项目、亚文化社区以及任何希望在黑暗与甜美之间找到平衡的创意项目。

在数字设计中，粉彩哥特通过深紫黑背景搭配粉色、薰衣草色的文本和装饰，创造出既有视觉冲击力又有柔和触感的界面体验。`,

  doList: [
    "使用深紫 bg-[#2d1b3d] 和近黑 bg-[#1a1225] 作为背景色",
    "使用薰衣草紫 text-[#d4a5e3] 和粉蓝 text-[#7ec8c8] 做主文本色",
    "使用粉色 text-[#f5a5b8] 和长春花紫 text-[#b8a5f5] 做装饰色",
    "添加柔和的粉彩发光效果 shadow-[0_0_20px_rgba(212,165,227,0.3)]",
    "使用中等圆角 rounded-xl 保持柔和但不过于可爱",
    "边框使用粉彩色半透明 border border-[#d4a5e3]/30",
    "标题可使用 font-bold 但搭配粉彩色以柔化",
    "适当使用渐变 bg-gradient-to-r 在粉彩色之间过渡",
    "hover 时让粉紫和粉青光晕叠加扩散，制造 Toxic Glow 的反差甜暗感",
    "交互节奏使用 duration-300 到 500，保持 Creepy Softness 的慵懒氛围",
    "卡片角落点缀元素可轻微错位或旋转，强化 Occult Hover 的亚文化气质",
  ],

  dontList: [
    "禁止使用明亮白色或纯白背景 bg-white, bg-gray-50",
    "禁止使用高饱和的纯色 bg-red-500, bg-blue-600",
    "禁止使用大地色调 bg-[#8b7355], text-amber-700",
    "禁止使用过于阳光的暖色调 bg-yellow-300, bg-orange-400",
    "禁止使用直角无圆角 rounded-none",
    "禁止省略粉彩色高亮——纯黑暗不是粉彩哥特",
    "禁止使用过于明亮的绿色 text-green-400, bg-green-500",
    "禁止只做单一紫色光晕（需要粉紫/粉青/粉粉的冲突层次）",
    "禁止使用过快的 100ms 级动画（会失去诡异柔软感）",
  ],

  components: {
    button: {
      name: "按钮",
      description: "粉彩哥特按钮，病态甜美光晕与反差按压反馈",
      code: `<button className="
  px-8 py-3.5
  bg-[#2d1b3d] text-[#d4a5e3]
  font-bold tracking-widest uppercase
  rounded-xl
  border-2 border-[#d4a5e3]/30
  shadow-[0_0_15px_rgba(212,165,227,0.2)]
  hover:bg-[#d4a5e3] hover:text-[#1a1225]
  hover:shadow-[0_0_25px_rgba(245,165,184,0.6),0_0_16px_rgba(126,200,200,0.35)]
  hover:-translate-y-1
  active:bg-[#f5a5b8] active:shadow-[0_0_10px_rgba(245,165,184,0.8)] active:scale-95
  transition-all duration-300 ease-out
">
  Enter the Void
</button>`,
    },
    card: {
      name: "卡片",
      description: "粉彩哥特卡片，暗底荧光点缀与柔慢诡异悬停",
      code: `<div className="
  group p-8
  bg-[#1a1225]
  rounded-2xl
  border border-[#b8a5f5]/20
  shadow-[0_8px_30px_rgba(0,0,0,0.5)]
  hover:border-[#f5a5b8]/50
  hover:shadow-[0_10px_40px_rgba(245,165,184,0.15),0_0_20px_rgba(126,200,200,0.1)]
  hover:-translate-y-1
  transition-all duration-500 ease-out
  cursor-pointer
">
  <div className="flex gap-3 mb-6">
    <div className="w-3 h-3 rounded-full bg-[#d4a5e3] shadow-[0_0_8px_#d4a5e3] group-hover:scale-125 transition-transform duration-300" />
    <div className="w-3 h-3 rounded-full bg-[#7ec8c8] shadow-[0_0_8px_#7ec8c8] group-hover:scale-125 transition-transform duration-300 delay-75" />
    <div className="w-3 h-3 rounded-full bg-[#f5a5b8] shadow-[0_0_8px_#f5a5b8] group-hover:scale-125 transition-transform duration-300 delay-150" />
  </div>
  <h3 className="text-2xl font-black text-[#d4a5e3] mb-3 tracking-wide group-hover:text-[#f5a5b8] transition-colors duration-300">
    Midnight Garden
  </h3>
  <p className="text-[#b8a5f5]/70 font-medium leading-relaxed group-hover:text-[#b8a5f5]/90 transition-colors duration-300">
    Where shadows bloom in pastel light, with a soft and rebellious undercurrent.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "粉彩哥特风格输入框，暗底粉彩聚焦光晕",
      code: `<input
  type="text"
  placeholder="Whisper here..."
  className="
    w-full px-6 py-4
    bg-[#1a1225]
    border border-[#d4a5e3]/20
    rounded-xl
    text-[#d4a5e3] placeholder-[#b8a5f5]/30
    font-medium
    focus:border-[#f5a5b8]/50
    focus:shadow-[0_0_16px_rgba(245,165,184,0.2)]
    focus:outline-none
    transition-all duration-300
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "粉彩哥特风格 Hero，暗色深渊与粉彩光芒",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#1a1225]
  relative overflow-hidden
">
  {/* Pastel glow orbs */}
  <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-[#d4a5e3]/5 blur-3xl" />
  <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-[#7ec8c8]/5 blur-3xl" />
  <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5a5b8]/3 blur-3xl" />

  {/* Cross decoration */}
  <div className="absolute top-16 right-16">
    <div className="w-[2px] h-8 bg-[#b8a5f5]/30 mx-auto" />
    <div className="w-8 h-[2px] bg-[#b8a5f5]/30 -mt-4 -ml-[15px]" />
  </div>

  <div className="relative z-10 text-center px-6">
    <div className="flex gap-3 justify-center mb-8">
      <div className="w-2 h-2 rounded-full bg-[#d4a5e3]/50" />
      <div className="w-2 h-2 rounded-full bg-[#7ec8c8]/50" />
      <div className="w-2 h-2 rounded-full bg-[#f5a5b8]/50" />
      <div className="w-2 h-2 rounded-full bg-[#b8a5f5]/50" />
    </div>
    <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4a5e3] via-[#f5a5b8] to-[#b8a5f5] mb-6">
      Pastel Goth
    </h1>
    <p className="text-lg text-[#7ec8c8]/60 mb-10">
      Darkness dressed in candy colors
    </p>
    <button className="
      px-10 py-4
      bg-gradient-to-r from-[#2d1b3d] to-[#1a1225]
      text-[#d4a5e3]
      font-bold tracking-wide
      rounded-xl
      border border-[#d4a5e3]/30
      shadow-[0_0_24px_rgba(212,165,227,0.3)]
      hover:shadow-[0_0_36px_rgba(212,165,227,0.5)]
      hover:border-[#d4a5e3]/60
      transition-all duration-300
    ">
      Descend
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Pastel Goth Global Styles */

:root {
  --pg-dark-purple: #2d1b3d;
  --pg-near-black: #1a1225;
  --pg-lavender: #d4a5e3;
  --pg-pastel-teal: #7ec8c8;
  --pg-pastel-pink: #f5a5b8;
  --pg-periwinkle: #b8a5f5;
}

/* Pastel glow text */
.pg-glow-text {
  text-shadow:
    0 0 10px rgba(212, 165, 227, 0.3),
    0 0 20px rgba(212, 165, 227, 0.15);
}

/* Pink glow */
.pg-pink-glow {
  text-shadow:
    0 0 10px rgba(245, 165, 184, 0.3),
    0 0 20px rgba(245, 165, 184, 0.15);
}

/* Ambient background orb */
.pg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.05;
}

/* Pastel gradient */
.pg-gradient {
  background: linear-gradient(135deg, var(--pg-lavender), var(--pg-pastel-pink), var(--pg-periwinkle));
}

/* Dark card */
.pg-card {
  background-color: var(--pg-near-black);
  border: 1px solid rgba(212, 165, 227, 0.15);
  border-radius: 0.75rem;
}

/* Cross symbol */
.pg-cross {
  position: relative;
  width: 24px;
  height: 24px;
}
.pg-cross::before,
.pg-cross::after {
  content: '';
  position: absolute;
  background-color: var(--pg-periwinkle);
  opacity: 0.3;
}
.pg-cross::before {
  width: 2px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
}
.pg-cross::after {
  width: 100%;
  height: 2px;
  top: 50%;
  transform: translateY(-50%);
}`,

  aiRules: `You are a Pastel Goth design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- White or light backgrounds (bg-white, bg-gray-50, bg-[#faf9f7])
- Pure saturated colors (bg-red-500, bg-blue-600)
- Earth tones (bg-amber-700, text-[#8b7355])
- Warm sunny colors (bg-yellow-300, bg-orange-400)
- Sharp corners (rounded-none)
- Pure dark without pastel highlights
- Bright green (text-green-400, bg-green-500)

## Must Follow

- Dark purple #2d1b3d and near-black #1a1225 as backgrounds
- Lavender #d4a5e3 as primary text/accent color
- Pastel teal #7ec8c8, pastel pink #f5a5b8, periwinkle #b8a5f5 as secondary accents
- Soft pastel glow effects shadow-[0_0_Xpx_rgba(212,165,227,...)]
- Rounded corners rounded-xl
- Semi-transparent pastel borders border-[#d4a5e3]/20 or /30
- Gradient text using pastel colors for headings

## Color Palette

Primary:
- Dark Purple: #2d1b3d
- Near Black: #1a1225
- Lavender: #d4a5e3
- Pastel Teal: #7ec8c8
- Pastel Pink: #f5a5b8
- Periwinkle: #b8a5f5

## Special Elements

- Pastel glow orbs (blurred circles)
- Cross and gothic symbols in pastel
- Gradient text (lavender to pink to periwinkle)
- Small pastel dots as decorations
- Semi-transparent borders with pastel glow

## Animation & Interaction Rules

- Toxic Glow: hover 光晕需体现粉紫、粉青、粉粉的冲突叠加，而非单色发光。
- Creepy Softness: 交互保持 duration-300 到 500，允许轻微上浮但避免过度弹跳。
- Sweet Rebellious Press: active 状态可短暂反转边框/光晕色彩，突出亚文化叛逆感。
- Occult Hover: 角落装饰或微符号可轻微错位和提亮，营造不安又可爱的氛围。`,

  examplePrompts: [
    {
      title: "粉彩哥特个人页",
      titleEn: "Pastel Goth Portfolio",
      description: "暗黑甜美风格的个人作品展示",
      descriptionEn: "Dark-sweet style personal portfolio",
      prompt: `Use Pastel Goth style to create a portfolio page:
1. Background: near-black with pastel glow orbs
2. Title: gradient text from lavender to pink
3. Cards: dark with pastel borders and soft glow shadows
4. Buttons: dark purple with lavender text and glow
5. Decorations: crosses, dots, and ambient light effects`,
    },
  ],
};
