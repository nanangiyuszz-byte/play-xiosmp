import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Send, Star } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const reviewSchema = z.object({
  username: z.string().trim().min(2, "Nama minimal 2 karakter").max(32),
  rating: z.number().int().min(1, "Pilih rating").max(5),
  comment: z.string().trim().min(3, "Komentar terlalu pendek").max(500),
});
const feedbackSchema = z.object({
  username: z.string().trim().min(2, "Nama minimal 2 karakter").max(32),
  category: z.enum(["keluh_kesah", "rekomendasi_fitur"]),
  message: z.string().trim().min(5, "Pesan minimal 5 karakter").max(1000),
});

function Reviews() {
  const qc = useQueryClient();
  const [form, setForm] = useState({ username: "", rating: 0, comment: "" });
  const [hover, setHover] = useState(0);
  const reviews = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false }).limit(30);
      if (error) throw error;
      return data;
    },
  });
  const submit = useMutation({
    mutationFn: async () => {
      const parsed = reviewSchema.safeParse(form);
      if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Input tidak valid");
      const { error } = await supabase.from("reviews").insert(parsed.data);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Terima kasih atas ulasanmu!"); setForm({ username: "", rating: 0, comment: "" }); qc.invalidateQueries({ queryKey: ["reviews"] }); },
    onError: (e: Error) => toast.error(e.message),
  });
  const list = reviews.data ?? [];
  const avg = list.length ? list.reduce((a, r) => a + r.rating, 0) / list.length : 0;

  return (
    <div className="panel-stone p-5">
      <div className="flex items-end justify-between gap-2">
        <h3 className="text-lg">Rating & Ulasan</h3>
        <span className="text-sm text-muted-foreground">{list.length ? <><b className="text-gold">{avg.toFixed(1)}</b> / 5 · {list.length} ulasan</> : "Belum ada ulasan"}</span>
      </div>
      <form className="mt-4 space-y-3" onSubmit={(e) => { e.preventDefault(); submit.mutate(); }}>
        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button type="button" key={n} aria-label={`${n} bintang`} onMouseEnter={() => setHover(n)} onClick={() => setForm({ ...form, rating: n })}
              className="transition-transform hover:scale-125 active:scale-95">
              <Star className={`h-8 w-8 ${(hover || form.rating) >= n ? "fill-gold text-gold drop-shadow-[0_0_6px_var(--gold)]" : "text-muted-foreground"}`} />
            </button>
          ))}
        </div>
        <input className="field" placeholder="Nama / IGN" maxLength={32} value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <textarea className="field min-h-20" placeholder="Bagaimana pengalamanmu di XioSMP?" maxLength={500} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
        <button disabled={submit.isPending} className="btn-3d btn-primary w-full px-4 py-3 text-sm">
          {submit.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Kirim Ulasan
        </button>
      </form>
      <ul className="mt-5 max-h-80 space-y-2 overflow-y-auto pr-1">
        {reviews.isPending && <li className="flex justify-center py-4"><Loader2 className="h-5 w-5 animate-spin" /></li>}
        {!reviews.isPending && list.length === 0 && <li className="py-4 text-center text-sm text-muted-foreground">Jadilah yang pertama memberi ulasan!</li>}
        {list.map((r) => (
          <li key={r.id} className="rounded-md border border-border/60 bg-background/60 p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-bold">{r.username}</span>
              <span className="flex shrink-0">{Array.from({ length: 5 }, (_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-gold text-gold" : "text-muted-foreground"}`} />)}</span>
            </div>
            <p className="mt-1 break-words text-sm text-muted-foreground">{r.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Feedback() {
  const [form, setForm] = useState<{ username: string; category: "keluh_kesah" | "rekomendasi_fitur"; message: string }>({ username: "", category: "keluh_kesah", message: "" });
  const submit = useMutation({
    mutationFn: async () => {
      const parsed = feedbackSchema.safeParse(form);
      if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Input tidak valid");
      const { error } = await supabase.from("community_feedback").insert(parsed.data);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Masukanmu sudah terkirim ke staff!"); setForm({ ...form, message: "" }); },
    onError: (e: Error) => toast.error(e.message),
  });
  const cats = [["keluh_kesah", "Keluh Kesah"], ["rekomendasi_fitur", "Rekomendasi Fitur"]] as const;
  return (
    <div className="panel-stone p-5">
      <h3 className="text-lg">Keluh Kesah & Rekomendasi Fitur</h3>
      <p className="mt-1 text-sm text-muted-foreground">Sampaikan unek-unek atau ide fitur baru langsung ke staff.</p>
      <form className="mt-4 space-y-3" onSubmit={(e) => { e.preventDefault(); submit.mutate(); }}>
        <div className="grid grid-cols-2 gap-2 rounded-lg bg-background/70 p-1 shadow-[inset_0_2px_6px_oklch(0_0_0/0.6)]">
          {cats.map(([v, l]) => (
            <button type="button" key={v} onClick={() => setForm({ ...form, category: v })}
              className={`rounded-md px-2 py-2 text-xs font-bold transition sm:text-sm ${form.category === v ? (v === "keluh_kesah" ? "btn-primary" : "btn-emerald") : "text-muted-foreground hover:text-foreground"}`}>
              {l}
            </button>
          ))}
        </div>
        <input className="field" placeholder="Nama / IGN" maxLength={32} value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <textarea className="field min-h-32" maxLength={1000}
          placeholder={form.category === "keluh_kesah" ? "Ceritakan kendala atau keluhanmu..." : "Fitur apa yang ingin kamu lihat di XioSMP?"}
          value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        <button disabled={submit.isPending} className="btn-3d btn-emerald w-full px-4 py-3 text-sm">
          {submit.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Kirim Masukan
        </button>
      </form>
    </div>
  );
}

export function Community() {
  return (
    <section id="feedback" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12">
      <h2 className="text-center text-2xl sm:text-3xl">Suara <span className="text-neon">Komunitas</span></h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Reviews />
        <Feedback />
      </div>
    </section>
  );
}
