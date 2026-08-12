# StyleKit Overseas Launch Assets

Status: prepared draft assets
Created: 2026-07-22
Related plan: `docs/OVERSEAS_COMMUNITY_LAUNCH_PLAN.md`

Use these drafts as starting points. Adjust small details to match the actual launch day, but keep the truth boundaries intact.

## Canonical Links

Use the `www` host because the app normalizes canonical metadata to `https://www.stylekit.top`.

```text
Homepage:
https://www.stylekit.top/en?utm_source={source}&utm_medium=community&utm_campaign=overseas-launch-2026-08&utm_content={content}

Styles gallery:
https://www.stylekit.top/en/styles?utm_source={source}&utm_medium=community&utm_campaign=overseas-launch-2026-08&utm_content={content}

Developers page:
https://www.stylekit.top/en/developers?utm_source={source}&utm_medium=community&utm_campaign=overseas-launch-2026-08&utm_content={content}

AI frontend workflow guide:
https://www.stylekit.top/en/ai-frontend-workflow?utm_source={source}&utm_medium=community&utm_campaign=ai-frontend-seo-2026-08&utm_content={content}

AI web design tools guide:
https://www.stylekit.top/en/ai-web-design-tools?utm_source={source}&utm_medium=community&utm_campaign=ai-frontend-seo-2026-08&utm_content={content}

Chinese AI frontend guide:
https://www.stylekit.top/zh/ai-frontend-workflow?utm_source={source}&utm_medium=community&utm_campaign=ai-frontend-seo-2026-08&utm_content={content}

GitHub repo:
https://github.com/AnxForever/stylekit
```

Prepared UTM links:

```text
Hacker News:
https://www.stylekit.top/en?utm_source=hackernews&utm_medium=community&utm_campaign=overseas-launch-2026-08&utm_content=show-hn

Product Hunt:
https://www.stylekit.top/en?utm_source=producthunt&utm_medium=community&utm_campaign=overseas-launch-2026-08&utm_content=launch-page

Reddit feedback:
https://www.stylekit.top/en/styles?utm_source=reddit&utm_medium=community&utm_campaign=overseas-launch-2026-08&utm_content=feedback-post

DEV.to article:
https://www.stylekit.top/en/styles?utm_source=devto&utm_medium=community&utm_campaign=overseas-launch-2026-08&utm_content=article

GitHub Discussion:
https://www.stylekit.top/en/developers?utm_source=github&utm_medium=community&utm_campaign=overseas-launch-2026-08&utm_content=pinned-discussion

AI frontend article / discussion:
https://www.stylekit.top/en/ai-frontend-workflow?utm_source=community&utm_medium=referral&utm_campaign=ai-frontend-seo-2026-08&utm_content=workflow-guide
```

## Shared Truth Boundary

Say this clearly when needed:

```text
StyleKit is open source and usable today as a web catalog, prompt/rules reference, and shadcn theme registry. The shadcn command installs theme tokens, not a complete component system. CLI and MCP packages are still contributor previews from a local checkout.
```

Do not claim:

- complete production app generation;
- complete template downloads;
- published npm CLI or MCP packages;
- paid pack availability;
- guaranteed AI output quality.

## Launch Media Assets

Prepared files:

```text
Demo:
/launch/overseas/stylekit-overseas-demo.webm

GitHub release:
https://github.com/AnxForever/stylekit/releases/tag/v0.1-overseas-preview

GitHub feedback issue:
https://github.com/AnxForever/stylekit/issues/11

Primary Product Hunt / community gallery:
/launch/overseas/styles-en.png
/launch/overseas/style-ai-glassmorphism-en.png
/launch/overseas/developers-en.png

Optional supporting captures:
/launch/overseas/home-en.png
/launch/overseas/style-detail-glassmorphism-en.png
```

Recommended gallery order:

1. Catalog: show the 136-style library, search, filters, and style cards.
2. AI Implementation: show the Hard Prompt workflow inside a style detail page.
3. Developer workflow: show shadcn registry tokens and the contributor-preview boundaries for MCP/CLI.

Do not attach these media files to the GitHub release. They are submission/gallery assets for Product Hunt, Reddit, HN comments, DEV.to/Hashnode, and social posts.

