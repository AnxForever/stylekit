# StyleKit Project Brief MVP Execution Plan

Status: active
Created: 2026-07-28
Owner: StyleKit
Execution mode: local research, implementation, and verification only

## 1. Objective

StyleKit needs to stop expanding its content inventory without evidence that the additional supply
helps users finish real work. This project will identify, build, and validate one feature that moves
a user from choosing a visual style to applying it in an actual AI-assisted frontend project.

The selected hypothesis is an anonymous Project Implementation Brief builder embedded in a style
detail page. On 2026-07-28 it passed the research and candidate-comparison gates for local MVP
implementation. This does not mean demand or willingness to pay has been validated.

The feature must:

- solve a concrete implementation task rather than create another browsing surface;
- work for every published style without pretending to generate a production-ready repository;
- reuse the existing style rules, prompts, and Workspace brief concepts;
- produce a deterministic artifact that can be copied into Codex, Claude Code, Cursor, v0, or a
  similar coding tool;
- be useful without an account, payment, AI API key, or source-code upload;
- preserve the current visual language and all approved style previews;
- create measurable, privacy-preserving evidence about whether users move from Explore to Apply.

## 2. Hard Boundaries

These boundaries override implementation convenience.

### 2.1 No deployment without approval

- Do not run a production deployment command.
- Do not push a deployment through Vercel or another hosting provider.
- Do not write to a production database, analytics table, object store, or remote configuration.
- Do not apply a production migration.
- Do not publish a package, registry item, MCP server, CLI, or release.
- Do not update DNS, environment variables, domains, redirects, or production feature flags.
- Local `next build`, local `next start`, browser checks against localhost, and read-only public web
  research are allowed.
- Deployment can be considered only after the owner has tested the local result and given explicit
  approval for deployment in a later instruction.

### 2.2 Visual protection

- Do not modify the layout, colors, typography, composition, animation, or interaction of the 136
  approved style previews.
- Do not update approved screenshot baselines.
- Do not redesign the style detail page, global navigation, catalog, or Workspace.
- New controls must use the existing border, spacing, typography, form, icon, and responsive patterns.
- A functional addition to the existing AI implementation panel is allowed only when it does not
  alter the preview asset or recompose unrelated page sections.

### 2.3 Product-truth protection

- Do not call deterministic Markdown generation "AI generation."
- Do not claim that the output is a complete application, production-ready code, validation result,
  or guaranteed model instruction.
- Do not add billing, entitlements, teams, or enterprise administration.
- Do not add another style, template, animation, prompt category, or content encyclopedia.
- Do not collect project names, company names, prompts, requirements, notes, or other free-form input
  in analytics.

## 3. Baseline Facts To Preserve

The implementation starts from the following repository facts. Each must be rechecked before final
verification because the worktree may contain concurrent owner changes.

- The catalog has 136 styles and approved visual previews.
- The product already contains showcases, animations, templates, tokens, recipes, prompts, a shadcn
  theme registry, Workspace, public APIs, localization, and administration.
- The historical seven-day baseline records 5,040 style views and 232 code copies, approximately a
  4.6% style-view-to-code-copy rate. Code copy is a proxy for implementation interest, not proof of
  successful application.
- Workspace has a richer brief model but requires login, while actual repository generation supports
  only a constrained set of project, target, and style combinations.
- The style detail AI implementation panel currently provides a Hard Prompt, Design Spec, Creative
  Brief, and a lightweight optional context form with project type, brand personality, and
  anti-references.
- Existing unrelated worktree changes in `next.config.ts`, `eslint.config.mjs`, and
  `tests/unit/config-boundaries.test.ts` must be preserved.
- Current commercial validation remains inconclusive. This feature is not evidence of willingness to
  pay and must not be presented as such.

## 4. Target User And Job

### 4.1 Initial target user

An independent developer or small product team using an AI coding assistant with a modern frontend
stack. They can build functional software but struggle to turn an attractive reference style into a
complete, consistent implementation across pages, states, responsive behavior, and accessibility.

