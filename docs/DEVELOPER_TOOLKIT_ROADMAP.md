# Developer Toolkit Long-Term Roadmap

Status: planning baseline

Baseline date: 2026-08-16

Scope: `/developers`, shadcn Registry, `stylekit-core`, CLI, MCP Server, Agent
Skill, and the release/evidence system shared by them

## 1. Outcome

Turn every capability advertised on `/zh/developers` and `/en/developers` into
a delivery channel that is:

1. installable through the command shown to the user;
2. useful in a clean consumer project without a StyleKit checkout;
3. versioned with an explicit compatibility and support policy;
4. verified through repeatable consumer-facing tests;
5. described identically by the website, package READMEs, `SKILL.md`,
   `llms.txt`, and package metadata.

The shared architecture is intentionally simple:

```text
Style Catalog
    |
stylekit-core (catalog contract)
    |
    +-- shadcn Registry (theme delivery)
    +-- CLI (terminal adapter)
    +-- MCP Server (agent tool adapter)
    +-- Agent Skill (agent instructions and workflow)
    |
/developers (discovery, status, docs, verified commands)
```

My Kit, Workspace, paid experience packs, hosted MCP, and component generation
are not prerequisites for this roadmap. They may consume the same contracts
later, but they must not expand the current Developer Toolkit promise silently.

## 2. Product Principles

- **Evidence before wording.** A capability moves to a stronger public state
  only after its consumer-path evidence exists.
- **Published is not supported.** An npm name existing is a distribution fact,
  not proof of support, freshness, or compatibility.
- **Core owns catalog semantics.** CLI and MCP should translate the same Core
  contract instead of reconstructing style data independently.
- **Adapters stay thin.** Delivery channels may format, paginate, validate, and
  transport data; they should not invent a second catalog model.
- **Public output is a contract.** JSON shapes, tool schemas, exit codes,
  registry JSON, and install commands are versioned surfaces.
- **No hidden mutation.** Commands that change a consumer project must be
  explicit and offer a preview or dry-run path.
- **No hidden telemetry.** Any future CLI/MCP usage collection is opt-in and
  documented; initial releases should operate without it.
- **External release actions need owner approval.** This plan can prepare and
  test artifacts, but it does not authorize npm publish, GitHub push, deploy,
  credential changes, or hosted-service creation.

## 3. Support State Model

Every channel must use one of these states:

| State | Meaning | May the page show a public install command? |
|---|---|---|
| `repository-preview` | Current source passes local tests, but the repository version is not a supported public artifact. | Only with an explicit checkout/build command. |
| `public-beta` | A pinned public artifact passes clean-consumer verification; pre-1.0 compatibility may change. | Yes, with version/support label and docs. |
| `supported` | The public artifact passes the declared compatibility matrix and has release/recovery guidance. | Yes. |
| `stable` | Compatibility policy, deprecation window, and operational ownership are established. | Yes. |
| `deprecated` | Artifact remains discoverable but has a migration or replacement path. | Only as a warning, never as the recommended command. |

The website must not use `unpublished` for a package name that exists on npm.
It may say that a specific repository version is not yet released.

## 4. Evidence Baseline

The following was verified from the current workspace and public distribution
channels on 2026-08-16.

