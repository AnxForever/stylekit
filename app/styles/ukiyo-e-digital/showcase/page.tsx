import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Ukiyo-e Digital Showcase - StyleKit",
  description: "Live demonstration of Ukiyo-e Digital design style with Japanese woodblock print aesthetics, wave patterns, and flat perspective.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function UkiyoEDigitalShowcasePage() {
  return <ShowcaseContent />;
}
