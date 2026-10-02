import { getTopicBySlug } from "@/lib/prompts";
import { DASHBOARD_PROMPT_COMPARISON } from "./dashboard-reference";
import { DARK_MODE_QUICK_PROMPT } from "./dark-mode-reference";

const tailwindMarketingPrompt = getTopicBySlug("tailwind-ui")?.prompts.find(
  (prompt) => prompt.titleEn === "Marketing Page Sections for Cursor",
);

if (!tailwindMarketingPrompt) {
  throw new Error("The UI prompt examples require the Tailwind marketing sections prompt.");
}

export const UI_PROMPT_EXAMPLES = [
  {
    id: "tailwind-marketing",
    title: {
      en: "Tailwind landing page sections",
      zh: "Tailwind 落地页区块",
    },
    sourceHref: "/tailwind-ui-prompts",
    sourceLabel: {
      en: "Source: Tailwind UI prompts",
      zh: "来源：Tailwind UI 提示词（中文译文）",
    },
    prompt: {
      en: tailwindMarketingPrompt.prompt,
      zh: "使用 Next.js 和 Tailwind 构建三个可复用的营销页面区块。首屏：使用 'py-24 lg:py-32'，标题用 'text-5xl lg:text-6xl font-bold tracking-tight text-balance'，说明文字用 'mt-6 text-lg text-zinc-600 max-w-2xl mx-auto'；放置两个行动按钮，主要按钮用 bg-zinc-900 text-white，次要按钮用 ring-1 ring-zinc-300。品牌标识区：使用 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center'，标识默认灰度，悬停时恢复颜色。功能便当网格：使用 'grid lg:grid-cols-3 gap-4'，首张卡片跨 lg:col-span-2，每张卡片用 'rounded-2xl bg-zinc-50 p-8 ring-1 ring-zinc-200'。所有区块用 dark: 变体支持暗色模式；标题在两种主题下都要保持至少 4.5:1 的对比度。",
    },
  },
  {
    id: "subscription-dashboard",
    title: {
      en: "Subscription analytics dashboard",
      zh: "订阅业务分析仪表盘",
    },
    sourceHref: "/dashboard-prompts",
    sourceLabel: {
      en: "Source: Dashboard prompts",
      zh: "来源：仪表盘提示词",
    },
    prompt: DASHBOARD_PROMPT_COMPARISON.specific,
  },
  {
    id: "dark-account-settings",
    title: {
      en: "Dark account settings page",
      zh: "暗色账户设置页",
    },
    sourceHref: "/dark-mode-ui-prompts",
    sourceLabel: {
      en: "Adapted from: Dark mode UI prompts",
      zh: "改编自：暗色模式 UI 提示词",
    },
    prompt: {
      en: DARK_MODE_QUICK_PROMPT.en
        .replace("[page type]", "account settings page")
        .replace("[audience]", "SaaS account administrators"),
      zh: DARK_MODE_QUICK_PROMPT.zh
        .replace("[目标用户]", "SaaS 账户管理员")
        .replace("[页面类型]", "账户设置页"),
    },
  },
] as const;
