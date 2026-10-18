/**
 * WAV writer + build entry for the score.
 * Usage: node video/audio/build.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { renderScore } from "./score.mjs";
import { SR } from "./dsp.mjs";

const writeWav = (path, buses) => {
  const [L, R] = buses;
  const channels = 2;
  const frames = L.length;
  const dataSize = frames * channels * 2;
  const buf = Buffer.alloc(44 + dataSize);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + dataSize, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(channels, 22);
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * channels * 2, 28);
  buf.writeUInt16LE(channels * 2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(dataSize, 40);
  const clamp16 = (v) => Math.max(-32768, Math.min(32767, Math.round(v * 32767)));
  let o = 44;
  for (let i = 0; i < frames; i++) {
    buf.writeInt16LE(clamp16(L[i]), o);
    buf.writeInt16LE(clamp16(R[i]), o + 2);
    o += 4;
  }
  writeFileSync(path, buf);
  return buf.length;
};

const t0 = Date.now();
const master = renderScore();
mkdirSync("public/audio", { recursive: true });
const bytes = writeWav("public/audio/score.wav", master.buf);
console.log(
  `score.wav written: ${(bytes / 1024 / 1024).toFixed(1)} MB, ` +
    `${(master.buf[0].length / SR).toFixed(2)}s, built in ${((Date.now() - t0) / 1000).toFixed(1)}s`,
);
