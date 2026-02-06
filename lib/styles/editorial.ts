import { DesignStyle } from "./index";

export const editorial: DesignStyle = {
  slug: "editorial",
  name: "编辑杂志风",
  nameEn: "Editorial",
  description:
    "优雅的杂志排版风格，衬线标题、无衬线正文、精致的留白和网格系统。灵感来自高端时尚杂志和报纸排版。",
  cover: "/styles/editorial.svg",
  styleType: "visual",
  tags: ["minimal"],
  category: "minimal",
  colors: {
    primary: "#0a0a0a",
    secondary: "#fafafa",
    accent: ["#e63946", "#6b7280", "#e5e5e5"],
  },
  keywords: ["杂志排版", "衬线字体", "优雅留白", "网格系统", "极简主义"],

  philosophy: `Editorial（编辑杂志风）设计风格源于传统印刷媒体的排版美学，特别是高端时尚杂志和报纸的设计语言。这种风格强调内容的层次结构、精致的字体搭配和大量留白。

核心理念：
- 内容为王：设计服务于内容，不喧宾夺主
- 字体层次：衬线标题与无衬线正文形成对比
- 留白即美：适当的负空间让内容呼吸
- 网格秩序：严谨的栅格系统组织内容`,

  doList: [
    "标题使用衬线字体 font-serif，正文使用无衬线字体 font-sans",
    "使用大量留白 py-16 md:py-24 或更大",
    "边框使用细线 border border-border",
    "使用小写字母的标签样式 uppercase tracking-widest text-xs",
    "保持颜色克制，主要使用黑白灰",
    "强调色用于点睛之笔，如链接、重要按钮",
    "使用 letter-spacing 调整标题字间距 tracking-tight",
  ],

  dontList: [
    "禁止使用过多颜色，保持 2-3 色调",
    "禁止使用粗边框或阴影",
    "禁止使用过多装饰元素",
    "禁止标题使用无衬线字体",
    "禁止过小的行高，正文至少 leading-relaxed",
    "禁止元素堆积，保持呼吸感",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Editorial 风格的按钮，简洁克制",
      code: `<button className="
  px-6 py-3
  bg-foreground text-background
  text-sm tracking-wide
  hover:bg-foreground/90
  transition-colors
">
  按钮文字
</button>

{/* 轮廓按钮 */}
<button className="
  px-6 py-3
  border border-border
  text-sm tracking-wide
  hover:border-foreground
  transition-colors
">
  按钮文字
</button>`,
    },
    card: {
      name: "卡片",
      description: "带细边框的优雅卡片",
      code: `<div className="
  border border-border
  hover:border-foreground
  transition-colors
">
  <div className="aspect-[16/9] bg-zinc-100" />
  <div className="p-6">
    <p className="text-xs tracking-widest uppercase text-muted mb-2">
      分类标签
    </p>
    <h3 className="text-xl mb-3">卡片标题</h3>
    <p className="text-sm text-muted leading-relaxed">
      卡片描述文字，使用较小字号和灰色
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "简洁的表单输入框",
      code: `<input
  type="text"
  placeholder="请输入..."
  className="
    w-full px-4 py-3
    border border-border
    text-sm
    focus:outline-none
    focus:border-foreground
    transition-colors
    placeholder:text-muted
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "简约的顶部导航",
      code: `<header className="border-b border-border">
  <div className="max-w-7xl mx-auto px-6 md:px-12">
    <div className="flex items-center justify-between h-16 md:h-20">
      <a href="/" className="masthead text-lg md:text-xl">
        LOGO
      </a>
      <nav className="flex items-center gap-8">
        <a href="#" className="text-sm tracking-wide text-muted hover:text-foreground transition-colors">
          链接一
        </a>
        <a href="#" className="text-sm tracking-wide text-muted hover:text-foreground transition-colors">
          链接二
        </a>
      </nav>
    </div>
  </div>
</header>`,
    },
    hero: {
      name: "Hero 区块",
      description: "杂志封面式的 Hero 区域",
      code: `<section className="border-b border-border">
  <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32">
    <p className="text-xs tracking-widest uppercase text-muted mb-4">
      小标签
    </p>
    <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
      优雅的<br />
      <span className="italic">杂志排版</span>
    </h1>
    <p className="text-lg md:text-xl text-muted leading-relaxed max-w-md">
      Editorial 风格强调内容至上，通过精致的字体和留白营造高级感。
    </p>
  </div>
</section>`,
    },
  },

  globalCss: `/* Editorial 全局样式 */
:root {
  --background: #fafafa;
  --foreground: #0a0a0a;
  --accent: #e63946;
  --muted: #6b7280;
  --border: #e5e5e5;
}

/* 标题使用衬线字体 */
h1, h2, h3, h4, h5, h6 {
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  font-weight: 400;
  letter-spacing: -0.02em;
}

/* 正文使用无衬线字体 */
body {
  font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
  background: var(--background);
  color: var(--foreground);
}

/* 选中文字样式 */
::selection {
  background: var(--accent);
  color: white;
}

/* 杂志刊头样式 */
.masthead {
  font-family: ui-serif, Georgia, serif;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

/* 首字下沉 */
.drop-cap::first-letter {
  font-family: ui-serif, Georgia, serif;
  float: left;
  font-size: 4rem;
  line-height: 0.8;
  padding-right: 0.5rem;
}`,

  aiRules: `你是一个 Editorial（编辑杂志风）设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 核心原则

- 内容为王，设计服务于内容
- 大量留白，让内容呼吸
- 字体层次分明

## 字体规则

- 标题：衬线字体 font-serif, letter-spacing: -0.02em
- 正文：无衬线字体 font-sans
- 标签：大写 + 字间距 uppercase tracking-widest text-xs

## 颜色规则

- 主色：黑 #0a0a0a、白 #fafafa
- 强调色：#e63946（仅用于点睛）
- 灰色：#6b7280（辅助文字）
- 边框：#e5e5e5（细边框）

## 间距规则

- Section 间距：py-16 md:py-24 或更大
- 容器内边距：px-6 md:px-12
- 元素间距：mb-4 md:mb-6

## 边框规则

- 只使用细边框：border border-border
- hover 时边框变深：hover:border-foreground
- 避免阴影

## 禁止事项

- 禁止粗边框
- 禁止阴影效果
- 禁止过多颜色
- 禁止标题用无衬线
- 禁止元素堆积`,

  examplePrompts: [
    {
      title: "杂志风格博客",
      titleEn: "Magazine Style Blog",
      description: "经典杂志排版的博客首页",
      descriptionEn: "Classic magazine layout blog homepage",
      prompt: `用 Editorial 杂志排版风格创建一个博客首页，要求：
1. 导航栏：细边框分隔，链接使用小写字母 + 字间距
2. 特色文章：大图配衬线字体大标题，作者信息用 text-xs uppercase
3. 文章网格：2-3 列，每篇文章有分类标签、标题、摘要
4. 排版：标题用 font-serif，正文用 font-sans，大量留白
5. 颜色：黑白为主，仅标签或链接用强调色`,
    },
    {
      title: "产品详情页",
      titleEn: "Product Detail Page",
      description: "高端产品展示页面",
      descriptionEn: "Premium product showcase page",
      prompt: `用 Editorial 风格设计一个高端产品详情页，要求：
1. Hero：全宽产品图，标题用衬线字体
2. 产品信息：左图右文布局，规格用细边框表格
3. 特性列表：图标 + 文字，保持简洁
4. 购买区：价格突出，按钮用细边框 + hover 变黑
5. 整体：极简配色，大量留白，细边框分割区域`,
    },
    {
      title: "关于我们页面",
      titleEn: "About Us Page",
      description: "公司/团队介绍页",
      descriptionEn: "Company/Team introduction page",
      prompt: `用 Editorial 风格创建一个公司介绍页面，要求：
1. Hero：大标题 font-serif，配简短 slogan
2. 公司故事：左右交替布局，图文搭配
3. 团队成员：网格展示，照片 + 姓名 + 职位
4. 数据展示：大数字 + 小标签说明
5. 联系方式：简洁表单，细边框输入框
风格要点：衬线标题、无衬线正文、细边框、大留白`,
    },
  ],
};
