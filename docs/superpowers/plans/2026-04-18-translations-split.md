# Translations Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split `lib/i18n/translations.ts` (2913 lines) into
`lib/i18n/translations/{index,en,zh}.ts` without changing any key, value, or
public API.

**Architecture:** Mechanical line-range extraction. `en.ts` holds `const en`
verbatim. `zh.ts` imports `en` and holds the override map. `index.ts` holds
the language-agnostic surface (Locale type, translations object, parity
guard). The old flat file is deleted.

**Tech Stack:** TypeScript strict. No runtime behavior change. Vitest for
regression proof.

**Spec:** `docs/superpowers/specs/2026-04-18-translations-split-design.md`

---

## File Structure

| Path | Action | Purpose |
|------|--------|---------|
| `lib/i18n/translations/en.ts` | Create | Exports `en` literal object (~1408 keys) |
| `lib/i18n/translations/zh.ts` | Create | Imports `en`, exports `zh` override map |
| `lib/i18n/translations/index.ts` | Create | Exports `Locale`, `translations`, `TranslationKey`, parity guard |
| `lib/i18n/translations.ts` | Delete | Replaced by the directory |

**Not touched:** every consumer of `translations` anywhere else in the repo
(133 files using `useI18n` etc.). `lib/i18n/routing.ts`, `lib/i18n/metadata.ts`,
`lib/i18n/locale-copy.ts`, `lib/i18n/request.ts`, and
`lib/i18n/__tests__/translations.test.ts` all keep their current imports.

---

## Task 1: Baseline capture

Before touching anything, record the baseline so we can diff against it later.

- [ ] **Step 1.1: Capture current tsc error count**

```bash
npx --no-install tsc --noEmit 2>&1 | grep -c "error TS" > /tmp/a3-tsc-before.txt
cat /tmp/a3-tsc-before.txt
```

Record the number. This is the ceiling for post-refactor error count.

- [ ] **Step 1.2: Capture current vitest pass/fail counts**

```bash
npx --no-install vitest run --config tests/vitest.config.ts --reporter=dot 2>&1 | grep -E "Test Files|Tests\s+" > /tmp/a3-vitest-before.txt
cat /tmp/a3-vitest-before.txt
```

Record "N failed / M passed" on both the file and test lines.

- [ ] **Step 1.3: Confirm translations test exists and passes**

```bash
npx --no-install vitest run --config tests/vitest.config.ts lib/i18n/__tests__/translations.test.ts 2>&1 | tail -5
```

Expected: PASS. If this file fails at baseline, stop and escalate — the
refactor cannot be validated without it.

---

## Task 2: Extract en.ts

**Files:**
- Create: `lib/i18n/translations/en.ts`

- [ ] **Step 2.1: Ensure the new directory exists**

```bash
mkdir -p lib/i18n/translations
```

- [ ] **Step 2.2: Build en.ts with exact line ranges**

Use `sed -n` for line-range extraction (byte-exact, never rewrites quotes):

```bash
{
  echo "export const en = {"
  sed -n '4,1411p' lib/i18n/translations.ts
  echo "} as const;"
} > lib/i18n/translations/en.ts
```

- [ ] **Step 2.3: Sanity check en.ts**

```bash
head -3 lib/i18n/translations/en.ts
tail -3 lib/i18n/translations/en.ts
wc -l lib/i18n/translations/en.ts
```

Expected: first line `export const en = {`, last line `} as const;`, line
count = `1411 - 4 + 1 + 2 = 1410`.

Count the top-level keys (should equal 1408):

```bash
grep -cE '^    "[^"]+":' lib/i18n/translations/en.ts
```

Record the number. If it is not exactly 1408, stop and inspect.

---

## Task 3: Extract zh.ts

**Files:**
- Create: `lib/i18n/translations/zh.ts`

- [ ] **Step 3.1: Build zh.ts with exact line ranges**

```bash
{
  echo 'import { en } from "./en";'
  echo ""
  echo "export const zh: { [K in keyof typeof en]: string } = {"
  sed -n '1415,2886p' lib/i18n/translations.ts
  echo "} as const;"
} > lib/i18n/translations/zh.ts
```

