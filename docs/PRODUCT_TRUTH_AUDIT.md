# StyleKit Product Truth Audit

Status: baseline audit for monetization Phase 0  
Created: 2026-07-10  
Purpose: identify gaps between public promises and externally usable product behavior before selling packs

The initial seven-day funnel and Pack 1 hypothesis are recorded in
`docs/ICP_PRICE_VALIDATION_BASELINE.md`.

## Status vocabulary

- **working**: an external user can use the capability as described.
- **partial**: a real implementation exists, but the public promise overstates completeness.
- **internal-only**: usable from the repository but not delivered as a public product.
- **unpublished**: implemented but unavailable through the advertised distribution channel.
- **broken**: the documented or linked path cannot complete the promised result.
- **retired**: intentionally removed and should not be advertised as active.

## Baseline findings

| Capability or promise | Status | Evidence | Required action |
| --- | --- | --- | --- |
| Existing 135-style catalog and preview cards | working | Catalog integrity and production build pass | Preserve existing visuals; add screenshot baselines before loading refactors |
| Style detail prompts and rules | working | Served from the static style registry | Keep in free Explore; stop treating prompt quantity as the paid product |
| shadcn style installation | partial | Registry item is `registry:theme` with `files: []` | Describe it as theme installation until packs ship files; build pack registry separately |
| CLI | internal-only; public copy corrected | Package README says it is not published to npm; public pages now show repository-local build commands | Publish and smoke-test before restoring an `npx` claim |
| MCP | internal-only; public copy corrected | Package README says it is not published to npm; public pages now show repository-local build commands | Publish and verify real clients before restoring an `npx` claim |
| `/api/lint` | retired/not advertised | No matching route exists; the stale README endpoint was removed | Reintroduce only under a proven Validate product |
| `/api/match-style` | retired/not advertised | No matching route exists; the stale README endpoint was removed | Reintroduce only with a defined paid or acquisition need |
| Legacy prompt-builder/linter/playground redirects | resolved | Redirect targets now point to existing truthful surfaces | Keep covered by `check:product-truth` |
| Legacy submission redirects | removed | The targets did not exist and no current public submission page replaces them | Restore only with a working public workflow |
| Template source viewing | partial | API returns one `page.tsx` | Label as source preview rather than complete template download |
| Template download | broken as a reusable template | Download contains one file while templates use internal and relative dependencies | Freeze additions; replace with manifest-based multi-file installation |
| Local style image collection | internal-only and partial | 49 style directories / 96 WebP files, with minimal runtime integration | Audit origin and licenses; connect only approved assets through pack manifests |
| Unsplash image-generation workflow | licensing review required | Script caches API search results locally without a pack-level provenance manifest | Do not sell or redistribute generated files before API/license compliance review |
| Standalone animations | partial supporting capability | Animation catalog exists, but style-pack linkage is incomplete | Bind selected primitives to packs instead of expanding the standalone catalog |
| Pointer interaction rooms | partial supporting capability | Only a subset of style pages has a mapped room | Treat as pack interactions; require touch/keyboard contracts |
| Design recipes | partial and inconsistent | Animation references and validation are not aligned | Repair references, then fold recipes into pack compositions |
| Agent Skill | working for repository-distributed guidance | `SKILL.md` can be installed from the repository | Keep as free acquisition; add Pro pack delivery only after license/auth design |
| Voluntary support | working | Alipay, WeChat, and GitHub support paths exist | Keep separate from paid product access |
| Pack purchase and install funnel analytics | missing | No `pack_*` or purchase events exist | Add only when the first tracer-bullet offer is ready |
| Billing, entitlements, and license delivery | missing | No paid-product infrastructure exists | Do not build until purchase intent is validated |

## Product surfaces to freeze immediately

Until the tracer-bullet pack reaches external installation:

- no new style count target;
- no new generic template;
- no new standalone prompt category;
- no new standalone animation or resource encyclopedia category;
- no community or admin feature expansion;
- no visual redesign of existing preview cards;
- no billing/team/enterprise platform build.

## Phase 0 execution order

1. Correct README and developer-facing claims for missing APIs and unpublished packages.
2. Repair or retire redirects that lead to missing pages.
3. Change template wording from reusable download to source preview until multi-file delivery exists.
4. Add a reproducible script or test that verifies advertised routes and package publication claims.
5. Establish a baseline funnel report from existing analytics.
6. Begin the pack manifest foundation without connecting it to current preview rendering.

Automated guard:

```bash
pnpm run check:product-truth
```

The check verifies README API claims, redirect destinations, and public `npx` commands for packages
that their own package documentation marks as unpublished.

## Exit criteria

- Every primary CTA and documented command either works externally or is explicitly labeled internal/unpublished.
- No documentation advertises nonexistent API routes.
- No permanent redirect targets a missing application page.
- Template delivery claims match the actual single-file behavior.
- Pack contracts validate license, assets, motion, interaction, and install references.
- Existing style previews remain unchanged.
