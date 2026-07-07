"use client";

import { useEffect, useState } from "react";

interface UnsplashAttributionProps {
  /** Unsplash photo ID (from the URL or API response) */
  photoId?: string;
  /** Photographer name returned from the API */
  photographerName?: string;
  /** Photographer Unsplash username */
  photographerUsername?: string;
}

/**
 * Unsplash attribution component — required by Unsplash API terms.
 * Place inside any showcase that displays generated style images.
 *
 * When photoId is provided, fetches the photographer info from the
 * Unsplash API. Otherwise falls back to a generic attribution link.
 */
export function UnsplashAttribution({
  photoId,
  photographerName,
  photographerUsername,
}: UnsplashAttributionProps) {
  const [info, setInfo] = useState<{
    name: string;
    username: string;
  } | null>(
    photographerName && photographerUsername
      ? { name: photographerName, username: photographerUsername }
      : null
  );

  useEffect(() => {
    if (info || !photoId) return;

    fetch(
      `https://api.unsplash.com/photos/${photoId}?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || ""}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setInfo({
            name: data.user.name || "Unknown",
            username: data.user.username || "unsplash",
          });
        }
      })
      .catch(() => {});
  }, [photoId, info]);

  if (!photoId && !info) return null;

  const name = info?.name ?? "Unsplash";
  const username = info?.username ?? "unsplash";

  return (
    <p className="text-[10px] text-[#555555] tracking-[0.05em]">
      Photo by{" "}
      <a
        href={`https://unsplash.com/@${username}?utm_source=stylekit&utm_medium=referral`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors underline underline-offset-2 decoration-[#444444]"
      >
        {name}
      </a>{" "}
      on{" "}
      <a
        href="https://unsplash.com/?utm_source=stylekit&utm_medium=referral"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors underline underline-offset-2 decoration-[#444444]"
      >
        Unsplash
      </a>
    </p>
  );
}
