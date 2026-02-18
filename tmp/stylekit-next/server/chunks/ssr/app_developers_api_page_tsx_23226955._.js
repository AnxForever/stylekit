module.exports=[140935,a=>{"use strict";var b=a.i(739923),c=a.i(728306),d=a.i(945431),e=a.i(759819),f=a.i(572284),g=a.i(12070),h=a.i(610983),i=a.i(41203),j=a.i(652024),k=a.i(819447),l=a.i(691337),m=a.i(394582),n=a.i(165690),o=a.i(962196),p=a.i(534887),q=a.i(632777),r=a.i(980680),s=a.i(815680);let t={GET:"bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",POST:"bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",PATCH:"bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"},u=[{id:"styles",title:"Styles",icon:o.Palette,description:"Browse, inspect, and export design styles with tokens, recipes, and AI rules.",endpoints:[{method:"GET",path:"/api/styles",description:"List all available design styles with metadata and API links.",responseExample:`{
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
}`,fetchExample:`const res = await fetch("/api/styles");
const data = await res.json();
console.log(data.styles);`,curlExample:"curl https://stylekit.dev/api/styles",tryItUrl:"/api/styles"},{method:"GET",path:"/api/styles/[slug]",description:"Get full details for a single style including tokens, recipes, philosophy, AI rules, components, and accessibility score.",params:[{name:"slug",type:"string",required:!0,description:"Style slug identifier"}],responseExample:`{
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
}`,fetchExample:`const res = await fetch("/api/styles/neo-brutalist");
const style = await res.json();`,curlExample:"curl https://stylekit.dev/api/styles/neo-brutalist",tryItUrl:"/api/styles/neo-brutalist"},{method:"GET",path:"/api/styles/[slug]/tokens",description:"Get design tokens (colors, spacing, typography, etc.) for a style.",params:[{name:"slug",type:"string",required:!0,description:"Style slug identifier"}],fetchExample:`const res = await fetch("/api/styles/neo-brutalist/tokens");
const tokens = await res.json();`,curlExample:"curl https://stylekit.dev/api/styles/neo-brutalist/tokens",tryItUrl:"/api/styles/neo-brutalist/tokens"},{method:"GET",path:"/api/styles/[slug]/recipes",description:"Get component recipes (implementation patterns) for a style.",params:[{name:"slug",type:"string",required:!0,description:"Style slug identifier"}],fetchExample:`const res = await fetch("/api/styles/neo-brutalist/recipes");
const recipes = await res.json();`,curlExample:"curl https://stylekit.dev/api/styles/neo-brutalist/recipes",tryItUrl:"/api/styles/neo-brutalist/recipes"},{method:"GET",path:"/api/styles/[slug]/rate",description:"Get community rating summary for a style.",params:[{name:"slug",type:"string",required:!0,description:"Style slug identifier"}],fetchExample:`const res = await fetch("/api/styles/neo-brutalist/rate");
const ratings = await res.json();`,curlExample:"curl https://stylekit.dev/api/styles/neo-brutalist/rate",tryItUrl:"/api/styles/neo-brutalist/rate"},{method:"POST",path:"/api/styles/[slug]/rate",description:"Submit a rating for a style.",params:[{name:"slug",type:"string",required:!0,description:"Style slug identifier"}],bodyParams:[{name:"rating",type:"number",required:!0,description:"Rating value (1-5)"}],fetchExample:`const res = await fetch("/api/styles/neo-brutalist/rate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ rating: 5 })
});`,curlExample:`curl -X POST https://stylekit.dev/api/styles/neo-brutalist/rate \\
  -H "Content-Type: application/json" \\
  -d '{"rating": 5}'`},{method:"GET",path:"/api/styles/[slug]/comments",description:"Get community comments for a style.",params:[{name:"slug",type:"string",required:!0,description:"Style slug identifier"}],fetchExample:`const res = await fetch("/api/styles/neo-brutalist/comments");
const comments = await res.json();`,curlExample:"curl https://stylekit.dev/api/styles/neo-brutalist/comments",tryItUrl:"/api/styles/neo-brutalist/comments"},{method:"POST",path:"/api/styles/[slug]/comments",description:"Post a comment on a style.",params:[{name:"slug",type:"string",required:!0,description:"Style slug identifier"}],bodyParams:[{name:"author",type:"string",required:!0,description:"Comment author name"},{name:"content",type:"string",required:!0,description:"Comment text"}],fetchExample:`const res = await fetch("/api/styles/neo-brutalist/comments", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ author: "dev", content: "Great style!" })
});`,curlExample:`curl -X POST https://stylekit.dev/api/styles/neo-brutalist/comments \\
  -H "Content-Type: application/json" \\
  -d '{"author":"dev","content":"Great style!"}'`},{method:"GET",path:"/api/styles/[slug]/versions",description:"Get version history and changelog for a style.",params:[{name:"slug",type:"string",required:!0,description:"Style slug identifier"}],fetchExample:`const res = await fetch("/api/styles/neo-brutalist/versions");
const versions = await res.json();`,curlExample:"curl https://stylekit.dev/api/styles/neo-brutalist/versions",tryItUrl:"/api/styles/neo-brutalist/versions"},{method:"GET",path:"/api/styles/[slug]/claude-rules",description:"Export style as Claude AI rules (CLAUDE.md format).",params:[{name:"slug",type:"string",required:!0,description:"Style slug identifier"}],fetchExample:`const res = await fetch("/api/styles/neo-brutalist/claude-rules");
const rules = await res.text();`,curlExample:"curl https://stylekit.dev/api/styles/neo-brutalist/claude-rules",tryItUrl:"/api/styles/neo-brutalist/claude-rules"},{method:"GET",path:"/api/styles/[slug]/cursorrules",description:"Export style as Cursor AI rules (.cursorrules format).",params:[{name:"slug",type:"string",required:!0,description:"Style slug identifier"}],fetchExample:`const res = await fetch("/api/styles/neo-brutalist/cursorrules");
const rules = await res.text();`,curlExample:"curl https://stylekit.dev/api/styles/neo-brutalist/cursorrules",tryItUrl:"/api/styles/neo-brutalist/cursorrules"},{method:"GET",path:"/api/styles/[slug]/skill-pack",description:"Export style as a skill pack bundle (JSON).",params:[{name:"slug",type:"string",required:!0,description:"Style slug identifier"}],fetchExample:`const res = await fetch("/api/styles/neo-brutalist/skill-pack");
const pack = await res.json();`,curlExample:"curl https://stylekit.dev/api/styles/neo-brutalist/skill-pack",tryItUrl:"/api/styles/neo-brutalist/skill-pack"},{method:"GET",path:"/api/styles/[slug]/md",description:"Export style as Markdown documentation.",params:[{name:"slug",type:"string",required:!0,description:"Style slug identifier"}],fetchExample:`const res = await fetch("/api/styles/neo-brutalist/md");
const markdown = await res.text();`,curlExample:"curl https://stylekit.dev/api/styles/neo-brutalist/md",tryItUrl:"/api/styles/neo-brutalist/md"}]},{id:"analytics",title:"Analytics",icon:g.BarChart3,description:"Usage statistics, top styles, and combination data.",endpoints:[{method:"GET",path:"/api/analytics",description:"Get usage analytics. Supports ?top=N for top styles, ?combinations=true for popular pairings.",queryParams:[{name:"top",type:"number",required:!1,description:"Return top N styles by usage"},{name:"combinations",type:"boolean",required:!1,description:"Set to 'true' to get popular style combinations"}],responseExample:`// Default: full usage stats
{ "totalViews": 5000, "byStyle": { ... }, "bySource": { ... } }

// ?top=5
{ "top": [{ "slug": "neo-brutalist", "count": 320 }, ...] }

// ?combinations=true
{ "combinations": [{ "pair": ["neo-brutalist", "glassmorphism"], "count": 45 }, ...] }`,fetchExample:`// Full stats
const res = await fetch("/api/analytics");

// Top 5 styles
const top = await fetch("/api/analytics?top=5");

// Popular combos
const combos = await fetch("/api/analytics?combinations=true");`,curlExample:`curl https://stylekit.dev/api/analytics
curl https://stylekit.dev/api/analytics?top=5
curl "https://stylekit.dev/api/analytics?combinations=true"`,tryItUrl:"/api/analytics"},{method:"GET",path:"/api/analytics/dashboard",description:"Dashboard analytics with time-range filtering.",queryParams:[{name:"range",type:"string",required:!1,description:"Time range: '7d', '30d', or 'all' (default: 'all')"}],fetchExample:`const res = await fetch("/api/analytics/dashboard?range=7d");
const dashboard = await res.json();`,curlExample:'curl "https://stylekit.dev/api/analytics/dashboard?range=7d"',tryItUrl:"/api/analytics/dashboard"}]},{id:"submissions",title:"Submissions",icon:p.Send,description:"Submit new community styles and manage the review pipeline.",endpoints:[{method:"POST",path:"/api/submit",description:"Submit a new style for community review.",bodyParams:[{name:"name",type:"string",required:!0,description:"Style name"},{name:"slug",type:"string",required:!0,description:"URL-friendly identifier"},{name:"description",type:"string",required:!0,description:"Style description"},{name:"author",type:"string",required:!0,description:"Author name"},{name:"tokens",type:"object",required:!1,description:"Design tokens"},{name:"components",type:"object",required:!1,description:"Component definitions"}],fetchExample:`const res = await fetch("/api/submit", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "My Style",
    slug: "my-style",
    description: "A new design style",
    author: "developer"
  })
});`,curlExample:`curl -X POST https://stylekit.dev/api/submit \\
  -H "Content-Type: application/json" \\
  -d '{"name":"My Style","slug":"my-style","description":"A new design style","author":"developer"}'`},{method:"GET",path:"/api/submit/list",description:"List all submissions with their review status.",fetchExample:`const res = await fetch("/api/submit/list");
const submissions = await res.json();`,curlExample:"curl https://stylekit.dev/api/submit/list",tryItUrl:"/api/submit/list"},{method:"GET",path:"/api/submit/[id]",description:"Get details of a specific submission.",params:[{name:"id",type:"string",required:!0,description:"Submission ID"}],fetchExample:`const res = await fetch("/api/submit/abc123");
const submission = await res.json();`,curlExample:"curl https://stylekit.dev/api/submit/abc123"},{method:"PATCH",path:"/api/submit/[id]",description:"Update a submission (e.g. edit fields before review).",params:[{name:"id",type:"string",required:!0,description:"Submission ID"}],bodyParams:[{name:"name",type:"string",required:!1,description:"Updated name"},{name:"description",type:"string",required:!1,description:"Updated description"}],fetchExample:`const res = await fetch("/api/submit/abc123", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Updated Name" })
});`,curlExample:`curl -X PATCH https://stylekit.dev/api/submit/abc123 \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Updated Name"}'`},{method:"POST",path:"/api/submit/[id]/review",description:"Submit a review decision for a submission.",params:[{name:"id",type:"string",required:!0,description:"Submission ID"}],bodyParams:[{name:"decision",type:"string",required:!0,description:"'approve' or 'reject'"},{name:"feedback",type:"string",required:!1,description:"Review feedback"}],fetchExample:`const res = await fetch("/api/submit/abc123/review", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ decision: "approve", feedback: "Looks great!" })
});`,curlExample:`curl -X POST https://stylekit.dev/api/submit/abc123/review \\
  -H "Content-Type: application/json" \\
  -d '{"decision":"approve","feedback":"Looks great!"}'`}]},{id:"knowledge",title:"Knowledge",icon:h.Book,description:"Search the knowledge base, get recommendations, and explore domains and tech stacks.",endpoints:[{method:"GET",path:"/api/knowledge/search",description:"Unified search across all knowledge domains.",queryParams:[{name:"q",type:"string",required:!0,description:"Search query"},{name:"domain",type:"string",required:!1,description:"Specific domain to search"},{name:"limit",type:"number",required:!1,description:"Max results (default: 5)"}],fetchExample:`const res = await fetch("/api/knowledge/search?q=dark+mode&limit=3");
const results = await res.json();`,curlExample:'curl "https://stylekit.dev/api/knowledge/search?q=dark+mode&limit=3"',tryItUrl:"/api/knowledge/search?q=modern"},{method:"GET",path:"/api/knowledge/recommend",description:"Get style recommendations based on project context.",fetchExample:`const res = await fetch("/api/knowledge/recommend");
const recs = await res.json();`,curlExample:"curl https://stylekit.dev/api/knowledge/recommend",tryItUrl:"/api/knowledge/recommend"},{method:"GET",path:"/api/knowledge/domains",description:"List all available knowledge domains.",fetchExample:`const res = await fetch("/api/knowledge/domains");
const domains = await res.json();`,curlExample:"curl https://stylekit.dev/api/knowledge/domains",tryItUrl:"/api/knowledge/domains"},{method:"GET",path:"/api/knowledge/stacks",description:"List supported tech stacks with guidelines.",fetchExample:`const res = await fetch("/api/knowledge/stacks");
const stacks = await res.json();`,curlExample:"curl https://stylekit.dev/api/knowledge/stacks",tryItUrl:"/api/knowledge/stacks"},{method:"GET",path:"/api/knowledge/smart",description:"Smart suggestions: compare styles, suggest by priorities, or context-aware recommendations.",queryParams:[{name:"action",type:"string",required:!1,description:"'compare' or 'suggest'"},{name:"style1",type:"string",required:!1,description:"First style for comparison"},{name:"style2",type:"string",required:!1,description:"Second style for comparison"},{name:"product",type:"string",required:!1,description:"Product context for comparison"},{name:"priorities",type:"string",required:!1,description:"Comma-separated priorities for suggestions"}],fetchExample:`// Compare two styles
const res = await fetch(
  "/api/knowledge/smart?action=compare&style1=neo-brutalist&style2=glassmorphism&product=portfolio"
);

// Suggest by priorities
const res2 = await fetch(
  "/api/knowledge/smart?action=suggest&priorities=accessibility,performance"
);`,curlExample:'curl "https://stylekit.dev/api/knowledge/smart?action=compare&style1=neo-brutalist&style2=glassmorphism&product=portfolio"',tryItUrl:"/api/knowledge/smart?action=suggest&priorities=accessibility"}]},{id:"tools",title:"Tools",icon:r.Wrench,description:"Lint code, analyze styles, generate with AI, import themes, and check accessibility.",endpoints:[{method:"POST",path:"/api/lint",description:"Lint code against a specific design style. Returns issues and fix suggestions.",bodyParams:[{name:"code",type:"string",required:!0,description:"HTML/JSX code to lint"},{name:"style",type:"string",required:!0,description:"Style slug to lint against"}],responseExample:`{
  "style": "neo-brutalist",
  "passed": false,
  "forbiddenFound": ["rounded-lg"],
  "requiredMissing": ["border-2"],
  "fixes": [
    { "find": "rounded-lg", "replace": "rounded-none", "reason": "Neo-Brutalist uses sharp corners" }
  ]
}`,fetchExample:`const res = await fetch("/api/lint", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    code: '<button class="rounded-lg shadow-md">Test</button>',
    style: "neo-brutalist"
  })
});
const result = await res.json();`,curlExample:`curl -X POST https://stylekit.dev/api/lint \\
  -H "Content-Type: application/json" \\
  -d '{"code":"<button class=\\"rounded-lg\\">Test</button>","style":"neo-brutalist"}'`},{method:"GET",path:"/api/lint",description:"List styles with lint rules, or get rules for a specific style.",queryParams:[{name:"style",type:"string",required:!1,description:"Style slug to get rules for. Omit to list all lintable styles."}],fetchExample:`// List lintable styles
const res = await fetch("/api/lint");

// Get rules for a style
const rules = await fetch("/api/lint?style=neo-brutalist");`,curlExample:`curl https://stylekit.dev/api/lint
curl "https://stylekit.dev/api/lint?style=neo-brutalist"`,tryItUrl:"/api/lint"},{method:"POST",path:"/api/analyze-style",description:"Analyze and classify a style from provided tokens or CSS.",bodyParams:[{name:"tokens",type:"object",required:!1,description:"Design tokens to analyze"},{name:"css",type:"string",required:!1,description:"CSS to analyze"}],fetchExample:`const res = await fetch("/api/analyze-style", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ css: "button { border: 3px solid #000; }" })
});`,curlExample:`curl -X POST https://stylekit.dev/api/analyze-style \\
  -H "Content-Type: application/json" \\
  -d '{"css":"button { border: 3px solid #000; }"}'`},{method:"POST",path:"/api/generate-style",description:"Generate a new style using AI based on a text prompt.",bodyParams:[{name:"prompt",type:"string",required:!0,description:"Description of the desired style"}],fetchExample:`const res = await fetch("/api/generate-style", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: "A futuristic cyberpunk style with neon accents" })
});`,curlExample:`curl -X POST https://stylekit.dev/api/generate-style \\
  -H "Content-Type: application/json" \\
  -d '{"prompt":"A futuristic cyberpunk style with neon accents"}'`},{method:"POST",path:"/api/import-theme",description:"Import an external theme (e.g. from Tailwind, MUI) and convert to StyleKit format.",bodyParams:[{name:"theme",type:"object",required:!0,description:"Theme configuration object to import"},{name:"source",type:"string",required:!1,description:"Source framework identifier"}],fetchExample:`const res = await fetch("/api/import-theme", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    source: "tailwind",
    theme: { colors: { primary: "#3b82f6" } }
  })
});`,curlExample:`curl -X POST https://stylekit.dev/api/import-theme \\
  -H "Content-Type: application/json" \\
  -d '{"source":"tailwind","theme":{"colors":{"primary":"#3b82f6"}}}'`},{method:"POST",path:"/api/match-style",description:"Find similar styles that match given criteria or tokens.",bodyParams:[{name:"tokens",type:"object",required:!1,description:"Tokens to match against"},{name:"description",type:"string",required:!1,description:"Text description to match"}],fetchExample:`const res = await fetch("/api/match-style", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ description: "minimal and clean" })
});`,curlExample:`curl -X POST https://stylekit.dev/api/match-style \\
  -H "Content-Type: application/json" \\
  -d '{"description":"minimal and clean"}'`},{method:"POST",path:"/api/quality",description:"Calculate a quality score for a style definition.",bodyParams:[{name:"style",type:"object",required:!0,description:"Style definition to score"}],fetchExample:`const res = await fetch("/api/quality", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ style: { name: "My Style", tokens: {} } })
});`,curlExample:`curl -X POST https://stylekit.dev/api/quality \\
  -H "Content-Type: application/json" \\
  -d '{"style":{"name":"My Style","tokens":{}}}'`},{method:"POST",path:"/api/style-extract",description:"Extract style tokens and patterns from a live URL.",bodyParams:[{name:"url",type:"string",required:!0,description:"URL to extract style from"}],fetchExample:`const res = await fetch("/api/style-extract", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url: "https://example.com" })
});`,curlExample:`curl -X POST https://stylekit.dev/api/style-extract \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://example.com"}'`},{method:"GET",path:"/api/accessibility",description:"Run accessibility checks on styles.",fetchExample:`const res = await fetch("/api/accessibility");
const report = await res.json();`,curlExample:"curl https://stylekit.dev/api/accessibility",tryItUrl:"/api/accessibility"}]},{id:"other",title:"Other",icon:n.Layers,description:"Archetypes, design system generation, UI planning, and authentication.",endpoints:[{method:"GET",path:"/api/archetypes",description:"List all style archetypes.",fetchExample:`const res = await fetch("/api/archetypes");
const archetypes = await res.json();`,curlExample:"curl https://stylekit.dev/api/archetypes",tryItUrl:"/api/archetypes"},{method:"GET",path:"/api/archetypes/[id]",description:"Get a specific archetype by ID.",params:[{name:"id",type:"string",required:!0,description:"Archetype ID"}],fetchExample:`const res = await fetch("/api/archetypes/minimal");
const archetype = await res.json();`,curlExample:"curl https://stylekit.dev/api/archetypes/minimal"},{method:"POST",path:"/api/generate/design-system",description:"Generate a complete design system from a style or prompt.",bodyParams:[{name:"style",type:"string",required:!1,description:"Base style slug"},{name:"prompt",type:"string",required:!1,description:"Description for generation"}],fetchExample:`const res = await fetch("/api/generate/design-system", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ style: "neo-brutalist" })
});`,curlExample:`curl -X POST https://stylekit.dev/api/generate/design-system \\
  -H "Content-Type: application/json" \\
  -d '{"style":"neo-brutalist"}'`},{method:"POST",path:"/api/ui-plan/schema",description:"Get the JSON schema for UI plan validation.",fetchExample:`const res = await fetch("/api/ui-plan/schema", { method: "POST" });
const schema = await res.json();`,curlExample:"curl -X POST https://stylekit.dev/api/ui-plan/schema"},{method:"POST",path:"/api/ui-plan/validate",description:"Validate a UI plan against the schema.",bodyParams:[{name:"plan",type:"object",required:!0,description:"UI plan object to validate"}],fetchExample:`const res = await fetch("/api/ui-plan/validate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ plan: { ... } })
});`,curlExample:`curl -X POST https://stylekit.dev/api/ui-plan/validate \\
  -H "Content-Type: application/json" \\
  -d '{"plan":{}}'`},{method:"GET",path:"/api/auth/callback",description:"OAuth callback endpoint for authentication flow.",queryParams:[{name:"code",type:"string",required:!0,description:"OAuth authorization code"},{name:"state",type:"string",required:!1,description:"CSRF state parameter"}],fetchExample:`// This endpoint is typically called by the OAuth provider, not directly.
// Redirect users to your OAuth login URL instead.`,curlExample:"# OAuth callback - typically handled by browser redirect, not called directly."}]}];function v({text:a,id:c,copiedId:d,onCopy:e}){return(0,b.jsx)("button",{onClick:()=>e(a,c),className:"absolute right-2 top-2 p-1.5 text-zinc-400 transition-colors hover:text-zinc-200",title:"Copy to clipboard",type:"button",children:d===c?(0,b.jsx)(i.Check,{className:"h-4 w-4 text-green-400"}):(0,b.jsx)(l.Copy,{className:"h-4 w-4"})})}function w({title:a,params:c}){return(0,b.jsxs)("div",{className:"mt-3",children:[(0,b.jsx)("p",{className:"mb-1.5 text-xs font-medium uppercase tracking-wider text-muted",children:a}),(0,b.jsx)("div",{className:"overflow-x-auto rounded border border-border",children:(0,b.jsxs)("table",{className:"w-full text-sm",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-border bg-zinc-50 dark:bg-zinc-800/50",children:[(0,b.jsx)("th",{className:"px-3 py-1.5 text-left text-xs font-medium text-muted",children:"Name"}),(0,b.jsx)("th",{className:"px-3 py-1.5 text-left text-xs font-medium text-muted",children:"Type"}),(0,b.jsx)("th",{className:"px-3 py-1.5 text-left text-xs font-medium text-muted",children:"Required"}),(0,b.jsx)("th",{className:"px-3 py-1.5 text-left text-xs font-medium text-muted",children:"Description"})]})}),(0,b.jsx)("tbody",{children:c.map(a=>(0,b.jsxs)("tr",{className:"border-b border-border last:border-0",children:[(0,b.jsx)("td",{className:"px-3 py-1.5",children:(0,b.jsx)("code",{className:"text-xs",children:a.name})}),(0,b.jsx)("td",{className:"px-3 py-1.5 text-xs text-muted",children:a.type}),(0,b.jsx)("td",{className:"px-3 py-1.5",children:a.required?(0,b.jsx)("span",{className:"text-xs font-medium text-green-600 dark:text-green-400",children:"Yes"}):(0,b.jsx)("span",{className:"text-xs text-muted",children:"No"})}),(0,b.jsx)("td",{className:"px-3 py-1.5 text-xs text-muted",children:a.description})]},a.name))})]})})]})}function x({endpoint:a,categoryId:d,index:e,expandedId:f,onToggle:g,copiedId:h,onCopy:i}){let l=`${d}-${e}`,n=f===l,[o,p]=(0,c.useState)("fetch");return(0,b.jsxs)("div",{className:"rounded-lg border border-border",children:[(0,b.jsxs)("button",{onClick:()=>g(l),className:"flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50",type:"button",children:[(0,b.jsx)("span",{className:`shrink-0 rounded px-2 py-0.5 font-mono text-xs font-medium ${t[a.method]}`,children:a.method}),(0,b.jsx)("code",{className:"min-w-0 flex-1 truncate text-sm",children:a.path}),(0,b.jsx)("span",{className:"hidden shrink-0 text-xs text-muted sm:block",children:a.description}),n?(0,b.jsx)(j.ChevronDown,{className:"h-4 w-4 shrink-0 text-muted"}):(0,b.jsx)(k.ChevronRight,{className:"h-4 w-4 shrink-0 text-muted"})]}),n&&(0,b.jsxs)("div",{className:"border-t border-border px-4 py-4",children:[(0,b.jsx)("p",{className:"mb-3 text-sm text-muted",children:a.description}),a.params&&(0,b.jsx)(w,{title:"Path Parameters",params:a.params}),a.queryParams&&(0,b.jsx)(w,{title:"Query Parameters",params:a.queryParams}),a.bodyParams&&(0,b.jsx)(w,{title:"Request Body",params:a.bodyParams}),a.responseExample&&(0,b.jsxs)("div",{className:"mt-4",children:[(0,b.jsx)("p",{className:"mb-1.5 text-xs font-medium uppercase tracking-wider text-muted",children:"Response"}),(0,b.jsxs)("div",{className:"relative",children:[(0,b.jsx)("pre",{className:"overflow-x-auto rounded-lg bg-zinc-900 p-3 font-mono text-xs text-zinc-100",children:a.responseExample}),(0,b.jsx)(v,{text:a.responseExample,id:`${l}-resp`,copiedId:h,onCopy:i})]})]}),(a.fetchExample||a.curlExample)&&(0,b.jsxs)("div",{className:"mt-4",children:[(0,b.jsxs)("div",{className:"mb-1.5 flex items-center gap-2",children:[(0,b.jsx)("p",{className:"text-xs font-medium uppercase tracking-wider text-muted",children:"Example"}),(0,b.jsxs)("div",{className:"flex rounded border border-border text-xs",children:[(0,b.jsx)("button",{onClick:()=>p("fetch"),className:`px-2 py-0.5 ${"fetch"===o?"bg-zinc-200 dark:bg-zinc-700":""}`,type:"button",children:"fetch"}),(0,b.jsx)("button",{onClick:()=>p("curl"),className:`border-l border-border px-2 py-0.5 ${"curl"===o?"bg-zinc-200 dark:bg-zinc-700":""}`,type:"button",children:"curl"})]})]}),(0,b.jsxs)("div",{className:"relative",children:[(0,b.jsx)("pre",{className:"overflow-x-auto rounded-lg bg-zinc-900 p-3 font-mono text-xs text-zinc-100",children:"fetch"===o?a.fetchExample:a.curlExample}),(0,b.jsx)(v,{text:("fetch"===o?a.fetchExample:a.curlExample)||"",id:`${l}-${o}`,copiedId:h,onCopy:i})]})]}),a.tryItUrl&&(0,b.jsx)("div",{className:"mt-4",children:(0,b.jsxs)("a",{href:a.tryItUrl,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800",children:[(0,b.jsx)(m.ExternalLink,{className:"h-3 w-3"}),"Try it"]})})]})]})}function y(){let[a,g]=(0,c.useState)(null),[h,i]=(0,c.useState)(null),j=(0,c.useCallback)(async(a,b)=>{await navigator.clipboard.writeText(a),i(b),setTimeout(()=>i(null),2e3)},[]),k=(0,c.useCallback)(a=>{g(b=>b===a?null:a)},[]),l=u.reduce((a,b)=>a+b.endpoints.length,0);return(0,b.jsxs)("div",{className:"flex min-h-screen flex-col",children:[(0,b.jsx)(d.Header,{}),(0,b.jsxs)("main",{className:"flex-1",children:[(0,b.jsx)("section",{className:"border-b border-border",children:(0,b.jsxs)("div",{className:"mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-20",children:[(0,b.jsxs)(s.default,{href:"/developers",className:"mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground",children:[(0,b.jsx)(f.ArrowLeft,{className:"h-4 w-4"}),"Back to Developers"]}),(0,b.jsx)("p",{className:"mb-4 text-xs uppercase tracking-widest text-muted",children:"API Reference"}),(0,b.jsx)("h1",{className:"mb-4 text-4xl md:text-5xl",children:"REST API"}),(0,b.jsxs)("p",{className:"max-w-3xl text-lg text-muted",children:[l," endpoints across ",u.length," categories. All endpoints return JSON and are accessible without authentication unless noted otherwise."]}),(0,b.jsxs)("div",{className:"mt-6 flex items-center gap-2 text-sm text-muted",children:[(0,b.jsx)(q.Shield,{className:"h-4 w-4"}),"Base URL: ",(0,b.jsx)("code",{className:"rounded bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800",children:"https://stylekit.dev"})]})]})}),(0,b.jsx)("section",{className:"sticky top-0 z-10 border-b border-border bg-background",children:(0,b.jsx)("div",{className:"mx-auto max-w-7xl px-6 md:px-12",children:(0,b.jsx)("div",{className:"flex gap-1 overflow-x-auto",children:u.map(({id:a,title:c,icon:d})=>(0,b.jsxs)("a",{href:`#${a}`,className:"flex shrink-0 items-center gap-1.5 border-b-2 border-transparent px-3 py-3 text-sm text-muted transition-colors hover:border-foreground hover:text-foreground",children:[(0,b.jsx)(d,{className:"h-4 w-4"}),c]},a))})})}),(0,b.jsx)("section",{children:(0,b.jsx)("div",{className:"mx-auto max-w-7xl px-6 py-12 md:px-12",children:(0,b.jsx)("div",{className:"space-y-16",children:u.map(c=>{let d=c.icon;return(0,b.jsxs)("div",{id:c.id,children:[(0,b.jsxs)("div",{className:"mb-4 flex items-center gap-2",children:[(0,b.jsx)(d,{className:"h-5 w-5"}),(0,b.jsx)("h2",{className:"text-2xl font-medium",children:c.title}),(0,b.jsx)("span",{className:"rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-muted dark:bg-zinc-800",children:c.endpoints.length})]}),(0,b.jsx)("p",{className:"mb-6 text-sm text-muted",children:c.description}),(0,b.jsx)("div",{className:"space-y-2",children:c.endpoints.map((d,e)=>(0,b.jsx)(x,{endpoint:d,categoryId:c.id,index:e,expandedId:a,onToggle:k,copiedId:h,onCopy:j},`${d.method}-${d.path}`))})]},c.id)})})})})]}),(0,b.jsx)(e.Footer,{})]})}a.s(["default",()=>y])}];

//# sourceMappingURL=app_developers_api_page_tsx_23226955._.js.map