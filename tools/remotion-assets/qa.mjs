import { chromium } from "@playwright/test";

const base = "http://localhost:3199";
const outDir = "tools/remotion-assets/out/qa";
const b = await chromium.launch();

// --- luxe-lookbook: video hero must actually play ---
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(`${base}/styles/luxe-lookbook/showcase`, { waitUntil: "networkidle" });
  await p.waitForTimeout(3500);
  const vid = await p.evaluate(() => {
    const v = document.querySelector("video");
    if (!v) return { found: false };
    return {
      found: true,
      current: v.currentTime,
      paused: v.paused,
      ready: v.readyState,
      src: v.currentSrc,
      poster: v.poster,
    };
  });
  console.log("LUXE VIDEO:", JSON.stringify(vid));
  await p.screenshot({ path: `${outDir}/luxe-hero.png` });
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.35));
  await p.waitForTimeout(800);
  const looks = await p.evaluate(() => {
    const imgs = [...document.querySelectorAll("picture img")];
    return imgs.map((i) => ({ src: i.currentSrc.split("/").pop(), ok: i.complete && i.naturalWidth > 0 }));
  });
  console.log("LUXE LOOKS:", JSON.stringify(looks));
  await p.screenshot({ path: `${outDir}/luxe-lookbook-grid.png` });
  await p.close();
}

// --- launch-keynote: scrub must actually change canvas as we scroll ---
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(`${base}/styles/launch-keynote/showcase`, { waitUntil: "networkidle" });
  await p.waitForTimeout(1000);
  const canvasInfo = await p.evaluate(() => {
    const c = document.querySelector("canvas");
    return c ? { w: c.width, h: c.height } : null;
  });
  console.log("KEYNOTE CANVAS:", JSON.stringify(canvasInfo));
  // scroll to scrub section and sample canvas at two scroll depths
  const sample = async (frac) => {
    await p.evaluate((f) => {
      const c = document.querySelector("canvas");
      const section = c ? c.closest("section") || c.parentElement.parentElement : null;
      if (section) {
        const rect = section.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        window.scrollTo(0, top + (section.offsetHeight - window.innerHeight) * f);
      }
    }, frac);
    await p.waitForTimeout(1200);
    return p.evaluate(() => {
      const c = document.querySelector("canvas");
      if (!c) return null;
      try {
        return c.toDataURL("image/png").length;
      } catch {
        return -1;
      }
    });
  };
  const s1 = await sample(0.1);
  await p.screenshot({ path: `${outDir}/keynote-scrub-early.png` });
  const s2 = await sample(0.9);
  await p.screenshot({ path: `${outDir}/keynote-scrub-late.png` });
  console.log("KEYNOTE SCRUB canvas data sizes:", s1, s2, "CHANGED:", s1 !== s2 && s1 > 0 && s2 > 0);
  await p.close();
}

await b.close();
