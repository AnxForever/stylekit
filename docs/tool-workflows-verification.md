# Website tool workflows — 2026-10-07

This change improves the tools already available on the website: resource libraries, colors, My Kit exports, command search, and the developer toolkit catalog.

## Behavior

- Resource sections follow `?tab=` through direct links, refresh, and browser history. Legacy section fragments migrate to query parameters without discarding unrelated parameters. The localized resource page uses normal static rendering and its existing Suspense boundary, avoiding an empty-query prerender that disagrees with the requested tab during hydration.
- Command search indexes tool pages and individual resource sections with English and Chinese keywords. Exact tool matches rank above incidental descriptions. Keyboard selection remains visible, and the mobile dialog fits the viewport.
- Copy actions in fonts, gradients, shadows, backgrounds, shaders, and colors share accessible success/failure feedback. Denied or unavailable clipboard access exposes selectable text at the relevant action. Later requests and changed values cannot inherit stale success feedback.
- Gradient Tailwind output preserves the current angle and stops. Background preview, CSS, Tailwind, and Kit exports share complete background declarations and the existing 20px tile size, including layered and SVG backgrounds.
- Neutral shadow presets have unique IDs; original tinted preset IDs keep their existing values.
- The developer catalog reflects verified published versions: Skill 0.8.0, CLI 0.3.1, MCP 0.4.1, and Core 1.0.0-beta.7 on the beta channel. Installation guidance retains the channel distinction.

## Verification

- Unit suite: 285 files passed; 7,945 tests passed and 1 skipped.
- TypeScript: `pnpm exec tsc --noEmit` passed.
- Lint: no errors; 29 existing warnings outside this change.
- Secret scan, product truth, developer contracts, and Core build passed.
- Tailwind 4.1.18 compiled exported custom-angle gradients, layered backgrounds, and SVG data backgrounds with their size declarations.
- Browser checks use an anonymous local session, including a 390px viewport. Native clipboard reads match the exact 25-degree gradient output. Adding Dot Grid to My Kit and downloading a real ZIP succeeds; `surfaces.css`, `AI_PROMPT.md`, and `DESIGN_SPEC.md` all contain the complete background and size.
- Denied/missing clipboard behavior was exercised in the browser. Command-dialog accessibility scan: 24 passes, zero violations. Resources, colors, developers, and Kit have no horizontal overflow in the checked mobile viewport.

The initial production browser run caught a hydration mismatch on non-default resource query tabs that did not occur in the development server. The localized page's `force-static` option supplied empty search parameters during prerender. It was removed so the existing Suspense boundary handles query-dependent rendering, consistent with the [Next.js useSearchParams contract](https://nextjs.org/docs/app/api-reference/functions/use-search-params).

Final production rebuild passed with 2,219 generated pages. A fresh production browser replay then passed legacy-link migration, tab selection, reload, back/forward, Chinese command search, native clipboard copying, and an actual Kit ZIP download with **zero page errors and zero console errors**. The prior resource hydration mismatch did not recur. Kit's measured scroll width and viewport width both equal 390px.

## Boundaries

The existing mobile, navigation, theme, and analytics work in this checkout was preserved. Browser validation used local production/development servers with analytics disabled; it is not a production deployment or a real-device test. No commits, pushes, or deployments were performed for this website change.