| Capability | Repository state | Public state | Evidence | Gap |
|---|---|---|---|---|
| Style Catalog | 146 styles in current Core/CLI output | `/registry.json` and `/api/styles` both returned 146 with HTTP 200 | Live endpoint probes | Count is hand-written in several surfaces and can drift. |
| shadcn Registry | Routes and install verifier exist | Public theme endpoint works | `pnpm run test:style-registry-install` installed `synthwave` into a temporary Tailwind v4 consumer with `shadcn@4.16.2` | One style/version is not a compatibility matrix; Tailwind v3 is documented but not covered by this test. |
| Core Package | `stylekit-core@1.0.0-beta.1`; build/typecheck pass | npm latest is `1.0.0-beta.1` | Package build, typecheck, npm metadata, tarball dry-run | No clean npm-consumer import matrix; build emits a `sideEffects` warning when adapters bundle Core. |
| CLI | Repository is `0.1.1`; local smoke passes | npm latest is `0.1.0`; `npx` list and version work | Local smoke, npm metadata/tarball, public `npx` probe | Page/README say unpublished; published `0.1.0` JSON list is an array while local `0.1.1` uses an envelope, so release/version intent must be explicit. |
| MCP Server | Repository is `0.1.1`; five local read-only tools pass smoke | npm latest is `0.1.0`; public package starts and answers MCP search | Local stdio smoke, npm metadata/tarball, public protocol probe | Page says unpublished; no named-client matrix and no post-publish regression job. |
| Agent Skill | Root `SKILL.md` is present and trackable | GitHub `main` exposes it; installer discovers exactly one `stylekit` skill | `skills add AnxForever/stylekit --list`, remote file probe | Discovery is verified today, but actual clean-project installation and activation are not automated. |
| Product-truth check | Local check passes | Not applicable | `pnpm run check:product-truth` | It did not detect the false “not published to npm” claims, so its current contract is incomplete. |

Current local package sizes also pass their limits:

- Core: 2.01 MB packed / 10.71 MB unpacked;
- CLI: 0.95 MB packed / 5.15 MB unpacked;
- MCP: 0.96 MB packed / 5.16 MB unpacked.

These are baseline observations, not permanent budgets. A release gate should
compare both absolute ceilings and change from the previous release.

## 5. Risk Register

| Risk | Severity | Why it matters | Planned control |
|---|---:|---|---|
| Public truth contradicts npm | P0 | Users may ignore working packages or misunderstand support. | Resolve Decision #2; update all surfaces from one capability status. |
| Patch candidate changes CLI JSON shape | P0 | Automation written for `0.1.0` can break unexpectedly. | Declare output schema; choose an appropriate next version; add compatibility fixtures. |
| Local smoke hides tarball problems | P0 | Workspace links and local files can make an unshippable package look healthy. | Install exact tarballs into temporary consumers before release. |
| Core bundle warning is ignored | P1 | `sideEffects: false` may enable unsafe removal or hide bundling mistakes. | Reproduce in a package consumer and eliminate or intentionally document the warning. |
| Registry claims exceed its matrix | P1 | Tailwind/shadcn changes can break installs despite valid JSON. | Pin supported versions and run scheduled latest-version smoke. |
| Client names are marketing-only | P1 | A stdio server can work while a documented client configuration fails. | Verify exact configs for each named MCP client and Agent Skill target. |
| Duplicated catalog count/status drifts | P1 | “146”, versions, and support labels become stale in multiple files. | Generate or validate them from one manifest. |
| Automated publishing outruns approval | P1 | npm releases are externally visible and difficult to undo. | Separate artifact verification from an owner-approved publish job. |
| Toolkit grows into a second product | P2 | Hosted services and component delivery can delay making current tools reliable. | Enforce phase exit criteria and decision gates. |

## 6. Milestones And Work Breakdown

Milestones are sequential gates, not calendar estimates. Work inside a milestone
may proceed in parallel only when its dependencies and shared contracts are
settled.

### M0 — Restore Product Truth

Goal: every public surface describes today's distribution state accurately.

Tasks:

- `DT-001` Resolve Decision #2: public beta versus unsupported npm snapshot.
- `DT-002` Inventory every CLI/MCP/Core claim in `/developers`, READMEs,
  `SKILL.md`, `llms.txt`, metadata, launch copy, and SEO copy.
- `DT-003` Define a versioned capability-status schema with channel, state,
  repository version, public version, verified command, verification date,
  compatibility summary, and docs URL.
- `DT-004` Correct “unpublished” wording without advertising repository `0.1.1`
  as public until its packed artifact is approved.
- `DT-005` Extend the product-truth check to validate status-dependent phrases,
  versions, install commands, and catalog counts.
