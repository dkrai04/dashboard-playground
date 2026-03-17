import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/**
 * Loads a component with SSR disabled (client-only).
 * Single place for the dynamic + ssr:false pattern (DRY).
 */
export function loadClientOnly<K extends string, P = object>(
  loader: () => Promise<Record<K, ComponentType<P>>>,
  exportName: K
): ComponentType<P> {
  return dynamic(
    () => loader().then((m) => m[exportName] as ComponentType<P>),
    { ssr: false }
  ) as ComponentType<P>;
}
