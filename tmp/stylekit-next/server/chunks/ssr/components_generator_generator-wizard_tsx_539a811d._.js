module.exports=[208911,a=>{"use strict";var b=a.i(739923),c=a.i(728306),d=a.i(129457),e=a.i(211232);function f(a){let{colors:b}=a;return`
:root {
  /* Colors */
  --color-primary: ${b.primary};
  --color-secondary: ${b.secondary};
  --color-accent-1: ${b.accent[0]||b.primary};
  --color-accent-2: ${b.accent[1]||b.secondary};
  --color-accent-3: ${b.accent[2]||b.primary};
  --color-background: ${b.secondary};
  --color-foreground: ${b.primary};
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
`.trim()}function g(a){let{colors:b,typography:c,spacing:d,borders:e,shadows:f}=a;return`
:root {
  /* Colors */
  --color-primary: ${b.primary};
  --color-secondary: ${b.secondary};
  --color-accent-1: ${b.accent[0]||b.primary};
  --color-accent-2: ${b.accent[1]||b.secondary};
  --color-accent-3: ${b.accent[2]||b.primary};
  --color-background: ${b.background};
  --color-foreground: ${b.foreground};
  --color-muted: ${b.muted};

  /* Typography */
  --font-heading: ${c.headingFont};
  --font-body: ${c.bodyFont};
  --font-size-xs: ${c.fontSize.xs};
  --font-size-sm: ${c.fontSize.sm};
  --font-size-base: ${c.fontSize.base};
  --font-size-lg: ${c.fontSize.lg};
  --font-size-xl: ${c.fontSize.xl};
  --font-size-2xl: ${c.fontSize["2xl"]};
  --font-size-3xl: ${c.fontSize["3xl"]};
  --font-size-4xl: ${c.fontSize["4xl"]};

  /* Spacing */
  --spacing-unit: ${d.unit}px;
  --container-max-width: ${d.containerMaxWidth};

  /* Borders */
  --border-radius: ${e.radius};
  --border-width: ${e.width};

  /* Shadows */
  --shadow-sm: ${f.sm};
  --shadow-md: ${f.md};
  --shadow-lg: ${f.lg};
}
`.trim()}function h(){return`
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
`.trim()}function i(a){let b=a.slug;return"neo-brutalist"===b?`
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
`:"glassmorphism"===b?`
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
`:"neumorphism"===b?`
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
`:"editorial"===b?`
/* Editorial overrides */
:root {
  --font-heading: Georgia, 'Times New Roman', serif;
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

h1, h2, h3, h4 {
  font-weight: 400;
  letter-spacing: -0.02em;
}
`:""}let j={type:"landing",name:"着陆页",nameEn:"Landing Page",description:"适合产品展示、SaaS、创业公司的单页着陆页模板",sections:[{id:"hero",name:"英雄区",nameEn:"Hero",description:"页面顶部的主要展示区域",defaultEnabled:!0,fields:[{id:"headline",label:"主标题",labelEn:"Headline",type:"text",defaultValue:"构建更好的产品",placeholder:"输入吸引眼球的主标题"},{id:"subheadline",label:"副标题",labelEn:"Subheadline",type:"textarea",defaultValue:"我们帮助团队更快地将想法变为现实，用更少的资源创造更大的价值。",placeholder:"简短描述你的产品价值"},{id:"ctaText",label:"主按钮文字",labelEn:"CTA Button Text",type:"text",defaultValue:"立即开始",placeholder:"如：免费试用、了解更多"},{id:"ctaSecondaryText",label:"次按钮文字",labelEn:"Secondary Button Text",type:"text",defaultValue:"观看演示",placeholder:"如：了解更多、联系我们"}]},{id:"features",name:"功能特性",nameEn:"Features",description:"展示产品的核心功能",defaultEnabled:!0,fields:[{id:"title",label:"区块标题",labelEn:"Section Title",type:"text",defaultValue:"核心功能",placeholder:"如：为什么选择我们"},{id:"subtitle",label:"区块描述",labelEn:"Section Subtitle",type:"textarea",defaultValue:"我们提供全面的解决方案，帮助你的业务更上一层楼。",placeholder:"简短描述这个区块"},{id:"feature1Title",label:"功能1标题",labelEn:"Feature 1 Title",type:"text",defaultValue:"快速部署",placeholder:"功能名称"},{id:"feature1Desc",label:"功能1描述",labelEn:"Feature 1 Description",type:"textarea",defaultValue:"一键部署到云端，无需复杂配置，几分钟内即可上线。",placeholder:"功能详细描述"},{id:"feature2Title",label:"功能2标题",labelEn:"Feature 2 Title",type:"text",defaultValue:"安全可靠",placeholder:"功能名称"},{id:"feature2Desc",label:"功能2描述",labelEn:"Feature 2 Description",type:"textarea",defaultValue:"企业级安全标准，数据加密存储，7x24小时监控保护。",placeholder:"功能详细描述"},{id:"feature3Title",label:"功能3标题",labelEn:"Feature 3 Title",type:"text",defaultValue:"灵活扩展",placeholder:"功能名称"},{id:"feature3Desc",label:"功能3描述",labelEn:"Feature 3 Description",type:"textarea",defaultValue:"根据业务需求弹性扩容，按需付费，不浪费任何资源。",placeholder:"功能详细描述"}]},{id:"cta",name:"行动召唤",nameEn:"Call to Action",description:"促进用户转化的区域",defaultEnabled:!0,fields:[{id:"title",label:"标题",labelEn:"Title",type:"text",defaultValue:"准备好开始了吗？",placeholder:"吸引用户行动的标题"},{id:"description",label:"描述",labelEn:"Description",type:"textarea",defaultValue:"加入数千家已经在使用我们产品的企业，开启你的成功之旅。",placeholder:"鼓励用户采取行动"},{id:"buttonText",label:"按钮文字",labelEn:"Button Text",type:"text",defaultValue:"免费注册",placeholder:"如：开始使用、联系销售"}]},{id:"footer",name:"页脚",nameEn:"Footer",description:"页面底部信息",defaultEnabled:!0,fields:[{id:"copyright",label:"版权信息",labelEn:"Copyright",type:"text",defaultValue:"2024 Your Company. All rights reserved.",placeholder:"版权声明"},{id:"links",label:"链接（逗号分隔）",labelEn:"Links (comma separated)",type:"text",defaultValue:"关于我们, 服务条款, 隐私政策, 联系我们",placeholder:"如：关于, 博客, 联系"}]}]},k={type:"portfolio",name:"作品集",nameEn:"Portfolio",description:"适合设计师、开发者、自由职业者展示个人作品的模板",sections:[{id:"hero",name:"个人介绍",nameEn:"Hero",description:"页面顶部的个人介绍区域",defaultEnabled:!0,fields:[{id:"name",label:"姓名",labelEn:"Name",type:"text",defaultValue:"张三",placeholder:"输入你的名字"},{id:"title",label:"职业头衔",labelEn:"Title",type:"text",defaultValue:"全栈开发者 & UI 设计师",placeholder:"如：前端工程师、产品设计师"},{id:"bio",label:"简介",labelEn:"Bio",type:"textarea",defaultValue:"专注于创造美观、实用的数字产品。5年+ 设计与开发经验，热爱用代码和设计解决问题。",placeholder:"简短介绍自己"},{id:"ctaText",label:"按钮文字",labelEn:"CTA Button Text",type:"text",defaultValue:"查看作品",placeholder:"如：联系我、下载简历"}]},{id:"projects",name:"作品展示",nameEn:"Projects",description:"展示你的代表作品",defaultEnabled:!0,fields:[{id:"title",label:"区块标题",labelEn:"Section Title",type:"text",defaultValue:"精选作品",placeholder:"如：我的项目、作品集"},{id:"subtitle",label:"区块描述",labelEn:"Section Subtitle",type:"textarea",defaultValue:"这些是我近期完成的一些项目，涵盖网站设计、移动应用和品牌设计。",placeholder:"描述你的作品"},{id:"project1Title",label:"项目1标题",labelEn:"Project 1 Title",type:"text",defaultValue:"电商平台重设计",placeholder:"项目名称"},{id:"project1Desc",label:"项目1描述",labelEn:"Project 1 Description",type:"textarea",defaultValue:"为一家时尚电商平台进行全面的用户界面重设计，提升了30%的转化率。",placeholder:"项目详细描述"},{id:"project1Tag",label:"项目1标签",labelEn:"Project 1 Tag",type:"text",defaultValue:"UI/UX 设计",placeholder:"如：Web开发、品牌设计"},{id:"project2Title",label:"项目2标题",labelEn:"Project 2 Title",type:"text",defaultValue:"健身追踪 App",placeholder:"项目名称"},{id:"project2Desc",label:"项目2描述",labelEn:"Project 2 Description",type:"textarea",defaultValue:"从零开始设计和开发的健身追踪应用，支持运动记录、数据分析和社交功能。",placeholder:"项目详细描述"},{id:"project2Tag",label:"项目2标签",labelEn:"Project 2 Tag",type:"text",defaultValue:"移动应用",placeholder:"如：Web开发、品牌设计"},{id:"project3Title",label:"项目3标题",labelEn:"Project 3 Title",type:"text",defaultValue:"企业官网设计",placeholder:"项目名称"},{id:"project3Desc",label:"项目3描述",labelEn:"Project 3 Description",type:"textarea",defaultValue:"为科技创业公司设计的品牌官网，包含完整的视觉识别系统和响应式布局。",placeholder:"项目详细描述"},{id:"project3Tag",label:"项目3标签",labelEn:"Project 3 Tag",type:"text",defaultValue:"网站设计",placeholder:"如：Web开发、品牌设计"}]},{id:"about",name:"关于我",nameEn:"About",description:"更详细的个人介绍",defaultEnabled:!0,fields:[{id:"title",label:"区块标题",labelEn:"Section Title",type:"text",defaultValue:"关于我",placeholder:"如：个人简介"},{id:"description",label:"详细介绍",labelEn:"Description",type:"textarea",defaultValue:"我是一名热爱设计与技术的创作者。从2018年开始从事设计和开发工作，期间为多家初创公司和大型企业提供服务。我相信好的设计应该是美观与实用的完美结合。",placeholder:"详细介绍你的背景、经验和理念"},{id:"skill1",label:"技能1",labelEn:"Skill 1",type:"text",defaultValue:"UI/UX 设计",placeholder:"技能名称"},{id:"skill2",label:"技能2",labelEn:"Skill 2",type:"text",defaultValue:"前端开发",placeholder:"技能名称"},{id:"skill3",label:"技能3",labelEn:"Skill 3",type:"text",defaultValue:"品牌设计",placeholder:"技能名称"},{id:"skill4",label:"技能4",labelEn:"Skill 4",type:"text",defaultValue:"产品策略",placeholder:"技能名称"}]},{id:"contact",name:"联系方式",nameEn:"Contact",description:"让访客可以联系你",defaultEnabled:!0,fields:[{id:"title",label:"区块标题",labelEn:"Section Title",type:"text",defaultValue:"联系我",placeholder:"如：取得联系"},{id:"description",label:"描述",labelEn:"Description",type:"textarea",defaultValue:"有项目想要合作？或者只是想打个招呼？随时给我发邮件，我会尽快回复。",placeholder:"鼓励访客联系你"},{id:"email",label:"邮箱",labelEn:"Email",type:"text",defaultValue:"hello@example.com",placeholder:"你的邮箱地址"},{id:"buttonText",label:"按钮文字",labelEn:"Button Text",type:"text",defaultValue:"发送邮件",placeholder:"如：联系我、发消息"},{id:"socialLinks",label:"社交链接（逗号分隔）",labelEn:"Social Links (comma separated)",type:"text",defaultValue:"GitHub, Dribbble, LinkedIn, Twitter",placeholder:"如：GitHub, Twitter, LinkedIn"}]}]},l={type:"blog",name:"博客",nameEn:"Blog",description:"适合个人博客、技术写作、内容创作者的博客模板",sections:[{id:"hero",name:"博客头部",nameEn:"Blog Header",description:"博客顶部的标题和作者介绍区域",defaultEnabled:!0,fields:[{id:"blogName",label:"博客名称",labelEn:"Blog Name",type:"text",defaultValue:"我的博客",placeholder:"输入博客名称"},{id:"tagline",label:"标语",labelEn:"Tagline",type:"text",defaultValue:"分享技术与思考",placeholder:"输入博客标语"},{id:"authorName",label:"作者姓名",labelEn:"Author Name",type:"text",defaultValue:"作者",placeholder:"输入作者姓名"},{id:"authorBio",label:"作者简介",labelEn:"Author Bio",type:"textarea",defaultValue:"热爱技术与写作的开发者",placeholder:"简短介绍自己"}]},{id:"posts",name:"文章列表",nameEn:"Posts",description:"展示最新的博客文章",defaultEnabled:!0,fields:[{id:"sectionTitle",label:"区块标题",labelEn:"Section Title",type:"text",defaultValue:"最新文章",placeholder:"如：最新文章、近期更新"},{id:"post1Title",label:"文章1标题",labelEn:"Post 1 Title",type:"text",defaultValue:"开始使用 Next.js 构建现代 Web 应用",placeholder:"文章标题"},{id:"post1Excerpt",label:"文章1摘要",labelEn:"Post 1 Excerpt",type:"textarea",defaultValue:"Next.js 是一个强大的 React 框架，提供了服务端渲染、静态生成等特性，让构建现代 Web 应用变得更加简单高效。",placeholder:"文章摘要"},{id:"post1Date",label:"文章1日期",labelEn:"Post 1 Date",type:"text",defaultValue:"2024-01-15",placeholder:"如：2024-01-15"},{id:"post1Category",label:"文章1分类",labelEn:"Post 1 Category",type:"text",defaultValue:"前端开发",placeholder:"文章分类"},{id:"post2Title",label:"文章2标题",labelEn:"Post 2 Title",type:"text",defaultValue:"TypeScript 高级类型技巧",placeholder:"文章标题"},{id:"post2Excerpt",label:"文章2摘要",labelEn:"Post 2 Excerpt",type:"textarea",defaultValue:"深入探索 TypeScript 的高级类型系统，包括条件类型、映射类型和模板字面量类型的实际应用。",placeholder:"文章摘要"},{id:"post2Date",label:"文章2日期",labelEn:"Post 2 Date",type:"text",defaultValue:"2024-01-10",placeholder:"如：2024-01-10"},{id:"post2Category",label:"文章2分类",labelEn:"Post 2 Category",type:"text",defaultValue:"TypeScript",placeholder:"文章分类"},{id:"post3Title",label:"文章3标题",labelEn:"Post 3 Title",type:"text",defaultValue:"CSS Grid 布局完全指南",placeholder:"文章标题"},{id:"post3Excerpt",label:"文章3摘要",labelEn:"Post 3 Excerpt",type:"textarea",defaultValue:"CSS Grid 是现代 CSS 布局中最强大的工具之一，本文将带你从基础到高级全面掌握 Grid 布局。",placeholder:"文章摘要"},{id:"post3Date",label:"文章3日期",labelEn:"Post 3 Date",type:"text",defaultValue:"2024-01-05",placeholder:"如：2024-01-05"},{id:"post3Category",label:"文章3分类",labelEn:"Post 3 Category",type:"text",defaultValue:"CSS",placeholder:"文章分类"}]},{id:"sidebar",name:"侧边栏",nameEn:"Sidebar",description:"博客侧边栏，包含关于、分类和标签",defaultEnabled:!0,fields:[{id:"aboutTitle",label:"关于标题",labelEn:"About Title",type:"text",defaultValue:"关于",placeholder:"如：关于、简介"},{id:"aboutText",label:"关于内容",labelEn:"About Text",type:"textarea",defaultValue:"这是一个关于技术、设计和创造力的博客。在这里分享我的学习心得和实践经验。",placeholder:"简短介绍博客"},{id:"categories",label:"分类（逗号分隔）",labelEn:"Categories (comma separated)",type:"text",defaultValue:"前端开发, 后端技术, 设计思维, 工具推荐",placeholder:"如：前端, 后端, 设计"},{id:"tags",label:"标签（逗号分隔）",labelEn:"Tags (comma separated)",type:"text",defaultValue:"React, TypeScript, Next.js, CSS, Node.js, Design",placeholder:"如：React, Vue, CSS"}]},{id:"footer",name:"页脚",nameEn:"Footer",description:"博客底部信息",defaultEnabled:!0,fields:[{id:"copyright",label:"版权信息",labelEn:"Copyright",type:"text",defaultValue:"2024 My Blog. All rights reserved.",placeholder:"版权声明"},{id:"links",label:"链接（逗号分隔）",labelEn:"Links (comma separated)",type:"text",defaultValue:"首页, 归档, 关于, RSS",placeholder:"如：首页, 归档, 关于"}]}]},m={type:"dashboard",name:"仪表盘",nameEn:"Dashboard",description:"包含侧边栏、KPI 卡片和图表面板的数据仪表盘模板",sections:[{id:"sidebar",name:"侧边导航",nameEn:"Sidebar Navigation",description:"仪表盘左侧导航栏",defaultEnabled:!0,fields:[{id:"appName",label:"应用名称",labelEn:"App Name",type:"text",defaultValue:"Dashboard",placeholder:"输入应用名称"},{id:"navItems",label:"导航项（逗号分隔）",labelEn:"Nav Items (comma separated)",type:"text",defaultValue:"概览, 分析, 订单, 用户, 设置",placeholder:"如：概览, 分析, 订单"},{id:"activeItem",label:"当前激活项",labelEn:"Active Item",type:"text",defaultValue:"概览",placeholder:"当前激活的导航项"}]},{id:"kpi",name:"KPI 指标",nameEn:"KPI Metrics",description:"关键业务指标卡片区域",defaultEnabled:!0,fields:[{id:"sectionTitle",label:"区块标题",labelEn:"Section Title",type:"text",defaultValue:"数据概览",placeholder:"如：数据概览、关键指标"},{id:"kpi1Label",label:"指标1名称",labelEn:"KPI 1 Label",type:"text",defaultValue:"总收入",placeholder:"指标名称"},{id:"kpi1Value",label:"指标1数值",labelEn:"KPI 1 Value",type:"text",defaultValue:"$48,230",placeholder:"指标数值"},{id:"kpi1Change",label:"指标1变化",labelEn:"KPI 1 Change",type:"text",defaultValue:"+12.5%",placeholder:"如：+12.5%"},{id:"kpi2Label",label:"指标2名称",labelEn:"KPI 2 Label",type:"text",defaultValue:"用户数",placeholder:"指标名称"},{id:"kpi2Value",label:"指标2数值",labelEn:"KPI 2 Value",type:"text",defaultValue:"2,420",placeholder:"指标数值"},{id:"kpi2Change",label:"指标2变化",labelEn:"KPI 2 Change",type:"text",defaultValue:"+5.2%",placeholder:"如：+5.2%"},{id:"kpi3Label",label:"指标3名称",labelEn:"KPI 3 Label",type:"text",defaultValue:"订单量",placeholder:"指标名称"},{id:"kpi3Value",label:"指标3数值",labelEn:"KPI 3 Value",type:"text",defaultValue:"1,210",placeholder:"指标数值"},{id:"kpi3Change",label:"指标3变化",labelEn:"KPI 3 Change",type:"text",defaultValue:"-2.1%",placeholder:"如：-2.1%"},{id:"kpi4Label",label:"指标4名称",labelEn:"KPI 4 Label",type:"text",defaultValue:"转化率",placeholder:"指标名称"},{id:"kpi4Value",label:"指标4数值",labelEn:"KPI 4 Value",type:"text",defaultValue:"3.6%",placeholder:"指标数值"},{id:"kpi4Change",label:"指标4变化",labelEn:"KPI 4 Change",type:"text",defaultValue:"+0.3%",placeholder:"如：+0.3%"}]},{id:"charts",name:"图表区域",nameEn:"Charts",description:"数据可视化图表区域",defaultEnabled:!0,fields:[{id:"chartTitle",label:"图表标题",labelEn:"Chart Title",type:"text",defaultValue:"收入趋势",placeholder:"图表标题"},{id:"chartType",label:"图表类型",labelEn:"Chart Type",type:"text",defaultValue:"bar",placeholder:"如：bar, line, pie"}]},{id:"table",name:"数据表格",nameEn:"Data Table",description:"数据展示表格",defaultEnabled:!0,fields:[{id:"tableTitle",label:"表格标题",labelEn:"Table Title",type:"text",defaultValue:"最近订单",placeholder:"表格标题"},{id:"columns",label:"列名（逗号分隔）",labelEn:"Columns (comma separated)",type:"text",defaultValue:"订单号, 客户, 金额, 状态, 日期",placeholder:"如：订单号, 客户, 金额"},{id:"rowCount",label:"行数",labelEn:"Row Count",type:"text",defaultValue:"5",placeholder:"显示行数"}]},{id:"footer",name:"页脚",nameEn:"Footer",description:"仪表盘底部信息",defaultEnabled:!0,fields:[{id:"copyright",label:"版权信息",labelEn:"Copyright",type:"text",defaultValue:"2024 Dashboard. All rights reserved.",placeholder:"版权声明"},{id:"version",label:"版本号",labelEn:"Version",type:"text",defaultValue:"v1.0.0",placeholder:"如：v1.0.0"}]}]};function n(a,b){let c=a.find(a=>a.id===b);return c?.content||{}}function o(a,b){let c=a.find(a=>a.id===b);return c?.enabled??!0}function p(a,b){var c,d,e,j;let k,l,m,p,q,r,s,t,u,v,w,x,y,{sections:z,globalContent:A}=a,B="";o(z,"hero")&&(B+=(l=(c=n(z,"hero")).headline||"构建更好的产品",m=c.subheadline||"我们帮助团队更快地将想法变为现实。",p=c.ctaText||"立即开始",q=c.ctaSecondaryText||"了解更多",`
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">${l}</h1>
        <p class="hero-subtitle">${m}</p>
        <div class="hero-buttons">
          <a href="#" class="btn btn-primary">${p}</a>
          <a href="#" class="btn btn-outline">${q}</a>
        </div>
      </div>
    </div>
  </section>
`)),o(z,"features")&&(B+=(r=(d=n(z,"features")).title||"核心功能",s=d.subtitle||"我们提供全面的解决方案。",t=[{title:d.feature1Title||"快速部署",desc:d.feature1Desc||"一键部署到云端。"},{title:d.feature2Title||"安全可靠",desc:d.feature2Desc||"企业级安全标准。"},{title:d.feature3Title||"灵活扩展",desc:d.feature3Desc||"按需弹性扩容。"}].map(a=>`
      <div class="feature-card card">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h3 class="feature-title">${a.title}</h3>
        <p class="feature-desc">${a.desc}</p>
      </div>
    `).join("\n"),`
  <section class="features">
    <div class="container">
      <div class="section-header text-center">
        <h2>${r}</h2>
        <p class="text-muted">${s}</p>
      </div>
      <div class="features-grid">
        ${t}
      </div>
    </div>
  </section>
`)),o(z,"cta")&&(B+=(u=(e=n(z,"cta")).title||"准备好开始了吗？",v=e.description||"加入数千家企业，开启你的成功之旅。",w=e.buttonText||"免费注册",`
  <section class="cta">
    <div class="container">
      <div class="cta-content text-center">
        <h2>${u}</h2>
        <p class="text-muted">${v}</p>
        <a href="#" class="btn btn-primary">${w}</a>
      </div>
    </div>
  </section>
`)),o(z,"footer")&&(B+=(x=(j=n(z,"footer")).copyright||"2024 Your Company. All rights reserved.",y=(j.links||"关于我们, 服务条款, 隐私政策").split(",").map(a=>a.trim()).map(a=>`<a href="#" class="footer-link">${a}</a>`).join("\n          "),`
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-links">
          ${y}
        </div>
        <p class="footer-copyright text-muted">${x}</p>
      </div>
    </div>
  </footer>
`));let C="";"builtin"===b.type?(k=f(b.style),C=i(b.style)):k=g(b.style.definition);let D=h(),E=`
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
`,F=`${k}

${D}

${E}

${C}`;return`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${A.siteName||"My Website"}</title>
  <meta name="description" content="${A.siteDescription||""}">
  <style>
${F}
  </style>
</head>
<body>
${B}
</body>
</html>`}function q(a,b){var c,d,e,j;let k,l,m,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,{sections:E,globalContent:F}=a,G="";o(E,"hero")&&(G+=(l=(c=n(E,"hero")).name||"张三",m=c.title||"全栈开发者",p=c.bio||"专注于创造美观、实用的数字产品。",q=c.ctaText||"查看作品",`
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
        <h1 class="portfolio-name">${l}</h1>
        <p class="portfolio-title">${m}</p>
        <p class="portfolio-bio">${p}</p>
        <a href="#projects" class="btn btn-primary">${q}</a>
      </div>
    </div>
  </section>
`)),o(E,"projects")&&(G+=(r=(d=n(E,"projects")).title||"精选作品",s=d.subtitle||"这些是我近期完成的一些项目。",t=[{title:d.project1Title||"项目一",desc:d.project1Desc||"项目描述",tag:d.project1Tag||"设计"},{title:d.project2Title||"项目二",desc:d.project2Desc||"项目描述",tag:d.project2Tag||"开发"},{title:d.project3Title||"项目三",desc:d.project3Desc||"项目描述",tag:d.project3Tag||"品牌"}].map((a,b)=>`
      <div class="project-card card">
        <div class="project-image" style="background: linear-gradient(135deg, var(--color-accent-${b%3+1}) 0%, var(--color-primary) 100%);">
          <span class="project-number">0${b+1}</span>
        </div>
        <div class="project-info">
          <span class="project-tag">${a.tag}</span>
          <h3 class="project-title">${a.title}</h3>
          <p class="project-desc">${a.desc}</p>
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
        <h2>${r}</h2>
        <p class="text-muted">${s}</p>
      </div>
      <div class="projects-grid">
        ${t}
      </div>
    </div>
  </section>
`)),o(E,"about")&&(G+=(u=(e=n(E,"about")).title||"关于我",v=e.description||"我是一名热爱设计与技术的创作者。",w=[e.skill1||"UI/UX 设计",e.skill2||"前端开发",e.skill3||"品牌设计",e.skill4||"产品策略"].map(a=>`
      <div class="skill-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>${a}</span>
      </div>
    `).join("\n"),`
  <section class="about">
    <div class="container">
      <div class="about-grid">
        <div class="about-content">
          <h2>${u}</h2>
          <p class="about-description">${v}</p>
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
`)),o(E,"contact")&&(G+=(x=(j=n(E,"contact")).title||"联系我",y=j.description||"有项目想要合作？随时给我发邮件。",z=j.email||"hello@example.com",A=j.buttonText||"发送邮件",B=(j.socialLinks||"GitHub, Twitter, LinkedIn").split(",").map(a=>a.trim()),C={GitHub:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',Dribbble:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32M8.56 2.75c4.37 6 6.56 12.3 7.13 19.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>',LinkedIn:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>',Twitter:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'},D=B.map(a=>{let b=C[a]||`<span>${a[0]}</span>`;return`<a href="#" class="social-link" title="${a}">${b}</a>`}).join("\n          "),`
  <section class="contact">
    <div class="container">
      <div class="contact-content text-center">
        <h2>${x}</h2>
        <p class="text-muted">${y}</p>
        <a href="mailto:${z}" class="btn btn-primary">${A}</a>
        <div class="social-links">
          ${D}
        </div>
      </div>
    </div>
  </section>
`));let H="";"builtin"===b.type?(k=f(b.style),H=i(b.style)):k=g(b.style.definition);let I=h(),J=`
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
`,K=`${k}

${I}

${J}

${H}`;return`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${F.siteName||"My Portfolio"}</title>
  <meta name="description" content="${F.siteDescription||""}">
  <style>
${K}
  </style>
</head>
<body>
${G}
</body>
</html>`}function r(a,b){var c,d,e,j;let k,l,m,p,q,r,s,t,u,v,w,x,y,z,A,B,C,{sections:D,globalContent:E}=a,F="",G="",H="",I="";o(D,"hero")&&(l=(c=n(D,"hero")).blogName||"我的博客",m=c.tagline||"分享技术与思考",p=c.authorName||"作者",q=c.authorBio||"热爱技术与写作的开发者",F=`
  <section class="blog-hero">
    <div class="container">
      <div class="blog-hero-content">
        <h1 class="blog-name">${l}</h1>
        <p class="blog-tagline">${m}</p>
        <div class="blog-author">
          <div class="blog-author-avatar">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div class="blog-author-info">
            <span class="blog-author-name">${p}</span>
            <span class="blog-author-bio">${q}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
`),o(D,"posts")&&(r=(d=n(D,"posts")).sectionTitle||"最新文章",s=[{title:d.post1Title||"开始使用 Next.js 构建现代 Web 应用",excerpt:d.post1Excerpt||"Next.js 是一个强大的 React 框架...",date:d.post1Date||"2024-01-15",category:d.post1Category||"前端开发"},{title:d.post2Title||"TypeScript 高级类型技巧",excerpt:d.post2Excerpt||"深入探索 TypeScript 的高级类型系统...",date:d.post2Date||"2024-01-10",category:d.post2Category||"TypeScript"},{title:d.post3Title||"CSS Grid 布局完全指南",excerpt:d.post3Excerpt||"CSS Grid 是现代 CSS 布局中最强大的工具之一...",date:d.post3Date||"2024-01-05",category:d.post3Category||"CSS"}].map(a=>`
      <article class="post-card">
        <div class="post-meta">
          <time class="post-date">${a.date}</time>
          <span class="post-category">${a.category}</span>
        </div>
        <h3 class="post-title"><a href="#">${a.title}</a></h3>
        <p class="post-excerpt">${a.excerpt}</p>
        <a href="#" class="post-read-more">
          阅读全文
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </article>
    `).join("\n"),G=`
  <div class="blog-posts">
    <h2 class="blog-section-title">${r}</h2>
    ${s}
  </div>
`),o(D,"sidebar")&&(t=(e=n(D,"sidebar")).aboutTitle||"关于",u=e.aboutText||"这是一个关于技术、设计和创造力的博客。",v=e.categories||"前端开发, 后端技术, 设计思维, 工具推荐",w=e.tags||"React, TypeScript, Next.js, CSS, Node.js, Design",x=v.split(",").map(a=>a.trim()),y=w.split(",").map(a=>a.trim()),z=x.map(a=>`<li class="sidebar-category-item"><a href="#">${a}</a></li>`).join("\n            "),A=y.map(a=>`<a href="#" class="sidebar-tag">${a}</a>`).join("\n            "),H=`
  <aside class="blog-sidebar">
    <div class="sidebar-section">
      <h3 class="sidebar-title">${t}</h3>
      <p class="sidebar-about-text">${u}</p>
    </div>
    <div class="sidebar-section">
      <h3 class="sidebar-title">分类</h3>
      <ul class="sidebar-categories">
            ${z}
      </ul>
    </div>
    <div class="sidebar-section">
      <h3 class="sidebar-title">标签</h3>
      <div class="sidebar-tags">
            ${A}
      </div>
    </div>
  </aside>
`),o(D,"footer")&&(B=(j=n(D,"footer")).copyright||"2024 My Blog. All rights reserved.",C=(j.links||"首页, 归档, 关于, RSS").split(",").map(a=>a.trim()).map(a=>`<a href="#" class="footer-link">${a}</a>`).join("\n          "),I=`
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-links">
          ${C}
        </div>
        <p class="footer-copyright text-muted">${B}</p>
      </div>
    </div>
  </footer>
`);let J=G||H?`
  <div class="blog-layout">
${G}${H}  </div>
`:"",K=`${F}${J}${I}`,L="";"builtin"===b.type?(k=f(b.style),L=i(b.style)):k=g(b.style.definition);let M=h(),N=`
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
`,O=`${k}

${M}

${N}

${L}`;return`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${E.siteName||"My Blog"}</title>
  <meta name="description" content="${E.siteDescription||""}">
  <style>
${O}
  </style>
</head>
<body>
${K}
</body>
</html>`}function s(a,b){var c,d,e,j,k;let l,m,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,{sections:F,globalContent:G}=a,H="",I="",J="",K="",L="";o(F,"sidebar")&&(m=(c=n(F,"sidebar")).appName||"Dashboard",p=c.navItems||"概览, 分析, 订单, 用户, 设置",q=c.activeItem||"概览",r=p.split(",").map(a=>a.trim()).map(a=>`        <a href="#" class="dashboard-nav-item${a===q?" dashboard-nav-item--active":""}">${a}</a>`).join("\n"),H=`
    <aside class="dashboard-sidebar">
      <div class="dashboard-sidebar-header">
        <h2 class="dashboard-app-name">${m}</h2>
      </div>
      <nav class="dashboard-nav">
${r}
      </nav>
    </aside>
`),o(F,"kpi")&&(s=(d=n(F,"kpi")).sectionTitle||"数据概览",t=[{label:d.kpi1Label||"总收入",value:d.kpi1Value||"$48,230",change:d.kpi1Change||"+12.5%"},{label:d.kpi2Label||"用户数",value:d.kpi2Value||"2,420",change:d.kpi2Change||"+5.2%"},{label:d.kpi3Label||"订单量",value:d.kpi3Value||"1,210",change:d.kpi3Change||"-2.1%"},{label:d.kpi4Label||"转化率",value:d.kpi4Value||"3.6%",change:d.kpi4Change||"+0.3%"}].map(a=>{let b=a.change.startsWith("+");return`
        <div class="dashboard-kpi-card">
          <span class="dashboard-kpi-label">${a.label}</span>
          <span class="dashboard-kpi-value">${a.value}</span>
          <span class="dashboard-kpi-change ${b?"dashboard-kpi-change--positive":"dashboard-kpi-change--negative"}">${a.change}</span>
        </div>`}).join("\n"),I=`
      <section class="dashboard-kpi-section">
        <h2 class="dashboard-section-title">${s}</h2>
        <div class="dashboard-kpi-grid">
${t}
        </div>
      </section>
`),o(F,"charts")&&(u=(e=n(F,"charts")).chartTitle||"收入趋势",v=e.chartType||"bar",w=`
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
          </div>`,J=`
      <section class="dashboard-chart-section">
        <div class="dashboard-chart-area">
          <h3 class="dashboard-chart-title">${u}</h3>
          <div class="dashboard-chart-container" data-chart-type="${v}">
${w}
          </div>
        </div>
      </section>
`),o(F,"table")&&(x=(j=n(F,"table")).tableTitle||"最近订单",y=j.columns||"订单号, 客户, 金额, 状态, 日期",z=parseInt(j.rowCount||"5",10),B=(A=y.split(",").map(a=>a.trim())).map(a=>`<th class="dashboard-table-th">${a}</th>`).join("\n              "),C=[["#1001","张三","$320.00","已完成","2024-01-15"],["#1002","李四","$150.00","处理中","2024-01-14"],["#1003","王五","$480.00","已完成","2024-01-13"],["#1004","赵六","$220.00","待支付","2024-01-12"],["#1005","孙七","$560.00","已完成","2024-01-11"],["#1006","周八","$190.00","处理中","2024-01-10"],["#1007","吴九","$340.00","已完成","2024-01-09"]].slice(0,z).map(a=>{let b=A.map((b,c)=>{let d=a[c]||"-";return 3===c?`<td class="dashboard-table-td"><span class="dashboard-status ${"已完成"===d?"dashboard-status--completed":"处理中"===d?"dashboard-status--processing":"dashboard-status--pending"}">${d}</span></td>`:`<td class="dashboard-table-td">${d}</td>`}).join("\n              ");return`            <tr class="dashboard-table-row">
              ${b}
            </tr>`}).join("\n"),K=`
      <section class="dashboard-table-section">
        <h3 class="dashboard-table-title">${x}</h3>
        <div class="dashboard-table-wrapper">
          <table class="dashboard-table">
            <thead>
            <tr>
              ${B}
            </tr>
            </thead>
            <tbody>
${C}
            </tbody>
          </table>
        </div>
      </section>
`),o(F,"footer")&&(D=(k=n(F,"footer")).copyright||"2024 Dashboard. All rights reserved.",E=k.version||"v1.0.0",L=`
      <footer class="dashboard-footer">
        <span class="dashboard-footer-copyright">${D}</span>
        <span class="dashboard-footer-version">${E}</span>
      </footer>
`);let M=`${I}${J}${K}`,N=`
  <div class="dashboard-layout">
${H}    <div class="dashboard-main">
      <div class="dashboard-content">
${M}      </div>
${L}    </div>
  </div>`,O="";"builtin"===b.type?(l=f(b.style),O=i(b.style)):l=g(b.style.definition);let P=h(),Q=`
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
`,R=`${l}

${P}

${Q}

${O}`;return`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${G.siteName||"Dashboard"}</title>
  <meta name="description" content="${G.siteDescription||""}">
  <style>
${R}
  </style>
</head>
<body>
${N}
</body>
</html>`}function t(a,b){let c=a.find(a=>a.id===b);return c?.content||{}}function u(a,b){let c=a.find(a=>a.id===b);return c?.enabled??!0}function v(a){return[j,k,l,m].find(b=>b.type===a)}var w=a.i(92524);function x({currentStep:a,totalSteps:c,labels:d}){return(0,b.jsx)("div",{className:"flex items-center justify-between max-w-2xl mx-auto",children:Array.from({length:c},(a,b)=>b+1).map(e=>{let f=e===a,g=e<a;return(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsxs)("div",{className:"flex flex-col items-center",children:[(0,b.jsx)("div",{className:`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${f||g?"bg-foreground text-background":"border-2 border-border text-muted"}`,children:g?(0,b.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:(0,b.jsx)("polyline",{points:"20 6 9 17 4 12"})}):e}),(0,b.jsx)("span",{className:`mt-2 text-xs tracking-wide ${f?"text-foreground":"text-muted"}`,children:d[e-1]})]}),e<c&&(0,b.jsx)("div",{className:`w-12 md:w-24 h-0.5 mx-2 ${g?"bg-foreground":"bg-border"}`})]},e)})})}var y=a.i(815680),z=a.i(883484),A=a.i(951637),B=a.i(962196);let C=["liquid-glass","neo-brutalist","glassmorphism","editorial","warm-dashboard","minimalist-flat","swiss-poster","memphis"];function D({styles:a,customStyles:e,selectedSlug:f,selectedCustomId:g,onSelect:h}){let{t:i}=(0,d.useI18n)(),[j,k]=(0,c.useState)(""),[l,m]=(0,c.useState)("featured"),[n,o]=(0,c.useState)([]);(0,c.useEffect)(()=>{},[]);let p=(0,c.useCallback)(a=>{o(b=>[a,...b.filter(b=>b!==a)].slice(0,8))},[]),q=(0,c.useMemo)(()=>{let b=new Map(a.map(a=>[a.slug,a])),c=C.map(a=>b.get(a)).filter(a=>!!a);if(c.length>=12)return c.slice(0,12);let d=new Set(c.map(a=>a.slug)),e=a.filter(a=>!d.has(a.slug)).slice(0,12-c.length);return[...c,...e]},[a]),r=(0,c.useMemo)(()=>{let b=new Map(a.map(a=>[a.slug,a]));return n.map(a=>b.get(a)).filter(a=>!!a)},[n,a]),s=j.trim().toLowerCase(),t=(0,c.useMemo)(()=>s?a.filter(a=>[a.name,a.nameEn,a.slug,a.description,...a.keywords].join(" ").toLowerCase().includes(s)):a,[a,s]),u=(0,c.useMemo)(()=>{let b=s?t:"recent"===l?r:"all"===l?a:q;if(!f||b.some(a=>a.slug===f))return b;let c=a.find(a=>a.slug===f);return c?[c,...b]:b},[s,t,l,r,a,q,f]),v=(0,c.useCallback)(a=>{h(a,!1),p(a)},[h,p]),w=[{key:"featured",label:i("generator.viewFeatured")},{key:"recent",label:i("generator.viewRecent")},{key:"all",label:i("generator.viewAll")}];return(0,b.jsxs)("div",{children:[(0,b.jsx)("h2",{className:"text-xl md:text-2xl mb-2",children:i("generator.selectStyle")}),e.length>0&&(0,b.jsxs)("div",{className:"mb-8",children:[(0,b.jsx)("p",{className:"text-muted mb-4",children:i("generator.customStyles")}),(0,b.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6",children:[e.map(a=>{let c=a.id===g;return(0,b.jsxs)("button",{onClick:()=>h(a.id,!0),className:`group text-left border transition-all ${c?"border-foreground ring-2 ring-foreground ring-offset-2":"border-border hover:border-foreground"}`,children:[(0,b.jsxs)("div",{className:"aspect-[4/3] flex items-center justify-center relative",style:{backgroundColor:a.definition.colors.background},children:[(0,b.jsxs)("div",{className:"text-center",children:[(0,b.jsx)("div",{className:"w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center",style:{backgroundColor:a.definition.colors.primary},children:(0,b.jsx)(B.Palette,{className:"w-6 h-6",style:{color:a.definition.colors.background}})}),(0,b.jsx)("p",{className:"text-xs font-medium",style:{color:a.definition.colors.foreground},children:"Custom"})]}),c&&(0,b.jsx)("div",{className:"absolute top-2 right-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center",children:(0,b.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",children:(0,b.jsx)("polyline",{points:"20 6 9 17 4 12"})})})]}),(0,b.jsxs)("div",{className:"h-1 flex",children:[(0,b.jsx)("div",{className:"flex-1",style:{backgroundColor:a.definition.colors.primary}}),(0,b.jsx)("div",{className:"flex-1",style:{backgroundColor:a.definition.colors.secondary}}),a.definition.colors.accent.slice(0,2).map((a,c)=>(0,b.jsx)("div",{className:"flex-1",style:{backgroundColor:a}},c))]}),(0,b.jsxs)("div",{className:"p-3",children:[(0,b.jsx)("p",{className:"font-medium text-sm group-hover:text-accent transition-colors",children:a.name}),(0,b.jsx)("p",{className:"text-xs text-muted",children:a.nameEn})]})]},a.id)}),(0,b.jsxs)(y.default,{href:"/create-style",className:"group flex flex-col items-center justify-center border border-dashed border-border hover:border-foreground transition-colors aspect-[4/3] text-muted hover:text-foreground",children:[(0,b.jsx)(A.Plus,{className:"w-8 h-8 mb-2"}),(0,b.jsx)("span",{className:"text-sm",children:i("generator.createStyle")})]})]})]}),(0,b.jsxs)("p",{className:"text-muted mb-4",children:[i("generator.builtinStyles"),0===e.length&&(0,b.jsx)(y.default,{href:"/create-style",className:"ml-2 text-sm underline hover:text-foreground transition-colors",children:i("generator.createStyle")})]}),(0,b.jsxs)("div",{className:"mb-5 space-y-3",children:[(0,b.jsx)("label",{htmlFor:"generator-style-search",className:"sr-only",children:i("nav.search")}),(0,b.jsx)("input",{id:"generator-style-search",type:"text",value:j,onChange:a=>k(a.target.value),placeholder:i("generator.searchStyles"),className:"w-full md:max-w-md px-3 py-2 text-sm border border-border bg-background focus:outline-none focus:border-foreground transition-colors"}),(0,b.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[w.map(a=>(0,b.jsx)("button",{type:"button",onClick:()=>m(a.key),className:`px-3 py-1.5 text-xs tracking-wide transition-colors ${l===a.key?"bg-foreground text-background":"border border-border hover:border-foreground"}`,children:a.label},a.key)),(0,b.jsxs)("span",{className:"text-xs text-muted ml-auto",children:[u.length," ",i("generator.results")]})]}),!s&&"featured"===l&&(0,b.jsx)("p",{className:"text-xs text-muted",children:i("generator.featuredHint")})]}),(0,b.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6",role:"radiogroup","aria-label":i("generator.selectStyle"),children:0===u.length?(0,b.jsx)("div",{className:"col-span-full border border-dashed border-border p-6 text-sm text-muted text-center",children:i(s?"common.noResults":"generator.recentEmpty")}):u.map((a,c)=>{let d=a.slug===f&&!g;return(0,b.jsxs)("div",{role:"radio","aria-checked":d,tabIndex:d||!f&&0===c?0:-1,onClick:()=>v(a.slug),onKeyDown:b=>{var c;return c=a.slug,void(("Enter"===b.key||" "===b.key)&&(b.preventDefault(),v(c)))},className:`group text-left border transition-all cursor-pointer ${d?"border-foreground ring-2 ring-foreground ring-offset-2":"border-border hover:border-foreground"}`,children:[(0,b.jsxs)("div",{className:"aspect-[4/3] overflow-hidden relative",children:[(0,b.jsx)(z.StyleCoverPreview,{styleSlug:a.slug}),d&&(0,b.jsx)("div",{className:"absolute top-2 right-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center",children:(0,b.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",children:(0,b.jsx)("polyline",{points:"20 6 9 17 4 12"})})})]}),(0,b.jsxs)("div",{className:"h-1 flex",children:[(0,b.jsx)("div",{className:"flex-1",style:{backgroundColor:a.colors.primary}}),(0,b.jsx)("div",{className:"flex-1",style:{backgroundColor:a.colors.secondary}}),a.colors.accent.slice(0,2).map((a,c)=>(0,b.jsx)("div",{className:"flex-1",style:{backgroundColor:a}},c))]}),(0,b.jsxs)("div",{className:"p-3",children:[(0,b.jsx)("p",{className:"font-medium text-sm group-hover:text-accent transition-colors",children:a.name}),(0,b.jsx)("p",{className:"text-xs text-muted",children:a.nameEn})]})]},a.slug)})})]})}var E=a.i(726464),F=a.i(73875),G=a.i(568700),H=a.i(437367),I=a.i(555736),J=a.i(664255);let K=[{type:"landing",labelKey:"generator.landing",descKey:"generator.landingDesc",icon:(0,b.jsx)(E.FileText,{className:"w-6 h-6"})},{type:"portfolio",labelKey:"generator.portfolio",descKey:"generator.portfolioDesc",icon:(0,b.jsx)(F.Briefcase,{className:"w-6 h-6"})},{type:"blog",labelKey:"generator.blog",descKey:"generator.blogDesc",icon:(0,b.jsx)(G.PenLine,{className:"w-6 h-6"})},{type:"dashboard",labelKey:"generator.dashboard",descKey:"generator.dashboardDesc",icon:(0,b.jsx)(H.LayoutDashboard,{className:"w-6 h-6"})}],L=[{format:"html",labelKey:"generator.htmlFormat",descKey:"generator.htmlFormatDesc",icon:(0,b.jsx)(J.FileCode,{className:"w-5 h-5"})},{format:"react",labelKey:"generator.reactFormat",descKey:"generator.reactFormatDesc",icon:(0,b.jsx)(I.Code,{className:"w-5 h-5"})}];function M({selectedTemplate:a,selectedFormat:c,onSelect:e,onSelectFormat:f}){let{t:g}=(0,d.useI18n)();return(0,b.jsxs)("div",{children:[(0,b.jsx)("h2",{className:"text-xl md:text-2xl mb-2",children:g("generator.selectTemplate")}),(0,b.jsx)("p",{className:"text-muted mb-6",children:g("generator.selectTemplateDesc")}),(0,b.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mb-10",children:K.map(c=>{let d=c.type===a;return(0,b.jsx)("button",{onClick:()=>e(c.type),className:`group text-left p-6 border transition-all ${d?"border-foreground ring-2 ring-foreground ring-offset-2":"border-border hover:border-foreground"}`,children:(0,b.jsxs)("div",{className:"flex items-start gap-4",children:[(0,b.jsx)("div",{className:`p-3 rounded transition-colors ${d?"bg-foreground text-background":"bg-zinc-100 dark:bg-zinc-800 text-muted"}`,children:c.icon}),(0,b.jsxs)("div",{className:"flex-1",children:[(0,b.jsxs)("div",{className:"flex items-center gap-2 mb-1",children:[(0,b.jsx)("p",{className:"font-medium",children:g(c.labelKey)}),d&&(0,b.jsx)("span",{className:"text-xs px-2 py-0.5 bg-foreground text-background",children:g("generator.selected")})]}),(0,b.jsx)("p",{className:"text-sm text-muted",children:g(c.descKey)})]})]})},c.type)})}),(0,b.jsx)("h3",{className:"text-lg font-medium mb-2",children:g("generator.outputFormat")}),(0,b.jsx)("p",{className:"text-muted text-sm mb-4",children:g("generator.selectFormatDesc")}),(0,b.jsx)("div",{className:"flex flex-wrap gap-3 max-w-3xl",children:L.map(a=>{let d=a.format===c;return(0,b.jsxs)("button",{onClick:()=>f(a.format),className:`flex items-center gap-3 px-4 py-3 border transition-all ${d?"border-foreground bg-foreground text-background":"border-border hover:border-foreground"}`,children:[a.icon,(0,b.jsxs)("div",{className:"text-left",children:[(0,b.jsx)("p",{className:"font-medium text-sm",children:g(a.labelKey)}),(0,b.jsx)("p",{className:`text-xs ${d?"text-background/70":"text-muted"}`,children:g(a.descKey)})]})]},a.format)})})]})}var N=a.i(652024),O=a.i(926834);function P({templateDef:a,sections:e,globalContent:f,onUpdateSection:g,onUpdateSectionContent:h,onUpdateGlobalContent:i,previewHtml:j}){let{t:k}=(0,d.useI18n)(),[l,m]=(0,c.useState)(e[0]?.id||null),n=(0,c.useRef)(null);return(0,c.useEffect)(()=>{if(n.current&&j){let a=n.current.contentDocument;a&&(a.open(),a.write(j),a.close())}},[j]),(0,b.jsxs)("div",{children:[(0,b.jsx)("h2",{className:"text-xl md:text-2xl mb-2",children:k("generator.editContent")}),(0,b.jsxs)("p",{className:"text-muted mb-6",children:[a.name," - ",a.nameEn]}),(0,b.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8",children:[(0,b.jsxs)("div",{className:"space-y-4",children:[(0,b.jsxs)("div",{className:"border border-border p-4",children:[(0,b.jsx)("p",{className:"text-xs tracking-widest uppercase text-muted mb-3",children:k("generator.siteName")}),(0,b.jsx)("input",{type:"text",value:f.siteName,onChange:a=>i({...f,siteName:a.target.value}),className:"w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors",placeholder:k("generator.siteName")}),(0,b.jsxs)("div",{className:"mt-3",children:[(0,b.jsx)("p",{className:"text-xs tracking-widest uppercase text-muted mb-2",children:k("generator.siteDescription")}),(0,b.jsx)("input",{type:"text",value:f.siteDescription,onChange:a=>i({...f,siteDescription:a.target.value}),className:"w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors",placeholder:k("generator.siteDescription")})]})]}),e.map(c=>{let d=a.sections.find(a=>a.id===c.id);if(!d)return null;let e=l===c.id;return(0,b.jsxs)("div",{className:"border border-border",children:[(0,b.jsxs)("button",{onClick:()=>m(e?null:c.id),className:"w-full flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors",children:[(0,b.jsxs)("div",{className:"flex items-center gap-3",children:[(0,b.jsxs)("label",{className:"relative inline-flex items-center cursor-pointer",children:[(0,b.jsx)("input",{type:"checkbox",checked:c.enabled,onChange:a=>{a.stopPropagation(),g(c.id,{enabled:!c.enabled})},className:"sr-only peer"}),(0,b.jsx)("div",{className:"w-9 h-5 bg-zinc-300 dark:bg-zinc-600 peer-checked:bg-foreground rounded-full transition-colors relative",children:(0,b.jsx)("div",{className:`absolute top-0.5 w-4 h-4 bg-background rounded-full transition-transform ${c.enabled?"translate-x-4":"translate-x-0.5"}`})})]}),(0,b.jsxs)("div",{className:"text-left",children:[(0,b.jsx)("p",{className:"font-medium text-sm",children:c.name}),(0,b.jsx)("p",{className:"text-xs text-muted",children:c.nameEn})]})]}),e?(0,b.jsx)(O.ChevronUp,{className:"w-4 h-4 text-muted"}):(0,b.jsx)(N.ChevronDown,{className:"w-4 h-4 text-muted"})]}),e&&c.enabled&&(0,b.jsx)("div",{className:"border-t border-border p-4 space-y-3",children:d.fields.map(a=>(0,b.jsxs)("div",{children:[(0,b.jsx)("label",{className:"text-xs text-muted mb-1 block",children:a.label}),"textarea"===a.type?(0,b.jsx)("textarea",{value:c.content[a.id]||"",onChange:b=>h(c.id,a.id,b.target.value),placeholder:a.placeholder,rows:3,className:"w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors resize-none"}):(0,b.jsx)("input",{type:"text",value:c.content[a.id]||"",onChange:b=>h(c.id,a.id,b.target.value),placeholder:a.placeholder,className:"w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"})]},a.id))})]},c.id)})]}),(0,b.jsxs)("div",{className:"lg:sticky lg:top-24 h-fit",children:[(0,b.jsx)("p",{className:"text-xs tracking-widest uppercase text-muted mb-3",children:k("generator.preview")}),(0,b.jsx)("div",{className:"border border-border bg-white overflow-hidden",style:{height:"600px"},children:(0,b.jsx)("iframe",{ref:n,title:"Preview",className:"w-full h-full",sandbox:"allow-same-origin",style:{border:"none"}})})]})]})]})}function Q({styles:a}){let{t:f}=(0,d.useI18n)(),[g,h]=(0,c.useState)(1),[i,k]=(0,c.useState)(!1),[l,m]=(0,c.useState)([]);(0,c.useEffect)(()=>{m((0,w.getStoredStyles)())},[]);let[n,o]=(0,c.useState)(null),[y,z]=(0,c.useState)(null),[A,B]=(0,c.useState)("landing"),[C,E]=(0,c.useState)("html"),[F,G]=(0,c.useState)({siteName:"My Website",siteDescription:"Welcome to my website"}),[H,I]=(0,c.useState)(()=>j.sections.map(a=>({id:a.id,name:a.name,nameEn:a.nameEn,description:a.description,enabled:a.defaultEnabled,content:Object.fromEntries(a.fields.map(a=>[a.id,a.defaultValue]))}))),J=(0,c.useMemo)(()=>a.find(a=>a.slug===n),[a,n]),K=(0,c.useMemo)(()=>l.find(a=>a.id===y),[l,y]),L=(0,c.useMemo)(()=>y&&K?{type:"custom",style:K}:n&&J?{type:"builtin",style:J}:null,[n,J,y,K]),N=(0,c.useMemo)(()=>v(A),[A]),O=(0,c.useMemo)(()=>({styleSlug:n||y||"",templateType:A,outputFormat:C,sections:H,globalContent:F}),[n,y,A,C,H,F]),Q=(0,c.useMemo)(()=>L?"blog"===O.templateType?r(O,L):"dashboard"===O.templateType?s(O,L):"landing"===O.templateType?p(O,L):"portfolio"===O.templateType?q(O,L):"<p>Preview not available</p>":"",[O,L]),R=(0,c.useCallback)((a,b)=>{b?(z(a),o(null)):(o(a),z(null))},[]),S=(0,c.useCallback)(a=>{B(a);let b=v(a);b&&I(b.sections.map(a=>({id:a.id,name:a.name,nameEn:a.nameEn,description:a.description,enabled:a.defaultEnabled,content:Object.fromEntries(a.fields.map(a=>[a.id,a.defaultValue]))})))},[]),T=(0,c.useCallback)((a,b)=>{I(c=>c.map(c=>c.id===a?{...c,...b}:c))},[]),U=(0,c.useCallback)((a,b,c)=>{I(d=>d.map(d=>d.id===a?{...d,content:{...d.content,[b]:c}}:d))},[]),V=(0,c.useCallback)(async()=>{if(L){k(!0);try{var a,b;let c,d,f,g,h,i="react"===C?function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,v,w,x;let y,z,A=[],{sections:B,globalContent:C}=a,D=function(a){if("builtin"===a.type){let{colors:b}=a.style;return{primary:b.primary,secondary:b.secondary,"accent-1":b.accent[0]||b.primary,"accent-2":b.accent[1]||b.secondary,"accent-3":b.accent[2]||b.primary,background:b.secondary,foreground:b.primary,muted:"#6b7280"}}{let{colors:b}=a.style.definition;return{primary:b.primary,secondary:b.secondary,"accent-1":b.accent[0]||b.primary,"accent-2":b.accent[1]||b.secondary,"accent-3":b.accent[2]||b.primary,background:b.background,foreground:b.foreground,muted:b.muted}}}(b);if(A.push({name:"package.json",content:JSON.stringify({name:C.siteName.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"")||"my-site",private:!0,version:"0.0.0",type:"module",scripts:{dev:"vite",build:"vite build",preview:"vite preview"},dependencies:{react:"^18.3.1","react-dom":"^18.3.1"},devDependencies:{"@types/react":"^18.3.1","@types/react-dom":"^18.3.1","@vitejs/plugin-react":"^4.3.1",autoprefixer:"^10.4.20",postcss:"^8.4.40",tailwindcss:"^3.4.7",typescript:"^5.5.3",vite:"^5.4.0"}},null,2),type:"json"}),A.push({name:"vite.config.ts",content:`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
`,type:"js"}),A.push({name:"tsconfig.json",content:JSON.stringify({compilerOptions:{target:"ES2020",useDefineForClassFields:!0,lib:["ES2020","DOM","DOM.Iterable"],module:"ESNext",skipLibCheck:!0,moduleResolution:"bundler",allowImportingTsExtensions:!0,isolatedModules:!0,moduleDetection:"force",noEmit:!0,jsx:"react-jsx",strict:!0},include:["src"]},null,2),type:"json"}),A.push({name:"postcss.config.js",content:`export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`,type:"js"}),A.push({name:"tailwind.config.js",content:`/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "${D.primary}",
        secondary: "${D.secondary}",
        accent: {
          1: "${D["accent-1"]}",
          2: "${D["accent-2"]}",
          3: "${D["accent-3"]}",
        },
        background: "${D.background}",
        foreground: "${D.foreground}",
        muted: "${D.muted}",
      },
    },
  },
  plugins: [],
};
`,type:"js"}),A.push({name:"index.html",content:(c=C.siteName,d=C.siteDescription,`<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${d}" />
    <title>${c}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`),type:"html"}),A.push({name:"src/main.tsx",content:`import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,type:"js"}),A.push({name:"src/index.css",content:`@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-foreground;
  }
}
`,type:"css"}),"landing"===a.templateType){let b,c,d,i,j,k,l,m,n,o,p,q;A.push({name:"src/App.tsx",content:function(a){let{sections:b}=a,c=[],d=[];return u(b,"hero")&&(c.push('import { Hero } from "./components/Hero";'),d.push("      <Hero />")),u(b,"features")&&(c.push('import { Features } from "./components/Features";'),d.push("      <Features />")),u(b,"cta")&&(c.push('import { CTA } from "./components/CTA";'),d.push("      <CTA />")),u(b,"footer")&&(c.push('import { Footer } from "./components/Footer";'),d.push("      <Footer />")),`${c.join("\n")}

export default function App() {
  return (
    <main>
${d.join("\n")}
    </main>
  );
}
`}(a),type:"js"}),u(B,"hero")&&A.push({name:"src/components/Hero.tsx",content:(b=(e=t(B,"hero")).headline||"Build Better Products",c=e.subheadline||"We help teams turn ideas into reality faster.",d=e.ctaText||"Get Started",i=e.ctaSecondaryText||"Watch Demo",`export function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center bg-gradient-to-br from-secondary to-background">
      <div className="max-w-[1200px] mx-auto px-4 w-full">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            ${b}
          </h1>
          <p className="text-lg md:text-xl text-muted mb-8 leading-relaxed">
            ${c}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 bg-primary text-background rounded font-medium hover:opacity-90 transition"
            >
              ${d}
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded font-medium hover:bg-primary hover:text-background transition"
            >
              ${i}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
`),type:"js"}),u(B,"features")&&A.push({name:"src/components/Features.tsx",content:(j=(f=t(B,"features")).title||"Core Features",k=f.subtitle||"We provide comprehensive solutions.",l=[{title:f.feature1Title||"Fast Deploy",desc:f.feature1Desc||"Deploy to cloud in minutes."},{title:f.feature2Title||"Secure & Reliable",desc:f.feature2Desc||"Enterprise-grade security."},{title:f.feature3Title||"Flexible Scaling",desc:f.feature3Desc||"Scale on demand."}].map(a=>`        <div className="bg-background border border-muted/30 rounded p-6 text-center shadow-sm">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-primary text-background rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">${a.title}</h3>
          <p className="text-muted leading-relaxed">${a.desc}</p>
        </div>`).join("\n"),`export function Features() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">${j}</h2>
          <p className="text-muted">${k}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
${l}
        </div>
      </div>
    </section>
  );
}
`),type:"js"}),u(B,"cta")&&A.push({name:"src/components/CTA.tsx",content:(m=(g=t(B,"cta")).title||"Ready to get started?",n=g.description||"Join thousands of companies already using our product.",o=g.buttonText||"Sign Up Free",`export function CTA() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">${m}</h2>
        <p className="text-muted mb-8">${n}</p>
        <a
          href="#"
          className="inline-flex items-center px-6 py-3 bg-primary text-background rounded font-medium hover:opacity-90 transition"
        >
          ${o}
        </a>
      </div>
    </section>
  );
}
`),type:"js"}),u(B,"footer")&&A.push({name:"src/components/Footer.tsx",content:(p=(h=t(B,"footer")).copyright||"2024 Your Company. All rights reserved.",q=(h.links||"About, Terms, Privacy").split(",").map(a=>a.trim()).map(a=>`          <a href="#" className="text-sm text-muted hover:text-foreground transition">${a}</a>`).join("\n"),`export function Footer() {
  return (
    <footer className="py-8 border-t border-muted/30">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-6 flex-wrap justify-center">
${q}
        </div>
        <p className="text-sm text-muted">${p}</p>
      </div>
    </footer>
  );
}
`),type:"js"})}else if("portfolio"===a.templateType){let b,c,d,e,f,g,h,m,n,o,p,q,r,s,v;A.push({name:"src/App.tsx",content:function(a){let{sections:b}=a,c=[],d=[];return u(b,"hero")&&(c.push('import { Hero } from "./components/Hero";'),d.push("      <Hero />")),u(b,"projects")&&(c.push('import { Projects } from "./components/Projects";'),d.push("      <Projects />")),u(b,"about")&&(c.push('import { About } from "./components/About";'),d.push("      <About />")),u(b,"contact")&&(c.push('import { Contact } from "./components/Contact";'),d.push("      <Contact />")),`${c.join("\n")}

export default function App() {
  return (
    <main>
${d.join("\n")}
    </main>
  );
}
`}(a),type:"js"}),u(B,"hero")&&A.push({name:"src/components/Hero.tsx",content:(b=(i=t(B,"hero")).name||"Zhang San",c=i.title||"Full-Stack Developer",d=i.bio||"Focused on creating beautiful, functional digital products.",e=i.ctaText||"View Work",`export function Hero() {
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">${b}</h1>
          <p className="text-xl text-primary font-medium mb-6">${c}</p>
          <p className="text-lg text-muted mb-8 leading-relaxed">${d}</p>
          <a
            href="#projects"
            className="inline-flex items-center px-6 py-3 bg-primary text-background rounded font-medium hover:opacity-90 transition"
          >
            ${e}
          </a>
        </div>
      </div>
    </section>
  );
}
`),type:"js"}),u(B,"projects")&&A.push({name:"src/components/Projects.tsx",content:(f=(j=t(B,"projects")).title||"Featured Work",g=j.subtitle||"Some of my recent projects.",h=[{title:j.project1Title||"Project 1",desc:j.project1Desc||"Description",tag:j.project1Tag||"Design"},{title:j.project2Title||"Project 2",desc:j.project2Desc||"Description",tag:j.project2Tag||"Development"},{title:j.project3Title||"Project 3",desc:j.project3Desc||"Description",tag:j.project3Tag||"Branding"}].map((a,b)=>`        <div className="bg-background border border-muted/30 rounded overflow-hidden shadow-sm hover:-translate-y-1 transition-transform">
          <div
            className="h-48 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--tw-accent-${b%3+1}, #888) 0%, var(--tw-primary, #333) 100%)" }}
          >
            <span className="text-6xl font-bold text-white/30">0${b+1}</span>
          </div>
          <div className="p-6">
            <span className="inline-block text-xs uppercase tracking-wider text-primary bg-secondary px-3 py-1 rounded mb-3">${a.tag}</span>
            <h3 className="text-xl font-bold mb-2">${a.title}</h3>
            <p className="text-muted leading-relaxed mb-4">${a.desc}</p>
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
          <h2 className="text-3xl font-bold mb-4">${f}</h2>
          <p className="text-muted">${g}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
