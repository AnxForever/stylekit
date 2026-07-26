import { chromium } from "@playwright/test";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 960, height: 540 } });
await p.goto("file:///home/anx4758/stylekit/tools/remotion-assets/out/vidcheck.html");
await p.waitForTimeout(2500);
const state = await p.evaluate(() => {
  const v = document.querySelector("video");
  return { current: v.currentTime, ready: v.readyState, w: v.videoWidth };
});
console.log(JSON.stringify(state));
await p.screenshot({ path: "/home/anx4758/stylekit/tools/remotion-assets/out/silk-check.png" });
await b.close();
