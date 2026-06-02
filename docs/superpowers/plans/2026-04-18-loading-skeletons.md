# Loading Skeletons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add route-level loading skeletons to 8 high-traffic routes (showcase, template, blog, changelog, compare, analyze, prompts) using a single shared `PageSkeleton` component with 5 visual variants.

**Architecture:** One new component `components/skeletons/page-skeleton.tsx` that composes existing atoms from `components/ui/skeleton.tsx` (`Skeleton`, `NavSkeleton`) into 5 page-level variants. Each new `loading.tsx` is a 3-line re-export that picks a variant.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4, vitest + @testing-library/react.

**Spec:** `docs/superpowers/specs/2026-04-18-loading-skeletons-design.md`

---

## File Structure

**New files (10 total):**

| Path | Responsibility |
|------|----------------|
| `components/skeletons/page-skeleton.tsx` | `PageSkeleton` component + 5 variant sub-components |
| `components/skeletons/__tests__/page-skeleton.test.tsx` | Vitest unit tests for each variant |
| `app/styles/[slug]/showcase/loading.tsx` | Wires `showcase` variant |
| `app/templates/[slug]/loading.tsx` | Wires `template` variant |
| `app/blog/loading.tsx` | Wires `article` variant |
| `app/blog/[slug]/loading.tsx` | Wires `article` variant |
| `app/changelog/loading.tsx` | Wires `article` variant |
| `app/compare/loading.tsx` | Wires `dashboard` variant |
| `app/analyze/loading.tsx` | Wires `dashboard` variant |
| `app/prompts/loading.tsx` | Wires `form` variant |

**Files NOT touched:** existing `app/loading.tsx`, `app/styles/loading.tsx`, `app/styles/[slug]/loading.tsx`, `app/community/loading.tsx`, `app/profile/loading.tsx`, `app/animations/loading.tsx`, `app/animations/[slug]/loading.tsx`, `app/components/loading.tsx`. `components/ui/skeleton.tsx` is imported but not modified.

---

## Task 1: PageSkeleton Component (TDD)

**Files:**
- Create: `components/skeletons/page-skeleton.tsx`
- Create: `components/skeletons/__tests__/page-skeleton.test.tsx`

- [ ] **Step 1.1: Write the failing tests**

Create `components/skeletons/__tests__/page-skeleton.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageSkeleton, type PageSkeletonVariant } from "@/components/skeletons/page-skeleton";

const VARIANTS: PageSkeletonVariant[] = [
  "showcase",
  "template",
  "article",
  "dashboard",
  "form",
];

describe("PageSkeleton", () => {
  it.each(VARIANTS)("renders variant '%s' with identifiable container", (variant) => {
    render(<PageSkeleton variant={variant} />);
    expect(
      screen.getByTestId(`page-skeleton-${variant}`),
    ).toBeInTheDocument();
  });

  it.each(VARIANTS)("variant '%s' includes pulsing placeholders", (variant) => {
    const { container } = render(<PageSkeleton variant={variant} />);
    expect(
      container.querySelectorAll(".animate-pulse").length,
    ).toBeGreaterThan(0);
  });

  it.each(VARIANTS)("variant '%s' renders a nav placeholder at the top", (variant) => {
    const { container } = render(<PageSkeleton variant={variant} />);
    // NavSkeleton emits a border-b + a max-w-7xl row
    expect(container.querySelector(".border-b.border-border")).not.toBeNull();
  });
});
```

- [ ] **Step 1.2: Run tests to verify they fail**

Run:
```bash
npx --no-install vitest run --config tests/vitest.config.ts components/skeletons/__tests__/page-skeleton.test.tsx
```

Expected: FAIL. The error mentions that `@/components/skeletons/page-skeleton` cannot be resolved (module not found).

- [ ] **Step 1.3: Implement PageSkeleton**

Create `components/skeletons/page-skeleton.tsx`:

