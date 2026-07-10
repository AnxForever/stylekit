function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export interface RssItem {
  title: string;
  description: string;
  link: string;
  pubDate?: string;
  guid: string;
  author?: string;
}

interface RssChannelOptions {
  title: string;
  description: string;
  link: string;
  selfUrl: string;
  language: string;
  items: RssItem[];
}

export function generateRss(options: RssChannelOptions): string {
  const { title, description, link, selfUrl, language, items } = options;
  const itemDates = items
    .map((item) => item.pubDate ? Date.parse(item.pubDate) : Number.NaN)
    .filter(Number.isFinite);
  const lastBuildDate = itemDates.length
    ? new Date(Math.max(...itemDates)).toUTCString()
    : undefined;

  const itemsXml = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>
      <link>${escapeXml(item.link)}</link>
${item.pubDate ? `      <pubDate>${new Date(item.pubDate).toUTCString()}</pubDate>\n` : ""}      <guid isPermaLink="true">${escapeXml(item.guid)}</guid>
${item.author ? `      <dc:creator>${escapeXml(item.author)}</dc:creator>\n` : ""}    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(title)}</title>
    <description>${escapeXml(description)}</description>
    <link>${escapeXml(link)}</link>
    <atom:link href="${escapeXml(selfUrl)}" rel="self" type="application/rss+xml"/>
    <language>${escapeXml(language)}</language>
${lastBuildDate ? `    <lastBuildDate>${lastBuildDate}</lastBuildDate>\n` : ""}${itemsXml}
  </channel>
</rss>`;
}
