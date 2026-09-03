import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LocalizedLink } from "@/components/i18n/localized-link";

/**
 * Route-segment 404 for community styles.
 *
 * Without this boundary, `notFound()` bubbles to the root shell and renders a
 * generic page. Declaring it here gives community styles their own 404 UI with
 * a route back to the catalog.
 *
 * Known limitation: the response status is still 200, not 404. The root
 * `app/loading.tsx` streaming shell commits the status before this boundary
 * renders, so no route-level code can correct it (the same soft-404 mechanism
 * documented for the localized detail routes). Accepted here because
 * `/community` is noindex — nothing in this tree is submitted for indexing,
 * so the wrong status has no crawl consequence. Revisit if community styles
 * ever become indexable.
 */
export default function CommunityStyleNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            404
          </p>
          <h1 className="mt-4 font-serif text-2xl sm:text-3xl">
            Community style not found
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            This style may have been withdrawn, or it was never approved.
          </p>
          <LocalizedLink
            href="/community"
            className="mt-8 inline-flex h-10 items-center rounded-md border border-foreground px-4 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
          >
            Browse community styles
          </LocalizedLink>
        </div>
      </main>
      <Footer />
    </div>
  );
}
