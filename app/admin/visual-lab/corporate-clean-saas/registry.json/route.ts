import { corporateCleanSaasPack } from "@/lib/experience-packs";
import { toExperiencePackRegistryItem } from "@/lib/experience-packs/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const item = await toExperiencePackRegistryItem(process.cwd(), corporateCleanSaasPack);
    return Response.json(item, {
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Disposition": 'attachment; filename="corporate-clean-saas.registry.json"',
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to compile pack registry";
    return Response.json({ error: message }, { status: 500 });
  }
}
