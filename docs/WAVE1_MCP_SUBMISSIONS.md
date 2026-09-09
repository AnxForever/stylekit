# Wave 1 — MCP Distribution: Submission Pack

> Ready-to-paste copy + exact steps for every MCP directory. Prepared 2026-09-06.
> Facts locked at prep time: repo https://github.com/AnxForever/stylekit (458 stars),
> npm `stylekit-mcp@0.2.1`, site https://stylekit.top, 148 curated styles, MIT.
>
> The code side (server.json, mcpName, CI workflows, README) is DONE and committed.
> Everything below is a form/PR/email that needs your account — paste and click.

---

## Canonical boilerplate (use verbatim everywhere for entity clarity)

**One-liner:**
> StyleKit MCP — search 148 curated design styles and pull design tokens, component recipes, and shadcn install commands into Claude, Cursor, or Windsurf. Runs offline over stdio.

**Category phrase (always pair the name with this):**
> design style library for AI-assisted development

**Install snippet (every directory that wants one):**
```json
{
  "mcpServers": {
    "stylekit": {
      "command": "npx",
      "args": ["-y", "stylekit-mcp"]
    }
  }
}
```

**Links:**
- npm: https://www.npmjs.com/package/stylekit-mcp
- repo: https://github.com/AnxForever/stylekit
- site: https://stylekit.top
- registry name: `io.github.anxforever/stylekit-mcp`

---

## 1. Official MCP Registry (do this FIRST — everything downstream syncs from it)

**What's already done for you:** `packages/mcp/server.json` exists and validates;
`mcpName` field added to package.json; a `mcp-publish.yml` CI job will auto-publish on
a `mcp-v*` tag. So you have two paths:

### Path A — let CI do it (recommended, gives provenance too)
1. Add repo secret `NPM_TOKEN` (a granular npm automation token with publish rights on
   the stylekit packages) at repo → Settings → Secrets and variables → Actions.
2. Tag and push:
   ```bash
   git tag mcp-v0.2.1 && git push origin mcp-v0.2.1
   ```
   This runs `mcp-publish.yml`: publishes to npm with `--provenance`, then publishes
   `server.json` to the MCP Registry via GitHub OIDC (no registry password needed).

