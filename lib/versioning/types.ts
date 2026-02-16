// Style Version Control - Type Definitions

export interface StyleVersion {
  version: string; // semver: "1.0.0"
  date: string; // ISO date: "2025-01-01"
  changes: string[]; // changelog entries
}

export interface StyleVersionHistory {
  current: string; // current version
  versions: StyleVersion[];
}

export type StyleVersionRegistry = Record<string, StyleVersionHistory>;
