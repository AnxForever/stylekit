# CI Required Checks

Use this list when configuring branch protection / rulesets for `main`.

## Recommended required status checks

- `Lint`
- `Typecheck`
- `Test`
- `Build`
- `Style Extractor Checks`

## Notes

- `Style Extractor Checks` comes from `.github/workflows/style-extractor-ci.yml`.
- The workflow runs on every PR/push to `main` so it can be marked as a required check.
- Heavy steps are skipped automatically when no style-extractor files changed.
