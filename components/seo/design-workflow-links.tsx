import Link from "next/link";
import { getDesignWorkflowLinks } from "@/lib/seo/design-workflows";
import type { Locale } from "@/lib/i18n/translations";

export function DesignWorkflowLinks({ locale, styleSlug }: { locale: Locale; styleSlug?: string }) {
  const zh = locale === "zh";

  return (
    <section aria-label={zh ? "设计实现与工具指南" : "Design implementation and tool guides"} className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-12 md:py-14">
        <h2 className="text-2xl tracking-tight">{zh ? "把所选风格用进代码" : "Put your chosen style into code"}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{zh ? "按实现任务选择指南：先固定设计约束，再在自己的编码工具中实现并检查。" : "Choose a guide for your implementation task: set design constraints, build in your coding tool, then review the result."}</p>
        <ul className="mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {getDesignWorkflowLinks(locale, styleSlug).map((workflow) => (
            <li key={workflow.href}>
              <Link href={workflow.href} prefetch={false} hrefLang={workflow.href.startsWith("/en/guides/") ? "en" : undefined} className="inline-flex min-h-11 items-center text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                {workflow.label}
              </Link>
              <p className="mt-1 max-w-lg text-sm leading-6 text-muted">{workflow.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
