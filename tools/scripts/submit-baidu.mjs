#!/usr/bin/env node
/**
 * Baidu "普通收录" URL push.
 *
 * Pushes URLs to Baidu's ordinary-inclusion API so newly published or updated
 * pages get crawled sooner. Baidu runs its own protocol (NOT IndexNow).
 *
 * IMPORTANT — quota discipline (Baidu penalises waste):
 *   Only push genuinely NEW or UPDATED URLs. Re-submitting already-indexed URLs
 *   wastes the daily quota and can make Baidu lower the quota or revoke API
 *   access. The sitemap carries the stable full catalog; this script carries the
 *   change feed. So: pass the changed URLs explicitly, or a file listing them.
 *   Do NOT wire this to blast the whole sitemap on every deploy.
 *
 * The response `remain` field is the real remaining daily quota — always logged.
 *
 * Auth: token comes from BAIDU_PUSH_TOKEN (never hard-code it — it rides in the
 * query string, so keep it out of source control and CI logs).
 *
 * Usage:
 *   BAIDU_PUSH_TOKEN=xxxx node tools/scripts/submit-baidu.mjs <url> [url...]
 *   BAIDU_PUSH_TOKEN=xxxx node tools/scripts/submit-baidu.mjs --file changed-urls.txt
 *   # dry run (print what would be sent, send nothing):
 *   BAIDU_PUSH_TOKEN=xxxx node tools/scripts/submit-baidu.mjs --dry-run <url>
 */

import { readFile } from "node:fs/promises";

const SITE = process.env.BAIDU_PUSH_SITE || "www.stylekit.top";
const TOKEN = process.env.BAIDU_PUSH_TOKEN;
const MAX_PER_CALL = 2000; // Baidu hard limit per request

function parseArgs(argv) {
  const args = { urls: [], file: null, dryRun: false };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--file") args.file = argv[++i];
    else if (a.startsWith("http")) args.urls.push(a);
    else {
      console.error(`[baidu] ignoring unrecognised argument: ${a}`);
    }
  }
  return args;
}

async function collectUrls(args) {
  const urls = [...args.urls];
  if (args.file) {
    const text = await readFile(args.file, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (trimmed.startsWith("http")) urls.push(trimmed);
    }
  }
  // de-dupe, preserve order
  return [...new Set(urls)];
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const urls = await collectUrls(args);

  if (urls.length === 0) {
    console.error(
      "[baidu] no URLs to push. Pass absolute URLs or --file <list>. " +
        "Push only NEW/UPDATED pages, never the whole sitemap.",
    );
    process.exit(1);
  }
  if (urls.length > MAX_PER_CALL) {
    console.error(
      `[baidu] ${urls.length} URLs exceeds the ${MAX_PER_CALL}/call limit. ` +
        "Split into multiple runs.",
    );
    process.exit(1);
  }

  // Every URL must be on the registered site and match its protocol.
  const offSite = urls.filter((u) => {
    try {
      return new URL(u).host !== SITE;
    } catch {
      return true;
    }
  });
  if (offSite.length > 0) {
    console.error(`[baidu] these URLs are not on ${SITE} and will be rejected:`);
    offSite.forEach((u) => console.error(`  ${u}`));
    process.exit(1);
  }

  const body = urls.join("\n");

  if (args.dryRun) {
    console.log(`[baidu] DRY RUN — would POST ${urls.length} URL(s) to site=${SITE}:`);
    console.log(body);
    return;
  }

  if (!TOKEN) {
    console.error("[baidu] BAIDU_PUSH_TOKEN is not set. Aborting.");
    process.exit(1);
  }

  const endpoint = `http://data.zz.baidu.com/urls?site=${encodeURIComponent(SITE)}&token=${encodeURIComponent(TOKEN)}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body,
  });

  const text = await response.text();
  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    console.error(`[baidu] non-JSON response (HTTP ${response.status}): ${text}`);
    process.exit(1);
  }

  if (!response.ok || payload.error) {
    // Common: 401 token invalid, 400 site not verified / over quota / >2000 urls
    console.error(
      `[baidu] push failed (HTTP ${response.status}): ${JSON.stringify(payload)}`,
    );
    process.exit(1);
  }

  // success = accepted count, remain = remaining daily quota (the real ceiling)
  console.log(
    `[baidu] pushed ${urls.length} URL(s): success=${payload.success ?? 0}, ` +
      `remain=${payload.remain ?? "?"} (remaining daily quota)`,
  );
  if (Array.isArray(payload.not_same_site) && payload.not_same_site.length > 0) {
    console.warn(`[baidu] not_same_site rejected: ${payload.not_same_site.join(", ")}`);
  }
  if (Array.isArray(payload.not_valid) && payload.not_valid.length > 0) {
    console.warn(`[baidu] not_valid rejected: ${payload.not_valid.join(", ")}`);
  }
}

main().catch((error) => {
  console.error(`[baidu] unexpected error: ${error.message}`);
  process.exit(1);
});
