# StyleKit tooling development — 2026-09-30

This batch implements the first stage of the [tooling audit](TOOLING_MATURITY_AUDIT_2026-09-30.md). Changes live in this repository and the sibling `../stylekit-skill` repository. No npm package, MCP Registry entry, or production API has been published by this work.

## Implementation inputs

`stylekit-brief-v1` carries AI rules, philosophy, palette, global CSS, component template code, recipe definitions including parameters/slots/states, tokens, readiness guidance, and merged lint rules. Readiness remains coverage guidance and requires visual and accessibility review.

Available entry points:

- Core: `getImplementationBrief(slug)` from `stylekit-core/discovery`.
- HTTP: `GET /api/styles/{slug}/brief`, including published community styles resolved through the existing delivery layer.
- MCP: `stylekit_get_implementation_brief` (seven tools total).
- CLI: `stylekit brief <slug>` (JSON).
- Skill: `fetch-style.py <slug> --json`; older production deployments fall back to the legacy full endpoint only on HTTP 404.

The brief flattens recipe wrappers into `recipes.button`, `recipes.card`, etc. `provenance.source` identifies bundled/static/community data. `provenance.contentHash` is a deterministic FNV-1a 32-bit identifier over the implementation payload; it is for detecting data drift, not cryptographic verification. Known styles use bundled inputs in Core/MCP, while the HTTP endpoint resolves current server data. MCP preserves complete JSON text for clients without structured-content support.

## Static validation contract

Core, CLI, MCP and the independent Python evaluator return `pass`, `fail`, or `inconclusive`. `ok` is true only for a conclusive static pass.

- Forbidden utilities and patterns are checked after resolving variants and leading/trailing important modifiers. Opacity modifiers are preserved.
- Bare class lists, JSX/HTML attributes and literals inside helpers are readable. Runtime values, interpolations and escaped literals prevent a conclusive pass; visible forbidden classes still prove a failure.
- Required checks are file scoped. A hover/dark-only utility does not satisfy a default requirement.
- Required classes remain advisory by default for existing callers. Use `strict: true` in Core/MCP or `--component button --strict` in CLI/Python for a component snippet.
- Unknown rules, unreadable source and invalid patterns cannot silently pass.
- Saved briefs contain `stylekit-lint-v1` rules with curated overrides and exemptions. Legacy Python input uses token rules only and reports that limitation.

CLI/Python check results use exit `0` for pass, `1` for rule failures, and `3` for inconclusive results. CLI usage/file errors use exit `1`; Python usage/fetch errors use `2`. CLI lint JSON is written to stdout for completed checks, including failed/inconclusive checks; usage errors use stderr.

```bash
node packages/cli/dist/index.js brief neo-brutalist > /tmp/style-spec.json
node packages/cli/dist/index.js lint neo-brutalist 'src/**/*.tsx' --json
node packages/cli/dist/index.js lint --style neo-brutalist --files 'src/**/*.tsx' --format github
python3 ../stylekit-skill/scripts/eval-check.py neo-brutalist button.tsx --spec /tmp/style-spec.json --component button --strict --json
```

CLI file selection supports paths, directories and `*`, `**`, `?` globs. It prunes dependencies, build output and directory symlinks; empty matches fail. It emits escaped GitHub annotations. The composite action now invokes the actual `stylekit-cli` package and passes inputs through quoted environment variables. Its default version needs the new CLI release before public use.

## Data and packaging repairs

- Corrected all 13 previously observed forbidden-utility occurrences in the 444 default button/card/input recipes, using existing tokens without relaxing lint rules. Other variants, parameters, states and component templates need separate health review.
- Fixed generated Tailwind JavaScript so hyphenated keys remain quoted and executable.
- Replaced obsolete export footer domains with the canonical StyleKit host. The JavaScript preset is a legacy Tailwind config artifact; it does not become a Tailwind v4 CSS theme.
- Reduced emitted Core syntax while keeping identifier names readable. Package size budgets remain unchanged.
- Declared Zod as a Core dependency because published declarations refer to its types.
- Publication checks now query the exact version independently of `latest`/`beta` tags and compare SHA-256 digests of built files plus runtime manifest fields. Network failures are inconclusive; missing versions are pending releases. Small runtime changes are no longer hidden by a size tolerance.

## Independent skill repairs

Search now matches slug/name/description/keywords/tags independently. Text fetch output includes philosophy, CSS, templates and complete recipes. `--json` and `--spec` preserve and reuse generation inputs. Project detection resolves shadcn UI aliases through tsconfig paths, enumerates component files, recognizes `stylekit-core`, and prunes generated directories before scanning CSS.

`verify-spec.py` uses the same parser and rules as the evaluator, reports template/rule drift, and preserves incomplete catalogue coverage as inconclusive. It no longer exempts arbitrary small elements from forbidden checks. Benchmark fixture mode uses unmodified templates, labels its results as synthetic, checks both arms' exit codes, and gives both model arms the target style when `--llm` is explicitly invoked. No paid model experiment was run.

CI runs deterministic script tests and shared lint fixtures on pushes/PRs. Live API checks are an explicit workflow-dispatch integration job. The fixture JSON is checked into both repositories; when changing the lint contract, update both copies. Main-repository tests also verify those fixture rules against the canonical catalogue. The developer package gate compares all 148 built briefs against source data to catch bundling drift.

## Release candidates

Local manifests are prepared for Core `1.0.0-beta.5`, CLI `0.2.0`, MCP `0.3.0`. Validate and publish these artifacts through the existing release workflows, deploy the API, and update the skill repository before expecting public installs to expose the new features. The action must run after CLI publication.

## Verification

- `pnpm run lint`: passed, 0 errors and 29 existing warnings. An initial ESLint process crashed; the completed rerun passed after fixing the new test's reserved variable name.
- `npx tsc --noEmit`: passed.
- `pnpm run test`: 272 files passed; 7,866 tests passed, 1 skipped. Existing browser-test resource requests emitted network/teardown messages without failing the suite. The existing research HTML draft's diagonal arrow was replaced with ASCII to satisfy the repository's Unicode gate.
- `pnpm run build`: passed, including the new dynamic brief route.
- `pnpm run test:developer-packages`: Core build/typecheck, CLI and MCP builds and actual smoke calls, package size checks and all 148 source/bundle brief comparisons passed.
- Final unpacked sizes: Core 9.60 MB, CLI 4.94 MB, MCP 4.44 MB. All remain within the original budgets (12/6/6 MB).
- Isolated tarball consumer: Core ESM/CJS exports and strict TypeScript declarations, CLI brief/lint, and seven MCP tools over stdio passed. Artifacts/logs: `/tmp/stylekit-development-consumer-UAu8U1`.
- Local production HTTP: Neo-Brutalist and Glassmorphism briefs returned 200 with the same content identifiers as Core; an unknown style returned 404. Python accepted the saved HTTP brief and reported both token and curated rule sources.
- Independent skill: 9 deterministic tests passed, including 15 shared lint cases; `quick_validate.py` passed. Live search found the exact slug and fetched real recipe/template content. Synthetic fixture regression scored 4/4 reference templates and 0/4 generic fixtures; this is not a real-model quality measurement.
- `pnpm run check:published`: correctly reports all three candidate versions as pending (exit 1). Core beta.4 exists under `beta` while `latest` remains beta.3. No publication occurred.

Detailed execution logs are under `/tmp/stylekit-development-*.log` and `/tmp/stylekit-skill-*.log`. Full browser E2E, visual quality experiments and fresh shadcn registry installs were not part of this batch.
