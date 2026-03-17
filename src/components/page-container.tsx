import type { ReactNode } from "react";

const DEFAULT_CLASS = "p-6";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Shared wrapper for dashboard module content.
 * Keeps padding and layout consistent (DRY).
 */
export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={className ? `${DEFAULT_CLASS} ${className}` : DEFAULT_CLASS}>
      {children}
    </div>
  );
}
