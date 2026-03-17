import { describe, it, expect, vi } from "vitest";
import { buildSidebarData } from "@/lib/nav";
import { NAV_ITEMS, DUMMY_SIDEBAR_SECTIONS } from "@/lib/nav.config";

describe("buildSidebarData", () => {
  const push = vi.fn();

  it("returns main section plus all dummy sections", () => {
    const data = buildSidebarData("/", push);
    expect(data).toHaveLength(1 + DUMMY_SIDEBAR_SECTIONS.length);
  });

  it('first section is labeled "Main" with all NAV_ITEMS', () => {
    const data = buildSidebarData("/", push);
    const main = data[0];
    expect(main.label).toBe("Main");
    expect(main.items).toHaveLength(NAV_ITEMS.length);
  });

  it("marks the matching path as selected", () => {
    const data = buildSidebarData("/dashboard", push);
    const items = data[0].items ?? [];
    const dashboardItem = items.find((item) => item.href === "/dashboard");
    expect(dashboardItem?.isSelected).toBe(true);
  });

  it("does not mark unmatched paths as selected", () => {
    const data = buildSidebarData("/dashboard", push);
    const items = data[0].items ?? [];
    const homeItem = items.find((item) => item.href === "/");
    expect(homeItem?.isSelected).toBe(false);
  });

  it("calls push with the correct path when an item onClick fires", () => {
    const data = buildSidebarData("/", push);
    const items = data[0].items ?? [];
    const homeItem = items.find((item) => item.href === "/");
    homeItem?.onClick?.();
    expect(push).toHaveBeenCalledWith("/");
  });

  it("marks a nested child as selected when pathname matches", () => {
    const nestedPath = "/prototypes/workspace/tasks/my";
    const data = buildSidebarData(nestedPath, push);
    const workspaceSection = data[1]; // first dummy section is "Workspace"
    const sectionItems = workspaceSection?.items ?? [];
    const tasksItem = sectionItems.find((item) => item.label === "Tasks");
    expect(tasksItem?.isSelected).toBe(true);
    const myTask = tasksItem?.items?.find((c) => c.href === nestedPath);
    expect(myTask?.isSelected).toBe(true);
  });
});