${h}
        </div>
      </div>
    </section>
  );
}
`),type:"js"}),u(B,"about")&&A.push({name:"src/components/About.tsx",content:(m=(k=t(B,"about")).title||"About Me",n=k.description||"A creator passionate about design and technology.",o=[k.skill1||"UI/UX Design",k.skill2||"Frontend Development",k.skill3||"Brand Design",k.skill4||"Product Strategy"].map(a=>`          <div className="flex items-center gap-3">
            <svg className="text-primary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>${a}</span>
          </div>`).join("\n"),`export function About() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">${m}</h2>
            <p className="text-lg text-muted leading-relaxed">${n}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">Skills</h3>
            <div className="grid grid-cols-2 gap-4">
${o}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`),type:"js"}),u(B,"contact")&&A.push({name:"src/components/Contact.tsx",content:(p=(l=t(B,"contact")).title||"Contact",q=l.description||"Interested in working together? Send me an email.",r=l.email||"hello@example.com",s=l.buttonText||"Send Email",v=(l.socialLinks||"GitHub, Twitter, LinkedIn").split(",").map(a=>a.trim()).map(a=>`          <a href="#" className="w-11 h-11 flex items-center justify-center rounded-full bg-secondary text-foreground hover:bg-primary hover:text-background transition" title="${a}">
            <span className="text-sm font-medium">${a[0]}</span>
          </a>`).join("\n"),`export function Contact() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">${p}</h2>
        <p className="text-muted mb-8">${q}</p>
        <a
          href="mailto:${r}"
          className="inline-flex items-center px-6 py-3 bg-primary text-background rounded font-medium hover:opacity-90 transition"
        >
          ${s}
        </a>
        <div className="flex justify-center gap-4 mt-8">
