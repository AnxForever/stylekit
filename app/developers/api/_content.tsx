"use client";

import { useCallback, useMemo, useState } from "react";
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
  Heart,
  Layers,
  LogIn,
  Palette,
  Search,
  Send,
  Shield,
  User,
  Wrench,
  Workflow,
} from "lucide-react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

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
  auth?: "required" | "admin";
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
  DELETE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
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
        path: "/api/styles/[slug]/versions",
        description: "Get version history and changelog for a style. Optionally request a specific version snapshot.",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        queryParams: [
          { name: "version", type: "string", required: false, description: "Specific version to retrieve (e.g. '1.0.0')" },
        ],
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/versions");
const versions = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/styles/neo-brutalist/versions`,
        tryItUrl: "/api/styles/neo-brutalist/versions",
      },
      {
        method: "GET",
        path: "/api/styles/[slug]/claude-rules",
        description: "Export style as Claude AI rules (CLAUDE.md format). Returns text/markdown.",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/claude-rules");
const rules = await res.text();`,
        curlExample: `curl https://stylekit.dev/api/styles/neo-brutalist/claude-rules`,
        tryItUrl: "/api/styles/neo-brutalist/claude-rules",
      },
      {
        method: "GET",
        path: "/api/styles/[slug]/cursorrules",
        description: "Export style as Cursor AI rules (.cursorrules format). Returns text/plain.",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/cursorrules");
const rules = await res.text();`,
        curlExample: `curl https://stylekit.dev/api/styles/neo-brutalist/cursorrules`,
        tryItUrl: "/api/styles/neo-brutalist/cursorrules",
      },
      {
        method: "GET",
        path: "/api/styles/[slug]/skill-pack",
        description: "Export style as a skill pack bundle (Markdown). Returns text/markdown.",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/skill-pack");
const pack = await res.text();`,
        curlExample: `curl https://stylekit.dev/api/styles/neo-brutalist/skill-pack`,
        tryItUrl: "/api/styles/neo-brutalist/skill-pack",
      },
      {
        method: "GET",
        path: "/api/styles/[slug]/md",
        description: "Export style as a Markdown document for LLM consumption (llms.txt compatible).",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/md");
const markdown = await res.text();`,
        curlExample: `curl https://stylekit.dev/api/styles/neo-brutalist/md`,
        tryItUrl: "/api/styles/neo-brutalist/md",
      },
    ],
  },
  {
    id: "ratings-comments",
    title: "Ratings & Comments",
    icon: Send,
    description: "Community ratings and comments on styles. Some endpoints require authentication.",
    endpoints: [
      {
        method: "GET",
        path: "/api/styles/[slug]/rate",
        description: "Get community rating summary (average and total) for a style.",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        responseExample: `{
  "averageRating": 4.2,
  "totalRatings": 15
}`,
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/rate");
const ratings = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/styles/neo-brutalist/rate`,
        tryItUrl: "/api/styles/neo-brutalist/rate",
      },
      {
        method: "POST",
        path: "/api/styles/[slug]/rate",
        description: "Submit or update a rating for a style. Requires authentication. One rating per user per style.",
        auth: "required",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        bodyParams: [
          { name: "rating", type: "number", required: true, description: "Rating value (integer, 1-5)" },
        ],
        responseExample: `{
  "success": true,
  "averageRating": 4.3,
  "totalRatings": 16
}`,
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
        description: "Get paginated community comments for a style.",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        queryParams: [
          { name: "limit", type: "number", required: false, description: "Max results per page (1-50, default: 20)" },
          { name: "offset", type: "number", required: false, description: "Offset for pagination (default: 0)" },
        ],
        responseExample: `{
  "comments": [
    {
      "id": "uuid",
      "content": "Great style!",
      "author_name": "dev",
      "avatar_url": null,
      "user_id": null,
      "created_at": "2025-01-15T12:00:00Z"
    }
  ],
  "total": 42
}`,
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/comments?limit=10");
const { comments, total } = await res.json();`,
        curlExample: `curl "https://stylekit.dev/api/styles/neo-brutalist/comments?limit=10"`,
        tryItUrl: "/api/styles/neo-brutalist/comments",
      },
      {
        method: "POST",
        path: "/api/styles/[slug]/comments",
        description: "Post a comment on a style. Authenticated users use their profile name. Anonymous users must provide a sessionId. Max 5 comments per identity per style per day.",
        params: [{ name: "slug", type: "string", required: true, description: "Style slug identifier" }],
        bodyParams: [
          { name: "content", type: "string", required: true, description: "Comment text (1-280 characters)" },
          { name: "authorName", type: "string", required: false, description: "Author name (1-50 chars, default: 'Anonymous'). Ignored for authenticated users." },
          { name: "sessionId", type: "string", required: false, description: "Session identifier for anonymous users (required if not authenticated)" },
        ],
        responseExample: `{
  "success": true,
  "comment": {
    "id": "uuid",
    "content": "Great style!",
    "author_name": "dev",
    "avatar_url": null,
    "user_id": null,
    "created_at": "2025-01-15T12:00:00Z"
  }
}`,
        fetchExample: `const res = await fetch("/api/styles/neo-brutalist/comments", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ content: "Great style!", sessionId: "abc-123" })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/styles/neo-brutalist/comments \\
  -H "Content-Type: application/json" \\
  -d '{"content":"Great style!","sessionId":"abc-123"}'`,
      },
    ],
  },
  {
    id: "favorites",
    title: "Favorites",
    icon: Heart,
    description: "Manage user favorite styles. All endpoints require authentication.",
    endpoints: [
      {
        method: "GET",
        path: "/api/favorites",
        description: "Get the authenticated user's favorite style slugs.",
        auth: "required",
        responseExample: `{
  "success": true,
  "favorites": ["neo-brutalist", "glassmorphism"]
}`,
        fetchExample: `const res = await fetch("/api/favorites");
const { favorites } = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/favorites \\
  -H "Cookie: sb-access-token=..."`,
      },
      {
        method: "POST",
        path: "/api/favorites",
        description: "Add a style to favorites. Idempotent (duplicate adds are ignored).",
        auth: "required",
        bodyParams: [
          { name: "slug", type: "string", required: true, description: "Style slug to favorite" },
        ],
        responseExample: `{ "success": true }`,
        fetchExample: `const res = await fetch("/api/favorites", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ slug: "neo-brutalist" })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/favorites \\
  -H "Content-Type: application/json" \\
  -d '{"slug":"neo-brutalist"}'`,
      },
      {
        method: "DELETE",
        path: "/api/favorites",
        description: "Remove a style from favorites.",
        auth: "required",
        queryParams: [
          { name: "slug", type: "string", required: true, description: "Style slug to remove" },
        ],
        responseExample: `{ "success": true }`,
        fetchExample: `const res = await fetch("/api/favorites?slug=neo-brutalist", {
  method: "DELETE"
});`,
        curlExample: `curl -X DELETE "https://stylekit.dev/api/favorites?slug=neo-brutalist"`,
      },
      {
        method: "POST",
        path: "/api/favorites/merge",
        description: "Bulk merge local favorites into the server. Useful after login to sync localStorage favorites.",
        auth: "required",
        bodyParams: [
          { name: "slugs", type: "string[]", required: true, description: "Array of style slugs to merge (max 200)" },
        ],
        responseExample: `{ "success": true, "merged": 5 }`,
        fetchExample: `const res = await fetch("/api/favorites/merge", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ slugs: ["neo-brutalist", "glassmorphism"] })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/favorites/merge \\
  -H "Content-Type: application/json" \\
  -d '{"slugs":["neo-brutalist","glassmorphism"]}'`,
      },
    ],
  },
  {
    id: "profile",
    title: "Profile",
    icon: User,
    description: "Access the authenticated user's activity: comments, ratings, and submissions.",
    endpoints: [
      {
        method: "GET",
        path: "/api/profile/comments",
        description: "Get the authenticated user's comments (most recent 50).",
        auth: "required",
        responseExample: `{
  "success": true,
  "comments": [
    { "id": "uuid", "style_slug": "neo-brutalist", "content": "...", "created_at": "..." }
  ]
}`,
        fetchExample: `const res = await fetch("/api/profile/comments");
const { comments } = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/profile/comments`,
      },
      {
        method: "GET",
        path: "/api/profile/ratings",
        description: "Get the authenticated user's ratings (most recent 50).",
        auth: "required",
        responseExample: `{
  "success": true,
  "ratings": [
    { "id": "uuid", "style_slug": "neo-brutalist", "rating": 5, "created_at": "..." }
  ]
}`,
        fetchExample: `const res = await fetch("/api/profile/ratings");
const { ratings } = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/profile/ratings`,
      },
      {
        method: "GET",
        path: "/api/profile/submissions",
        description: "Get the authenticated user's style submissions (most recent 50).",
        auth: "required",
        responseExample: `{
  "success": true,
  "submissions": [
    { "id": "uuid", "slug": "my-style", "status": "pending", "submitted_at": "..." }
  ]
}`,
        fetchExample: `const res = await fetch("/api/profile/submissions");
const { submissions } = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/profile/submissions`,
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
        description: "List all submissions with their review status. Requires admin access.",
        auth: "admin",
        queryParams: [
          { name: "status", type: "string", required: false, description: "Filter by status: 'pending', 'approved', or 'rejected'" },
        ],
        fetchExample: `const res = await fetch("/api/submit/list?status=pending");
const submissions = await res.json();`,
        curlExample: `curl "https://stylekit.dev/api/submit/list?status=pending"`,
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
        description: "Generate a style from natural language, with optional base-style anchoring and negative constraints (e.g. 'less neon', 'not brutalist').",
        bodyParams: [
          { name: "description", type: "string", required: true, description: "Natural language style description (max 500 chars)" },
          { name: "baseStyle", type: "string", required: false, description: "Optional style slug to anchor the blend (e.g. 'apple-style')" },
        ],
        responseExample: `{
  "name": "Futuristic Fusion",
  "description": "Generated from: Mecha, Outrun, Apple Style. Keywords: futuristic, clean. Avoided: neon, Neo-Brutalist.",
  "tokens": { "...": "..." },
  "sourceStyles": [
    { "slug": "mecha", "weight": 0.44 },
    { "slug": "outrun", "weight": 0.31 },
    { "slug": "apple-style", "weight": 0.25 }
  ],
  "confidence": 82,
  "reasoning": [
    "Anchored to Apple Style.",
    "Matched mood keywords: futuristic, clean.",
    "Applied negative constraints: neon, Neo-Brutalist."
  ],
  "insights": {
    "baseStyle": "apple-style",
    "detectedStyles": ["apple-style"],
    "avoidedStyles": ["neo-brutalist"],
    "matchedKeywords": ["futuristic", "clean"],
    "negativeKeywords": ["neon"]
  }
}`,
        fetchExample: `const res = await fetch("/api/generate-style", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    description: "Like Apple but more futuristic and less neon",
    baseStyle: "apple-style"
  })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/generate-style \\
  -H "Content-Type: application/json" \\
  -d '{"description":"Like Apple but more futuristic and less neon","baseStyle":"apple-style"}'`,
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
    id: "pipeline",
    title: "Pipeline",
    icon: Workflow,
    description: "Run extract -> analyze -> match -> migrate -> generate -> export pipelines. Rate-limited.",
    endpoints: [
      {
        method: "POST",
        path: "/api/pipeline/run",
        description: "Start a new pipeline run and execute all six stages.",
        bodyParams: [
          { name: "sourceUrl", type: "string", required: true, description: "URL to extract styles from (must be http/https, max 2048 chars)" },
          { name: "target.framework", type: "string", required: true, description: "'html' or 'react'" },
          { name: "target.styleSlug", type: "string", required: false, description: "Target style slug to apply" },
          { name: "output.format", type: "string", required: true, description: "'zip'" },
          { name: "options.autoMapTokens", type: "boolean", required: false, description: "Automatically map extracted tokens" },
        ],
        responseExample: `{
  "run": {
    "id": "pl_abc123",
    "status": "completed",
    "stages": [
      { "name": "extract", "status": "completed", "durationMs": 1200 },
      { "name": "analyze", "status": "completed", "durationMs": 320 },
      { "name": "match", "status": "completed", "durationMs": 110 },
      { "name": "migrate", "status": "completed", "durationMs": 95 },
      { "name": "generate", "status": "completed", "durationMs": 140 },
      { "name": "export", "status": "completed", "durationMs": 80 }
    ]
  }
}`,
        fetchExample: `const res = await fetch("/api/pipeline/run", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    sourceUrl: "https://example.com",
    target: { framework: "react" },
    output: { format: "zip" }
  })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/pipeline/run \\
  -H "Content-Type: application/json" \\
  -d '{"sourceUrl":"https://example.com","target":{"framework":"react"},"output":{"format":"zip"}}'`,
      },
      {
        method: "GET",
        path: "/api/pipeline/run/[id]",
        description: "Get the status and details of a pipeline run.",
        params: [{ name: "id", type: "string", required: true, description: "Pipeline run ID" }],
        responseExample: `{
  "run": {
    "id": "pl_abc123",
    "status": "completed",
    "stages": [...],
    "artifacts": { ... }
  }
}`,
        fetchExample: `const res = await fetch("/api/pipeline/run/pl_abc123");
const { run } = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/pipeline/run/pl_abc123`,
      },
      {
        method: "POST",
        path: "/api/pipeline/run/[id]/retry",
        description: "Retry a failed pipeline run from a specific stage.",
        params: [{ name: "id", type: "string", required: true, description: "Pipeline run ID" }],
        bodyParams: [
          { name: "fromStage", type: "string", required: true, description: "Stage to retry from (extract|analyze|match|migrate|generate|export)" },
        ],
        fetchExample: `const res = await fetch("/api/pipeline/run/pl_abc123/retry", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ fromStage: "analyze" })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/pipeline/run/pl_abc123/retry \\
  -H "Content-Type: application/json" \\
  -d '{"fromStage":"analyze"}'`,
      },
      {
        method: "GET",
        path: "/api/pipeline/run/[id]/download",
        description: "Download exported pipeline artifacts as a zip archive.",
        params: [{ name: "id", type: "string", required: true, description: "Pipeline run ID" }],
        fetchExample: `window.location.href = "/api/pipeline/run/pl_abc123/download";`,
        curlExample: `curl -L https://stylekit.dev/api/pipeline/run/pl_abc123/download -o pipeline.zip`,
      },
    ],
  },
  {
    id: "admin",
    title: "Admin",
    icon: Shield,
    description: "Admin-only endpoints for audit logs and system management.",
    endpoints: [
      {
        method: "GET",
        path: "/api/admin/audit",
        description: "Query admin audit log events. Supports filtering and CSV export. Admin access required.",
        auth: "admin",
        queryParams: [
          { name: "limit", type: "number", required: false, description: "Results per page (default: 20)" },
          { name: "offset", type: "number", required: false, description: "Pagination offset (default: 0)" },
          { name: "action", type: "string", required: false, description: "Filter by action type" },
          { name: "search", type: "string", required: false, description: "Search in event details" },
          { name: "days", type: "number", required: false, description: "Filter events from last N days" },
          { name: "format", type: "string", required: false, description: "Set to 'csv' for CSV export" },
        ],
        responseExample: `{
  "events": [
    { "action": "submission.approve", "actor": "admin", "timestamp": "..." }
  ],
  "hasMore": true,
  "nextOffset": 20
}`,
        fetchExample: `const res = await fetch("/api/admin/audit?limit=10&days=7");
const { events } = await res.json();`,
        curlExample: `curl "https://stylekit.dev/api/admin/audit?limit=10&days=7"
curl "https://stylekit.dev/api/admin/audit?format=csv" -o audit.csv`,
      },
    ],
  },
  {
    id: "auth",
    title: "Authentication",
    icon: LogIn,
    description: "OAuth authentication flows. These endpoints handle browser redirects, not direct API calls.",
    endpoints: [
      {
        method: "GET",
        path: "/api/auth/callback",
        description: "GitHub OAuth callback. Exchanges the authorization code for a session. Called by the OAuth provider after user authorization.",
        queryParams: [
          { name: "code", type: "string", required: true, description: "OAuth authorization code" },
          { name: "next", type: "string", required: false, description: "Post-login redirect path (default: '/')" },
        ],
        fetchExample: `// This endpoint is called by the OAuth provider, not directly.
// Redirect users to your Supabase OAuth login URL instead.`,
        curlExample: `# OAuth callback - handled by browser redirect, not called directly.`,
      },
      {
        method: "GET",
        path: "/api/auth/linuxdo",
        description: "Initiate Linux DO OAuth flow. Redirects the user to the Linux DO authorization page.",
        queryParams: [
          { name: "next", type: "string", required: false, description: "Post-login redirect path (default: '/')" },
        ],
        fetchExample: `// Redirect the user to this endpoint to start Linux DO login:
window.location.href = "/api/auth/linuxdo?next=/profile";`,
        curlExample: `# Redirect endpoint - open in browser:
# https://stylekit.dev/api/auth/linuxdo?next=/profile`,
      },
      {
        method: "GET",
        path: "/api/auth/linuxdo/callback",
        description: "Linux DO OAuth callback. Exchanges the code for a session and creates/updates the user.",
        queryParams: [
          { name: "code", type: "string", required: true, description: "OAuth authorization code from Linux DO" },
          { name: "next", type: "string", required: false, description: "Post-login redirect path (default: '/')" },
        ],
        fetchExample: `// This endpoint is called by the Linux DO OAuth provider, not directly.`,
        curlExample: `# OAuth callback - handled by browser redirect, not called directly.`,
      },
    ],
  },
  {
    id: "other",
    title: "Other",
    icon: Layers,
    description: "Archetypes, design system generation, and UI planning.",
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
        description: "Generate a complete design system from product context and style preferences.",
        bodyParams: [
          { name: "productType", type: "string", required: true, description: "Product type (e.g. 'SaaS dashboard', 'e-commerce', 'blog')" },
          { name: "stylePreference", type: "string", required: false, description: "Style slug or 'auto' (default: 'auto')" },
          { name: "stackId", type: "string", required: false, description: "Tech stack ID (e.g. 'nextjs', 'react-vite')" },
          { name: "colorScheme", type: "string", required: false, description: "'light', 'dark', or 'auto' (default: 'auto')" },
          { name: "includeComponents", type: "string[]", required: false, description: "Components to include (e.g. ['button', 'card', 'input', 'nav'])" },
        ],
        fetchExample: `const res = await fetch("/api/generate/design-system", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ productType: "SaaS dashboard", stylePreference: "neo-brutalist" })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/generate/design-system \\
  -H "Content-Type: application/json" \\
  -d '{"productType":"SaaS dashboard","stylePreference":"neo-brutalist"}'`,
      },
      {
        method: "GET",
        path: "/api/ui-plan/schema",
        description: "Get the JSON schema for UI plan validation.",
        fetchExample: `const res = await fetch("/api/ui-plan/schema");
const schema = await res.json();`,
        curlExample: `curl https://stylekit.dev/api/ui-plan/schema`,
        tryItUrl: "/api/ui-plan/schema",
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
  body: JSON.stringify({ plan: {} })
});`,
        curlExample: `curl -X POST https://stylekit.dev/api/ui-plan/validate \\
  -H "Content-Type: application/json" \\
  -d '{"plan":{}}'`,
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

function AuthBadge({ auth }: { auth: "required" | "admin" }) {
  return (
    <span
      className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
        auth === "admin"
          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
          : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
      }`}
    >
      {auth === "admin" ? "Admin" : "Auth"}
    </span>
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
        {endpoint.auth && <AuthBadge auth={endpoint.auth} />}
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

          {endpoint.auth && (
            <div className="mb-3 flex items-center gap-2 rounded bg-zinc-100 px-3 py-2 text-xs dark:bg-zinc-800">
              <Shield className="h-3.5 w-3.5 text-muted" />
              <span className="text-muted">
                {endpoint.auth === "admin"
                  ? "Requires admin access."
                  : "Requires authentication."}
              </span>
            </div>
          )}

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

