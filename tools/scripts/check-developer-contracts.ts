import { isDeepStrictEqual } from "node:util";
import { styles } from "../../lib/styles";
import { getImplementationBrief as sourceBrief } from "../../lib/implementation-brief";
import { getImplementationBrief as bundledBrief } from "../../packages/core/dist/discovery/index.js";

let failed = false;
for (const style of styles) {
  const source = sourceBrief(style.slug);
  const bundled = bundledBrief(style.slug);
  if (!isDeepStrictEqual(JSON.parse(JSON.stringify(source)), JSON.parse(JSON.stringify(bundled)))) {
    console.error(`[contract-check] FAIL ${style.slug}: bundled implementation inputs differ from source`);
    failed = true;
  }
}
if (!failed) console.log(`[contract-check] PASS ${styles.length} complete briefs match source (including recipes, rules and provenance)`);
process.exitCode = failed ? 1 : 0;
