# StyleKit Feature Evidence Ledger

Status: research gate complete; implementation evidence pending
Created: 2026-07-28
Last updated: 2026-07-28

## Rules

- Record observations, not desired conclusions.
- Distinguish repository facts, official guidance, direct user evidence, and vendor claims.
- Do not treat a competitor feature as proof of demand.
- Do not treat code copy as proof that code shipped or that a user would pay.
- Add contradictions and limitations beside supporting evidence.
- A candidate needs at least two independent evidence streams before adoption.

## Evidence Levels

- **A**: first-party behavioral data or directly verified repository/runtime behavior.
- **B**: official technical documentation describing an established workflow.
- **C**: direct public user report, issue, interview, or observed repeated workflow.
- **D**: secondary analysis or vendor marketing; useful for discovery, insufficient alone.

## Internal Evidence

| ID | Level | Observation | Source | Decision impact | Limitation |
| --- | --- | --- | --- | --- | --- |
| INT-01 | A | Historical seven-day baseline contains 5,040 style views and 232 code copies, approximately 4.6%. | `docs/ICP_PRICE_VALIDATION_BASELINE.md` | There is measurable implementation interest after style discovery. | A copy event does not prove successful application or willingness to pay. |
| INT-02 | A | Style detail already exports Hard Prompt, Design Spec, and Creative Brief. | `components/style-preview/ai-implementation-panel.tsx` | A new feature must add project specificity rather than another generic style document. | Existing prompts may already satisfy some users. |
| INT-03 | A | Current optional project context has only project type, brand personality, and anti-references. | `components/style-preview/_project-context.tsx` | Audience, user goal, scope, stack, states, and acceptance checks are currently left implicit. | A larger form may reduce completion. |
| INT-04 | A | Workspace models audience, primary goal, required pages, required states, brand personality, anti-references, notes, stack, and project type. | `lib/workspace/schema.ts` | The repository already recognizes these as useful project constraints; reuse the vocabulary. | The data model alone is not proof that external users value every field. |
| INT-05 | A | Workspace requires authentication, while repository generation truthfully supports only Next.js dashboards and four style adapters. | `app/workspace/**`, `lib/workspace/generation.ts` | An anonymous brief can provide first value across all styles without overclaiming code generation. | It will not prove that the resulting agent output is good without later user evaluation. |
| INT-06 | A | Roadmap says the product loop is Explore then Apply and freezes new generic resource categories. | `docs/PRODUCT_MONETIZATION_ROADMAP.md` | Prefer a bridge to implementation over more catalog supply. | Roadmap is an internal strategic choice, not independent demand evidence. |
| INT-07 | A | Commercial validation remains 0/200 qualified visitors, 0/20 interviews, and 0 purchases or deposits. | `docs/PRODUCT_VALIDATION_DECISIONS_REQUIRED.md` | Do not build billing or describe this free MVP as monetization validation. | Does not determine which free activation feature will work. |

## Official Workflow Evidence

| ID | Level | Observation | Source | Decision impact | Limitation |
| --- | --- | --- | --- | --- | --- |
| OFF-01 | B | Claude Code recommends specific context, scoped tasks, constraints, example patterns, explicit edge cases, and self-contained specs ending with end-to-end verification. | https://code.claude.com/docs/en/best-practices, retrieved 2026-07-28 | Supports audience/task/scope/constraints/verification sections in an agent-ready brief. | Guidance is for Claude Code and does not prove users will complete a StyleKit form. |
| OFF-02 | B | Claude prompting guidance recommends clear, explicit instructions, desired output format and constraints, and ordered steps when completeness matters. | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices, retrieved 2026-07-28 | Supports structured Markdown and explicit acceptance criteria instead of a loose paragraph. | General model guidance, not UI-specific demand evidence. |
| OFF-03 | B | Cursor supports attaching specific files/folders/docs/diffs as prompt context and uses versioned project rules or `AGENTS.md` for codebase-scoped guidance. | https://cursor.com/docs/agent/prompting and https://cursor.com/docs/rules, retrieved 2026-07-28 | Brief should tell an agent to inspect existing code and conventions rather than invent a new stack. | StyleKit cannot know a user's file paths without repository access. |
| OFF-04 | B | Lovable's published prompting handbook recommends explicit requirements, stack constraints, project purpose, user flow, scope, and a PRD-like knowledge base. | https://lovable.dev/blog/2025-01-16-lovable-prompting-handbook, retrieved 2026-07-28 | Independently supports product context, flow, stack, scope, and exclusions. | This is vendor-authored educational content and partly promotional. |
| OFF-05 | B | v0's platform API can initialize work from repositories, registries, templates, files, or archives, indicating that useful generation is grounded in structured project context rather than style text alone. | https://v0.dev/docs/api/platform/chats/init, retrieved 2026-07-28 | Supports positioning the brief as portable context, while avoiding a promise that one prompt replaces repository context. | API capability is not a prompting-quality study and should receive low decision weight. |

