/**
 * Linux DO Connect OAuth2 helpers.
 *
 * Endpoints docs: https://wiki.linux.do/Community/LinuxDoConnect
 */

// Base URL for Linux DO Connect. Override via LINUXDO_BASE_URL to route
// server-to-server calls through a reverse proxy (e.g. Cloudflare Worker)
// when the host network cannot reach connect.linux.do directly.
const DEFAULT_BASE_URL = "https://connect.linux.do";

function getBaseUrl(): string {
  const raw = process.env.LINUXDO_BASE_URL?.trim();
  if (!raw) return DEFAULT_BASE_URL;
  return raw.replace(/\/+$/, "");
}

// Authorization URL is always served from the official host so the user's
// browser talks to Linux DO directly; only server-to-server endpoints are
// proxied when LINUXDO_BASE_URL is set.
const AUTHORIZE_URL = `${DEFAULT_BASE_URL}/oauth2/authorize`;

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

type LinuxDoRequestStage = "token-exchange" | "user-fetch";

const RESPONSE_TIMEOUT_MS = 12_000;
const MAX_RESPONSE_BYTES = 1024 * 1024;

class LinuxDoRequestError extends Error {
  constructor(
    message: string,
    readonly transient: boolean,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "LinuxDoRequestError";
  }
}

function describeError(error: unknown): string {
  if (!(error instanceof Error)) return String(error);

  const cause = error.cause;
  if (cause && typeof cause === "object") {
    const causeRecord = cause as { code?: unknown; message?: unknown };
    const causeCode =
      typeof causeRecord.code === "string" ? causeRecord.code : null;
    const causeMessage =
      typeof causeRecord.message === "string" ? causeRecord.message : null;
    if (causeCode || causeMessage) {
      return [error.message, causeCode, causeMessage]
        .filter(Boolean)
        .join(" / ");
    }
  }

  return error.message;
}

function getResponseTrace(response: Response): string | null {
  return (
    response.headers.get("x-request-id") ??
    response.headers.get("x-deno-trace-id") ??
    response.headers.get("cf-ray")
  );
}

function summarizeErrorBody(text: string): string | null {
  if (!text) return null;

  try {
    const parsed = JSON.parse(text) as Record<string, unknown>;
    for (const key of ["error_description", "detail", "error", "message"]) {
      const value = parsed[key];
      if (typeof value === "string" && value.trim()) {
        return value.replace(/\s+/g, " ").slice(0, 240);
      }
    }
  } catch {
    // Fall back to a short, single-line body below.
  }

  return text.replace(/\s+/g, " ").trim().slice(0, 240) || null;
}

async function readResponseBody(response: Response): Promise<{
  text: string;
  streamError: unknown;
}> {
  if (!response.body) return { text: "", streamError: null };

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  let totalBytes = 0;
  let streamError: unknown = null;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_RESPONSE_BYTES) {
        throw new Error("response exceeded 1 MiB limit");
      }
      text += decoder.decode(value, { stream: true });
    }
  } catch (error) {
    streamError = error;
  } finally {
    text += decoder.decode();
    reader.releaseLock();
  }

  return { text, streamError };
}

async function parseLinuxDoResponse<T>(
  response: Response,
  stage: LinuxDoRequestStage,
): Promise<T> {
  const { text, streamError } = await readResponseBody(response);
  const trace = getResponseTrace(response);
  const traceSuffix = trace ? ` (trace ${trace})` : "";

  if (!response.ok) {
    const detail = summarizeErrorBody(text);
    const detailSuffix = detail ? `: ${detail}` : "";
    const transient =
      response.status === 408 ||
      response.status === 425 ||
      response.status === 429 ||
      response.status >= 500;
    throw new LinuxDoRequestError(
      `LinuxDo ${stage} failed: HTTP ${response.status}${detailSuffix}${traceSuffix}`,
      transient,
      streamError ? { cause: streamError } : undefined,
    );
  }

  try {
    const data = JSON.parse(text) as T;
    if (streamError) {
      // Some reverse proxies send a complete JSON payload but close the HTTP
      // stream without a valid final frame. Undici reports `terminated`; the
      // payload is still safe to use when it parses completely.
      console.warn(
        `[LinuxDo OAuth] Recovered complete ${stage} JSON after stream error${traceSuffix}:`,
        describeError(streamError),
      );
    }
    return data;
  } catch (error) {
    const reason = streamError
      ? `response stream failed: ${describeError(streamError)}`
      : "response was not valid JSON";
    throw new LinuxDoRequestError(
      `LinuxDo ${stage} failed: ${reason}${traceSuffix}`,
      true,
      { cause: streamError ?? error },
    );
  }
}

async function requestLinuxDoJson<T>(
  stage: LinuxDoRequestStage,
  path: string,
  init: RequestInit,
  maxAttempts = 1,
): Promise<T> {
  let lastError: LinuxDoRequestError | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const headers = new Headers(init.headers);
      headers.set("Accept", "application/json");
      // The configured Deno reverse proxy can otherwise forward a compressed
      // upstream body with incompatible framing, which Undici reports as
      // `TypeError: terminated` while consuming the response.
      headers.set("Accept-Encoding", "identity");

      const response = await fetch(`${getBaseUrl()}${path}`, {
        ...init,
        headers,
        cache: "no-store",
        signal: AbortSignal.timeout(RESPONSE_TIMEOUT_MS),
      });
      return await parseLinuxDoResponse<T>(response, stage);
    } catch (error) {
      lastError =
        error instanceof LinuxDoRequestError
          ? error
          : new LinuxDoRequestError(
              `LinuxDo ${stage} failed: ${describeError(error)}`,
              true,
              { cause: error },
            );

      if (!lastError.transient || attempt === maxAttempts) {
        throw lastError;
      }
    }
  }

  throw lastError ?? new Error(`LinuxDo ${stage} failed`);
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

  const tokenData = await requestLinuxDoJson<TokenResponse>(
    "token-exchange",
    "/oauth2/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    },
  );

  if (!tokenData?.access_token || typeof tokenData.access_token !== "string") {
    throw new Error("LinuxDo token-exchange failed: access_token is missing");
  }

  return tokenData;
}

export async function getLinuxDoUser(
  accessToken: string,
): Promise<LinuxDoUser> {
  // This endpoint is an idempotent GET, so transient proxy failures can be
  // retried without risking duplicate OAuth code consumption.
  return requestLinuxDoJson<LinuxDoUser>(
    "user-fetch",
    "/api/user",
    { headers: { Authorization: `Bearer ${accessToken}` } },
    3,
  );
}
