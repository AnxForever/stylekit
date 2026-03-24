import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Fixed Sidebar Showcase - StyleKit",
  description: "Live demonstration of Fixed Sidebar layout for dashboard and application interfaces.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function SidebarFixedShowcasePage() {
  return <ShowcaseContent />;
}
