/**
 * Recompress large static images in place (same format, same filename).
 *
 * - JPG/JPEG: mozjpeg at quality 80 (photos) / 92 (QR codes, for scan safety)
 * - PNG:      palette + max compression (lossless for palette art / QR codes)
 *
 * Files below the size threshold are skipped, and an image is only overwritten
 * when the recompressed buffer is actually smaller than the original.
 *
 * Run: pnpm images:optimize
 */
import sharp from "sharp";
import { statSync, readdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { join, extname } from "node:path";

const ROOT = "public";
const MIN_BYTES = 100 * 1024; // only touch images > 100KB

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let totalBefore = 0;
let totalAfter = 0;
let optimized = 0;
let skipped = 0;

for (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") continue;

  const before = statSync(file).size;
  if (before < MIN_BYTES) continue;

  const isQR = /qr/i.test(file);
  try {
    const buf =
      ext === ".png"
        ? await sharp(file)
            .png({ compressionLevel: 9, palette: true })
            .toBuffer()
        : await sharp(file)
            .jpeg({ quality: isQR ? 92 : 80, mozjpeg: true })
            .toBuffer();

    if (buf.length < before) {
      await writeFile(file, buf);
      totalBefore += before;
      totalAfter += buf.length;
      optimized += 1;
      const saved = (((before - buf.length) / before) * 100).toFixed(0);
      console.log(
        `${file}: ${(before / 1024).toFixed(0)}K -> ${(buf.length / 1024).toFixed(0)}K (-${saved}%)`,
      );
    } else {
      skipped += 1;
    }
  } catch (err) {
    console.warn(`skip ${file}: ${err.message}`);
  }
}

console.log(
  `\n${optimized} optimized, ${skipped} already optimal. ` +
    `${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB ` +
    `(saved ${((totalBefore - totalAfter) / 1024).toFixed(0)}KB)`,
);
