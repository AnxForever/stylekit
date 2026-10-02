/** Registers all StyleKit MCP tools on a server instance. */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import {
  searchStylesLive,
  getStyleDetailLive,
  getTokensLive,
  knownSlugLive,
  shadcnInstallCommand,
  registryUrl,
  getImplementationBriefLive,
  getComponentRecipeLive,
  ASSET_KINDS,
  listPublicAssetsLive,
  getPublicAssetLive,
  lintCodeWithRules,
  rulesFromBrief,
  type AssetKind,
  type PublicAssetDetail,
  type StyleCategory,
  type StyleLintComponent,
} from "./data.js";
import type { RemoteOptions } from "stylekit-core/discovery";
import { toolResult, errorResult } from "./format.js";

const READ_ONLY = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: true,
} as const;

const CATEGORIES = ["modern", "retro", "minimal", "expressive"] as const;

const RANKING_LABEL = {
  exact: "exact slug/name match prioritized",
  hybrid: "hybrid search (BM25 + vector + RRF)",
  keyword: "keyword search (vector path unavailable)",
  local: "local scorer",
} as const;

// Shared output shapes (so clients get typed structuredContent).
const SUMMARY_SHAPE = {
  slug: z.string(),
  name: z.string(),
  nameEn: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  description: z.string(),
} as const;

const DETAIL_SHAPE = {
  ...SUMMARY_SHAPE,
  philosophy: z.string(),
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.array(z.string()),
  }),
  doList: z.array(z.string()),
  dontList: z.array(z.string()),
  keywords: z.array(z.string()),
  hasTokens: z.boolean(),
  hasRecipes: z.boolean(),
  recipeIds: z.array(z.string()),
  shadcnInstall: z.string(),
  url: z.string(),
  quality: z.object({
    tier: z.enum(["curated", "baseline"]),
    capabilities: z.object({
      tokens: z.enum(["complete", "partial", "fallback", "missing"]),
      recipes: z.enum(["complete", "partial", "fallback", "missing"]),
      componentCode: z.enum(["complete", "partial", "fallback", "missing"]),
      variants: z.enum(["complete", "partial", "fallback", "missing"]),
      readiness: z.enum(["curated", "fallback"]),
      darkMode: z.enum(["complete", "partial", "fallback", "missing"]),
      accessibility: z.enum(["scored", "unavailable"]),
    }),
    accessibilityScore: z.number().nullable(),
    flags: z.array(z.string()),
  }),
  origin: z.enum(["live", "bundled"]),
  fallbackReason: z.string().optional(),
} as const;

const STYLE_TOKENS_SHAPE = z.object({
  border: z.object({
    width: z.string(),
    color: z.string(),
    radius: z.string(),
    style: z.string().optional(),
  }),
  shadow: z.object({
    sm: z.string(),
    md: z.string(),
    lg: z.string(),
    none: z.string(),
    hover: z.string(),
    focus: z.string(),
    colored: z.record(z.string(), z.string()).optional(),
  }),
  interaction: z.object({
    hoverScale: z.string().optional(),
    hoverTranslate: z.string().optional(),
    hoverOpacity: z.string().optional(),
    transition: z.string(),
    active: z.string().optional(),
  }),
  typography: z.object({
    heading: z.string(),
    subtitle: z.string().optional(),
    body: z.string(),
    mono: z.string().optional(),
    sizes: z.object({
      hero: z.string(),
      h1: z.string(),
      h2: z.string(),
      h3: z.string(),
      body: z.string(),
      small: z.string(),
    }),
    neonStroke: z.record(z.string(), z.unknown()).optional(),
  }),
  spacing: z.object({
    section: z.string(),
    container: z.string(),
    card: z.string(),
    gap: z.object({ sm: z.string(), md: z.string(), lg: z.string() }),
  }),
  colors: z.object({
    background: z.object({
      primary: z.string(),
      secondary: z.string(),
      accent: z.array(z.string()),
    }),
    text: z.object({
      primary: z.string(),
      secondary: z.string(),
      muted: z.string(),
    }),
    button: z.object({
      primary: z.string(),
      secondary: z.string(),
      danger: z.string().optional(),
    }),
  }),
  forbidden: z.object({
    classes: z.array(z.string()),
    patterns: z.array(z.string()),
    reasons: z.record(z.string(), z.string()),
  }),
  required: z.object({
    button: z.array(z.string()),
    card: z.array(z.string()),
    input: z.array(z.string()),
  }),
});

