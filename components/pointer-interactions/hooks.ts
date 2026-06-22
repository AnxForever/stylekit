"use client";

import { useEffect, useState } from "react";

function readMediaQuery(query: string, fallback = false) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return fallback;
  }

  return window.matchMedia(query).matches;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    readMediaQuery("(prefers-reduced-motion: reduce)")
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function usePointerFine() {
  const [fine, setFine] = useState(() =>
    readMediaQuery("(hover: hover) and (pointer: fine)")
  );

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return fine;
}

export function usePointerInteractionEnabled(disabled = false) {
  const fine = usePointerFine();
  const reduced = useReducedMotion();

  return !disabled && fine && !reduced;
}
