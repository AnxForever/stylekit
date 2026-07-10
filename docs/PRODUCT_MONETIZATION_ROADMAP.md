# StyleKit Product Monetization Roadmap

Status: active product direction  
Created: 2026-07-10  
Owner intent: build toward a sustainable, profitable product without redesigning the approved style previews

## 1. Executive decision

StyleKit will stop behaving like a growing frontend encyclopedia and become a product that
helps AI-coding users ship a complete visual direction into production.

The current product promise is:

> Explore a style for free. Pay to apply it completely.

The current primary product loop is:

1. **Explore** — discover and compare visual directions.
2. **Apply** — install a complete Style Experience Pack into a real project.

**Validate** is a later product hypothesis. It may detect and correct style drift, missing states,
accessibility defects, and motion issues only after a working validator exists. It must not appear in
public navigation or product promises before then.

Prompts, tokens, components, assets, animation, interaction, templates, CLI, MCP, and Agent
Skills are not separate products. They are delivery layers inside this loop.

## 2. Non-negotiable constraints

### 2.1 Existing preview protection

- The current 135 style preview cards are approved visual assets.
- The frozen code baseline is commit `774f9943`; the approved slug inventory lives in
  `tests/visual/approved-preview-baseline.json`.
- Do not change their layout, color, typography, composition, animation, or interaction without
  explicit approval for the exact proposed visual change.
- Existing curated previews always take precedence over generated previews.
- Architecture and performance work must preserve pixel-equivalent output and use fixed-viewport
  screenshot regression checks.
- Visual baselines may not be automatically re-recorded by an agent or CI job. Updating a baseline
  requires explicit approval of the concrete visual difference.
- Desktop, mobile, default, hover, and focus baselines must exist before preview delivery is refactored.

### 2.1.1 Whole-site visual approval

Product decisions to merge navigation, add a pack page, or add a purchase entry do not authorize a
visual implementation. Any user-facing change to layout, color, typography, animation, interaction,
or overall frontend design requires a concrete proposal and explicit approval before implementation.

### 2.2 Generated preview policy

Generated previews are allowed only for future styles and unfinished drafts.

- A generated preview must be marked as `generated`; an approved preview is `curated`.
- Generated previews must never overwrite or silently replace a curated preview.
- The public catalog may use a generated preview for a new style only when its publication status
  explicitly permits it.
- A generated preview is a quality baseline, not a claim that the style has received art direction.
- The renderer should use structured style information and scene archetypes rather than one hard-coded
  button/card/input composition for every style.

### 2.3 Asset and licensing policy

- Every distributed image, video, texture, font, icon, illustration, logo, and audio file requires
  explicit provenance and license metadata.
- Code licensing does not imply asset licensing.
- Remote assets must define availability, privacy, CSP, attribution, and fallback behavior.
- Unsplash-derived cached files are not eligible for paid redistribution until their provenance,
  attribution, API compliance, and redistribution rights are audited.
- Brand logos, branded interfaces, anime/film properties, and artist-identifiable visual directions
  require additional review before inclusion in a commercial pack.
- AI-generated assets must record provider, model, generation date, applicable terms, prompt/provenance
  evidence, and review for trademarks, recognizable people, and artist imitation before commercial use.

### 2.4 Scope discipline

- Do not add a new resource category unless it strengthens Explore, Apply, or Validate.
- Do not expand all 135 styles mechanically.
- Do not build billing infrastructure before a sellable pack and a purchase-intent test exist.
- Do not advertise a CLI, MCP server, route, template download, or validation capability that is not
  actually usable by an external user.

## 3. Project identity

Project: StyleKit  
Initial paying user: an independent developer or small product team using Next.js, React, Tailwind,
shadcn, and an AI coding tool, who can ship functionality but cannot reliably art-direct production UI  
Problem: AI can generate functional UI quickly, but the output is visually generic, inconsistent,
asset-poor, motion-poor, and difficult to maintain across a real product  
Differentiator: one style can be delivered as visual references, tokens, components, assets,
motion, interaction, agent context, installable files, and validation rules from one source  
Hard constraints: solo-maintainer capacity, visual quality, commercial licensing, install reliability,
accessibility, performance, and preservation of existing approved preview work

## 4. Current diagnosis

