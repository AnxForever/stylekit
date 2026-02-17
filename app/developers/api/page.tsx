"use client";

import { useCallback, useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  ArrowLeft,
  BarChart3,
  Book,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  ExternalLink,
  Layers,
  Palette,
  Send,
  Shield,
  Wrench,
} from "lucide-react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type HttpMethod = "GET" | "POST" | "PATCH";

interface EndpointParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface Endpoint {
  method: HttpMethod;
  path: string;
  description: string;
  params?: EndpointParam[];
  queryParams?: EndpointParam[];
  bodyParams?: EndpointParam[];
  responseExample?: string;
  fetchExample?: string;
  curlExample?: string;
  tryItUrl?: string;
}

interface EndpointCategory {
  id: string;
  title: string;
  icon: typeof Palette;
  description: string;
  endpoints: Endpoint[];
}

/* ------------------------------------------------------------------ */
/*  Method badge colors                                                */
/* ------------------------------------------------------------------ */

const methodColors: Record<HttpMethod, string> = {
  GET: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  PATCH: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

/* ------------------------------------------------------------------ */
/*  API data                                                           */
/* ------------------------------------------------------------------ */

const categories: EndpointCategory[] = [
  {
    id: "styles",
    title: "Styles",
    icon: Palette,
    description: "Browse, inspect, and export design styles with tokens, recipes, and AI rules.",
    endpoints: [
      {
        method: "GET",
        path: "/api/styles",
        description: "List all available design styles with metadata and API links.",
        responseExample: `{
  "total": 12,
  "styles": [
    {
      "slug": "neo-brutalist",
      "name": "Neo-Brutalist",
      "nameEn": "Neo-Brutalist",
      "description": "Bold, raw aesthetic...",
      "styleType": "visual",
      "keywords": ["bold", "raw"],
      "colors": { "primary": "#000" },
      "api": {
        "full": "/api/styles/neo-brutalist",
        "tokens": "/api/styles/neo-brutalist/tokens",
        "recipes": "/api/styles/neo-brutalist/recipes",
        "skillPack": "/api/styles/neo-brutalist/skill-pack"
      }
    }
  ]
}`,
        fetchExample: `const res = await fetch("/api/styles");
const data = await res.json();
console.log(data.styles);`,
        curlExample: `curl https://stylekit.dev/api/styles`,
        tryItUrl: "/api/styles",
      },
      {
        method: "GET",
        path: "/api/styles/[slug]",
        description: "Get full details for a single style including tokens, recipes, philosophy, AI rules, components, and accessibility score.",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        responseExample: `{
  "slug": "neo-brutalist",
  "name": "Neo-Brutalist",
  "description": "...",
  "philosophy": "...",
  "doList": ["Use bold borders", ...],
  "dontList": ["Avoid rounded corners", ...],
  "aiRules": "...",
  "tokens": { ... },
  "recipes": { ... },
  "accessibility": { "score": 85, ... },
  "version": "1.2.0",
  "changelog": [...]
}`,
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist");
const style = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/styles/neo-brutalist`,
        tryItUrl: "/api/styles/neo-brutalist",
      },
      {
        method: "GET",
        path: "/api/styles/[slug]/tokens",
        description: "Get design tokens (colors, spacing, typography, etc.) for a style.",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/tokens");
const tokens = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/styles/neo-brutalist/tokens`,
        tryItUrl: "/api/styles/neo-brutalist/tokens",
      },
      {
        method: "GET",
        path: "/api/styles/[slug]/recipes",
        description: "Get component recipes (implementation patterns) for a style.",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/recipes");
const recipes = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/styles/neo-brutalist/recipes`,
        tryItUrl: "/api/styles/neo-brutalist/recipes",
      },
      {
        method: "GET",
        path: "/api/styles/[slug]/rate",
        description: "Get community rating summary for a style.",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/rate");
const ratings = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/styles/neo-brutalist/rate`,
        tryItUrl: "/api/styles/neo-brutalist/rate",
      },
      {
        method: "POST",
        path: "/api/styles/[slug]/rate",
        description: "Submit a rating for a style.",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        bodyParams: [
          { name: "rating", type: "number", required: true, description: "Rating value (1-5)" },
        ],
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/rate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ rating: 5 })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/styles/neo-brutalist/rate \\
  -H "Content-Type: application/json" \\
  -d '{"rating": 5}'`,
      },
      {
        method: "GET",
        path: "/api/styles/[slug]/comments",
        description: "Get community comments for a style.",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/comments");
const comments = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/styles/neo-brutalist/comments`,
        tryItUrl: "/api/styles/neo-brutalist/comments",
      },
      {
        method: "POST",
        path: "/api/styles/[slug]/comments",
        description: "Post a comment on a style.",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        bodyParams: [
          { name: "author", type: "string", required: true, description: "Comment author name" },
          { name: "content", type: "string", required: true, description: "Comment text" },
        ],
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/comments", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ author: "dev", content: "Great style!" })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/styles/neo-brutalist/comments \\
  -H "Content-Type: application/json" \\
  -d '{"author":"dev","content":"Great style!"}'`,
      },
      {
        method: "GET",
        path: "/api/styles/[slug]/versions",
        description: "Get version history and changelog for a style.",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/versions");
const versions = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/styles/neo-brutalist/versions`,
        tryItUrl: "/api/styles/neo-brutalist/versions",
      },
      {
        method: "GET",
        path: "/api/styles/[slug]/claude-rules",
        description: "Export style as Claude AI rules (CLAUDE.md format).",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/claude-rules");
const rules = await res.text();`,
        curlExample: `curl https://stylekit.dev/api/styles/neo-brutalist/claude-rules`,
        tryItUrl: "/api/styles/neo-brutalist/claude-rules",
      },
      {
        method: "GET",
        path: "/api/styles/[slug]/cursorrules",
        description: "Export style as Cursor AI rules (.cursorrules format).",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/cursorrules");
const rules = await res.text();`,
        curlExample: `curl https://stylekit.dev/api/styles/neo-brutalist/cursorrules`,
        tryItUrl: "/api/styles/neo-brutalist/cursorrules",
      },
      {
        method: "GET",
        path: "/api/styles/[slug]/skill-pack",
        description: "Export style as a skill pack bundle (JSON).",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/skill-pack");
const pack = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/styles/neo-brutalist/skill-pack`,
        tryItUrl: "/api/styles/neo-brutalist/skill-pack",
      },
      {
        method: "GET",
        path: "/api/styles/[slug]/md",
        description: "Export style as Markdown documentation.",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/md");
const markdown = await res.text();`,
        curlExample: `curl https://stylekit.dev/api/styles/neo-brutalist/md`,
        tryItUrl: "/api/styles/neo-brutalist/md",
      },
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: BarChart3,
    description: "Usage statistics, top styles, and combination data.",
    endpoints: [
      {
        method: "GET",
        path: "/api/analytics",
        description: "Get usage analytics. Supports ?top=N for top styles, ?combinations=true for popular pairings.",
        queryParams: [
          { name: "top", type: "number", required: false, description: "Return top N styles by usage" },
          { name: "combinations", type: "boolean", required: false, description: "Set to 'true' to get popular style combinations" },
        ],
        responseExample: `// Default: full usage stats
{ "totalViews": 5000, "byStyle": { ... }, "bySource": { ... } }

// ?top=5
{ "top": [{ "slug": "neo-brutalist", "count": 320 }, ...] }

// ?combinations=true
{ "combinations": [{ "pair": ["neo-brutalist", "glassmorphism"], "count": 45 }, ...] }`,
        fetchExample: `// Full stats
const res = await fetch("/api/analytics");

// Top 5 styles
const top = await fetch("/api/analytics?top=5");

// Popular combos
const combos = await fetch("/api/analytics?combinations=true");`,
        curlExample: `curl https://stylekit.dev/api/analytics
curl https://stylekit.dev/api/analytics?top=5
curl "https://stylekit.dev/api/analytics?combinations=true"`,
        tryItUrl: "/api/analytics",
      },
      {
        method: "GET",
        path: "/api/analytics/dashboard",
        description: "Dashboard analytics with time-range filtering.",
        queryParams: [
          { name: "range", type: "string", required: false, description: "Time range: '7d', '30d', or 'all' (default: 'all')" },
        ],
        fetchExample: `const res = await fetch("/api/analytics/dashboard?range=7d");
const dashboard = await res.json();`,
        curlExample: `curl "https://stylekit.dev/api/analytics/dashboard?range=7d"`,
        tryItUrl: "/api/analytics/dashboard",
      },
    ],
  },
  {
    id: "submissions",
    title: "Submissions",
    icon: Send,
    description: "Submit new community styles and manage the review pipeline.",
    endpoints: [
      {
        method: "POST",
        path: "/api/submit",
        description: "Submit a new style for community review.",
        bodyParams: [
          { name: "name", type: "string", required: true, description: "Style name" },
          { name: "slug", type: "string", required: true, description: "URL-friendly identifier" },
          { name: "description", type: "string", required: true, description: "Style description" },
          { name: "author", type: "string", required: true, description: "Author name" },
          { name: "tokens", type: "object", required: false, description: "Design tokens" },
          { name: "components", type: "object", required: false, description: "Component definitions" },
        ],
        fetchExample: `const res = await fetch("/api/submit", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "My Style",
    slug: "my-style",
    description: "A new design style",
    author: "developer"
  })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/submit \\
  -H "Content-Type: application/json" \\
  -d '{"name":"My Style","slug":"my-style","description":"A new design style","author":"developer"}'`,
      },
      {
        method: "GET",
        path: "/api/submit/list",
        description: "List all submissions with their review status.",
        fetchExample: `const res = await fetch("/api/submit/list");
const submissions = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/submit/list`,
        tryItUrl: "/api/submit/list",
      },
      {
        method: "GET",
        path: "/api/submit/[id]",
        description: "Get details of a specific submission.",
        params: [{ name: "id", type: "string", required: true, description: "Submission ID" }],
        fetchExample: `const res = await fetch("/api/submit/abc123");
const submission = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/submit/abc123`,
      },
      {
        method: "PATCH",
        path: "/api/submit/[id]",
        description: "Update a submission (e.g. edit fields before review).",
        params: [{ name: "id", type: "string", required: true, description: "Submission ID" }],
        bodyParams: [
          { name: "name", type: "string", required: false, description: "Updated name" },
          { name: "description", type: "string", required: false, description: "Updated description" },
        ],
        fetchExample: `const res = await fetch("/api/submit/abc123", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Updated Name" })
});`,
        curlExample: `curl -X PATCH https://stylekit.dev/api/submit/abc123 \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Updated Name"}'`,
      },
      {
        method: "POST",
        path: "/api/submit/[id]/review",
        description: "Submit a review decision for a submission.",
        params: [{ name: "id", type: "string", required: true, description: "Submission ID" }],
        bodyParams: [
          { name: "decision", type: "string", required: true, description: "'approve' or 'reject'" },
          { name: "feedback", type: "string", required: false, description: "Review feedback" },
        ],
        fetchExample: `const res = await fetch("/api/submit/abc123/review", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ decision: "approve", feedback: "Looks great!" })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/submit/abc123/review \\
  -H "Content-Type: application/json" \\
  -d '{"decision":"approve","feedback":"Looks great!"}'`,
      },
    ],
  },
  {
    id: "knowledge",
    title: "Knowledge",
    icon: Book,
    description: "Search the knowledge base, get recommendations, and explore domains and tech stacks.",
    endpoints: [
      {
        method: "GET",
        path: "/api/knowledge/search",
        description: "Unified search across all knowledge domains.",
        queryParams: [
          { name: "q", type: "string", required: true, description: "Search query" },
          { name: "domain", type: "string", required: false, description: "Specific domain to search" },
          { name: "limit", type: "number", required: false, description: "Max results (default: 5)" },
        ],
        fetchExample: `const res = await fetch("/api/knowledge/search?q=dark+mode&limit=3");
const results = await res.json();`,
        curlExample: `curl "https://stylekit.dev/api/knowledge/search?q=dark+mode&limit=3"`,
        tryItUrl: "/api/knowledge/search?q=modern",
      },
      {
        method: "GET",
        path: "/api/knowledge/recommend",
        description: "Get style recommendations based on project context.",
        fetchExample: `const res = await fetch("/api/knowledge/recommend");
const recs = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/knowledge/recommend`,
        tryItUrl: "/api/knowledge/recommend",
      },
      {
        method: "GET",
        path: "/api/knowledge/domains",
        description: "List all available knowledge domains.",
        fetchExample: `const res = await fetch("/api/knowledge/domains");
const domains = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/knowledge/domains`,
        tryItUrl: "/api/knowledge/domains",
      },
      {
        method: "GET",
        path: "/api/knowledge/stacks",
        description: "List supported tech stacks with guidelines.",
        fetchExample: `const res = await fetch("/api/knowledge/stacks");
const stacks = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/knowledge/stacks`,
        tryItUrl: "/api/knowledge/stacks",
      },
      {
        method: "GET",
        path: "/api/knowledge/smart",
        description: "Smart suggestions: compare styles, suggest by priorities, or context-aware recommendations.",
        queryParams: [
          { name: "action", type: "string", required: false, description: "'compare' or 'suggest'" },
          { name: "style1", type: "string", required: false, description: "First style for comparison" },
          { name: "style2", type: "string", required: false, description: "Second style for comparison" },
          { name: "product", type: "string", required: false, description: "Product context for comparison" },
          { name: "priorities", type: "string", required: false, description: "Comma-separated priorities for suggestions" },
        ],
        fetchExample: `// Compare two styles
const res = await fetch(
  "/api/knowledge/smart?action=compare&style1=neo-brutalist&style2=glassmorphism&product=portfolio"
);

// Suggest by priorities
const res2 = await fetch(
  "/api/knowledge/smart?action=suggest&priorities=accessibility,performance"
);`,
        curlExample: `curl "https://stylekit.dev/api/knowledge/smart?action=compare&style1=neo-brutalist&style2=glassmorphism&product=portfolio"`,
        tryItUrl: "/api/knowledge/smart?action=suggest&priorities=accessibility",
      },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: Wrench,
    description: "Lint code, analyze styles, generate with AI, import themes, and check accessibility.",
    endpoints: [
      {
        method: "POST",
        path: "/api/lint",
        description: "Lint code against a specific design style. Returns issues and fix suggestions.",
        bodyParams: [
          { name: "code", type: "string", required: true, description: "HTML/JSX code to lint" },
          { name: "style", type: "string", required: true, description: "Style slug to lint against" },
        ],
        responseExample: `{
  "style": "neo-brutalist",
  "passed": false,
  "forbiddenFound": ["rounded-lg"],
  "requiredMissing": ["border-2"],
  "fixes": [
    { "find": "rounded-lg", "replace": "rounded-none", "reason": "Neo-Brutalist uses sharp corners" }
  ]
}`,
        fetchExample: `const res = await fetch("/api/lint", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    code: '<button class="rounded-lg shadow-md">Test</button>',
    style: "neo-brutalist"
  })
});
const result = await res.json();`,
        curlExample: `curl -X POST https://stylekit.dev/api/lint \\
  -H "Content-Type: application/json" \\
  -d '{"code":"<button class=\\"rounded-lg\\">Test</button>","style":"neo-brutalist"}'`,
      },
      {
        method: "GET",
        path: "/api/lint",
        description: "List styles with lint rules, or get rules for a specific style.",
        queryParams: [
          { name: "style", type: "string", required: false, description: "Style slug to get rules for. Omit to list all lintable styles." },
        ],
        fetchExample: `// List lintable styles
const res = await fetch("/api/lint");

// Get rules for a style
const rules = await fetch("/api/lint?style=neo-brutalist");`,
        curlExample: `curl https://stylekit.dev/api/lint
curl "https://stylekit.dev/api/lint?style=neo-brutalist"`,
        tryItUrl: "/api/lint",
      },
      {
        method: "POST",
        path: "/api/analyze-style",
        description: "Analyze and classify a style from provided tokens or CSS.",
        bodyParams: [
          { name: "tokens", type: "object", required: false, description: "Design tokens to analyze" },
          { name: "css", type: "string", required: false, description: "CSS to analyze" },
        ],
        fetchExample: `const res = await fetch("/api/analyze-style", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ css: "button { border: 3px solid #000; }" })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/analyze-style \\
  -H "Content-Type: application/json" \\
  -d '{"css":"button { border: 3px solid #000; }"}'`,
      },
      {
        method: "POST",
        path: "/api/generate-style",
        description: "Generate a new style using AI based on a text prompt.",
        bodyParams: [
          { name: "prompt", type: "string", required: true, description: "Description of the desired style" },
        ],
        fetchExample: `const res = await fetch("/api/generate-style", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: "A futuristic cyberpunk style with neon accents" })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/generate-style \\
  -H "Content-Type: application/json" \\
  -d '{"prompt":"A futuristic cyberpunk style with neon accents"}'`,
      },
      {
        method: "POST",
        path: "/api/import-theme",
        description: "Import an external theme (e.g. from Tailwind, MUI) and convert to StyleKit format.",
        bodyParams: [
          { name: "theme", type: "object", required: true, description: "Theme configuration object to import" },
          { name: "source", type: "string", required: false, description: "Source framework identifier" },
        ],
        fetchExample: `const res = await fetch("/api/import-theme", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    source: "tailwind",
    theme: { colors: { primary: "#3b82f6" } }
  })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/import-theme \\
  -H "Content-Type: application/json" \\
  -d '{"source":"tailwind","theme":{"colors":{"primary":"#3b82f6"}}}'`,
      },
      {
        method: "POST",
        path: "/api/match-style",
        description: "Find similar styles that match given criteria or tokens.",
        bodyParams: [
          { name: "tokens", type: "object", required: false, description: "Tokens to match against" },
          { name: "description", type: "string", required: false, description: "Text description to match" },
        ],
        fetchExample: `const res = await fetch("/api/match-style", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ description: "minimal and clean" })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/match-style \\
  -H "Content-Type: application/json" \\
  -d '{"description":"minimal and clean"}'`,
      },
      {
        method: "POST",
        path: "/api/quality",
        description: "Calculate a quality score for a style definition.",
        bodyParams: [
          { name: "style", type: "object", required: true, description: "Style definition to score" },
        ],
        fetchExample: `const res = await fetch("/api/quality", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ style: { name: "My Style", tokens: {} } })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/quality \\
  -H "Content-Type: application/json" \\
  -d '{"style":{"name":"My Style","tokens":{}}}'`,
      },
      {
        method: "POST",
        path: "/api/style-extract",
        description: "Extract style tokens and patterns from a live URL.",
        bodyParams: [
          { name: "url", type: "string", required: true, description: "URL to extract style from" },
        ],
        fetchExample: `const res = await fetch("/api/style-extract", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url: "https://example.com" })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/style-extract \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://example.com"}'`,
      },
      {
        method: "GET",
        path: "/api/accessibility",
        description: "Run accessibility checks on styles.",
        fetchExample: `const res = await fetch("/api/accessibility");
const report = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/accessibility`,
        tryItUrl: "/api/accessibility",
      },
    ],
  },
  {
    id: "other",
    title: "Other",
    icon: Layers,
    description: "Archetypes, design system generation, UI planning, and authentication.",
    endpoints: [
      {
        method: "GET",
        path: "/api/archetypes",
        description: "List all style archetypes.",
        fetchExample: `const res = await fetch("/api/archetypes");
const archetypes = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/archetypes`,
        tryItUrl: "/api/archetypes",
      },
      {
        method: "GET",
        path: "/api/archetypes/[id]",
        description: "Get a specific archetype by ID.",
        params: [{ name: "id", type: "string", required: true, description: "Archetype ID" }],
        fetchExample: `const res = await fetch("/api/archetypes/minimal");
const archetype = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/archetypes/minimal`,
      },
      {
        method: "POST",
        path: "/api/generate/design-system",
        description: "Generate a complete design system from a style or prompt.",
        bodyParams: [
          { name: "style", type: "string", required: false, description: "Base style slug" },
          { name: "prompt", type: "string", required: false, description: "Description for generation" },
        ],
        fetchExample: `const res = await fetch("/api/generate/design-system", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ style: "neo-brutalist" })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/generate/design-system \\
  -H "Content-Type: application/json" \\
  -d '{"style":"neo-brutalist"}'`,
      },
      {
        method: "POST",
        path: "/api/ui-plan/schema",
        description: "Get the JSON schema for UI plan validation.",
        fetchExample: `const res = await fetch("/api/ui-plan/schema", { method: "POST" });
const schema = await res.json();`,
        curlExample: `curl -X POST https://stylekit.dev/api/ui-plan/schema`,
      },
      {
        method: "POST",
        path: "/api/ui-plan/validate",
        description: "Validate a UI plan against the schema.",
        bodyParams: [
          { name: "plan", type: "object", required: true, description: "UI plan object to validate" },
        ],
        fetchExample: `const res = await fetch("/api/ui-plan/validate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ plan: { ... } })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/ui-plan/validate \\
  -H "Content-Type: application/json" \\
  -d '{"plan":{}}'`,
      },
      {
        method: "GET",
        path: "/api/auth/callback",
        description: "OAuth callback endpoint for authentication flow.",
        queryParams: [
          { name: "code", type: "string", required: true, description: "OAuth authorization code" },
          { name: "state", type: "string", required: false, description: "CSRF state parameter" },
        ],
        fetchExample: `// This endpoint is typically called by the OAuth provider, not directly.
// Redirect users to your OAuth login URL instead.`,
        curlExample: `# OAuth callback - typically handled by browser redirect, not called directly.`,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

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
  return (
    <button
      onClick={() => onCopy(text, id)}
      className="absolute right-2 top-2 p-1.5 text-zinc-400 transition-colors hover:text-zinc-200"
      title="Copy to clipboard"
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

function ParamTable({ title, params }: { title: string; params: EndpointParam[] }) {
  return (
    <div className="mt-3">
      <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted">{title}</p>
      <div className="overflow-x-auto rounded border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-zinc-50 dark:bg-zinc-800/50">
              <th className="px-3 py-1.5 text-left text-xs font-medium text-muted">Name</th>
              <th className="px-3 py-1.5 text-left text-xs font-medium text-muted">Type</th>
              <th className="px-3 py-1.5 text-left text-xs font-medium text-muted">Required</th>
              <th className="px-3 py-1.5 text-left text-xs font-medium text-muted">Description</th>
            </tr>
          </thead>
          <tbody>
            {params.map((p) => (
              <tr key={p.name} className="border-b border-border last:border-0">
                <td className="px-3 py-1.5">
                  <code className="text-xs">{p.name}</code>
                </td>
                <td className="px-3 py-1.5 text-xs text-muted">{p.type}</td>
                <td className="px-3 py-1.5">
                  {p.required ? (
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">Yes</span>
                  ) : (
                    <span className="text-xs text-muted">No</span>
                  )}
                </td>
                <td className="px-3 py-1.5 text-xs text-muted">{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EndpointCard({
  endpoint,
  categoryId,
  index,
  expandedId,
  onToggle,
  copiedId,
  onCopy,
}: {
  endpoint: Endpoint;
  categoryId: string;
  index: number;
  expandedId: string | null;
  onToggle: (id: string) => void;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}) {
  const cardId = `${categoryId}-${index}`;
  const isExpanded = expandedId === cardId;
  const [codeTab, setCodeTab] = useState<"fetch" | "curl">("fetch");

  return (
    <div className="rounded-lg border border-border">
      <button
        onClick={() => onToggle(cardId)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
        type="button"
      >
        <span className={`shrink-0 rounded px-2 py-0.5 font-mono text-xs font-medium ${methodColors[endpoint.method]}`}>
          {endpoint.method}
        </span>
        <code className="min-w-0 flex-1 truncate text-sm">{endpoint.path}</code>
        <span className="hidden shrink-0 text-xs text-muted sm:block">{endpoint.description}</span>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 shrink-0 text-muted" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-muted" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-border px-4 py-4">
          <p className="mb-3 text-sm text-muted">{endpoint.description}</p>

          {endpoint.params && <ParamTable title="Path Parameters" params={endpoint.params} />}
          {endpoint.queryParams && <ParamTable title="Query Parameters" params={endpoint.queryParams} />}
          {endpoint.bodyParams && <ParamTable title="Request Body" params={endpoint.bodyParams} />}

          {endpoint.responseExample && (
            <div className="mt-4">
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted">Response</p>
              <div className="relative">
                <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 font-mono text-xs text-zinc-100">
                  {endpoint.responseExample}
                </pre>
                <CopyButton
                  text={endpoint.responseExample}
                  id={`${cardId}-resp`}
                  copiedId={copiedId}
                  onCopy={onCopy}
                />
              </div>
            </div>
          )}

          {(endpoint.fetchExample || endpoint.curlExample) && (
            <div className="mt-4">
              <div className="mb-1.5 flex items-center gap-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted">Example</p>
                <div className="flex rounded border border-border text-xs">
                  <button
                    onClick={() => setCodeTab("fetch")}
                    className={`px-2 py-0.5 ${codeTab === "fetch" ? "bg-zinc-200 dark:bg-zinc-700" : ""}`}
                    type="button"
                  >
                    fetch
                  </button>
                  <button
                    onClick={() => setCodeTab("curl")}
                    className={`border-l border-border px-2 py-0.5 ${codeTab === "curl" ? "bg-zinc-200 dark:bg-zinc-700" : ""}`}
                    type="button"
                  >
                    curl
                  </button>
                </div>
              </div>
              <div className="relative">
                <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 font-mono text-xs text-zinc-100">
                  {codeTab === "fetch" ? endpoint.fetchExample : endpoint.curlExample}
                </pre>
                <CopyButton
                  text={(codeTab === "fetch" ? endpoint.fetchExample : endpoint.curlExample) || ""}
                  id={`${cardId}-${codeTab}`}
                  copiedId={copiedId}
                  onCopy={onCopy}
                />
              </div>
            </div>
          )}

          {endpoint.tryItUrl && (
            <div className="mt-4">
              <a
                href={endpoint.tryItUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <ExternalLink className="h-3 w-3" />
                Try it
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ApiReferencePage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const toggleExpanded = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const totalEndpoints = categories.reduce((sum, c) => sum + c.endpoints.length, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-20">
            <Link
              href="/developers"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Developers
            </Link>
            <p className="mb-4 text-xs uppercase tracking-widest text-muted">API Reference</p>
            <h1 className="mb-4 text-4xl md:text-5xl">REST API</h1>
            <p className="max-w-3xl text-lg text-muted">
              {totalEndpoints} endpoints across {categories.length} categories. All endpoints return JSON and are accessible without authentication unless noted otherwise.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted">
              <Shield className="h-4 w-4" />
              Base URL: <code className="rounded bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800">https://stylekit.dev</code>
            </div>
          </div>
        </section>

        {/* Quick nav */}
        <section className="sticky top-0 z-10 border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="flex gap-1 overflow-x-auto">
              {categories.map(({ id, title, icon: Icon }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="flex shrink-0 items-center gap-1.5 border-b-2 border-transparent px-3 py-3 text-sm text-muted transition-colors hover:border-foreground hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                  {title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Endpoint categories */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
            <div className="space-y-16">
              {categories.map((category) => {
                const CatIcon = category.icon;
                return (
                  <div key={category.id} id={category.id}>
                    <div className="mb-4 flex items-center gap-2">
                      <CatIcon className="h-5 w-5" />
                      <h2 className="text-2xl font-medium">{category.title}</h2>
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-muted dark:bg-zinc-800">
                        {category.endpoints.length}
                      </span>
                    </div>
                    <p className="mb-6 text-sm text-muted">{category.description}</p>
                    <div className="space-y-2">
                      {category.endpoints.map((endpoint, i) => (
                        <EndpointCard
                          key={`${endpoint.method}-${endpoint.path}`}
                          endpoint={endpoint}
                          categoryId={category.id}
                          index={i}
                          expandedId={expandedId}
                          onToggle={toggleExpanded}
                          copiedId={copiedId}
                          onCopy={copyToClipboard}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