### 4.2 Job to be done

When I choose a StyleKit visual direction, help me express my real product task and its constraints in
a form my coding agent can act on, so I spend less time restating context and correcting generic,
incomplete, or style-drifting output.

### 4.3 Current failure mode

The current Hard Prompt expresses the visual style well but asks the user to append the actual product
requirement themselves. This leaves important implementation context implicit:

- who uses the product;
- what primary task must work;
- which pages or flows are in scope;
- which technical stack and existing conventions apply;
- which loading, empty, error, success, and disabled states are required;
- what is explicitly out of scope;
- what acceptance checks prove completion.

The user can enter this information in Workspace, but the login boundary and narrow generator support
make it a poor first-value path for users exploring any of the 136 styles.

## 5. Research Protocol

No candidate is selected from intuition alone. The evidence ledger is the source of truth.

### 5.1 Required evidence streams

At least three evidence streams must be reviewed:

1. Internal behavior and product evidence: analytics, current flows, code contracts, support gaps, and
   documented product direction.
2. Primary external evidence: official documentation from AI coding tools describing how project
   context, constraints, examples, states, scope, and verification improve agent work.
3. Public user evidence: direct discussions, issue reports, or workflow descriptions showing where
   users lose time or trust when applying AI-generated UI to real projects.

Competitor marketing pages may inform terminology, but they do not count as user-demand proof.

### 5.2 Source quality

Each finding records:

- source URL or repository path;
- retrieval date;
- source type;
- direct observation or quotation summary;
- confidence level;
- decision affected;
- contradiction or limitation.

Preference order:

1. repository behavior and first-party product data;
2. official technical documentation;
3. direct user reports and maintained issue trackers;
4. reputable independent workflow analysis;
5. vendor marketing and secondary summaries.

### 5.3 Research stop rule

Research is sufficient for an MVP decision when:

- every candidate has evidence from at least two independent streams;
- the selected candidate has no unresolved blocker involving privacy, product truth, or architecture;
- additional sources repeat known points without changing the score or scope;
- uncertain demand is converted into a measurable experiment rather than hidden behind certainty.

## 6. Candidate Evaluation

The following candidates must be compared before implementation.

### Candidate A: Style matcher

Ask users about product, audience, and desired qualities, then recommend several StyleKit styles.

Potential benefit: reduces choice overload and improves discovery.

Primary concern: remains inside Explore and does not solve the observed gap between style viewing and
real implementation.

### Candidate B: Project Implementation Brief

Collect bounded project requirements on a selected style and produce a complete, deterministic,
agent-ready Markdown work order containing product context, scope, states, stack, style rules,
constraints, and acceptance checks.

Potential benefit: directly joins the existing style knowledge to a user's real project and works
across every style without a backend generation claim.

Primary concern: it could become a long form that users do not finish or an output that duplicates the
existing Hard Prompt without enough added value.

### Candidate C: Existing-code or screenshot diagnosis

Accept code or a screenshot and identify style drift, missing states, accessibility issues, and likely
repairs.

Potential benefit: targets the later Validate loop and a painful downstream task.

Primary concern: requires upload/privacy policy, parsers or model inference, security controls,
explainable findings, false-positive handling, and substantially more trust than the current product
has earned.

### 6.1 Scoring dimensions

Each candidate receives a 1-5 score, with linked evidence, for:

- severity of the user problem;
- distance to the Explore-to-Apply loop;
- coverage across current styles and users;
- time to first value;
- product-truth risk;
- privacy and security risk;
- implementation and maintenance cost;
- independent measurability;
- reversibility if the hypothesis fails;
- compatibility with a future paid Apply product.

The decision record must state `adopt`, `adapt`, `combine`, or `decline` for every candidate.

## 7. Frozen MVP Contract

This contract was frozen on 2026-07-28 after the candidate gate passed. Material expansion requires
new evidence and an updated decision record.

