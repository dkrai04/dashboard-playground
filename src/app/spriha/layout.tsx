import { BlendShell } from "../(dashboard)/BlendShell";
import type { LayoutProps } from "@/types";

export default function SprihaLayout({ children }: LayoutProps) {
  return <BlendShell>{children}</BlendShell>;
}
