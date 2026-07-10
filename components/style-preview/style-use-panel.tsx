"use client";

import { CodeBlock } from "@/components/style-preview/code-block";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { useI18n } from "@/lib/i18n/context";

interface StyleUsePanelProps {
  slug: string;
  name: string;
  nameEn: string;
}

/**
 * Conversion panel: turns a search visitor who found a style into a user of
 * StyleKit's distribution channels (shadcn registry plus local CLI/MCP previews). Placed high
 * on the style detail page because these are the sticky, repeat-usage paths —
 * and the AI-distribution moat.
 */
export function StyleUsePanel({ slug, name, nameEn }: StyleUsePanelProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";
  const displayName = isZh ? name : nameEn;

  const rows = [
    {
      tag: "shadcn",
      desc: isZh
        ? "一行命令，把这个风格的主题装进现有 shadcn 项目。"
        : "Drop this style's theme into an existing shadcn project with one command.",
      code: `npx shadcn add https://www.stylekit.top/r/${slug}.json`,
      language: "bash",
    },
    {
      tag: "CLI",
      desc: isZh
        ? "贡献者可在本地仓库构建尚未发布的 CLI。"
        : "Contributors can build the unpublished CLI from a local checkout.",
      code: `pnpm --filter stylekit-cli build && node packages/cli/dist/index.js add ${slug}`,
      language: "bash",
    },
    {
      tag: "MCP",
      desc: isZh
        ? `贡献者可在本地仓库预览「${displayName}」的 MCP 能力。`
        : `Contributors can preview ${displayName} through the repository-local MCP package.`,
      code: "pnpm --filter stylekit-mcp build && node packages/mcp/dist/index.js",
      language: "bash",
    },
  ];

  return (
    <section id="use-this-style" className="border border-border p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="mb-1 text-xs uppercase tracking-widest text-muted">
            {isZh ? "在你的工作流里用它" : "Use it in your workflow"}
          </p>
          <h2 className="text-2xl md:text-3xl">
            {isZh
              ? `把「${displayName}」接进你的 AI 编码工具`
              : `Ship ${displayName} in your AI coding tool`}
          </h2>
        </div>
        <LocalizedLink
          href="/developers"
          className="text-sm text-muted underline-offset-4 hover:text-foreground hover:underline"
        >
          {isZh ? "全部接入方式 →" : "All integrations →"}
        </LocalizedLink>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {rows.map((row) => (
          <div key={row.tag} className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-foreground">
              {row.tag}
            </span>
            <p className="min-h-[40px] text-sm text-muted">{row.desc}</p>
            <CodeBlock code={row.code} language={row.language} slug={slug} />
          </div>
        ))}
      </div>
    </section>
  );
}
