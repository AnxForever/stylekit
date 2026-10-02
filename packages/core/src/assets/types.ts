export const ASSET_SCHEMA_VERSION = "1" as const;

/** Public asset families exposed by StyleKit's bundled and live catalogues. */
export const ASSET_KINDS = [
  "style",
  "recipe",
  "animation",
  "background",
  "gradient",
  "shadow",
  "typography",
  "palette",
  "component-pattern",
  "spacing",
  "layout-grid",
  "design-principle",
  "visual-hierarchy",
  "type-scale",
  "archetype",
  "prompt",
  "template",
  "experience-pack",
] as const;

export const PUBLIC_ASSET_KINDS = ASSET_KINDS;

export type AssetKind = (typeof ASSET_KINDS)[number];
export type PublicAssetKind = AssetKind;

export function isAssetKind(value: unknown): value is AssetKind {
  return typeof value === "string" && (ASSET_KINDS as readonly string[]).includes(value);
}

export const isPublicAssetKind = isAssetKind;

export type AssetAvailability = "bundled" | "remote" | "external" | "restricted";
export type AssetContentLevel = "source" | "metadata" | "remote" | "restricted";

export interface AssetLicense {
  name: string;
  url?: string;
  notes?: string;
}

export interface AssetAttribution {
  source: string;
  author?: string;
  license?: string;
  url?: string;
}

export interface AssetSummary {
  id: string;
  kind: AssetKind;
  name: string;
  nameZh?: string;
  description: string;
  tags: string[];
  availability: AssetAvailability;
  /** States exactly what a consumer can obtain, independent of availability. */
  contentLevel: AssetContentLevel;
  sourceRef?: string;
  websiteUrl?: string;
  sourceUrls?: string[];
  license?: AssetLicense;
  attribution?: AssetAttribution;
  capabilities?: string[];
}

export interface PublicAssetDetail<TData = unknown> {
  schemaVersion: typeof ASSET_SCHEMA_VERSION;
  metadata: AssetSummary;
  data: TData;
  /** Copyable source for this asset; structured variants remain in `data`. */
  code?: string | string[];
  codeLanguage?: "css" | "tsx" | "json" | "text";
  dependencies: string[];
  attribution?: AssetAttribution;
  license?: AssetLicense;
  sourceUrls: string[];
  capabilities: string[];
}

export interface PublicAssetListResponse {
  schemaVersion: typeof ASSET_SCHEMA_VERSION;
  assets: AssetSummary[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
  /** Whole-catalogue counts, unaffected by the current query or page. */
  kindCounts: Record<AssetKind, number>;
}

export interface ListPublicAssetsOptions {
  kind?: AssetKind;
  query?: string;
  offset?: number;
  limit?: number;
}