/**
 * NodeLoc OAuth 2.0 / OpenID Connect helpers.
 *
 * The provider endpoints are documented at:
 * https://docs.nodeloc.com/api-reference/introduction
 */

import { z } from "zod";

const DEFAULT_BASE_URL = "https://www.nodeloc.com";

const tokenResponseSchema = z
  .object({
    access_token: z.string().min(1),
    token_type: z.string().min(1),
    expires_in: z.number().int().positive(),
    refresh_token: z.string().min(1).optional(),
  })
  .passthrough();

const userResponseSchema = z
  .object({
    id: z.union([
      z.number().int().positive(),
      z.string().regex(/^\d+$/).transform(Number),
    ]),
    username: z.string().trim().min(1),
    name: z.string().trim().nullable().optional(),
    avatar_url: z.string().trim().nullable().optional(),
    trust_level: z.number().int().min(0).max(4).nullable().optional(),
    email: z.string().email().nullable().optional(),
  })
  .passthrough();

export type NodeLocTokenResponse = z.infer<typeof tokenResponseSchema>;
export type NodeLocUser = z.infer<typeof userResponseSchema>;

function getBaseUrl(): string {
  const configured = process.env.NODELOC_BASE_URL?.trim();
  if (!configured) return DEFAULT_BASE_URL;

  let url: URL;
  try {
    url = new URL(configured);
  } catch {
    throw new Error("NODELOC_BASE_URL must be a valid URL");
  }

  if (url.protocol !== "https:" && process.env.NODE_ENV !== "development") {
    throw new Error("NODELOC_BASE_URL must use HTTPS outside development");
  }

  return url.origin;
}

function getCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.NODELOC_CLIENT_ID?.trim();
  const clientSecret = process.env.NODELOC_CLIENT_SECRET?.trim();
  if (!clientId || !clientSecret) {
    throw new Error("NODELOC_CLIENT_ID and NODELOC_CLIENT_SECRET must be set");
  }
  return { clientId, clientSecret };
}

export function buildAuthorizationUrl(redirectUri: string, state: string): string {
  const { clientId } = getCredentials();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    // Email is intentionally omitted: NodeLoc requires admin approval for it,
    // while StyleKit can establish the Supabase identity without reading it.
    scope: "openid profile",
    state,
  });
  return `${getBaseUrl()}/oauth-provider/authorize?${params.toString()}`;
}

export async function exchangeCodeForToken(
  code: string,
  redirectUri: string,
): Promise<NodeLocTokenResponse> {
  const { clientId, clientSecret } = getCredentials();
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch(`${getBaseUrl()}/oauth-provider/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`NodeLoc token exchange failed: ${response.status} ${text}`);
  }

  return tokenResponseSchema.parse(await response.json());
}

export async function getNodeLocUser(accessToken: string): Promise<NodeLocUser> {
  const response = await fetch(`${getBaseUrl()}/oauth-provider/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`NodeLoc user info request failed: ${response.status} ${text}`);
  }

  return userResponseSchema.parse(await response.json());
}
