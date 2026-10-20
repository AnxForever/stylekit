# StyleKit tool workflow evaluation

This harness adds a repeatable acceptance path for the tools that feed AI-built pages. It evaluates three complete tasks: an admin dashboard, a product landing page, and a redesign of an existing page. It separates source-level tool regressions from generated-page results and from browser or visual review.

## Run the deterministic tool-chain regression

From the StyleKit repository root:

```bash
pnpm --filter stylekit-core build
pnpm --filter stylekit-cli build
pnpm --filter stylekit-mcp build
pnpm exec tsx tools/scripts/evaluate-tool-workflows.ts --scope toolchain --output /tmp/stylekit-toolchain-evidence.json
```

Build the three developer-tool packages after source changes, then run the harness. It starts the built local MCP server over stdio and invokes the built CLI, so both consume the freshly built Core contract. It requests a non-default recipe variant with parameter and slot overrides, a partial implementation brief with a projection marker, and an asset listing/detail round trip through both clients. It checks that the MCP and CLI recipe outputs match.

When `--output` is set, the file contains the full evidence JSON, including structured tool responses and their hashes; stdout prints a short status/check-count object and the evidence path.

Export the complete task and acceptance contract for a candidate-producing agent with:

```bash
pnpm exec tsx tools/scripts/evaluate-tool-workflows.ts --scenarios > /tmp/stylekit-tool-workflow-scenarios.json
```

The evaluator injects `tools/lib/no-network-fetch.mjs` into its child processes. No MCP/CLI call can reach the published StyleKit site; the run deliberately exercises the bundled package snapshot and records that authority in the evidence JSON. A network fallback is not evidence that the live catalogue is fresh.

Expected deterministic checks include:

- MCP registers the recipe, brief, and public asset tools.
- `broadcast-glitch/button` applies `cyan`, `size=lg`, `fullWidth=true`, and the `RUN REPORT` label.
- Partial brief output contains the requested sections and button component, excludes unrequested sections, and says `projection.complete=false`.
- MCP and CLI return the same rendered recipe, and their public asset detail preserves identity and license metadata.

This run does not ask a model to build a page. It cannot establish model quality, browser behavior, visual hierarchy, or accessibility of a generated page.

## Evaluate a candidate directory

Supply a directory containing a `stylekit-tool-workflow.json` manifest and only the artifacts it references:

```bash
pnpm exec tsx tools/scripts/evaluate-tool-workflows.ts \
  --scope all \
  --candidate-dir /path/to/run-artifacts \
  --output /tmp/stylekit-workflow-evidence.json
```

The evaluator reads the manifest and its explicitly listed files only. Artifact paths must be relative to the candidate directory, must resolve inside it, and cannot name `.env` files. Each artifact is limited to 10 MiB; the candidate is limited to 300 files and 50 MiB. It does not install packages or execute candidate source. Include each scenario consumer's `package.json` as a `kind: "other"` artifact: direct imports must be declared there or the consumer check fails. The harness typechecks listed TS/TSX/JS/JSX files with a strict, no-emit configuration.

Before running Tailwind CSS 4, the harness parses CSS into an AST and applies a static allowlist. It permits `@import "tailwindcss"`, candidate-relative `@source` paths that cover listed source files, and known static CSS/Tailwind at-rules. `@plugin`, `@config`, external or unsupported imports/sources, and unknown at-rules return `inconclusive` and skip compilation. Allowed stylesheets compile in a temporary isolated consumer. This checks the listed CSS contract without evaluating candidate plugin/config code; it does not replace a trusted app build. If a real app needs custom plugin or config code, supply separate evidence from a trusted build instead of asking this evaluator to execute it.

For a model-generated run, the manifest records the adapter and prompt identity. The harness has no default model provider and does not call a paid API. A record is provenance supplied by the candidate producer; this harness does not authenticate the provider or model identity.

`source: "agent-session"` supports artifacts created by the current Codex task and records the agent, optional runtime-reported model/thread ID, and prompt hash. Those are useful real task outcomes, but they are not an independent or blinded Skill A/B benchmark. A controlled Skill comparison still needs fresh tasks with a fixed prompt, comparable model settings, and separate recorded runs.

### Candidate manifest

The top-level shape is:

```json
{
  "schemaVersion": "stylekit-tool-workflow-candidate-v1",
  "run": {
    "id": "run-2026-10-20-a",
    "createdAt": "2026-10-20T08:00:00.000Z",
    "source": "agent-session",
    "agentSession": {
      "agent": "Codex",
      "model": "runtime-reported model name",
      "threadId": "optional thread or task id",
      "promptSha256": "64 lowercase hex characters"
    }
  },
  "scenarios": {
    "admin-dashboard": {
      "artifacts": [
        { "path": "admin/page.tsx", "kind": "source" },
        { "path": "admin/globals.css", "kind": "css" },
        { "path": "admin/package.json", "kind": "other" },
        { "path": "admin/desktop.png", "kind": "screenshot" },
        { "path": "admin/mobile.png", "kind": "screenshot" },
        { "path": "admin/browser-report.json", "kind": "browser-report" }
      ],
      "browserReport": "admin/browser-report.json",
      "visualReview": {
        "reviewer": "reviewer or team identifier",
        "reviewedAt": "2026-10-20T08:30:00.000Z",
        "status": "pass",
        "evidence": ["admin/desktop.png", "admin/mobile.png"],
        "notes": "Optional review notes"
      }
    }
  }
}
```

