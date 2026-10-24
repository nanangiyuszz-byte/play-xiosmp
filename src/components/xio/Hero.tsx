import { useEffect, useState } from "react";
import { Copy, Gift, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/xiosmp-logo.jpg.asset.json";
import { SERVER, SERVER_ADDRESS } from "./config";
import { nextBansos, splitMs } from "@/lib/countdown";

function IpBox() {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_ADDRESS);
      toast.success("IP & Port tersalin!", { description: SERVER_ADDRESS });
    } catch {
      toast.error("Gagal menyalin, salin manual: " + SERVER_ADDRESS);
    }
  };
  return (
    <button onClick={copy} className="btn-3d panel-stone group w-full max-w-md flex-col px-6 py-4 hover:shadow-[var(--glow-primary)]">
      <span className="text-[10px] tracking-[0.3em] text-emerald sm:text-xs">CLICK TO COPY IP & PORT</span>
      <span className="mt-1 flex items-center gap-3 break-all text-lg text-neon sm:text-2xl">
        {SERVER.ip}
        <Copy className="h-5 w-5 shrink-0 text-cyan transition-transform group-hover:scale-110" />
      </span>
      <span className="mt-1 font-sans text-sm text-muted-foreground">Port: <b className="text-cyan">{SERVER.port}</b> · Java & Bedrock</span>
    </button>
  );
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const parts = now === null ? null : splitMs(nextBansos(new Date(now)).getTime() - now);
  const cells: [string, number | undefined][] = [
    ["Hari", parts?.d], ["Jam", parts?.h], ["Menit", parts?.m], ["Detik", parts?.s],
  ];
  return (
    <div className="panel-stone w-full max-w-md p-4">
      <div className="flex items-center justify-center gap-2 font-display text-sm text-gold">
        <Gift className="h-4 w-4" /> BANSOS JUMAT 19:00 WIB
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {cells.map(([label, v]) => (
          <div key={label} className="rounded-md bg-background/70 py-2 text-center shadow-[inset_0_2px_6px_oklch(0_0_0/0.6)]">
            <div className="font-display text-2xl tabular-nums text-neon sm:text-3xl">
              {v === undefined ? "--" : String(v).padStart(2, "0")}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 pt-24 pb-16 text-center">
      <img src={logo.url} alt="XioSMP logo" width={1254} height={1254}
        className="logo-glow animate-floaty w-44 sm:w-60 md:w-72" />
      <h1 className="mt-4 max-w-3xl text-2xl leading-tight sm:text-4xl md:text-5xl">
        Petualangan Survival <span className="text-neon">SMP Terbaik</span> &amp; <span className="text-emerald">Paling Seru!</span>
      </h1>
      <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
        Jelajahi pulau melayang, bangun kerajaanmu, dan bertualang bareng komunitas yang asik. Ekonomi seimbang, event mingguan, dan bansos tiap Jumat!
      </p>
      <div className="mt-8 flex w-full flex-col items-center gap-4">
        <IpBox />
        <Countdown />
        <a href={SERVER.whatsapp} target="_blank" rel="noreferrer" className="btn-3d btn-emerald px-6 py-3 text-sm">
          <MessageCircle className="h-4 w-4" /> Gabung Komunitas WhatsApp
        </a>
      </div>
    </section>
  );
}
