# Style prompt copy analytics

Reviewed: 2026-10-29. Baseline: dev at bfa7da90.

The owner needs to compare actual prompt use across every style. Existing
`code_copy` combines prompts, CSS, components and installation commands, and
the content report limits its combined ranking to twelve styles. Some legacy
copy fallbacks reported success without checking the clipboard result. Those
events cannot establish an accurate historical prompt-copy total.

## Decisions and evidence

- Adapt the existing internal event ingestion, catalog validation, rate limits,
  admin authorization and date ranges. Add `prompt_copy` with bounded style,
  type, source and locale metadata. Do not collect prompt content or project text.
- Count only a resolved clipboard write. Reuse `useClipboard` and its explicit
  manual-copy feedback. The Clipboard API specifies that the promise resolves
  once the clipboard is updated; rejection must not count as success:
  https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
- Keep generic `code_copy` separate. Do not dual-emit it for prompt copies.
  Retain the project brief's existing domain event but avoid counting the same
  copy twice in the implementation-intent aggregate.
- Cover the detail hero, implementation documents, examples, prompt pairs,
  project briefs and recipe prompts. A recipe combines visual and layout
  styles; attribute its one copy to its primary visual style once. Include
  approved community styles, with slug labels as a fallback when catalog
  metadata is temporarily unavailable. Export all report rows despite search.
- Aggregate the new event using a service-role-only SQL function, a half-open
  time window, production environment and non-bot filters. Reuse the population
  rules in migrations 022/031. Display all styles, including zero counts, rather
  than using the existing twelve-style popularity ranking.
- Follow installed Next.js 16.3.1 route-handler guidance at
  `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md`.
  Authenticate before accessing storage; missing migrations are an explicit
  unavailable state, never a zero-count report.
- Successful repeated copies are separate actions; distinct non-null tab session
  identifiers describe participating sessions, not people or installs. Browser
  blocking and network failures can undercount. Do not infer manual copies or
  historical success from old `code_copy` records.

## Feature evidence ledger

| ID | Parent / lifecycle | Outcome and decision | Delivery | Coverage | History | Acceptance and remaining gaps |
| --- | --- | --- | --- | --- | --- | --- |
| PC-01 | Prompt use / successful clipboard action | Attribute each successful style prompt copy to bounded type, source and locale; keep failures and downloads out | implemented | partial | backfilled | Component and ingestion tests; Ego browser actual clipboard success on hero and design spec, denied clipboard with manual-copy feedback, download not counted, no duplicate code event; production collection not yet verified |
| PC-02 | Analytics / persistence and aggregation | Validate style identity and aggregate all styles within selected range; admin-only reporting | implemented | partial | none | Ingestion/authorization/missing-migration tests; migration executed twice in isolated PGlite PostgreSQL with time bounds, environment/bot exclusions, 17 styles, null/distinct sessions, seven types, brief intent deduplication, anon denied and service role allowed; production migration and storage acceptance pending |
| PC-03 | Analytics / owner analysis | Search and compare all styles, including zero counts, and export the selected range as CSV | implemented | partial | none | UI tests and Ego browser fixture checks: range switch, search, error states, light desktop, dark mobile (390px document, horizontally scrolling table), 150 CSV rows including community and zero counts; live report awaits production migration |

Historical gap: PC-01's inherited `code_copy` semantics and unchecked legacy
fallbacks were not sufficient for prompt-specific analysis. The new event
backfills the design evidence; it does not reconstruct missing historical data.

## Release and verification boundary

The owner subsequently approved production release and admin performance work
on 2026-10-29. Apply the new migration through the normal release workflow before
enabling the production report. Retain source/build and function-definition
backups; do not rewrite historical analytics rows. Browser test sends must be
intercepted or explicitly excluded; a test build is not proof of live collection.

Local evidence artifacts are outside the repository at
`C:/Users/34758/.codex/scratch/stylekit-prompt-qa-20261029/`:
`migration-result.json`, `browser-result.json`, report screenshots, downloaded
CSV, test/lint/type/build logs. Browser report data is synthetic, and analytics
sends were intercepted. Clipboard writes themselves were real for the success
checks; the failure case deliberately rejected access.

The Windows `pnpm run build` script invokes Unix `rm` and fails before Next.js
runs. Build verification uses `pnpm exec next build --webpack`; no package script
or unrelated build configuration was changed. A default-concurrency repeat of
the full suite exhausted V8 memory, so final verification limits Vitest workers.

Final local verification: `pnpm run lint` returned zero errors and 33 existing
warnings; `pnpm run test --maxWorkers=4` passed 314 test files (8146 tests, one
skipped); `pnpm exec next build --webpack` completed successfully. Type checking
and `pnpm run security:secrets` passed. The temporary browser space and local
preview server were closed after verification.

Production was enabled on 2026-10-29 using merged-main `fa0ccb85` and build
`ssunQpN4RV__GDGpDLelt`. Migration 043 was applied after backing up the existing
function definitions; both indexes were built concurrently and verified valid.
The new RPC grants EXECUTE only to service_role, not anon/authenticated. Live
authenticated prompt/content/overview APIs return 200 with private,no-store.
At verification the prompt report contained six received copy events across
six styles. No historical analytics rows or synthetic copy records were created
to produce that result. CI passed for the deployed source; post-deploy browser
interaction was not repeated because the original browser task space expired.

The task's temporary scripts and receipts were moved into the repository's
ignored `.tmp/releases/prompt-analytics-20261029/` directory. Reusable deployment
and canary helpers are maintained in `tools/scripts/release/`.
