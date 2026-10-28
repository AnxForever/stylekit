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
  /** Hosted Streamable HTTP endpoint, when one is live. */
  remoteUrl?: string;
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
      // beta.8 carries repairStyleCode, which beta.7 does not.
      publicVersion: "1.0.0-beta.7",
      repositoryVersion: "1.0.0-beta.8",
      command: "npm install stylekit-core@beta",
      docsUrl:
        "https://github.com/AnxForever/stylekit/tree/main/packages/core#readme",
      verifiedAt: "2026-10-20",
      evidence: "npm's beta dist-tag reports 1.0.0-beta.7, which predates repairStyleCode; the repository is at 1.0.0-beta.8 and needs a core-v1.0.0-beta.8 tag to publish it. npm's latest dist-tag remains beta.3, so the setup command targets @beta. Existing lockfiles still need an explicit dependency update",
    },
    {
      id: "cli",
      state: "public-beta",
      // 0.3.2 carries the exit-code fix; npm only has 0.3.1.
      publicVersion: "0.3.1",
      repositoryVersion: "0.3.2",
      command:
        "npx -y --prefer-online stylekit-cli@latest add synthwave",
      docsUrl:
        "https://github.com/AnxForever/stylekit/tree/main/packages/cli#readme",
      verifiedAt: "2026-10-20",
      evidence: "npm's latest dist-tag reports 0.3.1; the repository is at 0.3.2 and needs a cli-v0.3.2 tag to publish the corrected lint exit codes. An exact package version remains available for reproducible runs",
    },
    {
      id: "mcp",
      state: "public-beta",
      // Repository is on the v2 SDK and speaks the 2026-07-28 stateless protocol.
      publicVersion: "0.5.0",
      repositoryVersion: "0.5.0",
      command: `npx ${MCP_NPX_ARGS.join(" ")}`,
      docsUrl:
        "https://github.com/AnxForever/stylekit/tree/main/packages/mcp#readme",
      verifiedAt: "2026-10-21",
      evidence: "npm 0.5.0 is published on the latest dist-tag with the v2 SDK, and the MCP Registry entry points at https://www.stylekit.top/mcp. The endpoint serves both the 2026-07-28 stateless protocol and 2025-era clients. Node 20 or newer is required",
      remoteUrl: "https://www.stylekit.top/mcp",
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
      publicVersion: "0.8.0",
      repositoryVersion: "0.8.0",
      command: "npx skills@latest add AnxForever/stylekit-skill",
      docsUrl: "https://github.com/AnxForever/stylekit-skill#readme",
      verifiedAt: "2026-10-07",
      evidence: "The GitHub main release manifest reports 0.8.0; SKILL.md documents the client-followed update check against main",
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