## Public User Evidence

| ID | Level | Observation | Source | Decision impact | Limitation |
| --- | --- | --- | --- | --- | --- |
| USR-01 | C | A Cursor Cloud Agent user reports that an agent triggered from a Linear ticket starts editing before clarifying scope or inspecting relevant files. The reported result is wrong assumptions, discarded work, and substantial human rework. A Cursor team response confirms that Plan Mode supports clarification before coding, but that Linear automations do not enter it by default. | https://forum.cursor.com/t/feature-linear-integration-2-stage-agent-clarification-before-jumping-into-implementation/165645, retrieved 2026-07-28 | Supports a brief that makes task, scope, intent, and repository inspection explicit before implementation. | One user's Cloud Agent workflow; it does not establish StyleKit demand or a conversion rate. |
| USR-02 | C | A user gives a concrete case where a narrow copy-button request changed about 18 files, including unrelated formatting and cleanup. Cursor staff says autonomous agents may optimize for completeness and recommends explicit file boundaries, no unrelated fixes, and project rules. | https://forum.cursor.com/t/linear-cursor-cloud-agent-sonnet-4-5-makes-overly-broad-edits-touches-18-files-when-only-1-2-expected/165633, retrieved 2026-07-28 | Supports explicit scope, non-goals, preservation constraints, and a diff review in the generated brief. | One reported repository and agent mode; the original oversized diff was later rebased, so the forum report is the remaining evidence. |
| USR-03 | C | A feature request argues that engineering implementation starts before coding, when requirements, architecture, trade-offs, and assignments are established. It proposes converting that context into plans or a complete Cursor prompt before code changes. | https://forum.cursor.com/t/cursor-ai-engineer-from-engineering-meeting-to-draft-pull-request/166076, retrieved 2026-07-28 | Supports a portable implementation work order as a useful intermediate artifact. | A proposed workflow, not evidence that users will complete this specific form or that the resulting prompt improves code. |
| USR-04 | C | In a discussion about coding agents, a user says many defects come from misunderstood or omitted requirements rather than code that fails to compile or pass tests. | https://news.ycombinator.com/item?id=44006345#44030398, retrieved 2026-07-28 | Supports requiring audience and primary task and including acceptance checks, instead of relying on style rules alone. | A single opinion in a broad discussion and explicitly skeptical that AI can fix poor requirement expression. |
| USR-05 | C | A daily Claude user reports that explicit requirements, managed context, and operation order materially affect efficiency and output quality. The same comment warns that an agent should not turn every small change into a large project. | https://news.ycombinator.com/item?id=46618042#46648146, retrieved 2026-07-28 | Supports structured context, but limits the form to three required inputs and makes advanced constraints optional. | A single experienced user's account, not a controlled comparison. |

### Contradictions And Negative Evidence

- More context is not automatically better. USR-05 explicitly prefers minimal behavior for small changes, and
  USR-02 shows that optimizing broadly for completeness can create damaging scope expansion.
- People are often inaccurate or incomplete when describing software (USR-04). A form can structure a user's
  intent, but it cannot certify that the intent is correct.
- The reviewed public reports concern general coding-agent work, not StyleKit users. The selected feature remains
  an evidence-backed hypothesis until owner testing and an explicitly approved production experiment occur.
- No direct evidence was found that StyleKit users currently fail because they cannot choose among styles. The
  Style Matcher therefore has weaker problem evidence than its low implementation cost might suggest.
- Screenshot-to-code projects expose additional upload, provider, streaming, and failure-state surfaces. Public
  issues such as https://github.com/abi/screenshot-to-code/issues/351 and
  https://github.com/abi/screenshot-to-code/issues/366 show generation ending without usable UI output. These
  examples do not disprove diagnosis value, but they strengthen the case against a shallow upload-based MVP.

