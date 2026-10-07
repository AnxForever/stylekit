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
  getDeveloperToolkitSetupSnippet,
  type DeveloperToolkitState,
} from "@/lib/developer-toolkit";

const ICONS = [Boxes, Sparkles, Terminal, Zap] as const;

const COPY = {
  en: {
    label: "For developers",
    title: "Use StyleKit in your workflow",
    intro:
      "Use the CLI, MCP server or Skill to find styles, animations and reusable assets, then retrieve source and dependencies where available. Install color themes through shadcn.",
    note: "These install a style's color theme — design tokens for light and dark. The component code is yours to build.",
    // Kept as a literal because this is a client component and importing the
    // registry would ship all 148 style records to the browser to print a number.
    // CI enforces it instead: `check:product-truth` fails with this file named if
    // the registry count ever moves past it.
    browse: "Browse all 148 styles",
    docs: "Docs",
    status: "Status",
    verified: "Verified",
    coreTitle: "Shared foundation",
    coreDescription:
      "Core powers shared style and asset lookup, implementation briefs, tokens, recipes and code linting in the CLI and MCP server. Style records also include accessibility and readiness signals when available.",
    copyCommand: "Copy command",
    copiedCommand: "Command copied",
    copyConfig: "Copy MCP config",
    copiedConfig: "MCP config copied",
    configLabel: "Paste into your MCP client's configuration",
    updatesTitle: "How updates work",
    updatesIntro:
      "Update timing depends on how a tool is installed. These short notes explain what happens after setup.",
    updates: [
      {
        title: "Core package",
        body: "The @beta tag selects the current prerelease only when you install or update the dependency. It does not rewrite an existing lockfile; run npm install stylekit-core@beta or pnpm add stylekit-core@beta again to update Core. Use an exact version for repeatable builds.",
      },
      {
        title: "MCP server",
        body: "The configuration above checks npm for the latest release when your client starts the MCP process. A running session keeps its current process; restart the MCP server or client to load an update.",
      },
      {
        title: "CLI",
        body: "The npx command checks for the latest published CLI when you run it. Pin an exact version instead when a script needs repeatable output.",
      },
      {
        title: "Online assets",
        body: "Styles and public asset details are fetched from StyleKit when requested, so new online content does not require reinstalling the CLI or MCP package. Complete template source needs a network connection.",
      },
      {
        title: "Agent Skill",
        body: "When a compatible client follows the Skill's startup instructions, it checks GitHub main at most once every 24 hours; this is not a background updater. For an older installation, run npx skills@latest update stylekit --project or --global to match its install scope. The Skills CLI may replace the Skill directory, so save local edits first. After migration, the bundled updater skips the whole update if managed files have local edits or conflicts.",
      },
    ],
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
        foot: "Nine read-only tools · live assets with bundled fallback",
      },
      {
        id: "cli",
        name: "CLI",
        desc: "Browse the public asset catalog and retrieve available source code and dependencies in the terminal.",
        foot: "Public beta · searchable asset catalog",
      },
      {
        id: "agent-skill",
        name: "Agent Skill",
        desc: "Guide a compatible coding agent to select assets, reuse their code and check the result in your project.",
        foot: "Vercel Agent Skills · works with any compatible agent",
      },
    ],
  },
  zh: {
    label: "面向开发者",
    title: "把 StyleKit 接进你的工作流",
    intro:
      "用 CLI、MCP 或 Skill 查找风格、动画和设计素材，并按素材提供情况获取源码和依赖；配色主题也可以通过 shadcn 安装。",
    note: "安装的是风格的配色主题——明暗两套 design tokens。组件代码由你自己实现。",
    browse: "浏览全部 148 风格",
    docs: "文档",
    status: "状态",
    verified: "已验证",
    coreTitle: "共享底座",
    coreDescription:
      "Core 为 CLI 与 MCP 提供共用的风格和素材查询、实现说明、tokens、配方与代码规则检查；数据可用时，风格记录也包含无障碍和就绪度信号。",
    copyCommand: "复制命令",
    copiedCommand: "命令已复制",
    copyConfig: "复制 MCP 配置",
    copiedConfig: "MCP 配置已复制",
    configLabel: "粘贴到兼容客户端的 MCP 配置中",
    updatesTitle: "更新方式",
    updatesIntro:
      "不同工具的更新时机不一样，下面分别说明安装后会发生什么。",
    updates: [
      {
        title: "Core 依赖",
        body: "@beta 只在安装或更新依赖时解析为当前预发布版本，不会替你改已有 lockfile。要更新 Core，再运行一次 npm install stylekit-core@beta 或 pnpm add stylekit-core@beta；需要稳定复现时使用固定版本。",
      },
      {
        title: "MCP 服务",
        body: "上方配置会在客户端启动 MCP 进程时检查 npm 最新版本。已经运行的会话继续使用当前进程；重启 MCP 服务或客户端后才会加载新版本。",
      },
      {
        title: "CLI",
        body: "每次运行 npx 命令时都会检查 npm 上的最新 CLI。脚本需要稳定复现时，可以把 @latest 换成一个固定版本。",
      },
      {
        title: "在线素材",
        body: "风格和公开素材详情会在请求时从 StyleKit 获取，新增在线内容无需重装 CLI 或 MCP。完整模板源码需要联网获取。",
      },
      {
        title: "Agent Skill",
        body: "兼容客户端遵循 Skill 启动指令时，会检查 GitHub main；每 24 小时最多一次，这不是后台更新服务。旧版按安装范围迁移：项目级运行 npx skills@latest update stylekit --project，全局运行 npx skills@latest update stylekit --global。Skills CLI 可能替换 Skill 目录，先备份本地改动。迁移后，内置更新器发现受管文件被修改或发生冲突时，会跳过整次更新。",
      },
    ],
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
        foot: "9 个只读工具 · 在线资产与离线回退",
      },
      {
        id: "cli",
        name: "CLI",
        desc: "在终端浏览公开素材目录，并查看素材可提供的源码和依赖。",
        foot: "公开 Beta · 可检索的资产目录",
      },
      {
        id: "agent-skill",
        name: "Agent Skill",
        desc: "引导兼容的编码 Agent 选择素材、复用代码，并在你的项目里检查效果。",
        foot: "Vercel Agent Skills · 兼容任意 agent",
      },
    ],
  },
} as const;