```tsx
import { NavSkeleton, Skeleton } from "@/components/ui/skeleton";

export type PageSkeletonVariant =
  | "showcase"
  | "template"
  | "article"
  | "dashboard"
  | "form";

export interface PageSkeletonProps {
  variant: PageSkeletonVariant;
}

export function PageSkeleton({ variant }: PageSkeletonProps) {
  return (
    <div
      className="min-h-screen flex flex-col"
      data-testid={`page-skeleton-${variant}`}
    >
      <NavSkeleton />
      <main className="flex-1">
        {variant === "showcase" && <ShowcaseVariant />}
        {variant === "template" && <TemplateVariant />}
        {variant === "article" && <ArticleVariant />}
        {variant === "dashboard" && <DashboardVariant />}
        {variant === "form" && <FormVariant />}
      </main>
    </div>
  );
}

function ShowcaseVariant() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <div className="mb-8">
        <Skeleton className="h-4 w-24 mb-3" />
        <Skeleton className="h-10 w-96 max-w-full mb-3" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>
      <Skeleton className="aspect-[16/9] w-full mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-border">
            <Skeleton className="aspect-[4/3]" />
            <div className="p-4">
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TemplateVariant() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="aspect-[4/3] w-full mb-4" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-24" />
            ))}
          </div>
        </div>
        <aside className="space-y-4">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-11 w-full mt-4" />
        </aside>
      </div>
    </div>
  );
}

function ArticleVariant() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <Skeleton className="h-4 w-32 mb-4" />
      <Skeleton className="h-10 w-full mb-3" />
      <Skeleton className="h-10 w-3/4 mb-6" />
      <div className="flex items-center gap-3 mb-10">
        <Skeleton variant="circular" className="h-10 w-10" />
        <div className="flex-1">
          <Skeleton className="h-4 w-32 mb-1" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className={`h-4 ${i % 3 === 0 ? "w-5/6" : "w-full"}`}
          />
        ))}
      </div>
    </div>
  );
}

function DashboardVariant() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <Skeleton className="h-10 w-64 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border border-border p-6">
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="border border-border p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <Skeleton className="h-64 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function FormVariant() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <Skeleton className="h-10 w-80 mb-4" />
      <Skeleton className="h-5 w-full max-w-xl mb-8" />
      <div className="flex gap-2 mb-6 border-b border-border pb-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-28" />
        ))}
      </div>
      <Skeleton className="h-48 w-full mb-4" />
      <div className="flex justify-end gap-3">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
```

- [ ] **Step 1.4: Run tests to verify they pass**

Run:
```bash
npx --no-install vitest run --config tests/vitest.config.ts components/skeletons/__tests__/page-skeleton.test.tsx
```

Expected: PASS. 15 tests passed (5 variants × 3 test blocks).

- [ ] **Step 1.5: Commit**

```bash
git add components/skeletons/page-skeleton.tsx components/skeletons/__tests__/page-skeleton.test.tsx
git commit -m "feat: add PageSkeleton component with 5 variants"
```

---

## Task 2: Wire showcase + template loading routes

**Files:**
- Create: `app/styles/[slug]/showcase/loading.tsx`
- Create: `app/templates/[slug]/loading.tsx`

- [ ] **Step 2.1: Add showcase loading.tsx**

Create `app/styles/[slug]/showcase/loading.tsx`:

```tsx
import { PageSkeleton } from "@/components/skeletons/page-skeleton";

export default function Loading() {
  return <PageSkeleton variant="showcase" />;
}
```

- [ ] **Step 2.2: Add template loading.tsx**

Create `app/templates/[slug]/loading.tsx`:

```tsx
import { PageSkeleton } from "@/components/skeletons/page-skeleton";

export default function Loading() {
  return <PageSkeleton variant="template" />;
}
```

- [ ] **Step 2.3: Verify TypeScript accepts both files**

Run:
```bash
npx --no-install tsc --noEmit
```

Expected: exits 0, no errors. If it fails with "Cannot find module '@/components/skeletons/page-skeleton'", Task 1 did not complete — go back.

- [ ] **Step 2.4: Commit**

```bash
git add app/styles/\[slug\]/showcase/loading.tsx app/templates/\[slug\]/loading.tsx
git commit -m "feat: add loading skeleton for style showcase and template routes"
```

---

## Task 3: Wire article loading routes (blog × 2 + changelog)

**Files:**
- Create: `app/blog/loading.tsx`
- Create: `app/blog/[slug]/loading.tsx`
- Create: `app/changelog/loading.tsx`

- [ ] **Step 3.1: Add blog list loading.tsx**

Create `app/blog/loading.tsx`:

```tsx
import { PageSkeleton } from "@/components/skeletons/page-skeleton";

export default function Loading() {
  return <PageSkeleton variant="article" />;
}
```

- [ ] **Step 3.2: Add blog detail loading.tsx**

Create `app/blog/[slug]/loading.tsx`:

```tsx
import { PageSkeleton } from "@/components/skeletons/page-skeleton";

export default function Loading() {
  return <PageSkeleton variant="article" />;
}
```

- [ ] **Step 3.3: Add changelog loading.tsx**

Create `app/changelog/loading.tsx`:

```tsx
import { PageSkeleton } from "@/components/skeletons/page-skeleton";

export default function Loading() {
  return <PageSkeleton variant="article" />;
}
```

- [ ] **Step 3.4: Verify TypeScript**

Run:
```bash
npx --no-install tsc --noEmit
```

Expected: exits 0, no errors.

- [ ] **Step 3.5: Commit**

```bash
git add app/blog/loading.tsx app/blog/\[slug\]/loading.tsx app/changelog/loading.tsx
git commit -m "feat: add loading skeleton for blog and changelog routes"
```

