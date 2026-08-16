# Developer Toolkit Decision Map

Canonical decision map for turning the `/developers` feature cards into a
coherent, publicly verifiable Developer Toolkit. Detailed evidence and delivery
work live in [DEVELOPER_TOOLKIT_ROADMAP.md](./DEVELOPER_TOOLKIT_ROADMAP.md).

Current frontier: **#2**. Resolve one ticket at a time; update or delete later
tickets when an earlier answer changes them.

## #1: What Is In The Developer Toolkit?

Blocked by: none
Type: Grilling

### Question

Does this plan cover My Kit/Workspace, or the tools advertised on
`/zh/developers`?

### Answer

Resolved. The Developer Toolkit is the shadcn Registry, CLI, MCP Server, and
Agent Skill, with `stylekit-core` as their shared foundation. My Kit and
Workspace are separate product areas.

## #2: What Support Posture Should The Existing npm Packages Have?

Blocked by: #1
Type: Grilling

### Question

Should the already-public `stylekit-cli@0.1.0` and `stylekit-mcp@0.1.0` become
supported public betas, or should they remain explicitly unsupported snapshots
while development stays repository-local?

### Answer

Open. Recommendation: treat them as public betas, publish a deliberately
versioned successor only after clean-package verification, and describe the
repository's newer `0.1.1` builds as release candidates until then. This best
matches the user's goal of making every `/developers` tool genuinely usable.

## #3: How Will Toolkit Versions Move Together?

Blocked by: #2
Type: Grilling

### Question

Should Core, CLI, and MCP release independently, or follow a coordinated release
train with an explicit compatibility manifest?

### Answer

Open. Recommendation: keep independent semantic versions, but publish one
machine-readable compatibility manifest and one toolkit release note per train.

## #4: What Is The Stable Core Contract?

Blocked by: #2, #3
Type: Prototype

### Question

Which catalog queries, schemas, error shapes, and subpath exports can adapters
depend on without importing website internals?

### Answer

Open. Prototype a clean consumer against the packed Core artifact and snapshot
the smallest contract that supports current CLI and MCP behavior.

## #5: Does `stylekit add` Print Or Apply?

Blocked by: #4
Type: Prototype

### Question

Should the CLI's `add` command remain a safe command generator, or invoke the
shadcn installer and mutate the consumer project?

### Answer

Open. Recommendation: preserve non-mutating behavior through the first public
beta; name it clearly in help text, then prototype an explicit `apply` command
with `--dry-run` before allowing project mutation.

## #6: Which MCP Clients And Transports Are Supported?

Blocked by: #4
Type: Research

### Question

Is the supported surface stdio only, and which exact Claude, Cursor, Windsurf,
and Codex versions/config formats form the compatibility matrix?

### Answer

Open. Research current official client configuration and verify each claimed
client. Treat hosted HTTP MCP as a later product decision, not part of beta.

## #7: Does Registry Remain Theme-Only?

Blocked by: #1
Type: Grilling

### Question

Should the existing Registry remain a `registry:theme` channel, or should
component and experience-pack items join the same public contract?

### Answer

Open. Recommendation: keep the current Registry explicitly theme-only until all
146 theme items have a compatibility matrix. Explore component items as a
separate versioned channel so the existing install promise does not expand
silently.

## #8: Which Agent Skill Installations Are Supported?

Blocked by: #4, #7
Type: Prototype

### Question

Is discovery by `skills add --list` sufficient, or must releases prove actual
project-local installation and task activation for named agents?

### Answer

Open. Recommendation: require clean-project installation plus a small prompt
evaluation for every named supported agent; list other compatible agents as
unverified.

## #9: Where Does Public Capability Status Come From?

Blocked by: #2, #3, #6, #7, #8
Type: Prototype

### Question

How can the website, READMEs, `llms.txt`, release checks, and package metadata
share one truthful status without duplicating hand-written claims?

### Answer

Open. Prototype a versioned capability manifest containing channel state,
version, support matrix, verification date, and evidence command; generate or
validate public surfaces from it.

## #10: How Are Releases Authorized And Recovered?

Blocked by: #3, #9
Type: Grilling

### Question

Which maintainer owns npm credentials, release approval, post-publish smoke
tests, deprecation, and recovery from a bad immutable package?

### Answer

Open. Repository work may prepare release artifacts, but publishing and changing
external package state require explicit owner authorization.

## #11: When Is Hosted MCP Worth Building?

Blocked by: #6, #9, #10
Type: Research

### Question

Do usage and support evidence justify a remotely hosted MCP service, or is local
stdio the durable product boundary?

### Answer

Open. Do not start until public-beta adoption and failure data exist.
