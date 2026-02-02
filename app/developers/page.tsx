"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  Terminal,
  Server,
  Code2,
  Copy,
  Check,
  Cpu,
  Zap,
  FileCode,
  Palette,
  Search,
  GitCompare,
} from "lucide-react";

type Tab = "cli" | "mcp" | "api";

export default function DevelopersPage() {
  const [activeTab, setActiveTab] = useState<Tab>("cli");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const CopyButton = ({ text, id }: { text: string; id: string }) => (
    <button
      onClick={() => copyToClipboard(text, id)}
      className="absolute top-2 right-2 p-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
      title="Copy to clipboard"
    >
      {copiedId === id ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              Developer Tools
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">
              CLI, MCP & API
            </h1>
            <p className="text-lg text-muted max-w-2xl">
              StyleKit 提供三种方式让 AI 和开发者使用设计系统：命令行工具、MCP Server 和 HTTP API。
            </p>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="border-b border-border sticky top-0 bg-background z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex gap-1">
              {[
                { id: "cli" as Tab, label: "CLI 命令行", icon: Terminal },
                { id: "mcp" as Tab, label: "MCP Server", icon: Server },
                { id: "api" as Tab, label: "HTTP API", icon: Code2 },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition-colors ${
                    activeTab === id
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
            {/* CLI Tab */}
            {activeTab === "cli" && (
              <div className="space-y-12">
                {/* Quick Start */}
                <div>
                  <h2 className="text-2xl font-medium mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    快速开始
                  </h2>
                  <p className="text-muted mb-4">
                    StyleKit CLI 可以在任何项目中直接使用，无需安装。
                  </p>
                  <div className="relative">
                    <pre className="p-4 bg-zinc-900 text-zinc-100 text-sm font-mono rounded-lg overflow-x-auto">
{`# 查看帮助
npx stylekit help

# 列出所有风格
npx stylekit styles

# 查看风格的 lint 规则
npx stylekit rules neo-brutalist`}
                    </pre>
                    <CopyButton
                      text="npx stylekit help"
                      id="cli-quick"
                    />
                  </div>
                </div>

                {/* Lint Command */}
                <div>
                  <h2 className="text-2xl font-medium mb-4 flex items-center gap-2">
                    <FileCode className="w-5 h-5" />
                    代码风格检查
                  </h2>
                  <p className="text-muted mb-4">
                    检查代码是否符合指定设计风格的规范，自动识别违规类并提供修复建议。
                  </p>
                  <div className="relative">
                    <pre className="p-4 bg-zinc-900 text-zinc-100 text-sm font-mono rounded-lg overflow-x-auto">
{`# 检查文件是否符合 Neo-Brutalist 风格
npx stylekit lint ./src/Button.tsx --style neo-brutalist

# 检查是否符合 Glassmorphism 风格
npx stylekit lint ./components/Card.tsx --style glassmorphism`}
                    </pre>
                    <CopyButton
                      text="npx stylekit lint ./src/Button.tsx --style neo-brutalist"
                      id="cli-lint"
                    />
                  </div>
                  <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    <p className="text-sm font-medium mb-2">输出示例：</p>
                    <pre className="text-xs text-muted font-mono whitespace-pre-wrap">
{`Linting: ./src/Button.tsx
Style: neo-brutalist

[FAIL] 2 forbidden classes found
[WARN] 4 required classes missing

Issues:
  [x] "rounded-lg" - Neo-Brutalist uses sharp corners only
  [x] "shadow-md" - Use hard offset shadows

Suggested Fixes:
  - Replace "rounded-lg" with "rounded-none"
  - Replace "shadow-md" with "shadow-[4px_4px_0_#000]"`}
                    </pre>
                  </div>
                </div>

                {/* Smart Recommend */}
                <div>
                  <h2 className="text-2xl font-medium mb-4 flex items-center gap-2">
                    <Cpu className="w-5 h-5" />
                    智能推荐
                  </h2>
                  <p className="text-muted mb-4">
                    根据产品类型和上下文，获取带评分的智能设计推荐。
                  </p>
                  <div className="relative">
                    <pre className="p-4 bg-zinc-900 text-zinc-100 text-sm font-mono rounded-lg overflow-x-auto">
{`# 基础推荐
npx stylekit recommend "SaaS dashboard"

# 智能推荐（带上下文）
npx stylekit smart "e-commerce store" --audience consumer --mood playful

# 智能推荐（企业级，优先无障碍）
npx stylekit smart "B2B SaaS" --audience enterprise --mood professional --a11y

# 风格对比
npx stylekit compare neo-brutalist glassmorphism "creative portfolio"`}
                    </pre>
                    <CopyButton
                      text='npx stylekit smart "e-commerce store" --audience consumer --mood playful'
                      id="cli-smart"
                    />
                  </div>
                </div>

                {/* All Commands */}
                <div>
                  <h2 className="text-2xl font-medium mb-4">全部命令</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { cmd: "help", desc: "显示帮助信息" },
                      { cmd: "styles", desc: "列出所有设计风格" },
                      { cmd: "rules <style>", desc: "查看风格的 lint 规则" },
                      { cmd: "lint <file> --style <style>", desc: "检查代码风格" },
                      { cmd: "recommend <query>", desc: "获取设计推荐" },
                      { cmd: "smart <query> [options]", desc: "智能推荐（带评分）" },
                      { cmd: "compare <s1> <s2> <query>", desc: "对比两种风格" },
                      { cmd: "search <query>", desc: "搜索知识库" },
                    ].map(({ cmd, desc }) => (
                      <div
                        key={cmd}
                        className="p-3 border border-border rounded-lg"
                      >
                        <code className="text-sm font-mono text-foreground">
                          stylekit {cmd}
                        </code>
                        <p className="text-xs text-muted mt-1">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MCP Tab */}
            {activeTab === "mcp" && (
              <div className="space-y-12">
                {/* What is MCP */}
                <div>
                  <h2 className="text-2xl font-medium mb-4">什么是 MCP Server？</h2>
                  <p className="text-muted mb-4">
                    MCP (Model Context Protocol) 是 Anthropic 推出的协议，让 AI 助手可以调用外部工具。
                    StyleKit MCP Server 提供 12 个工具，让 Claude、Cursor 等 AI 可以直接使用设计系统。
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { icon: Search, label: "搜索知识库" },
                      { icon: Palette, label: "风格推荐" },
                      { icon: FileCode, label: "代码检查" },
                      { icon: GitCompare, label: "风格对比" },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="p-3 border border-border rounded-lg flex items-center gap-2"
                      >
                        <Icon className="w-4 h-4 text-muted" />
                        <span className="text-sm">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Claude Desktop Config */}
                <div>
                  <h2 className="text-2xl font-medium mb-4">Claude Desktop 配置</h2>
                  <p className="text-muted mb-4">
                    在 Claude Desktop 的配置文件中添加以下内容：
                  </p>
                  <div className="space-y-2 text-sm text-muted mb-4">
                    <p>macOS: <code className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">~/Library/Application Support/Claude/claude_desktop_config.json</code></p>
                    <p>Windows: <code className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">%APPDATA%\Claude\claude_desktop_config.json</code></p>
                  </div>
                  <div className="relative">
                    <pre className="p-4 bg-zinc-900 text-zinc-100 text-sm font-mono rounded-lg overflow-x-auto">
{`{
  "mcpServers": {
    "stylekit": {
      "command": "npx",
      "args": ["tsx", "/path/to/stylekit/mcp/server.ts"]
    }
  }
}`}
                    </pre>
                    <CopyButton
                      text={`{
  "mcpServers": {
    "stylekit": {
      "command": "npx",
      "args": ["tsx", "/path/to/stylekit/mcp/server.ts"]
    }
  }
}`}
                      id="mcp-claude"
                    />
                  </div>
                </div>

                {/* Cursor Config */}
                <div>
                  <h2 className="text-2xl font-medium mb-4">Cursor 配置</h2>
                  <p className="text-muted mb-4">
                    在项目根目录创建 <code className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">.cursor/mcp.json</code>：
                  </p>
                  <div className="relative">
                    <pre className="p-4 bg-zinc-900 text-zinc-100 text-sm font-mono rounded-lg overflow-x-auto">
{`{
  "mcpServers": {
    "stylekit": {
      "command": "npx",
      "args": ["tsx", "./mcp/server.ts"]
    }
  }
}`}
                    </pre>
                    <CopyButton
                      text={`{
  "mcpServers": {
    "stylekit": {
      "command": "npx",
      "args": ["tsx", "./mcp/server.ts"]
    }
  }
}`}
                      id="mcp-cursor"
                    />
                  </div>
                </div>

                {/* Available Tools */}
                <div>
                  <h2 className="text-2xl font-medium mb-4">可用工具 (12 个)</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { name: "search_knowledge", desc: "搜索设计知识库（产品、颜色、排版等）" },
                      { name: "get_design_recommendation", desc: "获取设计推荐" },
                      { name: "smart_recommend", desc: "智能推荐（带评分和上下文）" },
                      { name: "compare_styles", desc: "对比两种设计风格" },
                      { name: "suggest_style_by_constraints", desc: "根据约束条件推荐风格" },
                      { name: "get_style", desc: "获取风格详情（tokens、recipes）" },
                      { name: "list_styles", desc: "列出所有设计风格" },
                      { name: "lint_code", desc: "检查代码是否符合风格规范" },
                      { name: "get_lint_rules", desc: "获取风格的 lint 规则" },
                      { name: "list_lintable_styles", desc: "列出支持 lint 的风格" },
                      { name: "get_stack_guidelines", desc: "获取技术栈指南" },
                      { name: "generate_design_system", desc: "生成完整设计系统" },
                    ].map(({ name, desc }) => (
                      <div
                        key={name}
                        className="p-3 border border-border rounded-lg"
                      >
                        <code className="text-sm font-mono text-foreground">
                          {name}
                        </code>
                        <p className="text-xs text-muted mt-1">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Example Usage */}
                <div>
                  <h2 className="text-2xl font-medium mb-4">使用示例</h2>
                  <p className="text-muted mb-4">
                    配置好 MCP Server 后，可以在 Claude 中这样使用：
                  </p>
                  <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-1">你：</p>
                      <p className="text-sm text-muted">
                        帮我设计一个 SaaS 产品的 Dashboard，要求专业、有信任感
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Claude：</p>
                      <p className="text-sm text-muted">
                        我来使用 StyleKit 的智能推荐工具为你分析...
                        <br />
                        <span className="text-xs opacity-60">[调用 smart_recommend 工具]</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* API Tab */}
            {activeTab === "api" && (
              <div className="space-y-12">
                {/* Overview */}
                <div>
                  <h2 className="text-2xl font-medium mb-4">HTTP API</h2>
                  <p className="text-muted mb-4">
                    所有功能都可以通过 HTTP API 调用，方便集成到任何系统中。
                  </p>
                </div>

                {/* Lint API */}
                <div>
                  <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                    <FileCode className="w-5 h-5" />
                    /api/lint
                  </h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <pre className="p-4 bg-zinc-900 text-zinc-100 text-sm font-mono rounded-lg overflow-x-auto">
{`# 列出支持 lint 的风格
GET /api/lint

# 获取风格的 lint 规则
GET /api/lint?style=neo-brutalist

# 检查代码
POST /api/lint
Content-Type: application/json

{
  "code": "<button class=\\"rounded-lg shadow-md\\">Test</button>",
  "style": "neo-brutalist"
}`}
                      </pre>
                      <CopyButton
                        text={`curl -X POST /api/lint \\
  -H "Content-Type: application/json" \\
  -d '{"code": "<button class=\\"rounded-lg\\">Test</button>", "style": "neo-brutalist"}'`}
                        id="api-lint"
                      />
                    </div>
                  </div>
                </div>

                {/* Smart API */}
                <div>
                  <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                    <Cpu className="w-5 h-5" />
                    /api/knowledge/smart
                  </h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <pre className="p-4 bg-zinc-900 text-zinc-100 text-sm font-mono rounded-lg overflow-x-auto">
{`# 智能推荐
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

# 风格对比
GET /api/knowledge/smart?action=compare&style1=neo-brutalist&style2=glassmorphism&product=portfolio

# 约束推荐
GET /api/knowledge/smart?action=suggest&priorities=accessibility,performance`}
                      </pre>
                      <CopyButton
                        text={`curl -X POST /api/knowledge/smart \\
  -H "Content-Type: application/json" \\
  -d '{"productQuery": "SaaS dashboard", "context": {"targetAudience": "enterprise"}}'`}
                        id="api-smart"
                      />
                    </div>
                  </div>
                </div>

                {/* Other APIs */}
                <div>
                  <h2 className="text-xl font-medium mb-4">其他 API 端点</h2>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { method: "GET", path: "/api/styles", desc: "列出所有风格" },
                      { method: "GET", path: "/api/styles/[slug]", desc: "获取风格详情" },
                      { method: "GET", path: "/api/styles/[slug]/tokens", desc: "获取风格 tokens" },
                      { method: "GET", path: "/api/styles/[slug]/recipes", desc: "获取组件配方" },
                      { method: "GET", path: "/api/knowledge/search?q=...", desc: "搜索知识库" },
                      { method: "POST", path: "/api/knowledge/recommend", desc: "设计推荐" },
                      { method: "GET", path: "/api/knowledge/stacks", desc: "技术栈列表" },
                      { method: "GET", path: "/api/knowledge/domains", desc: "知识域列表" },
                    ].map(({ method, path, desc }) => (
                      <div
                        key={path}
                        className="p-3 border border-border rounded-lg flex items-center gap-3"
                      >
                        <span
                          className={`px-2 py-0.5 text-xs font-mono rounded ${
                            method === "GET"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          }`}
                        >
                          {method}
                        </span>
                        <code className="text-sm font-mono flex-1">{path}</code>
                        <span className="text-xs text-muted">{desc}</span>
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
