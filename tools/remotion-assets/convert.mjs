import sharp from "sharp";
import { readdirSync } from "node:fs";

const out = "tools/remotion-assets/out";

// luxe-lookbook poster
await sharp(`${out}/silk-poster.png`).avif({ quality: 55 }).toFile("public/video/luxe-lookbook/poster.avif");
await sharp(`${out}/silk-poster.png`).webp({ quality: 80 }).toFile("public/video/luxe-lookbook/poster.webp");

// lookbook plates
for (const n of ["01", "02", "03", "04"]) {
  await sharp(`${out}/look-${n}.png`).avif({ quality: 55 }).toFile(`public/images/styles/luxe-lookbook/look-${n}.avif`);
  await sharp(`${out}/look-${n}.png`).webp({ quality: 80 }).toFile(`public/images/styles/luxe-lookbook/look-${n}.webp`);
}

// launch-keynote frames
const frames = readdirSync(`${out}/frames`).filter((f) => f.endsWith(".png")).sort();
let i = 0;
for (const f of frames) {
  const idx = String(i).padStart(4, "0");
  await sharp(`${out}/frames/${f}`).webp({ quality: 76 }).toFile(`public/images/styles/launch-keynote/frames/frame-${idx}.webp`);
  i++;
}
await sharp(`${out}/frames/element-00.png`).webp({ quality: 80 }).toFile("public/images/styles/launch-keynote/poster.webp");
console.log("converted", i, "frames");
