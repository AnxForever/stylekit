# Bund Summit 2026 · StyleKit × Bailian Plan

Status: active

## Product framing

StyleKit is the deterministic visual system and frontend generator. Bailian/Qwen
is the natural-language intent layer. The model may recommend a StyleKit slug
and summarize implementation intent, but StyleKit remains authoritative for
tokens, recipes, rules, accessibility guidance, and generated files.

## Frozen first demo

- Scenario: B2B account-risk dashboard
- Project type: `dashboard`
- Generation target: Next.js
- Primary style: `glassmorphism`
- Required states: `loading`, `empty`, `error`, `success`
- Output: runnable project, ZIP export, screenshot, and replayable run log

The generation path is intentionally limited to the four styles already covered
by the verified Workspace generator: `neo-brutalist`, `glassmorphism`,
`neumorphism`, and `editorial`.

## Shared A/B flow

```text
natural-language brief
  -> Bailian/Qwen returns StyleIntent JSON
  -> StyleKit validates the slug and brief
  -> StyleKit supplies a validated StylePack with canonical tokens, recipes, rules, and readiness data
  -> Workspace Generator creates the project
  -> build/runtime/quality checks produce evidence
```

## Provider-independent acceptance

Before using a live model, run:

```bash
npm run test:bailian-stylekit
```

This verifies `StyleIntent -> StylePack -> workspace-generator-v1 -> ZIP`
without a browser or API key.

## A · Bailian CLI workflow

The repository will contain a small replayable demo that invokes `bl text chat`,
parses the result with the shared StyleIntent schema, and calls the existing
StyleKit data and generation layers. The README must record the actual CLI
version, model name, command, output hash, and generated artifact path.

## B · Built-in DashScope workflow

The website exposes a standalone `/style-advisor` page and an embedded,
server-side Style Advisor in each project editor. It reuses the same
prompt, schema, supported-style validation, and Workspace Generator as A. The
API key will remain server-side; the base StyleKit experience will continue to
work when no key is configured.

## Evidence requirements

1. One live CLI run with Bailian.
2. One browser run of the Style Advisor.
3. One generated Dashboard screenshot.
4. One generated ZIP with a reproducible README.
5. One no-key fixture/replay path for reviewers.

## Out of scope for the first submission

- Generating every published style through the Workspace engine.
- Claiming production-ready arbitrary applications.
- Letting the model invent final design tokens or component code.
- Publishing packages or deploying production infrastructure without a later
  explicit approval.
