"use client";

import Link from "next/link";
import { ArrowRight, Code2, Palette, WandSparkles } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useI18n } from "@/lib/i18n/context";

export default function GuidePage() {
  const { locale } = useI18n();

  const title = locale === "zh" ? "使用指南" : "Guide";
  const heading = locale === "zh" ? "3 步完成前端生成" : "Generate Frontend in 3 Steps";
  const subheading =
    locale === "zh"
      ? "从风格选择到代码下载，StyleKit 现在聚焦为更直接的三步流程。"
      : "From style selection to code download, StyleKit now focuses on a direct 3-step flow.";

  const steps = [
    {
      id: "01",
      icon: Palette,
      title: locale === "zh" ? "选择或导入风格" : "Choose or Import Style",
      description:
        locale === "zh"
          ? "在风格库中选择预设风格，或在创建风格页粘贴 style-extractor 输出 / 输入 URL 导入风格。"
          : "Choose a built-in style from the library, or import one in Create Style from style-extractor output or a URL.",
      href: "/create-style",
      cta: locale === "zh" ? "前往创建/导入" : "Open Create/Import",
    },
    {
      id: "02",
      icon: Code2,
      title: locale === "zh" ? "选择模板与格式" : "Choose Template and Format",
      description:
        locale === "zh"
          ? "进入生成器选择页面模板（Landing/Portfolio）和输出格式（HTML 或 React + Tailwind）。"
          : "In Generator, pick a template (Landing/Portfolio) and output format (HTML or React + Tailwind).",
      href: "/generate",
      cta: locale === "zh" ? "打开生成器" : "Open Generator",
    },
    {
      id: "03",
      icon: WandSparkles,
      title: locale === "zh" ? "编辑内容并下载" : "Edit Content and Download",
      description:
        locale === "zh"
          ? "在同一步里编辑内容并实时预览，确认后直接下载 ZIP 代码包。"
          : "Edit content with live preview in the same step, then download the ZIP package.",
      href: "/generate",
      cta: locale === "zh" ? "开始生成代码" : "Start Generating",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">{title}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">{heading}</h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-3xl">{subheading}</p>
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
                  <Link
                    href={step.href}
                    className="inline-flex items-center gap-2 text-sm border border-border px-3 py-2 hover:border-foreground transition-colors"
                  >
                    {step.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <div className="border border-border p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl mb-2">
                  {locale === "zh" ? "需要 API / MCP 集成？" : "Need API / MCP Integration?"}
                </h3>
                <p className="text-muted">
                  {locale === "zh"
                    ? "查看开发者页面，获取 API、CLI、MCP 的接入方式。"
                    : "Open the developers page for API, CLI, and MCP integration details."}
                </p>
              </div>
              <Link
                href="/developers"
                className="inline-flex items-center justify-center px-5 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
              >
                {locale === "zh" ? "查看开发者文档" : "Open Developers"}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
