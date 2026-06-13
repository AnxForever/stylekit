import { NextResponse } from "next/server";

interface RetiredEndpointOptions {
  feature: string;
  replacement?: string;
}

export function retiredEndpoint({ feature, replacement }: RetiredEndpointOptions) {
  return NextResponse.json(
    {
      code: "ENDPOINT_RETIRED",
      error: `${feature} has been retired.`,
      replacement,
    },
    {
      status: 410,
      headers: {
        "cache-control": "no-store",
      },
    }
  );
}
