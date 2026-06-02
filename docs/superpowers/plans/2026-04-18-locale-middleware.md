# Locale Middleware Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Next.js 16 root middleware that 308-redirects every non-prefixed URL (e.g. `/blog`) to the resolved locale-prefixed version (e.g. `/en/blog`) so each public page has one canonical URL.

**Architecture:** Single `middleware.ts` at project root, ~25 lines, reusing every helper from `lib/i18n/routing.ts` (no new routing logic). Locale resolution: cookie → `Accept-Language` → `DEFAULT_LOCALE`. Test-first with vitest + mocked `NextRequest`.

**Tech Stack:** Next.js 16 middleware API, TypeScript strict, vitest, `@/lib/i18n/routing` helpers.

**Spec:** `docs/superpowers/specs/2026-04-18-locale-middleware-design.md`

---

## File Structure

**New files (2):**

| Path | Responsibility |
|------|----------------|
| `middleware.ts` | Next.js middleware entry. Bypasses excluded paths, resolves target locale, returns 308 redirect. |
| `tests/unit/middleware.test.ts` | Unit tests for every bypass + redirect branch (13+ cases). |

**Files NOT touched:** `lib/i18n/routing.ts`, `app/**`, `app/sitemap.ts`, `app/layout.tsx`, `next.config.ts`.

---

## Task 1: Middleware TDD

**Files:**
- Create: `middleware.ts`
- Create: `tests/unit/middleware.test.ts`

- [ ] **Step 1.1: Write the failing tests**

Create `tests/unit/middleware.test.ts`:

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";

const redirectMock = vi.fn();
const nextMock = vi.fn();

vi.mock("next/server", () => ({
  NextResponse: {
    redirect: (url: URL, status?: number) => {
      redirectMock(url, status);
      return { type: "redirect", url, status };
    },
    next: () => {
      nextMock();
      return { type: "next" };
    },
  },
}));

import { middleware } from "@/middleware";

type FakeCookie = { value: string } | undefined;

function buildRequest(options: {
  pathname: string;
  search?: string;
  cookie?: FakeCookie;
  acceptLanguage?: string | null;
}) {
  const url = new URL(
    `https://stylekit.top${options.pathname}${options.search ?? ""}`,
  );
  return {
    nextUrl: {
      pathname: url.pathname,
      search: url.search,
      clone: () => new URL(url.toString()),
    },
    cookies: {
      get: (_name: string) => options.cookie,
    },
    headers: {
      get: (name: string) => {
        if (name.toLowerCase() === "accept-language") {
          return options.acceptLanguage ?? null;
        }
        return null;
      },
    },
  } as unknown as import("next/server").NextRequest;
}