The project has strong content volume and weak paid-product depth.

- The catalog has 135 styles and 136 showcases, but style data has no distributable asset manifest.
- The shadcn registry currently ships theme variables and no component files.
- Image generation has produced partial local coverage, but assets are not consistently connected to
  style pages, registry output, CLI/MCP delivery, or license metadata.
- Animation, pointer interaction, templates, prompts, educational resources, community features,
  and admin features exist as separate product concepts.
- Some public claims and download paths do not match working runtime behavior.
- Current revenue relies on voluntary support rather than a purchase tied to a concrete result.

The product therefore creates the impression of breadth while the external user still has to do the
hard integration work.

## 5. Product model

### 5.1 Free Explore layer

Free content earns trust and helps users select a direction:

- all existing catalog cards and curated previews;
- style descriptions, philosophy, do/don't guidance, and basic prompts;
- basic color and token previews;
- selected open-source components and motion primitives;
- showcases and a limited number of complete open packs;
- search, collections, SEO guides, and comparison content.

### 5.2 Paid Apply layer

Paid value is implementation completeness and saved production time:

- installable multi-file components and composition blocks;
- a licensed visual asset kit;
- style-specific motion and interaction primitives;
- one or more complete runnable pages;
- full light/dark tokens, states, responsive rules, and accessibility behavior;
- one primary install channel, initially a shadcn-compatible private or entitlement-aware delivery;
- shared metadata that may later power CLI, MCP, and Agent Skill delivery after the main channel works;
- commercial-use license with clear restrictions on source and asset redistribution;
- updates for the purchased pack or collection.

### 5.3 Paid Validate layer

Validation becomes a recurring product only after Apply is proven:

- scan a repository for style drift;
- detect missing hover, focus, disabled, loading, empty, error, and success states;
- check asset provenance and broken references;
- check contrast, keyboard behavior, touch alternatives, and reduced motion;
- enforce animation and bundle-performance budgets;
- produce agent-readable repair instructions or safe automated patches.

### 5.4 Higher-value services and team products

- **Private Brand Kit** — turn a customer's brand material into a private experience pack.
- **Team Library** — private packs, versions, access control, review, and approval.
- **Production Review** — implementation audit and guided remediation.

These are later offers, not prerequisites for validating the initial product.

## 6. Style Experience Pack contract

A pack is a versioned product unit. It should not enlarge the existing `DesignStyle` interface into
another monolith. Use a separate manifest connected by slug.

```ts
interface StyleExperiencePack {
  slug: string;
  version: string;
  tier: "free" | "pro";
  status: "draft" | "preview" | "published" | "retired";
  preview: {
    mode: "curated" | "generated";
    archetype?: "marketing" | "app" | "editorial";
  };
  assets: ExperienceAsset[];
  motion: MotionRecipe[];
  interactions: InteractionPattern[];
  blocks: ExperienceBlock[];
  templates: ExperienceTemplate[];
  delivery: DeliveryTarget[];
  license: PackLicense;
}
```

### 6.1 Asset requirements

Each asset records:

- stable ID and role: hero, background, card, avatar, texture, illustration, icon, or demo-only;
- type, source path, dimensions, aspect ratio, alt text, and content hash;
- creator, source URL, license identifier, attribution, redistribution rights, and modification status;
- light/dark suitability and responsive crop guidance;
- whether it can be copied into a customer's project.

### 6.2 Motion requirements

Each motion recipe records:

- trigger, target, duration, delay, easing, intensity, and repeat behavior;
- mouse, touch, and keyboard equivalents;
- reduced-motion behavior;
- layout/paint/composite performance expectations;
- required package dependencies;
- preview and implementation examples.

### 6.3 Interaction requirements

Each interaction records:

- supported states and state transitions;
- input contracts for pointer, touch, keyboard, and assistive technology;
- focus management and announcements where applicable;
- failure, cancellation, and recovery behavior;
- mobile behavior and minimum target sizes.

### 6.4 Block and template requirements

- Core primitives, composition blocks, and full templates remain separate layers.
- Every installable item declares files, dependencies, registry dependencies, assets, and motion refs.
- Templates must be multi-file runnable outputs, not isolated `page.tsx` downloads with missing internal imports.
- One source manifest should generate website metadata, registry artifacts, CLI/MCP output, and agent context.

