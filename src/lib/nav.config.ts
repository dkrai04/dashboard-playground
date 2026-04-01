/**
 * Central nav config: one entry per dashboard module.
 * Add a new module = add route (app/<module>/page.tsx) + add entry here.
 */
export const NAV_ITEMS = [
  { path: "/", label: "Home", icon: "House" },
  { path: "/dashboard", label: "Dashboard", icon: "SquaresFour" },
  { path: "/analytics", label: "Analytics", icon: "ChartLineUp" },
  { path: "/spriha/infra-scale-up", label: "Spriha", icon: "Layout" },
] as const;

export type NavPath = (typeof NAV_ITEMS)[number]["path"];

/**
 * Dummy sidebar modules definition:
 * - combination of label groups
 * - parent items with and without sub-items
 * - all parent items include an icon
 */
export const DUMMY_SIDEBAR_SECTIONS = [
  {
    label: "Workspace",
    items: [
      {
        key: "overview",
        label: "Overview",
        icon: "Layout",
        href: "/prototypes/workspace/overview",
      },
      {
        key: "activity",
        label: "Activity",
        icon: "Rocket",
        href: "/prototypes/workspace/activity",
      },
      {
        key: "tasks",
        label: "Tasks",
        icon: "Flask",
        children: [
          { key: "my-tasks", label: "My tasks", href: "/prototypes/workspace/tasks/my" },
          { key: "all-tasks", label: "All tasks", href: "/prototypes/workspace/tasks/all" },
          { key: "backlog", label: "Backlog", href: "/prototypes/workspace/tasks/backlog" },
        ],
      },
      {
        key: "projects",
        label: "Projects",
        icon: "Layout",
        children: [
          { key: "active-projects", label: "Active", href: "/prototypes/workspace/projects/active" },
          { key: "archived-projects", label: "Archived", href: "/prototypes/workspace/projects/archived" },
        ],
      },
    ],
  },
  {
    label: "Analytics & Reports",
    items: [
      {
        key: "analytics-home",
        label: "Analytics Home",
        icon: "Rocket",
        href: "/prototypes/analytics/home",
      },
      {
        key: "reports",
        label: "Reports",
        icon: "Layout",
        children: [
          {
            key: "revenue",
            label: "Revenue",
            href: "/prototypes/analytics/reports/revenue",
          },
          {
            key: "retention",
            label: "Retention",
            href: "/prototypes/analytics/reports/retention",
          },
          {
            key: "cohorts",
            label: "Cohorts",
            href: "/prototypes/analytics/reports/cohorts",
          },
          {
            key: "funnels",
            label: "Funnels",
            href: "/prototypes/analytics/reports/funnels",
          },
        ],
      },
      {
        key: "exports",
        label: "Exports",
        icon: "Flask",
        href: "/prototypes/analytics/exports",
      },
    ],
  },
  {
    label: "Customers",
    items: [
      {
        key: "customers",
        label: "Customers",
        icon: "Layout",
        href: "/prototypes/customers/list",
      },
      {
        key: "segments",
        label: "Segments",
        icon: "Rocket",
        href: "/prototypes/customers/segments",
      },
      {
        key: "support",
        label: "Support",
        icon: "Flask",
        children: [
          { key: "tickets", label: "Tickets", href: "/prototypes/customers/support/tickets" },
          { key: "sla", label: "SLA", href: "/prototypes/customers/support/sla" },
          { key: "macros", label: "Macros", href: "/prototypes/customers/support/macros" },
        ],
      },
    ],
  },
  {
    label: "Billing",
    items: [
      {
        key: "invoices",
        label: "Invoices",
        icon: "Layout",
        href: "/prototypes/billing/invoices",
      },
      {
        key: "subscriptions",
        label: "Subscriptions",
        icon: "Rocket",
        href: "/prototypes/billing/subscriptions",
      },
      {
        key: "plans",
        label: "Plans",
        icon: "Flask",
        href: "/prototypes/billing/plans",
      },
      {
        key: "usage",
        label: "Usage",
        icon: "Layout",
        href: "/prototypes/billing/usage",
      },
    ],
  },
  {
    label: "Settings",
    items: [
      {
        key: "org-settings",
        label: "Organization",
        icon: "Layout",
        children: [
          { key: "org-general", label: "General", href: "/prototypes/settings/org/general" },
          { key: "org-members", label: "Members", href: "/prototypes/settings/org/members" },
          { key: "org-roles", label: "Roles & permissions", href: "/prototypes/settings/org/roles" },
        ],
      },
      {
        key: "security",
        label: "Security",
        icon: "Rocket",
        children: [
          { key: "auth", label: "Authentication", href: "/prototypes/settings/security/auth" },
          { key: "api-keys", label: "API Keys", href: "/prototypes/settings/security/api-keys" },
          { key: "audit", label: "Audit log", href: "/prototypes/settings/security/audit" },
        ],
      },
      {
        key: "integrations",
        label: "Integrations",
        icon: "Flask",
        href: "/prototypes/settings/integrations",
      },
    ],
  },
] as const;

