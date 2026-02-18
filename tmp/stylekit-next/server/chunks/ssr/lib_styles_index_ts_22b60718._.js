module.exports=[191873,a=>{"use strict";a.i(605124);let b=[{slug:"neo-brutalist",name:"新野兽派",nameEn:"Neo-Brutalist",description:"大胆的黑色粗边框、硬边缘阴影、无圆角、高对比度配色。源于建筑野兽派，强调功能与原始美学。",cover:"/styles/neo-brutalist.svg",styleType:"visual",tags:["expressive","high-contrast"],category:"expressive",colors:{primary:"#000000",secondary:"#ffffff",accent:["#ff006e","#ccff00","#00d9ff","#ff9500"]},keywords:["粗边框","硬阴影","无圆角","高对比","功能主义"],variants:[{id:"classic",name:"经典",nameEn:"Classic",description:"原始野兽派风格，纯黑边框，高对比度",colors:{primary:"#000000",secondary:"#ffffff",accent:["#ff006e","#ccff00","#00d9ff","#ff9500"]}},{id:"soft",name:"柔和",nameEn:"Soft",description:"较细边框，灰色阴影，马卡龙色调，温和对比",colors:{primary:"#1a1a1a",secondary:"#f5f5f5",accent:["#f472b6","#a3e635","#38bdf8","#fbbf24"]},cssOverrides:`
/* Soft variant overrides */
.brutal-border { border-width: 2px; border-color: #374151; }
.brutal-shadow { box-shadow: 4px 4px 0 rgba(0,0,0,0.2); }
`},{id:"playful",name:"俏皮",nameEn:"Playful",description:"多彩配色，元素倾斜，活泼动效，年轻化",colors:{primary:"#000000",secondary:"#ffffff",accent:["#ff6b6b","#4ecdc4","#ffe66d","#95e1d3","#f38181"]},cssOverrides:`
/* Playful variant overrides */
.brutal-card { transform: rotate(-1deg); }
.brutal-card:nth-child(even) { transform: rotate(1deg); }
.brutal-button:hover { transform: scale(1.05); }
`}],philosophy:`Neo-Brutalist（新野兽派）设计风格源于建筑领域的野兽派运动，强调原始、未经修饰的功能美学。在 Web 设计中，这种风格通过大胆的黑色边框、硬边缘阴影、锐利的直角和高对比度的配色方案来表达。

核心理念：
- 功能优先：每个元素都有明确的目的
- 诚实表达：不掩饰结构，不伪装功能
- 大胆直接：用视觉冲击力传达信息
- 反对圆滑：拒绝过度精致，拥抱粗犷`,doList:["使用纯黑边框 border-black border-2 md:border-4","使用硬边缘阴影 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]","保持直角 rounded-none","hover 时阴影消失 + 位移 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]","使用高对比度配色（黑白为主 + 鲜艳强调色）","标题使用 font-black，正文使用 font-mono","所有样式包含移动端和桌面端响应式值"],dontList:["禁止使用圆角 rounded-lg, rounded-md, rounded-xl","禁止使用模糊阴影 shadow-lg, shadow-xl, shadow-2xl","禁止使用渐变 bg-gradient-*","禁止使用灰色边框 border-gray-*, border-slate-*","禁止使用淡入淡出的半透明效果","禁止使用 rounded-full（装饰圆除外）"],components:{button:{name:"按钮",description:"Neo-Brutalist 风格的按钮，带有硬边缘阴影和 hover 位移效果",code:`<button className="
  bg-[#ff006e] text-white font-black
  px-4 py-2 md:px-6 md:py-3
  border-2 md:border-4 border-black
  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
  md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
  hover:shadow-none
  hover:translate-x-[2px] hover:translate-y-[2px]
  md:hover:translate-x-[4px] md:hover:translate-y-[4px]
  transition-all duration-200
  text-sm md:text-base
">
  点击我
</button>`,preview:`<button class="bg-[#ff006e] text-white font-black px-6 py-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">点击我</button>`},card:{name:"卡片",description:"带有黑色边框和硬阴影的卡片组件",code:`<div className="
  bg-white
  border-2 md:border-4 border-black
  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
  md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
  hover:shadow-[4px_4px_0px_0px_rgba(255,0,110,1)]
  md:hover:shadow-[8px_8px_0px_0px_rgba(255,0,110,1)]
  hover:-translate-y-1 md:hover:-translate-y-2
  transition-all duration-300
  p-4 md:p-6
">
  <h3 className="font-black text-lg md:text-xl mb-2">卡片标题</h3>
  <p className="font-mono text-sm md:text-base text-gray-700">
    卡片内容描述文字
  </p>
</div>`},input:{name:"输入框",description:"Neo-Brutalist 风格的表单输入框",code:`<input
  type="text"
  placeholder="请输入..."
  className="
    w-full
    px-3 py-2 md:px-4 md:py-3
    border-2 md:border-4 border-black
    bg-white
    font-mono text-sm md:text-base
    focus:outline-none
    focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
    md:focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
    transition-shadow
  "
/>`},nav:{name:"导航栏",description:"带有底部边框的导航栏",code:`<nav className="
  bg-white
  border-b-2 md:border-b-4 border-black
  px-4 md:px-8
  py-3 md:py-4
">
  <div className="flex items-center justify-between max-w-6xl mx-auto">
    <a href="/" className="font-black text-xl md:text-2xl tracking-wider">
      LOGO
    </a>
    <div className="flex gap-4 md:gap-8">
      <a href="#" className="font-mono text-sm md:text-base hover:text-[#ff006e] transition-colors">
        首页
      </a>
      <a href="#" className="font-mono text-sm md:text-base hover:text-[#ff006e] transition-colors">
        关于
      </a>
      <a href="#" className="font-mono text-sm md:text-base hover:text-[#ff006e] transition-colors">
        联系
      </a>
    </div>
  </div>
</nav>`},hero:{name:"Hero 区块",description:"大标题的 Hero 展示区域",code:`<section className="
  min-h-[60vh] md:min-h-[80vh]
  flex items-center
  px-4 md:px-8
  py-12 md:py-0
  bg-[#ccff00]
  border-b-2 md:border-b-4 border-black
">
  <div className="max-w-4xl mx-auto">
    <h1 className="
      font-black
      text-4xl md:text-6xl lg:text-8xl
      leading-tight
      tracking-tight
      mb-4 md:mb-6
    ">
      大胆的<br />
      设计宣言
    </h1>
    <p className="
      font-mono
      text-base md:text-xl
      max-w-xl
      mb-6 md:mb-8
    ">
      Neo-Brutalist 风格，原始而有力
    </p>
    <button className="
      bg-black text-white font-black
      px-6 py-3 md:px-8 md:py-4
      border-2 md:border-4 border-black
      shadow-[4px_4px_0px_0px_rgba(255,0,110,1)]
      md:shadow-[8px_8px_0px_0px_rgba(255,0,110,1)]
      hover:shadow-none
      hover:translate-x-[2px] hover:translate-y-[2px]
      md:hover:translate-x-[4px] md:hover:translate-y-[4px]
      transition-all
      text-sm md:text-base
    ">
      开始探索
    </button>
  </div>
</section>`}},globalCss:`/* Neo-Brutalist 全局样式 */
:root {
  --accent-pink: #ff006e;
  --accent-green: #ccff00;
  --accent-blue: #00d9ff;
  --accent-yellow: #ff9500;
}

/* 标题字体 */
h1, h2, h3, h4, h5, h6 {
  font-weight: 900;
  letter-spacing: -0.02em;
}

/* 正文字体 */
body {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

/* 选中文字样式 */
::selection {
  background: var(--accent-pink);
  color: white;
}`,aiRules:`你是一个 Neo-Brutalist 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 圆角：rounded-lg, rounded-md, rounded-xl, rounded-full（用于装饰圆除外）
- 模糊阴影：shadow-lg, shadow-xl, shadow-2xl, shadow-md
- 渐变：bg-gradient-*
- 灰色边框：border-gray-*, border-slate-*
- 淡入淡出的半透明效果

## 必须遵守

- 无圆角或 rounded-none
- 硬边缘阴影 shadow-[Xpx_Xpx_0px_0px_rgba(0,0,0,1)]
- 纯黑边框 border-black
- hover 时阴影消失 + translate 位移
- 标题 font-black，正文 font-mono

## 配色

主色：黑 #000000、白 #ffffff
强调色：
- accent-pink: #ff006e（CTA、hover）
- accent-green: #ccff00（成功、装饰）
- accent-blue: #00d9ff（链接、信息）
- accent-yellow: #ff9500（标签、警示）

## 响应式规则

所有样式必须包含移动端和桌面端两套值：
- 间距：p-4 md:p-8, py-12 md:py-32
- 边框：border-2 md:border-4
- 阴影：shadow-[4px] md:shadow-[8px]
- 字号：text-sm md:text-base, text-xl md:text-3xl
- 移动端约为桌面端的 50%

## 交互效果

按钮 hover 必须使用：
shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all

卡片 hover 必须使用：
shadow 变为彩色 + hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300

## 自检

每次生成代码后检查：
1. 没有圆角
2. 没有模糊阴影
3. 边框是纯黑
4. hover 有位移
5. 有 md: 响应式前缀`,examplePrompts:[{title:"SaaS 产品着陆页",titleEn:"SaaS Product Landing Page",description:"包含 Hero、特性卡片、定价表、CTA",descriptionEn:"Includes Hero, feature cards, pricing table, CTA",prompt:`用 Neo-Brutalist 风格生成一个 SaaS 产品着陆页，要求：
1. Hero 区域：大标题使用 font-black，鲜艳背景色（如 #ccff00），黑色粗边框按钮
2. 特性区域：3 个卡片，每个有硬边缘阴影，hover 时阴影变为粉色
3. 定价表：3 列，中间推荐列用强调色背景
4. CTA：全宽黑色背景，白色大标题，粉色按钮
所有元素必须：无圆角、黑色粗边框、硬边缘阴影、hover 位移效果`},{title:"博客文章页",titleEn:"Blog Article Page",description:"包含标题、作者信息、正文、相关文章",descriptionEn:"Includes title, author info, content, related posts",prompt:`用 Neo-Brutalist 风格创建一个博客文章页面，要求：
1. 顶部：超大标题 font-black，作者信息带头像
2. 正文：使用 font-mono，段落间距适中
3. 侧边栏：相关文章卡片，有硬边缘阴影
4. 分享按钮：图标按钮带黑色边框，hover 位移
所有元素遵循 Neo-Brutalist 规范：无圆角、纯黑边框、高对比配色`},{title:"作品集展示",titleEn:"Portfolio Showcase",description:"网格布局展示项目作品",descriptionEn:"Grid layout to showcase projects",prompt:`用 Neo-Brutalist 风格设计一个作品集页面，要求：
1. 导航栏：左侧 Logo 用 font-black，右侧链接 font-mono
2. Hero：个人介绍，使用鲜艳背景色块
3. 作品网格：2-3 列布局，每个卡片有缩略图和标题
4. 卡片效果：黑色粗边框，hover 时阴影变色 + 轻微上移
5. 联系区：简洁表单，输入框 focus 时出现硬阴影`}]},{slug:"editorial",name:"编辑杂志风",nameEn:"Editorial",description:"优雅的杂志排版风格，衬线标题、无衬线正文、精致的留白和网格系统。灵感来自高端时尚杂志和报纸排版。",cover:"/styles/editorial.svg",styleType:"visual",tags:["minimal"],category:"minimal",colors:{primary:"#0a0a0a",secondary:"#fafafa",accent:["#e63946","#6b7280","#e5e5e5"]},keywords:["杂志排版","衬线字体","优雅留白","网格系统","极简主义"],philosophy:`Editorial（编辑杂志风）设计风格源于传统印刷媒体的排版美学，特别是高端时尚杂志和报纸的设计语言。这种风格强调内容的层次结构、精致的字体搭配和大量留白。

核心理念：
- 内容为王：设计服务于内容，不喧宾夺主
- 字体层次：衬线标题与无衬线正文形成对比
- 留白即美：适当的负空间让内容呼吸
- 网格秩序：严谨的栅格系统组织内容`,doList:["标题使用衬线字体 font-serif，正文使用无衬线字体 font-sans","使用大量留白 py-16 md:py-24 或更大","边框使用细线 border border-border","使用小写字母的标签样式 uppercase tracking-widest text-xs","保持颜色克制，主要使用黑白灰","强调色用于点睛之笔，如链接、重要按钮","使用 letter-spacing 调整标题字间距 tracking-tight"],dontList:["禁止使用过多颜色，保持 2-3 色调","禁止使用粗边框或阴影","禁止使用过多装饰元素","禁止标题使用无衬线字体","禁止过小的行高，正文至少 leading-relaxed","禁止元素堆积，保持呼吸感"],components:{button:{name:"按钮",description:"Editorial 风格的按钮，简洁克制",code:`<button className="
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
</button>`},card:{name:"卡片",description:"带细边框的优雅卡片",code:`<div className="
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
</div>`},input:{name:"输入框",description:"简洁的表单输入框",code:`<input
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
/>`},nav:{name:"导航栏",description:"简约的顶部导航",code:`<header className="border-b border-border">
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
</header>`},hero:{name:"Hero 区块",description:"杂志封面式的 Hero 区域",code:`<section className="border-b border-border">
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
</section>`}},globalCss:`/* Editorial 全局样式 */
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
}`,aiRules:`你是一个 Editorial（编辑杂志风）设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

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
- 禁止元素堆积`,examplePrompts:[{title:"杂志风格博客",titleEn:"Magazine Style Blog",description:"经典杂志排版的博客首页",descriptionEn:"Classic magazine layout blog homepage",prompt:`用 Editorial 杂志排版风格创建一个博客首页，要求：
1. 导航栏：细边框分隔，链接使用小写字母 + 字间距
2. 特色文章：大图配衬线字体大标题，作者信息用 text-xs uppercase
3. 文章网格：2-3 列，每篇文章有分类标签、标题、摘要
4. 排版：标题用 font-serif，正文用 font-sans，大量留白
5. 颜色：黑白为主，仅标签或链接用强调色`},{title:"产品详情页",titleEn:"Product Detail Page",description:"高端产品展示页面",descriptionEn:"Premium product showcase page",prompt:`用 Editorial 风格设计一个高端产品详情页，要求：
1. Hero：全宽产品图，标题用衬线字体
2. 产品信息：左图右文布局，规格用细边框表格
3. 特性列表：图标 + 文字，保持简洁
4. 购买区：价格突出，按钮用细边框 + hover 变黑
5. 整体：极简配色，大量留白，细边框分割区域`},{title:"关于我们页面",titleEn:"About Us Page",description:"公司/团队介绍页",descriptionEn:"Company/Team introduction page",prompt:`用 Editorial 风格创建一个公司介绍页面，要求：
1. Hero：大标题 font-serif，配简短 slogan
2. 公司故事：左右交替布局，图文搭配
3. 团队成员：网格展示，照片 + 姓名 + 职位
4. 数据展示：大数字 + 小标签说明
5. 联系方式：简洁表单，细边框输入框
风格要点：衬线标题、无衬线正文、细边框、大留白`}]},{slug:"neumorphism",name:"新拟物派",nameEn:"Neumorphism",description:"柔和的内凹外凸立体效果，通过双重阴影模拟光源，浅色背景配同色系元素，营造精致的立体感。",cover:"/styles/neumorphism.svg",styleType:"visual",tags:["modern","minimal"],category:"modern",colors:{primary:"#e0e5ec",secondary:"#d1d9e6",accent:["#6d5dfc","#ff6b6b","#4ecdc4","#ffe66d"]},keywords:["立体感","双重阴影","柔和","浅色系","内凹外凸"],philosophy:`Neumorphism（新拟物派）是一种介于扁平设计和拟物设计之间的风格，通过柔和的阴影创造出元素从背景中"挤压"或"凹陷"的视觉效果。

核心理念：
- 柔和立体：通过双重阴影（亮/暗）模拟自然光源
- 同色系统一：元素与背景使用相同或相近的颜色
- 触感直觉：凸起表示可交互，凹陷表示已激活或输入区
- 克制装饰：避免过多颜色和对比，保持整体柔和感`,doList:["使用浅色背景 bg-[#e0e5ec] 或 bg-[#f0f0f3]","使用双重阴影 shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]","凹陷效果使用 inset 阴影 shadow-[inset_8px_8px_16px_#b8bcc2,inset_-8px_-8px_16px_#ffffff]","使用中等圆角 rounded-xl (12-24px)","交互元素按下时从凸起变凹陷","保持元素与背景同色系","响应式阴影大小 md: 前缀增大"],dontList:["禁止使用纯黑或纯白背景","禁止使用硬边缘阴影 shadow-[Xpx_Xpx_0px]","禁止使用高对比度配色","禁止使用粗边框 border-2 及以上","禁止使用渐变背景 bg-gradient-*","禁止直角 rounded-none"],components:{button:{name:"按钮",description:"Neumorphism 风格按钮，凸起效果，按下时凹陷",code:`<button className="
  bg-[#e0e5ec] text-gray-700 font-medium
  px-6 py-3 rounded-xl
  shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff]
  hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]
  active:shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]
  transition-all duration-200
">
  按钮文字
</button>`},card:{name:"卡片",description:"Neumorphism 风格卡片容器，柔和的凸起效果",code:`<div className="
  bg-[#e0e5ec] rounded-2xl p-6
  shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]
">
  <h3 className="text-gray-800 font-semibold text-lg mb-2">卡片标题</h3>
  <p className="text-gray-600">卡片内容描述文字</p>
</div>`},input:{name:"输入框",description:"Neumorphism 风格输入框，凹陷效果表示输入区域",code:`<input
  type="text"
  placeholder="请输入..."
  className="
    w-full bg-[#e0e5ec] text-gray-700
    px-4 py-3 rounded-xl
    shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]
    focus:shadow-[inset_6px_6px_12px_#b8bcc2,inset_-6px_-6px_12px_#ffffff]
    focus:outline-none
    placeholder:text-gray-400
    transition-shadow duration-200
  "
/>`},nav:{name:"导航栏",description:"Neumorphism 风格导航栏",code:`<nav className="
  bg-[#e0e5ec] px-6 py-4
  shadow-[0_4px_12px_#b8bcc2]
">
  <div className="flex items-center justify-between max-w-6xl mx-auto">
    <span className="text-gray-800 font-bold text-xl">Logo</span>
    <div className="flex gap-2">
      <a href="#" className="
        px-4 py-2 rounded-lg text-gray-600
        hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]
        transition-shadow
      ">首页</a>
      <a href="#" className="
        px-4 py-2 rounded-lg text-gray-600
        hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]
        transition-shadow
      ">关于</a>
    </div>
  </div>
</nav>`},hero:{name:"Hero 区域",description:"Neumorphism 风格的 Hero 展示区",code:`<section className="bg-[#e0e5ec] min-h-[80vh] flex items-center px-6">
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
      柔和的立体世界
    </h1>
    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
      Neumorphism 通过精致的阴影效果，创造出触手可及的界面体验。
    </p>
    <button className="
      bg-[#6d5dfc] text-white font-medium
      px-8 py-4 rounded-xl
      shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff]
      hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]
      active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)]
      transition-all duration-200
    ">
      开始探索
    </button>
  </div>
</section>`}},globalCss:`/* Neumorphism 全局样式 */

/* 背景色 */
:root {
  --neu-bg: #e0e5ec;
  --neu-bg-light: #f0f0f3;
  --neu-shadow-dark: #b8bcc2;
  --neu-shadow-light: #ffffff;
  --neu-accent: #6d5dfc;
  --neu-text: #333333;
  --neu-text-muted: #6b7280;
}

/* 凸起效果 */
.neu-raised {
  background: var(--neu-bg);
  border-radius: 12px;
  box-shadow:
    8px 8px 16px var(--neu-shadow-dark),
    -8px -8px 16px var(--neu-shadow-light);
}

.neu-raised-sm {
  box-shadow:
    4px 4px 8px var(--neu-shadow-dark),
    -4px -4px 8px var(--neu-shadow-light);
}

/* 凹陷效果 */
.neu-pressed {
  background: var(--neu-bg);
  border-radius: 12px;
  box-shadow:
    inset 8px 8px 16px var(--neu-shadow-dark),
    inset -8px -8px 16px var(--neu-shadow-light);
}

.neu-pressed-sm {
  box-shadow:
    inset 4px 4px 8px var(--neu-shadow-dark),
    inset -4px -4px 8px var(--neu-shadow-light);
}

/* 悬停效果 */
.neu-hover:hover {
  box-shadow:
    4px 4px 8px var(--neu-shadow-dark),
    -4px -4px 8px var(--neu-shadow-light);
}

/* 激活效果 */
.neu-active:active {
  box-shadow:
    inset 4px 4px 8px var(--neu-shadow-dark),
    inset -4px -4px 8px var(--neu-shadow-light);
}

/* 圆形元素 */
.neu-circle {
  border-radius: 50%;
}`,aiRules:`# Neumorphism (新拟物派) 设计规范

## 核心原则
你正在使用 Neumorphism 设计风格。这种风格通过柔和的双重阴影创造元素的立体感。

## 必须遵循
1. 背景色使用浅灰色 bg-[#e0e5ec] 或 bg-[#f0f0f3]
2. 凸起效果: shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]
3. 凹陷效果: shadow-[inset_8px_8px_16px_#b8bcc2,inset_-8px_-8px_16px_#ffffff]
4. 圆角使用 rounded-xl 或 rounded-2xl (12-24px)
5. 按钮按下时从凸起变凹陷 (active: 伪类)
6. 输入框使用凹陷效果表示输入区域
7. 保持同色系：元素颜色与背景相近
8. 响应式阴影：移动端减小阴影尺寸

## 禁止使用
1. 纯黑/纯白背景
2. 硬边缘阴影 shadow-[Xpx_Xpx_0px]
3. 高对比度配色
4. 粗边框 border-2 及以上
5. 渐变背景
6. 直角 rounded-none

## 阴影参数说明
- 亮阴影方向：左上 (-X, -Y)，颜色接近白色 #ffffff
- 暗阴影方向：右下 (X, Y)，颜色比背景深 #b8bcc2
- 阴影模糊度通常是偏移量的 1.5-2 倍

## 配色方案
- 主背景: #e0e5ec
- 浅背景: #f0f0f3
- 暗阴影: #b8bcc2
- 亮阴影: #ffffff
- 强调色: #6d5dfc (紫色)
- 文字: #333333
- 次要文字: #6b7280

## 交互状态
- 默认: 凸起阴影
- Hover: 阴影略微缩小
- Active/Pressed: 变为凹陷阴影
- Focus: 阴影略微增大或添加强调色
- Disabled: 阴影减弱，透明度降低`,examplePrompts:[{title:"智能家居控制面板",titleEn:"Smart Home Control Panel",description:"设备控制和状态展示",descriptionEn:"Device control and status display",prompt:`用 Neumorphism 风格设计一个智能家居控制面板，要求：
1. 背景：统一浅灰色 #e0e5ec
2. 设备卡片：凸起效果，显示设备图标和状态
3. 开关按钮：圆形，开启时凹陷 + 强调色图标
4. 温度滑块：凹槽轨道，凸起滑块
5. 场景按钮：按下时从凸起变凹陷
所有阴影使用双色：右下深色 + 左上亮色`},{title:"计算器应用",titleEn:"Calculator App",description:"拟物风格计算器界面",descriptionEn:"Skeuomorphic calculator interface",prompt:`用 Neumorphism 风格创建一个计算器界面，要求：
1. 外框：大圆角凸起容器
2. 显示屏：凹陷区域，深色背景，显示数字
3. 数字按钮：4x3 网格，凸起效果
4. 运算符：右侧一列，用强调色
5. 按下效果：从凸起变凹陷
背景色 #e0e5ec，阴影用 #a3b1c6 和 #ffffff`},{title:"音频控制器",titleEn:"Audio Controller",description:"音量和均衡器控制",descriptionEn:"Volume and equalizer controls",prompt:`用 Neumorphism 风格设计一个音频控制器，要求：
1. 主容器：大圆角凸起面板
2. 旋钮：圆形凸起，带刻度指示
3. 推子/滑块：垂直凹槽，凸起滑块
4. 均衡器：多个垂直滑块并排
5. 按钮：静音/预设等，按下时凹陷
保持统一的浅灰色调，通过阴影创造立体感`}]},{slug:"glassmorphism",name:"玻璃拟态",nameEn:"Glassmorphism",description:"半透明毛玻璃效果，通过 backdrop-blur 模糊背景、柔和边框和微妙阴影，创造现代感十足的层叠界面。",cover:"/styles/glassmorphism.svg",styleType:"visual",tags:["modern"],category:"modern",colors:{primary:"rgba(255, 255, 255, 0.25)",secondary:"rgba(255, 255, 255, 0.18)",accent:["#667eea","#764ba2","#f093fb","#f5576c"]},keywords:["毛玻璃","透明","模糊","现代","层叠"],philosophy:`Glassmorphism（玻璃拟态）是一种源于 iOS 和 macOS 设计语言的现代 UI 风格，通过半透明背景和背景模糊效果创造出类似磨砂玻璃的视觉感受。

核心理念：
- 层次感：通过透明度区分前后层级
- 现代感：模糊效果营造高端科技氛围
- 轻盈感：半透明元素减少视觉重量
- 深度感：微妙阴影增强空间层次`,doList:["使用半透明背景 bg-white/20 或 bg-white/10","添加背景模糊 backdrop-blur-md 或 backdrop-blur-xl","使用细微边框 border border-white/20","添加柔和阴影 shadow-lg 或 shadow-xl","使用渐变背景作为底层 bg-gradient-to-br","圆角适中 rounded-xl 或 rounded-2xl","文字使用高对比度确保可读性"],dontList:["禁止在纯白或纯色背景上使用（需要渐变或图片背景）","禁止过度透明导致内容不可读","禁止使用硬边缘阴影","禁止省略 backdrop-blur（这是核心效果）","禁止在低对比度环境下使用浅色文字"],components:{button:{name:"按钮",description:"玻璃拟态风格按钮，带有半透明背景和模糊效果",code:`<button className="
  px-6 py-3
  bg-white/20 backdrop-blur-md
  border border-white/30
  rounded-xl
  text-white font-medium
  shadow-lg shadow-black/10
  hover:bg-white/30
  hover:shadow-xl
  transition-all duration-300
">
  Glass Button
</button>`},card:{name:"卡片",description:"毛玻璃卡片，适合在渐变背景上展示内容",code:`<div className="
  p-6 md:p-8
  bg-white/20 backdrop-blur-xl
  border border-white/30
  rounded-2xl
  shadow-xl shadow-black/10
">
  <h3 className="text-xl font-semibold text-white mb-2">
    Glass Card
  </h3>
  <p className="text-white/80">
    毛玻璃效果的卡片内容
  </p>
</div>`},input:{name:"输入框",description:"玻璃拟态输入框",code:`<input
  type="text"
  placeholder="请输入..."
  className="
    w-full px-4 py-3
    bg-white/10 backdrop-blur-md
    border border-white/20
    rounded-xl
    text-white placeholder-white/50
    focus:outline-none focus:border-white/40
    focus:bg-white/20
    transition-all
  "
/>`},nav:{name:"导航栏",description:"固定顶部的毛玻璃导航栏",code:`<nav className="
  fixed top-0 left-0 right-0 z-50
  px-6 py-4
  bg-white/10 backdrop-blur-xl
  border-b border-white/10
">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <a href="/" className="text-white font-bold text-xl">
      Logo
    </a>
    <div className="flex gap-6">
      <a href="#" className="text-white/80 hover:text-white transition-colors">
        首页
      </a>
      <a href="#" className="text-white/80 hover:text-white transition-colors">
        关于
      </a>
    </div>
  </div>
</nav>`},hero:{name:"Hero 区块",description:"带渐变背景的 Hero 展示区域",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400
  px-6
">
  <div className="
    max-w-2xl mx-auto text-center
    p-8 md:p-12
    bg-white/10 backdrop-blur-xl
    border border-white/20
    rounded-3xl
    shadow-2xl
  ">
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
      Glassmorphism
    </h1>
    <p className="text-lg text-white/80 mb-8">
      现代感十足的毛玻璃设计风格
    </p>
    <button className="
      px-8 py-4
      bg-white/20 backdrop-blur-md
      border border-white/30
      rounded-full
      text-white font-semibold
      hover:bg-white/30
      transition-all
    ">
      开始探索
    </button>
  </div>
</section>`}},globalCss:`/* Glassmorphism 全局样式 */

/* 渐变背景变量 */
:root {
  --glass-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* 基础毛玻璃类 */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}

/* 渐变背景容器 */
.glass-container {
  background: var(--glass-gradient);
  min-height: 100vh;
}`,aiRules:`你是一个 Glassmorphism 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 在纯色背景上使用玻璃效果（必须有渐变或图片背景）
- 省略 backdrop-blur 属性
- 使用硬边缘阴影 shadow-[Xpx_Xpx_0px]
- 使用不透明背景 bg-white, bg-black
- 使用直角 rounded-none

## 必须遵守

- 半透明背景 bg-white/10 到 bg-white/30
- 背景模糊 backdrop-blur-md 或 backdrop-blur-xl
- 细微边框 border border-white/20
- 柔和阴影 shadow-lg, shadow-xl
- 圆角 rounded-xl 或 rounded-2xl
- 渐变背景容器 bg-gradient-to-br

## 配色

渐变背景推荐：
- 紫粉: from-purple-600 via-pink-500 to-orange-400
- 蓝紫: from-blue-600 via-purple-600 to-pink-500
- 青蓝: from-cyan-400 via-blue-500 to-purple-600

玻璃元素：
- 背景: bg-white/10, bg-white/20
- 边框: border-white/20, border-white/30
- 文字: text-white, text-white/80

## 层级结构

1. 底层：渐变背景或图片
2. 中层：毛玻璃容器
3. 顶层：内容元素

## 自检

每次生成代码后检查：
1. 有渐变或图片背景
2. 有 backdrop-blur
3. 使用半透明背景色
4. 有柔和阴影
5. 文字可读性良好`,examplePrompts:[{title:"登录/注册页",titleEn:"Login/Register Page",description:"毛玻璃风格的认证页面",descriptionEn:"Glassmorphic authentication page",prompt:`用 Glassmorphism 风格创建一个登录页面，要求：
1. 背景：全屏渐变（紫粉或蓝紫色系）
2. 登录卡片：居中，bg-white/10 backdrop-blur-xl，圆角 rounded-2xl
3. 表单：输入框半透明背景，focus 时边框发光
4. 按钮：渐变背景或半透明白色，hover 时更亮
5. 装饰：添加一些模糊的圆形光斑作为背景装饰`},{title:"音乐播放器",titleEn:"Music Player",description:"现代感音乐播放界面",descriptionEn:"Modern music player interface",prompt:`用 Glassmorphism 风格设计一个音乐播放器界面，要求：
1. 背景：当前播放歌曲的模糊封面图
2. 播放卡片：毛玻璃效果，显示封面、歌曲信息
3. 控制栏：播放/暂停/上下曲按钮，半透明背景
4. 进度条：渐变色轨道，毛玻璃滑块
5. 播放列表：侧边栏，半透明背景，每行歌曲 hover 时更亮`},{title:"天气应用",titleEn:"Weather App",description:"精美的天气展示界面",descriptionEn:"Beautiful weather display interface",prompt:`用 Glassmorphism 风格创建一个天气应用界面，要求：
1. 背景：根据天气变化的渐变（晴天蓝黄、阴天灰蓝等）
2. 主卡片：当前天气，大温度数字，天气图标
3. 小时预报：横向滚动，每个时间点一个小卡片
4. 周预报：列表形式，每行一天
5. 所有卡片：backdrop-blur, bg-white/20, rounded-xl, shadow-lg`}]},{slug:"bento-grid",name:"便当盒布局",nameEn:"Bento Grid",description:"灵感源于日式便当盒的不规则网格布局，通过大小不一的卡片组合创造视觉层次，常用于作品集和产品展示。",cover:"/styles/bento-grid.svg",styleType:"layout",tags:["modern","responsive"],compatibleWith:["glassmorphism","neo-brutalist","editorial","neumorphism"],category:"modern",colors:{primary:"#18181b",secondary:"#fafafa",accent:["#3b82f6","#8b5cf6","#ec4899","#f97316"]},keywords:["网格","卡片","不规则","作品集","现代"],philosophy:`Bento Grid（便当盒布局）是一种源于日式便当盒分隔设计的现代布局风格。通过不同尺寸的卡片在网格中的组合排列，创造出既有秩序又富有变化的视觉效果。

核心理念：
- 模块化：每个区块独立但相互关联
- 层次感：通过尺寸差异突出重点内容
- 留白：适当间隙让布局呼吸
- 响应式：在不同屏幕上优雅适配`,doList:["使用 CSS Grid 布局 grid grid-cols-4","卡片跨越多行或多列 col-span-2, row-span-2","保持一致的间隙 gap-4 或 gap-6","使用圆角 rounded-xl 或 rounded-2xl","添加微妙阴影增加层次 shadow-sm hover:shadow-md","大卡片放置主要内容，小卡片放置次要信息","使用 aspect-ratio 保持卡片比例"],dontList:["禁止所有卡片大小相同（失去 Bento 特色）","禁止间隙不一致","禁止卡片过于拥挤无留白","禁止忽略响应式适配","禁止在卡片内堆砌过多内容"],components:{button:{name:"按钮",description:"Bento 风格的简洁按钮",code:`<button className="
  px-6 py-3
  bg-zinc-900 text-white
  rounded-xl
  font-medium
  hover:bg-zinc-800
  transition-colors
">
  Click me
</button>`},card:{name:"卡片",description:"Bento Grid 中的基础卡片单元",code:`<div className="
  p-6
  bg-white
  rounded-2xl
  border border-zinc-100
  shadow-sm
  hover:shadow-md
  transition-shadow
">
  <div className="w-10 h-10 bg-blue-500 rounded-xl mb-4 flex items-center justify-center">
    <span className="text-white text-xl">*</span>
  </div>
  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
    Feature Title
  </h3>
  <p className="text-zinc-600 text-sm">
    简短的功能描述文字
  </p>
</div>`},input:{name:"输入框",description:"简洁的输入框样式",code:`<input
  type="text"
  placeholder="请输入..."
  className="
    w-full px-4 py-3
    bg-zinc-50
    border border-zinc-200
    rounded-xl
    text-zinc-900 placeholder-zinc-400
    focus:outline-none focus:ring-2 focus:ring-blue-500/20
    focus:border-blue-500
    transition-all
  "
/>`},nav:{name:"导航栏",description:"简约的顶部导航",code:`<nav className="
  px-6 py-4
  border-b border-zinc-100
">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <a href="/" className="text-xl font-bold text-zinc-900">
      Logo
    </a>
    <div className="flex items-center gap-8">
      <a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">
        Products
      </a>
      <a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">
        About
      </a>
      <button className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm">
        Get Started
      </button>
    </div>
  </div>
</nav>`},hero:{name:"Bento Grid 布局",description:"完整的 Bento Grid 展示区域",code:`<section className="py-16 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-zinc-900 mb-8">
      Features
    </h2>

    <div className="grid grid-cols-4 gap-4">
      {/* 大卡片 - 跨2列2行 */}
      <div className="col-span-2 row-span-2 p-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl text-white">
        <h3 className="text-2xl font-bold mb-4">主要功能</h3>
        <p className="text-white/80">这是最重要的功能展示区域</p>
      </div>

      {/* 中卡片 */}
      <div className="col-span-2 p-6 bg-zinc-100 rounded-2xl">
        <h3 className="font-semibold mb-2">功能二</h3>
        <p className="text-zinc-600 text-sm">描述文字</p>
      </div>

      {/* 小卡片 */}
      <div className="p-6 bg-orange-100 rounded-2xl">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 12l1.5 1.5L12 7l6.5 6.5L20 12L12 2z"/></svg>
      </div>

      <div className="p-6 bg-green-100 rounded-2xl">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z"/></svg>
      </div>
    </div>
  </div>
</section>`}},globalCss:`/* Bento Grid 全局样式 */

/* 基础 Grid 容器 */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
}

/* 卡片尺寸变体 */
.bento-lg {
  grid-column: span 2;
  grid-row: span 2;
}

.bento-wide {
  grid-column: span 2;
}

.bento-tall {
  grid-row: span 2;
}

/* 卡片悬停效果 */
.bento-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.bento-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}`,aiRules:`你是一个 Bento Grid 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 所有卡片大小相同（必须有尺寸变化）
- 忽略响应式适配
- 卡片之间间隙不一致
- 卡片内容过于拥挤
- 使用直角（需要圆角）

## 必须遵守

- 使用 CSS Grid: grid grid-cols-4
- 卡片跨越: col-span-2, row-span-2
- 一致间隙: gap-4 或 gap-6
- 圆角: rounded-xl, rounded-2xl, rounded-3xl
- 微妙阴影: shadow-sm hover:shadow-md
- 响应式: md:grid-cols-2, lg:grid-cols-4

## 布局规则

大卡片 (col-span-2 row-span-2):
- 放置主要内容或特色功能
- 可使用渐变背景
- 建议 1-2 个

中卡片 (col-span-2 或 row-span-2):
- 次要重要内容
- 建议 2-3 个

小卡片 (1x1):
- 图标、数字、标签等简短内容
- 填充剩余空间

## 配色建议

背景:
- 渐变: bg-gradient-to-br from-blue-500 to-purple-600
- 浅色: bg-zinc-50, bg-zinc-100
- 彩色: bg-orange-100, bg-green-100, bg-blue-100

文字:
- 主要: text-zinc-900
- 次要: text-zinc-600
- 白色: text-white (在深色背景上)

## 自检

每次生成代码后检查：
1. 有大小不一的卡片
2. 使用了 CSS Grid
3. 间隙一致
4. 有响应式处理
5. 圆角统一`,examplePrompts:[{title:"功能特性展示",titleEn:"Feature Showcase",description:"产品功能的 Bento 网格布局",descriptionEn:"Bento grid layout for product features",prompt:`用 Bento Grid 风格展示产品的 6 个核心功能，要求：
1. 使用 CSS Grid 创建不规则网格布局
2. 突出功能占据 col-span-2 或 row-span-2
3. 每个卡片包含：图标、标题、简短描述
4. 部分卡片使用强调色背景（如 sky-400）
5. 响应式：移动端单列，桌面端多列
所有卡片 rounded-2xl，统一 gap-4，hover 轻微上浮`},{title:"个人主页",titleEn:"Personal Homepage",description:"个人信息和链接的 Bento 布局",descriptionEn:"Bento layout for personal info and links",prompt:`用 Bento Grid 风格创建一个个人主页，要求：
1. 大卡片：个人照片 + 简介
2. 社交链接：小方块卡片，各一个图标
3. 技能展示：横向长条卡片
4. 最新项目：中等大小卡片，带缩略图
5. 联系方式：底部全宽卡片
网格布局参考 Apple 风格，色彩柔和但有亮点`},{title:"数据仪表盘",titleEn:"Data Dashboard",description:"数据统计卡片的网格布局",descriptionEn:"Grid layout for data statistics cards",prompt:`用 Bento Grid 风格设计一个数据仪表盘，要求：
1. 大卡片：主要图表（占 2x2）
2. 数据卡片：关键指标数字 + 趋势
3. 列表卡片：最近活动或待办事项
4. 小卡片：快捷操作按钮
5. 全宽卡片：时间线或进度条
使用 CSS Grid，深色卡片配亮色文字，浅色卡片配深色文字`}]},{slug:"corporate-clean",name:"企业简洁风",nameEn:"Corporate Clean",description:"专业简洁的企业风格，强调可读性、一致性和信任感。适合B2B SaaS、企业官网、后台管理系统。",cover:"/styles/corporate-clean.svg",styleType:"visual",tags:["minimal","modern"],category:"minimal",colors:{primary:"#1e40af",secondary:"#f8fafc",accent:["#3b82f6","#64748b","#10b981"]},keywords:["企业","专业","简洁","B2B","SaaS","后台","Dashboard"],philosophy:`Corporate Clean 设计风格源于现代企业软件的设计语言，强调专业性、可信度和高效的信息传达。

核心理念：
- 专业可信：通过一致的视觉语言建立信任
- 信息层次：清晰的标题、正文、辅助信息层级
- 功能优先：设计服务于功能，不牺牲可用性
- 响应迅速：流畅的交互和即时的视觉反馈`,doList:["使用 rounded-lg 或 rounded-xl 作为主要圆角","按钮使用 shadow-sm 或 shadow 增加层次感","主色使用蓝色系 (blue-600, blue-700) 传达专业感","背景使用 bg-slate-50 或 bg-gray-50 的浅色调","卡片使用 bg-white shadow-sm border border-gray-200","使用 hover:shadow-md 为卡片添加悬停效果","表格行使用 hover:bg-gray-50 的悬停高亮","使用 focus:ring-2 focus:ring-blue-500 作为焦点状态"],dontList:["禁止使用过于鲜艳的颜色组合","禁止使用 rounded-none 的尖锐边角","禁止使用 shadow-2xl 等过重的阴影","禁止使用渐变按钮（保持扁平设计）","禁止在正文中使用花哨字体","禁止元素间距过于紧凑"],components:{button:{name:"按钮",description:"Corporate 风格的按钮，专业可信",code:`// Primary Button
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200 font-medium">
  Get Started
</button>

// Secondary Button
<button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200 font-medium">
  Learn More
</button>

// Ghost Button
<button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium">
  Cancel
</button>`},card:{name:"卡片",description:"Corporate 风格的卡片，干净专业",code:`<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900">Feature Title</h3>
  </div>
  <p className="text-gray-600 leading-relaxed">
    Description of the feature with clear, professional language.
  </p>
</div>`},input:{name:"输入框",description:"Corporate 风格的输入框",code:`<div className="space-y-1.5">
  <label className="block text-sm font-medium text-gray-700">Email Address</label>
  <input
    type="email"
    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
    placeholder="you@company.com"
  />
  <p className="text-xs text-gray-500">We'll never share your email.</p>
</div>`}},globalCss:`/* Corporate Clean Global Styles */
@layer base {
  :root {
    --corporate-blue: 37 99 235;
    --corporate-gray: 100 116 139;
  }

  body {
    @apply bg-slate-50 text-gray-900 antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-semibold tracking-tight text-gray-900;
  }
}`,aiRules:`STYLE: Corporate Clean
TYPE: Professional Enterprise UI

MUST USE:
- rounded-lg or rounded-xl for components
- shadow-sm or shadow for cards/buttons
- Blue color palette (blue-500/600/700) for primary actions
- Gray palette (gray-50/100/200) for backgrounds and borders
- font-medium or font-semibold for interactive elements
- focus:ring-2 focus:ring-blue-500 for focus states

MUST AVOID:
- rounded-none (too harsh)
- shadow-2xl (too heavy)
- Gradient backgrounds on buttons
- Neon or overly bright colors
- Decorative fonts for body text

COLOR RULES:
- Primary: Blue (blue-600)
- Secondary: Slate/Gray (slate-100, gray-100)
- Success: Green (green-500)
- Warning: Amber (amber-500)
- Error: Red (red-500)

SPACING:
- Card padding: p-6
- Section padding: py-12 md:py-16
- Gap between elements: gap-4 or gap-6`,examplePrompts:[{title:"SaaS Dashboard",titleEn:"SaaS Dashboard",description:"生成企业级 SaaS 仪表板",descriptionEn:"Generate enterprise SaaS dashboard",prompt:`Create a SaaS dashboard using Corporate Clean style:
- Header with logo, search, and user menu
- Sidebar navigation with icons
- Main content area with metric cards
- Data table with pagination
- Use blue-600 for primary actions
- rounded-xl for cards, shadow-sm for depth`}]},{slug:"minimalist-flat",name:"极简扁平风",nameEn:"Minimalist Flat",description:"极致简约的扁平设计，无阴影无渐变，通过颜色和留白创造层次。适合作品集、创意机构、艺术网站。",cover:"/styles/minimalist-flat.svg",styleType:"visual",tags:["minimal","modern"],category:"minimal",colors:{primary:"#000000",secondary:"#ffffff",accent:["#ff3366","#00d4aa","#ffcc00"]},keywords:["极简","扁平","无阴影","作品集","创意","艺术"],philosophy:`Minimalist Flat 风格追求设计的本质，去除一切不必要的装饰，让内容成为主角。

核心理念：
- 少即是多：每个元素都必须有存在的理由
- 扁平纯粹：拒绝阴影、渐变等仿真效果
- 颜色说话：用色彩区分层次而非光影
- 大量留白：让设计呼吸，突出核心内容`,doList:["使用纯色背景 bg-white, bg-black, bg-[accent]","边框使用 border-2 border-black 或无边框","圆角保持一致：全部 rounded-none 或全部 rounded-full","使用高对比度配色","大量使用留白 space-y-12 md:space-y-24","文字使用纯黑或纯白 text-black, text-white","悬停使用颜色变化而非阴影"],dontList:["禁止使用任何阴影 shadow-*","禁止使用渐变 bg-gradient-*","禁止使用透明度低于 0.5 的颜色","禁止混用不同的圆角值","禁止使用灰色文字（除非是有意为之）","禁止使用图案背景"],components:{button:{name:"按钮",description:"Minimalist Flat 风格的按钮",code:`// Primary Button - Filled
<button className="px-6 py-3 bg-black text-white font-medium hover:bg-white hover:text-black border-2 border-black transition-colors duration-200">
  Get Started
</button>

// Secondary Button - Outlined
<button className="px-6 py-3 bg-white text-black font-medium border-2 border-black hover:bg-black hover:text-white transition-colors duration-200">
  Learn More
</button>

// Accent Button
<button className="px-6 py-3 bg-[#ff3366] text-white font-medium border-2 border-[#ff3366] hover:bg-white hover:text-[#ff3366] transition-colors duration-200">
  Accent Action
</button>`},card:{name:"卡片",description:"Minimalist Flat 风格的卡片",code:`// Bordered Card
<div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-colors duration-200 group">
  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-300">Category</span>
  <h3 className="text-2xl font-bold mt-2 mb-4">Card Title</h3>
  <p className="leading-relaxed">
    Brief description with minimal styling and maximum impact.
  </p>
</div>

// Color Block Card
<div className="bg-[#ff3366] text-white p-8">
  <h3 className="text-2xl font-bold mb-4">Featured</h3>
  <p className="leading-relaxed opacity-90">
    High contrast color block for emphasis.
  </p>
</div>`},input:{name:"输入框",description:"Minimalist Flat 风格的输入框",code:`// Underline Input
<div className="space-y-2">
  <label className="block text-xs font-bold uppercase tracking-widest">Email</label>
  <input
    type="email"
    className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:border-[#ff3366] transition-colors duration-200"
    placeholder="your@email.com"
  />
</div>

// Boxed Input
<input
  type="text"
  className="w-full px-4 py-3 bg-white border-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:bg-black focus:text-white focus:placeholder:text-gray-400 transition-colors duration-200"
  placeholder="Search..."
/>`}},globalCss:`/* Minimalist Flat Global Styles */
@layer base {
  body {
    @apply bg-white text-black antialiased;
  }

  h1, h2, h3, h4 {
    @apply font-bold tracking-tight;
  }

  ::selection {
    @apply bg-black text-white;
  }
}`,aiRules:`STYLE: Minimalist Flat
TYPE: Ultra-minimal flat design

MUST USE:
- Pure colors only: bg-white, bg-black, bg-[accent]
- border-2 border-black for defined edges
- Consistent corners: all rounded-none OR all rounded-full
- High contrast: black/white with one accent
- Generous whitespace: space-y-12 md:space-y-24
- Color hover states: hover:bg-black hover:text-white

MUST AVOID:
- ANY shadows (shadow-sm, shadow-md, etc.)
- ANY gradients (bg-gradient-*)
- Low opacity colors
- Gray text (unless intentional muted text)
- Mixed border-radius values
- Pattern backgrounds

COLOR RULES:
- Primary: Black (#000000)
- Background: White (#ffffff)
- Accent: One vibrant color (e.g., #ff3366)
- No grays except for intentional muted elements

TYPOGRAPHY:
- Headers: font-bold tracking-tight
- Body: Regular weight, good line-height
- Labels: text-xs uppercase tracking-widest`,examplePrompts:[{title:"Portfolio",titleEn:"Designer Portfolio",description:"生成极简设计师作品集",descriptionEn:"Generate minimalist designer portfolio",prompt:`Create a designer portfolio using Minimalist Flat style:
- Full-screen hero with name and title
- Grid of project cards with hover color inversion
- No shadows, no gradients
- Black and white with one accent color
- Large typography for headings
- Generous whitespace between sections`}]},{slug:"soft-ui",name:"柔和界面风",nameEn:"Soft UI",description:"温和友好的界面风格，柔和的阴影、圆润的边角、低饱和度的配色。适合消费类应用、社交产品、生活服务类 App。",cover:"/styles/soft-ui.svg",styleType:"visual",tags:["modern","minimal"],category:"modern",colors:{primary:"#6366f1",secondary:"#f1f5f9",accent:["#ec4899","#10b981","#f59e0b"]},keywords:["柔和","圆润","友好","消费类","App","社交","生活服务"],philosophy:`Soft UI 设计风格强调友好、亲和、舒适的视觉体验，让用户感到放松和愉悦。

核心理念：
- 温和友好：通过柔和的阴影和圆角传达亲和力
- 低对比度：避免强烈对比，使用柔和的色彩过渡
- 触感设计：让界面元素看起来可以触摸
- 情感连接：通过设计传达温暖和关怀`,doList:["使用 rounded-2xl 或 rounded-3xl 作为主要圆角","使用 shadow-lg 或 shadow-xl 配合透明度 shadow-[accent]/20","背景使用浅色调 bg-slate-50, bg-gray-50","使用低饱和度的主色调","按钮使用 hover:shadow-xl hover:-translate-y-0.5 的悬浮效果","卡片间使用 gap-6 或 gap-8 的宽松间距","图标使用圆形背景 rounded-full bg-[color]/10"],dontList:["禁止使用尖锐边角 rounded-none","禁止使用纯黑色 #000000","禁止使用高饱和度的纯色","禁止使用硬边框 border-black","禁止使用硬阴影（无模糊的阴影）","禁止元素间距过于紧凑"],components:{button:{name:"按钮",description:"Soft UI 风格的按钮",code:`// Primary Button
<button className="px-6 py-3 bg-indigo-500 text-white rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200 font-medium">
  Get Started
</button>

// Secondary Button
<button className="px-6 py-3 bg-white text-gray-700 rounded-2xl shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 font-medium">
  Learn More
</button>

// Soft Ghost
<button className="px-6 py-3 text-indigo-500 bg-indigo-50 rounded-2xl hover:bg-indigo-100 transition-colors duration-200 font-medium">
  Cancel
</button>`},card:{name:"卡片",description:"Soft UI 风格的卡片",code:`<div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
  <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
    <Icon className="w-7 h-7 text-indigo-500" />
  </div>
  <h3 className="text-xl font-semibold text-gray-800 mb-3">Feature Title</h3>
  <p className="text-gray-500 leading-relaxed">
    Soft, friendly description that puts users at ease.
  </p>
</div>`},input:{name:"输入框",description:"Soft UI 风格的输入框",code:`<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-600">Email</label>
  <input
    type="email"
    className="w-full px-5 py-3.5 bg-gray-50 border-0 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white transition-all duration-200"
    placeholder="you@example.com"
  />
</div>`}},globalCss:`/* Soft UI Global Styles */
@layer base {
  :root {
    --soft-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  }

  body {
    @apply bg-slate-50 text-gray-800 antialiased;
  }

  h1, h2, h3, h4 {
    @apply font-semibold text-gray-800;
  }
}`,aiRules:`STYLE: Soft UI
TYPE: Friendly, approachable interface design

MUST USE:
- rounded-2xl or rounded-3xl for all components
- shadow-lg with color tint: shadow-[color]/20
- Soft backgrounds: bg-slate-50, bg-gray-50
- Hover lift effect: hover:-translate-y-0.5 hover:shadow-xl
- Low saturation primary colors
- Circular icon backgrounds: rounded-full bg-[color]/10

MUST AVOID:
- Sharp corners (rounded-none, rounded-sm)
- Pure black (#000000)
- High saturation pure colors
- Hard borders (border-black, border-2)
- Hard shadows (no blur)
- Tight spacing

COLOR RULES:
- Primary: Indigo/Purple tones (indigo-500)
- Background: Slate/Gray soft (slate-50, gray-50)
- Text: Gray-800 for headings, gray-500 for body
- Shadows: Always with color tint and opacity

SPACING:
- Card padding: p-6 md:p-8
- Section padding: py-16 md:py-24
- Gap: gap-6 md:gap-8`,examplePrompts:[{title:"消费App",titleEn:"Consumer App Landing",description:"生成消费类 App 着陆页",descriptionEn:"Generate consumer app landing page",prompt:`Create a consumer app landing using Soft UI style:
- Hero with app mockup and soft floating cards
- Feature section with rounded cards and colored shadows
- Testimonial cards with avatar and soft shadows
- CTA with gradient button (soft gradient)
- All rounded-2xl or rounded-3xl
- Hover effects with lift and shadow expansion`}]},{slug:"natural-organic",name:"自然有机风",nameEn:"Natural Organic",description:"温暖自然的有机风格，大地色系、自然纹理、手工感元素。适合健康品牌、有机食品、环保产品、手工艺品。",cover:"/styles/natural-organic.svg",styleType:"visual",tags:["minimal","modern"],category:"minimal",colors:{primary:"#5c4033",secondary:"#faf6f1",accent:["#8b9d77","#d4a373","#e9e0d4"]},keywords:["自然","有机","大地色","手工","健康","环保","可持续"],philosophy:`Natural Organic 风格从自然界汲取灵感，通过大地色系、有机形状和自然纹理创造温暖亲切的体验。

核心理念：
- 自然和谐：色彩和形状来自自然界
- 温暖亲切：让用户感到舒适和信任
- 手工质感：避免过于工业化的冷感
- 可持续美学：简约但不冷淡`,doList:["使用大地色系 amber, stone, olive, sage","背景使用温暖的米色 bg-[#faf6f1], bg-amber-50","使用不规则圆角 rounded-[2rem] 或 blob 形状","添加纸张/织物纹理 (可通过 CSS 或 SVG)","使用手写风格或衬线字体","按钮使用柔和的过渡 hover:bg-stone-200","图片使用自然/有机/手工内容"],dontList:["禁止使用冷色调（蓝、紫除非作为辅助）","禁止使用纯黑 #000000","禁止使用尖锐的几何形状","禁止使用高科技感的设计元素","禁止使用霓虹/高饱和度颜色","禁止使用完美的圆形/矩形"],components:{button:{name:"按钮",description:"Natural Organic 风格的按钮",code:`// Primary Button
<button className="px-6 py-3 bg-stone-800 text-stone-50 rounded-full hover:bg-stone-700 transition-colors duration-300 font-medium">
  Shop Now
</button>

// Secondary Button
<button className="px-6 py-3 bg-transparent text-stone-800 border border-stone-300 rounded-full hover:bg-stone-100 hover:border-stone-400 transition-all duration-300 font-medium">
  Learn More
</button>

// Earthy Accent
<button className="px-6 py-3 bg-[#8b9d77] text-white rounded-full hover:bg-[#7a8c66] transition-colors duration-300 font-medium">
  Subscribe
</button>`},card:{name:"卡片",description:"Natural Organic 风格的卡片",code:`<div className="bg-[#faf6f1] rounded-[2rem] p-8 border border-stone-200 hover:border-stone-300 transition-colors duration-300">
  <div className="w-16 h-16 bg-[#8b9d77]/20 rounded-full flex items-center justify-center mb-6">
    <Leaf className="w-8 h-8 text-[#8b9d77]" />
  </div>
  <h3 className="text-xl font-serif text-stone-800 mb-3">Organic Ingredients</h3>
  <p className="text-stone-600 leading-relaxed">
    Sourced from sustainable farms that care for the earth.
  </p>
</div>`},input:{name:"输入框",description:"Natural Organic 风格的输入框",code:`<div className="space-y-2">
  <label className="block text-sm font-medium text-stone-700">Your Email</label>
  <input
    type="email"
    className="w-full px-5 py-3 bg-white border border-stone-200 rounded-full text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200 transition-all duration-300"
    placeholder="hello@example.com"
  />
</div>`}},globalCss:`/* Natural Organic Global Styles */
@layer base {
  body {
    @apply bg-[#faf6f1] text-stone-800 antialiased;
  }

  h1, h2, h3, h4 {
    @apply font-serif;
  }
}

/* Optional paper texture overlay */
.organic-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
}`,aiRules:`STYLE: Natural Organic
TYPE: Warm, earthy, nature-inspired design

MUST USE:
- Earth tones: stone, amber, olive, sage colors
- Warm background: bg-[#faf6f1], bg-amber-50
- Organic shapes: rounded-full, rounded-[2rem], blob shapes
- Serif fonts for headings: font-serif
- Soft transitions: transition-colors duration-300
- Natural imagery and icons (leaves, plants, earth)

MUST AVOID:
- Cold colors (blue, purple as primary)
- Pure black (#000000)
- Sharp geometric shapes
- High-tech design elements
- Neon/high saturation colors
- Perfect circles/rectangles

COLOR PALETTE:
- Primary: Stone/Brown (#5c4033)
- Background: Warm cream (#faf6f1)
- Accent: Sage green (#8b9d77)
- Secondary: Warm tan (#d4a373)

TYPOGRAPHY:
- Headings: font-serif, tracking-tight
- Body: font-sans, stone-600
- Comfortable line-height`,examplePrompts:[{title:"有机品牌",titleEn:"Organic Brand Site",description:"生成有机食品品牌网站",descriptionEn:"Generate organic food brand website",prompt:`Create an organic brand website using Natural Organic style:
- Hero with large product image on cream background
- Feature cards with organic shapes and sage green accents
- Testimonials with hand-drawn style elements
- Newsletter signup with rounded-full input
- Footer with earth-tone color blocks
- Font-serif for headings, warm color palette`}]},{slug:"modern-gradient",name:"现代渐变风",nameEn:"Modern Gradient",description:"充满活力的现代渐变风格，多彩渐变背景、玻璃质感卡片、动态光影效果。适合创业公司、数字产品、活动页面。",cover:"/styles/modern-gradient.svg",styleType:"visual",tags:["expressive","modern"],category:"expressive",colors:{primary:"#8b5cf6",secondary:"#1e1b4b",accent:["#06b6d4","#ec4899","#f59e0b"]},keywords:["渐变","现代","活力","创业","数字","动态","科技感"],philosophy:`Modern Gradient 风格通过丰富的渐变色彩和光影效果创造视觉冲击力和活力感。

核心理念：
- 视觉活力：渐变色彩带来动感和能量
- 深度层次：通过渐变和透明度创造深度
- 现代科技：传达创新和前沿的品牌形象
- 情感共鸣：色彩激发积极的情感反应`,doList:["使用 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 等渐变","卡片使用 backdrop-blur-xl bg-white/10 的玻璃效果","按钮使用渐变 + hover 时渐变位移效果","深色背景 bg-slate-950 或 bg-[#1e1b4b]","文字使用 bg-gradient-to-r bg-clip-text text-transparent 渐变效果","使用 rounded-2xl 或 rounded-3xl 圆角","添加光晕效果 blur-3xl opacity-30 作为装饰"],dontList:["禁止使用纯色背景（主要区域）","禁止使用单调的灰色调","禁止使用尖锐边角 rounded-none","禁止使用老式渐变（如垂直渐变的按钮）","禁止过度使用渐变导致视觉混乱","禁止在深色渐变上使用深色文字"],components:{button:{name:"按钮",description:"Modern Gradient 风格的渐变按钮",code:`// Primary Gradient Button
<button className="px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-2xl font-medium hover:from-violet-600 hover:to-fuchsia-600 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300">
  Get Started
</button>

// Outline Gradient Button
<button className="px-6 py-3 rounded-2xl font-medium relative group">
  <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl" />
  <span className="absolute inset-[2px] bg-slate-950 rounded-[14px] group-hover:bg-slate-900 transition-colors" />
  <span className="relative bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
    Learn More
  </span>
</button>

// Glass Button
<button className="px-6 py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-2xl font-medium hover:bg-white/20 transition-all duration-300">
  Explore
</button>`},card:{name:"卡片",description:"Modern Gradient 风格的玻璃卡片",code:`<div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300">
  <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mb-6">
    <Icon className="w-7 h-7 text-white" />
  </div>
  <h3 className="text-xl font-semibold text-white mb-3">Feature Title</h3>
  <p className="text-white/70 leading-relaxed">
    Stunning visual effects with modern gradient aesthetics.
  </p>
</div>`},input:{name:"输入框",description:"Modern Gradient 风格的输入框",code:`<div className="space-y-2">
  <label className="block text-sm font-medium text-white/70">Email Address</label>
  <input
    type="email"
    className="w-full px-5 py-3.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300"
    placeholder="you@example.com"
  />
</div>`}},globalCss:`/* Modern Gradient Global Styles */
@layer base {
  body {
    @apply bg-slate-950 text-white antialiased;
  }
}

/* Gradient text utility */
.gradient-text {
  @apply bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent;
}

/* Glow orb decoration */
.glow-orb {
  @apply absolute blur-3xl opacity-30 pointer-events-none;
}

/* Animated gradient background */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animated-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
}`,aiRules:`STYLE: Modern Gradient
TYPE: Vibrant, energetic gradient design

MUST USE:
- Gradient backgrounds: bg-gradient-to-r from-violet-500 to-fuchsia-500
- Glass morphism cards: backdrop-blur-xl bg-white/10 border-white/20
- Dark base background: bg-slate-950 or bg-[#1e1b4b]
- Gradient text: bg-gradient-to-r bg-clip-text text-transparent
- Colored shadows: shadow-violet-500/25
- Large rounded corners: rounded-2xl, rounded-3xl
- Glow orbs for decoration: blur-3xl opacity-30

MUST AVOID:
- Solid color backgrounds (main areas)
- Monotone gray schemes
- Sharp corners (rounded-none)
- Old-style gradients (vertical button gradients)
- Visual clutter from too many gradients
- Dark text on dark gradients

COLOR COMBOS:
- Violet to Fuchsia: from-violet-500 to-fuchsia-500
- Cyan to Blue: from-cyan-500 to-blue-500
- Pink to Orange: from-pink-500 to-orange-500
- Multi-color: from-violet-500 via-fuchsia-500 to-cyan-500

TYPOGRAPHY:
- Headings: White or gradient text
- Body: text-white/70 or text-white/80
- Font weight: font-medium to font-semibold`,examplePrompts:[{title:"创业着陆页",titleEn:"Startup Landing",description:"生成现代创业公司着陆页",descriptionEn:"Generate modern startup landing page",prompt:`Create a startup landing using Modern Gradient style:
- Full-width hero with animated gradient background
- Floating glass cards with features
- Gradient CTAs with shadow glow
- Stats section with gradient numbers
- Testimonials in glass cards
- Dark footer with gradient accents
- Add decorative glow orbs`}]},{slug:"retro-vintage",name:"复古怀旧风",nameEn:"Retro Vintage",description:"怀旧复古的设计风格，老式排版、复古色调、手工质感元素。适合咖啡馆、复古品牌、独立杂志、音乐厂牌。",cover:"/styles/retro-vintage.svg",styleType:"visual",tags:["retro","expressive"],category:"retro",colors:{primary:"#8b4513",secondary:"#f5e6d3",accent:["#c94c4c","#2e4a3f","#d4a373"]},keywords:["复古","怀旧","老式","手工","咖啡馆","独立","文艺"],philosophy:`Retro Vintage 风格从20世纪中期的设计美学中汲取灵感，通过复古排版、做旧纹理和怀旧色调创造温暖的时光感。

核心理念：
- 时光沉淀：设计带有岁月的温度和故事
- 手工温度：避免过于数字化的冷感
- 经典永恒：使用经过时间检验的设计元素
- 文化底蕴：传达历史感和文化认同`,doList:["使用复古色调 sepia, amber, brown 系列","背景添加纸张纹理或做旧效果","使用 serif 字体或复古无衬线字体","边框使用 border-2 或 border-4 的粗边框","添加装饰性边框元素（角花、分隔线）","使用老式排版风格（大写标题、字间距）","图片添加做旧滤镜 sepia brightness-90"],dontList:["禁止使用现代渐变效果","禁止使用霓虹/高饱和度颜色","禁止使用极简/扁平的现代设计语言","禁止使用过于圆润的圆角","禁止使用玻璃态效果","禁止使用动效过多的交互"],components:{button:{name:"按钮",description:"Retro Vintage 风格的按钮",code:`// Primary Button
<button className="px-6 py-3 bg-[#8b4513] text-[#f5e6d3] border-2 border-[#5c2e0a] font-serif uppercase tracking-widest text-sm hover:bg-[#5c2e0a] transition-colors duration-200">
  Discover More
</button>

// Outlined Button
<button className="px-6 py-3 bg-transparent text-[#8b4513] border-2 border-[#8b4513] font-serif uppercase tracking-widest text-sm hover:bg-[#8b4513] hover:text-[#f5e6d3] transition-colors duration-200">
  Read Story
</button>

// Badge Style
<button className="px-8 py-4 bg-[#f5e6d3] text-[#8b4513] border-4 border-double border-[#8b4513] font-serif uppercase tracking-[0.3em] text-xs hover:bg-[#8b4513] hover:text-[#f5e6d3] transition-colors duration-300">
  Est. 1965
</button>`},card:{name:"卡片",description:"Retro Vintage 风格的卡片",code:`<div className="bg-[#f5e6d3] border-2 border-[#8b4513] p-8 relative">
  {/* Decorative corners */}
  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#8b4513]" />
  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#8b4513]" />
  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#8b4513]" />
  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#8b4513]" />

  <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#8b4513]/60">Chapter One</span>
  <h3 className="text-2xl font-serif text-[#8b4513] mt-2 mb-4">The Beginning</h3>
  <p className="text-[#8b4513]/80 leading-relaxed font-serif">
    A story that spans generations, told through craftsmanship and tradition.
  </p>
</div>`},input:{name:"输入框",description:"Retro Vintage 风格的输入框",code:`<div className="space-y-2">
  <label className="block text-xs font-serif uppercase tracking-[0.2em] text-[#8b4513]">Your Name</label>
  <input
    type="text"
    className="w-full px-4 py-3 bg-transparent border-2 border-[#8b4513] text-[#8b4513] font-serif placeholder:text-[#8b4513]/40 focus:outline-none focus:bg-[#8b4513]/5 transition-colors duration-200"
    placeholder="Enter your name..."
  />
</div>`}},globalCss:`/* Retro Vintage Global Styles */
@layer base {
  body {
    @apply bg-[#f5e6d3] text-[#8b4513] antialiased;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
  }

  h1, h2, h3, h4 {
    @apply font-serif;
  }
}

/* Decorative divider */
.retro-divider {
  @apply flex items-center gap-4;
}
.retro-divider::before,
.retro-divider::after {
  content: '';
  @apply flex-1 h-px bg-[#8b4513]/30;
}`,aiRules:`STYLE: Retro Vintage
TYPE: Nostalgic, classic design aesthetic

MUST USE:
- Vintage color palette: sepia, amber, brown tones
- Paper texture or aged effects on backgrounds
- Serif fonts or vintage sans-serif
- Thick borders: border-2 or border-4
- Decorative elements (corner ornaments, dividers)
- Old-style typography: uppercase, tracking-widest
- Image filters: sepia, brightness-90

MUST AVOID:
- Modern gradients
- Neon/high saturation colors
- Minimalist/flat modern design
- Very rounded corners
- Glass morphism effects
- Heavy animations

COLOR PALETTE:
- Primary: Saddle brown (#8b4513)
- Background: Cream/Parchment (#f5e6d3)
- Accent: Rust red (#c94c4c), Forest green (#2e4a3f)

TYPOGRAPHY:
- Headings: font-serif, uppercase option
- Labels: text-xs uppercase tracking-[0.2em]
- Body: font-serif, relaxed leading`,examplePrompts:[{title:"咖啡馆网站",titleEn:"Coffee Shop Website",description:"生成复古咖啡馆网站",descriptionEn:"Generate vintage coffee shop website",prompt:`Create a coffee shop website using Retro Vintage style:
- Hero with sepia-toned coffee imagery
- Menu section with decorative borders
- About us with vintage typography
- Contact with old-style form styling
- Paper texture backgrounds
- Ornamental corner decorations
- Serif fonts throughout`}]},{slug:"dark-mode",name:"暗黑模式",nameEn:"Dark Mode",description:"优雅的深色界面设计，低对比度层次、微妙的边框和高亮。适合开发工具、专业应用、深夜阅读模式。",cover:"/styles/dark-mode.svg",styleType:"visual",tags:["modern","minimal"],category:"modern",colors:{primary:"#3b82f6",secondary:"#0f172a",accent:["#22c55e","#f59e0b","#ef4444"]},keywords:["暗黑","深色","夜间","开发","专业","护眼"],philosophy:`Dark Mode 设计强调在深色背景上创造舒适的阅读体验和清晰的信息层次。

核心理念：
- 护眼舒适：降低屏幕亮度，减少视觉疲劳
- 层次分明：通过灰度和透明度区分层级
- 高亮聚焦：使用高亮色引导用户注意力
- 专业氛围：传达技术感和专业感`,doList:["使用深色背景 bg-slate-900, bg-gray-900, bg-[#0f172a]","卡片使用略浅的背景 bg-slate-800, bg-gray-800","边框使用低对比度 border-slate-700, border-white/10","文字使用 text-slate-100 主要, text-slate-400 次要","高亮色保持高饱和度 blue-500, green-500","悬停使用 hover:bg-slate-700 或 hover:bg-white/5","使用 rounded-lg 或 rounded-xl 圆角"],dontList:["禁止使用纯白文字 text-white（过于刺眼）","禁止使用高对比度边框","禁止使用纯黑背景 #000000（过于沉闷）","禁止在深色背景上使用深色文字","禁止高亮色使用过多","禁止阴影使用浅色"],components:{button:{name:"按钮",description:"Dark Mode 风格的按钮",code:`// Primary Button
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200 font-medium">
  Save Changes
</button>

// Secondary Button
<button className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors duration-200 font-medium">
  Cancel
</button>

// Ghost Button
<button className="px-4 py-2 text-slate-300 hover:bg-white/5 rounded-lg transition-colors duration-200 font-medium">
  Learn More
</button>

// Danger Button
<button className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors duration-200 font-medium">
  Delete
</button>`},card:{name:"卡片",description:"Dark Mode 风格的卡片",code:`<div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors duration-200">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
      <Icon className="w-5 h-5 text-blue-400" />
    </div>
    <h3 className="text-lg font-semibold text-slate-100">Feature Title</h3>
  </div>
  <p className="text-slate-400 leading-relaxed">
    Description with comfortable contrast for night reading.
  </p>
</div>`},input:{name:"输入框",description:"Dark Mode 风格的输入框",code:`<div className="space-y-1.5">
  <label className="block text-sm font-medium text-slate-300">Email</label>
  <input
    type="email"
    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
    placeholder="you@example.com"
  />
</div>`}},globalCss:`/* Dark Mode Global Styles */
@layer base {
  body {
    @apply bg-slate-900 text-slate-100 antialiased;
  }

  h1, h2, h3, h4 {
    @apply font-semibold text-slate-100;
  }

  ::selection {
    @apply bg-blue-600 text-white;
  }
}

/* Subtle glow for focus states */
.dark-focus-glow:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}`,aiRules:`STYLE: Dark Mode
TYPE: Professional dark interface design

MUST USE:
- Dark backgrounds: bg-slate-900, bg-gray-900, bg-[#0f172a]
- Card backgrounds: bg-slate-800 (one step lighter)
- Low contrast borders: border-slate-700, border-white/10
- Text hierarchy: text-slate-100 (primary), text-slate-400 (secondary)
- Saturated accent colors: blue-500, green-500
- Hover states: hover:bg-slate-700, hover:bg-white/5
- Standard rounded corners: rounded-lg, rounded-xl

MUST AVOID:
- Pure white text (too harsh)
- High contrast borders
- Pure black background (#000000)
- Dark text on dark backgrounds
- Too many highlight colors
- Light-colored shadows

COLOR HIERARCHY:
- Background: slate-900 (#0f172a)
- Surface: slate-800
- Border: slate-700 or white/10
- Text primary: slate-100
- Text secondary: slate-400
- Accent: blue-500, green-500

TYPOGRAPHY:
- Headings: font-semibold text-slate-100
- Body: text-slate-300 or text-slate-400`,examplePrompts:[{title:"开发者仪表板",titleEn:"Developer Dashboard",description:"生成暗色开发者仪表板",descriptionEn:"Generate dark mode developer dashboard",prompt:`Create a developer dashboard using Dark Mode style:
- Sidebar navigation with slate-800 background
- Main content on slate-900
- Metric cards with subtle borders
- Code blocks with syntax highlighting
- Status indicators with colored dots
- Blue accent for primary actions
- Comfortable contrast for long sessions`}]},{slug:"geometric-bold",name:"几何大胆风",nameEn:"Geometric Bold",description:"大胆的几何图形设计，强烈的形状对比、鲜明的色块、动态的构图。适合艺术展览、设计机构、创意品牌。",cover:"/styles/geometric-bold.svg",styleType:"visual",tags:["expressive","high-contrast"],category:"expressive",colors:{primary:"#000000",secondary:"#ffffff",accent:["#ff0000","#0000ff","#ffff00"]},keywords:["几何","大胆","色块","艺术","创意","设计","先锋"],philosophy:`Geometric Bold 风格受包豪斯和构成主义艺术的影响，通过简单但强烈的几何形状创造视觉冲击。

核心理念：
- 形状优先：几何形状是设计的核心语言
- 大胆对比：强烈的颜色和形状对比
- 动态平衡：通过不对称创造视觉张力
- 艺术表达：每个页面都是一件艺术品`,doList:["使用纯色色块 bg-black, bg-white, bg-red-500, bg-blue-600","使用规则几何形状 circle, square, triangle","大胆使用超大字体 text-6xl, text-8xl, text-[10rem]","使用 absolute 定位创造重叠效果","边角使用 rounded-none 或 rounded-full","使用 rotate-* 旋转元素增加动态感","黑白为主，一到两种强调色"],dontList:["禁止使用渐变色","禁止使用柔和/低对比度的颜色","禁止使用 rounded-lg 等中间值圆角","禁止使用阴影效果","禁止过多颜色（最多3-4种）","禁止对称/常规的布局"],components:{button:{name:"按钮",description:"Geometric Bold 风格的按钮",code:`// Primary Button - Square
<button className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-red-500 transition-colors duration-200">
  Explore
</button>

// Circle Button
<button className="w-24 h-24 bg-blue-600 text-white rounded-full font-bold uppercase text-xs tracking-widest hover:bg-black transition-colors duration-200">
  Click
</button>

// Outlined Button
<button className="px-8 py-4 bg-white text-black border-4 border-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-200">
  View Work
</button>`},card:{name:"卡片",description:"Geometric Bold 风格的卡片",code:`<div className="relative bg-white border-4 border-black p-8 group">
  {/* Decorative shape */}
  <div className="absolute -top-6 -right-6 w-12 h-12 bg-red-500 rotate-45 group-hover:rotate-90 transition-transform duration-300" />

  <span className="text-xs font-bold uppercase tracking-[0.3em]">01</span>
  <h3 className="text-3xl font-black uppercase mt-2 mb-4">Project Name</h3>
  <p className="text-gray-600 leading-relaxed">
    Bold geometric design with strong visual impact.
  </p>

  {/* Bottom accent */}
  <div className="absolute bottom-0 left-0 w-full h-2 bg-black" />
</div>`},input:{name:"输入框",description:"Geometric Bold 风格的输入框",code:`<div className="space-y-2">
  <label className="block text-xs font-bold uppercase tracking-[0.3em]">Email</label>
  <input
    type="email"
    className="w-full px-4 py-4 bg-white border-4 border-black text-black font-medium placeholder:text-gray-400 focus:outline-none focus:bg-yellow-300 transition-colors duration-200"
    placeholder="YOUR@EMAIL.COM"
  />
</div>`}},globalCss:`/* Geometric Bold Global Styles */
@layer base {
  body {
    @apply bg-white text-black antialiased;
  }

  h1, h2, h3 {
    @apply font-black uppercase tracking-tight;
  }

  ::selection {
    @apply bg-black text-white;
  }
}

/* Geometric shape utilities */
.shape-circle {
  @apply rounded-full;
}

.shape-square {
  @apply rounded-none aspect-square;
}`,aiRules:`STYLE: Geometric Bold
TYPE: Bold artistic design with strong shapes

MUST USE:
- Solid color blocks: bg-black, bg-white, bg-red-500, bg-blue-600
- Regular geometric shapes: circles, squares, triangles
- Large typography: text-6xl, text-8xl, text-[10rem]
- Absolute positioning for overlapping elements
- Corners: rounded-none OR rounded-full only
- Rotation for dynamics: rotate-12, rotate-45
- Limited palette: black, white + 1-2 accent colors

MUST AVOID:
- Gradients
- Soft/low contrast colors
- Medium border-radius (rounded-lg)
- Shadows
- Too many colors (max 3-4)
- Symmetrical/conventional layouts

COLOR RULES:
- Base: Black and White
- Accents: Primary colors (red, blue, yellow)
- Maximum 3-4 colors per design

TYPOGRAPHY:
- Headings: font-black uppercase
- Labels: text-xs tracking-[0.3em]
- Numbers: Often used as design elements`,examplePrompts:[{title:"设计作品集",titleEn:"Design Agency Portfolio",description:"生成几何风设计机构作品集",descriptionEn:"Generate geometric design agency portfolio",prompt:`Create a design agency portfolio using Geometric Bold style:
- Full-bleed hero with oversized typography
- Project grid with overlapping shapes
- About section with bold number accents
- Contact with geometric form fields
- Black/white base with red/blue accents
- Rotating/offset decorative shapes
- No shadows, no gradients`}]},{slug:"masonry-flow",name:"瀑布流布局",nameEn:"Masonry Flow",description:"Pinterest 风格的不等高卡片瀑布流布局，通过 CSS columns 或 masonry grid 实现自然流动的视觉效果，适合图片展示、作品集、社交媒体。",cover:"/styles/masonry-flow.svg",styleType:"layout",tags:["modern","responsive"],compatibleWith:["glassmorphism","minimalist-flat","soft-ui","natural-organic","editorial"],category:"modern",colors:{primary:"#1a1a2e",secondary:"#f5f5f5",accent:["#e94560","#16c79a","#ffd460","#7579e7"]},keywords:["瀑布流","Pinterest","不等高","图片墙","作品集","gallery"],philosophy:`Masonry Flow（瀑布流布局）是一种模仿砖墙砌筑方式的布局，卡片按列排列，高度不一，形成自然流动的视觉效果。

核心理念：
- 自然流动：内容高度由内容本身决定，无需强制等高
- 空间利用：最大化利用可视区域，减少留白浪费
- 视觉节奏：不规则高度创造有趣的视觉韵律
- 无限滚动：天然适合加载更多内容的交互模式`,doList:["使用 CSS columns 实现简单瀑布流 columns-2 md:columns-3 lg:columns-4","或使用 CSS Grid masonry（需浏览器支持）grid-rows-[masonry]","卡片添加 break-inside-avoid 防止内容断裂","统一卡片宽度，高度自适应内容","保持列间距一致 gap-4 或 gap-6","添加加载动画和懒加载图片","响应式调整列数 columns-1 sm:columns-2 lg:columns-3"],dontList:["禁止强制所有卡片等高（失去瀑布流特色）","禁止卡片宽度不一致","禁止间距不统一","禁止忽略图片加载状态","禁止在小屏幕使用过多列数"],components:{button:{name:"按钮",description:"瀑布流风格的简洁按钮",code:`<button className="
  px-5 py-2.5
  bg-zinc-900 text-white
  rounded-lg
  font-medium text-sm
  hover:bg-zinc-700
  transition-colors
">
  Load More
</button>`},card:{name:"瀑布流卡片",description:"自适应高度的瀑布流卡片",code:`<div className="
  break-inside-avoid
  mb-4
  bg-white
  rounded-xl
  overflow-hidden
  shadow-sm
  hover:shadow-lg
  transition-shadow
  group
">
  <div className="relative overflow-hidden">
    <img
      src="/placeholder.jpg"
      alt="Card image"
      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
    />
  </div>
  <div className="p-4">
    <h3 className="font-semibold text-zinc-900 mb-1">
      Card Title
    </h3>
    <p className="text-zinc-500 text-sm">
      Description text that can be any length
    </p>
  </div>
</div>`},input:{name:"搜索框",description:"瀑布流顶部的搜索框",code:`<div className="relative">
  <input
    type="text"
    placeholder="Search..."
    className="
      w-full pl-10 pr-4 py-3
      bg-zinc-100
      border-0
      rounded-full
      text-zinc-900 placeholder-zinc-400
      focus:outline-none focus:ring-2 focus:ring-zinc-900/10
      transition-all
    "
  />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
</div>`},nav:{name:"筛选导航",description:"瀑布流上方的分类筛选",code:`<nav className="flex items-center gap-2 overflow-x-auto pb-4">
  <button className="px-4 py-2 bg-zinc-900 text-white rounded-full text-sm font-medium whitespace-nowrap">
    All
  </button>
  <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap">
    Photos
  </button>
  <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap">
    Illustrations
  </button>
  <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap">
    Videos
  </button>
</nav>`},hero:{name:"瀑布流画廊",description:"完整的瀑布流布局展示",code:`<section className="py-8 px-4">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-zinc-900 mb-4">Gallery</h1>
      <nav className="flex items-center gap-2 overflow-x-auto">
        <button className="px-4 py-2 bg-zinc-900 text-white rounded-full text-sm font-medium">All</button>
        <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium">Photos</button>
        <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium">Design</button>
      </nav>
    </div>

    {/* Masonry Grid */}
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
      {/* Card 1 - Tall */}
      <div className="break-inside-avoid mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-pink-400 to-purple-500 aspect-[3/4]">
        <div className="p-6 h-full flex flex-col justify-end text-white">
          <h3 className="font-bold text-lg">Featured Work</h3>
          <p className="text-white/80 text-sm">Creative direction</p>
        </div>
      </div>

      {/* Card 2 - Short */}
      <div className="break-inside-avoid mb-4 rounded-xl overflow-hidden bg-zinc-100 aspect-square">
        <div className="p-4 h-full flex items-center justify-center">
          <span className="text-4xl">01</span>
        </div>
      </div>

      {/* Card 3 - Medium */}
      <div className="break-inside-avoid mb-4 rounded-xl overflow-hidden bg-amber-100 aspect-[4/5]">
        <div className="p-6">
          <h3 className="font-semibold mb-2">Project Name</h3>
          <p className="text-zinc-600 text-sm">Brief description of the project</p>
        </div>
      </div>

      {/* Card 4 - Tall */}
      <div className="break-inside-avoid mb-4 rounded-xl overflow-hidden bg-emerald-500 aspect-[3/5]">
        <div className="p-6 text-white">
          <span className="text-sm uppercase tracking-wider">New</span>
        </div>
      </div>

      {/* More cards... */}
    </div>

    {/* Load More */}
    <div className="mt-8 text-center">
      <button className="px-8 py-3 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-700 transition-colors">
        Load More
      </button>
    </div>
  </div>
</section>`}},globalCss:`/* Masonry Flow Global Styles */

/* CSS Columns based masonry */
.masonry-grid {
  columns: 1;
  column-gap: 1rem;
}

@media (min-width: 640px) {
  .masonry-grid {
    columns: 2;
  }
}

@media (min-width: 1024px) {
  .masonry-grid {
    columns: 3;
  }
}

@media (min-width: 1280px) {
  .masonry-grid {
    columns: 4;
  }
}

/* Prevent card breaking */
.masonry-item {
  break-inside: avoid;
  margin-bottom: 1rem;
}

/* Card hover effects */
.masonry-item {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.masonry-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

/* Image loading placeholder */
.masonry-item img {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Loaded state */
.masonry-item img.loaded {
  background: none;
  animation: none;
}`,aiRules:`You are a frontend expert specializing in Masonry Flow layout. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Do NOT make all cards the same height (defeats masonry purpose)
- Do NOT use inconsistent card widths
- Do NOT use inconsistent gaps
- Do NOT ignore image loading states
- Do NOT use too many columns on mobile

## Must Follow

- Use CSS columns: columns-2 md:columns-3 lg:columns-4
- Prevent break: break-inside-avoid on cards
- Consistent gap: gap-4 or column-gap equivalent
- Card widths: 100% of column
- Card heights: auto (content-driven)
- Responsive columns: reduce on smaller screens

## Layout Structure

Container:
- columns-1 sm:columns-2 lg:columns-3 xl:columns-4
- gap-4 (use column-gap and margin-bottom)

Card:
- break-inside-avoid
- mb-4 (margin bottom for spacing)
- rounded-xl overflow-hidden
- Full width within column

## Image Handling

- Always use aspect-ratio or height constraints
- Add loading="lazy" for performance
- Show placeholder during load
- Use object-cover for consistent fit

## Responsive

Mobile (< 640px): columns-1
Tablet (640px - 1024px): columns-2
Desktop (1024px+): columns-3 or columns-4

## Self-Check

After generating code, verify:
1. Cards have varying heights
2. Using break-inside-avoid
3. Consistent gaps
4. Images have aspect ratios
5. Responsive column count`,examplePrompts:[{title:"图片画廊",titleEn:"Photo Gallery",description:"Pinterest 风格的图片瀑布流",descriptionEn:"Pinterest-style photo masonry gallery",prompt:`Create a Pinterest-style photo gallery with masonry layout:
1. Use CSS columns for masonry: columns-2 md:columns-3 lg:columns-4
2. Cards with varying heights (aspect-[3/4], aspect-square, aspect-[4/5])
3. Each card: rounded-xl, overflow-hidden, shadow on hover
4. Image with lazy loading and hover scale effect
5. Optional overlay with title on hover
6. Filter tabs at top (All, Photos, Videos, etc.)
7. Load more button at bottom
All cards use break-inside-avoid, consistent gap-4`},{title:"作品集展示",titleEn:"Portfolio Showcase",description:"设计师作品集的瀑布流布局",descriptionEn:"Designer portfolio masonry layout",prompt:`Create a designer portfolio with masonry flow:
1. Masonry grid with columns-1 md:columns-2 lg:columns-3
2. Project cards with different aspect ratios
3. Each card shows: project image, title, category tag
4. Hover effect: reveal project description
5. Mix of image cards and text-only cards
6. Category filter navigation
7. Smooth scroll to load more projects
Cards use break-inside-avoid, rounded-2xl, elegant shadows`},{title:"社交动态墙",titleEn:"Social Feed Wall",description:"社交媒体风格的内容流",descriptionEn:"Social media style content feed",prompt:`Create a social media feed with masonry layout:
1. Masonry columns: columns-1 sm:columns-2 lg:columns-3
2. Mixed content cards: text posts, images, quotes, links
3. Each card has: avatar, username, timestamp, content, reactions
4. Image posts have varying aspect ratios
5. Text posts auto-height based on content
6. Hover to show action buttons (like, comment, share)
7. Infinite scroll loading indicator
Use break-inside-avoid, rounded-xl cards, subtle shadows`}]},{slug:"split-screen",name:"分屏布局",nameEn:"Split Screen",description:"左右对称或不对称的分屏布局，通过对比和平衡创造视觉张力，常用于产品展示、品牌故事、比较页面。",cover:"/styles/split-screen.svg",styleType:"layout",tags:["modern","responsive"],compatibleWith:["neo-brutalist","minimalist-flat","editorial","modern-gradient","geometric-bold"],category:"modern",colors:{primary:"#0f0f0f",secondary:"#ffffff",accent:["#ff4757","#2ed573","#1e90ff","#ffa502"]},keywords:["分屏","对比","左右布局","对称","品牌","展示"],philosophy:`Split Screen（分屏布局）是一种将视口分为两个或多个区域的布局方式，通过对比创造视觉张力和叙事效果。

核心理念：
- 对比强调：通过左右对比突出差异或联系
- 视觉平衡：即使不对称也保持视觉重量平衡
- 叙事引导：引导用户视线在两侧之间流动
- 空间利用：充分利用宽屏显示器的优势`,doList:["使用 CSS Grid 或 Flexbox 实现分屏 grid grid-cols-2","大屏幕保持分屏，小屏幕堆叠 lg:grid-cols-2 grid-cols-1","使用对比色或互补内容","一侧视觉元素，一侧文字内容","保持两侧视觉重量平衡","添加过渡动画增强体验","考虑分屏滚动锁定效果"],dontList:["禁止两侧内容完全相同（无意义分屏）","禁止移动端仍保持分屏（太窄）","禁止两侧视觉重量严重失衡","禁止忽略内容阅读顺序","禁止分割线过于突兀"],components:{button:{name:"按钮",description:"分屏布局中的对比按钮",code:`<div className="flex gap-4">
  <button className="
    px-8 py-4
    bg-black text-white
    font-semibold
    hover:bg-zinc-800
    transition-colors
  ">
    Left Option
  </button>
  <button className="
    px-8 py-4
    bg-white text-black
    border-2 border-black
    font-semibold
    hover:bg-zinc-100
    transition-colors
  ">
    Right Option
  </button>
</div>`},card:{name:"分屏面板",description:"分屏布局中的内容面板",code:`<div className="
  h-full
  p-8 lg:p-16
  flex flex-col justify-center
">
  <span className="text-sm uppercase tracking-widest text-zinc-500 mb-4">
    Category
  </span>
  <h2 className="text-4xl lg:text-5xl font-bold mb-6">
    Panel Title
  </h2>
  <p className="text-lg text-zinc-600 mb-8 max-w-md">
    Detailed description text that explains the content of this panel section.
  </p>
  <button className="self-start px-8 py-4 bg-black text-white font-semibold">
    Learn More
  </button>
</div>`},input:{name:"输入框",description:"分屏表单中的输入框",code:`<input
  type="email"
  placeholder="Enter your email"
  className="
    w-full px-6 py-4
    bg-transparent
    border-b-2 border-zinc-300
    text-lg
    placeholder-zinc-400
    focus:outline-none focus:border-black
    transition-colors
  "
/>`},nav:{name:"分屏导航",description:"跨越分屏的固定导航",code:`<nav className="
  fixed top-0 left-0 right-0 z-50
  px-8 py-6
  flex items-center justify-between
  mix-blend-difference
">
  <a href="/" className="text-white text-xl font-bold">
    Logo
  </a>
  <div className="flex items-center gap-8">
    <a href="#" className="text-white hover:opacity-70 transition-opacity">About</a>
    <a href="#" className="text-white hover:opacity-70 transition-opacity">Work</a>
    <a href="#" className="text-white hover:opacity-70 transition-opacity">Contact</a>
  </div>
</nav>`},hero:{name:"分屏英雄区",description:"完整的分屏布局展示",code:`<section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
  {/* Left Panel - Visual */}
  <div className="
    relative
    bg-black
    min-h-[50vh] lg:min-h-screen
    flex items-center justify-center
    overflow-hidden
  ">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-80" />
    <div className="relative z-10 text-center text-white p-8">
      <span className="text-8xl font-bold">01</span>
    </div>
  </div>

  {/* Right Panel - Content */}
  <div className="
    bg-white
    min-h-[50vh] lg:min-h-screen
    flex items-center
    p-8 lg:p-16
  ">
    <div className="max-w-lg">
      <span className="text-sm uppercase tracking-widest text-zinc-400 mb-4 block">
        Featured Project
      </span>
      <h1 className="text-4xl lg:text-6xl font-bold text-zinc-900 mb-6">
        Split Screen Layout
      </h1>
      <p className="text-xl text-zinc-600 mb-8">
        A powerful layout technique that divides the viewport into two contrasting sections, creating visual tension and narrative flow.
      </p>
      <div className="flex gap-4">
        <button className="px-8 py-4 bg-black text-white font-semibold hover:bg-zinc-800 transition-colors">
          View Project
        </button>
        <button className="px-8 py-4 border-2 border-black text-black font-semibold hover:bg-zinc-100 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  </div>
</section>`}},globalCss:`/* Split Screen Global Styles */

/* Base split container */
.split-screen {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
}

@media (min-width: 1024px) {
  .split-screen {
    grid-template-columns: 1fr 1fr;
  }
}

/* Ratio variants */
.split-screen-60-40 {
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .split-screen-60-40 {
    grid-template-columns: 60fr 40fr;
  }
}

.split-screen-40-60 {
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .split-screen-40-60 {
    grid-template-columns: 40fr 60fr;
  }
}

/* Panel styles */
.split-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
}

@media (min-width: 1024px) {
  .split-panel {
    padding: 4rem;
  }
}

/* Sticky scroll effect */
.split-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
}

/* Diagonal split */
.split-diagonal {
  clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
}

@media (min-width: 1024px) {
  .split-diagonal {
    clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
  }
}

/* Hover reveal effect */
.split-hover-left:hover ~ .split-hover-right {
  flex: 0.3;
}

.split-hover-right:hover {
  flex: 0.7;
}

.split-hover-left, .split-hover-right {
  flex: 0.5;
  transition: flex 0.5s ease;
}`,aiRules:`You are a frontend expert specializing in Split Screen layout. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Do NOT keep split layout on mobile (too narrow)
- Do NOT have identical content on both sides
- Do NOT create visual imbalance between panels
- Do NOT ignore content reading order
- Do NOT use harsh divider lines

## Must Follow

- Use CSS Grid: grid grid-cols-1 lg:grid-cols-2
- Mobile: stack vertically (grid-cols-1)
- Desktop: side by side (lg:grid-cols-2)
- Each panel: min-h-[50vh] on mobile, min-h-screen on desktop
- Balance visual weight between panels
- One side visual, one side content

## Layout Patterns

50/50 Split:
- grid-cols-1 lg:grid-cols-2
- Both panels equal width

60/40 Split:
- grid-cols-1 lg:grid-cols-[60fr_40fr]
- Emphasize one side

Sticky Split:
- One panel sticky (position: sticky, top: 0)
- Other panel scrolls

## Panel Content

Visual Panel:
- Full background image/color/video
- Minimal text overlay
- Center-aligned content

Content Panel:
- Ample padding (p-8 lg:p-16)
- Left-aligned text
- Clear hierarchy

## Responsive

Mobile: Stack vertically, visual panel first
Tablet: May start splitting at md:
Desktop: Full split with proper ratios

## Self-Check

After generating code, verify:
1. Mobile layout stacks properly
2. Panels have contrasting content
3. Visual balance maintained
4. Reading order makes sense
5. Transitions are smooth`,examplePrompts:[{title:"品牌展示页",titleEn:"Brand Showcase",description:"左侧视觉，右侧品牌故事",descriptionEn:"Visual on left, brand story on right",prompt:`Create a brand showcase page with split screen:
1. Left panel: Full-height gradient background with large brand logo
2. Right panel: Brand story with heading, paragraphs, and CTA
3. Mobile: Stack with visual panel first
4. Desktop: 50/50 split with min-h-screen
5. Navigation fixed at top with mix-blend-difference
6. Smooth scroll to next section
Use grid grid-cols-1 lg:grid-cols-2, contrasting colors`},{title:"产品对比页",titleEn:"Product Comparison",description:"两种产品或方案的对比展示",descriptionEn:"Comparison of two products or options",prompt:`Create a product comparison split screen:
1. Left panel: Product A with dark background, white text
2. Right panel: Product B with light background, dark text
3. Each side: product image, features list, price, CTA
4. Hover effect: hovered side expands slightly
5. Mobile: Stack with A on top
6. Center divider with "VS" badge
Use contrasting colors, balanced visual weight`},{title:"作品集项目页",titleEn:"Portfolio Project",description:"左侧项目图片，右侧项目详情",descriptionEn:"Project image on left, details on right",prompt:`Create a portfolio project page with split screen:
1. Left panel: Sticky full-height project image gallery
2. Right panel: Scrollable project details
3. Right content: title, description, tech stack, links
4. Image gallery with navigation dots
5. Mobile: Image at top, details below
6. Previous/Next project navigation at bottom
Use sticky positioning for image, smooth scroll for details`}]},{slug:"full-page-scroll",name:"全屏滚动布局",nameEn:"Full Page Scroll",description:"每一屏占满整个视口的沉浸式滚动体验，通过滚动切换完整场景，适合品牌故事、产品介绍、作品集展示。",cover:"/styles/full-page-scroll.svg",styleType:"layout",tags:["modern","expressive"],compatibleWith:["glassmorphism","modern-gradient","cyberpunk-neon","minimalist-flat","geometric-bold"],category:"expressive",colors:{primary:"#000000",secondary:"#ffffff",accent:["#6366f1","#ec4899","#14b8a6","#f59e0b"]},keywords:["全屏","滚动","沉浸式","场景","品牌","故事"],philosophy:`Full Page Scroll（全屏滚动布局）是一种将每个内容区块扩展到整个视口的布局方式，创造电影般的叙事体验。

核心理念：
- 沉浸体验：每一屏都是完整的视觉场景
- 叙事节奏：滚动即翻页，控制信息节奏
- 焦点集中：一次只展示一个核心信息
- 记忆深刻：场景化展示更易被记住`,doList:["每个 section 设置 min-h-screen 或 h-screen","使用 scroll-snap 实现平滑吸附 scroll-snap-type: y mandatory","每屏内容垂直水平居中 flex items-center justify-center","添加滚动指示器和页面导航点","使用 CSS scroll-behavior: smooth","考虑添加进入/离开动画","提供跳过或快速导航选项"],dontList:["禁止内容超出单屏视口（需要滚动才能看完）","禁止没有滚动提示（用户可能不知道往下滚）","禁止动画过于复杂导致性能问题","禁止锁定滚动时间过长","禁止忽略移动端体验"],components:{button:{name:"滚动提示按钮",description:"引导用户滚动的按钮",code:`<button className="
  absolute bottom-8 left-1/2 -translate-x-1/2
  flex flex-col items-center gap-2
  text-white/70 hover:text-white
  transition-colors
  animate-bounce
">
  <span className="text-sm uppercase tracking-widest">Scroll</span>
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
</button>`},card:{name:"全屏内容卡片",description:"单屏展示的内容容器",code:`<section className="
  min-h-screen
  snap-start
  flex items-center justify-center
  p-8
  bg-gradient-to-br from-indigo-600 to-purple-700
">
  <div className="max-w-4xl text-center text-white">
    <span className="text-sm uppercase tracking-widest opacity-70 mb-4 block">
      Chapter 01
    </span>
    <h2 className="text-5xl lg:text-7xl font-bold mb-6">
      Section Title
    </h2>
    <p className="text-xl lg:text-2xl opacity-80 max-w-2xl mx-auto">
      This is a full-screen section that captures the entire viewport, creating an immersive experience.
    </p>
  </div>
</section>`},input:{name:"联系表单",description:"全屏联系页面的表单",code:`<form className="w-full max-w-md space-y-6">
  <div>
    <input
      type="text"
      placeholder="Your Name"
      className="
        w-full px-0 py-4
        bg-transparent
        border-b border-white/30
        text-white text-lg
        placeholder-white/50
        focus:outline-none focus:border-white
        transition-colors
      "
    />
  </div>
  <div>
    <input
      type="email"
      placeholder="Your Email"
      className="
        w-full px-0 py-4
        bg-transparent
        border-b border-white/30
        text-white text-lg
        placeholder-white/50
        focus:outline-none focus:border-white
        transition-colors
      "
    />
  </div>
  <button className="
    w-full py-4 mt-8
    bg-white text-black
    font-semibold
    hover:bg-white/90
    transition-colors
  ">
    Send Message
  </button>
</form>`},nav:{name:"页面导航点",description:"固定在侧边的页面指示器",code:`<nav className="
  fixed right-8 top-1/2 -translate-y-1/2 z-50
  flex flex-col gap-3
">
  <a href="#section-1" className="w-3 h-3 rounded-full bg-white opacity-100 transition-opacity" aria-label="Section 1" />
  <a href="#section-2" className="w-3 h-3 rounded-full bg-white opacity-30 hover:opacity-60 transition-opacity" aria-label="Section 2" />
  <a href="#section-3" className="w-3 h-3 rounded-full bg-white opacity-30 hover:opacity-60 transition-opacity" aria-label="Section 3" />
  <a href="#section-4" className="w-3 h-3 rounded-full bg-white opacity-30 hover:opacity-60 transition-opacity" aria-label="Section 4" />
</nav>`},hero:{name:"全屏滚动页面",description:"完整的全屏滚动布局",code:`<main className="
  h-screen overflow-y-auto
  snap-y snap-mandatory
  scroll-smooth
">
  {/* Section 1 - Hero */}
  <section id="section-1" className="
    min-h-screen snap-start
    flex items-center justify-center
    bg-black text-white
    relative
  ">
    <div className="text-center">
      <h1 className="text-6xl lg:text-8xl font-bold mb-4">Welcome</h1>
      <p className="text-xl opacity-70">Scroll to explore</p>
    </div>
    <button className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </button>
  </section>

  {/* Section 2 - Feature */}
  <section id="section-2" className="
    min-h-screen snap-start
    flex items-center justify-center
    bg-gradient-to-br from-purple-600 to-pink-600 text-white
  ">
    <div className="max-w-4xl text-center px-8">
      <span className="text-sm uppercase tracking-widest opacity-70 mb-4 block">01</span>
      <h2 className="text-5xl lg:text-7xl font-bold mb-6">First Feature</h2>
      <p className="text-xl opacity-80">A compelling description of your first key feature.</p>
    </div>
  </section>

  {/* Section 3 - Feature */}
  <section id="section-3" className="
    min-h-screen snap-start
    flex items-center justify-center
    bg-gradient-to-br from-cyan-600 to-blue-600 text-white
  ">
    <div className="max-w-4xl text-center px-8">
      <span className="text-sm uppercase tracking-widest opacity-70 mb-4 block">02</span>
      <h2 className="text-5xl lg:text-7xl font-bold mb-6">Second Feature</h2>
      <p className="text-xl opacity-80">Another impressive feature description here.</p>
    </div>
  </section>

  {/* Section 4 - CTA */}
  <section id="section-4" className="
    min-h-screen snap-start
    flex items-center justify-center
    bg-zinc-900 text-white
  ">
    <div className="text-center px-8">
      <h2 className="text-5xl lg:text-6xl font-bold mb-8">Ready to Start?</h2>
      <button className="px-12 py-5 bg-white text-black font-semibold text-lg hover:bg-zinc-200 transition-colors">
        Get Started
      </button>
    </div>
  </section>

  {/* Navigation dots */}
  <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
    <a href="#section-1" className="w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-colors" />
    <a href="#section-2" className="w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-colors" />
    <a href="#section-3" className="w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-colors" />
    <a href="#section-4" className="w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-colors" />
  </nav>
</main>`}},globalCss:`/* Full Page Scroll Global Styles */

/* Main container with snap scroll */
.fullpage-container {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

/* Each section */
.fullpage-section {
  min-height: 100vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Scroll indicator animation */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(10px) translateX(-50%);
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
}

/* Navigation dots */
.fullpage-nav {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.fullpage-nav-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: background 0.3s, transform 0.3s;
}

.fullpage-nav-dot:hover,
.fullpage-nav-dot.active {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.2);
}

/* Section entrance animations */
.fullpage-section [data-animate] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fullpage-section.in-view [data-animate] {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger children animations */
.fullpage-section.in-view [data-animate]:nth-child(1) { transition-delay: 0.1s; }
.fullpage-section.in-view [data-animate]:nth-child(2) { transition-delay: 0.2s; }
.fullpage-section.in-view [data-animate]:nth-child(3) { transition-delay: 0.3s; }
.fullpage-section.in-view [data-animate]:nth-child(4) { transition-delay: 0.4s; }`,aiRules:`You are a frontend expert specializing in Full Page Scroll layout. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Do NOT let content overflow beyond viewport height
- Do NOT omit scroll indicators
- Do NOT use heavy animations that hurt performance
- Do NOT lock scroll for too long
- Do NOT ignore mobile experience

## Must Follow

- Container: h-screen overflow-y-auto scroll-snap-type: y mandatory
- Sections: min-h-screen snap-start
- Content: centered with flex items-center justify-center
- Navigation: fixed dots on side
- Scroll indicator: at bottom of first section
- Smooth scrolling: scroll-behavior: smooth

## Section Structure

Each section:
- min-h-screen (full viewport height)
- snap-start (snap to section start)
- Content centered both ways
- Distinct background color/gradient
- Number indicator (01, 02, etc.)

## Navigation

Side dots:
- Fixed position on right side
- Vertical center aligned
- Click to scroll to section
- Active state indication

Scroll indicator:
- Bottom of first section
- Animated (bounce)
- Arrow down icon

## Responsive

Mobile:
- Same full-screen sections
- Navigation dots may hide or move
- Touch scroll friendly

Desktop:
- Full experience with all elements
- Keyboard navigation support

## Self-Check

After generating code, verify:
1. All sections are exactly viewport height
2. Scroll snapping works correctly
3. Navigation dots present
4. Scroll indicator visible
5. Content doesn't overflow`,examplePrompts:[{title:"品牌故事页",titleEn:"Brand Story Page",description:"讲述品牌历史的全屏滚动",descriptionEn:"Full page scroll for brand history",prompt:`Create a brand story page with full page scroll:
1. Container with scroll-snap-type: y mandatory
2. 5 sections, each min-h-screen with different gradient backgrounds
3. Section 1: Hero with brand name and tagline
4. Sections 2-4: Timeline moments with year, title, description
5. Section 5: CTA to explore more
6. Fixed navigation dots on right side
7. Scroll indicator on first section
Content centered, smooth transitions between sections`},{title:"产品特性展示",titleEn:"Product Features",description:"一屏一特性的产品介绍",descriptionEn:"One feature per screen product intro",prompt:`Create a product features page with full page scroll:
1. 4 full-screen sections with scroll snap
2. Each section: feature icon, headline, description, visual
3. Alternating dark/light backgrounds
4. Section entrance animations (fade up)
5. Progress indicator showing current section
6. Final section with pricing CTA
7. Skip button to jump to end
Use bold typography, centered content`},{title:"作品集展示",titleEn:"Portfolio Showcase",description:"每个项目一屏的作品集",descriptionEn:"One project per screen portfolio",prompt:`Create a portfolio showcase with full page scroll:
1. Hero section with name and role
2. Each project in full-screen section
3. Project sections: large image, title, description, link
4. Different color schemes per project
5. Navigation dots with project names on hover
6. Final section with contact form
7. Smooth scroll between sections
Use dramatic visuals, minimal text`}]},{slug:"timeline-vertical",name:"垂直时间线布局",nameEn:"Vertical Timeline",description:"垂直时间轴布局，通过连接线串联时间节点，适合展示历史进程、项目里程碑、工作经历、流程步骤。",cover:"/styles/timeline-vertical.svg",styleType:"layout",tags:["modern","minimal"],compatibleWith:["editorial","corporate-clean","minimalist-flat","soft-ui","natural-organic"],category:"minimal",colors:{primary:"#1e293b",secondary:"#f8fafc",accent:["#3b82f6","#10b981","#f59e0b","#ef4444"]},keywords:["时间线","历程","里程碑","流程","步骤","进度"],philosophy:`Vertical Timeline（垂直时间线布局）是一种用于展示时间序列或流程步骤的布局方式，通过视觉连接线引导阅读。

核心理念：
- 线性叙事：清晰的时间或流程顺序
- 节点突出：每个重要时刻都有明确标记
- 连接关系：视觉线条串联所有事件
- 渐进展示：支持滚动触发动画`,doList:["使用伪元素或 div 创建中央连接线","节点圆点与连接线对齐","左右交替布局增加视觉变化","移动端改为单侧布局","添加滚动触发的入场动画","节点使用统一的时间/序号格式","连接线使用柔和颜色不喧宾夺主"],dontList:["禁止连接线断裂或不对齐","禁止节点大小不一致","禁止移动端保持双侧布局","禁止忽略时间/序号标识","禁止内容过长导致连接线过长"],components:{button:{name:"时间线按钮",description:"时间线节点中的操作按钮",code:`<button className="
  inline-flex items-center gap-2
  px-4 py-2
  text-sm font-medium
  text-blue-600
  hover:text-blue-700
  transition-colors
">
  <span>View Details</span>
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</button>`},card:{name:"时间线节点卡片",description:"时间线中的事件卡片",code:`<div className="
  relative
  p-6
  bg-white
  rounded-xl
  shadow-sm
  border border-zinc-100
  hover:shadow-md
  transition-shadow
">
  {/* Connector dot */}
  <div className="
    absolute top-8 -left-[41px]
    w-4 h-4
    bg-blue-500
    rounded-full
    border-4 border-white
    shadow
  " />

  {/* Date */}
  <time className="text-sm text-zinc-400 mb-2 block">
    January 2024
  </time>

  {/* Title */}
  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
    Milestone Title
  </h3>

  {/* Description */}
  <p className="text-zinc-600 text-sm">
    Brief description of what happened at this point in the timeline.
  </p>
</div>`},input:{name:"时间筛选器",description:"按时间范围筛选的输入",code:`<div className="flex items-center gap-4">
  <div className="flex-1">
    <label className="text-sm text-zinc-500 mb-1 block">From</label>
    <input
      type="date"
      className="
        w-full px-3 py-2
        border border-zinc-200
        rounded-lg
        text-zinc-900
        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
      "
    />
  </div>
  <div className="flex-1">
    <label className="text-sm text-zinc-500 mb-1 block">To</label>
    <input
      type="date"
      className="
        w-full px-3 py-2
        border border-zinc-200
        rounded-lg
        text-zinc-900
        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
      "
    />
  </div>
</div>`},nav:{name:"时间线导航",description:"年份或阶段快速跳转",code:`<nav className="flex items-center gap-2 overflow-x-auto pb-4">
  <button className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium whitespace-nowrap">
    2024
  </button>
  <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap">
    2023
  </button>
  <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap">
    2022
  </button>
  <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap">
    2021
  </button>
</nav>`},hero:{name:"垂直时间线",description:"完整的时间线布局",code:`<section className="py-16 px-4">
  <div className="max-w-3xl mx-auto">
    {/* Header */}
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-zinc-900 mb-4">Our Journey</h2>
      <p className="text-zinc-600">Key milestones in our company history</p>
    </div>

    {/* Timeline */}
    <div className="relative">
      {/* Central line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-zinc-200" />

      {/* Timeline items */}
      <div className="space-y-8">
        {/* Item 1 */}
        <div className="relative pl-16">
          <div className="absolute left-6 top-2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow" />
          <div className="p-6 bg-white rounded-xl shadow-sm border border-zinc-100">
            <time className="text-sm text-blue-500 font-medium mb-2 block">2024</time>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Series B Funding</h3>
            <p className="text-zinc-600 text-sm">Raised $50M to expand globally.</p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="relative pl-16">
          <div className="absolute left-6 top-2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow" />
          <div className="p-6 bg-white rounded-xl shadow-sm border border-zinc-100">
            <time className="text-sm text-emerald-500 font-medium mb-2 block">2023</time>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">1 Million Users</h3>
            <p className="text-zinc-600 text-sm">Reached our first million active users.</p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="relative pl-16">
          <div className="absolute left-6 top-2 w-4 h-4 bg-amber-500 rounded-full border-4 border-white shadow" />
          <div className="p-6 bg-white rounded-xl shadow-sm border border-zinc-100">
            <time className="text-sm text-amber-500 font-medium mb-2 block">2022</time>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Product Launch</h3>
            <p className="text-zinc-600 text-sm">Launched our flagship product to market.</p>
          </div>
        </div>

        {/* Item 4 */}
        <div className="relative pl-16">
          <div className="absolute left-6 top-2 w-4 h-4 bg-zinc-400 rounded-full border-4 border-white shadow" />
          <div className="p-6 bg-white rounded-xl shadow-sm border border-zinc-100">
            <time className="text-sm text-zinc-500 font-medium mb-2 block">2021</time>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Company Founded</h3>
            <p className="text-zinc-600 text-sm">Started with a team of 3 in a small office.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`}},globalCss:`/* Vertical Timeline Global Styles */

/* Timeline container */
.timeline {
  position: relative;
  padding-left: 2rem;
}

/* Central line */
.timeline::before {
  content: '';
  position: absolute;
  left: 0.5rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e2e8f0;
}

/* Timeline item */
.timeline-item {
  position: relative;
  padding-left: 2rem;
  padding-bottom: 2rem;
}

/* Node dot */
.timeline-item::before {
  content: '';
  position: absolute;
  left: -0.5rem;
  top: 0.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #3b82f6;
  border: 4px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Alternating layout for desktop */
@media (min-width: 768px) {
  .timeline-alternating {
    padding-left: 0;
  }

  .timeline-alternating::before {
    left: 50%;
    transform: translateX(-50%);
  }

  .timeline-alternating .timeline-item {
    width: 50%;
    padding-left: 0;
    padding-right: 2rem;
  }

  .timeline-alternating .timeline-item:nth-child(even) {
    margin-left: 50%;
    padding-left: 2rem;
    padding-right: 0;
  }

  .timeline-alternating .timeline-item::before {
    left: auto;
    right: -0.5rem;
  }

  .timeline-alternating .timeline-item:nth-child(even)::before {
    left: -0.5rem;
    right: auto;
  }
}

/* Scroll animation */
.timeline-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.timeline-item.in-view {
  opacity: 1;
  transform: translateY(0);
}

/* Node color variants */
.timeline-item[data-status="complete"]::before {
  background: #10b981;
}

.timeline-item[data-status="current"]::before {
  background: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

.timeline-item[data-status="upcoming"]::before {
  background: #d1d5db;
}`,aiRules:`You are a frontend expert specializing in Vertical Timeline layout. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Do NOT break the connecting line
- Do NOT use inconsistent node sizes
- Do NOT keep alternating layout on mobile
- Do NOT omit time/date labels
- Do NOT make content too long per node

## Must Follow

- Central line: absolute positioned pseudo-element or div
- Node dots: aligned with center line
- Mobile: single-side layout (all items on right)
- Desktop: can alternate left/right
- Consistent spacing between nodes
- Clear time/date indicators

## Structure

Container:
- relative positioning
- padding-left for line space (mobile)
- centered line (desktop alternating)

Central Line:
- Pseudo-element or div
- Absolute positioned
- 2px width, subtle color

Node:
- Circular dot (w-4 h-4)
- Aligned with line center
- Different colors for status
- White border for contrast

Content Card:
- Connected visually to node
- Date/time label
- Title and description
- Optional action button

## Responsive

Mobile:
- All items on one side
- Line on left
- Full-width cards

Desktop:
- Optional alternating sides
- Line in center
- Cards 50% width

## Animation

Scroll-triggered:
- Items fade in on scroll
- Stagger animation
- Node pulse on current

## Self-Check

After generating code, verify:
1. Line is continuous
2. Nodes are aligned
3. Mobile is single-side
4. All items have dates
5. Scroll animation works`,examplePrompts:[{title:"公司发展历程",titleEn:"Company History",description:"展示公司重要里程碑",descriptionEn:"Display company milestones",prompt:`Create a company history timeline:
1. Vertical timeline with central line
2. Alternating left/right layout on desktop
3. Single side on mobile
4. Each node: year, event title, description
5. Different node colors for different types (funding, product, team)
6. Scroll animation: fade in as visible
7. Year navigation at top
Use subtle colors, professional styling`},{title:"工作经历",titleEn:"Work Experience",description:"简历中的职业时间线",descriptionEn:"Career timeline for resume",prompt:`Create a career timeline for resume:
1. Single-side vertical timeline
2. Each node: date range, company, role, achievements
3. Company logo in node instead of dot
4. Current job highlighted
5. Skills tags for each role
6. Smooth scroll animation
7. Download resume button at end
Clean minimal design, professional look`},{title:"项目进度",titleEn:"Project Progress",description:"项目阶段的流程展示",descriptionEn:"Project phase progress display",prompt:`Create a project progress timeline:
1. Vertical timeline showing project phases
2. Nodes: phase number, name, status (complete/current/upcoming)
3. Complete phases: green nodes with checkmark
4. Current phase: blue pulsing node
5. Upcoming: gray nodes
6. Progress percentage at top
7. Click node to expand details
Interactive with hover states`}]},{slug:"card-stack",name:"卡片堆叠布局",nameEn:"Card Stack",description:"卡片前后重叠的立体布局，通过 Z 轴层叠和偏移创造深度感，适合轮播、步骤展示、卡组选择。",cover:"/styles/card-stack.svg",styleType:"layout",tags:["modern","expressive"],compatibleWith:["glassmorphism","neumorphism","soft-ui","modern-gradient","neo-brutalist"],category:"expressive",colors:{primary:"#1a1a2e",secondary:"#f0f0f5",accent:["#6c5ce7","#00cec9","#fd79a8","#ffeaa7"]},keywords:["卡片","堆叠","立体","层叠","轮播","3D"],philosophy:`Card Stack（卡片堆叠布局）是一种利用 Z 轴创造深度感的布局方式，多张卡片前后重叠，形成视觉层次。

核心理念：
- 深度感知：通过层叠暗示更多内容
- 焦点引导：最前面的卡片获得最多关注
- 交互预期：暗示可以翻阅或切换
- 空间节省：在有限空间展示多个选项`,doList:["使用 transform 和 z-index 创建层叠效果","后方卡片缩小和偏移 scale-95 translate-y-4","添加渐进的透明度 opacity-80, opacity-60","支持拖拽或点击切换卡片","添加流畅的过渡动画 transition-all duration-300","限制可见卡片数量（通常 3-5 张）","提供视觉提示说明可以交互"],dontList:["禁止堆叠过多卡片导致混乱","禁止卡片完全重叠看不出层次","禁止忽略交互反馈","禁止动画过于复杂影响性能","禁止在移动端使用过于复杂的手势"],components:{button:{name:"切换按钮",description:"用于切换卡片的导航按钮",code:`<div className="flex items-center gap-4">
  <button className="
    w-12 h-12
    flex items-center justify-center
    bg-white
    rounded-full
    shadow-lg
    hover:shadow-xl
    transition-shadow
  ">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
  <button className="
    w-12 h-12
    flex items-center justify-center
    bg-white
    rounded-full
    shadow-lg
    hover:shadow-xl
    transition-shadow
  ">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>`},card:{name:"堆叠卡片",description:"可堆叠的基础卡片",code:`<div className="
  relative
  w-80
  p-8
  bg-white
  rounded-2xl
  shadow-xl
  transition-all duration-300
  hover:shadow-2xl
">
  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-6" />
  <h3 className="text-xl font-bold text-zinc-900 mb-3">
    Card Title
  </h3>
  <p className="text-zinc-600">
    This card can be stacked with others to create a layered effect.
  </p>
</div>`},input:{name:"卡片搜索",description:"在卡片堆中搜索",code:`<div className="relative">
  <input
    type="text"
    placeholder="Search cards..."
    className="
      w-full px-5 py-3
      bg-white/80 backdrop-blur
      border border-zinc-200
      rounded-xl
      text-zinc-900
      placeholder-zinc-400
      focus:outline-none focus:ring-2 focus:ring-purple-500/30
      transition-all
    "
  />
  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
</div>`},nav:{name:"卡片指示器",description:"显示当前卡片位置",code:`<nav className="flex items-center justify-center gap-2">
  <button className="w-2.5 h-2.5 rounded-full bg-purple-500 transition-all" />
  <button className="w-2 h-2 rounded-full bg-zinc-300 hover:bg-zinc-400 transition-all" />
  <button className="w-2 h-2 rounded-full bg-zinc-300 hover:bg-zinc-400 transition-all" />
  <button className="w-2 h-2 rounded-full bg-zinc-300 hover:bg-zinc-400 transition-all" />
</nav>`},hero:{name:"卡片堆叠展示",description:"完整的卡片堆叠布局",code:`<section className="py-20 px-4 bg-gradient-to-br from-slate-900 to-slate-800">
  <div className="max-w-6xl mx-auto">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
      <p className="text-slate-400">Swipe or click to browse options</p>
    </div>

    {/* Card Stack */}
    <div className="relative h-[400px] flex items-center justify-center">
      {/* Card 3 (Back) */}
      <div className="
        absolute
        w-80 p-8
        bg-white rounded-2xl shadow-lg
        transform scale-90 translate-y-8
        opacity-50
        z-10
      ">
        <div className="w-10 h-10 bg-amber-100 rounded-lg mb-4" />
        <h3 className="text-lg font-bold text-zinc-900">Enterprise</h3>
      </div>

      {/* Card 2 (Middle) */}
      <div className="
        absolute
        w-80 p-8
        bg-white rounded-2xl shadow-xl
        transform scale-95 translate-y-4
        opacity-75
        z-20
      ">
        <div className="w-10 h-10 bg-emerald-100 rounded-lg mb-4" />
        <h3 className="text-lg font-bold text-zinc-900">Professional</h3>
        <p className="text-zinc-600 text-sm mt-2">Most popular choice</p>
      </div>

      {/* Card 1 (Front) */}
      <div className="
        absolute
        w-80 p-8
        bg-white rounded-2xl shadow-2xl
        z-30
        hover:scale-105
        transition-transform duration-300
        cursor-pointer
      ">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4" />
        <h3 className="text-xl font-bold text-zinc-900 mb-2">Starter</h3>
        <p className="text-zinc-600 text-sm mb-4">Perfect for getting started</p>
        <div className="text-3xl font-bold text-zinc-900 mb-4">
          $9<span className="text-lg font-normal text-zinc-500">/mo</span>
        </div>
        <button className="w-full py-3 bg-zinc-900 text-white rounded-xl font-medium hover:bg-zinc-800 transition-colors">
          Get Started
        </button>
      </div>
    </div>

    {/* Navigation */}
    <div className="flex items-center justify-center gap-8 mt-8">
      <button className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-white" />
        <div className="w-2 h-2 rounded-full bg-white/30" />
        <div className="w-2 h-2 rounded-full bg-white/30" />
      </div>
      <button className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</section>`}},globalCss:`/* Card Stack Global Styles */

/* Stack container */
.card-stack {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
}

/* Base card in stack */
.card-stack-item {
  position: absolute;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Stack positions */
.card-stack-item:nth-child(1) {
  z-index: 30;
  transform: translateY(0) scale(1);
  opacity: 1;
}

.card-stack-item:nth-child(2) {
  z-index: 20;
  transform: translateY(16px) scale(0.95);
  opacity: 0.75;
}

.card-stack-item:nth-child(3) {
  z-index: 10;
  transform: translateY(32px) scale(0.9);
  opacity: 0.5;
}

.card-stack-item:nth-child(n+4) {
  z-index: 0;
  transform: translateY(48px) scale(0.85);
  opacity: 0;
  pointer-events: none;
}

/* Fan out on hover */
.card-stack:hover .card-stack-item:nth-child(1) {
  transform: translateY(-10px) scale(1);
}

.card-stack:hover .card-stack-item:nth-child(2) {
  transform: translateY(24px) scale(0.95);
}

.card-stack:hover .card-stack-item:nth-child(3) {
  transform: translateY(48px) scale(0.9);
}

/* Tinder-style swipe */
.card-stack-swipe .card-stack-item.swiping-left {
  transform: translateX(-100%) rotate(-10deg);
  opacity: 0;
}

.card-stack-swipe .card-stack-item.swiping-right {
  transform: translateX(100%) rotate(10deg);
  opacity: 0;
}

/* 3D rotation variant */
.card-stack-3d .card-stack-item:nth-child(2) {
  transform: translateY(16px) scale(0.95) rotateX(5deg);
}

.card-stack-3d .card-stack-item:nth-child(3) {
  transform: translateY(32px) scale(0.9) rotateX(10deg);
}`,aiRules:`You are a frontend expert specializing in Card Stack layout. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Do NOT stack too many visible cards (max 3-5)
- Do NOT overlap cards completely (need visual distinction)
- Do NOT forget interaction feedback
- Do NOT use overly complex animations
- Do NOT use complex gestures on mobile

## Must Follow

- Use transform for positioning: scale, translateY
- Use z-index for layering: z-30, z-20, z-10
- Progressive opacity: 100%, 75%, 50%
- Smooth transitions: transition-all duration-300
- Clear hover/active states
- Limit visible cards: 3-5 maximum

## Stack Structure

Container:
- relative position
- flex center alignment
- Fixed height for consistent layout

Cards (front to back):
- Card 1: z-30, scale-100, opacity-100
- Card 2: z-20, scale-95, translateY-4, opacity-75
- Card 3: z-10, scale-90, translateY-8, opacity-50
- Beyond: hidden or very faded

## Interactions

Hover:
- Front card lifts slightly
- Stack spreads out

Click/Tap:
- Current card moves to back
- Next card animates to front

Swipe (optional):
- Tinder-style left/right swipe
- Card rotates and fades out

## Animation

- Use cubic-bezier for smooth motion
- Card transitions: 300-400ms
- Consider spring physics for natural feel

## Self-Check

After generating code, verify:
1. Cards are visually layered
2. Front card is clearly prominent
3. Interaction works smoothly
4. Max 3-5 visible cards
5. Mobile-friendly touch targets`,examplePrompts:[{title:"定价方案选择",titleEn:"Pricing Plans",description:"堆叠展示不同定价方案",descriptionEn:"Stacked pricing plan cards",prompt:`Create pricing cards with stack layout:
1. 3 cards stacked: Starter, Pro, Enterprise
2. Front card fully visible with details
3. Back cards scaled down and offset
4. Click to bring card to front
5. Each card: plan name, price, features list, CTA
6. Smooth animation on card switch
7. Navigation arrows on sides
Dark gradient background, white cards`},{title:"产品卡组",titleEn:"Product Cards",description:"类似 Tinder 的产品浏览",descriptionEn:"Tinder-like product browsing",prompt:`Create a Tinder-style product card stack:
1. Stack of product cards (5 cards, 3 visible)
2. Swipe right to like, left to pass
3. Each card: product image, name, price, rating
4. Swipe animation with rotation
5. Undo last action button
6. Match counter at top
7. Category tabs to filter
Fun, interactive, mobile-friendly design`},{title:"步骤引导",titleEn:"Step Guide",description:"分步引导的卡片堆叠",descriptionEn:"Step-by-step guide cards",prompt:`Create an onboarding flow with card stack:
1. 4 step cards stacked
2. Current step card in front
3. Click Next to advance (card slides out)
4. Click Back to return (card slides in)
5. Progress indicator dots
6. Each card: step number, title, illustration, description
7. Final card has CTA button
Clean design with subtle animations`}]},{slug:"sidebar-fixed",name:"固定侧边栏布局",nameEn:"Fixed Sidebar",description:"固定位置的侧边导航栏与可滚动主内容区的应用布局，适合后台管理、文档站点、仪表盘、SaaS 应用。",cover:"/styles/sidebar-fixed.svg",styleType:"layout",tags:["modern","responsive"],compatibleWith:["corporate-clean","soft-ui","dark-mode","minimalist-flat","neumorphism"],category:"modern",colors:{primary:"#1e293b",secondary:"#f8fafc",accent:["#3b82f6","#10b981","#f59e0b","#ef4444"]},keywords:["侧边栏","后台","管理","导航","仪表盘","应用"],philosophy:`Fixed Sidebar（固定侧边栏布局）是应用型界面的经典布局，提供持久可见的导航同时最大化内容展示空间。

核心理念：
- 导航常驻：重要入口始终可及
- 内容优先：主区域最大化利用
- 层级清晰：侧边栏体现信息架构
- 响应适配：小屏幕优雅收起`,doList:["侧边栏使用 fixed 或 sticky 定位","主内容区设置左边距 ml-64 或 pl-64","移动端侧边栏可收起为抽屉或汉堡菜单","提供展开/收起侧边栏的控制","侧边栏宽度统一 w-64 (256px) 或 w-72 (288px)","当前页面在侧边栏中高亮显示","侧边栏可以包含品牌 logo、导航、用户信息"],dontList:["禁止侧边栏过宽影响主内容区","禁止移动端仍保持展开侧边栏","禁止忽略当前页面状态指示","禁止导航层级过深难以操作","禁止侧边栏内容溢出无滚动"],components:{button:{name:"侧边栏按钮",description:"侧边栏中的操作按钮",code:`<button className="
  w-full
  flex items-center gap-3
  px-4 py-3
  text-left
  text-zinc-600
  rounded-lg
  hover:bg-zinc-100
  hover:text-zinc-900
  transition-colors
">
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
  <span>New Item</span>
</button>`},card:{name:"内容卡片",description:"主内容区的卡片",code:`<div className="
  p-6
  bg-white
  rounded-xl
  border border-zinc-200
  shadow-sm
">
  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
    Card Title
  </h3>
  <p className="text-zinc-600 text-sm">
    Content for the main area card.
  </p>
</div>`},input:{name:"侧边栏搜索",description:"侧边栏中的搜索框",code:`<div className="relative">
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
  <input
    type="text"
    placeholder="Search..."
    className="
      w-full pl-9 pr-4 py-2
      bg-zinc-100
      border-0
      rounded-lg
      text-sm text-zinc-900
      placeholder-zinc-400
      focus:outline-none focus:ring-2 focus:ring-blue-500/30
    "
  />
</div>`},nav:{name:"侧边导航",description:"侧边栏的导航菜单",code:`<nav className="space-y-1">
  <a href="#" className="
    flex items-center gap-3 px-4 py-3
    bg-blue-50 text-blue-600
    rounded-lg font-medium
  ">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
    Dashboard
  </a>
  <a href="#" className="
    flex items-center gap-3 px-4 py-3
    text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900
    rounded-lg transition-colors
  ">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
    Analytics
  </a>
  <a href="#" className="
    flex items-center gap-3 px-4 py-3
    text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900
    rounded-lg transition-colors
  ">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
    Users
  </a>
  <a href="#" className="
    flex items-center gap-3 px-4 py-3
    text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900
    rounded-lg transition-colors
  ">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    Settings
  </a>
</nav>`},hero:{name:"固定侧边栏布局",description:"完整的侧边栏应用布局",code:`<div className="min-h-screen bg-zinc-50">
  {/* Sidebar */}
  <aside className="
    fixed top-0 left-0
    w-64 h-screen
    bg-white
    border-r border-zinc-200
    flex flex-col
    z-40
  ">
    {/* Logo */}
    <div className="p-6 border-b border-zinc-200">
      <span className="text-xl font-bold text-zinc-900">Logo</span>
    </div>

    {/* Search */}
    <div className="p-4">
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 bg-zinc-100 border-0 rounded-lg text-sm" />
      </div>
    </div>

    {/* Navigation */}
    <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
      <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        Dashboard
      </a>
      <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-100 rounded-lg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z" /></svg>
        Analytics
      </a>
      <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-100 rounded-lg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z" /></svg>
        Users
      </a>
    </nav>

    {/* User */}
    <div className="p-4 border-t border-zinc-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-zinc-200 rounded-full" />
        <div>
          <div className="font-medium text-zinc-900 text-sm">John Doe</div>
          <div className="text-zinc-500 text-xs">Admin</div>
        </div>
      </div>
    </div>
  </aside>

  {/* Main Content */}
  <main className="ml-64 p-8">
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
      <p className="text-zinc-600">Welcome back, John!</p>
    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="p-6 bg-white rounded-xl border border-zinc-200">
        <h3 className="font-semibold text-zinc-900 mb-2">Total Users</h3>
        <p className="text-3xl font-bold text-blue-600">12,345</p>
      </div>
      <div className="p-6 bg-white rounded-xl border border-zinc-200">
        <h3 className="font-semibold text-zinc-900 mb-2">Revenue</h3>
        <p className="text-3xl font-bold text-emerald-600">$45,678</p>
      </div>
      <div className="p-6 bg-white rounded-xl border border-zinc-200">
        <h3 className="font-semibold text-zinc-900 mb-2">Orders</h3>
        <p className="text-3xl font-bold text-amber-600">1,234</p>
      </div>
    </div>
  </main>
</div>`}},globalCss:`/* Fixed Sidebar Global Styles */

/* Sidebar base */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 16rem; /* 256px */
  height: 100vh;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  z-index: 40;
  transition: transform 0.3s ease;
}

/* Main content offset */
.main-content {
  margin-left: 16rem;
  min-height: 100vh;
}

/* Mobile sidebar hidden by default */
@media (max-width: 1024px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
  }
}

/* Sidebar overlay for mobile */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 30;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.sidebar-overlay.visible {
  opacity: 1;
  visibility: visible;
}

/* Collapsed sidebar variant */
.sidebar-collapsed {
  width: 4rem; /* 64px */
}

.sidebar-collapsed .sidebar-label {
  display: none;
}

.sidebar-collapsed + .main-content {
  margin-left: 4rem;
}

/* Navigation item active state */
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: #64748b;
  transition: all 0.2s;
}

.nav-item:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.nav-item.active {
  background: #eff6ff;
  color: #2563eb;
  font-weight: 500;
}`,aiRules:`You are a frontend expert specializing in Fixed Sidebar layout. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Do NOT make sidebar too wide (max 280px)
- Do NOT keep sidebar expanded on mobile
- Do NOT forget current page indicator
- Do NOT create overly deep navigation
- Do NOT ignore sidebar overflow scroll

## Must Follow

- Sidebar: fixed top-0 left-0 w-64 h-screen
- Main content: ml-64 (matches sidebar width)
- Mobile: sidebar hidden, hamburger menu trigger
- Active state: highlight current page
- Overflow: sidebar nav scrollable if needed

## Structure

Sidebar (top to bottom):
1. Logo/Brand area
2. Search (optional)
3. Main navigation (scrollable)
4. Secondary nav or settings
5. User profile/account

Main content:
- Left margin matches sidebar width
- Own scrolling context
- Header area for page title
- Content area below

## Responsive

Desktop (1024px+):
- Full sidebar visible
- Main content with left margin

Tablet/Mobile (< 1024px):
- Sidebar as off-canvas drawer
- Hamburger menu button
- Overlay when sidebar open
- Main content full width

## Navigation

- Group related items
- Use icons + labels
- Highlight active item
- Support nested items (accordion)
- Tooltips when collapsed

## Self-Check

After generating code, verify:
1. Sidebar is fixed position
2. Main content has correct margin
3. Mobile has hamburger menu
4. Current page is highlighted
5. Sidebar scrolls if content overflows`,examplePrompts:[{title:"管理后台",titleEn:"Admin Dashboard",description:"完整的后台管理布局",descriptionEn:"Complete admin dashboard layout",prompt:`Create an admin dashboard with fixed sidebar:
1. Fixed sidebar with logo, search, navigation, user
2. Navigation groups: Dashboard, Content, Users, Settings
3. Active page highlighted in nav
4. Main area with header and content grid
5. Mobile: hamburger menu, slide-out sidebar
6. Collapsible sidebar option (icons only)
7. User dropdown at bottom of sidebar
Professional look with blue accent color`},{title:"文档站点",titleEn:"Documentation Site",description:"技术文档的侧边导航布局",descriptionEn:"Sidebar navigation for docs",prompt:`Create a documentation site with fixed sidebar:
1. Sidebar with doc sections (Getting Started, API, Examples)
2. Nested navigation with accordion expand
3. Search at top of sidebar
4. Main content area with article
5. Right sidebar with table of contents (optional)
6. Previous/Next article navigation at bottom
7. Mobile: slide-out sidebar menu
Clean minimal design focused on readability`},{title:"SaaS 应用",titleEn:"SaaS Application",description:"SaaS 产品的应用框架",descriptionEn:"SaaS product application shell",prompt:`Create a SaaS application shell with fixed sidebar:
1. Sidebar with workspace switcher at top
2. Main nav: Home, Projects, Team, Reports
3. Secondary nav at bottom: Settings, Help
4. Notification badge on nav item
5. Main content with toolbar and data table
6. Mobile: slide-out navigation
7. Collapsible sidebar with keyboard shortcut hint
Modern SaaS aesthetic with subtle shadows`}]},{slug:"magazine-grid",name:"杂志网格布局",nameEn:"Magazine Grid",description:"灵感来自印刷杂志的多栏网格布局，通过不同大小的内容块创造丰富的视觉层次，适合新闻、博客、内容聚合。",cover:"/styles/magazine-grid.svg",styleType:"layout",tags:["modern","responsive"],compatibleWith:["editorial","minimalist-flat","corporate-clean","retro-vintage","dark-mode"],category:"modern",colors:{primary:"#1a1a1a",secondary:"#fafafa",accent:["#e63946","#2a9d8f","#e9c46a","#264653"]},keywords:["杂志","多栏","新闻","博客","内容","网格"],philosophy:`Magazine Grid（杂志网格布局）借鉴传统印刷杂志的排版智慧，通过多栏和混合尺寸内容块创造专业的编辑效果。

核心理念：
- 视觉层级：大图抓眼球，小块填充细节
- 扫描友好：读者可快速浏览找到感兴趣的内容
- 空间节奏：大小交替创造阅读节奏
- 专业感：传递权威性和可信度`,doList:["使用 CSS Grid 创建复杂网格 grid-template-areas","特色内容使用更大的网格区域 col-span-2 row-span-2","保持基线对齐和一致的间距","使用不同大小的内容块创造层次","移动端转为单列或简化网格","添加清晰的分类标签和时间戳","考虑广告位的预留空间"],dontList:["禁止所有内容块大小相同","禁止忽略移动端布局适配","禁止内容过于拥挤无留白","禁止分类标签不一致","禁止忽略图片裁切比例"],components:{button:{name:"分类标签",description:"文章分类的标签按钮",code:`<span className="
  inline-block
  px-3 py-1
  text-xs font-semibold uppercase tracking-wider
  text-red-600
  bg-red-50
  rounded
">
  Technology
</span>`},card:{name:"杂志文章卡片",description:"杂志风格的文章卡片",code:`<article className="group">
  <a href="#" className="block">
    <div className="relative overflow-hidden rounded-lg mb-4">
      <img
        src="/placeholder.jpg"
        alt="Article thumbnail"
        className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase bg-red-600 text-white rounded">
        Featured
      </span>
    </div>
    <div>
      <span className="text-xs font-semibold uppercase tracking-wider text-red-600 mb-2 block">
        Technology
      </span>
      <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-red-600 transition-colors">
        Article Title Goes Here
      </h3>
      <p className="text-zinc-600 text-sm mb-3 line-clamp-2">
        Brief excerpt of the article content that gives readers a preview...
      </p>
      <div className="flex items-center gap-3 text-sm text-zinc-500">
        <span>John Doe</span>
        <span>5 min read</span>
      </div>
    </div>
  </a>
</article>`},input:{name:"搜索框",description:"杂志站点的搜索",code:`<div className="relative">
  <input
    type="text"
    placeholder="Search articles..."
    className="
      w-full px-4 py-3 pr-12
      bg-zinc-100
      border-0
      rounded-lg
      text-zinc-900
      placeholder-zinc-500
      focus:outline-none focus:ring-2 focus:ring-red-500/30
    "
  />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-zinc-700">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </button>
</div>`},nav:{name:"分类导航",description:"杂志分类导航栏",code:`<nav className="
  flex items-center gap-6
  border-b border-zinc-200
  overflow-x-auto
">
  <a href="#" className="
    py-4
    text-sm font-semibold uppercase tracking-wider
    text-red-600
    border-b-2 border-red-600
    whitespace-nowrap
  ">
    All
  </a>
  <a href="#" className="
    py-4
    text-sm font-semibold uppercase tracking-wider
    text-zinc-600
    hover:text-zinc-900
    border-b-2 border-transparent
    hover:border-zinc-300
    transition-colors
    whitespace-nowrap
  ">
    Technology
  </a>
  <a href="#" className="
    py-4
    text-sm font-semibold uppercase tracking-wider
    text-zinc-600
    hover:text-zinc-900
    border-b-2 border-transparent
    hover:border-zinc-300
    transition-colors
    whitespace-nowrap
  ">
    Business
  </a>
  <a href="#" className="
    py-4
    text-sm font-semibold uppercase tracking-wider
    text-zinc-600
    hover:text-zinc-900
    border-b-2 border-transparent
    hover:border-zinc-300
    transition-colors
    whitespace-nowrap
  ">
    Culture
  </a>
</nav>`},hero:{name:"杂志网格布局",description:"完整的杂志风格布局",code:`<section className="py-8 px-4">
  <div className="max-w-7xl mx-auto">
    {/* Category Nav */}
    <nav className="flex items-center gap-6 border-b border-zinc-200 mb-8 overflow-x-auto">
      <a href="#" className="py-4 text-sm font-semibold uppercase tracking-wider text-red-600 border-b-2 border-red-600 whitespace-nowrap">All</a>
      <a href="#" className="py-4 text-sm font-semibold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 whitespace-nowrap">Tech</a>
      <a href="#" className="py-4 text-sm font-semibold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 whitespace-nowrap">Business</a>
      <a href="#" className="py-4 text-sm font-semibold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 whitespace-nowrap">Culture</a>
    </nav>

    {/* Magazine Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Featured - Large */}
      <article className="md:col-span-2 lg:row-span-2 group">
        <a href="#" className="block h-full">
          <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden">
            <img src="/placeholder.jpg" alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase bg-red-600 rounded mb-3">Featured</span>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">Main Featured Article Title</h2>
              <p className="text-white/80 mb-3 line-clamp-2">A compelling excerpt that draws readers in...</p>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <span>By John Doe</span>
                <span>10 min read</span>
              </div>
            </div>
          </div>
        </a>
      </article>

      {/* Regular articles */}
      <article className="group">
        <a href="#" className="block">
          <div className="rounded-lg overflow-hidden mb-3">
            <img src="/placeholder.jpg" alt="" className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Business</span>
          <h3 className="font-bold text-zinc-900 mt-1 group-hover:text-red-600 transition-colors">Secondary Article Title</h3>
        </a>
      </article>

      <article className="group">
        <a href="#" className="block">
          <div className="rounded-lg overflow-hidden mb-3">
            <img src="/placeholder.jpg" alt="" className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">Culture</span>
          <h3 className="font-bold text-zinc-900 mt-1 group-hover:text-red-600 transition-colors">Another Article Title Here</h3>
        </a>
      </article>

      <article className="group">
        <a href="#" className="block">
          <div className="rounded-lg overflow-hidden mb-3">
            <img src="/placeholder.jpg" alt="" className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">Tech</span>
          <h3 className="font-bold text-zinc-900 mt-1 group-hover:text-red-600 transition-colors">Tech News Article</h3>
        </a>
      </article>

      <article className="group">
        <a href="#" className="block">
          <div className="rounded-lg overflow-hidden mb-3">
            <img src="/placeholder.jpg" alt="" className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-600">Opinion</span>
          <h3 className="font-bold text-zinc-900 mt-1 group-hover:text-red-600 transition-colors">Opinion Piece Title</h3>
        </a>
      </article>
    </div>
  </div>
</section>`}},globalCss:`/* Magazine Grid Global Styles */

/* Base magazine grid */
.magazine-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .magazine-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .magazine-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Featured item spans */
.magazine-featured {
  grid-column: span 2;
  grid-row: span 2;
}

@media (max-width: 767px) {
  .magazine-featured {
    grid-column: span 1;
    grid-row: span 1;
  }
}

/* Article card styles */
.magazine-article {
  position: relative;
}

.magazine-article img {
  transition: transform 0.3s ease;
}

.magazine-article:hover img {
  transform: scale(1.05);
}

/* Category tags */
.magazine-category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.25rem;
}

/* Category colors */
.magazine-category-tech { color: #3b82f6; background: #eff6ff; }
.magazine-category-business { color: #10b981; background: #ecfdf5; }
.magazine-category-culture { color: #f59e0b; background: #fffbeb; }
.magazine-category-opinion { color: #8b5cf6; background: #f5f3ff; }
.magazine-category-featured { color: white; background: #dc2626; }

/* Line clamp for excerpts */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}`,aiRules:`You are a frontend expert specializing in Magazine Grid layout. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Do NOT make all content blocks same size
- Do NOT ignore mobile responsive layout
- Do NOT overcrowd content without whitespace
- Do NOT use inconsistent category styling
- Do NOT ignore image aspect ratios

## Must Follow

- Use CSS Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Featured content: col-span-2 row-span-2
- Consistent gaps: gap-6
- Category labels on all articles
- Image hover effects
- Line clamping for excerpts

## Grid Structure

Desktop (4 columns):
- Featured: 2x2 grid area
- Regular: 1x1 grid cells
- Mix large and small for variety

Tablet (2 columns):
- Featured: 2x1 or 1x2
- Regular: 1x1

Mobile (1 column):
- All items full width
- Stack vertically

## Article Card

Required elements:
1. Image with aspect ratio
2. Category label (colored)
3. Title (clamped)
4. Excerpt (optional, clamped)
5. Meta (author, date, read time)

## Category Colors

Use distinct colors per category:
- Tech: blue
- Business: green
- Culture: amber
- Opinion: purple
- Featured: red

## Self-Check

After generating code, verify:
1. Featured item is larger
2. Grid has visual variety
3. Categories are labeled
4. Mobile layout works
5. Images have proper ratios`,examplePrompts:[{title:"新闻首页",titleEn:"News Homepage",description:"新闻网站的杂志风格首页",descriptionEn:"Magazine style news homepage",prompt:`Create a news homepage with magazine grid:
1. 4-column grid on desktop, 2 on tablet, 1 on mobile
2. Featured story spanning 2x2 with image overlay
3. Regular articles in grid with thumbnail, category, title
4. Category tabs: All, Politics, Tech, Business, Sports
5. Breaking news banner at top
6. Load more button at bottom
7. Sidebar with trending stories (optional)
Clean, professional news design with red accent`},{title:"博客列表",titleEn:"Blog Listing",description:"博客文章的杂志布局",descriptionEn:"Magazine layout for blog posts",prompt:`Create a blog listing with magazine grid:
1. Featured post with large image and gradient overlay
2. Regular posts in varied sizes (some 2-col wide)
3. Each post: image, category tag, title, excerpt, author
4. Mix of horizontal and vertical card layouts
5. Filter by category dropdown
6. Infinite scroll loading
7. Reading time indicator
Modern editorial style with serif headlines`},{title:"内容聚合页",titleEn:"Content Hub",description:"多类型内容的聚合展示",descriptionEn:"Aggregated content display",prompt:`Create a content hub with magazine grid:
1. Mix of content types: articles, videos, podcasts
2. Video cards with play button overlay
3. Podcast cards with audio duration
4. Featured content section at top
5. "Editor's Picks" sidebar section
6. Newsletter signup card in grid
7. Trending topics tags
Multi-format content with clear type indicators`}]},{slug:"hero-fullscreen",name:"全屏英雄区布局",nameEn:"Fullscreen Hero",description:"以全屏大图或视频为背景的英雄区布局，通过震撼的视觉效果抓住注意力，适合品牌展示、产品发布、活动宣传。",cover:"/styles/hero-fullscreen.svg",styleType:"layout",tags:["expressive","modern"],compatibleWith:["glassmorphism","modern-gradient","cyberpunk-neon","minimalist-flat","dark-mode"],category:"expressive",colors:{primary:"#ffffff",secondary:"#000000",accent:["#ff6b6b","#4ecdc4","#ffe66d","#6c5ce7"]},keywords:["全屏","英雄区","大图","视频","品牌","震撼"],philosophy:`Fullscreen Hero（全屏英雄区布局）是一种以视觉冲击力为核心的布局方式，用全屏图片或视频创造沉浸式第一印象。

核心理念：
- 第一印象：用震撼视觉立即抓住访客
- 品牌表达：通过图像传达品牌调性
- 聚焦核心：突出最重要的信息和行动
- 情感连接：通过视觉建立情感共鸣`,doList:["使用 h-screen 或 min-h-screen 确保全屏","图片使用 object-cover 保持比例填充","添加渐变或半透明遮罩保证文字可读","内容绝对定位或 flex 居中","提供滚动提示引导用户往下看","视频背景静音自动播放","提供降级方案（图片替代视频）"],dontList:["禁止文字直接放在复杂背景上无遮罩","禁止使用低质量或拉伸的图片","禁止忽略移动端的适配","禁止内容占据全部空间无留白","禁止视频有声音自动播放"],components:{button:{name:"英雄区按钮",description:"全屏英雄区中的 CTA 按钮",code:`<div className="flex flex-col sm:flex-row gap-4">
  <button className="
    px-8 py-4
    bg-white text-black
    font-semibold text-lg
    rounded-full
    hover:bg-white/90
    transition-colors
  ">
    Get Started
  </button>
  <button className="
    px-8 py-4
    bg-transparent text-white
    font-semibold text-lg
    rounded-full
    border-2 border-white
    hover:bg-white/10
    transition-colors
  ">
    Learn More
  </button>
</div>`},card:{name:"特性卡片",description:"英雄区下方的特性展示卡片",code:`<div className="
  p-8
  bg-white/10 backdrop-blur-sm
  rounded-2xl
  border border-white/20
">
  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  </div>
  <h3 className="text-xl font-semibold text-white mb-2">
    Feature Title
  </h3>
  <p className="text-white/70">
    Brief description of the feature.
  </p>
</div>`},input:{name:"邮箱订阅",description:"英雄区的邮箱收集表单",code:`<form className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
  <input
    type="email"
    placeholder="Enter your email"
    className="
      flex-1 px-6 py-4
      bg-white/10 backdrop-blur-sm
      border border-white/30
      rounded-full
      text-white placeholder-white/60
      focus:outline-none focus:ring-2 focus:ring-white/50
    "
  />
  <button className="
    px-8 py-4
    bg-white text-black
    font-semibold
    rounded-full
    hover:bg-white/90
    transition-colors
    whitespace-nowrap
  ">
    Subscribe
  </button>
</form>`},nav:{name:"透明导航",description:"全屏英雄区顶部的透明导航",code:`<nav className="
  absolute top-0 left-0 right-0 z-50
  px-6 py-4
  flex items-center justify-between
">
  <a href="/" className="text-white text-2xl font-bold">
    Logo
  </a>
  <div className="hidden md:flex items-center gap-8">
    <a href="#" className="text-white/80 hover:text-white transition-colors">Features</a>
    <a href="#" className="text-white/80 hover:text-white transition-colors">Pricing</a>
    <a href="#" className="text-white/80 hover:text-white transition-colors">About</a>
    <button className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors">
      Sign Up
    </button>
  </div>
  <button className="md:hidden text-white">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
</nav>`},hero:{name:"全屏英雄区",description:"完整的全屏英雄区布局",code:`<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/hero-bg.jpg"
      alt=""
      className="w-full h-full object-cover"
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/50" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
  </div>

  {/* Navigation */}
  <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between">
    <a href="/" className="text-white text-2xl font-bold">Logo</a>
    <div className="hidden md:flex items-center gap-8">
      <a href="#" className="text-white/80 hover:text-white">Features</a>
      <a href="#" className="text-white/80 hover:text-white">Pricing</a>
      <a href="#" className="text-white/80 hover:text-white">About</a>
      <button className="px-6 py-2 bg-white text-black rounded-full font-medium">Sign Up</button>
    </div>
  </nav>

  {/* Content */}
  <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
    <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
      Announcing our new product
    </span>
    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
      Build Something
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"> Amazing</span>
    </h1>
    <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
      The platform that helps you create incredible experiences your users will love.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="px-8 py-4 bg-white text-black font-semibold text-lg rounded-full hover:bg-white/90 transition-colors">
        Get Started Free
      </button>
      <button className="px-8 py-4 bg-transparent text-white font-semibold text-lg rounded-full border-2 border-white hover:bg-white/10 transition-colors">
        Watch Demo
      </button>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 animate-bounce">
    <span className="text-sm">Scroll to explore</span>
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  </div>
</section>`}},globalCss:`/* Fullscreen Hero Global Styles */

/* Base hero container */
.hero-fullscreen {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Background image/video */
.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Video background */
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Overlay variations */
.hero-overlay {
  position: absolute;
  inset: 0;
}

.hero-overlay-dark {
  background: rgba(0, 0, 0, 0.5);
}

.hero-overlay-gradient {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
}

.hero-overlay-color {
  background: rgba(99, 102, 241, 0.7);
  mix-blend-mode: multiply;
}

/* Content container */
.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 1rem;
  max-width: 64rem;
}

/* Scroll indicator animation */
@keyframes hero-bounce {
  0%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(10px) translateX(-50%);
  }
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  animation: hero-bounce 2s infinite;
}

/* Parallax effect */
.hero-parallax {
  transform: translateZ(0);
  will-change: transform;
}

/* Ken Burns effect for images */
@keyframes kenburns {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

.hero-kenburns .hero-bg {
  animation: kenburns 20s ease-out forwards;
}`,aiRules:`You are a frontend expert specializing in Fullscreen Hero layout. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Do NOT place text on busy backgrounds without overlay
- Do NOT use low-quality or stretched images
- Do NOT ignore mobile responsiveness
- Do NOT fill entire viewport with no breathing room
- Do NOT autoplay video with sound

## Must Follow

- Container: min-h-screen or h-screen
- Background: object-cover for images
- Overlay: gradient or solid for text readability
- Content: centered with max-width constraint
- Scroll indicator: at bottom of hero
- Navigation: absolute positioned, transparent

## Structure

Layers (bottom to top):
1. Background image/video (absolute, full cover)
2. Overlay (gradient or solid color)
3. Content (relative z-10, centered)
4. Navigation (absolute top)
5. Scroll indicator (absolute bottom)

## Background Options

Image:
- object-fit: cover
- Full viewport coverage
- High quality, relevant imagery

Video:
- Muted, autoplay, loop
- Fallback poster image
- Pause on mobile (optional)

Overlay types:
- Solid: bg-black/50
- Gradient: from-black/80 via-transparent to-black/30
- Color: bg-brand/70 mix-blend-multiply

## Content

- Badge/label (optional)
- Main headline (large, bold)
- Subheadline (medium)
- CTA buttons (prominent)
- Max-width container (4xl recommended)

## Responsive

Mobile:
- Smaller text sizes
- Stacked CTA buttons
- Simpler background (may hide video)

Desktop:
- Full visual impact
- Side-by-side buttons
- All animations enabled

## Self-Check

After generating code, verify:
1. Hero is full viewport height
2. Text is readable on background
3. Overlay provides contrast
4. Scroll indicator visible
5. Mobile layout works`,examplePrompts:[{title:"产品发布页",titleEn:"Product Launch",description:"新产品发布的震撼首屏",descriptionEn:"Impactful hero for product launch",prompt:`Create a product launch fullscreen hero:
1. Full viewport height with product image background
2. Dark gradient overlay for text contrast
3. Badge: "Announcing [Product Name]"
4. Large headline with gradient text highlight
5. Subheadline describing key benefit
6. Two CTAs: "Pre-order Now" and "Learn More"
7. Scroll indicator at bottom
8. Transparent navbar at top
Modern, tech-forward aesthetic`},{title:"品牌故事",titleEn:"Brand Story",description:"品牌展示的全屏视觉",descriptionEn:"Fullscreen visual for brand",prompt:`Create a brand story fullscreen hero:
1. Video background (lifestyle footage) with muted autoplay
2. Subtle overlay with brand color tint
3. Centered brand logo (large)
4. Brand tagline below logo
5. Single CTA: "Explore Our Story"
6. Social links at bottom corners
7. Sound toggle button (optional)
Elegant, premium brand feel`},{title:"活动宣传",titleEn:"Event Promotion",description:"活动或会议的宣传首屏",descriptionEn:"Event or conference promotion hero",prompt:`Create an event promotion fullscreen hero:
1. Event venue/crowd image as background
2. Strong dark overlay for readability
3. Event name in large display font
4. Date and location prominently shown
5. Countdown timer to event
6. CTA: "Register Now" with early bird badge
7. Speaker photos strip at bottom (optional)
Energetic, exciting event atmosphere`}]},{slug:"claymorphism",name:"粘土拟态",nameEn:"Claymorphism",description:"柔软的粘土质感设计，通过超大圆角、内外阴影组合和柔和渐变，创造出可爱的 3D 立体效果，适合儿童应用和趣味产品。",cover:"/styles/claymorphism.svg",styleType:"visual",tags:["modern","expressive"],category:"modern",colors:{primary:"#f8b4d9",secondary:"#fef3c7",accent:["#a7f3d0","#c4b5fd","#fcd34d"]},keywords:["粘土","3D","可爱","柔软","圆润","儿童","趣味"],philosophy:`Claymorphism（粘土拟态）是一种模拟粘土或橡皮泥质感的 UI 设计风格，通过超大圆角、内外阴影组合和柔和的渐变色彩，创造出柔软、可爱的 3D 立体效果。

核心理念：
- 柔软感：超大圆角和柔和阴影营造软糯质感
- 立体感：内阴影 + 外阴影组合模拟 3D 效果
- 趣味性：糖果色系和圆润造型传递愉悦情绪
- 触感：设计元素看起来像可以触摸和捏揉`,doList:["使用超大圆角 rounded-3xl 或 rounded-full","组合内阴影和外阴影创造立体感","使用柔和的糖果色系配色","添加微妙的渐变背景模拟光照","保持元素之间足够的间距","使用圆润的图标和字体"],dontList:["禁止使用尖锐的直角 rounded-none","禁止使用硬边缘阴影","禁止使用高对比度的深色配色","禁止使用过于复杂的渐变","禁止元素过于拥挤"],components:{button:{name:"按钮",description:"粘土风格按钮，带有柔软的 3D 立体效果",code:`<button className="
  px-8 py-4
  bg-gradient-to-b from-pink-300 to-pink-400
  rounded-3xl
  text-white font-bold
  shadow-[8px_8px_16px_rgba(0,0,0,0.1),inset_4px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-2px_4px_rgba(0,0,0,0.1)]
  hover:shadow-[4px_4px_8px_rgba(0,0,0,0.1),inset_4px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-2px_4px_rgba(0,0,0,0.1)]
  hover:translate-y-1
  active:translate-y-2
  transition-all duration-200
">
  Clay Button
</button>`},card:{name:"卡片",description:"粘土质感卡片，柔软的立体效果",code:`<div className="
  p-8
  bg-gradient-to-br from-amber-100 to-amber-200
  rounded-[32px]
  shadow-[12px_12px_24px_rgba(0,0,0,0.1),inset_6px_6px_12px_rgba(255,255,255,0.6),inset_-4px_-4px_8px_rgba(0,0,0,0.05)]
">
  <h3 className="text-2xl font-bold text-amber-800 mb-3">
    Clay Card
  </h3>
  <p className="text-amber-700">
    柔软可爱的粘土质感卡片
  </p>
</div>`},input:{name:"输入框",description:"粘土风格输入框，内凹效果",code:`<input
  type="text"
  placeholder="请输入..."
  className="
    w-full px-6 py-4
    bg-gradient-to-b from-gray-100 to-gray-200
    rounded-2xl
    text-gray-700 placeholder-gray-400
    shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]
    focus:outline-none
    focus:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.9),0_0_0_4px_rgba(248,180,217,0.3)]
    transition-all
  "
/>`},nav:{name:"导航栏",description:"粘土风格导航栏",code:`<nav className="
  px-8 py-4
  bg-gradient-to-b from-pink-200 to-pink-300
  rounded-b-[32px]
  shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(255,255,255,0.4)]
">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <a href="/" className="text-pink-700 font-bold text-xl">
      Logo
    </a>
    <div className="flex gap-6">
      <a href="#" className="text-pink-600 hover:text-pink-800 font-medium transition-colors">
        Home
      </a>
      <a href="#" className="text-pink-600 hover:text-pink-800 font-medium transition-colors">
        About
      </a>
    </div>
  </div>
</nav>`},hero:{name:"Hero 区块",description:"粘土风格 Hero 展示区域",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-br from-amber-100 via-pink-100 to-purple-100
  px-6 py-20
">
  <div className="
    max-w-2xl mx-auto text-center
    p-12
    bg-gradient-to-br from-white to-pink-50
    rounded-[48px]
    shadow-[20px_20px_40px_rgba(0,0,0,0.1),inset_8px_8px_16px_rgba(255,255,255,0.8),inset_-4px_-4px_8px_rgba(0,0,0,0.05)]
  ">
    <h1 className="text-5xl font-bold text-pink-600 mb-6">
      Claymorphism
    </h1>
    <p className="text-xl text-pink-500 mb-8">
      柔软可爱的粘土质感设计风格
    </p>
    <button className="
      px-10 py-5
      bg-gradient-to-b from-pink-400 to-pink-500
      rounded-full
      text-white font-bold text-lg
      shadow-[8px_8px_16px_rgba(0,0,0,0.15),inset_4px_4px_8px_rgba(255,255,255,0.3)]
      hover:translate-y-1
      transition-all
    ">
      Get Started
    </button>
  </div>
</section>`}},globalCss:`/* Claymorphism 全局样式 */

:root {
  --clay-pink: #f8b4d9;
  --clay-cream: #fef3c7;
  --clay-mint: #a7f3d0;
  --clay-lavender: #c4b5fd;
  --clay-lemon: #fcd34d;
  --clay-shadow-light: rgba(255, 255, 255, 0.6);
  --clay-shadow-dark: rgba(0, 0, 0, 0.1);
}

/* 基础粘土效果类 */
.clay {
  border-radius: 24px;
  box-shadow:
    8px 8px 16px var(--clay-shadow-dark),
    inset 4px 4px 8px var(--clay-shadow-light),
    inset -2px -2px 4px var(--clay-shadow-dark);
}

/* 粘土按钮效果 */
.clay-button {
  border-radius: 9999px;
  box-shadow:
    6px 6px 12px var(--clay-shadow-dark),
    inset 3px 3px 6px var(--clay-shadow-light),
    inset -2px -2px 4px var(--clay-shadow-dark);
  transition: all 0.2s ease;
}

.clay-button:hover {
  transform: translateY(2px);
  box-shadow:
    4px 4px 8px var(--clay-shadow-dark),
    inset 3px 3px 6px var(--clay-shadow-light),
    inset -2px -2px 4px var(--clay-shadow-dark);
}

/* 粘土输入框（内凹效果） */
.clay-input {
  border-radius: 16px;
  box-shadow:
    inset 4px 4px 8px var(--clay-shadow-dark),
    inset -4px -4px 8px var(--clay-shadow-light);
}`,aiRules:`你是一个 Claymorphism 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用直角 rounded-none 或小圆角 rounded-sm
- 使用硬边缘阴影 shadow-[Xpx_Xpx_0px]
- 使用高对比度深色配色
- 使用纯黑色文字 text-black
- 省略内阴影效果

## 必须遵守

- 超大圆角 rounded-3xl, rounded-[32px], rounded-full
- 组合阴影：外阴影 + 内高光 + 内阴影
- 柔和渐变背景 bg-gradient-to-b, bg-gradient-to-br
- 糖果色系配色（粉、黄、绿、紫、橙）
- 按钮按下效果 hover:translate-y-1

## 配色

主色调：
- 粉色: from-pink-300 to-pink-400, text-pink-600
- 奶油: from-amber-100 to-amber-200, text-amber-700
- 薄荷: from-green-200 to-green-300, text-green-700
- 淡紫: from-purple-200 to-purple-300, text-purple-700
- 柠檬: from-yellow-200 to-yellow-300, text-yellow-700

## 阴影公式

外凸元素（按钮、卡片）：
shadow-[8px_8px_16px_rgba(0,0,0,0.1),inset_4px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-2px_4px_rgba(0,0,0,0.1)]

内凹元素（输入框）：
shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]

## 自检

每次生成代码后检查：
1. 圆角足够大（至少 rounded-2xl）
2. 有内外阴影组合
3. 使用柔和的渐变色
4. 整体感觉柔软可爱`,examplePrompts:[{title:"儿童教育应用",titleEn:"Kids Education App",description:"可爱的学习界面",descriptionEn:"Cute learning interface",prompt:`用 Claymorphism 风格创建一个儿童教育应用界面，要求：
1. 背景：柔和的渐变（粉色到紫色或黄色到橙色）
2. 主卡片：超大圆角，粘土质感阴影
3. 按钮：圆润的胶囊形状，按下有下沉效果
4. 图标：使用圆润的图标风格
5. 配色：糖果色系，明亮但不刺眼`},{title:"游戏 UI",titleEn:"Game UI",description:"趣味游戏界面",descriptionEn:"Fun game interface",prompt:`用 Claymorphism 风格设计一个休闲游戏界面，要求：
1. 背景：多彩渐变，营造欢乐氛围
2. 游戏卡片：立体粘土效果，可点击
3. 分数显示：大号圆润数字
4. 按钮：Play、Pause、Settings 等，都是粘土风格
5. 进度条：圆润的条形，内凹效果`}]},{slug:"notion-style",name:"Notion 风格",nameEn:"Notion Style",description:"极简清爽的文档工具风格，强调内容可读性和功能性，使用微妙的边框、柔和的悬停效果和清晰的文字层级。",cover:"/styles/notion-style.svg",styleType:"visual",tags:["minimal"],category:"minimal",colors:{primary:"#37352f",secondary:"#ffffff",accent:["#2eaadc","#eb5757","#0f7b6c"]},keywords:["Notion","文档","极简","清爽","工具","协作","笔记"],philosophy:`Notion Style 是一种源于 Notion 应用的极简设计风格，强调内容的可读性和功能的直观性。通过微妙的视觉元素和清晰的层级结构，让用户专注于内容本身。

核心理念：
- 内容优先：设计服务于内容，不喧宾夺主
- 功能清晰：每个元素都有明确的功能目的
- 微妙交互：悬停和点击反馈轻柔自然
- 层级分明：通过字体大小和颜色区分信息层级`,doList:["使用 Notion 标志性的米色背景 #f7f6f3","使用微妙的边框 border-gray-200","悬停效果使用浅灰背景 hover:bg-gray-100","保持清晰的文字层级","使用系统字体栈确保可读性","图标使用简洁的线性风格"],dontList:["禁止使用大圆角 rounded-2xl 或更大","禁止使用渐变背景","禁止使用重阴影","禁止使用过于鲜艳的颜色","禁止过度装饰"],components:{button:{name:"按钮",description:"Notion 风格按钮，简洁实用",code:`<button className="
  px-3 py-1.5
  bg-white
  border border-gray-200
  rounded-md
  text-sm font-medium text-gray-700
  hover:bg-gray-100
  transition-colors duration-150
">
  Button
</button>`},card:{name:"卡片",description:"Notion 风格卡片，简洁的内容容器",code:`<div className="
  p-4
  bg-white
  border border-gray-200
  rounded-lg
  shadow-sm
  hover:shadow-md
  transition-shadow
">
  <h3 className="text-lg font-semibold text-gray-900 mb-2">
    Page Title
  </h3>
  <p className="text-gray-600 text-sm">
    A simple description of the content
  </p>
</div>`},input:{name:"输入框",description:"Notion 风格输入框",code:`<input
  type="text"
  placeholder="Type something..."
  className="
    w-full px-3 py-2
    bg-white
    border border-gray-200
    rounded-md
    text-gray-900 placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-all
  "
/>`},nav:{name:"侧边栏",description:"Notion 风格侧边导航",code:`<aside className="
  w-60 h-screen
  bg-[#f7f6f3]
  border-r border-gray-200
  p-3
">
  <div className="mb-4">
    <button className="w-full px-2 py-1.5 text-left text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors">
      Search
    </button>
  </div>
  <div className="space-y-1">
    <a href="#" className="block px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
      Getting Started
    </a>
    <a href="#" className="block px-2 py-1.5 text-sm text-gray-700 bg-gray-200 rounded-md">
      Quick Note
    </a>
    <a href="#" className="block px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
      Personal Home
    </a>
  </div>
</aside>`},hero:{name:"页面标题",description:"Notion 风格页面标题区域",code:`<div className="max-w-3xl mx-auto px-6 py-12">
  <div className="mb-6">
    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 border border-gray-200">
      <div className="h-8 w-8 rounded-lg bg-white border border-gray-300 shadow-sm" />
    </div>
  </div>
  <h1 className="text-4xl font-bold text-gray-900 mb-4">
    Welcome to Notion Style
  </h1>
  <p className="text-lg text-gray-500">
    A clean and minimal design system for documentation and note-taking applications.
  </p>
</div>`}},globalCss:`/* Notion Style 全局样式 */

:root {
  --notion-text: #37352f;
  --notion-text-gray: #9b9a97;
  --notion-bg: #ffffff;
  --notion-bg-gray: #f7f6f3;
  --notion-blue: #2eaadc;
  --notion-red: #eb5757;
  --notion-green: #0f7b6c;
  --notion-yellow: #dfab01;
  --notion-border: rgba(55, 53, 47, 0.09);
}

/* 基础文字样式 */
body {
  font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif;
  color: var(--notion-text);
  line-height: 1.5;
}

/* Notion 风格链接 */
.notion-link {
  color: var(--notion-text);
  text-decoration: underline;
  text-decoration-color: rgba(55, 53, 47, 0.4);
  text-underline-offset: 2px;
}

.notion-link:hover {
  text-decoration-color: var(--notion-text);
}

/* Notion 风格代码块 */
.notion-code {
  font-family: SFMono-Regular, Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace;
  font-size: 85%;
  background: rgba(135, 131, 120, 0.15);
  border-radius: 3px;
  padding: 0.2em 0.4em;
}

/* Notion 风格分割线 */
.notion-divider {
  border: none;
  border-top: 1px solid var(--notion-border);
  margin: 1rem 0;
}`,aiRules:`你是一个 Notion Style 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用大圆角 rounded-2xl, rounded-3xl, rounded-full
- 使用渐变背景 bg-gradient-*
- 使用重阴影 shadow-xl, shadow-2xl
- 使用过于鲜艳的颜色
- 过度装饰和动画

## 必须遵守

- 使用 Notion 米色背景 bg-[#f7f6f3]
- 微妙边框 border border-gray-200
- 小圆角 rounded-md 或 rounded-lg
- 轻柔悬停 hover:bg-gray-100
- 清晰的文字层级

## 配色

主色调：
- 文字: text-[#37352f] (Notion 深灰)
- 背景: bg-white, bg-[#f7f6f3]
- 边框: border-gray-200

强调色：
- 蓝色: text-[#2eaadc], bg-blue-50
- 红色: text-[#eb5757], bg-red-50
- 绿色: text-[#0f7b6c], bg-green-50
- 黄色: text-[#dfab01], bg-yellow-50

## 交互

- 悬停: hover:bg-gray-100 或 hover:bg-gray-200
- 选中: bg-gray-200
- 聚焦: focus:ring-2 focus:ring-blue-500

## 自检

每次生成代码后检查：
1. 没有使用渐变
2. 圆角适中（rounded-md 或 rounded-lg）
3. 阴影轻柔（shadow-sm 或 shadow-md）
4. 整体感觉简洁清爽`,examplePrompts:[{title:"文档页面",titleEn:"Documentation Page",description:"Notion 风格文档布局",descriptionEn:"Notion-style documentation layout",prompt:`用 Notion Style 创建一个文档页面，要求：
1. 左侧：固定侧边栏，米色背景，页面列表
2. 右侧：主内容区，白色背景
3. 标题：大号字体，可编辑感
4. 内容块：段落、列表、代码块
5. 悬停效果：微妙的背景色变化`},{title:"任务看板",titleEn:"Task Board",description:"Notion 风格看板视图",descriptionEn:"Notion-style kanban board",prompt:`用 Notion Style 设计一个任务看板，要求：
1. 多列布局：To Do, In Progress, Done
2. 任务卡片：白色背景，微妙边框，小圆角
3. 拖拽指示：悬停时显示抓取光标
4. 添加按钮：简洁的 + 图标
5. 标签：彩色小标签（蓝、红、绿、黄）`}]},{slug:"stripe-style",name:"Stripe 风格",nameEn:"Stripe Style",description:"精致专业的金融科技风格，以 Stripe 紫为主色调，配合渐变网格背景、精致卡片阴影和流畅动画，适合支付产品和开发者工具。",cover:"/styles/stripe-style.svg",styleType:"visual",tags:["modern"],category:"modern",colors:{primary:"#635bff",secondary:"#0a2540",accent:["#00d4ff","#7a73ff","#80e9ff"]},keywords:["Stripe","金融","支付","SaaS","开发者","专业","科技"],philosophy:`Stripe Style 是一种源于 Stripe 的精致设计风格，以其标志性的紫色和专业的视觉语言著称。通过渐变网格背景、精致的卡片阴影和流畅的动画，传达信任感和技术实力。

核心理念：
- 专业信任：精致的设计传达可靠性
- 技术感：网格背景和代码元素展示技术实力
- 品牌一致：Stripe 紫贯穿整个设计
- 流畅体验：微妙的动画增强交互感`,doList:["使用 Stripe 紫 #635bff 作为主色调","添加渐变网格背景增加技术感","使用精致的多层阴影","保持适中的圆角 rounded-lg 或 rounded-xl","使用流畅的过渡动画","代码块使用深色背景"],dontList:["禁止使用过于鲜艳的配色","禁止使用过大的圆角","禁止使用粗糙的阴影","禁止忽略网格背景元素","禁止使用不专业的字体"],components:{button:{name:"按钮",description:"Stripe 风格按钮，专业精致",code:`<button className="
  px-6 py-3
  bg-[#635bff]
  rounded-lg
  text-white font-medium
  shadow-[0_2px_4px_rgba(99,91,255,0.2),0_4px_8px_rgba(99,91,255,0.2)]
  hover:shadow-[0_4px_8px_rgba(99,91,255,0.3),0_8px_16px_rgba(99,91,255,0.2)]
  hover:-translate-y-0.5
  transition-all duration-200
">
  Get Started
</button>`},card:{name:"卡片",description:"Stripe 风格卡片，精致阴影",code:`<div className="
  p-6
  bg-white
  rounded-xl
  shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]
  hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.1)]
  transition-shadow duration-300
">
  <h3 className="text-xl font-semibold text-[#0a2540] mb-2">
    Payments
  </h3>
  <p className="text-gray-600">
    Accept payments online with a complete platform
  </p>
</div>`},input:{name:"输入框",description:"Stripe 风格输入框",code:`<input
  type="text"
  placeholder="Card number"
  className="
    w-full px-4 py-3
    bg-white
    border border-gray-300
    rounded-lg
    text-[#0a2540] placeholder-gray-400
    shadow-[0_1px_2px_rgba(0,0,0,0.05)]
    focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent
    transition-all
  "
/>`},nav:{name:"导航栏",description:"Stripe 风格导航栏",code:`<nav className="
  px-6 py-4
  bg-white
  border-b border-gray-200
">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <a href="/" className="text-[#635bff] font-bold text-xl">
      stripe
    </a>
    <div className="flex items-center gap-8">
      <a href="#" className="text-[#0a2540] hover:text-[#635bff] font-medium transition-colors">
        Products
      </a>
      <a href="#" className="text-[#0a2540] hover:text-[#635bff] font-medium transition-colors">
        Developers
      </a>
      <button className="px-4 py-2 bg-[#635bff] text-white rounded-lg font-medium hover:bg-[#5851ea] transition-colors">
        Sign in
      </button>
    </div>
  </div>
</nav>`},hero:{name:"Hero 区块",description:"Stripe 风格 Hero 展示区域",code:`<section className="
  relative
  min-h-screen
  flex items-center
  bg-[#f6f9fc]
  overflow-hidden
">
  {/* Grid Background */}
  <div className="absolute inset-0 opacity-40"
    style={{
      backgroundImage: \`
        linear-gradient(to right, rgba(99,91,255,0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(99,91,255,0.1) 1px, transparent 1px)
      \`,
      backgroundSize: '40px 40px'
    }}
  />

  <div className="relative max-w-6xl mx-auto px-6 py-20">
    <h1 className="text-5xl md:text-7xl font-bold text-[#0a2540] mb-6">
      Financial infrastructure<br />
      <span className="text-[#635bff]">for the internet</span>
    </h1>
    <p className="text-xl text-gray-600 mb-8 max-w-2xl">
      Millions of companies use Stripe to accept payments, send payouts, and manage their businesses online.
    </p>
    <div className="flex gap-4">
      <button className="px-8 py-4 bg-[#635bff] text-white rounded-full font-semibold shadow-lg hover:-translate-y-0.5 transition-all">
        Start now
      </button>
      <button className="px-8 py-4 bg-white text-[#0a2540] rounded-full font-semibold shadow-lg hover:-translate-y-0.5 transition-all">
        Contact sales
      </button>
    </div>
  </div>
</section>`}},globalCss:`/* Stripe Style 全局样式 */

:root {
  --stripe-purple: #635bff;
  --stripe-purple-light: #7a73ff;
  --stripe-dark: #0a2540;
  --stripe-cyan: #00d4ff;
  --stripe-bg: #f6f9fc;
  --stripe-grid: rgba(99, 91, 255, 0.1);
}

/* 网格背景 */
.stripe-grid-bg {
  background-image:
    linear-gradient(to right, var(--stripe-grid) 1px, transparent 1px),
    linear-gradient(to bottom, var(--stripe-grid) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Stripe 风格卡片阴影 */
.stripe-card {
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 8px 16px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
}

.stripe-card:hover {
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.06),
    0 16px 32px rgba(0, 0, 0, 0.1);
}

/* Stripe 风格按钮 */
.stripe-button {
  background: var(--stripe-purple);
  box-shadow:
    0 2px 4px rgba(99, 91, 255, 0.2),
    0 4px 8px rgba(99, 91, 255, 0.2);
  transition: all 0.2s ease;
}

.stripe-button:hover {
  transform: translateY(-2px);
  box-shadow:
    0 4px 8px rgba(99, 91, 255, 0.3),
    0 8px 16px rgba(99, 91, 255, 0.2);
}

/* 代码块样式 */
.stripe-code {
  background: var(--stripe-dark);
  border-radius: 8px;
  font-family: 'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
}`,aiRules:`你是一个 Stripe Style 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用非 Stripe 品牌色作为主色
- 使用过大的圆角 rounded-3xl, rounded-full（按钮除外）
- 使用粗糙的单层阴影
- 忽略网格背景元素
- 使用不专业的配色

## 必须遵守

- 主色调 Stripe 紫 #635bff
- 深色文字 #0a2540
- 背景色 #f6f9fc
- 精致多层阴影
- 适中圆角 rounded-lg, rounded-xl
- 流畅过渡动画

## 配色

主色调：
- Stripe 紫: bg-[#635bff], text-[#635bff]
- 深蓝: text-[#0a2540]
- 背景: bg-[#f6f9fc]

强调色：
- 青色: #00d4ff
- 浅紫: #7a73ff
- 亮青: #80e9ff

## 阴影

卡片阴影：
shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]

按钮阴影：
shadow-[0_2px_4px_rgba(99,91,255,0.2),0_4px_8px_rgba(99,91,255,0.2)]

## 网格背景

使用 CSS 线性渐变创建网格：
background-image: linear-gradient(to right, rgba(99,91,255,0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(99,91,255,0.1) 1px, transparent 1px);
background-size: 40px 40px;

## 自检

每次生成代码后检查：
1. 使用了 Stripe 紫作为主色
2. 阴影精致多层
3. 有网格背景元素
4. 整体感觉专业可信`,examplePrompts:[{title:"支付页面",titleEn:"Payment Page",description:"Stripe 风格支付表单",descriptionEn:"Stripe-style payment form",prompt:`用 Stripe Style 创建一个支付页面，要求：
1. 背景：浅灰色 + 网格图案
2. 支付卡片：白色背景，精致阴影
3. 表单：卡号、有效期、CVV 输入框
4. 按钮：Stripe 紫，悬停上浮效果
5. 安全标识：锁图标和安全文字`},{title:"开发者文档",titleEn:"Developer Docs",description:"Stripe 风格 API 文档",descriptionEn:"Stripe-style API documentation",prompt:`用 Stripe Style 设计一个开发者文档页面，要求：
1. 左侧：导航菜单，API 端点列表
2. 右侧：代码示例，深色背景
3. 标题：清晰的层级结构
4. 代码块：语法高亮，复制按钮
5. 整体：专业、技术感强`}]},{slug:"apple-style",name:"Apple 风格",nameEn:"Apple Style",description:"极致简约的高端设计风格，大量留白、精致圆角、微妙阴影和 SF Pro 风格字体，传达高端科技产品的品质感。",cover:"/styles/apple-style.svg",styleType:"visual",tags:["minimal"],category:"minimal",colors:{primary:"#000000",secondary:"#f5f5f7",accent:["#0071e3","#34c759","#ff3b30"]},keywords:["Apple","极简","高端","科技","产品","留白","精致"],philosophy:`Apple Style 是一种源于 Apple 设计语言的极致简约风格，通过大量留白、精致的细节和克制的配色，传达高端科技产品的品质感和信任感。

核心理念：
- 极致简约：去除一切不必要的元素
- 大量留白：让内容呼吸，突出重点
- 精致细节：每个像素都经过精心设计
- 克制配色：黑白灰为主，蓝色点缀`,doList:["使用大量留白，让内容呼吸","使用 Apple 灰 #f5f5f7 作为背景","使用 Apple 蓝 #0071e3 作为强调色","使用精致的圆角 rounded-xl 或 rounded-2xl","使用微妙的阴影","使用 SF Pro 风格字体（-apple-system）"],dontList:["禁止使用过多颜色","禁止使用渐变背景","禁止使用重阴影","禁止元素过于拥挤","禁止使用花哨的装饰"],components:{button:{name:"按钮",description:"Apple 风格按钮，简洁精致",code:`<button className="
  px-6 py-3
  bg-[#0071e3]
  rounded-full
  text-white font-medium
  hover:bg-[#0077ed]
  transition-colors duration-200
">
  Buy
</button>`},card:{name:"卡片",description:"Apple 风格产品卡片",code:`<div className="
  p-8
  bg-white
  rounded-2xl
  shadow-[0_4px_12px_rgba(0,0,0,0.08)]
  text-center
">
  <div className="w-48 h-48 mx-auto mb-6 bg-[#f5f5f7] rounded-2xl flex items-center justify-center">
    <span className="text-6xl text-gray-300">Product</span>
  </div>
  <h3 className="text-2xl font-semibold text-black mb-2">
    iPhone 15 Pro
  </h3>
  <p className="text-gray-500 mb-4">
    Titanium. So strong. So light. So Pro.
  </p>
  <p className="text-lg font-medium text-black">
    From $999
  </p>
</div>`},input:{name:"输入框",description:"Apple 风格输入框",code:`<input
  type="text"
  placeholder="Search"
  className="
    w-full px-4 py-3
    bg-[#f5f5f7]
    rounded-xl
    text-black placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-[#0071e3]
    transition-all
  "
/>`},nav:{name:"导航栏",description:"Apple 风格导航栏",code:`<nav className="
  px-6 py-3
  bg-white/80
  backdrop-blur-xl
  border-b border-gray-200/50
">
  <div className="max-w-5xl mx-auto flex items-center justify-between">
    <a href="/" className="text-black">
      <svg className="w-5 h-5" viewBox="0 0 17 21" fill="currentColor">
        <path d="M8.5 0C5.5 0 3.5 2 3.5 5c0 2 1 3.5 2.5 4.5-1.5 1-2.5 3-2.5 5.5 0 3.5 2.5 6 6 6s6-2.5 6-6c0-2.5-1-4.5-2.5-5.5 1.5-1 2.5-2.5 2.5-4.5 0-3-2-5-5-5z"/>
      </svg>
    </a>
    <div className="flex items-center gap-8">
      <a href="#" className="text-xs text-black hover:text-gray-500 transition-colors">
        Store
      </a>
      <a href="#" className="text-xs text-black hover:text-gray-500 transition-colors">
        Mac
      </a>
      <a href="#" className="text-xs text-black hover:text-gray-500 transition-colors">
        iPhone
      </a>
    </div>
  </div>
</nav>`},hero:{name:"Hero 区块",description:"Apple 风格产品展示区域",code:`<section className="
  min-h-screen
  flex flex-col items-center justify-center
  bg-black
  text-white
  px-6 py-20
">
  <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-center mb-4">
    iPhone 15 Pro
  </h1>
  <h2 className="text-2xl md:text-3xl text-gray-400 font-medium text-center mb-8">
    Titanium. So strong. So light. So Pro.
  </h2>
  <div className="flex gap-6 mb-12">
    <a href="#" className="text-[#2997ff] hover:underline">
      Learn more &gt;
    </a>
    <a href="#" className="text-[#2997ff] hover:underline">
      Buy &gt;
    </a>
  </div>
  <div className="w-full max-w-4xl aspect-video bg-gray-900 rounded-3xl flex items-center justify-center">
    <span className="text-gray-600 text-2xl">Product Image</span>
  </div>
</section>`}},globalCss:`/* Apple Style 全局样式 */

:root {
  --apple-black: #000000;
  --apple-white: #ffffff;
  --apple-gray: #f5f5f7;
  --apple-blue: #0071e3;
  --apple-blue-hover: #0077ed;
  --apple-green: #34c759;
  --apple-red: #ff3b30;
}

/* Apple 风格字体 */
body {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Apple 风格标题 */
.apple-headline {
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

/* Apple 风格链接 */
.apple-link {
  color: var(--apple-blue);
  text-decoration: none;
}

.apple-link:hover {
  text-decoration: underline;
}

/* Apple 风格按钮 */
.apple-button {
  background: var(--apple-blue);
  color: white;
  border-radius: 9999px;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.apple-button:hover {
  background: var(--apple-blue-hover);
}

/* Apple 风格卡片 */
.apple-card {
  background: white;
  border-radius: 18px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}`,aiRules:`你是一个 Apple Style 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用渐变背景
- 使用过多颜色（超过 3 种）
- 使用重阴影 shadow-xl, shadow-2xl
- 元素过于拥挤
- 使用花哨的装饰和动画

## 必须遵守

- 大量留白
- Apple 灰背景 bg-[#f5f5f7]
- Apple 蓝强调 text-[#0071e3], bg-[#0071e3]
- 精致圆角 rounded-xl, rounded-2xl, rounded-full
- 微妙阴影 shadow-[0_4px_12px_rgba(0,0,0,0.08)]
- SF Pro 风格字体

## 配色

主色调：
- 黑色: text-black, bg-black
- 白色: text-white, bg-white
- Apple 灰: bg-[#f5f5f7]

强调色：
- Apple 蓝: #0071e3
- Apple 绿: #34c759
- Apple 红: #ff3b30

## 字体

- 标题: font-semibold tracking-tight
- 正文: font-normal
- 链接: text-[#0071e3] hover:underline

## 布局

- 最大宽度: max-w-5xl 或 max-w-[980px]
- 大量留白: py-20, py-24
- 居中对齐: text-center, mx-auto

## 自检

每次生成代码后检查：
1. 留白足够大
2. 配色克制（黑白灰 + 蓝色点缀）
3. 没有渐变
4. 整体感觉高端简约`,examplePrompts:[{title:"产品展示页",titleEn:"Product Page",description:"Apple 风格产品介绍",descriptionEn:"Apple-style product showcase",prompt:`用 Apple Style 创建一个产品展示页面，要求：
1. Hero：全屏黑色背景，大标题居中，产品图片
2. 特性区：白色背景，大量留白，图文交替
3. 规格区：Apple 灰背景，简洁的参数列表
4. 购买区：价格、颜色选择、购买按钮
5. 整体：极简、高端、大量留白`},{title:"服务页面",titleEn:"Services Page",description:"Apple 风格服务介绍",descriptionEn:"Apple-style services page",prompt:`用 Apple Style 设计一个服务介绍页面，要求：
1. 标题区：简洁有力的标题和副标题
2. 服务卡片：白色背景，圆角，微妙阴影
3. 定价区：清晰的价格对比
4. CTA：Apple 蓝按钮，圆角胶囊形状
5. 整体：专业、可信、简约`}]},{slug:"pixel-art",name:"像素艺术风",nameEn:"Pixel Art",description:"复古 8-bit 像素游戏风格，无圆角、像素化边框、硬边阴影和鲜明的 8-bit 配色，适合游戏、复古应用和独立开发者项目。",cover:"/styles/pixel-art.svg",styleType:"visual",tags:["retro","expressive"],category:"retro",colors:{primary:"#1a1c2c",secondary:"#f4f4f4",accent:["#ff004d","#00e436","#29adff","#ffec27"]},keywords:["像素","8-bit","复古","游戏","怀旧","独立","retro"],philosophy:`Pixel Art 是一种源于早期电子游戏的复古设计风格，通过像素化的视觉元素、硬边阴影和鲜明的 8-bit 配色，唤起对经典游戏的怀旧情感。

核心理念：
- 像素感：所有元素都呈现像素化的锐利边缘
- 硬边阴影：使用纯色偏移阴影模拟像素效果
- 8-bit 配色：使用经典游戏机的调色板
- 怀旧情感：唤起对经典游戏的美好回忆`,doList:["使用无圆角 rounded-none","使用粗边框 border-4","使用硬边阴影 shadow-[4px_4px_0_color]","使用 8-bit 调色板配色","使用像素字体或等宽字体","按钮按下时阴影消失并位移"],dontList:["禁止使用任何圆角","禁止使用渐变","禁止使用柔和阴影","禁止使用过于复杂的颜色","禁止使用细边框"],components:{button:{name:"按钮",description:"像素风格按钮，带有硬边阴影和按下效果",code:`<button className="
  px-6 py-3
  bg-[#ff004d]
  border-4 border-[#1a1c2c]
  rounded-none
  text-white font-bold uppercase tracking-wider
  shadow-[4px_4px_0_#1a1c2c]
  hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#1a1c2c]
  active:translate-x-1 active:translate-y-1 active:shadow-none
  transition-all duration-100
">
  START
</button>`},card:{name:"卡片",description:"像素风格卡片，硬边框和阴影",code:`<div className="
  p-6
  bg-white
  border-4 border-[#1a1c2c]
  rounded-none
  shadow-[4px_4px_0_#1a1c2c]
">
  <h3 className="text-xl font-bold uppercase text-[#1a1c2c] mb-2">
    LEVEL 1
  </h3>
  <p className="text-[#5f574f]">
    Welcome to the pixel world!
  </p>
</div>`},input:{name:"输入框",description:"像素风格输入框",code:`<input
  type="text"
  placeholder="ENTER NAME..."
  className="
    w-full px-4 py-3
    bg-white
    border-4 border-[#1a1c2c]
    rounded-none
    text-[#1a1c2c] placeholder-[#8b8680]
    font-mono uppercase
    focus:outline-none focus:shadow-[inset_0_0_0_2px_#29adff]
    transition-all
  "
/>`},nav:{name:"导航栏",description:"像素风格导航栏",code:`<nav className="
  px-6 py-4
  bg-[#1a1c2c]
  border-b-4 border-[#ff004d]
">
  <div className="max-w-4xl mx-auto flex items-center justify-between">
    <a href="/" className="text-white font-bold uppercase tracking-wider">
      PIXEL GAME
    </a>
    <div className="flex gap-6">
      <a href="#" className="text-[#29adff] hover:text-white font-bold uppercase text-sm transition-colors">
        PLAY
      </a>
      <a href="#" className="text-[#29adff] hover:text-white font-bold uppercase text-sm transition-colors">
        SCORES
      </a>
    </div>
  </div>
</nav>`},hero:{name:"Hero 区块",description:"像素风格 Hero 展示区域",code:`<section className="
  min-h-screen
  flex flex-col items-center justify-center
  bg-[#1a1c2c]
  px-6 py-20
">
  <h1 className="
    text-4xl md:text-6xl
    font-bold uppercase tracking-wider
    text-[#ffec27]
    mb-4
    animate-pulse
  ">
    PIXEL ART
  </h1>
  <p className="text-[#29adff] text-xl uppercase mb-8">
    PRESS START TO BEGIN
  </p>
  <button className="
    px-8 py-4
    bg-[#ff004d]
    border-4 border-white
    rounded-none
    text-white font-bold uppercase text-xl
    shadow-[6px_6px_0_#00e436]
    hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_#00e436]
    active:translate-x-2 active:translate-y-2 active:shadow-none
    transition-all duration-100
  ">
    START GAME
  </button>
</section>`}},globalCss:`/* Pixel Art 全局样式 */

:root {
  --pixel-dark: #1a1c2c;
  --pixel-light: #f4f4f4;
  --pixel-red: #ff004d;
  --pixel-green: #00e436;
  --pixel-blue: #29adff;
  --pixel-yellow: #ffec27;
  --pixel-orange: #ffa300;
  --pixel-pink: #ff77a8;
  --pixel-purple: #7e2553;
}

/* 像素化渲染 */
.pixel-render {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

/* 像素字体（需要引入 Press Start 2P 字体） */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.pixel-font {
  font-family: 'Press Start 2P', monospace;
}

/* 像素边框 */
.pixel-border {
  border: 4px solid var(--pixel-dark);
  border-radius: 0;
}

/* 像素阴影 */
.pixel-shadow {
  box-shadow: 4px 4px 0 var(--pixel-dark);
}

/* 像素按钮效果 */
.pixel-button {
  border: 4px solid var(--pixel-dark);
  border-radius: 0;
  box-shadow: 4px 4px 0 var(--pixel-dark);
  transition: all 0.1s ease;
}

.pixel-button:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--pixel-dark);
}

.pixel-button:active {
  transform: translate(4px, 4px);
  box-shadow: none;
}

/* 像素闪烁动画 */
@keyframes pixel-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.pixel-blink {
  animation: pixel-blink 1s step-end infinite;
}`,aiRules:`你是一个 Pixel Art 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用任何圆角 rounded-*（必须 rounded-none）
- 使用渐变 bg-gradient-*
- 使用柔和阴影 shadow-lg, shadow-xl
- 使用细边框 border, border-2
- 使用非 8-bit 调色板的颜色

## 必须遵守

- 无圆角 rounded-none
- 粗边框 border-4 border-[#1a1c2c]
- 硬边阴影 shadow-[4px_4px_0_#1a1c2c]
- 8-bit 调色板配色
- 大写字母 uppercase
- 按钮按下效果

## 配色（PICO-8 调色板）

主色调：
- 深蓝黑: #1a1c2c
- 浅灰: #f4f4f4

强调色：
- 红色: #ff004d
- 绿色: #00e436
- 蓝色: #29adff
- 黄色: #ffec27
- 橙色: #ffa300
- 粉色: #ff77a8
- 紫色: #7e2553

## 阴影

标准阴影：shadow-[4px_4px_0_#1a1c2c]
悬停阴影：shadow-[2px_2px_0_#1a1c2c]
彩色阴影：shadow-[4px_4px_0_#ff004d]

## 按钮交互

正常：shadow-[4px_4px_0_#1a1c2c]
悬停：translate-x-1 translate-y-1 shadow-[2px_2px_0_#1a1c2c]
按下：translate-x-1 translate-y-1 shadow-none

## 自检

每次生成代码后检查：
1. 没有任何圆角
2. 使用粗边框 border-4
3. 使用硬边阴影
4. 配色来自 8-bit 调色板
5. 整体感觉复古像素化`,examplePrompts:[{title:"游戏主菜单",titleEn:"Game Main Menu",description:"像素风格游戏菜单",descriptionEn:"Pixel art game menu",prompt:`用 Pixel Art 风格创建一个游戏主菜单，要求：
1. 背景：深色 #1a1c2c
2. 标题：大号像素字体，黄色闪烁
3. 菜单项：START, OPTIONS, CREDITS
4. 按钮：红色背景，硬边阴影，按下效果
5. 装饰：像素化的星星或图案`},{title:"得分排行榜",titleEn:"High Scores",description:"像素风格排行榜",descriptionEn:"Pixel art leaderboard",prompt:`用 Pixel Art 风格设计一个得分排行榜，要求：
1. 标题：HIGH SCORES，黄色大字
2. 列表：排名、玩家名、分数
3. 边框：粗像素边框
4. 配色：使用 8-bit 调色板
5. 底部：返回按钮`}]},{slug:"vaporwave",name:"霓虹复古",nameEn:"Neon Retro",description:"80-90年代复古未来主义美学，粉紫渐变、霓虹色彩、故障艺术效果。包含蒸汽波、合成波、赛博朋克三种变体。",cover:"/styles/vaporwave.svg",styleType:"visual",tags:["retro","expressive","high-contrast"],category:"retro",colors:{primary:"#ff71ce",secondary:"#01cdfe",accent:["#05ffa1","#b967ff","#fffb96"]},keywords:["蒸汽波","复古未来","霓虹","80年代","故障艺术","赛博","合成波","赛博朋克","vaporwave","synthwave","cyberpunk"],variants:[{id:"vaporwave",name:"蒸汽波",nameEn:"Vaporwave",description:"80-90年代消费主义、日文元素、希腊雕塑、故障艺术",colors:{primary:"#ff71ce",secondary:"#01cdfe",accent:["#05ffa1","#b967ff","#fffb96"]}},{id:"synthwave",name:"合成波",nameEn:"Synthwave",description:"80年代合成器音乐、网格地平线、日落渐变、科幻电影感",colors:{primary:"#ff00ff",secondary:"#00ffff",accent:["#ff6ec7","#7b68ee","#ff1493"]},cssOverrides:`
/* Synthwave variant - more saturated, grid horizon */
.synth-grid {
  background: linear-gradient(to bottom, transparent 0%, #ff00ff33 100%),
    repeating-linear-gradient(90deg, #ff00ff22 0px, transparent 1px, transparent 80px),
    repeating-linear-gradient(0deg, #ff00ff22 0px, transparent 1px, transparent 80px);
}
.synth-sun {
  background: linear-gradient(to bottom, #ff6ec7, #ff1493, #7b68ee);
  border-radius: 50% 50% 0 0;
}
`},{id:"cyberpunk",name:"赛博朋克",nameEn:"Cyberpunk",description:"深色背景、霓虹发光、未来都市、科技感",colors:{primary:"#00ffff",secondary:"#0a0a0f",accent:["#ff00ff","#ffff00","#00ff00"]},cssOverrides:`
/* Cyberpunk variant - dark background, strong neon */
body { background: #0a0a0f; }
.cyber-neon {
  text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor;
}
.cyber-border {
  border: 1px solid #00ffff;
  box-shadow: 0 0 10px #00ffff, inset 0 0 10px #00ffff33;
}
`}],philosophy:`Vaporwave（蒸汽波）是一种源于2010年代初的网络亚文化美学，融合了80-90年代的消费主义符号、日本文化元素和早期互联网美学。

核心理念：
- 怀旧感：对80-90年代商业美学的戏仿和致敬
- 超现实：希腊雕塑、棕榈树、日落等超现实元素组合
- 霓虹色彩：粉色、青色、紫色的渐变组合
- 故障美学：VHS 故障、扫描线、色差效果`,doList:["使用粉紫青渐变 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500","添加霓虹发光效果 shadow-[0_0_20px_rgba(255,113,206,0.5)]","使用故障/扫描线效果作为装饰","融入日文文字或希腊雕塑元素","使用网格线背景营造复古感","字体使用粗体或像素风格"],dontList:["禁止使用单调的灰色配色","禁止使用过于现代简约的设计","禁止省略霓虹发光效果","禁止使用过于正式的字体"],components:{button:{name:"按钮",description:"蒸汽波风格按钮，霓虹发光效果",code:`<button className="
  px-8 py-4
  bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500
  text-white font-bold uppercase tracking-wider
  border-2 border-white/30
  shadow-[0_0_20px_rgba(255,113,206,0.5),0_0_40px_rgba(1,205,254,0.3)]
  hover:shadow-[0_0_30px_rgba(255,113,206,0.7),0_0_60px_rgba(1,205,254,0.5)]
  hover:scale-105
  transition-all duration-300
">
  AESTHETIC
</button>`},card:{name:"卡片",description:"蒸汽波风格卡片",code:`<div className="
  p-8
  bg-gradient-to-br from-purple-900/80 to-pink-900/80
  backdrop-blur-sm
  border border-pink-500/30
  shadow-[0_0_30px_rgba(255,113,206,0.3)]
">
  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-3">
    アエステティック
  </h3>
  <p className="text-pink-200/80">
    Welcome to the aesthetic dimension
  </p>
</div>`},input:{name:"输入框",description:"蒸汽波风格输入框",code:`<input
  type="text"
  placeholder="输入..."
  className="
    w-full px-6 py-4
    bg-purple-900/50
    border-2 border-pink-500/50
    text-pink-100 placeholder-pink-300/50
    shadow-[0_0_15px_rgba(255,113,206,0.2)]
    focus:border-cyan-400
    focus:shadow-[0_0_25px_rgba(1,205,254,0.4)]
    focus:outline-none
    transition-all
  "
/>`},hero:{name:"Hero 区块",description:"蒸汽波风格 Hero",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-purple-900 via-pink-900 to-indigo-900
  relative overflow-hidden
">
  {/* Grid background */}
  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,113,206,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,113,206,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />

  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-6">
      VAPORWAVE
    </h1>
    <p className="text-xl text-pink-200/80 mb-8">
      アエステティック・ドリーム
    </p>
    <button className="
      px-10 py-4
      bg-gradient-to-r from-pink-500 to-cyan-500
      text-white font-bold uppercase
      shadow-[0_0_30px_rgba(255,113,206,0.5)]
      hover:shadow-[0_0_50px_rgba(255,113,206,0.7)]
      transition-all
    ">
      Enter the Dream
    </button>
  </div>
</section>`}},globalCss:`/* Vaporwave 全局样式 */

:root {
  --vapor-pink: #ff71ce;
  --vapor-cyan: #01cdfe;
  --vapor-purple: #b967ff;
  --vapor-green: #05ffa1;
  --vapor-yellow: #fffb96;
}

/* 霓虹发光效果 */
.vapor-glow {
  text-shadow:
    0 0 10px var(--vapor-pink),
    0 0 20px var(--vapor-pink),
    0 0 40px var(--vapor-cyan);
}

/* 网格背景 */
.vapor-grid {
  background-image:
    linear-gradient(rgba(255, 113, 206, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 113, 206, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* 扫描线效果 */
.vapor-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1) 0px,
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}`,aiRules:`你是一个 Vaporwave 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用单调的灰色或黑白配色
- 使用过于现代简约的设计
- 省略霓虹发光效果
- 使用正式的衬线字体

## 必须遵守

- 粉紫青渐变 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500
- 霓虹发光 shadow-[0_0_20px_rgba(255,113,206,0.5)]
- 深色背景 bg-purple-900, bg-pink-900
- 网格线背景装饰
- 大写字母和宽字距 uppercase tracking-wider

## 配色

主色调：
- 粉色: #ff71ce, from-pink-500
- 青色: #01cdfe, from-cyan-500
- 紫色: #b967ff, from-purple-500
- 绿色: #05ffa1
- 黄色: #fffb96

## 特殊元素

- 日文文字装饰
- 希腊雕塑图片
- 棕榈树、日落元素
- VHS 故障效果`,examplePrompts:[{title:"复古音乐播放器",titleEn:"Retro Music Player",description:"80年代风格音乐界面",descriptionEn:"80s style music interface",prompt:`用 Vaporwave 风格创建一个音乐播放器界面，要求：
1. 背景：紫粉渐变 + 网格线
2. 专辑封面：带霓虹边框发光
3. 播放控制：霓虹按钮
4. 进度条：渐变色
5. 添加日文装饰文字`}]},{slug:"y2k",name:"千禧风格",nameEn:"Y2K",description:"2000年代初的未来主义美学，金属质感、透明塑料、气泡元素、银色和彩虹渐变，充满对数字时代的乐观想象。",cover:"/styles/y2k.svg",styleType:"visual",tags:["retro","expressive"],category:"retro",colors:{primary:"#c0c0c0",secondary:"#ff69b4",accent:["#00ffff","#ff00ff","#87ceeb"]},keywords:["Y2K","千禧","未来主义","金属","透明","气泡","2000年代"],philosophy:`Y2K（千禧风格）是1990年代末至2000年代初的设计美学，反映了人们对新千年和数字未来的乐观想象。

核心理念：
- 未来感：对数字时代的乐观憧憬
- 金属质感：银色、铬合金、反光材质
- 透明元素：透明塑料、气泡、水滴效果
- 彩虹渐变：全息效果、彩虹反光`,doList:["使用银色/金属渐变 bg-gradient-to-r from-gray-300 via-white to-gray-300","添加气泡/球体装饰元素","使用透明/半透明效果 bg-white/30 backdrop-blur","彩虹渐变文字效果","圆润的未来感造型 rounded-full","添加星星、闪光装饰"],dontList:["禁止使用暗沉的配色","禁止使用过于扁平的设计","禁止省略光泽/反光效果","禁止使用粗糙的纹理"],components:{button:{name:"按钮",description:"Y2K风格按钮，金属光泽",code:`<button className="
  px-8 py-4
  bg-gradient-to-b from-gray-200 via-white to-gray-300
  rounded-full
  text-gray-700 font-bold
  border border-white/50
  shadow-[0_4px_15px_rgba(0,0,0,0.1),inset_0_2px_3px_rgba(255,255,255,0.8)]
  hover:shadow-[0_6px_20px_rgba(0,0,0,0.15),inset_0_2px_3px_rgba(255,255,255,0.9)]
  hover:scale-105
  transition-all duration-300
">
  Click Me
</button>`},card:{name:"卡片",description:"Y2K风格卡片，透明气泡感",code:`<div className="
  p-8
  bg-gradient-to-br from-white/60 to-pink-100/40
  backdrop-blur-md
  rounded-3xl
  border border-white/60
  shadow-[0_8px_32px_rgba(0,0,0,0.1)]
">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400" />
    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400" />
    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
  </div>
  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mb-3">
    Future is Now
  </h3>
  <p className="text-gray-600">
    Welcome to the new millennium
  </p>
</div>`},input:{name:"输入框",description:"Y2K风格输入框",code:`<input
  type="text"
  placeholder="Type here..."
  className="
    w-full px-6 py-4
    bg-gradient-to-b from-white to-gray-100
    rounded-full
    border border-gray-200
    text-gray-700 placeholder-gray-400
    shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]
    focus:border-pink-300
    focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.05),0_0_0_3px_rgba(255,105,180,0.2)]
    focus:outline-none
    transition-all
  "
/>`},hero:{name:"Hero 区块",description:"Y2K风格 Hero",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-br from-pink-100 via-white to-cyan-100
  relative overflow-hidden
">
  {/* Floating bubbles */}
  <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-pink-200/50 to-transparent blur-xl" />
  <div className="absolute bottom-32 right-32 w-48 h-48 rounded-full bg-gradient-to-br from-cyan-200/50 to-transparent blur-xl" />

  <div className="relative z-10 text-center px-6">
    <div className="inline-flex items-center justify-center mb-6">
      <div className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 p-[2px] shadow-[0_10px_40px_rgba(255,105,180,0.35)]">
        <div className="h-full w-full rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center">
          <div className="h-6 w-6 rotate-45 rounded-sm bg-gradient-to-r from-pink-400 to-cyan-400 opacity-90" />
        </div>
      </div>
    </div>
    <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-6">
      Y2K AESTHETIC
    </h1>
    <p className="text-xl text-gray-500 mb-8">
      The future is bright and shiny
    </p>
    <button className="
      px-10 py-4
      bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400
      rounded-full
      text-white font-bold
      shadow-[0_4px_20px_rgba(255,105,180,0.4)]
      hover:shadow-[0_6px_30px_rgba(255,105,180,0.6)]
      hover:scale-105
      transition-all
    ">
      Enter the Future
    </button>
  </div>
</section>`}},globalCss:`/* Y2K 全局样式 */

:root {
  --y2k-silver: #c0c0c0;
  --y2k-pink: #ff69b4;
  --y2k-cyan: #00ffff;
  --y2k-purple: #ff00ff;
}

/* 金属光泽效果 */
.y2k-metallic {
  background: linear-gradient(
    135deg,
    #e8e8e8 0%,
    #ffffff 25%,
    #e8e8e8 50%,
    #ffffff 75%,
    #e8e8e8 100%
  );
}

/* 彩虹渐变文字 */
.y2k-rainbow-text {
  background: linear-gradient(90deg, #ff69b4, #00ffff, #ff00ff, #ff69b4);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rainbow 3s linear infinite;
}

@keyframes rainbow {
  to { background-position: 200% center; }
}

/* 气泡效果 */
.y2k-bubble {
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent);
  border-radius: 50%;
}`,aiRules:`你是一个 Y2K 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用暗沉、灰暗的配色
- 使用过于扁平的设计
- 省略光泽和反光效果
- 使用尖锐的直角

## 必须遵守

- 金属渐变 bg-gradient-to-b from-gray-200 via-white to-gray-300
- 圆润造型 rounded-full, rounded-3xl
- 透明效果 bg-white/60 backdrop-blur
- 彩虹渐变 from-pink-400 via-purple-400 to-cyan-400
- 气泡/球体装饰元素

## 配色

主色调：
- 银色: #c0c0c0, from-gray-300
- 粉色: #ff69b4, from-pink-400
- 青色: #00ffff, from-cyan-400
- 紫色: #ff00ff, from-purple-400

## 装饰元素

- 星星/闪光装饰
- 气泡球体
- 彩虹渐变
- 透明塑料质感`,examplePrompts:[{title:"时尚品牌官网",titleEn:"Fashion Brand Website",description:"千禧风格时尚网站",descriptionEn:"Y2K fashion website",prompt:`用 Y2K 风格创建一个时尚品牌官网，要求：
1. 背景：粉白渐变 + 气泡装饰
2. 导航：透明毛玻璃效果
3. 产品卡片：金属光泽边框
4. 按钮：圆润 + 彩虹渐变
5. 添加星星闪光装饰`}]},{slug:"memphis",name:"孟菲斯风格",nameEn:"Memphis",description:"80年代意大利设计运动，大胆的几何图形、鲜艳的撞色、不规则形状和有趣的图案，打破传统设计规则。",cover:"/styles/memphis.svg",styleType:"visual",tags:["retro","expressive","high-contrast"],category:"retro",colors:{primary:"#ff6b6b",secondary:"#feca57",accent:["#48dbfb","#ff9ff3","#1dd1a1","#5f27cd"]},keywords:["孟菲斯","几何","撞色","80年代","波普","图案","大胆"],philosophy:`Memphis（孟菲斯）是1980年代由意大利设计师 Ettore Sottsass 创立的设计运动，以打破传统、拥抱混乱和趣味性著称。

核心理念：
- 反叛传统：打破功能主义的严肃设计
- 大胆撞色：鲜艳、对比强烈的色彩组合
- 几何图形：圆形、三角形、波浪线的自由组合
- 趣味性：设计应该有趣、令人愉悦`,doList:["使用鲜艳的撞色组合","添加几何图形装饰（圆、三角、波浪）","使用粗边框 border-4","不规则的布局和形状","添加点状、条纹、波浪图案","使用粗体无衬线字体"],dontList:["禁止使用单调的配色","禁止过于对称规整的布局","禁止使用细边框","禁止省略几何装饰元素"],components:{button:{name:"按钮",description:"孟菲斯风格按钮",code:`<button className="
  relative px-8 py-4
  bg-yellow-400
  border-4 border-black
  text-black font-black uppercase
  shadow-[6px_6px_0px_#000]
  hover:shadow-[3px_3px_0px_#000]
  hover:translate-x-[3px] hover:translate-y-[3px]
  transition-all duration-150
">
  <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full" />
  Click Me!
</button>`},card:{name:"卡片",description:"孟菲斯风格卡片",code:`<div className="
  relative p-8
  bg-pink-300
  border-4 border-black
  shadow-[8px_8px_0px_#000]
">
  {/* Decorative shapes */}
  <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full border-2 border-black" />
  <div className="absolute -bottom-3 -right-3 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-cyan-400 border-r-[20px] border-r-transparent" />

  <h3 className="text-2xl font-black text-black mb-3">
    MEMPHIS
  </h3>
  <p className="text-black/80 font-medium">
    Bold, colorful, and fun!
  </p>
</div>`},input:{name:"输入框",description:"孟菲斯风格输入框",code:`<input
  type="text"
  placeholder="Type here..."
  className="
    w-full px-6 py-4
    bg-white
    border-4 border-black
    text-black font-bold placeholder-gray-400
    shadow-[4px_4px_0px_#48dbfb]
    focus:shadow-[4px_4px_0px_#ff6b6b]
    focus:outline-none
    transition-all
  "
/>`},hero:{name:"Hero 区块",description:"孟菲斯风格 Hero",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-br from-yellow-300 via-pink-300 to-cyan-300
  relative overflow-hidden
  px-6 py-20
">
  {/* Decorative elements */}
  <div className="absolute top-20 left-20 w-20 h-20 bg-red-500 rounded-full border-4 border-black" />
  <div className="absolute bottom-32 right-20 w-16 h-16 bg-blue-500 border-4 border-black rotate-45" />
  <div className="absolute top-40 right-40 w-0 h-0 border-l-[30px] border-l-transparent border-b-[50px] border-b-green-400 border-r-[30px] border-r-transparent" />

  <div className="relative z-10 text-center">
    <h1 className="text-6xl md:text-8xl font-black text-black mb-6" style="text-shadow: 4px 4px 0 #ff6b6b, 8px 8px 0 #48dbfb">
      MEMPHIS
    </h1>
    <p className="text-xl font-bold text-black/80 mb-8">
      Design should be fun!
    </p>
    <button className="
      px-10 py-5
      bg-yellow-400
      border-4 border-black
      text-black font-black text-lg uppercase
      shadow-[8px_8px_0px_#000]
      hover:shadow-[4px_4px_0px_#000]
      hover:translate-x-1 hover:translate-y-1
      transition-all
    ">
      Let's Go!
    </button>
  </div>
</section>`}},globalCss:`/* Memphis 全局样式 */

:root {
  --memphis-red: #ff6b6b;
  --memphis-yellow: #feca57;
  --memphis-cyan: #48dbfb;
  --memphis-pink: #ff9ff3;
  --memphis-green: #1dd1a1;
  --memphis-purple: #5f27cd;
}

/* 孟菲斯阴影 */
.memphis-shadow {
  box-shadow: 6px 6px 0px #000;
}

/* 波浪线背景 */
.memphis-waves {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q25 0 50 10 T100 10' stroke='%23000' stroke-width='2' fill='none'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
}

/* 点状图案 */
.memphis-dots {
  background-image: radial-gradient(#000 2px, transparent 2px);
  background-size: 20px 20px;
}

/* 条纹图案 */
.memphis-stripes {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    #000 10px,
    #000 12px
  );
}`,aiRules:`你是一个 Memphis 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用单调、低饱和度的配色
- 使用过于对称规整的布局
- 使用细边框 border
- 省略几何装饰元素

## 必须遵守

- 鲜艳撞色 bg-yellow-400, bg-pink-300, bg-cyan-400
- 粗边框 border-4 border-black
- 硬边阴影 shadow-[6px_6px_0px_#000]
- 几何装饰（圆形、三角形、方形）
- 粗体字 font-black, font-bold

## 配色

主色调：
- 红色: #ff6b6b, bg-red-500
- 黄色: #feca57, bg-yellow-400
- 青色: #48dbfb, bg-cyan-400
- 粉色: #ff9ff3, bg-pink-300
- 绿色: #1dd1a1, bg-green-400

## 装饰元素

- 圆形 rounded-full
- 三角形（用 border 实现）
- 方形 rotate-45
- 波浪线、点状、条纹图案`,examplePrompts:[{title:"创意工作室官网",titleEn:"Creative Studio Website",description:"大胆有趣的创意网站",descriptionEn:"Bold and fun creative website",prompt:`用 Memphis 风格创建一个创意工作室官网，要求：
1. 背景：多彩渐变 + 几何装饰
2. 标题：粗体 + 多层阴影
3. 卡片：粗边框 + 硬阴影
4. 按钮：鲜艳撞色
5. 添加圆形、三角形装饰`}]},{slug:"art-deco",name:"装饰艺术风格",nameEn:"Art Deco",description:"1920-30年代的奢华设计风格，几何对称图案、金色装饰、优雅线条和高端质感，传达精致与繁荣。",cover:"/styles/art-deco.svg",styleType:"visual",tags:["retro","expressive"],category:"retro",colors:{primary:"#d4af37",secondary:"#1a1a2e",accent:["#c9a227","#2d2d44","#f5f5dc"]},keywords:["装饰艺术","奢华","金色","几何","1920年代","优雅","高端"],philosophy:`Art Deco（装饰艺术）是1920-30年代流行的设计风格，融合了现代主义的几何形式与传统工艺的奢华感。

核心理念：
- 几何对称：放射状线条、重复几何图案
- 奢华感：金色、黑色、深蓝的高端配色
- 精致工艺：细腻的线条和装饰细节
- 现代与传统：机械时代美学与古典优雅的结合`,doList:["使用金色和深色的高对比配色","添加几何对称图案和放射状线条","使用优雅的衬线字体","添加金色边框和装饰线","保持对称和平衡的布局","使用细腻的线条装饰"],dontList:["禁止使用过于鲜艳的配色","禁止使用不对称的混乱布局","禁止使用过于现代的无衬线字体","禁止省略装饰性元素"],components:{button:{name:"按钮",description:"装饰艺术风格按钮",code:`<button className="
  px-10 py-4
  bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600
  text-black font-semibold uppercase tracking-[0.3em]
  border-2 border-yellow-400
  shadow-[0_0_20px_rgba(212,175,55,0.3)]
  hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]
  hover:bg-gradient-to-r hover:from-yellow-500 hover:via-yellow-400 hover:to-yellow-500
  transition-all duration-300
">
  Discover
</button>`},card:{name:"卡片",description:"装饰艺术风格卡片",code:`<div className="
  relative p-8
  bg-gradient-to-b from-slate-900 to-slate-800
  border border-yellow-600/50
">
  {/* Corner decorations */}
  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-500" />
  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-yellow-500" />
  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-yellow-500" />
  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500" />

  <h3 className="text-2xl font-serif text-yellow-500 text-center mb-4 tracking-wider">
    ELEGANCE
  </h3>
  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-4" />
  <p className="text-gray-400 text-center">
    Timeless sophistication
  </p>
</div>`},input:{name:"输入框",description:"装饰艺术风格输入框",code:`<input
  type="text"
  placeholder="Enter your name..."
  className="
    w-full px-6 py-4
    bg-slate-900
    border border-yellow-600/50
    text-yellow-100 placeholder-yellow-600/50
    font-serif tracking-wider
    focus:border-yellow-500
    focus:shadow-[0_0_15px_rgba(212,175,55,0.2)]
    focus:outline-none
    transition-all
  "
/>`},hero:{name:"Hero 区块",description:"装饰艺术风格 Hero",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
  relative overflow-hidden
">
  {/* Radial lines decoration */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent origin-left"
          style={{ transform: \`rotate(\${i * 30}deg)\` }}
        />
      ))}
    </div>
  </div>

  <div className="relative z-10 text-center px-6">
    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
    <h1 className="text-5xl md:text-7xl font-serif text-yellow-500 mb-6 tracking-[0.2em]">
      ART DECO
    </h1>
    <p className="text-xl text-gray-400 mb-8 tracking-wider">
      The Golden Age of Design
    </p>
    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
    <button className="
      px-12 py-4
      bg-transparent
      border-2 border-yellow-500
      text-yellow-500 font-serif uppercase tracking-[0.3em]
      hover:bg-yellow-500 hover:text-slate-900
      transition-all duration-300
    ">
      Enter
    </button>
  </div>
</section>`}},globalCss:`/* Art Deco 全局样式 */

:root {
  --deco-gold: #d4af37;
  --deco-dark: #1a1a2e;
  --deco-navy: #2d2d44;
  --deco-cream: #f5f5dc;
}

/* 金色渐变 */
.deco-gold {
  background: linear-gradient(135deg, #d4af37 0%, #f5d67a 50%, #d4af37 100%);
}

/* 放射状线条 */
.deco-sunburst {
  background-image: repeating-conic-gradient(
    from 0deg,
    transparent 0deg 15deg,
    rgba(212, 175, 55, 0.1) 15deg 30deg
  );
}

/* 几何边框 */
.deco-border {
  border: 1px solid var(--deco-gold);
  position: relative;
}

.deco-border::before,
.deco-border::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid var(--deco-gold);
}

.deco-border::before {
  top: -5px;
  left: -5px;
  border-right: none;
  border-bottom: none;
}

.deco-border::after {
  bottom: -5px;
  right: -5px;
  border-left: none;
  border-top: none;
}

/* 装饰分隔线 */
.deco-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--deco-gold), transparent);
}`,aiRules:`你是一个 Art Deco 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用过于鲜艳的现代配色
- 使用不对称的混乱布局
- 使用圆润的现代字体
- 省略装饰性边框和线条

## 必须遵守

- 金色配色 text-yellow-500, border-yellow-500
- 深色背景 bg-slate-900, bg-slate-800
- 衬线字体 font-serif
- 宽字距 tracking-wider, tracking-[0.3em]
- 对称布局和居中对齐
- 几何装饰元素

## 配色

主色调：
- 金色: #d4af37, text-yellow-500, border-yellow-500
- 深蓝: #1a1a2e, bg-slate-900
- 海军蓝: #2d2d44, bg-slate-800
- 奶油色: #f5f5dc

## 装饰元素

- 角落装饰边框
- 放射状线条
- 渐变分隔线
- 几何图案`,examplePrompts:[{title:"奢侈品牌官网",titleEn:"Luxury Brand Website",description:"高端奢华的品牌网站",descriptionEn:"High-end luxury brand website",prompt:`用 Art Deco 风格创建一个奢侈品牌官网，要求：
1. 背景：深色渐变
2. 标题：金色衬线字体 + 宽字距
3. 装饰：放射状线条 + 角落边框
4. 按钮：金色边框 + 悬停填充
5. 整体对称优雅`}]},{slug:"bauhaus",name:"包豪斯风格",nameEn:"Bauhaus",description:"德国包豪斯学派的设计理念，强调功能主义、几何形式和原色运用，形式追随功能的现代主义经典。",cover:"/styles/bauhaus.svg",styleType:"visual",tags:["modern","minimal","high-contrast"],category:"modern",colors:{primary:"#000000",secondary:"#ffffff",accent:["#ff0000","#ffcc00","#0000ff"]},keywords:["包豪斯","功能主义","几何","原色","现代主义","极简"],philosophy:`Bauhaus（包豪斯）是1919年在德国创立的设计学派，其核心理念"形式追随功能"深刻影响了现代设计。

核心理念：
- 功能主义：设计服务于功能，去除多余装饰
- 几何形式：圆形、方形、三角形的纯粹运用
- 原色运用：红、黄、蓝三原色 + 黑白
- 统一性：艺术与工艺的结合`,doList:["使用原色（红、黄、蓝）+ 黑白","运用基础几何形状（圆、方、三角）","保持简洁的功能性设计","使用无衬线字体","强调网格和对齐","去除不必要的装饰"],dontList:["禁止使用复杂的渐变","禁止使用装饰性元素","禁止使用衬线字体","禁止使用非原色的复杂配色"],components:{button:{name:"按钮",description:"包豪斯风格按钮",code:`<button className="
  px-8 py-4
  bg-red-600
  text-white font-bold uppercase tracking-wider
  hover:bg-black
  transition-colors duration-200
">
  Action
</button>`},card:{name:"卡片",description:"包豪斯风格卡片",code:`<div className="
  relative p-8
  bg-white
  border-4 border-black
">
  {/* Geometric decoration */}
  <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-400 rounded-full" />
  <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-blue-600" />

  <h3 className="text-2xl font-bold text-black uppercase tracking-wider mb-4">
    Form
  </h3>
  <p className="text-gray-700">
    Follows function
  </p>
</div>`},input:{name:"输入框",description:"包豪斯风格输入框",code:`<input
  type="text"
  placeholder="Type here"
  className="
    w-full px-6 py-4
    bg-white
    border-4 border-black
    text-black font-medium placeholder-gray-400
    focus:border-red-600
    focus:outline-none
    transition-colors
  "
/>`},hero:{name:"Hero 区块",description:"包豪斯风格 Hero",code:`<section className="
  min-h-screen
  flex items-center
  bg-white
  relative overflow-hidden
">
  {/* Geometric shapes */}
  <div className="absolute top-20 right-20 w-48 h-48 bg-yellow-400 rounded-full" />
  <div className="absolute bottom-20 right-40 w-32 h-32 bg-blue-600" />
  <div className="absolute top-40 right-60 w-0 h-0 border-l-[60px] border-l-transparent border-b-[100px] border-b-red-600 border-r-[60px] border-r-transparent" />

  <div className="relative z-10 px-12 max-w-2xl">
    <h1 className="text-7xl md:text-9xl font-black text-black uppercase leading-none mb-8">
      BAU
      <br />
      HAUS
    </h1>
    <p className="text-xl text-gray-700 mb-8 max-w-md">
      Form follows function. Less is more.
    </p>
    <button className="
      px-10 py-4
      bg-black
      text-white font-bold uppercase tracking-wider
      hover:bg-red-600
      transition-colors
    ">
      Explore
    </button>
  </div>
</section>`}},globalCss:`/* Bauhaus 全局样式 */

:root {
  --bauhaus-red: #ff0000;
  --bauhaus-yellow: #ffcc00;
  --bauhaus-blue: #0000ff;
  --bauhaus-black: #000000;
  --bauhaus-white: #ffffff;
}

/* 原色类 */
.bauhaus-red { background-color: var(--bauhaus-red); }
.bauhaus-yellow { background-color: var(--bauhaus-yellow); }
.bauhaus-blue { background-color: var(--bauhaus-blue); }

/* 几何形状 */
.bauhaus-circle {
  border-radius: 50%;
}

.bauhaus-triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 86px solid var(--bauhaus-red);
}

/* 网格系统 */
.bauhaus-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}`,aiRules:`你是一个 Bauhaus 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用复杂的渐变效果
- 使用装饰性元素
- 使用衬线字体
- 使用非原色的复杂配色

## 必须遵守

- 原色配色 bg-red-600, bg-yellow-400, bg-blue-600
- 黑白基础 bg-black, bg-white, text-black
- 粗边框 border-4 border-black
- 无衬线字体 font-bold, font-black
- 大写字母 uppercase
- 几何形状装饰

## 配色

仅使用：
- 红色: #ff0000, bg-red-600
- 黄色: #ffcc00, bg-yellow-400
- 蓝色: #0000ff, bg-blue-600
- 黑色: #000000, bg-black
- 白色: #ffffff, bg-white

## 几何元素

- 圆形 rounded-full
- 方形（无圆角）
- 三角形（用 border 实现）`,examplePrompts:[{title:"设计学院官网",titleEn:"Design School Website",description:"现代主义设计学院网站",descriptionEn:"Modernist design school website",prompt:`用 Bauhaus 风格创建一个设计学院官网，要求：
1. 配色：仅使用红黄蓝 + 黑白
2. 几何装饰：圆形、方形、三角形
3. 字体：粗体无衬线 + 大写
4. 布局：网格对齐
5. 去除所有装饰性元素`}]},{slug:"skeuomorphism",name:"拟物设计",nameEn:"Skeuomorphism",description:"模拟真实世界物体的数字设计风格，通过纹理、光影、材质模仿现实物品，带来熟悉感和直觉性体验。",cover:"/styles/skeuomorphism.svg",styleType:"visual",tags:["retro","expressive"],category:"retro",colors:{primary:"#8b7355",secondary:"#d4c4a8",accent:["#c9a227","#5c4033","#2e5a3c"]},keywords:["拟物","写实","纹理","质感","真实","3D","阴影"],philosophy:`Skeuomorphism（拟物设计）是一种模拟真实世界物体外观和行为的设计方法，曾在早期 iOS 和数字产品中广泛使用。

核心理念：
- 真实模拟：界面元素模仿现实物品的外观和触感
- 材质纹理：皮革、木材、金属等真实材质纹理
- 光影深度：通过高光、阴影创造立体感
- 熟悉直觉：利用用户对现实世界的认知减少学习成本`,doList:["使用真实材质纹理（皮革、木材、金属）","添加逼真的光影效果","模拟物理按钮的按压反馈","使用渐变创造立体感","添加细腻的边缘高光","模拟真实物品的形态和比例"],dontList:["禁止使用纯扁平的色块","禁止省略阴影和高光","禁止使用过于简化的图标","禁止忽视材质细节"],components:{button:{name:"按钮",description:"拟物风格按钮",code:`<button className="
  px-8 py-4
  bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300
  border border-gray-400
  rounded-lg
  text-gray-700 font-semibold
  shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.1)]
  hover:from-gray-200 hover:via-gray-300 hover:to-gray-400
  active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]
  active:translate-y-[1px]
  transition-all duration-100
">
  Press Me
</button>`},card:{name:"卡片",description:"拟物风格卡片",code:`<div className="
  p-6
  bg-gradient-to-b from-amber-50 to-amber-100
  border border-amber-300
  rounded-xl
  shadow-[0_8px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.5)]
  relative overflow-hidden
">
  {/* Leather texture overlay */}
  <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,...')] pointer-events-none" />
  <h3 className="text-xl font-bold text-amber-900 mb-2">
    Leather Card
  </h3>
  <p className="text-amber-800">
    Realistic texture and depth
  </p>
</div>`},input:{name:"输入框",description:"拟物风格输入框",code:`<input
  type="text"
  placeholder="Type here..."
  className="
    w-full px-4 py-3
    bg-gradient-to-b from-white to-gray-100
    border border-gray-300
    rounded-lg
    text-gray-700
    shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.8)]
    focus:outline-none focus:ring-2 focus:ring-blue-400
    focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15),0_0_8px_rgba(59,130,246,0.3)]
    transition-all
  "
/>`},hero:{name:"Hero 区块",description:"拟物风格 Hero",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-stone-200 via-stone-300 to-stone-400
  relative
">
  {/* Wood texture background */}
  <div className="absolute inset-0 opacity-20 bg-repeat" style="background-image: url('wood-texture.png')" />

  <div className="relative z-10 text-center p-8 bg-gradient-to-b from-white/90 to-gray-100/90 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.8)] border border-white/50">
    <h1 className="text-5xl font-bold text-gray-800 mb-4" style="text-shadow: 0 1px 0 rgba(255,255,255,0.8)">
      Skeuomorphism
    </h1>
    <p className="text-xl text-gray-600 mb-6">
      Digital meets physical
    </p>
    <button className="px-8 py-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg text-white font-bold shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)]">
      Explore
    </button>
  </div>
</section>`}},globalCss:`/* Skeuomorphism 全局样式 */

:root {
  --skeu-leather: #8b7355;
  --skeu-wood: #d4c4a8;
  --skeu-metal: #c0c0c0;
  --skeu-paper: #f5f5dc;
}

/* 金属质感按钮 */
.skeu-metal-button {
  background: linear-gradient(180deg, #e8e8e8 0%, #c0c0c0 50%, #a8a8a8 100%);
  border: 1px solid #888;
  box-shadow:
    0 4px 8px rgba(0,0,0,0.3),
    inset 0 1px 0 rgba(255,255,255,0.8),
    inset 0 -1px 0 rgba(0,0,0,0.2);
}

/* 凹陷效果 */
.skeu-inset {
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.2), inset 0 -1px 0 rgba(255,255,255,0.5);
}

/* 凸起效果 */
.skeu-raised {
  box-shadow: 0 4px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5);
}`,aiRules:`你是一个 Skeuomorphism 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用纯扁平的色块
- 省略阴影和高光效果
- 使用过于简化的图标
- 忽视材质和纹理细节

## 必须遵守

- 渐变背景 bg-gradient-to-b from-gray-100 to-gray-300
- 复杂阴影 shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.8)]
- 边框层次 border border-gray-400
- 圆角适中 rounded-lg
- 按压反馈 active:translate-y-[1px]

## 配色

- 使用自然材质色调
- 皮革棕: #8b7355
- 木材米: #d4c4a8
- 金属银: #c0c0c0
- 纸张白: #f5f5dc

## 光影原则

- 顶部高光 (inset 0 1px 0 rgba(255,255,255,0.8))
- 底部暗边 (inset 0 -1px 0 rgba(0,0,0,0.1))
- 外部投影 (0 4px 8px rgba(0,0,0,0.3))`,examplePrompts:[{title:"复古音乐播放器",titleEn:"Retro Music Player",description:"仿真实收音机的音乐播放界面",descriptionEn:"Music player mimicking real radio",prompt:`用 Skeuomorphism 风格创建一个复古音乐播放器界面，要求：
1. 背景：模拟木质或金属材质
2. 按钮：带有真实按压感的 3D 效果
3. 旋钮：模拟真实旋钮的外观
4. 显示屏：模拟 LCD 或复古显示器
5. 整体有复古电子设备的质感`}]},{slug:"swiss-style",name:"瑞士国际风格",nameEn:"Swiss International",description:"源于瑞士的理性主义设计风格，强调网格系统、无衬线字体、清晰层次和客观信息传达，是现代平面设计的基石。",cover:"/styles/swiss-style.svg",styleType:"visual",tags:["modern","minimal"],category:"modern",colors:{primary:"#000000",secondary:"#ffffff",accent:["#ff0000","#0057b8","#ffcc00"]},keywords:["瑞士","国际主义","网格","Helvetica","理性","排版","极简"],philosophy:`Swiss International Style（瑞士国际风格）是20世纪50年代在瑞士发展起来的设计运动，强调清晰、客观、理性的视觉传达。

核心理念：
- 网格系统：严格的数学网格控制布局
- 无衬线字体：Helvetica 等清晰易读的字体
- 负空间：大量留白增强可读性
- 客观传达：设计服务于信息，而非装饰`,doList:["使用严格的网格系统","选用 Helvetica 或类似的无衬线字体","保持大量负空间","使用黑白为主的配色","文字左对齐，避免居中","使用简洁的几何图形"],dontList:["禁止使用装饰性元素","禁止使用衬线字体作为正文","禁止过度装饰或渐变","禁止打破网格系统"],components:{button:{name:"按钮",description:"瑞士风格按钮",code:`<button className="
  px-6 py-3
  bg-black
  text-white text-sm font-medium uppercase tracking-[0.2em]
  hover:bg-red-600
  transition-colors duration-200
">
  Action
</button>`},card:{name:"卡片",description:"瑞士风格卡片",code:`<div className="
  p-8
  bg-white
  border-l-4 border-black
">
  <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-2">
    Category
  </p>
  <h3 className="text-2xl font-bold text-black mb-4">
    Helvetica Neue
  </h3>
  <p className="text-gray-700 leading-relaxed">
    Clean, objective, rational design principles.
  </p>
</div>`},input:{name:"输入框",description:"瑞士风格输入框",code:`<div>
  <label className="block text-xs font-medium uppercase tracking-[0.2em] text-gray-500 mb-2">
    Email
  </label>
  <input
    type="text"
    placeholder="your@email.com"
    className="
      w-full px-0 py-2
      bg-transparent
      border-0 border-b-2 border-black
      text-black
      focus:outline-none focus:border-red-600
      transition-colors
    "
  />
</div>`},hero:{name:"Hero 区块",description:"瑞士风格 Hero",code:`<section className="
  min-h-screen
  bg-white
  px-8 py-20
  grid grid-cols-12 gap-8
">
  <div className="col-span-8">
    <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4">
      International Style
    </p>
    <h1 className="text-7xl md:text-9xl font-bold text-black leading-none mb-8">
      Swiss
      <br />
      Design
    </h1>
    <p className="text-xl text-gray-700 max-w-md leading-relaxed mb-8">
      The grid is the foundation. Typography is the voice. Clarity is the goal.
    </p>
    <button className="px-8 py-4 bg-black text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-red-600 transition-colors">
      Explore
    </button>
  </div>
  <div className="col-span-4 flex items-center justify-center">
    <div className="w-32 h-32 bg-red-600" />
  </div>
</section>`}},globalCss:`/* Swiss International Style 全局样式 */

:root {
  --swiss-black: #000000;
  --swiss-white: #ffffff;
  --swiss-red: #ff0000;
  --swiss-blue: #0057b8;
}

/* 网格系统 */
.swiss-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

/* 标题样式 */
.swiss-heading {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 0.9;
}

/* 标签样式 */
.swiss-label {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #6b7280;
}

/* 左边框强调 */
.swiss-accent {
  border-left: 4px solid var(--swiss-black);
  padding-left: 1.5rem;
}`,aiRules:`你是一个 Swiss International Style 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用装饰性元素
- 使用衬线字体
- 过度装饰或渐变效果
- 打破网格系统

## 必须遵守

- 12列网格系统 grid-cols-12
- 无衬线字体 font-sans
- 大量留白 p-8, gap-8
- 黑白为主 bg-black, text-white, bg-white, text-black
- 红色强调 bg-red-600, text-red-600
- 大写标签 uppercase tracking-[0.2em]
- 左对齐文本

## 配色

仅使用：
- 黑色: #000000
- 白色: #ffffff
- 红色: #ff0000 (强调色)
- 蓝色: #0057b8 (可选强调)

## 排版

- 标题：超大字号、粗体、紧凑行高
- 标签：小号、大写、宽字距
- 正文：适中字号、充足行高`,examplePrompts:[{title:"设计工作室官网",titleEn:"Design Studio Website",description:"极简理性的设计工作室网站",descriptionEn:"Minimal rational design studio website",prompt:`用 Swiss International Style 创建一个设计工作室官网，要求：
1. 布局：严格的12列网格
2. 字体：无衬线字体，大标题
3. 配色：黑白为主，红色点缀
4. 大量留白
5. 简洁的几何装饰`}]},{slug:"ghibli-style",name:"吉卜力风格",nameEn:"Ghibli Style",description:"灵感源自吉卜力工作室动画的设计风格，温暖柔和的色调、手绘质感、自然元素和梦幻氛围，传递治愈与诗意。",cover:"/styles/ghibli-style.svg",styleType:"visual",tags:["expressive","retro"],category:"expressive",colors:{primary:"#7cb9a8",secondary:"#f4e4bc",accent:["#e8a87c","#85cdca","#c38d94"]},keywords:["吉卜力","宫崎骏","手绘","治愈","自然","梦幻","动画"],philosophy:`Ghibli Style（吉卜力风格）受日本吉卜力工作室动画影响，以温暖、治愈、富有诗意的视觉语言著称。

核心理念：
- 手绘质感：保留手工绘制的温度和不完美
- 自然主题：云朵、森林、天空等自然元素
- 柔和色调：温暖的大地色系和天空色
- 梦幻氛围：创造宁静治愈的视觉体验`,doList:["使用柔和温暖的色调","添加手绘风格的插图或边框","融入自然元素（云、树、花）","使用圆润柔和的形状","添加微妙的纹理效果","创造梦幻般的渐变背景"],dontList:["禁止使用过于锐利的边缘","禁止使用高对比的刺眼配色","禁止使用冰冷的科技感元素","禁止过于复杂的动效"],components:{button:{name:"按钮",description:"吉卜力风格按钮",code:`<button className="
  px-8 py-4
  bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a]
  text-white font-medium
  rounded-full
  border-2 border-[#5a9a8a]/30
  shadow-[0_4px_14px_rgba(124,185,168,0.4)]
  hover:shadow-[0_6px_20px_rgba(124,185,168,0.5)]
  hover:-translate-y-0.5
  transition-all duration-300
">
  Begin Journey
</button>`},card:{name:"卡片",description:"吉卜力风格卡片",code:`<div className="
  p-6
  bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90
  rounded-3xl
  border border-[#d4c49a]/50
  shadow-[0_8px_30px_rgba(0,0,0,0.08)]
  backdrop-blur-sm
">
  <div className="w-16 h-16 bg-gradient-to-br from-[#85cdca] to-[#7cb9a8] rounded-full flex items-center justify-center mb-4">
    {/* Cloud icon */}
    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
    </svg>
  </div>
  <h3 className="text-xl font-semibold text-[#5a4a3a] mb-2">
    Sky Garden
  </h3>
  <p className="text-[#7a6a5a]">
    Where dreams float among the clouds
  </p>
</div>`},input:{name:"输入框",description:"吉卜力风格输入框",code:`<input
  type="text"
  placeholder="Write your story..."
  className="
    w-full px-5 py-4
    bg-[#f4e4bc]/60
    border-2 border-[#d4c49a]/40
    rounded-2xl
    text-[#5a4a3a] placeholder-[#a89a7a]
    focus:outline-none focus:border-[#7cb9a8]
    focus:bg-[#f4e4bc]/80
    transition-all duration-300
  "
/>`},hero:{name:"Hero 区块",description:"吉卜力风格 Hero",code:`<section className="
  min-h-screen
  bg-gradient-to-b from-[#87ceeb] via-[#b4e4f5] to-[#f4e4bc]
  relative overflow-hidden
  flex items-center justify-center
  px-6
">
  {/* Clouds */}
  <div className="absolute top-20 left-10 w-32 h-16 bg-white/60 rounded-full blur-sm" />
  <div className="absolute top-32 right-20 w-40 h-20 bg-white/50 rounded-full blur-sm" />
  <div className="absolute top-16 right-40 w-24 h-12 bg-white/40 rounded-full blur-sm" />

  <div className="relative z-10 text-center max-w-2xl">
    <h1 className="text-5xl md:text-7xl font-semibold text-[#5a4a3a] mb-6 leading-tight">
      A World of
      <br />
      <span className="text-[#7cb9a8]">Wonder</span>
    </h1>
    <p className="text-xl text-[#7a6a5a] mb-8 leading-relaxed">
      Where every journey begins with a single step into the magical unknown.
    </p>
    <button className="px-10 py-4 bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white font-medium rounded-full shadow-[0_4px_20px_rgba(124,185,168,0.4)] hover:-translate-y-1 transition-all duration-300">
      Start Adventure
    </button>
  </div>
</section>`}},globalCss:`/* Ghibli Style 全局样式 */

:root {
  --ghibli-sage: #7cb9a8;
  --ghibli-cream: #f4e4bc;
  --ghibli-coral: #e8a87c;
  --ghibli-sky: #85cdca;
  --ghibli-rose: #c38d94;
  --ghibli-brown: #5a4a3a;
}

/* 柔和渐变背景 */
.ghibli-sky-gradient {
  background: linear-gradient(180deg, #87ceeb 0%, #b4e4f5 50%, #f4e4bc 100%);
}

/* 手绘风格边框 */
.ghibli-border {
  border: 2px solid rgba(212, 196, 154, 0.5);
  border-radius: 1.5rem;
}

/* 云朵样式 */
.ghibli-cloud {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 9999px;
  filter: blur(4px);
}

/* 柔和阴影 */
.ghibli-shadow {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}`,aiRules:`你是一个 Ghibli Style 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用锐利的直角边缘
- 使用高对比刺眼的配色
- 使用冰冷的科技感元素
- 过于复杂的动效

## 必须遵守

- 柔和色调 from-[#7cb9a8], bg-[#f4e4bc]
- 圆润形状 rounded-full, rounded-3xl, rounded-2xl
- 温和渐变 bg-gradient-to-b, bg-gradient-to-br
- 柔和阴影 shadow-[0_8px_30px_rgba(0,0,0,0.08)]
- 自然元素装饰

## 配色

主色调：
- 鼠尾草绿: #7cb9a8
- 奶油色: #f4e4bc
- 珊瑚橙: #e8a87c
- 天空蓝: #85cdca
- 玫瑰粉: #c38d94
- 深棕色: #5a4a3a (文字)

## 装饰元素

- 云朵形状
- 柔和的圆形
- 自然图案
- 渐变背景`,examplePrompts:[{title:"治愈系个人博客",titleEn:"Healing Personal Blog",description:"温暖治愈的个人博客",descriptionEn:"Warm and healing personal blog",prompt:`用 Ghibli Style 创建一个治愈系个人博客，要求：
1. 背景：天空到大地的柔和渐变
2. 装饰：云朵、自然元素
3. 配色：鼠尾草绿、奶油色、天空蓝
4. 圆润的卡片和按钮
5. 整体传递温暖治愈的感觉`}]},{slug:"material-design",name:"材料设计",nameEn:"Material Design",description:"Google 推出的设计系统，基于纸张和墨水的隐喻，强调层次、动效、大胆色彩和响应式交互，是现代移动端设计的标准。",cover:"/styles/material-design.svg",styleType:"visual",tags:["modern","brand-inspired"],category:"modern",colors:{primary:"#6200ee",secondary:"#03dac6",accent:["#ff0266","#ffde03","#00c853"]},keywords:["Material","Google","层次","动效","海拔","涟漪","卡片"],philosophy:`Material Design（材料设计）是 Google 在 2014 年推出的设计语言，将数字界面比作有物理属性的纸张和墨水。

核心理念：
- 材料隐喻：界面如同有厚度的纸张，可堆叠、移动
- 海拔系统：通过阴影表达层次关系
- 大胆色彩：鲜明的主色和强调色
- 有意义的动效：动画传达空间关系和反馈`,doList:["使用海拔阴影系统表达层次","应用涟漪效果作为点击反馈","使用大胆鲜明的色彩","保持 8dp 的间距网格","使用 Roboto 字体","添加有意义的微动效"],dontList:["禁止使用不一致的阴影深度","禁止使用过于柔和的配色","禁止省略交互反馈","禁止打破 8dp 网格系统"],components:{button:{name:"按钮",description:"Material 风格按钮",code:`<button className="
  px-6 py-3
  bg-[#6200ee]
  text-white font-medium uppercase tracking-wider text-sm
  rounded-full
  shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0_rgba(0,0,0,0.14),0_1px_18px_0_rgba(0,0,0,0.12)]
  hover:shadow-[0_5px_5px_-3px_rgba(0,0,0,0.2),0_8px_10px_1px_rgba(0,0,0,0.14),0_3px_14px_2px_rgba(0,0,0,0.12)]
  hover:bg-[#7c4dff]
  active:bg-[#651fff]
  transition-all duration-200
  relative overflow-hidden
">
  Click Me
</button>`},card:{name:"卡片",description:"Material 风格卡片",code:`<div className="
  bg-white
  rounded-xl
  shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]
  hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)]
  transition-shadow duration-300
  overflow-hidden
">
  <div className="h-40 bg-gradient-to-br from-[#6200ee] to-[#b388ff]" />
  <div className="p-6">
    <h3 className="text-xl font-medium text-gray-900 mb-2">
      Material Card
    </h3>
    <p className="text-gray-600">
      Surfaces that cast shadows based on elevation.
    </p>
  </div>
</div>`},input:{name:"输入框",description:"Material 风格输入框",code:`<div className="relative">
  <input
    type="text"
    placeholder=" "
    className="
      peer w-full px-4 pt-5 pb-2
      bg-gray-100
      border-0 border-b-2 border-gray-300
      rounded-t-lg
      text-gray-900
      focus:outline-none focus:border-[#6200ee]
      focus:bg-gray-50
      transition-all
    "
  />
  <label className="
    absolute left-4 top-4
    text-gray-500 text-sm
    transition-all duration-200
    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
    peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#6200ee]
    peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs
  ">
    Email Address
  </label>
</div>`},hero:{name:"Hero 区块",description:"Material 风格 Hero",code:`<section className="
  min-h-screen
  bg-[#fafafa]
  relative
">
  {/* App Bar */}
  <nav className="fixed top-0 left-0 right-0 h-16 bg-[#6200ee] shadow-[0_2px_4px_-1px_rgba(0,0,0,0.2),0_4px_5px_0_rgba(0,0,0,0.14),0_1px_10px_0_rgba(0,0,0,0.12)] flex items-center px-6 z-50">
    <h1 className="text-white font-medium text-xl">Material Design</h1>
  </nav>

  <div className="pt-24 px-6 max-w-4xl mx-auto">
    <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] overflow-hidden">
      <div className="h-64 bg-gradient-to-br from-[#6200ee] via-[#7c4dff] to-[#b388ff] flex items-center justify-center">
        <h2 className="text-5xl font-bold text-white">Welcome</h2>
      </div>
      <div className="p-8">
        <p className="text-xl text-gray-700 mb-6">
          Build beautiful, usable products faster with Material Design.
        </p>
        <button className="px-6 py-3 bg-[#03dac6] text-black font-medium rounded-full shadow-md hover:shadow-lg transition-all">
          Get Started
        </button>
      </div>
    </div>
  </div>
</section>`}},globalCss:`/* Material Design 全局样式 */

:root {
  --md-primary: #6200ee;
  --md-primary-variant: #3700b3;
  --md-secondary: #03dac6;
  --md-secondary-variant: #018786;
  --md-background: #fafafa;
  --md-surface: #ffffff;
  --md-error: #b00020;
}

/* 海拔阴影系统 */
.md-elevation-1 {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.md-elevation-2 {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.md-elevation-3 {
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

.md-elevation-4 {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

/* 涟漪效果基础 */
.md-ripple {
  position: relative;
  overflow: hidden;
}

/* 浮动标签输入框 */
.md-text-field {
  background: #f5f5f5;
  border-radius: 4px 4px 0 0;
  border-bottom: 2px solid #9e9e9e;
}

.md-text-field:focus {
  border-bottom-color: var(--md-primary);
}`,aiRules:`你是一个 Material Design 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用不一致的阴影深度
- 使用过于柔和暗淡的配色
- 省略交互反馈效果
- 打破 8dp 网格系统

## 必须遵守

- 海拔阴影 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]
- 主色调 bg-[#6200ee] text-white
- 强调色 bg-[#03dac6]
- 圆角卡片 rounded-xl
- 大写按钮文字 uppercase tracking-wider

## 配色

- 主色: #6200ee (紫色)
- 主色变体: #3700b3
- 次要色: #03dac6 (青色)
- 背景: #fafafa
- 表面: #ffffff
- 错误: #b00020

## 间距

- 基于 8dp 网格
- p-2 (8px), p-4 (16px), p-6 (24px), p-8 (32px)`,examplePrompts:[{title:"任务管理应用",titleEn:"Task Management App",description:"Material 风格的任务管理界面",descriptionEn:"Material style task management interface",prompt:`用 Material Design 创建一个任务管理应用界面，要求：
1. 顶部应用栏带阴影
2. 浮动操作按钮 (FAB)
3. 卡片列表展示任务
4. 使用海拔阴影系统
5. 紫色主色调，青色强调`}]},{slug:"fluent-design",name:"流利设计",nameEn:"Fluent Design",description:"微软推出的设计系统，融合了光效、深度、动效、材质和缩放五大元素，打造自然直观的跨平台体验。",cover:"/styles/fluent-design.svg",styleType:"visual",tags:["modern","brand-inspired"],category:"modern",colors:{primary:"#0078d4",secondary:"#106ebe",accent:["#ffb900","#e81123","#00cc6a"]},keywords:["Fluent","微软","亚克力","Reveal","光效","深度","动效"],philosophy:`Fluent Design System（流利设计系统）是微软于 2017 年推出的设计语言，旨在创造跨设备的一致体验。

核心五元素：
- Light（光）：通过光效指示焦点和交互
- Depth（深度）：创造层次感和空间感
- Motion（动效）：自然流畅的过渡动画
- Material（材质）：亚克力等半透明材质
- Scale（缩放）：适应不同尺寸的设备`,doList:["使用亚克力（Acrylic）半透明效果","添加 Reveal 高亮边框效果","使用微软标志性蓝色","保持简洁现代的布局","添加微妙的深度和阴影","使用 Segoe UI 字体"],dontList:["禁止过度使用亚克力效果","禁止使用不协调的配色","禁止忽略焦点状态","禁止使用过重的阴影"],components:{button:{name:"按钮",description:"Fluent 风格按钮",code:`<button className="
  px-6 py-2.5
  bg-[#0078d4]
  text-white font-medium
  rounded-sm
  border border-[#0078d4]
  hover:bg-[#106ebe]
  active:bg-[#005a9e]
  focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2
  transition-colors duration-100
">
  Primary Button
</button>`},card:{name:"卡片",description:"Fluent 风格卡片",code:`<div className="
  p-6
  bg-white/70
  backdrop-blur-xl
  rounded-lg
  border border-white/20
  shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]
  hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.12)]
  transition-shadow duration-300
">
  <div className="flex items-center gap-4 mb-4">
    <div className="w-12 h-12 bg-[#0078d4] rounded-lg flex items-center justify-center">
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900">Fluent Card</h3>
      <p className="text-sm text-gray-500">Acrylic material</p>
    </div>
  </div>
  <p className="text-gray-700">
    Light, depth, motion, material, and scale working together.
  </p>
</div>`},input:{name:"输入框",description:"Fluent 风格输入框",code:`<input
  type="text"
  placeholder="Enter text..."
  className="
    w-full px-3 py-2
    bg-white
    border border-gray-300
    rounded-sm
    text-gray-900 placeholder-gray-400
    focus:outline-none focus:border-[#0078d4] focus:border-2
    hover:border-gray-400
    transition-colors duration-100
  "
/>`},hero:{name:"Hero 区块",description:"Fluent 风格 Hero",code:`<section className="
  min-h-screen
  bg-gradient-to-br from-[#0078d4] via-[#106ebe] to-[#005a9e]
  relative overflow-hidden
">
  {/* Acrylic overlay shapes */}
  <div className="absolute top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
  <div className="absolute bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

  <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
    <div className="text-center max-w-3xl">
      <h1 className="text-5xl md:text-7xl font-semibold text-white mb-6">
        Fluent Design
      </h1>
      <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
        Create intuitive, harmonious experiences across platforms with light, depth, motion, material, and scale.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button className="px-8 py-3 bg-white text-[#0078d4] font-semibold rounded-sm hover:bg-white/90 transition-colors">
          Get Started
        </button>
        <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-sm border border-white/30 backdrop-blur-sm hover:bg-white/20 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  </div>
</section>`}},globalCss:`/* Fluent Design 全局样式 */

:root {
  --fluent-blue: #0078d4;
  --fluent-blue-dark: #106ebe;
  --fluent-blue-darker: #005a9e;
  --fluent-yellow: #ffb900;
  --fluent-red: #e81123;
  --fluent-green: #00cc6a;
}

/* 亚克力效果 */
.fluent-acrylic {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.fluent-acrylic-dark {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Reveal 边框效果（简化版） */
.fluent-reveal {
  position: relative;
  overflow: hidden;
}

.fluent-reveal::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

/* 柔和阴影 */
.fluent-shadow {
  box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.08);
}

.fluent-shadow-hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.06), 0 16px 32px rgba(0,0,0,0.12);
}`,aiRules:`你是一个 Fluent Design 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 过度使用亚克力效果
- 使用不协调的配色
- 忽略焦点和悬停状态
- 使用过重的阴影

## 必须遵守

- 微软蓝 bg-[#0078d4] text-white
- 亚克力效果 bg-white/70 backdrop-blur-xl
- 小圆角 rounded-sm, rounded-lg
- 柔和阴影 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]
- 清晰的焦点环 focus:ring-2 focus:ring-[#0078d4]

## 配色

- 主蓝色: #0078d4
- 深蓝色: #106ebe
- 更深蓝: #005a9e
- 黄色: #ffb900
- 红色: #e81123
- 绿色: #00cc6a

## 交互

- 悬停状态变深
- 激活状态更深
- 清晰的焦点指示
- 平滑的过渡动画`,examplePrompts:[{title:"Windows 风格设置面板",titleEn:"Windows Settings Panel",description:"Fluent 风格的系统设置界面",descriptionEn:"Fluent style system settings interface",prompt:`用 Fluent Design 创建一个系统设置面板，要求：
1. 侧边导航栏
2. 亚克力背景效果
3. 卡片式设置项
4. 微软蓝色主题
5. 清晰的交互反馈`}]},{slug:"comic-style",name:"漫画风格",nameEn:"Comic Style",description:"灵感源自漫画书和日式漫画的设计风格，浓重的墨线边框、网点填充、对话气泡、动作线和分镜面板布局，充满故事感和视觉冲击力。",cover:"/styles/comic-style.svg",styleType:"visual",tags:["expressive","high-contrast"],category:"expressive",colors:{primary:"#1a1a1a",secondary:"#ffffff",accent:["#ff3333","#ffcc00","#3366ff","#33cc33"]},keywords:["漫画","manga","网点","对话气泡","分镜","动作线","墨线"],philosophy:`Comic Style 是一种源自漫画书和日式漫画的设计风格，通过浓重的墨线边框、半调网点、对话气泡和动态线条，将界面变成生动的漫画面板。

核心理念：
- 墨线感：使用粗重的黑色边框勾勒元素轮廓
- 网点效果：使用 halftone dots 模拟漫画印刷质感
- 动态感：通过速度线和动作线表达能量与运动
- 叙事性：每个区块都像漫画的一帧，讲述故事`,doList:["使用粗黑色边框 border-4 border-black 模拟墨线","使用硬边阴影 shadow-[4px_4px_0_#000] 模拟印刷偏移","使用对话气泡形状展示信息","使用半调网点作为背景纹理","文字使用大写粗体 uppercase font-black","按钮使用夸张的悬停效果"],dontList:["禁止使用柔和阴影 shadow-lg","禁止使用过细的边框 border","禁止使用渐变作为主要视觉效果","禁止使用过于正式的排版","禁止缺少动态感和能量感"],components:{button:{name:"按钮",description:"漫画风格按钮，粗墨线边框和硬阴影",code:`<button className="
  px-6 py-3
  bg-[#ff3333]
  border-4 border-black
  rounded-none
  text-white font-black uppercase tracking-wider
  shadow-[4px_4px_0_#000]
  hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#000]
  active:translate-x-1 active:translate-y-1 active:shadow-none
  transition-all duration-100
  relative
">
  <span className="relative z-10">CLICK!</span>
</button>`},card:{name:"卡片",description:"漫画面板风格卡片",code:`<div className="
  p-6
  bg-white
  border-4 border-black
  rounded-none
  shadow-[6px_6px_0_#000]
  relative
">
  <div className="absolute -top-3 -right-3 bg-[#ffcc00] border-3 border-black px-3 py-1 font-black text-sm rotate-3">
    NEW!
  </div>
  <h3 className="text-xl font-black uppercase text-black mb-2">
    COMIC CARD
  </h3>
  <p className="text-gray-700 font-medium">
    A panel from the story!
  </p>
</div>`},input:{name:"输入框",description:"漫画风格输入框",code:`<input
  type="text"
  placeholder="TYPE HERE..."
  className="
    w-full px-4 py-3
    bg-white
    border-4 border-black
    rounded-none
    text-black placeholder-gray-400
    font-bold uppercase
    focus:outline-none focus:shadow-[inset_0_0_0_2px_#ff3333]
    transition-all
  "
/>`},nav:{name:"导航栏",description:"漫画风格导航栏",code:`<nav className="
  px-6 py-4
  bg-[#ffcc00]
  border-b-4 border-black
">
  <div className="max-w-4xl mx-auto flex items-center justify-between">
    <a href="/" className="text-black font-black uppercase tracking-wider text-xl">
      COMICS
    </a>
    <div className="flex gap-6">
      <a href="#" className="text-black hover:text-[#ff3333] font-black uppercase text-sm transition-colors">
        ISSUES
      </a>
      <a href="#" className="text-black hover:text-[#ff3333] font-black uppercase text-sm transition-colors">
        HEROES
      </a>
    </div>
  </div>
</nav>`},hero:{name:"Hero 区块",description:"漫画风格 Hero 展示区域",code:`<section className="
  min-h-screen
  flex flex-col items-center justify-center
  bg-white
  px-6 py-20
  relative
  overflow-hidden
">
  <div className="absolute inset-0 opacity-10"
    style={{
      backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
      backgroundSize: '8px 8px'
    }}
  />
  <h1 className="
    text-5xl md:text-7xl
    font-black uppercase tracking-tight
    text-black
    mb-4
    relative z-10
    [text-shadow:3px_3px_0_#ff3333,-3px_-3px_0_#3366ff]
  ">
    COMIC STYLE
  </h1>
  <p className="text-xl uppercase font-bold text-gray-700 mb-8 relative z-10">
    Every pixel tells a story
  </p>
  <button className="
    relative z-10
    px-8 py-4
    bg-[#ff3333]
    border-4 border-black
    rounded-none
    text-white font-black uppercase text-xl
    shadow-[6px_6px_0_#000]
    hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_#000]
    active:translate-x-2 active:translate-y-2 active:shadow-none
    transition-all duration-100
  ">
    READ NOW!
  </button>
</section>`}},globalCss:`/* Comic Style 全局样式 */

:root {
  --comic-black: #1a1a1a;
  --comic-white: #ffffff;
  --comic-red: #ff3333;
  --comic-yellow: #ffcc00;
  --comic-blue: #3366ff;
  --comic-green: #33cc33;
}

/* 半调网点背景 */
.comic-halftone {
  background-image: radial-gradient(circle, var(--comic-black) 1px, transparent 1px);
  background-size: 6px 6px;
}

/* 对话气泡 */
.comic-bubble {
  position: relative;
  background: white;
  border: 4px solid var(--comic-black);
  border-radius: 24px;
  padding: 16px 20px;
}

.comic-bubble::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 30px;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 20px solid var(--comic-black);
}

/* 动作线 */
.comic-speed-lines {
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 8px,
    rgba(0, 0, 0, 0.05) 8px,
    rgba(0, 0, 0, 0.05) 10px
  );
}

/* 漫画面板边框 */
.comic-panel {
  border: 4px solid var(--comic-black);
  box-shadow: 6px 6px 0 var(--comic-black);
}

/* 漫画文字效果 */
.comic-text {
  font-family: 'Comic Sans MS', 'Bangers', cursive, sans-serif;
  font-weight: 900;
  text-transform: uppercase;
}

/* 爆炸效果标签 */
.comic-burst {
  background: var(--comic-yellow);
  border: 3px solid var(--comic-black);
  transform: rotate(-3deg);
  font-weight: 900;
}`,aiRules:`你是一个 Comic Style 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用柔和阴影 shadow-lg, shadow-xl, shadow-md
- 使用细边框 border, border-2
- 使用渐变作为主背景 bg-gradient-*
- 使用圆角卡片 rounded-lg, rounded-xl
- 使用半透明/模糊效果 backdrop-blur

## 必须遵守

- 粗黑色边框 border-4 border-black
- 硬边阴影 shadow-[4px_4px_0_#000] 或 shadow-[6px_6px_0_#000]
- 无圆角 rounded-none（对话气泡除外）
- 大写加粗文字 uppercase font-black
- 对比鲜明的纯色配色
- 按钮按下效果（位移+阴影消失）

## 配色

主色调：
- 黑色: #1a1a1a (墨线)
- 白色: #ffffff (面板背景)

强调色：
- 红色: #ff3333 (动作、CTA)
- 黄色: #ffcc00 (标签、高亮)
- 蓝色: #3366ff (信息、链接)
- 绿色: #33cc33 (成功)

## 特殊效果

半调网点：background-image: radial-gradient(circle, #000 1px, transparent 1px)
对话气泡：border-4 border-black rounded-3xl + 三角尾部
动作线：repeating-linear-gradient
文字效果：text-shadow 多色偏移

## 自检

每次生成代码后检查：
1. 所有元素都有粗黑色边框
2. 使用硬边阴影而非柔和阴影
3. 文字大写加粗
4. 配色鲜明对比强烈
5. 整体感觉像漫画面板`,examplePrompts:[{title:"漫画英雄页面",titleEn:"Comic Hero Page",description:"漫画风格的英雄介绍页",descriptionEn:"Comic-style hero introduction page",prompt:`用 Comic Style 风格创建一个英雄介绍页，要求：
1. 使用漫画面板分镜布局
2. 粗墨线边框 border-4 border-black
3. 半调网点背景纹理
4. 对话气泡展示角色台词
5. 动作线表达能量和动态感
6. 鲜明的红黄蓝配色`},{title:"漫画作品展示",titleEn:"Comic Portfolio",description:"漫画风格的作品集",descriptionEn:"Comic-style portfolio gallery",prompt:`用 Comic Style 风格设计一个作品展示页，要求：
1. 每个作品用漫画面板包裹
2. 粗黑色边框和硬边阴影
3. 黄色爆炸标签标注亮点
4. 悬停效果像翻漫画页
5. 半调网点作为背景纹理`}]},{slug:"sketch-style",name:"铅笔手绘风",nameEn:"Sketch Style",description:"模拟铅笔手绘的设计风格，不规则线条边框、纸张纹理背景、手写字体感、素描阴影和涂鸦装饰，传达亲切温暖的手工质感。",cover:"/styles/sketch-style.svg",styleType:"visual",tags:["expressive","retro"],category:"expressive",colors:{primary:"#2c2c2c",secondary:"#f5f0e8",accent:["#e74c3c","#3498db","#27ae60","#f39c12"]},keywords:["手绘","铅笔","素描","纸张","手写","涂鸦","不规则"],philosophy:`Sketch Style 是一种模拟手绘铅笔素描的设计风格，通过不规则的线条、纸张纹理和手写感元素，为数字界面注入温暖的手工质感。

核心理念：
- 手工感：线条和形状不追求完美对齐，保留手绘的不规则感
- 纸张质感：使用暖色调米色背景模拟素描本纸张
- 铅笔线条：边框使用不均匀的手绘风格线条
- 素描阴影：使用交叉线条（cross-hatching）模拟阴影效果`,doList:["使用纸张色背景 bg-[#f5f0e8]","边框使用不规则风格 border-2 border-dashed 或 wavy","使用手写风格字体或 serif 字体","阴影使用交叉线条效果而非纯色","元素保留轻微倾斜 rotate-[-1deg] 增加手绘感","使用铅笔灰色 #2c2c2c 作为主色调"],dontList:["禁止使用完美的直线和圆角","禁止使用纯白背景（应使用纸张色）","禁止使用渐变效果","禁止使用玻璃模糊效果","禁止使用过于饱和的颜色"],components:{button:{name:"按钮",description:"手绘风格按钮，不规则边框",code:`<button className="
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
</button>`},card:{name:"卡片",description:"素描本风格卡片",code:`<div className="
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
</div>`},input:{name:"输入框",description:"手绘风格输入框",code:`<input
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
/>`},nav:{name:"导航栏",description:"手绘风格导航栏",code:`<nav className="
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
</nav>`},hero:{name:"Hero 区块",description:"手绘风格 Hero 展示区域",code:`<section className="
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
</section>`}},globalCss:`/* Sketch Style 全局样式 */

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
}`,aiRules:`你是一个 Sketch Style 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

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
5. 整体感觉像手绘素描本`,examplePrompts:[{title:"手绘作品集",titleEn:"Sketch Portfolio",description:"铅笔手绘风格的个人作品集",descriptionEn:"Hand-drawn sketch portfolio",prompt:`用 Sketch Style 风格创建一个个人作品集页面，要求：
1. 纸张纹理背景 #f5f0e8
2. 虚线边框卡片展示作品
3. 衬线斜体字体标题
4. 元素微微倾斜增加手绘感
5. 铅笔灰色主色调
6. 涂鸦装饰元素`},{title:"手绘笔记页面",titleEn:"Sketch Notes",description:"仿手写笔记的博客页面",descriptionEn:"Hand-written notes blog page",prompt:`用 Sketch Style 风格设计一个笔记/博客页面，要求：
1. 模仿素描本的纸张质感
2. 手写风格的标题和正文
3. 波浪下划线标记重点
4. 涂鸦圆圈标注关键点
5. 虚线分割线分隔内容
6. 铅笔素描风格的图标`}]},{slug:"watercolor-style",name:"水彩画风",nameEn:"Watercolor Style",description:"灵感源自水彩画的设计风格，柔和的颜色渐变、模糊的边缘效果、纸张质感背景和流动的色彩扩散，传递艺术感与诗意。",cover:"/styles/watercolor-style.svg",styleType:"visual",tags:["expressive","minimal"],category:"expressive",colors:{primary:"#4a6fa5",secondary:"#faf8f5",accent:["#e8a87c","#85cdca","#c38d94","#d4a373"]},keywords:["水彩","渐变","柔和","纸张","艺术","流动","诗意"],philosophy:`Watercolor Style 是一种模拟水彩画效果的设计风格，通过柔和的颜色渐变、模糊的边缘和流动的色彩扩散，为界面注入艺术气息和诗意感受。

核心理念：
- 流动感：颜色像水彩一样自然渗透和扩散
- 柔和边缘：没有硬朗的边界线，一切都柔和过渡
- 纸张质感：底层保留水彩纸的温暖纹理
- 透明叠加：水彩的半透明特性，颜色层层叠加`,doList:["使用柔和的渐变 bg-gradient-to-* 模拟水彩渗透","使用半透明色彩 opacity 或 rgba 模拟水彩透明","使用大圆角 rounded-3xl 或 rounded-full 柔化边缘","使用温暖的纸张色背景 bg-[#faf8f5]","使用柔和的阴影 shadow-lg 配合低透明度","使用衬线字体增加艺术感"],dontList:["禁止使用硬边框 border-4 border-black","禁止使用硬边阴影 shadow-[px_px_0_color]","禁止使用纯黑色背景","禁止使用直角 rounded-none","禁止使用过于饱和或刺眼的颜色"],components:{button:{name:"按钮",description:"水彩风格按钮，柔和渐变和模糊边缘",code:`<button className="
  px-8 py-4
  bg-gradient-to-r from-[#4a6fa5]/80 to-[#85cdca]/80
  rounded-full
  text-white font-serif
  shadow-lg shadow-[#4a6fa5]/20
  hover:shadow-xl hover:shadow-[#4a6fa5]/30 hover:-translate-y-0.5
  transition-all duration-300
">
  Explore
</button>`},card:{name:"卡片",description:"水彩画风格卡片",code:`<div className="
  p-8
  bg-gradient-to-br from-[#e8a87c]/20 via-white to-[#85cdca]/20
  rounded-3xl
  shadow-lg shadow-[#4a6fa5]/10
  border border-[#4a6fa5]/10
  backdrop-blur-sm
">
  <h3 className="text-xl font-serif text-[#4a6fa5] mb-3">
    Watercolor Card
  </h3>
  <p className="text-[#6b7280] leading-relaxed">
    Colors flowing like water on paper
  </p>
</div>`},input:{name:"输入框",description:"水彩风格输入框",code:`<input
  type="text"
  placeholder="Write here..."
  className="
    w-full px-5 py-4
    bg-white/60
    border border-[#4a6fa5]/20
    rounded-2xl
    text-[#4a6fa5] placeholder-[#4a6fa5]/40
    font-serif
    focus:outline-none focus:border-[#4a6fa5]/40 focus:bg-white/80
    focus:shadow-lg focus:shadow-[#4a6fa5]/10
    transition-all duration-300
  "
/>`},nav:{name:"导航栏",description:"水彩风格导航栏",code:`<nav className="
  px-6 py-4
  bg-gradient-to-r from-[#faf8f5] via-[#e8a87c]/10 to-[#85cdca]/10
  border-b border-[#4a6fa5]/10
">
  <div className="max-w-4xl mx-auto flex items-center justify-between">
    <a href="/" className="text-[#4a6fa5] font-serif text-xl italic">
      Aquarelle
    </a>
    <div className="flex gap-6">
      <a href="#" className="text-[#4a6fa5]/70 hover:text-[#4a6fa5] font-serif transition-colors">
        Gallery
      </a>
      <a href="#" className="text-[#4a6fa5]/70 hover:text-[#4a6fa5] font-serif transition-colors">
        About
      </a>
    </div>
  </div>
</nav>`},hero:{name:"Hero 区块",description:"水彩风格 Hero 展示区域",code:`<section className="
  min-h-screen
  flex flex-col items-center justify-center
  bg-[#faf8f5]
  px-6 py-20
  relative overflow-hidden
">
  <div className="absolute top-20 left-10 w-64 h-64 bg-[#e8a87c]/20 rounded-full blur-3xl" />
  <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#85cdca]/20 rounded-full blur-3xl" />
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c38d94]/10 rounded-full blur-3xl" />
  <h1 className="
    text-4xl md:text-6xl
    font-serif italic
    text-[#4a6fa5]
    mb-4
    relative z-10
  ">
    Watercolor Style
  </h1>
  <p className="text-xl font-serif text-[#6b7280] mb-8 relative z-10">
    Where colors dance and flow freely
  </p>
  <button className="
    relative z-10
    px-8 py-4
    bg-gradient-to-r from-[#4a6fa5]/80 to-[#85cdca]/80
    rounded-full
    text-white font-serif text-lg
    shadow-lg shadow-[#4a6fa5]/20
    hover:shadow-xl hover:shadow-[#4a6fa5]/30
    transition-all duration-300
  ">
    Begin Painting
  </button>
</section>`}},globalCss:`/* Watercolor Style 全局样式 */

:root {
  --wc-blue: #4a6fa5;
  --wc-paper: #faf8f5;
  --wc-peach: #e8a87c;
  --wc-teal: #85cdca;
  --wc-rose: #c38d94;
  --wc-sand: #d4a373;
}

/* 水彩纸张背景 */
.wc-paper {
  background-color: var(--wc-paper);
}

/* 水彩晕染效果 */
.wc-wash {
  background: radial-gradient(ellipse at 30% 50%, rgba(232, 168, 124, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 30%, rgba(133, 205, 202, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 50% 80%, rgba(195, 141, 148, 0.1) 0%, transparent 60%);
}

/* 水彩边缘模糊 */
.wc-soft-edge {
  border-radius: 24px;
  box-shadow: 0 8px 30px rgba(74, 111, 165, 0.1);
}

/* 水彩文字 */
.wc-text {
  font-family: 'Georgia', 'Playfair Display', serif;
  font-style: italic;
  color: var(--wc-blue);
}

/* 水彩色块 */
.wc-swatch {
  border-radius: 50%;
  filter: blur(1px);
  opacity: 0.7;
}

/* 水彩卡片 */
.wc-card {
  background: linear-gradient(135deg, rgba(232, 168, 124, 0.15), white, rgba(133, 205, 202, 0.15));
  border-radius: 24px;
  border: 1px solid rgba(74, 111, 165, 0.1);
  box-shadow: 0 8px 30px rgba(74, 111, 165, 0.1);
}

/* 水彩分割线 */
.wc-divider {
  height: 2px;
  background: linear-gradient(to right, transparent, var(--wc-blue), transparent);
  opacity: 0.2;
}`,aiRules:`你是一个 Watercolor Style 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用硬边框 border-4 border-black
- 使用硬边阴影 shadow-[px_px_0_color]
- 使用纯黑色背景 bg-black
- 使用直角 rounded-none
- 使用过于饱和的颜色
- 使用粗体无衬线大写文字

## 必须遵守

- 纸张色背景 bg-[#faf8f5]
- 柔和渐变 bg-gradient-to-br 使用半透明色
- 大圆角 rounded-3xl 或 rounded-full
- 柔和阴影 shadow-lg 配合低透明度色彩
- 衬线斜体字体 font-serif italic
- 半透明色彩叠加效果

## 配色

主色调：
- 蓝灰: #4a6fa5 (文字和主要元素)
- 纸张: #faf8f5 (背景)

水彩色（半透明使用）：
- 蜜桃: #e8a87c
- 青绿: #85cdca
- 玫瑰: #c38d94
- 沙色: #d4a373

## 特殊效果

水彩晕染：使用多个 radial-gradient 叠加
色彩扩散：使用 blur-3xl 的大色块
柔和边缘：rounded-3xl + 低透明度边框
纸张纹理：暖色调背景 + 微妙纹理

## 自检

每次生成代码后检查：
1. 没有硬边框和直角
2. 使用柔和的渐变和半透明色
3. 背景是温暖的纸张色
4. 文字使用衬线斜体
5. 整体感觉像水彩画作品`,examplePrompts:[{title:"水彩画廊",titleEn:"Watercolor Gallery",description:"水彩风格的艺术画廊页面",descriptionEn:"Watercolor-style art gallery page",prompt:`用 Watercolor Style 风格创建一个艺术画廊页面，要求：
1. 温暖的纸张色背景 #faf8f5
2. 柔和的水彩渐变色块作为装饰
3. 作品卡片使用半透明渐变背景
4. 衬线斜体字体标题
5. 大圆角和柔和阴影
6. 背景使用 blur 模糊色块模拟水彩晕染`},{title:"水彩个人主页",titleEn:"Watercolor Portfolio",description:"水彩画风格的个人介绍页",descriptionEn:"Watercolor-style personal page",prompt:`用 Watercolor Style 风格设计一个个人介绍页，要求：
1. 全屏背景使用多个水彩晕染色块
2. 文字浮在水彩色块之上
3. 导航使用柔和的半透明效果
4. 联系方式卡片使用水彩渐变背景
5. 整体色调温暖柔和，像一幅水彩画`}]},{slug:"f-pattern-layout",name:"F型布局",nameEn:"F-Pattern Layout",description:"基于眼动追踪研究的F型扫描布局，用户视线从左上角开始，沿顶部水平扫描后向下移动，适合内容密集型页面、博客文章和新闻列表。",cover:"/styles/f-pattern-layout.svg",styleType:"layout",tags:["modern","responsive"],compatibleWith:["editorial","corporate-clean","minimalist-flat","notion-style","swiss-style"],category:"modern",colors:{primary:"#1a1a2e",secondary:"#f8f9fa",accent:["#e63946","#457b9d","#2a9d8f","#e9c46a"]},keywords:["F型","眼动","内容优先","扫描","阅读","博客","新闻"],philosophy:`F-Pattern Layout 基于尼尔森\xb7诺曼集团的眼动追踪研究，用户浏览网页时视线呈 F 形移动：先水平扫描顶部内容，再向下移动后进行第二次水平扫描（较短），最后垂直向下浏览左侧。

核心理念：
- 内容优先级：最重要的内容放在顶部和左侧
- 视觉引导：通过层次和权重引导用户阅读路径
- 信息密度：适合文字密集型内容的高效排列
- 可扫描性：标题、摘要和正文形成清晰的层级`,doList:["将最重要的内容放在页面顶部（第一条水平线）","在左侧放置导航或关键信息（垂直线）","使用清晰的标题层级 h1 > h2 > h3","使用列表和分段增加可扫描性","保持左对齐 text-left 符合阅读习惯","使用 max-w-prose 限制行宽提升可读性"],dontList:["禁止将重要内容放在右下角","禁止居中对齐大段文字","禁止忽视内容的优先级排列","禁止使用过长的无分段文字","禁止在左侧留白过多"],components:{button:{name:"按钮",description:"F型布局中的 CTA 按钮",code:`<button className="
  px-6 py-3
  bg-[#e63946] text-white
  rounded-lg
  font-medium
  hover:bg-[#c1121f]
  transition-colors
">
  Read More
</button>`},card:{name:"卡片",description:"F型布局中的内容卡片",code:`<article className="
  flex gap-6 p-6
  bg-white
  border-b border-gray-100
  hover:bg-gray-50
  transition-colors
">
  <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />
  <div className="flex-1 min-w-0">
    <h3 className="text-lg font-semibold text-[#1a1a2e] mb-1 line-clamp-1">
      Article Title
    </h3>
    <p className="text-gray-600 text-sm line-clamp-2 mb-2">
      Brief summary of the article content...
    </p>
    <span className="text-xs text-gray-400">5 min read</span>
  </div>
</article>`},input:{name:"输入框",description:"搜索输入框",code:`<input
  type="text"
  placeholder="Search articles..."
  className="
    w-full px-4 py-3
    bg-gray-50
    border border-gray-200
    rounded-lg
    text-[#1a1a2e] placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-[#457b9d]/20
    focus:border-[#457b9d]
    transition-all
  "
/>`},hero:{name:"F型布局完整示例",description:"F型布局的完整页面结构",code:`<div className="min-h-screen bg-[#f8f9fa]">
  {/* 顶部横条 - F的第一笔 */}
  <header className="bg-white border-b border-gray-200">
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-[#1a1a2e]">Logo</h1>
      <nav className="flex gap-6 text-sm text-gray-600">
        <a href="#" className="hover:text-[#1a1a2e]">Home</a>
        <a href="#" className="hover:text-[#1a1a2e]">Articles</a>
        <a href="#" className="hover:text-[#1a1a2e]">About</a>
      </nav>
    </div>
  </header>

  <div className="max-w-6xl mx-auto px-6 py-8">
    {/* 特色内容 - F的第二笔 */}
    <section className="mb-8">
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <span className="text-xs font-medium text-[#e63946] uppercase tracking-wider">Featured</span>
        <h2 className="text-3xl font-bold text-[#1a1a2e] mt-2 mb-4">Main Headline</h2>
        <p className="text-gray-600 max-w-prose">Summary text that appears along the first horizontal scan line...</p>
      </div>
    </section>

    <div className="flex gap-8">
      {/* 左侧内容列表 - F的竖线 */}
      <main className="flex-1">
        <article className="bg-white rounded-lg p-6 mb-4 shadow-sm">
          <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">Article Title</h3>
          <p className="text-gray-600 text-sm">Content preview...</p>
        </article>
      </main>

      {/* 右侧边栏 */}
      <aside className="w-64 flex-shrink-0">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h4 className="font-medium text-sm text-gray-500 mb-3">Trending</h4>
          <div className="text-sm text-[#1a1a2e]">Sidebar content</div>
        </div>
      </aside>
    </div>
  </div>
</div>`}},globalCss:`/* F-Pattern Layout 全局样式 */

/* F型布局容器 */
.f-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* 顶部扫描区（F的第一笔） */
.f-top-bar {
  width: 100%;
  padding: 2rem 0;
  border-bottom: 1px solid #e5e7eb;
}

/* 第二扫描区（F的第二笔，较短） */
.f-secondary {
  width: 75%;
  padding: 1.5rem 0;
}

/* 垂直扫描区（F的竖线） */
.f-vertical {
  display: flex;
  gap: 2rem;
}

.f-vertical-main {
  flex: 1;
}

.f-vertical-aside {
  width: 250px;
  flex-shrink: 0;
}

/* 内容优先级 */
.f-priority-high {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
}

.f-priority-medium {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
}

.f-priority-low {
  font-size: 0.875rem;
  color: #6b7280;
}

/* 响应式 */
@media (max-width: 768px) {
  .f-vertical {
    flex-direction: column;
  }
  .f-vertical-aside {
    width: 100%;
  }
  .f-secondary {
    width: 100%;
  }
}`,aiRules:`你是一个 F-Pattern Layout 布局专家。生成的所有代码必须严格遵守以下约束：

## 布局规则

- 页面顶部放置最重要的信息（logo、导航、特色内容）
- 第二行放置次重要的信息（分类、搜索）
- 左侧放置主内容区（文章列表）
- 右侧放置辅助内容（侧边栏）
- 所有文字左对齐 text-left

## 内容层级

第一层（顶部全宽）：
- 导航栏
- 特色文章/头条

第二层（次要水平区）：
- 分类标签
- 搜索栏

第三层（左侧垂直列表）：
- 文章列表
- 带缩略图的内容卡片

辅助区（右侧）：
- 热门推荐
- 标签云
- 广告位

## 响应式

桌面端：左主内容 + 右侧边栏
平板端：全宽主内容 + 折叠侧边栏
手机端：单列堆叠

## 自检

1. 最重要的内容在顶部和左上
2. 有清晰的标题层级
3. 文字左对齐
4. 内容可快速扫描
5. 响应式适配完善`,examplePrompts:[{title:"新闻列表页",titleEn:"News List Page",description:"F型布局的新闻列表",descriptionEn:"F-pattern news listing page",prompt:`用 F-Pattern Layout 设计一个新闻列表页，要求：
1. 顶部：logo + 导航 + 特色头条
2. 第二行：分类标签 + 搜索框
3. 左侧：文章列表（缩略图 + 标题 + 摘要）
4. 右侧：热门文章 + 标签云
5. 所有内容左对齐，优先级从上到下递减
6. 响应式：手机端单列显示`}]},{slug:"z-pattern-layout",name:"Z型布局",nameEn:"Z-Pattern Layout",description:"基于眼动追踪的Z型扫描布局，视线从左上到右上，斜穿到左下再到右下，形成Z字路径。适合着陆页、营销页面和简洁信息展示。",cover:"/styles/z-pattern-layout.svg",styleType:"layout",tags:["modern","responsive"],compatibleWith:["modern-gradient","apple-style","stripe-style","minimalist-flat","corporate-clean"],category:"modern",colors:{primary:"#0f172a",secondary:"#ffffff",accent:["#6366f1","#06b6d4","#f59e0b","#ec4899"]},keywords:["Z型","着陆页","营销","视觉引导","CTA","扫描路径"],philosophy:`Z-Pattern Layout 基于用户在视觉简洁页面上的自然扫描路径。视线从左上角（logo/品牌）移到右上角（CTA），然后斜穿到左下角，最后移至右下角（最终CTA）。

核心理念：
- 视觉引导：利用Z型路径引导用户完成预设的信息接收顺序
- 关键点位：四个角是最重要的信息放置点
- 简洁明了：适合内容较少但需要强转化的页面
- 层层推进：每一行都是一个信息层级`,doList:["左上角放置 logo/品牌标识","右上角放置导航或首要 CTA","中间区域放置核心价值主张","左下角放置辅助信息或信任标识","右下角放置最终 CTA 按钮","每一行信息独立完整，层层递进"],dontList:["禁止在Z路径上放置不重要的内容","禁止打断Z型视觉流动","禁止使用过多的内容干扰路径","禁止将 CTA 放在路径之外","禁止让页面过于复杂和拥挤"],components:{button:{name:"按钮",description:"Z型布局中的 CTA 按钮",code:`<button className="
  px-8 py-4
  bg-[#6366f1] text-white
  rounded-xl
  font-semibold text-lg
  shadow-lg shadow-[#6366f1]/25
  hover:shadow-xl hover:shadow-[#6366f1]/30 hover:-translate-y-0.5
  transition-all duration-300
">
  Get Started
</button>`},card:{name:"卡片",description:"Z型布局中的特性卡片",code:`<div className="
  p-8
  bg-white
  rounded-2xl
  shadow-sm
  border border-gray-100
  text-center
  hover:shadow-md
  transition-shadow
">
  <div className="w-14 h-14 bg-[#6366f1]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
    <svg className="w-7 h-7 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  </div>
  <h3 className="text-lg font-semibold text-[#0f172a] mb-2">
    Feature
  </h3>
  <p className="text-gray-600 text-sm">
    Brief description of this feature
  </p>
</div>`},input:{name:"输入框",description:"邮箱订阅输入框",code:`<div className="flex gap-3">
  <input
    type="email"
    placeholder="Enter your email..."
    className="
      flex-1 px-4 py-3
      bg-white
      border border-gray-200
      rounded-xl
      text-[#0f172a] placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20
      focus:border-[#6366f1]
      transition-all
    "
  />
  <button className="px-6 py-3 bg-[#6366f1] text-white rounded-xl font-medium">
    Subscribe
  </button>
</div>`},hero:{name:"Z型布局完整示例",description:"Z型布局的完整着陆页",code:`<div className="min-h-screen bg-white">
  {/* Z的第一笔横线：Logo(左) → CTA(右) */}
  <header className="px-6 py-4">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <div className="text-xl font-bold text-[#0f172a]">Brand</div>
      <button className="px-4 py-2 bg-[#6366f1] text-white rounded-lg text-sm font-medium">
        Sign Up
      </button>
    </div>
  </header>

  {/* Z的对角线：核心内容区 */}
  <section className="px-6 py-20">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-bold text-[#0f172a] mb-6">
        Build Something Amazing
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        The fastest way to build modern applications with everything you need.
      </p>
      <div className="flex gap-3 justify-center">
        <button className="px-8 py-4 bg-[#6366f1] text-white rounded-xl font-semibold shadow-lg shadow-[#6366f1]/25">
          Start Free Trial
        </button>
        <button className="px-8 py-4 border border-gray-200 rounded-xl font-semibold text-[#0f172a]">
          Learn More
        </button>
      </div>
    </div>
  </section>

  {/* Z的第二笔横线：信任标识(左) → 最终CTA(右) */}
  <section className="px-6 py-16 bg-gray-50">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-8">
        <span className="text-sm text-gray-500">Trusted by 10,000+ teams</span>
      </div>
      <button className="px-6 py-3 bg-[#0f172a] text-white rounded-xl font-medium">
        Start Building
      </button>
    </div>
  </section>
</div>`}},globalCss:`/* Z-Pattern Layout 全局样式 */

/* Z型布局容器 */
.z-layout {
  max-width: 1200px;
  margin: 0 auto;
}

/* Z的第一行：品牌 + 导航/CTA */
.z-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
}

/* Z的对角线区域：核心内容 */
.z-diagonal {
  text-align: center;
  padding: 5rem 1.5rem;
  max-width: 800px;
  margin: 0 auto;
}

/* Z的第二行：信任 + 最终CTA */
.z-bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.5rem;
}

/* Z路径上的关键点 */
.z-point {
  position: relative;
}

.z-point::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background: #6366f1;
  border-radius: 50%;
}

/* 响应式 */
@media (max-width: 768px) {
  .z-top-bar,
  .z-bottom-bar {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  .z-diagonal {
    padding: 3rem 1.5rem;
  }
}`,aiRules:`你是一个 Z-Pattern Layout 布局专家。生成的所有代码必须严格遵守以下约束：

## 布局规则

Z型路径的四个关键点：
1. 左上角：Logo / 品牌标识
2. 右上角：导航 / 首要 CTA
3. 中间对角线：核心价值主张 / 主要内容
4. 左下角：信任标识 / 社会证明
5. 右下角：最终 CTA 按钮

## 内容规则

- 每一行信息独立完整
- 第一行建立品牌认知
- 对角线区域传递核心价值
- 最后一行促进转化
- 内容简洁，避免干扰路径

## 视觉引导

- 使用对比色突出 CTA
- 使用留白引导视线流动
- 中间区域使用居中布局
- 头尾使用 flex justify-between

## 响应式

桌面端：完整Z型路径
平板端：保持Z型，缩小间距
手机端：垂直堆叠，保持优先级顺序

## 自检

1. Logo在左上，CTA在右上
2. 核心内容居中显示
3. 最终CTA在右下
4. 视觉路径清晰流畅
5. 页面简洁不拥挤`,examplePrompts:[{title:"SaaS 着陆页",titleEn:"SaaS Landing Page",description:"Z型布局的 SaaS 产品着陆页",descriptionEn:"Z-pattern SaaS landing page",prompt:`用 Z-Pattern Layout 设计一个 SaaS 着陆页，要求：
1. 左上角：产品 logo
2. 右上角：Sign Up 按钮
3. 中间：产品标语 + 核心功能概述 + 主CTA
4. 中部：3个特性卡片
5. 底部左侧：客户logo/信任标识
6. 底部右侧：最终 CTA
7. 整体简洁，引导用户沿Z路径浏览`}]},{slug:"holy-grail-layout",name:"圣杯布局",nameEn:"Holy Grail Layout",description:"经典的三栏式网页布局，由固定页头、三列中间区域（左侧导航、主内容、右侧边栏）和固定页脚组成，是Web设计的基础布局范式。",cover:"/styles/holy-grail-layout.svg",styleType:"layout",tags:["modern","responsive"],compatibleWith:["corporate-clean","editorial","notion-style","minimalist-flat","dark-mode"],category:"modern",colors:{primary:"#1e293b",secondary:"#f1f5f9",accent:["#3b82f6","#10b981","#f59e0b","#ef4444"]},keywords:["三栏","圣杯","经典","页头","页脚","侧边栏","导航"],philosophy:`Holy Grail Layout 是Web设计中追求已久的经典布局方案，包含固定的页头页脚和三列中间内容区。这个名字来源于CSS布局早期实现这种布局的困难程度。

核心理念：
- 结构清晰：页头、三列内容、页脚五个区域各司其职
- 主内容优先：HTML 源码中主内容先于侧边栏，利于 SEO
- 等高列：三列无论内容多少都保持等高
- 灵活适配：侧边栏固定宽度，主内容区自适应`,doList:["使用 CSS Grid 或 Flexbox 实现等高三列","固定页头和页脚 sticky top-0 / sticky bottom-0","主内容区 flex-1 自适应宽度","左侧导航栏固定宽度 w-60 或 w-64","右侧边栏固定宽度 w-64 或 w-72","主内容在源码中先于侧边栏","响应式折叠侧边栏"],dontList:["禁止三列高度不一致","禁止主内容区域过窄","禁止忽略响应式折叠","禁止侧边栏宽度随内容变化","禁止页头页脚不固定"],components:{button:{name:"按钮",description:"圣杯布局中的通用按钮",code:`<button className="
  px-4 py-2
  bg-[#3b82f6] text-white
  rounded-lg
  font-medium text-sm
  hover:bg-[#2563eb]
  transition-colors
">
  Action
</button>`},card:{name:"卡片",description:"主内容区的内容卡片",code:`<div className="
  p-6
  bg-white
  rounded-xl
  shadow-sm
  border border-gray-100
">
  <h3 className="text-lg font-semibold text-[#1e293b] mb-2">
    Content Card
  </h3>
  <p className="text-gray-600 text-sm leading-relaxed">
    Main content displayed in the center column of the holy grail layout.
  </p>
</div>`},input:{name:"输入框",description:"搜索输入框",code:`<input
  type="text"
  placeholder="Search..."
  className="
    w-full px-3 py-2
    bg-gray-50
    border border-gray-200
    rounded-lg
    text-sm text-[#1e293b] placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20
    focus:border-[#3b82f6]
    transition-all
  "
/>`},hero:{name:"圣杯布局完整示例",description:"圣杯布局的完整页面结构",code:`<div className="min-h-screen flex flex-col bg-[#f1f5f9]">
  {/* 页头 */}
  <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
    <div className="px-6 py-3 flex items-center justify-between">
      <h1 className="text-lg font-bold text-[#1e293b]">Holy Grail</h1>
      <nav className="flex gap-4 text-sm text-gray-600">
        <a href="#" className="hover:text-[#1e293b]">Home</a>
        <a href="#" className="hover:text-[#1e293b]">Docs</a>
        <a href="#" className="hover:text-[#1e293b]">API</a>
      </nav>
    </div>
  </header>

  {/* 三列主体 */}
  <div className="flex-1 flex">
    {/* 左侧导航 */}
    <aside className="w-60 bg-white border-r border-gray-200 p-4 flex-shrink-0">
      <nav className="space-y-1">
        <a href="#" className="block px-3 py-2 text-sm bg-[#3b82f6]/10 text-[#3b82f6] rounded-lg font-medium">
          Dashboard
        </a>
        <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
          Projects
        </a>
        <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
          Settings
        </a>
      </nav>
    </aside>

    {/* 主内容区 */}
    <main className="flex-1 p-6">
      <h2 className="text-2xl font-bold text-[#1e293b] mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-medium text-gray-700 mb-1">Metric</h3>
          <p className="text-3xl font-bold text-[#1e293b]">1,234</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-medium text-gray-700 mb-1">Revenue</h3>
          <p className="text-3xl font-bold text-[#10b981]">$5,678</p>
        </div>
      </div>
    </main>

    {/* 右侧边栏 */}
    <aside className="w-64 bg-white border-l border-gray-200 p-4 flex-shrink-0">
      <h4 className="text-sm font-medium text-gray-500 mb-3">Activity</h4>
      <div className="space-y-3 text-sm text-gray-600">
        <div className="pb-3 border-b border-gray-100">New user signed up</div>
        <div className="pb-3 border-b border-gray-100">Order completed</div>
        <div>Invoice sent</div>
      </div>
    </aside>
  </div>

  {/* 页脚 */}
  <footer className="bg-white border-t border-gray-200">
    <div className="px-6 py-4 text-center text-sm text-gray-500">
      Holy Grail Layout - Header, 3 columns, Footer
    </div>
  </footer>
</div>`}},globalCss:`/* Holy Grail Layout 全局样式 */

/* 圣杯布局容器 */
.holy-grail {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 页头 */
.holy-grail-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: white;
  border-bottom: 1px solid #e2e8f0;
}

/* 三列主体 */
.holy-grail-body {
  display: flex;
  flex: 1;
}

/* 左侧导航栏 */
.holy-grail-nav {
  width: 240px;
  flex-shrink: 0;
  background: white;
  border-right: 1px solid #e2e8f0;
  padding: 1rem;
}

/* 主内容区 */
.holy-grail-main {
  flex: 1;
  padding: 1.5rem;
  min-width: 0;
}

/* 右侧边栏 */
.holy-grail-aside {
  width: 256px;
  flex-shrink: 0;
  background: white;
  border-left: 1px solid #e2e8f0;
  padding: 1rem;
}

/* 页脚 */
.holy-grail-footer {
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: 1rem 1.5rem;
  text-align: center;
}

/* 响应式 */
@media (max-width: 1024px) {
  .holy-grail-aside {
    display: none;
  }
}

@media (max-width: 768px) {
  .holy-grail-body {
    flex-direction: column;
  }
  .holy-grail-nav {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }
}`,aiRules:`你是一个 Holy Grail Layout 布局专家。生成的所有代码必须严格遵守以下约束：

## 布局结构

五个区域：
1. Header：固定顶部，品牌 + 导航
2. Left Sidebar：固定宽度，导航菜单
3. Main Content：自适应宽度，主内容
4. Right Sidebar：固定宽度，辅助信息
5. Footer：固定底部，版权信息

## 实现规则

- 使用 Flexbox：外层 flex flex-col min-h-screen
- 三列区域：flex flex-1
- 侧边栏：固定宽度 w-60 / w-64 flex-shrink-0
- 主内容：flex-1 min-w-0
- 页头：sticky top-0 z-50
- 等高列：三列自动等高

## 响应式

大屏幕（>1024px）：完整三列
中等屏幕（768-1024px）：隐藏右侧边栏
小屏幕（<768px）：所有列垂直堆叠

## 自检

1. 页头固定在顶部
2. 三列等高
3. 主内容区自适应
4. 侧边栏固定宽度
5. 页脚始终在底部
6. 响应式折叠正确`,examplePrompts:[{title:"管理后台",titleEn:"Admin Dashboard",description:"圣杯布局的管理后台",descriptionEn:"Holy grail admin dashboard",prompt:`用 Holy Grail Layout 设计一个管理后台，要求：
1. 页头：logo + 搜索框 + 用户头像
2. 左侧导航：图标 + 文字菜单项
3. 主内容：数据卡片 + 表格
4. 右侧边栏：通知列表 + 快捷操作
5. 页脚：版权信息
6. 页头 sticky 固定，三列等高
7. 响应式折叠侧边栏`}]},{slug:"dashboard-layout",name:"仪表盘布局",nameEn:"Dashboard Layout",description:"数据驱动的仪表盘布局，包含侧边导航、顶部工具栏、多模块数据面板和图表区域，适合后台管理系统、数据分析平台和监控面板。",cover:"/styles/dashboard-layout.svg",styleType:"layout",tags:["modern","responsive"],compatibleWith:["corporate-clean","dark-mode","minimalist-flat","fluent-design","material-design"],category:"modern",colors:{primary:"#111827",secondary:"#f9fafb",accent:["#6366f1","#10b981","#f59e0b","#ef4444"]},keywords:["仪表盘","数据","面板","图表","监控","后台","分析"],philosophy:`Dashboard Layout 是一种以数据展示为核心的布局方案，通过侧边导航、多模块数据面板和灵活的网格系统，让用户高效地监控和分析多维数据。

核心理念：
- 数据优先：所有布局决策服务于数据的高效展示
- 模块化：每个数据面板独立成模块，可灵活组合
- 密度控制：在信息密度和可读性之间取得平衡
- 实时性：布局支持数据的实时更新和刷新`,doList:["使用深色侧边导航栏 bg-gray-900 w-64","顶部工具栏包含搜索、通知和用户信息","使用 CSS Grid 排列数据面板 grid grid-cols-4","KPI 卡片使用大字号数字展示关键指标","图表区域使用适当比例 aspect-video 或 aspect-square","使用颜色编码区分数据状态（绿增红减）"],dontList:["禁止侧边栏和内容区比例失调","禁止数据面板间距不一致","禁止忽略加载状态和空状态","禁止所有面板大小完全相同","禁止使用过多的装饰性元素分散注意力"],components:{button:{name:"按钮",description:"仪表盘中的操作按钮",code:`<button className="
  px-4 py-2
  bg-[#6366f1] text-white
  rounded-lg
  font-medium text-sm
  hover:bg-[#4f46e5]
  transition-colors
">
  Export Data
</button>`},card:{name:"KPI 卡片",description:"关键指标展示卡片",code:`<div className="
  p-6
  bg-white
  rounded-xl
  shadow-sm
  border border-gray-100
">
  <div className="flex items-center justify-between mb-4">
    <span className="text-sm font-medium text-gray-500">Total Revenue</span>
    <span className="text-xs font-medium text-[#10b981] bg-[#10b981]/10 px-2 py-1 rounded-full">+12.5%</span>
  </div>
  <div className="text-3xl font-bold text-[#111827]">$48,230</div>
  <p className="text-sm text-gray-500 mt-1">vs. $42,890 last month</p>
</div>`},input:{name:"搜索框",description:"仪表盘搜索输入框",code:`<div className="relative">
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
  <input
    type="text"
    placeholder="Search..."
    className="
      w-full pl-10 pr-4 py-2
      bg-gray-50
      border border-gray-200
      rounded-lg
      text-sm text-[#111827] placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20
      focus:border-[#6366f1]
      transition-all
    "
  />
</div>`},hero:{name:"仪表盘布局完整示例",description:"完整的仪表盘页面结构",code:`<div className="min-h-screen flex bg-[#f9fafb]">
  {/* 侧边导航 */}
  <aside className="w-64 bg-[#111827] text-white flex-shrink-0 flex flex-col">
    <div className="p-6">
      <h1 className="text-lg font-bold">Dashboard</h1>
    </div>
    <nav className="flex-1 px-3 space-y-1">
      <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-white/10 rounded-lg text-sm font-medium">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        Overview
      </a>
      <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        Analytics
      </a>
      <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        Settings
      </a>
    </nav>
  </aside>

  {/* 主区域 */}
  <div className="flex-1 flex flex-col min-w-0">
    {/* 顶部工具栏 */}
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-[#111827]">Overview</h2>
      <div className="flex items-center gap-4">
        <input type="text" placeholder="Search..." className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
        <div className="w-8 h-8 bg-[#6366f1] rounded-full" />
      </div>
    </header>

    {/* 内容区 */}
    <main className="flex-1 p-6">
      {/* KPI 卡片行 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500">Revenue</span>
          <div className="text-2xl font-bold text-[#111827] mt-1">$48.2K</div>
          <span className="text-xs text-[#10b981]">+12.5%</span>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500">Users</span>
          <div className="text-2xl font-bold text-[#111827] mt-1">2,420</div>
          <span className="text-xs text-[#10b981]">+5.2%</span>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500">Orders</span>
          <div className="text-2xl font-bold text-[#111827] mt-1">1,210</div>
          <span className="text-xs text-[#ef4444]">-2.1%</span>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500">Conversion</span>
          <div className="text-2xl font-bold text-[#111827] mt-1">3.6%</div>
          <span className="text-xs text-[#f59e0b]">+0.3%</span>
        </div>
      </div>

      {/* 图表区 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-medium text-[#111827] mb-4">Revenue Trend</h3>
          <div className="aspect-[2/1] bg-gray-50 rounded-lg" />
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-medium text-[#111827] mb-4">Distribution</h3>
          <div className="aspect-square bg-gray-50 rounded-lg" />
        </div>
      </div>
    </main>
  </div>
</div>`}},globalCss:`/* Dashboard Layout 全局样式 */

/* 仪表盘容器 */
.dashboard {
  display: flex;
  min-height: 100vh;
}

/* 侧边导航 */
.dashboard-sidebar {
  width: 256px;
  background: #111827;
  color: white;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

/* 主区域 */
.dashboard-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* 顶部工具栏 */
.dashboard-toolbar {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 内容区 */
.dashboard-content {
  flex: 1;
  padding: 1.5rem;
  background: #f9fafb;
}

/* KPI 卡片网格 */
.dashboard-kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

/* 图表网格 */
.dashboard-chart-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
}

/* KPI 卡片 */
.dashboard-kpi {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid #f3f4f6;
}

/* 状态颜色 */
.dashboard-up { color: #10b981; }
.dashboard-down { color: #ef4444; }
.dashboard-neutral { color: #f59e0b; }

/* 响应式 */
@media (max-width: 1024px) {
  .dashboard-kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .dashboard-chart-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-sidebar {
    display: none;
  }
  .dashboard-kpi-grid {
    grid-template-columns: 1fr;
  }
}`,aiRules:`你是一个 Dashboard Layout 布局专家。生成的所有代码必须严格遵守以下约束：

## 布局结构

- 左侧：深色侧边导航栏 w-64 bg-gray-900
- 顶部：白色工具栏（搜索、通知、用户）
- 主体：KPI 卡片 + 图表面板 + 数据表格

## KPI 卡片

- 使用 grid grid-cols-4 排列
- 每个卡片包含：标签、数值、变化趋势
- 增长用绿色 text-green-500
- 下降用红色 text-red-500
- 平稳用黄色 text-yellow-500

## 图表区域

- 主图表占 2/3 宽度 col-span-2
- 辅助图表占 1/3 宽度
- 使用 aspect-ratio 保持比例

## 侧边导航

- 深色背景 bg-gray-900
- 当前页面高亮 bg-white/10
- 图标 + 文字菜单项
- 底部放置用户信息

## 响应式

大屏幕：侧边栏 + 4列KPI + 图表
中等屏幕：侧边栏 + 2列KPI
小屏幕：隐藏侧边栏 + 1列KPI

## 自检

1. 侧边导航深色固定
2. KPI卡片数据清晰
3. 图表区域比例适当
4. 状态颜色编码正确
5. 响应式适配完善`,examplePrompts:[{title:"电商仪表盘",titleEn:"E-commerce Dashboard",description:"电商数据分析仪表盘",descriptionEn:"E-commerce analytics dashboard",prompt:`用 Dashboard Layout 设计一个电商仪表盘，要求：
1. 侧边栏：概览、订单、商品、客户、分析、设置
2. KPI：总收入、订单数、平均客单价、退货率
3. 主图表：收入趋势折线图（占2/3宽）
4. 辅助图表：商品分类饼图
5. 底部：最近订单表格
6. 所有数字带增长/下降百分比
7. 响应式折叠侧边栏`}]},{slug:"cyberpunk-neon",name:"赛博朋克霓虹",nameEn:"Cyberpunk Neon",description:"未来感十足的赛博朋克风格，霓虹发光效果、深色背景、高科技感的 UI 元素。适合游戏、科技产品、创意工作室。",cover:"/styles/cyberpunk-neon.svg",styleType:"visual",tags:["expressive","modern","high-contrast"],category:"expressive",colors:{primary:"#00ffff",secondary:"#0a0a0f",accent:["#ff00ff","#ffff00","#00ff00"]},keywords:["赛博朋克","霓虹","未来","发光","游戏","科技"],philosophy:`Cyberpunk Neon 风格来源于赛博朋克科幻美学，通过霓虹发光、深色背景和高对比度创造未来感。

核心理念：
- 霓虹发光：核心元素使用发光效果突出
- 深色主导：近乎纯黑的背景让霓虹更加醒目
- 高科技感：使用网格、扫描线等元素增加科技感
- 色彩冲击：青色、品红、黄色等高饱和度颜色`,doList:["背景使用深色 bg-[#0a0a0f] 或 bg-gray-950","使用 shadow-[0_0_20px_rgba(0,255,255,0.5)] 创造发光效果","文字发光 [text-shadow:0_0_10px_currentColor]","边框发光 border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.3)]","使用扫描线背景效果增加科技感","按钮悬停增强发光 hover:shadow-[0_0_30px_rgba(0,255,255,0.7)]","渐变文字 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"],dontList:["禁止使用浅色/白色背景","禁止使用低饱和度颜色","禁止使用普通阴影 shadow-md（必须是发光阴影）","禁止使用暖色调（除非作为警告/错误色）","禁止圆角过大 rounded-2xl, rounded-3xl","禁止使用柔和/温暖的设计语言"],components:{button:{name:"按钮",description:"Cyberpunk 风格的霓虹按钮",code:`// Neon Primary
<button className="px-6 py-3 bg-transparent border border-cyan-400 text-cyan-400 rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] hover:bg-cyan-400/10 transition-all duration-300 font-mono uppercase tracking-wider">
  Initialize
</button>

// Neon Filled
<button className="px-6 py-3 bg-cyan-400 text-black rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,0.7)] transition-all duration-300 font-mono font-bold uppercase tracking-wider">
  Execute
</button>

// Magenta Variant
<button className="px-6 py-3 bg-transparent border border-fuchsia-500 text-fuchsia-500 rounded-lg shadow-[0_0_15px_rgba(255,0,255,0.4)] hover:shadow-[0_0_25px_rgba(255,0,255,0.6)] hover:bg-fuchsia-500/10 transition-all duration-300 font-mono uppercase tracking-wider">
  Override
</button>`},card:{name:"卡片",description:"Cyberpunk 风格的发光卡片",code:`<div className="bg-gray-950 border border-cyan-400/30 rounded-lg p-6 shadow-[0_0_15px_rgba(0,255,255,0.2)] hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] hover:border-cyan-400/50 transition-all duration-300 relative overflow-hidden">
  {/* Scan line effect */}
  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.03)_50%)] bg-[length:100%_4px] pointer-events-none" />

  <div className="relative">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
      <h3 className="text-cyan-400 font-mono uppercase tracking-wider text-sm">System Module</h3>
    </div>
    <h4 className="text-white text-xl font-bold mb-3" style={{textShadow: '0 0 10px rgba(255,255,255,0.3)'}}>
      Neural Interface
    </h4>
    <p className="text-gray-400 leading-relaxed">
      Advanced cybernetic enhancement module with quantum processing.
    </p>
  </div>
</div>`},input:{name:"输入框",description:"Cyberpunk 风格的输入框",code:`<div className="space-y-2">
  <label className="block text-cyan-400 font-mono text-xs uppercase tracking-wider">Access Code</label>
  <div className="relative">
    <input
      type="text"
      className="w-full px-4 py-3 bg-gray-950 border border-cyan-400/30 rounded-lg text-cyan-400 font-mono placeholder:text-cyan-400/30 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300"
      placeholder="Enter credentials..."
    />
    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)] animate-pulse" />
  </div>
</div>`}},globalCss:`/* Cyberpunk Neon Global Styles */
@layer base {
  body {
    @apply bg-[#0a0a0f] text-white antialiased;
    background-image:
      linear-gradient(transparent 50%, rgba(0, 255, 255, 0.02) 50%);
    background-size: 100% 4px;
  }

  h1, h2, h3 {
    text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  }

  ::selection {
    @apply bg-cyan-400 text-black;
  }
}

@keyframes neon-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}`,aiRules:`STYLE: Cyberpunk Neon
TYPE: Futuristic sci-fi interface

MUST USE:
- Dark background: bg-[#0a0a0f] or bg-gray-950
- Neon glow shadows: shadow-[0_0_20px_rgba(0,255,255,0.5)]
- Text glow: style={{textShadow: '0 0 10px currentColor'}}
- Glowing borders: border border-cyan-400 shadow-[0_0_10px...]
- High saturation colors: cyan-400, fuchsia-500, yellow-400
- font-mono for tech text
- uppercase tracking-wider for labels

MUST AVOID:
- Light/white backgrounds
- Low saturation colors
- Regular shadows (shadow-md)
- Warm color schemes
- Large rounded corners (rounded-2xl+)
- Soft/friendly design language

COLOR RULES:
- Primary: Cyan (#00ffff)
- Accent: Magenta (#ff00ff)
- Background: Near-black (#0a0a0f)
- Text: White with glow
- Borders: Primary color with glow

SPECIAL EFFECTS:
- Scan line overlay for tech feel
- Pulsing elements with animate-pulse
- Glow intensifies on hover`,examplePrompts:[{title:"游戏界面",titleEn:"Game Interface",description:"生成赛博朋克风格游戏 UI",descriptionEn:"Generate cyberpunk game interface",prompt:`Create a game interface using Cyberpunk Neon style:
- Dark background with scan line effect
- Neon glowing HUD elements
- Stats cards with cyan borders and glow
- Action buttons with pulse animation
- Futuristic font-mono typography
- Magenta accent for alerts/warnings`}]},{slug:"synthwave",name:"合成波",nameEn:"Synthwave",description:"80年代复古未来主义音乐美学，霓虹粉紫配色、网格地平线、日落渐变和复古科技感，充满怀旧的未来想象。",cover:"/styles/synthwave.svg",styleType:"visual",tags:["retro","expressive","high-contrast"],category:"retro",colors:{primary:"#ff00ff",secondary:"#00ffff",accent:["#ff6ec7","#7b68ee","#ff1493"]},keywords:["合成波","80年代","霓虹","复古未来","网格","日落"],philosophy:`Synthwave（合成波）是一种源于2000年代中期的电子音乐流派和视觉美学，致敬80年代的科幻电影、电子游戏和合成器音乐。

核心理念：
- 复古未来：对80年代未来想象的怀旧
- 霓虹美学：粉色、紫色、青色的霓虹灯效果
- 网格地平线：透视网格延伸至地平线
- 日落渐变：橙粉紫的日落天空`,doList:["使用粉紫青霓虹配色","添加透视网格背景","使用日落渐变（橙→粉→紫）","添加霓虹发光效果","使用复古风格字体","添加太阳/山脉剪影元素"],dontList:["禁止使用明亮的白色背景","禁止使用现代简约的设计","禁止省略霓虹发光效果","禁止使用过于正式的字体"],components:{button:{name:"按钮",description:"合成波风格按钮",code:`<button className="
  px-8 py-4
  bg-transparent
  border-2 border-pink-500
  text-pink-500 font-bold uppercase tracking-wider
  shadow-[0_0_10px_rgba(255,0,255,0.5),inset_0_0_10px_rgba(255,0,255,0.1)]
  hover:bg-pink-500 hover:text-black
  hover:shadow-[0_0_20px_rgba(255,0,255,0.8),0_0_40px_rgba(255,0,255,0.4)]
  transition-all duration-300
">
  Start
</button>`},card:{name:"卡片",description:"合成波风格卡片",code:`<div className="
  p-8
  bg-gradient-to-b from-purple-900/80 to-black/80
  border border-pink-500/50
  shadow-[0_0_20px_rgba(255,0,255,0.2)]
  backdrop-blur-sm
">
  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 mb-3">
    RETRO FUTURE
  </h3>
  <p className="text-pink-200/70">
    Back to the 80s
  </p>
</div>`},input:{name:"输入框",description:"合成波风格输入框",code:`<input
  type="text"
  placeholder="Enter text..."
  className="
    w-full px-6 py-4
    bg-black/50
    border-2 border-cyan-500/50
    text-cyan-100 placeholder-cyan-500/50
    shadow-[0_0_10px_rgba(0,255,255,0.1)]
    focus:border-pink-500
    focus:shadow-[0_0_20px_rgba(255,0,255,0.3)]
    focus:outline-none
    transition-all
  "
/>`},hero:{name:"Hero 区块",description:"合成波风格 Hero",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-purple-900 via-pink-900 to-orange-900
  relative overflow-hidden
">
  {/* Sun */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-t from-orange-500 via-pink-500 to-purple-500 rounded-t-full opacity-80" />

  {/* Grid floor */}
  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(transparent_0%,rgba(255,0,255,0.1)_100%)]">
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,255,0.3)_1px,transparent_1px),linear-gradient(rgba(255,0,255,0.3)_1px,transparent_1px)] bg-[size:60px_30px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom" />
  </div>

  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-purple-600 mb-6" style="text-shadow: 0 0 40px rgba(255,0,255,0.5)">
      SYNTHWAVE
    </h1>
    <p className="text-xl text-pink-200/80 mb-8">
      Ride into the sunset
    </p>
    <button className="
      px-10 py-4
      bg-gradient-to-r from-pink-500 to-purple-500
      text-white font-bold uppercase tracking-wider
      shadow-[0_0_30px_rgba(255,0,255,0.5)]
      hover:shadow-[0_0_50px_rgba(255,0,255,0.8)]
      transition-all
    ">
      Drive
    </button>
  </div>
</section>`}},globalCss:`/* Synthwave 全局样式 */

:root {
  --synth-pink: #ff00ff;
  --synth-cyan: #00ffff;
  --synth-purple: #7b68ee;
  --synth-orange: #ff6ec7;
}

/* 霓虹发光 */
.synth-glow {
  text-shadow:
    0 0 10px var(--synth-pink),
    0 0 20px var(--synth-pink),
    0 0 40px var(--synth-pink);
}

/* 网格地板 */
.synth-grid {
  background-image:
    linear-gradient(90deg, rgba(255, 0, 255, 0.3) 1px, transparent 1px),
    linear-gradient(rgba(255, 0, 255, 0.3) 1px, transparent 1px);
  background-size: 60px 30px;
  transform: perspective(500px) rotateX(60deg);
  transform-origin: bottom;
}

/* 日落渐变 */
.synth-sunset {
  background: linear-gradient(
    to bottom,
    #1a0533 0%,
    #4a1942 30%,
    #ff6b6b 60%,
    #feca57 100%
  );
}

/* 扫描线 */
.synth-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15) 0px,
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}`,aiRules:`你是一个 Synthwave 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用明亮的白色背景
- 使用现代简约的设计
- 省略霓虹发光效果
- 使用正式的字体

## 必须遵守

- 粉紫青配色 from-pink-500, from-purple-500, from-cyan-500
- 深色背景 bg-purple-900, bg-black
- 霓虹发光 shadow-[0_0_20px_rgba(255,0,255,0.5)]
- 网格背景装饰
- 日落渐变 from-orange-500 via-pink-500 to-purple-500

## 配色

主色调：
- 粉色: #ff00ff, from-pink-500
- 青色: #00ffff, from-cyan-500
- 紫色: #7b68ee, from-purple-500
- 橙色: #ff6ec7

## 特殊元素

- 透视网格地板
- 日落太阳
- 山脉剪影
- 扫描线效果`,examplePrompts:[{title:"复古游戏界面",titleEn:"Retro Game Interface",description:"80年代风格游戏UI",descriptionEn:"80s style game UI",prompt:`用 Synthwave 风格创建一个复古游戏界面，要求：
1. 背景：日落渐变 + 网格地板
2. 标题：霓虹发光效果
3. 按钮：霓虹边框
4. 添加太阳和山脉剪影
5. 整体复古未来感`}]},{slug:"neo-brutalist-soft",name:"柔和野兽派",nameEn:"Neo-Brutalist Soft",description:"Neo-Brutalist 的温和版本。保留硬边缘阴影和无圆角特性，但使用更柔和的配色、较细的边框和更温和的对比度。",cover:"/styles/neo-brutalist-soft.svg",styleType:"visual",tags:["modern","expressive"],category:"expressive",colors:{primary:"#1a1a1a",secondary:"#f5f5f5",accent:["#f472b6","#a3e635","#38bdf8","#fbbf24"]},keywords:["柔和野兽派","温和对比","浅色阴影","细边框","淡彩"],philosophy:`Neo-Brutalist Soft（柔和野兽派）是原版 Neo-Brutalist 的温和变体。它保留了核心的结构特征——无圆角、硬边缘阴影、hover 位移效果——但通过以下方式软化了视觉冲击：

调整策略：
- 边框从 4px 减为 2px
- 阴影颜色使用灰色而非纯黑
- 配色使用柔和的马卡龙色调
- 对比度适度降低，更护眼

适用场景：需要野兽派风格但目标用户偏好温和视觉的产品`,doList:["保持无圆角 rounded-none","使用较细边框 border-2 border-gray-800（非纯黑）","使用灰色阴影 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]","配色使用柔和版本（如 pink-400 而非 #ff006e）","hover 阴影消失 + 位移效果保留","背景使用浅灰 bg-gray-50 而非纯白","文字使用深灰 text-gray-800 而非纯黑"],dontList:["禁止圆角","禁止模糊阴影 shadow-lg","禁止纯黑边框 border-black","禁止高饱和度的纯色","禁止纯黑背景","禁止渐变"],components:{button:{name:"按钮",description:"柔和版 Brutal 按钮",code:`<button className="
  bg-pink-400 text-white font-bold
  px-4 py-2 md:px-6 md:py-3
  border-2 border-gray-800
  shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
  md:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]
  hover:shadow-none
  hover:translate-x-[2px] hover:translate-y-[2px]
  transition-all
  text-sm md:text-base
">
  柔和按钮
</button>

{/* 次要按钮 */}
<button className="
  bg-gray-50 text-gray-800 font-bold
  px-4 py-2 md:px-6 md:py-3
  border-2 border-gray-800
  shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]
  hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
  hover:bg-lime-300
  transition-all
">
  次要按钮
</button>`},card:{name:"卡片",description:"柔和阴影的卡片",code:`<div className="
  bg-white
  border-2 border-gray-800
  shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]
  md:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)]
  hover:shadow-[6px_6px_0px_0px_rgba(244,114,182,0.4)]
  md:hover:shadow-[8px_8px_0px_0px_rgba(244,114,182,0.4)]
  hover:-translate-y-1
  transition-all duration-300
  p-4 md:p-6
">
  <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-2">卡片标题</h3>
  <p className="font-mono text-sm md:text-base text-gray-600">
    柔和的卡片描述文字
  </p>
</div>`},input:{name:"输入框",description:"柔和边框的输入框",code:`<input
  type="text"
  placeholder="请输入..."
  className="
    w-full
    px-3 py-2 md:px-4 md:py-3
    border-2 border-gray-800
    bg-gray-50
    font-mono text-sm md:text-base text-gray-800
    focus:outline-none
    focus:shadow-[4px_4px_0px_0px_rgba(56,189,248,0.3)]
    transition-shadow
    placeholder:text-gray-400
  "
/>`},nav:{name:"导航栏",description:"柔和风格的导航",code:`<nav className="
  bg-gray-50
  border-b-2 border-gray-800
  px-4 md:px-8
  py-3 md:py-4
">
  <div className="flex items-center justify-between max-w-6xl mx-auto">
    <a href="/" className="font-bold text-lg md:text-xl text-gray-800">
      LOGO
    </a>
    <div className="flex gap-4 md:gap-8">
      <a href="#" className="font-mono text-sm md:text-base text-gray-600 hover:text-pink-500 transition-colors">
        首页
      </a>
      <a href="#" className="font-mono text-sm md:text-base text-gray-600 hover:text-pink-500 transition-colors">
        关于
      </a>
    </div>
  </div>
</nav>`},hero:{name:"Hero 区块",description:"柔和配色的 Hero",code:`<section className="
  min-h-[60vh] md:min-h-[80vh]
  flex items-center
  px-4 md:px-8
  py-12 md:py-0
  bg-lime-200
  border-b-2 border-gray-800
">
  <div className="max-w-4xl mx-auto">
    <h1 className="
      font-bold
      text-3xl md:text-5xl lg:text-7xl
      leading-tight
      text-gray-800
      mb-4 md:mb-6
    ">
      柔和的<br />
      野兽派
    </h1>
    <p className="
      font-mono
      text-base md:text-lg
      text-gray-700
      max-w-xl
      mb-6 md:mb-8
    ">
      保留结构，软化视觉
    </p>
    <button className="
      bg-gray-800 text-white font-bold
      px-6 py-3 md:px-8 md:py-4
      border-2 border-gray-800
      shadow-[4px_4px_0px_0px_rgba(244,114,182,0.5)]
      hover:shadow-none
      hover:translate-x-[2px] hover:translate-y-[2px]
      transition-all
    ">
      开始探索
    </button>
  </div>
</section>`}},globalCss:`/* Neo-Brutalist Soft 全局样式 */
:root {
  --soft-pink: #f472b6;
  --soft-green: #a3e635;
  --soft-blue: #38bdf8;
  --soft-yellow: #fbbf24;
  --soft-bg: #f5f5f5;
  --soft-text: #1a1a1a;
  --soft-border: #1f2937;
}

body {
  background: var(--soft-bg);
  color: var(--soft-text);
}

/* 标题字体 - 粗体但非极黑 */
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  letter-spacing: -0.01em;
}

/* 正文字体 */
body {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

/* 选中文字 - 柔和粉色 */
::selection {
  background: var(--soft-pink);
  color: white;
}`,aiRules:`你是一个 Neo-Brutalist Soft（柔和野兽派）设计风格的前端开发专家。这是 Neo-Brutalist 的温和版本。

## 核心保留

- 无圆角 rounded-none
- 硬边缘阴影（但用灰色/半透明）
- hover 位移效果

## 调整规则

边框：
- 使用 border-2（非 border-4）
- 使用 border-gray-800（非 border-black）

阴影：
- 使用 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
- 彩色阴影用半透明：rgba(244,114,182,0.4)

配色：
- 背景：#f5f5f5（浅灰）
- 文字：#1a1a1a（深灰非纯黑）
- 粉色：#f472b6（pink-400）
- 绿色：#a3e635（lime-400）
- 蓝色：#38bdf8（sky-400）
- 黄色：#fbbf24（amber-400）

## 禁止

- 纯黑边框 border-black
- 纯黑阴影 rgba(0,0,0,1)
- 高饱和纯色
- 圆角
- 模糊阴影`,examplePrompts:[{title:"待办事项应用",titleEn:"Todo App",description:"柔和野兽派风格的任务管理",descriptionEn:"Soft brutalist task management",prompt:`用 Neo-Brutalist Soft 风格创建一个待办事项应用，要求：
1. 整体色调：柔和的灰色边框（zinc-300），淡粉/淡蓝/淡绿背景
2. 任务卡片：无圆角，浅色硬阴影，可拖拽
3. 添加按钮：柔和彩色背景，hover 时阴影消失 + 位移
4. 复选框：方形，选中时背景变为柔和强调色
5. 分类标签：不同柔和色区分
保持野兽派的硬边缘，但用柔和色彩降低视觉冲击`},{title:"笔记应用",titleEn:"Notes App",description:"简洁的笔记记录界面",descriptionEn:"Clean note-taking interface",prompt:`用 Neo-Brutalist Soft 风格设计一个笔记应用，要求：
1. 侧边栏：笔记列表，每项有柔和色标签
2. 编辑区：大面积留白，无圆角边框
3. 工具栏：简洁图标按钮，hover 时柔和背景
4. 标签系统：柔和色彩的方形标签
5. 搜索框：zinc-300 边框，focus 时阴影出现
整体用柔和粉、蓝、绿、黄作为点缀色`},{title:"个人博客",titleEn:"Personal Blog",description:"温和风格的博客主页",descriptionEn:"Gentle style blog homepage",prompt:`用 Neo-Brutalist Soft 风格创建一个个人博客，要求：
1. 导航：细灰边框，链接 hover 变柔和粉色
2. 文章卡片：白色背景，浅色硬阴影，hover 上浮
3. 标签：柔和彩色背景，无圆角
4. 侧边栏：关于我、归档、标签云
5. 页脚：简洁，细边框分隔
色彩：zinc-300 边框，强调用 pink-200, sky-200, lime-200`}]},{slug:"neo-brutalist-playful",name:"俏皮野兽派",nameEn:"Neo-Brutalist Playful",description:"Neo-Brutalist 的活泼版本。保留核心特征，加入更多色彩、旋转倾斜元素、图标化装饰和有趣的微交互，适合年轻化品牌。",cover:"/styles/neo-brutalist-playful.svg",styleType:"visual",tags:["expressive"],category:"expressive",colors:{primary:"#000000",secondary:"#ffffff",accent:["#ff6b6b","#4ecdc4","#ffe66d","#95e1d3","#f38181"]},keywords:["俏皮野兽派","多彩","倾斜元素","图标","年轻化"],philosophy:`Neo-Brutalist Playful（俏皮野兽派）是原版 Neo-Brutalist 的活泼变体。在保持硬边缘、无圆角的结构基础上，通过以下方式增加趣味性：

特色元素：
- 元素轻微旋转 rotate-[-2deg] 或 rotate-[1deg]
- 多彩色块组合
- 适当使用图标作为装饰（Lucide React 等）
- 更活泼的 hover 动画（scale、bounce）
- 手写风格的装饰文字

适用场景：年轻化品牌、创意工作室、儿童产品、趣味应用`,doList:["保持无圆角 rounded-none","使用纯黑边框 border-4 border-black","元素添加轻微旋转 rotate-[-2deg] rotate-[1deg]","使用多种强调色，色彩丰富","hover 可用 scale-105 放大效果","适当使用图标装饰（Lucide React 等）","阴影可使用彩色 shadow-[...rgba(255,107,107,1)]"],dontList:["禁止圆角","禁止模糊阴影","禁止渐变","禁止旋转超过 3 度","禁止使用 emoji 或符号字符","禁止使用柔和的灰色"],components:{button:{name:"按钮",description:"俏皮版 Brutal 按钮",code:`{/* 带旋转的主按钮 */}
<button className="
  bg-[#ff6b6b] text-white font-black
  px-6 py-3 md:px-8 md:py-4
  border-4 border-black
  shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
  hover:shadow-none
  hover:translate-x-[3px] hover:translate-y-[3px]
  hover:scale-105
  transition-all
  rotate-[-1deg]
  text-base md:text-lg
">
  点我呀
</button>

{/* 多彩按钮组 */}
<div className="flex gap-4">
  <button className="bg-[#4ecdc4] ...">Go!</button>
  <button className="bg-[#ffe66d] text-black ...">Yeah!</button>
</div>`},card:{name:"卡片",description:"带旋转和彩色阴影的卡片",code:`<div className="
  bg-white
  border-4 border-black
  shadow-[8px_8px_0px_0px_rgba(78,205,196,1)]
  hover:shadow-[12px_12px_0px_0px_rgba(255,107,107,1)]
  hover:-translate-y-2 hover:scale-[1.02]
  transition-all duration-300
  p-6 md:p-8
  rotate-[1deg]
">
  <div className="mb-4 flex items-center gap-2">
    <div className="h-4 w-4 bg-[#ff6b6b] border-2 border-black" />
    <div className="h-4 w-4 bg-[#4ecdc4] border-2 border-black" />
    <div className="h-4 w-4 bg-[#ffe66d] border-2 border-black" />
  </div>
  <h3 className="font-black text-xl md:text-2xl mb-2">有趣的卡片</h3>
  <p className="font-mono text-sm md:text-base text-gray-700">
    带有轻微旋转和彩色阴影
  </p>
</div>`},input:{name:"输入框",description:"俏皮风格的输入框",code:`<div className="relative">
  <input
    type="text"
    placeholder="输入点什么..."
    className="
      w-full
      px-4 py-3 md:px-6 md:py-4
      border-4 border-black
      bg-[#ffe66d]
      font-mono text-base md:text-lg
      focus:outline-none
      focus:shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]
      transition-all
      placeholder:text-gray-600
    "
  />
  <span
    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 bg-black rotate-45"
    aria-hidden="true"
  />
</div>`},nav:{name:"导航栏",description:"俏皮风格的导航",code:`<nav className="
  bg-[#ffe66d]
  border-b-4 border-black
  px-4 md:px-8
  py-4 md:py-5
">
  <div className="flex items-center justify-between max-w-6xl mx-auto">
    <a href="/" className="
      font-black text-xl md:text-2xl
      bg-black text-white px-3 py-1
      rotate-[-2deg]
      hover:scale-110 transition-transform
    ">
      FUN
    </a>
    <div className="flex gap-3 md:gap-6">
      <a href="#" className="
        font-black text-sm md:text-base
        px-3 py-1 border-2 border-black
        hover:bg-[#ff6b6b] hover:text-white
        transition-colors
      ">
        首页
      </a>
      <a href="#" className="
        font-black text-sm md:text-base
        px-3 py-1 border-2 border-black
        hover:bg-[#4ecdc4]
        transition-colors
      ">
        关于
      </a>
    </div>
  </div>
</nav>`},hero:{name:"Hero 区块",description:"俏皮多彩的 Hero",code:`<section className="
  min-h-screen
  flex items-center
  px-4 md:px-8
  bg-[#4ecdc4]
  border-b-4 border-black
  overflow-hidden
">
  <div className="max-w-4xl mx-auto relative">
    {/* 装饰元素 */}
    <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#ffe66d] border-4 border-black rotate-12" />
    <div className="absolute bottom-0 -left-16 w-20 h-20 bg-[#ff6b6b] border-4 border-black -rotate-12" />

    <h1 className="
      font-black
      text-5xl md:text-7xl lg:text-9xl
      leading-none
      mb-6
      rotate-[-2deg]
    ">
      PLAY<br />
      <span className="text-white">FUL!</span>
    </h1>
    <p className="
      font-mono
      text-lg md:text-xl
      max-w-md
      mb-8
      rotate-[1deg]
    ">
      野兽派也可以很有趣
    </p>
    <div className="flex flex-wrap gap-4">
      <button className="
        bg-[#ff6b6b] text-white font-black
        px-8 py-4 border-4 border-black
        shadow-[6px_6px_0px_0px_black]
        hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]
        transition-all rotate-[-1deg]
      ">
        开始玩
      </button>
      <button className="
        bg-[#ffe66d] font-black
        px-8 py-4 border-4 border-black
        shadow-[6px_6px_0px_0px_black]
        hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]
        transition-all rotate-[1deg]
      ">
        看看吧
      </button>
    </div>
  </div>
</section>`}},globalCss:`/* Neo-Brutalist Playful 全局样式 */
:root {
  --playful-red: #ff6b6b;
  --playful-teal: #4ecdc4;
  --playful-yellow: #ffe66d;
  --playful-mint: #95e1d3;
  --playful-coral: #f38181;
}

body {
  background: white;
  color: black;
}

/* 标题 - 极粗 */
h1, h2, h3, h4, h5, h6 {
  font-weight: 900;
}

/* 选中文字 - 俏皮红 */
::selection {
  background: var(--playful-red);
  color: white;
}

/* 有趣的下划线 */
.fun-underline {
  text-decoration: underline;
  text-decoration-color: var(--playful-yellow);
  text-decoration-thickness: 4px;
  text-underline-offset: 4px;
}`,aiRules:`你是一个 Neo-Brutalist Playful（俏皮野兽派）设计风格的前端开发专家。这是 Neo-Brutalist 的活泼版本。

## 核心保留

- 无圆角 rounded-none
- 粗边框 border-4 border-black
- 硬边缘阴影
- hover 位移效果

## 俏皮元素

旋转：
- 元素添加轻微旋转 rotate-[-2deg] rotate-[1deg] rotate-[-1deg]
- 不超过 3 度

彩色阴影：
- shadow-[6px_6px_0px_0px_rgba(255,107,107,1)]
- shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]
- hover 时阴影变色

配色（多彩）：
- 红色：#ff6b6b
- 青色：#4ecdc4
- 黄色：#ffe66d
- 薄荷：#95e1d3
- 珊瑚：#f38181

图标与装饰：
- 禁止使用 emoji 字符
- 可使用 Lucide React 线性图标作为点缀
- 装饰元素优先用几何图形（方块、圆点、线条）

交互效果：
- hover:scale-105 放大
- hover:-translate-y-2 上浮
- transition-all duration-300

## 禁止

- 圆角
- 模糊阴影
- 渐变
- 灰暗配色`,examplePrompts:[{title:"儿童教育网站",titleEn:"Kids Education Website",description:"活泼有趣的学习平台",descriptionEn:"Fun and engaging learning platform",prompt:`用 Neo-Brutalist Playful 风格创建一个儿童教育网站，要求：
1. 导航：彩色按钮，每个用不同鲜艳色
2. Hero：大标题带颜色高亮，可爱插图
3. 课程卡片：彩色边框和阴影，hover 放大 + 上浮
4. 进度条：彩色条纹或波浪效果
5. 按钮：圆形装饰点缀，hover 时旋转
配色：明黄、粉红、天蓝、青绿交替使用`},{title:"活动报名页",titleEn:"Event Registration Page",description:"有趣的活动宣传和报名",descriptionEn:"Fun event promotion and registration",prompt:`用 Neo-Brutalist Playful 风格设计一个活动报名页，要求：
1. Hero：大胆标题，彩色文字或高亮背景
2. 活动信息：卡片式布局，每个信息点用不同色块
3. 时间线：彩色圆点连接，每阶段不同色
4. 报名表单：彩色边框输入框，提交按钮醒目
5. 装饰：几何图形点缀（方块、圆点）
整体活泼但保持野兽派的硬边缘和粗边框`},{title:"创意作品集",titleEn:"Creative Portfolio",description:"个性化的作品展示",descriptionEn:"Personalized work showcase",prompt:`用 Neo-Brutalist Playful 风格创建一个创意作品集，要求：
1. 首页：大胆的自我介绍，彩色文字
2. 作品网格：每个项目卡片用不同彩色阴影
3. 项目详情：全屏图片，彩色边框
4. 技能展示：彩色进度条或图标
5. 联系区：趣味表单，彩色按钮
保持无圆角、粗边框、硬阴影的野兽派特征`}]},{slug:"art-nouveau",name:"新艺术运动风",nameEn:"Art Nouveau",description:"源自19世纪末的有机曲线美学，以流动的藤蔓纹样、自然花卉元素、Mucha风格海报装饰和优雅的衬线字体为特征，传递自然与艺术的和谐统一。",cover:"/styles/art-nouveau.svg",styleType:"visual",tags:["retro","expressive"],category:"retro",colors:{primary:"#2d5016",secondary:"#f5f0e1",accent:["#c9a227","#8b6db5","#4a7c3f"]},keywords:["新艺术","有机曲线","藤蔓","花卉","Mucha","装饰","自然"],philosophy:`Art Nouveau（新艺术运动）是19世纪末至20世纪初的国际性艺术运动，以自然界的有机形态为灵感，将装饰艺术推向极致。

核心理念：
- 有机曲线：受植物和花卉启发的流动线条
- 自然统一：艺术与自然的和谐融合
- 整体设计：从建筑到家具到海报的统一美学
- 装饰之美：精致的装饰纹样赋予功能性物品以艺术价值`,doList:["使用有机曲线和流动线条","采用深绿、金色、象牙白为主色调","添加藤蔓、花卉等自然装饰元素","使用衬线或装饰性字体","保持优雅精致的整体质感","圆润的边角和柔和的过渡"],dontList:["禁止使用生硬的直角和几何形状","禁止使用霓虹或高饱和度的现代色彩","禁止使用粗犷的无装饰设计","禁止使用现代无衬线字体作为标题"],components:{button:{name:"按钮",description:"新艺术风格按钮",code:`<button className="
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
</button>`},card:{name:"卡片",description:"新艺术风格卡片",code:`<div className="
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
</div>`},input:{name:"输入框",description:"新艺术风格输入框",code:`<input
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
/>`},hero:{name:"Hero 区块",description:"新艺术风格 Hero",code:`<section className="
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
</section>`}},globalCss:`/* Art Nouveau 全局样式 */

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
}`,aiRules:`你是一个 Art Nouveau 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

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
- 优雅的渐变过渡`,examplePrompts:[{title:"花卉展览页面",titleEn:"Floral Exhibition Page",description:"Art Nouveau风格的花卉展览展示",descriptionEn:"Floral exhibition showcase in Art Nouveau style",prompt:`用 Art Nouveau 风格创建一个花卉展览页面，要求：
1. 背景：象牙白渐变 + 有机曲线装饰
2. 标题：衬线字体，深绿色
3. 卡片：金色边框，圆润边角
4. 添加藤蔓和花卉 SVG 装饰元素
5. 整体优雅精致的自然美学`}]},{slug:"surrealism",name:"超现实主义风",nameEn:"Surrealism",description:"灵感源自Dali等超现实主义大师，梦境般的场景构成、不合逻辑的空间关系、融化变形的形态和意想不到的色彩组合，营造神秘而引人入胜的视觉体验。",cover:"/styles/surrealism.svg",styleType:"visual",tags:["expressive","retro"],category:"expressive",colors:{primary:"#1a1a3e",secondary:"#f0ece4",accent:["#d4a574","#c38d94","#4a3f6b"]},keywords:["超现实","梦境","Dali","融化","不合逻辑","潜意识","奇幻"],philosophy:`Surrealism（超现实主义）是20世纪初的艺术运动，致力于释放潜意识的创造力，打破理性与非理性的界限。

核心理念：
- 梦境逻辑：超越现实的视觉叙事
- 意外并置：不相关元素的奇妙组合
- 变形流动：融化、扭曲的形态
- 潜意识探索：深层心理的视觉表达`,doList:["使用午夜蓝和沙漠金的配色","创造梦境般的柔和渐变","使用意想不到的元素组合","添加柔和的阴影营造深度","使用衬线字体和斜体","保持神秘而优雅的氛围"],dontList:["禁止使用过于明亮的纯色","禁止使用严格对称的网格布局","禁止使用现代简约的无装饰设计","禁止使用刺眼的霓虹色彩"],components:{button:{name:"按钮",description:"超现实主义风格按钮",code:`<button className="
  px-8 py-4
  bg-gradient-to-r from-[#1a1a3e] to-[#c38d94]
  text-[#f0ece4] font-serif italic tracking-wide
  border border-[#d4a574]/50
  rounded-lg shadow-lg
  hover:shadow-[0_8px_30px_rgba(195,141,148,0.4)]
  hover:scale-105
  transition-all duration-500
">
  Enter the Dream
</button>`},card:{name:"卡片",description:"超现实主义风格卡片",code:`<div className="
  p-8
  bg-gradient-to-br from-[#f0ece4] to-[#f0ece4]/80
  border border-[#d4a574]/30
  rounded-2xl shadow-lg
">
  <h3 className="text-2xl font-serif italic text-[#1a1a3e] mb-3">
    The Persistence of Memory
  </h3>
  <p className="text-[#1a1a3e]/60 font-serif">
    Time melts in the desert of consciousness
  </p>
</div>`},input:{name:"输入框",description:"超现实主义风格输入框",code:`<input
  type="text"
  placeholder="Whisper your dreams..."
  className="
    w-full px-6 py-4
    bg-[#f0ece4]
    border border-[#d4a574]/40
    rounded-lg
    text-[#1a1a3e] placeholder-[#c38d94]/50
    font-serif italic
    focus:border-[#c38d94]
    focus:shadow-[0_0_16px_rgba(195,141,148,0.3)]
    focus:outline-none
    transition-all duration-500
  "
/>`},hero:{name:"Hero 区块",description:"超现实主义风格 Hero",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-[#1a1a3e] via-[#2a2a5e] to-[#d4a574]/30
  relative overflow-hidden
">
  <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#d4a574]/20 blur-3xl" />
  <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-[#c38d94]/20 blur-3xl" />

  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-serif italic text-[#f0ece4] mb-6">
      Surrealism
    </h1>
    <p className="text-xl text-[#d4a574] font-serif italic mb-8">
      Beyond the threshold of consciousness
    </p>
    <button className="
      px-10 py-4
      bg-gradient-to-r from-[#c38d94] to-[#d4a574]
      text-[#1a1a3e] font-serif italic tracking-wide
      rounded-lg shadow-lg
      hover:shadow-[0_8px_30px_rgba(212,165,116,0.5)]
      transition-all duration-500
    ">
      Descend
    </button>
  </div>
</section>`}},globalCss:`/* Surrealism 全局样式 */

:root {
  --sr-midnight: #1a1a3e;
  --sr-gold: #d4a574;
  --sr-rose: #c38d94;
  --sr-cream: #f0ece4;
}

/* 梦境模糊光晕 */
.sr-dream-glow {
  box-shadow:
    0 0 40px rgba(212, 165, 116, 0.2),
    0 0 80px rgba(195, 141, 148, 0.1);
}

/* 超现实渐变 */
.sr-gradient {
  background: linear-gradient(
    135deg,
    var(--sr-midnight) 0%,
    #2a2a5e 40%,
    var(--sr-rose) 70%,
    var(--sr-gold) 100%
  );
}

/* 融化效果 */
.sr-melt {
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}

/* 飘浮阴影 */
.sr-float-shadow {
  box-shadow:
    0 20px 60px rgba(26, 26, 62, 0.3),
    0 0 40px rgba(195, 141, 148, 0.15);
}`,aiRules:`你是一个 Surrealism 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用纯白色背景
- 使用严格对称的网格布局
- 使用明亮的霓虹色彩
- 使用过于规整的几何形状

## 必须遵守

- 午夜蓝 #1a1a3e 为深色基调
- 沙漠金 #d4a574 和玫瑰粉 #c38d94 为强调色
- 奶油白 #f0ece4 为浅色背景
- 使用 font-serif italic 营造梦幻感
- 柔和的渐变和模糊光晕效果

## 配色

主色调：
- 午夜蓝: #1a1a3e
- 沙漠金: #d4a574
- 玫瑰粉: #c38d94
- 奶油白: #f0ece4

## 特殊元素

- 模糊光晕背景装饰
- 非对称布局和有机形状
- 柔和的过渡动画 (duration-500)
- 意想不到的颜色渐变组合`,examplePrompts:[{title:"梦境画廊",titleEn:"Dreamscape Gallery",description:"超现实主义风格的艺术画廊",descriptionEn:"Surrealist art gallery",prompt:`用 Surrealism 风格创建一个梦境画廊页面，要求：
1. 背景：午夜蓝到沙漠金的渐变
2. 标题：衬线斜体，奶油白色
3. 卡片：圆角带光晕阴影
4. 添加模糊光球装饰
5. 整体梦境般的神秘氛围`}]},{slug:"ukiyo-e-digital",name:"浮世绘数字风",nameEn:"Ukiyo-e Digital",description:"灵感源自日本浮世绘木版画，以靛蓝、朱红、金叶为主色调，扁平化设计、强烈的轮廓线、波浪纹样和北斋式构图，将传统东方美学融入现代数字界面。",cover:"/styles/ukiyo-e-digital.svg",styleType:"visual",tags:["retro","expressive"],category:"retro",colors:{primary:"#1a3055",secondary:"#f5f0e1",accent:["#d4553a","#c9a227","#2a5a8c"]},keywords:["浮世绘","木版画","北斋","波浪","和风","扁平","东方美学"],philosophy:`Ukiyo-e Digital（浮世绘数字风）将江户时代的木版画艺术转化为现代数字设计语言，保留其独特的扁平透视和色彩分区技法。

核心理念：
- 扁平透视：无景深的层叠式构图
- 色彩分区：大面积的纯色填充和强烈轮廓
- 自然意象：波浪、山川、花鸟的装饰性表达
- 东方韵味：含蓄、留白与意境的美学追求`,doList:["使用靛蓝、朱红、金叶为主色调","采用扁平设计和强烈的轮廓线","使用硬边阴影模拟版画质感","添加波浪和自然纹样装饰","米白色为背景营造和纸质感","使用粗体文字配合宽字距"],dontList:["禁止使用渐变阴影或柔和模糊","禁止使用透明度和玻璃效果","禁止使用西式圆角和圆形按钮","禁止使用霓虹色或高饱和度现代色彩"],components:{button:{name:"按钮",description:"浮世绘数字风按钮",code:`<button className="
  px-8 py-4
  bg-[#d4553a] text-[#f5f0e1]
  border-2 border-[#1a3055]
  rounded-sm font-bold tracking-wider
  shadow-[3px_3px_0px_#1a3055]
  hover:shadow-[4px_4px_0px_#1a3055]
  hover:-translate-y-0.5
  active:shadow-[1px_1px_0px_#1a3055] active:translate-y-0.5
  transition-all duration-300
">
  Enter
</button>`},card:{name:"卡片",description:"浮世绘数字风卡片",code:`<div className="
  p-8
  bg-[#f5f0e1]
  border-2 border-[#1a3055]
  rounded-sm
  shadow-[4px_4px_0px_#1a3055]
">
  <h3 className="text-2xl font-bold text-[#1a3055] tracking-wider mb-3">
    The Great Wave
  </h3>
  <p className="text-[#1a3055]/70">
    Beneath the shadow of Mount Fuji
  </p>
</div>`},input:{name:"输入框",description:"浮世绘数字风输入框",code:`<input
  type="text"
  placeholder="Enter text..."
  className="
    w-full px-6 py-4
    bg-[#f5f0e1]
    border-2 border-[#1a3055]/60
    rounded-sm
    text-[#1a3055] placeholder-[#1a3055]/40
    focus:border-[#d4553a]
    focus:shadow-[2px_2px_0px_#d4553a]
    focus:outline-none
    transition-all
  "
/>`},hero:{name:"Hero 区块",description:"浮世绘数字风 Hero",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#f5f0e1]
  relative overflow-hidden
">
  {/* Wave decoration */}
  <div className="absolute bottom-0 left-0 right-0 h-1/3">
    <svg viewBox="0 0 1200 300" className="w-full h-full fill-[#1a3055]/10">
      <path d="M0,150 Q150,50 300,150 T600,150 T900,150 T1200,150 L1200,300 L0,300 Z" />
    </svg>
  </div>

  {/* Sun circle */}
  <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-[#d4553a]/20 border-2 border-[#d4553a]/30" />

  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-bold text-[#1a3055] tracking-wider mb-6">
      UKIYO-E
    </h1>
    <p className="text-xl text-[#1a3055]/70 tracking-widest mb-8">
      Floating world in digital form
    </p>
    <button className="
      px-10 py-4
      bg-[#d4553a] text-[#f5f0e1]
      border-2 border-[#1a3055]
      rounded-sm font-bold tracking-wider
      shadow-[4px_4px_0px_#1a3055]
      hover:shadow-[6px_6px_0px_#1a3055]
      hover:-translate-y-0.5
      transition-all duration-300
    ">
      Discover
    </button>
  </div>
</section>`}},globalCss:`/* Ukiyo-e Digital 全局样式 */

:root {
  --ue-indigo: #1a3055;
  --ue-vermilion: #d4553a;
  --ue-gold: #c9a227;
  --ue-rice: #f5f0e1;
}

/* 硬边阴影 */
.ue-shadow {
  box-shadow: 4px 4px 0px var(--ue-indigo);
}

/* 波浪纹装饰 */
.ue-wave-bg {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,25 Q50,0 100,25 T200,25' fill='none' stroke='%231a3055' stroke-width='1' opacity='0.1'/%3E%3C/svg%3E");
  background-size: 200px 50px;
  background-repeat: repeat;
}

/* 和纸质感 */
.ue-washi {
  background-color: var(--ue-rice);
  background-image: radial-gradient(
    circle at 50% 50%,
    rgba(26, 48, 85, 0.02) 0%,
    transparent 80%
  );
}

/* 朱印效果 */
.ue-stamp {
  border: 2px solid var(--ue-vermilion);
  padding: 4px 8px;
  color: var(--ue-vermilion);
  font-weight: bold;
}`,aiRules:`你是一个 Ukiyo-e Digital 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用渐变阴影或柔和模糊效果
- 使用透明度和玻璃拟态
- 使用大圆角或圆形按钮
- 使用霓虹色或高饱和度现代色彩

## 必须遵守

- 靛蓝 #1a3055 为主色，朱红 #d4553a 为强调色
- 米白 #f5f0e1 为背景（和纸质感）
- 使用硬边阴影 shadow-[Xpx_Ypx_0px_color]
- 使用小圆角 rounded-sm 或直角
- 粗边框 border-2 营造版画轮廓感

## 配色

主色调：
- 靛蓝: #1a3055
- 朱红: #d4553a
- 金叶: #c9a227
- 米白: #f5f0e1

## 特殊元素

- 波浪纹 SVG 装饰
- 硬边阴影模拟版画质感
- 朱印/印章效果装饰
- 大面积扁平色块`,examplePrompts:[{title:"浮世绘风展示页",titleEn:"Ukiyo-e Exhibition Page",description:"木版画风格的展示页面",descriptionEn:"Woodblock print style exhibition page",prompt:`用 Ukiyo-e Digital 风格创建一个展示页面，要求：
1. 背景：米白色和纸质感
2. 标题：靛蓝粗体字，宽字距
3. 卡片：硬边阴影，强轮廓
4. 添加波浪纹和朱红装饰元素
5. 整体东方木版画美学`}]},{slug:"gothic",name:"哥特式风",nameEn:"Gothic",description:"中世纪哥特建筑美学，尖拱、玫瑰窗、手抄本装饰、大教堂氛围。深紫与血红配色，金色装饰线条，充满黑暗而庄严的神秘气息。",cover:"/styles/gothic.svg",styleType:"visual",tags:["retro","expressive","high-contrast"],category:"retro",colors:{primary:"#2d1b4e",secondary:"#8b1a1a",accent:["#c9a227","#0a0a0a","#4a2d6e"]},keywords:["哥特","中世纪","大教堂","尖拱","玫瑰窗","黑暗","神秘"],philosophy:`Gothic（哥特式）设计灵感源自中世纪晚期的大教堂建筑和手抄本装饰艺术，强调垂直线条、尖拱结构和精致的装饰纹样。

核心理念：
- 大教堂美学：尖拱、飞扶壁和玫瑰窗的结构之美
- 黑暗庄严：深色调营造神秘而肃穆的氛围
- 金色点缀：以金色装饰线条和细节突出奢华感
- 手抄本风格：繁复的装饰边框和花体字`,doList:["使用深紫、血红、黑色为主色调","添加金色装饰线条和边框","使用衬线字体传达古典感","营造黑暗、神秘的氛围","使用尖拱形状和哥特式图案","添加精致的装饰纹样"],dontList:["禁止使用明亮欢快的配色","禁止使用圆润可爱的元素","禁止使用现代无衬线字体作为主标题","禁止使用过于简约的设计"],components:{button:{name:"按钮",description:"哥特式风格按钮",code:`<button className="
  px-8 py-4
  bg-[#2d1b4e]
  border-2 border-[#c9a227]/60
  text-[#c9a227] font-serif uppercase tracking-widest
  shadow-[0_4px_16px_rgba(45,27,78,0.6)]
  hover:shadow-[0_6px_24px_rgba(201,162,39,0.4)]
  hover:border-[#c9a227]
  transition-all duration-300
">
  Enter
</button>`},card:{name:"卡片",description:"哥特式风格卡片",code:`<div className="
  p-8
  bg-[#0a0a0a]/90
  border-2 border-[#c9a227]/40
  shadow-[0_4px_20px_rgba(10,10,10,0.8)]
">
  <h3 className="text-2xl font-serif text-[#c9a227] mb-3 tracking-wider">
    CATHEDRAL
  </h3>
  <p className="text-[#c9a227]/60 font-serif">
    In the shadow of the spire
  </p>
</div>`},input:{name:"输入框",description:"哥特式风格输入框",code:`<input
  type="text"
  placeholder="Inscribe here..."
  className="
    w-full px-6 py-4
    bg-[#0a0a0a]/80
    border-2 border-[#c9a227]/30
    text-[#c9a227] placeholder-[#c9a227]/30
    font-serif
    focus:border-[#c9a227]
    focus:shadow-[0_0_16px_rgba(201,162,39,0.3)]
    focus:outline-none
    transition-all
  "
/>`},hero:{name:"Hero 区块",description:"哥特式风格 Hero",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-[#0a0a0a] via-[#2d1b4e] to-[#0a0a0a]
  relative overflow-hidden
">
  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_30%,#c9a227_0%,transparent_60%)]" />

  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-serif text-[#c9a227] mb-6 tracking-wider">
      GOTHIC
    </h1>
    <p className="text-xl text-[#c9a227]/60 font-serif mb-8">
      In tenebris lux
    </p>
    <button className="
      px-10 py-4
      bg-[#2d1b4e]
      border-2 border-[#c9a227]/60
      text-[#c9a227] font-serif uppercase tracking-widest
      shadow-[0_4px_16px_rgba(45,27,78,0.6)]
      hover:shadow-[0_6px_24px_rgba(201,162,39,0.4)]
      transition-all
    ">
      Explore
    </button>
  </div>
</section>`}},globalCss:`/* Gothic 全局样式 */

:root {
  --gothic-purple: #2d1b4e;
  --gothic-blood: #8b1a1a;
  --gothic-black: #0a0a0a;
  --gothic-gold: #c9a227;
}

/* 金色发光 */
.gothic-glow {
  text-shadow:
    0 0 10px var(--gothic-gold),
    0 0 20px rgba(201, 162, 39, 0.3);
}

/* 尖拱装饰 */
.gothic-arch {
  clip-path: polygon(0 100%, 0 20%, 50% 0, 100% 20%, 100% 100%);
}

/* 装饰边框 */
.gothic-border {
  border: 2px solid rgba(201, 162, 39, 0.4);
  box-shadow: inset 0 0 20px rgba(10, 10, 10, 0.8);
}

/* 玫瑰窗装饰 */
.gothic-rose-window {
  background: radial-gradient(
    circle,
    var(--gothic-purple) 20%,
    var(--gothic-blood) 40%,
    var(--gothic-black) 60%
  );
}`,aiRules:`你是一个 Gothic 哥特式设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用明亮的白色背景
- 使用欢快、可爱的设计元素
- 使用无衬线字体作为主标题
- 使用圆润的大圆角

## 必须遵守

- 深紫血红黑色配色 bg-[#2d1b4e], bg-[#8b1a1a], bg-[#0a0a0a]
- 金色装饰 text-[#c9a227], border-[#c9a227]
- 衬线字体 font-serif
- 深色背景 bg-[#0a0a0a]
- 精致边框装饰

## 配色

主色调：
- 深紫: #2d1b4e
- 血红: #8b1a1a
- 纯黑: #0a0a0a
- 金色: #c9a227

## 特殊元素

- 尖拱形状
- 金色装饰线
- 精致边框
- 玫瑰窗图案`,examplePrompts:[{title:"中世纪图书馆页面",titleEn:"Medieval Library Page",description:"哥特式风格图书馆目录",descriptionEn:"Gothic-style library catalog",prompt:`用 Gothic 风格创建一个中世纪图书馆页面，要求：
1. 背景：深色渐变
2. 标题：金色衬线字体
3. 卡片：深色背景配金色边框
4. 添加尖拱形装饰元素
5. 整体庄严神秘感`}]},{slug:"outrun",name:"Outrun 复古未来",nameEn:"Outrun",description:"80年代日落、棕榈树剪影、跑车、网格地平线和复古浪潮美学。洋红与紫色霓虹、青色天空，充满速度感和怀旧未来主义。",cover:"/styles/outrun.svg",styleType:"visual",tags:["retro","expressive","high-contrast"],category:"retro",colors:{primary:"#ff006e",secondary:"#a020f0",accent:["#00d4ff","#0a0a0a","#ff6b35"]},keywords:["Outrun","复古未来","80年代","日落","跑车","棕榈树","霓虹"],philosophy:`Outrun 是一种根植于80年代流行文化的视觉美学，命名自同名电子游戏。它将夕阳、跑车、棕榈树和霓虹灯光融为一体，创造出一种永恒的复古未来主义视觉语言。

核心理念：
- 日落驾驶：橙粉紫的日落天空下永恒的公路之旅
- 霓虹速度：洋红与紫色的霓虹灯光表达速度与激情
- 网格地平线：透视网格地板延伸向无限的地平线
- 棕榈剪影：黑色棕榈树映衬渐变天空`,doList:["使用洋红、紫色、青色霓虹配色","添加日落渐变天空背景","使用透视网格地面效果","添加霓虹发光效果","使用粗体无衬线字体","添加棕榈树或跑车剪影元素"],dontList:["禁止使用明亮的白色背景","禁止使用现代简约风格","禁止省略霓虹发光效果","禁止使用柔和低饱和配色"],components:{button:{name:"按钮",description:"Outrun 风格按钮",code:`<button className="
  px-8 py-4
  bg-gradient-to-r from-[#ff006e] to-[#a020f0]
  text-white font-bold uppercase tracking-wider
  rounded-lg
  shadow-[0_0_20px_rgba(255,0,110,0.5)]
  hover:shadow-[0_0_30px_rgba(0,212,255,0.7)]
  hover:scale-105
  transition-all duration-300
">
  Drive
</button>`},card:{name:"卡片",description:"Outrun 风格卡片",code:`<div className="
  p-8
  bg-[#0a0a0a]/80
  rounded-lg
  border border-[#ff006e]/50
  shadow-[0_0_20px_rgba(255,0,110,0.3)]
  backdrop-blur-sm
">
  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-3">
    MIDNIGHT RUN
  </h3>
  <p className="text-[#a020f0]/70">
    Chase the horizon
  </p>
</div>`},input:{name:"输入框",description:"Outrun 风格输入框",code:`<input
  type="text"
  placeholder="Enter destination..."
  className="
    w-full px-6 py-4
    bg-[#0a0a0a]/60
    rounded-lg
    border border-[#a020f0]/50
    text-[#00d4ff] placeholder-[#a020f0]/50
    shadow-[0_0_10px_rgba(160,32,240,0.2)]
    focus:border-[#00d4ff]
    focus:shadow-[0_0_20px_rgba(0,212,255,0.4)]
    focus:outline-none
    transition-all
  "
/>`},hero:{name:"Hero 区块",description:"Outrun 风格 Hero",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-[#0a0a0a] via-[#2d0a4e] to-[#ff006e]/30
  relative overflow-hidden
">
  {/* Sun */}
  <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-80 h-40 bg-gradient-to-t from-[#ff6b35] via-[#ff006e] to-[#a020f0] rounded-t-full opacity-80" />

  {/* Grid floor */}
  <div className="absolute bottom-0 left-0 right-0 h-1/2">
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,110,0.3)_1px,transparent_1px),linear-gradient(rgba(255,0,110,0.3)_1px,transparent_1px)] bg-[size:60px_30px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom" />
  </div>

  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#ff006e] to-[#a020f0] mb-6">
      OUTRUN
    </h1>
    <p className="text-xl text-[#00d4ff]/80 mb-8">
      Chase the sunset
    </p>
    <button className="
      px-10 py-4
      bg-gradient-to-r from-[#ff006e] to-[#a020f0]
      text-white font-bold uppercase tracking-wider
      rounded-lg
      shadow-[0_0_30px_rgba(255,0,110,0.5)]
      hover:shadow-[0_0_50px_rgba(255,0,110,0.8)]
      transition-all
    ">
      Ride
    </button>
  </div>
</section>`}},globalCss:`/* Outrun 全局样式 */

:root {
  --outrun-magenta: #ff006e;
  --outrun-purple: #a020f0;
  --outrun-cyan: #00d4ff;
  --outrun-black: #0a0a0a;
  --outrun-orange: #ff6b35;
}

/* 霓虹发光 */
.outrun-glow {
  text-shadow:
    0 0 10px var(--outrun-magenta),
    0 0 20px var(--outrun-magenta),
    0 0 40px var(--outrun-magenta);
}

/* 网格地板 */
.outrun-grid {
  background-image:
    linear-gradient(90deg, rgba(255, 0, 110, 0.3) 1px, transparent 1px),
    linear-gradient(rgba(255, 0, 110, 0.3) 1px, transparent 1px);
  background-size: 60px 30px;
  transform: perspective(500px) rotateX(60deg);
  transform-origin: bottom;
}

/* 日落渐变 */
.outrun-sunset {
  background: linear-gradient(
    to bottom,
    #0a0a0a 0%,
    #2d0a4e 30%,
    #ff006e 60%,
    #ff6b35 100%
  );
}

/* 扫描线 */
.outrun-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15) 0px,
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}`,aiRules:`你是一个 Outrun 复古未来设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用明亮的白色背景
- 使用现代简约的设计
- 省略霓虹发光效果
- 使用正式的字体

## 必须遵守

- 洋红紫青配色 from-[#ff006e], from-[#a020f0], text-[#00d4ff]
- 深色背景 bg-[#0a0a0a]
- 霓虹发光 shadow-[0_0_20px_rgba(255,0,110,0.5)]
- 网格背景装饰
- 日落渐变 from-[#ff6b35] via-[#ff006e] to-[#a020f0]

## 配色

主色调：
- 洋红: #ff006e
- 紫色: #a020f0
- 青色: #00d4ff
- 黑色: #0a0a0a
- 橙色: #ff6b35

## 特殊元素

- 透视网格地板
- 日落太阳
- 棕榈树剪影
- 扫描线效果`,examplePrompts:[{title:"复古赛车界面",titleEn:"Retro Racing Interface",description:"80年代风格赛车游戏UI",descriptionEn:"80s style racing game UI",prompt:`用 Outrun 风格创建一个复古赛车界面，要求：
1. 背景：日落渐变 + 网格地板
2. 标题：霓虹发光效果
3. 按钮：洋红霓虹边框
4. 添加太阳和棕榈树剪影
5. 整体复古未来速度感`}]},{slug:"dark-academia",name:"暗黑学院风",nameEn:"Dark Academia",description:"古典大学图书馆、皮革装帧书籍、古典文学和老式校园美学。深棕与墨绿配色，暗金点缀，温暖而沉静的学术氛围。",cover:"/styles/dark-academia.svg",styleType:"visual",tags:["retro","minimal"],category:"retro",colors:{primary:"#3d2b1f",secondary:"#2d4a3e",accent:["#8b7355","#f5f0e1","#5c4033"]},keywords:["暗黑学院","古典","图书馆","文学","大学","皮革","手稿"],philosophy:`Dark Academia（暗黑学院风）是一种以古典教育、文学和建筑为核心的美学流派，融合了古希腊罗马文化、哥特式建筑和维多利亚时代学术氛围。

核心理念：
- 学术古典：古典大学建筑和图书馆的庄严之美
- 文学气息：皮革装帧的古籍与手写体的浪漫
- 温暖沉静：大地色系营造温暖而内敛的氛围
- 知识崇拜：对学习、阅读和智慧的极致推崇`,doList:["使用深棕、墨绿、暗金为主色调","使用奶白色作为背景或文字底色","使用衬线字体传达古典学术感","营造温暖、沉静、内敛的氛围","使用微妙的阴影和边框","添加纸张质感或皮革质感暗示"],dontList:["禁止使用鲜艳的霓虹配色","禁止使用现代科技感设计","禁止使用过于花哨的动画效果","禁止使用冰冷的灰蓝色调"],components:{button:{name:"按钮",description:"暗黑学院风格按钮",code:`<button className="
  px-8 py-4
  bg-[#3d2b1f]
  border border-[#8b7355]/60
  text-[#f5f0e1] font-serif tracking-wide
  rounded
  shadow-sm
  hover:shadow-md hover:border-[#8b7355]
  transition-all duration-300
">
  Read More
</button>`},card:{name:"卡片",description:"暗黑学院风格卡片",code:`<div className="
  p-8
  bg-[#f5f0e1]
  border border-[#8b7355]/30
  rounded
  shadow-sm
">
  <h3 className="text-2xl font-serif text-[#3d2b1f] mb-3 tracking-wide">
    Classical Literature
  </h3>
  <p className="text-[#3d2b1f]/70 font-serif leading-relaxed">
    In the quiet of the library
  </p>
</div>`},input:{name:"输入框",description:"暗黑学院风格输入框",code:`<input
  type="text"
  placeholder="Search the archives..."
  className="
    w-full px-6 py-4
    bg-[#f5f0e1]/80
    border border-[#8b7355]/30
    text-[#3d2b1f] placeholder-[#8b7355]/50
    font-serif rounded
    focus:border-[#8b7355]
    focus:shadow-[0_0_8px_rgba(139,115,85,0.2)]
    focus:outline-none
    transition-all
  "
/>`},hero:{name:"Hero 区块",description:"暗黑学院风格 Hero",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-[#3d2b1f] via-[#2d4a3e] to-[#3d2b1f]
  relative overflow-hidden
">
  <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,...')] bg-repeat" />

  <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
    <h1 className="text-5xl md:text-7xl font-serif text-[#f5f0e1] mb-6 tracking-wide leading-tight">
      Dark Academia
    </h1>
    <p className="text-lg text-[#f5f0e1]/70 font-serif mb-8 leading-relaxed">
      Knowledge is the only flame that illuminates the darkness
    </p>
    <button className="
      px-10 py-4
      bg-[#3d2b1f]
      border border-[#8b7355]/60
      text-[#f5f0e1] font-serif tracking-wide
      rounded
      shadow-sm
      hover:shadow-md
      transition-all
    ">
      Explore the Archive
    </button>
  </div>
</section>`}},globalCss:`/* Dark Academia 全局样式 */

:root {
  --da-brown: #3d2b1f;
  --da-green: #2d4a3e;
  --da-gold: #8b7355;
  --da-cream: #f5f0e1;
  --da-dark: #5c4033;
}

/* 纸张质感 */
.da-parchment {
  background-color: var(--da-cream);
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
}

/* 皮革质感 */
.da-leather {
  background-color: var(--da-brown);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* 书脊装饰 */
.da-spine {
  border-left: 4px solid var(--da-gold);
  padding-left: 1rem;
}

/* 古典分割线 */
.da-divider {
  border: none;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--da-gold),
    transparent
  );
  margin: 2rem 0;
}`,aiRules:`你是一个 Dark Academia 暗黑学院风设计的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用鲜艳的霓虹色彩
- 使用现代科技感设计
- 使用过于花哨的动画效果
- 使用冰冷的灰蓝色调

## 必须遵守

- 深棕墨绿配色 bg-[#3d2b1f], bg-[#2d4a3e]
- 暗金装饰 text-[#8b7355], border-[#8b7355]
- 奶白色背景 bg-[#f5f0e1]
- 衬线字体 font-serif
- 微妙阴影 shadow-sm
- 温暖氛围

## 配色

主色调：
- 深棕: #3d2b1f
- 墨绿: #2d4a3e
- 暗金: #8b7355
- 奶白: #f5f0e1
- 深褐: #5c4033

## 特殊元素

- 纸张质感背景
- 书脊装饰线
- 古典分割线
- 衬线排版`,examplePrompts:[{title:"古典图书馆目录",titleEn:"Classical Library Catalog",description:"暗黑学院风格图书馆",descriptionEn:"Dark academia style library",prompt:`用 Dark Academia 风格创建一个古典图书馆页面，要求：
1. 背景：温暖的奶白色纸张质感
2. 标题：深棕色衬线字体
3. 卡片：微妙边框和阴影
4. 添加书脊装饰线
5. 整体温暖沉静的学术氛围`}]},{slug:"cottagecore",name:"田园核风",nameEn:"Cottagecore",description:"田园乡村美学，花卉图案、刺绣质感、蘑菇元素和温馨家庭感。柔和的衬线字体、圆润边角、温暖自然的配色，唤起对简单田园生活的向往。",cover:"/styles/cottagecore.svg",styleType:"visual",tags:["retro","minimal"],category:"retro",colors:{primary:"#5a8f5a",secondary:"#faf6f0",accent:["#f5d75f","#8b7355","#d4a0a0"]},keywords:["田园","乡村","花卉","刺绣","蘑菇","温馨","手工"],philosophy:`Cottagecore（田园核）是一种浪漫化田园乡村生活的美学运动，起源于2010年代末的互联网文化。

核心理念：
- 田园诗意：对简单乡村生活的浪漫化想象
- 手工温暖：刺绣、编织、手写字体的手工质感
- 自然亲密：花卉、蘑菇、蜜蜂、莓果等自然元素
- 家庭舒适：温暖的色调和柔软的材质感`,doList:["使用温暖的大地色和花卉色调","采用圆润的边角和柔和的阴影","使用衬线字体传达古典感","添加花朵、叶子等自然装饰元素","使用亚麻/纸张质感的背景","保持温馨舒适的整体氛围"],dontList:["禁止使用冰冷的蓝灰色调","禁止使用尖锐的直角和硬边框","禁止使用霓虹色或高饱和荧光色","禁止使用科技感或工业风元素"],components:{button:{name:"按钮",description:"田园核风格按钮",code:`<button className="
  px-6 py-3
  bg-[#5a8f5a] text-white
  font-serif rounded-full
  shadow-md
  hover:shadow-lg hover:scale-105
  transition-all duration-300
">
  Gather
</button>`},card:{name:"卡片",description:"田园核风格卡片",code:`<div className="
  p-8
  bg-[#faf6f0]
  rounded-2xl
  border border-[#d4a0a0]/40
  shadow-md
">
  <h3 className="text-2xl font-serif text-[#8b7355] mb-3">
    Wildflower Meadow
  </h3>
  <p className="text-[#8b7355]/70 font-serif">
    Where daisies dance in the summer breeze
  </p>
</div>`},input:{name:"输入框",description:"田园核风格输入框",code:`<input
  type="text"
  placeholder="Write your thoughts..."
  className="
    w-full px-4 py-3
    bg-[#faf6f0]
    border border-[#8b7355]/30
    rounded-xl
    text-[#8b7355] placeholder-[#8b7355]/40
    font-serif
    focus:border-[#5a8f5a]/60
    focus:shadow-[0_0_12px_rgba(90,143,90,0.2)]
    focus:outline-none
    transition-all
  "
/>`},hero:{name:"Hero 区块",description:"田园核风格 Hero",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-[#faf6f0] via-[#f5d75f]/10 to-[#d4a0a0]/20
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <h1 className="text-5xl md:text-7xl font-serif text-[#8b7355] mb-6">
      Cottagecore
    </h1>
    <p className="text-xl text-[#8b7355]/70 font-serif mb-8">
      A simpler life among wildflowers
    </p>
    <button className="
      px-10 py-4
      bg-[#5a8f5a] text-white
      font-serif rounded-full
      shadow-lg
      hover:shadow-xl hover:scale-105
      transition-all
    ">
      Explore
    </button>
  </div>
</section>`}},globalCss:`/* Cottagecore Global Styles */

:root {
  --cottage-green: #5a8f5a;
  --cottage-yellow: #f5d75f;
  --cottage-brown: #8b7355;
  --cottage-pink: #d4a0a0;
  --cottage-cream: #faf6f0;
}

/* Linen texture background */
.cottage-linen {
  background-color: var(--cottage-cream);
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238b7355' fill-opacity='0.03'%3E%3Cpath d='M0 0h20v20H0zM20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E");
}

/* Floral border accent */
.cottage-border {
  border: 1px solid rgba(212, 160, 160, 0.4);
  border-radius: 1rem;
}

/* Warm serif heading */
.cottage-heading {
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--cottage-brown);
}`,aiRules:`You are a Cottagecore design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Cold blue-gray tones
- Sharp corners or hard angular borders
- Neon or high-saturation fluorescent colors
- Tech or industrial style elements

## Must Follow

- Warm earth tones: green #5a8f5a, yellow #f5d75f, brown #8b7355, pink #d4a0a0
- Cream/linen backgrounds bg-[#faf6f0]
- Serif fonts for headings font-serif
- Rounded corners rounded-full, rounded-2xl, rounded-xl
- Soft shadows shadow-md, shadow-lg

## Color Palette

Primary:
- Grass Green: #5a8f5a
- Daisy Yellow: #f5d75f
- Earth Brown: #8b7355
- Flower Pink: #d4a0a0
- Cream: #faf6f0

## Special Elements

- Floral and botanical decorations
- Linen/paper texture backgrounds
- Hand-drawn or embroidery style accents
- Mushroom and berry motifs`,examplePrompts:[{title:"田园风小屋页面",titleEn:"Cottage Home Page",description:"温馨的田园乡村风格首页",descriptionEn:"Warm countryside cottage-style homepage",prompt:`Use Cottagecore style to create a cozy homepage:
1. Background: cream linen texture
2. Title: serif font in earth brown
3. Cards: rounded with floral borders
4. Buttons: green rounded-full with soft shadows
5. Overall warm, homey countryside feel`}]},{slug:"risograph",name:"Risograph 印刷风",nameEn:"Risograph",description:"Risograph 印刷机的独特美学，2-3色套印效果、半调网点、套印错位和有限色彩，呈现独特的印刷质感和手工批量感。",cover:"/styles/risograph.svg",styleType:"visual",tags:["expressive","high-contrast"],category:"expressive",colors:{primary:"#ff6b9d",secondary:"#2563eb",accent:["#ff8a00","#22c55e"]},keywords:["Risograph","印刷","套印","半调","网点","错位","手工"],philosophy:`Risograph 是一种源于日本的快速印刷技术，因其独特的视觉效果而被艺术家和设计师广泛采用。

核心理念：
- 有限色彩：通常只使用2-3种墨色叠加
- 套印错位：颜色层之间故意的微妙偏移
- 半调网点：可见的网点纹理和颗粒感
- 印刷美学：拥抱印刷的不完美和独特性`,doList:["限制使用2-3种主色调","添加套印错位效果（offset shadow）","使用粗体等宽或无衬线字体","保持扁平色块无渐变","添加颗粒/网点纹理感","使用米白/奶白色纸张背景"],dontList:["禁止使用复杂的渐变效果","禁止使用太多颜色（最多3-4种）","禁止使用写实阴影或光照效果","禁止使用圆滑的圆角设计"],components:{button:{name:"按钮",description:"Risograph 风格按钮",code:`<button className="
  px-6 py-3
  bg-[#ff6b9d] text-white
  font-mono font-bold uppercase tracking-wider
  rounded-sm
  shadow-[3px_3px_0px_#2563eb]
  hover:translate-x-[2px] hover:translate-y-[2px]
  hover:shadow-[1px_1px_0px_#2563eb]
  transition-all duration-200
">
  Print
</button>`},card:{name:"卡片",description:"Risograph 风格卡片",code:`<div className="
  p-8
  bg-[#fffbf0]
  border-2 border-[#1a1a1a]
  rounded-sm
  shadow-[4px_4px_0px_#ff6b9d]
">
  <h3 className="text-2xl font-mono font-bold text-[#2563eb] uppercase mb-3">
    OVERPRINT
  </h3>
  <p className="text-[#1a1a1a]/70 font-mono">
    Limited palette, unlimited expression
  </p>
</div>`},input:{name:"输入框",description:"Risograph 风格输入框",code:`<input
  type="text"
  placeholder="Type here..."
  className="
    w-full px-4 py-3
    bg-[#fffbf0]
    border-2 border-[#1a1a1a]
    rounded-sm
    text-[#1a1a1a] placeholder-[#1a1a1a]/40
    font-mono
    focus:border-[#2563eb]
    focus:shadow-[2px_2px_0px_#ff6b9d]
    focus:outline-none
    transition-all
  "
/>`},hero:{name:"Hero 区块",description:"Risograph 风格 Hero",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#fffbf0]
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-mono font-bold text-[#ff6b9d] uppercase mb-2">
      RISO
    </h1>
    <h2 className="text-4xl md:text-6xl font-mono font-bold text-[#2563eb] uppercase -mt-4 ml-4 mb-6">
      GRAPH
    </h2>
    <p className="text-xl text-[#1a1a1a]/70 font-mono mb-8">
      Print aesthetics for the digital age
    </p>
    <button className="
      px-10 py-4
      bg-[#2563eb] text-white
      font-mono font-bold uppercase tracking-wider
      rounded-sm
      shadow-[4px_4px_0px_#ff6b9d]
      hover:translate-x-[2px] hover:translate-y-[2px]
      hover:shadow-[2px_2px_0px_#ff6b9d]
      transition-all
    ">
      Explore
    </button>
  </div>
</section>`}},globalCss:`/* Risograph Global Styles */

:root {
  --riso-pink: #ff6b9d;
  --riso-blue: #2563eb;
  --riso-orange: #ff8a00;
  --riso-green: #22c55e;
  --riso-paper: #fffbf0;
}

/* Grain texture overlay */
.riso-grain::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
  pointer-events: none;
  mix-blend-mode: multiply;
}

/* Overprint offset */
.riso-offset {
  position: relative;
}
.riso-offset::after {
  content: attr(data-text);
  position: absolute;
  top: 2px;
  left: 3px;
  color: var(--riso-blue);
  opacity: 0.6;
  mix-blend-mode: multiply;
}

/* Halftone pattern */
.riso-halftone {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 4px 4px;
}`,aiRules:`You are a Risograph design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Complex gradients or realistic shadows
- More than 3-4 colors in total
- Rounded corners (use rounded-sm only)
- Realistic lighting or 3D effects

## Must Follow

- Limited palette: pink #ff6b9d, blue #2563eb, orange #ff8a00, green #22c55e
- Paper-white background bg-[#fffbf0]
- Monospace fonts font-mono
- Offset shadows shadow-[3px_3px_0px_color]
- Bold borders border-2 border-[#1a1a1a]
- Flat colors only, no gradients

## Color Palette

Primary:
- Fluorescent Pink: #ff6b9d
- Blue: #2563eb
- Fluorescent Orange: #ff8a00
- Green: #22c55e
- Paper: #fffbf0

## Special Elements

- Overprint offset effects
- Grain/noise texture overlays
- Halftone dot patterns
- Registration marks as decoration`,examplePrompts:[{title:"Risograph 海报页面",titleEn:"Risograph Poster Page",description:"印刷风格的宣传页面",descriptionEn:"Print-aesthetic promotional page",prompt:`Use Risograph style to create a poster-like landing page:
1. Background: paper-white with grain texture
2. Title: bold mono font with overprint offset
3. Cards: bold borders with color offset shadows
4. Only use 2-3 colors maximum
5. Overall hand-printed, limited palette aesthetic`}]},{slug:"mecha",name:"机甲风",nameEn:"Mecha",description:"灵感源自高达/EVA等机甲动画的设计风格，科技面板、警告标识、机械质感，军绿和深蓝底色搭配警告黄和危险红，充满工业力量感。",cover:"/styles/mecha.svg",styleType:"visual",tags:["expressive","modern","high-contrast"],category:"expressive",colors:{primary:"#1a2744",secondary:"#4a5c3a",accent:["#fbbf24","#ef4444"]},keywords:["机甲","高达","EVA","科技面板","警告","工业","军事"],philosophy:`Mecha（机甲风）是源自日本机甲动画（高达、EVA等）的设计美学，融合军事工业风和科幻面板界面。

核心理念：
- 装甲面板：模拟机甲外壳的分块面板设计
- 警告系统：黄色警告和红色危险的信号系统
- 军事工业：军绿、深蓝海军色的工业配色
- 技术标注：等宽字体的技术参数和编号标识`,doList:["使用军绿、深蓝海军色为底色","添加警告黄和危险红的强调色","使用等宽字体和大写字母","设计直角无圆角的面板元素","添加技术标注和编号装饰","使用硬边阴影和边框线条"],dontList:["禁止使用柔和的圆角设计","禁止使用柔和的粉色或浅色调","禁止使用花哨的渐变或毛玻璃效果","禁止使用手写体或花体字"],components:{button:{name:"按钮",description:"机甲风格按钮",code:`<button className="
  px-6 py-3
  bg-[#fbbf24] text-[#1a2744]
  font-mono font-bold uppercase tracking-widest
  rounded-none
  border-2 border-[#1a2744]
  shadow-[4px_4px_0px_#1a2744]
  hover:translate-x-[2px] hover:translate-y-[2px]
  hover:shadow-[2px_2px_0px_#1a2744]
  transition-all duration-200
">
  LAUNCH
</button>`},card:{name:"卡片",description:"机甲风格卡片",code:`<div className="
  p-8
  bg-[#1a2744]
  rounded-none
  border-2 border-[#4a5c3a]
  shadow-[4px_4px_0px_rgba(251,191,36,0.3)]
">
  <div className="flex items-center gap-2 mb-3">
    <div className="w-3 h-3 bg-[#fbbf24]"></div>
    <span className="text-xs font-mono text-[#4a5c3a] uppercase tracking-widest">UNIT-01</span>
  </div>
  <h3 className="text-xl font-mono font-bold text-[#fbbf24] uppercase mb-2">
    ARMOR PANEL
  </h3>
  <p className="text-[#4a5c3a]/80 font-mono text-sm">
    Status: Operational
  </p>
</div>`},input:{name:"输入框",description:"机甲风格输入框",code:`<input
  type="text"
  placeholder="ENTER COMMAND..."
  className="
    w-full px-4 py-3
    bg-[#1a2744]/80
    border-2 border-[#4a5c3a]
    rounded-none
    text-[#fbbf24] placeholder-[#4a5c3a]/60
    font-mono
    focus:border-[#fbbf24]
    focus:shadow-[0_0_8px_rgba(251,191,36,0.4)]
    focus:outline-none
    transition-all
  "
/>`},hero:{name:"Hero 区块",description:"机甲风格 Hero",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#1a2744]
  relative overflow-hidden
">
  {/* Grid lines */}
  <div className="absolute inset-0 bg-[linear-gradient(rgba(74,92,58,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(74,92,58,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />

  {/* Warning stripes */}
  <div className="absolute top-0 left-0 right-0 h-2 bg-repeating-linear-gradient(90deg,#fbbf24,#fbbf24_20px,#1a2744_20px,#1a2744_40px)" />

  <div className="relative z-10 text-center px-6">
    <div className="text-xs font-mono text-[#4a5c3a] uppercase tracking-[0.3em] mb-4">
      // SYSTEM ONLINE
    </div>
    <h1 className="text-6xl md:text-8xl font-mono font-bold text-[#fbbf24] uppercase mb-4">
      MECHA
    </h1>
    <p className="text-lg text-[#4a5c3a] font-mono uppercase tracking-wider mb-8">
      ARMOR CLASS // OPERATIONAL
    </p>
    <button className="
      px-10 py-4
      bg-[#ef4444] text-white
      font-mono font-bold uppercase tracking-widest
      rounded-none border-2 border-[#ef4444]
      shadow-[4px_4px_0px_#fbbf24]
      hover:translate-x-[2px] hover:translate-y-[2px]
      hover:shadow-[2px_2px_0px_#fbbf24]
      transition-all
    ">
      DEPLOY
    </button>
  </div>
</section>`}},globalCss:`/* Mecha Global Styles */

:root {
  --mecha-navy: #1a2744;
  --mecha-green: #4a5c3a;
  --mecha-yellow: #fbbf24;
  --mecha-red: #ef4444;
}

/* Tech grid background */
.mecha-grid {
  background-image:
    linear-gradient(rgba(74, 92, 58, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(74, 92, 58, 0.15) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Warning stripe pattern */
.mecha-warning {
  background: repeating-linear-gradient(
    -45deg,
    var(--mecha-yellow),
    var(--mecha-yellow) 10px,
    var(--mecha-navy) 10px,
    var(--mecha-navy) 20px
  );
}

/* Panel border */
.mecha-panel {
  border: 2px solid var(--mecha-green);
  background: var(--mecha-navy);
  position: relative;
}
.mecha-panel::before {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  right: -4px;
  bottom: -4px;
  border: 1px solid rgba(251, 191, 36, 0.2);
  pointer-events: none;
}

/* Status indicator */
.mecha-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--mecha-green);
}
.mecha-status::before {
  content: "";
  width: 8px;
  height: 8px;
  background: var(--mecha-yellow);
}`,aiRules:`You are a Mecha design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Soft rounded corners (use rounded-none)
- Pastel or soft colors
- Glassmorphism or blur effects
- Handwritten or decorative fonts

## Must Follow

- Dark base colors: navy #1a2744, military green #4a5c3a
- Warning accents: yellow #fbbf24, red #ef4444
- Monospace fonts font-mono with uppercase tracking-widest
- No border radius rounded-none
- Hard-edge shadows shadow-[4px_4px_0px_color]
- Border-2 for panel edges

## Color Palette

Primary:
- Navy: #1a2744
- Military Green: #4a5c3a
- Warning Yellow: #fbbf24
- Danger Red: #ef4444

## Special Elements

- Tech grid backgrounds
- Warning stripe patterns
- Status indicators with square dots
- Technical annotations and unit numbers
- Panel borders with offset outlines`,examplePrompts:[{title:"机甲控制台",titleEn:"Mecha Control Panel",description:"机甲风格的控制面板界面",descriptionEn:"Mecha-style control panel interface",prompt:`Use Mecha style to create a control panel interface:
1. Background: dark navy with tech grid lines
2. Title: mono font in warning yellow
3. Cards: angular panels with green borders
4. Warning stripes and status indicators
5. Overall military-industrial mecha aesthetic`}]},{slug:"gothic-lolita",name:"哥特萝莉风",nameEn:"Gothic Lolita",description:"维多利亚蕾丝、黑色缎带、十字架与玫瑰的暗黑优雅，融合哥特式建筑装饰与洛丽塔精致细节的暗色浪漫美学。",cover:"/styles/gothic-lolita.svg",styleType:"visual",tags:["expressive","retro"],category:"expressive",colors:{primary:"#4a1a4a",secondary:"#8b1a2a",accent:["#e5e5e5","#1a1a1a","#6b2d5b"]},keywords:["哥特","萝莉塔","维多利亚","蕾丝","暗黑优雅","玫瑰","十字架"],philosophy:`Gothic Lolita（哥特萝莉）是一种融合维多利亚时代与哥特美学的视觉风格，起源于日本街头时尚。

核心理念：
- 暗黑优雅：黑色为主调，搭配深紫和血红点缀
- 精致细节：蕾丝花边、缎带蝴蝶结、十字架装饰
- 维多利亚风情：繁复的衬线字体、对称的装饰花纹
- 浪漫黑暗：玫瑰、烛台、哥特式拱门等元素`,doList:["使用黑色深色为主背景","搭配深紫 #4a1a4a 和血红 #8b1a2a 点缀","使用装饰性衬线字体","添加蕾丝花边、缎带等装饰元素","使用哥特式对称花纹或十字架图案","保持精致典雅的整体氛围"],dontList:["禁止使用明亮鲜艳的颜色","禁止使用可爱卡通风格元素","禁止使用现代极简设计","禁止使用过于圆润的形状"],components:{button:{name:"按钮",description:"哥特萝莉风格按钮",code:`<button className="
  px-8 py-4
  bg-[#4a1a4a]
  border border-[#8b1a2a]/60
  text-[#e5e5e5] font-serif tracking-wide
  shadow-[0_2px_8px_rgba(75,26,75,0.5)]
  hover:shadow-[0_4px_16px_rgba(139,26,42,0.5)]
  hover:border-[#8b1a2a]
  transition-all duration-300
">
  Enter
</button>`},card:{name:"卡片",description:"哥特萝莉风格卡片",code:`<div className="
  p-8
  bg-[#0a0a0a]/90
  border border-[#4a1a4a]/50
  shadow-[0_4px_16px_rgba(74,26,74,0.4)]
">
  <h3 className="text-2xl font-serif text-[#e5e5e5] mb-3">
    Dark Elegance
  </h3>
  <p className="text-[#e5e5e5]/60 font-serif">
    A whisper of lace and shadow
  </p>
</div>`},input:{name:"输入框",description:"哥特萝莉风格输入框",code:`<input
  type="text"
  placeholder="Enter text..."
  className="
    w-full px-6 py-4
    bg-[#0a0a0a]/80
    border border-[#4a1a4a]/50
    text-[#e5e5e5] placeholder-[#4a1a4a]/60
    font-serif
    focus:border-[#8b1a2a]
    focus:shadow-[0_0_12px_rgba(139,26,42,0.4)]
    focus:outline-none
    transition-all
  "
/>`},hero:{name:"Hero 区块",description:"哥特萝莉风格 Hero",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-[#0a0a0a] via-[#1a0a1a] to-[#0a0a0a]
  relative overflow-hidden
">
  {/* Ornate border frame */}
  <div className="absolute inset-4 border border-[#4a1a4a]/30" />
  <div className="absolute inset-8 border border-[#8b1a2a]/20" />

  <div className="relative z-10 text-center px-6">
    <div className="w-16 h-0.5 bg-[#8b1a2a] mx-auto mb-6" />
    <h1 className="text-5xl md:text-7xl font-serif text-[#e5e5e5] mb-4 tracking-wider">
      Gothic Lolita
    </h1>
    <p className="text-lg text-[#e5e5e5]/60 font-serif mb-8">
      Dark elegance, Victorian grace
    </p>
    <div className="w-16 h-0.5 bg-[#8b1a2a] mx-auto" />
  </div>
</section>`}},globalCss:`/* Gothic Lolita 全局样式 */

:root {
  --gl-black: #0a0a0a;
  --gl-purple: #4a1a4a;
  --gl-red: #8b1a2a;
  --gl-silver: #e5e5e5;
}

/* 蕾丝花边装饰 */
.gl-lace-border {
  border-image: repeating-linear-gradient(
    90deg,
    var(--gl-purple) 0px,
    var(--gl-purple) 4px,
    transparent 4px,
    transparent 8px
  ) 1;
}

/* 哥特十字架装饰 */
.gl-cross::before {
  content: "+";
  font-size: 1.2em;
  color: var(--gl-red);
  margin-right: 0.5em;
}

/* 玫瑰阴影 */
.gl-rose-shadow {
  box-shadow:
    0 4px 16px rgba(139, 26, 42, 0.3),
    inset 0 1px 0 rgba(229, 229, 229, 0.1);
}

/* 暗色渐变 */
.gl-dark-gradient {
  background: linear-gradient(
    to bottom,
    #0a0a0a 0%,
    #1a0a1a 50%,
    #0a0a0a 100%
  );
}`,aiRules:`你是一个 Gothic Lolita 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用明亮鲜艳的颜色
- 使用可爱卡通风格
- 使用现代极简设计
- 使用圆角过大的形状
- 使用 emoji

## 必须遵守

- 黑色深色背景 bg-[#0a0a0a], bg-[#1a0a1a]
- 深紫点缀 border-[#4a1a4a], text-[#4a1a4a]
- 血红强调 border-[#8b1a2a], text-[#8b1a2a]
- 银白文字 text-[#e5e5e5]
- 衬线字体 font-serif
- 精致边框装饰

## 配色

主色调：
- 黑色: #0a0a0a
- 深紫: #4a1a4a
- 血红: #8b1a2a
- 银白: #e5e5e5

## 特殊元素

- 蕾丝花边图案
- 十字架装饰
- 玫瑰图案
- 对称装饰花纹
- 哥特式拱门`,examplePrompts:[{title:"暗色优雅落地页",titleEn:"Dark Elegant Landing Page",description:"维多利亚哥特风格的品牌落地页",descriptionEn:"Victorian gothic style brand landing page",prompt:`用 Gothic Lolita 风格创建一个暗色优雅的落地页，要求：
1. 背景：黑色深色渐变
2. 标题：装饰性衬线字体，银白色
3. 装饰：蕾丝花边边框和十字架图案
4. 按钮：深紫配血红边框
5. 整体暗色浪漫氛围`}]},{slug:"cyber-chinese",name:"赛博中华风",nameEn:"Cyber Chinese",description:"传统中华美学与赛博朋克科幻的碰撞融合，朱红金黄搭配霓虹蓝紫，龙凤印章与霓虹灯笼交织的未来东方幻想。",cover:"/styles/cyber-chinese.svg",styleType:"visual",tags:["expressive","modern","high-contrast"],category:"expressive",colors:{primary:"#d4553a",secondary:"#c9a227",accent:["#00d4ff","#a020f0","#0a0a0a"]},keywords:["赛博朋克","中华风","霓虹","龙凤","印章","灯笼","未来东方"],philosophy:`Cyber Chinese（赛博中华）是传统中国美学与赛博朋克科幻风格的融合，在暗色基底上用霓虹光效重新演绎东方经典元素。

核心理念：
- 古今碰撞：传统朱红金黄与霓虹蓝紫并存
- 东方未来：龙凤图腾、印章纹样被赛博化重构
- 霓虹灯笼：传统灯笼造型发出赛博光芒
- 锐利线条：直角硬朗造型体现科技感`,doList:["使用朱红 #d4553a 和金黄 #c9a227 为主色调","搭配霓虹蓝 #00d4ff 和霓虹紫 #a020f0","使用直角无圆角的锐利造型","添加霓虹发光效果","融入中国传统纹样元素（如印章、云纹）","深色背景为主基调"],dontList:["禁止使用明亮白色背景","禁止使用柔和圆润的造型","禁止省略霓虹发光效果","禁止使用过于西式的装饰元素"],components:{button:{name:"按钮",description:"赛博中华风格按钮",code:`<button className="
  px-8 py-4
  bg-[#d4553a]
  border border-[#c9a227]
  text-white font-bold tracking-wider
  shadow-[0_0_16px_rgba(212,85,58,0.5)]
  hover:shadow-[0_0_24px_rgba(201,162,39,0.6)]
  hover:border-[#c9a227]
  transition-all duration-300
">
  Enter
</button>`},card:{name:"卡片",description:"赛博中华风格卡片",code:`<div className="
  p-8
  bg-[#0a0a0a]/90
  border border-[#d4553a]/40
  shadow-[0_0_16px_rgba(212,85,58,0.3)]
">
  <h3 className="text-2xl font-bold text-[#c9a227] mb-3">
    CYBER ORIENT
  </h3>
  <p className="text-[#00d4ff]/70">
    Where tradition meets tomorrow
  </p>
</div>`},input:{name:"输入框",description:"赛博中华风格输入框",code:`<input
  type="text"
  placeholder="Enter text..."
  className="
    w-full px-6 py-4
    bg-[#0a0a0a]/80
    border border-[#c9a227]/40
    text-[#00d4ff] placeholder-[#c9a227]/40
    focus:border-[#00d4ff]
    focus:shadow-[0_0_16px_rgba(0,212,255,0.5)]
    focus:outline-none
    transition-all
  "
/>`},hero:{name:"Hero 区块",description:"赛博中华风格 Hero",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#0a0a0a]
  relative overflow-hidden
">
  {/* Neon grid background */}
  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(212,85,58,0.1)_1px,transparent_1px),linear-gradient(rgba(201,162,39,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />

  {/* Seal stamp decoration */}
  <div className="absolute top-20 right-20 w-24 h-24 border-2 border-[#d4553a] rotate-12 flex items-center justify-center">
    <span className="text-[#d4553a] text-3xl font-bold">印</span>
  </div>

  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#d4553a] to-[#c9a227] mb-6">
      CYBER CHINESE
    </h1>
    <p className="text-xl text-[#00d4ff]/80 mb-8">
      Where tradition meets tomorrow
    </p>
    <button className="
      px-10 py-4
      bg-gradient-to-r from-[#d4553a] to-[#c9a227]
      text-white font-bold tracking-wider
      shadow-[0_0_24px_rgba(212,85,58,0.5)]
      hover:shadow-[0_0_40px_rgba(201,162,39,0.7)]
      transition-all
    ">
      Explore
    </button>
  </div>
</section>`}},globalCss:`/* Cyber Chinese 全局样式 */

:root {
  --cc-vermilion: #d4553a;
  --cc-gold: #c9a227;
  --cc-black: #0a0a0a;
  --cc-neon-blue: #00d4ff;
  --cc-neon-purple: #a020f0;
}

/* 霓虹发光 */
.cc-neon-glow {
  text-shadow:
    0 0 10px var(--cc-neon-blue),
    0 0 20px var(--cc-neon-blue),
    0 0 40px var(--cc-neon-blue);
}

/* 朱红霓虹 */
.cc-vermilion-glow {
  text-shadow:
    0 0 10px var(--cc-vermilion),
    0 0 20px var(--cc-vermilion);
}

/* 印章样式 */
.cc-seal {
  border: 2px solid var(--cc-vermilion);
  padding: 0.5em;
  transform: rotate(5deg);
  color: var(--cc-vermilion);
  font-weight: bold;
}

/* 赛博网格 */
.cc-grid {
  background-image:
    linear-gradient(90deg, rgba(212, 85, 58, 0.1) 1px, transparent 1px),
    linear-gradient(rgba(201, 162, 39, 0.1) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* 灯笼阴影 */
.cc-lantern-glow {
  box-shadow:
    0 0 20px rgba(212, 85, 58, 0.4),
    0 0 40px rgba(201, 162, 39, 0.2);
}`,aiRules:`你是一个 Cyber Chinese 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用明亮白色背景
- 使用柔和圆润造型（rounded-lg, rounded-full）
- 省略霓虹发光效果
- 使用过于西式的装饰元素
- 使用 emoji

## 必须遵守

- 朱红 #d4553a 和金黄 #c9a227 为主色
- 霓虹蓝 #00d4ff 和霓虹紫 #a020f0 为辅色
- 深黑背景 bg-[#0a0a0a]
- 直角无圆角 rounded-none
- 霓虹发光效果 shadow-[0_0_Xpx_rgba(...)]
- 中国传统纹样元素

## 配色

主色调：
- 朱红: #d4553a
- 金黄: #c9a227
- 深黑: #0a0a0a
- 霓虹蓝: #00d4ff
- 霓虹紫: #a020f0

## 特殊元素

- 印章纹样
- 龙凤图腾
- 云纹装饰
- 灯笼造型
- 赛博网格`,examplePrompts:[{title:"东方赛博落地页",titleEn:"Oriental Cyberpunk Landing",description:"融合中华传统与赛博朋克的品牌页面",descriptionEn:"Brand page fusing Chinese tradition with cyberpunk",prompt:`用 Cyber Chinese 风格创建一个东方赛博落地页，要求：
1. 背景：深黑 + 赛博网格
2. 标题：朱红金黄渐变 + 霓虹发光
3. 装饰：印章、云纹、灯笼元素
4. 按钮：朱红底色 + 金色边框
5. 整体东方未来科幻感`}]},{slug:"acid-graphics",name:"酸性平面设计",nameEn:"Acid Graphics",description:"高饱和度荧光色彩、扭曲字体、液态流动形态和迷幻视觉。源于锐舞文化和地下俱乐部美学，以强烈的视觉冲击力呈现反叛与实验精神。",cover:"/styles/acid-graphics.svg",styleType:"visual",tags:["expressive","high-contrast","modern"],category:"expressive",colors:{primary:"#39ff14",secondary:"#0a0a0a",accent:["#e6ff00","#a020f0","#ff6ec7","#00ffff"]},keywords:["酸性","迷幻","荧光","扭曲","锐舞","Op-Art","赛博"],philosophy:`Acid Graphics 源于90年代锐舞文化和地下俱乐部场景，融合了赛博朋克、迷幻艺术和实验排版。

核心理念：
- 荧光色彩：使用高饱和度的荧光绿、酸性黄、电紫和赛博粉
- 暗色基底：深黑背景让荧光色彩更加刺眼和突出
- 扭曲变形：字体和形态的液态扭曲感，倾斜的卡片和元素
- 视觉噪声：扫描线叠加、Op-Art 棋盘格、3D 线框网格
- 多层叠加：文字和色彩的多层偏移堆叠，制造视觉干扰`,doList:["使用纯黑 #0a0a0a 作为主背景","使用荧光色系（绿 #39ff14、黄 #e6ff00、紫 #a020f0、粉 #ff6ec7）","使用等宽字体 font-mono","保持直角边缘（rounded-none）","使用硬边偏移阴影（shadow-[Npx_Npx_0px_color]）","文字全部大写 uppercase tracking-widest","添加扫描线叠加效果","使用 skew/rotate 创造扭曲感"],dontList:["禁止使用柔和的粉彩色或低饱和度色","禁止使用圆角（rounded-md 及以上）","禁止使用衬线字体","禁止使用柔和阴影（shadow-md、shadow-lg 等）","禁止使用白色或浅色背景","禁止使用渐变（所有颜色必须是纯平面荧光色）"],components:{button:{name:"按钮",description:"Acid Graphics 风格按钮 - 荧光色硬边偏移阴影",code:`<button className="
  px-6 py-3
  bg-[#39ff14] text-[#0a0a0a]
  font-mono font-bold uppercase tracking-widest
  rounded-none
  border-2 border-[#39ff14]
  shadow-[4px_4px_0px_#a020f0]
  hover:translate-x-[2px] hover:translate-y-[2px]
  hover:shadow-[2px_2px_0px_#a020f0]
  active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
  transition-all duration-150
">
  ACTIVATE
</button>`},card:{name:"卡片",description:"Acid Graphics 风格卡片 - 暗底荧光边框硬阴影",code:`<div className="
  p-8
  bg-[#0a0a0a]
  border-2 border-[#39ff14]
  rounded-none
  shadow-[5px_5px_0px_#a020f0]
  hover:shadow-[8px_8px_0px_#a020f0]
  hover:border-[#e6ff00]
  transition-all duration-150
">
  <h3 className="text-2xl font-mono font-bold text-[#39ff14] uppercase tracking-widest mb-3">
    ACID_ZONE
  </h3>
  <p className="text-[#39ff14]/50 font-mono text-sm">
    Distorted reality interface module
  </p>
</div>`},input:{name:"输入框",description:"Acid Graphics 风格输入框 - 终端风暗底荧光文字",code:`<input
  type="text"
  placeholder="ENTER_DATA>_"
  className="
    w-full px-4 py-3
    bg-[#0a0a0a]
    border-2 border-[#39ff14]/60
    rounded-none
    text-[#39ff14] placeholder-[#39ff14]/25
    font-mono
    focus:border-[#39ff14]
    focus:shadow-[3px_3px_0px_#a020f0]
    focus:outline-none
    transition-all duration-150
  "
/>`},hero:{name:"Hero 区块",description:"Acid Graphics 风格 Hero - 多层叠加标题、扫描线、Op-Art 背景",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#0a0a0a]
  relative overflow-hidden
">
  {/* Scanline overlay */}
  <div className="absolute inset-0 pointer-events-none opacity-20"
    style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57,255,20,0.03) 2px, rgba(57,255,20,0.03) 4px)'
    }}
  />
  <div className="relative z-10 px-6">
    {/* Chrome-layered title */}
    <div className="relative">
      <h1 className="text-7xl md:text-9xl font-mono font-black text-[#39ff14] uppercase tracking-tighter">
        ACID
      </h1>
      <h1 className="absolute inset-0 text-7xl md:text-9xl font-mono font-black text-[#a020f0] uppercase tracking-tighter translate-x-[3px] translate-y-[3px] opacity-60">
        ACID
      </h1>
    </div>
    <p className="text-sm text-[#39ff14]/40 font-mono uppercase tracking-[0.3em] mt-4">
      DISTORT // WARP // DISSOLVE
    </p>
    <button className="
      mt-8 px-10 py-4
      bg-[#39ff14] text-[#0a0a0a]
      font-mono font-bold uppercase tracking-widest
      rounded-none border-2 border-[#39ff14]
      shadow-[5px_5px_0px_#ff6ec7]
      hover:translate-x-[2px] hover:translate-y-[2px]
      hover:shadow-[3px_3px_0px_#ff6ec7]
      transition-all duration-150
    ">
      ENTER_VOID
    </button>
  </div>
</section>`}},globalCss:`/* Acid Graphics Global Styles */

:root {
  --acid-green: #39ff14;
  --acid-black: #0a0a0a;
  --acid-yellow: #e6ff00;
  --acid-purple: #a020f0;
  --acid-pink: #ff6ec7;
  --acid-cyan: #00ffff;
}

/* Scanline overlay */
.acid-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(57, 255, 20, 0.03) 2px,
    rgba(57, 255, 20, 0.03) 4px
  );
  pointer-events: none;
}

/* Op-Art checkerboard */
.acid-checkerboard {
  background-image:
    linear-gradient(45deg, rgba(57, 255, 20, 0.04) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(57, 255, 20, 0.04) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(57, 255, 20, 0.04) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(57, 255, 20, 0.04) 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0;
}

/* Chrome text layering - use with data-text attribute */
.acid-chrome {
  position: relative;
}
.acid-chrome::before {
  content: attr(data-text);
  position: absolute;
  top: 2px;
  left: 3px;
  color: var(--acid-purple);
  opacity: 0.6;
}
.acid-chrome::after {
  content: attr(data-text);
  position: absolute;
  top: -2px;
  left: -2px;
  color: var(--acid-pink);
  opacity: 0.5;
}

/* Fluorescent glow */
.acid-glow {
  text-shadow: 0 0 10px var(--acid-green), 0 0 20px var(--acid-green), 0 0 40px var(--acid-green);
}

/* 3D wireframe grid */
.acid-wireframe-grid {
  background-image:
    linear-gradient(rgba(57, 255, 20, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(57, 255, 20, 0.08) 1px, transparent 1px);
  background-size: 40px 40px;
}`,aiRules:`You are an Acid Graphics design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Soft pastel colors, muted tones, or low-saturation colors
- Rounded corners of any kind (rounded-md, rounded-lg, rounded-xl, rounded-full)
- Serif fonts
- Subtle or soft shadows (shadow-sm, shadow-md, shadow-lg)
- Gradients of any kind (all colors must be flat fluorescent)
- White or light backgrounds
- Backdrop blur or frosted glass effects

## Must Follow

- Dark background: bg-[#0a0a0a] always
- Fluorescent colors only: green #39ff14, yellow #e6ff00, purple #a020f0, pink #ff6ec7
- Monospace fonts: font-mono for all text
- All uppercase: uppercase tracking-widest
- Sharp edges: rounded-none everywhere
- Hard offset shadows: shadow-[Npx_Npx_0px_color] with fluorescent colors
- Bold borders: border-2 with fluorescent colors
- Skewed/rotated elements for distortion feel

## Color Palette

Primary:
- Fluorescent Green: #39ff14 (main accent)
- Black: #0a0a0a (backgrounds)
- Acid Yellow: #e6ff00 (highlights)
- Electric Purple: #a020f0 (shadows, secondary)
- Cyber Pink: #ff6ec7 (accents)

## Special Elements

- Scanline overlay effects (repeating-linear-gradient)
- Op-Art checkerboard patterns
- Chrome text layering (multiple offset text copies)
- 3D wireframe grid backgrounds
- Skewed card layouts and tilted elements
- Terminal-style form inputs with fluorescent cursors`,examplePrompts:[{title:"酸性平面着陆页",titleEn:"Acid Graphics Landing Page",description:"荧光色迷幻风格的着陆页，包含扫描线和 Op-Art 元素",descriptionEn:"Fluorescent psychedelic landing page with scanlines and Op-Art elements",prompt:`Use Acid Graphics style to create a landing page:
1. Background: pure black #0a0a0a with scanline overlay
2. Title: huge fluorescent green mono font, chrome-layered with purple offset
3. Cards: dark with fluorescent borders, hard offset shadows, slight skew
4. Only fluorescent colors on black - no white, no pastels
5. Terminal-style form inputs
6. Op-Art checkerboard pattern sections
7. Overall psychedelic, distorted, digital brutalism aesthetic`}]},{slug:"hand-drawn-doodle",name:"手绘涂鸦风",nameEn:"Hand-Drawn Doodle",description:"手绘线条、涂鸦插画、不规则形状和手写字体。像在笔记本上随手画出的设计，充满创意和趣味性，传达温暖亲切的手工感。",cover:"/styles/hand-drawn-doodle.svg",styleType:"visual",tags:["expressive","minimal"],category:"expressive",colors:{primary:"#2c2c2c",secondary:"#fffef5",accent:["#ff6b6b","#4ecdc4","#ffd93d"]},keywords:["手绘","涂鸦","笔记本","虚线","标记笔","胶带","图钉"],philosophy:`Hand-Drawn Doodle 风格模拟手工绘制的质感，营造温暖、亲切、创意十足的视觉体验。

核心理念：
- 笔记本纸张：奶白色背景模拟真实笔记本，带有蓝色横线和红色页边线
- 手绘线条：使用虚线边框模拟手绘笔触，避免精确几何
- 不规则形态：微妙的旋转和偏移营造手工感
- 标记笔配色：红、蓝绿、黄三色标记笔点缀
- 装饰元素：胶带、图钉、回形针、咖啡渍等纸张装饰
- 涂鸦点缀：随手画的星星、波浪线、箭头等装饰`,doList:["使用虚线边框（border-dashed）模拟手绘线条","使用奶白纸张色 #fffef5 背景","使用墨黑 #2c2c2c 作为主色","添加微妙旋转（rotate）模拟手绘不规则感","使用标记笔配色：红 #ff6b6b、蓝绿 #4ecdc4、黄 #ffd93d","使用无衬线字体，保持随意感","添加笔记本横线背景","使用胶带/图钉/回形针等装饰元素"],dontList:["禁止使用精确的几何形状和直角（rounded-none）","禁止使用渐变效果","禁止使用精确阴影（shadow-md 等）","禁止使用等宽字体","禁止使用实线边框（border-solid）","禁止使用大圆角（rounded-lg 及以上）"],components:{button:{name:"按钮",description:"Hand-Drawn Doodle 风格按钮 - 虚线边框标记笔阴影",code:`<button className="
  px-6 py-3
  bg-[#2c2c2c] text-[#fffef5]
  font-sans font-semibold tracking-wide
  rounded-sm
  border-2 border-dashed border-[#2c2c2c]
  shadow-[3px_3px_0px_#ff6b6b]
  hover:translate-x-[1px] hover:translate-y-[1px]
  hover:shadow-[2px_2px_0px_#ff6b6b]
  hover:rotate-[-0.5deg]
  active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
  transition-all duration-200
">
  Doodle!
</button>`},card:{name:"卡片",description:"Hand-Drawn Doodle 风格卡片 - 笔记本纸张虚线边框",code:`<div className="
  p-8
  bg-[#fffef5]
  border-2 border-dashed border-[#2c2c2c]
  rounded-sm
  shadow-[4px_4px_0px_#4ecdc4]
  hover:shadow-[6px_6px_0px_#4ecdc4]
  hover:rotate-[0.5deg]
  transition-all duration-200
">
  <h3 className="text-2xl font-sans font-bold text-[#2c2c2c] mb-3">
    Sketch Note
  </h3>
  <p className="text-[#2c2c2c]/55 font-sans">
    Scribbled with love and creativity
  </p>
</div>`},input:{name:"输入框",description:"Hand-Drawn Doodle 风格输入框 - 虚线边框纸张背景",code:`<input
  type="text"
  placeholder="Scribble here..."
  className="
    w-full px-4 py-3
    bg-[#fffef5]
    border-2 border-dashed border-[#2c2c2c]
    rounded-sm
    text-[#2c2c2c] placeholder-[#2c2c2c]/30
    font-sans
    focus:border-[#ff6b6b]
    focus:shadow-[2px_2px_0px_#ffd93d]
    focus:outline-none
    transition-all duration-200
  "
/>`},hero:{name:"Hero 区块",description:"Hand-Drawn Doodle 风格 Hero - 笔记本背景涂鸦装饰",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#fffef5]
  relative overflow-hidden
" style={{
  backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(168,200,232,0.35) 31px, rgba(168,200,232,0.35) 32px)'
}}>
  {/* Red margin line */}
  <div className="absolute left-[120px] top-0 bottom-0 w-px bg-[#ff6b6b]/20" />
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-sans font-black text-[#2c2c2c] mb-2 rotate-[-1.5deg]">
      Doodle
    </h1>
    <h2 className="text-4xl md:text-6xl font-sans font-bold text-[#ff6b6b] -mt-2 mb-6 rotate-[1deg]">
      & Sketch
    </h2>
    <p className="text-lg text-[#2c2c2c]/50 font-sans mb-8">
      Hand-crafted interfaces with creative charm
    </p>
    <button className="
      px-10 py-4
      bg-[#2c2c2c] text-[#fffef5]
      font-sans font-semibold tracking-wide
      rounded-sm
      border-2 border-dashed border-[#2c2c2c]
      shadow-[4px_4px_0px_#4ecdc4]
      hover:translate-x-[1px] hover:translate-y-[1px]
      hover:shadow-[2px_2px_0px_#4ecdc4]
      hover:rotate-[-0.5deg]
      transition-all duration-200
    ">
      Start Drawing
    </button>
  </div>
</section>`}},globalCss:`/* Hand-Drawn Doodle Global Styles */

:root {
  --doodle-ink: #2c2c2c;
  --doodle-paper: #fffef5;
  --doodle-red: #ff6b6b;
  --doodle-teal: #4ecdc4;
  --doodle-yellow: #ffd93d;
}

/* Notebook lines background */
.doodle-lines {
  background-image: repeating-linear-gradient(
    transparent,
    transparent 31px,
    rgba(168, 200, 232, 0.35) 31px,
    rgba(168, 200, 232, 0.35) 32px
  );
}

/* Red margin line */
.doodle-margin::before {
  content: "";
  position: absolute;
  left: 120px;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: rgba(255, 107, 107, 0.2);
}

/* Squiggly underline */
.doodle-underline {
  text-decoration: underline;
  text-decoration-style: wavy;
  text-decoration-color: var(--doodle-red);
  text-underline-offset: 4px;
}

/* Marker highlight */
.doodle-highlight {
  background: linear-gradient(
    104deg,
    transparent 0.9%,
    rgba(255, 217, 61, 0.3) 2.4%,
    rgba(255, 217, 61, 0.2) 97.1%,
    transparent 98.2%
  );
  padding: 0 4px;
}

/* Tape decoration */
.doodle-tape {
  position: relative;
}
.doodle-tape::before {
  content: "";
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%) rotate(-3deg);
  width: 60px;
  height: 20px;
  background-color: rgba(255, 217, 61, 0.4);
  border-radius: 1px;
}

/* Sketchy rotation */
.doodle-tilt-left { transform: rotate(-1.5deg); }
.doodle-tilt-right { transform: rotate(1.5deg); }

/* Spiral binding holes */
.doodle-binding-holes::before {
  content: "";
  position: absolute;
  left: 50px;
  top: 0;
  bottom: 0;
  width: 16px;
  background-image: radial-gradient(circle, transparent 5px, transparent 5px),
    repeating-linear-gradient(
      transparent,
      transparent 60px,
      rgba(44, 44, 44, 0.08) 60px,
      rgba(44, 44, 44, 0.08) 76px,
      transparent 76px
    );
}`,aiRules:`You are a Hand-Drawn Doodle design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Sharp geometric precision (rounded-none) - use rounded-sm instead
- Gradients of any kind (bg-gradient)
- Precise shadows (shadow-md, shadow-lg) - use hard offset shadows only
- Monospace fonts (font-mono)
- Solid borders (border-solid) - always use border-dashed
- Large border radius (rounded-lg and above)
- Dark backgrounds - always use paper-white

## Must Follow

- Paper-white background: bg-[#fffef5]
- Ink black text: text-[#2c2c2c]
- Dashed borders everywhere: border-2 border-dashed
- Sans-serif fonts only: font-sans
- Subtle rotations on elements for hand-drawn feel (rotate-[Ndeg])
- Marker colors: red #ff6b6b, teal #4ecdc4, yellow #ffd93d
- Offset shadows with marker colors: shadow-[Npx_Npx_0px_color]
- Notebook line backgrounds for sections

## Color Palette

Primary:
- Ink Black: #2c2c2c (text, borders)
- Paper White: #fffef5 (backgrounds)
- Red Marker: #ff6b6b (accents, highlights)
- Teal Marker: #4ecdc4 (shadows, accents)
- Yellow Marker: #ffd93d (highlights, tape)

## Special Elements

- Notebook line backgrounds (repeating-linear-gradient)
- Red margin line decorations
- Wavy underlines (text-decoration-style: wavy)
- Marker highlight effects
- Tape, pushpin, and paperclip decorations on cards
- Subtle element rotations for sketchy feel
- Spiral binding holes on left edge
- Coffee stain ring decorations
- Hand-drawn stars and squiggles via SVG`,examplePrompts:[{title:"手绘涂鸦着陆页",titleEn:"Hand-Drawn Doodle Landing Page",description:"笔记本风格的创意着陆页，带涂鸦装饰",descriptionEn:"Notebook-style creative landing page with doodle decorations",prompt:`Use Hand-Drawn Doodle style to create a landing page:
1. Background: paper-white with notebook lines and red margin
2. Title: bold sans-serif with subtle rotation like handwriting
3. Cards: dashed borders with marker-color shadows, tape/pin decorations
4. Use only marker colors (red, teal, yellow) for accents
5. Add notebook elements: spiral holes, coffee stains, tape strips
6. Overall hand-crafted, sketchy, creative notebook feel`}]},{slug:"swiss-poster",name:"瑞士海报风",nameEn:"Swiss Poster",description:"大胆排版、网格对齐、原色色块和实验性布局。源于瑞士国际主义海报设计传统，以超大字体和强烈的视觉层次构建信息传达。与 swiss-style 的区别在于更注重海报级别的实验性大排版。",cover:"/styles/swiss-poster.svg",styleType:"visual",tags:["modern","minimal","high-contrast"],category:"modern",colors:{primary:"#000000",secondary:"#ffffff",accent:["#ff0000","#0057b8","#ffcc00"]},keywords:["海报","大字体","网格","实验排版","国际主义","12列网格","色块"],philosophy:`Swiss Poster 风格源于瑞士国际主义设计运动的海报传统，追求极致的排版表现力。

核心理念：
- 超大排版：使用极端大小的字体创造视觉冲击（160px 标题 vs 10px 标签）
- 12列网格系统：所有内容严格对齐到 grid-cols-12，使用非对称分栏
- 原色色块：黑白为主，红蓝黄作为大面积色块强调
- 边框分隔：使用 border-2 border-[#000000] 分隔区域，不使用阴影或间距
- 零间距：gap-0 让元素边缘紧贴，以边框线作为视觉分隔
- 无装饰：没有圆角、阴影、渐变、模糊，只有纯色和线条`,doList:["使用超大号无衬线粗体字（font-sans font-black）","严格遵循 12 列网格对齐（grid-cols-12）","使用黑白为主色调","使用原色（红 #ff0000、蓝 #0057b8、黄 #ffcc00）作为色块强调","保持直角边缘（rounded-none）","文字全部大写（uppercase tracking-widest）","使用 border-2 border-[#000000] 分隔区域","使用 gap-0 让元素紧贴","使用非对称布局（如 3/9、8/4 分栏）"],dontList:["禁止使用装饰性字体或等宽字体","禁止使用超过 rounded-sm 的圆角","禁止使用任何阴影（shadow-sm 及以上）","禁止使用渐变","禁止使用虚线边框（border-dashed）","禁止使用元素间距（gap-4 等），用 gap-0 + 边框"],components:{button:{name:"按钮",description:"Swiss Poster 风格按钮 - 黑色粗体大写无圆角",code:`<button className="
  px-8 py-3
  bg-[#000000] text-[#ffffff]
  font-sans font-black uppercase tracking-widest
  rounded-none
  border-2 border-[#000000]
  hover:bg-[#ff0000] hover:border-[#ff0000]
  active:scale-[0.98]
  transition-all duration-100
">
  ENTER
</button>`},card:{name:"卡片",description:"Swiss Poster 风格卡片 - 边框分隔色块悬停",code:`<div className="
  p-8
  bg-[#ffffff]
  border-2 border-[#000000]
  rounded-none
  hover:bg-[#ff0000] hover:text-[#ffffff]
  group
  transition-all duration-100
">
  <h3 className="text-3xl font-sans font-black text-[#000000] group-hover:text-[#ffffff] uppercase tracking-tight mb-3 transition-colors duration-100">
    HELVETICA
  </h3>
  <p className="text-[#000000]/60 group-hover:text-[#ffffff]/70 font-sans transition-colors duration-100">
    Grid-aligned typographic content
  </p>
</div>`},input:{name:"输入框",description:"Swiss Poster 风格输入框 - 仅底部边框透明背景",code:`<input
  type="text"
  placeholder="TYPE HERE"
  className="
    w-full px-0 py-3
    bg-transparent
    border-0 border-b-2 border-[#000000]
    rounded-none
    text-[#000000] placeholder-[#000000]/20
    font-sans font-bold text-lg
    focus:border-[#ff0000]
    focus:outline-none
    transition-all duration-100
  "
/>`},hero:{name:"Hero 区块",description:"Swiss Poster 风格 Hero - 非对称分栏超大排版",code:`<section className="border-b-2 border-[#000000]">
  <div className="grid grid-cols-12">
    <div className="col-span-12 md:col-span-8 px-6 md:px-12 pt-8 pb-12 md:border-r-2 border-[#000000]">
      <h1 className="text-[80px] md:text-[120px] lg:text-[160px] font-sans font-black text-[#000000] uppercase leading-[0.85] tracking-tighter">
        SWISS
      </h1>
      <h2 className="text-[50px] md:text-[80px] lg:text-[100px] font-sans font-black text-[#000000] uppercase leading-[0.85] tracking-tighter -mt-2">
        POSTER
      </h2>
      <p className="text-xs font-sans text-[#000000]/50 leading-relaxed uppercase tracking-wider mt-8 max-w-md">
        Bold typography. Mathematical grid system. Asymmetric composition.
      </p>
      <div className="flex gap-0 mt-10">
        <button className="px-8 py-4 bg-[#000000] text-[#ffffff] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] hover:bg-[#ff0000] hover:border-[#ff0000] transition-all duration-100 text-sm">
          EXPLORE
        </button>
        <button className="px-8 py-4 bg-transparent text-[#000000] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] border-l-0 hover:bg-[#000000] hover:text-[#ffffff] transition-all duration-100 text-sm">
          LEARN
        </button>
      </div>
    </div>
    <div className="hidden md:flex col-span-4 bg-[#ff0000] items-center justify-center min-h-[400px] relative">
      <span className="font-sans font-black text-[#ffffff] text-sm uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180">
        INTERNATIONAL STYLE
      </span>
    </div>
  </div>
</section>`}},globalCss:`/* Swiss Poster Global Styles */

:root {
  --sp-black: #000000;
  --sp-white: #ffffff;
  --sp-red: #ff0000;
  --sp-blue: #0057b8;
  --sp-yellow: #ffcc00;
}

/* Structural grid overlay for development */
.sp-grid-overlay {
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: calc(100% / 12) 100px;
}

/* Color block accents */
.sp-block-red { background-color: var(--sp-red); }
.sp-block-blue { background-color: var(--sp-blue); }
.sp-block-yellow { background-color: var(--sp-yellow); }

/* Tight tracking for poster headings */
.sp-tight { letter-spacing: -0.05em; }

/* Structural divider line */
.sp-divider {
  border-top: 2px solid var(--sp-black);
}

/* Vertical text for sidebar labels */
.sp-vertical-text {
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  letter-spacing: 0.5em;
}

/* Asymmetric grid helper - 3/9 split */
.sp-grid-3-9 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
.sp-grid-3-9 > :first-child { grid-column: span 3; }
.sp-grid-3-9 > :last-child { grid-column: span 9; }

/* Edge-to-edge buttons */
.sp-button-group {
  display: flex;
  gap: 0;
}
.sp-button-group > * + * {
  border-left: 0;
}`,aiRules:`You are a Swiss Poster design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Decorative, script, or monospace fonts
- Rounded corners larger than rounded-sm (use rounded-none)
- Any shadows (shadow-sm, shadow-md, shadow-lg, etc.) - Swiss Poster has NO shadows
- Gradients of any kind
- Dashed borders (border-dashed) - use border-solid only
- Element spacing/gaps (gap-4, gap-6) - use gap-0 with border dividers
- Backdrop blur or glass effects
- Decorative elements or embellishments

## Must Follow

- Black and white as primary palette: #000000, #ffffff
- Accent color blocks: red #ff0000, blue #0057b8, yellow #ffcc00
- Extra bold sans-serif: font-sans font-black
- All uppercase: uppercase tracking-widest
- Sharp edges: rounded-none everywhere
- 12-column grid alignment: grid-cols-12 with asymmetric splits
- Borders as dividers: border-2 border-[#000000]
- Zero gaps: gap-0, elements butt against each other
- Extreme type scale contrast (160px heading vs 10px label)
- Non-symmetric layouts (3/9, 8/4 column splits)

## Color Palette

Primary:
- Black: #000000 (text, borders, backgrounds)
- White: #ffffff (backgrounds)
- Red: #ff0000 (color blocks, hover states)
- Blue: #0057b8 (color blocks)
- Yellow: #ffcc00 (color blocks)

## Special Elements

- 12-column grid system with visible structural lines
- Asymmetric column splits (not 6/6 - use 3/9, 8/4, etc.)
- Color block backgrounds (full sections in red/blue/yellow)
- Visible grid column markers
- Extreme font size contrasts (160px vs 10px)
- Edge-to-edge button groups (gap-0, border-l-0)
- Vertical text using writing-mode: vertical-lr
- Section borders as visual separators instead of spacing`,examplePrompts:[{title:"瑞士海报着陆页",titleEn:"Swiss Poster Landing Page",description:"12列网格非对称布局的海报风格着陆页",descriptionEn:"12-column grid asymmetric poster landing page",prompt:`Use Swiss Poster style to create a landing page:
1. Background: white with visible 12-column structural grid
2. Title: extremely large (160px) black sans-serif, uppercase, tight tracking
3. Layout: asymmetric grid-cols-12 splits (8/4, 3/9), never symmetric
4. Cards: border-only, no shadows, color block hover states
5. Buttons: edge-to-edge gap-0, joined with border-l-0
6. Color blocks: large red/blue/yellow sections as accents
7. Section dividers: border-2 border-[#000000], no spacing
8. Overall bold, grid-based, mathematical typographic poster aesthetic`}]},{slug:"watercolor-art",name:"水彩艺术风",nameEn:"Watercolor Art",description:"真实水彩画美学，有机的晕染边缘、颜料池化效果、纸张纹理叠加和植物水彩装饰，营造如同手绘水彩画般的自然有机视觉体验。",cover:"/styles/watercolor-art.svg",styleType:"visual",tags:["expressive","minimal"],category:"expressive",colors:{primary:"#d4a0a0",secondary:"#faf6f0",accent:["#7bb8d4","#8cc5a8","#c3a0d4","#e8c87a"]},keywords:["水彩","晕染","透明","纸张","颜料","池化","植物","有机"],philosophy:`水彩艺术风格追求真实水彩画的自然有机美学，强调颜料在湿纸上的流动、渗透和池化效果。

核心理念：
- 有机边缘：使用 SVG feTurbulence + feDisplacementMap 模拟真实的水彩渗透边缘
- 颜料池化：颜色在边缘处浓缩变深，中心区域保持透明层叠
- 纸张纹理：温暖的手工纸底色带有微妙的纤维纹理
- 植物装饰：叶片和花朵形态的水彩点缀增添自然气息
- 湿染技法：色彩在湿润表面自然扩散、融合、产生意外之美`,doList:["使用超柔和的阴影和极低透明度（0.08-0.18）的边框","背景使用纸张纹理叠加（feTurbulence grain overlay）","按钮使用 radial-gradient 模拟颜料从中心向边缘池化","卡片使用有机边角 rounded-3xl 和极淡的边框","采用衬线字体（font-serif）配合宽松字距","大量留白，让水彩元素有呼吸空间","色彩始终保持透明感，避免实色填充"],dontList:["禁止使用锐利边角（rounded-none/rounded-sm）","禁止使用硬边偏移阴影（shadow-[Npx_Npx_0px]）","禁止使用粗边框（border-2 以上）","禁止使用纯黑背景或高饱和度霓虹色","禁止使用等宽字体（font-mono）","禁止使用大写文字（uppercase）"],components:{button:{name:"按钮",description:"水彩颜料池化按钮，使用径向渐变模拟颜料从中心扩散的效果",code:`<button className="
  px-8 py-3.5
  bg-[#d4a0a0] text-[#5a3e3e]
  font-serif font-medium tracking-wide
  rounded-2xl
  shadow-[0_4px_20px_rgba(212,160,160,0.25),inset_0_1px_0_rgba(255,255,255,0.15)]
  hover:scale-[1.02]
  hover:shadow-[0_6px_28px_rgba(212,160,160,0.30)]
  transition-all duration-500
">
  Paint
</button>`},card:{name:"卡片",description:"纸张质感卡片，有机圆角和水彩渗透边缘阴影",code:`<div className="
  p-8
  bg-[#faf6f0]/80
  border border-[#d4a0a0]/15
  rounded-3xl
  shadow-[0_2px_20px_rgba(212,160,160,0.10)]
  hover:shadow-[0_8px_32px_rgba(212,160,160,0.18)]
  transition-all duration-500
">
  <h3 className="text-2xl font-serif font-semibold text-[#5a3e3e] mb-3">
    Wet-on-Wet
  </h3>
  <p className="text-[#5a3e3e]/45 font-serif leading-relaxed">
    Pigments flow and merge on damp paper
  </p>
</div>`},input:{name:"输入框",description:"水彩风格输入框，纸张纹理背景和柔和的渗透聚焦效果",code:`<input
  type="text"
  placeholder="Type softly..."
  className="
    w-full px-5 py-3.5
    bg-[#faf6f0]
    border border-[#d4a0a0]/20
    rounded-2xl
    text-[#5a3e3e] placeholder-[#d4a0a0]/35
    font-serif
    focus:border-[#d4a0a0]/35
    focus:shadow-[0_0_0_3px_rgba(212,160,160,0.10)]
    focus:outline-none
    transition-all duration-500
  "
/>`},hero:{name:"Hero 区块",description:"水彩全幅英雄区域，有机形态的水彩渲染背景和流动排版",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#faf6f0]
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-serif font-semibold text-[#d4a0a0] tracking-tight leading-none mb-4">
      Watercolor
    </h1>
    <h2 className="text-4xl md:text-6xl font-serif font-semibold text-[#7bb8d4]/70 mb-8">
      Art
    </h2>
    <p className="text-lg text-[#5a3e3e]/40 font-serif mb-12 max-w-xl mx-auto leading-relaxed">
      Pigments flow freely across warm paper
    </p>
    <button className="
      px-10 py-4
      bg-[#d4a0a0] text-[#5a3e3e]
      font-serif font-medium tracking-wide
      rounded-2xl
      shadow-[0_4px_24px_rgba(212,160,160,0.30)]
      hover:scale-[1.02]
      transition-all duration-500
    ">
      Explore
    </button>
  </div>
</section>`}},globalCss:`/* Watercolor Art Global Styles */

:root {
  --wc-rose: #d4a0a0;
  --wc-paper: #faf6f0;
  --wc-cerulean: #7bb8d4;
  --wc-sage: #8cc5a8;
  --wc-lavender: #c3a0d4;
  --wc-ochre: #e8c87a;
  --wc-text: #5a3e3e;
}

/* Paper grain texture overlay */
.wc-paper::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence baseFrequency='0.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
}

/* Watercolor wash section background */
.wc-wash {
  position: relative;
  overflow: hidden;
}
.wc-wash::before {
  content: "";
  position: absolute;
  inset: -20%;
  background: radial-gradient(ellipse at 30% 50%, var(--wc-rose) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 30%, var(--wc-cerulean) 0%, transparent 50%);
  opacity: 0.06;
  pointer-events: none;
}

/* Organic bleeding edge border radius */
.wc-bleed {
  border-radius: 40% 60% 50% 50% / 50% 40% 60% 50%;
}

/* Botanical accent decoration */
.wc-botanical::before {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  background: var(--wc-sage);
  opacity: 0.12;
  border-radius: 0 100% 0 100%;
  filter: blur(4px);
}`,aiRules:`You are a Watercolor Art design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Sharp edges (rounded-none, rounded-sm)
- Hard offset shadows (shadow-[Npx_Npx_0px])
- Thick borders (border-2 or higher)
- Neon or highly saturated colors
- Monospace fonts (font-mono)
- Uppercase text (uppercase)
- Pure black backgrounds (bg-black)

## Must Follow

- Warm paper background bg-[#faf6f0]
- Rose pink as primary color #d4a0a0
- Serif fonts font-serif with generous tracking
- Soft organic corners rounded-2xl (buttons) / rounded-3xl (cards)
- Ultra-soft shadows using rgba with low opacity (0.08-0.18)
- Delicate borders with 15-25% opacity
- Radial gradient backgrounds for watercolor wash effects
- Generous whitespace throughout

## Color Palette

Primary:
- Rose Wash: #d4a0a0
- Warm Paper: #faf6f0
- Cerulean: #7bb8d4
- Sage Green: #8cc5a8
- Lavender Bloom: #c3a0d4
- Ochre Gold: #e8c87a
- Text: #5a3e3e

## Unique Elements

- Paper grain texture overlay (feTurbulence SVG filter)
- Radial gradient buttons simulating pigment pooling
- Watercolor wash section backgrounds (multiple radial-gradients)
- Botanical watercolor accent decorations (leaf/flower shapes)
- Organic blob-like border-radius values`,examplePrompts:[{title:"水彩艺术作品集",titleEn:"Watercolor Art Portfolio",description:"水彩风格的艺术作品展示页面，带有植物装饰和纸张纹理",descriptionEn:"Art portfolio with watercolor washes, botanical accents, and paper grain texture",prompt:`Use Watercolor Art style to create a portfolio page:
1. Background: warm paper #faf6f0 with grain texture overlay
2. Title: elegant serif font with rose pink tones
3. Cards: organic rounded-3xl corners with ultra-soft shadows
4. Use radial-gradient washes as section backgrounds
5. Add botanical leaf/flower decorations at organic positions
6. Maintain generous whitespace and breathing room
7. Buttons use radial-gradient for pigment pooling effect`}]},{slug:"impressionist-oil",name:"油画印象派风",nameEn:"Impressionist Oil",description:"受莫奈、雷诺阿等印象派大师启发，大胆的笔触纹理、斑驳光影、点彩色彩和温暖的画布质感，呈现如油画般的浓郁视觉体验。",cover:"/styles/impressionist-oil.svg",styleType:"visual",tags:["retro","expressive"],category:"expressive",colors:{primary:"#e8a87c",secondary:"#f5f0e1",accent:["#c0392b","#2c3e50","#1abc9c","#f5d88a"]},keywords:["油画","印象派","笔触","光影","莫奈","色彩","画布","impasto"],philosophy:`油画印象派风格汲取19世纪法国印象派绘画的精髓，强调光影变化和色彩的即兴表达。

核心理念：
- 斑驳光影：使用 multiple radial-gradient 叠加模拟阳光穿过树叶的斑驳效果
- 笔触纹理：通过 repeating-linear-gradient 以不同角度叠加创造画布上可见的笔触
- 厚涂堆叠：layered box-shadow（0_3px_0 色块 + blur shadow）模拟颜料的厚实体积感
- 画布质感：温暖的米白底色 #f5f0e1 配以 feTurbulence 织纹滤镜
- 色彩调和：暖橙 #e8a87c、朱红 #c0392b、深蓝 #2c3e50、青绿 #1abc9c、金光 #f5d88a`,doList:["使用温暖的画布色 bg-[#f5f0e1] 作为背景","按钮使用 linear-gradient 模拟颜料管挤出的渐变质感","使用 layered box-shadow（实色底部 + 模糊扩散）模拟厚涂阴影","卡片使用 repeating-linear-gradient 作为背景纹理模拟笔触方向","添加 radial-gradient 光斑叠加模拟斑驳光影","采用粗体衬线字体 font-serif font-bold 表达艺术感","边角使用 rounded-lg 保持柔和的画布边缘"],dontList:["禁止使用纯平色块（应有纹理感和渐变）","禁止使用锐利几何边角（rounded-none/rounded-sm）","禁止使用霓虹色或荧光色","禁止使用等宽字体（font-mono）","禁止使用大写文字（uppercase）","禁止使用像素级精确的偏移阴影（shadow-[Npx_Npx_0px]）"],components:{button:{name:"按钮",description:"油画印象派颜料管按钮，使用 linear-gradient 填充和 layered box-shadow 厚涂阴影",code:`<button className="
  px-8 py-3.5
  text-[#2c3e50]
  font-serif font-bold tracking-wide
  rounded-lg
  hover:brightness-110
  active:translate-y-[2px]
  transition-all duration-300
"
  style={{
    background: "linear-gradient(135deg, #e8a87c 0%, #daa070 100%)",
    boxShadow: "0 4px 0 #c0392b, 0 6px 16px rgba(232,168,124,0.30)"
  }}
>
  Paint
</button>`},card:{name:"卡片",description:"画布质感卡片，repeating-linear-gradient 笔触纹理和 radial-gradient 斑驳光斑",code:`<div className="
  relative p-8
  bg-[#f5f0e1]
  border border-[#e8a87c]/25
  rounded-lg
  transition-all duration-300
"
  style={{
    boxShadow: "0 3px 0 rgba(192,57,43,0.12), 0 8px 24px rgba(44,62,80,0.08)",
    backgroundImage: "repeating-linear-gradient(25deg, transparent, transparent 15px, rgba(232,168,124,0.02) 15px, transparent 16px)"
  }}
>
  <h3 className="text-2xl font-serif font-bold text-[#2c3e50] mb-3">
    Impression
  </h3>
  <p className="text-[#2c3e50]/50 font-serif leading-relaxed">
    Light dances across the canvas at golden hour
  </p>
</div>`},input:{name:"输入框",description:"画布表面输入框，温暖的内阴影和衬线字体",code:`<input
  type="text"
  placeholder="Your brushstroke..."
  className="
    w-full px-5 py-3.5
    bg-[#f5f0e1]
    border-2 border-[#e8a87c]/25
    rounded-lg
    text-[#2c3e50] placeholder-[#2c3e50]/30
    font-serif
    focus:border-[#e8a87c]
    focus:outline-none
    transition-all duration-300
  "
  style={{ boxShadow: "inset 0 2px 4px rgba(44,62,80,0.04)" }}
/>`},hero:{name:"Hero 区块",description:"画廊墙面英雄区域，画框边框和斑驳光影叠加",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#f5f0e1]
  relative overflow-hidden
">
  {/* Dappled light overlay */}
  <div className="absolute inset-0 pointer-events-none" style={{
    background: "radial-gradient(circle 80px at 20% 15%, rgba(245,216,138,0.08) 0%, transparent 100%), radial-gradient(circle 100px at 75% 20%, rgba(232,168,124,0.06) 0%, transparent 100%)"
  }} />
  {/* Canvas texture */}
  <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(44,62,80,0.03) 3px, transparent 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(44,62,80,0.02) 3px, transparent 4px)"
  }} />
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#e8a87c] leading-none mb-3">
      Impression
    </h1>
    <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2c3e50] mb-6">
      Soleil Levant
    </h2>
    <p className="text-lg text-[#2c3e50]/45 font-serif mb-10 max-w-xl mx-auto leading-relaxed">
      Bold brushstrokes capture the fleeting dance of light
    </p>
    <button className="
      px-10 py-4
      text-[#2c3e50]
      font-serif font-bold tracking-wide
      rounded-lg
      hover:brightness-110
      active:translate-y-[2px]
      transition-all duration-300
    "
      style={{
        background: "linear-gradient(135deg, #e8a87c 0%, #daa070 100%)",
        boxShadow: "0 4px 0 #c0392b, 0 6px 16px rgba(232,168,124,0.30)"
      }}
    >
      Enter Gallery
    </button>
  </div>
</section>`}},globalCss:`/* Impressionist Oil Global Styles */

:root {
  --imp-orange: #e8a87c;
  --imp-canvas: #f5f0e1;
  --imp-vermillion: #c0392b;
  --imp-blue: #2c3e50;
  --imp-turquoise: #1abc9c;
  --imp-gold: #f5d88a;
}

/* Canvas weave texture overlay */
.imp-canvas::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(44,62,80,0.03) 3px, transparent 4px),
    repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(44,62,80,0.02) 3px, transparent 4px);
  opacity: 0.04;
  pointer-events: none;
}

/* Dappled light overlay - scattered radial gradient spots */
.imp-dapple::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle 80px at 20% 15%, rgba(245,216,138,0.08) 0%, transparent 100%),
    radial-gradient(circle 100px at 45% 10%, rgba(232,168,124,0.06) 0%, transparent 100%),
    radial-gradient(circle 70px at 75% 20%, rgba(245,216,138,0.07) 0%, transparent 100%),
    radial-gradient(circle 90px at 90% 60%, rgba(232,168,124,0.05) 0%, transparent 100%);
  pointer-events: none;
}

/* Brushstroke texture as repeating-linear-gradient */
.imp-brushstroke {
  background-image: repeating-linear-gradient(
    25deg,
    transparent,
    transparent 15px,
    rgba(232,168,124,0.02) 15px,
    transparent 16px
  );
}

/* Brushstroke underline decoration */
.imp-stroke {
  position: relative;
  display: inline-block;
}
.imp-stroke::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: -5%;
  width: 110%;
  height: 6px;
  background: var(--imp-orange);
  opacity: 0.5;
  border-radius: 50%;
  transform: rotate(-1deg);
}

/* Pointillism dot background */
.imp-dots {
  background-image:
    radial-gradient(circle, var(--imp-orange) 0.8px, transparent 0.8px),
    radial-gradient(circle, var(--imp-vermillion) 0.6px, transparent 0.6px);
  background-size: 12px 12px, 8px 8px;
  background-position: 0 0, 4px 4px;
  opacity: 0.06;
}`,aiRules:`You are an Impressionist Oil design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Flat solid fills without texture or gradient
- Sharp geometric edges (rounded-none, rounded-sm)
- Pixel-perfect offset shadows (shadow-[Npx_Npx_0px])
- Neon or fluorescent colors
- Monospace fonts (font-mono)
- Uppercase text (uppercase)
- Pure black backgrounds (bg-black)

## Must Follow

- Canvas cream background bg-[#f5f0e1]
- Warm orange #e8a87c as primary, use linear-gradient fills on buttons
- Serif fonts font-serif font-bold for all text
- Rounded corners rounded-lg
- Layered box-shadows: solid color base + blur shadow (e.g. 0 4px 0 #c0392b, 0 6px 16px rgba())
- Brushstroke texture via repeating-linear-gradient at angled degrees
- Dappled light via multiple radial-gradient overlays

## Color Palette

Primary:
- Warm Orange: #e8a87c
- Canvas Cream: #f5f0e1
- Vermillion Red: #c0392b
- Deep Blue: #2c3e50
- Turquoise Green: #1abc9c
- Golden Light: #f5d88a

## Unique Elements (Impressionist-Only)

1. Brushstroke texture: repeating-linear-gradient at 25-40deg angles with 0.02 opacity color stops
2. Dappled light: multiple radial-gradient(circle Npx at X% Y%, rgba(...,0.05-0.08)) scattered across surfaces
3. Impasto shadows: layered box-shadow with solid color base layer + blurred spread layer`,examplePrompts:[{title:"印象派画廊页面",titleEn:"Impressionist Gallery Page",description:"油画风格的艺术画廊展示，带有斑驳光影和笔触纹理",descriptionEn:"Art gallery with dappled light overlays, brushstroke textures, and impasto shadows",prompt:`Use Impressionist Oil style to create a gallery page:
1. Background: canvas cream #f5f0e1 with repeating-linear-gradient crosshatch texture overlay
2. Hero: painting frame border with inset box-shadow, multiple radial-gradient dappled light spots
3. Cards: repeating-linear-gradient brushstroke texture at varied angles, layered box-shadows
4. Buttons: linear-gradient fills with 0 4px 0 solid + blur shadow
5. Warm palette: #e8a87c, #c0392b, #2c3e50, #1abc9c, #f5d88a
6. Font: serif bold throughout`}]},{slug:"collage-art",name:"拼贴艺术风",nameEn:"Collage Art",description:"杂志拼贴和混合材料美学，纸片剪切、多层叠加、撕纸边缘和混搭字体，营造充满创意和手工感的视觉冲击。",cover:"/styles/collage-art.svg",styleType:"visual",tags:["expressive","retro"],category:"expressive",colors:{primary:"#2d2d2d",secondary:"#f5f0e8",accent:["#e74c3c","#3498db","#f39c12","#9b59b6"]},keywords:["拼贴","剪贴","混合材质","多层","杂志","撕纸","混搭","washi"],philosophy:`拼贴艺术风格源于达达主义和波普艺术的混合媒材传统，强调不同材料、字体和图像的碰撞与融合。

核心理念：
- 随机旋转：每个元素都有细微的 rotate transform（0.5-2deg），模拟手工粘贴的不精确感
- 和纸胶带装饰：使用 repeating-linear-gradient 条纹伪元素模拟半透明和纸胶带
- 混搭字体：同一页面交替使用 font-serif、font-sans、font-mono 营造杂志剪报感
- 撕纸边缘：polygon clip-path 创造不规则的锯齿状撕纸边缘
- 硬偏移阴影：shadow-[Npx_Npx_0px] 纯色偏移阴影创造纸片层叠的物理深度`,doList:["使用混合字体（衬线 font-serif + 无衬线 font-sans + 等宽 font-mono 交替）","元素添加随机旋转 rotate-[N deg] 变换（0.5-2 度范围）","使用硬偏移阴影 shadow-[Npx_Npx_0px_color] 营造层叠深度","添加 washi tape 装饰：repeating-linear-gradient 条纹色块","使用 polygon clip-path 创造撕纸边缘效果","保持陈旧纸张色 bg-[#f5f0e8] 作为底色","大胆使用对比色块（红/蓝/黄/紫）","使用实线和虚线边框模拟剪切痕迹"],dontList:["禁止使用平滑渐变（bg-gradient-to-*）","禁止使用柔和圆角（rounded-lg 以上）","禁止使用毛玻璃效果（backdrop-blur）","禁止使用柔和阴影（shadow-[0_Npx_Npx]）","禁止使用统一整齐的对齐方式"],components:{button:{name:"按钮",description:"纸片剪切按钮，随机旋转变换和硬偏移阴影层叠效果",code:`<button
  className="
    px-7 py-3
    bg-[#e74c3c] text-white
    font-bold uppercase tracking-wider
    rounded-sm
    border-2 border-[#2d2d2d]
    shadow-[4px_4px_0px_#2d2d2d]
    hover:rotate-0
    hover:translate-x-[1px] hover:translate-y-[1px]
    hover:shadow-[2px_2px_0px_#2d2d2d]
    transition-all duration-200
  "
  style={{ transform: "rotate(-0.7deg)" }}
>
  Cut & Paste
</button>`},card:{name:"卡片",description:"多层纸片卡片，带旋转变换、彩色硬偏移阴影和 washi tape 装饰",code:`<div className="relative">
  {/* Washi tape decoration */}
  <div
    className="absolute -top-3 left-8 w-20 h-5 z-10"
    style={{
      background: "repeating-linear-gradient(90deg, #f39c12 0px, #f39c12 3px, rgba(255,255,255,0.3) 3px, rgba(255,255,255,0.3) 6px)",
      opacity: 0.7,
      transform: "rotate(3deg)"
    }}
  />
  <div
    className="
      p-8
      bg-[#f5f0e8]
      border-2 border-[#2d2d2d]
      rounded-none
      shadow-[5px_5px_0px_#e74c3c]
      hover:-translate-y-1
      hover:shadow-[7px_7px_0px_#e74c3c]
      transition-all duration-200
    "
    style={{ transform: "rotate(0.8deg)" }}
  >
    <h3 className="text-2xl font-serif font-bold text-[#2d2d2d] uppercase mb-3">
      COLLAGE
    </h3>
    <p className="text-[#2d2d2d]/55 font-sans text-sm">
      Cut, tear, paste, and layer
    </p>
  </div>
</div>`},input:{name:"输入框",description:"杂志剪报输入框，混合字体标签和硬阴影聚焦效果",code:`<div>
  <label className="block text-xs font-mono font-bold text-[#e74c3c] uppercase tracking-wider mb-2">
    FIELD NAME
  </label>
  <input
    type="text"
    placeholder="TYPE HERE..."
    className="
      w-full px-5 py-3
      bg-[#f5f0e8]
      border-2 border-[#2d2d2d]
      rounded-none
      text-[#2d2d2d] placeholder-[#2d2d2d]/30
      font-serif
      focus:border-[#e74c3c]
      focus:shadow-[3px_3px_0px_#2d2d2d]
      focus:outline-none
      transition-all duration-200
    "
  />
</div>`},hero:{name:"Hero 区块",description:"拼贴布告板英雄区域，撕纸背景、图钉装饰和混搭字体",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#f5f0e8]
  relative overflow-hidden
">
  {/* Scattered paper scraps */}
  <div className="absolute top-8 right-16 w-44 h-32 bg-[#e74c3c]/8 pointer-events-none"
    style={{ transform: "rotate(5deg)", clipPath: "polygon(0% 3%, 8% 0%, 20% 4%, 35% 1%, 50% 3%, 65% 0%, 80% 4%, 92% 0%, 100% 2%, 100% 97%, 92% 100%, 80% 96%, 65% 100%, 50% 98%, 35% 100%, 20% 96%, 8% 100%, 0% 97%)" }}
  />
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#2d2d2d] mb-2"
      style={{ transform: "rotate(-1.5deg)" }}
    >
      COLLAGE
    </h1>
    <h2 className="text-4xl md:text-6xl font-sans font-black text-[#e74c3c] uppercase mb-6"
      style={{ transform: "rotate(0.5deg)" }}
    >
      ART
    </h2>
    <p className="text-sm text-[#2d2d2d]/50 font-mono tracking-wider mb-10 max-w-md mx-auto">
      CUT / TEAR / PASTE / LAYER
    </p>
    <button className="
      px-10 py-4
      bg-[#e74c3c] text-white
      font-bold uppercase tracking-wider
      rounded-sm
      border-2 border-[#2d2d2d]
      shadow-[4px_4px_0px_#2d2d2d]
      hover:rotate-0
      hover:translate-x-[1px] hover:translate-y-[1px]
      hover:shadow-[2px_2px_0px_#2d2d2d]
      transition-all duration-200
    "
      style={{ transform: "rotate(-0.5deg)" }}
    >
      Explore
    </button>
  </div>
</section>`}},globalCss:`/* Collage Art Global Styles */

:root {
  --col-dark: #2d2d2d;
  --col-paper: #f5f0e8;
  --col-red: #e74c3c;
  --col-blue: #3498db;
  --col-yellow: #f39c12;
  --col-purple: #9b59b6;
}

/* Torn paper edge clip-path */
.col-torn {
  clip-path: polygon(
    0% 3%, 5% 0%, 12% 4%, 20% 1%, 28% 3%, 35% 0%, 42% 2%, 50% 0%,
    58% 3%, 65% 1%, 72% 4%, 80% 0%, 88% 2%, 95% 0%, 100% 3%,
    100% 97%, 95% 100%, 88% 98%, 80% 100%, 72% 97%, 65% 100%,
    58% 98%, 50% 100%, 42% 97%, 35% 100%, 28% 98%, 20% 100%,
    12% 97%, 5% 100%, 0% 98%
  );
}

/* Washi tape decoration - striped repeating-linear-gradient */
.col-tape {
  position: relative;
}
.col-tape::before {
  content: "";
  position: absolute;
  top: -10px;
  left: 20%;
  width: 80px;
  height: 20px;
  background: repeating-linear-gradient(
    90deg,
    var(--col-yellow) 0px,
    var(--col-yellow) 3px,
    rgba(255,255,255,0.3) 3px,
    rgba(255,255,255,0.3) 6px
  );
  opacity: 0.7;
  transform: rotate(2deg);
}

/* Stamp/postal mark decoration */
.col-stamp {
  border: 3px dashed var(--col-dark);
  padding: 8px;
  position: relative;
}
.col-stamp::after {
  content: "APPROVED";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(12deg);
  font-family: 'Courier New', monospace;
  font-size: 12px;
  font-weight: 700;
  color: var(--col-red);
  opacity: 0.3;
}

/* Newspaper column text */
.col-newspaper {
  font-family: 'Times New Roman', serif;
  line-height: 1.2;
  columns: 2;
  column-gap: 20px;
  column-rule: 1px solid var(--col-dark);
}

/* Pushpin decoration */
.col-pin::before {
  content: "";
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--col-red);
  box-shadow: inset 0 0 0 3px rgba(255,255,255,0.4);
}`,aiRules:`You are a Collage Art design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Smooth gradients (bg-gradient-to-*)
- Soft rounded corners (rounded-lg, rounded-xl, rounded-2xl, rounded-full)
- Backdrop blur effects (backdrop-blur)
- Soft blur shadows (shadow-[0_Npx_Npx])
- Uniform, perfectly aligned layouts
- Single font family throughout

## Must Follow

- Aged paper background bg-[#f5f0e8]
- Dark charcoal #2d2d2d for borders and text
- Hard offset shadows shadow-[Npx_Npx_0px_#color]
- Sharp corners rounded-sm or rounded-none
- Random rotation transforms on elements (rotate-[0.5deg] to rotate-[2deg])
- Mix font families: font-serif, font-sans, font-mono across sections
- Thick borders border-2 border-[#2d2d2d]

## Color Palette

Primary:
- Dark Charcoal: #2d2d2d
- Aged Paper: #f5f0e8
- Cut Red: #e74c3c
- Magazine Blue: #3498db
- Paste Yellow: #f39c12
- Scrap Purple: #9b59b6

## Unique Elements (Collage-Only)

1. Random rotation: style={{ transform: "rotate(Ndeg)" }} on cards, buttons, headings (0.5-2 degrees)
2. Washi tape: repeating-linear-gradient(90deg, color 0px, color 3px, rgba(255,255,255,0.3) 3px, rgba(255,255,255,0.3) 6px) strips
3. Mixed typography: alternate font-serif, font-sans, font-mono across headings, labels, body text
4. Torn paper edges: polygon clip-path with irregular jagged points
5. Dashed borders: border-dashed for stamp/cut-line effects`,examplePrompts:[{title:"拼贴艺术杂志页面",titleEn:"Collage Art Magazine Page",description:"杂志拼贴风格的创意页面，带有旋转卡片、和纸胶带装饰和混搭字体",descriptionEn:"Creative zine page with rotated cards, washi tape strips, torn-edge dividers, and mixed serif/sans/mono typography",prompt:`Use Collage Art style to create a zine-style page:
1. Background: aged paper #f5f0e8 with torn paper scrap decorations (clip-path polygon)
2. Hero: mixed fonts (serif title + sans subtitle + mono caption), random rotations on each line
3. Cards: hard offset shadows in different colors, each card rotated differently
4. Washi tape: repeating-linear-gradient stripe decorations on card tops
5. Buttons: rotated with hard shadows, hover resets rotation
6. Form: mixed font labels (serif/sans/mono), dashed border textarea
7. Typography mixes serif, sans-serif, and monospace throughout`}]},{slug:"glitch-art",name:"故障艺术风",nameEn:"Glitch Art",description:"数字故障美学风格，通过RGB色彩通道分离、水平位移带、扫描线纹理、VHS追踪错误和数据损坏块，呈现赛博朋克式的视觉冲击和信号腐蚀质感。",cover:"/styles/glitch-art.svg",styleType:"visual",tags:["expressive","modern","high-contrast"],category:"expressive",colors:{primary:"#00ffff",secondary:"#0a0a0a",accent:["#ff00ff","#ffff00","#ffffff"]},keywords:["故障","像素","RGB分离","扫描线","数字损坏","位移","VHS","通道分离"],philosophy:`Glitch Art 是一种拥抱数字错误与技术故障的艺术形式，将系统崩溃和数据损坏转化为视觉表达。

核心理念：
- RGB通道分离：将CMY三通道故意错位，产生色彩偏移阴影效果
- 水平位移带：通过clip-path随机裁切区域产生水平错位
- 扫描线纹理：CRT显示器的水平扫描线覆盖层
- VHS追踪错误：模拟老式录像带的追踪错误横线
- 数据损坏块：随机分布的半透明色彩块模拟数据丢失`,doList:["使用CMY三色（青 #00ffff、品红 #ff00ff、黄 #ffff00）作为RGB分离效果","所有文字和元素添加RGB分离偏移阴影 shadow-[3px_0_#ff00ff,-3px_0_#ffff00]","使用等宽字体（font-mono）和全大写 uppercase","保持纯黑背景 bg-[#0a0a0a]，无圆角 rounded-none","添加扫描线纹理覆盖层（repeating-linear-gradient）","使用左边框（border-l-2）而非全边框来标记卡片"],dontList:["禁止使用任何圆角（rounded-lg, rounded-xl, rounded-full）","禁止使用柔和阴影（shadow-sm, shadow-md 等标准阴影）","禁止使用衬线或无衬线字体（font-serif, font-sans）","禁止使用毛玻璃效果（backdrop-blur）","禁止使用粉色、自然色系等非CMY色彩"],components:{button:{name:"按钮",description:"故障风格按钮，带RGB通道分离阴影",code:`<button className="
  px-6 py-3
  bg-[#00ffff] text-[#0a0a0a]
  font-mono font-bold uppercase tracking-widest
  rounded-none
  border border-[#00ffff]/30
  shadow-[3px_0_#ff00ff,-3px_0_#ffff00]
  hover:shadow-[6px_0_#ff00ff,-6px_0_#ffff00]
  transition-all duration-100
">
  EXECUTE_
</button>`},card:{name:"卡片",description:"数据损坏面板，带位移带边框",code:`<div className="
  p-6
  bg-[#0a0a0a]
  border-l-2 border-[#00ffff]/40
  rounded-none
  relative overflow-hidden
">
  <h3 className="text-lg font-mono font-bold text-[#00ffff] uppercase mb-2">
    SIGNAL
  </h3>
  <p className="text-[#ffffff]/25 font-mono text-sm">
    Data stream intercepted and decoded from corrupted channel
  </p>
  <div className="mt-4 pt-3 border-t border-[#00ffff]/10">
    <span className="font-mono text-xs text-[#00ffff]/30">SECTOR_0x7A // ACTIVE</span>
  </div>
</div>`},input:{name:"输入框",description:"终端风格输入框，带RGB分离焦点光晕",code:`<input
  type="text"
  placeholder="ENTER_DATA..."
  className="
    w-full px-4 py-3
    bg-[#0a0a0a]
    border border-[#00ffff]/30
    rounded-none
    text-[#00ffff] placeholder-[#00ffff]/20
    font-mono
    focus:border-[#00ffff]
    focus:shadow-[0_0_10px_#00ffff30,3px_0_#ff00ff20,-3px_0_#ffff0020]
    focus:outline-none
    transition-all duration-100
  "
/>`},hero:{name:"Hero 区块",description:"故障风格 Hero，带RGB通道分离标题",code:`<section className="
  min-h-screen
  flex flex-col items-center justify-center
  bg-[#0a0a0a]
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <div className="relative mb-6">
      <span className="block text-6xl md:text-9xl font-mono font-black text-[#ffff00] uppercase absolute top-[-3px] left-[-5px] opacity-30" aria-hidden="true">GLITCH</span>
      <span className="block text-6xl md:text-9xl font-mono font-black text-[#ff00ff] uppercase absolute top-[3px] left-[5px] opacity-50" aria-hidden="true">GLITCH</span>
      <h1 className="block text-6xl md:text-9xl font-mono font-black text-[#00ffff] uppercase relative">GLITCH</h1>
    </div>
    <p className="text-sm text-[#ffffff]/20 font-mono uppercase tracking-[0.5em] mb-12">
      ERROR_404: Reality not found
    </p>
  </div>
</section>`}},globalCss:`/* Glitch Art Global Styles */

:root {
  --glitch-cyan: #00ffff;
  --glitch-magenta: #ff00ff;
  --glitch-yellow: #ffff00;
  --glitch-black: #0a0a0a;
  --glitch-white: #ffffff;
}

/* Scan line overlay */
.glitch-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 255, 0.03) 2px,
    rgba(0, 255, 255, 0.03) 4px
  );
  pointer-events: none;
}

/* RGB split text effect using data-text attribute */
.glitch-rgb {
  position: relative;
}
.glitch-rgb::before {
  content: attr(data-text);
  position: absolute;
  top: 3px;
  left: 5px;
  color: var(--glitch-magenta);
  opacity: 0.5;
  clip-path: inset(0 0 50% 0);
}
.glitch-rgb::after {
  content: attr(data-text);
  position: absolute;
  top: -3px;
  left: -5px;
  color: var(--glitch-yellow);
  opacity: 0.3;
  clip-path: inset(50% 0 0 0);
}

/* Horizontal displacement band */
.glitch-displace {
  position: relative;
}
.glitch-displace::after {
  content: "";
  position: absolute;
  left: -10px;
  right: -10px;
  top: 50%;
  height: 3px;
  background: var(--glitch-magenta);
  opacity: 0.2;
  transform: translateY(-50%);
  pointer-events: none;
}

/* VHS tracking error */
.glitch-vhs::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 20%, rgba(0, 255, 255, 0.08) 40%, rgba(255, 0, 255, 0.06) 60%, transparent 80%);
  pointer-events: none;
}

/* Noise texture */
.glitch-noise::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  pointer-events: none;
}`,aiRules:`You are a Glitch Art design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Any rounded corners (rounded-lg, rounded-xl, rounded-full) -- use rounded-none only
- Standard soft shadows (shadow-sm, shadow-md) -- use RGB split shadows only
- Sans-serif or serif fonts -- use font-mono exclusively
- Frosted glass / backdrop-blur effects
- Pastel colors, warm tones, or natural earth colors
- Smooth gradients for backgrounds

## Must Follow

- Primary palette: cyan #00ffff, magenta #ff00ff, yellow #ffff00 on black #0a0a0a
- RGB channel split shadows: shadow-[3px_0_#ff00ff,-3px_0_#ffff00]
- Monospace fonts: font-mono font-bold uppercase tracking-widest
- Sharp edges: rounded-none on all elements
- Scan line overlay: repeating-linear-gradient for CRT effect
- Left-border accent on cards: border-l-2 border-[color]/40
- Fast transitions: duration-100 (not 300ms)

## Color Palette

Primary:
- Cyan: #00ffff (main accent, text, links)
- Magenta: #ff00ff (secondary, labels, errors)
- Yellow: #ffff00 (tertiary, warnings, highlights)
- Black: #0a0a0a (all backgrounds)
- White: #ffffff (at low opacity for muted text)

## Unique Elements

- RGB channel separation on title text (3 offset layers: cyan front, magenta +3px/+5px, yellow -3px/-5px)
- Horizontal displacement bands (full-width colored bars crossing elements)
- VHS tracking error lines (thin horizontal lines spanning full viewport width)
- Data corruption blocks (scattered semi-transparent colored rectangles)
- Signal monitor panels with hex readouts and progress bars
- Scan line texture overlay on cards and interactive areas`,examplePrompts:[{title:"故障艺术着陆页",titleEn:"Glitch Art Landing Page",description:"数字故障风格的着陆页，带RGB分离标题和数据损坏面板",descriptionEn:"Digital glitch landing page with RGB split title and data corruption panels",prompt:`Use Glitch Art style to create a cyberpunk terminal landing page:
1. Background: pure black with scan line overlay and VHS tracking error lines
2. Title: large mono font with 3-layer RGB channel split (cyan/magenta/yellow offsets)
3. Cards: dark panels with left border accent and displacement band top borders
4. Only use cyan, magenta, yellow on black -- no other colors
5. Include signal monitor panel with hex readouts and progress bars
6. All elements use sharp corners (rounded-none) and RGB split shadows`}]},{slug:"visual-novel",name:"视觉小说风",nameEn:"Visual Novel",description:"借鉴ADV视觉小说游戏UI的设计风格，半透明对话框面板、角色铭牌徽章、装饰性边角框线、分支选项按钮和存档界面，打造沉浸式交互故事体验。",cover:"/styles/visual-novel.svg",styleType:"visual",tags:["modern","expressive"],category:"modern",colors:{primary:"#4a5568",secondary:"#f7fafc",accent:["#6366f1","#ec4899","#10b981"]},keywords:["视觉小说","ADV对话框","铭牌","立绘","选项","游戏UI","交互故事","装饰边角"],philosophy:`Visual Novel 风格源于日本ADV（Adventure）视觉小说游戏的UI设计，强调叙事沉浸感和角色互动。

核心理念：
- ADV对话框系统：底部固定半透明暗色面板，承载角色对话文字
- 角色铭牌徽章：对话框上方的彩色小标签，标识说话角色
- 装饰性边角框线：对话面板四角的L形装饰线条，营造精致画框感
- 分支选项按钮：居中排列的毛玻璃按钮，代表故事分支
- 场景氛围渲染：通过天空渐变、剪影、柔光营造时间和情感氛围
- 存档界面设计：带装饰边角的暗色面板，包含输入框和操作按钮`,doList:["使用半透明暗色面板 bg-[#1a202c]/85 作为对话框","使用半透明亮色面板 bg-white/70 作为信息卡片","所有面板添加毛玻璃效果 backdrop-blur-md","使用衬线字体 font-serif 用于叙事/对话文本","使用无衬线字体 font-sans 用于UI标签和按钮","添加角色铭牌徽章（彩色小标签 inline-block px-3 py-0.5 bg-[color] rounded-sm）","对话面板添加L形装饰边角（border-l/t/r/b 组合）","使用圆角 rounded-lg 保持柔和界面感"],dontList:["禁止使用粗重的野蛮主义边框（border-4+）","禁止使用霓虹灯 RGB 分离阴影效果","禁止使用像素艺术风格或等宽字体用于主内容","禁止使用纯黑背景 bg-black","禁止使用全大写加宽字距的终端风格文字","禁止使用直角 rounded-none（除铭牌 rounded-sm 外）"],components:{button:{name:"按钮",description:"视觉小说选项按钮，毛玻璃分支选择",code:`<button className="
  w-full px-6 py-4
  bg-white/50 backdrop-blur-sm
  text-[#4a5568] font-sans
  rounded-lg
  border border-[#6366f1]/25
  text-left
  hover:bg-[#6366f1]/10
  hover:border-[#6366f1]/40
  transition-all duration-300
  flex items-center justify-between group
">
  <span>Go to the rooftop to watch the sunset</span>
  <svg className="w-4 h-4 text-[#6366f1]/30 group-hover:text-[#6366f1]/60 group-hover:translate-x-1 transition-all" />
</button>`},card:{name:"卡片",description:"ADV对话面板，带铭牌和装饰边角",code:`<div className="relative">
  <!-- Character nameplate badge -->
  <div className="absolute -top-3 left-6 inline-block px-4 py-1 bg-[#6366f1] rounded-sm z-10">
    <span className="text-white text-xs font-sans font-semibold">Sakura</span>
  </div>
  <div className="bg-[#1a202c]/85 backdrop-blur-md rounded-lg p-6 pt-8 border border-[#6366f1]/20 relative">
    <!-- Ornate corner decorations -->
    <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-[#6366f1]/30" />
    <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-[#6366f1]/30" />
    <p className="text-white/85 font-serif text-base leading-relaxed">
      "The cherry blossoms are beautiful this time of year..."
    </p>
  </div>
</div>`},input:{name:"输入框",description:"存档界面输入框，暗色毛玻璃风格",code:`<input
  type="text"
  placeholder="Enter your name..."
  className="
    w-full px-4 py-3
    bg-white/[0.06]
    border border-[#6366f1]/20
    rounded-lg
    text-white placeholder-white/25
    font-sans
    backdrop-blur-sm
    focus:border-[#6366f1]/50
    focus:shadow-[0_0_12px_#6366f120]
    focus:outline-none
    transition-all duration-300
  "
/>`},hero:{name:"Hero 区块",description:"ADV场景Hero，带天空渐变、角色剪影和底部对话面板",code:`<section className="min-h-[85vh] flex flex-col relative">
  <!-- Scene background with sky gradient -->
  <div className="flex-1 relative flex items-center justify-center px-6 pt-12"
    style={{ background: "linear-gradient(180deg, #4a6fa5 0%, #7b9cc7 40%, #c4a882 70%, #e8c19a 100%)" }}>
    <!-- Character silhouettes -->
    <div className="absolute bottom-0 left-[15%] w-40 h-72 bg-[#2d3748]/10 rounded-t-full" />
    <div className="absolute bottom-0 right-[18%] w-36 h-64 bg-[#2d3748]/[0.06] rounded-t-full" />
    <!-- Title floating in sky -->
    <div className="text-center relative z-10">
      <h1 className="text-5xl md:text-7xl font-serif text-white/90 drop-shadow-sm">Visual Novel</h1>
      <p className="text-white/50 font-sans text-sm tracking-[0.3em] uppercase">Interactive Storytelling</p>
    </div>
  </div>
  <!-- ADV dialogue panel at bottom -->
  <div className="bg-[#1a202c]/90 backdrop-blur-md border-t border-[#6366f1]/20 px-6 py-6 relative">
    <!-- Ornate corner decorations -->
    <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-[#6366f1]/40" />
    <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-[#6366f1]/40" />
    <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-[#6366f1]/40" />
    <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-[#6366f1]/40" />
    <div className="max-w-4xl mx-auto">
      <div className="inline-block px-4 py-1 bg-[#6366f1] rounded-sm mb-3">
        <span className="text-white text-sm font-sans font-semibold">Narrator</span>
      </div>
      <p className="text-white/85 font-serif text-lg leading-relaxed">
        "The story begins on a quiet spring morning..."
      </p>
    </div>
  </div>
</section>`}},globalCss:`/* Visual Novel Global Styles */

:root {
  --vn-slate: #4a5568;
  --vn-light: #f7fafc;
  --vn-indigo: #6366f1;
  --vn-pink: #ec4899;
  --vn-emerald: #10b981;
  --vn-dark: #1a202c;
}

/* Dialog box fade-in */
.vn-dialog {
  animation: vnFadeUp 0.5s ease-out;
}
@keyframes vnFadeUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Text typewriter effect */
.vn-typewriter {
  overflow: hidden;
  border-right: 2px solid var(--vn-indigo);
  white-space: nowrap;
  animation: vnType 3s steps(40, end), vnBlink 0.75s step-end infinite;
}
@keyframes vnType {
  from { width: 0; }
  to { width: 100%; }
}
@keyframes vnBlink {
  from, to { border-color: transparent; }
  50% { border-color: var(--vn-indigo); }
}

/* Ornate corner decoration frame */
.vn-ornate-frame {
  position: relative;
}
.vn-ornate-frame::before,
.vn-ornate-frame::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  pointer-events: none;
}
.vn-ornate-frame::before {
  top: 8px;
  left: 8px;
  border-left: 2px solid rgba(99, 102, 241, 0.4);
  border-top: 2px solid rgba(99, 102, 241, 0.4);
}
.vn-ornate-frame::after {
  top: 8px;
  right: 8px;
  border-right: 2px solid rgba(99, 102, 241, 0.4);
  border-top: 2px solid rgba(99, 102, 241, 0.4);
}

/* Character nameplate badge */
.vn-nameplate {
  display: inline-block;
  padding: 2px 12px;
  border-radius: 2px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

/* Choice button hover glow */
.vn-choice:hover {
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.15);
}

/* Scene gradient overlay */
.vn-scene-sunset {
  background: linear-gradient(180deg, #4a6fa5 0%, #7b9cc7 40%, #c4a882 70%, #e8c19a 100%);
}`,aiRules:`You are a Visual Novel design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Heavy brutalist borders (border-4+)
- Neon glow or RGB split shadow effects
- Pixel art style elements
- Harsh, highly saturated neon colors
- Monospace fonts for main content
- Pure black backgrounds
- Sharp edges without rounding (rounded-none)
- Terminal-style uppercase with tracking-widest

## Must Follow

- Dark dialog panels: bg-[#1a202c]/85 with backdrop-blur-md
- Light info panels: bg-white/70 with backdrop-blur-md
- Serif font for all narrative/dialog text (font-serif)
- Sans-serif font for UI elements (font-sans font-medium)
- Rounded corners: rounded-lg on all panels and buttons
- Soft shadows: shadow-sm, shadow-md
- Ornate L-shaped corner decorations on dialog panels
- Character nameplate badges: colored inline-block with rounded-sm

## Color Palette

Primary:
- Slate: #4a5568 (text, borders)
- Light BG: #f7fafc (page background)
- Dark Panel: #1a202c (dialog backgrounds at /85 or /90 opacity)
- Indigo: #6366f1 (primary accent, nameplates, borders)
- Pink: #ec4899 (secondary accent, alternate nameplates)
- Emerald: #10b981 (tertiary accent, alternate nameplates)

## Unique Elements

- ADV-format dialogue panel: dark semi-transparent panel fixed to bottom with ornate corner decorations and character nameplate
- Character nameplate badges: small colored rectangle positioned overlapping the card border (absolute -top-3 left-6)
- Ornate corner decorations: L-shaped border patterns (border-l + border-t) at panel corners
- Choice button grid: full-width frosted glass buttons with ChevronRight icon and left-aligned text
- Scene background: sky gradient with character silhouettes (rounded-t-full ellipse shapes)
- Save screen panel: dark panel with ornate corners, form inputs, and dual action buttons`,examplePrompts:[{title:"视觉小说对话页面",titleEn:"Visual Novel Dialog Page",description:"ADV格式的交互对话页面，带铭牌和装饰边角",descriptionEn:"ADV-format interactive dialog page with nameplate badges and ornate corners",prompt:`Use Visual Novel style to create an interactive story page:
1. Scene: full-screen sky gradient with character silhouettes at bottom
2. ADV dialog panel: semi-transparent dark panel at bottom with ornate L-shaped corner decorations
3. Character nameplate: colored badge above the dialog box text
4. Choice buttons: full-width frosted glass panels with hover glow and right arrow
5. Cards: scene chapter cards with header image area and nameplate badge overlapping the border
6. Form: save screen with ornate corner frame, dark backdrop, and dual-color labeled inputs`}]},{slug:"shoujo-manga",name:"少女漫画风",nameEn:"Shoujo Manga",description:"少女漫画特有的浪漫美学，网点纹理背景、花朵框线装饰、缎带横幅标题、多角星闪光效果、蕾丝边框和爱心元素，以粉色主色调呈现梦幻柔美的视觉体验。",cover:"/styles/shoujo-manga.svg",styleType:"visual",tags:["expressive","retro"],category:"expressive",colors:{primary:"#ffb7c5",secondary:"#fff5f7",accent:["#c4b5fd","#fde68a","#fecdd3"]},keywords:["少女漫画","樱花","网点","花框","缎带","闪光","蕾丝","爱心","浪漫"],philosophy:`Shoujo Manga 风格源于日本少女漫画的经典视觉语言，以浪漫、梦幻、柔美为核心。

核心理念：
- 网点纹理：screentone dot pattern 作为面板和区域背景的标志性装饰
- 花朵框线：五瓣花作为面板边角装饰，营造画框感
- 缎带横幅：ribbon banner 作为章节标题和分割线
- 多角闪光：4/6/8-point sparkle star 星光效果，用金色呈现梦幻感
- 蕾丝边框：scalloped lace border 作为卡片顶部/底部装饰
- 漫画分格：asymmetric manga panel grid 模拟漫画页面排版
- 樱花飘落：cherry blossom petal 作为散点装饰元素`,doList:["使用粉色系作为主色调（樱花粉 #ffb7c5）","添加网点纹理背景 screentone（radial-gradient 实现圆点图案）","使用花朵图标 Flower2 作为面板边角装饰","使用缎带横幅（ribbon banner with clip-path tails）作为章节标题","添加多角星闪光效果（金色 #fde68a 圆点带 glow shadow）","使用蕾丝 scallop 边框（radial-gradient 实现波浪边缘）","使用圆角设计（rounded-full 按钮, rounded-2xl 卡片, rounded-3xl 面板）","保持浅色背景（珍珠白 #fff5f7, 白色 #ffffff）","使用漫画分格的不对称网格排版（grid-cols-12 span 混合）"],dontList:["禁止使用深色或暗色调背景","禁止使用尖角或锐利边角（rounded-none, rounded-sm）","禁止使用野蛮主义风格的粗边框","禁止使用等宽字体 font-mono","禁止使用强烈的硬阴影或 RGB 分离阴影","禁止使用纯黑背景或深灰背景"],components:{button:{name:"按钮",description:"少女漫画风格药丸按钮，带粉色光晕阴影",code:`<button className="
  px-7 py-3
  bg-[#ffb7c5] text-white
  font-sans font-medium
  rounded-full
  shadow-[0_4px_15px_#ffb7c560]
  hover:scale-105
  hover:shadow-[0_6px_20px_#ffb7c580]
  transition-all duration-300
">
  Sakura
</button>`},card:{name:"卡片",description:"漫画面板卡片，带网点纹理和花朵边角装饰",code:`<div className="
  relative overflow-hidden
  p-8
  bg-[#fff5f7]
  border-2 border-[#ffb7c5]/20
  rounded-2xl
  shadow-[0_4px_20px_#ffb7c520]
">
  <!-- Screentone dot pattern background -->
  <div className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: "radial-gradient(circle, #ffb7c5 0.6px, transparent 0.6px)",
      backgroundSize: "10px 10px",
      opacity: 0.06,
    }}
  />
  <div className="relative z-10">
    <h3 className="text-xl font-sans font-bold text-[#ffb7c5] mb-3">
      Sakura Card
    </h3>
    <p className="text-[#4a5568]/50 font-sans leading-relaxed">
      A gentle breeze carries cherry blossoms...
    </p>
  </div>
</div>`},input:{name:"输入框",description:"少女漫画风格药丸输入框，带粉色焦点光晕",code:`<input
  type="text"
  placeholder="Your name..."
  className="
    w-full px-5 py-3
    bg-[#fff5f7]
    border border-[#ffb7c5]/25
    rounded-full
    text-[#4a5568] placeholder-[#ffb7c5]/40
    font-sans
    focus:border-[#ffb7c5]
    focus:shadow-[0_0_12px_#ffb7c540]
    focus:outline-none
    transition-all
  "
/>`},hero:{name:"Hero 区块",description:"漫画风格 Hero，带花朵边角、网点背景和缎带横幅",code:`<section className="relative pt-16 pb-20 px-6">
  <div className="max-w-4xl mx-auto relative">
    <!-- Flower corner decorations (Lucide Flower2 icons) -->
    <div className="absolute -top-4 -left-4">
      <Flower2 className="w-8 h-8 text-[#ffb7c5]/40" />
    </div>
    <div className="absolute -top-4 -right-4">
      <Flower2 className="w-8 h-8 text-[#c4b5fd]/40" />
    </div>

    <!-- Panel with screentone -->
    <div className="relative border-2 border-[#ffb7c5]/20 rounded-3xl overflow-hidden bg-white/80 p-12 text-center">
      <!-- Screentone overlay -->
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffb7c5 0.6px, transparent 0.6px)",
          backgroundSize: "10px 10px",
          opacity: 0.08,
        }}
      />
      <div className="relative z-10">
        <h1 className="text-6xl md:text-8xl font-sans font-bold text-[#ffb7c5] mb-2">Shoujo</h1>
        <h2 className="text-4xl md:text-6xl font-sans font-bold text-[#c4b5fd] mb-6">Manga</h2>
        <p className="text-[#4a5568]/40 font-sans text-sm tracking-[0.3em] uppercase mb-10">
          Romantic Dream Aesthetic
        </p>
      </div>
    </div>
  </div>
</section>`}},globalCss:`/* Shoujo Manga Global Styles */

:root {
  --shoujo-pink: #ffb7c5;
  --shoujo-pearl: #fff5f7;
  --shoujo-lavender: #c4b5fd;
  --shoujo-gold: #fde68a;
  --shoujo-rose: #fecdd3;
}

/* Screentone dot pattern overlay */
.shoujo-screentone::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, var(--shoujo-pink) 0.6px, transparent 0.6px);
  background-size: 10px 10px;
  opacity: 0.06;
  pointer-events: none;
}

/* Floating petals animation */
.shoujo-petals::before,
.shoujo-petals::after {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--shoujo-pink);
  border-radius: 50% 0 50% 50%;
  opacity: 0.3;
  animation: shoujoFloat 6s ease-in-out infinite;
}
.shoujo-petals::after {
  width: 8px;
  height: 8px;
  animation-delay: -3s;
  animation-duration: 8s;
}
@keyframes shoujoFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

/* Sparkle star glow */
.shoujo-sparkle {
  position: relative;
}
.shoujo-sparkle::after {
  content: "";
  position: absolute;
  top: -4px;
  right: -4px;
  width: 8px;
  height: 8px;
  background: var(--shoujo-gold);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--shoujo-gold);
  animation: shoujoSparkle 2s ease-in-out infinite;
}
@keyframes shoujoSparkle {
  0%, 100% { opacity: 0.4; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* Ribbon banner with clip-path tails */
.shoujo-ribbon {
  position: relative;
  display: inline-block;
  padding: 4px 40px;
  background: rgba(255, 183, 197, 0.15);
  border-radius: 2px;
}
.shoujo-ribbon::before,
.shoujo-ribbon::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 12px;
}
.shoujo-ribbon::before {
  left: -12px;
  background: rgba(255, 183, 197, 0.1);
  clip-path: polygon(100% 0, 100% 100%, 0 50%);
}
.shoujo-ribbon::after {
  right: -12px;
  background: rgba(255, 183, 197, 0.1);
  clip-path: polygon(0 0, 0 100%, 100% 50%);
}

/* Lace scallop border */
.shoujo-lace {
  position: relative;
}
.shoujo-lace::before {
  content: "";
  position: absolute;
  top: -4px;
  left: 16px;
  right: 16px;
  height: 8px;
  background-image: radial-gradient(circle at 50% 100%, white 6px, transparent 6px),
    radial-gradient(circle at 50% 100%, var(--shoujo-pink) 7px, transparent 7px);
  background-size: 16px 8px;
  opacity: 0.3;
}

/* Soft glow */
.shoujo-glow {
  box-shadow: 0 0 20px rgba(255, 183, 197, 0.3);
}`,aiRules:`You are a Shoujo Manga design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Dark colors or dark backgrounds (bg-black, bg-gray-900, bg-slate-900)
- Sharp corners (rounded-sm, rounded-none)
- Brutalist style elements (thick borders border-4+, hard offset shadows)
- Monospace fonts (font-mono)
- RGB split shadows or neon glow effects
- CMY color scheme (cyan, magenta, yellow on black)

## Must Follow

- Pink-dominant palette: sakura pink #ffb7c5, pearl white #fff5f7
- Fully rounded elements: rounded-full (buttons), rounded-2xl (cards), rounded-3xl (panels)
- Soft sans-serif fonts: font-sans font-bold for headings, font-sans for body
- Gentle colored shadows: shadow-[0_4px_15px_color/opacity]
- Light backgrounds: bg-[#fff5f7] or bg-white/80
- Border width: border-2 for panels, border for inputs

## Color Palette

Primary:
- Sakura Pink: #ffb7c5 (main accent, buttons, borders)
- Pearl White: #fff5f7 (card backgrounds)
- Lavender Purple: #c4b5fd (secondary accent)
- Gold Sparkle: #fde68a (sparkle effects, decorative)
- Rose: #fecdd3 (tertiary, subtle accents)

## Unique Elements

- Screentone dot pattern: radial-gradient(circle, #ffb7c5 0.6px, transparent 0.6px) with 10px spacing at ~6% opacity
- Flower frame corners: Lucide Flower2 icons positioned at absolute corners of panels
- Ribbon banner titles: clip-path polygon tails with soft pink background for section headers
- Sparkle stars: gold #fde68a dots with glow shadow (shadow-[0_0_8px_#fde68a])
- Lace scallop borders: radial-gradient wave pattern at top/bottom of form cards
- Manga panel grid: asymmetric grid-cols-12 layout with col-span mixing for panel arrangement
- Cherry blossom petals: rotated rounded-[50%_0_50%_50%] divs as floating decorations`,examplePrompts:[{title:"少女漫画角色页",titleEn:"Shoujo Manga Character Page",description:"带网点纹理、花朵框线和缎带标题的浪漫风格页面",descriptionEn:"Romantic page with screentone texture, flower frame borders, and ribbon banner titles",prompt:`Use Shoujo Manga style to create a character profile page:
1. Background: soft pink-to-white gradient with screentone dot pattern overlay
2. Hero: manga panel frame with flower (Flower2) icons at corners and screentone bg
3. Section titles: ribbon banners with clip-path pointed tails
4. Cards: manga panel grid with asymmetric layout (grid-cols-12), screentone backgrounds
5. Form: love letter diary with lace scallop border at top and bottom
6. Decorations: scattered cherry blossom petals and gold sparkle star dots throughout
7. Buttons: pill-shaped (rounded-full) with pink glow shadows`}]},{slug:"cyber-anime",name:"赛博动漫风",nameEn:"Cyber Anime",description:"融合赛博朋克科幻UI与动漫美学，以HUD抬头显示、全息投影面板、机甲边框和多层霓虹光效，打造未来感十足的动漫界面风格。",cover:"/styles/cyber-anime.svg",styleType:"visual",tags:["expressive","modern","high-contrast"],category:"expressive",colors:{primary:"#7c3aed",secondary:"#0f0f1a",accent:["#06d6a0","#ff006e","#38bdf8"]},keywords:["赛博动漫","HUD","全息","霓虹","机甲","神经数据流"],philosophy:`Cyber Anime fuses cyberpunk HUD interfaces with anime's expressive power. Every panel is a data terminal, every border a mecha frame.

Core principles:
- HUD Overlay: Corner frame decorations, targeting brackets, and data readout overlays create the feel of piloting a mecha cockpit
- Holographic Panels: Vertical scan line textures layered over glassmorphic surfaces simulate flickering holographic displays
- Mecha Borders: Angled clip-path corners on panels reference mechanical armor plating and cockpit instrument frames
- Multi-layer Neon: Purple, cyan, and pink neon glows stack in multiple layers for depth - never a single flat glow
- Neural Data Streams: Monospace text readouts, status indicators, and data visualization patterns fill negative space
- Hexagonal Grid: The background grid uses hexagons, not squares, referencing sci-fi energy field patterns`,doList:["Use HUD corner frame decorations on major containers (angled bracket corners)","Layer vertical scan line overlays on holographic panels","Apply multi-layer neon glow (2-3 shadow layers with decreasing opacity)","Use mecha-style angled corners via clip-path on panel borders","Include terminal/data readout style text with monospace font","Use hexagonal grid background pattern instead of square grid","Keep all backgrounds dark (#0f0f1a) with semi-transparent overlays"],dontList:["Never use soft pastel colors or natural organic tones","Never use serif fonts - only geometric sans-serif or monospace","Never use rounded-full - all shapes must be angular/geometric","Never use light or white backgrounds as primary surfaces","Never use standard shadow-sm/md/lg - only neon glow shadows"],components:{button:{name:"Holographic Button",description:"Button with vertical scan line texture and multi-layer neon glow, styled like a cockpit control",code:`<button className="
  relative px-6 py-3 overflow-hidden
  bg-[#7c3aed] text-white
  font-sans font-bold uppercase tracking-widest
  border border-[#06d6a0]/50
  shadow-[0_0_10px_rgba(124,58,237,0.3),0_0_20px_rgba(124,58,237,0.15)]
  hover:shadow-[0_0_15px_rgba(124,58,237,0.5),0_0_30px_rgba(124,58,237,0.25)]
  hover:border-[#06d6a0]
  transition-all duration-300
">
  <span className="relative z-10">EXECUTE</span>
  <div className="absolute inset-0 opacity-10" style={{
    backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 3px)"
  }} />
</button>`},card:{name:"HUD Panel",description:"Card with angled mecha-frame corners, scan line overlay, and data readout header",code:`<div className="
  relative p-6 overflow-hidden
  bg-[#0f0f1a]/90
  border border-[#7c3aed]/30
  backdrop-blur-sm
  shadow-[0_0_20px_rgba(124,58,237,0.2)]
  hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]
  hover:border-[#7c3aed]/60
  transition-all duration-300
" style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))" }}>
  <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-[#06d6a0]/60" />
  <div className="absolute top-0 right-4 w-4 h-4 border-r border-t border-[#06d6a0]/60" />
  <h3 className="text-xl font-bold text-[#06d6a0] uppercase tracking-wider mb-2">
    DATA PANEL
  </h3>
  <p className="text-[#e0e0ff]/60 text-sm font-mono">
    System status nominal
  </p>
</div>`},input:{name:"Terminal Input",description:"Terminal-style input with blinking cursor effect and HUD-framed container",code:`<div className="relative">
  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#06d6a0] font-mono text-sm">&gt;</span>
  <input
    type="text"
    placeholder="Enter command..."
    className="
      w-full pl-8 pr-4 py-3
      bg-[#0f0f1a]/80
      border border-[#7c3aed]/30
      text-[#e0e0ff] placeholder-[#e0e0ff]/30
      font-mono
      focus:border-[#06d6a0]
      focus:shadow-[0_0_15px_rgba(6,214,160,0.3)]
      focus:outline-none
      transition-all duration-300
      caret-[#06d6a0]
    "
  />
</div>`},hero:{name:"HUD Hero",description:"Full-screen hero with hexagonal grid background, HUD frame corners, and holographic title",code:`<section className="
  min-h-screen relative overflow-hidden
  flex items-center justify-center
  bg-[#0f0f1a]
">
  <div className="absolute inset-0" style={{
    backgroundImage: "url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52'%3E%3Cpath d='M30 0 L60 15 L60 37 L30 52 L0 37 L0 15 Z' fill='none' stroke='%237c3aed' stroke-width='0.4' opacity='0.08'/%3E%3C/svg%3E")"
  }} />
  <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-[#06d6a0]/50" />
  <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-[#06d6a0]/50" />
  <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-[#06d6a0]/50" />
  <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-[#06d6a0]/50" />
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-bold text-[#7c3aed] uppercase tracking-wider mb-4 [text-shadow:0_0_40px_rgba(124,58,237,0.4),0_0_80px_rgba(124,58,237,0.15)]">
      CYBER ANIME
    </h1>
    <p className="text-lg text-[#e0e0ff]/50 font-mono mb-8">
      HUD // HOLOGRAPHIC // MECHA
    </p>
  </div>
</section>`}},globalCss:`/* Cyber Anime Global Styles */

:root {
  --ca-purple: #7c3aed;
  --ca-dark: #0f0f1a;
  --ca-cyan: #06d6a0;
  --ca-pink: #ff006e;
  --ca-blue: #38bdf8;
  --ca-text: #e0e0ff;
}

/* Multi-layer neon glow */
.ca-glow {
  box-shadow: 0 0 10px rgba(124, 58, 237, 0.3),
              0 0 20px rgba(124, 58, 237, 0.15),
              0 0 40px rgba(124, 58, 237, 0.05);
}

/* Vertical scan line overlay */
.ca-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.02) 2px,
    rgba(255, 255, 255, 0.02) 3px
  );
  pointer-events: none;
}

/* Holographic shimmer */
.ca-holo {
  background: linear-gradient(
    135deg,
    rgba(124, 58, 237, 0.1),
    rgba(6, 214, 160, 0.1),
    rgba(56, 189, 248, 0.1)
  );
}

/* Hexagonal grid background */
.ca-hex-grid {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52'%3E%3Cpath d='M30 0 L60 15 L60 37 L30 52 L0 37 L0 15 Z' fill='none' stroke='%237c3aed' stroke-width='0.4' opacity='0.08'/%3E%3C/svg%3E");
}

/* HUD corner frame */
.ca-hud-frame {
  position: relative;
}
.ca-hud-frame::before,
.ca-hud-frame::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border-color: rgba(6, 214, 160, 0.5);
}
.ca-hud-frame::before {
  top: 0; left: 0;
  border-left: 2px solid;
  border-top: 2px solid;
}
.ca-hud-frame::after {
  bottom: 0; right: 0;
  border-right: 2px solid;
  border-bottom: 2px solid;
}

/* Mecha angled corners */
.ca-mecha-clip {
  clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
}`,aiRules:`You are a Cyber Anime design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Soft pastel colors (no light pink, baby blue, etc.)
- Serif fonts of any kind
- Natural organic colors (brown, beige, olive, etc.)
- rounded-full on buttons or containers
- White or light backgrounds as primary surfaces
- Standard shadow-sm/md/lg (only neon glow shadows)

## Must Follow

- Dark background: bg-[#0f0f1a] as primary surface
- Primary purple: #7c3aed for key elements with multi-layer glow
- Cyan-green accent: #06d6a0 for highlights, borders, and HUD frames
- Hot pink accent: #ff006e for alerts and emphasis
- HUD corner frame decorations on major containers
- Vertical scan line overlay on holographic panels
- Mecha-style angled corners via clip-path on cards and panels
- Monospace terminal text for data readouts
- Hexagonal grid background pattern
- Multi-layer neon glow: shadow-[0_0_Xpx_rgba(...),0_0_Ypx_rgba(...)]

## Color Palette

Primary:
- Deep Purple: #7c3aed
- Dark Background: #0f0f1a
- Cyan-Green: #06d6a0
- Hot Pink: #ff006e
- Sky Blue: #38bdf8
- Light Text: #e0e0ff

## Unique Elements

- HUD corner frame decorations (bracket-style corners)
- Holographic vertical scan line texture overlays
- Mecha-style angular clip-path panel borders
- Neural network data visualization patterns
- Terminal-style data readout text blocks`,examplePrompts:[{title:"HUD仪表盘",titleEn:"HUD Dashboard",description:"机甲座舱风格数据仪表盘",descriptionEn:"Mecha cockpit-style data dashboard with HUD overlays",prompt:`Use Cyber Anime style to create a mecha cockpit dashboard:
1. Background: dark (#0f0f1a) with hexagonal grid pattern
2. Cards: HUD-framed panels with angled mecha corners and scan line overlays
3. Holographic glow effects with multi-layer purple/cyan neon
4. Terminal-style data readouts with monospace font
5. HUD corner decorations on the main viewport frame`}]},{slug:"pixel-anime",name:"像素动漫风",nameEn:"Pixel Anime",description:"将经典JRPG游戏UI与像素动漫美学融合，以RPG对话框、状态条、像素边框和NES色板打造怀旧8-bit游戏界面风格。",cover:"/styles/pixel-anime.svg",styleType:"visual",tags:["retro","expressive"],category:"retro",colors:{primary:"#4a90d9",secondary:"#2d1b69",accent:["#ff6b6b","#ffd93d","#50c878"]},keywords:["像素动漫","JRPG","8-bit","RPG对话框","像素","NES色板"],philosophy:`Pixel Anime merges classic JRPG game UI with pixel-art anime aesthetics. Every element feels like it belongs in a 16-bit RPG menu screen.

Core principles:
- RPG Dialogue Boxes: Window frames with chunky borders and corner block decorations, referencing Final Fantasy and Dragon Quest menu systems
- Health/Status Bars: HP, MP, and EXP progress bars with pixel-precise flat fills and bordered containers
- Pixel Borders: All borders are 2px+ solid with hard edges, using image-rendering: pixelated where applicable
- NES/SNES Palette: Limited color palette of bold primary colors (blue, red, gold, green) on deep purple backgrounds
- Step-based Interactions: Hover states use translate-x/y in pixel-aligned steps, not smooth transforms
- Blinking Cursor: Selection arrows and continue prompts use blinking pixel arrows`,doList:["Use RPG dialogue box frames with 4px borders and corner block decorations","Include HP/MP/EXP status bar UI elements with flat fills","Apply hard offset shadows (4px_4px_0px) for pixel depth","Use monospace font exclusively for all text","Keep interactions step-based (translate-x/y in 2px increments)","Use NES-palette colors: blue #4a90d9, red #ff6b6b, gold #ffd93d, green #50c878","Add pixel corner block decorations on major containers"],dontList:["Never use smooth gradients (linear-gradient, radial-gradient)","Never use rounded corners (rounded-lg/xl/full)","Never use blur effects (blur, backdrop-blur)","Never use serif fonts","Never use soft shadows (shadow-sm/md/lg/xl)"],components:{button:{name:"RPG Menu Button",description:"Button with pixel borders, corner block decorations, and step-based hover translate",code:`<button className="
  relative px-6 py-3
  bg-[#4a90d9] text-white
  font-mono font-bold uppercase tracking-wider
  border-2 border-[#1a1040]
  shadow-[4px_4px_0px_#1a1040]
  hover:translate-x-[2px] hover:translate-y-[2px]
  hover:shadow-[2px_2px_0px_#1a1040]
  active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
  transition-all duration-150 ease-linear
">
  ATTACK
</button>`},card:{name:"RPG Dialogue Box",description:"Card with pixel frame border, inner double-border, and corner block decorations",code:`<div className="relative p-6 bg-[#1a1040] border-2 border-[#4a90d9] shadow-[4px_4px_0px_#1a1040]">
  <div className="absolute -top-[4px] -left-[4px] w-[8px] h-[8px] bg-[#4a90d9]" />
  <div className="absolute -top-[4px] -right-[4px] w-[8px] h-[8px] bg-[#4a90d9]" />
  <div className="absolute -bottom-[4px] -left-[4px] w-[8px] h-[8px] bg-[#4a90d9]" />
  <div className="absolute -bottom-[4px] -right-[4px] w-[8px] h-[8px] bg-[#4a90d9]" />
  <h3 className="text-xl font-mono font-bold text-[#ffd93d] uppercase mb-2">
    QUEST LOG
  </h3>
  <p className="text-[#e0e0ff]/70 font-mono text-sm">
    Adventure awaits!
  </p>
</div>`},input:{name:"Pixel Input",description:"Input with pixel border, blinking cursor effect, and monospace text",code:`<input
  type="text"
  placeholder="ENTER NAME..."
  className="
    w-full px-4 py-3
    bg-[#1a1040]
    border-2 border-[#4a90d9]
    text-[#e0e0ff] placeholder-[#e0e0ff]/40
    font-mono
    focus:border-[#ffd93d]
    focus:shadow-[2px_2px_0px_#4a90d9]
    focus:outline-none
    transition-all duration-150 ease-linear
    caret-[#ffd93d]
  "
/>`},hero:{name:"RPG Title Screen",description:"Title screen hero with pixel grid background, RPG window frame, and selection arrow",code:`<section className="
  min-h-screen relative overflow-hidden
  flex items-center justify-center
  bg-[#2d1b69]
">
  <div className="absolute inset-0" style={{
    backgroundImage: "linear-gradient(rgba(26,16,64,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(26,16,64,0.15) 1px, transparent 1px)",
    backgroundSize: "8px 8px"
  }} />
  <div className="relative z-10 text-center px-6">
    <h1 className="text-5xl md:text-7xl font-mono font-bold text-[#4a90d9] uppercase tracking-wider mb-2">
      PIXEL
    </h1>
    <h2 className="text-4xl md:text-6xl font-mono font-bold text-[#ffd93d] uppercase tracking-wider mb-6">
      ANIME
    </h2>
    <p className="text-lg text-[#e0e0ff]/60 font-mono mb-8">
      JRPG // 8-BIT // NES PALETTE
    </p>
    <button className="px-10 py-4 bg-[#ff6b6b] text-white font-mono font-bold uppercase tracking-wider border-2 border-[#1a1040] shadow-[4px_4px_0px_#1a1040] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1040] transition-all duration-150 ease-linear">
      PRESS START
    </button>
  </div>
</section>`}},globalCss:`/* Pixel Anime Global Styles */

:root {
  --pa-blue: #4a90d9;
  --pa-dark: #2d1b69;
  --pa-deep: #1a1040;
  --pa-red: #ff6b6b;
  --pa-gold: #ffd93d;
  --pa-green: #50c878;
  --pa-text: #e0e0ff;
}

/* RPG dialogue box frame with corner blocks */
.pa-dialog-frame {
  position: relative;
  border: 2px solid var(--pa-blue);
  background: var(--pa-deep);
}
.pa-dialog-frame::before,
.pa-dialog-frame::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--pa-blue);
}
.pa-dialog-frame::before { top: -4px; left: -4px; }
.pa-dialog-frame::after { top: -4px; right: -4px; }

/* Pixel grid overlay */
.pa-pixel-grid::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(26, 16, 64, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 16, 64, 0.12) 1px, transparent 1px);
  background-size: 8px 8px;
  pointer-events: none;
  image-rendering: pixelated;
}

/* HP/MP/EXP status bar */
.pa-status-bar {
  height: 8px;
  border: 2px solid var(--pa-deep);
  background: var(--pa-deep);
}
.pa-status-bar-fill {
  height: 100%;
  image-rendering: pixelated;
}

/* Pixel hard shadow */
.pa-shadow {
  box-shadow: 4px 4px 0px var(--pa-deep);
}

/* Blinking cursor animation */
@keyframes pa-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.pa-blink {
  animation: pa-blink 1s infinite;
}`,aiRules:`You are a Pixel Anime design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Smooth gradients (linear-gradient, radial-gradient for decoration)
- Rounded corners (rounded-lg, rounded-xl, rounded-full)
- Blur effects (blur, backdrop-blur)
- Serif fonts
- Soft shadows (shadow-sm, shadow-md, shadow-lg, shadow-xl)

## Must Follow

- Dark purple background: bg-[#2d1b69] as primary, bg-[#1a1040] as secondary
- RPG dialogue box frames with 2-4px borders and corner block decorations
- HP/MP/EXP status bar UI elements with flat color fills
- Hard offset pixel shadows: shadow-[4px_4px_0px_#1a1040]
- Monospace font: font-mono for ALL text
- Bold 2px borders: border-2 border-[#1a1040]
- Flat colors only, no gradients
- Step-based hover: hover:translate-x-[2px] hover:translate-y-[2px]
- Linear easing: ease-linear, duration-150

## Color Palette (NES-inspired)

Primary:
- Pixel Blue: #4a90d9
- Dark Purple: #2d1b69
- Deep Dark: #1a1040
- Pixel Red: #ff6b6b
- Pixel Gold: #ffd93d
- Pixel Green: #50c878
- Light Text: #e0e0ff

## Unique Elements

- RPG dialogue box frame with corner block decorations
- HP/MP/EXP status bar progress indicators
- Pixel-grid background pattern (8px grid)
- Blinking pixel arrow cursor/continue indicators
- Step-based pixel-aligned hover translations`,examplePrompts:[{title:"JRPG角色面板",titleEn:"JRPG Character Panel",description:"经典RPG风格的角色状态面板",descriptionEn:"Classic RPG-style character status panel with HP/MP bars",prompt:`Use Pixel Anime style to create a JRPG character panel:
1. Background: dark purple with visible pixel grid overlay
2. RPG dialogue box frames with corner block decorations
3. HP/MP/EXP status bars with flat color fills
4. Character stats in monospace font, NES color palette
5. Pixel shadows and step-based button interactions`}]},{slug:"japanese-fresh",name:"日系清新风",nameEn:"Japanese Fresh",description:"以Ma (间) 留白哲学、侘寂美学和极致呼吸感为核心，通过发丝级边框、植物线描装饰和极简温暖中性色，营造沉静治愈的设计体验。",cover:"/styles/japanese-fresh.svg",styleType:"visual",tags:["minimal","modern"],category:"minimal",colors:{primary:"#64b5f6",secondary:"#fafaf8",accent:["#98d8c8","#ffb7c5","#b8d4e3"]},keywords:["Ma","侘寂","留白","发丝边框","植物线描","呼吸感"],philosophy:`Japanese Fresh embodies Ma (space between) and wabi-sabi (beauty in imperfection). Design is not about what you add, but what you allow to breathe.

Core principles:
- Ma (間): Intentional, generous whitespace is the primary design element. Sections use py-32+ to create profound breathing room between content
- Wabi-sabi: Embrace subtle imperfection -- asymmetric layouts, slightly off-center elements, and organic rather than rigid alignment
- Hairline Borders: All borders are 0.5-1px maximum, using warm neutral colors like #d4d4cf at 30-40% opacity
- Natural Textures: Subtle linen/paper grain texture backgrounds reference natural materials (washi paper, unbleached cotton)
- Botanical Accents: Single delicate line-drawn botanical SVG elements per section -- one branch, one leaf, never crowded
- Bottom-line Inputs: Inputs use only a bottom border line, floating labels, no surrounding frame
- No Shadows: Forms exist without shadow; they float in whitespace by their own presence`,doList:["Use extreme whitespace (py-32, py-40) between sections -- Ma is the primary design tool","Use only hairline borders (border with opacity-30, never border-2)","Include one delicate botanical SVG line drawing per major section","Use font-extralight/font-light exclusively for all text","Keep inputs as bottom-line only with floating labels","Use warm neutral border color #d4d4cf instead of harsh gray","Apply asymmetric element placement for wabi-sabi character","Use transition duration-500 for slow, meditative interactions"],dontList:["Never use bold or heavy font weights (font-bold, font-semibold)","Never use uppercase text -- it is too aggressive for this aesthetic","Never use border-2 or thicker -- only hairline borders","Never use visible shadows (shadow-lg/xl) -- elements float without weight","Never use dark or black backgrounds","Never use sharp corners (rounded-none) -- always gentle rounded-lg/xl","Never crowd sections together -- maintain extreme breathing room"],components:{button:{name:"Whisper Button",description:"Button with hairline border, huge padding, and barely-visible hover state",code:`<button className="
  px-10 py-3
  bg-transparent text-[#7a8a9e]
  font-sans font-light tracking-wide
  rounded-lg
  border border-[#d4d4cf]/40
  hover:border-[#64b5f6]/40 hover:text-[#64b5f6]
  transition-all duration-500 ease-in-out
">
  Explore
</button>`},card:{name:"Breath Card",description:"Card with 0.5px warm gray border, massive inner whitespace, and botanical accent",code:`<div className="
  p-10 md:p-12
  bg-white
  rounded-xl
  border border-[#d4d4cf]/30
  transition-all duration-500 ease-in-out
  hover:border-[#d4d4cf]/50
">
  <h3 className="text-lg font-sans font-extralight text-[#4a5568] mb-4 tracking-wide">
    Card Title
  </h3>
  <p className="text-[#b0b8c4] text-sm font-light leading-relaxed">
    Gentle and simple, like morning light through paper screens
  </p>
</div>`},input:{name:"Bottom-line Input",description:"Input with bottom border only, floating label style, and ultra-subtle focus",code:`<div className="relative pt-4">
  <input
    type="text"
    placeholder=" "
    className="
      w-full pb-2 pt-0
      bg-transparent
      border-b border-[#d4d4cf]
      text-[#4a5568]
      font-sans font-light
      focus:border-[#64b5f6]
      focus:outline-none
      transition-all duration-500
      peer
    "
  />
  <label className="absolute top-0 left-0 text-xs font-light text-[#b0b8c4] tracking-wide peer-focus:text-[#64b5f6] transition-all duration-500">
    Your name
  </label>
</div>`},hero:{name:"Ma Hero",description:"Hero section with extreme whitespace, single botanical SVG, and light typography",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#fafaf8]
  relative overflow-hidden
">
  <svg className="absolute left-12 bottom-24 w-32 h-64 opacity-[0.12]" viewBox="0 0 100 200" fill="none" stroke="#a0aec0" strokeWidth="0.8">
    <path d="M50 200 C50 160, 55 120, 58 80 C60 60, 55 40, 58 20"/>
    <path d="M58 80 C70 75, 80 65, 85 58 C78 68, 68 76, 58 80"/>
    <path d="M56 50 C44 42, 36 32, 30 24 C38 34, 46 44, 56 50"/>
  </svg>
  <div className="relative z-10 text-center px-8 max-w-xl">
    <h1 className="text-4xl md:text-6xl font-sans font-extralight text-[#4a5568] mb-6 tracking-wide">
      Japanese Fresh
    </h1>
    <p className="text-base text-[#b0b8c4] font-light leading-loose mb-16">
      the beauty of empty space
    </p>
    <button className="px-12 py-3 bg-transparent text-[#7a8a9e] font-light tracking-wide rounded-lg border border-[#d4d4cf]/40 hover:border-[#64b5f6]/40 hover:text-[#64b5f6] transition-all duration-500">
      Begin
    </button>
  </div>
</section>`}},globalCss:`/* Japanese Fresh Global Styles */

:root {
  --jf-sky: #64b5f6;
  --jf-rice: #fafaf8;
  --jf-mint: #98d8c8;
  --jf-pink: #ffb7c5;
  --jf-powder: #b8d4e3;
  --jf-text: #4a5568;
  --jf-muted: #b0b8c4;
  --jf-border: #d4d4cf;
}

/* Linen paper texture */
.jf-linen {
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='6' height='6' fill='%23fafaf8'/%3E%3Crect x='0' y='0' width='1' height='1' fill='%23e8e8e4' opacity='0.12'/%3E%3Crect x='3' y='3' width='1' height='1' fill='%23e8e8e4' opacity='0.08'/%3E%3C/svg%3E");
}

/* Hairline divider */
.jf-divider {
  height: 0.5px;
  background: var(--jf-border);
  opacity: 0.4;
}

/* Bottom-line input focus */
.jf-input-underline {
  border: none;
  border-bottom: 1px solid var(--jf-border);
  border-radius: 0;
  background: transparent;
}
.jf-input-underline:focus {
  border-bottom-color: var(--jf-sky);
  box-shadow: none;
  outline: none;
}

/* Ma-based section spacing */
.jf-ma-section {
  padding-top: 8rem;
  padding-bottom: 8rem;
}

/* Botanical SVG accent */
.jf-botanical {
  opacity: 0.12;
  stroke: var(--jf-muted);
  fill: none;
  stroke-width: 0.7;
}`,aiRules:`You are a Japanese Fresh design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Heavy borders (border-2 or thicker)
- Neon or high-saturation colors
- Dark or black backgrounds
- Bold/heavy font weights (font-bold, font-semibold, font-black)
- Sharp corners (rounded-none, rounded-sm)
- Uppercase text
- Visible shadows (shadow-lg, shadow-xl)
- Crowded layouts without extreme whitespace

## Must Follow

- Rice-white background: bg-[#fafaf8] with optional linen texture
- Ma-based extreme whitespace: py-32+ between sections (this is THE core principle)
- Hairline borders only: border with opacity-30/40, warm neutral #d4d4cf
- Font weight: font-extralight or font-light exclusively
- Single botanical SVG line drawing accent per section
- Bottom-line only inputs with floating labels
- No shadows anywhere -- forms float in whitespace
- Slow transitions: duration-500 for meditative feel
- Warm neutral colors: #d4d4cf borders, #b0b8c4 muted text

## Color Palette

Primary:
- Sky Blue: #64b5f6
- Rice White: #fafaf8
- Mint Green: #98d8c8
- Gentle Pink: #ffb7c5
- Powder Blue: #b8d4e3
- Text: #4a5568
- Secondary text: #7a8a9e
- Muted: #b0b8c4
- Border: #d4d4cf

## Unique Elements

- Ma-based extreme whitespace (py-32+ sections)
- Hairline 0.5px borders at 30% opacity
- Botanical line-drawing SVG accents (one per section)
- Bottom-line only input fields with floating labels
- Linen/paper texture background pattern`,examplePrompts:[{title:"静谧日记",titleEn:"Quiet Journal",description:"极致留白的个人日记页面",descriptionEn:"Journal page with extreme whitespace and botanical accents",prompt:`Use Japanese Fresh style to create a personal journal page:
1. Background: rice-white (#fafaf8) with subtle linen texture
2. Extreme whitespace between all sections (py-32+)
3. Hairline borders only (0.5px warm gray)
4. One delicate botanical line drawing SVG accent
5. Bottom-line inputs, no shadows, font-extralight throughout`}]},{slug:"neon-samurai",name:"霓虹武士风",nameEn:"Neon Samurai",description:"日本传统武士美学与霓虹赛博朋克的碰撞融合，刀锋斜切线条、朱红的鸟居门框架、书法笔触与双色霓虹光效交织，浮世绘遇见霓虹灯的未来都市武道。",cover:"/styles/neon-samurai.svg",styleType:"visual",tags:["expressive","modern","high-contrast"],category:"expressive",colors:{primary:"#dc2626",secondary:"#080818",accent:["#a020f0","#38bdf8","#fbbf24"]},keywords:["霓虹武士","赛博武士","日本","霓虹","传统融合","动作","刀锋","鸟居"],philosophy:`Neon Samurai fuses Japanese bushido aesthetics with cyberpunk neon luminance, forging a style of relentless tension and kinetic energy.

Core principles:
- Katana slash geometry: diagonal tapered strokes cut across layouts as decorative dividers
- Torii gate framing: section containers shaped like sacred gate structures
- Dual-color glow: stroke color differs from its glow halo (purple stroke, blue glow)
- Armor-plate panels: angular card shapes inspired by samurai yoroi plate segments
- Ink splatter accents: burst particles on hover and interaction states
- Calligraphy brush strokes: neon-lit brush-stroke underlines and dividers
- Smoke/mist overlays: atmospheric depth through translucent background wisps`,doList:["Use dark navy backgrounds (bg-[#080818])","Add katana diagonal slash-stroke decorations","Use torii gate shapes as section frames","Apply dual-color glow (stroke != glow color)","Use armor-plate angular card shapes","Add ink splatter burst accents on hover","Use calligraphy brush-stroke dividers with neon glow"],dontList:["No soft pastel colors or light backgrounds","No rounded-full or large border radius","No organic/irregular rounded shapes","No serif fonts","No standard drop shadows (use neon glow only)"],components:{button:{name:"Button",description:"Sharp-edged button with slash-mark corner cuts and dual-color neon glow",code:`<button className="
  relative px-6 py-3
  bg-[#dc2626] text-white
  font-sans font-bold uppercase tracking-widest
  border border-[#dc2626]/60
  shadow-[0_0_15px_rgba(220,38,38,0.5)]
  hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]
  hover:border-[#dc2626]
  transition-all duration-300
  before:content-[''] before:absolute before:top-0 before:right-0
  before:w-3 before:h-3 before:border-t before:border-r before:border-[#a020f0]
  after:content-[''] after:absolute after:bottom-0 after:left-0
  after:w-3 after:h-3 after:border-b after:border-l after:border-[#a020f0]
">
  Strike
</button>`},card:{name:"Card",description:"Armor-plate styled card with angular borders and neon edge glow",code:`<div className="
  relative p-8
  bg-[#080818]
  border border-[#dc2626]/30
  shadow-[0_0_15px_rgba(220,38,38,0.2)]
  hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]
  hover:border-[#dc2626]/60
  transition-all duration-300
  [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%-16px))]
">
  <h3 className="text-2xl font-sans font-bold text-[#dc2626] uppercase tracking-wider mb-3">
    BUSHIDO
  </h3>
  <p className="text-white/50 font-sans">
    The way of the warrior, illuminated by neon
  </p>
</div>`},input:{name:"Input",description:"Brush-stroke underline input with neon glow focus",code:`<input
  type="text"
  placeholder="Enter command..."
  className="
    w-full px-4 py-3
    bg-transparent
    border-b-2 border-[#dc2626]/30
    text-white placeholder-white/25
    font-sans
    focus:border-[#dc2626]
    focus:shadow-[0_2px_15px_rgba(220,38,38,0.4)]
    focus:outline-none
    transition-all duration-300
  "
/>`},hero:{name:"Hero",description:"Full-screen hero with torii gate frame, diagonal slashes, and smoke overlay",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#080818]
  relative overflow-hidden
">
  <div className="absolute inset-0 opacity-[0.03]" style={{
    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(220,38,38,0.3) 2px, rgba(220,38,38,0.3) 4px)"
  }} />
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-sans font-bold text-[#dc2626] uppercase tracking-widest mb-2
      [text-shadow:0_0_30px_rgba(220,38,38,0.6)]">
      NEON
    </h1>
    <h2 className="text-4xl md:text-6xl font-sans font-bold text-[#a020f0] uppercase tracking-widest mb-6
      [text-shadow:0_0_20px_rgba(56,189,248,0.5)]">
      SAMURAI
    </h2>
  </div>
</section>`}},globalCss:`/* Neon Samurai Global Styles */

:root {
  --ns-red: #dc2626;
  --ns-dark: #080818;
  --ns-purple: #a020f0;
  --ns-blue: #38bdf8;
  --ns-gold: #fbbf24;
}

/* Dual-color neon text glow (red text, blue glow) */
.ns-dual-glow {
  text-shadow: 0 0 20px var(--ns-blue), 0 0 40px rgba(56, 189, 248, 0.3);
  color: var(--ns-red);
}

/* Katana slash diagonal line */
.ns-slash-line {
  position: relative;
}
.ns-slash-line::after {
  content: "";
  position: absolute;
  top: 50%;
  left: -10%;
  right: -10%;
  height: 2px;
  background: linear-gradient(135deg, transparent 10%, var(--ns-red) 30%, var(--ns-red) 70%, transparent 90%);
  box-shadow: 0 0 12px var(--ns-blue);
  transform: rotate(-15deg);
  pointer-events: none;
}

/* Torii gate frame */
.ns-torii-frame {
  border-top: 3px solid var(--ns-red);
  border-left: 2px solid var(--ns-red);
  border-right: 2px solid var(--ns-red);
  box-shadow: 0 -4px 15px rgba(220, 38, 38, 0.3);
  position: relative;
}
.ns-torii-frame::before {
  content: "";
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--ns-red);
  opacity: 0.5;
}

/* Armor-plate clip path */
.ns-armor-clip {
  clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
}

/* Smoke overlay */
.ns-smoke::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 80%, rgba(220, 38, 38, 0.04) 0%, transparent 70%);
  pointer-events: none;
}

/* Scan line overlay */
.ns-scanlines::before {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
  pointer-events: none;
}`,aiRules:`You are a Neon Samurai design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Soft pastel colors or light backgrounds
- rounded-full or large border radius
- Organic/irregular shapes
- Serif fonts
- Light mode backgrounds (bg-white, bg-gray-50, etc.)
- Standard drop shadows (shadow-md, shadow-lg)

## Must Follow

- Dark navy backgrounds: bg-[#080818] or similar near-black
- Neon red primary: #dc2626 with glow effects
- Dual-color glow: stroke color differs from glow (e.g., purple text with blue glow halo)
- Katana slash diagonal lines as decorative elements
- Torii gate shapes for section framing
- Armor-plate angular clip-paths on cards
- Brush-stroke style underlines (not solid box borders for inputs)
- Ink splatter burst accents on hover

## Color Palette

Primary:
- Neon Red: #dc2626
- Dark Navy: #080818
- Electric Purple: #a020f0
- Neon Blue: #38bdf8
- Gold: #fbbf24

## Unique Elements

- Katana diagonal slash stroke decorations (tapered SVG paths)
- Torii gate shaped frames (double-beam top border)
- Dual-color glow effect (stroke color != glow color)
- Armor-plate angular card clip-paths
- Calligraphy brush-stroke neon dividers`,examplePrompts:[{title:"霓虹武士着陆页",titleEn:"Neon Samurai Landing Page",description:"刀锋斜切与双色霓虹光效融合的武士主题页面",descriptionEn:"Katana-slash and dual-glow neon bushido page",prompt:`Use Neon Samurai style to create a dark, high-contrast landing page:
1. Background: dark navy with smoke wisps and scan line overlay
2. Hero: torii gate frame with dual-color neon title glow
3. Diagonal katana slash decorations between sections
4. Cards: armor-plate angular clip-path with neon edge glow
5. Inputs: brush-stroke underline style with glow focus
6. Purple stroke with blue glow halo (dual-color effect)`}]},{slug:"magic-circle",name:"魔法阵风",nameEn:"Magic Circle",description:"同心圆环嵌套体系、六芒星几何核心、符文铭文沿圆路径排列、生命之花神圣几何、金色辉光辐射与炼金术符号交织的奇幻视觉风格。",cover:"/styles/magic-circle.svg",styleType:"visual",tags:["expressive","modern"],category:"expressive",colors:{primary:"#1e1b4b",secondary:"#0a0920",accent:["#fbbf24","#e2e8f0","#818cf8"]},keywords:["魔法阵","符文","神秘","奇幻","光效","几何","魔法","同心圆","六芒星"],philosophy:`Magic Circle draws from the arcane tradition of geometric summoning circles, weaving precision geometry with radiant light effects.

Core principles:
- Concentric ring system: multiple nested circles of varying thickness, dash patterns, and colors
- Hexagram/pentagram central figures: overlapping triangles as primary structural motifs
- Runic inscription borders: text-like marks arranged along circular paths
- Sacred geometry patterns: Flower of Life, Metatron's Cube as background textures
- Rotating ring animation: slow counter-rotating rings suggesting arcane machinery
- Golden center radiation: warm glow emanating from the center of compositions
- Alchemical symbols: fire, water, air, earth triangles at intersection points`,doList:["Use deep dark navy backgrounds (bg-[#0a0920])","Add concentric ring decorations around focal elements","Use hexagonal or circular card layouts","Apply runic inscription marks along borders","Add golden glow radiation from center of elements","Use sacred geometry patterns as subtle backgrounds","Place alchemical symbols at geometric intersection points"],dontList:["No bright neon colors (use warm gold and cool indigo only)","No brutalist style elements","No pixel art aesthetics","No heavy/thick borders","No informal/handwritten fonts"],components:{button:{name:"Button",description:"Hexagon-bordered button with golden glow hover radiation",code:`<button className="
  relative px-6 py-3
  bg-[#1e1b4b] text-[#fbbf24]
  font-serif font-semibold tracking-wide
  border border-[#fbbf24]/30
  rounded-sm
  shadow-[0_0_20px_rgba(251,191,36,0.2)]
  hover:shadow-[0_0_35px_rgba(251,191,36,0.5)]
  hover:border-[#fbbf24]/60
  transition-all duration-500
">
  Invoke
</button>`},card:{name:"Card",description:"Card with concentric ring border decorations and runic edge marks",code:`<div className="
  relative p-8
  bg-[#0a0920]
  border border-[#fbbf24]/15
  rounded-sm
  shadow-[0_0_20px_rgba(251,191,36,0.12)]
  hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]
  hover:border-[#fbbf24]/30
  transition-all duration-500
">
  <h3 className="text-2xl font-serif font-bold text-[#fbbf24] mb-3">
    Arcanum
  </h3>
  <p className="text-[#e2e8f0]/50 font-sans">
    Ancient geometries reveal hidden truths
  </p>
</div>`},input:{name:"Input",description:"Input with geometric frame and golden glow focus",code:`<input
  type="text"
  placeholder="Enter rune..."
  className="
    w-full px-4 py-3
    bg-[#0a0920]
    border border-[#fbbf24]/15
    rounded-sm
    text-[#e2e8f0] placeholder-[#e2e8f0]/25
    font-sans
    focus:border-[#fbbf24]/50
    focus:shadow-[0_0_20px_rgba(251,191,36,0.25)]
    focus:outline-none
    transition-all duration-500
  "
/>`},hero:{name:"Hero",description:"Hero with concentric ring decorations and hexagram layout",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#0a0920]
  relative overflow-hidden
">
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-[500px] h-[500px] border border-[#fbbf24]/8 rounded-full animate-spin" style={{ animationDuration: "40s" }} />
    <div className="absolute w-[400px] h-[400px] border border-dashed border-[#818cf8]/6 rounded-full animate-spin" style={{ animationDuration: "60s", animationDirection: "reverse" }} />
    <div className="absolute w-[300px] h-[300px] border border-[#fbbf24]/10 rounded-full" />
  </div>
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#fbbf24] mb-2
      [text-shadow:0_0_40px_rgba(251,191,36,0.4)]">
      ARCANE CIRCLE
    </h1>
  </div>
</section>`}},globalCss:`/* Magic Circle Global Styles */

:root {
  --mc-navy: #1e1b4b;
  --mc-dark: #0a0920;
  --mc-gold: #fbbf24;
  --mc-silver: #e2e8f0;
  --mc-indigo: #818cf8;
}

/* Golden glow text */
.mc-gold-glow {
  text-shadow: 0 0 25px var(--mc-gold), 0 0 50px rgba(251, 191, 36, 0.2);
}

/* Concentric ring decoration */
.mc-rings {
  position: relative;
}
.mc-rings::before {
  content: "";
  position: absolute;
  inset: -20px;
  border: 1px solid rgba(251, 191, 36, 0.08);
  border-radius: 50%;
  animation: mc-rotate 30s linear infinite;
}
.mc-rings::after {
  content: "";
  position: absolute;
  inset: -40px;
  border: 1px dashed rgba(129, 140, 248, 0.06);
  border-radius: 50%;
  animation: mc-rotate 45s linear infinite reverse;
}

@keyframes mc-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Runic inscription border */
.mc-rune-border {
  position: relative;
}
.mc-rune-border::after {
  content: "--- ... --- . -- --- ...";
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 8px;
  letter-spacing: 4px;
  color: rgba(251, 191, 36, 0.15);
  pointer-events: none;
}

/* Sacred geometry shimmer */
.mc-sacred-bg {
  background-image:
    radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 25% 25%, rgba(129, 140, 248, 0.02) 0%, transparent 40%),
    radial-gradient(circle at 75% 75%, rgba(129, 140, 248, 0.02) 0%, transparent 40%);
}

/* Center glow radiation */
.mc-center-glow {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(251, 191, 36, 0.08) 0%,
    rgba(251, 191, 36, 0.02) 40%,
    transparent 70%
  );
}`,aiRules:`You are a Magic Circle design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Bright neon colors (use warm gold and cool indigo only)
- Brutalist style elements
- Pixel art aesthetics
- Heavy/thick borders
- Informal/handwritten fonts
- Light backgrounds

## Must Follow

- Deep dark backgrounds: bg-[#0a0920] or bg-[#1e1b4b]
- Concentric ring decorations (nested circles with varying styles)
- Gold accent glow: #fbbf24 with radiant shadow effects
- Hexagram/sacred geometry structural motifs
- Runic inscription marks along borders
- Elegant serif fonts for headings (font-serif)
- Thin elegant borders with low opacity
- Golden center radiation glow effects

## Color Palette

Primary:
- Deep Navy: #1e1b4b
- Dark Background: #0a0920
- Gold Glow: #fbbf24
- Silver White: #e2e8f0
- Mystic Indigo: #818cf8

## Unique Elements

- Concentric circle/ring decorative system (multiple nested rings)
- Runic inscription borders (dot-dash marks along edges)
- Hexagram/sacred geometry card layout
- Alchemical symbols at geometric intersection points
- Rotating ring animation suggesting arcane machinery`,examplePrompts:[{title:"魔法阵主题页面",titleEn:"Magic Circle Theme Page",description:"同心圆环、六芒星与金色辉光的神秘几何页面",descriptionEn:"Concentric rings, hexagram and golden glow mystical page",prompt:`Use Magic Circle style to create a mystical dark-themed page:
1. Background: deep navy with sacred geometry shimmer pattern
2. Hero: concentric rotating rings around golden-glow title
3. Cards: arranged in hexagonal grid with runic inscription borders
4. Buttons: hexagon-bordered with golden glow hover radiation
5. Alchemical symbols at geometric intersection points
6. Slow-rotating ring animation suggesting ancient mechanisms`}]},{slug:"cyber-wafuu",name:"赛博和风",nameEn:"Cyber Wafuu",description:"青海波纹样与电路走线融合、鸟居门导航框架、麻叶纹网格、金继ぎ金色修复线、障子屏风格栅面板、传统纹样被科技'侵入'的日式赛博美学。",cover:"/styles/cyber-wafuu.svg",styleType:"visual",tags:["expressive","modern","high-contrast"],category:"expressive",colors:{primary:"#1e3a5f",secondary:"#080814",accent:["#c41e3a","#c9a227","#38bdf8"]},keywords:["赛博和风","数字和风","青海波","金继ぎ","障子","鸟居","麻叶纹","电路"],philosophy:`Cyber Wafuu reimagines traditional Japanese visual culture through digital disruption, creating a sophisticated fusion where heritage patterns are "hacked" by technology.

Core principles:
- Seigaiha digital waves: the classic wave pattern overlaid with circuit board traces
- Torii gate navigation: sacred gate structure reborn as navigation frames
- Asanoha grid: hemp leaf geometric grid as layout scaffolding
- Kintsugi gold repair: golden crack lines as decorative borders and accents
- Shoji screen panels: traditional sliding door grids as card frame systems
- Cherry blossom + neon: organic sakura forms outlined in electric light
- Pattern collision: traditional repeating patterns visibly intersecting with digital traces`,doList:["Use dark indigo backgrounds (bg-[#080814])","Add seigaiha wave pattern backgrounds with CSS repeating-radial-gradient","Use shoji screen grid as card frame structure","Apply kintsugi gold crack line borders and accents","Use torii gate shape for navigation framing","Add circuit trace connecting lines between elements","Layer traditional patterns with digital overlay effects"],dontList:["No soft pastel colors","No organic irregular rounded shapes","No Western serif fonts","No rounded-full borders","No light backgrounds (bg-white, bg-gray-50)"],components:{button:{name:"Button",description:"Button with seigaiha pattern background and neon glow border",code:`<button className="
  relative px-6 py-3
  bg-[#1e3a5f] text-[#e2e8f0]
  font-sans font-semibold tracking-wider
  border border-[#1e3a5f]/60
  shadow-[0_0_12px_rgba(30,58,95,0.4)]
  hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]
  hover:border-[#38bdf8]/60
  transition-all duration-300
">
  Execute
</button>`},card:{name:"Card",description:"Shoji grid frame card with kintsugi gold accent lines",code:`<div className="
  relative p-8
  bg-[#080814]
  border border-[#1e3a5f]/30
  shadow-[0_0_15px_rgba(30,58,95,0.2)]
  hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]
  hover:border-[#38bdf8]/40
  transition-all duration-300
">
  <div className="absolute top-0 left-1/3 w-px h-full bg-[#1e3a5f]/15" />
  <div className="absolute top-0 left-2/3 w-px h-full bg-[#1e3a5f]/15" />
  <div className="absolute top-1/2 left-0 w-full h-px bg-[#1e3a5f]/10" />
  <div className="absolute top-2 left-2 right-2 h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />
  <div className="relative z-10">
    <h3 className="text-2xl font-sans font-bold text-[#38bdf8] tracking-wider mb-3">
      SEIGAIHA
    </h3>
    <p className="text-[#e2e8f0]/45 font-sans">
      Traditional waves, digitally reborn
    </p>
  </div>
</div>`},input:{name:"Input",description:"Input with wave pattern underline and circuit trace focus glow",code:`<input
  type="text"
  placeholder="Input..."
  className="
    w-full px-4 py-3
    bg-[#080814]
    border border-[#1e3a5f]/30
    text-[#e2e8f0] placeholder-[#e2e8f0]/20
    font-sans
    focus:border-[#38bdf8]/60
    focus:shadow-[0_0_12px_rgba(56,189,248,0.3)]
    focus:outline-none
    transition-all duration-300
  "
/>`},hero:{name:"Hero",description:"Full-screen hero with seigaiha wave background and torii gate frame",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#080814]
  relative overflow-hidden
">
  <div className="absolute inset-0 opacity-[0.03]" style={{
    backgroundImage: "radial-gradient(circle at 50% 100%, transparent 60%, rgba(56,189,248,0.4) 60%, rgba(56,189,248,0.4) 62%, transparent 62%), radial-gradient(circle at 0% 100%, transparent 60%, rgba(56,189,248,0.4) 60%, rgba(56,189,248,0.4) 62%, transparent 62%)",
    backgroundSize: "60px 30px"
  }} />
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-sans font-bold text-[#38bdf8] uppercase tracking-widest mb-2
      [text-shadow:0_0_25px_rgba(56,189,248,0.4)]">
      CYBER WAFUU
    </h1>
  </div>
</section>`}},globalCss:`/* Cyber Wafuu Global Styles */

:root {
  --cw-indigo: #1e3a5f;
  --cw-dark: #080814;
  --cw-vermillion: #c41e3a;
  --cw-gold: #c9a227;
  --cw-blue: #38bdf8;
}

/* Seigaiha wave pattern (digital version) */
.cw-seigaiha {
  background-image:
    radial-gradient(circle at 50% 100%, transparent 60%, rgba(56, 189, 248, 0.04) 60%, rgba(56, 189, 248, 0.04) 62%, transparent 62%),
    radial-gradient(circle at 0% 100%, transparent 60%, rgba(56, 189, 248, 0.04) 60%, rgba(56, 189, 248, 0.04) 62%, transparent 62%);
  background-size: 60px 30px;
}

/* Kintsugi gold crack line */
.cw-kintsugi {
  position: relative;
}
.cw-kintsugi::after {
  content: "";
  position: absolute;
  top: 4px;
  left: 8px;
  right: 8px;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    var(--cw-gold) 15%,
    transparent 30%,
    var(--cw-gold) 50%,
    transparent 65%,
    var(--cw-gold) 80%,
    transparent 100%
  );
  opacity: 0.3;
  box-shadow: 0 0 6px rgba(201, 162, 39, 0.3);
}

/* Shoji screen grid */
.cw-shoji-grid {
  position: relative;
}
.cw-shoji-grid::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to right, rgba(30, 58, 95, 0.12) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(30, 58, 95, 0.12) 1px, transparent 1px);
  background-size: 33.33% 50%;
  pointer-events: none;
}

/* Circuit trace decoration */
.cw-circuit::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    var(--cw-blue) 15%,
    transparent 35%,
    var(--cw-blue) 55%,
    transparent 75%,
    var(--cw-blue) 90%,
    transparent 100%
  );
  opacity: 0.2;
}

/* Asanoha hemp leaf pattern overlay */
.cw-asanoha {
  background-image:
    linear-gradient(30deg, rgba(30, 58, 95, 0.06) 12%, transparent 12.5%, transparent 87%, rgba(30, 58, 95, 0.06) 87.5%),
    linear-gradient(150deg, rgba(30, 58, 95, 0.06) 12%, transparent 12.5%, transparent 87%, rgba(30, 58, 95, 0.06) 87.5%),
    linear-gradient(30deg, rgba(30, 58, 95, 0.06) 12%, transparent 12.5%, transparent 87%, rgba(30, 58, 95, 0.06) 87.5%),
    linear-gradient(150deg, rgba(30, 58, 95, 0.06) 12%, transparent 12.5%, transparent 87%, rgba(30, 58, 95, 0.06) 87.5%);
  background-size: 40px 70px;
  background-position: 0 0, 0 0, 20px 35px, 20px 35px;
}

/* Gold foil shimmer */
.cw-gold-foil {
  background: linear-gradient(
    135deg,
    rgba(201, 162, 39, 0.08) 0%,
    rgba(201, 162, 39, 0.03) 50%,
    rgba(201, 162, 39, 0.12) 100%
  );
}`,aiRules:`You are a Cyber Wafuu design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Soft pastel colors
- Organic irregular shapes
- Western serif fonts
- rounded-full borders
- Light backgrounds (bg-white, bg-gray-50, etc.)
- Standard drop shadows (use glow effects only)

## Must Follow

- Dark indigo backgrounds: bg-[#080814] or bg-[#1e3a5f]
- Seigaiha wave pattern as background texture (repeating-radial-gradient)
- Shoji screen grid frame structure for cards
- Kintsugi gold crack lines as border accents
- Torii gate shapes for navigation frames
- Circuit trace line connections between elements
- Electric blue accent: #38bdf8 with glow effects
- Vermillion #c41e3a and gold #c9a227 for traditional accents

## Color Palette

Primary:
- Indigo: #1e3a5f
- Dark Background: #080814
- Vermillion: #c41e3a
- Gold Foil: #c9a227
- Electric Blue: #38bdf8

## Unique Elements

- Seigaiha wave pattern (CSS repeating-radial-gradient)
- Kintsugi gold crack line accents (gradient border decorations)
- Shoji screen grid card frames (CSS grid overlays)
- Torii gate navigation frames
- Asanoha hemp leaf pattern background`,examplePrompts:[{title:"赛博和风着陆页",titleEn:"Cyber Wafuu Landing Page",description:"青海波、金继ぎ与障子屏风的数字融合页面",descriptionEn:"Seigaiha, kintsugi and shoji screen digital fusion page",prompt:`Use Cyber Wafuu style to create a dark Japanese-tech landing page:
1. Background: dark indigo with seigaiha wave pattern overlay
2. Navigation: torii gate shaped frame with vermillion accents
3. Cards: shoji screen grid frames with kintsugi gold crack accents
4. Circuit trace lines connecting card elements
5. Cherry blossom with neon outlines as decorative accents
6. Asanoha hemp leaf grid as section background`}]},{slug:"steampunk",name:"蒸汽朋克",nameEn:"Steampunk",description:"维多利亚时代工业机械美学，黄铜与铜质金属元素、齿轮机关装饰、蒸汽管道铆钉细节。适合复古科幻、工业风格、创意展示项目。",cover:"/styles/steampunk.svg",styleType:"visual",tags:["expressive","retro","high-contrast"],category:"expressive",colors:{primary:"#b5a642",secondary:"#3d2b1f",accent:["#b87333","#f5f0e1","#4a4a4a"]},keywords:["蒸汽朋克","齿轮","黄铜","铜质","工业","发条","维多利亚","铆钉"],philosophy:`Steampunk 风格源自维多利亚时代工业革命的美学想象，通过黄铜/铜质金属质感、齿轮机关元素和精密的机械细节创造复古未来感。

核心理念：
- 金属质感：黄铜与铜质为核心色调，呈现温暖的金属光泽
- 机械装饰：齿轮、管道、铆钉等工业元素融入界面设计
- 维多利亚优雅：使用衬线字体和装饰性边框保持古典优雅
- 做旧纹理：深棕色背景与泛黄纸张色营造年代感`,doList:["背景使用深棕色 bg-[#3d2b1f] 或 bg-[#2a1f15]","使用 shadow-[0_0_15px_rgba(181,166,66,0.3)] 创造黄铜光泽效果","边框使用铜色调 border border-[#b87333]/50","文字使用奶油色 text-[#f5f0e1] 或黄铜色 text-[#b5a642]","使用装饰性边框和铆钉样式圆点元素","按钮使用黄铜色渐变 bg-gradient-to-b from-[#b5a642] to-[#8a7d32]","使用 font-serif 衬线字体体现维多利亚风格"],dontList:["禁止使用纯白色背景或现代极简风格","禁止使用霓虹色或高饱和度荧光色","禁止使用扁平无质感的设计","禁止使用现代无衬线字体作为标题","禁止使用过大圆角 rounded-2xl, rounded-3xl","禁止使用冷色调蓝色/紫色作为主色"],components:{button:{name:"按钮",description:"蒸汽朋克风格的黄铜机械按钮",code:`// Brass Primary
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
</button>`},card:{name:"卡片",description:"蒸汽朋克风格的机械面板卡片",code:`<div className="bg-[#2a1f15] border-2 border-[#b87333]/40 rounded p-6 shadow-[0_0_15px_rgba(184,115,51,0.15)] hover:shadow-[0_0_25px_rgba(184,115,51,0.25)] hover:border-[#b87333]/60 transition-all duration-300 relative overflow-hidden">
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
</div>`},input:{name:"输入框",description:"蒸汽朋克风格的输入框",code:`<div className="space-y-2">
  <label className="block text-[#b5a642] font-serif text-xs uppercase tracking-wider">Access Cipher</label>
  <div className="relative">
    <input
      type="text"
      className="w-full px-4 py-3 bg-[#2a1f15] border-2 border-[#b87333]/30 rounded text-[#f5f0e1] font-serif placeholder:text-[#b87333]/30 focus:outline-none focus:border-[#b5a642] focus:shadow-[0_0_12px_rgba(181,166,66,0.25)] transition-all duration-300"
      placeholder="Enter cipher key..."
    />
    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#d4c85c] to-[#8a7d32] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.3)]" />
  </div>
</div>`}},globalCss:`/* Steampunk Global Styles */
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
}`,aiRules:`STYLE: Steampunk
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
- Gradient overlays for metal texture`,examplePrompts:[{title:"机械仪表盘",titleEn:"Mechanical Dashboard",description:"生成蒸汽朋克风格仪表盘界面",descriptionEn:"Generate steampunk dashboard interface",prompt:`Create a dashboard interface using Steampunk style:
- Dark brown background with brass accents
- Gauge and dial-style data displays
- Cards with corner rivet decorations
- Brass gradient buttons with metallic sheen
- Victorian serif typography
- Copper border accents and warm glow effects`}]},{slug:"pop-art",name:"波普艺术",nameEn:"Pop Art",description:"大胆鲜明的波普艺术风格，灵感来自 Andy Warhol 和 Roy Lichtenstein。粗黑轮廓、半色调网点、漫画式对话泡泡、高饱和度色块。适合创意品牌、潮流文化、艺术展示。",cover:"/styles/pop-art.svg",styleType:"visual",tags:["expressive","retro","high-contrast"],category:"expressive",colors:{primary:"#ffdd00",secondary:"#ff69b4",accent:["#00bfff","#000000","#ffffff"]},keywords:["波普","Warhol","Lichtenstein","半色调","漫画","粗体","网点","对话泡泡"],philosophy:`Pop Art 风格来源于 20 世纪 60 年代的波普艺术运动，以 Andy Warhol 和 Roy Lichtenstein 为代表，通过大胆色块、粗黑轮廓和半色调网点创造视觉冲击。

核心理念：
- 粗黑轮廓：所有元素使用粗黑边框强调形状
- 高饱和色块：使用黄、粉、蓝等纯色平涂填充
- 半色调网点：Ben-Day dots 是波普艺术的标志性纹理
- 漫画风格：对话泡泡、动作线条等漫画元素融入界面`,doList:["背景使用高饱和纯色 bg-[#ffdd00] 或 bg-white","所有元素使用粗黑边框 border-4 border-black","使用 Ben-Day 半色调网点作为背景纹理","文字使用粗体 font-black uppercase","按钮和卡片使用硬阴影 shadow-[4px_4px_0_#000]","使用高对比度配色：黄 #ffdd00、粉 #ff69b4、蓝 #00bfff","hover 状态增大阴影偏移 hover:shadow-[6px_6px_0_#000]"],dontList:["禁止使用渐变色（必须是纯色平涂）","禁止使用低饱和度/灰色系颜色","禁止使用细线条 border（必须 border-2 以上）","禁止使用柔和阴影 shadow-md（必须是硬阴影）","禁止使用圆角过大 rounded-full（保持 rounded-none 或 rounded-lg）","禁止使用极简/无装饰的设计语言"],components:{button:{name:"按钮",description:"波普艺术风格的漫画按钮",code:`// Pop Art Primary
<button className="px-6 py-3 bg-[#ffdd00] text-black border-4 border-black rounded-lg shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150 font-black uppercase tracking-wider">
  POW!
</button>

// Pop Art Secondary
<button className="px-6 py-3 bg-[#ff69b4] text-white border-4 border-black rounded-lg shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 font-black uppercase tracking-wider">
  BANG!
</button>

// Pop Art Outline
<button className="px-6 py-3 bg-white text-black border-4 border-black rounded-lg shadow-[4px_4px_0_#000] hover:bg-[#00bfff] hover:text-white hover:shadow-[6px_6px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 font-black uppercase tracking-wider">
  CLICK!
</button>`},card:{name:"卡片",description:"波普艺术风格的漫画卡片",code:`<div className="bg-white border-4 border-black rounded-lg p-6 shadow-[6px_6px_0_#000] relative overflow-hidden">
  {/* Ben-Day dots background */}
  <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '8px 8px'}} />

  <div className="relative">
    <div className="inline-block bg-[#ffdd00] border-2 border-black px-3 py-1 mb-4 font-black text-xs uppercase tracking-wider">
      NEW
    </div>
    <h4 className="text-black text-2xl font-black uppercase mb-3">
      Pop Art Card
    </h4>
    <p className="text-gray-800 leading-relaxed font-medium">
      Bold, colorful pop culture aesthetic with comic book styling.
    </p>
  </div>
</div>`},input:{name:"输入框",description:"波普艺术风格的输入框",code:`<div className="space-y-2">
  <label className="block text-black font-black text-sm uppercase tracking-wider">Your Name</label>
  <div className="relative">
    <input
      type="text"
      className="w-full px-4 py-3 bg-white border-4 border-black rounded-lg text-black font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#ff69b4] focus:shadow-[4px_4px_0_#ff69b4] transition-all duration-150"
      placeholder="Type here..."
    />
  </div>
</div>`}},globalCss:`/* Pop Art Global Styles */
@layer base {
  body {
    @apply bg-white text-black antialiased;
  }

  h1, h2, h3 {
    @apply font-black uppercase tracking-wider;
  }

  ::selection {
    @apply bg-[#ffdd00] text-black;
  }
}

/* Ben-Day dots pattern utility */
.pop-art-dots {
  background-image: radial-gradient(circle, #000 1px, transparent 1px);
  background-size: 8px 8px;
}`,aiRules:`STYLE: Pop Art
TYPE: Bold comic-book inspired interface

MUST USE:
- Thick black borders: border-4 border-black
- Hard offset shadows: shadow-[4px_4px_0_#000]
- Bold flat colors: bg-[#ffdd00], bg-[#ff69b4], bg-[#00bfff]
- Heavy typography: font-black uppercase tracking-wider
- Ben-Day dot patterns as background texture
- White or bright color backgrounds
- Comic-style elements (speech bubbles, action words)

MUST AVOID:
- Gradients (use flat color fills only)
- Low saturation / muted colors
- Thin borders (border must be border-2+)
- Soft shadows (shadow-md, shadow-lg)
- Rounded-full shapes
- Minimal / clean design language

COLOR RULES:
- Primary: Yellow (#ffdd00)
- Secondary: Hot Pink (#ff69b4)
- Accent: Electric Blue (#00bfff)
- Borders: Black (#000000)
- Background: White (#ffffff) or bright colors
- Text: Black on light, White on dark colors

SPECIAL EFFECTS:
- Hard shadow offset increases on hover
- Translate shift on hover for depth effect
- Ben-Day dots overlay for pop art texture
- Active state presses shadow inward`,examplePrompts:[{title:"波普艺术作品展示",titleEn:"Pop Art Gallery",description:"生成波普艺术风格的作品展示页面",descriptionEn:"Generate a pop art style gallery page",prompt:`Create a gallery page using Pop Art style:
- White background with Ben-Day dot pattern overlay
- Bold cards with thick black borders and hard shadows
- Bright yellow, pink, and blue color blocks
- Comic-style headings with font-black uppercase
- Action word labels (POW, BANG, WOW)
- Hover effects that shift shadow offset`}]},{slug:"solarpunk",name:"太阳朋克",nameEn:"Solarpunk",description:"乐观的生态未来主义风格，融合自然与科技的和谐美学。有机曲线、植物元素、温暖渐变、柔和圆角。适合环保、可持续发展、绿色科技产品。",cover:"/styles/solarpunk.svg",styleType:"visual",tags:["modern","expressive"],category:"expressive",colors:{primary:"#4ade80",secondary:"#fbbf24",accent:["#38bdf8","#a16207","#fef3c7"]},keywords:["生态未来","可持续","绿色科技","植物","太阳能","有机","自然","乐观"],philosophy:`Solarpunk 风格源自对未来的乐观想象，描绘人与自然和谐共存的世界。通过有机曲线、植物元素和温暖色调传递希望与生机。

核心理念：
- 自然融合：将植物与科技元素有机结合
- 温暖色调：叶绿、金黄、天蓝构成温暖调色板
- 有机曲线：使用柔和圆角和流动线条
- 乐观情感：明亮、清新、充满生命力的视觉语言`,doList:["背景使用温暖浅色 bg-[#fef3c7] 或 bg-green-50","主色调使用叶绿 text-green-400 或 bg-green-400","强调色使用金黄 text-amber-400 或 bg-amber-400","使用大圆角 rounded-2xl 或 rounded-3xl 体现有机感","使用温暖渐变 bg-gradient-to-br from-green-400 to-amber-400","卡片添加植物主题装饰元素","使用柔和阴影 shadow-lg shadow-green-200/50"],dontList:["禁止使用纯黑背景或暗色主题","禁止使用尖锐直角 rounded-none","禁止使用冷酷工业风元素","禁止使用高对比度霓虹发光效果","禁止使用反乌托邦、废土元素","禁止使用灰暗压抑的配色方案"],components:{button:{name:"按钮",description:"Solarpunk 风格的有机自然按钮",code:`// Leaf Primary
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
</button>`},card:{name:"卡片",description:"Solarpunk 风格的自然生态卡片",code:`<div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-3xl p-6 shadow-lg shadow-green-100/50 hover:shadow-xl hover:shadow-green-200/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
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
</div>`},input:{name:"输入框",description:"Solarpunk 风格的输入框",code:`<div className="space-y-2">
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
</div>`}},globalCss:`/* Solarpunk Global Styles */
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
}`,aiRules:`STYLE: Solarpunk
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
- Smooth transitions duration-300`,examplePrompts:[{title:"生态仪表盘",titleEn:"Eco Dashboard",description:"生成太阳朋克风格的绿色能源仪表盘",descriptionEn:"Generate a solarpunk green energy dashboard",prompt:`Create an eco dashboard using Solarpunk style:
- Light warm background with organic gradient accents
- Cards with rounded-3xl corners and green borders
- Energy stats with leaf green and solar gold colors
- Plant-themed icons (Leaf, Sun, Sprout) from Lucide
- Progress bars with green-to-amber gradients
- Hover effects with shadow enhancement`}]},{slug:"jrpg",name:"日式RPG",nameEn:"JRPG",description:"经典日式 RPG 菜单与对话框美学，斜面边框、渐变背景、状态栏、华丽框架。适合游戏界面、互动叙事、奇幻风格产品。",cover:"/styles/jrpg.svg",styleType:"visual",tags:["expressive","retro"],category:"expressive",colors:{primary:"#1e40af",secondary:"#0f172a",accent:["#fbbf24","#f0f9ff","#22c55e"]},keywords:["RPG","菜单","属性","道具栏","奇幻","对话框","血条","经验值"],philosophy:`JRPG 风格源自经典日式角色扮演游戏的菜单与 UI 设计，通过斜面边框、渐变背景和精致框架重现复古游戏体验。

核心理念：
- 斜面边框：使用内外阴影和渐变模拟立体按钮与面板
- 深色基底：深海军蓝背景搭配金色与水晶白高光
- 状态可视化：HP/MP/EXP 条形图直观展示数值
- 华丽装饰：边角纹饰和框架增强奇幻世界感`,doList:["背景使用深海军蓝 bg-[#0f172a] 或 bg-slate-900","使用 border-2 border-[#1e40af] 搭配内阴影模拟斜面效果","金色高亮文字 text-[#fbbf24] 用于标题和重要信息","使用渐变背景 bg-gradient-to-b from-blue-900 to-slate-900","状态栏使用 bg-[#22c55e] 表示 HP，bg-blue-500 表示 MP","卡片面板使用双层边框 ring-1 ring-blue-400/20 border-2 border-blue-800","按钮使用内阴影 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] 模拟凸起"],dontList:["禁止使用极简扁平风格（无边框、无阴影）","禁止使用白色或浅色背景","禁止仅使用现代无衬线字体（需搭配衬线或像素字体）","禁止使用圆角过大 rounded-full 的按钮","禁止使用透明/无底色的面板","禁止使用低对比度配色"],components:{button:{name:"按钮",description:"RPG 风格的菜单按钮，斜面立体效果",code:`// RPG Primary Button
<button className="px-6 py-3 bg-gradient-to-b from-blue-700 to-blue-900 border-2 border-blue-500 rounded-md text-[#f0f9ff] font-bold tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_4px_rgba(0,0,0,0.5)] hover:from-blue-600 hover:to-blue-800 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-200">
  Attack
</button>

// RPG Gold Button
<button className="px-6 py-3 bg-gradient-to-b from-yellow-500 to-yellow-700 border-2 border-yellow-400 rounded-md text-slate-900 font-bold tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.5)] hover:from-yellow-400 hover:to-yellow-600 transition-all duration-200">
  Confirm
</button>

// RPG Outline Button
<button className="px-6 py-3 bg-slate-900/80 border-2 border-blue-400/60 rounded-md text-blue-300 font-bold tracking-wide shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:border-blue-300 hover:text-blue-200 hover:bg-slate-800/80 transition-all duration-200">
  Cancel
</button>`},card:{name:"卡片",description:"RPG 菜单面板，双层边框装饰",code:`<div className="bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-blue-700 rounded-md p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)] ring-1 ring-blue-400/20 relative">
  {/* Corner decoration */}
  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#fbbf24] rounded-tl-sm" />
  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#fbbf24] rounded-tr-sm" />
  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#fbbf24] rounded-bl-sm" />
  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#fbbf24] rounded-br-sm" />

  <div className="relative">
    <div className="flex items-center gap-2 mb-4 border-b border-blue-700/50 pb-3">
      <h3 className="text-[#fbbf24] font-bold tracking-wide text-sm uppercase">Character Status</h3>
    </div>
    <div className="space-y-3">
      <div className="flex justify-between text-[#f0f9ff] text-sm">
        <span>HP</span>
        <span>234 / 500</span>
      </div>
      <div className="w-full h-3 bg-slate-950 rounded-sm border border-slate-600 overflow-hidden">
        <div className="h-full w-[47%] bg-gradient-to-r from-green-500 to-green-400 rounded-sm shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
      </div>
    </div>
  </div>
</div>`},input:{name:"输入框",description:"RPG 风格的输入框，菜单选择样式",code:`<div className="space-y-2">
  <label className="block text-[#fbbf24] font-bold text-xs uppercase tracking-wider">Player Name</label>
  <div className="relative">
    <input
      type="text"
      className="w-full px-4 py-3 bg-slate-900 border-2 border-blue-700 rounded-md text-[#f0f9ff] placeholder:text-blue-300/30 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all duration-200"
      placeholder="Enter your name..."
    />
    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#fbbf24] text-xs">|</div>
  </div>
</div>`}},globalCss:`/* JRPG Global Styles */
@layer base {
  body {
    @apply bg-[#0f172a] text-[#f0f9ff] antialiased;
  }

  h1, h2, h3 {
    color: #fbbf24;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  ::selection {
    @apply bg-blue-700 text-white;
  }
}

@keyframes hp-pulse {
  0%, 100% { box-shadow: 0 0 4px rgba(34, 197, 94, 0.3); }
  50% { box-shadow: 0 0 8px rgba(34, 197, 94, 0.6); }
}`,aiRules:`STYLE: JRPG
TYPE: Classic Japanese RPG menu interface

MUST USE:
- Dark background: bg-[#0f172a] or bg-slate-900
- Beveled borders: border-2 with inset shadows
- Gold accent text: text-[#fbbf24]
- Crystal white text: text-[#f0f9ff]
- Gradient panels: bg-gradient-to-b from-slate-800 to-slate-900
- HP/MP bars with colored gradients
- Corner decorations on panels
- Shadow depth: shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]

MUST AVOID:
- White/light backgrounds
- Flat minimal design without borders
- Modern sans-serif only typography
- rounded-full buttons
- Transparent/borderless panels
- Low contrast color combinations

COLOR RULES:
- Primary: Royal Blue (#1e40af)
- Accent: Gold (#fbbf24)
- Background: Dark Navy (#0f172a)
- Text: Crystal White (#f0f9ff)
- HP: Green (#22c55e)
- MP: Blue (#3b82f6)
- Borders: Blue shades with glow

SPECIAL EFFECTS:
- Inset shadows for beveled/raised look
- Corner ornaments on panels
- Gradient overlays for depth
- Stat bar animations`,examplePrompts:[{title:"角色状态界面",titleEn:"Character Status Screen",description:"生成 RPG 风格角色属性面板",descriptionEn:"Generate RPG character status panel",prompt:`Create a character status screen using JRPG style:
- Dark navy background with gradient
- Character info panel with gold title and corner decorations
- HP/MP/EXP stat bars with colored gradients
- Equipment slots with beveled borders
- Action buttons with inset shadow depth
- Stats grid showing STR, DEF, INT, SPD values`}]},{slug:"asymmetric-grid",name:"非对称网格",nameEn:"Asymmetric Grid",description:"打破传统对称网格的布局方式，通过不规则的列宽、重叠元素和视觉张力创造动态有趣的页面结构，适合创意作品集、艺术展览和品牌展示。",cover:"/styles/asymmetric-grid.svg",styleType:"layout",tags:["modern","expressive","high-contrast"],compatibleWith:["editorial","neo-brutalist","geometric-bold","swiss-style"],category:"modern",colors:{primary:"#0f0f0f",secondary:"#ffffff",accent:["#ff3366","#00d4ff","#ffcc00"]},keywords:["非对称","网格","不规则","动态","张力","重叠","创意"],philosophy:`Asymmetric Grid 打破传统网格的均匀分布，通过不等宽列、元素重叠和留白对比创造视觉张力。

核心理念：
- 打破对称：故意使用不等宽的列和行
- 视觉张力：通过大小对比和位置偏移创造动感
- 留白即内容：大面积留白与密集区域形成对比
- 层次重叠：允许元素相互重叠产生深度感`,doList:["使用 CSS Grid 的 grid-template-columns 定义不等宽列","允许元素跨越多列多行 col-span-2 row-span-3","使用 -translate 和 z-index 创造重叠效果","保持足够的留白与密集区域对比","使用大小差异明显的字体层级","让图片和内容块突破网格边界"],dontList:["禁止所有列宽完全相等","禁止元素整齐对齐毫无变化","禁止忽略移动端的响应式调整","禁止过度杂乱失去可读性","禁止所有元素大小相近"],components:{button:{name:"按钮",description:"动态偏移效果的按钮",code:`<button className="
  px-8 py-4
  bg-[#0f0f0f] text-white
  font-bold uppercase tracking-widest
  hover:-translate-x-1 hover:-translate-y-1
  hover:shadow-[4px_4px_0px_#ff3366]
  transition-all duration-200
">
  Explore
</button>`},card:{name:"不规则卡片",description:"可重叠的不规则内容卡片",code:`<div className="
  relative
  p-8
  bg-white
  border-2 border-[#0f0f0f]
  -rotate-1
  hover:rotate-0
  transition-transform duration-300
  z-10
">
  <span className="text-xs uppercase tracking-widest text-gray-500">Featured</span>
  <h3 className="text-3xl font-bold mt-2 mb-4">Breaking the Grid</h3>
  <p className="text-gray-600">Asymmetry creates visual tension and interest.</p>
</div>`},input:{name:"输入框",description:"带偏移标签的输入框",code:`<div className="relative">
  <label className="
    absolute -top-3 left-4
    bg-white px-2
    text-xs uppercase tracking-widest
    text-[#0f0f0f]
  ">Email</label>
  <input
    type="email"
    className="
      w-full px-4 py-4
      border-2 border-[#0f0f0f]
      bg-transparent
      focus:border-[#ff3366]
      focus:outline-none
      transition-colors
    "
    placeholder="your@email.com"
  />
</div>`},nav:{name:"非对称导航",description:"偏移效果的导航栏",code:`<nav className="
  flex items-center justify-between
  px-8 py-6
  border-b-2 border-[#0f0f0f]
">
  <span className="text-2xl font-bold tracking-tighter">ASYMM.</span>
  <div className="flex gap-8">
    <a href="#" className="uppercase tracking-widest text-sm hover:text-[#ff3366] transition-colors">Work</a>
    <a href="#" className="uppercase tracking-widest text-sm hover:text-[#ff3366] transition-colors">About</a>
    <a href="#" className="uppercase tracking-widest text-sm hover:text-[#ff3366] transition-colors">Contact</a>
  </div>
</nav>`},hero:{name:"非对称 Hero",description:"打破对称的主视觉区域",code:`<div className="
  grid grid-cols-12
  min-h-[80vh]
  relative
">
  <div className="col-span-8 bg-[#0f0f0f] p-16 flex flex-col justify-end">
    <h1 className="text-8xl font-bold text-white leading-none">
      CREATIVE<br/>TENSION
    </h1>
  </div>
  <div className="col-span-4 bg-[#ff3366] p-8 flex items-center">
    <p className="text-white text-xl">Breaking symmetry to create visual interest</p>
  </div>
  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-[#ffcc00] p-6 z-20">
    <span className="text-sm uppercase tracking-widest font-bold">Scroll to explore</span>
  </div>
</div>`}},globalCss:`/* Asymmetric Grid 全局样式 */
.asymmetric-grid {
  --ag-black: #0f0f0f;
  --ag-accent: #ff3366;
  --ag-secondary: #00d4ff;
  --ag-tertiary: #ffcc00;
}`,aiRules:`你是 Asymmetric Grid 布局专家。生成代码必须遵守：

## 布局规则
- 使用 CSS Grid 12列系统，但列宽必须不相等
- 允许元素重叠，使用 z-index 控制层级
- 使用 -translate 创造偏移效果
- 保持视觉张力：大面积留白与密集区域对比

## 禁止
- 所有列宽相等的对称布局
- 圆角设计（rounded-lg, rounded-xl）
- 柔和阴影（shadow-sm, shadow-md）`},{slug:"parallax-sections",name:"视差滚动",nameEn:"Parallax Sections",description:"通过固定背景和滚动内容创造深度视差效果的沉浸式布局，每个全屏区块都有独立的背景层，适合品牌故事、产品展示和沉浸式体验页面。",cover:"/styles/parallax-sections.svg",styleType:"layout",tags:["modern","expressive","responsive"],compatibleWith:["hero-fullscreen","full-page-scroll","editorial","modern-gradient"],category:"modern",colors:{primary:"#1e3a5f",secondary:"#f8fafc",accent:["#3b82f6","#93c5fd","#0ea5e9"]},keywords:["视差","滚动","深度","层次","沉浸","固定背景","全屏"],philosophy:`Parallax Sections 通过背景与前景的差速滚动创造深度感，让用户在滚动中体验层次分明的视觉旅程。

核心理念：
- 深度层次：背景固定，内容滚动，创造三维空间感
- 沉浸体验：每个区块独立成景，像翻阅画册
- 节奏控制：通过全屏区块控制用户的浏览节奏
- 视觉焦点：每个区块突出一个主要信息点`,doList:["使用 bg-fixed 创造固定背景视差效果","每个区块使用 min-h-screen 全屏高度","内容区使用半透明背景 bg-white/90 增强可读性","使用 sticky top-0 创造粘性滚动效果","背景图片使用 bg-cover bg-center 保证比例","过渡区块使用渐变或模糊效果"],dontList:["禁止背景图片和内容对比度不足","禁止区块高度不一致破坏节奏","禁止过多视差层级造成性能问题","禁止忽略移动端的视差降级处理","禁止内容过于密集破坏焦点"],components:{button:{name:"按钮",description:"带模糊背景的浮动按钮",code:`<button className="
  px-8 py-4
  bg-white/20 backdrop-blur-md
  text-white
  rounded-full
  font-medium
  border border-white/30
  hover:bg-white/30
  transition-all duration-300
">
  Explore More
</button>`},card:{name:"内容卡片",description:"半透明背景的内容卡片",code:`<div className="
  p-8 md:p-12
  bg-white/90 backdrop-blur-sm
  rounded-2xl
  shadow-xl
  max-w-2xl
">
  <h3 className="text-3xl font-bold text-[#1e3a5f] mb-4">Section Title</h3>
  <p className="text-gray-600 leading-relaxed">
    Scroll to reveal more content. Each section creates a unique visual moment.
  </p>
</div>`},input:{name:"输入框",description:"模糊背景的输入框",code:`<input
  type="email"
  className="
    w-full px-6 py-4
    bg-white/20 backdrop-blur-md
    text-white placeholder-white/60
    rounded-full
    border border-white/30
    focus:border-white/60 focus:outline-none
    transition-colors
  "
  placeholder="Enter your email"
/>`},nav:{name:"浮动导航",description:"透明模糊背景的固定导航",code:`<nav className="
  fixed top-0 left-0 right-0 z-50
  px-8 py-4
  bg-white/10 backdrop-blur-lg
  border-b border-white/10
">
  <div className="flex items-center justify-between max-w-7xl mx-auto">
    <span className="text-xl font-bold text-white">PARALLAX</span>
    <div className="flex gap-8">
      <a href="#" className="text-white/80 hover:text-white transition-colors">Story</a>
      <a href="#" className="text-white/80 hover:text-white transition-colors">Features</a>
      <a href="#" className="text-white/80 hover:text-white transition-colors">Contact</a>
    </div>
  </div>
</nav>`},hero:{name:"视差 Hero",description:"全屏固定背景的主视觉",code:`<div className="
  relative
  min-h-screen
  bg-fixed bg-cover bg-center
  flex flex-col items-center justify-center
" style={{ backgroundImage: 'url(/images/parallax-hero.jpg)' }}>
  <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a5f]/80 via-[#1e3a5f]/40 to-transparent" />
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
      Immersive<br/>Experience
    </h1>
    <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
      Scroll down to explore the depth of parallax
    </p>
    <div className="animate-bounce mt-12">
      <svg className="w-8 h-8 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </div>
</div>`}},globalCss:`/* Parallax Sections 全局样式 */
.parallax-sections {
  --ps-primary: #1e3a5f;
  --ps-light: #93c5fd;
  --ps-accent: #3b82f6;
}

.parallax-section {
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}`,aiRules:`你是 Parallax Sections 布局专家。生成代码必须遵守：

## 布局规则
- 每个区块使用 min-h-screen 全屏高度
- 背景使用 bg-fixed bg-cover bg-center
- 内容使用半透明背景 bg-white/90 backdrop-blur
- 导航使用 fixed + backdrop-blur-lg

## 禁止
- 使用 bg-scroll（破坏视差效果）
- 区块高度不一致
- 背景与内容对比度不足`},{slug:"warm-dashboard",name:"暖色仪表盘",nameEn:"Warm Dashboard",description:"温暖柔和的仪表盘设计风格，采用珊瑚/赤陶色背景、奶油白卡片、柔和阴影，营造舒适专业的数据展示体验。",cover:"/styles/warm-dashboard.svg",styleType:"visual",tags:["modern","minimal"],category:"modern",colors:{primary:"#d4a088",secondary:"#faf8f5",accent:["#4a9d9a","#e8b86d","#c17767","#6b8e8e"]},keywords:["暖色","仪表盘","珊瑚色","赤陶","奶油白","数据可视化","舒适"],philosophy:`Warm Dashboard（暖色仪表盘）是一种温暖、专业的界面设计风格，通过暖色调背景和柔和的卡片设计，让数据展示更加亲和友好。

核心理念：
- 温暖舒适：珊瑚/赤陶色背景传递温暖感
- 清晰层次：奶油白卡片在暖色背景上形成清晰对比
- 柔和触感：大圆角、漫射阴影营造柔软视觉
- 专业可读：深灰文字确保数据可读性
- 点缀色彩：青绿、金黄作为数据高亮和图表色`,doList:["背景使用暖色调 bg-[#d4a088] 或 bg-[#c9967a]","卡片使用奶油白 bg-[#faf8f5] 或 bg-white","使用大圆角 rounded-2xl 或 rounded-3xl","使用柔和漫射阴影 shadow-xl shadow-black/10","图表使用青绿 #4a9d9a 和金黄 #e8b86d 配色","文字使用深灰 text-gray-800 或 text-gray-600","侧边栏使用半透明白色 bg-white/80 backdrop-blur","数据高亮使用点缀色圆形背景"],dontList:["禁止使用冷色背景（蓝色、紫色）","禁止使用纯黑文字 text-black","禁止使用尖锐边角 rounded-none rounded-sm","禁止使用硬边阴影","禁止使用高饱和度霓虹色","禁止使用粗边框 border-2 及以上"],components:{button:{name:"按钮",description:"暖色仪表盘风格按钮，柔和圆角配合点缀色",code:`{/* 主按钮 - 青绿色 */}
<button className="
  px-5 py-2.5 md:px-6 md:py-3
  bg-[#4a9d9a] text-white
  rounded-xl
  shadow-lg shadow-[#4a9d9a]/25
  hover:shadow-xl hover:shadow-[#4a9d9a]/30
  hover:-translate-y-0.5
  transition-all duration-200
  font-medium text-sm md:text-base
">
  View Report
</button>

{/* 次按钮 - 奶油白 */}
<button className="
  px-5 py-2.5 md:px-6 md:py-3
  bg-white text-gray-700
  rounded-xl
  shadow-lg shadow-black/5
  hover:shadow-xl hover:-translate-y-0.5
  transition-all duration-200
  font-medium text-sm md:text-base
">
  Export
</button>

{/* 强调按钮 - 珊瑚色 */}
<button className="
  px-5 py-2.5 md:px-6 md:py-3
  bg-[#c17767] text-white
  rounded-xl
  shadow-lg shadow-[#c17767]/25
  hover:shadow-xl hover:-translate-y-0.5
  transition-all duration-200
  font-medium text-sm md:text-base
">
  Upgrade
</button>`},card:{name:"卡片",description:"奶油白卡片，大圆角柔和阴影",code:`<div className="
  bg-[#faf8f5]
  rounded-2xl md:rounded-3xl
  shadow-xl shadow-black/8
  p-5 md:p-6 lg:p-8
  hover:shadow-2xl hover:-translate-y-1
  transition-all duration-300
">
  {/* 统计数据 */}
  <div className="flex items-center justify-between mb-4">
    <span className="text-gray-500 text-sm font-medium">Views</span>
    <span className="w-2 h-2 rounded-full bg-[#4a9d9a]" />
  </div>
  <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">27,6m</p>
  <p className="text-sm text-gray-400">+12% from last month</p>
</div>`},input:{name:"输入框",description:"柔和背景的输入框",code:`<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-600">Search</label>
  <input
    type="text"
    placeholder="Search reports..."
    className="
      w-full px-4 py-3
      bg-white
      border border-gray-200
      rounded-xl
      text-gray-800
      placeholder:text-gray-400
      focus:outline-none focus:ring-2 focus:ring-[#4a9d9a]/30
      focus:border-[#4a9d9a]
      transition-all duration-200
    "
  />
</div>`},nav:{name:"侧边栏",description:"半透明白色侧边栏导航",code:`<aside className="
  w-60 h-screen
  bg-white/80 backdrop-blur-xl
  border-r border-gray-200/50
  p-6
  flex flex-col
">
  {/* Logo */}
  <div className="flex items-center gap-2 mb-8">
    <div className="w-8 h-8 bg-[#4a9d9a] rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-sm">C</span>
    </div>
    <span className="font-semibold text-gray-800">Crowz</span>
  </div>

  {/* Avatar */}
  <div className="text-center mb-8">
    <div className="w-20 h-20 rounded-full bg-[#d4a088] mx-auto mb-3 overflow-hidden">
      <img src="/avatar.jpg" alt="User" className="w-full h-full object-cover" />
    </div>
    <p className="font-semibold text-gray-800">Robert Grant</p>
    <p className="text-sm text-gray-500">Marketing Director</p>
  </div>

  {/* Navigation */}
  <nav className="flex-1">
    <a href="#" className="
      flex items-center gap-3 px-4 py-3
      bg-[#faf8f5] rounded-xl
      text-gray-800 font-medium
      mb-2
    ">
      <span className="w-2 h-2 rounded-full bg-[#c17767]" />
      Dashboard
    </a>
    <a href="#" className="
      flex items-center gap-3 px-4 py-3
      text-gray-500
      hover:bg-[#faf8f5] hover:text-gray-800
      rounded-xl
      transition-colors duration-200
    ">
      Insights
    </a>
    <a href="#" className="
      flex items-center gap-3 px-4 py-3
      text-gray-500
      hover:bg-[#faf8f5] hover:text-gray-800
      rounded-xl
      transition-colors duration-200
    ">
      Reports
    </a>
  </nav>
</aside>`},hero:{name:"仪表盘主区域",description:"暖色背景的仪表盘主内容区",code:`<main className="
  flex-1
  bg-[#d4a088]
  p-6 md:p-8 lg:p-10
  min-h-screen
">
  {/* 标题栏 */}
  <div className="flex items-center justify-between mb-8">
    <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
    <div className="flex items-center gap-3">
      <button className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
        <Bell className="w-5 h-5" />
      </button>
      <button className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
        <Settings className="w-5 h-5" />
      </button>
    </div>
  </div>

  {/* 统计卡片网格 */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
    <div className="bg-[#faf8f5] rounded-2xl p-6 shadow-xl shadow-black/8">
      <p className="text-gray-500 text-sm mb-2">Views</p>
      <p className="text-3xl font-bold text-gray-800">27,6m</p>
    </div>
    <div className="bg-[#faf8f5] rounded-2xl p-6 shadow-xl shadow-black/8">
      <p className="text-gray-500 text-sm mb-2">Followers</p>
      <p className="text-3xl font-bold text-gray-800">219,3k</p>
    </div>
    <div className="bg-[#faf8f5] rounded-2xl p-6 shadow-xl shadow-black/8">
      <p className="text-gray-500 text-sm mb-2">Reposts</p>
      <p className="text-3xl font-bold text-gray-800">1,5k</p>
    </div>
  </div>

  {/* 主内容卡片 */}
  <div className="bg-[#faf8f5] rounded-3xl p-6 md:p-8 shadow-xl shadow-black/8">
    <h2 className="text-xl font-semibold text-gray-800 mb-6">Activity</h2>
    {/* 图表区域 */}
    <div className="h-64 flex items-end gap-2">
      {/* 简化的柱状图 */}
      <div className="flex-1 bg-[#e8b86d]/20 rounded-t-lg" style={{height: '40%'}} />
      <div className="flex-1 bg-[#e8b86d]/20 rounded-t-lg" style={{height: '60%'}} />
      <div className="flex-1 bg-[#e8b86d]/20 rounded-t-lg" style={{height: '45%'}} />
      <div className="flex-1 bg-[#e8b86d] rounded-t-lg" style={{height: '80%'}} />
      <div className="flex-1 bg-[#e8b86d]/20 rounded-t-lg" style={{height: '70%'}} />
    </div>
  </div>
</main>`},footer:{name:"底部栏",description:"渠道统计底部卡片",code:`<div className="
  bg-gradient-to-r from-[#e8f4f4] to-[#f0f7f7]
  rounded-2xl md:rounded-3xl
  p-5 md:p-6
  shadow-lg shadow-black/5
">
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div>
      <h3 className="font-semibold text-gray-800 mb-1">Channels</h3>
      <p className="text-sm text-gray-500">Your channels statistics for 1 week period.</p>
    </div>
    <div className="flex flex-wrap gap-3">
      <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm">
        <div className="w-8 h-8 bg-[#ea4c89] rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">Dr</span>
        </div>
        <div>
          <p className="text-xs text-gray-500">Dribbble</p>
          <p className="text-sm font-semibold text-[#4a9d9a]">+2%</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm">
        <div className="w-8 h-8 bg-[#0057ff] rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">Be</span>
        </div>
        <div>
          <p className="text-xs text-gray-500">Behance</p>
          <p className="text-sm font-semibold text-[#c17767]">-7%</p>
        </div>
      </div>
      <button className="bg-[#4a9d9a] text-white rounded-xl px-4 py-2 font-medium text-sm">
        Full Stats
      </button>
    </div>
  </div>
</div>`}},globalCss:`/* Warm Dashboard 全局样式 */
:root {
  --warm-bg: #d4a088;
  --warm-bg-light: #e0b8a4;
  --warm-card: #faf8f5;
  --warm-teal: #4a9d9a;
  --warm-gold: #e8b86d;
  --warm-coral: #c17767;
  --warm-sage: #6b8e8e;
}

body {
  background: var(--warm-bg);
  color: #374151;
}

/* 卡片基础样式 */
.warm-card {
  background: var(--warm-card);
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08);
}

/* 侧边栏毛玻璃 */
.warm-sidebar {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* 数据高亮 */
.warm-highlight {
  color: var(--warm-teal);
}

.warm-highlight-negative {
  color: var(--warm-coral);
}

/* 图表颜色 */
.warm-chart-primary {
  fill: var(--warm-gold);
}

.warm-chart-secondary {
  fill: var(--warm-teal);
}`,aiRules:`你是一个 Warm Dashboard（暖色仪表盘）设计风格的前端开发专家。

## 核心特征

背景：
- 主背景：bg-[#d4a088] 珊瑚/赤陶色
- 可选变体：bg-[#c9967a] 更深、bg-[#e0b8a4] 更浅

卡片：
- 背景：bg-[#faf8f5] 奶油白 或 bg-white
- 圆角：rounded-2xl 或 rounded-3xl
- 阴影：shadow-xl shadow-black/8（柔和漫射）
- hover：hover:shadow-2xl hover:-translate-y-1

配色系统：
- 青绿（主要强调）：#4a9d9a - 用于主按钮、正向数据
- 金黄（图表主色）：#e8b86d - 用于图表、高亮
- 珊瑚（次要强调）：#c17767 - 用于负向数据、警告
- 灰绿（辅助）：#6b8e8e - 用于次要元素

文字：
- 标题：text-gray-800 font-semibold/bold
- 正文：text-gray-600
- 次要：text-gray-500 text-gray-400
- 暖背景上：text-white

## 布局

侧边栏：
- bg-white/80 backdrop-blur-xl
- 宽度 w-60
- 包含 logo、头像、导航

主区域：
- bg-[#d4a088] 暖色背景
- p-6 md:p-8 lg:p-10
- 统计卡片网格 + 图表卡片

## 禁止

- 冷色背景（蓝、紫、灰）
- 纯黑文字
- 尖锐边角
- 硬边阴影
- 霓虹色
- 粗边框`,examplePrompts:[{title:"社交媒体数据仪表盘",titleEn:"Social Media Analytics Dashboard",description:"展示粉丝、互动、增长等数据",descriptionEn:"Display followers, engagement, growth metrics",prompt:`用 Warm Dashboard 风格创建一个社交媒体分析仪表盘，要求：

## 布局
- 左侧：半透明白色侧边栏 bg-white/80 backdrop-blur-xl
- 右侧：珊瑚色主区域 bg-[#d4a088]

## 侧边栏
- Logo + 品牌名
- 用户头像（圆形，珊瑚色边框）
- 导航菜单：Dashboard、Insights、Reports、Comments、Channels
- 当前页高亮：bg-[#faf8f5] + 左侧小圆点

## 主区域
- 顶部：标题 + 通知/设置图标
- 统计卡片行（3列）：Views、Followers、Reposts
- 活动图表卡片：折线图，金黄色 #e8b86d
- Top Performers 列表
- 底部渠道统计条

## 数据可视化
- 正向数据：text-[#4a9d9a]
- 负向数据：text-[#c17767]
- 图表主色：#e8b86d`},{title:"项目管理仪表盘",titleEn:"Project Management Dashboard",description:"任务进度、团队成员、截止日期",descriptionEn:"Task progress, team members, deadlines",prompt:`用 Warm Dashboard 风格创建一个项目管理仪表盘，要求：

## 背景
- 主区域：bg-[#d4a088]
- 卡片：bg-[#faf8f5] rounded-3xl shadow-xl

## 组件
1. 项目概览卡片：进度环形图、完成百分比
2. 任务列表：复选框、优先级标签、截止日期
3. 团队成员：头像堆叠、在线状态
4. 时间线：垂直时间轴、里程碑节点

## 配色
- 完成状态：#4a9d9a 青绿
- 进行中：#e8b86d 金黄
- 延期：#c17767 珊瑚
- 未开始：#9ca3af 灰色`},{title:"财务数据仪表盘",titleEn:"Financial Dashboard",description:"收入支出、趋势图表、预算对比",descriptionEn:"Income expenses, trend charts, budget comparison",prompt:`用 Warm Dashboard 风格创建一个个人财务仪表盘，要求：

## 布局
- 珊瑚色背景 bg-[#d4a088]
- 奶油白卡片 bg-[#faf8f5]

## 数据卡片
1. 总资产卡片：大数字、增长趋势
2. 收入/支出对比：柱状图
3. 分类饼图：餐饮、交通、娱乐等
4. 近期交易列表：图标、金额、日期

## 配色规则
- 收入/正向：#4a9d9a
- 支出/负向：#c17767
- 图表填充：#e8b86d
- 次要数据：#6b8e8e`}]},{slug:"neon-gradient",name:"霓虹渐变",nameEn:"Neon Gradient",description:"深色背景上的鲜艳渐变卡片，配合粗彩色边框和霓虹发光效果，适合科技产品、SaaS 着陆页、年轻化品牌。",cover:"/styles/neon-gradient.svg",styleType:"visual",tags:["expressive"],category:"expressive",colors:{primary:"#a855f7",secondary:"#0f0a1e",accent:["#f472b6","#22d3ee","#a3e635","#fbbf24","#fb7185"]},keywords:["霓虹","渐变","深色","发光","科技","SaaS","年轻化"],philosophy:`Neon Gradient（霓虹渐变）是一种大胆、现代的设计风格，在深色背景上使用鲜艳的渐变色卡片和粗彩色边框，营造出未来感和科技感。

核心理念：
- 深色画布：深紫/深蓝背景作为霓虹色的完美衬托
- 鲜艳渐变：紫粉、青绿、黄绿等高饱和度渐变填充
- 粗彩色边框：3-4px 的亮色边框增强视觉冲击
- 发光效果：box-shadow 模拟霓虹灯光晕
- 漂浮元素：星星、火箭、几何图形作为装饰

适用场景：SaaS 产品、开发者工具、游戏平台、年轻化品牌`,doList:["使用深色背景 bg-[#0f0a1e] 或 bg-slate-900","卡片使用渐变填充 bg-gradient-to-br from-purple-500 to-pink-500","添加粗彩色边框 border-4 border-yellow-400","使用圆角 rounded-2xl 或 rounded-3xl","添加发光阴影 shadow-[0_0_30px_rgba(168,85,247,0.5)]","标题使用渐变文字或纯白色","装饰元素使用 Lucide 图标（Star, Rocket, Sparkles）","按钮使用渐变背景 + 发光效果"],dontList:["禁止使用浅色背景","禁止使用低饱和度颜色","禁止使用细边框 border 或 border-2","禁止使用灰色调卡片","禁止省略发光效果","禁止使用 emoji（用 Lucide 图标替代）"],components:{button:{name:"按钮",description:"霓虹渐变按钮，带发光效果",code:`{/* 主按钮 - 青粉渐变 */}
<button className="
  px-6 py-3 md:px-8 md:py-4
  bg-gradient-to-r from-cyan-400 to-pink-500
  text-white font-bold
  rounded-xl
  border-2 border-white/20
  shadow-[0_0_20px_rgba(236,72,153,0.5)]
  hover:shadow-[0_0_30px_rgba(236,72,153,0.7)]
  hover:scale-105
  transition-all duration-300
  text-sm md:text-base
">
  开始免费试用
</button>

{/* 次按钮 - 透明边框 */}
<button className="
  px-6 py-3 md:px-8 md:py-4
  bg-transparent
  text-white font-bold
  rounded-xl
  border-2 border-cyan-400
  hover:bg-cyan-400/10
  hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]
  transition-all duration-300
  text-sm md:text-base
">
  观看演示
</button>

{/* 图标按钮 */}
<button className="
  w-12 h-12
  bg-gradient-to-br from-purple-500 to-pink-500
  rounded-xl
  border-2 border-yellow-400
  shadow-[0_0_15px_rgba(250,204,21,0.4)]
  hover:scale-110
  transition-all duration-300
  flex items-center justify-center
">
  <ArrowRight className="w-5 h-5 text-white" />
</button>`},card:{name:"卡片",description:"渐变填充卡片，粗彩色边框",code:`{/* 紫粉渐变卡片 */}
<div className="
  bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500
  rounded-2xl md:rounded-3xl
  border-4 border-yellow-400
  p-6 md:p-8
  shadow-[0_0_30px_rgba(168,85,247,0.4)]
  hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]
  hover:-translate-y-2
  transition-all duration-300
">
  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
    <Zap className="w-6 h-6 text-white" />
  </div>
  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">快点</h3>
  <p className="text-white/80 text-sm md:text-base">极速响应，毫秒级延迟</p>
</div>

{/* 青绿渐变卡片 */}
<div className="
  bg-gradient-to-br from-cyan-400 via-teal-500 to-green-500
  rounded-2xl md:rounded-3xl
  border-4 border-pink-400
  p-6 md:p-8
  shadow-[0_0_30px_rgba(34,211,238,0.4)]
  hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]
  hover:-translate-y-2
  transition-all duration-300
">
  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
    <Shield className="w-6 h-6 text-white" />
  </div>
  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">安全</h3>
  <p className="text-white/80 text-sm md:text-base">企业级安全保障</p>
</div>

{/* 粉红渐变卡片 */}
<div className="
  bg-gradient-to-br from-pink-500 via-rose-500 to-red-500
  rounded-2xl md:rounded-3xl
  border-4 border-cyan-400
  p-6 md:p-8
  shadow-[0_0_30px_rgba(236,72,153,0.4)]
  hover:shadow-[0_0_40px_rgba(236,72,153,0.6)]
  hover:-translate-y-2
  transition-all duration-300
">
  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
    <Users className="w-6 h-6 text-white" />
  </div>
  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">团队</h3>
  <p className="text-white/80 text-sm md:text-base">无缝协作体验</p>
</div>`},input:{name:"输入框",description:"深色背景输入框，发光边框",code:`<div className="relative">
  <input
    type="text"
    placeholder="输入你的邮箱..."
    className="
      w-full
      px-5 py-4
      bg-white/5
      border-2 border-purple-500/50
      rounded-xl
      text-white
      placeholder:text-white/40
      focus:outline-none
      focus:border-cyan-400
      focus:shadow-[0_0_20px_rgba(34,211,238,0.3)]
      transition-all duration-300
    "
  />
  <button className="
    absolute right-2 top-1/2 -translate-y-1/2
    px-4 py-2
    bg-gradient-to-r from-cyan-400 to-purple-500
    rounded-lg
    text-white font-medium text-sm
    hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]
    transition-all duration-300
  ">
    订阅
  </button>
</div>`},nav:{name:"导航栏",description:"深色透明导航，发光按钮",code:`<nav className="
  fixed top-0 left-0 right-0 z-50
  bg-[#0f0a1e]/80 backdrop-blur-xl
  border-b border-purple-500/20
  px-4 md:px-8
  py-4
">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    {/* Logo */}
    <a href="/" className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <span className="font-bold text-white text-lg">ACME公司</span>
    </a>

    {/* Nav Links */}
    <div className="hidden md:flex items-center gap-8">
      <a href="#" className="text-pink-400 font-medium hover:text-pink-300 transition-colors">特色</a>
      <a href="#" className="text-white/70 font-medium hover:text-white transition-colors">定价</a>
      <a href="#" className="text-white/70 font-medium hover:text-white transition-colors">关于</a>
      <a href="#" className="text-white/70 font-medium hover:text-white transition-colors">联系方式</a>
    </div>

    {/* CTA */}
    <div className="flex items-center gap-3">
      <a href="#" className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors">登录</a>
      <button className="
        px-4 py-2
        bg-gradient-to-r from-cyan-400 to-purple-500
        text-white font-medium
        rounded-lg
        border border-white/20
        hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]
        transition-all duration-300
      ">
        开始
      </button>
    </div>
  </div>
</nav>`},hero:{name:"Hero 区块",description:"深色背景 Hero，渐变标题和漂浮卡片",code:`<section className="
  min-h-screen
  bg-[#0f0a1e]
  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
  from-purple-900/20 via-[#0f0a1e] to-[#0f0a1e]
  px-4 md:px-8
  py-20 md:py-32
  overflow-hidden
  relative
">
  {/* 装饰元素 */}
  <div className="absolute top-20 left-10 text-yellow-400 animate-pulse">
    <Star className="w-6 h-6 fill-current" />
  </div>
  <div className="absolute top-40 right-20 text-pink-400">
    <Rocket className="w-8 h-8" />
  </div>
  <div className="absolute bottom-40 left-1/4 text-cyan-400 animate-bounce">
    <Sparkles className="w-5 h-5" />
  </div>

  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
    {/* 左侧文字 */}
    <div>
      {/* 标签 */}
      <div className="
        inline-flex items-center gap-2
        px-4 py-2 mb-6
        border-2 border-dashed border-yellow-400
        rounded-full
        text-yellow-400 text-sm font-medium
      ">
        <Star className="w-4 h-4 fill-current" />
        加入已经在使用 ACME 的 50,000+ 团队
        <Star className="w-4 h-4 fill-current" />
      </div>

      {/* 标题 */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
        <span className="text-purple-400">改变</span>
        <span className="text-cyan-400">你的方式</span>
        <br />
        <span className="text-pink-400">团队</span>
        <br />
        <span className="text-white">著作</span>
      </h1>

      {/* 描述 */}
      <p className="text-white/70 text-lg md:text-xl max-w-lg mb-8">
        Acme平台通过强大的工具将您的团队整合在一起，旨在简化工作流程、提升生产力并推动成果。
      </p>

      {/* 按钮 */}
      <div className="flex flex-wrap gap-4">
        <button className="
          px-6 py-4
          bg-gradient-to-r from-cyan-400 via-green-400 to-yellow-400
          text-black font-bold
          rounded-xl
          border-2 border-pink-400
          shadow-[0_0_20px_rgba(34,211,238,0.4)]
          hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]
          hover:scale-105
          transition-all duration-300
          flex items-center gap-2
        ">
          开始免费试用
          <Sparkles className="w-5 h-5" />
        </button>
        <button className="
          px-6 py-4
          bg-transparent
          text-white font-bold
          rounded-xl
          border-2 border-white/30
          hover:border-white/50
          hover:bg-white/5
          transition-all duration-300
          flex items-center gap-2
        ">
          <ArrowRight className="w-5 h-5" />
          观看演示
        </button>
      </div>
    </div>

    {/* 右侧卡片 */}
    <div className="relative">
      {/* 紫粉卡片 */}
      <div className="
        absolute -top-4 -left-4 md:top-0 md:left-0
        w-48 md:w-56
        bg-gradient-to-br from-purple-500 to-pink-500
        rounded-2xl
        border-4 border-yellow-400
        p-5
        shadow-[0_0_30px_rgba(168,85,247,0.5)]
        transform rotate-[-8deg]
        z-10
      ">
        <Zap className="w-10 h-10 text-white mb-3" />
        <p className="text-white font-bold text-lg">快点</p>
      </div>

      {/* 青绿卡片 */}
      <div className="
        absolute top-20 right-0 md:top-24 md:right-4
        w-48 md:w-56
        bg-gradient-to-br from-green-400 to-cyan-400
        rounded-2xl
        border-4 border-pink-400
        p-5
        shadow-[0_0_30px_rgba(34,211,238,0.5)]
        transform rotate-[5deg]
        z-20
      ">
        <Shield className="w-10 h-10 text-white mb-3" />
        <p className="text-white font-bold text-lg">安全</p>
      </div>

      {/* 粉红卡片 */}
      <div className="
        absolute bottom-0 left-1/4
        w-52 md:w-64
        bg-gradient-to-br from-pink-500 to-rose-500
        rounded-2xl
        border-4 border-cyan-400
        p-5
        shadow-[0_0_30px_rgba(236,72,153,0.5)]
        transform rotate-[3deg]
        z-30
      ">
        <Users className="w-10 h-10 text-white mb-3" />
        <p className="text-white font-bold text-lg">团队</p>
      </div>
    </div>
  </div>
</section>`},footer:{name:"底部工具栏",description:"固定底部的设计/提示切换栏",code:`<div className="
  fixed bottom-6 right-6
  flex items-center gap-2
  bg-[#1a1a2e]/90 backdrop-blur-xl
  rounded-xl
  border border-white/10
  p-2
">
  <button className="
    px-4 py-2
    bg-white/10
    text-white text-sm font-medium
    rounded-lg
    hover:bg-white/20
    transition-colors
  ">
    设计/提示
  </button>
  <button className="
    px-4 py-2
    text-white/60 text-sm font-medium
    rounded-lg
    hover:text-white hover:bg-white/10
    transition-colors
  ">
    提示
  </button>
  <button className="
    px-4 py-2
    bg-gradient-to-r from-purple-500 to-pink-500
    text-white text-sm font-medium
    rounded-lg
    hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]
    transition-all
    flex items-center gap-2
  ">
    <Palette className="w-4 h-4" />
    风格
  </button>
</div>`}},globalCss:`/* Neon Gradient 全局样式 */
:root {
  --neon-bg: #0f0a1e;
  --neon-purple: #a855f7;
  --neon-pink: #ec4899;
  --neon-cyan: #22d3ee;
  --neon-green: #a3e635;
  --neon-yellow: #fbbf24;
}

body {
  background: var(--neon-bg);
  color: white;
}

/* 发光文字 */
.neon-text-purple {
  color: var(--neon-purple);
  text-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
}

.neon-text-cyan {
  color: var(--neon-cyan);
  text-shadow: 0 0 20px rgba(34, 211, 238, 0.5);
}

.neon-text-pink {
  color: var(--neon-pink);
  text-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
}

/* 渐变边框 */
.neon-border-gradient {
  border: 4px solid transparent;
  background: linear-gradient(var(--neon-bg), var(--neon-bg)) padding-box,
              linear-gradient(135deg, var(--neon-cyan), var(--neon-pink)) border-box;
}

/* 卡片发光 */
.neon-glow-purple {
  box-shadow: 0 0 30px rgba(168, 85, 247, 0.4);
}

.neon-glow-cyan {
  box-shadow: 0 0 30px rgba(34, 211, 238, 0.4);
}

.neon-glow-pink {
  box-shadow: 0 0 30px rgba(236, 72, 153, 0.4);
}

/* 动画 */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.neon-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px currentColor; }
  50% { box-shadow: 0 0 40px currentColor; }
}

.neon-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}`,aiRules:`你是一个 Neon Gradient（霓虹渐变）设计风格的前端开发专家。

## 核心特征

背景：
- 深色：bg-[#0f0a1e] 或 bg-slate-900
- 可添加径向渐变：bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20

卡片：
- 渐变填充：bg-gradient-to-br from-purple-500 to-pink-500
- 粗边框：border-4 border-yellow-400（对比色）
- 圆角：rounded-2xl 或 rounded-3xl
- 发光：shadow-[0_0_30px_rgba(168,85,247,0.4)]

配色系统：
- 紫色：#a855f7 - 主色
- 粉红：#ec4899 - 强调
- 青色：#22d3ee - 对比
- 黄色：#fbbf24 - 边框高亮
- 绿色：#a3e635 - 辅助

渐变组合：
- 紫粉：from-purple-500 via-pink-500 to-rose-500
- 青绿：from-cyan-400 via-teal-500 to-green-500
- 青粉：from-cyan-400 to-pink-500
- 黄绿：from-yellow-400 via-green-400 to-cyan-400

边框配色（对比原则）：
- 紫粉卡片 → border-yellow-400 或 border-cyan-400
- 青绿卡片 → border-pink-400 或 border-yellow-400
- 粉红卡片 → border-cyan-400

## 装饰元素

使用 Lucide React 图标：
- Star（星星）- 带 fill-current 填充
- Rocket（火箭）
- Sparkles（闪光）
- Zap（闪电）
- Shield（盾牌）

位置：absolute 定位，分散在页面各处
效果：animate-pulse, animate-bounce

## 交互

- hover:shadow-[0_0_40px_...] 发光增强
- hover:scale-105 放大
- hover:-translate-y-2 上浮
- transition-all duration-300

## 禁止

- 浅色背景
- 低饱和度颜色
- 细边框（border, border-2）
- 灰色调
- emoji 字符（用图标替代）`,examplePrompts:[{title:"SaaS 产品着陆页",titleEn:"SaaS Product Landing Page",description:"团队协作工具宣传页",descriptionEn:"Team collaboration tool promotion page",prompt:`用 Neon Gradient 风格创建一个 SaaS 产品着陆页，要求：

## 背景
- bg-[#0f0a1e] 深紫黑色
- 顶部添加紫色径向渐变光晕

## 导航栏
- 半透明深色 bg-[#0f0a1e]/80 backdrop-blur-xl
- Logo 带黄色渐变背景
- 链接：粉色高亮当前页，白色其他
- CTA 按钮：青紫渐变

## Hero 区块
- 左侧：虚线边框标签、渐变色标题、描述文字、双按钮
- 右侧：三张漂浮渐变卡片，不同旋转角度
- 装饰：星星、火箭、闪光图标散落

## 卡片设计
- 紫粉渐变 + 黄色边框 border-4
- 青绿渐变 + 粉色边框
- 粉红渐变 + 青色边框
- 每张带发光阴影 shadow-[0_0_30px_...]

## 按钮
- 主按钮：青黄渐变，粉色边框，发光效果
- 次按钮：透明，白色边框`},{title:"开发者工具页面",titleEn:"Developer Tools Page",description:"API 或 SDK 产品介绍",descriptionEn:"API or SDK product introduction",prompt:`用 Neon Gradient 风格创建一个开发者工具介绍页，要求：

## 配色
- 背景：深色 bg-slate-900
- 主色：青色系 #22d3ee
- 强调：紫色系 #a855f7

## Hero
- 代码风格标题，带语法高亮色
- 终端样式代码块展示
- 安装命令一键复制按钮

## 功能卡片
- 图标 + 标题 + 描述
- 渐变背景：青紫、紫粉、粉黄
- 粗边框：对比色
- hover 发光增强

## 代码示例区
- 深色代码块 bg-black/50
- 语法高亮：关键字紫色、字符串绿色、函数青色
- 行号 + 复制按钮

## 定价卡片
- 免费版：透明边框
- 专业版：紫粉渐变填充，黄色边框
- 企业版：青绿渐变填充，粉色边框`},{title:"游戏平台首页",titleEn:"Gaming Platform Homepage",description:"电竞或游戏社区",descriptionEn:"Esports or gaming community",prompt:`用 Neon Gradient 风格创建一个游戏平台首页，要求：

## 背景
- 深色 bg-[#0a0a0f]
- 网格线装饰
- 多个发光光斑

## 导航
- 霓虹风格 logo
- 游戏分类下拉
- 用户头像 + 金币数量

## Hero
- 大型游戏封面轮播
- 渐变遮罩
- 立即游戏按钮：亮色渐变

## 游戏卡片网格
- 封面图 + 渐变遮罩
- 游戏名称
- 在线人数标签（发光绿点）
- hover 边框发光

## 排行榜
- 深色半透明背景
- 排名数字：金/银/铜渐变
- 用户头像 + 积分

## 装饰
- 闪电、星星、火焰图标
- 粒子效果背景`}]},{slug:"liquid-glass",name:"Apple 流动玻璃",nameEn:"Apple Liquid Glass",description:"Apple WWDC 2025 发布的全新设计语言，通过 SVG 折射滤镜、彩虹边缘光晕、流体形变动画和多层玻璃堆叠，创造出超越传统毛玻璃的有机流动视觉体验。",cover:"/styles/liquid-glass.svg",styleType:"visual",tags:["modern","brand-inspired"],category:"modern",colors:{primary:"rgba(255, 255, 255, 0.1)",secondary:"rgba(255, 255, 255, 0.15)",accent:["#ff6b6b","#4ecdc4","#a855f7","#007AFF","#FF2D55"]},keywords:["Apple","Liquid Glass","流动玻璃","彩虹边缘","折射","多层堆叠","WWDC 2025"],philosophy:`Liquid Glass（流动玻璃）是 Apple WWDC 2025 发布的革命性设计语言，超越传统毛玻璃效果，通过光线折射、彩虹边缘和流体动画创造出真正有机、流动的视觉体验。

核心理念：
- 霓虹描边文字：标题使用 text-stroke 配合青色发光描边，产生霓虹效果
- 渐变填充文字：紫色到品红的渐变填充，配合 3D 阴影产生立体感
- 彩虹折射边缘：边缘呈现棱镜效果，红橙黄绿青蓝紫的光谱渐变
- 流体形变：圆角随交互产生液态变形动画
- 多层深度：3+ 层玻璃堆叠产生丰富的空间层次
- 高饱和度：backdrop-saturate-180 让背景色彩更加鲜艳

## 字体设计核心（最重要的视觉元素）

### Hero 标题（主标题）
紫色渐变填充 + 粗青色描边(3px) + 3D偏移阴影：
- background: linear-gradient(to right, #a855f7, #ff2d92, #a855f7)
- -webkit-text-stroke: 3px #4ecdc4
- text-shadow: 4px 4px 0 rgba(0,0,0,0.5), 0 0 20px rgba(78,205,196,0.5), 0 0 40px rgba(168,85,247,0.3)
- filter: drop-shadow(0 0 15px rgba(78,205,196,0.4))

### 副标题（青色发光）
白色/青色文字 + 发光效果（无描边）：
- color: white 或 gradient cyan
- text-shadow: 0 0 20px rgba(78,205,196,0.8), 0 0 40px rgba(78,205,196,0.4), 2px 2px 0 rgba(0,0,0,0.3)

### h1/h2 标题
较细描边(2px) + 发光 + 轻微3D：
- -webkit-text-stroke: 2px #4ecdc4
- text-shadow: 3px 3px 0 rgba(0,0,0,0.4), 0 0 15px rgba(78,205,196,0.4)

### 正文
高对比度白色，保证可读性：
- color: text-white/80 到 text-white/90

与 Glassmorphism 的区别：
| 特性 | Glassmorphism | Liquid Glass |
|------|---------------|--------------|
| 边框 | border-white/20 | 彩虹渐变边框 |
| 模糊 | blur-2xl | blur-3xl + saturate-180 |
| 动画 | 简单过渡 | 液态形变 morph |
| 深度 | 单层 | 多层堆叠 |
| 文字 | 普通白色 | 渐变+粗描边+3D阴影 |
| 描边 | 无 | 3px青色霓虹描边 |
| 阴影 | 普通投影 | 3D偏移+发光组合 |`,doList:["Hero标题使用粗描边 -webkit-text-stroke: 3px #4ecdc4","Hero标题使用3D偏移阴影 text-shadow: 4px 4px 0 rgba(0,0,0,0.5)","Hero标题使用渐变填充 bg-gradient-to-r from-[#a855f7] via-[#ff2d92] to-[#a855f7]","副标题使用青色发光 text-shadow: 0 0 20px rgba(78, 205, 196, 0.8)","使用超高模糊值 backdrop-blur-[40px] 或 backdrop-blur-3xl","添加饱和度增强 backdrop-saturate-[1.8] 或 backdrop-saturate-200","使用彩虹渐变边框模拟光线折射效果","使用超大圆角 rounded-3xl 或 rounded-[24px]","使用流体动画 transition-all duration-500 ease-out"],dontList:["禁止使用普通白色标题（必须使用渐变+粗描边+3D阴影）","禁止省略3D偏移阴影（4px 4px是必须的）","禁止使用细描边（Hero必须3px，h1/h2至少2px）","禁止省略文字发光效果（缺少霓虹感）","禁止使用低模糊值 backdrop-blur-sm（太弱）","禁止省略饱和度增强（颜色会显得暗淡）","禁止使用直角或小圆角（rounded-none, rounded-sm）","禁止使用快速过渡（duration-100, duration-150）"],components:{button:{name:"按钮",description:"流动玻璃按钮，具有彩虹边缘渐变和液态压缩效果",code:`<button className="
  relative px-6 py-3
  bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8]
  rounded-[20px]
  text-white font-medium
  shadow-lg shadow-black/5
  before:absolute before:inset-0 before:rounded-[20px]
  before:p-[1px] before:-z-10
  before:bg-gradient-to-r before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]
  after:absolute after:inset-[1px] after:rounded-[19px] after:-z-10
  after:bg-gradient-to-b after:from-white/20 after:to-transparent
  hover:bg-white/15 hover:shadow-xl
  hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]
  active:scale-[0.98]
  transition-all duration-500 ease-out
">
  Liquid Button
</button>`},card:{name:"卡片",description:"流动玻璃卡片，多层深度、彩虹边缘折射效果",code:`<div className="
  relative p-6 md:p-8
  bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8]
  rounded-[24px]
  shadow-xl shadow-black/10
  before:absolute before:inset-0 before:rounded-[24px]
  before:p-[1px] before:-z-10
  before:bg-gradient-to-br before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]
  after:absolute after:inset-[1px] after:rounded-[23px] after:-z-10
  after:bg-gradient-to-b after:from-white/15 after:to-transparent
  [box-shadow:inset_0_1px_0_rgba(255,255,255,0.4)]
">
  <h3 className="text-xl font-semibold text-white mb-2">
    Liquid Glass Card
  </h3>
  <p className="text-white/80">
    多层玻璃效果，边缘带有彩虹光线折射
  </p>
</div>`},input:{name:"输入框",description:"流动玻璃输入框，焦点时彩虹边框动画",code:`<input
  type="text"
  placeholder="请输入..."
  className="
    w-full px-4 py-3
    bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8]
    border border-white/20
    rounded-[16px]
    text-white placeholder-white/50
    focus:outline-none
    focus:bg-white/15
    focus:border-transparent
    focus:[box-shadow:0_0_0_2px_rgba(168,85,247,0.5),0_0_20px_rgba(168,85,247,0.2)]
    transition-all duration-500 ease-out
  "
/>`},nav:{name:"导航栏",description:"固定顶部的流动玻璃导航栏，带彩虹底边",code:`<nav className="
  fixed top-0 left-0 right-0 z-50
  px-6 py-4
  bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8]
  border-b border-white/10
  [box-shadow:0_1px_0_0_rgba(255,255,255,0.1),inset_0_-1px_0_0_rgba(168,85,247,0.2)]
">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <a href="/" className="text-white font-bold text-xl">
      Logo
    </a>
    <div className="flex gap-6">
      <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
        Home
      </a>
      <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
        About
      </a>
    </div>
  </div>
</nav>`},hero:{name:"Hero 区块",description:"带深色渐变背景的流动玻璃 Hero 展示区域",code:`<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]
  px-6
">
  <div className="
    max-w-2xl mx-auto text-center
    p-8 md:p-12
    relative
    bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8]
    rounded-[32px]
    shadow-2xl shadow-black/20
    before:absolute before:inset-0 before:rounded-[32px]
    before:p-[1px] before:-z-10
    before:bg-gradient-to-br before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]
    after:absolute after:inset-[1px] after:rounded-[31px] after:-z-10
    after:bg-gradient-to-b after:from-white/20 after:to-transparent
  ">
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
      Liquid Glass
    </h1>
    <p className="text-lg text-white/80 mb-8">
      Apple WWDC 2025 全新设计语言
    </p>
    <button className="
      px-8 py-4
      bg-white/15 backdrop-blur-md
      rounded-full
      text-white font-semibold
      border border-white/30
      hover:bg-white/25
      hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]
      transition-all duration-500 ease-out
    ">
      Get Started
    </button>
  </div>
</section>`},footer:{name:"页脚",description:"流动玻璃页脚，带有顶部彩虹边缘",code:`<footer className="
  px-6 py-8
  bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8]
  border-t border-white/10
  [box-shadow:0_-1px_0_0_rgba(255,255,255,0.1),inset_0_1px_0_0_rgba(168,85,247,0.2)]
">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
    <span className="text-white/60 text-sm">Liquid Glass Design</span>
    <div className="flex gap-6">
      <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
        About
      </a>
      <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
        Contact
      </a>
    </div>
  </div>
</footer>`}},globalCss:`/* Liquid Glass 全局样式 */

/* 流动玻璃变量 */
:root {
  --liquid-glass-bg: rgba(255, 255, 255, 0.1);
  --liquid-glass-bg-hover: rgba(255, 255, 255, 0.15);
  --liquid-glass-blur: 40px;
  --liquid-glass-saturate: 1.8;
  --liquid-glass-border-start: #ff6b6b;
  --liquid-glass-border-mid: #4ecdc4;
  --liquid-glass-border-end: #a855f7;
}

/* 彩虹边框渐变 */
.liquid-glass-rainbow-border {
  background: linear-gradient(
    135deg,
    var(--liquid-glass-border-start) 0%,
    #ffd93d 25%,
    #6bcb77 50%,
    var(--liquid-glass-border-mid) 75%,
    var(--liquid-glass-border-end) 100%
  );
}

/* 基础流动玻璃类 */
.liquid-glass {
  background: var(--liquid-glass-bg);
  backdrop-filter: blur(var(--liquid-glass-blur)) saturate(var(--liquid-glass-saturate));
  -webkit-backdrop-filter: blur(var(--liquid-glass-blur)) saturate(var(--liquid-glass-saturate));
  border-radius: 24px;
}

/* 顶部高光条 */
.liquid-glass-highlight {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.2),
    transparent 50%
  );
}

/* 流体形变动画 */
@keyframes liquid-morph {
  0%, 100% { border-radius: 24px; }
  25% { border-radius: 28px 20px 26px 22px; }
  50% { border-radius: 22px 26px 20px 28px; }
  75% { border-radius: 26px 22px 28px 20px; }
}

.liquid-glass-morph {
  animation: liquid-morph 8s ease-in-out infinite;
}

/* 脉冲发光动画 */
@keyframes liquid-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
  50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.5); }
}

.liquid-glass-glow {
  animation: liquid-glow 3s ease-in-out infinite;
}

/* 彩虹边缘脉冲 */
@keyframes rainbow-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.liquid-glass-rainbow-pulse {
  animation: rainbow-pulse 2s ease-in-out infinite;
}

/* 多层玻璃堆叠 */
.liquid-glass-stack-1 { --liquid-glass-bg: rgba(255, 255, 255, 0.08); }
.liquid-glass-stack-2 { --liquid-glass-bg: rgba(255, 255, 255, 0.12); }
.liquid-glass-stack-3 { --liquid-glass-bg: rgba(255, 255, 255, 0.16); }

/* 深色渐变容器背景 */
.liquid-glass-container {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
  min-height: 100vh;
}`,aiRules:`你是一个 Apple Liquid Glass（流动玻璃）设计风格的前端开发专家。这是 Apple WWDC 2025 发布的全新设计语言。生成的所有代码必须严格遵守以下约束：

## 字体设计（最重要！）

### Hero 标题 - 必须使用以下样式：
\`\`\`jsx
<h1
  className="font-black bg-gradient-to-r from-[#a855f7] via-[#ff2d92] to-[#a855f7] bg-clip-text"
  style={{
    WebkitTextStroke: '3px #4ecdc4',
    WebkitTextFillColor: 'transparent',
    textShadow: '4px 4px 0 rgba(0,0,0,0.5), 0 0 25px rgba(78,205,196,0.6), 0 0 50px rgba(168,85,247,0.4)',
    filter: 'drop-shadow(0 0 15px rgba(78,205,196,0.4))',
  }}
>
  标题文字
</h1>
\`\`\`

### 副标题 - 青色发光白色文字：
\`\`\`jsx
<h2
  className="font-bold text-white"
  style={{
    textShadow: '0 0 25px rgba(78,205,196,0.9), 0 0 50px rgba(78,205,196,0.5), 3px 3px 0 rgba(0,0,0,0.4)',
  }}
>
  副标题
</h2>
\`\`\`

### h2/h3 标题 - 较细描边(2px)：
\`\`\`jsx
<h2
  style={{
    WebkitTextStroke: '2px #4ecdc4',
    textShadow: '3px 3px 0 rgba(0,0,0,0.4), 0 0 15px rgba(78,205,196,0.5)',
  }}
>
  标题
</h2>
\`\`\`

## 绝对禁止

- 使用普通白色标题（必须有描边+3D阴影+发光）
- 使用细描边（Hero必须3px，h2至少2px）
- 省略3D偏移阴影（4px 4px是必须的）
- 使用低模糊值 backdrop-blur-sm, backdrop-blur（太弱）
- 省略饱和度增强 backdrop-saturate
- 使用直角或小圆角 rounded-none, rounded-sm, rounded
- 使用单一颜色边框（应使用彩虹渐变）
- 使用快速过渡 duration-100, duration-150
- 使用纯色不透明背景 bg-white, bg-black
- 使用浅色背景作为容器底层（应使用深色渐变）

## 必须遵守

- Hero标题：3px青色描边 + 紫色渐变填充 + 3D阴影(4px 4px) + 发光
- 副标题：白色 + 青色发光阴影
- 超高模糊值 backdrop-blur-[40px], backdrop-blur-3xl
- 高饱和度增强 backdrop-saturate-[1.8], backdrop-saturate-200
- 彩虹渐变边框 from-[#ff6b6b] via-[#4ecdc4] to-[#a855f7]
- 顶部高光渐变 from-white/20 to-transparent
- 超大圆角 rounded-3xl, rounded-[24px]
- 流体过渡 transition-all duration-500 ease-out
- 半透明背景 bg-white/10 到 bg-white/15
- 多层堆叠使用 z-index 和不同透明度

## 彩虹配色

边缘折射渐变：
- 红: #ff6b6b
- 橙: #ffd93d
- 绿: #6bcb77
- 青: #4ecdc4
- 紫: #a855f7

背景推荐：
- 深色渐变: from-[#1a1a2e] via-[#16213e] to-[#0f0f23]
- Apple 蓝: #007AFF
- Apple 粉: #FF2D55

## 层级结构

1. 底层：深色渐变背景
2. 中层：流动玻璃容器（backdrop-blur-[40px] backdrop-saturate-[1.8]）
3. 边框层：彩虹渐变伪元素 before:
4. 高光层：顶部渐变伪元素 after:
5. 顶层：内容元素

## 核心特效

1. 彩虹边框：使用 before 伪元素 + 渐变背景 + p-[1px]
2. 顶部高光：使用 after 伪元素 + 从白色渐变到透明
3. 液态动画：animation: liquid-morph 8s ease-in-out infinite
4. 发光效果：hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]
5. 压缩反馈：active:scale-[0.98]

## 自检

每次生成代码后检查：
1. Hero标题有3px青色描边和3D偏移阴影
2. 副标题有青色发光效果
3. 有深色渐变背景容器
4. 有 backdrop-blur-[40px] 或 backdrop-blur-3xl
5. 有 backdrop-saturate-[1.8] 或更高
6. 有彩虹渐变边框
7. 有顶部高光条
8. 使用 rounded-[24px] 或更大圆角
9. 过渡时间 >= 500ms
10. 文字可读性良好`,examplePrompts:[{title:"Apple 风格控制中心",titleEn:"Apple-style Control Center",description:"iOS 风格的流动玻璃控制中心",descriptionEn:"iOS-style liquid glass control center",prompt:`用 Liquid Glass 风格创建一个 iOS 风格控制中心，要求：

## 核心效果
- 背景：深色渐变 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]
- 主面板：bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px]
- 彩虹边框：使用 before 伪元素实现渐变边框
- 顶部渐变：使用 after 伪元素实现高光

## 控制模块
- 网格布局：2x4 圆角正方形网格
- 每个磁贴：bg-white/10 rounded-[16px] 带彩虹边框
- 激活状态：bg-[#007AFF]/40 shadow-[0_0_20px_rgba(0,122,255,0.4)]

## 交互
- 开关控件：胶囊形状，开启时带发光
- 滑块控件：流动玻璃轨道，圆形滑块带发光
- 所有过渡：transition-all duration-500 ease-out`},{title:"流动玻璃音乐播放器",titleEn:"Liquid Glass Music Player",description:"Apple Music 风格播放界面",descriptionEn:"Apple Music style player interface",prompt:`用 Liquid Glass 风格设计一个音乐播放器界面，要求：

## 背景层
- 当前播放歌曲的模糊封面作为背景
- 叠加深色渐变：bg-gradient-to-b from-black/40 via-transparent to-black/60

## 播放卡片（多层玻璃）
- 外层容器：bg-white/8 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[32px]
- 彩虹边框：before 伪元素实现
- 内层面板：bg-white/12 rounded-[28px] p-6

## 控件设计
- 专辑封面：rounded-[20px] shadow-2xl 带发光边框
- 播放按钮：w-16 h-16 bg-white/15 rounded-full 带脉冲发光动画
- 上下曲按钮：w-12 h-12 bg-white/10 rounded-full
- 进度条：h-1 bg-white/20 rounded-full，滑块 w-4 h-4 带发光

## 动画
- 专辑封面：hover 时微微放大和发光
- 播放按钮：按下时液态压缩效果
- 进度条滑块：拖动时发光增强`},{title:"流动玻璃登录页面",titleEn:"Liquid Glass Login Page",description:"现代登录表单设计",descriptionEn:"Modern login form design",prompt:`用 Liquid Glass 风格创建一个登录页面，要求：

## 全屏背景
- 深色渐变：bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]
- 添加装饰性彩虹光斑元素

## 登录卡片
- 居中容器：max-w-md mx-auto
- 流动玻璃：bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8]
- 圆角：rounded-[32px]
- 彩虹边框：before 伪元素
- 顶部高光：after 伪元素

## 表单元素
- 输入框：bg-white/10 backdrop-blur-xl border border-white/20 rounded-[16px]
- 焦点态：focus:bg-white/15 focus:shadow-[0_0_0_2px_rgba(168,85,247,0.5)]
- 占位符：placeholder:text-white/50

## 按钮
- 主按钮：彩虹渐变边框 + 发光 hover 效果
- 次按钮：bg-transparent border border-white/30 text-white/80
- 社交登录：bg-white/10 hover:bg-white/15 rounded-[12px]

## 额外元素
- Logo：text-white text-2xl font-bold 带发光效果
- 分隔线：border-t border-white/20 my-6
- 链接：text-white/70 hover:text-white`}]},{slug:"scandinavian",name:"北欧极简风",nameEn:"Scandinavian Minimalism",description:"源自北欧的温暖极简设计，强调自然材质、舒适留白、木质色调和Hygge生活美学，营造宁静温馨的视觉体验。",cover:"/styles/scandinavian.svg",styleType:"visual",tags:["minimal","modern"],category:"minimal",colors:{primary:"#3d3d3d",secondary:"#f5f0eb",accent:["#5a7a6b","#7ba0b8","#c9a88c"]},keywords:["北欧","斯堪的纳维亚","Hygge","木质","自然","温暖","留白","舒适"],philosophy:`北欧极简风（Scandinavian Minimalism）源自丹麦、瑞典、挪威、芬兰等北欧国家的设计传统。

核心理念：
- 少即是多：每个元素都有存在的理由
- 自然连接：使用木材、亚麻等自然材质的色调
- Hygge 精神：营造温馨、舒适、幸福的氛围
- 功能之美：实用性与美感的完美平衡
- 光的崇拜：大量留白模拟北欧的自然光线`,doList:["使用温暖的灰白色背景 bg-[#f5f0eb]","选择自然木质色系 text-[#a89279]","大量留白创造呼吸感 py-28 px-6","使用细腻的字重 font-extralight font-light","极简的边框和分隔 border-[#d4cdc5]/40","平滑缓慢的过渡动画 transition-colors duration-500"],dontList:["禁止使用高饱和度的鲜艳色彩","禁止使用粗重的边框和阴影","禁止密集排列元素，保持充分留白","禁止使用装饰性字体或过大字号"],components:{button:{name:"按钮",description:"北欧极简风按钮，含蓄优雅",code:`<button className="
  px-6 py-3
  bg-[#3d3d3d] text-[#f5f0eb]
  text-sm tracking-wider
  rounded-sm
  hover:bg-[#5a7a6b]
  transition-colors duration-300
">
  Continue
</button>`},card:{name:"卡片",description:"北欧极简风卡片，自然简约",code:`<div className="
  p-6
  bg-white/60
  rounded-sm
  border border-[#d4cdc5]/40
  hover:border-[#5a7a6b]/30
  transition-colors
">
  <h3 className="text-lg font-light text-[#3d3d3d] mb-3">Title</h3>
  <p className="text-sm text-[#a89279] leading-relaxed">Content</p>
</div>`},input:{name:"输入框",description:"北欧极简风输入框，底部边框",code:`<input
  type="text"
  placeholder="Your name"
  className="
    w-full px-4 py-2.5
    bg-transparent
    border-b border-[#d4cdc5]
    text-[#3d3d3d]
    placeholder-[#d4cdc5]
    focus:outline-none focus:border-[#5a7a6b]
    transition-colors
  "
/>`}},globalCss:`/* Scandinavian Minimalism */
:root {
  --scandinavian-bg: #f5f0eb;
  --scandinavian-text: #3d3d3d;
  --scandinavian-muted: #a89279;
  --scandinavian-accent: #5a7a6b;
  --scandinavian-border: #d4cdc5;
}`,aiRules:`You are designing in Scandinavian Minimalism style.
- Use warm neutral tones: birch white #f5f0eb, charcoal #3d3d3d, wool gray #d4cdc5
- Accent with natural colors: pine green #5a7a6b, fjord blue #7ba0b8
- Font weights: extralight and light only
- Generous whitespace and breathing room
- Subtle borders and transitions
- No bright colors, no heavy shadows
- Lowercase text for a calm, approachable feel`},{slug:"cel-shading",name:"赛璐璐动画风",nameEn:"Cel Shading",description:"模拟传统动画赛璐璐片的渲染风格，粗黑轮廓线、平面色块填充、无渐变阴影和鲜艳饱和色彩，充满卡通游戏的活力感。",cover:"/styles/cel-shading.svg",styleType:"visual",tags:["expressive","high-contrast"],category:"expressive",colors:{primary:"#1a1a2e",secondary:"#fafaf5",accent:["#e63946","#4ea8de","#2ecc71","#f1c40f"]},keywords:["赛璐璐","卡通","轮廓线","平面阴影","动画","游戏","toon","bold"],philosophy:`赛璐璐动画风（Cel Shading / Toon Shading）模拟传统手绘动画的视觉效果。

核心理念：
- 粗黑轮廓：所有元素都有明确的3px黑色边框
- 平面色块：使用纯色填充，无渐变
- 硬阴影：阴影是实体位移，不是模糊
- 高饱和度：色彩鲜艳、对比强烈
- 游戏化 UI：按钮、卡片像游戏菜单一样生动有趣`,doList:["所有元素使用3px粗黑边框 border-[3px] border-[#1a1a2e]","硬阴影效果 shadow-[3px_3px_0_#1a1a2e]","使用纯色填充，不使用渐变 bg-[#e63946]","字体加粗 font-black uppercase","点击交互：阴影缩小+位移 hover:translate-x-0.5","高饱和度配色：红、蓝、绿、黄"],dontList:["禁止使用渐变色（保持平面色块）","禁止使用模糊阴影 shadow-lg","禁止使用细边框 border","禁止使用低饱和度或灰色调"],components:{button:{name:"按钮",description:"赛璐璐风按钮，粗边框+硬阴影",code:`<button className="
  px-6 py-3
  bg-[#e63946] text-white
  font-black uppercase text-sm
  border-[3px] border-[#1a1a2e]
  shadow-[3px_3px_0_#1a1a2e]
  hover:shadow-[1px_1px_0_#1a1a2e]
  hover:translate-x-0.5 hover:translate-y-0.5
  active:shadow-none active:translate-x-1 active:translate-y-1
  transition-all
">
  Attack!
</button>`},card:{name:"卡片",description:"赛璐璐风卡片，漫画面板",code:`<div className="
  p-6 bg-white
  border-[3px] border-[#1a1a2e]
  shadow-[4px_4px_0_#1a1a2e]
  hover:shadow-[6px_6px_0_#1a1a2e]
  hover:-translate-x-0.5 hover:-translate-y-0.5
  transition-all
">
  <h3 className="text-xl font-black text-[#1a1a2e] uppercase mb-2">Title</h3>
  <p className="font-bold text-[#1a1a2e]/60">Content</p>
</div>`},input:{name:"输入框",description:"赛璐璐风输入框，粗边框",code:`<input
  type="text"
  placeholder="Enter..."
  className="
    w-full px-4 py-2.5
    bg-[#fafaf5]
    border-[3px] border-[#1a1a2e]
    text-[#1a1a2e] font-bold
    placeholder-[#1a1a2e]/30
    focus:outline-none focus:border-[#e63946]
    transition-colors
  "
/>`}},globalCss:`/* Cel Shading */
:root {
  --cel-bg: #fafaf5;
  --cel-ink: #1a1a2e;
  --cel-red: #e63946;
  --cel-blue: #4ea8de;
  --cel-green: #2ecc71;
  --cel-yellow: #f1c40f;
  --cel-purple: #9b59b6;
}`,aiRules:`You are designing in Cel Shading (Toon Shading) style.
- All elements MUST have 3px solid black borders: border-[3px] border-[#1a1a2e]
- Use hard offset shadows ONLY: shadow-[3px_3px_0_#1a1a2e]
- NO gradients, NO blur shadows, NO soft edges
- Flat saturated colors: #e63946, #4ea8de, #2ecc71, #f1c40f
- Text is always bold/black weight and uppercase
- Interactive elements shift on hover (shadow shrinks, element translates)
- Light background #fafaf5 with dark ink outlines
- Think "video game menu" or "cartoon UI"`},{slug:"wabi-sabi",name:"侘寂风",nameEn:"Wabi-Sabi",description:"日本侘寂美学的数字化呈现，崇尚不完美之美、自然衰老之雅和极致留白之禅，以墨色、茶色和纸张质感传递东方诗意。",cover:"/styles/wabi-sabi.svg",styleType:"visual",tags:["minimal","expressive"],category:"minimal",colors:{primary:"#3a3a3a",secondary:"#f2ede4",accent:["#8a9a7b","#b5a78c","#8b6f4e"]},keywords:["侘寂","日式","禅","不完美","留白","Ma","纸张","自然","东方"],philosophy:`侘寂（Wabi-Sabi）是日本传统美学中最深层的哲学概念。

核心理念：
- 不完美之美：裂纹、磨损、不规则都是岁月赋予的美
- 间（Ma）：留白不是空无，是有意义的空间
- 自然衰变：万物生长、衰老、消逝的过程本身就是美
- 朴素之深：在极致的简约中发现深邃
- 一期一会：此刻即是唯一，不可再现`,doList:["使用温暖的纸张色背景 bg-[#f7f3ec] bg-[#f2ede4]","墨色为主要文字色 text-[#3a3a3a]","极大的留白和间距 py-32 px-8","使用衬线字体 font-serif","极细的分隔线 border-[#d4cdc5]/30","缓慢的渐入动画 transition-opacity duration-1000"],dontList:["禁止使用鲜艳色彩和高饱和度","禁止使用厚重阴影和粗边框","禁止密集排列元素","禁止使用装饰性动画和弹跳效果"],components:{button:{name:"按钮",description:"侘寂风按钮，极简素雅",code:`<button className="
  px-6 py-2.5
  bg-transparent
  text-[#3a3a3a] font-serif text-sm
  border-b border-[#3a3a3a]/30
  hover:border-[#3a3a3a]
  transition-colors duration-500
">
  Continue
</button>`},card:{name:"卡片",description:"侘寂风卡片，纸张质感",code:`<div className="
  p-8
  bg-[#f2ede4]
  border-l border-[#d4cdc5]/40
">
  <h3 className="text-lg font-serif font-light text-[#3a3a3a] mb-4">Title</h3>
  <p className="text-sm text-[#8a8278] leading-relaxed">Content</p>
</div>`},input:{name:"输入框",description:"侘寂风输入框，底线",code:`<input
  type="text"
  placeholder="..."
  className="
    w-full px-0 py-2
    bg-transparent
    border-b border-[#d4cdc5]/50
    text-[#3a3a3a] font-serif
    placeholder-[#d4cdc5]
    focus:outline-none focus:border-[#8a9a7b]
    transition-colors duration-500
  "
/>`}},globalCss:`/* Wabi-Sabi */
:root {
  --wabi-bg: #f7f3ec;
  --wabi-surface: #f2ede4;
  --wabi-text: #3a3a3a;
  --wabi-muted: #8a8278;
  --wabi-moss: #8a9a7b;
  --wabi-tea: #b5a78c;
  --wabi-clay: #8b6f4e;
  --wabi-border: #d4cdc5;
}`,aiRules:`You are designing in Wabi-Sabi style.
- Warm paper-toned backgrounds: #f7f3ec, #f2ede4
- Ink-like text color: #3a3a3a
- Muted natural accents: moss green #8a9a7b, tea brown #b5a78c
- Always use serif fonts (font-serif)
- Extreme whitespace: py-32, large gaps between sections
- Ultra-thin borders: border-[#d4cdc5]/30
- Slow transitions: duration-500 or longer
- No bold colors, no heavy shadows, no decorative elements
- Embrace asymmetry and imperfection
- Think "zen garden" and "ceramic pottery"`},{slug:"sci-fi-hud",name:"科幻HUD",nameEn:"Sci-Fi HUD",description:"源自星际飞船驾驶舱和战术指挥中心的全息显示界面。深空背景、青色发光边框、半透明玻璃面板、雷达扫描动效，营造'正在操作高科技设备'的沉浸体验。",cover:"/styles/sci-fi-hud.svg",styleType:"visual",tags:["expressive","modern","high-contrast"],category:"modern",colors:{primary:"#06B6D4",secondary:"#020617",accent:["#0EA5E9","#22D3EE","#22C55E"]},keywords:["科幻","HUD","全息","雷达","指挥中心","太空","发光边框","数据流"],philosophy:`Sci-Fi HUD 风格源自电影、游戏中的未来科技界面，核心在于"信息即界面"。

设计原则：
- 深空背景：极深的蓝灰色背景模拟太空指挥室
- 发光几何：所有元素使用青色/蓝绿色发光边框，创造全息投影感
- 信息密集：通过分层和模块化保持大量实时数据的可读性
- 实时动态：雷达扫描、数据流滚动、状态脉冲传递"系统运行中"的感觉
- 半透明材质：面板使用玻璃态效果 + 模糊背景`,doList:["背景使用深空色 bg-[#020617] 或 bg-slate-950","面板使用半透明 bg-slate-900/85 backdrop-blur-xl","边框使用发光效果 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.5)]","文字使用冷色调 text-[#E5F2FF] 或 text-slate-300","使用 font-mono uppercase tracking-wider 营造科技感","角标装饰使用 L 型边框 border-t-2 border-l-2","状态指示器使用发光脉冲动画","进度条使用渐变填充 + 发光扫描效果"],dontList:["禁止使用浅色/白色背景","禁止使用暖色调（橙、粉等暖色仅限警告状态）","禁止使用普通阴影 shadow-md（必须是发光阴影）","禁止使用衬线字体","禁止使用圆润可爱的设计语言","禁止大圆角 rounded-2xl+"],components:{button:{name:"HUD 按钮",description:"半透明发光边框按钮，悬停增强辉光",code:`// Primary HUD Button
<button className="px-6 py-3 bg-slate-900/80 border border-cyan-500/40 text-cyan-400 rounded shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 transition-all duration-300 font-mono text-sm uppercase tracking-widest">
  Initialize
</button>

// Active HUD Button
<button className="px-6 py-3 bg-cyan-500/20 border border-cyan-300 text-cyan-300 rounded shadow-[0_0_20px_rgba(6,182,212,0.5)] font-mono text-sm uppercase tracking-widest">
  System Active
</button>

// Danger HUD Button
<button className="px-6 py-3 bg-slate-900/80 border border-red-500/40 text-red-400 rounded shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:border-red-400 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all duration-300 font-mono text-sm uppercase tracking-widest">
  Override
</button>`},card:{name:"HUD 面板",description:"半透明玻璃面板，带角标装饰和扫描线",code:`<div className="relative bg-slate-900/85 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:border-cyan-500/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:-translate-y-0.5 transition-all duration-300">
  {/* L-shaped corner decorations */}
  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

  {/* Scanline overlay */}
  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(148,163,184,0.03)_2px,rgba(148,163,184,0.03)_4px)] pointer-events-none rounded-lg" />

  <div className="relative">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse" />
      <h3 className="text-slate-400 font-mono text-xs uppercase tracking-widest">System Module</h3>
    </div>
    <h4 className="text-[#E5F2FF] text-lg font-bold mb-3 font-mono">
      Subsystem Status
    </h4>
    <p className="text-slate-400 text-sm leading-relaxed">
      All systems nominal. Quantum core operating at optimal efficiency.
    </p>
  </div>
</div>`},input:{name:"HUD 输入框",description:"深色背景输入框，发光聚焦效果",code:`<div className="space-y-2">
  <label className="block text-cyan-400 font-mono text-xs uppercase tracking-widest">Access Code</label>
  <div className="relative">
    <input
      type="text"
      className="w-full px-4 py-3 bg-slate-950 border border-cyan-500/30 rounded text-[#E5F2FF] font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
      placeholder="Enter command..."
    />
    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse" />
  </div>
</div>`},nav:{name:"HUD 状态栏",description:"顶部状态栏，显示系统名称、时间和状态指示器",code:`<nav className="bg-[#020617]/95 backdrop-blur-sm border-b border-cyan-500/30 px-8 py-3 flex justify-between items-center">
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 flex items-center justify-center text-cyan-300 font-mono font-bold text-sm bg-cyan-500/10 border-2 border-cyan-500 rounded shadow-[0_0_15px_rgba(6,182,212,0.4)]">
      HUD
    </div>
    <span className="text-[#E5F2FF] font-mono text-sm uppercase tracking-[0.15em]">Nexus Command</span>
  </div>
  <div className="flex items-center gap-6">
    <span className="text-cyan-400 font-mono text-sm bg-cyan-500/10 border border-cyan-500/30 rounded px-3 py-1">12:34:56 UTC</span>
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse" />
      <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">Online</span>
    </div>
  </div>
</nav>`}},globalCss:`/* Sci-Fi HUD Global Styles */
@layer base {
  body {
    background-color: #020617;
    color: #E5F2FF;
  }

  ::selection {
    background-color: rgba(6, 182, 212, 0.4);
    color: #E5F2FF;
  }
}

@keyframes hud-radar-sweep {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes hud-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.2); }
}

@keyframes hud-data-slide {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes hud-bar-shine {
  from { left: -100%; }
  to { left: 100%; }
}`,aiRules:`STYLE: Sci-Fi HUD
TYPE: Futuristic command center interface

MUST USE:
- Deep space background: bg-[#020617] or bg-slate-950
- Semi-transparent panels: bg-slate-900/85 backdrop-blur-xl
- Cyan glow borders: border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.5)]
- L-shaped corner decorations on important panels
- font-mono uppercase tracking-wider for labels
- Status indicators with pulse animation
- Scanline overlays for tech atmosphere
- Progress bars with gradient fill and glow

MUST AVOID:
- Light/white backgrounds
- Warm color schemes (except for warning/danger status)
- Regular shadows (shadow-md, shadow-lg)
- Serif fonts
- Cute/rounded design language
- Large border-radius (rounded-2xl+)

COLOR SYSTEM:
- Background: #020617 (deep navy)
- Panel: rgba(15, 23, 42, 0.85) (translucent slate)
- Primary accent: #06B6D4 (cyan)
- Secondary accent: #0EA5E9 (bright blue)
- Highlight: #22D3EE (neon cyan)
- Success: #22C55E (green)
- Warning: #F97316 (orange)
- Danger: #EF4444 (red)
- Text primary: #E5F2FF
- Text secondary: #94A3B8

SPECIAL EFFECTS:
- Radar sweep rotation animation (6s linear infinite)
- Status pulse glow (2s ease-in-out)
- Data line slide-in animation
- Progress bar shine sweep
- Scanline repeating gradient overlay`,examplePrompts:[{title:"指挥中心仪表盘",titleEn:"Command Center Dashboard",description:"包含系统状态、雷达扫描、数据流和资源指标",descriptionEn:"System status, radar scan, data stream, and resource metrics",prompt:`Create a command center dashboard using Sci-Fi HUD style:
- Deep space dark background with scanline overlay
- Top status bar with system name, time, and connection indicator
- Left panel: System status with glowing progress bars
- Right panel: Real-time data stream log with color-coded entries
- Bottom: Control buttons with hover glow effects
- L-shaped corner decorations on all major panels
- Cyan/teal color scheme with status colors`}]},{slug:"kawaii-minimal",name:"可爱极简",nameEn:"Kawaii Minimal",description:"融合日系可爱文化与极简设计的温柔风格。柔和的粉彩色系、圆润形状、轻盈留白和细腻的微交互，适合生活方式应用、儿童产品和创意工具。",cover:"/styles/kawaii-minimal.svg",styleType:"visual",tags:["minimal","expressive"],category:"minimal",colors:{primary:"#F9A8D4",secondary:"#FFF7ED",accent:["#A78BFA","#67E8F9","#FDE68A"]},keywords:["可爱","极简","粉彩","圆润","温柔","日系","卡哇伊"],philosophy:`Kawaii Minimal 风格融合日本可爱文化的温暖感与北欧极简主义的克制感。

核心理念：
- 柔和粉彩：使用低饱和度的粉、紫、蓝、黄色系，营造温柔氛围
- 圆润形状：大圆角、圆形元素、避免尖锐边角
- 轻盈留白：充足的呼吸空间让界面感觉轻松舒适
- 微交互：细腻的弹跳、摇摆动效增加趣味性
- 功能优先：可爱但不杂乱，保持信息清晰`,doList:["背景使用暖白 bg-[#FFF7ED] 或 bg-orange-50","使用大圆角 rounded-2xl rounded-3xl rounded-full","使用柔和阴影 shadow-sm shadow-md（避免深色强阴影）","文字使用圆润无衬线字体 font-sans font-medium","按钮使用粉彩渐变或柔和纯色","卡片使用浅色边框 border-pink-200 或无边框","交互使用弹跳缩放 hover:scale-105 active:scale-95","间距宽松 p-6 p-8 gap-6 gap-8"],dontList:["禁止使用深色/黑色背景","禁止使用尖锐边角 rounded-none rounded-sm","禁止使用发光/霓虹效果","禁止使用高饱和度荧光色","禁止使用粗体黑色边框","禁止信息过密，保持留白"],components:{button:{name:"可爱按钮",description:"圆润柔和的粉彩按钮，带弹跳交互",code:`// Primary Kawaii
<button className="px-6 py-3 bg-pink-300 text-white rounded-full shadow-md hover:bg-pink-400 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 font-medium">
  Click Me
</button>

// Pastel Outline
<button className="px-6 py-3 bg-white border-2 border-pink-200 text-pink-400 rounded-full hover:bg-pink-50 hover:border-pink-300 hover:scale-105 active:scale-95 transition-all duration-200 font-medium">
  Explore
</button>

// Gradient Kawaii
<button className="px-6 py-3 bg-gradient-to-r from-pink-300 to-purple-300 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 font-medium">
  Let's Go
</button>`},card:{name:"可爱卡片",description:"圆润柔和的卡片，轻盈阴影和粉彩装饰",code:`<div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border border-pink-100">
  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center mb-4">
    <span className="text-white text-lg">*</span>
  </div>
  <h3 className="text-gray-800 text-lg font-semibold mb-2">
    Sweet Feature
  </h3>
  <p className="text-gray-500 text-sm leading-relaxed">
    A delightful experience designed with care and attention to detail.
  </p>
</div>`},input:{name:"可爱输入框",description:"圆润边框输入框，柔和聚焦效果",code:`<div className="space-y-2">
  <label className="block text-gray-600 text-sm font-medium">Your Name</label>
  <input
    type="text"
    className="w-full px-4 py-3 bg-white border-2 border-pink-200 rounded-2xl text-gray-700 placeholder:text-pink-300 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-200"
    placeholder="Type here..."
  />
</div>`}},globalCss:`/* Kawaii Minimal Global Styles */
@layer base {
  body {
    @apply bg-[#FFF7ED] text-gray-700 antialiased;
  }

  ::selection {
    @apply bg-pink-200 text-pink-800;
  }
}

@keyframes kawaii-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

@keyframes kawaii-wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  75% { transform: rotate(3deg); }
}

@keyframes kawaii-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}`,aiRules:`STYLE: Kawaii Minimal
TYPE: Cute minimalist pastel interface

MUST USE:
- Warm light background: bg-[#FFF7ED] or bg-orange-50
- Large rounded corners: rounded-2xl, rounded-3xl, rounded-full
- Soft shadows: shadow-sm, shadow-md (not dark/strong)
- Pastel colors: pink-300, purple-300, cyan-200, yellow-200
- Bounce interactions: hover:scale-105 active:scale-95
- Generous spacing: p-6, p-8, gap-6
- font-sans font-medium for text
- White cards with light borders

MUST AVOID:
- Dark/black backgrounds
- Sharp corners (rounded-none, rounded-sm)
- Glow/neon effects
- High saturation neon colors
- Bold black borders
- Dense information layout

COLOR SYSTEM:
- Background: #FFF7ED (warm white)
- Card: white
- Primary: #F9A8D4 (soft pink)
- Secondary: #A78BFA (soft purple)
- Tertiary: #67E8F9 (soft cyan)
- Accent: #FDE68A (soft yellow)
- Text primary: gray-800
- Text secondary: gray-500

SPECIAL EFFECTS:
- Bounce animation on hover (scale + shadow increase)
- Wiggle animation for attention elements
- Float animation for decorative elements
- Smooth transitions (200-300ms)`,examplePrompts:[{title:"生活方式应用",titleEn:"Lifestyle App",description:"粉彩配色的日记或习惯追踪应用",descriptionEn:"Pastel-themed diary or habit tracker app",prompt:`Create a lifestyle app interface using Kawaii Minimal style:
- Warm white background with pastel accents
- Rounded cards with soft shadows
- Pink/purple gradient buttons
- Bouncy hover interactions
- Clean typography with generous spacing
- Decorative rounded icons
- Habit tracker with pastel progress indicators`}]},{slug:"film-noir",name:"黑色电影",nameEn:"Film Noir",description:"源自 1940-50 年代经典黑色电影的戏剧性视觉风格。极致的明暗对比、深沉的灰阶层次、斜线光影和神秘氛围，适合故事驱动的产品、摄影作品集和高端品牌。",cover:"/styles/film-noir.svg",styleType:"visual",tags:["expressive","high-contrast"],category:"retro",colors:{primary:"#1a1a1a",secondary:"#f5f5f0",accent:["#c41e3a","#8b7355","#d4af37"]},keywords:["黑色电影","明暗对比","光影","戏剧","复古","神秘","高对比"],philosophy:`Film Noir 风格取自 1940-50 年代好莱坞黑色电影的视觉语言。

核心理念：
- 极致对比：深黑与亮白之间几乎没有中间地带，制造戏剧张力
- 光影叙事：斜线阴影、窗棂光影、聚光灯效果讲述故事
- 灰阶主导：以黑白灰为主色调，仅用极少量点缀色（猩红、金色）
- 排版古典：使用衬线标题 + 无衬线正文，呼应老式报刊美学
- 神秘氛围：信息隐约可见，吸引用户深入探索`,doList:["背景使用深黑 bg-[#0a0a0a] 或 bg-neutral-950","文字使用灰白色 text-neutral-100 text-neutral-300","使用衬线字体作标题 font-serif italic","卡片使用极微妙的灰色区分层次 bg-neutral-900 bg-neutral-800","强调元素使用猩红色 text-[#c41e3a]（极少量）","使用线性渐变模拟光影效果","边框极细或无边框 border-neutral-800","hover 效果使用亮度变化而非颜色变化"],dontList:["禁止使用彩色背景","禁止使用高饱和度颜色（猩红仅作点缀）","禁止使用圆角过大 rounded-2xl+","禁止使用卡通/可爱元素","禁止使用阴影发光效果","禁止使用渐变按钮"],components:{button:{name:"Noir 按钮",description:"低调的高对比度按钮，简洁有力",code:`// Primary Noir
<button className="px-6 py-3 bg-neutral-100 text-neutral-950 font-serif italic tracking-wide hover:bg-white transition-colors duration-300">
  Investigate
</button>

// Ghost Noir
<button className="px-6 py-3 bg-transparent border border-neutral-500 text-neutral-300 font-serif italic tracking-wide hover:border-neutral-100 hover:text-neutral-100 transition-colors duration-300">
  Read More
</button>

// Crimson Accent
<button className="px-6 py-3 bg-[#c41e3a] text-white font-serif italic tracking-wide hover:bg-[#a01830] transition-colors duration-300">
  Confess
</button>`},card:{name:"Noir 卡片",description:"深色层次卡片，带斜线光影装饰",code:`<div className="relative bg-neutral-900 p-8 overflow-hidden group hover:bg-neutral-800/80 transition-colors duration-500">
  {/* Diagonal light shaft */}
  <div className="absolute -top-20 -right-20 w-40 h-80 bg-gradient-to-b from-white/5 to-transparent rotate-45 group-hover:from-white/10 transition-all duration-700" />

  <div className="relative">
    <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-3">Case File #47</p>
    <h3 className="text-neutral-100 text-xl font-serif italic mb-3">
      The Last Witness
    </h3>
    <p className="text-neutral-400 text-sm leading-relaxed">
      The rain hammered against the window as the detective studied the photograph.
      Something didn't add up.
    </p>
    <div className="mt-4 w-12 h-px bg-[#c41e3a]" />
  </div>
</div>`},input:{name:"Noir 输入框",description:"暗色背景输入框，最小化装饰",code:`<div className="space-y-2">
  <label className="block text-neutral-400 text-xs uppercase tracking-[0.2em] font-serif">Subject Name</label>
  <input
    type="text"
    className="w-full px-4 py-3 bg-neutral-950 border-b border-neutral-700 text-neutral-100 font-serif placeholder:text-neutral-600 focus:outline-none focus:border-neutral-400 transition-colors duration-300"
    placeholder="Enter name..."
  />
</div>`}},globalCss:`/* Film Noir Global Styles */
@layer base {
  body {
    @apply bg-[#0a0a0a] text-neutral-300 antialiased;
  }

  h1, h2, h3 {
    @apply font-serif italic;
  }

  ::selection {
    @apply bg-neutral-300 text-neutral-950;
  }
}

@keyframes noir-spotlight {
  0%, 100% { opacity: 0.05; }
  50% { opacity: 0.1; }
}

@keyframes noir-fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}`,aiRules:`STYLE: Film Noir
TYPE: Dramatic high-contrast monochrome interface

MUST USE:
- Deep black background: bg-[#0a0a0a] or bg-neutral-950
- Grayscale palette: neutral-100 through neutral-950
- Serif italic headings: font-serif italic
- Extremely subtle layer separation: bg-neutral-900 vs bg-neutral-800
- Minimal crimson accent: text-[#c41e3a] (sparingly)
- Diagonal gradient light effects for drama
- Thin or no borders: border-neutral-800
- Uppercase small tracking labels: text-xs uppercase tracking-[0.2em]

MUST AVOID:
- Colorful backgrounds
- High saturation colors (crimson only as rare accent)
- Large rounded corners (rounded-2xl+)
- Cartoon/cute elements
- Glow effects
- Gradient buttons
- Emoji or playful iconography

COLOR SYSTEM:
- Background: #0a0a0a (near black)
- Card: neutral-900
- Card hover: neutral-800
- Text primary: neutral-100
- Text secondary: neutral-400
- Text muted: neutral-500
- Crimson accent: #c41e3a (very sparingly)
- Gold accent: #d4af37 (very sparingly)
- Borders: neutral-700 to neutral-800

SPECIAL EFFECTS:
- Diagonal light shaft overlays (rotate-45 gradient)
- Spotlight breathing animation
- Fade-in with subtle upward motion
- Brightness-based hover (not color-based)`,examplePrompts:[{title:"侦探故事集",titleEn:"Detective Story Portfolio",description:"黑白灰调的故事驱动作品展示",descriptionEn:"Monochrome story-driven portfolio showcase",prompt:`Create a detective story portfolio using Film Noir style:
- Near-black background with subtle grey card layers
- Serif italic headings for dramatic titles
- Diagonal light shaft effects across cards
- Minimal crimson accent lines for emphasis
- Uppercase tracking labels for metadata
- Vintage newspaper-inspired typography
- Mysterious atmospheric hover effects`}]},{slug:"arcade-crt",name:"街机CRT",nameEn:"Arcade CRT",description:"80-90年代街机显示器美学，包含扫描线、屏幕曲率、霓虹辉光和RGB色差效果。适合游戏、复古科技、创意项目。",cover:"/styles/arcade-crt.svg",styleType:"visual",tags:["retro","expressive","high-contrast"],category:"retro",colors:{primary:"#39ff14",secondary:"#050505",accent:["#ff00ff","#00ffff","#ff2a2a","#FFFF00","#ff8533"]},keywords:["CRT","scanlines","retro gaming","arcade","pixel","neon glow","chromatic aberration"],philosophy:`Arcade CRT 风格再现了80-90年代街机CRT显示器的怀旧辉光。

核心理念：
- 扫描线叠加：所有内容区域使用 repeating-linear-gradient 扫描线效果
- 霓虹辉光：关键元素使用 text-shadow/box-shadow 发光效果
- 像素字体：所有文字使用 monospace 字体
- 极暗背景：近乎纯黑的背景最大化霓虹对比度
- RGB色差：标题使用品红和青色偏移的 text-shadow
- 高饱和度：仅使用高饱和度霓虹色`,doList:["Use scanline overlay on all content areas","Apply neon glow (text-shadow/box-shadow) to key elements","Use monospace/pixel fonts for all text","Keep backgrounds near-black to maximize neon contrast","Add RGB chromatic aberration on headlines","Use high-saturation neon colors only"],dontList:["Don't use pastel or muted colors","Don't use serif or sans-serif body fonts","Don't use rounded corners larger than 4px","Don't use subtle shadows - only neon glows","Don't use gradients that aren't neon-to-dark"],components:{button:{name:"按钮",description:"Arcade CRT 霓虹按钮，带发光效果和像素字体",code:`// Neon Green Primary
<button className="px-6 py-3 bg-[#39ff14] text-black font-mono text-sm uppercase tracking-[0.2em] border-2 border-[#39ff14] shadow-[0_0_20px_rgba(57,255,20,0.5)] hover:shadow-[0_0_40px_rgba(57,255,20,0.8)] transition-all duration-200">
  INSERT COIN
</button>

// Cyan Outline
<button className="px-6 py-3 bg-transparent text-[#00ffff] font-mono text-sm uppercase tracking-[0.2em] border-2 border-[#00ffff] shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:bg-[#00ffff]/10 transition-all duration-200">
  SELECT
</button>

// Magenta Variant
<button className="px-6 py-3 bg-transparent text-[#ff00ff] font-mono text-sm uppercase tracking-[0.2em] border-2 border-[#ff00ff] shadow-[0_0_15px_rgba(255,0,255,0.3)] hover:bg-[#ff00ff]/10 transition-all duration-200">
  PLAYER 2
</button>

// Red Danger
<button className="px-6 py-3 bg-transparent text-[#ff2a2a] font-mono text-sm uppercase tracking-[0.2em] border-2 border-[#ff2a2a] shadow-[0_0_15px_rgba(255,42,42,0.3)] hover:bg-[#ff2a2a]/10 transition-all duration-200">
  GAME OVER
</button>`},card:{name:"卡片",description:"Arcade CRT 风格的发光边框卡片，带扫描线叠加",code:`<div className="bg-[#0a0a0a] border-2 border-[#39ff14]/30 p-6 relative overflow-hidden hover:border-[#39ff14]/60 hover:shadow-[0_0_30px_rgba(57,255,20,0.2)] transition-all duration-200">
  {/* Scanline overlay */}
  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(57,255,20,0.03)_2px,rgba(57,255,20,0.03)_4px)] pointer-events-none" />

  <div className="relative">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-2 h-2 bg-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.8)]" />
      <h3 className="text-[#39ff14] font-mono text-xs uppercase tracking-[0.2em]">Game Module</h3>
    </div>
    <h4 className="text-white text-lg font-mono font-bold mb-2" style={{textShadow: '-2px 0 #ff00ff, 2px 0 #00ffff'}}>
      TITLE HERE
    </h4>
    <p className="text-[#39ff14]/60 font-mono text-sm leading-relaxed">
      Description text with terminal green tint.
    </p>
  </div>
</div>`},input:{name:"输入框",description:"Arcade CRT 终端风格输入框",code:`<div className="space-y-2">
  <label className="block text-[#39ff14] font-mono text-xs uppercase tracking-[0.2em]">Player Name</label>
  <input
    type="text"
    className="w-full px-4 py-3 bg-black border-2 border-[#39ff14]/40 text-[#39ff14] font-mono text-sm placeholder:text-[#39ff14]/30 focus:outline-none focus:border-[#39ff14] focus:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all duration-200"
    placeholder="ENTER NAME..."
  />
</div>`},nav:{name:"导航栏",description:"Arcade CRT 导航栏，带扫描线和霓虹边框",code:`<nav className="bg-[#050505]/95 border-b-2 border-[#39ff14]/30 backdrop-blur-sm px-6 py-3 flex justify-between items-center">
  <span className="text-[#39ff14] font-mono text-sm uppercase tracking-[0.15em]">ARCADE CRT</span>
  <div className="flex gap-6">
    <a className="text-[#00ffff] font-mono text-xs uppercase tracking-widest hover:text-[#00ffff]/70 transition-colors">Games</a>
    <a className="text-[#39ff14]/60 font-mono text-xs uppercase tracking-widest hover:text-[#39ff14] transition-colors">Scores</a>
  </div>
</nav>`},hero:{name:"Hero 区域",description:"Arcade CRT Hero 区域，带 RGB 色差标题和扫描线",code:`<section className="relative bg-[#050505] overflow-hidden px-6 py-20">
  {/* Scanline overlay */}
  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(57,255,20,0.03)_2px,rgba(57,255,20,0.03)_4px)] pointer-events-none" />
  <div className="relative max-w-4xl mx-auto text-center">
    <h1 className="text-5xl md:text-7xl font-mono font-bold uppercase tracking-wider text-[#39ff14]" style={{textShadow: '-3px 0 #ff00ff, 3px 0 #00ffff'}}>
      ARCADE CRT
    </h1>
    <p className="mt-4 text-[#00ffff]/70 font-mono text-sm">
      Press Start to Begin
    </p>
  </div>
</section>`},footer:{name:"页脚",description:"Arcade CRT 页脚",code:`<footer className="bg-[#050505] border-t-2 border-[#39ff14]/20 px-6 py-6">
  <p className="text-[#39ff14]/40 font-mono text-xs text-center uppercase tracking-widest">
    CREDITS: 00 // INSERT COIN
  </p>
</footer>`}},globalCss:`/* Arcade CRT Global Styles */
@layer base {
  body {
    @apply bg-[#050505] text-[#39ff14] antialiased;
    background-image:
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(57, 255, 20, 0.03) 2px,
        rgba(57, 255, 20, 0.03) 4px
      );
  }

  h1, h2, h3 {
    text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff;
  }

  ::selection {
    @apply bg-[#39ff14] text-black;
  }
}

@keyframes crt-flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.98; }
}
@keyframes crt-scanline-move {
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
}
@keyframes neon-flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
  20%, 24%, 55% { opacity: 0.8; }
}
@keyframes rgb-shift {
  0%, 100% { text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
  50% { text-shadow: -3px 0 #ff00ff, 3px 0 #00ffff; }
}`,aiRules:`STYLE: Arcade CRT
TYPE: Retro gaming CRT monitor aesthetic

MUST USE:
- Background: Always near-black (#050505 or #0a0a0a)
- Primary accent: Neon green (#39ff14) for main interactive elements
- Secondary accents: Magenta (#ff00ff), Cyan (#00ffff), Red (#ff2a2a), Yellow (#FFFF00)
- All text must use monospace or pixel fonts (font-mono)
- Scanline overlay: repeating-linear-gradient on content areas
- RGB chromatic aberration: text-shadow with offset magenta and cyan on headlines
- Neon glow: box-shadow with color matching the element
- uppercase text with wide letter-spacing for labels
- CRT vignette: slight darkening at edges

MUST AVOID:
- Light/white backgrounds
- Pastel or muted colors
- Serif or sans-serif fonts
- Large border-radius (max 4px)
- Subtle/standard shadows (use neon glow only)
- Gradients that aren't neon-to-dark

COLOR RULES:
- Primary: Neon Green (#39ff14)
- Accent 1: Magenta (#ff00ff)
- Accent 2: Cyan (#00ffff)
- Accent 3: Red (#ff2a2a)
- Accent 4: Yellow (#FFFF00)
- Background: Near-black (#050505)

SPECIAL EFFECTS:
- Scanline overlay via CSS repeating-linear-gradient
- RGB chromatic aberration on headings
- Neon flicker animation for atmosphere
- CRT screen curvature hint via vignette`,examplePrompts:[{title:"街机游戏选择器",titleEn:"Arcade Game Selector",description:"带CRT显示器边框和扫描线的游戏选择界面",descriptionEn:"Game selector with CRT monitor frame and scanline overlay",prompt:`Create an arcade game selector using Arcade CRT style:
- Dark background with scanline overlay
- Neon green game cards with glow borders
- RGB chromatic aberration on game titles
- INSERT COIN button with neon pulse
- Monospace pixel font throughout`},{title:"复古高分排行榜",titleEn:"Retro High-Score Board",description:"霓虹绿文字在黑色背景上的排行榜",descriptionEn:"Neon green text leaderboard on black background",prompt:`Build a retro high-score leaderboard using Arcade CRT style:
- Near-black background with scanline effect
- Neon green text for scores
- Player names in cyan
- Rank numbers in yellow
- Pulsing top-score highlight`}]},{slug:"frutiger-aero",name:"Frutiger Aero",nameEn:"Frutiger Aero",description:"Windows Vista/7时代的玻璃质感美学，天空蓝渐变、半透明毛玻璃面板与自然元素融合，营造清新通透的数字自然感。",cover:"/styles/frutiger-aero.svg",styleType:"visual",tags:["retro","expressive"],category:"retro",colors:{primary:"#87CEEB",secondary:"#5FB3CC",accent:["#ffffff","#e0f2fe","#34d399","#7dd3fc"]},keywords:["aero glass","translucent","sky blue","glossy","Vista","Y2K","nature","bubbles"],philosophy:`Frutiger Aero draws inspiration from the Windows Vista/7 Aero glass aesthetic -- sky-blue gradients, frosted glass panels, water droplets, and a feeling of floating in clean air.

Core principles:
- Translucency: Semi-transparent white panels over bright sky gradients
- Nature meets technology: Organic shapes, bubbles, and leaves blended with digital UI
- Light and airy: Generous whitespace, soft shadows, rounded corners everywhere
- Glossy reflections: Subtle gradient highlights that simulate light on glass surfaces`,doList:["Use sky blue gradient backgrounds (from-sky-300 to-sky-500)","Apply backdrop-blur and translucent white panels (bg-white/30 to bg-white/50)","Use large rounded corners (rounded-2xl to rounded-3xl)","Add glossy highlights and reflections on cards","Include nature-inspired decorative elements (bubbles, leaves, water)","Use clean sans-serif typography"],dontList:["Don't use dark or black backgrounds","Don't use sharp corners or angular shapes","Don't use neon or harsh colors","Don't use monospace fonts","Don't use flat/matte surfaces without any glass effect"],components:{button:{name:"Button",description:"Frutiger Aero glass button with translucent white background and glossy feel",code:`<button className="
  px-6 py-3
  bg-gradient-to-b from-white/90 to-white/60
  backdrop-blur-md
  border border-white/50
  rounded-full
  text-sky-700 font-medium text-sm
  shadow-lg
  hover:shadow-xl hover:from-white/95
  transition-all duration-300
">
  Glass Button
</button>`},card:{name:"Card",description:"Frosted glass card with translucent white background on sky-blue gradient",code:`<div className="
  p-6
  bg-white/40 backdrop-blur-xl
  border border-white/50
  rounded-3xl
  shadow-xl
  hover:bg-white/50 hover:shadow-2xl hover:scale-[1.01]
  transition-all duration-300
">
  <h3 className="text-xl font-semibold text-sky-900 mb-2">
    Aero Card
  </h3>
  <p className="text-sky-700/80">
    Translucent glass panel with Vista-style frosted effect
  </p>
</div>`},input:{name:"Input",description:"Glass input field with translucent background and soft focus state",code:`<input
  type="text"
  placeholder="Type here..."
  className="
    w-full px-4 py-3
    bg-white/30 backdrop-blur-md
    border border-white/40
    rounded-2xl
    text-sky-900 placeholder:text-sky-400/50
    focus:outline-none focus:border-white/70 focus:bg-white/40
    transition-all
  "
/>`},nav:{name:"Navigation",description:"Translucent glass navigation bar with backdrop blur",code:`<nav className="
  fixed top-0 left-0 right-0 z-50
  px-6 py-4
  bg-white/30 backdrop-blur-xl
  border-b border-white/30
">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <a href="/" className="text-sky-800 font-bold text-xl">
      Logo
    </a>
    <div className="flex gap-6">
      <a href="#" className="text-sky-700/80 hover:text-sky-900 transition-colors">
        Home
      </a>
      <a href="#" className="text-sky-700/80 hover:text-sky-900 transition-colors">
        About
      </a>
    </div>
  </div>
</nav>`},hero:{name:"Hero",description:"Sky-blue gradient hero section with floating glass card",code:`<section className="
  relative min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-sky-300 via-sky-400 to-sky-500
  overflow-hidden px-6
">
  <div className="
    max-w-2xl mx-auto text-center
    p-8 md:p-12
    bg-white/30 backdrop-blur-xl
    border border-white/40
    rounded-3xl
    shadow-2xl
  ">
    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-6">
      Frutiger Aero
    </h1>
    <p className="text-lg text-white/80 mb-8">
      Sky-blue glass aesthetic inspired by Windows Vista/7
    </p>
    <button className="
      px-8 py-4
      bg-gradient-to-b from-white/90 to-white/60
      backdrop-blur-md border border-white/50
      rounded-full
      text-sky-700 font-semibold
      hover:from-white/95
      shadow-lg hover:shadow-xl
      transition-all
    ">
      Explore
    </button>
  </div>
</section>`},footer:{name:"Footer",description:"Glass footer with translucent background",code:`<footer className="
  py-8 px-6
  bg-white/20 backdrop-blur-md
  border-t border-white/20
">
  <div className="max-w-6xl mx-auto text-center">
    <p className="text-sky-700/60 text-sm">
      Frutiger Aero Style
    </p>
  </div>
</footer>`}},globalCss:`/* Frutiger Aero Global Styles */

:root {
  --aero-sky-light: #87CEEB;
  --aero-sky-dark: #5FB3CC;
  --aero-glass-bg: rgba(255, 255, 255, 0.3);
  --aero-glass-border: rgba(255, 255, 255, 0.4);
}

@keyframes aero-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes aero-bubble {
  0% { transform: translateY(100%) scale(0.5); opacity: 0; }
  50% { opacity: 0.6; }
  100% { transform: translateY(-100vh) scale(1); opacity: 0; }
}

@keyframes aero-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.aero-glass {
  background: var(--aero-glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--aero-glass-border);
}`,aiRules:`You are a Frutiger Aero design style expert. All generated code must follow these rules:

## Absolute Forbidden

- Dark or black backgrounds (bg-black, bg-gray-900, bg-slate-900)
- Sharp corners (rounded-none, rounded-sm)
- Monospace fonts (font-mono)
- Neon glow effects or harsh saturated colors
- Flat/matte surfaces without glass effect

## Must Follow

- Background: Sky blue gradients (from-sky-300 to-sky-500 or custom #87CEEB/#5FB3CC)
- Cards: Semi-transparent white (bg-white/30 to bg-white/50) with backdrop-blur-xl
- Borders: Subtle white borders (border-white/30 to border-white/50)
- Rounded corners: Always large (rounded-2xl or rounded-3xl)
- Shadows: Soft, diffused shadows for depth
- Text: White or dark blue for contrast on glass
- Decorative: Bubbles, water droplets, cloud-like shapes floating
- Typography: Clean sans-serif (no monospace or serif)
- Glass effect is mandatory on all cards and panels
- Maintain "airy" spacing with generous padding and margins

## Color Palette

Sky gradients: from-sky-300, via-sky-400, to-sky-500
Glass panels: bg-white/30, bg-white/40, bg-white/50
Text: text-white (on dark areas), text-sky-900 (on glass)
Accents: emerald-300 (nature), sky-200 (water)

## Self Check

After generating code verify:
1. Sky-blue gradient background present
2. All panels have backdrop-blur
3. Using semi-transparent white backgrounds
4. Large rounded corners on all elements
5. Text is readable against glass backgrounds`,examplePrompts:[{title:"Weather Dashboard",titleEn:"Weather Dashboard",description:"Aero glass weather panels on sky background",descriptionEn:"Create a weather dashboard with Aero glass panels and sky background",prompt:`Create a weather dashboard in Frutiger Aero style:
1. Background: Full sky-blue gradient (from-sky-300 to-sky-500)
2. Main card: Current temperature with glass panel, large numbers
3. Hourly forecast: Horizontal scroll with small glass cards
4. Weekly forecast: List with glass rows
5. Decorative floating bubbles in the background`},{title:"Music Player",titleEn:"Music Player",description:"Vista-style translucent music controls",descriptionEn:"Build a music player with translucent Vista-style controls",prompt:`Create a music player in Frutiger Aero style:
1. Background: Sky gradient with floating bubbles
2. Album card: Glass panel with cover art
3. Controls: Translucent play/pause buttons with glass effect
4. Progress bar: Glass track with glossy slider
5. Playlist: Side panel with glass rows`},{title:"Product Showcase",titleEn:"Product Showcase",description:"Floating glass product cards on blue sky",descriptionEn:"Design a product showcase with floating glass cards on blue sky",prompt:`Create a product showcase in Frutiger Aero style:
1. Background: Sky gradient with cloud-like decorations
2. Hero: Large title with glass overlay
3. Product grid: 3-column glass cards with hover float effect
4. Each card: Product image, name, price on translucent panel
5. CTA buttons: Glossy white glass with rounded-full`}]},{slug:"anti-design",name:"反设计",nameEn:"Anti-Design",description:"故意打破传统UI规范的粗野主义实验风格，极粗边框、高饱和色彩与不规则排版",cover:"/styles/anti-design.svg",styleType:"visual",tags:["expressive","high-contrast"],category:"expressive",colors:{primary:"#000000",secondary:"#FFFFFF",accent:["#FF0000","#0000FF","#FFFF00","#FF00FF","#00FFFF","#00FF00"]},keywords:["brutalism","anti-design","raw","experimental","bold","punk","rebellious"],philosophy:`Anti-Design deliberately breaks every UI convention. Where traditional design seeks harmony, Anti-Design seeks visual conflict.

Core principles:
- Ultra-thick black borders (4-8px) on every element
- Sharp corners only (border-radius: 0) - nothing is ever rounded
- High-saturation primary colors: red, blue, yellow, magenta, cyan, green
- Rotated text and elements at odd angles (-3deg to 5deg)
- Dramatically mixed font sizes within the same section
- Asymmetric, uneven borders (thicker on right/bottom)
- Intentional visual conflict between adjacent elements
- Hard offset shadows only - no soft shadows ever`,doList:["Use ultra-thick black borders (4-8px) on everything","Use sharp corners only (border-radius: 0)","Apply high-saturation primary colors (red, blue, yellow, magenta)","Rotate text and elements at odd angles (-3deg to 5deg)","Mix font sizes dramatically within the same section","Use asymmetric, uneven borders (thicker on right/bottom)","Create intentional visual conflict between adjacent elements","Use hard offset shadows only (e.g., shadow-[8px_8px_0_#000])","Use font-black weight and uppercase for emphasis"],dontList:["Don't use rounded corners of any kind","Don't use subtle or muted colors","Don't use consistent spacing or alignment","Don't use drop shadows or soft shadows","Don't use gradients (flat colors only)","Don't make things pretty or harmonious","Don't use backdrop-blur or translucency"],components:{button:{name:"按钮",description:"Anti-Design 风格按钮 - 极粗黑边、硬偏移阴影、高饱和色",code:`<button className="
  px-6 py-3
  bg-[#FF0000] text-white
  font-black text-sm uppercase
  border-4 border-black
  rounded-none
  shadow-[4px_4px_0_#000]
  hover:shadow-[6px_6px_0_#000]
  hover:-translate-x-[2px] hover:-translate-y-[2px]
  active:shadow-[2px_2px_0_#000]
  active:translate-x-[2px] active:translate-y-[2px]
  transition-all duration-100
">
  CLICK ME
</button>`},card:{name:"卡片",description:"Anti-Design 风格卡片 - 白底粗黑框硬偏移阴影",code:`<div className="
  bg-white
  border-4 border-black
  p-6
  rounded-none
  shadow-[8px_8px_0_#000]
  hover:shadow-[12px_12px_0_#000]
  hover:-translate-x-1 hover:-translate-y-1
  transition-all duration-100
">
  <h3 className="text-2xl font-black uppercase mb-2">CARD TITLE</h3>
  <p className="text-sm font-bold text-black/70">Raw brutalist content block</p>
</div>`},input:{name:"输入框",description:"Anti-Design 风格输入框 - 极粗黑边、蓝色聚焦态",code:`<input
  type="text"
  placeholder="TYPE HERE..."
  className="
    w-full px-4 py-3
    bg-white
    border-4 border-black
    rounded-none
    text-black font-bold
    placeholder:text-gray-400
    focus:outline-none
    focus:border-[#0000FF]
    focus:shadow-[4px_4px_0_#0000FF]
    transition-all duration-100
  "
/>`},nav:{name:"导航栏",description:"Anti-Design 风格导航 - 白底粗黑下边框",code:`<nav className="
  bg-white
  border-b-4 border-black
  px-6 py-4
  flex items-center justify-between
">
  <span className="font-black text-xl uppercase">ANTI-DESIGN</span>
  <div className="flex gap-4">
    <a className="font-black text-sm uppercase hover:text-[#FF0000]">LINK</a>
  </div>
</nav>`},hero:{name:"Hero 区块",description:"Anti-Design 风格 Hero - 黄色底、巨大倾斜黑色标题、粗边框",code:`<section className="
  bg-[#FFFF00]
  border-b-4 border-black
  py-20 px-6
">
  <h1 className="
    text-6xl md:text-9xl
    font-black uppercase
    text-black
    -rotate-2
  ">
    ANTI-DESIGN
  </h1>
  <p className="text-xl font-bold text-black/70 mt-4 max-w-xl">
    BREAK EVERY RULE. REJECT EVERY CONVENTION.
  </p>
</section>`},footer:{name:"页脚",description:"Anti-Design 风格页脚 - 黑底白字粗上边框",code:`<footer className="
  bg-black text-white
  border-t-4 border-white
  px-6 py-8
">
  <p className="font-black text-sm uppercase">ANTI-DESIGN STUDIO</p>
</footer>`}},globalCss:`/* Anti-Design Global Styles */

:root {
  --anti-black: #000000;
  --anti-white: #FFFFFF;
  --anti-red: #FF0000;
  --anti-blue: #0000FF;
  --anti-yellow: #FFFF00;
  --anti-magenta: #FF00FF;
  --anti-cyan: #00FFFF;
  --anti-green: #00FF00;
}

@keyframes anti-shake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-1deg); }
  75% { transform: rotate(1deg); }
}

@keyframes anti-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

@keyframes anti-marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

/* Thick asymmetric borders */
.anti-border-asymmetric {
  border-right-width: 6px;
  border-bottom-width: 6px;
  border-left-width: 4px;
  border-top-width: 4px;
}`,aiRules:`You are an Anti-Design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Rounded corners of any kind (rounded-sm, rounded-md, rounded-lg, rounded-xl, rounded-full)
- Subtle or muted colors (grays, pastels, earth tones)
- Soft shadows (shadow-sm, shadow-md, shadow-lg, shadow-xl)
- Gradients of any kind (all colors must be flat high-saturation)
- Backdrop blur or translucency effects
- Consistent spacing or alignment that looks "designed"
- Harmonious color combinations

## Must Follow

- Borders: Always 4-8px solid black. Thicker on right and bottom for depth
- Border-radius: ALWAYS 0. Never round anything
- Colors: Only high-saturation primaries - #FF0000, #0000FF, #FFFF00, #FF00FF, #00FF00, #00FFFF
- Backgrounds: Alternate between white, yellow, and other bright colors per section
- Shadows: Hard offset only (e.g., shadow-[8px_8px_0_#000]). No soft shadows
- Text: Mix sizes dramatically. Use font-black weight. Uppercase for emphasis
- Layout: Intentionally break grid alignment. Rotate elements (-3deg to 5deg)
- Fonts: Bold sans-serif. Mix sizes within sections for visual tension
- White space: Can be either very tight or exaggerated - never "just right"

## Color Palette

Primary:
- Pure Black: #000000 (borders, text, shadows)
- Pure White: #FFFFFF (backgrounds)
- Red: #FF0000 (primary accent, buttons)
- Blue: #0000FF (secondary accent, focus states)
- Yellow: #FFFF00 (section backgrounds, highlights)
- Magenta: #FF00FF (accent)
- Cyan: #00FFFF (accent)
- Green: #00FF00 (accent)

## Special Elements

- Ultra-thick borders on every element
- Hard offset shadows with no blur
- Rotated/tilted elements for visual disruption
- Dramatically mixed font sizes
- Asymmetric border widths
- Alternating high-saturation section backgrounds`,examplePrompts:[{title:"反设计作品集页",titleEn:"Anti-Design Portfolio Page",description:"极粗边框、冲突色彩的粗野主义作品集",descriptionEn:"Brutalist portfolio page with thick borders and clashing colors",prompt:`Use Anti-Design style to create a portfolio page:
1. Yellow hero section with giant rotated black uppercase title
2. White cards with border-4 border-black and hard offset shadows
3. Each card has a different primary color accent strip
4. Mix font sizes dramatically - some text huge, some tiny
5. Rotate some elements slightly for visual chaos
6. No rounded corners anywhere - everything sharp
7. Footer: black background with white text and thick border`},{title:"反设计活动海报",titleEn:"Anti-Design Event Poster",description:"旋转文字和粗野排版的实验性活动页面",descriptionEn:"Experimental event page with rotated text and raw typography",prompt:`Use Anti-Design style to create an event poster page:
1. Alternating section backgrounds: yellow, red, blue, white
2. Giant uppercase titles with -rotate-2 to rotate-3
3. Deliberately misaligned text blocks
4. All borders 4-8px solid black
5. Hard offset shadows shadow-[8px_8px_0_#000]
6. Button row with each button a different primary color
7. Intentional visual conflict between adjacent sections`},{title:"反设计产品页",titleEn:"Anti-Design Product Page",description:"打破一切UI规范的叛逆产品展示页",descriptionEn:"Rebellious product page that breaks every UI convention",prompt:`Use Anti-Design style to create a product page:
1. Hero: yellow background, massive tilted product name
2. Feature cards with different accent color tops (red, blue, magenta, green)
3. Rules section on blue #0000FF background with white text
4. Component showcase with buttons, inputs, all thick black borders
5. Color palette section showing flat color blocks
6. No subtle anything - maximum visual impact`}]},{slug:"holographic",name:"全息渐变",nameEn:"Holographic",description:"彩虹光谱虹彩渐变美学，模拟全息投影的棱镜折射与动态光效，营造超凡脱俗的虹彩体验。",cover:"/styles/holographic.svg",styleType:"visual",tags:["modern","expressive","high-contrast"],category:"expressive",colors:{primary:"#a855f7",secondary:"#0a0a1f",accent:["#ff0080","#ffd700","#00d4ff","#00ff88","#6366f1"]},keywords:["holographic","iridescent","rainbow","prismatic","gradient","spectrum","foil","全息","虹彩","棱镜"],philosophy:`Holographic（全息渐变）模拟全息箔片的棱镜之美——彩虹光谱渐变随视角变化而流转，营造超凡脱俗的虹彩体验。

核心理念：
- 棱镜折射：多色光谱渐变，3个以上色停
- 宇宙深空：深色背景让全息元素跃然而出
- 动态光效：渐变位移动画模拟全息箔片的角度变化
- 半透明层叠：玻璃质感卡片配合背景模糊`,doList:["Use multi-color gradient backgrounds (linear-gradient with 3+ color stops)","Apply background-size animation for moving gradient effects","Use semi-transparent cards over dark cosmic backgrounds","Add prismatic box-shadow with multiple colored glows","Include holographic sticker badges with full spectrum gradients","Use dark purple/navy backgrounds (#0a0a1f, #1a0b2e) to make holographic elements pop"],dontList:["Don't use flat solid colors without gradient","Don't use light/white backgrounds (kills the holographic effect)","Don't use muted or desaturated colors","Don't use sharp corners without any glow","Don't use more than 2 non-gradient elements in a row"],components:{button:{name:"按钮",description:"全息渐变风格按钮，棱镜光效悬浮反馈",code:`<button className="
  px-6 py-3 rounded-xl font-medium text-sm
  transition-all duration-500 relative overflow-hidden
  bg-gradient-to-r from-[#ff0080] via-[#7928ca] to-[#00d4ff]
  text-white
  shadow-[0_0_20px_rgba(147,51,234,0.5)]
  hover:shadow-[0_0_40px_rgba(147,51,234,0.7)]
  hover:scale-105
">
  Get Started
</button>`},card:{name:"卡片",description:"全息风格半透明玻璃卡片，棱镜边框光晕",code:`<div className="
  bg-white/5 backdrop-blur-xl rounded-2xl p-6
  border border-white/10 shadow-xl
  hover:border-purple-400/30
  hover:shadow-[0_0_30px_rgba(147,51,234,0.3)]
  transition-all duration-300
">
  <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff] mb-2">
    Holographic Card
  </h3>
  <p className="text-white/60 text-sm">
    Prismatic glass panel with rainbow border glow
  </p>
</div>`},input:{name:"输入框",description:"全息风格输入框，紫色聚焦光晕",code:`<input
  type="text"
  placeholder="Enter text..."
  className="
    w-full px-4 py-3
    bg-white/5 backdrop-blur-md
    border border-white/15 rounded-xl
    text-white placeholder:text-white/30
    focus:outline-none
    focus:border-purple-400/50
    focus:shadow-[0_0_15px_rgba(147,51,234,0.3)]
    transition-all
  "
/>`},nav:{name:"导航栏",description:"全息风格导航，半透明深空背景",code:`<nav className="
  bg-[#0a0a1f]/90 backdrop-blur-xl
  border-b border-white/10
  px-6 py-4
">
  <div className="flex items-center justify-between max-w-7xl mx-auto">
    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff]">
      Holographic
    </span>
    <div className="flex gap-6 text-white/60">
      <a className="hover:text-white transition-colors">Features</a>
      <a className="hover:text-white transition-colors">About</a>
    </div>
  </div>
</nav>`},hero:{name:"Hero 区块",description:"全息风格 Hero，彩虹渐变标题配宇宙深空背景",code:`<section className="relative bg-[#0a0a1f] overflow-hidden min-h-screen flex items-center justify-center">
  <div className="text-center px-6">
    <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff] mb-6">
      Holographic
    </h1>
    <p className="text-white/60 text-xl max-w-lg mx-auto mb-8">
      Prismatic rainbow gradients that shift and shimmer
    </p>
    <button className="px-8 py-4 bg-gradient-to-r from-[#ff0080] via-[#7928ca] to-[#00d4ff] text-white font-medium rounded-xl shadow-[0_0_30px_rgba(147,51,234,0.5)] hover:shadow-[0_0_50px_rgba(147,51,234,0.7)] hover:scale-105 transition-all">
      Explore
    </button>
  </div>
</section>`},footer:{name:"页脚",description:"全息风格页脚，深空背景",code:`<footer className="bg-[#0a0a1f] border-t border-white/10 py-8 px-6">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    <span className="text-white/40 text-sm">Holographic Style</span>
    <span className="text-white/40 text-sm">StyleKit</span>
  </div>
</footer>`}},globalCss:`/* Holographic 全局样式 */

:root {
  --holo-pink: #ff0080;
  --holo-orange: #ff6b00;
  --holo-gold: #ffd700;
  --holo-green: #00ff88;
  --holo-cyan: #00d4ff;
  --holo-indigo: #6366f1;
  --holo-purple: #a855f7;
}

@keyframes holo-gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes holo-shimmer {
  0% { transform: translateX(-100%) rotate(15deg); }
  100% { transform: translateX(200%) rotate(15deg); }
}

@keyframes holo-rotate {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}

/* 全息渐变背景 */
.holo-gradient {
  background: linear-gradient(
    135deg,
    var(--holo-pink),
    var(--holo-orange),
    var(--holo-gold),
    var(--holo-green),
    var(--holo-cyan),
    var(--holo-indigo),
    var(--holo-purple)
  );
  background-size: 200% 200%;
  animation: holo-gradient-shift 6s ease infinite;
}

/* 全息微光覆盖 */
.holo-shimmer::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.15) 45%,
    rgba(255, 255, 255, 0.05) 55%,
    transparent 60%
  );
  animation: holo-shimmer 3s ease-in-out infinite;
}`,aiRules:`## Holographic Style Rules
- Background: Deep dark (#0a0a1f or #1a0b2e) - cosmic/space feel
- Primary effect: Rainbow spectrum gradients using linear-gradient with 3+ stops
- Gradient colors: #ff0080 -> #ff6b00 -> #ffd700 -> #00ff88 -> #00d4ff -> #6366f1 -> #a855f7
- Cards: Semi-transparent (bg-white/5 to bg-white/10) with backdrop-blur
- Text highlights: Use bg-clip-text with gradient for headings
- Borders: Subtle white/10 to white/20 with purple/prismatic glow on hover
- Animate gradients: Use background-size: 200% and animate background-position
- Holographic badges: Small elements with full rainbow gradient + shimmer overlay
- All interactive elements should have prismatic box-shadow on hover
- Never use light/white backgrounds
- Never use flat solid colors without gradient treatment
- Never use muted or desaturated color palettes`,examplePrompts:[{title:"全息产品卡片",titleEn:"Holographic Product Card",description:"彩虹渐变边框 + 微光效果",descriptionEn:"Rainbow gradient border with shimmer effect",prompt:`用 Holographic 风格创建一个产品展示卡片，要求：
1. 深色宇宙背景 #0a0a1f
2. 半透明玻璃卡片 bg-white/5 backdrop-blur
3. 彩虹渐变边框，悬浮时棱镜光晕
4. 标题使用 bg-clip-text 彩虹渐变
5. 全息贴纸徽章装饰`},{title:"全息定价页",titleEn:"Holographic Pricing Page",description:"虹彩全息等级徽章",descriptionEn:"Iridescent holographic tier badges",prompt:`用 Holographic 风格创建定价页面，要求：
1. 三个定价等级卡片
2. 每个等级使用不同的全息渐变
3. 推荐等级添加动态渐变动画
4. 全息箔片风格的徽章标记`}]},{slug:"generative-art",name:"生成艺术",nameEn:"Generative Art",description:"算法驱动的程序化视觉美学，以数学函数、噪声纹理和参数化图形创造独特动态界面。适合创意编程、数据可视化、艺术项目。",cover:"/styles/generative-art.svg",styleType:"visual",tags:["expressive","modern","high-contrast"],category:"expressive",colors:{primary:"#7c3aed",secondary:"#0a0a0a",accent:["#3b82f6","#14b8a6","#f43f5e","#f59e0b"]},keywords:["generative","algorithmic","procedural","noise","particles","fractal","code art","creative coding","生成艺术","算法","程序化"],philosophy:`Generative Art 风格源自创意编码与算法美学，每一个视觉元素都由数学函数和程序化规则生成。

核心理念：
- 算法驱动：颜色、形状、纹理都通过数学函数生成而非手工绘制
- 参数化设计：通过 seed 值、迭代次数等参数控制输出
- 有序中的混沌：Perlin noise、分形、粒子系统创造自然与数学的交汇
- 代码即艺术：等宽字体、参数标签暗示底层的代码本质
- 暗色画布：近黑背景让算法生成的色彩更加醒目`,doList:["背景使用近黑色 bg-[#0a0a0a] 或 bg-neutral-950","使用 HSL 旋转生成算法色板，以紫色 #7c3aed 为基准","所有文字使用 font-mono 等宽字体","用 SVG 几何图案（圆、线、曲线网格）作为装饰背景","展示参数元素：seed 值、坐标、迭代次数等","使用数学缓动函数驱动动画","卡片使用 bg-neutral-900/80 backdrop-blur 的暗色玻璃效果","交互元素使用紫色发光 shadow-[0_0_20px_rgba(124,58,237,0.4)]"],dontList:["禁止使用图片或光栅位图","禁止使用传统 UI 模式（除非加入算法化改造）","禁止使用静态、毫无生气的布局","禁止使用超过 5 种颜色而没有算法依据","禁止使用非程序化派生的装饰元素","禁止使用浅色/白色背景","禁止使用 serif 或 sans 字体（必须用 monospace）"],components:{button:{name:"按钮",description:"Generative Art 风格算法主题按钮",code:`// Primary - Violet Glow
<button className="px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 border bg-violet-600 text-white border-violet-500 hover:bg-violet-500 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
  Execute
</button>

// Secondary - Outline
<button className="px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 border bg-transparent text-violet-400 border-violet-500/40 hover:border-violet-400 hover:bg-violet-500/10">
  Parameters
</button>`},card:{name:"卡片",description:"Generative Art 风格暗色玻璃卡片",code:`<div className="bg-neutral-900/80 backdrop-blur rounded-xl p-6 border border-neutral-800 relative overflow-hidden hover:border-violet-500/30 hover:shadow-[0_0_25px_rgba(124,58,237,0.15)] transition-all duration-300">
  <div className="relative">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
      <h3 className="text-violet-400 font-mono text-xs uppercase tracking-wider">Algorithm</h3>
    </div>
    <h4 className="text-white text-lg font-mono font-bold mb-2">Perlin Noise</h4>
    <p className="text-neutral-400 font-mono text-sm leading-relaxed">
      Gradient noise function for organic procedural textures.
    </p>
  </div>
</div>`},input:{name:"输入框",description:"Generative Art 风格参数输入框",code:`<div className="space-y-2">
  <label className="block text-violet-400 font-mono text-xs uppercase tracking-wider">Seed Value</label>
  <input
    type="text"
    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 font-mono text-sm placeholder:text-neutral-600 focus:outline-none focus:border-violet-500 focus:shadow-[0_0_10px_rgba(124,58,237,0.2)] transition-all duration-300"
    placeholder="Enter seed..."
  />
</div>`},nav:{name:"导航栏",description:"Generative Art 风格暗色导航",code:`<nav className="bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-neutral-800 px-6 py-4 flex justify-between items-center">
  <span className="font-mono text-white font-bold tracking-wider">GenArt</span>
  <div className="flex items-center gap-6 font-mono text-sm text-neutral-400">
    <span className="hover:text-white transition-colors cursor-pointer">Algorithms</span>
    <span className="hover:text-white transition-colors cursor-pointer">Gallery</span>
    <span className="text-violet-400 text-xs">seed: 42</span>
  </div>
</nav>`},hero:{name:"Hero 区域",description:"Generative Art 风格 Hero，带几何装饰",code:`<section className="relative bg-[#0a0a0a] overflow-hidden pt-32 pb-20 px-6">
  <h1 className="text-white font-mono font-bold text-4xl md:text-6xl mb-4">Generative Art</h1>
  <p className="text-neutral-400 font-mono text-sm md:text-base max-w-xl">
    Algorithm-driven visual aesthetics through mathematical functions and procedural generation.
  </p>
</section>`},footer:{name:"页脚",description:"Generative Art 风格暗色页脚",code:`<footer className="bg-[#0a0a0a] border-t border-neutral-800 py-8 px-6">
  <div className="max-w-6xl mx-auto flex justify-between items-center font-mono text-xs text-neutral-600">
    <span>Generative Art Style</span>
    <span>seed: 42 | iterations: 1000</span>
  </div>
</footer>`}},globalCss:`/* Generative Art Global Styles */
@layer base {
  body {
    @apply bg-[#0a0a0a] text-white antialiased;
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  }

  ::selection {
    @apply bg-violet-600 text-white;
  }
}

@keyframes gen-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes gen-pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}
@keyframes gen-drift {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(10px, -10px); }
  50% { transform: translate(-5px, 15px); }
  75% { transform: translate(-15px, -5px); }
}
@keyframes gen-hue-cycle {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}`,aiRules:`STYLE: Generative Art
TYPE: Algorithm-driven visual aesthetics

MUST USE:
- Dark background: bg-[#0a0a0a] or bg-neutral-950
- Primary accent: Violet/purple (#7c3aed) as base generative color
- Color palette: Algorithmically derived via HSL rotation from violet base
- Secondary colors: Blue (#3b82f6), Teal (#14b8a6), Rose (#f43f5e), Amber (#f59e0b)
- Monospace fonts: font-mono for all text (code-art aesthetic)
- SVG geometric shapes (circles, lines, curves) as decorative backgrounds
- Dark glass cards: bg-neutral-900/80 backdrop-blur with subtle borders
- Violet glow: shadow-[0_0_20px_rgba(124,58,237,0.4)] for interactive elements
- Parameter display: Show seed values, coordinates, algorithm names as UI elements
- Dot grid or line grid as subtle background texture

MUST AVOID:
- Stock photos or raster images
- Light/white backgrounds
- Serif or sans-serif fonts
- Conventional shadows (shadow-md)
- Static lifeless layouts
- More than 5 colors without algorithmic justification
- Decorative elements that are not procedurally derived

COLOR RULES:
- Primary: Violet (#7c3aed)
- Secondary: Blue (#3b82f6), Teal (#14b8a6)
- Highlight: Rose (#f43f5e), Amber (#f59e0b)
- Background: Near-black (#0a0a0a)
- Text: White (primary), Neutral-400 (secondary), Neutral-600 (muted)
- Borders: Neutral-800 (default), Violet-500/30 (hover)

SPECIAL EFFECTS:
- Subtle animations with mathematical easing
- Color cycling via HSL rotation
- SVG pattern overlays (dot grids, concentric circles)
- Backdrop blur for glass-panel cards`,examplePrompts:[{title:"生成艺术画廊",titleEn:"Generative Art Gallery",description:"带程序化图案背景和参数控件的生成艺术展示",descriptionEn:"Gallery with procedural pattern backgrounds and parameter controls",prompt:`Create a generative art gallery using Generative Art style:
- Dark background with dot-grid pattern overlay
- Cards for each artwork with SVG geometric illustrations
- Parameter badges showing seed, iterations, scale
- Algorithmic color palette display
- Monospace typography throughout`},{title:"创意编码工作台",titleEn:"Creative Coding Playground",description:"带算法色板生成器的创意编程平台",descriptionEn:"Creative coding platform with algorithmic palette generator",prompt:`Build a creative coding playground using Generative Art style:
- Code editor panel with dark theme
- Live preview area with generative patterns
- Color palette generator using HSL rotation
- Parameter sliders for noise scale, seed, iterations
- Algorithm selector (Perlin, Voronoi, Flow Field, Fractal)`}]},{slug:"particle",name:"粒子系统",nameEn:"Particle System",description:"深色科技背景上漂浮的粒子网络，以连线、脉冲和轨迹营造数据流动感。适合科技公司、数据可视化、创意作品集。",cover:"/styles/particle.svg",styleType:"visual",tags:["modern","expressive"],category:"modern",colors:{primary:"#0a0e1a",secondary:"#0f1419",accent:["#e0e8ff","#64c8ff","#64ffc8","#a78bfa"]},keywords:["particles","network","connections","floating","tech","nodes","constellation"],philosophy:`A living network of floating particles and connection lines creates a sense of data flowing through space — tech-forward yet organic and mesmerizing.

Core principles:
- Deep dark backgrounds provide the canvas for luminous particle effects
- Particles drift slowly and randomly, forming organic constellations
- Connection lines appear between nearby particles at low opacity
- Foreground content stays clean, readable, and unobstructed
- Cool-toned accents (blue, teal, violet) reinforce the tech atmosphere`,doList:["Use deep dark backgrounds (blue-black #0a0e1a or #0f1419)","Add floating particle elements as background decoration","Show connection lines between nearby particles at low opacity","Keep foreground content clean and highly readable","Use cool-toned accent colors (blue, teal, violet)","Apply subtle glow effects to particles and key UI elements","Use backdrop-blur for glass-like card surfaces"],dontList:["Don't let particles obscure content readability","Don't use warm or earthy colors for primary palette","Don't use heavy borders or thick outlines","Don't use patterns that compete with particle animation","Don't use light backgrounds","Don't use conventional box shadows (use glow effects instead)"],components:{button:{name:"Button",description:"Particle System style buttons with blue glow on hover",code:`// Primary Button
<button className="px-6 py-3 rounded-lg font-medium text-sm bg-blue-600 text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
  Get Started
</button>

// Secondary Button
<button className="px-6 py-3 rounded-lg font-medium text-sm bg-white/5 backdrop-blur border border-white/10 text-white/80 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
  Learn More
</button>

// Ghost Button
<button className="px-6 py-3 rounded-lg font-medium text-sm text-white/60 transition-all duration-300 hover:text-white hover:bg-white/5">
  View Docs
</button>`},card:{name:"Card",description:"Dark glass cards with subtle borders and blue glow on hover",code:`<div className="bg-[#0f1419]/80 backdrop-blur-xl rounded-xl p-6 border border-white/5 shadow-lg transition-all duration-300 hover:border-blue-500/20 hover:shadow-[0_0_25px_rgba(59,130,246,0.1)]">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
      <Icon className="w-5 h-5 text-blue-400" />
    </div>
    <h3 className="text-lg font-semibold text-[#e0e8ff]">Feature Title</h3>
  </div>
  <p className="text-white/50 leading-relaxed">
    Description with clean readability on deep dark background.
  </p>
</div>`},input:{name:"Input",description:"Dark input fields with blue focus glow",code:`<div className="space-y-1.5">
  <label className="block text-sm font-medium text-white/60">Email</label>
  <input
    type="email"
    className="w-full px-4 py-3 bg-[#0a0e1a] border border-white/10 rounded-lg text-[#e0e8ff] placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all duration-300"
    placeholder="you@example.com"
  />
</div>`},nav:{name:"Navigation",description:"Ultra-minimal dark glass navigation bar",code:`<nav className="bg-[#0a0e1a]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    <span className="text-[#e0e8ff] font-semibold">Brand</span>
    <div className="flex items-center gap-6 text-sm text-white/50">
      <a href="#" className="hover:text-white transition-colors">Features</a>
      <a href="#" className="hover:text-white transition-colors">Pricing</a>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500 transition-colors">
        Sign Up
      </button>
    </div>
  </div>
</nav>`},hero:{name:"Hero",description:"Deep dark hero section with particle-friendly background",code:`<section className="relative bg-[#0a0e1a] overflow-hidden py-24 px-6">
  {/* Particle layer goes here as absolute-positioned background */}
  <div className="relative z-10 max-w-4xl mx-auto text-center">
    <h1 className="text-4xl md:text-6xl font-semibold text-[#e0e8ff] mb-6">
      Particle System
    </h1>
    <p className="text-lg text-white/50 max-w-2xl mx-auto">
      A living network of floating particles and connection lines.
    </p>
  </div>
</section>`},footer:{name:"Footer",description:"Minimal dark footer with subtle top border",code:`<footer className="bg-[#0a0e1a] border-t border-white/5 py-8 px-6">
  <div className="max-w-6xl mx-auto flex justify-between items-center">
    <span className="text-white/30 text-sm">Brand</span>
    <span className="text-white/20 text-xs">Built with particles</span>
  </div>
</footer>`}},globalCss:`/* Particle System Global Styles */
@keyframes particle-float {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(10px, -15px); }
  50% { transform: translate(-5px, 10px); }
  75% { transform: translate(-10px, -5px); }
}
@keyframes particle-pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.5); }
}
@keyframes particle-connect {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.3; }
}`,aiRules:`STYLE: Particle System
TYPE: Deep dark tech aesthetic with floating particle network

MUST USE:
- Background: Deep blue-black (#0a0e1a or #0f1419)
- Particles: Small circles (1-6px) in semi-transparent white/blue/teal, slowly drifting
- Connection lines: Thin lines between nearby particles, very low opacity
- Text: Light blue-white (#e0e8ff) for primary, white/50 for secondary
- Cards: Very dark glass (bg-[#0f1419]/80) with minimal borders (white/5)
- Accents: Blue (#3b82f6), Teal (#14b8a6), Violet (#a78bfa)
- Interactive elements: Subtle blue glow on hover
- Typography: Clean sans-serif, not too heavy
- Backdrop blur on cards and overlays

MUST AVOID:
- Light backgrounds (bg-white, bg-gray-50, etc.)
- Warm or earthy color palettes
- Heavy borders or thick outlines
- Conventional box shadows
- Patterns that compete with particle animation
- Dark text on dark backgrounds

COLOR HIERARCHY:
- Background: #0a0e1a (deepest)
- Surface: #0f1419/80 with backdrop-blur
- Border: white/5 or white/10
- Text primary: #e0e8ff
- Text secondary: white/50
- Accent: blue-500, teal-500, violet-500

PARTICLE LAYER:
- Purely decorative, never blocks content
- 50-150 particles, 1-6px size
- Slow random drift animation
- Connection lines at very low opacity`,examplePrompts:[{title:"科技公司着陆页",titleEn:"Tech Company Landing Page",description:"深色背景上粒子网络装饰的科技着陆页",descriptionEn:"Tech landing page with particle network background",prompt:`Create a tech company landing page using Particle System style:
- Deep blue-black background with floating particles
- Glass-effect navigation bar
- Hero section with large title over particle field
- Feature cards with dark glass surfaces and blue glow hover
- Stats section with glowing numbers
- CTA section with primary blue and secondary glass buttons`},{title:"数据可视化面板",titleEn:"Data Visualization Dashboard",description:"带粒子装饰的数据可视化仪表板",descriptionEn:"Data dashboard with particle decorations",prompt:`Create a data visualization dashboard using Particle System style:
- Dark background with subtle particle animation
- Sidebar navigation with glass effect
- Metric cards showing key data points
- Network graph visualization section
- Activity timeline with glowing nodes`},{title:"作品集展示页",titleEn:"Portfolio Showcase",description:"星座风格粒子连线的个人作品集",descriptionEn:"Portfolio with constellation-style particle connections",prompt:`Create a portfolio page using Particle System style:
- Deep dark background with constellation particle field
- Minimal navigation
- Project cards with dark glass surface and glow hover
- Skills section with node-and-line visualization
- Contact section with blue accent buttons`}]},{slug:"vhs-aesthetic",name:"VHS美学",nameEn:"VHS Aesthetic",description:"80-90年代VHS录像带视觉美学，色彩失真、扫描线噪点与信号故障效果。适合怀旧、复古科技、创意影像项目。",cover:"/styles/vhs-aesthetic.svg",styleType:"visual",tags:["retro","expressive","high-contrast"],category:"retro",colors:{primary:"#ff00ff",secondary:"#000000",accent:["#00ffff","#ffff00","#00ff00","#1a0a2e"]},keywords:["VHS","retro","glitch","scanlines","80s","90s","tape","recording","nostalgia","chromatic aberration"],philosophy:`VHS Aesthetic 再现了80-90年代VHS磁带的模拟温暖感与美丽缺陷。

核心理念：
- 扫描线叠加：所有内容区域使用 repeating-linear-gradient 水平扫描线
- RGB色差：文字使用品红和青色偏移的 text-shadow 模拟色彩分离
- 噪点纹理：低透明度的噪点/颗粒叠加层
- 信号故障：hover 时出现水平位移的 tracking 干扰效果
- VHS标记：REC指示灯、时间戳、计数器等录像带UI元素
- 单色字体：所有文字使用 monospace 字体，大写优先
- 极暗背景：黑色或深紫色背景最大化霓虹对比度`,doList:["Apply horizontal scanline overlay on all content areas","Use RGB color separation on text (magenta + cyan offset shadows)","Add noise/grain texture overlay with low opacity","Include VHS-style timestamps and REC indicators","Use monospace fonts throughout","Keep backgrounds dark (black or deep purple #1a0a2e)","Add tracking distortion effects on hover","Use uppercase text with wide letter-spacing for labels"],dontList:["Don't use clean, crisp typography","Don't use light backgrounds","Don't use modern sans-serif fonts","Don't use smooth gradients","Don't use rounded corners larger than 2px","Don't use subtle, refined effects"],components:{button:{name:"按钮",description:"VHS 霓虹按钮，带发光效果和单色字体",code:`// Magenta Primary
<button className="px-6 py-3 font-mono text-sm uppercase tracking-widest border-2 bg-[#ff00ff]/20 text-[#ff00ff] border-[#ff00ff] shadow-[0_0_15px_rgba(255,0,255,0.4)] hover:shadow-[0_0_30px_rgba(255,0,255,0.6)] hover:bg-[#ff00ff]/30 transition-all duration-200">
  PLAY
</button>

// Cyan Secondary
<button className="px-6 py-3 font-mono text-sm uppercase tracking-widest border-2 bg-[#00ffff]/10 text-[#00ffff] border-[#00ffff]/50 hover:border-[#00ffff] hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-200">
  REWIND
</button>`},card:{name:"卡片",description:"VHS 风格的深紫色卡片，带品红边框和扫描线叠加",code:`<div className="bg-[#1a0a2e]/80 border border-[#ff00ff]/20 p-6 relative overflow-hidden hover:border-[#ff00ff]/40 hover:shadow-[0_0_20px_rgba(255,0,255,0.15)] transition-all duration-200">
  {/* Scanline overlay */}
  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,0,255,0.02)_2px,rgba(255,0,255,0.02)_4px)] pointer-events-none" />
  <div className="relative">
    <h3 className="text-white font-mono font-bold uppercase" style={{textShadow: '-2px 0 #ff00ff, 2px 0 #00ffff'}}>
      TAPE TITLE
    </h3>
    <p className="text-[#ff00ff]/50 font-mono text-sm mt-2">Description text</p>
  </div>
</div>`},input:{name:"输入框",description:"VHS 终端风格输入框",code:`<div className="space-y-2">
  <label className="block text-[#00ffff] font-mono text-xs uppercase tracking-[0.2em]">Search Tape</label>
  <input
    type="text"
    className="w-full px-4 py-3 bg-black/60 border border-[#00ffff]/30 text-[#00ffff] font-mono text-sm placeholder:text-[#00ffff]/30 focus:outline-none focus:border-[#00ffff] focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all duration-200"
    placeholder="ENTER TITLE..."
  />
</div>`},nav:{name:"导航栏",description:"VHS 导航栏，带REC指示灯和时间戳",code:`<nav className="bg-black/90 border-b border-[#ff00ff]/20 px-6 py-3 flex justify-between items-center">
  <div className="flex items-center gap-3">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      <span className="text-red-500 font-mono text-xs uppercase">REC</span>
    </div>
    <span className="text-white font-mono text-sm uppercase tracking-wider">VHS Aesthetic</span>
  </div>
  <span className="text-[#ffff00] font-mono text-xs">1989.08.24 PM 11:42</span>
</nav>`},hero:{name:"Hero 区域",description:"VHS Hero 区域，带 RGB 色差标题和扫描线",code:`<section className="relative bg-black overflow-hidden px-6 py-20">
  {/* Scanline overlay */}
  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,0,255,0.02)_2px,rgba(255,0,255,0.02)_4px)] pointer-events-none" />
  <div className="relative max-w-4xl mx-auto text-center">
    <h1 className="text-5xl md:text-7xl font-mono font-bold uppercase tracking-wider text-white" style={{textShadow: '-2px 0 #ff00ff, 2px 0 #00ffff'}}>
      VHS AESTHETIC
    </h1>
    <p className="mt-4 text-[#ff00ff]/70 font-mono text-sm">
      PRESS PLAY TO START
    </p>
  </div>
</section>`},footer:{name:"页脚",description:"VHS 页脚",code:`<footer className="bg-black border-t border-[#ff00ff]/20 px-6 py-6">
  <p className="text-[#ff00ff]/40 font-mono text-xs text-center uppercase tracking-widest">
    VHS Aesthetic // StyleKit // STOP
  </p>
</footer>`}},globalCss:`/* VHS Aesthetic Global Styles */
@layer base {
  body {
    @apply bg-black text-white antialiased;
    background-image:
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(255, 0, 255, 0.02) 2px,
        rgba(255, 0, 255, 0.02) 4px
      );
  }

  h1, h2, h3 {
    text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff;
  }

  ::selection {
    @apply bg-[#ff00ff] text-black;
  }
}

@keyframes vhs-tracking {
  0% { transform: translateX(0); }
  10% { transform: translateX(-2px); }
  20% { transform: translateX(3px); }
  30% { transform: translateX(0); }
  100% { transform: translateX(0); }
}
@keyframes vhs-noise {
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.08; }
}
@keyframes vhs-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@keyframes vhs-color-shift {
  0%, 100% { text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
  33% { text-shadow: -3px 0 #ff00ff, 1px 0 #00ffff; }
  66% { text-shadow: -1px 0 #ff00ff, 3px 0 #00ffff; }
}`,aiRules:`STYLE: VHS Aesthetic
TYPE: 80-90s VHS tape visual aesthetic

MUST USE:
- Background: Black (#000000) or deep purple (#1a0a2e)
- Primary accent: Magenta (#ff00ff) for borders, glows, highlights
- Secondary accent: Cyan (#00ffff) for text, secondary elements
- Tertiary: Yellow (#ffff00) for warnings/timestamps, Green (#00ff00) for status
- All text: Monospace font, uppercase preferred
- Scanlines: Apply repeating-linear-gradient overlay
- Color separation: Use text-shadow with offset magenta and cyan
- Timestamps: Show "REC" indicator, date/time in corner
- Noise: Add grain/noise texture overlay with low opacity
- Tracking distortion: Slight horizontal offset on hover/animation

MUST AVOID:
- Light/white backgrounds
- Pastel or muted colors
- Serif or sans-serif body fonts
- Large border-radius (max 2px)
- Smooth gradients
- Subtle/standard shadows (use neon glow only)

COLOR RULES:
- Primary: Magenta (#ff00ff)
- Accent 1: Cyan (#00ffff)
- Accent 2: Yellow (#ffff00)
- Accent 3: Green (#00ff00)
- Background: Black (#000000) or Deep Purple (#1a0a2e)

SPECIAL EFFECTS:
- Scanline overlay via CSS repeating-linear-gradient
- RGB chromatic aberration on headings (magenta left, cyan right)
- VHS tracking distortion animation
- Noise/grain texture overlay
- Blinking REC indicator
- VHS timestamp badges`,examplePrompts:[{title:"VHS录像带档案页",titleEn:"VHS Tape Archive Page",description:"带跟踪失真和时间戳的VHS风格视频档案",descriptionEn:"VHS-style video archive with tracking distortion and timestamps",prompt:`Create a VHS-style video archive page:
- Dark background with scanline and noise overlays
- Tape collection cards with magenta glow borders
- REC indicator and VHS timestamps
- RGB color separation on titles
- Tracking distortion on hover`},{title:"复古电视频道指南",titleEn:"Retro TV Channel Guide",description:"带扫描线和色彩溢出的复古频道表",descriptionEn:"Retro channel guide with scanlines and color bleeding",prompt:`Build a retro TV channel guide using VHS Aesthetic:
- Black background with scanline effect
- Channel listings with cyan text
- Time slots in yellow monospace
- Signal strength indicators in green
- Static/noise effect between channels`},{title:"90年代怀旧落地页",titleEn:"90s Nostalgia Landing Page",description:"VHS磁带美学的怀旧主题页面",descriptionEn:"Nostalgia-themed page with VHS tape aesthetic",prompt:`Design a 90s nostalgia landing page with VHS aesthetic:
- Full-screen hero with RGB chromatic aberration title
- VHS playback controls interface
- Tape collection showcase grid
- Retro timestamp and counter overlays
- Magenta and cyan neon accents throughout`}]}];function c(a){return b.find(b=>b.slug===a)}a.s(["getStyleBySlug",()=>c,"styles",0,b],191873)}];

//# sourceMappingURL=lib_styles_index_ts_22b60718._.js.map