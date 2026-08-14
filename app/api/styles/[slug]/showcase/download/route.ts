import { buildStandaloneShowcaseZip, StandaloneShowcaseError } from "@/lib/export/standalone-showcase";
import { getSiteBaseUrl } from "@/lib/site-url";

export const runtime = "nodejs";

// Behind the nginx reverse proxy the origin reconstructed from request.url is
// unreliable (it can report the public host with the internal port and an
// https scheme, so self-fetches perform TLS handshakes against a plaintext
// port). All same-origin bytes are therefore fetched over loopback while the
// canonical site origin is kept for URL semantics.
function getInternalOrigin(): string {
  return (
    process.env.SHOWCASE_INTERNAL_ORIGIN ??
    `http://127.0.0.1:${process.env.PORT ?? "3000"}`
  );
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return Response.json({ error: "Invalid style slug" }, { status: 400 });
  }

  const origin = getSiteBaseUrl();
  const internalOrigin = getInternalOrigin();
  const pageUrl = new URL(`/styles/${slug}/showcase`, internalOrigin);

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
      internalBaseUrl: internalOrigin,
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
