// Style Version Control - Type Definitions

export interface StyleVersion {
  version: string; // semver: "1.0.0"
  date: string; // ISO date: "2025-01-15"
  changes: string[]; // changelog entries
}

export interface StyleVersionHistory {
  current: string; // current version
  contentHash: string; // hash of current token+recipe content
  versions: StyleVersion[];
}

export type StyleVersionRegistry = Record<string, StyleVersionHistory>;

/** Categories that can change between versions */
export type ChangeCategory =
  | "colors"
  | "typography"
  | "spacing"
  | "shadows"
  | "borders"
  | "interaction"
  | "forbidden"
  | "required"
  | "recipes";
