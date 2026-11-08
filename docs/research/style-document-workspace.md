# Style document reading and delivery

Evidence reviewed on 2026-11-08. Scope: improve document reading and complete
design.md delivery while retaining the owner's original detail-page layout.

## Owner's layout decision

After reviewing the first implementation, the owner asked to retain StyleKit's
original layout. The Refero-style document sidebar is withdrawn. Keep the
original hero, summary cards, showcase and palette positions, followed by the
section navigation and full-width document. Reading-view controls and reliable
copy/API delivery remain useful independently of that layout experiment.

## Current behavior and historical gap

StyleKit already renders one complete localized document on the server, then
reuses that string for preview, clipboard, download and AI handoff. Search,
filters, showcases, related styles and six client setup guides already exist.
These features are not new outcomes of this research.

The original detail layout puts document actions after the hero. In one live
desktop observation at 2048 × 994, the document began at y=1024 and its Copy
action at y=1248. The hero's Export action was an anchor to that lower section.
This records one viewport, not a conversion or performance measurement, and it
does not justify overriding the owner's preferred composition.

The canonical document API also still accepted a compact density that omitted
parts of the document. That historical behavior conflicts with the owner's
requirement that each style provide one complete design.md.

## Evidence and decisions

| Feature | Primary evidence | Decision | Verification |
| --- | --- | --- | --- |
| Visual preview beside the document | [Refero detail](https://styles.refero.design/style/c60f05ff-2420-4a24-92db-80c4b6a74683), live desktop browser; owner's review of the adaptation | REJECT the layout adaptation; restore StyleKit's original section order and full-width document | Browser: original hero and preview positions, document below navigation; no duplicate document |
| One complete document, two reading views | Existing shared renderer plus Refero's visible Markdown source | ADAPT: rendered preview and source share the same complete string | Toggle view, then copy/download; payload stays identical |
| Complete API output | Local route and renderer show compact omitted guidance | FIX: canonical md always extended, including old compact queries | Compare default and compact-query responses with the shared full renderer |
| Reusable AI connection setup | Existing StyleKit client adapters; [shadcn MCP](https://ui.shadcn.com/docs/mcp) | REUSE current setup; no second client integration layer | Existing client and style handoff tests |
| Template and look composition | [DesignPrompts](https://designprompts.dev/), live: Clear Day → Get prompt, matching preview, outline and build goal | LEARN-FROM for a separate future flow | Not implemented in this change |
| Live editor controls and preview | [tweakcn](https://tweakcn.com/) and its [source](https://github.com/jnsahaj/tweakcn) | LEARN-FROM; copying a full editor would duplicate existing responsibilities | No editor runtime or dependencies added |

No competitor code or media is copied in this change. The implementation adapts
product interaction patterns using existing StyleKit components. Refero's
Compact/Extended controls are deliberately excluded to honor the single-file
requirement; public token formats and legacy compatibility routes remain.

## Edge cases and acceptance

1. On narrow screens, use a natural single-column reading order and keep actions
   usable without horizontal page overflow.
2. Light and dark themes use existing semantic colors.
3. Missing design specs show the existing unavailable state without copy,
   download or AI actions.
4. Clipboard failure exposes selectable complete text through the existing
   feedback component and does not claim success.
5. Switching reading views, rerendering localized content or receiving revised
   Markdown must not make copy/download use an earlier document.
6. The initial HTML keeps the rendered document readable before hydration.
7. The layout renders DesignMdSection once; public APIs, showcase routes and
   AI client setup remain available.

Changes are local and reversible in Git. No production state, account setup,
third-party write access or newly generated prompt variant is required.

## Document AI action

The owner subsequently requested the AI action above the prompt, using Refero's
button form while preserving StyleKit's restored page layout. The reference
uses a compact filled button, small radius, a fixed label surrounding rotating
tool marks and an up-right arrow. Adapt that form only in the document toolbar;
keep the selected-style context and original page layout. Local marks come from
LobeHub's MIT-licensed static SVG package, with
the version and license retained in `public/ai-clients/`.

Verify both locales, mobile wrapping, light/dark contrast, reduced-motion static
behavior and current-style handoff. Button position changes no document payload
and does not automatically establish an AI connection.

## Catalogue navigation fixes

- Shared tag query parsing now uses `STYLE_TAGS`, the tag vocabulary used by
  the picker and submission validator. Regression coverage round-trips all 13
  current tags and rejects the three retired category names.
- Any user-driven filter update clears the saved catalogue return URL, so an
  individual tag/search clear cannot revive older criteria on a later visit.
  The browser-history back path retains its existing return behavior.

## Simplified agent setup

The owner found the six-client dialog and repeated configuration/document panels
too complex. This reopens the earlier setup decision: the primary entry now
focuses on Claude Code and Codex, using two choices and one terminal command.
[Kage](https://kage.design/mcp-setup) and [shadcn](https://ui.shadcn.com/docs/mcp)
both separate client selection from a short copyable setup command. The command
forms were checked against [OpenAI's official quickstart](https://developers.openai.com/learn/docs-mcp)
and [Claude Code's MCP reference](https://code.claude.com/docs/en/mcp).

The optional current-style action copies usage instructions; the modal does not
repeat the complete design.md. Other client adapters and developer documentation
remain compatibility paths. Verify command switching/copy, selected-style
handoff, clipboard failure, keyboard closing and a compact mobile dialog. A
copied command is not a successful connection signal; no client settings are
written by this interface.
