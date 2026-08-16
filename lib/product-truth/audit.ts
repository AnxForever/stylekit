import { access, readFile } from "node:fs/promises";
import path from "node:path";
import {
  developerToolkitManifest,
  type DeveloperToolkitManifest,
} from "@/lib/developer-toolkit";

export interface ProductTruthIssue {
  code:
    | "missing-api-route"
    | "missing-redirect-target"
    | "unpublished-package-command"
    | "misleading-template-download"
    | "retired-capability-claim"
    | "toolkit-repository-version-mismatch"
    | "toolkit-public-state-contradiction";
  source: string;
  message: string;
}

export interface ProductTruthReport {
  issues: ProductTruthIssue[];
}

const PUBLIC_PACKAGE_CLAIM_FILES = [
  "SKILL.md",
  "app/developers/page.tsx",
  "components/developers/developers-content.tsx",
  "components/style-preview/style-use-panel.tsx",
  "lib/styles/collections.ts",
  "public/llms.txt",
] as const;

export async function auditProductTruth(rootDir: string): Promise<ProductTruthReport> {
  const issues = [
    ...(await auditReadmeApiClaims(rootDir)),
    ...(await auditRedirectTargets(rootDir)),
    ...(await auditDeveloperToolkitTruth(rootDir)),
    ...(await auditUnpublishedPackageCommands(rootDir)),
    ...(await auditTemplateDownloadClaim(rootDir)),
    ...(await auditForbiddenPublicClaims(rootDir)),
  ];

  return {
    issues: issues.sort((left, right) =>
      `${left.source}:${left.code}:${left.message}`.localeCompare(
        `${right.source}:${right.code}:${right.message}`,
      ),
    ),
  };
}

const TOOLKIT_PACKAGE_FILES = {
  core: "packages/core/package.json",
  cli: "packages/cli/package.json",
  mcp: "packages/mcp/package.json",
} as const;

export async function auditDeveloperToolkitTruth(
  rootDir: string,
  manifest: DeveloperToolkitManifest = developerToolkitManifest,
): Promise<ProductTruthIssue[]> {
  const issues: ProductTruthIssue[] = [];

  for (const [capabilityId, source] of Object.entries(TOOLKIT_PACKAGE_FILES)) {
    const capability = manifest.capabilities.find(
      ({ id }) => id === capabilityId,
    );
    if (!capability?.repositoryVersion) continue;

    const packageJson = JSON.parse(
      await readFile(path.join(rootDir, source), "utf8"),
    ) as { version?: unknown };

    if (packageJson.version !== capability.repositoryVersion) {
      issues.push({
        code: "toolkit-repository-version-mismatch",
        source,
        message:
          `${capabilityId} manifest repository version `
          + `${capability.repositoryVersion} does not match package version `
          + `${String(packageJson.version)}`,
      });
    }
  }

  const publicClaimFiles = [
    "SKILL.md",
    "app/developers/page.tsx",
    "components/developers/developers-content.tsx",
    "components/style-preview/style-use-panel.tsx",
    "packages/cli/README.md",
    "packages/mcp/README.md",
    "public/llms.txt",
  ] as const;
  const publicStateContradiction =
    /(?:not\s+(?:yet\s+)?published|unpublished|repository[- ]only|尚未发布)/i;
  const publicPackageClaims = [
    { id: "cli", pattern: /(?:\bCLI\b|stylekit-cli)/i },
    { id: "mcp", pattern: /(?:\bMCP\b|stylekit-mcp)/i },
  ] as const;

  for (const source of publicClaimFiles) {
    const content = await readFileIfExists(path.join(rootDir, source));
    if (!content || !publicStateContradiction.test(content)) continue;

    const contradictoryChannels = publicPackageClaims.filter(({ pattern }) =>
      pattern.test(content),
    );
    for (const channel of contradictoryChannels) {
      const capability = manifest.capabilities.find(
        ({ id }) => id === channel.id,
      );
      if (capability?.publicVersion === null || !capability?.publicVersion) {
        continue;
      }

      issues.push({
        code: "toolkit-public-state-contradiction",
        source,
        message:
          `${channel.id} is marked ${capability.state} at public version `
          + `${capability.publicVersion}, but this file uses unpublished wording`,
      });
    }
  }

  return issues;
}

