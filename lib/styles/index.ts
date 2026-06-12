// Public style catalog entrypoint.

export type { StyleAtoms, StyleAtomField, StyleAtomKey } from "./atoms";
export { readAtom, hasCompleteAtoms } from "./atoms";

export {
  type StyleCategory,
  type StyleType,
  type StyleTag,
  type StyleMeta,
  stylesMeta,
  getAllStylesMeta,
  getStyleMetaBySlug,
} from "./meta";

export type {
  StyleVariant,
  DesignStyle,
  ExamplePrompt,
  ComponentTemplate,
} from "./types";

export { styles, getStyleBySlug } from "./registry";
