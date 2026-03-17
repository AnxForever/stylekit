/**
 * UTM Provider
 *
 * Client component that captures UTM parameters on mount.
 * Wraps children without adding extra DOM nodes.
 */

"use client";

import { useEffect } from "react";
import { captureUtmParams } from "@/lib/analytics/utm";

interface UtmProviderProps {
  children: React.ReactNode;
}

export function UtmProvider({ children }: UtmProviderProps) {
  useEffect(() => {
    captureUtmParams();
  }, []);

  return <>{children}</>;
}
