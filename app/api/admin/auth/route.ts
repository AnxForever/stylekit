import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE_NAME,
  createAdminSessionCookieValue,
  getAdminSessionCookieMaxAge,
  isAdminPasswordConfigured,
  verifyAdminPassword,
} from "@/lib/auth/admin-session";

export async function POST(request: Request) {
  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      { error: "Admin password login is not configured." },
      { status: 503 }
    );
  }

  const password = await readPassword(request);
  if (!password || !(await verifyAdminPassword(password))) {
    return NextResponse.json(
      { error: "Invalid admin password." },
      { status: 401 }
    );
  }

  let cookieValue: string;
  try {
    cookieValue = await createAdminSessionCookieValue();
  } catch {
    return NextResponse.json(
      { error: "Admin session is not configured." },
      { status: 503 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE_NAME, cookieValue, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getAdminSessionCookieMaxAge(),
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}

async function readPassword(request: Request): Promise<string | null> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return null;
  }

  if (!body || typeof body !== "object") {
    return null;
  }

  const password = (body as { password?: unknown }).password;
  return typeof password === "string" ? password : null;
}
