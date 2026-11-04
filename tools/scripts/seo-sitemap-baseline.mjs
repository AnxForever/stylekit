#!/usr/bin/env node
/**
 * Indexed-URL baseline for the DESIGN.md pivot.
 *
 * Every route we touch during the pivot has to keep returning 200. This script
 * snapshots what the sitemap advertises so a later run can prove nothing
 * disappeared. Diffing two snapshots is the only cheap guard: a URL that leaves
 * the sitemap leaves the index within a crawl cycle or two.
 *
 * Usage:
 *   node tools/scripts/seo-sitemap-baseline.mjs
 *   node tools/scripts/seo-sitemap-baseline.mjs --origin https://www.stylekit.top --json .tmp/seo-baseline.json
 *   node tools/scripts/seo-sitemap-baseline.mjs --compare .tmp/seo-baseline.json
 *
 * Read-only. No credentials.
 */

import { readFileSync, writeFileSync } from "node:fs";

const DYNAMIC_PATTERNS = [
  [/^\/(?:zh|en)\/styles\/[^/]+$/, "/styles/[slug]"],
  [/^\/(?:zh|en)\/styles\/[^/]+\/showcase$/, "/styles/[slug]/showcase"],
  [/^\/(?:zh|en)\/collections\/[^/]+$/, "/collections/[slug]"],
  [/^\/(?:zh|en)\/animations\/[^/]+$/, "/animations/[slug]"],
  [/^\/(?:zh|en)\/community\/[^/]+$/, "/community/[slug]"],
  [/^\/(?:zh|en)\/recipes\/[^/]+$/, "/recipes/[id]"],
  [/^\/(?:zh|en)\/prompts\/[^/]+$/, "/prompts/[topic]"],
  [/^\/(?:zh|en)?\/?colors\/[^/]+$/, "/colors/[hex]"],
  [/^\/(?:zh|en)\/guides\/[^/]+$/, "/guides/[slug]"],
  [/^\/(?:zh|en)\/blog\/[^/]+$/, "/blog/[slug]"],
  [/^\/(?:zh|en)\/templates\/.+$/, "/templates/*"],
];

function parseArgs(argv) {
  const args = { origin: "https://www.stylekit.top", json: null, compare: null };
  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    if (flag === "--origin") args.origin = argv[++i];
    else if (flag === "--json") args.json = argv[++i];
    else if (flag === "--compare") args.compare = argv[++i];
  }
  return args;
}

function groupPath(pathname) {
  for (const [pattern, label] of DYNAMIC_PATTERNS) {
    if (pattern.test(pathname)) return label;
  }
  return pathname.replace(/^\/(?:zh|en)(?=\/|$)/, "") || "/";
}

async function fetchSitemap(origin) {
  const res = await fetch(`${origin.replace(/\/$/, "")}/sitemap.xml`, {
    headers: { "user-agent": "stylekit-seo-baseline/1.0" },
  });
  if (!res.ok) throw new Error(`sitemap ${res.status} from ${origin}`);
  return await res.text();
}

function extractLocs(xml) {
  const locs = [];
  const pattern = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = pattern.exec(xml)) !== null) locs.push(match[1].trim());
  return locs;
}

function summarize(urls) {
  const groups = new Map();
  const paths = [];
  for (const url of urls) {
    const pathname = new URL(url).pathname;
    paths.push(pathname);
    const key = groupPath(pathname);
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  return {
    total: urls.length,
    groups: [...groups.entries()].sort((a, b) => b[1] - a[1]),
    paths: paths.sort(),
  };
}

function printSummary(summary, origin) {
  console.log(`origin: ${origin}`);
  console.log(`total sitemap URLs: ${summary.total}`);
  console.log("");
  for (const [group, count] of summary.groups) {
    console.log(`${String(count).padStart(6)}  ${group}`);
  }
}

function compare(baseline, current) {
  const before = new Set(baseline.paths);
  const after = new Set(current.paths);
  const removed = [...before].filter((path) => !after.has(path));
  const added = [...after].filter((path) => !before.has(path));

  console.log("");
  console.log(`removed: ${removed.length}, added: ${added.length}`);
  for (const path of removed.slice(0, 40)) console.log(`  - ${path}`);
  if (removed.length > 40) console.log(`  ... ${removed.length - 40} more removed`);
  for (const path of added.slice(0, 20)) console.log(`  + ${path}`);
  if (removed.length > 0) {
    console.log("");
    console.log("A removed URL is an SEO regression unless it was 301'd in the same release.");
    process.exitCode = 1;
  }
}

const args = parseArgs(process.argv.slice(2));
const xml = await fetchSitemap(args.origin);
const summary = summarize(extractLocs(xml));
printSummary(summary, args.origin);

if (args.json) {
  writeFileSync(args.json, JSON.stringify({ origin: args.origin, ...summary }, null, 2), "utf8");
  console.log(`\nwrote ${args.json}`);
}

if (args.compare) {
  compare(JSON.parse(readFileSync(args.compare, "utf8")), summary);
}
