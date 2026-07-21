import { listExperiencePacks } from "@/lib/experience-packs";
import {
  toExperiencePackRegistryItemJSON,
  verifyExperiencePack,
} from "@/lib/experience-packs/server";

async function main(): Promise<void> {
  const packs = listExperiencePacks();
  let issueCount = 0;

  for (const pack of packs) {
    const report = await verifyExperiencePack(process.cwd(), pack);
    if (!report.ok) {
      issueCount += report.issues.length;
      console.error(`[check:experience-packs] ${pack.slug} failed:`);
      for (const issue of report.issues) {
        console.error(`- [${issue.code}] ${issue.source}: ${issue.message}`);
      }
      continue;
    }

    const first = await toExperiencePackRegistryItemJSON(process.cwd(), pack);
    const second = await toExperiencePackRegistryItemJSON(process.cwd(), pack);
    if (first !== second) {
      issueCount += 1;
      console.error(`[check:experience-packs] ${pack.slug} registry output is not deterministic.`);
      continue;
    }

    console.log(
      `[check:experience-packs] PASS ${pack.slug}@${pack.version} — ` +
      `${report.checkedFiles.length} files, ${report.checkedAssets.length} assets, ` +
      `${report.checkedEvidence.length} evidence scenes, ${report.checkedClaims.length} claims.`,
    );
  }

  if (issueCount > 0) {
    process.exitCode = 1;
    return;
  }

  console.log(`[check:experience-packs] PASS — ${packs.length} pack(s) verified.`);
}

void main();