const STYLE_TOKENS_OUTPUT_SHAPE = STYLE_TOKENS_SHAPE.extend({
  origin: z.enum(["live", "bundled"]),
  fallbackReason: z.string().optional(),
});

function unknownSlug(slug: string) {
  return errorResult(
    `Unknown style "${slug}". Use stylekit_search_styles to find a valid slug (e.g. "glassmorphism", "neo-brutalist").`,
  );
}

type SourceIssue = {
  failureKind?: "not-found" | "unavailable" | "unsupported";
  fallbackReason?: string;
};

function sourceUnavailable(subject: string, source: SourceIssue) {
  const reason = source.fallbackReason ? ` StyleKit reported: ${source.fallbackReason}.` : "";
  return errorResult(`StyleKit source is unavailable; ${subject} could not be confirmed.${reason} Try again when the live source is available.`);
}

function styleLookupFailure(slug: string, source: SourceIssue) {
  return source.failureKind === "not-found"
    ? unknownSlug(slug)
    : sourceUnavailable(`Style "${slug}"`, source);
}

const ASSET_AVAILABILITY = ["bundled", "remote", "external", "restricted"] as const;
const ASSET_CONTENT_LEVEL = ["source", "metadata", "remote", "restricted"] as const;

const ASSET_LICENSE_SHAPE = z.object({
  name: z.string(),
  url: z.string().optional(),
  notes: z.string().optional(),
});

const ASSET_ATTRIBUTION_SHAPE = z.object({
  source: z.string(),
  author: z.string().optional(),
  license: z.string().optional(),
  url: z.string().optional(),
});

const ASSET_SUMMARY_SHAPE = z.object({
  id: z.string(),
  kind: z.enum(ASSET_KINDS),
  name: z.string(),
  nameZh: z.string().optional(),
  description: z.string(),
  tags: z.array(z.string()),
  availability: z.enum(ASSET_AVAILABILITY),
  contentLevel: z.enum(ASSET_CONTENT_LEVEL),
  sourceRef: z.string().optional(),
  websiteUrl: z.string().optional(),
  sourceUrls: z.array(z.string()).optional(),
  license: ASSET_LICENSE_SHAPE.optional(),
  attribution: ASSET_ATTRIBUTION_SHAPE.optional(),
  capabilities: z.array(z.string()).optional(),
});

const ASSET_DETAIL_SHAPE = z.object({
  schemaVersion: z.literal("1"),
  metadata: ASSET_SUMMARY_SHAPE,
  data: z.unknown(),
  code: z.union([z.string(), z.array(z.string())]).optional(),
  codeLanguage: z.enum(["css", "tsx", "json", "text"]).optional(),
  dependencies: z.array(z.string()),
  attribution: ASSET_ATTRIBUTION_SHAPE.optional(),
  license: ASSET_LICENSE_SHAPE.optional(),
  sourceUrls: z.array(z.string()),
  capabilities: z.array(z.string()),
}).passthrough();

function assetDetailForOutput(detail: PublicAssetDetail): PublicAssetDetail {
  const restricted = detail.metadata.availability === "restricted" ||
    detail.metadata.contentLevel === "restricted";
  const metadataOnly = detail.metadata.availability === "external" ||
    detail.metadata.contentLevel === "metadata" || restricted;
  const incompleteRemoteTemplate = detail.metadata.kind === "template" &&
    detail.metadata.availability === "remote" && !hasCompleteTemplateFiles(detail);
  if (!metadataOnly && !incompleteRemoteTemplate) {
    return detail;
  }

  // Keep the public identity, license, attribution, and links, but suppress
  // source payloads that are restricted, metadata-only, or incomplete.
  const safeData: Record<string, unknown> = {};
  if (incompleteRemoteTemplate && detail.data && typeof detail.data === "object" && !Array.isArray(detail.data)) {
    const data = detail.data as Record<string, unknown>;
    if (data.sourceFilesIncluded === false) safeData.sourceFilesIncluded = false;
    if (typeof data.downloadUrl === "string") safeData.downloadUrl = data.downloadUrl;
  }
  return {
    schemaVersion: detail.schemaVersion,
    metadata: {
      ...detail.metadata,
      contentLevel: restricted
        ? "restricted"
        : incompleteRemoteTemplate
          ? detail.metadata.contentLevel
          : "metadata",
    },
    data: safeData,
    dependencies: [],
    ...(detail.attribution ?? detail.metadata.attribution
      ? { attribution: detail.attribution ?? detail.metadata.attribution }
      : {}),
    ...(detail.license ?? detail.metadata.license
      ? { license: detail.license ?? detail.metadata.license }
      : {}),
    sourceUrls: detail.sourceUrls ?? detail.metadata.sourceUrls ?? [],
    capabilities: detail.capabilities ?? detail.metadata.capabilities ?? [],
  };
}

