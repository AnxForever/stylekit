# Admin Interface System

## Direction
- Product: internal admin dashboard for StyleKit operations, moderation, and telemetry.
- Feel: calm, compact, operational, technical.
- Purpose: help an operator scan traffic, content health, moderation load, and system signals within seconds.

## Visual Language
- Background-first layout with quiet contrast.
- Neutral base palette using `background`, `muted`, and `border` tokens.
- Accent colors are informational only:
  - sky/cyan for traffic and views
  - emerald for healthy engagement and approvals
  - amber for queue and warning states
  - rose for regressions and rejections
  - violet/fuchsia for system or admin-only signals

## Depth Strategy
- Prefer borders and surface tint shifts over heavy shadows.
- Use rounded containers with subtle `bg-muted/5` or `bg-muted/10` elevation.
- Keep cards readable but not decorative.

## Spacing
- Base spacing unit: 4px.
- Section containers: 24px padding.
- Dense dashboard cards: 16px to 20px padding.
- Internal stacks should stay tight and scan-friendly.

## Typography
- Use existing system typography.
- Strong hierarchy comes from weight and size, not color saturation.
- KPI numbers should be large and condensed visually.
- Labels and helper text should stay small and muted.
- Metadata should use uppercase tracking sparingly for section labels only.

## Dashboard Patterns
- Hero section: short operational summary + time-range controls + refresh.
- KPI row: 4 cards max in first row; each card must expose one metric and one line of context.
- Trend chart: bar-based activity strip with adjacent delta summary.
- Mix cards: use horizontal percentage bars for event/category distributions.
- Content health: group comments, ratings, favorites, submission states in one block.
- Audit activity: keep filters and export inline above the event feed.
- Pagination controls: rounded pills with low visual weight.

## Component Rules
- Metric cards should use soft gradient accents, not full colored backgrounds.
- Distribution rows should always show both absolute values and relative widths.
- Status cards must use semantic tint backgrounds rather than icons alone.
- Admin audit items should remain text-dominant and timestamp-visible.

## Data Rules
- Prefer operational summaries over raw table dumps.
- Show trend deltas, peak day, and average/day whenever time-series exists.
- Treat empty states explicitly; do not render blank chart shells.
- New analytics data should flow into the admin dashboard before creating separate admin pages.
