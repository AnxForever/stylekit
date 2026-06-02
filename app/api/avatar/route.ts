import { NextResponse, type NextRequest } from "next/server";
import { shouldProxyAvatarHostname } from "@/lib/avatar";

const AVATAR_CACHE_CONTROL = "public, max-age=86400, stale-while-revalidate=604800";

export async function GET(request: NextRequest) {
  const target = new URL(request.url).searchParams.get("url");
  if (!target) {
    return new NextResponse("Missing avatar url", { status: 400 });
  }

  let remoteUrl: URL;
  try {
    remoteUrl = new URL(target);
  } catch {
    return new NextResponse("Invalid avatar url", { status: 400 });
  }

  if (remoteUrl.protocol !== "https:" || !shouldProxyAvatarHostname(remoteUrl.hostname)) {
    return new NextResponse("Avatar host not allowed", { status: 400 });
  }

  try {
    const upstream = await fetch(remoteUrl, {
      headers: {
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "User-Agent": "StyleKitAvatarProxy/1.0",
      },
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!upstream.ok) {
      return new NextResponse("Avatar fetch failed", { status: 502 });
    }

    const contentType = upstream.headers.get("content-type") ?? "";
    if (!contentType.startsWith("image/")) {
      return new NextResponse("Unsupported avatar content type", { status: 502 });
    }

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Cache-Control", AVATAR_CACHE_CONTROL);
    headers.set("X-Content-Type-Options", "nosniff");

    const contentLength = upstream.headers.get("content-length");
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    return new NextResponse(upstream.body, {
      status: 200,
      headers,
    });
  } catch {
    return new NextResponse("Avatar proxy error", { status: 502 });
  }
}
