import { BlendShell } from "./BlendShell";
import type { LayoutProps } from "@/types";

export default function DashboardLayout({ children }: LayoutProps) {
  return <BlendShell>{children}</BlendShell>;
}
