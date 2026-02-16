# StyleKit Style Lint Action

A GitHub Action that checks your code against StyleKit design style guidelines. Validates Tailwind CSS classes in your JSX/TSX files to ensure they follow a specific design style.

## Usage

```yaml
- uses: ./.github/actions/stylekit-lint
  with:
    style: neo-brutalist
    files: 'src/**/*.tsx'
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `style` | Style slug to lint against | Yes | - |
| `files` | Glob pattern for files to check | Yes | `src/**/*.tsx` |
| `fail-on-error` | Fail the action if lint errors are found | No | `true` |
| `node-version` | Node.js version to use | No | `20` |

## Available Styles

- `neo-brutalist` - Sharp corners, hard shadows, bold colors
- `neubrutalism` - Modern brutalist with thick borders
- `glassmorphism` - Frosted glass, translucent backgrounds
- `neumorphism` - Soft extruded shapes, dual shadows
- `soft-ui` - Rounded, elevated, gentle shadows
- `minimalism` - Swiss style, clean whitespace
- `minimalist-flat` - Zero shadows, solid colors
- `corporate-clean` - Professional, subtle styling
- `natural-organic` - Earth tones, organic shapes
- `dark-mode` - OLED-optimized dark interfaces
- `cyberpunk-neon` - Neon glows, terminal aesthetic
- `retro-vintage` - Warm tones, serif fonts
- `bento-grid` - Box grid layout style
- `editorial` - Typography-focused, minimal

## Example: PR Lint Check

```yaml
name: StyleKit Lint
on: [pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/actions/stylekit-lint
        with:
          style: neo-brutalist
          files: 'src/**/*.tsx'
```

## Example: Multiple Styles

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        include:
          - style: neo-brutalist
            files: 'src/components/brutalist/**/*.tsx'
          - style: glassmorphism
            files: 'src/components/glass/**/*.tsx'
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/actions/stylekit-lint
        with:
          style: ${{ matrix.style }}
          files: ${{ matrix.files }}
```

## Output

The action outputs GitHub Actions annotations (errors and warnings) directly in the PR diff view. Each style violation appears as an inline annotation on the relevant line of code.
