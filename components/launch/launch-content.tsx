"use client";

import Link from "next/link";
import { ArrowRight, Github, Palette, Sparkles, Terminal } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { GITHUB_REPO_URL } from "@/lib/github-stars";
import { localizeHref } from "@/lib/i18n/routing";
import { trackEvent } from "@/lib/analytics/events";
import { RevealOnScroll } from "@/components/home/reveal-on-scroll";

const workflowSteps = [
  { number: "01", icon: Palette, title: "launch.step1.title", description: "launch.step1.desc" },
  { number: "02", icon: Sparkles, title: "launch.step2.title", description: "launch.step2.desc" },
  { number: "03", icon: Terminal, title: "launch.step3.title", description: "launch.step3.desc" },
] as const;

const compatibleTools = ["Cursor", "Claude Code", "Codex", "v0", "Tailwind", "shadcn/ui"];

export function LaunchContent() {
  const { t, locale } = useI18n();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-zinc-50/60 dark:bg-zinc-900/25">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-foreground/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.42)_48%,transparent_70%)] dark:bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.04)_48%,transparent_70%)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-32">
          <div className="grid gap-12 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:items-end md:gap-16 lg:gap-24">
            <RevealOnScroll instant>
              <div className="mb-6 flex items-center gap-3">
                <span aria-hidden className="h-px w-10 bg-accent" />
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("launch.eyebrow")}</p>
              </div>
              <h1 className="max-w-[12ch] text-[2.9rem] leading-[0.96] tracking-tight sm:text-6xl md:text-[5.2rem]">
                {t("launch.title.line1")}
                <br />
                <em className="font-normal">{t("launch.title.line2")}</em>
              </h1>
              <p className="mt-7 max-w-xl text-[15px] leading-8 text-muted sm:text-lg">
                {t("launch.description")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={localizeHref("/styles", locale)}
                  onClick={() => trackEvent("cta_click", { label: "launch_browse_styles", location: "launch_hero" })}
                  className="group inline-flex min-h-12 items-center gap-2 bg-foreground px-5 text-sm tracking-wide text-background transition-colors hover:bg-accent"
                >
                  {t("launch.primaryCta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("github_click", { location: "launch_hero" })}
                  className="inline-flex min-h-12 items-center gap-2 border border-foreground/30 px-5 text-sm tracking-wide transition-colors hover:border-foreground hover:bg-background"
                >
                  <Github className="h-4 w-4" />
                  {t("launch.secondaryCta")}
                </a>
              </div>
            </RevealOnScroll>

            <RevealOnScroll instant className="md:justify-self-end md:w-full">
              <div className="border border-border bg-background/80 p-5 shadow-[0_30px_80px_-48px_rgba(0,0,0,0.4)] backdrop-blur sm:p-7">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{t("launch.proofLabel")}</span>
                  <span aria-hidden className="h-2 w-2 rounded-full bg-accent shadow-[0_0_0_5px_color-mix(in_srgb,var(--accent)_15%,transparent)]" />
                </div>
                <div className="grid gap-3 pt-5 sm:grid-cols-3 sm:gap-4">
                  {[
                    { value: "143+", label: t("launch.proofStyles") },
                    { value: "AI", label: t("launch.proofRules") },
                    { value: "MIT", label: t("launch.proofOpenSource") },
                  ].map((item) => (
                    <div key={item.label} className="border border-border/80 p-4">
                      <p className="font-mono text-2xl tracking-tight">{item.value}</p>
                      <p className="mt-2 text-xs leading-5 text-muted">{item.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 border-t border-border pt-5">
                  <div className="flex flex-wrap gap-2">
                    {compatibleTools.map((tool) => (
                      <span key={tool} className="border border-border px-2.5 py-1.5 text-[11px] text-muted">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
          <RevealOnScroll variant="soft">
            <div className="max-w-2xl">
              <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-muted">{t("launch.workflowLabel")}</p>
              <h2 className="text-[2rem] leading-tight tracking-tight sm:text-4xl">{t("launch.workflowTitle")}</h2>
              <p className="mt-5 text-[15px] leading-7 text-muted sm:text-base">{t("launch.workflowDescription")}</p>
            </div>
          </RevealOnScroll>

          <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <RevealOnScroll key={step.number} variant="upSubtle" delayMs={index * 70} disableDelayOnMobile>
                  <article className="h-full bg-background p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                      <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                      <span className="font-mono text-xs tabular-nums text-muted">{step.number}</span>
                    </div>
                    <h3 className="mt-14 text-xl tracking-tight">{t(step.title)}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{t(step.description)}</p>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-18 md:grid-cols-[1fr_auto] md:items-center md:px-12 md:py-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-background/50">{t("launch.githubLabel")}</p>
            <h2 className="mt-4 max-w-2xl text-2xl leading-tight tracking-tight sm:text-4xl">{t("launch.githubTitle")}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-background/60 sm:text-base">{t("launch.githubDescription")}</p>
          </div>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("github_click", { location: "launch_open_source" })}
            className="group inline-flex min-h-12 items-center justify-center gap-2 border border-background/30 px-5 text-sm tracking-wide transition-colors hover:border-background hover:bg-background hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            {t("launch.githubCta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 sm:px-6 sm:py-20 md:flex-row md:items-center md:justify-between md:px-12">
          <h2 className="max-w-xl text-3xl leading-tight tracking-tight sm:text-5xl">{t("launch.finalTitle")}</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={localizeHref("/styles", locale)}
              onClick={() => trackEvent("cta_click", { label: "launch_final_browse", location: "launch_footer" })}
              className="group inline-flex min-h-12 items-center gap-2 bg-foreground px-5 text-sm tracking-wide text-background transition-colors hover:bg-accent"
            >
              {t("launch.finalCta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={localizeHref("/guide", locale)}
              onClick={() => trackEvent("cta_click", { label: "launch_guide", location: "launch_footer" })}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {t("launch.finalSecondary")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
