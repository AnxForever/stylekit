import { retiredEndpoint } from "@/lib/api/retired";

export async function POST() {
  return retiredEndpoint({
    feature: "Theme import",
    replacement: "/styles",
  });
}
