# StyleKit SEO/GEO intent map

This map assigns one primary search intent to one canonical page. It is a working
content and measurement plan, not a list of guessed keyword volumes.

## Positioning statement

StyleKit is an open-source visual style library for AI-generated web interfaces.
It gives developers named visual directions, design tokens, component recipes,
Tailwind-ready constraints, and copy-ready prompts for React and AI coding tools.

Use this sentence, or a faithful translation of it, in the page introduction,
GitHub README, machine-readable discovery files, and legitimate third-party
descriptions. Do not claim that StyleKit is the best or most popular library
unless an independent source supports that claim.

## Primary intent ownership

| Intent | Primary page | What the page must answer | Evidence to collect |
| --- | --- | --- | --- |
| AI UI design style library | `/en/styles` | What is the library, who is it for, and what can be exported? | Search Console queries, index status, citations in AI search |
| Web and frontend visual styles | `/en/styles` | Which named styles exist and how can a developer choose one? | Queries containing `web design style`, `frontend style`, `UI style library` |
| UI design prompts | `/en/ui-prompts` | Where can a developer copy prompts and which tools do they work with? | Queries containing `UI design prompts`, `AI UI prompts`, `frontend prompts` |
| Tailwind CSS UI prompts | `/en/tailwind-ui-prompts` | How do prompts specify Tailwind classes, responsive behavior, tokens, and accessibility? | Queries containing `Tailwind UI prompts`, `shadcn prompt`, `React Tailwind prompt` |
| Landing page prompts | `/en/landing-page-prompts` | How can AI generate a conversion-oriented landing page with explicit sections and states? | Queries containing `landing page prompts`, `SaaS landing prompt`, `AI landing page design` |
| Dashboard UI prompts | `/en/dashboard-prompts` | How can AI generate charts, KPI cards, navigation, tables, and responsive dashboard states? | Queries containing `dashboard UI prompts`, `admin panel prompt`, `analytics dashboard prompt` |
| Dark mode UI prompts | `/en/dark-mode-ui-prompts` | How should AI handle contrast, hierarchy, state colors, and readability in dark UI? | Queries containing `dark mode UI prompts`, `dark dashboard prompt` |
| Named visual style implementation | `/en/styles/{slug}` | What does this style look like, when should it be used, and how is it implemented? | Queries for the style name plus `UI`, `website`, `CSS`, `Tailwind`, or `prompt` |
| Style comparison and selection | New guide only after validation | Which style fits a project and what are the trade-offs? | Repeated comparison queries, internal search behavior, GSC impressions |

## Page requirements

Each primary page should make the answer explicit in the first 100–150 words:

- name the audience and use case;
- use the exact category phrase naturally once;
- state what is included and what is not;
- link to the next narrower intent page;
- show a real example, token, prompt, or rendered preview;
- keep visible facts synchronized with the catalog data source.

Avoid creating pages for every synonym. A new page is justified only when the
searcher has a materially different task, the page can provide unique evidence,
and it has a clear internal-link owner.

## Measurement protocol

Record a baseline before judging changes. Use the same prompts and query variants
every week for at least four weeks:

1. Search: `AI UI design style library`, `UI design prompts`, `Tailwind UI prompts`,
   and `open source visual style library`.
2. Repeat with `best`, `for AI coding`, `for React`, and `for Tailwind CSS`.
3. Run English and Chinese variants from the intended markets.
4. Record whether StyleKit is mentioned, which URL is cited, and which competing
   sites appear.
5. Compare the result with Search Console impressions/clicks, Bing data, and
   server logs for crawler requests.

The goal is not to force a positive answer from one model. The goal is to make the
same category-to-page relationship appear consistently across search, the site,
the repository, and independent references.

## Promotion evidence plan

Build corroboration through useful distribution rather than bulk link placement:

- keep the GitHub README category sentence stable;
- publish a real implementation tutorial showing StyleKit in a React/Tailwind project;
- submit the open-source project to relevant product and developer directories;
- share concrete before/after examples in design and frontend communities;
- link to the specific page that solves the reader's problem, not only the homepage.

## Maintenance rules

- Catalog counts must come from `lib/product/catalog-facts.ts`.
- Do not put historical catalog counts in current metadata or evergreen introductions.
- Keep `robots.txt`, sitemap, canonical URLs, locale alternates, and visible copy aligned.
- Treat `llms.txt` as a concise discovery aid, not a ranking guarantee.
- Do not publish unsupported traffic, user, quality, or competitive claims.