### 7.1 Inputs

Required minimum:

- project type;
- primary user or audience;
- primary goal or user task.

Optional but high-value:

- technology stack;
- required pages, sections, or flow steps;
- required UI states;
- brand personality;
- anti-references and explicit exclusions;
- additional constraints.

The three required fields remain the entire minimum path. Optional fields must be grouped as advanced
constraints and must not block generation. This is a direct response to evidence that explicit context
helps, while turning every small task into a large project causes scope and completion problems.

All free-form fields must have visible or programmatic maximum lengths. Long comma-separated lists
must be bounded after parsing. Input remains in browser memory and must not be included in analytics.

### 7.2 Output

One Markdown implementation brief that includes:

- clear task statement;
- product context and user goal;
- defined scope and explicit non-goals;
- selected stack and instructions to preserve existing project conventions;
- required pages or flow;
- state-completeness requirements;
- selected StyleKit style identity and reference path;
- style-specific required and forbidden rules;
- responsive, interaction, accessibility, and reduced-motion requirements;
- implementation sequence;
- testable acceptance checklist;
- final instruction to inspect the repository before editing and verify the result end to end.

The output must be deterministic for the same inputs and locale. It must not contain unsupported
claims about files, dependencies, or completed implementation.

### 7.3 Actions

- Generate or update the brief locally.
- Preview the full Markdown output.
- Copy the brief with a clipboard fallback.
- Download the brief as a `.md` file.
- Clear entered project context.

### 7.4 States and failures

- Empty initial state with concise field guidance.
- Validation state when required fields are missing.
- Generated state with a non-disruptive status announcement.
- Copy success and copy failure states.
- Download failure must not destroy the generated content.
- Locale changes must produce a coherent output in the selected locale.
- Narrow viewport must not overflow horizontally.
- Keyboard users must be able to operate disclosure, controls, state checkboxes, generation, copy,
  download, and clear actions.

## 8. Non-Goals

The MVP will not:

- call an LLM or require an API key;
- inspect, upload, clone, or modify a user's repository;
- generate runnable source files;
- guarantee that an AI coding tool follows the brief;
- create or save a Workspace project;
- require authentication;
- synchronize data across devices;
- store free-form requirements in local storage by default;
- diagnose an existing interface;
- introduce billing, a waitlist, or a purchase CTA;
- redesign any existing StyleKit surface.

## 9. Architecture Plan

### 9.1 Domain layer

Create a locale-aware pure builder under `lib/styles/` with:

- a bounded `ProjectImplementationBrief` input type;
- normalization helpers for whitespace and list parsing;
- an explicit completeness calculation;
- deterministic Markdown generation;
- no browser, React, analytics, database, or provider dependency.

The style-specific input should reuse `PromptPairInput` where appropriate rather than introduce a
second representation of style rules.

### 9.2 UI layer

Adapt the existing Project Context disclosure in `AiImplementationPanel`:

- retain the current panel location and visual primitives;
- expand the interview into grouped, bounded fields;
- keep the existing three document tabs operational;
- add a dedicated generated Project Brief document only if the interaction can remain clear and
  responsive without reorganizing unrelated content;
- do not silently regenerate analytics events on every keystroke;
- treat an explicit generate action as the measurable creation moment.

The frozen integration choice is to keep Project Brief inside the existing context disclosure rather
than add a fourth document tab. The three current tabs remain unchanged, and generated output appears
only after the explicit action. This keeps the optional workflow subordinate to the existing default.

### 9.3 Analytics layer

Add dedicated client events. Proposed names:

- `project_brief_generated`;
- `project_brief_copy`;
- `project_brief_download`.

Allowed properties are aggregate, bounded, and non-sensitive:

- style slug;
- locale;
- project type enum;
- stack option count;
- required page/item count;
- required state count;
- optional-field count;
- completion tier;
- source surface fixed to `style_detail`.

Forbidden analytics properties:

