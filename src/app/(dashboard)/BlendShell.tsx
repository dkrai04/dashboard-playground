"use client";

import { loadClientOnly } from "@/lib/dynamic-client";
import type { LayoutProps } from "@/types";

const BlendShellInner = loadClientOnly(
  () => import("./BlendShellInner"),
  "BlendShellInner"
);

export function BlendShell({ children }: LayoutProps) {
  return <BlendShellInner>{children}</BlendShellInner>;
}
