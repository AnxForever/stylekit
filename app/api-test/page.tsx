"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Check, X, Loader2 } from "lucide-react";

interface EndpointTest {
  name: string;
  url: string;
  method: "GET" | "POST";
  description: string;
  body?: any;
}

const endpoints: EndpointTest[] = [
  {
    name: "llms.txt",
    url: "/llms.txt",
    method: "GET",
    description: "AI-friendly index file",
  },
  {
    name: "llms-full.txt",
    url: "/llms-full.txt",
    method: "GET",
    description: "Complete documentation",
  },
  {
    name: "List Styles",
    url: "/api/styles",
    method: "GET",
    description: "Get all available styles",
  },
  {
    name: "Neo-Brutalist Style",
    url: "/api/styles/neo-brutalist",
    method: "GET",
    description: "Get complete style pack",
  },
  {
    name: "Neo-Brutalist Tokens",
    url: "/api/styles/neo-brutalist/tokens",
    method: "GET",
    description: "Get design tokens only",
  },
  {
    name: "Neo-Brutalist Recipes",
    url: "/api/styles/neo-brutalist/recipes",
    method: "GET",
    description: "Get component recipes",
  },
  {
    name: "List Archetypes",
    url: "/api/archetypes",
    method: "GET",
    description: "Get all layout archetypes",
  },
  {
    name: "Landing Archetype",
    url: "/api/archetypes/landing-hero-centered",
    method: "GET",
    description: "Get specific archetype",
  },
  {
    name: "UI Plan Schema",
    url: "/api/ui-plan/schema",
    method: "GET",
    description: "Get JSON Schema for UI Plan",
  },
];

export default function ApiTestPage() {
  const [results, setResults] = useState<Record<string, { status: "pending" | "success" | "error"; data?: any; error?: string }>>({});
  const [testing, setTesting] = useState(false);

  const testEndpoint = async (endpoint: EndpointTest) => {
    setResults((prev) => ({ ...prev, [endpoint.name]: { status: "pending" } }));

    try {
      const response = await fetch(endpoint.url, {
        method: endpoint.method,
        headers: endpoint.body ? { "Content-Type": "application/json" } : {},
        body: endpoint.body ? JSON.stringify(endpoint.body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType?.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = text.substring(0, 500) + (text.length > 500 ? "..." : "");
      }

      setResults((prev) => ({
        ...prev,
        [endpoint.name]: { status: "success", data },
      }));
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        [endpoint.name]: { status: "error", error: (error as Error).message },
      }));
    }
  };

  const testAll = async () => {
    setTesting(true);
    for (const endpoint of endpoints) {
      await testEndpoint(endpoint);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    setTesting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              Phase 5A
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">
              API Endpoint Tests
            </h1>
            <p className="text-lg text-muted max-w-2xl mb-8">
              Test all AI-friendly endpoints to verify Phase 5A implementation.
            </p>

            <button
              onClick={testAll}
              disabled={testing}
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors disabled:opacity-50"
            >
              {testing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Testing...
                </>
              ) : (
                "Test All Endpoints"
              )}
            </button>
          </div>
        </section>

        <section>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <div className="space-y-4">
              {endpoints.map((endpoint) => {
                const result = results[endpoint.name];
                return (
                  <div
                    key={endpoint.name}
                    className="border border-border p-4 hover:border-foreground transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{endpoint.name}</h3>
                          <span className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800">
                            {endpoint.method}
                          </span>
                          {result && (
                            <span className="flex items-center gap-1">
                              {result.status === "pending" && (
                                <Loader2 className="w-4 h-4 animate-spin text-muted" />
                              )}
                              {result.status === "success" && (
                                <Check className="w-4 h-4 text-green-600" />
                              )}
                              {result.status === "error" && (
                                <X className="w-4 h-4 text-red-600" />
                              )}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted mb-2">
                          {endpoint.description}
                        </p>
                        <code className="text-xs bg-zinc-100 dark:bg-zinc-900 px-2 py-1">
                          {endpoint.url}
                        </code>

                        {result && result.status === "success" && (
                          <div className="mt-3 p-3 bg-zinc-50 dark:bg-zinc-900 text-xs">
                            <p className="text-green-600 mb-2 font-medium">
                              Success
                            </p>
                            <pre className="overflow-x-auto whitespace-pre-wrap">
                              {typeof result.data === "string"
                                ? result.data
                                : JSON.stringify(result.data, null, 2).substring(0, 500)}
                            </pre>
                          </div>
                        )}

                        {result && result.status === "error" && (
                          <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/20 text-xs">
                            <p className="text-red-600 font-medium">
                              Error: {result.error}
                            </p>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => testEndpoint(endpoint)}
                        disabled={testing}
                        className="px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors disabled:opacity-50"
                      >
                        Test
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 p-6 border border-dashed border-border">
              <h3 className="font-medium mb-4">Usage Examples</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-muted mb-2">Fetch all styles:</p>
                  <code className="block bg-zinc-100 dark:bg-zinc-900 p-3">
                    fetch(&apos;/api/styles&apos;).then(r =&gt; r.json())
                  </code>
                </div>
                <div>
                  <p className="text-muted mb-2">Get Neo-Brutalist tokens:</p>
                  <code className="block bg-zinc-100 dark:bg-zinc-900 p-3">
                    fetch(&apos;/api/styles/neo-brutalist/tokens&apos;).then(r =&gt; r.json())
                  </code>
                </div>
                <div>
                  <p className="text-muted mb-2">Validate UI Plan:</p>
                  <code className="block bg-zinc-100 dark:bg-zinc-900 p-3">
                    fetch(&apos;/api/ui-plan/validate&apos;, &#123;
                    <br />
                    &nbsp;&nbsp;method: &apos;POST&apos;,
                    <br />
                    &nbsp;&nbsp;headers: &#123; &apos;Content-Type&apos;: &apos;application/json&apos; &#125;,
                    <br />
                    &nbsp;&nbsp;body: JSON.stringify(uiPlan)
                    <br />
                    &#125;)
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
