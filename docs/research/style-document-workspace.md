# Style document workspace

Evidence reviewed on 2026-11-08. Scope: reduce the steps between choosing a
style, seeing its result and taking its complete design.md into an AI tool.

## Current behavior and historical gap

StyleKit already renders one complete localized document on the server, then
reuses that string for preview, clipboard, download and AI handoff. Search,
filters, showcases, related styles and six client setup guides already exist.
These features are not new outcomes of this research.

The old detail layout put document actions after the large hero. In one live
desktop observation at 2048 × 994, the document began at y=1024 and its Copy
action at y=1248. The hero's Export action was an anchor to that lower section.
This is evidence of an extra step at that viewport, not a general conversion or
performance measurement.

The canonical document API also still accepted a compact density that omitted
parts of the document. That historical behavior conflicts with the owner's
requirement that each style provide one complete design.md.

## Evidence and decisions

| Feature | Primary evidence | Decision | Verification |
| --- | --- | --- | --- |
| Visual preview beside the document | [Refero detail](https://styles.refero.design/style/c60f05ff-2420-4a24-92db-80c4b6a74683), live desktop browser: visual reference left, document and actions right | ADAPT with StyleKit's existing component and theme tokens | Desktop browser: document actions visible in initial workspace; no duplicate document |
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
