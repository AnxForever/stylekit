# Tooling implementation and evidence ledger — 2026-10-20

This work follows the read-only audit of the current checkout. It improves the
existing public tools without publishing packages or deploying the website.
Unrelated work in this checkout is outside this change.

## Established baseline

- MCP exposes nine tools; a real stdio client successfully listed and called them.
- Recipe definitions contain variants, parameters and slots, but the rendering
  adapters only accepted a style and component and selected the first variant.
- Complete bundled brief JSON is approximately 28 KB at the median and 60 KB at
  the maximum. The MCP tool accepted only a slug.
- Twelve of 444 bundled button/card/input templates trigger the project's own
  forbidden-rule checks. This is a contract discrepancy count, not a visual
  defect count. Synthwave explicitly requires white/black active-state flashes
  that its unscoped token rules reject.
- Figma exports hard-code white surfaces and generic typography; legacy
  Tailwind preset generation ignores its supplied tokens.
- The CLI's documented `add` command prints a shadcn command. It does not inspect
  a target project or perform an installation.
- Nine of 148 styles have curated readiness profiles. The remaining profiles
  are fallback guidance; no style has a complete dark-mode readiness contract.
- The Skill's four-case fixture benchmark is a synthetic lint regression check.
  It does not establish whole-page generation quality or browser usability.

Baseline checks: 7,959 unit tests passed, one skipped; TypeScript and production
build passed. Lint excluding nested `.worktrees` reported zero errors and 29
warnings. These results describe the baseline, not the changes below.

## Feature inventory and decisions

These rows began as inherited features without sufficient feature-specific
outcome evidence. Their historical gaps are retained as backfilled; partial
coverage below identifies remaining operational or outcome evidence.

| ID | User outcome / lifecycle | Delivery | Evidence and decision | Coverage / history | Required acceptance |
| --- | --- | --- | --- | --- | --- |
| TOOL-01 | Official examples and generated code receive consistent style checks | implemented | Scoped lint-v2 exceptions preserve approved design intent; TS and Python reject mixed contracts and ignore pseudo JSX in strings/comments/regex | partial / backfilled | Forbidden checks pass for 444 official templates and 444 default recipes; dynamic syntax remains inconclusive; required checks remain file scoped and advisory by default |
| TOOL-02 | Exported design values match the selected style | implemented | Figma, legacy preset, v4 theme and shadcn use actual tokens and expose unsupported/fallback values; semantic spacing is namespaced | partial / backfilled | Actual v4 compilation and browser replay; real shadcn v4 install; Figma plugin import and broad visual quality remain unverified |
| TOOL-03 | An agent can request the intended recipe variant, size and content | implemented | Shared rendering validates definitions and caller inputs, escapes text/attributes, and distinguishes trusted code slots | covered / backfilled | Static/live/bundled regression; real CLI/MCP and tarball calls; malformed defaults, reserved keys, unsafe text and icon inputs |
| TOOL-04 | An agent retrieves only implementation context relevant to its task | implemented | Sections and component/recipe filters preserve full-contract provenance and identify partial outputs without mutating cached data | covered / backfilled | Full/partial schemas, invalid selections, nested mutation/cache tests, CLI/MCP JSON and installed-consumer checks |
| TOOL-05 | A developer can inspect a project and explicitly apply a theme | implemented | Read-only doctor/plan; explicit apply; Tailwind v4 and tsconfig gates; file fingerprints; fixed executable/argv; observed post-install changes | partial / backfilled | Fixture and real child-process assertions; direct shadcn install proof; native Windows and production URL application remain unverified |
| TOOL-06 | Tool regressions and real generation outcomes can be assessed separately | implemented | Three scenario contracts, recorded agent/browser/visual evidence and isolated TS/CSS checks; unsafe CSS config/plugin paths skip compilation | partial / backfilled | Three assisted agent-session pages built and replayed locally; independent model repetitions and full Skill A/B evaluation remain unverified |

## Primary guidance and limits

