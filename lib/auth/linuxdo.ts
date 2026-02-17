/**
 * Linux DO Connect OAuth2 helpers.
 *
 * Endpoints docs: https://wiki.linux.do/Community/LinuxDoConnect
 */

const AUTHORIZE_URL = "https://connect.linux.do/oauth2/authorize";
const TOKEN_URL = "https://connect.linux.do/oauth2/token";
const USER_URL = "https://connect.linux.do/api/user";

export interface LinuxDoUser {
  id: number;
  username: string;
  name: string;
  avatar_url: string;
  email: string | null;
  active: boolean;
  trust_level: number;
  silenced: boolean;
  api_key: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
}

function getCredentials() {
  const clientId = process.env.LINUXDO_CLIENT_ID;
  const clientSecret = process.env.LINUXDO_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("LINUXDO_CLIENT_ID and LINUXDO_CLIENT_SECRET must be set");
  }
  return { clientId, clientSecret };
}

export function buildAuthorizationUrl(redirectUri: string): string {
  const { clientId } = getCredentials();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid profile email",
  });
  return `${AUTHORIZE_URL}?${params.toString()}`;
}

export async function exchangeCodeForToken(
  code: string,
  redirectUri: string,
): Promise<TokenResponse> {
  const { clientId, clientSecret } = getCredentials();

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LinuxDo token exchange failed: ${res.status} ${text}`);
  }

  return res.json() as Promise<TokenResponse>;
}

export async function getLinuxDoUser(
  accessToken: string,
): Promise<LinuxDoUser> {
  const res = await fetch(USER_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LinuxDo user fetch failed: ${res.status} ${text}`);
  }

  return res.json() as Promise<LinuxDoUser>;
}
