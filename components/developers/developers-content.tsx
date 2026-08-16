"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Boxes,
  Sparkles,
  Terminal,
  Zap,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { RevealOnScroll } from "@/components/home/reveal-on-scroll";
import {
  getDeveloperToolkitCapability,
  type DeveloperToolkitState,
} from "@/lib/developer-toolkit";

const ICONS = [Boxes, Sparkles, Terminal, Zap] as const;

const COPY = {
  en: {
    label: "For developers",
    title: "Use StyleKit in your workflow",
    intro:
      "Every style ships as design tokens you can install through shadcn. Public beta CLI and MCP packages are available today, with newer repository candidates for contributors.",
    note: "These install a style's color theme — design tokens for light and dark. The component code is yours to build.",
    browse: "Browse all 146 styles",
    docs: "Docs",
    status: "Status",
    verified: "Verified",
    coreTitle: "Shared foundation",
    coreDescription:
      "The public beta Core Package powers the CLI and MCP catalog queries, tokens, recipes, and accessibility helpers.",
    copyCommand: "Copy command",
    copiedCommand: "Command copied",
    cards: [
      {
        id: "registry",
        name: "shadcn registry",
        desc: "Drop any style's theme into an existing shadcn project with a single command.",
        foot: "Injects light + dark cssVars · Tailwind v4 ready",
      },
      {
        id: "mcp",
        name: "MCP server",
        desc: "Run the public beta MCP package over stdio from a compatible AI client.",
        foot: "Five read-only tools · offline catalog",
      },
      {
        id: "cli",
        name: "CLI",
        desc: "Browse styles and print tokens, recipes, or shadcn install commands from your terminal.",
        foot: "Public beta · offline catalog",
      },
      {
        id: "agent-skill",
        name: "Agent Skill",
        desc: "Give Cursor, Claude Code and Windsurf built-in StyleKit knowledge — apply any style on request.",
        foot: "Vercel Agent Skills · works with any compatible agent",
      },
    ],
  },
  zh: {
    label: "面向开发者",
    title: "把 StyleKit 接进你的工作流",
    intro:
      "每个风格都以 design tokens 的形式提供，可通过 shadcn 安装。CLI 与 MCP 公测包现已可用，仓库中也保留更新中的候选版本。",
    note: "安装的是风格的配色主题——明暗两套 design tokens。组件代码由你自己实现。",
    browse: "浏览全部 146 风格",
    docs: "文档",
    status: "状态",
    verified: "已验证",
    coreTitle: "共享底座",
    coreDescription:
      "公开 Beta 版 Core Package 为 CLI 与 MCP 提供目录查询、tokens、配方和无障碍辅助能力。",
    copyCommand: "复制命令",
    copiedCommand: "命令已复制",
    cards: [
      {
        id: "registry",
        name: "shadcn registry",
        desc: "一行命令，把任意风格的主题装进现有 shadcn 项目。",
        foot: "注入明暗 cssVars · 兼容 Tailwind v4",
      },
      {
        id: "mcp",
        name: "MCP server",
        desc: "通过兼容的 AI 客户端，以 stdio 运行公开 Beta 版 MCP package。",
        foot: "5 个只读工具 · 离线目录",
      },
      {
        id: "cli",
        name: "CLI",
        desc: "在终端浏览风格，并输出 tokens、配方或 shadcn 安装命令。",
        foot: "公开 Beta · 离线目录",
      },
      {
        id: "agent-skill",
        name: "Agent Skill",
        desc: "让 Cursor、Claude Code、Windsurf 内置 StyleKit 知识——按需应用任意风格。",
        foot: "Vercel Agent Skills · 兼容任意 agent",
      },
    ],
  },
} as const;

