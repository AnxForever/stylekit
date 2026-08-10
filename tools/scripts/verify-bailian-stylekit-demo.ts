import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseDemoGenerationStyleIntent } from "@/lib/bailian";
import { buildWorkspaceZip, generateWorkspaceProject } from "@/lib/workspace";
import { getStylePack } from "@/lib/styles";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.resolve(scriptDir, "../../examples/bailian-stylekit/fixtures/style-intent.json");

async function main() {
  const rawIntent = JSON.parse(await readFile(fixturePath, "utf8"));
  const intent = parseDemoGenerationStyleIntent(rawIntent);
  const pack = getStylePack(intent.styleSlug);
  if (!pack) throw new Error(`Missing StylePack for ${intent.styleSlug}`);

  const generation = generateWorkspaceProject({
    name: "Account Risk Dashboard",
    description: intent.brief.primaryGoal,
    projectType: intent.projectType,
    stack: ["nextjs", "typescript", "tailwind"],
    selectedStyleSlug: intent.styleSlug,
    brief: intent.brief,
    target: "nextjs",
    generatedAt: "2026-01-01T00:00:00.000Z",
  });

  if (generation.quality.errors.length > 0) {
    throw new Error(generation.quality.errors.join(" "));
  }

  const zip = await buildWorkspaceZip({
    projectName: "account-risk-dashboard",
    generatedAt: "2026-01-01T00:00:00.000Z",
    generation,
  });

  console.log(JSON.stringify({
    ok: true,
    schemaVersion: intent.schemaVersion,
    stylePackVersion: pack.schemaVersion,
    styleSlug: intent.styleSlug,
    generatedFileCount: generation.files.length,
    zipFileCount: zip.fileCount,
    zipSha256: zip.sha256,
    quality: generation.quality,
  }, null, 2));
}

void main();