## Feature Evidence Inventory

| Feature ID | User outcome | Delivery state | Evidence coverage | Historical gap | Decision |
| --- | --- | --- | --- | --- | --- |
| STYLE-DOC-HARD | Copy strict style rules into a coding assistant | enabled | partial | backfilled | Preserve; behavior is tested, but successful downstream implementation is unverified. |
| STYLE-DOC-SPEC | Use one style definition for implementation and review | enabled | partial | backfilled | Preserve; do not alter its current visual or export contract. |
| STYLE-DOC-CREATIVE | Explore a looser redesign direction | enabled | partial | backfilled | Preserve; not the target of this experiment. |
| STYLE-CONTEXT-LITE | Add project type, brand words, and anti-references to existing prompts | enabled | partial | inherited-unassessed | Adapt; retain compatibility while moving the richer workflow to an explicit artifact. |
| PROJECT-BRIEF-MVP | Turn one selected style and bounded project intent into an agent-ready work order | planned | covered for local implementation | none | Adapt and adopt as a reversible MVP; demand remains unvalidated. |
| STYLE-MATCHER | Recommend styles from project preferences | idea | gap | none | Decline this cycle because no direct selection-failure evidence was found. |
| UI-DIAGNOSIS | Diagnose code or screenshot style drift | idea | partial | none | Decline this cycle due to privacy, reliability, and operational scope. |

## Candidate Matrix

Scores were frozen on 2026-07-28 after the public user-evidence review. Scale: 1 is poor, 5 is strong.
For risk and cost dimensions, 5 means lower risk or lower cost. Scores compare suitability for this
cycle; they are not market-size estimates.

| Dimension | Style matcher | Project brief | Code/screenshot diagnosis |
| --- | ---: | ---: | ---: |
| Problem severity | 3 | 4 | 5 |
| Explore-to-Apply alignment | 2 | 5 | 4 |
| Coverage across 136 styles | 5 | 5 | 3 |
| Time to first value | 4 | 4 | 2 |
| Product-truth safety | 4 | 5 | 2 |
| Privacy and security safety | 5 | 5 | 1 |
| Implementation and maintenance cost | 4 | 4 | 1 |
| Independent measurability | 3 | 5 | 3 |
| Reversibility | 5 | 5 | 3 |
| Future paid Apply compatibility | 2 | 5 | 4 |
| **Total** | **37/50** | **47/50** | **28/50** |

## Final Decision For This Cycle

### Style matcher: decline for this cycle

Reason: it can improve discovery but does not resolve the stronger local gap between viewing and
applying. Revisit only if catalog search and comparison evidence shows that users cannot select a
style in the first place.

### Project Implementation Brief: adapt and adopt as a local MVP

Reason: combine the existing style-specific rules with the useful parts of the Workspace brief,
official agent workflow guidance, explicit states, and acceptance criteria. Keep it anonymous,
deterministic, bounded, and measurable. USR-01 through USR-05 establish a repeated requirements,
scope, and context-management problem across independent users. They do not establish StyleKit demand,
so adoption means "build a reversible experiment," not "the product hypothesis is proven."

### Code or screenshot diagnosis: decline for this cycle

Reason: the problem may be severe, but a trustworthy validator needs upload/privacy controls,
explainable analysis, false-positive handling, and tested repair behavior. Building a shallow version
would violate the product-truth standard and prematurely enter the later Validate hypothesis.

## Open Questions

- Which three inputs deliver most of the value before form completion falls sharply?
- Does the explicit three-field minimum remain understandable without making advanced constraints
  look mandatory?
- Do comma- or newline-separated bounded lists provide enough scope precision without a complex list editor?
- Is a generated result inside the existing context disclosure clearer than adding a fourth document tab?
- Does Project Brief copy add to total implementation actions or merely replace Hard Prompt copy?
- Which later qualitative method can verify that copied briefs reduce correction rounds?

## Evidence Needed After Local Implementation

- Owner usability validation on desktop and mobile.
- At least five task-based reviews of generated briefs using different styles and project types.
- Before deployment, a frozen analytics query and feature-exposure denominator.
- After an explicitly approved deployment, 2-4 weeks of activation and artifact-action data.
- Short interviews or opt-in feedback asking whether the brief reduced restatement or correction work.
