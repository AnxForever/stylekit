// Community chat group configuration.
//
// The group is announced on /community/join. Nothing here is secret: the
// invite URL is rendered into a public page. Never put a personal contact
// number, a group owner's WeChat ID, or a token in this file.
//
// Launch checklist:
// 1. Create the group and write down its rules.
// 2. Set `status` to "live".
// 3. Prefer a permanent invite URL (`inviteUrl`). If the platform only offers
//    a QR code, place the image under `public/community/` and set
//    `qrImageSrc` plus `qrExpiresAt`. WeChat group QR codes expire after seven
//    days, so leave a calendar reminder to replace the file.
// 4. Run `pnpm run test -- community-join` before deploying.

export type CommunityGroupPlatform = "wechat" | "qq" | "discord" | "telegram";

export interface CommunityGroupConfig {
  /** "prelaunch" keeps the page in a "coming soon" state with no invite. */
  status: "prelaunch" | "live";
  platform: CommunityGroupPlatform;
  /** Public invite URL. Used only when `status` is "live". */
  inviteUrl?: string;
  /** Root-relative path under `public/`, such as "/community/wechat-group.png". */
  qrImageSrc?: string;
  /** ISO date after which `qrImageSrc` must be replaced. */
  qrExpiresAt?: string;
}

export const COMMUNITY_GROUP: CommunityGroupConfig = {
  status: "prelaunch",
  platform: "wechat",
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
