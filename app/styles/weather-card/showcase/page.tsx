import dynamic from "next/dynamic";

export const metadata = {
  title: "Weather Card Showcase - StyleKit",
  description:
    "Live demonstration of Weather Card animation style with atmospheric effects and glassmorphic overlays.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function WeatherCardShowcasePage() {
  return <ShowcaseContent />;
}
