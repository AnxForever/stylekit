import { DesignStyle } from "./index";

export const victorianBotanical: DesignStyle = {
  slug: "victorian-botanical",
  name: "维多利亚植物",
  nameEn: "Victorian Botanical",
  description:
    "维多利亚时代植物学插画风格，精细的线描植物、花卉纹饰、自然历史博物馆的优雅。暗绿与金色的经典搭配。",
  cover: "/styles/victorian-botanical.svg",
  styleType: "visual",
  tags: ["retro", "minimal"],
  category: "retro",
  colors: {
    primary: "#2d4a2d",
    secondary: "#faf5ef",
    accent: ["#8b6914", "#6b3a3a", "#3d5c3d"],
  },
  keywords: ["维多利亚", "植物", "插画", "花卉", "自然", "线描", "博物馆"],

  philosophy: `Victorian Botanical（维多利亚植物学）风格源于19世纪英国维多利亚时代的自然历史研究热潮。当时的植物学家和插画师用精细的线描记录世界各地的植物标本，这些插画不仅是科学文献，更是艺术珍品。

核心理念：
- 精细线描：如同铜版画般的精确线条，每一笔都承载着科学家的严谨态度
- 自然历史美学：博物馆标本室的沉稳与优雅，知识与美的统一
- 暗绿与金色：维多利亚时代室内设计的经典配色，深沉而富有层次
- 纸质质感：仿旧羊皮纸的温暖底色，赋予数字界面以历史厚重感

这种风格适用于博物馆、图书馆、茶叶品牌、植物园、高端文具和自然主题的文化产品。它将维多利亚时代对自然世界的敬畏转化为当代设计语言，在数字界面中重现那个黄金时代的精致与克制。

设计时应注重细节的雕琢而非视觉冲击，让每一个元素都像植物标本一样精心安排，在看似低调的表面之下蕴含丰富的信息层次。`,

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

  dontList: [
    "禁止使用霓虹色或高饱和度荧光色",
    "禁止使用纯黑背景或深色主题",
    "禁止使用 rounded-full 全圆角按钮",
    "禁止使用粗犷的无衬线字体作为标题",
    "禁止使用渐变背景或彩虹色彩",
    "禁止使用过大的阴影 shadow-xl, shadow-2xl",
    "禁止使用动感十足的动画效果",
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
}`,

  aiRules: `你是一个 Victorian Botanical 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用霓虹色或高饱和度荧光色
- 使用纯黑背景或深色主题
- 使用 rounded-full 全圆角
- 使用 sans-serif 作为标题字体
- 使用渐变背景或彩虹配色
- 使用大阴影 shadow-xl, shadow-2xl

## 必须遵守

- 主色 #2d4a2d (暗绿), 强调色 #8b6914 (金色)
- 背景色 #faf5ef (仿旧纸色)
- 使用 font-serif 衬线字体
- 边框使用细线风格 border border-[#2d4a2d]/20
- 圆角适中 rounded-lg
- 阴影使用暖色调且克制

## 配色

主色调：
- 暗绿: #2d4a2d
- 仿旧纸: #faf5ef
- 金色: #8b6914
- 干玫瑰: #6b3a3a
- 蕨绿: #3d5c3d

## 特殊元素

- 精细的装饰分隔线
- 衬线字体的 italic 用于学名标注
- tracking-wide 和 tracking-[0.3em] 用于标签
- 微妙的纸张纹理背景

## Animation & Interaction Rules
- Specimen Stillness: 标本是钉在纸上的。严禁使用任何 \`hover:-translate-y\`（上浮）效果。交互必须保持在二维平面上，仅通过颜色和细微的光影变化来传达。
- Magnifying Inspection: 悬停（Hover）卡片时，内部的标题、首字母或插图可以有非常缓慢的内部放大（如 \`group-hover:scale-105\`），模拟学者拿着放大镜仔细观察标本的视觉。
- Gilded Reveal: 交互时，暗绿色的文字或极其纤细的边框，应当极其缓慢地（\`duration-700\`）过渡到古典金色（\`#8b6914\`），模拟书页上的金箔在光线下的反射。
- Ink Deepening: 点击 (\`:active\`) 时，不要缩小，通过加深文字颜色或背景的纸张颜色，模拟用蘸水笔在旧纸上重重地做下标记。`,

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
  ],
};
