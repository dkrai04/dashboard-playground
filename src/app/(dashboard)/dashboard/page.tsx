import { NAV_ITEMS } from "@/lib/nav.config";
import { PageContainer } from "@/components";

const DASHBOARD_PATH = "/dashboard";

export default function DashboardPage() {
  const item = NAV_ITEMS.find((entry) => entry.path === DASHBOARD_PATH);
  const title = item?.label ?? "Dashboard";

  return (
    <PageContainer>
      <main className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-600">
          Start building your {title.toLowerCase()} page here.
        </p>
      </main>
    </PageContainer>
  );
}
