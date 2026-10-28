# Component preview density

Reviewed 2026-10-20 in the Windows checkout at D:/stylekit.

| Feature | Evidence and decision | State / coverage / history | Acceptance |
| --- | --- | --- | --- |
| CMP-UX-01: adjust and inspect without scrolling through explanations | User feedback identifies excessive prose and space. Source repeats component names, editor titles and group labels. Use compact controls alongside the primary preview. | Implementing / partial / reopened-by-feedback | Desktop columns; mobile stack; reset, validation and keyboard labels preserved. |
| CMP-UX-02: retrieve code and setup when needed | Default-close the code and setup disclosures. Remove generic explanatory sections and redundant containers. Artifact output and safety rules remain intact. | Implementing / partial / reopened-by-feedback | Copyable code/usage stay accessible; disclosures work by keyboard; template fallback remains. |

Prior evidence: [Bencho](https://bencho.dev/blocks/dynamic-island) and
[Arc](https://uiarc.dev/components/button). Feedback changes the presentation
decision: optional documentation should not dominate the preview. No external
component code is copied.

Validation results will be recorded after browser review and repository checks.
