# Translations Split Design

**Date:** 2026-04-18
**Status:** Approved (pending implementation plan)
**Scope:** A3 subtask — split the 2913-line `lib/i18n/translations.ts` into a directory of three files, one per language plus a barrel.

## Problem

`lib/i18n/translations.ts` is 2913 lines: a `const en = { ... }` block, a
`const zh = { ...en, ... }` block (zh inherits via spread), a `translations`
export, and TypeScript compile-time parity guards. The file is:

- Hard to diff in reviews (any zh fix re-renders a giant file)
- Slow to open and navigate in editors
- Merge-conflict-prone when two people edit different languages

There is no functional defect — only cognitive load.

## Goals

- Split into `lib/i18n/translations/{index,en,zh}.ts` — three files, each
  with a single purpose.
- Zero behavior change: `import { translations } from "@/lib/i18n/translations"`
  and `import type { Locale } from "./translations"` keep working identically.
- Preserve the compile-time parity guard so missing translations still fail
  type-check.
- Existing test `lib/i18n/__tests__/translations.test.ts` passes unchanged.
- Delete the old `lib/i18n/translations.ts` file to avoid ambiguity.

## Non-Goals

- Reorganizing keys by namespace, feature, or page.
- Renaming keys.
- Changing the `translations.en / translations.zh` API shape.
- Fixing untranslated strings (that is a separate editorial task).
- Moving `Locale` type to a different module.

## Design

### New files

**`lib/i18n/translations/en.ts`**

```ts
export const en = {
  // lines 4..1411 of the old file, verbatim
  "nav.styles": "Styles",
  // ...
} as const;
```

**`lib/i18n/translations/zh.ts`**

```ts
import { en } from "./en";

export const zh: { [K in keyof typeof en]: string } = {
  ...en,
  // lines 1416..2886 of the old file, verbatim
  "nav.styles": "风格库",
  // ...
} as const;
```

**`lib/i18n/translations/index.ts`**

```ts
import { en } from "./en";
import { zh } from "./zh";

export type Locale = "zh" | "en";

export { en, zh };

export const translations = {
  zh,
  en,
} as const;

export type TranslationKey = keyof typeof translations.zh;

type MissingTranslationKeysInEn = Exclude<
  keyof typeof translations.zh,
  keyof typeof translations.en
>;
type MissingTranslationKeysInZh = Exclude<
  keyof typeof translations.en,
  keyof typeof translations.zh
>;
type TranslationKeyParity = [MissingTranslationKeysInEn, MissingTranslationKeysInZh] extends [
  never,
  never,
]
  ? true
  : false;
type Assert<T extends true> = T;

// Compile-time guard: zh/en translation key sets must remain identical.
export type TranslationKeyParityCheck = Assert<TranslationKeyParity>;
```

### File to delete

`lib/i18n/translations.ts` (2913 lines). Node's module resolution will pick
up `lib/i18n/translations/index.ts` for the same import specifier.

### Import specifier behavior

| Import | Old resolution | New resolution |
|---|---|---|
| `from "@/lib/i18n/translations"` | `lib/i18n/translations.ts` | `lib/i18n/translations/index.ts` |
| `from "./translations"` (inside `lib/i18n/`) | `lib/i18n/translations.ts` | `lib/i18n/translations/index.ts` |
| `from "@/lib/i18n/translations/en"` | did not exist | `lib/i18n/translations/en.ts` |

No consumer needs to update.

## Extraction mechanism

Mechanical line-range extraction, no hand editing of thousands of lines:

1. Read line 3 header `const en = {` → rewrite to `export const en = {` in
   `en.ts`.
2. Copy verbatim lines 4..1411 (en entries) into `en.ts`.
3. Copy line 1412 closer `} as const;` into `en.ts`.
4. Read line 1414 header `const zh: { [K in keyof typeof en]: string } = {`
   → rewrite to `import { en } from "./en";\n\nexport const zh: { [K in keyof typeof en]: string } = {` in `zh.ts`.
5. Copy verbatim line 1415 (`  ...en,`) into `zh.ts`.
6. Copy verbatim lines 1416..2886 (zh overrides) into `zh.ts`.
7. Copy line 2887 closer `} as const;` into `zh.ts`.
8. Hand-write `index.ts` from the design snippet above.
9. Delete `lib/i18n/translations.ts`.

Because the extraction is line-range copy, no keys can be lost or corrupted as
long as step 1..7 are literal byte copies plus fixed header/footer rewrites.

## Testing

Existing `lib/i18n/__tests__/translations.test.ts` is the regression safety
net. It asserts `translations.en / translations.zh` structure. Run it before
and after. If the test file references `Locale` type, that import still
resolves.

Compile-time parity guard `TranslationKeyParityCheck` must still type-check.
If any key disappears or is renamed, `tsc` will fail with a clear error.

## Verification

```
pnpm lint
pnpm exec tsc --noEmit
pnpm test
pnpm build         # best-effort, baseline build failures are not regressions
```

Target:
- `tsc` error count ≤ baseline (35).
- `vitest` failures count ≤ baseline (34).
- Test `translations.test.ts` still passes.

## Rollback

```
git rm -r lib/i18n/translations
git checkout HEAD~1 -- lib/i18n/translations.ts
git commit -m "revert: un-split translations"
```

Single commit revert, one file restored.

## Open questions

None — Darling approved the by-language split (Option ①).

- Granularity: `en.ts` + `zh.ts` + `index.ts`
- Keys untouched
- API surface unchanged
- Old file deleted
