# StyleKit Overseas GitHub Launch Pack

Status: prepared GitHub launch materials
Created: 2026-07-22
Related:

- `docs/OVERSEAS_COMMUNITY_LAUNCH_PLAN.md`
- `docs/OVERSEAS_LAUNCH_ASSETS.md`
- `docs/PRODUCT_TRUTH_AUDIT.md`

This pack prepares the GitHub side of the overseas launch without changing the website frontend. Use it before Hacker News, Reddit, or Product Hunt so overseas visitors see a credible repository entry point.

## Pre-Launch Gate

Do not post to major overseas channels until these are true:

- [x] `pnpm run check:product-truth` passes.
- [x] `pnpm run check:seo-truth` passes, or any failure is explicitly documented and not visible as a public overclaim.
- [x] The public catalog count is decided: the approved public launch baseline is 136 curated styles.
- [x] GitHub has either a release or a pinned Discussion for overseas feedback.
- [x] README top copy matches the launch one-liner.
- [ ] The maintainer can reply to GitHub/HN/Product Hunt feedback for at least 6 hours after launch.

Current gate status on 2026-07-22:

- `check:product-truth`: passed.
- `check:seo-truth`: passed.
- Public catalog count decision: use 136 curated styles as the approved overseas launch claim.
- Public feedback entry points: GitHub release `v0.1-overseas-preview` and issue `#11`.
- Remaining external gate: keep a 6-hour maintainer reply window open after major community posts.

## Release Draft

Suggested tag:

```text
v0.1-overseas-preview
```

Suggested title:

```text
StyleKit overseas preview: visual styles and AI prompts for generated UI
```

Release notes:

```markdown
StyleKit is preparing for a broader overseas developer launch.

The core promise:

> Open-source visual styles, tokens, and AI prompts for less generic AI-generated UI.

What is usable today:

- Browse the public English style catalog.
- Open style pages for tokens, prompt guidance, implementation rules, and component recipes.
- Install shadcn theme tokens from registry endpoints.
- Use StyleKit guidance in Cursor, Claude Code, v0, Windsurf, and similar AI coding tools.

Known boundaries:

- The shadcn command installs theme tokens, not a complete component system.
- CLI and MCP packages are contributor previews from a local checkout and are not published to npm.
- StyleKit gives AI tools stronger visual constraints; it does not guarantee production-ready AI output.
- Paid production packs are not part of this preview release.

Feedback wanted:

- Which styles are useful for real product UI?
- Which style records are too vague for implementation?
- What would make this easier to use in your AI coding workflow?
- Which public claims or docs should be clarified before a Show HN launch?

Try it:

- Website: https://www.stylekit.top/en
- Styles: https://www.stylekit.top/en/styles
- Developers: https://www.stylekit.top/en/developers
```

## Pinned Discussion Draft

Discussion category:

```text
General
```

Title:

```text
Overseas launch feedback: using StyleKit in AI coding workflows
```

Body:

```markdown
StyleKit is preparing for a broader overseas community launch. The current focus is open-source feedback, not paid packs.

The core promise:

> Open-source visual styles, tokens, and AI prompts for less generic AI-generated UI.

What to try:

- Browse the English style catalog: https://www.stylekit.top/en/styles?utm_source=github&utm_medium=community&utm_campaign=overseas-launch-2026-08&utm_content=pinned-discussion
- Open a style and inspect its tokens, prompts, recipes, and rules.
- Copy a shadcn theme command from a style page.
- Use the style guidance in Cursor, Claude Code, v0, Windsurf, or another AI coding tool.

Known boundaries:

- shadcn installs theme tokens, not a complete component system;
- CLI and MCP packages are contributor previews from a local checkout;
- paid production packs are not part of this launch promise.

Feedback wanted:

- Which styles feel useful for real product UI?
- Which style records are too vague to guide implementation?
- What would make StyleKit easier to use inside your AI coding workflow?
- What should be removed, renamed, or clarified before a Show HN launch?
```

## GitHub Issue Seeds

Create these manually only if they reflect actual work you want tracked.

### Issue 1: Publish Overseas Feedback Entry Point

```markdown
## Goal

Create either a GitHub release or a pinned Discussion before the first major overseas post.

## Scope

- Use the release or Discussion copy from `docs/OVERSEAS_GITHUB_LAUNCH_PACK.md`.
- Link to the English catalog and developers page with prepared UTM links.
- Keep boundaries explicit: shadcn installs theme tokens; CLI/MCP are contributor previews.

## Acceptance Criteria

- Public URL is available.
- URL is recorded in `docs/OVERSEAS_COMMUNITY_LAUNCH_PLAN.md`.
- Maintainer is ready to respond for at least 6 hours after posting to HN/Product Hunt.
```

### Issue 2: Create First Wave 1 Feedback Post

```markdown
## Goal

Post one low-risk overseas feedback request before Show HN or Product Hunt.

## Scope

- Use `docs/OVERSEAS_LAUNCH_ASSETS.md` Reddit or DEV.to copy as a starting point.
- Read the target community rules before posting.
- Link to the English catalog with the prepared UTM link.
- Keep boundaries explicit: shadcn installs theme tokens; CLI/MCP are contributor previews.

## Acceptance Criteria

- Public URL is available.
- URL, UTM, and first objections are recorded in `docs/OVERSEAS_COMMUNITY_LAUNCH_PLAN.md`.
- No cross-posting the same text into multiple communities.
```

### Issue 3: Launch Response Log

```markdown
## Goal

Record feedback from each overseas launch channel.

## Template

Channel:
Date:
URL:
UTM:
Visits:
Style detail views:
Copies:
GitHub clicks:
Stars gained:
Newsletter signups:
Top praise:
Top objections:
Confusing copy:
Action items:
Decision:
```

## Suggested Labels

Use existing labels if they already exist. Otherwise create:

- `launch`
- `overseas`
- `feedback`
- `docs`
- `product-truth`
- `analytics`

## Maintainer Reply Principles

- Be precise about what is usable today.
- Admit early-stage boundaries quickly.
- Do not argue taste preferences.
- Ask for specific examples when feedback is vague.
- Convert repeated objections into docs/issues.
- Do not ask for stars, upvotes, or reshares.

## Post-Launch Review

Run this within 48 hours after each major post:

```text
1. Save post URL and UTM.
2. Capture traffic and conversion metrics.
3. List the top 10 objections.
4. Decide whether copy, docs, or product behavior needs to change.
5. Update `docs/OVERSEAS_COMMUNITY_LAUNCH_PLAN.md`.
6. Create GitHub issues only for concrete follow-up work.
```
