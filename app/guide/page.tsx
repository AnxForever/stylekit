"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useI18n } from "@/lib/i18n/context";
import { QuickExport } from "@/components/home/quick-export";
import { FileCode, Clipboard, Sparkles, ArrowRight } from "lucide-react";

export default function GuidePage() {
  const { t, locale } = useI18n();

  const steps = [
    {
      number: "01",
      icon: FileCode,
      title: locale === "zh" ? "选择设计风格" : "Choose a Design Style",
      description:
        locale === "zh"
          ? "浏览风格目录，选择适合你项目的设计风格。每个风格都有完整的文档、配色方案和组件模板。"
          : "Browse the style catalog and choose a design style that fits your project. Each style includes complete documentation, color palette, and component templates.",
    },
    {
      number: "02",
      icon: Clipboard,
      title: locale === "zh" ? "导出 AI Rules" : "Export AI Rules",
      description:
        locale === "zh"
          ? "选择你使用的 AI 工具（Cursor、Claude Code、Trae），一键复制对应格式的规则文件。"
          : "Select your AI tool (Cursor, Claude Code, Trae) and copy the rules file in the corresponding format with one click.",
    },
    {
      number: "03",
      icon: Sparkles,
      title: locale === "zh" ? "开始生成代码" : "Start Generating Code",
      description:
        locale === "zh"
          ? "将规则粘贴到你的 AI 工具中，然后用自然语言描述你想要的界面，AI 会按照风格规范生成代码。"
          : "Paste the rules into your AI tool, then describe the interface you want in natural language. The AI will generate code following the style guidelines.",
    },
  ];

  const tools = [
    {
      name: "Cursor",
      file: ".cursorrules",
      description:
        locale === "zh"
          ? "在项目根目录创建 .cursorrules 文件，粘贴规则内容"
          : "Create a .cursorrules file in your project root and paste the rules",
      color: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      name: "Claude Code",
      file: "CLAUDE.md",
      description:
        locale === "zh"
          ? "在项目根目录创建 CLAUDE.md 文件，粘贴规则内容"
          : "Create a CLAUDE.md file in your project root and paste the rules",
      color: "bg-orange-100 dark:bg-orange-900/30",
    },
    {
      name: "Trae",
      file: "trae-rules.md",
      description:
        locale === "zh"
          ? "在项目根目录创建 trae-rules.md 文件，粘贴规则内容"
          : "Create a trae-rules.md file in your project root and paste the rules",
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
  ];

  const examplePrompts = [
    {
      title: locale === "zh" ? "着陆页" : "Landing Page",
      prompt:
        locale === "zh"
          ? "用这个风格生成一个 SaaS 产品着陆页，包含 Hero 区域、特性展示、定价表和底部 CTA"
          : "Generate a SaaS product landing page with this style, including Hero section, features showcase, pricing table, and footer CTA",
    },
    {
      title: locale === "zh" ? "仪表盘" : "Dashboard",
      prompt:
        locale === "zh"
          ? "用这个风格创建一个数据仪表盘，包含统计卡片、图表区域和侧边导航"
          : "Create a data dashboard with this style, including stat cards, chart area, and sidebar navigation",
    },
    {
      title: locale === "zh" ? "表单页面" : "Form Page",
      prompt:
        locale === "zh"
          ? "用这个风格设计一个多步骤注册表单，包含进度指示器、表单验证和成功状态"
          : "Design a multi-step registration form with this style, including progress indicator, form validation, and success state",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {locale === "zh" ? "使用指南" : "User Guide"}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              {locale === "zh"
                ? "如何使用 StyleKit"
                : "How to Use StyleKit"}
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
              {locale === "zh"
                ? "3 个简单步骤，让你的 AI 编码助手按照统一的设计风格生成代码"
                : "3 simple steps to make your AI coding assistant generate code following a consistent design style"}
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-8 -right-6 w-5 h-5 text-muted" />
                  )}
                  <div className="text-6xl font-light text-zinc-200 dark:text-zinc-800 mb-4">
                    {step.number}
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon className="w-5 h-5 text-muted" />
                    <h3 className="text-xl font-medium">{step.title}</h3>
                  </div>
                  <p className="text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Export */}
        <section className="border-b border-border bg-zinc-50 dark:bg-zinc-900/30">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div>
                <p className="text-xs tracking-widest uppercase text-muted mb-4">
                  {locale === "zh" ? "快速开始" : "Quick Start"}
                </p>
                <h2 className="text-2xl md:text-3xl mb-4">
                  {locale === "zh"
                    ? "立即导出 AI Rules"
                    : "Export AI Rules Now"}
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  {locale === "zh"
                    ? "选择一个风格和你的 AI 工具，一键复制规则文件。"
                    : "Select a style and your AI tool, copy the rules file with one click."}
                </p>
                <Link
                  href="/styles"
                  className="inline-flex items-center text-sm text-muted hover:text-foreground transition-colors"
                >
                  {locale === "zh" ? "浏览所有风格" : "Browse All Styles"} →
                </Link>
              </div>
              <QuickExport />
            </div>
          </div>
        </section>

        {/* AI Tools Configuration */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {locale === "zh" ? "工具配置" : "Tool Configuration"}
            </p>
            <h2 className="text-2xl md:text-3xl mb-8">
              {locale === "zh"
                ? "如何配置你的 AI 工具"
                : "How to Configure Your AI Tool"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className={`p-6 border border-border ${tool.color}`}
                >
                  <h3 className="text-lg font-medium mb-2">{tool.name}</h3>
                  <code className="text-sm text-muted bg-zinc-200 dark:bg-zinc-800 px-2 py-1">
                    {tool.file}
                  </code>
                  <p className="text-sm text-muted mt-4 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example Prompts */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {locale === "zh" ? "示例 Prompts" : "Example Prompts"}
            </p>
            <h2 className="text-2xl md:text-3xl mb-4">
              {locale === "zh"
                ? "尝试这些 Prompts"
                : "Try These Prompts"}
            </h2>
            <p className="text-muted mb-8 max-w-2xl">
              {locale === "zh"
                ? "配置好 AI Rules 后，可以用以下 Prompts 开始生成代码："
                : "After configuring AI Rules, you can use these prompts to start generating code:"}
            </p>
            <div className="space-y-4">
              {examplePrompts.map((example) => (
                <div
                  key={example.title}
                  className="p-4 border border-border bg-zinc-50 dark:bg-zinc-900/50"
                >
                  <div className="text-xs tracking-widest uppercase text-muted mb-2">
                    {example.title}
                  </div>
                  <p className="text-sm leading-relaxed">{example.prompt}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 text-center">
            <h2 className="text-2xl md:text-3xl mb-4">
              {locale === "zh" ? "准备好了吗？" : "Ready to Start?"}
            </h2>
            <p className="text-muted mb-8 max-w-md mx-auto">
              {locale === "zh"
                ? "浏览我们的风格目录，找到适合你项目的设计风格。"
                : "Browse our style catalog and find the perfect design style for your project."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/styles"
                className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
              >
                {locale === "zh" ? "浏览风格" : "Browse Styles"}
              </Link>
              <Link
                href="/components"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
              >
                {locale === "zh" ? "查看组件" : "View Components"}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
