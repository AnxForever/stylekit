"use client";

import { useCallback, useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useI18n } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/translations";
import {
  Check,
  Code2,
  Copy,
  Cpu,
  FileCode,
  Palette,
  Search,
  Server,
  Terminal,
  Zap,
} from "lucide-react";

type Tab = "cli" | "mcp" | "api";

function CopyButton({
  text,
  id,
  copiedId,
  onCopy,
}: {
  text: string;
  id: string;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}) {
  const { t } = useI18n();

  return (
    <button
      onClick={() => onCopy(text, id)}
      className="absolute right-2 top-2 p-1.5 text-zinc-400 transition-colors hover:text-zinc-200"
      title={t("developers.copyToClipboard")}
      type="button"
    >
      {copiedId === id ? (
        <Check className="h-4 w-4 text-green-400" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
}

const cliQuickStartSnippet = `# Show all commands
npx stylekit help

# List available styles
npx stylekit styles

# Show lint rules for one style
npx stylekit rules neo-brutalist`;

const cliLintSnippet = `# Lint a button file against Neo-Brutalist rules
npx stylekit lint ./src/Button.tsx --style neo-brutalist

# Lint a card file against Glassmorphism rules
npx stylekit lint ./components/Card.tsx --style glassmorphism`;

const cliSmartSnippet = `# Basic recommendation
npx stylekit recommend "SaaS dashboard"

# Context-aware recommendation
npx stylekit smart "e-commerce store" --audience consumer --mood playful

# Enterprise + accessibility context
npx stylekit smart "B2B SaaS" --audience enterprise --mood professional --a11y

# Compare two styles for one product
npx stylekit compare neo-brutalist glassmorphism "creative portfolio"`;

const lintOutputSnippet = `Linting: ./src/Button.tsx
Style: neo-brutalist

[FAIL] 2 forbidden classes found
[WARN] 4 required classes missing

Issues:
  [x] "rounded-lg" - Neo-Brutalist uses sharp corners only
  [x] "shadow-md" - Use hard offset shadows

Suggested Fixes:
  - Replace "rounded-lg" with "rounded-none"
  - Replace "shadow-md" with "shadow-[4px_4px_0_#000]"`;

const claudeConfigSnippet = `{
  "mcpServers": {
    "stylekit": {
      "command": "npx",
      "args": ["tsx", "/path/to/stylekit/mcp/server.ts"]
    }
  }
}`;

const cursorConfigSnippet = `{
  "mcpServers": {
    "stylekit": {
      "command": "npx",
      "args": ["tsx", "./mcp/server.ts"]
    }
  }
}`;

const lintApiSnippet = `# Read lintable styles and rules
GET /api/lint
GET /api/lint?style=neo-brutalist

# Lint code
POST /api/lint
Content-Type: application/json

{
  "code": "<button class=\\"rounded-lg shadow-md\\">Test</button>",
  "style": "neo-brutalist"
}`;

const smartApiSnippet = `# Smart recommendation
POST /api/knowledge/smart
Content-Type: application/json

{
  "productQuery": "SaaS dashboard",
  "context": {
    "targetAudience": "enterprise",
    "brandMood": "professional",
    "accessibilityPriority": true
  }
}

# Compare styles
GET /api/knowledge/smart?action=compare&style1=neo-brutalist&style2=glassmorphism&product=portfolio

# Suggest by priorities
GET /api/knowledge/smart?action=suggest&priorities=accessibility,performance`;

const cliCommands: ReadonlyArray<{ cmd: string; descKey: TranslationKey }> = [
  { cmd: "help", descKey: "developers.cli.commands.help" },
  { cmd: "styles", descKey: "developers.cli.commands.styles" },
  { cmd: "rules <style>", descKey: "developers.cli.commands.rules" },
  { cmd: "lint <file> --style <style>", descKey: "developers.cli.commands.lint" },
  { cmd: "recommend <query>", descKey: "developers.cli.commands.recommend" },
  { cmd: "smart <query> [options]", descKey: "developers.cli.commands.smart" },
  { cmd: "compare <s1> <s2> <query>", descKey: "developers.cli.commands.compare" },
  { cmd: "search <query>", descKey: "developers.cli.commands.search" },
];

const mcpTools: ReadonlyArray<{ name: string; descKey: TranslationKey }> = [
  { name: "search_knowledge", descKey: "developers.mcp.tools.search_knowledge" },
  { name: "smart_recommend", descKey: "developers.mcp.tools.smart_recommend" },
  { name: "get_style", descKey: "developers.mcp.tools.get_style" },
  { name: "list_styles", descKey: "developers.mcp.tools.list_styles" },
  { name: "lint_code", descKey: "developers.mcp.tools.lint_code" },
  { name: "get_stack_guidelines", descKey: "developers.mcp.tools.get_stack_guidelines" },
];

const apiEndpoints: ReadonlyArray<{ method: "GET" | "POST"; path: string; descKey: TranslationKey }> = [
  { method: "GET", path: "/api/styles", descKey: "developers.api.endpoints.styles" },
  { method: "GET", path: "/api/styles/[slug]", descKey: "developers.api.endpoints.styleDetail" },
  { method: "GET", path: "/api/styles/[slug]/tokens", descKey: "developers.api.endpoints.styleTokens" },
  { method: "GET", path: "/api/styles/[slug]/recipes", descKey: "developers.api.endpoints.styleRecipes" },
  { method: "POST", path: "/api/style-extract", descKey: "developers.api.endpoints.styleExtract" },
  { method: "GET", path: "/api/knowledge/search?q=...", descKey: "developers.api.endpoints.knowledgeSearch" },
  { method: "GET", path: "/api/knowledge/recommend", descKey: "developers.api.endpoints.knowledgeRecommend" },
  { method: "GET", path: "/api/knowledge/stacks", descKey: "developers.api.endpoints.knowledgeStacks" },
  { method: "GET", path: "/api/knowledge/domains", descKey: "developers.api.endpoints.knowledgeDomains" },
];

const coreWorkflows: ReadonlyArray<{
  idKey: TranslationKey;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  links: readonly string[];
}> = [
  {
    idKey: "developers.workflow.pathA.id",
    titleKey: "developers.workflow.pathA.title",
    descKey: "developers.workflow.pathA.desc",
    links: ["/api/style-extract", "/create-style", "/generate"],
  },
  {
    idKey: "developers.workflow.pathB.id",
    titleKey: "developers.workflow.pathB.title",
    descKey: "developers.workflow.pathB.desc",
    links: ["/styles", "/generate"],
  },
];

const mcpCapabilities: ReadonlyArray<{ icon: typeof Search; labelKey: TranslationKey }> = [
  { icon: Search, labelKey: "developers.mcp.cards.searchKnowledge" },
  { icon: Palette, labelKey: "developers.mcp.cards.styleRecommendation" },
  { icon: FileCode, labelKey: "developers.mcp.cards.codeLinting" },
  { icon: Server, labelKey: "developers.mcp.cards.stackGuidelines" },
];

const developerTabs: ReadonlyArray<{ id: Tab; labelKey: TranslationKey; icon: typeof Terminal }> = [
  { id: "cli", labelKey: "developers.tabs.cli", icon: Terminal },
  { id: "mcp", labelKey: "developers.tabs.mcp", icon: Server },
  { id: "api", labelKey: "developers.tabs.api", icon: Code2 },
];

export default function DevelopersPage() {
  const [activeTab, setActiveTab] = useState<Tab>("cli");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { t } = useI18n();

  const copyToClipboard = useCallback(async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-20">
            <p className="mb-4 text-xs uppercase tracking-widest text-muted">{t("developers.badge")}</p>
            <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl">{t("developers.title")}</h1>
            <p className="max-w-3xl text-lg text-muted">{t("developers.description")}</p>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {coreWorkflows.map(({ idKey, titleKey, descKey, links }) => (
                <div key={idKey} className="rounded-lg border border-border p-4">
                  <p className="mb-1 text-xs uppercase tracking-widest text-muted">{t(idKey)}</p>
                  <p className="mb-2 text-lg font-medium">{t(titleKey)}</p>
                  <p className="mb-3 text-sm text-muted">{t(descKey)}</p>
                  <div className="flex flex-wrap gap-2">
                    {links.map((link) => (
                      <code key={link} className="rounded bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800">
                        {link}
                      </code>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sticky top-0 z-10 border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="flex gap-1">
              {developerTabs.map(({ id, labelKey, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm transition-colors ${
                    activeTab === id
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted hover:text-foreground"
                  }`}
                  type="button"
                >
                  <Icon className="h-4 w-4" />
                  {t(labelKey)}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-7xl space-y-12 px-6 py-12 md:px-12">
            {activeTab === "cli" && (
              <div className="space-y-12">
                <div>
                  <h2 className="mb-4 flex items-center gap-2 text-2xl font-medium">
                    <Zap className="h-5 w-5" />
                    {t("developers.cli.quickStartTitle")}
                  </h2>
                  <p className="mb-4 text-muted">{t("developers.cli.quickStartDesc")}</p>
                  <div className="relative">
                    <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-sm text-zinc-100">
                      {cliQuickStartSnippet}
                    </pre>
                    <CopyButton text={cliQuickStartSnippet} id="cli-quick" copiedId={copiedId} onCopy={copyToClipboard} />
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 flex items-center gap-2 text-2xl font-medium">
                    <FileCode className="h-5 w-5" />
                    {t("developers.cli.lintTitle")}
                  </h2>
                  <p className="mb-4 text-muted">{t("developers.cli.lintDesc")}</p>
                  <div className="relative">
                    <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-sm text-zinc-100">
                      {cliLintSnippet}
                    </pre>
                    <CopyButton text={cliLintSnippet} id="cli-lint" copiedId={copiedId} onCopy={copyToClipboard} />
                  </div>
                  <div className="mt-4 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
                    <p className="mb-2 text-sm font-medium">{t("developers.cli.outputExample")}</p>
                    <pre className="whitespace-pre-wrap font-mono text-xs text-muted">{lintOutputSnippet}</pre>
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 flex items-center gap-2 text-2xl font-medium">
                    <Cpu className="h-5 w-5" />
                    {t("developers.cli.smartTitle")}
                  </h2>
                  <p className="mb-4 text-muted">{t("developers.cli.smartDesc")}</p>
                  <div className="relative">
                    <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-sm text-zinc-100">
                      {cliSmartSnippet}
                    </pre>
                    <CopyButton text={cliSmartSnippet} id="cli-smart" copiedId={copiedId} onCopy={copyToClipboard} />
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-medium">{t("developers.cli.allCommandsTitle")}</h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {cliCommands.map(({ cmd, descKey }) => (
                      <div key={cmd} className="rounded-lg border border-border p-3">
                        <code className="text-sm text-foreground">stylekit {cmd}</code>
                        <p className="mt-1 text-xs text-muted">{t(descKey)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "mcp" && (
              <div className="space-y-12">
                <div>
                  <h2 className="mb-4 text-2xl font-medium">{t("developers.mcp.whatIsTitle")}</h2>
                  <p className="mb-4 text-muted">{t("developers.mcp.whatIsDesc")}</p>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {mcpCapabilities.map(({ icon: Icon, labelKey }) => (
                      <div key={labelKey} className="flex items-center gap-2 rounded-lg border border-border p-3">
                        <Icon className="h-4 w-4 text-muted" />
                        <span className="text-sm">{t(labelKey)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-medium">{t("developers.mcp.claudeConfigTitle")}</h2>
                  <p className="mb-4 text-muted">{t("developers.mcp.claudeConfigDesc")}</p>
                  <div className="mb-4 space-y-2 text-sm text-muted">
                    <p>
                      {t("developers.platform.macos")}:{" "}
                      <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
                        ~/Library/Application Support/Claude/claude_desktop_config.json
                      </code>
                    </p>
                    <p>
                      {t("developers.platform.windows")}:{" "}
                      <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
                        %APPDATA%\Claude\claude_desktop_config.json
                      </code>
                    </p>
                  </div>
                  <div className="relative">
                    <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-sm text-zinc-100">
                      {claudeConfigSnippet}
                    </pre>
                    <CopyButton text={claudeConfigSnippet} id="mcp-claude" copiedId={copiedId} onCopy={copyToClipboard} />
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-medium">{t("developers.mcp.cursorConfigTitle")}</h2>
                  <p className="mb-4 text-muted">
                    {t("developers.mcp.cursorConfigDesc")}{" "}
                    <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">.cursor/mcp.json</code>.
                  </p>
                  <div className="relative">
                    <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-sm text-zinc-100">
                      {cursorConfigSnippet}
                    </pre>
                    <CopyButton text={cursorConfigSnippet} id="mcp-cursor" copiedId={copiedId} onCopy={copyToClipboard} />
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-medium">{t("developers.mcp.availableToolsTitle")}</h2>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {mcpTools.map(({ name, descKey }) => (
                      <div key={name} className="rounded-lg border border-border p-3">
                        <code className="text-sm text-foreground">{name}</code>
                        <p className="mt-1 text-xs text-muted">{t(descKey)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-medium">{t("developers.mcp.exampleUsageTitle")}</h2>
                  <div className="space-y-4 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
                    <div>
                      <p className="mb-1 text-sm font-medium">{t("developers.mcp.example.you")}</p>
                      <p className="text-sm text-muted">{t("developers.mcp.example.youText")}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-medium">{t("developers.mcp.example.ai")}</p>
                      <p className="text-sm text-muted">{t("developers.mcp.example.aiText")}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "api" && (
              <div className="space-y-12">
                <div>
                  <h2 className="mb-4 text-2xl font-medium">{t("developers.api.title")}</h2>
                  <p className="mb-4 text-muted">{t("developers.api.desc")}</p>
                </div>

                <div>
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-medium">
                    <FileCode className="h-5 w-5" />
                    /api/lint
                  </h2>
                  <div className="relative">
                    <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-sm text-zinc-100">
                      {lintApiSnippet}
                    </pre>
                    <CopyButton
                      text={`curl -X POST /api/lint \\
  -H "Content-Type: application/json" \\
  -d '{"code":"<button class=\\"rounded-lg\\">Test</button>","style":"neo-brutalist"}'`}
                      id="api-lint"
                      copiedId={copiedId}
                      onCopy={copyToClipboard}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-medium">
                    <Cpu className="h-5 w-5" />
                    /api/knowledge/smart
                  </h2>
                  <div className="relative">
                    <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-sm text-zinc-100">
                      {smartApiSnippet}
                    </pre>
                    <CopyButton
                      text={`curl -X POST /api/knowledge/smart \\
  -H "Content-Type: application/json" \\
  -d '{"productQuery":"SaaS dashboard","context":{"targetAudience":"enterprise"}}'`}
                      id="api-smart"
                      copiedId={copiedId}
                      onCopy={copyToClipboard}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-medium">{t("developers.api.otherEndpointsTitle")}</h2>
                  <div className="grid grid-cols-1 gap-3">
                    {apiEndpoints.map(({ method, path, descKey }) => (
                      <div key={path} className="flex items-center gap-3 rounded-lg border border-border p-3">
                        <span
                          className={`rounded px-2 py-0.5 font-mono text-xs ${
                            method === "GET"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          }`}
                        >
                          {method}
                        </span>
                        <code className="flex-1 text-sm">{path}</code>
                        <span className="text-xs text-muted">{t(descKey)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
