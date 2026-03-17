"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
      <h2 className="text-lg font-semibold text-red-600">Something went wrong</h2>
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-300"
      >
        Try again
      </button>
    </div>
  );
}
