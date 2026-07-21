#!/usr/bin/env node

const baseUrl = process.env.ANALYTICS_BASE_URL ?? "https://www.stylekit.top";
const password = process.env.ADMIN_PASSWORD;

if (!password) {
  console.error("ADMIN_PASSWORD is required.");
  process.exit(2);
}

const cookie = await login();
const endpoints = [
  "/api/admin/analytics/overview?range=7d",
  "/api/admin/analytics/breakdown?range=7d&dimension=path&limit=10",
  "/api/admin/analytics/breakdown?range=7d&dimension=referrer&limit=10",
  "/api/admin/analytics/registrations?range=7d",
  "/api/admin/analytics/content?range=7d",
];

for (const endpoint of endpoints) {
  await measure(endpoint, cookie, "cold");
  await measure(endpoint, cookie, "warm");
}

async function login() {
  const response = await fetch(`${baseUrl}/api/admin/auth`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ password }),
    redirect: "manual",
  });
  if (!response.ok) {
    throw new Error(`Admin login failed (${response.status}).`);
  }
  const setCookie = response.headers.get("set-cookie");
  if (!setCookie) throw new Error("Admin login did not return a session cookie.");
  return setCookie.split(";", 1)[0];
}

async function measure(endpoint, cookie, phase) {
  const startedAt = performance.now();
  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: { cookie },
    cache: "no-store",
  });
  const durationMs = Math.round(performance.now() - startedAt);
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`${endpoint} failed (${response.status}): ${body.slice(0, 300)}`);
  }
  JSON.parse(body);
  console.log(
    JSON.stringify({
      endpoint,
      phase,
      status: response.status,
      durationMs,
      cache: response.headers.get("x-stylekit-analytics-cache"),
      serverTiming: response.headers.get("server-timing"),
      bytes: Buffer.byteLength(body),
    })
  );
}
