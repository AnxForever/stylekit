# Wave 2 — Search Engines + GEO Lever: Findings & Submission Pack

> Prepared 2026-09-06. Combines a live crawler-reachability audit (prod nginx logs),
> the Baidu push tooling (built), and ready-to-paste steps for Bing + Baidu consoles.

---

## 2C. Crawler reachability audit — VERDICT: healthy, no silent bleed ✅

The big worry (China host starving overseas AI/Bing crawlers) is **not happening.**
Audited `/var/log/nginx/access.log` + 6 rotated days on prod (59.110.91.219),
~2.6M requests, 30 Aug–6 Sep 2026:

| Bot | Total hits | 200 OK | 404 | Read |
|-----|-----------|--------|-----|------|
| Googlebot | 2,086 | 1,948 | 61 | healthy |
| Bingbot | 4,357 | 1,901 | 1,989 | reaching fine; 404s are stale chunks (see below) |
| GPTBot (ChatGPT training) | 2,039 | 1,124 | 525 | healthy |
| OAI-SearchBot (ChatGPT Search) | 1,284 | 836 | 300 | healthy |
| ClaudeBot | 455 | 267 | 156 | healthy |
| Claude-User | 600 | 57 | 473 | user-triggered fetches, fine |
| PerplexityBot | 2,317 | 764 | 1,315 | reaching fine; 404s are vuln-scanner noise (see below) |
| Applebot | 3,974 | 2,057 | 1,820 | healthy |
| Baiduspider | 256 | 220 | **0** | **already crawling cleanly** |

**Key takeaways:**
- Every major AI + search crawler reaches the Aliyun host from outside China with
  strong 200 rates. No blocking, no throttling. The Wave-2 reachability risk is closed.
- **Baiduspider is already here** (verified real: IPs in 116.179.37.x = China Unicom
  Beijing range Baidu leases; 220/256 = 200, zero 404s). Baidu is crawling before we've
  even claimed the console — the 备案 is doing its job.
- **The two scary-looking 404 clusters are both benign:**
  - *Bingbot 1,989 404s* — dominated by stale `/_next/static/chunks/<hash>.js` (old build
    hashes Bing cached in prior HTML; confirmed those exact hashes 404 now because the
    build changed). Self-heals as Bing re-crawls current pages. Plus `/zh/colors/<hex>`
    for hexes not in our set. Not a real problem.
  - *PerplexityBot 1,315 404s* — almost entirely vuln-scanner noise spoofing the UA
    (`/service_account.json`, `/aws-exports.js`, `/actuator/mappings`, `/.env` variants).
    StyleKit has none of these; correctly 404. Not real Perplexity content-crawling.
- One tiny real thing: `/en/cursor-ui-design` + `/zh/cursor-ui-design` 404 and aren't in
  the sitemap or linked anywhere — Bing found them from an old cache/guess. Harmless, but
  if we ever want that URL it's a free redirect opportunity. **Not urgent.**

**Action:** none required for reachability. The 2.10 "CDN edge/mirror" contingency is
**not needed** — overseas crawlers are fine as-is.

---

## 2A. Bing — claim + verify (fast, mostly built)

**Already in place:** IndexNow fully implemented (`tools/scripts/submit-indexnow.mjs`,
`pnpm submit:indexnow`, key file live at `/ea6f65fc…​.txt`); `BING_SITE_VERIFICATION` env
hook wired in `lib/seo/site-metadata.ts` (currently empty → not yet claimed).

**Your steps:**
1. Go to https://www.bing.com/webmasters → sign in with a Microsoft account.
2. Click **Import from Google Search Console**, authorize Google, select stylekit.top.
   (Works in 2026; pulls verified ownership + sitemaps in ~2 min. stylekit.top is already
   in GSC so this is the fast path — no meta tag needed.)
   - *Fallback if you prefer meta-tag:* BWT gives an `msvalidate.01` content string →
     paste it as the `BING_SITE_VERIFICATION` env var on prod (the code already reads it) →
     redeploy → click Verify.
3. Confirm the sitemap is listed (import brings it; else add
   `https://www.stylekit.top/sitemap.xml`).
4. Run `pnpm submit:indexnow` once to push the current catalog (it's the change feed;
   sitemap is the full set — Bing wants both).
5. Enable the **AI Performance** report (BWT, public preview since Feb 2026) — shows which
   URLs are cited across Copilot + Bing AI answers. No GSC equivalent.

