import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const license = await readFile(
      path.join(
        process.cwd(),
        "experience-packs/corporate-clean-saas/files/LICENSE.md",
      ),
      "utf8",
    );
    return new Response(license, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=300, must-revalidate",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  } catch {
    return Response.json(
      { error: "License artifact is unavailable" },
      { status: 503 },
    );
  }
}