export default function ApiReferenceContent() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const copyToClipboard = useCallback(async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const toggleExpanded = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        endpoints: cat.endpoints.filter(
          (ep) =>
            ep.path.toLowerCase().includes(q) ||
            ep.method.toLowerCase().includes(q) ||
            ep.description.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.endpoints.length > 0);
  }, [searchQuery]);

  const totalEndpoints = categories.reduce((sum, c) => sum + c.endpoints.length, 0);
  const filteredTotal = filteredCategories.reduce((sum, c) => sum + c.endpoints.length, 0);

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

            {/* Search */}
            <div className="relative mt-6 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search endpoints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-foreground/20"
              />
              {searchQuery && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">
                  {filteredTotal} result{filteredTotal !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Quick nav */}
        <section className="sticky top-0 z-10 border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="flex gap-1 overflow-x-auto">
              {filteredCategories.map(({ id, title, icon: Icon, endpoints }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="flex shrink-0 items-center gap-1.5 border-b-2 border-transparent px-3 py-3 text-sm text-muted transition-colors hover:border-foreground hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                  {title}
                  <span className="rounded-full bg-zinc-100 px-1.5 text-[10px] dark:bg-zinc-800">
                    {endpoints.length}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Endpoint categories */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
            {filteredCategories.length === 0 ? (
              <div className="py-16 text-center">
                <Search className="mx-auto mb-4 h-8 w-8 text-muted" />
                <p className="text-lg text-muted">No endpoints match &quot;{searchQuery}&quot;</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-2 text-sm text-muted underline hover:text-foreground"
                  type="button"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="space-y-16">
                {filteredCategories.map((category) => {
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
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