**Why it matters:** ChatGPT Search grounds on Bing's index (Seer 2026: 87% of ChatGPT
citations match Bing top-10 vs 56% Google); Copilot + DuckDuckGo + Ecosia use Bing too.
Does *not* cover Claude (Brave), Gemini/AI Overviews (Google), or Perplexity (own index).

---

## 2B. Baidu — claim from zero (cheap; 备案 already earns the trust bonus)

**Already built (code side):** `tools/scripts/submit-baidu.mjs` + `pnpm submit:baidu` —
the 普通收录 push-API client. Pushes NEW/UPDATED URLs only (quota discipline baked in:
on-site check, ≤2000/call, logs `success`+`remain`, dry-run mode, reads token from
`BAIDU_PUSH_TOKEN` env so it never hits source control). Tested via `--dry-run`.

**Your steps:**
1. Register at https://ziyuan.baidu.com with a 百度 account → **添加网站** →
   verify **stylekit.top** via **HTML标签验证** (meta tag). It gives a
   `<meta name="baidu-site-verification" content="...">` value.
   → paste the content value; I'll wire it into the site `<head>` via a
   `BAIDU_SITE_VERIFICATION` env + metadata (say the word and I'll add the code —
   mirrors the existing Bing/Google verification block).
2. Set **站点关联主体** (site entity association) — Baidu now promotes this over ICP and
   it's required for mobile-search resources. (Can't undo for 7 days; do it deliberately.)
3. Submit sitemap: 资源提交 → 普通收录 → sitemap tab → add
   `https://www.stylekit.top/sitemap.xml` (both /en and /zh URLs are already in it).
4. Get the push **token**: 资源提交 → 普通收录 → **API提交** tab (16-char string).
   Then set it as an env var and push changed URLs:
   ```bash
   BAIDU_PUSH_TOKEN=xxxx pnpm submit:baidu https://www.stylekit.top/en/styles/<new-style>
   # or from a file of changed URLs:
   BAIDU_PUSH_TOKEN=xxxx pnpm submit:baidu --file changed-urls.txt
   ```
   Read the logged `remain` for your true daily ceiling (the "100k/day" figure is
   unreliable for a new site).

**Rules that bite (already handled or noted):**
- Only push new/updated URLs — never blast the sitemap (wastes quota, can get access
  revoked). The script refuses empty runs and is not wired to any deploy hook.
- Keep `BAIDU_PUSH_TOKEN` out of git/CI logs (it rides in the query string).
- Baidu ignores `noindex` — use robots `Disallow` (already correct in app/robots.ts).

---

## 2D. Baiduspider rendering audit — SSR posture

Baiduspider is weak at JS; client-only content is invisible to it. Next.js App Router
defaults to server rendering, and the audit shows Baiduspider getting 220 clean 200s — so
the catalog is being served as HTML. **To fully close this I'll do a code pass** confirming
style pages / `/colors/[hex]` / GEO pages keep their body text + metadata + JSON-LD in
Server Components (not swapped in client-side via the i18n context after hydration). That's
task 2.11, a me-task — flag if you want it now or after the console claims.

---

## 2E. Third-party citations — the heaviest GEO lever (copy drafts)

These are what actually drive AI citations. All need your account to submit; copy is ready
in the main plan. Priority: AlternativeTo + SaaSHub listings, awesome-design-tokens /
awesome-design-systems PRs, and the three GitHub weeklies (阮一峰 / HelloGitHub /
GithubDaily). Otterly.ai free tier for tracking.

---

## What only you can do (Wave 2)
- Claim Bing (Import from GSC) + enable AI Performance report.
- Register Baidu, verify, set 站点关联主体, submit sitemap, get push token.
- Provide `BING_SITE_VERIFICATION` (if using meta path) and `BAIDU_SITE_VERIFICATION`
  content strings → I wire them in.
- Provide `BAIDU_PUSH_TOKEN` at run time (env, not committed).

## What I can still do now (me-tasks)
- Wire the Baidu verification meta tag into site metadata (once you have the string, or
  pre-wire the env hook now).
- Task 2.11 SSR/JSON-LD render audit for Baiduspider.
- Task 2.15 answer-first opening paragraphs on flagship pages.
- Task 2.16 canonical boilerplate + Organization/sameAs schema.
