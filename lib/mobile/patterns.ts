import type { MobilePattern } from "./types";

export const mobilePatterns: MobilePattern[] = [
  {
    id: "reading",
    name: { zh: "内容阅读", en: "Reading" },
    title: { zh: "让内容成为第一眼。", en: "Give the story the first word." },
    description: {
      zh: "适合杂志、知识社区和阅读工具。用一个重点故事建立节奏，把收藏和分类放在拇指容易触达的位置。",
      en: "For magazines, communities, and reading apps. Lead with one story, then keep saving and discovery within easy reach.",
    },
    structure: [
      { zh: "一个重点故事 + 有节奏的单列内容流", en: "One lead story and a single-column reading feed" },
      { zh: "持久的底部导航 + 明确的当前页面", en: "Persistent bottom navigation with a clear current destination" },
      { zh: "收藏即时反馈，空收藏页说明下一步", en: "Immediate save feedback and a useful empty saved state" },
    ],
    checks: [
      { zh: "标题可换行，长中文和大字号不截断主要信息。", en: "Headlines wrap; long text and larger type retain essential information." },
      { zh: "切换内容与收藏时，已收藏状态保持一致。", en: "Saved state stays consistent across feed and saved views." },
      { zh: "底部导航只放页面目的地，收藏是独立操作。", en: "Bottom navigation contains destinations; saving remains a separate action." },
    ],
    styleSlug: "mobile-editorial",
    styleName: { zh: "移动编辑风", en: "Mobile Editorial" },
  },
  {
    id: "commerce",
    name: { zh: "商品购买", en: "Shopping" },
    title: { zh: "把选择留在当前页面。", en: "Keep the choice in context." },
    description: {
      zh: "适合电商、预约和轻量交易。商品信息先讲清楚，用底部弹层完成规格选择，再给出清晰的确认反馈。",
      en: "For shops, bookings, and lightweight transactions. Explain the product, choose an option in a bottom sheet, then confirm the action.",
    },
    structure: [
      { zh: "商品信息 + 单一的主要购买操作", en: "Product information and one primary purchase action" },
      { zh: "底部弹层内完成规格选择与确认", en: "Option selection and confirmation inside a bottom sheet" },
      { zh: "购物袋数量、成功反馈和返回路径", en: "Cart count, success feedback, and a clear way back" },
    ],
    checks: [
      { zh: "弹层有标题、关闭按钮，可用 Escape 退出并恢复焦点。", en: "The sheet has a title and close button; Escape dismisses it and restores focus." },
      { zh: "价格、选中规格和确认操作在同一上下文内。", en: "Price, selected option, and confirmation share the same context." },
      { zh: "提交中防止重复操作，失败时保留用户选择。", en: "Prevent repeat submissions while pending and preserve choices on failure." },
    ],
    styleSlug: "apple-style",
    styleName: { zh: "苹果极简", en: "Apple Style" },
  },
  {
    id: "workspace",
    name: { zh: "任务管理", en: "Tasks" },
    title: { zh: "一只手，也能处理日常。", en: "Make everyday work thumb-friendly." },
    description: {
      zh: "适合个人任务、习惯和移动工作台。把桌面表格改成可扫描的列表，用状态与进度说明发生了什么。",
      en: "For tasks, habits, and mobile workspaces. Replace desktop tables with scannable lists and make status changes visible.",
    },
    structure: [
      { zh: "当日摘要 + 带状态的任务列表", en: "A daily summary and a task list with visible status" },
      { zh: "整行可触达的复选操作", en: "Comfortable row-sized checkbox targets" },
      { zh: "完成数量与进度即时同步", en: "Completed counts and progress update together" },
    ],
    checks: [
      { zh: "状态同时用文字和图形表达，不只依赖颜色。", en: "Status uses text and shape, not color alone." },
      { zh: "切换已完成状态不会让当前任务突然消失。", en: "Toggling completion does not unexpectedly remove the current task." },
      { zh: "错误和空状态提供可执行的下一步。", en: "Error and empty states offer an actionable next step." },
    ],
    styleSlug: "material-design",
    styleName: { zh: "Material Design", en: "Material Design" },
  },
];

export const mobileGuidelines = [
  {
    title: { zh: "触控目标", en: "Touch targets" },
    body: {
      zh: "这些 Web 示例以至少 44 × 44 CSS px 的主操作区域为目标。WCAG 2.2 AA 的最小目标标准为 24 × 24 CSS px，并有间距等例外；原生 App 需另核对 pt / dp 规范。",
      en: "These web examples aim for primary targets of at least 44 × 44 CSS px. WCAG 2.2 AA specifies 24 × 24 CSS px with exceptions including spacing; check platform-specific pt / dp guidance for native apps.",
    },
    url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum/",
    source: "WCAG 2.2",
  },
  {
    title: { zh: "安全区与键盘", en: "Insets and keyboards" },
    body: {
      zh: "固定操作栏为底部安全区留出空间；输入框聚焦后仍能看到输入内容和提交按钮。浏览器预览之外，还需要真机检查软键盘。",
      en: "Leave space for bottom safe-area insets and keep the focused field and submit action visible. Test the software keyboard on a real device as well as in the browser.",
    },
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/env",
    source: "MDN",
  },
  {
    title: { zh: "弹层与焦点", en: "Sheets and focus" },
    body: {
      zh: "弹层打开后焦点进入内容区，有明确关闭方式；关闭后回到触发按钮。避免只支持拖拽而没有可点击的操作。",
      en: "Move focus into an open modal, provide an explicit close action, and restore focus to the trigger. Keep a clickable alternative to drag-only interactions.",
    },
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/",
    source: "WAI-ARIA APG",
  },
];
