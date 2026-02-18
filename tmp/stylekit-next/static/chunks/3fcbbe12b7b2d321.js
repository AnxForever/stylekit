(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,770530,e=>{"use strict";var t=e.i(338122),a=e.i(436624),r=e.i(502942),o=e.i(223913);function l(e){let{colors:t}=e;return`
:root {
  /* Colors */
  --color-primary: ${t.primary};
  --color-secondary: ${t.secondary};
  --color-accent-1: ${t.accent[0]||t.primary};
  --color-accent-2: ${t.accent[1]||t.secondary};
  --color-accent-3: ${t.accent[2]||t.primary};
  --color-background: ${t.secondary};
  --color-foreground: ${t.primary};
  --color-muted: #6b7280;

  /* Typography */
  --font-heading: system-ui, -apple-system, sans-serif;
  --font-body: system-ui, -apple-system, sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;

  /* Spacing */
  --spacing-unit: 0.25rem;
  --container-max-width: 1200px;

  /* Borders */
  --border-radius: 0.5rem;
  --border-width: 1px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
`.trim()}function s(e){let{colors:t,typography:a,spacing:r,borders:o,shadows:l}=e;return`
:root {
  /* Colors */
  --color-primary: ${t.primary};
  --color-secondary: ${t.secondary};
  --color-accent-1: ${t.accent[0]||t.primary};
  --color-accent-2: ${t.accent[1]||t.secondary};
  --color-accent-3: ${t.accent[2]||t.primary};
  --color-background: ${t.background};
  --color-foreground: ${t.foreground};
  --color-muted: ${t.muted};

  /* Typography */
  --font-heading: ${a.headingFont};
  --font-body: ${a.bodyFont};
  --font-size-xs: ${a.fontSize.xs};
  --font-size-sm: ${a.fontSize.sm};
  --font-size-base: ${a.fontSize.base};
  --font-size-lg: ${a.fontSize.lg};
  --font-size-xl: ${a.fontSize.xl};
  --font-size-2xl: ${a.fontSize["2xl"]};
  --font-size-3xl: ${a.fontSize["3xl"]};
  --font-size-4xl: ${a.fontSize["4xl"]};

  /* Spacing */
  --spacing-unit: ${r.unit}px;
  --container-max-width: ${r.containerMaxWidth};

  /* Borders */
  --border-radius: ${o.radius};
  --border-width: ${o.width};

  /* Shadows */
  --shadow-sm: ${l.sm};
  --shadow-md: ${l.md};
  --shadow-lg: ${l.lg};
}
`.trim()}function i(){return`
/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  color: var(--color-foreground);
  background-color: var(--color-background);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.2;
}

h1 { font-size: var(--font-size-4xl); }
h2 { font-size: var(--font-size-3xl); }
h3 { font-size: var(--font-size-2xl); }
h4 { font-size: var(--font-size-xl); }

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  height: auto;
}

button {
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
}

/* Utilities */
.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 1rem;
}

.text-center { text-align: center; }
.text-muted { color: var(--color-muted); }

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  border-radius: var(--border-radius);
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-background);
  border: var(--border-width) solid var(--color-primary);
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-outline {
  background-color: transparent;
  color: var(--color-primary);
  border: var(--border-width) solid var(--color-primary);
}

.btn-outline:hover {
  background-color: var(--color-primary);
  color: var(--color-background);
}

.card {
  background-color: var(--color-background);
  border: var(--border-width) solid var(--color-muted);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

/* Section spacing */
section {
  padding: 4rem 0;
}

@media (min-width: 768px) {
  section {
    padding: 6rem 0;
  }
}
`.trim()}function n(e){let t=e.slug;return"neo-brutalist"===t?`
/* Neo-Brutalist overrides */
:root {
  --border-radius: 0;
  --border-width: 3px;
  --shadow-md: 4px 4px 0 var(--color-foreground);
}

.btn {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
}

.card {
  box-shadow: 4px 4px 0 var(--color-foreground);
}
`:"glassmorphism"===t?`
/* Glassmorphism overrides */
.card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}
`:"neumorphism"===t?`
/* Neumorphism overrides */
:root {
  --color-background: #e0e5ec;
}

.card {
  background: var(--color-background);
  border: none;
  box-shadow: 8px 8px 16px #b8c0c8, -8px -8px 16px #ffffff;
  border-radius: 1rem;
}

.btn {
  box-shadow: 4px 4px 8px #b8c0c8, -4px -4px 8px #ffffff;
}

.btn:hover {
  box-shadow: inset 4px 4px 8px #b8c0c8, inset -4px -4px 8px #ffffff;
}
`:"editorial"===t?`
/* Editorial overrides */
:root {
  --font-heading: Georgia, 'Times New Roman', serif;
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

h1, h2, h3, h4 {
  font-weight: 400;
  letter-spacing: -0.02em;
}
`:""}let d={type:"landing",name:"着陆页",nameEn:"Landing Page",description:"适合产品展示、SaaS、创业公司的单页着陆页模板",sections:[{id:"hero",name:"英雄区",nameEn:"Hero",description:"页面顶部的主要展示区域",defaultEnabled:!0,fields:[{id:"headline",label:"主标题",labelEn:"Headline",type:"text",defaultValue:"构建更好的产品",placeholder:"输入吸引眼球的主标题"},{id:"subheadline",label:"副标题",labelEn:"Subheadline",type:"textarea",defaultValue:"我们帮助团队更快地将想法变为现实，用更少的资源创造更大的价值。",placeholder:"简短描述你的产品价值"},{id:"ctaText",label:"主按钮文字",labelEn:"CTA Button Text",type:"text",defaultValue:"立即开始",placeholder:"如：免费试用、了解更多"},{id:"ctaSecondaryText",label:"次按钮文字",labelEn:"Secondary Button Text",type:"text",defaultValue:"观看演示",placeholder:"如：了解更多、联系我们"}]},{id:"features",name:"功能特性",nameEn:"Features",description:"展示产品的核心功能",defaultEnabled:!0,fields:[{id:"title",label:"区块标题",labelEn:"Section Title",type:"text",defaultValue:"核心功能",placeholder:"如：为什么选择我们"},{id:"subtitle",label:"区块描述",labelEn:"Section Subtitle",type:"textarea",defaultValue:"我们提供全面的解决方案，帮助你的业务更上一层楼。",placeholder:"简短描述这个区块"},{id:"feature1Title",label:"功能1标题",labelEn:"Feature 1 Title",type:"text",defaultValue:"快速部署",placeholder:"功能名称"},{id:"feature1Desc",label:"功能1描述",labelEn:"Feature 1 Description",type:"textarea",defaultValue:"一键部署到云端，无需复杂配置，几分钟内即可上线。",placeholder:"功能详细描述"},{id:"feature2Title",label:"功能2标题",labelEn:"Feature 2 Title",type:"text",defaultValue:"安全可靠",placeholder:"功能名称"},{id:"feature2Desc",label:"功能2描述",labelEn:"Feature 2 Description",type:"textarea",defaultValue:"企业级安全标准，数据加密存储，7x24小时监控保护。",placeholder:"功能详细描述"},{id:"feature3Title",label:"功能3标题",labelEn:"Feature 3 Title",type:"text",defaultValue:"灵活扩展",placeholder:"功能名称"},{id:"feature3Desc",label:"功能3描述",labelEn:"Feature 3 Description",type:"textarea",defaultValue:"根据业务需求弹性扩容，按需付费，不浪费任何资源。",placeholder:"功能详细描述"}]},{id:"cta",name:"行动召唤",nameEn:"Call to Action",description:"促进用户转化的区域",defaultEnabled:!0,fields:[{id:"title",label:"标题",labelEn:"Title",type:"text",defaultValue:"准备好开始了吗？",placeholder:"吸引用户行动的标题"},{id:"description",label:"描述",labelEn:"Description",type:"textarea",defaultValue:"加入数千家已经在使用我们产品的企业，开启你的成功之旅。",placeholder:"鼓励用户采取行动"},{id:"buttonText",label:"按钮文字",labelEn:"Button Text",type:"text",defaultValue:"免费注册",placeholder:"如：开始使用、联系销售"}]},{id:"footer",name:"页脚",nameEn:"Footer",description:"页面底部信息",defaultEnabled:!0,fields:[{id:"copyright",label:"版权信息",labelEn:"Copyright",type:"text",defaultValue:"2024 Your Company. All rights reserved.",placeholder:"版权声明"},{id:"links",label:"链接（逗号分隔）",labelEn:"Links (comma separated)",type:"text",defaultValue:"关于我们, 服务条款, 隐私政策, 联系我们",placeholder:"如：关于, 博客, 联系"}]}]},c={type:"portfolio",name:"作品集",nameEn:"Portfolio",description:"适合设计师、开发者、自由职业者展示个人作品的模板",sections:[{id:"hero",name:"个人介绍",nameEn:"Hero",description:"页面顶部的个人介绍区域",defaultEnabled:!0,fields:[{id:"name",label:"姓名",labelEn:"Name",type:"text",defaultValue:"张三",placeholder:"输入你的名字"},{id:"title",label:"职业头衔",labelEn:"Title",type:"text",defaultValue:"全栈开发者 & UI 设计师",placeholder:"如：前端工程师、产品设计师"},{id:"bio",label:"简介",labelEn:"Bio",type:"textarea",defaultValue:"专注于创造美观、实用的数字产品。5年+ 设计与开发经验，热爱用代码和设计解决问题。",placeholder:"简短介绍自己"},{id:"ctaText",label:"按钮文字",labelEn:"CTA Button Text",type:"text",defaultValue:"查看作品",placeholder:"如：联系我、下载简历"}]},{id:"projects",name:"作品展示",nameEn:"Projects",description:"展示你的代表作品",defaultEnabled:!0,fields:[{id:"title",label:"区块标题",labelEn:"Section Title",type:"text",defaultValue:"精选作品",placeholder:"如：我的项目、作品集"},{id:"subtitle",label:"区块描述",labelEn:"Section Subtitle",type:"textarea",defaultValue:"这些是我近期完成的一些项目，涵盖网站设计、移动应用和品牌设计。",placeholder:"描述你的作品"},{id:"project1Title",label:"项目1标题",labelEn:"Project 1 Title",type:"text",defaultValue:"电商平台重设计",placeholder:"项目名称"},{id:"project1Desc",label:"项目1描述",labelEn:"Project 1 Description",type:"textarea",defaultValue:"为一家时尚电商平台进行全面的用户界面重设计，提升了30%的转化率。",placeholder:"项目详细描述"},{id:"project1Tag",label:"项目1标签",labelEn:"Project 1 Tag",type:"text",defaultValue:"UI/UX 设计",placeholder:"如：Web开发、品牌设计"},{id:"project2Title",label:"项目2标题",labelEn:"Project 2 Title",type:"text",defaultValue:"健身追踪 App",placeholder:"项目名称"},{id:"project2Desc",label:"项目2描述",labelEn:"Project 2 Description",type:"textarea",defaultValue:"从零开始设计和开发的健身追踪应用，支持运动记录、数据分析和社交功能。",placeholder:"项目详细描述"},{id:"project2Tag",label:"项目2标签",labelEn:"Project 2 Tag",type:"text",defaultValue:"移动应用",placeholder:"如：Web开发、品牌设计"},{id:"project3Title",label:"项目3标题",labelEn:"Project 3 Title",type:"text",defaultValue:"企业官网设计",placeholder:"项目名称"},{id:"project3Desc",label:"项目3描述",labelEn:"Project 3 Description",type:"textarea",defaultValue:"为科技创业公司设计的品牌官网，包含完整的视觉识别系统和响应式布局。",placeholder:"项目详细描述"},{id:"project3Tag",label:"项目3标签",labelEn:"Project 3 Tag",type:"text",defaultValue:"网站设计",placeholder:"如：Web开发、品牌设计"}]},{id:"about",name:"关于我",nameEn:"About",description:"更详细的个人介绍",defaultEnabled:!0,fields:[{id:"title",label:"区块标题",labelEn:"Section Title",type:"text",defaultValue:"关于我",placeholder:"如：个人简介"},{id:"description",label:"详细介绍",labelEn:"Description",type:"textarea",defaultValue:"我是一名热爱设计与技术的创作者。从2018年开始从事设计和开发工作，期间为多家初创公司和大型企业提供服务。我相信好的设计应该是美观与实用的完美结合。",placeholder:"详细介绍你的背景、经验和理念"},{id:"skill1",label:"技能1",labelEn:"Skill 1",type:"text",defaultValue:"UI/UX 设计",placeholder:"技能名称"},{id:"skill2",label:"技能2",labelEn:"Skill 2",type:"text",defaultValue:"前端开发",placeholder:"技能名称"},{id:"skill3",label:"技能3",labelEn:"Skill 3",type:"text",defaultValue:"品牌设计",placeholder:"技能名称"},{id:"skill4",label:"技能4",labelEn:"Skill 4",type:"text",defaultValue:"产品策略",placeholder:"技能名称"}]},{id:"contact",name:"联系方式",nameEn:"Contact",description:"让访客可以联系你",defaultEnabled:!0,fields:[{id:"title",label:"区块标题",labelEn:"Section Title",type:"text",defaultValue:"联系我",placeholder:"如：取得联系"},{id:"description",label:"描述",labelEn:"Description",type:"textarea",defaultValue:"有项目想要合作？或者只是想打个招呼？随时给我发邮件，我会尽快回复。",placeholder:"鼓励访客联系你"},{id:"email",label:"邮箱",labelEn:"Email",type:"text",defaultValue:"hello@example.com",placeholder:"你的邮箱地址"},{id:"buttonText",label:"按钮文字",labelEn:"Button Text",type:"text",defaultValue:"发送邮件",placeholder:"如：联系我、发消息"},{id:"socialLinks",label:"社交链接（逗号分隔）",labelEn:"Social Links (comma separated)",type:"text",defaultValue:"GitHub, Dribbble, LinkedIn, Twitter",placeholder:"如：GitHub, Twitter, LinkedIn"}]}]},p={type:"blog",name:"博客",nameEn:"Blog",description:"适合个人博客、技术写作、内容创作者的博客模板",sections:[{id:"hero",name:"博客头部",nameEn:"Blog Header",description:"博客顶部的标题和作者介绍区域",defaultEnabled:!0,fields:[{id:"blogName",label:"博客名称",labelEn:"Blog Name",type:"text",defaultValue:"我的博客",placeholder:"输入博客名称"},{id:"tagline",label:"标语",labelEn:"Tagline",type:"text",defaultValue:"分享技术与思考",placeholder:"输入博客标语"},{id:"authorName",label:"作者姓名",labelEn:"Author Name",type:"text",defaultValue:"作者",placeholder:"输入作者姓名"},{id:"authorBio",label:"作者简介",labelEn:"Author Bio",type:"textarea",defaultValue:"热爱技术与写作的开发者",placeholder:"简短介绍自己"}]},{id:"posts",name:"文章列表",nameEn:"Posts",description:"展示最新的博客文章",defaultEnabled:!0,fields:[{id:"sectionTitle",label:"区块标题",labelEn:"Section Title",type:"text",defaultValue:"最新文章",placeholder:"如：最新文章、近期更新"},{id:"post1Title",label:"文章1标题",labelEn:"Post 1 Title",type:"text",defaultValue:"开始使用 Next.js 构建现代 Web 应用",placeholder:"文章标题"},{id:"post1Excerpt",label:"文章1摘要",labelEn:"Post 1 Excerpt",type:"textarea",defaultValue:"Next.js 是一个强大的 React 框架，提供了服务端渲染、静态生成等特性，让构建现代 Web 应用变得更加简单高效。",placeholder:"文章摘要"},{id:"post1Date",label:"文章1日期",labelEn:"Post 1 Date",type:"text",defaultValue:"2024-01-15",placeholder:"如：2024-01-15"},{id:"post1Category",label:"文章1分类",labelEn:"Post 1 Category",type:"text",defaultValue:"前端开发",placeholder:"文章分类"},{id:"post2Title",label:"文章2标题",labelEn:"Post 2 Title",type:"text",defaultValue:"TypeScript 高级类型技巧",placeholder:"文章标题"},{id:"post2Excerpt",label:"文章2摘要",labelEn:"Post 2 Excerpt",type:"textarea",defaultValue:"深入探索 TypeScript 的高级类型系统，包括条件类型、映射类型和模板字面量类型的实际应用。",placeholder:"文章摘要"},{id:"post2Date",label:"文章2日期",labelEn:"Post 2 Date",type:"text",defaultValue:"2024-01-10",placeholder:"如：2024-01-10"},{id:"post2Category",label:"文章2分类",labelEn:"Post 2 Category",type:"text",defaultValue:"TypeScript",placeholder:"文章分类"},{id:"post3Title",label:"文章3标题",labelEn:"Post 3 Title",type:"text",defaultValue:"CSS Grid 布局完全指南",placeholder:"文章标题"},{id:"post3Excerpt",label:"文章3摘要",labelEn:"Post 3 Excerpt",type:"textarea",defaultValue:"CSS Grid 是现代 CSS 布局中最强大的工具之一，本文将带你从基础到高级全面掌握 Grid 布局。",placeholder:"文章摘要"},{id:"post3Date",label:"文章3日期",labelEn:"Post 3 Date",type:"text",defaultValue:"2024-01-05",placeholder:"如：2024-01-05"},{id:"post3Category",label:"文章3分类",labelEn:"Post 3 Category",type:"text",defaultValue:"CSS",placeholder:"文章分类"}]},{id:"sidebar",name:"侧边栏",nameEn:"Sidebar",description:"博客侧边栏，包含关于、分类和标签",defaultEnabled:!0,fields:[{id:"aboutTitle",label:"关于标题",labelEn:"About Title",type:"text",defaultValue:"关于",placeholder:"如：关于、简介"},{id:"aboutText",label:"关于内容",labelEn:"About Text",type:"textarea",defaultValue:"这是一个关于技术、设计和创造力的博客。在这里分享我的学习心得和实践经验。",placeholder:"简短介绍博客"},{id:"categories",label:"分类（逗号分隔）",labelEn:"Categories (comma separated)",type:"text",defaultValue:"前端开发, 后端技术, 设计思维, 工具推荐",placeholder:"如：前端, 后端, 设计"},{id:"tags",label:"标签（逗号分隔）",labelEn:"Tags (comma separated)",type:"text",defaultValue:"React, TypeScript, Next.js, CSS, Node.js, Design",placeholder:"如：React, Vue, CSS"}]},{id:"footer",name:"页脚",nameEn:"Footer",description:"博客底部信息",defaultEnabled:!0,fields:[{id:"copyright",label:"版权信息",labelEn:"Copyright",type:"text",defaultValue:"2024 My Blog. All rights reserved.",placeholder:"版权声明"},{id:"links",label:"链接（逗号分隔）",labelEn:"Links (comma separated)",type:"text",defaultValue:"首页, 归档, 关于, RSS",placeholder:"如：首页, 归档, 关于"}]}]},m={type:"dashboard",name:"仪表盘",nameEn:"Dashboard",description:"包含侧边栏、KPI 卡片和图表面板的数据仪表盘模板",sections:[{id:"sidebar",name:"侧边导航",nameEn:"Sidebar Navigation",description:"仪表盘左侧导航栏",defaultEnabled:!0,fields:[{id:"appName",label:"应用名称",labelEn:"App Name",type:"text",defaultValue:"Dashboard",placeholder:"输入应用名称"},{id:"navItems",label:"导航项（逗号分隔）",labelEn:"Nav Items (comma separated)",type:"text",defaultValue:"概览, 分析, 订单, 用户, 设置",placeholder:"如：概览, 分析, 订单"},{id:"activeItem",label:"当前激活项",labelEn:"Active Item",type:"text",defaultValue:"概览",placeholder:"当前激活的导航项"}]},{id:"kpi",name:"KPI 指标",nameEn:"KPI Metrics",description:"关键业务指标卡片区域",defaultEnabled:!0,fields:[{id:"sectionTitle",label:"区块标题",labelEn:"Section Title",type:"text",defaultValue:"数据概览",placeholder:"如：数据概览、关键指标"},{id:"kpi1Label",label:"指标1名称",labelEn:"KPI 1 Label",type:"text",defaultValue:"总收入",placeholder:"指标名称"},{id:"kpi1Value",label:"指标1数值",labelEn:"KPI 1 Value",type:"text",defaultValue:"$48,230",placeholder:"指标数值"},{id:"kpi1Change",label:"指标1变化",labelEn:"KPI 1 Change",type:"text",defaultValue:"+12.5%",placeholder:"如：+12.5%"},{id:"kpi2Label",label:"指标2名称",labelEn:"KPI 2 Label",type:"text",defaultValue:"用户数",placeholder:"指标名称"},{id:"kpi2Value",label:"指标2数值",labelEn:"KPI 2 Value",type:"text",defaultValue:"2,420",placeholder:"指标数值"},{id:"kpi2Change",label:"指标2变化",labelEn:"KPI 2 Change",type:"text",defaultValue:"+5.2%",placeholder:"如：+5.2%"},{id:"kpi3Label",label:"指标3名称",labelEn:"KPI 3 Label",type:"text",defaultValue:"订单量",placeholder:"指标名称"},{id:"kpi3Value",label:"指标3数值",labelEn:"KPI 3 Value",type:"text",defaultValue:"1,210",placeholder:"指标数值"},{id:"kpi3Change",label:"指标3变化",labelEn:"KPI 3 Change",type:"text",defaultValue:"-2.1%",placeholder:"如：-2.1%"},{id:"kpi4Label",label:"指标4名称",labelEn:"KPI 4 Label",type:"text",defaultValue:"转化率",placeholder:"指标名称"},{id:"kpi4Value",label:"指标4数值",labelEn:"KPI 4 Value",type:"text",defaultValue:"3.6%",placeholder:"指标数值"},{id:"kpi4Change",label:"指标4变化",labelEn:"KPI 4 Change",type:"text",defaultValue:"+0.3%",placeholder:"如：+0.3%"}]},{id:"charts",name:"图表区域",nameEn:"Charts",description:"数据可视化图表区域",defaultEnabled:!0,fields:[{id:"chartTitle",label:"图表标题",labelEn:"Chart Title",type:"text",defaultValue:"收入趋势",placeholder:"图表标题"},{id:"chartType",label:"图表类型",labelEn:"Chart Type",type:"text",defaultValue:"bar",placeholder:"如：bar, line, pie"}]},{id:"table",name:"数据表格",nameEn:"Data Table",description:"数据展示表格",defaultEnabled:!0,fields:[{id:"tableTitle",label:"表格标题",labelEn:"Table Title",type:"text",defaultValue:"最近订单",placeholder:"表格标题"},{id:"columns",label:"列名（逗号分隔）",labelEn:"Columns (comma separated)",type:"text",defaultValue:"订单号, 客户, 金额, 状态, 日期",placeholder:"如：订单号, 客户, 金额"},{id:"rowCount",label:"行数",labelEn:"Row Count",type:"text",defaultValue:"5",placeholder:"显示行数"}]},{id:"footer",name:"页脚",nameEn:"Footer",description:"仪表盘底部信息",defaultEnabled:!0,fields:[{id:"copyright",label:"版权信息",labelEn:"Copyright",type:"text",defaultValue:"2024 Dashboard. All rights reserved.",placeholder:"版权声明"},{id:"version",label:"版本号",labelEn:"Version",type:"text",defaultValue:"v1.0.0",placeholder:"如：v1.0.0"}]}]};function u(e,t){let a=e.find(e=>e.id===t);return a?.content||{}}function b(e,t){let a=e.find(e=>e.id===t);return a?.enabled??!0}function h(e,t){var a,r,o,d;let c,p,m,h,g,f,x,v,y,k,w,j,N,{sections:$,globalContent:C}=e,T="";b($,"hero")&&(T+=(p=(a=u($,"hero")).headline||"构建更好的产品",m=a.subheadline||"我们帮助团队更快地将想法变为现实。",h=a.ctaText||"立即开始",g=a.ctaSecondaryText||"了解更多",`
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">${p}</h1>
        <p class="hero-subtitle">${m}</p>
        <div class="hero-buttons">
          <a href="#" class="btn btn-primary">${h}</a>
          <a href="#" class="btn btn-outline">${g}</a>
        </div>
      </div>
    </div>
  </section>
`)),b($,"features")&&(T+=(f=(r=u($,"features")).title||"核心功能",x=r.subtitle||"我们提供全面的解决方案。",v=[{title:r.feature1Title||"快速部署",desc:r.feature1Desc||"一键部署到云端。"},{title:r.feature2Title||"安全可靠",desc:r.feature2Desc||"企业级安全标准。"},{title:r.feature3Title||"灵活扩展",desc:r.feature3Desc||"按需弹性扩容。"}].map(e=>`
      <div class="feature-card card">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h3 class="feature-title">${e.title}</h3>
        <p class="feature-desc">${e.desc}</p>
      </div>
    `).join("\n"),`
  <section class="features">
    <div class="container">
      <div class="section-header text-center">
        <h2>${f}</h2>
        <p class="text-muted">${x}</p>
      </div>
      <div class="features-grid">
        ${v}
      </div>
    </div>
  </section>
`)),b($,"cta")&&(T+=(y=(o=u($,"cta")).title||"准备好开始了吗？",k=o.description||"加入数千家企业，开启你的成功之旅。",w=o.buttonText||"免费注册",`
  <section class="cta">
    <div class="container">
      <div class="cta-content text-center">
        <h2>${y}</h2>
        <p class="text-muted">${k}</p>
        <a href="#" class="btn btn-primary">${w}</a>
      </div>
    </div>
  </section>
`)),b($,"footer")&&(T+=(j=(d=u($,"footer")).copyright||"2024 Your Company. All rights reserved.",N=(d.links||"关于我们, 服务条款, 隐私政策").split(",").map(e=>e.trim()).map(e=>`<a href="#" class="footer-link">${e}</a>`).join("\n          "),`
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-links">
          ${N}
        </div>
        <p class="footer-copyright text-muted">${j}</p>
      </div>
    </div>
  </footer>
`));let E="";"builtin"===t.type?(c=l(t.style),E=n(t.style)):c=s(t.style.definition);let S=i(),z=`
/* Hero Section */
.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-background) 100%);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1.5rem;
  color: var(--color-foreground);
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-muted);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Features Section */
.features {
  background-color: var(--color-background);
}

.section-header {
  max-width: 600px;
  margin: 0 auto 3rem;
}

.section-header h2 {
  margin-bottom: 1rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
}

.feature-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  color: var(--color-background);
  border-radius: 50%;
}

.feature-title {
  font-size: var(--font-size-xl);
  margin-bottom: 0.5rem;
}

.feature-desc {
  color: var(--color-muted);
  line-height: 1.6;
}

/* CTA Section */
.cta {
  background-color: var(--color-secondary);
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-content h2 {
  margin-bottom: 1rem;
}

.cta-content p {
  margin-bottom: 2rem;
}

/* Footer */
.footer {
  padding: 2rem 0;
  border-top: var(--border-width) solid var(--color-muted);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.footer-links {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-link {
  color: var(--color-muted);
  font-size: var(--font-size-sm);
}

.footer-link:hover {
  color: var(--color-foreground);
}

.footer-copyright {
  font-size: var(--font-size-sm);
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }
}
`,D=`${c}

${S}

${z}

${E}`;return`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${C.siteName||"My Website"}</title>
  <meta name="description" content="${C.siteDescription||""}">
  <style>
${D}
  </style>
</head>
<body>
${T}
</body>
</html>`}function g(e,t){var a,r,o,d;let c,p,m,h,g,f,x,v,y,k,w,j,N,$,C,T,E,S,{sections:z,globalContent:D}=e,V="";b(z,"hero")&&(V+=(p=(a=u(z,"hero")).name||"张三",m=a.title||"全栈开发者",h=a.bio||"专注于创造美观、实用的数字产品。",g=a.ctaText||"查看作品",`
  <section class="portfolio-hero">
    <div class="container">
      <div class="portfolio-hero-content">
        <div class="portfolio-avatar">
          <div class="avatar-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
        <p class="portfolio-greeting">你好，我是</p>
        <h1 class="portfolio-name">${p}</h1>
        <p class="portfolio-title">${m}</p>
        <p class="portfolio-bio">${h}</p>
        <a href="#projects" class="btn btn-primary">${g}</a>
      </div>
    </div>
  </section>
`)),b(z,"projects")&&(V+=(f=(r=u(z,"projects")).title||"精选作品",x=r.subtitle||"这些是我近期完成的一些项目。",v=[{title:r.project1Title||"项目一",desc:r.project1Desc||"项目描述",tag:r.project1Tag||"设计"},{title:r.project2Title||"项目二",desc:r.project2Desc||"项目描述",tag:r.project2Tag||"开发"},{title:r.project3Title||"项目三",desc:r.project3Desc||"项目描述",tag:r.project3Tag||"品牌"}].map((e,t)=>`
      <div class="project-card card">
        <div class="project-image" style="background: linear-gradient(135deg, var(--color-accent-${t%3+1}) 0%, var(--color-primary) 100%);">
          <span class="project-number">0${t+1}</span>
        </div>
        <div class="project-info">
          <span class="project-tag">${e.tag}</span>
          <h3 class="project-title">${e.title}</h3>
          <p class="project-desc">${e.desc}</p>
          <a href="#" class="project-link">
            查看详情
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    `).join("\n"),`
  <section class="projects" id="projects">
    <div class="container">
      <div class="section-header text-center">
        <h2>${f}</h2>
        <p class="text-muted">${x}</p>
      </div>
      <div class="projects-grid">
        ${v}
      </div>
    </div>
  </section>
`)),b(z,"about")&&(V+=(y=(o=u(z,"about")).title||"关于我",k=o.description||"我是一名热爱设计与技术的创作者。",w=[o.skill1||"UI/UX 设计",o.skill2||"前端开发",o.skill3||"品牌设计",o.skill4||"产品策略"].map(e=>`
      <div class="skill-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>${e}</span>
      </div>
    `).join("\n"),`
  <section class="about">
    <div class="container">
      <div class="about-grid">
        <div class="about-content">
          <h2>${y}</h2>
          <p class="about-description">${k}</p>
        </div>
        <div class="about-skills">
          <h3 class="skills-title">技能专长</h3>
          <div class="skills-list">
            ${w}
          </div>
        </div>
      </div>
    </div>
  </section>
`)),b(z,"contact")&&(V+=(j=(d=u(z,"contact")).title||"联系我",N=d.description||"有项目想要合作？随时给我发邮件。",$=d.email||"hello@example.com",C=d.buttonText||"发送邮件",T=(d.socialLinks||"GitHub, Twitter, LinkedIn").split(",").map(e=>e.trim()),E={GitHub:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',Dribbble:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32M8.56 2.75c4.37 6 6.56 12.3 7.13 19.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>',LinkedIn:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>',Twitter:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'},S=T.map(e=>{let t=E[e]||`<span>${e[0]}</span>`;return`<a href="#" class="social-link" title="${e}">${t}</a>`}).join("\n          "),`
  <section class="contact">
    <div class="container">
      <div class="contact-content text-center">
        <h2>${j}</h2>
        <p class="text-muted">${N}</p>
        <a href="mailto:${$}" class="btn btn-primary">${C}</a>
        <div class="social-links">
          ${S}
        </div>
      </div>
    </div>
  </section>
`));let P="";"builtin"===t.type?(c=l(t.style),P=n(t.style)):c=s(t.style.definition);let B=i(),A=`
/* Portfolio Hero */
.portfolio-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, var(--color-secondary) 0%, var(--color-background) 100%);
}

.portfolio-hero-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.portfolio-avatar {
  margin-bottom: 2rem;
}

.avatar-placeholder {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 50%;
  background-color: var(--color-secondary);
  border: 3px solid var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
}

.portfolio-greeting {
  font-size: var(--font-size-lg);
  color: var(--color-muted);
  margin-bottom: 0.5rem;
}

.portfolio-name {
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: 0.5rem;
  color: var(--color-foreground);
}

.portfolio-title {
  font-size: var(--font-size-xl);
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.portfolio-bio {
  font-size: var(--font-size-lg);
  color: var(--color-muted);
  margin-bottom: 2rem;
  line-height: 1.7;
}

/* Projects Section */
.projects {
  background-color: var(--color-background);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.project-card {
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
}

.project-image {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.project-number {
  font-size: 4rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.3);
}

.project-info {
  padding: 1.5rem;
}

.project-tag {
  display: inline-block;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary);
  background-color: var(--color-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius);
  margin-bottom: 0.75rem;
}

.project-title {
  font-size: var(--font-size-xl);
  margin-bottom: 0.5rem;
}

.project-desc {
  color: var(--color-muted);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-primary);
}

.project-link:hover {
  text-decoration: none;
  gap: 0.75rem;
}

/* About Section */
.about {
  background-color: var(--color-secondary);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

.about-content h2 {
  margin-bottom: 1.5rem;
}

.about-description {
  color: var(--color-muted);
  line-height: 1.8;
  font-size: var(--font-size-lg);
}

.skills-title {
  font-size: var(--font-size-lg);
  margin-bottom: 1.5rem;
}

.skills-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-foreground);
}

.skill-item svg {
  color: var(--color-primary);
  flex-shrink: 0;
}

/* Contact Section */
.contact {
  background-color: var(--color-background);
}

.contact-content {
  max-width: 600px;
  margin: 0 auto;
}

.contact-content h2 {
  margin-bottom: 1rem;
}

.contact-content p {
  margin-bottom: 2rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.social-link {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--color-secondary);
  color: var(--color-foreground);
  transition: all 0.2s ease;
}

.social-link:hover {
  background-color: var(--color-primary);
  color: var(--color-background);
  transform: translateY(-2px);
}
`,F=`${c}

${B}

${A}

${P}`;return`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${D.siteName||"My Portfolio"}</title>
  <meta name="description" content="${D.siteDescription||""}">
  <style>
${F}
  </style>
</head>
<body>
${V}
</body>
</html>`}function f(e,t){var a,r,o,d;let c,p,m,h,g,f,x,v,y,k,w,j,N,$,C,T,E,{sections:S,globalContent:z}=e,D="",V="",P="",B="";b(S,"hero")&&(p=(a=u(S,"hero")).blogName||"我的博客",m=a.tagline||"分享技术与思考",h=a.authorName||"作者",g=a.authorBio||"热爱技术与写作的开发者",D=`
  <section class="blog-hero">
    <div class="container">
      <div class="blog-hero-content">
        <h1 class="blog-name">${p}</h1>
        <p class="blog-tagline">${m}</p>
        <div class="blog-author">
          <div class="blog-author-avatar">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div class="blog-author-info">
            <span class="blog-author-name">${h}</span>
            <span class="blog-author-bio">${g}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
`),b(S,"posts")&&(f=(r=u(S,"posts")).sectionTitle||"最新文章",x=[{title:r.post1Title||"开始使用 Next.js 构建现代 Web 应用",excerpt:r.post1Excerpt||"Next.js 是一个强大的 React 框架...",date:r.post1Date||"2024-01-15",category:r.post1Category||"前端开发"},{title:r.post2Title||"TypeScript 高级类型技巧",excerpt:r.post2Excerpt||"深入探索 TypeScript 的高级类型系统...",date:r.post2Date||"2024-01-10",category:r.post2Category||"TypeScript"},{title:r.post3Title||"CSS Grid 布局完全指南",excerpt:r.post3Excerpt||"CSS Grid 是现代 CSS 布局中最强大的工具之一...",date:r.post3Date||"2024-01-05",category:r.post3Category||"CSS"}].map(e=>`
      <article class="post-card">
        <div class="post-meta">
          <time class="post-date">${e.date}</time>
          <span class="post-category">${e.category}</span>
        </div>
        <h3 class="post-title"><a href="#">${e.title}</a></h3>
        <p class="post-excerpt">${e.excerpt}</p>
        <a href="#" class="post-read-more">
          阅读全文
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </article>
    `).join("\n"),V=`
  <div class="blog-posts">
    <h2 class="blog-section-title">${f}</h2>
    ${x}
  </div>
`),b(S,"sidebar")&&(v=(o=u(S,"sidebar")).aboutTitle||"关于",y=o.aboutText||"这是一个关于技术、设计和创造力的博客。",k=o.categories||"前端开发, 后端技术, 设计思维, 工具推荐",w=o.tags||"React, TypeScript, Next.js, CSS, Node.js, Design",j=k.split(",").map(e=>e.trim()),N=w.split(",").map(e=>e.trim()),$=j.map(e=>`<li class="sidebar-category-item"><a href="#">${e}</a></li>`).join("\n            "),C=N.map(e=>`<a href="#" class="sidebar-tag">${e}</a>`).join("\n            "),P=`
  <aside class="blog-sidebar">
    <div class="sidebar-section">
      <h3 class="sidebar-title">${v}</h3>
      <p class="sidebar-about-text">${y}</p>
    </div>
    <div class="sidebar-section">
      <h3 class="sidebar-title">分类</h3>
      <ul class="sidebar-categories">
            ${$}
      </ul>
    </div>
    <div class="sidebar-section">
      <h3 class="sidebar-title">标签</h3>
      <div class="sidebar-tags">
            ${C}
      </div>
    </div>
  </aside>
`),b(S,"footer")&&(T=(d=u(S,"footer")).copyright||"2024 My Blog. All rights reserved.",E=(d.links||"首页, 归档, 关于, RSS").split(",").map(e=>e.trim()).map(e=>`<a href="#" class="footer-link">${e}</a>`).join("\n          "),B=`
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-links">
          ${E}
        </div>
        <p class="footer-copyright text-muted">${T}</p>
      </div>
    </div>
  </footer>
`);let A=V||P?`
  <div class="blog-layout">
${V}${P}  </div>
`:"",F=`${D}${A}${B}`,M="";"builtin"===t.type?(c=l(t.style),M=n(t.style)):c=s(t.style.definition);let I=i(),L=`
/* Blog Hero */
.blog-hero {
  padding: 4rem 0 3rem;
  background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-background) 100%);
}

.blog-hero-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.blog-name {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 0.5rem;
  color: var(--color-foreground);
}

.blog-tagline {
  font-size: var(--font-size-xl);
  color: var(--color-muted);
  margin-bottom: 2rem;
}

.blog-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.blog-author-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--color-secondary);
  border: 2px solid var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  flex-shrink: 0;
}

.blog-author-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.blog-author-name {
  font-weight: 600;
  color: var(--color-foreground);
}

.blog-author-bio {
  font-size: var(--font-size-sm);
  color: var(--color-muted);
}

/* Blog Layout */
.blog-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  max-width: var(--container-max-width, 1200px);
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

@media (min-width: 768px) {
  .blog-layout {
    grid-template-columns: 1fr 300px;
  }
}

/* Blog Section Title */
.blog-section-title {
  font-size: var(--font-size-2xl);
  margin-bottom: 2rem;
  color: var(--color-foreground);
}

/* Post Cards */
.post-card {
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: var(--border-width) solid var(--color-muted);
}

.post-card:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.post-date {
  font-size: var(--font-size-sm);
  color: var(--color-muted);
}

.post-category {
  display: inline-block;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary);
  background-color: var(--color-secondary);
  padding: 0.2rem 0.6rem;
  border-radius: var(--border-radius);
}

.post-title {
  font-size: var(--font-size-xl);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.post-title a {
  color: var(--color-foreground);
  text-decoration: none;
}

.post-title a:hover {
  color: var(--color-primary);
}

.post-excerpt {
  color: var(--color-muted);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.post-read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-primary);
}

.post-read-more:hover {
  text-decoration: none;
  gap: 0.75rem;
}

/* Blog Sidebar */
.blog-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-section {
  padding: 1.5rem;
  background-color: var(--color-secondary);
  border-radius: var(--border-radius);
}

.sidebar-title {
  font-size: var(--font-size-lg);
  margin-bottom: 1rem;
  color: var(--color-foreground);
}

.sidebar-about-text {
  color: var(--color-muted);
  font-size: var(--font-size-sm);
  line-height: 1.7;
}

/* Sidebar Categories */
.sidebar-categories {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-category-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-muted);
}

.sidebar-category-item:last-child {
  border-bottom: none;
}

.sidebar-category-item a {
  color: var(--color-foreground);
  font-size: var(--font-size-sm);
  text-decoration: none;
}

.sidebar-category-item a:hover {
  color: var(--color-primary);
}

/* Sidebar Tags */
.sidebar-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.sidebar-tag {
  display: inline-block;
  font-size: var(--font-size-xs);
  color: var(--color-foreground);
  background-color: var(--color-background);
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  transition: all 0.2s ease;
}

.sidebar-tag:hover {
  background-color: var(--color-primary);
  color: var(--color-background);
}

/* Footer */
.footer {
  padding: 2rem 0;
  border-top: var(--border-width) solid var(--color-muted);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.footer-links {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-link {
  color: var(--color-muted);
  font-size: var(--font-size-sm);
}

.footer-link:hover {
  color: var(--color-foreground);
}

.footer-copyright {
  font-size: var(--font-size-sm);
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }
}
`,H=`${c}

${I}

${L}

${M}`;return`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${z.siteName||"My Blog"}</title>
  <meta name="description" content="${z.siteDescription||""}">
  <style>
${H}
  </style>
</head>
<body>
${F}
</body>
</html>`}function x(e,t){var a,r,o,d,c;let p,m,h,g,f,x,v,y,k,w,j,N,$,C,T,E,S,z,{sections:D,globalContent:V}=e,P="",B="",A="",F="",M="";b(D,"sidebar")&&(m=(a=u(D,"sidebar")).appName||"Dashboard",h=a.navItems||"概览, 分析, 订单, 用户, 设置",g=a.activeItem||"概览",f=h.split(",").map(e=>e.trim()).map(e=>`        <a href="#" class="dashboard-nav-item${e===g?" dashboard-nav-item--active":""}">${e}</a>`).join("\n"),P=`
    <aside class="dashboard-sidebar">
      <div class="dashboard-sidebar-header">
        <h2 class="dashboard-app-name">${m}</h2>
      </div>
      <nav class="dashboard-nav">
${f}
      </nav>
    </aside>
`),b(D,"kpi")&&(x=(r=u(D,"kpi")).sectionTitle||"数据概览",v=[{label:r.kpi1Label||"总收入",value:r.kpi1Value||"$48,230",change:r.kpi1Change||"+12.5%"},{label:r.kpi2Label||"用户数",value:r.kpi2Value||"2,420",change:r.kpi2Change||"+5.2%"},{label:r.kpi3Label||"订单量",value:r.kpi3Value||"1,210",change:r.kpi3Change||"-2.1%"},{label:r.kpi4Label||"转化率",value:r.kpi4Value||"3.6%",change:r.kpi4Change||"+0.3%"}].map(e=>{let t=e.change.startsWith("+");return`
        <div class="dashboard-kpi-card">
          <span class="dashboard-kpi-label">${e.label}</span>
          <span class="dashboard-kpi-value">${e.value}</span>
          <span class="dashboard-kpi-change ${t?"dashboard-kpi-change--positive":"dashboard-kpi-change--negative"}">${e.change}</span>
        </div>`}).join("\n"),B=`
      <section class="dashboard-kpi-section">
        <h2 class="dashboard-section-title">${x}</h2>
        <div class="dashboard-kpi-grid">
${v}
        </div>
      </section>
`),b(D,"charts")&&(y=(o=u(D,"charts")).chartTitle||"收入趋势",k=o.chartType||"bar",w=`
          <div class="dashboard-chart-bars">
            <div class="dashboard-chart-bar" style="height: 40%;">
              <span class="dashboard-chart-bar-label">Jan</span>
            </div>
            <div class="dashboard-chart-bar" style="height: 65%;">
              <span class="dashboard-chart-bar-label">Feb</span>
            </div>
            <div class="dashboard-chart-bar" style="height: 50%;">
              <span class="dashboard-chart-bar-label">Mar</span>
            </div>
            <div class="dashboard-chart-bar" style="height: 75%;">
              <span class="dashboard-chart-bar-label">Apr</span>
            </div>
            <div class="dashboard-chart-bar" style="height: 60%;">
              <span class="dashboard-chart-bar-label">May</span>
            </div>
            <div class="dashboard-chart-bar" style="height: 85%;">
              <span class="dashboard-chart-bar-label">Jun</span>
            </div>
            <div class="dashboard-chart-bar" style="height: 70%;">
              <span class="dashboard-chart-bar-label">Jul</span>
            </div>
            <div class="dashboard-chart-bar" style="height: 90%;">
              <span class="dashboard-chart-bar-label">Aug</span>
            </div>
          </div>`,A=`
      <section class="dashboard-chart-section">
        <div class="dashboard-chart-area">
          <h3 class="dashboard-chart-title">${y}</h3>
          <div class="dashboard-chart-container" data-chart-type="${k}">
${w}
          </div>
        </div>
      </section>
`),b(D,"table")&&(j=(d=u(D,"table")).tableTitle||"最近订单",N=d.columns||"订单号, 客户, 金额, 状态, 日期",$=parseInt(d.rowCount||"5",10),T=(C=N.split(",").map(e=>e.trim())).map(e=>`<th class="dashboard-table-th">${e}</th>`).join("\n              "),E=[["#1001","张三","$320.00","已完成","2024-01-15"],["#1002","李四","$150.00","处理中","2024-01-14"],["#1003","王五","$480.00","已完成","2024-01-13"],["#1004","赵六","$220.00","待支付","2024-01-12"],["#1005","孙七","$560.00","已完成","2024-01-11"],["#1006","周八","$190.00","处理中","2024-01-10"],["#1007","吴九","$340.00","已完成","2024-01-09"]].slice(0,$).map(e=>{let t=C.map((t,a)=>{let r=e[a]||"-";return 3===a?`<td class="dashboard-table-td"><span class="dashboard-status ${"已完成"===r?"dashboard-status--completed":"处理中"===r?"dashboard-status--processing":"dashboard-status--pending"}">${r}</span></td>`:`<td class="dashboard-table-td">${r}</td>`}).join("\n              ");return`            <tr class="dashboard-table-row">
              ${t}
            </tr>`}).join("\n"),F=`
      <section class="dashboard-table-section">
        <h3 class="dashboard-table-title">${j}</h3>
        <div class="dashboard-table-wrapper">
          <table class="dashboard-table">
            <thead>
            <tr>
              ${T}
            </tr>
            </thead>
            <tbody>
${E}
            </tbody>
          </table>
        </div>
      </section>
`),b(D,"footer")&&(S=(c=u(D,"footer")).copyright||"2024 Dashboard. All rights reserved.",z=c.version||"v1.0.0",M=`
      <footer class="dashboard-footer">
        <span class="dashboard-footer-copyright">${S}</span>
        <span class="dashboard-footer-version">${z}</span>
      </footer>
`);let I=`${B}${A}${F}`,L=`
  <div class="dashboard-layout">
${P}    <div class="dashboard-main">
      <div class="dashboard-content">
${I}      </div>
${M}    </div>
  </div>`,H="";"builtin"===t.type?(p=l(t.style),H=n(t.style)):p=s(t.style.definition);let K=i(),R=`
/* Dashboard Layout */
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-background);
}

/* Dashboard Sidebar */
.dashboard-sidebar {
  width: 16rem;
  min-height: 100vh;
  background-color: #111827;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.dashboard-sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid #1f2937;
}

.dashboard-app-name {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.dashboard-nav {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.dashboard-nav-item {
  display: block;
  padding: 0.75rem 1.5rem;
  color: #9ca3af;
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.dashboard-nav-item:hover {
  background-color: #1f2937;
  color: #ffffff;
}

.dashboard-nav-item--active {
  background-color: var(--color-primary);
  color: #ffffff;
}

.dashboard-nav-item--active:hover {
  background-color: var(--color-primary);
}

/* Dashboard Main */
.dashboard-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.dashboard-content {
  flex: 1;
  padding: 2rem;
}

/* Dashboard Section Title */
.dashboard-section-title {
  font-size: var(--font-size-2xl);
  color: var(--color-foreground);
  margin-bottom: 1.5rem;
}

/* Dashboard KPI Grid */
.dashboard-kpi-section {
  margin-bottom: 2rem;
}

.dashboard-kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.dashboard-kpi-card {
  background-color: #ffffff;
  border: var(--border-width) solid var(--color-muted);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dashboard-kpi-label {
  font-size: var(--font-size-sm);
  color: var(--color-muted);
  font-weight: 500;
}

.dashboard-kpi-value {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-foreground);
}

.dashboard-kpi-change {
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.dashboard-kpi-change--positive {
  color: #16a34a;
}

.dashboard-kpi-change--negative {
  color: #dc2626;
}

/* Dashboard Chart Area */
.dashboard-chart-section {
  margin-bottom: 2rem;
}

.dashboard-chart-area {
  background-color: #ffffff;
  border: var(--border-width) solid var(--color-muted);
  border-radius: var(--border-radius);
  padding: 1.5rem;
}

.dashboard-chart-title {
  font-size: var(--font-size-lg);
  color: var(--color-foreground);
  margin-bottom: 1.5rem;
}

.dashboard-chart-container {
  height: 280px;
  position: relative;
}

.dashboard-chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 100%;
  padding: 0 0.5rem;
  gap: 0.75rem;
}

.dashboard-chart-bar {
  flex: 1;
  background: linear-gradient(180deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  position: relative;
  min-width: 24px;
  transition: opacity 0.2s ease;
}

.dashboard-chart-bar:hover {
  opacity: 0.85;
}

.dashboard-chart-bar-label {
  position: absolute;
  bottom: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--font-size-xs);
  color: var(--color-muted);
  white-space: nowrap;
}

/* Dashboard Table */
.dashboard-table-section {
  margin-bottom: 2rem;
}

.dashboard-table-title {
  font-size: var(--font-size-lg);
  color: var(--color-foreground);
  margin-bottom: 1rem;
}

.dashboard-table-wrapper {
  background-color: #ffffff;
  border: var(--border-width) solid var(--color-muted);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.dashboard-table {
  width: 100%;
  border-collapse: collapse;
}

.dashboard-table-th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-muted);
  background-color: var(--color-secondary);
  border-bottom: var(--border-width) solid var(--color-muted);
}

.dashboard-table-td {
  padding: 0.75rem 1rem;
  font-size: var(--font-size-sm);
  color: var(--color-foreground);
  border-bottom: 1px solid var(--color-secondary);
}

.dashboard-table-row:last-child .dashboard-table-td {
  border-bottom: none;
}

.dashboard-table-row:hover {
  background-color: var(--color-secondary);
}

/* Status Badges */
.dashboard-status {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: var(--border-radius);
  font-size: var(--font-size-xs);
  font-weight: 500;
}

.dashboard-status--completed {
  background-color: #dcfce7;
  color: #16a34a;
}

.dashboard-status--processing {
  background-color: #dbeafe;
  color: #2563eb;
}

.dashboard-status--pending {
  background-color: #fef9c3;
  color: #ca8a04;
}

/* Dashboard Footer */
.dashboard-footer {
  padding: 1rem 2rem;
  border-top: var(--border-width) solid var(--color-muted);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-footer-copyright {
  font-size: var(--font-size-sm);
  color: var(--color-muted);
}

.dashboard-footer-version {
  font-size: var(--font-size-sm);
  color: var(--color-muted);
}

/* Responsive: 1024px - KPI goes 2-col */
@media (max-width: 1024px) {
  .dashboard-kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Responsive: 768px - Sidebar hides, KPI goes 1-col */
@media (max-width: 768px) {
  .dashboard-sidebar {
    display: none;
  }

  .dashboard-kpi-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-content {
    padding: 1rem;
  }

  .dashboard-footer {
    padding: 1rem;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
`,W=`${p}

${K}

${R}

${H}`;return`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${V.siteName||"Dashboard"}</title>
  <meta name="description" content="${V.siteDescription||""}">
  <style>
${W}
  </style>
</head>
<body>
${L}
</body>
</html>`}function v(e,t){let a=e.find(e=>e.id===t);return a?.content||{}}function y(e,t){let a=e.find(e=>e.id===t);return a?.enabled??!0}function k(e){return[d,c,p,m].find(t=>t.type===e)}var w=e.i(502007);function j({currentStep:e,totalSteps:a,labels:r}){return(0,t.jsx)("div",{className:"flex items-center justify-between max-w-2xl mx-auto",children:Array.from({length:a},(e,t)=>t+1).map(o=>{let l=o===e,s=o<e;return(0,t.jsxs)("div",{className:"flex items-center",children:[(0,t.jsxs)("div",{className:"flex flex-col items-center",children:[(0,t.jsx)("div",{className:`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${l||s?"bg-foreground text-background":"border-2 border-border text-muted"}`,children:s?(0,t.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:(0,t.jsx)("polyline",{points:"20 6 9 17 4 12"})}):o}),(0,t.jsx)("span",{className:`mt-2 text-xs tracking-wide ${l?"text-foreground":"text-muted"}`,children:r[o-1]})]}),o<a&&(0,t.jsx)("div",{className:`w-12 md:w-24 h-0.5 mx-2 ${s?"bg-foreground":"bg-border"}`})]},o)})})}var N=e.i(335852),$=e.i(239777),C=e.i(758065),T=e.i(385974);let E="stylekit-generator-recent-styles",S=["liquid-glass","neo-brutalist","glassmorphism","editorial","warm-dashboard","minimalist-flat","swiss-poster","memphis"];function z({styles:e,customStyles:o,selectedSlug:l,selectedCustomId:s,onSelect:i}){let{t:n}=(0,r.useI18n)(),[d,c]=(0,a.useState)(""),[p,m]=(0,a.useState)("featured"),[u,b]=(0,a.useState)([]);(0,a.useEffect)(()=>{try{let e=localStorage.getItem(E);if(!e)return;let t=JSON.parse(e);if(Array.isArray(t)){let e=t.filter(e=>"string"==typeof e);b(e.slice(0,8))}}catch{b([])}},[]);let h=(0,a.useCallback)(e=>{b(t=>{let a=[e,...t.filter(t=>t!==e)].slice(0,8);return localStorage.setItem(E,JSON.stringify(a)),a})},[]),g=(0,a.useMemo)(()=>{let t=new Map(e.map(e=>[e.slug,e])),a=S.map(e=>t.get(e)).filter(e=>!!e);if(a.length>=12)return a.slice(0,12);let r=new Set(a.map(e=>e.slug)),o=e.filter(e=>!r.has(e.slug)).slice(0,12-a.length);return[...a,...o]},[e]),f=(0,a.useMemo)(()=>{let t=new Map(e.map(e=>[e.slug,e]));return u.map(e=>t.get(e)).filter(e=>!!e)},[u,e]),x=d.trim().toLowerCase(),v=(0,a.useMemo)(()=>x?e.filter(e=>[e.name,e.nameEn,e.slug,e.description,...e.keywords].join(" ").toLowerCase().includes(x)):e,[e,x]),y=(0,a.useMemo)(()=>{let t=x?v:"recent"===p?f:"all"===p?e:g;if(!l||t.some(e=>e.slug===l))return t;let a=e.find(e=>e.slug===l);return a?[a,...t]:t},[x,v,p,f,e,g,l]),k=(0,a.useCallback)(e=>{i(e,!1),h(e)},[i,h]),w=[{key:"featured",label:n("generator.viewFeatured")},{key:"recent",label:n("generator.viewRecent")},{key:"all",label:n("generator.viewAll")}];return(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{className:"text-xl md:text-2xl mb-2",children:n("generator.selectStyle")}),o.length>0&&(0,t.jsxs)("div",{className:"mb-8",children:[(0,t.jsx)("p",{className:"text-muted mb-4",children:n("generator.customStyles")}),(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6",children:[o.map(e=>{let a=e.id===s;return(0,t.jsxs)("button",{onClick:()=>i(e.id,!0),className:`group text-left border transition-all ${a?"border-foreground ring-2 ring-foreground ring-offset-2":"border-border hover:border-foreground"}`,children:[(0,t.jsxs)("div",{className:"aspect-[4/3] flex items-center justify-center relative",style:{backgroundColor:e.definition.colors.background},children:[(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("div",{className:"w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center",style:{backgroundColor:e.definition.colors.primary},children:(0,t.jsx)(T.Palette,{className:"w-6 h-6",style:{color:e.definition.colors.background}})}),(0,t.jsx)("p",{className:"text-xs font-medium",style:{color:e.definition.colors.foreground},children:"Custom"})]}),a&&(0,t.jsx)("div",{className:"absolute top-2 right-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center",children:(0,t.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",children:(0,t.jsx)("polyline",{points:"20 6 9 17 4 12"})})})]}),(0,t.jsxs)("div",{className:"h-1 flex",children:[(0,t.jsx)("div",{className:"flex-1",style:{backgroundColor:e.definition.colors.primary}}),(0,t.jsx)("div",{className:"flex-1",style:{backgroundColor:e.definition.colors.secondary}}),e.definition.colors.accent.slice(0,2).map((e,a)=>(0,t.jsx)("div",{className:"flex-1",style:{backgroundColor:e}},a))]}),(0,t.jsxs)("div",{className:"p-3",children:[(0,t.jsx)("p",{className:"font-medium text-sm group-hover:text-accent transition-colors",children:e.name}),(0,t.jsx)("p",{className:"text-xs text-muted",children:e.nameEn})]})]},e.id)}),(0,t.jsxs)(N.default,{href:"/create-style",className:"group flex flex-col items-center justify-center border border-dashed border-border hover:border-foreground transition-colors aspect-[4/3] text-muted hover:text-foreground",children:[(0,t.jsx)(C.Plus,{className:"w-8 h-8 mb-2"}),(0,t.jsx)("span",{className:"text-sm",children:n("generator.createStyle")})]})]})]}),(0,t.jsxs)("p",{className:"text-muted mb-4",children:[n("generator.builtinStyles"),0===o.length&&(0,t.jsx)(N.default,{href:"/create-style",className:"ml-2 text-sm underline hover:text-foreground transition-colors",children:n("generator.createStyle")})]}),(0,t.jsxs)("div",{className:"mb-5 space-y-3",children:[(0,t.jsx)("label",{htmlFor:"generator-style-search",className:"sr-only",children:n("nav.search")}),(0,t.jsx)("input",{id:"generator-style-search",type:"text",value:d,onChange:e=>c(e.target.value),placeholder:n("generator.searchStyles"),className:"w-full md:max-w-md px-3 py-2 text-sm border border-border bg-background focus:outline-none focus:border-foreground transition-colors"}),(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[w.map(e=>(0,t.jsx)("button",{type:"button",onClick:()=>m(e.key),className:`px-3 py-1.5 text-xs tracking-wide transition-colors ${p===e.key?"bg-foreground text-background":"border border-border hover:border-foreground"}`,children:e.label},e.key)),(0,t.jsxs)("span",{className:"text-xs text-muted ml-auto",children:[y.length," ",n("generator.results")]})]}),!x&&"featured"===p&&(0,t.jsx)("p",{className:"text-xs text-muted",children:n("generator.featuredHint")})]}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6",role:"radiogroup","aria-label":n("generator.selectStyle"),children:0===y.length?(0,t.jsx)("div",{className:"col-span-full border border-dashed border-border p-6 text-sm text-muted text-center",children:n(x?"common.noResults":"generator.recentEmpty")}):y.map((e,a)=>{let r=e.slug===l&&!s;return(0,t.jsxs)("div",{role:"radio","aria-checked":r,tabIndex:r||!l&&0===a?0:-1,onClick:()=>k(e.slug),onKeyDown:t=>{var a;return a=e.slug,void(("Enter"===t.key||" "===t.key)&&(t.preventDefault(),k(a)))},className:`group text-left border transition-all cursor-pointer ${r?"border-foreground ring-2 ring-foreground ring-offset-2":"border-border hover:border-foreground"}`,children:[(0,t.jsxs)("div",{className:"aspect-[4/3] overflow-hidden relative",children:[(0,t.jsx)($.StyleCoverPreview,{styleSlug:e.slug}),r&&(0,t.jsx)("div",{className:"absolute top-2 right-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center",children:(0,t.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",children:(0,t.jsx)("polyline",{points:"20 6 9 17 4 12"})})})]}),(0,t.jsxs)("div",{className:"h-1 flex",children:[(0,t.jsx)("div",{className:"flex-1",style:{backgroundColor:e.colors.primary}}),(0,t.jsx)("div",{className:"flex-1",style:{backgroundColor:e.colors.secondary}}),e.colors.accent.slice(0,2).map((e,a)=>(0,t.jsx)("div",{className:"flex-1",style:{backgroundColor:e}},a))]}),(0,t.jsxs)("div",{className:"p-3",children:[(0,t.jsx)("p",{className:"font-medium text-sm group-hover:text-accent transition-colors",children:e.name}),(0,t.jsx)("p",{className:"text-xs text-muted",children:e.nameEn})]})]},e.slug)})})]})}var D=e.i(316815),V=e.i(522417),P=e.i(588845),B=e.i(694653),A=e.i(108388),F=e.i(656599);let M=[{type:"landing",labelKey:"generator.landing",descKey:"generator.landingDesc",icon:(0,t.jsx)(D.FileText,{className:"w-6 h-6"})},{type:"portfolio",labelKey:"generator.portfolio",descKey:"generator.portfolioDesc",icon:(0,t.jsx)(V.Briefcase,{className:"w-6 h-6"})},{type:"blog",labelKey:"generator.blog",descKey:"generator.blogDesc",icon:(0,t.jsx)(P.PenLine,{className:"w-6 h-6"})},{type:"dashboard",labelKey:"generator.dashboard",descKey:"generator.dashboardDesc",icon:(0,t.jsx)(B.LayoutDashboard,{className:"w-6 h-6"})}],I=[{format:"html",labelKey:"generator.htmlFormat",descKey:"generator.htmlFormatDesc",icon:(0,t.jsx)(F.FileCode,{className:"w-5 h-5"})},{format:"react",labelKey:"generator.reactFormat",descKey:"generator.reactFormatDesc",icon:(0,t.jsx)(A.Code,{className:"w-5 h-5"})}];function L({selectedTemplate:e,selectedFormat:a,onSelect:o,onSelectFormat:l}){let{t:s}=(0,r.useI18n)();return(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{className:"text-xl md:text-2xl mb-2",children:s("generator.selectTemplate")}),(0,t.jsx)("p",{className:"text-muted mb-6",children:s("generator.selectTemplateDesc")}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mb-10",children:M.map(a=>{let r=a.type===e;return(0,t.jsx)("button",{onClick:()=>o(a.type),className:`group text-left p-6 border transition-all ${r?"border-foreground ring-2 ring-foreground ring-offset-2":"border-border hover:border-foreground"}`,children:(0,t.jsxs)("div",{className:"flex items-start gap-4",children:[(0,t.jsx)("div",{className:`p-3 rounded transition-colors ${r?"bg-foreground text-background":"bg-zinc-100 dark:bg-zinc-800 text-muted"}`,children:a.icon}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-1",children:[(0,t.jsx)("p",{className:"font-medium",children:s(a.labelKey)}),r&&(0,t.jsx)("span",{className:"text-xs px-2 py-0.5 bg-foreground text-background",children:s("generator.selected")})]}),(0,t.jsx)("p",{className:"text-sm text-muted",children:s(a.descKey)})]})]})},a.type)})}),(0,t.jsx)("h3",{className:"text-lg font-medium mb-2",children:s("generator.outputFormat")}),(0,t.jsx)("p",{className:"text-muted text-sm mb-4",children:s("generator.selectFormatDesc")}),(0,t.jsx)("div",{className:"flex flex-wrap gap-3 max-w-3xl",children:I.map(e=>{let r=e.format===a;return(0,t.jsxs)("button",{onClick:()=>l(e.format),className:`flex items-center gap-3 px-4 py-3 border transition-all ${r?"border-foreground bg-foreground text-background":"border-border hover:border-foreground"}`,children:[e.icon,(0,t.jsxs)("div",{className:"text-left",children:[(0,t.jsx)("p",{className:"font-medium text-sm",children:s(e.labelKey)}),(0,t.jsx)("p",{className:`text-xs ${r?"text-background/70":"text-muted"}`,children:s(e.descKey)})]})]},e.format)})})]})}var H=e.i(121779),K=e.i(672315);function R({templateDef:e,sections:o,globalContent:l,onUpdateSection:s,onUpdateSectionContent:i,onUpdateGlobalContent:n,previewHtml:d}){let{t:c}=(0,r.useI18n)(),[p,m]=(0,a.useState)(o[0]?.id||null),u=(0,a.useRef)(null);return(0,a.useEffect)(()=>{if(u.current&&d){let e=u.current.contentDocument;e&&(e.open(),e.write(d),e.close())}},[d]),(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{className:"text-xl md:text-2xl mb-2",children:c("generator.editContent")}),(0,t.jsxs)("p",{className:"text-muted mb-6",children:[e.name," - ",e.nameEn]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8",children:[(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"border border-border p-4",children:[(0,t.jsx)("p",{className:"text-xs tracking-widest uppercase text-muted mb-3",children:c("generator.siteName")}),(0,t.jsx)("input",{type:"text",value:l.siteName,onChange:e=>n({...l,siteName:e.target.value}),className:"w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors",placeholder:c("generator.siteName")}),(0,t.jsxs)("div",{className:"mt-3",children:[(0,t.jsx)("p",{className:"text-xs tracking-widest uppercase text-muted mb-2",children:c("generator.siteDescription")}),(0,t.jsx)("input",{type:"text",value:l.siteDescription,onChange:e=>n({...l,siteDescription:e.target.value}),className:"w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors",placeholder:c("generator.siteDescription")})]})]}),o.map(a=>{let r=e.sections.find(e=>e.id===a.id);if(!r)return null;let o=p===a.id;return(0,t.jsxs)("div",{className:"border border-border",children:[(0,t.jsxs)("button",{onClick:()=>m(o?null:a.id),className:"w-full flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsxs)("label",{className:"relative inline-flex items-center cursor-pointer",children:[(0,t.jsx)("input",{type:"checkbox",checked:a.enabled,onChange:e=>{e.stopPropagation(),s(a.id,{enabled:!a.enabled})},className:"sr-only peer"}),(0,t.jsx)("div",{className:"w-9 h-5 bg-zinc-300 dark:bg-zinc-600 peer-checked:bg-foreground rounded-full transition-colors relative",children:(0,t.jsx)("div",{className:`absolute top-0.5 w-4 h-4 bg-background rounded-full transition-transform ${a.enabled?"translate-x-4":"translate-x-0.5"}`})})]}),(0,t.jsxs)("div",{className:"text-left",children:[(0,t.jsx)("p",{className:"font-medium text-sm",children:a.name}),(0,t.jsx)("p",{className:"text-xs text-muted",children:a.nameEn})]})]}),o?(0,t.jsx)(K.ChevronUp,{className:"w-4 h-4 text-muted"}):(0,t.jsx)(H.ChevronDown,{className:"w-4 h-4 text-muted"})]}),o&&a.enabled&&(0,t.jsx)("div",{className:"border-t border-border p-4 space-y-3",children:r.fields.map(e=>(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-xs text-muted mb-1 block",children:e.label}),"textarea"===e.type?(0,t.jsx)("textarea",{value:a.content[e.id]||"",onChange:t=>i(a.id,e.id,t.target.value),placeholder:e.placeholder,rows:3,className:"w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors resize-none"}):(0,t.jsx)("input",{type:"text",value:a.content[e.id]||"",onChange:t=>i(a.id,e.id,t.target.value),placeholder:e.placeholder,className:"w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"})]},e.id))})]},a.id)})]}),(0,t.jsxs)("div",{className:"lg:sticky lg:top-24 h-fit",children:[(0,t.jsx)("p",{className:"text-xs tracking-widest uppercase text-muted mb-3",children:c("generator.preview")}),(0,t.jsx)("div",{className:"border border-border bg-white overflow-hidden",style:{height:"600px"},children:(0,t.jsx)("iframe",{ref:u,title:"Preview",className:"w-full h-full",sandbox:"allow-same-origin",style:{border:"none"}})})]})]})]})}function W({styles:e}){let{t:l}=(0,r.useI18n)(),[s,i]=(0,a.useState)(1),[n,c]=(0,a.useState)(!1),[p,m]=(0,a.useState)([]);(0,a.useEffect)(()=>{m((0,w.getStoredStyles)())},[]);let[u,b]=(0,a.useState)(null),[N,$]=(0,a.useState)(null),[C,T]=(0,a.useState)("landing"),[E,S]=(0,a.useState)("html"),[D,V]=(0,a.useState)({siteName:"My Website",siteDescription:"Welcome to my website"}),[P,B]=(0,a.useState)(()=>d.sections.map(e=>({id:e.id,name:e.name,nameEn:e.nameEn,description:e.description,enabled:e.defaultEnabled,content:Object.fromEntries(e.fields.map(e=>[e.id,e.defaultValue]))}))),A=(0,a.useMemo)(()=>e.find(e=>e.slug===u),[e,u]),F=(0,a.useMemo)(()=>p.find(e=>e.id===N),[p,N]),M=(0,a.useMemo)(()=>N&&F?{type:"custom",style:F}:u&&A?{type:"builtin",style:A}:null,[u,A,N,F]),I=(0,a.useMemo)(()=>k(C),[C]),H=(0,a.useMemo)(()=>({styleSlug:u||N||"",templateType:C,outputFormat:E,sections:P,globalContent:D}),[u,N,C,E,P,D]),K=(0,a.useMemo)(()=>M?"blog"===H.templateType?f(H,M):"dashboard"===H.templateType?x(H,M):"landing"===H.templateType?h(H,M):"portfolio"===H.templateType?g(H,M):"<p>Preview not available</p>":"",[H,M]),W=(0,a.useCallback)((e,t)=>{t?($(e),b(null)):(b(e),$(null))},[]),U=(0,a.useCallback)(e=>{T(e);let t=k(e);t&&B(t.sections.map(e=>({id:e.id,name:e.name,nameEn:e.nameEn,description:e.description,enabled:e.defaultEnabled,content:Object.fromEntries(e.fields.map(e=>[e.id,e.defaultValue]))})))},[]),O=(0,a.useCallback)((e,t)=>{B(a=>a.map(a=>a.id===e?{...a,...t}:a))},[]),G=(0,a.useCallback)((e,t,a)=>{B(r=>r.map(r=>r.id===e?{...r,content:{...r.content,[t]:a}}:r))},[]),J=(0,a.useCallback)(async()=>{if(M){c(!0);try{var e,t;let a,r,l,s,i,n="react"===E?function(e,t){var a,r,o,l,s,i,n,d,c,p,m,u,b,h,g,f,x,k,w,j;let N,$,C=[],{sections:T,globalContent:E}=e,S=function(e){if("builtin"===e.type){let{colors:t}=e.style;return{primary:t.primary,secondary:t.secondary,"accent-1":t.accent[0]||t.primary,"accent-2":t.accent[1]||t.secondary,"accent-3":t.accent[2]||t.primary,background:t.secondary,foreground:t.primary,muted:"#6b7280"}}{let{colors:t}=e.style.definition;return{primary:t.primary,secondary:t.secondary,"accent-1":t.accent[0]||t.primary,"accent-2":t.accent[1]||t.secondary,"accent-3":t.accent[2]||t.primary,background:t.background,foreground:t.foreground,muted:t.muted}}}(t);if(C.push({name:"package.json",content:JSON.stringify({name:E.siteName.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"")||"my-site",private:!0,version:"0.0.0",type:"module",scripts:{dev:"vite",build:"vite build",preview:"vite preview"},dependencies:{react:"^18.3.1","react-dom":"^18.3.1"},devDependencies:{"@types/react":"^18.3.1","@types/react-dom":"^18.3.1","@vitejs/plugin-react":"^4.3.1",autoprefixer:"^10.4.20",postcss:"^8.4.40",tailwindcss:"^3.4.7",typescript:"^5.5.3",vite:"^5.4.0"}},null,2),type:"json"}),C.push({name:"vite.config.ts",content:`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
`,type:"js"}),C.push({name:"tsconfig.json",content:JSON.stringify({compilerOptions:{target:"ES2020",useDefineForClassFields:!0,lib:["ES2020","DOM","DOM.Iterable"],module:"ESNext",skipLibCheck:!0,moduleResolution:"bundler",allowImportingTsExtensions:!0,isolatedModules:!0,moduleDetection:"force",noEmit:!0,jsx:"react-jsx",strict:!0},include:["src"]},null,2),type:"json"}),C.push({name:"postcss.config.js",content:`export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`,type:"js"}),C.push({name:"tailwind.config.js",content:`/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "${S.primary}",
        secondary: "${S.secondary}",
        accent: {
          1: "${S["accent-1"]}",
          2: "${S["accent-2"]}",
          3: "${S["accent-3"]}",
        },
        background: "${S.background}",
        foreground: "${S.foreground}",
        muted: "${S.muted}",
      },
    },
  },
  plugins: [],
};
`,type:"js"}),C.push({name:"index.html",content:(a=E.siteName,r=E.siteDescription,`<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${r}" />
    <title>${a}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`),type:"html"}),C.push({name:"src/main.tsx",content:`import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,type:"js"}),C.push({name:"src/index.css",content:`@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-foreground;
  }
}
`,type:"css"}),"landing"===e.templateType){let t,a,r,n,d,c,p,m,u,b,h,g;C.push({name:"src/App.tsx",content:function(e){let{sections:t}=e,a=[],r=[];return y(t,"hero")&&(a.push('import { Hero } from "./components/Hero";'),r.push("      <Hero />")),y(t,"features")&&(a.push('import { Features } from "./components/Features";'),r.push("      <Features />")),y(t,"cta")&&(a.push('import { CTA } from "./components/CTA";'),r.push("      <CTA />")),y(t,"footer")&&(a.push('import { Footer } from "./components/Footer";'),r.push("      <Footer />")),`${a.join("\n")}

export default function App() {
  return (
    <main>
${r.join("\n")}
    </main>
  );
}
`}(e),type:"js"}),y(T,"hero")&&C.push({name:"src/components/Hero.tsx",content:(t=(o=v(T,"hero")).headline||"Build Better Products",a=o.subheadline||"We help teams turn ideas into reality faster.",r=o.ctaText||"Get Started",n=o.ctaSecondaryText||"Watch Demo",`export function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center bg-gradient-to-br from-secondary to-background">
      <div className="max-w-[1200px] mx-auto px-4 w-full">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            ${t}
          </h1>
          <p className="text-lg md:text-xl text-muted mb-8 leading-relaxed">
            ${a}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 bg-primary text-background rounded font-medium hover:opacity-90 transition"
            >
              ${r}
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded font-medium hover:bg-primary hover:text-background transition"
            >
              ${n}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
`),type:"js"}),y(T,"features")&&C.push({name:"src/components/Features.tsx",content:(d=(l=v(T,"features")).title||"Core Features",c=l.subtitle||"We provide comprehensive solutions.",p=[{title:l.feature1Title||"Fast Deploy",desc:l.feature1Desc||"Deploy to cloud in minutes."},{title:l.feature2Title||"Secure & Reliable",desc:l.feature2Desc||"Enterprise-grade security."},{title:l.feature3Title||"Flexible Scaling",desc:l.feature3Desc||"Scale on demand."}].map(e=>`        <div className="bg-background border border-muted/30 rounded p-6 text-center shadow-sm">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-primary text-background rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">${e.title}</h3>
          <p className="text-muted leading-relaxed">${e.desc}</p>
        </div>`).join("\n"),`export function Features() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">${d}</h2>
          <p className="text-muted">${c}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
${p}
        </div>
      </div>
    </section>
  );
}
`),type:"js"}),y(T,"cta")&&C.push({name:"src/components/CTA.tsx",content:(m=(s=v(T,"cta")).title||"Ready to get started?",u=s.description||"Join thousands of companies already using our product.",b=s.buttonText||"Sign Up Free",`export function CTA() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">${m}</h2>
        <p className="text-muted mb-8">${u}</p>
        <a
          href="#"
          className="inline-flex items-center px-6 py-3 bg-primary text-background rounded font-medium hover:opacity-90 transition"
        >
          ${b}
        </a>
      </div>
    </section>
  );
}
`),type:"js"}),y(T,"footer")&&C.push({name:"src/components/Footer.tsx",content:(h=(i=v(T,"footer")).copyright||"2024 Your Company. All rights reserved.",g=(i.links||"About, Terms, Privacy").split(",").map(e=>e.trim()).map(e=>`          <a href="#" className="text-sm text-muted hover:text-foreground transition">${e}</a>`).join("\n"),`export function Footer() {
  return (
    <footer className="py-8 border-t border-muted/30">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-6 flex-wrap justify-center">
${g}
        </div>
        <p className="text-sm text-muted">${h}</p>
      </div>
    </footer>
  );
}
`),type:"js"})}else if("portfolio"===e.templateType){let t,a,r,o,l,s,i,m,u,b,h,g,f,x,k;C.push({name:"src/App.tsx",content:function(e){let{sections:t}=e,a=[],r=[];return y(t,"hero")&&(a.push('import { Hero } from "./components/Hero";'),r.push("      <Hero />")),y(t,"projects")&&(a.push('import { Projects } from "./components/Projects";'),r.push("      <Projects />")),y(t,"about")&&(a.push('import { About } from "./components/About";'),r.push("      <About />")),y(t,"contact")&&(a.push('import { Contact } from "./components/Contact";'),r.push("      <Contact />")),`${a.join("\n")}

export default function App() {
  return (
    <main>
${r.join("\n")}
    </main>
  );
}
`}(e),type:"js"}),y(T,"hero")&&C.push({name:"src/components/Hero.tsx",content:(t=(n=v(T,"hero")).name||"Zhang San",a=n.title||"Full-Stack Developer",r=n.bio||"Focused on creating beautiful, functional digital products.",o=n.ctaText||"View Work",`export function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-secondary to-background">
      <div className="max-w-[1200px] mx-auto px-4 w-full">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-secondary border-[3px] border-primary flex items-center justify-center text-primary">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <p className="text-lg text-muted mb-2">Hello, I am</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">${t}</h1>
          <p className="text-xl text-primary font-medium mb-6">${a}</p>
          <p className="text-lg text-muted mb-8 leading-relaxed">${r}</p>
          <a
            href="#projects"
            className="inline-flex items-center px-6 py-3 bg-primary text-background rounded font-medium hover:opacity-90 transition"
          >
            ${o}
          </a>
        </div>
      </div>
    </section>
  );
}
`),type:"js"}),y(T,"projects")&&C.push({name:"src/components/Projects.tsx",content:(l=(d=v(T,"projects")).title||"Featured Work",s=d.subtitle||"Some of my recent projects.",i=[{title:d.project1Title||"Project 1",desc:d.project1Desc||"Description",tag:d.project1Tag||"Design"},{title:d.project2Title||"Project 2",desc:d.project2Desc||"Description",tag:d.project2Tag||"Development"},{title:d.project3Title||"Project 3",desc:d.project3Desc||"Description",tag:d.project3Tag||"Branding"}].map((e,t)=>`        <div className="bg-background border border-muted/30 rounded overflow-hidden shadow-sm hover:-translate-y-1 transition-transform">
          <div
            className="h-48 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--tw-accent-${t%3+1}, #888) 0%, var(--tw-primary, #333) 100%)" }}
          >
            <span className="text-6xl font-bold text-white/30">0${t+1}</span>
          </div>
          <div className="p-6">
            <span className="inline-block text-xs uppercase tracking-wider text-primary bg-secondary px-3 py-1 rounded mb-3">${e.tag}</span>
            <h3 className="text-xl font-bold mb-2">${e.title}</h3>
            <p className="text-muted leading-relaxed mb-4">${e.desc}</p>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
              View Details
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>`).join("\n"),`export function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">${l}</h2>
          <p className="text-muted">${s}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
${i}
        </div>
      </div>
    </section>
  );
}
`),type:"js"}),y(T,"about")&&C.push({name:"src/components/About.tsx",content:(m=(c=v(T,"about")).title||"About Me",u=c.description||"A creator passionate about design and technology.",b=[c.skill1||"UI/UX Design",c.skill2||"Frontend Development",c.skill3||"Brand Design",c.skill4||"Product Strategy"].map(e=>`          <div className="flex items-center gap-3">
            <svg className="text-primary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>${e}</span>
          </div>`).join("\n"),`export function About() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">${m}</h2>
            <p className="text-lg text-muted leading-relaxed">${u}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">Skills</h3>
            <div className="grid grid-cols-2 gap-4">
${b}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`),type:"js"}),y(T,"contact")&&C.push({name:"src/components/Contact.tsx",content:(h=(p=v(T,"contact")).title||"Contact",g=p.description||"Interested in working together? Send me an email.",f=p.email||"hello@example.com",x=p.buttonText||"Send Email",k=(p.socialLinks||"GitHub, Twitter, LinkedIn").split(",").map(e=>e.trim()).map(e=>`          <a href="#" className="w-11 h-11 flex items-center justify-center rounded-full bg-secondary text-foreground hover:bg-primary hover:text-background transition" title="${e}">
            <span className="text-sm font-medium">${e[0]}</span>
          </a>`).join("\n"),`export function Contact() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">${h}</h2>
        <p className="text-muted mb-8">${g}</p>
        <a
          href="mailto:${f}"
          className="inline-flex items-center px-6 py-3 bg-primary text-background rounded font-medium hover:opacity-90 transition"
        >
          ${x}
        </a>
        <div className="flex justify-center gap-4 mt-8">
${k}
        </div>
      </div>
    </section>
  );
}
`),type:"js"})}else if("blog"===e.templateType){let t,a,r,o,l,s,i,n,d,c,p,g,f,x,k;C.push({name:"src/App.tsx",content:function(e){let{sections:t}=e,a=[];y(t,"hero")&&(a.push('import { BlogHero } from "./components/BlogHero";'),[].push("        <BlogHero />"));let r=y(t,"posts")||y(t,"sidebar");y(t,"posts")&&a.push('import { BlogPosts } from "./components/BlogPosts";'),y(t,"sidebar")&&a.push('import { BlogSidebar } from "./components/BlogSidebar";'),y(t,"footer")&&a.push('import { Footer } from "./components/Footer";');let o="";return y(t,"hero")&&(o+="        <BlogHero />\n"),r&&(o+='        <div className="flex gap-8 max-w-[1200px] mx-auto px-4 py-12">\n',y(t,"posts")&&(o+="          <BlogPosts />\n"),y(t,"sidebar")&&(o+="          <BlogSidebar />\n"),o+="        </div>\n"),y(t,"footer")&&(o+="        <Footer />"),`${a.join("\n")}

export default function App() {
  return (
    <main>
${o}
    </main>
  );
}
`}(e),type:"js"}),y(T,"hero")&&C.push({name:"src/components/BlogHero.tsx",content:(t=(m=v(T,"hero")).blogName||"My Blog",a=m.tagline||"Thoughts, stories, and ideas.",r=m.authorName||"Author",o=m.bio||"Writer, thinker, maker.",`export function BlogHero() {
  return (
    <section className="bg-gradient-to-b from-secondary to-background py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
          ${t}
        </h1>
        <p className="text-lg md:text-xl text-muted mb-8 leading-relaxed">
          ${a}
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="w-14 h-14 rounded-full bg-secondary border-2 border-primary flex items-center justify-center text-primary">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="text-left">
            <p className="font-semibold text-foreground">${r}</p>
            <p className="text-sm text-muted">${o}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
`),type:"js"}),y(T,"posts")&&C.push({name:"src/components/BlogPosts.tsx",content:(l=(u=v(T,"posts")).title||"Latest Posts",s=[{date:u.post1Date||"Jan 15, 2024",category:u.post1Category||"Design",title:u.post1Title||"Building Better User Interfaces",excerpt:u.post1Excerpt||"Exploring the principles of clean, functional design that users love."},{date:u.post2Date||"Jan 10, 2024",category:u.post2Category||"Development",title:u.post2Title||"Modern CSS Techniques",excerpt:u.post2Excerpt||"A deep dive into the latest CSS features and how to use them effectively."},{date:u.post3Date||"Jan 5, 2024",category:u.post3Category||"Workflow",title:u.post3Title||"Streamlining Your Dev Process",excerpt:u.post3Excerpt||"Tips and tools for a more productive development workflow."}].map(e=>`        <article className="border-b border-muted/30 pb-8 mb-8 last:border-0">
          <div className="flex items-center gap-3 mb-3">
            <time className="text-sm text-muted">${e.date}</time>
            <span className="bg-secondary text-primary text-xs font-medium px-2.5 py-0.5 rounded">${e.category}</span>
          </div>
          <h3 className="text-xl font-bold mb-2">
            <a href="#" className="text-foreground hover:text-primary transition">${e.title}</a>
          </h3>
          <p className="text-muted leading-relaxed mb-3">${e.excerpt}</p>
          <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
            Read more
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </article>`).join("\n"),`export function BlogPosts() {
  return (
    <section className="flex-1">
      <h2 className="text-2xl font-bold mb-8">${l}</h2>
${s}
    </section>
  );
}
`),type:"js"}),y(T,"sidebar")&&C.push({name:"src/components/BlogSidebar.tsx",content:(i=(b=v(T,"sidebar")).about||"A blog about design, development, and creative work.",n=b.categories||"Design, Development, Workflow, Tutorials",d=b.tags||"CSS, React, TypeScript, UI, UX, Tailwind, Node.js",c=n.split(",").map(e=>e.trim()),p=d.split(",").map(e=>e.trim()),g=c.map(e=>`            <li>
              <a href="#" className="text-muted hover:text-foreground transition">${e}</a>
            </li>`).join("\n"),f=p.map(e=>`          <a href="#" className="bg-secondary rounded-full px-3 py-1 text-sm text-foreground hover:bg-primary hover:text-background transition">${e}</a>`).join("\n"),`export function BlogSidebar() {
  return (
    <aside className="w-80 shrink-0 hidden lg:block">
      <div className="bg-secondary rounded-lg p-4 mb-6">
        <h3 className="font-bold mb-2">About</h3>
        <p className="text-sm text-muted leading-relaxed">${i}</p>
      </div>
      <div className="mb-6">
        <h3 className="font-bold mb-3">Categories</h3>
        <ul className="space-y-2">
${g}
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
${f}
        </div>
      </div>
    </aside>
  );
}
`),type:"js"}),y(T,"footer")&&C.push({name:"src/components/Footer.tsx",content:(x=(h=v(T,"footer")).copyright||"2024 My Blog. All rights reserved.",k=(h.links||"RSS, About, Contact, Privacy").split(",").map(e=>e.trim()).map(e=>`          <a href="#" className="text-sm text-muted hover:text-foreground transition">${e}</a>`).join("\n"),`export function Footer() {
  return (
    <footer className="border-t border-muted/30 py-8">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-6 flex-wrap justify-center">
${k}
        </div>
        <p className="text-sm text-muted">${x}</p>
      </div>
    </footer>
  );
}
`),type:"js"})}else if("dashboard"===e.templateType){let t,a,r,o,l,s,i,n,d;C.push({name:"src/App.tsx",content:function(e){let{sections:t}=e,a=[];y(t,"sidebar")&&a.push('import { Sidebar } from "./components/Sidebar";'),y(t,"kpi")&&a.push('import { KpiCards } from "./components/KpiCards";'),y(t,"charts")&&a.push('import { Charts } from "./components/Charts";'),y(t,"table")&&a.push('import { DataTable } from "./components/DataTable";'),y(t,"footer")&&a.push('import { Footer } from "./components/Footer";');let r="";return y(t,"kpi")&&(r+="            <KpiCards />\n"),y(t,"charts")&&(r+="            <Charts />\n"),y(t,"table")&&(r+="            <DataTable />\n"),`${a.join("\n")}

export default function App() {
  return (
    <div className="flex min-h-screen">
${y(t,"sidebar")?"      <Sidebar />\n":""}      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 space-y-6">
${r}        </div>
${y(t,"footer")?"        <Footer />\n":""}      </div>
    </div>
  );
}
`}(e),type:"js"}),y(T,"sidebar")&&C.push({name:"src/components/Sidebar.tsx",content:(t=(g=v(T,"sidebar")).appName||"Dashboard",a=(g.navItems||"Overview, Analytics, Reports, Settings").split(",").map(e=>e.trim()).map((e,t)=>`          <a
            href="#"
            className="${0===t?"flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 text-white font-medium":"flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition"}"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              ${0===t?'<rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />':1===t?'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />':2===t?'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />':'<circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />'}
            </svg>
            ${e}
          </a>`).join("\n"),`export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="px-4 py-5 border-b border-white/10">
        <h1 className="text-lg font-bold">${t}</h1>
      </div>
      <nav className="flex-1 p-3 space-y-1">
${a}
      </nav>
    </aside>
  );
}
`),type:"js"}),y(T,"kpi")&&C.push({name:"src/components/KpiCards.tsx",content:(r=[{label:(f=v(T,"kpi")).kpi1Label||"Total Revenue",value:f.kpi1Value||"$45,231",change:f.kpi1Change||"+20.1%"},{label:f.kpi2Label||"Active Users",value:f.kpi2Value||"2,350",change:f.kpi2Change||"+15.3%"},{label:f.kpi3Label||"Conversion Rate",value:f.kpi3Value||"3.2%",change:f.kpi3Change||"-2.1%"},{label:f.kpi4Label||"Avg. Order Value",value:f.kpi4Value||"$124",change:f.kpi4Change||"+8.4%"}].map(e=>`        <div className="bg-background border border-muted/30 rounded-lg p-5 shadow-sm">
          <p className="text-sm text-muted mb-1">${e.label}</p>
          <p className="text-2xl font-bold text-foreground mb-1">${e.value}</p>
          <p className="${e.change.startsWith("+")?"text-sm text-green-600":"text-sm text-red-600"}">${e.change} from last period</p>
        </div>`).join("\n"),`export function KpiCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
${r}
    </div>
  );
}
`),type:"js"}),y(T,"charts")&&C.push({name:"src/components/Charts.tsx",content:(o=v(T,"charts").title||"Analytics Overview",`export function Charts() {
  return (
    <div className="bg-background border border-muted/30 rounded-lg p-5 shadow-sm">
      <h2 className="text-lg font-bold mb-4">${o}</h2>
      <div className="bg-secondary/50 rounded-lg aspect-[2/1] flex items-center justify-center">
        <p className="text-muted font-medium">Chart Area</p>
      </div>
    </div>
  );
}
`),type:"js"}),y(T,"table")&&C.push({name:"src/components/DataTable.tsx",content:(l=(x=v(T,"table")).title||"Recent Transactions",s=(x.columns||"ID, Customer, Amount, Status, Date").split(",").map(e=>e.trim()).map(e=>`              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">${e}</th>`).join("\n"),i=[["#1001","Alice Johnson","$250.00","Completed","Jan 15, 2024"],["#1002","Bob Smith","$120.50","Pending","Jan 14, 2024"],["#1003","Carol White","$340.00","Completed","Jan 13, 2024"],["#1004","David Brown","$89.99","Failed","Jan 12, 2024"],["#1005","Eve Davis","$199.00","Completed","Jan 11, 2024"]].map((e,t)=>`            <tr className="${t%2==1?"bg-secondary/30":"bg-background"}">
${e.map(e=>`              <td className="px-4 py-3 text-sm">${e}</td>`).join("\n")}
            </tr>`).join("\n"),`export function DataTable() {
  return (
    <div className="bg-background border border-muted/30 rounded-lg shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-muted/30">
        <h2 className="text-lg font-bold">${l}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary/50">
            <tr>
${s}
            </tr>
          </thead>
          <tbody className="divide-y divide-muted/20">
${i}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`),type:"js"}),y(T,"footer")&&C.push({name:"src/components/Footer.tsx",content:(n=(k=v(T,"footer")).copyright||"2024 Dashboard App. All rights reserved.",d=k.version||"v1.0.0",`export function Footer() {
  return (
    <footer className="py-4 px-6 border-t border-muted/30">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">${n}</p>
        <p className="text-sm text-muted">${d}</p>
      </div>
    </footer>
  );
}
`),type:"js"})}return C.push({name:"README.md",content:(w=e,j=t,N=w.globalContent.siteName||"My Website",$=(j.type,`${j.style.name} (${j.style.nameEn})`),`# ${N}

Generated with [StyleKit](https://stylekit.dev) using the **${$}** style.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

\`\`\`bash
npm run build
\`\`\`

## Tech Stack

- **React** + **TypeScript**
- **Vite** for build tooling
- **Tailwind CSS** for styling

## Customization

### Colors

Edit \`tailwind.config.js\` to change theme colors:

\`\`\`js
colors: {
  primary: "${"builtin"===j.type?j.style.colors.primary:j.style.definition.colors.primary}",
  // ...
}
\`\`\`

### Components

Each section is a separate component in \`src/components/\`.

## License

This template is free to use for personal and commercial projects.

---

Made with StyleKit
`),type:"md"}),C}(H,M):(s=[],i="","landing"===H.templateType?i=h(H,M):"portfolio"===H.templateType?i=g(H,M):"blog"===H.templateType?i=f(H,M):"dashboard"===H.templateType&&(i=x(H,M)),i&&(s.push({name:"index.html",content:i,type:"html"}),s.push({name:"README.md",content:(e=H,t=M,a=e.globalContent.siteName||"My Website",r=(t.type,`${t.style.name} (${t.style.nameEn})`),l="builtin"===t.type?t.style.colors.primary:t.style.definition.colors.primary,`# ${a}

Generated with [StyleKit](https://stylekit.dev) using the **${r}** style.

## Getting Started

1. Open \`index.html\` in your browser
2. Edit the HTML to customize your content
3. Deploy to any static hosting (Vercel, Netlify, GitHub Pages, etc.)

## Style Information

- **Style**: ${r}
- **Template**: ${"landing"===e.templateType?"Landing Page":"portfolio"===e.templateType?"Portfolio":"blog"===e.templateType?"Blog":"dashboard"===e.templateType?"Dashboard":e.templateType}
- **Output Format**: HTML

## Customization

### Colors

Edit the CSS variables in the \`<style>\` section of \`index.html\`:

\`\`\`css
:root {
  --color-primary: ${l};
  /* ... */
}
\`\`\`

### Content

Edit the HTML directly to change text, images, and links.

## License

This template is free to use for personal and commercial projects.

---

Made with StyleKit
`),type:"md"})),s),d="builtin"===M.type?M.style.slug:M.style.id,c=`${D.siteName.toLowerCase().replace(/\s+/g,"-")}-${d}`;await (0,o.downloadZip)(n,c)}catch(e){console.error("Download failed:",e)}finally{c(!1)}}},[H,M,D.siteName,E]),Y=(0,a.useCallback)(()=>{switch(s){case 1:return!!u||!!N;case 2:return!!C;case 3:return!0;default:return!1}},[s,u,N,C]),X=[l("generator.step1"),l("generator.step2"),l("generator.step3")];return(0,t.jsxs)("div",{className:"max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12",children:[(0,t.jsxs)("div",{className:"mb-8 md:mb-12",children:[(0,t.jsx)("p",{className:"text-xs tracking-widest uppercase text-muted mb-2",children:l("generator.subtitle")}),(0,t.jsx)("h1",{className:"text-3xl md:text-4xl lg:text-5xl mb-4",children:l("generator.title")}),(0,t.jsx)("p",{className:"text-lg text-muted max-w-2xl",children:l("generator.description")})]}),(0,t.jsx)(j,{currentStep:s,totalSteps:3,labels:X}),(0,t.jsxs)("div",{className:"mt-8 md:mt-12",children:[1===s&&(0,t.jsx)(z,{styles:e,customStyles:p,selectedSlug:u,selectedCustomId:N,onSelect:W}),2===s&&(0,t.jsx)(L,{selectedTemplate:C,selectedFormat:E,onSelect:U,onSelectFormat:S}),3===s&&I&&(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsx)(R,{templateDef:I,sections:P,globalContent:D,onUpdateSection:O,onUpdateSectionContent:G,onUpdateGlobalContent:V,previewHtml:K}),M&&(0,t.jsx)("div",{className:"border border-border p-4 md:p-5",children:(0,t.jsxs)("div",{className:"text-sm text-muted",children:[(0,t.jsx)("p",{children:l("generator.preview")}),(0,t.jsxs)("p",{children:[M.style.name," /"," ","landing"===C?l("generator.landing"):"portfolio"===C?l("generator.portfolio"):C]})]})})]})]}),(0,t.jsxs)("div",{className:"flex justify-between mt-8 md:mt-12 pt-6 border-t border-border",children:[(0,t.jsx)("button",{onClick:()=>{s>1&&i(e=>e-1)},disabled:1===s,className:`px-6 py-3 text-sm tracking-wide transition-colors ${1===s?"text-muted cursor-not-allowed":"border border-border hover:border-foreground"}`,children:l("generator.prev")}),s<3?(0,t.jsx)("button",{onClick:()=>{Y()&&s<3&&i(e=>e+1)},disabled:!Y(),className:`px-6 py-3 text-sm tracking-wide transition-colors ${Y()?"bg-foreground text-background hover:bg-foreground/90":"bg-muted text-background cursor-not-allowed"}`,children:l("generator.next")}):(0,t.jsx)("button",{onClick:J,disabled:n||!M,className:"px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors disabled:opacity-50",children:l(n?"generator.downloading":"generator.download")})]})]})}e.s(["GeneratorWizard",()=>W],770530)}]);