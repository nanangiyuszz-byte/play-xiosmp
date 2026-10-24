import { createFileRoute } from "@tanstack/react-router";
import bg from "@/assets/bg-sky.jpg";
import { Header } from "@/components/xio/Header";
import { Hero } from "@/components/xio/Hero";
import { Status } from "@/components/xio/Status";
import { Rules } from "@/components/xio/Rules";
import { Community } from "@/components/xio/Community";
import { SERVER, SERVER_ADDRESS } from "@/components/xio/config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XioSMP — Survival SMP Terbaik & Paling Seru" },
      { name: "description", content: `Gabung XioSMP di ${SERVER_ADDRESS}. Status server live, pemain online, aturan, dan bansos tiap Jumat.` },
      { property: "og:title", content: "XioSMP — Survival SMP Terbaik & Paling Seru" },
      { property: "og:description", content: `Main bareng di ${SERVER_ADDRESS}. Cek status live dan gabung komunitas!` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div aria-hidden className="fixed inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }} />
      <div aria-hidden className="fixed inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/75 to-background" />
      <Header />
      <main>
        <Hero />
        <Status />
        <Rules />
        <Community />
      </main>
      <footer className="border-t border-border/50 bg-background/80 px-4 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SERVER.name} · {SERVER_ADDRESS} · Tidak berafiliasi dengan Mojang/Microsoft.
      </footer>
    </div>
  );
}