## 7. Flagship validation packs

Do not fill all styles. Build three deliberately different vertical slices.

### Pack A — Cyberpunk Neon

Validation target: motion, glow, performance, and immersive interaction.

Minimum contents:

- original or licensed atmospheric assets;
- animated background and lighting primitives;
- interactive navigation, data card, and CTA block;
- reduced-motion static alternative;
- one runnable launch/dashboard page;
- performance budget for blur, shadows, particles, and continuous animation.

### Pack B — Editorial

Validation target: art direction, real imagery, typography, and responsive composition.

Minimum contents:

- licensed image set with crop and attribution metadata;
- image-led hero, story grid, and article/portfolio block;
- image reveal, reading progress, and gallery interaction;
- one runnable magazine or portfolio page;
- asset optimization and responsive-image rules.

### Pack C — Glassmorphism or Claymorphism

Validation target: commercially common product UI and state completeness.

Minimum contents:

- dashboard/application blocks;
- button, form, dialog, table/list, empty, loading, error, and success states;
- restrained micro-interactions and touch behavior;
- one runnable SaaS/product page;
- contrast and blur-performance validation.

The final Pack C choice is based on demand signals from existing analytics and search behavior, not
personal preference.

## 8. Monetization experiments

These are validation ranges, not permanent pricing commitments.

### Experiment 1 — Purchase intent before checkout

- Time box: 30 days after the first priced offer is shown to the target ICP.
- Add no full billing or entitlement platform initially.
- Show a concrete Pack 1 offer containing price, exact deliverables, framework support, license,
  update boundary, refund policy, and expected delivery date.
- A **qualified visitor** is a deduplicated non-bot session from the target ICP that views the price,
  deliverables, and license during the 30-day window.
- A **soft purchase intent** requires a verified email and explicit acceptance of the displayed price.
- A **strong purchase intent** requires checkout start, a paid preorder, or a non-refundable deposit.
- Success threshold: at least 5% soft intent and at least 2% strong intent from 200 qualified visitors.
- Interview evidence is tracked separately: at least 20 target-ICP interviews, with at least 6 users
  accepting the stated price and at least 3 willing to place a deposit.
- If one offer revision still misses both evidence paths, stop Pack platform expansion and reassess the
  offer, ICP, or Private Brand Kit direction.

### Experiment 2 — Founding single-pack sale

- Target range: CNY 99–199 per pack.
- Offer a defined license, deliverables, support boundary, and update policy.
- Time box: 45 days from Pack 1 availability.
- Ten customers are an initial demand signal, not proof of sustainable profitability.
- Pack 1 gate: at least 10 paid customers, refund rate below 20%, clean-project install success above
  90%, and median customer support below 30 minutes per successful install.
- Do not start Pack 2 until Pack 1 passes this gate or a documented exception is explicitly approved.

### Experiment 3 — Founders All Access

- Target range: CNY 399–699 one-time during validation.
- Test only after Pack 1 has real paid customers.
- Include existing flagship packs and a clearly bounded set of future drops.
- Do not promise lifetime production that creates an unsustainable content obligation.

### Experiment 4 — Recurring revenue

Subscription is considered only when monthly value is repeatable through new packs, updates, hosted
MCP access, validation runs, or team features.

Possible later range: CNY 69–129/month for individuals, with separate team pricing.

### Experiment 5 — Private Brand Kit

- Start as a productized service to learn real customer requirements.
- Initial discovery range: CNY 3,000 and above depending on assets, components, and implementation scope.
- Extract reusable platform capabilities only after repeated customer patterns appear.

### Unit economics recorded for every pack

- design, implementation, QA, documentation, and support hours;
- asset creation and licensing cost;
- payment fees, taxes, refunds, and net collected revenue;
- support time and install failure rate;
- contribution margin and break-even unit count;
- maximum production budget: 80 maintainer hours and CNY 1,500 external asset cost for Pack 1 unless
  an explicit exception is approved.

## 9. Product surface decisions

