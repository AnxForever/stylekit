"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart, QrCode, Server } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { localizeHref } from "@/lib/i18n/routing";
import { supportMethods, supportLinks, supportPageCopy } from "@/lib/site/support";
import { ThankYouList } from "@/components/support/thank-you-list";
import { FeedbackForm } from "@/components/feedback/feedback-form";

export function SupportContent() {
  const { locale } = useI18n();
  const copy = supportPageCopy[locale];

  return (
    <div className="grid gap-10 md:gap-14">
      <section id="feedback" className="grid gap-5 scroll-mt-24">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.28em] text-muted">
            {locale === "zh" ? "提意见" : "Feedback"}
          </p>
          <h2 className="mt-3 text-2xl leading-tight md:text-3xl">
            {locale === "zh"
              ? "有想法，或发现了问题？"
              : "Have an idea or spotted something off?"}
          </h2>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted">
            {locale === "zh"
              ? "直接在这儿给我留言，想要回复就留个邮箱，意见会发到我邮箱。"
              : "Drop a message here. Leave an email if you'd like a reply — it lands straight in my inbox."}
          </p>
        </div>
        <div className="max-w-xl">
          <FeedbackForm />
        </div>
      </section>

      <section
        id="support-maintenance"
        className="relative overflow-hidden rounded-[28px] border border-border bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.1),transparent_34%)] p-6 md:p-8"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        <p className="mb-3 text-xs uppercase tracking-[0.32em] text-muted">
          {copy.eyebrow}
        </p>
        <h2 className="max-w-2xl text-2xl leading-tight md:text-3xl">
          {copy.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          {copy.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href={localizeHref("/contact#support-channels", locale)}
            className="inline-flex items-center gap-2 rounded-full border border-foreground px-4 py-1.5 text-sm transition-colors hover:bg-foreground hover:text-background"
          >
            <Heart className="h-4 w-4" />
            {locale === "zh" ? "查看支持方式" : "View support options"}
          </Link>
          <a
            href="https://github.com/AnxForever/stylekit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-muted transition-colors hover:border-foreground hover:text-foreground"
          >
            {locale === "zh" ? "前往仓库" : "Open repository"}
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <span className="inline-flex items-center gap-2 text-xs text-muted">
            <Server className="h-3.5 w-3.5 shrink-0" />
            {copy.highlights.join(" · ")}
          </span>
        </div>
      </section>

      <ThankYouList />

      <section id="support-channels" className="grid gap-4">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-muted">
            {copy.methodsTitle}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            {copy.methodsDescription}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {supportMethods.map((method) => {
            const title = method.title[locale];
            const description = method.description[locale];
            const badge = method.badge[locale];
            const note = method.note?.[locale];
            const actionLabel = method.actionLabel?.[locale];

            return (
              <article
                key={method.id}
                className="flex h-full flex-col rounded-[24px] border border-border bg-background p-5 shadow-[0_10px_40px_-30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-3 flex items-center justify-between gap-4">
                  <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-muted">
                    {badge}
                  </span>
                  {method.kind === "qr" ? (
                    <QrCode className="h-4 w-4 text-muted" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-muted" />
                  )}
                </div>

                <h3 className="text-lg leading-tight">{title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-muted">{description}</p>

                {method.kind === "qr" && method.imageSrc && method.imageAlt ? (
                  <div className="mx-auto mt-4 w-full max-w-[220px] overflow-hidden rounded-[20px] border border-border bg-zinc-50 p-2.5 dark:bg-zinc-900/60">
                    <div className="relative aspect-square overflow-hidden rounded-[14px] bg-white">
                      <Image
                        src={method.imageSrc}
                        alt={method.imageAlt[locale]}
                        fill
                        className="object-contain"
                        sizes="220px"
                      />
                    </div>
                  </div>
                ) : null}

                {method.kind === "link" && method.href && actionLabel ? (
                  <a
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-accent"
                  >
                    {actionLabel}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}

                {note ? <p className="mt-auto pt-4 text-[11px] leading-5 text-muted">{note}</p> : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-[20px] border border-border bg-background/70 p-5">
        <p className="text-[11px] uppercase tracking-[0.24em] text-muted">
          {copy.transparencyTitle}
        </p>
        <ul className="mt-2.5 grid gap-1.5">
          {copy.transparencyItems.map((item) => (
            <li key={item} className="text-xs leading-5 text-muted">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        {supportLinks.map((link) => {
          const title = link.title[locale];
          const description = link.description[locale];
          const actionLabel = link.actionLabel[locale];
          const classes =
            "flex items-center justify-between gap-4 rounded-[16px] border border-border px-4 py-3 hover:border-foreground transition-colors";
          const content = (
            <>
              <div>
                <h2 className="text-sm mb-0.5">{title}</h2>
                <p className="text-xs text-muted leading-5">{description}</p>
              </div>
              <span className="shrink-0 text-xs text-muted">{actionLabel}</span>
            </>
          );

          return link.external ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={classes}
            >
              {content}
            </a>
          ) : (
            <Link
              key={link.href}
              href={localizeHref(link.href, locale)}
              className={classes}
            >
              {content}
            </Link>
          );
        })}
      </section>
    </div>
  );
}
