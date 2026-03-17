import React from "react";
import type { DirectoryData, NavbarItem } from "@juspay/blend-design-system";
import {
  House,
  SquaresFour,
  ChartLineUp,
  Rocket,
  Layout,
  Flask,
} from "@phosphor-icons/react";
import type { IconWeight } from "@phosphor-icons/react";
import { NAV_ITEMS, DUMMY_SIDEBAR_SECTIONS } from "@/lib/nav.config";

const SIDEBAR_SECTION_LABEL = "Main" as const;

const ICON_MAP: Record<string, typeof House> = {
  House,
  SquaresFour,
  ChartLineUp,
  Rocket,
  Layout,
  Flask,
};

function iconWeight(isActive: boolean): IconWeight {
  return isActive ? "fill" : "regular";
}

function resolveIcon(name: string, isActive: boolean): React.ReactElement {
  const Icon = ICON_MAP[name] ?? House;
  return <Icon size={18} weight={iconWeight(isActive)} />;
}

/**
 * Builds sidebar directory data from central nav config.
 * Single source of truth for nav structure (DRY).
 */
export function buildSidebarData(
  pathname: string,
  push: (path: string) => void
): DirectoryData[] {
  const items: NavbarItem[] = NAV_ITEMS.map(({ path, label, icon }) => {
    const isActive = pathname === path;
    return {
      label,
      leftSlot: resolveIcon(icon, isActive),
      href: path,
      isSelected: isActive,
      onClick: () => push(path),
    };
  });

  const mainSection: DirectoryData = {
    label: SIDEBAR_SECTION_LABEL,
    items,
    defaultOpen: true,
  };

  const dummySections: DirectoryData[] = DUMMY_SIDEBAR_SECTIONS.map(
    (section) => {
      const sectionItems: NavbarItem[] = section.items.map((item) => {
        const childItems =
          "children" in item && item.children && item.children.length > 0
            ? item.children.map((child) => ({
                label: child.label,
                href: child.href,
                isSelected: pathname === child.href,
                onClick: () => push(child.href),
              }))
            : undefined;

        const hasHref = "href" in item && typeof item.href === "string";

        const isActive =
          (hasHref ? pathname === item.href : false) ||
          (childItems ? childItems.some((c) => c.isSelected) : false);

        const base: NavbarItem = {
          label: item.label,
          leftSlot: resolveIcon(item.icon, isActive),
          href: hasHref ? (item as { href: string }).href : undefined,
          isSelected: isActive,
          onClick: hasHref ? () => push((item as { href: string }).href) : undefined,
        };

        if (childItems) {
          base.items = childItems;
        }

        return base;
      });

      return {
        label: section.label,
        items: sectionItems,
        defaultOpen: true,
      };
    }
  );

  return [mainSection, ...dummySections];
}
