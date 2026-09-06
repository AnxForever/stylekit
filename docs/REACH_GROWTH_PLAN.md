# StyleKit Reach & Growth Plan

> Consolidated from two 2026 research passes (GEO + off-site distribution; Baidu + Bing indexing)
> and an on-site audit of the live site. Owner column: **me** = Claude can do it (code/assets),
> **you** = needs your account credentials or a manual submit click.
>
> Created 2026-09-06. Update the status boxes as waves complete.

## Three governing judgments

1. **The foundation is already good; the real gaps are narrow.** `llms.txt`, `llms.md`,
   `llms-full.txt`, AI-bot allowlist in robots.txt, IndexNow (implemented + wired), Google
   verification, and 1138-URL bilingual sitemap all exist. The gaps are: **Baidu (from zero),
   Bing console (never claimed), and the GEO "get cited" layer (off-site mentions).**

2. **`llms.txt` is an over-hyped false lever for *citations*.** 2026 evidence is strongly
   negative: Ahrefs (137,210 domains) found 97% of llms.txt files got zero requests; EMGI
   (3,254 SaaS sites) found no citation correlation after controlling for company size; Google
   says on record it ignores it. **Keep ours accurate for the agent-navigation use case, invest
   zero further effort.** What actually drives AI citations is *what other sites say about you*
   (Reddit, awesome-lists, comparison posts) — not your own marketing pages.

3. **China hosting is a double-edged sword.** ICP 备案 gives structural advantage on Baidu +
   clean WeChat link-sharing. But GPTBot / Bingbot / ClaudeBot / PerplexityBot all originate
   outside China and may be silently throttled/dropped by the Aliyun host or egress. **Must be
   measured before assuming AI-side reach works.** (See Wave 2 crawler-reachability task.)

---

## Wave 0 — Today, ~1hr, ~10x discovery potential (near-zero cost)

| # | Action | Owner | Status |
|---|--------|-------|--------|
| 0.1 | Expand npm keywords on all 3 packages (core 11→32, mcp 10→21, cli 7→18); fix stale "146"→"148" in descriptions | me (done) | ✅ edited, pending republish |
| 0.2 | Fix stale "146"→"148" across README.md, README.zh-CN.md, public/llms.txt, feishu README | me (done) | ✅ |
| 0.3 | Bump versions so keyword changes can publish (core→1.0.0-beta.4, mcp→0.2.1, cli→0.1.3) | me (done) | ✅ |
| 0.4 | Publish all 3 packages (core beta.4 --tag beta, mcp 0.2.1, cli 0.1.3) — keywords now live on npm | me (done via logged-in npm) | ✅ published + verified |
| 0.4b | Re-publish with `--provenance` — folded into Wave 1 CI (needs NPM_TOKEN secret) | Wave 1 | ⬜ |
| 0.5 | Fill 20 GitHub repo topics | me (done via gh) | ✅ verified in repo |

**Keyword rationale:** npm ranks exact-name > keyword-match > description > downloads. Each keyword
is a separate search door. One documented case went 13→51 keywords for a sustained 10x. We stayed
in *relevant breadth* (no stuffing) — irrelevant terms raise bounce and hurt.

---

## Wave 1 — This week, ~1 afternoon, MCP everywhere (high payoff)

The architecture: **official MCP Registry (`registry.modelcontextprotocol.io`) is the canonical
upstream; every other directory ingests from it.** Publish there first; most sync within a day.

