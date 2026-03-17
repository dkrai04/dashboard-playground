/**
 * Shared layout constants (DRY).
 * Used by shell and other layout components.
 */
export const SHELL_LAYOUT = {
  outer: {
    minHeight: "100vh",
    height: "100%",
    display: "flex",
    flexDirection: "column" as const,
  },
  inner: {
    flex: 1,
    minHeight: 0,
    display: "flex" as const,
  },
} as const;
