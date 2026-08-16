# StyleKit

StyleKit is a visual-style catalog and a set of delivery channels that help
developers and coding agents select and apply a deliberate visual direction.
This glossary keeps product language consistent across the website, packages,
documentation, and release checks.

## Language

**Style Catalog**:
The curated collection of named visual styles, with tokens, recipes, guidance,
and preview material for each style.
_Avoid_: Theme store, component library

**Developer Toolkit**:
The developer-facing delivery system made up of the shadcn Registry, CLI, MCP
Server, Agent Skill, and their shared Core Package.
_Avoid_: My Kit, Workspace, SDK

**Core Package**:
The shared, machine-readable catalog contract consumed by developer-tool
adapters.
_Avoid_: Website backend, monolith

**Delivery Channel**:
One supported way to consume StyleKit capabilities: Registry, CLI, MCP Server,
or Agent Skill.
_Avoid_: Feature card, integration logo

**Repository Preview**:
A delivery channel whose current source is verified from a StyleKit checkout
but whose repository version is not yet supported as a public release.
_Avoid_: Unpublished, when an older public package already exists

**Public Beta**:
A publicly installable release with a documented contract and repeatable
consumer verification, while compatibility may still change under pre-1.0
versioning.
_Avoid_: Production-ready, stable

**Supported Release**:
A public artifact that passed its declared compatibility matrix and has matching
documentation, provenance, and rollback guidance.
_Avoid_: Published package, by itself

**Capability Evidence**:
A dated, reproducible result proving that a public claim works through the same
channel a user is expected to use.
_Avoid_: Implementation exists, test coverage

**Product Truth**:
The invariant that public wording, install commands, versions, support state,
and capability evidence describe the same currently available behavior.
_Avoid_: Marketing copy review
