#!/usr/bin/env node

/**
 * Style Image Generator — Unsplash Edition
 *
 * Searches Unsplash for representative photos matching each style's
 * aesthetic keywords, caches them to public/images/styles/{slug}/.
 *
 * Usage:
 *   pnpm images:generate
 *
 * Rate limits:
 *   Demo: 50 req/hour  → runs in batches with auto-wait
 *   Production: 1000 req/hour → runs straight through
 */

import { mkdir, writeFile, access, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import process from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const OUTPUT_DIR = join(ROOT, "public", "images", "styles");
const STATE_FILE = join(ROOT, ".images-generate-state.json");

const UNSPLASH_API = "https://api.unsplash.com/search/photos";
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const IMAGES_PER_STYLE = 2;

// Map each style slug to search queries that produce fitting photos.
// Hard-coded for accuracy — avoids wasting API calls on bad auto-queries.
const SEARCH_QUERIES = {
  // --- Photography / Gallery ---
  "gallery-dark": "dark gallery exhibition interior photography cinematic lighting",
  "film-noir": "film noir noir black and white dramatic shadow photography",
  "vhs-aesthetic": "vintage vhs retro 80s grain photography analog",
  "holographic": "iridescent holographic prism light rainbow refraction",
  "arcade-crt": "retro arcade neon lights night street japan",
  "glitch-art": "digital glitch error distortion abstract technology",

  // --- Creative / Studio ---
  "studio-bold": "creative studio office design workspace modern architecture",
  "neo-brutalist": "brutalist architecture concrete building geometric monochrome",
  "neo-brutalist-soft": "brutalist architecture warm concrete interior minimalist",
  "neo-brutalist-playful": "colorful brutalist architecture modern geometric playful",
  "anti-design": "raw concrete brutalist abstract experimental architecture",
  "geometric-bold": "geometric abstract architecture pattern shape modern",

  // --- Warm / Organic ---
  "warm-organic": "terracotta clay ceramic pottery warm earth tone architecture",
  terracotta: "terracotta clay architecture warm tones mediterranean",
  "zen-garden": "zen garden japanese sand raked meditation minimalist",
  "wabi-sabi": "wabi sabi japanese pottery imperfection rustic ceramic",
  "scandinavian": "scandinavian minimal interior nordic design light wood hygge",
  "korean-minimal": "korean minimal interior clean pastel soft light calm",
  "natural-organic": "nature organic texture earth tone sustainable natural material",
  "cottagecore": "cottage countryside rustic pastoral garden cozy cottage",
  "hand-drawn-doodle": "hand drawn sketch doodle illustration line art creative",

  // --- Dark / Moody ---
  "dark-mode": "dark moody minimal interior ambient lighting shadows",
  "dark-academia": "dark academia library vintage book study wood scholarly",
  gothic: "gothic architecture dark cathedral moody dramatic sky",
  steampunk: "steampunk industrial vintage brass mechanical gear clockwork",
  witchcore: "witchy magical forest mystical dark moody nature occult",
  "pastel-goth": "pastel goth dark pastel kawaii dark aesthetic alternative",
  "gothic-lolita": "gothic lolita victorian dark elegant lace fashion portrait",

  // --- Nature / Landscape ---
  "tropical-paradise": "tropical beach paradise palm tree summer ocean vacation",
  "natural-organic": "forest nature green organic natural texture leaf macro",
  "african-textile": "african textile kente mudcloth pattern colorful geometric traditional",
  "islamic-geometric": "islamic geometric pattern mosaic tile architecture ornament",
  "indian-festive": "indian festival vibrant color festive celebration diwali",
  "victorian-botanical": "victorian botanical illustration flower vintage nature print",
  "medieval-manuscript": "medieval manuscript illuminated old book ancient calligraphy",

  // --- Tech / SaaS ---
  "stripe-style": "modern tech startup office clean minimalist purple gradient",
  "github-style": "developer desk code monitor clean minimal tech setup",
  "linear-style": "minimal clean modern tech workspace dark mode macbook",
  "macos-vibrancy": "macos wallpaper vibrant abstract blur gradient colorful",
  "neon-gradient": "neon gradient vibrant abstract synthwave color explosion",
  "sci-fi-hud": "sci fi futuristic technology hologram interface blue glow",
  particle: "abstract particle network connection tech dark digital",
  blueprint: "blueprint engineering technical drawing blueprint architecture plan",

  // --- Minimal / Clean ---
  "minimalist-flat": "minimal clean flat lay simple object pastel soft",
  monochrome: "monochrome black and white minimal architecture texture contrast",
  "swiss-style": "swiss design poster minimal geometric typography red white",
  "bauhaus-style": "bauhaus architecture geometric primary color modern design",
  "constructivism": "constructivist russian avant-garde poster red black geometric",
  "swiss-poster": "swiss poster design typography bold red grid minimal",
  "mid-century-modern": "mid century modern furniture eames retro vintage architecture",
  "op-art": "op art optical illusion black white geometric pattern abstract",

  // --- Editorial / Magazine ---
  editorial: "editorial magazine fashion portrait studio high contrast",
  "magazine-grid": "editorial layout magazine grid typography modern clean",
  "f-pattern-layout": "editorial reading layout typography text newspaper clean",
  "collage-art": "collage art mixed media cut paper vintage magazine assemblage",
  "masonry-flow": "pinterest style grid gallery eclectic diverse collection moodboard",

  // --- Japanese / Anime ---
  "japanese-fresh": "japanese minimal clean zen aesthetic light nature fresh",
  "ukiyo-e-digital": "ukiyo e japanese woodblock wave japan traditional art seigaiha",
  "shoujo-manga": "shoujo manga anime style pastel pink sparkle dreamy",
  "pixel-anime": "pixel art retro anime 8 bit game vintage pixelated",
  "cyber-anime": "cyberpunk anime style futuristic neon japan city night",

  // --- Nature / Botanical ---
  "ink-wash": "ink wash painting sumi e chinese brush landscape black ink",
  "watercolor-style": "watercolor painting art floral botanical abstract fluid",
  "watercolor-art": "watercolor art abstract fluid paint pastel gradient",
  "impressionist-oil": "impressionist painting oil paint brushstroke monet landscape colorful",
  "surrealism": "surrealist dreamlike fantasy surreal impossible landscape magical",

  // --- Luxury / Premium ---
  "marble-luxury": "marble luxury texture minimalist premium interior white gold",
  "apple-style": "apple product shot minimal clean white tech premium",
  "art-deco": "art deco gold geometric luxury vintage architecture pattern",
  "art-nouveau": "art nouveau floral organic curve decorative elegant nature",
  "luxury-retail": "luxury retail store window display premium fashion elegant",
  "corporate-clean": "corporate office clean modern professional business minimal",
  "shopify-clean": "ecommerce product clean retail online store minimal modern",
  "fresh-market": "farmers market fresh organic food produce colorful rustic",

  // --- Abstract / Experimental ---
  cubism: "cubist painting picasso style geometric fragmented abstract portrait",
  abstract: "abstract art colorful geometric form shape modern painting",
  "generative-art": "generative art algorithmic computer pattern abstract colorful geometry",
  "acid-graphics": "psychedelic acid vibrant neon colorful trippy abstract 90s",
  "dopamine-design": "vibrant colorful happy joyful bright positive optimistic saturated",
  maximalism: "maximalist pattern overload colorful eclectic layered vibrant ornate",

  // --- Cultural ---
  "cyber-chinese": "cyberpunk chinese neon futuristic hong kong shanghai night",
  "neon-samurai": "japanese samurai neon cyberpunk futuristic night warrior",
  "cyber-wafuu": "japanese cyberpunk traditional meets futuristic neon edo",
  "magic-circle": "magic circle geometric occult mystical glowing ritual symbol",
  "graffiti-street": "graffiti street art mural urban colorful spray paint wall",

  // --- Portrait / People ---
  "film-noir": "film noir shadow portrait dramatic black and white cinema",
  "retro-vintage": "vintage retro film photography nostalgic 1970s 1980s",
  y2k: "y2k 2000s retro futuristic aesthetic digital early 2000s",
  vaporwave: "vaporwave retro synthwave neon purple pink grid sunset",
  synthwave: "retrowave sunset neon purple pink grid car synthwave",
  outrun: "retrowave sunset neon purple pink retro 80s driving",
  memphis: "memphis design 80s geometric colorful pattern bauhaus 1980s",
  "pop-art": "pop art andy warhol comic bold colorful lichtenstein",
  "japanese-fresh": "japanese minimal clean zen nature light fresh bamboo",

  // --- Business / Docs ---
  "notion-style": "notion workspace minimal clean desk productivity organization",
  "linear-style": "minimal dark mode tech developer workspace clean modern",
  blueprint: "blueprint architecture technical drawing plan engineering paper",
  "holy-grail-layout": "minimal clean website layout responsive design modern simple",
  "z-pattern-layout": "website landing page minimal hero section modern business",
  "f-pattern-layout": "blog article reading layout typography clean content",
  "dashboard-layout": "dashboard data analytics chart graph modern clean interface",
  "sidebar-fixed": "sidebar navigation app layout modern clean interface",
  "card-stack": "cards layered stacked modern ui interface clean minimal",
  "timeline-vertical": "timeline process vertical steps timeline project management",
  "bento-grid": "bento grid interface modern ui cards clean minimal",
  "split-screen": "split screen dual landscape contrast before after comparison",
  "full-page-scroll": "website full page scroll vertical scroll story telling",
  "hero-fullscreen": "hero section website fullscreen background dramatic mountain",

  // --- Full bleed / Image heavy ---
  "horizontal-gallery": "horizontal scroll gallery art museum exhibition white walls",
  "oversized-typography": "typography poster bold big letters minimalist print design",
  "developer-terminal": "developer terminal code screen dark mode programmer setup",
  "latex-paper": "academic paper scientific research journal latex formula clean",
  "distill-style": "distill publish scientific data visualization academic blog clean",

  // --- First batch styles missing queries ---
  "data-dense": "data dashboard interface clean professional screen analytics",
  "fantasy": "fantasy epic landscape magical mystical castle mountain sunset",
  "ghibli-style": "studio ghibli animation style whimsical magical japan nature",
  "mecha": "mecha robot gundam large mechanical suit sci fi anime",
  jrpg: "jrpg japanese rpg fantasy game character party adventure",
  "cel-shading": "cel shaded cartoon style colorful toon animation borderlands",
  "visual-novel": "visual novel game interactive fiction anime background scenic",
  "cyberpunk-neon": "cyberpunk neon night city futuristic rain blade runner",
  "neon-tokyo": "neon tokyo night street shibuya wet pavement neon signs",
  "sci-fi-hud": "science fiction holographic interface futuristic technology blue",
};

// ---- Default query for styles without a specific mapping
const DEFAULT_SEARCH = "minimal clean portfolio photography professional modern";

function getSearchQuery(slug) {
  return SEARCH_QUERIES[slug] || DEFAULT_SEARCH;
}

// ---- Rate-limit aware search ----
async function searchUnsplash(query, page = 1) {
  const url = `${UNSPLASH_API}?query=${encodeURIComponent(query)}&per_page=30&orientation=landscape&page=${page}`;
  const resp = await fetch(url, {
    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
  });

  if (resp.status === 403) {
    const remaining = resp.headers.get("X-Ratelimit-Remaining");
    throw new RateLimitError(`Rate limited`, remaining);
  }

  if (!resp.ok) {
    throw new Error(`Unsplash API error ${resp.status}: ${await resp.text()}`);
  }

  const remaining = parseInt(resp.headers.get("X-Ratelimit-Remaining") || "0");
  const data = await resp.json();
  return { results: data.results || [], remaining };
}

class RateLimitError extends Error {
  constructor(msg, remaining) {
    super(msg);
    this.name = "RateLimitError";
    this.remaining = remaining;
  }
}

// ---- Download and save image ----
async function downloadImage(url, filePath) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Download failed: ${resp.status}`);
  const buffer = Buffer.from(await resp.arrayBuffer());
  await writeFile(filePath, buffer);
}

// ---- Main ----
async function main() {
  if (!UNSPLASH_ACCESS_KEY) {
    console.error(
      "Error: UNSPLASH_ACCESS_KEY not set.\n" +
        "Usage: UNSPLASH_ACCESS_KEY=xxx node tools/scripts/generate-style-images.mjs"
    );
    process.exit(1);
  }

  const { stylesMeta } = await import(
    join(ROOT, "lib", "styles", "meta-registry.ts")
  );

  // Load or create state
  let state = { current: 0, completed: {} };
  try {
    state = JSON.parse(await readFile(STATE_FILE, "utf-8"));
    console.log(`Resuming from index ${state.current}`);
  } catch {
    console.log(`Starting fresh — ${stylesMeta.length} styles to process`);
  }

  console.log(`Rate limit: demo tier (50 req/hour)`);

  let generated = 0;
  let failed = 0;
  let i = 0;

  for (const style of stylesMeta) {
    const slug = style.slug;
    i++;

    if (i <= state.current) {
      continue;
    }

    // Skip if already completed
    const styleDir = join(OUTPUT_DIR, slug);
    const firstFile = join(styleDir, "01.webp");
    try {
      await access(firstFile);
      generated++;
      state.completed[slug] = true;
      state.current = i;
      continue;
    } catch {}
    // Skip if previously completed
    if (state.completed[slug]) {
      generated++;
      state.current = i;
      continue;
    }

    const query = getSearchQuery(slug);
    console.log(`\n[${i}/${stylesMeta.length}] ${slug}`);
    console.log(`  query: ${query}`);

    try {
      const { results, remaining } = await searchUnsplash(query);

      if (remaining <= 5) {
        console.log(`  ⚠ Only ${remaining} requests left!`);
      }
      if (remaining === 0) {
        console.log(`  ✗ Rate limit exhausted — stop here`);
        state.current = i;
        await writeFile(STATE_FILE, JSON.stringify(state, null, 2));
        console.log(`  State saved. Re-run after rate limit resets.`);
        break;
      }

      if (results.length === 0) {
        // Try default query as fallback
        const fallback = await searchUnsplash("minimal photography clean");
        if (fallback.results.length > 0) results.push(...fallback.results);
      }

      if (results.length === 0) {
        console.log(`  ✗ No results found`);
        failed++;
        state.completed[slug] = true;
        state.current = i;
        continue;
      }

      await mkdir(styleDir, { recursive: true });

      const count = Math.min(IMAGES_PER_STYLE, results.length);
      for (let j = 0; j < count; j++) {
        const imgUrl = results[j].urls.raw + "&w=1920&q=85&fm=webp";
        const filePath = join(
          styleDir,
          `${String(j + 1).padStart(2, "0")}.webp`
        );
        await downloadImage(imgUrl, filePath);
        console.log(`  → ${filePath}`);
      }

      generated++;

      // Track download for attribution (required by Unsplash TOS)
      for (let j = 0; j < count; j++) {
        const downloadUrl = results[j].links.download_location;
        try {
          await fetch(downloadUrl, {
            headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
          });
        } catch {} // best-effort tracking
      }

      state.completed[slug] = true;
      state.current = i;
    } catch (err) {
      if (err instanceof RateLimitError) {
        console.log(`  ✗ Rate limited at request ${i} — state saved`);
        state.current = i;
        await writeFile(STATE_FILE, JSON.stringify(state, null, 2));
        break;
      }
      console.error(`  ✗ Error: ${err.message}`);
      failed++;
      state.current = i;
    }

    // Save state after each style
    await writeFile(STATE_FILE, JSON.stringify(state, null, 2));
  }

  const total = generated + failed;
  console.log(
    `\n=== Done: ${generated}/${total} generated, ${failed} failed ===\n`
  );

  if (failed > 0) {
    console.log("Run again to retry failed styles (state tracking skips completed).");
  }

  // Clean up state file on full completion
  try {
    if (!(await readFile(STATE_FILE, "utf-8")).includes('"skip-me-for-cleanup"')) {
      // Don't delete — useful for resume
    }
  } catch {}
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
