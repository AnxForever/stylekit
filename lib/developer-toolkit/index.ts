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
  catalogCount: 146,
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
      verifiedAt: "2026-08-16",
      evidence: "Clean Tailwind v4 consumer with shadcn@4.16.2",
    },
    {
      id: "core",
      state: "public-beta",
      publicVersion: "1.0.0-beta.1",
      repositoryVersion: "1.0.0-beta.3",
      command: "npm install stylekit-core@1.0.0-beta.1",
      docsUrl:
        "https://github.com/AnxForever/stylekit/tree/main/packages/core#readme",
      verifiedAt: "2026-08-16",
      evidence: "npm metadata and package tarball verified",
    },
    {
      id: "cli",
      state: "public-beta",
      publicVersion: "0.1.0",
      repositoryVersion: "0.1.2",
      command: "npx -y stylekit-cli@0.1.0 add synthwave",
      docsUrl:
        "https://github.com/AnxForever/stylekit/tree/main/packages/cli#readme",
      verifiedAt: "2026-08-16",
      evidence: "Public npx version and list commands verified",
    },
    {
      id: "mcp",
      state: "public-beta",
      publicVersion: "0.1.0",
      repositoryVersion: "0.2.0",
      command: "npx -y stylekit-mcp@0.1.0",
      docsUrl:
        "https://github.com/AnxForever/stylekit/tree/main/packages/mcp#readme",
      verifiedAt: "2026-08-16",
      evidence: "Public npm package answered tools/list and search over stdio",
    },
    {
      id: "agent-skill",
      state: "public-beta",
      publicVersion: "main@e07be4fb",
      repositoryVersion: "main@e07be4fb",
      command: "npx skills add AnxForever/stylekit",
      docsUrl:
        "https://github.com/AnxForever/stylekit/blob/main/docs/AGENT_SKILL_GUIDE.md",
      verifiedAt: "2026-08-16",
      evidence: "Installer discovered exactly one public stylekit skill",
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
