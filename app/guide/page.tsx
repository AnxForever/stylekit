"use client";

export const dynamic = "force-static";

import { ArrowRight, Code2, Palette, WandSparkles } from "lucide-react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useI18n } from "@/lib/i18n/context";

export default function GuidePage() {
  const { t } = useI18n();

  const steps = [
    {
      id: "01",
      icon: Palette,
      title: t("guide.step1.title"),
      description: t("guide.step1.desc"),
      href: "/create-style",
      cta: t("guide.step1.cta"),
    },
    {
      id: "02",
      icon: Code2,
      title: t("guide.step2.title"),
      description: t("guide.step2.desc"),
      href: "/generate",
      cta: t("guide.step2.cta"),
    },
    {
      id: "03",
      icon: WandSparkles,
      title: t("guide.step3.title"),
      description: t("guide.step3.desc"),
      href: "/generate",
      cta: t("guide.step3.cta"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">{t("guide.badge")}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">{t("guide.heading")}</h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-3xl">{t("guide.subheading")}</p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {steps.map((step) => (
                <article key={step.id} className="border border-border p-6 bg-background">
                  <p className="text-xs tracking-widest uppercase text-muted mb-4">{step.id}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <step.icon className="w-5 h-5" />
                    <h2 className="text-xl font-medium">{step.title}</h2>
                  </div>
                  <p className="text-sm text-muted leading-relaxed mb-6">{step.description}</p>
                  <LocalizedLink
                    href={step.href}
                    className="inline-flex items-center gap-2 text-sm border border-border px-3 py-2 hover:border-foreground transition-colors"
                  >
                    {step.cta}
                    <ArrowRight className="w-4 h-4" />
                  </LocalizedLink>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
