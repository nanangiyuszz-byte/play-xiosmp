import { useQuery } from "@tanstack/react-query";
import { Loader2, Server, Users, UserCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SERVER_ADDRESS } from "./config";
import { cleanName, fetchServerStatus } from "@/lib/mcstatus";

export function Status() {
  const status = useQuery({
    queryKey: ["mc-status"],
    queryFn: () => fetchServerStatus(SERVER_ADDRESS),
    refetchInterval: 10_000,
    refetchIntervalInBackground: true,
  });
  const registered = useQuery({
    queryKey: ["registered-count"],
    queryFn: async () => {
      const { count, error } = await supabase.from("registered_players").select("*", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
    refetchInterval: 60_000,
  });

  const d = status.data;
  const online = d?.online ?? false;
  const list = d?.players ?? [];
  const count = d?.playersOnline ?? 0;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div id="status" className="grid scroll-mt-24 gap-4 sm:grid-cols-3">
        <Stat icon={<Server className="h-5 w-5" />} label="Status Server">
          {status.isPending ? <Loader2 className="h-6 w-6 animate-spin" /> : (
            <span className={`flex items-center gap-2 ${online ? "text-emerald" : "text-destructive"}`}>
              <span className={`h-3 w-3 rounded-full animate-pulse-dot ${online ? "bg-emerald" : "bg-destructive"}`} />
              {online ? "ONLINE" : "OFFLINE"}
            </span>
          )}
          {d?.version && <span className="block font-sans text-xs text-muted-foreground">{d.version}</span>}
        </Stat>
        <Stat icon={<Users className="h-5 w-5" />} label="Pemain Online">
          {status.isPending ? <Loader2 className="h-6 w-6 animate-spin" /> : (
            <span className="text-neon">{count}<span className="text-base text-muted-foreground"> / {d?.playersMax ?? 0}</span></span>
          )}
        </Stat>
        <Stat icon={<UserCheck className="h-5 w-5" />} label="Pemain Terdaftar">
          {registered.isPending ? <Loader2 className="h-6 w-6 animate-spin" /> :
            registered.isError ? <span className="font-sans text-sm text-muted-foreground">Belum tersedia</span> :
            <span className="text-cyan">{registered.data}</span>}
        </Stat>
      </div>

      <div id="players" className="panel-stone mt-6 scroll-mt-24 p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base sm:text-lg">Pemain Online <span className="text-neon">({count} / {d?.playersMax ?? 0})</span></h2>
          <span className="text-[10px] text-muted-foreground">auto-refresh 10 detik</span>
        </div>
        {list.length === 0 ? (
          <p className="py-3 text-center text-sm text-muted-foreground">
            {status.isPending ? "Memuat..." : count > 0 ? <span className="inline-flex items-center gap-2 rounded-full border border-emerald/50 bg-emerald/10 px-3 py-1 font-bold text-emerald"><span className="h-2 w-2 rounded-full bg-emerald animate-pulse-dot" />{count} Pemain aktif di dalam game</span> : "0 pemain online saat ini."}
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {list.map((name) => (
              <li key={name} className="flex min-w-0 items-center gap-2 rounded-md border border-border/60 bg-background/60 px-2 py-1.5 transition hover:border-primary hover:shadow-[var(--glow-primary)]">
                <img src={`https://mc-heads.net/avatar/${encodeURIComponent(cleanName(name) || "Steve")}/32`}
                  onError={(e) => { e.currentTarget.src = "https://mc-heads.net/avatar/Steve/32"; }}
                  alt="" width={24} height={24} loading="lazy" className="h-6 w-6 shrink-0 rounded-sm [image-rendering:pixelated]" />
                <span className="truncate text-xs font-medium">{name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function Stat({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="panel-stone p-5 transition hover:-translate-y-1">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <span className="text-primary-glow">{icon}</span>{label}
      </div>
      <div className="mt-2 font-display text-3xl">{children}</div>
    </div>
  );
}
