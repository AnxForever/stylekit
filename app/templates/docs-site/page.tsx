"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  Book,
  ChevronRight,
  Code2,
  Copy,
  Check,
  ExternalLink,
  Menu,
  Search,
  X,
  ChevronDown,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavItem {
  label: string;
  pageId: string;
}

interface NavSection {
  title: string;
  sectionId: string;
  items: NavItem[];
}

interface TocEntry {
  id: string;
  label: string;
}

interface PageContent {
  title: string;
  subtitle: string;
  section: string;
  toc: TocEntry[];
}

// ---------------------------------------------------------------------------
// Sidebar data
// ---------------------------------------------------------------------------

const sidebarSections: NavSection[] = [
  {
    title: "Getting Started",
    sectionId: "getting-started",
    items: [
      { label: "Introduction", pageId: "introduction" },
      { label: "Installation", pageId: "installation" },
      { label: "Quick Start", pageId: "quick-start" },
    ],
  },
  {
    title: "Core Concepts",
    sectionId: "core-concepts",
    items: [
      { label: "Configuration", pageId: "configuration" },
      { label: "Authentication", pageId: "authentication" },
      { label: "Data Types", pageId: "data-types" },
    ],
  },
  {
    title: "API Reference",
    sectionId: "api-reference",
    items: [
      { label: "REST API", pageId: "api-reference" },
      { label: "GraphQL", pageId: "graphql" },
      { label: "Webhooks", pageId: "webhooks" },
    ],
  },
  {
    title: "Examples",
    sectionId: "examples",
    items: [
      { label: "Basic Usage", pageId: "examples" },
      { label: "Advanced Patterns", pageId: "advanced-patterns" },
      { label: "Migration Guide", pageId: "migration-guide" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Page metadata
// ---------------------------------------------------------------------------

const pageMeta: Record<string, PageContent> = {
  "introduction": {
    title: "Introduction",
    subtitle: "Welcome to DocKit — a modern framework for building fast, scalable web applications.",
    section: "Getting Started",
    toc: [
      { id: "overview", label: "Overview" },
      { id: "features", label: "Features" },
      { id: "requirements", label: "Requirements" },
      { id: "getting-help", label: "Getting Help" },
    ],
  },
  "installation": {
    title: "Installation",
    subtitle: "Get DocKit installed and running in your project in under two minutes.",
    section: "Getting Started",
    toc: [
      { id: "prerequisites", label: "Prerequisites" },
      { id: "package-manager", label: "Package Manager" },
      { id: "manual-setup", label: "Manual Setup" },
      { id: "verify", label: "Verify Installation" },
    ],
  },
  "quick-start": {
    title: "Quick Start",
    subtitle: "Build your first DocKit application from scratch.",
    section: "Getting Started",
    toc: [
      { id: "scaffold", label: "Scaffold Project" },
      { id: "structure", label: "Project Structure" },
      { id: "first-page", label: "Your First Page" },
      { id: "deploy", label: "Deploy" },
    ],
  },
  "configuration": {
    title: "Configuration",
    subtitle: "Understand and customize every aspect of your DocKit application.",
    section: "Core Concepts",
    toc: [
      { id: "config-file", label: "Config File" },
      { id: "options-table", label: "Options Reference" },
      { id: "env-vars", label: "Environment Variables" },
      { id: "advanced", label: "Advanced" },
    ],
  },
  "authentication": {
    title: "Authentication",
    subtitle: "Add secure authentication to your application using DocKit Auth.",
    section: "Core Concepts",
    toc: [
      { id: "overview", label: "Overview" },
      { id: "providers", label: "Providers" },
      { id: "session", label: "Session Management" },
      { id: "guards", label: "Route Guards" },
    ],
  },
  "data-types": {
    title: "Data Types",
    subtitle: "Type-safe primitives and utilities shipped with DocKit.",
    section: "Core Concepts",
    toc: [
      { id: "primitives", label: "Primitives" },
      { id: "generics", label: "Generics" },
      { id: "utilities", label: "Utility Types" },
    ],
  },
  "api-reference": {
    title: "REST API",
    subtitle: "Complete reference for the DocKit REST API endpoints.",
    section: "API Reference",
    toc: [
      { id: "base-url", label: "Base URL" },
      { id: "authentication", label: "Authentication" },
      { id: "endpoints", label: "Endpoints" },
      { id: "errors", label: "Error Codes" },
    ],
  },
  "graphql": {
    title: "GraphQL",
    subtitle: "Use the DocKit GraphQL API for flexible, efficient data fetching.",
    section: "API Reference",
    toc: [
      { id: "schema", label: "Schema" },
      { id: "queries", label: "Queries" },
      { id: "mutations", label: "Mutations" },
      { id: "subscriptions", label: "Subscriptions" },
    ],
  },
  "webhooks": {
    title: "Webhooks",
    subtitle: "Receive real-time event notifications from DocKit via webhooks.",
    section: "API Reference",
    toc: [
      { id: "setup", label: "Setup" },
      { id: "events", label: "Event Types" },
      { id: "payloads", label: "Payload Format" },
      { id: "security", label: "Security" },
    ],
  },
  "examples": {
    title: "Basic Usage",
    subtitle: "Practical examples to get you productive with DocKit quickly.",
    section: "Examples",
    toc: [
      { id: "hello-world", label: "Hello World" },
      { id: "fetch-data", label: "Fetching Data" },
      { id: "forms", label: "Handling Forms" },
      { id: "routing", label: "Client Routing" },
    ],
  },
  "advanced-patterns": {
    title: "Advanced Patterns",
    subtitle: "Production patterns used in large-scale DocKit applications.",
    section: "Examples",
    toc: [
      { id: "middleware", label: "Middleware" },
      { id: "caching", label: "Caching Strategy" },
      { id: "code-splitting", label: "Code Splitting" },
    ],
  },
  "migration-guide": {
    title: "Migration Guide",
    subtitle: "Step-by-step instructions for upgrading between DocKit versions.",
    section: "Examples",
    toc: [
      { id: "v1-to-v2", label: "v1 to v2" },
      { id: "v2-to-v3", label: "v2 to v3" },
      { id: "breaking-changes", label: "Breaking Changes" },
      { id: "codemods", label: "Codemods" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Version info
// ---------------------------------------------------------------------------

const versions = ["v3.0", "v2.0", "v1.0"];

const versionBadgeColor: Record<string, string> = {
  "v3.0": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "v2.0": "bg-amber-50 text-amber-700 border-amber-200",
  "v1.0": "bg-gray-100 text-gray-600 border-gray-200",
};

// ---------------------------------------------------------------------------
// CodeBlock component
// ---------------------------------------------------------------------------

interface CodeBlockProps {
  language: string;
  code: string;
  index: number;
  copiedIndex: number | null;
  onCopy: (index: number, code: string) => void;
}

function CodeBlock({ language, code, index, copiedIndex, onCopy }: CodeBlockProps) {
  const isCopied = copiedIndex === index;
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden my-5">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Code2 className="w-3.5 h-3.5" />
          <span>{language}</span>
        </div>
        <button
          onClick={() => onCopy(index, code)}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          aria-label="Copy code"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-sm text-gray-300 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page content renderers
// ---------------------------------------------------------------------------

interface ContentProps {
  copiedIndex: number | null;
  onCopy: (index: number, code: string) => void;
  activeSection: string;
  onSectionClick: (id: string) => void;
  version: string;
}

function IntroductionContent({ copiedIndex, onCopy }: ContentProps) {
  return (
    <>
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Overview</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          DocKit is a batteries-included web framework designed with developer experience at the
          forefront. It provides a set of strong conventions, type-safe utilities, and composable
          primitives that let you ship production-ready applications without the usual configuration
          overhead.
        </p>
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 text-sm text-indigo-800">
          <strong>Note:</strong> This is an interactive template demo. In a real docs site,
          content would be sourced from MDX files or a headless CMS.
        </div>
      </section>

      <section id="features" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Features</h2>
        <ul className="space-y-4 text-gray-600">
          {[
            ["File-based Routing", "Automatic route generation from your file structure — no manual registration."],
            ["Server-side Rendering", "Built-in SSR and streaming with React Suspense out of the box."],
            ["TypeScript Native", "First-class TypeScript with zero-config inference and strict checks."],
            ["Edge Ready", "Deploy to the edge runtime with zero cold-start overhead."],
            ["Plugin Ecosystem", "Extend DocKit with a growing library of first-party and community plugins."],
          ].map(([title, desc]) => (
            <li key={title} className="flex gap-3">
              <span className="mt-1.5 w-2 h-2 bg-indigo-500 rounded-full shrink-0" />
              <span>
                <strong className="text-gray-900">{title}</strong> — {desc}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section id="requirements" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Requirements</h2>
        <p className="text-gray-600 mb-4">
          DocKit requires Node.js 18 or later. Run the command below to scaffold a new project:
        </p>
        <CodeBlock
          index={0}
          language="Terminal"
          code={`npx create-dockit@latest my-app\ncd my-app\nnpm run dev`}
          copiedIndex={copiedIndex}
          onCopy={onCopy}
        />
        <p className="text-gray-600 mt-4">
          Your dev server will be available at{" "}
          <code className="px-1.5 py-0.5 bg-gray-100 rounded text-sm font-mono text-gray-800">
            http://localhost:3000
          </code>
          .
        </p>
      </section>

      <section id="getting-help" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Getting Help</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            ["GitHub Discussions", "Ask questions and get answers from the community."],
            ["Discord Server", "Chat with other developers in real-time."],
            ["Stack Overflow", "Search or post tagged questions for async support."],
            ["Office Hours", "Weekly live sessions with the core team."],
          ].map(([title, desc]) => (
            <a
              key={title}
              href="#"
              className="p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/40 transition-all group"
            >
              <h3 className="font-semibold mb-1 group-hover:text-indigo-700 flex items-center gap-1.5">
                {title}
                <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

function InstallationContent({ copiedIndex, onCopy }: ContentProps) {
  return (
    <>
      <section id="prerequisites" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Prerequisites</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Before installing DocKit, make sure your environment meets the following requirements:
        </p>
        <ul className="space-y-2 text-gray-600">
          {["Node.js >= 18.0.0", "npm >= 9 or pnpm >= 8 or bun >= 1.0", "Git (for version control)"].map((req) => (
            <li key={req} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 shrink-0" />
              <code className="text-sm font-mono">{req}</code>
            </li>
          ))}
        </ul>
      </section>

      <section id="package-manager" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Package Manager</h2>
        <p className="text-gray-600 mb-4">Install DocKit using your preferred package manager:</p>
        <CodeBlock index={1} language="npm" code={`npm install dockit`} copiedIndex={copiedIndex} onCopy={onCopy} />
        <CodeBlock index={2} language="pnpm" code={`pnpm add dockit`} copiedIndex={copiedIndex} onCopy={onCopy} />
        <CodeBlock index={3} language="bun" code={`bun add dockit`} copiedIndex={copiedIndex} onCopy={onCopy} />
      </section>

      <section id="manual-setup" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Manual Setup</h2>
        <p className="text-gray-600 mb-4">
          For projects that need full control, set up DocKit manually by adding it to an existing app:
        </p>
        <CodeBlock
          index={4}
          language="TypeScript"
          code={`// dockit.config.ts\nimport { defineConfig } from "dockit";\n\nexport default defineConfig({\n  root: "./src",\n  output: "./dist",\n  plugins: [],\n});`}
          copiedIndex={copiedIndex}
          onCopy={onCopy}
        />
      </section>

      <section id="verify" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Verify Installation</h2>
        <p className="text-gray-600 mb-4">Confirm everything is working by running the CLI version check:</p>
        <CodeBlock index={5} language="Terminal" code={`npx dockit --version\n# dockit v3.0.0`} copiedIndex={copiedIndex} onCopy={onCopy} />
      </section>
    </>
  );
}

function ConfigurationContent({ copiedIndex, onCopy }: ContentProps) {
  return (
    <>
      <section id="config-file" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Config File</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          DocKit uses a{" "}
          <code className="px-1.5 py-0.5 bg-gray-100 rounded text-sm font-mono">dockit.config.ts</code>{" "}
          file at the project root. TypeScript is fully supported for editor IntelliSense.
        </p>
        <CodeBlock
          index={10}
          language="TypeScript"
          code={`import { defineConfig } from "dockit";\n\nexport default defineConfig({\n  root: "./src",\n  output: "./dist",\n  port: 3000,\n  logLevel: "info",\n  plugins: [],\n});`}
          copiedIndex={copiedIndex}
          onCopy={onCopy}
        />
      </section>

      <section id="options-table" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">Options Reference</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Option</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Default</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["root", "string", '"./src"', "Source directory for your application."],
                ["output", "string", '"./dist"', "Output directory for the production build."],
                ["port", "number", "3000", "Port the dev server listens on."],
                ["logLevel", "string", '"info"', "Verbosity of log output (debug | info | warn | error)."],
                ["plugins", "Plugin[]", "[]", "Array of DocKit plugins to activate."],
                ["strict", "boolean", "true", "Enable strict TypeScript checks across the project."],
              ].map(([opt, type, def, desc]) => (
                <tr key={opt} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-indigo-700">{opt}</td>
                  <td className="px-4 py-3 font-mono text-gray-500">{type}</td>
                  <td className="px-4 py-3 font-mono text-gray-500">{def}</td>
                  <td className="px-4 py-3 text-gray-600">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="env-vars" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Environment Variables</h2>
        <p className="text-gray-600 mb-4">
          Prefix public variables with <code className="px-1 py-0.5 bg-gray-100 rounded text-sm font-mono">DOCKIT_PUBLIC_</code>.
          All other variables remain server-only.
        </p>
        <CodeBlock
          index={11}
          language=".env"
          code={`DOCKIT_PUBLIC_APP_NAME=MyApp\nDOCKIT_PUBLIC_API_URL=https://api.example.com\nDATABASE_URL=postgresql://user:pass@localhost/db\nSECRET_KEY=super-secret-value`}
          copiedIndex={copiedIndex}
          onCopy={onCopy}
        />
      </section>

      <section id="advanced" className="mb-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Advanced Configuration</h3>
        <p className="text-gray-600 leading-relaxed">
          For monorepo setups, use the <code className="px-1 py-0.5 bg-gray-100 rounded text-sm font-mono">extends</code> key
          to inherit from a base config:
        </p>
        <CodeBlock
          index={12}
          language="TypeScript"
          code={`export default defineConfig({\n  extends: "../../dockit.base.ts",\n  port: 4000,\n});`}
          copiedIndex={copiedIndex}
          onCopy={onCopy}
        />
      </section>
    </>
  );
}

function ApiReferenceContent({ copiedIndex, onCopy }: ContentProps) {
  return (
    <>
      <section id="base-url" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Base URL</h2>
        <p className="text-gray-600 mb-4">All API requests are made to the following base URL:</p>
        <CodeBlock index={20} language="HTTP" code={`https://api.dockit.dev/v3`} copiedIndex={copiedIndex} onCopy={onCopy} />
      </section>

      <section id="authentication" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Authentication</h2>
        <p className="text-gray-600 mb-4">
          Authenticate by passing your API key in the <code className="px-1 py-0.5 bg-gray-100 rounded text-sm font-mono">Authorization</code> header:
        </p>
        <CodeBlock
          index={21}
          language="HTTP"
          code={`GET /v3/projects HTTP/1.1\nHost: api.dockit.dev\nAuthorization: Bearer dk_live_xxxxxxxxxxxx\nContent-Type: application/json`}
          copiedIndex={copiedIndex}
          onCopy={onCopy}
        />
      </section>

      <section id="endpoints" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">Endpoints</h2>
        <div className="space-y-5">
          {[
            { method: "GET", path: "/projects", desc: "List all projects in the authenticated account.", color: "bg-green-100 text-green-800" },
            { method: "POST", path: "/projects", desc: "Create a new project.", color: "bg-blue-100 text-blue-800" },
            { method: "GET", path: "/projects/:id", desc: "Retrieve a single project by ID.", color: "bg-green-100 text-green-800" },
            { method: "PATCH", path: "/projects/:id", desc: "Update project metadata.", color: "bg-amber-100 text-amber-800" },
            { method: "DELETE", path: "/projects/:id", desc: "Permanently delete a project.", color: "bg-red-100 text-red-800" },
          ].map(({ method, path, desc, color }) => (
            <div key={path} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-indigo-200 transition-colors">
              <span className={`${color} text-xs font-bold px-2.5 py-1 rounded-md font-mono shrink-0 mt-0.5`}>{method}</span>
              <div>
                <code className="text-sm font-mono text-gray-900">{path}</code>
                <p className="text-sm text-gray-500 mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="errors" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Error Codes</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Code</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["400", "Bad Request", "Invalid request body or missing required fields."],
                ["401", "Unauthorized", "Missing or invalid API key."],
                ["403", "Forbidden", "Authenticated user lacks permission."],
                ["404", "Not Found", "Resource does not exist."],
                ["429", "Too Many Requests", "Rate limit exceeded. Retry after the indicated delay."],
                ["500", "Server Error", "Unexpected error on our side."],
              ].map(([code, status, meaning]) => (
                <tr key={code} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-gray-900 font-medium">{code}</td>
                  <td className="px-4 py-3 text-gray-700">{status}</td>
                  <td className="px-4 py-3 text-gray-500">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function ExamplesContent({ copiedIndex, onCopy }: ContentProps) {
  return (
    <>
      <section id="hello-world" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Hello World</h2>
        <p className="text-gray-600 mb-4">
          The simplest possible DocKit page — create a file at{" "}
          <code className="px-1 py-0.5 bg-gray-100 rounded text-sm font-mono">src/pages/index.tsx</code>:
        </p>
        <CodeBlock
          index={30}
          language="TypeScript"
          code={`export default function HomePage() {\n  return (\n    <main>\n      <h1>Hello, DocKit!</h1>\n    </main>\n  );\n}`}
          copiedIndex={copiedIndex}
          onCopy={onCopy}
        />
      </section>

      <section id="fetch-data" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Fetching Data</h2>
        <p className="text-gray-600 mb-4">
          Use the built-in <code className="px-1 py-0.5 bg-gray-100 rounded text-sm font-mono">useData</code> hook
          to fetch server-side data with automatic caching:
        </p>
        <CodeBlock
          index={31}
          language="TypeScript"
          code={`import { useData } from "dockit";\n\ninterface Project {\n  id: string;\n  name: string;\n  status: "active" | "archived";\n}\n\nexport default function ProjectsPage() {\n  const { data, error, isLoading } = useData<Project[]>("/api/projects");\n\n  if (isLoading) return <p>Loading...</p>;\n  if (error) return <p>Error: {error.message}</p>;\n\n  return (\n    <ul>\n      {data.map((project) => (\n        <li key={project.id}>{project.name}</li>\n      ))}\n    </ul>\n  );\n}`}
          copiedIndex={copiedIndex}
          onCopy={onCopy}
        />
      </section>

      <section id="forms" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Handling Forms</h2>
        <p className="text-gray-600 mb-4">
          DocKit ships a type-safe form helper that integrates with Zod schemas:
        </p>
        <CodeBlock
          index={32}
          language="TypeScript"
          code={`import { useForm } from "dockit/forms";\nimport { z } from "zod";\n\nconst schema = z.object({\n  email: z.string().email(),\n  message: z.string().min(10),\n});\n\nexport default function ContactForm() {\n  const form = useForm({ schema });\n\n  return (\n    <form onSubmit={form.handleSubmit((data) => console.log(data))}>\n      <input {...form.register("email")} placeholder="Email" />\n      <textarea {...form.register("message")} placeholder="Message" />\n      <button type="submit">Send</button>\n    </form>\n  );\n}`}
          copiedIndex={copiedIndex}
          onCopy={onCopy}
        />
      </section>

      <section id="routing" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Client Routing</h2>
        <p className="text-gray-600 mb-4">
          Navigate programmatically with the <code className="px-1 py-0.5 bg-gray-100 rounded text-sm font-mono">useRouter</code> hook:
        </p>
        <CodeBlock
          index={33}
          language="TypeScript"
          code={`import { useRouter } from "dockit";\n\nexport function LoginButton() {\n  const router = useRouter();\n\n  const handleLogin = async () => {\n    await signIn();\n    router.push("/dashboard");\n  };\n\n  return <button onClick={handleLogin}>Sign In</button>;\n}`}
          copiedIndex={copiedIndex}
          onCopy={onCopy}
        />
      </section>
    </>
  );
}

function GenericContent({ pageId }: { pageId: string }) {
  const meta = pageMeta[pageId];
  return (
    <div className="py-8">
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
        <Book className="w-10 h-10 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{meta?.title ?? pageId}</h2>
        <p className="text-gray-400 text-sm">
          This section is available in the full documentation. Navigate using the sidebar.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function DocsSiteTemplate() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("introduction");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [version, setVersion] = useState("v3.0");
  const [activeSection, setActiveSection] = useState("");
  const [versionDropdownOpen, setVersionDropdownOpen] = useState(false);

  const handleCopy = useCallback((index: number, code: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  const handlePageChange = (pageId: string) => {
    setActivePage(pageId);
    setActiveSection("");
    setSidebarOpen(false);
  };

  const filteredSections = searchQuery.trim()
    ? sidebarSections
        .map((section) => ({
          ...section,
          items: section.items.filter((item) =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((section) => section.items.length > 0)
    : sidebarSections;

  const currentMeta = pageMeta[activePage] ?? {
    title: activePage,
    subtitle: "",
    section: "Docs",
    toc: [],
  };

  const contentProps: ContentProps = {
    copiedIndex,
    onCopy: handleCopy,
    activeSection,
    onSectionClick: setActiveSection,
    version,
  };

  const renderContent = () => {
    switch (activePage) {
      case "introduction":
        return <IntroductionContent {...contentProps} />;
      case "installation":
        return <InstallationContent {...contentProps} />;
      case "configuration":
        return <ConfigurationContent {...contentProps} />;
      case "api-reference":
        return <ApiReferenceContent {...contentProps} />;
      case "examples":
        return <ExamplesContent {...contentProps} />;
      default:
        return <GenericContent pageId={activePage} />;
    }
  };

  // Determine next page for pagination
  const allItems = sidebarSections.flatMap((s) => s.items);
  const currentIdx = allItems.findIndex((i) => i.pageId === activePage);
  const prevItem = currentIdx > 0 ? allItems[currentIdx - 1] : null;
  const nextItem = currentIdx < allItems.length - 1 ? allItems[currentIdx + 1] : null;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-14">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link href="/templates/docs-site" className="flex items-center gap-2 font-semibold">
              <Book className="w-5 h-5 text-indigo-600" />
              <span className="text-gray-900">DocKit</span>
            </Link>

            {/* Version selector */}
            <div className="relative">
              <button
                onClick={() => setVersionDropdownOpen((v) => !v)}
                className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border transition-colors ${versionBadgeColor[version]}`}
              >
                {version}
                <ChevronDown className="w-3 h-3" />
              </button>
              {versionDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[100px]">
                  {versions.map((v) => (
                    <button
                      key={v}
                      onClick={() => {
                        setVersion(v);
                        setVersionDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        v === version ? "text-indigo-700 font-medium" : "text-gray-700"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center - Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 lg:w-80 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              GitHub
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-14 max-w-[90rem] mx-auto flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-14 h-[calc(100vh-3.5rem)] w-[280px] shrink-0 bg-gray-50 border-r border-gray-200 overflow-y-auto z-30 transition-transform duration-200 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Mobile search */}
          <div className="md:hidden px-4 pt-4 pb-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-300 transition"
              />
            </div>
          </div>

          <nav className="p-4 pt-6">
            {filteredSections.length === 0 ? (
              <div className="text-sm text-gray-400 text-center py-8">
                No results for &ldquo;{searchQuery}&rdquo;
              </div>
            ) : (
              filteredSections.map((section) => (
                <div key={section.sectionId} className="mb-6">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                    {section.title}
                  </h4>
                  <ul className="space-y-0.5">
                    {section.items.map((item) => {
                      const isActive = activePage === item.pageId;
                      return (
                        <li key={item.pageId}>
                          <button
                            onClick={() => handlePageChange(item.pageId)}
                            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                              isActive
                                ? "bg-indigo-50 text-indigo-700 font-medium border-l-2 border-indigo-600 pl-[10px]"
                                : "text-gray-600 hover:bg-white hover:text-gray-900"
                            }`}
                          >
                            {item.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            )}
          </nav>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <button
            className="fixed inset-0 bg-black/20 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-6 md:px-10 lg:px-16 py-10">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-8" aria-label="Breadcrumb">
              <span>Docs</span>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <span>{currentMeta.section}</span>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <span className="text-gray-700 font-medium">{currentMeta.title}</span>

              {/* Version badge inline */}
              <span
                className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full border ${versionBadgeColor[version]}`}
              >
                {version}
              </span>
            </nav>

            {/* Page header */}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              {currentMeta.title}
            </h1>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed">{currentMeta.subtitle}</p>

            {/* Dynamic page content */}
            {renderContent()}

            {/* Pagination */}
            <div className="flex items-center justify-between pt-8 mt-4 border-t border-gray-100">
              {prevItem ? (
                <button
                  onClick={() => handlePageChange(prevItem.pageId)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-700 transition-colors group"
                >
                  <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
                  <span>
                    <span className="block text-xs text-gray-400 mb-0.5">Previous</span>
                    {prevItem.label}
                  </span>
                </button>
              ) : (
                <div />
              )}
              {nextItem ? (
                <button
                  onClick={() => handlePageChange(nextItem.pageId)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-700 transition-colors group text-right"
                >
                  <span>
                    <span className="block text-xs text-gray-400 mb-0.5">Next</span>
                    {nextItem.label}
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </main>

        {/* Table of Contents */}
        <aside className="hidden xl:block w-56 shrink-0">
          <div className="sticky top-14 pt-10 pr-6">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              On this page
            </h4>
            {currentMeta.toc.length > 0 ? (
              <ul className="space-y-1.5 text-sm border-l border-gray-200">
                {currentMeta.toc.map((entry) => {
                  const isActive = activeSection === entry.id;
                  return (
                    <li key={entry.id}>
                      <a
                        href={`#${entry.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSection(entry.id);
                          document.getElementById(entry.id)?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={`block pl-4 py-0.5 transition-colors -ml-px ${
                          isActive
                            ? "border-l-2 border-indigo-500 text-indigo-700 font-medium"
                            : "text-gray-400 hover:text-gray-700"
                        }`}
                      >
                        {entry.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-xs text-gray-300 pl-4">No headings</p>
            )}
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 px-4 md:px-8 mt-8">
        <div className="max-w-[90rem] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <p>
            Copyright 2025 DocKit. Part of{" "}
            <Link href="/templates" className="text-gray-500 hover:text-indigo-600 transition-colors">
              StyleKit Templates
            </Link>
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-600 transition-colors flex items-center gap-1">
              GitHub <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>

      <TemplateBackButton variant="dark" />
    </div>
  );
}
