# StyleKit identity

The public product name is **StyleKit** in both Chinese and English. It is an
open-source visual style library for AI-assisted web development: named styles,
design tokens, component recipes, Tailwind constraints, and reusable prompts.
Logo concept labels are not product names or public-facing taglines.

## Website assets

- Use `components/brand/stylekit-logo.tsx` for the navigation, login card, and
  footer. The default mark adapts to light and dark themes; `inverse` is for a
  consistently dark background.
- Horizontal SVGs live in `public/brand/`. Their outlined wordmark does not
  require downloading a font. Keep the full viewBox and aspect ratio.
- `app/favicon.ico` and `public/favicon.ico` contain the same multi-size icon.
  Keep both copies synchronized while the existing icon routes are in use.
- PNG, SVG, Apple Touch, and manifest icons use the small-size S mark. The
  maskable icon has additional safe-area padding.
- README light and dark logo files use the same horizontal identity.

The wordmark is derived from Playfair Display Regular, distributed under the
SIL Open Font License. The license is included at
`public/brand/OFL-PlayfairDisplay.txt`.