function hasCompleteTemplateFiles(detail: PublicAssetDetail): boolean {
  if (detail.metadata.kind !== "template" || detail.metadata.availability !== "remote") return true;
  const data = detail.data;
  if (!data || typeof data !== "object" || Array.isArray(data)) return false;
  const record = data as Record<string, unknown>;
  const files = record.files;
  if (record.sourceFilesIncluded !== true || !files || typeof files !== "object" || Array.isArray(files)) return false;
  const fileMap = files as Record<string, unknown>;
  const entries = Object.entries(fileMap);
  if (entries.length === 0 || entries.some(([path, content]) =>
    typeof content !== "string" || path.length === 0 || path.startsWith("/") ||
    path.includes("\\") || path.split("/").includes(".."),
  )) return false;
  if (typeof fileMap["app/page.tsx"] !== "string" ||
      typeof fileMap["app/globals.css"] !== "string" ||
      typeof fileMap["package.json"] !== "string") return false;
  try {
    const packageJson: unknown = JSON.parse(fileMap["package.json"] as string);
    return Boolean(packageJson) && typeof packageJson === "object" && !Array.isArray(packageJson);
  } catch {
    return false;
  }
}

function assetFailure(
  kind: AssetKind,
  id: string,
  source: { origin: "live" | "bundled"; failureKind?: "not-found" | "unavailable" | "unsupported"; fallbackReason?: string },
  partial?: PublicAssetDetail,
) {
  const failureKind = source.failureKind ?? "unavailable";
  const message = failureKind === "not-found"
    ? `Unknown public asset "${kind}/${id}". Use stylekit_list_assets to find a valid namespaced id.`
    : failureKind === "unsupported"
      ? `StyleKit lists "${kind}/${id}", but its detail endpoint is unsupported.`
      : `The source for "${kind}/${id}" is unavailable. No complete asset source was returned.`;
  return errorResult(JSON.stringify({
    error: message,
    kind,
    id,
    source: source.origin,
    failureKind,
    ...(source.fallbackReason ? { fallbackReason: source.fallbackReason } : {}),
    ...(partial ? { asset: assetDetailForOutput(partial) } : {}),
  }));
}

