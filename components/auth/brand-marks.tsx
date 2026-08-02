/**
 * Inline brand marks for the login providers.
 *
 * Kept as local SVGs (no network fetch) so the sign-in page renders the marks
 * instantly and offline, matching the site's square, editorial line work.
 */

interface MarkProps {
  className?: string;
}

/** Linux DO identity mark: rounded square with the signature tri-band. */
export function LinuxDoMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id="linuxdo-clip">
          <circle cx="24" cy="24" r="19" />
        </clipPath>
      </defs>
      <circle cx="24" cy="24" r="19" fill="#1c1c1e" />
      <g clipPath="url(#linuxdo-clip)">
        <rect x="5" y="5" width="38" height="12.7" fill="#1c1c1e" />
        <rect x="5" y="17.7" width="38" height="12.6" fill="#f7f7f8" />
        <rect x="5" y="30.3" width="38" height="12.7" fill="#ffb003" />
      </g>
    </svg>
  );
}
