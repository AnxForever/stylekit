#!/usr/bin/env node
/**
 * Verify the self-hosted Umami wiring end to end.
 *
 *   node tools/scripts/verify-umami-selfhost.mjs
 *
 * Checks, in order:
 *   1. The tracker script is reachable and points at the /umami instance.
 *   2. The site renders the tracker tag with the configured website ID.
 *   3. The read API accepts UMAMI_USERNAME / UMAMI_PASSWORD.
 *   4. Country data is actually being recorded (the "no region" complaint).
 *
 * Read-only: issues GETs and one login POST. It never writes analytics data.
 * Exit code 0 when every required check passes, 1 otherwise.
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const HOST = process.env.UMAMI_VERIFY_HOST || "https://www.stylekit.top";
const SCRIPT_URL = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || `${HOST}/umami/script.js`;
const API_BASE = (process.env.UMAMI_API_BASE_URL || `${HOST}/umami/api`).replace(/\/+$/, "");

const results = [];
let failed = 0;

function record(name, ok, detail) {
  results.push({ name, ok, detail });
  if (!ok) failed += 1;
  const mark = ok ? "PASS" : "FAIL";
  console.log(`[${mark}] ${name}${detail ? ` — ${detail}` : ""}`);
}

function skip(name, reason) {
  results.push({ name, ok: true, skipped: true, detail: reason });
  console.log(`[SKIP] ${name} — ${reason}`);
}

/**
 * Load .env.local the same way Next does for local runs. Values already present
 * in the real environment win, so CI can inject credentials without a file.
 */
function loadDotEnv() {
  for (const file of [".env.local", ".env.production", ".env"]) {
    const full = path.join(process.cwd(), file);
    if (!existsSync(full)) continue;
    for (const raw of readFileSync(full, "utf8").split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq < 1) continue;
      const key = line.slice(0, eq).trim();
      if (process.env[key] !== undefined) continue;
      let value = line.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
}

async function main() {
  loadDotEnv();

  const websiteId = (process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "").trim();
  const username = (process.env.UMAMI_USERNAME || "").trim();
  const password = process.env.UMAMI_PASSWORD || "";

  console.log(`Host:  ${HOST}`);
  console.log(`API:   ${API_BASE}\n`);

  // 1. Tracker script reachable.
  try {
    const res = await fetch(SCRIPT_URL, { signal: AbortSignal.timeout(15_000) });
    const body = await res.text();
    const isTracker = body.includes("website-id") || body.includes("data-website-id");
    record(
      "Tracker script reachable",
      res.ok && isTracker,
      `HTTP ${res.status}, ${body.length} bytes${isTracker ? "" : ", does not look like the Umami tracker"}`
    );
  } catch (error) {
    record("Tracker script reachable", false, error.message);
  }

  // 2. Tracker tag present in the rendered site.
  if (!websiteId) {
    skip("Tracker tag rendered", "NEXT_PUBLIC_UMAMI_WEBSITE_ID is not set");
  } else {
    try {
      const res = await fetch(HOST, { signal: AbortSignal.timeout(20_000) });
      const html = await res.text();
      const hasScript = html.includes("/umami/script.js") || html.includes("cloud.umami.is");
      const hasId = html.includes(websiteId);
      const usingCloud = html.includes("cloud.umami.is") && !html.includes("/umami/script.js");
      record(
        "Tracker tag rendered",
        hasScript && hasId && !usingCloud,
        usingCloud
          ? "site still loads the Umami Cloud script"
          : hasId
            ? "website ID present"
            : "website ID missing from HTML (browser-injected tags may not appear here)"
      );
    } catch (error) {
      record("Tracker tag rendered", false, error.message);
    }
  }

  // 3. Read API authentication.
  if (!username || !password) {
    skip("Read API login", "UMAMI_USERNAME / UMAMI_PASSWORD not set");
    console.log("\nRemaining checks need credentials. See docs/UMAMI-SELFHOST.md.");
    return;
  }

  let token = null;
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      signal: AbortSignal.timeout(20_000),
    });
    if (res.ok) {
      token = (await res.json()).token ?? null;
      record("Read API login", Boolean(token), token ? "token received" : "no token in response");
    } else {
      record("Read API login", false, `HTTP ${res.status} (check username/password)`);
    }
  } catch (error) {
    record("Read API login", false, error.message);
  }
  if (!token) return;

  const auth = { Authorization: `Bearer ${token}` };
  const endAt = Date.now();
  const startAt = endAt - 7 * 24 * 60 * 60 * 1000;
  const qs = `startAt=${startAt}&endAt=${endAt}&timezone=Asia/Shanghai`;

  // 3b. Website exists and is readable.
  if (!websiteId) {
    skip("Website readable", "NEXT_PUBLIC_UMAMI_WEBSITE_ID is not set");
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/websites/${websiteId}/stats?${qs}`, {
      headers: auth,
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) {
      record("Website readable", false, `HTTP ${res.status}`);
    } else {
      const stats = await res.json();
      record(
        "Website readable",
        true,
        `7d: ${stats.pageviews ?? 0} pageviews, ${stats.visitors ?? 0} visitors`
      );
    }
  } catch (error) {
    record("Website readable", false, error.message);
  }

  // 4. Country data — the original complaint this migration set out to fix.
  try {
    const res = await fetch(
      `${API_BASE}/websites/${websiteId}/metrics?type=country&${qs}`,
      { headers: auth, signal: AbortSignal.timeout(20_000) }
    );
    if (!res.ok) {
      record("Country data recorded", false, `HTTP ${res.status}`);
    } else {
      const rows = await res.json();
      const list = Array.isArray(rows) ? rows : [];
      const named = list.filter((row) => String(row.x ?? "").trim().length > 0);
      if (list.length === 0) {
        record("Country data recorded", false, "no rows in the last 7 days");
      } else if (named.length === 0) {
        record(
          "Country data recorded",
          false,
          `${list.length} rows but every country is blank — apply SKIP_LOCATION_HEADERS=1`
        );
      } else {
        const top = named
          .slice(0, 5)
          .map((row) => `${row.x}=${row.y}`)
          .join(", ");
        record("Country data recorded", true, top);
      }
    }
  } catch (error) {
    record("Country data recorded", false, error.message);
  }
}

main()
  .catch((error) => {
    console.error(`Unexpected error: ${error.message}`);
    failed += 1;
  })
  .finally(() => {
    const skipped = results.filter((r) => r.skipped).length;
    console.log(
      `\n${results.length - failed - skipped} passed, ${failed} failed, ${skipped} skipped`
    );
    // Set the code rather than calling process.exit(): an immediate exit can
    // tear down sockets that fetch() has not finished releasing, which trips an
    // assertion in libuv on Windows. Letting the loop drain avoids that.
    process.exitCode = failed === 0 ? 0 : 1;
  });
