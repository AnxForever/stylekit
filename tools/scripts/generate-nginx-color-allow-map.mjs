import { writeFileSync } from "node:fs";

const sitemapUrl =
  process.env.STYLEKIT_SITEMAP_URL || "http://127.0.0.1:13000/sitemap.xml";
const outputPath = process.argv[2];

const response = await fetch(sitemapUrl, {
  headers: { "user-agent": "StyleKit deployment map generator" },
});

if (!response.ok) {
  throw new Error(
    `[generate:nginx-color-allow-map] ${sitemapUrl} returned ${response.status}`,
  );
}

const sitemap = await response.text();
const colorSlugs = [
  ...sitemap.matchAll(/<loc>https:\/\/www\.stylekit\.top\/en\/colors\/([0-9a-f]{6})<\/loc>/g),
].map((match) => match[1]);
const uniqueColorSlugs = [...new Set(colorSlugs)].sort();

if (uniqueColorSlugs.length !== colorSlugs.length || uniqueColorSlugs.length < 400) {
  throw new Error(
    `[generate:nginx-color-allow-map] unexpected sitemap color set: ${uniqueColorSlugs.length} unique of ${colorSlugs.length}`,
  );
}

const lines = [
  "map $uri $stylekit_color_route_allowed {",
  "    default 1;",
  "    ~^/(en|zh)/colors/[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]$ 0;",
  "    ~^/colors/[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]$ 0;",
];

for (const slug of uniqueColorSlugs) {
  lines.push(`    /en/colors/${slug} 1;`);
  lines.push(`    /zh/colors/${slug} 1;`);
  lines.push(`    /colors/${slug} 1;`);
}

lines.push("}", "");
const output = lines.join("\n");
if (outputPath) {
  writeFileSync(outputPath, output);
} else {
  process.stdout.write(output);
}
console.error(
  `[generate:nginx-color-allow-map] wrote ${uniqueColorSlugs.length} colors from ${sitemapUrl}${outputPath ? ` to ${outputPath}` : ""}`,
);
