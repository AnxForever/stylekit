"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics/events";
import { getGettingStartedContent } from "@/lib/home/getting-started";
import { localizeHref } from "@/lib/i18n/routing";
import type { Locale } from "@/lib/i18n/translations";

export function GettingStartedSteps({ locale }: { locale: Locale }) {
  const { steps } = getGettingStartedContent(locale);

  return (
    <ol className="grid gap-8 md:grid-cols-3 md:gap-0">
      {steps.map((step, index) => (
        <li key={step.href} className="flex flex-col border-t border-border pt-5 md:px-6 md:first:pl-0 md:last:pr-0">
          <span className="mb-4 font-mono text-xs tabular-nums text-muted">0{index + 1}</span>
          <h3 className="mb-3 text-xl leading-snug">{step.title}</h3>
          <p className="mb-5 max-w-sm flex-1 text-sm leading-7 text-muted">{step.description}</p>
          <Link
            href={localizeHref(step.href, locale)}
            prefetch={false}
            onClick={() => trackEvent("cta_click", { label: `workflow_step_${index + 1}`, location: "getting_started" })}
            className="inline-flex min-h-11 w-fit items-center gap-2 text-sm underline decoration-border underline-offset-4 hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {step.action}
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          </Link>
        </li>
      ))}
    </ol>
  );
}

export function GettingStartedSection({ locale }: { locale: Locale }) {
  const content = getGettingStartedContent(locale);

  return (
    <section id="home-getting-started" aria-labelledby="home-getting-started-title" className="border-y border-border">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 md:px-12 md:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h2 id="home-getting-started-title" className="mb-3 text-2xl leading-tight tracking-tight md:text-3xl">{content.title}</h2>
            <p className="max-w-xl text-sm leading-7 text-muted">{content.description}</p>
          </div>
          <Link href={localizeHref("/guide", locale)} prefetch={false} className="inline-flex min-h-11 items-center gap-2 text-sm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            {content.guideLabel}
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </div>
        <GettingStartedSteps locale={locale} />
        <div className="mt-12 grid gap-5 border-t border-border pt-8 md:grid-cols-[1fr_2fr] md:gap-10">
          <h2 className="text-xl leading-snug">{content.faqTitle}</h2>
          <div className="divide-y divide-border">
            {content.questions.map(({ question, answer }) => (
              <details key={question} className="group py-2 first:pt-0">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-details-marker]:hidden">
                  {question}
                  <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-muted group-open:rotate-180" />
                </summary>
                <p className="max-w-2xl pb-3 pr-8 text-sm leading-7 text-muted">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
