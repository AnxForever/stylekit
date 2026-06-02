"use client";

import {
  BookOpen,
  Code2,
  Combine,
  FileCode,
  Layers,
  LayoutGrid,
  Move3d,
  Palette,
  Puzzle,
  Terminal,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function DocsContent() {
  const { t } = useI18n();

  return (
    <main className="flex-1">
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("docs.badge")}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
            {t("docs.heading")}
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed max-w-3xl">
            {t("docs.subheading")}
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5" />
            <h2 className="text-2xl md:text-3xl">{t("docs.gettingStarted")}</h2>
          </div>
          <p className="text-muted mb-8 max-w-3xl">
            {t("docs.gettingStartedDesc")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: t("docs.step1.title"), desc: t("docs.step1.desc"), icon: Palette },
              { num: "02", title: t("docs.step2.title"), desc: t("docs.step2.desc"), icon: FileCode },
              { num: "03", title: t("docs.step3.title"), desc: t("docs.step3.desc"), icon: Code2 },
            ].map((step) => (
              <div key={step.num} className="border border-border p-6">
                <p className="text-xs tracking-widest uppercase text-muted mb-3">{step.num}</p>
                <div className="flex items-center gap-2 mb-2">
                  <step.icon className="w-4 h-4" />
                  <h3 className="text-lg font-medium">{step.title}</h3>
                </div>
                <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-5 h-5" />
            <h2 className="text-2xl md:text-3xl">{t("docs.styleSystem")}</h2>
          </div>
          <p className="text-muted mb-8">{t("docs.styleSystemDesc")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { title: t("docs.visual"), desc: t("docs.visualDesc"), icon: Palette, color: "bg-blue-600" },
              { title: t("docs.layout"), desc: t("docs.layoutDesc"), icon: LayoutGrid, color: "bg-green-600" },
              { title: t("docs.animation"), desc: t("docs.animationDesc"), icon: Move3d, color: "bg-purple-600" },
            ].map((cat) => (
              <div key={cat.title} className="border border-border p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`w-8 h-8 ${cat.color} flex items-center justify-center`}>
                    <cat.icon className="w-4 h-4 text-white" />
                  </span>
                  <h3 className="text-lg font-medium">{cat.title}</h3>
                </div>
                <p className="text-sm text-muted leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
          <div className="border border-border p-6">
            <div className="flex items-center gap-2 mb-2">
              <Combine className="w-4 h-4" />
              <h3 className="text-lg font-medium">{t("docs.combining")}</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed">{t("docs.combiningDesc")}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2">
            <Code2 className="w-5 h-5" />
            <h2 className="text-2xl md:text-3xl">{t("docs.tokenSystem")}</h2>
          </div>
          <p className="text-muted mb-6 max-w-3xl">{t("docs.tokenSystemDesc")}</p>
          <div className="border border-border p-6">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("docs.tokenCategories")}
            </p>
            <ul className="space-y-2">
              {[
                t("docs.tokenBorder"),
                t("docs.tokenShadow"),
                t("docs.tokenTypography"),
                t("docs.tokenSpacing"),
                t("docs.tokenColors"),
                t("docs.tokenForbidden"),
                t("docs.tokenRequired"),
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2">
            <Puzzle className="w-5 h-5" />
            <h2 className="text-2xl md:text-3xl">{t("docs.recipeSystem")}</h2>
          </div>
          <p className="text-muted mb-6 max-w-3xl">{t("docs.recipeSystemDesc")}</p>
          <div className="border border-border p-6">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("docs.recipeComponents")}
            </p>
            <ul className="space-y-2">
              {[
                t("docs.recipeSkeleton"),
                t("docs.recipeParams"),
                t("docs.recipeVariants"),
                t("docs.recipeSlots"),
                t("docs.recipeStates"),
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-5 h-5" />
            <h2 className="text-2xl md:text-3xl">{t("docs.integration")}</h2>
          </div>
          <p className="text-muted mb-8">{t("docs.integrationDesc")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: t("docs.cursorTitle"), desc: t("docs.cursorDesc") },
              { title: t("docs.claudeTitle"), desc: t("docs.claudeDesc") },
              { title: t("docs.v0Title"), desc: t("docs.v0Desc") },
              { title: t("docs.genericTitle"), desc: t("docs.genericDesc") },
            ].map((tool) => (
              <div key={tool.title} className="border border-border p-5">
                <h3 className="text-sm font-medium mb-2">{tool.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
