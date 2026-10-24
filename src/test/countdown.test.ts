import { describe, expect, it } from "vitest";
import { nextBansos } from "@/lib/countdown";

describe("bansos countdown targets Friday 19:00 WIB", () => {
  it("from Saturday goes to next Friday 12:00 UTC", () => {
    expect(nextBansos(new Date("2026-10-24T04:13:00Z")).toISOString()).toBe("2026-10-30T12:00:00.000Z");
  });
  it("Friday before 19:00 WIB targets same day", () => {
    expect(nextBansos(new Date("2026-10-30T11:59:00Z")).toISOString()).toBe("2026-10-30T12:00:00.000Z");
  });
  it("Friday after 19:00 WIB targets the following week", () => {
    expect(nextBansos(new Date("2026-10-30T12:00:01Z")).toISOString()).toBe("2026-11-06T12:00:00.000Z");
  });
});
