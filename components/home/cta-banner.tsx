"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { RevealOnScroll } from "@/components/home/reveal-on-scroll";

const GITHUB_URL = "https://github.com/AnxForever/stylekit";

export function CTABanner() {
  const { t } = useI18n();

  return (
    <section className="relative border-b border-border bg-zinc-950 dark:bg-zinc-900/40">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20">
        <RevealOnScroll variant="soft">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-[1.6rem] sm:text-2xl md:text-3xl leading-tight tracking-tight text-white mb-3">
              {t("home.cta.title")}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-6 sm:mb-8">
              {t("home.cta.description")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/styles"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-zinc-950 text-sm tracking-wide hover:bg-zinc-200 transition-colors"
              >
                {t("home.cta.browseStyles")}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-zinc-700 text-zinc-300 text-sm tracking-wide hover:border-zinc-500 hover:text-white transition-colors"
              >
                {t("home.cta.viewGitHub")}
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
