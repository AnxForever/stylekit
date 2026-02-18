module.exports=[918622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},556704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},832319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},270406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},193695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},226822,e=>{"use strict";var t=e.i(397764),r=e.i(333902),n=e.i(545475),a=e.i(622736),o=e.i(951683),s=e.i(834857),i=e.i(154137),l=e.i(359207),d=e.i(550419),p=e.i(663859),u=e.i(398368),c=e.i(68300),h=e.i(103152),m=e.i(146739),x=e.i(404155),g=e.i(193695);e.i(765892);var y=e.i(383239),R=e.i(391173),$=e.i(861014),v=e.i(335424);async function f(e,{params:t}){let{slug:r}=await t,n=(0,R.getStyleBySlug)(r);if(!n)return new Response("# Error\n\nStyle not found",{status:404,headers:{"Content-Type":"text/markdown; charset=utf-8"}});let a=(0,$.getStyleTokens)(r),o=(0,v.getStyleRecipes)(r),s=[];if(s.push(`# ${n.nameEn} (${n.name})

> ${n.description}

**Slug**: \`${n.slug}\`
**Type**: ${n.styleType}
**Keywords**: ${n.keywords.join(", ")}

---

## Design Philosophy

${n.philosophy}

---

## Do's

${n.doList.map(e=>`- ${e}`).join("\n")}

## Don'ts

${n.dontList.map(e=>`- ${e}`).join("\n")}

---

## AI Rules

\`\`\`
${n.aiRules}
\`\`\`

---

## Colors

- **Primary**: \`${n.colors.primary}\`
- **Secondary**: \`${n.colors.secondary}\`
- **Accent**: ${n.colors.accent.map(e=>`\`${e}\``).join(", ")}

---
`),a&&s.push(`## Design Tokens

### Border
- Width: \`${a.border.width}\`
- Color: \`${a.border.color}\`
- Radius: \`${a.border.radius}\`

### Shadow
- Small: \`${a.shadow.sm}\`
- Medium: \`${a.shadow.md}\`
- Large: \`${a.shadow.lg}\`
- Hover: \`${a.shadow.hover}\`

### Interaction
- Transition: \`${a.interaction.transition}\`
${a.interaction.hoverTranslate?`- Hover Translate: \`${a.interaction.hoverTranslate}\``:""}
${a.interaction.hoverScale?`- Hover Scale: \`${a.interaction.hoverScale}\``:""}

### Typography
- Heading: \`${a.typography.heading}\`
- Body: \`${a.typography.body}\`

### Forbidden Classes
${a.forbidden.classes.map(e=>`- \`${e}\``).join("\n")}

---
`),s.push(`## Components

### Button

${n.components.button.description}

\`\`\`tsx
${n.components.button.code}
\`\`\`

### Card

${n.components.card.description}

\`\`\`tsx
${n.components.card.code}
\`\`\`

### Input

${n.components.input.description}

\`\`\`tsx
${n.components.input.code}
\`\`\`
`),o)for(let e of(s.push(`---

## Component Recipes

`),Object.values(o.recipes)))s.push(`### ${e.name}

${e.description}

**Parameters**:
${e.parameters.map(e=>`- \`${e.id}\` (${e.type}): ${e.label}${e.default?` [default: ${e.default}]`:""}`).join("\n")}

**Variants**: ${Object.keys(e.variants).join(", ")}
`);if(n.examplePrompts&&n.examplePrompts.length>0)for(let e of(s.push(`---

## Example Prompts

`),n.examplePrompts))s.push(`### ${e.titleEn}

${e.descriptionEn}

