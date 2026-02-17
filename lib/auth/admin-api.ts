import { timingSafeEqual } from "node:crypto";
import { getServerUser } from "@/lib/auth/supabase-server";
import { getAdminApiToken, isAdminUserId } from "@/lib/auth/admin-policy";

export interface AdminAccessResult {
  allowed: boolean;
  status?: number;
  error?: string;
}

export async function checkAdminApiAccess(
  request: Request
): Promise<AdminAccessResult> {
  const configuredToken = getAdminApiToken();
  const requestToken = getRequestAdminToken(request);

  if (configuredToken && requestToken && tokensMatch(configuredToken, requestToken)) {
    return { allowed: true };
  }

  const hasAuthCookie = hasSupabaseAuthCookie(request);
  if (!hasAuthCookie) {
    if (configuredToken) {
      return {
        allowed: false,
        status: 401,
        error: "Unauthorized. Provide a valid admin token or sign in as admin.",
      };
    }

    if (process.env.NODE_ENV !== "production") {
      return { allowed: true };
    }

    return {
      allowed: false,
      status: 403,
      error: "Forbidden. Configure ADMIN_USER_IDS or ADMIN_API_TOKEN for production admin access.",
    };
  }

  const user = await getServerUser();
  if (user) {
    if (isAdminUserId(user.id)) {
      return { allowed: true };
    }

    return {
      allowed: false,
      status: 403,
      error: "Forbidden. Admin privileges required.",
    };
  }

  if (configuredToken) {
    return {
      allowed: false,
      status: 401,
      error: "Unauthorized. Provide a valid admin token or sign in as admin.",
    };
  }

  if (process.env.NODE_ENV !== "production") {
    return { allowed: true };
  }

  return {
    allowed: false,
    status: 403,
    error: "Forbidden. Configure ADMIN_USER_IDS or ADMIN_API_TOKEN for production admin access.",
  };
}

function getRequestAdminToken(request: Request): string | null {
  const explicit = request.headers.get("x-admin-token")?.trim();
  if (explicit) return explicit;

  const authorization = request.headers.get("authorization");
  if (!authorization) return null;

  const [scheme, token] = authorization.split(" ");
  if (scheme?.toLowerCase() !== "bearer") return null;

  const cleaned = token?.trim();
  return cleaned ? cleaned : null;
}

function tokensMatch(expected: string, actual: string): boolean {
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(actual);
  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, actualBuffer);
}

function hasSupabaseAuthCookie(request: Request): boolean {
  const rawCookie = request.headers.get("cookie");
  if (!rawCookie) {
    return false;
  }

  return /(?:^|;\s*)sb-[^=]+-auth-token=/.test(rawCookie);
}