- audience text;
- primary-goal text;
- page or flow labels;
- notes;
- brand words;
- anti-references;
- generated Markdown;
- clipboard content;
- project or company name.

The public Zod schema must reject unknown properties. Style slug resolution must continue to verify
that the style exists before storage.

### 9.4 Persistence

No persistence is required for the MVP. This minimizes privacy risk and prevents stale project data
from appearing on shared devices. Persistence can be tested later only if abandonment data and user
interviews show that form recovery is a material need.

## 10. Test Strategy

### 10.1 Unit tests

- deterministic output for identical inputs;
- Chinese and English document structure;
- required and optional sections;
- style identity and source reference;
- locale-correct style rules;
- bounded list normalization and deduplication;
- no `undefined`, accidental object serialization, or unsupported claims;
- acceptance checklist contains responsive, state, accessibility, and verification requirements;
- analytics metadata contains counts and enums only.

### 10.2 Component tests

- existing Hard Prompt remains the initial document;
- existing Design Spec and Creative Brief continue to work;
- disclosure opens and all new controls are labeled;
- required-field validation prevents false generation;
- selecting states and entering context generates a preview;
- copy uses the generated brief and reports status;
- download uses a deterministic filename;
- clear removes user input and generated output;
- analytics events fire once per explicit action with no raw input;
- tab keyboard navigation remains functional;
- English UI and output contain no Chinese fallback text where localized data exists.

### 10.3 Contract and route tests

- client event allowlist includes the new events;
- Zod schema accepts the exact bounded event shapes;
- unknown fields and raw text are rejected;
- style slug extraction works for each new event;
- nonexistent styles are rejected by the analytics route;
- authoritative commercial events remain inaccessible to browser tracking.

### 10.4 Repository checks

- focused tests during development;
- `pnpm lint`;
- `pnpm typecheck`;
- `pnpm test`;
- `pnpm build`;
- product-truth check if affected;
- git diff review to confirm no unrelated or approved-preview files changed.

### 10.5 Local browser verification

Check at minimum:

- desktop viewport around 1440 x 900;
- mobile viewport around 390 x 844;
- Chinese and English locales;
- empty, validation, filled, generated, copied, downloaded, and cleared states;
- keyboard-only operation;
- no horizontal overflow, text collision, layout jump, or covered controls;
- approved style preview remains unchanged and interactive;
- no unexpected console error or failed local request.

Screenshots are inspection artifacts only. Approved visual baselines must not be overwritten.

## 11. Success Metrics And Decision Rules

### 11.1 Instrumentation funnel

Measure unique sessions and total events separately:

1. `style_view`;
2. `project_brief_generated`;
3. `project_brief_copy` or `project_brief_download`;
4. existing downstream implementation signals such as style export or shadcn command copy.

The MVP cannot prove that code shipped. It measures whether users choose to turn a style into a
project-specific implementation artifact.

### 11.2 Initial 2-4 week thresholds

The threshold should be finalized against production traffic before deployment approval. The initial
local proposal is:

- minimum sample: 300 unique style-detail sessions exposed to the feature;
- activation: at least 8% generate a valid brief;
- artifact intent: at least 55% of generated briefs are copied or downloaded;
- quality guardrail: fewer than 5% repeated generate actions caused only by validation or broken UI;
- no analytics payload containing free-form user text;
- no statistically obvious reduction in existing Hard Prompt copy behavior without a compensating
  increase in Project Brief artifact actions.

These are experiment thresholds, not forecasts. They may be changed before deployment only with a
written reason, never after observing results to manufacture a pass.

### 11.3 Decision outcomes

- **Expand**: sample is sufficient, activation and artifact intent pass, and user feedback confirms
  that the output saves implementation effort. Consider Workspace import or an agent-rule export.
- **Iterate**: users open or start the form but fail to generate, or generation is healthy but copying
  is weak. Reduce fields or improve output relevance based on evidence.
