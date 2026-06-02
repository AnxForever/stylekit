"use client";

import { Search, Download, Layers } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { RevealOnScroll } from "@/components/home/reveal-on-scroll";
import type { LucideIcon } from "lucide-react";
import type { TranslationKey } from "@/lib/i18n/translations";

interface Step {
  number: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  icon: LucideIcon;
}

const steps: Step[] = [
  { number: "01", titleKey: "home.howItWorks.step1.title", descKey: "home.howItWorks.step1.desc", icon: Search },
  { number: "02", titleKey: "home.howItWorks.step2.title", descKey: "home.howItWorks.step2.desc", icon: Download },
  { number: "03", titleKey: "home.howItWorks.step3.title", descKey: "home.howItWorks.step3.desc", icon: Layers },
];

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section className="relative border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16">
        <RevealOnScroll variant="soft" className="mb-6 sm:mb-8">
          <p className="text-[11px] tracking-[0.16em] uppercase text-muted mb-2">
            {t("home.howItWorks.label")}
          </p>
          <h2 className="text-[1.6rem] sm:text-2xl md:text-3xl leading-tight tracking-tight">
            {t("home.howItWorks.title")}
          </h2>
        </RevealOnScroll>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <RevealOnScroll
                key={step.number}
                variant="upStrong"
                delayMs={100 + index * 70}
                disableDelayOnMobile
              >
                <article className="group relative min-w-[16.5rem] snap-start border border-border bg-background/70 p-4 sm:p-5 md:min-w-0 md:p-6 motion-safe:transition-[border-color,transform] motion-safe:duration-200 hover:border-foreground motion-safe:hover:-translate-y-0.5">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] tracking-[0.16em] text-muted tabular-nums">
                      {step.number}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                    <div className="w-8 h-8 border border-border flex items-center justify-center text-muted group-hover:text-foreground group-hover:border-foreground transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <h3 className="text-lg leading-snug mb-1.5">{t(step.titleKey)}</h3>
                  <p className="text-sm text-muted leading-relaxed">{t(step.descKey)}</p>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