Capture command:

```bash
BASE_URL=http://127.0.0.1:3004 pnpm run capture:overseas-launch-assets
BASE_URL=http://127.0.0.1:3004 pnpm run capture:overseas-launch-demo
```

Use a production or clean local server when possible. The capture script hides local Next.js development tooling in the screenshot only; it does not change the website frontend.

## Hacker News

Post type: Show HN

Title:

```text
Show HN: StyleKit - 136 visual styles and AI prompts for generated UI
```

URL:

```text
https://www.stylekit.top/en?utm_source=hackernews&utm_medium=community&utm_campaign=overseas-launch-2026-08&utm_content=show-hn
```

First comment:

```text
Hi HN, I built StyleKit because AI-generated web UI often collapses into the same generic SaaS look.

It is an open-source style library with 136 visual styles. Each style includes design tokens, prompt guidance, component recipes, and a shadcn theme endpoint. The practical workflow is: pick a visual direction, copy the rules or install the theme, then use those constraints in Cursor, Claude Code, v0, Windsurf, or another AI coding tool.

The project is early. CLI and MCP packages are still contributor previews, so the main thing to try today is the web catalog and shadcn registry themes.

I would especially like feedback on:
- whether the style records are specific enough to guide real implementation;
- which styles feel useful rather than decorative;
- what would make this more useful in an AI coding workflow.
```

Response stance:

- answer technical criticism directly;
- thank people for specific bug reports, then log them;
- do not debate taste at length;
- do not ask for upvotes, comments, stars, or reshares.

## Reddit

Use only after reading the target subreddit's current rules.

Best first targets:

- `r/SideProject`
- `r/webdev`
- `r/Frontend`
- `r/reactjs`
- `r/nextjs`
- `r/tailwindcss`
- `r/shadcnui`
- `r/opensource`

General feedback post:

```text
Title: I built an open-source style library to make AI-generated UI less generic

I have been building StyleKit, an open-source library of visual styles for AI coding workflows.

The basic workflow is:
1. pick a visual direction from the catalog;
2. copy prompt/rules guidance or install the shadcn theme tokens;
3. use those constraints in Cursor, Claude Code, v0, Windsurf, or a similar tool.

It currently has 136 curated styles with tokens, prompts, component recipes, and live previews. The shadcn registry installs theme tokens, not a complete component library. CLI/MCP are still contributor previews from the repo.

I am looking for feedback from React/Tailwind builders:
- Are the style records specific enough to guide real implementation?
- Which styles feel useful for actual products?
- What would make this fit your AI coding workflow better?

Demo: https://www.stylekit.top/en/styles?utm_source=reddit&utm_medium=community&utm_campaign=overseas-launch-2026-08&utm_content=feedback-post
Repo: https://github.com/AnxForever/stylekit
```

Short comment version:

```text
I am working on StyleKit, an open-source style library for AI coding. It gives Cursor/Claude/v0-style workflows concrete visual constraints: tokens, prompt rules, component recipes, and shadcn theme endpoints. I would be interested in feedback from React/Tailwind builders if this is relevant: https://www.stylekit.top/en/styles?utm_source=reddit&utm_medium=community&utm_campaign=overseas-launch-2026-08&utm_content=comment
```

Avoid:

- posting the same text across many subreddits;
- posting link-only submissions;
- private-message promotion;
- claiming it solves design quality by itself.

## Product Hunt

Launch only after Show HN feedback has been reviewed.

Name:

```text
StyleKit
```

Tagline:

```text
Visual styles and AI prompts for generated UI
```

Short description:

```text
StyleKit helps developers give AI coding tools a concrete visual direction. Browse 136 curated styles, copy prompt guidance, install shadcn theme tokens, and use the constraints in Cursor, Claude Code, v0, or Windsurf.
```

Maker comment:

