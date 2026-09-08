// Specimen palettes -- the paper and ink each font pairing is printed on.
//
// A catalogue that sets every specimen on the same sheet reads as a spreadsheet:
// nothing separates one pairing from the next at a glance, and in dark mode the
// whole page collapses into one black rectangle. Specimen books solve this by
// giving each face its own stock. These are strict duotones -- one paper, one
// ink, no gradients or glows -- pulled from print stocks rather than screen
// palettes, so the letterforms stay the subject and the colour stays the ground.

import type { FontPairing, TypographyCategory } from "./index";

export interface SpecimenPalette {
  id: string;
  /** Ground and type for the light theme. */
  paper: string;
  ink: string;
  /** Ground and type for the dark theme. Some stocks deliberately invert. */
  paperDark: string;
  inkDark: string;
}

const PALETTES = {
  ivory: {
    id: "ivory",
    paper: "#f4efe4",
    ink: "#241c14",
    paperDark: "#1d1810",
    inkDark: "#f0e7d6",
  },
  newsprint: {
    id: "newsprint",
    paper: "#ebe7de",
    ink: "#1c1b18",
    paperDark: "#1a1a17",
    inkDark: "#eae7de",
  },
  blueprint: {
    id: "blueprint",
    paper: "#e4eaf1",
    ink: "#152030",
    paperDark: "#121b28",
    inkDark: "#dce7f4",
  },
  oxblood: {
    id: "oxblood",
    paper: "#f1e5e2",
    ink: "#3a1b1a",
    paperDark: "#241413",
    inkDark: "#f3ded8",
  },
  sage: {
    id: "sage",
    paper: "#e5ece4",
    ink: "#1b2a1e",
    paperDark: "#131f16",
    inkDark: "#dfece1",
  },
  ochre: {
    id: "ochre",
    paper: "#f6ecd9",
    ink: "#3a2a11",
    paperDark: "#211a0b",
    inkDark: "#f4e6c7",
  },
  slate: {
    id: "slate",
    paper: "#e8eaec",
    ink: "#14171a",
    paperDark: "#171a1e",
    inkDark: "#e5e9ed",
  },
  plum: {
    id: "plum",
    paper: "#eee8f0",
    ink: "#251b2d",
    paperDark: "#1c1524",
    inkDark: "#e9e0f0",
  },
  apricot: {
    id: "apricot",
    paper: "#fbeade",
    ink: "#3b2412",
    paperDark: "#251708",
    inkDark: "#fae1c8",
  },
  teal: {
    id: "teal",
    paper: "#e1edec",
    ink: "#11262a",
    paperDark: "#0f2124",
    inkDark: "#daeeee",
  },
  // Inverted stocks. Display and handwritten faces are drawn to be seen large
  // and reversed out, and the flipped grounds give the wall of specimens a
  // rhythm instead of one flat field -- in both themes.
  midnight: {
    id: "midnight",
    paper: "#17161b",
    ink: "#efeae0",
    paperDark: "#eae5da",
    inkDark: "#17161b",
  },
  carbon: {
    id: "carbon",
    paper: "#1b1a17",
    ink: "#ece4d4",
    paperDark: "#e9e3d6",
    inkDark: "#1b1a17",
  },
} as const satisfies Record<string, SpecimenPalette>;

type PaletteId = keyof typeof PALETTES;

// Two or three stocks per category, so neighbouring cards in the same category
// never print alike while the mood still matches the pairing.
const CATEGORY_STOCKS: Record<TypographyCategory, readonly PaletteId[]> = {
  classic: ["ivory", "ochre", "oxblood"],
  modern: ["slate", "blueprint"],
  playful: ["apricot", "sage", "teal"],
  editorial: ["newsprint", "ivory"],
  technical: ["blueprint", "slate", "teal"],
  elegant: ["plum", "ivory", "oxblood"],
  display: ["midnight", "carbon"],
  handwritten: ["ivory", "apricot"],
};

const FALLBACK_STOCKS: readonly PaletteId[] = ["newsprint", "slate"];

// Stable per-id pick: the same pairing always prints on the same stock, whatever
// the current filter or sort. Kept pure so there is no module-level table to
// build (and therefore no import cycle with the catalogue itself).
function hashId(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i += 1) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function specimenPalette(pairing: FontPairing): SpecimenPalette {
  const stocks = CATEGORY_STOCKS[pairing.category] ?? FALLBACK_STOCKS;
  return PALETTES[stocks[hashId(pairing.id) % stocks.length]];
}

export const specimenPalettes = PALETTES;
