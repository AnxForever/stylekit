import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { supportMethods, thankYouEntries } from "../../lib/site/support";

const projectRoot = resolve(process.cwd());
const requireRuntimeAssets = process.argv.includes("--require-runtime");
const runtimeAssetPrefixes = [
  "/support/receipts/",
  "/support/thank-you/",
] as const;

type AssetReference = {
  source: string;
  src: string;
};

const assetReferences: AssetReference[] = [
  ...supportMethods.flatMap((method) =>
    method.imageSrc
      ? [{ source: `support method ${method.id}`, src: method.imageSrc }]
      : [],
  ),
  ...thankYouEntries.flatMap((entry) => [
    ...(entry.receiptImage
      ? [{ source: `thank-you receipt ${entry.id}`, src: entry.receiptImage }]
      : []),
    ...(entry.celebrationImage
      ? [{ source: `thank-you celebration ${entry.id}`, src: entry.celebrationImage }]
      : []),
  ]),
];

const uniqueReferences = new Map<string, AssetReference>();
for (const reference of assetReferences) {
  uniqueReferences.set(reference.src, reference);
}

let hasFailure = false;

for (const reference of uniqueReferences.values()) {
  const relativePath = `public${reference.src}`;
  const absolutePath = resolve(projectRoot, relativePath);
  const isRuntimeAsset = runtimeAssetPrefixes.some((prefix) =>
    reference.src.startsWith(prefix),
  );
  const exists = existsSync(absolutePath);

  if (isRuntimeAsset) {
    if (!exists && requireRuntimeAssets) {
      console.error(`FAIL ${reference.src}: missing runtime asset (${reference.source})`);
      hasFailure = true;
    } else {
      console.log(
        `${exists ? "PASS" : "SKIP"} ${reference.src}: runtime asset${
          exists ? " is present" : " is not required in this checkout"
        }`,
      );
    }
    continue;
  }

  const ignored =
    spawnSync("git", ["check-ignore", "-q", relativePath], {
      cwd: projectRoot,
    }).status === 0;

  if (!exists || ignored) {
    console.error(
      `FAIL ${reference.src}: exists=${exists} ignored=${ignored} (${reference.source})`,
    );
    hasFailure = true;
    continue;
  }

  console.log(`PASS ${reference.src}: deployable static asset`);
}

if (hasFailure) {
  process.exit(1);
}
