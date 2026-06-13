import { retiredEndpoint } from "@/lib/api/retired";

export async function POST() {
  return retiredEndpoint({
    feature: "Style pipeline",
    replacement: "/styles",
  });
}