| Surface | Decision | Reason |
| --- | --- | --- |
| Existing style catalog and preview cards | Keep unchanged | Primary acquisition and trust surface |
| Existing showcases | Preserve; stop count growth | High sunk value, useful proof, expensive to expand |
| Style detail, prompts, tokens, components, exports | Merge conceptually into one pack journey | Current core value is fragmented |
| Prompt topic pages | Keep for SEO; reduce primary-navigation weight | Acquisition value, weak direct payment value |
| Animations and pointer interactions | Bind to packs; stop independent expansion | Valuable when they produce a coherent style outcome |
| Templates | Freeze additions; repair delivery | Current single-file downloads are not a complete product |
| shadcn, CLI, MCP, Agent Skill | One Apply delivery module | Strategic differentiation only if genuinely usable |
| Recipes | Repair references; fold into recommended compositions | Current standalone concept is too abstract |
| Gradients, shadows, typography, backgrounds, learning | Consolidate under Learn/supporting resources | Maintain SEO value without multiplying product concepts |
| Generator | Remove retired implementation | Dead code and cognitive load |
| Comments, ratings, favorites, submissions | Freeze expansion; evaluate from usage data | High product/operational complexity, weak proven revenue |
| Blog, guides, newsletter, changelog | Keep selectively | Acquisition, education, and retention |
| Donations | Keep as support only | Not a predictable business model |

## 10. Execution phases

### Phase 0 — Product truth and baseline

Goal: stop product drift before building paid capability.

Deliverables:

- inventory every public promise, route, install command, template download, and API;
- classify each as working, partial, internal-only, unpublished, broken, or retired;
- remove or correct claims that do not match reality;
- record current funnel events and missing monetization events;
- freeze new styles, templates, resources, community features, and visual redesigns.

Exit criteria:

- public documentation and developer pages describe only working capabilities;
- every primary CTA reaches a valid product surface;
- no existing preview visual changed;
- one baseline report records traffic, style views, showcases, copies, exports, and install intent.

### Phase 1 — ICP, price, and offer validation

Goal: test whether the target user will pay before building a broad delivery platform.

Deliverables:

- target-ICP interview script and structured evidence log;
- one priced Pack 1 offer with explicit deliverables and license;
- analytics for qualified offer views, soft intent, strong intent, and interview outcomes;
- a minimal checkout/deposit or manual preorder mechanism;
- explicit visual approval before any public offer page is implemented.

Exit criteria:

- the 30-day evidence threshold is met, or the offer receives one revision and is then stopped/repositioned;
- no platform work is justified by waitlist clicks alone;
- the chosen Pack 1 and price are supported by evidence.

### Phase 2 — Minimal Pack 1 foundation and tracer bullet

Goal: prove the complete Apply pipeline with one small but sellable pack.

Deliverables:

- choose the flagship with the strongest measured demand;
- create one asset set, one motion primitive, one interaction block, and one runnable page;
- install through a shadcn-compatible registry item;
- deliver through one supported primary install channel;
- expose reusable metadata for future CLI/MCP/Skill adapters without publicly promising them;
- define minimum paid delivery: checkout, entitlement/private download or registry access, license
  delivery, version updates, and refund handling;
- run screenshot, keyboard/touch, reduced-motion, install, and bundle checks.

Exit criteria:

- a clean external Next.js project can install and run the pack;
- no StyleKit-internal import leaks into the installed output;
- commercial licensing is explicit;
- users can understand the free/paid difference from the deliverables alone.
- the pack records supported Next.js, React, Tailwind, and shadcn versions, dependency ranges, file
  conflict policy, migration rules, and deprecation policy.

### Phase 3 — Pack 1 paid validation

Goal: verify payment, installation, support cost, and unit economics for the first pack.

Deliverables:

- founding Pack 1 sale;
- install-success and support measurement;
- refund and objection classification;
- production-cost and contribution-margin report.

Exit criteria:

- Pack 1 passes its 45-day gate before Pack 2 starts;
- if demand passes but install success or support cost fails, pause content expansion and repair delivery;
- if only custom service sells, reposition toward Private Brand Kit rather than mass-producing packs.

### Phase 4 — Sequential Pack 2 and Pack 3 decisions

Goal: determine whether the model repeats across categories without committing to all three upfront.

Deliverables:

- Pack 2 only after Pack 1 passes its gate;
- Pack 3 only after Pack 2 reaches a separately documented demand and delivery gate;
- Cyberpunk Neon, Editorial, Glassmorphism, and Claymorphism remain candidates, not promised releases;
- consistent installation and validation;
- real asset provenance;
- stable support and update expectations.

