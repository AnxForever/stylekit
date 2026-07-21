import { readFile } from "node:fs/promises";
import path from "node:path";
import type { StyleExperiencePack } from "@/lib/experience-packs/schema";
import {
  assertExperiencePackVerified,
  getExperiencePackFilesRoot,
  getExperiencePackInstallFiles,
} from "./verify";

export const PACK_REGISTRY_ITEM_SCHEMA = "https://ui.shadcn.com/schema/registry-item.json";

export interface ExperiencePackRegistryFile {
  path: string;
  target: string;
  type: "registry:file";
  content: string;
}

export interface ExperiencePackRegistryItem {
  $schema: string;
  name: string;
  type: "registry:block";
  title: string;
  description: string;
  author: string;
  dependencies: string[];
  registryDependencies: string[];
  files: ExperiencePackRegistryFile[];
  docs: string;
  categories: string[];
  meta: {
    styleSlug: string;
    version: string;
    tier: StyleExperiencePack["tier"];
    status: StyleExperiencePack["status"];
    licenseId: string;
    evidence: Array<{
      id: string;
      assetRef: string;
      kind: StyleExperiencePack["evidence"][number]["kind"];
      device: StyleExperiencePack["evidence"][number]["device"];
      theme: StyleExperiencePack["evidence"][number]["theme"];
      state: string;
      caption: string;
    }>;
    claims: Array<{
      id: string;
      statement: string;
      evidenceRefs: string[];
      installableRefs: string[];
      motionRefs: string[];
      interactionRefs: string[];
    }>;
  };
}

async function readPublicTextFile(rootDir: string, publicPath: string): Promise<string> {
  return readFile(path.join(rootDir, "public", publicPath.replace(/^\//, "")), "utf8");
}

export async function toExperiencePackRegistryItem(
  rootDir: string,
  pack: StyleExperiencePack,
): Promise<ExperiencePackRegistryItem> {
  await assertExperiencePackVerified(rootDir, pack);

  const filesRoot = getExperiencePackFilesRoot(rootDir, pack.slug);
  const installableIds = new Set(
    [...pack.blocks, ...pack.templates].map((installable) => installable.id),
  );
  const dependencies = new Set<string>();
  const registryDependencies = new Set<string>();

  for (const installable of [...pack.blocks, ...pack.templates]) {
    installable.dependencies.forEach((dependency) => dependencies.add(dependency));
    installable.registryDependencies.forEach((dependency) => {
      if (!installableIds.has(dependency)) registryDependencies.add(dependency);
    });
  }

  const files: ExperiencePackRegistryFile[] = [];
  for (const relativeFile of getExperiencePackInstallFiles(pack)) {
    files.push({
      path: relativeFile,
      target: relativeFile,
      type: "registry:file",
      content: await readFile(path.join(filesRoot, relativeFile), "utf8"),
    });
  }

  for (const asset of pack.assets.filter((item) => item.distributable)) {
    const target = `public${asset.src}`;
    files.push({
      path: target,
      target,
      type: "registry:file",
      content: await readPublicTextFile(rootDir, asset.src),
    });
    if (asset.provenance.sourceSnapshot) {
      const snapshotTarget = `public${asset.provenance.sourceSnapshot}`;
      files.push({
        path: snapshotTarget,
        target: snapshotTarget,
        type: "registry:file",
        content: await readPublicTextFile(rootDir, asset.provenance.sourceSnapshot),
      });
    }
  }

  const machineContext = {
    schemaVersion: 1,
    pack: {
      slug: pack.slug,
      styleSlug: pack.styleSlug,
      version: pack.version,
      tier: pack.tier,
      status: pack.status,
      presentation: pack.presentation,
      compatibility: pack.compatibility,
      primaryDelivery: pack.primaryDelivery,
      delivery: [...pack.delivery].sort(),
      license: pack.license,
    },
    assets: pack.assets
      .map(
        ({
          id,
          kind,
          role,
          distributable,
          decorative,
          alt,
          width,
          height,
          contentHash,
          performance,
        }) => ({
          id,
          kind,
          role,
          distributable,
          decorative,
          alt,
          width,
          height,
          contentHash,
          performance,
        }),
      )
      .sort((left, right) => left.id.localeCompare(right.id)),
    evidence: [...pack.evidence].sort((left, right) => left.id.localeCompare(right.id)),
    claims: [...pack.claims]
      .map((claim) => ({
        ...claim,
        evidenceRefs: [...claim.evidenceRefs].sort(),
        installableRefs: [...claim.installableRefs].sort(),
        motionRefs: [...claim.motionRefs].sort(),
        interactionRefs: [...claim.interactionRefs].sort(),
      }))
      .sort((left, right) => left.id.localeCompare(right.id)),
    motion: [...pack.motion].sort((left, right) => left.id.localeCompare(right.id)),
    interactions: [...pack.interactions].sort((left, right) => left.id.localeCompare(right.id)),
    installables: [...pack.blocks, ...pack.templates]
      .map((installable) => ({
        id: installable.id,
        title: installable.title,
        kind: installable.kind,
        files: [...installable.files].sort(),
        dependencies: [...installable.dependencies].sort(),
        registryDependencies: [...installable.registryDependencies].sort(),
        assetRefs: [...installable.assetRefs].sort(),
        motionRefs: [...installable.motionRefs].sort(),
        interactionRefs: [...installable.interactionRefs].sort(),
      }))
      .sort((left, right) => left.id.localeCompare(right.id)),
  };
  files.push({
    path: "STYLEKIT_PACK.json",
    target: "STYLEKIT_PACK.json",
    type: "registry:file",
    content: `${JSON.stringify(machineContext, null, 2)}\n`,
  });

  files.sort((left, right) => left.target.localeCompare(right.target));
  const readme = files.find((file) => file.target === "README.md")?.content ?? "";

  return {
    $schema: PACK_REGISTRY_ITEM_SCHEMA,
    name: pack.slug,
    type: "registry:block",
    title: pack.presentation.title,
    description: pack.presentation.summary,
    author: "StyleKit <https://www.stylekit.top>",
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDependencies].sort(),
    files,
    docs: readme,
    categories: [...pack.presentation.categories].sort(),
    meta: {
      styleSlug: pack.styleSlug,
      version: pack.version,
      tier: pack.tier,
      status: pack.status,
      licenseId: pack.license.id,
      evidence: pack.evidence
        .map(({ id, assetRef, kind, device, theme, state, caption }) => ({
          id,
          assetRef,
          kind,
          device,
          theme,
          state,
          caption,
        }))
        .sort((left, right) => left.id.localeCompare(right.id)),
      claims: pack.claims
        .map(({ id, statement, evidenceRefs, installableRefs, motionRefs, interactionRefs }) => ({
          id,
          statement,
          evidenceRefs: [...evidenceRefs].sort(),
          installableRefs: [...installableRefs].sort(),
          motionRefs: [...motionRefs].sort(),
          interactionRefs: [...interactionRefs].sort(),
        }))
        .sort((left, right) => left.id.localeCompare(right.id)),
    },
  };
}

export async function toExperiencePackRegistryItemJSON(
  rootDir: string,
  pack: StyleExperiencePack,
): Promise<string> {
  return JSON.stringify(await toExperiencePackRegistryItem(rootDir, pack), null, 2);
}
