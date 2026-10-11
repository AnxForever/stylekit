# StyleKit identity

The public product name is **StyleKit** in both Chinese and English. It is an
open-source visual style library for AI-assisted web development: named styles,
design tokens, component recipes, Tailwind constraints, and reusable prompts.
Logo concept labels are not product names or public-facing taglines.

## Website assets

- Use `components/brand/stylekit-logo.tsx` for the navigation, login card, and
  footer. The default mark adapts to light and dark themes; `inverse` is for a
  consistently dark background.
- Current website assets live in `public/brand/v3/`, referenced through
  `lib/brand/assets.ts`. Change the versioned paths when replacing the identity
  so browsers and social crawlers request fresh assets.
- Horizontal SVGs use an outlined wordmark that does not
  require downloading a font. Keep the full viewBox and aspect ratio.
- The shared document declares versioned favicon, SVG, Apple Touch, and manifest
  links. `public/favicon.ico` remains a compatible fallback for direct requests;
  do not add an `app/favicon.ico` convention file that injects another fixed URL.
- PNG, SVG, Apple Touch, and manifest icons use the small-size S mark. The
  maskable icon has additional safe-area padding.
- README light and dark logo files use the same horizontal identity.
- Shared link previews use the 1200 by 630 brand card, not an outdated homepage
  screenshot. Style, animation, blog, and prompt previews retain their own content
  and use the same approved logo. Their metadata URLs carry a brand version.

Run `node tools/scripts/generate-brand-assets.mjs` to synchronize the versioned
icons and render the social card from the approved outlined SVG. Rendering uses
the locally installed Noto Sans font; it does not fetch fonts or images. The
legacy homepage preview URLs also serve the current card for older external links.

The wordmark is derived from Playfair Display Regular, distributed under the
SIL Open Font License. The license is included at
`public/brand/OFL-PlayfairDisplay.txt`.
