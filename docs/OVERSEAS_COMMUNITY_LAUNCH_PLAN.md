# StyleKit Overseas Community Launch Plan

Status: active execution plan
Created: 2026-07-22
Owner: StyleKit maintainer
Primary goal: earn credible overseas developer feedback and open-source traction before selling production packs.

## Strategic Decision

StyleKit should launch overseas as an open-source developer tool, not as a paid product.

The strongest externally verifiable promise is:

> StyleKit is an open-source style library for AI coding: 136 curated visual styles with design tokens, AI prompts, shadcn themes, and agent guidance for making generated web UI look less generic.

Do not lead with paid packs, CLI, or MCP until the public installation, license, support, and refund surfaces are complete. Current public promotion should focus on the parts that overseas users can try without asking for trust first.

## Best-Fit Audience

Primary ICP:

- independent developers and small product teams;
- building with React, Next.js, Tailwind, shadcn, Cursor, Claude Code, v0, Windsurf, or similar AI coding tools;
- able to ship functionality but weak on visual direction;
- frustrated by generic AI-generated UI.

Secondary audiences:

- design engineers collecting style systems and token references;
- open-source frontend builders looking for reusable visual guidance;
- AI prompt/workflow creators who need concrete UI style references.

Out of scope for this launch:

- enterprise design-system buyers;
- paid template customers;
- users expecting full production app shells;
- no-code users who do not touch frontend implementation.

## Messaging

One-liner:

> Open-source visual styles, tokens, and AI prompts for less generic AI-generated UI.

Short description:

> StyleKit gives AI coding tools a concrete visual direction. Pick a style, copy the prompt or rules, install the shadcn theme, and use the design tokens as constraints for a more coherent UI.

Do say:

- open-source style library for AI coding;
- 136 curated visual styles;
- design tokens, component recipes, prompts, and shadcn themes;
- English and Chinese style discovery;
- works as guidance for Cursor, Claude Code, v0, Windsurf, and compatible agents;
- early project, feedback wanted.

Do not say yet:

- production-ready generated apps;
- complete template downloads;
- published npm CLI;
- published MCP package;
- paid pack delivery;
- guaranteed AI output quality.

## What I Can Do For You

I can handle repository and execution work:

- create and maintain this launch plan;
- tighten English public copy, metadata, README sections, and launch page copy;
- create a dedicated overseas landing page if you want one;
- write Hacker News, Reddit, Product Hunt, DEV.to, X, and LinkedIn post drafts;
- add UTM-safe links and event names for launch campaigns;
- audit current pages for overclaims against `docs/PRODUCT_TRUTH_AUDIT.md`;
- prepare GitHub release notes, pinned Discussion copy, issue templates, and roadmap text;
- draft Product Hunt assets: tagline, description, maker comment, gallery copy, FAQ;
- prepare a lightweight launch report template after each channel push;
- implement small site fixes that improve overseas conversion.

I cannot do the parts that require your external accounts unless you provide access or run them yourself:

- submit posts from your HN, Reddit, Product Hunt, DEV.to, X, or LinkedIn accounts;
- submit Search Console/Bing Webmaster changes;
- answer as you in real-time community threads without account access;
- create official paid ads or spend budget;
- validate private analytics that require production credentials unavailable locally.

## Launch Readiness Checklist

Must finish before first major overseas post:

- [x] English style cards show English style names as the primary names.
- [x] GitHub release and pinned Discussion drafts are prepared in `docs/OVERSEAS_GITHUB_LAUNCH_PACK.md`.
- [x] README top section uses the same overseas one-liner as the website.
- [x] A short demo video or GIF exists.
- [x] Launch link templates use UTM parameters.
- [x] Product boundaries are explicit: shadcn installs theme tokens; CLI/MCP are contributor previews.
- [x] Public catalog count is resolved: approved public baseline is 136 curated styles.
- [x] `pnpm run check:seo-truth` passes after the catalog count decision.
- [ ] The maintainer can reply for at least 6 hours after a Show HN or Product Hunt launch.

Should finish before Product Hunt:

- [x] Product Hunt tagline, description, maker comment, gallery copy, and FAQ are ready.
- [x] At least 3 clear screenshots are prepared.
- [x] Product category choices are selected: Engineering & Development, AI Coding Agents, and Prompt Engineering Tools.
- [x] A launch-day response doc exists for common objections.

## Prepared Launch Assets

Prepared demo:

- `/launch/overseas/stylekit-overseas-demo.webm` - 14.56-second 1280x720 WebM showing catalog search, a style AI Implementation section, and the developer workflow page.
- GitHub release: https://github.com/AnxForever/stylekit/releases/tag/v0.1-overseas-preview
- GitHub feedback issue: https://github.com/AnxForever/stylekit/issues/11

Keep screenshots and video as Product Hunt / Reddit / HN submission assets. Do not attach them to the GitHub release; the release should remain a text changelog and feedback entry point.

Recommended Product Hunt categories:

- Engineering & Development
- AI Coding Agents
- Prompt Engineering Tools

Recommended Product Hunt / community gallery order:

1. `/launch/overseas/styles-en.png` - English catalog view with the 136-style count, search, filters, and style cards.
2. `/launch/overseas/style-ai-glassmorphism-en.png` - style detail AI Implementation section showing the Hard Prompt workflow.
3. `/launch/overseas/developers-en.png` - developer workflow page showing shadcn registry, MCP, CLI, and Agent Skill boundaries.

Optional supporting captures:

- `/launch/overseas/home-en.png` - home page capture; use only if the current mixed-language carousel state is acceptable.
- `/launch/overseas/style-detail-glassmorphism-en.png` - style detail hero capture; not the primary external asset because the local dev iframe preview can render blank.

Regenerate with:

```bash
BASE_URL=http://127.0.0.1:3004 pnpm run capture:overseas-launch-assets
BASE_URL=http://127.0.0.1:3004 pnpm run capture:overseas-launch-demo
```

## Channel Plan

### Wave 1: credibility and feedback

Dates: 2026-07-22 to 2026-08-04

Channels:

- GitHub Discussions
- DEV.to or Hashnode technical article
- Reddit comments and small feedback posts
- relevant X/LinkedIn build-in-public posts

Goal:

- collect objections;
- identify confusing copy;
- earn first overseas referrers;
- avoid the risk of burning a major launch.

Primary CTA:

- try the styles gallery;
- copy a prompt or shadcn command;
- star or open feedback on GitHub.

### Wave 2: Hacker News

Target window: 2026-08-05 to 2026-08-11

Post type:

- Show HN, only after the public site remains usable without signup.

Draft title:

> Show HN: StyleKit - 136 visual styles and AI prompts for generated UI

First comment draft:

```text
Hi HN, I built StyleKit because AI-generated web UI often collapses into the same generic SaaS look.

It is an open-source style library with 136 visual styles. Each style includes design tokens, prompt guidance, component recipes, and a shadcn theme endpoint. The practical workflow is: pick a visual direction, copy the rules or install the theme, then use those constraints in Cursor, Claude, v0, or another AI coding tool.

The project is early. CLI and MCP packages are still contributor previews, so the main thing to try today is the web catalog and shadcn registry themes.

I would especially like feedback on:
- whether the style records are specific enough to guide real implementation;
- which styles feel useful rather than decorative;
- what would make this more useful in an AI coding workflow.
```

Rules to follow:

- do not ask friends to upvote or comment;
- stay present in the thread;
- answer criticism concretely;
- do not use generated filler comments.

### Wave 3: Product Hunt

Target window: 2026-08-12 to 2026-08-21

Only launch after Wave 2 feedback has been folded into copy and screenshots.

Draft tagline:

> Visual styles, tokens, and AI prompts for less generic generated UI.

Draft short description:

> StyleKit helps developers give AI coding tools a concrete visual direction. Browse 136 curated styles, copy prompt guidance, install shadcn theme tokens, and use the constraints in Cursor, Claude Code, v0, or Windsurf.

Maker comment angle:

- why the problem exists;
- what is usable today;
- what is still early;
- what feedback is most valuable.

Rules to follow:

- invite people to visit and comment, not to upvote;
- maker account, not a company account;
- respond throughout launch day.

