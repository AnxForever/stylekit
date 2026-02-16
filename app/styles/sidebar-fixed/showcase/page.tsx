import dynamic from "next/dynamic";

export const metadata = {
  title: "Fixed Sidebar Showcase - StyleKit",
  description: "Live demonstration of Fixed Sidebar layout for dashboard and application interfaces.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function SidebarFixedShowcasePage() {
  return <ShowcaseContent />;
}
