// Next Friday 19:00 WIB (UTC+7) = Friday 12:00 UTC.
export function nextBansos(now: Date = new Date()): Date {
  const t = new Date(now.getTime());
  t.setUTCHours(12, 0, 0, 0);
  const daysUntilFri = (5 - t.getUTCDay() + 7) % 7;
  t.setUTCDate(t.getUTCDate() + daysUntilFri);
  if (t.getTime() <= now.getTime()) t.setUTCDate(t.getUTCDate() + 7);
  return t;
}

export function splitMs(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}