Exit criteria:

- each produced pack has real payment evidence for its own category;
- no "equivalent commitment" substitutes for payment or a defined deposit;
- production cost, net revenue, support cost, and contribution margin support continuation.

### Phase 5 — Scale or stop

Scale only if payment and usage justify it.

Possible scale paths:

- themed pack collections;
- hosted MCP and validation subscription;
- private team libraries;
- Private Brand Kit workflow;
- additional flagship styles chosen by demand.

Stop or reposition if users consume free inspiration but will not pay for implementation completeness.

## 11. Metrics and OKRs

### Objective 1 — Establish a truthful, focused product

- KR1: 100% of primary CTAs and documented install commands are functional.
- KR2: reduce current top-level product concepts to Explore and Apply; keep Validate explicitly future.
- KR3: no unapproved visual regression in existing previews.

### Objective 2 — Prove that complete packs solve a paid problem

- KR1: complete 20 target-ICP conversations and one 30-day priced-offer test.
- KR2: achieve at least 5% soft intent and 2% strong intent from 200 qualified visitors, or meet the
  separately defined interview/deposit threshold.
- KR3: ship Pack 1 only after the offer gate passes.

### Objective 3 — Validate sustainable production economics

- KR1: acquire at least 10 Pack 1 customers within 45 days with refund rate below 20%.
- KR2: record net revenue, all production hours, asset cost, support time, and break-even units.
- KR3: achieve more than 90% clean-project install success and median support below 30 minutes.

### Funnel events

- `style_view`
- `showcase_open`
- `prompt_copy`
- `pack_view`
- `pack_preview_run`
- `pack_install_intent`
- `pack_purchase_intent`
- `pack_purchase`
- `pack_install_success`
- `validation_run`
- `validation_fix_applied`

## 12. Quality gates

Every paid pack must pass:

- TypeScript, lint, unit tests, catalog integrity, and production build;
- deterministic registry generation and clean-project install smoke test;
- fixed-viewport screenshot regression;
- keyboard, touch, focus, and Escape behavior where relevant;
- `prefers-reduced-motion` behavior;
- asset existence, hash, dimensions, alt, provenance, license, and attribution checks;
- no unauthorized remote assets or leaked internal imports;
- bundle and animation-performance budgets;
- light/dark and responsive checks where the pack claims support.

## 13. Primary risks

1. **Asset licensing** — mitigate with mandatory provenance and redistribution fields.
2. **Content-production cost** — mitigate with three vertical slices and measured hours before scale.
3. **Generic-looking generated previews** — mitigate with explicit generated status and curated precedence.
4. **Frontend regressions** — mitigate with immutable current output and screenshot checks.
5. **Overbuilding billing/team systems** — mitigate by validating purchase intent and a manual sale first.
6. **Brand/IP exposure** — mitigate with commercial review and safer flagship selection.
7. **Install failures** — mitigate with clean-project smoke tests and no internal imports.
8. **Animation accessibility/performance** — mitigate with touch/keyboard contracts, reduced motion, and budgets.
9. **SEO traffic without buying intent** — measure qualified funnel events rather than raw page views.
10. **Unsustainable lifetime promises** — bound updates and avoid unlimited commitments during validation.

## 14. Explicit non-goals

- Redesigning existing style preview cards.
- Rewriting all showcases.
- Adding image assets to all 135 styles before validation.
- Launching a generic stock-image marketplace.
- Expanding standalone prompt, animation, template, or learning encyclopedias.
- Building subscriptions, team administration, or enterprise compliance before a paid pack is proven.
- Treating downloaded third-party images as redistributable paid assets without an audit.

## 15. Initial commit sequence

1. `docs(product): define monetization and experience-pack roadmap`
2. `fix(product): align public promises with working capabilities`
3. `feat(packs): add experience-pack manifest contracts`
4. `test(packs): validate assets licenses motion and interactions`
5. `feat(packs): ship first installable tracer-bullet pack`
6. `feat(analytics): measure pack purchase and install intent`
7. `content(packs): complete three flagship validation packs`

Each commit remains independently buildable and must not include unapproved visual changes to existing
style previews.