function CommandBlock({
  content,
  format,
  label,
  copyLabel,
  copiedLabel,
}: {
  content: string;
  format: "bash" | "json";
  label?: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mt-auto">
      {label ? (
        <p className="mb-2 text-[11px] text-muted">{label}</p>
      ) : null}
      <div className="flex items-start gap-2 border border-border bg-foreground/[0.03] px-3 py-2.5 font-mono text-xs leading-relaxed">
        {format === "bash" ? (
          <span className="mt-px select-none text-accent" aria-hidden="true">
            $
          </span>
        ) : null}
        <code className="min-w-0 flex-1 whitespace-pre-wrap break-all text-foreground/90">
          {content}
        </code>
        <button
          type="button"
          onClick={() => {
            void navigator.clipboard?.writeText(content);
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

function versionLabel(version: string | null): string {
  if (version === null) return "";
  return ` · ${version === "main" ? version : `v${version}`}`;
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
              const setupSnippet = getDeveloperToolkitSetupSnippet(card.id);
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
                      content={setupSnippet.content}
                      format={setupSnippet.format}
                      label={capability.id === "mcp" ? c.configLabel : undefined}
                      copyLabel={capability.id === "mcp" ? c.copyConfig : c.copyCommand}
                      copiedLabel={capability.id === "mcp" ? c.copiedConfig : c.copiedCommand}
                    />
                    <p className="mt-4 text-[11px] tracking-wide text-muted">
                      {card.foot}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] tracking-wide text-muted">
                      <span>
                        {c.status}: {stateLabel(capability.state, locale === "zh" ? "zh" : "en")}
                        {versionLabel(capability.publicVersion)}
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

          <RevealOnScroll variant="soft" delayMs={540} className="mt-10">
            <section aria-labelledby="developer-updates-title">
              <div className="mb-5 max-w-2xl">
                <h2 id="developer-updates-title" className="text-xl sm:text-2xl">
                  {c.updatesTitle}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {c.updatesIntro}
                </p>
              </div>
              <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
                {c.updates.map((item) => (
                  <article key={item.title} className="bg-background/70 p-5">
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
