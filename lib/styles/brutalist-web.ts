import type { DesignStyle } from "./types";

export const brutalistWeb: DesignStyle = {
  slug: "brutalist-web",
  name: "网页粗野主义",
  nameEn: "Brutalist Web",
  description:
    "回归90年代早期互联网的原始HTML美学，系统字体、蓝色下划线链接、纯白背景、无装饰，内容优先于形式。",
  descriptionEn:
    "A return to the raw HTML aesthetics of the early 90s internet, with system fonts, blue underlined links, pure white backgrounds, and zero decoration -- content over form.",
  cover: "/styles/brutalist-web.svg",
  styleType: "visual",
  tags: ["retro"],
  category: "retro",
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: ["#0000ff", "#ff0000", "#008000", "#d60099"],
  },
  keywords: [
    "brutalist",
    "raw html",
    "90s web",
    "unstyled",
    "lo-fi",
    "system fonts",
    "plain",
    "minimal",
    "content-first",
  ],
  keywordsEn: ["brutalist web design", "web brutalism", "raw html", "90s web", "unstyled html", "system fonts", "blue links", "content-first", "lo-fi", "plain text website"],

  philosophy: `Brutalist Web embraces the raw aesthetics of the early 1990s internet. Content is king; decoration is irrelevant.

Core principles:
- Content over decoration - every element serves an informational purpose
- System fonts and monospace stacks - no custom web fonts needed
- Unstyled HTML feel - as if CSS barely exists
- Intentional lo-fi appearance - the roughness is the design
- Blue underlined links, purple visited links - classic browser defaults
- Times New Roman or Georgia for headings, system sans-serif or monospace for body
- Pure white backgrounds with black text - maximum readability
- Thin 1px borders only - no thick borders, no decorative frames
- Minimal or zero padding - content touches edges
- No visual hierarchy tricks - the document structure IS the hierarchy`,

  philosophyEn: `Brutalist Web embraces the raw aesthetics of the early 1990s internet. Content is king; decoration is irrelevant.

Core principles:
- Content over decoration - every element serves an informational purpose
- System fonts and monospace stacks - no custom web fonts needed
- Unstyled HTML feel - as if CSS barely exists
- Intentional lo-fi appearance - the roughness is the design
- Blue underlined links, purple visited links - classic browser defaults
- Times New Roman or Georgia for headings, system sans-serif or monospace for body
- Pure white backgrounds with black text - maximum readability
- Thin 1px borders only - no thick borders, no decorative frames
- Minimal or zero padding - content touches edges
- No visual hierarchy tricks - the document structure IS the hierarchy`,

  doList: [
    "Use pure white (#ffffff) backgrounds for all sections",
    "Use system font stacks: font-mono or system-ui, sans-serif for body text",
    "Use Times New Roman or Georgia (font-serif) for headings",
    "Use blue (#0000ff) underlined links as the primary interactive element",
    "Use thin 1px solid borders for structural separation",
    "Use no border-radius anywhere (border-radius: 0 or rounded-none)",
    "Keep layout linear and document-like - single column preferred",
    "Use minimal spacing - tight margins and padding",
    "Let HTML structure define visual hierarchy (h1 > h2 > h3 > p)",
    "Use plain black (#000000) text on white background",
    "按钮使用 transition-none 确保零延迟状态切换",
    "输入框聚焦时用 focus:bg-[#ffffcc] 黄色高亮，模拟90年代浏览器选中感",
  ],

  doListEn: [
    "Use pure white (#ffffff) backgrounds for all sections",
    "Use system font stacks: font-mono or system-ui, sans-serif for body text",
    "Use Times New Roman or Georgia (font-serif) for headings",
    "Use blue (#0000ff) underlined links as the primary interactive element",
    "Use thin 1px solid borders for structural separation",
    "Use no border-radius anywhere (border-radius: 0 or rounded-none)",
    "Keep layout linear and document-like - single column preferred",
    "Use minimal spacing - tight margins and padding",
    "Let HTML structure define visual hierarchy (h1 > h2 > h3 > p)",
    "Use plain black (#000000) text on white background",
    "Buttons use transition-none for zero-delay state switching",
    "Input focus uses focus:bg-[#ffffcc] yellow highlight, simulating 90s browser selection feel",
  ],

  dontList: [
    "Don't use rounded corners of any kind",
    "Don't use box shadows or text shadows",
    "Don't use gradients or background images",
    "Don't use CSS animations or transitions of any kind (transition-none is the rule)",
    "Don't use hover effects beyond underline or color changes",
    "Don't use custom web fonts or icon fonts",
    "Don't use background colors other than white",
    "Don't use large padding or excessive whitespace",
    "Don't use card-based layouts with visual embellishment",
    "Don't use focus:ring — use focus:outline-dotted instead",
  ],

  dontListEn: [
    "Don't use rounded corners of any kind",
    "Don't use box shadows or text shadows",
    "Don't use gradients or background images",
    "Don't use CSS animations or transitions of any kind (transition-none is the rule)",
    "Don't use hover effects beyond underline or color changes",
    "Don't use custom web fonts or icon fonts",
    "Don't use background colors other than white",
    "Don't use large padding or excessive whitespace",
    "Don't use card-based layouts with visual embellishment",
    "Don't use focus:ring -- use focus:outline-dotted instead",
  ],

  components: {
    button: {
      name: "按钮",
      description:
        "Windows 95 系统按钮：斜面边框营造凸起感，active 时边框反转模拟按压凹陷，transition-none 零延迟",
      code: `<button className="
  px-4 py-1.5
  bg-[#dfdfdf] text-black
  font-sans text-sm
  border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080]
  rounded-none
  cursor-pointer
  hover:bg-[#e9e9e9]
  active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white
  transition-none
">
  Submit Form
</button>`,
    },
    card: {
      name: "卡片",
      description: "Brutalist Web 风格卡片 - 简单1px边框容器，无阴影无装饰",
      code: `<div className="
  bg-white
  border border-black
  p-4
  rounded-none
">
  <h3 className="font-serif text-lg font-bold mb-1">Section Title</h3>
  <p className="font-mono text-sm text-black">Plain content block with minimal styling.</p>
  <a href="#" className="text-[#0000ff] underline text-sm font-mono">Read more</a>
</div>`,
    },
    input: {
      name: "输入框",
      description:
        "内凹 Windows 95 式输入框：聚焦时黄色高亮，点状虚线焦点框",
      code: `<input
  type="text"
  placeholder="Enter text..."
  className="
    w-full px-2 py-1
    bg-white
    border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white
    rounded-none
    text-black font-mono text-sm
    focus:outline-dotted focus:outline-1 focus:outline-black focus:outline-offset-1
    focus:bg-[#ffffcc]
    transition-none
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "Brutalist Web 风格导航 - 蓝色下划线链接列表",
      code: `<nav className="
  bg-white
  border-b border-black
  px-4 py-2
  font-mono text-sm
">
  <a href="#" className="text-[#0000ff] underline mr-4 hover:text-[#ff0000]">Home</a>
  <a href="#" className="text-[#0000ff] underline mr-4 hover:text-[#ff0000]">About</a>
  <a href="#" className="text-[#0000ff] underline mr-4 hover:text-[#ff0000]">Archive</a>
  <a href="#" className="text-[#0000ff] underline hover:text-[#ff0000]">Links</a>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Brutalist Web 风格 Hero - 纯白背景、大号衬线标题、朴素文本",
      code: `<section className="
  bg-white
  border-b border-black
  py-8 px-4
">
  <h1 className="
    text-3xl md:text-5xl
    font-serif font-bold
    text-black
    mb-2
  ">
    Welcome to My Website
  </h1>
  <p className="font-mono text-sm text-black max-w-xl">
    This is a website. It contains information. No more, no less.
  </p>
  <hr className="border-black mt-4" />
</section>`,
    },
    footer: {
      name: "页脚",
      description: "Brutalist Web 风格页脚 - 白底黑字、简单分隔线",
      code: `<footer className="
  bg-white text-black
  border-t border-black
  px-4 py-4
  font-mono text-xs
">
  <p>Last updated: 2026-01-01 | <a href="#" className="text-[#0000ff] underline">Webmaster</a></p>
</footer>`,
    },
  },

  globalCss: `/* Brutalist Web Global Styles */

:root {
  --bw-black: #000000;
  --bw-white: #ffffff;
  --bw-link: #0000ff;
  --bw-visited: #551a8b;
  --bw-red: #ff0000;
  --bw-green: #008000;
  --bw-gray: #808080;
  --bw-silver: #dfdfdf;
}

/* System font stack */
body {
  font-family: monospace, "Courier New", Courier, monospace;
  background: var(--bw-white);
  color: var(--bw-black);
  line-height: 1.4;
}

/* Headings use serif */
h1, h2, h3, h4, h5, h6 {
  font-family: "Times New Roman", Times, Georgia, serif;
  font-weight: bold;
}

/* Classic link styles */
a {
  color: var(--bw-link);
  text-decoration: underline;
}

a:visited {
  color: var(--bw-visited);
}

a:hover {
  color: var(--bw-red);
}

/* Thin borders only */
hr {
  border: none;
  border-top: 1px solid var(--bw-black);
}

/* Remove all border-radius */
*, *::before, *::after {
  border-radius: 0 !important;
}

/* Plain table styles */
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid var(--bw-black);
  padding: 4px 8px;
  text-align: left;
  font-family: monospace;
}

/* Windows 95 raised button */
.bw-btn {
  background: var(--bw-silver);
  border-width: 2px;
  border-style: solid;
  border-color: white var(--bw-gray) var(--bw-gray) white;
  cursor: pointer;
}

/* Windows 95 pressed button */
.bw-btn:active {
  border-color: var(--bw-gray) white white var(--bw-gray);
}

/* Inset input field (Windows 95 style) */
.bw-input {
  border-width: 2px;
  border-style: solid;
  border-color: var(--bw-gray) white white var(--bw-gray);
  background: var(--bw-white);
}

.bw-input:focus {
  outline: 1px dotted var(--bw-black);
  outline-offset: 1px;
  background: #ffffcc;
}
@keyframes brutalist-web-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes brutalist-web-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.brutalist-web-gradient {
  background: linear-gradient(135deg, #000000, #0000ff);
}

.brutalist-web-gradient-text {
  background: linear-gradient(135deg, #000000, #0000ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brutalist-web-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(0, 0, 0, 0.08);
}

.brutalist-web-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.brutalist-web-animate-in {
  animation: brutalist-web-fade-in 0.5s ease-out both;
}`,

  aiRules: `你是一位 Brutalist Web（网页粗野主义）风格的前端开发专家。所有生成的代码都必须还原 1990 年代早期互联网 HTML 页面那种原始、未加样式的质感。

## 绝对禁止

- 任何形式的圆角（rounded-sm、rounded-md、rounded-lg、rounded-xl、rounded-full）
- 任何形式的 box shadow 或 text shadow
- 任何形式的渐变（背景必须是纯白色）
- CSS 动画、过渡或变形 — 所有地方都使用 transition-none
- 除下划线或颜色变化之外的 hover 效果
- 自定义网络字体或图标字体（只用系统字体）
- 除白色或 #dfdfdf（系统银灰）以外的背景色
- 粗边框（斜面效果最多 2px，其余 1px）
- 让人感觉"经过设计"的大内边距或大间距
- 带装饰点缀的卡片式布局
- focus:ring-*（应改用 focus:outline-dotted）

## 必须遵守

- 背景：所有位置都是纯白（#ffffff），系统 UI 元素用 #dfdfdf
- 文字：只用黑色（#000000），不使用灰阶
- 链接：蓝色（#0000ff）下划线，访问过的链接为紫色（#551a8b），hover 为红色（#ff0000）
- 边框：内容区用 1px 实心黑色；按钮用 2px 斜面（border-t-white border-l-white border-r-[#808080] border-b-[#808080]）
- 圆角：始终为 0，绝不圆化任何元素
- 标题：Times New Roman 或 Georgia（font-serif），加粗
- 正文：系统等宽字体或无衬线字体栈
- 布局：线性文档流，优先单栏
- 间距：极简 - 紧凑的外边距，小内边距（px-2 py-1、px-4 py-2）
- 层级：依赖 HTML 标题级别（h1-h6），而非视觉技巧
- 交互元素：Windows 95 风格斜面按钮

## 动效与交互规则

- 零过渡：所有状态变化都必须是瞬时的。每个可交互元素都要加上 transition-none。hover、active、focus 状态切换都发生在 0ms — 这正是粗野主义的物理法则。
- 原生按钮斜面：按钮使用 Windows 95 式凸起边框错觉：border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080]。:active 时反转斜面：active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white。没有阴影、没有缩放、没有位移 — 纯粹的边框反转。
- 原始 focus：绝不使用 focus:ring。使用 focus:outline-dotted focus:outline-1 focus:outline-black focus:outline-offset-1。输入框需加上 focus:bg-[#ffffcc]，模拟 90 年代黄色文本选中高亮。
- 链接 hover：只有颜色变化（蓝色 → 红色）和原有的下划线，没有其他效果。

## 配色方案

- 纯黑：#000000（所有文字、边框）
- 纯白：#ffffff（所有背景）
- 系统银灰：#dfdfdf（按钮背景）
- 系统灰：#808080（边框暗侧）
- 链接蓝：#0000ff（超链接）
- 已访问紫：#551a8b（访问过的链接）
- 红色：#ff0000（hover 状态、错误提示）
- 绿色：#008000（成功提示、次强调色）
- 黄色：#ffffcc（focus 高亮）

## 视觉参照

可以参照：早期的 Craigslist、学术个人主页、W3C 规范页面，以及几乎不加 CSS 的朴素 HTML。页面看起来应该像是用记事本写的、再通过 FTP 上传的。`,

  aiRulesEn: `You are a Brutalist Web style frontend development expert. All generated code must recreate the raw, unstyled feel of 1990s early internet HTML pages.

## Absolutely Forbidden

- Rounded corners of any kind (rounded-sm, rounded-md, rounded-lg, rounded-xl, rounded-full)
- Box shadows or text shadows of any kind
- Gradients of any kind (backgrounds must be flat white)
- CSS animations, transitions, or transforms -- use transition-none everywhere
- Hover effects beyond underline or color changes
- Custom web fonts or icon fonts (system fonts only)
- Background colors other than white or #dfdfdf (system silver)
- Thick borders (max 2px for bevel effect, else 1px)
- Large padding or spacing that feels "designed"
- Card-style layouts with decorative embellishment
- focus:ring-* (use focus:outline-dotted instead)

## Must Follow

- Backgrounds: Pure white (#ffffff) everywhere, #dfdfdf for system UI elements
- Text: Black (#000000) only, no gray shades
- Links: Blue (#0000ff) underlined, visited links purple (#551a8b), hover red (#ff0000)
- Borders: 1px solid black for content; 2px bevel (border-t-white border-l-white border-r-[#808080] border-b-[#808080]) for buttons
- Border-radius: ALWAYS 0, never round anything
- Headings: Times New Roman or Georgia (font-serif), bold
- Body text: System monospace or sans-serif font stack
- Layout: Linear, document-flow, single-column preferred
- Spacing: Minimal - tight margins, small padding (px-2 py-1, px-4 py-2)
- Hierarchy: Rely on HTML heading levels (h1-h6) not visual tricks
- Interactive elements: Windows 95-style bevel buttons

## Animation & Interaction Rules

- Zero Transition: ALL state changes must be instant. Always add transition-none to every interactive element. Hover, active, focus state switches happen at 0ms -- this IS the brutalist physics.
- Native Button Bevel: Buttons use the Windows 95 raised border illusion: border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080]. On :active, reverse the bevel: active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white. No shadow, no scale, no translate -- pure border reversal.
- Raw Focus: Never use focus:ring. Use focus:outline-dotted focus:outline-1 focus:outline-black focus:outline-offset-1. For inputs, add focus:bg-[#ffffcc] to simulate the 90s yellow text selection highlight.
- Link Hover: Only color change (blue to red) and existing underline. No other effects.

## Color Palette

- Pure Black: #000000 (all text, borders)
- Pure White: #ffffff (all backgrounds)
- System Silver: #dfdfdf (button backgrounds)
- System Gray: #808080 (border shadow side)
- Link Blue: #0000ff (hyperlinks)
- Visited Purple: #551a8b (visited links)
- Red: #ff0000 (hover state, errors)
- Green: #008000 (success, secondary accent)
- Yellow: #ffffcc (focus highlight)

## Visual References

Think of: early Craigslist, academic personal homepages, W3C specification pages, plain HTML with minimal CSS. The page should look like it was made in Notepad and uploaded via FTP.`,

  examplePrompts: [
    {
      title: "90年代个人主页",
      titleEn: "90s Personal Homepage",
      description: "纯白背景、蓝色下划线链接的朴素个人主页",
      descriptionEn:
        "Plain personal homepage with white background and blue underlined links",
      prompt: `Use Brutalist Web style to create a personal homepage:
1. White background, no decoration
2. Large serif heading with the person's name
3. Horizontal rule separator
4. Monospace body text with a brief bio
5. Blue underlined links section: "My Projects", "My Blog", "Contact"
6. Simple 1px border table listing recent updates with dates
7. Footer with "Last updated" date and webmaster email link
8. No shadows, no rounded corners, no gradients, no animations
9. Buttons: Windows 95 bevel border style, transition-none
10. Inputs: inset bevel border, focus:bg-[#ffffcc] yellow highlight`,
    },
    {
      title: "学术论文索引",
      titleEn: "Academic Paper Index",
      description: "类似早期学术网站的纯文本论文列表页",
      descriptionEn:
        "Plain text paper listing page resembling early academic websites",
      prompt: `Use Brutalist Web style to create an academic paper index:
1. Serif heading: "Publications"
2. Numbered list of papers with titles as blue underlined links
3. Author names in monospace, dates in plain text
4. Thin 1px horizontal rules between sections
5. Navigation at top: simple blue links separated by " | "
6. No cards, no shadows, no visual decoration
7. Dense text layout with minimal spacing`,
    },
    {
      title: "极简博客",
      titleEn: "Minimalist Blog",
      description: "回归互联网本质的纯内容博客",
      descriptionEn:
        "Content-pure blog returning to the essence of the internet",
      prompt: `Use Brutalist Web style to create a minimalist blog:
1. Site title in large serif font at the top
2. Navigation as plain blue underlined links below title
3. Blog posts listed with serif titles, monospace dates, plain text excerpts
4. "Read more" as a simple blue underlined link
5. 1px black border separating posts
6. Sidebar (if any) is just a list of links
7. Footer: plain text copyright and a link to RSS feed
8. Maximum readability, zero decoration`,
    },
  ],

  variants: [
    {
      id: "brutalist-web-warm",
      name: "网页粗野主义暖色版",
      nameEn: "Brutalist Web Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        accent: ["#7900e8", "#c91a00", "#00843a"],
      },
    },
    {
      id: "brutalist-web-cool",
      name: "网页粗野主义冷色版",
      nameEn: "Brutalist Web Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#000000",
        secondary: "#e6e6e6",
        accent: ["#0027d6", "#ff006c", "#3a7200"],
      },
    },
  ],
};
