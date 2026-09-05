import { LocalizedLink } from "@/components/i18n/localized-link";
import type { Locale } from "@/lib/i18n/translations";

/**
 * Cross-links between the prompt-library pages (a topic cluster).
 *
 * These pages — UI, landing-page, dashboard, Tailwind, and dark-mode prompts —
 * are closely related but were barely interlinked, so each sat as an island and
 * none accumulated much internal-link authority. Rendering this on every page
 * turns them into a hub-and-spoke cluster: each page links to the other four,
 * which concentrates authority on the set and is the most realistic lever for
 * pushing the page-2 members (dark-mode, tailwind) onto page 1.
 */
const PROMPT_PAGES = [
  { href: "/ui-prompts", en: "UI Prompts", zh: "UI 提示词" },
  { href: "/landing-page-prompts", en: "Landing Page Prompts", zh: "落地页提示词" },
  { href: "/dashboard-prompts", en: "Dashboard Prompts", zh: "仪表盘提示词" },
  { href: "/tailwind-ui-prompts", en: "Tailwind UI Prompts", zh: "Tailwind UI 提示词" },
  { href: "/dark-mode-ui-prompts", en: "Dark Mode UI Prompts", zh: "暗色模式提示词" },
] as const;

export function PromptClusterLinks({
  current,
  locale,
}: {
  /** Path of the current page, e.g. "/tailwind-ui-prompts" — excluded from the list. */
  current: string;
  locale: Locale;
}) {
  const others = PROMPT_PAGES.filter((page) => page.href !== current);
  if (others.length === 0) return null;
  const isZh = locale === "zh";

  return (
    <section
      aria-label={isZh ? "相关提示词库" : "Related prompt libraries"}
      className="border-t border-border"
    >
      <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <h2 className="font-serif text-xl md:text-2xl">
          {isZh ? "相关提示词库" : "Related prompt libraries"}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {isZh
            ? "探索 StyleKit 的其他 AI 提示词库，覆盖不同界面类型与技术栈。"
            : "Explore StyleKit's other AI prompt libraries across interface types and stacks."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {others.map((page) => (
            <LocalizedLink
              key={page.href}
              href={page.href}
              className="inline-flex items-center border border-border px-5 py-3 text-sm tracking-wide transition-colors hover:border-foreground"
            >
              {isZh ? page.zh : page.en}
            </LocalizedLink>
          ))}
        </div>
      </div>
    </section>
  );
}
