import dynamic from "next/dynamic";

export const metadata = {
  title: "Dashboard Layout Showcase - StyleKit",
  description: "Live demonstration of Dashboard Layout with data panels, KPI cards, and analytics views.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function DashboardLayoutShowcasePage() {
  return <ShowcaseContent />;
}