export function registerStyleKitTools(server: McpServer, remoteOptions: RemoteOptions = {}): void {
  // 1) Search
  server.registerTool(
    "stylekit_search_styles",
    {
      title: "Search StyleKit styles",
      description: `Search StyleKit design styles by keyword and/or category, with pagination. Exact slug or name matches are ranked first.

Args:
  - query (string, optional): matches slug, name, description, tags, keywords (case-insensitive).
  - category ('modern'|'retro'|'minimal'|'expressive', optional): restrict to one category.
  - limit (number 1-50, default 15): page size.
  - offset (number >=0, default 0): results to skip (for paging).

Returns structured JSON with total, count, offset, has_more, source, optional fallbackReason, and results. A valid query with no matches returns an empty results array, not a tool error.

Examples:
  - "find a glassy frosted style" -> query: "glass"
  - "next page of retro styles" -> category: "retro", offset: 15
  - For full tokens of one style, use stylekit_get_style_tokens instead.`,
      inputSchema: {
        query: z.string().max(100).optional().describe("Keyword to match"),
        category: z
          .enum(CATEGORIES)
          .optional()
          .describe("Style category filter"),
        limit: z
          .number()
          .int()
          .min(1)
          .max(50)
          .default(15)
          .describe("Page size"),
        offset: z
          .number()
          .int()
          .min(0)
          .default(0)
          .describe("Results to skip for pagination"),
      },
      outputSchema: {
        total: z.number(),
        count: z.number(),
        offset: z.number(),
        has_more: z.boolean(),
        ranking: z.enum(["exact", "hybrid", "keyword", "local"]).optional(),
        source: z.enum(["live", "bundled"]),
        fallbackReason: z.string().optional(),
        results: z.array(z.object(SUMMARY_SHAPE)),
      },
      annotations: READ_ONLY,
    },
    async ({ query, category, limit, offset }) => {
      const search = await searchStylesLive({
        query,
        category: category as StyleCategory | undefined,
      }, remoteOptions);
      const { total, results: all } = search.data;
      const page = all.slice(offset, offset + limit);
      const hasMore = offset + page.length < total;
      const sourceLabel = search.origin === "live" ? "live catalogue" : "bundled snapshot";
      const lines = [
        `# StyleKit styles${query ? ` matching "${query}"` : ""}`,
        `Found ${total} (showing ${page.length}${offset ? ` from offset ${offset}` : ""})${search.ranking ? ` · ranked by ${RANKING_LABEL[search.ranking]}` : ""}.`,
        `Source: ${sourceLabel}${search.fallbackReason ? `; live lookup unavailable (${search.fallbackReason})` : ""}.`,
        "",
        ...(page.length > 0
          ? page.map(
              (r) =>
                `- **${r.nameEn}** (\`${r.slug}\`) — ${r.category} · ${r.tags.join(", ")}\n  ${r.description}`,
            )
          : [`No styles match${query ? ` "${query}"` : ""}${category ? ` in category "${category}"` : ""}${offset ? ` at offset ${offset}` : ""}. Try a broader query, drop the category filter, or lower the offset.`]),
        ...(hasMore ? ["", `…more available — call again with offset: ${offset + page.length}.`] : []),
      ];
      return toolResult(lines.join("\n"), {
        total,
        count: page.length,
        offset,
        has_more: hasMore,
        ...(search.ranking ? { ranking: search.ranking } : {}),
        source: search.origin,
        ...(search.fallbackReason ? { fallbackReason: search.fallbackReason } : {}),
        results: page,
      });
    },
  );

  // Public design assets and templates.
  server.registerTool(
    "stylekit_list_assets",
    {
      title: "List public StyleKit assets",
      description: `Browse StyleKit's public asset catalogue by namespace and query. Use the returned kind/id pair with stylekit_get_asset.

Args:
  - kind (optional): one public namespace such as animation, component-pattern, template, or experience-pack.
  - query (optional): search public names, descriptions and tags.
  - offset (number >=0, default 0): results to skip.
  - limit (number 1-100, default 20): page size.

Returns the full JSON page, including availability, contentLevel, license, attribution, source provenance, and kind counts. An empty page is a successful result. Private user kits and unpublished submissions are not listed.`,
      inputSchema: {
        kind: z.enum(ASSET_KINDS).optional().describe("Public asset namespace"),
        query: z.string().max(500).optional().describe("Search names, descriptions and tags"),
        offset: z.number().int().min(0).default(0).describe("Results to skip"),
        limit: z.number().int().min(1).max(100).default(20).describe("Page size"),
      },
      outputSchema: {
        schemaVersion: z.literal("1"),
        assets: z.array(ASSET_SUMMARY_SHAPE),
        total: z.number(),
        offset: z.number(),
        limit: z.number(),
        hasMore: z.boolean(),
        kindCounts: z.record(z.string(), z.number()),
        source: z.enum(["live", "bundled"]),
        fallbackReason: z.string().optional(),
      },
      annotations: READ_ONLY,
    },
    async ({ kind, query, offset, limit }) => {
      const page = await listPublicAssetsLive({
        kind: kind as AssetKind | undefined,
        query,
        offset,
        limit,
      });
      const structured = {
        ...page.data,
        source: page.origin,
        ...(page.fallbackReason ? { fallbackReason: page.fallbackReason } : {}),
      };
      return toolResult(JSON.stringify(structured), structured, true);
    },
  );

  server.registerTool(
    "stylekit_get_asset",
    {
      title: "Get a public StyleKit asset",
      description: `Retrieve one public asset by its exact kind and id. Source is returned only where the asset's contentLevel and license permit it. Remote templates include their actual file set only when the live source is available; if it is down, the tool returns a structured unavailable error with safe metadata and does not treat a download URL as source code. External and restricted assets expose metadata, license, attribution and source links only.

Args:
  - kind: the namespace returned by stylekit_list_assets.
  - id: the exact identifier within that namespace.

Returns complete structured JSON and JSON text, preserving the namespace and provenance.`,
      inputSchema: {
        kind: z.enum(ASSET_KINDS).describe("Public asset namespace"),
        id: z.string().regex(/^[a-z0-9][a-z0-9-]{0,127}$/).describe("Exact asset id within the namespace"),
      },
      outputSchema: {
        ...ASSET_DETAIL_SHAPE.shape,
        source: z.enum(["live", "bundled"]),
        fallbackReason: z.string().optional(),
      },
      annotations: READ_ONLY,
    },
    async ({ kind, id }) => {
      const source = await getPublicAssetLive(kind as AssetKind, id);
      const detail = source.data;
      const hasUnavailableRemoteSource = Boolean(
        detail && source.failureKind === "unavailable" &&
        (detail.metadata.availability === "remote" || detail.metadata.contentLevel === "remote"),
      );
      if (!detail || source.failureKind === "not-found" ||
          (source.failureKind === "unsupported" && source.origin === "live") ||
          hasUnavailableRemoteSource) {
        return assetFailure(kind as AssetKind, id, source, detail ?? undefined);
      }
      if (!hasCompleteTemplateFiles(detail)) {
        return assetFailure(kind as AssetKind, id, {
          origin: source.origin,
          failureKind: "unavailable",
          fallbackReason: "remote template detail did not include the actual project files",
        }, detail);
      }
      const structured = {
        ...assetDetailForOutput(detail),
        source: source.origin,
        ...(source.fallbackReason ? { fallbackReason: source.fallbackReason } : {}),
      };
      return toolResult(JSON.stringify(structured), structured, true);
    },
  );

  // 2) Style detail
  server.registerTool(
    "stylekit_get_style",
    {
      title: "Get StyleKit style detail",
      description: `Get one style's full profile: philosophy, palette, do/don't rules, keywords, and what's available (tokens, recipes, shadcn install). Style data is read from the live catalogue with a five-minute cache; when live data is unavailable, a bundled snapshot may be returned and marked with origin and fallbackReason.

Args:
  - slug (string): style identifier, e.g. "glassmorphism", "neo-brutalist".

Returns JSON: { slug, name, nameEn, category, tags, description, philosophy, colors, doList, dontList, keywords, hasTokens, hasRecipes, recipeIds, shadcnInstall, url, quality, origin, fallbackReason? }. The content provenance is separate from origin when returned by the implementation brief.

Examples:
  - "how should I use neo-brutalist?" -> slug: "neo-brutalist"
  - Returns an error with a hint if the slug is unknown.`,
      inputSchema: {
        slug: z.string().min(1).describe("Style slug, e.g. 'glassmorphism'"),
      },
      outputSchema: DETAIL_SHAPE,
      annotations: READ_ONLY,
    },
    async ({ slug }) => {
      const detailSource = await getStyleDetailLive(slug, remoteOptions);
      const detail = detailSource.data;
      if (!detail) return styleLookupFailure(slug, detailSource);
      const structured = {
        ...detail,
        origin: detailSource.origin,
        ...(detailSource.fallbackReason ? { fallbackReason: detailSource.fallbackReason } : {}),
      };
      const lines = [
        `# ${detail.nameEn} (${detail.name}) — \`${detail.slug}\``,
        `Catalogue origin: ${detailSource.origin}${detailSource.fallbackReason ? `; fallback: ${detailSource.fallbackReason}` : ""}.`,
        `Category: ${detail.category} · Tags: ${detail.tags.join(", ")}`,
        "",
        detail.philosophy,
        "",
        `**Palette**: primary ${detail.colors.primary}, secondary ${detail.colors.secondary}, accents ${detail.colors.accent.join(", ")}`,
        "",
        "**Do**:",
        ...detail.doList.map((d) => `- ${d}`),
        "",
        "**Don't**:",
        ...detail.dontList.map((d) => `- ${d}`),
        "",
        `Tokens: ${detail.hasTokens ? "yes" : "no"} · Recipes: ${detail.recipeIds.join(", ") || "none"}`,
        `Install theme: \`${detail.shadcnInstall}\``,
      ];
      return toolResult(lines.join("\n"), structured);
    },
  );

  // 3) Design tokens
  server.registerTool(
    "stylekit_get_style_tokens",
    {
      title: "Get StyleKit style design tokens",
      description: `Get a style's design tokens (Tailwind class mappings): border, shadow, typography, spacing, semantic colors, and forbidden/required classes. Style data is read from the live catalogue with a five-minute cache; when live data is unavailable, a bundled snapshot may be returned and marked with origin and fallbackReason.

Args:
  - slug (string): style identifier.

Returns JSON: the full StyleTokens object plus origin (live or bundled) and optional fallbackReason. Content provenance is distinct from transport origin.

Examples:
  - "give me the spacing and border tokens for bento-grid" -> slug: "bento-grid"
  - Returns an error if the style has no tokens registered.`,
      inputSchema: {
        slug: z.string().min(1).describe("Style slug"),
      },
      outputSchema: STYLE_TOKENS_OUTPUT_SHAPE,
      annotations: READ_ONLY,
    },
    async ({ slug }) => {
      const tokensSource = await getTokensLive(slug, remoteOptions);
      const tokens = tokensSource.data;
      if (!tokens) {
        if (tokensSource.failureKind === "unavailable" || tokensSource.failureKind === "unsupported") {
          return sourceUnavailable(`Tokens for style "${slug}"`, tokensSource);
        }
        const known = await knownSlugLive(slug, remoteOptions);
        if (known.data) {
          return errorResult(
            `Style "${slug}" exists but has no registered design tokens. Use stylekit_get_style for its palette and rules instead.`,
          );
        }
        return styleLookupFailure(slug, known);
      }
      const structured = {
        ...(tokens as unknown as Record<string, unknown>),
        origin: tokensSource.origin,
        ...(tokensSource.fallbackReason ? { fallbackReason: tokensSource.fallbackReason } : {}),
      };
      return toolResult(JSON.stringify(structured, null, 2), structured, true);
    },
  );

  // 4) Component recipe
  server.registerTool(
    "stylekit_get_component_recipe",
    {
      title: "Get StyleKit component recipe",
      description: `Render a ready-to-use component for a style: the full Tailwind className and JSX code. Components are usually "button", "card", "input" (check recipeIds via stylekit_get_style). Recipe data is read from the live catalogue with a five-minute cache; a bundled snapshot may be returned during an outage and is marked with origin and fallbackReason.

Args:
  - slug (string): style identifier.
  - component (string): recipe id, e.g. "button", "card", "input".

Returns JSON: { slug, component, className, code, origin, fallbackReason? }.

Examples:
  - "give me a glassmorphism button" -> slug: "glassmorphism", component: "button"
  - Returns an error listing available recipes if the component isn't found.`,
      inputSchema: {
        slug: z.string().min(1).describe("Style slug"),
        component: z
          .string()
          .min(1)
          .describe("Recipe id: button, card, input, ..."),
      },
      outputSchema: {
        slug: z.string(),
        component: z.string(),
        className: z.string(),
        code: z.string(),
        origin: z.enum(["live", "bundled"]),
        fallbackReason: z.string().optional(),
      },
      annotations: READ_ONLY,
    },
    async ({ slug, component }) => {
      const detailSource = await getStyleDetailLive(slug, remoteOptions);
      const detail = detailSource.data;
      if (!detail) return styleLookupFailure(slug, detailSource);
      const recipeSource = await getComponentRecipeLive(slug, component, remoteOptions);
      const recipe = recipeSource.data;
      if (!recipe) {
        if (recipeSource.failureKind === "unavailable") {
          return sourceUnavailable(`Recipe "${component}" for style "${slug}"`, recipeSource);
        }
        const available = detail.recipeIds.length
          ? detail.recipeIds.join(", ")
          : "none";
        const guidance = recipeSource.failureKind === "unsupported"
          ? " Use stylekit_get_implementation_brief for its source definitions."
          : "";
        return errorResult(
          `Cannot render "${component}" for "${slug}". Available recipes: ${available}.${recipeSource.fallbackReason ? ` ${recipeSource.fallbackReason}.` : ""}${guidance}`,
        );
      }
      const structured = {
        ...recipe,
        origin: recipeSource.origin,
        ...(recipeSource.fallbackReason ? { fallbackReason: recipeSource.fallbackReason } : {}),
      };
      const lines = [
        `# ${component} — \`${slug}\``,
        `Catalogue origin: ${recipeSource.origin}${recipeSource.fallbackReason ? `; fallback: ${recipeSource.fallbackReason}` : ""}.`,
        "",
        "**className**:",
        "```",
        recipe.className,
        "```",
        "",
        "**code**:",
        "```tsx",
        recipe.code,
        "```",
      ];
      return toolResult(lines.join("\n"), structured);
    },
  );

  // 5) shadcn install command
  server.registerTool(
    "stylekit_get_shadcn_install",
    {
      title: "Get StyleKit shadcn install command",
      description: `Get the one-line shadcn CLI command that installs a style's color theme (light + dark) into a shadcn project.

Args:
  - slug (string): style identifier.

Returns JSON: { slug, command, registryUrl, prerequisite, lookupOrigin, fallbackReason? }. The command is derived from the style slug; lookupOrigin reports how StyleKit confirmed that slug.

Examples:
  - "how do I install the synthwave theme?" -> slug: "synthwave"
  - The target project must have a tsconfig.json or the shadcn CLI errors out.`,
      inputSchema: {
        slug: z.string().min(1).describe("Style slug"),
      },
      outputSchema: {
        slug: z.string(),
        command: z.string(),
        registryUrl: z.string(),
        prerequisite: z.string(),
        lookupOrigin: z.enum(["live", "bundled"]),
        fallbackReason: z.string().optional(),
      },
      annotations: READ_ONLY,
    },
    async ({ slug }) => {
      const known = await knownSlugLive(slug, remoteOptions);
      if (!known.data) {
        return known.failureKind === "not-found"
          ? unknownSlug(slug)
          : sourceUnavailable(`Style "${slug}"`, known);
      }
      const structured = {
        slug,
        command: shadcnInstallCommand(slug),
        registryUrl: registryUrl(slug),
        prerequisite: "The target project must contain a tsconfig.json.",
        lookupOrigin: known.origin,
        ...(known.fallbackReason ? { fallbackReason: known.fallbackReason } : {}),
      };
      const text = [
        `Install the **${slug}** theme into your shadcn project:`,
        `Style existence lookup origin: ${known.origin}${known.fallbackReason ? `; fallback: ${known.fallbackReason}` : ""}.`,
        "",
        "```bash",
        structured.command,
        "```",
        "",
        "Injects light + dark cssVars into your globals.css (Tailwind v4 compatible).",
        "Prerequisite: the project must contain a tsconfig.json.",
      ].join("\n");
      return toolResult(text, structured);
    },
  );

  // 6) Lint generated code against the style
  server.registerTool(
    "stylekit_lint_code",
    {
      title: "Lint code against a StyleKit style",
      description: `Check whether code actually follows a style's rules. Use this AFTER generating or editing UI code to verify it matches the style, instead of assuming it does.

Reports forbidden classes with the reason they are banned and a concrete replacement. Understands JSX/HTML class attributes, cn()/clsx() calls, and template literals; variant prefixes (dark:, md:, hover:) are resolved before matching.

Args:
  - slug (string): style identifier, e.g. "glassmorphism".
  - code (string): the source to check. JSX/TSX, HTML, or a bare class string.
  - checkRequired (array of 'button'|'card'|'input', optional): also report required classes the code is missing. Only pass components the code is supposed to contain.

Returns JSON: { slug, ok, violations: [{ className, baseClassName, line, severity, source, rule, reason, fix }], missingRequired, checkedClasses, ruleSources, origin, contentSource, fallbackReason? }. Lint rules come from the same live implementation brief used for generation; its five-minute cache and any bundled fallback are reported separately from content provenance.

Examples:
  - "does this button match neo-brutalist?" -> slug: "neo-brutalist", code: "<button className=...>", checkRequired: ["button"]
  - strict (boolean, default false): fail missing required classes in a static component snippet. Required checks cover the whole input, not each element.
  - status is pass, fail, or inconclusive. Runtime class expressions cannot be fully verified. ok is true only for a conclusive static pass; visual quality still needs review.`,
      inputSchema: {
        slug: z.string().min(1).describe("Style slug, e.g. 'glassmorphism'"),
        code: z
          .string()
          .min(1)
          .max(100_000)
          .describe("Source code or class string to lint"),
        checkRequired: z
          .array(z.enum(["button", "card", "input"]))
          .optional()
          .describe("Components to also check for missing required classes"),
        strict: z.boolean().default(false).describe("Fail missing required classes in a static snippet"),
      },
      outputSchema: {
        slug: z.string(),
        ok: z.boolean(),
        status: z.enum(["pass", "fail", "inconclusive"]),
        coverage: z.object({ classAttributes: z.number(), dynamicAttributes: z.number(), requiredScope: z.literal("file") }),
        warnings: z.array(z.string()),
        violations: z.array(
          z.object({
            className: z.string(),
            baseClassName: z.string(),
            line: z.number(),
            severity: z.string(),
            source: z.string(),
            rule: z.string(),
            reason: z.string(),
            fix: z.string().optional(),
          }),
        ),
        missingRequired: z.array(
          z.object({
            component: z.string(),
            missing: z.array(z.string()),
            source: z.string(),
          }),
        ),
        checkedClasses: z.number(),
        ruleSources: z.array(z.string()),
        origin: z.enum(["live", "bundled"]),
        contentSource: z.enum(["bundled", "static", "community"]),
        fallbackReason: z.string().optional(),
      },
      annotations: READ_ONLY,
    },
    async ({ slug, code, checkRequired, strict }) => {
      const briefSource = await getImplementationBriefLive(slug, remoteOptions);
      const brief = briefSource.data;
      if (!brief) {
        if (briefSource.failureKind === "not-found") return unknownSlug(slug);
        if (briefSource.failureKind === "unsupported") {
          return errorResult(`Style "${slug}" exists, but no compatible implementation brief is available for linting.${briefSource.fallbackReason ? ` ${briefSource.fallbackReason}.` : ""}`);
        }
        return sourceUnavailable(`Lint rules for style "${slug}"`, briefSource);
      }
      const rules = rulesFromBrief(brief);
      if (!rules) {
        return errorResult(`The implementation brief for "${slug}" contains an invalid stylekit-lint-v1 rule contract.`);
      }

      const report = lintCodeWithRules(rules, code, {
        checkRequired: checkRequired as StyleLintComponent[] | undefined,
        strict,
        slug,
      });
      const structured = {
        ...report,
        origin: briefSource.origin,
        contentSource: brief.provenance.source,
        ...(briefSource.fallbackReason ? { fallbackReason: briefSource.fallbackReason } : {}),
      };

      const lines = [
        `# Lint report — \`${slug}\``,
        `Status: ${report.status}`,
        `Rules origin: ${briefSource.origin} · content provenance: ${brief.provenance.source}${briefSource.fallbackReason ? ` · fallback: ${briefSource.fallbackReason}` : ""}`,
        ...report.warnings,
      ];

      if (report.ok) {
        lines.push(
          "",
          `No violations across ${report.checkedClasses} classes checked.`,
        );
      } else {
        lines.push(
          "",
          `${report.violations.length} violation(s) across ${report.checkedClasses} classes checked.`,
          "",
        );
        for (const v of report.violations) {
          lines.push(`- **${v.className}** (line ${v.line}) — ${v.reason}`);
          if (v.fix) lines.push(`  Fix: ${v.fix}`);
        }
      }

      for (const missing of report.missingRequired) {
        lines.push(
          "",
          `**Missing required ${missing.component} classes**: ${missing.missing.join(", ")}`,
        );
      }

      return toolResult(lines.join("\n"), structured);
    },
  );

  server.registerTool("stylekit_get_implementation_brief", {
    title: "Get complete StyleKit implementation brief",
    description: "Fetch one complete implementation contract before generating UI: AI rules, philosophy, global CSS, component templates, recipe definitions, tokens, readiness guidance, merged lint rules, and content provenance. The live brief is preferred and cached for five minutes; when the live source is unavailable, a bundled snapshot is returned only when available and marked with origin and fallbackReason. provenance.source records the content publisher (bundled, static, or community) and is distinct from transport origin. Coverage guidance does not certify visual quality or accessibility.",
    inputSchema: { slug: z.string().min(1).max(100).describe("Style slug") },
    outputSchema: {
      schemaVersion: z.literal("stylekit-brief-v1"), slug: z.string(), name: z.string(), nameEn: z.string(),
      category: z.string(), styleType: z.string(), description: z.string(),
      tags: z.array(z.string()), keywords: z.array(z.string()), philosophy: z.string(), aiRules: z.string(),
      doList: z.array(z.string()), dontList: z.array(z.string()), colors: z.object(DETAIL_SHAPE.colors.shape),
      globalCss: z.string(), components: z.record(z.unknown()), variants: z.array(z.unknown()),
      tokens: STYLE_TOKENS_SHAPE.nullable(), recipes: z.record(z.unknown()), readiness: z.record(z.unknown()),
      lintRules: z.record(z.unknown()),
      provenance: z.object({ source: z.enum(["bundled", "static", "community"]), contentHash: z.string(), url: z.string() }),
      origin: z.enum(["live", "bundled"]),
      fallbackReason: z.string().optional(),
    },
    annotations: READ_ONLY,
  }, async ({ slug }) => {
    const result = await getImplementationBriefLive(slug, remoteOptions);
    if (!result.data) {
      if (result.failureKind === "not-found") return unknownSlug(slug);
      if (result.failureKind === "unsupported") {
        return errorResult(`Style "${slug}" exists, but this StyleKit source does not expose a compatible implementation brief.${result.fallbackReason ? ` ${result.fallbackReason}.` : ""}`);
      }
      return sourceUnavailable(`Implementation brief for style "${slug}"`, result);
    }
    const structured = {
      ...result.data,
      origin: result.origin,
      ...(result.fallbackReason ? { fallbackReason: result.fallbackReason } : {}),
    };
    return toolResult(JSON.stringify(structured), structured, true);
  });
}
