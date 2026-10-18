/**
 * Next.js shims for rendering real app pages inside Remotion.
 *
 * The feature pages import next/link, next/navigation and next/image, which do
 * not exist in a video bundle. Rather than fork the app components, we alias
 * those modules here so the components run unmodified - the film keeps showing
 * the product's own code rather than a look-alike.
 */
import React from "react";

const isFile = (href: string) => /\.(png|jpe?g|webp|avif|svg|gif)$/i.test(href);

// Anchor-only props (`href`, `target`, `rel`, ...) must not reach the `<img>`
// branch, so the two are typed separately rather than spread from one bag.
type LinkProps = Omit<React.ComponentProps<"a">, "href"> & {
  href: string | { pathname?: string };
  children?: React.ReactNode;
};

export const Link: React.FC<LinkProps> = ({ href, children, ...rest }) => {
  const target = typeof href === "string" ? href : "#";
  if (!isFile(target)) {
    return (
      <a href={target} {...rest}>
        {children}
      </a>
    );
  }
  return <img src={target} alt="" className={rest.className} style={rest.style} />;
};

export default Link;

/** Subset of `next/image` props the film's showcased pages actually pass. */
type ImageProps = React.ComponentProps<"img"> & {
  src: string | { src: string };
  fill?: boolean;
};

export const Image: React.FC<ImageProps> = ({ src, alt, width, height, fill, style, className }) => (
  <img
    src={typeof src === "string" ? src : src.src}
    alt={alt ?? ""}
    width={width}
    height={height}
    className={className}
    style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style } : style}
  />
);

export const usePathname = () => "/";
export const useRouter = () => ({
  push: () => {},
  replace: () => {},
  back: () => {},
  forward: () => {},
  refresh: () => {},
  prefetch: () => {},
});
export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({ locale: "zh" });
export const redirect = () => {};
export const notFound = () => {};
