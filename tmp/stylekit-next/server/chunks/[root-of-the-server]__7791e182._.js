module.exports=[918622,(e,t,a)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},556704,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},832319,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},270406,(e,t,a)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},193695,(e,t,a)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},171545,e=>{"use strict";var t=e.i(397764),a=e.i(333902),s=e.i(545475),n=e.i(622736),r=e.i(951683),o=e.i(834857),i=e.i(154137),l=e.i(359207),p=e.i(550419),d=e.i(663859),c=e.i(398368),u=e.i(68300),h=e.i(103152),m=e.i(146739),y=e.i(404155),g=e.i(193695);e.i(765892);var f=e.i(383239),x=e.i(391173),R=e.i(861014),v=e.i(335424),w=e.i(885542);async function $(){let e,t,a;return new Response(((e=[]).push(`# StyleKit - Complete AI Documentation

> Last Updated: ${new Date().toISOString().split("T")[0]}

This file contains complete documentation for all design styles, tokens, recipes, and archetypes in StyleKit.

---

`),e.push(`## Table of Contents

1. Overview
2. All Styles Summary
3. Detailed Style Documentation
4. Component Recipes Registry
5. Layout Archetypes Registry
6. Usage Guidelines

---

`),e.push(`## 1. Overview

StyleKit provides ${x.styles.length} design styles with machine-readable constraints:

- **Design Tokens**: Precise Tailwind class mappings for borders, shadows, colors, typography
- **Component Recipes**: Parameterized templates with variants (button, card, input, etc.)
- **Layout Archetypes**: Pre-defined page structures (landing, dashboard, blog)
- **AI Rules**: Do's, don'ts, and forbidden patterns for each style
- **Code Examples**: React + Tailwind CSS implementations

---

`),e.push(`## 2. All Styles Summary

`),x.styles.forEach(t=>{let a=(0,R.getStyleTokens)(t.slug),s=(0,v.getStyleRecipes)(t.slug);e.push(`### ${t.name} (${t.nameEn})
- **Slug**: \`${t.slug}\`
- **Type**: ${t.styleType}
- **Description**: ${t.description}
- **Keywords**: ${t.keywords.join(", ")}
- **Has Tokens**: ${a?"Yes":"No"}
- **Has Recipes**: ${s?"Yes":"No"}
- **API**: \`/api/styles/${t.slug}\`

`)}),e.push(`---

`),e.push(`## 3. Detailed Style Documentation

`),x.styles.forEach(t=>{e.push(`### ${t.name} (${t.nameEn})

**Slug**: \`${t.slug}\`

#### Description
${t.description}

#### Design Philosophy
${t.philosophy}

#### Do's (必须做)
${t.doList.map((e,t)=>`${t+1}. ${e}`).join("\n")}

#### Don'ts (禁止做)
${t.dontList.map((e,t)=>`${t+1}. ${e}`).join("\n")}

#### AI Rules
\`\`\`
${t.aiRules}
\`\`\`

`);let a=(0,R.getStyleTokens)(t.slug);a&&e.push(`#### Design Tokens

**Border**
- Width: \`${a.border.width}\`
- Color: \`${a.border.color}\`
- Radius: \`${a.border.radius}\`

**Shadow**
- Small: \`${a.shadow.sm}\`
- Medium: \`${a.shadow.md}\`
- Large: \`${a.shadow.lg}\`
- Hover: \`${a.shadow.hover}\`

**Interaction**
- Hover Translate: \`${a.interaction.hoverTranslate||"none"}\`
- Transition: \`${a.interaction.transition}\`

**Typography**
- Heading: \`${a.typography.heading}\`
- Body: \`${a.typography.body}\`

**Required Classes**

Button:
\`\`\`
${a.required.button.join("\n")}
\`\`\`

Card:
\`\`\`
${a.required.card.join("\n")}
\`\`\`

Input:
\`\`\`
${a.required.input.join("\n")}
\`\`\`

**Forbidden**

Classes: ${a.forbidden.classes.slice(0,10).map(e=>`\`${e}\``).join(", ")}

Patterns: ${a.forbidden.patterns.map(e=>`\`${e}\``).join(", ")}

`);let s=(0,v.getStyleRecipes)(t.slug);s&&e.push(`#### Component Recipes

Available recipes: ${Object.keys(s.recipes).map(e=>`\`${e}\``).join(", ")}

`),e.push(`#### Component Examples

**Button**
\`\`\`html
${t.components.button?.code||"No example available"}
\`\`\`

**Card**
\`\`\`html
${t.components.card?.code||"No example available"}
\`\`\`

`),e.push(`---

`)}),e.push(`## 4. Component Recipes Registry

Component recipes provide parameterized templates for generating consistent components.

`),t=new Map,x.styles.forEach(e=>{let a=(0,v.getStyleRecipes)(e.slug);a&&Object.entries(a.recipes).forEach(([e,a])=>{t.has(e)||t.set(e,a)})}),t.forEach((t,a)=>{e.push(`### ${t.name} (\`${a}\`)

**Description**: ${t.description}

**Parameters**:
${t.parameters.map(e=>`- \`${e.id}\` (${e.type}): ${e.label}`).join("\n")}

**Variants**: ${Object.keys(t.variants).join(", ")}

**Slots**: ${t.slots.map(e=>`\`${e.id}\``).join(", ")}

`)}),e.push(`---

`),e.push(`## 5. Layout Archetypes Registry

Layout archetypes define pre-structured page patterns.

`),a=(0,w.getAllArchetypes)(),["landing","dashboard","blog","form","list"].forEach(t=>{let s=a.filter(e=>e.category===t);s.length>0&&(e.push(`### ${t.charAt(0).toUpperCase()+t.slice(1)} Pages

`),s.forEach(t=>{e.push(`#### ${t.name} (\`${t.id}\`)

${t.description}

**Sections**:
${t.sections.map(e=>`- \`${e.id}\`: ${e.name} (${e.layout.type})`).join("\n")}

**Responsive Behavior**:
- Mobile: ${t.responsive.mobile}
- Tablet: ${t.responsive.tablet}
- Desktop: ${t.responsive.desktop}

**Recommended Styles**: ${t.recommendedStyles?.join(", ")||"Any"}

`)}))}),e.push(`---

`),e.push(`## 6. Usage Guidelines

### Core Product Flows

#### Path A: Reference URL -> Extract -> Generate

1. **Extract**: POST \`/api/style-extract\` with a public website URL
2. **Normalize**: Import extracted draft into \`/create-style\`
3. **Generate**: Use \`/generate\` (3-step flow) to select template, edit content, and download ZIP

#### Path B: Preset Style -> Template -> Generate

1. **Select Style**: Choose from preset styles via \`/styles\` or \`/api/styles\`
2. **Choose Output**: Select template + output format in \`/generate\`
3. **Edit & Download**: Complete content editing with live preview and download ZIP

### Critical Rules

1. **Always use exact token classes** - Don't approximate or substitute
2. **Never use forbidden classes** - Check forbidden lists before generating
3. **Follow component recipes** - Use parameterized templates, not ad-hoc code
4. **Preserve extracted evidence** - Keep palette, spacing rhythm, and motion cues from source sites
5. **Validate before shipping** - Run lint/validation in API or CI flow

### API Endpoints Reference

- \`GET /api/styles\` - List all styles
- \`GET /api/styles/[slug]\` - Get complete style pack
- \`GET /api/styles/[slug]/tokens\` - Get tokens only
- \`GET /api/styles/[slug]/recipes\` - Get recipes only
- \`POST /api/style-extract\` - Extract style draft from public URL
- \`POST /api/lint\` - Validate generated code against style rules
- \`POST /api/knowledge/smart\` - Context-aware recommendation/compare

### Example Workflow (Path A)

\`\`\`
# Replicate a reference site style and generate code

1. POST /api/style-extract
   {
     "url": "https://example.com"
   }

2. Import extracted markdown/json in /create-style
   -> normalize palette, tokens, and evidence

3. Open /generate
   -> choose template and output format
   -> edit content with live preview
   -> download ZIP
\`\`\`

---

## End of Documentation

For the latest updates and interactive documentation, visit:
- Base documentation: /llms.txt
- Web interface: https://stylekit.example.com

This file follows the llms.txt specification: https://llmstxt.org/
`),e.join("\n")),{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"public, max-age=3600, s-maxage=3600"}})}e.s(["GET",()=>$],198155);var b=e.i(198155);let E=new t.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/llms-full.txt/route",pathname:"/llms-full.txt",filename:"route",bundlePath:""},distDir:"/tmp/stylekit-next",relativeProjectDir:"",resolvedPagePath:"[project]/app/llms-full.txt/route.ts",nextConfigOutput:"",userland:b}),{workAsyncStorage:C,workUnitAsyncStorage:S,serverHooks:T}=E;function A(){return(0,s.patchFetch)({workAsyncStorage:C,workUnitAsyncStorage:S})}async function P(e,t,s){E.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let x="/llms-full.txt/route";x=x.replace(/\/index$/,"")||"/";let R=await E.prepare(e,t,{srcPage:x,multiZoneDraftMode:!1});if(!R)return t.statusCode=400,t.end("Bad Request"),null==s.waitUntil||s.waitUntil.call(s,Promise.resolve()),null;let{buildId:v,params:w,nextConfig:$,parsedUrl:b,isDraftMode:C,prerenderManifest:S,routerServerContext:T,isOnDemandRevalidate:A,revalidateOnlyGenerated:P,resolvedPathname:k,clientReferenceManifest:j,serverActionsManifest:O}=R,D=(0,i.normalizeAppPath)(x),I=!!(S.dynamicRoutes[D]||S.routes[k]),N=async()=>((null==T?void 0:T.render404)?await T.render404(e,t,b,!1):t.end("This page could not be found"),null);if(I&&!C){let e=!!S.routes[k],t=S.dynamicRoutes[D];if(t&&!1===t.fallback&&!e){if($.experimental.adapterPath)return await N();throw new g.NoFallbackError}}let U=null;!I||E.isDev||C||(U="/index"===(U=k)?"/":U);let q=!0===E.isDev||!I,H=I&&!q;O&&j&&(0,o.setManifestsSingleton)({page:x,clientReferenceManifest:j,serverActionsManifest:O});let _=e.method||"GET",L=(0,r.getTracer)(),G=L.getActiveScopeSpan(),M={params:w,prerenderManifest:S,renderOpts:{experimental:{authInterrupts:!!$.experimental.authInterrupts},cacheComponents:!!$.cacheComponents,supportsDynamicResponse:q,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:$.cacheLife,waitUntil:s.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,s,n)=>E.onRequestError(e,t,s,n,T)},sharedContext:{buildId:v}},K=new l.NodeNextRequest(e),B=new l.NodeNextResponse(t),F=p.NextRequestAdapter.fromNodeNextRequest(K,(0,p.signalFromNodeResponse)(t));try{let o=async e=>E.handle(F,M).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let a=L.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==d.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let s=a.get("next.route");if(s){let t=`${_} ${s}`;e.setAttributes({"next.route":s,"http.route":s,"next.span_name":t}),e.updateName(t)}else e.updateName(`${_} ${x}`)}),i=!!(0,n.getRequestMeta)(e,"minimalMode"),l=async n=>{var r,l;let p=async({previousCacheEntry:a})=>{try{if(!i&&A&&P&&!a)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let r=await o(n);e.fetchMetrics=M.renderOpts.fetchMetrics;let l=M.renderOpts.pendingWaitUntil;l&&s.waitUntil&&(s.waitUntil(l),l=void 0);let p=M.renderOpts.collectedTags;if(!I)return await (0,u.sendResponse)(K,B,r,M.renderOpts.pendingWaitUntil),null;{let e=await r.blob(),t=(0,h.toNodeOutgoingHttpHeaders)(r.headers);p&&(t[y.NEXT_CACHE_TAGS_HEADER]=p),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==M.renderOpts.collectedRevalidate&&!(M.renderOpts.collectedRevalidate>=y.INFINITE_CACHE)&&M.renderOpts.collectedRevalidate,s=void 0===M.renderOpts.collectedExpire||M.renderOpts.collectedExpire>=y.INFINITE_CACHE?void 0:M.renderOpts.collectedExpire;return{value:{kind:f.CachedRouteKind.APP_ROUTE,status:r.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:s}}}}catch(t){throw(null==a?void 0:a.isStale)&&await E.onRequestError(e,t,{routerKind:"App Router",routePath:x,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:A})},!1,T),t}},d=await E.handleResponse({req:e,nextConfig:$,cacheKey:U,routeKind:a.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:S,isRoutePPREnabled:!1,isOnDemandRevalidate:A,revalidateOnlyGenerated:P,responseGenerator:p,waitUntil:s.waitUntil,isMinimalMode:i});if(!I)return null;if((null==d||null==(r=d.value)?void 0:r.kind)!==f.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(l=d.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});i||t.setHeader("x-nextjs-cache",A?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),C&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let g=(0,h.fromNodeOutgoingHttpHeaders)(d.value.headers);return i&&I||g.delete(y.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||g.get("Cache-Control")||g.set("Cache-Control",(0,m.getCacheControlHeader)(d.cacheControl)),await (0,u.sendResponse)(K,B,new Response(d.value.body,{headers:g,status:d.value.status||200})),null};G?await l(G):await L.withPropagatedContext(e.headers,()=>L.trace(d.BaseServerSpan.handleRequest,{spanName:`${_} ${x}`,kind:r.SpanKind.SERVER,attributes:{"http.method":_,"http.target":e.url}},l))}catch(t){if(t instanceof g.NoFallbackError||await E.onRequestError(e,t,{routerKind:"App Router",routePath:D,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:A})},!1,T),I)throw t;return await (0,u.sendResponse)(K,B,new Response(null,{status:500})),null}}e.s(["handler",()=>P,"patchFetch",()=>A,"routeModule",()=>E,"serverHooks",()=>T,"workAsyncStorage",()=>C,"workUnitAsyncStorage",()=>S],171545)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__7791e182._.js.map