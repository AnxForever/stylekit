import { DesignStyle } from "./index";

export const artNouveau: DesignStyle = {
  slug: "art-nouveau",
  name: "新艺术运动风",
  nameEn: "Art Nouveau",
  description:
    "源自19世纪末的有机曲线美学，以流动的藤蔓纹样、自然花卉元素、Mucha风格海报装饰和优雅的衬线字体为特征，传递自然与艺术的和谐统一。",
  cover: "/styles/art-nouveau.svg",
  styleType: "visual",
  tags: ["retro", "expressive"],
  category: "retro",
  colors: {
    primary: "#2d5016",
    secondary: "#f5f0e1",
    accent: ["#c9a227", "#8b6db5", "#4a7c3f"],
  },
  keywords: ["新艺术", "有机曲线", "藤蔓", "花卉", "Mucha", "装饰", "自然"],

  philosophy: `Art Nouveau（新艺术运动）是19世纪末至20世纪初的国际性艺术运动，以自然界的有机形态为灵感，将装饰艺术推向极致。

核心理念：
- 有机曲线：受植物和花卉启发的流动线条
- 自然统一：艺术与自然的和谐融合
- 整体设计：从建筑到家具到海报的统一美学
- 装饰之美：精致的装饰纹样赋予功能性物品以艺术价值`,

  doList: [
    "使用有机曲线和流动线条",
    "采用深绿、金色、象牙白为主色调",
    "添加藤蔓、花卉等自然装饰元素",
    "使用衬线或装饰性字体",
    "保持优雅精致的整体质感",
    "圆润的边角和柔和的过渡",
  ],

  dontList: [
    "禁止使用生硬的直角和几何形状",
    "禁止使用霓虹或高饱和度的现代色彩",
    "禁止使用粗犷的无装饰设计",
    "禁止使用现代无衬线字体作为标题",
  ],

  components: {
    button: {
      name: "按钮",
      description: "新艺术风格按钮",
      code: `<button className="
  px-8 py-4
  bg-[#2d5016] text-[#f5f0e1]
  border-2 border-[#c9a227]
  rounded-full font-serif tracking-wide
  shadow-md
  hover:bg-[#c9a227] hover:text-[#2d5016]
  hover:shadow-lg
  transition-all duration-300
">
  Explore
</button>`,
    },
    card: {
      name: "卡片",
      description: "新艺术风格卡片",
      code: `<div className="
  p-8
  bg-[#f5f0e1]
  border-2 border-[#c9a227]/60
  rounded-2xl
  shadow-md
">
  <h3 className="text-2xl font-serif text-[#2d5016] mb-3">
    Nature's Beauty
  </h3>
  <p className="text-[#2d5016]/70 font-serif">
    Where art meets organic form
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "新艺术风格输入框",
      code: `<input
  type="text"
  placeholder="Enter text..."
  className="
    w-full px-6 py-4
    bg-[#f5f0e1]
    border-2 border-[#c9a227]/40
    rounded-full
    text-[#2d5016] placeholder-[#8b6db5]/50
    focus:border-[#c9a227]
    focus:shadow-[0_0_12px_rgba(201,162,39,0.3)]
    focus:outline-none
    transition-all font-serif
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "新艺术风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-[#f5f0e1] to-[#e8dcc8]
  relative overflow-hidden
">
  <div className="absolute inset-0 opacity-10">
    <svg viewBox="0 0 1200 800" className="w-full h-full">
      <path d="M0,400 Q300,100 600,400 T1200,400" fill="none" stroke="#2d5016" strokeWidth="2"/>
      <path d="M0,500 Q300,200 600,500 T1200,500" fill="none" stroke="#c9a227" strokeWidth="1.5"/>
    </svg>
  </div>

  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-serif text-[#2d5016] mb-6">
      Art Nouveau
    </h1>
    <p className="text-xl text-[#2d5016]/70 font-serif italic mb-8">
      The harmony of nature and art
    </p>
    <button className="
      px-10 py-4
      bg-[#2d5016] text-[#f5f0e1]
      border-2 border-[#c9a227]
      rounded-full font-serif tracking-wide
      shadow-md
      hover:bg-[#c9a227] hover:text-[#2d5016]
      transition-all
    ">
      Discover
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Art Nouveau 全局样式 */

:root {
  --an-green: #2d5016;
  --an-gold: #c9a227;
  --an-ivory: #f5f0e1;
  --an-wisteria: #8b6db5;
}

/* 有机曲线装饰 */
.an-vine-border {
  border-image: linear-gradient(
    135deg,
    var(--an-gold) 0%,
    var(--an-green) 50%,
    var(--an-gold) 100%
  ) 1;
}

/* 金色发光效果 */
.an-gold-glow {
  box-shadow: 0 0 20px rgba(201, 162, 39, 0.3);
}

/* 花卉背景纹理 */
.an-floral-bg {
  background-image: radial-gradient(
    circle at 20% 80%,
    rgba(139, 109, 181, 0.1) 0%,
    transparent 50%
  ),
  radial-gradient(
    circle at 80% 20%,
    rgba(201, 162, 39, 0.1) 0%,
    transparent 50%
  );
}

/* 衬线标题 */
.an-heading {
  font-family: Georgia, "Times New Roman", serif;
  letter-spacing: 0.05em;
}`,

  aiRules: `你是一个 Art Nouveau 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用生硬的直角和尖锐几何形状
- 使用霓虹色或高饱和度现代色彩
- 使用 sans-serif 作为标题字体
- 使用深色/黑色背景

## 必须遵守

- 使用有机曲线和圆润边角 rounded-full, rounded-2xl
- 深绿 #2d5016 为主色，金色 #c9a227 为强调色
- 象牙白 #f5f0e1 为背景色
- 使用 font-serif 衬线字体
- 添加柔和的阴影和光晕效果

## 配色

主色调：
- 深绿: #2d5016
- 金色: #c9a227
- 象牙白: #f5f0e1
- 紫藤: #8b6db5

## 特殊元素

- 有机曲线 SVG 装饰
- 藤蔓和花卉图案
- 金色边框和光晕
- 优雅的渐变过渡`,

  examplePrompts: [
    {
      title: "花卉展览页面",
      titleEn: "Floral Exhibition Page",
      description: "Art Nouveau风格的花卉展览展示",
      descriptionEn: "Floral exhibition showcase in Art Nouveau style",
      prompt: `用 Art Nouveau 风格创建一个花卉展览页面，要求：
1. 背景：象牙白渐变 + 有机曲线装饰
2. 标题：衬线字体，深绿色
3. 卡片：金色边框，圆润边角
4. 添加藤蔓和花卉 SVG 装饰元素
5. 整体优雅精致的自然美学`,
    },
  ],
};