describe("locale middleware", () => {
  beforeEach(() => {
    redirectMock.mockClear();
    nextMock.mockClear();
  });

  it("redirects unprefixed path to default locale when no cookie and no header", () => {
    middleware(buildRequest({ pathname: "/blog" }));
    expect(redirectMock).toHaveBeenCalledTimes(1);
    const [url, status] = redirectMock.mock.calls[0];
    expect(url.pathname).toBe("/en/blog");
    expect(status).toBe(308);
  });

  it("redirects unprefixed path using cookie locale when set", () => {
    middleware(
      buildRequest({ pathname: "/blog", cookie: { value: "zh" } }),
    );
    const [url] = redirectMock.mock.calls[0];
    expect(url.pathname).toBe("/zh/blog");
  });

  it("falls back to Accept-Language when cookie is invalid", () => {
    middleware(
      buildRequest({
        pathname: "/blog",
        cookie: { value: "fr" },
        acceptLanguage: "zh-CN,en;q=0.9",
      }),
    );
    const [url] = redirectMock.mock.calls[0];
    expect(url.pathname).toBe("/zh/blog");
  });

  it("falls back to default locale when Accept-Language has no zh", () => {
    middleware(
      buildRequest({ pathname: "/blog", acceptLanguage: "en-US,en;q=0.9" }),
    );
    const [url] = redirectMock.mock.calls[0];
    expect(url.pathname).toBe("/en/blog");
  });

  it("redirects root path to locale root", () => {
    middleware(buildRequest({ pathname: "/" }));
    const [url] = redirectMock.mock.calls[0];
    expect(url.pathname).toBe("/en");
  });

  it("preserves query string when redirecting", () => {
    middleware(buildRequest({ pathname: "/blog", search: "?topic=x" }));
    const [url] = redirectMock.mock.calls[0];
    expect(url.pathname).toBe("/en/blog");
    expect(url.search).toBe("?topic=x");
  });

  it("passes through already-localized /en/blog", () => {
    middleware(buildRequest({ pathname: "/en/blog" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("passes through already-localized /zh/blog", () => {
    middleware(buildRequest({ pathname: "/zh/blog" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  it("bypasses /api/* routes", () => {
    middleware(buildRequest({ pathname: "/api/styles" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("bypasses /admin/* routes", () => {
    middleware(buildRequest({ pathname: "/admin/users" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  it("bypasses /favicon.ico", () => {
    middleware(buildRequest({ pathname: "/favicon.ico" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  it("bypasses /sitemap.xml", () => {
    middleware(buildRequest({ pathname: "/sitemap.xml" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  it("bypasses /robots.txt", () => {
    middleware(buildRequest({ pathname: "/robots.txt" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  it("bypasses arbitrary file extensions", () => {
    middleware(buildRequest({ pathname: "/og-image.svg" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  it("bypasses /opengraph-image", () => {
    middleware(buildRequest({ pathname: "/opengraph-image" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  it("bypasses nested generated image routes", () => {
    middleware(buildRequest({ pathname: "/styles/glassmorphism/opengraph-image" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 1.2: Run tests to verify they fail**

```bash
npx --no-install vitest run --config tests/vitest.config.ts tests/unit/middleware.test.ts
```

Expected: FAIL. Error mentions module `@/middleware` cannot be resolved (middleware.ts does not exist yet).

- [ ] **Step 1.3: Implement middleware**

Create `middleware.ts` at the project root:

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

- [ ] **Step 1.4: Run tests to verify they pass**

```bash
npx --no-install vitest run --config tests/vitest.config.ts tests/unit/middleware.test.ts
```

Expected: 16 tests pass, 0 fail.

- [ ] **Step 1.5: Run full test suite to confirm no regression**

```bash
npx --no-install vitest run --config tests/vitest.config.ts --reporter=dot
```

Expected: failure count identical to baseline (34). Previously-passing tests all still pass. Our 16 new tests show up in the passed count.

- [ ] **Step 1.6: Commit**

```bash
git add middleware.ts tests/unit/middleware.test.ts
git commit -m "feat: add locale redirect middleware"
```

Verify:
```bash
git log -1 --stat
```

---

## Task 2: Integration verification

- [ ] **Step 2.1: Lint the new files**

```bash
npx --no-install eslint middleware.ts tests/unit/middleware.test.ts
```

Expected: 0 errors. A file-ignored warning is acceptable (some configs ignore root `.ts` files) — if that's the only output, treat as pass.

- [ ] **Step 2.2: Full type check**

```bash
npx --no-install tsc --noEmit 2>&1 | grep -c "error TS"
```

Expected: `24` or lower (the baseline). If higher, inspect the added errors; they must not reference `middleware.ts` or `tests/unit/middleware.test.ts`.

- [ ] **Step 2.3: Production build (best effort)**

```bash
npm run build 2>&1 | tail -40
```

The build is expected to still fail on the baseline `@/lib/templates/catalog` module-not-found issue if working in a worktree based on HEAD. That failure is baseline, not caused by this change. If an additional failure surfaces referencing `middleware.ts`, that IS a regression — fix it before merge.

- [ ] **Step 2.4: Manual smoke (optional, requires dev server)**

If a dev server can run:

```bash
npm run dev &
sleep 8
curl -sI http://localhost:3000/blog -H "Accept-Language: en-US"
# expect: HTTP/1.x 308 + Location: /en/blog
curl -sI http://localhost:3000/blog -H "Accept-Language: zh-CN"
# expect: HTTP/1.x 308 + Location: /zh/blog
curl -sI http://localhost:3000/en/blog
# expect: HTTP/1.x 200 (no redirect)
curl -sI http://localhost:3000/api/auth/linuxdo
# expect: not a 308 redirect to /en/api/... — should pass through
```

If the dev server cannot run in this environment, skip and note it.

- [ ] **Step 2.5: Final commit if formatter hooks modified anything**

```bash
git status
# if modified:
git add -u && git commit -m "chore: apply formatter to middleware files"
```

Skip if `git status` is clean — do NOT create an empty commit.

---

## Acceptance criteria

- [x] 2 new files exist: `middleware.ts`, `tests/unit/middleware.test.ts`.
- [x] 16 middleware unit tests pass.
- [x] Full test suite failure count = 34 (baseline unchanged).
- [x] `tsc` error count ≤ 24 (baseline). No new errors from the 2 new files.
- [x] `eslint` clean on the 2 new files.
- [x] 1 commit on a feature branch, Conventional Commit format.
- [x] No existing files modified.

## Rollback

```bash
git rm middleware.ts tests/unit/middleware.test.ts
git commit -m "revert: remove locale redirect middleware"
```

No other files are touched — rollback is localized.
