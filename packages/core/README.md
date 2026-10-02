# stylekit-core

StyleKit core library - design style tokens, recipes, and accessibility helpers for AI-driven UI generation.

## Installation

```bash
npm install stylekit-core@beta
```

Use the `beta` dist-tag to receive the current prerelease. npm's `latest` tag
still points to an older release, so an unqualified `stylekit-core` install
does not include the newest asset and discovery APIs.

## Modules

### Styles

Design style definitions, metadata, and token system.

```typescript
import { styles, getStyleBySlug, getStyleTokens } from 'stylekit-core/styles'

// Get all styles
const allStyles = styles

// Get a specific style
const brutalist = getStyleBySlug('neo-brutalist')

// Get tokens for precise CSS class mappings
const tokens = getStyleTokens('neo-brutalist')
```

### Recipes

Component recipe system with parameterized, composable component definitions.

```typescript
import { getStyleRecipes, getRecipe, renderRecipe } from 'stylekit-core/recipes'

// Get all recipes for a style
const recipes = getStyleRecipes('glassmorphism')

// Get a specific recipe
const buttonRecipe = getRecipe('glassmorphism', 'button')

// Render a recipe with parameters
const result = renderRecipe(buttonRecipe, {
  variant: 'primary',
  params: { size: 'md' },
  slots: { label: 'Click me' },
})
```

### Public assets

The `./assets` entry covers the public asset families exposed by StyleKit,
including styles, recipes, animations, backgrounds, typography, component
patterns, prompts, templates, and experience packs. Use the bundled snapshot
for offline access, or the live helpers to read the site's current public
catalogue. Live helpers fall back to bundled data when the site cannot be
reached; external or restricted records may contain metadata rather than
redistributable source.

```typescript
import {
  getPublicAsset,
  listPublicAssets,
  listPublicAssetsLive,
} from 'stylekit-core/assets'

const page = listPublicAssets({ kind: 'animation', limit: 20 })
const animation = getPublicAsset('animation', page.assets[0]?.id ?? '')

const current = await listPublicAssetsLive({ kind: 'template', limit: 20 })
console.log(current.origin, current.data.total)
```

The live helpers accept `baseUrl` and `timeoutMs` overrides. Set `live: false`
to force bundled-only access.

### Accessibility

WCAG 2.1 compliance checking for design styles.

```typescript
import { contrastRatio, meetsAA, scoreStyle } from 'stylekit-core/accessibility'

// Check contrast ratio
const ratio = contrastRatio('#000000', '#ffffff') // 21

// Score a style for accessibility
const score = scoreStyle('neo-brutalist')
```

### Quality and capability metadata

Discovery details and style packs expose machine-readable coverage signals so
integrations can distinguish curated readiness from baseline catalog coverage:

```typescript
import { getStyleDetail } from 'stylekit-core/discovery'

const detail = getStyleDetail('neo-brutalist')
console.log(detail?.quality)
// { tier, capabilities, accessibilityScore, flags }
```

These signals describe available artifacts and review coverage. They are not a
guarantee that generated UI is production-ready or automatically WCAG compliant.

## Full Import

You can also import everything from the root:

```typescript
import {
  styles,
  getStyleTokens,
  contrastRatio,
} from 'stylekit-core'
```

## License

MIT

## 1.0.0-beta.6 release target

This release adds the stylekit-core/assets entry for browsing the public site
asset catalogue, along with discovery reliability and exact-match ranking
improvements. Install stylekit-core@1.0.0-beta.6 after the release workflow
publishes it. The latest dist-tag remains on an older prerelease line, so use
the explicit version or stylekit-core@beta.

```typescript
import { getImplementationBrief } from "stylekit-core/discovery";
import { lintStyleCode } from "stylekit-core/styles";

const brief = getImplementationBrief("neo-brutalist");
const report = lintStyleCode("neo-brutalist", code, {
  checkRequired: ["button"],
  strict: true,
});
```

Briefs contain full guidance, CSS, templates, recipe definitions, tokens,
readiness and merged `stylekit-lint-v1` rules. Provenance includes the bundled
origin and a deterministic content identifier. Lint reports pass/fail/inconclusive;
`ok` is false for unresolved runtime classes or unavailable rules. Required checks
cover a whole input and are advisory unless strict is enabled. A static pass
covers class rules and does not certify visual quality or accessibility.
