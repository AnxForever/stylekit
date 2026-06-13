import { retiredEndpoint } from "@/lib/api/retired";

export async function POST() {
  return retiredEndpoint({
    feature: "AI style generation telemetry",
    replacement: "/styles",
  });
}
