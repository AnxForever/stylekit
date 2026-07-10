import { access, readFile } from "node:fs/promises";
import path from "node:path";

export interface ProductTruthIssue {
  code: "missing-api-route" | "missing-redirect-target" | "unpublished-package-command";
  source: string;
  message: string;
}

export interface ProductTruthReport {
  issues: ProductTruthIssue[];
}

const PUBLIC_PACKAGE_CLAIM_FILES = [
  "app/developers/page.tsx",
  "components/developers/developers-content.tsx",
  "components/style-preview/style-use-panel.tsx",
  "lib/styles/collections.ts",
] as const;

export async function auditProductTruth(rootDir: string): Promise<ProductTruthReport> {
  const issues = [
    ...(await auditReadmeApiClaims(rootDir)),
    ...(await auditRedirectTargets(rootDir)),
    ...(await auditUnpublishedPackageCommands(rootDir)),
  ];

  return {
    issues: issues.sort((left, right) =>
      `${left.source}:${left.code}:${left.message}`.localeCompare(
        `${right.source}:${right.code}:${right.message}`,
      ),
    ),
  };
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

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}