- `DT-006` Keep network-free truth checks deterministic; add a separate scheduled
  external probe for npm/GitHub/live endpoints.
- `DT-007` Record the CLI `0.1.0` JSON contract and the proposed successor
  contract before choosing the next release version.

Exit criteria:

- no public file says CLI/MCP package names are absent from npm;
- repository and public versions are displayed as different facts;
- regular CI can detect internal claim drift;
- scheduled/manual external checks can detect distribution drift;
- no package has been published merely to satisfy the plan.

### M1 — Stabilize The Core Package Contract

Goal: make Core the documented, testable boundary used by every adapter.

Tasks:

- `DT-101` List the public root and subpath exports actually used by CLI/MCP.
- `DT-102` Define typed schemas for catalog summaries, style details, tokens,
  recipes, quality signals, pagination, and domain errors.
- `DT-103` Add `getCatalogInfo`/capability metadata so consumers can obtain
  catalog revision and counts without hard-coded copy.
- `DT-104` Add API-surface snapshots that catch accidental export removals and
  output-shape changes.
- `DT-105` Pack Core, install it into clean ESM and CommonJS consumers, compile
  TypeScript, and execute representative queries.
- `DT-106` Run the consumer matrix on supported Node LTS versions; initially
  target Node 18, 20, and 22 while the package declares `>=18`.
- `DT-107` investigate and remove the adapter-build warning caused by the Core
  package's side-effect metadata, or prove and document why it is safe.
- `DT-108` Add deterministic catalog-integrity checks between Core and website
  source data.
- `DT-109` Write a pre-1.0 compatibility policy and a deprecation pattern for
  renamed fields or exports.

Exit criteria:

- a clean consumer needs only the packed Core artifact;
- ESM, CommonJS, types, and all exported subpaths work on the declared matrix;
- CLI and MCP import only documented Core surfaces;
- contract changes fail CI before release.

### M2 — Release-Grade CLI

Goal: make the CLI a predictable public-beta terminal interface.

Tasks:

- `DT-201` Freeze command names, positional arguments, flags, exit codes,
  stdout/stderr rules, and JSON error shape for the first supported beta.
- `DT-202` Version the JSON output contract; retain fixtures for public `0.1.0`
  and the next release.
- `DT-203` Resolve whether `add` prints a command or applies it. Until Decision
  #5 is resolved, keep it non-mutating and say “print install command” clearly.
- `DT-204` Add `--version --json` or an equivalent capability command that
  exposes CLI version, Core/catalog revision, and output schema version.
- `DT-205` Test every command's success, empty result, unknown slug, invalid
  flag, broken pipe, and non-interactive behavior.
- `DT-206` Test the packed tarball through `npx` in a clean directory with no
  monorepo dependencies.
- `DT-207` Verify macOS/Linux shells and Windows execution semantics before
  listing them as supported.
- `DT-208` Add command examples that are executable documentation, not copied
  snippets with untested output.
- `DT-209` Produce a changelog and migration note for the JSON envelope change.
- `DT-210` After owner approval, publish the chosen version and immediately run
  pinned and latest-tag post-publish smoke tests.

Exit criteria:

- `npx stylekit-cli@<version>` works from a clean supported environment;
- human and JSON contracts are documented and fixture-tested;
- the package version and page command match;
- rollback means deprecating a bad version and moving the dist-tag to the last
  verified version, with a user-facing notice.

### M3 — Release-Grade MCP Server

Goal: make MCP a dependable read-only adapter with truthful client support.

Tasks:

- `DT-301` Freeze the five current tool names, input schemas, structured output
  shapes, error semantics, and read-only annotations.
- `DT-302` Expose server, Core/catalog, and capability schema versions through
  initialization metadata or a dedicated read-only capability tool.
- `DT-303` Add contract tests for pagination boundaries, empty results, invalid
  categories/components, unknown slugs, and large responses.
- `DT-304` Spawn the packed and public npm package over stdio for protocol-level
  smoke tests; never test only `dist/` from the workspace.
