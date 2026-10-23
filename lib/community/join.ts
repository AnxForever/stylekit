// Community chat group configuration.
//
// The group is announced on /community/join and linked from the floating
// "交流群" rail. Nothing here is secret: the invite URL is rendered into a
// public page. Never put a personal contact number, a group owner's WeChat ID,
// or a token in this file.
//
// To move to another platform or group:
// 1. Write down the new group's rules before announcing it.
// 2. Copy the permanent invite URL into `inviteUrl` and update `platform`.
// 3. If the platform only offers a QR code, place the image under
//    `public/community/` and set `qrImageSrc` plus `qrExpiresAt` instead.
//    WeChat group QR codes expire after seven days, so leave a reminder.
// 4. Run `pnpm run test -- community-join` before deploying.

export type CommunityGroupPlatform = "wechat" | "qq" | "discord" | "telegram";

export interface CommunityGroupConfig {
  /** "prelaunch" keeps the page in a "coming soon" state with no invite. */
  status: "prelaunch" | "live";
  platform: CommunityGroupPlatform;
  /** Public display name, shown on /community/join and the floating rail. */
  name?: string;
  /** Searchable group number, shown next to the invite for manual joining. */
  groupNumber?: string;
  /** Public invite URL. Used only when `status` is "live". */
  inviteUrl?: string;
  /** Root-relative path under `public/`, such as "/community/group.png". */
  qrImageSrc?: string;
  /** ISO date after which `qrImageSrc` must be replaced. */
  qrExpiresAt?: string;
}

export const COMMUNITY_GROUP: CommunityGroupConfig = {
  status: "live",
  platform: "qq",
  name: "StyleKit 交流群",
  groupNumber: "347664048",
  inviteUrl:
    "https://qun.qq.com/universal-share/share?ac=1&authKey=vqdXRWUjIax8aNRPXTbgQrCRn7DERUK8PhnfkS2Jg60ArVcY%2BpqyWqg7%2FAta%2BDEf&busi_data=eyJncm91cENvZGUiOiIzNDc2NjQwNDgiLCJ0b2tlbiI6IlFkRHpIYVc1Zzd4a3Y0dDJ4TzBVQm1BczNOQXIwK2ZEa1o5MENTUkJ1MUVOOFhHNDFFTFRDUklIcTYrL3Y3STEiLCJ1aW4iOiIzNDc1ODcyMDU2In0%3D&data=ly4QHg2sgxJ5V47IMIHcrz0O7p_q28uFnJunkhqX-ijBby8M5G1oaB9LzVyJeZuHpqKK50-0SUzhdK14QqTQvw&svctype=4&tempid=h5_group_info",
};

export type CommunityGroupDestination =
  | { kind: "invite"; href: string }
  | { kind: "qr"; src: string }
  | { kind: "pending" };

const INVITE_PROTOCOLS = new Set(["http:", "https:"]);

function isQrExpired(value: string | undefined, now: Date): boolean {
  if (!value) return false;
  const expiry = Date.parse(value);
  // A typo in the date should hide the QR code rather than publish a stale one.
  return Number.isNaN(expiry) || expiry <= now.getTime();
}

function validInviteUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    return INVITE_PROTOCOLS.has(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

/**
 * Turn the hand-edited configuration into something a page can render without
 * trusting it: a live group needs a usable invite URL, or a root-relative QR
 * code that has not expired. Everything else falls back to the pending state
 * instead of rendering a dead link or a broken image.
 */
export function resolveCommunityGroupDestination(
  config: CommunityGroupConfig,
  now: Date = new Date()
): CommunityGroupDestination {
  if (config.status !== "live") return { kind: "pending" };

  const href = validInviteUrl(config.inviteUrl);
  if (href) return { kind: "invite", href };

  const qrImageSrc = config.qrImageSrc?.trim();
  if (
    qrImageSrc &&
    qrImageSrc.startsWith("/") &&
    !qrImageSrc.startsWith("//") &&
    !isQrExpired(config.qrExpiresAt, now)
  ) {
    return { kind: "qr", src: qrImageSrc };
  }

  return { kind: "pending" };
}
