import type { DesignStyle } from "./types";

export const victorianBotanical: DesignStyle = {
  slug: "victorian-botanical",
  name: "维多利亚植物",
  nameEn: "Victorian Botanical",
  description:
    "维多利亚时代植物学插画风格，精细的线描植物、花卉纹饰、自然历史博物馆的优雅。暗绿与金色的经典搭配。",
  descriptionEn:
    "Victorian-era botanical illustration style with delicate line-drawn plants, floral ornaments, and the elegance of a natural history museum. A classic pairing of dark green and gold.",
  cover: "/styles/victorian-botanical.svg",
  styleType: "visual",
  tags: ["retro"],
  category: "retro",
  colors: {
    primary: "#2d4a2d",
    secondary: "#faf5ef",
    accent: ["#8b6914", "#6b3a3a", "#3d5c3d", "#308323"],
  },
  keywords: ["维多利亚", "植物", "插画", "花卉", "自然", "线描", "博物馆", "retro", "vintage", "nostalgic"],
  keywordsEn: ["Victorian botanical", "botanical illustration", "vintage botanical print", "natural history illustration", "floral line art", "antique floral", "herbarium", "engraving style", "dark green and gold", "Victorian design", "vintage floral website"],

  philosophy: `Victorian Botanical（维多利亚植物学）风格源于19世纪英国维多利亚时代的自然历史研究热潮。当时的植物学家和插画师用精细的线描记录世界各地的植物标本，这些插画不仅是科学文献，更是艺术珍品。

核心理念：
- 精细线描：如同铜版画般的精确线条，每一笔都承载着科学家的严谨态度
- 自然历史美学：博物馆标本室的沉稳与优雅，知识与美的统一
- 暗绿与金色：维多利亚时代室内设计的经典配色，深沉而富有层次
- 纸质质感：仿旧羊皮纸的温暖底色，赋予数字界面以历史厚重感

这种风格适用于博物馆、图书馆、茶叶品牌、植物园、高端文具和自然主题的文化产品。它将维多利亚时代对自然世界的敬畏转化为当代设计语言，在数字界面中重现那个黄金时代的精致与克制。

设计时应注重细节的雕琢而非视觉冲击，让每一个元素都像植物标本一样精心安排，在看似低调的表面之下蕴含丰富的信息层次。`,

  philosophyEn: `Victorian Botanical style originates from the natural history research craze of 19th-century Victorian England. Botanists and illustrators of the era used delicate line drawings to document plant specimens from around the world -- these illustrations were not only scientific documents but also artistic treasures.

Core concepts:
- Delicate line drawing: Precise lines reminiscent of copperplate engravings, each stroke carrying the rigor of a scientist
- Natural history aesthetics: The composure and elegance of a museum specimen room, a unity of knowledge and beauty
- Dark green and gold: The classic color pairing of Victorian interior design, deep yet richly layered
- Paper texture: The warm base color of aged parchment, lending digital interfaces a sense of historical weight

This style is suitable for museums, libraries, tea brands, botanical gardens, premium stationery, and nature-themed cultural products. It translates the Victorian era's reverence for the natural world into a contemporary design language, recreating the refinement and restraint of that golden age in digital interfaces.

When designing, focus on the meticulous crafting of details rather than visual impact. Let every element be as carefully arranged as a botanical specimen, containing rich layers of information beneath a seemingly understated surface.`,

  doList: [
    "使用暗绿 #2d4a2d 作为主色调，搭配金色 #8b6914 强调元素",
    "背景使用仿旧纸色 bg-[#faf5ef]，营造羊皮纸质感",
    "使用衬线字体 font-serif，标题添加 tracking-wide 字间距",
    "边框使用细线风格 border border-[#2d4a2d]/30，呼应线描插画",
    "圆角保持适度 rounded-lg，不使用全圆角",
    "阴影使用暖色调 shadow-[0_2px_8px_rgba(45,74,45,0.1)]",
    "添加精细的装饰线条和分隔元素",
    "交互状态使用金色高亮 hover:border-[#8b6914]",
  ],

  doListEn: [
    "Use dark green #2d4a2d as the primary color, paired with gold #8b6914 accent elements",
    "Use aged paper color bg-[#faf5ef] for backgrounds, creating a parchment texture",
    "Use serif fonts font-serif; add tracking-wide letter spacing to headings",
    "Use fine-line borders border border-[#2d4a2d]/30, echoing line-drawn illustrations",
    "Keep rounded corners moderate rounded-lg; do not use fully rounded corners",
    "Use warm-toned shadows shadow-[0_2px_8px_rgba(45,74,45,0.1)]",
    "Add delicate decorative lines and separator elements",
    "Use gold highlights for interactive states hover:border-[#8b6914]",
  ],

  dontList: [
    "禁止使用霓虹色或高饱和度荧光色",
    "禁止使用纯黑背景或深色主题",
    "禁止使用 rounded-full 全圆角按钮",
    "禁止使用粗犷的无衬线字体作为标题",
    "禁止使用渐变背景或彩虹色彩",
    "禁止使用过大的阴影 shadow-xl, shadow-2xl",
    "禁止使用动感十足的动画效果",
  ],

  dontListEn: [
    "Do not use neon or high-saturation fluorescent colors",
    "Do not use pure black backgrounds or dark themes",
    "Do not use rounded-full fully rounded buttons",
    "Do not use bold sans-serif fonts as headings",
    "Do not use gradient backgrounds or rainbow colors",
    "Do not use oversized shadows shadow-xl, shadow-2xl",
    "Do not use dynamic, flashy animation effects",
  ],

  components: {
    button: {
      name: "按钮",
      description: "维多利亚植物风格按钮，带细线边框和衬线字体",
      code: `<button className="px-8 py-3 bg-[#faf5ef] text-[#2d4a2d] border border-[#2d4a2d]/30 rounded font-serif italic tracking-widest text-lg shadow-[0_2px_10px_rgba(45,74,45,0.05)] hover:bg-[#2d4a2d] hover:text-[#faf5ef] hover:border-[#8b6914] hover:shadow-[0_4px_15px_rgba(139,105,20,0.15)] active:bg-[#1a2d1a] transition-all duration-700 ease-in-out">
  Examine Specimen
</button>`,
    },
    card: {
      name: "卡片",
      description: "维多利亚植物风格卡片，羊皮纸底色搭配细线边框",
      code: `<div className="group p-8 bg-[#faf5ef] border border-[#2d4a2d]/20 rounded-lg shadow-[0_4px_20px_rgba(45,74,45,0.05)] hover:border-[#8b6914]/50 transition-colors duration-700 ease-in-out cursor-text">
  <div className="border-b border-[#2d4a2d]/15 pb-4 mb-5 flex justify-between items-end">
    <div>
      <h3 className="text-2xl font-serif text-[#2d4a2d] tracking-wider group-hover:text-[#8b6914] transition-colors duration-700">
        Rosa Damascena
      </h3>
      <p className="text-sm font-serif text-[#8b6914]/80 italic mt-2">
        Rosaceae Family, Plate IV.
      </p>
    </div>
    <span className="text-3xl font-serif text-[#2d4a2d]/10 group-hover:scale-110 group-hover:text-[#8b6914]/20 transition-all duration-700">
      IV
    </span>
  </div>
  <p className="text-[#2d4a2d]/70 font-serif leading-relaxed text-sm">
    A heritage rose cultivar prized for its deep fragrance. Documented in the royal botanical surveys of 1842, preserved here in meticulous detail.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "维多利亚植物风格输入框",
      code: `<input
  type="text"
  placeholder="Search the herbarium..."
  className="
    w-full px-4 py-3
    bg-[#faf5ef]
    border border-[#2d4a2d]/20
    rounded-lg
    text-[#2d4a2d] placeholder-[#2d4a2d]/40
    font-serif text-sm
    focus:border-[#8b6914]/60
    focus:shadow-[0_0_0_2px_rgba(139,105,20,0.1)]
    focus:outline-none
    transition-all duration-300
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "维多利亚植物风格 Hero 区域",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#faf5ef]
  relative overflow-hidden
">
  <div className="absolute inset-0 opacity-[0.03]"
    style="backgroundImage: 'url(data:image/svg+xml,...)'"}
  />
  <div className="relative z-10 text-center px-6 max-w-3xl">
    <div className="inline-block border-b-2 border-[#8b6914]/40 pb-2 mb-6">
      <p className="text-sm font-serif text-[#8b6914] tracking-[0.3em] uppercase">
        Natural History Collection
      </p>
    </div>
    <h1 className="text-5xl md:text-7xl font-serif text-[#2d4a2d] mb-6 leading-tight">
      Victorian Botanical
    </h1>
    <p className="text-lg text-[#2d4a2d]/60 font-serif italic mb-10 max-w-xl mx-auto">
      Delicate line drawings, floral ornaments, and the timeless elegance of the natural history museum
    </p>
    <button className="
      px-8 py-3
      bg-[#2d4a2d] text-[#faf5ef]
      border border-[#8b6914]/60
      rounded-lg font-serif tracking-wide
      hover:bg-[#3d5c3d]
      transition-all duration-300
    ">
      Enter the Herbarium
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Victorian Botanical 全局样式 */

:root {
  --vb-green: #2d4a2d;
  --vb-cream: #faf5ef;
  --vb-gold: #8b6914;
  --vb-rose: #6b3a3a;
  --vb-fern: #3d5c3d;
}

/* 羊皮纸背景纹理 */
.vb-parchment {
  background-color: var(--vb-cream);
  background-image:
    radial-gradient(ellipse at 20% 50%, rgba(139, 105, 20, 0.03) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 50%, rgba(45, 74, 45, 0.03) 0%, transparent 50%);
}

/* 精细装饰线 */
.vb-ornament-line {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--vb-gold) 20%,
    var(--vb-gold) 80%,
    transparent 100%
  );
  opacity: 0.4;
}

/* 标本标签风格 */
.vb-specimen-label {
  font-family: Georgia, "Times New Roman", serif;
  border: 1px solid rgba(45, 74, 45, 0.2);
  padding: 0.75rem 1rem;
  background: var(--vb-cream);
  font-style: italic;
}

/* 金色强调文字 */
.vb-gold-text {
  color: var(--vb-gold);
  font-family: Georgia, "Times New Roman", serif;
  letter-spacing: 0.05em;
}
@keyframes victorian-botanical-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes victorian-botanical-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.victorian-botanical-card {
  position: relative;
  overflow: hidden;
}

.victorian-botanical-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(45, 74, 45, 0.05), transparent);
  pointer-events: none;
}

.victorian-botanical-card:hover::before {
  opacity: 1;
}

.victorian-botanical-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(45, 74, 45, 0.08);
}

.victorian-botanical-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.victorian-botanical-animate-in {
  animation: victorian-botanical-fade-in 0.5s ease-out both;
}`,

  aiRules: `你是一位专精于 Victorian Botanical（维多利亚植物）设计风格的前端开发专家。生成的所有代码都必须严格遵守以下约束：

## 绝对禁止

- 使用霓虹色或高饱和度荧光色
- 使用纯黑背景或深色主题
- 使用 rounded-full 全圆角
- 使用 sans-serif 作为标题字体
- 使用渐变背景或彩虹配色
- 使用大阴影 shadow-xl, shadow-2xl

## 必须遵守

- 主色 #2d4a2d（暗绿），强调色 #8b6914（金色）
- 背景色 #faf5ef（仿旧纸色）
- 使用 font-serif 衬线字体
- 边框使用细线风格 border border-[#2d4a2d]/20
- 圆角保持适中 rounded-lg
- 阴影使用暖色调且克制

## 配色方案

主色：
- 暗绿色：#2d4a2d
- 仿旧纸色：#faf5ef
- 金色：#8b6914
- 干玫瑰色：#6b3a3a
- 蕨绿色：#3d5c3d

## 特殊元素

- 精细的装饰分隔线
- 衬线字体的斜体（italic）用于学名标注
- tracking-wide 与 tracking-[0.3em] 用于标签
- 微妙的纸张纹理背景

## 动效与交互规则

- 标本静止（Specimen Stillness）：标本是被钉在纸面上的，严禁使用任何 \`hover:-translate-y\`（上浮）效果。交互必须保持在二维平面上，仅通过颜色与细微的光影变化来传达。
- 放大镜检视（Magnifying Inspection）：悬停卡片时，内部的标题、首字母或插图可以有非常缓慢的内部放大（如 \`group-hover:scale-105\`），模拟学者手持放大镜仔细观察标本的视觉体验。
- 镀金显影（Gilded Reveal）：交互时，暗绿色文字或极其纤细的边框应当以极其缓慢的速度（\`duration-700\`）过渡到古典金色（\`#8b6914\`），模拟书页上的金箔在烛光下反射的效果。
- 墨痕加深（Ink Deepening）：点击（\`:active\`）时不要缩小，而是通过加深文字颜色或背景的纸张颜色，模拟用蘸水笔在旧纸上重重落笔做下标记的质感。`,

  aiRulesEn: `You are a Victorian Botanical design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Neon or high-saturation fluorescent colors
- Pure black backgrounds or dark themes
- rounded-full fully rounded corners
- Sans-serif fonts as heading fonts
- Gradient backgrounds or rainbow colors
- Large shadows shadow-xl, shadow-2xl

## Must Follow

- Primary color #2d4a2d (dark green), accent #8b6914 (gold)
- Background color #faf5ef (aged paper)
- Use font-serif serif fonts
- Fine-line borders border border-[#2d4a2d]/20
- Moderate rounded corners rounded-lg
- Warm-toned and restrained shadows

## Color Palette

Primary:
- Dark green: #2d4a2d
- Aged paper: #faf5ef
- Gold: #8b6914
- Dried rose: #6b3a3a
- Fern green: #3d5c3d

## Special Elements

- Delicate decorative separator lines
- Serif font italic for botanical name annotations
- tracking-wide and tracking-[0.3em] for labels
- Subtle paper texture backgrounds

## Animation & Interaction Rules
- Specimen Stillness: Specimens are pinned to paper. Strictly no hover:-translate-y (float-up) effects. Interactions must stay on the 2D plane, conveyed only through color and subtle light-shadow changes.
- Magnifying Inspection: On hover, inner titles, initials, or illustrations can have very slow internal scaling (e.g., group-hover:scale-105), simulating a scholar examining a specimen with a magnifying glass.
- Gilded Reveal: During interaction, dark green text or ultra-fine borders should transition extremely slowly (duration-700) to classical gold (#8b6914), simulating gold leaf reflecting candlelight on a book page.
- Ink Deepening: On :active, do not shrink. Instead, deepen text color or background paper color, simulating pressing a dip pen firmly onto old paper to make a mark.`,

  examplePrompts: [
    {
      title: "植物标本馆页面",
      titleEn: "Herbarium Collection Page",
      description: "维多利亚植物风格的标本展示",
      descriptionEn: "Botanical specimen showcase in Victorian style",
      prompt: `用 Victorian Botanical 风格创建一个植物标本馆页面，要求：
1. 背景：仿旧纸色 + 微妙纹理
2. 标题：衬线字体，暗绿色，大字间距
3. 卡片：细线边框，金色强调，学名斜体
4. 添加精细的装饰分隔线
5. 整体传达自然历史博物馆的优雅氛围`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 维多利亚植物风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Victorian Botanical style",
      prompt: `Create a SaaS landing page using Victorian Botanical style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 维多利亚植物风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Victorian Botanical style",
      prompt: `Create a portfolio showcase page using Victorian Botanical style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "victorian-botanical-warm",
      name: "维多利亚植物暖色版",
      nameEn: "Victorian Botanical Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#254b3a",
        secondary: "#fbf6f1",
        accent: ["#5c780f", "#613f28", "#355d4b"],
      },
    },
    {
      id: "victorian-botanical-cool",
      name: "维多利亚植物冷色版",
      nameEn: "Victorian Botanical Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#3a4725",
        secondary: "#e1ddd7",
        accent: ["#b25b30", "#6b384f", "#4b5935"],
      },
    },
  ],
};