\`\`\`
${e.prompt}
\`\`\`
`);return n.globalCss&&s.push(`---

## Global CSS

\`\`\`css
${n.globalCss}
\`\`\`
`),n.compatibleWith&&n.compatibleWith.length>0&&s.push(`---

## Compatible With

This style works well with:
${n.compatibleWith.map(e=>`- \`${e}\``).join("\n")}
`),new Response(s.join("\n"),{headers:{"Content-Type":"text/markdown; charset=utf-8","Cache-Control":"public, max-age=3600, s-maxage=3600"}})}e.s(["GET",()=>f],271075);var w=e.i(271075);let C=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/styles/[slug]/md/route",pathname:"/api/styles/[slug]/md",filename:"route",bundlePath:""},distDir:"/tmp/stylekit-next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/styles/[slug]/md/route.ts",nextConfigOutput:"",userland:w}),{workAsyncStorage:E,workUnitAsyncStorage:b,serverHooks:T}=C;function S(){return(0,n.patchFetch)({workAsyncStorage:E,workUnitAsyncStorage:b})}async function A(e,t,n){C.isDev&&(0,a.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let R="/api/styles/[slug]/md/route";R=R.replace(/\/index$/,"")||"/";let $=await C.prepare(e,t,{srcPage:R,multiZoneDraftMode:!1});if(!$)return t.statusCode=400,t.end("Bad Request"),null==n.waitUntil||n.waitUntil.call(n,Promise.resolve()),null;let{buildId:v,params:f,nextConfig:w,parsedUrl:E,isDraftMode:b,prerenderManifest:T,routerServerContext:S,isOnDemandRevalidate:A,revalidateOnlyGenerated:P,resolvedPathname:k,clientReferenceManifest:j,serverActionsManifest:N}=$,O=(0,i.normalizeAppPath)(R),H=!!(T.dynamicRoutes[O]||T.routes[k]),_=async()=>((null==S?void 0:S.render404)?await S.render404(e,t,E,!1):t.end("This page could not be found"),null);if(H&&!b){let e=!!T.routes[k],t=T.dynamicRoutes[O];if(t&&!1===t.fallback&&!e){if(w.experimental.adapterPath)return await _();throw new g.NoFallbackError}}let q=null;!H||C.isDev||b||(q="/index"===(q=k)?"/":q);let I=!0===C.isDev||!H,D=H&&!I;N&&j&&(0,s.setManifestsSingleton)({page:R,clientReferenceManifest:j,serverActionsManifest:N});let U=e.method||"GET",M=(0,o.getTracer)(),B=M.getActiveScopeSpan(),F={params:f,prerenderManifest:T,renderOpts:{experimental:{authInterrupts:!!w.experimental.authInterrupts},cacheComponents:!!w.cacheComponents,supportsDynamicResponse:I,incrementalCache:(0,a.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:w.cacheLife,waitUntil:n.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,n,a)=>C.onRequestError(e,t,n,a,S)},sharedContext:{buildId:v}},K=new l.NodeNextRequest(e),L=new l.NodeNextResponse(t),W=d.NextRequestAdapter.fromNodeNextRequest(K,(0,d.signalFromNodeResponse)(t));try{let s=async e=>C.handle(W,F).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=M.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let n=r.get("next.route");if(n){let t=`${U} ${n}`;e.setAttributes({"next.route":n,"http.route":n,"next.span_name":t}),e.updateName(t)}else e.updateName(`${U} ${R}`)}),i=!!(0,a.getRequestMeta)(e,"minimalMode"),l=async a=>{var o,l;let d=async({previousCacheEntry:r})=>{try{if(!i&&A&&P&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let o=await s(a);e.fetchMetrics=F.renderOpts.fetchMetrics;let l=F.renderOpts.pendingWaitUntil;l&&n.waitUntil&&(n.waitUntil(l),l=void 0);let d=F.renderOpts.collectedTags;if(!H)return await (0,c.sendResponse)(K,L,o,F.renderOpts.pendingWaitUntil),null;{let e=await o.blob(),t=(0,h.toNodeOutgoingHttpHeaders)(o.headers);d&&(t[x.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==F.renderOpts.collectedRevalidate&&!(F.renderOpts.collectedRevalidate>=x.INFINITE_CACHE)&&F.renderOpts.collectedRevalidate,n=void 0===F.renderOpts.collectedExpire||F.renderOpts.collectedExpire>=x.INFINITE_CACHE?void 0:F.renderOpts.collectedExpire;return{value:{kind:y.CachedRouteKind.APP_ROUTE,status:o.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:n}}}}catch(t){throw(null==r?void 0:r.isStale)&&await C.onRequestError(e,t,{routerKind:"App Router",routePath:R,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:D,isOnDemandRevalidate:A})},!1,S),t}},p=await C.handleResponse({req:e,nextConfig:w,cacheKey:q,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:T,isRoutePPREnabled:!1,isOnDemandRevalidate:A,revalidateOnlyGenerated:P,responseGenerator:d,waitUntil:n.waitUntil,isMinimalMode:i});if(!H)return null;if((null==p||null==(o=p.value)?void 0:o.kind)!==y.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==p||null==(l=p.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});i||t.setHeader("x-nextjs-cache",A?"REVALIDATED":p.isMiss?"MISS":p.isStale?"STALE":"HIT"),b&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let g=(0,h.fromNodeOutgoingHttpHeaders)(p.value.headers);return i&&H||g.delete(x.NEXT_CACHE_TAGS_HEADER),!p.cacheControl||t.getHeader("Cache-Control")||g.get("Cache-Control")||g.set("Cache-Control",(0,m.getCacheControlHeader)(p.cacheControl)),await (0,c.sendResponse)(K,L,new Response(p.value.body,{headers:g,status:p.value.status||200})),null};B?await l(B):await M.withPropagatedContext(e.headers,()=>M.trace(p.BaseServerSpan.handleRequest,{spanName:`${U} ${R}`,kind:o.SpanKind.SERVER,attributes:{"http.method":U,"http.target":e.url}},l))}catch(t){if(t instanceof g.NoFallbackError||await C.onRequestError(e,t,{routerKind:"App Router",routePath:O,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:D,isOnDemandRevalidate:A})},!1,S),H)throw t;return await (0,c.sendResponse)(K,L,new Response(null,{status:500})),null}}e.s(["handler",()=>A,"patchFetch",()=>S,"routeModule",()=>C,"serverHooks",()=>T,"workAsyncStorage",()=>E,"workUnitAsyncStorage",()=>b],226822)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__396d956a._.js.map