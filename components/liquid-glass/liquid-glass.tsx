"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  buildDisplacementPixels,
  deriveFilterParams,
  resolveLiquidGlassSettings,
  resolveMapGeometry,
  type LiquidGlassSettings,
} from "@/lib/liquid-glass";
import { cn } from "@/lib/utils";

function detectSvgBackdropFilterSupport(): boolean {
  if (typeof window === "undefined" || typeof CSS === "undefined") return false;
  const ua = window.navigator.userAgent;
  const isFirefox = ua.includes("Firefox");
  const isSafari =
    ua.includes("Safari") && !ua.includes("Chrome") && !ua.includes("Chromium");
  if (isFirefox || isSafari) return false;
  return (
    CSS.supports("backdrop-filter", "url(#liquid-glass)") ||
    CSS.supports("-webkit-backdrop-filter", "url(#liquid-glass)")
  );
}

let cachedSupport: boolean | null = null;

/**
 * True when the browser can render SVG-referenced backdrop filters.
 * Only Chromium does today; Safari and Firefox parse `backdrop-filter: url()`
 * without rendering it, so both get the frosted-blur fallback.
 */
export function supportsSvgBackdropFilter(): boolean {
  if (cachedSupport === null) {
    cachedSupport = detectSvgBackdropFilterSupport();
  }
  return cachedSupport;
}

const subscribeNever = () => () => {};
const getServerSupportSnapshot = () => false;

/** SSR-safe support flag: false on the server, real detection on the client. */
export function useSvgBackdropSupport(): boolean {
  return useSyncExternalStore(
    subscribeNever,
    supportsSvgBackdropFilter,
    getServerSupportSnapshot
  );
}

export interface LiquidGlassProps {
  /** Partial settings merged over DEFAULT_LIQUID_GLASS_SETTINGS. */
  settings?: Partial<LiquidGlassSettings>;
  /** Corner radius in px; oversized values produce a capsule. */
  radius?: number;
  /** Surface tint painted between the refraction and the highlights. */
  tint?: string;
  className?: string;
  style?: CSSProperties;
  contentClassName?: string;
  children?: ReactNode;
}

/**
 * Apple-style liquid glass surface. Refracts, magnifies, and chromatically
 * fringes whatever renders behind it via `backdrop-filter: url(#svg-filter)`:
 * a canvas-generated lens displacement map drives feDisplacementMap once per
 * RGB channel (edge dispersion), then feTurbulence wobbles the result and
 * feGaussianBlur frosts it. Distortion is strongest at the rim and fades to
 * neutral at the center, like looking through a water droplet.
 */
export function LiquidGlass({
  settings,
  radius = 28,
  tint = "rgba(255, 255, 255, 0.08)",
  className,
  style,
  contentClassName,
  children,
}: LiquidGlassProps) {
  const rawId = useId();
  const filterId = useMemo(
    () => `liquid-glass-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [rawId]
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const supported = useSvgBackdropSupport();

  const resolved = resolveLiquidGlassSettings(settings);
  const params = deriveFilterParams(resolved);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const width = Math.round(entry.contentRect.width);
      const height = Math.round(entry.contentRect.height);
      setSize((previous) =>
        previous.width === width && previous.height === height
          ? previous
          : { width, height }
      );
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Derived during render: the lens map is a pure function of geometry and
  // settings. Size stays 0x0 on the server, so this never runs during SSR.
  const mapUrl = useMemo(() => {
    if (!supported || size.width < 8 || size.height < 8) return null;
    if (typeof document === "undefined") return null;
    const geometry = resolveMapGeometry(size.width, size.height, radius);
    const pixels = buildDisplacementPixels({
      width: geometry.width,
      height: geometry.height,
      radius: geometry.radius,
      depth: resolved.depth,
      spread: resolved.spread,
    });
    const canvas = document.createElement("canvas");
    canvas.width = geometry.width;
    canvas.height = geometry.height;
    const context = canvas.getContext("2d");
    if (!context) return null;
    context.putImageData(
      new ImageData(pixels, geometry.width, geometry.height),
      0,
      0
    );
    return canvas.toDataURL("image/png");
  }, [supported, size.width, size.height, radius, resolved.depth, resolved.spread]);

  const active = supported && mapUrl !== null && size.width > 0;
  const fallbackBlur = Math.max(10, params.blurPx);

  const refractionStyle: CSSProperties = active
    ? { backdropFilter: `url(#${filterId})` }
    : {
        backdropFilter: `blur(${fallbackBlur}px) saturate(1.6)`,
        WebkitBackdropFilter: `blur(${fallbackBlur}px) saturate(1.6)`,
      };

  return (
    <div
      ref={containerRef}
      className={cn("relative isolate", className)}
      style={{
        borderRadius: radius,
        boxShadow:
          "0 20px 50px -18px rgba(15, 23, 42, 0.5), 0 4px 14px -8px rgba(15, 23, 42, 0.35)",
        ...style,
      }}
    >
      {active ? (
        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute h-0 w-0"
        >
          <defs>
            <filter
              id={filterId}
              x="0"
              y="0"
              width="100%"
              height="100%"
              colorInterpolationFilters="sRGB"
            >
              <feImage
                href={mapUrl}
                x="0"
                y="0"
                width={size.width}
                height={size.height}
                preserveAspectRatio="none"
                result="map"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale={params.scaleR}
                xChannelSelector="R"
                yChannelSelector="G"
                result="displacedR"
              />
              <feColorMatrix
                in="displacedR"
                type="matrix"
                values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="channelR"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale={params.scaleG}
                xChannelSelector="R"
                yChannelSelector="G"
                result="displacedG"
              />
              <feColorMatrix
                in="displacedG"
                type="matrix"
                values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="channelG"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale={params.scaleB}
                xChannelSelector="R"
                yChannelSelector="G"
                result="displacedB"
              />
              <feColorMatrix
                in="displacedB"
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                result="channelB"
              />
              <feBlend in="channelR" in2="channelG" mode="screen" result="channelRG" />
              <feBlend in="channelRG" in2="channelB" mode="screen" result="refracted" />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012 0.018"
                numOctaves="2"
                seed="92"
                result="ripple"
              />
              <feDisplacementMap
                in="refracted"
                in2="ripple"
                scale={params.wobblePx}
                xChannelSelector="R"
                yChannelSelector="G"
                result="liquid"
              />
              <feGaussianBlur in="liquid" stdDeviation={params.blurPx} result="frosted" />
              <feColorMatrix in="frosted" type="saturate" values={String(params.saturation)} />
            </filter>
          </defs>
        </svg>
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ borderRadius: radius, background: tint, ...refractionStyle }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: radius,
          opacity: params.specularOpacity,
          boxShadow:
            "inset 0 0 0 1px rgba(255, 255, 255, 0.22), inset 1.5px 1.5px 1px -0.5px rgba(255, 255, 255, 0.9), inset -1px -1px 1px -0.5px rgba(255, 255, 255, 0.45), inset 0 0 26px rgba(255, 255, 255, 0.14)",
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.05) 38%, rgba(255, 255, 255, 0) 62%, rgba(255, 255, 255, 0.16) 100%)",
        }}
      />

      <div className={cn("relative z-10", contentClassName)}>{children}</div>
    </div>
  );
}