- [MCP tools contract](https://modelcontextprotocol.io/specification/2025-11-25/server/tools):
  input/output schemas, structured results and actionable tool errors. A projected
  result must advertise its actual schema; JSON text remains available to clients.
- [shadcn MCP and CLI workflow](https://ui.shadcn.com/docs/mcp): reuse the existing
  registry/install boundary instead of implementing a second component installer.
- [Tailwind CSS theme variables](https://tailwindcss.com/docs/theme): use CSS
  `@theme` output for v4; label retained JavaScript config artifacts explicitly.

Static style checks do not certify contrast, interaction behavior, visual quality
or model performance. Readiness coverage remains guidance; expanding its curated
coverage requires individual visual and interaction review.

## Change verification

The final root unit run passed **8,006 tests in 296 files**, with one skipped.
Root TypeScript and lint passed; lint reports 29 existing warnings. Core, CLI and
MCP builds, package tests, source/bundle brief parity and size checks passed.
The CLI's project/installer suite covers 91 assertions. Python Skill validation
ran 70 tests with two skipped; its local release-manifest hashes were regenerated
and verified without publishing a release.

`pnpm run test:developer-consumer` installs local tarballs outside the workspace.
Its existing 24 catalog/protocol checks and the five new tooling checks passed.
Probe children use bundled data and explicitly propagate the network guard into
MCP's filtered child environment; localhost fault fixtures remain available.
This avoids comparing a changing production catalog with a fixed bundle.
The final fresh-consumer install used pnpm offline cache after an online
registry request timed out; all 29 installed-package probes passed.

The three locally generated candidates live in the ignored directory
`.tmp/tooling-evaluation-20261020/`. Each contains its task, exact Core call
record, dependency manifest, source, compiled Tailwind CSS, desktop/mobile
screenshots and structured browser evidence. They cover invoice approvals,
a marketing/signup flow and preservation of settings behavior during a redesign.
The browser run used system Chrome at 1280px and 390px, exercised loading/error/
retry/success and keyboard controls, and emulated reduced motion. All three
flows passed without page or console errors or horizontal overflow. Visual
review found and corrected a new spacing namespace collision; a compiler
regression now protects default `max-w-sm` and `max-w-lg` behavior.

Reproduce source checks and evidence reports from the repository root:

```bash
pnpm run lint
pnpm exec tsc --noEmit
pnpm run test --maxWorkers=2
pnpm run test:developer-packages
pnpm run test:developer-consumer
pnpm run evaluate:tool-workflows --scope all --candidate-dir .tmp/tooling-evaluation-20261020 --output .tmp/tooling-evaluation-20261020/final-evaluation.json
pnpm run build
```

The production build passed. The final aggregate evaluation contains **40
passing checks, zero failures and zero inconclusive checks**, covering the
deterministic toolchain and the three recorded candidates. Its full evidence
is `.tmp/tooling-evaluation-20261020/final-evaluation.json`.

A fresh local production-server replay also verified the actual Synthwave
Figma export dialog, visible diagnostic notes, an exact downloaded JSON file
with background `#0a0a1a`, and a valid v4 glassmorphism registry color. The
exporter's module is loaded only after the dialog is opened. The browser
blocked external requests and fulfilled non-read requests locally. Evidence
is in `.tmp/tooling-evaluation-20261020/product-export/`; temporary preview
servers were stopped afterward.

The catalog gate now has zero active global waivers: the former 13 waived
conflict tuples are represented by scoped portable rules instead. Both
templates and default recipes have zero forbidden-rule conflicts. Required
class findings remain advisory and are reported separately.

All 15 pre-existing dirty/untracked files were verified against their initial
SHA-256 values. Secret scanning and diff whitespace checks passed. Local
artifacts and source changes are not an npm publication or deployment.


Pre-push review uses a detached checkout containing only this change, without
any of the 15 pre-existing dirty or untracked files. Root tests resolve the
Core discovery source explicitly so a fresh CI checkout does not depend on
unbuilt workspace distribution files.

Review regressions cover conditional utility evidence, approved Magic Circle
role markers, control-statement regex literals, modern color-function alpha,
and Markdown fences embedded in recipe text. Candidate validation rejects
manifest symlinks, resolved `.env` targets, unlisted or external TypeScript
sources, and undeclared explicit type dependencies before reporting a pass.

## Compatibility and release boundary

The current registry endpoint source targets **Tailwind v4**. A real
`shadcn@4.16.2` install consumed complete CSS HSL colors correctly; the same
item under Tailwind 3.4.17 / shadcn 3.3.0 caused nested HSL wrappers. Legacy
v3 consumers should use the Style Pack's HSL-channel variables and v3 preset.
A separate fixture proved that shadcn 4.16.2 still requires `tsconfig.json`
for a theme-only item; the CLI and MCP prerequisite guidance follows that
observed behavior. JSONC syntax is delegated to shadcn's parser.

The public version catalog has not been changed. New CLI/MCP options require
a rebuilt local package and coordinated package/website releases before npm
or hosted-registry consumers receive them. The sibling Skill repository has
matching lint-v2 consumption changes and updated integrity hashes. Its payload
version is 0.8.1 to satisfy the repository version gate; no release tag or
package publication is part of this change.

Windows executable resolution has fixture coverage but was not run on native
Windows. Static checks, these three assisted candidates, and recorded visual
review do not establish general model quality, a WCAG certification or real
backend correctness. Curated readiness remains nine of 148 profiles.

Generic required-class sets are not a complete parameter-aware conformance
model. For example, a large button recipe can intentionally use a different
font size from the generic default button requirement. Required findings remain
advisory unless strict mode is requested; strict checks on such variants need
manual interpretation. The completed forbidden-rule checks do not establish
that every variant passes every required-class check.
