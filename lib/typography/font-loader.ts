// Webfont loading for the specimen wall.
//
// The catalogue draws 41 pairings across 53 families. The first implementation
// injected a stylesheet <link> per card as it scrolled into view: ~40 separate
// CSS requests, and every insertion into <head> forces a style recalculation
// over a 13,000px document. That recalc storm is what made scrolling stutter.
//
// Two changes: the @font-face rules for the whole catalogue go in once, in a
// few staggered batches while the page is settling, so nothing mutates <head>
// during a scroll; and the actual font files are warmed through the CSS Font
// Loading API as a card approaches the viewport, which is a fetch rather than a
// DOM mutation. `content-visibility` on the cards keeps the browser from
// downloading faces for specimens nobody has scrolled to.

import { generateGoogleFontsUrl, FONT_CDN_ORIGINS, type FontSpec } from "./index";

// Google's css2 endpoint takes many families per request, but one huge URL also
// means one slow response holding up every specimen. Batches keep the first
// sheets painting while the rest arrive.
const MAX_FAMILIES_PER_REQUEST = 8;
// Enough of a gap that each batch's style recalculation lands in its own frame.
const BATCH_STAGGER_MS = 100;

let faceRules: Promise<void> | null = null;
let preconnected = false;
const warmed = new Set<string>();

const specKey = (spec: FontSpec) => `${spec.family}:${spec.weight}`;

function preconnect() {
  if (preconnected) return;
  preconnected = true;
  for (const origin of FONT_CDN_ORIGINS) {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = origin;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }
}

function batchByFamily(specs: FontSpec[]): FontSpec[][] {
  // Chunk by family, not by spec: two weights of one family cost a single
  // `family=` parameter, so counting specs would under-fill every request.
  const byFamily = new Map<string, FontSpec[]>();
  for (const spec of specs) {
    const group = byFamily.get(spec.family) ?? [];
    group.push(spec);
    byFamily.set(spec.family, group);
  }

  const families = [...byFamily.values()];
  const batches: FontSpec[][] = [];
  for (let i = 0; i < families.length; i += MAX_FAMILIES_PER_REQUEST) {
    batches.push(families.slice(i, i + MAX_FAMILIES_PER_REQUEST).flat());
  }
  return batches;
}

/**
 * Register every face the catalogue can show. Call once, with the specs in the
 * order they appear on the page -- the first batch ships immediately, so the
 * specimens at the top of the wall get their fonts first. Resolves when the
 * last batch has landed (or failed); repeat calls return the same promise.
 */
export function loadFontFaces(specs: FontSpec[]): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  if (faceRules) return faceRules;

  preconnect();
  const batches = batchByFamily(specs);

  faceRules = new Promise<void>((resolve) => {
    let remaining = batches.length;
    if (remaining === 0) {
      resolve();
      return;
    }

    batches.forEach((batch, index) => {
      window.setTimeout(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = generateGoogleFontsUrl(batch);
        link.dataset.stylekitFonts = String(index);
        const settle = () => {
          remaining -= 1;
          if (remaining === 0) resolve();
        };
        link.addEventListener("load", settle, { once: true });
        link.addEventListener("error", settle, { once: true });
        document.head.appendChild(link);
      }, index * BATCH_STAGGER_MS);
    });
  });

  return faceRules;
}

/**
 * Start downloading the font files a specimen needs before it is on screen, so
 * the sheet paints in its real faces instead of swapping under the reader.
 */
export function warmFonts(specs: FontSpec[]): void {
  if (typeof document === "undefined" || !("fonts" in document)) return;

  const wanted = specs.filter((spec) => !warmed.has(specKey(spec)));
  if (wanted.length === 0) return;
  for (const spec of wanted) warmed.add(specKey(spec));

  const load = () => {
    for (const spec of wanted) {
      // No match yet is not an error -- the @font-face rule simply has not
      // arrived, and the second pass below covers it.
      document.fonts.load(`${spec.weight} 1em "${spec.family}"`).catch(() => {});
    }
  };

  load();
  faceRules?.then(load);
}

/** Test seam: forget everything this module has loaded. */
export function resetFontLoader(): void {
  faceRules = null;
  preconnected = false;
  warmed.clear();
}
