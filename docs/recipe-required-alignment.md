# Recipe and required-contract alignment

Reviewed 2026-10-25 on `dev` in `D:/stylekit-preview`.

## Decision

Recipes are the authority for component utility values. `required` is the
minimum contract common to all supported variants and parameter choices, not a
copy of the primary variant. A primary glass button can use `bg-white/25` while
the outline variant uses `bg-transparent`; neither background belongs in their
shared required contract. The shared `rounded-2xl` and backdrop treatment do.
Editorial buttons use the recipe's `font-sans`, independently of serif headings.

Preserve existing requirements when every rendered configuration supplies them.
Replace a drifting value only with an unambiguous utility of the same family
that every configuration supplies. Remove requirements belonging to optional
variants, sizes or interactions, and record the reason for each removal. Do not
invent new visual classes to make the checker pass. Empty results require review.

AI prompts read `StyleTokens.required`; strict lint historically preferred a
second curated copy for 15 styles. Both copies now follow the same contract and
CI checks their equality. Curated forbidden rules retain their own provenance.

## Corrected measurement

The earlier metric rendered the first variant, default parameters and no state.
It treated classes stored in `recipe.states.hover/focus` as absent even when
they were authored. `shopify-clean` already had a green focus ring and
`neo-brutalist` already had hover displacement. Removing those requirements on
that evidence would discard working interaction intent.

Default exports therefore include self-gated interaction CSS from the recipe.
Unprefixed state simulation classes such as `opacity-50 cursor-not-allowed`
remain opt-in. The checker retains the default-render metric and additionally
enforces required rules for every variant, parameter combination and state.
Missing required classes now fail CI alongside forbidden violations.

The baseline on this `dev` checkout after applying the four prerequisite
recipe/linter commits was 269/447 canonical pairs missing required classes and
0 forbidden violations across 14,522 renders. The user's 268/447 measurement
came from the older workspace; the `dev` catalog includes newer token data.

## Feature evidence ledger

| ID / lifecycle | Evidence and decision | Delivery / coverage / history | Acceptance and limits |
| --- | --- | --- | --- |
| REQ-01 / recipe exports | `renderer.ts`, actual `shopify-clean` and `neo-brutalist` states demonstrate omitted interaction CSS. Include self-gated classes in normal exports; retain explicit state simulation. | Implemented / covered for static exports / backfilled | Five renderer regressions cover default focus/hover output, no unconditional disabled styling, relational variants, explicit states, deduplication and interactive=false. No new claim of visual or accessibility conformance. |
| REQ-02 / AI and strict lint contracts | User-reported contradictions; `enhanced-rules.ts` reads tokens while `mergeRulesFromParts` prefers curated arrays. Align both using recipe invariants. | Implemented / covered for class contracts / backfilled | 447 nonempty contracts, source equality, same-family replacement, variant and size coverage, dry-run and zero-change repeat, unrelated source preserved. |
| REQ-03 / CI regression detection | Existing `check:recipe-lint` only reports required drift. Promote full-surface strict checks to failures and retain canonical counts. | Implemented locally / covered for static checks / backfilled | 21,408 renders pass required and forbidden checks. CI executes the same command; remote CI has not run for this uncommitted change. |

Primary evidence is the current repository's consumer and renderer source.
Independent evidence is the user's measured failure plus reproducible catalog
renders. No upstream component implementation is copied. This task does not
deploy, publish packages, or claim real-model generation quality.

## Reproduction and review

The alignment tool defaults to a dry run; `--write` explicitly applies the plan.
Its JSON report records each component's old and proposed contract, replacement
and removal decisions, and unresolved review items. Text-span edits preserve
unrelated token fields and curated rules. Review the per-style report before
applying a future migration; CI itself never rewrites contracts.

The [per-style audit](recipe-required-review.json) records the resulting
contracts, 415 replacements and 397 removals: 205 optional utilities, 184 absent
utilities and 8 incomplete placeholders. All 149 styles were reviewed in two
alphabetical groups. [Manual decisions](recipe-required-manual-review.json)
cover 51 components, including focus feedback already authored in the recipes,
the Zen Garden and Ink Wash card surfaces, and sparse card contracts. These are
explicit authoring decisions; the generic script does not invent new required
intent or permit empty results.

`holographic` had incomplete placeholders such as `bg-white/` and
`focus:shadow-[0_0_`. The tool now rejects those as replacement inputs rather
than trusting the utility-family matcher to interpret them.

`notion-style` uses a focus bottom border instead of the old required ring.
Its bottom-border width and color are explicitly required. Other inputs that
suppressed the native outline without requiring their authored focus feedback
received the same review. Existing effects are preserved; their visual contrast
has not been certified by this static audit.

Removing variant-specific `text-white` from dark-mode required rules exposed a
previous contradiction: both forbidden sources banned it while the required
exemption globally allowed it. The recipe and button color tokens both use
white text, so those text bans were removed explicitly; bright background bans
remain. Only dark-mode's prompt bullet baseline was refreshed for that removal.
The shared serialized lint fixture was refreshed while preserving its cases.

## Local verification

- `pnpm run check:recipe-lint`: 21,408 renders, zero forbidden violations,
  zero required violations; canonical gap 0/447.
- `pnpm run align:recipe-required --report .tmp/recipe-required-idempotence.json`:
  zero replacements, removals, changed pairs or changed files on repeat.
- `pnpm run lint`: exit 0, no errors, 33 warnings in the workspace.
- `npx tsc --noEmit`: passed.
- `pnpm run test`: 303 files passed; 8,068 tests passed and 1 skipped, including
  write-rollback and stale-source preflight regressions.
- `pnpm --config.script-shell='C:\Program Files\Git\bin\bash.exe' run build`:
  passed. The original build script uses `rm -rf .next`, so the ordinary Windows
  shell could not launch it; the same script succeeded through local Git Bash.
  The resolved cache path was checked before that cleanup.
