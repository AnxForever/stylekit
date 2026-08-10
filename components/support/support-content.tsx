"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart, QrCode, Server } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { localizeHref } from "@/lib/i18n/routing";
import { supportMethods, supportLinks, supportPageCopy } from "@/lib/site/support";
import { ThankYouList } from "@/components/support/thank-you-list";
import { FeedbackForm } from "@/components/feedback/feedback-form";
import type { ThankYouEntry } from "@/lib/site/support";

export const supportRailLabelClassName =
  "font-mono text-[10px] uppercase tracking-[0.28em] text-muted";

function SectionRail({ index, label }: { index: string; label: string }) {
  return (
    <p className={supportRailLabelClassName}>
      <span className="tabular-nums text-muted/70">{index}</span>
      <span className="mx-2 text-muted/50">·</span>
      {label}
    </p>
  );
}

export function SupportContent({ thankYouEntries }: { thankYouEntries: ThankYouEntry[] }) {
  const { locale } = useI18n();
  const copy = supportPageCopy[locale];

  return (
    <div>
      <section
        id="feedback"
        className="scroll-mt-24 py-10 md:grid md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 md:py-14"
      >
        <div className="mb-4 md:mb-0">
          <SectionRail index="01" label={locale === "zh" ? "提意见" : "Feedback"} />
        </div>
        <div>
          <h2 className="text-2xl leading-tight md:text-3xl">
            {locale === "zh"
              ? "有想法，或发现了问题？"
              : "Have an idea or spotted something off?"}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            {locale === "zh"
              ? "直接在这儿给我留言，想要回复就留个邮箱，意见会发到我邮箱。"
              : "Drop a message here. Leave an email if you'd like a reply — it lands straight in my inbox."}
          </p>
          <div className="mt-6 max-w-xl">
            <FeedbackForm />
          </div>
        </div>
      </section>

      <section
        id="support-maintenance"
        className="scroll-mt-24 border-t border-border py-10 md:grid md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 md:py-14"
      >
        <div className="mb-4 md:mb-0">
          <SectionRail index="02" label={copy.eyebrow} />
        </div>
        <div>
          <h2 className="max-w-2xl text-2xl leading-tight md:text-3xl">{copy.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{copy.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={localizeHref("/contact#support-channels", locale)}
              className="inline-flex items-center gap-2 border border-foreground bg-foreground px-4 py-2 text-sm text-background transition-colors hover:bg-transparent hover:text-foreground"
            >
              <Heart className="h-4 w-4" />
              {locale === "zh" ? "查看支持方式" : "View support options"}
            </Link>
            <a
              href="https://github.com/AnxForever/stylekit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-foreground hover:text-foreground"
            >
              {locale === "zh" ? "前往仓库" : "Open repository"}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-5 inline-flex items-start gap-2 font-mono text-[11px] leading-5 text-muted">
            <Server className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {copy.highlights.join(" · ")}
          </p>
        </div>
      </section>

      <ThankYouList entries={thankYouEntries} />

      <section
        id="support-channels"
        className="scroll-mt-24 border-t border-border py-10 md:grid md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 md:py-14"
      >
        <div className="mb-4 md:mb-0">
          <SectionRail index="04" label={copy.methodsTitle} />
        </div>
        <div>
          <p className="max-w-2xl text-sm leading-6 text-muted">{copy.methodsDescription}</p>

          <div className="mt-6 grid border border-border md:grid-cols-2">
            {supportMethods.map((method, i) => {
              const title = method.title[locale];
              const description = method.description[locale];
              const badge = method.badge[locale];
              const note = method.note?.[locale];
              const actionLabel = method.actionLabel?.[locale];

              return (
                <article
                  key={method.id}
                  className={`flex h-full flex-col border-border p-5 ${i > 0 ? "border-t" : ""} ${i % 2 === 1 ? "md:border-l" : ""} ${i >= 2 ? "md:border-t" : "md:border-t-0"}`}
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
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
                    <div className="mx-auto mt-5 w-full max-w-[200px] border border-border bg-white p-2.5">
                      <div className="relative aspect-square bg-white">
                        <Image
                          src={method.imageSrc}
                          alt={method.imageAlt[locale]}
                          fill
                          className="object-contain"
                          sizes="200px"
                        />
                      </div>
                    </div>
                  ) : null}

                  {method.kind === "link" && method.href && actionLabel ? (
                    <a
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-5 inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-accent"
                    >
                      {actionLabel}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ) : null}

                  {note ? (
                    <p className="mt-auto pt-4 text-[11px] leading-5 text-muted">{note}</p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-10 md:grid md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 md:py-14">
        <div className="mb-4 md:mb-0">
          <SectionRail index="05" label={copy.transparencyTitle} />
        </div>
        <div>
          <ul className="grid max-w-2xl gap-2">
            {copy.transparencyItems.map((item) => (
              <li
                key={item}
                className="border-l border-border pl-4 text-xs leading-5 text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="grid border-t border-border md:grid-cols-2">
        {supportLinks.map((link, i) => {
          const title = link.title[locale];
          const description = link.description[locale];
          const actionLabel = link.actionLabel[locale];
          const classes = `group flex items-center justify-between gap-4 py-6 transition-colors hover:bg-foreground/[0.03] ${
            i > 0 ? "border-t border-border md:border-t-0 md:border-l md:pl-8" : "md:pr-8"
          }`;
          const content = (
            <>
              <div>
                <h2 className="mb-0.5 text-sm">{title}</h2>
                <p className="text-xs leading-5 text-muted">{description}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors group-hover:text-foreground">
                {actionLabel}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
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
            <Link key={link.href} href={localizeHref(link.href, locale)} className={classes}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
