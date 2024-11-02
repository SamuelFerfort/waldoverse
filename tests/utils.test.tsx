import { describe, it, expect } from "vitest";
import { formatTime, formatTimestamp } from "@/app/lib/utils";

describe("Utility Functions", () => {
  describe("formatTime", () => {
    it("formats milliseconds to MM:SS correctly", () => {
      expect(formatTime(1000)).toBe("00:01");
      expect(formatTime(2000)).toBe("00:02");
      expect(formatTime(3000)).toBe("00:03");
      expect(formatTime(60000)).toBe("01:00");
    });

    it("handles edge cases", () => {
      expect(formatTime(0)).toBe("00:00");
      expect(formatTime(59999)).toBe("00:59");
      expect(formatTime(599999)).toBe("09:59");
    });

    it("formats times over an hour correctly", () => {
      expect(formatTime(3600000)).toBe("60:00");
      expect(formatTime(3661000)).toBe("61:01");
    });
  });

  describe("formatTimestamp", () => {
    it("formats dates with single-digit month and day", () => {
      const date = new Date("2023-01-01T00:00:00.000Z");
      expect(formatTimestamp(date)).toBe("01/01 01:00"); // UTC+1 for Spain
    });

    it("formats dates with double-digit month and day", () => {
      const date = new Date("2023-12-25T00:00:00.000Z");
      expect(formatTimestamp(date)).toBe("12/25 01:00"); // UTC+1 for Spain
    });

    it("handles different times of day", () => {
      expect(formatTimestamp(new Date("2023-06-15T09:30:00.000Z")))
        .toBe("06/15 11:30"); // UTC+1 for Spain
      expect(formatTimestamp(new Date("2023-06-15T15:45:00.000Z")))
        .toBe("06/15 17:45"); // UTC+1 for Spain
      expect(formatTimestamp(new Date("2023-06-15T22:59:00.000Z")))
        .toBe("06/16 00:59"); // UTC+1 for Spain
    });

    it("maintains leading zeros", () => {
      const date = new Date("2023-02-05T08:05:00.000Z");
      expect(formatTimestamp(date)).toBe("02/05 09:05"); // UTC+1 for Spain
    });

    it("handles day transitions", () => {
      const date = new Date("2023-12-31T23:59:00.000Z");
      expect(formatTimestamp(date)).toBe("01/01 00:59"); // UTC+1 for Spain
    });
  });
});