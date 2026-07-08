# Publishing an Agent Skill

How to package a project as a [Vercel Agent Skill](https://vercel.com/docs/agent-resources/skills)
so any AI coding agent (Cursor, Claude Code, Windsurf, Codex, Trae, …) can install
it with one command:

```bash
npx skills add <owner>/<repo>
```

This is the exact process used to publish StyleKit's own skill
([`SKILL.md`](../SKILL.md) at the repo root). It is verified end-to-end — the
final step actually runs the installer.

---

## 1. What an Agent Skill is

A skill is **one `SKILL.md` file**. Nothing else is required. It has two parts:

```markdown
---
name: stylekit
description: Apply a specific, consistent visual style to frontend UI you are
  generating. Use when building or styling web UI... you want a named aesthetic
  — Glassmorphism, Neo-Brutalist, Cyberpunk... instead of generic AI defaults.
---

# StyleKit

Instructions the agent follows when this skill activates.
```

- **YAML frontmatter** (between the `---` lines): required `name` and
  `description`. Optional `metadata` (e.g. `homepage`, or `internal: true` to
  hide it from discovery).
- **Markdown body**: the runbook the agent reads once the skill is active.

Required frontmatter fields:

| Field | Rule |
|-------|------|
| `name` | lowercase, hyphens allowed (`stylekit`, `pr-review`) |
| `description` | what it does **and when to use it** — see §2 |

---

## 2. The `description` is a trigger, not a blurb

This is the single most important idea.

An agent with many skills installed decides **which skill to activate by reading
each skill's `description`** against the user's request. The body is only read
*after* activation. So the description must be keyword-rich and phrased the way
users actually ask:

> "Use when building or styling web UI (pages, components, dashboards, landing
> pages) and you want a named aesthetic — Glassmorphism, Neo-Brutalist,
> Cyberpunk, Bauhaus, Apple, Stripe, Linear… instead of generic AI defaults."

When a user says *"make me a cyberpunk dashboard"*, the words `cyberpunk`,
`dashboard`, and `named aesthetic` are what get the skill picked. Write the
description for the match, not for marketing.

---

## 3. The body is a runbook — with real, verified endpoints

Structure the body as concrete steps the agent can execute. StyleKit's skill is
three steps: **pick a style → install it → apply its rules**, each with real
commands and URLs.

**Rule: verify every URL and command before you write it in.** A skill that
teaches an agent a dead endpoint is worse than no skill. Before shipping, each
reference was checked to return `200`:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://www.stylekit.top/api/styles       # 200
curl -s -o /dev/null -w "%{http_code}\n" https://www.stylekit.top/r/glassmorphism.json  # 200
```

Keep the body tight — the agent pays for every token it reads. Link out to full
docs rather than pasting them.

---

## 4. Distribution: just git + a convention

There is no npm publish, no backend, no review queue. `npx skills add <owner>/<repo>`:

1. **`git clone`s** the repository,
2. **scans for `SKILL.md`** — the repo root first, then a top-level `skills/`
   directory,
3. **installs** the matching skill into the user's agent config (`.cursor/`,
   Claude Code's skills dir, etc.).

The moment you push `SKILL.md` to GitHub, the skill is "live."

### Where to put the file — and the gotcha

The docs recommend `skills/<name>/SKILL.md`, **but check `.gitignore` first.**

In this repo, `.gitignore` contains `skills/` — because the skills CLI dumps
*installed dev-skills* into a local `skills/` folder. If the published skill had
gone there, git would never have pushed it, GitHub would not have it, and
`npx skills add` would find nothing.

```bash
git check-ignore SKILL.md      # (no output = trackable = good)
git check-ignore skills/x/SKILL.md   # prints the path = ignored = would be invisible
```

**Fix used here: put the skill at the repo root as `SKILL.md`.** It is the CLI's
first search location and is not caught by any ignore rule.

Bonus: this repo's dev-skills live in dot-dirs (`.claude/skills`,
`.agents/skills`, `.factory/skills`) that are *also* gitignored — so they never
reach GitHub and never pollute discovery. That is why the installer finds
exactly one skill (see §5).

---

## 5. Verify — actually run the installer

Do not assume it works. Run it in a throwaway directory:

```bash
cd /tmp && mkdir skilltest && cd skilltest
npx -y skills@latest add <owner>/<repo>
```

Expected output for a correctly published single-skill repo:

```
◇  Repository cloned
◇  Found 1 skill
●  Skill: stylekit
   Apply a specific, consistent visual style to frontend UI...
```

`Found 1 skill` (not several) confirms nothing leaked from ignored dev-skill
folders. The agent list the CLI prints (`claude-code`, `cursor`, `windsurf`,
`codex`, `gemini-cli`, `trae`, …) is the set of tools that can install it —
use the exact name (`claude-code`, not `claude`) if you pass `--agent`.

---

## Checklist

- [ ] `SKILL.md` at repo root (or `skills/<name>/` if that path is **not** gitignored)
- [ ] `name` (lowercase-hyphen) + trigger-rich `description` in frontmatter
- [ ] Body is a runbook with steps the agent can execute
- [ ] Every URL/command in the body verified `200`/working
- [ ] `git check-ignore SKILL.md` prints nothing
- [ ] Pushed to GitHub (`main`)
- [ ] `npx skills add <owner>/<repo>` in `/tmp` prints `Found 1 skill`
- [ ] Advertise the install command (README, site, `llms.txt`)

---

## Worked example

StyleKit's live skill: [`SKILL.md`](../SKILL.md). Install command surfaced in the
[README](../README.md), on the `/developers` page, and in
[`public/llms.txt`](../public/llms.txt).