- `DT-305` Research and verify exact configuration files and startup commands
  for named Claude, Cursor, Windsurf, and Codex clients.
- `DT-306` Separate `verified`, `community-compatible`, and `unverified` clients
  in documentation.
- `DT-307` Validate clean shutdown, client disconnect, stderr logging, and the
  absence of non-protocol stdout noise.
- `DT-308` Add time and response-size budgets for search/detail/token/recipe
  calls, with no network dependency during normal stdio operation.
- `DT-309` After owner approval, publish and run client-independent post-publish
  smoke against the exact version and latest tag.

Exit criteria:

- the public package starts and serves the frozen tools over stdio;
- protocol output stays on stdout and diagnostics stay on stderr;
- every named supported client has dated setup evidence;
- docs do not imply hosted/remote MCP support.

### M4 — Registry Reliability Matrix

Goal: keep the public Registry the most reliable zero-checkout delivery channel.

Tasks:

- `DT-401` Validate all 146 index entries and theme items against the official
  shadcn schemas.
- `DT-402` Verify slug, title, description, light/dark variables, radius, and
  empty file list against the Style Catalog source.
- `DT-403` Add deterministic response snapshots or hashes so catalog changes are
  reviewable.
- `DT-404` Expand install smoke to representative style fixtures: light,
  dark-heavy, unusual radius, high contrast, and typography-sensitive styles.
- `DT-405` Establish a matrix for supported shadcn, Tailwind v3, Tailwind v4,
  and supported framework layouts. Remove the Tailwind v3 claim if it cannot be
  continuously proved.
- `DT-406` Test both canonical hosts, redirects, content type, cache behavior,
  404s, and invalid slugs.
- `DT-407` Add a scheduled smoke against latest shadcn while keeping a pinned
  release-gate version for reproducibility.
- `DT-408` Keep the `registry:theme` boundary explicit; component files remain a
  separate decision and versioned contract.

Exit criteria:

- all items pass schema/catalog checks;
- representative clean projects pass the declared compatibility matrix;
- docs distinguish theme tokens from component source;
- upstream latest-version breakage produces an alert without making normal CI
  nondeterministic.

### M5 — Agent Skill As A Tested Delivery Channel

Goal: prove that agents can install, activate, and follow the StyleKit workflow.

Tasks:

- `DT-501` Validate frontmatter, trigger description, links, commands, catalog
  count, and product-truth phrases in `SKILL.md`.
- `DT-502` Keep installer discovery at exactly one public StyleKit skill; ensure
  repository-local development skills remain excluded.
- `DT-503` Install into isolated project directories for each named supported
  agent and assert the expected files/links are created.
- `DT-504` Add cleanup assertions so skill verification leaves no user-global
  configuration behind.
- `DT-505` Create a small evaluation set: named-style request, ambiguous-style
  selection, invalid slug, existing design-system constraint, and non-frontend
  request that should not trigger the skill.
- `DT-506` Score outputs for using real tokens, respecting do/don't rules,
  avoiding fabricated endpoints, and preserving the target project's stack.
- `DT-507` Version the skill instructions or record the source commit in the
  capability manifest so verification is reproducible.
- `DT-508` Keep CLI/MCP instructions in the skill synchronized with their real
  support state.

Exit criteria:

- discovery and actual installation pass in clean project scopes;
- supported agents are distinguished from merely compatible agents;
- key commands and URLs are continuously verified;
- evaluation failures can block a claim update without blocking unrelated site
  work.

### M6 — Turn `/developers` Into A Developer Hub

Goal: make the page a truthful starting point rather than four static command
cards.

Tasks:

- `DT-601` Drive card status, version, command, docs link, and verification date
  from the capability manifest.
- `DT-602` Show state labels such as “Public beta”, “Repository preview”, and
  “Verified” with accessible text rather than color alone.
- `DT-603` Add channel-specific documentation links and a concise “what this
  installs/returns” contract.
