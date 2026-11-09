# Core quality audit — 2026-11-08

Baseline: committed development revision `3ebced40`, Next.js 16.4.5, React
19.2.3 and MCP TypeScript SDK 1.30.0. The review focused on finding a style,
reading its design document and giving reliable implementation context to an
agent. User experiments and unfinished Liquid Glass changes were preserved.

## Confirmed defects and repairs

| Area | Evidence | Repair |
| --- | --- | --- |
| Catalog filter URLs | The picker had 13 current tags; the parser accepted only four of them plus three retired values. | Parser and picker now use `STYLE_TAGS`; all current values and retired values have regression cases. |
| Catalog return state | Changing or clearing filters could leave a saved return URL that reapplied old filters later. | Explicit filter changes invalidate the old return destination; cards still save the current URL and ordinary history back remains intact. |
| Editorial source consistency | Its canonical document allowed Mauve `#816d70`, legacy rules banned every accent, token export used red and lightweight metadata used a different palette. | The existing limited Mauve exception is consistent across metadata, rich definition, tokens, document, prompts and brief; other styles and recipe classes are unchanged. |
| Agent context delivery | Reconstructing the handler text with five public API samples produced 34,602–51,877 characters, above the 25,000-character cutoff. | `include: ["brief"]` prioritizes the complete canonical Markdown. Oversized explicit sections get clear narrower-call/HTTP-URL guidance, not cut JSON. Structured fields and schemas remain compatible. |
| Contributor verification | Native Windows pnpm could not find `rm`; typecheck also removed the development output tree. | Build uses the already-validated Webpack path; typecheck uses `next typegen` then `tsc --noEmit` without deleting `.next/dev`. |
| Line-height feedback | A readability field inferred body line height from section-padding classes. | It now reports `not-evaluated` and displays “Not assessed”; the score algorithm is unchanged. |

The homepage Agent button was also removed at the owner's request. The
contextual action remains above the style document, offering Claude Code and
Codex with one copyable terminal command each.

## Research and verification evidence

Context7 was used through its official MCP endpoint: library resolution and
documentation queries for Next.js and the MCP TypeScript SDK. Its fixed Next.js
index did not include 16.4.5, so the retrieved 16.2.9 guidance was cross-checked
against the installed 16.4.5 guides. MCP v1.x guidance was checked against the
installed 1.30.0 types rather than borrowing incompatible v2 interfaces.

- [Next.js route type generation](https://github.com/vercel/next.js/blob/v16.2.9/docs/01-app/03-api-reference/06-cli/next.mdx): use `next typegen` before independent type checking.
- [Server/client component guidance](https://github.com/vercel/next.js/blob/v16.2.9/docs/01-app/01-getting-started/05-server-and-client-components.mdx): keep client interactivity local and pass serializable inputs.
- [MCP v1 server documentation](https://github.com/modelcontextprotocol/typescript-sdk/blob/v1.x/docs/server.md): typed structured results and resource contracts. This repair does not emit `resource_link` entries for resources the server has not registered for reading.
- [Web Vitals](https://web.dev/articles/vitals): field loading, interaction and stability measurements are separate from payload size or a local timing sample.

The current catalog has 150 complete documents. Local rendering found the
longest English document at 14,172 characters, leaving room for normal brief
text inside the existing budget. Regression cases also cover oversized future
documents, bundled sources without a complete document, URL configuration and
MCP 1.30.0 result-schema parsing.

The root lint, route typecheck, 330 test files and production build passed;
8,332 tests passed and one was skipped. Core, CLI and MCP packages were rebuilt.
Built production HTML confirms no homepage Agent trigger and exactly one in
the style document; rebuilt SDK data confirms the corrected Editorial palette
and unassessed line-height field. Approved cover renderers and stored PNG
baselines were not changed. The shared-key source refactor and Editorial-only
metadata correction have explicit source-review records.

## Remaining priorities

1. **Content consistency across the catalog.** Editorial demonstrates that
   field presence and recipe class checks do not catch semantic contradictions.
   Additional metadata/rich-palette differences are review candidates, not
   automatically wrong values. Move toward explicit color roles and a reviewed
   source of truth before generating or validating projections in bulk.
2. **Real agent output quality.** Clipboard, schema and unit checks do not show
   that Claude Code or Codex produces a faithful page. Establish a small fixed
   evaluation set: three styles, two page tasks and both agents, recording
   document hashes, agent versions, outputs, screenshots and human review.
3. **Performance attribution.** Local desktop samples and compressed asset
   sizes are useful baselines, not field LCP/INP or proof of a slow site. Profile
   the largest shared chunks and mobile execution before changing page layout
   or adding another UI/runtime framework.
4. **Measurement and observability.** Accessibility grades remain token-based
   estimates, not rendered-page WCAG conformance. Sentry's request-error hook
   and client-entry migration warnings need isolated event tests if monitoring
   is enabled; production DSN state was not inspected.
5. **Authoring and distribution.** Legacy Chinese prompt paths contain English
   rule blocks that need language review. The publisher still needs an authored
   DesignSpec registration outside its own projections. Website, MCP process
   and published packages require separate release verification.

## Verification limits

No real model was called, no target agent was installed/configured and no
production database or private environment was inspected. Public style GETs
during the initial sample may have incremented anonymous API usage; historical
records were not edited. Later checks stayed local.

Browser baselines were captured before the original Ego task space disappeared.
Its post-fix graphical replay was not completed. Automatic approval also rejected
launching a background preview and HTTP smoke process with only “blocked by
policy” as its reason. Final post-fix checks therefore used production artifacts,
rebuilt data and in-process tests; live HTTP transport and real Claude Code/Codex
acceptance remain unverified. These repairs have not been deployed or published.
