import { generateLlmsFullText } from "@/lib/export/llms-full";
import { listPromotedCommunityStyles } from "@/lib/styles/community-runtime";
import { getSiteBaseUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export async function GET() {
  const community = await listPromotedCommunityStyles();
  const baseUrl = getSiteBaseUrl();
  const communitySection = community.length > 0
    ? `\n\n## Promoted Community Styles\n\n${community
        .map(
          (style) =>
            `### ${style.nameEn || style.name}\n- **Description**: ${style.descriptionEn || style.description}\n- **Category**: ${style.category}\n- **Tags**: ${style.tags.join(", ")}\n- **Style Page**: ${baseUrl}/en/community/${style.slug}\n- **Markdown**: ${baseUrl}/api/styles/${style.slug}/md`
        )
        .join("\n\n")}\n`
    : "";
  const content = `${generateLlmsFullText()}${communitySection}`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Language": "en",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
