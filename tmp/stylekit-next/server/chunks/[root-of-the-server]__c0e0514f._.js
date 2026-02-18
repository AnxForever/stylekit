module.exports=[918622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},556704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},832319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},270406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},193695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},35712,e=>{"use strict";var t=e.i(397764),r=e.i(333902),a=e.i(545475),n=e.i(622736),s=e.i(951683),i=e.i(834857),o=e.i(154137),l=e.i(359207),d=e.i(550419),p=e.i(663859),u=e.i(398368),c=e.i(68300),m=e.i(103152),h=e.i(146739),g=e.i(404155),y=e.i(193695);e.i(765892);var x=e.i(383239),R=e.i(391173),f=e.i(861014),v=e.i(335424);async function w(){let e=[];for(let t of(e.push(`# StyleKit

> AI-friendly design system library with machine-readable constraints, tokens, and component recipes for AI-assisted UI generation.

StyleKit provides structured design systems that AI can use to generate consistent, high-quality user interfaces.

## Available Styles

`),R.styles)){let r=(0,f.getStyleTokens)(t.slug),a=(0,v.getStyleRecipes)(t.slug);e.push(`- [${t.nameEn}](/api/styles/${t.slug}): ${t.description} (Tokens: ${r?"Yes":"No"}, Recipes: ${a?"Yes":"No"})`)}return e.push(`

## Core Workflows

### Path A: Reference URL -> Extract -> Generate

1. Extract style evidence from a public URL: [POST /api/style-extract](/api/style-extract)
2. Normalize/import extracted draft in [Create Style](/create-style)
3. Generate project output in [Generator](/generate)

### Path B: Preset Style -> Template -> Generate

1. Browse presets in [Styles](/styles)
2. Select template and output format in [Generator](/generate)
3. Edit content with live preview and download ZIP

## API Endpoints

- [All Styles](/api/styles): List all available design styles
- [Style Details](/api/styles/[slug]): Full style metadata and examples
- [Style Tokens](/api/styles/[slug]/tokens): Machine-readable design tokens
- [Style Recipes](/api/styles/[slug]/recipes): Component recipe templates
- [Style Extractor](/api/style-extract): Extract style draft from public websites

## MCP Core Tools

- search_knowledge: Search design knowledge domains
- smart_recommend: Context-aware recommendation with scoring
- get_style: Get one style pack (rules + tokens + recipes)
- list_styles: List all styles
- lint_code: Lint code against style constraints
- get_stack_guidelines: Get stack-specific implementation guidance

## Documentation

- [Full Documentation](/llms-full.txt): Complete reference with all tokens, recipes, and code examples

## Optional

- [Figma MCP Integration Guide](/docs/figma-mcp-integration.md): Import design tokens from Figma via MCP
- [StyleKit Skill Pack](/api/styles/neo-brutalist/skill-pack): SKILL.md format for AI tools
`),new Response(e.join("\n"),{headers:{"Content-Type":"text/markdown; charset=utf-8","Cache-Control":"public, max-age=3600, s-maxage=3600"}})}e.s(["GET",()=>w],919337);var E=e.i(919337);let C=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/llms.md/route",pathname:"/llms.md",filename:"route",bundlePath:""},distDir:"/tmp/stylekit-next",relativeProjectDir:"",resolvedPagePath:"[project]/app/llms.md/route.ts",nextConfigOutput:"",userland:E}),{workAsyncStorage:k,workUnitAsyncStorage:S,serverHooks:b}=C;function A(){return(0,a.patchFetch)({workAsyncStorage:k,workUnitAsyncStorage:S})}async function P(e,t,a){C.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let R="/llms.md/route";R=R.replace(/\/index$/,"")||"/";let f=await C.prepare(e,t,{srcPage:R,multiZoneDraftMode:!1});if(!f)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:v,params:w,nextConfig:E,parsedUrl:k,isDraftMode:S,prerenderManifest:b,routerServerContext:A,isOnDemandRevalidate:P,revalidateOnlyGenerated:T,resolvedPathname:_,clientReferenceManifest:N,serverActionsManifest:I}=f,O=(0,o.normalizeAppPath)(R),q=!!(b.dynamicRoutes[O]||b.routes[_]),U=async()=>((null==A?void 0:A.render404)?await A.render404(e,t,k,!1):t.end("This page could not be found"),null);if(q&&!S){let e=!!b.routes[_],t=b.dynamicRoutes[O];if(t&&!1===t.fallback&&!e){if(E.experimental.adapterPath)return await U();throw new y.NoFallbackError}}let j=null;!q||C.isDev||S||(j="/index"===(j=_)?"/":j);let H=!0===C.isDev||!q,D=q&&!H;I&&N&&(0,i.setManifestsSingleton)({page:R,clientReferenceManifest:N,serverActionsManifest:I});let M=e.method||"GET",$=(0,s.getTracer)(),F=$.getActiveScopeSpan(),G={params:w,prerenderManifest:b,renderOpts:{experimental:{authInterrupts:!!E.experimental.authInterrupts},cacheComponents:!!E.cacheComponents,supportsDynamicResponse:H,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:E.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,n)=>C.onRequestError(e,t,a,n,A)},sharedContext:{buildId:v}},K=new l.NodeNextRequest(e),L=new l.NodeNextResponse(t),B=d.NextRequestAdapter.fromNodeNextRequest(K,(0,d.signalFromNodeResponse)(t));try{let i=async e=>C.handle(B,G).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=$.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${M} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${M} ${R}`)}),o=!!(0,n.getRequestMeta)(e,"minimalMode"),l=async n=>{var s,l;let d=async({previousCacheEntry:r})=>{try{if(!o&&P&&T&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await i(n);e.fetchMetrics=G.renderOpts.fetchMetrics;let l=G.renderOpts.pendingWaitUntil;l&&a.waitUntil&&(a.waitUntil(l),l=void 0);let d=G.renderOpts.collectedTags;if(!q)return await (0,c.sendResponse)(K,L,s,G.renderOpts.pendingWaitUntil),null;{let e=await s.blob(),t=(0,m.toNodeOutgoingHttpHeaders)(s.headers);d&&(t[g.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==G.renderOpts.collectedRevalidate&&!(G.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&G.renderOpts.collectedRevalidate,a=void 0===G.renderOpts.collectedExpire||G.renderOpts.collectedExpire>=g.INFINITE_CACHE?void 0:G.renderOpts.collectedExpire;return{value:{kind:x.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await C.onRequestError(e,t,{routerKind:"App Router",routePath:R,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:D,isOnDemandRevalidate:P})},!1,A),t}},p=await C.handleResponse({req:e,nextConfig:E,cacheKey:j,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:b,isRoutePPREnabled:!1,isOnDemandRevalidate:P,revalidateOnlyGenerated:T,responseGenerator:d,waitUntil:a.waitUntil,isMinimalMode:o});if(!q)return null;if((null==p||null==(s=p.value)?void 0:s.kind)!==x.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==p||null==(l=p.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});o||t.setHeader("x-nextjs-cache",P?"REVALIDATED":p.isMiss?"MISS":p.isStale?"STALE":"HIT"),S&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let y=(0,m.fromNodeOutgoingHttpHeaders)(p.value.headers);return o&&q||y.delete(g.NEXT_CACHE_TAGS_HEADER),!p.cacheControl||t.getHeader("Cache-Control")||y.get("Cache-Control")||y.set("Cache-Control",(0,h.getCacheControlHeader)(p.cacheControl)),await (0,c.sendResponse)(K,L,new Response(p.value.body,{headers:y,status:p.value.status||200})),null};F?await l(F):await $.withPropagatedContext(e.headers,()=>$.trace(p.BaseServerSpan.handleRequest,{spanName:`${M} ${R}`,kind:s.SpanKind.SERVER,attributes:{"http.method":M,"http.target":e.url}},l))}catch(t){if(t instanceof y.NoFallbackError||await C.onRequestError(e,t,{routerKind:"App Router",routePath:O,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:D,isOnDemandRevalidate:P})},!1,A),q)throw t;return await (0,c.sendResponse)(K,L,new Response(null,{status:500})),null}}e.s(["handler",()=>P,"patchFetch",()=>A,"routeModule",()=>C,"serverHooks",()=>b,"workAsyncStorage",()=>k,"workUnitAsyncStorage",()=>S],35712)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__c0e0514f._.js.map