Add a scenario entry for each task being evaluated. Valid IDs are `admin-dashboard`, `marketing-landing-page`, and `existing-page-redesign`. A missing scenario is inconclusive. For artifacts generated in the current Codex task, set `run.source` to `agent-session` and hash the task prompt; for a separately invoked adapter, use `source: "model-adapter"` and record `model: {adapter,provider,model,promptSha256}`; for human-authored or otherwise supplied candidates, set `run.source` to `provided`. The two recorded model sources are self-reported and do not authenticate runtime identity.

### Browser report

The listed browser report uses `schemaVersion: "stylekit-tool-workflow-browser-v1"`. It records the scenario and run IDs, Playwright runner/version, a local loopback `baseUrl`, desktop and mobile viewports, whether reduced motion was emulated, page/console errors, mobile overflow measurements, and a `checks` object. The evaluator requires report entries for `user-flow`, `expected-states`, `mobile`, `aria-keyboard`, `reduced-motion`, and `failure-recovery`; each entry has `status`, `observation`, and artifact paths in `evidence`. A compact shape is:

```json
{
  "schemaVersion": "stylekit-tool-workflow-browser-v1",
  "scenarioId": "admin-dashboard",
  "runId": "run-2026-10-20-a",
  "runner": { "name": "Playwright", "version": "installed version" },
  "startedAt": "2026-10-20T08:20:00.000Z",
  "baseUrl": "http://127.0.0.1:3187",
  "viewports": {
    "desktop": { "width": 1440, "height": 960 },
    "mobile": { "width": 390, "height": 844 }
  },
  "reducedMotionEmulated": true,
  "pageErrors": [],
  "consoleErrors": [],
  "horizontalOverflow": { "viewportWidth": 390, "documentWidth": 390 },
  "checks": {
    "user-flow": { "status": "pass", "observation": "Filter, open detail, and return completed.", "evidence": ["admin/keyboard-flow.png"] },
    "expected-states": { "status": "pass", "observation": "Loading, populated, empty, and error states rendered.", "evidence": ["admin/states.json"] },
    "mobile": { "status": "pass", "observation": "390px view has no horizontal overflow.", "evidence": ["admin/mobile.png"] },
    "aria-keyboard": { "status": "pass", "observation": "Keyboard-only navigation reached filter and row action with visible focus.", "evidence": ["admin/keyboard-flow.png"] },
    "reduced-motion": { "status": "pass", "observation": "Reduced-motion emulation removed nonessential transitions.", "evidence": ["admin/reduced-motion.png"] },
    "failure-recovery": { "status": "pass", "observation": "Retry preserved filter state after simulated failure.", "evidence": ["admin/states.json"] }
  }
}
```

The report schema checks the recorded browser run; it does not replay it. Keep the Playwright trace, accessibility report, screenshots, and any focused failure recordings as manifest-listed artifacts. Use a loopback URL so the browser task can run locally without calling external services.

The visual review record is separate from browser assertions. It needs a reviewer, timestamp, decision, and at least one listed screenshot. The harness hashes the screenshots and records the reviewer attestation; it does not infer design quality from pixels.

## Scenario acceptance contract

| Scenario | Main user flow | Required states | Mobile and accessibility acceptance | Failure and motion acceptance |
|---|---|---|---|---|
| Admin dashboard | Scan KPIs, filter/sort records, open detail/action, clear empty results, recover from service failure | Loading, populated, empty, error, success | Complete the task at 390px; named controls, meaningful table/list semantics, keyboard-visible focus, announced updates | Retry or preserve context on errors; respect `prefers-reduced-motion` |
| Product landing page | Understand value, inspect proof, reach signup/demo, submit, recover | Idle, invalid, submitting, success, error | Complete the task at 390px; labeled form, linked field errors, named navigation/actions, keyboard operation | Preserve entered data on service error; disable nonessential motion when reduced motion is set |
| Existing-page redesign | Open the existing route, complete its original task, return/refresh, recover from empty/validation/service errors | Existing content, loading, empty, validation error, service error, success | Keep the original task usable at 390px; preserve focus order, labels, and keyboard access | Preserve user context and recovery paths; new animation must not gate content |

The more detailed user flows and requirements live in `TOOL_WORKFLOW_SCENARIOS` in `tools/lib/tool-workflow-evaluation.ts`; this table is the review summary. A source check or passing linter does not satisfy browser, interaction, or visual criteria.

## Evidence and exit codes

The JSON report contains one top-level status and separate toolchain, candidate, model-record, per-scenario, and coverage fields. Each deterministic tool call stores its structured output and SHA-256 hash; candidate artifacts are referenced by relative path and hash. Coverage distinguishes runner-verified acceptance criteria from browser/human-reported results, failures, missing evidence, and isolated TypeScript/CSS checks.

- Exit `0`: every check in the requested scope passed.
- Exit `1`: a deterministic check, artifact contract, or supplied review reports a failure.
- Exit `2`: required evidence is missing, partial, or not replayed. The report keeps this as `inconclusive`, never as pass.

`--scope toolchain` can pass independently. `--scope all` without a candidate directory is inconclusive by design. A complete candidate evaluation requires all three scenarios, source and CSS evidence, browser records for each required browser criterion, screenshot-backed human review, and a recorded model run when the candidate is labelled `model-adapter`.

## What remains outside the harness

The deterministic checks establish that the shipped MCP/CLI contracts return the requested data against the bundled snapshot. They do not establish live-catalogue freshness, that a model followed its prompt, that a full app builds or runs correctly, or that a person finds the result useful. Those require a recorded real model task and a local browser replay followed by visual and accessibility review. This repository harness intentionally leaves those results inconclusive until their evidence is supplied.
