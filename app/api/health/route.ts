import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
};

export function GET() {
  // Public surface only: runtime details (node version, memory, uptime) are
  // reconnaissance fodder and were removed after the 2026-08-16 security
  // audit. PM2/ssh remain the operational channels for that data.
  return NextResponse.json(
    {
      status: "ok",
      service: "stylekit",
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
