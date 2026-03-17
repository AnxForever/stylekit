import dynamic from "next/dynamic";

export const metadata = {
  title: "Voice Recorder Showcase - StyleKit",
  description:
    "Live demonstration of Voice Recorder animation style with CRT terminal effects and waveform animations.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function VoiceRecorderShowcasePage() {
  return <ShowcaseContent />;
}
