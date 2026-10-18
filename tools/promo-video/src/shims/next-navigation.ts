/** next/navigation shim - see next-link.tsx for why. */
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
export default {};
