import type { Locale } from "@/lib/i18n/translations";

export type SpecializedAiIntentKey =
  | "ai-ui-design"
  | "claude-code-ui-design"
  | "codex-ui-design";

export interface AiIntentCopy {
  title: string;
  description: string;
  h1: string;
  intro: string;
  eyebrow: string;
  primaryCta: string;
  secondaryCta: string;
  includedTitle: string;
  included: Array<{ title: string; body: string }>;
  workflowTitle: string;
  workflow: string[];
  promptTitle?: string;
  promptContent?: string;
  stylesTitle: string;
  stylesBody: string;
  relatedTitle: string;
  related: Array<{ label: string; href: string; body: string; external?: boolean }>;
  faq: Array<{ question: string; answer: string }>;
}

type SpecializedCopyMap = Record<SpecializedAiIntentKey, AiIntentCopy>;

const ENGLISH_COPY: SpecializedCopyMap = {
  "ai-ui-design": {
    title: "AI UI Design Brief: Turn a Visual Direction into Usable Rules",
    description: "Write a reusable AI UI design brief with page intent, content hierarchy, design tokens, component states, and acceptance checks to reduce visual drift.",
    h1: "AI UI design: turn visual direction into testable interface rules",
    intro: "A useful UI brief tells an AI what the page must help someone do, which content matters first, and what visual and interaction rules should stay consistent. Start with one StyleKit direction, then describe concrete constraints instead of stacking style adjectives.",
    eyebrow: "AI UI DESIGN BRIEF",
    primaryCta: "Browse UI design styles",
    secondaryCta: "Explore UI prompts",
    includedTitle: "Build a UI brief from four decisions",
    included: [
      { title: "User task and content", body: "Name the user, their main task, the primary action, and the information that must be visible first. This gives layout decisions a reason." },
      { title: "One visual system", body: "Choose a StyleKit direction and record its palette, type scale, spacing, borders, radii, and shadows. Keep the required values together so later sections do not invent new ones." },
      { title: "Component behavior", body: "List the components the page needs and specify meaningful states such as focus, loading, empty, error, and disabled where they apply." },
      { title: "Boundaries and checks", body: "State what must remain unchanged, what to avoid, which breakpoints and keyboard paths matter, and how a reviewer can tell the page is complete." },
    ],
    workflowTitle: "Turn one UI screen into a reusable design brief",
    workflow: [
      "Pick one screen and write its user, goal, primary action, and content order in plain language.",
      "Choose one StyleKit style; copy the actual tokens and component rules you intend to use.",
      "Map the content to page regions and reusable components before asking for visual polish.",
      "Add only the relevant interaction states, responsive behavior, accessibility needs, and visual exclusions.",
      "Implement one section, compare it with the brief, and carry forward only the rules that worked.",
    ],
    promptTitle: "Reusable AI UI design brief",
    promptContent: `Product and audience: [who uses this]\nPage goal: [the task this screen must support]\nPrimary action: [the one action to make easiest]\nContent order: [most important to least important]\nVisual direction: [one StyleKit style]\nDesign rules: [paste palette, typography, spacing, borders, radii, and shadows]\nComponents and states: [list components and relevant states]\nResponsive and accessibility: [breakpoints, keyboard paths, contrast or semantics]\nAvoid: [specific patterns or visual choices]\nAcceptance checks: [observable conditions]\nScope: implement [one page or section]; preserve [existing behavior or content]`,
    stylesTitle: "Validate the system on one screen before reusing it",
    stylesBody: "Use a StyleKit style page as a source for concrete design rules, then adapt those rules to the content density and behavior of your product. Reuse the brief only after checking that the first implementation works at the target screen sizes and states.",
    relatedTitle: "Continue with practical UI resources",
    related: [
      { label: "Style catalog", href: "/styles", body: "Compare visual directions and inspect their design rules." },
      { label: "UI prompt library", href: "/ui-prompts", body: "Start from prompts organized around common page and component needs." },
      { label: "AI frontend workflow", href: "/ai-frontend-workflow", body: "Move from a page brief into component implementation and review." },
    ],
    faq: [
      { question: "Why is a style adjective not enough for AI UI design?", answer: "Words such as modern or minimal do not specify colors, type hierarchy, spacing, component behavior, or what to avoid. Concrete rules give the implementation something a reviewer can check." },
      { question: "Should I use the same brief for every page?", answer: "Reuse the visual system and interaction principles, but write a separate page goal, content order, and component list for each screen." },
      { question: "Does StyleKit generate or validate the finished interface?", answer: "StyleKit provides style references, tokens, component guidance, and prompts. Your coding tool produces the implementation, and your project checks and review determine whether it is ready." },
    ],
  },
  "claude-code-ui-design": {
    title: "Claude Code UI Design: Use StyleKit Rules in CLAUDE.md",
    description: "Export a StyleKit design direction as Markdown, add it to Claude Code project instructions or a focused .claude/rules file, then verify one UI iteration at a time.",
    h1: "Bring StyleKit design rules into a Claude Code project",
    intro: "Claude Code can use project instructions from CLAUDE.md, while StyleKit provides a Claude Code rules export you can copy or download as Markdown. Add the style guidance to the project deliberately: keep existing build instructions, and use a focused .claude/rules file when the visual rules should stay separate.",
    eyebrow: "CLAUDE CODE UI WORKFLOW",
    primaryCta: "Choose a style to export",
    secondaryCta: "Browse UI prompts",
    includedTitle: "What to put in Claude Code project guidance",
    included: [
      { title: "Stable project facts", body: "Keep the framework, component boundaries, formatting rules, and relevant test commands in the existing project instructions." },
      { title: "A focused style rule", body: "Use one StyleKit direction and keep its tokens, do/don't rules, and component guidance together. For a larger project, put visual guidance in .claude/rules/ui-style.md." },
      { title: "A bounded task", body: "For each coding request, name the page or component to change, the behavior to preserve, and the visual states to verify." },
    ],
    workflowTitle: "Add StyleKit rules without replacing project instructions",
    workflow: [
      "Open a StyleKit style page and preview the component examples before choosing a direction.",
      "Open the style page's IDE export menu, choose Claude Code (.md), then copy the rules or download a Markdown file named after the style slug; this exports text, not an installer.",
      "Merge the relevant guidance into the existing CLAUDE.md, or save a focused rule under .claude/rules/ui-style.md.",
      "Start Claude Code in the project and ask it to summarize the applicable instructions before editing.",
      "Implement one page or component, check /context when you need to confirm loaded instruction files, then review responsive and keyboard behavior.",
    ],
    promptTitle: "Claude Code task for one UI iteration",
    promptContent: `Read the project instructions and the applicable StyleKit UI rules first. Summarize the constraints you will follow.\n\nTarget: [one page, section, or component]\nUser task and content order: [what the interface must support]\nStyleKit direction: [style name]\nPreserve: [existing routes, behavior, copy, or component APIs]\nImplement: [the smallest useful change]\nVerify: [project test command, responsive widths, keyboard/focus states, and relevant empty/loading states]\nReport: changed files, checks run, and any remaining visual issue`,
    stylesTitle: "Treat exported rules as project context, not an integration",
    stylesBody: "The StyleKit Claude Code control copies or downloads Markdown design guidance. It does not edit your repository or configure Claude Code. Claude Code reads project instruction files as context; concise, concrete rules are easier to review and maintain.",
    relatedTitle: "Claude Code and StyleKit resources",
    related: [
      { label: "Style catalog", href: "/styles", body: "Choose a visual direction and open its tokens and component guidance." },
      { label: "UI prompt library", href: "/ui-prompts", body: "Use a page-specific prompt alongside the project rules." },
      { label: "Claude Code project memory", href: "https://code.claude.com/docs/en/memory", body: "Official guidance on CLAUDE.md, AGENTS.md, project rules, and checking loaded instructions.", external: true },
    ],
    faq: [
      { question: "Does StyleKit install rules into Claude Code automatically?", answer: "No. The style page copies or downloads a Markdown rules file. Add it to your project instructions yourself; StyleKit does not change Claude Code settings or write into your repository." },
      { question: "Where should the exported style rules go?", answer: "Keep stable team-wide project conventions in the existing CLAUDE.md. Put focused visual rules in .claude/rules/ui-style.md if that separation suits the project, and avoid replacing existing instructions with a style export." },
      { question: "How can I check whether Claude Code loaded the rules?", answer: "Ask Claude Code to summarize the applicable project instructions before editing. Its /context command can show which instruction files were loaded for the session." },
    ],
  },
  "codex-ui-design": {
    title: "Codex UI Design Workflow: AGENTS.md and Reviewable Iterations",
    description: "Use repository instructions and a scoped UI brief with Codex CLI. Copy StyleKit rules into the task or project instructions, then verify each implementation with project checks.",
    h1: "Use Codex project instructions to guide consistent UI work",
    intro: "Codex CLI recognizes AGENTS.md as repository guidance and can apply instructions from the repository root down to the working directory. StyleKit design rules remain portable Markdown: copy the chosen tokens into a task or your own project instructions. There is no automatic StyleKit-to-Codex export or AGENTS.md installer.",
    eyebrow: "CODEX UI ITERATION",
    primaryCta: "Choose a UI style",
    secondaryCta: "Browse UI prompts",
    includedTitle: "Separate durable repository rules from this UI task",
    included: [
      { title: "Durable instructions", body: "Use AGENTS.md for project conventions that should apply across tasks, such as the framework, component rules, formatting, and verification commands." },
      { title: "Task-specific visual context", body: "Copy one StyleKit style's actual palette, typography, spacing, and component constraints into the current task when they apply to the screen being changed." },
      { title: "A reviewable scope", body: "Name the target page, behavior to preserve, and expected files. Ask for one section or component at a time when the design is still being explored." },
      { title: "Evidence of completion", body: "Require the relevant test or type check, a diff review, and explicit checks for responsive layout, keyboard focus, and meaningful UI states." },
    ],
    workflowTitle: "A Codex CLI loop for one frontend change",
    workflow: [
      "Open Codex CLI in the project and identify the AGENTS.md instructions that apply to the working directory.",
      "Select one StyleKit direction and paste the concrete visual rules into the task; do not rely on the style name alone.",
      "Ask Codex to summarize constraints, propose the smallest file scope, and name the checks before implementation.",
      "Implement one page area, then run the relevant project checks and inspect the resulting diff.",
      "Review mobile layout, focus and keyboard behavior, and loading or empty states; give Codex a specific follow-up for each defect.",
    ],
    promptTitle: "Codex task brief for a verifiable UI change",
    promptContent: `Read the applicable AGENTS.md files and summarize the project constraints before editing.\n\nTarget: [page, section, or component]\nUser task and content order: [what the UI must help someone do]\nStyleKit direction: [style name]\nRules to apply: [paste relevant tokens, component guidance, and avoid list]\nPreserve: [existing behavior, routes, APIs, and unrelated work]\nScope: [smallest intended change]\nChecks: [project test/type-check commands, responsive widths, keyboard focus, and relevant states]\nAfterward, inspect the diff and report files changed, checks run, and unresolved issues.`,
    stylesTitle: "Keep Codex instructions specific and verifiable",
    stylesBody: "In Codex CLI, AGENTS.md provides repository-scoped guidance. StyleKit does not create or install that file; use its style references as copyable task context, then confirm the implementation against the actual project checks and interface states.",
    relatedTitle: "Codex and frontend implementation resources",
    related: [
      { label: "Style catalog", href: "/styles", body: "Pick one visual direction and copy only the rules relevant to the target page." },
      { label: "Developer resources", href: "/developers", body: "Explore the project’s available tokens, components, and implementation resources." },
      { label: "Codex AGENTS.md guidance", href: "https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide", body: "Official Codex CLI guidance on discovering and injecting AGENTS.md instructions.", external: true },
    ],
    faq: [
      { question: "Does StyleKit automatically connect to Codex?", answer: "No. StyleKit provides copyable design references and Markdown rules, but it does not install Codex instructions or create an AGENTS.md file." },
      { question: "What belongs in AGENTS.md?", answer: "Put durable repository conventions there, such as the framework, code style, important boundaries, and project verification commands. Add a page-specific StyleKit direction to a task when it is not a rule for every change." },
      { question: "How can I confirm Codex used the project instructions?", answer: "Before editing, ask Codex CLI to list the applicable AGENTS.md files and summarize the relevant rules. Then verify the result with the requested checks and inspect the diff yourself." },
    ],
  },
};