```text
Hi Product Hunt, I built StyleKit because AI-generated frontend UI often lands in the same generic SaaS look.

StyleKit is an open-source style library for AI coding workflows. You can browse 136 visual styles, inspect tokens, copy prompt/rules guidance, and install shadcn theme tokens into an existing project.

What is usable today:
- web catalog with live style previews;
- design tokens and prompt guidance;
- component recipes;
- shadcn theme registry endpoints;
- English and Chinese style discovery.

What is still early:
- the shadcn install is a theme token install, not a complete component system;
- CLI and MCP packages are contributor previews from a local checkout;
- production packs are not the launch promise.

I would love feedback on which styles feel useful for real products, and what would make this more useful inside AI coding workflows.
```

Gallery copy:

```text
1. Browse 136 visual styles for generated UI.
2. Open a style to inspect tokens, prompts, recipes, and rules.
3. Install shadcn theme tokens with one command.
4. Use StyleKit constraints in Cursor, Claude Code, v0, or Windsurf.
```

FAQ:

```text
Q: Is StyleKit a component library?
A: Not exactly. It provides style records, tokens, prompt guidance, component recipes, and shadcn theme endpoints. The shadcn command installs theme tokens.

Q: Does it generate production-ready apps?
A: No. It gives AI tools and developers stronger visual constraints. Production integration still depends on the target project.

Q: Is the project open source?
A: Yes, the repository is public on GitHub under MIT license.

Q: Are CLI and MCP packages published?
A: Not yet. They are available as contributor previews from a local repository checkout.
```

## GitHub Pinned Discussion

Title:

```text
Overseas launch feedback: using StyleKit in AI coding workflows
```

Body:

```text
StyleKit is preparing for a broader overseas community launch. The current focus is open-source feedback, not paid packs.

The core promise:

> Open-source visual styles, tokens, and AI prompts for less generic AI-generated UI.

What to try:
- browse the English style catalog: https://www.stylekit.top/en/styles?utm_source=github&utm_medium=community&utm_campaign=overseas-launch-2026-08&utm_content=pinned-discussion
- open a style and inspect its tokens, prompts, recipes, and rules;
- copy a shadcn theme command from a style page;
- use the style guidance in Cursor, Claude Code, v0, Windsurf, or another AI coding tool.

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

## DEV.to / Hashnode Article

Working title:

```text
How I built a visual style library for AI-generated UI
```

Outline:

```text
1. The problem: AI-generated web UI tends to collapse into familiar patterns.
2. Why prompts alone are too loose.
3. The StyleKit model: style record = tokens + rules + recipes + examples.
4. How shadcn theme endpoints make style constraints installable.
5. What worked: concrete visual constraints, named styles, live previews.
6. What is still hard: production completeness, accessibility, motion, assets.
7. What I want feedback on from React/Tailwind builders.
```

Natural CTA:

```text
I am collecting feedback before a broader launch. The catalog is here: https://www.stylekit.top/en/styles?utm_source=devto&utm_medium=community&utm_campaign=overseas-launch-2026-08&utm_content=article
```

## Objection Responses

Objection: "This is just prompts."

```text
Prompts are one part of it, but each style record also includes design tokens, component recipes, implementation rules, and shadcn theme variables. The goal is to make visual direction structured enough for both humans and AI tools to reuse.
```

Objection: "The shadcn command does not install components."

```text
Correct. The current shadcn registry endpoint installs theme tokens. Component code and production integration still belong to the target project. I am intentionally keeping that boundary explicit.
```

Objection: "AI output still needs design taste."

```text
Agreed. StyleKit does not replace design judgment. It gives AI coding tools more concrete constraints so the starting point is less generic and easier to evaluate.
```

Objection: "There are too many decorative styles."

```text
That is useful feedback. The launch goal is to learn which styles are useful for real product UI and which should be repositioned as reference, inspiration, or removed from primary discovery.
```

Objection: "Why not just use an existing design system?"

```text
Existing design systems are often better for mature products. StyleKit is for the earlier moment when a developer or AI coding tool needs a concrete visual direction before a full design system exists.
```

## Launch-Day Triage

During each launch window, collect:

- URL and timestamp of the post;
- top 10 objections;
- broken links or broken commands;
- styles repeatedly praised;
- styles repeatedly criticized;
- questions that should become FAQ copy;
- product claims that users found unclear.

Update `docs/OVERSEAS_COMMUNITY_LAUNCH_PLAN.md` after each channel push.
