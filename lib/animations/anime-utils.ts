export type AnimeModule = typeof import("animejs");

export type AnimeAnimation = {
  cancel(): unknown;
  revert?(): unknown;
};

let animePromise: Promise<AnimeModule> | null = null;

export function loadAnime() {
  animePromise ??= import("animejs");
  return animePromise;
}

export function prefersReducedMotion() {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
