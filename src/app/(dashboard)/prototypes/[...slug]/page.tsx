import { DUMMY_SIDEBAR_SECTIONS } from "@/lib/nav.config";
import { PageContainer } from "@/components";

type PrototypesCatchAllPageProps = {
  params: Promise<{ slug?: string[] }>;
};

function getPageNameFromSidebar(path: string): string {
  for (const section of DUMMY_SIDEBAR_SECTIONS) {
    for (const item of section.items) {
      if ("href" in item && item.href === path) {
        return item.label;
      }
      if ("children" in item && item.children) {
        const child = item.children.find(
          (c) => "href" in c && c.href === path
        );
        if (child) {
          return child.label;
        }
      }
    }
  }
  return "Prototypes";
}

export default async function PrototypesCatchAllPage({
  params,
}: PrototypesCatchAllPageProps) {
  const { slug = [] } = await params;
  const path = `/${["prototypes", ...slug].join("/")}`;
  const pageName = getPageNameFromSidebar(path);

  return (
    <PageContainer>
      <main className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">{pageName}</h1>
        <p className="text-sm text-gray-600">
          This is a prototype route. Replace this with real module content.
        </p>
      </main>
    </PageContainer>
  );
}

