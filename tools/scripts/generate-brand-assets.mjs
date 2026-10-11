import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Render the approved, outlined identity locally; no image or font downloads.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const publicDir = path.join(root, "public");
const output = path.join(publicDir, "brand/v3");
await mkdir(output, { recursive: true });

for (const file of [
  "favicon.ico", "favicon-16x16.png", "favicon-32x32.png", "icon.svg",
  "icon-192x192.png", "icon-512x512.png", "apple-touch-icon.png",
  "maskable-512x512.png",
]) {
  await copyFile(path.join(publicDir, file), path.join(output, file));
}
for (const file of ["stylekit-horizontal-ink.svg", "stylekit-horizontal-white.svg"]) {
  await copyFile(path.join(publicDir, "brand", file), path.join(output, file));
}

const manifest = JSON.parse(await readFile(path.join(publicDir, "manifest.json"), "utf8"));
manifest.id = "/";
manifest.scope = "/";
manifest.icons = manifest.icons.map((icon) => ({
  ...icon,
  src: `/brand/v3/${path.posix.basename(icon.src)}`,
}));
const manifestJson = JSON.stringify(manifest, null, 2) + "\n";
await writeFile(path.join(output, "manifest.webmanifest"), manifestJson);
// Keep installed shortcuts using the legacy manifest on the current identity.
await writeFile(path.join(publicDir, "manifest.json"), manifestJson);

const wordmark = (await readFile(path.join(output, "stylekit-horizontal-ink.svg"), "utf8"))
  .replace(/^.*?<svg[^>]*>/s, "")
  .replace(/<\/svg>\s*$/, "")
  .replace(/<title>.*?<\/title>/s, "");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <title>StyleKit — Visual styles for AI-built interfaces</title>
  <rect width="1200" height="630" fill="#FAFAFA"/>
  <g transform="translate(60 72) scale(1.12)">${wordmark}</g>
  <text x="100" y="397" font-family="Noto Sans,Arial,sans-serif" font-size="42" font-weight="400" fill="#262626">Visual styles for AI-built interfaces.</text>
  <path d="M100 476H1100" stroke="#D4D4D4"/>
  <text x="100" y="530" font-family="Noto Sans,Arial,sans-serif" font-size="23" fill="#595959">Design tokens · Components · AI prompts</text>
  <text x="1100" y="530" text-anchor="end" font-family="Noto Sans,Arial,sans-serif" font-size="23" fill="#262626">stylekit.top</text>
</svg>`;
await writeFile(path.join(output, "social-preview.svg"), svg + "\n");
const iconSvg = await readFile(path.join(output, "icon.svg"), "utf8");
const markSvg = iconSvg.replace(/<rect\b[^>]*\/>/, "").replaceAll('#FFFFFF', '#0A0A0A');
await writeFile(path.join(output, "mark.svg"), markSvg);
// Previously published logo URLs remain valid but no longer expose old concepts.
const legacySvgs = {
  "brand/stylekit-icon-v2-dark.svg": iconSvg,
  "brand/stylekit-icon-v2-light.svg": iconSvg.replace('#0A0A0A', '#FAFAFA').replaceAll('#FFFFFF', '#0A0A0A'),
  "brand/stylekit-mark-v2.svg": markSvg,
  "brand/stylekit-lockup-v2.svg": await readFile(path.join(output, "stylekit-horizontal-ink.svg"), "utf8"),
  "brand/stylekit-logo-presentation-v2.svg": svg,
  "og-image.svg": svg,
};
for (const [file, contents] of Object.entries(legacySvgs)) {
  await writeFile(path.join(publicDir, file), contents.trimEnd() + "\n");
}
const png = await sharp(Buffer.from(svg)).png().toBuffer();
await writeFile(path.join(output, "social-preview.png"), png);
// Old external image links should also show the new brand when re-fetched.
for (const file of ["social-preview-home-v1.png", "social-preview-home-v2.png"]) {
  await writeFile(path.join(publicDir, file), png);
}
console.log("Generated versioned StyleKit icons, manifest, and 1200×630 social preview.");
