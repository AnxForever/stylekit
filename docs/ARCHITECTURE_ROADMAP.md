# StyleKit Architecture and Product Roadmap

Status: active execution plan  
Created: 2026-07-10  
Baseline commit: `559077988bf9fb1284182ab66b35727cbf6a5653`

## 1. Executive decision

StyleKit should be developed primarily as an **AI coding style infrastructure product**.
Its core user loop is:

1. **Select** a suitable visual style.
2. **Apply** it through tokens, recipes, prompts, templates, or generated files.
3. **Validate** the result with catalog checks, lint rules, accessibility guidance, and quality gates.
4. **Distribute** the same style through the website, shadcn registry, CLI, MCP, Agent Skill, and public JSON endpoints.

The broader resource library—animations, typography, gradients, shadows, backgrounds,
design foundations, and educational content—remains useful only when it increases the
quality or discoverability of this loop. It is not a second independent roadmap.

For the next implementation cycle:

- Pause net-new product surfaces.
- Prefer improving completeness and reliability of existing styles over increasing style count.
- Treat catalog publication and delivery as the highest-leverage architecture seams.
- Keep the modular monolith; there is no evidence that microservices would improve this product.

## 2. Evidence summary

The review found a healthy baseline with several concentrated risks:

- Catalog integrity passes for 135 styles.
- 6,380 unit tests pass.
- TypeScript passes in strict mode.
- ESLint reports no errors and four warnings.
- The repository contains 136 showcase implementations and roughly 197,000 lines of showcase code.
- Full style definitions occupy roughly 2.9 MB of source; recipes occupy roughly 1.4 MB.
- `lib/style-components.tsx` is 4,038 lines / 208 KB and produces a 203,922-byte async client chunk.
- The retired generator contains 8,319 implementation lines plus 624 test lines without a production caller.
- Product history alternates between AI coding infrastructure and a general frontend encyclopedia.

## 3. Architecture vocabulary

This plan uses the following meanings consistently:

- **module**: implementation hidden behind one interface.
- **interface**: everything callers must know, including invariants and failure modes.
- **seam**: where a module interface lives and behavior can vary.
- **adapter**: a concrete implementation at a seam.
- **depth**: the leverage provided by an interface relative to what callers must learn.
- **locality**: related knowledge, changes, bugs, and tests remain concentrated.
- **leverage**: one implementation benefits multiple callers and test paths.

## 4. Target architecture

```text
                         Style authoring input
                                  |
                                  v
                    +---------------------------+
                    | Style publication module  |
                    | validate / project / plan |
                    | commit / rollback         |
                    +---------------------------+
                       |       |       |       |
                       v       v       v       v
                    metadata tokens recipes preview
                       \       |       |       /
                        +------+-------+------+
                                  |
                                  v
                    +---------------------------+
                    | Style delivery module     |
                    | static + community        |
                    +---------------------------+
                         |       |        |
                         v       v        v
                       website  APIs   CLI/MCP/Skill
```

The existing public imports remain stable during migration:

- `@/lib/styles`
- `@/lib/styles/meta`
- `@/lib/styles/recipes`
- `@/lib/styles/tokens-registry`
- `@/lib/recipes`

## 5. Execution phases

### Phase 0 — Restore safe catalog registration

Priority: P0  
Status: in progress

#### Problem

`lib/submit/auto-register.ts` was written before the catalog registries were split.
It still attempts to patch:

- `lib/styles/meta.ts`
- `lib/styles/index.ts`
- `lib/styles/tokens-registry.ts`
- `lib/recipes/index.ts`

The current registration data lives in:

- `lib/styles/meta-registry.ts`
- `lib/styles/registry.ts`
- `lib/styles/tokens-registry-data.ts`
- `lib/recipes/registry.ts`

The existing implementation writes generated files before it knows whether registry
patching can succeed. A structural error can therefore leave a partially registered style.
The route test mocks the registration implementation and cannot detect this failure.

The scaffold recipe generator also contains an extra closing array token in generated recipe
source, so a registration can create invalid TypeScript even if registry patching succeeds.

#### Required behavior

1. Registration plans every source change before writing anything.
2. Planning uses the current split registry files.
3. A missing insertion point produces no filesystem changes.
4. An existing style or target file is rejected before writes.
5. Commit failure restores changed files and removes newly created files where possible.
6. Generated style, tokens, recipes, showcase, cover, metadata, registries, and preview agree on the same slug.
7. Tests exercise the real publication interface against copies of the current registry shapes.

#### Completion criteria

- Focused integration tests pass without mocking the publication module.
- `pnpm run check:catalog` passes after the refactor.
- Generated recipe source parses through TypeScript/Vitest coverage.
- The admin route continues to expose the same HTTP behavior.

### Phase 1 — Deepen the Style publication module

Priority: P1

#### Problem

Adding one style requires maintainers to understand multiple registries and duplicated
representations. Validation detects drift after it occurs instead of making drift difficult
to create.

#### Direction

- Separate authoring input from generated catalog projections.
- Keep one publication plan responsible for all derived writes.
- Make validation and commit/rollback internal implementation details.
- Keep public consumer entry points unchanged.
- Replace regex patching gradually with syntax-aware or generated registry projections.

#### Completion criteria

- A maintainer uses one documented publication interface.
- Registry consistency is guaranteed before commit.
- Catalog checks test the publication interface as well as final registry state.
- Style addition documentation names current files only.