### Path B — publish server.json manually now (local)
1. Install the CLI (verify current asset name at
   https://github.com/modelcontextprotocol/registry/releases — the name has varied):
   ```bash
   # macOS/Linux release binary, or:  brew install mcp-publisher
   ```
2. From `packages/mcp/`:
   ```bash
   mcp-publisher login github        # opens browser, authorizes io.github.anxforever/*
   mcp-publisher publish             # reads ./server.json
   ```
   Registry checks: npm version matches server.json (0.2.1 ✓), repo resolves, auth
   proves the `io.github.anxforever` namespace.

**Flagged:** the exact `mcp-publisher` install command differs across sources — confirm
on the releases page before running. The `server.json` schema is pinned to
`2025-12-11`; if the CLI complains about schema version, check for a newer one.

---

## 2. Glama (auto-indexes — mostly automatic)

Glama auto-indexes any public GitHub repo that has the `mcp` +
`model-context-protocol` topics (both added in Wave 0 ✓) and a package.json.

**Your action:**
1. Wait ~1-2 days for auto-index, then go to https://glama.ai/mcp/servers, search
   "stylekit".
2. **Claim the listing** (sign in with GitHub) and pursue the verified/AAA tier —
   verification + a clean security scan is the real differentiator (a March 2026 scan
   found 22% of servers had security findings; yours is read-only, no secrets).

---

## 3. mcp.so (form — README auto-parses)

**Your action:** go to https://mcp.so/submit and paste:
- **GitHub URL:** `https://github.com/AnxForever/stylekit`
- **Name:** StyleKit
- **Description:** (the one-liner above)
- **Tags:** `design-system`, `design-tokens`, `ai`, `ui-design`, `frontend`
- **Category:** Developer Tools (or Design)

mcp.so auto-pulls the install snippet, the `## Tools` table, and the first README image.
The mcp README's `## Tools` section is already structured for this.

---

## 4. Smithery (dashboard)

**Your action:** https://smithery.ai → sign in with GitHub → "Add Server" / connect repo.
Fill: name **StyleKit**, description (one-liner), categories **Design / Developer Tools**,
tags as above, and the example prompt:
> "Search StyleKit for a frosted glass style, then give me its button recipe and the shadcn install command."

**Note:** the one-click-install/featured badge needs a *hosted HTTP endpoint*. We serve
over stdio (local npx) today, so you'll get a standard listing now. A hosted remote
endpoint is a Wave 3 item (also unlocks the Claude Directory) — defer unless you want to
host one.

---

## 5. Cline MCP Marketplace (GitHub issue)

**Your action:** open an issue at https://github.com/cline/mcp-marketplace with:
- **Repo URL:** `https://github.com/AnxForever/stylekit`
- **Logo:** a 400×400 PNG (StyleKit mark — you'll need to supply one; I can't generate
  brand art)
- **Reason:** "Read-only MCP server exposing 148 curated design styles with tokens,
  component recipes, and shadcn install commands. Installs from npm (`stylekit-mcp`),
  runs offline over stdio. Cline can set it up from the README config block alone."

Low star counts are explicitly fine; review ~2 days. Before submitting, confirm Cline can
set up the server from the README's JSON block (it can — single npx block).

---

## 6. PulseMCP (email to expedite + pursue newsletter)

PulseMCP auto-ingests from the official registry, but an email expedites and can earn a
newsletter mention (one of the highest-signal channels in the ecosystem).

**Your action:** email **hello@pulsemcp.com** — draft ready:

> Subject: New MCP server — StyleKit (design style library for AI-assisted dev)
>
> Hi PulseMCP team,
>
> I've published StyleKit MCP to the official registry
> (`io.github.anxforever/stylekit-mcp`, npm `stylekit-mcp`). It's a read-only server that
> gives coding agents 148 curated design styles — searchable, with typed design tokens,
> component recipes, and shadcn install commands — so tools like Claude, Cursor, and
> Windsurf can generate UI against concrete visual constraints instead of a vague style
> name. Runs offline over stdio.
>
> Repo: https://github.com/AnxForever/stylekit (458★)
> npm: https://www.npmjs.com/package/stylekit-mcp
> Site: https://stylekit.top
>
> Happy to answer anything. Would love to be considered for the newsletter if it's a fit.
>
> Thanks,
> Anx

---

## 7. awesome-mcp-servers PR (do LAST — after Glama listing exists)

**Your action:** the punkpeye/awesome-mcp-servers list (~90k★) often requires a Glama
listing first. Once #2 is live, open a PR adding StyleKit under the design/dev-tools
section. Draft entry:

```markdown
- [AnxForever/stylekit](https://github.com/AnxForever/stylekit) 📇 🏠 - Search 148 curated
  design styles and pull design tokens, component recipes, and shadcn install commands
  into Claude, Cursor, or Windsurf. Runs offline over stdio.
```
(Check the list's current emoji legend — 📇 = TypeScript, 🏠 = local/stdio — and match its
exact section + formatting conventions in the PR.)

---

## Priority order & what's blocking

1. **#1 Official Registry** — unblocks everything. Path A (CI tag) also does provenance.
   Only blocker: add `NPM_TOKEN` repo secret.
2. **#3 mcp.so, #4 Smithery, #5 Cline, #6 PulseMCP** — independent, do in any order.
   #5 Cline needs a 400×400 logo PNG (only thing I can't produce).
3. **#2 Glama** — passive; just claim after auto-index.
4. **#7 awesome-mcp-servers** — after Glama.

## Things only you can provide
- `NPM_TOKEN` GitHub repo secret (for CI publish + provenance).
- A 400×400 PNG logo (Cline, and nice for others).
- The actual form submits / PR / email sends (account-gated).
