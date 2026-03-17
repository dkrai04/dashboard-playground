"use client";

import { usePathname, useRouter } from "next/navigation";
import { Sidebar, ThemeProvider } from "@juspay/blend-design-system";
import { buildSidebarData } from "@/lib/nav";
import { SHELL_LAYOUT } from "@/lib/constants";
import type { LayoutProps } from "@/types";

function TopbarContent() {
  return <>Dashboard</>;
}

export function BlendShellInner({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarData = buildSidebarData(pathname, router.push);

  return (
    <div style={SHELL_LAYOUT.outer}>
      <ThemeProvider>
        <div className="sidebar-layout-root" style={SHELL_LAYOUT.inner}>
          <Sidebar
            data={sidebarData}
            topbar={<TopbarContent />}
            defaultIsExpanded
            defaultActiveItem={pathname || null}
          >
            {children}
          </Sidebar>
        </div>
      </ThemeProvider>
    </div>
  );
}