function CommandBlock({
  cmd,
  copyLabel,
  copiedLabel,
}: {
  cmd: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mt-auto flex items-start gap-2 border border-border bg-foreground/[0.03] px-3 py-2.5 font-mono text-xs leading-relaxed">
      <span className="mt-px select-none text-accent" aria-hidden="true">
        $
      </span>
      <code className="flex-1 whitespace-pre-wrap break-all text-foreground/90">
        {cmd}
      </code>
      <button
        type="button"
        onClick={() => {
          void navigator.clipboard?.writeText(cmd);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="mt-px shrink-0 text-muted transition-colors hover:text-foreground"
        aria-label={copied ? copiedLabel : copyLabel}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-accent" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}

function stateLabel(
  state: DeveloperToolkitState,
  locale: "en" | "zh",
): string {
  const labels = {
    en: {
      "repository-preview": "Repository preview",
      "public-beta": "Public beta",
      supported: "Supported",
      stable: "Stable",
      deprecated: "Deprecated",
    },
    zh: {
      "repository-preview": "仓库预览",
      "public-beta": "公开 Beta",
      supported: "已支持",
      stable: "稳定版",
      deprecated: "已弃用",
    },
  } as const;

  return labels[locale][state];
}

export function DevelopersContent() {
  const { locale } = useI18n();
  const c = COPY[locale as keyof typeof COPY] ?? COPY.en;
  const core = getDeveloperToolkitCapability("core");

  return (
    <main className="flex-1" data-cursor-aura="off">
      <section className="relative border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:px-12 md:py-24">
          <RevealOnScroll variant="soft">
            <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-muted">
              {c.label}
            </p>
            <h1 className="max-w-3xl text-[2rem] leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
              {c.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {c.intro}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="relative border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:px-12 md:py-16">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {c.cards.map((card, i) => {
              const Icon = ICONS[i] ?? Boxes;
              const capability = getDeveloperToolkitCapability(card.id);
              return (
                <RevealOnScroll
                  key={card.name}
                  variant="upStrong"
                  delayMs={100 + i * 80}
                  disableDelayOnMobile
                >
                  <article className="group flex h-full flex-col border border-border bg-background/70 p-6 motion-safe:transition-[border-color,transform] motion-safe:duration-200 hover:border-foreground motion-safe:hover:-translate-y-0.5">
                    <div className="mb-4 flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center border border-border text-accent transition-colors group-hover:border-foreground">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <h2 className="text-lg leading-snug">{card.name}</h2>
                    </div>
                    <p className="mb-5 text-sm leading-relaxed text-muted">
                      {card.desc}
                    </p>
                    <CommandBlock
                      cmd={capability.command}
                      copyLabel={c.copyCommand}
                      copiedLabel={c.copiedCommand}
                    />
                    <p className="mt-4 text-[11px] tracking-wide text-muted">
                      {card.foot}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] tracking-wide text-muted">
                      <span>
                        {c.status}: {stateLabel(capability.state, locale === "zh" ? "zh" : "en")}
                        {capability.publicVersion ? ` · v${capability.publicVersion}` : ""}
                      </span>
                      <a
                        href={capability.docsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-foreground underline-offset-4 hover:text-accent hover:underline"
                      >
                        {c.docs}
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>

          <RevealOnScroll variant="soft" delayMs={360} className="mt-8">
            <p className="max-w-2xl border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted">
              {c.note}
            </p>
          </RevealOnScroll>

          <RevealOnScroll variant="soft" delayMs={420} className="mt-8">
            <Link
              href={`/${locale}/styles`}
              className="group inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-accent"
            >
              {c.browse}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </RevealOnScroll>

          <RevealOnScroll variant="soft" delayMs={480} className="mt-10">
            <div className="border border-border bg-background/70 p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.16em] text-muted">
                    {c.coreTitle}
                  </p>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted">
                    {c.coreDescription}
                  </p>
                </div>
                <div className="text-right text-[11px] tracking-wide text-muted">
                  <p>
                    {c.status}: {stateLabel(core.state, locale === "zh" ? "zh" : "en")} · v{core.publicVersion}
                  </p>
                  <p className="mt-1">
                    {c.verified}: {core.verifiedAt}
                  </p>
                  <a
                    href={core.docsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-foreground underline-offset-4 hover:text-accent hover:underline"
                  >
                    {c.docs}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
