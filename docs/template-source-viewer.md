# Template project source viewer

## Purpose

People should be able to inspect and copy the source needed to recreate a
template before downloading it. The previous gallery action only showed the
entry page, which imported unlisted components, data, and CSS in multi-file
templates such as Technical Profile, Editorial Profile Archive, and Admin Panel.

## Decisions and evidence

- The project exporter already produces a complete, import-closed set of files.
  Reuse that set so preview and download cannot independently omit dependencies.
- Preserve the existing `/api/templates/:slug/source` response. Opt in with
  `?view=project` for named text files and a list of binary asset paths; binary
  base64 is omitted from the viewer payload.
- Preserve the complete asset API used by CLI and MCP, and the ZIP endpoint.
- Replace the existing source modal with a file browser. Card actions are
  View Source and Download Project; copying happens inside the viewer and
  clearly copies only the selected file.
- Use the shared clipboard hook for honest success/failure feedback. A closed
  dialog or newer request must never be replaced by a late response.
- Keep native dialog behavior, a visible named close button, contained scrolling,
  and focus return to the opener. Follow the
  [WAI dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
  and [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines).

## Feature evidence ledger

| ID | Outcome and lifecycle | Evidence / choice | Delivery / current coverage / history |
| --- | --- | --- | --- |
| TS-FILES | Open a template, inspect each file, distinguish binary assets, download the same project | Existing exporter and multi-file templates establish the missing dependency boundary. Adapt the existing API with an opt-in representation. | Implemented / covered: endpoint and ZIP parity tests, desktop/mobile file selection / backfilled |
| TS-COPY | Copy one selected file and receive accurate feedback, including clipboard rejection | Existing useClipboard handles stale requests and failures. Reuse it; remove duplicate card-level copy. | Implemented / covered: exact CSS copy and blocked-clipboard browser cases / backfilled |
| TS-LIFECYCLE | Load, retry, close, reopen or switch templates without stale code or misplaced focus | Existing dialog opened after awaiting fetch, with no request cancellation. Native dialog plus controlled request lifecycle follows WAI guidance. | Implemented / covered: retry, late-response close/reopen, Escape and focus-return browser cases / backfilled |

Acceptance includes mobile layout, keyboard/Escape/focus return, slow requests,
failed fetch/retry, blocked clipboard, multi-file CSS selection and copying,
text/binary boundaries, API compatibility, and unchanged project downloads.

Browser verification additionally caught two lifecycle edges: clicks on a
server-rendered source button before hydration, and queued close events from
React Strict Mode effect replay. The button becomes available when handlers
are ready, and the dialog ignores stale close events when it is already open
again. The same E2E cases run against development and production builds.
