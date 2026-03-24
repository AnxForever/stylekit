import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Dashboard Layout Showcase - StyleKit",
  description: "Live demonstration of Dashboard Layout with data panels, KPI cards, and analytics views.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function DashboardLayoutShowcasePage() {
  return <ShowcaseContent />;
}