const CHINESE_COPY: SpecializedCopyMap = {
  "ai-ui-design": {
    title: "AI UI 设计 brief：把视觉方向变成可检查的规则",
    description: "用页面目标、内容层级、设计 tokens、组件状态和验收条件写一份可复用的 AI UI 设计 brief，减少界面风格漂移。",
    h1: "AI UI 设计：把视觉方向写成可验收的界面规则",
    intro: "一份好用的 UI brief 要说明页面帮用户完成什么、哪些内容优先，以及视觉和交互上哪些规则需要保持一致。先在 StyleKit 选定一个方向，再写具体约束，不要只堆叠风格形容词。",
    eyebrow: "AI UI DESIGN BRIEF",
    primaryCta: "浏览 UI 设计风格",
    secondaryCta: "查看 UI 提示词",
    includedTitle: "用四项决定写出 UI brief",
    included: [
      { title: "用户任务与内容", body: "写明用户是谁、主要任务是什么、首要操作是什么，以及首屏最先要看到哪些信息。这样布局选择就有了依据。" },
      { title: "一套视觉系统", body: "选择一个 StyleKit 风格，记录它的色板、字号层级、间距、边框、圆角和阴影，把需要遵循的值放在一起，避免后续区块重新猜。" },
      { title: "组件行为", body: "列出页面需要的组件，并按实际场景说明焦点、加载、空数据、错误和禁用等状态。" },
      { title: "边界与验收", body: "说明哪些内容不能改、哪些样式要避免、要检查哪些断点和键盘路径，以及评审者如何判断页面完成。" },
    ],
    workflowTitle: "把一个 UI 页面整理成可复用 brief",
    workflow: [
      "选定一个页面，用普通语言写清用户、目标、主要操作和内容顺序。",
      "从 StyleKit 选一个风格，复制准备采用的真实 tokens 和组件规则。",
      "先把内容映射到页面区域和可复用组件，再要求 AI 润色视觉。",
      "补充当前页面需要的交互状态、响应式行为、无障碍要求和必须避免的样式。",
      "先实现一个区块，按 brief 对照检查，再保留验证有效的规则供后续页面复用。",
    ],
    promptTitle: "可复用的 AI UI 设计 brief",
    promptContent: `产品与用户：[谁会使用]\n页面目标：[这个页面要支持的任务]\n主要操作：[最需要突出的一个动作]\n内容顺序：[从重要到次要]\n视觉方向：[一个 StyleKit 风格]\n设计规则：[粘贴色板、字体、间距、边框、圆角和阴影]\n组件与状态：[列出组件和相关状态]\n响应式与无障碍：[断点、键盘路径、对比度或语义要求]\n避免：[明确的视觉模式或组件做法]\n验收条件：[可以实际观察到的完成标准]\n范围：实现[一个页面或区块]；保留[现有行为或内容]`,
    stylesTitle: "先在一个页面验证，再复用视觉系统",
    stylesBody: "把 StyleKit 风格页当作具体设计规则的来源，再按产品内容密度和交互调整。只有确认第一版在目标尺寸和状态下可用后，才把 brief 复用到其他页面。",
    relatedTitle: "继续查看 UI 实操资源",
    related: [
      { label: "设计风格库", href: "/styles", body: "比较不同视觉方向，并查看对应的设计规则。" },
      { label: "UI 提示词库", href: "/ui-prompts", body: "按常见页面和组件需求查找可复用的提示词。" },
      { label: "AI 前端工作流", href: "/ai-frontend-workflow", body: "从页面 brief 继续到组件实现与验收。" },
    ],
    faq: [
      { question: "为什么 AI UI 设计不能只写风格形容词？", answer: "现代、极简等词没有说明颜色、字体层级、间距、组件行为和禁止项。具体规则让实现结果可以被评审和检查。" },
      { question: "所有页面都用同一份 brief 吗？", answer: "视觉系统和交互原则可以复用，但每个页面仍要单独写用户目标、内容顺序和组件清单。" },
      { question: "StyleKit 会生成或验收最终界面吗？", answer: "StyleKit 提供风格参考、tokens、组件指引和提示词。代码由你使用的工具生成，项目检查和人工评审决定结果是否可用。" },
    ],
  },
  "claude-code-ui-design": {
    title: "Claude Code UI 设计：将 StyleKit 规则加入 CLAUDE.md",
    description: "把 StyleKit 设计方向复制或下载为 Markdown，加入 Claude Code 项目指令或专用 .claude/rules 文件，再逐次验收 UI 修改。",
    h1: "把 StyleKit 设计规则带进 Claude Code 项目",
    intro: "Claude Code 可以读取 CLAUDE.md 项目指令，StyleKit 的 Claude Code 规则控件则提供可复制或下载的 Markdown。把风格规则有选择地加入项目：保留已有构建指令；如果视觉规则需要独立维护，可以放进专用的 .claude/rules 文件。",
    eyebrow: "CLAUDE CODE UI WORKFLOW",
    primaryCta: "选择风格并导出规则",
    secondaryCta: "浏览 UI 提示词",
    includedTitle: "Claude Code 项目指令应包含什么",
    included: [
      { title: "稳定的项目事实", body: "在现有项目指令中保留框架、组件边界、格式约定和相关测试命令。" },
      { title: "聚焦的风格规则", body: "选择一个 StyleKit 风格，把 tokens、应做与避免事项、组件指引放在一起。较大的项目可把视觉规则独立放在 .claude/rules/ui-style.md。" },
      { title: "有边界的任务", body: "每次编码请求都写明要改的页面或组件、要保留的行为，以及需要检查的视觉和交互状态。" },
    ],
    workflowTitle: "加入 StyleKit 规则，同时保留项目指令",
    workflow: [
      "打开一个 StyleKit 风格页，先预览组件示例，再决定采用哪个方向。",
      "在风格页打开 IDE 导出菜单，选择 Claude Code (.md)，复制规则或下载以风格 slug 命名的 Markdown 文件；它只提供规则文本，不会自动安装。",
      "把相关规则合并进现有 CLAUDE.md，或保存为 .claude/rules/ui-style.md 这样的独立文件。",
      "在项目目录启动 Claude Code，先让它总结当前适用的指令，再开始编辑。",
      "一次实现一个页面或组件；需要确认指令是否加载时检查 /context，然后验收响应式和键盘行为。",
    ],
    promptTitle: "Claude Code 单轮 UI 修改任务 brief",
    promptContent: `先阅读项目指令和本次适用的 StyleKit UI 规则，并总结将遵循的约束。\n\n目标：[一个页面、区块或组件]\n用户任务与内容顺序：[界面要支持什么]\nStyleKit 风格：[风格名称]\n保留：[现有路由、行为、文案或组件 API]\n实现：[最小有用的修改]\n验收：[项目测试命令、响应式宽度、键盘/焦点状态，以及相关空数据/加载状态]\n完成后报告：修改文件、运行的检查和仍存在的视觉问题`,
    stylesTitle: "把导出规则当作项目上下文，而不是自动集成",
    stylesBody: "StyleKit 的 Claude Code 控件会复制或下载 Markdown 设计规则，不会编辑你的仓库，也不会配置 Claude Code。Claude Code 会把项目指令作为上下文读取；简洁、具体的规则更容易检查和维护。",
    relatedTitle: "Claude Code 与 StyleKit 资源",
    related: [
      { label: "设计风格库", href: "/styles", body: "选择视觉方向，查看对应的 tokens 和组件指引。" },
      { label: "UI 提示词库", href: "/ui-prompts", body: "在项目规则之外，为当前页面补充具体任务 brief。" },
      { label: "Claude Code 项目记忆文档", href: "https://code.claude.com/docs/en/memory", body: "官方说明 CLAUDE.md、AGENTS.md、项目规则和已加载指令的检查方式。", external: true },
    ],
    faq: [
      { question: "StyleKit 会自动把规则安装到 Claude Code 吗？", answer: "不会。风格页提供可复制或下载的 Markdown 规则文件，需要你自己加入项目指令；StyleKit 不会修改 Claude Code 设置或写入你的仓库。" },
      { question: "导出的风格规则应该放在哪里？", answer: "稳定的团队项目约定保留在现有 CLAUDE.md。如果希望单独维护视觉规则，可放入 .claude/rules/ui-style.md；不要用风格导出文件覆盖已有项目指令。" },
      { question: "怎么确认 Claude Code 读到了项目规则？", answer: "编辑前先让 Claude Code 总结适用的项目指令。需要确认会话中实际加载的文件时，可以查看 /context。" },
    ],
  },
  "codex-ui-design": {
    title: "Codex UI 设计工作流：用 AGENTS.md 逐轮验收界面",
    description: "通过项目指令和有边界的 UI brief 使用 Codex CLI。把 StyleKit 规则复制进当前任务或项目指令，再用项目检查逐次验证实现。",
    h1: "用 Codex 项目指令指导一致的 UI 修改",
    intro: "Codex CLI 能识别 AGENTS.md 作为仓库指引，并按工作目录读取从仓库根到当前目录的指令。StyleKit 设计规则仍是可复制的 Markdown：将选中的 tokens 放进任务或你维护的项目指令即可。StyleKit 没有 Codex 自动导出或 AGENTS.md 安装器。",
    eyebrow: "CODEX UI ITERATION",
    primaryCta: "选择 UI 风格",
    secondaryCta: "查看 UI 提示词",
    includedTitle: "区分长期仓库规则与当前 UI 任务",
    included: [
      { title: "长期项目指令", body: "把适用于多种任务的约定放在 AGENTS.md，例如框架、组件规则、代码格式和验证命令。" },
      { title: "当前任务的视觉上下文", body: "只把本次页面需要的 StyleKit 色板、字体、间距和组件约束复制到任务里，不要只提供风格名称。" },
      { title: "可评审的范围", body: "写清目标页面、要保留的行为和预期文件；还在探索视觉方向时，一次限定一个区块或组件。" },
      { title: "完成证据", body: "要求运行相关测试或类型检查、检查代码 diff，并明确验收响应式布局、键盘焦点和有实际意义的 UI 状态。" },
    ],
    workflowTitle: "用 Codex CLI 完成一次前端修改",
    workflow: [
      "在项目目录打开 Codex CLI，并确认当前工作目录适用的 AGENTS.md 指令。",
      "选择一个 StyleKit 风格，把具体视觉规则粘贴到任务里，不要只写风格名。",
      "编码前先让 Codex 总结约束、提出最小文件范围并列出要运行的检查。",
      "一次实现一个页面区域，然后运行相关项目检查并查看代码 diff。",
      "检查移动端布局、焦点与键盘行为、加载或空数据状态；发现问题时逐项给出具体修改要求。",
    ],
    promptTitle: "可验收的 Codex UI 修改任务 brief",
    promptContent: `先阅读当前目录适用的 AGENTS.md，并在编辑前总结项目约束。\n\n目标：[页面、区块或组件]\n用户任务与内容顺序：[界面要帮助用户完成什么]\nStyleKit 风格：[风格名称]\n使用规则：[粘贴相关 tokens、组件指引和避免项]\n保留：[现有行为、路由、API 和无关改动]\n范围：[本次最小修改]\n检查：[项目测试/类型检查命令、响应式宽度、键盘焦点和相关状态]\n完成后检查 diff，并报告修改文件、已运行的检查和未解决问题。`,
    stylesTitle: "让 Codex 指令具体且可验证",
    stylesBody: "在 Codex CLI 中，AGENTS.md 提供仓库范围的指引。StyleKit 不会创建或安装该文件；你可以把风格页规则作为任务上下文，再通过项目检查和真实界面状态验收实现。",
    relatedTitle: "Codex 与前端实现资源",
    related: [
      { label: "设计风格库", href: "/styles", body: "选择一个方向，只复制与目标页面相关的规则。" },
      { label: "开发者资源", href: "/developers", body: "查看项目可用的 tokens、组件与实现资源。" },
      { label: "Codex AGENTS.md 指南", href: "https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide", body: "OpenAI 官方 Codex CLI 文档，介绍 AGENTS.md 的发现与注入方式。", external: true },
    ],
    faq: [
      { question: "StyleKit 会自动连接 Codex 吗？", answer: "不会。StyleKit 提供可复制的设计参考和 Markdown 规则，但不会安装 Codex 指令或创建 AGENTS.md。" },
      { question: "AGENTS.md 适合写什么？", answer: "把长期有效的仓库约定写进去，例如框架、代码格式、重要边界和项目验证命令。只对一个页面有效的 StyleKit 视觉方向可以放在当前任务 brief 中。" },
      { question: "怎样确认 Codex 使用了项目指令？", answer: "编辑前让 Codex CLI 列出当前适用的 AGENTS.md 文件并总结相关规则，再运行约定的检查并自行查看代码 diff。" },
    ],
  },
};

export function getSpecializedAiIntentCopy(
  key: SpecializedAiIntentKey,
  locale: Locale,
): AiIntentCopy {
  return locale === "zh" ? CHINESE_COPY[key] : ENGLISH_COPY[key];
}
