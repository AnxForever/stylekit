const origin = (process.env.SEO_CHECK_ORIGIN || "http://127.0.0.1:3100").replace(/\/$/, "");
const concurrency = Number(process.env.SEO_CHECK_CONCURRENCY || 12);

function extractLinks(html, rel) {
  return [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) => new RegExp(`\\brel=["']${rel}["']`, "i").test(tag))
    .map((tag) => tag.match(/\bhref=["']([^"']+)["']/i)?.[1])
    .filter(Boolean);
}

async function fetchManual(pathname, userAgent = "StyleKit SEO runtime verifier") {
  return fetch(`${origin}${pathname}`, {
    redirect: "manual",
    headers: {
      "user-agent": userAgent,
      "accept-language": "en-US,en;q=0.9",
    },
  });
}

async function main() {
  const sitemapResponse = await fetchManual("/sitemap.xml");
  if (sitemapResponse.status !== 200) {
    throw new Error(`sitemap returned ${sitemapResponse.status}`);
  }

  const sitemapXml = await sitemapResponse.text();
  const canonicalUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1]
  );
  const issues = [];
  let cursor = 0;

  async function worker() {
    while (cursor < canonicalUrls.length) {
      const index = cursor++;
      const canonicalUrl = canonicalUrls[index];
      const pathname = new URL(canonicalUrl).pathname;
      try {
        const response = await fetchManual(pathname);
        if (response.status !== 200) {
          issues.push(`${canonicalUrl}: expected 200, got ${response.status}`);
          continue;
        }

        const html = await response.text();
        if (/name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) {
          issues.push(`${canonicalUrl}: sitemap URL is noindex`);
        }

        const canonicals = extractLinks(html, "canonical");
        if (canonicals.length !== 1) {
          issues.push(`${canonicalUrl}: expected one canonical, found ${canonicals.length}`);
        } else if (canonicals[0] !== canonicalUrl) {
          issues.push(`${canonicalUrl}: canonical points to ${canonicals[0]}`);
        }
      } catch (error) {
        issues.push(`${canonicalUrl}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  const redirectChecks = [
    ["/en/prompts", "/en/ui-prompts"],
    ["/zh/prompts/landing-page", "/zh/landing-page-prompts"],
  ];
  for (const [source, destination] of redirectChecks) {
    const response = await fetchManual(source);
    if (response.status !== 308 || response.headers.get("location") !== destination) {
      issues.push(`${source}: expected 308 to ${destination}, got ${response.status} to ${response.headers.get("location")}`);
    }
  }

  const missingResponse = await fetchManual("/en/this-route-must-not-exist");
  if (missingResponse.status !== 404) {
    issues.push(`/en/this-route-must-not-exist: expected 404, got ${missingResponse.status}`);
  } else {
    const missingHtml = await missingResponse.text();
    if (/content=["']index, follow["']/i.test(missingHtml)) {
      issues.push("/en/this-route-must-not-exist: 404 also publishes index,follow");
    }
  }

  for (const pathname of ["/", "/styles", "/styles/corporate-clean", "/templates/saas-landing"]) {
    const response = await fetchManual(pathname, "Applebot/0.1");
    if (response.status !== 200) {
      issues.push(`${pathname} (Applebot): expected 200, got ${response.status}`);
      continue;
    }
    const html = await response.text();
    const canonicals = extractLinks(html, "canonical");
    const expected = `${new URL(canonicalUrls[0]).origin}/en${pathname === "/" ? "" : pathname}`;
    if (canonicals.length !== 1 || canonicals[0] !== expected) {
      issues.push(`${pathname} (Applebot): expected canonical ${expected}, got ${canonicals.join(", ") || "none"}`);
    }
  }

  const robotsResponse = await fetchManual("/robots.txt");
  const robotsText = await robotsResponse.text();
  if (!robotsText.includes("Allow: /api/styles/*/md$")) {
    issues.push("/robots.txt: missing narrow Markdown allow rule");
  }
  if (/^Allow: \/api\/styles\/$/m.test(robotsText)) {
    issues.push("/robots.txt: entire style API subtree is allowed");
  }

  const stylesFeedResponse = await fetchManual("/feed/styles.xml");
  const stylesFeed = await stylesFeedResponse.text();
  if (/<pubDate>|<lastBuildDate>/.test(stylesFeed)) {
    issues.push("/feed/styles.xml: publishes dates without persistent source data");
  }

  if (issues.length) {
    console.error(`[check:seo-runtime] FAIL - ${issues.length} issue(s):`);
    for (const issue of issues.slice(0, 100)) console.error(`- ${issue}`);
    if (issues.length > 100) console.error(`- ... ${issues.length - 100} more`);
    process.exitCode = 1;
    return;
  }

  console.log(`[check:seo-runtime] PASS - ${canonicalUrls.length} sitemap URLs are 200, indexable, and self-canonical.`);
}

main().catch((error) => {
  console.error(`[check:seo-runtime] FAIL - ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
