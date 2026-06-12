import { createHash, timingSafeEqual } from "node:crypto";
import { getServerUser } from "@/lib/auth/supabase-server";
import { getAdminApiToken, isAdminUserId } from "@/lib/auth/admin-policy";
import {
  ADMIN_SESSION_COOKIE_NAME,
  verifyAdminSessionCookieValue,
} from "@/lib/auth/admin-session";

export interface AdminActor {
  type: "user" | "token" | "password-session" | "dev-bypass";
  id: string;
}

export interface AdminAccessResult {
  allowed: boolean;
  status?: number;
  error?: string;
  actor?: AdminActor;
}

interface CheckAdminApiAccessOptions {
  nodeEnv?: string;
}

export async function checkAdminApiAccess(
  request: Request,
  options: CheckAdminApiAccessOptions = {}
): Promise<AdminAccessResult> {
  const nodeEnv = options.nodeEnv ?? process.env.NODE_ENV ?? "development";
  const configuredToken = getAdminApiToken();
  const requestToken = getRequestAdminToken(request);

  if (configuredToken && requestToken && tokensMatch(configuredToken, requestToken)) {
    return {
      allowed: true,
      actor: {
        type: "token",
        id: fingerprintToken(requestToken),
      },
    };
  }

  const adminSessionCookie = getRequestCookie(request, ADMIN_SESSION_COOKIE_NAME);
  if (await verifyAdminSessionCookieValue(adminSessionCookie)) {
    return {
      allowed: true,
      actor: {
        type: "password-session",
        id: "admin-password-session",
      },
    };
  }

  const hasAuthCookie = hasSupabaseAuthCookie(request);
  if (!hasAuthCookie) {
    if (configuredToken) {
      return {
        allowed: false,
        status: 401,
        error:
          "Unauthorized. Provide a valid admin token or sign in to the admin console.",
      };
    }

    if (nodeEnv !== "production" && process.env.ADMIN_DEV_BYPASS === "true") {
      return {
        allowed: true,
        actor: {
          type: "dev-bypass",
          id: "dev-bypass",
        },
      };
    }

    return {
      allowed: false,
      status: 403,
      error: "Forbidden. Configure ADMIN_USER_IDS or ADMIN_API_TOKEN for production admin access.",
    };
  }

  const user = await getServerUser();
  if (user) {
    if (isAdminUserId(user.id, nodeEnv)) {
      return {
        allowed: true,
        actor: {
          type: "user",
          id: user.id,
        },
      };
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
      error:
        "Unauthorized. Provide a valid admin token or sign in to the admin console.",
    };
  }

  if (nodeEnv !== "production") {
    return {
      allowed: true,
      actor: {
        type: "dev-bypass",
        id: "dev-bypass",
      },
    };
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

function getRequestCookie(request: Request, name: string): string | null {
  const rawCookie = request.headers.get("cookie");
  if (!rawCookie) {
    return null;
  }

  for (const part of rawCookie.split(";")) {
    const [rawName, ...rawValue] = part.trim().split("=");
    if (rawName === name) {
      const value = rawValue.join("=").trim();
      if (!value) {
        return null;
      }

      try {
        return decodeURIComponent(value);
      } catch {
        return null;
      }
    }
  }

  return null;
}

function tokensMatch(expected: string, actual: string): boolean {
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(actual);
  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, actualBuffer);
}

function fingerprintToken(token: string): string {
  const hash = createHash("sha256").update(token).digest("hex");
  return `token:${hash.slice(0, 16)}`;
}

function hasSupabaseAuthCookie(request: Request): boolean {
  const rawCookie = request.headers.get("cookie");
  if (!rawCookie) {
    return false;
  }

  return /(?:^|;\s*)sb-[^=]+-auth-token=/.test(rawCookie);
}
