# Content quality follow-up — 2026-11-09

Baseline: development revision `4b72dbd8`. This continues the
[core quality audit](core-quality-audit-2026-11-08.md), using the existing local
definitions and delivery paths. The scope is content and contributor checks;
the established page layout and two-agent setup remain in place.

## Repairs

| Finding | Change | Evidence |
| --- | --- | --- |
| Nineteen legacy Chinese rule fields contained English instructions. | Translate the Chinese `aiRules` prose, preserving each existing `aiRulesEn`, code sample, color and numeric constraint. | Compare the raw definitions before normalization; exercise Chinese and English hard prompts and the legacy Markdown handler. |
| Glassmorphism metadata still advertised the previous purple/pink palette and high-opacity glass. | Match the existing nocturne rich definition and approved glass preview: 8%/5% white, night blue, moonlight and champagne. | Only this style's three color fields change among 150 metadata entries. The canonical palette and renderer already use these colors. |
| The fast catalog preflight did not require a complete authored document. | Report a missing DesignSpec or a registered stub before a curated catalog is accepted. | Tests cover full, missing and stub documents, plus an unpublished future spec. |

The nineteen translations affect `cel-shading`, `film-noir`, `indian-festive`,
`african-textile`, `witchcore`, `neon-tokyo`, `dopamine-design`, `linear-style`,
`shopify-clean`, `luxury-retail`, `fresh-market`, `data-dense`,
`horizontal-gallery`, `latex-paper`, `distill-style`, `studio-bold`,
`warm-organic`, `pastel-ui` and `soft-utility`.

Ten pairs of raw Chinese/English rule fields were identical; nine contained
different English wording. Each Chinese field was translated independently,
without replacing the separate English version. The canonical bilingual
`design.md` uses DesignSpec rather than these legacy fields; its content is
unchanged. Compatibility endpoints and package fields remain available.

Translated plain-text headings need explicit Markdown markers: the existing
normalizer recognizes English uppercase headings and Markdown, but does not
parse unmarked Chinese headings. Five translations keep recognizable section
boundaries so required/forbidden rules retain their polarity. Existing conflict
and delivery-regression tests pass without changing the prompt baseline.

The publisher still produces its existing seven files and updates six
registries. Its input contract and dry-run fixture are unchanged: authors must
separately create and register the full DesignSpec. The preflight does not
generate placeholder design documents.

## Palette review boundary

Twenty-one metadata/rich-palette differences were reviewed against semantic
color roles, recipes, showcases and small previews. Different field values are
not sufficient evidence of a defect. For example, Gothic, Outrun and Cyber
Chinese use a background as their metadata second color while retaining the
second brand color elsewhere in the swatches.

Several definitions and full showcases have also diverged from the approved
small previews. These include Steampunk, Pop Art, Solarpunk, JRPG, Mecha,
Watercolor Art, Neon Samurai, Magic Circle, Cyber Wafuu, Art Nouveau, Surrealism
and Ukiyo-e Digital. Their metadata changes are deferred with the corresponding
preview decision; changing swatches alone would leave the disagreement in place.
Near-color variations and optional accent omissions remain review findings,
not automatic corrections.

Only Glassmorphism has been corrected here because its rich palette, canonical
document and approved preview agree. Its recipe still contains older blue
accent and opacity choices; that is a separate source conflict to review against
the authored recipe behavior. Stored PNG baselines and preview component source
are unchanged. The metadata source hash has an explicit scoped review record.
The curated color-page fixture now uses the actual champagne swatch, while pure
color-math tests retain their existing samples. Public color membership follows
the catalog palette; a future production release must regenerate the Nginx
color allow map as described in the deployment runbook.

## Verification

Local route type generation/typecheck, production build and all 331 root test
files pass: 8,355 tests passed and one was skipped. Core, CLI and MCP packages
were rebuilt. The full lint script passes with debug logging, reporting the
same 36 warnings and zero errors. Two ordinary lint attempts exited with the
Windows native code `0xC0000005`; diagnostic runs passed, but the cause is not
confirmed. No lint rules were disabled to obtain a pass.

AST comparison confirms that all nineteen English fields and all source outside
the Chinese rule values are unchanged; code fences, inline code, color values
and numeric constraints are preserved. In-process checks cover 38 legacy
Markdown responses, 19 rebuilt SDK styles and unchanged hashes for all 300
canonical document locale variants. The full prompt delivery guard and approved
preview source/image guards pass with their existing prompt and PNG baselines.

The catalog preflight accepts the current 150 complete documents. The raw rule
language diagnostic now reports zero wrong-language fields. Its 44 structural
review candidates are not 44 confirmed missing rules: plain uppercase English
headings and equivalent Chinese Markdown headings count differently in this
diagnostic. The delivered-prompt regression guard is the check for lost content.

This review does not establish real Claude Code/Codex generation quality,
rendered visual acceptance, live HTTP behavior or a production release. The
earlier Context7 research remains applicable; this follow-up introduces no new
framework or MCP protocol behavior.
