import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import {
  ANALYTICS_EXCLUSION_COOKIE_MAX_AGE_SECONDS,
  ANALYTICS_EXCLUSION_COOKIE_NAME,
} from "@/lib/analytics/collection-policy";
import { hasAnalyticsExclusionCookie } from "@/lib/analytics/server-collection-policy";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

const PRIVATE_NO_STORE_HEADERS = { "Cache-Control": "private, no-store" };

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403, headers: PRIVATE_NO_STORE_HEADERS },
    );
  }

  return NextResponse.json(
    { excluded: hasAnalyticsExclusionCookie(request) },
    { headers: PRIVATE_NO_STORE_HEADERS },
  );
}

export async function POST(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403, headers: PRIVATE_NO_STORE_HEADERS },
    );
  }

  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { error: originCheck.error },
      {
        status: originCheck.status ?? 403,
        headers: PRIVATE_NO_STORE_HEADERS,
      },
    );
  }

  const response = NextResponse.json(
    { excluded: true },
    { headers: PRIVATE_NO_STORE_HEADERS },
  );
  response.cookies.set(ANALYTICS_EXCLUSION_COOKIE_NAME, "1", {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ANALYTICS_EXCLUSION_COOKIE_MAX_AGE_SECONDS,
  });
  return response;
}

export async function DELETE(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403, headers: PRIVATE_NO_STORE_HEADERS },
    );
  }

  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { error: originCheck.error },
      {
        status: originCheck.status ?? 403,
        headers: PRIVATE_NO_STORE_HEADERS,
      },
    );
  }

  const response = NextResponse.json(
    { excluded: false },
    { headers: PRIVATE_NO_STORE_HEADERS },
  );
  response.cookies.set(ANALYTICS_EXCLUSION_COOKIE_NAME, "", {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
