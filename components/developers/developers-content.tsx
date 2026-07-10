"use client";

import { useState } from "react";
import Link from "next/link";
import { Boxes, Sparkles, Terminal, Zap, Copy, Check, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { RevealOnScroll } from "@/components/home/reveal-on-scroll";

const ICONS = [Boxes, Sparkles, Terminal, Zap] as const;

const COPY = {
  en: {
    label: "For developers",
    title: "Use StyleKit in your workflow",
    intro:
      "Every style ships as design tokens you can install through shadcn. Repository-local CLI and MCP previews are available for contributors.",
    note: "These install a style's color theme — design tokens for light and dark. The component code is yours to build.",
    browse: "Browse all 130+ styles",
    cards: [
      {
        name: "shadcn registry",
        desc: "Drop any style's theme into an existing shadcn project with a single command.",
        cmd: "npx shadcn add https://www.stylekit.top/r/glassmorphism.json",
        foot: "Injects light + dark cssVars · Tailwind v4 ready",
      },
      {
        name: "MCP server",
        desc: "Build and run the unpublished MCP package from a local StyleKit checkout.",
        cmd: "pnpm --filter stylekit-mcp build && node packages/mcp/dist/index.js",
        foot: "Not published to npm · contributor preview",
      },
      {
        name: "CLI",
        desc: "Build and run the unpublished CLI package from a local StyleKit checkout.",
        cmd: "pnpm --filter stylekit-cli build && node packages/cli/dist/index.js add synthwave",
        foot: "Not published to npm · contributor preview",
      },
      {
        name: "Agent Skill",
        desc: "Give Cursor, Claude Code and Windsurf built-in StyleKit knowledge — apply any style on request.",
        cmd: "npx skills add AnxForever/stylekit",
        foot: "Vercel Agent Skills · works with any compatible agent",
      },
    ],
  },
  zh: {
    label: "面向开发者",
    title: "把 StyleKit 接进你的工作流",
    intro:
      "每个风格都以 design tokens 的形式提供，可通过 shadcn 安装。CLI 与 MCP 目前仅供仓库本地开发预览。",
    note: "安装的是风格的配色主题——明暗两套 design tokens。组件代码由你自己实现。",
    browse: "浏览全部 130+ 风格",
    cards: [
      {
        name: "shadcn registry",
        desc: "一行命令，把任意风格的主题装进现有 shadcn 项目。",
        cmd: "npx shadcn add https://www.stylekit.top/r/glassmorphism.json",
        foot: "注入明暗 cssVars · 兼容 Tailwind v4",
      },
      {
        name: "MCP server",
        desc: "在本地 StyleKit 仓库中构建并运行尚未发布的 MCP package。",
        cmd: "pnpm --filter stylekit-mcp build && node packages/mcp/dist/index.js",
        foot: "尚未发布到 npm · 贡献者预览",
      },
      {
        name: "CLI",
        desc: "在本地 StyleKit 仓库中构建并运行尚未发布的 CLI package。",
        cmd: "pnpm --filter stylekit-cli build && node packages/cli/dist/index.js add synthwave",
        foot: "尚未发布到 npm · 贡献者预览",
      },
      {
        name: "Agent Skill",
        desc: "让 Cursor、Claude Code、Windsurf 内置 StyleKit 知识——按需应用任意风格。",
        cmd: "npx skills add AnxForever/stylekit",
        foot: "Vercel Agent Skills · 兼容任意 agent",
      },
    ],
  },
} as const;

function CommandBlock({ cmd }: { cmd: string }) {
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
        aria-label="Copy command"
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

export function DevelopersContent() {
  const { locale } = useI18n();
  const c = COPY[locale as keyof typeof COPY] ?? COPY.en;

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
                        <Icon className="h-4 w-4" />
                      </div>
                      <h2 className="text-lg leading-snug">{card.name}</h2>
                    </div>
                    <p className="mb-5 text-sm leading-relaxed text-muted">
                      {card.desc}
                    </p>
                    <CommandBlock cmd={card.cmd} />
                    <p className="mt-4 text-[11px] tracking-wide text-muted">
                      {card.foot}
                    </p>
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
        </div>
      </section>
    </main>
  );
}
