import { buildStandaloneShowcaseZip, StandaloneShowcaseError } from "@/lib/export/standalone-showcase";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return Response.json({ error: "Invalid style slug" }, { status: 400 });
  }

  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;
  const pageUrl = new URL(`/styles/${slug}/showcase`, origin);

  try {
    const pageResponse = await fetch(pageUrl, {
      headers: { Accept: "text/html" },
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });
    if (!pageResponse.ok) {
      return Response.json({ error: "Showcase not found" }, { status: 404 });
    }

    const zip = await buildStandaloneShowcaseZip(await pageResponse.text(), {
      origin,
      signal: AbortSignal.timeout(90_000),
    });
    const body = new ArrayBuffer(zip.byteLength);
    new Uint8Array(body).set(zip);

    return new Response(body, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${slug}-showcase.zip"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message =
      error instanceof StandaloneShowcaseError
        ? error.message
        : "Could not prepare a complete offline showcase";
    console.error("[Showcase Download] Export failed:", error);
    return Response.json({ error: message }, { status: 502 });
  }
}
