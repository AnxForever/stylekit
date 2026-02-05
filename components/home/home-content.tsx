"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { StyleCard } from "@/components/home/style-card";
import { FeaturedCarousel } from "@/components/home/featured-carousel";
import type { StyleMeta } from "@/lib/styles/meta";

interface HomeContentProps {
  styles: StyleMeta[];
}

export function HomeContent({ styles }: HomeContentProps) {
  const { t } = useI18n();
  const featuredStyles = styles.slice(0, 8);

  const workflows = [
    {
      id: "Path A",
      title: t("home.pathA.title"),
      description: t("home.pathA.desc"),
      steps: [t("home.pathA.step1"), t("home.pathA.step2"), t("home.pathA.step3")],
      links: ["/create-style", "/generate"],
    },
    {
      id: "Path B",
      title: t("home.pathB.title"),
      description: t("home.pathB.desc"),
      steps: [t("home.pathB.step1"), t("home.pathB.step2"), t("home.pathB.step3")],
      links: ["/styles", "/generate"],
    },
  ] as const;

  return (
    <>
      <section className="relative border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-4">{t("home.subtitle")}</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
                {t("home.title.line1")}
                <br />
                {t("home.title.line2")}
                <br />
                <span className="italic">{t("home.title.line3")}</span>
              </h1>
              <p className="text-lg text-muted leading-relaxed max-w-md mb-8">{t("home.description")}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/create-style"
                  className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
                >
                  {t("home.ctaPathA")}
                </Link>
                <Link
                  href="/styles"
                  className="inline-flex items-center justify-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
                >
                  {t("home.ctaPathB")}
                </Link>
                <Link
                  href="/generate"
                  className="inline-flex items-center justify-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
                >
                  {t("home.ctaGenerate")}
                </Link>
              </div>
            </div>

            <FeaturedCarousel styles={styles} />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase text-muted mb-2">{t("home.flowLabel")}</p>
            <h2 className="text-2xl md:text-3xl">{t("home.flowTitle")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="p-6 border border-border space-y-4">
                <p className="text-xs tracking-widest uppercase text-muted">{workflow.id}</p>
                <h3 className="text-lg">{workflow.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{workflow.description}</p>
                <ul className="space-y-2 text-sm text-muted">
                  {workflow.steps.map((step) => (
                    <li key={step} className="flex gap-2">
                      <span className="text-foreground">-</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-1">
                  {workflow.links.map((href) => (
                    <Link
                      key={href}
                      href={href}
                      className="inline-flex items-center justify-center px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors"
                    >
                      {href}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-2">{t("home.styleCollection")}</p>
              <h2 className="text-2xl md:text-3xl">{t("home.styleCatalog")}</h2>
            </div>
            <Link href="/styles" className="text-sm text-muted hover:text-foreground transition-colors">
              {t("home.viewAll")} -&gt;
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {featuredStyles.map((style) => (
              <StyleCard key={style.slug} style={style} variant="compact" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