${v}
        </div>
      </div>
    </section>
  );
}
`),type:"js"})}else if("blog"===a.templateType){let b,c,d,e,f,g,h,i,j,k,l,q,r,s,v;A.push({name:"src/App.tsx",content:function(a){let{sections:b}=a,c=[];u(b,"hero")&&(c.push('import { BlogHero } from "./components/BlogHero";'),[].push("        <BlogHero />"));let d=u(b,"posts")||u(b,"sidebar");u(b,"posts")&&c.push('import { BlogPosts } from "./components/BlogPosts";'),u(b,"sidebar")&&c.push('import { BlogSidebar } from "./components/BlogSidebar";'),u(b,"footer")&&c.push('import { Footer } from "./components/Footer";');let e="";return u(b,"hero")&&(e+="        <BlogHero />\n"),d&&(e+='        <div className="flex gap-8 max-w-[1200px] mx-auto px-4 py-12">\n',u(b,"posts")&&(e+="          <BlogPosts />\n"),u(b,"sidebar")&&(e+="          <BlogSidebar />\n"),e+="        </div>\n"),u(b,"footer")&&(e+="        <Footer />"),`${c.join("\n")}

export default function App() {
  return (
    <main>
${e}
    </main>
  );
}
`}(a),type:"js"}),u(B,"hero")&&A.push({name:"src/components/BlogHero.tsx",content:(b=(m=t(B,"hero")).blogName||"My Blog",c=m.tagline||"Thoughts, stories, and ideas.",d=m.authorName||"Author",e=m.bio||"Writer, thinker, maker.",`export function BlogHero() {
  return (
    <section className="bg-gradient-to-b from-secondary to-background py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
          ${b}
        </h1>
        <p className="text-lg md:text-xl text-muted mb-8 leading-relaxed">
          ${c}
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="w-14 h-14 rounded-full bg-secondary border-2 border-primary flex items-center justify-center text-primary">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="text-left">
            <p className="font-semibold text-foreground">${d}</p>
            <p className="text-sm text-muted">${e}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
`),type:"js"}),u(B,"posts")&&A.push({name:"src/components/BlogPosts.tsx",content:(f=(n=t(B,"posts")).title||"Latest Posts",g=[{date:n.post1Date||"Jan 15, 2024",category:n.post1Category||"Design",title:n.post1Title||"Building Better User Interfaces",excerpt:n.post1Excerpt||"Exploring the principles of clean, functional design that users love."},{date:n.post2Date||"Jan 10, 2024",category:n.post2Category||"Development",title:n.post2Title||"Modern CSS Techniques",excerpt:n.post2Excerpt||"A deep dive into the latest CSS features and how to use them effectively."},{date:n.post3Date||"Jan 5, 2024",category:n.post3Category||"Workflow",title:n.post3Title||"Streamlining Your Dev Process",excerpt:n.post3Excerpt||"Tips and tools for a more productive development workflow."}].map(a=>`        <article className="border-b border-muted/30 pb-8 mb-8 last:border-0">
          <div className="flex items-center gap-3 mb-3">
            <time className="text-sm text-muted">${a.date}</time>
            <span className="bg-secondary text-primary text-xs font-medium px-2.5 py-0.5 rounded">${a.category}</span>
          </div>
          <h3 className="text-xl font-bold mb-2">
            <a href="#" className="text-foreground hover:text-primary transition">${a.title}</a>
          </h3>
          <p className="text-muted leading-relaxed mb-3">${a.excerpt}</p>
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
      <h2 className="text-2xl font-bold mb-8">${f}</h2>
${g}
    </section>
  );
}
`),type:"js"}),u(B,"sidebar")&&A.push({name:"src/components/BlogSidebar.tsx",content:(h=(o=t(B,"sidebar")).about||"A blog about design, development, and creative work.",i=o.categories||"Design, Development, Workflow, Tutorials",j=o.tags||"CSS, React, TypeScript, UI, UX, Tailwind, Node.js",k=i.split(",").map(a=>a.trim()),l=j.split(",").map(a=>a.trim()),q=k.map(a=>`            <li>
              <a href="#" className="text-muted hover:text-foreground transition">${a}</a>
            </li>`).join("\n"),r=l.map(a=>`          <a href="#" className="bg-secondary rounded-full px-3 py-1 text-sm text-foreground hover:bg-primary hover:text-background transition">${a}</a>`).join("\n"),`export function BlogSidebar() {
  return (
    <aside className="w-80 shrink-0 hidden lg:block">
      <div className="bg-secondary rounded-lg p-4 mb-6">
        <h3 className="font-bold mb-2">About</h3>
        <p className="text-sm text-muted leading-relaxed">${h}</p>
      </div>
      <div className="mb-6">
        <h3 className="font-bold mb-3">Categories</h3>
        <ul className="space-y-2">
${q}
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
${r}
        </div>
      </div>
    </aside>
  );
}
`),type:"js"}),u(B,"footer")&&A.push({name:"src/components/Footer.tsx",content:(s=(p=t(B,"footer")).copyright||"2024 My Blog. All rights reserved.",v=(p.links||"RSS, About, Contact, Privacy").split(",").map(a=>a.trim()).map(a=>`          <a href="#" className="text-sm text-muted hover:text-foreground transition">${a}</a>`).join("\n"),`export function Footer() {
  return (
    <footer className="border-t border-muted/30 py-8">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-6 flex-wrap justify-center">
${v}
        </div>
        <p className="text-sm text-muted">${s}</p>
      </div>
    </footer>
  );
}
`),type:"js"})}else if("dashboard"===a.templateType){let b,c,d,e,f,g,h,i,j;A.push({name:"src/App.tsx",content:function(a){let{sections:b}=a,c=[];u(b,"sidebar")&&c.push('import { Sidebar } from "./components/Sidebar";'),u(b,"kpi")&&c.push('import { KpiCards } from "./components/KpiCards";'),u(b,"charts")&&c.push('import { Charts } from "./components/Charts";'),u(b,"table")&&c.push('import { DataTable } from "./components/DataTable";'),u(b,"footer")&&c.push('import { Footer } from "./components/Footer";');let d="";return u(b,"kpi")&&(d+="            <KpiCards />\n"),u(b,"charts")&&(d+="            <Charts />\n"),u(b,"table")&&(d+="            <DataTable />\n"),`${c.join("\n")}

