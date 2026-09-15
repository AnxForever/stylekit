/** Source review date, not an automatically refreshed publication timestamp. */
export const DARK_MODE_REFERENCE_REVIEWED_AT = "2026-09-15";

export const DARK_MODE_SOURCES = [
  {
    href: "https://tailwindcss.com/docs/dark-mode",
    name: "Tailwind CSS — Dark mode",
    en: "Tailwind v4 uses a CSS custom variant for a manual theme selector; the default follows the system preference.",
    zh: "Tailwind v4 使用 CSS 自定义变体实现手动主题切换；默认行为跟随系统偏好。",
  },
  {
    href: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
    name: "W3C — WCAG 2.2 Contrast (Minimum)",
    en: "Normal text needs 4.5:1 contrast; large text needs 3:1. These are text-contrast requirements, not a full accessibility certification.",
    zh: "普通文字需要 4.5:1 对比度，大号文字需要 3:1。这是文字对比度要求，不等于完整的无障碍认证。",
  },
] as const;

export const DARK_MODE_TAILWIND_CSS = `@import "tailwindcss";

/* Enable dark:* utilities when .dark is on <html>. */
@custom-variant dark (&:where(.dark, .dark *));

:root { color-scheme: light; }
.dark { color-scheme: dark; }`;

export const DARK_MODE_QUICK_PROMPT = {
  en: "Build a responsive dark-mode [page type] for [audience] with React and Tailwind CSS v4. Use #09090b for the page, #131316 for cards, and #1a1a20 for raised surfaces. Start with #fafafa primary text and #a1a1aa secondary text, then verify contrast against each actual background. Require at least 4.5:1 for normal text and 3:1 for large text. Define hover, focus, disabled, loading, empty, and error states. Support keyboard navigation, reduced motion, and a light/dark/system theme preference. Use CSS design tokens and @custom-variant for manual dark mode. Return the component, theme CSS, and a short verification checklist; do not claim accessibility compliance without testing.",
  zh: "用 React 和 Tailwind CSS v4 为 [目标用户] 构建响应式暗色 [页面类型]。页面背景用 #09090b，卡片用 #131316，抬升表面用 #1a1a20；主文字从 #fafafa、次要文字从 #a1a1aa 开始，并逐一检查与实际背景的对比度。普通文字至少 4.5:1，大号文字至少 3:1。补齐悬停、焦点、禁用、加载、空内容和错误状态，支持键盘操作、减少动态效果以及浅色/暗色/跟随系统三种主题偏好。用 CSS 设计 tokens 和 @custom-variant 实现手动暗色模式。输出组件、主题 CSS 与验证清单；未经测试不要声称满足全部无障碍标准。",
} as const;
