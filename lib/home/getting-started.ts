import type { Locale } from "@/lib/i18n/translations";

export const EXAMPLE_STYLE_HREF = "/styles/neo-brutalist";

export function getGettingStartedContent(locale: Locale) {
  return locale === "zh"
    ? {
        title: "从选中风格，到用进项目",
        description: "先确定视觉方向，再把具体的设计约束交给你的 AI 编码工具。",
        guideLabel: "查看完整使用指南",
        steps: [
          {
            title: "选一个适合项目的风格",
            description: "按 SaaS、作品集或营销页等场景筛选，对比配色、排版与组件预览。",
            href: "/styles",
            action: "浏览风格库",
          },
          {
            title: "复制规则，带走设计约束",
            description: "在风格详情复制硬性提示词，或导出 AI 规则、设计 token 与所需组件代码。",
            href: `${EXAMPLE_STYLE_HREF}#style-exports`,
            action: "查看新野兽派导出示例",
          },
          {
            title: "在编码工具里实现并检查",
            description: "将规则与页面需求一起交给 Cursor、Claude Code 或 v0，再检查响应式布局与交互。",
            href: "/guide#apply-rules",
            action: "查看提示词用法",
          },
        ],
        faqTitle: "开始前，你可能想知道",
        questions: [
          {
            question: "浏览和复制需要注册或付费吗？",
            answer: "公开风格库、提示词和规则导出可以免费使用，无需注册。收藏、评论等账号功能另行登录；你的 AI 编码工具可能有自己的费用。",
          },
          {
            question: "StyleKit 会直接生成或托管网站吗？",
            answer: "StyleKit 提供风格参考、设计约束与代码素材。你需要在自己的编辑器或 AI 工具中实现页面，并检查可访问性、交互和业务逻辑。",
          },
          {
            question: "模板里的价格和试用是 StyleKit 的套餐吗？",
            answer: "模板中的品牌、价格、套餐、试用和付款信息是页面设计示例，不代表 StyleKit 提供这些服务。",
          },
        ],
      }
    : {
        title: "From a visual direction to your own UI",
        description: "Choose a style, then give your AI coding tool specific design constraints.",
        guideLabel: "Read the getting started guide",
        steps: [
          {
            title: "Choose a style for your project",
            description: "Filter by SaaS, portfolio or marketing site. Compare the palette, typography and live component previews.",
            href: "/styles",
            action: "Browse the style library",
          },
          {
            title: "Take the rules into your project",
            description: "Copy the hard prompt on a style page, or export AI rules, design tokens and the component code you need.",
            href: `${EXAMPLE_STYLE_HREF}#style-exports`,
            action: "See a Neo-Brutalist export example",
          },
          {
            title: "Build in your editor and review",
            description: "Use the rules alongside your brief in Cursor, Claude Code or v0. Check the responsive layout and interactions.",
            href: "/guide#apply-rules",
            action: "See how to use the prompt",
          },
        ],
        faqTitle: "Before you start",
        questions: [
          {
            question: "Do I need an account or a paid plan?",
            answer: "The public style library, prompts and rule exports are free to use without signing up. Account features such as favorites and comments require a login. Your AI coding tool may have its own charges.",
          },
          {
            question: "Does StyleKit generate or host my website?",
            answer: "StyleKit provides visual references, design constraints and code resources. Build in your editor or AI tool, then review accessibility, interactions and business logic yourself.",
          },
          {
            question: "Are the prices and trials in templates StyleKit plans?",
            answer: "Brands, prices, plans, trials and payment details inside templates are sample content for the page design. They do not describe services offered by StyleKit.",
          },
        ],
      };
}
