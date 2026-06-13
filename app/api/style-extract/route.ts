import { retiredEndpoint } from "@/lib/api/retired";

export async function POST() {
  return retiredEndpoint({
    feature: "Remote style extraction",
    replacement: "/styles",
  });
}