| # | Action | Owner | Status |
|---|--------|-------|--------|
| 1.1 | Add `mcpName` field to packages/mcp/package.json | me | ✅ done |
| 1.2 | Write `packages/mcp/server.json` (schema 2025-12-11, name `io.github.anxforever/stylekit-mcp`, npm package, stdio) | me | ✅ done + validated |
| 1.3 | CI job to publish to npm (--provenance) + MCP Registry (OIDC) on `mcp-v*` tag; same for cli on `cli-v*` | me | ✅ mcp-publish.yml + cli-publish.yml written |
| 1.4 | GitHub topics `mcp` + `model-context-protocol` → Glama auto-indexes | me | ✅ (Wave 0.5) |
| 1.5 | README structured for directory auto-parse (`## Tools` table, npx snippet, fixed stale 0.2.0/0.1.1 refs) | me | ✅ done |
| 1.6 | **Publish to Official Registry** — tag `mcp-v0.2.1` (CI, needs NPM_TOKEN secret) OR `mcp-publisher publish` locally | **you** | ⬜ see WAVE1_MCP_SUBMISSIONS.md #1 |
| 1.7 | Submit mcp.so / Smithery / Cline / claim Glama | **you** (copy ready) | ⬜ #2-5 |
| 1.8 | Email hello@pulsemcp.com (draft ready) | **you** | ⬜ #6 |
| 1.9 | awesome-mcp-servers PR (after Glama) | **you** (draft ready) | ⬜ #7 |

**All submission copy + steps: `docs/WAVE1_MCP_SUBMISSIONS.md`.** Blockers only you can clear:
`NPM_TOKEN` repo secret (CI publish + provenance) and a 400×400 PNG logo (Cline).

---

## Wave 2 — Weeks 1-2, search engines + the real GEO lever

### 2A. Bing (fast — mostly already built)
| # | Action | Owner | Status |
|---|--------|-------|--------|
| 2.1 | Claim site in Bing Webmaster Tools via "Import from Google Search Console" (works in 2026; needs stylekit.top already in GSC — it is) | **you** | ⬜ |
| 2.2 | `BING_SITE_VERIFICATION` env (only needed if you use meta-tag path instead of GSC import; hook confirmed working — Next omits empty tag cleanly) | **you** (paste if needed) | ⬜ |
| 2.3 | Confirm IndexNow key file live + run `pnpm submit:indexnow` (already implemented, key `ea6f65fc…`) | me | ⬜ |
| 2.4 | Enable BWT "AI Performance" report (shows Copilot/Bing-AI citations — no GSC equivalent) | **you** | ⬜ |

**Why Bing = AI reach:** ChatGPT Search grounds on Bing's index (Seer 2026: 87% of ChatGPT-cited
pages match Bing top-10 vs 56% Google); Copilot, DuckDuckGo, Ecosia all use Bing. *Caveat:* does
nothing for Claude (Brave index), Gemini/AI Overviews (Google), or Perplexity (own index).

### 2B. Baidu (from zero — cheap because you're already 备案'd)
| # | Action | Owner | Status |
|---|--------|-------|--------|
| 2.5 | Register + verify at ziyuan.baidu.com; `BAIDU_SITE_VERIFICATION` env hook pre-wired in site-metadata | me (env wired) / **you** (register + paste string) | ⬜ code ready |
| 2.6 | Set 站点关联主体 | **you** | ⬜ |
| 2.7 | Submit sitemap under 普通收录→sitemap | **you** | ⬜ |
| 2.8 | Baidu push-API script (`pnpm submit:baidu`, new/updated URLs only, logs remain) | me | ✅ built + tested (submit-baidu.mjs) |