- `DT-604` Distinguish public npm version from repository candidate when they
  differ.
- `DT-605` Provide copyable pinned commands first and an optional latest command
  once support policy permits it.
- `DT-606` Add a compatibility/evidence section with last verified date and
  scope, without implying guarantees beyond the matrix.
- `DT-607` Localize copy labels, status, errors, and copy feedback in English and
  Chinese; avoid a hard-coded English copy-button label.
- `DT-608` Add page-level tests for every displayed command and state.
- `DT-609` Add keyboard, screen-reader, reduced-motion, small-screen, and
  clipboard-failure checks.
- `DT-610` Keep metadata, sitemap, `llms.txt`, README, and style-page “Use” panels
  aligned with the same capabilities.

Exit criteria:

- each command can be traced to current evidence;
- no card overstates package freshness or compatibility;
- users can reach setup, reference, troubleshooting, and changelog material;
- both locales and assistive technology expose equivalent information.

### M7 — Release Engineering And Governance

Goal: make releases repeatable without granting the repository an unsafe,
unreviewed publish path.

Tasks:

- `DT-701` Choose changeset/version tooling and document which changes require
  Core, CLI, MCP, Skill, or website releases.
- `DT-702` Generate tarballs once, attach checksums/provenance, and promote the
  same verified artifacts rather than rebuilding during publish.
- `DT-703` Require build, typecheck, API contract, package size, clean-consumer,
  license, secret, and product-truth gates.
- `DT-704` Add an owner-approved npm publish job with trusted publishing or the
  narrowest practical credential scope.
- `DT-705` Run post-publish smoke against exact versions before moving the
  recommended dist-tag or updating the site.
- `DT-706` Document deprecation, dist-tag rollback, security contact, and broken
  release communication.
- `DT-707` Publish one toolkit release note that names each channel version and
  compatibility relation.
- `DT-708` Store evidence summaries as CI artifacts and keep the public manifest
  small and non-sensitive.

Exit criteria:

- a maintainer can reproduce a release from documented steps;
- artifact verification and external publishing are separate approvals;
- the recommended website command changes only after post-publish success;
- a bad immutable npm version has a tested recovery procedure.

### M8 — Adoption, Maintenance, And Later Bets

Goal: learn which delivery channels deserve continued investment after they are
reliable.

Tasks:

- `DT-801` Measure privacy-conscious website events for docs visits and command
  copies; do not add hidden CLI/MCP telemetry.
- `DT-802` Track npm downloads, GitHub issues, setup failures, compatibility
  incidents, and successful external examples as directional evidence.
- `DT-803` Review dependency/security updates and upstream shadcn/MCP changes on
  a regular maintenance cadence.
- `DT-804` Publish a compatibility/support table and retire stale clients or
  versions intentionally.
- `DT-805` Use adoption evidence to decide whether to prototype hosted MCP,
  richer component registry items, an SDK, or project-mutating CLI workflows.
- `DT-806` Keep speculative channels outside the primary page until their own
  evidence gates pass.

Exit criteria:

- the team can explain which channel solves which user job;
- support commitments reflect observed usage and maintenance capacity;
- future bets enter through new decisions rather than silent scope growth.

## 7. Cross-Cutting Test Pyramid

Every channel should have the smallest effective set of tests at each layer:

| Layer | Purpose | Examples |
|---|---|---|
| Unit | Pure formatting, validation, query, and error behavior | Core lookup, CLI argument parsing, MCP formatter |
| Contract | Freeze public shapes and compatibility | Core exports, CLI JSON schema, MCP tool schemas, registry JSON |
| Package | Verify what the tarball actually contains | npm pack file list, executable bit, subpath imports |
| Clean consumer | Remove monorepo/workspace advantages | ESM/CJS import, `npx`, stdio client, shadcn temp app |
| Client matrix | Verify named integrations | Claude/Cursor/Windsurf/Codex configs |
| Public smoke | Verify the artifact users receive | exact npm version, dist-tag, live Registry, GitHub Skill |
| Product truth | Keep claims aligned with evidence | versions, state labels, counts, commands, links |

