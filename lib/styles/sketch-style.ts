import { DesignStyle } from "./index";

export const sketchStyle: DesignStyle = {
  slug: "sketch-style",
  name: "铅笔手绘风",
  nameEn: "Sketch Style",
  description:
    "模拟铅笔手绘的设计风格，不规则线条边框、纸张纹理背景、手写字体感、素描阴影和涂鸦装饰，传达亲切温暖的手工质感。",
  cover: "/styles/sketch-style.svg",
  styleType: "visual",
  tags: ["expressive", "retro"],
  category: "expressive",
  colors: {
    primary: "#2c2c2c",
    secondary: "#f5f0e8",
    accent: ["#e74c3c", "#3498db", "#27ae60", "#f39c12"],
  },
  keywords: ["手绘", "铅笔", "素描", "纸张", "手写", "涂鸦", "不规则"],

  philosophy: `Sketch Style 是一种模拟手绘铅笔素描的设计风格，通过不规则的线条、纸张纹理和手写感元素，为数字界面注入温暖的手工质感。

核心理念：
- 手工感：线条和形状不追求完美对齐，保留手绘的不规则感
- 纸张质感：使用暖色调米色背景模拟素描本纸张
- 铅笔线条：边框使用不均匀的手绘风格线条
- 素描阴影：使用交叉线条（cross-hatching）模拟阴影效果`,

  doList: [
    "使用纸张色背景 bg-[#f5f0e8]",
    "边框使用不规则风格 border-2 border-dashed 或 wavy",
    "使用手写风格字体或 serif 字体",
    "阴影使用交叉线条效果而非纯色",
    "元素保留轻微倾斜 rotate-[-1deg] 增加手绘感",
    "使用铅笔灰色 #2c2c2c 作为主色调",
  ],

  dontList: [
    "禁止使用完美的直线和圆角",
    "禁止使用纯白背景（应使用纸张色）",
    "禁止使用渐变效果",
    "禁止使用玻璃模糊效果",
    "禁止使用过于饱和的颜色",
  ],

  components: {
    button: {
      name: "按钮",
      description: "手绘风格按钮，不规则边框",
      code: `<button className="
  px-6 py-3
  bg-transparent
  border-2 border-dashed border-[#2c2c2c]
  rounded-sm
  text-[#2c2c2c] font-serif italic
  hover:bg-[#2c2c2c] hover:text-[#f5f0e8]
  active:rotate-[-1deg]
  transition-all duration-200
  relative
">
  Click here
</button>`,
    },
    card: {
      name: "卡片",
      description: "素描本风格卡片",
      code: `<div className="
  p-6
  bg-[#f5f0e8]
  border-2 border-[#2c2c2c]
  rounded-sm
  rotate-[-0.5deg]
  relative
  shadow-[3px_3px_0_rgba(44,44,44,0.15)]
">
  <div className="absolute top-2 right-2 w-3 h-3 rounded-full border border-[#2c2c2c]" />
  <h3 className="text-xl font-serif italic text-[#2c2c2c] mb-2">
    Sketch Card
  </h3>
  <p className="text-[#666] font-serif text-sm">
    Drawn with pencil and heart
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "手绘风格输入框",
      code: `<input
  type="text"
  placeholder="Write something..."
  className="
    w-full px-4 py-3
    bg-transparent
    border-0 border-b-2 border-dashed border-[#2c2c2c]
    text-[#2c2c2c] placeholder-[#999]
    font-serif italic
    focus:outline-none focus:border-solid focus:border-[#e74c3c]
    transition-all
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "手绘风格导航栏",
      code: `<nav className="
  px-6 py-4
  bg-[#f5f0e8]
  border-b-2 border-dashed border-[#2c2c2c]
">
  <div className="max-w-4xl mx-auto flex items-center justify-between">
    <a href="/" className="text-[#2c2c2c] font-serif italic text-xl">
      Sketchbook
    </a>
    <div className="flex gap-6">
      <a href="#" className="text-[#2c2c2c] hover:text-[#e74c3c] font-serif italic text-sm transition-colors underline decoration-dashed">
        Drawings
      </a>
      <a href="#" className="text-[#2c2c2c] hover:text-[#e74c3c] font-serif italic text-sm transition-colors underline decoration-dashed">
        Gallery
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "手绘风格 Hero 展示区域",
      code: `<section className="
  min-h-screen
  flex flex-col items-center justify-center
  bg-[#f5f0e8]
  px-6 py-20
  relative
">
  <div className="absolute inset-0 opacity-5"
    style={{
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\'6\\' height=\\'6\\' viewBox=\\'0 0 6 6\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%232c2c2c\\' fill-rule=\\'evenodd\\'%3E%3Cpath d=\\'M5 0h1L0 6V5zM6 5v1H5z\\'/%3E%3C/g%3E%3C/svg%3E")'
    }}
  />
  <h1 className="
    text-4xl md:text-6xl
    font-serif italic
    text-[#2c2c2c]
    mb-4
    rotate-[-1deg]
  ">
    Sketch Style
  </h1>
  <p className="text-xl font-serif text-[#666] mb-8 rotate-[0.5deg]">
    Every line tells a story
  </p>
  <button className="
    px-8 py-4
    bg-[#2c2c2c]
    text-[#f5f0e8]
    border-2 border-[#2c2c2c]
    rounded-sm
    font-serif italic text-lg
    hover:bg-transparent hover:text-[#2c2c2c]
    transition-all duration-300
    rotate-[-0.5deg]
  ">
    Open Sketchbook
  </button>
</section>`,
    },
  },

  globalCss: `/* Sketch Style 全局样式 */

:root {
  --sketch-dark: #2c2c2c;
  --sketch-paper: #f5f0e8;
  --sketch-red: #e74c3c;
  --sketch-blue: #3498db;
  --sketch-green: #27ae60;
  --sketch-yellow: #f39c12;
}

/* 纸张纹理背景 */
.sketch-paper {
  background-color: var(--sketch-paper);
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232c2c2c' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
}

/* 手绘边框效果 */
.sketch-border {
  border: 2px dashed var(--sketch-dark);
  border-radius: 2px;
}

/* 交叉阴影效果 */
.sketch-shadow {
  box-shadow: 3px 3px 0 rgba(44, 44, 44, 0.15);
}

/* 手绘不规则效果 */
.sketch-wobbly {
  transform: rotate(-0.5deg);
}

.sketch-wobbly:nth-child(even) {
  transform: rotate(0.5deg);
}

/* 手写字体 */
.sketch-text {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-style: italic;
}

/* 铅笔下划线 */
.sketch-underline {
  text-decoration: underline;
  text-decoration-style: wavy;
  text-decoration-color: var(--sketch-dark);
  text-underline-offset: 4px;
}

/* 涂鸦圆圈标记 */
.sketch-circle {
  border: 2px solid var(--sketch-dark);
  border-radius: 50%;
  transform: rotate(-2deg);
}`,

  aiRules: `你是一个 Sketch Style 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用完美的直线边框 border-solid（优先使用 border-dashed）
- 使用纯白背景 bg-white
- 使用渐变 bg-gradient-*
- 使用玻璃模糊 backdrop-blur
- 使用完美圆角 rounded-xl, rounded-2xl
- 使用过于饱和的颜色

## 必须遵守

- 纸张色背景 bg-[#f5f0e8]
- 虚线或不规则边框 border-2 border-dashed border-[#2c2c2c]
- 衬线斜体字体 font-serif italic
- 轻微倾斜 rotate-[-0.5deg] 或 rotate-[0.5deg]
- 铅笔灰色主色调 #2c2c2c
- 手绘感阴影 shadow-[3px_3px_0_rgba(44,44,44,0.15)]

## 配色

主色调：
- 铅笔灰: #2c2c2c
- 纸张米色: #f5f0e8

强调色（低饱和度）：
- 红色: #e74c3c
- 蓝色: #3498db
- 绿色: #27ae60
- 黄色: #f39c12

## 特殊效果

纸张纹理：使用 SVG 纹理背景
交叉阴影：线条状半透明阴影
手绘标注：虚线圆圈、波浪下划线
不规则排列：元素微微倾斜

## 自检

每次生成代码后检查：
1. 使用纸张色背景而非纯白
2. 边框为虚线或不规则风格
3. 文字使用衬线斜体
4. 元素有轻微倾斜
5. 整体感觉像手绘素描本`,

  examplePrompts: [
    {
      title: "手绘作品集",
      titleEn: "Sketch Portfolio",
      description: "铅笔手绘风格的个人作品集",
      descriptionEn: "Hand-drawn sketch portfolio",
      prompt: `用 Sketch Style 风格创建一个个人作品集页面，要求：
1. 纸张纹理背景 #f5f0e8
2. 虚线边框卡片展示作品
3. 衬线斜体字体标题
4. 元素微微倾斜增加手绘感
5. 铅笔灰色主色调
6. 涂鸦装饰元素`,
    },
    {
      title: "手绘笔记页面",
      titleEn: "Sketch Notes",
      description: "仿手写笔记的博客页面",
      descriptionEn: "Hand-written notes blog page",
      prompt: `用 Sketch Style 风格设计一个笔记/博客页面，要求：
1. 模仿素描本的纸张质感
2. 手写风格的标题和正文
3. 波浪下划线标记重点
4. 涂鸦圆圈标注关键点
5. 虚线分割线分隔内容
6. 铅笔素描风格的图标`,
    },
  ],
};
