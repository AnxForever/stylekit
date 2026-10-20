// Loaded only by the workflow evaluator's CLI/MCP child processes. The test
// needs the packages' documented bundled fallback, but must never call the
// published StyleKit site or any other remote host.
const nativeFetch = globalThis.fetch;

globalThis.fetch = async function guardedFetch(input, init) {
  let target;
  try {
    const address = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    target = new URL(address);
  } catch {
    throw new Error("StyleKit workflow evaluation blocked a non-absolute network request.");
  }

  if (!["127.0.0.1", "localhost", "[::1]"].includes(target.hostname)) {
    throw new Error(`StyleKit workflow evaluation blocked remote fetch: ${target.origin}`);
  }

  return nativeFetch(input, init);
};