### Phase 2 — Deepen the Style delivery module

Priority: P1

#### Problem

Pages and route handlers branch repeatedly on `source === "static"` or
`source === "community"`. Callers decide how recipes, tokens, versions,
accessibility, and readiness degrade. The storage source leaks across the seam.

#### Direction

- Keep static catalog and approved community submissions as two adapters.
- Centralize capability assembly and fallback rules.
- Let pages, APIs, and exports consume one delivery result.
- Test behavior through the delivery interface rather than adapter internals.

#### Completion criteria

- Public routes do not duplicate source-based branching.
- Static and community behavior have explicit capability tests.
- API responses and detail pages use the same fallback rules.

### Phase 3 — Replace the preview mirror

Priority: P1

#### Problem

`lib/style-components.tsx` manually mirrors style information as four JSX renderers per
style. Catalog cards that need one cover preview load the complete 203,922-byte async chunk.

#### Direction

- Define a compact preview description derived from catalog data.
- Provide one default renderer for most styles.
- Retain bespoke adapters only where the default cannot represent the style.
- Load bespoke preview code by style instead of as one all-style bundle.

#### Completion criteria

- Catalog pages no longer download the complete preview registry.
- New styles receive a usable default preview without handwritten JSX.
- Bundle size and visual regression checks are recorded before and after.

### Phase 4 — Remove retired Generator code

Priority: P2

#### Problem

The public generator surfaces were retired in June 2026, but the implementation and tests
remain. The only non-test dependency is a small generated-file type used by the style
scaffold module.

#### Direction

- Move the small file-output type to the scaffold/publication module.
- Delete unused renderers, scenario storage, ZIP code, templates, and generator-only tests.
- Do not restore the old generator wizard as part of architecture cleanup.

#### Reuse rule

If generation returns later, expose it through the core loop—for example, a focused
`stylekit scaffold` CLI command or an MCP scaffold tool—rather than reviving the previous
standalone product.

#### Completion criteria

- No production import references `lib/generator`.
- Documentation no longer describes retired code as active runtime behavior.
- Unit tests remain focused on live product interfaces.

### Phase 5 — Centralize locale route policy

Priority: P2

#### Problem

Locale behavior is distributed across `proxy.ts`, `lib/i18n/routing.ts`, 24 locale route
modules, metadata helpers, and the sitemap. Some locale modules exist without being selected
by the proxy filesystem-route allowlist.

#### Direction

- Establish one route policy registry.
- Generate or validate redirect, rewrite, metadata, and sitemap behavior from that policy.
- Add route-matrix tests for English and Chinese.

#### Completion criteria

- Adding a localized page changes one policy location.
- Every localized sitemap URL is covered by a route test.
- Locale modules cannot become unreachable silently.

### Phase 6 — Improve existing resource quality

Priority: P2 after architecture stabilization

Use `docs/RESOURCE_QUALITY_AUDIT.md` as the backlog source:

1. Typography fallback stacks and usable Tailwind integration.
2. Radial, conic, and mesh gradients.
3. Multi-layer shadow/elevation systems.
4. Noise and SVG backgrounds.
5. Reduced-motion and performance metadata for animations.

No new resource category should be introduced until these gaps are addressed.

## 6. Latest Codex and GPT-5.6 capabilities used by this plan

The execution workflow can use current Codex capabilities without coupling StyleKit runtime
code to them:

- **Goals**: persist this roadmap and continue across turns.
- **Multi-agent**: parallelize bounded exploration, implementation review, and visual QA.
- **Hooks**: enforce catalog checks and block unsafe repository operations.
- **Skills**: preserve repeatable style-authoring, review, and release workflows.
- **Plugins and MCP**: connect official documentation, GitHub, issue trackers, and other live systems.
- **Browser / Computer Use**: visually verify catalog, showcase, and responsive behavior in the desktop app.
- **GPT-5.6 frontend improvements**: use for design judgment and visual implementation tasks.

API-only GPT-5.6 capabilities—Programmatic Tool Calling, explicit prompt caching, persisted
reasoning, `max` effort, and Pro mode—are relevant only if StyleKit later builds hosted AI
workflows. They are not required for this repository refactor.

## 7. Validation strategy

Each phase uses vertical TDD slices:

1. Add one behavior test through the public interface.
2. Confirm the test fails for the expected reason.
3. Add the minimum implementation.
4. Run the focused test and typecheck.
5. Refactor only while green.

Final validation for each commit group:

```bash
pnpm run security:secrets
pnpm run lint
pnpm exec tsc --noEmit --incremental false
pnpm run check:catalog
pnpm run lint:style-rules
pnpm test
pnpm build
```

Relevant UI phases also run Playwright against desktop and mobile projects.

## 8. Commit plan

1. `docs(architecture): add execution roadmap`
2. `fix(catalog): make style publication safe`
3. `refactor(catalog): deepen publication module`
4. `refactor(styles): centralize delivery capabilities`
5. `perf(preview): replace all-style preview bundle`
6. `refactor(generator): remove retired implementation`
7. `refactor(i18n): centralize locale route policy`

Commits must remain independently buildable and should not combine unrelated phases.

## 9. Explicit non-goals

- Splitting the modular monolith into microservices.
- Reorganizing all style files into new folders without a measured benefit.
- Rewriting all 136 showcases.
- Restoring the retired generator as part of cleanup.
- Adding more resource categories before existing quality gaps are resolved.
- Changing stable public package imports during the first phases.
