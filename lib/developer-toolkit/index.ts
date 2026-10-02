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
}

export interface DeveloperToolkitManifest {
  schemaVersion: 1;
  catalogCount: number;
  capabilities: readonly DeveloperToolkitCapability[];
}

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
      publicVersion: "1.0.0-beta.6",
      repositoryVersion: "1.0.0-beta.6",
      command: "npm install stylekit-core@1.0.0-beta.6",
      docsUrl:
        "https://github.com/AnxForever/stylekit/tree/main/packages/core#readme",
      verifiedAt: "2026-10-02",
      evidence: "Release target 1.0.0-beta.6; verify npm publication before updating the live site",
    },
    {
      id: "cli",
      state: "public-beta",
      publicVersion: "0.3.0",
      repositoryVersion: "0.3.0",
      command: "npx -y stylekit-cli@0.3.0 add synthwave",
      docsUrl:
        "https://github.com/AnxForever/stylekit/tree/main/packages/cli#readme",
      verifiedAt: "2026-10-02",
      evidence: "Release target 0.3.0; verify npm publication before updating the live site",
    },
    {
      id: "mcp",
      state: "public-beta",
      publicVersion: "0.4.0",
      repositoryVersion: "0.4.0",
      command: "npx -y stylekit-mcp@0.4.0",
      docsUrl:
        "https://github.com/AnxForever/stylekit/tree/main/packages/mcp#readme",
      verifiedAt: "2026-10-02",
      evidence: "Release target 0.4.0; verify npm and MCP Registry publication before updating the live site",
    },
    {
      id: "agent-skill",
      state: "public-beta",
      publicVersion: "main@a5e42c87",
      repositoryVersion: "main@a5e42c87",
      command: "npx skills add AnxForever/stylekit-skill",
      docsUrl: "https://github.com/AnxForever/stylekit-skill#readme",
      verifiedAt: "2026-10-02",
      evidence: "GitHub main is a5e42c87; the installer target is AnxForever/stylekit-skill",
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