export default function App() {
  return (
    <div className="flex min-h-screen">
${u(b,"sidebar")?"      <Sidebar />\n":""}      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 space-y-6">
${d}        </div>
${u(b,"footer")?"        <Footer />\n":""}      </div>
    </div>
  );
}
`}(a),type:"js"}),u(B,"sidebar")&&A.push({name:"src/components/Sidebar.tsx",content:(b=(q=t(B,"sidebar")).appName||"Dashboard",c=(q.navItems||"Overview, Analytics, Reports, Settings").split(",").map(a=>a.trim()).map((a,b)=>`          <a
            href="#"
            className="${0===b?"flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 text-white font-medium":"flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition"}"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              ${0===b?'<rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />':1===b?'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />':2===b?'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />':'<circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />'}
            </svg>
            ${a}
          </a>`).join("\n"),`export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="px-4 py-5 border-b border-white/10">
        <h1 className="text-lg font-bold">${b}</h1>
      </div>
      <nav className="flex-1 p-3 space-y-1">
${c}
      </nav>
    </aside>
  );
}
`),type:"js"}),u(B,"kpi")&&A.push({name:"src/components/KpiCards.tsx",content:(d=[{label:(r=t(B,"kpi")).kpi1Label||"Total Revenue",value:r.kpi1Value||"$45,231",change:r.kpi1Change||"+20.1%"},{label:r.kpi2Label||"Active Users",value:r.kpi2Value||"2,350",change:r.kpi2Change||"+15.3%"},{label:r.kpi3Label||"Conversion Rate",value:r.kpi3Value||"3.2%",change:r.kpi3Change||"-2.1%"},{label:r.kpi4Label||"Avg. Order Value",value:r.kpi4Value||"$124",change:r.kpi4Change||"+8.4%"}].map(a=>`        <div className="bg-background border border-muted/30 rounded-lg p-5 shadow-sm">
          <p className="text-sm text-muted mb-1">${a.label}</p>
          <p className="text-2xl font-bold text-foreground mb-1">${a.value}</p>
          <p className="${a.change.startsWith("+")?"text-sm text-green-600":"text-sm text-red-600"}">${a.change} from last period</p>
        </div>`).join("\n"),`export function KpiCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