### Wave 4: SEO and community compounding

Target window: 2026-08-22 onward

Content ideas:

- How to make AI-generated UI less generic with visual style constraints
- Design tokens plus prompts: a practical workflow for Cursor and v0
- shadcn theme endpoints as a lightweight style distribution format
- A taxonomy of visual styles for generated frontend UI

Goal:

- convert launch traffic into search-indexed learning assets;
- create natural backlinks from useful explanations, not directory spam.

## Reddit Subreddit Shortlist

Treat every subreddit as its own community. Read current rules before posting.

Likely useful:

- `r/SideProject`
- `r/webdev`
- `r/Frontend`
- `r/reactjs`
- `r/nextjs`
- `r/tailwindcss`
- `r/shadcnui`
- `r/opensource`
- `r/PromptEngineering`

Post angle:

```text
I built an open-source style library to make AI-generated UI less generic. Looking for feedback from React/Tailwind builders.
```

Avoid:

- same post in many subreddits;
- vague "check out my tool" wording;
- link-only posts;
- arguing with moderators;
- private-message promotion.

## Measurement

Use UTM links for every external post:

```text
utm_source=hackernews
utm_medium=community
utm_campaign=overseas-launch-2026-08
utm_content=show-hn
```

Core events:

- page views by channel;
- style detail views;
- prompt/code copies;
- shadcn command copies;
- GitHub clicks;
- newsletter subscriptions;
- GitHub stars during 24h and 7d windows;
- comments and objections by channel.

Minimum useful success thresholds:

- 50 overseas referral sessions from Wave 1;
- 5 concrete external objections before Show HN;
- 100+ referral sessions from Show HN or Product Hunt;
- at least 10 style copy/shadcn copy events from overseas channels;
- at least 3 GitHub issues/discussions/comments from non-Chinese users.

## Execution Log

2026-07-22:

- Created this launch plan.
- Started site readiness work by making the home page style cards use localized primary names. English visitors now see English style names first.
- Verified `components/home/home-style-card.tsx` with ESLint.
- Updated the README top section to match the overseas launch one-liner.
- Added `docs/OVERSEAS_LAUNCH_ASSETS.md` with prepared UTM links, Hacker News copy, Reddit drafts, Product Hunt assets, a GitHub pinned Discussion draft, a DEV.to article outline, and objection responses.
- Ran `pnpm run check:product-truth`: passed.
- Ran `pnpm run check:seo-truth`: passed with the approved 136-style public baseline.
- Added `docs/OVERSEAS_GITHUB_LAUNCH_PACK.md` with a release draft, pinned Discussion draft, GitHub issue seeds, maintainer reply principles, and a pre-launch gate.
- Added `tools/scripts/capture-overseas-launch-assets.mjs` and `pnpm run capture:overseas-launch-assets`.
- Captured launch screenshots in `public/launch/overseas/`: catalog, AI implementation detail, developer workflow, plus optional home/detail captures.
- Added `tools/scripts/capture-overseas-launch-demo.mjs` and `pnpm run capture:overseas-launch-demo`.
- Captured `/launch/overseas/stylekit-overseas-demo.webm` as a 14.56-second 1280x720 demo for community posts.
- Published GitHub pre-release `v0.1-overseas-preview`: https://github.com/AnxForever/stylekit/releases/tag/v0.1-overseas-preview
- Removed screenshot/video attachments from the GitHub release so it does not look like an image-only release. The assets remain in `public/launch/overseas/` for community submissions.
- Opened GitHub feedback issue `#11`: https://github.com/AnxForever/stylekit/issues/11

## Response Log Template

For each launch channel:

```text
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

## Source Notes

Rules checked on 2026-07-22:

- Hacker News Show HN expects something personally made that others can try, ideally without signup, and says not to ask friends to upvote or comment.
- Hacker News general guidelines say not to use HN primarily for promotion and not to solicit votes, comments, or submissions.
- Reddit spam policy warns against repeated or unsolicited mass engagement and says to be thoughtful if contributions mainly link to a business you benefit from.
- Product Hunt launch guidance says makers can launch their own products, Product Hunt is free, and promotion should ask people to visit/comment rather than directly upvote.