Note: line 1415 is `  ...en,` (the existing spread). Keeping it preserves the
behavior that zh inherits un-overridden keys from en.

- [ ] **Step 3.2: Sanity check zh.ts**

```bash
head -5 lib/i18n/translations/zh.ts
tail -3 lib/i18n/translations/zh.ts
wc -l lib/i18n/translations/zh.ts
```

Expected: first three lines are

```
import { en } from "./en";

export const zh: { [K in keyof typeof en]: string } = {
```

Fourth line is `  ...en,`. Last line is `} as const;`.
Line count = `2886 - 1415 + 1 + 4 = 1476`.

Count the override keys (zh lines with a `"key": "value"` pattern, excluding
the spread line):

```bash
grep -cE '^  "[^"]+":' lib/i18n/translations/zh.ts
```

Record the number for later comparison.

---

## Task 4: Write index.ts

**Files:**
- Create: `lib/i18n/translations/index.ts`

- [ ] **Step 4.1: Create index.ts**

Create `lib/i18n/translations/index.ts` with this EXACT content:

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

- [ ] **Step 4.2: Sanity check**

```bash
wc -l lib/i18n/translations/index.ts
```

Expected: 32 lines.

---

## Task 5: Delete the old file and verify

- [ ] **Step 5.1: Delete lib/i18n/translations.ts**

```bash
git rm lib/i18n/translations.ts
```

- [ ] **Step 5.2: Run tsc and compare against baseline**

```bash
npx --no-install tsc --noEmit 2>&1 > /tmp/a3-tsc-after.log
grep -c "error TS" /tmp/a3-tsc-after.log
```

Expected: the count equals `/tmp/a3-tsc-before.txt`. If higher, inspect:

```bash
grep -E "lib/i18n/translations" /tmp/a3-tsc-after.log || echo "no errors in our scope"
```

If errors reference our new files, fix them before continuing. If they
reference the deleted `lib/i18n/translations.ts`, TypeScript cache is stale —
rerun tsc after a fresh `pnpm install` or once more plain.

If the new count is LOWER than baseline, that is also fine — the old file may
have had errors that are now gone.

- [ ] **Step 5.3: Run full test suite**

```bash
npx --no-install vitest run --config tests/vitest.config.ts --reporter=dot 2>&1 | grep -E "Test Files|Tests\s+"
```

Expected: failed counts identical to `/tmp/a3-vitest-before.txt`. The passed
count should also be unchanged (we did not add or remove any test).

- [ ] **Step 5.4: Specifically verify the translations test**

```bash
npx --no-install vitest run --config tests/vitest.config.ts lib/i18n/__tests__/translations.test.ts 2>&1 | tail -5
```

Expected: PASS, same number of tests as before.

- [ ] **Step 5.5: Lint the new files**

```bash
npx --no-install eslint lib/i18n/translations/ 2>&1 | tail -10
```

Expected: 0 errors. Warnings about ignored files are acceptable.

- [ ] **Step 5.6: Commit**

```bash
git add lib/i18n/translations/
git status  # confirm old translations.ts is shown as deleted and staged
git commit -m "refactor(i18n): split translations into en/zh/index modules"
git log -1 --stat
```

---

## Acceptance criteria

- [x] Three new files: `lib/i18n/translations/{en,zh,index}.ts`.
- [x] Old file `lib/i18n/translations.ts` deleted.
- [x] tsc error count ≤ baseline (35).
- [x] vitest failed count ≤ baseline (34).
- [x] `lib/i18n/__tests__/translations.test.ts` passes.
- [x] Compile-time parity guard `TranslationKeyParityCheck` still type-checks.
- [x] `en.ts` has exactly 1408 keys.
- [x] Zero consumer files modified.

## Rollback

```bash
git revert HEAD
```

Or, if the commit is not yet pushed:

```bash
git reset --hard HEAD~1
```

No other file referenced our refactor; revert is localized.
