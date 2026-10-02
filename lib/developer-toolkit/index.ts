import { stylesMeta } from "@/lib/styles/meta";

export type DeveloperToolkitState =
  | "repository-preview"
  | "public-beta"
  | "supported"
  | "stable"
  | "deprecated";

export type DeveloperToolkitCapabilityId =
  | "registry"
  | "core"
  | "cli"
  | "mcp"
  | "agent-skill";

export interface DeveloperToolkitCapability {
  id: DeveloperToolkitCapabilityId;
  state: DeveloperToolkitState;
  publicVersion: string | null;
  repositoryVersion: string | null;
  command: string;
  docsUrl: string;
  verifiedAt: string;
  evidence: string;
  clientConfiguration?: {
    mcpServers: {
      stylekit: {
        command: string;
        args: readonly string[];
      };
    };
  };
}

export interface DeveloperToolkitManifest {
  schemaVersion: 1;
  catalogCount: number;
  capabilities: readonly DeveloperToolkitCapability[];
}

const MCP_NPX_ARGS = Object.freeze([
  "-y",
  "--prefer-online",
  "stylekit-mcp@latest",
]);

export const developerToolkitManifest = Object.freeze({
  schemaVersion: 1,
  // Read from the registry rather than written down. This field held 146 for
  // two styles' worth of releases: adding a style updates no string, and a
  // number that describes the catalogue should not be able to disagree with it.
  catalogCount: stylesMeta.length,
  capabilities: Object.freeze([
    {
      id: "registry",
      state: "public-beta",
      publicVersion: null,
      repositoryVersion: null,
      command:
        "npx shadcn add https://www.stylekit.top/r/glassmorphism.json",
      docsUrl:
        "https://github.com/AnxForever/stylekit/blob/main/docs/registry.md",
      verifiedAt: "2026-10-02",
      evidence: "Live glassmorphism registry JSON returns registry:theme with 2 CSS variables",
    },
    {
      id: "core",
      state: "public-beta",
      publicVersion: "1.0.0-beta.7",
      repositoryVersion: "1.0.0-beta.7",
      command: "npm install stylekit-core@beta",
      docsUrl:
        "https://github.com/AnxForever/stylekit/tree/main/packages/core#readme",
      verifiedAt: "2026-10-02",
      evidence: "The beta dist-tag selects the current prerelease for a new install; existing lockfiles still need an explicit dependency update",
    },
    {
      id: "cli",
      state: "public-beta",
      publicVersion: "0.3.1",
      repositoryVersion: "0.3.1",
      command:
        "npx -y --prefer-online stylekit-cli@latest add synthwave",
      docsUrl:
        "https://github.com/AnxForever/stylekit/tree/main/packages/cli#readme",
      verifiedAt: "2026-10-02",
      evidence: "The latest tag resolves at launch; an exact package version remains available for reproducible runs",
    },
    {
      id: "mcp",
      state: "public-beta",
      publicVersion: "0.4.1",
      repositoryVersion: "0.4.1",
      command: `npx ${MCP_NPX_ARGS.join(" ")}`,
      docsUrl:
        "https://github.com/AnxForever/stylekit/tree/main/packages/mcp#readme",
      verifiedAt: "2026-10-02",
      evidence: "The latest tag resolves whenever the MCP client starts the configured process; a running process must be restarted to load an update",
      clientConfiguration: Object.freeze({
        mcpServers: Object.freeze({
          stylekit: Object.freeze({
            command: "npx",
            args: MCP_NPX_ARGS,
          }),
        }),
      }),
    },
    {
      id: "agent-skill",
      state: "public-beta",
      publicVersion: "0.7.0",
      repositoryVersion: "0.7.0",
      command: "npx skills@latest add AnxForever/stylekit-skill",
      docsUrl: "https://github.com/AnxForever/stylekit-skill#readme",
      verifiedAt: "2026-10-02",
      evidence: "Release 0.7.0 tracks the repository default branch; the Skill verifies its release manifest when used",
    },
  ]),
} satisfies DeveloperToolkitManifest);

const CAPABILITIES_BY_ID = new Map(
  developerToolkitManifest.capabilities.map((capability) => [
    capability.id,
    capability,
  ]),
);

export function listDeveloperToolkitCapabilities(): readonly DeveloperToolkitCapability[] {
  return developerToolkitManifest.capabilities;
}

export function getDeveloperToolkitCapability(
  id: DeveloperToolkitCapabilityId,
): DeveloperToolkitCapability {
  const capability = CAPABILITIES_BY_ID.get(id);
  if (capability) return capability;

  throw new Error(`Unknown Developer Toolkit capability: ${String(id)}`);
}

export function getDeveloperToolkitSetupSnippet(
  id: DeveloperToolkitCapabilityId,
): { format: "bash" | "json"; content: string } {
  const capability = getDeveloperToolkitCapability(id);

  if (capability.clientConfiguration) {
    return {
      format: "json",
      content: JSON.stringify(capability.clientConfiguration, null, 2),
    };
  }

  return { format: "bash", content: capability.command };
}
