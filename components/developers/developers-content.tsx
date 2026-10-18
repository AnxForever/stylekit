"use client";

import { useId, useState } from "react";
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
import { useClipboard } from "@/lib/hooks/use-clipboard";
import { cn } from "@/lib/utils";
import {
  getDeveloperToolkitCapability,
  getDeveloperToolkitSetupSnippet,
  type DeveloperToolkitState,
} from "@/lib/developer-toolkit";

const ICONS = { registry: Boxes, mcp: Sparkles, cli: Terminal, "agent-skill": Zap } as const;

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
    chooseTool: "Choose an integration",
    terminalLabel: "Run in your terminal",
    configTitle: "MCP configuration",
    copyFailed: "Couldn't copy. Select the code below to copy it manually.",
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
        purpose: "Install a color theme",
        desc: "Drop any style's theme into an existing shadcn project with a single command.",
        foot: "Injects light + dark cssVars · Tailwind v4 ready",
      },
      {
        id: "mcp",
        name: "MCP server",
        purpose: "Connect your AI client",
        desc: "Run the public beta MCP package over stdio from a compatible AI client.",
        foot: "Nine read-only tools · live assets with bundled fallback",
      },
      {
        id: "cli",
        name: "CLI",
        purpose: "Work in your terminal",
        desc: "Browse the public asset catalog and retrieve available source code and dependencies in the terminal.",
        foot: "Public beta · searchable asset catalog",
      },
      {
        id: "agent-skill",
        name: "Agent Skill",
        purpose: "Guide your coding agent",
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
    chooseTool: "选择接入方式",
    terminalLabel: "在终端运行",
    configTitle: "MCP 配置",
    copyFailed: "未能复制，请手动选择下方代码。",
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
        purpose: "为项目安装配色主题",
        desc: "一行命令，把任意风格的主题装进现有 shadcn 项目。",
        foot: "注入明暗 cssVars · 兼容 Tailwind v4",
      },
      {
        id: "mcp",
        name: "MCP server",
        purpose: "连接你的 AI 客户端",
        desc: "通过兼容的 AI 客户端，以 stdio 运行公开 Beta 版 MCP package。",
        foot: "9 个只读工具 · 在线资产与离线回退",
      },
      {
        id: "cli",
        name: "CLI",
        purpose: "在终端查找和使用素材",
        desc: "在终端浏览公开素材目录，并查看素材可提供的源码和依赖。",
        foot: "公开 Beta · 可检索的资产目录",
      },
      {
        id: "agent-skill",
        name: "Agent Skill",
        purpose: "让编码 Agent 使用素材",
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
  failedLabel,
}: {
  content: string;
  format: "bash" | "json";
  label: string;
  copyLabel: string;
  copiedLabel: string;
  failedLabel: string;
}) {
  const { copy, result, isCopied } = useClipboard();
  const copied = isCopied("setup", content);
  return (
    <div className="min-w-0 overflow-hidden border border-border bg-foreground/[0.025]">
      <div className="flex min-h-12 items-center justify-between gap-3 border-b border-border px-4">
        <p className="text-xs text-foreground/65">{label}</p>
        <button
          type="button"
          onClick={() => void copy(content, "setup")}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 text-xs text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label={copied ? copiedLabel : copyLabel}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          <span>{copied ? copiedLabel : copyLabel}</span>
        </button>
      </div>
      <div className="flex min-w-0 items-start gap-3 p-4 sm:p-5">
        {format === "bash" ? (
          <span className="select-none font-mono text-[13px] leading-6 text-accent" aria-hidden="true">$</span>
        ) : null}
        <pre role="region" tabIndex={0} aria-label={label} className="min-w-0 flex-1 overflow-x-auto whitespace-pre-wrap break-normal bg-transparent! p-0! font-mono text-[13px]! leading-6! text-foreground/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
          <code>{content}</code>
        </pre>
      </div>
      <p role="status" className={result?.state === "failed" ? "px-4 pb-4 text-xs text-foreground sm:px-5" : "sr-only"}>
        {result?.state === "failed" ? failedLabel : copied ? copiedLabel : ""}
      </p>
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
  const [selectedId, setSelectedId] = useState<keyof typeof ICONS>("registry");
  const panelId = useId();
  const selectedCard = c.cards.find((card) => card.id === selectedId) ?? c.cards[0];
  const capability = getDeveloperToolkitCapability(selectedCard.id);
  const setupSnippet = getDeveloperToolkitSetupSnippet(selectedCard.id);

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
          <div role="group" aria-label={c.chooseTool} className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {c.cards.map((card) => {
              const Icon = ICONS[card.id];
              const selected = card.id === selectedCard.id;
              return (
                <button
                  key={card.id}
                  type="button"
                  aria-pressed={selected}
                  aria-controls={panelId}
                  onClick={() => setSelectedId(card.id)}
                  className={cn(
                    "relative min-w-0 border px-4 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-5 sm:py-5",
                    selected ? "border-foreground/30 bg-foreground/[0.04]" : "border-transparent hover:bg-foreground/[0.025]",
                  )}
                >
                  <span className="flex items-center gap-2.5 text-sm font-medium sm:text-base">
                    <Icon className={cn("h-4 w-4 shrink-0", selected ? "text-accent" : "text-muted")} aria-hidden="true" />
                    {card.name}
                  </span>
                  <span className="mt-2 block text-xs leading-relaxed text-foreground/65">{card.purpose}</span>
                  {selected ? <span className="absolute inset-x-4 bottom-0 h-0.5 bg-accent sm:inset-x-5" aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>

          <section id={panelId} aria-labelledby={`${panelId}-title`} className="mt-5 grid min-w-0 items-start gap-6 border-t border-border py-6 sm:gap-8 sm:py-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] lg:gap-12">
            <div className="min-w-0">
              <h2 id={`${panelId}-title`} className="text-2xl tracking-tight">{selectedCard.name}</h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-muted">{selectedCard.desc}</p>
              <p className="mt-4 text-xs leading-relaxed text-muted">{selectedCard.foot}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                <span className="text-muted">
                  {stateLabel(capability.state, locale === "zh" ? "zh" : "en")}{versionLabel(capability.publicVersion)}
                </span>
                <a href={capability.docsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-8 items-center gap-1.5 text-foreground underline-offset-4 hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                  {c.docs}<ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="min-w-0">
              <CommandBlock
                key={selectedCard.id}
                content={setupSnippet.content}
                format={setupSnippet.format}
                label={selectedCard.id === "mcp" ? c.configTitle : c.terminalLabel}
                copyLabel={selectedCard.id === "mcp" ? c.copyConfig : c.copyCommand}
                copiedLabel={selectedCard.id === "mcp" ? c.copiedConfig : c.copiedCommand}
                failedLabel={c.copyFailed}
              />
              {selectedCard.id === "registry" || selectedCard.id === "mcp" ? (
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  {selectedCard.id === "registry" ? c.note : c.configLabel}
                </p>
              ) : null}
            </div>
          </section>

          <RevealOnScroll variant="soft" className="mt-2">
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
                  <article key={item.title} className="bg-background p-5">
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
