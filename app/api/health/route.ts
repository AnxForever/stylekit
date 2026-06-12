import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
};

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "stylekit",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      nodeVersion: process.version,
      memory: process.memoryUsage(),
    },
    { headers: NO_STORE_HEADERS }
  );
}

export function HEAD() {
  return new Response(null, {
    status: 204,
    headers: NO_STORE_HEADERS,
  });
}
