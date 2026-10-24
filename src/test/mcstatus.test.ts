import { describe, expect, it } from "vitest";
import { cleanName, merge, normalize } from "@/lib/mcstatus";

describe("cross-platform player parsing", () => {
  it("strips Bedrock prefix for avatars", () => {
    expect(cleanName("*Steve")).toBe("Steve");
    expect(cleanName(".Alex")).toBe("Alex");
  });
  it("reads players.sample as well as players.list", () => {
    const s = normalize({ online: true, players: { online: 2, max: 20, sample: [{ name_clean: "A" }], list: [{ name: "B" }] } });
    expect(s.players.sort()).toEqual(["A", "B"]);
  });
  it("keeps the highest count when list is empty", () => {
    const m = merge([
      normalize({ online: true, players: { online: 4, max: 20 } }),
      normalize({ online: false }),
    ]);
    expect(m.playersOnline).toBe(4);
    expect(m.players).toEqual([]);
  });
});