Release gates use pinned dependencies. Scheduled probes may test upstream latest
versions and open a maintenance issue on failure; they should not make every
ordinary commit depend on the network.

## 8. Definition Of Done By Channel

### Core

- Packed artifact installs without workspace links.
- Declared ESM/CommonJS/types/subpath imports pass.
- Public schemas and errors are versioned and contract-tested.
- Catalog revision/count/capabilities are machine-readable.
- Semver and deprecation expectations are documented.

### CLI

- Exact public version works through `npx` from a clean directory.
- Help, version, human output, JSON output, stderr, and exit codes are stable.
- Every command has positive and negative smoke coverage.
- Mutating behavior is explicit, previewable, and opt-in.
- Website examples are copied from verified fixtures or validated against them.

### MCP Server

- Exact public package passes protocol smoke over stdio.
- Tools are read-only, schema-versioned, and return structured errors.
- No logging corrupts protocol stdout.
- Named supported clients have dated configuration evidence.
- Shutdown and offline behavior are tested.

### Registry

- All catalog items validate and agree with source data.
- Representative projects install successfully across the declared matrix.
- Theme-only scope is explicit.
- Pinned and latest-upstream checks serve different purposes.
- Live endpoint failures and invalid slugs behave predictably.

### Agent Skill

- Installer discovers exactly one intended public skill.
- Clean project-local install passes for every named supported agent.
- Links and commands resolve to current supported channels.
- Trigger and output evaluations cover both activation and non-activation cases.
- Verification leaves no global user configuration behind.

### Developer Page

- Status, versions, commands, and evidence are sourced or validated centrally.
- Both languages communicate the same support boundary.
- Every command shown has a reproducible public-path check.
- Documentation, troubleshooting, changelog, and compatibility are reachable.
- Accessibility and clipboard failure behavior are tested.

## 9. Recommended First Execution Batch

After Decision #2 is confirmed, execute this batch before adding new commands or
MCP tools:

1. `DT-002` finish the public-claim inventory.
2. `DT-003` introduce the capability-status schema and current manifest.
3. `DT-007` capture CLI `0.1.0` versus repository output contracts.
4. `DT-105` add packed Core clean-consumer smoke.
5. `DT-206` add packed CLI `npx` smoke.
6. `DT-304` add packed MCP protocol smoke.
7. `DT-005` make product-truth validation consume the manifest.
8. `DT-004` update page, READMEs, `SKILL.md`, and `llms.txt` with accurate
   version/state wording.
9. `DT-601` expose the resulting status and docs links on `/developers`.
10. Run package, type, Registry, product-truth, and production build checks.

Why this order: it first makes the release artifacts independently testable,
then changes public wording based on that evidence. It avoids publishing a new
version before the current package contract and migration implications are
understood.

## 10. Review Cadence

- Update the evidence baseline whenever a channel version, install command,
  compatibility claim, or catalog count changes.
- Resolve decision-map tickets in dependency order and keep the map compact.
- Re-run public distribution probes after releases and on a scheduled cadence.
- Review package size, startup time, client compatibility, and truth drift
  before each supported release.
- Revisit hosted MCP, component registry items, and project mutation only after
  M0-M7 exit criteria and adoption evidence are available.

## 11. Current Verification Commands

Repository baseline:

```bash
pnpm run test:developer-packages
pnpm run check:product-truth
pnpm run test:style-registry-install
```

Public distribution probes:

```bash
npm view stylekit-core version
npm view stylekit-cli version
npm view stylekit-mcp version
npx -y stylekit-cli@0.1.0 --version
npx -y stylekit-cli@0.1.0 list --limit 1 --json
npx -y skills@latest add AnxForever/stylekit --list
```

The public MCP package also needs a protocol client probe, not merely a startup
command. That probe passed manually for `stylekit-mcp@0.1.0` in this baseline
and should become a repository script in M3.
