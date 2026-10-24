import { useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import logo from "@/assets/xiosmp-logo.jpg.asset.json";
import { SERVER } from "./config";

const links = [
  ["Home", "#home"], ["Status", "#status"], ["Players", "#players"], ["Rules", "#rules"], ["Feedback", "#feedback"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2 md:flex md:justify-between">
        <a href="#home" className="flex min-w-0 items-center gap-2">
          <img src={logo.url} alt="XioSMP" width={48} height={48} className="logo-glow h-12 w-12 shrink-0 object-cover" />
          <span className="truncate font-display text-lg text-neon">XioSMP</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-primary/15 hover:text-primary-glow">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={SERVER.whatsapp} target="_blank" rel="noreferrer" className="btn-3d btn-emerald hidden px-4 py-2 text-xs sm:inline-flex">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="btn-3d btn-primary p-2 md:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border/50 px-4 py-3 md:hidden">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-primary/15">{l}</a>
          ))}
          <a href={SERVER.whatsapp} target="_blank" rel="noreferrer" className="btn-3d btn-emerald mt-2 px-4 py-2 text-xs">
            <MessageCircle className="h-4 w-4" /> Gabung WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}
