import type { Locale } from "@/lib/i18n/translations";
import { localizeHref } from "@/lib/i18n/routing";

export function getDesignWorkflowLinks(locale: Locale, styleSlug?: string) {
  const zh = locale === "zh";
  const workflows = [
    {
      href: localizeHref("/ai-ui-design", locale),
      label: zh ? "AI UI 设计：从需求到设计约束" : "AI UI design: turn a brief into constraints",
      description: zh ? "把视觉方向、组件状态与验收条件写成可执行的设计需求。" : "Specify visual direction, component states and review criteria before generating code.",
    },
    {
      href: localizeHref("/tailwind-ui-prompts", locale),
      label: zh ? "Tailwind CSS 提示词与实现示例" : "Tailwind CSS prompts and implementation examples",
      description: zh ? "使用具体的主题变量、布局和组件规则，代替模糊的风格形容词。" : "Work with theme variables, layouts and component rules instead of vague style adjectives.",
    },
    {
      href: localizeHref("/claude-code-ui-design", locale),
      label: zh ? "Claude Code UI 设计工作流" : "Claude Code UI design workflow",
      description: zh ? "将所选风格的规则纳入项目上下文，并按区块实现与复查。" : "Bring the selected style into project context, then implement and review one section at a time.",
    },
    {
      href: localizeHref("/codex-ui-design", locale),
      label: zh ? "Codex UI 设计与迭代检查" : "Codex UI design and iteration checks",
      description: zh ? "明确项目约束、修改范围和浏览器验收要求。" : "Define project constraints, change boundaries and browser acceptance checks.",
    },
  ];

  if (!styleSlug || styleSlug === "neo-brutalist") {
    workflows.unshift({
      // Guides are English-only. Do not invent a translated route or hreflang.
      href: "/en/guides/neo-brutalism",
      label: zh ? "新野兽派网页与 Tailwind CSS 实践（英文）" : "Neo-Brutalist web design with Tailwind CSS",
      description: zh ? "从配色、粗边框与硬阴影到一个可用的组件示例。" : "A worked example connecting the palette, thick borders and hard shadows to a usable component.",
    });
  }

  return workflows;
}
