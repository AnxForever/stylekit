const baseUrl = process.env.INDEXNOW_BASE_URL || "https://www.stylekit.top";
const key = process.env.INDEXNOW_KEY || "ea6f65fc9edd8b6ba9808b0e7f103187";
const sitemapUrl = `${baseUrl}/sitemap.xml`;

const sitemap = await fetch(sitemapUrl).then(async (response) => {
  if (!response.ok) throw new Error(`Unable to fetch sitemap: ${response.status}`);
  return response.text();
});

const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (urls.length === 0) throw new Error("Sitemap contains no URLs");

const endpoint = "https://api.indexnow.org/indexnow";
const response = await fetch(endpoint, {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(baseUrl).host,
    key,
    keyLocation: `${baseUrl}/${key}.txt`,
    urlList: urls,
  }),
});

if (!response.ok && response.status !== 202) {
  throw new Error(`IndexNow submission failed: ${response.status} ${await response.text()}`);
}

console.log(`[indexnow] submitted ${urls.length} URLs with status ${response.status}`);