---

## Task 4: Wire dashboard loading routes (compare + analyze)

**Files:**
- Create: `app/compare/loading.tsx`
- Create: `app/analyze/loading.tsx`

- [ ] **Step 4.1: Add compare loading.tsx**

Create `app/compare/loading.tsx`:

```tsx
import { PageSkeleton } from "@/components/skeletons/page-skeleton";

export default function Loading() {
  return <PageSkeleton variant="dashboard" />;
}
```

- [ ] **Step 4.2: Add analyze loading.tsx**

Create `app/analyze/loading.tsx`:

```tsx
import { PageSkeleton } from "@/components/skeletons/page-skeleton";

export default function Loading() {
  return <PageSkeleton variant="dashboard" />;
}
```

- [ ] **Step 4.3: Verify TypeScript**

Run:
```bash
npx --no-install tsc --noEmit
```

Expected: exits 0, no errors.

- [ ] **Step 4.4: Commit**

```bash
git add app/compare/loading.tsx app/analyze/loading.tsx
git commit -m "feat: add loading skeleton for compare and analyze routes"
```

---

## Task 5: Wire form loading route (prompts)

**Files:**
- Create: `app/prompts/loading.tsx`

- [ ] **Step 5.1: Add prompts loading.tsx**

Create `app/prompts/loading.tsx`:

```tsx
import { PageSkeleton } from "@/components/skeletons/page-skeleton";

export default function Loading() {
  return <PageSkeleton variant="form" />;
}
```

- [ ] **Step 5.2: Verify TypeScript**

Run:
```bash
npx --no-install tsc --noEmit
```

Expected: exits 0, no errors.

- [ ] **Step 5.3: Commit**

```bash
git add app/prompts/loading.tsx
git commit -m "feat: add loading skeleton for prompts route"
```

---

## Task 6: Full verification suite

No file changes in this task — this is the final gate before declaring work done.

- [ ] **Step 6.1: Run secret scan**

Run:
```bash
npm run security:secrets
```

Expected: exits 0. If it flags any of the new files, inspect — none of them should contain secret-like strings.

- [ ] **Step 6.2: Run lint**

Run:
```bash
npm run lint
```

Expected: exits 0. No new warnings from the 10 new files.

- [ ] **Step 6.3: Run type check**

Run:
```bash
npx tsc --noEmit
```

Expected: exits 0.

- [ ] **Step 6.4: Run full test suite**

Run:
```bash
npm run test
```

Expected: all tests pass, including the 15 new `PageSkeleton` tests. Watch for any pre-existing failures — if something unrelated broke, that's out of scope for this plan; file a note in chat and continue.

- [ ] **Step 6.5: Run production build**

Run:
```bash
npm run build
```

Expected: exits 0. Look in build output for lines containing each of the 8 new routes to confirm Next.js picked up the new `loading.tsx` files (the build log lists route segments).

- [ ] **Step 6.6: Manual smoke check (optional, requires dev server)**

If the dev server can run in this environment, start it and navigate through the 8 routes in a browser. Throttle network to Slow 3G in DevTools and confirm a skeleton appears briefly before the real page paints. If the dev server cannot run here, skip and report that E2E verification is pending.

```bash
npm run dev
# then open http://localhost:3000/styles/glassmorphism/showcase (and the other 7 routes)
```

- [ ] **Step 6.7: Final commit if any whitespace/format hooks changed files**

If the Prettier hook or other PostToolUse hooks modified any new file during verification, commit those changes:

```bash
git status
# if anything is modified:
git add -u
git commit -m "chore: apply formatter to loading skeleton files"
```

If `git status` shows no changes, skip this step — do NOT create an empty commit.

---

## Acceptance criteria

- [x] 10 new files exist, all listed in the File Structure table.
- [x] `npm run lint`, `tsc --noEmit`, `npm run test`, `npm run build` all pass.
- [x] 15 new `PageSkeleton` tests pass.
- [x] No existing files are modified (including `components/ui/skeleton.tsx`).
- [x] 5 commits total (one per task 1-5). Task 6 adds 0 or 1 commit depending on formatter output.

## Rollback

If the feature needs to be rolled back:

```bash
git rm components/skeletons/page-skeleton.tsx \
       components/skeletons/__tests__/page-skeleton.test.tsx \
       app/styles/\[slug\]/showcase/loading.tsx \
       app/templates/\[slug\]/loading.tsx \
       app/blog/loading.tsx \
       app/blog/\[slug\]/loading.tsx \
       app/changelog/loading.tsx \
       app/compare/loading.tsx \
       app/analyze/loading.tsx \
       app/prompts/loading.tsx
rmdir components/skeletons/__tests__ components/skeletons
git commit -m "revert: remove loading skeletons"
```

No other files are touched — rollback is localized.
