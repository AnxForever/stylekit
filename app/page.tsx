import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HomeContent } from "@/components/home/home-content";
import { getAllStylesMeta } from "@/lib/styles/meta";

export default function Home() {
  const styles = getAllStylesMeta();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HomeContent styles={styles} />
      </main>
      <Footer />
    </div>
  );
}