- **Stop**: sufficient exposure produces less than 3% generation and no repeated qualitative demand,
  or the output merely cannibalizes existing prompt copy without stronger application intent.
- **Inconclusive**: sample is below the minimum. Continue observation without expanding scope.

## 12. Risk Register

| Risk | Impact | Mitigation | Stop condition |
| --- | --- | --- | --- |
| Form is too long | Low completion | Require only three core inputs; keep advanced constraints optional | High starts, low valid generation |
| Output duplicates Hard Prompt | No incremental value | Include product scope, states, stack, sequence, and acceptance checks | Copy behavior simply shifts with no stronger signal |
| Sensitive text enters analytics | Privacy breach | Enum/count-only event schema, strict unknown-field rejection, tests | Any raw input observed in payload |
| User mistakes output for generated code | Trust loss | Label as an implementation brief and state its deterministic nature in copy | Repeated user confusion |
| Style rules leak wrong locale | Poor output | Reuse tested locale fallback and add CJK checks for English | Cross-locale test failure |
| Existing panel becomes crowded | Usability regression | Preserve disclosure and responsive stacking; browser-check narrow viewports | Overflow or existing actions become harder to reach |
| Event inflation | Misleading decision | Fire only on explicit successful actions; analyze unique sessions | Automatic or keystroke event emission |
| Scope grows into Workspace clone | Maintenance cost | No accounts, persistence, repository generation, or revision history | New backend or project CRUD becomes necessary |
| Premature deployment | Production risk | Explicit owner approval gate | Any deployment command proposed before approval |

## 13. Execution Phases And Gates

### Phase 0: Freeze and document

Deliverables:

- this execution plan;
- evidence ledger;
- worktree and approved-preview boundary record.

Gate: all existing owner changes identified; deployment prohibition recorded.

### Phase 1: Research

Deliverables:

- internal funnel and flow evidence;
- official AI coding workflow findings;
- public user-problem findings;
- source limitations and contradictions.

Gate: selected candidate supported by at least two independent streams and no critical unknown hidden.

### Phase 2: Product decision

Deliverables:

- scored candidate matrix;
- adopt/adapt/combine/decline record;
- frozen MVP and non-goals;
- metrics and stop rules.

Gate: chosen scope can be measured without user-content analytics and can be removed cleanly.

### Phase 3: Core implementation

Deliverables:

- pure brief builder;
- normalization and metadata helpers;
- unit tests.

Gate: output is deterministic, bilingual, bounded, and independently testable.

### Phase 4: Product integration

Deliverables:

- existing-panel integration;
- copy, download, clear, validation, and live status behavior;
- dedicated privacy-preserving events;
- component and contract tests.

Gate: no approved preview code changed; existing prompt actions still pass.

### Phase 5: Verification

Deliverables:

- lint, typecheck, full-test, and build results;
- local desktop/mobile browser inspection;
- diff and privacy audit;
- known-limitations report.

Gate: no failing required check and no unresolved high-severity defect.

### Phase 6: Owner acceptance

Deliverables:

- localhost URL;
- concise manual test script;
- metric contract and proposed observation period;
- exact changed-file list.

Gate: owner performs local validation. The goal remains active if required corrections remain.

### Phase 7: Deployment decision, explicitly out of current scope

Only a later explicit owner instruction can authorize:

- a deployment plan review;
- production migration or release commands;
- production analytics observation;
- a go, iterate, or stop decision based on real exposure.

## 14. Definition Of Done For This Goal

The current goal is complete only when:

- the research and candidate decision are documented with traceable sources;
- one evidence-backed feature is implemented locally;
- its output solves the defined job and respects all non-goals;
- privacy-preserving events and strict schemas are present;
- focused and repository-wide automated checks pass;
- desktop and mobile local behavior are manually inspected;
- no server deployment or production write has occurred;
- the owner receives a local validation URL and acceptance checklist;
- all material limitations and next experiment decisions are stated plainly.
