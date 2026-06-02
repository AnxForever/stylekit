# Locale Routing Middleware

**Date:** 2026-04-18
**Status:** Approved (pending implementation plan)
**Scope:** A2 subtask — eliminate duplicate URLs between `/<pathname>` and `/<locale>/<pathname>` via server-side 308 redirect

## Problem

StyleKit serves the same content on two URLs:

- `/blog` → `app/blog/page.tsx`
- `/en/blog` → `app/[locale]/blog/page.tsx` (re-exports `app/blog/page.tsx`)

Both return HTTP 200. Sitemap only lists the locale-prefixed versions.
`localizeMetadata()` emits correct canonical + hreflang for locale-prefixed
pages, but non-prefixed pages inherit `canonical: BASE_URL` from
`app/layout.tsx:88` — which canonicalizes every non-prefix URL to the root.
That is wrong and creates SEO duplicate content.

## Goals

- One request to `/<pathname>` returns 308 redirect to `/<resolved-locale>/<pathname>`.
- No request to `/<locale>/<pathname>` is intercepted.
- API, admin, static, and file routes are never touched.
- Query string and hash are preserved through redirect.
- Target locale is resolved in this priority order: `stylekit-locale` cookie →
  `Accept-Language` header → `DEFAULT_LOCALE` ("en").
- Zero code duplication with `lib/i18n/routing.ts` — reuse every helper.
- No change to sitemap, page metadata, or layout canonical for now — those
  become correct automatically once the non-prefix URL is no longer publicly
  reachable.

## Non-Goals

- Deleting non-prefix `page.tsx` files (e.g., `app/blog/page.tsx`). They stay.
  Middleware prevents public access; the files continue to satisfy Next.js's
  expectation that `app/[locale]/blog/page.tsx` can re-export from them.
- Changing `localizeMetadata()` or `app/layout.tsx` canonical.
- Migrating any `<Link>` to add locale prefix — internal `localizeHref()` usage
  and the middleware together handle linking correctly.
- Adding a locale switcher UI — already exists.
- Handling legacy inbound links — 308 itself informs Google/Bing to transfer.

## Design

### 1. New file: `middleware.ts` (project root)

Next.js 16 App Router detects middleware at the project root.

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  LOCALE_COOKIE_NAME,
  addLocaleToPathname,
  detectPreferredLocale,
  getLocaleFromPathname,
  isLocale,
  shouldBypassLocale,
} from "@/lib/i18n/routing";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldBypassLocale(pathname)) return NextResponse.next();
  if (getLocaleFromPathname(pathname)) return NextResponse.next();

  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  const targetLocale = isLocale(cookieLocale)
    ? cookieLocale
    : detectPreferredLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = addLocaleToPathname(pathname, targetLocale);
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

### 2. Decision: 308 vs 301

308 Permanent Redirect preserves method and body. 301 is permitted by some
browsers to downgrade POST to GET. Since any future POST to an unprefixed URL
(e.g., form submit) should reach the exact same handler locale-prefixed,
**308 is chosen**. Google and Bing treat 308 the same as 301 for indexing.

### 3. Matcher strategy

The Next.js matcher is a first-pass exclusion. The middleware body uses
`shouldBypassLocale()` as the single source of truth. This keeps the matcher
simple while letting `routing.ts` evolve without changing `next.config` or
`middleware.ts`.

Paths allowed into the middleware but intentionally bypassed inside:

- `/api/**`, `/admin/**`, `/api-test` — via `shouldBypassLocale` prefix check
- `/favicon.ico`, `/manifest.json`, `/robots.txt`, `/sitemap.xml`,
  `/llms.md`, `/llms-full.txt`, `/opengraph-image` — via `NON_LOCALIZED_EXACT`
- Any file with extension (`/foo.png`, `/foo.svg`) — via `FILE_EXTENSION_RE`
- Generated image routes (`*/opengraph-image`, `*/twitter-image`, `*/icon`) —
  via regex in `shouldBypassLocale`
- `/feed/**` — handled in `shouldBypassLocale`

### 4. Edge cases explicitly handled

| Input | Output |
|---|---|
| `/blog` (no cookie, `Accept-Language: en-US`) | 308 → `/en/blog` |
| `/blog` (cookie `stylekit-locale=zh`) | 308 → `/zh/blog` |
| `/blog` (no cookie, `Accept-Language: zh-CN,en;q=0.9`) | 308 → `/zh/blog` |
| `/blog` (no cookie, no `Accept-Language`) | 308 → `/en/blog` |
| `/en/blog` | pass through (no redirect) |
| `/zh/blog?topic=x#frag` → `/zh/blog?topic=x#frag` (pass) |
| `/blog?topic=x` (no cookie, en) | 308 → `/en/blog?topic=x` (search preserved by `url.clone()`) |
| `/` (no cookie, en) | 308 → `/en` |
| `/api/styles` | pass through (bypass) |
| `/favicon.ico` | pass through (bypass) |
| `/sitemap.xml` | pass through (bypass) |
| `/admin/users` | pass through (bypass) |

### 5. Files touched

| Path | Action |
|---|---|
| `middleware.ts` | Create |
| `tests/unit/middleware.test.ts` | Create — unit tests covering every edge case above |

**Not touched:** `app/**`, `lib/i18n/**`, `app/sitemap.ts`, `app/layout.tsx`,
existing pages. Middleware is the only new behavior.

## Testing

Unit tests with vitest + mocked `NextRequest`:

- Construct a fake request with `nextUrl`, `cookies.get()`, `headers.get()`.
- Assert either `NextResponse.next()` or `NextResponse.redirect(url, 308)`.
- Assert redirect target URL (pathname + search).

One test per row in the "Edge cases" table above. Goal: 13+ tests,
100% of middleware lines covered.

## Verification

```
pnpm lint
pnpm exec tsc --noEmit
pnpm test
pnpm build
```

Same baseline expectations as A1: pre-existing failures are unchanged.

Manual smoke (optional):

```
curl -sI http://localhost:3000/blog -H "Accept-Language: zh"
# expect: HTTP/1.1 308 / Location: /zh/blog
```

## Rollback

`git rm middleware.ts tests/unit/middleware.test.ts` — no other file depends
on it. Safe revert in one commit.

## Open questions

None — Darling already chose:

- Strategy: ① middleware redirect (not canonical-only, not removing locale)
- Default locale: `en` (from `DEFAULT_LOCALE` in `routing.ts`)
- Redirect semantics: 308 (permanent, method-preserving)
- Scope: no deletion of non-prefix pages in this change
