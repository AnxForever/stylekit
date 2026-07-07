import type { DesignStyle } from "./types";

export const developerTerminal: DesignStyle = {
  slug: "developer-terminal",
  name: "终端风",
  nameEn: "Developer Terminal",
  description:
    "把网站做成一场终端会话：荧光绿 mono 文字、prompt 前缀、命令与输出的成对结构、tmux 状态栏，用工具的真实感表达开发者身份。",
  descriptionEn:
    "Turn a website into a terminal session: phosphor-green mono text, prompt prefixes, paired command-and-output blocks, and a tmux status bar. Tool authenticity as developer identity.",
  cover: "/styles/developer-terminal.svg",
  styleType: "visual",
  tags: ["high-contrast"],
  category: "modern",
  colors: {
    primary: "#4AF626",
    secondary: "#0A0E12",
    accent: ["#8BE9FD", "#FF79C6", "#FFB86C", "#6272A4"],
  },
  keywords: ["终端", "命令行", "CLI", "开发者", "黑客", "等宽字体", "shell", "tmux", "terminal", "monospace", "developer"],
  keywordsEn: ["terminal", "CLI", "command line", "developer", "hacker", "monospace", "shell", "tmux", "prompt", "console"],

  philosophy: `Developer Terminal 不是在模仿终端的样子，而是在借用终端的语言。对开发者来说，终端是每天生活的地方——最诚实、最高效、零装饰的工具。把个人网站做成一场终端会话，等于宣告：我的身份不需要营销页面来证明，工具本身就是我的名片。

核心理念：
- 内容即输出：每一段内容都是某条命令的执行结果。访客不是在"浏览页面"，而是在"读取会话"——标题是 prompt，正文是 stdout，错误提示是 stderr
- 工具的真实感：真实的终端没有渐变、没有阴影、没有摄影图。它只有等宽字符、光标和颜色语义。这种克制不是贫乏，而是专业性本身
- 颜色即语法高亮：荧光绿是主体输出，青色是路径与链接，品红是关键字与错误，琥珀是字符串与警告，蓝灰是注释。颜色不做装饰，只做语义
- 会话感：闪烁的光标暗示"会话仍在进行"，tmux 状态栏暗示"系统仍在运行"。页面不是静态文档，而是一个活着的进程

这种风格适用于开发者个人主页、技术博客、CLI 工具官网、API 文档、黑客马拉松页面，以及任何想向技术受众传递"我们说同一种语言"的产品。

终端美学的悖论在于：它看起来最"不设计"，却要求最严格的设计纪律——一旦出现一个 sans-serif 字符或一块渐变，整个幻觉就崩塌了。`,

  philosophyEn: `Developer Terminal does not imitate how a terminal looks; it borrows how a terminal speaks. For developers, the terminal is home -- the most honest, efficient, decoration-free tool they own. Building a personal site as a terminal session is a statement: my identity needs no marketing page, the tool itself is my business card.

Core concepts:
- Content as output: every block of content is the result of a command. Visitors are not "browsing a page", they are "reading a session" -- headings are prompts, body copy is stdout, errors are stderr
- Tool authenticity: a real terminal has no gradients, no shadows, no photography. Only monospace glyphs, a cursor, and color semantics. This restraint is not poverty -- it is professionalism itself
- Color as syntax highlighting: phosphor green for primary output, cyan for paths and links, magenta for keywords and errors, amber for strings and warnings, blue-gray for comments. Color never decorates, it only means
- Session liveness: a blinking cursor implies the session is still open; a tmux status bar implies the system is still running. The page is not a static document, it is a living process

The paradox of terminal aesthetics: it looks the least "designed", yet demands the strictest design discipline -- a single sans-serif glyph or gradient block shatters the whole illusion.`,

  doList: [
    "全站使用等宽字体 font-mono，无一例外",
    "近黑背景 bg-[#0A0E12] 搭配荧光绿主文字 text-[#4AF626]",
    "章节标题用 prompt 前缀开头：visitor@stylekit:~$ 命令名",
    "标题或输入位使用闪烁光标块 w-2 h-4 bg-[#4AF626]",
    "内容组织为命令 + 输出的成对结构，注释行用 # 开头并使用 text-[#6272A4]",
    "列表使用 ls -la 式对齐输出，数据表使用 ps aux 式表头",
    "状态用 exit code 徽标表达：[0] OK 绿色 / [1] ERR 品红",
    "面板使用 border border-[#1F2937] rounded-sm，底部放 tmux 式状态栏",
    "分隔使用 ASCII 线（──────）而非装饰性 divider",
  ],

  doListEn: [
    "Use font-mono everywhere, no exceptions",
    "Near-black bg-[#0A0E12] with phosphor green text-[#4AF626] as primary text",
    "Start section headings with a prompt prefix: visitor@stylekit:~$ command",
    "Use a blinking cursor block w-2 h-4 bg-[#4AF626] on headings or inputs",
    "Structure content as command + output pairs; comment lines start with # in text-[#6272A4]",
    "Render lists as ls -la aligned output and tables with ps aux style headers",
    "Express status with exit code badges: [0] OK in green / [1] ERR in magenta",
    "Panels use border border-[#1F2937] rounded-sm; end pages with a tmux status bar",
    "Separate sections with ASCII rules (------) instead of decorative dividers",
  ],

  dontList: [
    "禁止任何 sans-serif 或衬线字体（font-sans、font-serif）",
    "禁止白色或浅色背景（bg-white、bg-gray-50）",
    "禁止 rounded-lg 及以上的大圆角（终端窗口只有 rounded-sm 以内）",
    "禁止渐变（bg-gradient-*）与玻璃拟态（backdrop-blur）",
    "禁止摄影图像与插画装饰（终端里只有字符）",
    "禁止超过 4 种终端强调色（青/品红/琥珀/蓝灰之外不再加色）",
    "禁止厚阴影 shadow-md 及以上（终端是平面的）",
  ],

  dontListEn: [
    "Never use sans-serif or serif fonts (font-sans, font-serif)",
    "Never use white or light backgrounds (bg-white, bg-gray-50)",
    "Never use rounded-lg or larger radii (terminal chrome stays within rounded-sm)",
    "Never use gradients (bg-gradient-*) or glassmorphism (backdrop-blur)",
    "Never use photography or illustration (a terminal only has glyphs)",
    "Never exceed 4 terminal accent colors (cyan/magenta/amber/blue-gray only)",
    "Never use heavy shadows shadow-md or above (terminals are flat)",
  ],

  components: {
    button: {
      name: "命令按钮",
      description: "按钮即命令：主操作是反色的可执行命令，次操作是普通命令行",
      code: `<div className="flex flex-wrap items-center gap-3 font-mono text-sm">
  <button className="px-4 py-1.5 bg-[#4AF626] text-[#0A0E12] font-bold rounded-sm hover:bg-[#3FD41F] active:translate-y-px transition-colors duration-150">
    ./deploy --prod
  </button>
  <button className="px-4 py-1.5 bg-transparent text-[#4AF626] border border-[#1F2937] rounded-sm hover:border-[#4AF626]/60 hover:bg-[#4AF626]/10 transition-colors duration-150">
    make build
  </button>
  <button className="px-4 py-1.5 bg-transparent text-[#FF79C6] border border-[#FF79C6]/40 rounded-sm hover:bg-[#FF79C6]/10 transition-colors duration-150">
    rm -rf ./cache
  </button>
</div>`,
    },
    card: {
      name: "输出面板",
      description: "卡片即命令输出：prompt 行 + stdout 块 + exit code 徽标",
      code: `<div className="bg-[#0D141B] border border-[#1F2937] rounded-sm font-mono text-sm overflow-hidden">
  <div className="flex items-center justify-between px-4 py-2 border-b border-[#1F2937]">
    <p className="text-[#4AF626]"><span className="text-[#8BE9FD]">visitor@stylekit</span><span className="text-[#6272A4]">:~$</span> whoami --verbose</p>
    <span className="text-xs text-[#4AF626] border border-[#4AF626]/40 rounded-sm px-1.5 py-0.5">[0] OK</span>
  </div>
  <div className="px-4 py-3 space-y-1">
    <p className="text-[#6272A4]"># identity loaded from ~/.profile</p>
    <p className="text-[#4AF626]">name: <span className="text-[#FFB86C]">&quot;Full-stack Developer&quot;</span></p>
    <p className="text-[#4AF626]">stack: <span className="text-[#8BE9FD]">[typescript, react, node]</span></p>
    <p className="text-[#4AF626]">uptime: <span className="text-[#FFB86C]">8 years</span></p>
  </div>
</div>`,
    },
    input: {
      name: "Prompt 输入行",
      description: "输入框即 prompt 行：前缀 + 无边框输入 + 绿色光标",
      code: `<div className="flex items-center gap-2 bg-[#0A0E12] border border-[#1F2937] rounded-sm px-4 py-2.5 font-mono text-sm focus-within:border-[#4AF626]/60 transition-colors duration-150">
  <span className="shrink-0"><span className="text-[#8BE9FD]">visitor@stylekit</span><span className="text-[#6272A4]">:~$</span></span>
  <input type="text" placeholder="type a command..." className="flex-1 bg-transparent text-[#4AF626] placeholder:text-[#6272A4] caret-[#4AF626] focus:outline-none" />
  <span className="w-2 h-4 bg-[#4AF626] animate-pulse" />
</div>`,
    },
    nav: {
      name: "会话标签栏",
      description: "导航即 tmux 窗口列表：编号 + 名称，当前窗口反色",
      code: `<nav className="flex items-center gap-px bg-[#0D141B] border border-[#1F2937] rounded-sm p-1 font-mono text-xs">
  <span className="px-2 py-1 text-[#6272A4] select-none">[stylekit]</span>
  <button className="px-3 py-1 bg-[#4AF626] text-[#0A0E12] font-bold rounded-sm">0:home*</button>
  <button className="px-3 py-1 text-[#4AF626] hover:bg-[#4AF626]/10 rounded-sm transition-colors duration-150">1:projects</button>
  <button className="px-3 py-1 text-[#4AF626] hover:bg-[#4AF626]/10 rounded-sm transition-colors duration-150">2:blog</button>
  <button className="px-3 py-1 text-[#4AF626] hover:bg-[#4AF626]/10 rounded-sm transition-colors duration-150">3:contact</button>
</nav>`,
    },
    hero: {
      name: "启动序列 Hero",
      description: "Hero 即 boot sequence：登录信息、[ OK ] 检查项、motd 与闪烁光标",
      code: `<section className="bg-[#0A0E12] border border-[#1F2937] rounded-sm p-6 font-mono text-sm space-y-1.5">
  <p className="text-[#6272A4]">Last login: Fri Jul 5 09:41:07 on ttys001</p>
  <p className="text-[#4AF626]"><span className="text-[#8BE9FD]">[ OK ]</span> mounted /dev/portfolio</p>
  <p className="text-[#4AF626]"><span className="text-[#8BE9FD]">[ OK ]</span> loaded 12 projects, 34 posts</p>
  <p className="text-[#4AF626]"><span className="text-[#FFB86C]">[WARN]</span> coffee level at 12%</p>
  <p className="text-[#6272A4] pt-2"># Welcome to my corner of the internet.</p>
  <h1 className="text-2xl md:text-4xl font-bold text-[#4AF626] pt-1">
    STYLEKIT TERMINAL v1.0
  </h1>
  <p className="text-[#4AF626] pt-2">
    <span className="text-[#8BE9FD]">visitor@stylekit</span><span className="text-[#6272A4]">:~$</span> start_session
    <span className="inline-block w-2 h-4 bg-[#4AF626] animate-pulse align-middle ml-1" />
  </p>
</section>`,
    },
    footer: {
      name: "tmux 状态栏",
      description: "页脚即 tmux status bar：会话名、窗口列表、时间与主机名",
      code: `<footer className="flex items-center justify-between bg-[#0D141B] border-t border-[#1F2937] px-3 py-1.5 font-mono text-xs">
  <div className="flex items-center gap-2">
    <span className="bg-[#4AF626] text-[#0A0E12] font-bold px-1.5 py-0.5 rounded-sm">[stylekit]</span>
    <span className="text-[#4AF626]">0:home*</span>
    <span className="text-[#6272A4]">1:projects</span>
    <span className="text-[#6272A4]">2:blog</span>
  </div>
  <div className="flex items-center gap-3">
    <span className="text-[#FFB86C]">load: 0.42</span>
    <span className="text-[#8BE9FD]">09:41</span>
    <span className="bg-[#1F2937] text-[#4AF626] px-1.5 py-0.5 rounded-sm">visitor@stylekit</span>
  </div>
</footer>`,
    },
  },

  globalCss: `@keyframes developer-terminal-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.developer-terminal-cursor {
  display: inline-block;
  width: 0.55em;
  height: 1.1em;
  background: #4af626;
  vertical-align: text-bottom;
  animation: developer-terminal-blink 1.06s steps(1, end) infinite;
}

.developer-terminal-prompt::before {
  content: "visitor@stylekit:~$ ";
  color: #8be9fd;
}

.developer-terminal-glow {
  text-shadow: 0 0 8px rgba(74, 246, 38, 0.35);
}

/* Optional faint CRT scanline texture. Apply to a positioned container. */
.developer-terminal-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    rgba(139, 233, 253, 0.025) 0px,
    rgba(139, 233, 253, 0.025) 1px,
    transparent 1px,
    transparent 3px
  );
}

.developer-terminal-selection ::selection {
  background: rgba(74, 246, 38, 0.3);
  color: #4af626;
}`,

  aiRules: `你是 Developer Terminal（终端风）设计专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止
- 任何 sans-serif / serif 字体（font-sans、font-serif）
- 白色或浅色背景（bg-white、bg-gray-50 等）
- rounded-lg 及以上圆角（只允许 rounded-sm 与 rounded-none）
- 渐变 bg-gradient-* 与玻璃拟态 backdrop-blur
- 摄影图像与插画（终端里只有字符）
- 第 5 种强调色（只允许 #8BE9FD / #FF79C6 / #FFB86C / #6272A4）
- shadow-md 及以上厚阴影

## 必须遵守
- 全局 font-mono
- 背景 #0A0E12，面板 #0D141B，边框 border-[#1F2937]
- 主文字荧光绿 #4AF626，注释 # 开头且用 #6272A4
- 章节标题以 prompt 前缀开头：visitor@stylekit:~$ 命令
- 标题或输入位带闪烁光标块（w-2 h-4 bg-[#4AF626] animate-pulse）
- 内容按"命令 + 输出"成对组织，列表用 ls -la 式对齐
- 状态用 exit code 徽标：[0] OK（绿）/ [1] ERR（品红 #FF79C6）
- 页面底部使用 tmux 式状态栏
- 分隔使用 ASCII 线（──────）

## 颜色语义
- #4AF626 绿：主体输出、成功、prompt 命令
- #8BE9FD 青：路径、链接、用户名、信息
- #FF79C6 品红：关键字、错误、危险操作
- #FFB86C 琥珀：字符串、数字、警告
- #6272A4 蓝灰：注释、次要信息、非活动项

## 动效与交互
- 光标闪烁用 steps() 或 animate-pulse，周期约 1s
- hover 只改变背景透明度（hover:bg-[#4AF626]/10）或边框亮度，不做位移与缩放
- 可选微弱 scanline 纹理（repeating-linear-gradient，透明度不超过 0.03）
- transition 使用 transition-colors duration-150

## 响应式
- 移动端：整页仍是单列终端窗口，字号 text-xs/text-sm，表格横向滚动
- 桌面端：终端窗口最大宽度约 max-w-5xl 居中，保持 80 列排版感

## 自检清单
1. 页面中没有任何非 mono 字体
2. 没有渐变、玻璃拟态、厚阴影、图片
3. 每个区块都能读成一条命令的输出
4. 颜色只承担语义，不做装饰
5. 底部有 tmux 状态栏，且存在至少一个闪烁光标`,

  aiRulesEn: `You are a Developer Terminal design expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden
- Any sans-serif / serif font (font-sans, font-serif)
- White or light backgrounds (bg-white, bg-gray-50, etc.)
- rounded-lg or larger radii (only rounded-sm and rounded-none allowed)
- Gradients bg-gradient-* and glassmorphism backdrop-blur
- Photography or illustration (a terminal only has glyphs)
- A 5th accent color (only #8BE9FD / #FF79C6 / #FFB86C / #6272A4 allowed)
- Heavy shadows shadow-md and above

## Must Follow
- font-mono globally
- Background #0A0E12, panels #0D141B, borders border-[#1F2937]
- Primary text phosphor green #4AF626; comments start with # in #6272A4
- Section headings start with a prompt prefix: visitor@stylekit:~$ command
- Headings or inputs carry a blinking cursor block (w-2 h-4 bg-[#4AF626] animate-pulse)
- Organize content as command + output pairs; lists as ls -la aligned output
- Status via exit code badges: [0] OK (green) / [1] ERR (magenta #FF79C6)
- End pages with a tmux style status bar
- Separate sections with ASCII rules (------)

## Color Semantics
- #4AF626 green: primary output, success, prompt commands
- #8BE9FD cyan: paths, links, usernames, info
- #FF79C6 magenta: keywords, errors, destructive actions
- #FFB86C amber: strings, numbers, warnings
- #6272A4 blue-gray: comments, secondary info, inactive items

## Motion & Interaction
- Cursor blink via steps() or animate-pulse, roughly 1s period
- Hover only shifts background alpha (hover:bg-[#4AF626]/10) or border brightness; no translate or scale
- Optional faint scanline texture (repeating-linear-gradient, alpha under 0.03)
- Use transition-colors duration-150

## Responsive
- Mobile: still a single-column terminal window, text-xs/text-sm, tables scroll horizontally
- Desktop: terminal window centered around max-w-5xl, keep an 80-column feel

## Self-Check
1. No non-mono font anywhere on the page
2. No gradients, glassmorphism, heavy shadows, or images
3. Every section reads as the output of a command
4. Color carries semantics only, never decoration
5. A tmux status bar exists at the bottom and at least one cursor blinks`,

  examplePrompts: [
    {
      title: "开发者个人主页",
      titleEn: "Developer Homepage",
      description: "把个人主页做成一场登录后的终端会话",
      descriptionEn: "A personal homepage rendered as a logged-in terminal session",
      prompt: `用 Developer Terminal 终端风创建一个开发者个人主页，要求：
1. Hero 是 boot sequence：Last login 行、[ OK ] 自检项、ASCII 站名、带闪烁光标的 prompt
2. 关于我 = whoami 命令的键值对输出，技能 = cat skills.txt
3. 项目列表 = ls -la ~/projects 的对齐输出，每行可点击
4. 联系方式 = printenv CONTACT_* 输出，邮箱与链接用青色 #8BE9FD
5. 底部 tmux 状态栏：会话名、窗口列表、时间
全程 font-mono，背景 #0A0E12，主文字 #4AF626，禁止渐变与图片`,
      promptEn: `Create a developer homepage in Developer Terminal style:
1. Hero as a boot sequence: Last login line, [ OK ] checks, ASCII site name, prompt with blinking cursor
2. About = key-value output of a whoami command; skills = cat skills.txt
3. Projects = aligned ls -la ~/projects output, each row clickable
4. Contact = printenv CONTACT_* output with cyan #8BE9FD emails and links
5. tmux status bar at the bottom: session name, window list, clock
font-mono everywhere, #0A0E12 background, #4AF626 primary text, no gradients or images`,
    },
    {
      title: "CLI 工具官网",
      titleEn: "CLI Tool Landing Page",
      description: "命令行工具的产品页，安装命令即 CTA",
      descriptionEn: "Product page for a CLI tool where the install command is the CTA",
      prompt: `用 Developer Terminal 终端风为一个 CLI 工具设计官网，要求：
1. 顶部会话标签栏（tmux 窗口式导航）：0:install* 1:docs 2:changelog
2. Hero 展示一条可复制的安装命令 npm install -g mytool，配 [0] OK 徽标
3. 功能区 = 三个"命令 + 输出"面板，演示核心用法
4. 版本更新 = git log --oneline 式列表，哈希用琥珀 #FFB86C
5. stderr 风格的注意事项区块（品红 #FF79C6 边框）
面板统一 border-[#1F2937] rounded-sm，分隔用 ASCII 线`,
      promptEn: `Design a landing page for a CLI tool in Developer Terminal style:
1. Top session tab bar (tmux window navigation): 0:install* 1:docs 2:changelog
2. Hero shows a copyable install command npm install -g mytool with a [0] OK badge
3. Features = three command + output panels demonstrating core usage
4. Changelog = git log --oneline list with amber #FFB86C hashes
5. A stderr-styled caveats block (magenta #FF79C6 border)
Panels use border-[#1F2937] rounded-sm; separate sections with ASCII rules`,
    },
    {
      title: "系统监控面板",
      titleEn: "System Monitor Dashboard",
      description: "htop / ps aux 语言的状态监控页",
      descriptionEn: "A status dashboard speaking htop / ps aux language",
      prompt: `用 Developer Terminal 终端风创建一个系统监控面板，要求：
1. 服务列表 = ps aux 式表格：PID、SERVICE、CPU、MEM、STATUS 列
2. 资源占用 = ASCII 进度条 [████████░░] 67%，超过 80% 用琥珀色
3. 日志流 = tail -f 输出区，INFO 青色 / WARN 琥珀 / ERR 品红
4. 每个服务带 exit code 徽标 [0] OK 或 [1] ERR
5. 底部 tmux 状态栏显示 load、uptime、时钟
全 font-mono，禁止图表库，所有可视化用字符完成`,
      promptEn: `Create a system monitor dashboard in Developer Terminal style:
1. Service list = ps aux style table: PID, SERVICE, CPU, MEM, STATUS columns
2. Resource usage = ASCII progress bars [########..] 67%, amber above 80%
3. Log stream = tail -f output area, INFO cyan / WARN amber / ERR magenta
4. Each service carries an exit code badge [0] OK or [1] ERR
5. Bottom tmux status bar with load, uptime, clock
font-mono only, no chart libraries, all visualization done with glyphs`,
    },
  ],
};