async function auditReadmeApiClaims(rootDir: string): Promise<ProductTruthIssue[]> {
  const source = "README.md";
  const content = await readFile(path.join(rootDir, source), "utf8");
  const claims = [...content.matchAll(/^(GET|POST|PUT|PATCH|DELETE)\s+(\/api\/[^\s#]+)/gm)];
  const issues: ProductTruthIssue[] = [];

  for (const claim of claims) {
    const publicPath = claim[2];
    const routePath = publicPath
      .replace(/\{([^}]+)\}/g, "[$1]")
      .replace(/\?.*$/, "");
    const relativePath = `app${routePath}/route.ts`;

    if (!(await fileExists(path.join(rootDir, relativePath)))) {
      issues.push({
        code: "missing-api-route",
        source,
        message: `${claim[1]} ${publicPath} has no ${relativePath}`,
      });
    }
  }

  return issues;
}

async function auditRedirectTargets(rootDir: string): Promise<ProductTruthIssue[]> {
  const source = "next.config.ts";
  const content = await readFile(path.join(rootDir, source), "utf8");
  const redirects = [
    ...content.matchAll(
      /\{\s*source:\s*"([^"]+)",\s*destination:\s*"([^"]+)",\s*permanent:\s*(?:true|false)\s*\}/g,
    ),
  ];
  const issues: ProductTruthIssue[] = [];

  for (const redirect of redirects) {
    const destination = redirect[2];
    if (/^https?:\/\//.test(destination)) continue;

    const candidates = pageCandidates(destination);
    const exists = (
      await Promise.all(candidates.map((candidate) => fileExists(path.join(rootDir, candidate))))
    ).some(Boolean);

    if (!exists) {
      issues.push({
        code: "missing-redirect-target",
        source,
        message: `${redirect[1]} redirects to missing page ${destination}`,
      });
    }
  }

  return issues;
}

function pageCandidates(publicPath: string): string[] {
  const withoutQuery = publicPath.replace(/\?.*$/, "").replace(/\/$/, "") || "/";
  const appPath = withoutQuery.replace(/:([A-Za-z][A-Za-z0-9_]*)/g, "[$1]");
  const suffix = appPath === "/" ? "" : appPath;

  return [
    `app${suffix}/page.tsx`,
    `app/[locale]${suffix}/page.tsx`,
  ];
}

async function auditUnpublishedPackageCommands(rootDir: string): Promise<ProductTruthIssue[]> {
  const packages = [
    {
      name: "stylekit-cli",
      readme: "packages/cli/README.md",
      commandPattern: /npx\s+(?:-y\s+)?stylekit-cli\b/,
    },
    {
      name: "stylekit-mcp",
      readme: "packages/mcp/README.md",
      commandPattern: /npx\s+(?:-y\s+)?stylekit-mcp\b/,
    },
  ] as const;
  const issues: ProductTruthIssue[] = [];

  for (const packageInfo of packages) {
    const packageReadme = await readFile(path.join(rootDir, packageInfo.readme), "utf8");
    if (!/not yet published to npm/i.test(packageReadme)) continue;

    for (const source of PUBLIC_PACKAGE_CLAIM_FILES) {
      const content = await readFile(path.join(rootDir, source), "utf8");
      if (packageInfo.commandPattern.test(content)) {
        issues.push({
          code: "unpublished-package-command",
          source,
          message: `${packageInfo.name} is advertised with npx but is not published to npm`,
        });
      }
    }
  }

  return issues;
}

async function auditTemplateDownloadClaim(rootDir: string): Promise<ProductTruthIssue[]> {
  // The download button links to the zip route. The label may promise a full
  // project only while that route still bundles the scaffold plus every
  // template file; if it regresses to a single-file export, the label must
  // disclose that again.
  const downloadRoute = "app/api/templates/[slug]/download/route.ts";
  const downloadRoutePath = path.join(rootDir, downloadRoute);
  if (await fileExists(downloadRoutePath)) {
    const downloadContent = await readFile(downloadRoutePath, "utf8");
    if (
      downloadContent.includes("JSZip") &&
      downloadContent.includes("buildScaffoldFiles")
    ) {
      return [];
    }
  }

  const translationFiles = [
    "lib/i18n/translations-en.ts",
    "lib/i18n/translations-zh.ts",
  ] as const;
  const issues: ProductTruthIssue[] = [];

  for (const source of translationFiles) {
    const content = await readFile(path.join(rootDir, source), "utf8");
    const label = content.match(/"templates\.download":\s*"([^"]+)"/)?.[1] ?? "";
    if (!/page\.tsx|source|源码/i.test(label)) {
      issues.push({
        code: "misleading-template-download",
        source,
        message: `Template download label "${label}" does not disclose that only page.tsx source is exported`,
      });
    }
  }

  return issues;
}

async function auditForbiddenPublicClaims(rootDir: string): Promise<ProductTruthIssue[]> {
  const claims = [
    {
      source: "README.md",
      pattern: /\bPrompt builder\b/i,
      message: "README advertises the retired Prompt builder as an active product",
    },
    {
      source: "README.md",
      pattern: /\bStyle linter\b/i,
      message: "README advertises the retired Style linter as an active product",
    },
    {
      source: "README.md",
      pattern: /everything needed[^\n]*production-ready code/i,
      message: "README overstates current content as a production-complete delivery",
    },
  ] as const;
  const issues: ProductTruthIssue[] = [];

  for (const claim of claims) {
    const content = await readFile(path.join(rootDir, claim.source), "utf8");
    if (claim.pattern.test(content)) {
      issues.push({
        code: "retired-capability-claim",
        source: claim.source,
        message: claim.message,
      });
    }
  }

  return issues;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readFileIfExists(filePath: string): Promise<string | null> {
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return null;
  }
}
