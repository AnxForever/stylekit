# stylekit-core

StyleKit core library - design style tokens, recipes, and accessibility helpers for AI-driven UI generation.

## Installation

```bash
npm install stylekit-core
```

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

## 1.0.0-beta.5 release candidate

Complete implementation inputs are available in the locally built candidate;
public installs need this release to be published.

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
