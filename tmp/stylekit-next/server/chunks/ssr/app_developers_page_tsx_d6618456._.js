module.exports=[124884,a=>{"use strict";var b=a.i(739923),c=a.i(728306),d=a.i(945431),e=a.i(759819),f=a.i(129457),g=a.i(162532),h=a.i(41203),i=a.i(769075),j=a.i(691337),k=a.i(339407),l=a.i(664255),m=a.i(962196),n=a.i(91757);let o=(0,a.i(953659).default)("server",[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]]);var p=a.i(864379),q=a.i(461965),r=a.i(815680);function s({text:a,id:c,copiedId:d,onCopy:e}){let{t:g}=(0,f.useI18n)();return(0,b.jsx)("button",{onClick:()=>e(a,c),className:"absolute right-2 top-2 p-1.5 text-zinc-400 transition-colors hover:text-zinc-200",title:g("developers.copyToClipboard"),type:"button",children:d===c?(0,b.jsx)(h.Check,{className:"h-4 w-4 text-green-400"}):(0,b.jsx)(j.Copy,{className:"h-4 w-4"})})}let t=`# Show all commands
npx stylekit help

# List available styles
npx stylekit styles

# Show lint rules for one style
npx stylekit rules neo-brutalist`,u=`# Lint a button file against Neo-Brutalist rules
npx stylekit lint ./src/Button.tsx --style neo-brutalist

# Lint a card file against Glassmorphism rules
npx stylekit lint ./components/Card.tsx --style glassmorphism`,v=`# Basic recommendation
npx stylekit recommend "SaaS dashboard"

# Context-aware recommendation
npx stylekit smart "e-commerce store" --audience consumer --mood playful

# Enterprise + accessibility context
npx stylekit smart "B2B SaaS" --audience enterprise --mood professional --a11y

# Compare two styles for one product
npx stylekit compare neo-brutalist glassmorphism "creative portfolio"`,w=`Linting: ./src/Button.tsx
Style: neo-brutalist

[FAIL] 2 forbidden classes found
[WARN] 4 required classes missing

Issues:
  [x] "rounded-lg" - Neo-Brutalist uses sharp corners only
  [x] "shadow-md" - Use hard offset shadows

Suggested Fixes:
  - Replace "rounded-lg" with "rounded-none"
  - Replace "shadow-md" with "shadow-[4px_4px_0_#000]"`,x=`{
  "mcpServers": {
    "stylekit": {
      "command": "npx",
      "args": ["tsx", "/path/to/stylekit/mcp/server.ts"]
    }
  }
}`,y=`{
  "mcpServers": {
    "stylekit": {
      "command": "npx",
      "args": ["tsx", "./mcp/server.ts"]
    }
  }
}`,z=`# Read lintable styles and rules
GET /api/lint
GET /api/lint?style=neo-brutalist

# Lint code
POST /api/lint
Content-Type: application/json

{
  "code": "<button class=\\"rounded-lg shadow-md\\">Test</button>",
  "style": "neo-brutalist"
}`,A=`# Smart recommendation
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
GET /api/knowledge/smart?action=suggest&priorities=accessibility,performance`,B=[{cmd:"help",descKey:"developers.cli.commands.help"},{cmd:"styles",descKey:"developers.cli.commands.styles"},{cmd:"rules <style>",descKey:"developers.cli.commands.rules"},{cmd:"lint <file> --style <style>",descKey:"developers.cli.commands.lint"},{cmd:"recommend <query>",descKey:"developers.cli.commands.recommend"},{cmd:"smart <query> [options]",descKey:"developers.cli.commands.smart"},{cmd:"compare <s1> <s2> <query>",descKey:"developers.cli.commands.compare"},{cmd:"search <query>",descKey:"developers.cli.commands.search"}],C=[{name:"search_knowledge",descKey:"developers.mcp.tools.search_knowledge"},{name:"smart_recommend",descKey:"developers.mcp.tools.smart_recommend"},{name:"get_style",descKey:"developers.mcp.tools.get_style"},{name:"list_styles",descKey:"developers.mcp.tools.list_styles"},{name:"lint_code",descKey:"developers.mcp.tools.lint_code"},{name:"get_stack_guidelines",descKey:"developers.mcp.tools.get_stack_guidelines"}],D=[{method:"GET",path:"/api/styles",descKey:"developers.api.endpoints.styles"},{method:"GET",path:"/api/styles/[slug]",descKey:"developers.api.endpoints.styleDetail"},{method:"GET",path:"/api/styles/[slug]/tokens",descKey:"developers.api.endpoints.styleTokens"},{method:"GET",path:"/api/styles/[slug]/recipes",descKey:"developers.api.endpoints.styleRecipes"},{method:"POST",path:"/api/style-extract",descKey:"developers.api.endpoints.styleExtract"},{method:"GET",path:"/api/knowledge/search?q=...",descKey:"developers.api.endpoints.knowledgeSearch"},{method:"GET",path:"/api/knowledge/recommend",descKey:"developers.api.endpoints.knowledgeRecommend"},{method:"GET",path:"/api/knowledge/stacks",descKey:"developers.api.endpoints.knowledgeStacks"},{method:"GET",path:"/api/knowledge/domains",descKey:"developers.api.endpoints.knowledgeDomains"}],E=[{idKey:"developers.workflow.pathA.id",titleKey:"developers.workflow.pathA.title",descKey:"developers.workflow.pathA.desc",links:["/api/style-extract","/create-style","/generate"]},{idKey:"developers.workflow.pathB.id",titleKey:"developers.workflow.pathB.title",descKey:"developers.workflow.pathB.desc",links:["/styles","/generate"]}],F=[{icon:n.Search,labelKey:"developers.mcp.cards.searchKnowledge"},{icon:m.Palette,labelKey:"developers.mcp.cards.styleRecommendation"},{icon:l.FileCode,labelKey:"developers.mcp.cards.codeLinting"},{icon:o,labelKey:"developers.mcp.cards.stackGuidelines"}],G=[{id:"cli",labelKey:"developers.tabs.cli",icon:p.Terminal},{id:"mcp",labelKey:"developers.tabs.mcp",icon:o},{id:"api",labelKey:"developers.tabs.api",icon:i.Code2}];function H(){let[a,h]=(0,c.useState)("cli"),[j,m]=(0,c.useState)(null),{t:n}=(0,f.useI18n)(),o=(0,c.useCallback)(async(a,b)=>{await navigator.clipboard.writeText(a),m(b),setTimeout(()=>m(null),2e3)},[]);return(0,b.jsxs)("div",{className:"flex min-h-screen flex-col",children:[(0,b.jsx)(d.Header,{}),(0,b.jsxs)("main",{className:"flex-1",children:[(0,b.jsx)("section",{className:"border-b border-border",children:(0,b.jsxs)("div",{className:"mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-20",children:[(0,b.jsx)("p",{className:"mb-4 text-xs uppercase tracking-widest text-muted",children:n("developers.badge")}),(0,b.jsx)("h1",{className:"mb-4 text-4xl md:text-5xl lg:text-6xl",children:n("developers.title")}),(0,b.jsx)("p",{className:"max-w-3xl text-lg text-muted",children:n("developers.description")}),(0,b.jsx)("div",{className:"mt-6 grid grid-cols-1 gap-4 md:grid-cols-2",children:E.map(({idKey:a,titleKey:c,descKey:d,links:e})=>(0,b.jsxs)("div",{className:"rounded-lg border border-border p-4",children:[(0,b.jsx)("p",{className:"mb-1 text-xs uppercase tracking-widest text-muted",children:n(a)}),(0,b.jsx)("p",{className:"mb-2 text-lg font-medium",children:n(c)}),(0,b.jsx)("p",{className:"mb-3 text-sm text-muted",children:n(d)}),(0,b.jsx)("div",{className:"flex flex-wrap gap-2",children:e.map(a=>(0,b.jsx)("code",{className:"rounded bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800",children:a},a))})]},a))}),(0,b.jsxs)(r.default,{href:"/developers/api",className:"mt-6 flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50",children:[(0,b.jsxs)("div",{className:"flex items-center gap-3",children:[(0,b.jsx)(i.Code2,{className:"h-5 w-5 text-muted"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"font-medium",children:n("developers.api.title")}),(0,b.jsx)("p",{className:"text-sm text-muted",children:"Full REST API reference with 36+ endpoints, examples, and interactive testing"})]})]}),(0,b.jsx)(g.ArrowRight,{className:"h-5 w-5 text-muted"})]})]})}),(0,b.jsx)("section",{className:"sticky top-0 z-10 border-b border-border bg-background",children:(0,b.jsx)("div",{className:"mx-auto max-w-7xl px-6 md:px-12",children:(0,b.jsx)("div",{className:"flex gap-1",children:G.map(({id:c,labelKey:d,icon:e})=>(0,b.jsxs)("button",{onClick:()=>h(c),className:`flex items-center gap-2 border-b-2 px-4 py-3 text-sm transition-colors ${a===c?"border-foreground text-foreground":"border-transparent text-muted hover:text-foreground"}`,type:"button",children:[(0,b.jsx)(e,{className:"h-4 w-4"}),n(d)]},c))})})}),(0,b.jsx)("section",{children:(0,b.jsxs)("div",{className:"mx-auto max-w-7xl space-y-12 px-6 py-12 md:px-12",children:["cli"===a&&(0,b.jsxs)("div",{className:"space-y-12",children:[(0,b.jsxs)("div",{children:[(0,b.jsxs)("h2",{className:"mb-4 flex items-center gap-2 text-2xl font-medium",children:[(0,b.jsx)(q.Zap,{className:"h-5 w-5"}),n("developers.cli.quickStartTitle")]}),(0,b.jsx)("p",{className:"mb-4 text-muted",children:n("developers.cli.quickStartDesc")}),(0,b.jsxs)("div",{className:"relative",children:[(0,b.jsx)("pre",{className:"overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-sm text-zinc-100",children:t}),(0,b.jsx)(s,{text:t,id:"cli-quick",copiedId:j,onCopy:o})]})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("h2",{className:"mb-4 flex items-center gap-2 text-2xl font-medium",children:[(0,b.jsx)(l.FileCode,{className:"h-5 w-5"}),n("developers.cli.lintTitle")]}),(0,b.jsx)("p",{className:"mb-4 text-muted",children:n("developers.cli.lintDesc")}),(0,b.jsxs)("div",{className:"relative",children:[(0,b.jsx)("pre",{className:"overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-sm text-zinc-100",children:u}),(0,b.jsx)(s,{text:u,id:"cli-lint",copiedId:j,onCopy:o})]}),(0,b.jsxs)("div",{className:"mt-4 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800",children:[(0,b.jsx)("p",{className:"mb-2 text-sm font-medium",children:n("developers.cli.outputExample")}),(0,b.jsx)("pre",{className:"whitespace-pre-wrap font-mono text-xs text-muted",children:w})]})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("h2",{className:"mb-4 flex items-center gap-2 text-2xl font-medium",children:[(0,b.jsx)(k.Cpu,{className:"h-5 w-5"}),n("developers.cli.smartTitle")]}),(0,b.jsx)("p",{className:"mb-4 text-muted",children:n("developers.cli.smartDesc")}),(0,b.jsxs)("div",{className:"relative",children:[(0,b.jsx)("pre",{className:"overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-sm text-zinc-100",children:v}),(0,b.jsx)(s,{text:v,id:"cli-smart",copiedId:j,onCopy:o})]})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h2",{className:"mb-4 text-2xl font-medium",children:n("developers.cli.allCommandsTitle")}),(0,b.jsx)("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-2",children:B.map(({cmd:a,descKey:c})=>(0,b.jsxs)("div",{className:"rounded-lg border border-border p-3",children:[(0,b.jsxs)("code",{className:"text-sm text-foreground",children:["stylekit ",a]}),(0,b.jsx)("p",{className:"mt-1 text-xs text-muted",children:n(c)})]},a))})]})]}),"mcp"===a&&(0,b.jsxs)("div",{className:"space-y-12",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h2",{className:"mb-4 text-2xl font-medium",children:n("developers.mcp.whatIsTitle")}),(0,b.jsx)("p",{className:"mb-4 text-muted",children:n("developers.mcp.whatIsDesc")}),(0,b.jsx)("div",{className:"grid grid-cols-2 gap-3 md:grid-cols-4",children:F.map(({icon:a,labelKey:c})=>(0,b.jsxs)("div",{className:"flex items-center gap-2 rounded-lg border border-border p-3",children:[(0,b.jsx)(a,{className:"h-4 w-4 text-muted"}),(0,b.jsx)("span",{className:"text-sm",children:n(c)})]},c))})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h2",{className:"mb-4 text-2xl font-medium",children:n("developers.mcp.claudeConfigTitle")}),(0,b.jsx)("p",{className:"mb-4 text-muted",children:n("developers.mcp.claudeConfigDesc")}),(0,b.jsxs)("div",{className:"mb-4 space-y-2 text-sm text-muted",children:[(0,b.jsxs)("p",{children:[n("developers.platform.macos"),":"," ",(0,b.jsx)("code",{className:"rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800",children:"~/Library/Application Support/Claude/claude_desktop_config.json"})]}),(0,b.jsxs)("p",{children:[n("developers.platform.windows"),":"," ",(0,b.jsx)("code",{className:"rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800",children:"%APPDATA%\\Claude\\claude_desktop_config.json"})]})]}),(0,b.jsxs)("div",{className:"relative",children:[(0,b.jsx)("pre",{className:"overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-sm text-zinc-100",children:x}),(0,b.jsx)(s,{text:x,id:"mcp-claude",copiedId:j,onCopy:o})]})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h2",{className:"mb-4 text-2xl font-medium",children:n("developers.mcp.cursorConfigTitle")}),(0,b.jsxs)("p",{className:"mb-4 text-muted",children:[n("developers.mcp.cursorConfigDesc")," ",(0,b.jsx)("code",{className:"rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800",children:".cursor/mcp.json"}),"."]}),(0,b.jsxs)("div",{className:"relative",children:[(0,b.jsx)("pre",{className:"overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-sm text-zinc-100",children:y}),(0,b.jsx)(s,{text:y,id:"mcp-cursor",copiedId:j,onCopy:o})]})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h2",{className:"mb-4 text-2xl font-medium",children:n("developers.mcp.availableToolsTitle")}),(0,b.jsx)("div",{className:"grid grid-cols-1 gap-3 md:grid-cols-2",children:C.map(({name:a,descKey:c})=>(0,b.jsxs)("div",{className:"rounded-lg border border-border p-3",children:[(0,b.jsx)("code",{className:"text-sm text-foreground",children:a}),(0,b.jsx)("p",{className:"mt-1 text-xs text-muted",children:n(c)})]},a))})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h2",{className:"mb-4 text-2xl font-medium",children:n("developers.mcp.exampleUsageTitle")}),(0,b.jsxs)("div",{className:"space-y-4 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"mb-1 text-sm font-medium",children:n("developers.mcp.example.you")}),(0,b.jsx)("p",{className:"text-sm text-muted",children:n("developers.mcp.example.youText")})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"mb-1 text-sm font-medium",children:n("developers.mcp.example.ai")}),(0,b.jsx)("p",{className:"text-sm text-muted",children:n("developers.mcp.example.aiText")})]})]})]})]}),"api"===a&&(0,b.jsxs)("div",{className:"space-y-12",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h2",{className:"mb-4 text-2xl font-medium",children:n("developers.api.title")}),(0,b.jsx)("p",{className:"mb-4 text-muted",children:n("developers.api.desc")})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("h2",{className:"mb-4 flex items-center gap-2 text-xl font-medium",children:[(0,b.jsx)(l.FileCode,{className:"h-5 w-5"}),"/api/lint"]}),(0,b.jsxs)("div",{className:"relative",children:[(0,b.jsx)("pre",{className:"overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-sm text-zinc-100",children:z}),(0,b.jsx)(s,{text:`curl -X POST /api/lint \\
  -H "Content-Type: application/json" \\
  -d '{"code":"<button class=\\"rounded-lg\\">Test</button>","style":"neo-brutalist"}'`,id:"api-lint",copiedId:j,onCopy:o})]})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("h2",{className:"mb-4 flex items-center gap-2 text-xl font-medium",children:[(0,b.jsx)(k.Cpu,{className:"h-5 w-5"}),"/api/knowledge/smart"]}),(0,b.jsxs)("div",{className:"relative",children:[(0,b.jsx)("pre",{className:"overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-sm text-zinc-100",children:A}),(0,b.jsx)(s,{text:`curl -X POST /api/knowledge/smart \\
  -H "Content-Type: application/json" \\
  -d '{"productQuery":"SaaS dashboard","context":{"targetAudience":"enterprise"}}'`,id:"api-smart",copiedId:j,onCopy:o})]})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h2",{className:"mb-4 text-xl font-medium",children:n("developers.api.otherEndpointsTitle")}),(0,b.jsx)("div",{className:"grid grid-cols-1 gap-3",children:D.map(({method:a,path:c,descKey:d})=>(0,b.jsxs)("div",{className:"flex items-center gap-3 rounded-lg border border-border p-3",children:[(0,b.jsx)("span",{className:`rounded px-2 py-0.5 font-mono text-xs ${"GET"===a?"bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400":"bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"}`,children:a}),(0,b.jsx)("code",{className:"flex-1 text-sm",children:c}),(0,b.jsx)("span",{className:"text-xs text-muted",children:n(d)})]},c))})]})]})]})})]}),(0,b.jsx)(e.Footer,{})]})}a.s(["default",()=>H],124884)}];

//# sourceMappingURL=app_developers_page_tsx_d6618456._.js.map