# @stylekit/core

StyleKit core library - design style tokens, recipes, linter, and knowledge base for AI-driven UI generation.

## Installation

```bash
npm install @stylekit/core
```

## Modules

### Styles

Design style definitions, metadata, and token system.

```typescript
import { styles, getStyleBySlug, getStyleTokens } from '@stylekit/core/styles'

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
import { getStyleRecipes, getRecipe, renderRecipe } from '@stylekit/core/recipes'

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

### Linter

Validate code against style guidelines.

```typescript
import { lintCode, formatLintResult } from '@stylekit/core/linter'

const result = lintCode('neo-brutalist', '<button className="rounded-full shadow-sm">')
console.log(formatLintResult(result))
```

### Knowledge

Design knowledge base with search across products, colors, typography, UX, and more.

```typescript
import { searchKnowledge, getDesignRecommendation } from '@stylekit/core/knowledge'

// Search across all domains
const results = searchKnowledge('SaaS dashboard')

// Get a full design recommendation
const recommendation = getDesignRecommendation('e-commerce landing page')
```

### Accessibility

WCAG 2.1 compliance checking for design styles.

```typescript
import { contrastRatio, meetsAA, scoreStyle } from '@stylekit/core/accessibility'

// Check contrast ratio
const ratio = contrastRatio('#000000', '#ffffff') // 21

// Score a style for accessibility
const score = scoreStyle('neo-brutalist')
```

### Quality

Quality scoring for style definitions.

```typescript
import { scoreStyleQuality, generateQualityReport } from '@stylekit/core/quality'

// Score a single style
const score = scoreStyleQuality('glassmorphism')

// Generate a full quality report
const report = generateQualityReport()
```

## Full Import

You can also import everything from the root:

```typescript
import {
  styles,
  getStyleTokens,
  lintCode,
  searchKnowledge,
  contrastRatio,
} from '@stylekit/core'
```

## License

MIT
