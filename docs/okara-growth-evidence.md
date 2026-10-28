# Okara growth recommendations: evidence and delivery

Reviewed: 2026-10-20. Authoritative checkout: `D:\stylekit`. Scope: improve the existing StyleKit website using the
readable recommendations in the owner's [Okara CMO workspace](https://okara.ai/agent/cmo/b9c26363-cff1-4954-8939-acaaaefacd34).

The SEO-specific follow-up, its actual Okara CMO advice, technical/content fixes
and verification are recorded separately in [okara-seo-evidence.md](okara-seo-evidence.md).

## Source assessment

The Marketing Strategy and Product Information documents were readable in the
logged-in browser. Competitor Analysis and Design Guide opened a subscription
dialog, so their contents were not assessed. SEO/GEO agents were locked. No
subscription, outreach, social publication or production deployment is part of
this change.

Adopt the developer audience, outcome-led positioning, scenario discovery and
the choose-style / export-rules / build workflow. The current homepage already
states the intended outcome and provides scenario filters; retain its typography
and live style previews rather than rebuilding the visual identity.

Adapt the proposed trial CTA to a free browse action and a practical guide.
Reject unsupported claims about designer authorship, paid SaaS tiers, trials,
storage, team quotas, payment methods and guaranteed outcomes. The Product
Information document included these claims without evidence of a corresponding
StyleKit service. Template content must be distinguished from actual product
terms. Existing product-truth checks and metadata do not establish that an
external summarizer interprets every demo correctly; this is an inherited gap.

The site already has indexable style detail pages with rules and examples, so
reuse those destinations instead of adding a second thin page for the same
style query. Distribution tasks in the 30-day roadmap remain outside this
website implementation.

Primary guidance: [Google's robots and snippet controls](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
supports a server-rendered `data-nosnippet` region around sample template text.
This restricts Google's snippets, not all AI extraction and not page indexing.
Keep the visible notice and real template description outside that region.
[Google's structured data policy](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
requires structured claims to describe visible, accurate content; there is no
ranking or AI citation guarantee. The existing template gallery and template
detail pages remain discoverable.

## Feature evidence ledger

| ID | Lifecycle and user outcome | Delivery | Evidence and decision | Acceptance and failure cases | Coverage / history |
| --- | --- | --- | --- | --- | --- |
| GROW-01 | First visit / understand the product and start without a signup detour | Implemented; locally verified | Bilingual homepage copy names the audience and resources; free access is scoped to public styles, prompts and rule exports. The secondary CTA opens the guide. Existing typography, scenario discovery and previews remain. | Ego checked English and Chinese destinations, FAQ disclosure and a 390px viewport with no horizontal overflow. No trial or generated-result promises were added. | Covered within this change / backfilled |
| GROW-02 | First use / choose a style, take its constraints into an AI tool and review the output | Implemented; locally verified | Shared three-step content connects the homepage and guide to an actual Neo-Brutalist style/export example. The guide supplies a copyable brief, an explicit rule placeholder and a review checklist. | Tests and Ego cover localized anchors, exact clipboard-request payload, clipboard-denied manual fallback and language-specific content. Focus states and a single success announcement are present. No external AI generation or installation was tested. | Covered within this change / backfilled |
| GROW-03 | Discovery / distinguish a template's sample business from StyleKit | Implemented; locally verified | Template details show a bilingual notice, describe the demo in page/social metadata, and mark sample children with server-rendered data-nosnippet. Three LLM discovery responses carry the same fact boundary. | Layout/domain tests cover detail versus gallery paths, title objects and all three LLM responses. Ego checked both pricing-demo locales, visible notice outside sample content, continued indexability and an unwrapped gallery. | Covered within this change / backfilled |

## Validation

All verification below ran against `D:\stylekit` on Windows:

- `pnpm run lint`: passed, zero errors and 39 existing warnings in the combined
  working tree. Focused lint on the final changed implementation/tests also passed.
- `npx --no-install tsc --noEmit`: passed. The final production build also passed
  its TypeScript phase.
- `pnpm run test --maxWorkers=2`: 301 files passed; 8,054 tests passed and one
  skipped. Final focused guide/demo suites also passed all 11 tests. A stale test
  expectation for the metadata sentence was corrected before this final run.
- `pnpm run build`: passed; all 2,224 static pages generated. The final build
  includes the keyboard-focus and copy-announcement adjustments.
- `pnpm run check:seo-truth`: passed, checking 1,146 sitemap URLs and discovery
  claims. `pnpm run security:secrets` passed.

Ego acceptance used the local development server at `http://localhost:3000`.
It covered both locales, homepage-to-guide-to-style navigation, the actual
export anchor, FAQ disclosure, 390px responsive layout, and template demo
metadata/disclosure. Clipboard requests were intercepted and matched to the
complete displayed brief; denial produced a manual-copy field. This did not
write to the operating-system clipboard. Desktop/mobile screenshots were
reviewed and retained outside the repository.

The local development server is available on its original port 3000. These
checks do not prove a production deployment, SEO ranking improvement, output
quality from an external model or a refreshed Okara analysis. No code was
committed, pushed or deployed by this task.

The current checkout already contained unrelated changes in repair, the
developer toolkit, CLI/core/MCP packages and experimental diffusion routes.
Keep them intact and report verification against the combined working tree.
The chat initially pointed at an obsolete WSL copy; only the scoped changes
were reapplied to the confirmed Windows checkout. Verification from the old
copy does not count as acceptance of this checkout.
