import { useState } from "react";
import { ChevronDown, Hammer, EyeOff, HeartHandshake, Swords, ShieldAlert, Bug } from "lucide-react";

const rules = [
  { icon: Hammer, title: "Dilarang Griefing", body: "Jangan merusak, mencuri, atau mengubah bangunan dan claim milik pemain lain tanpa izin." },
  { icon: EyeOff, title: "Dilarang Cheating / X-Ray", body: "Hack client, X-Ray, auto-clicker, dan mod curang lainnya dilarang keras. Pelanggaran = ban." },
  { icon: HeartHandshake, title: "Jaga Sopan Santun", body: "Hormati semua pemain dan staff. Tidak ada SARA, toxic, spam, atau pelecehan di chat." },
  { icon: Swords, title: "PvP Sesuai Aturan", body: "PvP hanya di area/mode yang diizinkan. Dilarang spawn-kill atau trap pemain baru." },
  { icon: Bug, title: "Laporkan Bug", body: "Menemukan bug atau dupe? Laporkan ke staff, jangan dimanfaatkan." },
  { icon: ShieldAlert, title: "Keputusan Staff Final", body: "Ikuti arahan staff. Banding bisa diajukan lewat komunitas WhatsApp." },
];

export function Rules() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="rules" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-12">
      <h2 className="text-center text-2xl sm:text-3xl">Aturan <span className="text-neon">Server</span></h2>
      <div className="mt-6 space-y-3">
        {rules.map((r, i) => {
          const isOpen = open === i;
          return (
            <div key={r.title} className={`panel-stone overflow-hidden transition ${isOpen ? "shadow-[var(--glow-primary)]" : ""}`}>
              <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center gap-3 px-4 py-3 text-left">
                <span className="btn-primary grid h-9 w-9 shrink-0 place-items-center rounded-md"><r.icon className="h-4 w-4" /></span>
                <span className="flex-1 font-display text-sm sm:text-base">{i + 1}. {r.title}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-primary-glow transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && <p className="animate-in fade-in slide-in-from-top-1 px-4 pb-4 pl-16 text-sm text-muted-foreground">{r.body}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