**Baidu rules that bite:** ① Only push genuinely new/updated URLs — resubmitting indexed URLs
wastes quota and can *lower your quota or revoke API access*. Sitemap carries the stable set; API
carries the change feed. ② Keep token out of source control (it's in the query string). ③ Baidu
ignores `noindex` — use `Disallow` only. ④ ICP filing = real crawl-trust + faster sandbox exit, not
just legal compliance. ⑤ The "100k/day quota" figure is unreliable for new sites — read the live
`remain` field for the true ceiling.

### 2C. Crawler reachability (the possible silent bleed)
| # | Action | Owner | Status |
|---|--------|-------|--------|
| 2.9 | Audit prod nginx logs for all major crawlers | me | ✅ **VERDICT: healthy, no bleed** — all reach fine; Baiduspider already crawling clean (0 404s). See WAVE2_SEARCH_ENGINES.md 2C |
| 2.10 | CDN edge/mirror if crawlers starved | — | ✅ not needed (2.9 cleared it) |

### 2D. Baiduspider rendering audit
| # | Action | Owner | Status |
|---|--------|-------|--------|
| 2.11 | Confirm style / colors / GEO pages are server-rendered (content + JSON-LD in raw HTML) | me | ✅ verified: style 269+ body hits & 2 JSON-LD; colors 162 & 2; GEO 275 & 2 — all in raw HTML |

### 2E. Third-party citations — the heaviest GEO lever
| # | Action | Owner | Status |
|---|--------|-------|--------|
| 2.12 | List on AlternativeTo + SaaSHub | **you** (me drafts listings) | ⬜ |
| 2.13 | PR to awesome-design-tokens (sturobson) + awesome-design-systems (alexpate, ~25k stars) + awesome-css | **you** (me drafts) | ⬜ |
| 2.14 | GitHub weeklies: 阮一峰周刊 (ruanyf/weekly issue), HelloGitHub (521xueweihan issue), GithubDaily | **you** (me drafts submissions) | ⬜ |
| 2.15 | Add answer-first opening paragraph to flagship /learn + per-style pages (direct definition before showcase; Princeton study: stats+citations+quotes lift generative visibility up to ~40%). The dark-mode page's real-value WCAG contrast pattern (19.06:1) is exactly the citable format — replicate. | me | ⬜ |
| 2.16 | Standardize ONE boilerplate sentence ("StyleKit — design style library for AI-assisted development") used verbatim across GitHub/npm/MCP-registry/PH/docs for entity clarity; add Organization + sameAs schema | me | ⬜ |
| 2.17 | Set up Otterly.ai free tier w/ ~15 prompts ("best design style library for AI coding", "glassmorphism CSS prompt for Cursor", "design tokens MCP server") to track AI citations monthly | **you** | ⬜ |

---

## Wave 3 — Weeks 3-6, heavier investments

| # | Action | Owner | Status |
|---|--------|-------|--------|
| 3.1 | Chinese dev communities (7-parts-substance / 3-parts-placement rule): V2EX 推广 node post; one 掘金 deep-dive (1.5-5k words, "用 148 种设计风格让 Cursor 生成不像 AI 味的界面"); one 知乎 answer under a high-intent question; 少数派 Matrix / Linux.do 资源荟萃 | **you** (me drafts each, distinct angle per platform to avoid dedup) | ⬜ |
| 3.2 | Claude Connectors Directory — needs Team org (~$50/mo, confirm current price), hosted remote MCP endpoint, privacy-policy URL (mandatory). Highest-value MCP slot (one-click connect inside Claude). | **you** (me preps materials + endpoint) | ⬜ |
| 3.3 | Product Hunt launch — 4-6 week pre-launch project (maker profile 30d early, permanent forum thread at producthunt.com/p/, warm list). Launch Sunday (easier badge, 39.7% top-3 rate) or Tue-Wed (max reach). Self-hunt (no paid hunter). First 4h = comments not votes. Never say "please upvote". | **you** (me preps tagline/gallery/copy) | ⬜ |
| 3.4 | Hacker News "Show HN" (highest single-event upside — needs English + genuine hook) | **you** | ⬜ |

**PH reality check:** top-5 weekday dev tool ≈ 400-1,500 signups launch day. It's a one-shot event,
not a growth engine — do it once the npm/MCP/directory footprint is mature so traffic lands on a
solid product.

---

## What I (Claude) cannot do — needs you

Publishing to npm, opening PRs/issues, submitting to registries/directories, claiming Baidu/Bing
consoles, posting to communities, and anything needing your account credentials. **For every one of
those I prepare the full code + copy + submission materials so you only paste or click.**

## Flagged / unverified (from research)

- Exact `mcp-publisher` install command varies across sources — verify in live registry docs.
- Baidu daily push quota for a new site is dynamic; ignore the "100k/day" third-party figure.
- ChatGPT's exact Bing-vs-own-index split is disputed (direction solid, weighting not documented).
- Claude Directory ~$50/mo Team price is from one blog — confirm on Anthropic's page.
- Some Chinese-community conversion figures come from a single marketing source — directional only.