${d}
    </div>
  );
}
`),type:"js"}),u(B,"charts")&&A.push({name:"src/components/Charts.tsx",content:(e=t(B,"charts").title||"Analytics Overview",`export function Charts() {
  return (
    <div className="bg-background border border-muted/30 rounded-lg p-5 shadow-sm">
      <h2 className="text-lg font-bold mb-4">${e}</h2>
      <div className="bg-secondary/50 rounded-lg aspect-[2/1] flex items-center justify-center">
        <p className="text-muted font-medium">Chart Area</p>
      </div>
    </div>
  );
}
`),type:"js"}),u(B,"table")&&A.push({name:"src/components/DataTable.tsx",content:(f=(s=t(B,"table")).title||"Recent Transactions",g=(s.columns||"ID, Customer, Amount, Status, Date").split(",").map(a=>a.trim()).map(a=>`              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">${a}</th>`).join("\n"),h=[["#1001","Alice Johnson","$250.00","Completed","Jan 15, 2024"],["#1002","Bob Smith","$120.50","Pending","Jan 14, 2024"],["#1003","Carol White","$340.00","Completed","Jan 13, 2024"],["#1004","David Brown","$89.99","Failed","Jan 12, 2024"],["#1005","Eve Davis","$199.00","Completed","Jan 11, 2024"]].map((a,b)=>`            <tr className="${b%2==1?"bg-secondary/30":"bg-background"}">
${a.map(a=>`              <td className="px-4 py-3 text-sm">${a}</td>`).join("\n")}
            </tr>`).join("\n"),`export function DataTable() {
  return (
    <div className="bg-background border border-muted/30 rounded-lg shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-muted/30">
        <h2 className="text-lg font-bold">${f}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary/50">
            <tr>
${g}
            </tr>
          </thead>
          <tbody className="divide-y divide-muted/20">
${h}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`),type:"js"}),u(B,"footer")&&A.push({name:"src/components/Footer.tsx",content:(i=(v=t(B,"footer")).copyright||"2024 Dashboard App. All rights reserved.",j=v.version||"v1.0.0",`export function Footer() {
  return (
    <footer className="py-4 px-6 border-t border-muted/30">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">${i}</p>
        <p className="text-sm text-muted">${j}</p>
      </div>
    </footer>
  );
}
`),type:"js"})}return A.push({name:"README.md",content:(w=a,x=b,y=w.globalContent.siteName||"My Website",z=(x.type,`${x.style.name} (${x.style.nameEn})`),`# ${y}

Generated with [StyleKit](https://stylekit.dev) using the **${z}** style.

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
  primary: "${"builtin"===x.type?x.style.colors.primary:x.style.definition.colors.primary}",
  // ...
}
\`\`\`

### Components

Each section is a separate component in \`src/components/\`.

## License

This template is free to use for personal and commercial projects.

---

Made with StyleKit
`),type:"md"}),A}(O,L):(g=[],h="","landing"===O.templateType?h=p(O,L):"portfolio"===O.templateType?h=q(O,L):"blog"===O.templateType?h=r(O,L):"dashboard"===O.templateType&&(h=s(O,L)),h&&(g.push({name:"index.html",content:h,type:"html"}),g.push({name:"README.md",content:(a=O,b=L,c=a.globalContent.siteName||"My Website",d=(b.type,`${b.style.name} (${b.style.nameEn})`),f="builtin"===b.type?b.style.colors.primary:b.style.definition.colors.primary,`# ${c}

Generated with [StyleKit](https://stylekit.dev) using the **${d}** style.

## Getting Started

1. Open \`index.html\` in your browser
2. Edit the HTML to customize your content
3. Deploy to any static hosting (Vercel, Netlify, GitHub Pages, etc.)

## Style Information

- **Style**: ${d}
- **Template**: ${"landing"===a.templateType?"Landing Page":"portfolio"===a.templateType?"Portfolio":"blog"===a.templateType?"Blog":"dashboard"===a.templateType?"Dashboard":a.templateType}
- **Output Format**: HTML

## Customization

### Colors

Edit the CSS variables in the \`<style>\` section of \`index.html\`:

\`\`\`css
:root {
  --color-primary: ${f};
  /* ... */
}
\`\`\`

### Content

Edit the HTML directly to change text, images, and links.

## License

This template is free to use for personal and commercial projects.

---

Made with StyleKit
`),type:"md"})),g),j="builtin"===L.type?L.style.slug:L.style.id,k=`${F.siteName.toLowerCase().replace(/\s+/g,"-")}-${j}`;await (0,e.downloadZip)(i,k)}catch(a){console.error("Download failed:",a)}finally{k(!1)}}},[O,L,F.siteName,C]),W=(0,c.useCallback)(()=>{switch(g){case 1:return!!n||!!y;case 2:return!!A;case 3:return!0;default:return!1}},[g,n,y,A]),X=[f("generator.step1"),f("generator.step2"),f("generator.step3")];return(0,b.jsxs)("div",{className:"max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12",children:[(0,b.jsxs)("div",{className:"mb-8 md:mb-12",children:[(0,b.jsx)("p",{className:"text-xs tracking-widest uppercase text-muted mb-2",children:f("generator.subtitle")}),(0,b.jsx)("h1",{className:"text-3xl md:text-4xl lg:text-5xl mb-4",children:f("generator.title")}),(0,b.jsx)("p",{className:"text-lg text-muted max-w-2xl",children:f("generator.description")})]}),(0,b.jsx)(x,{currentStep:g,totalSteps:3,labels:X}),(0,b.jsxs)("div",{className:"mt-8 md:mt-12",children:[1===g&&(0,b.jsx)(D,{styles:a,customStyles:l,selectedSlug:n,selectedCustomId:y,onSelect:R}),2===g&&(0,b.jsx)(M,{selectedTemplate:A,selectedFormat:C,onSelect:S,onSelectFormat:E}),3===g&&N&&(0,b.jsxs)("div",{className:"space-y-6",children:[(0,b.jsx)(P,{templateDef:N,sections:H,globalContent:F,onUpdateSection:T,onUpdateSectionContent:U,onUpdateGlobalContent:G,previewHtml:Q}),L&&(0,b.jsx)("div",{className:"border border-border p-4 md:p-5",children:(0,b.jsxs)("div",{className:"text-sm text-muted",children:[(0,b.jsx)("p",{children:f("generator.preview")}),(0,b.jsxs)("p",{children:[L.style.name," /"," ","landing"===A?f("generator.landing"):"portfolio"===A?f("generator.portfolio"):A]})]})})]})]}),(0,b.jsxs)("div",{className:"flex justify-between mt-8 md:mt-12 pt-6 border-t border-border",children:[(0,b.jsx)("button",{onClick:()=>{g>1&&h(a=>a-1)},disabled:1===g,className:`px-6 py-3 text-sm tracking-wide transition-colors ${1===g?"text-muted cursor-not-allowed":"border border-border hover:border-foreground"}`,children:f("generator.prev")}),g<3?(0,b.jsx)("button",{onClick:()=>{W()&&g<3&&h(a=>a+1)},disabled:!W(),className:`px-6 py-3 text-sm tracking-wide transition-colors ${W()?"bg-foreground text-background hover:bg-foreground/90":"bg-muted text-background cursor-not-allowed"}`,children:f("generator.next")}):(0,b.jsx)("button",{onClick:V,disabled:i||!L,className:"px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors disabled:opacity-50",children:f(i?"generator.downloading":"generator.download")})]})]})}a.s(["GeneratorWizard",()=>Q],208911)}];

//# sourceMappingURL=components_generator_generator-wizard_tsx_539a811d._.js.map