# Approved Preview Visual Baseline

The 135 existing StyleKit preview designs are approved product assets. Their visual baseline is
compare-only: normal development and CI may compare screenshots, but may not record or update them.

## Coverage

- every approved `coverPreview` at the fixed desktop Chromium viewport;
- every approved `coverPreview` at the fixed Pixel 5 mobile viewport;
- the shared catalog card in default, hover, and keyboard-focus states on both viewports;
- light color scheme, Chinese locale, loaded Geist fonts, reduced motion, disabled screenshot
  animations, and CSS-pixel capture.

The approved slug inventory is `tests/visual/approved-preview-baseline.json`. Source hashes for the
preview registry and its public wrappers are frozen in
`tests/visual/approved-preview-source-baseline.json` so a source change fails before browser tests.
Every approved PNG is also frozen in `tests/visual/approved-preview-snapshot-hashes.json`. Running a
Playwright snapshot-update flag alone therefore leaves the repository failing until an explicitly
approved hash-baseline change is reviewed as well.

## Compare-only commands

```bash
pnpm run test:preview-visual
```

The command never updates snapshots. CI runs the same comparison on pull requests and protected
branch pushes.

## Baseline changes

Do not run Playwright snapshot-update flags as part of normal work, an agent workflow, or CI.
Changing an approved screenshot requires all of the following:

1. explicit user approval for the concrete visual difference;
2. before/after screenshots for the affected slug and viewport/state;
3. a written reason and affected-slug list in the review record;
4. manual recording in a dedicated, reviewed change after approval;
5. source-hash baseline updates only for the approved files.

Product, architecture, performance, dependency, or refactor approval does not imply visual approval.
